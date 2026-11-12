<script setup lang="ts">
// Lektion "defineModel und v-model": eine Zahl mit optionalem .clamp-Modifikator.
const props = withDefaults(defineProps<{ label: string; min?: number; max?: number }>(), { min: 0, max: 10 });

const [quantity, modifiers] = defineModel<number, 'clamp'>({
  required: true,
  // set() läuft, bevor der Wert an den Parent gemeldet wird.
  set(value) {
    const number = Number.isFinite(value) ? Math.trunc(value) : props.min;
    return modifiers.clamp ? Math.min(Math.max(number, props.min), props.max) : number;
  },
});
</script>

<template>
  <label>
    {{ label }}
    <input type="number" inputmode="numeric" :min="min" :max="max" v-model.number="quantity">
  </label>
</template>
