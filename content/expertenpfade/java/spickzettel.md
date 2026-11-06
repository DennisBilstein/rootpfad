# Spickzettel – Java Expertenpfad

## Pseudocode-Konventionen (AP1)

| Konzept | Notation |
| --- | --- |
| Zuweisung | <- oder := |
| Verzweigung | IF ... THEN ... ELSE ... ENDIF |
| Zählschleife | FOR i <- 1 TO n DO ... ENDFOR |
| Kopfgesteuert | WHILE ... DO ... ENDWHILE |
| Fußgesteuert | REPEAT ... UNTIL |
| Funktion | FUNCTION name(p) ... RETURN wert ENDFUNCTION |

Kein einheitlicher Standard — das Syntax-Beiblatt der Prüfung ist maßgeblich. Die Logik zählt mehr als die Schreibweise.

## Komplexität & Collections

| Struktur | Zugriff | Suche | Einfügen |
| --- | --- | --- | --- |
| ArrayList | O(1) | O(n) | O(1) am Ende |
| LinkedList | O(n) | O(n) | O(1) am Anfang |
| HashSet / HashMap | — | O(1) | O(1) |
| TreeSet / TreeMap | — | O(log n) | O(log n) |

## Primitive Typen

| Typ | Größe | Hinweis |
| --- | --- | --- |
| int | 32 Bit | Standard für Ganzzahlen |
| long | 64 Bit | Literal mit L: 10\_000L |
| double | 64 Bit | NICHT für Geld — BigDecimal nutzen |
| char | 16 Bit | Ein Unicode-Zeichen |
| boolean | — | true / false |

## Klasse, Record, Enum

JavaKopieren

```
public class Konto {
    private final String iban;
    public Konto(String iban) { this.iban = iban; }
    public String getIban() { return iban; }
}

public record Adresse(String strasse, String plz, String ort) { }

public enum Status { OFFEN, BEZAHLT, STORNIERT }
```

## Collections im Alltag

JavaKopieren

```
List<String> liste = new ArrayList<>();
Map<String,Integer> map = new HashMap<>();
Set<String> menge = new HashSet<>();

List<String> fest = List.of("a", "b");        // unveränderlich

map.merge("key", 1, Integer::sum);               // zählen
map.computeIfAbsent(k, x -> new ArrayList<>()).add(v);   // gruppieren
map.getOrDefault(k, 0);

liste.removeIf(String::isBlank);                 // sicher entfernen
```

## Stream-Pipeline

JavaKopieren

```
List<String> namen = kunden.stream()
    .filter(k -> k.umsatz() > 1000)
    .map(Kunde::name)
    .sorted()
    .toList();

Map<String,List<Kunde>> nachOrt =
    kunden.stream().collect(Collectors.groupingBy(Kunde::ort));

Map<String,Long> anzahl =
    kunden.stream().collect(groupingBy(Kunde::ort, counting()));

int summe = liste.stream().mapToInt(Integer::intValue).sum();
String text = liste.stream().collect(joining(", ", "[", "]"));
```

## Optional

JavaKopieren

```
return repo.finde(id)
    .map(Kunde::name)
    .orElse("unbekannt");

opt.orElseGet(() -> teuerBerechnen());   // lazy
opt.orElseThrow(() -> new NichtGefunden(id));
opt.ifPresentOrElse(this::nutze, this::melde);
```

## Exceptions & Ressourcen

JavaKopieren

```
try (var reader = Files.newBufferedReader(pfad)) {
    return reader.readLine();
} catch (IOException e) {
    throw new LeseException("Datei nicht lesbar: " + pfad, e);  // cause mitgeben!
}
```

## equals & hashCode

JavaKopieren

```
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Artikel a)) return false;
    return nummer.equals(a.nummer);
}
@Override
public int hashCode() { return Objects.hash(nummer); }
```

## JUnit 5

JavaKopieren

```
@Test
void einzahlungErhoehtSaldo() {
    konto.einzahlen(new BigDecimal("50"));
    assertEquals(new BigDecimal("150"), konto.getSaldo());
}

assertThrows(IllegalArgumentException.class, () -> konto.einzahlen(minus));

@ParameterizedTest
@ValueSource(ints = {17, 18, 65, 66})
void grenzwerte(int alter) { ... }
```

