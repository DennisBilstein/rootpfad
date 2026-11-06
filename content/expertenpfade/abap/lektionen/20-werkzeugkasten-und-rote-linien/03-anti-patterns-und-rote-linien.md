# Anti-Patterns und rote Linien

*Werkzeugkasten & rote Linien · ca. 9 Min.*

Zum Abschluss die Dinge, die dich in einem Projekt teuer zu stehen kommen — teils technisch, teils beruflich:

-   **Direktes Ändern von Tabelleninhalten in Produktion.** Es kursieren Tricks, mit denen sich Datenbanktabellen über Standardtransaktionen direkt editieren lassen. Sie umgehen sämtliche Prüf- und Verbuchungslogik, hinterlassen keine Belegspur und sind in seriösen Projekten schlicht tabu — in regulierten Branchen zusätzlich ein Compliance-Verstoß. Wenn Daten falsch sind, gehört ein korrigierendes Programm geschrieben, das den fachlichen Weg geht.
-   **Modifikationen am SAP-Standard.** Jede Modifikation musst du bei jedem Upgrade erneut abgleichen. Erweiterungspunkte (BAdI, Extension Points, Key User Tools) existieren genau deshalb.
-   **`COMMIT WORK` in Schleifen und in wiederverwendbaren Bausteinen** — zerreißt fremde LUWs (Modul 17).
-   **SELECT im LOOP** und verschachtelte Schleifen über große Mengen (Modul 8/9).
-   **Leere `CATCH`\-Blöcke**, die Ausnahmen verschlucken. Ein Fehler, der niemandem auffällt, ist teurer als einer, der laut scheitert.
-   **Dynamisches SQL mit Nutzereingaben** ohne Freigabeliste (Modul 15).
-   **Hartcodierte Mandanten, Werke, Buchungskreise oder Pfade** — spätestens im Produktivsystem falsch.
-   **`BREAK-POINT` oder Testdaten im transportierten Code.** Der ATC meldet das; ignorier die Meldung nicht.

```abap
" Anti-Pattern: verschluckte Ausnahme
TRY.
    lo_service->buchen( ls_beleg ).
  CATCH cx_root.
ENDTRY.                      " Fehler unsichtbar, Daten evtl. inkonsistent

" Besser: behandeln oder bewusst weiterreichen
TRY.
    lo_service->buchen( ls_beleg ).
  CATCH zcx_buchung_fehler INTO DATA(lx_fehler).
    log->add( lx_fehler ).
    RAISE EXCEPTION lx_fehler.
ENDTRY.
```

> **Tipp:** Die verlässlichste Faustregel aus vielen Projekten: Wenn eine Abkürzung sich unangenehm anfühlt, aber „diesmal schneller" ist, wird sie mit hoher Wahrscheinlichkeit in sechs Monaten von jemandem gefunden, der nicht weiß, warum sie existiert. Dokumentiere entweder den Grund im Code — oder nimm den ordentlichen Weg. Genau diese Haltung unterscheidet einen Entwickler, dem man ein Produktivsystem anvertraut, von einem, dem man es nicht anvertraut.

## Kontrollfragen

**1. Warum sind direkte Tabellenänderungen in Produktion tabu?**

- [ ] Sie sind technisch unmöglich
- [x] Sie umgehen Prüf- und Verbuchungslogik und hinterlassen keine nachvollziehbare Belegspur
- [ ] Sie sind nur langsamer als der normale Weg

*Erklärung:* Neben der Datenkonsistenz ist das in regulierten Branchen zusätzlich ein Compliance-Problem.

**2. Was ist das Problem an einem leeren CATCH-Block?**

- [ ] Er verlangsamt das Programm
- [x] Er verschluckt Fehler, sodass Inkonsistenzen unbemerkt bleiben
- [ ] Er ist syntaktisch nicht erlaubt

*Erklärung:* Ein Fehler, der niemandem auffällt, ist teurer als einer, der laut und früh scheitert.
