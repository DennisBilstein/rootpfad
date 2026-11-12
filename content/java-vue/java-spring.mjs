// Spring Boot 4 in der Praxis. Stichtag 12.11.2026 (Spring Boot 4.1.2, Spring Framework 7).
// Eigene Texte; der Code stammt aus dem getesteten Lab content/examples/spring-lab (Maven Wrapper, JDK 21/26).
const lab = 'content/examples/spring-lab/';
const docs = (title, url, note = 'Offizielle Dokumentation; hier nur verlinkt und zusammengefasst.') => ({ title, url, note });

export const module = {
  id: 'java-m26', course: 'java', part: 22, partTitle: 'Java · Spring Boot',
  title: 'Spring Boot 4 in der Praxis · Migrationen, Tests, Fehlervertrag und Resilienz',
};

export const lessons = [
  {
    id: 'java-m26-l1', title: 'Datenbank-Migrationen mit Flyway', minutes: 35,
    prerequisites: 'Spring Data JPA (Modul 23); SQL-Grundlagen (CREATE TABLE, ALTER TABLE).',
    objectives: [
      'Erklären, warum das Datenbankschema in versionierten SQL-Dateien statt per ddl-auto verwaltet wird',
      'Eine Migration V1 und eine additive Migration V2 schreiben und die Namensregel einhalten',
      'In flyway_schema_history nachvollziehen, welche Migrationen angewendet wurden',
      'Begründen, warum eine bereits angewendete Migration nie nachträglich geändert werden darf',
    ],
    simple: `Stell dir vor, dein Team entwickelt eine Anwendung mit Datenbank. Jeder hat lokal eine eigene Datenbank, dazu gibt es Test und Produktion. Wie stellst du sicher, dass überall dieselbe Tabellenstruktur existiert? Wer „mal eben“ eine Spalte per Hand hinzufügt, erzeugt Unterschiede, die erst in der Produktion auffallen.

Flyway löst das wie Git für die Datenbank: Jede Strukturänderung steht in einer eigenen SQL-Datei mit Versionsnummer (V1, V2, V3 …). Beim Start der Anwendung schaut Flyway nach, welche Dateien die Datenbank schon kennt, und führt nur die neuen aus – in der richtigen Reihenfolge. Was es getan hat, notiert es in einer eigenen Tabelle (flyway_schema_history), samt einer Prüfsumme jeder Datei.

Hibernate bekommt dabei eine reine Prüfrolle: ddl-auto=validate. Es erzeugt nichts, sondern meldet beim Start, wenn eine Entity nicht zur Tabelle passt.`,
    steps: [
      'Abhängigkeit: In Spring Boot 4 brauchst du spring-boot-starter-flyway. Die reine Flyway-Bibliothek allein reicht nicht mehr (laut Boot-4-Migrationsleitfaden).',
      'Dateien liegen in src/main/resources/db/migration und heißen V<Version>__<Beschreibung>.sql, mit zwei Unterstrichen.',
      'V1 legt die Tabelle task an. V2 fügt eine optionale Spalte due_date hinzu. Beide Dateien siehst du unten.',
      'In application.properties steht spring.jpa.hibernate.ddl-auto=validate. Das Schema gehört Flyway; Hibernate prüft nur.',
      'Der Test SpringLabApplicationTests liest flyway_schema_history und erwartet genau die Versionen 1 und 2.',
      'Im Testlauf (H2) steht dort zusätzlich eine Zeile ohne Version, die Flyway für die Schema-Anlage schreibt. Der Test filtert sie mit „version IS NOT NULL“ heraus.',
      'FlywayChecksumTest zeigt die wichtigste Regel: Wird V1 nach dem Anwenden verändert (auch nur ein Kommentar), bricht der nächste Start mit „checksum mismatch“ ab.',
    ],
    code: { file: lab + 'src/main/resources/db/migration/V1__create_task.sql', lang: 'SQL' },
    code2: { file: lab + 'src/main/resources/db/migration/V2__add_task_due_date.sql', lang: 'SQL' },
    code3: { file: lab + 'src/test/java/de/rootpfad/lab/db/FlywayChecksumTest.java', lang: 'Java', from: 'void editingAnAppliedMigrationFailsValidation', to: 'hasMessageContaining("checksum mismatch");', back: 1, plus: 1 },
    order: ['body', 'code', 'code2', 'code3', 'body2'],
    output: `FlywayChecksumTest: 2 Tests, beide grün
 - editingAnAppliedMigrationFailsValidation: FlywayValidateException mit "checksum mismatch"
 - anAdditiveNewMigrationIsAppliedWithoutTouchingTheOldOne: genau 1 Migration ausgeführt, Zielversion 2`,
    mistakes: [
      { wrong: 'Eine bereits ausgelieferte Migration „reparieren“, indem man die Datei V1 nachträglich ändert.',
        why: 'Flyway speichert die Prüfsumme jeder angewendeten Datei. Weicht sie ab, verweigert es den Start („checksum mismatch“, im Test belegt). Das schützt davor, dass Umgebungen auseinanderlaufen.',
        fix: 'Eine neue Migration (z. B. V3) schreiben, die den Fehler korrigiert („Forward Fix“). Alte Dateien bleiben unangetastet.' },
      { wrong: 'In V2 eine NOT-NULL-Spalte ohne Standardwert zu einer Tabelle hinzufügen, die schon Daten enthält.',
        why: 'Bestehende Zeilen haben für die neue Spalte keinen Wert. Je nach Datenbank schlägt die Migration fehl oder erzwingt ungewollte Standardwerte.',
        fix: 'In Schritten arbeiten: Spalte nullable hinzufügen, Daten füllen (Backfill), danach in einer späteren Migration NOT NULL setzen.' },
      { wrong: 'spring.jpa.hibernate.ddl-auto=update zusätzlich zu Flyway einschalten.',
        why: 'Zwei Werkzeuge verändern dann dasselbe Schema. Das Ergebnis hängt davon ab, wer zuerst läuft, und lässt sich nicht reproduzieren.',
        fix: 'validate (oder none) verwenden; das Schema ändert ausschließlich Flyway.' },
    ],
    practice: 'Schreibe Migrationen so, dass die alte und die neue Anwendungsversion kurz gleichzeitig mit dem Schema leben können (Rolling Deployment): erst hinzufügen (expand), später aufräumen (contract). Prüfe Migrationen mit einer Kopie echter Datenmengen, bevor sie in Produktion laufen. Teste außerdem gegen dieselbe Datenbank, die in Produktion läuft (siehe nächste Lektion).',
    exercises: [
      { task: 'Schreibe eine Migration V3__add_task_priority.sql, die eine optionale Spalte priority (SMALLINT) ergänzt. Starte die Tests und erweitere den Versionstest auf 1, 2, 3.', acceptance: 'Test erwartet [1, 2, 3] und ist grün. V1 und V2 sind unverändert.' },
      { task: 'Grenzfall: Lege V3 mit NOT NULL ohne Standardwert an und lege vorher eine Zeile an. Beobachte das Ergebnis und korrigiere mit dem dreistufigen Vorgehen (nullable, Backfill, NOT NULL).', acceptance: 'Fehler ist dokumentiert; die drei Schritte stehen in V3, V4, V5 und laufen auf der Datenbank mit vorhandener Zeile.' },
      { task: 'Fehlerfall: Ändere in einer Kopie des Projekts V1 nach dem ersten Lauf auf einer Datei-Datenbank. Starte erneut und notiere die Fehlermeldung; erkläre, wie das Team vorgehen sollte.', acceptance: 'Meldung „checksum mismatch“ ist beobachtet; als Lösung ist eine neue Migration statt einer Änderung beschrieben.' },
    ],
    quiz: [
      { q: 'Ein Teammitglied fügt nach dem Deployment in V1__create_task.sql nur einen Kommentar hinzu. Beim nächsten Start in Test bricht die Anwendung ab. Was ist die wahrscheinlichste Ursache?',
        options: ['Hibernate hat das Schema mit ddl-auto=update überschrieben.', 'Die Prüfsumme der bereits angewendeten Migration passt nicht mehr zur Datei.', 'Flyway kann keine SQL-Kommentare lesen.'],
        correct: 1,
        rationales: ['Mit validate verändert Hibernate das Schema nicht; hier liegt der Fehler bei Flyway selbst.', 'Flyway vergleicht die gespeicherte Prüfsumme mit der Datei. Schon eine Kommentaränderung verändert sie.', 'SQL-Kommentare sind erlaubt; das Problem ist die geänderte Datei, nicht der Kommentar an sich.'],
        explain: 'Angewendete Migrationen sind unveränderlich; Änderungen führen zu „checksum mismatch“.' },
      { q: 'Wozu dient spring.jpa.hibernate.ddl-auto=validate, wenn Flyway das Schema verwaltet?',
        options: ['Hibernate legt fehlende Tabellen und Spalten beim Start automatisch an.', 'Hibernate prüft beim Start, ob die Entities zum vorhandenen Schema passen, und ändert nichts.', 'Hibernate führt beim Start die Flyway-Skripte anstelle von Flyway aus.'],
        correct: 1,
        rationales: ['Das würde create oder update tun; validate ändert nichts am Schema.', 'validate ist eine reine Sicherheitsprüfung gegen Abweichungen zwischen Code und Schema.', 'Migrationen führt Flyway aus; Hibernate prüft nur das Ergebnis.'],
        explain: 'validate dient als Konsistenzprüfung; Änderungen übernimmt ausschließlich Flyway.' },
      { q: 'Du musst eine neue Pflichtspalte zu einer Tabelle mit 2 Millionen Zeilen hinzufügen. Welches Vorgehen ist am sichersten?',
        options: ['Eine einzige Migration mit „ADD COLUMN … NOT NULL“ ohne Standardwert ausführen.', 'Erst nullable hinzufügen, dann Werte nachfüllen, dann NOT NULL in einer späteren Migration setzen.', 'Die Tabelle löschen, neu anlegen und die Daten aus einem Export wieder einspielen.'],
        correct: 1,
        rationales: ['Auf einer gefüllten Tabelle scheitert das ohne Standardwert, weil bestehende Zeilen null enthalten würden.', 'Die Schritte sind klein, einzeln prüfbar und vertragen alte und neue Anwendungsversionen.', 'Das verursacht Ausfallzeit und Datenverlustrisiko; additive Schritte sind sicherer.'],
        explain: 'Expand/Contract in kleinen, additiven Schritten ist das sichere Muster.' },
    ],
    sources: [
      docs('Flyway Dokumentation', 'https://flywaydb.org/documentation/'),
      docs('Spring Boot 4.0 Migration Guide (GitHub-Wiki)', 'https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide', 'Abschnitt zu den modularen Startern; Flyway braucht spring-boot-starter-flyway.'),
      docs('Flyway Quelltext (Apache-2.0)', 'https://github.com/flyway/flyway', 'Lizenz laut GitHub: Apache-2.0. Der Beispielcode hier ist eigen und nicht kopiert.'),
    ],
    verification: 'Lab content/examples/spring-lab mit Maven Wrapper unter JDK 21.0.11 und JDK 26.0.1 ausgeführt: alle Flyway-Tests grün (H2). Ausführung gegen PostgreSQL nicht erfolgt.',
  },

  {
    id: 'java-m26-l2', title: 'Integrationstests mit Testcontainers und @ServiceConnection', minutes: 35,
    prerequisites: 'Lektion „Datenbank-Migrationen mit Flyway“; JUnit-Grundlagen (Modul 15); Docker als Begriff.',
    objectives: [
      'Erklären, warum ein Test gegen eine eingebettete H2-Datenbank nicht beweist, dass es mit PostgreSQL funktioniert',
      'Einen Datenbank-Container im Test starten und mit @ServiceConnection automatisch anbinden',
      'Verstehen, warum @AutoConfigureTestDatabase(replace = NONE) nötig ist',
      'Einen Test so schreiben, dass er ohne Docker sichtbar übersprungen und nicht fälschlich als bestanden gezählt wird',
    ],
    simple: `H2 ist eine kleine Datenbank, die im Speicher läuft. Sie ist praktisch, aber sie ist nicht PostgreSQL. Bei Datentypen, Sortierung, Groß-/Kleinschreibung und Spezialfunktionen verhalten sich die beiden unterschiedlich. Ein Test, der mit H2 grün ist, kann in der Produktion trotzdem scheitern.

Testcontainers startet dir für den Test eine echte Datenbank in einem Docker-Container, wirft sie danach wieder weg und liefert bei jedem Lauf einen sauberen Zustand. Dein Test spricht mit derselben Datenbank-Art wie die Produktion.

Spring Boot macht das Anbinden fast unsichtbar: @ServiceConnection am Container sagt Boot „das hier ist deine Datenbank“, und die Verbindungsdaten (URL, Benutzer, Passwort) werden automatisch gesetzt. Du musst keine Properties von Hand verdrahten.`,
    steps: [
      '@Testcontainers(disabledWithoutDocker = true) markiert den Test als Docker-abhängig. Ohne Docker-Daemon wird er übersprungen und im Bericht als „Skipped“ gezählt.',
      '@Container static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine") startet einen Container pro Testklasse. Der Image-Tag ist festgelegt, nicht „latest“.',
      '@ServiceConnection bindet den Container an die DataSource der Anwendung.',
      '@DataJpaTest lädt nur den Datenzugriff (Entities, Repositories, Flyway). Mit @AutoConfigureTestDatabase(replace = NONE) verhinderst du, dass Boot automatisch eine eingebettete Datenbank anstelle deines Containers einsetzt.',
      'Flyway läuft dabei mit denselben SQL-Dateien wie in Produktion. Der Test prüft also gleichzeitig Migrationen und Abfragen.',
      'Wichtig zur Ehrlichkeit: In dieser Lernumgebung lief kein Docker-Daemon. Der Test wurde deshalb nur kompiliert, aber nicht ausgeführt; Maven meldet „Skipped: 1“.',
    ],
    code: { file: lab + 'src/test/java/de/rootpfad/lab/task/PostgresTaskRepositoryTest.java', lang: 'Java' },
    code2: { file: lab + 'pom.xml', lang: 'XML', from: '<artifactId>spring-boot-testcontainers</artifactId>', to: '<artifactId>postgresql</artifactId>', back: 2, plus: 2 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `Beobachtet ohne laufenden Docker-Daemon:
[WARNING] Tests run: 1, Failures: 0, Errors: 0, Skipped: 1 -- in de.rootpfad.lab.task.PostgresTaskRepositoryTest
(nicht ausgeführt – das ist kein bestandener Test)`,
    mistakes: [
      { wrong: 'Den Container als nicht-statisches Feld anlegen.',
        why: 'Dann startet für jede Testmethode ein neuer Container. Das macht die Testsuite sehr langsam.',
        fix: 'static verwenden: ein Container pro Testklasse; für mehrere Klassen eine gemeinsame Basisklasse oder Konfiguration.' },
      { wrong: '@AutoConfigureTestDatabase vergessen.',
        why: 'Standardmäßig ersetzt @DataJpaTest die konfigurierte Datenbank durch eine eingebettete. Der Test läuft dann gegen H2 und nicht gegen deinen Container – ohne Fehlermeldung.',
        fix: 'replace = AutoConfigureTestDatabase.Replace.NONE setzen und im Test (oder Log) prüfen, welche Datenbank verwendet wird.' },
      { wrong: 'Ein „grünes“ CI-Ergebnis als Nachweis nehmen, obwohl der Docker-Test übersprungen wurde.',
        why: '„Skipped“ ist weder bestanden noch fehlgeschlagen. Ohne Docker auf dem Build-Server prüft niemand die Datenbank.',
        fix: 'In CI Docker bereitstellen und die Zahl der übersprungenen Tests auswerten (Build bricht ab, wenn Docker-Tests fehlen).' },
      { wrong: 'Image-Tag „latest“ verwenden.',
        why: 'Ein stiller Wechsel der Hauptversion kann Tests brechen, ohne dass sich im Code etwas geändert hat.',
        fix: 'Die in Produktion eingesetzte Hauptversion festlegen (hier postgres:17-alpine als Beispiel).' },
    ],
    practice: 'Nutze H2 nur für schnelle Tests ohne datenbankspezifisches Verhalten. Alles, was SQL, Indizes, Constraints oder Migrationen betrifft, gehört gegen die echte Datenbank-Art. Der Preis ist die Startzeit eines Containers; teile deshalb einen Container pro Testklasse oder pro Suite und halte die Anzahl solcher Tests bewusst klein.',
    exercises: [
      { task: 'Starte Docker (falls vorhanden) und führe ./mvnw test aus. Notiere, dass PostgresTaskRepositoryTest nicht mehr übersprungen wird. Falls Docker nicht verfügbar ist: erkläre, welche Zeile im Maven-Bericht das zeigt.', acceptance: 'Mit Docker: „Skipped: 0“ für diesen Test. Ohne Docker: „Skipped: 1“ ist gefunden und als „nicht ausgeführt“ eingeordnet.' },
      { task: 'Grenzfall: Füge einen zweiten Test hinzu, der prüft, dass der Titel genau 120 Zeichen lang sein darf (Spalte VARCHAR(120)). Welche Datenbank prüft die Länge strikt?', acceptance: 'Test mit 120 Zeichen speichert; ein Test mit 121 Zeichen scheitert an der Datenbank (nur mit Docker belegbar, sonst als Annahme gekennzeichnet).' },
      { task: 'Fehlerfall: Entferne @AutoConfigureTestDatabase und gib im Test aus, welche JDBC-URL die DataSource verwendet. Beschreibe das Ergebnis.', acceptance: 'Beobachtung: eingebettete URL statt Container; die Gefahr des „stillen H2-Tests“ ist erklärt (nur mit Docker belegbar).' },
    ],
    quiz: [
      { q: 'Ein @DataJpaTest soll gegen den PostgreSQL-Container laufen. Er verwendet aber trotz @ServiceConnection eine eingebettete Datenbank. Was fehlt am wahrscheinlichsten?',
        options: ['@AutoConfigureTestDatabase(replace = NONE)', 'Die Annotation @Transactional an der Testklasse.', 'Ein zusätzliches @SpringBootApplication.'],
        correct: 0,
        rationales: ['Ohne diese Angabe ersetzt @DataJpaTest die DataSource durch eine eingebettete Datenbank.', 'Transaktionen ändern nichts an der Wahl der Datenbank.', 'Die Anwendungsklasse ist vorhanden; sie entscheidet hier nicht über die Datenbank.'],
        explain: 'Standardmäßig ersetzt @DataJpaTest die Datenquelle; NONE schaltet das ab.' },
      { q: 'Maven zeigt für einen Testcontainers-Test „Skipped: 1“. Wie ist das einzuordnen?',
        options: ['Der Test ist bestanden, weil kein Fehler gemeldet wurde.', 'Der Test wurde nicht ausgeführt, z. B. weil kein Docker lief; er beweist nichts.', 'Der Test ist fehlgeschlagen und wurde automatisch wiederholt.'],
        correct: 1,
        rationales: ['Ein übersprungener Test hat nichts geprüft und taugt nicht als Nachweis.', 'Mit disabledWithoutDocker = true wird er ohne Docker übersprungen; das ist ein Lücken-Signal.', 'Fehlschläge werden als Failures/Errors gezählt, nicht als Skipped.'],
        explain: 'Skipped bedeutet „nicht ausgeführt“ und ist kein Qualitätsnachweis.' },
      { q: 'Warum sollte der Container als static Feld deklariert werden?',
        options: ['Damit er für jede Testmethode neu gestartet wird.', 'Damit ein Container pro Testklasse geteilt wird und die Tests schneller laufen.', 'Weil Testcontainers nur static Felder erkennt.'],
        correct: 1,
        rationales: ['Das wäre ohne static der Fall und ist langsam.', 'Ein Start pro Klasse spart viel Zeit; die Tests teilen sich die frische Datenbank.', 'Es funktioniert auch nicht-statisch, nur langsamer.'],
        explain: 'static: ein Containerstart pro Testklasse statt pro Testmethode.' },
    ],
    sources: [
      docs('Spring Boot Referenz: Testcontainers', 'https://docs.spring.io/spring-boot/reference/testing/testcontainers.html'),
      docs('Testcontainers for Java: PostgreSQL-Modul', 'https://java.testcontainers.org/modules/databases/postgres/', 'Testcontainers-Quelltext laut GitHub: MIT-Lizenz.'),
    ],
    verification: 'Der Test kompiliert unter Spring Boot 4.1.2 mit Testcontainers 2.x (Paket org.testcontainers.postgresql). NICHT ausgeführt: In dieser Umgebung lief kein Docker-Daemon; Maven meldete den Test als übersprungen.',
  },

  {
    id: 'java-m26-l3', title: 'Fehlerantworten mit ProblemDetail (RFC 9457)', minutes: 35,
    prerequisites: 'REST-Controller (Modul 22); Bean Validation (@Valid, @NotBlank); HTTP-Statuscodes.',
    objectives: [
      'Einheitliche Fehlerantworten im Format application/problem+json liefern',
      'Validierungsfehler pro Feld in einer eigenen Eigenschaft (violations) zurückgeben',
      'Einen eigenen Fehlerfall (404) mit Typ, Titel und zusätzlichen Daten modellieren',
      'Den Fehlervertrag mit einem exakten Test absichern',
    ],
    simple: `Wenn ein Client etwas Falsches schickt, bekommt er in einfachen Projekten mal eine HTML-Seite, mal einen Text, mal ein JSON in wechselnder Form. Wer die API benutzt, muss jede Variante einzeln auswerten.

RFC 9457 („Problem Details for HTTP APIs“) legt eine einheitliche Form fest: ein JSON-Objekt mit den Feldern type (eine Kennung des Problems), title (kurzer Titel), status (HTTP-Status), detail (Erklärung) und instance (welche Anfrage betroffen war). Eigene Felder dürfen ergänzt werden, z. B. violations mit den Fehlern pro Eingabefeld.

Spring bringt dafür die Klasse ProblemDetail mit. Du baust die Antwort und Spring setzt Statuscode und Content-Type application/problem+json. Der Vorteil: Das Frontend (siehe Vue-Lektion „Formulare mit Serverdaten“) kann jeden Fehler gleich lesen.`,
    steps: [
      'ApiExceptionHandler ist eine @RestControllerAdvice und erbt von ResponseEntityExceptionHandler. Die Basisklasse übersetzt Standardfehler (falsche Methode, kaputtes JSON …) bereits in ProblemDetail.',
      'Für die eigene TaskNotFoundException baust du ProblemDetail.forStatusAndDetail(NOT_FOUND, message), setzt title, type und die zusätzliche Eigenschaft taskId.',
      'Für Validierungsfehler überschreibst du handleMethodArgumentNotValid und sammelst jeden Feldfehler als {field, message} in violations. Status ist 422.',
      'instance füllt Spring automatisch mit dem Pfad der Anfrage.',
      'ProblemDetailContractTest vergleicht die echte Antwort mit dem erwarteten JSON. Beim 404 mit strict = true: Es dürfen keine zusätzlichen oder fehlenden Felder vorkommen.',
      'Beobachtung aus dem Lauf: Bei kaputtem JSON liefert Spring detail = "Failed to read request" (englisch, Framework-Text). Bei unbekannter API-Version: 400 mit „Invalid API version: \'9.9.0\'“.',
    ],
    code: { file: lab + 'src/main/java/de/rootpfad/lab/web/ApiExceptionHandler.java', lang: 'Java' },
    code2: { file: lab + 'src/test/java/de/rootpfad/lab/task/ProblemDetailContractTest.java', lang: 'Java', from: 'void validationErrorHasExactlyTheDocumentedShape', to: '}""", false));', back: 1, plus: 1 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `HTTP/1.1 422
Content-Type: application/problem+json
{"type":"https://rootpfad.example/probleme/validierung","title":"Validierung fehlgeschlagen","status":422,
 "detail":"Die Eingabe ist ungültig.","instance":"/api/tasks",
 "violations":[{"field":"dueDate","message":"Fälligkeit darf nicht in der Vergangenheit liegen"},
               {"field":"title","message":"Titel darf nicht leer sein"}]}`,
    mistakes: [
      { wrong: 'Framework-Fehlertexte unverändert nach außen geben.',
        why: 'Das Beispiel zeigt „Failed to read request“: englisch, nichtssagend und bei anderen Fehlern potenziell mit internen Details. Clients sollten sich nicht auf solche Texte verlassen.',
        fix: 'Für wichtige Fälle eigene, geprüfte Texte setzen und niemals Stacktraces, SQL-Fehler oder Klassennamen nach außen geben.' },
      { wrong: 'Sich auf die Reihenfolge der violations verlassen.',
        why: 'Die Reihenfolge der Fehler ist nicht Teil des Vertrags; im Lauf stand dueDate vor title. Ein Client, der „erster Fehler = erstes Feld“ annimmt, bricht bei jeder Änderung.',
        fix: 'Im Client nach field zuordnen, nicht nach Position. Im Test lenient vergleichen (strict = false) oder Reihenfolge ausdrücklich sortieren.' },
      { wrong: 'type als Link verstehen, der erreichbar sein muss.',
        why: 'type ist laut RFC eine Kennung (URI). Eine erreichbare Dokumentationsseite ist nett, aber nicht Pflicht; die Adresse im Beispiel ist ein Platzhalter.',
        fix: 'Stabile, eindeutige Kennungen wählen und niemals ändern, sobald Clients sie auswerten.' },
      { wrong: 'Fehler mit Status 200 und einem Feld „success: false“ melden.',
        why: 'Proxys, Monitoring und Clients interpretieren HTTP-Statuscodes. Ein 200 verbirgt Fehler.',
        fix: 'Passenden 4xx/5xx-Status setzen; 400 für nicht lesbare Anfragen, 422 für fachlich ungültige Eingaben (im Lab so festgelegt).' },
    ],
    practice: 'Lege ein Problem-Katalogdokument an (type, title, wann es auftritt, wie der Client reagieren soll). Teste jeden Eintrag mit einem Vertragstest, damit der Fehlervertrag nicht unbemerkt driftet. Beachte: RFC 9457 ersetzt RFC 7807; das Grundformat ist kompatibel.',
    exercises: [
      { task: 'Füge einen neuen Fehlerfall hinzu: Eine Aufgabe mit demselben Titel gibt es schon → 409 Conflict als ProblemDetail mit type und der Eigenschaft existingId. Schreibe einen Vertragstest.', acceptance: 'Antwort hat Status 409 und Content-Type application/problem+json; Test vergleicht type, title, status und existingId.' },
      { task: 'Grenzfall: Sende einen Titel mit exakt 120 und mit 121 Zeichen. Prüfe, dass 120 angenommen und 121 mit 422 und passender Meldung abgelehnt wird.', acceptance: '201 für 120 Zeichen; 422 mit violations-Eintrag für title bei 121 Zeichen.' },
      { task: 'Fehlerfall: Sende kaputtes JSON. Beschreibe die Antwort und ersetze den englischen Standardtext durch einen eigenen deutschen detail-Text (ohne interne Details).', acceptance: 'Antwort bleibt application/problem+json mit Status 400; der neue Text enthält keine Klassen- oder Parsernamen.' },
    ],
    quiz: [
      { q: 'Welchen Content-Type muss eine Fehlerantwort nach RFC 9457 haben?',
        options: ['application/json', 'application/problem+json', 'text/plain'],
        correct: 1,
        rationales: ['Das wäre ein normales JSON; der Medientyp für Problemdetails ist ein eigener.', 'RFC 9457 definiert application/problem+json (und problem+xml).', 'Reiner Text enthält keine strukturierten Felder.'],
        explain: 'Problem Details haben den Medientyp application/problem+json.' },
      { q: 'Ein Client wertet bei Validierungsfehlern immer violations[0] aus. Nach einem Update meldet die Anwendung dieselben Fehler in anderer Reihenfolge. Was ist das Problem?',
        options: ['Der Server hat den Vertrag gebrochen, weil die Reihenfolge fest zugesagt war.', 'Der Client verlässt sich auf etwas, das nicht zugesagt ist; er soll nach field zuordnen.', 'Spring Boot sortiert Listen zufällig und darf nicht verwendet werden.'],
        correct: 1,
        rationales: ['Eine Reihenfolge ist in diesem Vertrag nicht zugesagt; im Lauf stand dueDate vor title.', 'Zuordnung über das Feld field ist stabil und unabhängig von der Position.', 'Die Reihenfolge ist deterministisch genug; sie ist nur nicht Teil des Vertrags.'],
        explain: 'Clients sollen violations nach field auswerten, nicht nach Listenposition.' },
      { q: 'Wann ist Status 422 gegenüber 400 passend?',
        options: ['Wenn der JSON-Text syntaktisch kaputt und gar nicht lesbar ist.', 'Wenn die Anfrage lesbar ist, aber fachliche Regeln verletzt (z. B. leerer Titel).', 'Wenn der Benutzer nicht angemeldet ist und sich zuerst anmelden muss.'],
        correct: 1,
        rationales: ['Unlesbares JSON ist ein Syntaxfehler: 400 Bad Request.', '422 steht für „verstanden, aber inhaltlich ungültig“; im Lab so festgelegt.', 'Fehlende Anmeldung ist 401, nicht 422.'],
        explain: '400 für nicht lesbare, 422 für fachlich ungültige Anfragen (so im Lab festgelegt).' },
    ],
    sources: [
      docs('RFC 9457: Problem Details for HTTP APIs', 'https://www.rfc-editor.org/rfc/rfc9457', 'Normtext der IETF; hier nur verlinkt.'),
      docs('Spring Framework: Error Responses (ProblemDetail)', 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html'),
    ],
    verification: 'Alle gezeigten Antworten stammen aus MockMvc-Läufen des Labs (JDK 21.0.11 und 26.0.1); der Vertragstest vergleicht das JSON. Kein Test gegen einen echten laufenden HTTP-Server.',
  },

  {
    id: 'java-m26-l4', title: 'API-Versionierung und OpenAPI mit springdoc', minutes: 40,
    prerequisites: 'Lektion „Fehlerantworten mit ProblemDetail“; REST-Grundlagen und API-Verträge (Lernpfad APIs).',
    objectives: [
      'Spring Framework 7 so konfigurieren, dass der Header API-Version die passende Controller-Methode auswählt',
      'Zwischen exakter Version (version = "1.0") und Mindestversion (version = "1.1+") unterscheiden',
      'Aus dem Code ein OpenAPI-Dokument erzeugen und seine Lücken erkennen',
      'Die tatsächlichen Statuscodes und den Fehlertyp mit Annotationen dokumentieren und testen',
    ],
    simple: `Eine API ändert sich. Du willst ein neues Feld einführen, ohne alte Clients zu zerstören. Eine Lösung ist, dass jede Anfrage sagt, welche Version sie erwartet, zum Beispiel über den Header „API-Version: 1.1“. Der Server liefert dann die passende Antwortform.

Seit Spring Framework 7 ist das eingebaut: Du schreibst @GetMapping(version = "1.0") oder version = "1.1+" an die Methoden, und Spring wählt anhand der Anfrage aus. Wo die Version steht (Header, Query-Parameter, Pfad oder Medientyp), legst du zentral fest.

OpenAPI ist die maschinenlesbare Beschreibung deiner API. springdoc erzeugt sie aus dem Code. Das spart Arbeit, birgt aber eine Falle: Die Beschreibung entsteht aus dem, was der Code „hergibt“, nicht aus dem, was zur Laufzeit wirklich passiert.`,
    steps: [
      'In application.properties: spring.mvc.apiversion.use.header=API-Version, spring.mvc.apiversion.supported=1.0,1.1 und spring.mvc.apiversion.default=1.0.',
      '@GetMapping(version = "1.0") bedient nur Version 1.0; @GetMapping(version = "1.1+") bedient 1.1 und alle späteren unterstützten Versionen.',
      'Eine Methode ohne version (z. B. get-by-id) gilt für jede Version, hat aber die niedrigste Priorität.',
      'Der Test sendet API-Version 1.0 und erwartet kein dueDate; bei 1.1 erwartet er dueDate. Ohne Header gilt die Standardversion 1.0.',
      'Eine nicht unterstützte Version (9.9) liefert 400. Im Lauf lautete die Meldung „Invalid API version: \'9.9.0\'“ (Spring normalisiert auf drei Teile).',
      'Beobachtung zum erzeugten OpenAPI-Dokument (springdoc 3.2.0): beide Listen-Methoden erscheinen als eine Operation mit Header-Parameter (erlaubt: 1.1, 1.0) und einer oneOf-Antwort aus V1 und V11.',
      'Lücke: Der POST stand zunächst mit „200“ im Dokument, obwohl er 201 liefert, und der Fehlervertrag (application/problem+json) fehlte. Mit @ApiResponse(responseCode = "201") und @ApiResponse(422, mediaType = application/problem+json) ist das behoben und per Test abgesichert.',
    ],
    code: { file: lab + 'src/main/java/de/rootpfad/lab/task/TaskController.java', lang: 'Java', from: '@GetMapping(version = "1.0")', to: 'ResponseEntity.created', plus: 1 },
    code2: { file: lab + 'src/main/resources/application.properties', lang: 'Properties', from: '# Versionierung', to: 'apiversion.default' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `GET /api/tasks   API-Version: 1.0  -> [{"id":..,"title":..,"done":..}]            (ohne dueDate)
GET /api/tasks   API-Version: 1.1  -> [{"id":..,"title":..,"done":..,"dueDate":..}]
GET /api/tasks   (ohne Header)     -> Standardversion 1.0
GET /api/tasks   API-Version: 9.9  -> 400 "Invalid API version: '9.9.0'."
GET /v3/api-docs                   -> OpenAPI 3.1.0 mit POST-Antworten 201 und 422 (application/problem+json)`,
    mistakes: [
      { wrong: 'Das generierte OpenAPI-Dokument ungeprüft als Wahrheit veröffentlichen.',
        why: 'Springdoc sieht nur Signaturen und Annotationen. Im Lab standen zunächst ein falscher Statuscode (200 statt 201) und keine Fehlerantworten im Dokument.',
        fix: 'Das Dokument im Test prüfen (wie im Lab) und wichtige Antworten ausdrücklich mit @ApiResponse beschreiben.' },
      { wrong: 'Für jede kleine Änderung eine neue API-Version einführen.',
        why: 'Jede Version muss gepflegt, getestet und irgendwann abgeschaltet werden. Additive Änderungen (neues optionales Feld) sind meist ohne neue Version möglich.',
        fix: 'Versionieren, wenn sich ein Vertrag inkompatibel ändert (Feld entfällt, Bedeutung ändert sich). Sonst additiv erweitern und Clients tolerant lesen lassen.' },
      { wrong: 'Eine alte Version abschalten, ohne die Nutzer zu informieren.',
        why: 'Clients, die nie aktualisiert wurden, brechen sofort.',
        fix: 'Ablaufdatum ankündigen und eine Deprecation-Strategie festlegen. Spring bietet dafür einen Deprecation-Handler (laut Framework-Doku) – Einführung und Wirkung im eigenen Projekt prüfen.' },
    ],
    practice: 'Plane vor der ersten Version: Wo steht die Version (Header ist sauber und URL-neutral, Pfad ist für Caches und Tests bequem)? Wie lange werden alte Versionen unterstützt? Wer entscheidet über das Ende? Schreibe diese Regeln in die API-Beschreibung. Beachte außerdem: Die Lösung im Lab (Boot 4.1.2, Framework 7) ist bewusst auf den Header beschränkt; andere Strategien funktionieren analog, wurden hier aber nicht getestet.',
    exercises: [
      { task: 'Ergänze Version 1.2, die zusätzlich das Feld createdAt liefert. Erweitere die Konfiguration und schreibe einen Test für 1.2.', acceptance: 'Version 1.2 liefert createdAt; 1.0 und 1.1 bleiben unverändert; Test ist grün.' },
      { task: 'Grenzfall: Rufe /api/tasks mit API-Version 1.5 auf, ohne sie in supported einzutragen. Notiere die Antwort und erkläre den Unterschied zu „1.1+“.', acceptance: 'Antwort 400 mit Hinweis auf die ungültige Version; Erklärung nennt, dass nur unterstützte Versionen zugelassen sind.' },
      { task: 'Fehlerfall: Entferne die @ApiResponse-Annotationen und lies /v3/api-docs. Beschreibe, was im Dokument falsch oder unvollständig ist, und stelle die Annotationen wieder her.', acceptance: 'Dokumentiert: POST steht mit 200, Fehlerantwort fehlt; der Test openApiDocumentsTheRealStatusCodes… schlägt ohne Annotationen fehl.' },
    ],
    quiz: [
      { q: 'Eine Methode hat @GetMapping(version = "1.1+"). Ein Client sendet API-Version 1.2 (unterstützt). Wird die Methode aufgerufen?',
        options: ['Ja, "1.1+" bedeutet Version 1.1 und alle späteren unterstützten Versionen.', 'Nein, nur exakt 1.1 passt.', 'Nur wenn zusätzlich version = "1.2" angegeben ist.'],
        correct: 0,
        rationales: ['So ist die Mindestversionsschreibweise definiert, solange keine spezifischere Methode für 1.2 existiert.', 'Exakte Version wäre version = "1.1" ohne Plus.', 'Ein zusätzlicher Eintrag ist nur nötig, wenn 1.2 anders reagieren soll.'],
        explain: '„1.1+“ ist eine Baseline: ab 1.1 aufwärts, wenn nichts Spezielleres passt.' },
      { q: 'Das generierte OpenAPI-Dokument zeigt für den POST nur die Antwort 200, obwohl der Controller 201 liefert. Was ist die beste Reaktion?',
        options: ['Das Dokument wird so veröffentlicht; es wurde ja automatisch erzeugt.', 'Den Statuscode per @ApiResponse beschreiben und das Dokument in einem Test prüfen.', 'Den Controller auf 200 umstellen, damit er zum Dokument passt.'],
        correct: 1,
        rationales: ['Ein falsches Dokument führt Client-Entwickler in die Irre.', 'So ist die Lücke geschlossen und bleibt es durch den Test.', 'Der Vertrag (201 + Location) ist fachlich richtig; das Dokument muss sich anpassen, nicht umgekehrt.'],
        explain: 'Generierte Dokumentation ersetzt nicht die Prüfung; wichtige Antworten ausdrücklich beschreiben und testen.' },
      { q: 'Wann lohnt sich eine neue API-Version?',
        options: ['Bei jedem neuen optionalen Feld, das eine Antwort zusätzlich enthält.', 'Bei einer inkompatiblen Änderung, z. B. wenn ein Feld entfällt oder seine Bedeutung ändert.', 'Immer zum Jahresanfang, damit die Nummern zum Kalender passen.'],
        correct: 1,
        rationales: ['Ein zusätzliches optionales Feld ist abwärtskompatibel; dafür braucht es keine neue Version.', 'Inkompatible Änderungen würden alte Clients brechen und brauchen einen getrennten Vertrag.', 'Versionen folgen aus inkompatiblen Änderungen, nicht aus dem Kalender.'],
        explain: 'Neue Version nur bei inkompatiblen Änderungen; sonst additiv erweitern.' },
    ],
    sources: [
      docs('Spring Framework: API Versioning (MVC)', 'https://docs.spring.io/spring-framework/reference/web/webmvc-versioning.html'),
      docs('springdoc-openapi', 'https://springdoc.org/', 'Springdoc-Quelltext laut GitHub: Apache-2.0.'),
    ],
    verification: 'Lab mit Spring Boot 4.1.2 und springdoc 3.2.0 unter JDK 21.0.11 und 26.0.1 per MockMvc getestet. Nur die Header-Strategie wurde ausprobiert. Kein Lauf gegen einen externen OpenAPI-Validator.',
  },

  {
    id: 'java-m26-l5', title: 'Spring Boot 4 und Spring Framework 7: was sich ändert', minutes: 35,
    prerequisites: 'Spring-Grundlagen (Modul 21–24); Maven-Grundlagen.',
    objectives: [
      'Die modulare Starter-Struktur von Spring Boot 4 beschreiben und Abhängigkeiten dazu anpassen',
      'Typische Importänderungen in Tests erkennen',
      'Jackson 3 und JSpecify als neue Grundlagen einordnen',
      'Einen Migrationsplan mit den „classic“-Startern als Zwischenschritt aufstellen',
    ],
    simple: `Spring Boot 4 (Basis ist Spring Framework 7) ist eine Hauptversion. Die größte Änderung für den Alltag: Boot ist jetzt in viele kleine, thematisch benannte Module aufgeteilt. Früher kam vieles „automatisch“ mit einem großen Starter mit. Jetzt gilt eine einfache Regel: Für jede Technik gibt es ein Modul spring-boot-<technik> und einen Starter spring-boot-starter-<technik>.

Das bedeutet: Du brauchst für manche Dinge einen ausdrücklichen Starter, wo früher die reine Bibliothek reichte. Das habe ich im Lab selbst erlebt: Der erste Teststart brach mit „No qualifying bean of type RestClient$Builder“ ab, bis ich spring-boot-starter-restclient hinzufügte.

Weitere Neuerungen laut Migrationsleitfaden: Jackson 3 (Pakete tools.jackson statt com.fasterxml.jackson), JSpecify-Annotationen für Null-Sicherheit und Java 17 als Mindestversion.`,
    steps: [
      'Mindestanforderungen (Migrationsleitfaden): Java 17 oder neuer, Spring Framework 7, Jakarta EE 11 mit Servlet 6.1. Das Lab nutzt Java 21.',
      'Starter-Namensregel: spring-boot-starter-<technik>; Testmodule: spring-boot-starter-<technik>-test; Pakete: org.springframework.boot.<technik>.',
      'spring-boot-starter-web heißt jetzt spring-boot-starter-webmvc. Der alte Name existiert noch, gilt aber als veraltet.',
      'Flyway und Liquibase brauchen eigene Starter (spring-boot-starter-flyway, spring-boot-starter-liquibase). RestClient/RestTemplate haben spring-boot-starter-restclient.',
      'Testimporte ändern sich entsprechend. Im Lab beobachtet: AutoConfigureMockMvc liegt in org.springframework.boot.webmvc.test.autoconfigure, DataJpaTest in org.springframework.boot.data.jpa.test.autoconfigure.',
      'Jackson 3: neue Gruppen-ID und Pakete (tools.jackson). Ein Stopp-Gap-Modul spring-boot-jackson2 existiert für alle, die noch nicht migrieren können.',
      'Spring Retry ist aus der Boot-Abhängigkeitsverwaltung entfernt: Wiederholung und Parallelitätsgrenze sind jetzt im Framework (siehe nächste Lektion).',
      'Undertow wird nicht mehr unterstützt (Servlet-6.1-Basis).',
      'Migrationsstrategie: Zuerst spring-boot-starter-classic (und spring-boot-starter-test-classic) hinzufügen, bis alles läuft; danach die Classic-Starter entfernen und fehlende Starter anhand der Importfehler ergänzen.',
    ],
    code: { file: lab + 'pom.xml', lang: 'XML', from: '<dependencies>', to: '<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>', plus: 2 },
    order: ['body', 'code', 'body2'],
    output: `Beobachtet im Lab (ohne spring-boot-starter-restclient):
UnsatisfiedDependencyException: No qualifying bean of type 'org.springframework.web.client.RestClient$Builder' available
Nach Ergänzen des Starters: alle Tests grün.`,
    mistakes: [
      { wrong: 'Tutorials für Boot 3 unverändert übernehmen (Abhängigkeiten, Importe, Annotationen).',
        why: 'Pakete und Starter haben sich geändert. Das Ergebnis sind Kompilierfehler oder fehlende Beans zur Laufzeit.',
        fix: 'Den offiziellen Migrationsleitfaden lesen und die Einstellungen am eigenen Boot-Stand prüfen; Quellen auf das Versionsdatum achten.' },
      { wrong: 'Jackson 2 und Jackson 3 gemischt verwenden, ohne zu wissen, welche Variante Boot konfiguriert.',
        why: 'Die Auto-Konfiguration bezieht sich auf Jackson 3. Ein ObjectMapper aus Jackson 2 ist nicht automatisch derselbe und verhält sich anders.',
        fix: 'Möglichst vollständig auf Jackson 3 umstellen; Jackson 2 nur als bewusste Übergangslösung (spring-boot-jackson2).' },
      { wrong: 'Boot-4-Anwendung und Boot-3-Bibliotheken ungeprüft mischen.',
        why: 'Bibliotheken, die Boot-3-Pakete erwarten, funktionieren oft nicht mit dem neuen Aufbau.',
        fix: 'Für jede Bibliothek prüfen, ob sie Boot 4 unterstützt; Hauptversionen im Lockfile bzw. in der POM-Dokumentation festhalten.' },
    ],
    practice: 'Plane eine Migration als eigenes kleines Projekt: Branch, Classic-Starter, Build grün, Tests grün, Classic-Starter wieder entfernen, Dependencies prüfen (mvn dependency:tree), danach erst neue Funktionen nutzen. Versionsnummern stehen nicht in diesem Text, weil sie sich ändern: Prüfe auf start.spring.io und in der System-Requirements-Seite die aktuell gültigen Werte.',
    exercises: [
      { task: 'Erzeuge auf start.spring.io ein Projekt mit Web und Validation. Lies die pom.xml und liste, welche Starter enthalten sind (webmvc statt web?).', acceptance: 'Liste der Starter ist vorhanden; sie enthält spring-boot-starter-webmvc und die zugehörigen -test-Starter.' },
      { task: 'Grenzfall: Entferne im Lab spring-boot-starter-restclient aus der pom.xml und starte die Tests. Notiere die Fehlermeldung, dann stelle den Starter wieder her.', acceptance: 'Fehlermeldung „No qualifying bean of type RestClient$Builder“ ist reproduziert; Tests laufen nach der Korrektur wieder.' },
      { task: 'Fehlerfall: Suche in einem eigenen Boot-3-Projekt alle Importe mit com.fasterxml.jackson und liste, welche sich für Boot 4 ändern würden.', acceptance: 'Liste der betroffenen Klassen mit dem neuen Paketpräfix tools.jackson; offene Punkte sind markiert (z. B. Annotationen, die weiter im alten Paket liegen könnten – laut Leitfaden prüfen).' },
    ],
    quiz: [
      { q: 'Beim Start einer Boot-4-Anwendung fehlt die Bean RestClient$Builder. Welche Ursache passt zur neuen Modularität?',
        options: ['Der Starter spring-boot-starter-restclient fehlt.', 'Die Anwendung muss auf Java 8 laufen.', 'Spring Retry ist nicht installiert.'],
        correct: 0,
        rationales: ['RestClient-Unterstützung hat einen eigenen Starter; ohne ihn gibt es die Auto-Konfiguration nicht (im Lab so erlebt).', 'Boot 4 verlangt Java 17 oder neuer, nicht Java 8.', 'Spring Retry ist für diese Bean nicht zuständig.'],
        explain: 'Boot 4 verteilt Funktionen auf thematische Starter; fehlende Starter führen zu fehlenden Beans.' },
      { q: 'Wie lautet der empfohlene Zwischenschritt bei einer großen Migration auf Boot 4?',
        options: ['Alle Bibliotheken entfernen und das Projekt mit Boot 4 neu aufsetzen.', 'Zuerst die Classic-Starter einsetzen, bis alles läuft, und sie danach durch die gezielten Starter ersetzen.', 'Jackson 3 ablehnen und eine eigene Serialisierung für alle Typen bauen.'],
        correct: 1,
        rationales: ['Das ist unverhältnismäßig; die Classic-Starter ermöglichen einen schrittweisen Umstieg.', 'Der Leitfaden beschreibt genau diesen zweistufigen Weg.', 'Eine eigene Serialisierung ist Aufwand ohne Nutzen; Boot 4 nutzt Jackson 3 (Paket tools.jackson).'],
        explain: 'Classic-Starter geben eine lauffähige Zwischenstufe; danach wird auf modulare Starter umgestellt.' },
      { q: 'Was gilt für Spring Retry in Boot 4?',
        options: ['Boot verwaltet die Version weiterhin, das Projekt wurde nur umbenannt.', 'Die Versionsverwaltung durch Boot wurde entfernt; die Funktionen liegen jetzt im Spring Framework.', 'Es bleibt die einzige unterstützte Möglichkeit für Wiederholungen bei Aufrufen.'],
        correct: 1,
        rationales: ['Die Versionsverwaltung durch Boot wurde laut Migrationsleitfaden entfernt.', 'Das Framework 7 enthält @Retryable und @ConcurrencyLimit im Kern.', 'Spring Framework 7 bringt eigene Resilienz-Funktionen (@Retryable) mit.'],
        explain: 'Retry-Funktionen gehören jetzt zum Framework; Spring Retry braucht eine ausdrückliche Version, falls weiter verwendet.' },
    ],
    sources: [
      docs('Spring Boot 4.0 Migration Guide (GitHub-Wiki)', 'https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide', 'Primärquelle für alle Änderungen dieser Lektion.'),
      docs('Spring Boot: System Requirements', 'https://docs.spring.io/spring-boot/system-requirements.html', 'Aktuelle Mindestversionen dort nachsehen.'),
      docs('Spring Initializr', 'https://start.spring.io/', 'Erzeugt Projekte mit den aktuell gültigen Startern.'),
    ],
    verification: 'Aussagen zu Startern, Java-Baseline, Jackson 3 und Classic-Startern stammen aus dem Migrationsleitfaden (am 12.11.2026 gelesen). Der RestClient-Fehler wurde im Lab selbst reproduziert; die geänderten Testpakete wurden durch Kompilieren geprüft. Eine vollständige Migration eines großen Projekts wurde nicht durchgeführt.',
  },

  {
    id: 'java-m26-l6', title: 'Fremdsysteme aufrufen: Timeouts, Retry und Parallelitätsgrenze', minutes: 40,
    prerequisites: 'Lektion „Spring Boot 4 und Spring Framework 7“; HTTP-Statuscodes; Idempotenz-Begriff.',
    objectives: [
      'Connect- und Read-Timeout für alle HTTP-Clients zentral festlegen',
      'Mit @Retryable nur sinnvolle Fehler wiederholen und die Gesamtzahl der Versuche berechnen',
      'Mit @ConcurrencyLimit die Zahl gleichzeitiger Aufrufe an ein Fremdsystem begrenzen',
      'Begründen, warum nicht-idempotente Aufrufe (POST) nicht blind wiederholt werden dürfen',
    ],
    simple: `Dein Service ruft ein anderes System auf (Wechselkurse, Zahlungsanbieter, ein Nachbar-Service). Das andere System ist mal langsam, mal kurz nicht erreichbar. Ohne Schutz hängen deine Threads fest, oder du wiederholst panisch und überlastest das System noch mehr.

Drei einfache Schutzschichten helfen:
1. Timeouts: „Länger als 2 Sekunden warte ich nicht.“ Ohne Timeout kann ein hängender Aufruf sehr lange blockieren.
2. Retry: Bei kurzen Störungen (Netz, 503) einfach noch einmal versuchen – aber nur ein paar Mal und mit wachsendem Abstand.
3. Parallelitätsgrenze: „Höchstens 4 Aufrufe gleichzeitig“, damit du das Fremdsystem nicht überrollst.

Spring Framework 7 liefert Retry und Parallelitätsgrenze als Annotationen im Kern mit (@Retryable und @ConcurrencyLimit). Aktiviert werden sie mit @EnableResilientMethods.`,
    steps: [
      'application.properties: spring.http.clients.connect-timeout=1s und read-timeout=2s gelten für alle automatisch konfigurierten HTTP-Clients.',
      '@EnableResilientMethods auf einer Konfigurationsklasse schaltet die Annotationen ein. Ohne sie passiert still nichts.',
      '@Retryable(includes = {ResourceAccessException.class, HttpServerErrorException.class}, maxRetries = 2, delay = 20, multiplier = 2, jitter = 5): Wiederholt werden Netzfehler/Timeouts und 5xx-Antworten. 4xx-Fehler nicht.',
      'maxRetries = 2 heißt: 1 erster Versuch + 2 Wiederholungen = 3 Aufrufe. Das belegen die Tests (3 Aufrufe).',
      'delay und multiplier bilden einen wachsenden Abstand (Backoff); jitter streut die Wartezeit zufällig, damit nicht alle Clients gleichzeitig wiederkommen.',
      'Der Test startet einen echten lokalen HTTP-Server: zwei 503-Antworten und dann Erfolg → 3 Aufrufe und Ergebnis 1.0842. Bei dauerhaftem 503 → nach 3 Aufrufen HttpServerErrorException. Bei 404 → nur 1 Aufruf.',
      'Ein Read-Timeout (Antwort dauert 1 s, Limit 300 ms im Test) erscheint als ResourceAccessException und wird ebenfalls wiederholt (3 Aufrufe).',
      '@ConcurrencyLimit(4) begrenzt, wie viele Threads die Methode gleichzeitig betreten dürfen.',
    ],
    code: { file: lab + 'src/main/java/de/rootpfad/lab/client/ExchangeRateClient.java', lang: 'Java', from: '@Component', to: 'return response.rate();', plus: 2 },
    code2: { file: lab + 'src/test/java/de/rootpfad/lab/client/ExchangeRateClientTest.java', lang: 'Java', from: 'void retriesServerErrorsAndSucceeds', to: 'assertThat(calls.get()).isEqualTo(1);', back: 1, plus: 1 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `ExchangeRateClientTest: 4 Tests, alle grün
 - retriesServerErrorsAndSucceeds        -> 3 Aufrufe, Ergebnis 1.0842
 - givesUpAfterMaxRetries                -> 3 Aufrufe, HttpServerErrorException
 - doesNotRetryClientErrors              -> 1 Aufruf, HttpClientErrorException
 - readTimeoutSurfacesAsResourceAccessException -> 3 Aufrufe, ResourceAccessException`,
    mistakes: [
      { wrong: 'Einen POST (z. B. „Zahlung auslösen“) automatisch wiederholen.',
        why: 'Kam die erste Anfrage beim Server an und nur die Antwort ging verloren, wird die Zahlung doppelt ausgeführt. Idempotent sind GET, PUT, DELETE – ein POST nicht automatisch.',
        fix: 'Nur idempotente Aufrufe wiederholen oder dem Fremdsystem einen Idempotenzschlüssel mitgeben, damit Wiederholungen erkannt werden.' },
      { wrong: 'Jede Ausnahme wiederholen (Standard ohne includes).',
        why: 'Ein 400/404 ändert sich durch Wiederholen nicht. Man verschwendet Zeit und belastet das Fremdsystem.',
        fix: 'includes auf vorübergehende Fehler beschränken (Netz, Timeout, 503).' },
      { wrong: 'Keine Timeouts setzen und sich auf „der andere antwortet schon“ verlassen.',
        why: 'Ein hängender Aufruf belegt einen Thread, bis irgendetwas anderes abbricht. Viele davon legen den Service lahm.',
        fix: 'connect-timeout und read-timeout immer ausdrücklich setzen; Gesamtdauer inklusive aller Wiederholungen im Blick behalten.' },
      { wrong: 'Vergessen, @EnableResilientMethods zu aktivieren.',
        why: 'Die Annotationen sind nur Metadaten. Ohne Aktivierung wird nie wiederholt, und es gibt keinen Fehler.',
        fix: 'Aktivierung in der Anwendung festhalten und im Test belegen, dass Wiederholungen tatsächlich stattfinden (wie im Lab).' },
    ],
    practice: 'Rechne die Gesamtdauer: Bei read-timeout 2 s und 3 Versuchen können allein die Wartezeiten 6 s plus Backoff überschreiten. Das muss zu den Timeouts deiner eigenen Clients passen. Beobachte Wiederholungen mit Metriken oder Logs, sonst bleiben Störungen unsichtbar. Für komplexere Anforderungen (Circuit Breaker) gibt es spezialisierte Bibliotheken; die Annotationen im Framework sind bewusst einfach gehalten.',
    exercises: [
      { task: 'Ändere maxRetries auf 4 und passe die Tests an. Berechne vorher, wie viele Aufrufe bei dauerhaftem 503 stattfinden.', acceptance: 'Erwartung 5 Aufrufe; die Tests bestätigen es.' },
      { task: 'Grenzfall: Setze read-timeout im Test auf 2 s und die Serververzögerung auf 1,5 s. Was passiert, und warum gibt es keine Wiederholung?', acceptance: 'Aufruf gelingt ohne Wiederholung (1 Aufruf), weil die Antwort vor dem Timeout eintrifft.' },
      { task: 'Fehlerfall: Entferne @EnableResilientMethods und führe den Retry-Test aus. Beschreibe das Ergebnis.', acceptance: 'Beobachtet: nur 1 Aufruf, Ausnahme sofort; ohne Aktivierung gibt es keine Wiederholung und keine Fehlermeldung.' },
    ],
    quiz: [
      { q: 'Ein Client mit @Retryable(maxRetries = 2) trifft auf einen dauerhaft ausgefallenen Dienst (503). Wie viele Aufrufe finden statt?',
        options: ['2', '3', '1'],
        correct: 1,
        rationales: ['maxRetries zählt nur die Wiederholungen, der erste Versuch kommt hinzu.', 'Ein Versuch plus zwei Wiederholungen ergibt drei Aufrufe (im Lab-Test belegt).', 'Mit einem Aufruf würde nie wiederholt; der Fall ist dafür gedacht.'],
        explain: 'Gesamtversuche = 1 + maxRetries.' },
      { q: 'Warum sollte ein POST, der eine Zahlung auslöst, nicht blind wiederholt werden?',
        options: ['Weil POST immer einen Timeout auslöst.', 'Weil die Zahlung doppelt ausgelöst werden könnte, wenn nur die Antwort verloren ging.', 'Weil @Retryable keine Methoden mit Rückgabewert unterstützt.'],
        correct: 1,
        rationales: ['POST hat keine besondere Timeout-Eigenschaft.', 'Nicht-idempotente Operationen dürfen nur mit Idempotenzschlüssel wiederholt werden.', 'Rückgabewerte sind kein Hindernis (das Lab liefert ein BigDecimal).'],
        explain: 'Nicht idempotente Aufrufe brauchen einen Idempotenzschlüssel, bevor sie wiederholt werden dürfen.' },
      { q: 'Welche Wirkung hat @ConcurrencyLimit(4) auf eine Methode?',
        options: ['Sie darf höchstens 4-mal insgesamt aufgerufen werden.', 'Höchstens 4 Threads dürfen sie gleichzeitig ausführen.', 'Sie wird bei Fehler 4-mal wiederholt.'],
        correct: 1,
        rationales: ['Das wäre eine Gesamtbegrenzung; es geht um Gleichzeitigkeit.', 'Die Zahl begrenzt die parallele Ausführung und schützt das Fremdsystem.', 'Wiederholungen steuert @Retryable.'],
        explain: '@ConcurrencyLimit begrenzt die Zahl gleichzeitiger Aufrufe.' },
    ],
    sources: [
      docs('Spring Framework: Resilience-Features (@Retryable, @ConcurrencyLimit)', 'https://docs.spring.io/spring-framework/reference/core/resilience.html'),
      docs('Spring Boot Referenz: REST Clients', 'https://docs.spring.io/spring-boot/reference/io/rest-client.html', 'Quelle für die Properties spring.http.clients.*.'),
    ],
    verification: 'Alle vier Tests laufen im Lab grün (JDK 21.0.11 und 26.0.1) gegen einen lokalen JDK-HttpServer. Kein Test gegen ein echtes Fremdsystem; @ConcurrencyLimit wurde nicht unter Last getestet.',
  },
];
