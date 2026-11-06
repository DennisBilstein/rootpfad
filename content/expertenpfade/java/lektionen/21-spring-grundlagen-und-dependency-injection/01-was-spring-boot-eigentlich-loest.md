# Was Spring Boot eigentlich löst

*Spring-Grundlagen & Dependency Injection · ca. 9 Min.*

Spring dreht die Verantwortung für Objekterzeugung um: Nicht deine Klassen erzeugen ihre Abhängigkeiten mit `new`, sondern ein **Container** baut sie und reicht sie herein. Dieses Prinzip heißt **Inversion of Control**; die konkrete Technik dahinter ist die **Dependency Injection** aus Modul 19.

Die vom Container verwalteten Objekte heißen **Beans**. Spring Boot ergänzt dazu drei Dinge, die den Unterschied zum klassischen Spring ausmachen:

-   **Auto-Configuration** — Spring Boot erkennt anhand der Abhängigkeiten im Classpath, was du vorhast, und konfiguriert Sinnvolles vor. Liegt ein JDBC-Treiber und eine H2-Datenbank bereit, entsteht automatisch eine DataSource.
-   **Starter** — gebündelte Abhängigkeiten mit aufeinander abgestimmten Versionen. `spring-boot-starter-web` zieht Tomcat, Jackson und Validierung in passenden Versionen nach.
-   **Eingebetteter Server** — die Anwendung ist ein ausführbares JAR mit eigenem Tomcat, kein Deployment-Artefakt für einen Applikationsserver.

```java
@SpringBootApplication      // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class ShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
}
```

> **Tipp:** Auto-Configuration ist bequem, aber keine Magie — und genau so solltest du sie behandeln. Starte die Anwendung einmal mit dem Schalter --debug: Spring Boot druckt dann einen Auto-Configuration-Report, der für jede Konfiguration angibt, ob sie griff und warum beziehungsweise warum nicht. Wenn etwas „unerklärlich" nicht funktioniert, steht die Antwort fast immer in diesem Report.

## Kontrollfragen

**1. Was bedeutet Inversion of Control?**

- [x] Der Container erzeugt und verdrahtet die Objekte statt der Klassen selbst
- [ ] Der Code läuft rückwärts
- [ ] Die Kontrolle liegt beim Benutzer

*Erklärung:* Statt selbst new aufzurufen, bekommen Klassen ihre Abhängigkeiten hereingereicht.

**2. Wozu dient ein Spring-Boot-Starter?**

- [ ] Zum Starten der Anwendung
- [x] Er bündelt aufeinander abgestimmte Abhängigkeiten in passenden Versionen
- [ ] Er erzeugt die Datenbank

*Erklärung:* Starter lösen das Problem, Versionen dutzender Bibliotheken manuell abzustimmen.
