<script setup lang="ts">
import { computed } from 'vue';
import { useUppercase } from './pitfalls';

// Lektion "Reaktivitätsfallen", Punkt 6: Props-Destructuring (Vue 3.5) und Weitergabe an Composables.
const { name = 'Gast', excited = false } = defineProps<{ name?: string; excited?: boolean }>();

const liveUppercase = useUppercase(() => name);                    // Getter: bleibt aktuell
const staleUppercase = useUppercase(computed(() => name).value);    // Momentaufnahme: nach dem ersten Rendern veraltet
</script>

<template>
  <p data-test="greeting">Hallo {{ name }}{{ excited ? '!' : '.' }}</p>
  <p data-test="live">{{ liveUppercase }}</p>
  <p data-test="stale">{{ staleUppercase }}</p>
</template>
