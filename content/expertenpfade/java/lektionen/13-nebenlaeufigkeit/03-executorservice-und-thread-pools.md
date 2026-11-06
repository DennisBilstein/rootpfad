# ExecutorService und Thread-Pools

*Nebenläufigkeit · ca. 9 Min.*

Threads selbst zu erzeugen skaliert schlecht: Jeder kostet Speicher und Erzeugungszeit. Ein **ExecutorService** verwaltet einen Pool wiederverwendbarer Threads und nimmt Aufgaben entgegen.

-   `Runnable` — Aufgabe ohne Rückgabewert.
-   `Callable<T>` — Aufgabe mit Rückgabewert, liefert ein `Future<T>`.
-   `Future.get()` blockiert, bis das Ergebnis da ist — und verpackt geworfene Exceptions in eine `ExecutionException`.

Pools müssen sauber beendet werden, sonst hält die JVM den Prozess offen. Seit Java 19 implementiert `ExecutorService` `AutoCloseable` und passt damit in try-with-resources.

```java
try (var pool = Executors.newFixedThreadPool(4)) {
    List<Callable<BigDecimal>> aufgaben = kunden.stream()
            .map(k -> (Callable<BigDecimal>) () -> berechneUmsatz(k))
            .toList();

    List<Future<BigDecimal>> ergebnisse = pool.invokeAll(aufgaben);

    BigDecimal gesamt = BigDecimal.ZERO;
    for (Future<BigDecimal> f : ergebnisse) {
        gesamt = gesamt.add(f.get());     // wirft ExecutionException bei Fehler
    }
}   // schließt den Pool und wartet auf die laufenden Aufgaben

// Für viele blockierende Aufgaben (Java 21)
var pool = Executors.newVirtualThreadPerTaskExecutor();
```

> **Tipp:** Die Pool-Größe ist keine Geschmacksfrage: Für CPU-gebundene Arbeit nimmt man etwa so viele Threads wie Kerne (Runtime.availableProcessors()) — mehr bringt nichts und kostet Kontextwechsel. Für I/O-gebundene Arbeit dürfen es deutlich mehr sein, weil die Threads ohnehin überwiegend warten. Seit Java 21 löst man den zweiten Fall am elegantesten mit Virtual Threads, ganz ohne Dimensionierung.

## Kontrollfragen

**1. Was liefert die Ausführung eines Callable über einen ExecutorService?**

- [x] Ein Future mit dem späteren Ergebnis
- [ ] Direkt den Wert
- [ ] Immer null

*Erklärung:* Future.get() blockiert, bis das Ergebnis vorliegt.

**2. Wie dimensioniert man einen Pool für CPU-intensive Aufgaben?**

- [ ] So viele Threads wie möglich
- [x] Etwa so viele wie verfügbare Prozessorkerne
- [ ] Immer genau einen

*Erklärung:* Mehr Threads bringen bei reiner Rechenlast keinen Gewinn, nur Kontextwechsel.
