<script setup lang="ts">
// Lektion "Suspense und asynchrone Komponenten": Top-Level-await macht diese Komponente "async".
const props = defineProps<{ load: () => Promise<string[]> }>();
const lines = await props.load();
</script>

<template>
  <ul>
    <li v-for="line in lines" :key="line">{{ line }}</li>
  </ul>
</template>
