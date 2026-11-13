# ROOTPFAD

## Lernfunktionen: Videos, Denkaufgaben, Wiederholplan · 13.11.2026

- **Videos zu Lektionen** (`content/lesson-videos.json`, aktuell 23 Videos zu 21 Lektionen, Englisch, offizielle Kanäle (Java, Spring, SAP, Laravel) sowie freeCodeCamp u. a.):
  nichts wird heruntergeladen oder gespiegelt. Das Video wird erst nach einem Klick auf „Video laden“ über
  `youtube-nocookie.com` eingebettet; vorher gibt es keine Anfrage an YouTube/Google. Daneben steht immer ein Direktlink.
  Titel und Kanal prüft `npm run verify:videos` per oEmbed (braucht Netz); der Inhalt der Videos ist nicht geprüft.
  Der Server sendet dafür eine Teil-CSP (frame-src, object-src, base-uri, frame-ancestors). Die Datenschutzseite nennt die Einbettung
  (Entwurf, rechtlich prüfen lassen).
- **Kleine Denkaufgaben** (`content/puzzles.json`, 7 Aufgaben in `java-m25-l1`, `java-m25-l2`, `js-m4-l1`, `js-m4-l2`, `js-m4-l4`):
  „Fehler finden“ und „Zeilen ordnen“ (Parsons-Aufgabe, per Pfeil-Schaltflächen bedienbar). Jede Aufgabe nennt, womit sie geprüft wurde;
  Java-Aufgaben prüft `npm run verify:puzzles` mit `javac`. Einmal 10 Grund-XP je Aufgabe (20 mit dem globalen XP-Faktor), nicht nach Lösungsansicht. Kein neuer Speicher:
  der Marker liegt im vorhandenen `xpLog`.
- **Wiederholplan und schwächste Lektionen** im Fehlerheft (`assets/weak-spots.js`): fällige Karten der nächsten 7 Tage und die Lektionen
  mit der niedrigsten Trefferquote (ab 3 Antworten, unter 80 %), berechnet aus den vorhandenen Lerndaten.
- **Syntax-Glossar** (Menü „Referenz“, `content/syntax-glossary/`): 650 Einträge für HTML, CSS, JavaScript/TypeScript, Vue 3, PHP, Laravel,
  Java, SQL (MariaDB), Git, ABAP, SAP Fiori/UI5 und SAP BTP. Weitere Einträge liegen in `<sprache>.more*.mjs`. Jeder Eintrag hat Syntax, Erklärung, Beispiel, typischen Fehler und Link zur Lektion; Suche (auch über alle
  Sprachen) und Kategorie-Filter. `npm run verify:glossary` führt 253 Beispiele wirklich aus (Node 22, PHP 8.5, Java 26, SQLite, Git) und
  vergleicht die Ausgabe; jeder Eintrag zeigt, ob sein Beispiel getestet oder nur gezeigt wird. HTML, CSS, Vue, Laravel, ABAP, Fiori und BTP werden
  nicht ausgeführt. Keine unabhängige Fachprüfung.
- **Secret-Scan** (`npm run scan:secrets`): prüft alle von Git verfolgten Textdateien auf typische Schlüssel, Tokens, Zugangsdaten in URLs und lokale Home-Pfade; gibt nie den gefundenen Wert aus. Prüft nicht die Git-Historie (Stand 13.11.2026: Verlauf manuell mit denselben Mustern gescannt, keine Funde).
- `npm run build` erzeugt `assets/lesson-videos-data.js`, `assets/syntax-glossary-data.js` und `assets/practice-puzzles-data.js`.

## Java 21–27, Spring Boot 4, Vue-Komponenten und Serverdaten · 12.11.2026

24 neue Lektionen in vier Modulen, jeweils mit „In einfachen Worten“, Schritt-für-Schritt-Ablauf,
Code aus einem getesteten Lab, Typischen Fehlern, drei Übungen (Normal-/Grenz-/Fehlerfall),
drei Quizfragen mit Begründungen und Quellen:

- `java-m25` (6): Pattern Matching, Sealed Types, Sequenced Collections, Virtual Threads,
  Structured Concurrency (Preview) und Stream Gatherers.
