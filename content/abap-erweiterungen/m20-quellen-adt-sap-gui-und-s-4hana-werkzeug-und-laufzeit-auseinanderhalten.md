# ADT, SAP GUI und S/4HANA: Werkzeug und Laufzeit auseinanderhalten

Modul: abap-m20 · 23 Minuten

Eclipse mit ABAP Development Tools ist ein Entwicklungswerkzeug; SAP GUI ist eine Oberfläche zum Zugriff auf SAP-Systeme. SAP HANA ist eine Datenbank, SAP S/4HANA eine darauf basierende ERP-Lösung. Diese Begriffe bezeichnen unterschiedliche Ebenen. Ein ABAP-Quelltext wird mit ADT bearbeitet, liegt aber als Entwicklungsobjekt im verbundenen ABAP-System. Die lokale Eclipse-Installation ist noch keine lokale ABAP-Laufzeit. Dieser Abschnitt vertieft zugleich die Laufzeit-Grundlagen aus abap-m17.

Ein greifbares Beispiel ist die Konsolenausgabe 'Hallo ROOTPFAD'. Du erstellst im freigegebenen Übungspaket eine globale Klasse mit if_oo_adt_classrun, aktivierst sie und startest sie als ADT-Konsolenanwendung. Die main-Methode läuft im verbundenen ABAP-System; das Ergebnis erscheint in Eclipse. Bleibt die Verbindung oder die Berechtigung aus, kann eine korrekt installierte Entwicklungsoberfläche den fehlenden Systemzugang nicht ersetzen.

Für die Installation erläutert SAP das Hinzufügen des ADT-Plugins über Help > Install New Software mit der Update-Site https://tools.hana.ondemand.com/latest. Prüfe die aktuellen Plattformvoraussetzungen statt Versionsnummern dauerhaft in die Lektion einzubauen. In klassischen Systemen bietet SAP GUI unter anderem Transaktionen für Workbench und Transport Organizer; diese Wege sind nicht unverändert auf ABAP-Cloud-Umgebungen übertragbar. Auch ABAP-Sprachversion und freigegebene APIs bestimmen, welche Entwicklung erlaubt ist. S/4HANA bedeutet nicht, dass aller vorhandener ABAP-Code automatisch cloudkonform ist.

Praxisaufgabe ohne System: Zeichne drei Kästen für Entwicklungsoberfläche, ABAP-Anwendungssystem und Datenbank. Ordne 'Quelltext bearbeiten', 'ABAP-Methode ausführen' und 'dauerhafte Daten lesen' zu. Praxis mit erlaubtem System: Führe die untenstehende Klasse aus und ergänze eine zweite Ausgabe. Nur diese vollständige Klasse wird als Ganzes eingefügt; bei den anderen Grundlagenlektionen wird häufig lediglich der Inhalt der main-Methode ersetzt. Ein kostenloser Lesekurs, ein SAP-Konto und ein ausführbares Übungssystem sind drei getrennte Voraussetzungen.

```abap
CLASS zcl_rootpfad_hello DEFINITION
  PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
ENDCLASS.

CLASS zcl_rootpfad_hello IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    out->write( `Hallo ROOTPFAD` ).
  ENDMETHOD.
ENDCLASS.
```

## Kontrollfragen

### Was fehlt nach einer erfolgreichen ADT-Installation gegebenenfalls noch?

- [x] Ein erreichbares ABAP-System mit Benutzer und Berechtigungen
- [ ] Zwingend eine lokale HANA-Produktivdatenbank
- [ ] Ein Wechsel von ABAP nach Java

Die Entwicklungsoberfläche allein stellt weder ein ABAP-Backend noch dessen Zugangsdaten bereit.

### Welche Zuordnung stimmt?

- [ ] HANA = Editor; ADT = ERP
- [x] ADT = Entwicklungswerkzeug; HANA = Datenbank
- [ ] SAP GUI = Datenbank; S/4HANA = Eclipse-Plugin

Die Werkzeuge und Produkte gehören zu verschiedenen Ebenen: ADT bearbeitet Entwicklungsobjekte, SAP HANA stellt die Datenbank bereit.

## Quellen und Zugang

- [SAP Developers: Install Eclipse and the ADT Plugin](https://developers.sap.com/tutorials/abap-install-adt): Anleitung öffentlich ohne Anmeldung gelesen; Installation ist nicht gleich kostenloser Backendzugang. Verlinkte SAP Notes können zusätzlich berechtigungspflichtig sein.
- [SAP Learning: Understanding SAP GUI](https://learning.sap.com/courses/project-logistics-control-in-sap-s-4hana/understanding-sap-gui): Text frei gelesen; SAP GUI und SAP Logon sind Frontendzugänge. Reale Anmeldung braucht Systemzugang. Verlinkte Simulation nicht separat getestet.
- [SAP Learning: Introduction to SAP S/4HANA](https://learning.sap.com/courses/business-processes-in-sap-s-4hana-portfolio-and-project-management/introduction-to-sap-s-4hana): Öffentlich gelesen; für die stabile Unterscheidung ERP, Datenbank und Oberfläche geeignet. Enthält ältere Marketing- und Releaseaussagen, die nicht als aktuelle Detailreferenz übernommen werden.
- [SAP Learning: Understanding the Basics of ABAP — Language Versions and ABAP Cloud](https://learning.sap.com/courses/basic-abap-programming/understanding-the-basics-of-abap_c0e5346f-a136-4b9f-a167-9031eca12932): Ohne Anmeldung gelesen; erklärt Standard ABAP, ABAP for Cloud Development und ADT als Bestandteil von ABAP Cloud.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
