# ABAP SQL: Nur benötigte Daten lesen und Leistung prüfen

Modul: abap-m9 · 22 Minuten

ABAP SQL liest Daten aus einer Datenquelle in ABAP-Datenobjekte. Eine Datenbanktabelle ist dauerhaft gespeichert, die Ergebnistabelle im Programm dagegen eine interne Tabelle. Lege vor jeder Abfrage fest: Welche Zeilen brauche ich, welche Spalten benötige ich und muss eine Reihenfolge garantiert sein? Diese Fragen sind wichtiger als möglichst kurze Syntax.

Im Beispiel suchen wir Flugverbindungen des Carriers 'LH' und benötigen nur carrier_id und connection_id. Die Feldliste begrenzt die Spalten, WHERE begrenzt die Zeilen und ORDER BY definiert die Reihenfolge. Das @ vor carrier kennzeichnet eine ABAP-Hostvariable innerhalb der SQL-Anweisung. INTO TABLE @DATA(verbindungen) legt die Ergebnistabelle mit einem aus der Auswahl abgeleiteten Zeilentyp an. Kein Treffer ist eine mögliche leere Ergebnismenge, nicht automatisch ein technischer Fehler.

Die Datenquelle /dmo/connection gehört zu einem SAP-Demomodell und ist nicht auf jedem System vorhanden oder für jede Sprachversion nutzbar. Prüfe Definition, verfügbare Daten und zulässigen Zugriff im eigenen Übungssystem. Die Abfrage ist ein Lernbeispiel und keine Zusage, dass zwei bestimmte Verbindungen existieren. Du brauchst hier keinerlei schreibenden Datenbankzugriff.

Praxisaufgabe: Erkläre auf Papier, weshalb SELECT * ohne WHERE mehr Daten übertragen kann als die gezeigte Auswahl. Suche anschließend in einem vorhandenen Programm nach SELECT innerhalb einer LOOP-Schleife und beschreibe die mögliche Zahl wiederholter Zugriffe. Ersetze solche Stellen nicht blind: Sammellesezugriffe oder Joins müssen dieselbe fachliche Ergebnismenge liefern. Miss Verbesserungen mit passenden Trace- oder Profiling-Werkzeugen und realistischen Daten; eine garantierte Beschleunigung lässt sich aus der Syntax allein nicht ableiten.

```abap
" Voraussetzung: /DMO/CONNECTION ist vorhanden und zugreifbar.
" Methodenrumpf einer ADT-Konsolenklasse.
DATA carrier TYPE /dmo/carrier_id VALUE 'LH'.
SELECT FROM /dmo/connection
  FIELDS carrier_id, connection_id
  WHERE carrier_id = @carrier
  ORDER BY connection_id
  INTO TABLE @DATA(verbindungen).
out->write( verbindungen ).
```

## Kontrollfragen

### Welche Klausel begrenzt im Beispiel die gelesenen Zeilen?

- [ ] FIELDS
- [x] WHERE
- [ ] INTO TABLE

WHERE carrier_id = @carrier filtert die Zeilen. FIELDS begrenzt die ausgewählten Spalten.

### Was ist eine sinnvolle erste Untersuchung bei SQL in einer großen Schleife?

- [x] Prüfen, ob benötigte Daten gesammelt gelesen werden können
- [ ] Jeden SELECT durch SELECT * ersetzen
- [ ] Ohne Messung eine feste Beschleunigung versprechen

Wiederholte Einzelzugriffe können vermeidbar sein. Eine Umstellung muss fachlich gleichwertig sein und anschließend gemessen werden.

## Quellen und Zugang

- [SAP-samples: ABAP Performance Notes](https://raw.githubusercontent.com/SAP-samples/abap-cheat-sheets/main/32_Performance_Notes.md): Kostenlos öffentlich lesbar; konkrete Trace-Werkzeuge und SQL-Ausführung erfordern Systemzugang und gegebenenfalls Berechtigungen.
- [SAP Learning: Deepening Your ABAP Programming Knowledge](https://learning.sap.com/courses/deepening-your-abap-programming-knowledge): Kursübersicht kostenlos gelesen; behandelt unter anderem Code Pushdown, Joins und interne Tabellen. Vertiefung nach dem Basiskurs, kein zugesicherter freier Systemzugang.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
