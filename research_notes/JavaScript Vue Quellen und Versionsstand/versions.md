# JavaScript/Vue: verifizierter Versionsstand und Quellenzuordnung

## 1. Welche stabilen Versionen sind zum 06.11.2026 tatsächlich belegt?

### Takeaway
Umgebungs-/Auftragsdatum ist **06.11.2026**. Die tatsächlich abgerufenen npm-, GitHub- und Node-Endpunkte liefern ebenfalls November-2026-Evidenz (HTTP-Date am 06.11.2026, ca. 15:47 UTC): **Vue 3.5.45, Vite 8.3.6, Pinia 4.1.0, Vue Router 5.4.0, Node 26.13.0 LTS und ECMAScript 2026**. Es handelt sich hier nicht um eine Hochrechnung aus einem älteren Wissensstand; die nachstehenden Versionen wurden live aus Primärquellen gelesen. [npm Vue](https://registry.npmjs.org/vue), [npm Vite](https://registry.npmjs.org/vite), [npm Pinia](https://registry.npmjs.org/pinia), [npm Router](https://registry.npmjs.org/vue-router), [Node-Index](https://nodejs.org/dist/index.json), [Ecma](https://ecma-international.org/publications-and-standards/standards/ecma-262/)

### Cited Findings

| Gegenstand / Zuordnung | Verifizierter stabiler Stand | Veröffentlichungsdatum | Primärbelege |
| --- | --- | --- | --- |
| Vue, Framework | **3.5.45**, npm `latest`; GitHub `prerelease: false` | GitHub 05.11.2026, 09:15:06 UTC; npm 09:16:21.383 UTC | [Release](https://github.com/vuejs/core/releases/tag/v3.5.45), [npm mit `time` und `dist-tags`](https://registry.npmjs.org/vue) |
| Vite, Entwicklungsserver/Build | **8.3.6**, npm `latest`; GitHub `prerelease: false` | GitHub 05.11.2026, 05:39:36 UTC; npm 05:40:52.195 UTC | [Release](https://github.com/vitejs/vite/releases/tag/v8.3.6), [npm](https://registry.npmjs.org/vite), [Guide zeigt v8.3.6](https://vite.dev/guide/) |
| Pinia, Zustandsverwaltung | **4.1.0**, npm `latest`; GitHub `prerelease: false` | GitHub 14.10.2026, 09:22:48 UTC; npm 09:23:41.844 UTC | [Release](https://github.com/vuejs/pinia/releases/tag/v4.1.0), [npm](https://registry.npmjs.org/pinia) |
| Vue Router, Routing | **5.4.0**, npm `latest`; GitHub `prerelease: false` | GitHub 07.10.2026, 15:33:16 UTC; npm 15:34:51.836 UTC | [Release](https://github.com/vuejs/router/releases/tag/v5.4.0), [npm](https://registry.npmjs.org/vue-router) |
| Node.js, Laufzeit/Toolchain | **26.13.0**, LTS **Lithium** | 28.10.2026 | [Release-Index mit `lts: "Lithium"`](https://nodejs.org/dist/index.json), [offizielle Versionsübersicht](https://nodejs.org/en/about/previous-releases), [`latest`-Dateinamen](https://nodejs.org/dist/latest/SHASUMS256.txt) |
| ECMAScript, Sprachstandard | **ECMAScript 2026 / ECMA-262, 17. Ausgabe** | **Juni 2026**, kein verifizierter genauer Tag | [Ecma-Publikationsseite](https://ecma-international.org/publications-and-standards/standards/ecma-262/), [normative HTML-Ausgabe 17.0](https://262.ecma-international.org/17.0/index.html) |

- **Stabil und Vorabversion nicht vermischen:** Vue `rc` zeigt auf **3.6.0-rc.14** (npm 30.10.2026, GitHub `prerelease: true`), `beta` auf 3.6.0-beta.17, `alpha` auf 3.6.0-alpha.7. Vue 3.6 ist damit über diese Endpunkte **nicht** als stabile Standardversion belegt. `legacy` und `v2-latest` zeigen auf 2.7.16. [npm](https://registry.npmjs.org/vue), [RC-Release](https://github.com/vuejs/core/releases/tag/v3.6.0-rc.14)
- **Dist-Tags sind keine zuverlässige zeitliche Sortierung:** Vite hat neben `latest: 8.3.6` noch `beta: 8.3.0-beta.1`, `alpha: 6.0.0-alpha.24`, `previous: 6.4.5`. Pinia hat `next: 2.0.0-rc.10` (2021) und `beta: 2.1.8-beta.0` (2024), obwohl `latest` bereits 4.1.0 ist. Router hat `next: 4.0.13` (2022), `edge: 4.4.0-alpha.3`, `beta: 5.0.0-beta.2`, `legacy: 3.6.5`, aber `latest: 5.4.0`. Nicht pauschal `next` oder `beta` als „aktueller“ empfehlen. [Vite npm](https://registry.npmjs.org/vite), [Pinia npm](https://registry.npmjs.org/pinia), [Router npm](https://registry.npmjs.org/vue-router)
- **Node latest vs. LTS vs. Alpha:** Der erste Eintrag des Release-Index ist **v27.0.0-alpha.0.0.0 vom 29.10.2026**, `lts: false`; die Versionsübersicht nennt ihn ausdrücklich **Alpha**. Das ist nicht die neueste stabile Node-Version. Der offizielle `dist/latest/SHASUMS256.txt` nennt **v26.13.0**; derselbe Stand ist im Index LTS. Neueste stabile und neueste LTS fallen damit beim Abruf zusammen. [Index](https://nodejs.org/dist/index.json), [Übersicht](https://nodejs.org/en/about/previous-releases), [latest](https://nodejs.org/dist/latest/SHASUMS256.txt)
- **Publizierter Standard ≠ fortlaufender Entwurf:** Ecma bezeichnet die 17. Ausgabe vom Juni 2026 als veröffentlichten Standard und ihre HTML-Fassung als normative Kopie. Die Seite verweist getrennt auf `tc39.es/ecma262` als neuesten **Entwurf**; diesen nicht als identische, bereits publizierte Jahresausgabe behandeln. [Ecma](https://ecma-international.org/publications-and-standards/standards/ecma-262/)

### Inferences
- Für eine erst nach Bestätigung zu erstellende Quellen-/Technologiegrundlage sind die stabilen Werte dieser Tabelle die Kandidaten, nicht die jeweiligen Alpha-/Beta-/RC-Tags. Es wurden keine Pakete installiert oder Anwendungstests ausgeführt. [Versionsevidenz Vue](https://registry.npmjs.org/vue), [Vite](https://registry.npmjs.org/vite), [Pinia](https://registry.npmjs.org/pinia), [Router](https://registry.npmjs.org/vue-router)

### Gaps
- Kein Datumskonflikt zwischen Auftragsdatum und den beim Abruf gelieferten Release-/Registry-Daten festgestellt. Falls andere Teilrecherchen ältere Stände liefern, diese **nicht stillschweigend zusammenführen**, sondern deren Abrufzeit und Primärendpunkt gegenüberstellen. HTTP-Date ist Abruf-/Serverzeit, kein eigenständiges Publikationsdatum; die Publikationsdaten oben stammen aus npm `time`, GitHub `published_at` bzw. Node `date`.
- `https://nodejs.org/dist/latest-lts/SHASUMS256.txt` lieferte **404**. Die LTS-Aussage ist daher ausdrücklich über Indexfeld, offizielle Übersicht und Release-Schedule abgesichert, nicht über einen angenommenen funktionierenden `latest-lts`-Alias.
- Für ECMAScript 2026 ist in der abgerufenen Publikationsseite nur **Juni 2026** belegt; kein genauer Tag wird erfunden. [Ecma](https://ecma-international.org/publications-and-standards/standards/ecma-262/)

## 2. Welche Node-Supportzeiträume und Kompatibilitätsgrenzen sind relevant?

### Takeaway
Für neue Arbeit ist **Node 26 LTS** der aktuelle belegte LTS-Kandidat; Node 24 und 22 befinden sich nach dem offiziellen Schedule bereits in Maintenance LTS. Die Mindestanforderung von Vite ist nicht mit einer Sicherheitsempfehlung gleichzusetzen: Node 20 erfüllt gegebenenfalls die Engine-Range, ist am Stichtag aber bereits EOL. [Schedule](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json), [Vite npm](https://registry.npmjs.org/vite), [Vite Guide](https://vite.dev/guide/)

### Cited Findings

| Node-Linie | Status am 06.11.2026 aus Schedule abgeleitet | LTS-Beginn | Maintenance ab | Supportende (Schedule) |
| --- | --- | --- | --- | --- |
| 26, Lithium | Active LTS; Index: neueste LTS 26.13.0 | 28.10.2026 | 20.10.2027 | **30.04.2029** |
| 24, Krypton | Maintenance LTS; Index: 24.22.2 vom 27.10.2026 | 28.10.2025 | 20.10.2026 | **30.04.2028** |
| 22, Jod | Maintenance LTS | 29.10.2024 | 21.10.2025 | **30.04.2027** |
| 20, Iron | EOL | 24.10.2023 | 22.10.2024 | **30.04.2026** |
| 25 | EOL, keine LTS | — | 01.04.2026 | **01.06.2026** |
| 27 | Alpha vorhanden; stabile Veröffentlichung laut Schedule erst 22.04.2027 | geplant 20.10.2027 | nicht angegeben | geplant **30.04.2030** |

Quelle für sämtliche Schedule-Daten und daraus am Stichtag abgeleitete Phasen: [nodejs/Release schedule.json](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json); konkrete bereits erschienene Versionen: [Node-Index](https://nodejs.org/dist/index.json). Künftige Termine sind **Planungsdaten**, keine Garantie einer künftigen Veröffentlichung.

- **Vite 8.3.6 `engines.node`: `^20.19.0 || >=22.12.0`**. Exakte Bedeutung: 20.x ab 20.19.0 oder >=22.12.0; nicht beliebiges Node 20/22 und nicht Node 21. Der Guide formuliert 20.19+, 22.12+ und warnt, dass einzelne Templates höhere Versionen erfordern können. [Registry](https://registry.npmjs.org/vite), [Guide](https://vite.dev/guide/)
- **Pinia 4.1.0** deklariert Vue **`^3.5.11`**, TypeScript **`>=5.6.0`** (optional) und `@vue/devtools-api` **`^8.2.1`** (nicht optional). **Router 5.4.0** deklariert Vue **`^3.5.34 || ^4.0.0`**; die zusätzlichen Peers Vite `^7.3.0 || ^8.0.0`, Pinia `^3.0.4 || ^4.0.2`, `@pinia/colada >=0.21.2` und `@vue/compiler-sfc ^3.5.34 || ^4.0.0` sind laut `peerDependenciesMeta` **optional**. Vue 4 in einer Range ist **kein** Beleg für einen stabil erschienenen Vue-4-Release. [Pinia-Metadaten](https://registry.npmjs.org/pinia/latest), [Router-Metadaten](https://registry.npmjs.org/vue-router/latest)

### Inferences
- Node 26.13.0, Vue 3.5.45, Vite 8.3.6, Pinia 4.1.0 und Router 5.4.0 erfüllen die oben ausgewerteten Engine-/Peer-Ranges. Das ist eine **Metadaten-Kompatibilitätsprüfung**, kein integrierter Laufzeittest. Nicht bei „Node 20.19+“ stehenbleiben, da die offizielle Supportfrist von Node 20 abgelaufen ist. [Vite](https://registry.npmjs.org/vite), [Pinia](https://registry.npmjs.org/pinia/latest), [Router](https://registry.npmjs.org/vue-router/latest), [Schedule](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json)

### Gaps
- Keine vollständige Prüfung aller transitiven Abhängigkeiten, Plugins oder existierenden Projekt-Lockfiles; sie liegt außerhalb dieses reinen Quellenauftrags. Die Engine-Felder von Vue/Pinia/Router waren in der ausgewerteten Registry-Antwort nicht gesetzt; daraus keine erfundene Node-Mindestversion ableiten.

## 3. Welche Einordnung verhindert irreführende Modernisierungsbehauptungen?

### Takeaway
„Für neue Projekte empfohlen“, „weiterhin gültig“, „Maintenance“ und „EOL“ sind unterschiedliche Kategorien. Insbesondere sind **Options API, `var` und Callback-APIs nicht entfernt**; gleichzeitig sind **Vue 2 EOL** und die Empfehlung zu **Pinia sowie create-vue/Vite** für neue Projekte ausdrücklich dokumentiert. [Vue-FAQ](https://vuejs.org/guide/extras/composition-api-faq.html#will-options-api-be-deprecated), [ECMA-262](https://262.ecma-international.org/17.0/index.html#sec-variable-statement), [Node fs](https://nodejs.org/api/fs.html#callback-api), [Vue 2 EOL](https://v2.vuejs.org/eol/), [Vuex](https://vuex.vuejs.org/), [Vue CLI](https://cli.vuejs.org/)

### Cited Findings

| Thema / spätere Quellenzuordnung | Belegte Einordnung, keine Unterrichtsausarbeitung | Offizielle Quelle |
| --- | --- | --- |
| Options API vs. Composition API | FAQ: **keine Pläne, Options API zu deprecaten**; integraler Teil von Vue, solide Wahl für geringe bis mittlere Komplexität. Composition API bringt u. a. Vorteile bei Wiederverwendung, Organisation und Typinferenz. Nicht „Options API ist veraltet/abgeschafft“ schreiben. | [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html#will-options-api-be-deprecated) |
| `<script setup>` | Compile-time syntactic sugar für Composition API in SFCs, dort empfohlene Syntax; kein Beweis dafür, dass normale `<script>`-Komponenten ungültig seien. | [SFC API](https://vuejs.org/api/sfc-script-setup.html) |
| Vue 2 | Offizielles EOL **31.12.2023**; keine neuen Features/Updates/Fixes aus der regulären Wartung. Letzte Vue-2-Version **2.7.16**. Separates kommerzielles Extended Support wird angeboten. | [EOL-Seite](https://v2.vuejs.org/eol/) |
| Vuex | Pinia ist neuer Default. Vuex 3/4 sollen weiter gewartet werden, neue Funktionalität ist unwahrscheinlich. Für neue Projekte empfiehlt die offizielle Seite Pinia. Nicht „Vuex wurde entfernt“ oder ohne Einschränkung „Vuex EOL“ behaupten. | [Vuex-Startseite](https://vuex.vuejs.org/) |
| Vue CLI | **Maintenance Mode**. Für neue Projekte empfiehlt die Seite **create-vue** zum Erzeugen Vite-basierter Projekte. Maintenance ≠ nicht mehr ausführbar. | [Vue CLI](https://cli.vuejs.org/) |
| `var` | Auch im veröffentlichten ECMAScript 2026 existiert normativ die **Variable Statement**-Syntax mit `var`. Eine Empfehlung für `const`/`let` darf nicht als Entfernung/Sprachungültigkeit von `var` dargestellt werden. | [ECMA-262 §14.3.2](https://262.ecma-international.org/17.0/index.html#sec-variable-statement) |
| Callback-APIs | Node dokumentiert weiterhin Promise-, Callback- und synchrone fs-APIs. Callback-APIs arbeiten asynchron; die Dokumentation nennt sie für maximale Ausführungs-/Speichereffizienz sogar bevorzugenswert. `async`/`await` ersetzt nicht sämtliche Callbacks oder Ereignishandler. | [Node fs Callback API](https://nodejs.org/api/fs.html#callback-api), [fs-Übersicht](https://nodejs.org/api/fs.html) |
| Destrukturierte Props | **Ab Vue 3.5** bleiben direkt aus `defineProps()` destrukturierte Bindings im selben `<script setup>` reaktiv, weil der **Compiler** Zugriffe zu `props.foo` umschreibt. Kein allgemeiner JavaScript-Destrukturierungsmechanismus. Vor 3.5 läuft das dokumentierte `watchEffect`-Beispiel nur einmal. | [Reactive Props Destructure](https://vuejs.org/api/sfc-script-setup.html#reactive-props-destructure) |
| Destrukturiertes `reactive()`-Objekt | `const { count } = reactive({ count: 0 })` trennt bei primitiven Eigenschaften die reaktive Verbindung. Die Props-Compiler-Sonderbehandlung überträgt sich **nicht** auf beliebige `reactive()`-Objekte. Bei verschachtelten Objekten nicht pauschal behaupten, jede Destrukturierung mache das gesamte Objekt nichtreaktiv. | [Limitations of reactive](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive) |

### Inferences
- Empfohlene Kennzeichnungen für die spätere Materialprüfung: **aktuelle Grundlage** (Vue 3, stabile Releases, Vite/create-vue, Pinia), **gültige alternative API** (Options API), **Legacy-/Migrationskontext** (Vuex, CLI), **EOL-Kontext** (Vue 2), **gültige Sprach-/API-Mittel mit kontextabhängiger Stilwahl** (`var`, Callbacks). Das ist eine Quellenzuordnung zur Bestätigung, kein Auftrag zur Umgestaltung vorhandener Materialien. [Vue-FAQ](https://vuejs.org/guide/extras/composition-api-faq.html), [Vuex](https://vuex.vuejs.org/), [CLI](https://cli.vuejs.org/), [EOL](https://v2.vuejs.org/eol/), [ECMA](https://262.ecma-international.org/17.0/index.html#sec-variable-statement), [Node](https://nodejs.org/api/fs.html)

### Gaps
- Der Umfang dieses Teilauftrags umfasst nur Versions-/Statusbelege und deren Themenzuordnung. **Keine App-Änderungen, keine Lektionen, keine Übungen, keine Migration** wurden vorgenommen. Eine konkrete Zuordnung zu vorhandenen einzelnen Unterrichtsdateien muss aus der separaten Bestandsaufnahme kommen; hier werden keine Dateiinhalte unterstellt.
- Einzelne allgemeine Aussagen auf älteren offiziellen Seiten, etwa „Pinia funktioniert auch mit Vue 2“ auf der Vuex-Startseite, sind **nicht** als Kompatibilitätszusage für Pinia 4.1.0 auszulegen: dessen konkrete Peer-Metadaten verlangen Vue `^3.5.11`. Bei einem solchen Generalisierungskonflikt haben versionsspezifische Paketdaten für die konkrete Versionskompatibilität Vorrang. [Vuex-Aussage](https://vuex.vuejs.org/), [Pinia-4.1.0-Metadaten](https://registry.npmjs.org/pinia/latest)
