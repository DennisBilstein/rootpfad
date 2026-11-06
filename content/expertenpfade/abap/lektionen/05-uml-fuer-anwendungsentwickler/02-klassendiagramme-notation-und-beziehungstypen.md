# Klassendiagramme: Notation & Beziehungstypen

*UML für Anwendungsentwickler · ca. 9 Min.*

Eine Klasse wird als Rechteck mit drei Feldern dargestellt: Klassenname, Attribute, Methoden. Sichtbarkeiten: `+` public, `-` private, `#` protected — entspricht ABAPs PUBLIC/PRIVATE/PROTECTED SECTION.

| UML-Beziehung | Notation | ABAP-Äquivalent |
| --- | --- | --- |
| Assoziation | Einfache Linie | Referenz-Attribut ("kennt") |
| Aggregation | Offene Raute | "hat-ein", Teile unabhängig existenzfähig |
| Komposition | Gefüllte Raute | "hat-ein", Teile existenzabhängig vom Ganzen |
| Vererbung (Generalisierung) | Pfeil, geschlossene Spitze | INHERITING FROM |
| Realisierung | Gestrichelter Pfeil, geschlossene Spitze | INTERFACES |

> **Tipp:** Komposition vs. Aggregation ist der häufigste Stolperstein: Bei Komposition stirbt der Teil mit dem Ganzen (ein "Bestellposition"-Objekt existiert nicht ohne seine "Bestellung"), bei Aggregation kann der Teil unabhängig weiterexistieren (ein "Mitarbeiter" existiert auch ohne seine "Abteilung").

## Kontrollfragen

**1. Welche UML-Beziehung entspricht in ABAP INHERITING FROM?**

- [ ] Aggregation
- [x] Vererbung (Generalisierung)
- [ ] Assoziation

*Erklärung:* Vererbung wird in UML als Pfeil mit geschlossener Spitze dargestellt, in ABAP über INHERITING FROM umgesetzt.

**2. Was unterscheidet Komposition von Aggregation?**

- [ ] Kein Unterschied, nur andere Symbole
- [x] Bei Komposition ist der Teil existenzabhängig vom Ganzen, bei Aggregation nicht
- [ ] Komposition erlaubt keine Attribute

*Erklärung:* Die Existenzabhängigkeit ist das entscheidende Unterscheidungsmerkmal zwischen beiden "hat-ein"-Beziehungen.
