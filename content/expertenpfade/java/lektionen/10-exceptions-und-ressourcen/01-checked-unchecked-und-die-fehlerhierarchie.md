# Checked, Unchecked und die Fehlerhierarchie

*Exceptions & Ressourcen · ca. 8 Min.*

Alles Werfbare stammt von `Throwable` ab. Darunter teilt sich der Baum:

-   **`Error`** — schwere JVM-Probleme wie `OutOfMemoryError`. Nicht fangen, nicht behandeln.
-   **Checked Exceptions** (`Exception`, nicht `RuntimeException`) — der Compiler erzwingt Behandlung oder Weitergabe per `throws`. Beispiel: `IOException`.
-   **Unchecked Exceptions** (`RuntimeException`) — Programmierfehler wie `NullPointerException`, `IllegalArgumentException`, `IndexOutOfBoundsException`.

Die Faustregel: **Checked** für Situationen, aus denen ein Aufrufer sinnvoll wieder herauskommen kann (Datei fehlt, Netzwerk weg). **Unchecked** für Verletzungen des Vertrags, die der Aufrufer hätte vermeiden müssen.

```java
// Mehrere Typen in einem catch, Reihenfolge: speziell vor allgemein
try {
    verarbeite(datei);
} catch (FileNotFoundException e) {
    log.warn("Datei fehlt: {}", datei, e);
} catch (IOException | ParseException e) {
    throw new VerarbeitungsException("Verarbeitung fehlgeschlagen: " + datei, e);
} finally {
    aufraeumen();          // läuft immer, auch bei return
}
```

> **Tipp:** Wenn du eine Exception umwandelst, gib die ursprüngliche IMMER als cause mit (der zweite Konstruktorparameter). Sonst verlierst du den echten Stacktrace und damit die Stelle, an der das Problem tatsächlich entstanden ist. Ein „VerarbeitungsException: Verarbeitung fehlgeschlagen" ohne Ursache ist in der Fehlersuche wertlos.

## Kontrollfragen

**1. Was kennzeichnet eine Checked Exception?**

- [x] Der Compiler erzwingt Behandlung oder Weitergabe
- [ ] Sie kann nicht gefangen werden
- [ ] Sie tritt nur zur Compilezeit auf

*Erklärung:* Checked Exceptions stehen für erwartbare Ausnahmesituationen, mit denen der Aufrufer umgehen muss.

**2. Wozu dient der cause-Parameter beim Umwandeln einer Exception?**

- [ ] Zur Verschönerung der Meldung
- [x] Er erhält den ursprünglichen Stacktrace und damit die eigentliche Fehlerquelle
- [ ] Er ist reine Konvention ohne Wirkung

*Erklärung:* Ohne cause geht die Information verloren, wo der Fehler wirklich entstand.
