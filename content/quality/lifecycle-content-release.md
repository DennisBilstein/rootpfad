# Abschlussprüfung 08.11.2026

- Vollständige Playwright-Suite: **40 bestanden**.
- Danach erweiterter Kontentest: **bestanden**, einschließlich echter
  Browser-Resetansicht (Token aus Fragment entfernt), Löschformular,
  Gast-Neustart und Entfernung des lokalen Kontolernstands.
- Reset: neutrale Antwort, Hashspeicherung, abgelaufen/Version ungültig,
  einmalige Verwendung, Sitzungswiderruf, neue Anmeldung getestet.
- Löschung: falsches Passwort abgewiesen, letzter Admin geschützt,
  Teilnehmer nicht mehr in Adminübersicht, alte Sitzung ungültig.
- `npm run build`, `npm run audit:learning`, `npm audit`: erfolgreich.
- Browser lädt 34 Manifest-Skripte <300000 Bytes und nicht das Quellaggregat.
- 116 Module / 462 Lektionen / 1253 Lektionsfragen / 306 Zusatzkarten erhalten.

## Inhaltsprüfung

Gezielte Lückenanalyse statt Behauptung vollständiger Fachabdeckung:
SSRF fehlte explizit, Outbox war nur knapp erwähnt, Cachevalidatoren existierten,
aber Cache-Control/Shared-Cache-Datenschutz waren nicht ausreichend vertieft.
Zusätze in bestehenden Lektionen mit Praxisfällen und begründeten Selbsttests.
Referenzen: OWASP SSRF Prevention, RFC 9111, Microservices.io Transactional Outbox;
redaktionelle Quelle `content/application-supplements.mjs`.

## Verifikationsgrenzen

Keine echte SMTP-Zustellung ohne Mailkonfiguration getestet. Keine neuen
ausführbaren SSRF-/Broker-/Proxy-Labore behauptet: diese Übungen sind angeleitete
Praxisaufträge. Kein Lazy Loading oder garantierter Startzeitgewinn; alle Teile
werden beim Start geladen. Kein öffentliches Deployment, keine unabhängige
menschliche Fach-Zweitbegutachtung und keine forensische Löschgarantie.
Der Release-Audit liest Laborberichte früherer Läufe; diese Änderung führt die
Laravel-/Vue-Labore nicht erneut aus.
