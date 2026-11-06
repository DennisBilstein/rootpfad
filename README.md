# ROOTPFAD

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
python3 scripts/import-source.py /Users/dennis/Downloads/ROOTPFAD_pro.html
```

Dabei werden `index.html` und die aus dem Export erzeugten Assets überschrieben.