- `java-m26` (6): Flyway, Testcontainers, ProblemDetail (RFC 9457), API-Versionierung und OpenAPI,
  Boot-4-/Framework-7-Migration, RestClient mit Resilienz.
- `js-m2` (7): defineModel, provide/inject, Scoped Slots, Teleport mit `<dialog>`, Suspense (experimentell),
  Transition und reduzierte Bewegung, generische Komponenten.
- `js-m3` (5): Zod-Formulare, Query-Cache, optimistische Updates, URL-Zustand, Mini-Projekt TaskInbox.
- `js-m4` (6): Router-Guards und sicherer Rücksprung, Anmeldung mit Token-Erneuerung (Fake-Server), Vue-3.5-APIs
  (useId, useTemplateRef, defineExpose, Attribute), Reaktivitätsfallen, dynamische Formulare, Infinite Queries mit Retry und Prefetching.

Quellen der Inhalte: `content/java-vue/*.mjs` (eigene Texte). Generator: `node scripts/prepare-java-vue-content.mjs`
schreibt die Module in `content/learning-refinements.json`; danach `npm run build`. Code-Ausschnitte werden beim Erzeugen
aus den Lab-Dateien gelesen. Vier Modulabnahmen: `content/assessments-java-vue.json`.

Ausführbare Belege (Stand 12.11.2026): `content/examples/java-modern` (JDK 21 und 26; Structured Concurrency mit
`--enable-preview`, Gatherers erst ab JDK 24), `content/examples/spring-lab` (Spring Boot 4.1.2, Maven Wrapper; 18 Tests, alle bestanden; der Testcontainers-Test
startet einen PostgreSQL-17-Container und braucht laufendes Docker, sonst wird er übersprungen) und
`content/examples/vue-lab` (110 Tests, `vue-tsc` und Build ohne Fehler). `npm run test:labs` führt alle Lab-Prüfungen aus.
Lizenzhinweise: Vue-Dokumentation steht unter CC BY 4.0, Zod und TanStack Query unter MIT; es wurde kein fremder Code
kopiert, Texte sind eigene Zusammenfassungen mit Quellenlinks. JEP- und Oracle-Texte sind nur verlinkt.
Nicht geprüft: unabhängige Fachfreigabe, echte Browser-/Screenreader-Bedienung des Dialogs.

Aktueller Bestand: **121 Module, 500 Lektionen, 1.367 Lektionsfragen + 306 Zusatzkarten = 1.673 Karten**.

## ABAP / BTP / S/4HANA / Fiori · Vertiefung 08.11.2026

Acht neue Lektionen zu durchgängiger RAP-Autorisierung, EML-/Save-Tests,
Fiori-V4-Side-Effects, BTP-Identitäten, S/4HANA-Custom-Code-Migration,
wiederanlauffähigen Application Jobs, Launchpad-Diagnose und CDS-Fachsemantik.
Zehn bestehende Lektionen besitzen zusätzliche Review-/Diagnosehinweise und
Normal-,Grenz-,Fehlerfälle. 24 neue und 20 ersetzte Szenariofragen mit jeweils
begründeten Antwortoptionen, Quellen und Abruf-/Selbstprüfkriterien.
Alte Quiz-Evidenz bleibt erhalten, zählt nicht automatisch für neue Revisionen.

Bestand nach dieser Vertiefung: 116 Module, 470 Lektionen, 1.277 Lektionsfragen + 306
Zusatzkarten = 1.583 Karten (aktueller Bestand siehe oben). Quelle: `content/abap-senior-curriculum.mjs`;
lesbare Exporte unter `content/abap-senior/`. „Senior-Praxis“ bezeichnet
quellenbasierte Reviewhinweise, keine persönliche Berufserfahrung und keine
unabhängige Senior-Freigabe. SAP-Code wurde nicht in einem SAP-System ausgeführt.

## Kontosicherheit und Auslieferung · 08.11.2026

