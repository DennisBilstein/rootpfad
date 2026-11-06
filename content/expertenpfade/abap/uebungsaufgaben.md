# Übungsaufgaben – ABAP Expertenpfad

## Einsteiger

### Summe aller geraden Zahlen

*Thema: Pseudocode*

Schreibe einen **Pseudocode-Algorithmus**, der aus einer Liste von Ganzzahlen die Summe aller *geraden* Zahlen berechnet und zurückgibt.

-   Eingabe: Liste `zahlen`
-   Ausgabe: Summe der geraden Zahlen
-   Nutze die IHK-übliche Notation (IF/THEN/ENDIF, FOR EACH/ENDFOR)

<details><summary>Hinweis 1</summary>

Du brauchst eine Akkumulator-Variable, die vor der Schleife auf 0 gesetzt wird.

</details>

<details><summary>Hinweis 2</summary>

Eine Zahl ist gerade, wenn der Rest bei Division durch 2 gleich 0 ist — der Operator heißt meist MOD.

</details>

<details><summary>Hinweis 3</summary>

Struktur: Initialisierung → Schleife über alle Elemente → innerhalb der Schleife eine Verzweigung → nach der Schleife RETURN.

</details>

<details><summary>Lösung</summary>

```pseudocode
FUNCTION summeGerade(zahlen)
  summe <- 0
  FOR EACH zahl IN zahlen DO
    IF zahl MOD 2 = 0 THEN
      summe <- summe + zahl
    ENDIF
  ENDFOR
  RETURN summe
ENDFUNCTION
```

Klassischer Akkumulator mit Filterbedingung — genau das Muster, das die AP1 in Multiple-Choice-Fragen gerne abfragt ("Was liefert der Algorithmus für [3,4,7,8]?" → 12).

</details>

### Lineare Suche übersetzen

*Thema: Pseudocode → ABAP*

Gegeben ist dieser Pseudocode. Übersetze ihn **wörtlich in ABAP** (Methode mit RETURNING-Parameter):

```
FUNCTION findeIndex(zahlen, gesucht) FOR i <- 1 TO LAENGE(zahlen) DO IF zahlen[i] = gesucht THEN RETURN i ENDIF ENDFOR RETURN -1 ENDFUNCTION
```

<details><summary>Hinweis 1</summary>

lines( itab ) liefert in ABAP die Anzahl der Zeilen einer internen Tabelle.

</details>

<details><summary>Hinweis 2</summary>

Eine DO-Schleife mit Index oder ein LOOP AT mit sy-tabix funktioniert — LOOP AT ist idiomatischer.

</details>

<details><summary>Hinweis 3</summary>

Beim frühen Verlassen der Schleife hilft EXIT; den Rückgabewert setzt du vorher auf den Trefferindex.

</details>

<details><summary>Lösung</summary>

```abap
METHOD find_index.
  rv_index = -1.
  LOOP AT it_zahlen INTO DATA(zahl).
    IF zahl = iv_gesucht.
      rv_index = sy-tabix.
      EXIT.
    ENDIF.
  ENDLOOP.
ENDMETHOD.
```

sy-tabix enthält im LOOP den aktuellen Zeilenindex. Idiomatischer wäre in echtem ABAP: line_index( it_zahlen[ table_line = iv_gesucht ] ) — für die Prüfung ist die wörtliche Variante aber richtig.

</details>

### Interne Tabelle filtern und aufsummieren

*Thema: ABAP Core*

Du hast eine interne Tabelle `orders` mit den Feldern `customer_id`, `amount`, `status`.

Schreibe ABAP-Code, der die **Summe aller Beträge** berechnet, deren `status = 'OPEN'` ist — einmal klassisch mit LOOP, einmal mit einem modernen funktionalen Ausdruck.

<details><summary>Hinweis 1</summary>

Die klassische Variante braucht eine Summenvariable und LOOP AT ... WHERE.

</details>

<details><summary>Hinweis 2</summary>

Für die moderne Variante: REDUCE mit INIT, FOR und NEXT — und einer WHERE-Bedingung im FOR-Teil.

</details>

<details><summary>Lösung</summary>

