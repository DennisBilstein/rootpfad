# Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse

*Testtheorie & Qualitätssicherung · ca. 8 Min.*

**White-Box-Tests** kennen den internen Code (z. B. Zweigüberdeckung/Branch Coverage). **Black-Box-Tests** kennen nur Ein-/Ausgabe, nicht die Implementierung.

**Äquivalenzklassenbildung** reduziert Testfälle: Eingabewerte mit gleichem erwarteten Verhalten werden gruppiert, ein Vertreter je Klasse reicht. **Grenzwertanalyse** testet gezielt an den Rändern der Klassen — Fehler häufen sich erfahrungsgemäß genau dort.

**Beispiel:** Gültiger Eingabebereich 1–100 → Klassen: <1 (ungültig), 1–100 (gültig), >100 (ungültig). Grenzwerte zum Testen: 0, 1, 100, 101.

> **Tipp:** Die Kombination aus Äquivalenzklassen (repräsentative Werte je Klasse) und Grenzwertanalyse (Ränder jeder Klasse) ist die effizienteste Methode, um mit minimaler Testfallzahl maximale Fehlerabdeckung zu erreichen — das ist auch in der Praxis, nicht nur der Prüfung, der Standardansatz.

## Kontrollfragen

**1. Was testet die Grenzwertanalyse gezielt?**

- [ ] Zufällige Werte innerhalb einer Klasse
- [x] Werte an den Rändern von Äquivalenzklassen
- [ ] Nur ungültige Eingaben

*Erklärung:* Fehler häufen sich an den Grenzen gültiger Bereiche — genau dort setzt die Grenzwertanalyse an.

**2. Was ist ein Merkmal von White-Box-Tests?**

- [x] Kenntnis der internen Codestruktur
- [ ] Vollständige Unkenntnis der Implementierung
- [ ] Nur manuelle Tests ohne Automatisierung

*Erklärung:* White-Box-Tests nutzen Wissen über den internen Aufbau, z. B. um Zweigüberdeckung zu messen.
