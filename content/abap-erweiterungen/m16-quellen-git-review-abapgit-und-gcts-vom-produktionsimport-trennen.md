# Git-Review, abapGit und gCTS vom Produktionsimport trennen

Modul: abap-m16 · 30 Minuten

Git versioniert Dateien; ABAP-Entwicklungsobjekte liegen zunächst im ABAP-Repository. Ein Werkzeug muss sie deshalb serialisieren und wieder einlesen. abapGit unterstützt den Austausch von ABAP-Quellobjekten mit Git. gCTS verbindet Git mit dem Change-and-Transport-Prozess. Ein Commit, eine erfolgreiche Aktivierung und ein freigegebener Produktionsimport sind unterschiedliche Ereignisse und benötigen jeweils klare Qualitätsregeln.

Für SAP BTP ABAP Environment empfiehlt die aktuelle SAP-Dokumentation gCTS über Manage Software Components zum Transport innerhalb eines Global Accounts, beispielsweise von DEV nach TEST und PROD. abapGit ist dort für Quellcode-Import und -Export zwischen Entwicklungssystemen vorgesehen, auch über Global-Account-Grenzen hinweg. Diese konkrete BTP-Aussage darfst du nicht ungeprüft auf alle On-premise-gCTS-Landschaften übertragen. Ebenso ist das klassische SAP-GUI-Installationsverfahren von abapGit nicht automatisch das Verfahren einer verwalteten Cloud-Umgebung.

Beispiel: Eine neue Rundungsregel wird in einer Hilfsklasse implementiert. Der Review soll die Fachänderung und passende ABAP-Unit-Tests zeigen, nicht tausend beiläufig formatierte Zeilen. Vor der Freigabe prüfst du Syntax, Tests und ATC-Ergebnisse. Der Commit dient der Nachvollziehbarkeit; der definierte Transportweg sorgt dafür, dass der freigegebene Stand geordnet in die nachfolgenden Systeme gelangt. Halte fest, welcher Stand verbindlich ist, statt SAP-System und Git unabhängig voneinander zu verändern.

Praxisauftrag: Schreibe einen Release-Steckbrief für diese Rundungsänderung: betroffene Objekte, Commit, Transport beziehungsweise Softwarekomponente, Testergebnisse, Reviewer und Wiederanlaufplan. Ohne ABAP-System kannst du den Review-Ablauf mit einer lokalen Textdatei und Git üben; das simuliert aber weder einen ABAP-Import noch eine Aktivierung. Die SAP-Leitfäden und öffentlichen Repositories sind frei zugänglich. Unternehmenssysteme, Transportberechtigungen und gegebenenfalls Git-Hosting oder CI-Ressourcen werden dadurch nicht kostenlos bereitgestellt.

```bash
# Lokale Git-Übung nach Export/Serialisierung; kein ABAP-Transport
git switch -c feature/rundungsregel
git diff
git add src/zcl_rounding.clas.abap
git diff --cached
git commit -m "Rundungsregel mit Grenzfalltests ergänzen"
# Danach: Review und freigegebenen SAP-Transportprozess nutzen.
# Die Beispieldatei muss im Übungsrepository bereits existieren.
```

## Kontrollfragen

### Was garantiert ein erfolgreicher Git-Commit allein?

- [x] Dass die Änderung versioniert wurde
- [ ] Dass alle Objekte in PROD aktiviert sind
- [ ] Dass ATC und ABAP Unit bestanden wurden

Commit, Qualitätsprüfung, Aktivierung und Transport sind getrennte Schritte.

### Welchen Zweck empfiehlt SAP für abapGit in der dokumentierten BTP-ABAP-Landschaft?

- [ ] Unkontrollierte Direktänderungen in PROD
- [x] Quellcode-Import/-Export zwischen Entwicklungssystemen
- [ ] Ersetzen aller Berechtigungskonzepte

Für den regulären Transport innerhalb eines Global Accounts empfiehlt die Quelle gCTS/Manage Software Components.

### Warum sind kleine fachlich zusammenhängende Diffs hilfreich?

- [ ] Sie ersetzen die Fachprüfung
- [ ] Sie verhindern jeden Merge-Konflikt
- [x] Sie erleichtern gezieltes Review und Fehlererkennung

Kleine Diffs machen die Änderung verständlicher; Tests und technische Abstimmung bleiben erforderlich.

## Quellen und Zugang

- [SAP-docs: Transport Mechanisms](https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/30-development/transport-mechanisms-aa7f169.md): Öffentlicher SAP-Dokumentationsvolltext geprüft; Aussagen gelten für BTP ABAP Environment.
- [SAP/styleguides: ABAP Code Reviews](https://github.com/SAP/styleguides/blob/main/abap-code-review/ABAPCodeReview.md): Frei lesbarer offizieller SAP-Leitfaden; manche Systembeispiele sind älter und releaseabhängig.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
