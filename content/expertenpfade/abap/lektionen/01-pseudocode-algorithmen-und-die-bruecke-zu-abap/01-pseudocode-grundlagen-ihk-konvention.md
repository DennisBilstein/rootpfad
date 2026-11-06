# Pseudocode-Grundlagen (IHK-Konvention)

*Pseudocode, Algorithmen & die Brücke zu ABAP · ca. 7 Min.*

Pseudocode in der AP1 ist bewusst **sprachunabhängig** gehalten, meist an Java/C# angelehnt. Der Prüfung liegt ein **Syntax-Beiblatt** bei — entscheidend ist nicht exakte Syntaxtreue, sondern ob deine Logik korrekt ist. Trotzdem lohnt es sich, eine konsistente Notation einzuüben:

-   **Sequenz** — Anweisung folgt auf Anweisung, von oben nach unten.
-   **Verzweigung** — `IF ... THEN ... ELSE ... ENDIF`.
-   **Wiederholung** — `FOR i <- 1 TO n DO ... ENDFOR`, `WHILE ... DO ... ENDWHILE`, `REPEAT ... UNTIL`.
-   **Zuweisung** meist mit `<-` oder `:=`, Ein-/Ausgabe mit `READ`/`INPUT` bzw. `WRITE`/`OUTPUT`.
-   **Felder/Arrays** werden mit eckigen Klammern indiziert — prüfe im jeweiligen Beiblatt, ob bei 0 oder 1 gezählt wird.

Diese drei Grundbausteine (Sequenz, Verzweigung, Wiederholung) sind der Kern der **strukturierten Programmierung** — jeder Algorithmus, egal in welcher Sprache, lässt sich allein daraus zusammensetzen.

```pseudocode
FUNCTION quadriere(zahl)
  ergebnis <- zahl * zahl
  RETURN ergebnis
ENDFUNCTION
```

> **Tipp:** Über 90% der AP1-Algorithmen-Fragen sind Multiple-Choice und verlangen, einen gegebenen Pseudocode korrekt nachzuvollziehen ("was liefert dieser Algorithmus für Eingabe X?"). Übe deshalb vor allem das Trockendurchrechnen: Zeile für Zeile mit einer kleinen Tabelle für jeden Variablenwert — das ist die verlässlichste Prüfungsvorbereitung.

## Kontrollfragen

**1. Was bewertet die IHK bei Pseudocode-Aufgaben primär?**

- [ ] Exakte Syntax nach einem festen Standard
- [x] Die Logik/Korrektheit des Algorithmus
- [ ] Die Zeilenanzahl

*Erklärung:* Ein Syntax-Beiblatt liegt der Prüfung bei — Syntaxfehler werden toleriert, solange die Logik stimmt.

**2. Welche drei Bausteine bilden den Kern der strukturierten Programmierung?**

- [x] Sequenz, Verzweigung, Wiederholung
- [ ] Vererbung, Polymorphie, Kapselung
- [ ] Variable, Konstante, Funktion

*Erklärung:* Jeder Algorithmus lässt sich aus diesen drei Grundbausteinen zusammensetzen — die Basis auch für Struktogramme.
