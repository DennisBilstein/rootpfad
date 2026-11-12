import type { Task } from '../src/lessons/data/tasksApi';

/** In-Memory-"Backend" für Tests: kein Netzwerk, aber echte Response-Objekte und Statuscodes. */
export function createFakeServer(initial: Task[] = []) {
  const tasks = structuredClone(initial);   // Tests dürfen sich nicht gegenseitig beeinflussen
  const calls: string[] = [];
  let nextId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
  const behavior = { failPatch: false, patchGate: null as Promise<void> | null, listGate: null as Promise<void> | null, brokenList: false };

  const json = (status: number, body: unknown, type = 'application/json') =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': type } });

  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(String(input), 'http://localhost');
    const method = init?.method ?? 'GET';
    calls.push(`${method} ${url.pathname}${url.search}`);
    if (method === 'GET') {
      await behavior.listGate;
      if (behavior.brokenList) return json(200, { items: [{ id: 'x' }] });                   // Vertragsbruch
      const page = Number(url.searchParams.get('page') ?? '1');
      const size = Number(url.searchParams.get('size') ?? '5');
      return json(200, { items: tasks.slice((page - 1) * size, page * size), page, totalPages: Math.max(1, Math.ceil(tasks.length / size)) });
    }
    if (method === 'POST') {
      const body = JSON.parse(String(init?.body)) as { title: string; dueDate: string | null };
      if (body.title.toLowerCase() === 'duplikat') {
        return json(422, { type: 'https://rootpfad.example/probleme/validierung', title: 'Validierung fehlgeschlagen', status: 422,
          violations: [{ field: 'title', message: 'Titel existiert bereits' }] }, 'application/problem+json');
      }
      const task: Task = { id: nextId++, title: body.title, done: false, dueDate: body.dueDate };
      tasks.push(task);
      return json(201, task);
    }
    if (method === 'PATCH') {
      await behavior.patchGate;
      if (behavior.failPatch) return json(500, { title: 'Interner Fehler', status: 500 }, 'application/problem+json');
      const id = Number(url.pathname.split('/').pop());
      const task = tasks.find((t) => t.id === id);
      if (!task) return json(404, { title: 'Nicht gefunden', status: 404 }, 'application/problem+json');
      task.done = (JSON.parse(String(init?.body)) as { done: boolean }).done;
      return json(200, task);
    }
    return json(405, { title: 'Methode nicht erlaubt', status: 405 });
  };
  return { fetcher, calls, tasks, behavior };
}
