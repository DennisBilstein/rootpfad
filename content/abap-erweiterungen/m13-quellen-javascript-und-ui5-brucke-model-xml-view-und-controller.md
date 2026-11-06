# JavaScript- und UI5-Brücke: Model, XML-View und Controller

Modul: abap-m13 · 45 Minuten

ABAP-Entwickler müssen für einen ersten UI5-Einstieg nicht sofort eine große Webanwendung beherrschen. Drei Rollen genügen: Ein Model hält zugängliche Daten, eine View beschreibt die Oberfläche und ein Controller reagiert auf Ereignisse. In XML werden Controls als Elemente und Eigenschaften als Attribute beschrieben. JavaScript liefert Objekte, Funktionen, Module und Ereignisbehandlung. Ein JSONModel eignet sich für einen lokalen Lernzustand; es ist kein Ersatz für den OData-Vertrag eines RAP-Dienstes.

Arbeitsbeispiel: Eine kleine eigenständige Übungs-View besitzt einen Knopf und einen Zähler. Der Controller importiert seine Abhängigkeiten über sap.ui.define, erzeugt in onInit ein benanntes JSONModel namens ui und erhöht bei onCount den Wert unter /count. Der XML-Text bindet an {ui>/count}; ein Button mit press='.onCount' löst die Methode aus. Die normale Methodensyntax bewahrt den vom Framework gesetzten Controller-Kontext für this. XML und Controller werden in getrennten Dateien mit passendem Namespace verbunden. Das Codefeld zeigt ausschließlich die Controller-Datei, nicht eine vollständige lauffertige App.

Der lokale Zähler demonstriert Datenbindung ohne Netzwerk, SAP-Login oder Geschäftsänderung. Erst danach lohnt die Brücke zum OData-Modell und zu asynchronen Requests: Ein Ergebnis ist nicht zwingend sofort vorhanden, Fehler müssen sichtbar behandelt werden, und UI-Zustand ist von persistiertem Fachzustand zu unterscheiden. In einer Fiori-elements-App ersetzt man die Standardseiten nicht einfach durch diesen Controller. Dort sind dokumentierte Erweiterungspunkte und öffentliche APIs maßgeblich; das isolierte MVC-Beispiel ist ein Verständnisbaustein, kein Auftrag zum Eingriff in generierte interne Controls.

Übung: Zeichne nach zwei Klicks den Model-Inhalt und den gebundenen Text. Implementiere anschließend in einer separaten Übungsdatei eine XML-View mit Text und Button, ergänze einen Reset-Handler und prüfe, dass zwei View-Instanzen ihren Zustand getrennt halten. Benutze eine vorbereitete lokale UI5-App mit passendem Bootstrap und Routing. Lies danach die offiziellen Lifecycle-Hinweise: onInit läuft einmal pro View-Instanz und soll nicht einfach zu einer async-Funktion mit Promise-Rückgabe gemacht werden. Für eine spätere Fiori-elements-Erweiterung prüfst du zuerst die zur verwendeten Version gehörende Dokumentation.

```javascript
// webapp/controller/Counter.controller.js
// Eigenständiges MVC-Lernbeispiel, keine Fiori-elements-Controller-Extension
sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  'use strict';
  return Controller.extend('learn.travel.controller.Counter', {
    onInit: function () {
      this.getView().setModel(new JSONModel({ count: 0 }), 'ui');
    },
    onCount: function () {
      const model = this.getView().getModel('ui');
      const count = model.getProperty('/count');
      model.setProperty('/count', count + 1);
    }
  });
});
// In passender XML-View: controllerName='learn.travel.controller.Counter'
// <Text text='{ui>/count}' />
// <Button text='Zählen' press='.onCount' />
```

## Kontrollfragen

### Was bedeutet {ui>/count} in der passenden XML-View?

- [ ] Eine neue ABAP-Tabelle wird angelegt
- [x] Bindung an /count im benannten Model ui
- [ ] Ein synchroner SQL-Aufruf wird ausgeführt

Der Modelname steht vor >, der absolute Datenpfad danach. UI5 kann so Modeländerungen in der Darstellung nachvollziehen.

### Wie oft wird onInit normalerweise für eine View-Instanz aufgerufen?

- [x] Einmal zur Initialisierung der Instanz
- [ ] Nach jedem einzelnen Rendering erneut
- [ ] Für jede Tabellenzeile automatisch

Die geprüfte Controller-Dokumentation im offiziellen Quelltext beschreibt onInit als einmaligen Initialisierungshook pro View-Instanz.

### Welche Folgerung ist für Fiori elements sinnvoll?

- [ ] Immer interne Controls per DOM-Hack verändern
- [ ] Das MVC-Lernbeispiel unverändert als Standardseitenersatz einsetzen
- [x] Bei nötigen Erweiterungen dokumentierte Erweiterungspunkte und öffentliche APIs prüfen

Das isolierte MVC-Beispiel erklärt UI5-Grundbegriffe. Es ist nicht automatisch die richtige Erweiterungsarchitektur einer generierten Fiori-elements-Anwendung.

## Quellen und Zugang

- [SAPUI5-Dokumentation: Step 4 XML Views (offizieller Dokumentationsquelltext)](https://raw.githubusercontent.com/SAP-docs/sapui5/master/docs/03_Get-Started/step-4-xml-views-1409791.md): Volltext am 2026-11-06 frei abgerufen; XML-Views, Namespace und Trennung von Darstellung und Controller überprüft.
- [OpenUI5 Controller: offizieller Quelltext mit API-/Lifecycle-Dokumentation](https://raw.githubusercontent.com/SAP/openui5/master/src/sap.ui.core/src/sap/ui/core/mvc/Controller.js): Vollständiger Quelltext am 2026-11-06 frei abgerufen; Controller.extend, sap.ui.define und onInit-Vertrag überprüft. master ist beweglich; Zielversion separat abgleichen.
- [ui5.sap.com: tatsächlich ausgelieferter MVC-Controller](https://ui5.sap.com/resources/sap/ui/core/mvc/Controller.js): JavaScript-Inhalt am 2026-11-06 tatsächlich abgerufen; SAP-Header Copyright 2026/Apache-2.0 und Controller-Implementierung vorhanden. Keine lesbare Tutorialseite; SDK-Hashrouten lieferten im Textabruf keinen Inhalt.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
