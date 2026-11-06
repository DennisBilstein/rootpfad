# Dein erstes Java-Programm

*Einstieg: Programm, JVM, Typen · ca. 8 Min.*

Jedes Java-Programm lebt in einer **Klasse**. Der Einstiegspunkt ist die Methode `main` mit exakt dieser Signatur — jede Abweichung, und die JVM findet den Start nicht.

```java
public class HalloWelt {
    public static void main(String[] args) {
        String name = "Java";
        System.out.println("Hallo " + name);
        System.out.println("Zeichen im Namen: " + name.length());
    }
}
```

Was dabei passiert, unterscheidet Java von vielen anderen Sprachen:

1.  Der **Compiler** (`javac`) übersetzt den Quelltext in **Bytecode** (`.class`) — nicht in Maschinencode.
2.  Die **JVM** (Java Virtual Machine) führt diesen Bytecode aus. Deshalb läuft dieselbe .class-Datei auf Windows, Linux und macOS — „write once, run anywhere".
3.  Der **JIT-Compiler** übersetzt häufig durchlaufenen Bytecode zur Laufzeit in nativen Maschinencode. Deshalb wird Java-Code nach kurzer Laufzeit deutlich schneller.

Seit Java 11 kannst du eine einzelne Datei sogar direkt starten, ohne vorher zu kompilieren:

```terminal
javac HalloWelt.java    # erzeugt HalloWelt.class
java HalloWelt          # führt den Bytecode aus

java HalloWelt.java     # ab Java 11: direkt, ohne separaten Compilerlauf
```

Drei Dinge, die dir ab jetzt überall begegnen:

-   **Jede Anweisung endet mit Semikolon**, Blöcke stehen in geschweiften Klammern.
-   **Java ist case-sensitiv** — `String` und `string` sind verschieden. Konvention: Klassen `GroßGeschrieben`, Methoden und Variablen `kleinGeschrieben`, Konstanten `GROSS_MIT_UNTERSTRICH`.
-   **Kommentare:** `//` bis Zeilenende, `/* ... */` über mehrere Zeilen, `/** ... */` als Javadoc für die API-Dokumentation.

> **Tipp:** Die Signatur public static void main(String\[\] args) wirkt willkürlich, ist aber logisch: public, damit die JVM sie von außen aufrufen kann; static, weil beim Start noch kein Objekt existiert; void, weil kein Rückgabewert verarbeitet würde; String\[\] für die Kommandozeilenargumente. Wenn dein Programm mit „Main method not found" abbricht, stimmt fast immer einer dieser vier Bestandteile nicht.

## Kontrollfragen

**1. Was erzeugt der Java-Compiler javac?**

- [ ] Nativen Maschinencode
- [x] Bytecode in einer .class-Datei
- [ ] Direkt ausführbare .exe-Dateien

*Erklärung:* Der plattformunabhängige Bytecode wird erst von der JVM ausgeführt — das ist die Grundlage der Plattformunabhängigkeit.

**2. Warum muss main static sein?**

- [ ] Aus Performancegründen
- [x] Weil beim Programmstart noch kein Objekt der Klasse existiert
- [ ] Damit sie überschrieben werden kann

*Erklärung:* Statische Methoden gehören zur Klasse selbst und können ohne Instanz aufgerufen werden.
