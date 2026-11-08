# PHP und Laravel Inhaltsprüfung

Stand: 06.11.2026. Automatischer Strukturcheck aller vorhandenen 72 Lektionen plus gezielte redaktionelle Stichproben der Beispiele und sicherheitsrelevanten Aussagen. Kein vollständiger fachlicher Beweis und keine Ausführung aller Laravel-Snippets.

## Ergebnis

19 Module, 72 Lektionen. 72 besitzen Text, Code und mindestens drei strukturell gültige Kontrollfragen. 72 haben explizite Lernziele, 72 unmittelbar verlinkte Quellen und 72 ausdrücklich drei Übungen. Das Vorhandensein einer kurzen Übung ist kein Nachweis einer vollständigen Übungsprogression.

## Redaktionelle Befunde und Prioritäten

- **P1, m52-l1 – umgesetzt:** PATH/Version, Dateiausführung, Lint-Grenzen, Parsefehler vor ini_set und nur lokaler Development-Server ergänzt. Die unbelegte pauschale Gratiszusage für IDE-Produkte entfernt.
- **P1, m45-l2 – zu überarbeiten:** Session/CSRF werden im Fließtext als globale Middleware beschrieben; tatsächlich muss globale Middleware von der web-Middlewaregruppe unterschieden werden. Quelle: https://laravel.com/framework/docs/13.x/middleware
- **P1, m48-l1/m48-l2 – zu präzisieren:** „API ohne Session und CSRF“ gilt nicht pauschal für Sanctums stateful SPA-Modus. API-Token und Cookie-Authentifizierung getrennt erklären. Quellen: https://laravel.com/framework/docs/13.x/sanctum und https://laravel.com/framework/docs/13.x/routing
- **P1, m46-l2 – zu präzisieren:** validated() ist keine Autorisierung und ersetzt kein geprüftes Model-/Feldkonzept. create(request->all()) übernimmt nicht unabhängig von fillable/guarded alle Felder; der bestehende Warntext ist zu pauschal. Quelle: https://laravel.com/framework/docs/13.x/eloquent#mass-assignment
- **P1, m59-l2 – zu vertiefen:** Signaturprüfung ist nicht die „einzige Sicherung“ eines Webhooks: zusätzlich Replay-Schutz, Zeitfenster, Größenlimits und eindeutige Ereignisverarbeitung. Die Identität/Signatur des konkreten Anbieters entscheidet über das Protokoll. Quelle: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
- **P2, m52-l3 – zu präzisieren:** Der Cent-Beispielcode multipliziert mit 1.19 als Float. Er ist daher nicht vollständig ganzzahlig/exakt, obwohl die Ausgangsbeträge Cent sind. Rundungsregel, Steuerberechnung und Dezimal-/Integerverfahren explizit begründen. Quelle: https://www.php.net/manual/en/language.types.float.php
- **P2, m56-l3 – versionsbezogen prüfen:** Livewire-Beispiele benötigen eine ausdrücklich festgelegte Hauptversion und ein lauffähiges Projektgerüst; die vorherige Recherche identifizierte Livewire 4 in aktuellen Starter Kits. Kein pauschales Fehlerurteil über jedes ältere gültige API.
- **P2, m48-l3/m50-l1 – Integrationsprüfung offen:** Idempotenz, Cache-Lock-Lebensdauer, Retry nach Seiteneffekten, Commit/Queue-Grenzen sowie parallele Requests mit Datenbank-Constraints testen. Stichproben zeigen bereits Locks/Transaktionen; deren Existenz allein beweist keine vollständige Garantie.
- **P2, m51/m60 – Abnahme vertiefen:** Beispiele in einem versionierten Laravel-13-Projekt mit echten Feature-/Policy-/Queue-Tests und dokumentierten Sollausgaben verbinden. Die Lern-App selbst ist Node, führt diese Snippets also nicht automatisch aus.
- **P3, Doppelungen:** m52 und m42 bei Variablen/Kontrollfluss als Einstieg versus Wiederholung kennzeichnen; m43/m47/m48 zwischen PHP-Sicherheit, Laravel-Webauth und API-Auth abgrenzen. Keine Module löschen.

## Abdeckung

Sicherheit, Tests, N+1, Queues, Deployment, DI, Transaktionen und ein Mini-Shop-Abschlussprojekt sind vorhanden. Es fehlen nicht pauschal diese Themen, sondern durchgängige Quellen, messbare Lernziele, drei abgestufte Aufgaben je Lektion, vollständige Abhängigkeiten und nachvollziehbare Abnahmetests. Bis auf m52-l1 wurden bestehende Lektionen in diesem Auftrag nicht stillschweigend neu geschrieben.

## Einzelprüfung

