# Fehler verstehen: Debugger, Ausnahmen und ein kontrollierter Test

Modul: abap-m18 · 24 Minuten

Syntaxfehler werden beim Prüfen erkannt; ein logisch falsches Ergebnis kann dagegen syntaktisch korrekt sein. Der Debugger hilft, den tatsächlichen Ablauf und Variablenwerte zu beobachten. Aktiviere die Übungsklasse, setze einen Breakpoint vor die Division und starte die Konsolenanwendung. Der Halt erfolgt vor der Ausführung der markierten Anweisung. Vergleiche zaehler, nenner und ergebnis mit deiner Erwartung.

Das Beispiel teilt 10 durch 0 und behandelt dafür gezielt cx_sy_zerodivide. TRY umschließt den gefährdeten Abschnitt. Bei der Ausnahme wird die nachfolgende Erfolgsmeldung im TRY-Block übersprungen, der passende CATCH-Block ausgeführt und danach hinter ENDTRY fortgesetzt. INTO DATA(fehler) speichert die Referenz auf das Ausnahmeobjekt; get_text( ) liefert dessen Fehlertext. Das Abfangen ersetzt nicht die fachliche Entscheidung, wie ein ungültiger Nenner behandelt werden soll.

Verwende im ADT-Debugger Step Into für genaue Einzelschritte und Step Over, wenn du einen Methodenaufruf wie out->write nicht intern untersuchen möchtest. Resume läuft bis zum nächsten Haltepunkt beziehungsweise bis zum Ende weiter. Ein Exception Breakpoint kann anhalten, wenn die ausgewählte Ausnahme ausgelöst wird, auch wenn das Programm sie später behandelt. Verändere Variablen nur in einem erlaubten Übungssystem; ein Sprung zu einer anderen Codezeile setzt vorherige Wertänderungen nicht zurück.

Praxisaufgabe: Führe drei kontrollierte Tests durch: Nenner 0 führt zur Fehlerausgabe, Nenner 2 liefert 5, Nenner -2 liefert -5. Notiere zu jedem Test den ausgeführten Zweig. Ergänze danach eine fachliche Vorprüfung auf 0, ohne einen leeren CATCH-Block als vermeintliche Lösung stehen zu lassen. Die Übung gehört in die main-Methode einer Konsolenklasse und verursacht mit der vorhandenen Behandlung keinen absichtlich unbehandelten Kurzdump.

```abap
DATA zaehler TYPE decfloat34 VALUE 10.
DATA nenner TYPE decfloat34 VALUE 0.
DATA ergebnis TYPE decfloat34.
TRY.
    ergebnis = zaehler / nenner.
    out->write( ergebnis ).
  CATCH cx_sy_zerodivide INTO DATA(fehler).
    out->write( fehler->get_text( ) ).
ENDTRY.
out->write( `Test beendet` ).
```

## Kontrollfragen

### Wo geht es nach der behandelten Ausnahme weiter?

- [ ] Automatisch erneut bei der fehlgeschlagenen Division
- [x] Hinter ENDTRY
- [ ] Immer mit einem Programmabbruch

Nach dem passenden CATCH-Block wird die Verarbeitung hinter ENDTRY fortgesetzt. Ein automatischer Wiederholungsversuch ist hier nicht programmiert.

### Was ist bei Jump to Line wichtig?

- [ ] Alle bisherigen Variablenänderungen werden zurückgesetzt
- [ ] Es ist dasselbe wie Programm neu starten
- [x] Übersprungene Anweisungen werden nicht ausgeführt und frühere Änderungen nicht zurückgenommen

Ein Sprung verändert die Ausführungsposition, stellt aber keinen früheren vollständigen Programmzustand wieder her.

## Quellen und Zugang

- [SAP Learning: Debugging an ABAP Program](https://learning.sap.com/courses/basic-abap-programming/debugging-an-abap-program_d070e545-efd5-4d87-8b75-20f18d7b7d3b): Lektion einschließlich Übungsbeschreibung ohne Anmeldung gelesen; Debuggen benötigt aktivierten Code, ABAP-System und passende Berechtigungen. SAPs /LRN/-Vorlage nicht auf jedem System vorhanden.
- [SAP-samples: Exceptions and Runtime Errors](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/27_Exceptions.md): Kostenlos öffentlich gelesen; Beispiele nur in einem kompatiblen Übungssystem ausführen.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
