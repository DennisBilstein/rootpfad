# JUnit 5: Struktur und Assertions

*Testen mit JUnit 5 · ca. 9 Min.*

Ein guter Test folgt dem **AAA-Muster**: *Arrange* (Vorbereiten), *Act* (Ausführen), *Assert* (Prüfen). Der Testname sollte beschreiben, *was* erwartet wird — nicht „test1".

-   `@Test` markiert eine Testmethode, `@BeforeEach`/`@AfterEach` laufen vor/nach jedem Test.
-   `@DisplayName` erlaubt sprechende Namen im Report.
-   `@ParameterizedTest` führt denselben Test mit vielen Datensätzen aus — ideal für Äquivalenzklassen und Grenzwerte aus Modul 6.
-   `assertThrows` prüft, dass eine Exception fliegt — inklusive Meldung.

```java
class KontoTest {

    private Konto konto;

    @BeforeEach
    void setUp() {
        konto = new Konto("DE123", new BigDecimal("100.00"));
    }

    @Test
    @DisplayName("Einzahlung erhöht den Saldo um den Betrag")
    void einzahlungErhoehtSaldo() {
        konto.einzahlen(new BigDecimal("50.00"));            // Act
        assertEquals(new BigDecimal("150.00"), konto.getSaldo());
    }

    @Test
    void negativeEinzahlungWirdAbgelehnt() {
        var ex = assertThrows(IllegalArgumentException.class,
                () -> konto.einzahlen(new BigDecimal("-5")));
        assertTrue(ex.getMessage().contains("positiv"));
    }

    @ParameterizedTest
    @ValueSource(ints = {17, 18, 65, 66})                    // Grenzwertanalyse
    void altersgrenzePruefen(int alter) {
        assertEquals(alter >= 18 && alter <= 65, Regel.istZulaessig(alter));
    }
}
```

> **Tipp:** Ein Test, der nie rot war, beweist nichts. Wenn du einen Test für bestehenden Code schreibst, brich die Implementierung testweise absichtlich — läuft der Test trotzdem grün durch, prüft er nicht, was du glaubst. Diese Zehn-Sekunden-Gegenprobe deckt erstaunlich viele wertlose Tests auf.

## Kontrollfragen

**1. Wofür steht das AAA-Muster im Test?**

- [x] Arrange, Act, Assert
- [ ] Analyze, Apply, Archive
- [ ] Assert, Attach, Abort

*Erklärung:* Vorbereiten, Ausführen, Prüfen — diese Dreiteilung macht Tests lesbar.

**2. Wofür eignet sich @ParameterizedTest besonders?**

- [ ] Für Tests ohne Daten
- [x] Um denselben Test mit mehreren Eingabewerten laufen zu lassen, etwa bei Grenzwerten
- [ ] Um Tests zu deaktivieren

*Erklärung:* Genau die Kombination aus Äquivalenzklassen und Grenzwerten aus der Testtheorie.
