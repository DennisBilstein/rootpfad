import { createRouter, createMemoryHistory, type RouteLocationRaw, type Router, type RouterHistory } from 'vue-router';
import { defineComponent, h } from 'vue';

// Lektion "Router-Guards": Zugriffsschutz in der Oberfläche ist Komfort, Sicherheit entscheidet das Backend.
export type Role = 'user' | 'admin';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;      // ohne Anmeldung nicht erreichbar
    roles?: readonly Role[];     // mindestens eine dieser Rollen nötig
    title?: string;              // Dokumenttitel nach der Navigation
  }
}

/** Was der Guard über die Anmeldung wissen muss. Tests und echte Sitzung implementieren dieselbe Schnittstelle. */
export interface AuthState {
  ready: Promise<void>;                  // Sitzung wiederherstellen (z. B. nach Reload), bevor entschieden wird
  isLoggedIn(): boolean;
  roles(): readonly Role[];
}

/**
 * Rücksprungziel nach der Anmeldung. Das Ziel kommt aus der URL und ist damit Fremdeingabe:
 * Nur Pfade der eigenen Anwendung sind erlaubt, sonst droht ein Open Redirect.
 */
export function safeRedirectTarget(raw: unknown, fallback = '/'): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string' || value.length > 2048) return fallback;
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback;   // "//host" wäre eine andere Origin
  if (/[\s\u0000-\u001f\\]/.test(value)) return fallback;                                              // Leerraum, Steuerzeichen, Backslash
  return value;
}

const page = (name: string) => defineComponent({ name, render: () => h('p', name) });

export function createAppRouter(auth: AuthState, history: RouterHistory = createMemoryHistory()): Router {
  const router = createRouter({
    history,
    routes: [
      { path: '/', name: 'home', component: page('Start'), meta: { title: 'Start' } },
      { path: '/login', name: 'login', component: page('Anmelden'), meta: { title: 'Anmelden' } },
      { path: '/account', name: 'account', component: page('Konto'), meta: { requiresAuth: true, title: 'Mein Konto' } },
      { path: '/admin', name: 'admin', component: page('Verwaltung'), meta: { requiresAuth: true, roles: ['admin'], title: 'Verwaltung' } },
      { path: '/forbidden', name: 'forbidden', component: page('Kein Zugriff'), meta: { title: 'Kein Zugriff' } },
    ],
  });

  router.beforeEach(async (to) => {
    await auth.ready;                                                       // kein Login-Flackern nach einem Reload
    if (to.name === 'login' && auth.isLoggedIn()) return safeRedirectTarget(to.query.redirect);
    if (!to.meta.requiresAuth) return true;
    if (!auth.isLoggedIn()) return { name: 'login', query: { redirect: to.fullPath } } satisfies RouteLocationRaw;
    const required = to.meta.roles;
    if (required && !required.some((role) => auth.roles().includes(role))) return { name: 'forbidden' };
    return true;                                                            // login/forbidden sind nicht geschützt: keine Endlosschleife
  });

  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} · ROOTPFAD Lab` : 'ROOTPFAD Lab';
  });
  return router;
}
