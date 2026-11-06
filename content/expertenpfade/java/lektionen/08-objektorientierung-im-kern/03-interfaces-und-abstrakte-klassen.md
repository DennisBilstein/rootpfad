# Interfaces und abstrakte Klassen

*Objektorientierung im Kern · ca. 8 Min.*

Ein **Interface** beschreibt einen Vertrag ohne Zustand. Eine Klasse kann beliebig viele Interfaces implementieren, aber nur von *einer* Klasse erben — so löst Java das Mehrfachvererbungsproblem.

Seit Java 8 dürfen Interfaces **default-Methoden** mit Implementierung enthalten, seit Java 9 auch `private` Hilfsmethoden. Trotzdem bleibt der Unterschied:

| Kriterium | Interface | Abstrakte Klasse |
| --- | --- | --- |
| Zustand (Felder) | Nur Konstanten | Beliebige Felder |
| Mehrfach nutzbar | Ja, beliebig viele | Nein, nur eine Oberklasse |
| Konstruktor | Nein | Ja |
| Gedanke | „kann etwas" (Fähigkeit) | „ist ein" (Verwandtschaft) |

```java
public interface Zahlbar {
    BigDecimal betrag();

    default boolean istKostenlos() {      // default-Methode, Java 8+
        return betrag().signum() == 0;
    }
}

public class Rechnung implements Zahlbar, Comparable<Rechnung> {
    private final BigDecimal summe;

    @Override public BigDecimal betrag() { return summe; }

    @Override public int compareTo(Rechnung other) {
        return this.summe.compareTo(other.summe);
    }
}
```

> **Tipp:** Die Faustregel, die in Code-Reviews zählt: Programmiere gegen Interfaces, nicht gegen Implementierungen. Also List liste = new ArrayList<>(); statt ArrayList liste = .... Dann kannst du die Implementierung später gegen LinkedList oder eine unveränderliche Liste tauschen, ohne eine einzige Aufrufstelle anzufassen — und in Tests gegen ein Test Double.

## Kontrollfragen

**1. Wie viele Interfaces kann eine Java-Klasse implementieren?**

- [ ] Genau eines
- [x] Beliebig viele
- [ ] Höchstens zwei

*Erklärung:* Nur bei der Klassenvererbung ist Java auf eine Oberklasse beschränkt.

**2. Was ist der wesentliche Unterschied zur abstrakten Klasse?**

- [x] Interfaces können keinen veränderlichen Zustand halten
- [ ] Interfaces sind schneller
- [ ] Abstrakte Klassen haben keine Methoden

*Erklärung:* Interfaces beschreiben Fähigkeiten, abstrakte Klassen teilen zusätzlich Zustand und Basisimplementierung.
