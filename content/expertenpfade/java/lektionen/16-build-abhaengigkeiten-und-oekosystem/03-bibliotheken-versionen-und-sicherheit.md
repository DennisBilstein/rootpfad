# Bibliotheken, Versionen und Sicherheit

*Build, Abhängigkeiten & Ökosystem · ca. 7 Min.*

**Semantic Versioning** (MAJOR.MINOR.PATCH) ist ein Versprechen: PATCH behebt Fehler, MINOR ergänzt abwärtskompatibel, MAJOR darf brechen. Wer das Schema kennt, kann Updates einschätzen, statt sie pauschal zu vermeiden.

Jede Abhängigkeit ist zugleich ein Sicherheitsrisiko und eine Wartungslast. Bekannte Schwachstellen werden als **CVE** veröffentlicht; Werkzeuge wie der **OWASP Dependency-Check** oder **Dependabot** prüfen dein Projekt automatisch dagegen.

Nützliche Bibliotheken, die sich fast immer lohnen: **JUnit 5** + **Mockito** (Tests), **AssertJ** (lesbare Assertions), **Jackson** (JSON), **SLF4J/Logback** (Logging), **Apache Commons** / **Guava** (Hilfsfunktionen).

> **Tipp:** Die Log4Shell-Lücke von 2021 war deshalb so verheerend, weil kaum ein Team wusste, dass die betroffene Bibliothek überhaupt im Projekt steckte — sie kam transitiv über andere Abhängigkeiten herein. Die Lehre für deine eigenen Projekte: Kenne deinen Abhängigkeitsbaum, halte ihn klein, und lass ihn automatisiert auf bekannte Schwachstellen prüfen. Jede Bibliothek, die du nicht aufnimmst, musst du auch nie patchen.

## Kontrollfragen

**1. Was besagt eine Erhöhung der MAJOR-Version nach Semantic Versioning?**

- [ ] Nur Fehlerbehebungen
- [x] Es darf inkompatible Änderungen geben
- [ ] Sicherheitsupdate

*Erklärung:* PATCH behebt Fehler, MINOR ergänzt kompatibel, MAJOR darf brechen.

**2. Warum sind transitive Abhängigkeiten ein Sicherheitsthema?**

- [ ] Sie sind langsamer
- [x] Sie gelangen unbemerkt ins Projekt und können bekannte Schwachstellen mitbringen
- [ ] Sie kosten Lizenzgebühren

*Erklärung:* Genau dieses Muster machte Log4Shell so schwer einzugrenzen.
