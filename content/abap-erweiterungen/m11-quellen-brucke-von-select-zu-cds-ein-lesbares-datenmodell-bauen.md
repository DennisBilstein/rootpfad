# Brücke von SELECT zu CDS: ein lesbares Datenmodell bauen

Modul: abap-m11 · 30 Minuten

Wer SELECT kennt, hat bereits den wichtigsten Einstieg in CDS: Datenquelle, Feldliste und Filter bleiben vertraut. Eine CDS View Entity legt diese Leselogik jedoch als wiederverwendbares Repository-Objekt ab. Der Name der Entität ist nicht der Tabellenname; Feldaliase werden zu ihrem öffentlichen Vokabular. CDS ist weder eine interne Tabelle noch automatisch eine schreibbare API. Erst weitere RAP-Artefakte beschreiben transaktionales Verhalten.

Unser durchgehendes Beispiel ist eine kleine Reiseverwaltung. Eine Reise besitzt eine ID, einen Kunden, eine Beschreibung und einen Status. Angenommen, im Übungssystem existiert die eigene Tabelle zlearn_travel mit den im Code verwendeten Feldern. Die View ZI_LearnTravel benennt technische Spalten in verständliche Elemente um. Eine zweite Anwendung kann dieselbe Entität lesen, ohne die Umbenennung erneut zu implementieren. Der Code ist ein eigenes Modellierungsbeispiel; die Tabelle und das Paket müssen zuvor angelegt werden.

Die Annotation @EndUserText.label liefert eine fachliche Bezeichnung. Das Schlüsselwort key beschreibt den Schlüssel der CDS-Entität, erzeugt aber keine neue Eindeutigkeitsprüfung für das Abfrageergebnis. Bei späteren Joins müssen wir daher weiterhin darauf achten, ob die angebliche eine Zeile pro Reise tatsächlich erhalten bleibt. In ADT kontrollieren wir die aktive Definition, öffnen Data Preview und vergleichen eine konkrete Reise mit der Ursprungstabelle.

Übung: Zeichne zuerst eine Zeile der Tabelle und dieselbe Zeile nach Anwendung der Aliase auf Papier. Ergänze danach ein Enddatum in Tabelle und View und lies nur ID und Beschreibung über ABAP SQL. Prüfe mit einer Filterbedingung eine bekannte Reise. Ohne ABAP-System reicht als Vorübung, Quelle, Schlüssel, Elementnamen und erwartete Ergebniszeile zu markieren; Aktivierung und echte Datenprüfung benötigen dagegen ein geeignetes System mit Entwicklungsberechtigung.

```abap
@EndUserText.label: 'Reisen zum Lernen'
define view entity ZI_LearnTravel
  as select from zlearn_travel
{
  key travel_id   as TravelID,
      customer_id as CustomerID,
      description as Description,
      status      as Status
}

// Separates ABAP-Fragment, z. B. in einer ADT-Konsolenklasse:
// SELECT FROM ZI_LearnTravel
//   FIELDS TravelID, Description
//   WHERE TravelID = '000001'
//   INTO TABLE @DATA(travels).
```

## Kontrollfragen

### Was kapselt eine einfache CDS View Entity?

- [x] Wiederverwendbare Leselogik mit semantischen Metadaten
- [ ] Automatisch alle Schreiboperationen einer Fiori-App
- [ ] Eine nur zur Laufzeit vorhandene interne Tabelle

CDS modelliert Daten und Metadaten. Für transaktionale Operationen braucht RAP zusätzlich eine Behavior Definition und gegebenenfalls Implementierung.

### Welche Namen verwendet ein SELECT auf der CDS-Entität für umbenannte Felder?

- [ ] Immer die ursprünglichen Tabellenspalten
- [x] Die Elementnamen beziehungsweise Aliase der CDS-Entität
- [ ] Die Namen der Bildschirmbeschriftungen

Die CDS-Elementnamen bilden die Schnittstelle des Datenmodells; Beschriftungen sind davon getrennte Metadaten.

## Quellen und Zugang

- [SAP Learning: Working with CDS Views](https://learning.sap.com/courses/basic-abap-programming/working-with-cds-view_c289f74d-675e-4084-9d90-5635958ec604): Volltext am 2026-11-06 ohne Anmeldung abgerufen; Lesen frei. Praktische ADT-Übung benötigt ABAP-System und Berechtigungen; vorhandene /LRN-Objekte sind nicht in jedem System verfügbar.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
