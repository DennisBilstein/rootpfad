# Konfiguration, Profile und Geheimnisse

*Spring-Grundlagen & Dependency Injection · ca. 8 Min.*

Konfiguration gehört nicht in den Code (Modul 20). Spring Boot liest sie aus `application.yml` beziehungsweise `application.properties` — und überlagert sie nach einer festen Rangfolge: Kommandozeilenargumente schlagen Umgebungsvariablen, diese schlagen Profildateien, diese die Basisdatei.

**Profile** trennen Umgebungen: `application-dev.yml`, `application-prod.yml`, aktiviert über `SPRING_PROFILES_ACTIVE=prod`.

Statt einzelner `@Value`\-Annotationen empfiehlt sich `@ConfigurationProperties`: typsicher, gebündelt, validierbar — und beim Start schlägt eine fehlende Pflichtangabe sofort fehl, statt erst beim ersten Zugriff.

```yaml/java
# application.yml
zahlung:
  url: https://api.example.com
  timeout: 5s
  api-key: ${ZAHLUNG_API_KEY}      # aus der Umgebung, nicht im Repository

---
@ConfigurationProperties(prefix = "zahlung")
@Validated
public record ZahlungConfig(
        @NotBlank String url,
        @NotNull Duration timeout,
        @NotBlank String apiKey) { }
```

> **Tipp:** Der wirksamste Konfigurationsgrundsatz lautet: Dasselbe Artefakt muss unverändert durch alle Stufen wandern. Wenn du für Produktion neu bauen musst, testest du nicht das, was du ausliefern wirst. Alles Umgebungsspezifische — URLs, Zugangsdaten, Zeitlimits — kommt von außen über Umgebungsvariablen. Geheimnisse gehören nie ins Repository; ein versehentlich committeter Schlüssel gilt als kompromittiert, auch wenn du den Commit löschst.

## Kontrollfragen

**1. Was hat die höchste Priorität in Spring Boots Konfigurationsrangfolge?**

- [ ] application.yml
- [x] Kommandozeilenargumente
- [ ] Die Profildatei

*Erklärung:* Kommandozeilenargumente überlagern Umgebungsvariablen und alle Dateien.

**2. Welchen Vorteil bietet @ConfigurationProperties gegenüber vielen @Value?**

- [x] Typsichere, gebündelte und validierbare Konfiguration mit Fehlern beim Start
- [ ] Es ist schneller
- [ ] Es verschlüsselt Werte

*Erklärung:* Fehlende Pflichtwerte lassen die Anwendung sofort beim Start scheitern statt später im Betrieb.
