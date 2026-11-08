# BTP Connectivity: Destination, Cloud Connector und Benutzeridentität

abap-m14-senior-btp-identity · 30 Minuten · 08.11.2026

## Voraussetzungen

HTTP, Authentifizierung/Autorisierung und BTP-Subaccount; Architekturübung ohne echte Zugangsdaten möglich.

## Lernziele

- Netzweg, Trust und Fachberechtigung getrennt diagnostizieren.
- Benutzerweitergabe von technischen Integrationsidentitäten abgrenzen.
- BTP Cloud Foundry und ABAP-Communication-Konfiguration nicht vermischen.

Eine Side-by-Side-App auf BTP erreicht einen internen S/4HANA-Service. Die Destination beschreibt Ziel und Authentifizierungsart; Connectivity und Cloud Connector ermöglichen den kontrollierten Weg ins On-Premise-Netz. Eine grüne Destination-Verbindungsprüfung beweist weder korrekte Endbenutzerzuordnung noch fachliche Rechte. Entitlements, Subaccount, Runtime und Servicebindungen müssen für die konkrete App passen.

Bei Principal Propagation wird die angemeldete Identität entlang einer eingerichteten Vertrauenskette an das Backend weitergegeben. Cloud Connector muss nur notwendige Systeme und Ressourcen freigeben; virtuelle Hosts und Location ID gehören zum Routingvertrag. Das Backend muss die übermittelte Identität korrekt einem Benutzer zuordnen und dessen Rechte prüfen. Eine unkontrollierte Weitergabe des Browser-Bearer-Tokens an irgendeine URL ist keine Principal Propagation.

Interaktive Aktionen können eine Benutzeridentität benötigen; ein nächtlicher Job braucht häufig eine eigens begrenzte technische Identität. OAuth Client Credentials ist nicht automatisch ein Endbenutzerkontext. Wähle Authentifizierungsverfahren anhand des unterstützten API-/Kommunikationsszenarios. SAP BTP ABAP environment verwendet für viele Verbindungen Communication Scenarios, Systems und Arrangements; Destination-Einstellungen einer Cloud-Foundry-App nicht blind auf jede ABAP-Laufzeit übertragen.

Fehlersuche folgt den Grenzen: DNS/Route/Cloud-Connector-Ressource, TLS und Trust, Token/Zertifikat und User-Mapping, Servicezugang, dann Fachrechte. 401/403 sind Hinweise, aber kein eindeutiger Ursachenbeweis; Proxy und Backend können beide antworten. Erfasse zuständiges System, Zeitfenster und bereinigte Korrelations-ID. Tokens, Cookies, private Schlüssel und personenbezogene Payloads gehören nicht in Tickets oder Screenshots.

```text
Browser → App/Approuter → Destination/Connectivity → Cloud Connector → S/4HANA
Je Grenze dokumentieren: System, Identität, Trust, erlaubte Ressource
Test A/B: Backend erkennt jeweils A/B und begrenzt deren Fachzugriff
Job: separate minimale technische Identität, kein übernommener Admin-Login
```

## Senior-Praxis

Stelle vor dem ersten Connectivity-Fix die Frage: Als welcher Benutzer soll die Fachoperation im Backend laufen? Ein technischer Superuser ist keine zulässige Abkürzung für fehlerhaftes Mapping.

## Praxisfälle

- Normalfall: Zwei interaktive Testbenutzer werden im Backend unterschiedlich erkannt und erhalten nur ihre erlaubten Belege.
- Grenzfall: Ein technischer Jobzugang erreicht nur den vorgesehenen Service und besitzt keine allgemeinen Administratorrechte.
- Fehlerfall: Mapping oder Ressourcenfreigabe fehlt: kontrollierter Fehler, lokalisierte Grenze und bereinigtes Diagnoseprotokoll ohne Secrets.

## Szenarioquiz

### Der BTP-Destination-Check ist grün, im Backend erscheinen alle Aufrufe als derselbe technische Benutzer. Was ist noch nicht belegt?

- [ ] Dass irgendeine technische Verbindung zum Ziel aufgebaut werden kann. — Ein erfolgreicher Check liefert gerade einen begrenzten Nachweis technischer Erreichbarkeit.
- [x] Dass individuelle Benutzeridentität und Fachrechte korrekt wirken. — Connectivity-Erfolg und authentischer Endbenutzerkontext sind verschiedene Nachweise.
- [ ] Dass die App überhaupt einen Zielnamen konfigurieren durfte. — Der beobachtete Check beantwortet nicht die fachlich entscheidende Identitätsfrage durch diese Alternative.

### Ein nächtlicher BTP-Job verwendet OAuth Client Credentials. Darf die Anwendung daraus die Identität des zuletzt angemeldeten Sachbearbeiters ableiten?

- [ ] Ja, der letzte Browserlogin bestimmt automatisch jeden Hintergrundjob. — Ein technischer Token übernimmt keinen beliebigen früheren Browserkontext.
- [ ] Ja, wenn der Job denselben Destination-Namen wie die UI benutzt. — Der Name eines Ziels verleiht keine Endbenutzeridentität.
- [x] Nein, technische Identität und Endbenutzerkontext sind getrennt. — Das unterstützte Authverfahren und der Jobvertrag bestimmen, unter welcher Identität die Operation läuft.

### Cloud-Foundry-Beispielwerte für eine Destination sollen in SAP BTP ABAP environment übernommen werden. Was ist der erste Schritt?

- [x] Das passende Communication Scenario und die Laufzeitunterstützung prüfen. — ABAP-Kommunikationsartefakte und unterstützte Verfahren richten sich nach dem konkreten Szenario.
- [ ] Das technische Passwort als Konstante in die ABAP-Klasse schreiben. — Hardcodierte Secrets sind kein Ersatz für passende Kommunikationskonfiguration.
- [ ] Alle Backendpfade für den Cloud Connector pauschal freigeben. — Eine breite Netzfreigabe löst weder Laufzeitkompatibilität noch Identitätsvertrag.

## Quellen und Grenzen

- https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/configuring-principal-propagation

SAP-Beispiele nicht im SAP-System ausgeführt. Eigenständiger Entwurf/Quellenzusammenfassung, keine persönliche Berufserfahrung behauptet.
