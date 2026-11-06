# Die wichtigsten Entwurfsmuster

*Entwurfsmuster & Clean Code · ca. 10 Min.*

Muster sind benannte Lösungen für wiederkehrende Entwurfsprobleme — ihr größter Nutzen ist die gemeinsame Sprache im Team.

-   **Strategy** — austauschbares Verhalten hinter einem Interface. In Java oft schlicht ein Lambda.
-   **Factory** — Objekterzeugung kapseln; der Aufrufer kennt nur den Typ, nicht die Implementierung.
-   **Builder** — Objekte mit vielen optionalen Feldern lesbar zusammensetzen, statt Konstruktoren mit acht Parametern.
-   **Observer** — Beobachter informieren; in Java über Listener oder Events.
-   **Singleton** — genau eine Instanz. In Java am sichersten als `enum`; oft ist ein von außen gereichtes Objekt aber die bessere Lösung.
-   **Adapter** — eine fremde Schnittstelle auf die eigene umsetzen. Die wichtigste Verteidigungslinie gegen Bibliotheksabhängigkeit.

```java
// Strategy — in modernem Java oft nur ein Lambda
Map<Kundentyp, UnaryOperator<BigDecimal>> rabatte = Map.of(
        Kundentyp.STANDARD, b -> b.multiply(new BigDecimal("0.05")),
        Kundentyp.PREMIUM,  b -> b.multiply(new BigDecimal("0.15")));
BigDecimal rabatt = rabatte.get(typ).apply(betrag);

// Builder — lesbar statt Konstruktor mit acht Parametern
Bestellung b = Bestellung.builder()
        .kunde(kunde)
        .position(artikel, 3)
        .lieferdatum(LocalDate.now().plusDays(5))
        .build();

// Singleton als enum: threadsicher, serialisierungsfest
public enum Konfiguration {
    INSTANCE;
    public String wert(String schluessel) { ... }
}
```

> **Tipp:** Muster sind Werkzeuge, keine Auszeichnungen. Der typische Fehler von Fortgeschrittenen ist, sie einzusetzen, weil man sie kann — eine AbstractSingletonProxyFactoryBean für ein Problem, das drei Zeilen gebraucht hätte. Die ehrliche Frage lautet: Gibt es hier wirklich mehrere Varianten, oder erfinde ich gerade Flexibilität, die niemand braucht? Muster, die man erst bei Bedarf einführt, altern besser.

## Kontrollfragen

**1. Welches Muster kapselt austauschbares Verhalten hinter einem Interface?**

- [ ] Singleton
- [x] Strategy
- [ ] Adapter

*Erklärung:* In modernem Java genügt dafür oft schon ein Lambda oder eine Methodenreferenz.

**2. Wozu dient das Builder-Muster?**

- [x] Um Objekte mit vielen optionalen Feldern lesbar zu erzeugen
- [ ] Um Objekte zu löschen
- [ ] Um Vererbung zu ersetzen

*Erklärung:* Es ersetzt unleserliche Konstruktoren mit vielen gleichartigen Parametern.
