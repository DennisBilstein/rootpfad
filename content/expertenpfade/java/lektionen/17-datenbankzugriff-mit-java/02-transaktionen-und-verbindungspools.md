# Transaktionen und Verbindungspools

*Datenbankzugriff mit Java · ca. 8 Min.*

Eine **Transaktion** fasst mehrere Anweisungen zu einer unteilbaren Einheit zusammen — sie erfüllt die **ACID**\-Eigenschaften: Atomarität, Konsistenz, Isolation, Dauerhaftigkeit.

JDBC arbeitet standardmäßig im **Autocommit**\-Modus: Jede Anweisung wird sofort festgeschrieben. Für zusammengehörige Änderungen musst du das abschalten und selbst committen — oder rollbacken.

Verbindungen sind teuer. In jeder ernsthaften Anwendung übernimmt ein **Connection Pool** (Standard: **HikariCP**) die Wiederverwendung.

```java
try (Connection con = dataSource.getConnection()) {
    con.setAutoCommit(false);                 // Transaktion beginnt
    try {
        belasteKonto(con, von, betrag);
        schreibeGut(con, nach, betrag);
        con.commit();                         // beides oder nichts
    } catch (SQLException e) {
        con.rollback();
        throw new UeberweisungFehlgeschlagen("Übertrag abgebrochen", e);
    }
}
```

> **Tipp:** Die Überweisung ist das Lehrbuchbeispiel, aber der Praxisfehler sieht anders aus: Ein Entwickler ruft in einer Schleife über 500 Positionen jedes Mal commit() auf. Bricht der Lauf bei Position 300 ab, sind 300 Datensätze geschrieben und 200 fehlen — ein Zustand, den die Fachabteilung von Hand aufräumen darf. Die Transaktionsgrenze gehört um die fachliche Einheit, nicht um die technische Einzelanweisung.

## Kontrollfragen

**1. Wofür steht ACID?**

- [x] Atomicity, Consistency, Isolation, Durability
- [ ] Access, Control, Index, Data
- [ ] Async, Cache, Init, Deploy

*Erklärung:* Die vier Garantien, die eine Transaktion einer Datenbank abverlangt.

**2. Was passiert bei eingeschaltetem Autocommit?**

- [ ] Nichts wird gespeichert
- [x] Jede einzelne Anweisung wird sofort festgeschrieben
- [ ] Alles wird erst beim Schließen geschrieben

*Erklärung:* Für mehrteilige fachliche Einheiten muss Autocommit deshalb abgeschaltet werden.
