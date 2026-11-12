import { describe, it, expect, vi } from 'vitest';
import { createAuthClient, HttpError, SessionExpiredError } from '../src/lessons/auth/authClient';
import { createSession } from '../src/lessons/auth/session';
import { createAppRouter } from '../src/lessons/router/guards';
import { createFakeAuthServer } from './fakeAuthServer';

const credentials = { email: 'ada@example.com', password: 'geheim' };
function setup(options: { refreshCookie?: boolean } = {}) {
  const server = createFakeAuthServer(options);
  const onSessionExpired = vi.fn();
  const client = createAuthClient({ fetcher: server.fetcher, origin: 'http://localhost', onSessionExpired });
  return { server, client, onSessionExpired };
}

describe('Anmeldung', () => {
  it('speichert das Token im Speicher und sendet es als Bearer-Header', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    expect(client.hasToken).toBe(true);
    const response = await client.authFetch('/api/me');
    expect(response.status).toBe(200);
    expect(server.calls.at(-1)?.authorization).toBe('Bearer access-1');
    expect(JSON.stringify(Object.keys(localStorage))).not.toContain('access');     // nichts in localStorage
  });

  it('weist falsche Zugangsdaten mit HttpError 401 ab', async () => {
    const { client } = setup();
    await expect(client.login({ ...credentials, password: 'falsch' })).rejects.toMatchObject({ status: 401 });
    expect(client.hasToken).toBe(false);
  });
});

describe('Token-Erneuerung', () => {
  it('erneuert bei 401 genau einmal und wiederholt die Anfrage', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    server.expireAccessToken();
    const response = await client.authFetch('/api/me');
    expect(response.status).toBe(200);
    expect(server.calls.slice(-3).map((c) => `${c.method} ${c.path}`)).toEqual(['GET /api/me', 'POST /auth/refresh', 'GET /api/me']);   // 401, Erneuerung, Wiederholung
    expect(server.calls.at(-1)?.authorization).toBe('Bearer access-2');
  });

  it('teilt eine Erneuerung zwischen parallelen Anfragen (Single Flight)', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    server.expireAccessToken();
    const responses = await Promise.all(Array.from({ length: 5 }, () => client.authFetch('/api/me')));
    expect(responses.map((r) => r.status)).toEqual([200, 200, 200, 200, 200]);
    expect(server.refreshCalls()).toBe(1);
  });

  it('beendet die Sitzung, wenn das Refresh-Token abgelehnt wird', async () => {
    const { server, client, onSessionExpired } = setup();
    await client.login(credentials);
    server.expireAccessToken(); server.behavior.refreshStatus = 401;
    await expect(client.authFetch('/api/me')).rejects.toBeInstanceOf(SessionExpiredError);
    expect(onSessionExpired).toHaveBeenCalledTimes(1);
    expect(client.hasToken).toBe(false);
  });

  it('behält die Sitzung bei einem Netzwerkfehler während der Erneuerung', async () => {
    const { server, client, onSessionExpired } = setup();
    await client.login(credentials);
    server.expireAccessToken(); server.behavior.refreshNetworkError = true;
    await expect(client.authFetch('/api/me')).rejects.toBeInstanceOf(TypeError);
    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it('wiederholt nur einmal: bleibt es bei 401, gibt der Aufrufer die Antwort zurück', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    server.behavior.protectedAlways401 = true;
    const response = await client.authFetch('/api/me');
    expect(response.status).toBe(401);
    expect(server.refreshCalls()).toBe(1);                                  // keine Endlosschleife
  });

  it('sendet String-Bodies erneut, wiederholt aber keine Streams', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    server.expireAccessToken();
    await client.authFetch('/api/notes', { method: 'POST', body: JSON.stringify({ text: 'a' }) });
    const posts = server.calls.filter((c) => c.method === 'POST' && c.path === '/api/notes');
    expect(posts.map((c) => c.body)).toEqual(['{"text":"a"}', '{"text":"a"}']);

    server.expireAccessToken();
    const refreshesBefore = server.refreshCalls();
    const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode('x')); controller.close(); } });
    const response = await client.authFetch('/api/notes', { method: 'POST', body: stream, duplex: 'half' } as RequestInit);
    expect(response.status).toBe(401);
    expect(server.refreshCalls()).toBe(refreshesBefore);                    // keine automatische Wiederholung
  });

  it('sendet das Token niemals an fremde Origins', async () => {
    const { server, client } = setup();
    await client.login(credentials);
    await client.authFetch('https://third-party.example/ping');
    expect(server.calls.at(-1)?.authorization).toBeNull();
  });
});

describe('Sitzung im Zusammenspiel mit dem Router', () => {
  it('stellt die Sitzung nach einem Reload still wieder her und zeigt keine Anmeldeseite', async () => {
    const { client } = setup({ refreshCookie: true });
    const session = createSession(client);
    const router = createAppRouter(session);
    await router.push('/account');
    expect(router.currentRoute.value.name).toBe('account');
    expect(session.user()?.name).toBe('Ada');
  });

  it('leitet ohne Cookie zur Anmeldung um und danach per Rücksprungziel zurück', async () => {
    const { client } = setup({ refreshCookie: false });
    const session = createSession(client);
    const router = createAppRouter(session);
    await router.push('/account');
    expect(router.currentRoute.value.name).toBe('login');
    await session.login(credentials);
    await router.push(String(router.currentRoute.value.query.redirect));
    expect(router.currentRoute.value.name).toBe('account');
  });

  it('startet auch dann, wenn die Wiederherstellung mit einem Fehler scheitert', async () => {
    const { server, client } = setup({ refreshCookie: true });
    server.behavior.refreshNetworkError = true;
    const session = createSession(client);
    await expect(session.ready).resolves.toBeUndefined();
    expect(session.isLoggedIn()).toBe(false);
  });

  it('HttpError trägt den Statuscode', () => {
    expect(new HttpError(503).status).toBe(503);
  });
});
