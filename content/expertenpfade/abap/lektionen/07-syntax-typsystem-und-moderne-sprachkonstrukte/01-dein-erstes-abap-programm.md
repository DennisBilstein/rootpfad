# Dein erstes ABAP-Programm

*Syntax, Typsystem & moderne Sprachkonstrukte · ca. 8 Min.*

Bevor es in die Tiefe geht: So sieht ABAP in der Praxis aus, wenn du es zum ersten Mal ausführst. Es gibt zwei Wege — und der ältere ist nicht mehr der empfohlene.

**Der klassische Weg** ist ein *Report*: eine Datei, die mit `REPORT` beginnt und mit `WRITE` direkt auf eine Listenausgabe schreibt. Das siehst du in jedem gewachsenen System — und du musst es lesen können.

```abap(klassisch)
REPORT z_hallo_welt.

* Diese ganze Zeile ist ein Kommentar (Stern in Spalte 1)
DATA name TYPE string.          " Kommentar bis Zeilenende

name = 'ABAP'.
WRITE: / 'Hallo', name.
WRITE: / 'Zeichen im Namen:', strlen( name ).
```

**Der moderne Weg** — und in ABAP Cloud der einzige, denn `WRITE` existiert dort nicht mehr — ist eine ausführbare Klasse. Sie implementiert das Interface `IF_OO_ADT_CLASSRUN`, das die Methode `main` vorgibt. In den ABAP Development Tools startest du sie mit **F9**, die Ausgabe erscheint in der Konsolen-View.

```abap(modern,abapcloud)
CLASS zcl_hallo_welt DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
ENDCLASS.

CLASS zcl_hallo_welt IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    DATA(name) = 'ABAP'.

    out->write( |Hallo { name }| ).
    out->write( |Zeichen im Namen: { strlen( name ) }| ).

    " Auch ganze Strukturen und Tabellen lassen sich ausgeben:
    out->write( VALUE string_table( ( `erste Zeile` ) ( `zweite Zeile` ) ) ).
  ENDMETHOD.
ENDCLASS.
```

Drei Dinge, die dir ab jetzt in jeder Zeile begegnen:

-   **Jede Anweisung endet mit einem Punkt.** Nicht mit Semikolon, nicht mit Zeilenumbruch. Ein fehlender Punkt ist der häufigste Syntaxfehler von Einsteigern.
-   **Zwei Kommentarformen:** `*` in Spalte 1 kommentiert die ganze Zeile aus, ein doppeltes Anführungszeichen `"` den Rest der Zeile ab dieser Stelle.
-   **ABAP ist nicht case-sensitiv** bei Schlüsselwörtern und Namen — `DATA` und `data` sind identisch. Konvention ist trotzdem: Schlüsselwörter groß, eigene Namen klein. Der Pretty Printer in ADT (`Shift+F1`) stellt das automatisch her.

Zum Debuggen setzt du in ADT per Doppelklick auf den Zeilenrand einen Breakpoint und startest wieder mit F9. Mit `F5` gehst du in eine Methode hinein, mit `F6` über sie hinweg — dieselbe Belegung wie in den meisten IDEs.

> **Tipp:** Wenn du heute mit ABAP anfängst, starte direkt mit der Klassen-Variante über IF\_OO\_ADT\_CLASSRUN. Nicht aus Stilgründen, sondern aus einem harten technischen Grund: In ABAP Cloud (und damit in allem, was künftig upgradefähig bleiben soll) ist WRITE schlicht nicht mehr erlaubt. Wer sich das Report-Denken erst antrainiert, muss es später wieder verlernen.

## Kontrollfragen

**1. Womit endet in ABAP jede einzelne Anweisung?**

- [ ] Mit einem Semikolon
- [x] Mit einem Punkt
- [ ] Mit einem Zeilenumbruch

*Erklärung:* Der Punkt schließt jede Anweisung ab — eine Anweisung darf sich dafür über beliebig viele Zeilen erstrecken.

**2. Welches Interface macht eine Klasse in den ABAP Development Tools direkt per F9 ausführbar?**

- [x] IF_OO_ADT_CLASSRUN
- [ ] IF_AMDP_MARKER_HDB
- [ ] IF_SERIALIZABLE_OBJECT

*Erklärung:* IF_OO_ADT_CLASSRUN gibt die Methode main( ) vor und stellt über out->write( ) die Konsolenausgabe bereit — der moderne Ersatz für den klassischen Report mit WRITE.
