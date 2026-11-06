# Komplexität verstehen: Big-O für Prüfung und Praxis

*Pseudocode, Algorithmen & die Brücke zu Java · ca. 7 Min.*

Big-O beschreibt, wie Laufzeit oder Speicherbedarf mit der Eingabegröße wachsen — unabhängig von der Hardware.

| Klasse | Beispiel | Java-Bezug |
| --- | --- | --- |
| O(1) | Hash-Zugriff | HashMap.get(), ArrayList.get(i) |
| O(log n) | Binäre Suche | Arrays.binarySearch(), TreeMap |
| O(n) | Lineares Durchsuchen | ArrayList.contains(), LinkedList.get(i) |
| O(n log n) | Effizientes Sortieren | Arrays.sort(), Collections.sort() |
| O(n²) | Verschachtelte Schleifen | Zwei Schleifen über dieselbe Liste |

Diese Theorie ist kein Selbstzweck: Die Wahl zwischen `ArrayList`, `LinkedList` und `HashMap` in Modul 9 ist die praktische Anwendung genau dieser Klassen.

> **Tipp:** Die AP1 fragt Big-O selten mit der O-Notation ab, sondern indirekt: „Wie oft wird diese Schleife bei n = 10 durchlaufen?" Trainiere deshalb das konkrete Abzählen von Durchläufen. Bei zwei verschachtelten Schleifen mit je n Durchläufen sind es n·n — bei einer inneren Schleife bis n-i dagegen n·(n-1)/2.

## Kontrollfragen

**1. Welche Komplexität hat eine einzelne Schleife über n Elemente?**

- [ ] O(1)
- [x] O(n)
- [ ] O(n²)

*Erklärung:* Jedes Element wird genau einmal betrachtet — lineare Laufzeit.

**2. Welche Java-Struktur bietet O(1) beim Zugriff über den Schlüssel?**

- [ ] LinkedList
- [x] HashMap
- [ ] ArrayList (über den Wert gesucht)

*Erklärung:* HashMap berechnet aus dem Schlüssel direkt die Position — unabhängig von der Größe.
