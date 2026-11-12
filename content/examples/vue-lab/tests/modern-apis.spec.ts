import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import FormField from '../src/lessons/modern/FormField.vue';
import SignupForm from '../src/lessons/modern/SignupForm.vue';

describe('FormField (useId, useTemplateRef, defineExpose, inheritAttrs)', () => {
  it('verknüpft Label, Hinweis und Fehler über eine eindeutige id', async () => {
    const wrapper = mount(FormField, { props: { label: 'Name', hint: 'Vor- und Nachname', error: 'Name fehlt' } });
    const input = wrapper.get('input');
    const label = wrapper.get('label');
    expect(label.attributes('for')).toBe(input.attributes('id'));
    const ids = input.attributes('aria-describedby')!.split(' ');
    expect(ids).toHaveLength(2);
    for (const id of ids) expect(wrapper.find(`#${CSS.escape(id)}`).exists()).toBe(true);
    expect(input.attributes('aria-invalid')).toBe('true');
    wrapper.unmount();
  });

  it('vergibt für mehrere Instanzen unterschiedliche ids', () => {
    const wrapper = mount({ components: { FormField }, template: '<div><FormField label="A" /><FormField label="B" /></div>' });
    const [a, b] = wrapper.findAll('input').map((input) => input.attributes('id'));
    expect(a).toBeTruthy();
    expect(a).not.toBe(b);
    wrapper.unmount();
  });

  it('entfernt aria-Attribute, wenn weder Hinweis noch Fehler vorliegen', () => {
    const wrapper = mount(FormField, { props: { label: 'Name' } });
    expect(wrapper.get('input').attributes('aria-describedby')).toBeUndefined();
    expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined();
    wrapper.unmount();
  });

  it('teilt Attribute auf: class/style an den Wrapper, alles andere an das Eingabefeld', () => {
    const wrapper = mount(FormField, { props: { label: 'E-Mail' }, attrs: { class: 'field', style: 'margin: 0', type: 'email', autocomplete: 'email', 'data-testid': 'x' } });
    expect(wrapper.element.classList.contains('field')).toBe(true);
    const input = wrapper.get('input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('autocomplete')).toBe('email');
    expect(input.attributes('data-testid')).toBe('x');
    expect(input.classes()).toEqual([]);
    expect(wrapper.attributes('data-testid')).toBeUndefined();
    wrapper.unmount();
  });

  it('reagiert auf geänderte Props (reaktives Props-Destructuring)', async () => {
    const wrapper = mount(FormField, { props: { label: 'Alt' } });
    await wrapper.setProps({ label: 'Neu', error: 'Fehler' });
    expect(wrapper.get('label').text()).toBe('Neu');
    expect(wrapper.find('span').text()).toBe('Fehler');
    wrapper.unmount();
  });

  it('gibt nur focus() frei, nicht den inneren Zustand', async () => {
    const host = document.createElement('div'); document.body.append(host);
    const wrapper = mount(FormField, { props: { label: 'Name' }, attachTo: host });
    const exposed = wrapper.vm as unknown as { focus: () => void; input?: unknown };
    exposed.focus();
    expect(document.activeElement).toBe(wrapper.get('input').element);
    expect(Object.keys(wrapper.vm.$.exposed ?? {})).toEqual(['focus']);
    wrapper.unmount(); host.remove();
  });

  it('bindet v-model zweiseitig', async () => {
    const wrapper = mount(FormField, { props: { label: 'Name', modelValue: 'Ada', 'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }) } });
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('Ada');
    await wrapper.get('input').setValue('Grace');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Grace']);
    wrapper.unmount();
  });
});

describe('SignupForm (Fokus über Template-Ref)', () => {
  it('fokussiert beim Absenden das erste fehlerhafte Feld', async () => {
    const host = document.createElement('div'); document.body.append(host);
    const wrapper = mount(SignupForm, { attachTo: host });
    await wrapper.get('form').trigger('submit'); await nextTick();
    expect(document.activeElement).toBe(wrapper.findAll('input')[0]!.element);       // Name zuerst
    await wrapper.findAll('input')[0]!.setValue('Ada');
    await wrapper.get('form').trigger('submit'); await nextTick();
    expect(document.activeElement).toBe(wrapper.findAll('input')[1]!.element);       // dann E-Mail
    expect(wrapper.text()).toContain('Gültige E-Mail-Adresse eingeben');
    expect(wrapper.emitted('submit')).toBeUndefined();
    wrapper.unmount(); host.remove();
  });

  it('sendet gültige Daten', async () => {
    const wrapper = mount(SignupForm);
    await wrapper.findAll('input')[0]!.setValue('  Ada  ');
    await wrapper.findAll('input')[1]!.setValue('ada@example.com');
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted('submit')?.[0]).toEqual([{ name: 'Ada', email: 'ada@example.com' }]);
    wrapper.unmount();
  });
});
