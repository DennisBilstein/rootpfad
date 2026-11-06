# Testpyramide und Teststufen

*Testtheorie & Qualitätssicherung · ca. 6 Min.*

Die **Testpyramide** empfiehlt viele schnelle **Unit-Tests** als Basis, weniger **Integrationstests** in der Mitte und wenige langsame **End-to-End-Tests** an der Spitze. Das umgekehrte Verhältnis heißt „Ice-Cream-Cone" und gilt als Antipattern.

Die klassischen **Teststufen** aus dem V-Modell: Komponententest, Integrationstest, Systemtest, Abnahmetest. Dazu kommen **Regressionstests**, die sicherstellen, dass bereits funktionierende Teile nicht durch Änderungen brechen.

In Java setzt du die Basis mit **JUnit 5** um (Modul 15), Test Doubles mit **Mockito**.

> **Tipp:** Ein verlässliches Warnsignal in jedem Projekt: Wenn das Team hauptsächlich über langsame Oberflächentests Vertrauen gewinnt und Unit-Tests fehlen, dauert jede Rückmeldung Minuten statt Sekunden — und genau dann werden Tests irgendwann übersprungen.

## Kontrollfragen

**1. Welche Testart bildet die breite Basis der Testpyramide?**

- [ ] End-to-End-Tests
- [x] Unit-Tests
- [ ] Manuelle Abnahmetests

*Erklärung:* Sie sind schnell, zahlreich und lokalisieren Fehler präzise.

**2. Wozu dienen Regressionstests?**

- [ ] Neue Funktionen zu spezifizieren
- [x] Sicherzustellen, dass bisher funktionierende Teile nach Änderungen weiter funktionieren
- [ ] Die Performance zu messen

*Erklärung:* Sie schützen den bereits erreichten Stand gegen unbeabsichtigte Nebenwirkungen.
