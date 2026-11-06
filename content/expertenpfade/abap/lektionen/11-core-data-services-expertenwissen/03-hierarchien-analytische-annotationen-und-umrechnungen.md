# Hierarchien, analytische Annotationen & Umrechnungen

*Core Data Services – Expertenwissen · ca. 7 Min.*

CDS unterstützt hierarchische Datenstrukturen (z. B. Kontenpläne). Analytische Annotationen (`@Analytics.query: true`, `@Aggregation.default: #SUM`) bereiten eine View für Reporting-Werkzeuge vor. Eingebaute Funktionen für Währungs- und Einheitenumrechnung verlagern auch diese fachliche Logik konsequent in die Datenbankschicht.

```abap
@Semantics.amount.currencyCode: 'currency'
amount_in_target_currency :
  currency_conversion( amount             => amount,
                        source_currency    => currency,
                        target_currency    => 'EUR',
                        exchange_rate_date => $parameters.key_date ) as amount_eur
```

> **Tipp:** currency\_conversion() ist ein gutes Beispiel dafür, wie viel fachliche Komplexität (Kursdatum, Rundungsregeln, Kurstabellen) hinter einer scheinbar einfachen CDS-Funktion steckt — selbst geschrieben wäre das ein eigenes kleines Subsystem.

## Kontrollfragen

**1. Wofür steht @Aggregation.default: #SUM?**

- [x] Definiert die Standard-Aggregationsart eines Feldes für analytische Konsumenten
- [ ] Erzwingt eine Summe im WHERE-Teil
- [ ] Verhindert Aggregation komplett

*Erklärung:* Die Annotation gibt Reporting-Tools vor, wie ein Feld standardmäßig aggregiert werden soll.

**2. Was übernimmt die eingebaute Funktion currency_conversion()?**

- [ ] Nur die reine Multiplikation zweier Zahlen
- [x] Fachlich korrekte Währungsumrechnung direkt in der CDS-View, inkl. Kursdatum-Logik
- [ ] Die Formatierung von Datumsfeldern

*Erklärung:* Sie kapselt komplexe Umrechnungslogik (Kurstabellen, Stichtag) deklarativ in der View.