Angemeldete Konten können unter „Kontoeinstellungen“ ihr Passwort ändern und
Konto/Serverlernstand als JSON herunterladen. Passwortänderung verlangt das alte
Passwort, widerruft alle bisherigen Sitzungen und stellt eine neue für das
aktuelle Gerät aus. „Passwort vergessen“ ermöglicht einen 15 Minuten gültigen,
einmaligen Reset; echte Zustellung benötigt SMTP-Konfiguration. Standard: kein
Versand. Einrichtung und privater Entwicklungsmodus: [Mailkonfiguration](docs/mail-configuration.md).
Unter Kontoeinstellungen ist außerdem passwortbestätigte Konto-/Datenlöschung
verfügbar; letzter Admin geschützt, Backups/Downloads/andere Geräte nicht umfasst.
Export enthält keine Passwort-Hashes oder Sessiontokens; Datei geschützt halten.

Passwortableitung nutzt asynchrones scrypt und bleibt mit bisherigen Hashes
kompatibel. Registrierung/Setup prüfen nach der Berechnung erneut Einmalrechte,
damit parallele Requests keinen Einladungs-/Setup-Token mehrfach verbrauchen.
Öffentliche Assets werden bei Clientunterstützung komprimiert. Authentifizierte
API-Antworten sind davon ausgeschlossen. Das reduziert Übertragungsgröße, ersetzt
aber kein Lasttestkonzept. Der Browser lädt jetzt 35 geordnete Skripte unter
300 KB über `assets/learning-manifest.json`, nicht mehr das große Quellaggregat.
Das ist keine Lazy-Loading-Lösung: alle Teile werden weiterhin beim Start geladen.
`assets/script-01.js` bleibt Build-/Prüfaggregat; nach Inhaltsänderungen `npm run build`.

### Gezielte Inhaltsvertiefung

Bestehende API-/Event-Lektionen enthalten zusätzliche Abschnitte zu SSRF,
HTTP Caching und Transactional Outbox mit Normal-,Grenz-,Fehlerfällen und
begründeten Selbsttests. IDs und historische Lernstände bleiben unverändert.
Quelle: `content/application-supplements.mjs`. Der damalige Bestand war 116 Module,
462 Lektionen und 1.559 Karten; aktueller Bestand siehe oben. Technische Prüfungen sind keine unabhängige
menschliche Fachbegutachtung.

## Vollständige Abdeckung mit Selbstprüfkriterien

Alle 1.583 vorhandenen Lektions- und Zusatzkarten besitzen einen fragebezogenen
Abrufauftrag und Kriterien für Entscheidung,Begründung,Abgrenzung und Anwendung.
Die Rubrik erscheint in Lektionsquiz und Wiederholung. Sie wird nicht automatisch
benotet, bleibt sitzungsbezogen und begründet keine zusätzlichen Kompetenz-XP.
Abdeckung: `content/quality/quiz-contract-coverage.json`.
Zusätzlich ist die gesamte Inhaltsredaktion jetzt integriert: 1.253
Lektionsfragen und 306 Zusatzkarten wurden individuell neu bearbeitet. Eine
unabhängige menschliche Fach-Zweitbegutachtung ist damit nicht behauptet.

## Fachliche Quizrevisionen

Alle 1.559 Fragen/Karten wurden durch neue Anwendungsfragen samt eigener
Distraktorbegründungen ersetzt. Revidierte Fragen erhalten neue Kartenrevisionen;
alte Lernstände bleiben gespeichert, gelten aber nicht als neuer Nachweis.
Fortschrittszählung für bearbeitete Lektionen bleibt davon getrennt.
**Vollständige redaktionelle Abdeckung:** keine Lektionsfrage oder Zusatzkarte
ohne neue Inhaltsrevision. Technische Prüfung ist nicht Fachzertifizierung. Maschinenlesbarer
Stand: `content/quality/quiz-editorial-status.json`, Bericht:
`reports/Vollständige fachliche Quizredaktion.md`.

## Kompetenzen, Prüfqualität und praktische Arbeiten

„Kompetenzen & Abnahmen“ trennt Lesemarkierungen und Auswahl-Erkennen von
praktisch eingereichter/abgenommener Arbeit. Alle 121 Module haben eigene
Abnahmeaufträge mit 363 konkreten Fällen und modulspezifischen Kriterien.
Sie bleiben manuell zu prüfen, keine 121 unabhängig validierten Fachprüfungen. Adminfreigaben sind serverseitig
geschützt. Der bestehende Ampelvertrag bleibt Aktivität/Bearbeitung.

