# java.time richtig verwenden

*Datum, Zeit, Dateien & JSON · ca. 8 Min.*

Die alten Klassen `Date`, `Calendar` und `SimpleDateFormat` sind veränderlich, nicht threadsicher und in der Bedienung fehleranfällig. Seit Java 8 gilt ausschließlich `java.time` — unveränderlich und klar getrennt nach Anwendungsfall:

| Typ | Enthält | Einsatz |
| --- | --- | --- |
| LocalDate | Datum ohne Zeit | Geburtstag, Fälligkeit |
| LocalTime | Zeit ohne Datum | Öffnungszeit |
| LocalDateTime | Datum und Zeit, ohne Zone | Lokaler Termin |
| ZonedDateTime | Mit Zeitzone | Termine über Zonen hinweg |
| Instant | Zeitpunkt auf der UTC-Zeitachse | Zeitstempel, Protokolle |
| Duration / Period | Zeitspanne / Datumsspanne | Differenzen |

```java
LocalDate heute = LocalDate.now();
LocalDate faellig = heute.plusDays(30);              // erzeugt ein NEUES Objekt
boolean ueberfaellig = faellig.isBefore(LocalDate.now());

Period alter = Period.between(geburtstag, heute);
int jahre = alter.getYears();

Duration dauer = Duration.between(start, ende);
long minuten = dauer.toMinutes();

DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd.MM.yyyy");
String text = faellig.format(fmt);
LocalDate zurueck = LocalDate.parse("31.12.2026", fmt);

// Für gespeicherte Zeitstempel: UTC verwenden
Instant zeitstempel = Instant.now();
```

> **Tipp:** Speichere Zeitstempel grundsätzlich als Instant beziehungsweise in UTC und wandle erst bei der Anzeige in die Zeitzone des Nutzers um. Wer lokale Zeiten speichert, bekommt spätestens bei der Sommerzeitumstellung Probleme: Eine Stunde existiert doppelt, eine gar nicht. Genau daran scheitern jedes Jahr echte Abrechnungssysteme.

## Kontrollfragen

**1. Was liefert heute.plusDays(30) bei einem LocalDate?**

- [ ] Es verändert das Objekt
- [x] Es liefert ein neues Objekt, das Original bleibt unverändert
- [ ] Es wirft eine Exception

*Erklärung:* Alle java.time-Typen sind unveränderlich — jede Operation gibt ein neues Objekt zurück.

**2. Welcher Typ passt für einen gespeicherten Zeitstempel?**

- [ ] LocalDateTime
- [x] Instant (UTC)
- [ ] LocalTime

*Erklärung:* Instant ist zeitzonenunabhängig und damit eindeutig.
