# SOLID-Prinzipien in ABAP

*ABAP Objects & Entwurfsmuster · ca. 8 Min.*

Die fünf SOLID-Prinzipien, angewendet auf ABAP:

-   **S**ingle Responsibility — eine Klasse, ein Grund zur Änderung.
-   **O**pen/Closed — offen für Erweiterung, geschlossen für Änderung (z. B. über BAdIs/Interfaces statt Codeänderung).
-   **L**iskov Substitution — eine Unterklasse muss sich überall wie ihre Basisklasse verhalten.
-   **I**nterface Segregation — viele kleine, spezifische Interfaces statt eines großen.
-   **D**ependency Inversion — von Abstraktionen/Interfaces abhängen, nicht von konkreten Implementierungen.

> **Tipp:** SOLID ist kein Selbstzweck — in ABAP zeigt sich der Wert besonders beim Dependency-Inversion-Prinzip: wer konsequent gegen Interfaces statt konkrete Klassen programmiert, kann echte Implementierungen in Tests durch Test Doubles ersetzen, ohne Produktivcode anzufassen.

## Kontrollfragen

**1. Wofür steht das "O" in SOLID?**

- [ ] Object-Prinzip
- [x] Open/Closed-Prinzip
- [ ] Optimization-Prinzip

*Erklärung:* Open/Closed: offen für Erweiterung, geschlossen für Modifikation.

**2. Was fordert das Dependency-Inversion-Prinzip?**

- [x] Abhängigkeit von Abstraktionen/Interfaces statt konkreten Implementierungen
- [ ] Möglichst wenige Klassen
- [ ] Vererbung statt Komposition

*Erklärung:* High-Level-Code soll von Interfaces abhängen, nicht von konkreten Low-Level-Klassen.
