# Virtuelle Elemente & CDS Table Functions

*Core Data Services – Expertenwissen · ca. 8 Min.*

**Virtuelle Elemente** (`@ObjectModel.virtualElement`, berechnet über eine Klasse mit `IF_SADL_EXIT`\-Interface) fügen Felder hinzu, die NICHT aus der Datenbank kommen, sondern zur Laufzeit berechnet werden — für Logik, die sich nicht in CDS-Ausdrücken abbilden lässt.

**CDS Table Functions** gehen weiter: die komplette Datenbeschaffung läuft über eine AMDP-Methode statt über `select from` — für Fälle, in denen selbst Assoziationen und Ausdrücke nicht ausreichen.

```abap
define table function ZI_TopCustomersFunction
  returns { customer_id : abap.char(10); revenue : abap.dec(13,2); }
  implemented by method zcl_amdp_example=>get_top_customers;
```

> **Tipp:** Virtuelle Elemente und Table Functions sind Ausnahmewerkzeuge — wer sie routinemäßig statt einfacher Assoziationen/Ausdrücke einsetzt, verlässt meist unnötig den deklarativen, optimierbaren CDS-Pfad zugunsten von prozeduraler Logik, die der Datenbank-Optimizer nicht mehr durchschauen kann.

## Kontrollfragen

**1. Woher stammen die Werte eines virtuellen Elements?**

- [ ] Direkt aus der Datenbanktabelle
- [x] Aus einer zur Laufzeit ausgeführten Berechnung (Klasse)
- [ ] Aus einem Cache im Frontend

*Erklärung:* Virtuelle Elemente werden über eine Exit-Klasse berechnet, nicht per SELECT geladen.

**2. Wodurch wird eine CDS Table Function implementiert?**

- [x] Durch eine AMDP-Methode
- [ ] Durch ein klassisches SELECT-Statement
- [ ] Durch eine Behavior Definition

*Erklärung:* Table Functions delegieren die Datenbeschaffung vollständig an eine AMDP-Methode.
