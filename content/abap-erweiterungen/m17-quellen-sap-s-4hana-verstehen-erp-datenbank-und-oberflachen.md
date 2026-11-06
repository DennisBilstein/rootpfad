# SAP S/4HANA verstehen: ERP, Datenbank und Oberflächen

Modul: abap-m17 · 15 Minuten

SAP S/4HANA ist ein ERP-System für zusammenhängende Geschäftsprozesse. SAP HANA ist die zugrunde liegende Datenbanktechnologie. SAP GUI und SAP Fiori bezeichnen Zugangs- und Oberflächenwelten, während ADT die Entwicklungswerkzeuge in Eclipse bereitstellt. Diese Begriffe sind keine austauschbaren Produktnamen.

Beispiel: Ein Auftrag wird fachlich im Anwendungssystem verarbeitet. Die Geschäftslogik prüft Regeln und Berechtigungen; die Datenbank speichert die Daten. Eine Fiori-App konsumiert einen dafür bereitgestellten Service. Dass ein Feld auf einer Seite verborgen ist, ersetzt deshalb keine Berechtigungsprüfung im Backend.

Die konkrete Edition, das Release, die Sprachversion und freigegebene APIs bestimmen, welche Erweiterungen möglich sind. Eine Anleitung für ein klassisches On-premise-System lässt sich nicht unverändert auf die Public Cloud übertragen. Auch ein vorhandener SAP-GUI-Zugang bedeutet nicht, dass eigene Entwicklung oder Debugging erlaubt ist.

Übung: Zeichne für die Änderung einer Auftragsbeschreibung vier Ebenen: Oberfläche, Service, Geschäftslogik und Datenhaltung. Markiere, wo du einen Fehler suchen würdest, wenn der Service eine fachliche Ablehnung meldet. Schreibe anschließend Edition, Release, Entwicklungsberechtigung und erlaubte APIs auf, die du vor einer praktischen Umsetzung klären musst.

## Kontrollfragen

### Welche Zuordnung ist richtig?

- [ ] HANA ist der Eclipse-Editor
- [x] S/4HANA ist das ERP-System; HANA ist die Datenbanktechnologie
- [ ] Fiori ist die ABAP-Sprachversion

ERP, Datenbank, Oberfläche und Entwicklungswerkzeug haben unterschiedliche Aufgaben.

### Warum muss vor einer Erweiterung die Systemedition geklärt werden?

- [ ] Weil alle Editionen dieselben Erweiterungsrechte haben
- [ ] Nur für die Farbe der Oberfläche
- [x] Weil Entwicklungsmodell, verfügbare APIs und Zugriffswege variieren

Edition und Release bestimmen unterstützte Erweiterungs- und Entwicklungsoptionen.

## Quellen und Zugang

- [SAP Learning: Understanding SAP GUI](https://learning.sap.com/courses/project-logistics-control-in-sap-s-4hana/understanding-sap-gui): Text frei gelesen; SAP GUI und SAP Logon sind Frontendzugänge. Reale Anmeldung braucht Systemzugang. Verlinkte Simulation nicht separat getestet.
- [SAP Learning: Introduction to SAP S/4HANA](https://learning.sap.com/courses/business-processes-in-sap-s-4hana-portfolio-and-project-management/introduction-to-sap-s-4hana): Öffentlich gelesen; für die stabile Unterscheidung ERP, Datenbank und Oberfläche geeignet. Enthält ältere Marketing- und Releaseaussagen, die nicht als aktuelle Detailreferenz übernommen werden.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
