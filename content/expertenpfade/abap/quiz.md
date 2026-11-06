# Quiz & Karteikarten – ABAP Expertenpfad

Lektionsfragen stehen zusätzlich am Ende jeder Lektion. Richtige Antwort ist mit [x] markiert.

## Modul 1: Pseudocode, Algorithmen & die Brücke zu ABAP

**• Was bewertet die IHK bei Pseudocode-Aufgaben primär?**

- [ ] Exakte Syntax nach einem festen Standard
- [x] Die Logik/Korrektheit des Algorithmus
- [ ] Die Zeilenanzahl

*Erklärung:* Ein Syntax-Beiblatt liegt der Prüfung bei — Syntaxfehler werden toleriert, solange die Logik stimmt.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welche drei Bausteine bilden den Kern der strukturierten Programmierung?**

- [x] Sequenz, Verzweigung, Wiederholung
- [ ] Vererbung, Polymorphie, Kapselung
- [ ] Variable, Konstante, Funktion

*Erklärung:* Jeder Algorithmus lässt sich aus diesen drei Grundbausteinen zusammensetzen — die Basis auch für Struktogramme.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welches Symbol steht im Programmablaufplan für eine Entscheidung?**

- [ ] Rechteck
- [x] Raute
- [ ] Oval

*Erklärung:* Die Raute markiert eine Verzweigung/Entscheidung im PAP; Rechtecke sind Verarbeitungsschritte, Ovale Start/Ende.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Was ist ein struktureller Vorteil von Struktogrammen gegenüber freien Flussdiagrammen?**

- [ ] Sie sind schneller zu zeichnen
- [x] Sie erzwingen strukturierte Programmierung, da keine Sprungpfeile möglich sind
- [ ] Sie ersetzen Pseudocode vollständig

*Erklärung:* Ohne Sprungpfeile lässt sich unstrukturierter GOTO-Code in einem Struktogramm gar nicht erst darstellen.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Welches ABAP-Konstrukt entspricht am ehesten FOR EACH ... IN ... DO im Pseudocode?**

- [x] LOOP AT itab INTO/ASSIGNING
- [ ] SELECT ... FROM
- [ ] WHILE sy-subrc = 0

*Erklärung:* LOOP AT durchläuft eine interne Tabelle analog zu FOR EACH im Pseudocode.

*Lektion: Vom Pseudocode zu ABAP: durchgerechnete Beispiele*

---

**• Was unterscheidet die wörtliche von der idiomatischen ABAP-Übersetzung?**

- [ ] Es gibt keinen Unterschied
- [x] Wörtlich folgt Schritt für Schritt dem Pseudocode, idiomatisch nutzt moderne ABAP-Ausdrücke wie REDUCE
- [ ] Idiomatischer Code ist immer langsamer

*Erklärung:* Beide Varianten sind funktional gleichwertig — idiomatisches ABAP ist nur kompakter zu lesen und zu schreiben.

*Lektion: Vom Pseudocode zu ABAP: durchgerechnete Beispiele*

---

**• Welche Komplexitätsklasse hat eine einzelne Schleife über n Elemente?**

- [ ] O(1)
- [x] O(n)
- [ ] O(n²)

*Erklärung:* Eine einfache Schleife durchläuft jedes der n Elemente genau einmal — lineare Laufzeit O(n).

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Welche ABAP-Tabellenart passt zur Komplexitätsklasse O(1) beim Schlüsselzugriff?**

- [ ] STANDARD TABLE
- [ ] SORTED TABLE
- [x] HASHED TABLE

*Erklärung:* HASHED TABLE bietet konstanten Zugriff über den Schlüssel, unabhängig von der Tabellengröße.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Ein Algorithmus muss laut Definition unter anderem endlich sein. Was bedeutet das?**

- [ ] Er darf höchstens 100 Zeilen haben
- [x] Er muss nach endlich vielen Schritten terminieren
- [ ] Er darf keine Schleifen enthalten

*Erklärung:* Endlichkeit meint die Terminierung: Der Algorithmus kommt nach endlich vielen Schritten zu einem Ende.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welches PAP-Symbol steht für Ein- und Ausgabe?**

- [ ] Rechteck
- [x] Parallelogramm
- [ ] Oval

*Erklärung:* Das Parallelogramm markiert Ein-/Ausgabe; das Rechteck steht für Verarbeitung, das Oval für Start und Ende.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Eine Schleife läuft von 1 bis n, darin eine zweite von 1 bis n. Welche Komplexität?**

- [ ] O(n)
- [x] O(n²)
- [ ] O(log n)

*Erklärung:* Zwei ineinander verschachtelte Schleifen über dieselbe Menge ergeben quadratische Laufzeit.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Wie viele Schritte braucht die binäre Suche bei 1024 sortierten Elementen maximal?**

- [ ] 1024
- [x] Etwa 10
- [ ] Etwa 32

*Erklärung:* log₂(1024) = 10 — jede Halbierung entfernt die Hälfte des Suchraums.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

## Modul 2: Datenmodellierung: ER-Modell & Normalisierung

**• Wie wird eine n:m-Beziehung bei der Tabellenumsetzung aufgelöst?**

- [ ] Gar nicht, n:m ist technisch nicht möglich
- [x] Über eine eigene Verknüpfungstabelle mit Fremdschlüsseln zu beiden Seiten
- [ ] Durch Duplizieren aller Felder in beide Tabellen

*Erklärung:* Die Verknüpfungstabelle trägt die Fremdschlüssel beider Entitäten und bildet damit die n:m-Beziehung ab.

*Lektion: Entity-Relationship-Modell: Entitäten & Kardinalitäten*

---

**• Was beschreibt eine Kardinalität?**

- [ ] Die Anzahl der Attribute einer Entität
- [x] Wie viele Instanzen einer Entität mit wie vielen einer anderen verknüpft sein dürfen
- [ ] Den Datentyp eines Attributs

*Erklärung:* Kardinalitäten (1:1, 1:n, n:m) regeln die zulässige Anzahl verknüpfter Instanzen auf beiden Seiten der Beziehung.

*Lektion: Entity-Relationship-Modell: Entitäten & Kardinalitäten*

---

**• Was verhindert speziell die 2NF?**

- [ ] Transitive Abhängigkeiten
- [x] Teilabhängigkeiten von einem zusammengesetzten Schlüssel
- [ ] Nicht-atomare Werte

*Erklärung:* 2NF fordert volle funktionale Abhängigkeit vom gesamten Primärschlüssel — keine Teilabhängigkeit von nur einem Teil eines zusammengesetzten Schlüssels.

*Lektion: Normalisierung 1NF bis 3NF*

---

**• Was ist eine transitive Abhängigkeit (relevant für 3NF)?**

- [ ] Ein Attribut hängt vom Primärschlüssel ab
- [x] Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut statt direkt vom Schlüssel ab
- [ ] Zwei Tabellen referenzieren sich gegenseitig

*Erklärung:* 3NF verbietet genau diese indirekte Abhängigkeit über ein anderes Nicht-Schlüsselattribut.

*Lektion: Normalisierung 1NF bis 3NF*

---

**• Wozu dient das MANDT-Feld (client)?**

- [x] Trennt logisch getrennte Mandanten innerhalb derselben technischen Datenbank
- [ ] Speichert das Erstellungsdatum
- [ ] Ist ein Performance-Index

*Erklärung:* MANDT ist die zentrale Mandantentrennung in SAP-Systemen — meist das erste Schlüsselfeld jeder mandantenabhängigen Tabelle.

*Lektion: Vom ER-Modell zur ABAP-Datenbanktabelle (DDIC)*

---

**• Was entspricht einer ER-Beziehung in der technischen DDIC-Umsetzung?**

- [ ] Ein Index
- [x] Ein Fremdschlüssel (Foreign Key) mit Prüftabelle
- [ ] Eine Domäne

*Erklärung:* Fremdschlüssel mit Prüftabelle bilden die referenzielle Integrität der fachlichen Beziehung technisch ab.

*Lektion: Vom ER-Modell zur ABAP-Datenbanktabelle (DDIC)*

---

**• Was ist ein Fremdschlüssel?**

- [x] Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist
- [ ] Ein verschlüsseltes Feld
- [ ] Der Primärschlüssel einer temporären Tabelle

*Erklärung:* Der Fremdschlüssel setzt die referenzielle Integrität einer ER-Beziehung technisch um.

*Lektion: Entity-Relationship-Modell: Entitäten & Kardinalitäten*

---

**• Eine Tabelle enthält die Spalten Bestellnr, Position, Produktname, Produktgewicht. Wogegen verstößt sie?**

- [ ] Gegen die 1NF
- [x] Gegen die 2NF, da Produktdaten nur von der Position abhängen
- [ ] Gegen gar keine Normalform

*Erklärung:* Produktname und -gewicht hängen nicht vom vollständigen Schlüssel (Bestellnr + Position) ab — klassische Teilabhängigkeit.

*Lektion: Normalisierung 1NF bis 3NF*

