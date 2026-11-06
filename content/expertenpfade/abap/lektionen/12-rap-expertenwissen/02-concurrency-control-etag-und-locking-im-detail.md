# Concurrency Control: ETag & Locking im Detail

*RAP Expertenwissen · ca. 8 Min.*

**Optimistic Concurrency Control** (`etag master <feld>` in der Behavior Definition, oft ein Zeitstempelfeld mit `@Semantics.systemDateTime.lastChangedAt: true`) verhindert verlorene Änderungen ohne dauerhafte Sperre: beim Update wird geprüft, ob sich der ETag seit dem letzten Lesen geändert hat.

**Pessimistic Locking** (`lock master`, klassisches Enqueue) sperrt einen Datensatz dagegen sofort und exklusiv für die Dauer der Bearbeitung.

```abap
define behavior for ZI_Order alias Order
persistent table zorder
lock master
etag master LastChangedAt
...
```

> **Tipp:** Optimistic Concurrency ist der Standardfall in modernen, Fiori-basierten Apps, weil Nutzer Datensätze oft minutenlang offen lassen, ohne aktiv zu arbeiten — eine dauerhafte Sperre würde das System für andere blockieren. Pessimistic Locking bleibt für kurze, kritische Transaktionen relevant.

## Kontrollfragen

**1. Was prüft Optimistic Concurrency Control beim Speichern?**

- [x] Ob sich der ETag seit dem letzten Lesen geändert hat
- [ ] Ob der Nutzer berechtigt ist
- [ ] Ob die Datenbank verfügbar ist

*Erklärung:* Ein geänderter ETag signalisiert eine zwischenzeitliche fremde Änderung — der Save wird abgelehnt.

**2. Wann ist Pessimistic Locking eher angebracht als Optimistic Concurrency?**

- [x] Bei kurzen, kritischen Transaktionen mit exklusivem Zugriffsbedarf
- [ ] Immer, unabhängig vom Szenario
- [ ] Nur bei reinen Leseoperationen

*Erklärung:* Für kurze, kritische Vorgänge (z.B. Bestandsbuchungen) ist eine exklusive Sperre oft sinnvoller.
