import * as z from 'zod';

// Lektion "Dynamische Formulare": Eine Liste von Eingabezeilen mit Zod prüfen.
export const MAX_MEMBERS = 5;

// "key" gehört nur der Oberfläche (stabile Identität einer Zeile für v-for) und verlässt das Formular nicht.
const memberSchema = z.object({
  key: z.string(),
  email: z.string().trim().min(1, { error: 'E-Mail fehlt' })
    .pipe(z.email({ error: 'Gültige E-Mail-Adresse eingeben' }))
    .transform((value) => value.toLowerCase()),
});

export const inviteSchema = z.object({
  team: z.string().trim().min(1, { error: 'Teamname fehlt' }).max(40, { error: 'Teamname darf höchstens 40 Zeichen haben' }),
  members: z.array(memberSchema)
    .min(1, { error: 'Mindestens eine Person einladen' })
    .max(MAX_MEMBERS, { error: `Höchstens ${MAX_MEMBERS} Personen einladen` }),
}).superRefine((value, ctx) => {
  // Doppelte Adressen: die ZWEITE und jede weitere Zeile bekommt den Fehler, nicht die erste.
  const seen = new Set<string>();
  value.members.forEach((member, index) => {
    if (seen.has(member.email)) ctx.addIssue({ code: 'custom', path: ['members', index, 'email'], message: 'Diese Adresse steht schon in der Liste' });
    seen.add(member.email);
  });
}).transform((value) => ({ team: value.team, emails: value.members.map((member) => member.email) }));   // API-Form ohne UI-Schlüssel

export type InviteInput = z.input<typeof inviteSchema>;
export type InviteData = z.output<typeof inviteSchema>;
/** Schlüssel: "team", "members" (Listenfehler) oder "members.<Index>.email" (Zeilenfehler). */
export type InviteErrors = Record<string, string>;

export function validateInvite(raw: unknown): { ok: true; data: InviteData } | { ok: false; errors: InviteErrors } {
  const result = inviteSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors: InviteErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.');
    errors[key] ??= issue.message;                       // je Feld die erste Meldung
  }
  return { ok: false, errors };
}
