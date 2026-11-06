# JOIN-Typen im Detail

*SQL-Grundlagen vertieft · ca. 9 Min.*

**INNER JOIN** liefert nur Zeilen mit Treffer auf beiden Seiten. **LEFT OUTER JOIN** behält zusätzlich alle Zeilen der linken Tabelle und füllt rechts mit NULL. **RIGHT OUTER JOIN** umgekehrt, **FULL OUTER JOIN** beides. **CROSS JOIN** bildet das kartesische Produkt — meist ein Versehen.

```sql
-- Nur Kunden MIT Bestellung
SELECT k.name, b.betrag
FROM kunde k INNER JOIN bestellung b ON b.kunde_id = k.id;

-- Alle Kunden, auch ohne Bestellung (betrag ist dann NULL)
SELECT k.name, b.betrag
FROM kunde k LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id;
```

> **Tipp:** Eine subtile Falle, die auch erfahrene Entwickler trifft: Steht eine Bedingung auf die RECHTE Tabelle in der WHERE-Klausel (z. B. b.betrag > 100), wird ein LEFT JOIN faktisch zum INNER JOIN — die NULL-Zeilen erfüllen die Bedingung nicht und fliegen raus. Solche Bedingungen gehören in die ON-Klausel.

## Kontrollfragen

**1. Was liefert ein LEFT OUTER JOIN zusätzlich zum INNER JOIN?**

- [ ] Doppelte Zeilen
- [x] Zeilen der linken Tabelle ohne Treffer, rechts mit NULL
- [ ] Nur sortierte Ergebnisse

*Erklärung:* Die linke Tabelle bleibt vollständig erhalten.

**2. Was erzeugt ein CROSS JOIN?**

- [x] Das kartesische Produkt beider Tabellen
- [ ] Eine leere Menge
- [ ] Nur eindeutige Paare

*Erklärung:* Jede Zeile links wird mit jeder Zeile rechts kombiniert.
