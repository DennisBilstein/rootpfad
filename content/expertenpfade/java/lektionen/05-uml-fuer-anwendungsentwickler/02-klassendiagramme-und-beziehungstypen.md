# Klassendiagramme & Beziehungstypen

*UML für Anwendungsentwickler · ca. 9 Min.*

Eine Klasse erscheint als Rechteck mit drei Feldern: Name, Attribute, Methoden. Sichtbarkeiten: `+` public, `-` private, `#` protected, `~` package-private — eine exakte Entsprechung zu Javas Modifikatoren.

| UML-Beziehung | Notation | Java |
| --- | --- | --- |
| Assoziation | Linie | Feld mit Referenz auf andere Klasse |
| Aggregation | Offene Raute | „hat-ein", Teil lebt unabhängig weiter |
| Komposition | Gefüllte Raute | „hat-ein", Teil stirbt mit dem Ganzen |
| Generalisierung | Pfeil, geschlossene Spitze | extends |
| Realisierung | Gestrichelter Pfeil | implements |

Zusätzlich stehen an den Enden **Multiplizitäten**: `1`, `0..1`, `1..*`, `*`.

> **Tipp:** Komposition versus Aggregation ist der häufigste Stolperstein. Prüfe die Existenzfrage: Kann der Teil sinnvoll ohne das Ganze weiterexistieren? Eine Bestellposition ohne Bestellung ergibt keinen Sinn — Komposition. Ein Mitarbeiter ohne Abteilung schon — Aggregation.

## Kontrollfragen

**1. Welche UML-Beziehung entspricht "implements" in Java?**

- [ ] Generalisierung
- [x] Realisierung
- [ ] Komposition

*Erklärung:* Die Realisierung wird als gestrichelter Pfeil mit geschlossener Spitze gezeichnet.

**2. Was bedeutet die Multiplizität 1..* ?**

- [ ] Genau eins
- [x] Mindestens eins, nach oben offen
- [ ] Höchstens eins

*Erklärung:* Der Stern steht für eine unbegrenzte Obergrenze.
