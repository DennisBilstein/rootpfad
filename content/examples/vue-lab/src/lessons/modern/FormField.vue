<script setup lang="ts">
import { computed, useAttrs, useId, useTemplateRef } from 'vue';

// Lektion "Moderne Vue-3.5-APIs": ein wiederverwendbares, zugängliches Eingabefeld.
defineOptions({ inheritAttrs: false });     // Attribute gehören dem <input>, nicht dem äußeren <div>

// Seit Vue 3.5 bleibt destrukturiertes defineProps reaktiv; Standardwerte stehen direkt im Destructuring.
const { label, hint, error } = defineProps<{ label: string; hint?: string; error?: string }>();
const model = defineModel<string>({ default: '' });

const id = useId();                                          // eindeutig je Aufruf, stabil bei Server-Rendering
const attrs = useAttrs();
const input = useTemplateRef<HTMLInputElement>('input');     // typisierte Template-Ref

const describedBy = computed(() => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined);

// class und style gehören zum Wrapper, alle übrigen Attribute (type, autocomplete, data-*) zum Eingabefeld.
// $attrs ist nicht reaktiv, daher wird die Aufteilung bei jedem Rendern neu berechnet (Funktion statt computed).
function inputAttrs() {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
}

// Hinweis: Ein Kommentar vor dem Wurzelelement im Template würde im Entwicklungsmodus ein Fragment erzeugen
// und das Durchreichen von Attributen verändern. useAttrs() liefert unknown; class/style gehen unverändert an den Wrapper.

// Die Komponente ist standardmäßig "geschlossen": Eltern sehen nur, was hier ausdrücklich freigegeben wird.
defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <div :class="attrs.class" :style="attrs.style as string | undefined">
    <label :for="id">{{ label }}</label>
    <input :id="id" ref="input" v-model="model" v-bind="inputAttrs()" :aria-invalid="error ? 'true' : undefined" :aria-describedby="describedBy">
    <small v-if="hint" :id="`${id}-hint`">{{ hint }}</small>
    <span v-if="error" :id="`${id}-error`">{{ error }}</span>
  </div>
</template>