Drei Aufgabenfamilien haben je zwei getrennte numerische Parallelformen, mit
einer transparenten Dreitagesregel. Noch keine Parallelformen für jeden Stoff.
Fragenunklarheit kann gemeldet werden. Adminauswertung zählt Erstversuche pro
Revision und Konto, keine vorgetäuschte statistische Schwierigkeit bei kleinen
Stichproben. Quellenregister trennt Abrufstatus und Inhaltsprüfung; einige
automatisierte Abrufe sind gesperrt. Ein Link-200 ist kein Inhaltsnachweis.

`npm run audit:learning` prüft Vollständigkeit, Karten-IDs und Laufnachweise.
`npm run test:labs` führt die separaten Laravel-/Vue-Laborprüfungen aus.

## Einheitliches Codebild und vertiefte Quizansicht

Tokyo Night gilt auch für neu hinzugekommene Codeflächen. Der vorhandene
escaped Regex-Tokenizer wurde um JS/TS,Vue/HTML,CSS,Java und ABAP ergänzt;
er ist keine vollständige Sprachgrammatik. Reine Codeinhalte und Kopiertexte
bleiben erhalten; editierbare Textareas nutzen die gleiche Palette, ohne
vorzutäuschen, dort einen vollständigen Syntaxeditor anzubieten.

Alle Lektionsquizze bieten zuerst eine optionale freie Erklärung mit Grenzfall
und Sicherheitseinschätzung; Optionen werden bewusst aufgeklappt. Freitext
wird nicht automatisch benotet. Nach Prüfung folgen ursprüngliche Begründung,
Antwortvergleich und Transferauftrag. Entwürfe sind nur sitzungsbezogen.
15 zusätzliche fachlich ausgearbeitete Szenariofragen mit individuellen
Distraktorbegründungen stehen in `content/quiz-transfer.mjs`; bestehende
Frageindizes bleiben unverändert. Das ist keine Behauptung, sämtliche alten
Fragen bereits fachlich neu geschrieben zu haben. Prüfungs-/Wiederholungspools
erhalten die neuen Fragen, nicht automatisch die gesamte Freitextansicht.

## MariaDB, APIs und KI-Engineering · Stichtag 06.11.2026

Drei weitere Lernpfade: MariaDB (6 Lektionen), APIs & Integration (6),
KI/MCP/Agents (4 MCP- und 7 Harness-/Arbeitsablauflektionen). Zusammen 23 neue
Lektionen mit 69 Selbsttestfragen und je drei Übungen. Zehn bestehende
AP1-KI-Lektionen behalten ihre Grundlagen und erhalten datierte Ergänzungen;
das ist keine vollständige neue Rechts-/Versionsprüfung ihrer älteren Texte.

MCP referenziert ausdrücklich Revision 2026-07-28, OpenAPI die geprüfte
veröffentlichte 3.2.1. MariaDB-Linien werden anhand der Maintenance-Policy
eingeordnet; ein konkreter lokaler DB-/SDK-Lauf wird nicht behauptet.
19 unterschiedliche neue Quellen erreichbar, Abrufprotokoll unter
`content/quality/platform-sources.json`. Eigene Beispiele und Erklärungen;
kostenlose Doku bedeutet nicht kostenlose Modell-/Cloudnutzung.

Generator: `node scripts/prepare-platform-content.mjs`, danach `npm run build`.
Inhalte: `content/platform-curriculum.mjs`. Die Werkstatt umfasst nun
15 Spuren mit 45 Aufgaben. MariaDB-/API-/MCP-Ergänzungen führen keine echte
DB-,Netzwerk- oder Agentaktion aus. Keine produktive Datenbank oder globale
Harness-Konfiguration wurde verändert.

## HTML und CSS

Eigener Lernpfad mit 12 Lektionen in zwei Modulen: HTML-Dokument, Semantik,
Links/Bilder, Formulare, Tabellen/Accessibility sowie CSS-Kaskade, Boxmodell,
Typografie/Fokus, Flexbox, Grid, Responsive Design und Abschlussprojekt.
36 Quizkarten, je drei Übungen mit Abnahme und sechs Codewerkstatt-Ergänzungen.
Das eigene statische Beispiel liegt in `content/examples/html-css-lab/` und kann
ohne Build geöffnet werden. Kein echtes Formularbackend. Generator:
`node scripts/prepare-html-css.mjs`, anschließend `npm run build`.
Die Werkstatt umfasst damit insgesamt 12 Spuren und 36 Aufgaben.

