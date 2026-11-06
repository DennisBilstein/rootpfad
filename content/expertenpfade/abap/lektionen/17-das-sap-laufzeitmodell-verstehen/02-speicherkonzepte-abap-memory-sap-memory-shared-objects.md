# Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects

*Das SAP-Laufzeitmodell verstehen · ca. 8 Min.*

ABAP kennt mehrere Speicherbereiche mit sehr unterschiedlicher Lebensdauer — eine klassische Fehlerquelle und eine ebenso klassische Bewerbungsfrage.

| Bereich | Gültigkeit | Zugriff |
| --- | --- | --- |
| Interne Session | Aktuelles Programm | Normale Variablen |
| ABAP Memory | Aufrufkette (Call Stack) eines Modus | EXPORT/IMPORT TO MEMORY ID |
| SAP Memory | Alle Modi einer Benutzersitzung | SET/GET PARAMETER ID |
| Shared Objects | Übergreifend im Applikationsserver | Shared-Memory-Area-Klassen |
| Datenbank | Dauerhaft, systemweit | Open SQL |

**Shared Objects** sind das richtige Werkzeug für teure, selten wechselnde Daten (z. B. eine aufwändig aufgebaute Preistabelle), die viele Nutzer gleichzeitig lesen. Sie ersetzen jedoch keinen Datenbankpuffer und sind an einen Applikationsserver gebunden — bei mehreren Servern hält jeder seine eigene Kopie.

```abap
" ABAP Memory: innerhalb derselben Aufrufkette
EXPORT lt_daten TO MEMORY ID 'ZMY_DATA'.
SUBMIT z_report AND RETURN.
IMPORT lt_daten FROM MEMORY ID 'ZMY_DATA'.

" SAP Memory: benutzerweit, klassisch fuer Vorschlagswerte
SET PARAMETER ID 'BUK' FIELD '1000'.   " Buchungskreis vorbelegen
GET PARAMETER ID 'BUK' FIELD lv_bukrs.
```

> **Tipp:** Ein Muster, das man in gewachsenen Systemen ständig findet: Daten werden über EXPORT TO MEMORY zwischen Programmen geschmuggelt, statt sie sauber als Parameter zu übergeben. Das funktioniert — bis jemand die Aufrufreihenfolge ändert und der Speicher leer ist. Wenn du eine Wahl hast: Schnittstelle statt Speicher-ID. In ABAP Cloud ist diese Abkürzung ohnehin versperrt.

## Kontrollfragen

**1. Wie weit reicht das ABAP Memory?**

- [ ] Über die gesamte Benutzersitzung inklusive aller Modi
- [x] Über die Aufrufkette (Call Stack) innerhalb eines Modus
- [ ] Über alle Applikationsserver hinweg

*Erklärung:* ABAP Memory (EXPORT/IMPORT TO MEMORY ID) gilt innerhalb der Aufrufkette eines Modus; SAP Memory (SET/GET PARAMETER) dagegen sitzungsweit.

**2. Wofür eignen sich Shared Objects?**

- [x] Für teure, selten wechselnde Daten, die viele Nutzer gleichzeitig lesen
- [ ] Als Ersatz für Datenbanktabellen
- [ ] Für die Übergabe von Werten an ein einzelnes Unterprogramm

*Erklärung:* Shared Objects halten aufwändig aufgebaute Daten im Applikationsserver-Speicher bereit — pro Server allerdings jeweils eine eigene Kopie.
