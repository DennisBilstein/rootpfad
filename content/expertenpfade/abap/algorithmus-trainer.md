# Algorithmus-Trainer – ABAP Expertenpfad

Schrittweise Ablaufverfolgung (Trace-Tabellen).

## Summe der geraden Zahlen

*Einsteiger · Eingabe: `zahlen = [3, 4, 7, 8]`*

Der Klassiker: Akkumulator plus Filterbedingung. Verfolge, wann `summe` sich ändert — und wann nicht.

```abap
FUNCTION summeGerade(zahlen)
  summe <- 0
  FOR EACH zahl IN zahlen DO
    IF zahl MOD 2 = 0 THEN
      summe <- summe + zahl
    ENDIF
  ENDFOR
  RETURN summe
ENDFUNCTION
```

| Schritt | Zeile | zahl | summe | Erläuterung |
|---|---|---|---|---|
| 1 | 2 | — | 0 | Akkumulator initialisieren. |
| 2 | 3 | 3 | 0 | 1\. Durchlauf: zahl = 3. |
| 3 | 4 | 3 | 0 | 3 MOD 2 = 1 → Bedingung falsch, Rumpf wird übersprungen. |
| 4 | 3 | 4 | 0 | 2\. Durchlauf: zahl = 4. |
| 5 | 4 | 4 | 0 | 4 MOD 2 = 0 → Bedingung wahr. |
| 6 | 5 | 4 | 4 | summe = 0 + 4. |
| 7 | 3 | 7 | 4 | 3\. Durchlauf: zahl = 7. |
| 8 | 4 | 7 | 4 | 7 ist ungerade → übersprungen. |
| 9 | 3 | 8 | 4 | 4\. Durchlauf: zahl = 8. |
| 10 | 4 | 8 | 4 | 8 ist gerade → Rumpf wird ausgeführt. |
| 11 | 5 | 8 | 12 | summe = 4 + 8. |
| 12 | 8 | 8 | 12 | Liste zu Ende → Rückgabe. |

**Ergebnis:** 12

## Maximum-Suche mit Gleichstand

*Einsteiger · Eingabe: `zahlen = [12, 45, 7, 45, 23]`*

Achte genau auf den Vergleichsoperator: `>` oder `>=` macht bei doppelten Werten den Unterschied.

```abap
FUNCTION findeMaximum(zahlen)
  maximum <- zahlen[1]
  FOR i <- 2 TO LAENGE(zahlen) DO
    IF zahlen[i] > maximum THEN
      maximum <- zahlen[i]
    ENDIF
  ENDFOR
  RETURN maximum
ENDFUNCTION
```

| Schritt | Zeile | i | zahlen[i] | maximum | Erläuterung |
|---|---|---|---|---|---|
| 1 | 2 | — | — | 12 | Startwert ist das erste Element. |
| 2 | 3 | 2 | 45 | 12 | Schleife beginnt bei Index 2. |
| 3 | 4 | 2 | 45 | 12 | 45 > 12 → wahr. |
| 4 | 5 | 2 | 45 | 45 | Neues Maximum gefunden. |
| 5 | 3 | 3 | 7 | 45 | Nächster Index. |
| 6 | 4 | 3 | 7 | 45 | 7 > 45 → falsch. |
| 7 | 3 | 4 | 45 | 45 | Achtung: gleicher Wert wie das Maximum. |
| 8 | 4 | 4 | 45 | 45 | 45 > 45 ist FALSCH — strikt größer. maximum bleibt unverändert. |
| 9 | 3 | 5 | 23 | 45 | Letzter Index. |
| 10 | 4 | 5 | 23 | 45 | 23 > 45 → falsch. |
| 11 | 8 | 5 | 23 | 45 | Rückgabe des Maximums. |

**Ergebnis:** 45

## Bubble-Sort komplett

*Fortgeschritten · Eingabe: `zahlen = [5, 2, 9, 1]`*

