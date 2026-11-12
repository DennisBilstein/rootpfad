// Vue 3.5 · Komponenten-Architektur. Stichtag 12.11.2026.
// Eigene Texte; Code und Tests liegen unter content/examples/vue-lab/src/lessons/ und tests/components.spec.ts.
// Vue-Dokumentation steht unter CC BY 4.0 (© Evan You und Mitwirkende); hier eigene Formulierungen, Konzepte nach vuejs.org.
const lab = 'content/examples/vue-lab/';
const vueDocs = (title, url, note = 'Offizielle Vue-Dokumentation (CC BY 4.0, © Evan You und Mitwirkende); Inhalt hier eigenständig zusammengefasst.') => ({ title, url, note });

export const module = {
  id: 'js-m2', course: 'javascript', part: 23, partTitle: 'JavaScript & Vue · Vollständiger Lernpfad',
  title: 'Vue-Komponenten-Architektur · v-model, Slots, Dialoge und Typen',
};

export const lessons = [
  {
    id: 'js-m2-l1', title: 'defineModel: eigene Komponenten mit v-model', minutes: 30,
    prerequisites: 'Lektion „Props, Emits, Slots und zugängliche Formulare“ (js-m1-l10); Composition API.',
    objectives: [
      'Erklären, was v-model auf einer Komponente tatsächlich tut (Prop plus Ereignis)',
      'Mit defineModel eine Komponente schreiben, die einen Wert zweiseitig bindet',
      'Mehrere benannte Models (v-model:title, v-model:done) einsetzen',
      'Mit der set-Option und einem eigenen Modifikator (.clamp) Werte vor der Weitergabe prüfen',
    ],
    simple: `Mit v-model bindest du ein Eingabefeld an eine Variable: Tippt jemand etwas ein, ändert sich die Variable, und umgekehrt. Bei eigenen Komponenten willst du dasselbe: <QuantityField v-model="menge" />.

Dahinter steckt keine Magie, sondern ein Vertrag aus zwei Teilen: Das Kind bekommt einen Wert über eine Prop (modelValue) und meldet Änderungen über ein Ereignis (update:modelValue) zurück. Früher musstest du beides von Hand schreiben.

Seit Vue 3.4 gibt es dafür das Makro defineModel(). Es liefert dir eine Variable, die sich wie eine normale ref benutzen lässt: Liest du sie, bekommst du den Wert vom Elternteil; schreibst du sie, geht die Änderung per Ereignis zurück. Du denkst nur noch in „lesen und schreiben“, nicht mehr in „Prop und Emit“.`,
    steps: [
      'const quantity = defineModel<number>({ required: true }) ersetzt die Prop modelValue und das Ereignis update:modelValue.',
      'Im Template bindest du das Eingabefeld direkt: v-model.number="quantity". Der Modifikator .number wandelt die Eingabe in eine Zahl um.',
      'Mit einem Namen, z. B. defineModel("title"), entsteht ein benanntes Model. Der Elternteil schreibt dann v-model:title="..." – so kann eine Komponente mehrere zweiseitige Werte haben (EditableTitle: title und done).',
      'Die set-Option läuft, bevor der Wert nach außen gemeldet wird. So kannst du Werte korrigieren: ganze Zahl erzwingen und mit .clamp in den erlaubten Bereich klemmen.',
      'Modifikatoren des Elternteils (v-model.clamp="menge") erhältst du als zweiten Rückgabewert: const [quantity, modifiers] = defineModel<number, "clamp">(...).',
      'Der Test mountet die Komponente und prüft das emittierte Ereignis update:modelValue. Ohne .clamp wird 4 gemeldet; mit .clamp werden 99 → 10 und -5 → 0 gemeldet.',
    ],
    code: { file: lab + 'src/lessons/components/QuantityField.vue', lang: 'Vue' },
    code2: { file: lab + 'src/lessons/components/EditableTitle.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (tests/components.spec.ts, Block „defineModel“): 3 Tests grün
 - meldet Änderungen über update:modelValue         -> [[4]]
 - begrenzt mit Modifikator .clamp (Grenz-/Fehlerfall) -> [[10], [0]]
 - mehrere benannte Models                          -> update:done [[true]], update:title [["Neu"]]`,
    mistakes: [
      { wrong: 'Die Prop direkt im Kind verändern (props.modelValue = 5).',
        why: 'Props sind „von oben“ vorgegeben und schreibgeschützt. Das Verändern wird von Vue gemeldet und führt zu unvorhersehbarem Zustand.',
        fix: 'defineModel verwenden (oder ein Ereignis auslösen). Die Änderung läuft zum Elternteil, der entscheidet.' },
      { wrong: 'Im Kind eine lokale ref mit dem Anfangswert aus der Prop anlegen und danach nicht mehr synchron halten.',
        why: 'Ändert der Elternteil den Wert, zeigt das Kind weiter den alten. Zwei Quellen der Wahrheit laufen auseinander.',
        fix: 'Mit defineModel bleibt es eine Quelle. Für bewusste lokale Kopien (Entwurf) ein eigenes „Übernehmen“-Ereignis vorsehen.' },
      { wrong: 'Eingaben nicht prüfen, weil „das Feld ja type=number hat“.',
        why: 'Der Browser lässt Zahlenfelder leer oder mit Grenzwerten zu; auch NaN ist möglich. Die Komponente muss sich selbst schützen.',
        fix: 'Mit set die Werte normalisieren (ganze Zahl, Grenzen). Prüfe Normalfall, Grenzfall und Fehlerfall im Test, wie hier gezeigt.' },
    ],
    practice: 'Ein gutes Model-Interface ist klein: ein Wert, ein Name, ein klarer Typ. Wenn eine Komponente sechs v-models braucht, ist sie meist zu groß und besser in kleinere Komponenten zu teilen. Dokumentiere Einheiten und Grenzen (Prop min/max) im Komponentenvertrag.',
    exercises: [
      { task: 'Baue eine Komponente RatingInput mit defineModel<number> (1 bis 5) und nativen Radio-Buttons mit Beschriftung. Schreibe einen Test, der ein Klick-Ereignis prüft.', acceptance: 'Klick auf „3“ meldet update:modelValue mit 3; Beschriftungen sind mit den Eingaben verknüpft.' },
      { task: 'Grenzfall: Prüfe QuantityField mit .clamp bei min und max genau (0 und 10) sowie bei 10.9 und -0.5.', acceptance: '0 und 10 bleiben; 10.9 wird zu 10; -0.5 wird zu 0 (Math.trunc und Klemmen sind erklärt).' },
      { task: 'Fehlerfall: Gib in QuantityField einen Text („abc“) ein, der type=number nicht zulässt. Beschreibe, welcher Wert gemeldet wird und warum der Nutzer das nicht merkt. Schlage eine Fehlermeldung vor.', acceptance: 'Beobachtung dokumentiert; ein Vorschlag mit sichtbarer Textmeldung (nicht nur Farbe) ist formuliert.' },
    ],
    quiz: [
      { q: 'Was verbirgt sich hinter <MyInput v-model="name" />?',
        options: ['Eine Prop modelValue und ein Ereignis update:modelValue.', 'Eine globale Variable, die Vue im Hintergrund verwaltet.', 'Ein automatisches Kopieren des Werts bei jedem Tastendruck in den Store.'],
        correct: 0,
        rationales: ['So ist der Vertrag definiert; defineModel erzeugt beides für dich.', 'Es gibt keine globale Variable; der Wert gehört dem Elternteil.', 'Ein Store ist nicht beteiligt; die Bindung läuft über Prop und Ereignis.'],
        explain: 'v-model ist Kurzschreibweise für Prop modelValue plus Ereignis update:modelValue.' },
      { q: 'Eine Komponente setzt im Kind props.modelValue = 5. Was ist das Problem?',
        options: ['Props sind schreibgeschützt; Änderungen müssen per Ereignis oder defineModel zum Elternteil gehen.', 'Es gibt kein Problem, solange der Wert eine Zahl ist und im Kind bleibt.', 'Vue gibt die Änderung automatisch an den Elternteil weiter, ohne Hinweis.'],
        correct: 0,
        rationales: ['Einseitiger Datenfluss: Daten laufen nach unten, Änderungen als Ereignisse nach oben.', 'Der Typ ist nicht entscheidend; das Schreiben auf Props ist unzulässig.', 'Vue warnt und synchronisiert nichts automatisch; dafür gibt es Ereignisse und defineModel.'],
        explain: 'Props sind schreibgeschützt; defineModel oder ein Emit ist der richtige Weg.' },
      { q: 'Wozu dient die Option set in defineModel?',
        options: ['Sie legt den Anfangswert fest, solange der Elternteil noch keinen übergibt.', 'Sie verändert den Wert, bevor er an den Elternteil gemeldet wird (z. B. Normalisieren oder Klemmen).', 'Sie sperrt das Feld für weitere Eingaben, sobald ein Wert gesetzt wurde.'],
        correct: 1,
        rationales: ['Der Anfangswert kommt aus default bzw. vom Elternteil; set wirkt erst beim Schreiben.', 'Damit setzt die Komponente ihre eigenen Regeln durch, bevor der Elternteil den Wert sieht.', 'Das Sperren übernehmen disabled und readonly.'],
        explain: 'set transformiert den Wert vor dem Emit; typisch für Normalisierung.' },
    ],
    sources: [
      vueDocs('Vue: Component v-model', 'https://vuejs.org/guide/components/v-model.html'),
      vueDocs('Vue: defineModel (Makro)', 'https://vuejs.org/api/sfc-script-setup.html#definemodel'),
    ],
    verification: 'Code und Tests im vue-lab (Vue 3.5.45, Vitest 5.1.0, jsdom 31): tests/components.spec.ts mit 15 Tests grün; vue-tsc fehlerfrei. Verhalten in echten Browsern und mit Screenreadern nicht automatisiert geprüft.',
  },

  {
    id: 'js-m2-l2', title: 'provide und inject mit Typ und Fehlervertrag', minutes: 30,
    prerequisites: 'Lektion „defineModel“; Reaktivität (ref, readonly).',
    objectives: [
      'Erklären, wann provide/inject sinnvoller ist als Props durch viele Ebenen („Prop Drilling“)',
      'Einen typisierten InjectionKey und eine Kontext-Schnittstelle definieren',
      'Kindern lesenden Zugriff geben und Änderungen nur über eine Funktion zulassen',
      'Einen fehlenden Provider mit einer verständlichen Fehlermeldung abfangen',
    ],
    simple: `Stell dir ein Formular vor, das tief in anderen Komponenten verschachtelt ist. Die oberste Komponente kennt das aktuelle Farbschema („hell“ oder „dunkel“), und eine kleine Komponente ganz unten braucht es. Mit Props müsstest du den Wert durch jede Ebene reichen, auch durch die, die ihn gar nicht brauchen.

provide und inject sind wie ein Aushang im Treppenhaus: Der Elternteil hängt eine Information auf (provide), und jede Komponente darunter kann sie sich holen (inject) – egal, wie viele Etagen dazwischen liegen.

Damit daraus keine unsichtbare Abhängigkeit wird, gibst du dem Aushang einen eindeutigen Schlüssel mit Typ (InjectionKey) und baust die Funktion so, dass ein fehlender „Aushang“ sofort mit einer klaren Fehlermeldung auffällt.`,
    steps: [
      'const themeKey: InjectionKey<ThemeContext> = Symbol("theme") erzeugt einen eindeutigen, typisierten Schlüssel. Ein Symbol kollidiert nicht mit anderen Schlüsseln.',
      'ThemeContext ist eine Schnittstelle mit zwei Dingen: mode (nur lesbar) und toggle() (die einzige Möglichkeit, es zu ändern).',
      'provideTheme() erstellt die ref, übergibt readonly(mode) und die Funktion an provide und gibt den Kontext zurück.',
      'useTheme() holt den Kontext mit inject(themeKey, null) und wirft einen Fehler, wenn er fehlt („useTheme() benötigt provideTheme() …“).',
      'ThemeProvider.vue ruft provideTheme auf und rendert die Slot-Inhalte; ThemeToggle.vue ruft useTheme auf und zeigt einen Schalter mit aria-pressed.',
      'Die Tests prüfen: Klick wechselt data-theme von light zu dark, und ohne Provider wird die verständliche Fehlermeldung geworfen.',
    ],
    code: { file: lab + 'src/lessons/injection/theme.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/components/ThemeToggle.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „provide/inject“): 2 Tests grün
 - Kontext bereitgestellt, Klick -> data-theme "dark", aria-pressed "true"
 - ohne Provider -> Fehler "useTheme() benötigt provideTheme() in einer Eltern-Komponente."`,
    mistakes: [
      { wrong: 'inject("theme") mit einem Textschlüssel und ohne Typ verwenden.',
        why: 'Tippfehler im Schlüssel fallen erst zur Laufzeit auf, und der Rückgabetyp ist unbekannt.',
        fix: 'Einen typisierten InjectionKey in einer eigenen Datei exportieren und nur über useXyz() zugreifen.' },
      { wrong: 'Beim Provide die schreibbare ref weiterreichen, sodass jedes Kind den Wert ändern kann.',
        why: 'Niemand weiß mehr, wer den Wert verändert hat. Fehlersuche wird schwierig.',
        fix: 'readonly(…) bereitstellen und Änderungen nur über benannte Funktionen (toggle) zulassen.' },
      { wrong: 'inject(key, defaultValue) mit einem Standardwert verwenden, um die Fehlermeldung „loszuwerden“.',
        why: 'Ein vergessener Provider fällt dann nicht mehr auf; die Komponente arbeitet still mit einem falschen Wert.',
        fix: 'Bei Pflicht-Abhängigkeiten einen Fehler werfen. Standardwerte nur für wirklich optionale Kontexte.' },
      { wrong: 'provide/inject als Ersatz für globalen Anwendungszustand benutzen.',
        why: 'Er ist an einen Teilbaum gebunden und schwer zu inspizieren. Für anwendungsweiten Zustand gibt es Stores (Pinia, siehe js-m1-l13).',
        fix: 'provide/inject für Bereichs-Kontext (Theme, Formular, Tabs); Pinia für gemeinsamen Anwendungszustand.' },
    ],
    practice: 'Typische gute Einsatzfälle: Formular-Kontext (Feldfehler für verschachtelte Felder), Tabs/Akkordeon (Elternteil koordiniert Kinder), Theme. Halte den Kontext schmal und benenne Funktionen nach Fachlichkeit (toggle, select), nicht nach Technik.',
    exercises: [
      { task: 'Baue einen FormContext mit errors (readonly Record) und setError(field, message). Eine verschachtelte Komponente FieldMessage zeigt den Fehler für ein Feld.', acceptance: 'Fehler gesetzt → FieldMessage zeigt den Text; ohne Provider erscheint die verständliche Fehlermeldung.' },
      { task: 'Grenzfall: Verschachtele zwei ThemeProvider (innen „dark“, außen „light“). Welchen Wert sieht ein ThemeToggle im inneren Provider? Prüfe es im Test.', acceptance: 'Innerer Provider gewinnt („dark“); die Regel „nächster Provider darüber“ ist beschrieben.' },
      { task: 'Fehlerfall: Mounte ThemeToggle ohne Provider und fange den Fehler im Test ab. Prüfe den Text der Meldung.', acceptance: 'Fehlertext nennt provideTheme; kein stiller Standardwert.' },
    ],
    quiz: [
      { q: 'Warum verwendet man bei provide/inject einen InjectionKey statt eines Textschlüssels?',
        options: ['Textschlüssel sind in Vue verboten und führen zu einem Fehler beim Start.', 'Er trägt den Typ der bereitgestellten Werte und kann nicht versehentlich kollidieren.', 'Er ist beim Nachschlagen deutlich schneller als ein Textschlüssel.'],
        correct: 1,
        rationales: ['Textschlüssel funktionieren technisch, sind aber fehleranfällig und ohne Typ.', 'Ein Symbol-Schlüssel ist eindeutig und macht inject typsicher.', 'Geschwindigkeit ist hier kein relevanter Unterschied.'],
        explain: 'InjectionKey verbindet Schlüssel und Typ und verhindert Namenskollisionen.' },
      { q: 'Ein Entwickler ergänzt bei inject einen Standardwert, damit der Fehler bei fehlendem Provider verschwindet. Was ist das Risiko?',
        options: ['Es gibt kein Risiko, weil der Standardwert für den Kontext immer passend ist.', 'Ein vergessener Provider fällt nicht mehr auf und die Komponente arbeitet unbemerkt mit falschen Daten.', 'Vue kann Standardwerte bei inject nicht lesen und bricht daher ab.'],
        correct: 1,
        rationales: ['Ein Standardwert kann fachlich falsch sein und verdeckt die fehlende Voraussetzung.', 'Pflicht-Abhängigkeiten sollen laut und deutlich scheitern.', 'Vue unterstützt Standardwerte bei inject; das ist nicht das Problem.'],
        explain: 'Bei Pflicht-Kontext lieber ein klarer Fehler als ein stiller Standard.' },
      { q: 'Warum gibt provideTheme den Modus als readonly und die Änderung als Funktion weiter?',
        options: ['Damit nur eine Stelle den Wert ändern darf und jede Änderung nachvollziehbar bleibt.', 'Weil Vue keine schreibbaren refs bereitstellen kann.', 'Damit der Wert nicht in Templates verwendet werden darf.'],
        correct: 0,
        rationales: ['Kontrollierte Änderungen verhindern verteilte, schwer auffindbare Mutationen.', 'Vue kann es, aber es wäre ein schlechter Entwurf.', 'Lesen im Template ist ausdrücklich erlaubt.'],
        explain: 'Lesender Zugriff plus benannte Änderungsfunktionen halten den Datenfluss nachvollziehbar.' },
    ],
    sources: [
      vueDocs('Vue: Provide / Inject', 'https://vuejs.org/guide/components/provide-inject.html'),
      vueDocs('Vue: TypeScript mit Composition API (Typing provide/inject)', 'https://vuejs.org/guide/typescript/composition-api.html'),
    ],
    verification: 'Tests im vue-lab (tests/components.spec.ts) grün, vue-tsc fehlerfrei. In der Testausgabe erscheint eine bewusst unterdrückte Vue-Warnung für den Fall ohne Provider.',
  },

  {
    id: 'js-m2-l3', title: 'Slots mit Vertrag: Scoped Slots und defineSlots', minutes: 35,
    prerequisites: 'Lektion „provide und inject“; Slots-Grundlagen aus js-m1-l10; TypeScript-Generics (Grundlagen).',
    objectives: [
      'Zwischen einfachen Slots, benannten Slots und Scoped Slots unterscheiden',
      'Eine wiederverwendbare Liste bauen, die das Aussehen jedes Eintrags dem Elternteil überlässt',
      'Slot-Daten mit defineSlots typisieren und Fallback-Inhalt vorsehen',
      'Stabile Keys und einen zugänglichen Leerzustand umsetzen',
    ],
    simple: `Eine Liste soll an vielen Stellen verwendet werden, aber jedes Mal anders aussehen: einmal als Name mit Foto, einmal als Aufgabe mit Haken. Würdest du für jede Variante eine eigene Komponente schreiben, hättest du viel doppelten Code.

Ein Slot ist ein Platzhalter in einer Komponente, den der Elternteil füllt. Bei einem Scoped Slot gibt die Komponente dem Elternteil zusätzlich Daten mit, hier das aktuelle Element und seinen Index. Der Elternteil entscheidet, wie das Element aussieht; die Komponente kümmert sich um Schleife, Schlüssel und Leerzustand.

Mit defineSlots legst du fest, welche Slots es gibt und welche Daten sie liefern. TypeScript prüft dann im Elternteil, ob du auf item.name zugreifst, obwohl das Feld gar nicht existiert.`,
    steps: [
      'ItemList ist generisch: generic="T extends { id: string | number }". Jedes Element braucht eine id, die als Key dient.',
      'defineSlots<{ default(props: { item: T; index: number }): unknown; empty?(): unknown }>() beschreibt die Slots. Der Standard-Slot ist ein Scoped Slot mit item und index.',
      'Im Template: <slot :item="item" :index="index" /> reicht die Daten pro Zeile an den Elternteil.',
      'Der Elternteil schreibt <template #default="{ item, index }">{{ index + 1 }}. {{ item.name }}</template>. Das ist die Kurzschreibweise von v-slot.',
      'Der Slot empty hat Fallback-Inhalt („Keine Einträge vorhanden.“). Ein eigener Inhalt überschreibt ihn. Die Meldung steht in einem Element mit role="status".',
      'Die Tests prüfen: nummerierte Zeilen, Fallback-Text und eigener Empty-Slot.',
    ],
    code: { file: lab + 'src/lessons/components/ItemList.vue', lang: 'Vue' },
    order: ['body', 'code', 'body2'],
    output: `vitest (Block „Slots und generische Komponenten“):
 - Scoped Slot liefert ["1. Alpha", "2. Beta"]
 - Fallback "Keine Einträge vorhanden." und eigener Empty-Slot "Nichts da"`,
    mistakes: [
      { wrong: 'Den Index als Key verwenden (:key="index").',
        why: 'Wird die Liste umsortiert oder gefiltert, ordnet Vue DOM-Elemente und Zustand falsch zu (z. B. Eingaben „wandern“ zur falschen Zeile).',
        fix: 'Eine stabile fachliche id als Key verwenden; im Beispiel ist sie per Typ vorgeschrieben.' },
      { wrong: 'Slot-Inhalte ändern, indem man die übergebenen Objekte verändert (item.name = …).',
        why: 'Der Elternteil verändert Daten, die ihm nicht gehören. Der Datenfluss wird undurchsichtig.',
        fix: 'Änderungen als Ereignis oder über eine Funktion an den Besitzer der Daten melden.' },
      { wrong: 'Einen leeren Zustand komplett weglassen.',
        why: 'Nutzer sehen eine leere Fläche und wissen nicht, ob geladen wird, die Liste leer ist oder ein Fehler vorliegt.',
        fix: 'Einen Leerzustand mit Text vorsehen; role="status" lässt Screenreader Änderungen höflich melden.' },
      { wrong: 'Alles in Slots auslagern, auch Dinge, die zur Komponente gehören.',
        why: 'Die Komponente wird zur leeren Hülle, und jede Verwendung muss alles neu schreiben.',
        fix: 'Slots nur für variable Darstellung; Verhalten (Schleife, Keys, Leerzustand) bleibt in der Komponente.' },
    ],
    practice: 'Wiederverwendbare Komponenten sind ein Vertrag: Was bestimmt die Komponente (Struktur, Verhalten, Zugänglichkeit), und was bestimmt der Nutzer (Darstellung)? Schreibe diesen Vertrag in Typen (defineProps, defineSlots), nicht nur in Kommentare.',
    exercises: [
      { task: 'Verwende ItemList für eine Aufgabenliste mit Checkbox im Slot. Zeige Aufgabentitel und Fälligkeit.', acceptance: 'Jede Zeile zeigt Checkbox und Titel; die Liste hat stabile Keys.' },
      { task: 'Grenzfall: Übergib eine leere Liste mit und ohne eigenen Empty-Slot. Beschreibe beide Ergebnisse.', acceptance: 'Ohne Slot: Standardtext; mit Slot: eigener Text. Beide stehen in role="status".' },
      { task: 'Fehlerfall: Greife im Slot auf item.titel zu, obwohl das Feld name heißt. Was meldet vue-tsc?', acceptance: 'Typfehler „Property titel does not exist“ ist beobachtet; Zeile ist korrigiert.' },
    ],
    quiz: [
      { q: 'Wozu dient ein Scoped Slot gegenüber einem einfachen Slot?',
        options: ['Die Komponente übergibt Daten an den Slot-Inhalt, den der Elternteil damit gestaltet.', 'Er rendert schneller als ein einfacher Slot, weil er zwischengespeichert wird.', 'Er ersetzt Props vollständig, sodass keine Props mehr nötig sind.'],
        correct: 0,
        rationales: ['Der Datenfluss geht hier vom Kind zum Slot-Inhalt des Elternteils.', 'Es geht nicht um Geschwindigkeit, sondern um Datenübergabe.', 'Props bleiben nötig; Scoped Slots ergänzen sie.'],
        explain: 'Scoped Slots reichen Daten der Komponente an den Slot-Inhalt weiter.' },
      { q: 'Eine Liste wird nach dem Hinzufügen neu sortiert, und eingegebene Texte in Zeilen springen zur falschen Zeile. Was ist die wahrscheinlichste Ursache?',
        options: ['Der Index wird als Key verwendet.', 'Der Slot hat keinen Fallback.', 'Die Liste ist zu lang.'],
        correct: 0,
        rationales: ['Mit Index als Key erkennt Vue Zeilen nach Position, nicht nach Inhalt; Zustand wandert mit.', 'Fallback betrifft den Leerzustand, nicht die Zuordnung.', 'Die Länge allein verursacht dieses Verhalten nicht.'],
        explain: 'Stabile ids als Key verhindern falsche Zuordnung bei Umsortierung.' },
      { q: 'Was bewirkt defineSlots in TypeScript-Projekten?',
        options: ['Es erzeugt die Slot-Inhalte automatisch aus den Props der Komponente.', 'Es beschreibt Slots mit ihren Daten, sodass der Elternteil typgeprüft darauf zugreifen kann.', 'Es verhindert, dass der Elternteil die Slots überhaupt füllen kann.'],
        correct: 1,
        rationales: ['Inhalte kommen vom Elternteil, nicht von defineSlots.', 'vue-tsc nutzt die Typen, um Fehler wie falsche Feldnamen zu melden.', 'Es beschreibt Slots, es sperrt sie nicht.'],
        explain: 'defineSlots typisiert Slot-Namen und Slot-Props.' },
    ],
    sources: [
      vueDocs('Vue: Slots (inkl. Scoped Slots)', 'https://vuejs.org/guide/components/slots.html'),
      vueDocs('Vue: defineSlots', 'https://vuejs.org/api/sfc-script-setup.html#defineslots'),
    ],
    verification: 'Tests im vue-lab grün; vue-tsc prüft die Slot-Typen. Die Beobachtung „Typfehler bei item.titel“ in Übung 3 ist als Aufgabe formuliert und nicht in einer eigenen Testdatei hinterlegt.',
  },

  {
    id: 'js-m2-l4', title: 'Teleport und natives <dialog>: zugängliche Modale', minutes: 40,
    prerequisites: 'Lektion „defineModel“; Grundlagen von Tastaturbedienung und Fokus (HTML & CSS-Pfad).',
    objectives: [
      'Erklären, wofür Teleport gut ist und welche Probleme er löst (Stapelreihenfolge, abgeschnittene Inhalte)',
      'Einen modalen Dialog mit dem nativen <dialog>-Element und showModal() bauen',
      'Schließen über Esc und Schaltflächen mit dem Zustand der Komponente synchron halten',
      'Den Fokus nach dem Schließen auf das auslösende Element zurücksetzen und die Grenzen des Tests benennen',
    ],
    simple: `Ein modaler Dialog („Wirklich löschen?“) soll über allem liegen, den Rest der Seite sperren und per Tastatur bedienbar sein: Tab bleibt im Dialog, Esc schließt ihn, danach landet der Fokus wieder dort, wo man herkam.

Früher hat man das mühsam mit Skripten nachgebaut. Heute kann der Browser es selbst: Das HTML-Element <dialog> mit der Methode showModal() liefert Fokusfalle, Esc-Taste, Abdunklung des Hintergrunds (::backdrop) und macht den Rest der Seite inaktiv. Du schreibst viel weniger Code und bekommst weniger Fehler.

Vue steuert dabei nur den Zustand („offen oder zu“) und mit Teleport den Ort im DOM: Der Dialog wird logisch in deiner Komponente definiert, aber technisch direkt unter <body> gerendert. So schneiden Eltern mit overflow: hidden oder eigenem z-index ihn nicht ab.`,
    steps: [
      '<Teleport to="body"> rendert den Inhalt unter <body>, während Daten und Ereignisse weiter zur Komponente gehören.',
      'Ein defineModel<boolean>("open") bildet den Zustand ab: v-model:open="zeigeDialog" im Elternteil.',
      'Beim Wechsel von open auf true merkt sich die Komponente das aktuell fokussierte Element (opener) und ruft showModal() auf.',
      'Das Element <dialog> löst das Ereignis close aus, wenn Esc gedrückt, über form[method=dialog] bestätigt oder close() aufgerufen wird. Der Handler onClose setzt open auf false und fokussiert den opener.',
      'Schaltflächen Abbrechen/Bestätigen liegen in <form method="dialog">; sie schließen den Dialog ohne eigenen Code und lösen die Ereignisse cancel/confirm aus.',
      'aria-labelledby verknüpft den Dialog mit seiner Überschrift.',
      'Der Test beweist: Der Dialog steht im body (nicht in der Komponenten-Wurzel), nach Öffnen hat er das Attribut open, und nach dem close-Ereignis ist der Zustand false und der Fokus beim Auslöser.',
      'Wichtige Grenze: jsdom (die Testumgebung) kennt showModal und close nicht. Der Test ersetzt sie durch eine Minimalversion. Er prüft deshalb nur unsere Logik, nicht das echte Browserverhalten (Fokusfalle, Esc).',
    ],
    code: { file: lab + 'src/lessons/components/ConfirmDialog.vue', lang: 'Vue' },
    order: ['body', 'code', 'body2'],
    output: `vitest (Block „Teleport und <dialog>“): 1 Test grün
 - Dialog liegt unter <body>, bekommt open, aria-labelledby="dialog-title"
 - close-Ereignis -> open=false, Fokus zurück auf den Auslöser
Hinweis: showModal/close sind im Test nachgebildet (jsdom). Echtes Verhalten (Tab-Falle, Esc) manuell im Browser prüfen.`,
    mistakes: [
      { wrong: 'Den Dialog mit v-if ein- und ausblenden und mit show() statt showModal() öffnen.',
        why: 'show() öffnet einen nicht-modalen Dialog ohne Fokusfalle und ohne Sperre des Hintergrunds. Die Vorteile des Elements gehen verloren.',
        fix: 'showModal() für modale Dialoge; der Zustand wird über das Attribut open des Elements gesteuert.' },
      { wrong: 'Nur auf die eigenen Schaltflächen reagieren und die Esc-Taste ignorieren.',
        why: 'Esc schließt den Dialog im Browser, aber der Vue-Zustand bleibt „offen“. Beim nächsten Klick passiert nichts.',
        fix: 'Auf das close-Ereignis des Dialogs hören und den Zustand dort zurücksetzen (wie im Beispiel).' },
      { wrong: 'Den Fokus nach dem Schließen nicht zurücksetzen.',
        why: 'Tastaturnutzer verlieren ihre Position und müssen sich erneut durch die Seite tabben. Das verletzt die Erwartungen aus den Barrierefreiheitsrichtlinien (WCAG 2.2).',
        fix: 'Auslöser merken und nach close fokussieren (Browser tun das oft selbst; verlass dich nicht darauf und teste es).' },
      { wrong: 'Dem Testbericht „grün“ als Beweis für Barrierefreiheit trauen.',
        why: 'Die Tests simulieren den Dialog. Echte Tastaturbedienung und Screenreader sind damit nicht geprüft.',
        fix: 'Manuell testen: Tab bleibt im Dialog, Esc schließt, Fokus kehrt zurück. Zusätzlich einen automatischen Zugänglichkeitscheck laufen lassen.' },
    ],
    practice: 'Für Teleport: Wähle ein festes Ziel (body oder ein eigenes Container-Element) und achte auf Server-Side-Rendering (das Ziel muss existieren). Für Dialoge: Eine klare Überschrift, eine ehrliche Beschriftung der Aktion („Aufgabe löschen“ statt „OK“) und Standardfokus auf die sichere Aktion.',
    exercises: [
      { task: 'Baue eine Seite mit einer Schaltfläche „Löschen“, die den Dialog öffnet. Prüfe im Browser: Tab bleibt im Dialog, Esc schließt, Fokus kehrt zur Schaltfläche zurück.', acceptance: 'Alle drei Beobachtungen sind notiert; das Ergebnis stammt aus dem echten Browser, nicht aus dem Test.' },
      { task: 'Grenzfall: Öffne den Dialog zweimal hintereinander (öffnen, Esc, öffnen). Funktioniert der zweite Versuch? Erkläre, warum der close-Handler dafür wichtig ist.', acceptance: 'Zweites Öffnen funktioniert, weil der Zustand nach Esc auf false zurückgesetzt wurde.' },
      { task: 'Fehlerfall: Entferne @close und öffne, schließe mit Esc und öffne erneut. Beschreibe das Fehlverhalten.', acceptance: 'Beobachtet: Zustand bleibt true, erneutes Öffnen scheint wirkungslos; Ursache ist erklärt.' },
    ],
    quiz: [
      { q: 'Nach Esc ist der Dialog geschlossen, aber die Schaltfläche „Öffnen“ reagiert nicht mehr. Was fehlt am wahrscheinlichsten?',
        options: ['Ein Listener auf das close-Ereignis, der den Vue-Zustand zurücksetzt.', 'Ein zusätzliches Teleport-Ziel.', 'Ein CSS-Reset für den Dialog.'],
        correct: 0,
        rationales: ['Esc schließt das Element, aber der Vue-Zustand bleibt true; close synchronisiert beides.', 'Teleport bestimmt den Ort im DOM, nicht den Zustand.', 'CSS beeinflusst das Aussehen, nicht die Ereigniskette.'],
        explain: 'Das close-Ereignis hält Zustand und Element synchron.' },
      { q: 'Welchen Vorteil hat showModal() gegenüber einem selbstgebauten Overlay aus div-Elementen?',
        options: ['Der Browser liefert Fokusfalle, Esc-Behandlung und Sperre des Hintergrunds mit.', 'Es ist nur in alten Browsern verfügbar.', 'Es braucht kein HTML.'],
        correct: 0,
        rationales: ['Diese Funktionen sind im nativen Dialog eingebaut und müssen nicht nachgebaut werden.', 'Das Element ist in aktuellen Browsern unterstützt; das Gegenteil trifft zu.', 'Es ist ein HTML-Element.'],
        explain: 'Der native Dialog erspart viel Eigenbau und potenzielle Fehler.' },
      { q: 'Der Test mit jsdom ist grün. Was sagt er über die echte Tastaturbedienung aus?',
        options: ['Er beweist, dass die Fokusfalle im echten Browser einwandfrei funktioniert.', 'Er prüft nur die eigene Logik; echte Tastaturbedienung bleibt manuell zu prüfen.', 'Er ersetzt den manuellen Barrierefreiheitstest vollständig.'],
        correct: 1,
        rationales: ['Das Verhalten der Fokusfalle gehört dem Browser und wird im Test nicht ausgeführt.', 'Ehrlich ist: Logiktest ja, Browserverhalten nein.', 'Automatische Tests decken nur einen Teil der Anforderungen ab.'],
        explain: 'Tests mit Nachbildungen belegen Logik; Browser- und Screenreaderverhalten braucht eigene Prüfungen.' },
    ],
    sources: [
      vueDocs('Vue: Teleport', 'https://vuejs.org/guide/built-ins/teleport.html'),
      { title: 'MDN: <dialog>-Element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog', note: 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt und zusammengefasst.' },
      { title: 'W3C ARIA Authoring Practices: Modal Dialog Pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/', note: 'W3C-Muster; nur verlinkt.' },
    ],
    verification: 'Test im vue-lab grün (mit nachgebildetem showModal). NICHT geprüft: echte Fokusfalle, Esc und Screenreader in einem Browser; bitte mit Übung 1 manuell nachholen.',
  },

  {
    id: 'js-m2-l5', title: 'Suspense und asynchrone Komponenten', minutes: 35,
    prerequisites: 'Promises und async/await (js-m1-l4); Fehlerzustände aus js-m1-l11.',
    objectives: [
      'Eine asynchrone Komponente mit Top-Level-await schreiben und ihren Ladezustand mit <Suspense> anzeigen',
      'Fehler bei asynchroner Einrichtung mit onErrorCaptured behandeln',
      'Mit defineAsyncComponent schwere Komponenten erst bei Bedarf laden und Lade- und Fehlerzustand festlegen',
      'Den Status von Suspense (experimentell) bei Entscheidungen berücksichtigen',
    ],
    simple: `Manche Komponenten müssen erst Daten holen, bevor sie etwas anzeigen können. Du kannst das selbst mit isLoading und v-if lösen. Vue bietet eine zweite Möglichkeit: Die Komponente wartet ihren Aufbau mit await ab (ein „Top-Level await“ in script setup), und ein Elternteil mit <Suspense> zeigt währenddessen einen Platzhalter („Bericht wird geladen …“).

Eine zweite, verwandte Technik ist Lazy Loading: Eine große Komponente (ein Diagramm, ein Editor) soll gar nicht erst im Haupt-Bundle stecken, sondern erst geladen werden, wenn sie gebraucht wird. Das macht defineAsyncComponent mit einem dynamischen import().

Beide Techniken brauchen eine Antwort auf „Was, wenn es schiefgeht?“. Hier gibt es eine wichtige Besonderheit: <Suspense> behandelt Fehler nicht selbst.`,
    steps: [
      'AsyncReport.vue ruft const lines = await props.load() im script setup auf. Damit ist die Komponente „asynchron“: Vue wartet mit dem Rendern, bis das Promise fertig ist.',
      'ReportHost.vue umschließt sie mit <Suspense>. Im Slot #fallback steht der Ladezustand (role="status"). Der Standard-Slot ist die eigentliche Komponente.',
      'Fehler: <Suspense> bietet keine eigene Fehlerbehandlung. Im Elternteil fängt onErrorCaptured den Fehler und setzt einen Fehlertext (role="alert"); return false verhindert, dass der Fehler weiter nach oben gemeldet wird.',
      'createLazyPanel(loader) kapselt defineAsyncComponent mit loadingComponent, errorComponent, delay: 200 und timeout: 3000.',
      'delay legt fest, wann die Ladeanzeige erscheint (hier 200 ms, das ist auch der Standard), damit schnelle Ladevorgänge nicht flackern. Ohne timeout wartet Vue unbegrenzt (Standard: Infinity).',
      'Die Tests prüfen: Fallback sichtbar → nach Auflösung Inhalt; abgelehntes Promise → Fehlertext; fehlgeschlagener Import → errorComponent.',
      'Status: Die Vue-Dokumentation bezeichnet Suspense weiterhin als experimentell. Es gibt keine Garantie, dass es stabil wird; die API kann sich ändern.',
    ],
    code: { file: lab + 'src/lessons/components/ReportHost.vue', lang: 'Vue' },
    code2: { file: lab + 'src/lessons/components/lazyPanel.ts', lang: 'TypeScript' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „Suspense und async Komponenten“): 3 Tests grün
 - Fallback "Bericht wird geladen …" -> danach ["Zeile A", "Zeile B"]
 - abgelehntes Promise -> role="alert": "Bericht nicht verfügbar: 503"
 - fehlgeschlagener Import -> "Panel konnte nicht geladen werden."`,
    mistakes: [
      { wrong: 'Erwarten, dass <Suspense> Fehler selbst abfängt.',
        why: 'Laut Dokumentation bietet die Komponente keine eigene Fehlerbehandlung. Ein abgelehntes Promise im setup würde sonst als unbehandelter Fehler hochblubbern.',
        fix: 'Im Elternteil onErrorCaptured (oder errorCaptured) nutzen und einen Fehlerzustand anzeigen.' },
      { wrong: 'Suspense für anwendungskritische Funktionen verwenden, ohne den experimentellen Status zu beachten.',
        why: 'Die API kann sich ändern. Ein Update kann Anpassungen erfordern.',
        fix: 'Bewusst entscheiden; für kritische Stellen kann ein eigener Ladezustand (isLoading, v-if) die stabilere Wahl sein. Kapsele die Verwendung an wenigen Stellen.' },
      { wrong: 'Ladeanzeigen sofort einblenden, auch für Vorgänge von wenigen Millisekunden.',
        why: 'Es entsteht ein Flackern; Nutzer nehmen die Seite als unruhig wahr.',
        fix: 'Mit delay (z. B. 200 ms) arbeiten, wie bei defineAsyncComponent. Und Platz reservieren, damit sich das Layout nicht verschiebt.' },
      { wrong: 'Lazy Loading für winzige Komponenten.',
        why: 'Jeder zusätzliche Chunk kostet einen Request. Für sehr kleine Komponenten ist der Nutzen null.',
        fix: 'Nur bei messbar großen oder selten genutzten Teilen (Diagramme, Editoren, Admin-Bereiche) einsetzen und das Bundle messen.' },
    ],
    practice: 'Entscheide pro Fall: Gehört das Laden zur Komponente (async setup + Suspense) oder zum aufrufenden Code (Composable, siehe js-m1-l11, mit Query-Cache aus Modul js-m3)? Für Daten mit Cache, Wiederholung und Aktualisierung ist ein Query-Cache meist die bessere Wahl; Suspense passt eher für einmaliges Initialisieren oder Lazy-Komponenten.',
    exercises: [
      { task: 'Baue die Beispiele mit einem Ladeparameter, der nach 500 ms auflöst. Beobachte den Fallback und stelle den Ablauf in einem Sequenzdiagramm dar.', acceptance: 'Diagramm zeigt: Mount → Fallback → Promise fertig → Inhalt; Zeiten sind notiert.' },
      { task: 'Grenzfall: Setze timeout auf 100 ms und lass den Import 500 ms dauern. Was sieht der Nutzer? Wann erscheint die Ladeanzeige (delay)?', acceptance: 'Nach 100 ms erscheint der Fehlerzustand; eine Ladeanzeige erscheint nach delay, falls der Wert kleiner als das Timeout ist.' },
      { task: 'Fehlerfall: Entferne onErrorCaptured und lass load ablehnen. Beschreibe, was in der Konsole und auf der Seite passiert.', acceptance: 'Beobachtung dokumentiert (unbehandelter Fehler, keine verständliche Meldung); Ergänzung des Handlers behebt es.' },
    ],
    quiz: [
      { q: 'Eine async Komponente im <Suspense> wirft beim Laden einen Fehler. Auf der Seite erscheint nichts Verständliches. Was ist der richtige Weg?',
        options: ['In einem Elternteil mit onErrorCaptured den Fehler fangen und einen Fehlerzustand anzeigen.', 'Suspense mit dem Attribut error ergänzen.', 'Den Fehler ignorieren, Vue zeigt automatisch eine Meldung an.'],
        correct: 0,
        rationales: ['Laut Vue-Dokumentation bietet Suspense keine eigene Fehlerbehandlung; der Hook im Elternteil ist der vorgesehene Weg.', 'Ein solches Attribut gibt es nicht.', 'Es gibt keine automatische Meldung für Nutzer.'],
        explain: 'Suspense behandelt Fehler nicht selbst; onErrorCaptured im Elternteil übernimmt das.' },
      { q: 'Was bewirkt delay: 200 bei defineAsyncComponent?',
        options: ['Die Komponente wird erst nach 200 ms verzögert vom Server geladen.', 'Die Ladeanzeige erscheint erst nach 200 ms, damit schnelle Ladevorgänge nicht flackern.', 'Der Ladevorgang wird nach 200 ms abgebrochen und als Fehler gemeldet.'],
        correct: 1,
        rationales: ['Geladen wird sofort; nur die Ladeanzeige wird verzögert.', 'So steht es in der Vue-Dokumentation (Standard 200 ms).', 'Abbrechen steuert timeout, nicht delay.'],
        explain: 'delay verzögert die Ladeanzeige, nicht den Ladevorgang.' },
      { q: 'Welcher Status gilt laut Vue-Dokumentation (Stand 12.11.2026) für <Suspense>?',
        options: ['Es ist stabil und nicht mehr änderbar.', 'Es ist ein experimentelles Feature; die API kann sich ändern.', 'Es wurde entfernt.'],
        correct: 1,
        rationales: ['Die Dokumentation nennt es ausdrücklich experimentell.', 'Der Hinweis auf der Seite lautet „experimental feature“ und „API may change“.', 'Die Seite existiert und beschreibt das Feature weiterhin.'],
        explain: 'Die Dokumentation markiert Suspense als experimentell; Verwendung bewusst entscheiden.' },
    ],
    sources: [
      vueDocs('Vue: Suspense', 'https://vuejs.org/guide/built-ins/suspense.html', 'Dort steht der Hinweis „experimental feature“ (am 12.11.2026 gelesen). Inhalt hier eigenständig zusammengefasst; CC BY 4.0.'),
      vueDocs('Vue: Async Components (defineAsyncComponent)', 'https://vuejs.org/guide/components/async.html'),
    ],
    verification: 'Tests im vue-lab grün. Der experimentelle Status wurde auf der Dokumentationsseite am 12.11.2026 gelesen; spätere Änderungen sind möglich.',
  },

  {
    id: 'js-m2-l6', title: 'Transition, TransitionGroup und reduzierte Bewegung', minutes: 30,
    prerequisites: 'Lektion „Slots mit Vertrag“; CSS-Grundlagen (Transitions) aus dem HTML & CSS-Pfad.',
    objectives: [
      'Mit TransitionGroup das Hinzufügen und Entfernen von Listeneinträgen animieren',
      'Nur transform und opacity animieren und begründen, warum',
      'prefers-reduced-motion per CSS und per Composable berücksichtigen',
      'Verstehen, warum stabile Keys und absolute Positionierung beim Entfernen nötig sind',
    ],
    simple: `Kleine Animationen helfen, Änderungen zu verstehen: Ein neuer Eintrag blendet ein, ein gelöschter blendet aus. Vue macht das einfach: Du packst die Liste in <TransitionGroup>, und Vue setzt zu den richtigen Zeitpunkten CSS-Klassen, die du gestaltest.

Zwei Regeln machen Animationen gut: Animiere nur Dinge, die der Browser billig zeichnen kann (transform und opacity), sonst ruckelt es. Und nimm Rücksicht auf Menschen, denen Bewegung Unwohlsein bereitet: Wer in seinem Betriebssystem „Bewegung reduzieren“ eingestellt hat, soll keine unnötigen Animationen sehen. Das Medium-Query prefers-reduced-motion verrät dir diese Einstellung.`,
    steps: [
      '<TransitionGroup tag="ul" name="fade"> rendert eine Liste und animiert jedes Kind beim Erscheinen, Verschwinden und Verschieben. Jeder Eintrag braucht einen stabilen :key.',
      'Vue setzt Klassen mit dem Präfix fade-: fade-enter-from/-active/-to für Einblenden, fade-leave-… für Ausblenden, fade-move für das Verschieben.',
      'Im CSS stehen nur opacity und transform (translateY): Sie verändern kein Layout und laufen flüssig.',
      'Beim Ausblenden bekommt .fade-leave-active position: absolute. So rücken die übrigen Einträge animiert nach, statt zu springen.',
      'Per CSS: @media (prefers-reduced-motion: reduce) setzt die Übergänge auf none.',
      'Per Composable: usePrefersReducedMotion liest matchMedia("(prefers-reduced-motion: reduce)"), reagiert auf Änderungen und räumt den Listener mit onScopeDispose auf. FadeList schaltet damit :css="!reduced" und den Namen um.',
      'Die Tests prüfen das Composable (Anfangswert, Live-Änderung, Aufräumen) und die Listenlogik (Entfernen über Keys). Die Animation selbst prüft der Test nicht; @vue/test-utils ersetzt Transition-Komponenten standardmäßig durch Stubs.',
    ],
    code: { file: lab + 'src/lessons/components/FadeList.vue', lang: 'Vue' },
    code2: { file: lab + 'src/lessons/components/usePrefersReducedMotion.ts', lang: 'TypeScript' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „Transition und reduzierte Bewegung“): 2 Tests grün
 - Systemeinstellung folgt live (false -> true); removeEventListener wird beim Aufräumen genau einmal aufgerufen
 - Eintrag mit id 1 wird entfernt; ["B"] bleibt`,
    mistakes: [
      { wrong: 'width, height, top oder margin animieren.',
        why: 'Diese Eigenschaften zwingen den Browser, das Layout neu zu berechnen. Das kann ruckeln, besonders auf schwächeren Geräten.',
        fix: 'transform und opacity verwenden (wie im Beispiel).' },
      { wrong: 'Animationen ohne Rücksicht auf prefers-reduced-motion einsetzen.',
        why: 'Für manche Menschen lösen Bewegungen Schwindel oder Übelkeit aus. Die Betriebssystem-Einstellung ist ein klares Signal.',
        fix: 'Bewegung bei reduce abschalten oder stark vereinfachen (z. B. nur Einblenden ohne Verschieben). WCAG 2.2 verlangt zudem, dass Bewegung abschaltbar ist, wenn sie nicht wesentlich ist.' },
      { wrong: 'Den Listenindex als Key verwenden.',
        why: 'Beim Entfernen eines Elements animiert Vue das falsche Element hinaus, weil sich alle Keys verschieben.',
        fix: 'Stabile ids als Key verwenden.' },
      { wrong: 'Dem Test „TransitionGroup funktioniert“ vertrauen.',
        why: 'Test-Utils ersetzen Transition-Komponenten durch Stubs; die echte Animation läuft nicht.',
        fix: 'Logik testen (Keys, Einträge) und die Animation einmal manuell im Browser mit und ohne „Bewegung reduzieren“ prüfen.' },
    ],
    practice: 'Animationen sollen Bedeutung transportieren (neu, weg, verschoben), nicht dekorieren. Halte sie kurz (unter etwa 300 ms), vermeide Endlosschleifen und plane den Platzbedarf, damit sich nichts verschiebt, wenn Inhalt erscheint.',
    exercises: [
      { task: 'Baue eine Seite, auf der man Einträge hinzufügen und löschen kann. Prüfe im Browser die Animation. Schalte dann im Betriebssystem „Bewegung reduzieren“ ein und prüfe, dass sie entfällt.', acceptance: 'Mit Standardeinstellung: Einblenden/Ausblenden sichtbar; mit reduzierter Bewegung: keine Animation, Funktion bleibt.' },
      { task: 'Grenzfall: Füge schnell hintereinander zehn Einträge hinzu. Ruckelt etwas? Was hilft?', acceptance: 'Beobachtung dokumentiert; transform/opacity-Hinweis und kurze Dauer sind als Maßnahmen genannt.' },
      { task: 'Fehlerfall: Ersetze den Key durch den Index und lösche den ersten Eintrag. Beschreibe, welches Element animiert hinausfliegt.', acceptance: 'Falsches Element animiert hinaus; Erklärung nennt die verschobenen Keys.' },
    ],
    quiz: [
      { q: 'Warum animiert man bevorzugt transform und opacity?',
        options: ['Weil andere CSS-Eigenschaften nicht animierbar sind.', 'Weil sie das Layout nicht neu berechnen müssen und deshalb flüssig laufen.', 'Weil Vue nur diese beiden Eigenschaften kennt.'],
        correct: 1,
        rationales: ['Viele Eigenschaften sind animierbar; der Unterschied liegt im Aufwand.', 'Layout-Eigenschaften wie width oder top lösen aufwendige Neuberechnungen aus.', 'Vue setzt lediglich Klassen; was du animierst, entscheidet das CSS.'],
        explain: 'transform und opacity sind günstig für den Browser und vermeiden Layout-Neuberechnung.' },
      { q: 'Ein Nutzer hat im Betriebssystem „Bewegung reduzieren“ aktiviert. Was ist die passende Reaktion der Anwendung?',
        options: ['Alle Animationen verstärken, damit sie auffallen.', 'Nicht wesentliche Animationen abschalten oder stark vereinfachen.', 'Die Einstellung ignorieren, da Browser sie nicht auslesen können.'],
        correct: 1,
        rationales: ['Das wäre das Gegenteil des Nutzerwunsches.', 'prefers-reduced-motion ist genau dafür gedacht und wird vom Browser bereitgestellt.', 'Browser stellen die Einstellung über prefers-reduced-motion zur Verfügung.'],
        explain: 'Die Einstellung respektieren: Bewegung abschalten oder reduzieren.' },
      { q: 'Wozu dient onScopeDispose in usePrefersReducedMotion?',
        options: ['Um den matchMedia-Listener aufzuräumen, wenn der Kontext (Komponente oder Scope) endet.', 'Um die Animation zu beschleunigen, wenn die Komponente entfernt wird.', 'Um den Wert der Einstellung dauerhaft im Browser zu speichern.'],
        correct: 0,
        rationales: ['Ohne Aufräumen bliebe der Listener nach dem Unmount bestehen (Speicherleck).', 'Mit der Geschwindigkeit hat der Hook nichts zu tun.', 'Speichern ist nicht seine Aufgabe; er räumt auf.'],
        explain: 'onScopeDispose beendet Listener und Ressourcen sauber.' },
    ],
    sources: [
      vueDocs('Vue: Transition und TransitionGroup', 'https://vuejs.org/guide/built-ins/transition.html'),
      { title: 'MDN: prefers-reduced-motion', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion', note: 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt und zusammengefasst.' },
      { title: 'W3C WCAG 2.2: Technik C39 – prefers-reduced-motion', url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C39', note: 'W3C-Technik; nur verlinkt.' },
    ],
    verification: 'Composable und Listenlogik im vue-lab getestet (matchMedia im Test nachgebildet). Die visuelle Animation wurde nicht automatisiert geprüft.',
  },

  {
    id: 'js-m2-l7', title: 'Generische Komponenten mit TypeScript', minutes: 35,
    prerequisites: 'Lektion „Slots mit Vertrag“; TypeScript-Generics (js-m1-l7).',
    objectives: [
      'Eine Komponente mit generic="T …" schreiben, die für unterschiedliche Datentypen funktioniert',
      'Mit einer Einschränkung (extends) erzwingen, dass jeder Typ eine id hat',
      'Den Typ T durch defineProps, defineModel und defineEmits laufen lassen',
      'Typfehler im Template mit vue-tsc und @vue-expect-error sichtbar und testbar machen',
    ],
    simple: `Ein Auswahlfeld (<select>) braucht immer dasselbe: eine Liste von Optionen, eine Beschriftung und die gewählte Option. Ob die Optionen Projekte, Personen oder Länder sind, ist egal. Schreibst du es ohne Generics, verlierst du den Typ: Die gewählte Option ist „irgendein Objekt“.

Mit einem generischen Typ T sagst du: „Diese Komponente funktioniert für jeden Typ T, der mindestens eine id hat.“ Übergibt der Elternteil Projekte, ist T = Projekt, und überall (Beschriftungsfunktion, v-model, Ereignis) kennt TypeScript den echten Typ. Tippfehler wie p.nmae fallen sofort auf.

Wichtig zu verstehen: Diese Prüfung findet beim Entwickeln und Bauen statt (mit vue-tsc), nicht im Browser. Zur Laufzeit gibt es keine Typen mehr.`,
    steps: [
      '<script setup lang="ts" generic="T extends { id: string | number }"> deklariert den Typparameter und die Einschränkung.',
      'defineProps<{ label: string; options: readonly T[]; getLabel: (option: T) => string }>() verwendet T in den Props.',
      'defineModel<T | null>() und defineEmits<{ change: [option: T | null] }>() geben denselben Typ weiter.',
      'Der Vergleich der gewählten Option erfolgt über String(option.id), weil der Wert im DOM immer ein String ist. Das Beispiel prüft mit instanceof, dass das Ereignis von einem <select> kommt, statt mit einem Cast zu arbeiten.',
      'ProjectPicker.vue zeigt die Verwendung. Dank Inferenz ist p im getLabel-Callback ein Project; p.name und p.archived sind geprüft.',
      'Im selben Template steht ein bewusst falscher Aufruf mit Optionen ohne id, markiert mit dem Kommentar @vue-expect-error. vue-tsc besteht nur, wenn dort wirklich ein Typfehler vorliegt. So bleibt der Vertrag überprüfbar.',
      'Erkenntnis aus dem Lab: mount() aus @vue/test-utils kann die Generics der Komponente nicht ableiten. Im Test wurde deshalb eine neutrale getLabel-Funktion verwendet; der Typvertrag wird über ProjectPicker und vue-tsc geprüft.',
    ],
    code: { file: lab + 'src/lessons/components/SelectField.vue', lang: 'Vue' },
    code2: { file: lab + 'src/lessons/components/ProjectPicker.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `npx vue-tsc --noEmit        -> keine Fehler (der @vue-expect-error-Fall ist ein erwarteter Fehler)
vitest (Block „Slots und generische Komponenten“ / „Typinferenz im Template“): grün
 - Auswahl "2" liefert Objekt Beta; Auswahl "" liefert null
 - ProjectPicker rendert und zeigt "Gewählt: Altprojekt"`,
    mistakes: [
      { wrong: 'T ohne Einschränkung verwenden und dann option.id lesen.',
        why: 'TypeScript weiß nicht, dass jeder Typ eine id hat, und meldet einen Fehler. Ein Cast würde das nur überdecken.',
        fix: 'Mit extends { id: string | number } die Mindestform erzwingen.' },
      { wrong: 'Mit „as“ casten, bis der Compiler schweigt (z. B. event.target as HTMLSelectElement).',
        why: 'Ein Cast verspricht dem Compiler etwas, das niemand prüft. Stimmt es nicht, gibt es einen Laufzeitfehler.',
        fix: 'Mit instanceof oder einer Typprüfung einengen (wie im Beispiel) und Casts nur mit begründetem Hinweis verwenden.' },
      { wrong: 'Zu glauben, TypeScript prüfe Daten zur Laufzeit.',
        why: 'Typen verschwinden beim Bauen. Daten aus dem Netz sind unknown, bis sie geprüft wurden (siehe Modul js-m3, Zod).',
        fix: 'Typen für die Entwicklungszeit, Schemas für Fremddaten zur Laufzeit.' },
      { wrong: 'Nur vite build auszuführen und Typfehler in Templates nicht zu prüfen.',
        why: 'Vite baut ohne Typprüfung. Fehler in Templates sieht erst vue-tsc.',
        fix: 'vue-tsc --noEmit in Build und CI aufnehmen (im Lab ist es Teil von npm run build).' },
    ],
    practice: 'Generische Komponenten lohnen sich für wirklich wiederverwendbare Bausteine (Auswahl, Tabelle, Liste). Für einmalige Spezialfälle ist eine konkrete Komponente einfacher. Halte die Einschränkung so klein wie möglich: Je weniger T verlangt, desto vielseitiger bleibt die Komponente.',
    exercises: [
      { task: 'Verwende SelectField für eine Liste von Personen mit id und name. Beschrifte die Optionen mit „Name (id)“.', acceptance: 'Typgeprüfter Aufruf; vue-tsc ist grün; Auswahl liefert eine Person bzw. null.' },
      { task: 'Grenzfall: Übergib Optionen mit id vom Typ number und andere vom Typ string in einer Liste. Funktioniert der Vergleich? Was passiert bei id 1 und "1"?', acceptance: 'Beide haben dieselbe String-Form; die Doppeldeutigkeit ist erklärt und eine eindeutige id-Regel vorgeschlagen.' },
      { task: 'Fehlerfall: Entferne den Kommentar @vue-expect-error im Template. Was meldet vue-tsc? Stelle den Kommentar wieder her.', acceptance: 'Typfehler zu den Optionen ohne id wird gemeldet; mit Kommentar läuft die Prüfung wieder durch.' },
    ],
    quiz: [
      { q: 'Was bewirkt generic="T extends { id: string | number }" an einer Komponente?',
        options: ['Sie akzeptiert jeden Typ T mit mindestens einer id; TypeScript leitet T aus den Props ab.', 'Die Komponente prüft zur Laufzeit, ob jedes Objekt eine id hat.', 'Die Komponente akzeptiert nur Objekte, deren id eine Zahl ist.'],
        correct: 0,
        rationales: ['So funktioniert ein eingeschränkter Typparameter; die Inferenz findet T beim Aufruf.', 'Typen existieren zur Laufzeit nicht mehr; geprüft wird beim Bauen.', 'Die Einschränkung erlaubt string und number als id.'],
        explain: 'Generics + Einschränkung geben Typsicherheit für beliebige, aber passende Typen – zur Entwicklungszeit.' },
      { q: 'Wozu dient der Kommentar <!-- @vue-expect-error --> im Template?',
        options: ['Er unterdrückt jeden Typfehler im Template, damit der Build durchläuft.', 'Er erwartet an der folgenden Zeile einen Typfehler; fehlt dieser, schlägt vue-tsc fehl.', 'Er blendet die folgende Zeile im Browser aus, wenn sie fehlerhaft ist.'],
        correct: 1,
        rationales: ['Er unterdrückt nicht pauschal; er verlangt genau einen Fehler.', 'So wird ein beabsichtigter Typfehler zum überprüfbaren Vertrag.', 'Er beeinflusst die Darstellung im Browser nicht.'],
        explain: '@vue-expect-error macht Negativfälle der Typen prüfbar.' },
      { q: 'Warum reicht ein grüner Vite-Build nicht als Nachweis, dass alle Typen in Templates stimmen?',
        options: ['Vite führt keine Typprüfung durch; die übernimmt vue-tsc.', 'Vite meldet Typfehler grundsätzlich nur als Warnung im Browser.', 'Vite ignoriert alle .vue-Dateien.'],
        correct: 0,
        rationales: ['Vite transpiliert ohne Typprüfung; deshalb gehört vue-tsc in den Build.', 'Vite zeigt keine Typfehler an, weder als Warnung noch als Fehler.', 'Vite verarbeitet .vue-Dateien normal (mit dem Vue-Plugin), nur eben ohne Typprüfung.'],
        explain: 'Typprüfung braucht vue-tsc; Vite allein prüft keine Typen.' },
    ],
    sources: [
      vueDocs('Vue: TypeScript mit Composition API', 'https://vuejs.org/guide/typescript/composition-api.html'),
      vueDocs('Vue: Generic Components (script setup)', 'https://vuejs.org/api/sfc-script-setup.html#generics'),
    ],
    verification: 'vue-tsc ohne Fehler (inklusive erwartetem @vue-expect-error); Tests im vue-lab grün. Das Verhalten von Typen im Editor (IDE) wurde nicht geprüft.',
  },
];
