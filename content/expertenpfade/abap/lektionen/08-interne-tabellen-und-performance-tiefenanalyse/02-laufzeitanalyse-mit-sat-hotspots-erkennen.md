# Laufzeitanalyse mit SAT: Hotspots erkennen

*Interne Tabellen & Performance-Tiefenanalyse · ca. 6 Min.*

**SAT** (Laufzeitanalyse, als Transaktion oder ADT-Tool) zeichnet den tatsächlichen Ressourcenverbrauch eines Programmlaufs auf Anweisungsebene auf. Typischer Workflow: Messung starten → Programm ausführen → Auswertung nach „Nettozeit pro Baustein" → Hotspots identifizieren (oft: Datenbankzugriffe, verschachtelte Schleifen, unnötige Typkonvertierungen).

Grundregel: erst **messen**, dann optimieren — Intuition über Performance-Probleme täuscht selbst erfahrene Entwickler regelmäßig.

> **Tipp:** Eine Faustregel aus unzähligen Performance-Reviews: 80% der Laufzeitprobleme stecken in 20% des Codes — meist genau dort, wo Datenbankzugriffe und Schleifenlogik aufeinandertreffen. SAT macht diese 20% sichtbar, statt sie zu erraten.

## Kontrollfragen

**1. Was ist der erste Schritt bei einer Performance-Optimierung?**

- [ ] Sofort den vermuteten Hotspot umschreiben
- [x] Messen (z. B. mit SAT), nicht raten
- [ ] Die Tabellengröße verdoppeln

*Erklärung:* Ohne Messung optimiert man oft am eigentlichen Problem vorbei.

**2. Wonach sucht man typischerweise bei der SAT-Auswertung?**

- [x] Hotspots mit hoher Nettozeit
- [ ] Die Anzahl der Kommentarzeilen
- [ ] Die Farbe der Syntax-Hervorhebung

*Erklärung:* Nettozeit pro Baustein zeigt, wo tatsächlich Zeit verloren geht.
