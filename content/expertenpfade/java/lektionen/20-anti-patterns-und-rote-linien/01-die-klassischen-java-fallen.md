# Die klassischen Java-Fallen

*Anti-Patterns & rote Linien · ca. 9 Min.*

Eine Sammlung der Fehler, die in echten Projekten immer wieder auftreten — und jeweils der Grund dahinter:

-   **Objekte mit `==` vergleichen** statt mit `equals()`. Funktioniert bei kleinen Zahlen und Literalen scheinbar, bricht mit echten Daten.
-   **`equals` ohne `hashCode`** — das Objekt verschwindet in `HashSet` und `HashMap`.
-   **Veränderliche Objekte als Map-Schlüssel** — nach einer Änderung unauffindbar.
-   **`catch (Exception e)` ohne Behandlung** — der Fehler verschwindet still.
-   **Öffentliche veränderliche Felder** statt Kapselung.
-   **`float`/`double` für Geld** — Rundungsfehler ab dem ersten Betrag.
-   **Ressourcen ohne try-with-resources** — Verbindungslecks, die erst unter Last auffallen.

```java
// Integer-Cache-Falle: unter 128 gecacht, darüber nicht
Integer a = 127, b = 127;
System.out.println(a == b);      // true  — zufällig, wegen Cache

Integer c = 128, d = 128;
System.out.println(c == d);      // false — dasselbe Muster, anderes Ergebnis!
System.out.println(c.equals(d)); // true  — so ist es richtig

// Deshalb: bei Wrapper-Typen und Objekten immer equals()
```

> **Tipp:** Die Integer-Cache-Falle ist deshalb so heimtückisch, weil der Code mit Testdaten funktioniert und mit Produktivdaten nicht: Java hält Integer von -128 bis 127 in einem Cache, größere Werte nicht. Ein Vergleich mit == liefert bei Artikelnummer 100 das richtige Ergebnis und bei 1000 das falsche. Solche Fehler kosten Tage — und werden von einer einzigen Regel verhindert: Objekte vergleicht man mit equals().

## Kontrollfragen

**1. Warum liefert Integer a=127,b=127; a==b true, aber bei 128 false?**

- [ ] Wegen eines Compilerfehlers
- [x] Java cacht Integer-Objekte von -128 bis 127, darüber entstehen neue Objekte
- [ ] Weil 128 zu groß für int ist

*Erklärung:* Genau deshalb darf man Wrapper-Typen nie mit == vergleichen.

**2. Was passiert, wenn equals überschrieben wird, hashCode aber nicht?**

- [ ] Nichts
- [x] Das Objekt wird in HashSet/HashMap nicht wiedergefunden
- [ ] Der Code kompiliert nicht

*Erklärung:* Die Hash-basierten Sammlungen suchen im falschen Bucket.
