# abapGit-Workflows im Team

*Transportwesen, DevOps & Testautomatisierung · ca. 7 Min.*

**abapGit** synchronisiert ABAP-Entwicklungsobjekte als serialisierte XML-Textdateien mit einem Git-Repository. Typischer Team-Workflow: Feature-Branch pro Entwicklungsaufgabe, Pull Request mit Code-Review vor dem Merge in den Hauptbranch, anschließend Pull der gemergten Änderungen zurück ins Entwicklungssystem.

> **Tipp:** Der größte Kulturwandel durch abapGit ist selten technisch, sondern organisatorisch: Code-Review per Pull Request vor dem Merge war in klassischen SAP-Teams unüblich — wer abapGit einführt, führt meist implizit auch Code-Review-Kultur ein.

## Kontrollfragen

**1. In welchem Format speichert abapGit ABAP-Entwicklungsobjekte im Repository?**

- [x] Als serialisierte XML-Textdateien
- [ ] Als kompilierte Binärdateien
- [ ] Als PDF-Dokumente

*Erklärung:* abapGit serialisiert Entwicklungsobjekte textbasiert für echte Diffs und Versionskontrolle.

**2. Was reduziert das Risiko von Merge-Konflikten bei parallelen Änderungen?**

- [x] Kleine, fokussierte Transporte/Feature-Branches
- [ ] Möglichst große, seltene Transporte
- [ ] Das Deaktivieren von Code-Reviews

*Erklärung:* Kleinere, fokussierte Änderungen überschneiden sich seltener mit paralleler Arbeit.
