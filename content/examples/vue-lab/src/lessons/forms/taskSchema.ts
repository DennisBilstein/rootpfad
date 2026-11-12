import * as z from 'zod';

// Lektion "Formulare mit Zod": Das Schema ist die einzige Quelle für Regeln UND Typen.
export function todayIso(now: Date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;   // lokales Datum, nicht UTC
}

export function createTaskFormSchema(today: string = todayIso()) {
  return z.object({
    title: z.string()
      .trim()                                                         // Leerzeichen vor der Prüfung entfernen
      .min(1, { error: 'Titel darf nicht leer sein' })
      .max(120, { error: 'Titel darf höchstens 120 Zeichen haben' }),
    dueDate: z.union([z.literal(''), z.iso.date({ error: 'Datum im Format JJJJ-MM-TT eingeben' })])
      .refine((value) => value === '' || value >= today, { error: 'Fälligkeit darf nicht in der Vergangenheit liegen' })
      .transform((value) => (value === '' ? null : value)),          // "" aus dem Formular wird zu null für die API
  });
}

export type TaskFormInput = z.input<ReturnType<typeof createTaskFormSchema>>;    // Rohwerte aus den Eingabefeldern
export type TaskFormData = z.output<ReturnType<typeof createTaskFormSchema>>;    // geprüfte Daten für die API
export type FieldErrors = Partial<Record<keyof TaskFormInput, string>>;

export type ValidationResult =
  | { ok: true; data: TaskFormData }
  | { ok: false; errors: FieldErrors };

export function validateTaskForm(raw: unknown, today?: string): ValidationResult {
  const result = createTaskFormSchema(today).safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    // Nur die erste Meldung je Feld zeigen: eine Korrektur nach der anderen.
    if ((field === 'title' || field === 'dueDate') && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
