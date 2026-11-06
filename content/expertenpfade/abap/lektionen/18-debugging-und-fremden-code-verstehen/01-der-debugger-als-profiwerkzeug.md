# Der Debugger als Profiwerkzeug

*Debugging & fremden Code verstehen · ca. 9 Min.*

Die meisten Einsteiger nutzen vom Debugger etwa fünf Prozent: Breakpoint setzen und mit F8 durchhetzen. Die eigentlichen Werkzeuge sind andere:

-   **Watchpoints** halten an, sobald sich der *Wert einer Variablen ändert* — statt fünfzigmal F8 zu drücken, um herauszufinden, wo ein Feld überschrieben wird. Das ist der mit Abstand nützlichste Debugger-Trick überhaupt.
-   **Bedingte Breakpoints** halten nur, wenn eine Bedingung zutrifft (z. B. `lv_matnr = '4711'`) — unverzichtbar in Schleifen über 10.000 Datensätze.
-   **Breakpoint at Statement / at Exception** hält bei jedem Auftreten einer Anweisung (z. B. jedem `COMMIT WORK`) oder beim Werfen einer bestimmten Exception, ohne dass du weißt, wo im Code das passiert.
-   **Layer-Aware Debugging** überspringt fremde Schichten und hält erst wieder in deinem eigenen Code — Gold wert in tief verschachtelten Frameworks wie RAP.

In ADT setzt du Breakpoints per Doppelklick am Zeilenrand; über die Breakpoint-Eigenschaften machst du sie bedingt. Watchpoints legst du im laufenden Debugger auf eine Variable an.

```abap
" Im klassischen SAP GUI: /h im Kommandofeld eingeben,
" dann die naechste Aktion ausloesen -> Debugger startet.

" Haeufiges Muster zum Eingrenzen: temporaerer Anker im Code
IF lv_matnr = '4711'.
  BREAK-POINT.          " haelt nur fuer diesen einen Fall
ENDIF.
```

> **Tipp:** Der Debugger ist nicht nur Fehlersuche, sondern das schnellste Lernwerkzeug in einem fremden System. Setz einen Breakpoint mitten in eine SAP-Standardtransaktion und schau dir an, welche Tabellen sie liest und welche Funktionsbausteine sie ruft — du lernst in zwanzig Minuten mehr über den Prozess als aus jeder Dokumentation. Und: BREAK-POINT im Code ist okay zum Eingrenzen, darf aber niemals in einen Transport geraten — der ATC meldet das zu Recht als Fehler.

## Kontrollfragen

**1. Wofür ist ein Watchpoint das richtige Werkzeug?**

- [x] Um anzuhalten, sobald sich der Wert einer Variablen ändert
- [ ] Um das Programm zu beenden
- [ ] Um eine Variable dauerhaft zu schützen

*Erklärung:* Watchpoints finden die Stelle, an der ein Wert überschrieben wird — ohne dass man sie vorher kennt.

**2. Was leistet Layer-Aware Debugging?**

- [ ] Es zeigt das Datenbank-Layout an
- [x] Es überspringt fremde Schichten und hält erst wieder im eigenen Code
- [ ] Es verschlüsselt den Debugger-Zugriff

*Erklärung:* Besonders wertvoll in Frameworks wie RAP, wo zwischen Aufruf und eigenem Code viele Framework-Schichten liegen.
