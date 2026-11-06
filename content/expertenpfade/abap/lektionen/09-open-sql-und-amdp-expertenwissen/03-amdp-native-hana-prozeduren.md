# AMDP: Native HANA-Prozeduren

*Open SQL & AMDP Expertenwissen · ca. 8 Min.*

**ABAP Managed Database Procedures (AMDP)** erlauben es, Methoden direkt in SQLScript (HANA-nativer SQL-Dialekt) zu implementieren — für Fälle, in denen selbst optimiertes Open SQL/CDS nicht ausreicht (z. B. komplexe iterative Algorithmen, die sich schlecht in Mengenlogik ausdrücken lassen). Die Klasse muss das Marker-Interface `IF_AMDP_MARKER_HDB` implementieren.

```abap
CLASS zcl_amdp_example DEFINITION PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_amdp_marker_hdb.
    CLASS-METHODS get_top_customers
      IMPORTING iv_limit TYPE i
      EXPORTING et_result TYPE ty_customer_tab.
ENDCLASS.

CLASS zcl_amdp_example IMPLEMENTATION.
  METHOD get_top_customers BY DATABASE PROCEDURE FOR HDB LANGUAGE SQLSCRIPT
    OPTIONS READ-ONLY USING zcustomer.
    et_result = SELECT TOP :iv_limit * FROM zcustomer ORDER BY revenue DESCENDING;
  ENDMETHOD.
ENDCLASS.
```

> **Tipp:** AMDP ist bewusst der letzte Schritt der Eskalationsleiter: erst Open SQL, dann CDS, erst wenn beides an Grenzen stößt, kommt AMDP infrage. Der Preis: Datenbankabhängigkeit (nur HANA) und eingeschränkte Portabilität — in ABAP Cloud entsprechend restriktiv gehandhabt.

## Kontrollfragen

**1. Welches Marker-Interface muss eine AMDP-Klasse implementieren?**

- [x] IF_AMDP_MARKER_HDB
- [ ] IF_BADI_INTERFACE
- [ ] IF_SERIALIZABLE_OBJECT

*Erklärung:* IF_AMDP_MARKER_HDB kennzeichnet eine Klasse als AMDP-fähig für die SAP-HANA-Datenbank.

**2. Wann ist AMDP der richtige Ansatz?**

- [ ] Immer, für maximale Performance
- [x] Erst wenn Open SQL und CDS für die Anforderung nicht ausreichen
- [ ] Nur für Berechtigungsprüfungen

*Erklärung:* AMDP ist die letzte Eskalationsstufe für Fälle, die sich deklarativ nicht mehr sauber lösen lassen.
