# Typsystem im Detail: Referenz- vs. Wertsemantik

*Syntax, Typsystem & moderne Sprachkonstrukte · ca. 8 Min.*

ABAP-Variablen sind standardmäßig **wertbasiert** — eine Zuweisung kopiert den Inhalt. **Referenztypen** (`TYPE REF TO`) verhalten sich anders: die Variable enthält nur eine Referenz auf ein Objekt im Speicher; Zuweisung kopiert die Referenz, nicht das Objekt — zwei Variablen können danach dasselbe Objekt referenzieren.

Objektinstanzen (Klassen) werden immer über Referenzen gehandhabt; **Datenreferenzen** (`TYPE REF TO DATA`) referenzieren beliebige Datenobjekte dynamisch.

```abap
DATA lo_a TYPE REF TO zcl_beispiel.
DATA lo_b TYPE REF TO zcl_beispiel.
lo_a = NEW #( ).
lo_b = lo_a.        " lo_b zeigt auf DASSELBE Objekt wie lo_a
lo_b->set_value( 5 ).
" lo_a->get_value( ) liefert jetzt ebenfalls 5!
```

> **Tipp:** Der häufigste Debugging-Fehler bei Einsteigern in ABAP Objects: unbeabsichtigtes Teilen von Objektinstanzen über mehrere Referenzvariablen, wo eigentlich eine unabhängige Kopie gewünscht war. Wo echte Unabhängigkeit nötig ist, braucht es eine explizite Kopiermethode oder einen neuen NEW #( )-Aufruf.

## Kontrollfragen

**1. Was passiert bei lo_b = lo_a für zwei Objektreferenzen?**

- [ ] Es entsteht eine unabhängige Kopie des Objekts
- [x] Beide Variablen referenzieren danach dasselbe Objekt im Speicher
- [ ] Ein Laufzeitfehler wird ausgelöst

*Erklärung:* Referenzvariablen kopieren nur den Verweis, nicht das referenzierte Objekt selbst.

**2. Welche Semantik haben elementare ABAP-Variablen standardmäßig?**

- [ ] Referenzsemantik
- [x] Wertsemantik (Kopie bei Zuweisung)
- [ ] Keine der beiden

*Erklärung:* Elementare Typen und Strukturen werden bei Zuweisung als vollständige Kopie übertragen.
