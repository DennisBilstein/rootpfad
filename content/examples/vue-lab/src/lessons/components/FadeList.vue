<script setup lang="ts">
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

defineProps<{ items: readonly { id: number; label: string }[] }>();
const reduced = usePrefersReducedMotion();
</script>

<template>
  <!-- Stabile Keys sind Pflicht, sonst weiß TransitionGroup nicht, welches Element geht oder kommt. -->
  <TransitionGroup tag="ul" :name="reduced ? '' : 'fade'" :css="!reduced">
    <li v-for="item in items" :key="item.id">{{ item.label }}</li>
  </TransitionGroup>
</template>

<style scoped>
/* Nur transform und opacity animieren: Das vermeidet Layout-Neuberechnung. */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
.fade-leave-active { position: absolute; }
.fade-move { transition: transform 0.2s ease; }
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active, .fade-leave-active, .fade-move { transition: none; }
}
</style>
