# ABAP Cloud vs. klassisches ABAP: Released APIs

*ABAP Cloud, BTP & Extensibility-Strategie · ca. 7 Min.*

Jede API/Klasse/CDS-View im ABAP-Cloud-Kontext hat einen **Release-Status**: **released** APIs sind offiziell freigegeben, versioniert und upgradesicher — SAP garantiert Abwärtskompatibilität oder kündigt Änderungen mit Vorlauf an. Nicht freigegebene ("internal") APIs können sich jederzeit ändern und dürfen im ABAP-Cloud-Modell gar nicht erst referenziert werden — der **ABAP Cloud Compiler Check** verhindert das automatisch.

Diese Unterscheidung ist der eigentliche technische Kern von **"Clean Core"**.

> **Tipp:** "Clean Core" ist keine reine Marketingfloskel, sondern hat einen präzisen technischen Kern: nur gegen einen versionierten, garantierten API-Vertrag zu entwickeln, statt gegen zufällig heute funktionierenden internen Code — der entscheidende Unterschied zwischen einem System, das ein Upgrade übersteht, und einem, das dabei bricht.

## Kontrollfragen

**1. Was garantiert eine "released" API im ABAP-Cloud-Modell?**

- [ ] Maximale Performance
- [x] Versionierte Abwärtskompatibilität bzw. angekündigte Änderungen
- [ ] Automatische Übersetzung

*Erklärung:* Released APIs sind SAPs stabiler, dokumentierter Vertrag mit Entwicklern.

**2. Was verhindert der ABAP Cloud Compiler Check?**

- [x] Die Nutzung nicht freigegebener ("internal") APIs im Cloud-Programmiermodell
- [ ] Syntaxfehler im Allgemeinen
- [ ] Die Nutzung von CDS-Views

*Erklärung:* Der Check erzwingt, dass nur released APIs referenziert werden dürfen.
