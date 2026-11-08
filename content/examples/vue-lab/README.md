# ROOTPFAD JavaScript-/Vue-Lernlabor

Eigenes zusammenhängendes Beispiel für `js-m1-l6` bis `js-m1-l16`.
Code und Fachbegriffe Englisch, Oberfläche und Erklärungen Deutsch.

```sh
npm ci
npm test
npm run build
npm run dev
```

Der Devserver bindet nur lokal an Port 5190. Paketstände stehen in package-lock.json.
Verwendet werden Vue 3.5, Vue Router 5, Pinia 4, Vite 8 und TypeScript.
Die Grund-APIs des Pinia-Stores wurden nicht nur aus der teilweise älteren
Dokumentationsnavigation übernommen, sondern mit den installierten Paketen getestet.
Die Overrides für glob/minimatch beheben gemeldete transitive Auditbefunde der
Testwerkzeuge; Tests und Build müssen nach jedem Update erneut laufen.

## Lehrgrenzen

- Aufgaben leben im Arbeitsspeicher; kein Multiuser-Backend und keine echte Auth.
- Demo-Import liest `public/tasks.json` und ersetzt die lokale Liste.
- `Math.max`-IDs sind nur für diese lokale Demo, keine verteilte ID-Strategie.
- TypeScript ersetzt keine Laufzeitvalidierung: `parseTasks` prüft Fremddaten.
- API-Composable behandelt HTTP-Fehler, Schemafehler, Abbruch und alte Antworten.
- Guards, UI-Filter und Stores ersetzen keine Backend-Autorisierung.
- Client-Konfiguration ist öffentlich; niemals echte Secrets in VITE_-Variablen.

## Dateien und Lernverträge

`domain.ts` → Datenvertrag; `stores/tasks.ts` → State/Aktionen;
`TaskItem.vue` → Props/Emits/Slots; `useTaskApi.ts` → API-/Lifecyclegrenze;
`router.ts` → Navigation; `TasksView.vue` → vertikaler Anwendungsfall.
`tests/learning.spec.ts` prüft Validierung, Store, UI, Prop-Vertrag und API-Races.

Die App ist ein Lehrlabor, kein automatisch barrierefreies oder produktionsreifes
Produkt. Manuelle Tastatur-/Screenreaderprüfung und produktives Hosting sind
eigene Abnahmen. Der Nuxt-/OData-Ausblick ist noch keine zweite fertige App.
