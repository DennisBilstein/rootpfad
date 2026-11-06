# equals, hashCode und Comparable

*Collections & Generics · ca. 9 Min.*

Hier liegt einer der folgenschwersten Fallstricke der Sprache. `HashSet` und `HashMap` finden ein Objekt nur wieder, wenn `hashCode()` und `equals()` zusammenpassen.

**Der Vertrag:**

-   Sind zwei Objekte nach `equals` gleich, *müssen* sie denselben `hashCode` liefern.
-   Gleicher `hashCode` bedeutet umgekehrt nicht zwingend Gleichheit (Kollision ist erlaubt).
-   Überschreibst du eines, überschreibe immer auch das andere.

`Comparable` definiert die *natürliche* Sortierreihenfolge einer Klasse, `Comparator` eine beliebige alternative — etwa für unterschiedliche Sortierungen derselben Daten.

```java
public class Artikel {
    private final String nummer;
    private final String bezeichnung;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Artikel a)) return false;
        return nummer.equals(a.nummer);       // fachliche Identität
    }
    @Override
    public int hashCode() { return Objects.hash(nummer); }
}

// Comparator: mehrere Sortierungen nebeneinander
artikel.sort(Comparator.comparing(Artikel::bezeichnung)
                       .thenComparing(Artikel::nummer)
                       .reversed());
```

> **Tipp:** Der teuerste Fehler dieser Lektion in freier Wildbahn: ein veränderliches Feld in hashCode() zu verwenden. Legst du das Objekt in ein HashSet und änderst danach dieses Feld, landet es im falschen Bucket — es ist dann im Set enthalten, wird aber von contains() nicht mehr gefunden und von remove() nicht entfernt. Nimm für hashCode nur unveränderliche, fachlich identifizierende Felder. Oder nutz gleich ein record.

## Kontrollfragen

**1. Was fordert der equals/hashCode-Vertrag?**

- [x] Gleiche Objekte müssen gleichen hashCode liefern
- [ ] Gleicher hashCode bedeutet immer Gleichheit
- [ ] hashCode muss eindeutig sein

*Erklärung:* Die Umkehrung gilt nicht — Kollisionen sind erlaubt und normal.

**2. Was passiert, wenn ein in hashCode verwendetes Feld nach dem Einfügen ins HashSet geändert wird?**

- [ ] Nichts Besonderes
- [x] Das Objekt wird im falschen Bucket gesucht und ist praktisch unauffindbar
- [ ] Das Set sortiert sich neu

*Erklärung:* Deshalb gehören nur unveränderliche Felder in hashCode.
