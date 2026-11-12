import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createMemoryHistory, createRouter } from 'vue-router';
import { defineComponent, h, ref, type Ref, type VNode } from 'vue';
import { validateTaskForm, todayIso } from '../src/lessons/forms/taskSchema';
import TaskForm from '../src/lessons/forms/TaskForm.vue';
import { ApiError, createTasksApi, type Task } from '../src/lessons/data/tasksApi';
import { useTasksQuery, useToggleTask } from '../src/lessons/data/queries';
import { parsePage } from '../src/lessons/data/usePageParam';
import TaskInbox from '../src/lessons/data/TaskInbox.vue';
import { createFakeServer } from './fakeServer';

const TODAY = '2030-06-15';
const seed: Task[] = Array.from({ length: 7 }, (_, i) => ({ id: i + 1, title: `Aufgabe ${i + 1}`, done: false, dueDate: null }));

async function mountWithApp(render: () => VNode, queryClient = newClient()) {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { render: () => null } }] });
  await router.push('/'); await router.isReady();
  const wrapper = mount(defineComponent({ render }), { global: { plugins: [router, [VueQueryPlugin, { queryClient }]] } });
  return { wrapper, router, queryClient };
}
function newClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
}

describe('Zod-Schema', () => {
  it('Normalfall: trimmt und wandelt "" in null', () => {
    expect(validateTaskForm({ title: '  Lesen  ', dueDate: '' }, TODAY)).toEqual({ ok: true, data: { title: 'Lesen', dueDate: null } });
  });
  it('Grenzfälle: 120 Zeichen ok, 121 nicht; heute ok, gestern nicht', () => {
    expect(validateTaskForm({ title: 'x'.repeat(120), dueDate: TODAY }, TODAY).ok).toBe(true);
    const tooLong = validateTaskForm({ title: 'x'.repeat(121), dueDate: '' }, TODAY);
    expect(tooLong.ok === false && tooLong.errors.title).toMatch(/höchstens 120/);
    const past = validateTaskForm({ title: 'a', dueDate: '2030-06-14' }, TODAY);
    expect(past.ok === false && past.errors.dueDate).toMatch(/Vergangenheit/);
  });
  it('Fehlerfälle: nur Leerzeichen, falsches Datumsformat, falsche Typen', () => {
    const blank = validateTaskForm({ title: '   ', dueDate: '' }, TODAY);
    expect(blank.ok === false && blank.errors.title).toBe('Titel darf nicht leer sein');
    const format = validateTaskForm({ title: 'a', dueDate: '15.06.2030' }, TODAY);
    expect(format.ok === false && format.errors.dueDate).toMatch(/JJJJ-MM-TT/);
    expect(validateTaskForm({ title: 42, dueDate: null }, TODAY).ok).toBe(false);
  });
  it('todayIso nutzt das lokale Datum', () => {
    expect(todayIso(new Date(2031, 0, 5, 23, 59))).toBe('2031-01-05');
  });
});

describe('TaskForm (Zugänglichkeit)', () => {
  it('zeigt Fehler erst nach Blur, setzt aria-Attribute und behält die Eingabe', async () => {
    const wrapper = mount(TaskForm, { props: { today: TODAY }, attachTo: document.body });
    const title = wrapper.get('#task-title');
    expect(wrapper.find('#task-title-error').exists()).toBe(false);
    await title.setValue('   '); await title.trigger('blur');
    expect(title.attributes('aria-invalid')).toBe('true');
    expect(title.attributes('aria-describedby')).toBe('task-title-error');
    expect(wrapper.get('#task-title-error').text()).toBe('Titel darf nicht leer sein');
    expect((title.element as HTMLInputElement).value).toBe('   ');
    wrapper.unmount();
  });
  it('fokussiert beim Absenden das erste ungültige Feld und sendet nichts', async () => {
    const wrapper = mount(TaskForm, { props: { today: TODAY }, attachTo: document.body });
    await wrapper.get('form').trigger('submit');
    expect(document.activeElement).toBe(wrapper.get('#task-title').element);
    expect(wrapper.emitted('submit')).toBeUndefined();
    wrapper.unmount();
  });
  it('sendet geprüfte Daten', async () => {
    const wrapper = mount(TaskForm, { props: { today: TODAY } });
    await wrapper.get('#task-title').setValue(' Test ');
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted('submit')).toEqual([[{ title: 'Test', dueDate: null }]]);
    wrapper.unmount();
  });
});

