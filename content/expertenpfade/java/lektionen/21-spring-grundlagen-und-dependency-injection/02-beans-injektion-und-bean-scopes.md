# Beans, Injektion und Bean-Scopes

*Spring-Grundlagen & Dependency Injection · ca. 9 Min.*

Beans entstehen auf zwei Wegen: durch **Stereotyp-Annotationen** an eigenen Klassen (`@Component` und seine Spezialisierungen `@Service`, `@Repository`, `@Controller`) oder durch `@Bean`\-Methoden in einer `@Configuration`\-Klasse — Letzteres vor allem für Fremdklassen, die du nicht annotieren kannst.

Für die Injektion gilt eine klare Empfehlung: **Konstruktorinjektion**. Sie macht Abhängigkeiten sichtbar und verpflichtend, erlaubt `final`\-Felder und funktioniert im Test ganz ohne Spring. Feldinjektion per `@Autowired` ist kürzer, aber versteckt Abhängigkeiten und ist nur mit Reflection testbar.

**Scopes**: Standard ist `singleton` — eine Instanz pro Container. Genau deshalb müssen Beans **zustandslos** sein: Ein veränderliches Feld in einem Singleton-Service wird von allen gleichzeitigen Anfragen geteilt (Modul 13).

```java
@Service
public class BestellService {
    private final BestellRepository repo;
    private final MailSender mailer;

    // Ab Spring 4.3: bei genau einem Konstruktor ist @Autowired überflüssig
    public BestellService(BestellRepository repo, MailSender mailer) {
        this.repo = repo;
        this.mailer = mailer;
    }
}

@Configuration
public class ClientConfig {
    @Bean
    public RestClient zahlungsClient(@Value("${zahlung.url}") String url) {
        return RestClient.builder().baseUrl(url).build();
    }
}
```

> **Tipp:** Ein Fehler, der sich erst unter Last zeigt: ein veränderliches Feld in einem Singleton-Service, etwa ein zwischengespeicherter Benutzername oder ein wiederverwendetes SimpleDateFormat. Im Test mit einer Anfrage funktioniert das; in Produktion mit fünfzig gleichzeitigen Anfragen entstehen falsche Zuordnungen, die praktisch nicht reproduzierbar sind. Beans sind zustandslos — Zustand gehört in Parameter, Rückgabewerte oder die Datenbank.

## Kontrollfragen

**1. Welche Injektionsart ist zu bevorzugen?**

- [ ] Feldinjektion mit @Autowired
- [x] Konstruktorinjektion
- [ ] Setter-Injektion

*Erklärung:* Sie macht Abhängigkeiten explizit, erlaubt final-Felder und funktioniert im Test ohne Spring.

**2. Warum müssen Singleton-Beans zustandslos sein?**

- [ ] Aus Performancegründen
- [x] Weil sich alle gleichzeitigen Anfragen dieselbe Instanz teilen
- [ ] Weil Spring das prüft

*Erklärung:* Veränderliche Felder werden dann zwischen Anfragen geteilt — eine klassische Race Condition.
