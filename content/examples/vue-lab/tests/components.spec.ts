import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, effectScope, h, nextTick, ref } from 'vue';
import ProjectPicker from '../src/lessons/components/ProjectPicker.vue';
import QuantityField from '../src/lessons/components/QuantityField.vue';
import EditableTitle from '../src/lessons/components/EditableTitle.vue';
import ThemeProvider from '../src/lessons/components/ThemeProvider.vue';
import ThemeToggle from '../src/lessons/components/ThemeToggle.vue';
import ItemList from '../src/lessons/components/ItemList.vue';
import ConfirmDialog from '../src/lessons/components/ConfirmDialog.vue';
import ReportHost from '../src/lessons/components/ReportHost.vue';
import FadeList from '../src/lessons/components/FadeList.vue';
import SelectField from '../src/lessons/components/SelectField.vue';
import { createLazyPanel } from '../src/lessons/components/lazyPanel';
import { usePrefersReducedMotion } from '../src/lessons/components/usePrefersReducedMotion';
import { useTheme } from '../src/lessons/injection/theme';

describe('defineModel', () => {
  it('meldet Änderungen über update:modelValue und klemmt mit .clamp', async () => {
    const wrapper = mount(QuantityField, { props: { modelValue: 1, label: 'Menge', 'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }) } });
    await wrapper.get('input').setValue('4');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4]);
    wrapper.unmount();
  });
  it('begrenzt den Wert mit dem Modifikator clamp (Grenzfall und Fehlerfall)', async () => {
    const wrapper = mount(QuantityField, { props: { modelValue: 1, modelModifiers: { clamp: true }, label: 'Menge', min: 0, max: 10 } });
    await wrapper.get('input').setValue('99');
    await wrapper.get('input').setValue('-5');
    expect(wrapper.emitted('update:modelValue')).toEqual([[10], [0]]);
    wrapper.unmount();
  });
  it('unterstützt mehrere benannte Models', async () => {
    const wrapper = mount(EditableTitle, { props: { title: 'Alt', done: false } });
    await wrapper.get('input[type=checkbox]').setValue(true);
    await wrapper.get('input:not([type=checkbox])').setValue('  Neu ');
    expect(wrapper.emitted('update:done')).toEqual([[true]]);
    expect(wrapper.emitted('update:title')).toEqual([['Neu']]);
    wrapper.unmount();
  });
});

describe('provide/inject', () => {
  it('stellt den Vertrag bereit; Kinder ändern nur über toggle()', async () => {
    const wrapper = mount(ThemeProvider, { props: { initial: 'light' }, slots: { default: () => h(ThemeToggle) } });
    expect(wrapper.attributes('data-theme')).toBe('light');
    await wrapper.get('button').trigger('click');
    expect(wrapper.attributes('data-theme')).toBe('dark');
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('true');
    wrapper.unmount();
  });
  it('wirft eine verständliche Fehlermeldung ohne Provider', () => {
    const scope = effectScope();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => scope.run(() => useTheme())).toThrow(/provideTheme/);
    warn.mockRestore();
    scope.stop();
  });
});

describe('Slots und generische Komponenten', () => {
  const items = [{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }] as const;
  it('reicht typisierte Slot-Daten an den Parent weiter', () => {
    const wrapper = mount(ItemList, { props: { items }, slots: { default: `<template #default="{ item, index }">{{ index + 1 }}. {{ item.name }}</template>` } });
    expect(wrapper.findAll('li').map((li) => li.text())).toEqual(['1. Alpha', '2. Beta']);
    wrapper.unmount();
  });
  it('zeigt den Fallback- und den eigenen Empty-Slot', () => {
    const fallback = mount(ItemList, { props: { items: [] as typeof items[number][] } });
    expect(fallback.get('[role=status]').text()).toBe('Keine Einträge vorhanden.');
    const custom = mount(ItemList, { props: { items: [] as typeof items[number][] }, slots: { empty: 'Nichts da' } });
    expect(custom.text()).toBe('Nichts da');
  });
  it('liefert die gewählte Option typsicher und kennt den Leerzustand', async () => {
    const names: Record<string, string> = { 1: 'Alpha', 2: 'Beta' };
    const wrapper = mount(SelectField, { props: { label: 'Projekt', options: items, getLabel: (o) => names[String(o.id)] ?? '' } });
    await wrapper.get('select').setValue('2');
    expect(wrapper.emitted('change')?.[0]).toEqual([items[1]]);
    await wrapper.get('select').setValue('');
    expect(wrapper.emitted('change')?.[1]).toEqual([null]);
    wrapper.unmount();
  });
});

