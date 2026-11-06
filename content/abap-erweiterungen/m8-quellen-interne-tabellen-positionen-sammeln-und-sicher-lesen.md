# Interne Tabellen: Positionen sammeln und sicher lesen

Modul: abap-m8 · 22 Minuten

Eine Struktur beschreibt einen zusammengehörenden Datensatz; eine interne Tabelle enthält beliebig viele Zeilen eines festgelegten Zeilentyps im Arbeitsspeicher. Sie ist keine dauerhaft gespeicherte Datenbanktabelle. Unser Zeilentyp ty_position verbindet Artikelname und Stückzahl. TYPES beschreibt diesen Bauplan, DATA positionen erzeugt das konkrete Datenobjekt.

Die Standardtabelle wird mit zwei Positionen gefüllt: drei Hefte und zwei Stifte. LOOP AT kopiert nacheinander eine Zeile in position. gesamt startet bei 0, wird nach der ersten Position zu 3 und nach der zweiten zu 5. Diese schrittweise Rechnung macht sichtbar, was die Schleife verarbeitet. Eine Änderung an position allein würde die bereits gespeicherte Tabellenzeile nicht automatisch ändern, weil INTO hier eine Kopie liefert.

READ TABLE sucht anschließend den Artikel 'Stift'. Prüfe sy-subrc unmittelbar nach READ TABLE: 0 bedeutet in diesem Beispiel einen erfolgreichen Zugriff. Wenn du einen nicht vorhandenen Artikel suchst, darfst du die Arbeitsstruktur nicht ungeprüft als Treffer behandeln. Für den Einstieg bleibt die Suche bewusst bei READ TABLE; Tabellenausdrücke besitzen andere Fehlermechanismen und werden später eingeführt.

Praxisaufgabe: Ergänze einen Radiergummi mit Stückzahl 1 und sage die neue Summe voraus: 6. Suche danach 'Lineal' und erkläre, warum der ELSE-Zweig läuft. Für überwiegend sequenzielle Verarbeitung ist STANDARD TABLE anschaulich. SORTED TABLE hält eine Schlüsselsortierung ein; HASHED TABLE braucht einen eindeutigen Primärschlüssel und eignet sich für passende vollständige Schlüsselzugriffe. Wähle die Tabellenart nach Zugriffsmuster und Änderungen, nicht nach einer pauschalen Größenregel.

```abap
TYPES: BEGIN OF ty_position,
         artikel TYPE string,
         menge TYPE i,
       END OF ty_position.
DATA positionen TYPE STANDARD TABLE OF ty_position WITH EMPTY KEY.
DATA position TYPE ty_position.
DATA gesamt TYPE i VALUE 0.

position-artikel = `Heft`.
position-menge = 3.
APPEND position TO positionen.
position-artikel = `Stift`.
position-menge = 2.
APPEND position TO positionen.

LOOP AT positionen INTO position.
  gesamt = gesamt + position-menge.
ENDLOOP.
out->write( gesamt ).
READ TABLE positionen INTO position WITH KEY artikel = `Stift`.
IF sy-subrc = 0.
  out->write( position-menge ).
ELSE.
  out->write( `Kein Treffer` ).
ENDIF.
```

## Kontrollfragen

### Wo liegen die Daten einer internen Tabelle?

- [ ] Immer dauerhaft in SAP HANA
- [x] Im Arbeitsspeicher des ABAP-Programms
- [ ] In der Eclipse-Installation

Interne Tabellen sind dynamische Datenobjekte für die Verarbeitung im ABAP-Arbeitsspeicher, keine dauerhaften Datenbanktabellen.

### Wann wird die Menge des gesuchten Artikels ausgegeben?

- [ ] Unabhängig vom Suchergebnis
- [x] Wenn sy-subrc nach READ TABLE gleich 0 ist
- [ ] Nur nach COMMIT WORK

Das Beispiel prüft den erfolgreichen Lesezugriff direkt anhand von sy-subrc = 0.

## Quellen und Zugang

- [SAP-samples: Internal Tables](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/01_Internal_Tables.md): Öffentlich ohne Konto gelesen; Beispielausführung benötigt ein kompatibles ABAP-System. Neueste Syntax nicht ungeprüft auf ältere Releases übertragen.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