## Modul 3: SQL-Grundlagen vertieft

**• Zu welcher SQL-Kategorie gehört CREATE TABLE?**

- [ ] DML
- [x] DDL
- [ ] DCL

*Erklärung:* CREATE definiert Struktur — das ist Data Definition Language.

*Lektion: DDL/DML/DCL im Überblick*

---

**• Welcher ABAP-Mechanismus entspricht am ehesten DCL?**

- [x] PFCG-Rollen/Berechtigungsobjekte
- [ ] Interne Tabellen
- [ ] CDS-Assoziationen

*Erklärung:* Berechtigungssteuerung in ABAP läuft über Berechtigungsobjekte und PFCG-Rollen — das DCL-Äquivalent.

*Lektion: DDL/DML/DCL im Überblick*

---

**• Was liefert ein LEFT OUTER JOIN zusätzlich gegenüber einem INNER JOIN?**

- [ ] Nur Zeilen mit Treffer auf beiden Seiten
- [x] Zeilen der linken Tabelle ohne Treffer rechts, mit NULL aufgefüllt
- [ ] Doppelte Zeilen bei jedem Treffer

*Erklärung:* LEFT OUTER JOIN behält alle linken Zeilen, auch ohne passenden rechten Partner.

*Lektion: JOIN-Typen im Detail*

---

**• Was erzeugt ein CROSS JOIN?**

- [x] Das kartesische Produkt beider Tabellen
- [ ] Nur eindeutige Zeilenpaare
- [ ] Eine leere Ergebnismenge

*Erklärung:* CROSS JOIN verknüpft jede Zeile der einen mit jeder Zeile der anderen Tabelle — ohne Bedingung.

*Lektion: JOIN-Typen im Detail*

---

**• Was ist der Unterschied zwischen WHERE und HAVING?**

- [ ] Kein Unterschied, beide sind austauschbar
- [x] WHERE filtert vor der Aggregation einzelne Zeilen, HAVING filtert nach der Aggregation Gruppen
- [ ] HAVING ist nur bei INSERT erlaubt

*Erklärung:* HAVING kann sich auf Aggregatfunktionen wie COUNT(*) beziehen, WHERE nicht — weil WHERE vor der Gruppierung ausgewertet wird.

*Lektion: Subqueries, Aggregatfunktionen, GROUP BY/HAVING*

---

**• Welche Aggregatfunktion zählt die Anzahl der Zeilen?**

- [ ] SUM(*)
- [x] COUNT(*)
- [ ] AVG(*)

*Erklärung:* COUNT(*) zählt alle Zeilen einer Gruppe bzw. Ergebnismenge.

*Lektion: Subqueries, Aggregatfunktionen, GROUP BY/HAVING*

---

**• Was liefert ein INNER JOIN, wenn die rechte Tabelle leer ist?**

- [ ] Alle Zeilen der linken Tabelle
- [x] Eine leere Ergebnismenge
- [ ] Einen Fehler

*Erklärung:* Ohne Treffer auf beiden Seiten bleibt beim INNER JOIN nichts übrig.

*Lektion: JOIN-Typen im Detail*

---

**• Wie prüft man in SQL korrekt auf einen fehlenden Wert?**

- [ ] feld = NULL
- [x] feld IS NULL
- [ ] feld = ''

*Erklärung:* NULL ist kein Wert, sondern das Fehlen eines Werts — Vergleiche mit = liefern immer unbekannt.

*Lektion: Subqueries, Aggregatfunktionen, GROUP BY/HAVING*

## Modul 4: Vorgehensmodelle & Software-Lifecycle

**• Was ist ein zentrales Merkmal des Wasserfallmodells?**

- [ ] Kurze Sprints mit täglichen Meetings
- [x] Strikt sequenzielle Phasen ohne planmäßigen Rücksprung
- [ ] Kontinuierlicher Fluss ohne feste Phasen

*Erklärung:* Der Wasserfall durchläuft die Phasen einmal, streng nacheinander.

*Lektion: Wasserfall, V-Modell, Scrum/Kanban im Vergleich*

---

**• Welches Element gehört zu Scrum?**

- [ ] WIP-Limit
- [x] Sprint Backlog
- [ ] V-Modell-Meilenstein

*Erklärung:* Sprint Backlog ist ein zentrales Scrum-Artefakt; WIP-Limits gehören zu Kanban.

*Lektion: Wasserfall, V-Modell, Scrum/Kanban im Vergleich*

---

**• Wer erstellt üblicherweise das Lastenheft?**

- [x] Der Auftraggeber
- [ ] Der Auftragnehmer
- [ ] Die IHK

*Erklärung:* Das Lastenheft beschreibt die Anforderungen aus Sicht des Auftraggebers.

*Lektion: Lasten-/Pflichtenheft & Anforderungsanalyse*

---

**• Was ist ein Beispiel für eine nicht-funktionale Anforderung?**

- [ ] Der Nutzer kann eine Bestellung anlegen
- [x] Antwortzeit unter 200ms
- [ ] Berechnung der Mehrwertsteuer

*Erklärung:* Performance-Anforderungen sind klassisch nicht-funktional — sie beschreiben Qualitätseigenschaften, keine konkrete Funktion.

*Lektion: Lasten-/Pflichtenheft & Anforderungsanalyse*

---

**• Was begrenzt ein WIP-Limit in Kanban?**

- [x] Die Anzahl gleichzeitig in Arbeit befindlicher Aufgaben
- [ ] Die Länge eines Sprints
- [ ] Die Teamgröße

*Erklärung:* Work-in-Progress-Limits erzwingen Fokus und decken Engpässe im Fluss auf.

*Lektion: Wasserfall, V-Modell, Scrum/Kanban im Vergleich*

## Modul 5: UML für Anwendungsentwickler

**• Was verbindet <<include>> zwischen zwei Use Cases?**

- [ ] Ein optionaler Teilanwendungsfall
- [x] Ein immer mit ausgeführter Teilanwendungsfall
- [ ] Eine Vererbungsbeziehung

*Erklärung:* <<include>> markiert einen zwingend mit ausgeführten Bestandteil des Basis-Use-Case.

*Lektion: Use-Case-Diagramme lesen und erstellen*

---

**• Wo werden Akteure in einem Use-Case-Diagramm platziert?**

- [ ] Innerhalb der Systemgrenze
- [x] Außerhalb der Systemgrenze
- [ ] Es gibt keine Systemgrenze

*Erklärung:* Akteure stehen außerhalb des Systemrechtecks und interagieren von dort mit den Use Cases.

*Lektion: Use-Case-Diagramme lesen und erstellen*

---

**• Welche UML-Beziehung entspricht in ABAP INHERITING FROM?**

- [ ] Aggregation
- [x] Vererbung (Generalisierung)
- [ ] Assoziation

*Erklärung:* Vererbung wird in UML als Pfeil mit geschlossener Spitze dargestellt, in ABAP über INHERITING FROM umgesetzt.

*Lektion: Klassendiagramme: Notation & Beziehungstypen*

---

**• Was unterscheidet Komposition von Aggregation?**

- [ ] Kein Unterschied, nur andere Symbole
- [x] Bei Komposition ist der Teil existenzabhängig vom Ganzen, bei Aggregation nicht
- [ ] Komposition erlaubt keine Attribute

*Erklärung:* Die Existenzabhängigkeit ist das entscheidende Unterscheidungsmerkmal zwischen beiden "hat-ein"-Beziehungen.

*Lektion: Klassendiagramme: Notation & Beziehungstypen*

---

**• Was bedeutet die Multiplizität 1..* an einem Assoziationsende?**

- [ ] Genau ein Objekt
- [x] Mindestens eines, nach oben offen
- [ ] Höchstens eines

*Erklärung:* 1..* heißt: eins oder mehr, ohne Obergrenze.

*Lektion: Klassendiagramme: Notation & Beziehungstypen*

## Modul 6: Testtheorie & Qualitätssicherung

**• Was testet die Grenzwertanalyse gezielt?**

- [ ] Zufällige Werte innerhalb einer Klasse
- [x] Werte an den Rändern von Äquivalenzklassen
- [ ] Nur ungültige Eingaben

*Erklärung:* Fehler häufen sich an den Grenzen gültiger Bereiche — genau dort setzt die Grenzwertanalyse an.

*Lektion: Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse*

---

**• Was ist ein Merkmal von White-Box-Tests?**

- [x] Kenntnis der internen Codestruktur
- [ ] Vollständige Unkenntnis der Implementierung
- [ ] Nur manuelle Tests ohne Automatisierung

*Erklärung:* White-Box-Tests nutzen Wissen über den internen Aufbau, z. B. um Zweigüberdeckung zu messen.

*Lektion: Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse*

---

**• Welche Testart bildet laut Testpyramide die breite Basis?**

- [ ] End-to-End-Tests
- [x] Unit-Tests
- [ ] Manuelle Akzeptanztests

*Erklärung:* Unit-Tests sind schnell und zahlreich — sie bilden das Fundament der Pyramide.