## Geführte Codewerkstatt

30 eigene interaktive Aufgaben für JavaScript, TypeScript, Vue, PHP, Laravel,
Java, ABAP, SQL, Git und Pseudocode. Über „Geführte Codewerkstatt“ in der
Seitenleiste öffnen; die Spuren folgen der Lernpfadauswahl. Erklären, bearbeiten,
Feedback, Hinweise und Lösungen sind direkt verbunden. Drei JS-Funktionsaufgaben
werden in einer netzwerkgesperrten Frame-/Worker-Umgebung mit Zeitlimit ausgeführt.
Alle anderen Spuren kennzeichnen die Prüfung als Codeergänzung ohne Laufzeit.
Kein beliebiger PHP-/Java-/ABAP-Code wird auf dem App-Server ausgeführt.
Details und Grenzen: `reports/Geführte Codewerkstatt.md`.

## Aktueller Lerninhalt nach Gesamtrevision

Alle 72 PHP-/Laravel-Lektionen besitzen jetzt Lernziele, verlinkte Quellen,
themenspezifische Fehler-/Entscheidungshinweise, drei abgestufte Aufgaben und
Abnahmekriterien. Der JavaScript-/Vue-Pfad umfasst 16 zusammenhängende Einheiten
bis zu einem Aufgaben-Dashboard. Ältere unten dokumentierte Ausbauzahlen sind
historisch; maßgeblich ist `reports/Lernpfade Gesamtrevision.md`.

Ausführbare Labore (separat von der Node-Lernplattform):

- `content/examples/laravel-lab`: Laravel 13, PHP 8.5, PHPUnit, SQLite-Testdaten.
- `content/examples/vue-lab`: Vue 3.5, Router 5, Pinia 4, Vite 8, TS und Vitest; seit 12.11.2026 mit Zod 4 und TanStack Query.
- `content/examples/spring-lab`: Spring Boot 4.1, Java 21, Maven Wrapper (`./mvnw test`), H2 für Tests.
- `content/examples/java-modern`: einzelne Java-Dateien (`java Datei.java`), siehe README dort.

`content/quality/` unterscheidet pro Block Syntaxcheck, tatsächliche Ausführung
und nicht integrierte Projektfragmente. Die Überarbeitung ist kein Beweis für
Produktionsreife sämtlicher Codebeispiele. Setup/Prüfbefehle stehen in den
Lab-READMEs. Lokale vendor/node_modules, DBs, Secrets und Buildartefakte bleiben
außerhalb von Git. Keine neue ROOTPFAD-UI oder technische Vue-Migration der
Lernplattform: Vue ist hier Lerninhalt und separates Übungsprojekt.

Übernahme aus `ROOTPFAD_pro.html` mit Node-Server, Anmeldung und SQLite-Datenbank.
Design, Lerninhalte und die vorhandene Anwendungslogik bleiben erhalten.

## Starten

```sh
npm install
npm run dev
```

Anschließend http://localhost:5173 öffnen. Benötigt werden Node.js 22 und npm.
Für das optionale erneute Importieren des Originalexports wird Python 3 benötigt.

## Anmeldung und Teilnehmerampel

Beim ersten Serverstart erscheint im Terminal ein einmaliger `#setup=…`-Link.
Darüber den eigenen Admin mit Name, E-Mail und mindestens zwölf Passwortzeichen
anlegen. Der Token ist geheim, wird nicht im Repository gespeichert und ist
nach Einrichtung unbrauchbar. Ein Neustart vor Einrichtung erzeugt einen neuen.

Unter `/admin` können Administratoren einmalige, sieben Tage gültige
Einladungslinks erzeugen und manuell weitergeben. Es gibt keine offene
Registrierung. Teilnehmer sehen vor Anmeldung, welche Daten übertragen und vom
Administrator eingesehen werden. E-Mail dient als Anmeldename; E-Mail-Versand,
Adressverifikation, Passwort-Wiederherstellung und Kontolöschung per UI sind
noch nicht implementiert.

