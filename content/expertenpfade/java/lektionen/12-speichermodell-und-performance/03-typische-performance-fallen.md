# Typische Performance-Fallen

*Speichermodell & Performance · ca. 8 Min.*

Die meisten Java-Performanceprobleme stammen aus wenigen, immer gleichen Mustern:

-   **String-Verkettung in Schleifen** — aus O(n) wird O(n²). Lösung: `StringBuilder`.
-   **Autoboxing in Schleifen** — `Integer` statt `int` erzeugt Millionen Objekte. Lösung: primitive Typen und `IntStream`.
-   **Falsche Collection** — `contains()` auf einer großen `ArrayList` ist O(n); ein `HashSet` macht daraus O(1).
-   **Verschachtelte Schleifen über dieselbe Menge** — quadratische Laufzeit, oft durch eine Map auflösbar.
-   **N+1-Abfragen** gegen die Datenbank in einer Schleife (Modul 17).

```java
// Autoboxing-Falle: erzeugt zwei Millionen Integer-Objekte
Long summe = 0L;                       // Wrapper statt primitive!
for (long i = 0; i < 1_000_000; i++) {
    summe += i;                        // jedes += boxt neu
}

// Korrekt: primitiv
long summe2 = 0L;

// Quadratisch: zwei Listen gegeneinander
for (Kunde k : kunden) {
    for (Bestellung b : bestellungen) {
        if (b.kundeId().equals(k.id())) { ... }    // O(n*m)
    }
}

// Linear: einmal indizieren, dann nachschlagen
Map<String, List<Bestellung>> index = bestellungen.stream()
        .collect(Collectors.groupingBy(Bestellung::kundeId));
for (Kunde k : kunden) {
    List<Bestellung> seine = index.getOrDefault(k.id(), List.of());
}
```

> **Tipp:** Die Grundregel lautet trotzdem: erst messen, dann optimieren. Nutze einen Profiler wie VisualVM oder den in IntelliJ integrierten, statt zu raten — und für Mikrobenchmarks JMH, weil selbstgebaute Zeitmessungen durch JIT-Optimierung und Aufwärmeffekte regelmäßig um Größenordnungen danebenliegen. Lesbarer Code schlägt vorauseilende Optimierung fast immer.

## Kontrollfragen

**1. Was ist das Problem bei Long summe = 0L in einer Millionenschleife?**

- [ ] Es kompiliert nicht
- [x] Jede Addition erzeugt durch Autoboxing ein neues Objekt
- [ ] Long kann nicht addieren

*Erklärung:* Der Wrapper-Typ zwingt zu Boxing und Unboxing bei jedem Schritt.

**2. Wie löst man zwei verschachtelte Schleifen über verknüpfte Listen auf?**

- [ ] Durch mehr Threads
- [x] Durch einen Index als Map, danach Nachschlagen in O(1)
- [ ] Gar nicht

*Erklärung:* Aus O(n·m) wird so O(n+m) — derselbe Gedanke wie ein Datenbankindex.