```abap
" Klassisch
DATA total TYPE p LENGTH 13 DECIMALS 2.
LOOP AT orders INTO DATA(order) WHERE status = 'OPEN'.
  total = total + order-amount.
ENDLOOP.

" Modern (funktional)
DATA(total_modern) = REDUCE p_amount(
  INIT sum = VALUE p_amount( )
  FOR order IN orders WHERE ( status = 'OPEN' )
  NEXT sum = sum + order-amount ).
```

Beachte die Klammern um die WHERE-Bedingung im FOR-Ausdruck — ein häufiger Syntaxfehler bei Einsteigern.

</details>

### JOIN mit Filter schreiben

*Thema: SQL*

Tabellen: `kunde(id, name, land)` und `bestellung(id, kunde_id, betrag)`.

Schreibe eine SQL-Abfrage, die **Name und Bestellbetrag aller deutschen Kunden** liefert — inklusive Kunden, die noch *keine* Bestellung haben.

<details><summary>Hinweis 1</summary>

Welcher JOIN-Typ behält Zeilen der linken Tabelle, auch wenn rechts kein Treffer existiert?

</details>

<details><summary>Hinweis 2</summary>

Die Filterbedingung auf das Land gehört in die WHERE-Klausel, weil sie sich auf die linke (immer vorhandene) Tabelle bezieht.

</details>

<details><summary>Lösung</summary>

```sql
SELECT k.name, b.betrag
FROM kunde k
LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id
WHERE k.land = 'DE';
```

Achtung Prüfungsfalle: Stünde die Filterbedingung auf die RECHTE Tabelle in der WHERE-Klausel (z.B. b.betrag > 100), würde der LEFT JOIN faktisch zu einem INNER JOIN, weil NULL-Zeilen herausgefiltert werden. Solche Bedingungen gehören in die ON-Klausel.

</details>

### Erste eigene Klasse

*Thema: ABAP OO*

Erstelle eine ABAP-Klasse `ZCL_RECHNUNG` mit:

-   privatem Attribut `netto` (Typ p, 2 Dezimalstellen)
-   Konstruktor, der den Nettobetrag entgegennimmt
-   öffentlicher Methode `get_brutto()`, die den Bruttobetrag mit 19% MwSt zurückgibt

<details><summary>Hinweis 1</summary>

Die Klassendefinition braucht PUBLIC SECTION und PRIVATE SECTION; Attribute, die niemand von außen ändern soll, gehören in die PRIVATE SECTION.

</details>

<details><summary>Hinweis 2</summary>

Ein Rückgabewert einer Methode wird mit RETURNING VALUE(rv_name) TYPE ... deklariert.

</details>

<details><summary>Hinweis 3</summary>

Clean ABAP: FINAL CREATE PUBLIC ist der Standard-Fall für neue Klassen.

</details>

<details><summary>Lösung</summary>

```abap
CLASS zcl_rechnung DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS constructor IMPORTING iv_netto TYPE p LENGTH 13 DECIMALS 2.
    METHODS get_brutto RETURNING VALUE(rv_brutto) TYPE p LENGTH 13 DECIMALS 2.
  PRIVATE SECTION.
    DATA netto TYPE p LENGTH 13 DECIMALS 2.
ENDCLASS.

CLASS zcl_rechnung IMPLEMENTATION.
  METHOD constructor.
    netto = iv_netto.
  ENDMETHOD.

  METHOD get_brutto.
    rv_brutto = netto * '1.19'.
  ENDMETHOD.
ENDCLASS.
```

Der Dezimalwert wird als Literal in Hochkommata geschrieben ('1.19'), sonst interpretiert ABAP ihn als Fließkommazahl mit möglichen Rundungsabweichungen — bei Geldbeträgen relevant.

</details>

## Fortgeschritten

### Bubble-Sort im Pseudocode

*Thema: Pseudocode*

Schreibe den **Bubble-Sort-Algorithmus** in Pseudocode (aufsteigend sortieren).

Zusatzfrage: Welche Komplexitätsklasse hat Bubble-Sort im schlechtesten Fall — und wie viele Vergleiche finden bei n = 5 Elementen in der einfachen Variante statt?

<details><summary>Hinweis 1</summary>

Bubble-Sort braucht zwei verschachtelte Schleifen: die äußere zählt die Durchläufe, die innere vergleicht benachbarte Elemente.

</details>

<details><summary>Hinweis 2</summary>

