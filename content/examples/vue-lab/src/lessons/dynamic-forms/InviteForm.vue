<script setup lang="ts">
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue';
import FormField from '../modern/FormField.vue';
import { MAX_MEMBERS, validateInvite, type InviteData, type InviteErrors } from './inviteSchema';

// Lektion "Dynamische Formulare": Zeilen hinzufügen und entfernen, ohne Fokus, Eingaben oder Ansage zu verlieren.
const emit = defineEmits<{ submit: [data: InviteData] }>();

let counter = 0;
const newRow = () => ({ key: `row-${++counter}`, email: '' });     // stabile Identität, nie der Listenindex
const team = ref('');
const rows = reactive([newRow()]);
const submitted = ref(false);
const announcement = ref('');
const addButton = useTemplateRef<HTMLButtonElement>('addButton');
const fieldRefs = new Map<string, { focus: () => void }>();

function trackField(key: string, instance: unknown) {
  if (instance && typeof instance === 'object' && 'focus' in instance && typeof instance.focus === 'function') fieldRefs.set(key, instance as { focus: () => void });
  else fieldRefs.delete(key);                                      // Zeile wurde entfernt
}

const errors = computed<InviteErrors>(() => {
  if (!submitted.value) return {};
  const result = validateInvite({ team: team.value, members: rows });
  return result.ok ? {} : result.errors;
});
const canAdd = computed(() => rows.length < MAX_MEMBERS);
const canRemove = computed(() => rows.length > 1);

async function addRow() {
  if (!canAdd.value) return;
  const row = newRow();
  rows.push(row);
  announcement.value = `Zeile ${rows.length} hinzugefügt. ${rows.length} von ${MAX_MEMBERS} Personen.`;
  await nextTick();
  fieldRefs.get(row.key)?.focus();                                 // Fokus auf das neue Feld
}

async function removeRow(key: string) {
  const index = rows.findIndex((row) => row.key === key);
  if (index < 0 || !canRemove.value) return;
  rows.splice(index, 1);
  announcement.value = `Zeile ${index + 1} entfernt. ${rows.length} von ${MAX_MEMBERS} Personen.`;
  await nextTick();
  const neighbour = rows[Math.min(index, rows.length - 1)];       // gleiche Position, sonst die letzte Zeile
  if (neighbour) fieldRefs.get(neighbour.key)?.focus();
  else addButton.value?.focus();
}

const form = useTemplateRef<HTMLFormElement>('form');
async function onSubmit() {
  submitted.value = true;
  const result = validateInvite({ team: team.value, members: rows });
  if (!result.ok) {
    await nextTick();
    form.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();   // erstes fehlerhaftes Feld
    return;
  }
  emit('submit', result.data);
}
</script>

<template>
  <form ref="form" novalidate @submit.prevent="onSubmit">
    <FormField v-model="team" label="Teamname" autocomplete="off" :error="errors.team" />

    <fieldset>
      <legend>Personen einladen</legend>
      <ol>
        <li v-for="(row, index) in rows" :key="row.key">
          <FormField :ref="(instance) => trackField(row.key, instance)" v-model="row.email" :label="`E-Mail Person ${index + 1}`"
            type="email" autocomplete="off" inputmode="email" :error="errors[`members.${index}.email`]" />
          <button type="button" :disabled="!canRemove" :aria-label="`Entfernen: Person ${index + 1}`" @click="removeRow(row.key)">Entfernen</button>
        </li>
      </ol>
      <p v-if="errors.members" role="alert">{{ errors.members }}</p>
      <button ref="addButton" type="button" :disabled="!canAdd" @click="addRow">Person hinzufügen</button>
      <small v-if="!canAdd">Höchstens {{ MAX_MEMBERS }} Personen.</small>
    </fieldset>

    <p role="status" data-test="live">{{ announcement }}</p>
    <button type="submit">Einladungen senden</button>
  </form>
</template>
