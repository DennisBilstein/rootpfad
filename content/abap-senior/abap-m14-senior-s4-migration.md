# S/4HANA Custom Code: Migration, Clean Core und messbare Modernisierung

abap-m14-senior-s4-migration · 30 Minuten · 08.11.2026

## Voraussetzungen

ABAP SQL, ATC und Erweiterungsstrategie; Schwerpunkt ERP → S/4HANA On-Premise/Private Edition, nicht pauschal Public Edition.

## Lernziele

- Fachliche Migration und optionale Optimierung getrennt planen.
- Nutzungsdaten und ATC-Funde begründet priorisieren.
- Wrapper, Released APIs und Upgradeverantwortung unterscheiden.

SAP HANA ist die Datenbank, SAP S/4HANA das darauf aufbauende ERP-Produkt. Eine Datenbankumstellung allein macht alten Custom Code nicht fachlich kompatibel mit veränderten S/4HANA-Datenmodellen. Ein SELECT kann syntaktisch aktiv sein und dennoch falsche Semantik oder ein ungeeignetes Zugriffsmuster haben. Prüfe Zielrelease und Edition; verfügbare Werkzeuge und erlaubte Erweiterungen sind nicht überall gleich.

Beginne mit einem Inventar und einem aussagekräftigen Nutzungszeitraum, der auch Monats-/Jahresabschluss und seltene Pflichtprozesse berücksichtigt. Kein Aufruf im kurzen Messfenster bedeutet nicht automatisch entbehrlich. Ordne Eigentümer, Abhängigkeiten und geplante Ablösung zu. Nicht mehr benötigter Code wird nur nach freigegebenem Stilllegungsplan entfernt, nicht aufgrund einer einzelnen Statistik.

ATC mit passenden S/4HANA-Prüfungen und Simplification-Inhalten identifiziert Anpassungsbedarf. Behebe Syntaxfehler, wiederhole die Analyse und prüfe Quick Fixes fachlich. Ein grüner ATC-Lauf ist weder ein vollständiger Prozesstest noch ein Performancebeweis. Vergleiche Belegzahlen, Beträge und fachliche Zustände mit einer geprüften Referenz. Modifikationsabgleich und eigentliche Systemkonvertierung gehören in den dafür geregelten Projektablauf.

Nach fachlicher Korrektheit priorisierst du gemessene Hotspots, etwa mit SQL Monitor und der SQL Performance Tuning Worklist in unterstützten klassischen Landschaften. Nicht jeden LOOP reflexartig in AMDP übersetzen. Für neue ABAP-Cloud-Erweiterungen freigegebene APIs verwenden und Release Contract prüfen. Ein kundeneigener Wrapper um eine nicht freigegebene API macht die SAP-API selbst nicht released; in zulässigen klassischen Landschaften bleibt dies eine bewusst verwaltete Ausnahme mit eigener Upgradepflicht.

```text
Inventar/Nutzung → Owner/Scope → Zielrelease/Simplifications
→ ATC/Syntax → fachliche Anpassung → Prozessregression
→ gemessene SQL-Hotspots → gezielte Optimierung → Vergleich Soll/Ist
API-Ausnahme: Grund, erlaubte Laufzeit, Owner, Tests und Ablöseplan
```

## Senior-Praxis

Trenne zwei Tickets: „funktional korrekt auf Zielrelease“ und „schneller bei gemessener Last“. Sonst ist bei einer Abweichung unklar, ob Migration oder Optimierung die Ursache ist.

## Praxisfälle

- Normalfall: Genutzten Z-Report mit einem releasebezogenen ATC-Fund anpassen und Belegzahlen/Beträge gegen Referenz prüfen.
- Grenzfall: Report nur am Jahresende genutzt: Eigentümer bestätigt Bedarf trotz leerem Wochenmessfenster.
- Fehlerfall: Wrapper ruft nicht freigegebene API auf: keine falsche Cloud-Freigabe; Ausnahme und zulässige Alternative dokumentieren.

## Szenarioquiz

### Ein Z-Report wurde sieben Tage nicht aufgerufen, ist aber für den Jahresabschluss vorgesehen. Was folgt daraus?

- [x] Report erst nach Prozess-/Ownerprüfung und längerer Nutzungsbewertung stilllegen. — Ein kurzes Messfenster deckt seltene verpflichtende Geschäftsprozesse nicht ab.
- [ ] Report automatisch löschen, weil Nutzungsdaten immer vollständig sind. — Die Beobachtungsdauer kann den relevanten Prozess schlicht verfehlen.
- [ ] Report sofort durch AMDP ersetzen, weil die Nutzung selten ist. — Seltene Nutzung begründet weder Löschung noch eine bestimmte Optimierungstechnik.

### Nach S/4HANA-Anpassung ist ATC grün. Welcher zusätzliche Nachweis fehlt für die fachliche Abnahme?

- [ ] Dass alle lokalen Variablennamen maximal kurz geschrieben sind. — Namenslänge ist kein Nachweis korrekter Belegverarbeitung.
- [ ] Dass jede SELECT-Anweisung durch eine HANA-Prozedur ersetzt wurde. — Eine pauschale technische Umschreibung beweist keine fachliche Gleichheit.
- [x] Dass relevante Prozesse und Ergebnisse auf dem Zielrelease stimmen. — Statische Prüfungen ersetzen keine Regression der Geschäftsfunktionen.

### Ein eigener Wrapper kapselt eine nicht freigegebene SAP-API. Was ist die korrekte Bewertung?

- [ ] Die SAP-API ist dadurch automatisch für ABAP Cloud freigegeben. — Eine Kundenkapselung ändert den Release Contract des SAP-Objekts nicht.
- [x] Die Kapselung braucht zulässige Laufzeit und eigene Upgradeverantwortung. — Eine erlaubte Ausnahme ist gesondert zu verwalten und nicht mit einem offiziellen Release gleichzusetzen.
- [ ] Der Wrapper beseitigt jeden zukünftigen Regressionstest. — Auch gekapselte Abhängigkeiten können bei einem Upgrade ihr Verhalten ändern.

## Quellen und Grenzen

- https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-private-edition/analyzing-customizations-after-system-conversion_b9083e6d-e207-4578-8aa6-6c85cb42974a

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
