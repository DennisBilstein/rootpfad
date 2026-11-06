# Assoziation oder Join? Beziehungen und Ergebnismengen verstehen

Modul: abap-m11 · 40 Minuten

Eine Reise verweist über CustomerID auf einen Kunden. Ein expliziter Join verbindet Quellen innerhalb der jeweiligen Abfrage. Eine CDS-Assoziation beschreibt dagegen eine benannte, wiederverwendbare Beziehung mit Ziel, ON-Bedingung und Kardinalität. Wird sie lediglich definiert und exponiert, entsteht dadurch noch kein Join zum Ziel. Ein Pfadausdruck, der ein Zielfeld liest, wird auf Datenbankebene als Join umgesetzt. Assoziationen sind deshalb nicht grundsätzlich schneller als Joins: Entscheidend ist, was ein Verbraucher tatsächlich anfordert.

Im Beispiel besitzt die vorbereitete Zielentität ZI_LearnCustomer genau einen Datensatz je CustomerID. Die Assoziation _Customer hat die Kardinalität [0..1], weil eine Reise höchstens einen passenden Kunden hat und im Lernbestand auch ein fehlender Stammsatz möglich ist. $projection.CustomerID bezieht sich auf das nach außen angebotene Element der Reise. Der Eintrag _Customer in der Elementliste exponiert die Beziehung, während _Customer.Name bereits ein konkretes Zielfeld anfordert. Für den ersten Versuch bleibt dieser Pfad auskommentiert.

Arbeitsbeispiel: Reise 1 verweist auf Kunde 7, dessen Name Mira ist. Ohne Namen enthält das Ergebnis nur Reisedaten; mit dem Pfad kommt Mira hinzu. Die Gegenrichtung Kunde zu Reisen wäre dagegen [0..*]. Wer aus dieser Richtung ein Reisefeld in eine flache Kundenliste übernimmt, kann aus einem Kunden drei Ergebniszeilen machen. Eine Kardinalität ist eine Aussage über reale Daten und keine Begrenzung, die zusätzliche Treffer abschneidet.

Übung: Lege auf Papier zwei Kunden und drei Reisen an, davon zwei für denselben Kunden. Notiere die Ergebniszeilen für beide Richtungen. Vergleiche im System Data Preview und Show SQL CREATE Statement zunächst ohne und dann mit aktivierter Pfadspalte. Prüfe besonders fehlende Stammsätze und mehrfach passende Ziele. Das Ergebnis soll begründen, warum du für eine Reiseübersicht bei der Reise startest, statt versehentlich eine Kundenliste zu vervielfachen.

```abap
// Voraussetzung: ZI_LearnCustomer mit CustomerID und Name
@EndUserText.label: 'Reisen mit Kundenbeziehung'
define view entity ZI_LearnTravelRel
  as select from zlearn_travel
  association [0..1] to ZI_LearnCustomer as _Customer
    on $projection.CustomerID = _Customer.CustomerID
{
  key travel_id   as TravelID,
      customer_id as CustomerID,
      description as Description,
      // _Customer.Name as CustomerName,
      _Customer
}
```

## Kontrollfragen

### Wann führt eine exponierte Assoziation zum Join auf ihr Ziel?

- [ ] Immer bereits durch ihren Namen
- [x] Wenn sie beispielsweise zum Lesen eines Zielfeldes per Pfadausdruck verwendet wird
- [ ] Niemals, sie ersetzt SQL vollständig

Die SAP-Lektion unterscheidet Exponieren und tatsächliche Verwendung: Ein Pfadausdruck wird zum Join übersetzt.

### Ein Kunde hat drei Reisen. Was kann ein flacher Pfad Kunde → Reisen.ReiseID bewirken?

- [x] Drei Ergebniszeilen für denselben Kunden
- [ ] Automatisch nur die neueste Reise
- [ ] Immer einen Syntaxfehler in jeder Elementliste

Ein to-many-Pfad in der Elementliste kann Zeilen vervielfachen. Er wählt nicht automatisch einen einzelnen Treffer.

### Was bedeutet [0..1] in diesem Lernbeispiel?

- [ ] Die Datenbank löscht doppelte Kunden
- [ ] Ein Kunde muss zwingend existieren
- [x] Pro Reise werden null oder ein passender Kunde erwartet

Die Kardinalität beschreibt erwartete Beziehungen; sie bereinigt weder Dubletten noch erzwingt sie Stammdaten.

## Quellen und Zugang

- [SAP Learning: Defining Associations Between CDS Views](https://learning.sap.com/courses/building-data-models-with-the-abap-dictionary-and-abap-core-data-services/defining-associations-between-cds-views_b325f87f-ff81-4bbe-a5c3-06d0c3ba5def): Volltext am 2026-11-06 ohne Anmeldung abgerufen; Lesen frei, Übung benötigt ADT und passendes System.
- [SAP Learning: Using Associations in Path Expressions](https://learning.sap.com/courses/building-data-models-with-the-abap-dictionary-and-abap-core-data-services/using-associations-in-path-expressions_daff758b-a544-4613-9a6e-aa1a2df73a33): Volltext am 2026-11-06 abgerufen; Join-on-demand, to-many-Effekte und Syntaxunterschiede direkt überprüft. Lesen frei.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
