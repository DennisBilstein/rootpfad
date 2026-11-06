# HTTP und REST aus ABAP heraus konsumieren

*Integration & Hintergrundverarbeitung · ca. 8 Min.*

Moderne Integration läuft zunehmend über HTTP/REST statt RFC. In ABAP Cloud ist dafür die Klasse `CL_WEB_HTTP_CLIENT` (bzw. der Factory-Aufruf über `cl_web_http_client_manager`) vorgesehen — die ältere `CL_HTTP_CLIENT` ist im Cloud-Modell nicht mehr freigegeben.

Wichtig: Zugangsdaten und Ziel-URLs gehören **nicht in den Code**, sondern in ein **Communication Arrangement** (Communication Scenario, System, User). Das ist nicht nur Governance-Kosmetik: So lässt sich dasselbe Coding ohne Änderung von Entwicklung nach Produktion transportieren, wo andere Endpunkte und Zugangsdaten hinterlegt sind.

```abap
TRY.
    DATA(lo_dest) = cl_http_destination_provider=>create_by_comm_arrangement(
                      comm_scenario  = 'ZCOMM_SCEN_PARTNER'
                      service_id     = 'ZSRV_ORDERS' ).

    DATA(lo_client) = cl_web_http_client_manager=>create_by_http_destination( lo_dest ).

    DATA(lo_request) = lo_client->get_http_request( ).
    lo_request->set_header_field( i_name = 'Accept' i_value = 'application/json' ).

    DATA(lo_response) = lo_client->execute( if_web_http_client=>get ).
    DATA(lv_json)     = lo_response->get_text( ).
    DATA(lv_code)     = lo_response->get_status( )-code.

  CATCH cx_http_dest_provider_error cx_web_http_client_error INTO DATA(lx).
    " Netz-/Konfigurationsfehler sauber behandeln, nicht verschlucken
ENDTRY.
```

> **Tipp:** Zwei Dinge, die bei Integrationen regelmäßig vergessen werden: erstens der HTTP-Statuscode — eine Antwort mit Code 500 ist technisch „erfolgreich empfangen", fachlich aber ein Fehlschlag. Zweitens Timeouts: Ein Partnersystem, das nicht antwortet, darf deinen Verbuchungsprozess nicht blockieren. Für JSON-Verarbeitung nutzt du /ui2/cl\_json oder XCO — kein selbstgebauter String-Parser.

## Kontrollfragen

**1. Wo gehören URL und Zugangsdaten einer externen Schnittstelle hin?**

- [ ] Als Konstanten in den ABAP-Code
- [x] In ein Communication Arrangement
- [ ] In die Tabellenpufferung

*Erklärung:* So bleibt derselbe Code über alle Systeme transportierbar, während Endpunkte und Credentials pro System konfiguriert werden.

**2. Welche Klasse ist im ABAP-Cloud-Modell für HTTP-Aufrufe vorgesehen?**

- [ ] CL_HTTP_CLIENT
- [x] CL_WEB_HTTP_CLIENT
- [ ] CL_GUI_HTML_VIEWER

*Erklärung:* CL_HTTP_CLIENT ist die ältere, in ABAP Cloud nicht freigegebene Variante.
