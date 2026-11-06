# Sich in fremdem Code zurechtfinden

*Debugging & fremden Code verstehen · ca. 9 Min.*

Die realistische Ausgangslage im Projekt ist nicht die grüne Wiese, sondern: 30 Jahre gewachsenes System, niemand weiß mehr, wer das geschrieben hat, und du sollst „mal eben" etwas ändern. Das ist eine eigene Fähigkeit — hier sind die Werkzeuge, mit denen Profis dabei vorgehen:

-   **Verwendungsnachweis** (Where-Used, in ADT Strg+Shift+G) — die wichtigste Tastenkombination überhaupt. Wer ruft diese Methode? Wo wird dieses Feld gelesen? Beantwortet 80 % aller „was passiert, wenn ich das ändere"-Fragen.
-   **SQL-Trace (ST05)** als Detektivwerkzeug: Trace einschalten, Transaktion einmal bedienen, Trace auswerten — jetzt weißt du exakt, welche Tabellen beteiligt sind, auch ohne eine Zeile Code gelesen zu haben.
-   **Vom Feld zur Tabelle**: In der SAP-GUI mit F1 auf ein Eingabefeld und dann „Technische Informationen" liefert Tabellen- und Feldnamen direkt.
-   **Vom Bild zum Code**: Transaktionscode über SE93 nachschlagen, oder im Debugger den Aufrufstack von oben lesen.
-   **Aufrufhierarchie** in ADT (Strg+Alt+H) zeigt den Aufrufbaum einer Methode in beide Richtungen.

> **Tipp:** Die Reihenfolge, in der erfahrene Entwickler ein unbekanntes Thema aufrollen, ist fast immer dieselbe: erst die Daten (welche Tabellen? — ST05 oder F1), dann die Einstiegspunkte (welche Transaktion, welcher Service?), erst danach der Code. Wer umgekehrt anfängt und sich sofort in den Quelltext stürzt, verliert sich in Aufrufketten, ohne das fachliche Bild zu haben.

## Kontrollfragen

**1. Welches Werkzeug beantwortet am schnellsten „Wer ruft diese Methode auf?"**

- [x] Der Verwendungsnachweis (Where-Used)
- [ ] Der Pretty Printer
- [ ] Die Transportverwaltung

*Erklärung:* Der Verwendungsnachweis ist das zentrale Werkzeug, um Auswirkungen einer Änderung abzuschätzen.

**2. Wie findest du ohne Code-Analyse heraus, welche Tabellen eine Transaktion liest?**

- [x] Mit einem SQL-Trace (ST05) während der Bedienung
- [ ] Durch Raten anhand des Namens
- [ ] Über den Transportauftrag

*Erklärung:* ST05 zeichnet alle Datenbankzugriffe auf — der schnellste Weg von der Oberfläche zu den beteiligten Tabellen.
