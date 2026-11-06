# JPA/Hibernate: ORM und seine Tücken

*Datenbankzugriff mit Java · ca. 9 Min.*

**JPA** ist der Standard für objektrelationales Mapping, **Hibernate** die verbreitetste Implementierung. Eine `@Entity`\-Klasse wird auf eine Tabelle abgebildet, der `EntityManager` verwaltet den *Persistenzkontext*: Geladene Objekte gelten als „managed", Änderungen daran werden beim Commit automatisch geschrieben (Dirty Checking).

Die berüchtigtste Falle ist das **N+1-Problem**: Du lädst 100 Bestellungen (1 Abfrage) und greifst danach je Bestellung auf den Kunden zu — Hibernate setzt 100 weitere Abfragen ab. Lösung: `JOIN FETCH` oder ein Entity Graph.

```java
@Entity
public class Bestellung {
    @Id @GeneratedValue private Long id;

    @ManyToOne(fetch = FetchType.LAZY)        // Standard für ToOne wäre EAGER
    private Kunde kunde;

    @OneToMany(mappedBy = "bestellung", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Position> positionen = new ArrayList<>();
}

// N+1: eine Abfrage für die Liste, dann eine je Kunde
List<Bestellung> alle = em.createQuery("SELECT b FROM Bestellung b", Bestellung.class)
                          .getResultList();
alle.forEach(b -> System.out.println(b.getKunde().getName()));   // 100 Extra-Abfragen

// Lösung: in einer Abfrage mitladen
List<Bestellung> alle = em.createQuery(
        "SELECT b FROM Bestellung b JOIN FETCH b.kunde", Bestellung.class)
        .getResultList();
```

> **Tipp:** Schalte im Entwicklungsprofil das SQL-Logging ein (bei Hibernate show\_sql plus format\_sql) und sieh dir an, wie viele Abfragen eine Seite tatsächlich auslöst. Fast jedes Team entdeckt dabei beim ersten Mal ein N+1-Problem, das in der Oberfläche völlig unauffällig war — bis die Testdaten von 20 auf 20.000 Zeilen wuchsen. ORM macht Datenbankzugriffe bequem, aber nicht unsichtbar.

## Kontrollfragen

**1. Was ist das N+1-Problem?**

- [x] Eine Abfrage für die Liste plus je eine weitere pro Element
- [ ] Ein Fehler beim Zählen
- [ ] Ein Problem mit Primärschlüsseln

*Erklärung:* Typisch beim Zugriff auf lazy geladene Beziehungen innerhalb einer Schleife.

**2. Womit lässt es sich vermeiden?**

- [ ] Mit mehr Speicher
- [x] Mit JOIN FETCH oder einem Entity Graph
- [ ] Durch Abschalten der Transaktionen

*Erklärung:* Die Beziehung wird dann in derselben Abfrage mitgeladen.