Zum Tauschen zweier Werte brauchst du eine Hilfsvariable (temp).

</details>

<details><summary>Hinweis 3</summary>

Zwei verschachtelte Schleifen über dieselbe Menge → quadratische Komplexität.

</details>

<details><summary>Lösung</summary>

```pseudocode
PROCEDURE bubbleSort(zahlen)
  n <- LAENGE(zahlen)
  FOR i <- 1 TO n - 1 DO
    FOR j <- 1 TO n - i DO
      IF zahlen[j] > zahlen[j + 1] THEN
        temp <- zahlen[j]
        zahlen[j] <- zahlen[j + 1]
        zahlen[j + 1] <- temp
      ENDIF
    ENDFOR
  ENDFOR
ENDPROCEDURE
```

Komplexität: O(n²) im schlechtesten Fall. Bei n=5 in der optimierten Variante (innere Schleife bis n-i): 4+3+2+1 = 10 Vergleiche. In der naiven Variante (innere Schleife immer bis n-1): 4·4 = 16.

</details>

### Refactoring: Schleife zu funktionalem Ausdruck

*Thema: ABAP Core*

Refaktoriere diesen Code mit modernen ABAP-Ausdrücken — Ziel: keine explizite Schleife mehr, gleiche Funktionalität:

```
DATA lt_namen TYPE STANDARD TABLE OF string. LOOP AT lt_kunden INTO DATA(ls_kunde). IF ls_kunde-aktiv = abap_true. APPEND ls_kunde-name TO lt_namen. ENDIF. ENDLOOP.
```

<details><summary>Hinweis 1</summary>

Der VALUE-Konstruktor kann mit FOR über eine Quelltabelle iterieren und dabei eine neue Tabelle aufbauen.

</details>

<details><summary>Hinweis 2</summary>

Eine Bedingung im FOR-Teil wird mit WHERE ( ... ) in Klammern geschrieben.

</details>

<details><summary>Hinweis 3</summary>

Bei einer Tabelle elementarer Typen (string) ist die Zeile selbst der Wert — die runde Klammer enthält dann direkt den Ausdruck.

</details>

<details><summary>Lösung</summary>

```abap
DATA(lt_namen) = VALUE string_table(
  FOR kunde IN lt_kunden WHERE ( aktiv = abap_true )
  ( kunde-name ) ).
```

Drei Zeilen statt sieben, ohne Zwischenzustand. Wichtig: Diese Form ist nicht automatisch schneller — der Gewinn ist Lesbarkeit und weniger Fehlerquellen (keine vergessene Initialisierung, kein falsch platziertes APPEND).

</details>

### LOOP-in-LOOP entschärfen

*Thema: Performance*

Dieser Code hat bei 10.000 Bestellungen und 5.000 Kunden ein massives Performance-Problem. Erkläre **warum** und schreibe eine optimierte Variante:

```
LOOP AT lt_bestellungen INTO DATA(ls_best). LOOP AT lt_kunden INTO DATA(ls_kunde). IF ls_kunde-id = ls_best-kunde_id. ls_best-kundenname = ls_kunde-name. MODIFY lt_bestellungen FROM ls_best. EXIT. ENDIF. ENDLOOP. ENDLOOP.
```

<details><summary>Hinweis 1</summary>

Rechne die Zugriffe durch: Wie oft läuft die innere Schleife im ungünstigsten Fall insgesamt?

</details>

<details><summary>Hinweis 2</summary>

Ein Sekundärschlüssel (HASHED KEY) auf der Kundentabelle erlaubt einen Zugriff in konstanter Zeit.

</details>

<details><summary>Hinweis 3</summary>

Mit ASSIGNING FIELD-SYMBOL vermeidest du zusätzlich das teure MODIFY.

</details>

<details><summary>Lösung</summary>

```abap
" Kundentabelle mit HASHED-Sekundaerschluessel deklarieren:
TYPES tt_kunden TYPE STANDARD TABLE OF ty_kunde
  WITH EMPTY KEY
  WITH UNIQUE HASHED KEY by_id COMPONENTS id.

LOOP AT lt_bestellungen ASSIGNING FIELD-SYMBOL(<best>).
  TRY.
      <best>-kundenname = lt_kunden[ KEY by_id id = <best>-kunde_id ]-name.
    CATCH cx_sy_itab_line_not_found.
      CLEAR <best>-kundenname.
  ENDTRY.
ENDLOOP.
```