Lernstände werden nach Änderungen verzögert sowie alle 30 Sekunden übertragen.
Ein Fehler ist im Kontobereich sichtbar; lokale Daten bleiben bestehen. Jedes
Konto besitzt einen getrennten Browser-Speicherbereich. Gastdaten werden nicht
automatisch einem Konto zugeordnet. Mehrere Geräte werden additiv zusammengeführt;
gleichzeitige Antwortzähler werden wie im bisherigen Import mit Maxima statt
Summierung abgeglichen und können dadurch Aktivitäten unterzählen. Dies ist
kein manipulationssicheres Prüfungs- oder Leistungserfassungssystem.

Die Ampel wird serverseitig aus bekannten Lektions-IDs berechnet. Standard:
Grün ab 70%, Gelb ab 30%, Rot darunter oder nach sieben Tagen ohne übertragene
Lernaktivität. Pausierte und noch nicht aktive Teilnehmer sind grau. Regeln
sind im Adminbereich einstellbar. Synchronisations-Heartbeats und Pfadwechsel
allein aktualisieren die Lernaktivität nicht. Die Ampel zeigt den Bearbeitungsstand
des zuletzt übertragenen Lernpfads, keine vereinbarte Frist und keine Beherrschung.

Konten, Passwort-Hashes, Sessions und Lernstände liegen in `.data/rootpfad.sqlite`.
Dieses Verzeichnis ist von Git ausgeschlossen und darf niemals öffentlich
ausgeliefert werden. Backups der Datenbank sicher und zugriffsbeschränkt halten.
Der Server liefert nur die freigegebenen Seiten und `assets/` aus.

### Gemeinsamer Betrieb

Standardmäßig ist der Server nur lokal erreichbar. Für andere Geräte benötigt
er einen gemeinsamen Server mit persistenter Datenablage. `HOST`, `PORT` und
`ROOTPFAD_DATA_DIR` konfigurieren Bindung und Datenpfad. Vor Internetbetrieb:
HTTPS-Reverse-Proxy, `NODE_ENV=production` (Secure-Cookies), bei genau einem
vertrauenswürdigen vorgeschalteten Proxy `TRUST_PROXY=1`, Backups, Datenschutz-
und Löschkonzept sowie Sicherheitsprüfung einrichten. Nicht unverschlüsselt im
Internet betreiben. GitHub Pages kann diesen Node-/SQLite-Server nicht hosten.
Passwörter werden mit scrypt gesalzen gehasht; Sessions sind HttpOnly/SameSite,
Admin-APIs rollenbeschränkt und Anmeldungen rate-limitiert.

## Struktur

- `index.html`: Oberfläche und Einbindung der Assets
- `assets/style-*.css`: Styles in der Reihenfolge des Originals
- `assets/script-*.js`: Anwendungslogik und Lerninhalte in ursprünglicher Ausführungsreihenfolge
- `scripts/import-source.py`: reproduzierbarer Import des HTML-Exports

Der Lernfortschritt wird durch die Original-App im Browser gespeichert. Daten aus
einer zuvor per `file://` geöffneten Version werden nicht automatisch übernommen.
Google Fonts werden weiterhin extern geladen; ohne Internet greifen Ersatzschriften.
Der KI-Tutor benötigt den im Original vorgesehenen separaten Dienst bzw. einen
konfigurierten Endpunkt; dieser ist im HTML-Export nicht enthalten.

## ABAP- und Java-Expertenpfade

Zusätzlich integriert sind 44 Module mit 136 Lektionen, allen Lektionsquizzen,
92 Zusatzkarten, 36 Übungen, 9 Algorithmus-Traces und beiden Spickzetteln.
Die Inhalte erscheinen in eigenen Kursteilen in der Seitenleiste. Quizfragen
stehen auch im gemeinsamen Wiederholungs- und Prüfungspool zur Verfügung.
Die ursprünglichen IDs und Lernstände bleiben unverändert.

```sh
npm run build:experts  # angegebenes build.mjs ausführen und Artefakte integrieren
npm run build          # aus lokalem Datensnapshot neu integrieren, ohne Temp-Dateien
npm test               # Browser-Integrationstest (nach npm install)
```

