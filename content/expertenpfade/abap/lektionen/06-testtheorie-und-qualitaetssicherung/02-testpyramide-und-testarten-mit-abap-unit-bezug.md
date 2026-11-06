# Testpyramide & Testarten mit ABAP-Unit-Bezug

*Testtheorie & Qualitätssicherung · ca. 6 Min.*

Die **Testpyramide** empfiehlt viele schnelle **Unit-Tests** (breite Basis), weniger **Integrationstests** (Mitte), wenige langsame **End-to-End/Akzeptanztests** (Spitze). Ein umgekehrtes Verhältnis ("Ice-Cream-Cone") gilt als Antipattern — es macht die Testsuite langsam und fehleranfällig.

In ABAP: Unit-Tests = **ABAP Unit** (isolierte Klassen, Test Doubles), Integrationstests = z. B. komplette RAP-Business-Objects inkl. Datenbank, Akzeptanztests = oft manuell oder über UI-Testautomatisierung.

> **Tipp:** Wenn ein Team hauptsächlich über langsame, brüchige UI-Tests Vertrauen in seinen Code gewinnt, ist das ein verlässliches Warnsignal für zu wenig Unit-Test-Abdeckung an der Basis — unabhängig von der verwendeten Sprache.

## Kontrollfragen

**1. Welche Testart bildet laut Testpyramide die breite Basis?**

- [ ] End-to-End-Tests
- [x] Unit-Tests
- [ ] Manuelle Akzeptanztests

*Erklärung:* Unit-Tests sind schnell und zahlreich — sie bilden das Fundament der Pyramide.

**2. Was gilt als Antipattern zur Testpyramide?**

- [ ] Viele Unit-Tests, wenige UI-Tests
- [x] Viele langsame UI-/End-to-End-Tests bei wenigen Unit-Tests (Ice-Cream-Cone)
- [ ] Automatisierte Tests generell

*Erklärung:* Das umgekehrte Verhältnis macht Tests langsam, teuer und schwer wartbar.