Vorher: bis zu 10.000 × 5.000 = 50 Mio. Vergleiche — O(n·m). Nachher: 10.000 Hash-Zugriffe in O(1) — also O(n). Zusätzlich entfällt das MODIFY, weil das Field-Symbol direkt die Originalzeile ändert.

</details>

### Strategy-Pattern implementieren

*Thema: ABAP OO*

Implementiere eine Rabattberechnung nach dem **Strategy-Pattern**:

-   Interface `ZIF_RABATT` mit Methode `berechne( iv_betrag )` → Rückgabe Rabattbetrag
-   Zwei Implementierungen: Standardkunde (5%) und Premiumkunde (15%)
-   Aufrufender Code, der je nach Kundentyp die passende Strategie wählt

<details><summary>Hinweis 1</summary>

Das Interface deklariert nur die Methodensignatur, keine Implementierung.

</details>

<details><summary>Hinweis 2</summary>

Beide Klassen binden das Interface über INTERFACES zif_rabatt ein und implementieren die Methode mit dem Präfix zif_rabatt~.

</details>

<details><summary>Hinweis 3</summary>

Im aufrufenden Code hältst du eine Referenzvariable vom Typ REF TO zif_rabatt — nicht vom Typ einer konkreten Klasse. Das ist der Kern des Musters.

</details>

<details><summary>Lösung</summary>

```abap
INTERFACE zif_rabatt PUBLIC.
  METHODS berechne IMPORTING iv_betrag TYPE p LENGTH 13 DECIMALS 2
                   RETURNING VALUE(rv_rabatt) TYPE p LENGTH 13 DECIMALS 2.
ENDINTERFACE.

CLASS zcl_rabatt_standard DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES zif_rabatt.
ENDCLASS.
CLASS zcl_rabatt_standard IMPLEMENTATION.
  METHOD zif_rabatt~berechne.
    rv_rabatt = iv_betrag * '0.05'.
  ENDMETHOD.
ENDCLASS.

" zcl_rabatt_premium analog mit '0.15'

" Aufrufender Code:
DATA(lo_rabatt) = COND #( WHEN kundentyp = 'PREMIUM'
                           THEN NEW zcl_rabatt_premium( )
                           ELSE NEW zcl_rabatt_standard( ) ).
DATA(rabatt) = lo_rabatt->berechne( betrag ).
```

Der entscheidende Punkt: Der Code nach der COND-Zuweisung kennt den Kundentyp nicht mehr. Ein neuer Rabatttyp erfordert nur eine neue Klasse plus eine Zeile in der Auswahl — das Open/Closed-Prinzip in der Praxis.

</details>

### CDS-View mit Assoziation und Statustext

*Thema: CDS*

Modelliere eine CDS-View `ZI_BestellungMitKunde`:

-   Basis: Tabelle `zorder` (Felder: order\_id, customer\_id, amount, status)
-   Assoziation zur View `ZI_Customer` über `customer_id`
-   Ein berechnetes Feld `status_text`: 'A' → 'Offen', 'C' → 'Abgeschlossen', sonst 'Unbekannt'
-   Mit Berechtigungsprüfung

<details><summary>Hinweis 1</summary>

Die moderne Syntax beginnt mit define view entity — nicht mit dem veralteten define view.

</details>

<details><summary>Hinweis 2</summary>

Assoziationen werden zwischen der select-from-Klausel und der geschweiften Feldliste deklariert.

</details>

<details><summary>Hinweis 3</summary>

In der ON-Bedingung referenzierst du das eigene Feld über $projection.<feldname>. Vergiss nicht, die Assoziation selbst in der Feldliste zu exponieren.

</details>

<details><summary>Lösung</summary>

```cds
@AccessControl.authorizationCheck: #CHECK
@EndUserText.label: 'Bestellung mit Kunde'
define view entity ZI_BestellungMitKunde
  as select from zorder as Order
  association [1..1] to ZI_Customer as _Customer
    on $projection.customer_id = _Customer.customer_id
{
  key Order.order_id,
      Order.customer_id,
      Order.amount,
      case Order.status
        when 'A' then 'Offen'
        when 'C' then 'Abgeschlossen'
        else 'Unbekannt'
      end as status_text,
      _Customer
}
```

