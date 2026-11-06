# ABAP Cloud, RAP und Laufzeit: die richtige Erweiterungsarchitektur wählen

Modul: abap-m14 · 25 Minuten

ABAP Cloud bezeichnet ein Entwicklungsmodell mit cloudoptimierter ABAP-Sprachversion, freigegebenen APIs und modernen Werkzeugen. SAP BTP ABAP Environment ist dagegen eine konkrete ABAP-Laufzeit auf der Business Technology Platform. RAP strukturiert transaktionale Geschäftsobjekte und Services und ist ein wichtiger Bestandteil von ABAP Cloud, aber weder dessen vollständiger Umfang noch ein ausschließlich auf BTP nutzbares Modell. Auch geeignete S/4HANA-Systeme unterstützen RAP und ABAP Cloud.

On-stack bedeutet, dass eine Erweiterung im S/4HANA-System läuft. Ein freigegebener BAdI zur Prüfung eines Bestellvorgangs kann dafür passend sein, wenn die Prüfung unmittelbar zur lokalen Transaktion gehören muss. Side-by-side läuft getrennt, beispielsweise in BTP ABAP Environment, und verwendet Remote-APIs. Eine Anwendung, die Bestellungen aus drei Systemen zusammenführt und unabhängig bereitgestellt werden soll, ist ein guter Kandidat dafür. Eine Remote-Anfrage nimmt aber nicht automatisch an derselben Datenbanktransaktion wie S/4HANA teil.

Beispiel: Eine Pflichtfeldprüfung beim Speichern einer Bestellung und eine Lieferantenbewertung mit externen Daten sind zwei verschiedene Anforderungen. Für die Pflichtfeldprüfung untersuchst du zuerst Standardkonfiguration, Key-User-Möglichkeiten und einen passenden freigegebenen lokalen Erweiterungspunkt. Für die Bewertung prüfst du eine eigene Side-by-side-Anwendung und die nötigen freigegebenen Remote-APIs. Fehlt ein geeigneter Erweiterungspunkt, ist das ein Architekturhindernis und keine Erlaubnis, SAP-Standardcode zu verändern.

Praxisauftrag: Erstelle für beide Anforderungen eine Entscheidungstabelle mit Systemedition, Release, LUW-Anforderung, API, Berechtigung und Betriebsverantwortung. Public Edition bietet nicht beliebige klassische ABAP-Erweiterungen; Developer Extensibility benötigt eine geeignete Systemlandschaft. In Private Edition und on-premise ist ABAP Cloud ab S/4HANA 2022 ebenfalls verfügbar, neben bestehenden klassischen Möglichkeiten. Die Architekturaufgabe funktioniert ohne System; ein BTP-Trial kann beim Lernen helfen, garantiert aber weder Kapazität noch alle benötigten Rechte oder Dienste.

```text
Anforderung                 | Prüfung beim Speichern | Bewertung mehrerer Systeme
Gleiche lokale LUW nötig?    | Ja, fachlich prüfen    | Nein
Erster Architektur-Kandidat | Freigegebener BAdI      | Side-by-side mit Remote-API
Vor Umsetzung prüfen        | Edition, Release, Hook | API, Auth, Betrieb, Kosten
```

## Kontrollfragen

### Was ist SAP BTP ABAP Environment?

- [x] Eine konkrete ABAP-Laufzeit auf BTP
- [ ] Ein anderer Name für RAP
- [ ] Die einzige Laufzeit für ABAP Cloud

ABAP Cloud ist das Entwicklungsmodell; BTP ABAP Environment ist eine seiner Laufzeitumgebungen.

### Welche Anforderung spricht besonders für einen geeigneten lokalen Erweiterungspunkt?

- [ ] Unabhängige Bereitstellung über mehrere ERP-Systeme
- [x] Teilnahme an derselben lokalen Geschäftstransaktion
- [ ] Verwendung einer öffentlichen Webseite

Eine zwingende lokale LUW ist ein wesentliches Argument für On-stack; der konkrete Hook muss freigegeben sein.

### Welche Aussage über S/4HANA ist richtig?

- [ ] RAP funktioniert ausschließlich in BTP
- [ ] Public und Private Edition haben immer denselben Erweiterungsumfang
- [x] Edition, Release und Landschaft beeinflussen die Erweiterungsmöglichkeiten

ABAP Cloud und RAP sind nicht BTP-exklusiv. API-Umfang und verfügbare Erweiterungen unterscheiden sich.

## Quellen und Zugang

- [SAP Learning: Explaining Side-By-Side Extensibility](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-side-by-side-extensibility_a01bb1ac-1acb-434d-8458-7a36cf2bcb3b): Frei lesbarer Lerntext, Volltext geprüft; separate Laufzeit erforderlich für Systemübungen.
- [SAP Learning: Explaining Developer Extensibility](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud/explaining-developer-extensibility_f2683861-d69e-4a59-9e3e-01e3cc20fb0f): Frei lesbar; reale Übungen erfordern geeignetes S/4HANA-System und Berechtigungen.
- [SAP Developers: Create an SAP BTP ABAP Environment Trial User](https://developers.sap.com/tutorials/abap-environment-trial-onboarding.html): Anleitung frei; Trial-Registrierung, aktuelle Regionen, Kapazität und Funktionsgrenzen separat prüfen.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
