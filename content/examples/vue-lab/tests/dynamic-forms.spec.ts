import { describe, it, expect } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import InviteForm from '../src/lessons/dynamic-forms/InviteForm.vue';

function mountForm() {
  const host = document.createElement('div'); document.body.append(host);
  const wrapper = mount(InviteForm, { attachTo: host });
  return { wrapper, cleanup: () => { wrapper.unmount(); host.remove(); } };
}
const emailInputs = (wrapper: VueWrapper) => wrapper.findAll('ol input');
const addButton = (wrapper: VueWrapper) => wrapper.findAll('button').find((b) => b.text() === 'Person hinzufügen')!;
const removeButtons = (wrapper: VueWrapper) => wrapper.findAll('ol button');

describe('InviteForm', () => {
  it('startet mit einer Zeile; Entfernen ist dann gesperrt', () => {
    const { wrapper, cleanup } = mountForm();
    expect(emailInputs(wrapper)).toHaveLength(1);
    expect(removeButtons(wrapper)[0]!.attributes('disabled')).toBeDefined();
    cleanup();
  });

  it('fokussiert nach dem Hinzufügen das neue Feld und kündigt die Änderung an', async () => {
    const { wrapper, cleanup } = mountForm();
    await addButton(wrapper).trigger('click'); await nextTick();
    const inputs = emailInputs(wrapper);
    expect(inputs).toHaveLength(2);
    expect(document.activeElement).toBe(inputs[1]!.element);
    expect(wrapper.get('[data-test=live]').text()).toBe('Zeile 2 hinzugefügt. 2 von 5 Personen.');
    cleanup();
  });

  it('sperrt Hinzufügen bei 5 Zeilen und nennt den Grund als Text', async () => {
    const { wrapper, cleanup } = mountForm();
    for (let i = 0; i < 4; i++) await addButton(wrapper).trigger('click');
    expect(emailInputs(wrapper)).toHaveLength(5);
    expect(addButton(wrapper).attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Höchstens 5 Personen.');
    await addButton(wrapper).trigger('click');
    expect(emailInputs(wrapper)).toHaveLength(5);
    cleanup();
  });

  it('behält beim Entfernen Eingaben und DOM-Elemente der übrigen Zeilen (stabile Keys)', async () => {
    const { wrapper, cleanup } = mountForm();
    await addButton(wrapper).trigger('click'); await addButton(wrapper).trigger('click');
    const [first, second, third] = emailInputs(wrapper);
    await first!.setValue('a@example.com'); await second!.setValue('b@example.com'); await third!.setValue('c@example.com');
    const secondElement = second!.element, thirdElement = third!.element;

    await removeButtons(wrapper)[0]!.trigger('click'); await nextTick();
    const remaining = emailInputs(wrapper);
    expect(remaining.map((input) => (input.element as HTMLInputElement).value)).toEqual(['b@example.com', 'c@example.com']);
    expect(remaining[0]!.element).toBe(secondElement);       // dasselbe Element, kein Neuaufbau mit Indexschlüsseln
    expect(remaining[1]!.element).toBe(thirdElement);
    expect(wrapper.get('[data-test=live]').text()).toBe('Zeile 1 entfernt. 2 von 5 Personen.');
    cleanup();
  });

  it('setzt den Fokus nach dem Entfernen auf die Zeile an gleicher Position', async () => {
    const { wrapper, cleanup } = mountForm();
    await addButton(wrapper).trigger('click'); await addButton(wrapper).trigger('click');
    await removeButtons(wrapper)[2]!.trigger('click'); await nextTick();          // letzte Zeile entfernen
    expect(document.activeElement).toBe(emailInputs(wrapper)[1]!.element);        // neue letzte Zeile
    cleanup();
  });

  it('Absenden mit Fehlern: Fokus auf das erste ungültige Feld, Fehler an der richtigen Zeile, nichts gesendet', async () => {
    const { wrapper, cleanup } = mountForm();
    await addButton(wrapper).trigger('click');
    await wrapper.findAll('input')[0]!.setValue('Backend');
    await emailInputs(wrapper)[0]!.setValue('a@example.com');
    await emailInputs(wrapper)[1]!.setValue('A@example.com');
    await wrapper.get('form').trigger('submit'); await nextTick();
    expect(wrapper.text()).toContain('Diese Adresse steht schon in der Liste');
    const invalid = wrapper.findAll('[aria-invalid="true"]');
    expect(invalid).toHaveLength(1);
    expect(document.activeElement).toBe(emailInputs(wrapper)[1]!.element);
    expect(wrapper.emitted('submit')).toBeUndefined();
    cleanup();
  });

  it('aktualisiert Fehler live, sobald nach dem ersten Absenden korrigiert wird', async () => {
    const { wrapper, cleanup } = mountForm();
    await wrapper.get('form').trigger('submit'); await nextTick();
    expect(wrapper.text()).toContain('Teamname fehlt');
    await wrapper.findAll('input')[0]!.setValue('Team');
    expect(wrapper.text()).not.toContain('Teamname fehlt');
    cleanup();
  });

  it('sendet normalisierte API-Daten ohne UI-Schlüssel', async () => {
    const { wrapper, cleanup } = mountForm();
    await addButton(wrapper).trigger('click');
    await wrapper.findAll('input')[0]!.setValue(' Backend ');
    await emailInputs(wrapper)[0]!.setValue(' Ada@Example.com ');
    await emailInputs(wrapper)[1]!.setValue('grace@example.com');
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted('submit')?.[0]).toEqual([{ team: 'Backend', emails: ['ada@example.com', 'grace@example.com'] }]);
    cleanup();
  });
});