Wird _Customer in der Feldliste exponiert, können Konsumenten über den Pfad (z.B. _Customer.name) auf Kundenfelder zugreifen — der JOIN entsteht dann erst bei tatsächlichem Zugriff (Lazy Evaluation).

</details>

### Aggregation mit HAVING und Subquery

*Thema: SQL*

Tabellen: `kunde(id, name)`, `bestellung(id, kunde_id, betrag, datum)`.

Schreibe eine Abfrage, die die **Namen aller Kunden** liefert, die im Jahr 2026 **mehr als 3 Bestellungen** mit einem **Gesamtbetrag über 5000** aufgegeben haben — sortiert nach Gesamtbetrag absteigend.

<details><summary>Hinweis 1</summary>

Du brauchst GROUP BY auf Kundenebene und zwei Bedingungen, die sich auf Aggregatwerte beziehen.

</details>

<details><summary>Hinweis 2</summary>

Die Jahresbedingung filtert einzelne Zeilen (vor der Gruppierung) → WHERE. Anzahl und Summe filtern Gruppen (nach der Gruppierung) → HAVING.

</details>

<details><summary>Hinweis 3</summary>

Der Kundenname kommt aus einem JOIN und muss mit in die GROUP-BY-Klausel.

</details>

<details><summary>Lösung</summary>

```sql
SELECT k.name, SUM(b.betrag) AS gesamt, COUNT(*) AS anzahl
FROM kunde k
INNER JOIN bestellung b ON b.kunde_id = k.id
WHERE b.datum BETWEEN '2026-01-01' AND '2026-12-31'
GROUP BY k.id, k.name
HAVING COUNT(*) > 3 AND SUM(b.betrag) > 5000
ORDER BY gesamt DESC;
```

Typische Prüfungsfalle: Die Jahresbedingung in HAVING statt WHERE zu schreiben ist zwar teils syntaktisch möglich, aber logisch falsch bzw. ineffizient — sie filtert einzelne Zeilen, nicht Gruppen.

</details>

## Experte

### Behavior Definition mit Determination & Validation

*Thema: RAP*

Entwirf die **Behavior Definition** für ein Business Object `ZI_Order` (managed, draft-fähig) mit folgenden Anforderungen:

-   Standard-CRUD, order\_id ist readonly
-   Beim Sichern soll `total` automatisch aus `amount` + 19% MwSt berechnet werden
-   Vor dem Sichern muss geprüft werden, dass `amount` größer 0 ist
-   Eine Aktion `release` soll die Bestellung freigeben
-   Optimistic Concurrency über einen Zeitstempel

Schreibe zusätzlich die Implementierung der Validierung (Grundgerüst mit failed/reported).

<details><summary>Hinweis 1</summary>

Determinations und Validations werden im Rumpf der Behavior Definition deklariert, mit Angabe des Auslösezeitpunkts (on save) und der auslösenden Operationen.

</details>

<details><summary>Hinweis 2</summary>

Für Optimistic Concurrency brauchst du eine etag-master-Angabe auf ein Zeitstempelfeld, das in der CDS-View mit @Semantics.systemDateTime.lastChangedAt: true annotiert ist.

</details>

<details><summary>Hinweis 3</summary>

In der Validierungsimplementierung liest du die betroffenen Instanzen mit READ ENTITIES ... IN LOCAL MODE, prüfst sie, und füllst bei Fehlern failed-order und reported-order.

</details>

<details><summary>Lösung</summary>

```rap
managed implementation in class zbp_i_order unique;
strict ( 2 );

define behavior for ZI_Order alias Order
persistent table zorder
draft table zorder_d
lock master
total etag LastChangedAt
etag master LocalLastChangedAt
authorization master ( instance )
with draft
{
  create; update; delete;
  field ( readonly ) order_id;

  determination calculate_total on save { create; update; }
  validation check_amount on save { create; update; }
  action release result [1] $self;

  mapping for zorder corresponding;
}

" --- Implementierung der Validierung ---
METHOD check_amount.
  READ ENTITIES OF zi_order IN LOCAL MODE
    ENTITY Order
      FIELDS ( amount )
      WITH CORRESPONDING #( keys )
    RESULT DATA(orders).

  LOOP AT orders INTO DATA(order).
    IF order-amount <= 0.
      APPEND VALUE #( %tky = order-%tky ) TO failed-order.
      APPEND VALUE #( %tky = order-%tky
                      %msg = new_message_with_text(
                               severity = if_abap_behv_message=>severity-error
                               text     = 'Betrag muss groesser 0 sein' )
                    ) TO reported-order.
    ENDIF.
  ENDLOOP.
ENDMETHOD.
```

