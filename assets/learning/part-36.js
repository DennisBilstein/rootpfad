RP_LITERAL_6_text += "ge zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Die Werte liegen unmittelbar an und außerhalb beider Grenzen.\",\"Damit werden die festgelegten Grenzen ignoriert.\",\"Die beiden zulässigen Randwerte werden falsch ausgeschlossen.\",\"Damit fehlt die Prüfung direkt außerhalb des Bereichs.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#225@2026-11-07-full-v3\",\"lessonId\":\"abap-m7-l0\",\"recall\":\"Beantworte „In if_oo_adt_classrun~main soll die berechnete Summe in der ADT-Konsole erscheinen. Welcher Aufruf passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Dein erstes ABAP-Programm“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"out->write( sum ).\"},{\"label\":\"Begründung\",\"reference\":\"Der Ausgabeparameter bedient die ADT-Konsole.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Dein erstes ABAP-Programm“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Die klassische Liste ist nicht die Klassenkonsole.\",\"Ein Commit erzeugt keine Konsolenausgabe.\",\"Eine Nachricht ist nicht der vorgesehene Konsolenausgabekanal.\",\"Der Ausgabeparameter bedient die ADT-Konsole.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#226@2026-11-07-full-v3\",\"lessonId\":\"abap-m7-l1\",\"recall\":\"Beantworte „ref1 und ref2 zeigen auf dasselbe Objekt. Nach CLEAR ref1 wird ref2->run( ) aufgerufen. Was gilt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Typsystem im Detail: Referenz- vs. Wertsemantik“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"ref2 bleibt gebunden; das Objekt ist darüber weiter nutzbar.\"},{\"label\":\"Begründung\",\"reference\":\"CLEAR setzt nur die betreffende Referenzvariable zurück.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Typsystem im Detail: Referenz- vs. Wertsemantik“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Die weiterhin erreichbare Instanz wird nicht so gelöscht.\",\"CLEAR setzt nur die betreffende Referenzvariable zurück.\",\"Die zweite Referenz ist eine eigenständige Variable.\",\"CLEAR der Referenz verändert nicht den Objektzustand.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#227@2026-11-07-full-v3\",\"lessonId\":\"abap-m7-l2\",\"recall\":\"Beantworte „lt_items enthält drei Zeilen. Danach wird lt_items = VALUE #( ) ausgeführt. Was ist der neue Zustand?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Moderne funktionale Konstrukte im Detail“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"lt_items ist initial und enthält keine Zeilen.\"},{\"label\":\"Begründung\",\"reference\":\"Der leere Konstruktor liefert den Tabelleninitialwert.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Moderne funktionale Konstrukte im Detail“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Der leere Konstruktor liefert den Tabelleninitialwert.\",\"Für eine Zeile wären zusätzliche Zeilenklammern nötig.\",\"Ohne BASE wird der bisherige Inhalt nicht übernommen.\",\"Der Konstruktor ist keine Sortieranweisung.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#228@2026-11-07-full-v3\",\"lessonId\":\"abap-m8-l1\",\"recall\":\"Beantworte „Ein großer Stammdatenpuffer wird einmal gefüllt und oft über eine vollständige eindeutige externe ID gelesen. Was ist sinnvoll?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Speichermodell & Sekundärschlüssel im Detail“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Einen Hash-Sekundärschlüssel für diese ID gezielt nutzen.\"},{\"label\":\"Begründung\",\"reference\":\"Das Zugriffsmuster kann dessen Pflegekosten rechtfertigen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Speichermodell & Sekundärschlüssel im Detail“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Das ist für diesen Einzelzugriff unnötiger Zusatzaufwand.\",\"Die Optimierung benötigt den vollständigen Hash-Schlüssel.\",\"Unbenötigte Schlüssel verursachen Pflege- und Speicheraufwand.\",\"Das Zugriffsmuster kann dessen Pflegekosten rechtfertigen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#229@2026-11-07-full-v3\",\"lessonId\":\"abap-m8-l3\",\"recall\":\"Beantworte „Ein klassischer Ablauf registriert V1-Verbuchung und muss danach deren Abschluss beurteilen. Welche Variante passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Parallelverarbeitung & Locking-Konzepte“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"COMMIT WORK AND WAIT und anschließend Ergebnis behandeln.\"},{\"label\":\"Begründung\",\"reference\":\"AND WAIT wartet auf die hochprioritäre Verbuchung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Parallelverarbeitung & Locking-Konzepte“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"AND WAIT wartet auf die hochprioritäre Verbuchung.\",\"Asynchrone Verbuchung kann dann noch laufen.\",\"Eine feste Pause ist keine Abschluss- oder Erfolgsprüfung.\",\"Rollback dient nicht dem erfolgreichen Festschreiben.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#230@2026-11-07-full-v3\",\"lessonId\":\"abap-m9-l1\",\"recall\":\"Beantworte „Ein Report liest eine Million Zeilen und entfernt in ABAP alle außer Buchungskreis 1000. Was ist bei gleicher Semantik sinnvoll?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Erweiterte Open-SQL-Muster: CTEs & Window Functions“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Den Buchungskreis bereits in WHERE der Abfrage einschränken.\"},{\"label\":\"Begründung\",\"reference\":\"Nicht benötigte Zeilen werden nicht erst übertragen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Erweiterte Open-SQL-Muster: CTEs & Window Functions“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Das ersetzt den Datenbankfilter nicht.\",\"Nicht benötigte Zeilen werden nicht erst übertragen.\",\"Die große Ergebnismenge wurde bereits gelesen.\",\"Sortierung reduziert die übertragene Zeilenmenge nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#231@2026-11-07-full-v3\",\"lessonId\":\"abap-m9-l2\",\"recall\":\"Beantworte „Ein Index wird im repräsentativen Monitoring nicht genutzt, verursacht aber Pflegeaufwand. Was ist der sinnvolle nächste Schritt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „SQL-Performance: Ausführungspläne & Table Buffering“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Nutzen, seltene Zugriffsfälle und Schreibkosten vor Entfernung prüfen.\"},{\"label\":\"Begründung\",\"reference\":\"Ein ungenutzter Index ist ein Kandidat, kein Blindlöschauftrag.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „SQL-Performance: Ausführungspläne & Table Buffering“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Ein ungenutzter Index ist ein Kandidat, kein Blindlöschauftrag.\",\"Seltene wichtige Abfragen könnten betroffen sein.\",\"Mehr gleiche Strukturen schaffen keinen belegten Nutzen.\",\"Indizes benötigen Speicher und können Schreibkosten verursachen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#232@2026-11-07-full-v3\",\"lessonId\":\"abap-m10-l1\",\"recall\":\"Beantworte „Eine Klasse ändert sich bei SQL-Schema, Preisregel und E-Mail-Layout. Welche Aufteilung ist begründet?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „SOLID-Prinzipien in ABAP“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Datenzugriff, Preisberechnung und Benachrichtigung getrennt kapseln.\"},{\"label\":\"Begründung\",\"reference\":\"Die Verantwortlichkeiten besitzen unterschiedliche Änderungsgründe.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „SOLID-Prinzipien in ABAP“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Das reduziert die fachliche Mehrfachverantwortung nicht.\",\"Sichtbarkeit allein trennt die Änderungsgründe nicht.\",\"Ein Name beseitigt keine strukturelle Kopplung.\",\"Die Verantwortlichkeiten besitzen unterschiedliche Änderungsgründe.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#233@2026-11-07-full-v3\",\"lessonId\":\"abap-m10-l4\",\"recall\":\"Beantworte „Eine Infrastruktur-Exception wird gefangen und soll als fachliche Exception mit Ursachenkette weitergereicht werden. Was ist korrekt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Exception-Design: eigene Hierarchien & Fehlerkategorien“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Neue fachliche Exception mit previous = lx_cause auslösen.\"},{\"label\":\"Begründung\",\"reference\":\"PREVIOUS erhält die technische Ursache für Diagnose.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Exception-Design: eigene Hierarchien & Fehlerkategorien“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Das verschluckt den Fehler im Aufrufvertrag.\",\"Damit geht die gewünschte Ursachenkette verloren.\",\"PREVIOUS erhält die technische Ursache für Diagnose.\",\"Das ist nicht die passende allgemeine RAISE-Syntax.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#234@2026-11-07-full-v3\",\"lessonId\":\"abap-m11-l1\",\"recall\":\"Beantworte „Ein virtuelles ABAP-Feld wird erst nach DB-Lesen berechnet. Nun soll darauf datenbankseitig sortiert und gefiltert werden. Was folgt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Virtuelle Elemente & CDS Table Functions“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Direktes DB-Filtern geht nicht; Pushdown oder unterstützte Filtertransformation prüfen.\"},{\"label\":\"Begründung\",\"reference\":\"Die DB besitzt den erst später berechneten Wert nicht.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Virtuelle Elemente & CDS Table Functions“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Die DB besitzt den erst später berechneten Wert nicht.\",\"Die spätere Berechnung wird dadurch nicht persistiert.\",\"ABAP-Exitlogik ist nicht beliebig in SQL ausführbar.\",\"Nachträgliche Filterung ist kein Datenbank-Pushdown.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#235@2026-11-07-full-v3\",\"lessonId\":\"abap-m12-l1\",\"recall\":\"Beantworte „Ein RAP-Handler verarbeitet aktive und Draft-Instanzen mit denselben fachlichen Schlüsseln. Warum %tky weiterreichen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Draft-Handling im Detail“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Es enthält die transaktionale Identifikation einschließlich relevanter Draft-Unterscheidung.\"},{\"label\":\"Begründung\",\"reference\":\"Nur fachliche Schlüssel können den Bearbeitungszustand nicht unterscheiden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Draft-Handling im Detail“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"%tky ist kein bloßes Datumsfeld.\",\"Benutzer und Instanzidentifikation sind verschiedene Daten.\",\"Ein Identifikationsfeld steuert keinen Commit.\",\"Nur fachliche Schlüssel können den Bearbeitungszustand nicht unterscheiden.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#236@2026-11-07-full-v3\",\"lessonId\":\"abap-m12-l2\",\"recall\":\"Beantworte „Ein OData-Update scheitert mit veralteter ETag-Vorbedingung. Welche Reaktion ist angemessen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Concurrency Control: ETag & Locking im Detail“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Aktuellen Stand laden, Unterschiede prüfen und bewusst erneut ändern.\"},{\"label\":\"Begründung\",\"reference\":\"Der Konflikt muss ohne stilles Überschreiben behandelt werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Concurrency Control: ETag & Locking im Detail“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Das umgeht den Schutz fremder Änderungen.\",\"Damit wird eine nicht gespeicherte Änderung als Erfolg dargestellt.\",\"Der Konflikt muss ohne stilles Überschreiben behandelt werden.\",\"Die unveränderte Vorbedingung bleibt veraltet.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#237@2026-11-07-full-v3\",\"lessonId\":\"abap-m13-l2\",\"recall\":\"Beantworte „Eine Wertehilfe hat 200000 Artikel und wird ungefiltert langsam. Welche Verbesserung ist angemessen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Value Helps & Filterlogik im Detail“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Suche, abhängige Filter und Paging für diesen Bestand prüfen.\"},{\"label\":\"Begründung\",\"reference\":\"Die Maßnahme soll zum Datenvolumen und Zugriffsmuster passen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Value Helps & Filterlogik im Detail“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Die Maßnahme soll zum Datenvolumen und Zugriffsmuster passen.\",\"Kleine Wertemengen brauchen nicht dieselbe Restriktion.\",\"Das erhöht Datenvolumen und Verzögerung.\",\"Der eigentliche Datenzugriff bleibt unverändert.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#238@2026-11-07-full-v3\",\"lessonId\":\"abap-m14-l1\",\"recall\":\"Beantworte „Ein SAP-Funktionsbaustein ist nicht für ABAP Cloud freigegeben. Wie gehst du damit um?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „ABAP Cloud vs. klassisches ABAP: Released APIs“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Für Cloud eine freigegebene Alternative suchen; klassische Nutzung separat klassifizieren.\"},{\"label\":\"Begründung\",\"reference\":\"Nicht freigegeben bedeutet nicht automatisch defekt oder Level D.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „ABAP Cloud vs. klassisches ABAP: Released APIs“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Freigabestatus ist kein allgemeiner Fehlernachweis.\",\"Dynamik schafft keinen gültigen Nutzungsvertrag.\",\"Alter ersetzt keine passende API-Freigabe.\",\"Nicht freigegeben bedeutet nicht automatisch defekt oder Level D.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#239@2026-11-07-full-v3\",\"lessonId\":\"abap-m15-l1\",\"recall\":\"Beantworte „Eine Suchfunktion setzt input direkt in name = 'input' ein. Welcher Test prüft gezielt eine mögliche Klauselmanipulation?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Sichere Programmierung: Dynamisches SQL & SQL-Injection“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Ein Wert mit schließendem Apostroph und zusätzlicher OR-Bedingung.\"},{\"label\":\"Begründung\",\"reference\":\"Er prüft die Trennung zwischen Datenwert und SQL-Syntax.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Sichere Programmierung: Dynamisches SQL & SQL-Injection“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Damit wird keine strukturelle Manipulation versucht.\",\"Ein normaler Datenwert prüft diese Schwachstelle nicht gezielt.\",\"Er prüft die Trennung zwischen Datenwert und SQL-Syntax.\",\"Das testet eher Zeichencodierung als Klauselausbruch.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#240@2026-11-07-full-v3\",\"lessonId\":\"abap-m16-l1\",\"recall\":\"Beantworte „Ein Transport bündelt eine kleine Steuerkorrektur mit mehreren unabhängigen Funktionen. Warum ist Trennung oft sinnvoll?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „abapGit-Workflows im Team“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Abhängige fachliche Einheiten gezielt testen und freigeben.\"},{\"label\":\"Begründung\",\"reference\":\"Kleine Einheiten begrenzen Umfang, erfordern aber Abhängigkeitsprüfung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „abapGit-Workflows im Team“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Auch kleine Änderungen können große Auswirkungen haben.\",\"Technischer Umfang ist kein Vollständigkeitsnachweis.\",\"Kleine Einheiten begrenzen Umfang, erfordern aber Abhängigkeitsprüfung.\",\"Transport-Rückbau ist kein garantierter Datenbankrollback.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#241@2026-11-07-full-v3\",\"lessonId\":\"abap-m17-l1\",\"recall\":\"Beantworte „Ein klassischer Dialogprozess schreibt direkt in die DB und zeigt danach ein neues Dynpro. Warum ist späterer Rollback riskant?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Die SAP LUW: COMMIT WORK und Verbuchung“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Der Dialogschritt kann einen impliziten DB-Commit ausgelöst haben.\"},{\"label\":\"Begründung\",\"reference\":\"Ein späterer Rollback nimmt bereits committete DB-LUWs nicht zurück.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Die SAP LUW: COMMIT WORK und Verbuchung“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Es gibt auch implizite Datenbank-Commits.\",\"Das ist nicht die Bedeutung des DB-Commits.\",\"Datenbank-LUW und SAP-LUW sind zu unterscheiden.\",\"Ein späterer Rollback nimmt bereits committete DB-LUWs nicht zurück.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#242@2026-11-07-full-v3\",\"lessonId\":\"abap-m17-l2\",\"recall\":\"Beantworte „Zwei klassische SAP-GUI-Modi eines Benutzers sollen einen einfachen vorbelegten Parameter austauschen. Was ist vorgesehen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"SET/GET PARAMETER ID über das passende SAP Memory.\"},{\"label\":\"Begründung\",\"reference\":\"SPA/GPA-Parameter dienen solchen benutzerbezogenen Vorgaben.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Speicherkonzepte: ABAP Memory, SAP Memory, Shared Objects“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"ABAP Memory hat einen anderen Sitzungskontext.\",\"Sie ist kein verlässlicher gemeinsamer Parametervertrag.\",\"SPA/GPA-Parameter dienen solchen benutzerbezogenen Vorgaben.\",\"Sie ist für den anderen Modus nicht verfügbar.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#243@2026-11-07-full-v3\",\"lessonId\":\"abap-m18-l1\",\"recall\":\"Beantworte „Eine Referenz wird an einer unbekannten Stelle initial. Du willst genau den Übergang untersuchen. Welche Maßnahme passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Der Debugger als Profiwerkzeug“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Watchpoint auf die Referenz setzen und den Lauf beobachten.\"},{\"label\":\"Begründung\",\"reference\":\"Der Wertwechsel grenzt die verursachende Ausführungsstelle ein.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Der Debugger als Profiwerkzeug“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Statische Verwendung ist nicht der tatsächlich ausgeführte Wertwechsel.\",\"Der Wertwechsel grenzt die verursachende Ausführungsstelle ein.\",\"Das zeigt nicht, wann die Referenz verändert wird.\",\"Formatierung findet keinen Laufzeitübergang.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#244@2026-11-07-full-v3\",\"lessonId\":\"abap-m19-l1\",\"recall\":\"Beantworte „Eine Bestellung wartet synchron auf ein zeitweise ausgefallenes Fremdsystem. Was ist das zentrale Integrationsrisiko?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „RFC, BAPIs und ihre Tücken“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Antwortabhängigkeit und Timeouts können den lokalen Ablauf blockieren.\"},{\"label\":\"Begründung\",\"reference\":\"Entkopplung benötigt einen passenden fachlichen Integrationsvertrag.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „RFC, BAPIs und ihre Tücken“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Nach unklarem Ergebnis droht doppelte Verarbeitung.\",\"Entkopplung benötigt einen passenden fachlichen Integrationsvertrag.\",\"Das beschreibt weder das eigentliche Risiko noch eine allgemeine Regel.\",\"Fehlerbehandlung ist durchaus möglich und nötig.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#245@2026-11-07-full-v3\",\"lessonId\":\"abap-m20-l3\",\"recall\":\"Beantworte „Für eine Zusatzprüfung stehen Standardmodifikation und passender freigegebener BAdI zur Wahl. Warum ist der BAdI meist vorzuziehen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Anti-Patterns und rote Linien“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Er nutzt einen unterstützten Vertrag statt geänderten SAP-Basissource.\"},{\"label\":\"Begründung\",\"reference\":\"Modifikationen erzeugen zusätzlichen Upgrade-Abgleich und Kopplung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Anti-Patterns und rote Linien“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://github.com/SAP-samples/abap-cheat-sheets\"],\"rationales\":[\"Vertragsstabilität ersetzt keine Qualitätssicherung.\",\"Laufzeitvorteile folgen nicht aus der Erweiterungsart allein.\",\"Modifikationen erzeugen zusätzlichen Upgrade-Abgleich und Kopplung.\",\"Auch eine Erweiterung muss korrekt entwickelt und getestet werden.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#246@2026-11-07-full-v3\",\"lessonId\":\"java-m1-l1\",\"recall\":\"Beantworte „Eine Schleife beginnt mit positivem n und vermindert n solange n > 0 gilt um eins. Was begründet ihre Terminierung?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Pseudocode-Grundlagen (IHK-Konvention)“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"n sinkt strikt bis zum erreichbaren Wert 0.\"},{\"label\":\"Begründung\",\"reference\":\"Die nichtnegative sinkende Größe begrenzt die Durchlaufzahl.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Pseudocode-Grundlagen (IHK-Konvention)“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html\"],\"rationales\":[\"Die nichtnegative sinkende Größe begrenzt die Durchlaufzahl.\",\"Ein begrenzter Datentyp allein beweist kein Erreichen der Abbruchbedingung.\",\"Auch eine einzelne Schleife ohne Fortschritt kann endlos laufen.\",\"Eine Vorabprüfung allein garantiert nicht, dass die Bedingung irgendwann falsch wird.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#247@2026-11-07-full-v3\",\"lessonId\":\"java-m1-l2\",\"recall\":\"Beantworte „Eine Unterrichtsvorlage verwendet das Parallelogramm ausdrücklich für Ein-/Ausgabe. Ihr Ablaufplan liest einen Preis und berechnet danach die Steuer. Welche Symbolzuordnung passt zu dieser Vorlage?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Struktogramme & Programmablaufpläne (PAP)“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Einlesen im Parallelogramm, Berechnung im Rechteck.\"},{\"label\":\"Begründung\",\"reference\":\"In der ausdrücklich vereinbarten Unterrichtsnotation steht das Parallelogramm für Eingabe und das Rechteck für Verarbeitung; daraus folgt keine pauschale Aussage zu jeder DIN-Ausgabe.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Struktogramme & Programmablaufpläne (PAP)“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://de.wikipedia.org/wiki/Programmablaufplan\"],\"rationales\":[\"Diese Zuordnung vertauscht die beiden Symbolfunktionen.\",\"Oval und Raute kennzeichnen andere Kontrollfunktionen.\",\"Eine Rechnung ist kein Endpunkt und die Eingabe keine Entscheidung.\",\"In der ausdrücklich vereinbarten Unterrichtsnotation steht das Parallelogramm für Eingabe und das Rechteck für Verarbeitung; daraus folgt keine pauschale Aussage zu jeder DIN-Ausgabe.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#248@2026-11-07-full-v3\",\"lessonId\":\"java-m1-l4\",\"recall\":\"Beantworte „Ein binärer Suchraum enthält 1024 Kandidaten. Wie viele rechnerische Halbierungen reduzieren ihn auf einen Kandidaten?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Komplexität verstehen: Big-O für Prüfung und Praxis“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"10, denn 1024 ist 2 hoch 10.\"},{\"label\":\"Begründung\",\"reference\":\"Zehn Halbierungen reduzieren 1024 auf 1; das ist keine universelle maximale Vergleichszahl jeder Suchimplementierung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Komplexität verstehen: Big-O für Prüfung und Praxis“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://xlinux.nist.gov/dads/HTML/binarySearch.html\"],\"rationales\":[\"Zehn Halbierungen reduzieren 1024 auf 1; das ist keine universelle maximale Vergleichszahl jeder Suchimplementierung.\",\"Der Startindex ändert die Potenzrechnung nicht.\",\"Die Bitbreite bestimmt nicht diese Halbierungszahl.\",\"Binäre Suche verwirft jeweils einen großen Teil des Bereichs.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#249@2026-11-07-full-v3\",\"lessonId\":\"java-m1-l4\",\"recall\":\"Beantworte „Ein Abgleich vergleicht jede von n Rechnungen mit jeder von n Buchungen ohne Abbruch. Wie viele Paarprüfungen entstehen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Komplexität verstehen: Big-O für Prüfung und Praxis“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"n²; doppeltes n ergibt vierfachen Aufwand.\"},{\"label\":\"Begründung\",\"reference\":\"Jeder der n äußeren Durchläufe hat n innere Durchläufe.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Komplexität verstehen: Big-O für Prüfung und Praxis“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html\"],\"rationales\":[\"Eine Halbierung ist hier nicht beschrieben.\",\"Jeder der n äußeren Durchläufe hat n innere Durchläufe.\",\"Verschachtelte vollständige Schleifen multiplizieren ihre Durchlaufzahlen.\",\"Gleiche Obergrenzen beseitigen die innere Schleife nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#250@2026-11-07-full-v3\",\"lessonId\":\"java-m2-l2\",\"recall\":\"Beantworte „Position(BestellNr, PosNr, ProduktNr, Name, Gewicht) hat nur (BestellNr, PosNr) als Kandidatenschlüssel. Kein echter Schlüsselteil bestimmt Produktdaten; ProduktNr bestimmt Name und Gewicht. Welche Diagnose stimmt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Normalisierung 1NF bis 3NF“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Transitive Abhängigkeit verletzt die 3NF.\"},{\"label\":\"Begründung\",\"reference\":\"Der Schlüssel bestimmt ProduktNr und diese bestimmt weitere Nichtschlüsselattribute.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Normalisierung 1NF bis 3NF“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description\"],\"rationales\":[\"Atomare Einzelwerte sind kein 1NF-Verstoß.\",\"Zusammengesetzte Schlüssel verhindern transitive Abhängigkeiten nicht.\",\"Der Schlüssel bestimmt ProduktNr und diese bestimmt weitere Nichtschlüsselattribute.\",\"Die nötige Teilabhängigkeit wurde ausdrücklich ausgeschlossen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#251@2026-11-07-full-v3\",\"lessonId\":\"java-m3-l3\",\"recall\":\"Beantworte „Ein Vertrag hat kuendigungsdatum=NULL, zwei andere haben ein Datum. Welche Abfrage zählt genau den Vertrag ohne Kündigungsdatum?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Aggregation, GROUP BY, HAVING und Subqueries“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"COUNT(*) mit WHERE kuendigungsdatum IS NULL.\"},{\"label\":\"Begründung\",\"reference\":\"COUNT(*) zählt die eine durch IS NULL ausgewählte Zeile.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Aggregation, GROUP BY, HAVING und Subqueries“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://www.postgresql.org/docs/current/queries.html\"],\"rationales\":[\"COUNT(spalte) überspringt NULL und liefert hier 0.\",\"Der Gleichheitsvergleich mit NULL selektiert diese Zeile nicht.\",\"IS NOT NULL wählt die beiden vorhandenen Datumswerte.\",\"COUNT(*) zählt die eine durch IS NULL ausgewählte Zeile.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#252@2026-11-07-full-v3\",\"lessonId\":\"java-m4-l1\",\"recall\":\"Beantworte „Code Review hat ein WIP-Limit von zwei und enthält bereits zwei Tickets. Ein drittes ist fertig entwickelt. Was unterstützt den Arbeitsfluss?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Wasserfall, V-Modell, Scrum und Kanban“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Den Review-Engpass gemeinsam abbauen, bevor mehr hineingezogen wird.\"},{\"label\":\"Begründung\",\"reference\":\"WIP-Limits machen Engpässe sichtbar und fördern das Fertigstellen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Wasserfall, V-Modell, Scrum und Kanban“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://kanbanguides.org/english/\"],\"rationales\":[\"Mehr begonnene Arbeit löst den Review-Engpass nicht.\",\"Das Limit betrifft Arbeitselemente, nicht Personen.\",\"WIP-Limits machen Engpässe sichtbar und fördern das Fertigstellen.\",\"Das Ignorieren entwertet die Arbeitsbegrenzung.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#253@2026-11-07-full-v3\",\"lessonId\":\"java-m5-l2\",\"recall\":\"Beantworte „Ein Kunde darf 0..1 bevorzugte Lieferadresse besitzen. Welcher Zustand verletzt diese Multiplizität?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Klassendiagramme & Beziehungstypen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Ein Kunde hat zwei bevorzugte Lieferadressen gleichzeitig.\"},{\"label\":\"Begründung\",\"reference\":\"Die Obergrenze 1 verbietet zwei Zuordnungen für denselben Kunden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Klassendiagramme & Beziehungstypen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://www.omg.org/spec/UML/2.5.1/PDF\"],\"rationales\":[\"Die Untergrenze 0 erlaubt das Fehlen einer Zuordnung.\",\"Die Obergrenze 1 verbietet zwei Zuordnungen für denselben Kunden.\",\"Eine Zuordnung liegt innerhalb des Bereichs 0..1.\",\"Ohne weitere Gegenmultiplizität verbietet diese Angabe das gemeinsame Adressobjekt nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#254@2026-11-07-full-v3\",\"lessonId\":\"java-m6-l1\",\"recall\":\"Beantworte „Ein Mengenfeld erlaubt ganze Zahlen von 1 bis 100 einschließlich. Welches Set prüft beide Gül";
RP_LITERAL_6_text += "tigkeitsübergänge unmittelbar?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Black-Box, White-Box, Äquivalenzklassen, Grenzwerte“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"0, 1, 100 und 101.\"},{\"label\":\"Begründung\",\"reference\":\"0/1 und 100/101 liegen direkt außerhalb und innerhalb der Grenzen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Black-Box, White-Box, Äquivalenzklassen, Grenzwerte“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf\"],\"rationales\":[\"0/1 und 100/101 liegen direkt außerhalb und innerhalb der Grenzen.\",\"Die äußeren Nachbarn fehlen.\",\"Nur weit entfernte ungültige Werte prüfen die Übergänge nicht.\",\"Die eigentlichen Randwerte fehlen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#255@2026-11-07-full-v3\",\"lessonId\":\"java-m7-l1\",\"recall\":\"Beantworte „Ein CI-Agent muss Java-Quellen kompilieren; die Produktionsumgebung soll nur ausführen. Welche Aussage passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Dein erstes Java-Programm“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Der Build braucht JDK-Werkzeuge; eine passende Laufzeit genügt zum Ausführen.\"},{\"label\":\"Begründung\",\"reference\":\"Das JDK enthält Entwicklungswerkzeuge; Laufzeitabbilder können auch passend zugeschnitten werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Dein erstes Java-Programm“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/specs/man/javac.html\",\"https://dev.java/learn/\"],\"rationales\":[\"Das JDK enthält Entwicklungswerkzeuge; Laufzeitabbilder können auch passend zugeschnitten werden.\",\"Ohne Compilerwerkzeug kann dieser Build keine Quellen übersetzen.\",\"Bereits kompilierte Anwendungen müssen nicht erneut kompiliert werden.\",\"Entwicklungswerkzeuge sind ein sachlicher Unterschied.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#256@2026-11-07-full-v3\",\"lessonId\":\"java-m7-l2\",\"recall\":\"Beantworte „Eine Auslastung soll bei sieben Aufträgen und zwei Bearbeitern 3.5 ergeben. Welche Java-Zeile liefert diesen Quotienten?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Primitive Typen und Referenztypen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"double last = (double) 7 / 2;\"},{\"label\":\"Begründung\",\"reference\":\"Der Cast vor der Division bewirkt Gleitkommadivision.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Primitive Typen und Referenztypen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html\"],\"rationales\":[\"Der Cast erfolgt erst nach der bereits abgeschnittenen Ganzzahldivision.\",\"Der Zieltyp allein ändert die int-Division nicht.\",\"Der int-Ergebniswert ist 3, nicht 3.5.\",\"Der Cast vor der Division bewirkt Gleitkommadivision.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#257@2026-11-07-full-v3\",\"lessonId\":\"java-m7-l2\",\"recall\":\"Beantworte „Nach int[] x={1,2}; int[] y=x; y[0]=9; wird x[0] gelesen. Welcher Wert und welche Begründung stimmen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Primitive Typen und Referenztypen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"9, weil x und y dasselbe Array referenzieren.\"},{\"label\":\"Begründung\",\"reference\":\"Die Änderung über y betrifft das gemeinsame Objekt.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Primitive Typen und Referenztypen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html\"],\"rationales\":[\"Die Änderung über y betrifft das gemeinsame Objekt.\",\"Die Referenzzuweisung erstellt keine Inhaltskopie.\",\"Index 0 bleibt Index 0.\",\"Mehrere Referenzen auf ein Array sind erlaubt.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#258@2026-11-07-full-v3\",\"lessonId\":\"java-m7-l3\",\"recall\":\"Beantworte „Ein Test vergleicht \\\"abc\\\" == new String(\\\"abc\\\") und erhält false. Welche Änderung prüft die gewünschte fachliche Gleichheit?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Strings und Textverarbeitung“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"\\\"abc\\\".equals(new String(\\\"abc\\\")) verwenden.\"},{\"label\":\"Begründung\",\"reference\":\"equals vergleicht den gleichen Inhalt verschiedener Stringobjekte.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Strings und Textverarbeitung“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html\"],\"rationales\":[\"Gleiche Länge erzeugt keine Referenzidentität.\",\"Hashwerte sind nicht eindeutig.\",\"Ein Cast verändert weder Objektidentität noch Bedeutung von ==.\",\"equals vergleicht den gleichen Inhalt verschiedener Stringobjekte.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#259@2026-11-07-full-v3\",\"lessonId\":\"java-m7-l4\",\"recall\":\"Beantworte „final List<String> namen = new ArrayList<>(); wird deklariert. Welche anschließende Aktion ist ohne andere Einschränkung erlaubt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Kontrollstrukturen und moderne Syntax“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"namen.add(\\\"Ada\\\") verändert die vorhandene Liste.\"},{\"label\":\"Begründung\",\"reference\":\"final verhindert Neuzuweisung, nicht die Mutation des referenzierten Listenobjekts.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Kontrollstrukturen und moderne Syntax“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html\"],\"rationales\":[\"Auch null wäre eine verbotene Neuzuweisung.\",\"final erzeugt keine zusätzliche Zugriffsmöglichkeit auf Komponenten.\",\"final verhindert Neuzuweisung, nicht die Mutation des referenzierten Listenobjekts.\",\"Die Referenz wurde bereits initialisiert.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#260@2026-11-07-full-v3\",\"lessonId\":\"java-m8-l1\",\"recall\":\"Beantworte „Kunde k = new Kunde(invalid); wirft während der Konstruktion eine Exception; this wurde nicht veröffentlicht. Was gilt für die Zuweisung?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Klassen, Objekte, Konstruktoren“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Sie wird nicht abgeschlossen; der Ausdruck liefert keine neue Referenz.\"},{\"label\":\"Begründung\",\"reference\":\"Der new-Ausdruck endet abrupt; die Zuweisung erfolgt nicht. Speicher kann zuvor bereits reserviert worden sein.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Klassen, Objekte, Konstruktoren“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html\"],\"rationales\":[\"Der abrupt beendete new-Ausdruck liefert keine Referenz für die Zuweisung.\",\"Der new-Ausdruck endet abrupt; die Zuweisung erfolgt nicht. Speicher kann zuvor bereits reserviert worden sein.\",\"Die Ausnahme beendet den Ausdruck abrupt; sie wird nicht in einen normalen Nullrückgabewert umgewandelt.\",\"Konstruktorfehler bewirken keinen allgemeinen Rollback fremder Änderungen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#261@2026-11-07-full-v3\",\"lessonId\":\"java-m8-l2\",\"recall\":\"Beantworte „Basis in Paket a hat protected int wert. Unter in Paket b erbt davon. Welche Zugriffsaussage ist korrekt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Vererbung und Polymorphie“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Unter darf über this auf wert zugreifen; ein beliebiges Basis-Objekt ist nicht automatisch erlaubt.\"},{\"label\":\"Begründung\",\"reference\":\"Paketübergreifender Unterklassenzugriff hat zusätzliche Empfängerregeln; protected ist kein pauschales öffentliches Recht.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Vererbung und Polymorphie“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-6.html\"],\"rationales\":[\"Paketübergreifender Unterklassenzugriff hat zusätzliche Empfängerregeln; protected ist kein pauschales öffentliches Recht.\",\"Das bloße Paket der Unterklasse erhält keine allgemeinen Zugriffsrechte.\",\"Unterklassen können unter den vorgesehenen Bedingungen zugreifen.\",\"public ist weitergehend als protected.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#262@2026-11-07-full-v3\",\"lessonId\":\"java-m8-l3\",\"recall\":\"Beantworte „Ein Interface deklariert List<String> NAMEN = new ArrayList<>();. Welche Aussage verhindert einen gefährlichen Irrtum?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Interfaces und abstrakte Klassen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Die Referenz ist public static final, der Listeninhalt kann dennoch veränderlich sein.\"},{\"label\":\"Begründung\",\"reference\":\"Interfacefelder sind Konstantenreferenzen; das referenzierte Objekt muss nicht unveränderlich sein.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Interfaces und abstrakte Klassen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html\"],\"rationales\":[\"final friert den Objektinhalt nicht ein.\",\"Das Feld ist static und damit geteilt.\",\"Interfacefelder sind implizit public.\",\"Interfacefelder sind Konstantenreferenzen; das referenzierte Objekt muss nicht unveränderlich sein.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#263@2026-11-07-full-v3\",\"lessonId\":\"java-m8-l4\",\"recall\":\"Beantworte „record Auftrag(List<String> positionen) erhält eine veränderliche ArrayList. Was kann trotz record passieren?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Records, Enums und sealed types“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Die übergebene Liste kann verändert werden; defensive Kopie ist nötig.\"},{\"label\":\"Begründung\",\"reference\":\"Records sind nur flach unveränderlich; finale Komponentenreferenzen garantieren keinen unveränderlichen Objektgraphen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Records, Enums und sealed types“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html\"],\"rationales\":[\"Der Standardaccessor kopiert die Liste nicht.\",\"Ein solcher Setter wird nicht erzeugt.\",\"Records sind nur flach unveränderlich; finale Komponentenreferenzen garantieren keinen unveränderlichen Objektgraphen.\",\"Eine defensive Tiefenkopie erfolgt nicht automatisch.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#264@2026-11-07-full-v3\",\"lessonId\":\"java-m9-l1\",\"recall\":\"Beantworte „Ein Import soll doppelte IDs entfernen und die Reihenfolge ihres ersten Auftretens bewahren. Welche Collection passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „List, Set, Map — welche wann?“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"LinkedHashSet.\"},{\"label\":\"Begründung\",\"reference\":\"LinkedHashSet kombiniert Eindeutigkeit mit Einfügereihenfolge.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „List, Set, Map — welche wann?“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/LinkedHashSet.html\"],\"rationales\":[\"TreeSet ordnet nach Sortierung statt erstem Auftreten.\",\"LinkedHashSet kombiniert Eindeutigkeit mit Einfügereihenfolge.\",\"HashSet garantiert diese Reihenfolge nicht.\",\"ArrayList verhindert keine Duplikate.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#265@2026-11-07-full-v3\",\"lessonId\":\"java-m9-l2\",\"recall\":\"Beantworte „Kunde überschreibt equals anhand der Kundennummer, erbt aber hashCode von Object. Zwei gleiche Kunden werden in ein HashSet eingefügt. Welche Diagnose passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „equals, hashCode und Comparable“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Der Hashvertrag kann verletzt sein; vermeintliche Duplikate sind möglich.\"},{\"label\":\"Begründung\",\"reference\":\"Gleiche Objekte müssen passende gleiche Hashwerte besitzen; ohne konsistente Implementierung ist das nicht gesichert.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „equals, hashCode und Comparable“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/HashMap.html\",\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html\"],\"rationales\":[\"Gleiche Objekte müssen passende gleiche Hashwerte besitzen; ohne konsistente Implementierung ist das nicht gesichert.\",\"Die Konsistenz von equals und hashCode wird nicht generell durch den Compiler bewiesen.\",\"Diese Annahme ignoriert die hashbasierte Vorauswahl und macht den Vertragsbruch nicht unschädlich.\",\"Ohne passenden Hashvertrag besteht diese Garantie gerade nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#266@2026-11-07-full-v3\",\"lessonId\":\"java-m9-l3\",\"recall\":\"Beantworte „Eine Klasse deklariert verarbeite(List<String>) und verarbeite(List<Integer>). Warum scheitert die Überladung?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Generics und Wildcards“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Beide Parameterlisten haben nach Erasure dieselbe Signatur.\"},{\"label\":\"Begründung\",\"reference\":\"Die Typargumente unterscheiden die erasierten List-Parameter nicht.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Generics und Wildcards“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html\",\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-5.html\"],\"rationales\":[\"Verschiedene Parametertypen können Überladung erlauben, aber die erasierten Signaturen kollidieren hier.\",\"Der Rückgabetyp allein löst die Signaturkollision nicht.\",\"Integer ist als Referenztyp zulässig; das Problem ist die gleiche Erasure.\",\"Die Typargumente unterscheiden die erasierten List-Parameter nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#267@2026-11-07-full-v3\",\"lessonId\":\"java-m9-l4\",\"recall\":\"Beantworte „Eine einzelne Thread-Schleife iteriert über eine ArrayList und entfernt direkt per list.remove. Warum kann ConcurrentModificationException auftreten?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Iteration, Modifikation und typische Fallen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Auch ein Thread kann den Iterator durch externe Strukturänderung ungültig machen.\"},{\"label\":\"Begründung\",\"reference\":\"Fail-fast betrifft unerwartete Strukturänderungen, nicht ausschließlich Mehrthreadzugriffe.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Iteration, Modifikation und typische Fallen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ArrayList.html\"],\"rationales\":[\"Bloßes Lesen ist nicht die beschriebene Strukturänderung.\",\"Fail-fast ist keine Synchronisierungs- oder vollständige Rennenerkennungsgarantie.\",\"Fail-fast betrifft unerwartete Strukturänderungen, nicht ausschließlich Mehrthreadzugriffe.\",\"Der Name impliziert keinen sicheren Nachweis mehrerer Threads.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#268@2026-11-07-full-v3\",\"lessonId\":\"java-m10-l1\",\"recall\":\"Beantworte „Eine Importmethode kann IOException oder IllegalArgumentException werfen. Welche Ausnahme muss ohne catch an der Aufrufstelle passend deklariert werden?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Checked, Unchecked und die Fehlerhierarchie“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"IOException als checked Exception.\"},{\"label\":\"Begründung\",\"reference\":\"Checked Exceptions müssen gefangen oder weiterdeklariert werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Checked, Unchecked und die Fehlerhierarchie“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html\"],\"rationales\":[\"Unchecked Exceptions haben nicht dieselbe Behandlungspflicht.\",\"Checked Exceptions müssen gefangen oder weiterdeklariert werden.\",\"Die statische Regel hängt vom Exceptiontyp ab, nicht von dieser vermuteten Ursache.\",\"Ein Kommentar ersetzt catch oder eine passende throws-Deklaration nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#269@2026-11-07-full-v3\",\"lessonId\":\"java-m10-l2\",\"recall\":\"Beantworte „Ein try-with-resources-Rumpf wirft IOException; close wirft anschließend ebenfalls. Welche Exception verlässt den Block normalerweise?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „try-with-resources und sauberes Aufräumen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Die ursprüngliche IOException mit der close-Exception als suppressed.\"},{\"label\":\"Begründung\",\"reference\":\"Die Primärexception bleibt erhalten und zusätzliche Schließfehler sind über getSuppressed verfügbar.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „try-with-resources und sauberes Aufräumen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-14.html\"],\"rationales\":[\"Die Primärexception bleibt erhalten und zusätzliche Schließfehler sind über getSuppressed verfügbar.\",\"Dies beschreibt nicht die Unterdrückungsregel bei bestehendem Primärfehler.\",\"Die Fehler werden nicht still geschluckt.\",\"Das Verhalten ist eine Laufzeitregel bei korrekter Deklaration.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#270@2026-11-07-full-v3\",\"lessonId\":\"java-m11-l1\",\"recall\":\"Beantworte „Stream<String> namen soll leere oder reine Leerzeichen enthaltende Strings erkennen. Welche Lambdaform entspricht String::isBlank?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Lambdas und funktionale Interfaces“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"s -> s.isBlank()\"},{\"label\":\"Begründung\",\"reference\":\"Die Methodenreferenz nutzt jedes Stringelement als Empfänger von isBlank.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Lambdas und funktionale Interfaces“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-9.html\"],\"rationales\":[\"length liefert int und nicht die isBlank-Entscheidung.\",\"Die Methodenreferenz nutzt jedes Stringelement als Empfänger von isBlank.\",\"Ein Konstruktor erzeugt Strings statt einen Wahrheitswert.\",\"valueOf prüft keine Leerraum-Eigenschaft.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#271@2026-11-07-full-v3\",\"lessonId\":\"java-m11-l2\",\"recall\":\"Beantworte „Ein Test erwartet Ausgaben aus peek, ruft auf der Pipeline aber keine terminale Operation auf. Warum bleiben sie aus?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Die Stream-Pipeline“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Die intermediäre Pipeline wird ohne Terminaloperation nicht traversiert.\"},{\"label\":\"Begründung\",\"reference\":\"Streams sind lazy; außerdem sollten fachliche Seiteneffekte nicht von peek abhängen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Die Stream-Pipeline“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html\"],\"rationales\":[\"Streams sind lazy; außerdem sollten fachliche Seiteneffekte nicht von peek abhängen.\",\"peek startet keinen solchen Thread.\",\"Die Quelle wird nicht durch stream-Erzeugung gelöscht.\",\"Der Grund ist die fehlende Traversierung, kein pauschales Ausgabeverbot.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#272@2026-11-07-full-v3\",\"lessonId\":\"java-m11-l4\",\"recall\":\"Beantworte „Ein vorhandenes Optional verwendet orElse(erzeugeNeu()), dessen Aufruf einen Audit-Eintrag schreibt. Warum entsteht dieser Eintrag trotzdem?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Optional richtig einsetzen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Methodenargumente werden vor orElse ausgewertet.\"},{\"label\":\"Begründung\",\"reference\":\"Die eifrige Argumentauswertung erfolgt unabhängig davon, ob der Ersatzwert gebraucht wird.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Optional richtig einsetzen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html\"],\"rationales\":[\"Der vorhandene Wert bleibt das Ergebnis; nur das Argument wurde unnötig berechnet.\",\"Die eifrige Argumentauswertung erfolgt unabhängig davon, ob der Ersatzwert gebraucht wird.\",\"Hier wird ein bereits ausgewertetes Argument übergeben.\",\"Die eifrige Argumentauswertung kann auch beim vorhandenen Wert Nebenwirkungen auslösen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#273@2026-11-07-full-v3\",\"lessonId\":\"java-m12-l1\",\"recall\":\"Beantworte „Nach jedem Webrequest wird ein Listener global registriert, beim Sitzungsende aber nie entfernt. Ein Heapdump zeigt alte Sitzungen über diese Listener. Was ist die passende Korrektur?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Stack, Heap und Garbage Collection“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Listenerlebensdauer begrenzen und Registrierungen zuverlässig aufheben.\"},{\"label\":\"Begründung\",\"reference\":\"Die überlebenden Referenzketten müssen durch passende Lebenszyklusverwaltung beendet werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Stack, Heap und Garbage Collection“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html\"],\"rationales\":[\"Die überlebenden Referenzketten müssen durch passende Lebenszyklusverwaltung beendet werden.\",\"GC entfernt weiterhin erreichbare Sitzungen nicht gezielt.\",\"Mehr Speicher verschiebt den Ausfall, beseitigt die Ursache nicht.\",\"Sichtbarkeit von Feldern beendet keine Referenzkette.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#274@2026-11-07-full-v3\",\"lessonId\":\"java-m12-l3\",\"recall\":\"Beantworte „Ein Profiler zeigt viel Boxing im numerischen Summenpfad mit Long. Welche Aussage ist fachlich belastbar?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Typische Performance-Fallen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"long entfernt das Wrapper-Boxing, garantiert aber nicht exakt eine eingesparte Allokation pro Addition.\"},{\"label\":\"Begründung\",\"reference\":\"Sprachsemantik und tatsächliche Laufzeitallokation müssen unterschieden werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Typische Performance-Fallen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html\",\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-5.html\"],\"rationales\":[\"Caching ist keine Synchronisierung.\",\"Sprachsemantik und tatsächliche Laufzeitallokation müssen unterschieden werden.\",\"Caches und Optimierungen widerlegen diese pauschale Allokationsgarantie.\",\"Unboxing ermöglicht die arithmetische Operation.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#275@2026-11-07-full-v3\",\"lessonId\":\"java-m13-l2\",\"recall\":\"Beantworte „Ein Team ersetzt int zaehler durch volatile int und erwartet exakte parallele zaehler++-Summen. Welche Korrektur passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Race Conditions, synchronized und volatile“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"AtomicInteger.incrementAndGet oder passende Synchronisierung verwenden.\"},{\"label\":\"Begründung\",\"reference\":\"Ein atomarer Read-Modify-Write oder Lock ist für das gemeinsame Inkrement nötig.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Race Conditions, synchronized und volatile“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html\"],\"rationales\":[\"transient betrifft Serialisierung, nicht atomare Änderungen.\",\"Strings lösen die nebenläufige Zähleroperation nicht.\",\"Ein atomarer Read-Modify-Write oder Lock ist für das gemeinsame Inkrement nötig.\",\"volatile garantiert nicht die Atomarität des zusammengesetzten ++.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#276@2026-11-07-full-v3\",\"lessonId\":\"java-m13-l3\",\"recall\":\"Beantworte „Ein rein rechenintensiver Batch wird mit 8 und 800 Threads auf acht verfügbaren Kernen getestet. Warum kann die zweite Variante langsamer sein?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „ExecutorService und Thread-Pools“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Zusätzliche Threads verursachen Schedulingkosten ohne zusätzliche Kerne.\"},{\"label\":\"Begründung\",\"reference\":\"Überbelegung kann Kontextwechsel und Ressourcenkonkurrenz erhöhen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „ExecutorService und Thread-Pools“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html\"],\"rationales\":[\"Threads erzeugen keine zusätzlichen CPU-Kerne.\",\"Überbelegung kann Kontextwechsel und Ressourcenkonkurrenz erhöhen.\",\"Mehr Threads sind zulässig, aber für diese Last nicht automatisch sinnvoll.\",\"Rechenkapazität und Lastprofil sind entscheidender als die bloße Eingabemenge.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#277@2026-11-07-full-v3\",\"lessonId\":\"java-m14-l1\",\"recall\":\"Beantworte „Während der Zeitrückstellung tritt eine lokale Uhrzeit zweimal auf. Ein Log speichert nur LocalDateTime. Wie vermeidet man die Mehrdeutigkeit für Ereignisse?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „java.time richtig verwenden“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Den tatsächlichen Zeitpunkt als Instant oder mit explizitem Offset erfassen.\"},{\"label\":\"Begründung\",\"reference\":\"Ein Zeitachsenwert oder expliziter Offset unterscheidet die beiden Vorkommen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „java.time richtig verwenden“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/package-summary.html\"],\"rationales\":[\"Das Datum allein verliert noch mehr Information.\",\"Ein unspezifizierter Suffix bietet keinen belastbaren Zeitvertrag.\",\"Ein Zeitachsenwert oder expliziter Offset unterscheidet die beiden Vorkommen.\",\"Weniger Präzision beseitigt die Zonenmehrdeutigkeit nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#278@2026-11-07-full-v3\",\"lessonId\":\"java-m14-l2\",\"recall\":\"Beantworte „Ein Exportvertrag schreibt UTF-8 vor. Warum ist eine explizite Charset-Angabe trotzdem sinnvoll, obwohl moderne Standardfälle UTF-8 nutzen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Dateien lesen und schreiben mit NIO.2“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Sie dokumentiert und erzwingt den Schnittstellenvertrag auch bei abweichenden APIs.\"},{\"label\":\"Begründung\",\"reference\":\"Der konkrete API-Vertrag zählt; eine pauschale Behauptung plattformabhängiger Defaults wäre veraltet.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Dateien lesen und schreiben mit NIO.2“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/file/Files.html\"],\"rationales\":[\"Diese Pauschalaussage ignoriert UTF-8-Defaults moderner JDKs und konkreter APIs.\",\"Der konkrete API-Vertrag zählt; eine pauschale Behauptung plattformabhängiger Defaults wäre veraltet.\",\"Zeichensatzkodierung bestimmt die Abbildung zwischen Zeichen und Bytes.\",\"Der Dateivertrag gilt unabhängig vom Betriebssystem.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#279@2026-11-07-full-v3\",\"lessonId\":\"java-m15-l1\",\"recall\":\"Beantworte „Ein Parser soll bei ungültiger Eingabe IllegalArgumentException werfen. Welche Assertion prüft genau diesen Fehlervertrag?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „JUnit 5: Struktur und Assertions“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"assertThrows(IllegalArgumentException.class, () -> parse(eingabe)).\"},{\"label\":\"Begründung\",\"reference\":\"assertThrows prüft den erwarteten Ausnahmetyp und liefert die Exception für weitere Prüfungen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „JUnit 5: Struktur und Assertions“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.junit.org/current/user-guide/\"],\"rationales\":[\"Ein Nullvergleich ist nicht der geforderte Ausnahmevertrag.\",\"Eine konstante Assertion prüft den Vertrag nicht.\",\"assertThrows prüft den erwarteten Ausnahmetyp und liefert die Exception für weitere Prüfungen.\",\"Dies verlangt gerade Fehlerfreiheit.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#280@2026-11-07-full-v3\",\"lessonId\":\"java-m15-l3\",\"recall\":\"Beantworte „Ein Fehler besteht in einem falschen Rückgabewert; ein Test durchläuft die betroffene Zeile, ignoriert das Ergebnis und bleibt grün. Welche Verbesserung trifft das Problem?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „TDD, Testabdeckung und was Tests wirklich wert sind“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Erwarteten Rückgabewert und relevante Randfälle explizit prüfen.\"},{\"label\":\"Begründung\",\"reference\":\"Die fehlende fachliche Assertion muss ergänzt werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „TDD, Testabdeckung und was Tests wirklich wert sind“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.junit.org/current/user-guide/\"],\"rationales\":[\"Die Zeile ist schon abgedeckt; die Qualitätslücke bleibt.\",\"Mehr identische Ausführung prüft den Wert nicht.\",\"Wartezeit erzeugt keine Verhaltensprüfung.\",\"Die fehlende fachliche Assertion muss ergänzt werden.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#281@2026-11-07-full-v3\",\"lessonId\":\"java-m16-l1\",\"recall\":\"Beantworte „Eine Servlet-API soll beim Kompilieren verfügbar sein, wird in Produktion aber vom Container bereitgestellt. Welcher Maven-Scope passt zum Vertrag?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Maven und Gradle verstehen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"provided.\"},{\"label\":\"Begründung\",\"reference\":\"provided beschreibt erwartete Bereitstellung durch die Laufzeitumgebung und ist auch für Tests verfügbar.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Maven und Gradle verstehen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html\"],\"rationales\":[\"runtime ist gerade nicht für den normalen Compileclasspath bestimmt.\",\"system verlangt einen expliziten lokalen Dateipfad und beschreibt nicht die übliche Containerbereitstellung.\",\"provided beschreibt erwartete Bereitstellung durch die Laufzeitumgebung und ist auch für Tests verfügbar.\",\"test reicht für normalen Produktionsquellcode beim Kompilieren nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#282@2026-11-07-full-v3\",\"lessonId\":\"java-m16-l2\",\"recall\":\"Beantworte „log.debug(\\\"Export {}\\\", berechneTeureStatistik()) kostet trotz deaktiviertem DEBUG Zeit. Was erklärt das und hilft gezielt?“ zunächst ohne Optionen. Begründe deine Entsch";
RP_LITERAL_6_text += "eidung im Zusammenhang mit „Logging statt System.out“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Argumentauswertung bleibt eifrig; Guard oder unterstützte Supplier-API verwenden.\"},{\"label\":\"Begründung\",\"reference\":\"Methodenargumente werden vor dem Logaufruf berechnet; Lazy-Argumente erfordern passende API-Nutzung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Logging statt System.out“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://www.slf4j.org/faq.html\"],\"rationales\":[\"Formatierung und Auswertung eines Argumentausdrucks sind verschiedene Schritte.\",\"Methodenargumente werden vor dem Logaufruf berechnet; Lazy-Argumente erfordern passende API-Nutzung.\",\"final verhindert keine Auswertung des Initialisierers oder Arguments.\",\"Die Vorabberechnung verschiebt nur den Aufwand, vermeidet ihn aber nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#283@2026-11-07-full-v3\",\"lessonId\":\"java-m17-l1\",\"recall\":\"Beantworte „Eine API soll nach einer vom Client gewählten Spalte sortieren. Kann ORDER BY ? die sichere Auswahl beliebiger Spaltennamen erledigen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „JDBC und PreparedStatement“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Nein; erlaubte Spalten auf feste SQL-Fragmente abbilden, Werte weiterhin binden.\"},{\"label\":\"Begründung\",\"reference\":\"Parameter binden Datenwerte, nicht beliebige SQL-Struktur; Identifikatoren benötigen eine kontrollierte Allowlist.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „JDBC und PreparedStatement“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/PreparedStatement.html\"],\"rationales\":[\"Ungeprüfte Strukturkonkatenation bleibt gefährlich.\",\"PreparedStatement ist keine Verschlüsselung.\",\"Parameter binden Datenwerte, nicht beliebige SQL-Struktur; Identifikatoren benötigen eine kontrollierte Allowlist.\",\"Die Bindung ist kein allgemeiner Makroersatz.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#284@2026-11-07-full-v3\",\"lessonId\":\"java-m17-l2\",\"recall\":\"Beantworte „Ein Entwickler glaubt, JDBC-Autocommit speichere erst beim Connection.close. Welche Korrektur ist präzise?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Transaktionen und Verbindungspools“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Statements werden bei ihrer Fertigstellung als einzelne Transaktionen committed.\"},{\"label\":\"Begründung\",\"reference\":\"Die Fertigstellung ist der relevante JDBC-Begriff; bei ResultSets kann deren Verarbeitung eine Rolle spielen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Transaktionen und Verbindungspools“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/Connection.html\"],\"rationales\":[\"Dies entspricht nicht dem Autocommit-Vertrag.\",\"Die Fertigstellung ist der relevante JDBC-Begriff; bei ResultSets kann deren Verarbeitung eine Rolle spielen.\",\"Auch einzelne Statements laufen in einer Transaktion.\",\"Abgeschlossene Transaktionen werden dadurch nicht zurückgenommen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#285@2026-11-07-full-v3\",\"lessonId\":\"java-m18-l1\",\"recall\":\"Beantworte „Eine Bibliothek verpackt einen Dateifehler mehrfach. Das Log nennt ganz unten im Caused-by-Pfad AccessDeniedException. Welche Aussage bleibt korrekt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Stacktraces richtig lesen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Das ist die tiefste erhaltene technische Ursache, nicht automatisch der vollständige fachliche Grund.\"},{\"label\":\"Begründung\",\"reference\":\"Ein Cause beschreibt erhaltene Fehlerverkettung; Rechtekonfiguration oder Prozesse können zusätzlich untersucht werden müssen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Stacktraces richtig lesen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/index.html\"],\"rationales\":[\"Ein Berechtigungsproblem kann durch Anwendung oder Umgebung entstehen.\",\"Das Verwerfen erschwert die Diagnose.\",\"Ein Cause beschreibt erhaltene Fehlerverkettung; Rechtekonfiguration oder Prozesse können zusätzlich untersucht werden müssen.\",\"Wrapper liefern Kontext, ersetzen die tiefere Ursache aber nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#286@2026-11-07-full-v3\",\"lessonId\":\"java-m19-l1\",\"recall\":\"Beantworte „Ein ReportService lädt SQL-Daten, berechnet Fachregeln und formatiert SMTP-Nachrichten; drei Teams ändern ihn aus verschiedenen Gründen. Welches Problem ist am deutlichsten?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „SOLID in der Praxis“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Mehrere Verantwortlichkeiten verletzen das Single-Responsibility-Ziel.\"},{\"label\":\"Begründung\",\"reference\":\"Die unabhängigen Änderungsgründe sprechen für getrennte kohärente Verantwortlichkeiten.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „SOLID in der Praxis“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html\"],\"rationales\":[\"Open/Closed verbietet nicht jede sinnvolle Quellcodeänderung.\",\"Die unabhängigen Änderungsgründe sprechen für getrennte kohärente Verantwortlichkeiten.\",\"Liskov betrifft Ersetzbarkeit, kein pauschales Datenbankverbot.\",\"Interface Segregation ist keine solche projektweite Methodenzahlregel.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#287@2026-11-07-full-v3\",\"lessonId\":\"java-m19-l3\",\"recall\":\"Beantworte „Ein Altmodul besitzt keine Tests und soll strukturell umgebaut werden. Welcher erste Schritt senkt das Risiko gezielt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Code Smells und Refactoring“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Relevantes beobachtbares Verhalten durch Charakterisierungstests festhalten.\"},{\"label\":\"Begründung\",\"reference\":\"Charakterisierungstests schaffen eine überprüfbare Ausgangsbasis für Verhaltenserhaltung.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Code Smells und Refactoring“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://refactoring.com/\"],\"rationales\":[\"Formatierung sichert spätere Semantikänderungen nicht ab.\",\"Entfernte Fehlerbehandlung kann das Verhalten verändern.\",\"Charakterisierungstests schaffen eine überprüfbare Ausgangsbasis für Verhaltenserhaltung.\",\"Beobachtbare Verhaltensänderung ist nicht reines Refactoring.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#288@2026-11-07-full-v3\",\"lessonId\":\"java-m20-l1\",\"recall\":\"Beantworte „Ein Test erwartet bei zwei auf 128 geboxten Integern zwingend a != b. Warum ist der Test fehleranfällig?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Die klassischen Java-Fallen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Er prüft nicht garantierte Cachegrenzen statt fachlicher Wertgleichheit.\"},{\"label\":\"Begründung\",\"reference\":\"Implementierungen dürfen außerhalb des verpflichtenden Bereichs zusätzliche Werte teilen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Die klassischen Java-Fallen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/javase/specs/jls/se25/html/jls-5.html\"],\"rationales\":[\"Zusätzliches Caching ist erlaubt und widerlegt diese Pflicht.\",\"Implementierungen dürfen außerhalb des verpflichtenden Bereichs zusätzliche Werte teilen.\",\"Integer.equals vergleicht den numerischen Wert.\",\"Eine konkrete Konfiguration ersetzt keine portable Spezifikationsgarantie.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#289@2026-11-07-full-v3\",\"lessonId\":\"java-m20-l2\",\"recall\":\"Beantworte „Nach einem Passwortdatenbank-Leak sollen gleiche Passwörter nicht direkt gleiche gespeicherte Werte erkennen lassen. Welche Maßnahme ist notwendig, aber allein nicht ausreichend?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Sicherheitsgrundlagen für Anwendungsentwickler“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Individuelle Salts zusammen mit einem geeigneten Passwort-Hashverfahren.\"},{\"label\":\"Begründung\",\"reference\":\"Individuelle Salts verhindern die einfache Gleichheitszuordnung; ein geeignetes kostspieliges Verfahren bleibt erforderlich.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Sicherheitsgrundlagen für Anwendungsentwickler“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html\",\"https://raw.githubusercontent.com/OWASP/CheatSheetSeries/master/cheatsheets/Password_Storage_Cheat_Sheet.md\"],\"rationales\":[\"Individuelle Salts verhindern die einfache Gleichheitszuordnung; ein geeignetes kostspieliges Verfahren bleibt erforderlich.\",\"Ein gemeinsamer Salt trennt gleiche Passwörter nicht nutzerweise.\",\"MD5 ohne Salt ist für diesen Zweck ungeeignet.\",\"Tabellenreihenfolge schützt keine Passwörter.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#290@2026-11-07-full-v3\",\"lessonId\":\"java-m20-l3\",\"recall\":\"Beantworte „Eine Bibliotheksmethode darf InterruptedException ausdrücklich weitergeben. Muss sie diese erst fangen und immer zusätzlich interrupt aufrufen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Produktionsreife: woran man erwachsenen Code erkennt“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Nein; sie kann die Exception gemäß Vertrag propagieren.\"},{\"label\":\"Begründung\",\"reference\":\"Propagieren ist eine reguläre Strategie; Wiederherstellen ist insbesondere beim Nichtweiterwerfen relevant.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Produktionsreife: woran man erwachsenen Code erkennt“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html\"],\"rationales\":[\"Eine passende throws-Deklaration erlaubt die Propagation.\",\"Das würde den kooperativen Abbruchvertrag unterlaufen.\",\"Dies ignoriert die Unterbrechungsabsicht statt sie an den Aufrufer weiterzugeben.\",\"Propagieren ist eine reguläre Strategie; Wiederherstellen ist insbesondere beim Nichtweiterwerfen relevant.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#291@2026-11-07-full-v3\",\"lessonId\":\"java-m21-l1\",\"recall\":\"Beantworte „Eine Boot-Hauptkonfiguration trägt @SpringBootApplication. Welche Wirkung beschreibt die Annotation selbst?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Was Spring Boot eigentlich löst“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Sie bündelt Boot-Konfiguration, Auto-Konfiguration und Component Scan.\"},{\"label\":\"Begründung\",\"reference\":\"Die zusammengesetzte Annotation kombiniert die zentralen Konfigurationsmechanismen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Was Spring Boot eigentlich löst“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html\"],\"rationales\":[\"Die Annotation beschreibt Konfiguration; tatsächlicher Start und geeignete Abhängigkeiten bleiben nötig.\",\"Die zusammengesetzte Annotation enthält mehr als den Scan.\",\"Die zusammengesetzte Annotation kombiniert die zentralen Konfigurationsmechanismen.\",\"Registrierung und Scan folgen festgelegten Bedingungen und Grenzen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#292@2026-11-07-full-v3\",\"lessonId\":\"java-m21-l2\",\"recall\":\"Beantworte „Eine Klasse bündelt Bestellfachlogik und soll beim Component Scan semantisch als Service erkannt werden. Welche Annotation passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Beans, Injektion und Bean-Scopes“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"@Service.\"},{\"label\":\"Begründung\",\"reference\":\"Service ist ein spezialisiertes Component-Stereotyp für die Serviceschicht.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Beans, Injektion und Bean-Scopes“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html\"],\"rationales\":[\"Dieses Stereotyp kennzeichnet fachlich die Datenzugriffsschicht, nicht die beschriebene Geschäftslogik.\",\"Service ist ein spezialisiertes Component-Stereotyp für die Serviceschicht.\",\"Entity ist eine Persistenzabbildung und nicht das entsprechende Komponentenstereotyp.\",\"Configuration beschreibt die Bereitstellung von Bean-Konfiguration statt diese Fachservice-Rolle.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#293@2026-11-07-full-v3\",\"lessonId\":\"java-m21-l2\",\"recall\":\"Beantworte „Zwei Controller erhalten dieselbe standardmäßig gescopte Service-Bean aus demselben Spring-Container. Was ist die typische Scope-Semantik?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Beans, Injektion und Bean-Scopes“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Eine Instanz pro Bean-Definition in diesem Container.\"},{\"label\":\"Begründung\",\"reference\":\"Der Standardscope ist singleton innerhalb des Containers, nicht eine universelle Prozessgrenze.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Beans, Injektion und Bean-Scopes“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html\"],\"rationales\":[\"Spring-Singleton ist nicht weltweit global.\",\"Requestscope müsste passend festgelegt werden.\",\"Der Standardscope ist singleton innerhalb des Containers, nicht eine universelle Prozessgrenze.\",\"Methodenaufrufe erzeugen keine neue Standardbean.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#294@2026-11-07-full-v3\",\"lessonId\":\"java-m21-l3\",\"recall\":\"Beantworte „Dasselbe Boot-Artefakt soll im Container mit Profil prod starten, ohne neu kompiliert zu werden. Welche Umgebungsvariable passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Konfiguration, Profile und Geheimnisse“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"SPRING_PROFILES_ACTIVE=prod.\"},{\"label\":\"Begründung\",\"reference\":\"Spring bindet die externe Eigenschaft spring.profiles.active über diese Umgebungsvariable.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Konfiguration, Profile und Geheimnisse“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-boot/reference/features/external-config.html\"],\"rationales\":[\"Das setzt das Standardprofil und ist nicht gleichbedeutend mit der expliziten aktiven Profilauswahl.\",\"Spring bindet die externe Eigenschaft spring.profiles.active über diese Umgebungsvariable.\",\"Dies ändert den Konfigurationsbasisnamen statt das aktive Profil zu setzen.\",\"Der angegebene Wert würde nicht das geforderte prod als allein aktives Profil ausdrücken.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#295@2026-11-07-full-v3\",\"lessonId\":\"java-m22-l1\",\"recall\":\"Beantworte „DELETE /bestellungen/42 wurde erfolgreich abgeschlossen; die API sendet keinen Inhalt. Welcher Status passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Controller, Mapping und HTTP richtig nutzen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"204 No Content.\"},{\"label\":\"Begründung\",\"reference\":\"204 signalisiert erfolgreichen Abschluss ohne Antwortinhalt.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Controller, Mapping und HTTP richtig nutzen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://www.rfc-editor.org/rfc/rfc9110.html\"],\"rationales\":[\"204 signalisiert erfolgreichen Abschluss ohne Antwortinhalt.\",\"Das Szenario verlangt keinen Inhalt; 204 drückt den erfolgreichen inhaltslosen Abschluss direkt aus.\",\"Die Löschung ist hier bereits abgeschlossen.\",\"Für den beschriebenen erfolgreichen Löschabschluss ist 204 passend; die Semantik wiederholter Löschversuche ist separat zu gestalten.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#296@2026-11-07-full-v3\",\"lessonId\":\"java-m22-l1\",\"recall\":\"Beantworte „Ein Team gestaltet eine ressourcenorientierte Bestell-API. Welche URI plus Methode ist gegenüber /deleteBestellung sinnvoll?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Controller, Mapping und HTTP richtig nutzen“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"DELETE /bestellungen/42.\"},{\"label\":\"Begründung\",\"reference\":\"Die Ressource wird identifiziert und die Operation über HTTP ausgedrückt; Plural ist eine Konvention, kein Protokollzwang.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Controller, Mapping und HTTP richtig nutzen“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://www.rfc-editor.org/rfc/rfc9110.html\"],\"rationales\":[\"Die konkrete Zielressource ist unklar.\",\"Die Ressource wird identifiziert und die Operation über HTTP ausgedrückt; Plural ist eine Konvention, kein Protokollzwang.\",\"GET soll keine solche Zustandsänderung auslösen.\",\"Die Benennung vermischt Aktion und Ressource ohne Nutzen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#297@2026-11-07-full-v3\",\"lessonId\":\"java-m22-l2\",\"recall\":\"Beantworte „Ein MVC-Handler hat nur @Valid @RequestBody Dto dto, keinen BindingResult und keine zusätzliche Methodenvalidierung. Ein Constraint schlägt fehl. Was ist typisch?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Validierung und zentrale Fehlerbehandlung“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"MethodArgumentNotValidException mit standardmäßigem HTTP-400-Verhalten.\"},{\"label\":\"Begründung\",\"reference\":\"Bei dieser argumentbezogenen Validierung ist diese Exception üblich; andere Signaturen können andere Validierungsausnahmen erzeugen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Validierung und zentrale Fehlerbehandlung“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html\"],\"rationales\":[\"Bei dieser argumentbezogenen Validierung ist diese Exception üblich; andere Signaturen können andere Validierungsausnahmen erzeugen.\",\"Bei der angegebenen aktiven Validierung wird der fehlgeschlagene Constraint nicht als normaler Erfolg behandelt.\",\"Die Frage begrenzt sich auf die argumentbezogene RequestBody-Validierung; andere Signaturen können andere Ausnahmen ergeben.\",\"Ein solcher Parameter wurde gerade ausgeschlossen; der Fehler wird über die Exceptionbehandlung weitergegeben.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#298@2026-11-07-full-v3\",\"lessonId\":\"java-m22-l3\",\"recall\":\"Beantworte „Eine Fachoperation soll aus REST und einem Scheduler aufrufbar sein. Wo gehören ResponseEntity und HTTP-Statusabbildung in einer geschichteten Architektur hin?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Schichten, DTOs und saubere API-Evolution“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"In den Webadapter einschließlich Controller und Fehlerbehandlung.\"},{\"label\":\"Begründung\",\"reference\":\"HTTP-spezifische Typen bleiben am Transportrand; der Service liefert fachliche Ergebnisse.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Schichten, DTOs und saubere API-Evolution“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html\"],\"rationales\":[\"Die Persistenzschicht sollte nicht den HTTP-Transportvertrag tragen.\",\"Ein Scheduler kann die Fachoperation ohne künstlichen HTTP-Vertrag aufrufen.\",\"Das koppelt den fachlichen Kern unnötig an den Transport.\",\"HTTP-spezifische Typen bleiben am Transportrand; der Service liefert fachliche Ergebnisse.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#299@2026-11-07-full-v3\",\"lessonId\":\"java-m23-l1\",\"recall\":\"Beantworte „Ein Repository deklariert findByStatusOrderByDatumDesc. Welche Voraussetzung erlaubt die Ableitung dieser Abfrage?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Repositories und Query-Methoden“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Die Namen passen zu den Eigenschaften des verwalteten Domänentyps.\"},{\"label\":\"Begründung\",\"reference\":\"Spring Data parst unterstützte Namensbestandteile und Domänenpfade; alternativ kann eine deklarierte Query gelten.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Repositories und Query-Methoden“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html\"],\"rationales\":[\"Er liefert nicht die im Namen formulierten Filter- und Sortierbedingungen.\",\"Spring Data parst eine Ableitungssyntax statt diesen Java-Bezeichner direkt als SQL auszuführen.\",\"Spring Data parst unterstützte Namensbestandteile und Domänenpfade; alternativ kann eine deklarierte Query gelten.\",\"Die abgeleiteten Eigenschaftspfade müssen zum Modell passen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#300@2026-11-07-full-v3\",\"lessonId\":\"java-m23-l2\",\"recall\":\"Beantworte „Eine Überweisung nutzt zwei Repositoryaufrufe, die fachlich gemeinsam gelingen müssen. Wo sollte die gemeinsame Transaktionsgrenze gewöhnlich liegen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „@Transactional und seine Fallstricke“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"An der aufgerufenen Serviceoperation, die beide Schritte zusammenfasst.\"},{\"label\":\"Begründung\",\"reference\":\"Die Serviceoperation beschreibt die fachliche Einheit; der Aufruf muss die konfigurierte Transaktionsinfrastruktur erreichen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „@Transactional und seine Fallstricke“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html\"],\"rationales\":[\"Das garantiert nicht, dass beide Schritte als gemeinsame Einheit gelingen oder scheitern.\",\"Die Serviceoperation beschreibt die fachliche Einheit; der Aufruf muss die konfigurierte Transaktionsinfrastruktur erreichen.\",\"Die Schreiboperationen liegen dann nicht innerhalb dieser Grenze.\",\"Diese private Self-Invocation aktiviert die gewünschte Proxytransaktion nicht.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#301@2026-11-07-full-v3\",\"lessonId\":\"java-m23-l2\",\"recall\":\"Beantworte „Eine private Hilfsmethode trägt @Transactional und wird intern aufgerufen; Spring verwendet normalen Proxy-Modus. Welche präzise Diagnose passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „@Transactional und seine Fallstricke“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Private Methoden werden vom Proxy nicht so interzeptiert; außerdem umgeht der interne Aufruf den Proxy.\"},{\"label\":\"Begründung\",\"reference\":\"Private Sichtbarkeit und Self-Invocation sind hier Grenzen; protected/package-visible Methoden können seit Spring 6 bei Klassenproxies unterstützt werden.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „@Transactional und seine Fallstricke“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html\"],\"rationales\":[\"Die Annotation allein bewirkt keine solche Interzeption.\",\"Private Methoden können DB-Code ausführen, nur die gewünschte Proxyinterzeption fehlt.\",\"Private Sichtbarkeit und Self-Invocation sind hier Grenzen; protected/package-visible Methoden können seit Spring 6 bei Klassenproxies unterstützt werden.\",\"Diese Pauschalisierung ignoriert Klassenproxies und Versionsunterschiede.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#302@2026-11-07-full-v3\",\"lessonId\":\"java-m23-l3\",\"recall\":\"Beantworte „Eine Listenansicht braucht nur ID und Titel aus einer umfangreichen Entity. Welche Aussage zu Projektionen ist angemessen?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Paginierung, Projektionen und N+1 in Spring Data“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Eine passende geschlossene oder DTO-Projektion kann die ausgewählten Daten begrenzen.\"},{\"label\":\"Begründung\",\"reference\":\"Die konkrete Projektionsart und Abfrage bestimmen die Optimierung; verschachtelte offene Formen können Einschränkungen haben.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Paginierung, Projektionen und N+1 in Spring Data“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html\"],\"rationales\":[\"Benötigte Beziehungen können weiterhin Joins und zusätzliche Daten erfordern.\",\"Die konkrete Projektionsart und Abfrage bestimmen die Optimierung; verschachtelte offene Formen können Einschränkungen haben.\",\"Solche Ausdrücke können die Optimierbarkeit der Projektion begrenzen.\",\"Verschachtelung und Joinpfade können mehr Daten laden, als diese Pauschalaussage behauptet.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#303@2026-11-07-full-v3\",\"lessonId\":\"java-m24-l1\",\"recall\":\"Beantworte „Ein Repository besitzt eine eigene JPQL-Abfrage und Entitymapping. Welche fokussierte Prüfung ist passend?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Die Teststrategie einer Spring-Boot-Anwendung“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"DataJpaTest, bei Bedarf mit produktionsnahem Testcontainer.\"},{\"label\":\"Begründung\",\"reference\":\"Ein JPA-Slice prüft Persistenzintegration; Datenbankersetzung und Testkonfiguration sind bewusst festzulegen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Die Teststrategie einer Spring-Boot-Anwendung“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html\"],\"rationales\":[\"Ein JPA-Slice prüft Persistenzintegration; Datenbankersetzung und Testkonfiguration sind bewusst festzulegen.\",\"Der MVC-Slice prüft Mapping und Query nicht.\",\"Damit werden weder JPQL noch Entityabbildung tatsächlich ausgeführt.\",\"Ein solcher Test prüft keine Persistenzintegration.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#304@2026-11-07-full-v3\",\"lessonId\":\"java-m24-l2\",\"recall\":\"Beantworte „Eine API akzeptiert ausschließlich Bearer-Tokens aus einem explizit gesetzten Authorization-Header, keine Cookies oder andere automatisch gesendeten Browsercredentials. Wie ist CSRF-Abschaltung zu bewerten?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Spring Security: Grundlagen absichern“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Nach Prüfung dieses Authentifizierungsmodells kann sie vertretbar sein.\"},{\"label\":\"Begründung\",\"reference\":\"Das Risiko hängt von automatisch angehängten Browsercredentials ab; andere Angriffsflächen bleiben zu prüfen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Spring Security: Grundlagen absichern“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html\"],\"rationales\":[\"Statelessness allein schließt CSRF nicht aus.\",\"Automatisch gesendete Cookies können gerade das Problem darstellen.\",\"CSRF-Schutz und Berechtigungsprüfung lösen verschiedene Aufgaben.\",\"Das Risiko hängt von automatisch angehängten Browsercredentials ab; andere Angriffsflächen bleiben zu prüfen.\"],\"editorialStatus\":\"individually-revised\"},{\"id\":\"x#305@2026-11-07-full-v3\",\"lessonId\":\"java-m24-l3\",\"recall\":\"Beantworte „Ein Dienstprozess ist intern gesund, kann aber wegen einer vorübergehenden notwendigen Abhängigkeit keine Requests bedienen. Welche Zustandsbewertung passt?“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „Actuator, Observability und Produktionsbetrieb“.\",\"criteria\":[{\"label\":\"Fachliche Entscheidung\",\"reference\":\"Liveness kann gesund bleiben, Readiness kann Traffic vorübergehend ablehnen.\"},{\"label\":\"Begründung\",\"reference\":\"Readiness steuert Verkehrsannahme, Liveness die lokale Lebensfähigkeit; externe Readiness-Abhängigkeiten sind bewusst abzuwägen.\"},{\"label\":\"Abgrenzung\",\"reference\":\"Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.\"},{\"label\":\"Anwendung\",\"reference\":\"Formuliere zu „Actuator, Observability und Produktionsbetrieb“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.\"}],\"sources\":[\"https://docs.spring.io/spring-boot/reference/actuator/endpoints.html\"],\"rationales\":[\"Die beiden Ziele unterscheiden sich.\",\"Gemeinsame Abhängigkeiten und Ausfallverhalten erfordern eine bewusste Auswahl statt pauschaler Aufnahme.\",\"Readiness steuert Verkehrsannahme, Liveness die lokale Lebensfähigkeit; externe Readiness-Abhängigkeiten sind bewusst abzuwägen.\",\"Readiness entfernt typischerweise die Instanz aus dem Traffic statt sie selbst neu zu starten.\"],\"editorialStatus\":\"individually-revised\"}]";
var RP_LITERAL_6=JSON.parse(RP_LITERAL_6_text);RP_LITERAL_6_text=null;
var RP_QUIZ_CONTRACTS=RP_LITERAL_6;
var RP_QUIZ_CONTRACT_BY_ID={};
RP_QUIZ_CONTRACTS.forEach(function(c){RP_QUIZ_CONTRACT_BY_ID[c.id]=c;});
var VERSION = '2.4';
var VERSION_DATUM = '2026-10-09';
var DAY = 86400000;
var DIAGRAMME = (function(){
  var n = 0;
  MODULES.forEach(function(m){ m.lessons.forEach(function(l){
    n += (String(l.body || "").match(/<figure class="fig">/g) || []).length;
  }); });
  return n;
})();
function today0(){ var d = new Date(); d.setHours(0,0,0,0); return d.getTime(); }
var state = {
  currentId:'heute',
  /* Felder der spaeteren Ausbaustufen - vollstaendig initialisiert,
     damit kein Zugriff auf undefined laufen kann. */
  notizen:{}, merkzettel:{}, klausuren:[], ueTexte:{},
  kalib:{},        /* 'sicher'|'unsicher'|'geraten' -> {n, r} */
  erklaerungen:{}, /* lessonId -> {text, punkte, treffer, fehlt, tipp, ts} */
  tutorFragen:0, subnetSolved:0, tagesziel:3, pruefungsdatum:'',
  dayCount:null,
  completed:new Set(),
  srs:{},          /* cardId -> {ease, iv, due, reps, lapses} */
  stats:{},        /* cardId -> {right, wrong} */
  exams:[],        /* [{ts, score, total, byPart}] */
  xp:0,
  xpLog:{},        /* einmalige XP-Vergaben */
  badges:{},       /* badgeId -> Zeitstempel */
  streak:{ last:null, count:0, best:0 },
  solved:{},       /* exerciseId -> Zeitstempel */
  tracesDone:[],   /* abgeschlossene Trockendurchläufe */
  cardsToday:{ day:null, n:0 }
};
var db = null;
var STORAGE_KEY = window.RP_BOOT_USER ? 'rootpfad-user-'+window.RP_BOOT_USER.id+'-progress' : 'ap1-expertenpfad-progress-v1';
function srsOf(id){ return state.srs[id] || null; }
function dueCards(){
  var t = today0() + DAY - 1;
  return CARDS.filter(function(c){
    var s = state.srs[c.id];
    return s && s.due <= t;
  });
}
function newCards(){ return CARDS.filter(function(c){ return !state.srs[c.id]; }); }
function rateCard(id, rating){
  var s = state.srs[id] || { ease:2.5, iv:0, due:today0(), reps:0, lapses:0 };
  if(rating === 0){
    s.ease = Math.max(1.3, s.ease - 0.20);
    s.iv = 0; s.lapses++; s.reps = 0;
    s.due = today0();
  } else {
    s.reps++;
    if(rating === 1){ s.ease = Math.max(1.3, s.ease - 0.15); s.iv = s.iv ? Math.max(1, Math.round(s.iv * 1.2)) : 1; }
    else if(rating === 2){ s.iv = s.reps === 1 ? 1 : (s.reps === 2 ? 3 : Math.round(s.iv * s.ease)); }
    else { s.ease = Math.min(3.2, s.ease + 0.15); s.iv = s.reps === 1 ? 3 : Math.round(s.iv * s.ease * 1.3); }
    s.iv = Math.min(s.iv, 365);
    s.due = today0() + s.iv * DAY;
  }
  s.ts = Date.now();
  state.srs[id] = s;
  saveProgress();
}
function recordAnswer(id, correct){
  var st = state.stats[id] || { right:0, wrong:0 };
  if(correct){ st.right++; } else { st.wrong++; }
  state.stats[id] = st;
}
function weakModules(){
  var agg = {};
  CARDS.forEach(function(c){
    var st = state.stats[c.id];
    if(!st) return;
    var a = agg[c.moduleTitle] || (agg[c.moduleTitle] = { right:0, wrong:0, lessonId:c.lessonId });
    a.right += st.right; a.wrong += st.wrong;
  });
  return Object.keys(agg).map(function(k){
    var a = agg[k], tot = a.right + a.wrong;
    return { title:k, rate: tot ? a.right / tot : 1, total:tot, lessonId:a.lessonId };
  }).filter(function(x){ return x.total >= 2 && x.rate < 0.8; })
    .sort(function(a,b){ return a.rate - b.rate; });
}
var RANKS = [
  { lvl:1,  name:'Kabelträger',                  xp:0,     icon:'🔌' },
  { lvl:2,  name:'Strg-C-Virtuose',              xp:150,   icon:'📋' },
  { lvl:3,  name:'Ticket-Bändiger',              xp:400,   icon:'🎟️' },
  { lvl:4,  name:'Der mit dem Subnetz tanzt',    xp:850,   icon:'🕺' },
  { lvl:5,  name:'Netzplan-Flüsterer',           xp:1500,  icon:'🧭' },
  { lvl:6,  name:'Normalform-Fanatiker',         xp:2400,  icon:'📐' },
  { lvl:7,  name:'Wandelnder Prüfungskatalog',   xp:3600,  icon:'📚' },
  { lvl:8,  name:'Schrecken aller Prüfer',       xp:5200,  icon:'👑' },
  { lvl:9,  name:'Halbgott in Ethernet',         xp:7200,  icon:'⚡' },
  { lvl:10, name:'Legende der Berufsschule',     xp:9800,  icon:'💎' },
  { lvl:11, name:'Flüsterer der Fremdschlüssel',xp:12800, icon:'🗝️' },
  { lvl:12, name:'Herr der Ringpuffer',          xp:16400, icon:'🌀' },
  { lvl:13, name:'Pate der Patchfelder',         xp:20600, icon:'🧶' },
  { lvl:14, name:'Kanzler der Kapselung',        xp:25500, icon:'🏛️' },
  { lvl:15, name:'Sensei der Struktogramme',     xp:31200, icon:'🥋' },
  { lvl:16, name:'Doktor der Datenschutzgrundverordnung', xp:37800, icon:'⚖️' },
  { lvl:17, name:'Magier des magischen Dreiecks',xp:45400, icon:'🔮' },
  { lvl:18, name:'Baron von Bit und Byte',       xp:54100, icon:'🧩' },
  { lvl:19, name:'Großmeister der Grauzone',     xp:64000, icon:'🧙' },
  { lvl:20, name:'Ehrenfachinformatiker',        xp:75000, icon:'🌟' }
];
function rankFor(xp){
  var r = RANKS[0];
  for(var i = 0; i < RANKS.length; i++){ if(xp >= RANKS[i].xp) r = RANKS[i]; }
  return r;
}
function nextRank(xp){
  for(var i = 0; i < RANKS.length; i++){ if(xp < RANKS[i].xp) return RANKS[i]; }
  return null;
}
function levelProgress(){
  var xp = state.xp || 0, cur = rankFor(xp), nxt = nextRank(xp);
  if(!nxt) return { cur:cur, nxt:null, pct:100, need:0 };
  var span = nxt.xp - cur.xp;
  return { cur:cur, nxt:nxt, pct: Math.round(((xp - cur.xp) / span) * 100), need: nxt.xp - xp };
}
var BADGES = [
  { id:'klausur_bestanden', icon:'✍️', name:'Mitgeschrieben',      desc:'Eine Mitschreib-Prüfung mit mindestens 50 Prozent bestanden.' },
  { id:'klausur_glanz',     icon:'🏵️', name:'Korrektor sprachlos', desc:'Eine Mitschreib-Prüfung mit mindestens 90 Prozent.' },
  { id:'netzwerker',  icon:'🌐', name:'Netzwerker',           desc:'Netzwerkgrundlagen komplett. Du weißt jetzt, warum es zwei Adressen braucht.' },
  { id:'objektifiziert',icon:'🧱', name:'Objektifiziert',       desc:'Objektorientierung komplett. Klasse ist nicht gleich Objekt — und du weißt es.' },
  { id:'datenschuetzer',icon:'🛡️', name:'Datenschützer',        desc:'Datenschutz und Datensicherheit komplett. Art. 22 sitzt.' },
  { id:'kapselkoenig',icon:'🧬', name:'König der Kapselung',  desc:'Alle Fragen zur Objektorientierung fehlerfrei beantwortet.' },
  { id:'quizmeister', icon:'🎯', name:'Quizmeister',          desc:'100 Quizfragen richtig beantwortet.' },
  { id:'quizlegende', icon:'🎖️', name:'Quizlegende',          desc:'250 Quizfragen richtig beantwortet. Respekt.' },
  { id:'tutor_fan',   icon:'💬', name:'Fragensteller',        desc:'Den AP1-Tutor zum ersten Mal befragt.' },
  { id:'tutor_profi', icon:'🧠', name:'Dauergast beim Tutor', desc:'25 Fragen an den AP1-Tutor gestellt.' },
  { id:'marathon',    icon:'🏅', name:'Marathonläufer',       desc:'25 Lektionen an einem einzigen Tag. Das war viel.' },
  { id:'allrounder',  icon:'🧿', name:'Allrounder',           desc:'In allen neun Kursteilen mindestens ein Modul abgeschlossen.' },
  { id:'night_owl',   icon:'🦉', name:'Nachteule',            desc:'Zwischen 0 und 5 Uhr eine Lektion abgeschlossen. Schlaf wird überschätzt.' },
  { id:'early_bird',  icon:'🐓', name:'Der frühe Vogel',      desc:'Vor 6 Uhr gelernt. Respekt.' },
  { id:'weekend',     icon:'🏖️', name:'Wochenendkrieger',     desc:'Am Samstag oder Sonntag gelernt, statt zu leben.' },
  { id:'sitzfleisch', icon:'🪑', name:'Sitzfleisch',          desc:'10 Lektionen an einem einzigen Tag. Steh mal auf.' },
  { id:'subnet50',    icon:'🎪', name:'Subnetz-Dompteur',     desc:'50 Subnetting-Aufgaben richtig. /26 hat jetzt Angst vor dir.' },
  { id:'subnet_serie',icon:'🔥', name:'Auf der Rolle',        desc:'10 Subnetting-Aufgaben am Stück ohne Fehler.' },
  { id:'kabelsalat',  icon:'🧶', name:'Kabelsalat entwirrt',  desc:'Die komplette Netzwerktechnik durchgearbeitet.' },
  { id:'paragraph',   icon:'⚖️', name:'Paragraphenreiter',    desc:'IT-Sicherheit und Datenschutz komplett. Die DSGVO ist stolz.' },
  { id:'erbsenzaehler',icon:'🪙', name:'Erbsenzähler',        desc:'Projektmanagement und Wirtschaft komplett. Skonto vom Zieleinkaufspreis, immer.' },
  { id:'maschinist',  icon:'🤖', name:'Maschinenversteher',   desc:'Den kompletten KI-Teil geschafft. Ganz ohne Halluzination.' },
  { id:'schrauber',   icon:'🔧', name:'Schrauber',            desc:'Hardware und Arbeitsplatz komplett. Du weißt jetzt, was VA sind.' },
  { id:'dickkopf',    icon:'🪨', name:'Dickkopf',             desc:'Eine Karte dreimal verhauen und trotzdem nicht aufgegeben.' },
  { id:'phoenix',     icon:'🦩', name:'Phönix',              desc:'Nach einer verhauenen Prüfung direkt eine bestanden.' },
  { id:'nervenstark', icon:'🧊', name:'Nervenstark',          desc:'Eine Prüfung in der letzten Minute noch bestanden.' },
  { id:'streber',     icon:'👓', name:'Streber',              desc:'30 Tage in Folge gelernt. Deine Freunde vermissen dich.' },
  { id:'komplettist', icon:'🧹', name:'Komplettist',          desc:'Jede einzelne Auszeichnung vor dieser hier geholt.' },
  { id:'first_lesson', icon:'📗', name:'Erster Schritt',      desc:'Eine Lektion abgeschlossen.' },
  { id:'first_trace',  icon:'⚡', name:'Trockenschwimmer',    desc:'Einen Algorithmus komplett durchgespielt.' },
  { id:'all_traces',   icon:'🔬', name:'Spurenleser',         desc:'Alle Trockendurchläufe gemeistert.' },
  { id:'exam_pass',    icon:'🎯', name:'Bestanden',           desc:'Eine Prüfung mit mindestens 70 %.' },
  { id:'exam_ace',     icon:'🏆', name:'Glanzleistung',       desc:'Eine Prüfung mit mindestens 90 %.' },
  { id:'exam_perfect', icon:'💯', name:'Fehlerfrei',          desc:'Eine Prüfung ohne einen einzigen Fehler.' },
  { id:'streak3',      icon:'🔥', name:'Dranbleiber',         desc:'3 Tage in Folge gelernt.' },
  { id:'streak7',      icon:'🌟', name:'Gewohnheitstier',     desc:'7 Tage in Folge gelernt.' },
  { id:'cards25',      icon:'🧠', name:'Gedächtnistraining',  desc:'25 Karten an einem Tag wiederholt.' },
  { id:'module_done',  icon:'📦', name:'Modul im Kasten',     desc:'Ein komplettes Modul abgeschlossen.' },
  { id:'part1_done',   icon:'🎓', name:'AP1-bereit',          desc:'Alle Module aus Teil I abgeschlossen.' },
  { id:'subnet10',     icon:'🧮', name:'Subnetz-Rechner',     desc:'10 Subnetting-Aufgaben richtig geloest.' },
  { id:'solver5',      icon:'🧪', name:'Praktiker',           desc:'5 Übungsaufgaben als gelöst markiert.' },
  { id:'half_way',     icon:'⛰️', name:'Halbzeit',            desc:'Die Hälfte aller Lektionen geschafft.' },
  { id:'all_lessons',  icon:'💎', name:'Durchgearbeitet',     desc:'Alle Lektionen abgeschlossen.' },
  { id:'explorer',     icon:'🧭', name:'Kundschafter',        desc:'In jedem Kursteil mindestens eine Lektion begonnen.' },
  { id:'deep_work',    icon:'📚', name:'Zehnerpack',          desc:'10 Lektionen abgeschlossen.' },
  { id:'xp1000',       icon:'⭐', name:'Tausender',           desc:'1.000 XP gesammelt.' },
  { id:'xp3000',       icon:'✨', name:'Dreitausender',       desc:'3.000 XP gesammelt.' },
  { id:'streak14',     icon:'📅', name:'Zwei Wochen am Stück',desc:'14 Tage in Folge gelernt.' },
  { id:'cards50',      icon:'🏃', name:'Karten-Marathon',     desc:'50 Karten an einem Tag wiederholt.' },
  { id:'comeback',     icon:'🔁', name:'Ausgebügelt',         desc:'Eine zuvor falsch beantwortete Karte sicher gewusst.' },
  { id:'speedster',    icon:'⚡', name:'Souverän',            desc:'Prüfung bestanden mit mehr als der Hälfte der Zeit übrig.' },
  { id:'all_exercises',icon:'🛠️', name:'Alles gelöst',        desc:'Alle Übungsaufgaben als gelöst markiert.' },
  { id:'expert_solver',icon:'🧠', name:'Expertenstufe',       desc:'Alle Aufgaben der Stufe „Experte" gelöst.' },
  { id:'all_parts',    icon:'🏅', name:'Vollständig',         desc:'Alle Kursteile vollständig abgeschlossen.' }
];
var BADGE_BY_ID = {};
BADGES.forEach(function(b){ BADGE_BY_ID[b.id] = b; });
function todayKey(){
  var d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function bumpStreak(){
  var t = todayKey();
  var s = state.streak;
  if(s.last === t) return;
  var y = new Date(); y.setDate(y.getDate() - 1);
  var yKey = y.getFullYear()+'-'+String(y.getMonth()+1).padStart(2,'0')+'-'+String(y.getDate()).padStart(2,'0');
  s.count = (s.last === yKey) ? s.count + 1 : 1;
  s.last = t;
  s.best = Math.max(s.best || 0, s.count);
  if(s.count >= 3) grantBadge('streak3');
  if(s.count >= 7) grantBadge('streak7');
  if(s.count >= 14) grantBadge('streak14');
  if(s.count >= 30) grantBadge('streber');
}
var toastQueue = [];
function showToast(html, cls){
  var host = document.getElementById('toastHost');
  if(!host) return;
  var el = document.createElement('div');
  el.className = 'toast' + (cls ? ' ' + cls : '');
  el.innerHTML = html;
  host.appendChild(el);
  setTimeout(function(){ el.classList.add('out'); }, 2600);
  setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 3100);
}
var XP_FAKTOR = 2;
function xpAnzeige(basis){ return basis * XP_FAKTOR; }
function awardXp(amount, reason, once){
  if(once){
    if(state.xpLog[once]) return 0;
    state.xpLog[once] = 1;
  }
  amount = xpAnzeige(amount);
  var before = rankFor(state.xp || 0).lvl;
  state.xp = (state.xp || 0) + amount;
  bumpStreak();
  var after = rankFor(state.xp).lvl;
  showToast('<span class="t-xp">+'+amount+' XP</span><span class="t-reason">'+esc(reason)+'</span>');
  if(state.xp >= 1000) grantBadge('xp1000');
  if(state.xp >= 3000) grantBadge('xp3000');
  if(after > before) celebrateLevel(rankFor(state.xp));
  updateXpBar();
  saveProgress();
  return amount;
}
function grantBadge(id){
  if(state.badges[id]) return;
  var b = BADGE_BY_ID[id];
  if(!b) return;
  state.badges[id] = Date.now();
  showToast('<span class="t-xp">'+b.icon+' Abzeichen</span><span class="t-reason">'+esc(b.name)+'</span>', 'badge');
  state.xp = (state.xp || 0) + xpAnzeige(25);
  updateXpBar();
  saveProgress();
}
function fokusElemente(wurzel){
  var sel = 'a[href], button:not([disabled]), input:not([disabled]), '+
            'textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.prototype.slice.call(wurzel.querySelectorAll(sel)).filter(function(el){
    return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
  });
}
function fokusFalle(wurzel, ev){
  if(ev.key !== 'Tab') return false;
  var f = fokusElemente(wurzel);
  if(!f.length) return false;
  var erst = f[0], letzt = f[f.length - 1];
  if(ev.shiftKey && document.activeElement === erst){ ev.preventDefault(); letzt.focus(); return true; }
  if(!ev.shiftKey && document.activeElement === letzt){ ev.preventDefault(); erst.focus(); return true; }
  return false;
}
function celebrateLevel(rank){
  var host = document.getElementById('toastHost');
  if(!host) return;
  var vorher = document.activeElement;
  var el = document.createElement('div');
  el.className = 'levelup';
  el.innerHTML = '<div class="lu-card" role="dialog" aria-modal="true" aria-label="Aufgestiegen">'+
    '<div class="lu-icon" aria-hidden="true">'+rank.icon+'</div>'+
    '<div class="lu-lbl">Aufgestiegen</div>'+
    '<div class="lu-name">'+esc(rank.name)+'</div>'+
    '<div class="lu-stufe">Level '+rank.lvl+' von '+RANKS.length+'</div>'+
    '<button class="check-btn" id="luWeiter" type="button">Weiter</button></div>';
  function luSchliessen(){
    el.remove();
    try{ if(vorher && vorher.focus) vorher.focus(); }catch(e){}
  }
  el.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape'){ ev.preventDefault(); luSchliessen(); return; }
    fokusFalle(el, ev);
  });
  host.appendChild(el);
  var weiter = el.querySelector('#luWeiter');
  if(weiter){ weiter.onclick = luSchliessen; weiter.focus(); }
}
function countLessonToday(){
  var heute = todayKey();
  if(!state.dayCount || state.dayCount.day !== heute) state.dayCount = { day:heute, n:0 };
  state.dayCount.n++;
}
function checkMilestones(){
  if(state.completed.size >= 1) grantBadge('first_lesson');
  if(state.completed.size >= Math.ceil(TOTAL / 2)) grantBadge('half_way');
  if(state.completed.size >= TOTAL) grantBadge('all_lessons');
  var anyModule = MODULES.some(function(m){
    return m.lessons.every(function(l){ return state.completed.has(l.id); });
  });
  if(anyModule) grantBadge('module_done');
  var part1 = MODULES.filter(function(m){ return m.part === 1; });
  if(part1.every(function(m){ return m.lessons.every(function(l){ return state.completed.has(l.id); }); })) grantBadge('part1_done');
  var nSolved = Object.keys(state.solved || {}).length;
  if(nSolved >= 5) grantBadge('solver5');
  if(nSolved >= EXERCISES.length) grantBadge('all_exercises');
  var experts = EXERCISES.filter(function(e){ return e.level === 3; });
  if(experts.length && experts.every(function(e){ return state.solved[e.id]; })) grantBadge('expert_solver');
  if((state.tracesDone || []).length >= 1) grantBadge('first_trace');
  if((state.tracesDone || []).length >= TRACES.length) grantBadge('all_traces');
  if(state.completed.size >= 10) grantBadge('deep_work');
  /* In jedem Kursteil mindestens eine Lektion begonnen */
  var touchedAll = PARTS.every(function(p){
    return MODULES.filter(function(m){ return m.part === p; })
      .some(function(m){ return m.lessons.some(function(l){ return state.completed.has(l.id); }); });
  });
  if(touchedAll) grantBadge('explorer');
  var allParts = PARTS.every(function(p){
    return MODULES.filter(function(m){ return m.part === p; })
      .every(function(m){ return m.lessons.every(function(l){ return state.completed.has(l.id); }); });
  });
  if(allParts) grantBadge('all_parts');

  /* Teilbezogene Auszeichnungen */
  var teilFertig = function(p){
    var mods = MODULES.filter(function(m){ return m.part === p; });
    return mods.length > 0 && mods.every(function(m){
      return m.lessons.every(function(l){ return state.completed.has(l.id); }); });
  };
  if(teilFertig(4)) grantBadge('kabelsalat');
  if(teilFertig(5)) grantBadge('paragraph');
  if(teilFertig(6)) grantBadge('erbsenzaehler');
  if(teilFertig(7)) grantBadge('schrauber');
  if(teilFertig(9)) grantBadge('maschinist');

  /* Auszeichnungen fuer die neuen Themenmodule */
  var modFertig = function(id){
    var mm = MODULES.filter(function(x){ return x.id === id; })[0];
    return !!mm && mm.lessons.every(function(l){ return state.completed.has(l.id); });
  };
  if(modFertig('m31')) grantBadge('netzwerker');
  if(modFertig('m34') && modFertig('m35')) grantBadge('objektifiziert');
  if(modFertig('m32') && modFertig('m33')) grantBadge('datenschuetzer');

  /* In jedem Kursteil mindestens ein Modul vollstaendig */
  var rund = PARTS.every(function(pt){
    return MODULES.filter(function(mm){ return mm.part === pt; })
      .some(function(mm){ return mm.lessons.every(function(l){ return state.completed.has(l.id); }); });
  });
  if(rund) grantBadge('allrounder');

  /* Richtig beantwortete Fragen zaehlen */
  var richtig = 0;
  Object.keys(state.stats || {}).forEach(function(k){ richtig += (state.stats[k].right || 0); });
  if(richtig >= 100) grantBadge('quizmeister');
  if(richtig >= 250) grantBadge('quizlegende');

  /* Alle Fragen der OOP-Module fehlerfrei */
  var oopIds = [];
  MODULES.filter(function(mm){ return mm.id === 'm34' || mm.id === 'm35'; })
    .forEach(function(mm){ mm.lessons.forEach(function(l){
      (l.quiz || []).forEach(function(q, qi){ oopIds.push(l.id + '#' + qi); }); }); });
  if(oopIds.length && oopIds.every(function(id){
       var st = state.stats[id]; return st && st.right > 0 && !st.wrong; })) grantBadge('kapselkoenig');

  if(state.dayCount && state.dayCount.n >= 25) grantBadge('marathon');

  /* Tageszeit und Wochentag - kleine Belohnung fuer ungewoehnliche Lernzeiten */
  var jetzt = new Date(), std = jetzt.getHours(), tag = jetzt.getDay();
  if(std < 5) grantBadge('night_owl');
  else if(std < 6) grantBadge('early_bird');
  if(tag === 0 || tag === 6) grantBadge('weekend');

  /* Tagespensum */
  var heute = todayKey();
  if(!state.dayCount || state.dayCount.day !== heute) state.dayCount = { day:heute, n:0 };
  if(state.dayCount.n >= 10) grantBadge('sitzfleisch');

  /* Komplettist zum Schluss: alle anderen Auszeichnungen vorhanden */
  var offen = BADGES.filter(function(b){ return b.id !== 'komplettist' && !state.badges[b.id]; });
  if(offen.length === 0) grantBadge('komplettist');
}
function updateXpBar(){
  var lp = levelProgress();
  var chip = document.getElementById('lvlChip');
  if(chip){
    chip.innerHTML = '<span class="lc-icon">'+lp.cur.icon+'</span><span class="lc-lvl">Lv '+lp.cur.lvl+'</span>'+
                     '<span class="lc-name">'+esc(lp.cur.name)+'</span>';
    chip.setAttribute('aria-label', 'Lv '+lp.cur.lvl+' '+lp.cur.name+', Profil und Abzeichen öffnen');
    chip.title = lp.nxt ? ('Noch ' + lp.need + ' XP bis „' + lp.nxt.name + '"') : 'Höchster Rang erreicht';
  }
  var bar = document.getElementById('xpFill');
  if(bar) bar.style.width = lp.pct + '%';
  var lab = document.getElementById('xpLabel');
  if(lab) lab.textContent = (state.xp || 0) + ' XP';
  var st = document.getElementById('streakChip');
  if(st){
    var c = state.streak.count || 0;
    st.hidden = c < 1;
    st.textContent = '🔥 ' + c;
    st.title = c + ' Tag(e) in Folge · Bestwert: ' + (state.streak.best || c);
  }
}
function lessonById(id){ return FLAT.find(function(l){ return l.id===id; }); }
function moduleOfLesson(id){ return MODULES.find(function(m){ return m.lessons.some(function(l){ return l.id===id; }); }); }
function serialize(){
  return {
    completed: Array.from(state.completed),
    srs: state.srs,
    stats: state.stats,
    exams: state.exams.slice(-20),
    xp: state.xp || 0,
    xpLog: state.xpLog,
    badges: state.badges,
    streak: state.streak,
    solved: state.solved,
    tracesDone: state.tracesDone,
    cardsToday: state.cardsToday,
    subnetSolved: state.subnetSolved || 0,
    dayCount: state.dayCount || null,
    tutorFragen: state.tutorFragen || 0,
    pruefungsdatum: state.pruefungsdatum || '',
    tagesziel: state.tagesziel || 3,
    notizen: state.notizen || {},
    ueTexte: state.ueTexte || {},
    merkzettel: state.merkzettel || {},
    klausuren: (state.klausuren || []).slice(-20),
    kalib: state.kalib || {},
    erklaerungen: state.erklaerungen || {},
    learning: state.learning || { events:{}, missions:{} },
    competencies: state.competencies || {submissions:{},variants:{},feedback:{}},
    updatedAt: Date.now()
  };
}
function mergeIn(data){
  if(!data) return;
  if(data.competencies&&typeof data.competencies==='object'){
    state.competencies=state.competencies||{submissions:{},variants:{},feedback:{}};
    ['submissions','variants','feedback'].forEach(function(kind){Object.keys(data.competencies[kind]||{}).forEach(function(key){var incoming=data.competencies[kind][key],mine=state.competencies[kind][key];if(incoming&&(!mine||(incoming.ts||0)>=(mine.ts||0)))state.competencies[kind][key]=incoming;});});
  }
  if(data.learning && typeof data.learning === 'object'){
    state.learning = state.learning || {events:{},missions:{}};
    Object.assign(state.learning.events, data.learning.events || {});
    Object.keys(data.learning.missions || {}).forEach(function(key){
      var incoming = data.learning.missions[key], mine = state.learning.missions[key];
      if(incoming && (!mine || incoming.ts > mine.ts)) state.learning.missions[key] = incoming;
    });
  }
  if(Array.isArray(data.completed)) data.completed.forEach(function(id){ state.completed.add(id); });
  if(data.srs && typeof data.srs === 'object'){
    Object.keys(data.srs).forEach(function(k){
      var incoming = data.srs[k], mine = state.srs[k];
      if(!mine || (incoming.ts || 0) > (mine.ts || 0)) state.srs[k] = incoming;
    });
  }
  if(data.stats && typeof data.stats === 'object'){
    Object.keys(data.stats).forEach(function(k){
      var inc = data.stats[k], mine = state.stats[k];
      if(!mine){ state.stats[k] = inc; }
      else { state.stats[k] = { right: Math.max(mine.right, inc.right||0), wrong: Math.max(mine.wrong, inc.wrong||0) }; }
    });
  }
  if(Array.isArray(data.exams)){
    var seen = {};
    state.exams.concat(data.exams).forEach(function(e){ if(e && e.ts) seen[e.ts] = e; });
    state.exams = Object.keys(seen).map(function(k){ return seen[k]; })
                    .sort(function(a,b){ return a.ts - b.ts; }).slice(-20);
  }
  /* Spielstand: immer der höhere/vollständigere Wert gewinnt */
  if(typeof data.xp === 'number') state.xp = Math.max(state.xp || 0, data.xp);
  if(typeof data.subnetSolved === 'number') state.subnetSolved = Math.max(state.subnetSolved || 0, data.subnetSolved);
  if(typeof data.tutorFragen === 'number') state.tutorFragen = Math.max(state.tutorFragen || 0, data.tutorFragen);
  if(data.pruefungsdatum && !state.pruefungsdatum) state.pruefungsdatum = data.pruefungsdatum;
  if(typeof data.tagesziel === 'number') state.tagesziel = data.tagesziel;
  if(data.notizen && typeof data.notizen === 'object'){
    state.notizen = state.notizen || {};
    Object.keys(data.notizen).forEach(function(k){ if(!state.notizen[k]) state.notizen[k] = data.notizen[k]; });
  }
  if(data.ueTexte && typeof data.ueTexte === 'object'){
    state.ueTexte = state.ueTexte || {};
    Object.keys(data.ueTexte).forEach(function(k){ if(!state.ueTexte[k]) state.ueTexte[k] = data.ueTexte[k]; });
  }
  if(Array.isArray(data.klausuren)){
    var bekannt = {};
    (state.klausuren || []).forEach(function(k){ bekannt[k.ts] = 1; });
    state.klausuren = (state.klausuren || []).concat(
      data.klausuren.filter(function(k){ return !bekannt[k.ts]; })
    ).sort(function(a,b){ return a.ts - b.ts; }).slice(-20);
  }
  /* Kalibrierung: je Stufe gewinnt der vollstaendigere Zaehler. Addieren
     wuerde beim Abgleich zweier Geraete doppelt zaehlen. */
  if(data.kalib && typeof data.kalib === 'object'){
    state.kalib = state.kalib || {};
    Object.keys(data.kalib).forEach(function(k){
      var inc = data.kalib[k] || {}, mine = state.kalib[k];
      if(!mine || (inc.n || 0) > (mine.n || 0)) state.kalib[k] = { n:inc.n||0, r:inc.r||0 };
    });
  }
  if(data.erklaerungen && typeof data.erklaerungen === 'object'){
    state.erklaerungen = state.erklaerungen || {};
    Object.keys(data.erklaerungen).forEach(function(k){
      var inc = data.erklaerungen[k], mine = state.erklaerungen[k];
      if(!mine || (inc.ts || 0) > (mine.ts || 0)) state.erklaerungen[k] = inc;
    });
  }
  if(data.merkzettel && typeof data.merkzettel === 'object'){
    state.merkzettel = state.merkzettel || {};
    Object.keys(data.merkzettel).forEach(function(k){ if(!state.merkzettel[k]) state.merkzettel[k] = data.merkzettel[k]; });
  }
  if(data.dayCount && data.dayCount.day === todayKey()){
    if(!state.dayCount || state.dayCount.day !== todayKey()) state.dayCount = { day:todayKey(), n:0 };
    state.dayCount.n = Math.max(state.dayCount.n, data.dayCount.n || 0);
  }
  if(data.xpLog) Object.keys(data.xpLog).forEach(function(k){ state.xpLog[k] = 1; });
  if(data.badges) Object.keys(data.badges).forEach(function(k){
    if(!state.badges[k]) state.badges[k] = data.badges[k];
  });
  if(data.solved) Object.keys(data.solved).forEach(function(k){
    if(!state.solved[k]) state.solved[k] = data.solved[k];
  });
  if(Array.isArray(data.tracesDone)) data.tracesDone.forEach(function(t){
    if(state.tracesDone.indexOf(t) === -1) state.tracesDone.push(t);
  });
  if(data.streak && (data.streak.count || 0) >= 0){
    var mine = state.streak || { count:0, best:0, last:null };
    state.streak = ((data.streak.last || '') > (mine.last || '')) ? data.streak : mine;
    state.streak.best = Math.max(mine.best || 0, data.streak.best || 0);
  }
  if(data.cardsToday && data.cardsToday.day === todayKey()){
    if(!state.cardsToday || state.cardsToday.day !== todayKey()) state.cardsToday = data.cardsToday;
    else state.cardsToday.n = Math.max(state.cardsToday.n, data.cardsToday.n);
  }
}
function loadLocal(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    if(raw) mergeIn(JSON.parse(raw));
  }catch(e){}
}
var speicherGewarnt = false;
function saveLocal(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize()));
    speicherGewarnt = false;
  }catch(e){
    if(speicherGewarnt) return;
    speicherGewarnt = true;
    var voll = e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014);
    zeigeBanner('Dein Fortschritt wird nicht gespeichert.',
      voll
        ? 'Der Speicher dieses Browsers ist voll. Sichere deinen Stand im Profil ueber die '+
          'Zwischenablage und gib dort Platz frei, sonst geht die heutige Arbeit verloren.'
        : 'Dieser Browser erlaubt kein Speichern, etwa im privaten Fenster. Alles bleibt nur, '+
          'solange der Tab offen ist. Sichere deinen Stand im Profil ueber die Zwischenablage.',
      'localStorage: ' + ((e && e.name) || 'nicht verfuegbar'));
  }
}
async function initDb(){
  try{
    if(window.claude && window.claude.use){ db = await window.claude.use('db'); }
  }catch(e){ db = null; }
}
async function loadProgress(){
  loadLocal();
  render();
  await initDb();
  if(db){
    try{
      var snap = await db.doc('progress/state').get();
      if(snap.exists) mergeIn(snap.data());
    }catch(e){}
    render();
    subscribeProgress();
  }
  updateSyncHint();
  saveProgress();
}
var savePending = false;
var dbWriteChain = Promise.resolve();
var dbSyncOff = false;
async function saveProgress(){
  saveLocal();
  updateDueBadge();
  if(!db || dbSyncOff || savePending) return;
  savePending = true;
  setTimeout(function(){
    savePending = false;
    /* Die Kette stellt sicher, dass nie zwei Schreibvorgaenge auf dasselbe
       Dokument ueberlappen - das verlangt der db-Vertrag ausdruecklich. */
    dbWriteChain = dbWriteChain.then(function(){
      return db.doc('progress/state').set(serialize());
    }).catch(function(err){
      if(err && (err.code === 'revoked' || err.code === 'not_granted')) dbSyncOff = true;
    });
  }, 600);
}
var dbUnsub = null;
function subscribeProgress(){
  if(!db || dbUnsub) return;
  try{
    dbUnsub = db.doc('progress/state').onSnapshot(function(snap){
      if(!snap.exists || snap.metadata.hasPendingWrites) return;
      mergeIn(snap.data());
      saveLocal();
      updateXpBar();
      updateDueBadge();
    }, function(err){
      dbUnsub = null;
      if(err && err.code === 'revoked'){ dbSyncOff = true; updateSyncHint(); }
    });
  }catch(e){ dbUnsub = null; }
}
function updateSyncHint(){
  var el = document.getElementById('syncHint');
  if(!el) return;
  var an = db && !dbSyncOff;
  el.textContent = an ? 'Geraeteabgleich aktiv' : 'nur auf diesem Geraet';
  el.className = 'sync-hint' + (an ? ' on' : '');
}
function exportProgress(){
  var payload = { kurs:'ap1-expertenpfad', version:1, exportiert:new Date().toISOString(), daten:serialize() };
  var text = JSON.stringify(payload);
  var ta = document.getElementById('ioArea');
  if(ta){ ta.value = text; ta.hidden = false; ta.select(); }
  try{
    navigator.clipboard.writeText(text).then(function(){
      showToast('<span class="t-xp">Kopiert</span><span class="t-reason">Fortschritt in der Zwischenablage</span>');
    }).catch(function(){
      showToast('<span class="t-xp">Bereit</span><span class="t-reason">Text unten markieren und kopieren</span>');
    });
  }catch(e){}
}
function showImport(){
  var ta = document.getElementById('ioArea');
  if(!ta) return;
  ta.value = ''; ta.hidden = false; ta.placeholder = 'Hier den exportierten Text einfuegen und dann auf Uebernehmen klicken.';
  ta.focus();
  var b = document.getElementById('ioApply'); if(b) b.hidden = false;
}
function applyImport(){
  var ta = document.getElementById('ioArea');
  if(!ta || !ta.value.trim()){ showToast('<span class="t-xp">Leer</span><span class="t-reason">Kein Text eingefuegt</span>'); return; }
  var obj;
  try{ obj = JSON.parse(ta.value); }
  catch(e){ showToast('<span class="t-xp">Fehler</span><span class="t-reason">Das ist kein gueltiger Export</span>'); return; }
  var daten = obj && obj.daten ? obj.daten : obj;
  if(!daten || typeof daten !== 'object' || !('completed' in daten || 'srs' in daten)){
    showToast('<span class="t-xp">Fehler</span><span class="t-reason">Unbekanntes Format</span>'); return;
  }
  mergeIn(daten);            /* additiv: der bisherige Stand bleibt erhalten */
  saveProgress();
  render();
  showToast('<span class="t-xp">Übernommen</span><span class="t-reason">Fortschritt zusammengeführt</span>');
}
function updateDueBadge(){
  var b = document.getElementById('dueBadge');
  if(!b) return;
  var n = dueCards().length;
  b.hidden = n === 0;
  b.textContent = n;
  b.className = 'mastery-pill' + (n > 0 ? ' bad' : '');
}
function toggleComplete(id, checked){
  if(checked){
    state.completed.add(id);
    awardXp(50, 'Lektion abgeschlossen', 'lesson:' + id);
    countLessonToday();
    checkMilestones();
  } else { state.completed.delete(id); }
  saveProgress();
  renderSidebar();
  renderProgressPill();
  renderContent();
}
function selectLesson(id){
  /* Laufende Prüfung nicht stillschweigend verwerfen. */
  if(exam.active && !exam.finished && id !== 'exam'){
    if(!window.confirm('Die laufende Prüfung wird abgebrochen. Fortfahren?')) return;
    stopExamTimer();
    exam.active = false;
  }
  if(klausur.phase === 'laufend' && id !== 'klausur'){
    if(!window.confirm('Die laufende Klausur wird verworfen. Fortfahren?')) return;
    klUhrStoppen(); klausur.phase = 'start';
  }
  if(id !== 'exam') stopExamTimer();
  state.currentId = id;
  weichRendern(render);
  closeDrawer();
  window.scrollTo(0,0);
  updateReadBar();
}
function render(){
  renderSidebar();
  renderMobilbar();
  renderProgressPill();
  updateXpBar();
  renderContent();
}
function renderProgressPill(){
  var completed = typeof rpCompleted === 'function' ? rpCompleted() : state.completed.size;
  var pct = TOTAL ? Math.round((completed/TOTAL)*100) : 0;
  document.getElementById('progressLabel').textContent = completed + '/' + TOTAL;
  document.getElementById('progressFill').style.width = pct + '%';
}
function renderSidebar(){
  var nav = document.getElementById('moduleNav');
  nav.innerHTML = '';
  var currentModule = moduleOfLesson(state.currentId);
  var lastPart = null;
  MODULES.forEach(function(m){
    if(m.part !== lastPart){
      var label = document.createElement('div');
      label.className = 'part-label';
      label.textContent = 'Teil ' + m.part + ' · ' + m.partTitle;
      nav.appendChild(label);
      lastPart = m.part;
    }
    var det = document.createElement('details');
    det.className = 'module';
    if(currentModule && currentModule.id === m.id) det.open = true;
    var doneInModule = m.lessons.filter(function(l){ return state.completed.has(l.id); }).length;
    var sum = document.createElement('summary');
    sum.innerHTML = '<span class="chev">▸</span><span>'+esc(m.title)+'</span><span class="mod-count">'+doneInModule+'/'+m.lessons.length+'</span>';
    det.appendChild(sum);
    m.lessons.forEach(function(l){
      var btn = document.createElement('button');
      var aktiv = state.currentId === l.id;
      btn.className = 'lesson-btn' + (aktiv ? ' active' : '');
      /* Die aktive Lektion nicht nur einfaerben, sondern auch ansagen. */
      if(aktiv) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
      var done = state.completed.has(l.id);
      btn.innerHTML = '<span class="check'+(done?' done':'')+'">'+(done?'✓':'')+'</span><span>'+esc(l.title)+'</span>';
      btn.onclick = function(){ selectLesson(l.id); };
      det.appendChild(btn);
    });
    nav.appendChild(det);
  });

  [['navHeute','heute'],['navIntro','intro'],['navProfile','profile'],['navReview','review'],['navExam','exam'],['navTracer','tracer'],['navKlausur','klausur'],['navSubnet','subnet'],['navTutor','tutor'],
   ['navExercises','exercises'],['navFehler','fehler'],['navMerk','merk'],['navSheet','cheatsheet'],['navGlossar','glossar']].forEach(function(p){
    var b = document.getElementById(p[0]);
    if(!b) return;
    var aktiv = state.currentId === p[1];
    b.className = 'nav-link' + (aktiv ? ' active' : '');
    if(aktiv) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  updateDueBadge();
}
function renderQuiz(lesson){
  if(!lesson.quiz || !lesson.quiz.length) return '';
  var html = '<div class="quiz"><h3>Kurz-Check</h3>';
  lesson.quiz.forEach(function(q, qi){
    html += '<fieldset class="qcard" id="q_'+lesson.id+'_'+qi+'"><legend>'+esc(q.q)+'</legend>';
    q.options.forEach(function(opt, oi){
      html += '<label class="opt"><input type="radio" name="rq_'+lesson.id+'_'+qi+'" value="'+oi+'"> <span>'+esc(opt)+'</span></label>';
    });
    html += '<div class="qfeedback" id="fb_'+lesson.id+'_'+qi+'"></div></fieldset>';
  });
  html += '<button class="check-btn" onclick="checkQuiz(\''+lesson.id+'\')">Antworten prüfen</button>';
  html += '<div class="ex-meta" id="quizNote_'+lesson.id+'" hidden></div></div>';
  return html;
}
function checkQuiz(lessonId){
  var lesson = lessonById(lessonId);
  var answeredAll = true;
  var gain = 0;
  lesson.quiz.forEach(function(q, qi){
    var sel = document.querySelector('input[name="rq_'+lessonId+'_'+qi+'"]:checked');
    var fb = document.getElementById('fb_'+lessonId+'_'+qi);
    if(!sel){
      answeredAll = false;
      fb.className = 'qfeedback show wrong';
      fb.textContent = 'Bitte wähle eine Antwort aus.';
      return;
    }
    var val = parseInt(sel.value, 10);
    var ok = val === q.correct;
    var cardId = rpQuestionId(lesson,qi);
    recordAnswer(cardId, ok);
    /* Antwort aus der Lektion heraus plant die Karte ins Wiederholungssystem ein. */
    if(ok){ if(!state.srs[cardId]) rateCard(cardId, 2); }
    else { rateCard(cardId, 0); }
    if(ok && !state.xpLog['quiz:' + cardId]){ state.xpLog['quiz:' + cardId] = 1; gain += 10; }

    if(ok){
      fb.className = 'qfeedback show correct';
      fb.textContent = '✓ Richtig. ' + q.explain;
    } else {
      fb.className = 'qfeedback show wrong';
      fb.textContent = '✗ Nicht ganz. Richtig ist: „' + q.options[q.correct] + '". ' + q.explain;
    }
  });
  if(gain) awardXp(gain, 'Quizfragen richtig');
  if(answeredAll){
    var note = document.getElementById('quizNote_'+lessonId);
    if(note){
      note.hidden = false;
      note.textContent = 'Diese Fragen sind jetzt im Wiederholungs-Trainer eingeplant — falsch beantwortete kommen heute noch einmal.';
    }
  }
  saveProgress();
  /* Der Lernbegleiter zaehlt die Karten dieser Lektion mit. */
  try{ renderRail(); }catch(e){}
}
function renderLessonBlocks(lesson){
  /* Reihenfolge der Text-/Codeblöcke: pro Lektion überschreibbar. */
  var order = lesson.order || ['body','code','code2','body2','code3','code4'];
  var html = '';
  order.forEach(function(key){
    var val = lesson[key];
    if(!val) return;
    if(key.indexOf('code') === 0){ html += codeBlock(val, lesson[key + 'Lang']); }
    else { html += '<div class="lesson-body">' + val + '</div>'; }
  });
  return html;
}
var exFilter = 0;
var LEVEL_NAMES = { 1:'Einsteiger', 2:'Fortgeschritten', 3:'Experte' };
function setExFilter(lvl){ exFilter = lvl; renderContent(); }
function toggleHint(exId, idx){
  var el = document.getElementById('hint_'+exId+'_'+idx);
  if(el) el.hidden = !el.hidden;
}
function toggleSolution(exId){
  var el = document.getElementById('sol_'+exId);
  if(el) el.hidden = !el.hidden;
}
function togglePrompt(exId){
  var el = document.getElementById('prompt_'+exId);
  if(el) el.hidden = !el.hidden;
}
function toggleSolved(id){
  if(state.solved[id]){ delete state.solved[id]; }
  else {
    state.solved[id] = Date.now();
    awardXp(30, 'Übungsaufgabe gelöst', 'solved:' + id);
    checkMilestones();
  }
  saveProgress();
  renderContent();
}
function copyPrompt(exId){
  var ex = EXERCISES.find(function(e){ return e.id===exId; });
  if(!ex) return;
  var text =
    'Ich bereite mich auf die IHK-Abschlussprüfung Teil 1 als Fachinformatiker Anwendungsentwicklung vor (Level: '+LEVEL_NAMES[ex.level]+', Thema: '+ex.topic+') und habe folgende Prüfungsaufgabe bearbeitet.\n\n'+
    'AUFGABE:\n'+ex.title+' — '+ex.task.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()+'\n\n'+
    'MEINE LÖSUNG:\n[HIER DEINE LÖSUNG EINFÜGEN]\n\n'+
    'Bitte prüfe meine Lösung so, wie ein IHK-Prüfer sie bewerten würde:\n'+
    '1. Ist die Lösung fachlich korrekt? Falls nein: welcher konkrete Fall bricht?\n'+
    '2. Bekäme sie die volle Punktzahl? Fehlt ein Rechenweg, eine Begründung oder eine Einheit?\n'+
    '3. Steckt ein typischer Prüfungsfehler darin (Off-by-one, Faktor 8 zwischen Bit und Byte, MAX statt MIN im Netzplan, Skonto vom Listenpreis)?\n'+
    '4. Ist die Antwort zum Operator der Aufgabe passend formuliert — nennen, beschreiben, begründen oder berechnen?\n'+
    '5. Zeige eine Musterlösung und erkläre jede Abweichung kurz.\n\n'+
    'Sei konkret und ehrlich, keine Gefälligkeitsbewertung. Wenn meine Lösung gut ist, sag das auch.';
  var btn = document.getElementById('cp_'+exId);
  try{
    navigator.clipboard.writeText(text).then(function(){
      if(btn){ var old = btn.textContent; btn.textContent = '✓ Kopiert'; setTimeout(function(){ btn.textContent = old; }, 1600); }
    }).catch(function(){});
  }catch(e){}
}
function renderExercises(){
  var html = '<div class="breadcrumb">Praxis</div><h1>Übungsaufgaben</h1>'+
    '<p class="intro-sub">'+EXERCISES.length+' Prüfungsaufgaben in drei Schwierigkeitsstufen — mit gestaffelten Tipps und vollständiger Musterlösung samt Rechenweg. Unter jeder Aufgabe steht ein Schreibfeld: Trag deine eigene Lösung ein, und Claude korrigiert sie direkt hier — mit Punkten, Teilpunkten auf den Rechenweg und dem, was gefehlt hätte.</p>';

  html += '<div class="filter-row">';
  html += '<button class="filter-btn'+(exFilter===0?' active':'')+'" onclick="setExFilter(0)">Alle ('+EXERCISES.length+')</button>';
  [1,2,3].forEach(function(l){
    var count = EXERCISES.filter(function(e){ return e.level===l; }).length;
    html += '<button class="filter-btn'+(exFilter===l?' active':'')+'" onclick="setExFilter('+l+')">'+LEVEL_NAMES[l]+' ('+count+')</button>';
  });
  html += '</div>';

  var list = exFilter===0 ? EXERCISES : EXERCISES.filter(function(e){ return e.level===exFilter; });

  list.forEach(function(ex){
    html += '<div class="ex-card">';
    var solved = !!state.solved[ex.id];
    html += '<div class="ex-head"><h3 id="exh_'+ex.id+'" data-ok="'+(solved?'1':'0')+'">'+(solved?'<span style="color:var(--success);">✓ </span>':'')+esc(ex.title)+'</h3>'+
      '<span class="badge lvl'+ex.level+'">'+LEVEL_NAMES[ex.level]+'</span>'+
      '<span class="badge topic">'+esc(ex.topic)+'</span></div>';
    html += '<div class="ex-task">'+ex.task+'</div>';

    html += '<div class="ex-actions">';
    html += '<button class="ex-btn'+(solved?'':' primary')+'" id="sv_'+ex.id+'" onclick="toggleSolved(\''+ex.id+'\')">'+
            (solved ? '✓ Gelöst' : 'Als gelöst markieren +'+xpAnzeige(30)+' XP')+'</button>';
    ex.hints.forEach(function(h, i){
      html += '<button class="ex-btn" onclick="toggleHint(\''+ex.id+'\','+i+')">💡 Tipp '+(i+1)+'</button>';
    });
    html += '<button class="ex-btn" onclick="toggleSolution(\''+ex.id+'\')">✅ Lösung anzeigen</button>';
    html += '<button class="ex-btn primary" onclick="ueUmschalten(\''+ex.id+'\')">✍ Lösung schreiben &amp; prüfen lassen</button>';
    html += '</div>';

    ex.hints.forEach(function(h, i){
      html += '<div class="ex-panel hint" id="hint_'+ex.id+'_'+i+'" hidden><div class="hint-label">Tipp '+(i+1)+'</div><p>'+h+'</p></div>';
    });

    html += '<div id="sol_'+ex.id+'" hidden>'+codeBlock(ex.solution, ex.solutionLang)+
      '<div class="ex-panel"><strong>Hinweis zur Lösung:</strong> '+ex.solutionNote+'</div></div>';

    var ueTxt = (state.ueTexte || {})[ex.id] || '';
    var ueOffen = !!ue.offen[ex.id] || !!ueTxt || !!ue.erg[ex.id];
    var ueMax = KL_PUNKTE[ex.level] || 8;
    var ueHtml = ueErgHtml(ex.id);
    html += '<div class="ue" id="ue_'+ex.id+'"'+(ueOffen ? '' : ' hidden')+'>'+
      '<label class="ue-label" for="ueFeld_'+ex.id+'">Deine Lösung — Rechenweg mit Einheiten, Begründungen ausformuliert.</label>'+
      '<textarea class="ue-feld" id="ueFeld_'+ex.id+'" rows="4" spellcheck="false" '+
        'placeholder="Schreib so, wie du es in der Prüfung auf Papier tätest." '+
        'oninput="ueSchreiben(\''+ex.id+'\', this.value)" '+
        'onkeydown="ueTaste(event, \''+ex.id+'\')">'+esc(ueTxt)+'</textarea>'+
      '<div class="ue-leiste">'+
        '<button class="ex-btn primary" id="ueBtn_'+ex.id+'" onclick="uePruefen(\''+ex.id+'\')">Lösung prüfen lassen</button>'+
        '<button class="ex-btn" onclick="ueLeeren(\''+ex.id+'\')">Leeren</button>'+
        '<button class="ex-btn" onclick="togglePrompt(\''+ex.id+'\')">Prüfauftrag für den Chat</button>'+
        '<span class="ue-note" id="ueNote_'+ex.id+'">Strg + Enter prüft · '+ueMax+' Punkte möglich · +'+xpAnzeige(10)+' XP</span>'+
      '</div>'+
      '<div class="ue-erg" id="ueErg_'+ex.id+'"'+(ueHtml ? '' : ' hidden')+'>'+ueHtml+'</div>'+
      '</div>';

    html += '<div class="ex-panel" id="prompt_'+ex.id+'" hidden>'+
      '<p style="margin-bottom:8px;"><strong>So lässt du deine eigene Lösung prüfen:</strong> Kopiere den Prüfauftrag, füge ihn in VS Code in den Claude-Chat ein, ersetze den Platzhalter durch deinen Code — und du bekommst ein ehrliches Review statt nur „richtig/falsch".</p>'+
      '<button class="ex-btn primary" id="cp_'+ex.id+'" onclick="copyPrompt(\''+ex.id+'\')">Prüfauftrag kopieren</button>'+
      '<div class="ex-meta">Enthält: Aufgabenstellung, Platzhalter für deine Lösung und fünf konkrete Prüfkriterien (fachliche Korrektheit, Punktwürdigkeit, typische Prüfungsfehler, Operatorbezug, Musterlösung).</div>'+
      '</div>';

    html += '</div>';
  });

  return html;
}
var ue = { offen:{}, busy:{}, erg:{}, fehler:{}, speichern:null };
function ueUmschalten(exId){
  var box = document.getElementById('ue_' + exId);
  if(!box) return;
  box.hidden = !box.hidden;
  ue.offen[exId] = !box.hidden;
  if(!box.hidden){
    if(!tutor.ready) tutorInit();
    var f = document.getElementById('ueFeld_' + exId);
    if(f) f.focus();
  }
}
function ueSchreiben(exId, wert){
  state.ueTexte = state.ueTexte || {};
  var w = String(wert == null ? '' : wert);
  if(w.trim()) state.ueTexte[exId] = w; else delete state.ueTexte[exId];
  clearTimeout(ue.speichern);
  ue.speichern = setTimeout(saveProgress, 900);
}
function ueTaste(ev, exId){
  if((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter'){ ev.preventDefault(); uePruefen(exId); }
}
function ueLeeren(exId){
  var f = document.getElementById('ueFeld_' + exId);
  if(f){ f.value = ''; f.focus(); }
  ueSchreiben(exId, '');
  delete ue.erg[exId];
  delete ue.fehler[exId];
  ueErgZeichnen(exId);
  var n = document.getElementById('ueNote_' + exId);
  if(n){ n.className = 'ue-note'; n.textContent = 'Strg + Enter prüft · +' + xpAnzeige(10) + ' XP'; }
}
function ueKnopfStand(exId){
  var b = document.getElementById('ueBtn_' + exId);
  if(!b) return;
  b.disabled = !!ue.busy[exId];
  b.textContent = ue.busy[exId] ? 'Claude korrigiert …' : 'Lösung prüfen lassen';
}
function ueErgZeichnen(exId){
  var box = document.getElementById('ueErg_' + exId);
  if(!box) return;
  var h = ueErgHtml(exId);
  box.innerHTML = h;
  box.hidden = !h;
}
function ueErgHtml(exId){
  if(ue.busy[exId]){
    return '<div class="ue-warten"><span class="kl-spinner" aria-hidden="true"></span>'+
           '<span>Claude liest deine Lösung gegen die Musterlösung und vergibt Teilpunkte auf den Rechenweg.</span></div>';
  }
  if(ue.fehler[exId]){
    return '<div class="kl-rueck luecke"><span class="kl-rueck-lbl">Kein Ergebnis</span>'+esc(ue.fehler[exId])+'</div>';
  }
  var r = ue.erg[exId];
  if(!r) return '';
  var q = r.max ? r.punkte / r.max : 0;
  var klasse = q >= 0.8 ? 'gut' : (q >= 0.5 ? 'teils' : 'schwach');
  var h = '<div class="ue-kopf"><span class="ue-punkte '+klasse+'">'+r.punkte+' / '+r.max+' Punkte</span>'+
          (r.urteil ? '<span class="ue-urteil">'+esc(r.urteil)+'</span>' : '')+'</div>';
  if(r.staerken) h += '<div class="kl-rueck gut"><span class="kl-rueck-lbl">Das war richtig</span>'+esc(r.staerken)+'</div>';
  if(r.luecken)  h += '<div class="kl-rueck luecke"><span class="kl-rueck-lbl">Das hat gefehlt</span>'+esc(r.luecken)+'</div>';
  if(r.tipp)     h += '<div class="kl-rueck tipp"><span class="kl-rueck-lbl">Fürs nächste Mal</span>'+esc(r.tipp)+'</div>';
  h += '<div class="ex-meta">Eine Einschätzung, kein amtliches Ergebnis — im Zweifel zählt die Musterlösung. '+
       'Mit „Lösung anzeigen“ vergleichst du selbst.</div>';
  return h;
}
function ueFehlertext(code){
  switch(code){
    case 'not_granted':
    case 'not_declared':
    case 'capability_disabled':
    case 'sampling_disabled':
      return 'Die Prüfung durch Claude ist hier nicht freigegeben. Vergleiche über „Lösung anzeigen“ selbst — '+
             'oder nimm den Prüfauftrag mit in den Chat.';
    case 'rate_limited':
      return 'Gerade zu viele Anfragen. Warte einen Moment und prüfe dann erneut — dein Text bleibt stehen.';
    case 'session_expired':
      return 'Deine Sitzung ist abgelaufen. Melde dich neu an und prüfe noch einmal.';
    case 'prompt_too_large':
      return 'Deine Lösung ist zu lang für eine Bewertung. Kürze sie auf den Rechenweg und das Ergebnis.';
    case 'refused':
      return 'Diese Antwort konnte nicht bewertet werden. Formuliere sie bitte anders.';
    case 'invalid_json':
    case 'empty_completion':
      return 'Die Bewertung kam nicht in verwertbarer Form zurück. Versuch es gleich noch einmal.';
    default:
      return 'Die Prüfung hat nicht geklappt. Versuch es gleich noch einmal — dein Text bleibt stehen.';
  }
}
function ueGeloestAnzeigen(exId){
  var b = document.getElementById('sv_' + exId);
  if(b){ b.className = 'ex-btn'; b.textContent = '✓ Gelöst'; }
  var h = document.getElementById('exh_' + exId);
  if(h && h.getAttribute('data-ok') !== '1'){
    h.setAttribute('data-ok', '1');
    h.insertAdjacentHTML('afterbegin', '<span style="color:var(--success);">✓ </span>');
  }
}
async function uePruefen(exId){
  var ex = EXERCISES.find(function(e){ return e.id === exId; });
  if(!ex || ue.busy[exId]) return;

  var feld = document.getElementById('ueFeld_' + exId);
  var text = (feld ? feld.value : ((state.ueTexte || {})[exId] || '')).trim();
  var note = document.getElementById('ueNote_' + exId);
  if(!text){
    if(note){ note.className = 'ue-note warn'; note.textContent = 'Schreib zuerst etwas ins Feld — ein angefangener Rechenweg reicht.'; }
    if(feld) feld.focus();
    return;
  }
  if(note){ note.className = 'ue-note'; note.textContent = 'Strg + Enter prüft · +' + xpAnzeige(10) + ' XP'; }

  if(!tutor.ready) await tutorInit();
  if(!tutor.fn){
    delete ue.erg[exId];
    ue.fehler[exId] = ueFehlertext('not_granted');
    ueErgZeichnen(exId);
    var p = document.getElementById('prompt_' + exId);
    if(p) p.hidden = false;
    return;
  }

  ue.busy[exId] = true;
  delete ue.erg[exId];
  delete ue.fehler[exId];
  ueKnopfStand(exId);
  ueErgZeichnen(exId);

  var max = KL_PUNKTE[ex.level] || 8;
  var anweisung = [
    'Du bist Korrektor der IHK-Abschlusspruefung Teil 1 im Beruf Fachinformatiker fuer',
    'Anwendungsentwicklung. Bewerte die Loesung eines Prueflings zu EINER Aufgabe.',
    '',
    'BEWERTUNGSREGELN:',
    '- Bewerte streng, aber fair, so wie ein echter Korrektor.',
    '- Der RECHENWEG zaehlt: Teilpunkte fuer richtige Ansaetze, auch wenn das Endergebnis falsch ist.',
    '- Ein richtiges Ergebnis ohne nachvollziehbaren Weg bekommt nicht die volle Punktzahl.',
    '- Einheiten, Rundungen und ausformulierte Begruendungen gehoeren dazu.',
    '- Die Musterloesung ist nicht der einzige Weg: ein anderer, fachlich richtiger Weg ist voll zu werten.',
    '- Eine leere oder themenfremde Antwort bekommt 0 Punkte.',
    '- Erfinde keine Paragraphen, Normen, Zahlen oder Fristen.',
    '',
    'Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in genau dieser Form:',
    '{"punkte": 6, "max": ' + max + ', "urteil": "ein Halbsatz, z. B. im Kern richtig, Einheit fehlt",',
    ' "staerken": "ein bis zwei Saetze, was richtig war",',
    ' "luecken": "ein bis drei Saetze, was fehlt oder falsch ist",',
    ' "tipp": "ein Satz, worauf der Pruefling beim naechsten Mal achten soll"}',
    'Auf Deutsch, mit Du-Anrede. Kein Text vor oder nach dem JSON.',
    '',
    'AUFGABE (' + max + ' Punkte, Thema: ' + ex.topic + ', Stufe: ' + (LEVEL_NAMES[ex.level] || '') + ')',
    ex.title,
    klText(ex.task).slice(0, 1600),
    '',
    'MUSTERLOESUNG:',
    String(ex.solution || '').slice(0, 2400),
    '',
    'HINWEIS ZUR BEWERTUNG:',
    klText(ex.solutionNote || '').slice(0, 800),
    '',
    'ANTWORT DES PRUEFLINGS:',
    text.slice(0, 2400)
  ].join('\n');

  try{
    var r = await kiJson(anweisung, 'complex');
    if(Array.isArray(r)) r = r[0];
    if(!r || typeof r !== 'object') throw { code:'invalid_json' };
    var punkte = Math.max(0, Math.min(max, Math.round(Number(r.punkte) || 0)));
    ue.erg[exId] = {
      punkte: punkte,
      max: max,
      urteil: String(r.urteil || ''),
      staerken: String(r.staerken || ''),
      luecken: String(r.luecken || ''),
      tipp: String(r.tipp || '')
    };
    awardXp(10, 'Lösung prüfen lassen', 'uepruef:' + exId);
    state.tutorFragen = (state.tutorFragen || 0) + 1;
    if(state.tutorFragen >= 1) grantBadge('tutor_fan');
    if(state.tutorFragen >= 25) grantBadge('tutor_profi');
    if(punkte >= max * 0.8 && !state.solved[exId]){
      state.solved[exId] = Date.now();
      awardXp(30, 'Übungsaufgabe gelöst', 'solved:' + exId);
      checkMilestones();
      ueGeloestAnzeigen(exId);
    }
    saveProgress();
  }catch(e){
    ue.fehler[exId] = ueFehlertext(e && e.code);
  }finally{
    ue.busy[exId] = false;
    ueKnopfStand(exId);
    ueErgZeichnen(exId);
  }
}
function shuffled(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
var review = { queue:[], idx:0, picked:-1, right:0, done:0, mode:'due', konf:null };
var KONF_STUFEN = [
  { k:'sicher',   t:'Sicher',   s:'Das sitzt' },
  { k:'unsicher', t:'Unsicher', s:'Eher Gefühl' },
  { k:'geraten',  t:'Geraten',  s:'Keine Ahnung' }
];
function setzeKonf(k){
  if(review.picked !== -1) return;   /* nach dem Aufdecken nicht mehr aenderbar */
  review.konf = (review.konf === k) ? null : k;
  renderContent();
}
function merkeKonf(ok){
  if(!review.konf) return;
  state.kalib = state.kalib || {};
  var e = state.kalib[review.konf] || { n:0, r:0 };
  e.n++; if(ok) e.r++;
  state.kalib[review.konf] = e;
}
function kalibQuote(k){
  var e = (state.kalib || {})[k];
  if(!e || !e.n) return null;
  return e.r / e.n;
}
function startReview(mode){
  var pool;
  if(mode === 'new'){ pool = shuffled(newCards()).slice(0, 12); }
  else if(mode === 'weak'){
    pool = shuffled(CARDS.filter(function(c){
      var s = state.stats[c.id];
      return s && s.wrong > 0;
    })).slice(0, 15);
  } else { pool = shuffled(dueCards()); }
  review = { queue:pool, idx:0, picked:-1, right:0, done:0, mode:mode };
  state.currentId = 'review';
  render();
}
function pickReview(i){
  if(review.picked !== -1) return;
  review.picked = i;
  var card = review.queue[review.idx];
  var ok = i === card.correct;
  review.done++;
  if(ok) review.right++;
  var hadWrong = state.stats[card.id] && state.stats[card.id].wrong > 0;
  recordAnswer(card.id, ok);
  merkeKonf(ok);
  if(ok && hadWrong) grantBadge('comeback');
  /* Dreimal daneben und trotzdem geknackt */
  if(ok && state.stats[card.id] && state.stats[card.id].wrong >= 3) grantBadge('dickkopf');

  var tk = todayKey();
  if(!state.cardsToday || state.cardsToday.day !== tk) state.cardsToday = { day:tk, n:0 };
  state.cardsToday.n++;
  if(state.cardsToday.n >= 25) grantBadge('cards25');
  if(state.cardsToday.n >= 50) grantBadge('cards50');

  if(ok){
    var s = state.srs[card.id];
    awardXp(5 + ((s && s.iv >= 7) ? 3 : 0), 'Karte gewusst');
  }
  renderContent();
}
function rateAndNext(rating){
  var card = review.queue[review.idx];
  rateCard(card.id, rating);
  review.idx++;
  review.picked = -1;
  review.konf = null;
  renderContent();
  renderSidebar();
}
function renderReview(){
  var due = dueCards().length, fresh = newCards().length;

  if(!review.queue.length || review.idx >= review.queue.length){
    var finished = review.done > 0;
    var h = '<div class="breadcrumb">Training</div><h1>Wiederholen</h1>';
    if(finished){
      var pct = Math.round((review.right / review.done) * 100);
      h += '<div class="score-hero"><div class="score-num '+(pct>=70?'score-pass':'score-fail')+'">'+pct+'%</div>'+
           '<div class="score-sub">'+review.right+' von '+review.done+' richtig · Session abgeschlossen</div></div>';
    } else {
      h += '<p class="intro-sub">Aktives Abrufen schlägt Wiederlesen — deutlich. Jede Frage aus allen '+TOTAL+' Lektionen wird hier nach dem Vergessenskurven-Prinzip wieder vorgelegt: richtig beantwortete Karten kommen in immer größeren Abständen, falsche noch am selben Tag.</p>';
    }
    h += '<div class="today-grid" style="margin-top:20px;">';
    h += '<div class="today-item '+(due?'due accent':'')+'" onclick="startReview(\'due\')"><span class="ti-label">Heute fällig</span><span class="ti-value">'+due+'</span><span class="ti-sub">'+(due?'Jetzt wiederholen':'Alles erledigt 🎉')+'</span></div>';
    h += '<div class="today-item" onclick="startReview(\'new\')"><span class="ti-label">Neue Karten</span><span class="ti-value">'+fresh+'</span><span class="ti-sub">12 neue lernen</span></div>';
    var weakCount = CARDS.filter(function(c){ var s = state.stats[c.id]; return s && s.wrong > 0; }).length;
    h += '<div class="today-item '+(weakCount?'weak':'')+'" onclick="startReview(\'weak\')"><span class="ti-label">Fehlerkarten</span><span class="ti-value">'+weakCount+'</span><span class="ti-sub">Gezielt nachholen</span></div>';
    h += '</div>';

    var learned = CARDS.filter(function(c){ return !!state.srs[c.id]; }).length;
    h += '<div class="ex-panel" style="margin-top:22px;"><strong>Dein Kartenstand:</strong> '+learned+' von '+CARDS.length+' Karten im System. '+
         (learned < CARDS.length ? 'Karten landen automatisch hier, sobald du das Quiz einer Lektion beantwortest — oder du startest sie direkt über „Neue Karten".' : 'Alle Karten sind eingeplant.')+'</div>';
    return h;
  }

  var card = review.queue[review.idx];
  var revealed = review.picked !== -1;
  var s = srsOf(card.id);
  var html = '<div class="srs-stage">';
  html += '<div class="srs-progress"><span>'+(review.idx+1)+' / '+review.queue.length+'</span>'+
          '<div class="srs-bar"><div style="width:'+Math.round((review.idx/review.queue.length)*100)+'%"></div></div>'+
          '<span>'+review.right+' richtig</span>'+
          '<button class="ex-btn" style="padding:4px 10px;" onclick="review.queue=[];renderContent();">Beenden</button></div>';

  html += '<div class="srs-card">';
  html += '<div class="srs-meta"><span class="badge topic">'+esc(card.moduleTitle)+'</span>'+
          (s ? '<span class="mastery-pill">Intervall: '+(s.iv||0)+' Tage</span>' : '<span class="mastery-pill mid">neue Karte</span>')+'</div>';
  html += '<div class="srs-q">'+esc(card.q)+'</div>';

  if(!revealed){
    html += '<div class="konf"><span class="konf-frage">Wie sicher bist du — <em>bevor</em> du antwortest?</span>'+
      '<div class="konf-reihe">';
    KONF_STUFEN.forEach(function(st){
      html += '<button type="button" class="konf-btn'+(review.konf === st.k ? ' an' : '')+'" '+
        'aria-pressed="'+(review.konf === st.k ? 'true' : 'false')+'" '+
        'onclick="setzeKonf(\''+st.k+'\')">'+st.t+
        '<span class="konf-sub">'+st.s+'</span></button>';
    });
    html += '</div></div>';
  } else if(review.konf){
    var korrekt = review.picked === card.correct;
    var urteil = (review.konf === 'sicher' && !korrekt)
      ? { cls:'warn', txt:'Du warst dir sicher und lagst daneben. Genau diese Karten kosten in der Prüfung Punkte — sie kommt bewusst bald wieder.' }
      : (review.konf === 'geraten' && korrekt)
        ? { cls:'ok', txt:'Geraten und getroffen. Das zählt noch nicht als Wissen — die Karte bleibt im kurzen Takt.' }
        : { cls:'', txt:'Einschätzung und Ergebnis passen zusammen.' };
    html += '<div class="konf-echo '+urteil.cls+'">'+urteil.txt+'</div>';
  }

  html += '<div class="srs-opts">';
  card.options.forEach(function(opt, i){
    var cls = '';
    if(revealed){
      if(i === card.correct) cls = ' correct';
      else if(i === review.picked) cls = ' wrong';
    }
    html += '<button class="srs-opt'+cls+'" '+(revealed?'disabled':'')+' onclick="pickReview('+i+')">'+esc(opt)+'</button>';
  });
  html += '</div>';

  if(revealed){
    html += '<div class="srs-explain">'+(review.picked === card.correct ? '✓ ' : '✗ ')+esc(card.explain)+
            ' <button class="ex-btn" style="padding:3px 9px;margin-left:6px;" onclick="selectLesson(\''+card.lessonId+'\')">Zur Lektion</button></div>';
    html += '<div><div class="ti-label" style="margin-bottom:6px;">Wie sicher saß das?</div><div class="rate-row">'+
      '<button class="rate-btn again" onclick="rateAndNext(0)">Nochmal<span class="rt-sub"><kbd>1</kbd> heute erneut</span></button>'+
      '<button class="rate-btn" onclick="rateAndNext(1)">Schwer<span class="rt-sub"><kbd>2</kbd> kurzes Intervall</span></button>'+
      '<button class="rate-btn" onclick="rateAndNext(2)">Gut<span class="rt-sub"><kbd>3</kbd> normal</span></button>'+
      '<button class="rate-btn easy" onclick="rateAndNext(3)">Einfach<span class="rt-sub"><kbd>4</kbd> langes Intervall</span></button>'+
      '</div></div>';
  }
  html += '</div></div>';
  return html;
}
var PART_TITLES = {};
MODULES.forEach(function(m){ PART_TITLES[m.part] = m.partTitle; });
var ZUSATZ_TEILE = [10, 11];
var EXAM_MODES = {
  kurz:     { label:'Kurztest',        n:15, min:12, parts:null, desc:'15 Fragen quer durch den gesamten Kurs. Ideal als tägliche Standortbestimmung.' },
  standard: { label:'Vollprüfung',     n:30, min:30, parts:null, desc:'30 Fragen, gewichtet nach deiner Fehlerquote \u2014 Schwaches kommt \u00f6fter. Querschnitt — realistischer Querschnitt über Algorithmen, Datenbanken, UML, Netzwerk, Sicherheit und Wirtschaft.' },
  ap1:      { label:'Prüfungslänge',   n:40, min:90, parts:null, desc:'40 Fragen in 90 Minuten — Umfang und Zeitdruck der echten AP1. Zwei Minuten pro Frage, so wie am Prüfungstag.' },
  fehler:   { label:'Fehlerheft',      n:20, min:20, parts:null, nurFehler:true, desc:'Nur Fragen, die dir schon einmal danebengegangen sind.' },
  php:      { label:'PHP & Laravel',   n:20, min:25, parts:[10], desc:'20 Fragen aus dem Zusatzteil PHP & Laravel \u2014 vom Einsteiger bis zum Experten. Z\u00e4hlt nicht zur AP1.' },
  git:      { label:'Git',             n:15, min:15, parts:[11], desc:'15 Fragen zu Git und Zusammenarbeit. Z\u00e4hlt nicht zur AP1.' },
  weak:     { label:'Schwachstellen',  n:20, min:20, parts:null, weak:true, desc:'20 Fragen bevorzugt aus Themen, in denen du bisher Fehler gemacht hast.' }
};
var exam = { active:false, mode:null, qs:[], answers:[], idx:0, endsAt:0, timer:null, finished:false, result:null };
function stopExamTimer(){ if(exam.timer){ clearInterval(exam.timer); exam.timer = null; } }
function gewichtetZiehen(pool, n){
  var rest = pool.map(function(c){
    var t = state.stats[c.id];
    var g = 1.0;
    if(t && (t.right + t.wrong) > 0){
      var q = t.right / (t.right + t.wrong);
      g = 0.35 + (1 - q) * 2.4;
    }
    return { c:c, g:g };
  });
  var raus = [];
  var ziel = Math.min(n, rest.length);
  while(raus.length < ziel && rest.length){
    var summe = rest.reduce(function(a, x){ return a + x.g; }, 0);
    var wurf = Math.random() * summe, i = 0;
    while(i < rest.length - 1 && wurf > rest[i].g){ wurf -= rest[i].g; i++; }
    raus.push(rest[i].c);
    rest.splice(i, 1);
  }
  return raus;
}
function startExam(modeId){
  var mode = EXAM_MODES[modeId];
  var pool = CARDS.slice();
  if(mode.parts) pool = pool.filter(function(c){ return mode.parts.indexOf(c.part) !== -1; });
  else if(!mode.allPaths) pool = pool.filter(function(c){ return c.part >= 1 && c.part <= 9; });
  if(mode.nurFehler){
    pool = shuffled(pool.filter(function(c){ var t = state.stats[c.id]; return t && t.wrong > 0; }));
  } else if(mode.weak){
    var bad = pool.filter(function(c){ var t = state.stats[c.id]; return t && t.wrong > 0; });
    var rest = pool.filter(function(c){ return bad.indexOf(c) === -1; });
    pool = shuffled(bad).concat(shuffled(rest));
  } else {
    /* Gewichtete Ziehung: Schwaches kommt oefter, Ungestelltes bekommt mittleres Gewicht. */
    pool = gewichtetZiehen(pool, mode.n);
  }
  if(!pool.length){
    showToast('<span class="t-xp">Nichts dabei</span><span class="t-reason">Es gibt noch keine passenden Fragen für diesen Modus.</span>');
    return;
  }
  var qs = pool.slice(0, Math.min(mode.n, pool.length));
  exam = { active:true, mode:modeId, qs:qs, answers:qs.map(function(){ return -1; }), idx:0,
           endsAt: Date.now() + mode.min * 60000, timer:null, finished:false, result:null };
  stopExamTimer();
  exam.timer = setInterval(tickExam, 1000);
  state.currentId = 'exam';
  render();
}
function tickExam(){
  var el = document.getElementById('examTimer');
  var left = exam.endsAt - Date.now();
  if(left <= 0){ finishExam(true); return; }
  if(!el) return;
  var s = Math.floor(left / 1000);
  var mm = String(Math.floor(s / 60)).padStart(2,'0');
  var ss = String(s % 60).padStart(2,'0');
  el.textContent = mm + ':' + ss;
  el.className = 'timer' + (left < 60000 ? ' crit' : (left < 300000 ? ' warn' : ''));
}
function answerExam(i){
  exam.answers[exam.idx] = i;
  renderContent();
}
function gotoExamQ(i){ exam.idx = i; renderContent(); }
function nextExamQ(d){
  exam.idx = Math.max(0, Math.min(exam.qs.length - 1, exam.idx + d));
  renderContent();
}
function finishExam(auto){
  if(exam.finished) return;
  if(!auto){
    var open = exam.answers.filter(function(a){ return a === -1; }).length;
    if(open > 0 && !window.confirm(open + ' Frage(n) noch unbeantwortet. Trotzdem abgeben?')) return;
  }
  stopExamTimer();
  exam.finished = true;
  var right = 0, byPart = {};
  exam.qs.forEach(function(c, i){
    var ok = exam.answers[i] === c.correct;
    if(ok) right++;
    recordAnswer(c.id, ok);
    if(!ok) rateCard(c.id, 0); else if(!state.srs[c.id]) rateCard(c.id, 2);
    var p = byPart[c.part] || (byPart[c.part] = { right:0, total:0 });
    p.total++; if(ok) p.right++;
  });
  exam.result = { right:right, total:exam.qs.length, byPart:byPart, auto:!!auto };
  state.exams.push({ ts:Date.now(), score:right, total:exam.qs.length, mode:exam.mode,
                     byPart:JSON.parse(JSON.stringify(byPart)) });
  var quote = Math.round((right / exam.qs.length) * 100);
  awardXp(right * 3, 'Prüfung: ' + right + '/' + exam.qs.length + ' richtig');
  if(quote >= 70) grantBadge('exam_pass');
  if(quote >= 90) grantBadge('exam_ace');
  if(right === exam.qs.length && exam.qs.length > 0) grantBadge('exam_perfect');
  var gesamt = (EXAM_MODES[exam.mode] || {}).min * 60000;
  if(quote >= 70 && !auto && gesamt && (exam.endsAt - Date.now()) > gesamt / 2) grantBadge('speedster');
  /* Nach einer verhauenen Pruefung direkt eine bestanden */
  var vorher = state.exams[state.exams.length - 2];
  if(quote >= 70 && vorher && (vorher.score / vorher.total) < 0.5) grantBadge('phoenix');
  /* Knapp vor Ablauf der Zeit bestanden */
  if(quote >= 70 && gesamt && (exam.endsAt - Date.now()) < 60000) grantBadge('nervenstark');
  saveProgress();
  renderContent();
  renderSidebar();
}
function renderExam(){
  if(!exam.active){
    var h = '<div class="breadcrumb">Training</div><h1>Prüfungssimulator</h1>'+
      '<p class="intro-sub">Unter Zeitdruck abrufen zu können ist eine eigene Fähigkeit — und genau die entscheidet in der AP1, wo rund 95 % der Aufgaben Multiple Choice sind. Nach jedem Durchlauf siehst du, welcher Themenbereich dich ausgebremst hat.</p>';
    h += '<div class="exam-setup">';
    Object.keys(EXAM_MODES).forEach(function(k){
      var m = EXAM_MODES[k];
      h += '<div class="exam-mode" onclick="startExam(\''+k+'\')"><h3>'+m.label+'</h3>'+
           '<p>'+m.desc+'</p><p style="margin-top:8px;"><span class="badge topic">'+m.n+' Fragen</span> <span class="badge topic">'+m.min+' Min.</span></p></div>';
    });
    h += '</div>';

    if(state.exams.length){
      h += '<h2 class="sec-h">Deine letzten Durchläufe</h2>';
      h += '<table class="lesson-table"><tr><th>Datum</th><th>Modus</th><th>Ergebnis</th><th>Quote</th></tr>';
      state.exams.slice(-8).reverse().forEach(function(e){
        var pct = Math.round((e.score / e.total) * 100);
        var d = new Date(e.ts);
        h += '<tr><td>'+d.toLocaleDateString('de-DE')+' '+d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+'</td>'+
             '<td>'+((EXAM_MODES[e.mode]||{}).label || e.mode)+'</td>'+
             '<td>'+e.score+'/'+e.total+'</td>'+
             '<td style="color:'+(pct>=70?'var(--success)':'var(--danger)')+';font-weight:600;">'+pct+'%</td></tr>';
      });
      h += '</table>';
      var best = state.exams.reduce(function(a,e){ return Math.max(a, e.score/e.total); }, 0);
      h += '<div class="ex-panel">Bestquote bisher: <strong>'+Math.round(best*100)+'%</strong>. Als Richtwert gilt eine Quote ab 70 % als solide Prüfungsvorbereitung — darunter lohnt gezieltes Nacharbeiten über den Modus „Schwachstellen".</div>';
    }
    return h;
  }

  if(exam.finished){
    var r = exam.result;
    var pct = Math.round((r.right / r.total) * 100);
    var h2 = '<div class="breadcrumb">Ergebnis</div><h1>'+(EXAM_MODES[exam.mode]||{}).label+'</h1>';
    if(r.auto) h2 += '<div class="ex-panel" style="border-left:3px solid var(--danger);">⏱ Zeit abgelaufen — automatisch abgegeben.</div>';
    h2 += '<div class="score-hero"><div class="score-num '+(pct>=70?'score-pass':'score-fail')+'">'+pct+'%</div>'+
          '<div class="score-sub">'+r.right+' von '+r.total+' Fragen richtig</div></div>';

    h2 += '<h2 class="sec-h">Nach Themenbereich</h2>';
    Object.keys(r.byPart).sort().forEach(function(p){
      var v = r.byPart[p], q = Math.round((v.right / v.total) * 100);
      var col = q >= 80 ? 'var(--success)' : (q >= 50 ? 'var(--accent2)' : 'var(--danger)');
      h2 += '<div class="topic-bar-row"><span class="tname">Teil '+p+' · '+esc((PART_TITLES[p]||'').split(':')[0])+'</span>'+
            '<div class="topic-bar"><div style="width:'+q+'%;background:'+col+';"></div></div>'+
            '<span class="tval">'+v.right+'/'+v.total+'</span></div>';
    });

    var wrong = exam.qs.filter(function(c,i){ return exam.answers[i] !== c.correct; });
    if(wrong.length){
      h2 += '<h2 class="sec-h">Das saß noch nicht ('+wrong.length+')</h2>';
      h2 += '<p style="font-size:.85rem;color:var(--text-dim);">Alle davon liegen jetzt im Wiederholungs-Trainer und kommen heute noch einmal.</p>';
      exam.qs.forEach(function(c, i){
        if(exam.answers[i] === c.correct) return;
        h2 += '<div class="ex-card"><div class="ex-head"><h3>'+esc(c.q)+'</h3><span class="badge topic">'+esc(c.moduleTitle)+'</span></div>'+
              '<p style="font-size:.87rem;margin:0 0 6px;"><span style="color:var(--danger);">Deine Antwort:</span> '+
              (exam.answers[i] === -1 ? '<em>nicht beantwortet</em>' : esc(c.options[exam.answers[i]]))+'<br>'+
              '<span style="color:var(--success);">Richtig:</span> '+esc(c.options[c.correct])+'</p>'+
              '<p style="font-size:.85rem;color:var(--text-dim);margin:0;">'+esc(c.explain)+'</p>'+
              '<div class="ex-actions"><button class="ex-btn" onclick="selectLesson(\''+c.lessonId+'\')">Zur Lektion: '+esc(c.lessonTitle)+'</button></div></div>';
      });
    } else {
      h2 += '<div class="ex-panel" style="border-left:3px solid var(--success);">Fehlerfrei — stark. Erhöhe beim nächsten Mal Umfang oder Tempo.</div>';
    }
    h2 += '<div class="ex-actions" style="margin-top:20px;"><button class="check-btn" onclick="exam.active=false;renderContent();">Neuen Durchlauf starten</button>'+
          '<button class="ex-btn" onclick="startReview(\'weak\')">Fehlerkarten jetzt wiederholen</button></div>';
    return h2;
  }

  var card = exam.qs[exam.idx];
  var picked = exam.answers[exam.idx];
  var h3 = '<div class="exam-bar"><span class="timer" id="examTimer">--:--</span>'+
    '<span style="font-size:.85rem;color:var(--text-dim);">Frage '+(exam.idx+1)+'/'+exam.qs.length+'</span>'+
    '<button class="check-btn" style="padding:7px 14px;" onclick="finishExam(false)">Abgeben</button>'+
    '<div class="exam-qnav">';
  exam.qs.forEach(function(q, i){
    h3 += '<button class="qdot'+(exam.answers[i] !== -1 ? ' answered' : '')+(i === exam.idx ? ' current' : '')+'" onclick="gotoExamQ('+i+')">'+(i+1)+'</button>';
  });
  h3 += '</div></div>';

  h3 += '<div class="srs-card"><div class="srs-meta"><span class="badge topic">Teil '+card.part+'</span></div>'+
        '<div class="srs-q">'+esc(card.q)+'</div><div class="srs-opts">';
  card.options.forEach(function(opt, i){
    h3 += '<button class="srs-opt" style="'+(picked === i ? 'border-color:var(--accent);background:var(--part-bg);font-weight:600;' : '')+'" onclick="answerExam('+i+')">'+esc(opt)+'</button>';
  });
  h3 += '</div><div class="ex-actions">'+
        '<button class="ex-btn" onclick="nextExamQ(-1)" '+(exam.idx===0?'disabled':'')+'>← Zurück</button>'+
        '<button class="ex-btn primary" onclick="nextExamQ(1)" '+(exam.idx===exam.qs.length-1?'disabled':'')+'>Weiter →</button>'+
        '<button class="ex-btn" onclick="answerExam(-1)">Antwort verwerfen</button>'+
        '</div></div>';
  h3 += '<p class="ex-meta">Während der Prüfung gibt es bewusst kein Feedback — die Auswertung kommt erst nach der Abgabe, wie in der echten Prüfung.</p>';
  return h3;
}
var tracer = { id:null, step:0, fb:null, finalFb:null, finished:false };
function startTrace(id){
  tracer = { id:id, step:0, fb:null, finalFb:null, finished:false };
  state.currentId = 'tracer';
  render();
}
function traceById(id){ return TRACES.find(function(t){ return t.id===id; }); }
function normVal(s){
  return String(s).toLowerCase().replace(/\s+/g,'').replace(/[\[\]]/g,'').replace(/;/g,',');
}
function traceAdvance(force){
  var t = traceById(tracer.id);
  var pending = t.steps[tracer.step + 1];
  if(!pending) return;
  if(pending.ask && !force){
    var inp = document.getElementById('predictInput');
    var val = inp ? inp.value : '';
    if(!val.trim()){ tracer.fb = { ok:false, msg:'Trag einen Wert ein — raten ist erlaubt, Überspringen lernt nichts.' }; renderContent(); return; }
    var ok = normVal(val) === normVal(pending.values[pending.ask]);
    if(!ok){
      tracer.fb = { ok:false, msg:'Noch nicht. Rechne die Zeile Schritt für Schritt nach — oder lass dir den Wert zeigen.' };
      renderContent(); return;
    }
    tracer.fb = { ok:true, msg:'Richtig.' };
    awardXp(15, 'Vorhersage getroffen', 'trace:' + tracer.id + ':' + (tracer.step + 1));
  } else {
    tracer.fb = force && pending.ask ? { ok:false, msg:'Wert aufgedeckt — schau dir die Zeile genau an, bevor du weitergehst.' } : null;
  }
  tracer.step++;
  if(tracer.step >= t.steps.length - 1) tracer.finished = true;
  renderContent();
  var box = document.getElementById('predictInput');
  if(box) box.focus();
}
function checkFinal(){
  var t = traceById(tracer.id);
  var inp = document.getElementById('finalInput');
  var val = inp ? inp.value : '';
  var ok = normVal(val) === normVal(t.result);
  tracer.finalFb = ok
    ? { ok:true, msg:'✓ Richtig — genau das liefert der Algorithmus zurück.' }
    : { ok:false, msg:'✗ Nicht ganz. Sieh dir die letzte Zeile der Tabelle an: Welcher Wert steht dort in der Ergebnisvariablen?' };
  if(ok){
    if(state.tracesDone.indexOf(t.id) === -1) state.tracesDone.push(t.id);
    awardXp(40, 'Trockendurchlauf gelöst', 'tracedone:' + t.id);
    checkMilestones();
  }
  renderContent();
}
function renderTracer(){
  if(!tracer.id){
    var h = '<div class="breadcrumb">Training</div><h1>Algorithmus-Trainer</h1>'+
      '<p class="intro-sub">Die häufigste Aufgabenform der AP1 lautet sinngemäß: „Was liefert dieser Algorithmus für Eingabe X?" Genau das übst du hier — Zeile für Zeile, mit einer Wertetabelle, wie du sie in der Prüfung auf Papier führen würdest. An kritischen Stellen musst du den nächsten Wert selbst vorhersagen, bevor er aufgedeckt wird.</p>';
    h += '<div class="module-grid" style="margin-top:22px;">';
    TRACES.forEach(function(t){
      h += '<div class="module-card" onclick="startTrace(\''+t.id+'\')">'+
           '<div class="mnum">'+(t.level===1?'EINSTEIGER':'FORTGESCHRITTEN')+'</div>'+
           '<h3>'+esc(t.title)+'</h3><p class="mono" style="font-size:.78rem;">'+esc(t.input)+'</p>'+
           '<p style="margin-top:6px;">'+t.steps.filter(function(s){return s.ask;}).length+' Vorhersagen · '+t.steps.length+' Schritte</p></div>';
    });
    h += '</div>';
    return h;
  }

  var t = traceById(tracer.id);
  var pending = t.steps[tracer.step + 1];
  var html = '<div class="breadcrumb">Algorithmus-Trainer</div>';
  html += '<div class="lesson-head"><div><h1>'+esc(t.title)+'</h1>'+
          '<div class="meta-row"><span class="mono">'+esc(t.input)+'</span><span>Schritt '+(tracer.step+1)+'/'+t.steps.length+'</span></div></div>'+
          '<button class="ex-btn" onclick="tracer.id=null;renderContent();">Andere Aufgabe</button></div>';
  html += '<p style="font-size:.9rem;">'+t.intro+'</p>';

  var cur = t.steps[tracer.step];
  html += '<div class="trace-wrap"><div class="trace-code">';
  t.code.forEach(function(line, i){
    html += '<span class="trace-line'+(i === cur.line ? ' active' : '')+'">'+esc(line)+'</span>';
  });
  html += '</div><div style="overflow-x:auto;"><table class="trace-table"><tr><th>#</th>';
  t.vars.forEach(function(v){ html += '<th>'+esc(v)+'</th>'; });
  html += '</tr>';
  for(var i = 0; i <= tracer.step; i++){
    var st = t.steps[i];
    html += '<tr'+(i === tracer.step ? ' class="now"' : '')+'><td>'+(i+1)+'</td>';
    t.vars.forEach(function(v){ html += '<td>'+esc(st.values[v] !== undefined ? st.values[v] : '—')+'</td>'; });
    html += '</tr>';
  }
  html += '</table></div></div>';

  html += '<div class="ex-panel"><strong>Zeile '+(cur.line+1)+':</strong> '+esc(cur.note)+'</div>';

  if(pending){
    if(pending.ask){
      html += '<div class="predict-box"><label for="predictInput">Vorhersage: Welchen Wert hat <span class="mono">'+esc(pending.ask)+'</span> nach dem nächsten Schritt?</label>'+
        '<div class="predict-row"><input class="predict-input" id="predictInput" autocomplete="off" placeholder="z. B. '+(pending.ask==='zahlen'?'[2, 5, 9, 1]':'12')+'" onkeydown="if(event.key===\'Enter\')traceAdvance(false)">'+
        '<button class="check-btn" onclick="traceAdvance(false)">Prüfen</button>'+
        '<button class="ex-btn" onclick="traceAdvance(true)">Zeigen</button></div>';
      if(tracer.fb) html += '<div class="predict-fb '+(tracer.fb.ok?'ok':'no')+'">'+esc(tracer.fb.msg)+'</div>';
      html += '</div>';
    } else {
      if(tracer.fb) html += '<div class="predict-fb '+(tracer.fb.ok?'ok':'no')+'" style="margin-bottom:10px;">'+esc(tracer.fb.msg)+'</div>';
      html += '<button class="check-btn" onclick="traceAdvance(false)">Nächster Schritt →</button>';
    }
  } else {
    html += '<div class="predict-box"><label for="finalInput">Letzte Frage: Was liefert der Algorithmus zurück?</label>'+
      '<div class="predict-row"><input class="predict-input" id="finalInput" autocomplete="off" onkeydown="if(event.key===\'Enter\')checkFinal()">'+
      '<button class="check-btn" onclick="checkFinal()">Prüfen</button></div>';
    if(tracer.finalFb){
      html += '<div class="predict-fb '+(tracer.finalFb.ok?'ok':'no')+'">'+esc(tracer.finalFb.msg)+'</div>';
      if(tracer.finalFb.ok){
        html += '<div class="callout callout-tip" style="margin-bottom:0;"><div class="callout-label">★ Was du daraus mitnimmst</div><p>'+t.lesson+'</p></div>';
      }
    }
    html += '</div>';
    html += '<div class="ex-actions"><button class="ex-btn" onclick="tracer.id=null;renderContent();">Nächste Aufgabe wählen</button>'+
            '<button class="ex-btn" onclick="startTrace(\''+t.id+'\')">Nochmal von vorn</button></div>';
  }
  return html;
}
var SEARCH_INDEX = [];
var indexFertig = false;
function buildIndex(){
  MODULES.forEach(function(m){
    m.lessons.forEach(function(l){
      var text = ['body','body2','body3','tip','code','code2','code3','code4']
                   .map(function(k){ return l[k] || ''; }).join(' ');
      SEARCH_INDEX.push({ id:l.id, kind:'lesson', title:l.title, sub:'Teil '+m.part+' · '+m.title,
                          hay:(l.title + ' ' + m.title + ' ' + text).replace(/<[^>]+>/g,' ').toLowerCase() });
    });
  });
  EXERCISES.forEach(function(x){
    SEARCH_INDEX.push({ id:'exercises', kind:'exercise', title:x.title, sub:'Übung · '+x.topic+' · '+(['','Einsteiger','Fortgeschritten','Experte'][x.level]),
                        hay:(x.title + ' ' + x.topic + ' ' + x.task).replace(/<[^>]+>/g,' ').toLowerCase() });
  });
  TRACES.forEach(function(t){
    SEARCH_INDEX.push({ id:'trace:'+t.id, kind:'trace', title:t.title, sub:'Algorithmus-Trainer · '+t.input,
                        hay:(t.title + ' ' + t.input + ' ' + t.code.join(' ')).toLowerCase() });
  });
  [['review','Wiederholen (Spaced Repetition)','Training'],
   ['exam','Prüfungssimulator','Training'],
   ['tracer','Algorithmus-Trainer','Training'],
   ['subnet','Subnetting-Trainer','Training'],
   ['tutor','AP1-Tutor','Training'],
   ['exercises','Übungsaufgaben','Praxis'],
   ['cheatsheet','Spickzettel','Referenz'],
   ['glossar','Syntax-Glossar','Referenz · Befehle nachschlagen (let, const, JOIN, rebase)'],
   ['intro','Kursübersicht','Start']].forEach(function(a){
    SEARCH_INDEX.push({ id:a[0], kind:'nav', title:a[1], sub:a[2], hay:(a[1]+' '+a[2]).toLowerCase() });
  });
  indexFertig = true;
}
function renderKiEinstellungen(){
  var an = !!tutor.fn;
  var h = '<h2 class="sec-h">Tutor-Verbindung</h2>';
  h += '<div class="ex-panel">';
  h += '<p style="margin-bottom:12px;">Status: <span class="sync-hint'+(an ? ' on' : '')+'">'+
       esc(kiHerkunftText())+'</span></p>';
  h += '<p style="margin-bottom:14px;">Auf claude.ai laeuft der Tutor ueber dein eigenes Konto. '+
       'Wird der Kurs auf einem eigenen Server betrieben, traegst du hier die Adresse deines '+
       'Dienstes ein &mdash; der API-Schluessel bleibt dabei auf dem Server und niemals im Browser.</p>';
  h += '<div class="sb-grid">';
  h += '<label class="sb-field"><span>Bezugsquelle</span>'+
       '<select class="sb-input" onchange="kiModusSetzen(this.value)">'+
       ['auto','artifact','backend','aus'].map(function(m){
         var t = { auto:'Automatisch', artifact:'Nur Claude (Artifact)',
                   backend:'Nur eigener Dienst', aus:'Tutor abschalten' }[m];
         return '<option value="'+m+'"'+(KI.modus === m ? ' selected' : '')+'>'+t+'</option>';
       }).join('')+'</select></label>';
  h += '<label class="sb-field"><span>Adresse des eigenen Dienstes</span>'+
       '<input class="sb-input" type="url" spellcheck="false" placeholder="https://api.deine-domain.de/tutor" '+
       'value="'+esc(KI.endpunkt)+'" oninput="kiEndpunktSetzen(this.value)"></label>';
  h += '</div>';
  h += '<div class="ex-actions"><button class="ex-btn primary" type="button" '+
       'onclick="tutorNeuVerbinden()">Verbindung neu aufbauen</button></div>';
  h += '<details class="kl-details"><summary>Welches Protokoll der Dienst sprechen muss</summary>'+
       codeBlock(
         "POST <deine Adresse>\n"+
         "Content-Type: application/json\n\n"+
         "{ \"nachrichten\": [ {\"role\":\"user\",\"content\":\"...\"} ],\n"+
         "  \"modus\": \"text\" | \"json\",\n"+
         "  \"stufe\": \"fast\" | \"default\" | \"complex\" }\n\n"+
         "Antwort, Weg a - laufender Text:\n"+
         "  Content-Type: text/event-stream\n"+
         "  data: {\"text\":\"bisheriger Text\"}\n"+
         "  data: [DONE]\n\n"+
         "Antwort, Weg b - eine JSON-Antwort:\n"+
         "  {\"text\":\"...\",\"truncated\":false}\n"+
         "  bei modus \"json\" direkt das gewuenschte Objekt\n\n"+
         "Der Server haelt den API-Schluessel, setzt Zeitlimits\n"+
         "und begrenzt die Anfragen je Nutzer.",
         'Schnittstelle')+'</details>';
  h += '</div>';
  return h;
}
function renderProfile(){
  var lp = levelProgress();
  var xp = state.xp || 0;
  var mastered = Object.keys(state.srs).filter(function(k){ return (state.srs[k].iv || 0) >= 21; }).length;
  var bestExam = state.exams.reduce(function(a,e){ return Math.max(a, e.score / e.total); }, 0);
  var earned = BADGES.filter(function(b){ return state.badges[b.id]; }).length;

  var h = '<div class="breadcrumb">Profil</div>';
  h += renderRangkarte();
  h += renderKennzahlen();
  h += '<h2 class="sec-h">Rangleiter</h2>';
  h += '<p class="intro-sub">Fünfundzwanzig Stufen vom Kabelträger bis zum Architekten der Matrix. XP gibt es für jede abgeschlossene Lektion, jede richtige Erstantwort und jede gelöste Aufgabe.</p>';
  h += renderLeiter();
  h += renderPruefungsverlauf();
  h += '<h2 class="sec-h">Abzeichen</h2>';
  h += renderAbzeichen();

  h += renderKalibrierung();

  h += '<h2 class="sec-h">Fortschritt nach Kursteil</h2>';
  PARTS.forEach(function(p){
    var ls = [];
    MODULES.filter(function(m){ return m.part === p; }).forEach(function(m){ ls = ls.concat(m.lessons); });
    var done = ls.filter(function(l){ return state.completed.has(l.id); }).length;
    var q = ls.length ? Math.round((done / ls.length) * 100) : 0;
    var col = q >= 80 ? 'var(--success)' : (q >= 40 ? 'var(--accent)' : 'var(--accent2)');
    h += '<div class="topic-bar-row"><span class="tname">Teil '+p+' · '+esc((PART_TITLES[p]||'').split(':')[0])+'</span>'+
         '<div class="topic-bar"><div style="width:'+q+'%;background:'+col+';"></div></div>'+
         '<span class="tval">'+done+'/'+ls.length+'</span></div>';
  });

  h += '<h2 class="sec-h">Zahlen</h2>';
  h += '<div class="stat-row">'+
    '<div class="stat-tile"><div class="num">'+state.completed.size+'</div><div class="lbl">Lektionen fertig</div></div>'+
    '<div class="stat-tile"><div class="num">'+Object.keys(state.srs).length+'</div><div class="lbl">Karten aktiv</div></div>'+
    '<div class="stat-tile"><div class="num">'+mastered+'</div><div class="lbl">Karten gefestigt</div></div>'+
    '<div class="stat-tile"><div class="num">'+Object.keys(state.solved).length+'</div><div class="lbl">Übungen gelöst</div></div>'+
    '<div class="stat-tile"><div class="num">'+state.tracesDone.length+'/'+TRACES.length+'</div><div class="lbl">Durchläufe</div></div>'+
    '<div class="stat-tile"><div class="num">'+(bestExam ? Math.round(bestExam*100)+'%' : '—')+'</div><div class="lbl">Beste Prüfung</div></div>'+
    '</div>';

  h += renderKiEinstellungen();

  h += '<h2 class="sec-h">Dein Lernplan</h2>';
  h += '<div class="ex-panel">'+
    '<p style="margin-bottom:14px;">Mit einem Prüfungstermin rechnet dir die Heute-Ansicht aus, '+
    'wie viele Lektionen pro Tag noch nötig sind. Das Tagesziel steuert den Ring — lieber klein ansetzen '+
    'und täglich erreichen als groß und selten.</p>'+
    '<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-end;">'+
      '<label style="display:flex; flex-direction:column; gap:6px;">'+
        '<span style="font-size:.78rem; color:var(--text-dim); font-weight:600;">Prüfungstermin</span>'+
        '<input type="date" id="pruefDatum" class="dat-feld" value="'+esc(state.pruefungsdatum || '')+'" '+
        'onchange="setzePruefung(this.value)">'+
      '</label>'+
      '<label style="display:flex; flex-direction:column; gap:6px;">'+
        '<span style="font-size:.78rem; color:var(--text-dim); font-weight:600;">Lektionen pro Tag</span>'+
        '<input type="number" id="tagesZiel" class="dat-feld" min="1" max="30" '+
        'style="width:90px;" value="'+(state.tagesziel || 3)+'" onchange="setzeZiel(this.value)">'+
      '</label>'+
      '<button class="ex-btn" onclick="fokusUmschalten()">Lesemodus umschalten</button>'+
      '<button class="ex-btn" onclick="selectLesson(\'tasten\')">Tastaturkürzel</button>'+
    '</div></div>';

  h += '<h2 class="sec-h">Geräte und Sicherung</h2>';
  h += '<div class="ex-panel">'+
    '<p style="margin-bottom:10px;"><strong>Status:</strong> <span id="syncHint" class="sync-hint">wird geprüft …</span></p>'+
    '<p style="margin-bottom:10px;">Auf claude.ai gleicht sich dein Fortschritt zwischen allen Geräten ab, an denen du mit demselben Konto angemeldet bist. '+
    'Für eine lokal gespeicherte Kopie oder als Sicherung nutzt du den Export: Er legt deinen kompletten Stand als Text in die Zwischenablage. '+
    'Beim Import wird <em>zusammengeführt</em>, nicht überschrieben — abgeschlossene Lektionen, XP und Abzeichen gehen also nie verloren.</p>'+
    '<div class="ex-actions">'+
      '<button class="ex-btn primary" onclick="exportProgress()">Fortschritt exportieren</button>'+
      '<button class="ex-btn" onclick="showImport()">Fortschritt importieren</button>'+
      '<button class="ex-btn" id="ioApply" hidden onclick="applyImport()">Übernehmen</button>'+
    '</div>'+
    '<textarea class="io-area" id="ioArea" hidden spellcheck="false"></textarea>'+
    '</div>';

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Wie XP entstehen:</strong> Lektion abschließen +'+xpAnzeige(50)+' · Quizfrage erstmals richtig +'+xpAnzeige(10)+' · Karteikarte gewusst +'+xpAnzeige(5)+' (gefestigte Karten +'+xpAnzeige(8)+') · Vorhersage im Algorithmus-Trainer +'+xpAnzeige(15)+' · Trockendurchlauf gelöst +'+xpAnzeige(40)+' · Übungsaufgabe gelöst +'+xpAnzeige(30)+' · Prüfung '+xpAnzeige(3)+' XP je richtiger Antwort · Abzeichen +'+xpAnzeige(25)+'. Punkte gibt es pro Aufgabe nur einmal — Wiederholen zählt fürs Gedächtnis, nicht fürs Punktekonto.</div>';
  return h;
}
var subnet = { task:null, checked:false, right:0, total:0, streak:0, kind:0 };
function sbRand(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
function sbPick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function sbToInt(a, b, c, d){ return ((a * 16777216) + (b * 65536) + (c * 256) + d); }
function sbToIp(n){
  n = n >>> 0;
  return [Math.floor(n / 16777216) % 256, Math.floor(n / 65536) % 256,
          Math.floor(n / 256) % 256, n % 256].join('.');
}
function sbMaskInt(p){ return p === 0 ? 0 : (4294967296 - Math.pow(2, 32 - p)); }
function sbMaskStr(p){ return sbToIp(sbMaskInt(p)); }
function sbNorm(s){ return String(s == null ? '' : s).replace(/\s+/g, '').replace(/,/g, '.').toLowerCase(); }
function sbBase(prefix){
  var r = sbRand(1, 3), a, b;
  if(r === 1){ a = 10;  b = sbRand(0, 255); }
  else if(r === 2){ a = 172; b = sbRand(16, 31); }
  else { a = 192; b = 168; }
  if(r === 3 && prefix < 16) prefix = 16;
  var ip = sbToInt(a, b, sbRand(0, 255), sbRand(1, 254));
  return (ip - (ip % Math.pow(2, 32 - prefix))) + sbRand(1, Math.min(200, Math.pow(2, 32 - prefix) - 2));
}
function makeSubnetTask(){
  var kind = sbRand(1, 4);
  var p, ipInt, netInt, size, t;

  if(kind === 1){
    /* Adresse analysieren */
    p = sbRand(24, 30);
    ipInt = sbBase(p);
    size = Math.pow(2, 32 - p);
    netInt = ipInt - (ipInt % size);
    t = {
      kind: 1,
      titel: 'Adresse analysieren',
      frage: 'Gegeben ist die Adresse <strong>' + sbToIp(ipInt) + ' / ' + p + '</strong> ' +
             '(Subnetzmaske ' + sbMaskStr(p) + ').<br>Bestimme Netzadresse, Broadcast-Adresse, den ersten und letzten nutzbaren Host sowie die Anzahl nutzbarer Hosts.',
      felder: [
        { k:'netz',  l:'Netzadresse',        ph:'z. B. 192.168.1.0' },
        { k:'bc',    l:'Broadcast-Adresse',  ph:'z. B. 192.168.1.255' },
        { k:'first', l:'Erster Host',        ph:'z. B. 192.168.1.1' },
        { k:'last',  l:'Letzter Host',       ph:'z. B. 192.168.1.254' },
        { k:'hosts', l:'Nutzbare Hosts',     ph:'nur die Zahl' }
      ],
      loesung: {
        netz:  sbToIp(netInt),
        bc:    sbToIp(netInt + size - 1),
        first: sbToIp(netInt + 1),
        last:  sbToIp(netInt + size - 2),
        hosts: String(size - 2)
      },
      weg:
        'Maske /' + p + ' = ' + sbMaskStr(p) + '\n' +
        'Blockgroesse im letzten Oktett: 256 - ' + (sbMaskInt(p) % 256) + ' = ' + Math.min(size, 256) + '\n' +
        'Netzadresse   = alle Hostbits auf 0   -> ' + sbToIp(netInt) + '\n' +
        'Broadcast     = alle Hostbits auf 1   -> ' + sbToIp(netInt + size - 1) + '\n' +
        'Erster Host   = Netzadresse + 1       -> ' + sbToIp(netInt + 1) + '\n' +
        'Letzter Host  = Broadcast - 1         -> ' + sbToIp(netInt + size - 2) + '\n' +
        'Hostbits      = 32 - ' + p + ' = ' + (32 - p) + '\n' +
        'Nutzbare Hosts= 2^' + (32 - p) + ' - 2 = ' + size + ' - 2 = ' + (size - 2)
    };
  } else if(kind === 2){
    /* Maske und Praefix umrechnen */
    p = sbRand(17, 30);
    var hin = sbRand(0, 1) === 1;
    t = {
      kind: 2,
      titel: 'Maske und Praefix umrechnen',
      frage: hin
        ? 'Wandle das Praefix <strong>/' + p + '</strong> in die Subnetzmaske in Dezimalschreibweise um und gib an, wie viele Hostbits es gibt und wie viele Hosts nutzbar sind.'
        : 'Wandle die Subnetzmaske <strong>' + sbMaskStr(p) + '</strong> in die CIDR-Schreibweise um und gib an, wie viele Hostbits es gibt und wie viele Hosts nutzbar sind.',
      felder: hin
        ? [ { k:'maske', l:'Subnetzmaske', ph:'z. B. 255.255.255.0' },
            { k:'hb',    l:'Hostbits',     ph:'nur die Zahl' },
            { k:'hosts', l:'Nutzbare Hosts', ph:'nur die Zahl' } ]
        : [ { k:'cidr',  l:'Praefix (nur Zahl)', ph:'z. B. 24' },
            { k:'hb',    l:'Hostbits',     ph:'nur die Zahl' },
            { k:'hosts', l:'Nutzbare Hosts', ph:'nur die Zahl' } ],
      loesung: hin
        ? { maske: sbMaskStr(p), hb: String(32 - p), hosts: String(Math.pow(2, 32 - p) - 2) }
        : { cidr: String(p), hb: String(32 - p), hosts: String(Math.pow(2, 32 - p) - 2) },
      weg:
        '/' + p + ' bedeutet ' + p + ' gesetzte Bits von links.\n' +
        'Maske: ' + sbMaskStr(p) + '\n' +
        'Merkreihe der Oktettwerte: 128 192 224 240 248 252 254 255\n' +
        'Hostbits = 32 - ' + p + ' = ' + (32 - p) + '\n' +
        'Nutzbare Hosts = 2^' + (32 - p) + ' - 2 = ' + (Math.pow(2, 32 - p) - 2)
    };
  } else if(kind === 3){
    /* Vom Hostbedarf zum Praefix */
    var ziel = sbPick([6, 12, 25, 30, 50, 60, 100, 120, 200, 250, 400, 500]);
    var hb = 1;
    while(Math.pow(2, hb) - 2 < ziel) hb++;
    p = 32 - hb;
    t = {
      kind: 3,
      titel: 'Vom Hostbedarf zum Praefix',
      frage: 'Ein Subnetz soll mindestens <strong>' + ziel + ' Hosts</strong> aufnehmen koennen. ' +
             'Bestimme das groesstmoegliche Praefix (also das kleinste ausreichende Netz), die zugehoerige Subnetzmaske und die tatsaechlich nutzbare Hostanzahl.',
      felder: [
        { k:'cidr',  l:'Praefix (nur Zahl)', ph:'z. B. 26' },
        { k:'maske', l:'Subnetzmaske',       ph:'z. B. 255.255.255.192' },
        { k:'hosts', l:'Nutzbare Hosts',     ph:'nur die Zahl' }
      ],
      loesung: { cidr: String(p), maske: sbMaskStr(p), hosts: String(Math.pow(2, hb) - 2) },
      weg:
        'Gesucht: kleinstes h mit 2^h - 2 >= ' + ziel + '\n' +
        '  2^' + (hb - 1) + ' - 2 = ' + (Math.pow(2, hb - 1) - 2) + '  -> zu wenig\n' +
        '  2^' + hb + ' - 2 = ' + (Math.pow(2, hb) - 2) + '  -> ausreichend\n' +
        'Hostbits = ' + hb + '\n' +
        'Praefix  = 32 - ' + hb + ' = /' + p + '\n' +
        'Maske    = ' + sbMaskStr(p)
    };
  } else {
    /* Netz aufteilen */
    var start = sbRand(24, 27);
    var anzahl = sbPick([2, 4, 8, 16]);
    var zusatz = Math.round(Math.log(anzahl) / Math.log(2));
    p = start + zusatz;
    if(p > 30){ p = 30; zusatz = p - start; anzahl = Math.pow(2, zusatz); }
    var basis = sbBase(start);
    var basisNet = basis - (basis % Math.pow(2, 32 - start));
    var block = Math.pow(2, 32 - p);
    t = {
      kind: 4,
      titel: 'Netz aufteilen',
      frage: 'Das Netz <strong>' + sbToIp(basisNet) + ' / ' + start + '</strong> soll in ' +
             '<strong>' + anzahl + ' gleich grosse Subnetze</strong> geteilt werden. ' +
             'Bestimme das neue Praefix, die Blockgroesse, die Anzahl nutzbarer Hosts je Subnetz und die Netzadresse des <strong>zweiten</strong> Subnetzes.',
      felder: [
        { k:'cidr',  l:'Neues Praefix (nur Zahl)', ph:'z. B. 26' },
        { k:'block', l:'Blockgroesse (Adressen)',  ph:'nur die Zahl' },
        { k:'hosts', l:'Nutzbare Hosts je Subnetz', ph:'nur die Zahl' },
        { k:'netz2', l:'Netzadresse Subnetz 2',    ph:'z. B. 192.168.1.64' }
      ],
      loesung: {
        cidr:  String(p),
        block: String(block),
        hosts: String(block - 2),
        netz2: sbToIp(basisNet + block)
      },
      weg:
        'Benoetigte zusaetzliche Netzbits: 2^x >= ' + anzahl + '  ->  x = ' + zusatz + '\n' +
        'Neues Praefix = /' + start + ' + ' + zusatz + ' = /' + p + '\n' +
        'Maske         = ' + sbMaskStr(p) + '\n' +
        'Blockgroesse  = 2^(32-' + p + ') = ' + block + ' Adressen\n' +
        'Hosts je Netz = ' + block + ' - 2 = ' + (block - 2) + '\n' +
        'Subnetz 1     = ' + sbToIp(basisNet) + '\n' +
        'Subnetz 2     = ' + sbToIp(basisNet) + ' + ' + block + ' = ' + sbToIp(basisNet + block)
    };
  }
  return t;
}
function newSubnetTask(){
  subnet.task = makeSubnetTask();
  subnet.checked = false;
  render();
}
function checkSubnetTask(){
  var t = subnet.task;
  if(!t || subnet.checked) return;
  var alleRichtig = true;
  t.eingabe = {};
  t.felder.forEach(function(f){
    var el = document.getElementById('sb_' + f.k);
    var v = el ? el.value : '';
    t.eingabe[f.k] = v;
    if(sbNorm(v) !== sbNorm(t.loesung[f.k])) alleRichtig = false;
  });
  subnet.checked = true;
  subnet.total++;
  if(alleRichtig){
    subnet.right++;
    subnet.streak++;
    state.subnetSolved = (state.subnetSolved || 0) + 1;
    awardXp(10, 'Subnetting-Aufgabe geloest');
    if(state.subnetSolved >= 10) grantBadge('subnet10');
    if(state.subnetSolved >= 50) grantBadge('subnet50');
    if(subnet.streak >= 10) grantBadge('subnet_serie');
  } else {
    subnet.streak = 0;
  }
  t.korrekt = alleRichtig;
  render();
}
function renderSubnet(){
  if(!subnet.task) subnet.task = makeSubnetTask();
  var t = subnet.task;

  var h = '<div class="breadcrumb">Training</div><h1>Subnetting-Trainer</h1>';
  h += '<p class="intro-sub">Subnetting lernt man nicht durch Lesen, sondern durch Wiederholung. Dieser Trainer erzeugt bei jedem Klick eine neue Aufgabe aus vier Typen &mdash; Adresse analysieren, Maske umrechnen, Praefix aus dem Hostbedarf bestimmen und ein Netz aufteilen. Jede geloeste Aufgabe bringt '+xpAnzeige(10)+' XP.</p>';

  h += '<div class="stat-row" style="margin-bottom:18px;">'+
    '<div class="stat-tile"><div class="num">'+subnet.right+'</div><div class="lbl">richtig</div></div>'+
    '<div class="stat-tile"><div class="num">'+subnet.total+'</div><div class="lbl">bearbeitet</div></div>'+
    '<div class="stat-tile"><div class="num">'+(subnet.total ? Math.round(subnet.right/subnet.total*100)+'%' : '&mdash;')+'</div><div class="lbl">Quote</div></div>'+
    '<div class="stat-tile"><div class="num">'+subnet.streak+'</div><div class="lbl">Serie</div></div>'+
    '</div>';

  h += '<div class="ex-card">';
  h += '<div class="ex-head"><h3>'+esc(t.titel)+'</h3><span class="badge topic">Aufgabentyp '+t.kind+'</span></div>';
  h += '<div class="ex-task"><p>'+t.frage+'</p></div>';

  h += '<div class="sb-grid">';
  t.felder.forEach(function(f){
    var val = (t.eingabe && t.eingabe[f.k] != null) ? esc(t.eingabe[f.k]) : '';
    var cls = '';
    if(subnet.checked){
      cls = (sbNorm(val) === sbNorm(t.loesung[f.k])) ? ' sb-ok' : ' sb-bad';
    }
    h += '<label class="sb-field"><span>'+esc(f.l)+'</span>'+
         '<input type="text" id="sb_'+f.k+'" class="sb-input'+cls+'" value="'+val+'" '+
         'placeholder="'+esc(f.ph)+'" autocomplete="off" spellcheck="false"'+
         (subnet.checked ? ' disabled' : '')+'></label>';
  });
  h += '</div>';

  h += '<div class="ex-actions">';
  if(!subnet.checked){
    h += '<button class="ex-btn primary" onclick="checkSubnetTask()">Pr&uuml;fen</button>';
    h += '<button class="ex-btn" onclick="newSubnetTask()">&uuml;berspringen</button>';
  } else {
    h += '<button class="ex-btn primary" onclick="newSubnetTask()">N&auml;chste Aufgabe</button>';
  }
  h += '</div>';

  if(subnet.checked){
    h += '<div class="ex-panel '+(t.korrekt ? 'hint' : '')+'">'+
         '<strong>'+(t.korrekt ? '✓ Alles richtig.' : '✗ Noch nicht ganz.')+'</strong>'+
         (t.korrekt ? '' : ' Die richtigen Werte stehen unten markiert.')+'</div>';
    if(!t.korrekt){
      h += '<div class="sb-grid">';
      t.felder.forEach(function(f){
        h += '<div class="sb-field"><span>'+esc(f.l)+'</span>'+
             '<div class="sb-sol">'+esc(t.loesung[f.k])+'</div></div>';
      });
      h += '</div>';
    }
    h += codeBlock(t.weg, 'Rechenweg');
  }

  h += '</div>';

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Sofort-Spickzettel:</strong> '+
       'Oktettwerte von links &mdash; 128 &middot; 192 &middot; 224 &middot; 240 &middot; 248 &middot; 252 &middot; 254 &middot; 255. '+
       'Blockgr&ouml;&szlig;e = 256 &minus; Maskenwert. Nutzbare Hosts = 2^Hostbits &minus; 2. '+
       'Subnetze = 2^zus&auml;tzliche Netzbits. Broadcast = n&auml;chste Netzadresse &minus; 1.</div>';

  return h;
}
var KI = {
  /* 'auto' probiert erst das Artifact, dann den eigenen Endpunkt.
     'artifact' | 'backend' | 'aus' erzwingen einen Weg. */
  modus: 'auto',
  /* Eigener HTTPS-Endpunkt, z.B. 'https://api.deine-domain.de/tutor'.
     Der API-Schluessel gehoert AUSSCHLIESSLICH auf den Server - niemals
     in diese Datei, sie liegt beim Kunden im Browser. */
  endpunkt: '',
  zeitlimit: 90000
};
var kiGespeichert = null;
var kiRoh = null;
try{
  kiGespeichert = localStorage.getItem('rootpfad-ki');
  if(kiGespeichert){
    kiRoh = JSON.parse(kiGespeichert);
    if(kiRoh && typeof kiRoh === 'object'){
      if(typeof kiRoh.modus === 'string') KI.modus = kiRoh.modus;
      if(typeof kiRoh.endpunkt === 'string') KI.endpunkt = kiRoh.endpunkt;
    }
  }
}catch(e){}
function kiSpeichern(){
  try{
    localStorage.setItem('rootpfad-ki', JSON.stringify({ modus:KI.modus, endpunkt:KI.endpunkt }));
  }catch(e){}
}
function kiBackendAnbieter(endpunkt){

  async function anfrage(nachrichten, opt, modus){
    opt = opt || {};
    var ctl = new AbortController();
    var timer = setTimeout(function(){ ctl.abort(); }, KI.zeitlimit);
    /* Ein von aussen gereichtes Abbruchsignal mit durchreichen. */
    if(opt.signal){
      if(opt.signal.aborted) ctl.abort();
      else opt.signal.addEventListener('abort', function(){ ctl.abort(); });
    }

    var antwort;
    try{
      antwort = await fetch(endpunkt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nachrichten: nachrichten,
          modus: modus,
          stufe: opt.modelTier || 'default'
        }),
        signal: ctl.signal
      });
    }catch(e){
      clearTimeout(timer);
      if(e && e.name === 'AbortError') throw { code:'aborted', message:'abgebrochen' };
      throw { code:'network', message:'Der Tutor-Dienst ist nicht erreichbar.' };
    }

    if(!antwort.ok){
      clearTimeout(timer);
      if(antwort.status === 429) throw { code:'rate_limited', message:'zu viele Anfragen' };
      if(antwort.status === 401 || antwort.status === 403) throw { code:'not_granted', message:'kein Zugang' };
      if(antwort.status === 413) throw { code:'prompt_too_large', message:'Anfrage zu gross' };
      throw { code:'server', message:'Der Tutor-Dienst antwortete mit Fehler ' + antwort.status + '.' };
    }

    var typ = (antwort.headers.get('content-type') || '').toLowerCase();

    /* Weg a: Ereignisstrom, Text waechst mit jedem Stueck. */
    if(typ.indexOf('text/event-stream') >= 0 && antwort.body && antwort.body.getReader){
      var leser = antwort.body.getReader();
      var dek = new TextDecoder();
      var puffer = '';
      var text = '';
      var abgeschnitten = false;
      try{
        for(;;){
          var stueck = await leser.read();
          if(stueck.done) break;
          puffer += dek.decode(stueck.value, { stream:true });
          var zeilen = puffer.split(String.fromCharCode(10));
          puffer = zeilen.pop();
          for(var i = 0; i < zeilen.length; i++){
            var z = zeilen[i].trim();
            if(z.indexOf('data:') !== 0) continue;
            var nutz = z.slice(5).trim();
            if(!nutz || nutz === '[DONE]') continue;
            try{
              var d = JSON.parse(nutz);
              if(typeof d.text === 'string'){
                text = d.text;
                if(opt.onText) opt.onText({ text: text });
              }
              if(d.truncated) abgeschnitten = true;
            }catch(e){}
          }
        }
      }finally{
        clearTimeout(timer);
      }
      return { text: text, truncated: abgeschnitten };
    }

    /* Weg b: eine einzelne JSON-Antwort. */
    var daten;
    try{
      daten = await antwort.json();
    }catch(e){
      clearTimeout(timer);
      throw { code:'invalid_json', message:'Die Antwort war kein gueltiges JSON.' };
    }
    clearTimeout(timer);

    if(modus === 'json') return daten;
    var fertig = typeof daten.text === 'string' ? daten.text : String(daten.text || '');
    if(opt.onText && fertig) opt.onText({ text: fertig });
    return { text: fertig, truncated: !!daten.truncated };
  }

  function senden(nachrichten, opt){ return anfrage(nachrichten, opt, 'text'); }
  senden.json = function(anweisung, opt){
    return anfrage([{ role:'user', content:String(anweisung) }], opt, 'json');
  };
  senden.herkunft = 'backend';
  return senden;
}
async function kiAnbieterWaehlen(){
  if(KI.modus === 'aus') return null;

  if(KI.modus === 'auto' || KI.modus === 'artifact'){
    try{
      if(window.claude && window.claude.use){
        var fn = await window.claude.use('sample');
        if(fn){ fn.herkunft = 'artifact'; return fn; }
      }
    }catch(e){}
    if(KI.modus === 'artifact') return null;
  }

  if((KI.modus === 'auto' || KI.modus === 'backend') && KI.endpunkt){
    return kiBackendAnbieter(KI.endpunkt);
  }
  return null;
}
function kiHerkunftText(){
  if(!tutor.fn) return 'nicht verfügbar';
  if(tutor.fn.herkunft === 'backend') return 'eigener Dienst';
  return 'Claude über dein Konto';
}
var tutor = {
  ready: false,      /* sample aufgeloest */
  fn: null,          /* die sample-Funktion */
  off: false,        /* endgueltig nicht verfuegbar */
  turns: [],         /* {role, content} - ohne die Anweisungsrunde */
  busy: false,
  ctl: null,
  hinweis: '',
  vorlage: ''        /* vorbelegte Frage aus einer Lektion */
};
var TUTOR_INDEX = (function(){
  var out = [];
  PARTS.forEach(function(p){
    var mods = MODULES.filter(function(m){ return m.part === p; });
    if(!mods.length) return;
    out.push('TEIL ' + p + ' - ' + mods[0].partTitle);
    mods.forEach(function(m){
      out.push('  ' + m.id + ' ' + m.title + ': ' +
        m.lessons.map(function(l){ return l.title; }).join(' | '));
    });
  });
  return out.join('\n');
})();
function tutorAnweisung(){
  return [
    'Du bist der Lern-Tutor in einem Online-Kurs zur Vorbereitung auf die IHK-Abschlusspruefung Teil 1',
    '(AP1) im Beruf Fachinformatiker fuer Anwendungsentwicklung in Deutschland.',
    '',
    'SO ANTWORTEST DU:',
    '- Immer auf Deutsch, mit Du-Anrede, sachlich und freundlich.',
    '- Kurz und praezise. Zwei bis sechs Saetze reichen meistens.',
    '- Erst die Antwort, dann die Begruendung. Nie umgekehrt.',
    '- Bei Rechenaufgaben IMMER den vollstaendigen Rechenweg Schritt fuer Schritt,',
    '  mit Einheiten, und das Ergebnis am Ende klar benannt.',
    '- Wenn es zum Thema eine Lektion im Kurs gibt, nenne sie am Ende in einer',
    '  eigenen Zeile im Format: Dazu im Kurs: <Modultitel> - <Lektionstitel>',
    '- Wenn eine Frage typische Pruefungsfallen enthaelt, weise darauf hin.',
    '- Wenn du etwas nicht sicher weisst, sage das offen. Erfinde keine',
    '  Paragraphen, Normen, Zahlen oder Fristen.',
    '- Nutze einfache Formatierung: kurze Absaetze, Aufzaehlungen mit "- ",',
    '  Tabellen nur wenn sie wirklich helfen. Kein Markdown-Fettdruck noetig.',
    '',
    'WAS DU TUN KANNST, wenn darum gebeten wird:',
    '- einen Begriff erklaeren, auch mit Beispiel',
    '- eine Uebungsaufgabe im AP1-Stil stellen und danach bewerten',
    '- eine Loesung der lernenden Person pruefen und sagen, wo Punkte fehlen',
    '- den Unterschied zwischen zwei Begriffen herausarbeiten',
    '- eine Merkhilfe vorschlagen',
    '',
    'ZUSATZTEILE PHP & LARAVEL (Teil 10) und GIT (Teil 11): gehoeren nicht zur AP1. Fragen dazu beantwortest',
    'du als erfahrene PHP- und Laravel-Entwicklerin bzw. erfahrener Entwickler, mit kurzen,',
    'lauffaehigen Codebeispielen fuer aktuelles PHP 8 und Laravel. Weise auf Sicherheit',
    '(XSS, SQL-Injection, Mass Assignment, fehlende Autorisierung) hin, wo es passt.',
    '',
    'DAS IST DER AUFBAU DES KURSES (nutze ihn fuer Verweise):',
    TUTOR_INDEX,
    '',
    'Antworte ab jetzt auf die Fragen der lernenden Person.'
  ].join('\n');
}
async function tutorInit(){
  if(tutor.ready || tutor.off) return;
  try{
    tutor.fn = await kiAnbieterWaehlen();
  }catch(e){ tutor.fn = null; }
  tutor.ready = true;
  if(!tutor.fn) tutor.off = true;
  if(state.currentId === 'tutor') renderContent();
}
async function tutorNeuVerbinden(){
  tutor.ready = false;
  tutor.off = false;
  tutor.fn = null;
  tutor.hinweis = '';
  await tutorInit();
  renderContent();
  if(typeof dockZeichnen === 'function') dockZeichnen();
}
function kiModusSetzen(wert){
  KI.modus = wert || 'auto';
  kiSpeichern();
  tutorNeuVerbinden();
}
function kiEndpunktSetzen(wert){
  KI.endpunkt = String(wert || '').trim();
  kiSpeichern();
}
function tutorFehlertext(code){
  switch(code){
    case 'not_granted':
    case 'sampling_disabled':
    case 'not_declared':
    case 'capability_disabled':
      tutor.off = true;
      return 'Der Tutor ist in dieser Ansicht nicht verfuegbar. Der Rest des Kurses funktioniert unveraendert.';
    case 'network':
      return 'Der Tutor-Dienst ist nicht erreichbar. Pruefe deine Verbindung und die Adresse in den Einstellungen.';
    case 'server':
      return 'Der Tutor-Dienst hat mit einem Fehler geantwortet. Versuche es in einigen Minuten erneut.';
    case 'aborted':
      return '';
    case 'rate_limited':
      return 'Gerade zu viele Anfragen. Warte einen Moment und frag dann noch einmal.';
    case 'session_expired':
      return 'Deine Sitzung ist abgelaufen. Melde dich neu an und versuche es noch einmal.';
    case 'prompt_too_large':
      return 'Die Unterhaltung ist zu lang geworden. Setze sie mit \u201aNeu beginnen\u2018 zurueck.';
    case 'refused':
      return 'Diese Frage kann ich so nicht beantworten. Formuliere sie bitte anders.';
    case 'empty_completion':
      return 'Darauf kam keine Antwort. Stelle die Frage etwas konkreter.';
    case 'invalid_json':
      return 'Die Bewertung kam in einer unerwarteten Form zurueck. Versuche es noch einmal \u2014 '+
             'bei Wiederholung liegt es meist an einer zu langen Eingabe.';
    case 'cancelled':
      return '';
    default:
      /* Den Rohcode mitgeben: sonst sucht man im Dunkeln. */
      return 'Das hat nicht geklappt. Versuche es gleich noch einmal.'+
             (code ? ' (Grund: ' + code + ')' : '');
  }
}
function tutorAbbrechen(){
  if(tutor.ctl) tutor.ctl.abort();
}
function tutorNeu(){
  tutorAbbrechen();
  tutor.turns = [];
  tutor.hinweis = '';
  chatAktualisieren();
}
function chatAktualisieren(){
  if(state.currentId === 'tutor') renderContent();
  dockZeichnen();
  var k = document.getElementById('dockKnopf');
  if(k && tutor.off){ k.hidden = true; }
  /* Kam die Antwort, waehrend das Dock zu war, meldet der Knopf das. */
  var p = document.getElementById('dockPunkt');
  if(p){
    var letzte = tutor.turns[tutor.turns.length - 1];
    p.hidden = !(!dock.offen && !tutor.busy && letzte && letzte.role === 'assistant' && letzte.content);
  }
}
function tutorSchnell(text){
  var ta = document.getElementById('tutorInput');
  if(ta){ ta.value = text; ta.focus(); }
  tutorSenden();
}
function tutorSenden(){
  var ta = document.getElementById('tutorInput');
  var frage = ta ? ta.value.trim() : '';
  if(!frage) return;
  if(ta) ta.value = '';
  tutorFrage(frage);
}
function dockFrage(frage){
  var f = document.getElementById('dockFeld');
  if(!frage && f) frage = f.value.trim();
  if(!frage) return;
  if(f){ f.value = ''; f.style.height = 'auto'; }
  tutorFrage(frage);
}
async function tutorFrage(frage){
  if(tutor.busy || tutor.off || !tutor.fn) return;
  frage = String(frage || '').trim();
  if(!frage) return;

  tutor.turns.push({ role:'user', content: frage });
  tutor.turns.push({ role:'assistant', content: '', pending:true });
  tutor.busy = true;
  tutor.hinweis = '';
  chatAktualisieren();

  var ziel = tutor.turns[tutor.turns.length - 1];
  tutor.ctl = new AbortController();

  /* Aelteste Runden verwerfen, damit der Kontext nicht ueberlaeuft.
     Anweisung und Seitenkontext bleiben immer erhalten. */
  var verlauf = tutor.turns.filter(function(t){ return !t.pending; });
  while(verlauf.length > 12) verlauf.shift();
  var eingabe = [
    { role:'user', content: tutorAnweisung() },
    { role:'user', content: dockKontext() }
  ].concat(verlauf.map(function(t){ return { role:t.role, content:t.content }; }));
  /* Die Folge muss auf einer Frage enden. */
  while(eingabe.length && eingabe[eingabe.length - 1].role !== 'user') eingabe.pop();

  try{
    var res = await tutor.fn(eingabe, {
      cache: false,
      signal: tutor.ctl.signal,
      modelTier: 'default',
      onText: function(u){
        ziel.content = u.text;
        ziel.pending = false;
        var el = document.getElementById('tutorLive');
        if(el) el.textContent = u.text;
        var box = document.getElementById('tutorVerlauf');
        if(box) box.scrollTop = box.scrollHeight;
        var dl = document.getElementById('dockLive');
        if(dl) dl.textContent = u.text;
        var dv = document.getElementById('dockVerlauf');
        if(dv) dv.scrollTop = dv.scrollHeight;
      }
    });
    ziel.content = res.text;
    ziel.pending = false;
    if(res.truncated) tutor.hinweis = 'Die Antwort wurde gek\u00fcrzt. Frag nach weniger auf einmal.';
    state.tutorFragen = (state.tutorFragen || 0) + 1;
    if(state.tutorFragen >= 1) grantBadge('tutor_fan');
    if(state.tutorFragen >= 25) grantBadge('tutor_profi');
    awardXp(5, 'Frage an den Tutor', 'tutor:' + state.tutorFragen);
    saveProgress();
  }catch(e){
    var txt = (e && e.text) ? e.text : '';
    ziel.content = txt;
    ziel.pending = false;
    if(!txt) tutor.turns.pop();
    tutor.hinweis = tutorFehlertext(e && e.code);
  }finally{
    tutor.busy = false;
    tutor.ctl = null;
    chatAktualisieren();
    var d = document.getElementById('dockFeld');
    if(dock.offen && d){ d.focus(); }
    else {
      var i = document.getElementById('tutorInput');
      if(i) i.focus();
    }
  }
}
function tutorZuLektion(lessonId){
  var l = FLAT.find(function(x){ return x.id === lessonId; });
  var m = moduleOfLesson(lessonId);
  var frage = 'Erkl\u00e4re mir den Kern dieser Lektion in eigenen Worten und nenne die h\u00e4ufigste Pr\u00fcfungsfalle dazu.';
  /* Ohne Tutor-Faehigkeit bleibt der alte Weg ueber die eigene Seite. */
  if(tutor.off || !tutor.fn){
    if(l && m) tutor.vorlage = 'Ich lerne gerade die Lektion \u201e' + l.title + '\u201c aus dem Modul \u201e' +
      m.title + '\u201c. ' + frage;
    selectLesson('tutor');
    return;
  }
  dockOeffnen();
  var f = document.getElementById('dockFeld');
  if(f){ f.value = frage; dockWachsen(f); f.focus(); }
}
function renderTutor(){
  if(!tutor.ready) tutorInit();

  var h = '<div class="breadcrumb">Training</div><h1>AP1-Tutor</h1>';

  if(tutor.off){
    h += '<p class="intro-sub">Der Tutor beantwortet deine Fragen zum Kursstoff. In dieser Ansicht ist er gerade nicht verf\u00fcgbar \u2014 ' +
         'das kann daran liegen, dass die Seite als lokale Datei ge\u00f6ffnet ist oder die Nutzung nicht freigegeben wurde. ' +
         'Alle anderen Funktionen des Kurses arbeiten unver\u00e4ndert weiter.</p>';
    return h;
  }
  if(!tutor.fn){
    h += '<p class="intro-sub">Der Tutor wird geladen \u2026</p>';
    return h;
  }

  h += '<p class="intro-sub">Frag alles zum Pr\u00fcfungsstoff: Begriffe erkl\u00e4ren lassen, eine \u00dcbungsaufgabe anfordern, ' +
       'deine eigene L\u00f6sung pr\u00fcfen lassen oder zwei Begriffe gegen\u00fcberstellen. Der Tutor kennt den Aufbau dieses Kurses ' +
       'und verweist auf die passende Lektion. Jede Frage bringt ' + xpAnzeige(5) + ' XP.</p>' +
       '<p class="intro-sub">Derselbe Tutor sitzt unten rechts in jeder Ansicht \u2014 dort beantwortet er Fragen, '+
       'ohne dass du die Lektion verl\u00e4sst. Der Verlauf ist hier und dort derselbe.</p>';

  h += '<div class="tutor-box">';
  h += '<div class="tutor-verlauf" id="tutorVerlauf">';
  if(!tutor.turns.length){
    h += '<div class="tutor-leer">Noch keine Frage gestellt. Unten anfangen \u2014 oder einen der Vorschl\u00e4ge nehmen.</div>';
  }
  tutor.turns.forEach(function(t, i){
    var letzte = (i === tutor.turns.length - 1);
    if(t.role === 'user'){
      h += '<div class="tutor-msg user"><div class="tutor-rolle">Du</div><div class="tutor-text">'+esc(t.content)+'</div></div>';
    } else {
      h += '<div class="tutor-msg bot"><div class="tutor-rolle">Tutor</div>'+
           '<div class="tutor-text"'+(letzte ? ' id="tutorLive"' : '')+'>'+
           (t.pending ? '<span class="tutor-denkt">denkt nach \u2026</span>' : esc(t.content))+
           '</div></div>';
    }
  });
  h += '</div>';

  if(tutor.hinweis){
    h += '<div class="tutor-hinweis">'+esc(tutor.hinweis)+'</div>';
  }

  var vor = tutor.vorlage ? esc(tutor.vorlage) : '';
  tutor.vorlage = '';
  h += '<div class="tutor-eingabe">'+
       '<textarea id="tutorInput" class="tutor-input" rows="3" spellcheck="false" '+
       (tutor.busy ? 'disabled ' : '')+
       'placeholder="Deine Frage \u2026 (Strg+Enter sendet)">'+vor+'</textarea>'+
       '<div class="ex-actions" style="margin-top:10px;">';
  if(tutor.busy){
    h += '<button class="ex-btn" onclick="tutorAbbrechen()">Stopp</button>';
  } else {
    h += '<button class="ex-btn primary" onclick="tutorSenden()">Fragen</button>';
  }
  h += '<button class="ex-btn" onclick="tutorNeu()">Neu beginnen</button>';
  h += '</div></div>';
  h += '</div>';

  if(!tutor.turns.length){
    h += '<h2 class="sec-h">Womit soll ich anfangen?</h2><div class="tutor-chips">';
    [ 'Erkl\u00e4re mir Subnetting an einem Beispiel mit /26.',
      'Was ist der Unterschied zwischen Datenschutz und Datensicherheit?',
      'Stelle mir eine Netzplan-Aufgabe im AP1-Stil.',
      'Warum zeigt der Pfeil bei include anders als bei extend?',
      'Gib mir eine Merkhilfe f\u00fcr die OSI-Schichten.',
      'Pr\u00fcfe meine L\u00f6sung: Ich soll 192.168.5.130/26 analysieren.',
      'Was sind die drei Lernarten beim maschinellen Lernen?',
      'Erkl\u00e4re Kapselung so, als w\u00e4re ich im ersten Lehrjahr.'
    ].forEach(function(t){
      h += '<button class="tutor-chip" onclick="tutorSchnell(\''+t.replace(/'/g, "\\'")+'\')">'+esc(t)+'</button>';
    });
    h += '</div>';
  }

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Wie der Tutor arbeitet:</strong> '+
       'Deine Frage geht an Claude \u2014 mit deinem eigenen Konto, direkt aus dieser Seite heraus. '+
       'Es wird kein fremder Dienst genutzt und kein Schl\u00fcssel gespeichert. Beim ersten Mal fragt dein Browser, '+
       'ob die Seite das darf. Der Verlauf bleibt nur in dieser Sitzung und wird nicht gespeichert. '+
       '<em>Pr\u00fcfe wichtige Angaben \u2014 Paragraphen, Fristen, Zahlen \u2014 immer gegen die Lektion oder das Formelblatt.</em></div>';

  return h;
}
function wireTutor(){
  var ta = document.getElementById('tutorInput');
  if(!ta) return;
  ta.onkeydown = function(ev){
    if((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter'){ ev.preventDefault(); tutorSenden(); }
  };
  if(!tutor.busy && !dock.offen) ta.focus();
}
function weichRendern(fn){
  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.startViewTransition && !reduziert){
    try{ document.startViewTransition(fn); return; }catch(e){}
  }
  fn();
}
function fokusUmschalten(){
  var an = document.documentElement.getAttribute('data-fokus') === '1';
  document.documentElement.setAttribute('data-fokus', an ? '0' : '1');
  try{ localStorage.setItem('ap1-fokus', an ? '0' : '1'); }catch(e){}
  var h = document.getElementById('fokusHinweis');
  if(h){
    h.textContent = an ? 'Lesemodus aus' : 'Lesemodus an · F beendet ihn';
    h.classList.add('an');
    clearTimeout(h._t);
    h._t = setTimeout(function(){ h.classList.remove('an'); }, 1900);
  }
}
function pruefungsTage(){
  if(!state.pruefungsdatum) return null;
  var z = new Date(state.pruefungsdatum + 'T00:00:00');
  if(isNaN(z)) return null;
  var heute = new Date(); heute.setHours(0,0,0,0);
  return Math.round((z - heute) / 86400000);
}
function setzePruefung(wert){
  state.pruefungsdatum = wert || '';
  saveProgress();
  renderContent();
}
function setzeZiel(wert){
  var n = parseInt(wert, 10);
  state.tagesziel = (isNaN(n) || n < 1) ? 3 : Math.min(n, 30);
  saveProgress();
  renderContent();
}
function heuteGeschafft(){
  var t = todayKey();
  return (state.dayCount && state.dayCount.day === t) ? state.dayCount.n : 0;
}
function lernplan(){
  var tage = pruefungsTage();
  if(tage === null || tage <= 0) return null;

  var offeneModule = [];
  var offenGesamt = 0;
  MODULES.forEach(function(m){
    var offen = m.lessons.filter(function(l){ return !state.completed.has(l.id); }).length;
    if(offen){ offeneModule.push({ m:m, offen:offen }); offenGesamt += offen; }
  });
  if(!offenGesamt) return { fertig:true, puffer:tage, module:[] };

  /* Puffer fuer die Schlussphase: ein Fuenftel, mindestens 3, hoechstens 14 Tage. */
  var puffer = Math.min(14, Math.max(3, Math.round(tage * 0.2)));
  /* Bei sehr wenig Restzeit darf der Puffer nicht groesser werden als
     die verbleibenden Tage - mindestens ein Lerntag bleibt immer. */
  puffer = Math.min(puffer, Math.max(0, tage - 1));
  var lerntage = Math.max(1, tage - puffer);
  var proTag = offenGesamt / lerntage;

  var heute = new Date(); heute.setHours(0,0,0,0);
  var summe = 0;
  var plan = offeneModule.map(function(e){
    summe += e.offen;
    var tagNr = Math.min(lerntage, Math.ceil(summe / proTag));
    var d = new Date(heute.getTime() + tagNr * DAY);
    return { modul:e.m, offen:e.offen, datum:d };
  });
  var pufferStart = new Date(heute.getTime() + lerntage * DAY);
  return { fertig:false, proTag:Math.ceil(proTag), puffer:puffer,
           pufferStart:pufferStart, module:plan, machbar:proTag <= (state.tagesziel || 3) };
}
function datumKurz(d){
  return d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit' });
}
