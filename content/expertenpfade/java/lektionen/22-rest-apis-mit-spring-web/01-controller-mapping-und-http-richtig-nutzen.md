# Controller, Mapping und HTTP richtig nutzen

*REST-APIs mit Spring Web · ca. 9 Min.*

Ein `@RestController` bündelt `@Controller` und `@ResponseBody`: Rückgabewerte werden automatisch als JSON serialisiert (Jackson, Modul 14).

Gutes API-Design nutzt HTTP so, wie es gedacht ist:

| Methode | Zweck | Typischer Status |
| --- | --- | --- |
| GET | Lesen, ohne Nebenwirkung | 200, 404 |
| POST | Anlegen | 201 mit Location-Header |
| PUT | Vollständig ersetzen (idempotent) | 200 / 204 |
| PATCH | Teilweise ändern | 200 |
| DELETE | Löschen (idempotent) | 204 |

Ressourcen werden als Substantive im Plural benannt (`/api/bestellungen/42`), nicht als Verben (`/api/getBestellung`) — die Aktion steckt bereits in der HTTP-Methode.

```java
@RestController
@RequestMapping("/api/bestellungen")
public class BestellController {

    private final BestellService service;
    public BestellController(BestellService service) { this.service = service; }

    @GetMapping("/{id}")
    public BestellDto lesen(@PathVariable long id) {
        return service.finde(id)
                .orElseThrow(() -> new NichtGefundenException("Bestellung " + id));
    }

    @GetMapping
    public Page<BestellDto> liste(@RequestParam(defaultValue = "OFFEN") Status status,
                                   Pageable pageable) {
        return service.suche(status, pageable);
    }

    @PostMapping
    public ResponseEntity<BestellDto> anlegen(@Valid @RequestBody NeueBestellung eingabe) {
        BestellDto neu = service.anlegen(eingabe);
        return ResponseEntity
                .created(URI.create("/api/bestellungen/" + neu.id()))
                .body(neu);
    }
}
```

> **Tipp:** Gib niemals deine JPA-Entities direkt aus einem Controller zurück. Drei Gründe: Jede Umbenennung eines Feldes verändert stillschweigend deine öffentliche API; lazy geladene Beziehungen lösen beim Serialisieren unkontrolliert Nachladungen aus oder werfen eine LazyInitializationException; und interne Felder wie Passwort-Hashes landen versehentlich in der Antwort. Eigene DTOs sind etwas Tipparbeit und ersparen dir alle drei Probleme.

## Kontrollfragen

**1. Welchen Statuscode liefert ein erfolgreiches POST zum Anlegen üblicherweise?**

- [ ] 200
- [x] 201 mit Location-Header
- [ ] 204

*Erklärung:* 201 Created signalisiert eine neue Ressource; der Location-Header nennt ihre URL.

**2. Warum sollten JPA-Entities nicht direkt als API-Antwort dienen?**

- [ ] Sie sind zu groß
- [x] Interne Änderungen verändern die API, Lazy-Beziehungen und sensible Felder machen Probleme
- [ ] Jackson kann sie nicht lesen

*Erklärung:* Eine eigene DTO-Schicht entkoppelt internes Modell und veröffentlichte Schnittstelle.
