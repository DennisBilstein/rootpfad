# Entity-Relationship-Modell: Entitäten & Kardinalitäten

*Datenmodellierung: ER-Modell & Normalisierung · ca. 7 Min.*

Das **ER-Modell** (nach Chen) beschreibt die Fachlichkeit unabhängig von der späteren technischen Umsetzung. Eine **Entität** ist ein Ding von Interesse (Kunde, Bestellung), **Attribute** beschreiben sie, **Beziehungen** verbinden Entitäten miteinander.

**Kardinalitäten** (1:1, 1:n, n:m) beschreiben, wie viele Instanzen einer Entität mit wie vielen der anderen verknüpft sein dürfen:

*ER-Diagramm:* Kunde — 1 : ngibt auf — Bestellung

*ER-Diagramm:* Bestellung — n : menthält — Produkt

Eine **n:m-Beziehung** lässt sich nicht direkt in zwei Tabellen abbilden — bei der Umsetzung entsteht immer eine eigene **Verknüpfungstabelle** (hier: Bestellposition) mit Fremdschlüsseln zu beiden Seiten.

> **Tipp:** Die AP1 fragt Kardinalitäten gerne über ein konkretes Mini-Szenario ab ("Ein Kunde kann mehrere Bestellungen aufgeben, eine Bestellung gehört zu genau einem Kunden — welche Kardinalität?"). Lies das Szenario in beide Richtungen: "wie viele B pro A" UND "wie viele A pro B".

## Kontrollfragen

**1. Wie wird eine n:m-Beziehung bei der Tabellenumsetzung aufgelöst?**

- [ ] Gar nicht, n:m ist technisch nicht möglich
- [x] Über eine eigene Verknüpfungstabelle mit Fremdschlüsseln zu beiden Seiten
- [ ] Durch Duplizieren aller Felder in beide Tabellen

*Erklärung:* Die Verknüpfungstabelle trägt die Fremdschlüssel beider Entitäten und bildet damit die n:m-Beziehung ab.

**2. Was beschreibt eine Kardinalität?**

- [ ] Die Anzahl der Attribute einer Entität
- [x] Wie viele Instanzen einer Entität mit wie vielen einer anderen verknüpft sein dürfen
- [ ] Den Datentyp eines Attributs

*Erklärung:* Kardinalitäten (1:1, 1:n, n:m) regeln die zulässige Anzahl verknüpfter Instanzen auf beiden Seiten der Beziehung.
