# Quiz & Karteikarten – Java Expertenpfad

Lektionsfragen stehen zusätzlich am Ende jeder Lektion. Richtige Antwort ist mit [x] markiert.

## Modul 1: Pseudocode, Algorithmen & die Brücke zu Java

**• Was bewertet die IHK bei Pseudocode-Aufgaben primär?**

- [ ] Exakte Syntax nach festem Standard
- [x] Die Logik und Korrektheit des Algorithmus
- [ ] Die Zeilenanzahl

*Erklärung:* Ein Syntax-Beiblatt liegt bei — Schreibfehler werden toleriert, solange die Logik stimmt.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welche drei Bausteine bilden den Kern der strukturierten Programmierung?**

- [x] Sequenz, Verzweigung, Wiederholung
- [ ] Vererbung, Polymorphie, Kapselung
- [ ] Klasse, Objekt, Methode

*Erklärung:* Aus diesen drei Konstrukten lässt sich jeder Algorithmus aufbauen — unabhängig von der Programmiersprache.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welches PAP-Symbol steht für eine Entscheidung?**

- [ ] Rechteck
- [x] Raute
- [ ] Oval

*Erklärung:* Die Raute markiert die Verzweigung; das Rechteck ist Verarbeitung, das Oval Start/Ende.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Was ist ein struktureller Vorteil von Struktogrammen?**

- [ ] Sie sind schneller gezeichnet
- [x] Sie erzwingen strukturierte Programmierung, weil Sprungpfeile nicht darstellbar sind
- [ ] Sie ersetzen Pseudocode vollständig

*Erklärung:* Ohne Sprungpfeile lässt sich GOTO-Spaghetticode gar nicht erst abbilden.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Welches Java-Konstrukt entspricht FOR EACH ... IN ... DO am direktesten?**

- [x] Die erweiterte for-Schleife (for (int x : array))
- [ ] while (true)
- [ ] do ... while

