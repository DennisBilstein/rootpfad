# Race Conditions, synchronized und volatile

*Nebenläufigkeit · ca. 10 Min.*

Sobald zwei Threads denselben veränderlichen Zustand anfassen, drohen zwei verschiedene Probleme:

-   **Race Condition** — `zaehler++` ist keine einzelne Operation, sondern Lesen, Erhöhen, Schreiben. Zwei Threads können dieselbe Ausgangszahl lesen; eine Erhöhung geht verloren.
-   **Sichtbarkeit** — ohne Synchronisation darf ein Thread Änderungen eines anderen dauerhaft *nicht sehen*, weil Werte in CPU-Caches oder Registern liegen.

`synchronized` löst beides: gegenseitiger Ausschluss *und* Sichtbarkeit. `volatile` löst **nur** die Sichtbarkeit — es macht `zaehler++` nicht atomar. Für Zähler nimmt man `AtomicInteger`, für Sammlungen die Klassen aus `java.util.concurrent`.

```java
// Kaputt: verlorene Erhöhungen
private int zaehler = 0;
public void erhoehe() { zaehler++; }

// Korrekt per Sperre
private final Object lock = new Object();
public void erhoehe() { synchronized (lock) { zaehler++; } }

// Besser: ohne Sperre, atomar
private final AtomicInteger zaehler = new AtomicInteger();
public void erhoehe() { zaehler.incrementAndGet(); }

// volatile: nur Sichtbarkeit, ideal für ein Abbruch-Flag
private volatile boolean abbrechen = false;

// Threadsichere Sammlungen
Map<String, Integer> map = new ConcurrentHashMap<>();
map.merge("key", 1, Integer::sum);      // atomar
```

> **Tipp:** Der gefährlichste Aspekt von Nebenläufigkeitsfehlern ist, dass sie im Test meist nicht auftreten: Auf dem Entwicklungsrechner mit wenig Last passiert die kritische Überschneidung vielleicht in einem von einer Million Durchläufe — in Produktion unter Volllast dann ständig. Verlass dich deshalb nie darauf, dass „es funktioniert", sondern nur auf ein korrektes Synchronisationskonzept. Und: Halte kritische Abschnitte so kurz wie möglich.

## Kontrollfragen

**1. Warum ist zaehler++ nicht threadsicher?**

- [ ] Weil es zu langsam ist
- [x] Weil es aus Lesen, Erhöhen und Schreiben besteht und dazwischen unterbrochen werden kann
- [ ] Weil int zu klein ist

*Erklärung:* Zwei Threads können denselben Ausgangswert lesen — eine Erhöhung geht verloren.

**2. Was leistet volatile?**

- [ ] Gegenseitigen Ausschluss
- [x] Nur Sichtbarkeit von Änderungen zwischen Threads
- [ ] Atomare Rechenoperationen

*Erklärung:* Für atomare Zähloperationen braucht es AtomicInteger oder synchronized.
