# Performance-Monitoring im Betrieb

*Security & Performance im Betrieb · ca. 6 Min.*

Über SAT hinaus gehören zum produktiven Monitoring: **ST22** (Dump-Analyse bei Laufzeitfehlern), **ST05** (SQL-Trace), **STAD** (Workload-Analyse über viele Programmläufe zur Identifikation systemweiter Hotspots, nicht nur eines einzelnen Laufs). In der Cloud/BTP-Umgebung übernehmen zunehmend zentrale Observability-Werkzeuge (z. B. SAP Cloud ALM) diese Rolle systemübergreifend.

> **Tipp:** Der Unterschied zwischen SAT und STAD/Workload-Analyse ist entscheidend: SAT analysiert EINEN konkreten Programmlauf im Detail, STAD zeigt AGGREGIERTE Muster über viele Ausführungen — für "welches Programm belastet das System insgesamt am meisten" ist Workload-Analyse das richtige Werkzeug, nicht SAT.

## Kontrollfragen

**1. Wofür wird ST22 genutzt?**

- [x] Analyse von Laufzeitfehlern (Dumps)
- [ ] Pflege von Übersetzungstexten
- [ ] Verwaltung von Transportaufträgen

*Erklärung:* ST22 zeigt Details zu abgestürzten Programmläufen (ABAP-Dumps).

**2. Was zeigt eine Workload-Analyse (STAD) im Unterschied zu SAT?**

- [x] Aggregierte Belastungsmuster über viele Programmläufe hinweg
- [ ] Nur den Quellcode eines Programms
- [ ] Die Benutzeroberfläche einer App

*Erklärung:* STAD aggregiert über viele Ausführungen, SAT analysiert einen einzelnen Lauf im Detail.
