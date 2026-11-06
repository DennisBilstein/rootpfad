# Kontrollstrukturen und moderne Syntax

*Einstieg: Programm, JVM, Typen · ca. 8 Min.*

Neben `if`, `for`, `while` und `do-while` bringt modernes Java einige Konstrukte, die Code deutlich klarer machen:

-   **switch expressions** (Java 14+) liefern einen Wert zurück, kennen kein versehentliches Durchfallen und erzwingen Vollständigkeit.
-   **`var`** (Java 10+) leitet den Typ lokaler Variablen aus der Zuweisung ab — der Typ bleibt statisch geprüft, er wird nur nicht ausgeschrieben.
-   **Pattern Matching für instanceof** (Java 16+) spart den expliziten Cast.

```java
// Alte switch-Anweisung: break nicht vergessen!
switch (status) {
    case "A": text = "Offen"; break;
    case "C": text = "Abgeschlossen"; break;
    default:  text = "Unbekannt";
}

// switch expression: kein break, liefert einen Wert
String text = switch (status) {
    case "A" -> "Offen";
    case "C" -> "Abgeschlossen";
    default  -> "Unbekannt";
};

// var: Typ wird abgeleitet, bleibt aber statisch
var kunden = new ArrayList<Kunde>();

// Pattern Matching statt Cast
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.toUpperCase());
}
```

> **Tipp:** Das vergessene break in der alten switch-Anweisung („fall-through") ist ein Klassiker: Der Code läuft dann in den nächsten case weiter und produziert falsche Ergebnisse, ohne zu warnen. Die switch expression mit Pfeil kennt dieses Verhalten gar nicht — ein Beispiel dafür, wie moderne Sprachfeatures nicht nur kürzer sind, sondern ganze Fehlerklassen unmöglich machen.

## Kontrollfragen

**1. Was passiert bei einem vergessenen break in der klassischen switch-Anweisung?**

- [ ] Kompilierfehler
- [x] Die Ausführung läuft in den nächsten case weiter (fall-through)
- [ ] Der Block wird übersprungen

*Erklärung:* Genau deshalb sind switch expressions mit Pfeilsyntax die sicherere Wahl.

**2. Was bewirkt var bei einer lokalen Variable?**

- [ ] Sie wird dynamisch typisiert wie in JavaScript
- [x] Der Compiler leitet den statischen Typ aus der Zuweisung ab
- [ ] Sie wird automatisch final

*Erklärung:* var ist reine Schreiberleichterung — die Typprüfung findet weiterhin zur Compilezeit statt.
