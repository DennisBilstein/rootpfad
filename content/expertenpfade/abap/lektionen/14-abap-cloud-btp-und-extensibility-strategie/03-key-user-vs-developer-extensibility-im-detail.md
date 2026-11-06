# Key-User- vs. Developer-Extensibility im Detail

*ABAP Cloud, BTP & Extensibility-Strategie · ca. 6 Min.*

**Key-User-Extensibility** richtet sich an Fachanwender ohne Entwicklerberechtigung: Custom Fields (Guided-UI), Custom Logic (vereinfachte, sandboxed Scripting-Umgebung), Custom CDS Views auf Basis freigegebener Views. **Developer-Extensibility** (In-App, Embedded Steampunk) erlaubt vollständige ABAP-Cloud-Entwicklung mit released APIs und vollem Sprachumfang.

> **Tipp:** Die Grenze zwischen beiden ist bewusst gezogen: Key-User-Werkzeuge sind absichtlich eingeschränkt (kein voller Sprachumfang, kein Datenbankzugriff), damit Fachanwender das System nicht versehentlich destabilisieren können — eine Governance-Entscheidung, kein technisches Versehen.

## Kontrollfragen

**1. Was kennzeichnet Key-User-Extensibility?**

- [x] Vereinfachte, sandboxed Werkzeuge für Fachanwender ohne Entwicklerberechtigung
- [ ] Vollständiger Zugriff auf das ABAP Dictionary
- [ ] Nur für Systemadministratoren

*Erklärung:* Key-User-Tools sind bewusst auf einfache, sichere Erweiterungen beschränkt.

**2. Warum ist Key-User-Extensibility bewusst eingeschränkt?**

- [ ] Aus technischen Limitierungen der BTP
- [x] Governance-Entscheidung, damit Fachanwender das System nicht versehentlich destabilisieren
- [ ] Weil sie nur ein Testfeature ist

*Erklärung:* Die Einschränkung ist eine bewusste Sicherheits-/Stabilitätsentscheidung.
