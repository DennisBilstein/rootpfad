# Pseudocode-Grundlagen (IHK-Konvention)

*Pseudocode, Algorithmen & die Brücke zu Java · ca. 7 Min.*

Pseudocode in der AP1 ist bewusst **sprachunabhängig** gehalten — meist an Java oder C# angelehnt. Der Prüfung liegt ein **Syntax-Beiblatt** bei; bewertet wird deine Logik, nicht die exakte Schreibweise.

-   **Sequenz** — Anweisung folgt auf Anweisung, von oben nach unten.
-   **Verzweigung** — `IF ... THEN ... ELSE ... ENDIF`.
-   **Wiederholung** — `FOR i <- 1 TO n DO ... ENDFOR`, `WHILE ... DO`, `REPEAT ... UNTIL`.
-   **Zuweisung** mit `<-` oder `:=`, Ein-/Ausgabe mit `READ`/`WRITE`.
-   **Arrays** mit eckigen Klammern — prüfe im Beiblatt, ob ab 0 oder 1 gezählt wird. Java zählt immer ab 0.

Diese drei Grundbausteine sind der Kern der **strukturierten Programmierung**: Jeder Algorithmus lässt sich allein daraus zusammensetzen — in jeder Sprache.

```pseudocode
FUNCTION quadriere(zahl)
  ergebnis <- zahl * zahl
  RETURN ergebnis
ENDFUNCTION
```

> **Tipp:** Über 90 % der AP1-Algorithmenfragen sind Multiple Choice und verlangen, einen gegebenen Pseudocode nachzuvollziehen („Was liefert der Algorithmus für Eingabe X?"). Übe deshalb vor allem das Trockendurchrechnen mit Stift und einer kleinen Wertetabelle — das ist die verlässlichste Vorbereitung, und genau dafür gibt es in diesem Kurs den Algorithmus-Trainer.

## Kontrollfragen

**1. Was bewertet die IHK bei Pseudocode-Aufgaben primär?**

- [ ] Exakte Syntax nach festem Standard
- [x] Die Logik und Korrektheit des Algorithmus
- [ ] Die Zeilenanzahl

*Erklärung:* Ein Syntax-Beiblatt liegt bei — Schreibfehler werden toleriert, solange die Logik stimmt.

**2. Welche drei Bausteine bilden den Kern der strukturierten Programmierung?**

- [x] Sequenz, Verzweigung, Wiederholung
- [ ] Vererbung, Polymorphie, Kapselung
- [ ] Klasse, Objekt, Methode

*Erklärung:* Aus diesen drei Konstrukten lässt sich jeder Algorithmus aufbauen — unabhängig von der Programmiersprache.
