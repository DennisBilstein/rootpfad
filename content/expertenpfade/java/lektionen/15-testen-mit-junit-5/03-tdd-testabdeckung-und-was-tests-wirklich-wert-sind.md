# TDD, Testabdeckung und was Tests wirklich wert sind

*Testen mit JUnit 5 · ca. 8 Min.*

**Test-Driven Development** folgt dem Zyklus *Red – Green – Refactor*: erst ein fehlschlagender Test, dann die minimale Implementierung, dann aufräumen bei grünen Tests. Der eigentliche Gewinn ist nicht die Testabdeckung, sondern der Druck auf ein sauberes Design — schwer testbarer Code ist fast immer schlecht geschnittener Code.

**Code Coverage** (z. B. mit JaCoCo) misst, welcher Anteil des Codes von Tests durchlaufen wurde. Die Kennzahl ist nützlich, aber verführerisch: Sie sagt, was *ausgeführt* wurde — nicht, was tatsächlich *geprüft* wurde. Ein Test ohne einzige Assertion erzeugt 100 % Abdeckung und null Sicherheit.

```java
// 1. Red: Test zuerst, er schlägt fehl
@Test
void rabattAbHundertEuro() {
    assertEquals(new BigDecimal("10.00"),
                 rechner.rabatt(new BigDecimal("100.00")));
}

// 2. Green: einfachste Implementierung, die den Test erfüllt
public BigDecimal rabatt(BigDecimal betrag) {
    return betrag.compareTo(GRENZE) >= 0
            ? betrag.multiply(new BigDecimal("0.10"))
            : BigDecimal.ZERO;
}

// 3. Refactor: benennen, extrahieren, vereinfachen — Tests bleiben grün
```

> **Tipp:** Eine Zahl, die in Projekten viel Streit erspart: Nicht die Höhe der Abdeckung entscheidet, sondern wo sie liegt. 95 % auf trivialen Gettern und 40 % auf der Preisberechnung sind schlechter als 70 % gleichmäßig über die Geschäftslogik. Prüfe deshalb die Abdeckung der fachlich riskanten Klassen gezielt, statt einer globalen Prozentmarke hinterherzujagen.

## Kontrollfragen

**1. Wie lautet der TDD-Zyklus?**

- [x] Red, Green, Refactor
- [ ] Plan, Build, Ship
- [ ] Write, Deploy, Fix

*Erklärung:* Erst der fehlschlagende Test, dann die Implementierung, dann das Aufräumen.

**2. Was sagt eine hohe Code Coverage NICHT aus?**

- [ ] Welcher Code ausgeführt wurde
- [x] Dass das Verhalten tatsächlich geprüft wurde
- [ ] Welche Zeilen erreicht wurden

*Erklärung:* Ein Test ohne Assertion erzeugt Abdeckung, aber keinerlei Sicherheit.