## SQL kompakt

| JOIN | Ergebnis |
| --- | --- |
| INNER JOIN | Nur Treffer auf beiden Seiten |
| LEFT OUTER JOIN | Alle links, rechts ggf. NULL |
| CROSS JOIN | Kartesisches Produkt |

| Kategorie | Befehle |
| --- | --- |
| DDL | CREATE, ALTER, DROP |
| DML | SELECT, INSERT, UPDATE, DELETE |
| DCL | GRANT, REVOKE |
| TCL | COMMIT, ROLLBACK |

WHERE filtert Zeilen vor der Gruppierung, HAVING Gruppen danach. Auf fehlende Werte prüft man mit IS NULL.

## Normalisierung & UML

| Begriff | Bedeutung |
| --- | --- |
| 1NF | Nur atomare Werte |
| 2NF | Keine Teilabhängigkeit vom zusammengesetzten Schlüssel |
| 3NF | Keine transitiven Abhängigkeiten |
| Generalisierung | extends |
| Realisierung | implements |
| Komposition | Teil stirbt mit dem Ganzen |
| Aggregation | Teil existiert unabhängig |

## Spring Boot: Annotationen

| Annotation | Zweck |
| --- | --- |
| @SpringBootApplication | Einstiegspunkt: Konfiguration, Auto-Config, Component-Scan |
| @Service / @Repository / @Component | Bean im Container registrieren |
| @Bean in @Configuration | Bean aus Fremdklassen erzeugen |
| @ConfigurationProperties | Typsichere, gebündelte Konfiguration |
| @RestController | Controller mit JSON-Rückgabe |
| @GetMapping / @PostMapping … | HTTP-Methode auf Methode abbilden |
| @PathVariable / @RequestParam / @RequestBody | Eingaben binden |
| @Valid | Bean Validation auslösen |
| @RestControllerAdvice | Zentrale Fehlerbehandlung |
| @Transactional | Transaktionsgrenze (an der Serviceschicht) |
| @EntityGraph | Beziehungen mitladen, gegen N+1 |

## Spring Boot: Grundgerüst

Spring BootKopieren

```
@RestController
@RequestMapping("/api/artikel")
public class ArtikelController {
    private final ArtikelService service;
    public ArtikelController(ArtikelService s) { this.service = s; }   // Konstruktorinjektion

    @GetMapping("/{id}")
    public ArtikelDto lesen(@PathVariable long id) {
        return service.finde(id).orElseThrow(() -> new NichtGefundenException("" + id));
    }

    @PostMapping
    public ResponseEntity<ArtikelDto> anlegen(@Valid @RequestBody NeuerArtikel e) {
        var neu = service.anlegen(e);
        return ResponseEntity.created(URI.create("/api/artikel/" + neu.id())).body(neu);
    }
}
```

## Spring: Testarten & Statuscodes

| Testart | Lädt |
| --- | --- |
| Plain JUnit | Nichts von Spring — für Geschäftslogik |
| @WebMvcTest | Nur die Web-Schicht |
| @DataJpaTest | Nur JPA mit Testdatenbank |
| @SpringBootTest | Gesamten Kontext — sparsam einsetzen |

| Status | Bedeutung |
| --- | --- |
| 200 / 201 / 204 | OK / Angelegt (mit Location) / Kein Inhalt |
| 400 / 401 / 403 / 404 | Ungültig / Nicht angemeldet / Verboten / Nicht gefunden |
| 409 / 500 | Konflikt / Interner Fehler |

## Werkzeuge

| Werkzeug | Zweck |
| --- | --- |
| javac / java | Kompilieren und Ausführen |
| Maven / Gradle | Build und Abhängigkeiten |
| JUnit 5 + Mockito | Tests und Test Doubles |
| SLF4J + Logback | Logging |
| JaCoCo | Testabdeckung |
| VisualVM / JMH | Profiling und Mikrobenchmarks |
| mvn dependency:tree | Versionskonflikte finden |
