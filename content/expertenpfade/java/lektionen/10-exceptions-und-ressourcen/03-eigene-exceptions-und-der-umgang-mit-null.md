# Eigene Exceptions und der Umgang mit null

*Exceptions & Ressourcen · ca. 8 Min.*

Gute Exception-Hierarchien spiegeln fachliche Fehlerkategorien, nicht technische Zufälle. Eine gemeinsame Basisklasse pro Fachbereich, darunter spezifische Typen für Fälle, auf die ein Aufrufer *unterschiedlich reagieren muss*.

Die `NullPointerException` ist Javas häufigster Laufzeitfehler. Die wirksamsten Gegenmittel:

-   **Nie `null` zurückgeben**, wo eine Collection erwartet wird — gib eine leere Liste zurück.
-   **`Optional`** als Rückgabetyp, wenn ein Wert legitim fehlen kann (Modul 11).
-   **Früh prüfen** mit `Objects.requireNonNull` im Konstruktor — dann scheitert es dort, wo der Fehler entsteht, nicht drei Schichten später.

```java
public class KontoNichtGefundenException extends RuntimeException {
    private final String iban;

    public KontoNichtGefundenException(String iban) {
        super("Kein Konto zur IBAN " + iban);
        this.iban = iban;
    }
    public String getIban() { return iban; }
}

public Kontoauszug erstelle(String iban) {
    Objects.requireNonNull(iban, "iban darf nicht null sein");
    return repository.findByIban(iban)
            .map(this::baueAuszug)
            .orElseThrow(() -> new KontoNichtGefundenException(iban));
}
```

> **Tipp:** Eine Regel, die in Reviews immer wieder auffällt: catch (Exception e) {} — ein leerer Catch-Block. Damit verschwindet der Fehler spurlos, das Programm läuft mit inkonsistentem Zustand weiter, und niemand erfährt davon. Ein Fehler, der laut und früh scheitert, ist immer billiger als einer, der still weiterläuft. Wenn du wirklich nichts tun willst, kommentiere zumindest, warum das hier sicher ist.

## Kontrollfragen

**1. Was solltest du statt null bei einer leeren Ergebnismenge zurückgeben?**

- [x] Eine leere Collection
- [ ] null mit Kommentar
- [ ] Eine Exception

*Erklärung:* Leere Collections ersparen jedem Aufrufer die Null-Prüfung.

**2. Warum ist ein leerer catch-Block problematisch?**

- [ ] Er verlangsamt das Programm
- [x] Der Fehler verschwindet spurlos und das Programm läuft mit inkonsistentem Zustand weiter
- [ ] Er ist syntaktisch ungültig

*Erklärung:* Stille Fehler sind die teuersten, weil sie erst weit entfernt von ihrer Ursache auffallen.
