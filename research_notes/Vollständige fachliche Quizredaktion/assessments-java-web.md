# Praktische Assessments Java und Web – assessment-v2

## Welche Module und Versionsgrenzen deckt die Lieferung ab?

### Takeaway
`content/assessments-java-web.json` enthält 31 eigenständig formulierte deutschsprachige praktische Abnahmen: `java-m1` bis `java-m24` und `js-m1`, `html-m1`, `css-m1`, `mariadb-m1`, `api-m1`, `mcp-m1`, `agents-m1`. Alle liefern konkrete Normal-, Grenz- und Fehlerfälle, vier fachbezogene Kriterien und tatsächlich abgerufene offizielle Quellen; keine Anwendung wurde geändert.

### Cited Findings
- Java-Aufgaben verwenden bewusst Java 21 ohne Preview, nicht implizit die neueste Sprachversion. Records und sealed-Hierarchien sowie Kontrollfluss werden durch die Java-21-Spezifikation gedeckt. — [JLS Klassen](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html); [JLS Statements](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html)
- Die beim Abruf angezeigte Boot-Dokumentation ist 4.1.2: mindestens Java 17, Framework 7.0.10 oder höher, Maven ab 3.6.3. Java 21 ist innerhalb des dokumentierten Bereichs. Deshalb sind Spring-Labore auf Boot 4.1.2/Java 21 mit BOM-Verwaltung statt frei gemischter Einzelversionen festgelegt. — [System Requirements](https://docs.spring.io/spring-boot/system-requirements.html)
- Das ausdrücklich JUnit-5-betitelte Modul pinnt Jupiter 5.12.2; die Quelle dokumentiert diese konkrete Version. Kein Upgrade auf eine andere Hauptversion wird als Bestandteil des Assessments vorausgesetzt. — [JUnit 5.12.2 User Guide](https://junit.org/junit5/docs/5.12.2/user-guide/)
- MariaDB-Aufgaben wählen ein isoliertes 11.4-/InnoDB-Labor und verlangen echte Zielsystembelege. CHECK-Prüfung kann abgeschaltet werden; deshalb gehören aktivierte Prüfungen und SQL-Modus ins Protokoll. Die aktuelle Constraint-Dokumentation beschreibt zusätzlich Änderungen ab 12.1, die ausdrücklich nicht pauschal auf das 11.4-Labor übertragen werden. — [CONSTRAINT](https://mariadb.com/docs/server/reference/sql-statements/data-definition/constraint)

### Inferences
- Java 21 und explizite Laborversionen sind didaktische Festlegungen, keine Aussage, dass sie jeweils die neuesten verfügbaren Releases seien.
- Die Aufgaben sind Abnahmeverträge für Lernende, keine Behauptung vorhandener ausführbarer Labore oder bereits bestandener praktischer Prüfungen.

### Gaps
- Java-, Spring-, Browser- und MariaDB-Labore wurden nicht implementiert oder ausgeführt. Sämtliche Einträge bleiben deshalb `execution: manual-review-required`.
- Reproduzierbare Node-/Vue-Paketstände werden aus dem jeweiligen Lernlabor-Lockfile und engines verlangt; es wird keine unbesehen angenommene Node-Mindestversion erfunden.

## Welche fachlichen Fallen sind mit konkreten Gegenbeispielen abgesichert?

### Takeaway
Die Fälle verwenden konkrete Off-by-one-Indizes, Rundungshalbfälle, Konkurrenzabläufe, Sommerzeitdaten, HTTP-Preconditions und Browservalidierung statt generischer Aufforderungen wie „teste eine Grenze“.

### Cited Findings
- `List.copyOf` erzeugt eine unmodifizierbare, nullfreie Liste, aber keine tiefe Kopie veränderlicher Elemente. Snapshot-Aufgabe trennt diese Aussagen und verspricht keine neue Objektidentität. — [List API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)
- Stream-Ergebnisse und Wiederverwendung werden nicht mit veränderbaren Collections gleichgesetzt; der Streamvertrag begrenzt Wiederverwendung und verlangt geeignete, nicht störende Operationen. — [Stream API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html)
- Atomare Zähler sind ein anderer Vertrag als ein sichtbares, aber nicht atomar inkrementiertes `volatile int`. Die Aufgabe verlangt exakt 1000 nach vollständigem Abschluss beziehungsweise 99 plus sichtbaren Fehler bei einem Fehlschlag vor dem Inkrement. — [AtomicInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)
- Kalenderaddition und Stundenaddition unterscheiden sich bei Zeitzonenübergängen; das Assessment konkretisiert dies am Berliner Übergang vom 28. auf den 29. März 2026 mit 12 Uhr/23 Stunden gegenüber 13 Uhr/24 Stunden. — [ZonedDateTime](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/ZonedDateTime.html)
- Spring-Proxytransaktionen werden durch externe Aufrufe wirksam; Self-invocation allein erzeugt keine Interception. Der Fehler zwischen Aufgabe und Audit ist deshalb ausdrücklich durch einen fremden Bean/Proxy aufzurufen. — [Using @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)
- HTTP-204-Antworten haben keinen Body; `If-Match` mit veraltetem starkem ETag verhindert verlorene Änderungen und führt im beschriebenen Fall zu 412. — [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)
- HTML-native Validierung ersetzt keinen Backendvertrag; `maxlength`-Nachweise sollen Benutzeränderungen prüfen und nicht nur programmatisch gesetzte Feldwerte. — [HTML Forms](https://html.spec.whatwg.org/multipage/forms.html)
- CSS-Testbox: 200px content-box plus zweimal 20px Padding und zweimal 2px Border ergibt 244px Borderbox; bei 200px border-box verbleiben 156px Content. — [CSS Box Sizing Level 3](https://www.w3.org/TR/css-sizing-3/)
- Scrum definiert die Done-Grenze über die Definition of Done und gibt allein dem Product Owner die Möglichkeit, einen Sprint bei obsoletem Sprintziel abzubrechen. — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- Untrusted Texte können Agenten zu Datenabfluss oder unerwünschten Tools verleiten; Freigaben, begrenzte Datenflüsse und Evaluation reduzieren Risiken, beweisen aber keine vollständige Immunität. — [OpenAI Safety in building agents](https://platform.openai.com/docs/guides/agent-builder-safety)

### Inferences
- 1999 Cent mit 10 % Rabatt ergibt HALF_UP 1799; der echte Halbfall ist 5 Cent mit 10 % Rabatt oder 1 Cent mit 50 % Rabatt und wird gesondert abgeprüft.
- Ownership, syntaktische Validierung und Toolfreigabe bleiben getrennte Abnahmekriterien: eine formal gültige fremde ID muss weiterhin scheitern.

### Gaps
- Der offizielle Microsoft-Einstieg zur Normalisierung enthält vereinfachte beziehungsweise problematische Aussagen außerhalb des verwendeten Beispiels, insbesondere die Gleichsetzung von BCNF mit 4NF. Diese Aussage wurde nicht übernommen. Das Assessment definiert funktionale Abhängigkeiten selbst und leitet daraus konkret vier Tabellen ab. — [Abgerufener Microsoft-Einstieg](https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description)
- UML-Quelle ist die offizielle Versionsseite zur Spezifikation 2.5.1; kein erzeugtes Diagramm wurde mit einem UML-Werkzeug automatisch validiert. — [OMG UML 2.5.1](https://www.omg.org/spec/UML/2.5.1)

## Wie wird modernes MCP gegenüber Legacy unterschieden und was wurde validiert?

### Takeaway
Die MCP-Aufgabe benutzt ausdrücklich Revision 2026-07-28 mit Metadaten je Request und behandelt `initialize` nur als Legacy-Verhalten. Der Datenbestand wurde strukturell und gegen die vollständige zugewiesene Modulmenge geprüft; praktische Implementierungserfolge werden nicht behauptet.

### Cited Findings
- Modern bedeutet laut aktueller Versionsseite Revision 2026-07-28 und später mit Version, Identität und Fähigkeiten pro Request; Legacy bedeutet 2025-11-25 und früher mit Initialisierungshandshake. `server/discover` ist serverseitig obligatorisch, clientseitiger Vorabaufruf aber optional. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- Nicht unterstützte moderne Version ergibt `UnsupportedProtocolVersionError`, Code -32022, mit `data.supported` und `data.requested`. Ein erkannter moderner Fehler rechtfertigt keinen pauschalen Legacy-Downgrade. Legacy-Client → Modern-only-Server scheitert; ein Dual-era-Client kann Legacy transportabhängig erkennen und auf `initialize` zurückfallen. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- Modernes Streamable HTTP hat dokumentierte Header-/Body-Konsistenzanforderungen; widersprüchliche Werte werden durch Servervalidierung abgewiesen. Die Aufgabe verlangt Prüfung gegen die konkrete Bindung statt erfundener SDK-Signaturen. — [Streamable HTTP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)

### Inferences
- MCP-Kompatibilitätsmatrix, Ownershipgegenbeispiel und indirekte Injection gehören in dieselbe praktische Abnahme, weil ein erfolgreicher Protokollrequest allein weder Zugriffsrecht noch sicheren Umgang mit Rückgabetext beweist.
- Lokale JSON-Validierung: erfolgreiches `json.load`; genau 31 Datensätze und 31 eindeutige IDs; Mengenvergleich mit `module-assessment-input.json` ohne fehlende/zusätzliche ID; exakt verlangte Felder; je drei nichtleere input/expected-Paare; je vier Kriterien; nichtleere HTTPS-Quellen; überall `manual-review-required` und `assessment-v2`.

### Gaps
- Keine tatsächliche MCP-Verbindung, Anmeldung, Netzwerkfreigabe, Datenbankinstallation oder kostenpflichtige Modellausführung angelegt.
- Offizielle Dokumentations-URLs können künftig andere Patchstände anzeigen; die bei Recherche beobachteten Versionen und die gewählten Laborgrenzen sind deshalb hier explizit dokumentiert.
