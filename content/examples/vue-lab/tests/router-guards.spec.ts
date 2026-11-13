import { describe, it, expect } from 'vitest';
import { createMemoryHistory, createRouter, isNavigationFailure, NavigationFailureType } from 'vue-router';
import { createAppRouter, safeRedirectTarget, type AuthState, type Role } from '../src/lessons/router/guards';

function fakeAuth(state: { loggedIn: boolean; roles?: Role[]; ready?: Promise<void> }): AuthState {
  return { ready: state.ready ?? Promise.resolve(), isLoggedIn: () => state.loggedIn, roles: () => state.roles ?? [] };
}

describe('safeRedirectTarget', () => {
  it('akzeptiert nur Pfade der eigenen Anwendung', () => {
    expect(safeRedirectTarget('/account?tab=2#top')).toBe('/account?tab=2#top');
    expect(safeRedirectTarget(['/a', '/b'])).toBe('/a');
  });
  it('lehnt fremde Ziele, Schemata und Tricks ab (Open Redirect)', () => {
    for (const evil of ['https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)', '/ok\n//evil', '/a b', 'account', '', undefined, 42, null, {}]) {
      expect(safeRedirectTarget(evil)).toBe('/');
    }
    expect(safeRedirectTarget('/' + 'a'.repeat(2048))).toBe('/');
    expect(safeRedirectTarget('//evil.example', '/start')).toBe('/start');
  });
});

describe('Navigation Guards', () => {
  it('leitet nicht Angemeldete mit Rücksprungziel zur Anmeldung um', async () => {
    const router = createAppRouter(fakeAuth({ loggedIn: false }));
    await router.push('/account?tab=2');
    expect(router.currentRoute.value.name).toBe('login');
    expect(router.currentRoute.value.query.redirect).toBe('/account?tab=2');
  });

  it('lässt Angemeldete auf geschützte Seiten und prüft Rollen (403-artige Seite)', async () => {
    const user = createAppRouter(fakeAuth({ loggedIn: true, roles: ['user'] }));
    await user.push('/account');
    expect(user.currentRoute.value.name).toBe('account');
    await user.push('/admin');
    expect(user.currentRoute.value.name).toBe('forbidden');

    const admin = createAppRouter(fakeAuth({ loggedIn: true, roles: ['admin'] }));
    await admin.push('/admin');
    expect(admin.currentRoute.value.name).toBe('admin');
  });

  it('schickt bereits Angemeldete von /login zum sicheren Rücksprungziel', async () => {
    const router = createAppRouter(fakeAuth({ loggedIn: true, roles: ['user'] }));
    await router.push('/login?redirect=/account');
    expect(router.currentRoute.value.fullPath).toBe('/account');
    await router.push('/login?redirect=//evil.example');
    expect(router.currentRoute.value.fullPath).toBe('/');
  });

  it('wartet auf die Sitzungswiederherstellung, statt kurz die Anmeldung zu zeigen', async () => {
    let finish!: () => void;
    const auth: { loggedIn: boolean; roles?: Role[]; ready: Promise<void> } = { loggedIn: false, ready: new Promise<void>((resolve) => { finish = resolve; }) };
    const router = createAppRouter(fakeAuth(auth));
    const navigation = router.push('/account');
    await Promise.resolve();
    expect(router.currentRoute.value.name).toBeUndefined();     // Navigation ist noch offen (pending)
    auth.loggedIn = true; auth.roles = ['user']; finish();      // Sitzung wurde wiederhergestellt
    await navigation;
    expect(router.currentRoute.value.name).toBe('account');
  });

  it('ein Guard mit false bricht ab: push löst mit NavigationFailure auf und wirft nicht', async () => {
    const router = createAppRouter(fakeAuth({ loggedIn: true, roles: ['user'] }));
    await router.push('/account');
    router.beforeEach((to) => (to.name === 'home' ? false : true));
    const result = await router.push('/');
    expect(isNavigationFailure(result, NavigationFailureType.aborted)).toBe(true);
    expect(router.currentRoute.value.name).toBe('account');             // Ausgangsseite bleibt
  });

  it('eine geschützte Anmeldeseite erzeugt eine Endlosumleitung, die der Router abbricht', async () => {
    const page = { template: '<p></p>' };
    const router = createRouter({ history: createMemoryHistory(), routes: [
      { path: '/', name: 'home', component: page },
      { path: '/login', name: 'login', component: page, meta: { requiresAuth: true } },    // Fehler: Ausweichseite ist selbst geschützt
      { path: '/account', name: 'account', component: page, meta: { requiresAuth: true } },
    ] });
    router.beforeEach((to) => (to.meta.requiresAuth ? { name: 'login' } : true));
    await expect(router.push('/account')).rejects.toThrow('Infinite redirect in navigation guard');
    expect(router.currentRoute.value.fullPath).toBe('/');                  // die Navigation kam nie an
  });

  it('setzt den Dokumenttitel nach jeder Navigation', async () => {
    const router = createAppRouter(fakeAuth({ loggedIn: true, roles: ['user'] }));
    await router.push('/account');
    expect(document.title).toBe('Mein Konto · ROOTPFAD Lab');
  });
});
