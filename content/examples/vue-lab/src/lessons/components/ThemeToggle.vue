<script setup lang="ts">
import { useTheme } from '../injection/theme';

const { mode, toggle } = useTheme();
</script>

<template>
  <button type="button" :aria-pressed="mode === 'dark'" @click="toggle">Dunkles Design</button>
</template>
