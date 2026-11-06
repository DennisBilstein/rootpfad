# try-with-resources und sauberes Aufräumen

*Exceptions & Ressourcen · ca. 7 Min.*

Jede Ressource, die geöffnet wird — Datei, Datenbankverbindung, Netzwerksocket — muss geschlossen werden, *auch im Fehlerfall*. Der klassische `finally`\-Block dafür ist fehleranfällig und geschwätzig.

**try-with-resources** schließt automatisch alles, was `AutoCloseable` implementiert — in umgekehrter Öffnungsreihenfolge, und selbst dann, wenn im Block eine Exception fliegt.

```java
// Alt: fehleranfällig
BufferedReader r = null;
try {
    r = new BufferedReader(new FileReader(pfad));
    return r.readLine();
} finally {
    if (r != null) r.close();      // close() kann selbst werfen ...
}

// Modern: automatisch und sicher
try (BufferedReader reader = Files.newBufferedReader(Path.of(pfad));
     Connection con = dataSource.getConnection()) {
    return reader.readLine();
}   // beide werden geschlossen, Connection zuerst
```

> **Tipp:** Ein unterschätztes Detail: Wirft der try-Block eine Exception UND schlägt zusätzlich das Schließen fehl, würde im alten Muster die zweite die erste überschreiben — der eigentliche Fehler verschwindet. try-with-resources hängt den Schließfehler stattdessen als „suppressed exception" an. Abrufen kannst du ihn mit getSuppressed(); sichtbar ist er ohnehin im Stacktrace.

## Kontrollfragen

**1. Welche Bedingung muss eine Klasse für try-with-resources erfüllen?**

- [ ] Sie muss Serializable implementieren
- [x] Sie muss AutoCloseable (oder Closeable) implementieren
- [ ] Sie muss final sein

*Erklärung:* Die close()-Methode aus AutoCloseable wird automatisch aufgerufen.

**2. In welcher Reihenfolge werden mehrere Ressourcen geschlossen?**

- [ ] In Öffnungsreihenfolge
- [x] In umgekehrter Öffnungsreihenfolge
- [ ] Zufällig

*Erklärung:* Zuletzt geöffnete Ressourcen werden zuerst geschlossen — analog zum Stack.
