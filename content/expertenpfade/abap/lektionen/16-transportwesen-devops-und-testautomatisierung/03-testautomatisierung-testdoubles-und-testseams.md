# Testautomatisierung: Testdoubles & Testseams

*Transportwesen, DevOps & Testautomatisierung · ca. 7 Min.*

**Test Doubles** (Oberbegriff für Stubs, Mocks, Fakes) ersetzen echte Abhängigkeiten in Tests. ABAP Unit unterstützt dies über `CL_ABAP_TESTDOUBLE` sowie **Testseams** (`TEST-SEAM`/`TEST-INJECTION`) zum gezielten Ersetzen von Codeabschnitten im Test, ohne Produktivcode umzubauen.

```abap
DATA(lo_double) = cl_abap_testdouble=>create( 'if_pricing_strategy' ).
cl_abap_testdouble=>configure_call( lo_double )->returning( 100 ).
lo_double->calculate( order ).
```

> **Tipp:** Testseams sind ein pragmatisches Werkzeug für Legacy-Code, der noch nicht auf Dependency Injection umgestellt wurde — sie erlauben gezieltes Ersetzen einzelner Codeblöcke im Test, ohne die Architektur vorher aufwändig umzubauen. Für neuen Code bleibt echte Dependency Injection die sauberere Lösung.

## Kontrollfragen

**1. Wozu dient CL_ABAP_TESTDOUBLE?**

- [x] Erzeugt generische Test Doubles für Interfaces in ABAP-Unit-Tests
- [ ] Kompiliert ABAP-Code
- [ ] Verwaltet Transportaufträge

*Erklärung:* Es erlaubt, Interface-Implementierungen für Tests dynamisch zu simulieren.

**2. Wofür sind Testseams besonders nützlich?**

- [x] Gezieltes Ersetzen von Codeabschnitten im Test bei Legacy-Code ohne Dependency Injection
- [ ] Für die Produktivauslieferung von Code
- [ ] Für die UI-Gestaltung

*Erklärung:* Testseams erlauben Testbarkeit, ohne bestehenden Code architektonisch umzubauen.
