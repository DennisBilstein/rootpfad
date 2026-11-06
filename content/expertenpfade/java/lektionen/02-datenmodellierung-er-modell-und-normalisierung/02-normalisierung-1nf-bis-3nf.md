# Normalisierung 1NF bis 3NF

*Datenmodellierung: ER-Modell & Normalisierung · ca. 9 Min.*

Normalisierung reduziert Redundanz und verhindert **Anomalien** beim Einfügen, Ändern und Löschen.

| Normalform | Bedingung |
| --- | --- |
| 1NF | Nur atomare Werte, keine Wiederholungsgruppen |
| 2NF | 1NF + jedes Nicht-Schlüsselattribut hängt vom *gesamten* Schlüssel ab |
| 3NF | 2NF + keine transitiven Abhängigkeiten zwischen Nicht-Schlüsselattributen |

**Beispiel:** Eine Tabelle `Bestellung(BestellNr, Position, Produktname, Kundenname, Kundenort)` verstößt doppelt: Produktname hängt nur von der Position ab (2NF), Kundenort hängt vom Kundennamen statt vom Schlüssel ab (3NF). Normalisiert entstehen drei Tabellen: Kunde, Bestellung, Bestellposition.

> **Tipp:** In der Praxis wird bewusst denormalisiert, etwa in Reporting-Tabellen oder Caches, um Lesezugriffe zu beschleunigen. Das ist kein Fehler, sondern eine begründbare Abwägung. In der Prüfung ist aber die reine Lehre gefragt — dort normalisierst du bis zur 3NF.

## Kontrollfragen

**1. Was verhindert die 2NF?**

- [ ] Nicht-atomare Werte
- [x] Teilabhängigkeiten von einem zusammengesetzten Schlüssel
- [ ] Transitive Abhängigkeiten

*Erklärung:* 2NF fordert volle funktionale Abhängigkeit vom gesamten Primärschlüssel.

**2. Was ist eine transitive Abhängigkeit?**

- [ ] Ein Attribut hängt direkt vom Schlüssel ab
- [x] Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut ab
- [ ] Zwei Tabellen verweisen aufeinander

*Erklärung:* Genau diese indirekte Abhängigkeit verbietet die 3NF.
