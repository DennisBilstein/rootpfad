# Moderne funktionale Konstrukte im Detail

*Syntax, Typsystem & moderne Sprachkonstrukte · ca. 7 Min.*

Vertiefung zu COND/SWITCH/REDUCE/FILTER/VALUE: der **LET-Ausdruck** definiert lokale Hilfsvariablen, gültig nur innerhalb des umschließenden Ausdrucks — nützlich, um Wiederholung und Fehlerquellen bei komplexen Formeln zu vermeiden.

```abap
DATA(result) = VALUE #(
  LET tax_rate = '0.19' IN
  FOR line IN order_items
  ( product     = line-product
    net_price   = line-price
    gross_price = line-price * ( 1 + tax_rate ) )
).
```

> **Tipp:** LET-Ausdrücke wirken zunächst wie syntaktischer Zucker, verhindern aber echte Wiederholungsfehler bei Formeln, die mehrfach im selben Ausdruck gebraucht werden — ein Detail, das in Code Reviews erfahrener Teams schnell aufwertet, wenn es sauber genutzt wird.

## Kontrollfragen

**1. Wozu dient LET innerhalb eines Ausdrucks?**

- [ ] Definiert eine globale Konstante
- [x] Definiert eine lokale Hilfsvariable, gültig nur innerhalb dieses Ausdrucks
- [ ] Deklariert eine neue Tabelle

*Erklärung:* LET ... IN macht Zwischenwerte innerhalb eines VALUE/REDUCE/COND-Ausdrucks wiederverwendbar.

**2. Welches Konstrukt baut aus einer Tabelle eine neue Tabelle mit transformierten Zeilen auf?**

- [ ] FILTER #( ... )
- [x] VALUE #( FOR ... IN ... ( ... ) )
- [ ] COND #( ... )

*Erklärung:* VALUE mit FOR-Iteration transformiert jede Zeile der Quelltabelle in eine neue Zielzeile.
