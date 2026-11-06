# Nummernkreise, Sperren und ihr Zusammenspiel

*Das SAP-Laufzeitmodell verstehen · ca. 8 Min.*

**Nummernkreise** (Number Ranges) vergeben fortlaufende Belegnummern. Der entscheidende Punkt: Sie werden bewusst *außerhalb* der LUW gezogen und nicht zurückgerollt. Ein Rollback gibt eine gezogene Nummer nicht zurück — deshalb entstehen Lücken, und deshalb ist „lückenlose Nummerierung" eine fachliche Anforderung mit echten technischen Konsequenzen (Stichwort Late Numbering aus Modul 12).

Beim Zusammenspiel von **Sperre und LUW** gilt die Reihenfolge: erst sperren (Enqueue), dann lesen, dann ändern, dann `COMMIT WORK` — und die Sperre wird üblicherweise *mit* dem Commit freigegeben. Wer zuerst liest und danach sperrt, hat ein Zeitfenster geöffnet, in dem ein anderer Nutzer dazwischengrätschen kann (Lost Update).

```abap
" Richtige Reihenfolge
CALL FUNCTION 'ENQUEUE_EZ_ORDER'
  EXPORTING order_id = lv_id
  EXCEPTIONS foreign_lock = 1 system_failure = 2.
IF sy-subrc <> 0.
  MESSAGE 'Beleg wird gerade bearbeitet' TYPE 'E'.
ENDIF.

SELECT SINGLE * FROM zorder WHERE order_id = @lv_id INTO @DATA(ls_order).
ls_order-status = 'C'.
UPDATE zorder FROM @ls_order.

COMMIT WORK AND WAIT.   " gibt die Sperre mit frei
```

> **Tipp:** Der Klassiker in Code-Reviews: erst SELECT, dann ENQUEUE. Sieht harmlos aus, ist aber eine Race Condition — zwischen Lesen und Sperren kann ein zweiter Nutzer denselben Satz ändern, und deine anschließende Änderung überschreibt seine spurlos. Sperren kommt immer VOR dem Lesen der Daten, die du ändern willst.

## Kontrollfragen

**1. Was passiert mit einer gezogenen Nummernkreisnummer bei einem ROLLBACK WORK?**

- [ ] Sie wird zurückgegeben und erneut vergeben
- [x] Sie bleibt verbraucht — es entsteht eine Lücke
- [ ] Der Rollback wird dadurch verhindert

*Erklärung:* Nummernkreise arbeiten bewusst außerhalb der LUW, damit sie unter Last performant bleiben — der Preis sind Lücken.

**2. In welcher Reihenfolge arbeitet man korrekt mit Sperren?**

- [ ] Lesen, ändern, sperren, committen
- [x] Sperren, lesen, ändern, committen
- [ ] Committen, sperren, lesen, ändern

*Erklärung:* Wer erst liest und danach sperrt, öffnet ein Zeitfenster für ein Lost Update durch einen parallelen Nutzer.
