# Black-Box, White-Box, Äquivalenzklassen, Grenzwerte

*Testtheorie & Qualitätssicherung · ca. 8 Min.*

**White-Box-Tests** kennen den Code und messen z. B. Zweigüberdeckung. **Black-Box-Tests** kennen nur Ein- und Ausgabe.

**Äquivalenzklassenbildung:** Eingaben mit gleichem erwarteten Verhalten werden gruppiert, ein Vertreter je Klasse genügt. **Grenzwertanalyse:** zusätzlich die Ränder testen, weil sich dort Fehler häufen.

**Beispiel** — gültiger Bereich 18 bis 65: Klassen sind <18 (ungültig), 18–65 (gültig), >65 (ungültig). Grenzwerte: 17, 18, 65, 66.

> **Tipp:** Die Kombination aus Äquivalenzklassen und Grenzwertanalyse ist das effizienteste Verfahren überhaupt: minimale Testfallzahl bei maximaler Fehlerabdeckung. Genau deshalb steht es in jeder Prüfung — und wird trotzdem in echten Projekten ständig übersprungen.

## Kontrollfragen

**1. Was prüft die Grenzwertanalyse?**

- [ ] Werte in der Mitte jeder Klasse
- [x] Werte direkt an den Klassenrändern
- [ ] Nur ungültige Eingaben

*Erklärung:* An den Bereichsgrenzen treten Vergleichsfehler wie < statt <= am häufigsten auf.

**2. Was kennzeichnet einen White-Box-Test?**

- [x] Kenntnis der internen Codestruktur
- [ ] Ausschließlich manuelle Durchführung
- [ ] Verzicht auf Testdaten

*Erklärung:* Nur mit Codekenntnis lassen sich Überdeckungsmaße wie Zweigüberdeckung bestimmen.