| ID | Lektion | Text/Code/Quiz | Lernziele | Quellen | Übungen erkannt | Expliziter Fehlerhinweis |
|---|---|---|---|---|---|---|
| m52-l1 | Deine Werkstatt: PHP installieren und das erste Skript | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m52-l2 | Text ausgeben: echo, Strings und Verkettung | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m52-l3 | Zahlen und Rechnen ohne Überraschungen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m52-l4 | Entscheidungen: if, else und Wahrheitswerte | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m52-l5 | Schleifen Schritt für Schritt | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m42-l1 | Was PHP ist und wie ein Skript läuft | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m42-l2 | Variablen, Typen und Vergleiche | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m42-l3 | Kontrollstrukturen und Arrays | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m42-l4 | Funktionen, Typen und Closures | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m53-l1 | Arrays anlegen, lesen und verändern | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m53-l2 | Sortieren und Umformen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m53-l3 | Strings bearbeiten: suchen, zerlegen, ersetzen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m53-l4 | Datum und Zeit richtig behandeln | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m43-l1 | Formulare verarbeiten und Ausgaben absichern | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m43-l2 | Sessions, Cookies und Passwörter | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m43-l3 | Datenbankzugriff mit PDO und Prepared Statements | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m54-l1 | Dateien lesen und schreiben | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m54-l2 | JSON sauber verarbeiten | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m54-l3 | HTTP-Anfragen an andere Dienste | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m54-l4 | Fehler, Exceptions und Logging in der Praxis | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m44-l1 | Klassen, Konstruktoren und readonly | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m44-l2 | Interfaces, abstrakte Klassen und Traits | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m44-l3 | Enums und Exceptions | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m44-l4 | Namespaces, Composer und PSR-Standards | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m55-l1 | Generatoren: große Datenmengen mit wenig Speicher | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m55-l2 | SOLID verständlich erklärt | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m55-l3 | Was PHP 8.4 und 8.5 Neues bringen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m55-l4 | Dependency Injection und Unit-Tests ohne Framework | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m45-l1 | Installation, Projektstruktur und Konfiguration | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m45-l2 | Request-Lebenszyklus und Routing | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m45-l3 | Controller und Blade-Templates | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m46-l1 | Migrationen, Factories und Seeder | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m46-l2 | Eloquent-Models und CRUD | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m46-l3 | Beziehungen zwischen Models | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m46-l4 | N+1-Problem, Eager Loading und Query Builder | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m47-l1 | Validierung und Form Requests | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m47-l2 | Authentifizierung, Middleware und CSRF | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m47-l3 | Autorisierung mit Gates und Policies | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m56-l1 | Blade-Komponenten bauen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m56-l2 | Vite, CSS und JavaScript einbinden | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m56-l3 | Livewire: interaktiv ohne eigenes JavaScript | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m56-l4 | Formulare mit gutem Nutzererlebnis | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m57-l1 | Datei-Uploads und das Storage-System | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m57-l2 | E-Mails mit Mailables | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m57-l3 | Benachrichtigungen über mehrere Kanäle | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m58-l1 | Fortgeschrittene Abfragen: whereHas, Aggregate, Subqueries | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m58-l2 | Eigene Casts und Value Objects | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m58-l3 | Polymorphe Beziehungen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m58-l4 | Globale Scopes, Soft Deletes und Pruning | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m48-l1 | API-Routen, Ressourcen und Statuscodes | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m48-l2 | Token-Authentifizierung mit Sanctum | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m48-l3 | Rate Limiting, Fehlerformat und Idempotenz | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m49-l1 | Service Container und Dependency Injection | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m49-l2 | Service Provider und Facades | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m49-l3 | Events, Listener und Observer | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m49-l4 | Schlanke Controller: Actions und Services | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m59-l1 | Der HTTP-Client von Laravel | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m59-l2 | Webhooks sicher empfangen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m59-l3 | Volltextsuche mit Laravel Scout | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m59-l4 | Echtzeit mit Broadcasting und Reverb | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m50-l1 | Jobs und Queues | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m50-l2 | Caching-Strategien | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m50-l3 | Performance messen und optimieren | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m50-l4 | Scheduler und Artisan-Commands | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m51-l1 | Feature-Tests mit Pest und PHPUnit | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m51-l2 | Fakes, Mocks und Zeitreisen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m51-l3 | Codequalität: Pint, Larastan und CI | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m51-l4 | Deployment und Sicherheit in Produktion | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m60-l1 | Security-Checkliste für Laravel | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m60-l2 | Betrieb beobachten: Logs, Pulse, Telescope, Fehlerdienste | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m60-l3 | Abschlussprojekt Teil 1: einen Mini-Shop planen | vorhanden / 3 Fragen | ja | ja | 3 | ja |
| m60-l4 | Abschlussprojekt Teil 2: Umsetzung und Release | vorhanden / 3 Fragen | ja | ja | 3 | ja |

## Aktualisierter Redaktionsstand

Alle 72 Lektionen wurden mit themenspezifischen Zielen, Entscheidungswissen, Fehlerhinweis, drei abgestuften Übungen und Lösungskriterien redaktionell ergänzt. Die oben als „zu prüfen/überarbeiten“ dokumentierten Punkte sind historische Befunde der Erstprüfung: aktuelle Lösungen stehen in content/php-review/editorial-plan.mjs und code-corrections.mjs. Die frühere Aussage „bis auf m52-l1 nicht neu geschrieben“ beschreibt nicht mehr den aktuellen Stand. Vollständige Prüfbelege: content/quality/summary.json, php-runtime.json und sources.json.

Die Erkennung ist heuristisch: vorhandene Abschnitte beweisen weder didaktische Perfektion noch vollständige Ausführbarkeit jedes Frameworkbeispiels. Versions-/Quellenbericht: reports/PHP Laravel Quellen und Versionsstand.md.
