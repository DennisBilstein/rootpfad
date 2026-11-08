<script setup lang="ts">
import type { Task } from '../domain';
defineProps<{ task: Task }>();
const emit = defineEmits<{ toggle: [id: number] }>();
</script>

<template>
  <li>
    <label>
      <input type="checkbox" :checked="task.done" @change="emit('toggle', task.id)">
      <span :class="{ done: task.done }">{{ task.title }}</span>
    </label>
    <slot name="meta" />
  </li>
</template>
