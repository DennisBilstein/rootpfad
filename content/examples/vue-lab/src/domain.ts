export interface Task { id: number; title: string; done: boolean }

export function parseTasks(input: unknown): Task[] {
  if (!Array.isArray(input) || input.length > 100) throw new Error('Invalid task list');
  const ids = new Set<number>();
  return input.map((value: unknown) => {
    if (typeof value !== 'object' || value === null) throw new Error('Invalid task');
    const item = value as Record<string, unknown>;
    if (!Number.isSafeInteger(item.id) || typeof item.id !== 'number' || item.id < 1 ||
        typeof item.title !== 'string' || !item.title.trim() || item.title.length > 120 ||
        typeof item.done !== 'boolean' || ids.has(item.id)) throw new Error('Invalid task');
    ids.add(item.id);
    return { id: item.id, title: item.title.trim(), done: item.done };
  });
}

export function normalizeTitle(input: string): string {
  const title = input.trim();
  if (!title || title.length > 120) throw new Error('Bitte 1 bis 120 Zeichen eingeben.');
  return title;
}