*Erklärung:* Die erweiterte for-Schleife („for-each") iteriert über Arrays und alles, was Iterable implementiert.

*Lektion: Vom Pseudocode zu Java: durchgerechnete Beispiele*

---

**• Was ergibt in Java der Ausdruck 7 / 2 bei zwei int-Werten?**

- [ ] 3.5
- [x] 3
- [ ] Einen Kompilierfehler

*Erklärung:* Bei zwei Ganzzahlen führt Java eine Ganzzahldivision aus und schneidet den Rest ab — ein Cast auf double ist nötig.

*Lektion: Vom Pseudocode zu Java: durchgerechnete Beispiele*

---

**• Welche Komplexität hat eine einzelne Schleife über n Elemente?**

- [ ] O(1)
- [x] O(n)
- [ ] O(n²)

*Erklärung:* Jedes Element wird genau einmal betrachtet — lineare Laufzeit.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Welche Java-Struktur bietet O(1) beim Zugriff über den Schlüssel?**

- [ ] LinkedList
- [x] HashMap
- [ ] ArrayList (über den Wert gesucht)

*Erklärung:* HashMap berechnet aus dem Schlüssel direkt die Position — unabhängig von der Größe.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Was bedeutet die Forderung, ein Algorithmus müsse endlich sein?**

- [ ] Er darf höchstens 100 Zeilen haben
- [x] Er muss nach endlich vielen Schritten terminieren
- [ ] Er darf keine Schleifen enthalten

*Erklärung:* Endlichkeit meint Terminierung — der Algorithmus kommt nach endlich vielen Schritten zum Ende.

*Lektion: Pseudocode-Grundlagen (IHK-Konvention)*

---

**• Welches PAP-Symbol steht für Ein- und Ausgabe?**

- [ ] Rechteck
- [x] Parallelogramm
- [ ] Oval

*Erklärung:* Das Parallelogramm markiert Ein-/Ausgabe, das Rechteck Verarbeitung, das Oval Start und Ende.

*Lektion: Struktogramme & Programmablaufpläne (PAP)*

---

**• Wie viele Schritte braucht die binäre Suche bei 1024 sortierten Elementen maximal?**

- [ ] 1024
- [x] Etwa 10
- [ ] Etwa 32

*Erklärung:* log₂(1024) = 10 — jede Halbierung entfernt die Hälfte des Suchraums.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

---

**• Zwei verschachtelte Schleifen laufen je von 1 bis n. Wie viele Durchläufe insgesamt?**

- [ ] 2n
- [x] n²
- [ ] n log n

*Erklärung:* Für jeden der n äußeren Durchläufe laufen n innere — quadratische Komplexität.

*Lektion: Komplexität verstehen: Big-O für Prüfung und Praxis*

## Modul 2: Datenmodellierung: ER-Modell & Normalisierung

**• Wie wird eine n:m-Beziehung bei der Tabellenumsetzung aufgelöst?**

- [ ] Gar nicht, sie ist nicht umsetzbar
- [x] Über eine Verknüpfungstabelle mit Fremdschlüsseln zu beiden Seiten
- [ ] Durch Duplizieren aller Felder

*Erklärung:* Die Verknüpfungstabelle trägt beide Fremdschlüssel und oft zusätzliche Attribute wie Menge oder Preis.

*Lektion: Entity-Relationship-Modell & Kardinalitäten*

---

**• Was ist ein Fremdschlüssel?**

- [ ] Ein verschlüsseltes Feld
- [x] Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist
- [ ] Ein zufällig erzeugter Wert

*Erklärung:* Der Fremdschlüssel setzt die referenzielle Integrität einer Beziehung technisch um.

*Lektion: Entity-Relationship-Modell & Kardinalitäten*

---

**• Was verhindert die 2NF?**

- [ ] Nicht-atomare Werte
- [x] Teilabhängigkeiten von einem zusammengesetzten Schlüssel
- [ ] Transitive Abhängigkeiten

*Erklärung:* 2NF fordert volle funktionale Abhängigkeit vom gesamten Primärschlüssel.

*Lektion: Normalisierung 1NF bis 3NF*

---

**• Was ist eine transitive Abhängigkeit?**

- [ ] Ein Attribut hängt direkt vom Schlüssel ab
- [x] Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut ab
- [ ] Zwei Tabellen verweisen aufeinander

*Erklärung:* Genau diese indirekte Abhängigkeit verbietet die 3NF.

*Lektion: Normalisierung 1NF bis 3NF*

---

**• Wie wird eine 1:n-Beziehung in Java typischerweise abgebildet?**

- [x] Als Referenz auf der n-Seite und List auf der 1-Seite
- [ ] Immer nur als einzelnes Feld
- [ ] Über static-Variablen

*Erklärung:* Die n-Seite kennt ihr Elternobjekt, die 1-Seite hält eine Collection der Kinder.

*Lektion: Vom ER-Modell zur Java-Klasse*

---

**• Warum sollte ein Getter nicht die interne Liste direkt zurückgeben?**

- [ ] Aus Performancegründen
- [x] Weil Aufrufer sie dann von außen verändern können und die Kapselung wirkungslos wird
- [ ] Weil Java das verbietet

*Erklärung:* Eine unveränderliche Kopie oder Sicht schützt den internen Zustand.

*Lektion: Vom ER-Modell zur Java-Klasse*

---

**• Eine Tabelle enthält BestellNr, Position, Produktname und Produktgewicht. Wogegen verstößt sie?**

- [ ] Gegen die 1NF
- [x] Gegen die 2NF, da die Produktdaten nur von der Position abhängen
- [ ] Gegen gar keine Normalform

*Erklärung:* Klassische Teilabhängigkeit vom zusammengesetzten Schlüssel.

*Lektion: Normalisierung 1NF bis 3NF*

## Modul 3: SQL-Grundlagen vertieft

**• Zu welcher Kategorie gehört CREATE TABLE?**

- [ ] DML
- [x] DDL
- [ ] DCL

*Erklärung:* CREATE verändert die Struktur — Data Definition Language.

*Lektion: DDL, DML und DCL im Überblick*

---

**• Welche Befehle gehören zur Transaktionssteuerung?**

- [ ] GRANT und REVOKE
- [x] COMMIT und ROLLBACK
- [ ] CREATE und DROP

*Erklärung:* COMMIT schreibt eine Transaktion fest, ROLLBACK verwirft sie.

*Lektion: DDL, DML und DCL im Überblick*

---

**• Was liefert ein LEFT OUTER JOIN zusätzlich zum INNER JOIN?**

- [ ] Doppelte Zeilen
- [x] Zeilen der linken Tabelle ohne Treffer, rechts mit NULL
- [ ] Nur sortierte Ergebnisse

*Erklärung:* Die linke Tabelle bleibt vollständig erhalten.

*Lektion: JOIN-Typen im Detail*

---

**• Was erzeugt ein CROSS JOIN?**

- [x] Das kartesische Produkt beider Tabellen
- [ ] Eine leere Menge
- [ ] Nur eindeutige Paare

*Erklärung:* Jede Zeile links wird mit jeder Zeile rechts kombiniert.

*Lektion: JOIN-Typen im Detail*

---

**• Worin unterscheiden sich WHERE und HAVING?**

- [ ] Kein Unterschied
- [x] WHERE filtert Zeilen vor der Gruppierung, HAVING Gruppen danach
- [ ] HAVING funktioniert nur mit JOINs

*Erklärung:* Nur HAVING darf sich auf Aggregatfunktionen beziehen.

*Lektion: Aggregation, GROUP BY, HAVING und Subqueries*

---

**• Wie prüft man in SQL korrekt auf einen fehlenden Wert?**

- [ ] feld = NULL
- [x] feld IS NULL
- [ ] feld == NULL

*Erklärung:* NULL ist kein Wert, sondern dessen Abwesenheit — Vergleiche mit = ergeben „unbekannt".

*Lektion: Aggregation, GROUP BY, HAVING und Subqueries*

---

**• Wie prüft man in SQL korrekt auf einen fehlenden Wert?**

- [ ] feld = NULL
- [x] feld IS NULL
- [ ] feld == NULL

*Erklärung:* NULL ist kein Wert, sondern dessen Abwesenheit — Vergleiche mit = ergeben „unbekannt".

*Lektion: Aggregation, GROUP BY, HAVING und Subqueries*

## Modul 4: Vorgehensmodelle & Software-Lifecycle

**• Was ergänzt das V-Modell gegenüber dem Wasserfall?**

- [ ] Tägliche Meetings
- [x] Jeder Entwicklungsphase ist eine Testphase zugeordnet
- [ ] Verzicht auf Dokumentation

*Erklärung:* Die linke Seite des V beschreibt Entwurf, die rechte die zugehörigen Teststufen.

*Lektion: Wasserfall, V-Modell, Scrum und Kanban*

---

**• Welches Element gehört zu Kanban, nicht zu Scrum?**

- [ ] Sprint Backlog
- [x] WIP-Limit
- [ ] Sprint Review

*Erklärung:* Kanban begrenzt die parallele Arbeit statt in festen Iterationen zu planen.

*Lektion: Wasserfall, V-Modell, Scrum und Kanban*

---

**• Wer erstellt das Lastenheft?**

- [x] Der Auftraggeber
- [ ] Der Auftragnehmer
- [ ] Das Testteam

*Erklärung:* Es beschreibt die Anforderungen aus Sicht des Bestellers.

*Lektion: Lastenheft, Pflichtenheft & Anforderungsanalyse*

---

**• Was ist eine nicht-funktionale Anforderung?**

- [ ] Nutzer können Bestellungen anlegen
- [x] Die Antwortzeit liegt unter 200 ms
- [ ] Die Mehrwertsteuer wird berechnet

*Erklärung:* Nicht-funktionale Anforderungen beschreiben Qualitätseigenschaften, keine Funktionen.

*Lektion: Lastenheft, Pflichtenheft & Anforderungsanalyse*

---

**• Was begrenzt ein WIP-Limit in Kanban?**

- [x] Die Anzahl gleichzeitig in Arbeit befindlicher Aufgaben
- [ ] Die Länge eines Sprints
- [ ] Die Teamgröße

*Erklärung:* WIP-Limits erzwingen Fokus und machen Engpässe im Arbeitsfluss sichtbar.

*Lektion: Wasserfall, V-Modell, Scrum und Kanban*

## Modul 5: UML für Anwendungsentwickler

**• Was kennzeichnet <<include>>?**

- [ ] Einen optionalen Anwendungsfall
- [x] Einen immer mit ausgeführten Teilanwendungsfall
- [ ] Eine Vererbung zwischen Akteuren

*Erklärung:* Der eingebundene Fall ist fester Bestandteil des Basisfalls.

*Lektion: Use-Case-Diagramme*

---

**• Wo stehen Akteure im Use-Case-Diagramm?**

- [ ] Innerhalb der Systemgrenze
- [x] Außerhalb der Systemgrenze
- [ ] Es gibt keine Systemgrenze

*Erklärung:* Akteure sind per Definition außerhalb des betrachteten Systems.

*Lektion: Use-Case-Diagramme*

---

**• Welche UML-Beziehung entspricht "implements" in Java?**

- [ ] Generalisierung
- [x] Realisierung
- [ ] Komposition

*Erklärung:* Die Realisierung wird als gestrichelter Pfeil mit geschlossener Spitze gezeichnet.

*Lektion: Klassendiagramme & Beziehungstypen*

---

**• Was bedeutet die Multiplizität 1..* ?**

- [ ] Genau eins
- [x] Mindestens eins, nach oben offen
- [ ] Höchstens eins

*Erklärung:* Der Stern steht für eine unbegrenzte Obergrenze.

*Lektion: Klassendiagramme & Beziehungstypen*

---

**• Was bedeutet die Multiplizität 0..1 an einem Assoziationsende?**

- [ ] Genau eines
- [x] Höchstens eines, auch keines möglich
- [ ] Mindestens eines

*Erklärung:* 0..1 erlaubt das Fehlen der Beziehung — in Java oft ein Optional oder ein nullbares Feld.

*Lektion: Klassendiagramme & Beziehungstypen*

## Modul 6: Testtheorie & Qualitätssicherung

**• Was prüft die Grenzwertanalyse?**

- [ ] Werte in der Mitte jeder Klasse
- [x] Werte direkt an den Klassenrändern
- [ ] Nur ungültige Eingaben

*Erklärung:* An den Bereichsgrenzen treten Vergleichsfehler wie < statt <= am häufigsten auf.

*Lektion: Black-Box, White-Box, Äquivalenzklassen, Grenzwerte*

---

**• Was kennzeichnet einen White-Box-Test?**

- [x] Kenntnis der internen Codestruktur
- [ ] Ausschließlich manuelle Durchführung
- [ ] Verzicht auf Testdaten

*Erklärung:* Nur mit Codekenntnis lassen sich Überdeckungsmaße wie Zweigüberdeckung bestimmen.

*Lektion: Black-Box, White-Box, Äquivalenzklassen, Grenzwerte*

---

**• Welche Testart bildet die breite Basis der Testpyramide?**

- [ ] End-to-End-Tests
- [x] Unit-Tests
- [ ] Manuelle Abnahmetests

*Erklärung:* Sie sind schnell, zahlreich und lokalisieren Fehler präzise.

*Lektion: Testpyramide und Teststufen*

---

**• Wozu dienen Regressionstests?**

- [ ] Neue Funktionen zu spezifizieren
- [x] Sicherzustellen, dass bisher funktionierende Teile nach Änderungen weiter funktionieren
- [ ] Die Performance zu messen

*Erklärung:* Sie schützen den bereits erreichten Stand gegen unbeabsichtigte Nebenwirkungen.

*Lektion: Testpyramide und Teststufen*

---

**• Ein Feld akzeptiert Werte von 1 bis 100. Welche Grenzwerte testest du?**

- [ ] Nur 1 und 100
- [x] 0, 1, 100, 101
- [ ] Nur 50

*Erklärung:* Die Grenzwertanalyse prüft jeweils direkt innerhalb und außerhalb der Bereichsgrenzen.

*Lektion: Black-Box, White-Box, Äquivalenzklassen, Grenzwerte*

## Modul 7: Einstieg: Programm, JVM, Typen

**• Was erzeugt der Java-Compiler javac?**

- [ ] Nativen Maschinencode
- [x] Bytecode in einer .class-Datei
- [ ] Direkt ausführbare .exe-Dateien

*Erklärung:* Der plattformunabhängige Bytecode wird erst von der JVM ausgeführt — das ist die Grundlage der Plattformunabhängigkeit.

*Lektion: Dein erstes Java-Programm*

---

**• Warum muss main static sein?**

- [ ] Aus Performancegründen
- [x] Weil beim Programmstart noch kein Objekt der Klasse existiert
- [ ] Damit sie überschrieben werden kann

*Erklärung:* Statische Methoden gehören zur Klasse selbst und können ohne Instanz aufgerufen werden.

*Lektion: Dein erstes Java-Programm*

---

**• Was passiert bei int[] y = x; für zwei Arrays?**

- [ ] Das Array wird kopiert
- [x] Beide Variablen zeigen auf dasselbe Array im Speicher
- [ ] Es entsteht ein Kompilierfehler

*Erklärung:* Arrays sind Referenztypen — kopiert wird nur der Verweis, nicht der Inhalt.

*Lektion: Primitive Typen und Referenztypen*

---

**• Welcher Typ gehört zu Geldbeträgen?**

- [ ] double
- [ ] float
- [x] BigDecimal

*Erklärung:* Gleitkommatypen können Dezimalbrüche nicht exakt darstellen; BigDecimal rechnet exakt.

*Lektion: Primitive Typen und Referenztypen*

---

**• Womit vergleicht man Strings inhaltlich?**

- [ ] Mit ==
- [x] Mit equals()
- [ ] Mit compareTo() == 1

*Erklärung:* == vergleicht bei Referenztypen die Identität des Objekts, nicht den Inhalt.

*Lektion: Strings und Textverarbeitung*

---

**• Warum StringBuilder statt + in Schleifen?**

- [ ] + ist syntaktisch verboten
- [x] Jedes + erzeugt ein neues String-Objekt, wodurch die Laufzeit quadratisch wird
- [ ] StringBuilder ist threadsicher

*Erklärung:* Weil Strings unveränderlich sind, entsteht bei jeder Verkettung ein neues Objekt samt Kopieraufwand.

*Lektion: Strings und Textverarbeitung*

---

**• Was passiert bei einem vergessenen break in der klassischen switch-Anweisung?**

- [ ] Kompilierfehler
- [x] Die Ausführung läuft in den nächsten case weiter (fall-through)
- [ ] Der Block wird übersprungen

*Erklärung:* Genau deshalb sind switch expressions mit Pfeilsyntax die sicherere Wahl.

*Lektion: Kontrollstrukturen und moderne Syntax*

---

**• Was bewirkt var bei einer lokalen Variable?**

- [ ] Sie wird dynamisch typisiert wie in JavaScript
- [x] Der Compiler leitet den statischen Typ aus der Zuweisung ab
- [ ] Sie wird automatisch final

*Erklärung:* var ist reine Schreiberleichterung — die Typprüfung findet weiterhin zur Compilezeit statt.

*Lektion: Kontrollstrukturen und moderne Syntax*

---

**• Was ist der Unterschied zwischen JDK und JRE?**

- [ ] Kein Unterschied
- [x] Das JDK enthält zusätzlich Compiler und Entwicklerwerkzeuge
- [ ] Das JRE ist neuer

*Erklärung:* Zum Entwickeln brauchst du das JDK; das JRE genügt nur zum Ausführen.

*Lektion: Dein erstes Java-Programm*

---

**• Was ergibt in Java 7 / 2 bei zwei int-Werten?**

- [ ] 3.5
- [x] 3
- [ ] Einen Kompilierfehler

*Erklärung:* Bei zwei Ganzzahlen wird ganzzahlig dividiert und der Rest abgeschnitten.

*Lektion: Primitive Typen und Referenztypen*

---

**• Welcher Wert steht in a nach int[] x={1,2}; int[] y=x; y[0]=9;**

- [ ] x[0] ist 1
- [x] x[0] ist 9
- [ ] Es entsteht ein Fehler

*Erklärung:* Arrays sind Referenztypen — beide Variablen zeigen auf dasselbe Objekt.

*Lektion: Primitive Typen und Referenztypen*

---

**• Warum liefert "abc" == new String("abc") den Wert false?**

- [ ] Weil der Inhalt unterschiedlich ist
- [x] Weil == bei Objekten die Referenz vergleicht und new ein neues Objekt erzeugt
- [ ] Weil Strings nicht vergleichbar sind

*Erklärung:* Inhaltlich vergleicht man mit equals().

*Lektion: Strings und Textverarbeitung*

---

**• Was bewirkt das Schlüsselwort final bei einer lokalen Variablen?**

- [x] Sie kann nach der ersten Zuweisung nicht neu zugewiesen werden
- [ ] Das Objekt wird unveränderlich
- [ ] Sie wird statisch

*Erklärung:* final schützt die Referenz, nicht den Inhalt des referenzierten Objekts.

*Lektion: Kontrollstrukturen und moderne Syntax*

## Modul 8: Objektorientierung im Kern

**• Was passiert mit dem Standardkonstruktor, sobald du einen eigenen Konstruktor schreibst?**

- [ ] Er bleibt zusätzlich erhalten
- [x] Er wird nicht mehr erzeugt
- [ ] Er muss überschrieben werden

*Erklärung:* Der Compiler erzeugt den parameterlosen Konstruktor nur, wenn gar keiner deklariert ist.

*Lektion: Klassen, Objekte, Konstruktoren*

---

**• Warum sollten Felder private sein?**

- [ ] Weil Java das erzwingt
- [x] Damit die interne Darstellung änderbar bleibt und Validierung möglich ist
- [ ] Aus Performancegründen

*Erklärung:* Kapselung trennt die stabile Schnittstelle von der veränderlichen Implementierung.

*Lektion: Klassen, Objekte, Konstruktoren*

---

**• Was bewirkt die Annotation @Override?**

- [ ] Sie ist Pflicht, sonst überschreibt die Methode nicht
- [x] Der Compiler prüft, ob wirklich eine geerbte Methode überschrieben wird
- [ ] Sie macht die Methode final

*Erklärung:* Technisch optional, praktisch unverzichtbar — sie fängt Tippfehler und falsche Signaturen ab.

*Lektion: Vererbung und Polymorphie*

---

**• Was ist dynamic dispatch?**

- [x] Die Methode der tatsächlichen Objektklasse wird zur Laufzeit gewählt
- [ ] Der Compiler wählt die Methode fest aus
- [ ] Methoden werden zufällig aufgerufen

*Erklärung:* Der deklarierte Variablentyp bestimmt, was aufrufbar ist — das Objekt bestimmt, was ausgeführt wird.

*Lektion: Vererbung und Polymorphie*

---

**• Wie viele Interfaces kann eine Java-Klasse implementieren?**

- [ ] Genau eines
- [x] Beliebig viele
- [ ] Höchstens zwei

*Erklärung:* Nur bei der Klassenvererbung ist Java auf eine Oberklasse beschränkt.

*Lektion: Interfaces und abstrakte Klassen*

---

**• Was ist der wesentliche Unterschied zur abstrakten Klasse?**

- [x] Interfaces können keinen veränderlichen Zustand halten
- [ ] Interfaces sind schneller
- [ ] Abstrakte Klassen haben keine Methoden

*Erklärung:* Interfaces beschreiben Fähigkeiten, abstrakte Klassen teilen zusätzlich Zustand und Basisimplementierung.

*Lektion: Interfaces und abstrakte Klassen*

---

**• Was erzeugt ein record automatisch?**

- [ ] Nur den Konstruktor
- [x] Konstruktor, Getter, equals, hashCode und toString
- [ ] Eine Datenbanktabelle

*Erklärung:* Records sind unveränderliche Datenträger mit vollständig generierter Standardausstattung.

*Lektion: Records, Enums und sealed types*

---

**• Wozu dient sealed?**

- [ ] Um eine Klasse zu verschlüsseln
- [x] Um einzuschränken, welche Klassen erben dürfen
- [ ] Um Felder unveränderlich zu machen

*Erklärung:* Der begrenzte Typbaum erlaubt dem Compiler die Vollständigkeitsprüfung in switch.

*Lektion: Records, Enums und sealed types*

---

**• Was passiert, wenn ein Konstruktor eine Exception wirft?**

- [ ] Das Objekt existiert halbfertig
- [x] Es entsteht kein gültiges Objekt, die Referenz wird nicht zugewiesen
- [ ] Der Konstruktor wird wiederholt

*Erklärung:* Deshalb ist der Konstruktor der richtige Ort für Validierung.

*Lektion: Klassen, Objekte, Konstruktoren*

---

**• Was bedeutet der Modifier protected?**

- [ ] Zugriff nur in derselben Klasse
- [x] Zugriff im selben Paket und in Unterklassen
- [ ] Zugriff von überall

*Erklärung:* private ist enger, public weiter; ohne Angabe gilt package-private.

*Lektion: Vererbung und Polymorphie*

---

**• Kann ein Interface Felder mit veränderlichem Zustand enthalten?**

- [ ] Ja, beliebig
- [x] Nein, nur Konstanten (public static final)
- [ ] Nur private Felder

*Erklärung:* Zustand ist genau der Unterschied zur abstrakten Klasse.

*Lektion: Interfaces und abstrakte Klassen*

---

**• Was ist bei einem record automatisch unveränderlich?**

- [ ] Nur der Konstruktor
- [x] Alle Komponenten, sie erhalten final-Felder
- [ ] Nichts

*Erklärung:* Records sind als unveränderliche Datenträger konzipiert.

*Lektion: Records, Enums und sealed types*

## Modul 9: Collections & Generics

**• Welche Struktur garantiert Eindeutigkeit bei konstantem Zugriff?**

- [ ] ArrayList
- [x] HashSet
- [ ] LinkedList

*Erklärung:* HashSet verhindert Duplikate und prüft die Zugehörigkeit in O(1).

*Lektion: List, Set, Map — welche wann?*

---

**• Warum ist ArrayList meist besser als LinkedList?**

- [x] Sie braucht weniger Speicher pro Element und bietet O(1)-Indexzugriff
- [ ] Sie ist threadsicher
- [ ] Sie sortiert automatisch

*Erklärung:* LinkedList lohnt fast nur als Queue/Deque; für Indexzugriffe ist sie deutlich langsamer.

*Lektion: List, Set, Map — welche wann?*

---

**• Was fordert der equals/hashCode-Vertrag?**

- [x] Gleiche Objekte müssen gleichen hashCode liefern
- [ ] Gleicher hashCode bedeutet immer Gleichheit
- [ ] hashCode muss eindeutig sein

*Erklärung:* Die Umkehrung gilt nicht — Kollisionen sind erlaubt und normal.

*Lektion: equals, hashCode und Comparable*

---

**• Was passiert, wenn ein in hashCode verwendetes Feld nach dem Einfügen ins HashSet geändert wird?**

- [ ] Nichts Besonderes
- [x] Das Objekt wird im falschen Bucket gesucht und ist praktisch unauffindbar
- [ ] Das Set sortiert sich neu

*Erklärung:* Deshalb gehören nur unveränderliche Felder in hashCode.

*Lektion: equals, hashCode und Comparable*

---

**• Was bedeutet Type Erasure?**

- [x] Generics werden zur Laufzeit entfernt und existieren nur zur Compilezeit
- [ ] Generics löschen ungenutzte Objekte
- [ ] Typen werden zufällig gewählt

*Erklärung:* Deshalb sind Konstrukte wie new T[] oder instanceof List<String> nicht möglich.

*Lektion: Generics und Wildcards*

---

**• Wofür steht PECS?**

- [x] Producer extends, Consumer super
- [ ] Public extends, Class super
- [ ] Parameter extends, Class static

*Erklärung:* Liest du Werte heraus, nutze extends; fügst du Werte hinzu, nutze super.

*Lektion: Generics und Wildcards*

---

**• Wie entfernst du korrekt Elemente während der Iteration?**

- [ ] Mit list.remove() in der for-each-Schleife
- [x] Mit removeIf() oder Iterator.remove()
- [ ] Gar nicht, das ist unmöglich

*Erklärung:* Beide Wege informieren die Collection über die Änderung und halten den Iterator konsistent.

*Lektion: Iteration, Modifikation und typische Fallen*

---

**• Was liefert Arrays.asList("a","b")?**

- [ ] Eine normal erweiterbare ArrayList
- [x] Eine Liste fester Größe über dem Array
- [ ] Ein unveränderliches Set

*Erklärung:* Setzen einzelner Werte ist erlaubt, Hinzufügen und Entfernen nicht.

*Lektion: Iteration, Modifikation und typische Fallen*

---

**• Welche Collection eignet sich, wenn Reihenfolge UND Eindeutigkeit gefordert sind?**

- [ ] HashSet
- [x] LinkedHashSet
- [ ] ArrayList

*Erklärung:* LinkedHashSet verhindert Duplikate und bewahrt die Einfügereihenfolge.

*Lektion: List, Set, Map — welche wann?*

---

**• Was passiert, wenn equals überschrieben wird, hashCode aber nicht?**

- [ ] Nichts
- [x] Das Objekt wird in HashSet und HashMap nicht wiedergefunden
- [ ] Der Code kompiliert nicht

*Erklärung:* Die Hash-basierten Sammlungen suchen dann im falschen Bucket.

*Lektion: equals, hashCode und Comparable*

---

**• Warum lässt sich verarbeite(List<String>) und verarbeite(List<Integer>) nicht überladen?**

- [x] Wegen Type Erasure haben beide zur Laufzeit dieselbe Signatur
- [ ] Weil Java keine Überladung kennt
- [ ] Weil List nicht generisch ist

*Erklärung:* Nach dem Löschen der Typinformation sind die Methoden nicht mehr unterscheidbar.

*Lektion: Generics und Wildcards*

---

**• Was löst eine ConcurrentModificationException typischerweise aus?**

- [ ] Zwei Threads
- [x] Das Entfernen eines Elements während einer for-each-Schleife
- [ ] Ein zu großes Array

*Erklärung:* Der Iterator erkennt die strukturelle Änderung und bricht bewusst ab (Fail-Fast).

*Lektion: Iteration, Modifikation und typische Fallen*

## Modul 10: Exceptions & Ressourcen

**• Was kennzeichnet eine Checked Exception?**

- [x] Der Compiler erzwingt Behandlung oder Weitergabe
- [ ] Sie kann nicht gefangen werden
- [ ] Sie tritt nur zur Compilezeit auf

*Erklärung:* Checked Exceptions stehen für erwartbare Ausnahmesituationen, mit denen der Aufrufer umgehen muss.

*Lektion: Checked, Unchecked und die Fehlerhierarchie*

---

**• Wozu dient der cause-Parameter beim Umwandeln einer Exception?**

- [ ] Zur Verschönerung der Meldung
- [x] Er erhält den ursprünglichen Stacktrace und damit die eigentliche Fehlerquelle
- [ ] Er ist reine Konvention ohne Wirkung

*Erklärung:* Ohne cause geht die Information verloren, wo der Fehler wirklich entstand.

*Lektion: Checked, Unchecked und die Fehlerhierarchie*

---

**• Welche Bedingung muss eine Klasse für try-with-resources erfüllen?**

- [ ] Sie muss Serializable implementieren
- [x] Sie muss AutoCloseable (oder Closeable) implementieren
- [ ] Sie muss final sein

*Erklärung:* Die close()-Methode aus AutoCloseable wird automatisch aufgerufen.

*Lektion: try-with-resources und sauberes Aufräumen*

---

**• In welcher Reihenfolge werden mehrere Ressourcen geschlossen?**

- [ ] In Öffnungsreihenfolge
- [x] In umgekehrter Öffnungsreihenfolge
- [ ] Zufällig

*Erklärung:* Zuletzt geöffnete Ressourcen werden zuerst geschlossen — analog zum Stack.

*Lektion: try-with-resources und sauberes Aufräumen*

---

**• Was solltest du statt null bei einer leeren Ergebnismenge zurückgeben?**

- [x] Eine leere Collection
- [ ] null mit Kommentar
- [ ] Eine Exception

*Erklärung:* Leere Collections ersparen jedem Aufrufer die Null-Prüfung.

*Lektion: Eigene Exceptions und der Umgang mit null*

---

**• Warum ist ein leerer catch-Block problematisch?**

- [ ] Er verlangsamt das Programm
- [x] Der Fehler verschwindet spurlos und das Programm läuft mit inkonsistentem Zustand weiter
- [ ] Er ist syntaktisch ungültig

*Erklärung:* Stille Fehler sind die teuersten, weil sie erst weit entfernt von ihrer Ursache auffallen.

*Lektion: Eigene Exceptions und der Umgang mit null*

---

**• Welche Exception-Art muss der Compiler behandelt sehen?**

- [ ] RuntimeException
- [x] Checked Exception
- [ ] Error

*Erklärung:* Checked Exceptions erzwingen catch oder throws.

*Lektion: Checked, Unchecked und die Fehlerhierarchie*

---

**• Was passiert bei try-with-resources, wenn close() ebenfalls eine Exception wirft?**

- [ ] Sie überschreibt die ursprüngliche
- [x] Sie wird als suppressed exception angehängt
- [ ] Sie wird ignoriert

*Erklärung:* So bleibt der ursprüngliche Fehler erhalten und sichtbar.

*Lektion: try-with-resources und sauberes Aufräumen*

## Modul 11: Lambdas, Streams & funktionale Programmierung

**• Was kennzeichnet ein funktionales Interface?**

- [x] Es hat genau eine abstrakte Methode
- [ ] Es hat keine Methoden
- [ ] Es erbt von Function

*Erklärung:* Default- und statische Methoden sind zusätzlich erlaubt — nur eine abstrakte Methode darf es geben.

*Lektion: Lambdas und funktionale Interfaces*

---

**• Welches Interface passt zu filter()?**

- [ ] Function
- [x] Predicate
- [ ] Consumer

*Erklärung:* filter() erwartet eine Bedingung, also T → boolean.

*Lektion: Lambdas und funktionale Interfaces*

---

**• Wann beginnt ein Stream tatsächlich zu arbeiten?**

- [ ] Sofort bei stream()
- [x] Erst bei der terminalen Operation
- [ ] Nach dem ersten map()

*Erklärung:* Intermediäre Operationen bauen nur die Pipeline auf — sie sind lazy.

*Lektion: Die Stream-Pipeline*

---

**• Warum sollte man in Streams Seiteneffekte vermeiden?**

- [ ] Weil es verboten ist
- [x] Weil der Code bei parallelStream() sonst fehlerhaft und nicht reproduzierbar wird
- [ ] Weil es langsamer ist

*Erklärung:* Nur seiteneffektfreie Pipelines lassen sich gefahrlos parallelisieren.

*Lektion: Die Stream-Pipeline*

---

**• Was leistet Collectors.groupingBy()?**

- [ ] Es sortiert den Stream
- [x] Es gruppiert Elemente nach einem Schlüssel in eine Map
- [ ] Es entfernt Duplikate

*Erklärung:* Optional lässt sich pro Gruppe ein weiterer Collector zum Aggregieren angeben.

*Lektion: Collectors: Ergebnisse einsammeln*

---

**• Was passiert bei Collectors.toMap() mit doppelten Schlüsseln ohne Merge-Funktion?**

- [ ] Der letzte Wert gewinnt
- [x] Es wird eine IllegalStateException geworfen
- [ ] Der Eintrag wird übersprungen

*Erklärung:* Deshalb gehört die dritte Merge-Funktion praktisch immer dazu.

*Lektion: Collectors: Ergebnisse einsammeln*

---

**• Wofür ist Optional gedacht?**

- [ ] Als Feldtyp in Entitäten
- [x] Als Rückgabetyp für Methoden, die legitim nichts finden können
- [ ] Als Ersatz für alle Collections

*Erklärung:* Als Feld oder Parameter bringt Optional nur Overhead ohne echten Nutzen.

*Lektion: Optional richtig einsetzen*

---

**• Was unterscheidet orElse von orElseGet?**

- [ ] Kein Unterschied
- [x] orElse wertet sein Argument immer aus, orElseGet nur bei leerem Optional
- [ ] orElseGet wirft eine Exception

*Erklärung:* Bei teuren Fallbacks ist das ein spürbarer Unterschied.

*Lektion: Optional richtig einsetzen*

---

**• Wofür steht die Methodenreferenz String::isBlank?**

- [x] Für ein Lambda s -> s.isBlank()
- [ ] Für einen Konstruktoraufruf
- [ ] Für eine statische Variable

*Erklärung:* Methodenreferenzen sind die Kurzform für Lambdas, die nur eine Methode aufrufen.

*Lektion: Lambdas und funktionale Interfaces*

---

**• Was passiert bei einer Stream-Pipeline ohne terminale Operation?**

- [ ] Sie läuft sofort
- [x] Es passiert gar nichts, da intermediäre Operationen lazy sind
- [ ] Es gibt einen Kompilierfehler

*Erklärung:* Erst die terminale Operation stößt die Verarbeitung an.

*Lektion: Die Stream-Pipeline*

---

**• Was ist der Unterschied zwischen orElse und orElseGet?**

- [ ] Kein Unterschied
- [x] orElse wertet sein Argument immer aus, orElseGet nur bei leerem Optional
- [ ] orElseGet wirft eine Exception

*Erklärung:* Bei teuren Fallbacks ist das ein echter Performanceunterschied.

*Lektion: Optional richtig einsetzen*

## Modul 12: Speichermodell & Performance

**• Wo liegen Objekte in Java?**

- [ ] Auf dem Stack
- [x] Auf dem Heap
- [ ] In der Klassendatei

*Erklärung:* Der Stack hält nur lokale Variablen, Parameter und Referenzen — die Objekte selbst liegen im Heap.

*Lektion: Stack, Heap und Garbage Collection*

---

**• Wodurch entsteht in Java typischerweise ein Memory Leak?**

- [ ] Durch vergessenes free()
- [x] Durch Referenzen, die unnötig gehalten werden, etwa in statischen Sammlungen
- [ ] Durch zu viele Klassen

*Erklärung:* Die GC räumt nur auf, was nicht mehr erreichbar ist.

*Lektion: Stack, Heap und Garbage Collection*

---

**• Warum sind unveränderliche Objekte threadsicher?**

- [ ] Weil die JVM sie sperrt
- [x] Weil es keinen veränderlichen Zustand gibt, um den Threads konkurrieren könnten
- [ ] Weil sie synchronized sind

*Erklärung:* Ohne Zustandsänderung kann es keine Race Condition geben.

*Lektion: Unveränderlichkeit und defensive Kopien*

---

**• Warum reicht final an einem List-Feld nicht aus?**

- [x] final verhindert nur das Neuzuweisen der Referenz, nicht das Ändern des Inhalts
- [ ] final wirkt bei Listen gar nicht
- [ ] Weil Listen immer unveränderlich sind

*Erklärung:* Der Inhalt bleibt änderbar — deshalb braucht es eine unveränderliche Kopie.

*Lektion: Unveränderlichkeit und defensive Kopien*

---

**• Was ist das Problem bei Long summe = 0L in einer Millionenschleife?**

- [ ] Es kompiliert nicht
- [x] Jede Addition erzeugt durch Autoboxing ein neues Objekt
- [ ] Long kann nicht addieren

*Erklärung:* Der Wrapper-Typ zwingt zu Boxing und Unboxing bei jedem Schritt.

*Lektion: Typische Performance-Fallen*

---

**• Wie löst man zwei verschachtelte Schleifen über verknüpfte Listen auf?**

- [ ] Durch mehr Threads
- [x] Durch einen Index als Map, danach Nachschlagen in O(1)
- [ ] Gar nicht

*Erklärung:* Aus O(n·m) wird so O(n+m) — derselbe Gedanke wie ein Datenbankindex.

*Lektion: Typische Performance-Fallen*

---

**• Wodurch entsteht in Java typischerweise ein Memory Leak?**

- [ ] Durch vergessenes free()
- [x] Durch Referenzen, die unnötig gehalten werden, etwa in statischen Sammlungen
- [ ] Durch zu viele Klassen

*Erklärung:* Die Garbage Collection räumt nur auf, was nicht mehr erreichbar ist.

*Lektion: Stack, Heap und Garbage Collection*

---

**• Warum ist Long summe = 0L in einer Millionenschleife problematisch?**

- [ ] Es kompiliert nicht
- [x] Jede Addition erzeugt durch Autoboxing ein neues Objekt
- [ ] Long kann nicht addieren

*Erklärung:* Der Wrapper-Typ erzwingt Boxing und Unboxing bei jedem Schritt.

*Lektion: Typische Performance-Fallen*

## Modul 13: Nebenläufigkeit

**• Was ist der Unterschied zwischen start() und run()?**

- [ ] Kein Unterschied
- [x] start() startet einen neuen Thread, run() führt den Code im aktuellen Thread aus
- [ ] run() ist schneller

*Erklärung:* Der direkte Aufruf von run() erzeugt überhaupt keine Nebenläufigkeit.

*Lektion: Threads, Runnable und der Lebenszyklus*

---

**• Wofür eignen sich Virtual Threads besonders?**

- [ ] Für rechenintensive Berechnungen
- [x] Für viele blockierende Aufgaben wie Netzwerk- und Datenbankaufrufe
- [ ] Für die grafische Oberfläche

*Erklärung:* Beim Blockieren geben sie den Trägerthread frei — deshalb skalieren sie enorm.

*Lektion: Threads, Runnable und der Lebenszyklus*

---

**• Warum ist zaehler++ nicht threadsicher?**

- [ ] Weil es zu langsam ist
- [x] Weil es aus Lesen, Erhöhen und Schreiben besteht und dazwischen unterbrochen werden kann
- [ ] Weil int zu klein ist

*Erklärung:* Zwei Threads können denselben Ausgangswert lesen — eine Erhöhung geht verloren.

*Lektion: Race Conditions, synchronized und volatile*

---

**• Was leistet volatile?**

- [ ] Gegenseitigen Ausschluss
- [x] Nur Sichtbarkeit von Änderungen zwischen Threads
- [ ] Atomare Rechenoperationen

*Erklärung:* Für atomare Zähloperationen braucht es AtomicInteger oder synchronized.

*Lektion: Race Conditions, synchronized und volatile*

---

**• Was liefert die Ausführung eines Callable über einen ExecutorService?**

- [x] Ein Future mit dem späteren Ergebnis
- [ ] Direkt den Wert
- [ ] Immer null

*Erklärung:* Future.get() blockiert, bis das Ergebnis vorliegt.

*Lektion: ExecutorService und Thread-Pools*

---

**• Wie dimensioniert man einen Pool für CPU-intensive Aufgaben?**

- [ ] So viele Threads wie möglich
- [x] Etwa so viele wie verfügbare Prozessorkerne
- [ ] Immer genau einen

*Erklärung:* Mehr Threads bringen bei reiner Rechenlast keinen Gewinn, nur Kontextwechsel.

*Lektion: ExecutorService und Thread-Pools*

---

**• Wozu dient thenCombine?**

- [ ] Zum Abbrechen einer Kette
- [x] Um zwei unabhängige asynchrone Ergebnisse zusammenzuführen
- [ ] Um synchron zu warten

*Erklärung:* Beide Berechnungen laufen parallel, die Funktion verbindet ihre Resultate.

*Lektion: CompletableFuture: asynchrone Ketten*

---

**• Warum sollte man bei blockierender Arbeit einen eigenen Executor angeben?**

- [ ] Aus Stilgründen
- [x] Weil sonst der gemeinsame ForkJoinPool blockiert und andere Aufgaben ausbremst
- [ ] Weil es sonst nicht kompiliert

*Erklärung:* Der commonPool ist knapp dimensioniert und wird anwendungsweit geteilt.

*Lektion: CompletableFuture: asynchrone Ketten*

---

**• Was garantiert volatile?**

- [ ] Atomare Operationen
- [x] Nur die Sichtbarkeit von Änderungen zwischen Threads
- [ ] Gegenseitigen Ausschluss

*Erklärung:* Für atomares Hochzählen braucht es AtomicInteger oder synchronized.

*Lektion: Race Conditions, synchronized und volatile*

---

**• Wie viele Threads sind für rein rechenintensive Aufgaben sinnvoll?**

- [ ] So viele wie möglich
- [x] Etwa so viele wie Prozessorkerne
- [ ] Immer genau einer

*Erklärung:* Mehr Threads bringen bei reiner Rechenlast nur Kontextwechsel.

*Lektion: ExecutorService und Thread-Pools*

## Modul 14: Datum, Zeit, Dateien & JSON

**• Was liefert heute.plusDays(30) bei einem LocalDate?**

- [ ] Es verändert das Objekt
- [x] Es liefert ein neues Objekt, das Original bleibt unverändert
- [ ] Es wirft eine Exception

*Erklärung:* Alle java.time-Typen sind unveränderlich — jede Operation gibt ein neues Objekt zurück.

*Lektion: java.time richtig verwenden*

---

**• Welcher Typ passt für einen gespeicherten Zeitstempel?**

- [ ] LocalDateTime
- [x] Instant (UTC)
- [ ] LocalTime

*Erklärung:* Instant ist zeitzonenunabhängig und damit eindeutig.

*Lektion: java.time richtig verwenden*

---

**• Warum muss Files.lines() in try-with-resources stehen?**

- [ ] Aus Konvention
- [x] Weil der Stream eine offene Datei hält, die geschlossen werden muss
- [ ] Weil es sonst nicht kompiliert

*Erklärung:* Anders als Collection-Streams besitzt er eine Systemressource.

*Lektion: Dateien lesen und schreiben mit NIO.2*

---

**• Warum sollte das Encoding explizit angegeben werden?**

- [ ] Um Speicher zu sparen
- [x] Weil sonst plattformabhängig unterschiedlich kodiert wird und Umlaute brechen
- [ ] Weil UTF-8 langsamer ist

*Erklärung:* Der Klassiker: lokal korrekt, auf dem Server zerschossen.

*Lektion: Dateien lesen und schreiben mit NIO.2*

---

**• Was bedeutet Deserialisierung?**

- [ ] Objekt in JSON umwandeln
- [x] JSON in ein Java-Objekt umwandeln
- [ ] Eine Datei löschen

*Erklärung:* Serialisierung ist der umgekehrte Weg vom Objekt zum Textformat.

*Lektion: JSON und Datenaustausch*

---

**• Warum eigene DTO-Klassen für Schnittstellen statt der Domänenobjekte?**

- [x] Damit interne Änderungen nicht ungewollt die öffentliche API verändern
- [ ] Weil Jackson Domänenobjekte nicht lesen kann
- [ ] Aus Performancegründen

*Erklärung:* Die DTO-Schicht entkoppelt interne Modellierung von der veröffentlichten Schnittstelle.

*Lektion: JSON und Datenaustausch*

---

**• Welcher Typ eignet sich für einen gespeicherten Zeitstempel?**

- [ ] LocalDateTime
- [x] Instant (UTC)
- [ ] LocalTime

*Erklärung:* Instant ist zeitzonenunabhängig und damit eindeutig — lokale Zeiten brechen bei der Zeitumstellung.

*Lektion: java.time richtig verwenden*

---

**• Warum sollte beim Dateizugriff das Encoding explizit angegeben werden?**

- [ ] Um Speicher zu sparen
- [x] Weil sonst plattformabhängig kodiert wird und Umlaute brechen
- [ ] Weil UTF-8 langsamer ist

*Erklärung:* Der Klassiker: lokal korrekt, auf dem Server zerschossen.

*Lektion: Dateien lesen und schreiben mit NIO.2*

## Modul 15: Testen mit JUnit 5

**• Wofür steht das AAA-Muster im Test?**

- [x] Arrange, Act, Assert
- [ ] Analyze, Apply, Archive
- [ ] Assert, Attach, Abort

*Erklärung:* Vorbereiten, Ausführen, Prüfen — diese Dreiteilung macht Tests lesbar.

*Lektion: JUnit 5: Struktur und Assertions*

---

**• Wofür eignet sich @ParameterizedTest besonders?**

- [ ] Für Tests ohne Daten
- [x] Um denselben Test mit mehreren Eingabewerten laufen zu lassen, etwa bei Grenzwerten
- [ ] Um Tests zu deaktivieren

*Erklärung:* Genau die Kombination aus Äquivalenzklassen und Grenzwerten aus der Testtheorie.

*Lektion: JUnit 5: Struktur und Assertions*

---

**• Was unterscheidet einen Mock von einem Stub?**

- [ ] Kein Unterschied
- [x] Beim Mock wird zusätzlich geprüft, ob und wie er aufgerufen wurde
- [ ] Ein Stub ist schneller

*Erklärung:* Stubs liefern nur Antworten; Mocks verifizieren zusätzlich die Interaktion.

*Lektion: Test Doubles mit Mockito*

---

**• Was ist die Voraussetzung dafür, Abhängigkeiten im Test ersetzen zu können?**

- [x] Dependency Injection statt new im Methodenrumpf
- [ ] Möglichst viele statische Methoden
- [ ] Finale Klassen

*Erklärung:* Nur von außen gesetzte Abhängigkeiten lassen sich im Test austauschen.

*Lektion: Test Doubles mit Mockito*

---

**• Wie lautet der TDD-Zyklus?**

- [x] Red, Green, Refactor
- [ ] Plan, Build, Ship
- [ ] Write, Deploy, Fix

*Erklärung:* Erst der fehlschlagende Test, dann die Implementierung, dann das Aufräumen.

*Lektion: TDD, Testabdeckung und was Tests wirklich wert sind*

---

**• Was sagt eine hohe Code Coverage NICHT aus?**

- [ ] Welcher Code ausgeführt wurde
- [x] Dass das Verhalten tatsächlich geprüft wurde
- [ ] Welche Zeilen erreicht wurden

*Erklärung:* Ein Test ohne Assertion erzeugt Abdeckung, aber keinerlei Sicherheit.

*Lektion: TDD, Testabdeckung und was Tests wirklich wert sind*

---

**• Was prüft assertThrows?**

- [ ] Dass kein Fehler auftritt
- [x] Dass eine bestimmte Exception geworfen wird
- [ ] Die Ausführungszeit

*Erklärung:* Der geworfene Fehler lässt sich zusätzlich auf seine Meldung prüfen.

*Lektion: JUnit 5: Struktur und Assertions*

---

**• Was sagt eine hohe Code Coverage NICHT aus?**

- [ ] Welche Zeilen ausgeführt wurden
- [x] Dass das Verhalten tatsächlich geprüft wurde
- [ ] Welcher Code erreichbar ist

*Erklärung:* Ein Test ohne Assertion erzeugt Abdeckung, aber keine Sicherheit.

*Lektion: TDD, Testabdeckung und was Tests wirklich wert sind*

## Modul 16: Build, Abhängigkeiten & Ökosystem

**• Was bedeutet der Scope test bei einer Abhängigkeit?**

- [x] Sie wird nur beim Kompilieren und Ausführen der Tests verwendet
- [ ] Sie wird nie verwendet
- [ ] Sie ist nur in Produktion aktiv

*Erklärung:* So landet etwa JUnit nicht im ausgelieferten Artefakt.

*Lektion: Maven und Gradle verstehen*

---

**• Womit findest du Versionskonflikte transitiver Abhängigkeiten?**

- [ ] mvn clean
- [x] mvn dependency:tree
- [ ] mvn compile

*Erklärung:* Der Abhängigkeitsbaum zeigt, welche Version sich durchgesetzt hat und warum.

*Lektion: Maven und Gradle verstehen*

---

**• Warum Platzhalter {} statt String-Konkatenation im Logaufruf?**

- [ ] Aus Stilgründen
- [x] Weil die Auswertung nur erfolgt, wenn das Level aktiv ist
- [ ] Weil + nicht erlaubt ist

*Erklärung:* Das spart bei deaktiviertem DEBUG-Level messbar Rechenzeit.

*Lektion: Logging statt System.out*

---

**• Wie loggt man eine Exception vollständig?**

- [x] Als letztes Argument das Exception-Objekt übergeben
- [ ] Nur e.getMessage() in den Text schreiben
- [ ] Mit printStackTrace()

*Erklärung:* Nur so landet der vollständige Stacktrace im Log.

*Lektion: Logging statt System.out*

---

**• Was besagt eine Erhöhung der MAJOR-Version nach Semantic Versioning?**

- [ ] Nur Fehlerbehebungen
- [x] Es darf inkompatible Änderungen geben
- [ ] Sicherheitsupdate

*Erklärung:* PATCH behebt Fehler, MINOR ergänzt kompatibel, MAJOR darf brechen.

*Lektion: Bibliotheken, Versionen und Sicherheit*

---

**• Warum sind transitive Abhängigkeiten ein Sicherheitsthema?**

- [ ] Sie sind langsamer
- [x] Sie gelangen unbemerkt ins Projekt und können bekannte Schwachstellen mitbringen
- [ ] Sie kosten Lizenzgebühren

*Erklärung:* Genau dieses Muster machte Log4Shell so schwer einzugrenzen.

*Lektion: Bibliotheken, Versionen und Sicherheit*

---

**• Was bedeutet der Scope provided in Maven?**

- [x] Die Abhängigkeit wird zur Laufzeit von der Umgebung bereitgestellt
- [ ] Sie wird nie gebraucht
- [ ] Sie gilt nur für Tests

*Erklärung:* Typisch für Bibliotheken, die der Applikationsserver mitbringt.

*Lektion: Maven und Gradle verstehen*

---

**• Warum Platzhalter {} statt String-Konkatenation im Logaufruf?**

- [ ] Aus Stilgründen
- [x] Weil die Auswertung nur bei aktivem Level erfolgt
- [ ] Weil + nicht erlaubt ist

*Erklärung:* Das spart bei deaktiviertem DEBUG-Level messbar Rechenzeit.

*Lektion: Logging statt System.out*

## Modul 17: Datenbankzugriff mit Java

**• Warum schützt PreparedStatement vor SQL-Injection?**

- [ ] Es entfernt Sonderzeichen
- [x] Es trennt SQL-Struktur von Daten, Parameter können die Abfragelogik nicht verändern
- [ ] Es verschlüsselt die Abfrage

*Erklärung:* Die Abfrage wird geparst, bevor die Parameter eingesetzt werden.

*Lektion: JDBC und PreparedStatement*

---

**• Was gehört bei JDBC zwingend in try-with-resources?**

- [ ] Nur die Connection
- [x] Connection, Statement und ResultSet
- [ ] Nichts davon

*Erklärung:* Alle drei halten Systemressourcen und müssen sicher geschlossen werden.

*Lektion: JDBC und PreparedStatement*

---

**• Wofür steht ACID?**

- [x] Atomicity, Consistency, Isolation, Durability
- [ ] Access, Control, Index, Data
- [ ] Async, Cache, Init, Deploy

*Erklärung:* Die vier Garantien, die eine Transaktion einer Datenbank abverlangt.

*Lektion: Transaktionen und Verbindungspools*

---

**• Was passiert bei eingeschaltetem Autocommit?**

- [ ] Nichts wird gespeichert
- [x] Jede einzelne Anweisung wird sofort festgeschrieben
- [ ] Alles wird erst beim Schließen geschrieben

*Erklärung:* Für mehrteilige fachliche Einheiten muss Autocommit deshalb abgeschaltet werden.

*Lektion: Transaktionen und Verbindungspools*

---

**• Was ist das N+1-Problem?**

- [x] Eine Abfrage für die Liste plus je eine weitere pro Element
- [ ] Ein Fehler beim Zählen
- [ ] Ein Problem mit Primärschlüsseln

*Erklärung:* Typisch beim Zugriff auf lazy geladene Beziehungen innerhalb einer Schleife.

*Lektion: JPA/Hibernate: ORM und seine Tücken*

---

**• Womit lässt es sich vermeiden?**

- [ ] Mit mehr Speicher
- [x] Mit JOIN FETCH oder einem Entity Graph
- [ ] Durch Abschalten der Transaktionen

*Erklärung:* Die Beziehung wird dann in derselben Abfrage mitgeladen.

*Lektion: JPA/Hibernate: ORM und seine Tücken*

---

**• Warum schützt PreparedStatement vor SQL-Injection?**

- [ ] Es entfernt Sonderzeichen
- [x] Es trennt SQL-Struktur von Daten, Parameter ändern die Abfragelogik nicht
- [ ] Es verschlüsselt die Abfrage

*Erklärung:* Die Abfrage wird geparst, bevor die Parameter eingesetzt werden.

*Lektion: JDBC und PreparedStatement*

---

**• Was bedeutet Autocommit in JDBC?**

- [ ] Nichts wird gespeichert
- [x] Jede einzelne Anweisung wird sofort festgeschrieben
- [ ] Alles wird beim Schließen geschrieben

*Erklärung:* Für mehrteilige fachliche Einheiten muss Autocommit abgeschaltet werden.

*Lektion: Transaktionen und Verbindungspools*

## Modul 18: Debugging & fremden Code verstehen

**• Welcher Teil eines Stacktrace nennt die eigentliche Ursache?**

- [ ] Die erste at-Zeile
- [x] Das unterste "Caused by"
- [ ] Die letzte Zeile der Datei

*Erklärung:* Verschachtelte Ursachen werden von außen nach innen aufgeführt — ganz unten steht die Wurzel.

*Lektion: Stacktraces richtig lesen*

---

**• Was bringen Helpful NullPointerExceptions ab Java 14?**

- [ ] Sie verhindern NPEs
- [x] Sie nennen genau, welche Referenz null war
- [ ] Sie unterdrücken die Meldung

*Erklärung:* Statt einer nackten NPE bekommst du den konkreten Ausdruck genannt.

*Lektion: Stacktraces richtig lesen*

---

**• Wofür ist ein Field Watchpoint das richtige Werkzeug?**

- [x] Um anzuhalten, sobald ein Feld gelesen oder geschrieben wird
- [ ] Um Variablen zu löschen
- [ ] Um Tests auszuführen

*Erklärung:* So findet man die Stelle, die einen Wert unerwartet überschreibt.

*Lektion: Der Debugger als Profiwerkzeug*

---

**• Was leistet ein bedingter Breakpoint?**

- [x] Er hält nur, wenn eine angegebene Bedingung zutrifft
- [ ] Er hält immer
- [ ] Er deaktiviert andere Breakpoints

*Erklärung:* Unverzichtbar, wenn nur ein bestimmter Datensatz von vielen problematisch ist.

*Lektion: Der Debugger als Profiwerkzeug*

---

**• Welches Werkzeug beantwortet „Wer ruft diese Methode auf?"**

- [x] Find Usages / Call Hierarchy
- [ ] Der Formatierer
- [ ] Der Profiler

*Erklärung:* Der Verwendungsnachweis ist das zentrale Werkzeug zur Abschätzung von Änderungsfolgen.

*Lektion: Sich in fremdem Code zurechtfinden*

---

**• Warum sind Tests eine gute Dokumentationsquelle?**

- [ ] Sie sind kürzer
- [x] Sie zeigen die beabsichtigte Verwendung und sind nachweislich aktuell
- [ ] Sie enthalten immer Kommentare

*Erklärung:* Veraltete Tests fallen auf, weil sie fehlschlagen — veraltete Kommentare nicht.

*Lektion: Sich in fremdem Code zurechtfinden*

---

**• Welcher Teil eines Stacktrace nennt die eigentliche Ursache?**

- [ ] Die erste at-Zeile
- [x] Das unterste "Caused by"
- [ ] Die letzte Zeile der Datei

*Erklärung:* Verschachtelte Ursachen stehen von außen nach innen — ganz unten die Wurzel.

*Lektion: Stacktraces richtig lesen*

## Modul 19: Entwurfsmuster & Clean Code

**• Was fordert das Single-Responsibility-Prinzip?**

- [ ] Eine Klasse soll nur eine Methode haben
- [x] Eine Klasse soll nur einen Grund zur Änderung haben
- [ ] Eine Klasse darf nichts erben

*Erklärung:* Mehrere Änderungsgründe bedeuten mehrere Verantwortlichkeiten in einer Klasse.

*Lektion: SOLID in der Praxis*

---

**• Warum macht Dependency Inversion eine Klasse testbar?**

- [ ] Weil Interfaces schneller sind
- [x] Weil Abhängigkeiten von außen gesetzt und damit durch Test Doubles ersetzt werden können
- [ ] Weil der Compiler Tests generiert

*Erklärung:* Intern erzeugte Abhängigkeiten lassen sich im Test nicht austauschen.

*Lektion: SOLID in der Praxis*

---

**• Welches Muster kapselt austauschbares Verhalten hinter einem Interface?**

- [ ] Singleton
- [x] Strategy
- [ ] Adapter

*Erklärung:* In modernem Java genügt dafür oft schon ein Lambda oder eine Methodenreferenz.

*Lektion: Die wichtigsten Entwurfsmuster*

---

**• Wozu dient das Builder-Muster?**

- [x] Um Objekte mit vielen optionalen Feldern lesbar zu erzeugen
- [ ] Um Objekte zu löschen
- [ ] Um Vererbung zu ersetzen

*Erklärung:* Es ersetzt unleserliche Konstruktoren mit vielen gleichartigen Parametern.

*Lektion: Die wichtigsten Entwurfsmuster*

---

**• Was ist die Voraussetzung für sicheres Refactoring?**

- [ ] Eine gute IDE
- [x] Tests, die das bestehende Verhalten absichern
- [ ] Ein Code-Review

*Erklärung:* Ohne Tests kann niemand belegen, dass sich das Verhalten nicht geändert hat.

*Lektion: Code Smells und Refactoring*

---

**• Was bedeutet Primitive Obsession?**

- [ ] Zu viele Klassen
- [x] Fachliche Konzepte werden als String oder int statt als eigener Typ modelliert
- [ ] Zu wenige Kommentare

*Erklärung:* Eigene Werttypen bündeln Validierung und verhindern Verwechslungen.

*Lektion: Code Smells und Refactoring*

---

**• Welches SOLID-Prinzip verletzt eine Klasse, die Daten lädt, rechnet und E-Mails verschickt?**

- [x] Single Responsibility
- [ ] Liskov Substitution
- [ ] Interface Segregation

*Erklärung:* Drei Gründe zur Änderung in einer Klasse.

*Lektion: SOLID in der Praxis*

---

**• Was ist die Voraussetzung für sicheres Refactoring?**

- [ ] Eine gute IDE
- [x] Tests, die das bestehende Verhalten absichern
- [ ] Ein Code-Review

*Erklärung:* Ohne Tests kann niemand belegen, dass sich das Verhalten nicht geändert hat.

*Lektion: Code Smells und Refactoring*

## Modul 20: Anti-Patterns & rote Linien

**• Warum liefert Integer a=127,b=127; a==b true, aber bei 128 false?**

- [ ] Wegen eines Compilerfehlers
- [x] Java cacht Integer-Objekte von -128 bis 127, darüber entstehen neue Objekte
- [ ] Weil 128 zu groß für int ist

*Erklärung:* Genau deshalb darf man Wrapper-Typen nie mit == vergleichen.

*Lektion: Die klassischen Java-Fallen*

---

**• Was passiert, wenn equals überschrieben wird, hashCode aber nicht?**

- [ ] Nichts
- [x] Das Objekt wird in HashSet/HashMap nicht wiedergefunden
- [ ] Der Code kompiliert nicht

*Erklärung:* Die Hash-basierten Sammlungen suchen im falschen Bucket.

*Lektion: Die klassischen Java-Fallen*

---

**• Womit speichert man Passwörter korrekt?**

- [ ] MD5
- [ ] SHA-256 ohne Salt
- [x] bcrypt, scrypt oder Argon2 mit Salt

*Erklärung:* Bewusst langsame Verfahren mit Salt machen massenhaftes Durchprobieren unwirtschaftlich.

*Lektion: Sicherheitsgrundlagen für Anwendungsentwickler*

---

**• Welche Klasse erzeugt sicherheitstaugliche Zufallswerte?**

- [ ] Random
- [x] SecureRandom
- [ ] Math.random()

*Erklärung:* Random ist vorhersagbar und für Tokens oder Schlüssel ungeeignet.

*Lektion: Sicherheitsgrundlagen für Anwendungsentwickler*

---

**• Was muss beim Fangen einer InterruptedException geschehen?**

- [ ] Nichts weiter
- [x] Den Interrupt-Status mit Thread.currentThread().interrupt() wiederherstellen
- [ ] Den Thread beenden

*Erklärung:* Sonst geht das Abbruchsignal verloren und übergeordnete Schichten können den Thread nicht beenden.

*Lektion: Produktionsreife: woran man erwachsenen Code erkennt*

---

**• Welche Frage prüft am besten die Produktionsreife?**

- [ ] Ist der Code kurz?
- [x] Was passiert, wenn die Komponente nachts ausfällt und niemand zusieht?
- [ ] Nutzt er die neuesten Sprachfeatures?

*Erklärung:* Unbeaufsichtigter Betrieb deckt fehlende Timeouts, Idempotenz und Beobachtbarkeit auf.

*Lektion: Produktionsreife: woran man erwachsenen Code erkennt*

---

**• Warum liefert Integer a=127,b=127; a==b true, bei 128 aber false?**

- [ ] Wegen eines Compilerfehlers
- [x] Java cacht Integer von -128 bis 127, darüber entstehen neue Objekte
- [ ] Weil 128 zu groß für int ist

*Erklärung:* Genau deshalb dürfen Wrapper-Typen nie mit == verglichen werden.

*Lektion: Die klassischen Java-Fallen*

---

**• Womit speichert man Passwörter korrekt?**

- [ ] MD5
- [ ] SHA-256 ohne Salt
- [x] bcrypt, scrypt oder Argon2 mit Salt

*Erklärung:* Bewusst langsame Verfahren mit Salt machen massenhaftes Durchprobieren unwirtschaftlich.

*Lektion: Sicherheitsgrundlagen für Anwendungsentwickler*

---

**• Was muss beim Fangen einer InterruptedException geschehen?**

- [ ] Nichts weiter
- [x] Den Interrupt-Status mit Thread.currentThread().interrupt() wiederherstellen
- [ ] Den Thread sofort beenden

*Erklärung:* Sonst geht das Abbruchsignal verloren und übergeordnete Schichten können nicht sauber herunterfahren.

*Lektion: Produktionsreife: woran man erwachsenen Code erkennt*

## Modul 21: Spring-Grundlagen & Dependency Injection

**• Was bedeutet Inversion of Control?**

- [x] Der Container erzeugt und verdrahtet die Objekte statt der Klassen selbst
- [ ] Der Code läuft rückwärts
- [ ] Die Kontrolle liegt beim Benutzer

*Erklärung:* Statt selbst new aufzurufen, bekommen Klassen ihre Abhängigkeiten hereingereicht.

*Lektion: Was Spring Boot eigentlich löst*

---

**• Wozu dient ein Spring-Boot-Starter?**

- [ ] Zum Starten der Anwendung
- [x] Er bündelt aufeinander abgestimmte Abhängigkeiten in passenden Versionen
- [ ] Er erzeugt die Datenbank

*Erklärung:* Starter lösen das Problem, Versionen dutzender Bibliotheken manuell abzustimmen.

*Lektion: Was Spring Boot eigentlich löst*

---

**• Welche Injektionsart ist zu bevorzugen?**

- [ ] Feldinjektion mit @Autowired
- [x] Konstruktorinjektion
- [ ] Setter-Injektion

*Erklärung:* Sie macht Abhängigkeiten explizit, erlaubt final-Felder und funktioniert im Test ohne Spring.

*Lektion: Beans, Injektion und Bean-Scopes*

---

**• Warum müssen Singleton-Beans zustandslos sein?**

- [ ] Aus Performancegründen
- [x] Weil sich alle gleichzeitigen Anfragen dieselbe Instanz teilen
- [ ] Weil Spring das prüft

*Erklärung:* Veränderliche Felder werden dann zwischen Anfragen geteilt — eine klassische Race Condition.

*Lektion: Beans, Injektion und Bean-Scopes*

---

**• Was hat die höchste Priorität in Spring Boots Konfigurationsrangfolge?**

- [ ] application.yml
- [x] Kommandozeilenargumente
- [ ] Die Profildatei

*Erklärung:* Kommandozeilenargumente überlagern Umgebungsvariablen und alle Dateien.

*Lektion: Konfiguration, Profile und Geheimnisse*

---

**• Welchen Vorteil bietet @ConfigurationProperties gegenüber vielen @Value?**

- [x] Typsichere, gebündelte und validierbare Konfiguration mit Fehlern beim Start
- [ ] Es ist schneller
- [ ] Es verschlüsselt Werte

*Erklärung:* Fehlende Pflichtwerte lassen die Anwendung sofort beim Start scheitern statt später im Betrieb.

*Lektion: Konfiguration, Profile und Geheimnisse*

---

**• Was macht die Annotation @SpringBootApplication?**

- [ ] Sie startet einen Webserver
- [x] Sie bündelt @Configuration, @EnableAutoConfiguration und @ComponentScan
- [ ] Sie erzeugt die Datenbank

*Erklärung:* Eine Annotation für die drei Bausteine, die jede Spring-Boot-Anwendung braucht.

*Lektion: Was Spring Boot eigentlich löst*

---

**• Welche Stereotyp-Annotation kennzeichnet eine Geschäftslogik-Bean?**

- [ ] @Entity
- [x] @Service
- [ ] @Configuration

*Erklärung:* @Service ist eine Spezialisierung von @Component für die Serviceschicht.

*Lektion: Beans, Injektion und Bean-Scopes*

---

**• Welchen Scope hat eine Spring-Bean standardmäßig?**

- [ ] prototype
- [x] singleton
- [ ] request

*Erklärung:* Eine Instanz pro Container — deshalb müssen Beans zustandslos sein.

*Lektion: Beans, Injektion und Bean-Scopes*

---

**• Wie aktiviert man ein Spring-Profil von außen?**

- [ ] Durch Neukompilieren
- [x] Über die Umgebungsvariable SPRING_PROFILES_ACTIVE
- [ ] Gar nicht

*Erklärung:* So wandert dasselbe Artefakt unverändert durch alle Umgebungen.

*Lektion: Konfiguration, Profile und Geheimnisse*

## Modul 22: REST-APIs mit Spring Web

**• Welchen Statuscode liefert ein erfolgreiches POST zum Anlegen üblicherweise?**

- [ ] 200
- [x] 201 mit Location-Header
- [ ] 204

*Erklärung:* 201 Created signalisiert eine neue Ressource; der Location-Header nennt ihre URL.

*Lektion: Controller, Mapping und HTTP richtig nutzen*

---

**• Warum sollten JPA-Entities nicht direkt als API-Antwort dienen?**

- [ ] Sie sind zu groß
- [x] Interne Änderungen verändern die API, Lazy-Beziehungen und sensible Felder machen Probleme
- [ ] Jackson kann sie nicht lesen

*Erklärung:* Eine eigene DTO-Schicht entkoppelt internes Modell und veröffentlichte Schnittstelle.

*Lektion: Controller, Mapping und HTTP richtig nutzen*

---

**• Wodurch wird die Validierung eines Request-Body ausgelöst?**

- [ ] Automatisch immer
- [x] Durch @Valid am Controller-Parameter
- [ ] Durch einen Aufruf von validate()

*Erklärung:* Ohne @Valid werden die Constraints am DTO nicht geprüft.

*Lektion: Validierung und zentrale Fehlerbehandlung*

---

**• Was ist ProblemDetail?**

- [x] Ein standardisiertes Fehlerantwortformat nach RFC 9457
- [ ] Eine Logging-Bibliothek
- [ ] Ein Validierungsannotation

*Erklärung:* Es ersetzt selbst erfundene Fehler-JSON-Strukturen durch ein einheitliches Format.

*Lektion: Validierung und zentrale Fehlerbehandlung*

---

**• Woran erkennst du, dass Geschäftslogik fälschlich im Controller liegt?**

- [ ] Der Controller ist kurz
- [x] Der Service kennt HTTP-Typen wie ResponseEntity oder HttpServletRequest
- [ ] Es gibt DTOs

*Erklärung:* Ein sauberer Service ist auch aus einem Batchlauf heraus aufrufbar.

*Lektion: Schichten, DTOs und saubere API-Evolution*

---

**• Welche API-Änderung ist abwärtskompatibel?**

- [ ] Ein Feld umbenennen
- [x] Ein optionales Feld ergänzen
- [ ] Ein Feld entfernen

*Erklärung:* Bestehende Clients ignorieren unbekannte Felder; Umbenennen und Entfernen brechen sie.

*Lektion: Schichten, DTOs und saubere API-Evolution*

---

**• Welcher Statuscode gehört zu einem erfolgreichen DELETE ohne Rückgabeinhalt?**

- [ ] 200
- [x] 204
- [ ] 404

*Erklärung:* 204 No Content signalisiert Erfolg ohne Antwortkörper.

*Lektion: Controller, Mapping und HTTP richtig nutzen*

---

**• Wie benennt man REST-Ressourcen sinnvoll?**

- [ ] Als Verben wie /getBestellung
- [x] Als Substantive im Plural wie /bestellungen/42
- [ ] Als Abkürzungen

*Erklärung:* Die Aktion steckt bereits in der HTTP-Methode.

*Lektion: Controller, Mapping und HTTP richtig nutzen*

---

**• Was löst eine fehlgeschlagene Bean Validation im Controller aus?**

- [x] Eine MethodArgumentNotValidException
- [ ] Einen Kompilierfehler
- [ ] Ein stilles Ignorieren

*Erklärung:* Sie wird üblicherweise zentral im @RestControllerAdvice auf 400 abgebildet.

*Lektion: Validierung und zentrale Fehlerbehandlung*

---

**• Welche Schicht darf HTTP-Typen wie ResponseEntity kennen?**

- [ ] Der Service
- [x] Nur der Controller
- [ ] Das Repository

*Erklärung:* Ein sauberer Service ist auch aus einem Batchlauf heraus aufrufbar.

*Lektion: Schichten, DTOs und saubere API-Evolution*

## Modul 23: Datenzugriff mit Spring Data JPA

**• Wie entsteht die Implementierung eines Spring-Data-Repositorys?**

- [x] Sie wird generiert und zur Laufzeit bereitgestellt
- [ ] Man schreibt sie selbst
- [ ] Sie wird vom Compiler erzeugt

*Erklärung:* Spring Data leitet die Abfrage aus dem Methodennamen oder der @Query-Annotation ab.

*Lektion: Repositories und Query-Methoden*

---

**• Was ist an findAll() ohne Paginierung riskant?**

- [ ] Es ist zu langsam beim Kompilieren
- [x] Es lädt die gesamte Tabelle in den Speicher
- [ ] Es funktioniert nur mit H2

*Erklärung:* Bei wachsenden Datenmengen ist das ein Ausfallrisiko.

*Lektion: Repositories und Query-Methoden*

---

**• Warum wirkt @Transactional bei einem Aufruf innerhalb derselben Klasse nicht?**

- [ ] Wegen fehlender Rechte
- [x] Weil der Aufruf am Spring-Proxy vorbeigeht
- [ ] Weil die Methode zu kurz ist

*Erklärung:* Nur Aufrufe über den Proxy von außen aktivieren den Transaktionsinterzeptor.

*Lektion: @Transactional und seine Fallstricke*

---

**• Bei welchen Exceptions rollt Spring standardmäßig zurück?**

- [ ] Bei allen
- [x] Nur bei unchecked Exceptions (RuntimeException)
- [ ] Nur bei checked Exceptions

*Erklärung:* Für Checked Exceptions muss rollbackFor gesetzt werden.

*Lektion: @Transactional und seine Fallstricke*

---

**• Wozu dient @EntityGraph?**

- [ ] Zum Erzeugen von Diagrammen
- [x] Um festzulegen, welche Beziehungen in derselben Abfrage mitgeladen werden
- [ ] Zum Validieren von Entities

*Erklärung:* Es verhindert das N+1-Problem, ohne die Abfrage selbst schreiben zu müssen.

*Lektion: Paginierung, Projektionen und N+1 in Spring Data*

---

**• Was unterscheidet Page von Slice?**

- [x] Page führt zusätzlich eine COUNT-Abfrage für die Gesamtzahl aus
- [ ] Slice ist sortiert
- [ ] Es gibt keinen Unterschied

*Erklärung:* Wo die Gesamtzahl nicht angezeigt wird, spart Slice diese Abfrage.

*Lektion: Paginierung, Projektionen und N+1 in Spring Data*

---

**• Woraus leitet Spring Data die Abfrage einer Repository-Methode ab?**

- [x] Aus dem Methodennamen oder einer @Query-Annotation
- [ ] Aus dem Rückgabetyp
- [ ] Aus dem Klassennamen

*Erklärung:* findByStatusOrderByDatumDesc wird direkt in eine Abfrage übersetzt.

*Lektion: Repositories und Query-Methoden*

---

**• Wo gehört @Transactional üblicherweise hin?**

- [ ] An das Repository
- [x] An die Serviceschicht
- [ ] An den Controller

*Erklärung:* Erst die Geschäftsoperation bildet die fachliche Einheit.

*Lektion: @Transactional und seine Fallstricke*

---

**• Warum hat @Transactional an einer privaten Methode keine Wirkung?**

- [ ] Weil private Methoden zu schnell sind
- [x] Weil der Proxy-Mechanismus nur öffentliche Methoden abfangen kann
- [ ] Weil Spring das verbietet

*Erklärung:* Beim Standard-Proxy greift der Transaktionsinterzeptor nur bei öffentlichen Aufrufen von außen.

*Lektion: @Transactional und seine Fallstricke*

---

**• Wodurch unterscheidet sich eine Projektion von einer Entity-Abfrage?**

- [x] Sie lädt nur die benötigten Felder statt ganzer Entities
- [ ] Sie ist immer sortiert
- [ ] Sie umgeht die Datenbank

*Erklärung:* Weniger Daten, keine Lazy-Beziehungen — oft die sauberste Lösung gegen N+1.

*Lektion: Paginierung, Projektionen und N+1 in Spring Data*

## Modul 24: Testen, Sicherheit & Betrieb

**• Was lädt @WebMvcTest?**

- [ ] Den gesamten Anwendungskontext
- [x] Nur die Web-Schicht mit dem angegebenen Controller
- [ ] Nur die Datenbankschicht

*Erklärung:* Abhängige Services werden durch Test Doubles ersetzt — dadurch ist der Test schnell und fokussiert.

*Lektion: Die Teststrategie einer Spring-Boot-Anwendung*

---

**• Warum Testcontainers statt H2?**

- [ ] H2 ist kostenpflichtig
- [x] Weil gegen eine echte Datenbank getestet wird und SQL-Unterschiede nicht erst in Produktion auffallen
- [ ] Weil H2 keine Transaktionen kann

*Erklärung:* Abfragen, die gegen H2 laufen, können gegen PostgreSQL oder Oracle scheitern.

*Lektion: Die Teststrategie einer Spring-Boot-Anwendung*

---

**• Was unterscheidet Authentifizierung von Autorisierung?**

- [ ] Kein Unterschied
- [x] Authentifizierung klärt wer jemand ist, Autorisierung was er darf
- [ ] Autorisierung kommt zuerst

*Erklärung:* Erst die Identität feststellen, dann die Berechtigungen prüfen.

*Lektion: Spring Security: Grundlagen absichern*

---

**• Warum gehört anyRequest().authenticated() ans Ende der Regelkette?**

- [ ] Aus Stilgründen
- [x] Weil die erste passende Regel gewinnt und alles nicht ausdrücklich Erlaubte verboten sein soll
- [ ] Weil Spring das erzwingt

*Erklärung:* Eine zu früh platzierte permitAll-Regel macht alle folgenden Einschränkungen wirkungslos.

*Lektion: Spring Security: Grundlagen absichern*

---

**• Welche Actuator-Endpunkte sollten in Produktion offen sein?**

- [ ] Alle, für maximale Transparenz
- [x] Nur die benötigten, etwa health, info und prometheus
- [ ] Keine

*Erklärung:* Endpunkte wie env oder heapdump verraten Konfiguration und Speicherinhalte.

*Lektion: Actuator, Observability und Produktionsbetrieb*

---

**• Was gehört NICHT in eine Liveness-Probe?**

- [ ] Eine Prüfung, ob der Prozess arbeitsfähig ist
- [x] Die Erreichbarkeit der Datenbank
- [ ] Ein einfacher Statuswert

*Erklärung:* Sonst löst ein kurzer Datenbankausfall den Neustart aller Instanzen aus — externe Abhängigkeiten gehören in Readiness.

*Lektion: Actuator, Observability und Produktionsbetrieb*

---

**• Welche Testart eignet sich zum Prüfen eines Repositorys?**

- [ ] @WebMvcTest
- [x] @DataJpaTest
- [ ] Plain JUnit ohne Spring

*Erklärung:* @DataJpaTest lädt nur die Persistenzschicht samt Testdatenbank.

*Lektion: Die Teststrategie einer Spring-Boot-Anwendung*

---

**• Wann ist das Abschalten von CSRF vertretbar?**

- [ ] Immer
- [x] Bei zustandslosen Token-APIs ohne Cookie-Sitzungen
- [ ] Nie

*Erklärung:* Bei formularbasierten Sitzungen mit Cookies ist CSRF-Schutz dagegen zwingend.

*Lektion: Spring Security: Grundlagen absichern*

---

**• Was unterscheidet Liveness von Readiness?**

- [ ] Kein Unterschied
- [x] Liveness fragt, ob der Prozess läuft; Readiness, ob er gerade Anfragen bedienen kann
- [ ] Readiness startet den Container neu

*Erklärung:* Externe Abhängigkeiten gehören in Readiness, nie in Liveness.

*Lektion: Actuator, Observability und Produktionsbetrieb*
