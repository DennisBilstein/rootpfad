# Subqueries, Aggregatfunktionen, GROUP BY/HAVING

*SQL-Grundlagen vertieft · ca. 8 Min.*

**Aggregatfunktionen** (COUNT, SUM, AVG, MIN, MAX) fassen mehrere Zeilen zu einem Wert zusammen. **GROUP BY** definiert die Gruppierungsebene, **HAVING** filtert NACH der Aggregation — im Gegensatz zu WHERE, das VOR der Aggregation auf einzelnen Zeilen filtert. **Subqueries** können in WHERE (z. B. mit IN/EXISTS), FROM oder SELECT stehen.

```sql
SELECT kunde_id, COUNT(*) AS anzahl_bestellungen
FROM bestellung
GROUP BY kunde_id
HAVING COUNT(*) > 5;

SELECT name FROM kunde
WHERE id IN (SELECT kunde_id FROM bestellung WHERE betrag > 1000);
```

> **Tipp:** WHERE vs. HAVING ist ein AP1-Klassiker: WHERE filtert einzelne Zeilen vor der Gruppierung, HAVING filtert bereits aggregierte Gruppen. Ein "WHERE COUNT(\*) > 5" ist deshalb syntaktisch ungültig — COUNT(\*) existiert an der Stelle noch nicht.

## Kontrollfragen

**1. Was ist der Unterschied zwischen WHERE und HAVING?**

- [ ] Kein Unterschied, beide sind austauschbar
- [x] WHERE filtert vor der Aggregation einzelne Zeilen, HAVING filtert nach der Aggregation Gruppen
- [ ] HAVING ist nur bei INSERT erlaubt

*Erklärung:* HAVING kann sich auf Aggregatfunktionen wie COUNT(*) beziehen, WHERE nicht — weil WHERE vor der Gruppierung ausgewertet wird.

**2. Welche Aggregatfunktion zählt die Anzahl der Zeilen?**

- [ ] SUM(*)
- [x] COUNT(*)
- [ ] AVG(*)

*Erklärung:* COUNT(*) zählt alle Zeilen einer Gruppe bzw. Ergebnismenge.
