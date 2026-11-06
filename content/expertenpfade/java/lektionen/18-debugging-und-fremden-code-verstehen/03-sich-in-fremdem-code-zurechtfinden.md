# Sich in fremdem Code zurechtfinden

*Debugging & fremden Code verstehen · ca. 8 Min.*

Die realistische Projektsituation ist nicht die grüne Wiese, sondern eine gewachsene Codebasis, die niemand vollständig überblickt. Das ist eine eigene Fähigkeit:

-   **Find Usages** (in IntelliJ Alt+F7) — wer ruft das auf? Beantwortet die meisten „was passiert, wenn ich das ändere"-Fragen.
-   **Call Hierarchy** (Ctrl+Alt+H) — der Aufrufbaum in beide Richtungen.
-   **Structure View** (Ctrl+F12) — Überblick über eine große Klasse, ohne zu scrollen.
-   **Git blame / History** — wer hat diese Zeile warum geschrieben? Die Commit-Nachricht erklärt oft mehr als jeder Kommentar.
-   **Tests lesen** — sie sind die ehrlichste Dokumentation: Sie zeigen, wie die Klasse tatsächlich gedacht ist, und sind nachweislich aktuell.

Die Reihenfolge, in der Erfahrene vorgehen: erst die Datenstrukturen und das Domänenmodell, dann die Einstiegspunkte (Controller, Main, Scheduler), erst zuletzt die Details.

> **Tipp:** Wenn du eine unbekannte Klasse verstehen willst, lies zuerst ihre Tests — nicht ihren Quelltext. Tests zeigen die beabsichtigte Verwendung, die Randfälle, an die jemand gedacht hat, und sie lügen nicht, weil sie sonst fehlschlagen würden. Gibt es keine Tests, ist das bereits eine wichtige Information über den Zustand der Codebasis.

## Kontrollfragen

**1. Welches Werkzeug beantwortet „Wer ruft diese Methode auf?"**

- [x] Find Usages / Call Hierarchy
- [ ] Der Formatierer
- [ ] Der Profiler

*Erklärung:* Der Verwendungsnachweis ist das zentrale Werkzeug zur Abschätzung von Änderungsfolgen.

**2. Warum sind Tests eine gute Dokumentationsquelle?**

- [ ] Sie sind kürzer
- [x] Sie zeigen die beabsichtigte Verwendung und sind nachweislich aktuell
- [ ] Sie enthalten immer Kommentare

*Erklärung:* Veraltete Tests fallen auf, weil sie fehlschlagen — veraltete Kommentare nicht.
