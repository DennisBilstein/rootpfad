import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { normalizeTitle, parseTasks, type Task } from '../domain';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const remaining = computed(() => tasks.value.filter(task => !task.done).length);

  function add(input: string): void {
    const title = normalizeTitle(input);
    const id = Math.max(0, ...tasks.value.map(task => task.id)) + 1;
    tasks.value.push({ id, title, done: false });
  }

  function toggle(id: number): void {
    const task = tasks.value.find(item => item.id === id);
    if (!task) throw new Error('Task not found');
    task.done = !task.done;
  }

  function replace(input: unknown): void { tasks.value = parseTasks(input); }
  return { tasks, remaining, add, toggle, replace };
});
