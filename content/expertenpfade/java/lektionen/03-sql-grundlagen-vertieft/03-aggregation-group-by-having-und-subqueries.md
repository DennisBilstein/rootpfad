# Aggregation, GROUP BY, HAVING und Subqueries

*SQL-Grundlagen vertieft · ca. 8 Min.*

**Aggregatfunktionen** (COUNT, SUM, AVG, MIN, MAX) fassen Zeilen zusammen. **GROUP BY** legt die Gruppierungsebene fest, **HAVING** filtert *nach* der Aggregation — im Gegensatz zu WHERE, das *vor* der Gruppierung einzelne Zeilen filtert.

```sql
SELECT kunde_id, COUNT(*) AS anzahl, SUM(betrag) AS gesamt
FROM bestellung
WHERE datum >= '2026-01-01'      -- filtert Zeilen VOR der Gruppierung
GROUP BY kunde_id
HAVING COUNT(*) > 5              -- filtert Gruppen NACH der Aggregation
ORDER BY gesamt DESC;
```

> **Tipp:** WHERE COUNT(\*) > 5 ist syntaktisch ungültig — zum Zeitpunkt der WHERE-Auswertung existiert noch keine Gruppe und damit kein COUNT. Diese Unterscheidung ist einer der zuverlässigsten Prüfungsklassiker überhaupt.

## Kontrollfragen

**1. Worin unterscheiden sich WHERE und HAVING?**

- [ ] Kein Unterschied
- [x] WHERE filtert Zeilen vor der Gruppierung, HAVING Gruppen danach
- [ ] HAVING funktioniert nur mit JOINs

*Erklärung:* Nur HAVING darf sich auf Aggregatfunktionen beziehen.

**2. Wie prüft man in SQL korrekt auf einen fehlenden Wert?**

- [ ] feld = NULL
- [x] feld IS NULL
- [ ] feld == NULL

*Erklärung:* NULL ist kein Wert, sondern dessen Abwesenheit — Vergleiche mit = ergeben „unbekannt".
