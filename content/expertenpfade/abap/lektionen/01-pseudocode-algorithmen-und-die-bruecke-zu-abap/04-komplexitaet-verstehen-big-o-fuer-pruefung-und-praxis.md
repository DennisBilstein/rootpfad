# Komplexität verstehen: Big-O für Prüfung und Praxis

*Pseudocode, Algorithmen & die Brücke zu ABAP · ca. 7 Min.*

Big-O beschreibt, wie Laufzeit oder Ressourcenverbrauch eines Algorithmus mit wachsender Eingabegröße zunimmt — unabhängig von konkreter Hardware.

| Klasse | Beispiel-Algorithmus | ABAP-Bezug |
| --- | --- | --- |
| O(1) | Hash-Zugriff | READ TABLE ... TYPE HASHED |
| O(log n) | Binäre Suche | READ TABLE ... BINARY SEARCH / SORTED TABLE |
| O(n) | Lineares Durchsuchen | LOOP AT STANDARD TABLE |
| O(n log n) | Effizientes Sortieren | SORT itab |
| O(n²) | Verschachtelte Schleifen über dieselbe Menge | LOOP-in-LOOP ohne Schlüssel (Antipattern) |

Diese Theorie ist kein akademischer Selbstzweck: Die Wahl STANDARD- vs. SORTED- vs. HASHED-TABLE aus Modul 8 (Teil II) ist die praktische ABAP-Anwendung genau dieser Komplexitätsklassen.

> **Tipp:** In der AP1 wird Big-O typischerweise nicht mit der O-Notation selbst abgefragt, sondern indirekt: "Wie oft wird diese Schleife bei n=10 Elementen durchlaufen?" Trainiere, Schleifendurchläufe konkret abzuzählen — das ist die praktische Prüfungsform der Komplexitätsanalyse.

## Kontrollfragen

**1. Welche Komplexitätsklasse hat eine einzelne Schleife über n Elemente?**

- [ ] O(1)
- [x] O(n)
- [ ] O(n²)

*Erklärung:* Eine einfache Schleife durchläuft jedes der n Elemente genau einmal — lineare Laufzeit O(n).

**2. Welche ABAP-Tabellenart passt zur Komplexitätsklasse O(1) beim Schlüsselzugriff?**

- [ ] STANDARD TABLE
- [ ] SORTED TABLE
- [x] HASHED TABLE

*Erklärung:* HASHED TABLE bietet konstanten Zugriff über den Schlüssel, unabhängig von der Tabellengröße.
