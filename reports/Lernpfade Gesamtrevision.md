# PHP und JavaScript – Gesamtrevision

Stand 06.11.2026. Nutzerauftrag: alle PHP-/Laravel-Lektionen überarbeiten und
danach den JavaScript-/Vue-Pfad vervollständigen. Keine Aussage „perfekt“ oder
„alles produktiv getestet“ ist durch diese Arbeit gerechtfertigt.

## Umfang

- 72 vorhandene PHP-/Laravel-Lektionen mit unveränderten IDs und drei
  Kontrollfragen pro Lektion; zwei bereits ausgearbeitete Einstiege erhalten.
- 70 weitere Lektionen redaktionell ergänzt: jeweils themenspezifisches
  Lernziel, Voraussetzungen, Entscheidungsbegründung, Fehlerbild, drei Aufgaben
  und Abnahmekriterien. Bestehende Konzepterklärungen bleiben Grundlage.
- 16 JavaScript-/Vue-Einheiten: Sprache, Scope, Objekte, Asynchronität, Browser,
  Tooling, TypeScript, SFC, Reactivity, Komponenten, Composables, Router, Pinia,
  Testing, Qualitäts-/Releasefragen und zusammenhängendes Abschlussprojekt.
- Quellen sind pro Fachabschnitt verlinkt. Freie Lesbarkeit ist keine pauschale
  Wiederveröffentlichungslizenz; die neuen Erklärungen und Lab-Beispiele sind eigenständig.

## Konkrete fachliche Korrekturen

Middleware-Gruppen werden von globalem Stack getrennt, Sanctum-SPA und
Bearer-Token-Flows differenziert. validated() wird nicht als Autorisierung
verkauft. API-Resources werden nicht mehr mit der falschen Begründung erklärt,
dass Model-Serialisierung immer jede Spalte ausgibt. Cent-/Steuerbeispiel nutzt
für den begrenzten nichtnegativen Lernfall eine explizite Integer-Rundung.
Webhook-Freshness, Deduplizierung und externe Idempotenz bleiben eigene Grenzen.
Cacheversionen bekommen TTL, Singleton-Lebensdauer und Queue-Dubletten werden
präzisiert. Gefährliche breite Löschbefehle sind aus der Deployment-Lehrvorlage
entfernt. Request-IDs werden im Beispiel begrenzt.

Zehn zuvor syntaktisch unvollständige zusammenkopierte PHP-Blöcke wurden durch
abgegrenzte Klassendateien bzw. Lehrfunktionen ersetzt. Nicht implementierte
Shopmodels bleiben als Voraussetzungen benannt; sie sind nicht automatisch
Bestandteil des separaten Laravel-Labors.

## Nachweise und Grenzen

`content/quality/summary.json`: Struktur, Quellenabrufe, Syntax- und
Ausführungszahlen. `php-runtime.json`: Ergebnis je PHP-Block. `sources.json`:
HTTP-Status, Abrufzeit und Ziel-URL. Ein HTTP-200 allein beweist keine fachliche
Richtigkeit oder vollständige manuelle Inhaltsprüfung.

`lab-checks.json`: Ausgaben der echten Laravel-/Vue-Testläufe und des Vue-Builds.
Das Laravel-Labor testet sieben selbst geschriebene Szenarien plus zwei
Skeleton-Tests. Vue testet sechs Fälle einschließlich Data Validation, Props,
Store, Fehlerstatus und verspäteter Antworten. Beide Labore besitzen Lockfiles.

Kein produktives Deployment, keine echten Zahlungen/Mails, keine vollständigen
MySQL-/PostgreSQL-Parallelitätstests, keine zugesagte WCAG-Zertifizierung. Die
gesamte didaktische Wirksamkeit wurde nicht in einer Teilnehmerstudie gemessen.
Alle Frameworkfragmente fachlich „perfekt“ zu nennen wäre falsch.

## Weitere sinnvolle Iteration

Pro Lektion vollständige Anwendungen/Fixtures ergänzen, wenn ihr Beispiel noch
ein Projektfragment ist; Abnahmen schrittweise in Regressionstests überführen.
Das gemeinsame Shopprojekt und Laravel-Vue-Sessionauth real integrieren, mit
Owner-/Fremdzugriffs-,CSRF-,Concurrency- und Restore-Nachweisen. Quizrevisionen
zukünftig mit versionierter Evidenz versehen, statt alte Antworten als aktuellen
Kompetenznachweis zu behandeln. Nuxt/OData sind Ausblick, kein fertiger zweiter Kurs.
