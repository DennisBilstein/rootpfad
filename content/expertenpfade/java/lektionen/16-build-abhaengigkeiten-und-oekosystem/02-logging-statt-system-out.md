# Logging statt System.out

*Build, Abhängigkeiten & Ökosystem · ca. 7 Min.*

`System.out.println` gehört nicht in Produktivcode: nicht abschaltbar, keine Zeitstempel, keine Level, kein Kontext, keine Ziele außer der Konsole.

Standard ist **SLF4J** als Fassade mit **Logback** oder **Log4j2** als Implementierung. Die Level bilden eine Hierarchie: `ERROR` → `WARN` → `INFO` → `DEBUG` → `TRACE`.

-   **ERROR** — etwas ist kaputt, jemand muss handeln.
-   **WARN** — auffällig, aber verkraftbar.
-   **INFO** — fachlich relevante Ereignisse.
-   **DEBUG/TRACE** — Details für die Fehlersuche, in Produktion meist aus.

```java
private static final Logger log = LoggerFactory.getLogger(BestellService.class);

// Platzhalter statt Konkatenation: wird nur bei aktivem Level ausgewertet
log.debug("Verarbeite Bestellung {} für Kunde {}", nummer, kundeId);

// Exception IMMER als letztes Argument, nicht in den Text
try {
    verarbeite(bestellung);
} catch (VerarbeitungsException e) {
    log.error("Bestellung {} fehlgeschlagen", nummer, e);   // e = voller Stacktrace
}
```

> **Tipp:** Zwei Fehler, die man in fast jedem Projekt findet. Erstens: log.debug("Wert: " + teureBerechnung()) — die Konkatenation läuft auch dann, wenn DEBUG gar nicht aktiv ist. Mit Platzhaltern {} passiert das nicht. Zweitens: log.error("Fehler: " + e.getMessage()) — damit verlierst du den Stacktrace und damit die Zeile, in der es wirklich knallte. Übergib das Exception-Objekt als letztes Argument.

## Kontrollfragen

**1. Warum Platzhalter {} statt String-Konkatenation im Logaufruf?**

- [ ] Aus Stilgründen
- [x] Weil die Auswertung nur erfolgt, wenn das Level aktiv ist
- [ ] Weil + nicht erlaubt ist

*Erklärung:* Das spart bei deaktiviertem DEBUG-Level messbar Rechenzeit.

**2. Wie loggt man eine Exception vollständig?**

- [x] Als letztes Argument das Exception-Objekt übergeben
- [ ] Nur e.getMessage() in den Text schreiben
- [ ] Mit printStackTrace()

*Erklärung:* Nur so landet der vollständige Stacktrace im Log.
