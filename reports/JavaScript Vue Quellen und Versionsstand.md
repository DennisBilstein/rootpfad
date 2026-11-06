# JavaScript und Vue auf belastbare Quellen stützen

**Für den Stichtag 06.11.2026 belegen die recherchierten Primärendpunkte Vue 3.5.45, Vite 8.3.6, Pinia 4.1.0, Vue Router 5.4.0, Node.js 26.13.0 LTS und ECMAScript 2026.** Diese Angaben beschreiben den Rechercheabruf, nicht installierte Abhängigkeiten in ROOTPFAD. Der vorhandene Lehrbestand enthält keinen eigenständigen JavaScript-, Vue- oder TypeScript-Pfad; vorhanden sind konkrete Laravel-, UI5-, Git- und Grundlagenanschlüsse. Eine Erweiterung wäre deshalb eine neue, zustimmungspflichtige Struktur und keine bloße Aktualisierung bestehender Vue-Lektionen. Die kostenlosen Quellen unten reichen als Grundlage aus, aber kostenlose Lesbarkeit erlaubt nicht automatisch die Übernahme ihrer Texte. Besonders wichtig bleiben die abweichende Pinia-Dokumentationsversion und auffällige Node-Endpunkte. Dieser Bericht legt ausschließlich Quellen, Bewertungen, Bestandsbrücken und einen **unbestätigten Gliederungsvorschlag** vor; App-Dateien, Lektionen und Übungen bleiben unverändert. ([Vue](https://registry.npmjs.org/vue), [Vite](https://registry.npmjs.org/vite), [Pinia](https://registry.npmjs.org/pinia), [Router](https://registry.npmjs.org/vue-router), [Node](https://nodejs.org/dist/index.json), [Ecma](https://ecma-international.org/publications-and-standards/standards/ecma-262/), [lokaler Bestand](../assets/script-01.js))

## Sechs Versionsachsen brauchen getrennte Nachweise

Die Versionsrecherche wertete npm-`latest`, GitHub-Veröffentlichungen, Node-Veröffentlichungsdaten und die Ecma-Publikationsseite aus. Ein Branch-Dateistand allein beweist keinen veröffentlichten Release; ein Alpha-, Beta- oder RC-Tag bezeichnet keine stabile Grundlage. Die Abrufe stammen vom 06.11.2026; dynamische Links können anschließend andere Werte liefern. Veröffentlichungsdaten sind von Abrufdaten zu unterscheiden.

| Gegenstand | Stabiler Stand im Abruf | Veröffentlichung | Primärbeleg |
|---|---|---|---|
| Vue | **3.5.45** | 05.11.2026 | [npm](https://registry.npmjs.org/vue), [Release](https://github.com/vuejs/core/releases/tag/v3.5.45) |
| Vite | **8.3.6** | 05.11.2026 | [npm](https://registry.npmjs.org/vite), [Release](https://github.com/vitejs/vite/releases/tag/v8.3.6) |
| Pinia | **4.1.0** | 14.10.2026 | [npm](https://registry.npmjs.org/pinia), [Release](https://github.com/vuejs/pinia/releases/tag/v4.1.0) |
| Vue Router | **5.4.0** | 07.10.2026 | [npm](https://registry.npmjs.org/vue-router), [Release](https://github.com/vuejs/router/releases/tag/v5.4.0) |
| Node.js | **26.13.0, LTS „Lithium“** | 28.10.2026 | [Release-Index](https://nodejs.org/dist/index.json), [Übersicht](https://nodejs.org/en/about/previous-releases) |
| ECMAScript | **2026, ECMA-262, 17. Ausgabe** | Juni 2026; genauer Tag nicht belegt | [Publikation](https://ecma-international.org/publications-and-standards/standards/ecma-262/), [normative HTML-Fassung](https://262.ecma-international.org/17.0/index.html) |

**Pinia bleibt ein offener Dokumentationskonflikt:** Registry und Release belegen 4.1.0, die tatsächlich gelesene Dokumentationsnavigation nennt hingegen **v3.x**, der geprüfte v3-Branch 3.0.4. Das widerlegt den Registry-Release nicht, verifiziert aber auch keine aktuelle v4-Anleitung. Die Pinia-Quelle ist deshalb für Store-Grundkonzepte geeignet; konkrete v4-Syntax, Änderungen und Migrationsaussagen müssen vor einer Unterrichtsausarbeitung versionsbezogen nachgeprüft werden. Router ist anders gelagert: Seine Dokumentationsnavigation bezeichnet ausdrücklich v4.x/v5.x. ([Pinia-Dokumentation](https://pinia.vuejs.org/introduction.html), [v3-Paketdatei](https://raw.githubusercontent.com/vuejs/pinia/v3/packages/pinia/package.json), [Pinia-Release](https://github.com/vuejs/pinia/releases/tag/v4.1.0), [Router-Dokumentation](https://router.vuejs.org/introduction.html))

**Auch Node verlangt eine qualifizierte Lesart:** Der Index beginnt auffällig mit einer 27er-Alpha, während `dist/latest` Dateinamen für 26.13.0 liefert; der angenommene `latest-lts`-Alias lieferte 404. Die LTS-Einstufung folgt deshalb dem expliziten Indexfeld, der Releaseübersicht und dem Schedule, nicht einem Alias oder einer gewohnten Gerade/Ungerade-Regel. Das sind Befunde der Recherche, keine hier aufgelöste Erklärung für die Endpunktgestaltung. Der gelesene Schedule führt Node 26 als Active LTS, 24/22 als Maintenance und 20 als EOL. Vites Engine-Range `^20.19.0 || >=22.12.0` ist daher keine Empfehlung, eine bereits abgekündigte Node-Linie einzusetzen. ([Index](https://nodejs.org/dist/index.json), [latest](https://nodejs.org/dist/latest/SHASUMS256.txt), [Schedule](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json), [Vite](https://vite.dev/guide/))

Die ausgewerteten Engine-/Peer-Metadaten lassen die genannten Versionen zusammen zu; **ein integrierter Funktionstest wurde nicht durchgeführt**. Insbesondere beweist eine Vue-4-Peer-Range keinen stabil erschienenen Vue-4-Release. ECMAScript 2026 bleibt die veröffentlichte Sprachgrundlage; der laufende TC39-Text bezeichnet bereits ECMAScript 2027 als Draft und ist nicht dieselbe Jahresausgabe. ([Pinia-Peers](https://registry.npmjs.org/pinia/latest), [Router-Peers](https://registry.npmjs.org/vue-router/latest), [TC39-Draft](https://tc39.es/ecma262/multipage/))

## Vierzehn kostenlose Quellenpakete decken die Lücken ab

Alle folgenden Inhaltslinks wurden laut Recherchenotizen ohne Anmeldung abgerufen. **A/T/Q/P/D** bewertet Aktualität, Tiefe, Quellenautorität, Praxisbezug und didaktische Zugänglichkeit jeweils **von 1 bis 5**. Die Werte sind redaktionelle Einschätzungen, keine Lernerfolgsmessung; hohe Praxiswerte bedeuten sichtbare Beispiele oder Aufgaben, nicht getestete Ausführbarkeit. Zusammengefasste Anbieter bleiben als Pakete erkennbar. Die zusätzliche Didaktikbewertung gewichtet nachvollziehbare Einstiege gegenüber reinen Nachschlagewerken.

| Paket mit verifiziertem Inhaltslink | Zuordnung und Grenze | A/T/Q/P/D | Dokumentationslizenz / Übernahmegrenze |
|---|---|---|---|
| 1. [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) + [web.dev](https://web.dev/learn/javascript?hl=en) | Sprachbasis, Browserbezug; keine Vue-Lehre | 5/5/5/4/5 | MDN-Prosa CC BY-SA 2.5 oder später; Beispiele separat. web.dev-Prosa CC BY 4.0, Beispiele Apache 2.0; Ausnahmen beachten. |
| 2. [Ecma/TC39](https://262.ecma-international.org/17.0/index.html) | Normative Semantik; kein Anfängerlehrgang, kein DOM-Standard | 5/5/5/2/1 | Eigene Ecma-Dokumentbedingungen; keine pauschale MIT-Lizenz. |
| 3. [javascript.info](https://javascript.info/) | Zusammenhängender Sprach-/Browserkurs mit Aufgaben | 5/5/4/5/5 | Text CC BY-NC-SA; Websitebedingungen verlinken 3.0. Nichtkommerzielle Grenze beachten. |
| 4. [Node-Dokumentation](https://nodejs.org/api/documentation.html) | Laufzeit, Module, API-Stabilität; kein Frontend-Grundkurs | 5/5/5/4/3 | Geprüfte MIT-Lizenz umfasst zugehörige Dokumentationsdateien; Drittmaterial separat. |
| 5. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | Typen, Narrowing, Generics; setzt JavaScript voraus | 5/5/5/4/4 | Website-Dokumentation CC BY 4.0, Code separat MIT. |
| 6. [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) + [Prettier](https://prettier.io/docs/install) | Linting, Formatierung und CI; getrennte Aufgaben | 5/4/5/5/3 | ESLint-Docs nennen MIT; Prettier-Prosalizenz nicht separat belastbar verifiziert. |
| 7. [OWASP XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) + [WAI Tutorials](https://www.w3.org/WAI/tutorials/) / [APG](https://www.w3.org/WAI/ARIA/apg/) | Sicherheit, Semantik, Fokus/Tastatur; keine App-Zertifizierung | 5/5/5/5/3 | OWASP CC BY-SA 4.0; geprüfte WAI-Seiten verlinken W3C Software and Document License, andere Materialien abweichend. |
| 8. [Vue Guide](https://vuejs.org/guide/introduction.html), [Tutorial](https://vuejs.org/tutorial/), [API](https://vuejs.org/api/), [Beispiele](https://vuejs.org/examples/) | Hauptquelle für Vue 3, Komponenten und Reaktivität | 5/5/5/5/5 | Docs-Repository CC BY 4.0 außer Bildern; Core-MIT nicht auf Texte übertragen. |
| 9. [Vue TypeScript](https://vuejs.org/guide/typescript/overview.html), [Security](https://vuejs.org/guide/best-practices/security.html), [Accessibility](https://vuejs.org/guide/best-practices/accessibility.html) | Vue-spezifische Qualitätsanforderungen | 5/5/5/4/4 | Wie Vue-Docs; Bildrechte separat. |
| 10. [Vue Router](https://router.vuejs.org/introduction.html) | Navigation, Routen, Guards; v4/v5 sichtbar | 5/5/5/4/4 | Frei lesbar; eigenständige Prosalizenz hier nicht vollständig geprüft. |
| 11. [Pinia](https://pinia.vuejs.org/core-concepts/) | State, Getters, Actions, Setup-/Option-Stores | 3/5/5/4/4 | Frei lesbar; Dokumentationslizenz nicht separat abgesichert; v3/v4-Abgleich offen. |
| 12. [Vite](https://vite.dev/guide/) + [create-vue](https://raw.githubusercontent.com/vuejs/create-vue/main/README.md) | Devserver, Build, Generator und Projektstruktur | 5/5/5/5/4 | Vite-Prosalizenz offen; create-vue-Kern MIT, Templates laut eigener Lizenz CC0; Drittmaterial beachten. |
| 13. [Vitest](https://vitest.dev/guide/), [Vue Test Utils](https://test-utils.vuejs.org/guide/), [Playwright](https://playwright.dev/docs/intro) | Unit-, Komponenten- und E2E-Tests; verschiedene Ebenen | 5/5/5/5/4 | Docs frei lesbar; separate Prosalizenzen nicht vollständig geprüft. |
| 14. [Vue School Fundamentals](https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api) + [freeCodeCamp Composables](https://www.freecodecamp.org/news/how-vue-composables-work/) | Optionaler Videoeinstieg bzw. enges Einzelthema | 4/3/4/4/4 | Kein offenes Weiterveröffentlichungsrecht verifiziert; keine Downloads zusichern. |

Die Lizenzkennzeichnung beruht auf dokumentationsbezogenen Nachweisen: MDN trennt Prosa und Beispiele, Google ebenfalls; TypeScript trennt Website und Code. Bei Ecma ist die konkrete Editionslizenz maßgeblich. Für eine spätere Übernahme müssen Attribution, Share-Alike, Nichtkommerzialität und Bildausnahmen einzeln eingehalten werden. **Verlinken und eigenständig zusammenfassen ist die vorgesehene Quellenstrategie, nicht ungeprüftes Kopieren.** ([MDN-Lizenzrichtlinie](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license), [Google Site Policies](https://developers.google.com/terms/site-policies), [javascript.info-Bedingungen](https://javascript.info/terms), [Node-Lizenz](https://raw.githubusercontent.com/nodejs/node/main/LICENSE), [TypeScript Legal Notices](https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/README.md), [Ecma-Lizenzabschnitt](https://tc39.es/ecma262/multipage/copyright-and-software-license.html), [Vue-Docs-Lizenz](https://raw.githubusercontent.com/vuejs/docs/main/LICENSE), [create-vue-Lizenz](https://raw.githubusercontent.com/vuejs/create-vue/main/LICENSE), [W3C-Lizenz](https://www.w3.org/copyright/software-license-2023/))

**Nicht als kostenlose moderne Komplettkurse zugesagt** werden Vue Mastery, Scrimba und das sechsstündige freeCodeCamp-Video: Bei Mastery fehlt der sichere Gratisnachweis für alle Composition-Lektionen; Scrimbas Free-Metadaten ersetzen keinen auslesbaren Syntaxnachweis; beim Video belegt der Begleitartikel Composition API/`script setup` nicht ausreichend. Vue School kennzeichnet dagegen alle 14 Fundamentals-Lektionen als FREE, mit modernem Einstiegstext. **Keine Videowiedergabe wurde getestet**, auch dort nicht. Der Vue Style Guide bleibt ergänzend: Die italienische Fassung warnt vor veraltetem Inhalt, die gelesene englische Übersicht enthält diese Warnung nicht und Essential Rules zeigen Composition-Beispiele. ([Mastery](https://www.vuemastery.com/courses/intro-to-vue-3-comp-api/introduction-comp-api/), [Scrimba](https://scrimba.com/learn-vue-c0jrrpaasr), [fCC-Videoankündigung](https://www.freecodecamp.org/news/learn-vuejs-in-this-beginners-course/), [Vue-School-Einstieg](https://vueschool.io/lessons/getting-started-with-vue-js-and-the-composition-api), [Style Guide EN](https://vuejs.org/style-guide/), [IT](https://it.vuejs.org/style-guide/))

## Bestehende Lektionen sind Brücken, kein JavaScript-Pfad

Die Bestandsaufnahme ermittelte **109 Module, 411 Lektionen, Teile 1–22**, ohne eigenständigen JS-/Vue-/TS-Pfad. Sie wertete ausschließlich den Datenpräfix von `assets/script-01.js` vor `var VERSION` aus, ohne Browser-App-Ausführung. Die App-Metadaten 2.4 vom 09.10.2026 sind keine Toolchain-Versionen. Folgende IDs und Titel sind echte Anschlussstellen; ihre Zuordnung zu den Quellenpaketen ist neu vorgeschlagen, nicht bereits implementiert. ([Primärbestand](../assets/script-01.js), [Extraktionsnotizen](../research_notes/JavaScript%20Vue%20Quellen%20und%20Versionsstand/curriculum.md))

| Tatsächliche bestehende Lektion: ID und unveränderter Titel | Brücke / Quellenpakete |
|---|---|
| `m1-l2` Die drei Kontrollstrukturen; `m1-l3` Variablen, Datentypen und Operatoren; `m1-l4` Arrays und Indizes – die Off-by-one-Falle | Sprachunabhängiger Einstieg → 1–3 |
| `m4-l1` Der Trockenlauf – die wichtigste Prüfungstechnik; `m4-l2` Fehlersuche in vorgegebenem Code; `m4-l3` Testverfahren: Black Box, White Box, Äquivalenzklassen | Debugging-/Testvorwissen → 1, 13 |
| `m34-l1` Klasse, Objekt, Attribut, Methode; `m34-l5` Konstruktor, Objektlebenszyklus und Referenzen | Objektbegriffe; nicht mit JS-Prototypen gleichsetzen → 1–3 |
| `m45-l1` Installation, Projektstruktur und Konfiguration; `m45-l3` Controller und Blade-Templates | Laravel-/Template-Kontext → 8, 12 |
| `m56-l1` Blade-Komponenten bauen; `m56-l2` Vite, CSS und JavaScript einbinden; `m56-l3` Livewire: interaktiv ohne eigenes JavaScript; `m56-l4` Formulare mit gutem Nutzererlebnis | Stärkster Frontend-Anschluss, aber kein Vue-Kurs → 8, 9, 12 |
| `m43-l1` Formulare verarbeiten und Ausgaben absichern; `m43-l2` Sessions, Cookies und Passwörter | PHP-Sicherheitsvorwissen → 7, 9 |
| `m47-l1` Validierung und Form Requests; `m47-l2` Authentifizierung, Middleware und CSRF; `m47-l3` Autorisierung mit Gates und Policies | Backend-/Sicherheitsgrenze → 7, 9 |
| `m48-l1` API-Routen, Ressourcen und Statuscodes; `m48-l2` Token-Authentifizierung mit Sanctum; `m48-l3` Rate Limiting, Fehlerformat und Idempotenz | Frontend-API-Vertrag → 1, 7, 10 |
| `m54-l2` JSON sauber verarbeiten; `m54-l3` HTTP-Anfragen an andere Dienste; `m54-l4` Fehler, Exceptions und Logging in der Praxis | PHP-seitiger Anschluss, keine Fetch-Lektion → 1, 3 |
| `abap-m13-quellen-fiori-ux-und-elements-list-report-und-object-page-mit-fiori-tools` Fiori UX und Elements: List Report und Object Page mit Fiori Tools; `abap-m13-quellen-javascript-und-ui5-brucke-model-xml-view-und-controller` JavaScript- und UI5-Brücke: Model, XML-View und Controller | Model/Binding/Events vergleichen, UI5 nicht Vue nennen → 1, 8 |
| `m24-l2` Open Source, Urheberrecht und freie Software; `m24-l4` Inbetriebnahme, Übergabe und Barrierefreiheit | Lizenz-/Accessibility-Vorwissen → 7, 9 |
| `m61-l5` .gitignore und was nie ins Repository gehört; `m63-l2` Pull Requests und Code-Review; `m63-l4` Branch-Schutz, CI und Releases; `m64-l4` Hooks: Qualität automatisch prüfen | Toolchain-Hygiene und Qualitätsprüfung → 6, 12, 13 |

## Vierzehn vorgeschlagene Einheiten bleiben ausdrücklich unbestätigt

**PROPOSED / NICHT FREIGEGEBEN:** Die Nummern sind nur Diskussionspositionen, keine realen Modul- oder Lektions-IDs. Diese Gliederung verändert weder `PARTS` noch `MODULES`; sie enthält keine ausgearbeiteten Lektionen. HTML-/CSS-Grundkenntnisse sind Voraussetzung des offiziellen Vue-Tutorials, nicht durch die PHP-Brücken automatisch nachgewiesen. ([Tutorial-Voraussetzungen](https://raw.githubusercontent.com/vuejs/docs/main/src/tutorial/src/step-1/description.md))

| Position | Vorgeschlagene Lerneinheit | Quellenpakete |
|---|---|---|
| 1 | JavaScript-Sprachbasis: Werte, Variablen, Kontrollfluss | 1–3 |
| 2 | Funktionen, Scope, Closures und Callbacks | 1–3 |
| 3 | Objekte, Arrays, Referenzen, Prototypen und `this` | 1–3 |
| 4 | ESM und asynchrones JavaScript: Promises, async/await, Event Loop | 1–4 |
| 5 | Browser: DOM, Events, Formulare, Fetch, CORS und Storage | 1, 3, 7 |
| 6 | Node/npm, Lockfiles, Vite/create-vue, ESLint und Prettier | 4, 6, 12 |
| 7 | TypeScript-Grundlagen für Vue | 5, 9 |
| 8 | Vue-Einstieg: SFC, Templates, Direktiven und API-Stile | 8, 14 |
| 9 | Reaktivität, computed, Watcher und Lifecycle | 8 |
| 10 | Komponentenverträge: Props, Emits, Slots und Formulare | 8, 9 |
| 11 | Composables und wiederverwendbare Logik | 8, 14 |
| 12 | Vue Router, Navigation und API-Anbindung | 1, 10 |
| 13 | Pinia und Zustandsarchitektur, mit offenem v4-Abgleich | 11 |
| 14 | Tests, Sicherheit, Barrierefreiheit und Build-/Releaseprüfung | 7, 9, 12, 13 |

Für spätere Materialauswahl gilt: **Options API bleibt unterstützt**, `var` bleibt gültige ECMAScript-Syntax, und Callback-APIs bleiben gültige asynchrone APIs. Composition API mit SFC/`script setup` ist eine begründete neue Schwerpunktsetzung, keine Abschaffung dieser Alternativen. Vuex befindet sich im Wartungskontext mit Pinia als Empfehlung für neue Projekte; Vue CLI ist im Maintenance Mode, Vue 2 dagegen seit 31.12.2023 EOL. ([Vue-FAQ](https://vuejs.org/guide/extras/composition-api-faq.html#will-options-api-be-deprecated), [ECMA-262](https://262.ecma-international.org/17.0/index.html#sec-variable-statement), [Node-Callbacks](https://nodejs.org/api/fs.html#callback-api), [Vuex](https://vuex.vuejs.org/), [CLI](https://cli.vuejs.org/), [Vue-2-EOL](https://v2.vuejs.org/eol/))

Eine wichtige Versionsfalle gehört in die Quellenprüfung: Seit Vue 3.5 bleiben direkt aus `defineProps()` destrukturierte Bindings im selben `script setup` durch **Compiler-Umschreibung** reaktiv. Das ist keine allgemeine Eigenschaft von JavaScript-Destrukturierung. Bei primitiven Eigenschaften eines beliebigen `reactive()`-Objekts kann Destrukturierung weiterhin die reaktive Verbindung trennen. ([Props-Sonderregel](https://vuejs.org/api/sfc-script-setup.html#reactive-props-destructure), [reactive-Grenzen](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive))

## Empfehlung und Freigabe

Ich empfehle die offiziellen Dokumentationen als verbindliche Referenz, MDN/javascript.info als Sprachlernquellen und Vue School ausschließlich als optionale Ergänzung. Vor späterer Ausarbeitung sollten der Pinia-v4-Dokumentationsabgleich, eine reale Toolchain-Probe und die Lizenzprüfung tatsächlich übernommener Materialien abgeschlossen werden. Die bewusste Trennung zwischen belegtem Bestand und neuer Gliederung verhindert, dass Quellenrecherche versehentlich als Änderungsauftrag ausgeführt wird.

**Bestätigst du die vorgeschlagene JavaScript-/Vue-Struktur mit 14 Einheiten und dieser Quellenzuordnung, oder möchtest du sie anders zuschneiden? Bis zu deinem „weiter“ folgen keine Codebeispiele, Lektionsausarbeitungen oder App-Änderungen.**
