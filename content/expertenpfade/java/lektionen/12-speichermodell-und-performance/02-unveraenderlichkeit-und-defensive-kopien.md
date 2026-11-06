# Unveränderlichkeit und defensive Kopien

*Speichermodell & Performance · ca. 8 Min.*

**Immutable** Objekte lassen sich nach der Erzeugung nicht mehr ändern. Sie sind automatisch threadsicher, können bedenkenlos geteilt und als Map-Schlüssel verwendet werden — und eliminieren eine ganze Klasse von Fehlern.

Damit eine Klasse wirklich unveränderlich ist, reicht `final` an den Feldern nicht: Enthält sie eine Collection oder ein veränderliches Objekt, muss beim Hereingeben *und* beim Herausgeben kopiert werden.

```java
public final class Bestellung {
    private final String nummer;
    private final List<Position> positionen;

    public Bestellung(String nummer, List<Position> positionen) {
        this.nummer = nummer;
        this.positionen = List.copyOf(positionen);   // Kopie beim Hereingeben
    }
    public List<Position> positionen() {
        return positionen;                           // bereits unveränderlich
    }
    // „Ändern" erzeugt ein neues Objekt
    public Bestellung mitPosition(Position p) {
        var neu = new ArrayList<>(positionen);
        neu.add(p);
        return new Bestellung(nummer, neu);
    }
}
```

> **Tipp:** Ohne die Kopie im Konstruktor ist die Unveränderlichkeit eine Illusion: Der Aufrufer behält eine Referenz auf die übergebene Liste und kann sie danach weiter verändern — dein „unveränderliches" Objekt ändert sich mit. Genau dieser Fall wird in Code-Reviews am häufigsten übersehen, weil die Klasse auf den ersten Blick korrekt aussieht.

## Kontrollfragen

**1. Warum sind unveränderliche Objekte threadsicher?**

- [ ] Weil die JVM sie sperrt
- [x] Weil es keinen veränderlichen Zustand gibt, um den Threads konkurrieren könnten
- [ ] Weil sie synchronized sind

*Erklärung:* Ohne Zustandsänderung kann es keine Race Condition geben.

**2. Warum reicht final an einem List-Feld nicht aus?**

- [x] final verhindert nur das Neuzuweisen der Referenz, nicht das Ändern des Inhalts
- [ ] final wirkt bei Listen gar nicht
- [ ] Weil Listen immer unveränderlich sind

*Erklärung:* Der Inhalt bleibt änderbar — deshalb braucht es eine unveränderliche Kopie.
