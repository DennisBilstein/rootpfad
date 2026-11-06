# OData mit Metadaten und Service Consumption Model verstehen

Modul: abap-m19 · 35 Minuten

Ein OData-Service ist mehr als ein beliebiger JSON-Endpunkt. Er beschreibt Entitäten und Operationen über Metadaten und bietet standardisierte Abfrageoptionen. Bei der Konsumierung musst du OData-Version, Service-Root, Entity Sets und Datentypen kennen. JSON ist dabei eine mögliche Nutzdatenrepräsentation; das EDMX-Dokument unter $metadata beschreibt dagegen den Vertrag und wird typischerweise als XML verarbeitet. Die Erzeugung dieses Vertrags und das Anbieten eines RAP-Services sind von dessen externer Konsumierung zu unterscheiden.

In ADT kannst du aus passenden Metadaten ein Service Consumption Model erzeugen. Daraus entstehen Proxy-Artefakte und typisierte Beispiele, die das manuelle Zusammenbauen und Interpretieren von Anfragen reduzieren. Die tatsächliche Verbindung erfordert weiterhin Destination und Kommunikationskonfiguration. Ein generierter Proxy beseitigt weder Berechtigungsprobleme noch unterschiedliche OData-Versionen oder spätere Änderungen des entfernten Vertrags. Verwende die für dein System generierten Typen und Methoden, statt einen fremden Modellnamen unverändert zu kopieren.

Beispiel: Eine Produktübersicht benötigt nur Kennung und Namen für zehn Produkte. Eine gezielte Anfrage begrenzt die Auswahl mit $select und $top. Für wiederholbare Seitennavigation braucht es eine geeignete Ordnung und Beachtung der vom Service angebotenen Paging-Regeln; bei servergesteuertem Paging verfolgst du die bereitgestellten Fortsetzungsinformationen. Für spätere Änderungen prüfst du, ob der Service ETags unterstützt und welche Bedingungen für konkurrierende Updates gelten. Ein Status 412 kann auf eine nicht mehr erfüllte Vorbedingung hinweisen und ist kein Anlass für blindes Überschreiben.

Praxisauftrag: Untersuche ein bereitgestelltes EDMX, identifiziere ein Entity Set und seine Schlüssel und entwirf die untenstehende begrenzte Leseanfrage. In einem geeigneten System erzeugst du anschließend das Consumption Model und vergleichst die generierten Typen mit dem Vertrag. Ohne System bleibt dies eine Metadaten- und Request-Übung. SAPs verlinkte Mission setzt zwei geeignete ABAP-Systeme voraus, ist nicht allein ausführbar und schließt Trial ausdrücklich aus. Ihre Texte sind kostenlos zugänglich, die notwendigen Laufzeiten damit aber nicht zugesichert.

```http
GET <Service-Root>/Products?$select=Product,ProductName&$top=10&$orderby=Product HTTP/1.1
Accept: application/json

# Lehrschema: Namen und unterstuetzte Query-Optionen aus $metadata
# und API-Dokumentation pruefen, kein direkt ausfuehrbarer Endpunkt.
# Metadatenanfrage:
GET <Service-Root>/$metadata HTTP/1.1
Accept: application/xml
```

## Kontrollfragen

### Wozu dient $metadata beim Service Consumption Model?

- [x] Zum Ableiten des Dienstvertrags und der Proxy-Artefakte
- [ ] Zum Speichern des Klartextpassworts
- [ ] Zum Umgehen der Autorisierung

Die Metadaten beschreiben unter anderem Entitäten, Schlüssel und Typen.

### Was bewirkt $select in einer unterstützten OData-Abfrage?

- [ ] Es definiert die Systemlandschaft
- [x] Es begrenzt die angefragten Eigenschaften
- [ ] Es stellt ein Deployment nach PROD bereit

$select dient der gezielten Auswahl von Eigenschaften; die API muss die Option unterstützen.

### Wie reagierst du sinnvoll auf eine beim Ändern gemeldete veraltete ETag-Vorbedingung?

- [ ] Immer denselben Request endlos senden
- [ ] Die Vorbedingung ohne Fachprüfung entfernen
- [x] Den aktuellen Stand laden und den Konflikt fachlich behandeln

Optimistische Konkurrenzkontrolle soll verhindern, dass fremde Änderungen unbeabsichtigt überschrieben werden.

## Quellen und Zugang

- [SAP Developers: Prepare Consuming System and Service Consumption Model](https://developers.sap.com/tutorials/abap-environment-create-service-consumption-model/): Öffentlicher Volltext geprüft; kein Trial, Teil einer Mission mit zwei Systemen, nicht standalone ausführbar.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
