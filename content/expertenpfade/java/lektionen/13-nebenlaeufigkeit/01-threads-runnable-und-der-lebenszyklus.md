# Threads, Runnable und der Lebenszyklus

*Nebenläufigkeit · ca. 8 Min.*

Ein **Thread** ist ein eigener Ausführungsstrang innerhalb des Prozesses. Alle Threads teilen sich den Heap — genau daraus entstehen die Probleme der nächsten Lektion.

Zustände eines Threads: `NEW` → `RUNNABLE` → (`BLOCKED` / `WAITING` / `TIMED_WAITING`) → `TERMINATED`.

Threads direkt zu erzeugen ist heute selten richtig — Thread-Pools (nächste Lektion) verwalten sie effizienter. Wichtig zu verstehen ist trotzdem der Unterschied zwischen `start()` und `run()`: `start()` startet einen neuen Thread, `run()` führt den Code einfach im aktuellen Thread aus.

```java
Runnable aufgabe = () -> System.out.println(Thread.currentThread().getName());

Thread t = new Thread(aufgabe, "worker-1");
t.start();        // neuer Thread
// t.run();       // FALSCH: läuft im aufrufenden Thread, keine Nebenläufigkeit

t.join();         // wartet, bis t fertig ist

// Virtual Threads (Java 21): sehr leichtgewichtig, Millionen möglich
Thread virtuell = Thread.ofVirtual().start(aufgabe);
```

> **Tipp:** Virtual Threads aus Java 21 verändern die Praxis grundlegend: Sie sind so leichtgewichtig, dass man pro Anfrage einen eigenen Thread nehmen kann, statt Pools zu dimensionieren. Für blockierende Aufgaben wie Datenbank- oder HTTP-Aufrufe ist das heute der empfohlene Weg — für rein rechenintensive Arbeit bleibt der klassische Pool mit so vielen Threads wie CPU-Kerne richtig.

## Kontrollfragen

**1. Was ist der Unterschied zwischen start() und run()?**

- [ ] Kein Unterschied
- [x] start() startet einen neuen Thread, run() führt den Code im aktuellen Thread aus
- [ ] run() ist schneller

*Erklärung:* Der direkte Aufruf von run() erzeugt überhaupt keine Nebenläufigkeit.

**2. Wofür eignen sich Virtual Threads besonders?**

- [ ] Für rechenintensive Berechnungen
- [x] Für viele blockierende Aufgaben wie Netzwerk- und Datenbankaufrufe
- [ ] Für die grafische Oberfläche

*Erklärung:* Beim Blockieren geben sie den Trägerthread frei — deshalb skalieren sie enorm.
