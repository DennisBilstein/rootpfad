# Primitive Typen und Referenztypen

*Einstieg: Programm, JVM, Typen · ca. 9 Min.*

Java kennt zwei grundverschiedene Kategorien von Typen — der Unterschied erklärt später fast jeden überraschenden Fehler.

| Typ | Größe | Wertebereich / Zweck |
| --- | --- | --- |
| byte | 8 Bit | \-128 bis 127 |
| short | 16 Bit | \-32.768 bis 32.767 |
| int | 32 Bit | ca. ±2,1 Mrd. — der Standard für Ganzzahlen |
| long | 64 Bit | sehr große Zahlen, Literal mit L: 10\_000\_000\_000L |
| float / double | 32 / 64 Bit | Gleitkomma; double ist der Standard |
| char | 16 Bit | Ein Unicode-Zeichen: 'A' |
| boolean | — | true oder false |

**Primitive** Variablen enthalten den Wert direkt. **Referenztypen** (alle Objekte, Arrays, Strings) enthalten nur eine Referenz auf das Objekt im Heap. Eine Zuweisung kopiert bei Primitiven den Wert, bei Referenzen nur den Verweis — beide Variablen zeigen danach auf dasselbe Objekt.

```java
int a = 5;
int b = a;          // Wert wird kopiert
b = 10;             // a bleibt 5

int[] x = {1, 2, 3};
int[] y = x;        // nur die Referenz wird kopiert
y[0] = 99;          // x[0] ist jetzt ebenfalls 99!

// Geldbeträge NIEMALS als double:
System.out.println(0.1 + 0.2);            // 0.30000000000000004
System.out.println(new BigDecimal("0.1")
        .add(new BigDecimal("0.2")));     // 0.3
```

> **Tipp:** Die Zeile 0.1 + 0.2 == 0.30000000000000004 ist kein Java-Bug, sondern die binäre Gleitkommadarstellung nach IEEE 754 — sie trifft jede Sprache. Für Geldbeträge gilt deshalb ausnahmslos: BigDecimal, und zwar mit dem String-Konstruktor. new BigDecimal(0.1) mit double-Argument übernimmt den Fehler nämlich mit.

## Kontrollfragen

**1. Was passiert bei int[] y = x; für zwei Arrays?**

- [ ] Das Array wird kopiert
- [x] Beide Variablen zeigen auf dasselbe Array im Speicher
- [ ] Es entsteht ein Kompilierfehler

*Erklärung:* Arrays sind Referenztypen — kopiert wird nur der Verweis, nicht der Inhalt.

**2. Welcher Typ gehört zu Geldbeträgen?**

- [ ] double
- [ ] float
- [x] BigDecimal

*Erklärung:* Gleitkommatypen können Dezimalbrüche nicht exakt darstellen; BigDecimal rechnet exakt.
