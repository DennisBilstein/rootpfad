<script setup lang="ts" generic="T extends { id: string | number }">
// Lektion "Slots mit Vertrag": Der Parent bekommt typisierte Daten, die Komponente bleibt generisch.
defineProps<{ items: readonly T[] }>();

defineSlots<{
  default(props: { item: T; index: number }): unknown;   // Scoped Slot: Daten fließen zum Parent
  empty?(): unknown;                                      // optionaler Slot mit Fallback
}>();
</script>

<template>
  <ul v-if="items.length">
    <li v-for="(item, index) in items" :key="item.id">
      <slot :item="item" :index="index" />
    </li>
  </ul>
  <p v-else role="status"><slot name="empty">Keine Einträge vorhanden.</slot></p>
</template>
