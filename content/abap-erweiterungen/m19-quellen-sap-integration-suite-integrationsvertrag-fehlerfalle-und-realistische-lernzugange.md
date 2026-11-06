# SAP Integration Suite: Integrationsvertrag, Fehlerfälle und realistische Lernzugänge

Modul: abap-m19 · 30 Minuten

SAP Integration Suite ist eine Integrationsplattform und nicht bloß eine ABAP-HTTP-Bibliothek. Eine Integrationsschicht ist besonders dann interessant, wenn Nachrichten zwischen Systemen vermittelt, Formate abgebildet und Schnittstellen zentral betrieben werden sollen. Ein direkter ABAP-Aufruf kann für einen eng begrenzten Bedarf einfacher sein. Die Entscheidung sollte sich an Systemanzahl, Transformation, Betriebsverantwortung und Fehlerbehandlung orientieren, nicht nur daran, welcher Dienst im Cockpit sichtbar ist. Einzelne Funktionen hängen vom Serviceplan ab.

Beispiel: Ein ABAP-System liefert eine Liefermeldung mit Belegnummer und Menge an ein Lager eines anderen Herstellers. Du definierst zunächst einen Integrationsvertrag: Welche Felder sind Pflicht, welche Mengeneinheit gilt und welche Kennung erlaubt es, wiederholt eintreffende Nachrichten zu erkennen? Eine erfolgreiche HTTP-Annahme bedeutet nicht zwingend eine bereits erfolgte Lagerbuchung. Entscheide deshalb, ob die Antwort nur den Empfang bestätigt oder einen fachlichen Endzustand meldet. Bei asynchroner Verarbeitung brauchst du einen getrennten Status- oder Fehlerkanal.

Für Fehlerfälle legst du Regeln fest: Ein ungültiger Artikel wird fachlich geklärt statt unverändert wiederholt. Ein temporärer Ausfall kann nach einer begrenzten Wartezeit erneut versucht werden. Ob eine Wiederholung sicher ist, hängt von der Operation und dem Vertrag des Empfängers ab; eine eigene requestId garantiert noch keine Idempotenz. Im Monitoring sollen Korrelation und Diagnose möglich sein, ohne vollständige sensible Nutzdaten oder Zugangsdaten ungeschützt abzulegen. Die konkrete Umsetzung muss mit den im Tenant verfügbaren Funktionen abgeglichen werden.

Praxisauftrag: Erstelle aus der Nachricht unten ein Mapping ins Lagerformat und eine Tabelle für Erfolg, Dublette, Fachfehler und temporären Ausfall. Ohne Tenant ist das eine vollständig durchführbare Vertragsübung. Für Live-Übungen prüfst du das Angebot neu: SAP bewirbt einen 30-Tage-Basic-Trial mit gemeinsamem Tenant und begrenzten Rechten; der separate Integration-Suite-Free-Tier-Plan läuft laut offizieller Dokumentation 90 Tage und verliert bei erneuter Aktivierung die bisherigen Inhalte. Free Tier setzt einen geeigneten kommerziellen BTP-Account und Entitlements voraus. Kostenlose Lerntexte sind weder eine produktive Lizenz noch eine Zusage unbegrenzter Gratislaufzeit.

```json
{
  "requestId": "DEMO-2026-0042",
  "delivery": "D-1042",
  "items": [
    {"product": "P-17", "quantity": 8, "unit": "EA"}
  ]
}

```

## Kontrollfragen

### Was macht eine requestId allein aus einer Buchungsoperation?

- [ ] Automatisch eine idempotente Operation
- [x] Noch keine idempotente Operation ohne passende Empfängerlogik
- [ ] Eine kostenlose Integration-Suite-Instanz

Wiederholungssicherheit muss durch den vereinbarten und implementierten Umgang mit der Kennung entstehen.

### Wie unterscheiden sich die geprüften kostenlosen Angebote?

- [x] 30-Tage-Basic-Trial und 90-Tage-Free-Plan sind unterschiedliche Angebote
- [ ] Alle Angebote sind unbegrenzt identisch
- [ ] Free Tier bedeutet immer kein Vertragsverhältnis

Die Produktseite beschreibt den Basic-Trial; die Dokumentation beschreibt einen separaten Free-Tier-Plan mit anderen Voraussetzungen.

### Was ist vor erneuter Aktivierung des abgelaufenen Free-Plans besonders wichtig?

- [ ] Zugangsdaten in Git veröffentlichen
- [ ] Alle Fehler ohne Begrenzung wiederholen
- [x] Integrationsinhalt rechtzeitig sichern oder geeigneten Planwechsel prüfen

Laut Dokumentation gehen bisherige Inhalte nach Ablauf und erneuter Aktivierung verloren.

## Quellen und Zugang

- [SAP: Integration Suite Trial](https://www.sap.com/products/technology-platform/integration-suite/trial.html): Öffentliche Produktseite geprüft; 30-Tage-Basic-Trial mit Teilumfang und begrenzten Rechten, Stand November 2026.
- [SAP-docs: Using Free Service Plans](https://github.com/SAP-docs/btp-integration-suite/blob/main/docs/ISuite/10-InitialSetup/using-free-service-plans-ddf6692.md): Offizieller öffentlicher Dokumentationsvolltext geprüft; 90 Tage, erneute Aktivierung mit Inhaltsverlust, Backup nötig.
- [SAP Help: Subscribing to Free Tier](https://help.sap.com/docs/integration-suite/sap-integration-suite/subscribing-to-free-tier): Öffentliche Help-Dokumentation; offizieller Indextext nennt CPEA/PAYG und Free-Entitlement als Voraussetzungen.

Recherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.
