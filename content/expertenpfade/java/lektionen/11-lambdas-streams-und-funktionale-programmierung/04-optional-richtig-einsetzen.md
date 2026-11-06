# Optional richtig einsetzen

*Lambdas, Streams & funktionale Programmierung · ca. 7 Min.*

`Optional<T>` macht im Typ sichtbar, dass ein Wert fehlen darf — statt dies dem Aufrufer über eine Kommentarzeile oder gar nicht mitzuteilen.

**Richtig eingesetzt** als *Rückgabetyp* von Methoden, die legitim nichts finden können. **Nicht** als Feld, nicht als Parameter und nicht in Collections — dort erzeugt es nur Verpackungsaufwand.

```java
// Antipattern: isPresent + get — nur umständliches null-Handling
Optional<Kunde> k = repo.findByNummer(nr);
if (k.isPresent()) { return k.get().name(); } else { return "unbekannt"; }

// Idiomatisch: als Kette
return repo.findByNummer(nr)
        .map(Kunde::name)
        .orElse("unbekannt");

// Alternative Enden
kunde.orElseGet(() -> ladeStandardKunden());        // lazy, nur bei Bedarf
kunde.orElseThrow(() -> new KundeNichtGefunden(nr));
kunde.ifPresentOrElse(this::verarbeite, this::meldeFehlend);
```

> **Tipp:** Der Unterschied zwischen orElse und orElseGet wird ständig übersehen: orElse(teureBerechnung()) wertet das Argument IMMER aus — auch dann, wenn der Optional gefüllt ist und das Ergebnis gar nicht gebraucht wird. orElseGet(() -> teureBerechnung()) ruft die Funktion nur im Bedarfsfall auf. Bei einer Datenbankabfrage als Fallback ist das kein Stilfrage, sondern ein echter Performancefehler.

## Kontrollfragen

**1. Wofür ist Optional gedacht?**

- [ ] Als Feldtyp in Entitäten
- [x] Als Rückgabetyp für Methoden, die legitim nichts finden können
- [ ] Als Ersatz für alle Collections

*Erklärung:* Als Feld oder Parameter bringt Optional nur Overhead ohne echten Nutzen.

**2. Was unterscheidet orElse von orElseGet?**

- [ ] Kein Unterschied
- [x] orElse wertet sein Argument immer aus, orElseGet nur bei leerem Optional
- [ ] orElseGet wirft eine Exception

*Erklärung:* Bei teuren Fallbacks ist das ein spürbarer Unterschied.
