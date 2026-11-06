# ROOTPFAD

Originalgetreue Übernahme aus `ROOTPFAD_pro.html`, ohne Framework oder Build-Schritt.
Design, Lerninhalte und die vorhandene Anwendungslogik bleiben erhalten.

## Starten

```sh
npm run dev
```

Anschließend http://localhost:5173 öffnen. Benötigt werden Python 3 und für den
Startbefehl npm. Alternativ direkt `python3 -m http.server 5173 --bind 127.0.0.1` ausführen.

## Struktur

- `index.html`: Oberfläche und Einbindung der Assets
- `assets/style-*.css`: Styles in der Reihenfolge des Originals
- `assets/script-*.js`: Anwendungslogik und Lerninhalte in ursprünglicher Ausführungsreihenfolge
- `scripts/import-source.py`: reproduzierbarer Import des HTML-Exports

Der Lernfortschritt wird durch die Original-App im Browser gespeichert. Daten aus
einer zuvor per `file://` geöffneten Version werden nicht automatisch übernommen.
Google Fonts werden weiterhin extern geladen; ohne Internet greifen Ersatzschriften.
Der KI-Tutor benötigt den im Original vorgesehenen separaten Dienst bzw. einen
konfigurierten Endpunkt; dieser ist im HTML-Export nicht enthalten.

## ABAP- und Java-Expertenpfade

Zusätzlich integriert sind 44 Module mit 136 Lektionen, allen Lektionsquizzen,
92 Zusatzkarten, 36 Übungen, 9 Algorithmus-Traces und beiden Spickzetteln.
Die Inhalte erscheinen in eigenen Kursteilen in der Seitenleiste. Quizfragen
stehen auch im gemeinsamen Wiederholungs- und Prüfungspool zur Verfügung.
Die ursprünglichen IDs und Lernstände bleiben unverändert.

```sh
npm run build:experts  # angegebenes build.mjs ausführen und Artefakte integrieren
npm run build          # aus lokalem Datensnapshot neu integrieren, ohne Temp-Dateien
npm test               # Browser-Integrationstest (nach npm install)
```

`scripts/build-experts.mjs` nutzt das vom Benutzer bereitgestellte Build-Skript
und dessen `load.mjs`. Über `ROOTPFAD_EXPERT_BUILD` kann ein anderer Pfad zum
Build-Skript angegeben werden. Die Markdown-Ausgabe und ein vollständiger
Datensnapshot liegen unter `content/expertenpfade/`. Ein erneuter HTML-Import
bindet die Expertenpfade aus diesem Snapshot automatisch wieder ein.

## Original-HTML erneut importieren

```sh
python3 scripts/import-source.py /Users/dennis/Downloads/ROOTPFAD_pro.html
```

Dabei werden `index.html` und die aus dem Export erzeugten Assets überschrieben.
