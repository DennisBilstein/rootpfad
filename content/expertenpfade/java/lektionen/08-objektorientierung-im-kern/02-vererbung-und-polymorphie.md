# Vererbung und Polymorphie

*Objektorientierung im Kern · ca. 9 Min.*

`extends` erzeugt eine Unterklasse, die alle sichtbaren Member erbt. `@Override` überschreibt eine geerbte Methode — die Annotation ist optional, aber du solltest sie immer setzen: Sie lässt den Compiler prüfen, ob du wirklich überschreibst und nicht versehentlich eine neue Methode mit ähnlichem Namen anlegst.

**Polymorphie** heißt: Eine Variable vom Typ der Oberklasse kann Objekte jeder Unterklasse aufnehmen, und zur Laufzeit wird die Methode des tatsächlichen Objekts aufgerufen — „dynamic dispatch".

`super` ruft die Implementierung der Oberklasse auf. `final` an einer Methode verhindert Überschreiben, an einer Klasse verhindert es Vererbung.

```java
public abstract class Mitarbeiter {
    protected final String name;
    protected Mitarbeiter(String name) { this.name = name; }

    public abstract BigDecimal monatsGehalt();   // muss implementiert werden

    @Override
    public String toString() { return name + ": " + monatsGehalt(); }
}

public class Festangestellter extends Mitarbeiter {
    private final BigDecimal jahresGehalt;

    public Festangestellter(String name, BigDecimal jahresGehalt) {
        super(name);                     // muss erste Anweisung sein
        this.jahresGehalt = jahresGehalt;
    }
    @Override
    public BigDecimal monatsGehalt() {
        return jahresGehalt.divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);
    }
}

// Polymorphie: der Aufrufer kennt nur den Obertyp
List<Mitarbeiter> team = List.of(new Festangestellter("Ada", ...), new Werkstudent(...));
team.forEach(m -> System.out.println(m.monatsGehalt()));
```

> **Tipp:** Setz @Override konsequent. Der klassische Fehler ist, public boolean equals(MeineKlasse other) zu schreiben statt equals(Object other) — das überschreibt nichts, sondern überlädt. Ohne die Annotation kompiliert das anstandslos, und dein equals wird von Collections nie aufgerufen. Mit @Override meckert der Compiler sofort.

## Kontrollfragen

**1. Was bewirkt die Annotation @Override?**

- [ ] Sie ist Pflicht, sonst überschreibt die Methode nicht
- [x] Der Compiler prüft, ob wirklich eine geerbte Methode überschrieben wird
- [ ] Sie macht die Methode final

*Erklärung:* Technisch optional, praktisch unverzichtbar — sie fängt Tippfehler und falsche Signaturen ab.

**2. Was ist dynamic dispatch?**

- [x] Die Methode der tatsächlichen Objektklasse wird zur Laufzeit gewählt
- [ ] Der Compiler wählt die Methode fest aus
- [ ] Methoden werden zufällig aufgerufen

*Erklärung:* Der deklarierte Variablentyp bestimmt, was aufrufbar ist — das Objekt bestimmt, was ausgeführt wird.
