# Value Helps & Filterlogik im Detail

*Fiori Elements & UI-Erweiterbarkeit · ca. 7 Min.*

**Value Helps** entstehen aus Assoziationen zu einer weiteren CDS-View kombiniert mit `@Consumption.valueHelpDefinition`. `@Consumption.filter`\-Annotationen steuern das Verhalten von Filterfeldern (Pflichtfilter, versteckte Standardwerte, Mehrfachselektion).

```abap
@Consumption.valueHelpDefinition: [{ entity: { name: 'ZI_CustomerVH', element: 'CustomerId' } }]
customer_id;
```

> **Tipp:** Schlecht konfigurierte Value Helps (fehlende Filter, zu große Ergebnismengen) sind einer der häufigsten Gründe für "die App fühlt sich langsam an"-Beschwerden von Endanwendern — technisch oft trivial zu beheben, aber leicht zu übersehen.

## Kontrollfragen

**1. Worauf basiert ein Value Help typischerweise?**

- [x] Eine Assoziation zu einer weiteren CDS-View kombiniert mit @Consumption.valueHelpDefinition
- [ ] Ein fest kodiertes JavaScript-Array
- [ ] Eine Excel-Datei

*Erklärung:* Value Helps sind deklarativ über Assoziationen und Annotationen modelliert.

**2. Was können @Consumption.filter-Annotationen steuern?**

- [x] Verhalten von Filterfeldern, z.B. Pflichtfilter oder Mehrfachselektion
- [ ] Die Farbe der Buttons
- [ ] Die Datenbankverbindung

*Erklärung:* Diese Annotationen steuern, wie Filterfelder sich in der Filterleiste verhalten.
