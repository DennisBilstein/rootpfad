# Übungsaufgaben – Java Expertenpfad

## Einsteiger

### Summe aller geraden Zahlen

*Thema: Pseudocode*

Schreibe einen **Pseudocode-Algorithmus**, der aus einer Liste von Ganzzahlen die Summe aller *geraden* Zahlen berechnet und zurückgibt. Nutze die IHK-übliche Notation.

<details><summary>Hinweis 1</summary>

Du brauchst eine Akkumulator-Variable, die vor der Schleife auf 0 gesetzt wird.

</details>

<details><summary>Hinweis 2</summary>

Eine Zahl ist gerade, wenn der Rest bei Division durch 2 gleich 0 ist — MOD beziehungsweise % in Java.

</details>

<details><summary>Hinweis 3</summary>

Struktur: Initialisierung → Schleife → Verzweigung im Rumpf → nach der Schleife RETURN.

</details>

<details><summary>Lösung</summary>

```pseudocode
FUNCTION summeGerade(zahlen)
  summe <- 0
  FOR EACH zahl IN zahlen DO
    IF zahl MOD 2 = 0 THEN
      summe <- summe + zahl
    ENDIF
  ENDFOR
  RETURN summe
ENDFUNCTION
```

Klassischer Akkumulator mit Filterbedingung — genau das Muster, das die AP1 in Multiple-Choice-Fragen abfragt („Was liefert der Algorithmus für [3,4,7,8]?" → 12).

</details>

### Pseudocode in Java übersetzen

*Thema: Java-Grundlagen*

Übersetze diesen Pseudocode **wörtlich in eine Java-Methode**. Achte auf den Startindex — Java zählt ab 0.

```
FUNCTION findeIndex(zahlen, gesucht) FOR i <- 1 TO LAENGE(zahlen) DO IF zahlen[i] = gesucht THEN RETURN i ENDIF ENDFOR RETURN -1 ENDFUNCTION
```

<details><summary>Hinweis 1</summary>

zahlen.length liefert die Anzahl der Elemente eines Arrays.

</details>

<details><summary>Hinweis 2</summary>

Die Abbruchbedingung lautet i < zahlen.length, nicht <= — sonst gibt es eine ArrayIndexOutOfBoundsException.

</details>

<details><summary>Hinweis 3</summary>

return innerhalb der Schleife verlässt die Methode sofort; ein break ist dann nicht nötig.

</details>

<details><summary>Lösung</summary>

```java
public static int findeIndex(int[] zahlen, int gesucht) {
    for (int i = 0; i < zahlen.length; i++) {
        if (zahlen[i] == gesucht) {
            return i;
        }
    }
    return -1;
}
```

Bei primitiven int-Werten ist == korrekt. Bei Objekten (etwa String[] oder Integer[]) müsstest du equals() verwenden — genau der Unterschied aus Modul 7.

</details>

### Wörter zählen

*Thema: Collections*

Gegeben ist eine `List<String> woerter`. Erstelle eine `Map<String, Integer>`, die zu jedem Wort angibt, wie oft es vorkommt.

Löse es einmal mit einer klassischen Schleife und einmal mit einem Stream.

<details><summary>Hinweis 1</summary>

Die klassische Variante braucht die Prüfung, ob der Schlüssel schon existiert — oder eine Methode, die das für dich erledigt.

</details>

<details><summary>Hinweis 2</summary>

Map.merge(schluessel, 1, Integer::sum) ersetzt den ganzen Dreisatz aus containsKey, get und put.

</details>

<details><summary>Hinweis 3</summary>

Für die Stream-Variante: Collectors.groupingBy in Kombination mit Collectors.counting().

</details>

<details><summary>Lösung</summary>

```java
// Klassisch
Map<String, Integer> zaehler = new HashMap<>();
for (String wort : woerter) {
    zaehler.merge(wort, 1, Integer::sum);
}

// Mit Stream (Rückgabetyp Long!)
Map<String, Long> zaehler2 = woerter.stream()
        .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
```

Beachte den unterschiedlichen Werttyp: counting() liefert Long, nicht Integer. Wer das übersieht, bekommt beim Zuweisen einen Compilerfehler, der zunächst rätselhaft wirkt.

</details>

### Erste eigene Klasse

*Thema: OOP*

Erstelle eine Klasse `Rechnung` mit:

-   privatem, unveränderlichem Feld `netto` vom Typ `BigDecimal`
-   Konstruktor, der den Nettobetrag entgegennimmt und auf `null` sowie negative Werte prüft
-   Methode `getBrutto()`, die den Bruttobetrag mit 19 % Mehrwertsteuer liefert

<details><summary>Hinweis 1</summary>

Felder, die sich nach der Konstruktion nicht ändern sollen, bekommen final.

</details>

<details><summary>Hinweis 2</summary>

Objects.requireNonNull(wert, "meldung") wirft eine aussagekräftige NullPointerException.

</details>

<details><summary>Hinweis 3</summary>

BigDecimal rechnet nicht mit Operatoren: nutze multiply(new BigDecimal("1.19")) — und den String-Konstruktor, nicht den double-Konstruktor.

</details>

<details><summary>Lösung</summary>

```java
public class Rechnung {
    private static final BigDecimal MWST = new BigDecimal("1.19");
    private final BigDecimal netto;

    public Rechnung(BigDecimal netto) {
        Objects.requireNonNull(netto, "netto darf nicht null sein");
        if (netto.signum() < 0) {
            throw new IllegalArgumentException("netto darf nicht negativ sein: " + netto);
        }
        this.netto = netto;
    }

    public BigDecimal getBrutto() {
        return netto.multiply(MWST).setScale(2, RoundingMode.HALF_UP);
    }
}
```

setScale(2, RoundingMode.HALF_UP) rundet kaufmännisch auf zwei Stellen. Ohne explizite Rundung liefert BigDecimal alle Nachkommastellen der Multiplikation — bei Geldbeträgen unerwünscht.

</details>

### JOIN mit Filter schreiben

*Thema: SQL*

Tabellen: `kunde(id, name, land)` und `bestellung(id, kunde_id, betrag)`.

Schreibe eine Abfrage, die **Name und Bestellbetrag aller deutschen Kunden** liefert — inklusive der Kunden, die noch *keine* Bestellung haben.

<details><summary>Hinweis 1</summary>

Welcher JOIN-Typ behält Zeilen der linken Tabelle, auch wenn rechts kein Treffer existiert?

</details>

<details><summary>Hinweis 2</summary>

Die Filterbedingung auf das Land bezieht sich auf die linke Tabelle und darf deshalb in die WHERE-Klausel.

</details>

<details><summary>Lösung</summary>

```sql
SELECT k.name, b.betrag
FROM kunde k
LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id
WHERE k.land = 'DE';
```

Prüfungsfalle: Stünde eine Bedingung auf die RECHTE Tabelle in der WHERE-Klausel (z. B. b.betrag > 100), würde der LEFT JOIN faktisch zum INNER JOIN — die NULL-Zeilen fielen heraus. Solche Bedingungen gehören in die ON-Klausel.

</details>

## Fortgeschritten

### Bubble-Sort und Komplexität

*Thema: Pseudocode*

Schreibe **Bubble-Sort** in Pseudocode (aufsteigend).

Zusatzfragen: Welche Komplexität hat der Algorithmus im schlechtesten Fall? Wie viele Vergleiche finden bei n = 5 in der optimierten Variante statt?

<details><summary>Hinweis 1</summary>

Zwei verschachtelte Schleifen: die äußere zählt die Durchläufe, die innere vergleicht Nachbarn.

</details>

<details><summary>Hinweis 2</summary>

Zum Tauschen brauchst du eine Hilfsvariable.

</details>

<details><summary>Hinweis 3</summary>

Optimierung: Nach dem i-ten Durchlauf stehen die letzten i Elemente bereits richtig — die innere Schleife darf kürzer werden.

</details>

<details><summary>Lösung</summary>

```pseudocode
PROCEDURE bubbleSort(zahlen)
  n <- LAENGE(zahlen)
  FOR i <- 1 TO n - 1 DO
    FOR j <- 1 TO n - i DO
      IF zahlen[j] > zahlen[j + 1] THEN
        temp <- zahlen[j]
        zahlen[j] <- zahlen[j + 1]
        zahlen[j + 1] <- temp
      ENDIF
    ENDFOR
  ENDFOR
ENDPROCEDURE
```

Komplexität O(n²). Bei n = 5 optimiert: 4+3+2+1 = 10 Vergleiche; in der naiven Variante mit innerer Schleife bis n-1 wären es 4·4 = 16.

</details>

### Schleife zu Stream refaktorieren

*Thema: Streams*

Refaktoriere diesen Code mit der Stream-API — gleiche Funktionalität, keine explizite Schleife:

```
List<String> namen = new ArrayList<>(); for (Kunde k : kunden) { if (k.isAktiv() && k.getUmsatz() > 1000) { namen.add(k.getName().toUpperCase()); } } Collections.sort(namen);
```

<details><summary>Hinweis 1</summary>

Die Kette lautet: Quelle, dann filtern, dann abbilden, dann sortieren, dann einsammeln.

</details>

<details><summary>Hinweis 2</summary>

Mehrere Bedingungen kannst du in einem filter() mit && kombinieren oder auf zwei filter()-Aufrufe verteilen.

</details>

<details><summary>Hinweis 3</summary>

toList() (ab Java 16) liefert direkt eine unveränderliche Liste — collect(Collectors.toList()) geht auch.

</details>

<details><summary>Lösung</summary>

```java
List<String> namen = kunden.stream()
        .filter(Kunde::isAktiv)
        .filter(k -> k.getUmsatz() > 1000)
        .map(k -> k.getName().toUpperCase())
        .sorted()
        .toList();
```

Zwei getrennte filter()-Aufrufe sind hier lesbarer als einer mit && und kosten praktisch nichts — die Pipeline läuft ohnehin nur einmal über die Daten. Beachte: toList() liefert eine unveränderliche Liste; brauchst du eine änderbare, nimm collect(Collectors.toCollection(ArrayList::new)).

</details>

### Verschachtelte Schleife entschärfen

*Thema: Performance*

Dieser Code ist bei 10.000 Bestellungen und 5.000 Kunden zu langsam. Erkläre **warum** und schreibe eine effiziente Variante:

```
for (Bestellung b : bestellungen) { for (Kunde k : kunden) { if (k.getId().equals(b.getKundeId())) { b.setKundenname(k.getName()); break; } } }
```

<details><summary>Hinweis 1</summary>

Rechne die Zugriffe durch: Wie oft läuft die innere Schleife im ungünstigsten Fall insgesamt?

</details>

<details><summary>Hinweis 2</summary>

Eine Map von Kunden-ID auf Kunde erlaubt Zugriff in konstanter Zeit.

</details>

<details><summary>Hinweis 3</summary>

Die Map baust du einmal vorab auf — danach ist jede Zuordnung ein einzelner get()-Aufruf.

</details>

<details><summary>Lösung</summary>

```java
// Problem: O(n · m) — bis zu 50 Millionen Vergleiche

// Lösung: einmal indizieren, dann in O(1) nachschlagen
Map<String, Kunde> index = kunden.stream()
        .collect(Collectors.toMap(Kunde::getId, k -> k, (alt, neu) -> alt));

for (Bestellung b : bestellungen) {
    Kunde k = index.get(b.getKundeId());
    if (k != null) {
        b.setKundenname(k.getName());
    }
}
```

Vorher O(n·m), nachher O(n+m). Die Merge-Funktion in toMap() ist Pflicht, sobald doppelte Schlüssel möglich sind — sonst fliegt zur Laufzeit eine IllegalStateException, oft erst mit Produktivdaten.

</details>

### Strategy-Muster umsetzen

*Thema: OOP*

Implementiere eine Rabattberechnung nach dem **Strategy-Muster**:

-   ein funktionales Interface `Rabattregel` mit Methode `berechne(BigDecimal betrag)`
-   zwei Regeln: Standardkunde 5 %, Premiumkunde 15 %
-   aufrufender Code, der je nach Kundentyp die passende Regel wählt

<details><summary>Hinweis 1</summary>

Ein Interface mit genau einer abstrakten Methode ist ein funktionales Interface und lässt sich als Lambda umsetzen.

</details>

<details><summary>Hinweis 2</summary>

Die Auswahl lässt sich über eine Map<Kundentyp, Rabattregel> lösen — ganz ohne if-Kette.

</details>

<details><summary>Hinweis 3</summary>

Der aufrufende Code darf nur das Interface kennen, nie die konkrete Implementierung. Das ist der Kern des Musters.

</details>

<details><summary>Lösung</summary>

```java
@FunctionalInterface
public interface Rabattregel {
    BigDecimal berechne(BigDecimal betrag);
}

public class Rabattrechner {
    private static final Map<Kundentyp, Rabattregel> REGELN = Map.of(
            Kundentyp.STANDARD, b -> b.multiply(new BigDecimal("0.05")),
            Kundentyp.PREMIUM,  b -> b.multiply(new BigDecimal("0.15")));

    public BigDecimal rabatt(Kundentyp typ, BigDecimal betrag) {
        Rabattregel regel = REGELN.getOrDefault(typ, b -> BigDecimal.ZERO);
        return regel.berechne(betrag).setScale(2, RoundingMode.HALF_UP);
    }
}
```

Der Gewinn zeigt sich bei Erweiterung: Ein neuer Kundentyp erfordert genau einen Map-Eintrag — keine Änderung an bestehender Logik. Das ist das Open/Closed-Prinzip in seiner praktischsten Form.

</details>

### equals und hashCode korrekt implementieren

*Thema: Collections*

Eine Klasse `Artikel` hat die Felder `nummer` (fachlicher Schlüssel), `bezeichnung` und `bestand` (veränderlich).

Implementiere `equals` und `hashCode` korrekt und begründe, **welche Felder** du verwendest — und welche bewusst nicht.

<details><summary>Hinweis 1</summary>

Zwei Artikel sind fachlich dann derselbe, wenn ihre Artikelnummer übereinstimmt.

</details>

<details><summary>Hinweis 2</summary>

Überlege, was passiert, wenn ein in hashCode verwendetes Feld sich ändert, während das Objekt in einem HashSet liegt.

</details>

<details><summary>Hinweis 3</summary>

Objects.hash(...) und das Pattern-Matching-instanceof machen die Implementierung kurz.

</details>

<details><summary>Lösung</summary>

```java
public class Artikel {
    private final String nummer;        // fachlicher Schlüssel, unveränderlich
    private String bezeichnung;
    private int bestand;                // veränderlich -> NICHT in equals/hashCode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Artikel a)) return false;
        return nummer.equals(a.nummer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nummer);
    }
}
```

Nur die unveränderliche Artikelnummer gehört hinein. Käme bestand dazu, würde eine Bestandsänderung den hashCode verändern — das Objekt läge dann im falschen Bucket eines HashSet und wäre weder auffindbar noch entfernbar. Dieser Fehler ist in Produktion extrem schwer zu diagnostizieren.

</details>

### Testfälle nach Äquivalenzklassen entwerfen

*Thema: Testen*

Eine Methode `boolean istZulaessig(int alter)` soll `true` liefern für Alter von 18 bis einschließlich 65, sonst `false`.

Bestimme die **Äquivalenzklassen** und **Grenzwerte** und schreibe dafür einen parametrisierten JUnit-5-Test.

<details><summary>Hinweis 1</summary>

Drei Klassen: unterhalb des gültigen Bereichs, innerhalb, oberhalb.

</details>

<details><summary>Hinweis 2</summary>

Grenzwerte sind jeweils die Werte direkt unter und über jeder Bereichsgrenze.

</details>

<details><summary>Hinweis 3</summary>

@ParameterizedTest mit @CsvSource erlaubt Eingabe und Erwartungswert in einer Zeile.

</details>

<details><summary>Lösung</summary>

```java
// Äquivalenzklassen: <18 ungültig | 18..65 gültig | >65 ungültig
// Grenzwerte:        17, 18            65, 66

@ParameterizedTest
@CsvSource({
    "17, false",   // direkt unterhalb der Untergrenze
    "18, true",    // Untergrenze
    "40, true",    // Vertreter der gültigen Klasse
    "65, true",    // Obergrenze
    "66, false"    // direkt oberhalb der Obergrenze
})
void altersgrenzePruefen(int alter, boolean erwartet) {
    assertEquals(erwartet, Regel.istZulaessig(alter));
}
```

Fünf Testfälle decken alle Klassen und alle Grenzen ab. Genau hier entstehen die häufigsten Fehler: Ein < statt <= in der Implementierung fällt nur auf, wenn 65 und 66 beide getestet werden.

</details>

### REST-Endpunkt sauber bauen

*Thema: Spring Boot*

Baue einen `@RestController` für Artikel mit drei Endpunkten:

-   `GET /api/artikel/{id}` — liefert einen Artikel oder 404
-   `GET /api/artikel` — paginierte Liste
-   `POST /api/artikel` — legt an, liefert 201 mit Location-Header

Nutze Konstruktorinjektion, ein DTO statt der Entity und Bean Validation für die Eingabe.

<details><summary>Hinweis 1</summary>

Der Rückgabetyp bestimmt den Statuscode: Ein einfaches Objekt ergibt 200, ResponseEntity erlaubt volle Kontrolle.

</details>

<details><summary>Hinweis 2</summary>

Für 201 mit Location: ResponseEntity.created(URI.create(...)).body(...).

</details>

<details><summary>Hinweis 3</summary>

Ein Pageable-Parameter in der Signatur wird von Spring automatisch aus den Query-Parametern page, size und sort befüllt.

</details>

<details><summary>Lösung</summary>

```java/springboot
@RestController
@RequestMapping("/api/artikel")
public class ArtikelController {

    private final ArtikelService service;

    public ArtikelController(ArtikelService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ArtikelDto lesen(@PathVariable long id) {
        return service.finde(id)
                .orElseThrow(() -> new NichtGefundenException("Artikel " + id));
    }

    @GetMapping
    public Page<ArtikelDto> liste(Pageable pageable) {
        return service.liste(pageable);
    }

    @PostMapping
    public ResponseEntity<ArtikelDto> anlegen(@Valid @RequestBody NeuerArtikel eingabe) {
        ArtikelDto neu = service.anlegen(eingabe);
        return ResponseEntity.created(URI.create("/api/artikel/" + neu.id())).body(neu);
    }
}

public record NeuerArtikel(
        @NotBlank String bezeichnung,
        @Positive BigDecimal preis) { }
```

Die NichtGefundenException wird zentral in einem @RestControllerAdvice auf 404 abgebildet — nicht im Controller selbst. So bleibt jeder Endpunkt frei von Fehlerbehandlung, und das Antwortformat ist überall gleich.

</details>

### Zentrale Fehlerbehandlung ergänzen

*Thema: Spring Boot*

Schreibe ein `@RestControllerAdvice`, das drei Fälle abdeckt:

-   `NichtGefundenException` → 404
-   Validierungsfehler → 400 **mit einer Feldliste**, welche Felder warum abgelehnt wurden
-   alle übrigen Fehler → 500, ohne interne Details nach außen

Nutze `ProblemDetail` als Antwortformat.

<details><summary>Hinweis 1</summary>

Validierungsfehler kommen als MethodArgumentNotValidException an; getBindingResult().getFieldErrors() liefert die Details.

</details>

<details><summary>Hinweis 2</summary>

ProblemDetail.forStatusAndDetail(...) erzeugt das Grundobjekt, setProperty(...) ergänzt eigene Felder.

</details>

<details><summary>Hinweis 3</summary>

Beim Auffangfall gilt: Stacktrace ins Log, nach außen nur eine neutrale Meldung.

</details>

<details><summary>Lösung</summary>

```java/springboot
@RestControllerAdvice
public class GlobaleFehlerBehandlung {

    private static final Logger log = LoggerFactory.getLogger(GlobaleFehlerBehandlung.class);

    @ExceptionHandler(NichtGefundenException.class)
    public ProblemDetail nichtGefunden(NichtGefundenException e) {
        var pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        pd.setTitle("Ressource nicht gefunden");
        return pd;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail ungueltig(MethodArgumentNotValidException e) {
        var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Eingabe ungültig");
        pd.setProperty("felder", e.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField,
                                          FieldError::getDefaultMessage, (a, b) -> a)));
        return pd;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail unerwartet(Exception e) {
        String ref = UUID.randomUUID().toString();
        log.error("Unerwarteter Fehler [{}]", ref, e);      // Details nur ins Log
        var pd = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR,
                "Interner Fehler. Bitte Referenz angeben: " + ref);
        pd.setTitle("Interner Fehler");
        return pd;
    }
}
```

Die Referenz-ID ist der entscheidende Kniff: Der Nutzer bekommt eine harmlose Kennung, der Support findet damit im Log den vollständigen Stacktrace. So bleibt die Antwort sicher und die Fehlersuche trotzdem möglich.

</details>

## Experte

### Race Condition finden und beheben

*Thema: Nebenläufigkeit*

Dieser Zähler liefert unter Last falsche Ergebnisse. Erkläre **warum** und zeige **drei** unterschiedliche korrekte Lösungen mit ihren jeweiligen Vor- und Nachteilen:

```
public class Zaehler { private int wert = 0; public void erhoehe() { wert++; } public int getWert() { return wert; } }
```

<details><summary>Hinweis 1</summary>

wert++ sieht aus wie eine Operation, besteht aber aus drei Schritten: lesen, erhöhen, zurückschreiben.

</details>

<details><summary>Hinweis 2</summary>

Neben der Atomarität gibt es ein zweites Problem: Sichtbarkeit zwischen Threads. Löst dein Ansatz beide?

</details>

<details><summary>Hinweis 3</summary>

volatile allein reicht nicht — es garantiert Sichtbarkeit, aber keine Atomarität.

</details>

<details><summary>Lösung</summary>

```java
// Ursache: wert++ ist Lesen + Erhöhen + Schreiben. Zwei Threads können
// denselben Ausgangswert lesen -> eine Erhöhung geht verloren.
// Zusätzlich fehlt ohne Synchronisation die Sichtbarkeit zwischen Threads.

// Lösung 1: synchronized — einfach, löst Atomarität UND Sichtbarkeit,
// aber blockierend (Kontention bei vielen Threads)
public synchronized void erhoehe() { wert++; }
public synchronized int getWert() { return wert; }

// Lösung 2: AtomicInteger — nicht blockierend (CAS), meist die beste Wahl
private final AtomicInteger wert = new AtomicInteger();
public void erhoehe() { wert.incrementAndGet(); }
public int getWert() { return wert.get(); }

// Lösung 3: LongAdder — bei sehr hoher Schreiblast schneller als Atomic,
// dafür ist sum() nur ein Näherungswert während laufender Änderungen
private final LongAdder wert = new LongAdder();
public void erhoehe() { wert.increment(); }
public long getWert() { return wert.sum(); }
```

Wichtig: Auch getWert() muss synchronisiert sein — sonst sieht ein lesender Thread möglicherweise dauerhaft einen veralteten Wert aus seinem CPU-Cache. Genau dieses Sichtbarkeitsproblem wird beim Absichern von Zählern am häufigsten übersehen.

</details>

### Nicht testbare Klasse refaktorieren

*Thema: Testen & OOP*

Diese Klasse lässt sich nicht sinnvoll testen. Analysiere **warum**, refaktoriere sie mit Dependency Injection und schreibe einen JUnit-Test mit Mockito:

```
public class BestellService { public boolean bestelle(String kundeId) { Kunde k = new MySqlKundeRepository().finde(kundeId); if (k == null) return false; new SmtpMailSender().sende(k.getEmail(), "Bestätigung"); return true; } }
```

<details><summary>Hinweis 1</summary>

Zwei harte Abhängigkeiten werden im Methodenrumpf per new erzeugt — sie lassen sich von außen nicht ersetzen.

</details>

<details><summary>Hinweis 2</summary>

Extrahiere beide hinter Interfaces und übergib sie im Konstruktor.

</details>

<details><summary>Hinweis 3</summary>

Im Test erzeugst du Mocks der Interfaces und prüfst mit verify(), ob die Mail tatsächlich versendet wurde.

</details>

<details><summary>Lösung</summary>

```java
public class BestellService {
    private final KundeRepository repo;
    private final MailSender mailer;

    public BestellService(KundeRepository repo, MailSender mailer) {
        this.repo   = Objects.requireNonNull(repo);
        this.mailer = Objects.requireNonNull(mailer);
    }

    public boolean bestelle(String kundeId) {
        return repo.finde(kundeId)
                .map(k -> { mailer.sende(k.getEmail(), "Bestätigung"); return true; })
                .orElse(false);
    }
}

// --- Test ---
@ExtendWith(MockitoExtension.class)
class BestellServiceTest {
    @Mock KundeRepository repo;
    @Mock MailSender mailer;
    @InjectMocks BestellService service;

    @Test
    void versendetMailBeiBekanntemKunden() {
        when(repo.finde("K1")).thenReturn(Optional.of(new Kunde("K1", "a@b.de")));

        assertTrue(service.bestelle("K1"));
        verify(mailer).sende("a@b.de", "Bestätigung");
    }

    @Test
    void keineMailBeiUnbekanntemKunden() {
        when(repo.finde("X")).thenReturn(Optional.empty());

        assertFalse(service.bestelle("X"));
        verifyNoInteractions(mailer);
    }
}
```

Die Kernaussage: Der Test wurde nicht durch ein Werkzeug möglich, sondern durch besseres Design. Zusätzlich ersetzt Optional das null-Rückgabemuster — der Aufrufer kann den Fall „nicht gefunden" nicht mehr versehentlich übersehen.

</details>

### Werttypen statt primitiver Obsession

*Thema: Architektur*

Diese Signatur birgt einen Fehler, den kein Test zuverlässig findet:

```
public void ueberweise(String vonIban, String nachIban, double betrag)
```

Nenne **zwei** konkrete Fehlerquellen und entwirf eine Lösung mit eigenen Werttypen. Begründe, warum der Compiler danach Fehler findet, die vorher erst zur Laufzeit auffielen.

<details><summary>Hinweis 1</summary>

Beide String-Parameter stehen nebeneinander und haben denselben Typ — was passiert beim Vertauschen?

</details>

<details><summary>Hinweis 2</summary>

Welcher Datentyp ist für Geldbeträge ungeeignet und warum?

</details>

<details><summary>Hinweis 3</summary>

Ein record mit Validierung im kompakten Konstruktor bündelt Prüfung und Typsicherheit an einer Stelle.

</details>

<details><summary>Lösung</summary>

```java
// Fehlerquelle 1: vonIban und nachIban sind vertauschbar — der Compiler
//                 schweigt, das Geld fließt in die falsche Richtung.
// Fehlerquelle 2: double für Geld -> Rundungsfehler (0.1 + 0.2 != 0.3).

public record Iban(String wert) {
    public Iban {
        Objects.requireNonNull(wert, "IBAN fehlt");
        if (!wert.matches("[A-Z]{2}\\d{2}[A-Z0-9]{10,30}")) {
            throw new IllegalArgumentException("Ungültige IBAN: " + wert);
        }
    }
}

public record Geldbetrag(BigDecimal wert, Currency waehrung) {
    public Geldbetrag {
        if (wert.signum() < 0) throw new IllegalArgumentException("negativ");
        wert = wert.setScale(2, RoundingMode.HALF_UP);
    }
    public Geldbetrag plus(Geldbetrag a) {
        if (!waehrung.equals(a.waehrung)) throw new IllegalArgumentException("Währungen");
        return new Geldbetrag(wert.add(a.wert), waehrung);
    }
}

public void ueberweise(Iban von, Iban nach, Geldbetrag betrag) { ... }
```

Der Gewinn ist kategorisch, nicht graduell: Vertauschte Parameter bleiben zwar bei zwei Iban-Werten möglich, aber Betrag und IBAN lassen sich nicht mehr verwechseln, ungültige IBANs entstehen gar nicht erst, und die Währungsprüfung ist zentral statt an jeder Additionsstelle. Aus verstreuten Laufzeitprüfungen wird eine Typgarantie.

</details>

### N+1-Problem erkennen und lösen

*Thema: Datenbank*

Dieser Code lädt 500 Bestellungen und braucht dafür über 500 Datenbankabfragen. Erkläre den Mechanismus und zeige **zwei** Lösungswege — einen für JPA, einen für reines JDBC:

```
List<Bestellung> alle = em.createQuery( "SELECT b FROM Bestellung b", Bestellung.class).getResultList(); for (Bestellung b : alle) { System.out.println(b.getKunde().getName()); // kunde ist LAZY }
```

<details><summary>Hinweis 1</summary>

Zähle die Abfragen: eine für die Liste, und dann?

</details>

<details><summary>Hinweis 2</summary>

Bei JPA lässt sich die Beziehung in derselben Abfrage mitladen.

</details>

<details><summary>Hinweis 3</summary>

Bei reinem JDBC löst ein JOIN im SQL das Problem, oder man lädt alle benötigten Kunden in einer zweiten Abfrage mit IN und baut daraus eine Map.

</details>

<details><summary>Lösung</summary>

```java
// Mechanismus: 1 Abfrage für die Liste + 1 Abfrage je Bestellung beim
// ersten Zugriff auf die LAZY geladene Beziehung = 1 + N Abfragen.

// Lösung A (JPA): Beziehung in derselben Abfrage mitladen
List<Bestellung> alle = em.createQuery(
        "SELECT b FROM Bestellung b JOIN FETCH b.kunde", Bestellung.class)
        .getResultList();

// Lösung B (JDBC): ein JOIN, ein Durchlauf
String sql = """
        SELECT b.id, b.betrag, k.id AS kunde_id, k.name
        FROM bestellung b
        JOIN kunde k ON k.id = b.kunde_id
        """;
try (PreparedStatement ps = con.prepareStatement(sql);
     ResultSet rs = ps.executeQuery()) {
    while (rs.next()) {
        // Bestellung samt Kundenname in einem Durchgang aufbauen
    }
}
```

Zur Diagnose: Schalte im Entwicklungsprofil das SQL-Logging ein. Fast jedes Team findet so beim ersten Mal ein N+1-Problem, das mit 20 Testdatensätzen nie auffiel und mit 20.000 Produktivsätzen die Anwendung lahmlegt.

</details>

### Unsicheren Code absichern

*Thema: Sicherheit*

Dieser Ausschnitt eines Login-Systems enthält **drei** schwerwiegende Sicherheitsprobleme. Finde alle und schreibe eine abgesicherte Version:

```
String sql = "SELECT * FROM user WHERE name = '" + name + "'"; ResultSet rs = stmt.executeQuery(sql); if (rs.next()) { String hash = DigestUtils.md5Hex(passwort); if (hash.equals(rs.getString("pw_hash"))) { String token = "" + new Random().nextLong(); return token; } } throw new RuntimeException("Login fehlgeschlagen für " + name + ", SQL war: " + sql);
```

<details><summary>Hinweis 1</summary>

Der erste Fehler steckt in der Art, wie die Abfrage zusammengesetzt wird.

</details>

<details><summary>Hinweis 2</summary>

Der zweite betrifft das Hashverfahren: Welche Eigenschaften braucht ein Passwort-Hash?

</details>

<details><summary>Hinweis 3</summary>

Der dritte hat mit Vorhersagbarkeit zu tun — und die Fehlermeldung verrät zusätzlich zu viel.

</details>

<details><summary>Lösung</summary>

```java
// Problem 1: SQL-Injection durch String-Verkettung
// Problem 2: MD5 ist schnell und ohne Salt -> massenhaft knackbar
// Problem 3: Random ist vorhersagbar -> Tokens erratbar
//            (Bonus: Fehlermeldung verrät SQL und Benutzernamen)

String sql = "SELECT pw_hash FROM user WHERE name = ?";
try (PreparedStatement ps = con.prepareStatement(sql)) {
    ps.setString(1, name);
    try (ResultSet rs = ps.executeQuery()) {
        if (rs.next() && BCrypt.checkpw(passwort, rs.getString("pw_hash"))) {
            byte[] raw = new byte[32];
            new SecureRandom().nextBytes(raw);
            return Base64.getUrlEncoder().withoutPadding().encodeToString(raw);
        }
    }
}
log.warn("Fehlgeschlagener Login für Benutzer {}", name);   // Detail nur ins Log
throw new LoginException("Benutzername oder Passwort falsch");  // neutral nach außen
```

Beachte die neutrale Fehlermeldung: „Benutzername oder Passwort falsch" verrät nicht, ob der Benutzer existiert — sonst kann ein Angreifer gültige Kontonamen durchprobieren. Details gehören ins Log, nicht in die Antwort an den Aufrufer.

</details>

### Transaktionsfalle finden

*Thema: Spring Boot*

Dieser Service verhält sich nicht wie erwartet: Bei einem Fehler in der Mitte bleiben bereits verarbeitete Datensätze gespeichert, obwohl alles zurückgerollt werden sollte. Finde **beide** Fehler und korrigiere sie:

```
@Service public class ImportService { @Transactional public void importiere(List<Zeile> zeilen) throws ImportException { for (Zeile z : zeilen) { verarbeite(z); } } @Transactional(propagation = Propagation.REQUIRES_NEW) public void verarbeite(Zeile z) throws ImportException { repo.save(z.zuEntity()); if (!z.gueltig()) throw new ImportException("ungültig: " + z); } }
```

<details><summary>Hinweis 1</summary>

Der erste Fehler betrifft die Art des Aufrufs von verarbeite(). Wie erreicht Spring eine annotierte Methode?

</details>

<details><summary>Hinweis 2</summary>

Der zweite betrifft den Exception-Typ. Bei welchen Exceptions rollt Spring standardmäßig zurück?

</details>

<details><summary>Hinweis 3</summary>

Frage dich außerdem, ob REQUIRES_NEW hier überhaupt gewollt ist — es entkoppelt die innere Transaktion bewusst von der äußeren.

</details>

<details><summary>Lösung</summary>

```java/springboot
// Fehler 1: verarbeite() wird intern aufgerufen -> der Aufruf geht am Proxy
//           vorbei, die Annotation wirkt nicht.
// Fehler 2: ImportException ist eine Checked Exception -> Spring rollt
//           standardmäßig NICHT zurück.
// (Bonus: REQUIRES_NEW würde jede Zeile ohnehin separat committen —
//  genau das Gegenteil der gewünschten Alles-oder-nichts-Semantik.)

@Service
public class ImportService {

    private final ZeilenVerarbeiter verarbeiter;   // eigene Bean -> Aufruf über Proxy

    public ImportService(ZeilenVerarbeiter verarbeiter) {
        this.verarbeiter = verarbeiter;
    }

    @Transactional(rollbackFor = ImportException.class)
    public void importiere(List<Zeile> zeilen) throws ImportException {
        for (Zeile z : zeilen) {
            verarbeiter.verarbeite(z);      // läuft in derselben Transaktion mit
        }
    }
}

@Component
public class ZeilenVerarbeiter {
    @Transactional(propagation = Propagation.MANDATORY)   // verlangt äußere Transaktion
    public void verarbeite(Zeile z) throws ImportException { ... }
}
```

MANDATORY statt REQUIRES_NEW ist hier die passende Wahl: Es erzwingt, dass die Methode nur innerhalb einer bestehenden Transaktion läuft, und schlägt sonst sofort fehl. Damit wird der Entwurfsfehler beim ersten Test sichtbar, statt erst bei einem Abbruch in Produktion.

</details>

### Controller-Test ohne Datenbank

*Thema: Spring Boot*

Schreibe Tests für den Artikel-Controller aus Aufgabe 17 — **ohne** Datenbank und ohne vollständigen Anwendungskontext. Decke drei Fälle ab:

-   Ein bekannter Artikel liefert 200 und den korrekten JSON-Inhalt
-   Ein unbekannter Artikel liefert 404
-   Eine ungültige Eingabe beim Anlegen liefert 400

Begründe, warum du *nicht* `@SpringBootTest` verwendest.

<details><summary>Hinweis 1</summary>

Welche Slice-Annotation lädt nur die Web-Schicht mit einem bestimmten Controller?

</details>

<details><summary>Hinweis 2</summary>

Der Service wird durch ein Test Double ersetzt — in aktuellen Spring-Versionen mit @MockitoBean.

</details>

<details><summary>Hinweis 3</summary>

MockMvc führt die Anfragen aus; mit jsonPath() prüfst du einzelne Felder der Antwort.

</details>

<details><summary>Lösung</summary>

```java/springboot
@WebMvcTest(ArtikelController.class)
class ArtikelControllerTest {

    @Autowired MockMvc mvc;
    @MockitoBean ArtikelService service;

    @Test
    void liefertArtikel() throws Exception {
        when(service.finde(1L)).thenReturn(
                Optional.of(new ArtikelDto(1L, "Schraube", new BigDecimal("1.50"))));

        mvc.perform(get("/api/artikel/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.bezeichnung").value("Schraube"))
           .andExpect(jsonPath("$.preis").value(1.50));
    }

    @Test
    void liefert404() throws Exception {
        when(service.finde(99L)).thenReturn(Optional.empty());
        mvc.perform(get("/api/artikel/99")).andExpect(status().isNotFound());
    }

    @Test
    void lehntLeereBezeichnungAb() throws Exception {
        mvc.perform(post("/api/artikel")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                         {"bezeichnung": "", "preis": 5}
                         """))
           .andExpect(status().isBadRequest());
        verifyNoInteractions(service);      // gar nicht erst durchgelassen
    }
}
```

@SpringBootTest würde den gesamten Kontext samt Datenbank und Sicherheitskonfiguration hochfahren — Sekunden pro Test, und bei einem Fehlschlag weißt du nicht, welche Schicht schuld ist. @WebMvcTest prüft genau das, was ein Controller verantwortet: Mapping, Statuscodes, Serialisierung und Validierung.

</details>
