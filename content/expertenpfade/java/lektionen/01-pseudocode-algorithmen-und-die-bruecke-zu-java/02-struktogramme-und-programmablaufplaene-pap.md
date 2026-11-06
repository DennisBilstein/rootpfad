# Struktogramme & Programmablaufpläne (PAP)

*Pseudocode, Algorithmen & die Brücke zu Java · ca. 8 Min.*

Die AP1 prüft auch das Lesen und Erstellen von **Struktogrammen** (Nassi-Shneiderman) und **Programmablaufplänen** (PAP, DIN 66001). Beide beschreiben denselben Algorithmus in anderer Notation.

**Struktogramme** stellen Sequenz, Verzweigung und Schleife als verschachtelte Kästen dar. Entscheidend: Es gibt *keine* Sprungpfeile — unstrukturierter Code (GOTO) ist darin gar nicht darstellbar.

*Struktogramm:*

- Bedingung: zahl % 2 == 0 ?
- Zweig Ja: Ausgabe "gerade"
- Zweig Nein: Ausgabe "ungerade"

Vereinfachte Darstellung einer Verzweigung im Struktogramm.

**Programmablaufpläne** nutzen Flussdiagramm-Symbole: Oval = Start/Ende, Rechteck = Verarbeitung, Raute = Entscheidung, Parallelogramm = Ein-/Ausgabe.

*Ablaufdiagramm (PAP):* Start → Eingabe: zahl → zahl % 2 == 0? → ja → Ausgabe "gerade" → nein → Ausgabe "ungerade" → Ende

*Vereinfachter PAP zum selben Algorithmus.*

> **Tipp:** In der Prüfung sollst du gelegentlich denselben Algorithmus zwischen Pseudocode, Struktogramm und PAP übersetzen. Der sichere Weg: identifiziere zuerst die drei Grundbausteine — wo ist die Sequenz, wo die Verzweigung, wo die Schleife. Die Notation ist danach reine Formsache.

## Kontrollfragen

**1. Welches PAP-Symbol steht für eine Entscheidung?**

- [ ] Rechteck
- [x] Raute
- [ ] Oval

*Erklärung:* Die Raute markiert die Verzweigung; das Rechteck ist Verarbeitung, das Oval Start/Ende.

**2. Was ist ein struktureller Vorteil von Struktogrammen?**

- [ ] Sie sind schneller gezeichnet
- [x] Sie erzwingen strukturierte Programmierung, weil Sprungpfeile nicht darstellbar sind
- [ ] Sie ersetzen Pseudocode vollständig

*Erklärung:* Ohne Sprungpfeile lässt sich GOTO-Spaghetticode gar nicht erst abbilden.
