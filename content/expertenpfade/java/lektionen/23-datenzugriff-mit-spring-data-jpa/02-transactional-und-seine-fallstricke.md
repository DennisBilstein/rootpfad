# @Transactional und seine Fallstricke

*Datenzugriff mit Spring Data JPA · ca. 10 Min.*

`@Transactional` setzt die Transaktionsgrenze — üblicherweise am **Service**, nicht am Repository, weil erst die Geschäftsoperation die fachliche Einheit bildet (Modul 17).

Drei Fallstricke, die regelmäßig Datenverlust oder unerwartetes Verhalten verursachen:

-   **Selbstaufruf** — Spring wickelt die Bean in einen Proxy. Ruft eine Methode eine andere annotierte Methode *derselben* Klasse direkt auf, läuft der Aufruf am Proxy vorbei, und die Annotation wirkt nicht.
-   **Rollback-Regeln** — standardmäßig rollt Spring nur bei *unchecked* Exceptions zurück. Eine Checked Exception lässt die Transaktion committen, sofern du nicht `rollbackFor` angibst.
-   **Nur public** — an privaten oder paketsichtbaren Methoden hat die Annotation keine Wirkung (beim Standard-Proxy-Mechanismus).

`@Transactional(readOnly = true)` an Lesemethoden erlaubt Optimierungen und verhindert versehentliche Schreibzugriffe.

```java
@Service
public class BestellService {

    @Transactional(readOnly = true)
    public Optional<BestellDto> finde(long id) { ... }

    @Transactional(rollbackFor = FachlicheException.class)
    public void abschliessen(long id) throws FachlicheException { ... }

    // FALLE: interner Aufruf umgeht den Proxy — keine neue Transaktion!
    public void verarbeiteAlle(List<Long> ids) {
        ids.forEach(this::verarbeiteEine);      // @Transactional wirkt hier NICHT
    }
    @Transactional
    public void verarbeiteEine(long id) { ... }
}
```

> **Tipp:** Der Selbstaufruf-Fallstrick ist besonders heimtückisch, weil der Code offensichtlich richtig aussieht: Die Annotation steht da, sie ist korrekt geschrieben — und wirkt trotzdem nicht. Die Lösung ist keine Trickserei mit Selbstinjektion, sondern besseres Design: Verschiebe die transaktionale Methode in eine eigene Bean. Dann läuft der Aufruf über den Proxy, und die Verantwortlichkeiten sind zusätzlich sauberer getrennt.

## Kontrollfragen

**1. Warum wirkt @Transactional bei einem Aufruf innerhalb derselben Klasse nicht?**

- [ ] Wegen fehlender Rechte
- [x] Weil der Aufruf am Spring-Proxy vorbeigeht
- [ ] Weil die Methode zu kurz ist

*Erklärung:* Nur Aufrufe über den Proxy von außen aktivieren den Transaktionsinterzeptor.

**2. Bei welchen Exceptions rollt Spring standardmäßig zurück?**

- [ ] Bei allen
- [x] Nur bei unchecked Exceptions (RuntimeException)
- [ ] Nur bei checked Exceptions

*Erklärung:* Für Checked Exceptions muss rollbackFor gesetzt werden.
