# JOIN-Typen im Detail

*SQL-Grundlagen vertieft · ca. 9 Min.*

**INNER JOIN** liefert nur Zeilen mit Treffer auf beiden Seiten. **LEFT OUTER JOIN** liefert zusätzlich alle Zeilen der linken Tabelle ohne Treffer rechts (NULL-Auffüllung). **RIGHT OUTER JOIN** umgekehrt. **FULL OUTER JOIN** kombiniert beides. **CROSS JOIN** bildet das kartesische Produkt — in der Praxis fast immer ein Fehler, wenn ungewollt.

```sql
-- INNER JOIN: nur Kunden MIT Bestellung
SELECT k.name, b.betrag
FROM kunde k INNER JOIN bestellung b ON b.kunde_id = k.id;

-- LEFT OUTER JOIN: alle Kunden, auch ohne Bestellung (betrag = NULL)
SELECT k.name, b.betrag
FROM kunde k LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id;
```

> **Tipp:** Die AP1 zeigt gerne zwei Tabellen mit konkreten Beispieldaten und fragt nach dem Ergebnis eines bestimmten JOINs. Zähle systematisch: erst alle INNER-Treffer notieren, dann bei OUTER JOIN die "verwaisten" Zeilen der Basistabelle mit NULL ergänzen.

## Kontrollfragen

**1. Was liefert ein LEFT OUTER JOIN zusätzlich gegenüber einem INNER JOIN?**

- [ ] Nur Zeilen mit Treffer auf beiden Seiten
- [x] Zeilen der linken Tabelle ohne Treffer rechts, mit NULL aufgefüllt
- [ ] Doppelte Zeilen bei jedem Treffer

*Erklärung:* LEFT OUTER JOIN behält alle linken Zeilen, auch ohne passenden rechten Partner.

**2. Was erzeugt ein CROSS JOIN?**

- [x] Das kartesische Produkt beider Tabellen
- [ ] Nur eindeutige Zeilenpaare
- [ ] Eine leere Ergebnismenge

*Erklärung:* CROSS JOIN verknüpft jede Zeile der einen mit jeder Zeile der anderen Tabelle — ohne Bedingung.