*Lektion: Testpyramide & Testarten mit ABAP-Unit-Bezug*

---

**• Was gilt als Antipattern zur Testpyramide?**

- [ ] Viele Unit-Tests, wenige UI-Tests
- [x] Viele langsame UI-/End-to-End-Tests bei wenigen Unit-Tests (Ice-Cream-Cone)
- [ ] Automatisierte Tests generell

*Erklärung:* Das umgekehrte Verhältnis macht Tests langsam, teuer und schwer wartbar.

*Lektion: Testpyramide & Testarten mit ABAP-Unit-Bezug*

---

**• Ein Feld akzeptiert Werte von 18 bis 65. Welche Grenzwerte testest du?**

- [ ] Nur 18 und 65
- [x] 17, 18, 65, 66
- [ ] Nur 0 und 100

*Erklärung:* Die Grenzwertanalyse prüft jeweils direkt innerhalb und außerhalb der Bereichsgrenzen.

*Lektion: Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse*

## Modul 7: Syntax, Typsystem & moderne Sprachkonstrukte

**• Womit endet in ABAP jede einzelne Anweisung?**

- [ ] Mit einem Semikolon
- [x] Mit einem Punkt
- [ ] Mit einem Zeilenumbruch

*Erklärung:* Der Punkt schließt jede Anweisung ab — eine Anweisung darf sich dafür über beliebig viele Zeilen erstrecken.

*Lektion: Dein erstes ABAP-Programm*

---

**• Welches Interface macht eine Klasse in den ABAP Development Tools direkt per F9 ausführbar?**

- [x] IF_OO_ADT_CLASSRUN
- [ ] IF_AMDP_MARKER_HDB
- [ ] IF_SERIALIZABLE_OBJECT

*Erklärung:* IF_OO_ADT_CLASSRUN gibt die Methode main( ) vor und stellt über out->write( ) die Konsolenausgabe bereit — der moderne Ersatz für den klassischen Report mit WRITE.

*Lektion: Dein erstes ABAP-Programm*

---

**• Was passiert bei lo_b = lo_a für zwei Objektreferenzen?**

- [ ] Es entsteht eine unabhängige Kopie des Objekts
- [x] Beide Variablen referenzieren danach dasselbe Objekt im Speicher
- [ ] Ein Laufzeitfehler wird ausgelöst

*Erklärung:* Referenzvariablen kopieren nur den Verweis, nicht das referenzierte Objekt selbst.

*Lektion: Typsystem im Detail: Referenz- vs. Wertsemantik*

---

**• Welche Semantik haben elementare ABAP-Variablen standardmäßig?**

- [ ] Referenzsemantik
- [x] Wertsemantik (Kopie bei Zuweisung)
- [ ] Keine der beiden

*Erklärung:* Elementare Typen und Strukturen werden bei Zuweisung als vollständige Kopie übertragen.

*Lektion: Typsystem im Detail: Referenz- vs. Wertsemantik*

---

**• Wozu dient LET innerhalb eines Ausdrucks?**

- [ ] Definiert eine globale Konstante
- [x] Definiert eine lokale Hilfsvariable, gültig nur innerhalb dieses Ausdrucks
- [ ] Deklariert eine neue Tabelle

*Erklärung:* LET ... IN macht Zwischenwerte innerhalb eines VALUE/REDUCE/COND-Ausdrucks wiederverwendbar.

*Lektion: Moderne funktionale Konstrukte im Detail*

---

**• Welches Konstrukt baut aus einer Tabelle eine neue Tabelle mit transformierten Zeilen auf?**

- [ ] FILTER #( ... )
- [x] VALUE #( FOR ... IN ... ( ... ) )
- [ ] COND #( ... )

*Erklärung:* VALUE mit FOR-Iteration transformiert jede Zeile der Quelltabelle in eine neue Zielzeile.

*Lektion: Moderne funktionale Konstrukte im Detail*

---

**• Wozu dient RTTI?**

- [x] Typinformationen zur Laufzeit inspizieren
- [ ] Datenbanktransaktionen verwalten
- [ ] Fehler abfangen

*Erklärung:* CL_ABAP_TYPEDESCR und Subklassen liefern zur Laufzeit Informationen über Typ, Komponenten und Struktur eines Datenobjekts.

*Lektion: Dynamisches Programmieren: Feldsymbole, Datenreferenzen, RTTI*

---

**• Was ist ein Feldsymbol?**

- [ ] Ein Kommentarzeichen
- [x] Ein typisierter Platzhalter, der zur Laufzeit einem Datenobjekt zugewiesen wird
- [ ] Ein reservierter ABAP-Schlüsselwort-Typ

*Erklärung:* Feldsymbole referenzieren Speicherbereiche, ohne selbst eigenen Speicher zu belegen.

*Lektion: Dynamisches Programmieren: Feldsymbole, Datenreferenzen, RTTI*

---

**• Welche Ausgabe erzeugt eine ausführbare Klasse in ADT?**

- [ ] WRITE auf die Liste
- [x] out->write( ) in die Konsolen-View
- [ ] MESSAGE im Statusbereich

*Erklärung:* IF_OO_ADT_CLASSRUN stellt über den Parameter out die Konsolenausgabe bereit.

*Lektion: Dein erstes ABAP-Programm*

---

**• Was bewirkt CLEAR bei einer Objektreferenz?**

- [ ] Das Objekt wird sofort gelöscht
- [x] Die Referenz wird zurückgesetzt; das Objekt wird aufgeräumt, wenn keine Referenz mehr darauf zeigt
- [ ] Alle Attribute werden auf Initialwert gesetzt

*Erklärung:* ABAP nutzt Garbage Collection: Erst wenn keine Referenz mehr existiert, wird der Speicher freigegeben.

*Lektion: Typsystem im Detail: Referenz- vs. Wertsemantik*

---

**• Was liefert der Ausdruck VALUE #( ) für eine interne Tabelle?**

- [ ] Eine Tabelle mit einer leeren Zeile
- [x] Eine leere Tabelle
- [ ] Einen Laufzeitfehler

*Erklärung:* VALUE #( ) ohne Inhalt erzeugt den Initialwert des Zieltyps — bei Tabellen also eine leere Tabelle.

*Lektion: Moderne funktionale Konstrukte im Detail*

## Modul 8: Interne Tabellen & Performance-Tiefenanalyse

**• Wie werden IMPORTING-Parameter bei ABAP-OO-Methoden standardmäßig übergeben?**

- [ ] By value (Kopie)
- [x] By reference (ohne Kopie), sofern nicht VALUE() angegeben ist
- [ ] Zufällig, je nach Systemlast

*Erklärung:* Das unterscheidet Methoden von klassischen Funktionsbausteinen, bei denen IMPORTING standardmäßig by value läuft.

*Lektion: Speichermodell & Sekundärschlüssel im Detail*

---

**• Wofür eignet sich ein SORTED-Sekundärschlüssel besonders?**

- [x] Für Bereichsabfragen/sortierten Zugriff auf eine sonst unsortierte STANDARD TABLE
- [ ] Für zufälligen Zugriff ohne jede Ordnung
- [ ] Nur für HASHED TABLEs

*Erklärung:* Ein sortierter Sekundärschlüssel ermöglicht effiziente Bereichsabfragen (z.B. WHERE datum >= ...) mit O(log n).

*Lektion: Speichermodell & Sekundärschlüssel im Detail*

---

**• Was ist der erste Schritt bei einer Performance-Optimierung?**

- [ ] Sofort den vermuteten Hotspot umschreiben
- [x] Messen (z. B. mit SAT), nicht raten
- [ ] Die Tabellengröße verdoppeln

*Erklärung:* Ohne Messung optimiert man oft am eigentlichen Problem vorbei.

*Lektion: Laufzeitanalyse mit SAT: Hotspots erkennen*

---

**• Wonach sucht man typischerweise bei der SAT-Auswertung?**

- [x] Hotspots mit hoher Nettozeit
- [ ] Die Anzahl der Kommentarzeilen
- [ ] Die Farbe der Syntax-Hervorhebung

*Erklärung:* Nettozeit pro Baustein zeigt, wo tatsächlich Zeit verloren geht.

*Lektion: Laufzeitanalyse mit SAT: Hotspots erkennen*

---

**• Wozu dient das Enqueue-Konzept?**

- [x] Verhindert, dass mehrere Nutzer denselben Datensatz gleichzeitig inkonsistent ändern
- [ ] Beschleunigt SELECT-Zugriffe
- [ ] Verschlüsselt sensible Felder

*Erklärung:* Enqueue ist eine logische, anwendungsseitige Sperre für konsistenten Mehrbenutzerzugriff.

*Lektion: Parallelverarbeitung & Locking-Konzepte*

---

**• Womit lässt sich Massendatenverarbeitung in ABAP parallelisieren?**

- [ ] SORT itab
- [x] Asynchrone RFCs (CALL FUNCTION ... STARTING NEW TASK)
- [ ] LOOP AT ... GROUP BY

