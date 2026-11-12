import * as z from 'zod';

// Lektion "Anmeldung und Token-Erneuerung".
// Entwurf: Das kurzlebige Access-Token lebt nur im Arbeitsspeicher (nie in localStorage: XSS könnte es lesen).
// Das langlebige Refresh-Token liegt als httpOnly-Cookie beim Server und ist für JavaScript unsichtbar.
const tokenResponseSchema = z.object({ accessToken: z.string().min(1) });

export class SessionExpiredError extends Error {
  constructor() { super('Sitzung abgelaufen'); }
}
export class HttpError extends Error {
  constructor(readonly status: number) { super(`HTTP ${status}`); }
}

export interface AuthClientOptions {
  fetcher?: typeof fetch;
  origin?: string;                       // Nur Anfragen an diese Origin bekommen das Token
  onSessionExpired?: () => void;         // z. B. zur Anmeldung navigieren
}

export function createAuthClient({ fetcher = fetch, origin = location.origin, onSessionExpired }: AuthClientOptions = {}) {
  let accessToken: string | null = null;
  let refreshing: Promise<string> | null = null;      // "Single Flight": parallele 401er teilen sich EINE Erneuerung

  const isOwnOrigin = (url: string) => new URL(url, origin).origin === new URL(origin).origin;

  async function requestToken(path: string, init: RequestInit): Promise<string> {
    const response = await fetcher(path, { ...init, credentials: 'include', headers: { 'Content-Type': 'application/json', ...init.headers } });
    if (!response.ok) throw new HttpError(response.status);
    return tokenResponseSchema.parse(await response.json()).accessToken;     // Fremdantwort erst prüfen, dann benutzen
  }

  function refresh(): Promise<string> {
    refreshing ??= requestToken('/auth/refresh', { method: 'POST', headers: { 'X-Requested-With': 'fetch' } })   // Header erschwert CSRF
      .then((token) => { accessToken = token; return token; })
      .finally(() => { refreshing = null; });
    return refreshing;
  }

  function expire(): never {
    accessToken = null;
    onSessionExpired?.();
    throw new SessionExpiredError();
  }

  /** Wie fetch, aber mit Token, einmaliger Erneuerung bei 401 und genau einer Wiederholung. */
  async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
    const withToken = (token: string | null): RequestInit =>
      token && isOwnOrigin(url) ? { ...init, headers: { ...init.headers, Authorization: `Bearer ${token}` } } : init;

    const first = await fetcher(url, withToken(accessToken));
    if (first.status !== 401 || !isOwnOrigin(url)) return first;
    // Ein Stream-Body kann nicht zweimal gesendet werden: dann nicht automatisch wiederholen.
    if (init.body !== undefined && init.body !== null && typeof init.body !== 'string') return first;

    let fresh: string;
    try {
      fresh = await refresh();
    } catch (error) {
      if (error instanceof HttpError && (error.status === 401 || error.status === 403)) expire();   // Refresh-Token ungültig
      throw error;                                                                                  // Netzwerkfehler: Sitzung behalten
    }
    return fetcher(url, withToken(fresh));                  // genau eine Wiederholung, danach entscheidet der Aufrufer
  }

  return {
    async login(credentials: { email: string; password: string }) {
      accessToken = await requestToken('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    },
    /** Stille Wiederherstellung beim Start: gibt es noch ein gültiges Refresh-Cookie? */
    async restore(): Promise<boolean> {
      try { await refresh(); return true; }
      catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) return false;
        throw error;
      }
    },
    async logout() {
      accessToken = null;
      await fetcher('/auth/logout', { method: 'POST', credentials: 'include', headers: { 'X-Requested-With': 'fetch' } });
    },
    authFetch,
    get hasToken() { return accessToken !== null; },
  };
}
export type AuthClient = ReturnType<typeof createAuthClient>;
