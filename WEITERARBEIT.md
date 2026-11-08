# ROOTPFAD – hier geht es weiter

## AKTUELL – Gesamtrevision auf ausdrücklichen Auftrag

## Maßgeblicher Abschlussstand 08.11.2026 (ältere Zahlen unten historisch)

NEUESTER STAND: alle drei Lifecycle-/Auslieferungswünsche implementiert.
Reset in server/account-lifecycle.mjs (SMTP konfigurierbar, standardmäßig disabled,
15 Minuten, Hashspeicherung, Einmalverwendung, Sitzungswiderruf); kein echter
SMTP-Versand geprüft. docs/mail-configuration.md enthält Konfiguration/Grenzen.
Kontolöschung mit Passwort+KONTO LÖSCHEN, letzter Admin geschützt; aktive Daten
und lokaler Kontolernstand entfernt, danach Gast-Neustart. Laufender Sync darf
nach Löschung keine Antwort zurück in lokalen Speicher schreiben.
34 Manifest-Skripte jeweils <300000 Bytes, alle beim Start geladen (kein Lazy Loading).
Quellaggregat bleibt für Server/Build/Tests. Buildhook: split-learning-bundle.mjs.
3 additive Fachvertiefungen in api-m1-l6 (SSRF),api-m1-l2 (HTTP Caching),m49-l3
(Transactional Outbox); keine neuen IDs/Quizrevisionen. Quelle/Build persistent.
Prüfung: 40/40 vollständige Tests erfolgreich; Kontentest danach zusätzlich mit
echter Browser-Resetansicht und Browser-Löschformular erfolgreich. Build,
audit:learning und npm audit erfolgreich (0 gemeldete Paketlücken).
Keine erneute Ausführung aller Fachübungen oder unabhängige Fachprüfung behauptet.
Kein Push/Deployment. Ältere Angaben „Reset/Löschung offen“ unten sind überholt.

Neuester Verbesserungsauftrag: Konto-Passwortwechsel mit alter Passwortprüfung,
Sitzungswiderruf und neuer aktueller Sitzung; persönlicher Serverexport ohne
Hashes/Tokens; UI assets/account-settings.js. Asynchrones scrypt in
server/passwords.mjs, alte Hashform kompatibel. Race-Recheck bei Anmeldung,
Registrierung und Setup nach await. Öffentliche Assets gzip-Kompression via
compression, private APIantworten ausgeschlossen. Tests für Export,Passwort,
Sitzungswiderruf,Hashverifikation und Content-Encoding hinzugefügt. Kein Push
oder öffentliches Deployment erfolgt. E-Mail-Reset/Löschung weiterhin offen.

Abschließende Prüfung: 37 ROOTPFAD-Tests bestanden, Laravel-Labor9/Vue-Labor6
bestanden, Vue-Typecheck/Build und beide npm-Audits ohne Befund. Build zweimal
reproduzierbar. Alle116 Modulaufträge jetzt individuell ausgearbeitet, 0 reine
Rubrikentwürfe (ältere90-Zahl unten veraltet). Weiterhin keine unabhängige
Fachzertifizierung oder tatsächliche Durchführung aller116 Arbeiten.
Quellenregister455,449 technisch erreichbar,6 gesperrte/fehlgeschlagene Abrufe.
Gesamte Quizredaktion:1253+306 vollständig,0 offene Inhaltspositionen.

- Vollständige Redaktion integriert: 1.253 Lektionsfragen + 306 Zusatzkarten =
  1.559. Alle besitzen neue Inhaltsrevision und individuelle Optionsbegründungen.
- Sechs vollständige Pakete unter content/quiz-batches; keine offenen Teilpakete.
- 116 individuell ausgearbeitete manuelle Modulabnahmen mit 348 konkreten Fällen;
  Quellen und vier Kriterien pro Modul. Keine automatischen Anwendungsnachweise.
- Kompetenzansicht, Adminprüfung, Fragenunklarheitsmeldung und revisionsbezogene
  Erstversuchsauswertung implementiert. Alte Bearbeitungsampel bleibt unverändert.
- Parallelformen erst für 3 Aufgabenfamilien/6 Varianten; nicht für jede Frage.
- 6 widersprüchliche Lektionskörper fachlich präzisiert.
- Automatischer Quizstilcheck: keine aktuellen Duplikat-/Längenwarnungen; kein
  Beweis empirisch perfekter Distraktoren. Antwortreihenfolge in Lektionsquizzen
  mischt Darstellung, nicht gespeicherte Antwortindizes.
