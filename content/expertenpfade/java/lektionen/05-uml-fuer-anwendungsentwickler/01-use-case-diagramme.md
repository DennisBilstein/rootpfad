# Use-Case-Diagramme

*UML für Anwendungsentwickler · ca. 6 Min.*

Ein Use-Case-Diagramm zeigt **Akteure** (außerhalb der Systemgrenze) und **Anwendungsfälle** (Ellipsen innerhalb), verbunden durch Assoziationen. Die Systemgrenze ist ein Rechteck um alle Use Cases.

-   `<<include>>` — ein immer mit ausgeführter Teilanwendungsfall.
-   `<<extend>>` — ein optionaler, nur unter Bedingung ausgeführter Fall.
-   **Generalisierung** zwischen Akteuren: Ein „Administrator" kann alles, was ein „Benutzer" kann, und mehr.

> **Tipp:** Die verlässlichste Unterscheidung: Bei <\> ist der eingebundene Fall Pflichtbestandteil des Basisfalls („Bestellung aufgeben" schließt „Zahlung prüfen" immer ein). Bei <\> ist es eine Erweiterung, die nur manchmal greift („Gutschein einlösen"). Die Pfeilrichtung zeigt in beiden Fällen zum eingebundenen beziehungsweise erweiterten Fall — merken musst du dir die Verbindlichkeit, nicht die Grafik.

## Kontrollfragen

**1. Was kennzeichnet <<include>>?**

- [ ] Einen optionalen Anwendungsfall
- [x] Einen immer mit ausgeführten Teilanwendungsfall
- [ ] Eine Vererbung zwischen Akteuren

*Erklärung:* Der eingebundene Fall ist fester Bestandteil des Basisfalls.

**2. Wo stehen Akteure im Use-Case-Diagramm?**

- [ ] Innerhalb der Systemgrenze
- [x] Außerhalb der Systemgrenze
- [ ] Es gibt keine Systemgrenze

*Erklärung:* Akteure sind per Definition außerhalb des betrachteten Systems.
