# Produktionsreife: woran man erwachsenen Code erkennt

*Anti-Patterns & rote Linien · ca. 9 Min.*

Der Unterschied zwischen „läuft bei mir" und produktionsreif lässt sich erstaunlich präzise benennen:

-   **Konfigurierbar** — keine hartkodierten Pfade, URLs, Zeitlimits oder Zugangsdaten. Alles über Konfiguration oder Umgebungsvariablen.
-   **Beobachtbar** — aussagekräftige Logs mit Kontext, Metriken, ein Health-Endpunkt.
-   **Fehlertolerant** — Zeitlimits bei externen Aufrufen, definiertes Verhalten bei Ausfall, keine unbegrenzten Wiederholungen.
-   **Wiederaufsetzbar** — ein abgebrochener Batchlauf darf beim erneuten Start keine Doppelbuchungen erzeugen (Idempotenz).
-   **Getestet** — die fachlich riskanten Pfade sind abgedeckt, nicht nur die Getter.
-   **Dokumentiert, wo es nötig ist** — nicht das Was, sondern das Warum: Warum diese ungewöhnliche Reihenfolge? Warum dieser Sonderfall?

Die ehrlichste Prüffrage für jede Komponente lautet: *Was passiert, wenn sie nachts um drei ausfällt und niemand zusieht?* Wenn die Antwort „dann muss jemand von Hand aufräumen" ist, ist sie noch nicht fertig.

```java
// Nicht produktionsreif
String url = "http://localhost:8080/api";       // hartkodiert
var antwort = client.send(request, ofString()); // kein Timeout, kein Fehlerpfad

// Produktionsreif
HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(5))
        .build();

HttpRequest request = HttpRequest.newBuilder(URI.create(config.apiUrl()))
        .timeout(Duration.ofSeconds(10))
        .GET().build();

try {
    HttpResponse<String> res = client.send(request, BodyHandlers.ofString());
    if (res.statusCode() >= 400) {
        throw new ApiException("Antwortcode " + res.statusCode());
    }
} catch (IOException | InterruptedException e) {
    Thread.currentThread().interrupt();          // Interrupt-Status erhalten
    throw new ApiException("Aufruf fehlgeschlagen", e);
}
```

> **Tipp:** Ein Detail aus dem Beispiel, das fast alle übersehen: Beim Fangen einer InterruptedException muss man den Interrupt-Status mit Thread.currentThread().interrupt() wiederherstellen. Sonst verschluckt dein catch-Block das Abbruchsignal, und übergeordnete Schichten — etwa ein Thread-Pool beim Herunterfahren — warten vergeblich darauf, dass dein Code sich beenden lässt. Es ist eine Zeile, und sie unterscheidet sauberen von scheinbar sauberem Code.

## Kontrollfragen

**1. Was muss beim Fangen einer InterruptedException geschehen?**

- [ ] Nichts weiter
- [x] Den Interrupt-Status mit Thread.currentThread().interrupt() wiederherstellen
- [ ] Den Thread beenden

*Erklärung:* Sonst geht das Abbruchsignal verloren und übergeordnete Schichten können den Thread nicht beenden.

**2. Welche Frage prüft am besten die Produktionsreife?**

- [ ] Ist der Code kurz?
- [x] Was passiert, wenn die Komponente nachts ausfällt und niemand zusieht?
- [ ] Nutzt er die neuesten Sprachfeatures?

*Erklärung:* Unbeaufsichtigter Betrieb deckt fehlende Timeouts, Idempotenz und Beobachtbarkeit auf.
