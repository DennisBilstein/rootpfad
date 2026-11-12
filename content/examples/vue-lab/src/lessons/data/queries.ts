import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import type { TaskFormData } from '../forms/taskSchema';
import type { TaskPage, TasksApi } from './tasksApi';

// Lektion "Query-Cache": Schlüssel beschreiben die Daten, nicht den Aufruf.
export const taskKeys = {
  all: ['tasks'] as const,
  page: (page: Ref<number>) => ['tasks', 'page', page] as const,    // ref im Schlüssel: neue Seite = neuer Cache-Eintrag
};

export function useTasksQuery(api: TasksApi, page: Ref<number>) {
  return useQuery({
    queryKey: taskKeys.page(page),
    queryFn: ({ signal }) => api.list(page.value, { signal }),
    staleTime: 30_000,                          // 30 s gelten als frisch: kein erneuter Request beim Zurücknavigieren
    placeholderData: keepPreviousData,          // beim Blättern die alte Seite anzeigen statt Ladeflackern
  });
}

export function useCreateTask(api: TasksApi) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskFormData) => api.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),   // alle Seiten gelten als veraltet
  });
}

// Lektion "Optimistische Updates": sofort anzeigen, bei Fehler zurückrollen, am Ende mit dem Server abgleichen.
export function useToggleTask(api: TasksApi) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) => api.setDone(id, done),
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });  // laufende Abrufe dürfen das Update nicht überschreiben
      const snapshots = queryClient.getQueriesData<TaskPage>({ queryKey: taskKeys.all });
      queryClient.setQueriesData<TaskPage>({ queryKey: taskKeys.all }, (old) =>
        old && { ...old, items: old.items.map((task) => (task.id === id ? { ...task, done } : task)) });
      return { snapshots };
    },
    onError: (_error, _variables, context) => {
      for (const [key, data] of context?.snapshots ?? []) queryClient.setQueryData(key, data);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}
