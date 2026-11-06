# Die Teststrategie einer Spring-Boot-Anwendung

*Testen, Sicherheit & Betrieb · ca. 10 Min.*

Spring bietet gestufte Testarten — die Wahl entscheidet über Laufzeit und Aussagekraft (Testpyramide, Modul 6):

| Art | Lädt | Einsatz |
| --- | --- | --- |
| Plain JUnit | Nichts von Spring | Geschäftslogik — schnellste und häufigste Wahl |
| @WebMvcTest | Nur die Web-Schicht | Controller, Mapping, Validierung, Statuscodes |
| @DataJpaTest | Nur JPA plus Testdatenbank | Repositories und Abfragen |
| @SpringBootTest | Den gesamten Kontext | Wenige End-to-End-Pfade |

Für realistische Datenbanktests sind **Testcontainers** der Standard: eine echte PostgreSQL-Instanz im Container statt H2. Das erspart die klassische Falle, dass Abfragen gegen H2 laufen und gegen die Produktionsdatenbank scheitern.

```java
@WebMvcTest(BestellController.class)
class BestellControllerTest {

    @Autowired MockMvc mvc;
    @MockitoBean BestellService service;      // Service wird ersetzt

    @Test
    void liefert404BeiUnbekannterBestellung() throws Exception {
        when(service.finde(99L)).thenReturn(Optional.empty());

        mvc.perform(get("/api/bestellungen/99"))
           .andExpect(status().isNotFound());
    }

    @Test
    void lehntUngueltigeEingabeAb() throws Exception {
        mvc.perform(post("/api/bestellungen")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"kundeNr\":\"\"}"))
           .andExpect(status().isBadRequest());
    }
}
```

> **Tipp:** Die verbreitetste Fehlentscheidung beim Testen von Spring-Anwendungen ist, alles mit @SpringBootTest zu erschlagen. Das lädt den kompletten Kontext, dauert Sekunden pro Test und sagt bei einem Fehlschlag wenig darüber aus, wo das Problem liegt. Faustregel: Geschäftslogik ohne Spring testen, Schichten mit der jeweils passenden Slice-Annotation, und nur eine Handvoll echter End-to-End-Tests.

## Kontrollfragen

**1. Was lädt @WebMvcTest?**

- [ ] Den gesamten Anwendungskontext
- [x] Nur die Web-Schicht mit dem angegebenen Controller
- [ ] Nur die Datenbankschicht

*Erklärung:* Abhängige Services werden durch Test Doubles ersetzt — dadurch ist der Test schnell und fokussiert.

**2. Warum Testcontainers statt H2?**

- [ ] H2 ist kostenpflichtig
- [x] Weil gegen eine echte Datenbank getestet wird und SQL-Unterschiede nicht erst in Produktion auffallen
- [ ] Weil H2 keine Transaktionen kann

*Erklärung:* Abfragen, die gegen H2 laufen, können gegen PostgreSQL oder Oracle scheitern.
