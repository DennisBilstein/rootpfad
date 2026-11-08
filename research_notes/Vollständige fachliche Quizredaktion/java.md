# Java und Spring – vollständige fachliche Quizredaktion

## 1. Umfang, Redaktionsmaßstab und nachgewiesene Vollständigkeit

### Takeaway
Alle **209** Datensätze aus `content/quiz-batches/java-input.json` wurden einzeln neu formuliert und in `content/quiz-batches/java-revised.json` gespeichert. Identitäten und Reihenfolge bleiben erhalten; jeder Datensatz enthält vier Antwortmöglichkeiten, einen numerischen richtigen Index und vier eigene, positionsgleiche Begründungen.

### Cited Findings
- Verbindliche Java-Sprachregeln sind anhand der Java-SE-25-Spezifikation prüfbar; diese wurde als feste Referenz verwendet, nicht als Behauptung über die jeweils neueste Java-Version. — [JLS SE 25](https://docs.oracle.com/javase/specs/jls/se25/html/index.html)
- `javac` übersetzt Java-Quellen in Klassendateien. Die Quizfrage zur Übersetzung behauptet ausdrücklich keine universell vorgeschriebene historische `main`-Signatur. — [javac-Werkzeugdokumentation](https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html)
- Instanz-`main` und kompakte Quelldateien sind in Java 25 ausgeliefert; `public static void main(String[] args)` ist deshalb keine universelle Ausschließlichkeitsregel für modernes Java. — [OpenJDK JEP 512](https://openjdk.org/jeps/512)
- Ausführbare Tests mit sinnvollen Assertions sind ein geeigneter Teil einer ausgewogenen Teststrategie; bloß hohe Ausführungsabdeckung ersetzt keine fachlichen Sollprüfungen. — [JUnit-Dokumentation](https://docs.junit.org/current/user-guide/), [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

### Inferences
- Die Szenarien verlangen Fehlerdiagnose, konkrete Codeauswertung, Grenzfallauswahl, Modellentscheidung oder Vertragsanalyse statt bloß ursprünglicher Definitionsabfrage. Die äußeren Fallgeschichten sind redaktionell konstruiert, keine Behauptungen über reale Unternehmen.
- Die Antwortpositionen sind verteilt: Index 0: 52, Index 1: 52, Index 2: 53, Index 3: 52. Insgesamt liegen **836 Antworttexte und 836 individuelle Begründungen** vor.
- Geprüft wurden: Arraylänge 209; exakte Identitäten `(lesson,index)` beziehungsweise `(lesson,extraId)`; gleiche Reihenfolge; keine doppelten Identitäten oder Fragen; vier verschiedene Optionen und Begründungen pro Frage; `correct` als Integer 0–3; `explain == rationales[correct]`; alle Fragen gegenüber der Eingabe verändert; erforderliche Felder; `revision: 2026-11-07-full-v3`; `level: Anwendung/Analyse`.
- Alle **69 unterschiedlichen tatsächlich eingebetteten Quellen-URLs** wurden am Ende erneut abgerufen: **69 HTTP-200-Antworten**, keine Antwort unter 1000 Byte. Erreichbarkeit ist ein technischer Quellencheck und allein kein Beweis jeder redaktionellen Aussage.
- Die JSON-Datei wurde während der Erstellung wiederholt gültig gespeichert, anschließend vollständig validiert und fachlich nachpoliert. Keine App-, UI-, Routing- oder Laufzeitdateien wurden für diesen Auftrag geändert.

### Gaps
- Der Auftrag begann mit Redaktionsstand 7. November 2026; nach mehreren Serverneustarts endete die Prüfung am 8. November 2026. Das ausdrücklich verlangte Revisionskennzeichen blieb unverändert. Es wurden keine unbelegten Releasebehauptungen für den Stichtag ergänzt.
- Aussagen über eine pauschale IHK-Bewertungstoleranz wurden nicht übernommen: Die erste Aufgabe prüft nun konkret eine fehlerhafte Schleifengrenze statt eine nicht belegte allgemeine Prüfungsbewertung.
- Die ursprüngliche Frage zur Normalisierung enthielt keine ausreichenden Abhängigkeitsannahmen. Die Neufassung nennt Kandidatenschlüssel und funktionale Abhängigkeiten ausdrücklich; daraus folgt im betreffenden Szenario ein 3NF- statt des ursprünglich pauschal behaupteten 2NF-Verstoßes. — [Microsoft: Normalisierung](https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description)

## 2. Java-Fakten und korrigierte fachliche Übervereinfachungen

### Takeaway
Wesentliche Präzisierungen betreffen Referenzsemantik, flache Unveränderlichkeit, generische Erasure, Hashverträge, speicherbezogene Optimierungsaussagen und nebenläufige Ressourcengrenzen. Wo aus einer API-Garantie keine pauschale Laufzeitaussage folgt, enthalten die neuen Fragen die nötigen Bedingungen.

### Cited Findings
- Gleiche Objekte nach `equals` müssen gleiche Hashwerte liefern; gleiche Hashwerte implizieren umgekehrt keine Gleichheit. Überschreiben von `equals` ohne passende `hashCode`-Semantik ist ein möglicher Vertragsbruch, kein zwingender Compilerfehler und kein deterministisches Versagen jedes einzelnen Zugriffs. — [Object.equals/hashCode](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html)
- HashMap-Zugriff hat die dokumentierten konstanten Leistungseigenschaften unter geeigneter Verteilung der Hashwerte; daraus wurde keine bedingungslose Worst-Case-Garantie gemacht. — [HashMap](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/HashMap.html)
- Für Boxing geeigneter kleiner konstanter Werte gilt Identitätsgarantie im festgelegten Bereich; für 128 folgt keine universelle `== false`-Garantie. Die Aufgaben verlangen deshalb Wertvergleich statt Abhängigkeit von optional erweiterten Caches. — [JLS 5: Conversions](https://docs.oracle.com/javase/specs/jls/se25/html/jls-5.html)
- `final` schützt eine Variable vor Neuzuweisung, nicht automatisch den erreichbaren Objektinhalt. Record-Komponenten liefern finale Felder, aber keine automatische Tiefenkopie beliebiger Listenelemente. — [JLS 4](https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html), [JLS 8](https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html)
- Interfacefelder sind `public static final`; eine solche Referenz kann dennoch ein veränderliches Objekt bezeichnen. Die alte absolute Aussage, Interfaces könnten keinerlei veränderlichen referenzierten Zustand enthalten, wurde verworfen. — [JLS 9](https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html)
- `List.copyOf` und unveränderliche Sichten sind nicht dasselbe wie tiefe Kopien; `Arrays.asList` bietet feste Größe und Arrayhinterlegung, nicht allgemeine Unveränderlichkeit. — [List](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/List.html), [Arrays](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html)
- Ressourcen in try-with-resources schließen in umgekehrter Initialisierungsreihenfolge; bei Primärfehlern werden weitere Schließfehler unterdrückt angehängt. — [JLS 14](https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html)
- Stream-Pipelines sind lazy. `groupingBy`, `counting` und die fehlende Merge-Funktion bei doppelten `toMap`-Schlüsseln haben unterschiedliche konkrete Verträge. — [Stream-Paket](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html), [Collectors](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Collectors.html)
- `orElse` erhält ein bereits ausgewertetes Argument, `orElseGet` einen bei Bedarf verwendeten Supplier. — [Optional](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html)
- Das JVM-Modell ordnet Objekte dem Heap zu; daraus folgt keine Behauptung, dass jede Quellcodekonstruktion unabhängig von JIT-Optimierung genau eine physische Allokation erzeugt. — [JVMS 2.5.3](https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html#jvms-2.5.3)
- Virtuelle Threads dienen hoher Nebenläufigkeit vieler wartender Aufgaben, erzeugen aber keine zusätzlichen CPU-Kerne und keine unbegrenzte Datenbankkapazität. — [Virtual Threads](https://docs.oracle.com/en/java/javase/25/core/virtual-threads.html)
- Volatile bietet Sichtbarkeits-/Ordnungsregeln, jedoch keine automatische Atomarität von `zaehler++`. Unterbrechungen können propagiert oder gemäß API-Vertrag behandelt werden; Wiederherstellen ist insbesondere beim Nichtweiterwerfen relevant. — [java.util.concurrent](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html)
- `thenCombine` kombiniert Ergebnisse; es ist keine eigene Garantie, dass die vorgelagerten Aufgaben überhaupt parallel gestartet wurden. — [CompletableFuture](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CompletableFuture.html)
- Viele moderne Textdatei-APIs haben definierte UTF-8-Verträge. Die Charset-Aufgaben behaupten deshalb nicht mehr pauschal unterschiedliche Plattformdefaults; sie prüfen den konkreten Dateivertrag, insbesondere fremde Windows-1252-Dateien. — [Files](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/file/Files.html)
- Parameterisiertes Logging spart mögliche Nachrichtenformatierung, verzögert aber keine beliebigen bereits ausgewerteten Argumentausdrücke. — [SLF4J FAQ](https://www.slf4j.org/faq.html)
- Passwortspeicherung erfordert geeignete dedizierte Verfahren und individuelle Salts; Base64 oder schnelle ungesalzte Hashes sind kein Ersatz. — [Spring Security Password Storage](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html), [OWASP-Originaltext](https://raw.githubusercontent.com/OWASP/CheatSheetSeries/master/cheatsheets/Password_Storage_Cheat_Sheet.md)

### Inferences
- Die binäre Suchaufgabe fragt nach zehn rechnerischen Halbierungen von 1024 auf 1, nicht nach einer falsch verallgemeinerten maximalen Zahl konkreter Implementierungsvergleiche. — [NIST: Binary Search](https://xlinux.nist.gov/dads/HTML/binarySearch.html)
- Big-O- und Schleifenrechnungen sind aus den ausdrücklich beschriebenen Durchlaufzahlen abgeleitet; sie behaupten keine gemessenen Laufzeiten einer bestimmten Maschine.
- Ein Fehler im Konstruktor beendet den `new`-Ausdruck abrupt; eine vorherige Speicherreservierung oder externe Nebenwirkung wird damit nicht pauschal unmöglich beziehungsweise automatisch rückgängig. — [JLS 15](https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html)
- Die PAP-Eingabeaufgabe nennt ausdrücklich ihre Unterrichtsvorlage. Das Parallelogramm wird nicht als ungeprüft universell vorgeschriebene Symbolwahl jeder DIN-Ausgabe dargestellt. — [Programmablaufplan: Elemente und Normhinweis](https://de.wikipedia.org/wiki/Programmablaufplan)

### Gaps
- Nicht jede Performancefrage lässt sich ohne Messung beantworten. CPU-Poolgrößen, tatsächliche Boxingallokationen und konkrete ORM-Abfragezahlen sind deshalb bedingt formuliert.
- Die PAP-/Struktogrammzusammenfassungen sind ergänzende Sekundärbelege; eine frei zugängliche aktuelle DIN-Vollfassung wurde nicht als gelesen ausgegeben. — [Nassi-Shneiderman-Diagramm](https://de.wikipedia.org/wiki/Nassi-Shneiderman-Diagramm)

## 3. Spring, HTTP, Persistenz und Betrieb: geprüfte Grenzen

### Takeaway
Die Spring-Aufgaben legen Proxy-Modus, Aufrufweg, Validierungssignatur oder Konfigurationsquellen ausdrücklich fest. Pauschale Aussagen über immer nur öffentliche Transaktionsmethoden, immer genau eine ORM-Abfrage, immer eine COUNT-Abfrage und bedingungslos CSRF-freie Stateless-APIs wurden korrigiert.

### Cited Findings
- Im Standard-Proxy-Modus wird Self-Invocation nicht interzeptiert. Ein interner Aufruf kann gleichwohl innerhalb einer bereits existierenden äußeren Transaktion laufen; die Neufassung unterscheidet beides. — [Using @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)
- Seit Spring 6 können bei Klassenproxies standardmäßig auch protected und package-visible Methoden berücksichtigt werden; Interfaceproxies benötigen öffentliche Methoden des proxied Interface. Private Hilfsmethoden sind nicht die durch Standardproxies abgefangene Transaktionsgrenze. — [Method visibility and @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)
- Der klassische Rollbackstandard erfasst RuntimeException und Error; checked Exceptions sind ohne zusätzliche individuelle oder globale Regeln nicht pauschal erfasst. — [Rolling Back a Declarative Transaction](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html)
- Singleton bedeutet die geteilte Instanz im jeweiligen Container und Bean-Vertrag, nicht globale Einzigkeit über sämtliche JVMs. Zustandslosigkeit ist eine häufig geeignete Gestaltung, keine zwingende Spracheigenschaft jeder Singleton-Bean. — [Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)
- Boot besitzt eine definierte Property-Source-Reihenfolge. CLI überlagert die in der Aufgabe genannten Datei-/Umgebungsquellen; Test- und Devtoolsquellen verhindern die pauschale Aussage, CLI sei immer die absolut höchste Quelle. — [Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- Typisiertes ConfigurationProperties-Binding und konkrete aktivierte Constraints sind voneinander zu unterscheiden; Registrierung und Validierungsregeln müssen vorhanden sein. — [Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- Bei der angegebenen `@Valid @RequestBody`-Signatur ohne BindingResult ist MethodArgumentNotValidException mit HTTP 400 typisch. Andere Methodenvalidierungsszenarien können andere Ausnahmetypen haben. — [RequestBody validation](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)
- ProblemDetail unterstützt das standardisierte Problem-Details-Format; HTTP-Statuscodes wie 201 und 204 haben eigene Semantik, und 204 enthält keinen Antwortinhalt. — [Spring Error Responses](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html), [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)
- EntityGraph beschreibt einen Fetchplan, keine universelle Ein-SQL-Garantie. Projektionen hängen in ihrer Optimierung von Art, Feldern und verschachtelten Pfaden ab. — [JPA Query Methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html), [Projections](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html)
- Page benötigt Gesamtmetadaten; eine Count-Abfrage kann nötig sein, aber optimiert entfallen. Slice verlangt keine Gesamtzahl und kann deren Ermittlung vermeiden. — [Repository Query Methods](https://docs.spring.io/spring-data/commons/reference/repositories/query-methods-details.html)
- WebMvcTest und DataJpaTest sind fokussierte Test-Slices, nicht nur ein einzelnes Objekt beziehungsweise zwingend der gesamte Produktivkontext. Passende Testcontainer können Datenbankunterschiede gegenüber H2 sichtbar machen. — [Testing Spring Boot Applications](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html)
- Reihenfolge von Security-Matchern ist relevant. Anmeldung ist nicht dasselbe wie Objektberechtigung. — [Authorize HTTP Requests](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html)
- Statelessness allein garantiert keine CSRF-Freiheit. Entscheidend sind insbesondere automatisch mitgesendete Browsercredentials; die Aufgabe begrenzt das Beispiel ausdrücklich auf ausschließlich explizite Authorization-Bearer-Header ohne solche Credentials. — [CSRF](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html)
- Öffentliche Managementendpunkte sind nach Bedarf zu minimieren und abzusichern. Liveness soll keine Neustartkaskade durch gemeinsame externe Abhängigkeiten auslösen; externe Readiness-Prüfungen sind bewusst auszuwählen, nicht pauschal alle zwingend einzubauen. — [Actuator Endpoints und Kubernetes Probes](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html)
- PreparedStatement-Parameter binden Daten, keine beliebigen SQL-Bezeichner. JDBC-Autocommit commitet Statements bei deren Fertigstellung; dies ist genauer als „alles sofort beim Methodenaufruf“. — [PreparedStatement](https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/PreparedStatement.html), [Connection](https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/Connection.html)

### Inferences
- Die überarbeitete Architekturfrage sucht echte Fachlogik im Controller statt nur das umgekehrte Symptom HTTP-Typen im Service. HTTP-Antwortabbildung darf zum Webadapter einschließlich zentraler Fehlerbehandlung gehören, nicht ausschließlich zu einer einzigen Controllerklasse.
- Die Kompatibilitätsfrage nennt ausdrücklich den Vertrag, nach dem Clients unbekannte optionale Felder tolerieren. Eine optionale Ergänzung wird nicht für alle denkbaren strikten Clients als garantiert kompatibel ausgegeben.
- Lasten-/Pflichtenheft bleibt als klassische Rollenunterscheidung zwischen Anforderung und Realisierung beschrieben; daraus wurden keine ungeprüften automatischen Vertragsfolgen abgeleitet. — [REFA: Pflichtenheft](https://refa.de/service/refa-lexikon/pflichtenheft)

### Gaps
- Unversionierte Spring-Referenzseiten sind bewegliche Dokumentation. Die Redaktion übernimmt ihre stabilen Verhaltensregeln und ausdrücklich dokumentierte historische Grenze Spring 6, behauptet aber keine aus deren Navigationskopf abgeleitete aktuellste Releaseversion am Stichtag.
- Es wurde kein Anwendungsintegrationstest ausgeführt, weil ausschließlich Quizdaten und diese Recherchenotiz Gegenstand des Auftrags sind. Die Validierung prüft Datenstruktur, Vollständigkeit, Identitätszuordnung und Quellenzugriff, nicht eine zusätzliche unbekannte App-Renderingkomponente.