describe('API-Grenze', () => {
  it('wandelt RFC-9457-Antworten in ApiError mit Feldfehlern', async () => {
    const api = createTasksApi(createFakeServer(seed).fetcher);
    const error = await api.create({ title: 'Duplikat', dueDate: null }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(422);
    expect((error as ApiError).fieldErrors).toEqual({ title: 'Titel existiert bereits' });
  });
  it('lehnt Antworten ab, die den Vertrag verletzen', async () => {
    const server = createFakeServer(seed); server.behavior.brokenList = true;
    await expect(createTasksApi(server.fetcher).list(1)).rejects.toThrow();
  });
});

describe('Query-Cache', () => {
  const Probe = defineComponent({
    props: { api: { type: Object, required: true }, page: { type: Object, required: true } },
    setup(props) {
      const query = useTasksQuery(props.api as ReturnType<typeof createTasksApi>, props.page as Ref<number>);
      const toggle = useToggleTask(props.api as ReturnType<typeof createTasksApi>);
      return () => h('div', [
        h('p', { id: 'titles' }, query.data.value?.items.map((t) => `${t.title}:${t.done}`).join('|') ?? 'leer'),
        h('button', { id: 'toggle', onClick: () => toggle.mutate({ id: 1, done: true }) }),
      ]);
    },
  });

  it('nutzt frische Daten aus dem Cache und lädt nach Invalidierung neu', async () => {
    const server = createFakeServer(seed); const client = newClient();
    const props = { api: createTasksApi(server.fetcher), page: ref(1) };
    const first = await mountWithApp(() => h(Probe, props), client); await flushPromises();
    const second = await mountWithApp(() => h(Probe, props), client); await flushPromises();
    expect(server.calls.filter((c) => c.startsWith('GET'))).toHaveLength(1);       // zweiter Mount: Cache-Treffer
    await client.invalidateQueries({ queryKey: ['tasks'] }); await flushPromises();
    expect(server.calls.filter((c) => c.startsWith('GET'))).toHaveLength(2);
    first.wrapper.unmount(); second.wrapper.unmount();
  });

  it('zeigt das optimistische Update sofort und bestätigt es danach', async () => {
    const server = createFakeServer(seed);
    let release!: () => void; server.behavior.patchGate = new Promise((r) => { release = r; });
    const { wrapper } = await mountWithApp(() => h(Probe, { api: createTasksApi(server.fetcher), page: ref(1) })); await flushPromises();
    await wrapper.get('#toggle').trigger('click'); await flushPromises();
    expect(wrapper.get('#titles').text()).toContain('Aufgabe 1:true');           // Server hat noch nicht geantwortet
    release(); await flushPromises();
    expect(wrapper.get('#titles').text()).toContain('Aufgabe 1:true');
    wrapper.unmount();
  });

  it('rollt bei Serverfehler auf den früheren Stand zurück', async () => {
    const server = createFakeServer(seed); server.behavior.failPatch = true;
    let release!: () => void; server.behavior.patchGate = new Promise((r) => { release = r; });
    const { wrapper } = await mountWithApp(() => h(Probe, { api: createTasksApi(server.fetcher), page: ref(1) })); await flushPromises();
    await wrapper.get('#toggle').trigger('click'); await flushPromises();
    expect(wrapper.get('#titles').text()).toContain('Aufgabe 1:true');
    release();
    await vi.waitFor(() => expect(wrapper.get('#titles').text()).toContain('Aufgabe 1:false'));   // Rollback + Neuabgleich
    wrapper.unmount();
  });
});

describe('URL-Zustand', () => {
  it('liest page defensiv', () => {
    expect([parsePage('3'), parsePage('0'), parsePage('-3'), parsePage('abc'), parsePage(undefined), parsePage(['2', '9']), parsePage('99999999')])
      .toEqual([3, 1, 1, 1, 1, 2, 1]);
  });
});

describe('Mini-Projekt TaskInbox', () => {
  it('lädt, blättert über die URL und zeigt Ladezustand', async () => {
    const server = createFakeServer(seed);
    const { wrapper, router } = await mountWithApp(() => h(TaskInbox, { api: createTasksApi(server.fetcher), today: TODAY }));
    expect(wrapper.text()).toContain('Lade Aufgaben');
    await flushPromises();
    expect(wrapper.findAll('ul li')).toHaveLength(5);
    await wrapper.findAll('nav button')[1]!.trigger('click'); await flushPromises();
    expect(router.currentRoute.value.query.page).toBe('2');
    expect(wrapper.findAll('ul li')).toHaveLength(2);
    expect(wrapper.text()).toContain('Seite 2 von 2');
    wrapper.unmount();
  });
  it('zeigt einen Fehlerzustand mit Wiederholung', async () => {
    const server = createFakeServer(seed); server.behavior.brokenList = true;
    const { wrapper } = await mountWithApp(() => h(TaskInbox, { api: createTasksApi(server.fetcher), today: TODAY }));
    await flushPromises();
    expect(wrapper.get('[role=alert]').text()).toContain('konnten nicht geladen werden');
    server.behavior.brokenList = false;
    await wrapper.get('[role=alert] button').trigger('click'); await flushPromises();
    expect(wrapper.findAll('ul li').length).toBeGreaterThan(0);
    wrapper.unmount();
  });
  it('zeigt den Leerzustand', async () => {
    const { wrapper } = await mountWithApp(() => h(TaskInbox, { api: createTasksApi(createFakeServer([]).fetcher), today: TODAY }));
    await flushPromises();
    expect(wrapper.text()).toContain('Noch keine Aufgaben');
    wrapper.unmount();
  });
  it('legt an, aktualisiert die Liste und ordnet Serverfehler dem Feld zu', async () => {
    const server = createFakeServer(seed.slice(0, 1));
    const { wrapper } = await mountWithApp(() => h(TaskInbox, { api: createTasksApi(server.fetcher), today: TODAY }));
    await flushPromises();
    await wrapper.get('#task-title').setValue('Duplikat'); await wrapper.get('form').trigger('submit'); await flushPromises();
    expect(wrapper.get('#task-title-error').text()).toBe('Titel existiert bereits');
    expect((wrapper.get('#task-title').element as HTMLInputElement).value).toBe('Duplikat');   // Eingabe bleibt
    await wrapper.get('#task-title').setValue('Neue Aufgabe'); await wrapper.get('form').trigger('submit'); await flushPromises();
    expect(wrapper.text()).toContain('Neue Aufgabe');
    expect(server.calls.filter((c) => c.startsWith('POST'))).toHaveLength(2);
    wrapper.unmount();
  });
});