*Erklärung:* Asynchrone RFCs verteilen unabhängige Arbeitspakete auf mehrere Arbeitsprozesse.

*Lektion: Parallelverarbeitung & Locking-Konzepte*

---

**• Wann lohnt sich ein HASHED-Sekundärschlüssel besonders?**

- [x] Bei vielen Einzelzugriffen über einen eindeutigen Schlüssel
- [ ] Bei sortierter Ausgabe
- [ ] Bei sehr kleinen Tabellen mit 5 Zeilen

*Erklärung:* Bei kleinen Tabellen überwiegt der Verwaltungsaufwand den Nutzen; der Gewinn entsteht bei vielen Zugriffen auf große Mengen.

*Lektion: Speichermodell & Sekundärschlüssel im Detail*

---

**• Was bedeutet COMMIT WORK AND WAIT gegenüber COMMIT WORK?**

- [x] Es wartet, bis die Verbuchung abgeschlossen ist
- [ ] Es verzögert den Commit um eine Sekunde
- [ ] Es verwirft die Änderungen

*Erklärung:* Ohne AND WAIT läuft das Programm weiter, bevor die Verbuchung durch ist — ein direkt folgender SELECT kann dann alte Daten lesen.

*Lektion: Parallelverarbeitung & Locking-Konzepte*

## Modul 9: Open SQL & AMDP Expertenwissen

**• Was leistet eine Window Function gegenüber GROUP BY?**

- [x] Berechnet Werte über einen Zeilenbereich, ohne die Ergebnismenge zu reduzieren
- [ ] Ersetzt JOINs vollständig
- [ ] Funktioniert nur mit HASHED TABLEs

*Erklärung:* Window Functions liefern pro Zeile einen berechneten Wert, ohne die Zeilenanzahl der Ergebnismenge zu verändern.

*Lektion: Erweiterte Open-SQL-Muster: CTEs & Window Functions*

---

**• Wozu dient eine CTE (WITH ...)?**

- [x] Strukturiert komplexe Abfragen in benannte, lesbare Zwischenschritte
- [ ] Verschlüsselt die Abfrage
- [ ] Ersetzt den Primärschlüssel

*Erklärung:* CTEs machen mehrstufige Abfragen lesbarer, indem Zwischenergebnisse benannt werden.

*Lektion: Erweiterte Open-SQL-Muster: CTEs & Window Functions*

---

**• Was entscheidet der Datenbank-Optimizer?**

- [x] Wie eine Abfrage tatsächlich ausgeführt wird, anhand von Statistiken
- [ ] Welche Berechtigungen ein Nutzer hat
- [ ] Die Sprache der Fehlermeldungen

*Erklärung:* Der Optimizer wählt z.B. Indexnutzung und Join-Reihenfolge basierend auf Tabellenstatistiken.

*Lektion: SQL-Performance: Ausführungspläne & Table Buffering*

---

**• Was passiert bei Zugriff auf ein nicht gepuffertes Feld einer gepufferten Tabelle?**

- [ ] Der Zugriff wird blockiert
- [x] Buffer Bypass: der Puffer wird umgangen, es wird live gegen die Datenbank gelesen
- [ ] Die Tabelle wird automatisch neu gepuffert

*Erklärung:* Ohne den Pufferschlüssel in der WHERE-Bedingung kann der Puffer nicht genutzt werden.

*Lektion: SQL-Performance: Ausführungspläne & Table Buffering*

---

**• Welches Marker-Interface muss eine AMDP-Klasse implementieren?**

- [x] IF_AMDP_MARKER_HDB
- [ ] IF_BADI_INTERFACE
- [ ] IF_SERIALIZABLE_OBJECT

*Erklärung:* IF_AMDP_MARKER_HDB kennzeichnet eine Klasse als AMDP-fähig für die SAP-HANA-Datenbank.

*Lektion: AMDP: Native HANA-Prozeduren*

---

**• Wann ist AMDP der richtige Ansatz?**

- [ ] Immer, für maximale Performance
- [x] Erst wenn Open SQL und CDS für die Anforderung nicht ausreichen
- [ ] Nur für Berechtigungsprüfungen

*Erklärung:* AMDP ist die letzte Eskalationsstufe für Fälle, die sich deklarativ nicht mehr sauber lösen lassen.

*Lektion: AMDP: Native HANA-Prozeduren*

---

**• Welche Klausel filtert in Open SQL bereits auf der Datenbank statt im Anwendungsserver?**

- [x] WHERE
- [ ] Eine LOOP-Prüfung mit CHECK
- [ ] Eine IF-Abfrage nach dem SELECT

*Erklärung:* Jede Filterung, die erst nach dem SELECT in ABAP passiert, hat die Daten unnötig über das Netz transportiert.

*Lektion: Erweiterte Open-SQL-Muster: CTEs & Window Functions*

---

**• Was ist ein „toter" Index?**

- [x] Ein Index, den der Optimizer nie verwendet, der aber bei jedem Schreibvorgang gepflegt werden muss
- [ ] Ein Index auf einer leeren Tabelle
- [ ] Ein Index, der zweimal angelegt wurde

*Erklärung:* Ungenutzte Indizes kosten Schreibperformance und Speicher, ohne Lesevorteile zu bringen.

*Lektion: SQL-Performance: Ausführungspläne & Table Buffering*

## Modul 10: ABAP Objects & Entwurfsmuster

**• Wofür steht das "O" in SOLID?**

- [ ] Object-Prinzip
- [x] Open/Closed-Prinzip
- [ ] Optimization-Prinzip

*Erklärung:* Open/Closed: offen für Erweiterung, geschlossen für Modifikation.

*Lektion: SOLID-Prinzipien in ABAP*

---

**• Was fordert das Dependency-Inversion-Prinzip?**

- [x] Abhängigkeit von Abstraktionen/Interfaces statt konkreten Implementierungen
- [ ] Möglichst wenige Klassen
- [ ] Vererbung statt Komposition

*Erklärung:* High-Level-Code soll von Interfaces abhängen, nicht von konkreten Low-Level-Klassen.

*Lektion: SOLID-Prinzipien in ABAP*

---

**• Welches Muster kapselt austauschbares Verhalten hinter einem gemeinsamen Interface?**

- [ ] Singleton
- [x] Strategy
- [ ] Observer

*Erklärung:* Strategy macht konkrete Algorithmen austauschbar, solange sie dasselbe Interface implementieren.

*Lektion: Entwurfsmuster in ABAP: Strategy, Factory, Singleton, Observer*

---

**• Wie wird ein Singleton in ABAP typischerweise umgesetzt?**

- [ ] Über eine globale interne Tabelle
- [x] Über eine statische Instanzvariable und eine statische GET_INSTANCE-Methode mit privatem Konstruktor
- [ ] Über ein BAdI

*Erklärung:* Der private Konstruktor verhindert externe Instanziierung, GET_INSTANCE liefert immer dieselbe Instanz.

*Lektion: Entwurfsmuster in ABAP: Strategy, Factory, Singleton, Observer*

---

**• Was ist der technische Kerngedanke eines BAdI?**

- [x] Ein von SAP definiertes Interface, das Kunden ohne Standardcode-Änderung mit eigener Logik implementieren
- [ ] Eine direkte Modifikation des SAP-Standardcodes
- [ ] Ein Datenbank-Trigger

*Erklärung:* BAdIs sind eine saubere, modifikationsfreie Plug-in-Architektur nach dem Strategy-Prinzip.

*Lektion: Erweiterbarkeit klassisch: BAdIs & Enhancement Framework*

---

**• Wodurch wird klassische Erweiterbarkeit in ABAP Cloud weitgehend ersetzt?**

- [ ] Durch direkte Tabellenänderungen
- [x] In-App-Extensibility und freigegebene (released) BAdIs
- [ ] Sie wird komplett abgeschafft

*Erklärung:* ABAP Cloud setzt auf definierte, versionsstabile Erweiterungspunkte statt freier Modifikation.

*Lektion: Erweiterbarkeit klassisch: BAdIs & Enhancement Framework*

---

**• Wonach sollten sich gute Exception-Hierarchien richten?**

- [ ] Nach der Reihenfolge der Programmierung
- [x] Nach fachlichen Fehlerkategorien und unterscheidbaren Reaktionsmöglichkeiten des Aufrufers
- [ ] Nach der Anzahl der Codezeilen

*Erklärung:* Die Hierarchie soll widerspiegeln, wie ein Aufrufer sinnvoll unterschiedlich auf verschiedene Fehler reagieren kann.

*Lektion: Exception-Design: eigene Hierarchien & Fehlerkategorien*

---

**• Was ermöglicht die Nutzung von Nachrichtenklassen statt hartcodierter Texte?**

- [ ] Schnellere Kompilierung
- [x] Übersetzbarkeit und zentrale Pflege der Fehlertexte
- [ ] Automatische Fehlerkorrektur

*Erklärung:* Message Classes trennen Text von Logik und erleichtern Mehrsprachigkeit sowie zentrale Textpflege.

