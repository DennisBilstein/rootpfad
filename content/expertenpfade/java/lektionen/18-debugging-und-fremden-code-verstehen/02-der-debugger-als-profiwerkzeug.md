# Der Debugger als Profiwerkzeug

*Debugging & fremden Code verstehen · ca. 9 Min.*

Die meisten nutzen vom Debugger nur „Breakpoint setzen und F8 drücken". Die eigentlichen Werkzeuge sind andere:

-   **Bedingte Breakpoints** halten nur bei einer Bedingung (`kunde.id() == 4711`) — unverzichtbar in Schleifen über zehntausend Datensätze.
-   **Exception-Breakpoints** halten beim Werfen einer bestimmten Exception, ganz ohne zu wissen, wo im Code das passiert.
-   **Field Watchpoints** halten an, sobald ein Feld gelesen oder geschrieben wird — so findet man, wer einen Wert überschreibt.
-   **Evaluate Expression** führt beliebigen Code im angehaltenen Zustand aus — auch Methodenaufrufe.
-   **Drop Frame** setzt den aktuellen Methodenaufruf zurück und lässt ihn erneut laufen, ohne Neustart.

```java
// Statt im Code herumzuschreiben: bedingter Breakpoint in der IDE
for (Bestellung b : bestellungen) {
    verarbeite(b);        // Breakpoint mit Bedingung: b.nummer().equals("B-4711")
}

// Für Remote-Debugging der laufenden Anwendung:
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar
```

> **Tipp:** Nutz den Debugger nicht nur zur Fehlersuche, sondern zum Verstehen: Setz einen Breakpoint mitten in eine fremde Codebasis und schau dir den Aufrufstack an — du siehst in zwei Minuten, wie der Weg von der Schnittstelle bis zur Datenbank verläuft. Das ist schneller als jede Architekturdokumentation und immer aktuell.

## Kontrollfragen

**1. Wofür ist ein Field Watchpoint das richtige Werkzeug?**

- [x] Um anzuhalten, sobald ein Feld gelesen oder geschrieben wird
- [ ] Um Variablen zu löschen
- [ ] Um Tests auszuführen

*Erklärung:* So findet man die Stelle, die einen Wert unerwartet überschreibt.

**2. Was leistet ein bedingter Breakpoint?**

- [x] Er hält nur, wenn eine angegebene Bedingung zutrifft
- [ ] Er hält immer
- [ ] Er deaktiviert andere Breakpoints

*Erklärung:* Unverzichtbar, wenn nur ein bestimmter Datensatz von vielen problematisch ist.
