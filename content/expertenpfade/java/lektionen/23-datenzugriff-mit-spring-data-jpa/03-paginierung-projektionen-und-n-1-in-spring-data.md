# Paginierung, Projektionen und N+1 in Spring Data

*Datenzugriff mit Spring Data JPA · ca. 9 Min.*

Das **N+1-Problem** aus Modul 17 tritt in Spring Data besonders leicht auf, weil das Nachladen unsichtbar geschieht. Drei Werkzeuge dagegen:

-   **`@EntityGraph`** — deklariert, welche Beziehungen mitgeladen werden sollen.
-   **`JOIN FETCH`** in einer `@Query`.
-   **Projektionen** — lade nur die benötigten Felder statt ganzer Entities. Das ist oft die beste Lösung, weil gar keine Beziehungen entstehen.

**Paginierung** läuft über `Pageable` und liefert ein `Page` mit Inhalt, Gesamtzahl und Seiteninformationen. Achtung: `Page` setzt eine zusätzliche COUNT-Abfrage ab; wo die Gesamtzahl nicht gebraucht wird, ist `Slice` sparsamer.

```java
public interface BestellRepository extends JpaRepository<Bestellung, Long> {

    @EntityGraph(attributePaths = {"kunde", "positionen"})
    List<Bestellung> findByStatus(Status status);

    // Projektion: lädt nur zwei Spalten statt ganzer Entities
    interface BestellUebersicht {
        String getNummer();
        BigDecimal getSumme();
    }
    Page<BestellUebersicht> findByKundeNr(String kundeNr, Pageable pageable);
}

// Aufruf mit Seitengröße und Sortierung
var seite = repo.findByKundeNr("K1", PageRequest.of(0, 20, Sort.by("datum").descending()));
```

> **Tipp:** Aktiviere in der Entwicklung unbedingt das SQL-Logging (spring.jpa.show-sql plus formatiertes Ausgabeformat) und schau beim Bauen jeder Listenansicht einmal hin. Die Frage lautet nicht „funktioniert es?", sondern „wie viele Abfragen sind das?". Eine Übersichtsseite mit 20 Einträgen, die 60 Abfragen absetzt, funktioniert tadellos — bis sie unter Last steht.

## Kontrollfragen

**1. Wozu dient @EntityGraph?**

- [ ] Zum Erzeugen von Diagrammen
- [x] Um festzulegen, welche Beziehungen in derselben Abfrage mitgeladen werden
- [ ] Zum Validieren von Entities

*Erklärung:* Es verhindert das N+1-Problem, ohne die Abfrage selbst schreiben zu müssen.

**2. Was unterscheidet Page von Slice?**

- [x] Page führt zusätzlich eine COUNT-Abfrage für die Gesamtzahl aus
- [ ] Slice ist sortiert
- [ ] Es gibt keinen Unterschied

*Erklärung:* Wo die Gesamtzahl nicht angezeigt wird, spart Slice diese Abfrage.
