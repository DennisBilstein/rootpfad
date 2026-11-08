# ROOTPFAD Laravel 13 Lernlabor

Isoliertes lokales Übungsprojekt, nicht die technische Implementierung der
ROOTPFAD-Plattform. Basis ist das offizielle MIT-lizenzierte Laravel-Skelett;
Original-Copyright und Lizenz sind über Composer/Upstream dokumentiert:
https://github.com/laravel/laravel und https://github.com/laravel/framework/blob/13.x/LICENSE.md.
Eigene Lab-Tests stehen unter `tests/Feature/LearningContractsTest.php`.

## Installation und Test

```sh
composer install --no-interaction
php artisan test
```

Die Lab-Tests verwenden SQLite im Speicher und keine echten externen Dienste.
Sie benötigen keine echten Secrets und keine Produktionsdatenbank. Das ist
kein vollständiger Shop und kein Beweis für PostgreSQL-/MySQL-Lockverhalten.
Ausführungsnachweise und Paketstände werden in `content/quality/` festgehalten.

## Zuordnung

- Routing/Middleware: m45, m47
- Validierung/Autorisierung: m46, m47, m48
- Mass Assignment und Datenzugriff: m46
- HTTP-Fakes/Fehlerbehandlung: m59 und m51
- Idempotente lokale Speicherung: m48 (Unique-Key + atomarer DB-Vorgang)
- Tests und Releaseabnahme: m51 und m60

Nicht sämtliche Codeblöcke des Kurses laufen in diesem Labor. Ein Kursfragment
bleibt ein Fragment, wenn seine referenzierten Models, Views oder externen
Dienste hier nicht implementiert sind. Für die eigenen Anwendungen die Übungen
mit den im Lerntext genannten Voraussetzungen vervollständigen.
