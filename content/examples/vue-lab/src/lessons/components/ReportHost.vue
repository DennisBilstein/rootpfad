<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import AsyncReport from './AsyncReport.vue';

defineProps<{ load: () => Promise<string[]> }>();
const failure = ref('');

// Suspense fängt Fehler NICHT selbst ab: Fehlergrenze per onErrorCaptured.
onErrorCaptured((error) => {
  failure.value = error instanceof Error ? error.message : 'Unbekannter Fehler';
  return false;                                   // Fehler hier behandelt, nicht weiter nach oben melden
});
</script>

<template>
  <p v-if="failure" role="alert">Bericht nicht verfügbar: {{ failure }}</p>
  <Suspense v-else>
    <AsyncReport :load="load" />
    <template #fallback><p role="status">Bericht wird geladen …</p></template>
  </Suspense>
</template>
