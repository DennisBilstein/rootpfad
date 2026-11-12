import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createActivityApi, type Activity } from '../src/lessons/infinite/activityApi';
import { backoff, prefetchActivity, shouldRetry } from '../src/lessons/infinite/activityQueries';
import ActivityFeed from '../src/lessons/infinite/ActivityFeed.vue';
import { ApiError } from '../src/lessons/data/tasksApi';

/** Cursor-Server: 25 Einträge in Seiten zu 10; der Cursor ist die Position des nächsten Eintrags. */
function createFeedServer(total = 25) {
  const all: Activity[] = Array.from({ length: total }, (_, i) => ({ id: i + 1, text: `Eintrag ${i + 1}` }));
  const calls: string[] = [];
  const failures: number[] = [];                              // Statuscodes, die der Reihe nach geliefert werden
  const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  const fetcher: typeof fetch = async (input) => {
    const url = new URL(String(input), 'http://localhost');
    calls.push(`${url.pathname}${url.search}`);
    const failure = failures.shift();
    if (failure) return json(failure, { title: 'Fehler' });
    if (url.pathname === '/api/activity') {
      const start = Number(url.searchParams.get('cursor') ?? '0');
      const items = all.slice(start, start + 10);
      return json(200, { items, nextCursor: start + 10 < all.length ? String(start + 10) : null });
    }
    const id = Number(url.pathname.split('/').pop());
    const item = all.find((entry) => entry.id === id);
    return item ? json(200, item) : json(404, { title: 'Nicht gefunden' });
  };
  return { fetcher, calls, failures, all };
}
const newClient = () => new QueryClient({ defaultOptions: { queries: { gcTime: Infinity } } });   // Retry kommt aus dem Hook, nicht aus dem Test

function mountFeed(server: ReturnType<typeof createFeedServer>, client = newClient()) {
  const wrapper = mount(ActivityFeed, { props: { api: createActivityApi(server.fetcher), retryDelay: 1 }, global: { plugins: [[VueQueryPlugin, { queryClient: client }]] } });
  return { wrapper, client };
}
const loadMore = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('button').find((b) => /Mehr laden|Erneut versuchen/.test(b.text()));

describe('Wiederholungsstrategie', () => {
  it('wiederholt nur vorübergehende Fehler, höchstens zweimal', () => {
    expect(shouldRetry(0, new ApiError(503, null))).toBe(true);
    expect(shouldRetry(0, new ApiError(429, null))).toBe(true);
    expect(shouldRetry(0, new ApiError(408, null))).toBe(true);
    expect(shouldRetry(0, new TypeError('Failed to fetch'))).toBe(true);
    expect(shouldRetry(2, new ApiError(503, null))).toBe(false);          // Grenze: dritter Versuch ist der letzte
  });
  it('wiederholt keine Clientfehler und keine unbekannten Fehler', () => {
    for (const status of [400, 401, 403, 404, 422]) expect(shouldRetry(0, new ApiError(status, null))).toBe(false);
    expect(shouldRetry(0, new Error('Programmierfehler'))).toBe(false);
    expect(shouldRetry(0, 'text')).toBe(false);
  });
  it('wartet exponentiell, höchstens 8 Sekunden', () => {
    expect([0, 1, 2, 3, 4, 10].map(backoff)).toEqual([1000, 2000, 4000, 8000, 8000, 8000]);
  });
});

