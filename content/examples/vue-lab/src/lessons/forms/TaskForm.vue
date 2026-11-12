<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { validateTaskForm, type FieldErrors, type TaskFormData, type TaskFormInput } from './taskSchema';

const props = defineProps<{ submitting?: boolean; serverErrors?: FieldErrors; today?: string }>();
const emit = defineEmits<{ submit: [data: TaskFormData] }>();

const values = reactive<TaskFormInput>({ title: '', dueDate: '' });
const shown = ref(new Set<keyof TaskFormInput>());               // Fehler erst nach Blur oder Submit zeigen
const root = ref<HTMLFormElement | null>(null);

const clientErrors = computed<FieldErrors>(() => {
  const result = validateTaskForm(values, props.today);
  return result.ok ? {} : result.errors;
});
const errors = computed<FieldErrors>(() => {
  const visible: FieldErrors = {};
  for (const field of ['title', 'dueDate'] as const) {
    const message = props.serverErrors?.[field] ?? (shown.value.has(field) ? clientErrors.value[field] : undefined);
    if (message) visible[field] = message;
  }
  return visible;
});

function touch(field: keyof TaskFormInput) { shown.value = new Set(shown.value).add(field); }

async function focusFirstInvalid() {
  await nextTick();
  root.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
}

function onSubmit() {
  touch('title'); touch('dueDate');
  const result = validateTaskForm(values, props.today);
  if (!result.ok) { void focusFirstInvalid(); return; }          // Eingaben bleiben erhalten
  emit('submit', result.data);
}

watch(() => props.serverErrors, (next) => { if (next && Object.keys(next).length) void focusFirstInvalid(); });
</script>

<template>
  <form ref="root" novalidate @submit.prevent="onSubmit">
    <p>
      <label for="task-title">Titel</label>
      <input id="task-title" v-model="values.title" autocomplete="off" :aria-invalid="errors.title ? 'true' : undefined"
        :aria-describedby="errors.title ? 'task-title-error' : undefined" @blur="touch('title')">
      <span v-if="errors.title" id="task-title-error">{{ errors.title }}</span>
    </p>
    <p>
      <label for="task-due">Fällig am (optional)</label>
      <input id="task-due" v-model="values.dueDate" type="date" :aria-invalid="errors.dueDate ? 'true' : undefined"
        :aria-describedby="errors.dueDate ? 'task-due-error' : undefined" @blur="touch('dueDate')">
      <span v-if="errors.dueDate" id="task-due-error">{{ errors.dueDate }}</span>
    </p>
    <button type="submit" :disabled="submitting">{{ submitting ? 'Wird gespeichert …' : 'Aufgabe anlegen' }}</button>
  </form>
</template>