- Quellenregister aktuell455 URLs,449 automatisch erreichbar,6 Abrufprobleme.
  Linkstatus ≠ inhaltliche Prüfung; keine menschliche unabhängige Zweitbegutachtung.
- Websitehärtung: Sync-Typprüfung,Kontowechsel-Schutz,Adminfreigabe nur serverseitig,
  neuere Evidenz nicht durch ältere überschreiben,Startfehleranzeige,reduced motion.
- Modulabnahmequellen: content/assessments-ap1.json,assessments-backend.json,
  assessments-java-web.json. Build integriert diese in module-assessments-data.js.
- npm run audit:learning und content/quality/release-status.json liefern Stand.
- Kein öffentliches Deployment und kein Push seit dem früheren Nutzerauftrag.
- Weiterer echter Ausbau: Parallelformen für mehr Stoff,praktische unabhängige
  Fach-/Usabilityprüfung,mehr sichere Runtime-Labore,Passwortwiederherstellung und
  Konto-/Datenlöschung vor realem externen Teilnehmerbetrieb. Nicht „perfekt“ nennen.

## Historischer Verlauf (nicht als aktuelle offene Quizanzahl verwenden)

AKTUELL nach Neustarts am 08.11.2026: Vollständige Pakete ap1a312,abap207,web153
werden validiert eingebunden. Daraus plus bisheriger Redaktion: 592 revidierte
Lektionsfragen / 1.253, 146 revidierte Zusatzkarten / 306 = 738/1.559 gesamt.
Noch offen: 661 Lektionsfragen und 160 Zusatzkarten. Teilpakete ap1b und php
sind gespeichert, aber ausdrücklich nicht integriert, solange unvollständig.
Java-Paket fehlt noch. `scripts/load-quiz-batches.mjs` prüft Identität,Vollständigkeit,
Antwortstruktur und übernimmt nur vollständige Pakete. Revidierte Zusatzkarten
haben eigene @2026-11-07-full-v3-IDs. Optionsbegründungen auch in Wiederholung.
Hintergrundaufträge zur Fortsetzung existieren in den Sessions
ses_e4cd63a46ffeVQYptlIZpwnjGx (ap1b), ses_e4cd63a43ffeDKu36MtanckHUk (php),
ses_e4cd63a21ffeQDO6tzaTzT6T6c (java). Bei Neustart gespeicherte Dateien prüfen,
keine fertigen Pakete neu erzeugen. Nutzer will ALLE Fragen, keine erneute Freigabe
nach Teilpaketen. Aufgabe weiterhin nicht abgeschlossen.

Fortsetzung 07.11.2026: weitere 37 AP1-Fragen individuell redigiert; jetzt 66 von
1.253 Lektionsfragen ersetzt, 1.187 noch offen (Zusatzkarten weiterhin separat).
`content/quiz-ap1-round2.mjs`: Algorithmen,Suche/Sortierung,Komplexität,
Normalisierung,SQL,Adressierung,DNS und Netzdiagnose. Neue Revision
2026-11-07-ap1-v2; kein Fortschritt alter Karten automatisch übernommen.
Konkrete alte Pauschalen korrigiert: binäre Suche nicht universell exakt 10
Vergleiche, Bubble-Sort mit Frühabbruch nicht immer 10, Normalform nicht aus
Spaltennamen raten, /31-Sonderfall,DNS-TCP und OS-abhängige Ephemeral-Ports.
Primärquellen für /31,DNS-TCP,COUNT abgerufen; Belegnotizen in sourceChecks.
26 Tests bestanden. Vollständige Quizredaktion UND sechs danach beauftragte
Folgemechanismen bleiben offen. Nicht erneut „nur 29“ als aktuellen Stand nennen.

## Verbindlicher Folgeauftrag vom 07.11.2026

Der Nutzer hat ausdrücklich **danach**, also nach der noch offenen vollständigen
fachlichen Quizredaktion, diese sechs Verbesserungen angefordert. Auftrag
gespeichert, noch nicht implementiert. Nicht die Reihenfolge still ändern und
keinen der Punkte allein durch ein Konzeptpapier als erledigt ausgeben.

1. **Kompetenzen statt Seitenfortschritt:** Gelesen (Bearbeitungsmarkierung),
   Wiedererkannt (Auswahlantwort) und Selbstständig angewendet (konkrete praktische
   Abnahme ohne aufgedeckte Lösung) getrennt erfassen und darstellen. Bestehende
   Stände bleiben historisch; XP, Selbstbewertung und Multiple Choice sind kein
   automatischer Anwendungsnachweis. Adminampel nicht unbemerkt umdeuten.
