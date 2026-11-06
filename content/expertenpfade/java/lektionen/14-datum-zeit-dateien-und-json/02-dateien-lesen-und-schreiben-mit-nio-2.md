# Dateien lesen und schreiben mit NIO.2

*Datum, Zeit, Dateien & JSON · ca. 8 Min.*

Die moderne Datei-API rund um `Path` und `Files` ersetzt die alte `File`\-Klasse. Sie ist kürzer, liefert aussagekräftige Exceptions statt eines nichtssagenden `false` und arbeitet plattformunabhängig.

Für große Dateien gilt: nicht komplett in den Speicher laden. `Files.lines()` liefert einen Stream, der zeilenweise liest — und muss wegen der offenen Datei in try-with-resources stehen.

```java
Path pfad = Path.of("daten", "kunden.csv");     // plattformneutral

// Kleine Datei komplett
String inhalt = Files.readString(pfad, StandardCharsets.UTF_8);
List<String> zeilen = Files.readAllLines(pfad);

// Große Datei: streamen, nicht laden
try (Stream<String> stream = Files.lines(pfad, StandardCharsets.UTF_8)) {
    long treffer = stream.filter(z -> z.contains("Berlin")).count();
}

// Schreiben (Verzeichnis vorher sicherstellen)
Files.createDirectories(pfad.getParent());
Files.writeString(pfad, inhalt, StandardCharsets.UTF_8,
        StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
```

> **Tipp:** Gib das Encoding immer explizit an. Ohne Angabe nutzte Java bis Version 17 die Plattformvorgabe — auf einem deutschen Windows also Windows-1252, auf dem Linux-Server UTF-8. Ergebnis: Umlaute, die lokal korrekt aussehen und in Produktion zerschossen sind. Seit Java 18 ist UTF-8 die Vorgabe, aber expliziter Code bleibt eindeutig und funktioniert auf jeder Version gleich.

## Kontrollfragen

**1. Warum muss Files.lines() in try-with-resources stehen?**

- [ ] Aus Konvention
- [x] Weil der Stream eine offene Datei hält, die geschlossen werden muss
- [ ] Weil es sonst nicht kompiliert

*Erklärung:* Anders als Collection-Streams besitzt er eine Systemressource.

**2. Warum sollte das Encoding explizit angegeben werden?**

- [ ] Um Speicher zu sparen
- [x] Weil sonst plattformabhängig unterschiedlich kodiert wird und Umlaute brechen
- [ ] Weil UTF-8 langsamer ist

*Erklärung:* Der Klassiker: lokal korrekt, auf dem Server zerschossen.
