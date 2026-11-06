# Vom ER-Modell zur Java-Klasse

*Datenmodellierung: ER-Modell & Normalisierung · ca. 7 Min.*

Aus dem Datenmodell entstehen in Java **Klassen**: Entität → Klasse, Attribut → Feld, Primärschlüssel → ID-Feld, Beziehung → Referenz oder Collection.

Eine 1:n-Beziehung wird auf der „n"-Seite meist als Referenz auf das Elternobjekt abgebildet, auf der „1"-Seite als `List<...>`. Bei n:m entsteht eine eigene Klasse für die Verknüpfung — genau wie in der Datenbank.

```java
public class Kunde {
    private final Long id;
    private String name;
    private final List<Bestellung> bestellungen = new ArrayList<>();

    public Kunde(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public List<Bestellung> getBestellungen() {
        return List.copyOf(bestellungen);   // defensive Kopie, Modul 12
    }
}

public class Bestellposition {          // aufgelöste n:m-Beziehung
    private final Bestellung bestellung;
    private final Produkt produkt;
    private final int menge;
}
```

> **Tipp:** Ein häufiger Anfängerfehler: die interne Liste direkt über einen Getter herausgeben. Dann kann jeder Aufrufer von außen Elemente hinzufügen oder löschen, ohne dass deine Klasse es merkt — die Kapselung ist wirkungslos. List.copyOf() oder Collections.unmodifiableList() geben eine unveränderliche Sicht zurück.

## Kontrollfragen

**1. Wie wird eine 1:n-Beziehung in Java typischerweise abgebildet?**

- [x] Als Referenz auf der n-Seite und List auf der 1-Seite
- [ ] Immer nur als einzelnes Feld
- [ ] Über static-Variablen

*Erklärung:* Die n-Seite kennt ihr Elternobjekt, die 1-Seite hält eine Collection der Kinder.

**2. Warum sollte ein Getter nicht die interne Liste direkt zurückgeben?**

- [ ] Aus Performancegründen
- [x] Weil Aufrufer sie dann von außen verändern können und die Kapselung wirkungslos wird
- [ ] Weil Java das verbietet

*Erklärung:* Eine unveränderliche Kopie oder Sicht schützt den internen Zustand.
