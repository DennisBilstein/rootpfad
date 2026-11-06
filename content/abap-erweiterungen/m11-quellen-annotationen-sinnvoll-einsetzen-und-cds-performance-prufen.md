# Annotationen sinnvoll einsetzen und CDS-Performance prüfen

Modul: abap-m11 · 35 Minuten

CDS-Annotationen beginnen mit @ und ergänzen ein Modell um Metadaten. Entity-Annotationen gelten für die gesamte Entität, Element-Annotationen für ein Feld. Ein lesbarer Titel, die Verbindung eines Betrags mit seiner Währung und die Auswahl einer Tabellenspalte lösen unterschiedliche Aufgaben. Welche Wirkung eine Annotation hat, hängt vom auswertenden Framework ab. Ein hübsches Label ist kein Beschleuniger für eine Datenbankabfrage, und UI-Sichtbarkeit ersetzt keine serverseitige Berechtigung.

Arbeitsbeispiel: Zwei Reisen besitzen TotalPrice 120, aber unterschiedliche CurrencyCode-Werte EUR und USD. Der Betrag ohne Währung ist fachlich unvollständig. Unsere View verbindet deshalb TotalPrice durch @Semantics.amount.currencyCode mit CurrencyCode. Voraussetzung sind entsprechend typisierte Felder in der eigenen Tabelle. Die fachliche Bezeichnung hilft beim Lesen des Modells; eine spätere UI kann zusätzliche eigene Annotationen verwenden. Wir sammeln nicht wahllos Annotationen, sondern fragen bei jeder: Wer wertet diese Information wofür aus?

Für Performance formulieren wir eine prüfbare Hypothese: Werden Kundennamen nicht benötigt, soll die reine Exposition von _Customer keinen zusätzlichen Ziel-Join verlangen. Sobald CustomerName als Pfadspalte angefordert wird, untersuchen wir den erzeugten Join und die Ergebnismenge. Das SQL-CREATE-Statement zeigt die Struktur; tatsächliche Laufzeit und Datenbankarbeit müssen zusätzlich mit den im System verfügbaren Analysewerkzeugen gemessen werden. Ein kleiner Datenbestand und ein einzelner schneller Lauf beweisen keine allgemeine Skalierbarkeit.

Übung: Erstelle eine Ergebnisliste mit nur ID und Preis und eine mit zusätzlichem Kundennamen. Dokumentiere Felder, Filter, Zeilenanzahl und gegebenenfalls gemessene Laufzeiten unter vergleichbaren Bedingungen. Ergänze einen Kunden mit mehreren sprachabhängigen Texten und überlege vor der Implementierung, welcher Sprachfilter und welche wahre Kardinalität nötig sind. Das Ziel ist ein begründetes Datenmodell statt der pauschalen Behauptung, eine Assoziation oder eine Performance-Annotation mache jede Abfrage schnell.

```abap
// Voraussetzung: total_price ist ein Betragsfeld, currency_code ein Währungsfeld
@EndUserText.label: 'Reisepreise mit Währung'
define view entity ZI_LearnTravelPrice
  as select from zlearn_travel
{
  key travel_id as TravelID,
      @Semantics.amount.currencyCode: 'CurrencyCode'
      total_price as TotalPrice,
      currency_code as CurrencyCode
}
```

## Kontrollfragen

### Welche Aussage zu @EndUserText.label trifft zu?

- [ ] Sie erzwingt einen Index
- [x] Sie liefert eine semantische Bezeichnung
- [ ] Sie garantiert eine bestimmte Laufzeit

Eine Bezeichnung ist Metadatum. Sie ist kein Index und kein Laufzeitversprechen.

### Warum gehört CurrencyCode zum Preisbeispiel?

- [ ] Damit beliebige Währungen ohne Umrechnung addiert werden dürfen
- [ ] Nur damit die Tabelle mehr Spalten hat
- [x] Damit der Betrag fachlich seiner Währung zugeordnet ist

120 EUR und 120 USD sind nicht derselbe Geldbetrag. Die Semantik verbindet Zahl und Währung, ersetzt aber keine Umrechnung.

## Quellen und Zugang

- [SAP Learning: Working with CDS Views](https://learning.sap.com/courses/basic-abap-programming/working-with-cds-view_c289f74d-675e-4084-9d90-5635958ec604): Volltext geprüft am 2026-11-06, frei lesbar; Annotationsebenen belegt.
- [SAP Developers: Create Database Table and Generate UI Service](https://developers.sap.com/tutorials/abap-environment-rap100-generate-ui-service.html): Volltext geprüft am 2026-11-06, frei lesbar; Betrags-/Währungsannotation und Systemvoraussetzungen enthalten. Ausführung benötigt ABAP-System.
- [SAP Learning: Using Associations in Path Expressions](https://learning.sap.com/courses/building-data-models-with-the-abap-dictionary-and-abap-core-data-services/using-associations-in-path-expressions_daff758b-a544-4613-9a6e-aa1a2df73a33): Volltext geprüft am 2026-11-06, frei lesbar; Join-on-demand, erzeugtes SQL und Kardinalitätseffekte enthalten.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
