# SQL-Performance: Ausführungspläne & Table Buffering

*Open SQL & AMDP Expertenwissen · ca. 8 Min.*

Der **Datenbank-Optimizer** entscheidet anhand von Statistiken, wie eine Abfrage ausgeführt wird (Ausführungsplan) — z. B. ob ein Index genutzt wird. **Table Buffering** hält häufig gelesene, selten geänderte Tabellen im Applikationsserver-Speicher, um Datenbankzugriffe ganz zu vermeiden — allerdings nur für vollständig gepufferte Zugriffe.

> **Tipp:** Ein häufig übersehener Effekt: sobald eine WHERE-Bedingung ein Feld nutzt, das nicht Teil des Pufferschlüssels ist, wird der Puffer komplett umgangen ("Buffer Bypass") und jede Anfrage geht wieder live gegen die Datenbank — ein klassischer, schwer zu findender Performance-Regressionsfehler.

## Kontrollfragen

**1. Was entscheidet der Datenbank-Optimizer?**

- [x] Wie eine Abfrage tatsächlich ausgeführt wird, anhand von Statistiken
- [ ] Welche Berechtigungen ein Nutzer hat
- [ ] Die Sprache der Fehlermeldungen

*Erklärung:* Der Optimizer wählt z.B. Indexnutzung und Join-Reihenfolge basierend auf Tabellenstatistiken.

**2. Was passiert bei Zugriff auf ein nicht gepuffertes Feld einer gepufferten Tabelle?**

- [ ] Der Zugriff wird blockiert
- [x] Buffer Bypass: der Puffer wird umgangen, es wird live gegen die Datenbank gelesen
- [ ] Die Tabelle wird automatisch neu gepuffert

*Erklärung:* Ohne den Pufferschlüssel in der WHERE-Bedingung kann der Puffer nicht genutzt werden.
