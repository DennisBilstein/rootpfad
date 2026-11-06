# Entity-Relationship-Modell & Kardinalitäten

*Datenmodellierung: ER-Modell & Normalisierung · ca. 7 Min.*

Das **ER-Modell** beschreibt die Fachlichkeit unabhängig von der technischen Umsetzung. Eine **Entität** ist ein Ding von Interesse, **Attribute** beschreiben sie, **Beziehungen** verbinden sie.

**Kardinalitäten** legen fest, wie viele Instanzen verknüpft sein dürfen:

*ER-Diagramm:* Kunde — 1 : ngibt auf — Bestellung

*ER-Diagramm:* Bestellung — n : menthält — Produkt

Eine **n:m-Beziehung** lässt sich nicht direkt in zwei Tabellen abbilden — es entsteht immer eine **Verknüpfungstabelle** (hier: Bestellposition) mit Fremdschlüsseln zu beiden Seiten. In Java entspricht das später einer eigenen Entity-Klasse, nicht nur einer Liste.

> **Tipp:** Lies Szenarien in der Prüfung immer in beide Richtungen: „Wie viele Bestellungen pro Kunde?" UND „Wie viele Kunden pro Bestellung?" Erst beide Antworten zusammen ergeben die Kardinalität.

## Kontrollfragen

**1. Wie wird eine n:m-Beziehung bei der Tabellenumsetzung aufgelöst?**

- [ ] Gar nicht, sie ist nicht umsetzbar
- [x] Über eine Verknüpfungstabelle mit Fremdschlüsseln zu beiden Seiten
- [ ] Durch Duplizieren aller Felder

*Erklärung:* Die Verknüpfungstabelle trägt beide Fremdschlüssel und oft zusätzliche Attribute wie Menge oder Preis.

**2. Was ist ein Fremdschlüssel?**

- [ ] Ein verschlüsseltes Feld
- [x] Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist
- [ ] Ein zufällig erzeugter Wert

*Erklärung:* Der Fremdschlüssel setzt die referenzielle Integrität einer Beziehung technisch um.
