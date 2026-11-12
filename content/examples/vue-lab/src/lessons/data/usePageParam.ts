import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Lektion "URL als Zustand": Die Seite steht in ?page=…, ist teilbar und überlebt einen Reload.
export function parsePage(raw: unknown): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string' || !/^\d{1,6}$/.test(value)) return 1;   // alles Unlesbare: Seite 1
  return Math.max(1, Number(value));
}

export function usePageParam() {
  const route = useRoute();
  const router = useRouter();
  const page = computed(() => parsePage(route.query.page));
  const setPage = (next: number) => router.push({ query: { ...route.query, page: String(Math.max(1, next)) } });
  return { page, setPage };
}
