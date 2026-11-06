# JSON und Datenaustausch

*Datum, Zeit, Dateien & JSON · ca. 7 Min.*

JSON ist das Standardformat für den Datenaustausch. Java bringt keinen eigenen JSON-Parser mit — üblich sind **Jackson** (am weitesten verbreitet) oder **Gson**.

Das Grundprinzip heißt **Serialisierung** (Objekt → JSON) und **Deserialisierung** (JSON → Objekt). Für Zieltypen eignen sich `record`\-Klassen besonders gut: unveränderlich, knapp, mit korrektem `equals`.

```java
// Jackson
ObjectMapper mapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())          // für java.time
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

public record KundeDto(String nummer, String name, LocalDate seit) {}

String json = mapper.writeValueAsString(new KundeDto("K1", "Ada", LocalDate.now()));
KundeDto zurueck = mapper.readValue(json, KundeDto.class);

// Listen brauchen einen TypeReference, wegen Type Erasure (Modul 9)
List<KundeDto> liste = mapper.readValue(json, new TypeReference<List<KundeDto>>() {});
```

> **Tipp:** Zwei Praxishinweise, die regelmäßig Zeit kosten: Erstens braucht Jackson für java.time das JavaTimeModule, sonst landen Datumsangaben als kryptische Zahlenarrays im JSON. Zweitens verwende für Schnittstellen eigene DTO-Klassen statt deiner Domänenobjekte — sonst ändert jede interne Umbenennung stillschweigend deine öffentliche API, und externe Aufrufer brechen.

## Kontrollfragen

**1. Was bedeutet Deserialisierung?**

- [ ] Objekt in JSON umwandeln
- [x] JSON in ein Java-Objekt umwandeln
- [ ] Eine Datei löschen

*Erklärung:* Serialisierung ist der umgekehrte Weg vom Objekt zum Textformat.

**2. Warum eigene DTO-Klassen für Schnittstellen statt der Domänenobjekte?**

- [x] Damit interne Änderungen nicht ungewollt die öffentliche API verändern
- [ ] Weil Jackson Domänenobjekte nicht lesen kann
- [ ] Aus Performancegründen

*Erklärung:* Die DTO-Schicht entkoppelt interne Modellierung von der veröffentlichten Schnittstelle.
