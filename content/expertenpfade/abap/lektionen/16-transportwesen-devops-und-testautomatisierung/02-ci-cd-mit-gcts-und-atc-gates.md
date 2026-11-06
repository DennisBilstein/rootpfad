# CI/CD mit gCTS & ATC-Gates

*Transportwesen, DevOps & Testautomatisierung · ca. 7 Min.*

**gCTS** (Git-enabled Change and Transport System) integriert Git direkt in die offizielle SAP-Transportkette — im Unterschied zu abapGit kein separates Tool, sondern nativ ins Transportwesen eingebettet. Typische Pipeline: Commit → automatischer ATC-Lauf (Quality Gate) → automatisierte ABAP-Unit-Tests → bei Erfolg automatischer Import ins nächste System.

> **Tipp:** ATC als Quality Gate in der Pipeline ist der entscheidende Kulturschritt von "Codequalität wird irgendwann mal geprüft" zu "Code mit kritischen Findings kann das System gar nicht erst verlassen" — ein Automatisierungsgewinn, der in rein transportbasierten Workflows kaum durchsetzbar war.

## Kontrollfragen

**1. Was unterscheidet gCTS grundlegend von abapGit?**

- [x] gCTS ist nativ ins offizielle SAP-Transportwesen integriert, abapGit ist ein separates Zusatztool
- [ ] Es gibt keinen Unterschied
- [ ] gCTS funktioniert nur ohne Git

*Erklärung:* gCTS ersetzt/erweitert das klassische Transportwesen direkt um Git-Funktionalität.

**2. Was bewirkt ein ATC-Quality-Gate in einer CI/CD-Pipeline?**

- [x] Die Pipeline bricht bei kritischen Codequalitäts-Findings automatisch ab
- [ ] Es verlangsamt nur die Pipeline ohne Wirkung
- [ ] Es ersetzt alle manuellen Tests

*Erklärung:* Ein Quality Gate verhindert, dass mangelhafter Code das System automatisch weiter durchläuft.
