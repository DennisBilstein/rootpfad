# Iteration, Modifikation und typische Fallen

*Collections & Generics · ca. 8 Min.*

Beim Durchlaufen und gleichzeitigen Ändern einer Collection gilt eine harte Regel: Wer während einer for-each-Schleife Elemente entfernt, bekommt eine `ConcurrentModificationException` — auch ohne Threads.

Die korrekten Wege:

-   `removeIf()` — der kürzeste und klarste Weg.
-   `Iterator.remove()` — wenn du mehr Kontrolle brauchst.
-   Eine neue Collection aufbauen, statt die alte zu verändern.

Zweite Falle: `Arrays.asList()` liefert eine *feste* Liste über dem Array — `add()` wirft `UnsupportedOperationException`. Ebenso sind `List.of()` und `Map.of()` unveränderlich.

```java
// Falsch: ConcurrentModificationException
for (String s : liste) {
    if (s.isBlank()) liste.remove(s);
}

// Richtig und lesbar
liste.removeIf(String::isBlank);

// Richtig mit Iterator
Iterator<String> it = liste.iterator();
while (it.hasNext()) {
    if (it.next().isBlank()) it.remove();
}

// Falle: feste Größe
List<String> fest = Arrays.asList("a", "b");
fest.add("c");                      // UnsupportedOperationException
List<String> frei = new ArrayList<>(Arrays.asList("a", "b"));  // so geht es
```

> **Tipp:** Die ConcurrentModificationException heißt irreführend — sie hat mit Nebenläufigkeit meist nichts zu tun. Der Iterator merkt lediglich an einem internen Änderungszähler, dass die Collection zwischen zwei Schritten strukturell verändert wurde, und bricht ab, statt unbemerkt Elemente zu überspringen. Dieses „Fail-Fast"-Verhalten ist ein Feature, kein Defekt.

## Kontrollfragen

**1. Wie entfernst du korrekt Elemente während der Iteration?**

- [ ] Mit list.remove() in der for-each-Schleife
- [x] Mit removeIf() oder Iterator.remove()
- [ ] Gar nicht, das ist unmöglich

*Erklärung:* Beide Wege informieren die Collection über die Änderung und halten den Iterator konsistent.

**2. Was liefert Arrays.asList("a","b")?**

- [ ] Eine normal erweiterbare ArrayList
- [x] Eine Liste fester Größe über dem Array
- [ ] Ein unveränderliches Set

*Erklärung:* Setzen einzelner Werte ist erlaubt, Hinzufügen und Entfernen nicht.
