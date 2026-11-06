# Dynamisches Programmieren: Feldsymbole, Datenreferenzen, RTTI

*Syntax, Typsystem & moderne Sprachkonstrukte · ca. 8 Min.*

**Feldsymbole** (`FIELD-SYMBOLS`) sind typisierte Platzhalter, die zur Laufzeit einem konkreten Datenobjekt zugewiesen werden (`ASSIGN`) — vergleichbar mit „sicheren Pointern". **Datenreferenzen** (`TYPE REF TO DATA`) erlauben generische, zur Compile-Zeit unbekannte Datentypen.

**RTTI** (Run Time Type Identification, über `CL_ABAP_TYPEDESCR` und Subklassen) erlaubt es, Typinformationen zur Laufzeit zu inspizieren — Grundlage für generischen, wiederverwendbaren Code.

```abap
DATA(lo_type) = cl_abap_typedescr=>describe_by_data( customer ).
IF lo_type->kind = cl_abap_typedescr=>kind_struct.
  " generisch mit Strukturen arbeiten
ENDIF.
```

> **Tipp:** Dynamische Programmierung ist mächtig, aber ein zweischneidiges Schwert: sie erkauft Flexibilität mit Typsicherheit und Lesbarkeit zur Compile-Zeit. Erfahrene Entwickler greifen bewusst dazu — für generische Frameworks, Mapping-Logik, Testwerkzeuge — nicht als Standardwerkzeug im fachlichen Code.

## Kontrollfragen

**1. Wozu dient RTTI?**

- [x] Typinformationen zur Laufzeit inspizieren
- [ ] Datenbanktransaktionen verwalten
- [ ] Fehler abfangen

*Erklärung:* CL_ABAP_TYPEDESCR und Subklassen liefern zur Laufzeit Informationen über Typ, Komponenten und Struktur eines Datenobjekts.

**2. Was ist ein Feldsymbol?**

- [ ] Ein Kommentarzeichen
- [x] Ein typisierter Platzhalter, der zur Laufzeit einem Datenobjekt zugewiesen wird
- [ ] Ein reservierter ABAP-Schlüsselwort-Typ

*Erklärung:* Feldsymbole referenzieren Speicherbereiche, ohne selbst eigenen Speicher zu belegen.
