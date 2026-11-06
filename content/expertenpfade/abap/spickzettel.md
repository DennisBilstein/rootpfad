# Spickzettel – ABAP Expertenpfad

## Pseudocode-Konventionen (AP1)

| Konzept | Notation |
| --- | --- |
| Zuweisung | <- oder := |
| Verzweigung | IF ... THEN ... ELSE ... ENDIF |
| Zählschleife | FOR i <- 1 TO n DO ... ENDFOR |
| Kopfgesteuerte Schleife | WHILE ... DO ... ENDWHILE |
| Fußgesteuerte Schleife | REPEAT ... UNTIL |
| Funktion | FUNCTION name(param) ... RETURN wert ENDFUNCTION |
| Ein-/Ausgabe | READ/INPUT, WRITE/OUTPUT |

Kein einheitlicher Standard — das Syntax-Beiblatt der jeweiligen Prüfung ist maßgeblich. Logik zählt mehr als exakte Syntax.

## ER-Modell & Normalisierung

| Begriff | Bedeutung |
| --- | --- |
| 1NF | Nur atomare Werte, keine Wiederholungsgruppen |
| 2NF | 1NF + volle funktionale Abhängigkeit vom gesamten Schlüssel |
| 3NF | 2NF + keine transitiven Abhängigkeiten |
| n:m-Beziehung | Wird immer über eine Verknüpfungstabelle aufgelöst |

## SQL: JOINs & DDL/DML/DCL

| JOIN | Ergebnis |
| --- | --- |
| INNER JOIN | Nur Zeilen mit Treffer auf beiden Seiten |
| LEFT OUTER JOIN | Alle Zeilen links, rechts NULL falls kein Treffer |
| CROSS JOIN | Kartesisches Produkt (jede Zeile mit jeder) |

| Kategorie | Befehle |
| --- | --- |
| DDL | CREATE, ALTER, DROP |
| DML | SELECT, INSERT, UPDATE, DELETE |
| DCL | GRANT, REVOKE |

## UML-Beziehungen

| Beziehung | ABAP-Äquivalent |
| --- | --- |
| Vererbung (Generalisierung) | INHERITING FROM |
| Realisierung | INTERFACES |
| Komposition | Existenzabhängiges "hat-ein" |
| Aggregation | Unabhängiges "hat-ein" |

## Moderne ABAP-Ausdrücke

ABAPKopieren

```
DATA(x)      = 5.                          " Inline Declaration
DATA(text)   = |Wert: { x }|.               " String-Template
DATA(status) = COND string( WHEN x > 0 THEN 'pos' ELSE 'neg' ).
DATA(subset) = FILTER #( itab WHERE feld = 'X' ).
DATA(sum)    = REDUCE i( INIT s = 0 FOR row IN itab NEXT s = s + row-betrag ).
DATA(row)    = VALUE #( itab[ id = 1 ] OPTIONAL ).
```

## Interne Tabellentypen

| Typ | Zugriff | Einsatz |
| --- | --- | --- |
| STANDARD TABLE | Index O(1), Schlüssel O(n) | Sequentielle Verarbeitung |
| SORTED TABLE | Index O(1), Schlüssel O(log n) | Bereichsabfragen |
| HASHED TABLE | Nur Schlüssel, O(1) | Große Nachschlagetabellen |

## CDS & RAP Grundgerüst

CDSKopieren

```
@AccessControl.authorizationCheck: #CHECK
define view entity ZI_Beispiel as select from db_tabelle
{ key id, name, betrag }
```

RAP Behavior DefinitionKopieren

```
managed implementation in class zbp_i_beispiel unique;
strict ( 2 );

define behavior for ZI_Beispiel alias Beispiel
persistent table db_tabelle
lock master
etag master LastChangedAt
authorization master ( instance )
{
  create; update; delete;
  mapping for db_tabelle { id = id; name = name; betrag = betrag; }
}
```

## Fiori-Elements-Annotationen

| Annotation | Wirkung |
| --- | --- |
| @UI.lineItem | Spalte in der Listenansicht |
| @UI.selectionField | Filterfeld in der Filterleiste |
| @UI.facet | Abschnitt auf der Object Page |
| @Consumption.valueHelpDefinition | Value Help über eine Assoziation |

## Werkzeuge & Betrieb

| Werkzeug | Zweck |
| --- | --- |
| ADT (Eclipse) | Moderne Entwicklungsumgebung |
| ATC | Statische Codequalitäts-/Sicherheitsprüfung |
| ABAP Unit | Automatisierte funktionale Tests |
| SAT | Laufzeitanalyse eines Programmlaufs |
| ST05 | SQL-Trace für Datenbankzugriffe |
| ST22 / STAD | Dump-Analyse / systemweite Workload-Analyse |
| abapGit / gCTS | Versionskontrolle für ABAP-Entwicklungsobjekte |
