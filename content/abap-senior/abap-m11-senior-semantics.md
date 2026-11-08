# CDS-Fachsemantik: Währungen, Einheiten und belastbare Summen

abap-m11-senior-semantics · 25 Minuten · 08.11.2026

## Voraussetzungen

CDS View Entities, Aggregationen und DDIC-Typen; Zielfunktionen für Umrechnung sind releaseabhängig.

## Lernziele

- Beträge und Mengen zusammen mit ihrer Referenz modellieren.
- Annotation und tatsächliche Umrechnung unterscheiden.
- Aggregation und Rundung mit Gegenbeispielen testen.

Eine Zahl 100 ist ohne Einheit oder Währung fachlich unvollständig. Ein Betrag braucht seine Währungsreferenz, eine Menge ihre Maßeinheit. Für entsprechend typisierte Elemente in CDS View Entities werden diese Referenzen durch Semantics-Annotationen verbunden. Wähle die tatsächlichen projizierten Feldnamen; ein umbenanntes CurrencyCode muss auch in der Referenz korrekt erscheinen.

Die Annotation amount.currencyCode erklärt, zu welchem Währungsfeld der Betrag gehört. Sie rechnet 100 USD nicht in 100 EUR um. Mengen von 10 KG und 5 ST dürfen nicht blind als 15 summiert werden. Entweder nach kompatibler Einheit/Währung gruppieren oder eine definierte Umrechnung mit fachlich passender Dimension und Referenz vornehmen.

Bei Währungsumrechnung sind Zielwährung, Kursdatum, Kurstyp, verfügbare Kurse und Fehlerbehandlung Teil des Vertrags. Datenbanktyp, Währungsdezimalstellen, Berechnungspräzision und Anzeigeformat sind unterschiedliche Ebenen. Vermeide binäre Gleitkommaarithmetik als pauschale Geldstrategie; auch DECIMAL allein entscheidet nicht, wann fachlich gerundet wird. Fehlende Kurse nicht still als 1 behandeln.

Prüfe Zeilengranularität vor der Aggregation: ein Join auf mehrere Texte oder Positionen kann denselben Betrag vervielfachen. DISTINCT ist keine allgemeine Reparatur, weil zwei fachlich verschiedene Positionen denselben Wert haben können. Vergleiche Schlüssel, Anzahl und Summen vor und nach der Erweiterung. Technisch schnelle falsche Summen bleiben fachlich falsch.

```cds
// Fragment in der Elementliste einer vorbereiteten CDS View Entity:
@Semantics.amount.currencyCode: 'CurrencyCode'
net_amount as NetAmount,
currency_code as CurrencyCode,
@Semantics.quantity.unitOfMeasure: 'QuantityUnit'
quantity as Quantity,
quantity_unit as QuantityUnit
// Deklariert Referenzen; führt keine Umrechnung aus.
```

## Senior-Praxis

Lege für Reviews drei kleine Belege mit verschiedenen Währungen und zwei sprachabhängigen Texten an. Damit werden falsche Summen und Joinvervielfachungen schneller sichtbar als mit hundert gleichartigen Testzeilen.

## Praxisfälle

- Normalfall: Zwei EUR-Positionen derselben Granularität ergeben die erwartete EUR-Summe mit korrekter Referenz.
- Grenzfall: EUR und USD bleiben getrennt oder werden mit festgelegtem Datum/Kurstyp nachvollziehbar konvertiert.
- Fehlerfall: Fehlender Kurs oder vervielfachender Textjoin: kontrollierter Fehler beziehungsweise korrigierte Ergebnismenge statt erfundener Summe.

## Szenarioquiz

### Eine View annotiert NetAmount mit CurrencyCode. Eine Zeile enthält USD, die andere EUR. Was bewirkt die Annotation allein?

- [ ] Sie rechnet alle Beträge automatisch in die Anmeldesprache um. — Sprache ist keine Zielwährung und die Annotation führt keine Kursumrechnung aus.
- [ ] Sie ersetzt die Werte implizit durch Beträge in der Hauswährung. — Eine semantische Referenz bestimmt weder Kurs noch Umrechnungsdatum.
- [x] Sie verknüpft Betrag und Währungsreferenz, ohne Werte umzurechnen. — Für eine gemeinsame Summe ist zusätzlich ein fachlich definierter Umrechnungs- oder Gruppierungsvertrag nötig.

### Nach einem Join auf zwei sprachabhängige Texte verdoppelt sich die Belegsumme. Was prüfst du zuerst?

- [x] Die Join-Kardinalität und Zeilengranularität vor der Aggregation. — Mehrere Texttreffer können die gleichen fachlichen Beträge mehrfach in die Summe aufnehmen.
- [ ] Ob die Betragsanzeige von zwei auf null Nachkommastellen wechselt. — Darstellungspräzision erklärt nicht die systematische Verdopplung der Zeilen.
- [ ] Ob man DISTINCT nur auf dem Betrag als universellen Fix setzen kann. — Gleiche Beträge können zu verschiedenen echten Positionen gehören; DISTINCT kann dann Daten verlieren.

### Für eine EUR-Umrechnung fehlt am geforderten Kursdatum der USD-Kurs. Welche Behandlung ist fachlich belastbar?

- [ ] Den fehlenden Kurs still durch 1 ersetzen und die Summe freigeben. — Das erzeugt ohne fachliche Grundlage einen falschen Gegenwert.
- [x] Den fehlenden Kurs nach festgelegtem Fehlervertrag sichtbar behandeln. — Fallback, Ablehnung oder Nachpflege müssen ausdrücklich vereinbart sein; keine erfundene Umrechnung.
- [ ] Die Währungsannotation entfernen und die Beträge als Stückzahlen summieren. — Die Semantik zu entfernen löst den fehlenden Kurs nicht.

## Quellen und Grenzen

- https://learning.sap.com/courses/building-data-models-with-the-abap-dictionary-and-abap-core-data-services/using-abap-annotations-in-cds-views_fcda7ade-1bb7-4c79-8b1f-0f20c7f45a70

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
