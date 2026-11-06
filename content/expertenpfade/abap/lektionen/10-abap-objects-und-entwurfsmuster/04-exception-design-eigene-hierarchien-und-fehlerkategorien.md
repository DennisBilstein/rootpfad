# Exception-Design: eigene Hierarchien & Fehlerkategorien

*ABAP Objects & Entwurfsmuster · ca. 7 Min.*

Gute Exception-Hierarchien spiegeln fachliche Fehlerkategorien wider, nicht technische Zufälle. Beispiel: eine gemeinsame Basisklasse `ZCX_ORDER_ERROR` mit Unterklassen `ZCX_ORDER_NOT_FOUND`, `ZCX_ORDER_LOCKED`, `ZCX_ORDER_INVALID_STATUS` — Aufrufer können gezielt auf die Basisklasse ODER eine spezifische Unterklasse reagieren.

Nachrichtenklassen (Message Class) statt hartcodierter Texte ermöglichen Übersetzbarkeit und zentrale Pflege der Fehlertexte.

> **Tipp:** Eine zu granulare Exception-Hierarchie (eine Klasse pro einzelnem Fehlerfall) wird schnell unübersichtlich; eine zu grobe (eine einzige generische Exception) verhindert gezielte Fehlerbehandlung. Die Kunst: Exceptions nach fachlichen Reaktionsmöglichkeiten gruppieren — Fälle, die der Aufrufer unterschiedlich behandeln MUSS, bekommen eigene Klassen, alles andere teilt sich eine.

## Kontrollfragen

**1. Wonach sollten sich gute Exception-Hierarchien richten?**

- [ ] Nach der Reihenfolge der Programmierung
- [x] Nach fachlichen Fehlerkategorien und unterscheidbaren Reaktionsmöglichkeiten des Aufrufers
- [ ] Nach der Anzahl der Codezeilen

*Erklärung:* Die Hierarchie soll widerspiegeln, wie ein Aufrufer sinnvoll unterschiedlich auf verschiedene Fehler reagieren kann.

**2. Was ermöglicht die Nutzung von Nachrichtenklassen statt hartcodierter Texte?**

- [ ] Schnellere Kompilierung
- [x] Übersetzbarkeit und zentrale Pflege der Fehlertexte
- [ ] Automatische Fehlerkorrektur

*Erklärung:* Message Classes trennen Text von Logik und erleichtern Mehrsprachigkeit sowie zentrale Textpflege.
