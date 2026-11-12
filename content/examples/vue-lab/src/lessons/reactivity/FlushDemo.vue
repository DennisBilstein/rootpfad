<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';

// Lektion "Reaktivitätsfallen", Punkt 5: Wann sieht ein Watcher das aktualisierte DOM?
const count = ref(0);
const output = useTemplateRef<HTMLParagraphElement>('output');
const seenByPre = ref('');
const seenByPost = ref('');

// Standard (flush: 'pre'): läuft VOR dem DOM-Update, das DOM zeigt noch den alten Wert.
watch(count, () => { seenByPre.value = output.value?.textContent ?? ''; });
// flush: 'post': läuft NACH dem DOM-Update, das DOM zeigt den neuen Wert.
watch(count, () => { seenByPost.value = output.value?.textContent ?? ''; }, { flush: 'post' });

defineExpose({ seenByPre, seenByPost });
</script>

<template>
  <div>
    <p ref="output">{{ count }}</p>
    <button type="button" @click="count++">Erhöhen</button>
  </div>
</template>