Zentral: Fehler werden NICHT als Exception geworfen, sondern in failed (welche Instanz ist fehlgeschlagen) und reported (welche Meldung wird dem Nutzer angezeigt) geschrieben. Das Framework wertet beides aus und übersetzt es automatisch in UI-Meldungen.

</details>

### CDS-Ausdruck, virtuelles Element oder Table Function?

*Thema: Architektur*

**Entscheidungsaufgabe.** Für drei Anforderungen sollst du jeweils begründen, welches CDS-Mittel das richtige ist — einfacher CDS-Ausdruck, virtuelles Element oder Table Function:

1.  Ein Feld „Rabattklasse", das aus dem Umsatz per Schwellwerten abgeleitet wird (<1000 = C, <5000 = B, sonst A)
2.  Ein Feld „Bonitätsscore", das über einen externen Service pro Kunde berechnet wird
3.  Eine Auswertung, die je Kunde iterativ die längste ununterbrochene Bestellserie ermittelt

Begründe jeweils *warum* — insbesondere im Hinblick auf Optimierbarkeit durch die Datenbank.

<details><summary>Hinweis 1</summary>

Frage dich bei jeder Anforderung: Lässt sich das rein mengenbasiert und deklarativ ausdrücken?

</details>

<details><summary>Hinweis 2</summary>

Virtuelle Elemente werden pro angezeigter Zeile in ABAP berechnet — sie sind nicht filterbar/sortierbar auf Datenbankebene.

</details>

<details><summary>Hinweis 3</summary>

Iterative Algorithmen über Zeilenreihenfolge sind der klassische Anwendungsfall für SQLScript und damit Table Functions.

</details>

<details><summary>Lösung</summary>

```begründung
1) Rabattklasse  -> Einfacher CDS-Ausdruck (case/when)
   Reine Mengenlogik auf vorhandenen Spalten. Bleibt deklarativ,
   voll pushdown-faehig, filter- und sortierbar auf DB-Ebene.

2) Bonitaetsscore -> Virtuelles Element (@ObjectModel.virtualElement)
   Wert stammt aus einem externen Service, existiert also gar nicht
   in der Datenbank. Bewusste Konsequenz: nicht filterbar/sortierbar
   auf DB-Ebene, Berechnung nur fuer die angezeigten Zeilen.

3) Laengste Bestellserie -> CDS Table Function (AMDP/SQLScript)
   Iterative Logik ueber die Zeilenreihenfolge laesst sich in reinem
   CDS nicht sauber ausdruecken. SQLScript kann das nah an den Daten
   berechnen. Preis: HANA-Abhaengigkeit und geringere Optimierbarkeit.
```

Die Eskalationsleiter lautet immer: erst deklarativer CDS-Ausdruck, dann virtuelles Element (wenn der Wert gar nicht aus der DB stammen kann), erst zuletzt Table Function/AMDP. Jede Stufe nach unten kostet Optimierbarkeit durch den Datenbank-Optimizer.

</details>

### Nicht testbare Klasse refactoren + Unit-Test

*Thema: Test & OO*

Diese Klasse ist nicht testbar. Analysiere **warum**, refaktoriere sie mit Dependency Injection, und schreibe einen ABAP-Unit-Test mit einem Test Double:

```
CLASS zcl_order_processor DEFINITION PUBLIC FINAL CREATE PUBLIC. PUBLIC SECTION. METHODS process IMPORTING iv_order_id TYPE char10 RETURNING VALUE(rv_ok) TYPE abap_bool. ENDCLASS. CLASS zcl_order_processor IMPLEMENTATION. METHOD process. SELECT SINGLE * FROM zorder WHERE order_id = @iv_order_id INTO @DATA(order). IF order-amount > 0. NEW zcl_mail_sender( )->send( order-email ). rv_ok = abap_true. ENDIF. ENDMETHOD. ENDCLASS.
```

