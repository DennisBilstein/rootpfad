# ROOTPFAD – hier geht es weiter

Stand: 06.11.2026. Der Nutzer hat die Arbeit ausdrücklich pausiert und den Push
des aktuellen Projektstands angefordert. Keine weiteren Inhalte ungefragt ausarbeiten.

## Exakter Haltepunkt

**Nur eine der 72 PHP-/Laravel-Lektionen wurde vollständig überarbeitet:**
`m52-l1` „Deine Werkstatt: PHP installieren und das erste Skript“.
Sie enthält Lernziele, eigene Beispiele, typische Fehler mit Lösungen, Quellen,
drei abgestufte Übungen mit Lösungskriterien und drei Selbsttestfragen.

**Die übrigen 71 Lektionen sind geprüft, aber noch nicht überarbeitet.**
Nicht behaupten, der gesamte PHP-Pfad sei bereits verbessert. Die Prüfung war
ein Strukturcheck aller Lektionen plus fachliche Stichproben, keine vollständige
Ausführung oder Validierung aller Laravel-Beispiele.

Nächster sinnvoller Arbeitsschritt nach Freigabe: Befunde aus
`reports/PHP Laravel Inhaltsprüfung.md` priorisiert beheben und die übrigen
PHP-Lektionen systematisch ausarbeiten. Bei linearer Fortsetzung folgt
`m52-l2` „Text ausgeben: echo, Strings und Verkettung“.
Vor einer größeren Überarbeitung klären, ob zuerst die sicherheitsrelevanten
P1-Befunde oder die lineare Anfängerfolge bearbeitet werden sollen.

## Qualitätsbefunde

- Alle 72 bestehenden PHP-Lektionen enthalten Text, Code und mindestens drei
  strukturell gültige Kontrollfragen.
- Explizite Lernziele, überprüfte Quellen und drei abgestufte Übungen fehlen
  noch in weiten Teilen.
- P1: Middleware-Gruppen (`m45-l2`), Sanctum-API versus SPA (`m48-l1/l2`),
  Mass Assignment versus Validierung/Autorisierung (`m46-l2`), Webhook-Replay-
  und Zusatzschutz (`m59-l2`).
- P2: Cent-/Float-Rundungsbeispiel (`m52-l3`), Livewire-Hauptversion (`m56-l3`),
  realistische Idempotenz-/Parallelitäts-/Queue-Tests und Laravel-13-Testprojekt.
- Sicherheit, Tests, N+1, Queues, Deployment und Abschlussprojekt sind bereits
  vorhanden: gezielt vertiefen, keine doppelten Module anlegen.

## JavaScript und Vue

Mit Zustimmung wurde **nur Einheit 1** ausgearbeitet und integriert:
`js-m1-l1` „JavaScript-Einheit 1: Werte, Variablen und Kontrollfluss“ im neuen
Lernpfad „JavaScript & Vue“. Dies ist noch kein vollständiger Vue-Kurs.
Nächste vorgeschlagene Einheit: Funktionen, Scope und Closures.
Weitere Einheiten erst nach Bestätigung. Persönliches Level und Lernziel des
Nutzers wurden bisher nicht konkretisiert; keine ABAP-/PHP-Vorkenntnisse voraussetzen.

## Bereits umgesetzt

- Lernpfadauswahl AP1, PHP/Laravel, Git, Java, ABAP, JavaScript oder alle Inhalte;
  passende Navigation, Fortschritt und Trainingsfilter; AP1-Prüfungspool getrennt.
- 22 recherchierte ABAP-Ergänzungen mit 54 Quizfragen und Quellen-/Zugangshinweisen.
- Lernwerkstatt: Tagesmissionen, Beherrschungsstufen und drei ABAP-Bosse mit zwei
  Varianten. Kriterien sind transparent und heuristisch, kein Zertifikat.
- Node-/Express-Server mit SQLite, gesalzenen Passwort-Hashes, Sessions,
  einladungsbasierter Registrierung, Teilnehmer-/Admin-Rollen, automatischer
  Fortschrittsübertragung und Adminampel unter `/admin`.
- Ampel misst Bearbeitungsstand und übertragene Aktivität, keine fachliche
  Beherrschung oder individuellen Lernfristen. Schwellen einstellbar.
- Noch kein öffentliches Deployment. Internetbetrieb benötigt HTTPS,
  persistente Datenablage, Backups und Sicherheits-/Datenschutzprüfung.
- Konten und Lernstände in `.data/` sind absichtlich NICHT im Repository.
  Kein festes Adminpasswort; erster Start erzeugt einmaligen Setup-Link im Terminal.

## Relevante Dateien

- `content/learning-refinements.json`: redaktionelle Quelle für PHP-Lektion 1
  und JavaScript-Einheit 1.
- `scripts/build-learning-content.mjs`: reproduzierbare Integration dieser Inhalte.
- `scripts/prepare-first-lessons.mjs`: ursprünglicher Generator; bei redaktionellen
  Änderungen nicht versehentlich ältere Inhalte zurückschreiben.
- `scripts/audit-php-content.mjs`, `content/php-review/`: Prüfwerkzeug und Bestandsdaten.
- `reports/PHP Laravel Quellen und Versionsstand.md`: bewertete Quellen und Mapping.
- `reports/JavaScript Vue Quellen und Versionsstand.md`: Quellen und vorgeschlagene
  Gliederung; Pinia-Doku/Release-Abweichung vor Weiterarbeit erneut prüfen.
- `server.mjs`, `assets/accounts.js`, `assets/bootstrap.js`: Anmeldung und Sync.
- `assets/learning-paths.js`, `assets/learning-missions.js`, `assets/learning-bosses.js`.

## Start und Tests

```sh
npm install
npm run dev
npm run build
npm test
```

Zuletzt: **10 Browsertests bestanden**, Build wiederholbar ohne doppelte IDs.
PHP-Beispiel unter PHP 8.5.11 geprüft und ausgeführt, JavaScript unter Node 22.23.3.
Alle Versions-/Quellenangaben vor weiterer Arbeit erneut auf Aktualität prüfen.
Bei Serveränderungen lokalen Node-Prozess neu starten; Browser neu laden.

## GitHub

Privates Repository: https://github.com/DennisBilstein/rootpfad
Branch: `main`. Keine Veröffentlichung oder Änderung der Sichtbarkeit ohne Auftrag.
