import { describe, it, expect } from 'vitest';
import { validateInvite } from '../src/lessons/dynamic-forms/inviteSchema';

const row = (key: string, email: string) => ({ key, email });

describe('inviteSchema (Probe vor dem Formular)', () => {
  it('Normalfall: trimmt, normalisiert E-Mails und entfernt die UI-Schlüssel', () => {
    const result = validateInvite({ team: '  Backend  ', members: [row('a', '  Ada@Example.COM '), row('b', 'grace@example.com')] });
    expect(result).toEqual({ ok: true, data: { team: 'Backend', emails: ['ada@example.com', 'grace@example.com'] } });
  });

  it('Fehlerfälle: leerer Teamname, fehlende und ungültige E-Mails mit Zeilenpfad', () => {
    const result = validateInvite({ team: ' ', members: [row('a', ''), row('b', 'kein-at'), row('c', 'ok@example.com')] });
    expect(result).toEqual({ ok: false, errors: { team: 'Teamname fehlt', 'members.0.email': 'E-Mail fehlt', 'members.1.email': 'Gültige E-Mail-Adresse eingeben' } });
  });

  it('Grenzfälle: 0 und 6 Zeilen sind ungültig, 1 und 5 gültig', () => {
    expect(validateInvite({ team: 'T', members: [] })).toMatchObject({ ok: false, errors: { members: 'Mindestens eine Person einladen' } });
    const many = (n: number) => Array.from({ length: n }, (_, i) => row(`k${i}`, `p${i}@example.com`));
    expect(validateInvite({ team: 'T', members: many(6) })).toMatchObject({ ok: false, errors: { members: 'Höchstens 5 Personen einladen' } });
    expect(validateInvite({ team: 'T', members: many(1) }).ok).toBe(true);
    expect(validateInvite({ team: 'T', members: many(5) }).ok).toBe(true);
  });

  it('Teamname: 40 Zeichen ok, 41 nicht', () => {
    expect(validateInvite({ team: 'x'.repeat(40), members: [row('a', 'a@example.com')] }).ok).toBe(true);
    expect(validateInvite({ team: 'x'.repeat(41), members: [row('a', 'a@example.com')] })).toMatchObject({ ok: false, errors: { team: 'Teamname darf höchstens 40 Zeichen haben' } });
  });

  it('Doppelte Adressen (ohne Beachtung der Schreibweise) markieren die späteren Zeilen', () => {
    const result = validateInvite({ team: 'T', members: [row('a', 'a@example.com'), row('b', 'b@example.com'), row('c', ' A@EXAMPLE.com')] });
    expect(result).toEqual({ ok: false, errors: { 'members.2.email': 'Diese Adresse steht schon in der Liste' } });
  });

  it('Fremdformen werden abgelehnt', () => {
    expect(validateInvite(null).ok).toBe(false);
    expect(validateInvite({ team: 1, members: 'x' }).ok).toBe(false);
  });

  it('Zeilenfehler und Dubletten werden gemeinsam gemeldet (beobachtetes Zod-4-Verhalten)', () => {
    const result = validateInvite({ team: 'T', members: [row('a', 'a@example.com'), row('b', 'a@example.com'), row('c', 'kaputt')] });
    expect(result).toEqual({ ok: false, errors: {
      'members.1.email': 'Diese Adresse steht schon in der Liste',
      'members.2.email': 'Gültige E-Mail-Adresse eingeben',
    } });
  });
});
