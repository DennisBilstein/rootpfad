# Generics und Wildcards

*Collections & Generics · ca. 9 Min.*

**Generics** bringen Typsicherheit zur Compilezeit: `List<String>` nimmt nur Strings auf, Casts entfallen. Zur Laufzeit ist die Typinformation allerdings gelöscht (**Type Erasure**) — deshalb gibt es kein `new T[]` und kein `instanceof List<String>`.

**Wildcards** steuern, wie flexibel ein Parameter sein darf. Die Merkregel heißt **PECS**: *Producer extends, Consumer super*.

-   `? extends T` — du liest aus der Struktur (sie produziert T).
-   `? super T` — du schreibst hinein (sie konsumiert T).

```java
// Ohne Generics: unsicher, Cast nötig, Fehler erst zur Laufzeit
List liste = new ArrayList();
liste.add("Text");
Integer i = (Integer) liste.get(0);   // ClassCastException zur Laufzeit

// Generische Methode
public static <T extends Comparable<T>> T max(List<? extends T> werte) {
    T groesster = werte.get(0);
    for (T w : werte) {
        if (w.compareTo(groesster) > 0) groesster = w;
    }
    return groesster;
}

// PECS in der Praxis
void kopiere(List<? extends Number> quelle, List<? super Number> ziel) {
    for (Number n : quelle) ziel.add(n);
}
```

> **Tipp:** Type Erasure erklärt eine Fehlermeldung, über die jeder irgendwann stolpert: Zwei Methoden, die sich nur im generischen Parameter unterscheiden (verarbeite(List) und verarbeite(List)), lassen sich nicht überladen. Nach dem Löschen der Typinformation haben beide dieselbe Signatur. Die Lösung sind unterschiedliche Methodennamen — nicht mehr Generics.

## Kontrollfragen

**1. Was bedeutet Type Erasure?**

- [x] Generics werden zur Laufzeit entfernt und existieren nur zur Compilezeit
- [ ] Generics löschen ungenutzte Objekte
- [ ] Typen werden zufällig gewählt

*Erklärung:* Deshalb sind Konstrukte wie new T[] oder instanceof List<String> nicht möglich.

**2. Wofür steht PECS?**

- [x] Producer extends, Consumer super
- [ ] Public extends, Class super
- [ ] Parameter extends, Class static

*Erklärung:* Liest du Werte heraus, nutze extends; fügst du Werte hinzu, nutze super.