*Lektion: Exception-Design: eigene Hierarchien & Fehlerkategorien*

---

**• Welches SOLID-Prinzip verletzt eine Klasse, die Daten liest, Preise rechnet und E-Mails versendet?**

- [x] Single Responsibility
- [ ] Liskov Substitution
- [ ] Interface Segregation

*Erklärung:* Drei Gründe zur Änderung in einer Klasse — das ist genau die Verletzung des Single-Responsibility-Prinzips.

*Lektion: SOLID-Prinzipien in ABAP*

---

**• Wann verwendet man sinnvollerweise RAISE EXCEPTION ... INTO statt eines reinen TRY/CATCH?**

- [x] Wenn man die Ausnahme protokollieren und anschließend weiterreichen will
- [ ] Nie, das ist gleichbedeutend
- [ ] Nur in Testklassen

*Erklärung:* Fehler zu protokollieren und trotzdem weiterzureichen ist ein verbreitetes und sinnvolles Muster.

*Lektion: Exception-Design: eigene Hierarchien & Fehlerkategorien*

## Modul 11: Core Data Services – Expertenwissen

**• Woher stammen die Werte eines virtuellen Elements?**

- [ ] Direkt aus der Datenbanktabelle
- [x] Aus einer zur Laufzeit ausgeführten Berechnung (Klasse)
- [ ] Aus einem Cache im Frontend

*Erklärung:* Virtuelle Elemente werden über eine Exit-Klasse berechnet, nicht per SELECT geladen.

*Lektion: Virtuelle Elemente & CDS Table Functions*

---

**• Wodurch wird eine CDS Table Function implementiert?**

- [x] Durch eine AMDP-Methode
- [ ] Durch ein klassisches SELECT-Statement
- [ ] Durch eine Behavior Definition

*Erklärung:* Table Functions delegieren die Datenbeschaffung vollständig an eine AMDP-Methode.

*Lektion: Virtuelle Elemente & CDS Table Functions*

---

**• Wofür dient define extend view?**

- [x] Erweitert eine bestehende CDS-View um zusätzliche Felder/Assoziationen, ohne sie zu verändern
- [ ] Erstellt eine komplett neue, unabhängige Tabelle
- [ ] Löscht Felder aus einer View

*Erklärung:* Extend Views hängen strukturell an der Basis-View und bleiben upgradesicher.

*Lektion: Extend Views & Erweiterbarkeit von Standard-Views*

---

**• Was ist Voraussetzung für Extend Views in ABAP Cloud?**

- [ ] Ein Entwickler-Key
- [x] Ein explizit dafür freigegebener (released) Extension Point
- [ ] Keine, es funktioniert immer

*Erklärung:* Nur explizit freigegebene Extension Points dürfen im ABAP-Cloud-Modell erweitert werden.

*Lektion: Extend Views & Erweiterbarkeit von Standard-Views*

---

**• Wofür steht @Aggregation.default: #SUM?**

- [x] Definiert die Standard-Aggregationsart eines Feldes für analytische Konsumenten
- [ ] Erzwingt eine Summe im WHERE-Teil
- [ ] Verhindert Aggregation komplett

*Erklärung:* Die Annotation gibt Reporting-Tools vor, wie ein Feld standardmäßig aggregiert werden soll.

*Lektion: Hierarchien, analytische Annotationen & Umrechnungen*

---

**• Was übernimmt die eingebaute Funktion currency_conversion()?**

- [ ] Nur die reine Multiplikation zweier Zahlen
- [x] Fachlich korrekte Währungsumrechnung direkt in der CDS-View, inkl. Kursdatum-Logik
- [ ] Die Formatierung von Datumsfeldern

*Erklärung:* Sie kapselt komplexe Umrechnungslogik (Kurstabellen, Stichtag) deklarativ in der View.

*Lektion: Hierarchien, analytische Annotationen & Umrechnungen*

---

**• Warum lassen sich virtuelle Elemente nicht auf Datenbankebene filtern?**

- [x] Weil sie erst zur Laufzeit in ABAP berechnet werden
- [ ] Weil sie verschlüsselt sind
- [ ] Weil sie immer NULL sind

*Erklärung:* Die Datenbank kennt den Wert nicht — er entsteht erst in der ABAP-Exit-Klasse.

*Lektion: Virtuelle Elemente & CDS Table Functions*

## Modul 12: RAP Expertenwissen

**• Wozu dient die Draft-Tabelle?**

- [x] Speichert Zwischenstände vor dem finalen Sichern, Basis für den Bearbeiten-Modus
- [ ] Ersetzt die produktive Datenbanktabelle komplett
- [ ] Speichert nur gelöschte Datensätze

*Erklärung:* Die Draft-Tabelle hält unfertige Änderungen, bis der Nutzer final speichert.

*Lektion: Draft-Handling im Detail*

---

**• Wann wird bei "Late Numbering" der Schlüssel vergeben?**

- [ ] Sofort bei create
- [x] Erst beim finalen Speichern
- [ ] Beim Löschen des Drafts

*Erklärung:* Late Numbering verzögert die Schlüsselvergabe bis zum tatsächlichen Save-Vorgang.

*Lektion: Draft-Handling im Detail*

---

**• Was prüft Optimistic Concurrency Control beim Speichern?**

- [x] Ob sich der ETag seit dem letzten Lesen geändert hat
- [ ] Ob der Nutzer berechtigt ist
- [ ] Ob die Datenbank verfügbar ist

*Erklärung:* Ein geänderter ETag signalisiert eine zwischenzeitliche fremde Änderung — der Save wird abgelehnt.

*Lektion: Concurrency Control: ETag & Locking im Detail*

---

**• Wann ist Pessimistic Locking eher angebracht als Optimistic Concurrency?**

- [x] Bei kurzen, kritischen Transaktionen mit exklusivem Zugriffsbedarf
- [ ] Immer, unabhängig vom Szenario
- [ ] Nur bei reinen Leseoperationen

*Erklärung:* Für kurze, kritische Vorgänge (z.B. Bestandsbuchungen) ist eine exklusive Sperre oft sinnvoller.

*Lektion: Concurrency Control: ETag & Locking im Detail*

---

**• Wovon erbt eine RAP-Saver-Klasse?**

- [x] CL_ABAP_BEHAVIOR_SAVER
- [ ] CX_ROOT
- [ ] IF_AMDP_MARKER_HDB

*Erklärung:* CL_ABAP_BEHAVIOR_SAVER ist die Basisklasse für eigene Save-Sequenz-Steuerung im Unmanaged RAP.

*Lektion: Unmanaged & Mixed Scenarios: die Saver Class*

---

**• Wann ist eine eigene Saver-Klasse typischerweise nötig?**

- [ ] Bei Managed RAP mit Standard-CRUD
- [x] Bei Unmanaged RAP, z.B. beim Wrappen bestehender BAPIs
- [ ] Nie, RAP übernimmt das immer automatisch

*Erklärung:* Unmanaged RAP verlangt explizite Kontrolle über den Speichervorgang, meist wegen bestehender BAPI-Logik.

*Lektion: Unmanaged & Mixed Scenarios: die Saver Class*

---

**• Was ist ein Kennzeichen von Side-by-Side-Extensibility?**

- [ ] Code direkt im Kernsystem ändern
- [x] Eine separate App auf der BTP, angebunden über freigegebene APIs/Business Events
- [ ] Ein BAdI im Standardnamensraum

*Erklärung:* Side-by-Side hält individuelle Logik bewusst außerhalb des Kernsystems.

*Lektion: RAP-Erweiterbarkeit: In-App vs. Side-by-Side*

---

**• Wozu dienen RAP Business Events?**

- [x] Asynchrone, lose gekoppelte Reaktion externer Apps auf Ereignisse im Kernsystem
- [ ] Synchrone Blockierung aller Nutzer bei einer Änderung
- [ ] Ersatz für die Berechtigungsprüfung

*Erklärung:* Business Events entkoppeln Kernsystem und erweiternde Apps zeitlich und technisch.

*Lektion: RAP-Erweiterbarkeit: In-App vs. Side-by-Side*

---

**• Wozu dient das Feld %tky in RAP?**

- [x] Es ist der technische Schlüssel einer Instanz inklusive Draft-Kennzeichen
- [ ] Es speichert den Benutzernamen
- [ ] Es ist ein Zeitstempel

*Erklärung:* %tky (transactional key) identifiziert eine Instanz eindeutig, inklusive der Unterscheidung zwischen Draft und aktiver Instanz.

*Lektion: Draft-Handling im Detail*

---

**• Was passiert bei einem ETag-Konflikt?**

- [ ] Der Datensatz wird stillschweigend überschrieben
- [x] Der Update wird abgelehnt, weil zwischenzeitlich jemand anders geändert hat
- [ ] Der Datensatz wird gesperrt

*Erklärung:* Genau das verhindert das Lost Update, ohne eine dauerhafte Sperre zu benötigen.

*Lektion: Concurrency Control: ETag & Locking im Detail*

