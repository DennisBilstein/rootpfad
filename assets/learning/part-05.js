MODULES.push({
 "id": "m51",
 "part": 10,
 "partTitle": "PHP & Laravel",
 "title": "Experte · Testen, Qualität und Deployment",
 "lessons": [
  {
   "id": "m51-l1",
   "title": "Feature-Tests mit Pest und PHPUnit",
   "minutes": 13,
   "body": "<p>Laravel bringt eine vollständige Testumgebung mit. Neue Projekte nutzen standardmäßig <strong>Pest<\/strong>, eine knappe Syntax, die auf PHPUnit aufsetzt. Beide laufen mit <code>php artisan test<\/code>.<\/p> <table class=\"lesson-table\"><tr><th>Art<\/th><th>Prüft<\/th><th>Geschwindigkeit<\/th><\/tr> <tr><td>Unit-Test<\/td><td>eine Klasse isoliert, ohne Framework<\/td><td>sehr schnell<\/td><\/tr> <tr><td>Feature-Test<\/td><td>einen HTTP-Request durch die ganze App, mit Datenbank<\/td><td>schnell genug, größter Nutzen<\/td><\/tr> <tr><td>Browser-Test<\/td><td>echtes JavaScript im Browser (Dusk, Pest-Browser-Plugin)<\/td><td>langsam<\/td><\/tr><\/table> <p>In Laravel-Projekten bringen <strong>Feature-Tests<\/strong> den meisten Nutzen pro Zeile: Sie prüfen Routing, Validierung, Autorisierung, Datenbank und Antwort zusammen. Der Trait <code>RefreshDatabase<\/code> setzt die Datenbank pro Test zurück, standardmäßig per Transaktion, also sehr schnell. Für Tests meist mit SQLite im Speicher, konfiguriert in <code>phpunit.xml<\/code>.<\/p> <p>Jeder gute Test folgt dem Muster <strong>Arrange – Act – Assert<\/strong>: Daten mit Factories anlegen, Request ausführen, Ergebnis prüfen. Teste bei jeder Funktion mindestens den <strong>Erfolgsfall<\/strong>, den <strong>Validierungsfehler<\/strong> und den <strong>fremden Benutzer<\/strong>.<\/p>",
   "code": "<?php\n// tests/Feature/BestellungTest.php\nuse App\\Models\\{Bestellung, Produkt, User};\nuse function Pest\\Laravel\\{actingAs, assertDatabaseHas};\n\nuses(Illuminate\\Foundation\\Testing\\RefreshDatabase::class);\n\nit('legt eine Bestellung an und reduziert den Bestand', function () {\n    $user    = User::factory()->hasKunde()->create();\n    $produkt = Produkt::factory()->create(['bestand' => 5, 'preis_cent' => 1000]);\n\n    actingAs($user)\n        ->postJson('/api/v1/bestellungen', [\n            'positionen' => [['produkt_id' => $produkt->id, 'menge' => 2]],\n        ], ['Idempotency-Key' => 'test-1'])\n        ->assertCreated()\n        ->assertJsonPath('data.status', 'offen');\n\n    expect($produkt->fresh()->bestand)->toBe(3);\n    assertDatabaseHas('bestellung_produkt', ['produkt_id' => $produkt->id, 'menge' => 2]);\n});\n\nit('lehnt eine Menge ueber dem Bestand ab', function () {\n    $produkt = Produkt::factory()->create(['bestand' => 1]);\n\n    actingAs(User::factory()->hasKunde()->create())\n        ->postJson('/api/v1/bestellungen', ['positionen' => [['produkt_id' => $produkt->id, 'menge' => 9]]],\n                   ['Idempotency-Key' => 'test-2'])\n        ->assertStatus(409);          // LagerbestandZuNiedrig -> 409, siehe API-Modul\n});\n\nit('zeigt fremde Bestellungen nicht an', function () {\n    $fremde = Bestellung::factory()->create();\n\n    actingAs(User::factory()->create())\n        ->getJson(\"/api/v1/bestellungen/{$fremde->id}\")\n        ->assertNotFound();\n});",
   "codeLang": "PHP · Pest",
   "tip": "Der dritte Test – „fremder Benutzer“ – ist der wichtigste und der am häufigsten vergessene. Er sichert die Autorisierung ab, also genau die Lücke, die laut OWASP am häufigsten ausgenutzt wird. Ein Projekt, in dem jede Ressource so einen Test hat, ist sicherer als eines mit 100 % Zeilenabdeckung ohne ihn.",
   "quiz": [
    {
     "q": "Was macht der Trait RefreshDatabase?",
     "options": [
      "Er sorgt für einen sauberen Datenbankzustand pro Test",
      "Er lädt Seeder-Daten",
      "Er löscht die Produktionsdatenbank"
     ],
     "correct": 0,
     "explain": "Standardmäßig über eine Transaktion, die nach jedem Test zurückgerollt wird."
    },
    {
     "q": "Welche Testart bietet in typischen Laravel-Projekten den größten Nutzen pro Aufwand?",
     "options": [
      "Unit-Tests",
      "Feature-Tests",
      "Browser-Tests"
     ],
     "correct": 1,
     "explain": "Sie prüfen Routing, Validierung, Autorisierung und Datenbank in einem Durchlauf."
    },
    {
     "q": "Wofür steht das Muster Arrange – Act – Assert?",
     "options": [
      "Analysieren, Akzeptieren, Abnehmen",
      "Vorbereiten, Ausführen, Prüfen",
      "Anlegen, Aktualisieren, Archivieren"
     ],
     "correct": 1,
     "explain": "Jeder Test sollte diese drei Phasen klar erkennbar haben."
    }
   ]
  },
  {
   "id": "m51-l2",
   "title": "Fakes, Mocks und Zeitreisen",
   "minutes": 11,
   "body": "<p>Tests dürfen keine echten Mails verschicken, keine echten Zahlungen auslösen und nicht davon abhängen, ob eine externe API gerade erreichbar ist. Laravel bietet für fast jeden Dienst einen <strong>Fake<\/strong>:<\/p> <table class=\"lesson-table\"><tr><th>Fake<\/th><th>Prüfung<\/th><\/tr> <tr><td><code>Mail::fake()<\/code><\/td><td><code>Mail::assertSent(BestellBestaetigung::class)<\/code><\/td><\/tr> <tr><td><code>Queue::fake()<\/code><\/td><td><code>Queue::assertPushed(RechnungErzeugen::class)<\/code><\/td><\/tr> <tr><td><code>Event::fake([…])<\/code><\/td><td><code>Event::assertDispatched(BestellungAufgegeben::class)<\/code><\/td><\/tr> <tr><td><code>Notification::fake()<\/code><\/td><td><code>Notification::assertSentTo($user, …)<\/code><\/td><\/tr> <tr><td><code>Storage::fake('s3')<\/code><\/td><td><code>Storage::disk('s3')-&gt;assertExists($pfad)<\/code><\/td><\/tr> <tr><td><code>Http::fake([...])<\/code><\/td><td><code>Http::assertSent(fn ($req) =&gt; …)<\/code><\/td><\/tr><\/table> <p><code>Http::preventStrayRequests()<\/code> lässt jeden Test fehlschlagen, der versehentlich eine echte HTTP-Anfrage ins Internet schickt. Das ist eine gute Voreinstellung für die ganze Testsuite.<\/p> <p>Zeitabhängige Logik („Gutschein läuft nach 30 Tagen ab“) testest du mit <strong>Zeitreisen<\/strong>: <code>$this-&gt;travel(31)-&gt;days()<\/code> oder <code>$this-&gt;travelTo(...)<\/code>. Echtes <code>sleep()<\/code> gehört nie in einen Test.<\/p> <p>Für eigene Klassen tauschst du die Bindung im Container aus (<code>$this-&gt;mock(…)<\/code> oder <code>instance()<\/code>). Mocke dabei nur Grenzen nach außen – Zahlungsanbieter, fremde APIs. Wer jede interne Klasse mockt, testet am Ende nur die Mocks.<\/p>",
   "code": "<?php\nit('loest beim Anlegen das Event aus', function () {\n    Event::fake([BestellungAufgegeben::class]);\n    $user    = User::factory()->hasKunde()->create();\n    $produkt = Produkt::factory()->create(['bestand' => 3]);\n\n    $bestellung = app(BestellungAnlegen::class)\n        ->ausfuehren($user, [new WarenkorbPosition($produkt->id, 1)]);\n\n    Event::assertDispatched(BestellungAufgegeben::class, fn ($e) => $e->bestellung->is($bestellung));\n});\n\nit('verschickt die Bestaetigung an den Kunden', function () {\n    Mail::fake();\n    $bestellung = Bestellung::factory()->create();\n\n    (new BestaetigungSenden)->handle(new BestellungAufgegeben($bestellung));\n\n    Mail::assertSent(BestellBestaetigung::class, fn ($mail) => $mail->hasTo($bestellung->kunde->email));\n});\n\nit('rechnet mit dem Kurs der EZB', function () {\n    // angenommen, EzbWechselkurse fragt den Kurs per Http::get() ab\n    Http::preventStrayRequests();\n    Http::fake([\n        'data-api.ecb.europa.eu/*' => Http::response(['kurs' => 1.10], 200),\n    ]);\n\n    expect(app(PreisRechner::class)->inWaehrung(1000, 'USD'))->toBe(1100);\n\n    Http::assertSentCount(1);\n});\n\nit('laesst Gutscheine nach 30 Tagen verfallen', function () {\n    $gutschein = Gutschein::factory()->create();      // gueltig_bis = jetzt + 30 Tage\n\n    expect($gutschein->istGueltig())->toBeTrue();\n\n    $this->travel(31)->days();\n\n    expect($gutschein->fresh()->istGueltig())->toBeFalse();\n});\n\nit('behandelt einen Ausfall des Zahlungsanbieters', function () {\n    $this->mock(Zahlungsanbieter::class)\n        ->shouldReceive('belaste')->once()->andThrow(new ZahlungFehlgeschlagen('Timeout'));\n\n    // ... Request ausfuehren und Fehlermeldung pruefen ...\n});",
   "codeLang": "PHP · Pest",
   "tip": "Teste auch den <strong>Fehlerfall externer Dienste<\/strong>: Was passiert, wenn der Zahlungsanbieter mit 500 antwortet oder nach 30 Sekunden noch nicht? Mit <code>Http::response(status: 500)<\/code> oder einer geworfenen <code>ConnectionException<\/code> ist das in Sekunden geschrieben. In der Praxis bringen solche Tests oft fehlende Timeouts und Retry-Logik ans Licht.",
   "quiz": [
    {
     "q": "Was bewirkt Http::preventStrayRequests()?",
     "options": [
      "Jede nicht gefakte HTTP-Anfrage im Test löst einen Fehler aus",
      "Es blockiert eingehende Requests",
      "Es beschleunigt HTTP-Anfragen"
     ],
     "correct": 0,
     "explain": "So schickt kein Test versehentlich Daten an ein echtes System."
    },
    {
     "q": "Wie testest du, dass ein Gutschein nach 30 Tagen verfällt?",
     "options": [
      "Mit sleep() 30 Tage warten",
      "Mit $this->travel(31)->days()",
      "Durch Ändern der Systemuhr des Servers"
     ],
     "correct": 1,
     "explain": "Laravel verschiebt die Zeit für Carbon und now() im Test."
    },
    {
     "q": "Welche Klassen sollte man in Tests vorrangig mocken?",
     "options": [
      "Eloquent-Models",
      "Alle internen Klassen",
      "Grenzen nach außen wie Zahlungsanbieter und fremde APIs"
     ],
     "correct": 2,
     "explain": "Interne Logik soll echt mitlaufen, sonst testet man nur die eigenen Annahmen."
    }
   ]
  },
  {
   "id": "m51-l3",
   "title": "Codequalität: Pint, Larastan und CI",
   "minutes": 10,
   "body": "<p>Qualität entsteht nicht durch Disziplin allein, sondern durch <strong>Automatisierung<\/strong>. Drei Werkzeuge gehören in jedes ernsthafte Laravel-Projekt:<\/p> <ul><li><strong>Laravel Pint<\/strong> formatiert den Code einheitlich (<code>./vendor/bin/pint<\/code>). Diskussionen über Leerzeichen und Klammern entfallen.<\/li> <li><strong>Larastan<\/strong> (PHPStan mit Laravel-Wissen) analysiert den Code statisch und findet Typfehler, falsche Methodenaufrufe und vergessene null-Prüfungen – ohne ihn auszuführen. Stufe 0 ist nachsichtig, höhere Stufen sind strenger. Bei Altprojekten hält eine <strong>Baseline<\/strong> bestehende Fehler fest, damit nur neue auffallen.<\/li> <li><strong>Rector<\/strong> modernisiert Code automatisch, etwa beim Umstieg auf eine neue PHP- oder Laravel-Version.<\/li><\/ul> <p>Eine <strong>CI-Pipeline<\/strong> (GitHub Actions, GitLab CI) führt bei jedem Push dieselben Schritte aus: Abhängigkeiten installieren, Pint im Prüfmodus, Larastan, Tests, <code>composer audit<\/code>. Ein Merge ist erst möglich, wenn alles grün ist. Der Code-Review kann sich dann auf Inhalte statt Formalien konzentrieren.<\/p>",
   "code": "# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\n\njobs:\n  tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: shivammathur/setup-php@v2\n        with:\n          php-version: '8.3'\n          coverage: none\n      - run: composer install --no-interaction --prefer-dist\n      - run: cp .env.example .env && php artisan key:generate\n      - run: ./vendor/bin/pint --test            # nur pruefen, nicht aendern\n      - run: ./vendor/bin/phpstan analyse --memory-limit=1G\n      - run: php artisan test --parallel\n      - run: composer audit",
   "codeLang": "GitHub Actions",
   "tip": "Führe Larastan in einem Altprojekt nicht sofort auf höchster Stufe ein. Starte niedrig, lege eine Baseline an und erhöhe die Stufe in kleinen Schritten. Wichtig ist, dass <em>neuer<\/em> Code sofort sauber sein muss. Tausend Altfehler auf einmal will niemand beheben.",
   "quiz": [
    {
     "q": "Was findet statische Analyse mit Larastan?",
     "options": [
      "Typfehler, falsche Aufrufe und mögliche null-Zugriffe, ohne den Code auszuführen",
      "Langsame Datenbankabfragen",
      "Nur Formatierungsfehler"
     ],
     "correct": 0,
     "explain": "Formatierung ist die Aufgabe von Pint."
    },
    {
     "q": "Wozu dient eine Baseline bei PHPStan bzw. Larastan?",
     "options": [
      "Sie speichert bestehende Fehler, damit nur neue Fehler gemeldet werden",
      "Sie setzt die Analyse-Stufe auf 0",
      "Sie deaktiviert die Analyse für Tests"
     ],
     "correct": 0,
     "explain": "So lässt sich statische Analyse auch in Altprojekten sofort einführen."
    },
    {
     "q": "Was macht pint --test in der CI?",
     "options": [
      "Es führt die Tests aus",
      "Es formatiert alle Dateien und committet",
      "Es prüft nur und schlägt fehl, wenn Dateien nicht dem Stil entsprechen"
     ],
     "correct": 2,
     "explain": "Formatieren lokal, prüfen in der CI."
    }
   ]
  },
  {
   "id": "m51-l4",
   "title": "Deployment und Sicherheit in Produktion",
   "minutes": 13,
   "body": "<p>Ein Deployment muss <strong>wiederholbar<\/strong> sein – ein Skript, kein Gedächtnisprotokoll. Die Standardschritte:<\/p> <ul><li>Code holen, <code>composer install --no-dev --optimize-autoloader<\/code><\/li> <li>Frontend bauen (<code>npm ci &amp;&amp; npm run build<\/code>)<\/li> <li><code>php artisan migrate --force<\/code> (ohne <code>--force<\/code> fragt Laravel in Produktion nach)<\/li> <li><code>php artisan optimize<\/code> (Config, Routen, Events, Views cachen)<\/li> <li><code>php artisan queue:restart<\/code>, PHP-FPM neu laden (wegen OPcache)<\/li><\/ul> <p><strong>Zero-Downtime-Deployments<\/strong> bauen jedes Release in einem eigenen Verzeichnis auf und schalten am Ende nur einen Symlink <code>current<\/code> um. Werkzeuge: Laravel Cloud, Forge, Envoyer, Deployer. Migrationen müssen dafür <strong>abwärtskompatibel<\/strong> sein: Eine Spalte erst hinzufügen, Code umstellen und erst in einem späteren Release die alte Spalte entfernen.<\/p> <table class=\"lesson-table\"><tr><th>Prüfpunkt<\/th><th>Produktion<\/th><\/tr> <tr><td><code>APP_ENV<\/code><\/td><td><code>production<\/code><\/td><\/tr> <tr><td><code>APP_DEBUG<\/code><\/td><td><code>false<\/code> – sonst zeigt die Fehlerseite Code, Pfade und Umgebungswerte<\/td><\/tr> <tr><td><code>APP_KEY<\/code><\/td><td>gesetzt, geheim, nie wechseln ohne Plan (sonst sind Sessions und verschlüsselte Daten unlesbar)<\/td><\/tr> <tr><td>HTTPS<\/td><td>überall, mit HSTS-Header<\/td><\/tr> <tr><td>Document Root<\/td><td>nur <code>public/<\/code><\/td><\/tr> <tr><td>Uploads<\/td><td>validiert (<code>mimes<\/code>, <code>max<\/code>), außerhalb von <code>public/<\/code> oder in S3, nie mit Benutzer-Dateinamen<\/td><\/tr> <tr><td>Abhängigkeiten<\/td><td><code>composer audit<\/code> regelmäßig, Updates zeitnah<\/td><\/tr> <tr><td>Fehler<\/td><td>an Logging-/Monitoring-Dienst, nicht nur in <code>storage/logs<\/code><\/td><\/tr><\/table>",
   "code": "#!/usr/bin/env bash\n# deploy.sh - vereinfachtes Zero-Downtime-Deployment\nset -euo pipefail\n\nAPP=/var/www/shop\nRELEASE=$APP/releases/$(date +%Y%m%d%H%M%S)\n\ngit clone --depth 1 --branch main git@github.com:acme/shop.git \"$RELEASE\"\ncd \"$RELEASE\"\n\nln -s $APP/shared/.env     .env            # Geheimnisse liegen ausserhalb des Releases\nrm -rf storage && ln -s $APP/shared/storage storage\n\ncomposer install --no-dev --optimize-autoloader --no-interaction\nnpm ci && npm run build\n\nphp artisan migrate --force\nphp artisan optimize\n\nln -sfn \"$RELEASE\" $APP/current           # atomarer Wechsel\nsudo systemctl reload php8.3-fpm          # OPcache leeren\nphp artisan queue:restart\n\nls -dt $APP/releases/* | tail -n +6 | xargs rm -rf   # die letzten 5 Releases behalten",
   "codeLang": "Bash",
   "tip": "<code>APP_DEBUG=true<\/code> in Produktion ist eine der häufigsten und gefährlichsten Fehlkonfigurationen. Schon die erste Exception zeigt Angreifern Stacktrace, Dateipfade und je nach Version auch Umgebungsvariablen mit Passwörtern. Prüfe das nach jedem neuen Server – am besten automatisch im Deployment-Skript.",
   "quiz": [
    {
     "q": "Warum braucht php artisan migrate in Produktion die Option --force?",
     "options": [
      "Weil Laravel in Produktion sonst interaktiv nachfragt und ein Skript hängen bliebe",
      "Damit alle Tabellen neu angelegt werden",
      "Damit fehlerhafte Migrationen ignoriert werden"
     ],
     "correct": 0,
     "explain": "Die Rückfrage schützt vor versehentlichem Ausführen."
    },
    {
     "q": "Wie benennt man eine Spalte bei Zero-Downtime-Deployments sicher um?",
     "options": [
      "In einer Migration umbenennen",
      "Neue Spalte hinzufügen, Code umstellen, alte Spalte in einem späteren Release entfernen",
      "Die Tabelle neu anlegen"
     ],
     "correct": 1,
     "explain": "Während des Wechsels laufen alter und neuer Code kurz gleichzeitig – beide müssen funktionieren."
    },
    {
     "q": "Was ist das Risiko von APP_DEBUG=true in Produktion?",
     "options": [
      "Logs werden nicht geschrieben",
      "Die Anwendung wird langsamer",
      "Fehlerseiten verraten Quellcode, Pfade und unter Umständen Geheimnisse"
     ],
     "correct": 2,
     "explain": "In Produktion immer APP_DEBUG=false."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m60",
 "part": 10,
 "partTitle": "PHP & Laravel",
 "title": "Experte · Sicherheit, Betrieb und Abschlussprojekt",
 "lessons": [
  {
   "id": "m60-l1",
   "title": "Security-Checkliste für Laravel",
   "minutes": 13,
   "body": "<p>Laravel schützt vor vielen Angriffen von Haus aus – solange man die Schutzmechanismen nicht umgeht. Diese Tabelle verbindet die häufigsten Risiken (OWASP Top 10) mit den passenden Werkzeugen:<\/p> <table class=\"lesson-table\"><tr><th>Risiko<\/th><th>Laravel-Schutz<\/th><th>Typischer Fehler<\/th><\/tr> <tr><td>Fehlende Zugriffskontrolle<\/td><td>Policies, <code>Gate::authorize<\/code><\/td><td>Policy vergessen, IDs in der URL frei änderbar<\/td><\/tr> <tr><td>Injection<\/td><td>Eloquent/Query Builder mit Bindings<\/td><td>Variablen in <code>whereRaw<\/code>/<code>DB::select<\/code> eingesetzt<\/td><\/tr> <tr><td>XSS<\/td><td><code>{{ }}<\/code> kodiert automatisch<\/td><td><code>{!! !!}<\/code> mit Benutzerinhalt<\/td><\/tr> <tr><td>CSRF<\/td><td><code>@csrf<\/code>, <code>ValidateCsrfTokens<\/code><\/td><td>zu großzügige Ausnahmen<\/td><\/tr> <tr><td>Mass Assignment<\/td><td><code>$fillable<\/code>, <code>validated()<\/code><\/td><td><code>$request-&gt;all()<\/code><\/td><\/tr> <tr><td>Schwache Authentifizierung<\/td><td>Starter Kits, Rate Limiting, <code>Password::defaults()<\/code><\/td><td>Login ohne <code>throttle<\/code><\/td><\/tr> <tr><td>Fehlkonfiguration<\/td><td><code>APP_DEBUG=false<\/code>, HTTPS<\/td><td>Debug-Seite in Produktion<\/td><\/tr> <tr><td>Verwundbare Abhängigkeiten<\/td><td><code>composer audit<\/code>, <code>npm audit<\/code><\/td><td>Updates jahrelang liegen lassen<\/td><\/tr><\/table> <p><strong>Signierte URLs<\/strong> sind ein unterschätztes Werkzeug: <code>URL::temporarySignedRoute('abmelden', now()-&gt;addDays(7), ['user' =&gt; $id])<\/code> erzeugt einen Link, der ohne Login funktioniert, aber nicht manipuliert werden kann und abläuft – ideal für Abmeldelinks in Newslettern oder Download-Links in Mails. Die Route prüft das mit der Middleware <code>signed<\/code>.<\/p> <p>Ergänze <strong>Sicherheits-Header<\/strong> über eine Middleware: <code>Content-Security-Policy<\/code>, <code>X-Content-Type-Options: nosniff<\/code>, <code>Referrer-Policy<\/code> und <code>Strict-Transport-Security<\/code>.<\/p>",
   "code": "<?php\n// Abmeldelink: ohne Login, aber faelschungssicher und befristet\n$link = URL::temporarySignedRoute('newsletter.abmelden', now()->addDays(7), ['user' => $user->id]);\n\nRoute::get('/newsletter/abmelden/{user}', NewsletterAbmelden::class)\n    ->name('newsletter.abmelden')\n    ->middleware('signed');            // 403 bei manipulierter oder abgelaufener URL\n\n// Passwortregeln zentral - AppServiceProvider::boot()\nPassword::defaults(fn () => app()->isProduction()\n    ? Password::min(12)->mixedCase()->numbers()->uncompromised()\n    : Password::min(8));\n\n// Sicherheits-Header als Middleware\nclass SicherheitsHeader\n{\n    public function handle(Request $request, Closure $next): Response\n    {\n        $antwort = $next($request);\n        $antwort->headers->set('X-Content-Type-Options', 'nosniff');\n        $antwort->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');\n        $antwort->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');\n        return $antwort;\n    }\n}",
   "codeLang": "PHP · Laravel",
   "tip": "<code>uncompromised()<\/code> prüft Passwörter gegen die Datenbank bekannter Leaks von Have I Been Pwned – über ein Verfahren, bei dem nur die ersten fünf Zeichen des Hashes übertragen werden (k-Anonymität). Das Passwort selbst verlässt deinen Server nie. Ein gutes Beispiel dafür, wie Sicherheit und Datenschutz zusammenpassen.",
   "quiz": [
    {
     "q": "Wofür eignet sich URL::temporarySignedRoute besonders?",
     "options": [
      "Für Links ohne Login, die nicht manipuliert werden dürfen und ablaufen, z. B. Abmeldelinks",
      "Für API-Tokens",
      "Für Admin-Bereiche"
     ],
     "correct": 0,
     "explain": "Die Middleware signed prüft Signatur und Ablaufzeit."
    },
    {
     "q": "Welches Werkzeug findet bekannte Sicherheitslücken in PHP-Abhängigkeiten?",
     "options": [
      "php artisan optimize",
      "composer audit",
      "php -l"
     ],
     "correct": 1,
     "explain": "Für JavaScript-Pakete gibt es entsprechend npm audit."
    },
    {
     "q": "Welcher Fehler führt zu fehlender Zugriffskontrolle?",
     "options": [
      "Ein zu langes Passwort",
      "{{ }} statt {!! !!}",
      "Eine vergessene Policy-Prüfung, sodass fremde IDs in der URL funktionieren"
     ],
     "correct": 2,
     "explain": "Broken Access Control steht auf Platz 1 der OWASP Top 10."
    }
   ]
  },
  {
   "id": "m60-l2",
   "title": "Betrieb beobachten: Logs, Pulse, Telescope, Fehlerdienste",
   "minutes": 12,
   "body": "<p>Eine Anwendung in Produktion ist nur so gut wie deine Fähigkeit, ihr zuzusehen. Laravel bringt dafür mehrere Werkzeuge mit, die unterschiedliche Fragen beantworten:<\/p> <table class=\"lesson-table\"><tr><th>Werkzeug<\/th><th>Beantwortet<\/th><th>Wo<\/th><\/tr> <tr><td>Logs (<code>config/logging.php<\/code>)<\/td><td>Was ist genau passiert?<\/td><td>überall<\/td><\/tr> <tr><td><strong>Telescope<\/strong><\/td><td>Welche Abfragen, Jobs, Mails hat diese Anfrage ausgelöst?<\/td><td>lokal / Staging<\/td><\/tr> <tr><td><strong>Pulse<\/strong><\/td><td>Welche Routen und Abfragen sind langsam, wer belastet das System?<\/td><td>Produktion<\/td><\/tr> <tr><td>Fehlerdienst (Sentry, Flare …)<\/td><td>Welche Exceptions treten auf, wie oft, seit welchem Release?<\/td><td>Produktion<\/td><\/tr> <tr><td>Health-Check <code>/up<\/code><\/td><td>Lebt die Anwendung?<\/td><td>für Load Balancer und Monitoring<\/td><\/tr><\/table> <p><strong>Log-Kanäle:<\/strong> <code>daily<\/code> schreibt eine Datei pro Tag und löscht alte nach einer festgelegten Zahl von Tagen, <code>stack<\/code> verteilt auf mehrere Kanäle. In Containern schreibt man nach <code>stderr<\/code>, wo die Plattform die Logs einsammelt.<\/p> <p><code>Log::withContext([...])<\/code> hängt Informationen an alle folgenden Einträge einer Anfrage – etwa eine Request-ID oder die Benutzer-ID. Damit lässt sich ein Fehler über alle Einträge hinweg verfolgen.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Telescope zeichnet Anfragen samt Daten auf. In Produktion ist es ohne strenge Zugriffsbeschränkung ein Datenleck und ohne Aufräumen ein Speicherproblem. Installiere es mit <code>--dev<\/code> oder beschränke es per Gate auf wenige Personen.<\/p><\/div>",
   "code": "<?php\n// Middleware: jede Anfrage bekommt eine ID, die in jedem Log-Eintrag steht\nclass RequestId\n{\n    public function handle(Request $request, Closure $next): Response\n    {\n        $id = $request->header('X-Request-Id') ?: (string) Str::uuid();\n        Log::withContext(['request_id' => $id, 'user_id' => $request->user()?->id]);\n\n        $antwort = $next($request);\n        $antwort->headers->set('X-Request-Id', $id);\n        return $antwort;\n    }\n}\n\n// config/logging.php (Auszug)\n'channels' => [\n    'stack' => ['driver' => 'stack', 'channels' => ['daily', 'stderr']],\n    'daily' => ['driver' => 'daily', 'path' => storage_path('logs/laravel.log'), 'level' => 'info', 'days' => 14],\n],\n\n// Pulse-Dashboard nur fuer Admins - AppServiceProvider::boot()\nGate::define('viewPulse', fn (User $user) => $user->ist_admin);",
   "codeLang": "PHP · Laravel",
   "tip": "Richte Alarme nach Symptomen ein, nicht nach Ursachen: „Fehlerquote über 2 %“, „Antwortzeit der Startseite über 1 s“, „Queue älter als 5 Minuten“. Ein Alarm für jede einzelne Exception führt schnell dazu, dass niemand mehr hinsieht.",
   "quiz": [
    {
     "q": "Welches Werkzeug zeigt langsame Routen und Abfragen in Produktion?",
     "options": [
      "Pulse",
      "Tinker",
      "Telescope"
     ],
     "correct": 0,
     "explain": "Telescope ist vor allem für die lokale Fehlersuche gedacht."
    },
    {
     "q": "Wozu dient Log::withContext()?",
     "options": [
      "Es löscht alte Logs",
      "Es hängt Informationen wie eine Request-ID an alle folgenden Einträge an",
      "Es verschlüsselt Logs"
     ],
     "correct": 1,
     "explain": "So lassen sich alle Einträge einer Anfrage zusammenführen."
    },
    {
     "q": "Wofür ist die Route /up in neuen Laravel-Projekten gedacht?",
     "options": [
      "Für Updates",
      "Für Uploads",
      "Als Health-Check für Load Balancer und Monitoring"
     ],
     "correct": 2,
     "explain": "Sie antwortet mit 200, wenn die Anwendung startet."
    }
   ]
  },
  {
   "id": "m60-l3",
   "title": "Abschlussprojekt Teil 1: einen Mini-Shop planen",
   "minutes": 14,
   "body": "<p>Jetzt setzt du alles zusammen: ein <strong>Mini-Shop<\/strong> mit Katalog, Warenkorb, Bestellung, Admin-Bereich und API. Gute Projekte beginnen nicht mit Code, sondern mit einem Plan. Arbeite diese Lektion mit Stift und Papier oder in einer Datei <code>PLAN.md<\/code> im Projekt.<\/p> <p><strong>1. User Stories<\/strong> – wer will was, und warum?<\/p> <ul><li>Als <em>Kunde<\/em> will ich Produkte nach Kategorie durchsuchen, um schnell zu finden, was ich brauche.<\/li> <li>Als <em>Kunde<\/em> will ich eine Bestellbestätigung per Mail, damit ich einen Beleg habe.<\/li> <li>Als <em>Admin<\/em> will ich Bestände pflegen, damit nichts verkauft wird, was nicht da ist.<\/li> <li>Als <em>Partner<\/em> will ich Bestellungen per API abrufen, um sie in meiner Warenwirtschaft zu verbuchen.<\/li><\/ul> <p><strong>2. Datenmodell<\/strong> – Tabellen und Beziehungen: <code>kategorien<\/code> 1:n <code>produkte<\/code>, <code>users<\/code> 1:1 <code>kunden<\/code>, <code>kunden<\/code> 1:n <code>bestellungen<\/code>, <code>bestellungen<\/code> n:m <code>produkte<\/code> über <code>bestellung_produkt<\/code> (mit Menge und Preis zum Bestellzeitpunkt).<\/p> <p><strong>3. Routen und Rechte<\/strong> – siehe Tabelle unten. Jede Route bekommt eine Zeile mit Middleware und Policy.<\/p> <p><strong>4. Meilensteine<\/strong> – klein und lauffähig: M1 Katalog lesend, M2 Warenkorb und Bestellung, M3 Admin, M4 API, M5 Tests und Deployment. Nach jedem Meilenstein ist die Anwendung benutzbar.<\/p>",
   "code": "ROUTEN-PLAN MINI-SHOP\n\nMethode  Pfad                          Name                   Schutz\n-------  ----------------------------  ---------------------  ---------------------------\nGET      /                             start                  -\nGET      /kategorien/{kategorie:slug}  kategorien.show        -\nGET      /produkte/{produkt:slug}      produkte.show          -\nPOST     /warenkorb                    warenkorb.store        throttle\nPOST     /bestellungen                 bestellungen.store     auth, verified\nGET      /bestellungen/{bestellung}    bestellungen.show      auth + Policy view\nGET      /admin/produkte               admin.produkte.index   auth + Gate admin\nPUT      /admin/produkte/{produkt}     admin.produkte.update  auth + Policy update\nGET      /api/v1/bestellungen          api.bestellungen.index auth:sanctum + Ability\nPOST     /webhooks/zahlung             webhooks.zahlung       Signatur (kein CSRF)\n\nMEILENSTEINE\n  M1  Katalog lesend          Migrationen, Factories, Seeder, Blade-Komponenten\n  M2  Warenkorb + Bestellung  Session-Warenkorb, Action BestellungAnlegen, Mail\n  M3  Admin                   Policies, Form Requests, Uploads\n  M4  API                     Sanctum, Resources, Rate Limiting\n  M5  Qualitaet + Betrieb     Pest-Tests, Larastan, CI, Deployment",
   "codeLang": "Projektplan",
   "tip": "Schreibe zu jedem Meilenstein vorher die Tests auf, die am Ende grün sein müssen – zumindest als Liste von Sätzen („Ein Gast kann keine Bestellung anlegen“, „Ein Kunde sieht keine fremde Bestellung“). Das ist die Definition of Done, und sie verhindert, dass ein Meilenstein „fast fertig“ bleibt.",
   "quiz": [
    {
     "q": "Warum speichert die Zwischentabelle bestellung_produkt den Preis zum Bestellzeitpunkt?",
     "options": [
      "Damit spätere Preisänderungen alte Bestellungen nicht verändern",
      "Weil Laravel es verlangt",
      "Aus Platzgründen"
     ],
     "correct": 0,
     "explain": "Eine Rechnung muss unverändert bleiben, auch wenn der Produktpreis sich ändert."
    },
    {
     "q": "Was zeichnet einen guten Meilenstein aus?",
     "options": [
      "Er umfasst möglichst viele Funktionen",
      "Am Ende ist die Anwendung lauffähig und benutzbar",
      "Er hat keine Tests"
     ],
     "correct": 1,
     "explain": "Kleine, lauffähige Schritte machen den Fortschritt sichtbar und Fehler früh erkennbar."
    },
    {
     "q": "Welcher Schutz gehört an die Webhook-Route?",
     "options": [
      "Login",
      "CSRF-Token",
      "Signaturprüfung"
     ],
     "correct": 2,
     "explain": "Webhooks kommen von fremden Servern, deshalb sind sie vom CSRF-Schutz ausgenommen."
    }
   ]
  },
  {
   "id": "m60-l4",
   "title": "Abschlussprojekt Teil 2: Umsetzung und Release",
   "minutes": 14,
   "body": "<p>Die Umsetzung folgt den Meilensteinen. Für jeden gibt es eine feste Reihenfolge, die sich in der Praxis bewährt:<\/p> <ol><li><strong>Branch anlegen<\/strong>: <code>git switch -c feature/m2-bestellung<\/code>.<\/li> <li><strong>Tests als Liste<\/strong> aus der Planung übernehmen und als leere Pest-Tests anlegen.<\/li> <li><strong>Datenbank zuerst<\/strong>: Migration, Model, Factory.<\/li> <li><strong>Fachlogik<\/strong> in einer Action, mit Unit- oder Feature-Test.<\/li> <li><strong>HTTP-Schicht<\/strong>: Route, Form Request, Policy, Controller, View oder Resource.<\/li> <li><strong>Qualität<\/strong>: <code>pint<\/code>, <code>phpstan<\/code>, <code>php artisan test<\/code> – alles grün.<\/li> <li><strong>Pull Request<\/strong> mit Beschreibung, Review, Merge.<\/li><\/ol> <p>Vor dem ersten Release steht eine Checkliste, die du nicht aus dem Gedächtnis abhakst, sondern Punkt für Punkt prüfst:<\/p> <ul><li><code>APP_ENV=production<\/code>, <code>APP_DEBUG=false<\/code>, HTTPS erzwungen<\/li> <li>Queue-Worker und Scheduler laufen und werden überwacht<\/li> <li>Backups der Datenbank laufen <em>und<\/em> eine Wiederherstellung wurde getestet<\/li> <li>Fehlerdienst und Alarme sind eingerichtet<\/li> <li>Impressum und Datenschutzerklärung sind online<\/li> <li><code>composer audit<\/code> ohne Befunde<\/li><\/ul> <p>Mit dem ersten Tag <code>v1.0.0<\/code> ist das Projekt nicht fertig – aber ab jetzt kannst du es sicher weiterentwickeln.<\/p>",
   "code": "# Meilenstein M2 - von der Planung zum Pull Request\ngit switch -c feature/m2-bestellung\n\nphp artisan make:model Bestellung -mf\nphp artisan make:request BestellungRequest\nphp artisan make:policy BestellungPolicy --model=Bestellung\nphp artisan make:mail BestellBestaetigung --markdown=mail.bestellung\nphp artisan make:test BestellungTest --pest\n\nphp artisan migrate\nphp artisan test --filter=Bestellung\n\n./vendor/bin/pint\n./vendor/bin/phpstan analyse\nphp artisan test --parallel\n\ngit add -A\ngit commit -m \"feat(bestellung): Bestellung aus Warenkorb anlegen\"\ngit push -u origin feature/m2-bestellung\n# -> Pull Request oeffnen, Review, Merge in main\n\n# Release\ngit switch main && git pull\ngit tag -a v1.0.0 -m \"Erste oeffentliche Version\"\ngit push origin v1.0.0",
   "codeLang": "Bash",
   "tip": "Schreib nach dem Release eine kurze Rückschau: Was lief gut, was hat länger gedauert als geplant, was machst du beim nächsten Projekt anders? Das klingt nach Formalität, ist aber der schnellste Weg vom Junior zum Senior – und eine starke Grundlage für die Projektdokumentation der Abschlussprüfung.",
   "quiz": [
    {
     "q": "Womit beginnt die Umsetzung eines Meilensteins sinnvollerweise?",
     "options": [
      "Mit einem eigenen Branch und der Testliste",
      "Mit dem CSS",
      "Mit dem Deployment"
     ],
     "correct": 0,
     "explain": "So bleibt main stabil, und das Ziel ist vorher klar."
    },
    {
     "q": "Welcher Punkt der Release-Checkliste wird am häufigsten übersprungen?",
     "options": [
      "Backups einrichten",
      "Eine Wiederherstellung aus dem Backup testen",
      "Den Server einschalten"
     ],
     "correct": 1,
     "explain": "Ein Backup ist erst dann etwas wert, wenn die Wiederherstellung nachweislich funktioniert."
    },
    {
     "q": "Wofür steht der Tag v1.0.0?",
     "options": [
      "Für einen Branch",
      "Für den ersten Commit",
      "Für eine festgelegte Version nach Semantic Versioning"
     ],
     "correct": 2,
     "explain": "Tags markieren Releases; MAJOR.MINOR.PATCH beschreibt die Art der Änderungen."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m61",
 "part": 11,
 "partTitle": "Git & Zusammenarbeit",
 "title": "Git · Grundlagen",
 "lessons": [
  {
   "id": "m61-l1",
   "title": "Warum Versionskontrolle – und wie Git denkt",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Versionskontrolle<\/dt><dd>System, das jede Änderung an Dateien mit Zeitpunkt, Autor und Grund festhält, sodass man jeden früheren Stand wiederherstellen kann.<\/dd><dt>Repository (Repo)<\/dt><dd>Das Projekt samt kompletter Änderungsgeschichte. Technisch: dein Projektordner plus der versteckte Ordner .git.<\/dd><dt>Commit<\/dt><dd>Ein gespeicherter Schnappschuss aller Dateien mit Nachricht, Autor, Datum und Verweis auf den Vorgänger.<\/dd><dt>Hash (SHA)<\/dt><dd>Eindeutige Prüfsumme aus 40 Hex-Zeichen, die einen Commit identifiziert, z. B. a3f9c2e… – meist reichen die ersten 7 Zeichen.<\/dd><dt>verteilt<\/dt><dd>Jede Kopie des Repositorys enthält die vollständige Geschichte; es gibt keinen zwingenden zentralen Server.<\/dd><\/dl><\/div><p>Ohne Versionskontrolle sehen Projekte irgendwann so aus: <code>shop_final.zip<\/code>, <code>shop_final2.zip<\/code>, <code>shop_final_WIRKLICH.zip<\/code>. Niemand weiß, welche Version auf dem Server läuft, und eine Änderung von letzter Woche rückgängig zu machen, ist Detektivarbeit. <strong>Git<\/strong> löst das.<\/p> <p>Git speichert keine Liste von Änderungen, sondern <strong>Schnappschüsse<\/strong>: Jeder <strong>Commit<\/strong> hält den Zustand aller Dateien zu einem Zeitpunkt fest, dazu Autor, Datum, Nachricht und einen Verweis auf den Vorgänger-Commit. So entsteht eine Kette – genauer ein Graph, weil sich Wege verzweigen und wieder zusammenlaufen.<\/p> <ul><li>Jeder Commit hat eine eindeutige <strong>Prüfsumme<\/strong> (SHA-Hash) wie <code>a3f9c2e…<\/code>. Sie ergibt sich aus dem Inhalt. Verändert jemand nachträglich eine Datei in der Geschichte, ändert sich der Hash – Manipulation fällt auf.<\/li> <li>Git ist <em>verteilt<\/em>: Jede Kopie eines Repositorys enthält die komplette Geschichte. Du kannst offline committen, Geschichte durchsuchen und Branches anlegen.<\/li> <li><strong>Git ist nicht GitHub.<\/strong> Git ist das Werkzeug auf deinem Rechner. GitHub, GitLab und Bitbucket sind Plattformen, die Repositorys hosten und Zusammenarbeit (Pull Requests, Reviews, CI) ergänzen.<\/li><\/ul>",
   "code": "Zeit -->\n\nmain:     A ---- B ---- C ---------- F\n                        \\           /\nfeature:                 D ---- E -\n\nA..F   Commits (Schnappschuesse), jeder kennt seinen Vorgaenger\nC      gemeinsamer Ursprung von main und feature\nF      Merge-Commit: hat zwei Vorgaenger (C ... und E)\nHEAD   zeigt auf den Commit, an dem du gerade arbeitest",
   "codeLang": "Commit-Graph",
   "tip": "Wenn dich jemand im Vorstellungsgespräch nach dem Unterschied zwischen Git und GitHub fragt, ist die beste Antwort kurz: „Git ist die Versionskontrolle, GitHub ist eine Plattform, die Git-Repositorys hostet und Werkzeuge für Zusammenarbeit drumherum baut.“",
   "quiz": [
    {
     "q": "Was speichert ein Git-Commit?",
     "options": [
      "Einen Schnappschuss des Projektzustands plus Metadaten und Verweis auf den Vorgänger",
      "Eine ZIP-Datei des Projekts",
      "Nur die geänderten Zeilen"
     ],
     "correct": 0,
     "explain": "Intern speichert Git unveränderte Dateien effizient als Verweis, logisch ist jeder Commit aber ein vollständiger Zustand."
    },
    {
     "q": "Was bedeutet „Git ist verteilt“?",
     "options": [
      "Git läuft nur in der Cloud",
      "Jede Kopie enthält die vollständige Geschichte",
      "Dateien werden auf mehrere Server verteilt"
     ],
     "correct": 1,
     "explain": "Deshalb funktionieren Commits, Log und Branches auch ohne Netzwerk."
    },
    {
     "q": "Was ist GitHub?",
     "options": [
      "Ein Editor",
      "Ein anderer Name für Git",
      "Eine Plattform, die Git-Repositorys hostet und Zusammenarbeit ergänzt"
     ],
     "correct": 2,
     "explain": "GitLab und Bitbucket sind vergleichbare Plattformen."
    }
   ]
  },
  {
   "id": "m61-l2",
   "title": "Git installieren und einrichten",
   "minutes": 10,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Konfiguration (config)<\/dt><dd>Einstellungen von Git, z. B. Name und E-Mail, gespeichert auf drei Ebenen: system, global, local.<\/dd><dt>global<\/dt><dd>Gilt für alle Repositorys deines Benutzerkontos; steht in ~/.gitconfig.<\/dd><dt>local<\/dt><dd>Gilt nur für das aktuelle Repository; steht in .git/config und überschreibt global.<\/dd><dt>Default-Branch<\/dt><dd>Name des ersten Branches in einem neuen Repository, heute üblicherweise main.<\/dd><dt>SSH-Schlüssel<\/dt><dd>Schlüsselpaar zur Anmeldung bei GitHub/GitLab ohne Passwort; der private Teil bleibt auf deinem Rechner.<\/dd><\/dl><\/div><p>Auf macOS ist Git oft schon vorhanden (über die Xcode Command Line Tools), sonst <code>brew install git<\/code>. Unter Windows installierst du „Git for Windows“, das auch die Git Bash mitbringt. Prüfe mit <code>git --version<\/code>.<\/p> <p>Bevor du den ersten Commit machst, sagst du Git, wer du bist. Diese Angaben stehen in jedem Commit und sind später für alle sichtbar:<\/p> <table class=\"lesson-table\"><tr><th>Einstellung<\/th><th>Zweck<\/th><\/tr> <tr><td><code>user.name<\/code><\/td><td>dein Name in Commits<\/td><\/tr> <tr><td><code>user.email<\/code><\/td><td>deine E-Mail – auf GitHub die verknüpfte oder die anonyme „noreply“-Adresse<\/td><\/tr> <tr><td><code>init.defaultBranch<\/code><\/td><td>Name des ersten Branches in neuen Repositorys, üblich: <code>main<\/code><\/td><\/tr> <tr><td><code>core.editor<\/code><\/td><td>Editor für Commit-Nachrichten, z. B. <code>\"code --wait\"<\/code><\/td><\/tr> <tr><td><code>pull.rebase<\/code><\/td><td>ob <code>git pull<\/code> per Rebase statt Merge zusammenführt<\/td><\/tr><\/table> <p>Einstellungen gibt es auf drei Ebenen: <code>--system<\/code> (alle Benutzer), <code>--global<\/code> (dein Benutzerkonto, Datei <code>~/.gitconfig<\/code>) und <code>--local<\/code> (nur dieses Repository, Standard). Die engere Ebene gewinnt – so kannst du im Firmenprojekt die Firmen-E-Mail nutzen und global die private.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Führe die Befehle aus dem Beispiel mit deinen Daten aus und kontrolliere das Ergebnis mit <code>git config --list --show-origin<\/code>. Die Ausgabe zeigt zu jeder Einstellung, aus welcher Datei sie stammt.<\/p><\/div>",
   "code": "git --version\n\ngit config --global user.name  \"Ada Lovelace\"\ngit config --global user.email \"ada@example.com\"\ngit config --global init.defaultBranch main\ngit config --global core.editor \"code --wait\"\ngit config --global pull.rebase false        # pull fuehrt per Merge zusammen\n\n# Nur fuer das Firmenprojekt eine andere Adresse\ncd ~/projekte/firmenshop\ngit config user.email \"ada.lovelace@firma.example\"\n\ngit config --list --show-origin",
   "codeLang": "Bash",
   "tip": "Leg dir zusätzlich einen SSH-Schlüssel für GitHub an (<code>ssh-keygen -t ed25519<\/code>) und hinterlege den öffentlichen Teil im GitHub-Konto. Dann musst du beim Push kein Passwort mehr eingeben, und der private Schlüssel verlässt nie deinen Rechner.",
   "quiz": [
    {
     "q": "Welche Einstellung bestimmt den Namen des ersten Branches in neuen Repositorys?",
     "options": [
      "init.defaultBranch",
      "user.branch",
      "core.branch"
     ],
     "correct": 0,
     "explain": "Üblich ist heute main."
    },
    {
     "q": "Welche Ebene gewinnt, wenn user.email global und lokal gesetzt ist?",
     "options": [
      "Die globale",
      "Die lokale (Repository)",
      "Die zuerst gesetzte"
     ],
     "correct": 1,
     "explain": "Die engere Ebene überschreibt die weitere."
    },
    {
     "q": "Wo sind globale Git-Einstellungen gespeichert?",
     "options": [
      "In der Registry",
      "In .git/config",
      "In ~/.gitconfig"
     ],
     "correct": 2,
     "explain": "Lokale Einstellungen stehen in .git/config des Repositorys."
    }
   ]
  },
  {
   "id": "m61-l3",
   "title": "Die drei Bereiche: Arbeitsverzeichnis, Staging, Repository",
   "minutes": 13,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Arbeitsverzeichnis (Working Directory)<\/dt><dd>Die Dateien, wie du sie gerade im Editor siehst und bearbeitest.<\/dd><dt>Staging-Bereich (Index)<\/dt><dd>Zwischenbereich, in dem du Änderungen für den nächsten Commit vormerkst (git add).<\/dd><dt>untracked<\/dt><dd>Datei, die Git noch nicht kennt und nicht verfolgt.<\/dd><dt>modified / staged<\/dt><dd>Geändert, aber nicht vorgemerkt / vorgemerkt für den nächsten Commit.<\/dd><dt>Diff<\/dt><dd>Gegenüberstellung zweier Stände: welche Zeilen hinzukamen (+) und welche wegfielen (−).<\/dd><\/dl><\/div><p>Das wichtigste Bild für das Verständnis von Git sind drei Bereiche, durch die jede Änderung wandert:<\/p> <table class=\"lesson-table\"><tr><th>Bereich<\/th><th>Was dort liegt<\/th><th>Befehl in den nächsten Bereich<\/th><\/tr> <tr><td><strong>Arbeitsverzeichnis<\/strong><\/td><td>deine Dateien, wie du sie gerade bearbeitest<\/td><td><code>git add<\/code><\/td><\/tr> <tr><td><strong>Staging-Bereich<\/strong> (Index)<\/td><td>vorgemerkte Änderungen für den nächsten Commit<\/td><td><code>git commit<\/code><\/td><\/tr> <tr><td><strong>Repository<\/strong><\/td><td>gespeicherte Commits in <code>.git<\/code><\/td><td>–<\/td><\/tr><\/table> <p>Warum der Zwischenschritt? Weil du selten alles, was du geändert hast, in <em>einen<\/em> Commit packen willst. Mit dem Staging-Bereich stellst du genau die Änderungen zusammen, die thematisch zusammengehören.<\/p> <p><strong>Der Arbeitsablauf in kleinen Schritten:<\/strong><\/p> <ol><li><code>git status<\/code> – Was hat sich geändert? Diesen Befehl tippst du öfter als jeden anderen.<\/li> <li><code>git diff<\/code> – Was genau hat sich geändert (Arbeitsverzeichnis gegenüber Staging)?<\/li> <li><code>git add datei.php<\/code> – Änderung vormerken.<\/li> <li><code>git diff --staged<\/code> – Was kommt in den Commit?<\/li> <li><code>git commit -m \"…\"<\/code> – Schnappschuss speichern.<\/li> <li><code>git log --oneline<\/code> – Geschichte ansehen.<\/li><\/ol> <p>Dateien haben dabei einen Status: <em>untracked<\/em> (Git kennt sie noch nicht), <em>modified<\/em> (geändert, nicht vorgemerkt), <em>staged<\/em> (vorgemerkt) und <em>committed<\/em> (gespeichert).<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Lege ein Übungsrepository an, erstelle zwei Dateien, ändere beide und committe nur eine davon. Prüfe nach jedem Schritt mit <code>git status<\/code>, in welchem Zustand die Dateien sind.<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p><code>git commit -am \"…\"<\/code> fügt alle <em>geänderten<\/em> bekannten Dateien hinzu – aber keine neuen. Eine neu angelegte Datei fehlt dann im Commit, und der Kollege bekommt einen Fehler „Class not found“.<\/p><\/div>",
   "code": "mkdir git-uebung && cd git-uebung\ngit init\n# Initialized empty Git repository in .../git-uebung/.git/\n\necho \"# Mein Shop\" > README.md\ngit status\n# Untracked files:  README.md\n\ngit add README.md\ngit status\n# Changes to be committed:  new file: README.md\n\ngit commit -m \"README anlegen\"\n\necho \"Installation: composer install\" >> README.md\ngit diff                 # zeigt die neue Zeile\ngit add README.md\ngit diff --staged        # zeigt, was in den Commit kommt\ngit commit -m \"Installationshinweis ergaenzen\"\n\ngit log --oneline --graph --all\n# * 3c1d2ab (HEAD -> main) Installationshinweis ergaenzen\n# * 9f0e4a1 README anlegen",
   "codeLang": "Bash",
   "tip": "Gewöhne dir an, vor jedem Commit <code>git diff --staged<\/code> zu lesen. Das dauert zehn Sekunden und fängt vergessene <code>dd()<\/code>-Aufrufe, Debug-Ausgaben und versehentlich mitgenommene Dateien ab, bevor sie im Review oder – schlimmer – in Produktion auffallen.",
   "quiz": [
    {
     "q": "Was macht git add?",
     "options": [
      "Merkt Änderungen für den nächsten Commit im Staging-Bereich vor",
      "Lädt Dateien hoch",
      "Erstellt einen Commit"
     ],
     "correct": 0,
     "explain": "Erst git commit speichert den Schnappschuss."
    },
    {
     "q": "Was zeigt git diff --staged?",
     "options": [
      "Änderungen, die noch nicht vorgemerkt sind",
      "Die vorgemerkten Änderungen, die in den nächsten Commit kommen",
      "Alle Commits"
     ],
     "correct": 1,
     "explain": "git diff ohne Option zeigt dagegen die noch nicht vorgemerkten Änderungen."
    },
    {
     "q": "Welchen Status hat eine neu angelegte Datei, die Git noch nicht kennt?",
     "options": [
      "staged",
      "modified",
      "untracked"
     ],
     "correct": 2,
     "explain": "Erst nach git add wird sie verfolgt."
    }
   ]
  },
  {
   "id": "m61-l4",
   "title": "Gute Commits schreiben",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>atomarer Commit<\/dt><dd>Ein Commit, der genau eine zusammengehörige Änderung enthält und für sich allein sinnvoll ist.<\/dd><dt>Commit-Nachricht<\/dt><dd>Beschreibung des Commits: kurze Zusammenfassung, Leerzeile, dann das Warum.<\/dd><dt>Imperativ<\/dt><dd>Befehlsform („Füge … hinzu“, „Behebe …“) – Konvention für Commit-Zusammenfassungen.<\/dd><dt>Conventional Commits<\/dt><dd>Namenskonvention mit Präfixen wie feat:, fix:, docs:, aus denen sich Changelogs erzeugen lassen.<\/dd><dt>Hunk<\/dt><dd>Ein zusammenhängender Abschnitt eines Diffs; mit git add -p lassen sich Hunks einzeln vormerken.<\/dd><\/dl><\/div><p>Ein Commit ist eine Nachricht an dein zukünftiges Ich und an dein Team. In einem halben Jahr fragt jemand mit <code>git blame<\/code>: „Warum steht diese Zeile hier?“ – und die Commit-Nachricht ist die Antwort.<\/p> <p><strong>Regel 1: Ein Commit, eine Sache.<\/strong> Ein Bugfix und eine Formatierungsänderung gehören in zwei Commits. So lässt sich der Bugfix gezielt prüfen, übernehmen oder zurücknehmen. Mit <code>git add -p<\/code> merkst du sogar nur einzelne Abschnitte einer Datei vor.<\/p> <p><strong>Regel 2: Eine gute Nachricht.<\/strong><\/p> <ul><li>Erste Zeile: kurze Zusammenfassung, höchstens etwa 50 Zeichen, im Imperativ („Füge … hinzu“, „Behebe …“).<\/li> <li>Leerzeile.<\/li> <li>Darunter bei Bedarf das <em>Warum<\/em>: Was war das Problem, warum diese Lösung? Das <em>Was<\/em> zeigt der Diff ohnehin.<\/li><\/ul> <p>Viele Teams nutzen <strong>Conventional Commits<\/strong>, ein festes Präfix für die Art der Änderung. Daraus lassen sich Changelogs und Versionsnummern automatisch erzeugen.<\/p> <table class=\"lesson-table\"><tr><th>Präfix<\/th><th>Bedeutung<\/th><\/tr> <tr><td><code>feat:<\/code><\/td><td>neue Funktion<\/td><\/tr> <tr><td><code>fix:<\/code><\/td><td>Fehlerbehebung<\/td><\/tr> <tr><td><code>docs:<\/code><\/td><td>nur Dokumentation<\/td><\/tr> <tr><td><code>refactor:<\/code><\/td><td>Umbau ohne Verhaltensänderung<\/td><\/tr> <tr><td><code>test:<\/code><\/td><td>Tests ergänzt oder geändert<\/td><\/tr> <tr><td><code>chore:<\/code><\/td><td>Wartung, Abhängigkeiten, Build<\/td><\/tr><\/table>",
   "code": "# schlecht\ngit commit -m \"fix\"\ngit commit -m \"aenderungen\"\ngit commit -m \"WIP stuff + formatting + bestellung bug\"\n\n# gut\ngit commit -m \"fix(bestellung): Lagerbestand bei paralleler Bestellung sperren\n\nZwei gleichzeitige Bestellungen konnten beide den letzten Artikel\nkaufen, weil der Bestand ohne Sperre gelesen wurde. Die Zeile wird\njetzt mit lockForUpdate() innerhalb der Transaktion gelesen.\n\nBehebt #142\"\n\n# nur Teile einer Datei vormerken\ngit add -p app/Actions/BestellungAnlegen.php\n# Stage this hunk [y,n,q,a,d,s,e,?]?  y = ja, n = nein, s = weiter aufteilen",
   "codeLang": "Bash",
   "tip": "Schreib die Nachricht so, dass sie den Satz „Wenn man diesen Commit übernimmt, wird er …“ vervollständigt. „… den Lagerbestand bei paralleler Bestellung sperren“ funktioniert, „… fix“ nicht. Dieser Trick erzeugt automatisch den Imperativ.",
   "quiz": [
    {
     "q": "Was gehört in den ausführlichen Teil einer Commit-Nachricht?",
     "options": [
      "Das Warum: Problem und Begründung der Lösung",
      "Der Name des Rechners",
      "Eine Liste aller geänderten Dateien"
     ],
     "correct": 0,
     "explain": "Was sich geändert hat, zeigt der Diff ohnehin."
    },
    {
     "q": "Was bewirkt git add -p?",
     "options": [
      "Es fügt alle Dateien hinzu",
      "Man kann einzelne Abschnitte einer Datei gezielt vormerken",
      "Es veröffentlicht den Commit"
     ],
     "correct": 1,
     "explain": "So entstehen saubere, thematisch getrennte Commits."
    },
    {
     "q": "Welches Präfix passt nach Conventional Commits zu einem Umbau ohne Verhaltensänderung?",
     "options": [
      "refactor:",
      "fix:",
      "feat:"
     ],
     "correct": 0,
     "explain": "feat für neue Funktionen, fix für Fehlerbehebungen."
    }
   ]
  },
  {
   "id": "m61-l5",
   "title": ".gitignore und was nie ins Repository gehört",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>.gitignore<\/dt><dd>Datei mit Mustern für Dateien, die Git ignorieren soll.<\/dd><dt>Secret<\/dt><dd>Geheimnis wie Passwort, API-Schlüssel oder Token – gehört nie ins Repository.<\/dd><dt>Artefakt<\/dt><dd>Erzeugte Datei (z. B. vendor/, public/build), die sich aus dem Quellcode neu herstellen lässt.<\/dd><dt>Lock-Datei<\/dt><dd>Datei wie composer.lock, die exakte Paketversionen festhält – gehört ins Repository.<\/dd><dt>git rm --cached<\/dt><dd>Nimmt eine Datei aus der Versionskontrolle, lässt sie aber auf der Festplatte liegen.<\/dd><\/dl><\/div><p>Nicht jede Datei gehört in die Versionskontrolle. Die Datei <code>.gitignore<\/code> im Projektstamm listet Muster für Dateien, die Git ignorieren soll.<\/p> <table class=\"lesson-table\"><tr><th>Muster<\/th><th>Bedeutung<\/th><\/tr> <tr><td><code>.env<\/code><\/td><td>genau diese Datei, in jedem Verzeichnis<\/td><\/tr> <tr><td><code>/vendor<\/code><\/td><td>nur das Verzeichnis im Projektstamm<\/td><\/tr> <tr><td><code>*.log<\/code><\/td><td>alle Dateien mit dieser Endung<\/td><\/tr> <tr><td><code>storage/*.key<\/code><\/td><td>Muster innerhalb eines Verzeichnisses<\/td><\/tr> <tr><td><code>!.env.example<\/code><\/td><td>Ausnahme: diese Datei doch aufnehmen<\/td><\/tr><\/table> <p><strong>Gehört nicht ins Repository:<\/strong> Geheimnisse (<code>.env<\/code>, Schlüssel, Zertifikate), erzeugte Dateien (<code>vendor/<\/code>, <code>node_modules/<\/code>, <code>public/build/<\/code>), persönliche Editor-Einstellungen, Logs und Uploads.<\/p> <p><strong>Gehört hinein:<\/strong> <code>composer.json<\/code> <em>und<\/em> <code>composer.lock<\/code>, <code>package-lock.json<\/code>, <code>.env.example<\/code> mit Platzhaltern, Migrationen, Tests, Konfiguration. Laravel-Projekte bringen eine passende <code>.gitignore<\/code> bereits mit.<\/p> <p>Wichtig: <code>.gitignore<\/code> wirkt nur auf Dateien, die Git <em>noch nicht<\/em> verfolgt. Wurde eine Datei schon committet, entfernst du sie mit <code>git rm --cached<\/code> aus dem Repository – auf deiner Festplatte bleibt sie.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Ein API-Schlüssel wurde committet und gepusht? Dann ist er <em>verbrannt<\/em> – auch wenn du ihn im nächsten Commit löschst, steht er in der Geschichte, und automatisierte Scanner durchsuchen öffentliche Repositorys in Minuten. Erster Schritt ist immer: <strong>Schlüssel beim Anbieter widerrufen und neu erzeugen<\/strong>. Die Geschichte umzuschreiben ist zweitrangig.<\/p><\/div>",
   "code": "# .gitignore (Auszug, wie in neuen Laravel-Projekten)\n/vendor\n/node_modules\n/public/build\n/public/hot\n/public/storage\n/storage/*.key\n.env\n.env.backup\n.phpunit.result.cache\n/.idea\n/.vscode\n\n# Versehentlich committete .env aus dem Repository nehmen\ngit rm --cached .env\ngit commit -m \"chore: .env nicht mehr versionieren\"\n# -> danach SOFORT alle Schluessel aus der .env erneuern!\n\n# Pruefen, warum eine Datei ignoriert wird\ngit check-ignore -v storage/logs/laravel.log",
   "codeLang": "Bash",
   "tip": "Verhindere das Problem, bevor es entsteht: Werkzeuge wie <code>gitleaks<\/code> laufen als Pre-Commit-Hook und brechen den Commit ab, wenn sie etwas finden, das nach einem Schlüssel aussieht. GitHub bietet zusätzlich „Push Protection“, die bekannte Schlüsselformate schon beim Push blockiert.",
   "quiz": [
    {
     "q": "Gehört composer.lock ins Repository?",
     "options": [
      "Ja, damit alle Umgebungen dieselben Versionen installieren",
      "Nur in Produktion",
      "Nein, sie wird automatisch erzeugt"
     ],
     "correct": 0,
     "explain": "vendor/ gehört nicht hinein, composer.lock schon."
    },
    {
     "q": "Eine Datei wurde schon committet und soll jetzt ignoriert werden. Was tust du zusätzlich zum Eintrag in .gitignore?",
     "options": [
      "Nichts",
      "git rm --cached datei und committen",
      "Die Datei löschen"
     ],
     "correct": 1,
     "explain": ".gitignore wirkt nur auf noch nicht verfolgte Dateien."
    },
    {
     "q": "Ein Schlüssel wurde in ein öffentliches Repository gepusht. Was ist der wichtigste erste Schritt?",
     "options": [
      "Das Repository privat stellen",
      "Den Commit löschen",
      "Den Schlüssel beim Anbieter widerrufen und neu erzeugen"
     ],
     "correct": 2,
     "explain": "Ein veröffentlichter Schlüssel muss als kompromittiert gelten."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m65",
 "part": 11,
 "partTitle": "Git & Zusammenarbeit",
 "title": "Git · Fachbegriffe, Interna und Fehlermeldungen",
 "lessons": [
  {
   "id": "m65-l1",
   "title": "Git-Glossar Teil 1: vom Repository bis zum Tag",
   "minutes": 14,
   "body": "<p>Wer im Team mitreden will, muss die Begriffe sicher beherrschen. Diese Lektion ist ein Nachschlagewerk – lies sie einmal ganz und komm später zurück, wenn dir ein Begriff unklar ist.<\/p> <table class=\"lesson-table\"><tr><th>Begriff<\/th><th>Bedeutung<\/th><th>Befehl / Beispiel<\/th><\/tr> <tr><td><strong>Repository<\/strong><\/td><td>Projekt plus komplette Geschichte; liegt im Ordner <code>.git<\/code><\/td><td><code>git init<\/code><\/td><\/tr> <tr><td><strong>Arbeitsverzeichnis<\/strong><\/td><td>die Dateien, die du gerade bearbeitest<\/td><td>–<\/td><\/tr> <tr><td><strong>Staging-Bereich / Index<\/strong><\/td><td>Vormerkliste für den nächsten Commit<\/td><td><code>git add datei<\/code><\/td><\/tr> <tr><td><strong>Commit<\/strong><\/td><td>gespeicherter Schnappschuss mit Nachricht und Vorgänger<\/td><td><code>git commit -m \"…\"<\/code><\/td><\/tr> <tr><td><strong>Hash / SHA<\/strong><\/td><td>eindeutige ID eines Commits, aus dem Inhalt berechnet<\/td><td><code>a3f9c2e<\/code><\/td><\/tr> <tr><td><strong>HEAD<\/strong><\/td><td>Zeiger auf das, woran du gerade arbeitest<\/td><td><code>git log -1 HEAD<\/code><\/td><\/tr> <tr><td><strong>Branch<\/strong><\/td><td>beweglicher Zeiger auf einen Commit, eigener Entwicklungszweig<\/td><td><code>git switch -c feature/x<\/code><\/td><\/tr> <tr><td><strong>main / master<\/strong><\/td><td>Haupt-Branch mit dem stabilen Stand<\/td><td>–<\/td><\/tr> <tr><td><strong>Tag<\/strong><\/td><td>fester Name für einen Commit, meist ein Release<\/td><td><code>git tag -a v1.0.0<\/code><\/td><\/tr> <tr><td><strong>Diff<\/strong><\/td><td>Unterschied zwischen zwei Ständen<\/td><td><code>git diff<\/code><\/td><\/tr> <tr><td><strong>Log<\/strong><\/td><td>die Geschichte der Commits<\/td><td><code>git log --oneline<\/code><\/td><\/tr> <tr><td><strong>untracked / tracked<\/strong><\/td><td>von Git nicht verfolgt / verfolgt<\/td><td><code>git status<\/code><\/td><\/tr> <tr><td><strong>.gitignore<\/strong><\/td><td>Liste von Mustern für Dateien, die Git ignoriert<\/td><td><code>.env<\/code>, <code>/vendor<\/code><\/td><\/tr><\/table> <p>Ein Bild hilft beim Merken: Stell dir das Repository als <strong>Fotoalbum<\/strong> vor. Das Arbeitsverzeichnis ist die Szene vor der Kamera, der Staging-Bereich das, was gerade im Sucher ist, und jeder Commit ein eingeklebtes Foto mit Bildunterschrift. Ein Branch ist ein Lesezeichen, das immer auf das neueste Foto seines Kapitels zeigt – und HEAD ist dein Finger, der gerade auf einem Lesezeichen liegt.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Erkläre die fünf Begriffe Repository, Staging-Bereich, Commit, Branch und HEAD jemandem in je einem Satz – ohne Fachbegriffe zu verwenden. Wenn das gelingt, hast du sie verstanden.<\/p><\/div>",
   "code": "Arbeitsverzeichnis      Staging-Bereich        Repository (.git)\n------------------      ---------------        ------------------\nindex.php (geaendert) --git add-->  index.php --git commit-->  Commit 3c1d2ab\nneu.php (untracked)                                             \"Login ergaenzen\"\n                                                                      |\n                                  HEAD -> main ----------------------+",
   "codeLang": "Schaubild",
   "tip": "Im Berufsalltag hörst du die Begriffe meist auf Denglisch: „Hast du schon gepusht?“, „Mach mal einen Rebase auf main“, „Der PR ist approved“. Lass dich davon nicht verunsichern – die Tabelle oben ist dein Übersetzungsbuch. Wer die Begriffe korrekt verwendet, wirkt im Team schnell sicher.",
   "quiz": [
    {
     "q": "Was ist der Staging-Bereich?",
     "options": [
      "Die Vormerkliste für den nächsten Commit",
      "Ein anderer Name für den Branch main",
      "Ein Server für Testversionen"
     ],
     "correct": 0,
     "explain": "Mit git add landet eine Änderung dort, mit git commit wird sie gespeichert."
    },
    {
     "q": "Was ist ein Branch technisch?",
     "options": [
      "Eine Kopie des Projekts",
      "Ein beweglicher Zeiger auf einen Commit",
      "Ein Ordner im Projekt"
     ],
     "correct": 1,
     "explain": "Deshalb kostet ein neuer Branch praktisch nichts."
    },
    {
     "q": "Worauf zeigt HEAD?",
     "options": [
      "Auf den Server",
      "Auf den ersten Commit",
      "Auf den Branch oder Commit, an dem du gerade arbeitest"
     ],
     "correct": 2,
     "explain": "Ein neuer Commit rückt den Branch weiter, auf den HEAD zeigt."
    }
   ]
  },
  {
   "id": "m65-l2",
   "title": "Git-Glossar Teil 2: Zusammenarbeit im Team",
   "minutes": 14,
   "body": "<p>Sobald mehrere Menschen an einem Projekt arbeiten, kommen neue Begriffe dazu. Sie beschreiben, wie Änderungen zwischen Rechnern und Branches wandern.<\/p> <table class=\"lesson-table\"><tr><th>Begriff<\/th><th>Bedeutung<\/th><th>Befehl / Beispiel<\/th><\/tr> <tr><td><strong>Remote<\/strong><\/td><td>entferntes Repository, z. B. auf GitHub<\/td><td><code>git remote -v<\/code><\/td><\/tr> <tr><td><strong>origin<\/strong><\/td><td>Standardname des Remotes nach dem Klonen<\/td><td><code>origin/main<\/code><\/td><\/tr> <tr><td><strong>Clone<\/strong><\/td><td>vollständige Kopie herunterladen<\/td><td><code>git clone url<\/code><\/td><\/tr> <tr><td><strong>Fork<\/strong><\/td><td>eigene Kopie eines fremden Repositorys auf der Plattform<\/td><td>Knopf „Fork“ auf GitHub<\/td><\/tr> <tr><td><strong>Fetch<\/strong><\/td><td>neue Commits holen, ohne Dateien zu ändern<\/td><td><code>git fetch<\/code><\/td><\/tr> <tr><td><strong>Pull<\/strong><\/td><td>holen und in den aktuellen Branch zusammenführen<\/td><td><code>git pull<\/code><\/td><\/tr> <tr><td><strong>Push<\/strong><\/td><td>eigene Commits hochladen<\/td><td><code>git push<\/code><\/td><\/tr> <tr><td><strong>Upstream<\/strong><\/td><td>verknüpfter Remote-Branch<\/td><td><code>git push -u origin x<\/code><\/td><\/tr> <tr><td><strong>Merge<\/strong><\/td><td>Branches zusammenführen<\/td><td><code>git merge feature/x<\/code><\/td><\/tr> <tr><td><strong>Fast-Forward<\/strong><\/td><td>Zusammenführen ohne neuen Commit, nur Zeiger vorschieben<\/td><td>–<\/td><\/tr> <tr><td><strong>Konflikt<\/strong><\/td><td>beide Seiten änderten dieselbe Stelle<\/td><td><code>CONFLICT (content)<\/code><\/td><\/tr> <tr><td><strong>Rebase<\/strong><\/td><td>eigene Commits auf neue Basis setzen<\/td><td><code>git rebase main<\/code><\/td><\/tr> <tr><td><strong>Squash<\/strong><\/td><td>mehrere Commits zu einem zusammenfassen<\/td><td>„Squash and merge“<\/td><\/tr> <tr><td><strong>Cherry-Pick<\/strong><\/td><td>einzelnen Commit übernehmen<\/td><td><code>git cherry-pick a3f9c2e<\/code><\/td><\/tr> <tr><td><strong>Stash<\/strong><\/td><td>Änderungen kurz beiseitelegen<\/td><td><code>git stash -u<\/code><\/td><\/tr> <tr><td><strong>Pull Request<\/strong><\/td><td>Bitte um Review und Übernahme eines Branches<\/td><td>GitHub / GitLab (Merge Request)<\/td><\/tr> <tr><td><strong>Review / Approve<\/strong><\/td><td>Durchsicht / Freigabe durch das Team<\/td><td>–<\/td><\/tr> <tr><td><strong>Force-Push<\/strong><\/td><td>Remote-Branch überschreiben<\/td><td><code>git push --force-with-lease<\/code><\/td><\/tr><\/table> <p>Der häufigste Denkfehler bei Anfängern: <strong>Commit und Push verwechseln.<\/strong> Ein Commit speichert nur auf deinem Rechner. Erst der Push macht deine Arbeit für das Team sichtbar – und sichert sie gegen einen Festplattendefekt.<\/p> <p>Ebenso oft verwechselt: <strong>Fork und Branch.<\/strong> Ein Branch lebt im selben Repository. Ein Fork ist eine eigene Kopie des ganzen Repositorys unter deinem Konto – üblich, wenn du an fremden Open-Source-Projekten mitarbeitest, ohne Schreibrechte zu haben.<\/p>",
   "code": "Dein Rechner                                GitHub (origin)\n------------                                ---------------\nmain  A--B--C        <-- git fetch --       main  A--B--C--D\n                     <-- git pull  --       (holen + zusammenfuehren)\nfeature  C--E--F     --  git push  -->      feature  C--E--F\n                                            Pull Request: feature -> main",
   "codeLang": "Schaubild",
   "tip": "„Pull“ (holen) und „Pull Request“ (Bitte um Übernahme) klingen ähnlich, bedeuten aber fast das Gegenteil: Beim Pull holst du dir fremde Änderungen, beim Pull Request bittest du andere, deine zu übernehmen. Der Name kommt daher, dass die anderen deine Änderungen in den Haupt-Branch „ziehen“ sollen.",
   "quiz": [
    {
     "q": "Was ist der Unterschied zwischen Commit und Push?",
     "options": [
      "Commit speichert lokal, Push lädt die Commits zum Remote hoch",
      "Push speichert lokal, Commit lädt hoch",
      "Kein Unterschied"
     ],
     "correct": 0,
     "explain": "Ohne Push sieht niemand im Team deine Commits."
    },
    {
     "q": "Was ist ein Fork?",
     "options": [
      "Ein Branch im selben Repository",
      "Eine eigene Kopie eines fremden Repositorys unter deinem Konto",
      "Ein Merge-Konflikt"
     ],
     "correct": 1,
     "explain": "Forks sind typisch für Beiträge zu Open-Source-Projekten."
    },
    {
     "q": "Was macht git fetch?",
     "options": [
      "Lädt deine Commits hoch",
      "Holt neue Commits vom Remote, ohne deine Dateien zu ändern",
      "Löscht den Remote"
     ],
     "correct": 1,
     "explain": "git pull holt zusätzlich und führt in den aktuellen Branch zusammen."
    }
   ]
  },
  {
   "id": "m65-l3",
   "title": "Programmier-Fachbegriffe, die man im Team ständig hört",
   "minutes": 15,
   "body": "<p>Neben Git gibt es Begriffe, die in jedem Entwicklerteam fallen – in Meetings, Tickets und Code-Reviews. Viele davon kommen auch in der Abschlussprüfung und im Fachgespräch vor.<\/p> <table class=\"lesson-table\"><tr><th>Begriff<\/th><th>Bedeutung<\/th><\/tr> <tr><td><strong>Quellcode<\/strong><\/td><td>der von Menschen geschriebene Programmtext<\/td><\/tr> <tr><td><strong>Compiler / Interpreter<\/strong><\/td><td>übersetzt Quellcode vor der Ausführung komplett (Java, C) / führt ihn zur Laufzeit Schritt für Schritt aus (PHP, Python)<\/td><\/tr> <tr><td><strong>Laufzeit (Runtime)<\/strong><\/td><td>der Moment, in dem das Programm tatsächlich läuft – ein Laufzeitfehler tritt erst dann auf<\/td><\/tr> <tr><td><strong>Bibliothek / Framework<\/strong><\/td><td>wiederverwendbarer Code, den du aufrufst / Gerüst, das deinen Code aufruft („Don’t call us, we call you“)<\/td><\/tr> <tr><td><strong>Abhängigkeit (Dependency)<\/strong><\/td><td>fremdes Paket, das dein Projekt braucht<\/td><\/tr> <tr><td><strong>Paketmanager<\/strong><\/td><td>installiert und aktualisiert Abhängigkeiten: Composer (PHP), npm (JavaScript)<\/td><\/tr> <tr><td><strong>API<\/strong><\/td><td>definierte Schnittstelle, über die Programme miteinander sprechen<\/td><\/tr> <tr><td><strong>Endpunkt<\/strong><\/td><td>eine konkrete Adresse einer Web-API, z. B. <code>GET /api/v1/produkte<\/code><\/td><\/tr> <tr><td><strong>Bug / Debugging<\/strong><\/td><td>Fehler im Programm / systematisches Suchen und Beheben<\/td><\/tr> <tr><td><strong>Refactoring<\/strong><\/td><td>Code umbauen, ohne das Verhalten zu ändern – für bessere Lesbarkeit und Wartbarkeit<\/td><\/tr> <tr><td><strong>Technische Schulden<\/strong><\/td><td>schnelle, unsaubere Lösungen, die später Mehraufwand verursachen<\/td><\/tr> <tr><td><strong>Legacy-Code<\/strong><\/td><td>alter, oft schlecht getesteter Code, den man weiterpflegen muss<\/td><\/tr> <tr><td><strong>Breaking Change<\/strong><\/td><td>Änderung, die Nutzer zwingt, ihren Code anzupassen<\/td><\/tr> <tr><td><strong>Deprecated<\/strong><\/td><td>veraltet: funktioniert noch, wird aber in einer künftigen Version entfernt<\/td><\/tr> <tr><td><strong>Unit- / Integrations- / E2E-Test<\/strong><\/td><td>prüft eine einzelne Einheit / das Zusammenspiel mehrerer Teile / die ganze Anwendung aus Nutzersicht<\/td><\/tr> <tr><td><strong>CI / CD<\/strong><\/td><td>automatisch testen bei jedem Push / automatisch ausliefern<\/td><\/tr> <tr><td><strong>Deployment<\/strong><\/td><td>eine Version auf einen Server bringen<\/td><\/tr> <tr><td><strong>Umgebungen<\/strong><\/td><td>local (dein Rechner), staging (Testserver), production (live für Kunden)<\/td><\/tr> <tr><td><strong>Umgebungsvariable<\/strong><\/td><td>Konfigurationswert außerhalb des Codes, z. B. in der <code>.env<\/code><\/td><\/tr> <tr><td><strong>Linter / Formatter<\/strong><\/td><td>findet verdächtige Muster / bringt Code in einheitliche Form (z. B. Pint)<\/td><\/tr> <tr><td><strong>Edge Case<\/strong><\/td><td>Grenz- oder Sonderfall: leere Liste, 0, sehr lange Eingabe, 29. Februar<\/td><\/tr> <tr><td><strong>Race Condition<\/strong><\/td><td>Fehler, der von der zufälligen Reihenfolge gleichzeitiger Abläufe abhängt<\/td><\/tr> <tr><td><strong>Idempotent<\/strong><\/td><td>mehrfach ausgeführt mit demselben Ergebnis wie einmal<\/td><\/tr> <tr><td><strong>Boilerplate<\/strong><\/td><td>immer gleicher Standardcode ohne eigene Logik<\/td><\/tr> <tr><td><strong>MVP<\/strong><\/td><td>Minimum Viable Product: kleinste Version, die schon echten Nutzen bringt<\/td><\/tr><\/table> <p>Drei Leitsätze tauchen in Code-Reviews ständig auf: <strong>DRY<\/strong> („Don’t Repeat Yourself“ – Wissen nur an einer Stelle), <strong>KISS<\/strong> („Keep It Simple, Stupid“ – die einfachste funktionierende Lösung) und <strong>YAGNI<\/strong> („You Aren’t Gonna Need It“ – nichts bauen, was noch niemand braucht).<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Nimm dir drei Begriffe aus der Tabelle, die du noch nicht sicher kanntest, und finde für jeden ein Beispiel aus dem Kurs. Etwa: Idempotent → der Rechnungs-Job, der eine vorhandene Rechnung nicht doppelt erzeugt.<\/p><\/div>",
   "code": "Typischer Satz im Daily Stand-up - und was er bedeutet:\n\n\"Ich habe gestern den Checkout refactored, die Tests sind gruen,\n der PR ist approved. Heute deploye ich auf Staging. Achtung:\n Die alte Preis-API ist deprecated, ab v3 ist das ein Breaking Change.\"\n\nrefactored  -> Code umgebaut, Verhalten unveraendert\ngruen       -> alle automatischen Tests bestanden\napproved    -> im Code-Review freigegeben\ndeploye     -> auf einen Server ausliefern\nStaging     -> Testumgebung, die der Produktion gleicht\ndeprecated  -> veraltet, wird spaeter entfernt\nBreaking    -> wer die alte API nutzt, muss seinen Code anpassen",
   "codeLang": "Glossar im Alltag",
   "tip": "Im IHK-Fachgespräch fragen Prüfer gern nach einem Begriff, der in deiner Projektdokumentation steht – „Was meinen Sie hier mit Refactoring?“. Kannst du ihn in einem Satz erklären und ein Beispiel aus deinem Projekt nennen, ist das ein sicherer Punkt.",
   "quiz": [
    {
     "q": "Was ist Refactoring?",
     "options": [
      "Code umbauen, ohne sein Verhalten zu ändern",
      "Fehler im Code suchen",
      "Neue Funktionen hinzufügen"
     ],
     "correct": 0,
     "explain": "Ziel ist bessere Lesbarkeit und Wartbarkeit – die Tests bleiben dabei grün."
    },
    {
     "q": "Was bedeutet „deprecated“?",
     "options": [
      "Die Funktion ist bereits entfernt",
      "Die Funktion funktioniert noch, wird aber künftig entfernt",
      "Die Funktion ist besonders schnell"
     ],
     "correct": 1,
     "explain": "Man sollte dann auf die empfohlene Alternative umsteigen."
    },
    {
     "q": "Was unterscheidet eine Bibliothek von einem Framework?",
     "options": [
      "Frameworks sind immer kleiner",
      "Nichts",
      "Eine Bibliothek ruft man selbst auf, ein Framework ruft deinen Code auf"
     ],
     "correct": 2,
     "explain": "Laravel ist ein Framework: Es entscheidet, wann dein Controller aufgerufen wird."
    }
   ]
  },
  {
   "id": "m65-l4",
   "title": "Wie Git intern funktioniert: Objekte, Hashes, Referenzen",
   "minutes": 13,
   "body": "<p>Viele Git-Befehle wirken magisch, bis man sieht, was im Ordner <code>.git<\/code> passiert. Im Kern ist Git eine kleine Datenbank aus nur <strong>drei Objekttypen<\/strong> und ein paar Zeigern:<\/p> <table class=\"lesson-table\"><tr><th>Objekt<\/th><th>Speichert<\/th><\/tr> <tr><td><strong>Blob<\/strong><\/td><td>den Inhalt einer Datei (ohne Namen)<\/td><\/tr> <tr><td><strong>Tree<\/strong><\/td><td>ein Verzeichnis: Dateinamen mit Verweisen auf Blobs und weitere Trees<\/td><\/tr> <tr><td><strong>Commit<\/strong><\/td><td>Verweis auf einen Tree (den Projektstand), Vorgänger-Commit(s), Autor, Datum, Nachricht<\/td><\/tr><\/table> <p>Jedes Objekt wird unter dem <strong>Hash seines Inhalts<\/strong> abgelegt. Zwei identische Dateien ergeben denselben Hash und werden nur einmal gespeichert. Deshalb ist ein Commit kein riesiger Kopiervorgang, obwohl er logisch einen vollständigen Schnappschuss darstellt: Unveränderte Dateien zeigen einfach auf denselben Blob wie vorher.<\/p> <p><strong>Referenzen<\/strong> (Refs) sind lesbare Namen für Hashes: Ein Branch ist eine winzige Datei in <code>.git/refs/heads/<\/code>, in der nur ein Commit-Hash steht. <code>HEAD<\/code> ist eine Datei, die meist auf einen Branch verweist (<code>ref: refs/heads/main<\/code>). Zeigt HEAD stattdessen direkt auf einen Commit, bist du im Zustand <strong>„detached HEAD“<\/strong>.<\/p> <p>Weil der Hash eines Commits auch die Hashes seiner Vorgänger enthält, verändert jede Änderung in der Vergangenheit alle nachfolgenden Hashes. Das macht die Geschichte <strong>manipulationssicher<\/strong> – und erklärt, warum Rebase und Amend neue Commits erzeugen.<\/p>",
   "code": "# Ein Blick ins Innere (nur lesend, nichts kaputtzumachen)\ncat .git/HEAD\n# ref: refs/heads/main\n\ncat .git/refs/heads/main\n# 3c1d2ab7f0e94c1b2d8a5e6f7a8b9c0d1e2f3a4b\n\ngit cat-file -t 3c1d2ab          # Typ des Objekts\n# commit\n\ngit cat-file -p 3c1d2ab          # Inhalt des Commit-Objekts\n# tree 9f8e7d6c...\n# parent 1a2b3c4d...\n# author Ada Lovelace <ada@example.com> 1760083200 +0200\n# committer Ada Lovelace <ada@example.com> 1760083200 +0200\n#\n# Login ergaenzen\n\ngit cat-file -p 9f8e7d6c         # der Tree: Dateien und Unterordner\n# 100644 blob 5d41402a...    README.md\n# 040000 tree 7c4a8d09...    app",
   "codeLang": "Bash",
   "tip": "Diese Befehle brauchst du im Alltag selten. Aber wer einmal gesehen hat, dass ein Branch nur eine Datei mit einem Hash ist, verliert die Angst vor Branches – und versteht sofort, warum „Branch löschen“ keine Commits löscht, sondern nur das Lesezeichen.",
   "quiz": [
    {
     "q": "Was speichert ein Blob-Objekt?",
     "options": [
      "Den Inhalt einer Datei",
      "Eine Commit-Nachricht",
      "Den Dateinamen"
     ],
     "correct": 0,
     "explain": "Namen und Struktur stehen im Tree-Objekt."
    },
    {
     "q": "Was steht in der Datei .git/refs/heads/main?",
     "options": [
      "Der komplette Code",
      "Der Hash des Commits, auf den main zeigt",
      "Alle Commit-Nachrichten"
     ],
     "correct": 1,
     "explain": "Ein Branch ist nur ein Zeiger – deshalb sind Branches so billig."
    },
    {
     "q": "Was bedeutet „detached HEAD“?",
     "options": [
      "Der Remote ist nicht erreichbar",
      "Das Repository ist beschädigt",
      "HEAD zeigt direkt auf einen Commit statt auf einen Branch"
     ],
     "correct": 2,
     "explain": "Neue Commits gehören dann zu keinem Branch – vor dem Weiterarbeiten einen Branch anlegen oder zurückwechseln."
    }
   ]
  },
  {
   "id": "m65-l5",
   "title": "Git-Meldungen verstehen: was Git dir sagen will",
   "minutes": 14,
   "body": "<p>Git meldet sich auf Englisch und oft knapp. Hinter den Meldungen steckt aber fast immer ein klarer Hinweis, was zu tun ist. Hier die häufigsten, übersetzt und mit Lösung:<\/p> <table class=\"lesson-table\"><tr><th>Meldung<\/th><th>Bedeutung<\/th><th>Lösung<\/th><\/tr> <tr><td><code>fatal: not a git repository<\/code><\/td><td>Du bist in keinem Git-Projektordner<\/td><td><code>cd<\/code> in den Projektordner oder <code>git init<\/code><\/td><\/tr> <tr><td><code>Your branch is ahead of 'origin/main' by 2 commits<\/code><\/td><td>2 lokale Commits sind noch nicht gepusht<\/td><td><code>git push<\/code><\/td><\/tr> <tr><td><code>Your branch is behind … and can be fast-forwarded<\/code><\/td><td>Auf dem Server gibt es neuere Commits<\/td><td><code>git pull<\/code><\/td><\/tr> <tr><td><code>have diverged<\/code><\/td><td>Beide Seiten haben neue Commits<\/td><td><code>git pull<\/code> (Merge) oder <code>git pull --rebase<\/code><\/td><\/tr> <tr><td><code>rejected … (non-fast-forward)<\/code><\/td><td>Push abgelehnt, jemand hat inzwischen gepusht<\/td><td>erst <code>git pull<\/code>, dann <code>git push<\/code><\/td><\/tr> <tr><td><code>CONFLICT (content): Merge conflict in …<\/code><\/td><td>Beide Seiten änderten dieselbe Stelle<\/td><td>Datei bereinigen, <code>git add<\/code>, <code>git commit<\/code><\/td><\/tr> <tr><td><code>Please commit your changes or stash them before you switch branches<\/code><\/td><td>Ungesicherte Änderungen würden überschrieben<\/td><td>committen oder <code>git stash<\/code><\/td><\/tr> <tr><td><code>untracked working tree files would be overwritten<\/code><\/td><td>Eine neue, nicht verfolgte Datei steht im Weg<\/td><td>Datei verschieben oder <code>git stash -u<\/code><\/td><\/tr> <tr><td><code>You are in 'detached HEAD' state<\/code><\/td><td>HEAD zeigt auf einen Commit, nicht auf einen Branch<\/td><td><code>git switch main<\/code> oder <code>git switch -c neuer-branch<\/code><\/td><\/tr> <tr><td><code>nothing to commit, working tree clean<\/code><\/td><td>Keine Änderungen – alles gespeichert<\/td><td>nichts zu tun<\/td><\/tr> <tr><td><code>Permission denied (publickey)<\/code><\/td><td>GitHub erkennt deinen SSH-Schlüssel nicht<\/td><td>SSH-Schlüssel anlegen und bei GitHub hinterlegen<\/td><\/tr><\/table> <p>Lies Meldungen immer <strong>bis zum Ende<\/strong>. Git schreibt sehr oft schon den passenden Befehl dazu – etwa <code>(use \"git push\" to publish your local commits)<\/code> oder <code>(use \"git restore --staged &lt;file&gt;...\" to unstage)<\/code>.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Die schnellste Fehlerquelle: Meldungen ungelesen wegklicken und dann „irgendwas mit --force“ probieren. Eine Minute Lesen spart hier regelmäßig eine Stunde Aufräumen.<\/p><\/div>",
   "code": "$ git status\nOn branch main\nYour branch is ahead of 'origin/main' by 2 commits.\n  (use \"git push\" to publish your local commits)\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n        modified:   app/Services/Versand.php\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n        tests/VersandTest.php\n\n# Uebersetzt:\n#  - 2 Commits sind lokal, aber noch nicht auf dem Server -> git push\n#  - Versand.php ist geaendert, aber nicht vorgemerkt     -> git add\n#  - VersandTest.php ist neu und Git kennt sie noch nicht  -> git add",
   "codeLang": "Bash",
   "tip": "Stell dein Terminal nicht auf Deutsch um, um Git-Meldungen zu „verstehen“. Die englischen Meldungen sind das, was du in jeder Anleitung, jedem Forum und jeder Suchmaschine findest. Kopiere die Meldung wörtlich in die Suche – zu fast jeder gibt es eine gute Erklärung.",
   "quiz": [
    {
     "q": "Was bedeutet „Your branch is ahead of origin/main by 2 commits“?",
     "options": [
      "Du hast 2 lokale Commits, die noch nicht gepusht sind",
      "Es gibt 2 Konflikte",
      "Auf dem Server gibt es 2 neue Commits"
     ],
     "correct": 0,
     "explain": "Die Lösung ist git push."
    },
    {
     "q": "Was tust du bei „rejected (non-fast-forward)“ beim Push?",
     "options": [
      "git push --force",
      "Erst git pull, dann erneut git push",
      "Das Repository neu klonen"
     ],
     "correct": 1,
     "explain": "Jemand anderes hat inzwischen gepusht – erst holen, dann pushen."
    },
    {
     "q": "Was bedeutet „nothing to commit, working tree clean“?",
     "options": [
      "Git ist abgestürzt",
      "Das Repository ist leer",
      "Es gibt keine ungespeicherten Änderungen"
     ],
     "correct": 2,
     "explain": "Alles ist committet – ein guter Zustand."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m62",
 "part": 11,
 "partTitle": "Git & Zusammenarbeit",
 "title": "Git · Branches, Merge und Rebase",
 "lessons": [
  {
   "id": "m62-l1",
   "title": "Branches verstehen",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Branch<\/dt><dd>Ein beweglicher Zeiger auf einen Commit; ein eigener Entwicklungszweig für eine Aufgabe.<\/dd><dt>HEAD<\/dt><dd>Zeiger auf den Branch bzw. Commit, an dem du gerade arbeitest.<\/dd><dt>main<\/dt><dd>Haupt-Branch mit dem stabilen, auslieferbaren Stand (früher oft master).<\/dd><dt>Feature-Branch<\/dt><dd>Branch für genau eine neue Funktion oder einen Fix, z. B. feature/142-warenkorb.<\/dd><dt>switch<\/dt><dd>Befehl zum Wechseln (und mit -c Anlegen) von Branches; Nachfolger von checkout für diesen Zweck.<\/dd><\/dl><\/div><p>Ein <strong>Branch<\/strong> ist in Git nur ein beweglicher Zeiger auf einen Commit – eine winzige Datei mit einem Hash. Deshalb sind Branches in Git billig und schnell: Lege für jede Aufgabe einen an.<\/p> <ul><li><code>HEAD<\/code> zeigt auf den Branch, auf dem du gerade arbeitest. Ein neuer Commit rückt diesen Branch weiter.<\/li> <li><code>git switch -c feature/warenkorb<\/code> legt einen Branch an und wechselt hinein.<\/li> <li><code>git switch main<\/code> wechselt zurück. Git tauscht dabei die Dateien im Arbeitsverzeichnis aus.<\/li> <li><code>git branch<\/code> listet lokale Branches, <code>git branch -d name<\/code> löscht einen zusammengeführten Branch.<\/li><\/ul> <p>Der übliche Arbeitsablauf: <code>main<\/code> enthält immer lauffähigen Code. Jede neue Funktion und jeder Bugfix entsteht in einem eigenen Branch und wird erst nach Review zurückgeführt.<\/p> <p>Branch-Namen folgen meist einem Schema: <code>feature/…<\/code>, <code>fix/…<\/code>, <code>chore/…<\/code>, gern mit Ticketnummer: <code>feature/142-warenkorb<\/code>.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Wechselst du mit ungespeicherten Änderungen den Branch, nimmt Git sie mit – oder verweigert den Wechsel, wenn sie mit dem Ziel-Branch kollidieren. Committe vorher oder lege die Änderungen mit <code>git stash<\/code> beiseite.<\/p><\/div>",
   "code": "git switch -c feature/142-warenkorb     # anlegen + wechseln\n# ... arbeiten, committen ...\ngit commit -am \"feat(warenkorb): Mengen aendern\"\n\ngit switch main                         # zurueck - Dateien sind wieder im main-Zustand\ngit branch\n#   feature/142-warenkorb\n# * main\n\ngit log --oneline --graph --all\n# * 7d2e1f0 (feature/142-warenkorb) feat(warenkorb): Mengen aendern\n# * 3c1d2ab (HEAD -> main) Installationshinweis ergaenzen\n\n# aelter, aber verbreitet: git checkout -b feature/x",
   "codeLang": "Bash",
   "tip": "<code>git switch<\/code> und <code>git restore<\/code> gibt es seit Git 2.23. Vorher erledigte <code>git checkout<\/code> beides – Branches wechseln und Dateien zurücksetzen –, was regelmäßig zu Verwechslungen führte. In Anleitungen siehst du noch oft <code>checkout<\/code>; nutze selbst die neuen, eindeutigen Befehle.",
   "quiz": [
    {
     "q": "Was ist ein Branch technisch gesehen?",
     "options": [
      "Ein beweglicher Zeiger auf einen Commit",
      "Ein eigenes Repository",
      "Eine Kopie aller Dateien"
     ],
     "correct": 0,
     "explain": "Deshalb kostet ein neuer Branch fast nichts."
    },
    {
     "q": "Mit welchem Befehl legst du einen Branch an und wechselst hinein?",
     "options": [
      "git branch -n name",
      "git switch -c name",
      "git commit -b name"
     ],
     "correct": 1,
     "explain": "Die ältere Schreibweise ist git checkout -b name."
    },
    {
     "q": "Worauf zeigt HEAD?",
     "options": [
      "Auf den Remote-Server",
      "Auf den ersten Commit",
      "Auf den Branch bzw. Commit, an dem du gerade arbeitest"
     ],
     "correct": 2,
     "explain": "Ein neuer Commit rückt den Branch weiter, auf den HEAD zeigt."
    }
   ]
  },
  {
   "id": "m62-l2",
   "title": "Zusammenführen mit merge",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Merge<\/dt><dd>Zusammenführen der Änderungen eines Branches in einen anderen.<\/dd><dt>Fast-Forward<\/dt><dd>Sonderfall: Der Ziel-Branch hat sich nicht bewegt, Git schiebt nur den Zeiger vor – kein neuer Commit.<\/dd><dt>Drei-Wege-Merge<\/dt><dd>Zusammenführung anhand beider Branch-Spitzen und ihres gemeinsamen Vorfahren.<\/dd><dt>Merge-Commit<\/dt><dd>Commit mit zwei Vorgängern, der eine Zusammenführung dokumentiert.<\/dd><dt>gemeinsamer Vorfahre (Merge-Base)<\/dt><dd>Letzter Commit, den beide Branches gemeinsam haben.<\/dd><\/dl><\/div><p>Ist eine Funktion fertig, führst du ihren Branch mit <code>git merge<\/code> in <code>main<\/code> zurück. Git kennt dabei zwei Fälle:<\/p> <table class=\"lesson-table\"><tr><th>Fall<\/th><th>Situation<\/th><th>Ergebnis<\/th><\/tr> <tr><td><strong>Fast-Forward<\/strong><\/td><td><code>main<\/code> hat sich seit dem Abzweigen nicht bewegt<\/td><td>Git schiebt den Zeiger von <code>main<\/code> einfach vor – kein neuer Commit<\/td><\/tr> <tr><td><strong>Drei-Wege-Merge<\/strong><\/td><td>Auf beiden Branches gibt es neue Commits<\/td><td>Git erzeugt einen Merge-Commit mit zwei Vorgängern<\/td><\/tr><\/table> <p>„Drei Wege“, weil Git drei Stände vergleicht: die beiden Branch-Spitzen und ihren gemeinsamen Vorfahren. Änderungen an unterschiedlichen Stellen fügt Git automatisch zusammen. Nur wenn beide Seiten dieselbe Stelle geändert haben, entsteht ein Konflikt.<\/p> <p>Mit <code>git merge --no-ff<\/code> erzwingst du einen Merge-Commit auch dann, wenn ein Fast-Forward möglich wäre. Viele Teams mögen das, weil die Geschichte dann zeigt, welche Commits gemeinsam als Funktion hineinkamen.<\/p>",
   "code": "git switch main\ngit merge feature/142-warenkorb\n# Updating 3c1d2ab..7d2e1f0\n# Fast-forward\n\n# Mit Merge-Commit (auch wenn Fast-Forward moeglich waere)\ngit merge --no-ff feature/143-gutschein -m \"Merge feature/143-gutschein\"\n\ngit log --oneline --graph\n# *   b81c0e2 (HEAD -> main) Merge feature/143-gutschein\n# |\\\n# | * 51aa3d9 feat(gutschein): Rabatt berechnen\n# |/\n# * 7d2e1f0 feat(warenkorb): Mengen aendern\n\ngit branch -d feature/142-warenkorb     # aufraeumen",
   "codeLang": "Bash",
   "tip": "Merge nie einen Branch, den du nicht vorher selbst getestet hast – auch nicht „nur schnell“. Wenn das Team über Pull Requests arbeitet, übernimmt die Plattform den Merge. Lokal führst du dann meist nur <code>main<\/code> in deinen Feature-Branch, um auf dem neuesten Stand zu bleiben.",
   "quiz": [
    {
     "q": "Wann ist ein Fast-Forward möglich?",
     "options": [
      "Wenn der Ziel-Branch sich seit dem Abzweigen nicht bewegt hat",
      "Nur bei Konflikten",
      "Immer"
     ],
     "correct": 0,
     "explain": "Dann muss Git nur den Zeiger vorschieben."
    },
    {
     "q": "Welche drei Stände vergleicht ein Drei-Wege-Merge?",
     "options": [
      "Drei beliebige Commits",
      "Die beiden Branch-Spitzen und ihren gemeinsamen Vorfahren",
      "Lokal, Remote und Staging"
     ],
     "correct": 1,
     "explain": "Am gemeinsamen Vorfahren erkennt Git, wer was geändert hat."
    },
    {
     "q": "Was bewirkt git merge --no-ff?",
     "options": [
      "Es löscht den Branch",
      "Es verhindert Konflikte",
      "Es erzeugt immer einen Merge-Commit"
     ],
     "correct": 2,
     "explain": "So bleibt in der Geschichte sichtbar, welche Commits zusammen hineinkamen."
    }
   ]
  },
  {
   "id": "m62-l3",
   "title": "Konflikte lösen ohne Panik",
   "minutes": 13,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Merge-Konflikt<\/dt><dd>Beide Seiten haben dieselbe Stelle geändert; Git kann nicht entscheiden und fragt dich.<\/dd><dt>Konfliktmarker<\/dt><dd>Die Zeilen &lt;&lt;&lt;&lt;&lt;&lt;&lt;, ======= und &gt;&gt;&gt;&gt;&gt;&gt;&gt;, die die beiden Versionen in der Datei markieren.<\/dd><dt>ours / theirs<\/dt><dd>Die eigene Seite (aktueller Branch) bzw. die hineingeführte Seite.<\/dd><dt>--abort<\/dt><dd>Option, die einen laufenden Merge oder Rebase abbricht und den Zustand vorher wiederherstellt.<\/dd><\/dl><\/div><p>Ein <strong>Merge-Konflikt<\/strong> ist kein Fehler, sondern eine Frage von Git an dich: „Beide Seiten haben dieselbe Stelle geändert – welche Version soll gelten?“ Git hält an und markiert die Stelle in der Datei:<\/p> <table class=\"lesson-table\"><tr><th>Markierung<\/th><th>Bedeutung<\/th><\/tr> <tr><td><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<\/code><\/td><td>Beginn deiner Version (aktueller Branch)<\/td><\/tr> <tr><td><code>=======<\/code><\/td><td>Trennlinie<\/td><\/tr> <tr><td><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/x<\/code><\/td><td>Ende der Version aus dem anderen Branch<\/td><\/tr><\/table> <p><strong>Konflikt lösen in fünf Schritten:<\/strong><\/p> <ol><li><code>git status<\/code> zeigt alle Dateien mit Konflikten („both modified“).<\/li> <li>Datei öffnen, beide Versionen lesen und <em>verstehen<\/em>, was jede Seite wollte.<\/li> <li>Den gewünschten Endzustand herstellen – oft eine Kombination beider – und alle Markierungen entfernen.<\/li> <li><code>git add datei<\/code> markiert den Konflikt als gelöst.<\/li> <li><code>git commit<\/code> schließt den Merge ab. Danach Tests laufen lassen!<\/li><\/ol> <p>Wird es unübersichtlich, bricht <code>git merge --abort<\/code> den Merge ab und stellt den Zustand vorher wieder her. IDEs wie PhpStorm und VS Code bieten eine Drei-Spalten-Ansicht, die das Lösen deutlich erleichtert.<\/p> <p>Die beste Konfliktvermeidung: kleine Branches, die nicht wochenlang leben, und regelmäßig <code>main<\/code> in den eigenen Branch holen.<\/p>",
   "code": "git merge feature/versand\n# CONFLICT (content): Merge conflict in app/Services/Versand.php\n# Automatic merge failed; fix conflicts and then commit the result.\n\n# --- app/Services/Versand.php ---\npublic function kostenfreiAb(): int\n{\n<<<<<<< HEAD\n    return 5000;          // main: ab 50 EUR versandkostenfrei\n=======\n    return config('shop.versandfrei_ab_cent');   // feature: konfigurierbar\n>>>>>>> feature/versand\n}\n\n# Loesung: Konfigurierbar UND sinnvoller Standardwert\npublic function kostenfreiAb(): int\n{\n    return config('shop.versandfrei_ab_cent', 5000);\n}\n\ngit add app/Services/Versand.php\ngit commit                      # Nachricht ist vorbefuellt\nphp artisan test                # Konfliktloesung immer testen",
   "codeLang": "Bash",
   "tip": "Die gefährlichsten Konflikte sind die, die Git nicht meldet: Beide Seiten ändern verschiedene Zeilen, die zusammen nicht funktionieren – etwa eine Methode umbenannt, während der andere Branch einen neuen Aufruf ergänzt. Deshalb laufen nach jedem Merge die Tests, nicht nur nach Merges mit Konflikt.",
   "quiz": [
    {
     "q": "Was bedeutet der Abschnitt zwischen <<<<<<< HEAD und =======?",
     "options": [
      "Die Version des aktuellen Branches",
      "Der gemeinsame Vorfahre",
      "Die Version aus dem anderen Branch"
     ],
     "correct": 0,
     "explain": "Nach ======= folgt die Version aus dem Branch, der hineingeführt wird."
    },
    {
     "q": "Wie markierst du einen Konflikt als gelöst?",
     "options": [
      "git resolve datei",
      "git add datei",
      "git push"
     ],
     "correct": 1,
     "explain": "Danach schließt git commit den Merge ab."
    },
    {
     "q": "Wie brichst du einen Merge mit Konflikten komplett ab?",
     "options": [
      "git branch -D",
      "git merge --abort",
      "git reset --hard"
     ],
     "correct": 1,
     "explain": "Der Zustand vor dem Merge wird wiederhergestellt."
    }
   ]
  },
  {
   "id": "m62-l4",
   "title": "Rebase: Geschichte geradeziehen",
   "minutes": 13,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Rebase<\/dt><dd>Eigene Commits werden neu auf eine andere Basis gesetzt; die Geschichte wird zu einer geraden Linie umgeschrieben.<\/dd><dt>Geschichte umschreiben<\/dt><dd>Commits werden ersetzt und bekommen neue Hashes – gefährlich, wenn andere die alten schon haben.<\/dd><dt>interaktiver Rebase<\/dt><dd>git rebase -i: Commits zusammenfassen (squash), umbenennen (reword), umsortieren oder verwerfen (drop).<\/dd><dt>Squash<\/dt><dd>Mehrere Commits zu einem zusammenfassen.<\/dd><dt>Force-Push<\/dt><dd>Überschreiben des Remote-Branches; sicher nur mit --force-with-lease und nur auf eigenen Branches.<\/dd><\/dl><\/div><p><code>git rebase<\/code> ist die zweite Art, Änderungen zusammenzuführen. Statt eines Merge-Commits <strong>setzt Rebase deine Commits neu auf<\/strong> die Spitze des anderen Branches. Das Ergebnis ist eine gerade Linie ohne Verzweigungen.<\/p> <table class=\"lesson-table\"><tr><th><\/th><th>merge<\/th><th>rebase<\/th><\/tr> <tr><td>Geschichte<\/td><td>bleibt, wie sie war, plus Merge-Commit<\/td><td>wird umgeschrieben: neue Commits mit neuen Hashes<\/td><\/tr> <tr><td>Ergebnis<\/td><td>Verzweigungen sichtbar<\/td><td>gerade Linie<\/td><\/tr> <tr><td>Risiko<\/td><td>gering<\/td><td>gefährlich bei bereits geteilten Commits<\/td><\/tr><\/table> <p><strong>Die goldene Regel:<\/strong> Rebase nie Commits, die andere schon haben. Rebase erzeugt neue Commits; wer auf den alten aufgebaut hat, bekommt Chaos. Für deinen eigenen, noch nicht geteilten Feature-Branch ist Rebase dagegen ideal.<\/p> <p>Hast du einen eigenen Branch schon gepusht und dann rebased, musst du mit Kraft pushen. Nimm dafür immer <code>--force-with-lease<\/code> statt <code>--force<\/code>: Es verweigert den Push, falls inzwischen jemand anderes etwas auf den Branch geschoben hat.<\/p> <p>Mit dem <strong>interaktiven Rebase<\/strong> (<code>git rebase -i HEAD~3<\/code>) räumst du deine letzten Commits vor dem Pull Request auf: zusammenfassen (<code>squash<\/code>), umbenennen (<code>reword<\/code>), umsortieren oder verwerfen (<code>drop<\/code>).<\/p>",
   "code": "# Eigenen Feature-Branch auf den neuesten main-Stand setzen\ngit switch feature/143-gutschein\ngit fetch origin\ngit rebase origin/main\n# Bei Konflikt: loesen, dann\ngit add datei.php\ngit rebase --continue          # oder: git rebase --abort\n\n# Schon gepusht? Sicher ueberschreiben:\ngit push --force-with-lease\n\n# Letzte drei Commits aufraeumen\ngit rebase -i HEAD~3\n# pick   51aa3d9 feat(gutschein): Rabatt berechnen\n# squash 8c0d1e2 tippfehler\n# squash 2f9a7b3 noch ein fix\n# -> ein einziger, sauberer Commit",
   "codeLang": "Bash",
   "tip": "Merge oder Rebase ist eine Teamentscheidung, keine Glaubensfrage. Wichtig ist, dass alle dasselbe tun. Eine gute Faustregel: Rebase für das Aktualisieren des eigenen Feature-Branches, Merge (oder „Squash and Merge“ im Pull Request) für das Zurückführen nach main.",
   "quiz": [
    {
     "q": "Was ist die goldene Regel beim Rebase?",
     "options": [
      "Nie Commits rebasen, die andere bereits haben",
      "Nur auf main rebasen",
      "Immer rebasen statt mergen"
     ],
     "correct": 0,
     "explain": "Rebase erzeugt neue Commits mit neuen Hashes."
    },
    {
     "q": "Warum --force-with-lease statt --force?",
     "options": [
      "Es ist schneller",
      "Es verweigert den Push, wenn jemand anderes inzwischen auf den Branch gepusht hat",
      "Es erzeugt ein Backup"
     ],
     "correct": 1,
     "explain": "So überschreibst du nicht versehentlich fremde Arbeit."
    },
    {
     "q": "Wozu dient git rebase -i HEAD~3?",
     "options": [
      "Drei Commits löschen",
      "Die letzten drei Commits aufräumen: zusammenfassen, umbenennen, umsortieren",
      "Drei Branches zusammenführen"
     ],
     "correct": 1,
     "explain": "Ideal, bevor ein Pull Request geöffnet wird."
    }
   ]
  },
  {
   "id": "m62-l5",
   "title": "Stash und Cherry-Pick",
   "minutes": 10,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Stash<\/dt><dd>Zwischenablage für unfertige Änderungen; hinterlässt ein sauberes Arbeitsverzeichnis.<\/dd><dt>pop / apply<\/dt><dd>Stash zurückholen und aus der Liste entfernen / zurückholen und in der Liste behalten.<\/dd><dt>Cherry-Pick<\/dt><dd>Einen einzelnen Commit aus einem anderen Branch übernehmen.<\/dd><dt>Hotfix<\/dt><dd>Dringende Fehlerbehebung, die schnell in Produktion muss.<\/dd><\/dl><\/div><p>Zwei Werkzeuge für den Alltag, wenn etwas dazwischenkommt:<\/p> <p><strong>git stash<\/strong> legt deine unfertigen Änderungen beiseite und hinterlässt ein sauberes Arbeitsverzeichnis. Typischer Fall: Du baust an einer Funktion, und plötzlich muss ein dringender Fehler auf <code>main<\/code> behoben werden.<\/p> <ul><li><code>git stash push -m \"Warenkorb halbfertig\"<\/code> – beiseitelegen, mit Beschreibung.<\/li> <li><code>git stash -u<\/code> – auch noch nicht verfolgte Dateien mitnehmen.<\/li> <li><code>git stash list<\/code> – alle Stashes anzeigen.<\/li> <li><code>git stash pop<\/code> – den letzten zurückholen und aus der Liste entfernen; <code>apply<\/code> behält ihn in der Liste.<\/li><\/ul> <p><strong>git cherry-pick<\/strong> übernimmt einen einzelnen Commit aus einem anderen Branch. Typischer Fall: Ein Bugfix wurde auf <code>main<\/code> gemacht und muss zusätzlich in den Release-Branch <code>release/1.4<\/code>.<\/p> <p>Beide Werkzeuge sind Notlösungen für Sonderfälle. Wer ständig stasht oder cherry-pickt, hat meist zu große Branches oder einen unklaren Release-Prozess.<\/p>",
   "code": "# Mitten in der Arbeit: dringender Bugfix noetig\ngit stash push -u -m \"Warenkorb halbfertig\"\ngit switch main\ngit switch -c fix/rundungsfehler\n# ... Fehler beheben, committen, Pull Request ...\ngit switch feature/142-warenkorb\ngit stash list\n# stash@{0}: On feature/142-warenkorb: Warenkorb halbfertig\ngit stash pop\n\n# Bugfix zusaetzlich in den Release-Branch uebernehmen\ngit log --oneline main -3\n# e41b9c7 fix: Rundung der MwSt korrigieren\ngit switch release/1.4\ngit cherry-pick e41b9c7",
   "codeLang": "Bash",
   "tip": "Stashes sind lokal und haben keinen Branch-Namen im Alltag. Wer einen Stash wochenlang liegen lässt, vergisst ihn. Wenn eine Unterbrechung länger dauert, ist ein Commit auf dem Feature-Branch („WIP: Warenkorb“) die bessere Wahl – den kannst du vor dem Pull Request mit einem interaktiven Rebase wieder aufräumen.",
   "quiz": [
    {
     "q": "Wann ist git stash nützlich?",
     "options": [
      "Um unfertige Änderungen kurz beiseitezulegen und ein sauberes Arbeitsverzeichnis zu bekommen",
      "Um Branches zusammenzuführen",
      "Um Commits zu löschen"
     ],
     "correct": 0,
     "explain": "Mit git stash pop holst du die Änderungen zurück."
    },
    {
     "q": "Was unterscheidet git stash pop von git stash apply?",
     "options": [
      "pop entfernt den Stash nach dem Anwenden aus der Liste, apply nicht",
      "apply ist schneller",
      "Kein Unterschied"
     ],
     "correct": 0,
     "explain": "apply ist nützlich, wenn derselbe Stash auf mehrere Branches soll."
    },
    {
     "q": "Wozu dient git cherry-pick?",
     "options": [
      "Commits sortieren",
      "Einen einzelnen Commit aus einem anderen Branch übernehmen",
      "Den besten Branch auswählen"
     ],
     "correct": 1,
     "explain": "Typisch für Bugfixes, die zusätzlich in einen Release-Branch müssen."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m63",
 "part": 11,
 "partTitle": "Git & Zusammenarbeit",
 "title": "Git · Remote und Teamarbeit",
 "lessons": [
  {
   "id": "m63-l1",
   "title": "Remotes: clone, fetch, pull, push",
   "minutes": 12,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Remote<\/dt><dd>Ein anderes Repository, mit dem du dich abgleichst, z. B. auf GitHub.<\/dd><dt>origin<\/dt><dd>Standardname des Remotes, von dem du geklont hast.<\/dd><dt>clone<\/dt><dd>Komplette Kopie eines Repositorys inklusive Geschichte herunterladen.<\/dd><dt>fetch / pull / push<\/dt><dd>Holen ohne Zusammenführen / holen und zusammenführen / eigene Commits hochladen.<\/dd><dt>Upstream (Tracking-Branch)<\/dt><dd>Der Remote-Branch, mit dem dein lokaler Branch verknüpft ist, z. B. origin/main.<\/dd><\/dl><\/div><p>Ein <strong>Remote<\/strong> ist ein anderes Repository, mit dem du dich abgleichst – meist auf GitHub oder GitLab. Beim Klonen heißt es standardmäßig <code>origin<\/code>.<\/p> <table class=\"lesson-table\"><tr><th>Befehl<\/th><th>Was passiert<\/th><\/tr> <tr><td><code>git clone url<\/code><\/td><td>komplette Kopie inklusive Geschichte, Remote <code>origin<\/code> eingerichtet<\/td><\/tr> <tr><td><code>git fetch<\/code><\/td><td>holt neue Commits vom Remote, <strong>ändert deine Dateien nicht<\/strong><\/td><\/tr> <tr><td><code>git pull<\/code><\/td><td><code>fetch<\/code> plus Zusammenführen in den aktuellen Branch<\/td><\/tr> <tr><td><code>git push<\/code><\/td><td>schickt deine Commits zum Remote<\/td><\/tr> <tr><td><code>git push -u origin branch<\/code><\/td><td>erster Push eines Branches, merkt sich den Upstream<\/td><\/tr><\/table> <p>Nach dem <code>fetch<\/code> siehst du die Remote-Stände als <code>origin/main<\/code>. So kannst du in Ruhe vergleichen (<code>git log main..origin/main<\/code>), bevor du zusammenführst.<\/p> <p>Lehnt der Server deinen Push mit „rejected (non-fast-forward)“ ab, hat jemand anderes inzwischen gepusht. Hol dir erst die neuen Commits mit <code>git pull<\/code> (oder <code>fetch<\/code> und <code>rebase<\/code>), löse eventuelle Konflikte und pushe dann erneut.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>„Push mit --force, dann geht es“ ist der schnellste Weg, die Arbeit von Kolleginnen zu löschen. Ein abgelehnter Push bedeutet fast immer: zuerst holen, dann pushen. Auf <code>main<\/code> verhindert Branch-Schutz Force-Pushes ganz.<\/p><\/div>",
   "code": "git clone git@github.com:acme/shop.git\ncd shop\ngit remote -v\n# origin  git@github.com:acme/shop.git (fetch)\n# origin  git@github.com:acme/shop.git (push)\n\ngit switch -c feature/150-merkzettel\n# ... committen ...\ngit push -u origin feature/150-merkzettel     # Upstream merken\ngit push                                      # ab jetzt reicht das\n\n# Abgelehnter Push\ngit push\n# ! [rejected]  main -> main (non-fast-forward)\ngit pull                 # neue Commits holen und zusammenfuehren\ngit push\n\n# Erst ansehen, dann zusammenfuehren\ngit fetch\ngit log --oneline main..origin/main          # was ist neu auf dem Server?",
   "codeLang": "Bash",
   "tip": "Beginne jeden Arbeitstag mit <code>git fetch<\/code> und einem Blick auf <code>git status<\/code>. Wer morgens weiß, was sich über Nacht auf main getan hat, vermeidet die großen Konflikte am Abend.",
   "quiz": [
    {
     "q": "Was unterscheidet git fetch von git pull?",
     "options": [
      "fetch holt nur, pull holt und führt zusammen",
      "pull holt nur, fetch führt zusammen",
      "Kein Unterschied"
     ],
     "correct": 0,
     "explain": "Nach fetch sind die neuen Commits als origin/main sichtbar, deine Dateien bleiben unverändert."
    },
    {
     "q": "Was bewirkt -u bei git push -u origin feature/x?",
     "options": [
      "Es pusht ungeprüft",
      "Es merkt sich origin/feature/x als Upstream, danach genügt git push",
      "Es löscht den lokalen Branch"
     ],
     "correct": 1,
     "explain": "u steht für upstream."
    },
    {
     "q": "Dein Push wird mit „non-fast-forward“ abgelehnt. Was tust du?",
     "options": [
      "Den Branch löschen",
      "git push --force",
      "Erst die neuen Commits holen (pull), dann erneut pushen"
     ],
     "correct": 2,
     "explain": "Jemand anderes hat inzwischen gepusht."
    }
   ]
  },
  {
   "id": "m63-l2",
   "title": "Pull Requests und Code-Review",
   "minutes": 12,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Pull Request (PR)<\/dt><dd>Bitte, einen Branch nach Review in main zu übernehmen – mit Diskussion und automatischen Prüfungen. Bei GitLab: Merge Request.<\/dd><dt>Code-Review<\/dt><dd>Durchsicht von Code durch Kolleginnen und Kollegen vor dem Zusammenführen.<\/dd><dt>Draft<\/dt><dd>Als Entwurf markierter PR, der noch nicht zum Review bereit ist.<\/dd><dt>Approve<\/dt><dd>Freigabe eines PR durch eine Reviewerin oder einen Reviewer.<\/dd><dt>nit<\/dt><dd>Kennzeichnung für einen kleinen, optionalen Verbesserungsvorschlag im Review.<\/dd><\/dl><\/div><p>Ein <strong>Pull Request<\/strong> (bei GitLab: Merge Request) ist die Bitte: „Bitte schau dir meinen Branch an und führe ihn in main.“ Er ist der Ort für Diskussion, Review und automatische Prüfungen.<\/p> <p><strong>Der GitHub Flow in sechs Schritten:<\/strong><\/p> <ol><li>Branch von <code>main<\/code> anlegen.<\/li> <li>Kleine, saubere Commits.<\/li> <li>Pushen und Pull Request öffnen – gern früh als <em>Draft<\/em>.<\/li> <li>CI läuft: Tests, Pint, PHPStan.<\/li> <li>Review: Kommentare, Rückfragen, Nachbesserungen.<\/li> <li>Merge nach Freigabe, Branch löschen, Deployment.<\/li><\/ol> <p><strong>Eine gute PR-Beschreibung<\/strong> beantwortet: Was ändert sich und warum? Wie kann man es testen? Gibt es Risiken (Migration, Konfiguration)? Screenshots bei Oberflächenänderungen.<\/p> <p><strong>Gute Reviews<\/strong> sind freundlich und konkret. Kommentiere den Code, nicht die Person. Unterscheide klar zwischen „muss geändert werden“ (Fehler, Sicherheitslücke) und Vorschlägen („nit:“ für Kleinigkeiten). Und lobe, was gut gelöst ist – Reviews sind auch Lernen.<\/p> <table class=\"lesson-table\"><tr><th>Merge-Art<\/th><th>Ergebnis<\/th><\/tr> <tr><td>Merge commit<\/td><td>alle Commits plus Merge-Commit<\/td><\/tr> <tr><td>Squash and merge<\/td><td>alle Commits des PR werden zu einem<\/td><\/tr> <tr><td>Rebase and merge<\/td><td>Commits einzeln auf main gesetzt, keine Verzweigung<\/td><\/tr><\/table>",
   "code": "## Was\nKunden koennen Produkte auf einen Merkzettel setzen (Session fuer Gaeste,\nDatenbank fuer angemeldete Kunden). Beim Login wird der Gast-Merkzettel uebernommen.\n\n## Warum\nTicket #150 - 18 % der Besucher verlassen den Shop nach der Produktseite,\nein Merkzettel soll den Wiedereinstieg erleichtern.\n\n## Testen\n1. Als Gast zwei Produkte merken\n2. Einloggen -> beide Produkte stehen auf dem Merkzettel\n3. `php artisan test --filter=Merkzettel`\n\n## Risiken\n- Neue Migration `merkzettel_eintraege` (nur Anlegen, kein Umbau)\n- Keine Konfigurationsaenderung\n\n## Screenshots\n(Produktseite mit Merkzettel-Knopf)",
   "codeLang": "Pull-Request-Beschreibung",
   "tip": "Halte Pull Requests klein – unter 400 geänderten Zeilen, wenn möglich. Studien und Erfahrung zeigen: Bei großen PRs sinkt die Zahl der gefundenen Probleme pro Zeile drastisch, weil niemand 2000 Zeilen wirklich aufmerksam liest. Große Funktionen lieber in mehrere aufeinander aufbauende PRs teilen.",
   "quiz": [
    {
     "q": "Was ist ein Pull Request?",
     "options": [
      "Die Bitte, einen Branch nach Review in main zu übernehmen – mit Diskussion und CI",
      "Ein anderer Name für git pull",
      "Ein Befehl, um Code herunterzuladen"
     ],
     "correct": 0,
     "explain": "Bei GitLab heißt es Merge Request."
    },
    {
     "q": "Was bewirkt „Squash and merge“?",
     "options": [
      "Alle Commits des Pull Requests werden zu einem zusammengefasst",
      "Der Branch wird gelöscht, ohne zu mergen",
      "Es entstehen zwei Merge-Commits"
     ],
     "correct": 0,
     "explain": "Die main-Geschichte bleibt so kompakt."
    },
    {
     "q": "Was gehört in eine gute PR-Beschreibung?",
     "options": [
      "Die komplette Datei",
      "Nur der Branch-Name",
      "Was und warum, wie man testet, welche Risiken es gibt"
     ],
     "correct": 2,
     "explain": "So kann das Review gezielt und schnell erfolgen."
    }
   ]
  },
  {
   "id": "m63-l3",
   "title": "Branch-Strategien im Team",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Branch-Strategie<\/dt><dd>Teamregel, wie Branches angelegt, benannt und zusammengeführt werden.<\/dd><dt>GitHub Flow<\/dt><dd>Einfache Strategie: main ist immer auslieferbar, alles andere kommt über Feature-Branches und PRs.<\/dd><dt>Git Flow<\/dt><dd>Strategie mit main, develop sowie feature-, release- und hotfix-Branches für feste Release-Zyklen.<\/dd><dt>Trunk-based Development<\/dt><dd>Alle integrieren sehr häufig direkt in main; Branches leben nur Stunden.<\/dd><dt>Feature Flag<\/dt><dd>Schalter, mit dem eine fertige oder unfertige Funktion im Code an- und ausgeschaltet wird.<\/dd><\/dl><\/div><p>Wie ein Team mit Branches arbeitet, hängt davon ab, wie oft es ausliefert. Drei Strategien sind verbreitet:<\/p> <table class=\"lesson-table\"><tr><th>Strategie<\/th><th>Prinzip<\/th><th>Passt für<\/th><\/tr> <tr><td><strong>GitHub Flow<\/strong><\/td><td><code>main<\/code> ist immer auslieferbar, Feature-Branches mit Pull Request<\/td><td>Webanwendungen mit häufigen Deployments – Standard für die meisten Laravel-Projekte<\/td><\/tr> <tr><td><strong>Git Flow<\/strong><\/td><td><code>main<\/code> + <code>develop<\/code>, dazu feature-, release- und hotfix-Branches<\/td><td>Software mit festen Versionen und Release-Zyklen<\/td><\/tr> <tr><td><strong>Trunk-based<\/strong><\/td><td>alle committen sehr häufig (mindestens täglich) nach main, Branches leben Stunden<\/td><td>erfahrene Teams mit starker Testautomatisierung<\/td><\/tr><\/table> <p>Je länger ein Branch lebt, desto größer werden die Konflikte beim Zurückführen. Trunk-based Development treibt das auf die Spitze – und braucht dafür <strong>Feature Flags<\/strong>: Unfertige Funktionen sind schon im Code, aber ausgeschaltet. In Laravel gibt es dafür das Paket <strong>Pennant<\/strong>.<\/p> <p>Für ein kleines Team und eine Webanwendung ist GitHub Flow fast immer die richtige Wahl: einfach, gut verstanden und von allen Plattformen unterstützt.<\/p>",
   "code": "<?php\n// Feature Flag mit Laravel Pennant - unfertige Funktion schon in main, aber aus\nuse Laravel\\Pennant\\Feature;\n\n// AppServiceProvider::boot()\nFeature::define('neuer-checkout', fn (User $user) => $user->ist_beta_tester);\n\n// Im Controller oder in Blade\nif (Feature::active('neuer-checkout')) {\n    return view('checkout.neu');\n}\nreturn view('checkout.alt');\n\n// @feature('neuer-checkout') ... @else ... @endfeature",
   "codeLang": "PHP · Laravel",
   "tip": "Feature Flags sind technische Schulden mit Ablaufdatum. Notiere zu jedem Flag, wann es wieder entfernt wird. Sonst stehen nach einem Jahr zwanzig Schalter im Code, von denen niemand mehr weiß, welche Kombination eigentlich in Produktion läuft.",
   "quiz": [
    {
     "q": "Welche Strategie passt für die meisten Laravel-Webanwendungen?",
     "options": [
      "GitHub Flow",
      "Gar keine Branches",
      "Git Flow"
     ],
     "correct": 0,
     "explain": "main ist immer auslieferbar, jede Änderung kommt über einen Pull Request."
    },
    {
     "q": "Wozu dienen Feature Flags beim Trunk-based Development?",
     "options": [
      "Sie markieren Branches",
      "Unfertige Funktionen können im Code sein, bleiben aber ausgeschaltet",
      "Sie beschleunigen Tests"
     ],
     "correct": 1,
     "explain": "In Laravel bietet Pennant diese Funktion."
    },
    {
     "q": "Warum sollen Branches nicht wochenlang leben?",
     "options": [
      "Weil sie Speicher kosten",
      "Weil Git sie sonst löscht",
      "Weil die Konflikte beim Zurückführen mit der Zeit wachsen"
     ],
     "correct": 2,
     "explain": "Kurzlebige Branches halten Konflikte klein."
    }
   ]
  },
  {
   "id": "m63-l4",
   "title": "Branch-Schutz, CI und Releases",
   "minutes": 12,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Branch Protection<\/dt><dd>Regeln, die z. B. direkte Pushes auf main verbieten und Reviews sowie grüne Tests verlangen.<\/dd><dt>CI (Continuous Integration)<\/dt><dd>Automatisches Bauen und Testen bei jedem Push.<\/dd><dt>Tag<\/dt><dd>Fester Name für einen bestimmten Commit, meist für Releases (v1.5.0).<\/dd><dt>Release<\/dt><dd>Veröffentlichte Version einer Software.<\/dd><dt>Semantic Versioning (SemVer)<\/dt><dd>Versionsschema MAJOR.MINOR.PATCH: Bruch, neue Funktion, Fehlerbehebung.<\/dd><\/dl><\/div><p>In einem professionellen Repository kann niemand einfach Code nach <code>main<\/code> schieben. <strong>Branch Protection Rules<\/strong> auf GitHub (bzw. Protected Branches auf GitLab) legen fest:<\/p> <ul><li>Änderungen nur über Pull Requests,<\/li> <li>mindestens ein Review mit Freigabe,<\/li> <li>die CI-Prüfungen müssen grün sein,<\/li> <li>keine Force-Pushes, kein Löschen des Branches.<\/li><\/ul> <p><strong>Releases<\/strong> markierst du mit Tags. Ein annotierter Tag (<code>git tag -a<\/code>) speichert Autor, Datum und Nachricht und ist für Releases die richtige Wahl. Die Versionsnummer folgt <strong>Semantic Versioning<\/strong>:<\/p> <table class=\"lesson-table\"><tr><th>Teil<\/th><th>erhöhen, wenn<\/th><th>Beispiel<\/th><\/tr> <tr><td>MAJOR<\/td><td>inkompatible Änderung, z. B. API-Feld entfernt<\/td><td>1.4.2 → 2.0.0<\/td><\/tr> <tr><td>MINOR<\/td><td>neue Funktion, rückwärtskompatibel<\/td><td>1.4.2 → 1.5.0<\/td><\/tr> <tr><td>PATCH<\/td><td>nur Fehlerbehebung<\/td><td>1.4.2 → 1.4.3<\/td><\/tr><\/table> <p>Tags werden nicht automatisch gepusht – du schickst sie mit <code>git push origin v1.5.0<\/code>. Auf GitHub lässt sich aus einem Tag ein Release mit Changelog erzeugen, und Deployments können daran hängen: „Was ein Tag bekommt, geht live.“<\/p>",
   "code": "# Release vorbereiten\ngit switch main && git pull\nphp artisan test\n\ngit tag -a v1.5.0 -m \"Merkzettel, Gutscheine, schnellere Produktsuche\"\ngit push origin v1.5.0\n\ngit tag                       # alle Tags\ngit show v1.5.0               # Details zum Tag\ngit log v1.4.0..v1.5.0 --oneline   # was ist seit dem letzten Release neu? -> Changelog\n\n# Deployment nur bei Tags (GitHub Actions, Auszug)\n# on:\n#   push:\n#     tags: ['v*']",
   "codeLang": "Bash",
   "tip": "Pflege eine Datei <code>CHANGELOG.md<\/code> im Format „Keep a Changelog“: pro Version die Abschnitte Hinzugefügt, Geändert, Behoben, Entfernt. Wenn deine Commits Conventional Commits folgen, lässt sie sich größtenteils automatisch erzeugen – und Kunden wie Support wissen, was sich geändert hat.",
   "quiz": [
    {
     "q": "Was bewirkt eine Branch Protection Rule auf main?",
     "options": [
      "Änderungen nur per Pull Request mit Review und grüner CI",
      "main wird schreibgeschützt für immer",
      "main wird gelöscht"
     ],
     "correct": 0,
     "explain": "Außerdem lassen sich Force-Pushes verbieten."
    },
    {
     "q": "Ein API-Feld wird entfernt. Welcher Teil der Version wird erhöht?",
     "options": [
      "PATCH",
      "MINOR",
      "MAJOR"
     ],
     "correct": 2,
     "explain": "Eine inkompatible Änderung erhöht MAJOR."
    },
    {
     "q": "Wie veröffentlichst du einen lokal erstellten Tag?",
     "options": [
      "git tag --push",
      "Er wird beim nächsten git push automatisch übertragen",
      "git push origin v1.5.0"
     ],
     "correct": 2,
     "explain": "Tags müssen ausdrücklich gepusht werden."
    }
   ]
  }
 ]
});
MODULES.push({
 "id": "m64",
 "part": 11,
 "partTitle": "Git & Zusammenarbeit",
 "title": "Git · Fehler beheben und Profi-Werkzeuge",
 "lessons": [
  {
   "id": "m64-l1",
   "title": "Änderungen rückgängig machen",
   "minutes": 13,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>restore<\/dt><dd>Stellt Dateien im Arbeitsverzeichnis oder im Staging wieder her.<\/dd><dt>amend<\/dt><dd>Den letzten Commit nachträglich ändern (Nachricht oder Inhalt).<\/dd><dt>reset<\/dt><dd>Verschiebt den Branch-Zeiger zurück; je nach Modus (--soft, --mixed, --hard) bleiben Änderungen erhalten oder nicht.<\/dd><dt>revert<\/dt><dd>Erzeugt einen neuen Commit, der einen alten umkehrt – sicher für bereits geteilte Commits.<\/dd><\/dl><\/div><p>Git hat für fast jeden Fehler einen Ausweg. Welcher passt, hängt von einer Frage ab: <strong>Ist die Änderung schon mit anderen geteilt (gepusht)?<\/strong><\/p> <table class=\"lesson-table\"><tr><th>Situation<\/th><th>Befehl<\/th><\/tr> <tr><td>Änderung an einer Datei verwerfen (nicht vorgemerkt)<\/td><td><code>git restore datei<\/code><\/td><\/tr> <tr><td>Datei aus dem Staging nehmen, Änderung behalten<\/td><td><code>git restore --staged datei<\/code><\/td><\/tr> <tr><td>letzte Commit-Nachricht korrigieren oder Datei nachreichen<\/td><td><code>git commit --amend<\/code><\/td><\/tr> <tr><td>letzten Commit zurücknehmen, Änderungen vorgemerkt behalten<\/td><td><code>git reset --soft HEAD~1<\/code><\/td><\/tr> <tr><td>letzten Commit zurücknehmen, Änderungen ungemerkt behalten<\/td><td><code>git reset HEAD~1<\/code> (mixed)<\/td><\/tr> <tr><td>letzten Commit samt Änderungen verwerfen<\/td><td><code>git reset --hard HEAD~1<\/code><\/td><\/tr> <tr><td><strong>bereits gepushten<\/strong> Commit rückgängig machen<\/td><td><code>git revert hash<\/code><\/td><\/tr><\/table> <p><strong>reset<\/strong> verschiebt den Branch-Zeiger zurück und schreibt damit Geschichte um – nur für lokale, nicht geteilte Commits. <strong>revert<\/strong> erzeugt einen <em>neuen<\/em> Commit, der die Änderungen eines alten umkehrt. Die Geschichte bleibt erhalten, deshalb ist revert der richtige Weg für alles, was schon auf dem Server liegt.<\/p><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p><code>git reset --hard<\/code> und <code>git restore datei<\/code> verwerfen nicht committete Änderungen <em>endgültig<\/em> – die kann auch Git nicht zurückholen. Schau vorher mit <code>git status<\/code> und <code>git diff<\/code> nach, was verloren ginge.<\/p><\/div>",
   "code": "# Tippfehler in der letzten Commit-Nachricht (noch nicht gepusht)\ngit commit --amend -m \"fix(versand): Kosten fuer Inseln korrigieren\"\n\n# Datei vergessen\ngit add tests/VersandTest.php\ngit commit --amend --no-edit\n\n# Falsche Datei vorgemerkt\ngit restore --staged .env\n\n# Letzten lokalen Commit aufloesen, Aenderungen behalten\ngit reset --soft HEAD~1\n\n# Bereits gepushten Commit rueckgaengig machen - Geschichte bleibt\ngit log --oneline -3\n# 9a1e2f3 feat: neue Preisberechnung   <- verursacht Fehler in Produktion\ngit revert 9a1e2f3\ngit push",
   "codeLang": "Bash",
   "tip": "Wenn in Produktion etwas brennt, ist <code>git revert<\/code> plus Deployment fast immer der schnellste sichere Weg zurück. Die Ursache suchst du danach in Ruhe – und der Revert-Commit dokumentiert in der Geschichte, was passiert ist.",
   "quiz": [
    {
     "q": "Welcher Befehl macht einen bereits gepushten Commit rückgängig, ohne die Geschichte umzuschreiben?",
     "options": [
      "git revert",
      "git restore",
      "git reset --hard"
     ],
     "correct": 0,
     "explain": "revert erzeugt einen neuen Commit, der die Änderungen umkehrt."
    },
    {
     "q": "Was macht git reset --soft HEAD~1?",
     "options": [
      "Löscht den letzten Commit samt Änderungen",
      "Nimmt den letzten Commit zurück, die Änderungen bleiben vorgemerkt",
      "Lädt den letzten Commit neu herunter"
     ],
     "correct": 1,
     "explain": "--hard würde die Änderungen verwerfen."
    },
    {
     "q": "Du hast versehentlich .env vorgemerkt. Wie nimmst du sie aus dem Staging, ohne sie zu löschen?",
     "options": [
      "git reset --hard",
      "git rm .env",
      "git restore --staged .env"
     ],
     "correct": 2,
     "explain": "Die Datei bleibt unverändert im Arbeitsverzeichnis."
    }
   ]
  },
  {
   "id": "m64-l2",
   "title": "Rettung mit reflog",
   "minutes": 10,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Reflog<\/dt><dd>Lokales Protokoll jeder Bewegung von HEAD; Rettungsanker für scheinbar verlorene Commits.<\/dd><dt>HEAD@{n}<\/dt><dd>Der Stand von HEAD vor n Bewegungen, z. B. HEAD@{1} = der Stand vor der letzten Aktion.<\/dd><dt>dangling commit<\/dt><dd>Commit, auf den kein Branch mehr zeigt; nur noch über das Reflog erreichbar.<\/dd><\/dl><\/div><p>Ein <code>git reset --hard<\/code> zu viel, ein gelöschter Branch, ein missglückter Rebase – und die Commits scheinen weg. Sind sie aber nicht: Git merkt sich lokal jede Bewegung von HEAD im <strong>Reflog<\/strong>, standardmäßig 90 Tage.<\/p> <ol><li><code>git reflog<\/code> zeigt die Liste: jeder Eintrag mit Hash, Position (<code>HEAD@{3}<\/code>) und Aktion.<\/li> <li>Den Eintrag vor dem Unglück suchen.<\/li> <li>Einen Branch darauf setzen: <code>git branch rettung HEAD@{3}<\/code> – oder den aktuellen Branch dorthin zurücksetzen.<\/li><\/ol> <p>Die Grenze: Das Reflog kennt nur, was einmal <em>committet<\/em> war. Nie committete Änderungen, die <code>reset --hard<\/code> verworfen hat, sind verloren. Ein Grund mehr, lieber einmal zu oft einen Zwischencommit zu machen.<\/p> <p>Das Reflog ist lokal. Was auf deinem Rechner passiert ist, steht in deinem Reflog, nicht in dem deiner Kollegen oder auf dem Server.<\/p>",
   "code": "git reset --hard HEAD~3        # Ups - drei Commits zu viel\n\ngit reflog\n# 3c1d2ab HEAD@{0}: reset: moving to HEAD~3\n# 8f4e2c1 HEAD@{1}: commit: feat(merkzettel): Uebernahme beim Login\n# 1b7d9a0 HEAD@{2}: commit: feat(merkzettel): Datenbank-Speicher\n# ...\n\ngit branch rettung HEAD@{1}    # Branch auf den Stand vor dem Reset\ngit log --oneline rettung -3   # alle drei Commits wieder da\n\n# oder den aktuellen Branch direkt zuruecksetzen\ngit reset --hard HEAD@{1}",
   "codeLang": "Bash",
   "tip": "Bevor du einen riskanten Befehl ausführst (großer Rebase, Reset), leg mit <code>git branch sicherung<\/code> einen Zeiger auf den aktuellen Stand. Das kostet nichts und erspart dir die Suche im Reflog. Nach erfolgreicher Aktion löschst du den Branch wieder.",
   "quiz": [
    {
     "q": "Was zeichnet das Reflog auf?",
     "options": [
      "Jede Bewegung von HEAD im lokalen Repository",
      "Alle Dateiänderungen, auch nicht committete",
      "Alle Commits aller Kollegen"
     ],
     "correct": 0,
     "explain": "Es ist lokal und standardmäßig 90 Tage lang verfügbar."
    },
    {
     "q": "Kann das Reflog nie committete Änderungen nach einem reset --hard retten?",
     "options": [
      "Ja",
      "Nein",
      "Nur unter Windows"
     ],
     "correct": 1,
     "explain": "Nur was einmal committet war, steht im Reflog."
    },
    {
     "q": "Wie holst du einen Stand aus dem Reflog sicher zurück?",
     "options": [
      "git push HEAD@{1}",
      "git branch rettung HEAD@{1}",
      "git delete HEAD@{1}"
     ],
     "correct": 1,
     "explain": "Ein neuer Branch auf den alten Stand ändert nichts am aktuellen Zustand."
    }
   ]
  },
  {
   "id": "m64-l3",
   "title": "Fehler finden mit bisect, blame und log -S",
   "minutes": 12,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>bisect<\/dt><dd>Binäre Suche nach dem Commit, der einen Fehler eingeführt hat.<\/dd><dt>blame<\/dt><dd>Zeigt zu jeder Zeile, in welchem Commit und von wem sie zuletzt geändert wurde.<\/dd><dt>Pickaxe (log -S)<\/dt><dd>Suche nach Commits, in denen ein bestimmter Text hinzukam oder verschwand.<\/dd><dt>Regression<\/dt><dd>Fehler in einer Funktion, die früher schon einmal funktioniert hat.<\/dd><\/dl><\/div><p>„Letzte Woche ging es noch.“ Dazwischen liegen 80 Commits. Statt alle zu prüfen, lässt du Git suchen: <strong>git bisect<\/strong> halbiert die Menge der verdächtigen Commits bei jedem Schritt – bei 80 Commits genügen etwa sieben Prüfungen.<\/p> <ol><li><code>git bisect start<\/code><\/li> <li><code>git bisect bad<\/code> – der aktuelle Stand ist fehlerhaft.<\/li> <li><code>git bisect good v1.4.0<\/code> – dieser Stand war in Ordnung.<\/li> <li>Git checkt einen Commit in der Mitte aus. Du testest und sagst <code>good<\/code> oder <code>bad<\/code>.<\/li> <li>Nach wenigen Runden nennt Git den ersten fehlerhaften Commit.<\/li> <li><code>git bisect reset<\/code> bringt dich zurück.<\/li><\/ol> <p>Noch besser: <code>git bisect run php artisan test --filter=VersandTest<\/code> automatisiert das Ganze – Git wertet den Exit-Code des Befehls aus.<\/p> <table class=\"lesson-table\"><tr><th>Werkzeug<\/th><th>Frage<\/th><\/tr> <tr><td><code>git blame -L 40,60 datei<\/code><\/td><td>Wer hat diese Zeilen zuletzt geändert, in welchem Commit?<\/td><\/tr> <tr><td><code>git log -S \"versandfrei\"<\/code><\/td><td>In welchem Commit wurde dieser Text hinzugefügt oder entfernt?<\/td><\/tr> <tr><td><code>git log -p -- datei<\/code><\/td><td>Alle Änderungen an einer Datei mit Diff<\/td><\/tr><\/table> <p><code>blame<\/code> klingt nach Schuldzuweisung, ist aber ein Werkzeug zum Verstehen: Der Commit verrät meist das Warum – und das dazugehörige Ticket.<\/p>",
   "code": "git bisect start\ngit bisect bad                    # aktueller Stand: kaputt\ngit bisect good v1.4.0            # damals: in Ordnung\n# Bisecting: 40 revisions left to test after this (roughly 6 steps)\n\n# automatisch mit einem Test, der den Fehler zeigt\ngit bisect run php artisan test --filter=VersandkostenTest\n# 9a1e2f3 is the first bad commit\n# feat: neue Preisberechnung\n\ngit bisect reset\n\n# Wer hat Zeile 40-60 zuletzt geaendert?\ngit blame -L 40,60 app/Services/Versand.php\n\n# Wann ist dieser Text verschwunden?\ngit log -S \"versandfrei_ab\" --oneline",
   "codeLang": "Bash",
   "tip": "<code>bisect<\/code> funktioniert nur gut, wenn jeder Commit für sich lauffähig ist. Das ist der praktische Grund für kleine, saubere Commits: Ein Commit „WIP, kaputt“ in der Mitte macht die Suche unzuverlässig. Bei solchen Commits hilft <code>git bisect skip<\/code>.",
   "quiz": [
    {
     "q": "Wie viele Prüfungen braucht git bisect bei etwa 80 Commits?",
     "options": [
      "etwa 7",
      "40",
      "80"
     ],
     "correct": 0,
     "explain": "Jeder Schritt halbiert die Menge: 2 hoch 7 = 128."
    },
    {
     "q": "Was macht git bisect run mit einem Testbefehl?",
     "options": [
      "Es führt die Suche automatisch aus und wertet den Exit-Code aus",
      "Es behebt den Fehler",
      "Es pusht den Fix"
     ],
     "correct": 0,
     "explain": "Exit-Code 0 bedeutet good, ungleich 0 bad."
    },
    {
     "q": "Welcher Befehl findet den Commit, in dem ein bestimmter Text hinzukam oder verschwand?",
     "options": [
      "git grep",
      "git blame",
      "git log -S \"text\""
     ],
     "correct": 2,
     "explain": "Diese Suche heißt Pickaxe."
    }
   ]
  },
  {
   "id": "m64-l4",
   "title": "Hooks: Qualität automatisch prüfen",
   "minutes": 11,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Hook<\/dt><dd>Skript, das Git bei bestimmten Ereignissen automatisch ausführt, z. B. vor einem Commit.<\/dd><dt>pre-commit<\/dt><dd>Hook vor dem Commit – typisch für Code-Stil- und Geheimnis-Prüfungen.<\/dd><dt>Exit-Code<\/dt><dd>Rückgabewert eines Programms: 0 = Erfolg, alles andere = Fehler; ein Hook mit Fehler bricht den Git-Befehl ab.<\/dd><dt>core.hooksPath<\/dt><dd>Einstellung, die einen versionierten Ordner (z. B. .githooks) als Hook-Verzeichnis festlegt.<\/dd><\/dl><\/div><p><strong>Git-Hooks<\/strong> sind Skripte, die Git bei bestimmten Ereignissen ausführt. Die wichtigsten für Entwickler:<\/p> <table class=\"lesson-table\"><tr><th>Hook<\/th><th>Wann<\/th><th>Typische Aufgabe<\/th><\/tr> <tr><td><code>pre-commit<\/code><\/td><td>vor dem Commit<\/td><td>Code-Stil prüfen, Geheimnisse suchen<\/td><\/tr> <tr><td><code>commit-msg<\/code><\/td><td>nach Eingabe der Nachricht<\/td><td>Format prüfen (Conventional Commits)<\/td><\/tr> <tr><td><code>pre-push<\/code><\/td><td>vor dem Push<\/td><td>schnelle Tests<\/td><\/tr><\/table> <p>Bricht ein Hook mit einem Exit-Code ungleich 0 ab, bricht auch der Git-Befehl ab.<\/p> <p>Hooks liegen in <code>.git/hooks<\/code> – und dieses Verzeichnis wird <em>nicht<\/em> versioniert. Damit das ganze Team dieselben Hooks nutzt, legt man sie in einen versionierten Ordner wie <code>.githooks/<\/code> und setzt einmal <code>git config core.hooksPath .githooks<\/code>. Im PHP-Umfeld gibt es dafür auch Pakete wie <em>CaptainHook<\/em> oder <em>GrumPHP<\/em>.<\/p> <p>Hooks sind ein Komfortwerkzeug, keine Sicherheitsmaßnahme: Mit <code>git commit --no-verify<\/code> lassen sie sich umgehen. Die verbindliche Prüfung bleibt die CI im Pull Request.<\/p>",
   "code": "#!/usr/bin/env bash\n# .githooks/pre-commit  (ausfuehrbar machen: chmod +x .githooks/pre-commit)\nset -e\n\n# Nur vorgemerkte PHP-Dateien pruefen - schnell auch in grossen Projekten\nDATEIEN=$(git diff --cached --name-only --diff-filter=ACM -- '*.php')\nif [ -n \"$DATEIEN\" ]; then\n    ./vendor/bin/pint --test $DATEIEN\nfi\n\n# Keine .env und keine dd()-Reste committen\nif git diff --cached --name-only | grep -qE '(^|/)\\.env$'; then\n    echo \"Fehler: .env darf nicht committet werden.\" >&2\n    exit 1\nfi\nif git diff --cached -- '*.php' | grep -qE '^\\+.*\\b(dd|dump)\\('; then\n    echo \"Fehler: dd()/dump() im Commit gefunden.\" >&2\n    exit 1\nfi\n\n# Einmalig im Projekt:\n#   git config core.hooksPath .githooks",
   "codeLang": "Bash",
   "tip": "Halte Pre-Commit-Hooks schnell – unter ein paar Sekunden. Ein Hook, der bei jedem Commit die komplette Testsuite startet, wird nach zwei Tagen mit <code>--no-verify<\/code> umgangen. Schnelle Prüfungen lokal, gründliche in der CI.",
   "quiz": [
    {
     "q": "Warum teilt man Hooks über einen Ordner wie .githooks/?",
     "options": [
      "Weil Git Hooks sonst ignoriert",
      "Weil es schneller ist",
      "Weil .git/hooks nicht versioniert wird"
     ],
     "correct": 2,
     "explain": "Mit git config core.hooksPath .githooks nutzt das Repository diesen Ordner."
    },
    {
     "q": "Was passiert, wenn ein pre-commit-Hook mit Exit-Code 1 endet?",
     "options": [
      "Der Commit wird trotzdem erstellt",
      "Der Commit wird abgebrochen",
      "Der Hook wird übersprungen"
     ],
     "correct": 1,
     "explain": "Mit --no-verify lässt sich der Hook umgehen – deshalb bleibt die CI die verbindliche Prüfung."
    },
    {
     "q": "Welcher Hook eignet sich, um das Format der Commit-Nachricht zu prüfen?",
     "options": [
      "post-merge",
      "pre-push",
      "commit-msg"
     ],
     "correct": 2,
     "explain": "Er bekommt die Nachricht als Datei übergeben."
    }
   ]
  },
  {
   "id": "m64-l5",
   "title": "Git im Laravel-Alltag",
   "minutes": 12,
   "body": "<div class=\"rb-begriffe\"><span class=\"rb-box-titel\">Fachbegriffe in dieser Lektion<\/span><dl><dt>Deployment<\/dt><dd>Das Ausliefern einer Version auf einen Server.<\/dd><dt>Rollback<\/dt><dd>Zurückkehren zu einer früheren, funktionierenden Version.<\/dd><dt>composer install / update<\/dt><dd>Installiert exakt die Versionen aus composer.lock / sucht neue Versionen und schreibt das Lock neu.<\/dd><dt>git describe<\/dt><dd>Beschreibt den aktuellen Stand relativ zum letzten Tag, z. B. v1.5.0-3-g8f4e2c1.<\/dd><\/dl><\/div><p>Zum Abschluss die Situationen, die dir in Laravel-Projekten immer wieder begegnen:<\/p> <p><strong>Nach jedem Pull:<\/strong> Hat sich <code>composer.lock<\/code> geändert, <code>composer install<\/code>. Hat sich <code>package-lock.json<\/code> geändert, <code>npm ci<\/code>. Gibt es neue Migrationen, <code>php artisan migrate<\/code>. Ein kleines Skript oder ein <code>post-merge<\/code>-Hook erinnert daran.<\/p> <p><strong>Konflikt in composer.lock:<\/strong> Nicht von Hand zusammenfügen – die Datei enthält Prüfsummen. Der saubere Weg: <code>composer.json<\/code> korrekt zusammenführen, die <code>composer.lock<\/code> aus <code>main<\/code> übernehmen und die eigenen Paketänderungen mit <code>composer update vendor/paket<\/code> neu anwenden.<\/p> <p><strong>Migrationen im Team:<\/strong> Zwei Branches mit Migrationen laufen in der Reihenfolge ihrer Zeitstempel. Ändern beide dieselbe Tabelle, kann die Reihenfolge entscheidend sein – testet nach dem Merge mit <code>php artisan migrate:fresh --seed<\/code> lokal den ganzen Weg.<\/p> <p><strong>Deployment aus Git:<\/strong> Auf dem Server wird nie von Hand editiert. Was live ist, entspricht genau einem Commit oder Tag. So ist jederzeit klar, welcher Code läuft, und ein Rollback ist das Deployment des vorherigen Tags.<\/p>",
   "code": "# Nach dem Wechsel auf einen aktuellen Stand\ngit switch main && git pull\ncomposer install            # composer.lock hat sich geaendert?\nnpm ci                      # package-lock.json hat sich geaendert?\nphp artisan migrate         # neue Migrationen?\n\n# Konflikt in composer.lock sauber loesen\n# Beim Merge von main in deinen Branch: Lock-Datei von main nehmen ...\ngit checkout origin/main -- composer.lock\n# ... und nur die eigene Paketaenderung neu anwenden\ncomposer update laravel/pennant          # eigene Paketaenderung neu anwenden\ngit add composer.json composer.lock\ngit commit\n\n# Welcher Stand laeuft auf dem Server?\ngit describe --tags          # z. B. v1.5.0-3-g8f4e2c1  (3 Commits nach v1.5.0)",
   "codeLang": "Bash",
   "tip": "<code>git describe --tags<\/code> in der Fehlerseite oder im Admin-Bereich anzeigen – oder über die Konfiguration als <code>APP_VERSION<\/code> setzen. Dann weiß jeder sofort, welche Version ein Kunde gerade sieht, und Fehlerdienste ordnen Exceptions dem richtigen Release zu.",
   "quiz": [
    {
     "q": "Was ist nach einem git pull mit geänderter composer.lock zu tun?",
     "options": [
      "composer install",
      "nichts",
      "composer update"
     ],
     "correct": 0,
     "explain": "install installiert genau die Versionen aus dem Lock. update würde neue Versionen suchen."
    },
    {
     "q": "Wie löst man einen Konflikt in composer.lock sauber?",
     "options": [
      "Die Konfliktmarker von Hand entfernen",
      "Lock-Datei von main übernehmen und eigene Paketänderungen mit composer update paket neu anwenden",
      "composer.lock löschen"
     ],
     "correct": 1,
     "explain": "Die Datei enthält Prüfsummen, die beim Zusammenkleben ungültig werden."
    },
    {
     "q": "Wie macht man ein fehlerhaftes Release am schnellsten rückgängig?",
     "options": [
      "Die Datenbank löschen",
      "Auf dem Server den Code von Hand ändern",
      "Den vorherigen Tag erneut deployen"
     ],
     "correct": 2,
     "explain": "Weil jedes Deployment genau einem Tag entspricht, ist der Rollback eindeutig."
    }
   ]
  }
 ]
});
var CHEATSHEET_HTML = (function(){
  var s = '';

  s += '<div class="sheet-section"><h2>Netzplantechnik &ndash; alle Formeln</h2><table class="lesson-table"><tr><th>Gesucht</th><th>Formel</th><th>Merkhilfe</th></tr>'+
    '<tr><td>FEZ</td><td>FAZ + D</td><td>Vorwärts</td></tr>'+
    '<tr><td>FAZ</td><td><strong>MAX</strong>(FEZ aller Vorgänger)</td><td>Auf den Langsamsten warten</td></tr>'+
    '<tr><td>SAZ</td><td>SEZ &minus; D</td><td>Rückwärts</td></tr>'+
    '<tr><td>SEZ</td><td><strong>MIN</strong>(SAZ aller Nachfolger)</td><td>Frühesten Termin halten</td></tr>'+
    '<tr><td>GP (Gesamtpuffer)</td><td>SAZ &minus; FAZ = SEZ &minus; FEZ</td><td>Ohne Projektende zu gefährden</td></tr>'+
    '<tr><td>FP (freier Puffer)</td><td>MIN(FAZ Nachfolger) &minus; eigener FEZ</td><td>Ohne Nachfolger zu stören</td></tr>'+
    '<tr><td>Kritischer Pfad</td><td>alle Vorgänge mit GP = 0</td><td>Durchgehende Kette Start &rarr; Ende</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Letzter Vorgang: SEZ = FEZ. Probe: Beim ersten Vorgang muss SAZ = 0 herauskommen.</p></div>';

  s += '<div class="sheet-section"><h2>Subnetzmasken &ndash; auswendig können</h2><table class="lesson-table"><tr><th>CIDR</th><th>Maske</th><th>Blockgröße</th><th>Nutzbare Hosts</th></tr>'+
    '<tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td></tr>'+
    '<tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td></tr>'+
    '<tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td></tr>'+
    '<tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td></tr>'+
    '<tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td></tr>'+
    '<tr><td>/29</td><td>255.255.255.248</td><td>8</td><td>6</td></tr>'+
    '<tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Oktettwerte von links: <strong>128 &middot; 192 &middot; 224 &middot; 240 &middot; 248 &middot; 252 &middot; 254 &middot; 255</strong> &nbsp;|&nbsp; Blockgröße = 256 &minus; Maskenwert &nbsp;|&nbsp; Hosts = 2^(Hostbits) &minus; 2 &nbsp;|&nbsp; Subnetze = 2^(zusätzliche Netzbits)</p></div>';

  s += '<div class="sheet-section"><h2>IP-Adressen kompakt</h2><table class="lesson-table"><tr><th>Adresse / Präfix</th><th>Bedeutung</th></tr>'+
    '<tr><td>10.0.0.0/8 &middot; 172.16.0.0/12 &middot; 192.168.0.0/16</td><td>private IPv4-Bereiche (RFC 1918), nicht routbar</td></tr>'+
    '<tr><td>127.0.0.1 / ::1</td><td>Loopback</td></tr>'+
    '<tr><td>169.254.x.x</td><td>APIPA &ndash; kein DHCP-Server erreichbar</td></tr>'+
    '<tr><td>fe80::/10</td><td>IPv6 Link-Local, selbst erzeugt, nicht routbar</td></tr>'+
    '<tr><td>2000::/3</td><td>IPv6 Global Unicast</td></tr>'+
    '<tr><td>fc00::/7</td><td>IPv6 Unique Local (privat)</td></tr>'+
    '<tr><td>ff00::/8</td><td>IPv6 Multicast &ndash; IPv6 kennt keinen Broadcast</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">IPv6: 128 Bit = 8 Blöcke à 4 Hex-Ziffern. Erste 64 Bit Präfix, letzte 64 Bit Interface-ID. <code>::</code> nur einmal. Teilnetze = 2^n <strong>ohne</strong> Abzug.</p></div>';

  s += '<div class="sheet-section"><h2>OSI-Modell</h2><table class="lesson-table"><tr><th>Nr</th><th>Schicht</th><th>Einheit</th><th>Adresse</th><th>Geräte / Protokolle</th></tr>'+
    '<tr><td>7</td><td>Anwendung</td><td>Daten</td><td>&mdash;</td><td>HTTP(S), FTP, SMTP, DNS, DHCP, SSH</td></tr>'+
    '<tr><td>6</td><td>Darstellung</td><td>&mdash;</td><td>&mdash;</td><td>Kodierung, Kompression, TLS</td></tr>'+
    '<tr><td>5</td><td>Sitzung</td><td>&mdash;</td><td>&mdash;</td><td>Verbindungsauf-/-abbau</td></tr>'+
    '<tr><td>4</td><td>Transport</td><td>Segmente</td><td>Port</td><td>TCP, UDP</td></tr>'+
    '<tr><td>3</td><td>Vermittlung</td><td>Pakete</td><td>IP</td><td>Router, IPv4/IPv6, ICMP</td></tr>'+
    '<tr><td>2</td><td>Sicherung</td><td>Frames</td><td>MAC</td><td>Switch, Ethernet, ARP, WLAN</td></tr>'+
    '<tr><td>1</td><td>Bitübertragung</td><td>Bits</td><td>&mdash;</td><td>Kabel, Stecker, Hub, Repeater</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Von unten: <em>Bitte Schicke Verpackung Trotzdem Sofort Dorthin Ab.</em> &nbsp;|&nbsp; Ports: 21 FTP &middot; 22 SSH &middot; 25 SMTP &middot; 53 DNS &middot; 67/68 DHCP &middot; 80 HTTP &middot; 110 POP3 &middot; 143 IMAP &middot; 443 HTTPS &middot; 3389 RDP</p></div>';

  s += '<div class="sheet-section"><h2>UML &ndash; Pfeile und Zeichen</h2><table class="lesson-table"><tr><th>Element</th><th>Darstellung</th><th>Richtung / Lesart</th></tr>'+
    '<tr><td>&laquo;include&raquo;</td><td>gestrichelter Pfeil</td><td>vom einschließenden zum eingeschlossenen Fall &ndash; läuft <strong>immer</strong> mit</td></tr>'+
    '<tr><td>&laquo;extend&raquo;</td><td>gestrichelter Pfeil</td><td>vom erweiternden zum erweiterten Fall &ndash; nur <strong>bedingt</strong></td></tr>'+
    '<tr><td>Generalisierung</td><td>Linie, geschlossene leere Dreieckspitze</td><td>vom Speziellen zum Allgemeinen</td></tr>'+
    '<tr><td>Realisierung</td><td>gestrichelt, Dreieckspitze</td><td>implementiert</td></tr>'+
    '<tr><td>Aggregation</td><td><strong>leere</strong> Raute</td><td>&bdquo;hat ein&ldquo; &ndash; Teil überlebt das Ganze</td></tr>'+
    '<tr><td>Komposition</td><td><strong>gefüllte</strong> Raute</td><td>&bdquo;besteht aus&ldquo; &ndash; Teil stirbt mit dem Ganzen</td></tr>'+
    '<tr><td>Sichtbarkeit</td><td>+ public &nbsp; &minus; private &nbsp; # protected &nbsp; ~ package</td><td>Attribut: <code>name: Typ</code>, Methode: <code>name(p): Typ</code></td></tr>'+
    '<tr><td>Multiplizität</td><td>1 &middot; 0..1 &middot; * &middot; 1..*</td><td>am Linienende</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Strukturdiagramme: Klassen-, Komponentendiagramm. Verhaltensdiagramme: Use-Case, Aktivität, Sequenz, Zustand.</p></div>';

  s += '<div class="sheet-section"><h2>ER-Modell &amp; Normalisierung</h2><table class="lesson-table"><tr><th>Begriff</th><th>Kurzfassung</th></tr>'+
    '<tr><td>Chen-Notation</td><td>Rechteck = Entität &middot; Raute = Beziehung &middot; Oval = Attribut &middot; unterstrichen = Schlüssel</td></tr>'+
    '<tr><td>1:1</td><td>beide Seiten genau eine &ndash; Fremdschlüssel auf einer Seite</td></tr>'+
    '<tr><td>1:n</td><td>Fremdschlüssel auf der <strong>n</strong>-Seite</td></tr>'+
    '<tr><td>n:m</td><td>eigene <strong>Zwischentabelle</strong> mit beiden Fremdschlüsseln</td></tr>'+
    '<tr><td>1. NF</td><td>alle Attribute atomar, keine Wiederholgruppen</td></tr>'+
    '<tr><td>2. NF</td><td>1. NF + volle funktionale Abhängigkeit vom <em>gesamten</em> Schlüssel</td></tr>'+
    '<tr><td>3. NF</td><td>2. NF + keine transitiven Abhängigkeiten (Nichtschlüssel &rarr; Nichtschlüssel)</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Anomalien: Einfüge-, Änderungs-, Löschanomalie. Notation relational: <code>Tabelle(<u>PK</u>, Attribut, #FK)</code></p></div>';

  s += '<div class="sheet-section"><h2>SQL &ndash; Reihenfolge und Muster</h2>'+codeBlock(
    "-- Schreibreihenfolge:\n"+
    "SELECT spalten          -- 5.\n"+
    "FROM   tabelle          -- 1.\n"+
    "JOIN   andere ON ...    -- 2.\n"+
    "WHERE  bedingung        -- 3.  filtert EINZELZEILEN (vor Gruppierung)\n"+
    "GROUP BY spalte         -- 4.\n"+
    "HAVING aggregat > x     -- 6.  filtert GRUPPEN (nach Gruppierung)\n"+
    "ORDER BY spalte DESC    -- 7.\n"+
    "LIMIT  n;               -- 8.\n\n"+
    "-- Aggregatfunktionen: COUNT() SUM() AVG() MIN() MAX()\n"+
    "SELECT abteilung, COUNT(*) AS anzahl, AVG(gehalt) AS schnitt\n"+
    "FROM   mitarbeiter\n"+
    "GROUP BY abteilung\n"+
    "HAVING COUNT(*) > 3;\n\n"+
    "-- JOIN-Arten\n"+
    "INNER JOIN  -- nur Treffer in beiden Tabellen\n"+
    "LEFT  JOIN  -- alle links, rechts ggf. NULL\n"+
    "RIGHT JOIN  -- alle rechts\n"+
    "FULL  JOIN  -- alle beider Seiten\n\n"+
    "-- Falle: WHERE auf die rechte Tabelle macht aus LEFT JOIN ein INNER JOIN.\n"+
    "-- Richtig: Bedingung in die ON-Klausel, oder IS NULL pruefen.\n\n"+
    "-- NULL niemals mit = vergleichen:\n"+
    "WHERE spalte IS NULL        -- richtig\n"+
    "WHERE spalte = NULL         -- liefert nie ein Ergebnis"
  )+'<p style="font-size:.8rem;color:var(--text-dim);">DDL: CREATE, ALTER, DROP &middot; DML: SELECT, INSERT, UPDATE, DELETE &middot; DCL: GRANT, REVOKE &middot; TCL: COMMIT, ROLLBACK</p></div>';

  s += '<div class="sheet-section"><h2>Pseudocode &amp; Kontrollstrukturen</h2>'+codeBlock(
    "Zuweisung        x <- 5        bzw.  x := 5\n"+
    "Verzweigung      WENN bed DANN ... SONST ... ENDEWENN\n"+
    "Zaehlschleife    FUER i VON 1 BIS n TUE ... ENDEFUER\n"+
    "Kopfgesteuert    SOLANGE bed TUE ... ENDESOLANGE     (0 x moeglich)\n"+
    "Fussgesteuert    WIEDERHOLE ... BIS bed              (mind. 1 x)\n"+
    "Funktion         FUNKTION name(p) ... GIB wert ZURUECK ENDEFUNKTION\n\n"+
    "Operatoren       =  <>  <  >  <=  >=     UND  ODER  NICHT\n"+
    "MOD = Rest der Division      7 MOD 3 = 1   (gerade: x MOD 2 = 0)\n"+
    "DIV = ganzzahlige Division   7 DIV 3 = 2\n\n"+
    "Array            feld[0] ist das ERSTE Element,\n"+
    "                 feld[laenge-1] das letzte  ->  Off-by-one-Falle"
  )+'<p style="font-size:.8rem;color:var(--text-dim);">Wahrheitstabelle: UND nur wahr, wenn <em>beide</em> wahr. ODER falsch nur, wenn <em>beide</em> falsch. De Morgan: NICHT(A UND B) = NICHT A ODER NICHT B.</p></div>';

  s += '<div class="sheet-section"><h2>Komplexität &amp; Verfahren</h2><table class="lesson-table"><tr><th>Verfahren</th><th>Komplexität</th><th>Vergleiche / Hinweis</th></tr>'+
    '<tr><td>Lineare Suche</td><td>O(n)</td><td>n/2 im Schnitt, unsortiert möglich</td></tr>'+
    '<tr><td>Binäre Suche</td><td>O(log n)</td><td>log&#8322;(n) Schritte &ndash; setzt <strong>sortiert</strong> voraus</td></tr>'+
    '<tr><td>Bubble-/Selection-/Insertion-Sort</td><td>O(n&sup2;)</td><td>max. n&middot;(n&minus;1)/2 Vergleiche</td></tr>'+
    '<tr><td>Quick-/Merge-Sort</td><td>O(n&middot;log n)</td><td>Teile und herrsche</td></tr>'+
    '<tr><td>Hash-Zugriff</td><td>O(1)</td><td>konstant</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">log&#8322;: 8&rarr;3 &middot; 16&rarr;4 &middot; 32&rarr;5 &middot; 64&rarr;6 &middot; 128&rarr;7 &middot; 256&rarr;8 &middot; 1024&rarr;10 &middot; 1.000.000&rarr;ca. 20</p></div>';

  s += '<div class="sheet-section"><h2>Kaufmännische Formeln</h2>'+codeBlock(
    "BEZUGSKALKULATION\n"+
    "    Listeneinkaufspreis\n"+
    "  - Liefererrabatt\n"+
    "  = Zieleinkaufspreis\n"+
    "  - Liefererskonto      (vom Zieleinkaufspreis!)\n"+
    "  = Bareinkaufspreis\n"+
    "  + Bezugskosten        (kein Skonto darauf)\n"+
    "  = BEZUGSPREIS / Einstandspreis\n\n"+
    "UMSATZSTEUER\n"+
    "  netto -> brutto :  netto x 1,19\n"+
    "  brutto -> netto :  brutto / 1,19\n"+
    "  enthaltene USt  :  brutto x 19 / 119     (NICHT brutto x 0,19)\n\n"+
    "AMORTISATION\n"+
    "  Dauer = Investitionssumme / jaehrlicher Rueckfluss\n"+
    "  0,5 Jahre = 6 Monate   |   0,25 = 3 Monate\n\n"+
    "RATENDARLEHEN (Tilgung konstant, Zinsen sinken)\n"+
    "  Tilgung = Darlehen / Laufzeit\n"+
    "  Zinsen  = RESTSCHULD x Zinssatz x Monate/12\n"+
    "  Rate    = Tilgung + Zinsen\n\n"+
    "NUTZWERTANALYSE\n"+
    "  Teilnutzwert  = Punkte x Gewichtung\n"+
    "  Gesamtnutzwert = Summe der Teilnutzwerte\n"+
    "  Probe: Summe der Gewichtungen = 100 %\n\n"+
    "PERT-SCHAETZUNG\n"+
    "  tE = (optimistisch + 4 x wahrscheinlich + pessimistisch) / 6\n\n"+
    "DREISATZ / PROZENT\n"+
    "  Prozentwert = Grundwert x Prozentsatz / 100\n"+
    "  Grundwert   = Prozentwert x 100 / Prozentsatz"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Einheiten &amp; Übertragung</h2>'+codeBlock(
    "1 Byte = 8 Bit          Datenmenge in BYTE (B), Datenrate in BIT/s (b)\n\n"+
    "Dezimal (SI)            Binaer (IEC)\n"+
    "  1 kB = 10^3 = 1.000     1 KiB = 2^10 = 1.024\n"+
    "  1 MB = 10^6             1 MiB = 2^20 = 1.048.576\n"+
    "  1 GB = 10^9             1 GiB = 2^30\n"+
    "  1 TB = 10^12            1 TiB = 2^40\n\n"+
    "UEBERTRAGUNGSDAUER\n"+
    "  t = Datenmenge / Datenrate\n"+
    "  1. Menge in Bit (x 8)   2. Rate in Bit/s   3. teilen   4. umrechnen\n"+
    "  Bei \"x % effektiver Auslastung\": erst Rate reduzieren, dann teilen.\n\n"+
    "VERFUEGBARKEIT\n"+
    "  V = (Gesamtzeit - Ausfallzeit) / Gesamtzeit x 100 %\n"+
    "  1 Jahr = 8.760 h = 525.600 min\n"+
    "  99,9 % -> max. 8,76 h Ausfall/Jahr   99,99 % -> 52,6 min\n\n"+
    "ENERGIE\n"+
    "  kWh = Watt x Stunden / 1.000\n"+
    "  Wirkungsgrad  = abgegeben / zugefuehrt x 100 %\n"+
    "  PUE (Rechenzentrum) = Gesamtenergie / IT-Energie   (ideal 1,0)\n\n"+
    "RAID-Nutzkapazitaet\n"+
    "  RAID 0 : n x Groesse       RAID 1 : 50 %\n"+
    "  RAID 5 : (n-1) x Groesse   RAID 6 : (n-2) x Groesse   RAID 10 : 50 %"
  )+'</div>';

  s += '<div class="sheet-section"><h2>IT-Sicherheit &amp; Datenschutz</h2><table class="lesson-table"><tr><th>Stichwort</th><th>Merksatz</th></tr>'+
    '<tr><td>Schutzziele</td><td><strong>V</strong>ertraulichkeit &middot; <strong>I</strong>ntegrität &middot; <strong>V</strong>erfügbarkeit (+ Authentizität, Verbindlichkeit)</td></tr>'+
    '<tr><td>Verschlüsseln</td><td>mit dem <strong>öffentlichen</strong> Schlüssel des <strong>Empfängers</strong> &rarr; Vertraulichkeit</td></tr>'+
    '<tr><td>Signieren</td><td>mit dem <strong>privaten</strong> Schlüssel des <strong>Senders</strong> &rarr; Authentizität + Integrität</td></tr>'+
    '<tr><td>Hybrid (TLS)</td><td>asymmetrisch den Sitzungsschlüssel tauschen, dann symmetrisch (AES) übertragen</td></tr>'+
    '<tr><td>Backup 3-2-1</td><td>3 Kopien &middot; 2 Medientypen &middot; 1 außer Haus bzw. offline</td></tr>'+
    '<tr><td>Sicherungsarten</td><td>voll &middot; differenziell (seit letzter <em>Voll</em>) &middot; inkrementell (seit letzter <em>beliebiger</em>)</td></tr>'+
    '<tr><td>Virus vs. Wurm</td><td>Virus braucht Wirt + Benutzeraktion, Wurm verbreitet sich selbstständig</td></tr>'+
    '<tr><td>SQL-Injection</td><td>Gegenmittel: Prepared Statements mit Parametern + Eingabevalidierung</td></tr>'+
    '<tr><td>DSGVO-Fristen</td><td>Datenpanne binnen <strong>72 h</strong> melden &middot; Bußgeld bis 20 Mio. &euro; oder 4 % Jahresumsatz</td></tr>'+
    '<tr><td>DSGVO-Grundsätze</td><td>Zweckbindung &middot; Datenminimierung &middot; Speicherbegrenzung &middot; Richtigkeit &middot; Transparenz</td></tr>'+
    '<tr><td>RTO / RPO</td><td>RTO = maximale Ausfall<em>dauer</em> &middot; RPO = maximaler Daten<em>verlust</em> in Zeit</td></tr></table></div>';

  s += '<div class="sheet-section"><h2>Zahlensysteme</h2>'+codeBlock(
    "Stellenwerte binaer:  128  64  32  16   8   4   2   1\n\n"+
    "Hex-Tabelle (4 Bit = 1 Hex-Ziffer):\n"+
    "  0=0000  1=0001  2=0010  3=0011   4=0100  5=0101  6=0110  7=0111\n"+
    "  8=1000  9=1001  A=1010  B=1011   C=1100  D=1101  E=1110  F=1111\n\n"+
    "Subnetzmasken binaer:\n"+
    "  128=10000000  192=11000000  224=11100000  240=11110000\n"+
    "  248=11111000  252=11111100  254=11111110  255=11111111\n\n"+
    "ASCII 7 Bit = 128 Zeichen | UTF-8 variabel 1-4 Byte, Umlaut = 2 Byte"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Projekt, Vertrag &amp; Vorgehen</h2><table class="lesson-table"><tr><th>Begriff</th><th>Kurzfassung</th></tr>'+
    '<tr><td>Lastenheft</td><td><strong>Auftraggeber</strong> &ndash; WAS und WOFÜR, lösungsneutral</td></tr>'+
    '<tr><td>Pflichtenheft</td><td><strong>Auftragnehmer</strong> &ndash; WIE und WOMIT, wird Vertragsbestandteil</td></tr>'+
    '<tr><td>Projektmerkmale</td><td>Ziel &middot; Zeit &middot; Ressourcen &middot; Organisation &middot; Einmaligkeit &middot; Komplexität</td></tr>'+
    '<tr><td>SMART</td><td>Spezifisch &middot; Messbar &middot; Akzeptiert &middot; Realistisch &middot; Terminiert</td></tr>'+
    '<tr><td>Magisches Dreieck</td><td>Zeit &ndash; Kosten &ndash; Qualität</td></tr>'+
    '<tr><td>Scrum</td><td>Product Owner (Was) &middot; Scrum Master (Prozess) &middot; Team (Wie)</td></tr>'+
    '<tr><td>Review vs. Retro</td><td>Review = Produkt &middot; Retrospektive = Zusammenarbeit</td></tr>'+
    '<tr><td>V-Modell</td><td>Anforderung&harr;Abnahmetest &middot; Grobentwurf&harr;Systemtest &middot; Feinentwurf&harr;Integrationstest &middot; Code&harr;Unit-Test</td></tr>'+
    '<tr><td>Werkvertrag</td><td>Erfolg geschuldet (Individualsoftware, Abnahme)</td></tr>'+
    '<tr><td>Dienstvertrag</td><td>Tätigkeit geschuldet (Beratung, Support)</td></tr>'+
    '<tr><td>Gewährleistung</td><td>gesetzlich, 2 Jahre, gegen den <strong>Verkäufer</strong></td></tr>'+
    '<tr><td>Garantie</td><td>freiwillig, meist vom <strong>Hersteller</strong></td></tr>'+
    '<tr><td>Mangel: Reihenfolge</td><td>1. Nacherfüllung &rarr; 2. Rücktritt / Minderung / Schadenersatz</td></tr></table></div>';

  s += '<div class="sheet-section"><h2>Künstliche Intelligenz</h2><table class="lesson-table"><tr><th>Stichwort</th><th>Merksatz</th></tr>'+
    '<tr><td>Einordnung</td><td>Deep Learning &sub; maschinelles Lernen &sub; Künstliche Intelligenz</td></tr>'+
    '<tr><td>Überwacht</td><td>Trainingsdaten <strong>mit Label</strong> &rarr; Klassifikation (Kategorie) oder Regression (Zahl)</td></tr>'+
    '<tr><td>Unüberwacht</td><td><strong>ohne Label</strong> &rarr; Clustering, Anomalieerkennung</td></tr>'+
    '<tr><td>Bestärkend</td><td>Belohnung und Bestrafung &rarr; Handlungsstrategie</td></tr>'+
    '<tr><td>Overfitting</td><td>Training gut, Test schlecht &ndash; auswendig gelernt</td></tr>'+
    '<tr><td>Underfitting</td><td>beides schlecht &ndash; Modell zu einfach</td></tr>'+
    '<tr><td>Bias</td><td>Verzerrung aus den Trainingsdaten, wird vom Modell verstärkt</td></tr>'+
    '<tr><td>Datenaufteilung</td><td>ca. 70 % Training &middot; 15 % Validierung &middot; 15 % Test</td></tr>'+
    '<tr><td>Halluzination</td><td>erfundene, aber plausibel formulierte Aussage eines Sprachmodells</td></tr>'+
    '<tr><td>RAG vs. Fine-Tuning</td><td>RAG ändert <em>worüber</em>, Fine-Tuning ändert <em>wie</em> das Modell antwortet</td></tr>'+
    '<tr><td>Datenvorbereitung</td><td>60&ndash;80 % des Aufwands eines KI-Projekts</td></tr>'+
    '<tr><td>Model Drift</td><td>Trefferquote sinkt, weil sich die Realität ändert &rarr; nachtrainieren</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>AI Act &ndash; vier Risikoklassen:</strong> unannehmbar = <em>verboten</em> (Social Scoring, Emotionserkennung am Arbeitsplatz) &middot; hoch = <em>Auflagen</em> inkl. menschlicher Aufsicht (Bewerberauswahl, Kredit, Medizin) &middot; begrenzt = <em>Transparenzpflicht</em> (Chatbot, Deepfake) &middot; minimal = <em>keine Auflagen</em> (Spamfilter).<br><strong>Recht:</strong> Art. 22 DSGVO &ndash; keine rein automatisierte Entscheidung mit erheblicher Wirkung &middot; Art. 28 AVV bei externen Diensten &middot; &sect; 87 BetrVG bei Leistungs- und Verhaltenskontrolle &middot; KI-Ergebnis ohne menschliche Schöpfung = <strong>kein</strong> Urheberrechtsschutz.</p></div>';

  s += '<div class="sheet-section"><h2>Objektorientierung kompakt</h2><table class="lesson-table"><tr><th>Begriff</th><th>Kurzfassung</th></tr>'+
    '<tr><td>Klasse</td><td>Bauplan, existiert <strong>einmal</strong> im Quelltext</td></tr>'+
    '<tr><td>Objekt / Instanz</td><td>konkrete Ausprägung zur Laufzeit, beliebig oft, eigene Attributwerte</td></tr>'+
    '<tr><td>Attribut</td><td>Eigenschaft, h&auml;lt den <em>Zustand</em></td></tr>'+
    '<tr><td>Methode</td><td><em>Verhalten</em>, geh&ouml;rt zur Klasse, existiert einmal im Speicher</td></tr>'+
    '<tr><td><strong>Kapselung</strong></td><td>Attribute <code>private</code>, Zugriff nur &uuml;ber Methoden &ndash; erlaubt Validierung</td></tr>'+
    '<tr><td><strong>Vererbung</strong></td><td>&bdquo;ist ein&ldquo; &ndash; Gemeinsames einmal in der Oberklasse</td></tr>'+
    '<tr><td><strong>Polymorphie</strong></td><td>gleicher Aufruf, unterschiedliches Verhalten je nach Objekttyp</td></tr>'+
    '<tr><td>Abstraktion</td><td>nur die relevanten Eigenschaften modellieren</td></tr>'+
    '<tr><td>&Uuml;berschreiben</td><td>Unterklasse ersetzt geerbte Methode, <strong>gleiche</strong> Signatur</td></tr>'+
    '<tr><td>&Uuml;berladen</td><td>gleicher Name, <strong>andere</strong> Parameterliste, selbe Klasse</td></tr>'+
    '<tr><td>abstrakte Klasse</td><td>nicht instanziierbar, gibt Struktur und Pflichtmethoden vor</td></tr>'+
    '<tr><td>Interface</td><td>reiner Vertrag, kein Zustand, <strong>beliebig viele</strong> pro Klasse</td></tr>'+
    '<tr><td>Konstruktor</td><td>Klassenname, <strong>kein</strong> R&uuml;ckgabetyp, stellt g&uuml;ltigen Startzustand her</td></tr>'+
    '<tr><td>statisch</td><td>geh&ouml;rt zur Klasse, nicht zum Objekt, in UML <u>unterstrichen</u></td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>Entscheidungstests:</strong> <em>Ist ein</em> &rarr; Vererbung &middot; <em>hat ein</em> &rarr; Aggregation. Objekt in eine zweite Variable zuweisen kopiert die <strong>Referenz</strong>, nicht das Objekt. Statische Methode kann <strong>nicht</strong> auf Instanzattribute zugreifen. Ziel: <strong>hohe Koh&auml;sion, lose Kopplung</strong>.</p></div>';

  s += '<div class="sheet-section"><h2>Netzwerkgrundlagen</h2><table class="lesson-table"><tr><th></th><th>MAC-Adresse</th><th>IP-Adresse</th></tr>'+
    '<tr><td>Schicht / L&auml;nge</td><td>2 &middot; 48 Bit hexadezimal</td><td>3 &middot; 32 Bit (v4) bzw. 128 Bit (v6)</td></tr>'+
    '<tr><td>Vergabe</td><td>Hersteller (erste 3 Byte = OUI)</td><td>Netzbetreiber, ortsabh&auml;ngig</td></tr>'+
    '<tr><td>Reichweite</td><td>nur lokales Segment</td><td>netz&uuml;bergreifend routbar</td></tr>'+
    '<tr><td>Beim Hop</td><td><strong>wechselt</strong> bei jedem Router</td><td><strong>bleibt</strong> bis zum Ziel</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">F&uuml;r Ziele au&szlig;erhalb des eigenen Netzes l&ouml;st der Rechner per ARP die MAC des <strong>Gateways</strong> auf, nie die des Zielservers.</p>'+
    codeBlock(
    "KAPSELUNG - die Einheit je Schicht (PDU)\n"+
    "  7-5 Daten   |  4 Segment (TCP) / Datagramm (UDP)\n"+
    "  3   Paket   |  2 Frame  |  1 Bits\n\n"+
    "  Jede Schicht legt ihren Header davor, Schicht 2 zusaetzlich\n"+
    "  eine Pruefsumme dahinter. Empfaenger packt rueckwaerts aus.\n\n"+
    "OVERHEAD im Ethernet\n"+
    "  MTU 1.500 Byte  -  20 IP  -  20 TCP  =  1.460 Byte Nutzdaten\n"+
    "  Mit Rahmen, Praeambel und Paketabstand: 1.538 Byte je Frame\n"+
    "  -> rund 5 % Overhead. Deshalb nie die volle Nennrate.\n\n"+
    "DOMAENEN\n"+
    "  Switch trennt KOLLISIONSdomaenen  (jeder Port eine eigene)\n"+
    "  Router trennt BROADCASTdomaenen   (logisch auch ein VLAN)\n"+
    "  Hub    trennt gar nichts\n\n"+
    "UEBERTRAGUNGSARTEN\n"+
    "  Unicast   einer      | Broadcast  alle im Segment (ff:ff:...)\n"+
    "  Multicast Gruppe     | Anycast    der naechstgelegene\n"+
    "  IPv6 kennt KEINEN Broadcast.\n\n"+
    "PORTBEREICHE\n"+
    "  0 - 1023      Well Known   (Standarddienste)\n"+
    "  1024 - 49151  Registered\n"+
    "  49152 - 65535 Dynamic      (Quellports der Clients)\n"+
    "  Socket = IP + Port. Verbindung = Quell-IP/Port + Ziel-IP/Port.\n\n"+
    "NETZARTEN   PAN < LAN/WLAN < MAN < WAN\n"+
    "PEER-TO-PEER braucht n x (n-1) / 2 Beziehungen -> ab ca. 10\n"+
    "Arbeitsplaetzen Client-Server (zentrale Konten und Sicherung)."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Verkabelung &amp; &Uuml;bertragungsmedien</h2><table class="lesson-table"><tr><th>Kategorie</th><th>Frequenz</th><th>Datenrate</th><th>L&auml;nge</th></tr>'+
    '<tr><td>Cat 5e</td><td>100 MHz</td><td>1 Gbit/s</td><td>100 m</td></tr>'+
    '<tr><td>Cat 6</td><td>250 MHz</td><td>1 Gbit/s (10 nur bis 55 m)</td><td>100 m</td></tr>'+
    '<tr><td><strong>Cat 6a</strong></td><td>500 MHz</td><td><strong>10 Gbit/s</strong></td><td>100 m</td></tr>'+
    '<tr><td>Cat 7</td><td>600 MHz</td><td>10 Gbit/s</td><td>100 m</td></tr>'+
    '<tr><td>Cat 8</td><td>2.000 MHz</td><td>25&ndash;40 Gbit/s</td><td>30 m</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>Die 100-m-Regel:</strong> 90 m Verlegekabel + 2 &times; 5 m Patchkabel. Schirmung: U/UTP ungeschirmt &middot; F/UTP Folie &middot; <strong>S/FTP</strong> Geflecht + Folie je Paar (bei Maschinen, Motoren, Leuchtstofflampen).</p>'+
    codeBlock(
    "GLASFASER\n"+
    "  Multimode   Kern 50/62,5 um, LED     bis ca.  550 m  im Gebaeude\n"+
    "  Singlemode  Kern 9 um,      Laser    viele Kilometer  zwischen Standorten\n"+
    "  Vorteile: keine EMV-Stoerung, galvanische Trennung (Blitz!),\n"+
    "            abhoersicher, grosse Reichweite\n\n"+
    "POE - Leistung AM ENDGERAET\n"+
    "  802.3af  PoE     12,95 W   | 802.3at  PoE+    25,5 W\n"+
    "  802.3bt  Typ 3   51 W      | 802.3bt  Typ 4   71 W\n"+
    "  ACHTUNG: Das PoE-BUDGET des Switches begrenzt die Summe.\n"+
    "  24 Ports heisst nicht 24 x PoE+.\n\n"+
    "STRUKTURIERTE VERKABELUNG (EN 50173)\n"+
    "  Primaer    zwischen Gebaeuden        Singlemode-LWL\n"+
    "  Sekundaer  Steigbereich im Gebaeude  meist Multimode-LWL\n"+
    "  Tertiaer   Etage bis Anschlussdose   Kupfer, max. 90 m\n\n"+
    "MEDIENWAHL - die drei Signalwoerter\n"+
    "  ueber 100 m          -> Glasfaser\n"+
    "  Stoerquellen         -> Schirmung oder Glasfaser\n"+
    "  keine Steckdose      -> PoE"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Hardware &amp; Dimensionierung</h2><table class="lesson-table"><tr><th>Schnittstelle</th><th>Datenrate</th></tr>'+
    '<tr><td>USB 2.0</td><td>480 Mbit/s</td></tr>'+
    '<tr><td>USB 3.2 Gen 1 (fr&uuml;her 3.0)</td><td>5 Gbit/s</td></tr>'+
    '<tr><td>USB 3.2 Gen 2</td><td>10 Gbit/s</td></tr>'+
    '<tr><td>USB4 / Thunderbolt 4</td><td>40 Gbit/s</td></tr>'+
    '<tr><td>SATA III</td><td>6 Gbit/s (ca. 550 MB/s netto)</td></tr>'+
    '<tr><td>NVMe / PCIe 3.0 &times;4</td><td>ca. 3.500 MB/s</td></tr>'+
    '<tr><td>NVMe / PCIe 4.0 &times;4</td><td>ca. 7.000 MB/s</td></tr>'+
    '<tr><td>HDMI 2.1 / DisplayPort 1.4</td><td>48 / 32,4 Gbit/s</td></tr>'+
    '<tr><td>Gigabit- / 10-Gigabit-Ethernet</td><td>1 / 10 Gbit/s</td></tr></table>'+
    codeBlock(
    "NETZTEIL DIMENSIONIEREN\n"+
    "  Alle Leistungsaufnahmen addieren + 20 bis 30 % Reserve.\n"+
    "  Grund: Lastspitzen, Aufruestung, bester Wirkungsgrad\n"+
    "  bei etwa halber Auslastung. 80 PLUS Gold ~ 90 %.\n\n"+
    "USV - die Einheitenfalle\n"+
    "  W = VA x Leistungsfaktor   (haeufig 0,6 bis 0,9)\n"+
    "  1.000-VA-USV liefert bei 0,7 nur 700 W!\n"+
    "  Offline (Standby) | Line-interactive | Online (unterbrechungsfrei)\n\n"+
    "RAID - Nutzkapazitaet und Ausfallsicherheit\n"+
    "  RAID 0   n x Groesse    0 Ausfaelle   nur Tempo\n"+
    "  RAID 1   50 %           1 Ausfall     Spiegel\n"+
    "  RAID 5   (n-1) x Gr.    1 Ausfall     min. 3 Platten\n"+
    "  RAID 6   (n-2) x Gr.    2 Ausfaelle   min. 4 Platten\n"+
    "  RAID 10  50 %           je Spiegel 1  min. 4 Platten\n"+
    "  RAID ist KEIN Backup.\n\n"+
    "ANZEIGE\n"+
    "  Full HD 1920x1080 = 2.073.600 Pixel\n"+
    "  4K UHD  3840x2160 = 8.294.400 Pixel (vierfach)\n"+
    "  24 Bit True Color = 3 Byte je Pixel | 32 Bit = 4 (Alphakanal)\n"+
    "  Speicher je Vollbild = Pixel x Byte je Pixel\n\n"+
    "SPEICHER\n"+
    "  M.2 ist die BAUFORM, NVMe das PROTOKOLL.\n"+
    "  TBW = Schreiblebensdauer der SSD, RPM nur bei der HDD.\n"+
    "  Es begrenzt immer das langsamste Glied der Kette."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Virtualisierung &amp; Cloud</h2><table class="lesson-table"><tr><th>Modell</th><th>Anbieter stellt</th><th>Du verwaltest</th></tr>'+
    '<tr><td><strong>IaaS</strong></td><td>Hardware, Virtualisierung, Netz</td><td>Betriebssystem, Laufzeit, Anwendung, Daten</td></tr>'+
    '<tr><td><strong>PaaS</strong></td><td>zus&auml;tzlich OS und Laufzeit</td><td>Anwendung und Daten</td></tr>'+
    '<tr><td><strong>SaaS</strong></td><td>alles bis zur fertigen Anwendung</td><td>nur Daten und Nutzerkonten</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>Die Daten bleiben in jedem Modell in deiner Verantwortung</strong> &ndash; auch bei SaaS. Der Anbieter ist Auftragsverarbeiter, AVV nach Art. 28 ist Pflicht. Bereitstellung: Public &middot; Private &middot; Hybrid &middot; Community.</p>'+
    codeBlock(
    "HYPERVISOR\n"+
    "  Typ 1 (Bare Metal)  direkt auf der Hardware  Rechenzentrum\n"+
    "  Typ 2 (Hosted)      als Programm im Wirts-OS Entwicklung, Test\n\n"+
    "VM GEGEN CONTAINER\n"+
    "               VM                      Container\n"+
    "  enthaelt     komplettes Gast-OS      nur App + Bibliotheken\n"+
    "  Groesse      mehrere GB              wenige bis hundert MB\n"+
    "  Start        Minuten                 Sekunden\n"+
    "  Isolation    sehr stark              gemeinsamer Kernel\n"+
    "  Merksatz: Die VM virtualisiert die HARDWARE,\n"+
    "            der Container das BETRIEBSSYSTEM.\n\n"+
    "VORTEILE DER VIRTUALISIERUNG\n"+
    "  Konsolidierung, bessere Auslastung, Isolation, Snapshots,\n"+
    "  Live-Migration, schnelle Bereitstellung\n"+
    "RISIKO: Der Host wird zum Single Point of Failure -> Cluster.\n"+
    "Ein SNAPSHOT ist KEIN Backup (liegt auf demselben Speicher).\n\n"+
    "CLOUD-NACHTEILE fuer die Begruendung\n"+
    "  Anbieterabhaengigkeit (Lock-in), Internetzwang, laufende\n"+
    "  Kosten statt einmaliger, weniger Kontrolle, Drittlandtransfer"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Datenschutz in der Praxis</h2><table class="lesson-table"><tr><th></th><th>Datenschutz</th><th>Datensicherheit</th></tr>'+
    '<tr><td>Sch&uuml;tzt</td><td>die <strong>Person</strong></td><td>die <strong>Daten</strong></td></tr>'+
    '<tr><td>Frage</td><td><em>Darf</em> ich verarbeiten?</td><td><em>Wie</em> sch&uuml;tze ich technisch?</td></tr>'+
    '<tr><td>Gilt f&uuml;r</td><td>nur personenbezogene Daten</td><td>alle Daten</td></tr>'+
    '<tr><td>Grundlage</td><td>DSGVO, BDSG</td><td>BSI-Grundschutz, ISO 27001</td></tr></table>'+
    codeBlock(
    "BETROFFENENRECHTE - Artikel und Frist\n"+
    "  15 Auskunft        16 Berichtigung    17 Loeschung\n"+
    "  18 Einschraenkung  20 Uebertragbarkeit 21 Widerspruch\n"+
    "  FRIST: 1 Monat ab Eingang (+2 Monate moeglich, aber die\n"+
    "  Information darueber muss im ersten Monat raus). Kostenlos.\n"+
    "  Vor der Auskunft IDENTITAET PRUEFEN.\n\n"+
    "LOESCHRECHT hat Grenzen\n"+
    "  Rechnungen    10 Jahre (HGB, AO)\n"+
    "  Handelsbriefe  6 Jahre\n"+
    "  Bewerbungen    6 Monate (Klagefrist AGG)\n"+
    "  -> Bei Aufbewahrungspflicht SPERREN statt loeschen.\n\n"+
    "PFLICHTEN und SCHWELLEN\n"+
    "  Art. 30  Verarbeitungsverzeichnis   ab 250 MA, praktisch immer\n"+
    "  Art. 35  Folgenabschaetzung (DSFA)  bei hohem Risiko\n"+
    "  Art. 28  AVV mit Dienstleistern     immer bei Auftragsverarbeitung\n"+
    "  Art. 32  TOM                        immer\n"+
    "  Art. 33  Datenpanne melden          72 STUNDEN\n"+
    "  Art. 22  keine rein automatisierte Entscheidung\n"+
    "  DSB ab 20 Personen mit staendiger automatisierter Verarbeitung\n"+
    "  Bussgeld bis 20 Mio. EUR oder 4 % Jahresumsatz\n"+
    "  § 87 BetrVG: Mitbestimmung bei Leistungs-/Verhaltenskontrolle\n\n"+
    "ANONYM oder PSEUDONYM?\n"+
    "  anonymisiert   Bezug unwiderruflich weg  -> DSGVO gilt NICHT\n"+
    "  pseudonymisiert Bezug ueber Schluessel   -> DSGVO gilt WEITER\n\n"+
    "PRIVATE NUTZUNG VON MAIL UND INTERNET\n"+
    "  verboten und geregelt -> Kontrolle im erforderlichen Umfang\n"+
    "  erlaubt ODER GEDULDET -> Zugriff praktisch ausgeschlossen\n"+
    "  Stillschweigende Duldung wirkt wie eine Erlaubnis!"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Datensicherheit im Betrieb</h2>'+codeBlock(
    "AAA - die vier Schritte\n"+
    "  Identifikation   Wer behauptest du zu sein?   Benutzername\n"+
    "  Authentifizierung Kannst du es beweisen?      Passwort, Token\n"+
    "  Autorisierung    Was darfst du?               Rechte\n"+
    "  Accounting       Was hast du getan?           Protokoll\n\n"+
    "DIE DREI FAKTOREN\n"+
    "  Wissen  (Passwort, PIN)\n"+
    "  Besitz  (Chipkarte, Token, Authenticator-App)\n"+
    "  Sein    (Fingerabdruck, Gesicht, Iris)\n"+
    "  MFA nur bei Faktoren aus VERSCHIEDENEN Kategorien.\n"+
    "  Passwort + Sicherheitsfrage ist KEINE MFA.\n\n"+
    "PASSWOERTER - Stand der Technik (BSI)\n"+
    "  Laenge schlaegt Komplexitaet, min. 12 Zeichen\n"+
    "  KEIN erzwungener Turnuswechsel mehr, nur bei Verdacht\n"+
    "  Speicherung: Hash + Salt mit bcrypt, scrypt oder Argon2\n\n"+
    "BERECHTIGUNGEN\n"+
    "  Need-to-know    nur die noetigen Daten\n"+
    "  Least Privilege nur die geringste noetige Stufe\n"+
    "  RBAC            Rechte an Rollen, Personen an Rollen\n"+
    "  Funktionstrennung: erfassen und freigeben nicht in einer Hand\n"+
    "  Rezertifizierung jaehrlich gegen den Berechtigungsstau\n"+
    "  Offboarding: Konto DEAKTIVIEREN, nicht loeschen\n\n"+
    "HAERTUNG - Angriffsflaeche verkleinern\n"+
    "  Dienste abschalten, Software deinstallieren, Ports schliessen,\n"+
    "  Standardpasswoerter aendern, Rechte minimieren, Protokollierung\n"+
    "  einschalten, unsichere Protokolle aus (Telnet, FTP, SMBv1)\n\n"+
    "SCHWACHSTELLEN\n"+
    "  Schwachstelle  kann ausgenutzt werden\n"+
    "  Exploit        der Code, der es tut\n"+
    "  CVE            weltweit eindeutige Kennung\n"+
    "  CVSS           Schwere 0,0 bis 10,0\n"+
    "  Zero-Day       noch kein Patch verfuegbar\n\n"+
    "  RISIKO = Eintrittswahrscheinlichkeit x Schadenshoehe\n"+
    "  Umgang: vermeiden | vermindern | ueberwaelzen | akzeptieren\n\n"+
    "NOTFALL\n"+
    "  Stoerung < Notfall < Krise < Katastrophe\n"+
    "  RTO  maximale Ausfall DAUER   -> Wiederanlaufverfahren\n"+
    "  RPO  maximaler DATENverlust   -> Sicherungsintervall\n"+
    "  Notfallhandbuch auch AUSGEDRUCKT bereithalten.\n"+
    "  Eine Sicherung ohne getesteten Restore ist keine Sicherung."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Service, Qualit&auml;t &amp; Kommunikation</h2><table class="lesson-table"><tr><th>Begriff</th><th>Ziel</th></tr>'+
    '<tr><td><strong>Incident</strong></td><td>Betrieb schnellstm&ouml;glich wiederherstellen, notfalls Workaround</td></tr>'+
    '<tr><td><strong>Problem</strong></td><td>unbekannte Ursache finden und dauerhaft beseitigen</td></tr>'+
    '<tr><td><strong>Change</strong></td><td>geplante &Auml;nderung kontrolliert durchf&uuml;hren</td></tr>'+
    '<tr><td>Service Request</td><td>Standardanfrage ohne St&ouml;rung erf&uuml;llen</td></tr>'+
    '<tr><td>Known Error</td><td>Problem mit bekannter Ursache und Workaround</td></tr></table>'+
    codeBlock(
    "PRIORITAET = Auswirkung x Dringlichkeit (Matrix)\n\n"+
    "ESKALATION\n"+
    "  funktional (horizontal) -> mehr FACHWISSEN, Second Level\n"+
    "  hierarchisch (vertikal) -> mehr BEFUGNIS, Fuehrungsebene\n\n"+
    "VEREINBARUNGEN\n"+
    "  SLA  mit dem KUNDEN       OLA  INTERN zwischen Abteilungen\n"+
    "  UC   mit dem ZULIEFERER\n"+
    "  Reaktionszeit = Bearbeitung BEGINNT (nicht geloest!)\n"+
    "  Wiederherstellungszeit = Dienst laeuft wieder\n"+
    "  Verfuegbarkeit immer auf die SERVICEZEIT beziehen, wenn genannt\n\n"+
    "KENNZAHLEN\n"+
    "  MTTR  mittlere Reparaturdauer\n"+
    "  MTBF  mittlere Zeit zwischen Ausfaellen\n"+
    "  Verfuegbarkeit = MTBF / (MTBF + MTTR) x 100 %\n"+
    "  Erstloesungsquote First Level: Ziel 60 bis 80 %\n\n"+
    "QUALITAET\n"+
    "  ISO 9000: Qualitaet = Grad der ERFUELLUNG VON ANFORDERUNGEN\n"+
    "  PDCA: Plan - Do - Check - Act, danach von vorn (KVP)\n"+
    "  Check braucht eine MESSBARE Groesse.\n\n"+
    "VIER-OHREN-MODELL (Schulz von Thun)\n"+
    "  Sachinhalt        worueber informiere ich?\n"+
    "  Selbstoffenbarung was gebe ich von mir preis?\n"+
    "  Beziehung         wie stehe ich zu dir?\n"+
    "  Appell            wozu will ich bewegen?\n"+
    "  Im Support bewusst auf dem SACHOHR antworten.\n\n"+
    "FRAGEARTEN\n"+
    "  offen (W-Frage)  oeffnet, bringt Information -> Einstieg\n"+
    "  geschlossen      grenzt ein, bestaetigt\n"+
    "  Alternativfrage  lenkt zur Entscheidung\n"+
    "  Suggestivfrage   vermeiden\n"+
    "  Wichtigster Schritt: ZUSAMMENFASSEN und rueckversichern.\n\n"+
    "ICH-BOTSCHAFT: Wahrnehmung - Wirkung - Wunsch"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Lizenzen &amp; Recht</h2><table class="lesson-table"><tr><th>Modell</th><th>Merkmal</th></tr>'+
    '<tr><td>OEM</td><td>fest an <strong>ein Ger&auml;t</strong> gebunden, erlischt mit ihm</td></tr>'+
    '<tr><td>Retail / Box</td><td>&uuml;bertragbar auf ein anderes Ger&auml;t</td></tr>'+
    '<tr><td>Volumenlizenz</td><td>ab Mindestmenge, zentral verwaltbar</td></tr>'+
    '<tr><td>Subscription</td><td>Miete, endet mit der Zahlung, Updates inklusive</td></tr>'+
    '<tr><td>User-CAL</td><td>je <strong>Person</strong> &ndash; g&uuml;nstiger bei vielen Ger&auml;ten je Person</td></tr>'+
    '<tr><td>Device-CAL</td><td>je <strong>Ger&auml;t</strong> &ndash; g&uuml;nstiger im Schichtbetrieb</td></tr>'+
    '<tr><td>Concurrent</td><td>nur <strong>gleichzeitige</strong> Nutzer</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>Z&auml;hlregel:</strong> Nimm das, wovon es weniger gibt. Mehr Personen als Ger&auml;te &rarr; Device-CAL. Mehr Ger&auml;te als Personen &rarr; User-CAL.</p>'+
    codeBlock(
    "OPEN SOURCE ist NICHT gleich KOSTENLOS\n"+
    "  Open Source  Quellcode offen, aenderbar, weitergebbar\n"+
    "  Freeware     kostenlos, ABER kein Quellcode\n"+
    "  Shareware    Test frei, danach kostenpflichtig\n"+
    "  proprietaer  geschlossen, nur nach Lizenzbedingungen\n\n"+
    "LIZENZFAMILIEN\n"+
    "  Copyleft (GPL, AGPL)   Weitergabe -> eigener Code muss offen\n"+
    "  permissiv (MIT, BSD, Apache 2.0)  auch in geschlossenen Produkten\n"+
    "  Copyleft greift bei WEITERGABE, nicht bei interner Nutzung.\n"+
    "  AGPL: schon die Bereitstellung im Netz gilt als Weitergabe.\n\n"+
    "URHEBERRECHT\n"+
    "  § 69a UrhG  Software ist geschuetzt\n"+
    "  § 69b UrhG  Verwertungsrechte aus dem Arbeitsverhaeltnis\n"+
    "              gehoeren dem ARBEITGEBER\n"+
    "  § 2 Abs. 2  Schutz braucht persoenliche geistige Schoepfung\n"+
    "              -> rein KI-erzeugtes Werk ist NICHT geschuetzt\n\n"+
    "VERTRAGSARTEN\n"+
    "  Werkvertrag   ERFOLG geschuldet   Individualsoftware, Abnahme\n"+
    "  Dienstvertrag TAETIGKEIT          Beratung, Support nach Aufwand\n"+
    "  Kaufvertrag   Standardsoftware, Hardware\n"+
    "  Mietvertrag   SaaS, Cloud\n\n"+
    "ABNAHME - vier Rechtsfolgen\n"+
    "  Verguetung faellig | Gewaehrleistung beginnt\n"+
    "  Gefahruebergang    | Beweislast kehrt sich um\n\n"+
    "Gewaehrleistung 2 Jahre, gesetzlich, gegen den VERKAEUFER.\n"+
    "Garantie freiwillig, meist vom HERSTELLER.\n"+
    "Mangel: erst NACHERFUELLUNG, dann Ruecktritt/Minderung/Schadenersatz."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Struktogramm- und PAP-Symbole</h2>'+codeBlock(
    "STRUKTOGRAMM (Nassi-Shneiderman) - keine Pfeile, keine Spruenge\n\n"+
    "  +--------------------------+\n"+
    "  | Anweisung                |   Sequenz: Bloecke untereinander\n"+
    "  +--------------------------+\n"+
    "  | SOLANGE bedingung        |   kopfgesteuert: Rahmen OBEN\n"+
    "  |  +----------------------+|\n"+
    "  |  | Rumpf                ||\n"+
    "  |  +----------------------+|\n"+
    "  +--------------------------+\n"+
    "  |  +----------------------+|\n"+
    "  |  | Rumpf                ||   fussgesteuert: Rahmen UNTEN\n"+
    "  |  +----------------------+|\n"+
    "  | BIS bedingung            |\n"+
    "  +--------------------------+\n"+
    "  |        bedingung ?       |   Verzweigung: diagonal geteilt\n"+
    "  |   JA     /\\      NEIN    |\n"+
    "  +----------+---------------+\n"+
    "  | Zweig A  | Zweig B       |\n"+
    "  +----------+---------------+\n\n"+
    "PAP nach DIN 66001 - mit Pfeilen\n"+
    "  Oval             Start und Ende\n"+
    "  Parallelogramm   Ein- und Ausgabe\n"+
    "  Rechteck         Verarbeitung\n"+
    "  Raute            Verzweigung (ein Eingang, zwei Ausgaenge)\n"+
    "  Rechteck mit     Unterprogramm\n"+
    "   Doppelstrich\n"+
    "  Kreis            Konnektor\n\n"+
    "Unterschied: Im PAP sind Spruenge zeichenbar, im Struktogramm\n"+
    "nicht - das erzwingt strukturierte Programmierung."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Abk&uuml;rzungen, die in der AP1 vorkommen</h2><table class="lesson-table"><tr><th>K&uuml;rzel</th><th>Bedeutung</th><th>K&uuml;rzel</th><th>Bedeutung</th></tr>'+
    '<tr><td>AVV</td><td>Auftragsverarbeitungsvertrag</td><td>MTU</td><td>Maximum Transmission Unit</td></tr>'+
    '<tr><td>APIPA</td><td>Selbstvergebene 169.254er-Adresse</td><td>MFA</td><td>Mehrfaktor-Authentifizierung</td></tr>'+
    '<tr><td>ARP</td><td>Address Resolution Protocol</td><td>NAS</td><td>Network Attached Storage (Dateien)</td></tr>'+
    '<tr><td>BCM</td><td>Business Continuity Management</td><td>NAT</td><td>Network Address Translation</td></tr>'+
    '<tr><td>BITV</td><td>Barrierefreie-Informationstechnik-Verordnung</td><td>OLA</td><td>Operational Level Agreement</td></tr>'+
    '<tr><td>CAL</td><td>Client Access License</td><td>OUI</td><td>Herstellerkennung der MAC</td></tr>'+
    '<tr><td>CIDR</td><td>Classless Inter-Domain Routing (/24)</td><td>PDU</td><td>Protocol Data Unit</td></tr>'+
    '<tr><td>CVE / CVSS</td><td>Schwachstellenkennung / -bewertung</td><td>PoE</td><td>Power over Ethernet</td></tr>'+
    '<tr><td>DHCP</td><td>Dynamische Adressvergabe (DORA)</td><td>PSP</td><td>Projektstrukturplan</td></tr>'+
    '<tr><td>DSFA</td><td>Datenschutz-Folgenabsch&auml;tzung</td><td>PUE</td><td>Power Usage Effectiveness</td></tr>'+
    '<tr><td>EUI-64</td><td>Interface-ID aus der MAC</td><td>RAG</td><td>Retrieval Augmented Generation</td></tr>'+
    '<tr><td>FAZ / FEZ</td><td>fr&uuml;hester Anfang / Ende</td><td>RBAC</td><td>Role Based Access Control</td></tr>'+
    '<tr><td>SAZ / SEZ</td><td>sp&auml;tester Anfang / Ende</td><td>RTO / RPO</td><td>Ausfalldauer / Datenverlust</td></tr>'+
    '<tr><td>GP / FP</td><td>Gesamt- / freier Puffer</td><td>SAN</td><td>Storage Area Network (Bl&ouml;cke)</td></tr>'+
    '<tr><td>ICMP</td><td>Protokoll hinter ping</td><td>SLAAC</td><td>IPv6-Autokonfiguration</td></tr>'+
    '<tr><td>KVP</td><td>Kontinuierlicher Verbesserungsprozess</td><td>TBW</td><td>Terabytes Written (SSD)</td></tr>'+
    '<tr><td>LWL</td><td>Lichtwellenleiter</td><td>TCO</td><td>Total Cost of Ownership</td></tr>'+
    '<tr><td>MTTR / MTBF</td><td>Reparaturdauer / Zeit zwischen Ausf&auml;llen</td><td>TOM</td><td>technisch-organisatorische Ma&szlig;nahmen</td></tr></table></div>';

  s += '<div class="sheet-section"><h2>Trockenlauf &amp; Fehlersuche</h2>'+codeBlock(
    "TROCKENLAUF - das Verfahren, das immer funktioniert\n"+
    "  1. Tabelle anlegen: eine Spalte je Variable, eine fuer die Zeile\n"+
    "  2. Startwerte eintragen (auch die vor der Schleife!)\n"+
    "  3. Zeile fuer Zeile abarbeiten, NUR geaenderte Werte neu schreiben\n"+
    "  4. Bei jeder Bedingung laut mitsprechen: wahr oder falsch?\n"+
    "  5. Ergebnis unten hinschreiben und gegen die Frage pruefen\n\n"+
    "  Zeile | i | summe | Bedingung | Bemerkung\n"+
    "  ------+---+-------+-----------+------------------\n"+
    "    2   | - |   0   |     -     | Start\n"+
    "    3   | 0 |   0   | 4>5 falsch| Rumpf uebersprungen\n\n"+
    "  Teilpunkte gibt es auf die TABELLE, nicht nur aufs Ergebnis.\n\n"+
    "WAHRHEITSTABELLEN\n"+
    "  A UND B  nur wahr, wenn BEIDE wahr sind\n"+
    "  A ODER B nur falsch, wenn BEIDE falsch sind\n"+
    "  NICHT A  dreht um\n"+
    "  De Morgan:  NICHT(A UND B) = NICHT A ODER NICHT B\n"+
    "              NICHT(A ODER B) = NICHT A UND NICHT B\n\n"+
    "DIE FUENF HAEUFIGSTEN LOGIKFEHLER\n"+
    "  1. Off-by-one      Grenze LAENGE statt LAENGE - 1\n"+
    "  2. Startwert       Maximum auf 0 statt auf feld[0]\n"+
    "  3. Laufvariable    wird im Rumpf nie veraendert -> Endlosschleife\n"+
    "  4. UND / ODER      vertauscht\n"+
    "  5. Zuweisung       = statt Vergleich, oder Tausch ohne Hilfsvariable\n\n"+
    "FEHLERARTEN\n"+
    "  Syntaxfehler  findet der Compiler\n"+
    "  Laufzeitfehler tritt beim Ausfuehren auf (Division durch 0)\n"+
    "  LOGIKFEHLER   Programm laeuft und rechnet falsch -> nur Test\n"+
    "                und Trockenlauf finden ihn"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Testverfahren</h2><table class="lesson-table"><tr><th>Verfahren</th><th>Kenntnis des Codes</th><th>Grundlage</th></tr>'+
    '<tr><td><strong>Black Box</strong></td><td>nein</td><td>Spezifikation, Anforderungen</td></tr>'+
    '<tr><td><strong>White Box</strong></td><td>ja</td><td>innerer Aufbau, Pfade, Verzweigungen</td></tr>'+
    '<tr><td>Grey Box</td><td>teilweise</td><td>Mischform</td></tr></table>'+
    codeBlock(
    "AEQUIVALENZKLASSEN\n"+
    "  Eingaben in Gruppen einteilen, die sich gleich verhalten.\n"+
    "  Je Klasse genuegt EIN Vertreter.\n"+
    "  Beispiel Alter 18 bis 65:\n"+
    "     ungueltig zu klein   ... 17\n"+
    "     gueltig              18 ... 65\n"+
    "     ungueltig zu gross   66 ...\n"+
    "  -> drei Testfaelle, etwa 10, 40, 80\n\n"+
    "GRENZWERTANALYSE - an den Raendern wird es gefaehrlich\n"+
    "  Je Grenze drei Werte: darunter, auf der Grenze, darueber\n"+
    "  Bei 18 bis 65:  17, 18, 19   und   64, 65, 66\n"+
    "  Die meisten Fehler sitzen genau dort (< statt <=).\n\n"+
    "TESTSTUFEN - das V-Modell von unten nach oben\n"+
    "  Unit-Test        einzelne Methode      <-> Implementierung\n"+
    "  Integrationstest Zusammenspiel Module  <-> Feinentwurf\n"+
    "  Systemtest       Gesamtsystem          <-> Grobentwurf\n"+
    "  Abnahmetest      beim Kunden           <-> Anforderungen\n\n"+
    "WEITERE TESTARTEN fuer Nennaufgaben\n"+
    "  Regressionstest  Laeuft das Alte nach der Aenderung noch?\n"+
    "  Lasttest         Verhalten unter erwarteter Last\n"+
    "  Stresstest       Verhalten jenseits der Grenze\n"+
    "  Usability-Test   Bedienbarkeit mit echten Nutzern\n"+
    "  Penetrationstest Angriff auf die eigene Anwendung\n"+
    "  Smoke-Test       laeuft es ueberhaupt an?\n\n"+
    "TESTFALL - was hineingehoert\n"+
    "  Nummer | Vorbedingung | Eingabe | ERWARTETES Ergebnis |\n"+
    "  tatsaechliches Ergebnis | bestanden ja/nein\n"+
    "  Das erwartete Ergebnis steht VOR dem Test fest, nie danach."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Netzdienste &amp; Diagnose</h2>'+codeBlock(
    "DHCP - der Ablauf heisst DORA\n"+
    "  Discover (Broadcast) - Offer - Request - Acknowledge\n"+
    "  Verteilt: IP, Subnetzmaske, Gateway, DNS-Server, Lease-Dauer\n"+
    "  Reservierung bindet eine feste IP an eine MAC-Adresse.\n"+
    "  Ports 67 (Server) und 68 (Client), ueber UDP, Schicht 7.\n\n"+
    "ARP - loest IP zu MAC im lokalen Netz auf\n"+
    "  Request per Broadcast, Reply per Unicast, Cache mit Ablauf.\n"+
    "  Fuer Ziele ausserhalb: MAC des GATEWAYS.\n"+
    "  Unauthentifiziert -> ARP-Spoofing moeglich.\n\n"+
    "DNS - Ressource Records\n"+
    "  A      Name -> IPv4        AAAA  Name -> IPv6\n"+
    "  CNAME  Alias               MX    Mailserver\n"+
    "  PTR    Reverse-Lookup      NS    zustaendiger Nameserver\n"+
    "  TXT    freier Text (SPF)   SOA   Zonenkopf\n"+
    "  Aufloesung: Root -> TLD (.de) -> autoritativer Server\n\n"+
    "WLAN\n"+
    "  WEP gebrochen | WPA veraltet | WPA2 (AES) Mindeststandard | WPA3\n"+
    "  Personal (PSK)    ein Passwort fuer alle\n"+
    "  Enterprise        802.1X mit RADIUS, Konten einzeln sperrbar\n"+
    "  Rollen: Supplicant - Authenticator - Authentication Server\n"+
    "  SSID verstecken und MAC-Filter sind KEINE Sicherheitsmassnahmen.\n\n"+
    "SPEICHER IM NETZ\n"+
    "  DAS  direkt am Server        nur dieser eine Server\n"+
    "  NAS  DATEIEN ueber SMB/NFS   guenstig, viele Clients\n"+
    "  SAN  BLOECKE ueber FC/iSCSI  schnell, fuer Datenbanken und VMs\n\n"+
    "DIAGNOSE - der Werkzeugkasten\n"+
    "  ipconfig /all       eigene Konfiguration inkl. MAC\n"+
    "  ipconfig /release   und  /renew    DHCP neu holen\n"+
    "  ping                Erreichbarkeit (ICMP)\n"+
    "  tracert             jeder Router auf dem Weg\n"+
    "  nslookup            Namensaufloesung pruefen\n"+
    "  arp -a              ARP-Cache anzeigen\n"+
    "  netstat -an         offene Ports und Verbindungen\n"+
    "  getmac /v           MAC-Adressen\n\n"+
    "DIE PING-KASKADE - von innen nach aussen\n"+
    "  127.0.0.1 -> eigene IP -> Gateway -> 8.8.8.8 -> google.de\n"+
    "  Wo es bricht, liegt der Fehler:\n"+
    "  bei 8.8.8.8 ok, Name nicht  -> DNS\n"+
    "  bis eigene IP ok, Gateway nicht -> Kabel, Switch, Maske"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Kostenrechnung &amp; Kennzahlen</h2>'+codeBlock(
    "KOSTENARTEN\n"+
    "  Fixkosten Kf      unabhaengig von der Menge (Miete, AfA, Gehalt)\n"+
    "  variable kv       je Stueck (Material, Lizenz je Nutzer, Toner)\n"+
    "  Gesamtkosten      K = Kf + kv * x\n"+
    "  Stueckkosten      k = K / x\n\n"+
    "DECKUNGSBEITRAG UND BREAK-EVEN\n"+
    "  db = Preis - kv                     je Stueck\n"+
    "  Break-Even  x = Kf / (Preis - kv)\n"+
    "  Ab dem naechsten Stueck entsteht Gewinn.\n\n"+
    "VERFAHRENSVERGLEICH - kritische Menge\n"+
    "  Beide Kostenfunktionen GLEICHSETZEN und nach x aufloesen.\n"+
    "  Kf1 + kv1*x = Kf2 + kv2*x\n"+
    "  Probe mit einer Menge oberhalb und unterhalb machen -\n"+
    "  sonst vertauscht man die Richtung der Empfehlung.\n\n"+
    "ABSCHREIBUNG (linear)\n"+
    "  jaehrliche AfA = (Anschaffung - Restwert) / Nutzungsdauer\n"+
    "  Buchwert sinkt jedes Jahr um diesen Betrag.\n"+
    "  PC und Notebook: betriebsgewoehnlich drei Jahre.\n\n"+
    "AMORTISATION\n"+
    "  Dauer = Investition / jaehrlicher Rueckfluss\n"+
    "  0,25 = 3 Monate | 0,5 = 6 Monate | 0,75 = 9 Monate\n\n"+
    "KENNZAHLEN - die drei, die verwechselt werden\n"+
    "  Produktivitaet     = Ausbringung / Einsatz      MENGENmaessig\n"+
    "  Wirtschaftlichkeit = Ertrag / Aufwand           WERTmaessig, >1 gut\n"+
    "  Rentabilitaet      = Gewinn / Kapital * 100     in PROZENT\n"+
    "  ROI                = Gewinn / Investition * 100\n"+
    "  Auslastungsgrad    = Ist / Soll * 100\n\n"+
    "ABC-ANALYSE - der Schritt, der vergessen wird\n"+
    "  1. Jahresverbrauch x Preis = Jahreswert\n"+
    "  2. absteigend sortieren\n"+
    "  3. Prozentanteil\n"+
    "  4. KUMULIEREN  <- ohne diese Spalte geht es nicht\n"+
    "  5. Grenzen: bis 80 % = A, bis 95 % = B, Rest = C\n"+
    "  A  ~80 % Wert, ~20 % Menge  -> verhandeln\n"+
    "  C  ~ 5 % Wert, ~60 % Menge  -> Sammelbestellung\n\n"+
    "BESCHAFFUNG - die Kette\n"+
    "  Bedarf - Bezugsquellen - Anfrage - Angebotsvergleich -\n"+
    "  Bestellung - Wareneingang - Rechnungspruefung - Zahlung\n\n"+
    "PERT-SCHAETZUNG   tE = (O + 4M + P) / 6\n"+
    "PERSONENTAGE      20 PT bei 2 Personen = 10 Kalendertage,\n"+
    "                  aber nur wenn die Aufgabe teilbar ist."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Arbeitsplatz, Ergonomie &amp; Energie</h2><table class="lesson-table"><tr><th>Anforderung</th><th>Wert</th></tr>'+
    '<tr><td>Blickrichtung zum Fenster</td><td><strong>parallel</strong> &ndash; nicht davor, nicht mit dem R&uuml;cken dazu</td></tr>'+
    '<tr><td>Beleuchtungsst&auml;rke</td><td>mindestens <strong>500 Lux</strong>, blendfrei</td></tr>'+
    '<tr><td>Sehabstand</td><td>50&ndash;80 cm, oberste Zeile <strong>unter</strong> Augenh&ouml;he</td></tr>'+
    '<tr><td>K&ouml;rperhaltung</td><td>Ober-/Unterarm und Ober-/Unterschenkel je etwa 90&deg;</td></tr>'+
    '<tr><td>Tischh&ouml;he</td><td>ca. 72 cm oder h&ouml;henverstellbar</td></tr>'+
    '<tr><td>Fl&auml;che je Arbeitsplatz</td><td>mindestens 8&ndash;10 m&sup2;</td></tr>'+
    '<tr><td>L&auml;rm im B&uuml;ro</td><td>unter 55 dB(A)</td></tr>'+
    '<tr><td>Bildschirm</td><td>entspiegelt, dreh- und neigbar, h&ouml;henverstellbar</td></tr></table>'+
    codeBlock(
    "STROMKOSTEN - die Standardaufgabe\n"+
    "  kWh   = Watt x Stunden / 1.000\n"+
    "  Kosten = kWh x Preis je kWh\n"+
    "  Arbeitstage ca. 220 im Jahr | Kalendertage 365 | 24/7 = 8.760 h\n\n"+
    "  Beispiel: 20 PCs a 120 W, 9 h/Tag, 220 Tage, 0,32 EUR/kWh\n"+
    "     20 x 120 x 9 x 220 = 4.752.000 Wh = 4.752 kWh\n"+
    "     4.752 x 0,32 = 1.520,64 EUR pro Jahr\n"+
    "  Haeufigster Fehler: Division durch 1.000 vergessen.\n\n"+
    "WIRKUNGSGRAD UND EFFIZIENZ\n"+
    "  Wirkungsgrad = abgegeben / zugefuehrt x 100 %\n"+
    "  PUE (Rechenzentrum) = Gesamtenergie / IT-Energie  ideal 1,0\n"+
    "  80 PLUS: Bronze ~85 %, Gold ~90 %, Platinum ~92 %\n\n"+
    "GREEN IT - Massnahmen fuer Nennaufgaben\n"+
    "  Servervirtualisierung statt vieler physischer Maschinen\n"+
    "  Thin Clients | Standby abschalten | Abwaerme nutzen\n"+
    "  freie Kuehlung | laengere Nutzungsdauer | Druck reduzieren\n"+
    "  Guetezeichen: Energy Star, Blauer Engel, TCO\n"+
    "  Entsorgung nach ElektroG, Datentraeger vorher loeschen\n\n"+
    "BARRIEREFREIHEIT (BITV 2.0, WCAG)\n"+
    "  Vier Prinzipien: wahrnehmbar, bedienbar, verstaendlich, robust\n"+
    "  Kontrast mindestens 4,5:1 (grosse Schrift 3:1)\n"+
    "  vollstaendige Tastaturbedienung, Alternativtexte,\n"+
    "  keine reine Farbcodierung, Untertitel\n"+
    "  Software-Ergonomie: EN ISO 9241-110\n"+
    "  (Aufgabenangemessenheit, Selbstbeschreibungsfaehigkeit,\n"+
    "   Steuerbarkeit, Erwartungskonformitaet, Fehlertoleranz,\n"+
    "   Individualisierbarkeit, Lernfoerderlichkeit)"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Rechnerarchitektur &amp; Speicher</h2>'+codeBlock(
    "EVA / EVAS\n"+
    "  Eingabe - Verarbeitung - Ausgabe (+ Speicherung)\n\n"+
    "VON NEUMANN - die fuenf Bausteine\n"+
    "  1 Steuerwerk      holt und dekodiert Befehle\n"+
    "  2 Rechenwerk ALU  rechnet und vergleicht\n"+
    "  3 Speicherwerk    Befehle UND Daten gemeinsam\n"+
    "  4 Ein-/Ausgabe    Verbindung nach aussen\n"+
    "  5 Bussystem       verbindet alles\n"+
    "  Steuerwerk + Rechenwerk = CPU\n"+
    "  Kern: Befehle und Daten im selben Speicher\n"+
    "        -> universell, aber Von-Neumann-Flaschenhals\n"+
    "  Harvard: getrennte Speicher/Busse -> Mikrocontroller, Caches\n\n"+
    "BEFEHLSZYKLUS\n"+
    "  FETCH -> DECODE -> EXECUTE -> WRITE BACK -> Befehlszaehler +1\n"+
    "  Ein Befehl braucht MEHRERE Takte.\n"+
    "  3 GHz = 3 Mrd Takte/s, sagt allein wenig ueber die Leistung.\n\n"+
    "DIE DREI BUSSE\n"+
    "  Datenbus    die Werte              beide Richtungen\n"+
    "  Adressbus   die Speicheradresse    nur von der CPU weg\n"+
    "  Steuerbus   Lesen/Schreiben/Takt   beide Richtungen\n\n"+
    "  Adressbusbreite n  ->  2^n adressierbare Zellen\n"+
    "     20 Leitungen = 1 MiB     30 Leitungen = 1 GiB\n"+
    "     32 Leitungen = 4 GiB  <- Grenze jedes 32-Bit-Systems\n\n"+
    "SPEICHERPYRAMIDE - oben schnell/klein/teuer\n"+
    "  Register     < 1 ns      fluechtig\n"+
    "  Cache L1-L3  1-20 ns     fluechtig\n"+
    "  RAM          ~ 80 ns     fluechtig\n"+
    "  ----------------------------- Trennlinie -----------------\n"+
    "  SSD/NVMe     ~ 50 us     nichtfluechtig\n"+
    "  HDD/Band     ms bis min  nichtfluechtig\n"+
    "  ROM/Flash (Firmware) ist ebenfalls nichtfluechtig.\n"+
    "  Cache wirkt wegen des LOKALITAETSPRINZIPS (zeitlich/raeumlich).\n\n"+
    "ZEICHEN KODIEREN\n"+
    "  ASCII        7 Bit, 128 Zeichen, keine Umlaute\n"+
    "  ISO 8859-1   8 Bit, 256 Zeichen, westeuropaeisch\n"+
    "  UTF-8        1 bis 4 Byte je Zeichen, alle Schriften\n"+
    "  -> Zeichenanzahl ist NICHT gleich Byteanzahl.\n"+
    "     Umlaut = 2 Byte, Emoji = 4 Byte\n\n"+
    "ZAHLEN DARSTELLEN\n"+
    "  Zweierkomplement: alle Bits kippen, dann +1\n"+
    "     -5 als Byte:  0000 0101 -> 1111 1010 -> 1111 1011\n"+
    "  Wertebereiche\n"+
    "      8 Bit ohne Vorzeichen        0 .. 255\n"+
    "      8 Bit mit  Vorzeichen     -128 .. +127\n"+
    "     16 Bit mit  Vorzeichen  -32.768 .. +32.767\n"+
    "     32 Bit mit  Vorzeichen   rund -2,1 .. +2,1 Mrd\n"+
    "  Gleitkomma (IEEE 754): Vorzeichen, Exponent, Mantisse\n"+
    "     0,1 + 0,2 ist nicht exakt 0,3 -> Geld NIE als Float,\n"+
    "     sondern in Cent als Ganzzahl oder als Dezimaltyp.\n\n"+
    "LOGISCHE GATTER\n"+
    "  A B | UND ODER XOR NAND NOR\n"+
    "  0 0 |  0    0    0    1   1\n"+
    "  0 1 |  0    1    1    1   0\n"+
    "  1 0 |  0    1    1    1   0\n"+
    "  1 1 |  1    1    0    0   0\n"+
    "  XOR = genau einer -> prueft auf Ungleichheit\n"+
    "  Halbaddierer: XOR = Summe, UND = Uebertrag\n"+
    "  n Eingaenge -> 2^n Zeilen in der Wahrheitstabelle\n\n"+
    "DE MORGAN - beim Verneinen BEIDES tun\n"+
    "  NICHT (A UND  B) = (NICHT A) ODER (NICHT B)\n"+
    "  NICHT (A ODER B) = (NICHT A) UND  (NICHT B)\n"+
    "  Also: jeden Vergleich umdrehen UND die Verknuepfung tauschen."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Betriebssystem, Prozesse &amp; Systemstart</h2>'+codeBlock(
    "FUENF KERNAUFGABEN\n"+
    "  Prozess- | Speicher- | Datei- | Geraete- | Benutzerverwaltung\n"+
    "  Dazu: einheitliche Schnittstelle, die Hardware verbirgt.\n\n"+
    "KERNEL- GEGEN BENUTZERMODUS\n"+
    "  Kernel-Modus   voller Hardwarezugriff (Kernel, Treiber)\n"+
    "  Benutzermodus  nur ueber Systemaufrufe (Anwendungen)\n"+
    "  Anwendung stuerzt ab -> nur der Prozess endet\n"+
    "  Treiber stuerzt ab   -> Bluescreen / Kernel Panic\n\n"+
    "PROZESS, THREAD, MULTITASKING\n"+
    "  Programm = Datei | Prozess = Programm in Ausfuehrung\n"+
    "  Thread   = Strang IM Prozess, teilt dessen Speicher\n"+
    "             -> schnell, aber Race Conditions moeglich\n"+
    "  Praeemptiv: das BS entzieht die CPU notfalls\n\n"+
    "PROZESSZUSTAENDE - drei Zustaende, vier Uebergaenge\n"+
    "        Zuteilung\n"+
    "  bereit --------> rechnend\n"+
    "    ^   <--------     |\n"+
    "    |   Verdraengung  | wartet auf E/A\n"+
    "    |                 v\n"+
    "    +----------- blockiert\n"+
    "         E/A fertig\n"+
    "  FALLE: von blockiert geht es NIE direkt nach rechnend.\n\n"+
    "SCHEDULING\n"+
    "  FCFS          Reihenfolge des Eintreffens | langer Job blockiert\n"+
    "  SJF           kuerzester zuerst           | lange verhungern\n"+
    "  Round Robin   feste Zeitscheibe           | fuer interaktiv\n"+
    "  Prioritaet    hoechste zuerst             | niedrige verhungern\n"+
    "  Durchlaufzeit = Ende - Ankunft\n\n"+
    "VIRTUELLER SPEICHER\n"+
    "  Seiten (Pages, meist 4 KiB), Seitentabelle, MMU\n"+
    "  Nutzen: 1 mehr Speicher als physisch vorhanden\n"+
    "          2 Isolation der Prozesse (Sicherheit)\n"+
    "          3 keine Fragmentierung noetig\n"+
    "  Seitenfehler = Seite nachladen (normal)\n"+
    "  THRASHING    = staendiges Ein-/Auslagern\n"+
    "     Symptom: System zaeh, Platte dauernd aktiv, CPU NIEDRIG\n"+
    "     Abhilfe: mehr RAM. Groessere Auslagerungsdatei hilft NICHT.\n\n"+
    "SYMPTOM -> URSACHE\n"+
    "  CPU hoch,    Platte ruhig      rechenintensives Programm\n"+
    "  CPU niedrig, Platte dauernd    Thrashing, zu wenig RAM\n"+
    "  CPU niedrig, Platte ruhig      Netz oder externer Dienst\n\n"+
    "BOOTVORGANG\n"+
    "  Firmware -> POST -> Bootmedium -> Bootloader -> Kernel -> Dienste\n\n"+
    "  Kein Luefter, keine LED        Netzteil/Strom\n"+
    "  Signaltoene, kein Bild         POST: RAM oder Grafik\n"+
    "  No bootable device             Bootreihenfolge/Datentraeger\n"+
    "  Uhr steht nach jedem Aus       CMOS-Knopfzelle leer\n"+
    "  Stick startet nicht            Secure Boot aktiv\n"+
    "  Immer von unten nach oben pruefen - wie beim OSI-Modell.\n\n"+
    "BIOS GEGEN UEFI\n"+
    "                 BIOS          UEFI\n"+
    "  Partitionen    MBR           GPT\n"+
    "  Startplatte    max 2 TiB     praktisch unbegrenzt\n"+
    "  Primaere Part. 4             128 und mehr\n"+
    "  Sicherheit     keine         Secure Boot\n"+
    "  Bedienung      Text          grafisch, Maus, Netz"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Systemarchitekturen &amp; Verf&uuml;gbarkeit</h2>'+codeBlock(
    "SERVERBAUFORMEN\n"+
    "  Tower  wie ein grosser PC     1-2 Server, kein Serverraum\n"+
    "  Rack   19 Zoll, in HE         Standardfall\n"+
    "  Blade  geteiltes Gehaeuse     hohe Dichte\n\n"+
    "  1 HE = 44,45 mm | uebliches Rack = 42 HE\n"+
    "  Rack-Rechnung: Server + Switches + Patchfelder + USV,\n"+
    "  dann Reserve fuer Erweiterung abziehen.\n\n"+
    "SERVERRAUM - je Ebene etwas nennen\n"+
    "  baulich        Brandschutz, Zutrittskontrolle, Klima\n"+
    "  technisch      Kuehlung, USV, Redundanz, Monitoring\n"+
    "  organisator.   Zutrittsprotokoll, Wartungsplan, Notfallplan\n"+
    "  Kalt-/Warmgang: Rackfronten stehen sich gegenueber.\n"+
    "  Kuehlleistung ~ elektrische Leistung der Server.\n"+
    "  N+1: eine Einheit mehr als noetig (Klima, Netzteil, Luefter).\n\n"+
    "SKALIERUNG\n"+
    "                 vertikal (Scale-up)  horizontal (Scale-out)\n"+
    "  Vorgehen       Maschine staerken    Maschinen dazustellen\n"+
    "  Grenze         technisch erschoepft praktisch unbegrenzt\n"+
    "  Ausfallschutz  keiner               ja\n"+
    "  Aufruesten     mit Ausfallzeit      im Betrieb\n"+
    "  Merksatz: vertikal ist einfacher, horizontal ist besser.\n\n"+
    "  Load Balancer: Round Robin, wenigste Verbindungen, gewichtet\n"+
    "  ACHTUNG Sitzungspersistenz - sonst ist der Benutzer\n"+
    "  nach dem naechsten Klick abgemeldet.\n\n"+
    "  Cluster  Aktiv-Passiv = Standby uebernimmt (Failover)\n"+
    "           Aktiv-Aktiv  = alle arbeiten, teilen die Last\n\n"+
    "VERFUEGBARKEIT RECHNEN\n"+
    "  V = (Gesamtzeit - Ausfallzeit) / Gesamtzeit x 100 %\n"+
    "  Jahr = 8.760 h = 525.600 min\n"+
    "     99     %  ->  3,65 Tage Ausfall\n"+
    "     99,9   %  ->  8,8 Stunden\n"+
    "     99,99  %  ->  52,6 Minuten\n"+
    "     99,999 %  ->  5,3 Minuten\n\n"+
    "  Redundanz: zwei UNABHAENGIGE Systeme, eines genuegt\n"+
    "     0,01 x 0,01 = 0,0001  ->  aus 99 % wird 99,99 %\n"+
    "     Gilt nur bei echter Unabhaengigkeit (Strom, Switch, Raum).\n\n"+
    "  RTO = maximale Ausfalldauer\n"+
    "  RPO = maximaler Datenverlust in Zeit -> Sicherungsintervall\n\n"+
    "ARBEITSPLATZMODELLE\n"+
    "                  Fat Client   Thin Client   VDI\n"+
    "  Rechenleistung  lokal        Server        eigene VM\n"+
    "  Wartung         je Geraet    zentral       zentral\n"+
    "  Offline         ja           nein          nein\n"+
    "  Daten lokal     ja (Risiko)  nein          nein\n"+
    "  Lebensdauer     3-5 Jahre    7-10 Jahre    7-10 Jahre\n"+
    "  Gegenargument: ohne Netz geht nichts, Server = SPOF,\n"+
    "  CAD/Video laufen auf geteiltem Server schlecht.\n\n"+
    "DREI-SCHICHTEN-ARCHITEKTUR\n"+
    "  Praesentation | Logik | Datenhaltung\n"+
    "  Zweck: Austauschbarkeit - neue Oberflaeche ohne neue Logik,\n"+
    "  andere Datenbank ohne neue Oberflaeche.\n\n"+
    "EMBEDDED UND IoT\n"+
    "  Mikroprozessor  nur CPU, Speicher extra\n"+
    "  Mikrocontroller CPU + Speicher + Schnittstellen auf einem Chip\n"+
    "  Echtzeit heisst GARANTIERT RECHTZEITIG, nicht schnell\n"+
    "     hart  = Fristverletzung ist ein Fehler (Airbag, Notaus)\n"+
    "     weich = mindert nur die Qualitaet (Videostream)\n"+
    "  Kette: Sensor -> Controller -> Aktor, dazu Gateway -> Cloud\n"+
    "  Edge Computing: 1 Latenz  2 Datenmenge  3 Ausfallsicherheit"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Befehle f&uuml;r die Pr&uuml;fung &ndash; Windows und Linux</h2>'+codeBlock(
    "NETZWERK - die wichtigsten zuerst\n"+
    "  Windows                Linux                 zeigt / tut\n"+
    "  ipconfig               ip a  (ifconfig)      IP, Maske, Gateway\n"+
    "  ipconfig /all          ip a ; ip r           ZUSAETZLICH MAC,\n"+
    "                                               DNS, DHCP, Lease\n"+
    "  ipconfig /release      dhclient -r           DHCP-Lease abgeben\n"+
    "  ipconfig /renew        dhclient              DHCP neu anfordern\n"+
    "  ipconfig /flushdns     resolvectl flush-...  DNS-Cache leeren\n"+
    "  ping ziel              ping ziel             Erreichbarkeit ICMP\n"+
    "  tracert ziel           traceroute ziel       jeder Router im Weg\n"+
    "  pathping ziel          mtr ziel              Weg + Paketverlust\n"+
    "  nslookup name          dig name / host name  Namensaufloesung\n"+
    "  arp -a                 ip neigh              ARP-Cache\n"+
    "  getmac /v              ip link               MAC-Adressen\n"+
    "  netstat -an            ss -tuln              offene Ports\n"+
    "  netstat -rn            ip route              Routingtabelle\n"+
    "  route print            ip route              dasselbe\n"+
    "  telnet host port       nc -vz host port      Port erreichbar?\n\n"+
    "  MERKE: ohne /all zeigt ipconfig KEINE MAC-Adresse.\n"+
    "  Wird nach der physischen Adresse gefragt, ist /all Pflicht.\n\n"+
    "SYSTEM UND DIAGNOSE\n"+
    "  systeminfo             uname -a ; lscpu      Systemuebersicht\n"+
    "  tasklist               ps aux                laufende Prozesse\n"+
    "  taskkill /PID n /F     kill -9 PID           Prozess beenden\n"+
    "  taskmgr                top / htop            Auslastung live\n"+
    "  eventvwr               journalctl -xe        Ereignisprotokoll\n"+
    "  msinfo32               dmidecode             Hardwareinfo\n"+
    "  gpupdate /force        --                    Richtlinien neu\n"+
    "  gpresult /r            --                    wirksame Richtlinien\n"+
    "  shutdown /r /t 0       reboot                Neustart\n\n"+
    "DATENTRAEGER UND DATEIEN\n"+
    "  chkdsk C: /f           fsck /dev/sda1        Dateisystem pruefen\n"+
    "  sfc /scannow           --                    Systemdateien pruefen\n"+
    "  diskpart               fdisk / parted        Partitionen\n"+
    "  dir                    ls -l                 Verzeichnis\n"+
    "  --                     df -h                 freier Platz\n"+
    "  --                     du -sh ordner         Groesse eines Ordners\n"+
    "  xcopy / robocopy       rsync -av             kopieren, spiegeln\n"+
    "  icacls datei           chmod / chown         Rechte setzen\n\n"+
    "BENUTZER UND RECHTE\n"+
    "  net user               cat /etc/passwd       Konten anzeigen\n"+
    "  net user name *        passwd name           Passwort setzen\n"+
    "  net localgroup         groups name           Gruppen\n"+
    "  whoami /groups         id                    eigene Rechte\n\n"+
    "DIENSTE\n"+
    "  services.msc           systemctl status x    Dienst ansehen\n"+
    "  net start / net stop   systemctl start/stop  starten/anhalten\n"+
    "  sc query               systemctl list-units  alle Dienste\n\n"+
    "DIE PING-KASKADE - von innen nach aussen\n"+
    "  1 ping 127.0.0.1    TCP/IP-Stack des Betriebssystems\n"+
    "  2 ping <eigene IP>  eigene Netzwerkkarte\n"+
    "  3 ping <Gateway>    lokales Netz, Kabel, Switch, Maske\n"+
    "  4 ping 8.8.8.8      Routing nach aussen\n"+
    "  5 ping google.de    DNS\n"+
    "  Wo es bricht, liegt der Fehler. 4 ok und 5 nicht -> DNS.\n\n"+
    "AUSGABEN LESEN\n"+
    "  ping: Zeit=12ms TTL=118\n"+
    "     TTL sinkt je Hop. Start 64/128/255 je Betriebssystem.\n"+
    "     Zeitueberschreitung = keine Antwort, nicht zwingend offline\n"+
    "     (ICMP kann geblockt sein).\n"+
    "  netstat-Status\n"+
    "     LISTENING   Dienst wartet auf Verbindungen\n"+
    "     ESTABLISHED Verbindung steht\n"+
    "     TIME_WAIT   Verbindung wird gerade abgebaut"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Adressen, Ports und Masken auf einen Blick</h2>'+codeBlock(
    "SONDERADRESSEN IPv4\n"+
    "  10.0.0.0/8        privat (RFC 1918)\n"+
    "  172.16.0.0/12     privat - also 172.16 bis 172.31\n"+
    "  192.168.0.0/16    privat\n"+
    "  127.0.0.1         Loopback, das bist du selbst\n"+
    "  169.254.0.0/16    APIPA - KEIN DHCP-Server erreichbar\n"+
    "  0.0.0.0           Standardroute bzw. unbestimmt\n"+
    "  255.255.255.255   Broadcast im lokalen Netz\n"+
    "  224.0.0.0/4       Multicast\n"+
    "  8.8.8.8 / 1.1.1.1 oeffentliche DNS-Server (zum Testen)\n\n"+
    "SONDERADRESSEN IPv6\n"+
    "  ::1/128           Loopback\n"+
    "  fe80::/10         Link-Local, selbst erzeugt, nicht routbar\n"+
    "  fc00::/7          Unique Local (privat)\n"+
    "  2000::/3          Global Unicast, weltweit routbar\n"+
    "  ff00::/8          Multicast - IPv6 kennt KEINEN Broadcast\n"+
    "  ::                unbestimmt\n\n"+
    "PORTS - die musst du kennen\n"+
    "   20/21  FTP            67/68  DHCP (Server/Client, UDP)\n"+
    "   22     SSH / SFTP     69     TFTP\n"+
    "   23     Telnet         80     HTTP\n"+
    "   25     SMTP          110     POP3\n"+
    "   53     DNS           143     IMAP\n"+
    "  389     LDAP          161     SNMP\n"+
    "  443     HTTPS         445     SMB / CIFS\n"+
    "  587     SMTP (Submission)    993  IMAPS\n"+
    "  636     LDAPS         995     POP3S\n"+
    " 1433     MS SQL       3306     MySQL / MariaDB\n"+
    " 3389     RDP          5432     PostgreSQL\n\n"+
    "  Bereiche\n"+
    "      0 - 1023   Well Known - Standarddienste\n"+
    "   1024 - 49151  Registered - registrierte Anwendungen\n"+
    "  49152 - 65535  Dynamic    - zufaellige Quellports der Clients\n"+
    "  Socket = IP + Port. Eine Verbindung = vier Werte\n"+
    "  (Quell-IP, Quell-Port, Ziel-IP, Ziel-Port).\n\n"+
    "SUBNETZMASKEN - die Zeile aufs Konzeptpapier\n"+
    "  Oktettwerte: 128 192 224 240 248 252 254 255\n\n"+
    "  /24  255.255.255.0     254 Hosts   Blockgroesse 256\n"+
    "  /25  255.255.255.128   126 Hosts   Blockgroesse 128\n"+
    "  /26  255.255.255.192    62 Hosts   Blockgroesse  64\n"+
    "  /27  255.255.255.224    30 Hosts   Blockgroesse  32\n"+
    "  /28  255.255.255.240    14 Hosts   Blockgroesse  16\n"+
    "  /29  255.255.255.248     6 Hosts   Blockgroesse   8\n"+
    "  /30  255.255.255.252     2 Hosts   Punkt-zu-Punkt\n\n"+
    "  Blockgroesse = 256 - Maskenwert des interessanten Oktetts.\n"+
    "  Netze beginnen bei Vielfachen davon.\n"+
    "  Hosts = 2^Hostbits - 2 (Netz- und Broadcastadresse).\n"+
    "  Broadcast = naechste Netzadresse minus 1.\n\n"+
    "ZWEIERPOTENZEN - im Kopf haben\n"+
    "  2^1=2      2^5=32     2^9=512     2^13=8.192\n"+
    "  2^2=4      2^6=64     2^10=1.024  2^14=16.384\n"+
    "  2^3=8      2^7=128    2^11=2.048  2^15=32.768\n"+
    "  2^4=16     2^8=256    2^12=4.096  2^16=65.536\n"+
    "  2^20 = 1 Mi   2^30 = 1 Gi   2^32 = rund 4,3 Mrd\n"+
    "  log2: 1.024 -> 10 | 1 Mio -> 20 | 1 Mrd -> 30"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Dateisysteme &amp; Datentr&auml;ger</h2>'+codeBlock(
    "DATEISYSTEME IM VERGLEICH\n"+
    "  FAT32   max. Dateigroesse 4 GiB, max. Volume 2 TiB\n"+
    "          ueberall lesbar -> kleine USB-Sticks, Kameras\n"+
    "  exFAT   keine 4-GiB-Grenze, Windows/macOS/Linux\n"+
    "          -> grosse USB-Sticks und externe Platten\n"+
    "  NTFS    Rechte (ACL), Journal, Verschluesselung,\n"+
    "          Komprimierung, Schattenkopien -> Windows-Standard\n"+
    "  ext4    Journal, Rechte -> Linux-Standard\n"+
    "  ReFS    sehr grosse Volumes, Pruefsummen -> Windows Server\n\n"+
    "  Die klassische Pruefungsfalle: Eine 5-GiB-Datei laesst sich\n"+
    "  nicht auf einen FAT32-Stick kopieren. Loesung exFAT oder NTFS.\n\n"+
    "  Rechte gibt es nur mit NTFS oder ext4, nicht mit FAT32.\n"+
    "  Ein Berechtigungskonzept setzt also NTFS voraus.\n\n"+
    "PARTITIONSSCHEMA\n"+
    "  MBR   4 primaere Partitionen, max. 2 TiB, gehoert zu BIOS\n"+
    "  GPT   128+ Partitionen, praktisch unbegrenzt, gehoert zu UEFI\n"+
    "        Bei GPT liegt eine Kopie der Partitionstabelle am Ende.\n\n"+
    "FORMATIEREN UND LOESCHEN\n"+
    "  Schnellformatierung   loescht nur das Inhaltsverzeichnis,\n"+
    "                        Daten sind wiederherstellbar\n"+
    "  Vollformatierung      ueberschreibt und prueft Sektoren\n"+
    "  Sicheres Loeschen     mehrfaches Ueberschreiben oder,\n"+
    "                        bei SSD, Secure Erase des Herstellers\n"+
    "  Datentraegervernichtung nach DIN 66399 (Schutzklassen)\n"+
    "  -> Bei Altgeraeten aus Datenschutzgruenden Pflicht.\n\n"+
    "RAID - Kapazitaet und Ausfallschutz\n"+
    "  RAID 0   Striping        100 %        KEIN Schutz\n"+
    "  RAID 1   Mirroring        50 %        1 Platte darf ausfallen\n"+
    "  RAID 5   Parität     (n-1) x Groesse  1 Platte, min. 3\n"+
    "  RAID 6   dopp. Parität (n-2) x Gr.    2 Platten, min. 4\n"+
    "  RAID 10  gespiegelt+str.  50 %        schnell + sicher, min. 4\n"+
    "  RAID ersetzt KEIN Backup: kein Schutz vor Loeschen,\n"+
    "  Ransomware oder Feuer.\n\n"+
    "SICHERUNGSARTEN\n"+
    "  Voll           alles          Rueckspielen: 1 Medium\n"+
    "  Differenziell  seit der VOLLsicherung   Voll + letzte diff.\n"+
    "  Inkrementell   seit der LETZTEN Sicherung  Voll + ALLE ink.\n"+
    "  3-2-1-Regel: 3 Kopien, 2 Medientypen, 1 ausser Haus/offline."
  )+'</div>';

  s += '<div class="sheet-section"><h2>Die 15 h&auml;ufigsten Fehler &ndash; und wie du sie vermeidest</h2><table class="lesson-table"><tr><th>Falle</th><th>Gegenmittel</th></tr>'+
    '<tr><td>Faktor 8 vergessen (Bit &harr; Byte)</td><td>Datenmenge steht in <strong>Byte</strong>, Datenrate in <strong>Bit/s</strong>. Immer erst umrechnen.</td></tr>'+
    '<tr><td>Off-by-one beim Array</td><td>Das letzte Element hat den Index <strong>L&Auml;NGE &minus; 1</strong>.</td></tr>'+
    '<tr><td>MAX und MIN im Netzplan vertauscht</td><td>Vorw&auml;rts <strong>MAX</strong>, r&uuml;ckw&auml;rts <strong>MIN</strong>. Probe: SAZ des ersten Vorgangs = 0.</td></tr>'+
    '<tr><td>Skonto vom Listenpreis gerechnet</td><td>Skonto immer vom <strong>Zieleinkaufspreis</strong>, also nach Rabatt. Bezugskosten danach.</td></tr>'+
    '<tr><td>USt: 19 % vom Bruttobetrag</td><td>Enthaltene USt = <strong>brutto &times; 19 / 119</strong>, nicht brutto &times; 0,19.</td></tr>'+
    '<tr><td>&bdquo;&minus; 2&ldquo; bei IPv6 abgezogen</td><td>IPv6 kennt <strong>keinen Broadcast</strong>. Nur bei IPv4 abziehen.</td></tr>'+
    '<tr><td>IPv6 nur halb ausgeschrieben</td><td>Jeder Block bekommt <strong>vier</strong> Hex-Ziffern: db8 &rarr; 0db8.</td></tr>'+
    '<tr><td>DHCP oder DNS auf Schicht 3</td><td>Beides sind <strong>Anwendungsprotokolle, Schicht 7</strong>.</td></tr>'+
    '<tr><td>WHERE statt HAVING</td><td>Filter auf ein <strong>Aggregat</strong> geh&ouml;rt in HAVING, sonst Syntaxfehler.</td></tr>'+
    '<tr><td>WHERE zerst&ouml;rt den LEFT JOIN</td><td>Bedingung auf die rechte Tabelle in die <strong>ON-Klausel</strong> schreiben.</td></tr>'+
    '<tr><td>Akteur in die Systemgrenze gemalt</td><td>Akteure stehen <strong>au&szlig;erhalb</strong> des Rechtecks.</td></tr>'+
    '<tr><td>Anwendungsfall als Substantiv</td><td>Immer <strong>Verb + Objekt</strong>: nicht &bdquo;St&ouml;rungsmeldung&ldquo;, sondern &bdquo;St&ouml;rung melden&ldquo;.</td></tr>'+
    '<tr><td>Watt und Voltampere gleichgesetzt</td><td><strong>W = VA &times; Leistungsfaktor</strong>. Eine 1.000-VA-USV liefert keine 1.000 W.</td></tr>'+
    '<tr><td>Verf&uuml;gbarkeit auf 8.760 h bezogen</td><td>Steht im SLA eine <strong>Servicezeit</strong>, gilt die als Bezugsgr&ouml;&szlig;e.</td></tr>'+
    '<tr><td>Nur das Ergebnis hingeschrieben</td><td>Es gibt <strong>Teilpunkte auf den Rechenweg</strong>. Jeden Schritt mit Einheit notieren.</td></tr></table></div>';

  s += '<div class="sheet-section"><h2>Zeitplan f&uuml;r die 90 Minuten</h2>'+codeBlock(
    "0-5 min    ERST BLAETTERN, DANN RECHNEN\n"+
    "           Alle Aufgaben ueberfliegen, Punktzahlen notieren.\n"+
    "           Faustregel: rund 1 Minute pro Punkt.\n"+
    "           Sofort auf das Konzeptpapier schreiben:\n"+
    "             128 192 224 240 248 252 254 255\n"+
    "             FEZ=FAZ+D (MAX) | SAZ=SEZ-D (MIN) | GP=SAZ-FAZ\n"+
    "             1 Byte = 8 Bit | 1 Jahr = 8.760 h\n\n"+
    "5-15 min   DIE SICHEREN PUNKTE ZUERST\n"+
    "           Multiple Choice und Definitionsfragen abraeumen.\n"+
    "           Das bringt Punkte und beruhigt.\n\n"+
    "15-70 min  DIE RECHENAUFGABEN\n"+
    "           Subnetting, Netzplan, Kalkulation, Uebertragungsdauer.\n"+
    "           Pro Aufgabe ein Zeitlimit setzen und einhalten.\n"+
    "           Haengst du fest: Teilansatz hinschreiben, weiter,\n"+
    "           spaeter zurueckkommen.\n\n"+
    "70-85 min  DIE TEXTAUFGABEN\n"+
    "           Begruenden, erlaeutern, empfehlen. Hier zaehlt das\n"+
    "           \"weil\" mehr als die Laenge.\n\n"+
    "85-90 min  KONTROLLE\n"+
    "           Ist irgendwo ein Feld leer? Fehlt eine Einheit?\n"+
    "           Steht bei \"empfehlen\" eine echte Entscheidung?\n"+
    "           Wurde die geforderte Anzahl Punkte genannt?"
  )+'<p style="font-size:.8rem;color:var(--text-dim);"><strong>Nie eine Aufgabe leer lassen.</strong> Ein falscher Ansatz bringt Teilpunkte, ein leeres Feld null. Selbst &bdquo;Ich w&uuml;rde die Blockgr&ouml;&szlig;e mit 256 &minus; Maskenwert bestimmen&ldquo; ist mehr wert als nichts.</p></div>';

  s += '<div class="sheet-section"><h2>Formulierungen, die Punkte bringen</h2><table class="lesson-table"><tr><th>Statt&nbsp;&hellip;</th><th>&hellip;&nbsp;besser</th></tr>'+
    '<tr><td>&bdquo;32 GB RAM&ldquo;</td><td>&bdquo;32 GB RAM, <strong>weil</strong> drei virtuelle Maschinen mit je 8 GB parallel laufen sollen&ldquo;</td></tr>'+
    '<tr><td>&bdquo;Anbieter B ist besser&ldquo;</td><td>&bdquo;Anbieter B wird empfohlen, <strong>da</strong> er bei gleichem Nutzwert 309 &euro; g&uuml;nstiger ist&ldquo;</td></tr>'+
    '<tr><td>&bdquo;Das System soll schnell sein&ldquo;</td><td>&bdquo;Die Suche antwortet in unter zwei Sekunden&ldquo; &ndash; <strong>messbar</strong> formulieren</td></tr>'+
    '<tr><td>&bdquo;Mitarbeiter schulen&ldquo;</td><td>&bdquo;Schulung zu Phishing, <strong>weil</strong> technische Ma&szlig;nahmen nicht greifen, wenn Zugangsdaten freiwillig herausgegeben werden&ldquo;</td></tr>'+
    '<tr><td>&bdquo;Ergebnis: 2,5&ldquo;</td><td>&bdquo;Amortisationsdauer: 2,5 Jahre, <strong>also 2 Jahre und 6 Monate</strong>&ldquo;</td></tr>'+
    '<tr><td>&bdquo;Man nimmt Glasfaser&ldquo;</td><td>&bdquo;Singlemode-LWL, <strong>da</strong> die Strecke 250 m betr&auml;gt und Kupfer bei 100 m endet&ldquo;</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);">Der Unterschied zwischen einer 3 und einer 1 ist selten mehr Wissen, sondern fast immer das ausgeschriebene <strong>weil</strong>.</p></div>';

  s += '<div class="sheet-section"><h2>Die Zahlen, die du auswendig brauchst</h2>'+codeBlock(
    "SUBNETZE     128 192 224 240 248 252 254 255\n"+
    "             /24=254  /25=126  /26=62  /27=30  /28=14  /29=6  /30=2\n\n"+
    "PORTS        21 FTP | 22 SSH | 25 SMTP | 53 DNS | 67/68 DHCP\n"+
    "             80 HTTP | 110 POP3 | 143 IMAP | 443 HTTPS | 3389 RDP\n\n"+
    "ZEIT         1 Jahr = 8.760 h = 525.600 min\n"+
    "             Arbeitsjahr ca. 220 Tage, ca. 250 bei 5-Tage-Woche\n"+
    "             99,9 % -> 8,76 h Ausfall | 99,99 % -> 52,6 min\n\n"+
    "EINHEITEN    1 Byte = 8 Bit | 1 KiB = 1.024 B | 1 kB = 1.000 B\n"+
    "             True Color 24 Bit = 3 Byte je Pixel\n\n"+
    "KABEL        Kupfer max. 100 m (90 m fest + 2 x 5 m Patch)\n"+
    "             Cat 6a = 10 Gbit/s auf 100 m | Multimode bis 550 m\n"+
    "             PoE 12,95 W | PoE+ 25,5 W | PoE++ bis 71 W\n\n"+
    "FRISTEN      Datenpanne melden: 72 Stunden\n"+
    "             Gewaehrleistung: 2 Jahre | Beweislastumkehr: 12 Monate\n"+
    "             DSGVO-Bussgeld: 20 Mio. EUR oder 4 % Jahresumsatz\n\n"+
    "LOG2         8->3  16->4  32->5  64->6  128->7  256->8\n"+
    "             1.024->10   1.000.000->ca. 20\n\n"+
    "RAID         0 = n | 1 = 50 % | 5 = (n-1) | 6 = (n-2) | 10 = 50 %\n\n"+
    "PERT         tE = (O + 4M + P) / 6\n"+
    "SORTIEREN    max. Vergleiche Bubble = n x (n-1) / 2"
  )+'</div>';

  s += '<div class="sheet-section"><h2>Am Abend vorher und am Pr&uuml;fungsmorgen</h2>'+
    '<p style="font-size:.86rem;"><strong>Am Abend vorher</strong> lernst du nichts Neues mehr. Geh dieses Formelblatt einmal durch, schreib die Zahlenblöcke zweimal von Hand ab und h&ouml;r dann auf. Schlaf schl&auml;gt jede zus&auml;tzliche Stunde Wiederholung &ndash; das ist keine Floskel, sondern der Grund, warum verteiltes Lernen funktioniert.</p>'+
    '<p style="font-size:.86rem;"><strong>Mitnehmen:</strong> Personalausweis und Pr&uuml;fungseinladung, zwei Kugelschreiber, einen <strong>nicht programmierbaren</strong> Taschenrechner (pr&uuml;fe die Vorgaben deiner IHK), Lineal und Bleistift f&uuml;r Struktogramme und Netzpl&auml;ne, Radiergummi, Getr&auml;nk, eine Uhr. Kein Handy am Platz.</p>'+
    '<p style="font-size:.86rem;"><strong>In den ersten f&uuml;nf Minuten</strong> schreibst du die Zahlenbl&ouml;cke aus dem Abschnitt oben auf das Konzeptpapier, bevor du die erste Aufgabe liest. Unter Zeitdruck ist Erinnern teurer als Ablesen.</p>'+
    '<p style="font-size:.86rem;"><strong>Wenn du h&auml;ngst:</strong> Markiere die Aufgabe, schreib den Ansatz hin, den du sicher wei&szlig;t, und geh weiter. Zur&uuml;ckkommen kostet zwanzig Sekunden, Feststecken kostet zehn Minuten. Die AP1 belohnt Vollst&auml;ndigkeit mehr als Perfektion an einer Stelle.</p></div>';

  s += '<div class="sheet-section"><h2>Prüfungstaktik AP1</h2><table class="lesson-table"><tr><th>Operator</th><th>Was erwartet wird</th></tr>'+
    '<tr><td>Nennen / Aufzählen</td><td>Stichworte, keine Sätze &ndash; Anzahl aus der Aufgabe übernehmen</td></tr>'+
    '<tr><td>Beschreiben</td><td>vollständige Sätze, sachlich, ohne Wertung</td></tr>'+
    '<tr><td>Erläutern / Begründen</td><td>Aussage <strong>plus</strong> Warum &ndash; das &bdquo;weil&ldquo; bringt den Punkt</td></tr>'+
    '<tr><td>Berechnen</td><td>Rechenweg <em>und</em> Ergebnis mit Einheit &ndash; Teilpunkte auf den Weg</td></tr>'+
    '<tr><td>Vergleichen</td><td>je Kriterium beide Seiten gegenüberstellen</td></tr>'+
    '<tr><td>Beurteilen / Empfehlen</td><td>Abwägung <strong>und</strong> eindeutige Entscheidung am Ende</td></tr></table>'+
    '<p style="font-size:.8rem;color:var(--text-dim);"><strong>Punktzahl = Anzahl der erwarteten Aussagen.</strong> 6 Punkte bei drei Teilaufgaben heißt: zwei Aussagen je Teil. Nie eine Aufgabe leer lassen &ndash; ein Teilansatz bringt Teilpunkte. Zeit pro Punkt kalkulieren und den Netzplan nicht zuletzt rechnen.</p></div>';

  return s;
})();
