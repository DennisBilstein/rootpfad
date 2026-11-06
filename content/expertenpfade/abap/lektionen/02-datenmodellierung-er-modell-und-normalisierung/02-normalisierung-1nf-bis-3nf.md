# Normalisierung 1NF bis 3NF

*Datenmodellierung: ER-Modell & Normalisierung · ca. 9 Min.*

Normalisierung reduziert Redundanz und verhindert **Anomalien** (Einfüge-, Änderungs-, Löschanomalien).

| Normalform | Bedingung |
| --- | --- |
| 1NF | Nur atomare Werte, keine Wiederholungsgruppen |
| 2NF | 1NF + jedes Nicht-Schlüsselattribut hängt *voll* vom gesamten (ggf. zusammengesetzten) Primärschlüssel ab |
| 3NF | 2NF + keine transitiven Abhängigkeiten (Nicht-Schlüsselattribut hängt nicht von einem anderen Nicht-Schlüsselattribut ab) |

**Beispiel:** Eine Tabelle „Bestellung" mit Spalten `kunde_name`, `kunde_adresse`, `produkt1`, `produkt2` verstößt gegen 1NF (Wiederholungsgruppe) und speichert `kunde_adresse` redundant (abhängig vom Kunden, nicht der Bestellung — Verstoß gegen 3NF, sobald Kunde ein eigener Schlüssel wird). Normalisiert: eigene Tabellen für Kunde, Bestellung und Bestellposition.

> **Tipp:** In der Praxis wird bewusst GEGEN 3NF verstoßen ("denormalisiert") — etwa in CDS-Analytics-Views oder Reporting-Tabellen, um Lesezugriffe zu beschleunigen. Das ist kein Fehler, sondern eine bewusste, begründbare Performance-Entscheidung — in der Prüfung ist aber die "reine Lehre" gefragt.

## Kontrollfragen

**1. Was verhindert speziell die 2NF?**

- [ ] Transitive Abhängigkeiten
- [x] Teilabhängigkeiten von einem zusammengesetzten Schlüssel
- [ ] Nicht-atomare Werte

*Erklärung:* 2NF fordert volle funktionale Abhängigkeit vom gesamten Primärschlüssel — keine Teilabhängigkeit von nur einem Teil eines zusammengesetzten Schlüssels.

**2. Was ist eine transitive Abhängigkeit (relevant für 3NF)?**

- [ ] Ein Attribut hängt vom Primärschlüssel ab
- [x] Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut statt direkt vom Schlüssel ab
- [ ] Zwei Tabellen referenzieren sich gegenseitig

*Erklärung:* 3NF verbietet genau diese indirekte Abhängigkeit über ein anderes Nicht-Schlüsselattribut.