2. **Plausible Fehlantworten:** Je Frage reale Fehlannahmen und kontextspezifische
   Begründungen redigieren; richtige Antwort darf nicht systematisch durch Länge,
   Ton oder Position verraten werden. Automatischer Längen-/Positionscheck ist nur
   ein Redaktionshinweis, kein Ersatz für Fachprüfung. Antworten nicht ohne
   versionierte Zuordnung umsortieren.
3. **Neue Varianten nach Lernabstand:** Fachlich äquivalente Varianten mit anderen
   Daten/geeigneten Fehlerfällen entwickeln. Separate Varianten-ID und Zeitnachweis;
   Lösung gesehen oder unmittelbar wiederholt ist kein verzögerter Transfer.
   Die Zeitschwellen sind transparente Produktregeln, keine validierten Garantien.
4. **Praktische Abnahme pro Modul:** Für jedes bestehende Modul ein konkretes
   prüfbares Arbeitsprodukt und Normal-,Grenz- und Fehlerfall definieren.
   Voraussetzungen, Prüfer, Ausführungsumgebung und Rubrik nennen. Wo noch kein
   sicherer Runner existiert, als manuelle Abnahme kennzeichnen, nicht automatisch
   bestanden. Fortschritt der Modulabdeckung maschinenlesbar dokumentieren.
5. **Schwierigkeit aus echten Antworten:** Revisions-/Variantenbezogene Erstversuche,
   Hilfen, Lösungseinblick und Rückmeldungen zu Unklarheit erfassen. Übungssessions
   nicht mit unabhängigen Teilnehmenden verwechseln; Mindestdatenmenge, Datenschutz
   und Rollenrechte berücksichtigen. Schlechte Trennschärfe/geringe Quote ist ein
   Anlass zur Prüfung, kein automatischer Beleg von Schwierigkeit oder Unklarheit.
6. **Quellen und Versionsgrenzen:** Quellenregister mit fachlichem Prüfdatum,
   Produkt-/Protokoll-/Rechtsstand, Zuständigkeit und offener Prüffrist. Link-HTTP-200
   ist nur Erreichbarkeit, keine inhaltliche Aktualität. Rechts-/Sicherheitsaussagen
   primärquellenbezogen prüfen und nicht belegte Punkte sichtbar offen lassen.

Für jeden Punkt vor Abschluss Implementierung und echte Tests berichten; keinen
pauschalen Abschluss aller 116 Module oder aller 1.559 Fragen behaupten, bevor
Abdeckungsnachweis und Facharbeit tatsächlich vorliegen. Kein Git-Push oder
Deployment ohne eigenen Auftrag.

## Vorheriger Arbeitsstand (Quizredaktion weiterhin offen)

Letzter Auftrag am 07.11.2026: „alle Quizfragen wie besprochen“.
Zusätzlich umgesetzt: alle 1.559 Lektions-/Zusatzkarten mit aufgabengebundenem
Abrufauftrag und 4-teiliger Selbstprüfrubrik; Darstellung in Lektionsquiz und
Wiederholung. Dateien `scripts/build-quiz-learning-contracts.mjs`,
`assets/quiz-learning-contracts.js`, `content/quality/quiz-contract-coverage.json`.
WICHTIG: Dies ist eine didaktische/technische Aufbereitung vorhandener Lösungen,
KEINE vollständige neue fachliche Szenarioredaktion. Weiterhin nur 29 individuell
ersetzte Altfragen; 1.224 Lektionsfragen und Zusatzkarten brauchen echte
fachliche Prüfung. Nutzerauftrag daher in diesem Umfang NOCH NICHT vollständig
erfüllt. Keine gesamte Fachredaktion oder geprüfte Distraktoren behaupten.

