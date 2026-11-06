# Collectors: Ergebnisse einsammeln

*Lambdas, Streams & funktionale Programmierung · ca. 9 Min.*

`collect()` ist die vielseitigste terminale Operation. Die Fabrikmethoden in `Collectors` decken fast jeden Auswertungsfall ab — besonders `groupingBy` ersetzt ganze Schleifenkonstrukte.

```java
// Gruppieren
Map<String, List<Kunde>> nachOrt =
        kunden.stream().collect(Collectors.groupingBy(Kunde::ort));

// Gruppieren und gleichzeitig aggregieren (downstream collector)
Map<String, Long> anzahlProOrt =
        kunden.stream().collect(Collectors.groupingBy(Kunde::ort, Collectors.counting()));

Map<String, BigDecimal> umsatzProOrt = kunden.stream()
        .collect(Collectors.groupingBy(Kunde::ort,
                 Collectors.reducing(BigDecimal.ZERO, Kunde::umsatz, BigDecimal::add)));

// Aufteilen in zwei Gruppen
Map<Boolean, List<Kunde>> vipUndRest =
        kunden.stream().collect(Collectors.partitioningBy(Kunde::istVip));

// Zu Map, mit Konfliktbehandlung bei doppelten Schlüsseln
Map<String, Kunde> nachNummer = kunden.stream()
        .collect(Collectors.toMap(Kunde::nummer, k -> k, (alt, neu) -> neu));

// Zu String zusammenfügen
String liste = kunden.stream().map(Kunde::name)
        .collect(Collectors.joining(", ", "[", "]"));
```

> **Tipp:** Collectors.toMap() wirft eine IllegalStateException, sobald zwei Elemente denselben Schlüssel liefern — und zwar mitten in der Verarbeitung, oft erst in Produktion mit echten Daten. Gib deshalb grundsätzlich die dritte Merge-Funktion mit und entscheide bewusst, was bei Dubletten gelten soll. Das ist einer der häufigsten Stream-Fehler überhaupt.

## Kontrollfragen

**1. Was leistet Collectors.groupingBy()?**

- [ ] Es sortiert den Stream
- [x] Es gruppiert Elemente nach einem Schlüssel in eine Map
- [ ] Es entfernt Duplikate

*Erklärung:* Optional lässt sich pro Gruppe ein weiterer Collector zum Aggregieren angeben.

**2. Was passiert bei Collectors.toMap() mit doppelten Schlüsseln ohne Merge-Funktion?**

- [ ] Der letzte Wert gewinnt
- [x] Es wird eine IllegalStateException geworfen
- [ ] Der Eintrag wird übersprungen

*Erklärung:* Deshalb gehört die dritte Merge-Funktion praktisch immer dazu.
