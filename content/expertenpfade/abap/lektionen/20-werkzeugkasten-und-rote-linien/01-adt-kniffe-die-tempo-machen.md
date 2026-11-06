# ADT-Kniffe, die Tempo machen

*Werkzeugkasten & rote Linien · ca. 7 Min.*

Der Unterschied zwischen einem langsamen und einem schnellen Entwickler liegt selten im Denken, sondern in der Werkzeugbeherrschung. Diese Handgriffe sollten in Fleisch und Blut übergehen:

| Kürzel | Wirkung |
| --- | --- |
| Strg + Shift + A | Beliebiges Entwicklungsobjekt direkt öffnen — der schnellste Einstieg überhaupt |
| Strg + Shift + G | Verwendungsnachweis (Where-Used) |
| Strg + 1 | Quick Fix: fehlende Methode anlegen, Variable deklarieren, Muster einfügen |
| Strg + O | Quick Outline — in großen Klassen zur Methode springen |
| Strg + Alt + H | Aufrufhierarchie in beide Richtungen |
| Shift + F1 | Pretty Printer |
| F3 / F1 | Zur Definition springen / ABAP-Schlüsselwortdokumentation |
| Strg + < | Auswahl aus-/einkommentieren |

**Quick Fix (Strg+1) ist dabei der unterschätzteste:** Du rufst eine Methode auf, die es noch gar nicht gibt, drückst Strg+1 — und ADT legt Deklaration und leere Implementierung passend an. Das erlaubt einen Arbeitsstil, bei dem man den aufrufenden Code zuerst schreibt und die Struktur daraus entstehen lässt.

> **Tipp:** Ein Detail, das kaum jemand kennt: In ADT kannst du dir mit dem „ABAP Element Info"-Hover nicht nur Signaturen, sondern auch den Release-Status einer API ansehen. Bevor du eine SAP-Klasse verwendest, lohnt dieser Blick — nutzt du eine nicht freigegebene API, fliegt dir das spätestens beim Umstieg auf ABAP Cloud um die Ohren (Modul 14).

## Kontrollfragen

**1. Was macht Quick Fix (Strg+1) besonders nützlich?**

- [ ] Es formatiert nur den Quelltext
- [x] Es legt fehlende Methoden und Deklarationen automatisch passend an
- [ ] Es startet den Debugger

*Erklärung:* So lässt sich der aufrufende Code zuerst schreiben und die Struktur daraus generieren.

**2. Womit öffnest du in ADT direkt ein beliebiges Entwicklungsobjekt?**

- [x] Strg + Shift + A
- [ ] Strg + S
- [ ] F8

*Erklärung:* Strg+Shift+A ist der schnellste Einstieg in jedes Objekt, ohne Navigation durch Paketbäume.
