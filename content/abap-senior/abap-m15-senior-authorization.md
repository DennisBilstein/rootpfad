# RAP-Berechtigungen durchgängig: DCL, Operationen und negative Tests

abap-m15-senior-authorization · 30 Minuten · 08.11.2026

## Voraussetzungen

CDS-Projektionen, RAP-Verhalten und Rollen-Grundlagen; zwei getrennte Testbenutzer in einer freigegebenen Lernumgebung.

## Lernziele

- Lese-, Änderungs- und Serviceberechtigungen getrennt modellieren.
- Unbeabsichtigte Rechteausweitung über Projektionen und interne Aufrufe erkennen.
- Negative Berechtigungstests mit beobachtbarem Soll-Ergebnis entwerfen.

Ein Sachbearbeiter darf Belege seines Buchungskreises lesen, aber nur offene Belege ändern. Dafür reichen weder ein ausgeblendeter Fiori-Button noch ein erfolgreicher OData-Serviceaufruf. Trenne Servicezugang, datensatzbezogenes Lesen und erlaubte Änderungen/Aktionen. Die konkrete Rollenpflege unterscheidet sich zwischen klassischen PFCG-Landschaften, S/4HANA Cloud und SAP BTP ABAP environment.

CDS Access Controls in DCL begrenzen den Zugriff auf die jeweilige CDS-Entität. Eine Projektion erbt diese Bedingungen nicht automatisch nur deshalb, weil sie auf einer geschützten View aufbaut. Definiere für den tatsächlich exponierten Zugriff eine passende Access Control, gegebenenfalls mit expliziter Vererbung. Die Annotation authorizationCheck allein formuliert noch keine fachliche Filterbedingung. Direkter Tabellenzugriff ist nicht automatisch durch die DCL einer anderen View geschützt.

RAP Global Authorization prüft instanzunabhängige Rechte, etwa ob ein Benutzer grundsätzlich anlegen darf. Instance Authorization berücksichtigt den Zustand einer Instanz. Eine Prüfung des bestehenden Buchungskreises ist nicht automatisch eine Prüfung eines neu übergebenen Buchungskreises: ein unerlaubter Wechsel muss zusätzlich passend zum Zielzustand abgewehrt werden. Feature Control verbessert die Bedienung, ersetzt aber keine Autorisierung.

IN LOCAL MODE ist ein bewusster interner Zugriff im eigenen Behavior-Kontext und kann Autorisierungs- und Featureprüfungen umgehen. Nutze es nicht als Reparatur für einen 403-Fehler. Prüfe privilegierte Lesepfade, technische Benutzer, Hintergrundjobs und Exporte separat. Ein Test mit dem Entwickler-Admin kann eine fehlende DCL verdecken.

```text
Lesevertrag: Benutzer A → Buchungskreis 1000, Benutzer B → 2000
Änderungsvertrag: eigener Buchungskreis UND Status offen
Direkter Serviceaufruf: gleiche Regel wie über Fiori
Negativtest: A liest/ändert Schlüssel aus 2000 → kein Datenleck/keine Änderung
Zielzustand: Wechsel 1000 → 2000 ohne Recht → verweigert
```

## Senior-Praxis

Review zuerst den echten Zugriffspfad und die Identität, nicht die Farbe des Buttons. Ein Screenshot der UI ist kein Nachweis einer serverseitigen Rechteprüfung.

## Praxisfälle

- Normalfall: Benutzer A liest einen eigenen offenen Beleg und ändert einen erlaubten Text; nur dieser Beleg ändert sich.
- Grenzfall: Ein eigener bereits gebuchter Beleg bleibt lesbar, eine verbotene Änderungsaktion wird verweigert.
- Fehlerfall: A sendet fremden Schlüssel oder unzulässigen Buchungskreis direkt an den Service; kein fremder Inhalt und keine persistierte Änderung.

## Szenarioquiz

### Eine CDS-Projektion exponiert Belege über OData. Nur die darunterliegende Modell-View hat DCL. Welcher Review-Schritt ist erforderlich?

- [ ] Den Filter der Modell-View als automatisch geerbt dokumentieren. — DCL der unteren View schützt die darauf aufgebaute Projektion nicht pauschal.
- [x] Die exponierte Entität und deren Access Control explizit prüfen. — Die Lesegrenze muss am tatsächlichen Zugriff wirken; explizite Vererbung kann dafür eingesetzt werden.
- [ ] Nur das Entfernen der Fiori-Suchfunktion im Client testen. — Die Suche zu verstecken verhindert direkte Servicezugriffe nicht.

### Eine RAP-Action ist in Fiori deaktiviert. Ein direkter Request kann sie dennoch unberechtigt ausführen. Was ist die richtige Korrektur?

- [x] Die serverseitige Autorisierung der Operation ergänzen und negativ testen. — Bedienhinweise sind keine harte Grenze; der Backendpfad muss unberechtigte Operationen verweigern.
- [ ] Den Button zusätzlich aus der Toolbar-Konfiguration entfernen. — Ein zweites UI-Versteck schließt den direkten Request nicht.
- [ ] Den Service mit einem gemeinsamen Admin-Benutzer aufrufen. — Ein Admin-Benutzer verschärft die Rechteausweitung und verdeckt fehlende Prüfungen.

### Ein Benutzer darf einen Beleg aus Kreis 1000 ändern und übergibt als neuen Kreis 2000. Die Instanzprüfung prüft nur den alten Zustand. Was fehlt?

- [ ] Eine UI-Sortierung nach dem bisherigen Buchungskreis. — Sortierung begrenzt weder Zielwerte noch Zugriffe.
- [ ] Ein Retry mit demselben Request nach der Instanzprüfung. — Wiederholung ergänzt keine Prüfung des neu übergebenen Zustands.
- [x] Eine passende Prüfung der Berechtigung für den Zielzustand. — Das Recht auf den bestehenden Beleg erlaubt nicht automatisch einen Wechsel in jeden anderen Berechtigungsbereich.

## Quellen und Grenzen

- https://learning.sap.com/courses/building-transactional-apps-with-the-abap-restful-application-programming-model/implementing-authority-checks

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
