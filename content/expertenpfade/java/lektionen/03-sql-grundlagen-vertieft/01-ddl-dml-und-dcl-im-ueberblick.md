# DDL, DML und DCL im Überblick

*SQL-Grundlagen vertieft · ca. 6 Min.*

SQL gliedert sich in drei Teilsprachen — ein AP1-Klassiker als Zuordnungsfrage:

| Kategorie | Befehle | Zweck |
| --- | --- | --- |
| DDL (Definition) | CREATE, ALTER, DROP | Struktur anlegen und ändern |
| DML (Manipulation) | SELECT, INSERT, UPDATE, DELETE | Daten lesen und ändern |
| DCL (Control) | GRANT, REVOKE | Rechte vergeben und entziehen |

Manche Quellen führen zusätzlich **TCL** (Transaction Control) mit `COMMIT` und `ROLLBACK` als eigene Kategorie.

> **Tipp:** Merkhilfe: DDL definiert die Möbel, DML bewegt die Sachen darin, DCL entscheidet, wer die Tür aufschließen darf. TRUNCATE ist übrigens DDL, nicht DML — es löscht die Tabelle strukturell leer und lässt sich in vielen Systemen nicht zurückrollen.

## Kontrollfragen

**1. Zu welcher Kategorie gehört CREATE TABLE?**

- [ ] DML
- [x] DDL
- [ ] DCL

*Erklärung:* CREATE verändert die Struktur — Data Definition Language.

**2. Welche Befehle gehören zur Transaktionssteuerung?**

- [ ] GRANT und REVOKE
- [x] COMMIT und ROLLBACK
- [ ] CREATE und DROP

*Erklärung:* COMMIT schreibt eine Transaktion fest, ROLLBACK verwirft sie.
