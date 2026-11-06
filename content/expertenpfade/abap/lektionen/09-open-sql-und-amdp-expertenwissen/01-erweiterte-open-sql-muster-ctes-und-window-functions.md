# Erweiterte Open-SQL-Muster: CTEs & Window Functions

*Open SQL & AMDP Expertenwissen · ca. 8 Min.*

**CTEs** (Common Table Expressions, `WITH ... AS`) strukturieren komplexe Abfragen in benannte, von oben nach unten lesbare Zwischenschritte. **Window Functions** (`OVER`\-Klausel) berechnen Werte über einen Zeilenbereich, OHNE die Ergebnismenge wie bei GROUP BY zu reduzieren — z. B. laufende Summen oder Rankings.

```abap
WITH +umsatz_pro_kunde AS (
  SELECT customer_id, SUM( amount ) AS total
  FROM order
  GROUP BY customer_id
)
SELECT customer_id, total,
       RANK( ) OVER ( ORDER BY total DESCENDING ) AS rang
  FROM +umsatz_pro_kunde
  INTO TABLE @DATA(result).
```

> **Tipp:** Window Functions ersetzen oft komplizierte, manuell in ABAP nachgebaute Ranking- oder Kumulierungslogik — konsequent in die Datenbank verlagert, folgen sie demselben Pushdown-Prinzip wie CDS.

## Kontrollfragen

**1. Was leistet eine Window Function gegenüber GROUP BY?**

- [x] Berechnet Werte über einen Zeilenbereich, ohne die Ergebnismenge zu reduzieren
- [ ] Ersetzt JOINs vollständig
- [ ] Funktioniert nur mit HASHED TABLEs

*Erklärung:* Window Functions liefern pro Zeile einen berechneten Wert, ohne die Zeilenanzahl der Ergebnismenge zu verändern.

**2. Wozu dient eine CTE (WITH ...)?**

- [x] Strukturiert komplexe Abfragen in benannte, lesbare Zwischenschritte
- [ ] Verschlüsselt die Abfrage
- [ ] Ersetzt den Primärschlüssel

*Erklärung:* CTEs machen mehrstufige Abfragen lesbarer, indem Zwischenergebnisse benannt werden.
