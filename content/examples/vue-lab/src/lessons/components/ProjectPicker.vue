<script setup lang="ts">
// Zeigt die Typinferenz: SelectField leitet T = Project ab, deshalb ist p.name im Template geprüft.
import { ref } from 'vue';
import SelectField from './SelectField.vue';

interface Project { id: number; name: string; archived: boolean }
const projects: Project[] = [
  { id: 1, name: 'Website', archived: false },
  { id: 2, name: 'Altprojekt', archived: true },
];
const current = ref<Project | null>(null);
const withoutId = [{ name: 'ohne id' }];
</script>

<template>
  <SelectField v-model="current" label="Projekt" :options="projects" :get-label="(p) => p.name + (p.archived ? ' (archiviert)' : '')" />
  <p v-if="current">Gewählt: {{ current.name }}</p>
  <!-- @vue-expect-error Optionen ohne id verletzen die Einschränkung T extends { id } -->
  <SelectField label="Fehler" :options="withoutId" :get-label="(o) => o.name" />
</template>
