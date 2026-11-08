import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { effectScope } from 'vue';
import { parseTasks, normalizeTitle } from '../src/domain';
import { useTasksStore } from '../src/stores/tasks';
import { useTaskApi } from '../src/composables/useTaskApi';
import TaskItem from '../src/components/TaskItem.vue';
import TasksView from '../src/views/TasksView.vue';

describe('Datenvertrag und Store', () => {
  it('prüft unbekannte API-Daten zur Laufzeit', () => {
    expect(parseTasks([{ id: 1, title: ' Task ', done: false }])[0]?.title).toBe('Task');
    expect(() => parseTasks([{ id: 1, title: 'x', done: 'false' }])).toThrow();
    expect(() => parseTasks([{ id: 1, title: 'x', done: true }, { id: 1, title: 'y', done: false }])).toThrow();
    expect(() => normalizeTitle('  ')).toThrow();
    expect(() => normalizeTitle('x'.repeat(121))).toThrow();
  });
  it('fügt hinzu, schaltet um und berechnet offene Aufgaben', () => {
    setActivePinia(createPinia());
    const store = useTasksStore(); store.add('Learn');
    expect(store.remaining).toBe(1); store.toggle(1); expect(store.remaining).toBe(0);
    expect(() => store.toggle(99)).toThrow();
  });
});

describe('Komponentenverträge', () => {
  it('emittiert statt Props zu mutieren und zeigt HTML als Text', async () => {
    const task = { id: 7, title: '<img src=x onerror=alert(1)>', done: false };
    const wrapper = mount(TaskItem, { props: { task } });
    await wrapper.get('input').setValue(true);
    expect(wrapper.emitted('toggle')).toEqual([[7]]);
    expect(task.done).toBe(false); expect(wrapper.find('img').exists()).toBe(false);
    wrapper.unmount();
  });
  it('validiert leere Eingabe und ergänzt eine Aufgabe per Formular', async () => {
    const wrapper = mount(TasksView, { global: { plugins: [createPinia()] } });
    await wrapper.get('form').trigger('submit'); expect(wrapper.get('#task-error').text()).not.toBe('');
    await wrapper.get('#task-title').setValue('Test schreiben'); await wrapper.get('form').trigger('submit');
    expect(wrapper.text()).toContain('Test schreiben'); expect(wrapper.get('#task-error').text()).toBe('');
    wrapper.unmount();
  });
});

describe('API-Grenze', () => {
  it('behandelt HTTP-Fehler und gültige Daten ohne echtes Netzwerk', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: false, status: 503 }).mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, title: 'Read', done: false }] });
    const scope = effectScope();
    const api = scope.run(() => useTaskApi(fetcher as typeof fetch))!;
    await api.load(); expect(api.error.value).toBe('HTTP 503'); expect(api.loading.value).toBe(false);
    await api.load(); expect(api.tasks.value).toHaveLength(1); expect(api.error.value).toBe(''); scope.stop();
  });
  it('ignoriert eine verspätete alte Antwort', async () => {
    let resolveFirst!: (value: unknown) => void;
    const first = new Promise(resolve => { resolveFirst = resolve; });
    const fetcher = vi.fn().mockReturnValueOnce(first).mockResolvedValueOnce({ ok: true, json: async () => [{ id: 2, title: 'New', done: false }] });
    const scope = effectScope(); const api = scope.run(() => useTaskApi(fetcher as typeof fetch))!;
    const old = api.load(); await api.load();
    resolveFirst({ ok: true, json: async () => [{ id: 1, title: 'Old', done: false }] });
    await old; await flushPromises(); expect(api.tasks.value[0]?.title).toBe('New'); scope.stop();
  });
});
