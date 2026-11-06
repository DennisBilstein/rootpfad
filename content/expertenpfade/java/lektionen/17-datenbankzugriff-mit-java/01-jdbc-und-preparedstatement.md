# JDBC und PreparedStatement

*Datenbankzugriff mit Java · ca. 9 Min.*

**JDBC** ist Javas Standardschnittstelle zur Datenbank. Die zentrale Sicherheitsregel lautet: **niemals** Benutzereingaben in SQL-Strings zusammensetzen — immer `PreparedStatement` mit Platzhaltern.

Ein `PreparedStatement` ist nicht nur sicher gegen **SQL-Injection**, sondern meist auch schneller, weil die Datenbank den Ausführungsplan wiederverwenden kann.

```java
// GEFÄHRLICH: SQL-Injection möglich
String sql = "SELECT * FROM kunde WHERE name = '" + eingabe + "'";
// Eingabe:  ' OR '1'='1   -> liefert die gesamte Tabelle

// SICHER: Parameter werden als Daten behandelt, nie als Code
String sql = "SELECT id, name FROM kunde WHERE name = ? AND aktiv = ?";
try (Connection con = dataSource.getConnection();
     PreparedStatement ps = con.prepareStatement(sql)) {

    ps.setString(1, eingabe);
    ps.setBoolean(2, true);

    try (ResultSet rs = ps.executeQuery()) {
        List<Kunde> treffer = new ArrayList<>();
        while (rs.next()) {
            treffer.add(new Kunde(rs.getLong("id"), rs.getString("name")));
        }
        return treffer;
    }
}
```

> **Tipp:** Der entscheidende Punkt ist nicht „PreparedStatement ist sicherer", sondern warum: Es trennt Code von Daten. Die SQL-Struktur wird einmal geparst, der Parameter danach eingesetzt — er kann die Abfragelogik gar nicht mehr verändern, egal welche Zeichen er enthält. Dieselbe Trennung gilt in jeder Sprache und für jede Abfragesprache, auch für LDAP oder Shell-Aufrufe.

## Kontrollfragen

**1. Warum schützt PreparedStatement vor SQL-Injection?**

- [ ] Es entfernt Sonderzeichen
- [x] Es trennt SQL-Struktur von Daten, Parameter können die Abfragelogik nicht verändern
- [ ] Es verschlüsselt die Abfrage

*Erklärung:* Die Abfrage wird geparst, bevor die Parameter eingesetzt werden.

**2. Was gehört bei JDBC zwingend in try-with-resources?**

- [ ] Nur die Connection
- [x] Connection, Statement und ResultSet
- [ ] Nichts davon

*Erklärung:* Alle drei halten Systemressourcen und müssen sicher geschlossen werden.
