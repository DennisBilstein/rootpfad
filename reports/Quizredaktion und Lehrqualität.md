# Quizredaktion und Lehrqualität

## Aktualisierung 07.11.2026

Weitere 37 Fragen der AP1-Grundlagen wurden einzeln durch fachlich abgegrenzte
Fälle ersetzt. Insgesamt jetzt **66 redigiert, 1.187 von 1.253 Lektionsfragen
noch ohne individuelle Revision**. Zusatzkarten weiterhin nicht vollständig
neu redigiert. Datensatz: `content/quiz-ap1-round2.mjs`. 26 Tests bestanden.
Die nachfolgenden Zahlen 29/1.224 beschreiben den historischen ersten Stand.

## Tatsächlich umgesetzt

29 bestehende Fragen fachlich durch Anwendungsszenarien ersetzt. Jede hat
konkrete Bedingungen, plausible Fehlannahmen und eine eigene Begründung je
Antwortoption. Inhalt: `content/quiz-revisions.mjs`; reproduzierbarer Build:
`scripts/build-quiz-revisions.mjs`. Zur Bestandserfassung wurden 1.253
Lektionsfragen gezählt (Zusatzkarten sind darin nicht enthalten).

**Noch offen: 1.224 Lektionsfragen ohne diese neue fachliche Revision.**
Es wurden weder alle Fragen ersetzt noch bloße längere Texte als vollständige
Redaktion ausgegeben. 15 zuvor zusätzlich angelegte Szenariofragen bleiben
erhalten; einzelne inhaltliche Überschneidungen mit den neuen Ersatzfragen sind
bei weiterer Redaktion zu reduzieren, ohne IDs stillschweigend umzudeuten.

## Verlässliche Lernstände

Fragen erhalten eine Inhaltsrevision, aktuelle Karten-IDs etwa
`m1-l2#0@2026-11-scenario-v1`. Alte Statistiken/SRS bleiben historisch gespeichert,
werden aber für diese neue Kartenrevision nicht verwendet. Quiz,Spaced Repetition,
Modulsterne und Beherrschungsstufen verwenden den aktuellen Schlüssel.
Die bisherigen Abschlussmarkierungen für gelesene Lektionen sind keine
inhaltsspezifischen Prüfungsnachweise und bleiben unverändert.

## Aus Lehrer- und IT-Sicht nächste Prioritäten

1. Pro Modul reale Kompetenz und prüfbare Normal-/Grenz-/Fehlerfälle festlegen.
2. Verbleibende Fragen fachlich redigieren, nicht per generischem Präfix verlängern.
3. Plausible Distraktoren aus tatsächlichen Denkfehlern formulieren; nicht immer
   die längste oder offensichtlich tugendhafteste Antwort richtig machen.
4. Versionierte parallele Aufgabenformen für verzögerten Transfer aufbauen.
5. Schwierigkeit aus anonymisiertem tatsächlichem Antwortverhalten kalibrieren;
   Quote allein ist kein Nachweis, dass eine Aufgabe sinnvoll schwer ist.
6. Freitext nach Rubrik selbst-/fremdbeurteilen statt starrer Wortsuche.
7. Fakten-/Rechts-/Versionsaussagen mit Primärquellen redaktionell gegenprüfen.
8. Echte praktische Abnahmen je Sprache ausbauen, mit sicherer Ausführungsgrenze.

Tests prüfen Revisionsisolation und bestehende Funktionen; 22 Tests bestanden.
Das ist keine empirische Lernerfolgsstudie und keine Behauptung vollständiger
fachlicher Fehlerfreiheit oder unabhängiger Fachbegutachtung aller Inhalte.