NEUESTER HALTEPUNKT: Nutzer bat um vollständige fachliche Quizüberarbeitung und
Expertenverbesserungen. Umgesetzt ist ERSTE TRANCHE: 29 alte Fragen ersetzt,
mit Szenario,Distraktorbegründungen und versionsgetrennten Karten-IDs.
Nicht vollständig abgeschlossen: 1.253 Lektionsfragen insgesamt, davon 1.224
noch ohne neue fachliche Revision. Zusatzkarten separat. Nicht behaupten,
alle Quizze fachlich fertig überarbeitet zu haben. Bestand pro Frage:
`content/quality/quiz-editorial-status.json`; Quelle `content/quiz-revisions.mjs`.
Build über `scripts/build-quiz-revisions.mjs` am Ende von npm run build.
`rpQuestionId` trennt alte Antworten von neuen Inhalten; SRS/Mastery/Modulsterne
angepasst. 22 Tests bestanden. Nächster Schritt: verbleibende Fragen modulweise
fachlich redigieren, Quellen und parallele Transferformen, Überschneidungen
mit den früheren 15 Zusatzszenarien kontrollieren. Keine Generik als fachliche
Neuredaktion verkaufen. Details: `reports/Quizredaktion und Lehrqualität.md`.

Neuester Auftrag: einheitliches Tokyo-Night-Codebild und anspruchsvollere Quizze.
`assets/code-theme.js/css` erweitern Sprachen/Flächen; `assets/quiz-depth.js`
ergänzt globale Lektionsquiz-Abrufphase,Sicherheit,Feedback/Transfer. 15 neue
konkrete Szenariofragen inklusive Distraktoren: `content/quiz-transfer.mjs` und
`scripts/build-quiz-transfer.mjs` (in npm run build eingebunden). Alle alten
Frage-IDs bleiben bestehen; neue Fragen werden angehängt. Nicht sämtliche
Altfragen sind fachlich neu geschrieben, alte Antwortbegründungen bleiben
teilweise allgemein. Nächster sinnvoller Ausbau: systematische fachliche
Szenario-/Distraktorredaktion pro Modul statt generischer Mengensteigerung.
21 Tests bestanden. Codeeditoren haben Palette, aber keine echte Syntaxeditor-
Komponente; Regex-Highlighting ist nicht vollständige Sprachgrammatik.

Neuester Zusatz: MariaDB (6), APIs (6), MCP (4), Agents/Harnesses (7) = 23 neue
Lektionen plus datierte Ergänzungen der 10 vorhandenen KI-Lektionen m28/m29/m30.
Stichtag 06.11.2026; MCP explizit 2026-07-28, OpenAPI 3.2.1. Keine pauschale
Behauptung allerneuester Modellranglisten oder vollständiger Rechtsaktualisierung.
`content/platform-curriculum.mjs`, `scripts/prepare-platform-content.mjs`.
19 Quellen geprüft: `content/quality/platform-sources.json`.
19 ROOTPFAD-Tests bestanden; Gesamtbestand 116 Module / 462 Lektionen.
Werkstatt jetzt 15 Spuren / 45 Aufgaben. Neue Pfade mariadb,apis,agents auch
in serverseitiger Sync-Erlaubnisliste. MariaDB-SQL und MCP-Konfigurationen nicht
gegen reale Systeme ausgeführt. Nächster Ausbau: isolierte Integrationslabore
und echte DB-/Protokoll-Kontrakttests statt bloßer Plausibilität.

Neuester Stand: eigener HTML-/CSS-Pfad `htmlcss`, zwei Module (`html-m1`, `css-m1`)
mit 12 Lektionen und 36 Quizkarten. 6 neue Codeergänzungen für HTML/CSS erweitern
die Werkstatt auf 12 Spuren / 36 Aufgaben. Eigenes statisches Lernjournal unter
`content/examples/html-css-lab`; Demoformular versendet bewusst nichts.
Quellen: alle zwölf Links erreichbar, Protokoll `content/quality/html-css-sources.json`.
18 ROOTPFAD-Tests bestanden, einschließlich 320px-Layout und Skiplink-Fokus.
Gesamtbestand: 112 Module / 439 Lektionen. Generator: `scripts/prepare-html-css.mjs`.
Server nach Build neu starten, damit die Admin-Fortschrittsberechnung den neuen
Pfad kennt. Keine automatische Veröffentlichung oder Git-Push erfolgt.

Neuester Zusatzauftrag umgesetzt: „Geführte Codewerkstatt“ mit 30 eigenständigen
Aufgaben in 10 Spuren (JS, TS, Vue, PHP, Laravel, Java, ABAP, SQL, Git, Pseudocode).
Nur JavaScript hat drei wirklich ausführbare Funktionsaufgaben im isolierten
Frame/Worker; andere Spuren sind explizite Codeergänzungen. Kein Codecademy-Klon
und kein je-Lektion-vollständiger Aufgabenpool. Details: `reports/Geführte Codewerkstatt.md`.
Dateien: `assets/guided-practice*.js/css`, `guided-worker.js`, `guided-sandbox.html`.
Nächster Ausbau: mehr themenspezifische Aufgaben je Lektion und vollständige
Projekte; keine freie serverseitige Codeausführung ohne separate harte Isolation.