describe('ActivityFeed (Infinite Query)', () => {
  it('lädt die erste Seite und danach per Klick weitere, bis das Ende erreicht ist', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    expect(wrapper.text()).toContain('Lade Aktivität');
    await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(10);
    await loadMore(wrapper)!.trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(20);
    await loadMore(wrapper)!.trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(25);
    expect(loadMore(wrapper)).toBeUndefined();                              // keine weitere Seite: Schaltfläche verschwindet
    expect(wrapper.get('[data-test=status]').text()).toBe('Alle 25 Einträge geladen.');
    expect(server.calls).toEqual(['/api/activity?limit=10', '/api/activity?limit=10&cursor=10', '/api/activity?limit=10&cursor=20']);
    wrapper.unmount();
  });

  it('sperrt die Schaltfläche, während eine Seite lädt (kein Doppelklick-Dublett)', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    await flushPromises();
    const button = loadMore(wrapper)!;
    await button.trigger('click');
    expect(wrapper.get('[data-test=status]').text()).toBe('Weitere Einträge werden geladen …');
    expect(loadMore(wrapper)!.attributes('disabled')).toBeDefined();
    await flushPromises();
    expect(server.calls.filter((c) => c.includes('cursor=10'))).toHaveLength(1);
    wrapper.unmount();
  });

  it('wiederholt vorübergehende Fehler automatisch und zeigt danach die Daten', async () => {
    const server = createFeedServer();
    server.failures.push(503, 503);                                         // zwei Fehlschläge, dann Erfolg
    const { wrapper } = mountFeed(server);
    await new Promise((resolve) => setTimeout(resolve, 30)); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(10);
    expect(server.calls.filter((c) => c === '/api/activity?limit=10')).toHaveLength(3);
    wrapper.unmount();
  });

  it('zeigt bei dauerhaftem Fehler einen Fehlerzustand mit manueller Wiederholung', async () => {
    const server = createFeedServer();
    server.failures.push(503, 503, 503);
    const { wrapper } = mountFeed(server);
    await new Promise((resolve) => setTimeout(resolve, 30)); await flushPromises();
    expect(wrapper.get('[role=alert]').text()).toContain('konnte nicht geladen werden');
    await wrapper.get('[role=alert] button').trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(10);
    wrapper.unmount();
  });

  it('behält bereits geladene Einträge, wenn das Nachladen scheitert, und bietet Wiederholung an', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    await flushPromises();
    server.failures.push(404);                                              // 404: keine automatische Wiederholung
    await loadMore(wrapper)!.trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(10);
    expect(wrapper.text()).toContain('Weitere Einträge konnten nicht geladen werden.');
    await loadMore(wrapper)!.trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(20);
    wrapper.unmount();
  });

  it('zeigt den Leerzustand', async () => {
    const { wrapper } = mountFeed(createFeedServer(0));
    await flushPromises();
    expect(wrapper.text()).toContain('Noch keine Aktivität.');
    wrapper.unmount();
  });

  it('entfernt doppelte Einträge, wenn sich Seiten überlappen', async () => {
    const server = createFeedServer(25);
    const original = server.fetcher;
    // Zwischen den Abrufen wurde vorn ein Eintrag eingefügt: Seite 2 beginnt mit einem schon bekannten Eintrag.
    let call = 0;
    const overlapping: typeof fetch = async (input, init) => {
      const response = await original(input, init);
      if (String(input).includes('cursor=10') && call++ === 0) {
        const body = (await response.json()) as { items: Activity[]; nextCursor: string | null };
        return new Response(JSON.stringify({ ...body, items: [{ id: 10, text: 'Eintrag 10' }, ...body.items.slice(0, 9)] }), { status: 200 });
      }
      return response;
    };
    const { wrapper } = mountFeed({ ...server, fetcher: overlapping });
    await flushPromises();
    await loadMore(wrapper)!.trigger('click'); await flushPromises();
    const ids = wrapper.findAll('ul li button').map((b) => b.text());
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(19);                                           // 10 + 10 - 1 Duplikat
    wrapper.unmount();
  });
});

describe('Prefetching', () => {
  it('lädt Details beim Überfahren vor: der Klick löst keinen weiteren Request aus', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    await flushPromises();
    const target = wrapper.findAll('ul li button')[2]!;
    await target.trigger('mouseenter'); await flushPromises();
    expect(server.calls).toContain('/api/activity/3');
    const before = server.calls.length;
    await target.trigger('click'); await flushPromises();
    expect(wrapper.get('[data-test=detail]').text()).toBe('Eintrag 3');
    expect(server.calls.length).toBe(before);                               // Cache-Treffer
    wrapper.unmount();
  });

  it('lädt auch ohne Maus vor: Fokus per Tastatur genügt', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    await flushPromises();
    await wrapper.findAll('ul li button')[4]!.trigger('focus'); await flushPromises();
    expect(server.calls).toContain('/api/activity/5');
    wrapper.unmount();
  });

  it('prefetchQuery verschluckt Fehler: der spätere Klick lädt dann regulär und zeigt Fehler sichtbar', async () => {
    const server = createFeedServer();
    const client = newClient();
    const api = createActivityApi(server.fetcher);
    server.failures.push(500);
    await expect(prefetchActivity(client, api, 7)).resolves.toBeUndefined();   // kein Fehler nach außen
    expect(client.getQueryData(['activity', 'detail', 7])).toBeUndefined();
  });

  it('Detail ohne Eintrag (404) zeigt einen Fehler statt einer leeren Anzeige', async () => {
    const server = createFeedServer();
    const { wrapper } = mountFeed(server);
    await flushPromises();
    server.all.splice(0, 1);                                                // Eintrag 1 wurde zwischenzeitlich gelöscht
    await wrapper.findAll('ul li button')[0]!.trigger('click'); await flushPromises();
    expect(wrapper.get('aside [role=alert]').text()).toBe('Details nicht verfügbar.');
    wrapper.unmount();
  });
});
