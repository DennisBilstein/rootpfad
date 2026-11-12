<script setup lang="ts" generic="T extends { id: string | number }">
// Lektion "Generische Komponenten": T wird aus den Props abgeleitet und fließt in v-model und Events.
const props = defineProps<{
  label: string;
  options: readonly T[];
  getLabel: (option: T) => string;
}>();
const selected = defineModel<T | null>({ default: null });
const emit = defineEmits<{ change: [option: T | null] }>();

function onChange(event: Event) {
  if (!(event.currentTarget instanceof HTMLSelectElement)) return;
  const id = event.currentTarget.value;
  // Vergleich über String(), weil option.value im DOM immer ein String ist.
  const option = props.options.find((candidate) => String(candidate.id) === id) ?? null;
  selected.value = option;
  emit('change', option);
}
</script>

<template>
  <label>
    {{ label }}
    <select :value="selected === null ? '' : String(selected.id)" @change="onChange">
      <option value="">– bitte wählen –</option>
      <option v-for="option in options" :key="option.id" :value="String(option.id)">{{ getLabel(option) }}</option>
    </select>
  </label>
</template>
