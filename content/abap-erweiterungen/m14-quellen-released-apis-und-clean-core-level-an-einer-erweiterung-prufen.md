# Released APIs und Clean-Core-Level an einer Erweiterung prüfen

Modul: abap-m14 · 30 Minuten

Ein technisch sichtbares SAP-Objekt ist noch keine freigegebene API. In ABAP for Cloud Development müssen verwendete SAP-Objekte für den vorgesehenen Gebrauch freigegeben sein. Prüfe deshalb den API-Status im Zielsystem, den erlaubten Verwendungszweck und die verfügbare Version. Eine lokal nutzbare CDS-Entität ist nicht automatisch eine Remote-API, und eine Freigabe für Erweiterung ist nicht automatisch eine allgemeine Nutzungserlaubnis.

Für November 2026 ist eine wichtige Begriffskorrektur nötig: SAP Learning beschreibt das frühere 3-Tier-Modell inzwischen als abgelöst und erläutert Clean-Core-Level A bis D. A steht für freigegebene APIs und geeignete Erweiterungstechniken, B für von SAP entsprechend eingeordnete klassische APIs, C für interne Objekte und D für nicht empfohlene Objekte oder Muster. Diese Risikoeinordnung für bestehende Erweiterungen lockert nicht die Sprach- und API-Regeln eines ABAP-Cloud-Pakets.

Beispiel: Eine Anwendung soll Bestelldaten anzeigen. Du findest eine freigegebene CDS-API und eine interne Tabelle mit scheinbar praktischeren Feldern. Entscheide nicht allein nach weniger Code: Prüfe zuerst, ob die freigegebene API den Bedarf erfüllt. Ein kundeneigener Wrapper um eine interne Abhängigkeit kann zwar eine lokale Schnittstelle schaffen, beseitigt aber nicht die Upgrade-Abhängigkeit innerhalb des Wrappers. Auch eine Side-by-side-App wird nicht automatisch sauber, wenn sie sich auf instabile Remote-Schnittstellen stützt.

Praxisauftrag: Lege für drei mögliche Datenzugriffe ein API-Prüfblatt an. Dokumentiere Objektname, Edition/Release, Freigabestatus, lokalen oder Remote-Vertrag, fachliche Abdeckung und offene Risiken. Nutze das Beispiel unten als Vorlage und trage echte Namen erst nach Prüfung im verfügbaren System ein. Ist kein System vorhanden, bearbeite die Entscheidung mit fiktiven Kandidaten und kennzeichne sie ausdrücklich als Annahmen. Öffentliche SAP-Lerntexte sind kostenlos lesbar; das ist keine Zusage einer kostenlosen S/4HANA- oder BTP-Laufzeit.

```text
API-Prüfblatt für die Bestellübersicht
1. Kandidat: <im Zielsystem ermitteltes Objekt>
2. System: <Edition und Release>
3. Nutzung: lokal lesen / erweitern / remote konsumieren
4. Freigabe für genau diese Nutzung: ja / nein / ungeprüft
5. Fachliche Lücke: <fehlende Felder oder Funktionen>
6. Abhängigkeiten: <auch innerhalb eigener Wrapper prüfen>
7. Entscheidung und Verantwortliche: <Begründung dokumentieren>
```

## Kontrollfragen

### Was beweist die Sichtbarkeit einer SAP-Klasse in ADT?

- [ ] Dass sie für jede Cloud-Nutzung freigegeben ist
- [x] Nur ihre technische Auffindbarkeit, nicht automatisch die passende Freigabe
- [ ] Dass sie auch als Remote-API angeboten wird

Die Freigabe muss für den vorgesehenen Gebrauch und die konkrete Systemversion geprüft werden.

### Wie wird das frühere 3-Tier-Modell in der geprüften aktuellen SAP-Learning-Lektion eingeordnet?

- [x] Als abgelöst zugunsten des Clean-Core-Level-Konzepts
- [ ] Als einzig erlaubte aktuelle Klassifikation
- [ ] Als Produktpreisstaffel

Die Quelle nennt das frühere Modell sunset und erläutert die Level A bis D.

### Was passiert mit der internen Abhängigkeit eines Wrappers?

- [ ] Sie wird durch den Klassennamen entfernt
- [ ] Sie wird automatisch von SAP freigegeben
- [x] Sie bleibt zu bewerten und bei Upgrades zu berücksichtigen

Die äußere Schnittstelle kann stabil gestaltet werden; das interne Upgrade-Risiko verschwindet dadurch nicht.

## Quellen und Zugang

- [SAP Learning: Exploring Clean Core Extensibility Best Practices](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-extensibility-model-best-practices_e290f382-800e-40ef-a203-85a13115f487): Frei lesbarer Volltext geprüft; enthält 2026 Level A–D und Ablösung des 3-Tier-Modells.
- [SAP Help: ABAP Cloud Development Model](https://help.sap.com/docs/abap-cloud/abap-cloud/abap-cloud-in-nutshell): Öffentliche Dokumentation; Help-SPA nicht vollständig per Fetch auslesbar, ergänzend offizieller Suchindextext geprüft.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
