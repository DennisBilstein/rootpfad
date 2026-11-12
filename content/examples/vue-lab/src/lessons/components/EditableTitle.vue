<script setup lang="ts">
// Mehrere v-models: v-model:title und v-model:done sind getrennte Verträge.
const title = defineModel<string>('title', { required: true });
const done = defineModel<boolean>('done', { default: false });
</script>

<template>
  <div>
    <label>
      Titel
      <input v-model.trim="title" maxlength="120">
    </label>
    <label>
      <input v-model="done" type="checkbox">
      erledigt
    </label>
  </div>
</template>
