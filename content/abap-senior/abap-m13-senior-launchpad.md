# Fiori Launchpad: Intents, Kataloge und Fehlersuche nach dem Transport

abap-m13-senior-launchpad · 25 Minuten · 08.11.2026

## Voraussetzungen

Fiori-App und Service; Schwerpunkt ABAP Launchpad in S/4HANA, Tools in Public Edition/BTP separat prüfen.

## Lernziele

- App-Sichtbarkeit, Navigation und Backendberechtigung auseinanderhalten.
- Semantic Object/Action und Target Mapping nachvollziehen.
- Transportabhängigkeiten und Upgrade-Nachfolger kontrolliert prüfen.

Die App funktioniert in der lokalen Vorschau, nach Transport erscheint jedoch keine Kachel oder „Navigation target could not be resolved“. Vorschau und produktiver Launchpad-Einstieg sind unterschiedliche Wege. Das Launchpad löst einen Intent aus Semantic Object und Action mit passenden Parametern zu einem Navigationsziel auf. Eine vorhandene UI5-Anwendung allein liefert noch kein korrekt zugeordnetes Target Mapping.

Business-Kataloge stellen rollenbezogenen App-/Navigationsinhalt bereit. Spaces und Pages organisieren die Oberfläche. Diese Struktur ist nicht identisch mit der fachlichen Backendautorisierung. Eine sichtbare Kachel kann an fehlenden Service- oder Datenrechten scheitern; eine ausgeblendete Kachel verhindert keinen direkten API-Aufruf. Der konkrete Rollen- und Content-Lifecycle hängt von Edition und Launchpad-Variante ab.

Vergleiche nach einem Transport mit einem echten Fachbenutzer: Intent/Parameter, Katalog-/Rollenzuordnung, Page, Target Mapping, App-ID/Version, Zielsystemalias und Service. Prüfe UI-Deployment, OData-Service sowie erforderliche Konfiguration als getrennte Abhängigkeiten. Ein Entwickler mit breiten Rechten ist kein repräsentativer Abnahmetest. Cacheinvalidierung erst nach Befund einsetzen, nicht als Universalantwort.

Nach Upgrades können Referenzen gebrochen oder Apps deprecated/obsolete sein. Im unterstützten ABAP Launchpad hilft der Content Manager, Referenzen und Nachfolger zu analysieren. Änderungen in verschiedenen Konfigurations-/Customizing-Scopes können sich entkoppeln. Übernimm Nachfolger samt Page, Services und Rollen kontrolliert; vorhandene kundeneigene Anpassungen nicht unbesehen durch einen Reset überschreiben.

```text
#SalesOrder-display?SalesOrder=4711
Intent → passendes Target Mapping → App/Parameter/Zielsystem
Sichtbar? Katalog/Rolle/Page prüfen
Navigierbar? Intent/Mapping/App prüfen
Daten erlaubt? Service-/Fachautorisierung prüfen
```

## Senior-Praxis

Fordere bei „Fiori geht nicht“ genau drei Angaben: Einstieg/Intent, betroffener Fachbenutzer und erste fehlerhafte Network-Teilantwort. Das trennt Contentprobleme von Servicefehlern.

## Praxisfälle

- Normalfall: Fachbenutzer startet den freigegebenen Intent und landet auf dem richtigen Objekt im richtigen Zielsystem.
- Grenzfall: Zwei Mappings mit unterschiedlichen Pflichtparametern: reproduzierbare, passende Zielauflösung nachweisen.
- Fehlerfall: Nach Transport fehlt eine Mappingreferenz: Konfiguration lokalisieren, ohne pauschale Adminrechte zu vergeben.

## Szenarioquiz

### Eine UI5-App läuft in der Vorschau, ihr Launchpad-Intent wird nach Transport nicht aufgelöst. Wo setzt die erste Diagnose an?

- [ ] Bei der Ersetzung aller ABAP-SELECTs durch neue CDS-Views. — Der Fehler liegt bereits vor dem fachlichen Datenzugriff in der Zielauflösung.
- [x] Bei Intent, Parametern, Target Mapping und zugeordnetem Inhalt. — Die Vorschau beweist die produktive Intentauflösung und Rollenverteilung nicht.
- [ ] Bei der Entfernung aller Backend-Berechtigungsprüfungen. — Fehlendes Target Mapping wird dadurch nicht angelegt; zusätzlich entsteht eine Sicherheitslücke.

### Eine Kachel ist sichtbar, der Service verweigert einen fremden Beleg. Welche Schlussfolgerung passt?

- [x] Kachel und Fachrechte sind verschiedene Grenzen; Ablehnung kann korrekt sein. — Sichtbarkeit einer Anwendung verleiht kein Recht auf jeden Datensatz.
- [ ] Sichtbarkeit garantiert Vollzugriff auf alle Daten dieser Anwendung. — Katalog-/Oberflächeninhalt ist kein universeller Datensatzberechtigungsnachweis.
- [ ] Der Benutzer muss vorsorglich ein dauerhaftes Adminprofil bekommen. — Breite Zusatzrechte umgehen den Fachvertrag und sind keine Fehlerdiagnose.

### Nach einem Upgrade meldet der Content Manager eine veraltete App und einen Nachfolger. Was gehört zur Umstellung?

- [ ] Nur die Kachel beschriften; der technische Verweis kann unverändert bleiben. — Ein neuer Text migriert weder Navigation noch Serviceabhängigkeiten.
- [ ] Alle Kundenscopes ohne Prüfung auf SAP-Standard zurücksetzen. — Das kann berechtigte kundeneigene Anpassungen verwerfen.
- [x] Mapping, Page, Services und Rollen des Nachfolgers gemeinsam prüfen. — Der neue Einstieg muss mit seinen technischen und fachlichen Abhängigkeiten konsistent sein.

## Quellen und Grenzen

- https://learning.sap.com/courses/exploring-the-authorization-concept-for-sap-fiori-on-sap-s-4hana/checking-and-adjusting-launchpad-content
- https://learning.sap.com/courses/building-transactional-apps-with-the-abap-restful-application-programming-model/implementing-authority-checks

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
