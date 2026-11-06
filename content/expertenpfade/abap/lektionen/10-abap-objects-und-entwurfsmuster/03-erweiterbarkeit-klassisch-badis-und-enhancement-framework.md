# Erweiterbarkeit klassisch: BAdIs & Enhancement Framework

*ABAP Objects & Entwurfsmuster · ca. 7 Min.*

**BAdIs** (Business Add-Ins) sind SAPs klassisches Muster für definierte Erweiterungspunkte im Standardcode — technisch eine Interface-basierte Plug-in-Architektur: SAP definiert ein Interface, Kunden implementieren eigene Klassen dagegen, ohne den Standardcode zu ändern.

**Enhancement Points/Sections** erlauben zusätzlich punktuelle Codeergänzungen direkt im Standardcode — modifikationsfrei, aber technisch „näher am Kern" als BAdIs. In ABAP Cloud ist diese klassische Erweiterbarkeit weitgehend durch In-App-Extensibility und freigegebene (released) BAdIs ersetzt.

> **Tipp:** BAdIs sind letztlich SAPs produktionsreife Umsetzung des Strategy-Patterns in großem Maßstab — wer das Muster einmal verstanden hat, erkennt BAdIs nicht mehr als SAP-Spezialität, sondern als konsequente Anwendung eines bekannten Entwurfsprinzips.

## Kontrollfragen

**1. Was ist der technische Kerngedanke eines BAdI?**

- [x] Ein von SAP definiertes Interface, das Kunden ohne Standardcode-Änderung mit eigener Logik implementieren
- [ ] Eine direkte Modifikation des SAP-Standardcodes
- [ ] Ein Datenbank-Trigger

*Erklärung:* BAdIs sind eine saubere, modifikationsfreie Plug-in-Architektur nach dem Strategy-Prinzip.

**2. Wodurch wird klassische Erweiterbarkeit in ABAP Cloud weitgehend ersetzt?**

- [ ] Durch direkte Tabellenänderungen
- [x] In-App-Extensibility und freigegebene (released) BAdIs
- [ ] Sie wird komplett abgeschafft

*Erklärung:* ABAP Cloud setzt auf definierte, versionsstabile Erweiterungspunkte statt freier Modifikation.
