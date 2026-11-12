# Java-Beispiele für Modul java-m25

Einzeldateien im Quellcode-Modus (kein Build-Werkzeug nötig). Stand 12.11.2026, geprüft mit JDK 21.0.11 und 26.0.1.

```sh
java PatternSwitchDemo.java
java SealedResultDemo.java
java SequencedDemo.java
java VirtualThreadsDemo.java
java --enable-preview --source 26 StructuredScopesDemo.java   # nur JDK 26: Preview-Feature
java GatherersDemo.java                                        # ab JDK 24; unter JDK 21 erwartet fehlschlagend
```

- Structured Concurrency ist in JDK 26 (JEP 525) noch Preview; die API kann sich ändern.
- Stream Gatherers (JEP 485) sind seit JDK 24 final und laufen unter JDK 21 nicht.
- Die Ausgaben stehen in den Lektionen; zeitabhängige Werte (Dauer von Threads) können abweichen.
- Eigener Code, keine Übernahme fremder Beispiele. JEP-Texte sind nur verlinkt.
