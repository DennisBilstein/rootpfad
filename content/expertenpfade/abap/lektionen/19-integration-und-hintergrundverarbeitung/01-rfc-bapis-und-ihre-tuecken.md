# RFC, BAPIs und ihre Tücken

*Integration & Hintergrundverarbeitung · ca. 8 Min.*

Kaum ein SAP-System steht allein. **RFC** (Remote Function Call) ist der klassische Weg, Funktionsbausteine über Systemgrenzen aufzurufen; **BAPIs** sind standardisierte, freigegebene Geschäftsschnittstellen auf RFC-Basis.

Drei Dinge, die in der Praxis immer wieder schiefgehen:

-   **Fehler kommen nicht als Exception**, sondern in einer `RETURN`\-Tabelle vom Typ `BAPIRET2`. Wer die nicht auswertet, merkt vom Fehlschlag nichts — das Programm läuft fröhlich weiter.
-   **Commit-Verantwortung liegt beim Aufrufer** (siehe Modul 17) — `BAPI_TRANSACTION_COMMIT` nicht vergessen, sonst ist nach dem Programmende nichts gespeichert.
-   **Synchron vs. asynchron**: Ein synchroner RFC blockiert, bis das Zielsystem antwortet — bei Ausfall des Partners hängt dein Prozess. Für entkoppelte Szenarien gibt es qRFC/bgRFC bzw. in modernen Architekturen Events.

```abap
CALL FUNCTION 'BAPI_SALESORDER_CREATEFROMDAT2'
  EXPORTING order_header_in = ls_header
  IMPORTING salesdocument   = lv_vbeln
  TABLES    order_items_in  = lt_items
            return          = lt_return.

" Pflicht: RETURN-Tabelle auswerten
LOOP AT lt_return TRANSPORTING NO FIELDS WHERE type CA 'EA'.
  CALL FUNCTION 'BAPI_TRANSACTION_ROLLBACK'.
  RETURN.
ENDLOOP.

CALL FUNCTION 'BAPI_TRANSACTION_COMMIT' EXPORTING wait = abap_true.
```

> **Tipp:** Die Meldungstypen in BAPIRET2 sind A (Abbruch), E (Fehler), W (Warnung), I (Info) und S (Erfolg). Die Prüfung auf „Fehler" lautet deshalb TYPE CA 'EA' — nur auf 'E' zu prüfen übersieht Abbrüche. Dieser eine Buchstabe hat schon etliche stillschweigend fehlgeschlagene Massenläufe verursacht.

## Kontrollfragen

**1. Wie meldet ein BAPI üblicherweise Fehler?**

- [ ] Über eine klassenbasierte Exception
- [x] Über eine RETURN-Tabelle vom Typ BAPIRET2
- [ ] Über einen Kurzdump

*Erklärung:* Wer die RETURN-Tabelle nicht auswertet, bemerkt den Fehlschlag nicht — das Programm läuft weiter.

**2. Welche Meldungstypen in BAPIRET2 bedeuten „fehlgeschlagen"?**

- [ ] Nur E
- [x] E und A
- [ ] S und I

*Erklärung:* A steht für Abbruch, E für Fehler — die übliche Prüfung lautet deshalb TYPE CA 'EA'.