`scripts/build-experts.mjs` nutzt das vom Benutzer bereitgestellte Build-Skript
und dessen `load.mjs`. Über `ROOTPFAD_EXPERT_BUILD` kann ein anderer Pfad zum
Build-Skript angegeben werden. Die Markdown-Ausgabe und ein vollständiger
Datensnapshot liegen unter `content/expertenpfade/`. Ein erneuter HTML-Import
bindet die Expertenpfade aus diesem Snapshot automatisch wieder ein.

## Lernpfade und Trainingsfilter

Auf „Heute“ und der Kursübersicht sowie über die Seitenleiste lassen sich AP1,
Java, ABAP, PHP & Laravel, Git oder alle Inhalte auswählen. Die Auswahl wird
lokal gespeichert. Navigation, Lektionsfortschritt, Weiterlernen, Wiederholung,
Fehlerheft, Übungen, Mitschreib-Klausuren, Traces und Code-Labor verwenden den
gewählten Pfad. Nicht verfügbare Trainings zeigen einen Hinweis statt fremder
Aufgaben. XP, Abzeichen und der gespeicherte Lernstand bleiben global erhalten.

Die Prüfungsmodi Kurztest, Vollprüfung und Prüfungslänge verwenden ausschließlich
AP1-Module (Teile 1–9), unabhängig vom ausgewählten Lernpfad. „Lernpfadtraining“,
Fehlerheft und Schwachstellen folgen der Auswahl. PHP- und Git-Prüfungen bleiben
explizite Zusatzprüfungen. Es handelt sich um Übungssimulationen, nicht um
offizielle IHK-Prüfungen.

Die Erweiterung liegt in `assets/learning-paths.js` und `assets/learning-paths.css`.

## Recherchierte ABAP-Erweiterungen

22 zusätzliche deutsche Lektionen mit 54 Kontrollfragen vertiefen die bestehenden
ABAP-Module m7–m14 und m16–m20. Sie stehen jeweils vor den vorhandenen
Expertenlektionen. Schwerpunkte sind Grundlagen, Tabellen, SQL, OO, Debugging,
ADT/SAP GUI, S/4HANA, CDS, RAP, Fiori/UI5, BTP/Clean Core, Transporte, HTTP/JSON,
OData und Integration Suite. Jede Lektion enthält ein eigenes Arbeitsbeispiel,
eine Praxisaufgabe und Quellen mit konkreten Zugangshinweisen.

- `content/abap-erweiterungen/lessons.json`: redaktioneller Quelldatensatz
- `content/abap-erweiterungen/*.md`: lesbare Ausgabe pro Lektion
- `research_notes/ABAP Lernquellen und Modulerweiterung/`: Recherche und Belegprüfung
- `reports/ABAP Lernquellen und Modulerweiterung.md`: Quellenbericht

`npm run build` integriert die Ergänzungen automatisch. Freie Lektüre bedeutet
nicht kostenlosen SAP-Systemzugang; konkrete Voraussetzungen stehen pro Quelle.
Recherche vom 06.11.2026. Lehrbeispiele wurden nicht in einem SAP-System kompiliert.

## Lernwerkstatt, Missionen und Modul-Bosse

„Lernwerkstatt & Missionen“ ist über die Seitenleiste und die Startansichten
erreichbar. Tagesmissionen folgen dem Lernpfad: bis zu fünf fällige Karten
zuerst, eine Fehler-/Vertiefungsfrage und eine Frage mit eigener Antwort vor
den Auswahloptionen. Freitext wird nicht automatisch benotet. 15 Minuten sind
ein Richtwert, kein Timer. Abgeschlossene Missionen geben einmal täglich pro
Pfad 15 XP; laufende Sitzungen selbst werden beim Neuladen nicht fortgesetzt.

Drei ABAP-Bosse (Grundlagen, CDS, RAP) enthalten jeweils zwei unterschiedliche
Varianten mit je drei gemischten Fallfragen. Hinweise sind erlaubt. Für den
Selbstständigkeitsnachweis muss eine Variante vollständig ohne Hinweise richtig
gelöst sein. Jede solche Variante gibt nur einmal 30 XP.

