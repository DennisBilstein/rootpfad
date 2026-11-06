# Embedded Steampunk, Steampunk & Side-by-Side im Vergleich

*ABAP Cloud, BTP & Extensibility-Strategie · ca. 7 Min.*

**Steampunk** (offiziell: SAP BTP ABAP Environment) ist ABAP als vollständig separates Cloud-System auf der BTP — für komplett neue, von S/4HANA unabhängige Apps. **Embedded Steampunk** bedeutet ABAP-Cloud-Entwicklung DIREKT im S/4HANA-System selbst, mit denselben Restriktionen wie Steampunk — heute der übliche Weg für Erweiterungen am Kernsystem. **Side-by-Side-Extensibility** nutzt dagegen typischerweise andere BTP-Dienste (z. B. CAP/Node.js/Java) statt ABAP.

| Variante | Ort der Ausführung | Einsatzzweck |
| --- | --- | --- |
| Steampunk | Eigenständiges BTP-System | Komplett neue, unabhängige Apps |
| Embedded Steampunk | Im S/4HANA-Kernsystem | Cloud-konforme Erweiterung des Kerns |
| Side-by-Side | Separater BTP-Dienst (oft nicht-ABAP) | Stark individuelle Logik, entkoppelt vom Kern |

> **Tipp:** Die Terminologie verwirrt viele Einsteiger: "Steampunk" bezeichnete ursprünglich nur die eigenständige BTP-Umgebung; "Embedded Steampunk" ist die genauso restriktive, aber ins Kernsystem eingebettete Variante — heute der mit Abstand häufigste Einstiegspunkt für neue ABAP-Cloud-Entwickler in Unternehmen mit bestehendem S/4HANA.

## Kontrollfragen

**1. Was bedeutet "Embedded Steampunk"?**

- [x] ABAP-Cloud-Entwicklung mit denselben Restriktionen wie Steampunk, aber eingebettet im S/4HANA-Kernsystem
- [ ] Ein veraltetes ABAP-Dialekt
- [ ] Ein reines Frontend-Framework

*Erklärung:* Embedded Steampunk bringt die Cloud-Restriktionen direkt ins bestehende S/4HANA-System.

**2. Wann ist reines Steampunk (SAP BTP ABAP Environment) die richtige Wahl?**

- [x] Für komplett neue, von S/4HANA unabhängige Apps auf der BTP
- [ ] Nur für klassische Reports
- [ ] Nie, es ist veraltet

*Erklärung:* Steampunk eignet sich für eigenständige, vom Kernsystem unabhängige Cloud-Anwendungen.
