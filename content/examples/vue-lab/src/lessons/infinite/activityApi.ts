import * as z from 'zod';
import { ApiError } from '../data/tasksApi';

// Lektion "Infinite Queries": Cursor-Paginierung. Der Server liefert pro Seite einen Zeiger auf die nächste.
export const activitySchema = z.object({ id: z.number().int().positive(), text: z.string().min(1) });
export const activityPageSchema = z.object({
  items: z.array(activitySchema).max(50),
  nextCursor: z.string().nullable(),            // null = letzte Seite
});
export type Activity = z.infer<typeof activitySchema>;
export type ActivityPage = z.infer<typeof activityPageSchema>;

export function createActivityApi(fetcher: typeof fetch = fetch, baseUrl = '/api/activity') {
  async function get<S extends z.ZodType>(url: string, schema: S, signal?: AbortSignal): Promise<z.output<S>> {
    const response = await fetcher(url, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new ApiError(response.status, null);
    return schema.parse(await response.json());
  }
  return {
    list: (cursor: string | null, signal?: AbortSignal) =>
      get(`${baseUrl}?limit=10${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`, activityPageSchema, signal),
    detail: (id: number, signal?: AbortSignal) => get(`${baseUrl}/${id}`, activitySchema, signal),
  };
}
export type ActivityApi = ReturnType<typeof createActivityApi>;
