# CompletableFuture: asynchrone Ketten

*Nebenläufigkeit · ca. 8 Min.*

`CompletableFuture` erlaubt es, asynchrone Schritte zu verketten, statt auf jedes Zwischenergebnis blockierend zu warten. Das ist die Grundlage moderner, reaktiver Java-Anwendungen.

-   `supplyAsync` startet eine Berechnung.
-   `thenApply` transformiert das Ergebnis, `thenCompose` verkettet einen weiteren asynchronen Aufruf.
-   `thenCombine` führt zwei unabhängige Ergebnisse zusammen.
-   `exceptionally` beziehungsweise `handle` behandeln Fehler innerhalb der Kette.

```java
CompletableFuture<Kunde> kundeF   = CompletableFuture.supplyAsync(() -> ladeKunde(id));
CompletableFuture<Bonitaet> bonF  = CompletableFuture.supplyAsync(() -> pruefeBonitaet(id));

CompletableFuture<Angebot> angebot = kundeF
        .thenCombine(bonF, this::baueAngebot)      // beide parallel, dann zusammen
        .thenApply(this::rundePreise)
        .exceptionally(ex -> {
            log.error("Angebot fehlgeschlagen", ex);
            return Angebot.leer();
        });

Angebot ergebnis = angebot.join();   // erst hier wird gewartet
```

> **Tipp:** Achte darauf, welcher Thread deine Fortsetzungen ausführt: Ohne eigenen Executor landen sie im gemeinsamen ForkJoinPool.commonPool(). Blockierende Aufrufe dort legen potenziell die parallelen Streams der ganzen Anwendung lahm. Gib bei blockierender Arbeit deshalb immer einen eigenen Executor mit — supplyAsync(..., meinPool).

## Kontrollfragen

**1. Wozu dient thenCombine?**

- [ ] Zum Abbrechen einer Kette
- [x] Um zwei unabhängige asynchrone Ergebnisse zusammenzuführen
- [ ] Um synchron zu warten

*Erklärung:* Beide Berechnungen laufen parallel, die Funktion verbindet ihre Resultate.

**2. Warum sollte man bei blockierender Arbeit einen eigenen Executor angeben?**

- [ ] Aus Stilgründen
- [x] Weil sonst der gemeinsame ForkJoinPool blockiert und andere Aufgaben ausbremst
- [ ] Weil es sonst nicht kompiliert

*Erklärung:* Der commonPool ist knapp dimensioniert und wird anwendungsweit geteilt.
