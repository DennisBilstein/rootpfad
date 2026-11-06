# Schichten, DTOs und saubere API-Evolution

*REST-APIs mit Spring Web · ca. 8 Min.*

Eine bewährte Schichtung trennt drei Verantwortlichkeiten:

-   **Controller** — HTTP: Eingabe entgegennehmen, validieren, Statuscodes setzen. Keine Geschäftslogik.
-   **Service** — Geschäftslogik und Transaktionsgrenzen. Kennt kein HTTP.
-   **Repository** — Datenzugriff. Kennt keine Geschäftsregeln.

Der Test dafür ist einfach: Lässt sich dein Service unverändert auch von einem Batchlauf oder einer Konsolenanwendung aufrufen? Wenn er `HttpServletRequest` oder `ResponseEntity` kennt, lautet die Antwort nein.

Für die **API-Evolution** gilt: Felder ergänzen ist abwärtskompatibel, umbenennen und entfernen nicht. Wer breaking changes braucht, versioniert — meist über den Pfad (`/api/v2/...`).

```java
@Service
public class BestellService {
    private final BestellRepository repo;

    @Transactional
    public BestellDto anlegen(NeueBestellung eingabe) {
        Bestellung entity = new Bestellung(eingabe.kundeNr());
        eingabe.positionen().forEach(p -> entity.addPosition(p.artikel(), p.menge()));
        return BestellDto.von(repo.save(entity));       // Mapping an einer Stelle
    }
}

public record BestellDto(long id, String kundeNr, BigDecimal summe, Status status) {
    public static BestellDto von(Bestellung b) {
        return new BestellDto(b.getId(), b.getKundeNr(), b.summe(), b.getStatus());
    }
}
```

> **Tipp:** Die Mapping-Schicht wird oft als lästig empfunden — bis zur ersten Umbenennung eines Datenbankfeldes. Dann ändert sich genau eine Methode, statt dass alle Clients brechen. Für einfache Fälle reicht eine statische Fabrikmethode wie hier; erst bei vielen Objekten lohnt eine Bibliothek wie MapStruct, die das Mapping zur Compilezeit generiert.

## Kontrollfragen

**1. Woran erkennst du, dass Geschäftslogik fälschlich im Controller liegt?**

- [ ] Der Controller ist kurz
- [x] Der Service kennt HTTP-Typen wie ResponseEntity oder HttpServletRequest
- [ ] Es gibt DTOs

*Erklärung:* Ein sauberer Service ist auch aus einem Batchlauf heraus aufrufbar.

**2. Welche API-Änderung ist abwärtskompatibel?**

- [ ] Ein Feld umbenennen
- [x] Ein optionales Feld ergänzen
- [ ] Ein Feld entfernen

*Erklärung:* Bestehende Clients ignorieren unbekannte Felder; Umbenennen und Entfernen brechen sie.
