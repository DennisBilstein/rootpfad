# Fehleranalyse in Produktion

*Debugging & fremden Code verstehen · ca. 8 Min.*

Wenn in Produktion etwas bricht, zählt eine geordnete Vorgehensweise mehr als Code-Wissen:

-   **ST22 (Dump-Analyse)**: Jeder Kurzdump nennt Ausnahme, Programm, Zeile und den Inhalt relevanter Variablen. Die drei Fragen sind immer: Welche Exception? In welcher Zeile? Und vor allem — *welche Daten* haben ihn ausgelöst? Der Dump enthält den Aufrufstack, lies ihn von unten nach oben.
-   **Application Log (SLG1 / Klasse `if_bali_log`)**: Das offizielle Protokollwerkzeug für fachliche Meldungen aus Massenläufen. Wer stattdessen mit `WRITE` protokolliert, hat in Hintergrundverarbeitung nichts, worauf er später zugreifen kann.
-   **Externe Breakpoints** erlauben Debugging eines Prozesses, der unter einem anderen Benutzer läuft (z. B. ein Webservice-Aufruf) — gefiltert auf einen Benutzer, damit nicht das halbe System stehen bleibt.

Für strukturierte, auswertbare Protokolle gilt dieselbe Regel wie in jeder anderen Sprache: Kontext mitloggen (Belegnummer, Benutzer, Zeitpunkt), nicht nur „Fehler aufgetreten".

```abap
" Fachliche Meldung ins Application Log statt ins Leere schreiben
DATA(lo_log) = cl_bali_log=>create( ).
lo_log->add_item( cl_bali_message_setter=>create(
  severity = if_bali_constants=>c_severity_error
  id = 'ZORDER' number = '001' variable1 = lv_order_id ) ).
cl_bali_log_db=>get_instance( )->save_log( log = lo_log ).
```

> **Tipp:** Ein Dump in Produktion ist keine Katastrophe, sondern ein Geschenk: Er enthält den vollständigen Zustand zum Absturzzeitpunkt. Der klassische Anfängerfehler ist, ihn nur zu überfliegen und sofort zu „reparieren". Lies ihn ganz — insbesondere die ausgelösten Datenwerte. In den allermeisten Fällen ist der Code nicht generell falsch, sondern er hat eine Datenkonstellation nicht bedacht. Genau diese Konstellation gehört anschließend als Testfall in einen ABAP-Unit-Test.

## Kontrollfragen

**1. Was ist beim Auswerten eines Kurzdumps (ST22) am wichtigsten?**

- [ ] Nur die Programmzeile, sonst nichts
- [x] Exception, Zeile und vor allem die auslösenden Datenwerte
- [ ] Die Farbe der Fehlermeldung

*Erklärung:* Meist ist nicht der Code generell falsch, sondern eine bestimmte Datenkonstellation wurde nicht bedacht — die gehört danach als Testfall abgesichert.

**2. Womit protokolliert man fachliche Meldungen aus einem Hintergrundlauf korrekt?**

- [ ] Mit WRITE-Ausgaben
- [x] Über das Application Log
- [ ] Über Kommentare im Quelltext

*Erklärung:* WRITE-Ausgaben sind in der Hintergrundverarbeitung praktisch nicht auswertbar — das Application Log ist das dafür vorgesehene Werkzeug.
