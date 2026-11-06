# PHP/Laravel: Versionsstand, freie Quellen und Themenmapping

## 1. Welche stabilen Versionen und offiziellen Supportfristen sind zum 06.11.2026 belegt?

### Takeaway
Die abgerufenen Primärquellen belegen PHP **8.5.12** (21.10.2026) und Laravel Framework **13.40.0** (03.11.2026) als neueste jeweils ausgewiesene stabile Releases. Anders als befürchtet liefern diese Abrufe tatsächlich Daten bis November 2026; die Aussagen sind daher nicht aus einem früheren Snapshot hochgerechnet. Eine wichtige verbleibende Unsicherheit: Für Laravel 13 nennt die offizielle Tabelle beim Bugfix-Support nur **Q3 2027**, keinen exakten Tag. [PHP-Releases-API](https://www.php.net/releases/?json&version=8.5), [Laravel-GitHub-API](https://api.github.com/repos/laravel/framework/releases/latest), [Laravel-Supporttabelle](https://laravel.com/docs/releases)

### Cited Findings

**PHP-Support: offizielle tabellarische Termine, nicht rechnerisch aus „2+2 Jahren“ abgeleitet.** [Quelle für sämtliche Zeilen](https://www.php.net/supported-versions.php)

| PHP-Zweig | Erstveröffentlichung | Aktiver Support bis | Sicherheits-Support bis | Status am 06.11.2026 |
|---|---|---|---|---|
| 8.2 | 08.12.2022 | 31.12.2024 | 31.12.2026 | Nur Sicherheitsfixes |
| 8.3 | 23.11.2023 | 31.12.2025 | 31.12.2027 | Nur Sicherheitsfixes |
| 8.4 | 21.11.2024 | 31.12.2026 | 31.12.2028 | Aktiv |
| 8.5 | 20.11.2025 | 31.12.2027 | 31.12.2029 | Aktiv |

- PHP 8.5.12 ist laut [offizieller Ankündigung](https://www.php.net/releases/8_5_12.php) ein Security-Release; die [Releases-API](https://www.php.net/releases/?json&version=8.5) nennt Version und Veröffentlichungsdatum 21.10.2026. Die [Downloadseite](https://www.php.net/downloads.php) zeigt für Windows **8.5.12-1**, gebaut am 26.10.2026: Paket-/Buildrevision nicht mit einer neuen Sprachversion verwechseln.
- Die [PHP-Supportseite](https://www.php.net/supported-versions.php) kennzeichnet PHP **8.6.0 RC5** vom 05.11.2026 als Testversion. Das Vorhandensein eines 8.6-Migrationskapitels macht 8.6 nicht stabil. **8.6 nicht als produktive aktuelle Stable-Version ausgeben.**

**Laravel-Support: offizielle Tabellenwerte.** [Quelle für sämtliche Zeilen](https://laravel.com/docs/releases)

| Laravel | Unterstütztes PHP | Release | Bugfixes bis | Sicherheitsfixes bis | Status am Stichtag |
|---|---|---|---|---|---|
| 10 | 8.1–8.3 | 14.02.2023 | 06.08.2024 | 04.02.2025 | EOL |
| 11 | 8.2–8.4 | 12.03.2024 | 03.09.2025 | 12.03.2026 | EOL |
| 12 | 8.2–8.5 | 24.02.2025 | 13.08.2026 | 24.02.2027 | Nur Sicherheitsfixes |
| 13 | 8.3–8.5 | 17.03.2026 | **Q3 2027 – genauer Tag nicht veröffentlicht** | 17.03.2028 | Aktiv |

- [GitHub latest release](https://api.github.com/repos/laravel/framework/releases/latest): `tag_name: v13.40.0`, `published_at: 2026-11-03T15:08:56Z`, `draft: false`, `prerelease: false`; [dauerhafter Release-Link](https://github.com/laravel/framework/releases/tag/v13.40.0). Das ist ein konkreter Framework-Release, nicht die Versionsnummer des Anwendungsskeletts `laravel/laravel`.
- [Laravel-13-Upgradeguide](https://laravel.com/docs/13.x/upgrade) behandelt 12.x → 13.0, mit Auswirkungen nach Priorität. Insbesondere neue CSRF-Bezeichnung `PreventRequestForgery`; ältere Aliase bleiben deprecated. Die Dokumentation sollte deshalb ausdrücklich zur Framework-Hauptversion passen.

### Inferences
- **Empfehlung für neue Recherche-/Lernbasis:** PHP 8.5.x + Laravel 13.x; konkrete belegte Patchstände 8.5.12 bzw. 13.40.0. Das folgt aus aktivem Support und der offiziellen Kompatibilität, ist keine automatisch erteilte Freigabe für ein vorhandenes Projekt. PHP 8.4.x bleibt als aktive Kompatibilitätsbasis möglich. [PHP](https://www.php.net/supported-versions.php), [Laravel](https://laravel.com/docs/releases)
- „Aktuell“ bedeutet hier **neuester von den abgerufenen offiziellen Endpunkten belegter stabiler Release zum Recherchezeitpunkt**; keine Behauptung über nachträgliche Releases oder eine Prüfung sämtlicher Distributionspakete.

### Gaps
- **Unsicher/nicht tagesgenau bekannt:** Laravel 13 Bugfix-Enddatum. Q3 2027 muss wortgetreu bleiben; weder 17.09.2027 noch 30.09.2027 als offiziellen Termin erfinden.
- Die Patchstände der älteren PHP-Zweige wurden nicht separat recherchiert; die Supportfristen sind vollständig belegt. Verfügbarkeit von PHP-Extensions, Composer-Abhängigkeiten und Deployment-Kompatibilität eines konkreten Projekts wurde nicht geprüft.

## 2. Welche frei zugänglichen Quellen eignen sich, und welche Dokumentationslizenzen sind tatsächlich belegt?

### Takeaway
Die belastbare Kernbibliothek besteht aus PHP-Handbuch/Migrationsleitfäden, versionsgebundenen Laravel-Docs, Composer-Docs, PHP-FIG-Spezifikationen sowie OWASP Cheat Sheets und ASVS. PHP The Right Way eignet sich als Community-Orientierung, nicht als Sprach- oder Framework-Autorität; freie Lesbarkeit ist außerdem nicht gleich uneingeschränkte Weiterverwendung. [PHP](https://www.php.net/manual/en/migration85.php), [Laravel](https://laravel.com/docs/13.x/upgrade), [Composer](https://getcomposer.org/doc/), [PHP-FIG](https://www.php-fig.org/psr/), [OWASP](https://cheatsheetseries.owasp.org/), [PHP The Right Way](https://phptherightway.com/)

### Cited Findings

**Bewertung ist redaktionelle Einschätzung, keine von den Projekten veröffentlichte Metrik. Skala 1 (schwach) bis 5 (sehr stark), Reihenfolge: Aktualität / Tiefe / Autorität / Praxis.** Alle unten aufgenommenen Webquellen sind ohne Paywall lesbar; kommerzielle Zusatzangebote, z. B. Laravel Shift, sind kein erforderlicher Bestandteil.

| Quelle / exakt geprüfter Einstieg | A/T/Au/P | Kurze Begründung | Dokumentationslizenz mit eigenem Nachweis |
|---|---|---|---|
| PHP-Handbuch; Einstieg über [offizielle Migrationsseite mit vollständiger Handbuchnavigation](https://www.php.net/manual/en/migration85.php) | 5/5/5/4 | Primärreferenz für Sprache, Typen, OOP, Sicherheit und Funktionen; eher Referenz als Lernkurs. | **CC BY 3.0 oder später**, ausdrücklich für das Dokumentationsmaterial: [Copyright](https://www.php.net/manual/en/copyright.php). Nicht aus einer PHP-Softwarelizenz abgeleitet. |
| [PHP 8.4 → 8.5 Migration](https://www.php.net/manual/en/migration85.php) | 5/5/5/5 | Neue Funktionen, inkompatible Änderungen, Deprecations und Plattformänderungen getrennt; direkte Grundlage für Versionsabgrenzung. | Als Teil des Handbuchs **CC BY 3.0 oder später**: [Handbuch-Copyright](https://www.php.net/manual/en/copyright.php). |
| [Laravel Release Notes](https://laravel.com/docs/releases) + [13.x Upgrade Guide](https://laravel.com/docs/13.x/upgrade) | 5/5/5/5 | Maintainer-Quelle für Support, Kompatibilität und migrationsrelevante API-Änderungen; nach Auswirkung sortiert. | **MIT** direkt im **Dokumentationsrepository**, nicht bloß beim Framework geprüft: [laravel/docs 13.x license.md](https://raw.githubusercontent.com/laravel/docs/13.x/license.md). |
| [Composer-Dokumentation](https://getcomposer.org/doc/) | 5/5/5/5 | Autoritative Referenz für Lockfile, CLI, Schema, Constraints, Autoloading und untrusted packages; Markdown-Zugang vorhanden. | **MIT**: Die Dokumentationsseite erklärt ausdrücklich „Composer and all content on this site“ unter MIT; zusätzlich [Website-Repository-Lizenz](https://raw.githubusercontent.com/composer/getcomposer.org/main/LICENSE). |
| [PHP-FIG PSR-Index](https://www.php-fig.org/psr/) | 5/5/5/4 | Primärnormen für Interoperabilität, mit Accepted/Draft/Deprecated; keine Framework-Anleitung. | **Dokumenttexte CC BY 3.0 Unported, Code MIT**, sofern nicht anders angegeben: [Lizenzzuordnung](https://raw.githubusercontent.com/php-fig/fig-standards/master/LICENSE.md), [genauer CC-Lizenztext](https://raw.githubusercontent.com/php-fig/fig-standards/master/LICENSE-CC.md). |
| [PHP-FIG PER Coding Style 3.1](https://www.php-fig.org/per/coding-style/) | 5/5/5/4 | Aktuelle Sprachsyntax berücksichtigt; ersetzt/erweitert laut Dokument PSR-12. | **Gesonderte Lizenz für dieses separate Repository nicht verifiziert.** Keine automatische Übertragung der `fig-standards`-Lizenz: [Repository-Dateiliste](https://api.github.com/repos/php-fig/per-coding-style/contents/) enthält keine Lizenzdatei. Frei lesbar, Wiederverwendungsrecht offen. |
| [PHP The Right Way](https://phptherightway.com/) | 3/3/3/5 | Überblick mit vielen Praxislinks, Stand laut Seite 30.09.2026 und PHP 8.5; dennoch ältere Xdebug-Konfiguration (`xdebug.remote_*`) und historische Toolabschnitte. Community-Quelle, nicht offizielles PHP-Handbuch. | **CC BY-NC-SA 3.0 Unported**, Footer und [eigene LICENSE](https://raw.githubusercontent.com/codeguy/php-the-right-way/gh-pages/LICENSE). NC kann kommerzielle Nachnutzung beschränken; nicht als uneingeschränkt offene Lehrbuchlizenz behandeln. |
| [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) | 5/5/5/5 | Maintainer-gepflegte, fokussierte Sicherheitshinweise; alphabetischer Index und ASVS-Mapping. | **CC BY-SA 4.0 International** ausdrücklich im [Seitenfooter](https://cheatsheetseries.owasp.org/). |
| [OWASP Laravel Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Laravel_Cheat_Sheet.html) | 3/4/5/5 | Sehr praxisnah zu Mass Assignment, SQLi, XSS, Uploads, Auth und Sessions; Beispiele enthalten ältere `App\\Http\\Kernel`-/CSRF-Struktur. Mit Laravel-13-Docs abgleichen. | **CC BY-SA 4.0 International**, ausdrücklich im [eigenen Footer](https://cheatsheetseries.owasp.org/cheatsheets/Laravel_Cheat_Sheet.html). |
| [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) | 5/5/5/4 | **5.0.0, veröffentlicht 30.05.2025**, als Stable gekennzeichnet; überprüfbare Anforderungen statt bloßer Risikoliste. | **CC BY-SA 4.0**, direkt auf der [Projektseite](https://owasp.org/www-project-application-security-verification-standard/) verlinkt. |
| [OWASP Top 10:2025](https://owasp.org/Top10/2025/) | 5/3/5/4 | Aktuelle breite Risikoorientierung; nicht als vollständige Prüfliste missverstehen. | **CC BY 3.0 Unported**, ausdrücklich im [Footer dieser Ausgabe](https://owasp.org/Top10/2025/). Nicht mit der BY-SA-4.0-Lizenz anderer OWASP-Projekte gleichsetzen. |

### Inferences
- Priorität für belastbare Aussagen: Sprachverhalten → PHP-Handbuch; Laravel-Verhalten/Version → versionierte Laravel-Docs; Dependency-Management → Composer; Interoperabilität → accepted PHP-FIG-Spezifikation; Sicherheitsanforderung → ASVS + passendes Cheat Sheet. PHP The Right Way ergänzt die Navigation, überschreibt aber keine Primärquelle.
- Für eigene Zusammenfassungen und Links sind die Quellen sehr gut geeignet. Bei Übernahme, Übersetzung oder Einbettung umfangreicher Originaltexte müssen Attribution, MIT-Hinweise, ShareAlike und gegebenenfalls NonCommercial separat geprüft werden; hier keine pauschale Lizenzfreigabe.

### Gaps
- Gesonderte Weiterverwendungslizenz der PER-Coding-Style-Dokumentation nicht nachgewiesen; **offen markieren**, nicht raten.
- Kein vollständiger Lizenz-Audit eingebundener Bilder, Logos, User-Kommentare oder verlinkter Fremdseiten. Die festgestellten Dokumentationslizenzen sind keine pauschale Lizenz sämtlicher Drittinhalte.

## 3. Wie werden die Quellen auf Themenfelder abgebildet, ohne bereits Lektionen zu erstellen?

### Takeaway
Das Mapping trennt Referenz, Praxisüberblick, Upgrade-Differenzen und Sicherheitsprüfung. Es beschreibt lediglich Quellenzuständigkeiten; keine Lektionen, Aufgaben oder Codeänderungen.

### Cited Findings

| Themenfeld | Hauptquelle | Ergänzung / Abgrenzung |
|---|---|---|
| Syntax, Typen, Funktionen, OOP, Namespaces, Exceptions | PHP-Handbuch, über [Handbuchnavigation](https://www.php.net/manual/en/migration85.php) erreichbar | [PHP The Right Way – Language Highlights](https://phptherightway.com/#language_highlights) für Einordnung; Handbuch entscheidet bei Details. |
| PHP-Modernisierung und Versionsgrenzen | [Migration PHP 8.5](https://www.php.net/manual/en/migration85.php) | Dort verlinkte 8.0–8.4-Guides bei mehrstufiger Modernisierung; [Supporttabelle](https://www.php.net/supported-versions.php) für Lebenszyklus. |
| Composer, Dependencies, Lockfile, Constraints, PSR-4-Autoloading | [Composer-Dokumentation](https://getcomposer.org/doc/) | [PHP-FIG-Index: PSR-4](https://www.php-fig.org/psr/) für Norm; Composer für Umsetzung. |
| Coding Style und Teamkonventionen | [PER Coding Style 3.1](https://www.php-fig.org/per/coding-style/) | [PSR-1/PSR-12-Status](https://www.php-fig.org/psr/); bestehende Projektkonventionen nicht ungefragt ändern, Lizenz der PER-Texte offen. |
| Logger, Container, HTTP, Cache, Clock-Interoperabilität | [Accepted PSRs 3, 6, 7, 11, 15, 16, 17, 18, 20](https://www.php-fig.org/psr/) | Spezifikationen nicht mit Laravel-spezifischen Contracts gleichsetzen. Draft PSR-5/19 sind keine verabschiedeten Normen. |
| Laravel-Version, PHP-Kompatibilität, Upgradeplanung | [Release Notes](https://laravel.com/docs/releases), [13.x Upgrade Guide](https://laravel.com/docs/13.x/upgrade) | Erst Zielhauptversion festlegen; neueste nicht versionierte Docs können später wechseln. |
| Websicherheit: Auth/Authz, Session, SQLi, XSS, CSRF, Uploads | [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/), [Laravel Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Laravel_Cheat_Sheet.html) | Frameworkdetails gegen [Laravel-13-Upgradeguide](https://laravel.com/docs/13.x/upgrade) prüfen; generische Cheat Sheets im Index sind die stabile Ergänzung zu teils älteren Frameworkbeispielen. |
| Sicherheitsanforderungen und Coverage | [ASVS 5.0.0](https://owasp.org/www-project-application-security-verification-standard/) | Anforderungs-IDs versionsgebunden referenzieren, laut Projekt etwa `v5.0.0-1.2.5`; [Top 10:2025](https://owasp.org/Top10/2025/) nur als Risikoorientierung. |

### Inferences
- Quellenkorpus für Schritte 1/2 priorisieren: offizielle Referenzen als Pflichtkern, OWASP als Sicherheitskern, PHP The Right Way als klar gekennzeichnete Community-Ergänzung. Das Mapping ist ein Vorschlag auf Grundlage der oben belegten Inhaltsverzeichnisse und Zuständigkeiten, noch kein Curriculum.

### Gaps
- Die übergeordnete konkrete Themen-/Kompetenzliste war diesem Teilauftrag nicht beigefügt. Das Mapping deckt die hier ausdrücklich angefragten Quellenfamilien ab und muss beim Zusammenführen auf die tatsächlichen Themen-IDs des Hauptauftrags übertragen werden.
