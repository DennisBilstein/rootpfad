# Fiori UX und Elements: List Report und Object Page mit Fiori Tools

Modul: abap-m13 · 45 Minuten

SAP Fiori bezeichnet eine Benutzererfahrung, nicht eine zusätzliche ABAP-Syntax. SAPUI5 ist ein UI-Framework; Fiori elements baut darauf mit vordefinierten Seitentypen und Metadaten auf. Für eine Reiseverwaltung passt ein List Report zum Finden, Filtern und Auswählen vieler Reisen. Die Object Page bündelt Informationen und Bearbeitung einer einzelnen Reise. Diese Arbeitsteilung ist ein guter Einstieg, bevor wir eigene Controller oder spezielle Layouts ergänzen.

Arbeitsbeispiel: Eine Sachbearbeiterin sucht offene Reisen eines Kunden. Der List Report zeigt ID, Beschreibung und Status; der Status wird als Filter angeboten. Nach Auswahl einer Reise öffnet die Object Page deren Details. Unsere eigene Metadata Extension ergänzt diese UI-Bedeutung auf der vorhandenen Projektion. @UI.lineItem steuert eine Listenspalte, @UI.selectionField ein Filterfeld und @UI.identification ein Feld im Identifikationskontext. Die gezeigte Extension setzt @Metadata.allowExtensions: true auf der Projektion voraus; Abschnitte/Feldergruppen und weitere Detailkonfiguration werden im realen Projekt passend ergänzt.

SAP Fiori tools unterstützt Generierung, Konfiguration und Vorschau solcher Apps in VS Code oder SAP Business Application Studio. Eine lokale VS-Code-Lernstrecke und Mock-Daten können die erste UI-Erkundung vom echten ABAP-Backend entkoppeln. Für reale Schreiboperationen brauchst du später einen passenden Dienst und Credentials. Wichtig für die Quellenauswahl: Die geprüfte SAP-Developers-Tutorialgruppe für List Report/Object Page arbeitet ausdrücklich mit OData V2, ES5 und lokalen OData-Annotationen. Ihr Werkzeugablauf ist hilfreich, darf aber nicht unbesehen als RAP-OData-V4-Anleitung bezeichnet werden.

Übung: Skizziere zuerst die zwei Seiten und ordne jede Information der passenden Seite zu. Generiere danach eine App mit dem zu deinem Dienst passenden Protokoll und kontrolliere lokale Vorschau, Filter und Navigation. Ändere eine Annotation, nicht sofort Controller-Code, und beobachte die Wirkung. Vergleiche die verwendete UI5-Version mit der offiziellen Feature Map, denn V2- und V4-Unterstützung sowie verfügbare Funktionen sind nicht identisch. Auf Papier kannst du dieselbe Aufgabe als Rollen- und Informationsdesign lösen, ohne ein SAP-System zu behaupten.

```abap
// Voraussetzung auf ZC_LearnTravel: @Metadata.allowExtensions: true
@Metadata.layer: #CUSTOMER
annotate entity ZC_LearnTravel with
{
  @UI.lineItem: [ { position: 10, label: 'Reise' } ]
  @UI.identification: [ { position: 10 } ]
  TravelID;

  @UI.lineItem: [ { position: 20, label: 'Beschreibung' } ]
  @UI.identification: [ { position: 20 } ]
  Description;

  @UI.selectionField: [ { position: 10 } ]
  @UI.lineItem: [ { position: 30, label: 'Status' } ]
  Status;
}
```

## Kontrollfragen

### Welche Aufgabe passt zum List Report?

- [x] Viele Reisen suchen, filtern und auswählen
- [ ] Eine vollständige Datenbank ersetzen
- [ ] Nur Backend-Berechtigungen verwalten

Der List Report ist für listenorientiertes Arbeiten ausgelegt und wird häufig mit einer Object Page für den Einzeldatensatz kombiniert.

### Warum darf die geprüfte ES5-Tutorialgruppe nicht als reine RAP-V4-Anleitung gelten?

- [ ] Weil SAP Fiori tools keine Vorschau unterstützt
- [x] Weil die Gruppe ausdrücklich OData V2 und lokale OData-Annotationen verwendet
- [ ] Weil List Reports keine Filter haben

Die Werkzeuge sind übertragbar, aber Protokoll, Backend und Annotationsdarstellung unterscheiden sich. Der Inhalt der Quelle muss korrekt eingeordnet werden.

## Quellen und Zugang

- [SAP Learning: Examining List Report and Object Page Features](https://learning.sap.com/courses/developing-an-sap-fiori-elements-app-based-on-a-cap-odata-v4-service/examining-list-report-and-object-page-features_f4eed58a-6c42-430f-9eda-1b0f49c065f3): Frei lesbarer Text am 2026-11-06 geprüft; Kurskontext CAP/OData V4, keine ABAP-Backend-Anleitung. Videos nicht abgespielt; Text und offizielle Feature-Map-Verweise geprüft.
- [SAP Developers: Set Up SAP Fiori Tools in Your Development Environment](https://developers.sap.com/tutorials/fiori-tools-vscode-setup): Volltext am 2026-11-06 frei abgerufen; VS Code/BAS, Extension Pack, Vorschau mit Backend- und Mock-Daten belegt. BAS-Verfügbarkeit/Entitlements gesondert prüfen.
- [SAP Developers: Create a List Report Object Page App with SAP Fiori Tools](https://developers.sap.com/tutorials/group-create-a-list-report-object-page-app-with-sap-fiori-tools/): Gruppen-Volltext geprüft am 2026-11-06; kostenlos lesbar. Ausdrücklich OData V2, ES5 und lokale OData-Annotationen, daher kein gleichwertiges RAP-V4-Tutorial.
- [SAP-samples RAP100: Actions und UI-Metadaten](https://raw.githubusercontent.com/SAP-samples/abap-platform-rap100/main/exercises/ex06/README.md): Frei am 2026-11-06 abgerufen; lineItem/identification sowie Platzierung einer Action überprüft. Eigenes Beispiel statt Übernahme der vollständigen Übung.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
