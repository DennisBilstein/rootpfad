# ABAP/BTP/S/4HANA/Fiori · Redaktion 08.11.2026

## Umfang

8 neue Lektionen, 10 vertiefte Bestandslektionen, 24 neue Fragen und 20
inhaltlich ersetzte Fragen. Bestehende Lektions-IDs bleiben erhalten;
neue Lektionen erhalten explizite stabile IDs statt titelabhängiger Slugs.
Neue Quizrevision `2026-11-08-abap-senior-v1` trennt historische Evidenz.

### Neue Lektionen

1. `abap-m15-senior-authorization`: DCL/Projektionen, RAP-Operationen und Zielzustand.
2. `abap-m12-senior-eml-tests`: Puffer, Save Sequence, Responses und Test-Doubles.
3. `abap-m13-senior-side-effects`: Fiori V4, gezielte Aktualisierung, Erweiterungsvertrag.
4. `abap-m14-senior-btp-identity`: Destination/Connectivity/Identität/Fachrechte.
5. `abap-m14-senior-s4-migration`: Custom-Code-Scoping, ATC, Regression, Modernisierung.
6. `abap-m19-senior-restartable-jobs`: Wiederanlauf, Idempotenz, Application Log.
7. `abap-m13-senior-launchpad`: Intents, Mapping, Rollen und Transportdiagnose.
8. `abap-m11-senior-semantics`: Beträge/Einheiten, Umrechnung und Join-Granularität.

### Bestehende Vertiefungen

`abap-m8-l1`, `abap-m9-l2`, `abap-m11-l1`, `abap-m12-l1`,
`abap-m12-l2`, `abap-m13-l1`, `abap-m15-l2`, `abap-m16-l2`,
`abap-m17-l1`, `abap-m19-l2`.

## Quellen und Grenzen

SAP-Learning-Lesetexte zu Authority Checks, EML, Concurrency, Migration,
Controller Extensions, CDS-Annotationen, Launchpad und Jobmonitoring abgerufen;
SAPUI5 Side-Effects-Dokument und SAP Application-Jobs-Sample als Text geprüft.
SAP Clean ABAP als Stil-/Reviewreferenz, nicht als universelle Performanceregel.
Connectivity-Helpportal lieferte im Textabruf keinen vollständigen Inhalt;
ergänzende Recherche/Protokollübersicht begründen nur den Architekturteil,
keine ungeprüfte Zertifikats-/Usermapping-Schrittanleitung übernommen.
Quellen URLs stehen im Curriculum. 468 Quellen im Gesamtregister, davon
462 technisch erreichbar und 6 weiterhin fehlgeschlagene/gesperrte Abrufe.
Erreichbarkeit ist keine unabhängige fachliche Bestätigung.

„Senior-Praxis“ ist redaktionell synthetisierte, quellenbasierte Beratung,
kein Interview oder persönliche Projekterfahrung. Release-/Editionsunterschiede
sind ausdrücklich genannt. Kein SAP-Systemzugang: keine ABAP-Kompilation,
echten EML-/DCL-Tests, BTP-Konfiguration oder SAP-Transportausführung behauptet.
Praxisfälle liefern Entwurfsaufträge, nicht automatisch erworbene Kompetenz.

## Technische Verifikation

- Build erfolgreich; 35 geordnete Skripte, Größenprüfung im Regressionstest.
- Lernreleaseprüfung: keine Fehler, 1.583 Karten mit Vertrag/Quellen/Rationales.
- Automatischer Fragenstilaudit: 0 Befunde (keine empirische Schwierigkeit).
- Neue Browsertests: alle 18 betroffenen Lektionen rendern, Praxisfälle sichtbar,
  falsche Antworten erklärt, historische Evidenz nicht umgewertet.
- `npm audit`: 0 gemeldete Paketlücken.
- Vollständige Playwright-Suite: **42/42 bestanden** (3,0 Minuten).
- Wiederholter Build: identische SHA-256-Hashes für Aggregat, Manifest und alle
  35 referenzierten Skripte; größtes Skript 248.968 Bytes.
- Laufende lokale Website mit Chromium geprüft: HTTP 200, 470 Lektionen,
  davon 91 im ABAP-Pfad; neue BTP-Lektion sichtbar.

Keine Hostingänderung: öffentlicher Betrieb bleibt auf Nutzerwunsch vertagt.
