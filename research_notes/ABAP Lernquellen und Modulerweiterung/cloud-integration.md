# ABAP Cloud, Clean Core, Git und Integration – Quellenprüfung November 2026

## Welche Cloud- und Erweiterungskonzepte sollen vermittelt werden?

### Takeaway
ABAP Cloud ist ein Entwicklungsmodell, SAP BTP ABAP Environment eine Laufzeit und RAP ein transaktionelles Programmiermodell. Clean Core ist nicht mit „alles muss auf BTP laufen“ gleichzusetzen; freigegebene Erweiterungspunkte und APIs sind sowohl on-stack als auch side-by-side relevant.

### Cited Findings
- SAP beschreibt BTP ABAP Environment als ABAP-PaaS, einschließlich HANA-Datenbank und Entwicklung mit ADT/RAP. Side-by-side läuft außerhalb von S/4HANA und greift über Remote-APIs zu; ABAP Cloud ist nicht auf diese BTP-Laufzeit begrenzt. Die Seite wurde vollständig öffentlich abgerufen. — [SAP Learning: Side-by-Side](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-side-by-side-extensibility_a01bb1ac-1acb-434d-8458-7a36cf2bcb3b)
- On-stack Developer Extensibility adressiert unter anderem komplexen lokalen Datenzugriff und Erweiterungen innerhalb derselben LUW. SAP muss die jeweiligen RAP-Erweiterungen/BAdIs ausdrücklich ermöglichen; daraus folgt keine Erlaubnis für beliebige SAP-Tabellenzugriffe. Volltext öffentlich abgerufen. — [SAP Learning: Developer Extensibility](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-developer-extensibility_f2683861-d69e-4a59-9e3e-01e3cc20fb0f)
- ABAP Cloud ist seit S/4HANA 2022 auch in Private Edition und on-premise nutzbar. Diese Landschaften müssen häufig klassische Erweiterungen und ABAP Cloud parallel betreiben. Help-Seite tatsächlich angefragt, aber Fetch lieferte keinen Artikeltext; Aussage zusätzlich durch den indexierten offiziellen Help-Text und SAP Learning abgesichert. — [SAP Help: Clean Core und ABAP-Erweiterungen](https://help.sap.com/docs/abap-cloud/developer-guide-from-classic-abap-to-abap-cloud/clean-core-extensibility-and-abap-based-extensions)
- RAP ist ein wesentlicher Bestandteil von ABAP Cloud, aber nicht mit dessen gesamtem Umfang identisch. Cloud-ABAP verwendet eine cloudoptimierte Sprachversion und freigegebene APIs; die Dokumentation unterscheidet klassische Entwicklungsumgebungen mit wählbarer Sprachversion. Die Help-URLs wurden tatsächlich abgerufen, lieferten jedoch nur SPA-Gerüst/keinen Volltext; die Aussagen stehen in indexierten offiziellen Help-Texten. — [SAP Help: ABAP Cloud Development Model](https://help.sap.com/docs/abap-cloud/abap-cloud/abap-cloud-in-nutshell), [SAP Help: RAP](https://help.sap.com/docs/abap-cloud/abap-rap/abap-restful-application-programming-model)
- **Wichtige Aktualisierung 2026:** Die vollständig abgerufene SAP-Learning-Lektion bezeichnet das frühere 3-Tier-Modell ausdrücklich als „Now Sunset“ und erläutert stattdessen Clean-Core-Level A–D: Released APIs, Classic APIs, Internal Objects, Not Recommended. Ein Wrapper macht eine interne Abhängigkeit nicht automatisch risikolos. Level-A-On-stack und Side-by-side sind beide möglich; Portabilität zwischen S/4-Editionen ist nicht garantiert. — [SAP Learning: Clean Core Best Practices](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-extensibility-model-best-practices_e290f382-800e-40ef-a203-85a13115f487)

### Inferences
- Didaktik: zwei neue Lektionen in `abap-m14`: Begriffs-/Architekturentscheidung und API-/Clean-Core-Prüfung. Die praktische Architekturaufgabe kann ohne bezahltes System bearbeitet werden; Systemübungen sind ausdrücklich optional.
- Versions-/Editionsangaben müssen Bestandteil jeder Architekturentscheidung sein. „Public Edition = beliebige klassische Erweiterungen“ und „RAP = nur BTP“ sind als typische Fehlannahmen zu prüfen.

### Gaps
- Keine vollständige Featurematrix aller aktuellen S/4-Releases geprüft. Public-Edition-Developer-Extensibility hängt unter anderem von der geeigneten 3-System-Landschaft ab; kein pauschales Verfügbarkeitsversprechen für jeden Tenant.
- Die Help-SPA war mit dem Fetch-Werkzeug nicht vollständig auslesbar. Daher tragen die erfolgreich abgerufenen Learning-Volltexte die ausführlichen Architektur- und Clean-Core-Aussagen.

## Wie werden Git, HTTP/JSON und OData korrekt und praktisch vermittelt?

### Takeaway
Git ist nicht automatisch ein Produktionsimport. Kommunikationskonfiguration, HTTP-Status, Datenabbildung und OData-Metadaten gehören in getrennte, aufeinander aufbauende Übungen.

### Cited Findings
- SAPs aktuelle BTP-Dokumentation empfiehlt gCTS/Manage Software Components für DEV→TEST→PROD innerhalb eines Global Accounts und abapGit für Quellcode-Import/-Export zwischen Entwicklungssystemen, auch accountübergreifend. Diese Aussagen gelten speziell für die dokumentierte BTP-ABAP-Landschaft, nicht pauschal für alle klassischen gCTS-Installationen. GitHub-Volltext abgerufen. — [SAP-docs: Transport Mechanisms](https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/30-development/transport-mechanisms-aa7f169.md)
- SAP beschreibt Serialisierung von ABAP-Objekten in Dateien, Code Reviews und die Kombination von Transporten und Git. Der Leitfaden enthält auch ältere Beispiele; heutige Release-/Objektverfügbarkeit ist im Zielsystem zu prüfen. Raw-Volltext abgerufen. — [SAP/styleguides: ABAP Code Reviews](https://github.com/SAP/styleguides/blob/main/abap-code-review/ABAPCodeReview.md)
- Das offizielle gCTS-Beispiel wurde beim Abruf nach SAP-archive umgeleitet und als seit **16. Juni 2026 archiviert** angezeigt. Nicht als aktiv gepflegtes Einstiegsprojekt empfehlen. Seine Mindestanforderung S/4HANA 2020 SPS2 gilt für dieses Beispiel, nicht als generelle gCTS-Mindestversion. — [SAP-archive/s4hana-gcts](https://github.com/SAP-archive/s4hana-gcts/blob/main/README.md)
- Der öffentlich abrufbare REST-/JSON-Leitfaden verwendet Outbound Service, Communication Scenario, Communication System und Communication Arrangement sowie `CL_HTTP_DESTINATION_PROVIDER`, `CL_WEB_HTTP_CLIENT_MANAGER` und XCO JSON. Er sagt ausdrücklich: **cannot be completed on a trial account**. Anleitung ist frei lesbar, ausführbare Umgebung ist nicht automatisch kostenlos. Volltext abgerufen. — [SAP Developers: External API](https://developers.sap.com/tutorials/abap-environment-external-api/)
- Die OData-Anleitung erzeugt ein Service Consumption Model aus EDMX/$metadata einschließlich ETag-Unterstützung. Sie ist Teil einer Mission mit zwei ABAP-Systemen und ausdrücklich nicht auf Trial und nicht allein ausführbar. Volltext abgerufen. — [SAP Developers: Service Consumption Model](https://developers.sap.com/tutorials/abap-environment-create-service-consumption-model/)

### Inferences
- Eine neue Lektion für `abap-m16`, zwei für `abap-m19`: Git-Review/Transport, HTTP/JSON, OData-Metadaten/Proxy. Beispiele sind eigenständige Lehrbeispiele, kein großflächig übernommener Tutorial-Code.
- HTTP-Demo sollte nach Nicht-2xx sofort abbrechen; sonst wird etwa eine HTML-Fehlerseite als JSON behandelt. Übungsbetrieb mit statischen JSON-Daten muss als kostenfreier Ersatz angeboten werden, nicht als Beweis funktionierender Netzkommunikation.

### Gaps
- Kein ABAP-Systemzugriff: Code wurde nicht aktiviert/ausgeführt. ABAP-Beispiele sind als Lehrfragmente gekennzeichnet; Destinationen, Berechtigungen und generierte Proxy-Typen müssen im passenden System ergänzt werden.
- Keine Aussage, dass abapGit und gCTS dasselbe Repositoryformat verwenden. BTP-Manage-Software-Components-Regeln dürfen nicht auf alle On-premise-Transportprodukte übertragen werden.

## Was ist kostenlos und was erfordert Laufzeit, Entitlements oder Vertrag?

### Takeaway
Öffentlich lesbares Lernmaterial, BTP Trial, Free-Tier-Plan und produktiver Vertrag sind vier verschiedene Dinge. Verfügbarkeit und Kosten müssen vor jeder praktischen Provisionierung erneut geprüft werden.

### Cited Findings
- SAPs öffentliches ABAP-Trial-Onboarding beschreibt einen Booster für einen Trial-Benutzer und verweist auf den Discovery Center für Regionen/Pläne. Das beweist eine veröffentlichte Einstiegsmöglichkeit, keine garantierte Kapazität oder volle Kommunikationsrechte. Volltext abgerufen. — [SAP Developers: ABAP Trial](https://developers.sap.com/tutorials/abap-environment-trial-onboarding.html)
- Die aktuelle Produktseite bewirbt einen **30-Tage-Basic-Trial** der Integration Suite auf einem gemeinsamen Tenant mit Beispieldaten; nur Teilfunktionen, keine vollen Administrations-/Anpassungsrechte. Das ist nicht dasselbe wie ein selbst administrierter BTP-Free-Tier-Tenant. Volltext abgerufen. — [SAP: Integration Suite Trial](https://www.sap.com/products/technology-platform/integration-suite/trial.html)
- Der offizielle SAP-docs-Volltext zum Integration-Suite-Free-Plan nennt **90 Tage**, danach Reaktivierung möglich, aber bisheriger Integrationsinhalt wird gelöscht. Backup/Download oder rechtzeitiger Planwechsel ist nötig. Raw-Volltext tatsächlich abgerufen; Help-Gegenstück angefragt, lieferte keinen Volltext. — [SAP-docs: Using Free Service Plans](https://github.com/SAP-docs/btp-integration-suite/blob/main/docs/ISuite/10-InitialSetup/using-free-service-plans-ddf6692.md), [SAP Help: Using Free Service Plans](https://help.sap.com/docs/integration-suite/sap-integration-suite/using-free-service-plans)
- SAP Help nennt für Integration-Suite-Free-Tier ein bestehendes CPEA- oder Pay-As-You-Go-Abkommen und die Zuweisung des Free-Entitlements. Diese Vertragsvoraussetzung ist nicht identisch mit einer kostenlosen öffentlichen Lernregistrierung. Hier nur offizieller Suchindextext ausgewertet. — [SAP Help: Subscribing to Free Tier](https://help.sap.com/docs/integration-suite/sap-integration-suite/subscribing-to-free-tier)
- Planabhängige Featureverfügbarkeit wird auch für API-basierte Integration-Artefakte dokumentiert. Daher keine Zusage, jeder Trial enthalte alle Adapter-/API-Management-/Eventfunktionen. — [SAP-docs: API-Based Integration Artifacts](https://github.com/SAP-docs/btp-integration-suite/blob/main/docs/ISuite_Integrations_APIs/develop-api-based-integration-artifacts-997501d.md)

### Inferences
- Sechste Lektion: `abap-m19`, Integration Suite als Integrationsschicht mit Mapping, Fehlerbehandlung und bewusstem Plan-/Kostencheck. Ohne Tenant wird ein Integrationsvertrag samt Wiederholungsstrategie erstellt, kein angeblich fertiger iFlow.
- Die 30- und 90-Tage-Angaben widersprechen sich nicht: Sie beschreiben unterschiedliche Angebote. Alte Tutorials/Community-Aussagen zur unbegrenzten Trial-/Free-Verfügbarkeit sind keine verlässliche Zusage für November 2026.

### Gaps
- Keine verbindliche Preisauskunft, live Entitlement-Prüfung, Regionen- oder Kapazitätsgarantie. Vor Provisionierung Discovery Center und Cockpit prüfen; keine kostenpflichtigen Pläne automatisch aktivieren.
- Der gefundene Developer-Tutorial-Link zur Integration-Suite-Einrichtung mit doppeltem Punkt lieferte beim tatsächlichen Abruf 404 und wird nicht als verifizierte Lernquelle in den Lektionen verwendet.
- Quellenprüfung: 6. November 2026. Die JSON-Datei enthält sechs originale deutsche Ergänzungslektionen mit je vier Absätzen, Aufgaben, eigenem Beispiel und je drei Fragen. `correct` ist ein nullbasierter Optionsindex. `minutes` ist eine eigene didaktische Schätzung, keine SAP-Zeitangabe.
