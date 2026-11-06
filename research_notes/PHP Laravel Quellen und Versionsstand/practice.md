# Kostenlose moderne PHP-/Laravel-Praxisquellen

## 1. Versionen und Verlässlichkeit am 2026-11-06

### Takeaway
Laravel 13 ist kein Zukunftsversprechen: offizielle Veröffentlichung 17.03.2026, verifiziertes aktuelles Framework-Release v13.40.0 vom 03.11.2026. Für neue Beispiele Laravel 13 mit PHP 8.4/8.5 wählen; Framework-Mindestversion bleibt PHP 8.3. Alle unten genannten README-, Composer-, Beispiel- und Lizenzlinks wurden tatsächlich per HTTP abgerufen; keine Installation oder Ausführung fremden Codes.

### Cited Findings
- Laravel 13 unterstützt PHP 8.3–8.5, Bugfixes bis Q3 2027, Security bis 17.03.2028. Laravel 12 ist nur noch im Security-Support bis 24.02.2027, Laravel 11 seit 12.03.2026 nicht mehr. [Offizielle Tabelle](https://laravel.com/docs/13.x/releases), [Release v13.40.0](https://github.com/laravel/framework/releases/tag/v13.40.0)
- Livewire-Kit `main`: PHP `^8.3`, Laravel `^13.17`, Livewire `^4.1`; React-Kit: PHP `^8.3`, Laravel `^13.17`, Inertia `^3.0`. Alte Livewire-3-Anleitungen sind daher nicht automatisch kompatibel. [Livewire Composer](https://github.com/laravel/livewire-starter-kit/blob/3be373acadbe7de05847487f1ff45eee150d1dd6/composer.json), [React Composer](https://github.com/laravel/react-starter-kit/blob/360a762f27bee98798557de16e1c1e78eed61116/composer.json)
- Wichtige Branchfalle: Laravel Data `main` verlangt PHP `^8.4.1` und Illuminate `^13.0`; das veröffentlichte Release **4.23.1** verlangt dagegen PHP `^8.1`, Illuminate `^10|^11|^12|^13`. Für Unterricht Release + v4-Dokumentation pinnen, nicht den Entwicklungsbranch. [main](https://github.com/spatie/laravel-data/blob/main/composer.json), [4.23.1](https://github.com/spatie/laravel-data/blob/4.23.1/composer.json)

### Inferences
- PHP 8.4 ist die gemeinsame Untergrenze der folgenden sechs Beispiele; PHP 8.5 passt ebenfalls. Keine PHP-8.6-Freigabe aus Blogs oder Polyfill-Abhängigkeiten ableiten. Die genaue PHP-Supportbewertung ist separat zu prüfen.
- Composer-Constraints belegen deklarierte Kompatibilität, keinen hier durchgeführten Laufzeittest.

### Gaps
- Keine verbindliche EOL-Zusage für Spatie-/Tighten-Paketmajors ermittelt. Framework-Support nicht auf Community-Pakete übertragen.

## 2. Sechs geprüfte kostenlose Praxisbeispiele

### Takeaway
A = bevorzugte Primärquelle; B = gute gezielte Ergänzung. Starter Kits sind Anwendungsskelette, keine fertigen Shop-Demos. Framework und Pakete sind Bibliotheken mit echten Tests, keine Demo-Anwendungen. Open Source und freie Dokumentation nicht mit kostenpflichtigen Kursen oder SaaS-Angeboten gleichsetzen.

### Cited Findings

### 1. Laravel Livewire Starter Kit — A
- **Typ:** offizielles Anwendungsskelett. README nennt Livewire 4, Tailwind und Flux. Letzter Repo-Push 05.11.2026; eingefrorener `main`-Commit `3be373acadbe7de05847487f1ff45eee150d1dd6`. [Metadaten](https://api.github.com/repos/laravel/livewire-starter-kit), [README](https://github.com/laravel/livewire-starter-kit/blob/3be373acadbe7de05847487f1ff45eee150d1dd6/README.md)
- **Echtes Beispiel:** erfolgreiche/fehlgeschlagene Anmeldung, Logout, optionaler 2FA-Redirect mit Factory und Assertions. [AuthenticationTest.php](https://github.com/laravel/livewire-starter-kit/blob/3be373acadbe7de05847487f1ff45eee150d1dd6/tests/Feature/Auth/AuthenticationTest.php)
- **Lizenz:** MIT in README/Composer; keine separate Root-LICENSE gefunden (`/LICENSE` 404). Keine Lizenzdatei erfinden. [Lizenzangabe](https://github.com/laravel/livewire-starter-kit/blob/3be373acadbe7de05847487f1ff45eee150d1dd6/README.md#license), [Root-Dateiliste](https://api.github.com/repos/laravel/livewire-starter-kit/contents)
- **Mapping:** m45-l1, m47-l2, m56-l3/l4, m51-l1/l2. Beste Passung zum vorhandenen Blade-/Livewire-Pfad; Auth und Tests nicht als neue Themen ausgeben.

### 2. Laravel React Starter Kit — B
- **Typ:** Anwendungsskelett, React 19/TypeScript/Tailwind/shadcn/ui/Radix. Letzter Push 05.11.2026; `main`-Commit `360a762f27bee98798557de16e1c1e78eed61116`. [Metadaten](https://api.github.com/repos/laravel/react-starter-kit), [README](https://github.com/laravel/react-starter-kit/blob/360a762f27bee98798557de16e1c1e78eed61116/README.md)
- **Echtes Beispiel:** Profil aktualisieren, E-Mail-Verifikationsstatus bei geänderter Adresse zurücksetzen, Passwortpflicht bei Accountlöschung. [ProfileUpdateTest.php](https://github.com/laravel/react-starter-kit/blob/360a762f27bee98798557de16e1c1e78eed61116/tests/Feature/Settings/ProfileUpdateTest.php)
- **Lizenz:** MIT in README/Composer, keine separate LICENSE im Root. [Lizenz](https://github.com/laravel/react-starter-kit/blob/360a762f27bee98798557de16e1c1e78eed61116/README.md#license), [Root](https://api.github.com/repos/laravel/react-starter-kit/contents)
- **Mapping:** m56-l2/l3 als optionaler Inertia-/Livewire-Vergleich, m47-l2 und m51-l1. Nicht React/TypeScript als neue Pflichtvoraussetzung einführen.

### 3. Laravel Framework v13.40.0 — A Experten / B Einsteiger
- **Typ:** Framework-Bibliothek; README unterscheidet ausdrücklich Core und Anwendung. Stabile 13.x-Linie, veröffentlichtes v13.40.0 vom 03.11.2026, letzter Repo-Push 06.11.2026. [README](https://github.com/laravel/framework/blob/v13.40.0/README.md), [Release](https://github.com/laravel/framework/releases/tag/v13.40.0), [Metadaten](https://api.github.com/repos/laravel/framework)
- **Echtes Beispiel:** Eloquent-Integrationstest mit explizitem Schema und SQLite-In-Memory-Verbindungen. [DatabaseEloquentIntegrationTest.php](https://github.com/laravel/framework/blob/v13.40.0/tests/Database/DatabaseEloquentIntegrationTest.php)
- **Lizenz:** vollständiges MIT abgerufen. [LICENSE.md](https://github.com/laravel/framework/blob/v13.40.0/LICENSE.md), [Composer](https://github.com/laravel/framework/blob/v13.40.0/composer.json)
- **Mapping:** m46-l3/l4, m58-l1 bis l4, m51-l1/l2. Minimalreproduktion und Assertion lesen lernen; nicht die komplette Framework-Testsuite als Anfängerübung verkaufen.

### 4. Spatie Laravel Data 4.23.1 — A
- **Typ:** Bibliothek, keine App. DTOs, Request-Validierung und Ressourcen aus einer Datendefinition, verschachtelte Daten und TypeScript-Transformation. Freie v4-Doku. [README](https://github.com/spatie/laravel-data/blob/4.23.1/README.md), [Doku](https://spatie.be/docs/laravel-data/v4/introduction)
- **Echtes Beispiel:** Tests trennen DTO und Resource inklusive bewusst verfügbarer/nicht verfügbarer Methoden. [DataTest.php](https://github.com/spatie/laravel-data/blob/4.23.1/tests/DataTest.php)
- **Aktualität/Lizenz:** Release 4.23.1 vom 26.10.2026, letzter Repo-Push 05.11.2026; MIT-Volltext abgerufen. [Release](https://github.com/spatie/laravel-data/releases/tag/4.23.1), [Metadaten](https://api.github.com/repos/spatie/laravel-data), [LICENSE.md](https://github.com/spatie/laravel-data/blob/4.23.1/LICENSE.md)
- **Mapping:** m49-l4 (DTO ist dort bereits vorhanden), m47-l1, m48-l1, m58-l2. Vertiefung optional versus nullable, verschachtelte Daten, Mapping/Serialisierung; Paket optional lassen, manuelle DTOs bleiben legitim.

### 5. Spatie Laravel Query Builder 7.3.8 — A
- **Typ:** Bibliothek. `allowedFilters`, `allowedSorts`, `allowedIncludes`, `allowedFields` bilden HTTP-Listenverträge auf Eloquent ab; freie v7-Doku. [README](https://github.com/spatie/laravel-query-builder/blob/7.3.8/README.md), [Doku](https://spatie.be/docs/laravel-query-builder/v7/introduction)
- **Echtes Beispiel:** partielle/case-insensitive Filter, benutzerdefinierter Query-Parameter, Array-Filterwerte. [FilterTest.php](https://github.com/spatie/laravel-query-builder/blob/7.3.8/tests/FilterTest.php)
- **Aktualität/Lizenz:** 7.3.8 veröffentlicht 06.11.2026; PHP `^8.4`, Illuminate `^12|^13`; MIT-Volltext abgerufen. [Release](https://github.com/spatie/laravel-query-builder/releases/tag/7.3.8), [Composer](https://github.com/spatie/laravel-query-builder/blob/7.3.8/composer.json), [LICENSE.md](https://github.com/spatie/laravel-query-builder/blob/7.3.8/LICENSE.md)
- **Mapping:** m48-l1/m58-l1. Allowlist, ungültige Parameter, Filter-/Sortier-/Include-Vertrag vertiefen; Pagination und Cursor-Pagination sind schon vorhanden.

### 6. Tighten Ziggy v2.6.5 — B
- **Typ:** PHP-/JS-Bibliothek für benannte Laravel-Routen in JavaScript, mit TypeScript-/React-/Vue-Beispielen; keine Fullstack-Demo. [README](https://github.com/tighten/ziggy/blob/v2.6.5/README.md)
- **Aktualität:** stabile 2.x-Linie; Release 10.10.2026, PHP `>=8.1`, Laravel `>=9.0` deklariert. Offene Constraint beweist keine Kompatibilität mit allen künftigen Versionen. [Release](https://github.com/tighten/ziggy/releases/tag/v2.6.5), [Composer](https://github.com/tighten/ziggy/blob/v2.6.5/composer.json)
- **Echtes Beispiel/Lizenz:** optionale Routenparameter an mehreren Positionen; MIT-Volltext abgerufen. [RouteTest.php](https://github.com/tighten/ziggy/blob/v2.6.5/tests/Unit/RouteTest.php), [LICENSE](https://github.com/tighten/ziggy/blob/v2.6.5/LICENSE)
- **Mapping:** m45-l2/m56-l2. Optionaler PHP-/JS-Schnittstellenvergleich. Nicht automatisch in das aktuelle React-Kit einbauen: dieses deklariert Wayfinder. [React Composer](https://github.com/laravel/react-starter-kit/blob/360a762f27bee98798557de16e1c1e78eed61116/composer.json)

### Inferences
- Erste Wahl: Livewire-Kit als zusammenhängendes Skelett, Framework-Tests für belegbares Verhalten, Laravel Data und Query Builder für gezielte Vertiefungen. React und Ziggy bleiben optional, keine sechs Pflichtinstallationen.
- MIT-Kopien/wesentliche Auszüge benötigen Copyright-/Lizenzhinweise; Attribution und eigene kleine Lehrbeispiele vorziehen.

### Gaps
- Starter-Kit-Releases-API nennt noch v1.0.1 aus Februar 2025 als latest. Diese Tags repräsentieren nicht den 2026er main-Stand; deshalb Commit-Pinning. [Livewire API](https://api.github.com/repos/laravel/livewire-starter-kit/releases/latest), [React API](https://api.github.com/repos/laravel/react-starter-kit/releases/latest)
- Keine erfolgreiche Installation, Kompilierung oder vollständige Testausführung behauptet.

## 3. Reale Lücken, Dopplungen und freie Begleitquellen

### Takeaway
Teil 10 enthält **19 Module, 72 Lektionen**. Sicherheit, Tests, Queues, Deployment, DI, DTOs, Transaktionen und Pagination sind vorhanden. Nur präzise Vertiefungen in bestehenden Lektionen empfehlen, keine Struktur ändern. Noch keine neue Lektion schreiben; zuerst Versionen, bewertete Quellen und Mapping abstimmen, Ausarbeitung erst nach „weiter“.

### Cited Findings
- Vollständiger Bestand mit IDs/Titeln: [curriculum.md](curriculum.md), Quelle [script-01.js](../../assets/script-01.js). Extraktion ausschließlich Node vm, vor var VERSION, Filter part 10.
- Sicherheit bereits m43, m47, m59-l2, m60-l1; Tests m55-l4/m51-l1 bis l3; Queues/Cache/Scheduler m50; Deployment m51-l4/m60-l4. [Bestand](curriculum.md)
- Lektionskörper zeigen: `paginate`/`cursorPaginate` in m48-l1; DTO, Transaktion und `lockForUpdate` in m49-l4; Idempotenz mit Cache-Lock in m48-l3 und erneut Webhooks/Queues. Nicht als fehlende Grundlagen ausgeben. [Lektionskörper](../../assets/script-01.js)
- Offizielles freies Learn-Angebot: „Getting Started with Laravel“ 13 Lektionen/120 Minuten und „PHP Fundamentals“ 10 Lektionen/71 Minuten. „13 lessons“ ist keine Versionsangabe! [Laravel Learn](https://laravel.com/learn)
- Stitcher ist frei lesbarer Blog, am Stichtag u. a. PHP-8.5-Artikel vom 20.11.2025, daneben vorläufige PHP-8.6-Texte. Startseite funktioniert; `/blog` lieferte 404. Kein offizieller Release-/Supportnachweis. [Stitcher](https://stitcher.io)
- Laravel News ist freie News-/Tutorial-Übersicht, gut zur Entdeckung, Homepage aber kein Nachweis für Version/Lizenz eines konkreten Beispiels. Kein News-Artikel als eines der sechs Codebeispiele aufgenommen. [Laravel News](https://laravel-news.com)
- Spatie-Doku ist frei, verlinkt aber den gesonderten Kurs „Laravel beyond CRUD“; diesen nicht als kostenlosen Bestandteil der Paketdoku zählen. [Dokuseite](https://spatie.be/docs/laravel-data/v4/introduction)

### Inferences
**Echte Ergänzungskandidaten, ohne neue Module:**
1. m42-l4/m51-l3: PHPDoc-Array-Shapes, `list<T>` versus assoziatives Array, generische Collections. In Teil 10 keine `@template`-/Array-Shape-Erklärung gefunden; PHPStan/Larastan existieren bereits. Nicht „statische Analyse fehlt“ behaupten.
2. m49-l4/m48-l1: verschachtelte DTOs, optional versus nullable und kontrollierte Serialisierung. Grundlegende DTO-/Value-Object-Einführung nicht verdoppeln; Laravel Data als Referenzvergleich.
3. m48-l1/m58-l1: expliziter erlaubter Filter-/Sortier-/Include-Vertrag und ungültige Query-Parameter. Query Builder bietet reale Tests, Pagination ist kein neues Thema.
4. m56-l4/m53-l4: Lokalisierung, Übersetzungsschlüssel und Pluralisierung als bislang nicht ausgeführter Praxisaspekt. UTC/Datum und deutsches number_format sind schon vorhanden. Vor Ausarbeitung noch eine konkrete aktuelle Primärquelle verifizieren.

**Wiederholungen bewusst abgrenzen:**
- m52-l2 ↔ m42-l2 Strings/Typen; m52-l4/l5 ↔ m42-l3 Kontrollfluss; m42-l3 ↔ m53-l1/l2 Arrays: Einstieg, kompakte Wiederholung und Vertiefung unterscheiden.
- m55-l4 ↔ m49-l1: DI ohne Framework versus Laravel-Container.
- m46-l2 ↔ m58-l4: Scopes/Soft Deletes einführen versus globale Scopes/Pruning vertiefen.
- m54-l3 ↔ m59-l1: Guzzle versus Laravel-HTTP-Client/Fakes, Timeouts nicht wortgleich wiederholen.
- m48-l3 ↔ m59-l2 ↔ m50-l1: API-/Webhook-/Job-Idempotenz per Querverweis verbinden.
- m51-l4 ↔ m60-l1/l4: Produktionscheckliste versus Sicherheitsprüfung und Projekt-Release; keine pauschale neue Security-/Deployment-Lücke.

### Gaps
- Lücken gelten für den untersuchten Teil-10-Text, nicht automatisch für ganz ROOTPFAD. Lokalisierungs-/PHPDoc-Primärquellen noch gezielt verifizieren, bevor Inhalte entstehen.
- Einzelvideo-Version und Videolizenz des Learn-Angebots nicht geprüft. Freie Begleitquelle, keine alleinige Versionsautorität; bezahlte Trainings nicht als frei eingeordnet.
- Keine App-Änderung, keine Lektion, keine Modul-/ID-/Strukturänderung.