## Modul 13: Fiori Elements & UI-Erweiterbarkeit

**• Was ist das Flexible Programming Model?**

- [x] Ein Mittelweg zwischen reiner Annotation-Steuerung und komplettem Freestyle-UI5
- [ ] Ein Ersatz für OData V4
- [ ] Eine Testmethode für RAP

*Erklärung:* Es erlaubt punktuelle Erweiterung der generierten UI über definierte Extension Points.

*Lektion: Flexible Programming Model & Extension Points*

---

**• Was ist ein Beispiel für einen Fiori-Elements-Extension-Point?**

- [x] Eine Custom Section/Custom Action über Controller-Extensions
- [ ] Eine neue Datenbanktabelle
- [ ] Ein AMDP-Verfahren

*Erklärung:* Controller-Extensions binden zusätzliche UI-Logik gezielt in die generierte App ein.

*Lektion: Flexible Programming Model & Extension Points*

---

**• Worauf basiert ein Value Help typischerweise?**

- [x] Eine Assoziation zu einer weiteren CDS-View kombiniert mit @Consumption.valueHelpDefinition
- [ ] Ein fest kodiertes JavaScript-Array
- [ ] Eine Excel-Datei

*Erklärung:* Value Helps sind deklarativ über Assoziationen und Annotationen modelliert.

*Lektion: Value Helps & Filterlogik im Detail*

---

**• Was können @Consumption.filter-Annotationen steuern?**

- [x] Verhalten von Filterfeldern, z.B. Pflichtfilter oder Mehrfachselektion
- [ ] Die Farbe der Buttons
- [ ] Die Datenbankverbindung

*Erklärung:* Diese Annotationen steuern, wie Filterfelder sich in der Filterleiste verhalten.

*Lektion: Value Helps & Filterlogik im Detail*

---

**• Wofür ist die Analytical List Page (ALP) primär gedacht?**

- [x] Analyse-Szenarien mit Diagrammen kombiniert mit einer filterbaren Tabelle
- [ ] Reine Stammdatenpflege
- [ ] Berechtigungsverwaltung

*Erklärung:* ALP verbindet visuelle Analyse (Charts) mit tabellarischer Detailsicht.

*Lektion: Analytical List Page & Overview Page*

---

**• Wofür wird typischerweise eine Overview Page (OVP) eingesetzt?**

- [x] Rollenbasierte Dashboard-Startseiten mit Kacheln aus mehreren Datenquellen
- [ ] Nur für technische Systemlogs
- [ ] Für Massendatenlöschungen

*Erklärung:* OVPs bündeln relevante Kennzahlen und Einstiege für eine Nutzerrolle auf einer Seite.

*Lektion: Analytical List Page & Overview Page*

---

**• Warum sollte ein Value Help immer gefiltert sein?**

- [ ] Aus Designgründen
- [x] Weil unbegrenzte Ergebnismengen die App spürbar langsam machen
- [ ] Weil sonst keine Auswahl möglich ist

*Erklärung:* Value Helps ohne Filter laden schnell zehntausende Sätze — einer der häufigsten Gründe für gefühlte Langsamkeit.

*Lektion: Value Helps & Filterlogik im Detail*

## Modul 14: ABAP Cloud, BTP & Extensibility-Strategie

**• Was garantiert eine "released" API im ABAP-Cloud-Modell?**

- [ ] Maximale Performance
- [x] Versionierte Abwärtskompatibilität bzw. angekündigte Änderungen
- [ ] Automatische Übersetzung

*Erklärung:* Released APIs sind SAPs stabiler, dokumentierter Vertrag mit Entwicklern.

*Lektion: ABAP Cloud vs. klassisches ABAP: Released APIs*

---

**• Was verhindert der ABAP Cloud Compiler Check?**

- [x] Die Nutzung nicht freigegebener ("internal") APIs im Cloud-Programmiermodell
- [ ] Syntaxfehler im Allgemeinen
- [ ] Die Nutzung von CDS-Views

*Erklärung:* Der Check erzwingt, dass nur released APIs referenziert werden dürfen.

*Lektion: ABAP Cloud vs. klassisches ABAP: Released APIs*

---

**• Was bedeutet "Embedded Steampunk"?**

- [x] ABAP-Cloud-Entwicklung mit denselben Restriktionen wie Steampunk, aber eingebettet im S/4HANA-Kernsystem
- [ ] Ein veraltetes ABAP-Dialekt
- [ ] Ein reines Frontend-Framework

*Erklärung:* Embedded Steampunk bringt die Cloud-Restriktionen direkt ins bestehende S/4HANA-System.

*Lektion: Embedded Steampunk, Steampunk & Side-by-Side im Vergleich*

---

**• Wann ist reines Steampunk (SAP BTP ABAP Environment) die richtige Wahl?**

- [x] Für komplett neue, von S/4HANA unabhängige Apps auf der BTP
- [ ] Nur für klassische Reports
- [ ] Nie, es ist veraltet

*Erklärung:* Steampunk eignet sich für eigenständige, vom Kernsystem unabhängige Cloud-Anwendungen.

*Lektion: Embedded Steampunk, Steampunk & Side-by-Side im Vergleich*

---

**• Was kennzeichnet Key-User-Extensibility?**

- [x] Vereinfachte, sandboxed Werkzeuge für Fachanwender ohne Entwicklerberechtigung
- [ ] Vollständiger Zugriff auf das ABAP Dictionary
- [ ] Nur für Systemadministratoren

*Erklärung:* Key-User-Tools sind bewusst auf einfache, sichere Erweiterungen beschränkt.

*Lektion: Key-User- vs. Developer-Extensibility im Detail*

---

**• Warum ist Key-User-Extensibility bewusst eingeschränkt?**

- [ ] Aus technischen Limitierungen der BTP
- [x] Governance-Entscheidung, damit Fachanwender das System nicht versehentlich destabilisieren
- [ ] Weil sie nur ein Testfeature ist

*Erklärung:* Die Einschränkung ist eine bewusste Sicherheits-/Stabilitätsentscheidung.

*Lektion: Key-User- vs. Developer-Extensibility im Detail*

---

**• Was bedeutet es, wenn eine SAP-API den Status „nicht freigegeben" hat?**

- [ ] Sie ist fehlerhaft
- [x] Sie kann sich jederzeit ohne Ankündigung ändern und darf in ABAP Cloud nicht genutzt werden
- [ ] Sie ist kostenpflichtig

*Erklärung:* Nur released APIs sind Teil des stabilen Vertrags und damit upgradesicher.

*Lektion: ABAP Cloud vs. klassisches ABAP: Released APIs*

## Modul 15: Security & Performance im Betrieb

**• Worin besteht das SQL-Injection-Risiko bei dynamischem Open SQL?**

- [x] Ungeprüfte Nutzereingaben werden als Teil der SQL-Abfrage selbst statt als Parameter eingebaut
- [ ] Die Datenbank ist zu langsam
- [ ] Es gibt kein Risiko in ABAP

*Erklärung:* Wird Nutzereingabe als String-Teil der Abfrage behandelt, kann sie die Abfragelogik manipulieren.

*Lektion: Sichere Programmierung: Dynamisches SQL & SQL-Injection*

---

**• Was ist die sicherere Alternative zur String-Konkatenation von Nutzereingaben in SQL?**

- [x] Eingaben als echte Host-Variablen/Parameter übergeben
- [ ] Eingaben einfach länger machen
- [ ] Eingaben in Großbuchstaben umwandeln

*Erklärung:* Parameter werden vom SQL-Interpreter als Daten, nicht als Code behandelt.

*Lektion: Sichere Programmierung: Dynamisches SQL & SQL-Injection*

---

**• Was steuern Business Roles im Fiori Launchpad primär?**

- [x] Zugriff auf Apps/Kacheln (Business Catalogs)
- [ ] Die Datenbankverschlüsselung
- [ ] Die Netzwerkbandbreite

*Erklärung:* Business Roles bestimmen, welche Apps ein Nutzer im Launchpad sieht.

*Lektion: Berechtigungskonzepte: PFCG-Rollen vs. Business Roles*

---

**• Wo wird die fachliche Berechtigungsprüfung (welcher Datensatz) in RAP definiert?**

- [x] In der authorization-Klausel der Behavior Definition
- [ ] Im Fiori Launchpad Designer
- [ ] Im HTML-Code der App

*Erklärung:* Die authorization-Klausel steuert instanzbezogene Berechtigungsprüfung direkt im Business Object.

*Lektion: Berechtigungskonzepte: PFCG-Rollen vs. Business Roles*

---

**• Wofür wird ST22 genutzt?**

- [x] Analyse von Laufzeitfehlern (Dumps)
- [ ] Pflege von Übersetzungstexten
- [ ] Verwaltung von Transportaufträgen

*Erklärung:* ST22 zeigt Details zu abgestürzten Programmläufen (ABAP-Dumps).

*Lektion: Performance-Monitoring im Betrieb*

---

**• Was zeigt eine Workload-Analyse (STAD) im Unterschied zu SAT?**

