# Entwurfsmuster in ABAP: Strategy, Factory, Singleton, Observer

*ABAP Objects & Entwurfsmuster · ca. 10 Min.*

**Strategy** — austauschbares Verhalten hinter einem gemeinsamen Interface, zur Laufzeit ausgewählt:

```abap
INTERFACES if_pricing_strategy.

DATA(lo_strategy) = COND #( WHEN customer_type = 'VIP'
                             THEN NEW zcl_vip_pricing( )
                             ELSE NEW zcl_standard_pricing( ) ).
DATA(price) = lo_strategy->calculate( order ).
```

**Factory** kapselt Objekterzeugung — der Aufrufer kennt nur das Interface, nicht die konkrete Klasse. **Singleton** stellt genau eine Instanz sicher, typischerweise über eine statische Instanzvariable (`CLASS-DATA`) und eine öffentliche statische `GET_INSTANCE`\-Methode mit privatem Konstruktor. **Observer** (Publisher-Subscriber) wird in ABAP klassisch über Events umgesetzt (`RAISE EVENT` / `SET HANDLER`).

> **Tipp:** In modernem ABAP übernimmt das RAP-Framework selbst viele klassische Muster implizit — Strategy über Behavior-Implementierungen, Observer über Determinations. Musterkenntnis hilft trotzdem zu verstehen, WARUM das Framework so aufgebaut ist, wie es ist.

## Kontrollfragen

**1. Welches Muster kapselt austauschbares Verhalten hinter einem gemeinsamen Interface?**

- [ ] Singleton
- [x] Strategy
- [ ] Observer

*Erklärung:* Strategy macht konkrete Algorithmen austauschbar, solange sie dasselbe Interface implementieren.

**2. Wie wird ein Singleton in ABAP typischerweise umgesetzt?**

- [ ] Über eine globale interne Tabelle
- [x] Über eine statische Instanzvariable und eine statische GET_INSTANCE-Methode mit privatem Konstruktor
- [ ] Über ein BAdI

*Erklärung:* Der private Konstruktor verhindert externe Instanziierung, GET_INSTANCE liefert immer dieselbe Instanz.
