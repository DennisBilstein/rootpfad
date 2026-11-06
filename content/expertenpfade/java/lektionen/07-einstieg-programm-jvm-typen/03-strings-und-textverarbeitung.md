# Strings und Textverarbeitung

*Einstieg: Programm, JVM, Typen · ca. 8 Min.*

`String` ist in Java **unveränderlich** (immutable). Jede scheinbare Änderung erzeugt ein neues Objekt — das hat Konsequenzen für Vergleiche und Performance.

-   **Vergleichen** immer mit `equals()`, niemals mit `==`. Der Operator `==` vergleicht bei Referenztypen die Speicheradresse, nicht den Inhalt.
-   **Verketten in Schleifen** mit `StringBuilder`, nicht mit `+`. Jedes `+` erzeugt sonst ein neues String-Objekt — aus O(n) wird O(n²).
-   **Text Blocks** (ab Java 15) ersparen bei mehrzeiligem Text das Escaping.

```java
String a = "Hallo";
String b = "Hal" + "lo";
String c = new String("Hallo");

System.out.println(a == b);        // true  (Compiler-Konstante, String Pool)
System.out.println(a == c);        // false (neues Objekt im Heap)
System.out.println(a.equals(c));   // true  (Inhalt gleich) -> so vergleicht man

// Schleifen: StringBuilder statt +
StringBuilder sb = new StringBuilder();
for (String teil : teile) {
    sb.append(teil).append(", ");
}

// Text Block (Java 15+)
String sql = """
        SELECT name, betrag
        FROM bestellung
        WHERE betrag > 100
        """;
```

> **Tipp:** Dass a == b im Beispiel true ergibt, ist die gefährlichste Falle überhaupt: Der Compiler legt identische Literale im String Pool zusammen, also scheint == „zu funktionieren". Sobald der String aber zur Laufzeit entsteht — aus Benutzereingabe, Datei oder Datenbank — schlägt derselbe Vergleich fehl. Deshalb: bei Objekten grundsätzlich equals().

## Kontrollfragen

**1. Womit vergleicht man Strings inhaltlich?**

- [ ] Mit ==
- [x] Mit equals()
- [ ] Mit compareTo() == 1

*Erklärung:* == vergleicht bei Referenztypen die Identität des Objekts, nicht den Inhalt.

**2. Warum StringBuilder statt + in Schleifen?**

- [ ] + ist syntaktisch verboten
- [x] Jedes + erzeugt ein neues String-Objekt, wodurch die Laufzeit quadratisch wird
- [ ] StringBuilder ist threadsicher

*Erklärung:* Weil Strings unveränderlich sind, entsteht bei jeder Verkettung ein neues Objekt samt Kopieraufwand.
