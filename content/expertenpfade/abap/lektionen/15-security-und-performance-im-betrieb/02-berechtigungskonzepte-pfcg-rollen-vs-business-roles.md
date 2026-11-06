# Berechtigungskonzepte: PFCG-Rollen vs. Business Roles

*Security & Performance im Betrieb · ca. 6 Min.*

Klassisch: **PFCG-Rollen** bündeln Berechtigungsobjekte mit konkreten Werten; Prüfung im Code über `AUTHORITY-CHECK`. Im ABAP-Cloud/RAP-Kontext übernehmen **Business Roles** (mit zugeordneten Business Catalogs/Apps) eine vergleichbare Rolle für den Fiori-Launchpad-Zugriff, während die fachliche Berechtigungsprüfung selbst weiterhin über klassische Berechtigungsobjekte bzw. RAP-eigene `authorization`\-Klauseln läuft.

> **Tipp:** Ein häufiges Missverständnis: Business Roles im Fiori Launchpad steuern primär den ZUGRIFF auf Apps/Kacheln — die eigentliche FACHLICHE Berechtigungslogik (darf dieser Nutzer DIESEN Datensatz sehen/ändern) läuft weiterhin über klassische Berechtigungsobjekte bzw. die authorization-Klausel der RAP-Behavior-Definition.

## Kontrollfragen

**1. Was steuern Business Roles im Fiori Launchpad primär?**

- [x] Zugriff auf Apps/Kacheln (Business Catalogs)
- [ ] Die Datenbankverschlüsselung
- [ ] Die Netzwerkbandbreite

*Erklärung:* Business Roles bestimmen, welche Apps ein Nutzer im Launchpad sieht.

**2. Wo wird die fachliche Berechtigungsprüfung (welcher Datensatz) in RAP definiert?**

- [x] In der authorization-Klausel der Behavior Definition
- [ ] Im Fiori Launchpad Designer
- [ ] Im HTML-Code der App

*Erklärung:* Die authorization-Klausel steuert instanzbezogene Berechtigungsprüfung direkt im Business Object.
