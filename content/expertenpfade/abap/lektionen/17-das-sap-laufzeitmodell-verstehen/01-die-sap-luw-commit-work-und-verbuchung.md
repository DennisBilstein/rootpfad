# Die SAP LUW: COMMIT WORK und Verbuchung

*Das SAP-Laufzeitmodell verstehen · ca. 10 Min.*

Das hier ist das Konzept, an dem die meisten Quereinsteiger scheitern — und zwar nicht mit einem Syntaxfehler, sondern mit inkonsistenten Daten in Produktion.

Eine **LUW** (Logical Unit of Work) ist eine fachlich unteilbare Einheit: entweder alle Änderungen werden geschrieben oder keine. Der Knackpunkt: Die **SAP-LUW** ist *nicht* dasselbe wie die Datenbank-LUW. ABAP sammelt Änderungen zunächst und schreibt sie erst bei `COMMIT WORK` gebündelt weg.

-   `COMMIT WORK` schließt die SAP-LUW ab und stößt die Verbuchung an.
-   `ROLLBACK WORK` verwirft alle vorgemerkten Änderungen.
-   **V1-Verbuchung** ist zeitkritisch und transaktional (Beleg schreiben), **V2** läuft nachgelagert für unkritische Statistik-Aktualisierungen.

Besonders tückisch sind **implizite Commits**: Ein Dialogschritt, eine Remote-Function-Call-Grenze oder eine Ausgabe an den Benutzer beendet die LUW, ohne dass du `COMMIT WORK` geschrieben hast. Genau dort entstehen halb geschriebene Belege.

```abap
" FALSCH: COMMIT innerhalb einer Schleife über BAPI-Aufrufe
LOOP AT positionen INTO DATA(pos).
  CALL FUNCTION 'BAPI_XY_CREATE' EXPORTING is_data = pos.
  COMMIT WORK.               " jede Position einzeln festgeschrieben
ENDLOOP.                     " -> Abbruch in der Mitte = halber Beleg

" RICHTIG: fachliche Einheit als Ganzes abschließen
LOOP AT positionen INTO DATA(pos2).
  CALL FUNCTION 'BAPI_XY_CREATE' EXPORTING is_data = pos2
    IMPORTING return = DATA(ls_return).
  IF ls_return-type CA 'EA'.
    CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.
    RETURN.
  ENDIF.
ENDLOOP.
CALL FUNCTION 'BAPI_TRANSACTION_COMMIT' EXPORTING wait = abap_true.
```

> **Tipp:** Die wichtigste Regel im Umgang mit BAPIs lautet: Ein BAPI committet nie selbst — das ist Aufgabe des Aufrufers über BAPI\_TRANSACTION\_COMMIT. Wer stattdessen ein nacktes COMMIT WORK in eine Schleife schreibt, produziert im Fehlerfall genau die Datenleichen, die später niemand mehr zuordnen kann. Und: WAIT = ABAP\_TRUE wartet, bis die Verbuchung wirklich durch ist — ohne das liest ein direkt folgender SELECT unter Umständen noch die alten Daten.

## Kontrollfragen

**1. Was leistet COMMIT WORK in der SAP-LUW?**

- [ ] Es schreibt sofort jede einzelne Anweisung in die Datenbank
- [x] Es schließt die logische Verarbeitungseinheit ab und stößt die Verbuchung an
- [ ] Es beendet das Programm

*Erklärung:* ABAP sammelt Änderungen und schreibt sie gebündelt bei COMMIT WORK — das ist der Unterschied zwischen SAP-LUW und Datenbank-LUW.

**2. Wer ist dafür zuständig, nach BAPI-Aufrufen festzuschreiben?**

- [ ] Das BAPI selbst
- [x] Der Aufrufer, über BAPI_TRANSACTION_COMMIT
- [ ] Die Datenbank automatisch nach 5 Sekunden

*Erklärung:* BAPIs committen bewusst nicht selbst, damit der Aufrufer mehrere Aufrufe zu einer fachlichen Einheit bündeln kann.
