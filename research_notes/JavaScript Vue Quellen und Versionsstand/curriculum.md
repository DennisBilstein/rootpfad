# ROOTPFAD: tatsächlicher JavaScript-/Vue-Anschlussbestand

## Gibt es bereits einen eigenständigen JS-/Vue-/TS-Pfad?

### Takeaway
Nein. Der am 06.11.2026 geprüfte Datenbestand enthält 109 Module, 411 Lektionen und die Teile 1–22; JavaScript kommt als Laravel-Frontend-Anschluss und als SAPUI5-Brücke vor, nicht als eigenständiger Sprach- oder Vue-Pfad. Grundlage ist ausschließlich der in Node `vm` ausgeführte Präfix von `assets/script-01.js` vor dem ersten `var VERSION`, ohne Browser-Laufzeit oder Anwendungsausführung. — [lokale Primärquelle](../../assets/script-01.js)

### Cited Findings
- `PARTS` enthält `[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]`; der extrahierte letzte Themenbereich ist Java/Spring Boot. Kein Modul-/Teiltitel bezeichnet JavaScript, Vue oder TypeScript als eigenen Pfad. Nur drei Lektionstitel treffen auf `javascript|vue|typescript|eslint|prettier|vite|node\.js` zu; sie sind unten aufgeführt. — [Datenquelle: MODULES, PARTS](../../assets/script-01.js)
- Die außerhalb des VM-Präfixes lediglich als Text gelesenen Metadaten lauten `VERSION = '2.4'`, `VERSION_DATUM = '2026-10-09'` (Zeilen 14727–14728). Das ist die App-Versionsangabe, **keine** belegte JS-, Vue-, Node- oder TypeScript-Version. — [Metadaten](../../assets/script-01.js)

### Inferences
- Ein zukünftiger JS-/Vue-Pfad wäre eine neue Curriculum-Erweiterung. Die untenstehenden bestehenden IDs sind Anschlussstellen, keine bereits vorhandenen JS-Grundlagenmodule. Vorgegebene Wunschgliederungen wurden nicht als Ist-Bestand übernommen.

### Gaps
- Aus dem Curriculum allein folgen keine installierten Toolchain-Versionen, Browser-Zielversionen oder Abhängigkeiten. Keine Paketinstallation und keine App-Änderung vorgenommen.

## Welche vorhandenen IDs und Titel sind wirklich anschlussfähig?

### Takeaway
Die stärksten direkten Anschlüsse liegen in Teil 10 „PHP & Laravel“, Teil 11 „Git & Zusammenarbeit“ und der bestehenden UI5-Brücke in Teil 14. Allgemeine AP1-Module liefern sprachunabhängige Voraussetzungen. — [lokale Primärquelle](../../assets/script-01.js)

### Cited Findings
Alle folgenden IDs und Titel wurden unverändert aus `MODULES` extrahiert. — [gemeinsamer Beleg](../../assets/script-01.js)

