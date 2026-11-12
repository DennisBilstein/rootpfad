<script setup lang="ts">
import { provideTheme, type ThemeMode } from '../injection/theme';

const props = defineProps<{ initial?: ThemeMode }>();
const theme = provideTheme(props.initial);
</script>

<template>
  <div :data-theme="theme.mode.value"><slot /></div>
</template>
