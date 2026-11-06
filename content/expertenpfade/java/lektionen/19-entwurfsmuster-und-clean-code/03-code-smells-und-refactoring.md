# Code Smells und Refactoring

*Entwurfsmuster & Clean Code · ca. 8 Min.*

**Code Smells** sind keine Fehler, sondern Warnzeichen für strukturelle Probleme:

| Smell | Symptom | Refactoring |
| --- | --- | --- |
| Long Method | Methode über zwei Bildschirme | Extract Method |
| Large Class | Klasse macht zu viel | Extract Class |
| Long Parameter List | Fünf und mehr Parameter | Parameterobjekt, Builder |
| Duplicated Code | Dieselbe Logik mehrfach | Extract Method, Vererbung |
| Feature Envy | Methode nutzt fast nur fremde Daten | Move Method |
| Primitive Obsession | String für IBAN, int für Geld | Eigener Werttyp (record) |
| Magic Number | Unerklärte Literale im Code | Benannte Konstante |

**Refactoring** heißt: Struktur verbessern, *ohne* das Verhalten zu ändern. Die Voraussetzung dafür sind Tests — ohne sie ist es kein Refactoring, sondern Umbauen auf Verdacht.

```java
// Primitive Obsession: alles String, nichts geprüft
public void ueberweise(String vonIban, String nachIban, BigDecimal betrag) { }

// Eigener Werttyp: Validierung an einer Stelle, Verwechslung unmöglich
public record Iban(String wert) {
    public Iban {
        if (wert == null || !wert.matches("[A-Z]{2}\\d{2}[A-Z0-9]{10,30}"))
            throw new IllegalArgumentException("Ungültige IBAN: " + wert);
    }
}
public void ueberweise(Iban von, Iban nach, Geldbetrag betrag) { }
```

> **Tipp:** Der Werttyp im Beispiel löst ein Problem, das Tests kaum finden: Bei zwei String-Parametern nebeneinander lassen sich Absender und Empfänger vertauschen, und der Compiler schweigt. Mit eigenen Typen wird aus einem Laufzeitfehler in Produktion ein Kompilierfehler am Arbeitsplatz. Das ist der praktische Kern von „Primitive Obsession vermeiden".

## Kontrollfragen

**1. Was ist die Voraussetzung für sicheres Refactoring?**

- [ ] Eine gute IDE
- [x] Tests, die das bestehende Verhalten absichern
- [ ] Ein Code-Review

*Erklärung:* Ohne Tests kann niemand belegen, dass sich das Verhalten nicht geändert hat.

**2. Was bedeutet Primitive Obsession?**

- [ ] Zu viele Klassen
- [x] Fachliche Konzepte werden als String oder int statt als eigener Typ modelliert
- [ ] Zu wenige Kommentare

*Erklärung:* Eigene Werttypen bündeln Validierung und verhindern Verwechslungen.
