# Validierung und zentrale Fehlerbehandlung

*REST-APIs mit Spring Web · ca. 9 Min.*

**Bean Validation** prüft Eingaben deklarativ: `@NotBlank`, `@Size`, `@Positive`, `@Email` am DTO, ausgelöst durch `@Valid` am Controller-Parameter. Schlägt die Prüfung fehl, wirft Spring eine `MethodArgumentNotValidException`.

Fehler gehören nicht in jeden Controller, sondern an eine zentrale Stelle: `@RestControllerAdvice`. Für das Antwortformat gibt es seit Spring 6 den Standard **ProblemDetail** (RFC 9457) — ein einheitliches, maschinenlesbares Fehlerobjekt statt selbst erfundener JSON-Strukturen.

```java
public record NeueBestellung(
        @NotBlank(message = "Kundennummer fehlt") String kundeNr,
        @NotEmpty List<@Valid PositionDto> positionen,
        @Positive BigDecimal gesamtbetrag) { }

@RestControllerAdvice
public class FehlerBehandlung {

    @ExceptionHandler(NichtGefundenException.class)
    public ProblemDetail nichtGefunden(NichtGefundenException e) {
        var pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        pd.setTitle("Ressource nicht gefunden");
        return pd;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail ungueltig(MethodArgumentNotValidException e) {
        var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Eingabe ungültig");
        pd.setProperty("felder", e.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField,
                                          FieldError::getDefaultMessage, (a, b) -> a)));
        return pd;
    }
}
```

> **Tipp:** Achte darauf, was deine Fehlerantworten nach außen verraten. Ein durchgereichter Stacktrace oder eine Meldung wie „Spalte kunde\_nr in Tabelle bestellung nicht gefunden" ist Aufklärungsmaterial über deine interne Struktur. Nach außen gehört eine sachliche, stabile Meldung; die Details gehören ins Log — idealerweise mit einer Korrelations-ID, die auch in der Antwort steht, damit der Support beides zusammenführen kann.

## Kontrollfragen

**1. Wodurch wird die Validierung eines Request-Body ausgelöst?**

- [ ] Automatisch immer
- [x] Durch @Valid am Controller-Parameter
- [ ] Durch einen Aufruf von validate()

*Erklärung:* Ohne @Valid werden die Constraints am DTO nicht geprüft.

**2. Was ist ProblemDetail?**

- [x] Ein standardisiertes Fehlerantwortformat nach RFC 9457
- [ ] Eine Logging-Bibliothek
- [ ] Ein Validierungsannotation

*Erklärung:* Es ersetzt selbst erfundene Fehler-JSON-Strukturen durch ein einheitliches Format.