<details><summary>Hinweis 1</summary>

Zwei harte Abhängigkeiten machen den Test unmöglich: ein direkter Datenbankzugriff und eine direkt instanziierte Klasse (NEW im Methodenrumpf).

</details>

<details><summary>Hinweis 2</summary>

Extrahiere beide hinter Interfaces (z.B. ZIF_ORDER_READER und ZIF_MAIL_SENDER) und injiziere sie über den Konstruktor.

</details>

<details><summary>Hinweis 3</summary>

Im Test erzeugst du Test Doubles mit CL_ABAP_TESTDOUBLE, konfigurierst deren Rückgabewerte und übergibst sie dem Konstruktor.

</details>

<details><summary>Lösung</summary>

```abap
CLASS zcl_order_processor DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    METHODS constructor IMPORTING io_reader TYPE REF TO zif_order_reader
                                  io_mailer TYPE REF TO zif_mail_sender.
    METHODS process IMPORTING iv_order_id TYPE char10
                    RETURNING VALUE(rv_ok) TYPE abap_bool.
  PRIVATE SECTION.
    DATA reader TYPE REF TO zif_order_reader.
    DATA mailer TYPE REF TO zif_mail_sender.
ENDCLASS.

CLASS zcl_order_processor IMPLEMENTATION.
  METHOD constructor.
    reader = io_reader.
    mailer = io_mailer.
  ENDMETHOD.

  METHOD process.
    DATA(order) = reader->read( iv_order_id ).
    IF order-amount > 0.
      mailer->send( order-email ).
      rv_ok = abap_true.
    ENDIF.
  ENDMETHOD.
ENDCLASS.

" --- Unit-Test ---
CLASS ltc_processor DEFINITION FOR TESTING
  DURATION SHORT RISK LEVEL HARMLESS.
  PRIVATE SECTION.
    METHODS sends_mail_for_valid_order FOR TESTING.
ENDCLASS.

CLASS ltc_processor IMPLEMENTATION.
  METHOD sends_mail_for_valid_order.
    DATA(lo_reader) = CAST zif_order_reader(
      cl_abap_testdouble=>create( 'zif_order_reader' ) ).
    cl_abap_testdouble=>configure_call( lo_reader
      )->returning( VALUE ty_order( amount = 100 email = 'a@b.de' ) ).
    lo_reader->read( '4711' ).

    DATA(lo_mailer) = CAST zif_mail_sender(
      cl_abap_testdouble=>create( 'zif_mail_sender' ) ).

    DATA(cut) = NEW zcl_order_processor( io_reader = lo_reader
                                          io_mailer = lo_mailer ).

    cl_abap_unit_assert=>assert_true( cut->process( '4711' ) ).
  ENDMETHOD.
ENDCLASS.
```

Kernaussage: Der Test wurde nicht durch ein Test-Werkzeug möglich, sondern durch besseres Design. Genau deshalb ist schwere Testbarkeit ein zuverlässiges Warnsignal für Architekturprobleme — nicht ein Problem des Testframeworks.

</details>

### Dynamisches SQL absichern

*Thema: Security*

Dieser Code erlaubt es Anwendern, eine Sortierspalte und einen Suchbegriff anzugeben. Er enthält **zwei** Sicherheitsprobleme. Finde beide und schreibe eine sichere Variante:

```
DATA(lv_where) = |name LIKE '%{ iv_suche }%'|. DATA(lv_order) = iv_sortierfeld. SELECT * FROM kunde WHERE (lv_where) ORDER BY (lv_order) INTO TABLE @DATA(lt_result).
```

<details><summary>Hinweis 1</summary>

Problem 1 betrifft den Suchbegriff: Er wird als Bestandteil der Abfrage selbst behandelt, nicht als Datenwert.

</details>

<details><summary>Hinweis 2</summary>

Problem 2 betrifft das Sortierfeld: Ein dynamischer Spaltenname lässt sich nicht als Parameter übergeben — was bleibt als Absicherung?

</details>

<details><summary>Hinweis 3</summary>

Für dynamische Strukturbestandteile (Spalten-/Tabellennamen) ist eine Freigabeliste (Whitelist) die übliche Lösung.

