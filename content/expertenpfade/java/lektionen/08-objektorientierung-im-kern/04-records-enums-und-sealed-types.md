# Records, Enums und sealed types

*Objektorientierung im Kern · ca. 8 Min.*

Modernes Java bietet für häufige Muster eigene, knappe Konstrukte:

-   **`record`** (Java 16+) erzeugt eine unveränderliche Datenklasse samt Konstruktor, Gettern, `equals`, `hashCode` und `toString` — aus 50 Zeilen Boilerplate wird eine.
-   **`enum`** definiert eine feste Menge von Konstanten, kann aber auch Felder und Methoden haben — weit mehr als nur benannte Zahlen.
-   **`sealed`** (Java 17+) schränkt ein, welche Klassen erben dürfen. Zusammen mit `switch`\-Pattern-Matching kann der Compiler dann prüfen, ob du alle Fälle behandelt hast.

```java
public record Adresse(String strasse, String plz, String ort) {
    public Adresse {                       // kompakter Konstruktor: Validierung
        if (plz.length() != 5) throw new IllegalArgumentException("PLZ ungültig");
    }
}

public enum Status {
    OFFEN("Offen"), BEZAHLT("Bezahlt"), STORNIERT("Storniert");

    private final String anzeige;
    Status(String anzeige) { this.anzeige = anzeige; }
    public String anzeige() { return anzeige; }
}

public sealed interface Zahlung permits Karte, Rechnung, Lastschrift { }

// Der Compiler weiß: mehr Fälle kann es nicht geben
String text = switch (zahlung) {
    case Karte k       -> "Karte " + k.nummer();
    case Rechnung r    -> "Rechnung";
    case Lastschrift l -> "Lastschrift";
};
```

> **Tipp:** Records sind kein reiner Schreibkomfort. Weil sie automatisch ein korrektes equals und hashCode mitbringen, verschwindet eine ganze Fehlerklasse: falsch oder gar nicht implementierte Gleichheit, die dann stillschweigend HashSet und HashMap kaputtmacht (Modul 9). Für reine Datenträger — DTOs, Wertobjekte, Rückgabetupel — ist record heute die richtige Standardwahl.

## Kontrollfragen

**1. Was erzeugt ein record automatisch?**

- [ ] Nur den Konstruktor
- [x] Konstruktor, Getter, equals, hashCode und toString
- [ ] Eine Datenbanktabelle

*Erklärung:* Records sind unveränderliche Datenträger mit vollständig generierter Standardausstattung.

**2. Wozu dient sealed?**

- [ ] Um eine Klasse zu verschlüsseln
- [x] Um einzuschränken, welche Klassen erben dürfen
- [ ] Um Felder unveränderlich zu machen

*Erklärung:* Der begrenzte Typbaum erlaubt dem Compiler die Vollständigkeitsprüfung in switch.
