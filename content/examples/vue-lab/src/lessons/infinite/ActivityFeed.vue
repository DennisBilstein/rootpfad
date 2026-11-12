<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import type { ActivityApi } from './activityApi';
import { prefetchActivity, useActivityDetail, useActivityFeed } from './activityQueries';

// Lektion "Infinite Queries": "Mehr laden" statt automatischem Nachladen (zugänglicher und planbar),
// Vorladen beim Überfahren/Fokussieren, sichtbare Zustände für Laden, Fehler, leer und Ende.
const props = defineProps<{ api: ActivityApi; retryDelay?: number }>();
const client = useQueryClient();
const feed = useActivityFeed(props.api, { retryDelay: props.retryDelay });
const selected = ref<number | null>(null);
const detail = useActivityDetail(props.api, selected);

const status = computed(() => {
  if (feed.isFetchingNextPage.value) return 'Weitere Einträge werden geladen …';
  if (!feed.hasNextPage.value && feed.items.value.length) return `Alle ${feed.items.value.length} Einträge geladen.`;
  return '';
});
</script>

<template>
  <section aria-labelledby="feed-title">
    <h2 id="feed-title">Aktivität</h2>

    <p v-if="feed.isPending.value" role="status">Lade Aktivität …</p>
    <div v-else-if="feed.isError.value && !feed.items.value.length" role="alert">
      <p>Aktivität konnte nicht geladen werden.</p>
      <button type="button" @click="feed.refetch()">Erneut versuchen</button>
    </div>
    <p v-else-if="!feed.items.value.length" role="status">Noch keine Aktivität.</p>
    <template v-else>
      <ul>
        <li v-for="item in feed.items.value" :key="item.id">
          <button type="button" :aria-pressed="selected === item.id" @mouseenter="prefetchActivity(client, props.api, item.id)"
            @focus="prefetchActivity(client, props.api, item.id)" @click="selected = item.id">{{ item.text }}</button>
        </li>
      </ul>
      <p v-if="feed.isFetchNextPageError.value" role="alert">Weitere Einträge konnten nicht geladen werden.</p>
      <button v-if="feed.hasNextPage.value" type="button" :disabled="feed.isFetchingNextPage.value" @click="feed.fetchNextPage()">
        {{ feed.isFetchNextPageError.value ? 'Erneut versuchen' : 'Mehr laden' }}
      </button>
      <p role="status" data-test="status">{{ status }}</p>
    </template>

    <aside v-if="selected !== null" aria-label="Details">
      <p v-if="detail.isPending.value" role="status">Lade Details …</p>
      <p v-else-if="detail.isError.value" role="alert">Details nicht verfügbar.</p>
      <p v-else data-test="detail">{{ detail.data.value?.text }}</p>
    </aside>
  </section>
</template>
