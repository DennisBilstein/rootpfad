# Vom Business Object zum OData-V4-UI-Service

Modul: abap-m12 · 40 Minuten

Damit eine Weboberfläche das Reise-BO verwenden kann, benötigt sie einen Dienst. Die Service Projection formt die für diesen Verbraucher vorgesehene Sicht auf Daten und Verhalten. Die Service Definition legt fest, welche Entitäten unter welchen Namen exponiert werden. Das Service Binding verbindet diese Definition mit einer konkreten technischen Bereitstellung, zum Beispiel OData V4 - UI. Diese Objekte haben verschiedene Aufgaben; weder ein Binding noch eine Service Definition ersetzt die Geschäftsregeln im BO.

Arbeitsbeispiel: Die vorhandene Projektion ZC_LearnTravel wird im Service als Travels angeboten. Die Service Definition im Code enthält bewusst keine URL und keinen Port. Das Binding wird als separates ADT-Objekt angelegt, auf die Definition referenziert und mit dem passenden Binding-Typ aktiviert. In geeigneten Cloud-Systemen lässt sich der lokale Endpunkt im Binding-Editor veröffentlichen und die Fiori-elements-Vorschau für ein Entity Set starten. SAPs geprüftes Tutorial nennt für On-Premise/Private-Cloud-Systeme stattdessen die Veröffentlichung über /IWFND/V4_ADMIN. Der konkrete Weg muss daher zur Landschaft passen.

Die Vorschau ist ein schneller Test des Service-Vertrags und der UI-Metadaten, nicht schon eine vollständig deployte Launchpad-Anwendung. Prüfe zuerst, ob Daten gelesen werden können, danach Create/Update und schließlich fachliche Fehlermeldungen. Bei einer fehlenden Action unterscheidest du drei Schichten: in der Basis-BDEF deklariert, in der Projection per use action freigegeben und für die UI als Aktion platziert. Bei Berechtigungsfehlern ist das Ausblenden eines Buttons keine Backend-Lösung.

Übung: Zeichne die Kette Tabelle → CDS/Behavior → Projection → Service Definition → Binding → Vorschau. Ordne jedem Pfeil ein konkretes Testsignal zu, etwa eine zusätzliche Property in $metadata oder eine korrekt zurückgewiesene Datumsänderung. Vergleiche anschließend dieselbe fachliche Definition mit dem Gedanken an ein anderes Binding: Was bleibt fachlich gleich, was ändert sich technisch? Ohne System kannst du diese Schichten und einen Beispiel-Metadatenvertrag prüfen; Veröffentlichung und echte Requests erfordern Systemzugang und die passenden Berechtigungen.

```abap
// Voraussetzung: aktivierte CDS-Service-Projektion ZC_LearnTravel
@EndUserText.label: 'Lernservice für Reisen'
define service ZUI_LEARN_TRAVEL {
  expose ZC_LearnTravel as Travels;
}

// In ADT als SEPARATES Repository-Objekt anlegen:
// Service Binding: ZUI_LEARN_TRAVEL_O4
// Service Definition: ZUI_LEARN_TRAVEL
// Binding Type: OData V4 - UI
// Aktivieren; Endpunkt passend zur Systemlandschaft veröffentlichen.
// Die Vorschau ist noch kein Launchpad-Deployment.
```

## Kontrollfragen

### Welches Objekt wählt die technische Bereitstellung als OData V4 - UI?

- [ ] Nur die Datenbanktabelle
- [x] Das Service Binding
- [ ] Ein JavaScript-Formatter

Die Definition exponiert Entitäten; das Binding verknüpft sie mit einer technischen Dienstbereitstellung.

### Was beweist eine funktionierende ADT-Fiori-elements-Vorschau?

- [ ] Dass bereits ein produktives Launchpad-Deployment abgeschlossen ist
- [ ] Dass keine Berechtigungen mehr nötig sind
- [x] Dass der Dienst und seine UI-Metadaten für den geprüften Vorschaufall konsumierbar sind

Eine Vorschau ist ein Entwicklungstest. Deployment, Launchpad-Integration und produktive Berechtigungen sind weitere Schritte.

## Quellen und Zugang

- [SAP Developers: Create Database Table and Generate UI Service](https://developers.sap.com/tutorials/abap-environment-rap100-generate-ui-service.html): Volltext am 2026-11-06 frei abgerufen; Artefakttabelle, OData V4 - UI, Publish/Preview und /IWFND/V4_ADMIN-Hinweis direkt überprüft. Praktisch ABAP-System erforderlich.
- [SAP-samples RAP100: Workshop und Voraussetzungen](https://raw.githubusercontent.com/SAP-samples/abap-platform-rap100/main/README.md): Frei abgerufen am 2026-11-06; ADT und geeignetes System plus Flight-Szenario nötig. Launchpad-Zusatzübungen 11/12 ausdrücklich mit license required markiert.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
