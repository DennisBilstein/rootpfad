# Transporte: Von der Entwicklungsaufgabe zur getesteten Änderung

Modul: abap-m16 · 18 Minuten

In einer klassischen ABAP-Dreisystemlandschaft werden Änderungen in DEV entwickelt, in QAS geprüft und anschließend kontrolliert nach PRD übernommen. Ein Transportauftrag bündelt zusammengehörige Änderungen; darunter liegen Aufgaben der beteiligten Entwickler. Die Aufgabe ist also weder ein eigenes SAP-System noch dasselbe wie der übergeordnete Auftrag. Ein Workbench-Auftrag transportiert unter anderem Repository-Objekte, ein Customizing-Auftrag mandantenabhängige Customizing-Änderungen.

Beispiel: Eine Klasse ZCL_VERSAND und ihre zugehörigen Teständerungen bilden eine fachlich prüfbare Einheit. Die Objekte werden im Entwicklungssystem den passenden Aufgaben des Auftrags zugeordnet. Nach Implementierung und Prüfung geben die Entwickler ihre Aufgaben frei. Erst wenn die Aufgaben freigegeben sind, kann der verantwortliche Projektleiter den Auftrag freigeben. Die Freigabe des Auftrags stößt den Export an; der spätere Import ins Zielsystem ist ein eigener Schritt.

Vor einem Testimport klärt das Team Abhängigkeiten: Benötigt die Klasse beispielsweise einen neuen Datentyp, muss dieser im Zielsystem rechtzeitig vorhanden sein. Ein erfolgreich importiertes Objekt beweist noch nicht, dass die fachliche Änderung korrekt arbeitet. Deshalb dokumentieren Tester eine verständliche Prüfung, etwa: Versandfrei ab Warenkorbwert 10, Versandkosten unter 10 und sinnvolle Behandlung ungültiger Mengen. Produktivimporte gehören in den vereinbarten Freigabeprozess, nicht in eine spontane Anfängerübung.

Praxisaufgabe ohne SAP-Zugang: Ordne die Karten 'Aufgabe freigeben', 'Änderung entwickeln', 'Auftrag exportieren', 'in QAS importieren', 'fachlich testen' und 'genehmigt nach PRD importieren'. Erkläre anschließend, wer entwickelt, wer testet und wer den Import verantwortet. Der Ablauf unten ist bewusst Pseudotext und kein ausführbares ABAP-Programm. In ABAP Cloud und S/4HANA Cloud sind Landschaft und Transportwerkzeuge gesondert zu prüfen; die klassischen Transaktionscodes und Rollenabläufe dürfen nicht pauschal übertragen werden.

```text
DEV: Änderung implementieren und prüfen
DEV: Objekte in Entwickleraufgaben des passenden Auftrags erfassen
DEV: Entwickleraufgaben freigeben
DEV: Verantwortlicher gibt Auftrag frei -> Export
QAS: Auftrag durch zuständige Rolle importieren
QAS: Fachliche und technische Tests dokumentieren
PRD: Genehmigten Import nach vereinbartem Prozess durchführen
```

## Kontrollfragen

### Was muss in dem beschriebenen klassischen Ablauf vor der Auftragsfreigabe erledigt sein?

- [x] Alle Entwickleraufgaben des Auftrags sind freigegeben
- [ ] Der Auftrag ist bereits produktiv importiert
- [ ] Eclipse wurde deinstalliert

Die Entwickler geben zunächst ihre Aufgaben frei. Danach kann der verantwortliche Projektleiter den übergeordneten Auftrag freigeben.

### Welche Aussage trennt Export und Import richtig?

- [ ] Freigabe garantiert sofort einen Produktivimport
- [x] Export aus DEV und Import ins Zielsystem sind getrennte Schritte
- [ ] Ein QAS-Test ist nach jedem Export unnötig

Der klassische Transportprozess unterscheidet den Export im Quellsystem vom kontrollierten Import in nachfolgende Systeme.

## Quellen und Zugang

- [SAP Learning: Introducing Transport Requests and the Transport Process](https://learning.sap.com/courses/introducing-sap-abap-platform-fundamentals/introducing-transport-requests-and-the-transport-process): Vollständiger Lesetext ohne Anmeldung abgerufen. Reale Transportverwaltung und Freigaben benötigen autorisierten Systemzugang; diese Lektion verlangt keinen echten Import.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
