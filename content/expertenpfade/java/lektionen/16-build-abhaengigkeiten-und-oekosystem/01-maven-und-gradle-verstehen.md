# Maven und Gradle verstehen

*Build, Abhängigkeiten & Ökosystem · ca. 8 Min.*

Ein Build-Werkzeug übernimmt Kompilieren, Testen, Paketieren und vor allem das **Abhängigkeitsmanagement** — inklusive der transitiven Abhängigkeiten deiner Abhängigkeiten.

**Maven** ist deklarativ (XML, feste Konventionen, vorhersehbar), **Gradle** ist flexibler (Kotlin/Groovy-DSL, schneller durch Build-Cache). Beide kennen denselben Lebenszyklus: `compile` → `test` → `package` → `install`/`publish`.

Die **Scopes** steuern, wann eine Abhängigkeit verfügbar ist: `compile` überall, `test` nur in Tests, `provided` zur Compilezeit (stellt die Laufzeitumgebung bereit).

```maven/terminal
<!-- Maven: pom.xml -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>

mvn clean verify        # baut und testet alles von Grund auf
mvn dependency:tree     # zeigt, woher eine Bibliothek wirklich kommt
```

> **Tipp:** Wenn zur Laufzeit eine NoSuchMethodError oder ClassNotFoundException auftaucht, obwohl alles kompiliert, liegt fast immer ein Versionskonflikt vor: Zwei Abhängigkeiten ziehen dieselbe Bibliothek in unterschiedlichen Versionen, und es gewinnt die falsche. mvn dependency:tree zeigt den Konflikt in Sekunden — das ist der erste Befehl, den du bei solchen Fehlern eingibst.

## Kontrollfragen

**1. Was bedeutet der Scope test bei einer Abhängigkeit?**

- [x] Sie wird nur beim Kompilieren und Ausführen der Tests verwendet
- [ ] Sie wird nie verwendet
- [ ] Sie ist nur in Produktion aktiv

*Erklärung:* So landet etwa JUnit nicht im ausgelieferten Artefakt.

**2. Womit findest du Versionskonflikte transitiver Abhängigkeiten?**

- [ ] mvn clean
- [x] mvn dependency:tree
- [ ] mvn compile

*Erklärung:* Der Abhängigkeitsbaum zeigt, welche Version sich durchgesetzt hat und warum.
