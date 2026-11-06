# HTTP und JSON in ABAP Cloud sicher konsumieren

Modul: abap-m19 · 35 Minuten

Ein REST-Aufruf hat mehrere Fehlergrenzen: Ziel und Authentifizierung können falsch konfiguriert sein, die HTTP-Anfrage kann scheitern, der Server kann einen fachlichen Fehler melden und die Antwort kann vom erwarteten Datenmodell abweichen. Behandle diese Grenzen getrennt. JSON ist ein Datenformat, kein Beweis für fachlich erfolgreiche Verarbeitung. Auch eine Antwort mit gültigem JSON kann einen Fehler enthalten; eine HTML-Fehlerseite darf nicht ungeprüft an den JSON-Parser gehen.

Im ABAP-Cloud-Beispiel wird das Ziel über Communication Management konfiguriert. Der Outbound Service beschreibt den ausgehenden Dienst, das Communication Scenario bündelt die Kommunikationsanforderung, das Communication System das Ziel und das Communication Arrangement die konkrete Zuordnung. Der ABAP-Code ermittelt daraus eine Destination und erstellt einen HTTP-Client. Geheimnisse gehören nicht in den Quellcode oder in ein öffentliches Repository. Für Cloud-Entwicklung prüfst du die Freigabe der verwendeten Klassen im Zielsystem.

Beispiel: Ein freigegebener Übungsdienst liefert {"product":"P-17","quantity":8}. Du führst zunächst einen GET aus und akzeptierst nur erwartete erfolgreiche Statuscodes. Danach wird der JSON-Text in eine passende ABAP-Struktur übertragen und fachlich validiert: Ist die Produktkennung vorhanden, und liegt die Menge im erlaubten Bereich? Das folgende Lehrfragment zeigt HTTP und Mapping, setzt aber eine konfigurierte Kommunikationsvereinbarung voraus. Es ist nicht in einem ABAP-System ausgeführt worden; der breite Exception-Catch dient hier der Konsolendemonstration, nicht als fertige produktive Fehlerstrategie.

Praxisauftrag: Teste drei Fälle: erfolgreiche Antwort, HTTP 401 und eine syntaktisch defekte JSON-Antwort. Dokumentiere pro Fall die zuständige Fehlergrenze und welche Informationen ohne Geheimnisse protokolliert werden dürfen. Ohne geeigneten Tenant übst du nur das Mapping mit einem lokalen JSON-String und beschreibst die HTTP-Fälle schriftlich. Der verlinkte SAP-Leitfaden ist frei lesbar, schließt die Durchführung im Trial aber ausdrücklich aus; versprich deshalb keine kostenlose Live-Integration auf jedem ABAP-Trial.

```abap
" Lehrfragment innerhalb von IF_OO_ADT_CLASSRUN~MAIN.
" Voraussetzung: Z_PRODUCT_CS mit Z_PRODUCT_OB_REST ist konfiguriert.
TYPES: BEGIN OF ty_product,
         product  TYPE string,
         quantity TYPE i,
       END OF ty_product.
DATA result TYPE ty_product.
TRY.
    DATA(destination) = cl_http_destination_provider=>create_by_comm_arrangement(
      comm_scenario = 'Z_PRODUCT_CS'
      service_id = 'Z_PRODUCT_OB_REST' ).
    DATA(client) = cl_web_http_client_manager=>create_by_http_destination( destination ).
    client->get_http_request( )->set_header_field(
      i_name = 'Accept' i_value = 'application/json' ).
    DATA(response) = client->execute( if_web_http_client=>get ).
    DATA(status) = response->get_status( ).
    IF status-code < 200 OR status-code >= 300.
      out->write( |HTTP-Fehler { status-code }| ).
      RETURN.
    ENDIF.
    xco_cp_json=>data->from_string( response->get_text( )
      )->write_to( REF #( result ) ).
    IF result-product IS INITIAL OR result-quantity < 0.
      out->write( 'Antwort fachlich ungueltig' ).
      RETURN.
    ENDIF.
    out->write( result ).
  CATCH cx_root.
    out->write( 'Aufruf oder Verarbeitung fehlgeschlagen; sicher diagnostizieren.' ).
ENDTRY.
```

## Kontrollfragen

### Was prüfst du vor dem JSON-Mapping einer HTTP-Antwort?

- [ ] Nur die Länge des Klassennamens
- [x] Status und erwarteten Antworttyp
- [ ] Ob der Code schon committed ist

Transportfehler und ungeeignete Antwortinhalte müssen vor dem Mapping erkannt werden.

### Wo sollen Zugangsdaten für einen konfigurierten ausgehenden Dienst liegen?

- [x] In geeigneter geschützter Kommunikationskonfiguration
- [ ] Als Klartextkonstante im Quelltext
- [ ] In einer öffentlichen Quizantwort

Kommunikationsverwaltung und Berechtigungskonzept trennen Geheimnisse vom Anwendungscode.

### Kann das verlinkte SAP-REST-Tutorial laut seinen Voraussetzungen auf einem Trial durchgeführt werden?

- [ ] Ja, jede Variante funktioniert immer
- [ ] Nur wenn man den HTTP-Status ignoriert
- [x] Nein, es schließt Trial ausdrücklich aus

Frei lesbare Anleitung bedeutet nicht, dass ihre Systemvoraussetzungen im kostenlosen Trial erfüllt sind.

## Quellen und Zugang

- [SAP Developers: Call an External API and Parse the Response](https://developers.sap.com/tutorials/abap-environment-external-api/): Volltext frei gelesen; Voraussetzung ausdrücklich kein Trial, geeignete Laufzeit und Kommunikationsrechte erforderlich.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