Verschachtelte Schleifen mit Tausch. Verfolge den Array-Zustand nach jedem Vergleich.

```abap
n <- LAENGE(zahlen)
FOR i <- 1 TO n - 1 DO
  FOR j <- 1 TO n - i DO
    IF zahlen[j] > zahlen[j+1] THEN
      temp <- zahlen[j]
      zahlen[j] <- zahlen[j+1]
      zahlen[j+1] <- temp
    ENDIF
  ENDFOR
ENDFOR
```

| Schritt | Zeile | i | j | Vergleich | zahlen | Erläuterung |
|---|---|---|---|---|---|---|
| 1 | 1 | — | — | — | [5, 2, 9, 1] | n = 4. |
| 2 | 4 | 1 | 1 | 5 > 2 ✓ | [5, 2, 9, 1] | Erster Vergleich, Tausch nötig. |
| 3 | 7 | 1 | 1 | 5 > 2 ✓ | [2, 5, 9, 1] | Nach dem Tausch. |
| 4 | 4 | 1 | 2 | 5 > 9 ✗ | [2, 5, 9, 1] | Kein Tausch. |
| 5 | 4 | 1 | 3 | 9 > 1 ✓ | [2, 5, 9, 1] | Tausch nötig. |
| 6 | 7 | 1 | 3 | 9 > 1 ✓ | [2, 5, 1, 9] | Die 9 ist jetzt „durchgeblubbert" — ihr Endplatz steht fest. |
| 7 | 4 | 2 | 1 | 2 > 5 ✗ | [2, 5, 1, 9] | 2\. Durchlauf, innere Schleife nur noch bis n-i = 2. |
| 8 | 4 | 2 | 2 | 5 > 1 ✓ | [2, 5, 1, 9] | Tausch nötig. |
| 9 | 7 | 2 | 2 | 5 > 1 ✓ | [2, 1, 5, 9] | Nach dem Tausch. |
| 10 | 4 | 3 | 1 | 2 > 1 ✓ | [2, 1, 5, 9] | 3\. Durchlauf, nur noch ein Vergleich. |
| 11 | 7 | 3 | 1 | 2 > 1 ✓ | [1, 2, 5, 9] | Letzter Tausch — fertig sortiert. |

**Ergebnis:** \[1, 2, 5, 9\]

## Quersumme mit Ganzzahldivision

*Fortgeschritten · Eingabe: `zahl = 4712`*

WHILE-Schleife mit MOD und DIV — das Standardmuster zum Zerlegen von Zahlen.

```abap
FUNCTION quersumme(zahl)
  summe <- 0
  WHILE zahl > 0 DO
    summe <- summe + (zahl MOD 10)
    zahl <- zahl DIV 10
  ENDWHILE
  RETURN summe
ENDFUNCTION
```

| Schritt | Zeile | zahl | zahl MOD 10 | summe | Erläuterung |
|---|---|---|---|---|---|
| 1 | 2 | 4712 | — | 0 | Start. |
| 2 | 4 | 4712 | 2 | 2 | Letzte Ziffer per MOD 10 abgreifen. |
| 3 | 5 | 471 | 2 | 2 | DIV 10 schneidet die letzte Ziffer ab (Ganzzahldivision, kein Runden). |
| 4 | 4 | 471 | 1 | 3 | summe = 2 + 1. |
| 5 | 5 | 47 | 1 | 3 | Nächste Stelle. |
| 6 | 4 | 47 | 7 | 10 | summe = 3 + 7. |
| 7 | 5 | 4 | 7 | 10 | Nur noch eine Ziffer übrig. |
| 8 | 4 | 4 | 4 | 14 | summe = 10 + 4. |
| 9 | 5 | 0 | 4 | 14 | 4 DIV 10 = 0 → Schleifenbedingung wird falsch. |
| 10 | 7 | 0 | — | 14 | Rückgabe. |

**Ergebnis:** 14
