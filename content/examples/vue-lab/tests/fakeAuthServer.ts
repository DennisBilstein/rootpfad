/** In-Memory-Server für Anmeldung: Access-Tokens laufen ab, das Refresh-Cookie wird simuliert. */
export function createFakeAuthServer(options: { refreshCookie?: boolean } = {}) {
  let tokenCounter = 0;
  let validToken: string | null = null;
  let refreshCookie = options.refreshCookie ?? false;
  const calls: { method: string; path: string; authorization: string | null; body: string | null }[] = [];
  const behavior = { refreshStatus: 200, refreshNetworkError: false, protectedAlways401: false };

  const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const issue = () => { validToken = `access-${++tokenCounter}`; return validToken; };

  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(String(input), 'http://localhost');
    const method = init?.method ?? 'GET';
    const headers = new Headers(init?.headers);
    calls.push({ method, path: url.pathname, authorization: headers.get('Authorization'), body: typeof init?.body === 'string' ? init.body : null });

    if (url.origin !== 'http://localhost') return json(200, { external: true });
    if (url.pathname === '/auth/login') {
      const body = JSON.parse(String(init?.body)) as { email: string; password: string };
      if (body.password !== 'geheim') return json(401, { title: 'Ungültige Zugangsdaten' });
      refreshCookie = true;
      return json(200, { accessToken: issue() });
    }
    if (url.pathname === '/auth/refresh') {
      if (behavior.refreshNetworkError) throw new TypeError('Failed to fetch');
      if (behavior.refreshStatus !== 200 || !refreshCookie) return json(behavior.refreshStatus === 200 ? 401 : behavior.refreshStatus, { title: 'Refresh abgelehnt' });
      return json(200, { accessToken: issue() });
    }
    if (url.pathname === '/auth/logout') { refreshCookie = false; validToken = null; return json(200, {}); }

    // geschützte Ressourcen
    if (behavior.protectedAlways401 || headers.get('Authorization') !== `Bearer ${validToken}`) return json(401, { title: 'Nicht angemeldet' });
    if (url.pathname === '/api/me') return json(200, { id: 1, name: 'Ada', roles: ['user'] });
    if (url.pathname === '/api/notes' && method === 'POST') return json(201, { echoed: init?.body });
    return json(404, { title: 'Nicht gefunden' });
  };

  return {
    fetcher, calls, behavior,
    expireAccessToken: () => { validToken = null; },
    refreshCalls: () => calls.filter((c) => c.path === '/auth/refresh').length,
  };
}
