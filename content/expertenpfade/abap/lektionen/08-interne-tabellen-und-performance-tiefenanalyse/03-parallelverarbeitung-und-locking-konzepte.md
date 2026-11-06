# Parallelverarbeitung & Locking-Konzepte

*Interne Tabellen & Performance-Tiefenanalyse · ca. 7 Min.*

Für Massendatenverarbeitung bietet ABAP **asynchrone RFCs** (`CALL FUNCTION ... STARTING NEW TASK`) zur Parallelisierung unabhängiger Verarbeitungsschritte über mehrere Arbeitsprozesse.

Das **Enqueue/Dequeue-Konzept** (Sperrbausteine bzw. „lock master" in RAP) verhindert, dass mehrere Nutzer gleichzeitig denselben Datensatz inkonsistent ändern — eine logische, anwendungsseitige Sperre, unabhängig von Datenbank-Transaktionssperren.

> **Tipp:** Enqueue-Sperren sind KEINE Datenbank-Transaktionssperren — sie werden explizit vom Enqueue-Server verwaltet und bleiben bestehen, bis sie freigegeben werden oder das Zeitlimit abläuft. Ein vergessenes DEQUEUE ist ein klassischer Grund für „Objekt ist gesperrt"-Fehler in Produktivsystemen.

## Kontrollfragen

**1. Wozu dient das Enqueue-Konzept?**

- [x] Verhindert, dass mehrere Nutzer denselben Datensatz gleichzeitig inkonsistent ändern
- [ ] Beschleunigt SELECT-Zugriffe
- [ ] Verschlüsselt sensible Felder

*Erklärung:* Enqueue ist eine logische, anwendungsseitige Sperre für konsistenten Mehrbenutzerzugriff.

**2. Womit lässt sich Massendatenverarbeitung in ABAP parallelisieren?**

- [ ] SORT itab
- [x] Asynchrone RFCs (CALL FUNCTION ... STARTING NEW TASK)
- [ ] LOOP AT ... GROUP BY

*Erklärung:* Asynchrone RFCs verteilen unabhängige Arbeitspakete auf mehrere Arbeitsprozesse.