- [x] Aggregierte Belastungsmuster über viele Programmläufe hinweg
- [ ] Nur den Quellcode eines Programms
- [ ] Die Benutzeroberfläche einer App

*Erklärung:* STAD aggregiert über viele Ausführungen, SAT analysiert einen einzelnen Lauf im Detail.

*Lektion: Performance-Monitoring im Betrieb*

---

**• Welche Eingabe könnte eine ungesicherte dynamische WHERE-Bedingung ausnutzen?**

- [ ] Ein sehr langer Name
- [x] Eine Eingabe, die Anführungszeichen und eine zusätzliche Bedingung enthält
- [ ] Ein Name mit Umlauten

*Erklärung:* Die Injection schließt das Stringliteral und hängt eigene Logik an — deshalb gehören Werte in Host-Variablen.

*Lektion: Sichere Programmierung: Dynamisches SQL & SQL-Injection*

## Modul 16: Transportwesen, DevOps & Testautomatisierung

**• In welchem Format speichert abapGit ABAP-Entwicklungsobjekte im Repository?**

- [x] Als serialisierte XML-Textdateien
- [ ] Als kompilierte Binärdateien
- [ ] Als PDF-Dokumente

*Erklärung:* abapGit serialisiert Entwicklungsobjekte textbasiert für echte Diffs und Versionskontrolle.

*Lektion: abapGit-Workflows im Team*

---

**• Was reduziert das Risiko von Merge-Konflikten bei parallelen Änderungen?**

- [x] Kleine, fokussierte Transporte/Feature-Branches
- [ ] Möglichst große, seltene Transporte
- [ ] Das Deaktivieren von Code-Reviews

*Erklärung:* Kleinere, fokussierte Änderungen überschneiden sich seltener mit paralleler Arbeit.

*Lektion: abapGit-Workflows im Team*

---

**• Was unterscheidet gCTS grundlegend von abapGit?**

- [x] gCTS ist nativ ins offizielle SAP-Transportwesen integriert, abapGit ist ein separates Zusatztool
- [ ] Es gibt keinen Unterschied
- [ ] gCTS funktioniert nur ohne Git

*Erklärung:* gCTS ersetzt/erweitert das klassische Transportwesen direkt um Git-Funktionalität.

*Lektion: CI/CD mit gCTS & ATC-Gates*

---

**• Was bewirkt ein ATC-Quality-Gate in einer CI/CD-Pipeline?**

- [x] Die Pipeline bricht bei kritischen Codequalitäts-Findings automatisch ab
- [ ] Es verlangsamt nur die Pipeline ohne Wirkung
- [ ] Es ersetzt alle manuellen Tests

*Erklärung:* Ein Quality Gate verhindert, dass mangelhafter Code das System automatisch weiter durchläuft.

*Lektion: CI/CD mit gCTS & ATC-Gates*

---

**• Wozu dient CL_ABAP_TESTDOUBLE?**

- [x] Erzeugt generische Test Doubles für Interfaces in ABAP-Unit-Tests
- [ ] Kompiliert ABAP-Code
- [ ] Verwaltet Transportaufträge

*Erklärung:* Es erlaubt, Interface-Implementierungen für Tests dynamisch zu simulieren.

*Lektion: Testautomatisierung: Testdoubles & Testseams*

---

**• Wofür sind Testseams besonders nützlich?**

- [x] Gezieltes Ersetzen von Codeabschnitten im Test bei Legacy-Code ohne Dependency Injection
- [ ] Für die Produktivauslieferung von Code
- [ ] Für die UI-Gestaltung

*Erklärung:* Testseams erlauben Testbarkeit, ohne bestehenden Code architektonisch umzubauen.

*Lektion: Testautomatisierung: Testdoubles & Testseams*

---

**• Warum ist ein kleiner, fokussierter Transport besser als ein großer Sammeltransport?**

- [ ] Er transportiert schneller
- [x] Er reduziert Konfliktrisiko und macht Rückbau einzelner Änderungen möglich
- [ ] Er ist im System vorgeschrieben

*Erklärung:* Kleine Einheiten lassen sich gezielt prüfen, freigeben und im Zweifel zurücknehmen.

*Lektion: abapGit-Workflows im Team*

## Modul 17: Das SAP-Laufzeitmodell verstehen

**• Was leistet COMMIT WORK in der SAP-LUW?**

- [ ] Es schreibt sofort jede einzelne Anweisung in die Datenbank
- [x] Es schließt die logische Verarbeitungseinheit ab und stößt die Verbuchung an
- [ ] Es beendet das Programm

*Erklärung:* ABAP sammelt Änderungen und schreibt sie gebündelt bei COMMIT WORK — das ist der Unterschied zwischen SAP-LUW und Datenbank-LUW.

*Lektion: Die SAP LUW: COMMIT WORK und Verbuchung*

---

**• Wer ist dafür zuständig, nach BAPI-Aufrufen festzuschreiben?**

- [ ] Das BAPI selbst
- [x] Der Aufrufer, über BAPI_TRANSACTION_COMMIT
- [ ] Die Datenbank automatisch nach 5 Sekunden

*Erklärung:* BAPIs committen bewusst nicht selbst, damit der Aufrufer mehrere Aufrufe zu einer fachlichen Einheit bündeln kann.

*Lektion: Die SAP LUW: COMMIT WORK und Verbuchung*

---

**• Wie weit reicht das ABAP Memory?**

- [ ] Über die gesamte Benutzersitzung inklusive aller Modi
- [x] Über die Aufrufkette (Call Stack) innerhalb eines Modus
- [ ] Über alle Applikationsserver hinweg

*Erklärung:* ABAP Memory (EXPORT/IMPORT TO MEMORY ID) gilt innerhalb der Aufrufkette eines Modus; SAP Memory (SET/GET PARAMETER) dagegen sitzungsweit.

*Lektion: Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects*

---

**• Wofür eignen sich Shared Objects?**

- [x] Für teure, selten wechselnde Daten, die viele Nutzer gleichzeitig lesen
- [ ] Als Ersatz für Datenbanktabellen
- [ ] Für die Übergabe von Werten an ein einzelnes Unterprogramm

*Erklärung:* Shared Objects halten aufwändig aufgebaute Daten im Applikationsserver-Speicher bereit — pro Server allerdings jeweils eine eigene Kopie.

*Lektion: Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects*

---

**• Was passiert mit einer gezogenen Nummernkreisnummer bei einem ROLLBACK WORK?**

- [ ] Sie wird zurückgegeben und erneut vergeben
- [x] Sie bleibt verbraucht — es entsteht eine Lücke
- [ ] Der Rollback wird dadurch verhindert

*Erklärung:* Nummernkreise arbeiten bewusst außerhalb der LUW, damit sie unter Last performant bleiben — der Preis sind Lücken.

*Lektion: Nummernkreise, Sperren und ihr Zusammenspiel*

---

**• In welcher Reihenfolge arbeitet man korrekt mit Sperren?**

- [ ] Lesen, ändern, sperren, committen
- [x] Sperren, lesen, ändern, committen
- [ ] Committen, sperren, lesen, ändern

*Erklärung:* Wer erst liest und danach sperrt, öffnet ein Zeitfenster für ein Lost Update durch einen parallelen Nutzer.

*Lektion: Nummernkreise, Sperren und ihr Zusammenspiel*

---

**• Was ist ein impliziter Commit?**

- [ ] Ein COMMIT WORK im Quelltext
- [x] Ein Commit, der durch einen Dialogschritt oder eine RFC-Grenze ausgelöst wird
- [ ] Ein Commit durch den Datenbankadministrator

*Erklärung:* Genau hier entstehen halb geschriebene Belege, wenn man die LUW-Grenzen nicht kennt.

*Lektion: Die SAP LUW: COMMIT WORK und Verbuchung*

---

**• Womit übergibt man Werte über die gesamte Benutzersitzung hinweg?**

- [ ] EXPORT TO MEMORY ID
- [x] SET PARAMETER ID (SAP Memory)
- [ ] Eine lokale Variable

*Erklärung:* ABAP Memory gilt nur innerhalb einer Aufrufkette, SAP Memory sitzungsweit.

*Lektion: Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects*

## Modul 18: Debugging & fremden Code verstehen

**• Wofür ist ein Watchpoint das richtige Werkzeug?**

- [x] Um anzuhalten, sobald sich der Wert einer Variablen ändert
- [ ] Um das Programm zu beenden
- [ ] Um eine Variable dauerhaft zu schützen

*Erklärung:* Watchpoints finden die Stelle, an der ein Wert überschrieben wird — ohne dass man sie vorher kennt.

*Lektion: Der Debugger als Profiwerkzeug*

---

**• Was leistet Layer-Aware Debugging?**

- [ ] Es zeigt das Datenbank-Layout an
- [x] Es überspringt fremde Schichten und hält erst wieder im eigenen Code
- [ ] Es verschlüsselt den Debugger-Zugriff

