# Praktische Assessments: PHP, Laravel, Git und ABAP

## Welche Module und Abgaben wurden vollständig redigiert?

### Takeaway
`content/assessments-backend.json` enthält 44 eigenständige deutschsprachige Assessments: sämtliche numerischen IDs m42–m65 sowie sämtliche 20 abap-IDs aus `content/module-assessment-input.json`. Die tatsächlichen Modul- und Lektionstitel wurden vor dem Entwurf gelesen; nicht die Reihenfolge der Datei, sondern die Identitäten bestimmen die Auswahl.

### Cited Findings
- PHP-Typdeklarationen prüfen keine beliebigen Inhalte eines Array-Parameters; `strict_types` betrifft skalare Aufrufe aus der aufrufenden Datei. Deshalb verlangt m42 zusätzliche Positionsvalidierung. — [PHP-Typdeklarationen](https://www.php.net/manual/en/language.types.declarations.php)
- Generatoren ermöglichen schrittweise Datenbereitstellung; m55 fordert deshalb `yield` statt vollständigem CSV-Einlesen. — [PHP-Generatoren](https://www.php.net/manual/en/language.generators.php)
- Eloquent-Beziehungen und Eager Loading sind die technische Basis für das konkret festgelegte Query-Budget in m46; das Budget selbst ist eine Aufgabenanforderung. — [Offizielle Laravel-12-Quelldokumentation](https://raw.githubusercontent.com/laravel/docs/12.x/eloquent-relationships.md)
- Git unterscheidet Staging, Zusammenführen, Übertragen, Fehlerlokalisierung und Objektinspektion; die fünf Git-Abgaben verwenden diese getrennten Arbeitsvorgänge statt austauschbarer Allgemeinfragen. — [git add](https://raw.githubusercontent.com/git/git/master/Documentation/git-add.adoc), [git merge](https://raw.githubusercontent.com/git/git/master/Documentation/git-merge.adoc), [git push](https://raw.githubusercontent.com/git/git/master/Documentation/git-push.adoc), [git bisect](https://raw.githubusercontent.com/git/git/master/Documentation/git-bisect.adoc), [git cat-file](https://raw.githubusercontent.com/git/git/master/Documentation/git-cat-file.adoc)

### Inferences
- Die konkrete Themenabdeckung lautet: m42 strikt typisierter Lagerwert; m43 PDO-Wunschliste; m44 OO-Versandtarife; m45 Routing/Blade; m46 Beziehungen/N+1; m47 Form Request/Auth/Policy; m48 Sanctum/Idempotenz; m49 Container/Action/Event; m50 Queue/Cache/Scheduler; m51 Test-/Release-Gate; m52 CLI-Kassenbon; m53 Arrays/Strings/Datum; m54 JSON-/Dateiimport; m55 Streaming/DI; m56 Blade/Livewire; m57 Upload/Mail/Notification; m58 Scopes/Casts/Pruning; m59 Webhook/Suche/Broadcast; m60 Mini-Shop/Betrieb; m61–m65 Git-Grundlagen, Branches, Teamprozess, Rettung und Interna.
- ABAP-Abgaben behandeln in Modulreihenfolge: Nachbestellalgorithmus, DDIC-Einkaufsmodell, Lieferanten-SQL, Anforderungsabnahme, UML-Retourenmodell, Testmatrix, Wert-/Referenzsemantik, interne Tabellen/Sperren, SQL/AMDP, OO-Strategien, CDS-Summen, RAP-Reiseantrag, Fiori-Freigabeliste, Clean-Core-Entscheidung, SQL-/Berechtigungsschutz, Transport-Gates, SAP-LUW, Debugging, Lieferstatusintegration und Werkzeug-/Eingriffsgrenzen.
- Validierung per Python: ausgewählte Inputmenge und Outputmenge identisch; jeweils 44 eindeutige IDs; exakt 24 PHP/Git und 20 ABAP; alle geforderten Schlüssel vorhanden; 132 konkrete Fallobjekte; 176 Rubrikkriterien; alle Einträge `execution: manual-review-required`, `revision: assessment-v2`. Diese Prüfung validiert Struktur und Abdeckung, nicht Programmausführung.

### Gaps
- Die Inputdatei enthält Lektionstitel und leere `exercises`, keine vollständigen Lehrtexte. Die Aufgaben sind daher titelbezogene Originalredaktion, keine Behauptung einer lückenlosen Prüfung jedes Lehrsatzes.
- Es wurden keine App-Dateien geändert und keine PHP-, Laravel-, Git-Übungsszenarien oder SAP-Artefakte ausgeführt. Nur JSON-Struktur und Identitätsvollständigkeit wurden lokal validiert.

## Welche Sicherheitsgrenzen sind exakt und was ist ausdrücklich Aufgabenkonfiguration?

### Takeaway
Alle Zahlen für Authentifizierung, Rate Limits, Zeitfenster, Uploads und Queue-Verhalten sind ausdrücklich gesetzte Aufgabenverträge und keine behaupteten Framework-Defaults. Besonders Authentifizierung, Autorisierung und CSRF sowie Job-Wiederholung und fachliche Idempotenz bleiben getrennte Prüfpunkte.

### Cited Findings
- Laravel empfiehlt nach erfolgreichem Login Session-Regeneration sowie beim Logout Session-Invalidierung und CSRF-Token-Erneuerung; Guards sind keine Rollen-/Rechtemodelle. — [Authentication](https://laravel.com/docs/12.x/authentication)
- Sessionbasierte schreibende Webrequests benötigen CSRF-Schutz. Standard-Laravel-Tests deaktivieren diesen Schutz normalerweise; ein CSRF-Nachweis muss deshalb mit wirksamer Middleware erfolgen. Webhook-Ausnahmen sind eng zu begrenzen und benötigen eigene Authentizitätsprüfung. — [CSRF Protection](https://laravel.com/docs/12.x/csrf)
- Sanctum unterstützt sowohl Personal-Access-Tokens als auch cookie-basierte SPA-Authentifizierung. Das Bearer-Token-Szenario m48 wird deshalb nicht pauschal wie ein SPA-Session-Request behandelt. — [Sanctum](https://raw.githubusercontent.com/laravel/docs/12.x/sanctum.md)
- Queue-Timeout muss unter der erneuten Verfügbarkeitsfrist liegen; freigegebene/rate-limitierte Jobs können weitere Versuche verbrauchen, und Unique-Job-Locks sind nicht gleichbedeutend mit garantierter Einmalausführung eines externen Effekts. — [Queues](https://laravel.com/docs/12.x/queues)
- Uploadvalidierung und privater Dateizugriff sind getrennte Aufgaben; Laravel-Dateigrößenregeln und Storage-Abstraktion bilden die Basis für m57. — [Validation](https://raw.githubusercontent.com/laravel/docs/12.x/validation.md), [Filesystem](https://raw.githubusercontent.com/laravel/docs/12.x/filesystem.md)
- HTTP-Client und private Broadcast-Kanäle erfordern explizite Fehler-/Zugriffsbehandlung; daraus folgen getrennte Adapter-, Webhook- und Tenantprüfungen in m59. — [HTTP Client](https://raw.githubusercontent.com/laravel/docs/12.x/http-client.md), [Broadcasting](https://raw.githubusercontent.com/laravel/docs/12.x/broadcasting.md)

### Inferences
- Festgelegte Grenzen: m43 Titel 1–80 Unicode-Zeichen und CSRF-Token aus 32 Zufallsbytes; m47 fünf fehlgeschlagene Logins je normalisierter E-Mail/IP in 60 Sekunden, sechster Versuch 429; m48 Menge 1–5, zehn Requests/User/60 Sekunden, elfter 429, Key höchstens 64 ASCII-Zeichen und 24 Stunden Aufbewahrung.
- m50 genau drei Gesamtversuche, Backoff 10/30 Sekunden, Job-Timeout 20 Sekunden, Redis `retry_after=60`, HTTP-Timeout 5 Sekunden; Cache exakt ab Sekunde 60 erneuern und Scheduler 02:00 UTC. Ein DB-Constraint auf export_id schützt fachliche Idempotenz zusätzlich zu Queue-Mechanismen.
- m57 maximal 2048 KiB = 2.097.152 Bytes; PHP-/Webserver-Limits müssen die Grenzprobe zulassen. m59 maximal 300 Sekunden inklusive HMAC-Zeitabweichung, 24 Stunden Deduplizierung bei ausdrücklich auf dieses Fenster begrenztem Wiederholungsvertrag, ausgehender idempotenter GET mit zwei Gesamtversuchen/3 Sekunden Timeout. m60 Alarm ab fünf Fehlern in fünf Minuten.
- Alle Fallantworten sind Soll-Ergebnisse und verlangen manuelles Review; sie sind keine Testprotokolle oder Erfolgsbehauptungen.

### Gaps
- Laravel 12 ist absichtlich als überprüfbarer Aufgabenstand festgelegt; die erfolgreich abgerufenen Laravel-Seiten weisen selbst auf eine neuere Hauptversion hin. Die Aufgaben behaupten nicht, Version 12 sei die neueste.
- Zahlreiche direkte zusätzliche Laravel-/Git-HTML-Abrufe per Python erhielten 403. Statt diese als Belege auszugeben, wurden die entsprechenden offiziellen Repository-Rohdateien erfolgreich abgerufen und in `sources` eingetragen. PHP-Pfade `datetimeimmutable.php` und `language.oop5.readonly.php` lieferten 404 und wurden durch erfolgreich geladene `class.datetimeimmutable.php` und `language.oop5.properties.php` ersetzt; die fehlgeschlagenen URLs stehen nicht in `sources`.

## Welche SAP-Voraussetzungen und Erkenntnisgrenzen sind zu beachten?

### Takeaway
Jede ABAP-Aufgabe nennt eine SAP-Ziellaufzeit und unterscheidet Werkzeuge von Systemzugang. Klassische Verbuchung, RAP-Transaktionen, freigegebene Cloud-APIs und native HANA-Verarbeitung werden nicht vermischt; sämtliche Artefakte bleiben Entwürfe ohne SAP-Ausführungsbehauptung.

### Cited Findings
- SAPs offizielles Cheat-Sheet-Repository trennt Cloud- und klassische Sprachversionen sowie Releasebranches und warnt vor unterschiedlicher Featureverfügbarkeit. ADT ist Entwicklungswerkzeug; Beispiele benötigen eine passende SAP-Laufzeit und Zugang. — [SAP README](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/README.md)
- RAP unterscheidet managed/unmanaged, transaktionalen Buffer, Handler-/Saver-Methoden und Responseparameter `mapped`, `failed`, `reported`. Ein erfolgreicher MODIFY-Aufruf allein ist kein Persistenznachweis. — [SAP EML für RAP](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/08_EML_ABAP_for_RAP.md)
- SAP-LUW, klassische Update-Task-Verarbeitung und RAP-Save-Phasen haben unterschiedliche Verträge. Sperren und Berechtigungen bleiben gesonderte Konzepte; ABAP-SQL-Tabellenzugriff ist kein automatischer fachlicher Autorisierungsnachweis. — [SAP LUW](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/17_SAP_LUW.md), [Authorization Checks](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/25_Authorization_Checks.md)
- Tabellenschlüssel und Tabellentypen bestimmen Zugriffsmöglichkeiten, ersetzen aber keine SAP-Sperrstrategie. — [Internal Tables](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/01_Internal_Tables.md), [SAP LUW](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/17_SAP_LUW.md)
- ABAP SQL und AMDP sind getrennte Verarbeitungskontexte; das AMDP-Szenario verlangt explizite Mandantenbetrachtung und realen Plan-/Tracevergleich vor Leistungsbehauptungen. — [ABAP SQL](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/03_ABAP_SQL.md), [AMDP](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/12_AMDP.md)
- ABAP Cloud erlaubt nicht pauschal alle technisch sichtbaren Standardobjekte; Sprachversion und Releaseverträge sind Teil der API-Prüfung. — [ABAP for Cloud Development](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/19_ABAP_for_Cloud_Development.md)
- Weitere erfolgreich vollständig über HTTP geladene offizielle Fachquellen: [DDIC](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/26_ABAP_Dictionary.md), [ABAP Unit](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/14_ABAP_Unit_Tests.md), [Objects](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/04_ABAP_Object_Orientation.md), [CDS View Entities](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/15_CDS_View_Entities.md), [Exceptions](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/27_Exceptions.md), [BAdIs](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/35_BAdIs.md).

### Inferences
- Für klassische Aufgaben ist SAP S/4HANA 2023 Sandbox mit ABAP 7.58 die explizite Zielannahme. Cloud-/RAP-/Fiori-Aufgaben nennen SAP BTP ABAP Environment und erforderliche Featureprüfung; Integration Suite und CTS/gCTS werden nur bei tatsächlicher Bereitstellung vorausgesetzt.
- Abap-m4/m5 sind fachliche Originalmodelle: 5000-EUR-Freigabegrenze und Retouren-Kardinalitäten stammen aus dem Aufgabenvertrag, nicht aus einer behaupteten SAP-Standardkonfiguration. Ebenso sind ATC-Prioritätsgate, Z-Berechtigungsobjekt, Frachtpreise und Integrations-Retrylimits bewusst gewählte Prüfanforderungen.
- Quellenabrufe ergeben insgesamt 46 verschiedene erfolgreich abgerufene, im JSON zitierte URLs. Diese Quellensammlung erklärt die technischen Prüfentscheidungen; sie behauptet keine offizielle Zertifizierung der eigenständig geschriebenen Aufgaben.

### Gaps
- Kein SAP-Zugang, keine ADT-Aktivierung, kein ATC-/SAT-/ST05-Lauf, kein Transport und keine OData-/EML-Ausführung wurden vorgenommen. Im konkreten Zielsystem müssen Verfügbarkeit, API-Releasevertrag, Sprachversion und Berechtigungen geprüft werden.
- Der SAP-Help-ADT-Link lieferte nur die Portalseitenhülle, keinen nutzbaren Fachtext. Er ist tatsächlich abgerufen, die fachliche Grundlage für Werkzeug-/Laufzeitabgrenzung ist stattdessen das lesbare offizielle SAP-Repository.
- Die allgemeinen Modellierungs-/Lifecycle-Aufgaben verwenden den SAP-Repository-Überblick als Systemkontext, nicht als spezifische UML- oder Scrum-Normreferenz. Die Szenarien und Sollmodelle sind eigene Aufgabenfestlegungen; eine gesonderte Normkonformitätsprüfung ist nicht behauptet.
