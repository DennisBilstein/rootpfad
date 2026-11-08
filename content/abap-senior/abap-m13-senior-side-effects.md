# Fiori Elements V4: Side Effects, Meldungen und sichere Erweiterungen

abap-m13-senior-side-effects · 30 Minuten · 08.11.2026

## Voraussetzungen

Fiori Elements List Report/Object Page, OData V4 und RAP-Determinations; SAPUI5-Version und Service-Metadaten bekannt.

## Lernziele

- Backend-Neuberechnung und UI-Neuladen unterscheiden.
- Side-Effect-Quellen und Ziele aus dem Datenvertrag herleiten.
- Unterstützte Extension APIs statt generierter Control-Interna wählen.

Ein Benutzer ändert Menge von 2 auf 3 bei Einzelpreis 10. Das Backend berechnet den Betrag von 20 auf 30, die Object Page zeigt aber weiter 20. Ursache kann eine fehlende Aktualisierung des betroffenen Feldes sein, nicht eine fehlende Multiplikation. Ein Side Effect beschreibt, welche Repräsentationen nach einer Änderung neu gelesen werden sollen; die Annotation ist nicht selbst die fachliche Berechnung.

Für OData V4 verbinden Side-Effect-Metadaten etwa Quantity als Quelle mit NetAmount als Ziel. Prüfe die tatsächlich ausgelieferten Metadaten und die Unterstützung deiner SAPUI5-/Backendversion. RAP-Side-Effect-Definitionen und lokale XML-Annotationen sind unterschiedliche Wege mit releaseabhängigen Möglichkeiten. CAP-CDS-Syntax aus einem Fiori-Tutorial ist nicht unverändert ABAP CDS. Standard-Side-Effects existieren bereits, zusätzliche Regeln müssen nicht jeden Refresh duplizieren.

Ein ungültiger Wert kann schon an der Clientvalidierung scheitern. Dann wird die Änderung noch nicht an das Backend geschickt und die Neuberechnung wird nicht ausgelöst. Analysiere zuerst den Browser-Network-Tab: PATCH, Batch-Teilantworten, nachfolgende Reads und fachliche Meldungen. HTTP 200 für den äußeren Batch beweist nicht den Erfolg jedes inneren Requests. Backendfehler gehören als verständliche, möglichst feldbezogene Meldungen in den regulären Message Flow.

Erweitere zuerst über Annotationen und Konfiguration, dann über dokumentierte Extension Points, Building Blocks und Controller Extensions. Greife nicht auf private generierte Controller oder zufällige DOM-IDs zu. Die SAP-Learning-Quelle zeigt clientseitige Extensions an einem CAP-Backend; ihre Backendbeispiele werden hier nicht als RAP-Code ausgegeben. Prüfe asynchrone Antworten nach Navigation auf den aktuellen Binding-Kontext, damit Daten von Objekt A nicht auf Objekt B erscheinen.

```text
Quelle: Quantity geändert
Backend: NetAmount fachlich neu berechnen
Side-Effect-Ziel: NetAmount erneut lesen
Clientprüfung fehlgeschlagen: kein PATCH, daher keine Serverneuberechnung
Diagnose: Batch-Teilantwort → Meldung → Ziel-Read → sichtbarer Wert
```

## Senior-Praxis

Kein globales Reload als erste Reparatur. Ein gezielter Refresh erhält Kontext und vermeidet unnötige Reads. Messe Requestzahl und teste verworfene Drafts sowie schnelle Navigation.

## Praxisfälle

- Normalfall: Menge 2 → 3: Backendbetrag und sichtbarer Betrag werden 30; gezielter Ziel-Read nachvollziehbar.
- Grenzfall: Ungültiger Zahlenwert: sichtbare Validierung, kein unbeabsichtigter Serverwrite und keine erfundene Neuberechnung.
- Fehlerfall: Während einer langsamen Erweiterungsabfrage von A nach B navigieren: verspätetes Ergebnis von A überschreibt B nicht.

## Szenarioquiz

### Nach einer Mengenänderung berechnet RAP den Betrag korrekt, Fiori zeigt noch den alten Wert. Was prüfst du zuerst?

- [x] Side-Effect-Ziel, Metadaten und den nachfolgenden Read des Betrags. — Die Backendberechnung ist bereits korrekt; die aktualisierte Repräsentation muss den Client erreichen.
- [ ] Eine zweite unabhängige Preisberechnung im Controller einführen. — Doppelte Fachlogik kann abweichende Ergebnisse und Rundungsfehler erzeugen.
- [ ] Die ETag-Prüfung für alle Schreibrequests der App entfernen. — Nebenläufigkeitsschutz zu entfernen aktualisiert keine Anzeige und riskiert Lost Updates.

### Im Fiori-V4-Formular verletzt eine Eingabe MaxLength. Es gibt keinen PATCH und kein Side-Effect-Read. Was passt zum Ablauf?

- [ ] Der Side Effect sollte die ungültige Eingabe ohne Server korrigieren. — Side Effects sind keine allgemeine clientseitige Reparaturregel für ungültige Werte.
- [ ] Der Server hat die Eingabe bereits erfolgreich gespeichert. — Ohne gesendeten Schreibrequest folgt aus der UI-Eingabe kein Serverwrite.
- [x] Die Clientvalidierung hält den Write bis zur Korrektur zurück. — Solange die betroffenen Werte ungültig sind, wird der Backendablauf nicht regulär ausgelöst.

### Eine Fiori-Erweiterung benötigt einen dokumentierten Edit-Hook. Welche Abhängigkeit ist am tragfähigsten?

- [ ] Die interne generierte Controller-Methode aus dem Debugger kopieren. — Private Implementierungsdetails haben keinen stabilen Erweiterungsvertrag.
- [x] Die passende öffentliche Controller Extension der Zielversion verwenden. — Ein dokumentierter Hook ist der vorgesehene Vertrag; Verfügbarkeit und Lifecycle werden dennoch geprüft.
- [ ] Eine zufällig beobachtete DOM-ID der Speichern-Schaltfläche fest verdrahten. — Generierte DOM-Struktur ist kein Ersatz für eine unterstützte API.

## Quellen und Grenzen

- https://github.com/SAP-docs/sapui5/blob/main/docs/06_SAP_Fiori_Elements/side-effects-18b17bd.md
- https://learning.sap.com/courses/developing-an-sap-fiori-elements-app-based-on-a-cap-odata-v4-service/using-controller-extensions_f47e841f-2dd8-4b88-ba5e-39c0eedd983e

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