</details>

<details><summary>Lösung</summary>

```abap
" Problem 1: Suchbegriff wird als Code statt als Datenwert eingebaut
"            -> SQL-Injection moeglich
" Problem 2: Sortierfeld kommt ungeprueft aus Nutzereingabe
"            -> beliebige Spalten adressierbar

" Sichere Variante:
CONSTANTS: BEGIN OF erlaubte_felder,
             name TYPE string VALUE 'NAME',
             ort  TYPE string VALUE 'ORT',
           END OF erlaubte_felder.

" 1) Sortierfeld gegen Freigabeliste pruefen
DATA(lv_order) = COND string(
  WHEN iv_sortierfeld = erlaubte_felder-name THEN 'NAME'
  WHEN iv_sortierfeld = erlaubte_felder-ort  THEN 'ORT'
  ELSE 'NAME' ).   " sicherer Standardwert

" 2) Suchbegriff als echte Host-Variable uebergeben
DATA(lv_pattern) = |%{ iv_suche }%|.

SELECT * FROM kunde
  WHERE name LIKE @lv_pattern
  ORDER BY (lv_order)
  INTO TABLE @DATA(lt_result).
```

Merksatz: Datenwerte gehören immer in Host-Variablen (@). Strukturbestandteile wie Spalten- oder Tabellennamen können technisch keine Parameter sein — sie brauchen deshalb zwingend eine Freigabeliste mit sicherem Standardwert.

</details>

### Extensibility-Strategie begründen

*Thema: Architektur*

**Konzeptaufgabe (typisches Architektur-Gespräch).** Ein Kunde mit S/4HANA möchte drei Erweiterungen. Entscheide für jede: Key-User-Extensibility, Developer-Extensibility (Embedded Steampunk) oder Side-by-Side auf der BTP — und begründe mit Blick auf Upgrade-Fähigkeit und Governance:

1.  Ein zusätzliches Feld „Interne Projektnummer" auf der Bestellung, das auch in Listen angezeigt werden soll
2.  Eine komplexe Preisfindungslogik mit Zugriff auf mehrere S/4-Tabellen, die bei jedem Bestellsichern laufen muss
3.  Ein kundenspezifisches Partnerportal mit eigener Oberfläche, das Bestellstatus anzeigt und externe Lieferanten anbindet

<details><summary>Hinweis 1</summary>

Frage 1: Wie tief greift die Anforderung in Logik ein — reicht ein Feld plus UI-Anzeige?

</details>

<details><summary>Hinweis 2</summary>

Frage 2: Braucht es vollen ABAP-Sprachumfang und Transaktionsnähe zum Kernprozess?

</details>

<details><summary>Hinweis 3</summary>

Frage 3: Wer sind die Nutzer, und soll das Kernsystem für externe Zugriffe geöffnet werden?

</details>

<details><summary>Lösung</summary>

```begründung
1) Projektnummer -> KEY-USER-EXTENSIBILITY
   Custom Field per Guided UI, danach in der Fiori-App einblenden.
   Kein Entwicklercode noetig, upgradesicher, geringste Governance-Last.

2) Preisfindungslogik -> DEVELOPER-EXTENSIBILITY (Embedded Steampunk)
   Braucht vollen Sprachumfang und muss transaktional im Save-Zyklus
   laufen -> gehoert ins Kernsystem, aber ausschliesslich gegen
   released APIs (Clean Core). Umsetzung ueber einen freigegebenen BAdI
   bzw. RAP-Erweiterung, nicht als Modifikation.

3) Partnerportal -> SIDE-BY-SIDE (SAP BTP)
   Externe Nutzer, eigene UX, eigener Lebenszyklus. Anbindung ueber
   released APIs und RAP Business Events. Haelt externe Zugriffe und
   individuelle Logik aus dem Kernsystem heraus und schuetzt dessen
   Upgrade-Faehigkeit.
```

Die Leitfrage bei solchen Entscheidungen ist immer dieselbe: Wie viel individuelle Logik muss das Kernsystem tragen — und rechtfertigt der fachliche Nutzen das Upgrade-Risiko? Je weiter außen die Erweiterung liegt, desto günstiger sind spätere Releasewechsel.

</details>
