<script setup lang="ts">
// Lektion "Teleport und natives <dialog>": Fokusfalle, Esc und Hintergrund liefert der Browser.
import { nextTick, ref, watch } from 'vue';

defineProps<{ title: string }>();
const open = defineModel<boolean>('open', { required: true });
const emit = defineEmits<{ confirm: []; cancel: [] }>();

const dialog = ref<HTMLDialogElement | null>(null);
let opener: HTMLElement | null = null;

watch(open, async (isOpen) => {
  await nextTick();
  const element = dialog.value;
  if (!element) return;
  if (isOpen && !element.open) {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
  } else if (!isOpen && element.open) {
    element.close();
  }
});

// "close" feuert bei Esc, form[method=dialog] und close(): Zustand bleibt synchron, Fokus kehrt zurück.
function onClose() {
  open.value = false;
  opener?.focus();
  opener = null;
}
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" aria-labelledby="dialog-title" @close="onClose" @cancel="emit('cancel')">
      <form method="dialog">
        <h2 id="dialog-title">{{ title }}</h2>
        <slot />
        <button value="cancel" @click="emit('cancel')">Abbrechen</button>
        <button value="confirm" @click="emit('confirm')">Bestätigen</button>
      </form>
    </dialog>
  </Teleport>
</template>
