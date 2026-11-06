# Stack, Heap und Garbage Collection

*Speichermodell & Performance · ca. 9 Min.*

Die JVM verwaltet zwei zentrale Speicherbereiche:

-   **Stack** — pro Thread, enthält Methodenaufrufe, lokale Variablen und primitive Werte. Streng nach dem LIFO-Prinzip, sehr schnell. Zu tiefe Rekursion sprengt ihn: `StackOverflowError`.
-   **Heap** — geteilt von allen Threads, enthält alle Objekte. Wird von der **Garbage Collection** aufgeräumt.

Die GC entfernt Objekte, die von keiner lebenden Referenz mehr erreichbar sind. Du kannst sie nicht erzwingen — `System.gc()` ist eine unverbindliche Bitte. Der Heap ist generationsweise aufgeteilt: Neue Objekte landen in der *Young Generation*, überlebende wandern in die *Old Generation*. Das ist effizient, weil die allermeisten Objekte sehr kurz leben.

Ein **Memory Leak** entsteht in Java nicht durch vergessenes Freigeben, sondern durch *vergessene Referenzen*: Eine statische Liste, die immer weiter wächst, hält jedes Element am Leben.

```java
public class Cache {
    // Leak: wächst unbegrenzt, nichts wird je entfernt
    private static final Map<String, byte[]> CACHE = new HashMap<>();

    public static void put(String k, byte[] v) { CACHE.put(k, v); }
}

// Besser: begrenzte Größe oder schwache Referenzen
private static final Map<String, byte[]> CACHE =
        Collections.synchronizedMap(new LinkedHashMap<>(16, 0.75f, true) {
            @Override protected boolean removeEldestEntry(Map.Entry<String, byte[]> e) {
                return size() > 1000;          // LRU-Verhalten
            }
        });
```

> **Tipp:** Wenn eine Anwendung über Tage langsam immer mehr Speicher braucht, ist die Ursache fast nie die GC, sondern eine Sammlung, die nie geleert wird — statische Maps, Listener, die nie abgemeldet werden, oder ThreadLocals in einem Thread-Pool. Ein Heap-Dump (jmap) plus Analyse mit dem Eclipse Memory Analyzer zeigt in Minuten, welcher Objektbaum den Speicher hält.

## Kontrollfragen

**1. Wo liegen Objekte in Java?**

- [ ] Auf dem Stack
- [x] Auf dem Heap
- [ ] In der Klassendatei

*Erklärung:* Der Stack hält nur lokale Variablen, Parameter und Referenzen — die Objekte selbst liegen im Heap.

**2. Wodurch entsteht in Java typischerweise ein Memory Leak?**

- [ ] Durch vergessenes free()
- [x] Durch Referenzen, die unnötig gehalten werden, etwa in statischen Sammlungen
- [ ] Durch zu viele Klassen

*Erklärung:* Die GC räumt nur auf, was nicht mehr erreichbar ist.
