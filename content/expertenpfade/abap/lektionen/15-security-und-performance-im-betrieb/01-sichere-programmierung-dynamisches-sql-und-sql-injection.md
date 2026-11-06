# Sichere Programmierung: Dynamisches SQL & SQL-Injection

*Security & Performance im Betrieb · ca. 8 Min.*

Dynamisches Open SQL (Tabellennamen/WHERE-Bedingungen zur Laufzeit aus Variablen zusammengesetzt) birgt ein **SQL-Injection-Risiko**, wenn Nutzereingaben ungeprüft eingebaut werden. Gegenmaßnahmen: statisches SQL bevorzugen wo möglich; bei dynamischem SQL Eingaben immer über echte Host-Variablen/Parameter statt String-Konkatenation einbinden; Freigabelisten (Whitelists) für dynamische Tabellennamen statt Nutzereingaben direkt zu verwenden.

```abap
" Riskant: Nutzereingabe direkt in dynamische Bedingung konkateniert
DATA(where_clause) = |name = '{ iv_user_input }'|.

" Sicher: Eingabe als echter Parameter, nicht als String-Teil
SELECT * FROM customer WHERE name = @iv_user_input INTO TABLE @DATA(result).
```

> **Tipp:** Der entscheidende Unterschied ist nicht "dynamisch vs. statisch", sondern ob Nutzereingaben als DATEN (Parameter) oder als CODE (String-Bestandteil der Abfrage selbst) behandelt werden — dieselbe Grundregel wie in jeder anderen Sprache mit SQL-Anbindung.

## Kontrollfragen

**1. Worin besteht das SQL-Injection-Risiko bei dynamischem Open SQL?**

- [x] Ungeprüfte Nutzereingaben werden als Teil der SQL-Abfrage selbst statt als Parameter eingebaut
- [ ] Die Datenbank ist zu langsam
- [ ] Es gibt kein Risiko in ABAP

*Erklärung:* Wird Nutzereingabe als String-Teil der Abfrage behandelt, kann sie die Abfragelogik manipulieren.

**2. Was ist die sicherere Alternative zur String-Konkatenation von Nutzereingaben in SQL?**

- [x] Eingaben als echte Host-Variablen/Parameter übergeben
- [ ] Eingaben einfach länger machen
- [ ] Eingaben in Großbuchstaben umwandeln

*Erklärung:* Parameter werden vom SQL-Interpreter als Daten, nicht als Code behandelt.
