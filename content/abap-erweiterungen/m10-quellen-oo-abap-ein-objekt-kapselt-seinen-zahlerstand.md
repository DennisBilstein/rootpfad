# OO ABAP: Ein Objekt kapselt seinen Zählerstand

Modul: abap-m10 · 24 Minuten

Eine Klasse beschreibt Daten und Verhalten, ein Objekt ist eine konkrete Instanz dieser Klasse. Unser Zähler besitzt einen privaten Stand und zwei öffentliche Methoden. erhoehen verändert den Stand, lesen gibt ihn zurück. Die aufrufende Anwendung muss nicht wissen, wie der Stand intern gespeichert wird, sondern verwendet diese kleine öffentliche Schnittstelle. Das ist der erste praktische Schritt zur Kapselung.

DEFINITION beschreibt die sichtbaren Bestandteile und Methodensignaturen; IMPLEMENTATION enthält die Anweisungen der Methoden. PUBLIC SECTION macht die beiden Methoden von außen nutzbar. PRIVATE SECTION verbirgt stand vor gewöhnlichen Aufrufern. IMPORTING schritt ist der Eingabewert der Methode, RETURNING VALUE(wert) ist das einzelne Rückgabeergebnis von lesen. Über -> wird eine Instanzmethode angesprochen.

Nach NEW lcl_zaehler( ) startet stand als initialer Integer bei 0. Zwei Aufrufe mit schritt = 2 und schritt = 3 ergeben den Stand 5. Ein zweites mit NEW erzeugtes Objekt beginnt unabhängig wieder bei 0. Zwei Referenzvariablen, die nur auf dasselbe Objekt zeigen, wären dagegen keine zwei unabhängigen Zähler. Ein veränderbarer Instanzzustand gehört deshalb nicht versehentlich in CLASS-DATA: Das wäre klassenweiter, gemeinsam genutzter Zustand.

Praxisaufgabe: Lege ein zweites Zählerobjekt an und erhöhe nur dieses um 1. Begründe, warum die Ergebnisse 5 und 1 sind. Ergänze anschließend eine Methode zuruecksetzen, die stand auf 0 setzt. Für ADT kommt die lokale Klasse in den Bereich Local Types einer vorbereiteten globalen Konsolenklasse; die kommentierten Aufrufzeilen gehören in deren main-Methode. Vererbung und Entwurfsmuster sind sinnvolle Folgethemen, aber keine Voraussetzung für diese Übung.

```abap
" Local Types der globalen Konsolenklasse:
CLASS lcl_zaehler DEFINITION.
  PUBLIC SECTION.
    METHODS erhoehen IMPORTING schritt TYPE i.
    METHODS lesen RETURNING VALUE(wert) TYPE i.
  PRIVATE SECTION.
    DATA stand TYPE i.
ENDCLASS.

CLASS lcl_zaehler IMPLEMENTATION.
  METHOD erhoehen.
    stand = stand + schritt.
  ENDMETHOD.
  METHOD lesen.
    wert = stand.
  ENDMETHOD.
ENDCLASS.

" Separat in if_oo_adt_classrun~main einsetzen:
" DATA(zaehler) = NEW lcl_zaehler( ).
" zaehler->erhoehen( schritt = 2 ).
" zaehler->erhoehen( schritt = 3 ).
" out->write( zaehler->lesen( ) ).
```

## Kontrollfragen

### Warum liegt stand im privaten Bereich?

- [ ] Damit er automatisch in HANA gespeichert wird
- [x] Damit Aufrufer ihn über die angebotenen Methoden verwenden
- [ ] Damit alle Instanzen zwangsläufig denselben Stand besitzen

Private Instanzdaten kapseln den Zustand. Die öffentlichen Methoden bilden die Schnittstelle für gewöhnliche Aufrufer.

### Was erzeugt NEW lcl_zaehler( )?

- [x] Eine neue Objektinstanz
- [ ] Eine Transportfreigabe
- [ ] Eine neue Datenbanktabelle

NEW erzeugt hier eine Instanz und liefert eine Referenz darauf. Ein weiterer NEW-Aufruf erzeugt einen eigenen Instanzzustand.

## Quellen und Zugang

- [SAP-samples: ABAP Object Orientation](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/04_ABAP_Object_Orientation.md): Kostenlos öffentlich lesbar; enthält Syntax und Beispiele, ausdrücklich keine allgemeingültigen OO-Designvorlagen. Ausführen nur mit ABAP-System.
- [SAP Learning: Learning Basic ABAP Programming](https://learning.sap.com/courses/basic-abap-programming): Kursübersicht frei gelesen; eigene Einheit zu lokalen Klassen. Übungssystem nicht durch die frei lesbare Seite enthalten.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
