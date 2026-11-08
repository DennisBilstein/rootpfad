# Geführte Codewerkstatt

## Orientierung und eigenständige Umsetzung

Die öffentliche Übersicht von Codecademys „Learn JavaScript“ wurde am 06.11.2026
abgerufen: https://www.codecademy.com/learn/introduction-to-javascript.
Sie zeigt einen Anfängerkurs mit kurzen Sprachthemen, Aufgaben und Projekten.
Die Seite unterscheidet zugleich kostenlose Inhalte von kostenpflichtigen
Zusatzfunktionen (unter anderem Zertifikat/Assessments). Die vollständigen
angemeldeten Kursabläufe wurden nicht getestet. ROOTPFAD behauptet weder eine
Kooperation noch eine vollständige Kopie oder Funktionsgleichheit.

Übernommen wurde nur das allgemeine Lernprinzip: erklären, selbst bearbeiten,
unmittelbar rückmelden und mit verändertem Auftrag erneut anwenden. Texte,
Code, Aufgaben und Gestaltung sind eigene ROOTPFAD-Inhalte.

## Implementierter Umfang

30 eigene Aufgaben in zehn Spuren: JavaScript, TypeScript, Vue, PHP, Laravel,
Java, ABAP, SQL, Git und Pseudocode. Jeweils drei kleine Schritte mit erklärter
Voraussetzung, konkretem Auftrag, Hinweis, Lösung und Begründung. Die Auswahl
folgt dem Lernpfad. SQL/Pseudocode sind im AP1-Pfad; PHP/Laravel und JS/TS/Vue
teilen ihre bestehenden Pfade. Spuren sind keine neuen Sprachmodule.

Die Werkstatt ist von der Navigation, Startansichten und passenden Lektionen
aus erreichbar. Es handelt sich um einen sprachbezogenen Einstiegspool,
**nicht um je drei neue Aufgaben für jede der 427 Lektionen**.

## Echte Ausführung und Grenzen

Nur drei JavaScript-Funktionsaufgaben führen selbst geschriebenen Code aus.
Ein sandboxed iframe ohne allow-same-origin erstellt einen Worker aus einem
festen Evaluator. CSP sperrt Netzwerkzugriffe. Der Worker besitzt weder DOM
noch Lernzustand; nach zwei Sekunden wird die Umgebung entfernt. Antworten
werden nur von diesem Frame mit passender Laufkennung akzeptiert. JavaScript
kann im Worker dennoch absichtlich die sichtbaren Checks manipulieren; das ist
ein Lernfeedback, kein manipulationssicheres Prüfungssystem und keine Zusage
einer vollständigen allgemeinen Code-Sandbox für beliebige feindliche Programme.

Andere Spuren prüfen fest begrenzte Codeergänzungen, ohne PHP/Java/ABAP/SQL/Git
auszuführen. Das steht bei jeder Aufgabe ausdrücklich dabei. Kein beliebiger
Code wird durch child_process auf dem ROOTPFAD-Server ausgeführt. Die vorher
angelegten Laravel-/Vue-Labore bleiben für vollständige Frameworkübungen nötig.

## Lernstand und Hilfe

Abschlüsse nutzen state.solved und state.xpLog und damit den bestehenden
Export-/Synchronisationsweg. Eine Aufgabe gibt maximal einmal zehn XP.
Nach aufgedeckter Lösung gibt es in dieser Sitzung keinen selbstständigen
Abschluss. Ein Hinweis ist erlaubt; die App behauptet daraus keinen
Transfer-/Beherrschungsnachweis. Entwürfe und Eingabefelder bleiben beim
Hinweis-/Schrittwechsel erhalten, aber nicht nach Browser-Neuladen.

## Abnahme

Automatisierte Tests prüfen alle zehn Spuren, die drei JavaScript-Lösungen,
Endlosschleifenabbruch, fehlenden DOM-Zugriff, unverlorene Eingaben beim Hinweis,
Lösungsanzeige ohne selbstständige Wertung sowie mobile Überlaufgrenzen.
Weitere Schwierigkeitsstufen, freie PHP/Java-Ausführung und Aufgaben für jede
einzelne Lektion sind noch nicht implementiert.
