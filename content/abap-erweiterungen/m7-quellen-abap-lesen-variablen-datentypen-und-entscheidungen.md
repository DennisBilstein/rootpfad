# ABAP lesen: Variablen, Datentypen und Entscheidungen

Modul: abap-m7 · 18 Minuten

Ein ABAP-Programm besteht aus Anweisungen, die mit einem Punkt enden. Ein Zeilenumbruch beendet eine Anweisung dagegen nicht. Mit DATA legst du eine veränderbare Variable an; TYPE bestimmt ihren Datentyp. Für ganze Stückzahlen eignet sich i, für einen variablen Text string. Ein Kommentar beginnt mitten in einer Zeile mit einem doppelten Anführungszeichen. Kommentare erklären den Zweck, verändern aber nicht das Ergebnis.

Unser Beispiel prüft einen kleinen Warenkorb: Drei Hefte kosten jeweils vier Euro. menge und einzelpreis enthalten ganze Zahlen, gesamt wird durch Multiplikation zu 12. IF gesamt >= 10 wählt deshalb den Text 'Versandkostenfrei'. Bei zwei Heften wäre gesamt gleich 8 und ELSE würde den anderen Text setzen. Verfolge zuerst diese Werte auf Papier, bevor du ausführst.

Die expliziten Deklarationen sind für den Einstieg absichtlich ausführlich. DATA(status) = ... wäre an geeigneten Stellen eine Kurzform mit abgeleitetem Typ; für die ersten Schritte ist wichtiger, Typ, Name und Wert auseinanderzuhalten. Für reale Preise mit Nachkommastellen brauchst du einen passenden Dezimaltyp und fachliche Regeln zu Währung und Rundung. Der ganzzahlige Preis hier vereinfacht nur das Lernbeispiel.

Praxisaufgabe: Ändere die Menge zunächst auf 2 und dann auf 0. Notiere jeweils gesamt und status. Ergänze vor der Versandentscheidung eine eigene Prüfung, die eine negative Menge als ungültig erkennt. Der Code ist ein Methodenrumpf für eine vorbereitete ADT-Konsolenklasse; out wird dort durch if_oo_adt_classrun~main bereitgestellt und ist kein frei verfügbares Schlüsselwort.

```abap
DATA menge TYPE i VALUE 3.
DATA einzelpreis TYPE i VALUE 4.
DATA gesamt TYPE i.
DATA status TYPE string.

gesamt = menge * einzelpreis.
IF gesamt >= 10.
  status = `Versandkostenfrei`.
ELSE.
  status = `Versandkosten fallen an`.
ENDIF.
out->write( gesamt ).
out->write( status ).
```

## Kontrollfragen

### Was beendet eine ABAP-Anweisung?

- [x] Ein Punkt
- [ ] Jeder Zeilenumbruch
- [ ] Eine schließende geschweifte Klammer

Der Punkt beendet die Anweisung; dieselbe Anweisung kann sich über mehrere Zeilen erstrecken.

### Welchen Wert hat gesamt bei menge = 2 und einzelpreis = 4?

- [ ] 6
- [x] 8
- [ ] 12

Die Multiplikation ergibt 8. Die Bedingung gesamt >= 10 ist damit falsch.

## Quellen und Zugang

- [SAP Learning: Understanding the Basics of ABAP](https://learning.sap.com/courses/basic-abap-programming/understanding-the-basics-of-abap_c0e5346f-a136-4b9f-a167-9031eca12932): Lesetext ohne Anmeldung abgerufen; praktische Ausführung braucht ein ABAP-System und Berechtigungen.
- [SAP Learning: Learning Basic ABAP Programming](https://learning.sap.com/courses/basic-abap-programming): Kursübersicht frei lesbar; Fortschritt und persönliche Lernergebnisse können eine Anmeldung erfordern; kein kostenloses Übungssystem zugesichert.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
