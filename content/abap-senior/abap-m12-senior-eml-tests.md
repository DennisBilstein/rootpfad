# RAP mit EML testen: Puffer, Save Sequence und echte Fehlernachweise

abap-m12-senior-eml-tests · 35 Minuten · 08.11.2026

## Voraussetzungen

Managed RAP BO, EML-Grundlagen und ABAP Unit; CDS-/SQL-Test-Doubles im Zielrelease verfügbar.

## Lernziele

- Puffererfolg von erfolgreicher Persistierung unterscheiden.
- FAILED, REPORTED und MAPPED fachlich auswerten.
- BO-Szenariotests von Autorisierungs- und HTTP-Integrationstests abgrenzen.

Ein Test, der nur prüft, dass MODIFY ENTITIES keinen Dump erzeugt, belegt wenig. EML bearbeitet zunächst den transaktionalen Puffer. Validierungen und späte Fehler können erst in der Save Sequence sichtbar werden. Definiere deshalb vorher den fachlichen Vertrag: Ein gültiger Auftrag wird mit korrekten Werten gespeichert; ein ungültiger Auftrag hinterlässt keine persistierte Instanz.

FAILED benennt fehlgeschlagene Instanzen, REPORTED transportiert Meldungen und MAPPED ordnet temporäre Anlege-IDs den Schlüsseln zu. Eine Meldung kann auch eine Warnung sein; REPORTED ungleich initial ist nicht pauschal ein fehlgeschlagener Save. Prüfe erwartete Meldungsschwere, betroffene Instanz und bei feldbezogenen Meldungen den Feldbezug. Die Responses des Änderungsaufrufs und des Commits sind getrennte Prüfpunkte.

Ein äußerer EML-Consumer oder Szenariotest steuert COMMIT ENTITIES beziehungsweise ROLLBACK ENTITIES. Innerhalb der Behavior-Implementierung gehört diese Transaktionssteuerung dem RAP-Framework; dort nicht eigenmächtig COMMIT WORK oder COMMIT ENTITIES einbauen. Teste fachlichen Zustand nach erfolgreichem Save, nicht nur die Anzahl gemappter Schlüssel.

Das SAP-RAP100-Beispiel isoliert CDS-Lesezugriffe und zusätzliche SQL-Abhängigkeiten mit passenden Test-Doubles. setup leert Testzustand, class_teardown zerstört die Testumgebungen. ROLLBACK ENTITIES verwirft noch nicht gespeicherte Pufferdaten, ist aber kein universelles Undo eines früheren echten Datenbankcommits. Verwende keine produktiven Tabellen als Testfixture. Ein isolierter EML-Test mit internem Zugriff beweist weder Benutzerautorisierung noch HTTP-ETag-Verhalten.

```abap
" Prüfablauf, kein vollständiges ABAP-Programm:
" 1. CDS-/SQL-Doubles konfigurieren und pro Test zurücksetzen.
" 2. MODIFY ENTITIES ... FAILED ... REPORTED ... MAPPED ...
" 3. Erwartete unmittelbare Responses prüfen.
" 4. Im äußeren Test: COMMIT ENTITIES RESPONSES FAILED ... REPORTED ...
" 5. Persistierten Fachzustand aus isolierter Umgebung lesen.
" 6. Separat: ungültigen Datensatz und zwei echte Benutzer testen.
```

## Senior-Praxis

Schreibe zuerst eine Assertion auf den falschen Status oder Betrag und prüfe, ob sie tatsächlich scheitert. Ein grüner Test, der das falsche Feld liest, ist keine Absicherung.

## Praxisfälle

- Normalfall: Gültige Instanz erzeugen, Action ausführen und nach Save den erwarteten Status und Betrag prüfen.
- Grenzfall: Eine gültige Warnung zulassen und anhand der Schwere zeigen, dass nicht jede Meldung einen Fehler bedeutet.
- Fehlerfall: Datum verletzt Save-Validierung: späte Fehlerresponse prüfen und nachweisen, dass keine neue fachliche Instanz gespeichert wurde.

## Szenarioquiz

### Ein EML-Test erhält nach CREATE einen gemappten Schlüssel. Die Save-Validierung schlägt später fehl. Welche Aussage trägt der erste Prüfschritt allein?

- [ ] Der vollständige Auftrag wurde bereits dauerhaft gespeichert. — Ein Mapping belegt nicht den Erfolg der späteren Save Sequence.
- [ ] Der Benutzer besitzt alle benötigten OData-Schreibrechte. — Ein internes EML-Mapping prüft nicht sämtliche Service- und Benutzergrenzen.
- [x] Die frühe Anlegephase lieferte ein Mapping, nicht den Save-Erfolg. — Commitresponses und persistierter Fachzustand sind eigene Nachweise.

### Nach dem COMMIT ENTITIES eines äußeren Szenariotests ist REPORTED gefüllt, FAILED aber leer. Wie bewertet man den Lauf?

- [ ] Jede vorhandene Meldung als fehlgeschlagenen Commit behandeln. — REPORTED kann auch Informationen oder Warnungen enthalten.
- [x] Meldungsschwere, Sollvertrag und gespeicherten Zustand prüfen. — Die fachliche Erwartung und Fehlerresponse entscheiden, nicht bloß die Existenz einer Meldung.
- [ ] Alle Meldungen löschen und nur auf den gemappten Schlüssel schauen. — Damit würden relevante Warnungen und fachliche Abweichungen verdeckt.

### Ein Behavior-Handler soll nach jeder Änderung selbst COMMIT WORK ausführen, damit der Test grün wird. Was ist angemessen?

- [x] Transaktionshoheit beim Framework lassen und den äußeren Test korrigieren. — Eigenmächtiges Commit im Handler verletzt das RAP-Transaktionsmodell.
- [ ] COMMIT WORK im Handler durch COMMIT ENTITIES im Handler ersetzen. — Auch diese Transaktionssteuerung gehört hier nicht in die Behavior-Implementierung.
- [ ] Den Commit nur bei aktivem Debugger im Handler ausführen. — Das erzeugt abweichendes Laufzeitverhalten statt eines belastbaren Tests.

## Quellen und Grenzen

- https://developers.sap.com/tutorials/abap-environment-rap100-unit-testing.html
- https://learning.sap.com/courses/building-transactional-apps-with-the-abap-restful-application-programming-model/using-the-entity-manipulation-language-eml-to-access-business-objects

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
