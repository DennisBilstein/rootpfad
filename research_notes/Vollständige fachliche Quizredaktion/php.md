# PHP und Laravel: vollständige Quizredaktion

## Sprachverhalten und Versionsbasis

### Takeaway
Alle 216 Eingabeeinträge wurden als eigenständige deutschsprachige Anwendungsszenarien neu geschrieben. Zielbasis bleibt PHP 8.5 und Laravel 13; die Revision lautet wie beauftragt `2026-11-07-full-v3`. Quellen wurden am 07./08.11.2026 abgerufen; der technische Abschluss erfolgte nach den Sitzungsunterbrechungen am 08.11.2026.

### Cited Findings
- PHP 8.5 enthält den Pipe-Operator: Ein Wert wird an den folgenden Callable übergeben; dies ist keine erst zukünftige Sprachfunktion. — [PHP-8.5-Veröffentlichung](https://www.php.net/releases/8.5/en.php)
- `readonly` ist keine tiefe Unveränderlichkeit: Ein enthaltenes veränderliches Objekt darf intern verändert werden. Die Property selbst darf nicht gewöhnlich neu zugewiesen werden; dokumentierte Klonregeln sind separat zu betrachten. — [Properties](https://www.php.net/manual/en/language.oop5.properties.php)
- Binäre Floats stellen zahlreiche Dezimalbrüche nicht exakt dar. Für die konkrete Addition ganzer Cent werden Integer im geprüften Zahlenbereich verwendet; die Rundung je Position oder je Gesamtsumme ist eine zusätzliche Fachregel. — [Floats](https://www.php.net/manual/en/language.types.float.php), [round](https://www.php.net/manual/en/function.round.php)
- `match` vergleicht strikt und wirft ohne passenden Zweig und ohne `default` einen `UnhandledMatchError`. — [match](https://www.php.net/manual/en/control-structures.match.php)
- `array_find` gibt den ersten passenden Wert in Iterationsreihenfolge zurück, nicht dessen Schlüssel oder eine Trefferliste. — [array_find](https://www.php.net/manual/en/function.array-find.php)
- Der Sessionmechanismus speichert explizit registrierte Daten zwischen Requests; gewöhnliche Requestvariablen bilden keinen dauerhaften Benutzerzustand. — [Session Handling](https://www.php.net/manual/en/book.session.php)
- `Throwable` ist das gemeinsame Interface von `Error` und `Exception`, keine gemeinsame konkrete Oberklasse. — [Throwable](https://www.php.net/manual/en/class.throwable.php)

### Inferences
- Die Fragen verwenden konkrete Ein- und Ausgaben, Fehlerzustände oder Entscheidungen; mehrdeutige Definitionen und unbelegte Superlative wurden ersetzt.
- Die Abweichung von Positions- und Gesamtrundung wird ausdrücklich nicht als durch Integer allein gelöst dargestellt.

### Gaps
- Kein Anspruch auf lokale Ausführung sämtlicher PHP-/Frameworkbeispiele. Die Redaktion prüft Quizverträge und dokumentiertes Verhalten, nicht das bestehende Unterrichts-Body als Autorität.

## Sicherheitsgrenzen, Lebenszyklen und externe Effekte

### Takeaway
Validierung, Mass Assignment, Authentifizierung, Autorisierung und CSRF sind getrennte Schutzaufgaben. Langlebige Prozesse und wiederholte externe Operationen benötigen eigene Lebensdauer- und Idempotenzverträge.

### Cited Findings
- Form Requests validieren vor dem Controlleraufruf; ihre `authorize`-Methode kann zusätzlich die konkrete Aktion berechtigen. JSON erwartende Validierungsfehler führen standardmäßig zu 422. — [Validation](https://laravel.com/docs/13.x/validation)
- Fillable/Guarded begrenzen Mass Assignment und erlaubte Attribute; sie erteilen keine Berechtigung zum Bearbeiten fremder Objekte. — [Eloquent](https://laravel.com/docs/13.x/eloquent), [Authorization](https://laravel.com/docs/13.x/authorization)
- Laravel 13 verwendet `PreventRequestForgery`: Auf sicheren Same-Origin-Anfragen kann Originprüfung via `Sec-Fetch-Site` die Tokenprüfung ersetzen. Andernfalls besteht standardmäßig Token-Fallback. `originOnly: true` deaktiviert den Fallback und verweigert gescheiterte Originprüfung mit 403 statt der üblichen 419 bei Tokenfehlern. `allowSameSite` ist eine eigene Konfiguration. — [CSRF Protection](https://laravel.com/docs/13.x/csrf)
- Sessionbasierte First-Party-SPAs verwenden in Sanctum Cookies und CSRF-Schutz, nicht notwendigerweise persönliche API-Tokens. `tokenCan` liefert bei diesen First-Party-Sessionanfragen aus Komfortgründen true; Policies müssen den Benutzer trotzdem für das konkrete Objekt berechtigen. — [Sanctum](https://laravel.com/docs/13.x/sanctum)
- `singleton` teilt eine Instanz im Container; `scoped` begrenzt die gemeinsame Instanz auf den Request-/Job-Lebenszyklus. Das ist für Octane und Queue-Worker bedeutsam. Provider registrieren regulär zuerst Bindungen und werden danach gebootet; verzögerte Provider sind gesondert zu betrachten. — [Container](https://laravel.com/docs/13.x/container), [Providers](https://laravel.com/docs/13.x/providers), [Octane](https://laravel.com/docs/13.x/octane)
- Queue-Worker sind langlebig und müssen beim Deployment kontrolliert neuen Code laden. Standard-Modelserialisierung speichert die Identität und lädt das Model später erneut; dies garantiert keinen historischen Attributsnapshot. — [Queues](https://laravel.com/docs/13.x/queues)
- Unique Jobs begrenzen Dispatch-Duplikate, verhindern aber nicht jeden wiederholten externen Seiteneffekt nach einem Absturz desselben Jobs. Ein vom Anbieter unterstützter stabiler Idempotenzschlüssel adressiert das beschriebene externe Rechnungsduplikat; Aufbewahrung und Parametervertrag bleiben relevant. — [Unique Jobs](https://laravel.com/docs/13.x/queues#unique-jobs), [Anbieter-Idempotenzvertrag](https://docs.stripe.com/api/idempotent_requests)
- Webhooksignaturen müssen über den vereinbarten rohen Body geprüft werden. Signierte Zeitstempel mit Toleranz begrenzen Replay; Ereignis-IDs und atomare lokale Verarbeitung dienen der Deduplizierung. — [Signaturen](https://docs.stripe.com/webhooks/signature), [Webhook-Sicherheit und Duplikate](https://docs.stripe.com/webhooks)
- Laravel HTTP-Client wirft standardmäßig nicht allein wegen 4xx-/5xx-Antworten; Netzwerkfehler sind separat zu behandeln. — [HTTP Client](https://laravel.com/docs/13.x/http-client)
- Livewire 4 dokumentiert `.live` als zusätzliche Serverupdates während der Eingabe mit Standard-Debounce. Öffentliche Properties und Aktionsparameter benötigen serverseitige Sicherheitsprüfungen. — [wire:model](https://livewire.laravel.com/docs/4.x/wire-model), [Security](https://livewire.laravel.com/docs/4.x/security)

### Inferences
- Die Rechnungsfrage behauptet bewusst keine Exactly-once-Garantie durch Queue-Unique-Locks oder einen noch leeren lokalen Dateipfad.
- Webhook-Ausnahmen vom Session-CSRF-Schutz werden nicht mit einer Freigabe unauthentifizierter Verarbeitung gleichgesetzt.
- Signed URLs werden nicht als automatische Einmal-Links oder vollständiger Ersatz für Eigentumsprüfungen beschrieben.

### Gaps
- Das konkrete Verhalten eines fremden Rechnungsanbieters ist ohne dessen Vertrag nicht universell festgelegt. Das Szenario verlangt deshalb ausdrücklich anbieterunterstützte Idempotenz.
- Antwortzeiten, Datenbank-Lockverhalten, Suchenginefähigkeiten und Auslieferungsinfrastruktur hängen vom jeweiligen System ab; Fragen vermeiden universelle Leistungsgarantien.

## Vollständigkeit, Quellenprüfung und Abnahme

### Takeaway
`content/quiz-batches/php-revised.json` enthält ein Array mit 216 vollständig redigierten Einträgen in unveränderter Eingabereihenfolge. Es wurden keine Anwendungskomponenten geändert.

### Cited Findings
- Die einzelnen Einträge enthalten ihre jeweiligen Primärquellen direkt als URL-Liste. Verwendet werden insbesondere [PHP-Handbuch](https://www.php.net/manual/en/), [Laravel-13-Dokumentation](https://laravel.com/docs/13.x), [HTTP-Semantik RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [Composer-Dokumentation](https://getcomposer.org/doc/), [PHP-FIG](https://www.php-fig.org/), [W3C-Formularzugänglichkeit](https://www.w3.org/WAI/tutorials/forms/notifications/) und die genannten offiziellen Werkzeug-/Anbieterdokumentationen.
- Der volle Inhalt der kritischen Primärdokumentationen zu Laravel-13-CSRF, Sanctum, Container, Queues, Eloquent, Validierung, PHP-8.5-Funktionen, readonly und Floats wurde abgerufen. Zusätzlich wurden alle 131 unterschiedlichen Quellenlinks per HTTP geprüft. Ein veralteter Session-Einführungslink lieferte 404 und wurde durch das erfolgreich abgerufene [Session-Handbuch](https://www.php.net/manual/en/book.session.php) ersetzt.

### Inferences
- Validiert: 216/216 Einträge; stabile `lesson`- und `index`-/gegebenenfalls `extraId`-Identitäten; drei verschiedene Optionen; drei positionsgleiche Einzelbegründungen; genau ein gültiger `correct`-Index; Quellenlisten; einheitliche Revision und Niveaukennzeichnung.
- Alle 216 Fragetexte unterscheiden sich vom jeweiligen Eingabetext. Die korrekten Antworten verteilen sich mit jeweils 72 auf die drei Positionen.
- Die temporären Autorendateien dienten ausschließlich zur Serialisierung einzeln geschriebener Fragen und wurden nach der Abnahme entfernt; kein globales Präfixieren bestehender Fragen.

### Gaps
- Erreichbarkeit eines Quellenlinks ist nicht allein ein inhaltlicher Beleg. Für didaktische Architekturentscheidungen wie Verantwortungsaufteilung oder Meilensteinformulierung sind die verlinkten Mechanismen Grundlage und die konkrete Anwendung eine ausdrücklich redaktionelle Ableitung.
