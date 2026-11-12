# ROOTPFAD JavaScript-/Vue-Lernlabor

Eigenes zusammenhängendes Beispiel für `js-m1-l6` bis `js-m1-l16`. Seit 12.11.2026 zusätzlich
die Belege für `js-m2` (Komponenten-Architektur, `src/lessons/components`, `src/lessons/injection`,
`tests/components.spec.ts`) und `js-m3` (Formulare und Serverdaten mit Zod 4 und TanStack Query,
`src/lessons/forms`, `src/lessons/data`, `tests/data.spec.ts`, `tests/fakeServer.ts`) sowie `js-m4`
(Vue für Fortgeschrittene): `src/lessons/router` (Guards, `tests/router-guards.spec.ts`), `auth` (Token-Erneuerung gegen
`tests/fakeAuthServer.ts`, `tests/auth.spec.ts`), `modern` (`tests/modern-apis.spec.ts`), `reactivity`
(`tests/reactivity-pitfalls.spec.ts`), `dynamic-forms` (`tests/invite-schema.spec.ts`, `tests/dynamic-forms.spec.ts`) und
`infinite` (`tests/infinite.spec.ts`). Die Anmeldung ist eine Client-Simulation ohne echtes Backend.
Code und Fachbegriffe Englisch, Oberfläche und Erklärungen Deutsch.

```sh
npm ci
npm test
npm run build
npm run dev
```

Der Devserver bindet nur lokal an Port 5190. Paketstände stehen in package-lock.json.
Verwendet werden Vue 3.5, Vue Router 5, Pinia 4, Vite 8 und TypeScript sowie zod 4.6.7
und @tanstack/vue-query 5.107.1 (beide MIT, exakt festgelegt). Die jsdom-Tests ersetzen
`showModal`, `close` und `matchMedia` durch Nachbildungen und Transition-Komponenten durch Stubs:
Dialog-Fokus, Esc und Animation müssen zusätzlich manuell im Browser geprüft werden.
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
