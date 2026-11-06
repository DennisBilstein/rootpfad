# Vom SAP-Standard lernen

*Werkzeugkasten & rote Linien · ca. 7 Min.*

Die beste ABAP-Lernquelle ist im System selbst installiert — sie wird nur kaum genutzt:

-   **ABAP-Schlüsselwortdokumentation (F1)**: nicht nur Syntaxreferenz, sondern mit ausführbaren Beispielen zu praktisch jedem Sprachkonstrukt. Bei Unsicherheit über eine Syntaxvariante ist das schneller als jede Websuche — und immer zur installierten Release-Version passend.
-   **DEMO-Programme**: Hunderte lauffähige Beispiele (Namensmuster `DEMO_*`) von String-Verarbeitung bis RAP.
-   **SAP-Standardklassen lesen**: Wie hat SAP selbst eine Factory gebaut, wie eine Exception-Hierarchie geschnitten? Das ist Architekturlernen an echtem, produktiv eingesetztem Code.
-   **abapGit-Community**: Offene Werkzeugsammlungen (Linter, Test-Doubles, Utilities), die sich in ein Entwicklungssystem laden lassen — mit Genehmigung und Augenmaß.

Und die ehrlichste Quelle: der Verwendungsnachweis auf eine SAP-Klasse, um zu sehen, wie sie im Standard tatsächlich eingesetzt wird — nicht, wie die Dokumentation es sich vorstellt.

> **Tipp:** Wenn du eine unbekannte SAP-Klasse verstehen willst, lies nicht ihre Dokumentation zuerst, sondern such über den Verwendungsnachweis drei echte Aufrufstellen im Standard. Du siehst dann sofort, welche Parameter in der Praxis tatsächlich gefüllt werden und welche theoretisch existieren, aber nie benutzt werden. Dieser Unterschied steht in keiner Doku.

## Kontrollfragen

**1. Was macht die ABAP-Schlüsselwortdokumentation (F1) besonders wertvoll?**

- [x] Sie enthält ausführbare Beispiele und passt exakt zur installierten Release-Version
- [ ] Sie ersetzt den Debugger
- [ ] Sie ist die einzige Quelle für Kundencode

*Erklärung:* Release-genaue Beispiele direkt im System sind oft verlässlicher als allgemeine Webquellen.

**2. Wie verstehst du eine unbekannte SAP-Klasse am schnellsten?**

- [ ] Nur die Dokumentation lesen
- [x] Über den Verwendungsnachweis echte Aufrufstellen im Standard ansehen
- [ ] Sie kopieren und umbenennen

*Erklärung:* Echte Aufrufstellen zeigen, welche Parameter in der Praxis wirklich gefüllt werden.
