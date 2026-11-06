# Klassen, Objekte, Konstruktoren

*Objektorientierung im Kern · ca. 9 Min.*

Eine **Klasse** ist der Bauplan, ein **Objekt** die daraus erzeugte Instanz. Die vier Säulen der OOP begegnen dir ab hier ständig: **Kapselung**, **Vererbung**, **Polymorphie** und **Abstraktion**.

**Kapselung** heißt: Felder sind `private`, der Zugriff läuft über Methoden. Das ist kein Formalismus — es erlaubt dir, die interne Darstellung später zu ändern oder Validierung einzuziehen, ohne jeden Aufrufer anzufassen.

Der **Konstruktor** heißt wie die Klasse und hat keinen Rückgabetyp. Gibst du keinen an, erzeugt der Compiler einen parameterlosen Standardkonstruktor — sobald du aber einen eigenen schreibst, verschwindet dieser.

```java
public class Konto {
    private final String iban;          // final: nach Konstruktion unveränderlich
    private BigDecimal saldo;

    public Konto(String iban, BigDecimal startSaldo) {
        if (iban == null || iban.isBlank()) {
            throw new IllegalArgumentException("IBAN darf nicht leer sein");
        }
        this.iban = iban;               // this unterscheidet Feld von Parameter
        this.saldo = startSaldo;
    }

    public void einzahlen(BigDecimal betrag) {
        if (betrag.signum() <= 0) {
            throw new IllegalArgumentException("Betrag muss positiv sein");
        }
        saldo = saldo.add(betrag);
    }

    public BigDecimal getSaldo() { return saldo; }
}
```

> **Tipp:** Validiere im Konstruktor, nicht erst in den Methoden. Ein Objekt sollte nach seiner Erzeugung nie in einem ungültigen Zustand sein können — dieses Prinzip heißt „immer gültige Instanz" und erspart dir unzählige Null- und Plausibilitätsprüfungen an allen späteren Verwendungsstellen.

## Kontrollfragen

**1. Was passiert mit dem Standardkonstruktor, sobald du einen eigenen Konstruktor schreibst?**

- [ ] Er bleibt zusätzlich erhalten
- [x] Er wird nicht mehr erzeugt
- [ ] Er muss überschrieben werden

*Erklärung:* Der Compiler erzeugt den parameterlosen Konstruktor nur, wenn gar keiner deklariert ist.

**2. Warum sollten Felder private sein?**

- [ ] Weil Java das erzwingt
- [x] Damit die interne Darstellung änderbar bleibt und Validierung möglich ist
- [ ] Aus Performancegründen

*Erklärung:* Kapselung trennt die stabile Schnittstelle von der veränderlichen Implementierung.
