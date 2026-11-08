# Vollständige fachliche Quizredaktion: Web-Ökosystem

Stand: 07.11.2026. Ergebnis: `content/quiz-batches/web-revised.json` enthält 153 individuell neu formulierte Aufgaben. Eingabe war `web-input.json`; der im Auftrag angehängte Text „153“ bezeichnet die Anzahl, nicht einen vorhandenen Dateinamen `web-input.json153`.

## Welche fachlichen Grenzen wurden anhand aktueller Primärquellen geprüft?

### Takeaway
Die Redaktion trennt statische Typen, Browserfunktionen, Protokollverträge und wirksame serverseitige Sicherheitsgrenzen. MCP wird ausdrücklich mit der modernen Revision 2026-07-28 behandelt; historische Verbindungsinitialisierung wird nicht als universelle heutige Voraussetzung dargestellt.

### Cited Findings
- `let` erlaubt Neuzuweisung; `const` schützt die Bindung, nicht automatisch verschachtelte Objekte. Closures behalten ihren lexikalischen Bereich; eine Arrow Function mit Block braucht ein explizites `return` für einen Ergebniswert. — [Deklarationen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types); [Funktionen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- Promise-Kombination und Cancellation sind verschiedene Verträge. `fetch` lehnt sein Promise nicht allein wegen HTTP 404 ab; HTTP-Erfolg muss gesondert ausgewertet werden. — [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises); [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- CORS regelt browserseitigen Cross-Origin-Zugriff und ist keine Ersatzautorisierung. Type Assertions werden beim Kompilieren entfernt und validieren keine externen Laufzeitdaten. — [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS); [TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- Vue 3.5+ transformiert passende Zugriffe auf aus `defineProps` destrukturierte Variablen im selben `script setup`. Dies ist keine allgemeine Live-Bindung durch JavaScript-Destructuring und macht die Variable nicht generell zu einer ref. — [Props](https://vuejs.org/guide/components/props.html); [script setup](https://vuejs.org/api/sfc-script-setup.html)
- `computed` ist für reine abgeleitete Werte vorgesehen. `onWatcherCleanup` muss synchron während der Watcher-Ausführung registriert werden, nicht erst nach `await`. — [Computed](https://vuejs.org/guide/essentials/computed.html); [Watchers](https://vuejs.org/guide/essentials/watchers.html)
- `storeToRefs` erhält den Bezug auf reaktiven Pinia-State und Getter; Actions können direkt destrukturiert werden. Router-Guards steuern Navigation, nicht die Autorisierung direkter Backendzugriffe. — [Pinia](https://pinia.vuejs.org/core-concepts/); [Router-Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- `VITE_`-Variablen können im Clientbundle landen. `npm ci` korrigiert widersprüchliche Manifest- und Lockfileangaben nicht stillschweigend. — [Vite](https://vite.dev/guide/env-and-mode); [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- Labels referenzieren mittels `for` eine passende eindeutige Feld-id. Native Formularvalidierung ersetzt keine Serverprüfung. Tabellen benötigen nachvollziehbare Kopfzellenbezüge und eine passende Beschriftung. — [Label](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label); [Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input); [Table](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)
- Die CSS-Quellreihenfolge ist ein später Gleichstandsentscheid, nicht der einzige Kaskadenfaktor. `border-box` umfasst Padding und Border, aber nicht Margin. — [Kaskade](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade); [Boxmodell](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- Flexbox-Hauptachse, Grid-Mindestgrößen, Viewportanpassung, sichtbarer Fokus und reduzierte Bewegung haben jeweils eigene überprüfbare Regeln. — [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox); [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout); [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design); [Fokus](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible); [Bewegungspräferenz](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- MariaDB-Constraints sichern Datenintegrität; passende Pflichtfelder benötigen auch `NOT NULL`. Viele DDL-Anweisungen bewirken implizite Commits. InnoDB-`FOR UPDATE` braucht eine wirksame Transaktionsgrenze. — [Constraints](https://mariadb.com/docs/server/reference/sql-statements/data-definition/constraint); [Transaktionen](https://mariadb.com/docs/server/reference/sql-statements/transactions/start-transaction); [FOR UPDATE](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/for-update)
- `EXPLAIN` beschreibt den geschätzten Plan, während `ANALYZE` ausführt und tatsächliche Statistiken liefert. Replikation allein schützt nicht vor replizierten Fehländerungen und ist kein vollständiges Backup. — [EXPLAIN](https://mariadb.com/docs/server/reference/sql-statements/administrative-sql-statements/analyze-and-explain-statements/explain); [Replikation und Backup](https://mariadb.com/docs/server/server-usage/backup-and-restore/replication-as-a-backup-solution)
- `DECIMAL` ist ein exakter Festkommatyp. Parameterbindung unterscheidet Datenwerte von SQL-Syntax; dynamische Bezeichner bleiben gesondert zu behandeln. — [DECIMAL](https://mariadb.com/docs/server/reference/data-types/numeric-data-types/decimal); [Connector](https://mariadb.com/docs/connectors/mariadb-connector-nodejs/connector-nodejs-promise-api)
- HTTP-Idempotenz bezieht sich auf die beabsichtigte wiederholte Wirkung, nicht auf identische Antwortbytes. Ein ETag verhindert ohne ausgewertetes `If-Match` keinen Lost Update. — [HTTP-Methoden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods); [If-Match](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Match)
- GraphQL beseitigt N+1 nicht automatisch und braucht Demand-Control. OData-Projektion ersetzt keine Feldrechte. gRPC braucht einen bewusst definierten Zeit- und Streamingvertrag; SOAP 1.2 verwendet ein XML-Nachrichtenframework. — [GraphQL Performance](https://graphql.org/learn/performance/); [GraphQL Security](https://graphql.org/learn/security/); [OData](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html); [gRPC](https://grpc.io/docs/what-is-grpc/core-concepts/); [SOAP](https://www.w3.org/TR/soap12-part1/)
- SSE ist regulär ein Server-zu-Client-Kanal; Replay und Resync brauchen einen expliziten Vertrag. Wiederholte Webhooks verlangen deduplizierte beziehungsweise idempotente Fachverarbeitung. — [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events); [Webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- OpenAPI unterscheidet die Spezifikationskennung `openapi` von `info.version`; generierte Clients beweisen keine dynamische Objektberechtigung. Beim Abruf lieferte die aktuelle Spezifikation v3.2.1 aus. Das Quizbeispiel mit `openapi: 3.2.0` ist bewusst nur ein konkretes gültiges Versionsbeispiel, keine Behauptung der neuesten Revision. — [OpenAPI](https://spec.openapis.org/oas/latest.html)
- MCP 2026-07-28 trägt Version und Capabilities pro Request. `server/discover` muss serverseitig implementiert werden, ist aber kein obligatorischer vorgeschalteter Clientaufruf. Legacy-Initialisierung betrifft ausdrücklich ältere Revisionen beziehungsweise die Dual-era-Kompatibilität. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle); [Transporte](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports)
- Moderne MCP-Server initiieren keine JSON-RPC-Requests. Unter stdio gehören nur gültige MCP-Nachrichten nach stdout; Diagnoseausgaben können nach stderr. — [stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)
- Toolbeschreibungen, gültige Parameter und Annotationen ersetzen keine Objektberechtigung oder wirksamen Laufzeitgrenzen. Token-Passthrough ist ein explizit behandeltes Sicherheitsrisiko. — [Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools); [Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization); [Security Best Practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices)
- Der MCP-Host koordiniert Clientinstanzen, Modellintegration und Sicherheitsgrenzen. Git-Worktrees trennen Checkouts, nicht die Prozessrechte des Betriebssystems. Prompt Injection in fremden Inhalten erteilt keine legitime Toolfreigabe. — [MCP-Architektur](https://modelcontextprotocol.io/specification/2026-07-28/architecture); [Git-Worktree](https://git-scm.com/docs/git-worktree); [Agent Safety](https://platform.openai.com/docs/guides/agent-builder-safety); [Claude Code Security](https://docs.anthropic.com/en/docs/claude-code/security)

### Inferences
- Die selbst formulierten Aufgaben prüfen Konsequenzen an konkreten Daten-, Zustands- oder Aktionsgrenzen statt das Wiedererkennen allgemeiner Qualitätsfloskeln. Das ist eine redaktionelle Ableitung aus den genannten Verträgen, kein wörtliches Quellenzitat.
- Requestgenerationen werden als zusätzlicher Commit-Schutz bei asynchronen UI-Rennen verwendet; Abbruch und tatsächliche Aktualität werden bewusst getrennt.

### Gaps
- Die ausgelieferte offizielle Pinia-Dokumentation zeigt beim Abruf weiterhin „v3.x“. Eine v4-spezifische Neuerung wurde deshalb nicht behauptet; die Fragen behandeln die belegten stabilen APIs `defineStore`, Actions und `storeToRefs`. — [Pinia](https://pinia.vuejs.org/core-concepts/)
- Mehrere zunächst vermutete MariaDB-URLs lieferten 404. Sie wurden nicht als Quellen aufgenommen; stattdessen wurden funktionierende offizielle Pfade zu Transaktionen, Berechtigungen und Backup tatsächlich abgerufen.

## Wie wurden die 153 Aufgaben vollständig umgeschrieben?

### Takeaway
Jede Eingabeidentität erhielt eine eigene neue deutsche Frage, vier Antwortmöglichkeiten mit genau einer Lösung und vier positionsgleiche Einzelbegründungen. Die bisherigen generischen „Falle“- und „Abnahme“-Stämme wurden ausnahmslos durch fachliche Anwendungssituationen ersetzt.

### Cited Findings
- Für Komponentenereignisse wurden direkte Interaktion und Prüfung von Ereignisname beziehungsweise Nutzlast als konkreter Testvertrag verwendet. — [Vue Events](https://vuejs.org/guide/components/events.html); [Vue Test Utils](https://test-utils.vuejs.org/guide/essentials/event-handling.html)
- Für Browsertests wurden sichtbares Verhalten, webbasierte Assertions und Verzicht auf starre Wartezeiten zugrunde gelegt. — [Playwright](https://playwright.dev/docs/best-practices)
- Für Agentarbeit wurden begrenzter Scope, belegbare Ausführung, explizite Testblocker und kontrollierte Integration als Anwendungsszenarien verwendet. Diese Aufgaben sind eigene redaktionelle Operationalisierungen der offiziellen Workflow- und Sicherheitsdokumentation. — [Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows); [Agent Safety](https://platform.openai.com/docs/guides/agent-builder-safety)

### Inferences
- Verteilung der Aufgaben: JavaScript/Vue/TypeScript/Werkzeuge 48; HTML 15; CSS 21; MariaDB 18; APIs 18; MCP 12; Agents 21.
- Die korrekten Positionen wurden zusammen mit ihren Einzelbegründungen rotiert: Position 0: 38, Position 1: 39, Position 2: 38, Position 3: 38. Dadurch entsteht kein allgemeines „erste Antwort richtig“-Muster.
- Jede Aufgabe trägt `revision: 2026-11-07-full-v3` und `level: Anwendung/Analyse`. Es wurden keine Unterrichtstexte oder Appdateien verändert.

### Gaps
- Es wurde keine Behauptung über ausgeführte Browser-, Vue-, SQL- oder Agentintegrationstests erzeugt. Der vorliegende Auftrag war Inhaltsredaktion und Strukturprüfung; Beispiele sind didaktische Szenarien, keine Messprotokolle eines laufenden Anwendungssystems.

## Welche Nachweise liegen für Vollständigkeit und Quellen vor?

### Takeaway
Die strukturelle Validierung ergab 153 von 153 Identitäten in unveränderter Eingabereihenfolge. Alle verwendeten Quellen wurden tatsächlich per HTTP abgerufen; 69 verschiedene offizielle Dokumentations-URLs werden den Aufgaben zugeordnet.

### Cited Findings
- Für das besonders revisionskritische MCP-Thema wurden nicht nur Suchtreffer, sondern die vollständigen offiziellen HTML-Antworten von Architektur, Lifecycle, Transport, stdio, Tools, Authorization und Security Best Practices gelesen. — [Lifecycle](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle); [stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)
- Vue-Compilersemantik wurde im aktuellen Propskapitel ausdrücklich gegen die allgemeine JavaScript-Destrukturierung abgegrenzt. — [Reactive Props Destructure](https://vuejs.org/guide/components/props.html#reactive-props-destructure)

### Inferences
- Die abschließenden lokalen Assertions prüften Anzahl, eindeutige und positionsgleiche Kombination aus `lesson` und `index` beziehungsweise `extraId`, vier unterschiedliche Antwortmöglichkeiten, vier unterschiedliche Begründungen, gültige Lösungsposition, neue Frage gegenüber der Eingabe, Versionsmarker, Niveau und HTTPS-Quellen.
- Ein zusätzlicher Abruf prüfte zunächst alle 63 damals verwendeten URLs erfolgreich mit HTTP 200. Sechs präzisere Quellen wurden danach ergänzend ebenfalls erfolgreich mit HTTP 200 abgerufen: JSON, WebSocket, DECIMAL, Vue Events, Vue Test Utils und MCP stdio. Keine fehlgeschlagene URL steht im finalen Quellenbestand.
- Die JSON-Ausgabe ist ein Array ausschließlich der angeforderten redaktionellen Felder; die umfangreichen alten Lesson-Bodys werden nicht dupliziert.

### Gaps
- Ein HTTP-200-Nachweis allein beweist nicht jede fachliche Aussage. Deshalb wurden bei den maßgeblichen Verträgen zusätzlich die Dokumentinhalte gelesen und die betreffenden konkreten Regeln oben festgehalten.
