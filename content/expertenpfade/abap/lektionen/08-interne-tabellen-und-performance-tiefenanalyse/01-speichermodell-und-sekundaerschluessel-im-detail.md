# Speichermodell & Sekundärschlüssel im Detail

*Interne Tabellen & Performance-Tiefenanalyse · ca. 9 Min.*

Interne Tabellen erlauben neben dem Primärschlüssel zusätzliche **Sekundärschlüssel**: ein `SORTED KEY` für Bereichsabfragen (O(log n)), ein `HASHED KEY` für exakten Zugriff (O(1)) — beide zusätzlich zur ursprünglichen Einfügereihenfolge der STANDARD TABLE. Mit `USING KEY` wird gezielt ein bestimmter Schlüssel für den Zugriff erzwungen.

**Übergabesemantik bei Methodenparametern:** Anders als bei klassischen Funktionsbausteinen (IMPORTING standardmäßig *by value*) werden IMPORTING-Parameter bei **Methoden standardmäßig by reference** übergeben — keine Kopie. Erst `VALUE(param)` erzwingt eine echte Kopie.

```abap
TYPES tt_orders TYPE STANDARD TABLE OF ty_order
  WITH NON-UNIQUE KEY customer_id
  WITH NON-UNIQUE SORTED KEY by_date COMPONENTS order_date.

" Methode: Standardmäßig BY REFERENCE (keine Kopie)
METHODS process_large_table
  IMPORTING it_data TYPE tt_orders.

" Explizite Kopie erzwingen (selten nötig, kostet bei großen Tabellen Performance)
METHODS process_copy
  IMPORTING VALUE(it_data) TYPE tt_orders.
```

> **Tipp:** Ein bekannter Stolperstein: Funktionsbausteine (IMPORTING standardmäßig by value) und Methoden (IMPORTING standardmäßig by reference) verhalten sich hier UNTERSCHIEDLICH. Bei der Migration von altem Funktionsbaustein-Code zu Methoden übersehen selbst erfahrene Entwickler gelegentlich diesen Unterschied.

## Kontrollfragen

**1. Wie werden IMPORTING-Parameter bei ABAP-OO-Methoden standardmäßig übergeben?**

- [ ] By value (Kopie)
- [x] By reference (ohne Kopie), sofern nicht VALUE() angegeben ist
- [ ] Zufällig, je nach Systemlast

*Erklärung:* Das unterscheidet Methoden von klassischen Funktionsbausteinen, bei denen IMPORTING standardmäßig by value läuft.

**2. Wofür eignet sich ein SORTED-Sekundärschlüssel besonders?**

- [x] Für Bereichsabfragen/sortierten Zugriff auf eine sonst unsortierte STANDARD TABLE
- [ ] Für zufälligen Zugriff ohne jede Ordnung
- [ ] Nur für HASHED TABLEs

*Erklärung:* Ein sortierter Sekundärschlüssel ermöglicht effiziente Bereichsabfragen (z.B. WHERE datum >= ...) mit O(log n).
