import * as z from 'zod';
import type { TaskFormData } from '../forms/taskSchema';

// Lektion "Serverdaten": Fremde Antworten sind unknown, bis ein Schema sie bestätigt.
export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(120),
  done: z.boolean(),
  dueDate: z.iso.date().nullable(),
});
export const taskPageSchema = z.object({
  items: z.array(taskSchema).max(100),
  page: z.number().int().min(1),
  totalPages: z.number().int().min(1),
});
export type Task = z.infer<typeof taskSchema>;
export type TaskPage = z.infer<typeof taskPageSchema>;

// RFC 9457 "Problem Details": Das Spring-Lab (ProblemDetail) liefert genau diese Form.
const problemSchema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  status: z.number().optional(),
  detail: z.string().optional(),
  violations: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
});
export type Problem = z.infer<typeof problemSchema>;

export class ApiError extends Error {
  constructor(readonly status: number, readonly problem: Problem | null) {
    super(problem?.title ?? `HTTP ${status}`);
  }
  /** Feldbezogene Serverfehler; je Feld die erste Meldung. */
  get fieldErrors(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const { field, message } of this.problem?.violations ?? []) result[field] ??= message;
    return result;
  }
}

export function createTasksApi(fetcher: typeof fetch = fetch, baseUrl = '/api/tasks') {
  async function request<S extends z.ZodType>(url: string, init: RequestInit, schema: S): Promise<z.output<S>> {
    const response = await fetcher(url, { ...init, headers: { Accept: 'application/json, application/problem+json', ...init.headers } });
    if (!response.ok) {
      const parsed = problemSchema.safeParse(await response.json().catch(() => null));
      throw new ApiError(response.status, parsed.success ? parsed.data : null);
    }
    return schema.parse(await response.json());                 // wirft bei Vertragsbruch, nie ungeprüft weiterreichen
  }
  const json = { 'Content-Type': 'application/json' };
  return {
    list: (page: number, options: { signal?: AbortSignal } = {}) =>
      request(`${baseUrl}?page=${page}&size=5`, { signal: options.signal }, taskPageSchema),
    create: (data: TaskFormData) =>
      request(baseUrl, { method: 'POST', headers: json, body: JSON.stringify(data) }, taskSchema),
    setDone: (id: number, done: boolean) =>
      request(`${baseUrl}/${id}`, { method: 'PATCH', headers: json, body: JSON.stringify({ done }) }, taskSchema),
  };
}
export type TasksApi = ReturnType<typeof createTasksApi>;
