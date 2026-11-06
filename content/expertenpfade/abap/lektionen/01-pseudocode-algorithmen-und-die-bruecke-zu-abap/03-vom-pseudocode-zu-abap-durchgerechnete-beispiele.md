# Vom Pseudocode zu ABAP: durchgerechnete Beispiele

*Pseudocode, Algorithmen & die Brücke zu ABAP · ca. 10 Min.*

Die Übersetzung von Pseudocode nach ABAP folgt klaren Mustern. Zwei komplette Beispiele:

**Beispiel 1 — Maximum-Suche:**

```pseudocode
FUNCTION findeMaximum(zahlen)
  maximum <- zahlen[1]
  FOR EACH zahl IN zahlen DO
    IF zahl > maximum THEN
      maximum <- zahl
    ENDIF
  ENDFOR
  RETURN maximum
ENDFUNCTION
```

```abap(wörtlicheübersetzung)
METHOD find_maximum.
  rv_maximum = it_zahlen[ 1 ].
  LOOP AT it_zahlen INTO DATA(zahl).
    IF zahl > rv_maximum.
      rv_maximum = zahl.
    ENDIF.
  ENDLOOP.
ENDMETHOD.
```

**Beispiel 2 — Durchschnitt** (wörtlich vs. idiomatisch in ABAP):

```pseudocode
FUNCTION durchschnitt(zahlen)
  summe <- 0
  FOR EACH zahl IN zahlen DO
    summe <- summe + zahl
  ENDFOR
  RETURN summe / LAENGE(zahlen)
ENDFUNCTION
```

```abap(idiomatischmitreduce)
DATA(durchschnitt) = REDUCE decfloat34(
  INIT summe = CONV decfloat34( 0 )
  FOR zahl IN zahlen
  NEXT summe = summe + zahl ) / lines( zahlen ).
```

> **Tipp:** In der Prüfung wird die wörtliche, prozedurale Übersetzung erwartet (Schleife + Zähler) — das ist Absicht, denn Pseudocode soll sprachunabhängig bleiben. Ein erfahrener ABAP-Entwickler greift im echten Code oft zum knapperen funktionalen Ausdruck (REDUCE) — für die Prüfung ist die wörtliche Variante nicht "schlechter", nur weniger idiomatisch.

## Kontrollfragen

**1. Welches ABAP-Konstrukt entspricht am ehesten FOR EACH ... IN ... DO im Pseudocode?**

- [x] LOOP AT itab INTO/ASSIGNING
- [ ] SELECT ... FROM
- [ ] WHILE sy-subrc = 0

*Erklärung:* LOOP AT durchläuft eine interne Tabelle analog zu FOR EACH im Pseudocode.

**2. Was unterscheidet die wörtliche von der idiomatischen ABAP-Übersetzung?**

- [ ] Es gibt keinen Unterschied
- [x] Wörtlich folgt Schritt für Schritt dem Pseudocode, idiomatisch nutzt moderne ABAP-Ausdrücke wie REDUCE
- [ ] Idiomatischer Code ist immer langsamer

*Erklärung:* Beide Varianten sind funktional gleichwertig — idiomatisches ABAP ist nur kompakter zu lesen und zu schreiben.