Die Wissenskarte unterscheidet Erkundet, Geübt, Gefestigt und Übertragen. Für
„Gefestigt“ muss jede Quizfrage seit dem letzten erfassten Fehler mindestens
zweimal richtig beantwortet worden sein, mit mindestens drei Tagen Abstand
zwischen erster und letzter richtiger Antwort. „Übertragen“ erfordert zusätzlich
beide Boss-Varianten ohne Hinweise. Der Modulstatus entspricht der niedrigsten
Lektionsstufe; ein Boss-Sieg allein stuft also nicht alle Lektionen hoch.
Die Regeln sind heuristische Lernhilfen, kein validiertes Kompetenzzertifikat.

Neue Antwortzeitpunkte und Boss-Ergebnisse werden im bestehenden Lernstand unter
`learning` gespeichert und in Export/Import einbezogen. Alte Antwortstatistiken
bleiben erhalten, liefern aber keine rückwirkenden Zeitnachweise. Quellen:
`assets/learning-missions.js` (Mechanik) und `assets/learning-bosses.js` (Aufgaben).

## Ausgearbeitete Einstiegslektionen und PHP-Prüfung

`m52-l1` wurde mit Lernzielen, CLI-/PATH-Diagnose, lauffähigem Beispiel,
Fehleranalyse, Quellen, drei abgestuften Übungen und Selbsttest überarbeitet.
Die vorhandene ID bleibt bestehen; die drei Quizfragen wurden inhaltlich
aktualisiert. Bereits gespeicherte Quizstatistiken werden nicht rückwirkend
als neuer Kompetenznachweis gewertet oder gelöscht.

Auch `m52-l2` (Strings, echo und Verkettung) wurde vollständig ausgearbeitet:
Interpolation, Punkt/.=, sprintf, Heredoc/Nowdoc, typische Fehler, Quellen und
drei abgestufte Aufgaben. `content/examples/php/strings.php` wird im Test mit
der vollständigen Sollausgabe verglichen (PHP CLI erforderlich). Damit sind
2 von 72 PHP-Lektionen überarbeitet, nicht der gesamte Pfad.

Der neue Lernpfad „JavaScript & Vue“ enthält zunächst **nur Einheit 1**
(`js-m1-l1`: Werte, Variablen und Kontrollfluss), noch keinen vollständigen
Vue-Kurs. Beide Inhalte werden aus `content/learning-refinements.json` beim
Build reproduzierbar integriert. Beispiele: `content/examples/`.

`node scripts/audit-php-content.mjs` prüft die Struktur aller 72 PHP-Lektionen.
Ergebnis und konkrete redaktionelle Stichprobenbefunde stehen in
`reports/PHP Laravel Inhaltsprüfung.md`. Das ist kein Nachweis, dass alle
Framework-Beispiele vollständig ausführbar oder fachlich fehlerfrei sind.
Das PHP-Einstiegsbeispiel wurde unter PHP 8.5.11 ausgeführt, das JavaScript-
Beispiel unter Node 22.23.3; keine automatische Installation neuer Laufzeiten.

## Original-HTML erneut importieren

```sh
python3 scripts/import-source.py ~/Downloads/ROOTPFAD_pro.html
```

Dabei werden `index.html` und die aus dem Export erzeugten Assets überschrieben.

## Lizenz

- **Code** (Skripte, Server, Oberfläche, Tests, Beispielcode): [MIT](LICENSE), © 2026 Dennis Bilstein.
- **Lerninhalte** (Lektionstexte, Quizfragen, Glossartexte, Erklärungen): [CC BY 4.0](LICENSE-CONTENT). Bei Weiterverwendung bitte
  „Dennis Bilstein, ROOTPFAD“ nennen und auf die Lizenz verweisen.
- **Ausnahmen:** Die Schriften unter `assets/fonts/` stehen unter der SIL Open Font License 1.1 (siehe `assets/fonts/LICENSE.md`).
  Inhalte Dritter behalten ihre Lizenz (zum Beispiel Vue-Dokumentation CC BY 4.0, Zod und TanStack Query MIT). `research_notes/` enthält
  Arbeitsnotizen mit Verweisen auf Fremdquellen; die Rechte an dort zitierten Fremdtexten liegen bei deren Urhebern.
  Namen, Logos und Marken Dritter (SAP, Oracle, Spring, Laravel usw.) gehören den jeweiligen Inhabern.
