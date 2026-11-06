# SOLID in der Praxis

*Entwurfsmuster & Clean Code · ca. 9 Min.*

Die fünf Prinzipien, die guten objektorientierten Entwurf beschreiben:

-   **S**ingle Responsibility — eine Klasse, ein Grund zur Änderung. Eine Klasse, die Daten lädt, rechnet *und* E-Mails verschickt, hat drei.
-   **O**pen/Closed — offen für Erweiterung, geschlossen für Änderung. Neue Fälle über neue Implementierungen ergänzen, statt bestehende if-Ketten aufzubohren.
-   **L**iskov Substitution — eine Unterklasse muss überall dort einsetzbar sein, wo die Oberklasse erwartet wird, ohne Überraschungen.
-   **I**nterface Segregation — viele kleine, spezifische Interfaces statt eines großen, das niemand vollständig braucht.
-   **D**ependency Inversion — von Abstraktionen abhängen, nicht von konkreten Klassen.

```java
// Verletzt Dependency Inversion: nicht testbar, nicht austauschbar
public class BestellService {
    private final MySqlKundeRepository repo = new MySqlKundeRepository();
}

// Erfüllt es: Abhängigkeit kommt von außen, als Interface
public class BestellService {
    private final KundeRepository repo;
    public BestellService(KundeRepository repo) {
        this.repo = Objects.requireNonNull(repo);
    }
}
```

> **Tipp:** Wenn du dir nur ein Prinzip merkst, dann Dependency Inversion — es ist das folgenreichste. Sobald Abhängigkeiten von außen hereingereicht werden statt im Konstruktor per new zu entstehen, wird die Klasse testbar, austauschbar und wiederverwendbar. Fast alle anderen Verbesserungen ergeben sich daraus fast von selbst.

## Kontrollfragen

**1. Was fordert das Single-Responsibility-Prinzip?**

- [ ] Eine Klasse soll nur eine Methode haben
- [x] Eine Klasse soll nur einen Grund zur Änderung haben
- [ ] Eine Klasse darf nichts erben

*Erklärung:* Mehrere Änderungsgründe bedeuten mehrere Verantwortlichkeiten in einer Klasse.

**2. Warum macht Dependency Inversion eine Klasse testbar?**

- [ ] Weil Interfaces schneller sind
- [x] Weil Abhängigkeiten von außen gesetzt und damit durch Test Doubles ersetzt werden können
- [ ] Weil der Compiler Tests generiert

*Erklärung:* Intern erzeugte Abhängigkeiten lassen sich im Test nicht austauschen.
