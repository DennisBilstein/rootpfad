<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/tasks';
import { useTaskApi } from '../composables/useTaskApi';
import TaskItem from '../components/TaskItem.vue';

const store = useTasksStore();
const { tasks, remaining } = storeToRefs(store);
const title = ref('');
const error = ref('');
const onlyOpen = ref(false);
const visible = computed(() => tasks.value.filter(task => !onlyOpen.value || !task.done));
const api = useTaskApi();

function add(): void {
  try { store.add(title.value); title.value = ''; error.value = ''; }
  catch (failure) { error.value = failure instanceof Error ? failure.message : 'Eingabe prüfen.'; }
}

async function importDemo(): Promise<void> {
  await api.load();
  if (!api.error.value) store.replace(api.tasks.value);
}
</script>

<template>
  <section aria-labelledby="tasks-title">
    <h1 id="tasks-title">Meine Lernaufgaben</h1>
    <p>Lokales Lernlabor: Änderungen bleiben nur im Arbeitsspeicher. Demo-Import ersetzt die Liste.</p>
    <form @submit.prevent="add">
      <label for="task-title">Neue Aufgabe</label>
      <input id="task-title" v-model="title" maxlength="120" :aria-invalid="!!error" aria-describedby="task-error">
      <button type="submit">Hinzufügen</button>
      <p id="task-error" role="alert">{{ error }}</p>
    </form>
    <label><input v-model="onlyOpen" type="checkbox"> Nur offene Aufgaben</label>
    <p role="status">{{ remaining }} Aufgaben offen</p>
    <ul>
      <TaskItem v-for="task in visible" :key="task.id" :task="task" @toggle="store.toggle">
        <template #meta><small> · Nr. {{ task.id }}</small></template>
      </TaskItem>
    </ul>
    <p v-if="!visible.length">Keine passenden Aufgaben.</p>
    <button type="button" :disabled="api.loading.value" @click="importDemo">Demo-Aufgaben laden (Liste ersetzen)</button>
    <p role="status">{{ api.loading.value ? 'Lädt …' : '' }}</p>
    <p role="alert">{{ api.error.value }}</p>
  </section>
</template>
