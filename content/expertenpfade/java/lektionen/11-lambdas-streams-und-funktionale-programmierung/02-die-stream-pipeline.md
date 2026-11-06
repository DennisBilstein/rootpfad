# Die Stream-Pipeline

*Lambdas, Streams & funktionale Programmierung · ca. 10 Min.*

Ein **Stream** ist keine Datenstruktur, sondern eine Verarbeitungskette über einer Quelle. Jede Pipeline besteht aus drei Teilen:

1.  **Quelle** — `collection.stream()`, `Stream.of(...)`, `Files.lines(...)`.
2.  **Intermediäre Operationen** — `filter`, `map`, `sorted`, `distinct`, `limit`. Sie sind **lazy**: Es passiert noch nichts.
3.  **Terminale Operation** — `collect`, `forEach`, `count`, `reduce`, `anyMatch`. Erst sie stößt die Verarbeitung an.

Die Laziness ist kein Detail: Bei `findFirst()` nach einem `filter()` wird nicht die ganze Liste gefiltert, sondern nur so weit gelesen, bis der erste Treffer feststeht.

```java
List<String> namen = kunden.stream()
        .filter(k -> k.umsatz().compareTo(GRENZE) > 0)
        .map(Kunde::name)
        .sorted()
        .toList();                    // Java 16+, unveränderliche Liste

// Ohne terminale Operation passiert gar nichts:
kunden.stream().map(k -> { System.out.println("nie"); return k; });

// Primitive Streams vermeiden Boxing
int summe = bestellungen.stream().mapToInt(Bestellung::menge).sum();
OptionalDouble schnitt = IntStream.of(werte).average();

// flatMap: verschachtelte Strukturen flach ziehen
List<Position> alle = bestellungen.stream()
        .flatMap(b -> b.positionen().stream())
        .toList();
```

> **Tipp:** Die wichtigste Regel für Streams lautet: keine Seiteneffekte. Eine externe Liste innerhalb von forEach() zu befüllen funktioniert zwar sequenziell, bricht aber bei parallelStream() sofort — und die Ursache ist fürchterlich zu finden. Sammle stattdessen mit collect(), das ist auch parallel korrekt. Und: parallelStream() lohnt erst bei sehr großen Mengen und rechenintensiven Operationen; bei kleinen Listen ist es messbar langsamer.

## Kontrollfragen

**1. Wann beginnt ein Stream tatsächlich zu arbeiten?**

- [ ] Sofort bei stream()
- [x] Erst bei der terminalen Operation
- [ ] Nach dem ersten map()

*Erklärung:* Intermediäre Operationen bauen nur die Pipeline auf — sie sind lazy.

**2. Warum sollte man in Streams Seiteneffekte vermeiden?**

- [ ] Weil es verboten ist
- [x] Weil der Code bei parallelStream() sonst fehlerhaft und nicht reproduzierbar wird
- [ ] Weil es langsamer ist

*Erklärung:* Nur seiteneffektfreie Pipelines lassen sich gefahrlos parallelisieren.
