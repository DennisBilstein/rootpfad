# Application Jobs betreiben: Wiederanlauf, Idempotenz und Application Log

abap-m19-senior-restartable-jobs · 30 Minuten · 08.11.2026

## Voraussetzungen

ABAP-Transaktionen, Hintergrundverarbeitung und Fehlerkategorien; freigegebene Job-/Log-APIs des Zielsystems prüfen.

## Lernziele

- Jobstatus und fachliches Ergebnis getrennt prüfen.
- Persistierten Wiederanlaufpunkt mit atomarer Fachwirkung planen.
- Diagnosefähige, datensparsame Logs und einen sicheren Replay-Prozess entwerfen.

Ein Job verarbeitet 1000 Belege und bricht nach 400 ab. „Noch einmal starten“ ist nur sicher, wenn der Vertrag festlegt, welche Belege bereits wirksam verarbeitet wurden. Ein Job kann technisch beendet sein und fachlich abgewiesene Datensätze enthalten. Umgekehrt kann nach einem Timeout eine externe Buchung bereits erfolgreich sein. Statusfarbe und End-to-End-Fachwirkung sind verschiedene Größen.

Arbeite mit begrenzten Paketen und einem stabilen fachlichen Schlüssel oder einer Versionsmarke. Für rein lokale Verarbeitung müssen Wirkung und Verarbeitungsmarker in derselben geeigneten Transaktion gesichert werden. Ein Marker vor der Wirkung riskiert Verlust, ein ungekoppelter Marker danach Duplikate. Ein Neustart muss bereits verarbeitete Belege erkennen, konkurrierende Läufe dürfen dieselbe Wirkung nicht doppelt ausführen.

Für externe Seiteneffekte brauchst du einen Idempotenzvertrag oder belastbaren Abgleich mit dem Ziel. Ein lokales ROLLBACK nimmt eine fremde Buchung nicht zurück. Transiente Fehler können begrenzt mit Backoff wiederholt werden; fachlich ungültige Belege brauchen Korrektur statt Endlos-Retry. Eine Wiederaufnahme „nach Fehlerstep“ darf keine noch notwendigen fachlichen Voraussetzungen überspringen.

Application Log und Jobmonitoring sollen Lauf-ID, Paket/Objektbezug, Fehlerkategorie, Bearbeitungszahlen und erlaubte nächste Aktion zeigen. Keine kompletten Geschäftspayloads, Tokens oder Passwörter protokollieren; auch Log-Leserechte sind zu begrenzen. Die SAP-Samplequelle zeigt konkrete ältere Interfaces und Scheduling-APIs, deren Unterstützung und zulässige RAP-Phase im Zielrelease geprüft werden müssen. Sie ist kein Beweis, dass jeder gezeigte API-Aufruf in jeder RAP-Phase sicher ist.

```text
Paket 1: 1..200 → Wirkung + Marker gemeinsam gesichert
Paket 2: 201..400 → Wirkung + Marker gemeinsam gesichert
Crash → Neustart überspringt bestätigte Schlüssel
Externer Timeout → Status beim Ziel mit Idempotenzschlüssel abgleichen
Log: Lauf-ID, Zähler, Fehlerklasse, bereinigter Objektbezug
```

## Senior-Praxis

Teste den Crash zwischen Wirkung und Quittierung gezielt. Ein Job, der nur von Anfang bis Ende erfolgreich läuft, hat seinen Wiederanlaufvertrag noch nicht bewiesen.

## Praxisfälle

- Normalfall: Zwei lokale Pakete verarbeiten; Zähler und gesicherte Belegzustände stimmen überein.
- Grenzfall: Letztes Paket enthält nur einen Beleg; weder Auslassung noch doppelte Verarbeitung durch Pagination.
- Fehlerfall: Crash nach Zielbuchung vor lokaler Quittierung: Abgleich/Idempotenz verhindert zweite Buchung, unsicherer Zustand wird sichtbar.

## Szenarioquiz

### Ein Job-Log meldet „Finished“, enthält aber 12 fachlich abgewiesene Belege. Wie meldest du das Ergebnis?

- [ ] Vollständig fachlich erfolgreich, weil der Scheduler grün ist. — Technischer Abschluss löscht keine im Log enthaltenen fachlichen Fehler.
- [ ] Unbekannt, da Logs grundsätzlich keinen Ergebnisbezug haben. — Das bereinigte Log und die gesicherten Zustände liefern durchaus relevante Evidenz.
- [x] Technisch beendet, mit separat ausgewiesenen fachlichen Ablehnungen. — Betriebsstatus und Fachresultat müssen getrennt nachvollziehbar sein.

### Ein rein lokaler Paketjob speichert einen Erledigt-Marker vor der eigentlichen Belegänderung und stürzt danach ab. Welche Korrektur schützt den Wiederanlauf?

- [x] Marker und Fachwirkung in derselben geeigneten Transaktion sichern. — Der Neustart darf eine nicht ausgeführte Wirkung nicht irrtümlich als erledigt überspringen.
- [ ] Die Marker früher schreiben und nur den Scheduler häufiger starten. — Das vergrößert das Verlustfenster statt es atomar zu schließen.
- [ ] Alle Protokolle entfernen und jeden Beleg immer erneut buchen. — Ohne Deduplizierung drohen doppelte Wirkungen und fehlende Diagnose.

### Ein externer Buchungsaufruf endet im Timeout; das Ziel könnte bereits gebucht haben. Was ist vor einem blinden Retry nötig?

- [ ] Ein lokales ROLLBACK, das auch die fremde Buchung sicher entfernt. — Die lokale Transaktion kontrolliert keine bereits wirksame Buchung des fremden Systems.
- [x] Idempotenzschlüssel oder verbindlicher Statusabgleich beim Ziel. — Der unsichere Ausgang muss so geklärt werden, dass keine doppelte Fachwirkung entsteht.
- [ ] Ein neues zufälliges Belegkennzeichen für jede Wiederholung. — Ein neuer Schlüssel kann die Deduplizierung umgehen und eine zweite Buchung ermöglichen.

## Quellen und Grenzen

- https://github.com/SAP-samples/abap-platform-application-jobs
- https://learning.sap.com/courses/administrating-sap-s-4hana-cloud-public-edition/monitoring-application-jobs_f18a1e3b-b367-46f0-828a-99fea42cd3b4

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
