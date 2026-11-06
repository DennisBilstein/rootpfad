# DDL/DML/DCL im Überblick

*SQL-Grundlagen vertieft · ca. 6 Min.*

SQL gliedert sich in drei Teilsprachen — ein AP1-Klassiker als Zuordnungsfrage:

| Kategorie | Befehle | ABAP-Entsprechung |
| --- | --- | --- |
| DDL (Definition) | CREATE, ALTER, DROP | DDIC/CDS define table/view entity |
| DML (Manipulation) | SELECT, INSERT, UPDATE, DELETE | Open-SQL-Statements |
| DCL (Control) | GRANT, REVOKE | PFCG-Rollen / Berechtigungsobjekte |

In ABAP wird DDL meist deklarativ im DDIC/CDS gepflegt statt per direktem CREATE-Statement; DML läuft über Open SQL; DCL entspricht dem Berechtigungskonzept.

> **Tipp:** Merkregel: DDL definiert die "Möbel" (Struktur), DML bewegt die "Sachen" (Daten) darin, DCL entscheidet, wer welche Tür aufschließen darf (Berechtigungen).

## Kontrollfragen

**1. Zu welcher SQL-Kategorie gehört CREATE TABLE?**

- [ ] DML
- [x] DDL
- [ ] DCL

*Erklärung:* CREATE definiert Struktur — das ist Data Definition Language.

**2. Welcher ABAP-Mechanismus entspricht am ehesten DCL?**

- [x] PFCG-Rollen/Berechtigungsobjekte
- [ ] Interne Tabellen
- [ ] CDS-Assoziationen

*Erklärung:* Berechtigungssteuerung in ABAP läuft über Berechtigungsobjekte und PFCG-Rollen — das DCL-Äquivalent.