| Modul-ID · tatsächlicher Modultitel | Relevante tatsächliche Lektionen | Einordnung |
|---|---|---|
| `m56` · Fortgeschritten · Blade-Komponenten und Frontend | `m56-l1` Blade-Komponenten bauen; `m56-l2` Vite, CSS und JavaScript einbinden; `m56-l3` Livewire: interaktiv ohne eigenes JavaScript; `m56-l4` Formulare mit gutem Nutzererlebnis | Wichtigster Frontend-Anschluss, aber Laravel/Blade/Livewire, kein Vue-Kurs. `m56-l2` behandelt npm dev/build, HMR, `@vite`, Manifest; `m56-l3` nennt Inertia + Vue/React nur im Vergleich. |
| `m45` · Fortgeschritten · Laravel-Einstieg | `m45-l1` Installation, Projektstruktur und Konfiguration; `m45-l2` Request-Lebenszyklus und Routing; `m45-l3` Controller und Blade-Templates | Server-/Template-Kontext. |
| `m47` · Fortgeschritten · Validierung, Authentifizierung und Rechte | `m47-l1` Validierung und Form Requests; `m47-l2` Authentifizierung, Middleware und CSRF; `m47-l3` Autorisierung mit Gates und Policies | Backend-Grenze und Session-/CSRF-Verständnis. |
| `m48` · Experte · REST-APIs mit Laravel | `m48-l1` API-Routen, Ressourcen und Statuscodes; `m48-l2` Token-Authentifizierung mit Sanctum; `m48-l3` Rate Limiting, Fehlerformat und Idempotenz | Vertrag fürs Frontend; `m48-l2` unterscheidet API-Token und cookiegestützte SPA-Authentifizierung. |
| `m43` · Einsteiger · PHP im Web: Formulare, Sessions, Datenbank | `m43-l1` Formulare verarbeiten und Ausgaben absichern; `m43-l2` Sessions, Cookies und Passwörter | Sicherheitsvorwissen, PHP statt Browser-JS. |
| `m54` · Fortgeschritten · Dateien, JSON, HTTP und Fehler | `m54-l2` JSON sauber verarbeiten; `m54-l3` HTTP-Anfragen an andere Dienste; `m54-l4` Fehler, Exceptions und Logging in der Praxis | PHP-seitige Anschlusskonzepte; keine Fetch-Lektion. |
| `abap-m13` · Fiori Elements & UI-Erweiterbarkeit | `abap-m13-quellen-fiori-ux-und-elements-list-report-und-object-page-mit-fiori-tools` Fiori UX und Elements: List Report und Object Page mit Fiori Tools; `abap-m13-quellen-javascript-und-ui5-brucke-model-xml-view-und-controller` JavaScript- und UI5-Brücke: Model, XML-View und Controller | Zweite Lektion zeigt JSONModel, XML-Binding, `sap.ui.define`, `onInit`, Eventhandler und `this`; ausdrücklich keine vollständige lauffertige App und kein Vue. |
| `m1` · Pseudocode & Kontrollstrukturen | `m1-l2` Die drei Kontrollstrukturen; `m1-l3` Variablen, Datentypen und Operatoren; `m1-l4` Arrays und Indizes – die Off-by-one-Falle | Sprachunabhängige Grundlagen. |
| `m4` · Trockenlauf & Fehlersuche | `m4-l1` Der Trockenlauf – die wichtigste Prüfungstechnik; `m4-l2` Fehlersuche in vorgegebenem Code; `m4-l3` Testverfahren: Black Box, White Box, Äquivalenzklassen | Test-/Debugging-Vorwissen. |
| `m34` · Objektorientierte Grundlagen | `m34-l1` Klasse, Objekt, Attribut, Methode; `m34-l4` Polymorphie und Schnittstellen; `m34-l5` Konstruktor, Objektlebenszyklus und Referenzen | Nicht mit dem JS-Prototypmodell gleichsetzen. |
| `m24` · Software, Lizenzen & Inbetriebnahme | `m24-l2` Open Source, Urheberrecht und freie Software; `m24-l4` Inbetriebnahme, Übergabe und Barrierefreiheit | Lizenz-/Accessibility-Vorwissen. |
| `m61` · Git · Grundlagen | `m61-l5` .gitignore und was nie ins Repository gehört | Toolchain-Hygiene. |
| `m63` · Git · Remote und Teamarbeit | `m63-l2` Pull Requests und Code-Review; `m63-l4` Branch-Schutz, CI und Releases | Zusammenarbeit/CI. |
| `m64` · Git · Fehler beheben und Profi-Werkzeuge | `m64-l4` Hooks: Qualität automatisch prüfen | Anschluss für Lint-/Formatprüfungen, kein bestehender ESLint-Kurs. |

### Inferences
- Bestehende API-, Formular-, Git- und Sicherheitsinhalte sind referenzierbar; ein JavaScript-Sprachkern lässt sich daraus nicht als bereits vorhanden ableiten.

### Gaps
- Kein eigenständiges JS-/Vue-/TypeScript-Modul nachweisbar: fehlende strukturierte Lehre zu Scope/Closures, Prototypen/`this`, ESM, Promises/async/Event Loop, DOM/Events/Fetch/CORS und Browser-Storage.
- Keine dedizierten Lektionen für Vue-Reaktivität, Composition API, SFC, Komponentenverträge, Router/State, Vue-Tests oder Vue-/TS-Integration nachweisbar.
- Keine dedizierten Lektionen für TypeScript-Narrowing/Generics/`tsconfig`, Node-/npm-Lebenszyklen/Lockfiles, ESLint Flat Config und Prettier nachweisbar. Vite existiert bereits, aber im Laravel-Kontext.
- Diese Lücken beschreiben den abgegrenzten Curriculum-Bestand, nicht das Nichtvorhandensein jeder beiläufigen Erwähnung in allen Textfeldern. Keine neuen Lektionen ausgearbeitet.
