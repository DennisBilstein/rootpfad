# List, Set, Map — welche wann?

*Collections & Generics · ca. 9 Min.*

Das Collections-Framework ist Javas Arbeitspferd. Die Wahl der richtigen Struktur entscheidet über Korrektheit *und* Performance.

| Typ | Eigenschaft | Zugriff | Einsatz |
| --- | --- | --- | --- |
| ArrayList | Reihenfolge, Duplikate erlaubt | get(i) O(1), contains O(n) | Standardliste |
| LinkedList | Doppelt verkettet | get(i) O(n), Einfügen vorn O(1) | Queue/Deque, selten als Liste |
| HashSet | Keine Duplikate, ungeordnet | add/contains O(1) | Eindeutigkeit prüfen |
| LinkedHashSet | Keine Duplikate, Einfügereihenfolge | O(1) | Eindeutig UND geordnet |
| TreeSet / TreeMap | Sortiert | O(log n) | Sortierte Ausgabe, Bereichsabfragen |
| HashMap | Schlüssel → Wert | get/put O(1) | Nachschlagen, Zuordnungen |

Eine verbreitete Fehlannahme: LinkedList sei „schneller beim Einfügen". Das gilt nur, wenn du bereits an der Stelle stehst (über einen Iterator). Der Zugriff über einen Index muss dagegen die Kette durchlaufen — in der Praxis ist ArrayList fast immer die bessere Wahl.

```java
// Unveränderliche Sammlungen (Java 9+) — bevorzugt für Konstanten und Rückgaben
List<String> fest = List.of("a", "b", "c");
Map<String, Integer> preise = Map.of("Apfel", 2, "Birne", 3);

// Häufigkeiten zählen, ohne Fallunterscheidung
Map<String, Integer> zaehler = new HashMap<>();
for (String wort : woerter) {
    zaehler.merge(wort, 1, Integer::sum);
}

// Gruppierte Listen aufbauen
Map<String, List<Kunde>> nachOrt = new HashMap<>();
for (Kunde k : kunden) {
    nachOrt.computeIfAbsent(k.ort(), o -> new ArrayList<>()).add(k);
}
```

> **Tipp:** merge() und computeIfAbsent() ersetzen den ewigen Dreisatz aus containsKey, get und put. Sie sind nicht nur kürzer, sondern vermeiden auch den typischen Fehler, zwischen Prüfung und Zugriff eine Bedingung zu ändern. Wer diese beiden Methoden kennt, schreibt spürbar weniger fehleranfälligen Map-Code.

## Kontrollfragen

**1. Welche Struktur garantiert Eindeutigkeit bei konstantem Zugriff?**

- [ ] ArrayList
- [x] HashSet
- [ ] LinkedList

*Erklärung:* HashSet verhindert Duplikate und prüft die Zugehörigkeit in O(1).

**2. Warum ist ArrayList meist besser als LinkedList?**

- [x] Sie braucht weniger Speicher pro Element und bietet O(1)-Indexzugriff
- [ ] Sie ist threadsicher
- [ ] Sie sortiert automatisch

*Erklärung:* LinkedList lohnt fast nur als Queue/Deque; für Indexzugriffe ist sie deutlich langsamer.
