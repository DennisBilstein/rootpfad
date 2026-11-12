import * as z from 'zod';
import type { AuthState, Role } from '../router/guards';
import { HttpError, type AuthClient } from './authClient';

// Die Rollen kommen vom Server (/api/me), nie aus einem selbst dekodierten Token: Die Oberfläche
// darf Rollen anzeigen und Menüs filtern, die Berechtigung prüft immer das Backend.
const meSchema = z.object({ id: z.number().int(), name: z.string(), roles: z.array(z.enum(['user', 'admin'])) });
export type Me = z.infer<typeof meSchema>;

export interface Session extends AuthState {
  user(): Me | null;
  login(credentials: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
  clear(): void;
}

export function createSession(client: AuthClient): Session {
  let me: Me | null = null;

  async function loadMe() {
    const response = await client.authFetch('/api/me');
    if (!response.ok) throw new HttpError(response.status);
    me = meSchema.parse(await response.json());
  }

  // Beim Start still versuchen, die Sitzung wiederherzustellen. Fehler dürfen den Start nicht blockieren.
  const ready = client.restore().then((restored) => (restored ? loadMe() : undefined)).catch(() => undefined);

  return {
    ready,
    isLoggedIn: () => me !== null,
    roles: () => (me?.roles ?? []) as readonly Role[],
    user: () => me,
    async login(credentials) { await client.login(credentials); await loadMe(); },
    async logout() { me = null; await client.logout(); },
    clear() { me = null; },
  };
}
