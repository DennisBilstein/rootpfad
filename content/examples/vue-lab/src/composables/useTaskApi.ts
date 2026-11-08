import { onScopeDispose, ref } from 'vue';
import { parseTasks, type Task } from '../domain';

export function useTaskApi(fetcher: typeof fetch = fetch) {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref('');
  let controller: AbortController | undefined;
  let sequence = 0;

  async function load(url = '/tasks.json'): Promise<void> {
    controller?.abort();
    const current = ++sequence;
    controller = new AbortController();
    loading.value = true;
    error.value = '';
    try {
      const response = await fetcher(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = parseTasks(await response.json());
      if (current === sequence) tasks.value = parsed;
    } catch (failure) {
      if (current === sequence && !(failure instanceof DOMException && failure.name === 'AbortError')) {
        error.value = failure instanceof Error ? failure.message : 'Loading failed';
      }
    } finally {
      if (current === sequence) loading.value = false;
    }
  }

  onScopeDispose(() => { sequence++; controller?.abort(); });
  return { tasks, loading, error, load };
}
