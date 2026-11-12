import { onScopeDispose, ref } from 'vue';

// Lektion "Transition und reduzierte Bewegung": reagiert live auf die Systemeinstellung.
export function usePrefersReducedMotion() {
  const reduced = ref(false);
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return reduced;

  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduced.value = query.matches;
  const onChange = (event: MediaQueryListEvent) => { reduced.value = event.matches; };
  query.addEventListener('change', onChange);
  onScopeDispose(() => query.removeEventListener('change', onChange));
  return reduced;
}
