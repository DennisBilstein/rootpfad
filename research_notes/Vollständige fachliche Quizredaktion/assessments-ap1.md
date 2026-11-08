# AP1-Praxisassessments m1–m41

## Welche Fachgrundlagen wurden tatsächlich abgerufen?

### Takeaway
Die Quellen wurden in dieser Bearbeitung per HTTP-Fetch tatsächlich abgerufen und inhaltlich gelesen; die URLs sind keine erfundenen Recherchebelege. Die Aufgaben, Datensätze und Rechenbeispiele sind eigene didaktische Konstruktionen, keine übernommenen offiziellen Prüfungsaufgaben.

### Cited Findings
- Python dokumentiert Iteration, exklusive Bereichsenden, Verzweigungen und Funktionen; Grundlage für m1, m2 und m4. Die konkrete PAP-/Struktogrammnotation wird auf dieser Seite nicht normiert — [Python Control Flow](https://docs.python.org/3/tutorial/controlflow.html).
- Binäre Suche setzt geordnete Daten voraus; logarithmische Suche und lineares Einfügen müssen getrennt betrachtet werden (m3) — [Python bisect](https://docs.python.org/3/library/bisect.html).
- Primärschlüssel, zusammengesetzte Schlüssel, Fremdschlüssel und m:n-Zwischentabellen werden konkret dokumentiert (m5/m6) — [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).
- LEFT JOIN erhält linke Zeilen ohne Treffer; ON- und WHERE-Filter sind bei Outer Joins nicht äquivalent (m7) — [PostgreSQL Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html).
- UML 2.5.1 ist eine formale Spezifikation der OMG; die abgerufene Seite ist das Spezifikationsverzeichnis, nicht der vollständige normative PDF-Text (m8/m9/m39; bei m17 nur allgemeiner Diagrammkontext) — [OMG UML](https://www.omg.org/spec/UML/2.5.1).
- Scrum ist ein definiertes iterativ-inkrementelles Framework mit Inspektion/Anpassung und nicht beliebige kurzfristige Arbeit (m10) — [Original Scrum Guide](https://scrumguides.org/scrum-guide.html).
- TCP ist ein zuverlässiger geordneter Byte-Strom. SYN/FIN verbrauchen Sequenzraum, ACK bezeichnet die nächste erwartete Nummer; Nullfenster verlangt besondere Behandlung (m11/m31/m40) — [RFC 9293 §§2.2,3.4,3.8.6](https://www.rfc-editor.org/rfc/rfc9293.html).
- CIDR-Präfixe, Blockgrößen und Longest-Prefix-Match sind dokumentiert (m12) — [RFC 4632 §§3.1,5.1](https://www.rfc-editor.org/rfc/rfc4632.html).
- IPv6 umfasst 128 Bit, erlaubt :: nur einmal und hat keine Broadcastadressen; Link-Local wird nicht über Links geroutet (m13) — [RFC 4291 §§2,2.2,2.5.6](https://www.rfc-editor.org/rfc/rfc4291.html).
- DHCP-Neuvergabe umfasst DISCOVER/OFFER/REQUEST/ACK; mehrere Angebote sind möglich. Bei erkanntem Adresskonflikt ist DECLINE und Neustart mit Warteempfehlung vorgesehen (m14) — [RFC 2131 §3.1](https://www.rfc-editor.org/rfc/rfc2131.html).
- ARP löst die Protokolladresse des nächsten lokalen Hops zur Hardwareadresse auf (m31) — [RFC 826 Packet Generation](https://www.rfc-editor.org/rfc/rfc826.html).
- NIST CSF ist eine freiwillige Orientierung zum Umgang mit Sicherheitsrisiken; Aufgaben-RPO/RTO, Rollen und Verfügbarkeitsziele sind eigene explizite Annahmen, keine vom Framework vorgeschriebenen Zahlen (m15/m33/m38) — [NIST CSF](https://www.nist.gov/cyberframework).
- Datenschutzverletzungen: Art.33 regelt die risikobezogene 72-h-Meldung, Art.34 das hohe Risiko für Betroffeneninformation. Art.12 regelt Monatsfrist, Verlängerung und Identitätszweifel; Art.17 enthält Ausnahmen, Art.15 Auskunftsinhalte (m16/m23/m29/m30/m32) — [DSGVO Originaltext](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng).
- TLS 1.3 trennt Schlüsselaustausch, Authentisierung und Recordschutz; PSK-only/0-RTT haben andere Forward-Secrecy-Eigenschaften als der konkret gewählte ECDHE-Fall (m16/m41) — [RFC 8446 §§1–2,4.4,Appendix E](https://www.rfc-editor.org/rfc/rfc8446.html).
- KI-gestützte Bewerberbewertung erscheint in Annex III Nr.4(a), Art.6(3) enthält differenzierte Ausnahmen; Profiling natürlicher Personen schließt diese Ausnahme aus. Emotionserkennung am Arbeitsplatz ist nach Art.5(1)(f) mit begrenzter medizinischer/Sicherheitsausnahme verboten (m30) — [KI-Verordnung](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng).
- NIST unterscheidet Cloud-Service- und Bereitstellungsmodelle (m23) — [NIST SP800-145](https://csrc.nist.gov/pubs/sp/800/145/final).
- PostgreSQL erlaubt Nutzung, Änderung und Verteilung unter Beibehaltung seiner konkret vorgegebenen Hinweise; keine pauschale Copyleftpflicht (m24) — [Original-Lizenz](https://www.postgresql.org/about/licence/).
- Mbit/MB und binäre Präfixe müssen getrennt werden; ein Byte entspricht acht Bit (m19/m21/m36) — [NIST Binary Prefixes](https://physics.nist.gov/cuu/Units/binary.html).
- PoE liefert elektrische Leistung über Kupfer; PSE-/PD-Leistung und Kabelverluste sowie Gesamt-/Portbudget sind getrennte Planungsfragen (m22) — [Cisco PoE](https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-power-over-ethernet.html).
- Kaufvertragsparteien schulden mangelfreie Sache bzw. Kaufpreis/Abnahme; Rabatt-, Kosten- und Finanzierungszahlen der Aufgaben sind hingegen frei gesetzte Szenariowerte (m18/m20) — [BGB §433](https://www.gesetze-im-internet.de/bgb/__433.html).
- Incident Management zielt auf Wiederherstellung und dokumentierte Priorisierung/Eskalation; die SLA-Werte sind Szenariovertrag, kein universelles ITIL-Gesetz (m25) — [Atlassian eigene ITSM-Dokumentation](https://www.atlassian.com/itsm/incident-management).
- Die vier Kommunikationsseiten sind Sachinformation, Selbstkundgabe, Beziehung und Appell (m26) — [Originalinstitut Schulz von Thun](https://www.schulz-von-thun.de/die-modelle/das-kommunikationsquadrat).
- Qualitätsmanagement nutzt Planen, Umsetzen, Prüfen und Handeln zur Verbesserung; Stichprobenerfolg beweist keine generelle Fehlerfreiheit (m27, letzter Teil eigene statistische Einordnung) — [ISO Qualitätsmanagement](https://www.iso.org/quality-management).
- Gute Trainingsleistung bei schlechter neuer Leistung ist Overfitting; divergierende Train-/Validierungsverluste sind ein Indiz (m28) — [Google eigene ML-Lehre](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting).
- KI-Risikomanagement umfasst Entwicklung, Nutzung und Evaluation; Wirtschaftlichkeit alleine ist keine Vertrauenswürdigkeitsprüfung (m29) — [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework).
- Objektidentität, Aliase und getrennte Klassen-/Instanzvariablen sind dokumentiert; Python erzwingt selbst keine echten privaten Attribute, daher verwendet m34 ausdrücklich sprachneutrales Design (m34/m35) — [Python Classes](https://docs.python.org/3/tutorial/classes.html).
- Microsoft beschreibt Firmware, UEFI und Bootmanager als getrennte Startkomponenten. Die abgerufene Seite ist archiviert und teils Mobile/SoC-spezifisch; die Aufgabe bleibt bei einer ausdrücklich vereinfachten generischen Kette (m37) — [Microsoft Boot and UEFI](https://learn.microsoft.com/en-us/windows-hardware/drivers/bringup/boot-and-uefi).

### Inferences
- Alle Zahlen, Inventare, technischen Datenblätter, SLA-Grenzen und Vertragsdetails in den Assessments sind ausdrücklich gesetzte Übungsannahmen. Sie behaupten keine realen Messergebnisse oder allgemeingültigen Produktdaten.
- Die Berechnungen wurden redaktionell hergeleitet: Netzplanende 8 Tage, Kostenindifferenz 200 Vorgänge, 12-GiB-Transfer 1288,49 Sekunden, N+1-Webkapazität vier Instanzen, KI-Pilotamortisation zwei Monate.

### Gaps
- Kein vollständiger normativer PAP-/Struktogrammstandard abgerufen. m2 nutzt Python nur für Kontrollfluss; ergänzend wurde [IBM Flowchart](https://www.ibm.com/think/topics/flowchart) für die Prozessdiagrammdefinition gelesen. Diese Quellenreichweite nicht als vollständige normative Fachverifikation darstellen.
- Nachrecherche für m17: [Microsoft Project Critical Path](https://support.microsoft.com/en-us/project/show-the-critical-path-of-your-project-in-project) tatsächlich abgerufen; erläutert kritischen Pfad, Puffer und Terminwirkung. Der ursprüngliche nur allgemein passende OMG-Link wurde im Assessment dadurch ersetzt. Konkrete Vorwärts-/Rückwärtszahlen sind eigene Rechnung.
- Nachrecherche für m20: [Microsoft Cost Accounting Terminology](https://learn.microsoft.com/en-us/dynamics365/finance/cost-accounting/terms-cost-accounting) tatsächlich abgerufen; definiert fixe, variable und gemischte Kosten. Der unzureichend themenspezifische BGB-Link wurde im Assessment dadurch ersetzt.
- BGB §433 belegt nicht Rabattrechenfolge; m18 ist insoweit durch explizite Modellannahmen und algebraische Herleitung begründet. NIST-Präfixseite belegt nicht RAM-/NVMe-Kompatibilität oder Von-Neumann-/Gatterlehre. Hier sind Szenariodaten bzw. fachliche manuelle Prüfung ausschlaggebend.
- Ergänzende Nachrecherche: alter Microsoft-Critical-Path-Pfad 404 (durch Suchtreffer und erfolgreichen Fetch ersetzt); Crucial-RAM-Seite Request Rejected; IBM-Von-Neumann-URL nur allgemeine Themenseite. Diese gescheiterten Seiten nicht als Fachbelege verwendet.
- GNU-Lizenzseiten zweimal mit Timeout, erste PostgreSQL-FK-Tutorialseite Timeout, zusätzliche Microsoft-Speicherverwaltungsseite 404, Intel-RAM-URL auf allgemeine Gamingseite weitergeleitet: nicht als überprüfte Fachbelege verwendet.
- Keine vollständige aktuelle Rechtsberatung/Übergangsvorschriftenprüfung für ein reales KI-Deployment. Aufgabe m30 verlangt diese Prüfung ausdrücklich separat; kein konkreter Einsatz wird freigegeben.

## Welche Artefakte und Grenzen decken die Aufgaben ab?

### Takeaway
`content/assessments-ap1.json` enthält für jedes ausgewählte Modul eine eigenständige deutsche Praxisaufgabe mit konkretem Abgabegegenstand, Normalfall, Grenzfall, Fehlerfall und vier fachbezogenen Kriterien.

### Cited Findings
- Die Eingabequelle ist `content/module-assessment-input.json`; ausgewählt wurden ausschließlich IDs passend zu `^m\d+$` mit Zahlenwert 1 bis 41. Das ist lokale Projektgrundlage, kein externer Tatsachenbeleg.
- Fachlicher Bezug der Aufgaben wird über die je Datensatz aufgeführten, oben erläuterten offiziellen bzw. institutionseigenen Primärquellen hergestellt; Quellenreichweitenbeschränkungen stehen ausdrücklich im Gaps-Abschnitt.

### Inferences
- Abgaben reichen von Pseudocode/Trockenlauf, SQL-Ergebnistabelle und UML-Diagrammen über Adress-/Portpläne, Paket-/Boot-/TCP-Loganalyse bis zu Kosten-, Kapazitäts-, Datenschutz- und Gesprächsprotokollen.
- Grenzen sind numerisch oder fachlich überprüfbar statt generischer 'leere Eingabe'-Wiederholung: etwa 62/63 IPv4-Hosts, 240/241 Clustersitzungen, 15/16 SLA-Minuten, 5%-Fehlerquote, null vorhergesagte Positive und optionale UML-Erweiterung.

### Gaps
- Ein Modulassessment ist eine fokussierte Stichprobe der Modulkompetenz, keine Behauptung vollständiger Prüfung aller einzelnen Lektionen.

## Was wurde validiert und was bleibt offen?

### Takeaway
Die lokale JSON-/Schema-/Abdeckungsprüfung wurde tatsächlich mit Python ausgeführt: 41 ausgewählte IDs, 41 eindeutige Assessments, 123 Fälle und 164 Rubrikkriterien. Das ist eine Strukturprüfung, kein Ausführen der praktischen Lernaufgaben und keine unabhängige menschliche Begutachtung.

### Cited Findings
- Lokale Validierung prüfte exakte Feldmenge, IDs, Duplikatfreiheit, vier unterschiedliche Rubriktexte, Fallfelder `input/expected`, nichtleere HTTPS-Quellenlisten sowie die Konstanten `execution='manual-review-required'` und `revision='assessment-v2'` in `content/assessments-ap1.json`.

### Inferences
- Die Datei ist vollständig für den beauftragten AP1-Auswahlbereich m1 bis m41 und kann durch den koordinierenden Agenten zusammengeführt werden.

### Gaps
- Keine unabhängige menschliche Fachfreigabe, keine tatsächlichen Rollouts, Netzwerk-/Boot-/Restoretests, kein SQL-/Pseudocode-Lauf und keine gesendeten Datenschutzmeldungen. Alle Einträge bleiben deshalb `manual-review-required`.
