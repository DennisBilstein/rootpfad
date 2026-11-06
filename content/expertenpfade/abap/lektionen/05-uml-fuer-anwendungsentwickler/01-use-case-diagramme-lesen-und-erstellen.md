# Use-Case-Diagramme lesen und erstellen

*UML für Anwendungsentwickler · ca. 6 Min.*

Ein Use-Case-Diagramm zeigt **Akteure** (außerhalb der Systemgrenze) und **Anwendungsfälle** (Ellipsen, innerhalb der Systemgrenze), verbunden durch Assoziationslinien. Die Systemgrenze wird als Rechteck um alle Use Cases gezeichnet.

-   `<<include>>` — bindet einen immer mit ausgeführten Teilanwendungsfall ein (z. B. "Bestellung aufgeben" includes "Zahlung prüfen").
-   `<<extend>>` — bindet einen optionalen, bedingt ausgeführten Anwendungsfall ein (z. B. "Bestellung aufgeben" extend "Gutschein einlösen").

> **Tipp:** Verwechslungsgefahr: <\> ist verpflichtend und wird vom Basis-Use-Case aus "aufgerufen"; <\> ist optional und wird vom erweiternden Use-Case aus auf den Basis-Use-Case "draufgesetzt". Die Pfeilrichtung ist bei beiden meist zum eingebundenen Use Case hin — der Unterschied liegt in der Verbindlichkeit.

## Kontrollfragen

**1. Was verbindet <<include>> zwischen zwei Use Cases?**

- [ ] Ein optionaler Teilanwendungsfall
- [x] Ein immer mit ausgeführter Teilanwendungsfall
- [ ] Eine Vererbungsbeziehung

*Erklärung:* <<include>> markiert einen zwingend mit ausgeführten Bestandteil des Basis-Use-Case.

**2. Wo werden Akteure in einem Use-Case-Diagramm platziert?**

- [ ] Innerhalb der Systemgrenze
- [x] Außerhalb der Systemgrenze
- [ ] Es gibt keine Systemgrenze

*Erklärung:* Akteure stehen außerhalb des Systemrechtecks und interagieren von dort mit den Use Cases.
