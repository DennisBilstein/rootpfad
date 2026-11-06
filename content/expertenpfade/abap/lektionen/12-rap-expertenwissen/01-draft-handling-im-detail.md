# Draft-Handling im Detail

*RAP Expertenwissen · ca. 8 Min.*

Draft-fähige RAP-Objekte speichern Zwischenstände in einer separaten **Draft-Tabelle** (`with draft; draft table ...`), bevor sie final gesichert werden — Grundlage für Fiori Elements’ „Bearbeiten"-Modus mit Zwischenspeichern-Funktion.

**Early Numbering** vergibt Schlüsselwerte sofort bei create, **Late Numbering** erst beim finalen Speichern — relevant, wenn der Schlüssel (z. B. eine Belegnummer) erst final feststehen darf.

```abap
define behavior for ZI_Order alias Order
persistent table zorder
draft table zorder_d
with draft
...
{
  ...
  mapping for zorder corresponding;
}
```

> **Tipp:** Late Numbering wirkt zunächst wie unnötige Komplexität, ist aber oft die einzig saubere Lösung, wenn der Schlüssel erst final beim Sichern feststehen darf — typischerweise aus Compliance-Gründen (lückenlose Nummerierung).

## Kontrollfragen

**1. Wozu dient die Draft-Tabelle?**

- [x] Speichert Zwischenstände vor dem finalen Sichern, Basis für den Bearbeiten-Modus
- [ ] Ersetzt die produktive Datenbanktabelle komplett
- [ ] Speichert nur gelöschte Datensätze

*Erklärung:* Die Draft-Tabelle hält unfertige Änderungen, bis der Nutzer final speichert.

**2. Wann wird bei "Late Numbering" der Schlüssel vergeben?**

- [ ] Sofort bei create
- [x] Erst beim finalen Speichern
- [ ] Beim Löschen des Drafts

*Erklärung:* Late Numbering verzögert die Schlüsselvergabe bis zum tatsächlichen Save-Vorgang.
