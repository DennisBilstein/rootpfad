# Unmanaged & Mixed Scenarios: die Saver Class

*RAP Expertenwissen · ca. 9 Min.*

Bei **Unmanaged RAP** übernimmt eine eigene **Saver-Klasse** (Vererbung von `CL_ABAP_BEHAVIOR_SAVER`) die vollständige Kontrolle über den Speichervorgang — relevant z. B. beim Wrappen bestehender BAPIs mit eigener Transaktionslogik. Zentrale Methoden: `FINALIZE`, `CHECK_BEFORE_SAVE`, `SAVE`, `CLEANUP`.

```abap
CLASS zbp_saver_order DEFINITION PUBLIC INHERITING FROM cl_abap_behavior_saver.
  PROTECTED SECTION.
    METHODS save_modified REDEFINITION.
ENDCLASS.

CLASS zbp_saver_order IMPLEMENTATION.
  METHOD save_modified.
    LOOP AT create-order INTO DATA(new_order).
      CALL FUNCTION 'BAPI_ORDER_CREATE'
        EXPORTING order_data = new_order-%data.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.
```

> **Tipp:** Mixed Scenarios (managed CRUD kombiniert mit unmanaged Save-Feinsteuerung) sind ein realistischer Zwischenschritt, wenn ein bestehendes BAPI-lastiges System schrittweise auf RAP migriert wird, statt alles auf einmal neu zu schreiben.

## Kontrollfragen

**1. Wovon erbt eine RAP-Saver-Klasse?**

- [x] CL_ABAP_BEHAVIOR_SAVER
- [ ] CX_ROOT
- [ ] IF_AMDP_MARKER_HDB

*Erklärung:* CL_ABAP_BEHAVIOR_SAVER ist die Basisklasse für eigene Save-Sequenz-Steuerung im Unmanaged RAP.

**2. Wann ist eine eigene Saver-Klasse typischerweise nötig?**

- [ ] Bei Managed RAP mit Standard-CRUD
- [x] Bei Unmanaged RAP, z.B. beim Wrappen bestehender BAPIs
- [ ] Nie, RAP übernimmt das immer automatisch

*Erklärung:* Unmanaged RAP verlangt explizite Kontrolle über den Speichervorgang, meist wegen bestehender BAPI-Logik.
