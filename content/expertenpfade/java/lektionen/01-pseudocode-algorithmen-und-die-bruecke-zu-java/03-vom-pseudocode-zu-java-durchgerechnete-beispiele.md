# Vom Pseudocode zu Java: durchgerechnete Beispiele

*Pseudocode, Algorithmen & die Brücke zu Java · ca. 10 Min.*

Die Übersetzung folgt klaren Mustern. Zwei vollständige Beispiele:

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

In Java wird daraus eine Methode mit Rückgabetyp. Beachte: Java-Arrays beginnen bei Index **0**, der Pseudocode zählte ab 1.

```java(wörtlicheübersetzung)
public static int findeMaximum(int[] zahlen) {
    int maximum = zahlen[0];
    for (int zahl : zahlen) {
        if (zahl > maximum) {
            maximum = zahl;
        }
    }
    return maximum;
}
```

**Beispiel 2 — Durchschnitt.** Hier lohnt der Vergleich zwischen wörtlicher und idiomatischer Übersetzung:

```pseudocode
FUNCTION durchschnitt(zahlen)
  summe <- 0
  FOR EACH zahl IN zahlen DO
    summe <- summe + zahl
  ENDFOR
  RETURN summe / LAENGE(zahlen)
ENDFUNCTION
```

```java
// Wörtlich
public static double durchschnitt(int[] zahlen) {
    int summe = 0;
    for (int zahl : zahlen) {
        summe += zahl;
    }
    return (double) summe / zahlen.length;
}

// Idiomatisch mit Streams (Modul 11)
public static double durchschnitt(int[] zahlen) {
    return IntStream.of(zahlen).average().orElse(0);
}
```

> **Tipp:** Achte im wörtlichen Beispiel auf den Cast (double). Ohne ihn rechnet Java eine Ganzzahldivision: 7/2 ergibt 3, nicht 3.5. Diese eine Zeile ist eine der häufigsten Fehlerquellen überhaupt — und ein beliebtes Prüfungsdetail, weil der Code kompiliert und trotzdem falsch rechnet.

## Kontrollfragen

**1. Welches Java-Konstrukt entspricht FOR EACH ... IN ... DO am direktesten?**

- [x] Die erweiterte for-Schleife (for (int x : array))
- [ ] while (true)
- [ ] do ... while

*Erklärung:* Die erweiterte for-Schleife („for-each") iteriert über Arrays und alles, was Iterable implementiert.

**2. Was ergibt in Java der Ausdruck 7 / 2 bei zwei int-Werten?**

- [ ] 3.5
- [x] 3
- [ ] Einen Kompilierfehler

*Erklärung:* Bei zwei Ganzzahlen führt Java eine Ganzzahldivision aus und schneidet den Rest ab — ein Cast auf double ist nötig.