*Erklärung:* Besonders wertvoll in Frameworks wie RAP, wo zwischen Aufruf und eigenem Code viele Framework-Schichten liegen.

*Lektion: Der Debugger als Profiwerkzeug*

---

**• Welches Werkzeug beantwortet am schnellsten „Wer ruft diese Methode auf?"**

- [x] Der Verwendungsnachweis (Where-Used)
- [ ] Der Pretty Printer
- [ ] Die Transportverwaltung

*Erklärung:* Der Verwendungsnachweis ist das zentrale Werkzeug, um Auswirkungen einer Änderung abzuschätzen.

*Lektion: Sich in fremdem Code zurechtfinden*

---

**• Wie findest du ohne Code-Analyse heraus, welche Tabellen eine Transaktion liest?**

- [x] Mit einem SQL-Trace (ST05) während der Bedienung
- [ ] Durch Raten anhand des Namens
- [ ] Über den Transportauftrag

*Erklärung:* ST05 zeichnet alle Datenbankzugriffe auf — der schnellste Weg von der Oberfläche zu den beteiligten Tabellen.

*Lektion: Sich in fremdem Code zurechtfinden*

---

**• Was ist beim Auswerten eines Kurzdumps (ST22) am wichtigsten?**

- [ ] Nur die Programmzeile, sonst nichts
- [x] Exception, Zeile und vor allem die auslösenden Datenwerte
- [ ] Die Farbe der Fehlermeldung

*Erklärung:* Meist ist nicht der Code generell falsch, sondern eine bestimmte Datenkonstellation wurde nicht bedacht — die gehört danach als Testfall abgesichert.

*Lektion: Fehleranalyse in Produktion*

---

**• Womit protokolliert man fachliche Meldungen aus einem Hintergrundlauf korrekt?**

- [ ] Mit WRITE-Ausgaben
- [x] Über das Application Log
- [ ] Über Kommentare im Quelltext

*Erklärung:* WRITE-Ausgaben sind in der Hintergrundverarbeitung praktisch nicht auswertbar — das Application Log ist das dafür vorgesehene Werkzeug.

*Lektion: Fehleranalyse in Produktion*

---

**• Wie findest du heraus, an welcher Stelle eine Variable überschrieben wird?**

- [x] Mit einem Watchpoint
- [ ] Mit dem Pretty Printer
- [ ] Mit dem Verwendungsnachweis auf die Tabelle

*Erklärung:* Der Watchpoint hält genau dann an, wenn sich der Wert ändert.

*Lektion: Der Debugger als Profiwerkzeug*

## Modul 19: Integration & Hintergrundverarbeitung

**• Wie meldet ein BAPI üblicherweise Fehler?**

- [ ] Über eine klassenbasierte Exception
- [x] Über eine RETURN-Tabelle vom Typ BAPIRET2
- [ ] Über einen Kurzdump

*Erklärung:* Wer die RETURN-Tabelle nicht auswertet, bemerkt den Fehlschlag nicht — das Programm läuft weiter.

*Lektion: RFC, BAPIs und ihre Tücken*

---

**• Welche Meldungstypen in BAPIRET2 bedeuten „fehlgeschlagen"?**

- [ ] Nur E
- [x] E und A
- [ ] S und I

*Erklärung:* A steht für Abbruch, E für Fehler — die übliche Prüfung lautet deshalb TYPE CA 'EA'.

*Lektion: RFC, BAPIs und ihre Tücken*

---

**• Wo gehören URL und Zugangsdaten einer externen Schnittstelle hin?**

- [ ] Als Konstanten in den ABAP-Code
- [x] In ein Communication Arrangement
- [ ] In die Tabellenpufferung

*Erklärung:* So bleibt derselbe Code über alle Systeme transportierbar, während Endpunkte und Credentials pro System konfiguriert werden.

*Lektion: HTTP und REST aus ABAP heraus konsumieren*

---

**• Welche Klasse ist im ABAP-Cloud-Modell für HTTP-Aufrufe vorgesehen?**

- [ ] CL_HTTP_CLIENT
- [x] CL_WEB_HTTP_CLIENT
- [ ] CL_GUI_HTML_VIEWER

*Erklärung:* CL_HTTP_CLIENT ist die ältere, in ABAP Cloud nicht freigegebene Variante.

*Lektion: HTTP und REST aus ABAP heraus konsumieren*

---

**• Welche Interfaces braucht eine Application-Job-Klasse in ABAP Cloud?**

- [x] IF_APJ_DT_EXEC_OBJECT und IF_APJ_RT_EXEC_OBJECT
- [ ] IF_OO_ADT_CLASSRUN allein
- [ ] IF_AMDP_MARKER_HDB

*Erklärung:* DT liefert die Parameterdefinition für die Einplanungs-App, RT enthält die eigentliche Ausführungslogik.

*Lektion: Hintergrundverarbeitung & Application Jobs*

---

**• Was ist die wichtigste Eigenschaft eines produktionsreifen Hintergrundlaufs?**

- [ ] Er schreibt möglichst viele WRITE-Ausgaben
- [x] Er ist nach Abbruch wiederaufsetzbar, ohne doppelt zu verarbeiten
- [ ] Er läuft ausschließlich nachts

*Erklärung:* Unbeaufsichtigte Verarbeitung muss einen Abbruch verkraften, ohne manuelle Aufräumarbeit zu erzwingen.

*Lektion: Hintergrundverarbeitung & Application Jobs*

---

**• Warum ist ein synchroner RFC in kritischen Prozessen riskant?**

- [ ] Er ist grundsätzlich unsicher
- [x] Er blockiert, bis das Zielsystem antwortet — fällt der Partner aus, hängt der Prozess
- [ ] Er überträgt keine Fehler

*Erklärung:* Für entkoppelte Szenarien nutzt man qRFC/bgRFC oder ereignisbasierte Kommunikation.

*Lektion: RFC, BAPIs und ihre Tücken*

## Modul 20: Werkzeugkasten & rote Linien

**• Was macht Quick Fix (Strg+1) besonders nützlich?**

- [ ] Es formatiert nur den Quelltext
- [x] Es legt fehlende Methoden und Deklarationen automatisch passend an
- [ ] Es startet den Debugger

*Erklärung:* So lässt sich der aufrufende Code zuerst schreiben und die Struktur daraus generieren.

*Lektion: ADT-Kniffe, die Tempo machen*

---

**• Womit öffnest du in ADT direkt ein beliebiges Entwicklungsobjekt?**

- [x] Strg + Shift + A
- [ ] Strg + S
- [ ] F8

*Erklärung:* Strg+Shift+A ist der schnellste Einstieg in jedes Objekt, ohne Navigation durch Paketbäume.

*Lektion: ADT-Kniffe, die Tempo machen*

---

**• Was macht die ABAP-Schlüsselwortdokumentation (F1) besonders wertvoll?**

- [x] Sie enthält ausführbare Beispiele und passt exakt zur installierten Release-Version
- [ ] Sie ersetzt den Debugger
- [ ] Sie ist die einzige Quelle für Kundencode

*Erklärung:* Release-genaue Beispiele direkt im System sind oft verlässlicher als allgemeine Webquellen.

*Lektion: Vom SAP-Standard lernen*

---

**• Wie verstehst du eine unbekannte SAP-Klasse am schnellsten?**

- [ ] Nur die Dokumentation lesen
- [x] Über den Verwendungsnachweis echte Aufrufstellen im Standard ansehen
- [ ] Sie kopieren und umbenennen

*Erklärung:* Echte Aufrufstellen zeigen, welche Parameter in der Praxis wirklich gefüllt werden.

*Lektion: Vom SAP-Standard lernen*

---

**• Warum sind direkte Tabellenänderungen in Produktion tabu?**

- [ ] Sie sind technisch unmöglich
- [x] Sie umgehen Prüf- und Verbuchungslogik und hinterlassen keine nachvollziehbare Belegspur
- [ ] Sie sind nur langsamer als der normale Weg

*Erklärung:* Neben der Datenkonsistenz ist das in regulierten Branchen zusätzlich ein Compliance-Problem.

*Lektion: Anti-Patterns und rote Linien*

---

**• Was ist das Problem an einem leeren CATCH-Block?**

- [ ] Er verlangsamt das Programm
- [x] Er verschluckt Fehler, sodass Inkonsistenzen unbemerkt bleiben
- [ ] Er ist syntaktisch nicht erlaubt

*Erklärung:* Ein Fehler, der niemandem auffällt, ist teurer als einer, der laut und früh scheitert.

*Lektion: Anti-Patterns und rote Linien*

---

**• Warum ist eine Modifikation am SAP-Standard teurer als eine Erweiterung?**

- [ ] Sie ist technisch langsamer
- [x] Sie muss bei jedem Upgrade erneut manuell abgeglichen werden
- [ ] Sie ist lizenzpflichtig

*Erklärung:* Erweiterungspunkte wie BAdIs existieren genau deshalb — sie überstehen Upgrades ohne Abgleich.

*Lektion: Anti-Patterns und rote Linien*
