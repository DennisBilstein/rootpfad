# Test Doubles mit Mockito

*Testen mit JUnit 5 · ca. 9 Min.*

Ein Unit-Test soll *eine* Einheit prüfen — nicht nebenbei Datenbank und Netzwerk. Abhängigkeiten werden deshalb durch **Test Doubles** ersetzt:

-   **Stub** — liefert vorgegebene Antworten.
-   **Mock** — zusätzlich wird geprüft, *ob und wie* er aufgerufen wurde.
-   **Fake** — eine vereinfachte, aber funktionierende Implementierung (z. B. eine In-Memory-Datenbank).

Voraussetzung dafür ist **Dependency Injection**: Die Klasse bekommt ihre Abhängigkeiten von außen, statt sie selbst mit `new` zu erzeugen (Modul 19).

```java
@ExtendWith(MockitoExtension.class)
class BestellServiceTest {

    @Mock  private KundeRepository repo;
    @Mock  private MailSender mailer;
    @InjectMocks private BestellService service;

    @Test
    void versendetBestaetigungBeiGueltigerBestellung() {
        when(repo.findByNummer("K1")).thenReturn(Optional.of(new Kunde("K1", "Ada")));

        service.bestelle("K1", artikel);

        verify(mailer).sende(eq("K1"), contains("Bestätigung"));
        verify(mailer, never()).sendeFehler(any());
    }

    @Test
    void unbekannterKundeFuehrtZuFehler() {
        when(repo.findByNummer("X")).thenReturn(Optional.empty());
        assertThrows(KundeNichtGefunden.class, () -> service.bestelle("X", artikel));
    }
}
```

> **Tipp:** Mocke nur, was du selbst besitzt — also deine eigenen Interfaces, nicht fremde Bibliotheksklassen. Wer eine externe API mockt, testet am Ende nur die eigene Annahme über deren Verhalten; ändert die Bibliothek ihr tatsächliches Verhalten, bleibt der Test grün und die Produktion bricht. Für fremde Systeme sind Integrationstests oder ein Fake die ehrlichere Wahl.

## Kontrollfragen

**1. Was unterscheidet einen Mock von einem Stub?**

- [ ] Kein Unterschied
- [x] Beim Mock wird zusätzlich geprüft, ob und wie er aufgerufen wurde
- [ ] Ein Stub ist schneller

*Erklärung:* Stubs liefern nur Antworten; Mocks verifizieren zusätzlich die Interaktion.

**2. Was ist die Voraussetzung dafür, Abhängigkeiten im Test ersetzen zu können?**

- [x] Dependency Injection statt new im Methodenrumpf
- [ ] Möglichst viele statische Methoden
- [ ] Finale Klassen

*Erklärung:* Nur von außen gesetzte Abhängigkeiten lassen sich im Test austauschen.
