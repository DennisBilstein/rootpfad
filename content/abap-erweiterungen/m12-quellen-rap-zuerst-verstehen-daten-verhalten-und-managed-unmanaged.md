# RAP zuerst verstehen: Daten, Verhalten und managed/unmanaged

Modul: abap-m12 · 40 Minuten

Ein Business Object ist mehr als eine Tabelle: Es verbindet eine fachliche Entität mit erlaubten Operationen und Regeln. Für die Lernreise liefert CDS die Datenstruktur. Die Behavior Definition beschreibt beispielsweise create, update und delete. Der Behavior Pool ist die ABAP-Klasse, in der eigene Verhaltenslogik implementiert wird. Diese Trennung erklärt, warum eine aktivierte CDS-View allein noch keinen vollständigen transaktionalen Dienst ergibt.

RAP trennt Interaktionsphase und Save Sequence. Änderungen werden zunächst im transaktionalen Puffer gehalten, damit spätere Operationen denselben aktuellen fachlichen Stand sehen. Erst die Save Sequence finalisiert, prüft und persistiert. Bei managed mit managed save liefert das Framework Standardoperationen, Puffer und reguläre Persistenz. Eigene fachliche Logik bleibt trotzdem unsere Aufgabe. Der gezeigte BDEF-Ausschnitt ist nur die Orientierung für ein zuvor angelegtes Modell; Mapping, Felder, Sperren und Berechtigungen müssen zum konkreten System passen.

Bei unmanaged implementiert die Anwendung auch CRUD, Puffer und Persistenzlogik. Das ist besonders relevant, wenn bestehende Anwendungslogik bereits einen Puffer besitzt. Managed mit unmanaged save ist ein eigener Zwischenfall: Der Puffer und die Standardoperationen bleiben managed, der tatsächliche Schreibzugriff wird über save_modified übernommen. Das Wort unmanaged in einer Nummerierungsroutine bedeutet deshalb nicht automatisch, dass das gesamte Business Object unmanaged ist. Lokale Handler und Saver trennen Interaktionslogik und Save-Logik; ihre konkreten Methoden richten sich nach dem Implementierungstyp.

Arbeitsbeispiel und Übung: Ordne drei Reiseprojekte zu. Eine neue eigene Reisetabelle ohne Altlogik ist ein Kandidat für managed. Eine vorhandene Fach-API mit eigenem Puffer spricht eher für unmanaged. Eine Persistenz-API ohne eigenen Puffer kann zu managed mit unmanaged save passen. Zeichne für jeden Fall ein, wer create verarbeitet, wer den Puffer hält und wer speichert. Begründe die Auswahl, statt unmanaged als vermeintlich fortgeschrittenere Standardlösung zu wählen. Produktive API-Verträge und die Fähigkeiten des Zielreleases müssen zusätzlich geprüft werden.

```abap
// Orientierender BDEF-Ausschnitt, kein vollständiges Projekt:
managed implementation in class zbp_i_learntravel unique;
strict ( 2 );

define behavior for ZI_LearnTravel alias Travel
persistent table zlearn_travel
lock master
{
  create;
  update;
  delete;
  // Feldsteuerung, Schlüsselstrategie und Mapping passend ergänzen.
}

// Alternative Implementierungstypen NICHT gleichzeitig einfügen:
// unmanaged implementation in class ... unique;
// managed + with unmanaged save benötigt eigenen save_modified-Code.
```

## Kontrollfragen

### Wer stellt bei managed mit unmanaged save den transaktionalen Puffer bereit?

- [x] Das RAP-Framework
- [ ] Immer der Browser
- [ ] Zwingend eine eigene globale interne Tabelle

Der Fall bleibt managed hinsichtlich Puffer und Standardoperationen; nur der tatsächliche Schreibzugriff wird selbst implementiert.

### Was ist die Hauptaufgabe einer Behavior Definition?

- [ ] Nur HTML erzeugen
- [x] Operationen und Verhaltensvertrag eines RAP-BO deklarieren
- [ ] Den Datenbankinhalt sofort überschreiben

Die BDEF beschreibt Verhalten; konkrete eigene Handlerlogik steht im Behavior Pool.

### Ein managed BO besitzt eine selbst implementierte frühe Nummerierung. Ist es dadurch vollständig unmanaged?

- [ ] Ja, bei jeder eigenen Methode
- [ ] Ja, sobald eine Nummer vorkommt
- [x] Nein, die Verantwortlichkeit für eine Teilfunktion bestimmt nicht allein den gesamten Implementierungstyp

RAP100 kombiniert ein managed BO mit unmanaged interner früher Nummerierung. Teilfunktion und Gesamtmodell müssen getrennt werden.

## Quellen und Zugang

- [SAP Learning: Exploring Behavior Implementation Options](https://learning.sap.com/courses/building-transactional-apps-with-the-abap-restful-application-programming-model/exploring-the-behavior-implementation-options): Volltext am 2026-11-06 ohne Login geprüft; managed, unmanaged, unmanaged/additional save, Handler/Saver und Draft ausdrücklich enthalten. Lesen frei.
- [SAP-samples RAP100: Early Numbering](https://raw.githubusercontent.com/SAP-samples/abap-platform-rap100/main/exercises/ex03/README.md): Volltext am 2026-11-06 frei abgerufen. Workshop-Code unter Repository-Lizenz; Ausführung benötigt geeignetes ABAP-System und /DMO-Szenario.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
