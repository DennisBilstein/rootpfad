# RAP-Erweiterbarkeit: In-App vs. Side-by-Side

*RAP Expertenwissen · ca. 7 Min.*

**In-App-Extensibility** erweitert ein bestehendes RAP-Business-Object direkt im selben System (Custom Fields, Extend Views, freigegebene BAdIs). **Side-by-Side-Extensibility** baut eine komplett separate App auf der SAP BTP, die über freigegebene APIs/Business Events mit dem Kernsystem kommuniziert — empfohlen für stark individuelle Logik, die die Upgradefähigkeit des Kernsystems nicht gefährden soll.

**RAP Business Events** (z. B. „Bestellung freigegeben") ermöglichen es Side-by-Side-Apps, asynchron auf Änderungen im Kernsystem zu reagieren, ohne eng gekoppelt zu sein.

> **Tipp:** Die Entscheidung In-App vs. Side-by-Side ist selten rein technisch, sondern eine Architekturentscheidung mit Governance-Charakter: wie viel individuelle Logik darf das Kernsystem tragen, bevor sie zukünftige Upgrades gefährdet? Erfahrene Architekten denken diese Frage von Anfang an mit.

## Kontrollfragen

**1. Was ist ein Kennzeichen von Side-by-Side-Extensibility?**

- [ ] Code direkt im Kernsystem ändern
- [x] Eine separate App auf der BTP, angebunden über freigegebene APIs/Business Events
- [ ] Ein BAdI im Standardnamensraum

*Erklärung:* Side-by-Side hält individuelle Logik bewusst außerhalb des Kernsystems.

**2. Wozu dienen RAP Business Events?**

- [x] Asynchrone, lose gekoppelte Reaktion externer Apps auf Ereignisse im Kernsystem
- [ ] Synchrone Blockierung aller Nutzer bei einer Änderung
- [ ] Ersatz für die Berechtigungsprüfung

*Erklärung:* Business Events entkoppeln Kernsystem und erweiternde Apps zeitlich und technisch.