describe('Teleport und <dialog>', () => {
  beforeAll(() => {
    // jsdom kennt showModal/close nicht: minimale Nachbildung des Browserverhaltens.
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) { this.setAttribute('open', ''); };
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); };
  });
  afterEach(() => { document.body.innerHTML = ''; });

  it('rendert per Teleport in body, öffnet modal und gibt den Fokus zurück', async () => {
    const trigger = document.createElement('button');
    document.body.append(trigger); trigger.focus();
    const open = ref(false);
    const wrapper = mount(ConfirmDialog, { attachTo: document.body, props: { title: 'Löschen?', open: open.value, 'onUpdate:open': (v: boolean) => { open.value = v; void wrapper.setProps({ open: v }); } } });
    expect(document.body.querySelector('dialog')).not.toBeNull();       // außerhalb der Komponenten-Wurzel
    await wrapper.setProps({ open: true });
    await nextTick();
    const dialog = document.body.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.getAttribute('aria-labelledby')).toBe('dialog-title');
    dialog.dispatchEvent(new Event('close'));                           // Esc im echten Browser
    expect(open.value).toBe(false);
    expect(document.activeElement).toBe(trigger);
    wrapper.unmount();
  });
});

describe('Suspense und async Komponenten', () => {
  it('zeigt Fallback und danach den geladenen Inhalt', async () => {
    let resolve!: (value: string[]) => void;
    const load = () => new Promise<string[]>((r) => { resolve = r; });
    const wrapper = mount(ReportHost, { props: { load } });
    await nextTick();
    expect(wrapper.text()).toContain('wird geladen');
    resolve(['Zeile A', 'Zeile B']); await flushPromises();
    expect(wrapper.findAll('li').map((li) => li.text())).toEqual(['Zeile A', 'Zeile B']);
    wrapper.unmount();
  });
  it('fängt Ladefehler mit onErrorCaptured ab', async () => {
    const wrapper = mount(ReportHost, { props: { load: () => Promise.reject(new Error('503')) } });
    await flushPromises();
    expect(wrapper.get('[role=alert]').text()).toContain('503');
    wrapper.unmount();
  });
  it('defineAsyncComponent zeigt bei fehlgeschlagenem Import den Fehlerzustand', async () => {
    const Panel = createLazyPanel(() => Promise.reject(new Error('chunk fehlt')));
    const wrapper = mount(defineComponent({ render: () => h('div', [h(Panel)]) }));
    await flushPromises();
    expect(wrapper.get('[role=alert]').text()).toBe('Panel konnte nicht geladen werden.');
    wrapper.unmount();
  });
});

describe('Transition und reduzierte Bewegung', () => {
  function mockMatchMedia(initial: boolean) {
    let listener: ((e: MediaQueryListEvent) => void) | undefined;
    const removeEventListener = vi.fn();
    window.matchMedia = vi.fn().mockReturnValue({
      matches: initial,
      addEventListener: (_: string, l: (e: MediaQueryListEvent) => void) => { listener = l; },
      removeEventListener,
    });
    return { fire: (matches: boolean) => listener?.({ matches } as MediaQueryListEvent), removeEventListener };
  }
  it('folgt der Systemeinstellung live und räumt den Listener auf', () => {
    const media = mockMatchMedia(false);
    const scope = effectScope();
    const reduced = scope.run(() => usePrefersReducedMotion())!;
    expect(reduced.value).toBe(false);
    media.fire(true); expect(reduced.value).toBe(true);
    scope.stop(); expect(media.removeEventListener).toHaveBeenCalledOnce();
  });
  it('rendert Einträge über stabile Keys und entfernt gelöschte', async () => {
    mockMatchMedia(true);
    const wrapper = mount(FadeList, { props: { items: [{ id: 1, label: 'A' }, { id: 2, label: 'B' }] } });
    await wrapper.setProps({ items: [{ id: 2, label: 'B' }] });
    expect(wrapper.findAll('li').map((li) => li.text())).toEqual(['B']);
    wrapper.unmount();
  });
});

describe('Typinferenz im Template', () => {
  it('rendert ProjectPicker (Typen prüft vue-tsc, nicht der Testlauf)', async () => {
    const wrapper = mount(ProjectPicker);
    await wrapper.get('select').setValue('2');
    expect(wrapper.text()).toContain('Gewählt: Altprojekt');
    wrapper.unmount();
  });
});
