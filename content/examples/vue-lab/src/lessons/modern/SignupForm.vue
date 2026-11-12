<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import FormField from './FormField.vue';

// Elternkomponente: nutzt die freigegebene focus()-Methode, um den Fokus auf das erste fehlerhafte Feld zu setzen.
const emit = defineEmits<{ submit: [value: { name: string; email: string }] }>();
const values = reactive({ name: '', email: '' });
const errors = ref<{ name?: string; email?: string }>({});
const nameField = useTemplateRef<InstanceType<typeof FormField>>('nameField');
const emailField = useTemplateRef<InstanceType<typeof FormField>>('emailField');

function onSubmit() {
  errors.value = {
    ...(values.name.trim() ? {} : { name: 'Name fehlt' }),
    ...(/^\S+@\S+\.\S+$/.test(values.email) ? {} : { email: 'Gültige E-Mail-Adresse eingeben' }),
  };
  if (errors.value.name) return nameField.value?.focus();
  if (errors.value.email) return emailField.value?.focus();
  emit('submit', { name: values.name.trim(), email: values.email });
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <FormField ref="nameField" v-model="values.name" class="field" label="Name" autocomplete="name" :error="errors.name" />
    <FormField ref="emailField" v-model="values.email" label="E-Mail" type="email" autocomplete="email" inputmode="email"
      hint="Wir senden nur eine Bestätigung." data-testid="email" :error="errors.email" />
    <button type="submit">Registrieren</button>
  </form>
</template>
