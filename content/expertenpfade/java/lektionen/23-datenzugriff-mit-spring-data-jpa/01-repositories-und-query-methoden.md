# Repositories und Query-Methoden

*Datenzugriff mit Spring Data JPA · ca. 9 Min.*

Spring Data erzeugt die Implementierung eines Repository-Interfaces zur Laufzeit. Du deklarierst nur die Signatur — aus dem Methodennamen wird die Abfrage abgeleitet.

-   `findByNachnameAndOrt(String n, String o)` → WHERE nachname = ? AND ort = ?
-   `findByBetragGreaterThanOrderByDatumDesc(BigDecimal b)` → mit Vergleich und Sortierung
-   `existsByEmail(String email)`, `countByStatus(Status s)`, `deleteByStatus(Status s)`

Wird der Name unleserlich lang, ist das ein Signal: Dann gehört die Abfrage in ein `@Query` mit JPQL — benannt nach der Fachlichkeit, nicht nach der Bedingung.

```java
public interface BestellRepository extends JpaRepository<Bestellung, Long> {

    List<Bestellung> findByStatusOrderByDatumDesc(Status status);

    Optional<Bestellung> findByNummer(String nummer);

    boolean existsByKundeNrAndStatus(String kundeNr, Status status);

    @Query("""
           SELECT b FROM Bestellung b
           WHERE b.datum >= :ab AND b.summe > :mindest
           ORDER BY b.summe DESC
           """)
    List<Bestellung> findeGrossauftraege(@Param("ab") LocalDate ab,
                                          @Param("mindest") BigDecimal mindest);
}
```

> **Tipp:** Nutze konsequent Optional als Rückgabetyp für Einzeltreffer und niemals null (Modul 11). Und ein Detail mit Sprengkraft: findAll() ohne Pageable lädt die gesamte Tabelle in den Speicher. Mit 200 Testdatensätzen fällt das nie auf, mit zwei Millionen Produktivzeilen killt es die Anwendung. Für alles, was wachsen kann, gilt: paginieren.

## Kontrollfragen

**1. Wie entsteht die Implementierung eines Spring-Data-Repositorys?**

- [x] Sie wird generiert und zur Laufzeit bereitgestellt
- [ ] Man schreibt sie selbst
- [ ] Sie wird vom Compiler erzeugt

*Erklärung:* Spring Data leitet die Abfrage aus dem Methodennamen oder der @Query-Annotation ab.

**2. Was ist an findAll() ohne Paginierung riskant?**

- [ ] Es ist zu langsam beim Kompilieren
- [x] Es lädt die gesamte Tabelle in den Speicher
- [ ] Es funktioniert nur mit H2

*Erklärung:* Bei wachsenden Datenmengen ist das ein Ausfallrisiko.
