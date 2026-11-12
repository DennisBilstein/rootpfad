<script setup lang="ts">
// Lektion "Mini-Projekt": Formular + Query-Cache + Mutationen + Serverfehler (RFC 9457) im Zusammenspiel.
import { computed } from 'vue';
import TaskForm from '../forms/TaskForm.vue';
import type { FieldErrors, TaskFormData } from '../forms/taskSchema';
import { ApiError, type TasksApi } from './tasksApi';
import { useCreateTask, useTasksQuery, useToggleTask } from './queries';
import { usePageParam } from './usePageParam';

const props = defineProps<{ api: TasksApi; today?: string }>();
const { page, setPage } = usePageParam();
const tasks = useTasksQuery(props.api, page);
const create = useCreateTask(props.api);
const toggle = useToggleTask(props.api);

const serverErrors = computed<FieldErrors>(() => {
  const error = create.error.value;
  return error instanceof ApiError && error.status === 422 ? error.fieldErrors : {};
});
const generalError = computed(() => {
  const error = create.error.value;
  return error && !(error instanceof ApiError && error.status === 422) ? 'Speichern fehlgeschlagen. Bitte später erneut versuchen.' : '';
});

function onSubmit(data: TaskFormData) { create.mutate(data); }
</script>

<template>
  <section aria-labelledby="inbox-title">
    <h2 id="inbox-title">Aufgaben</h2>
    <TaskForm :submitting="create.isPending.value" :server-errors="serverErrors" :today="today" @submit="onSubmit" />
    <p v-if="generalError" role="alert">{{ generalError }}</p>

    <p v-if="tasks.isPending.value" role="status">Lade Aufgaben …</p>
    <div v-else-if="tasks.isError.value" role="alert">
      <p>Aufgaben konnten nicht geladen werden.</p>
      <button type="button" @click="tasks.refetch()">Erneut versuchen</button>
    </div>
    <p v-else-if="!tasks.data.value?.items.length" role="status">Noch keine Aufgaben. Lege die erste an.</p>
    <template v-else>
      <ul>
        <li v-for="task in tasks.data.value.items" :key="task.id">
          <label>
            <input type="checkbox" :checked="task.done" @change="toggle.mutate({ id: task.id, done: !task.done })">
            {{ task.title }}<span v-if="task.dueDate"> (fällig {{ task.dueDate }})</span>
          </label>
        </li>
      </ul>
      <nav aria-label="Seiten">
        <button type="button" :disabled="page <= 1" @click="setPage(page - 1)">Zurück</button>
        <span>Seite {{ page }} von {{ tasks.data.value.totalPages }}</span>
        <button type="button" :disabled="tasks.isPlaceholderData.value || page >= tasks.data.value.totalPages" @click="setPage(page + 1)">Weiter</button>
      </nav>
    </template>
  </section>
</template>
