# Struktogramme & Programmablaufpläne (PAP)

*Pseudocode, Algorithmen & die Brücke zu ABAP · ca. 8 Min.*

Neben Pseudocode prüft die AP1 auch das Lesen und Erstellen von **Struktogrammen** (Nassi-Shneiderman) und **Programmablaufplänen** (PAP, nach DIN 66001). Beide sind gleichwertige Darstellungsformen für denselben Algorithmus — Verständnis der Struktur zählt, nicht eine bestimmte Notation.

**Struktogramme** stellen Sequenz, Verzweigung und Schleife als verschachtelte Kästen dar. Das Entscheidende: es gibt *keine* Sprungpfeile — dadurch ist unstrukturierter Code (GOTO-Sprünge) in einem Struktogramm gar nicht erst darstellbar.

*Struktogramm:*

- Bedingung: zahl MOD 2 = 0 ?
- Zweig Ja: Ausgabe "gerade"
- Zweig Nein: Ausgabe "ungerade"

Vereinfachte Darstellung einer Verzweigung im Struktogramm.

**Programmablaufpläne** nutzen Flussdiagramm-Symbole: Oval = Start/Ende, Rechteck = Verarbeitungsschritt, Raute = Entscheidung, Pfeile = Kontrollfluss.

*Ablaufdiagramm (PAP):* Start → Eingabe: zahl → zahl MOD 2 = 0? → ja → Ausgabe "gerade" → nein → Ausgabe "ungerade" → Ende

*Vereinfachter PAP zum selben Algorithmus.*

> **Tipp:** In der Prüfung wird gelegentlich verlangt, denselben Algorithmus zwischen Pseudocode, Struktogramm und PAP zu übersetzen. Der sicherste Trick: identifiziere zuerst die drei Grundbausteine (wo ist die Sequenz, wo die Verzweigung, wo die Schleife) — die Notation ist dann nur noch Formsache.

## Kontrollfragen

**1. Welches Symbol steht im Programmablaufplan für eine Entscheidung?**

- [ ] Rechteck
- [x] Raute
- [ ] Oval

*Erklärung:* Die Raute markiert eine Verzweigung/Entscheidung im PAP; Rechtecke sind Verarbeitungsschritte, Ovale Start/Ende.

**2. Was ist ein struktureller Vorteil von Struktogrammen gegenüber freien Flussdiagrammen?**

- [ ] Sie sind schneller zu zeichnen
- [x] Sie erzwingen strukturierte Programmierung, da keine Sprungpfeile möglich sind
- [ ] Sie ersetzen Pseudocode vollständig

*Erklärung:* Ohne Sprungpfeile lässt sich unstrukturierter GOTO-Code in einem Struktogramm gar nicht erst darstellen.
