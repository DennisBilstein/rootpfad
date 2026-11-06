# Extend Views & Erweiterbarkeit von Standard-Views

*Core Data Services – Expertenwissen · ca. 7 Min.*

Mit `define extend view` lassen sich zusätzliche Felder oder Assoziationen zu einer bestehenden (auch SAP-Standard-)CDS-View hinzufügen, ohne die Basis-View selbst zu ändern — das CDS-Pendant zu Custom Fields auf Datenbankebene. In ABAP Cloud ist diese Erweiterbarkeit nur für explizit dafür freigegebene **Extension Points** möglich.

```abap
extend view ZI_CustomerOverview with ZI_CustomerOverview_Ext
{
  loyalty_score
}
```

> **Tipp:** Der entscheidende Unterschied zu einer Kopie der Standard-View: Extend Views bleiben bei SAP-Updates automatisch konsistent, weil sie strukturell an die Basis-View gebunden sind, statt sie zu duplizieren — genau das Prinzip, das S/4HANA-Upgrades überhaupt erst zumutbar macht.

## Kontrollfragen

**1. Wofür dient define extend view?**

- [x] Erweitert eine bestehende CDS-View um zusätzliche Felder/Assoziationen, ohne sie zu verändern
- [ ] Erstellt eine komplett neue, unabhängige Tabelle
- [ ] Löscht Felder aus einer View

*Erklärung:* Extend Views hängen strukturell an der Basis-View und bleiben upgradesicher.

**2. Was ist Voraussetzung für Extend Views in ABAP Cloud?**

- [ ] Ein Entwickler-Key
- [x] Ein explizit dafür freigegebener (released) Extension Point
- [ ] Keine, es funktioniert immer

*Erklärung:* Nur explizit freigegebene Extension Points dürfen im ABAP-Cloud-Modell erweitert werden.