Der Nutzer hat anschließend die Überarbeitung **aller** PHP-/Laravel-Lektionen
und danach aller JavaScript-/Vue-Einheiten beauftragt. Die nachstehenden älteren
Haltepunkte dokumentieren den Verlauf und gelten nicht mehr als aktueller Umfang.

Jetzt: 72 PHP-Lektionen redaktionell verbessert, 16 JS/Vue-Einheiten integriert.
Details und Grenzen: `reports/Lernpfade Gesamtrevision.md` und `content/quality/`.
Nicht alle Frameworkfragmente sind einzeln integriert ausgeführt. Eigenständige
Labore unter `content/examples/laravel-lab` und `vue-lab` besitzen echte Tests.
Nächster Schritt: verbleibende Projektfragmente pro Lektion in vollständige
Fixtures/Regressionstests überführen und gemeinsames Backend-/Frontendprojekt
vertiefen. Nichts als „perfekt“ oder vollständig produktionsgetestet bezeichnen.

Generatoren: `scripts/revise-php-curriculum.mjs`,
`scripts/revise-javascript-curriculum.mjs`; Daten `content/learning-refinements.json`.
`npm run build` integriert den redaktionellen Datensatz reproduzierbar.
Quellen-/Syntaxprüfung: `node scripts/verify-learning-content.mjs`.
Lab-Prüfungen: `node scripts/run-learning-checks.mjs`.

## Historischer Haltepunkt vor der Gesamtrevision

Stand: 06.11.2026, nach Wiederaufnahme der linearen PHP-Anfängerfolge.
Der frühere Pausenstand wurde gelesen; anschließend wurde m52-l2 umgesetzt.

## Exakter Haltepunkt

**Zwei der 72 PHP-/Laravel-Lektionen wurden vollständig überarbeitet:**
`m52-l1` „Deine Werkstatt: PHP installieren und das erste Skript“ und
`m52-l2` „Text ausgeben: echo, Strings und Verkettung“.
Sie enthalten Lernziele, eigene Beispiele, typische Fehler mit Lösungen, Quellen,
drei abgestufte Übungen mit Lösungskriterien und drei Selbsttestfragen.

**Die übrigen 70 Lektionen sind geprüft, aber noch nicht überarbeitet.**
Nicht behaupten, der gesamte PHP-Pfad sei bereits verbessert. Die Prüfung war
ein Strukturcheck aller Lektionen plus fachliche Stichproben, keine vollständige
Ausführung oder Validierung aller Laravel-Beispiele.

Nächster sinnvoller Arbeitsschritt nach Freigabe: Befunde aus
`reports/PHP Laravel Inhaltsprüfung.md` priorisiert beheben und die übrigen
PHP-Lektionen systematisch ausarbeiten. Bei linearer Fortsetzung folgt
`m52-l3` „Zahlen und Rechnen ohne Überraschungen“; dabei insbesondere den
bereits dokumentierten Cent-/Float-Rundungsbefund korrigieren.
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
  und 2 sowie JavaScript-Einheit 1.
- `scripts/build-learning-content.mjs`: reproduzierbare Integration dieser Inhalte.
- `scripts/prepare-first-lessons.mjs`: ursprünglicher Generator, überschreibt
  keinen vorhandenen redaktionellen Datensatz mehr.
- `scripts/prepare-php-strings.mjs`: reproduzierbare Ergänzung für m52-l2.
- `content/examples/php/strings.php` und `strings.expected.txt`: ausführbares
  Beispiel und vollständige Sollausgabe; Tests unter `tests/php-strings.spec.mjs`.
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

Zuletzt: **12 Tests bestanden** (Browser- und PHP-CLI-Tests).
PHP-Beispiel unter PHP 8.5.11 geprüft und ausgeführt, JavaScript unter Node 22.23.3.
Alle Versions-/Quellenangaben vor weiterer Arbeit erneut auf Aktualität prüfen.
Bei Serveränderungen lokalen Node-Prozess neu starten; Browser neu laden.

## GitHub

Privates Repository: https://github.com/DennisBilstein/rootpfad
Branch: `main`. Keine Veröffentlichung oder Änderung der Sichtbarkeit ohne Auftrag.
