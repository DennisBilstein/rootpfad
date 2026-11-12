import { useInfiniteQuery, useQuery, type QueryClient } from '@tanstack/vue-query';
import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { ApiError } from '../data/tasksApi';
import type { Activity, ActivityApi } from './activityApi';

export const activityKeys = {
  all: ['activity'] as const,
  list: () => ['activity', 'list'] as const,
  detail: (id: number) => ['activity', 'detail', id] as const,
};

/**
 * Wiederholungsstrategie: nur bei vorübergehenden Fehlern (Netzwerk, 5xx, 408, 429), höchstens zweimal.
 * Ein 404 oder 422 wird durch Wiederholen nicht besser; es würde nur den Server belasten.
 */
export function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) return false;
  if (error instanceof ApiError) return error.status >= 500 || error.status === 408 || error.status === 429;
  return error instanceof TypeError;                         // fetch meldet Netzwerkfehler als TypeError
}
/** Exponentielles Warten mit Obergrenze: 1 s, 2 s, 4 s … höchstens 8 s. */
export const backoff = (attempt: number) => Math.min(1000 * 2 ** attempt, 8000);

export function useActivityFeed(api: ActivityApi, options: { retryDelay?: number | ((attempt: number) => number) } = {}) {
  const query = useInfiniteQuery({
    queryKey: activityKeys.list(),
    queryFn: ({ pageParam, signal }) => api.list(pageParam, signal),
    initialPageParam: null as string | null,                // erste Seite: kein Cursor
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,    // undefined = keine weitere Seite
    retry: shouldRetry,
    retryDelay: options.retryDelay ?? backoff,
    staleTime: 30_000,
  });
  // Neue Einträge können zwischen zwei Seiten die Cursor verschieben: dieselbe id darf nicht doppelt erscheinen.
  const items = computed<Activity[]>(() => {
    const seen = new Set<number>();
    return (query.data.value?.pages ?? []).flatMap((page) => page.items).filter((item) => !seen.has(item.id) && seen.add(item.id));
  });
  return { ...query, items };
}

export function useActivityDetail(api: ActivityApi, id: MaybeRefOrGetter<number | null>) {
  return useQuery({
    queryKey: computed(() => activityKeys.detail(toValue(id) ?? -1)),
    queryFn: ({ signal }) => api.detail(toValue(id) as number, signal),
    enabled: computed(() => toValue(id) !== null),
    retry: shouldRetry,                                      // Standard wäre 3 Wiederholungen: ein 404 bliebe sekundenlang "Lade …"
    retryDelay: backoff,
    staleTime: 60_000,                                       // so lange gilt ein Vorab-Laden als frisch
  });
}

/** Beim Überfahren oder Fokussieren eines Eintrags vorladen: Der spätere Klick findet die Daten schon im Cache. */
export function prefetchActivity(client: QueryClient, api: ActivityApi, id: number) {
  return client.prefetchQuery({
    queryKey: activityKeys.detail(id),
    queryFn: ({ signal }) => api.detail(id, signal),
    staleTime: 60_000,
  });
}
