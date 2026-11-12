// Vue 3.5 · Formulare und Serverdaten (Zod 4, TanStack Query 5). Stichtag 12.11.2026.
// Eigene Texte; Code und Tests liegen unter content/examples/vue-lab/src/lessons/ und tests/data.spec.ts.
// Zod und TanStack Query stehen unter MIT-Lizenz; hier wird kein fremder Code übernommen, nur verlinkt und erklärt.
const lab = 'content/examples/vue-lab/';
const docs = (title, url, note = 'Offizielle Dokumentation; Inhalt hier eigenständig zusammengefasst.') => ({ title, url, note });

export const module = {
  id: 'js-m3', course: 'javascript', part: 23, partTitle: 'JavaScript & Vue · Vollständiger Lernpfad',
  title: 'Vue-Formulare und Serverdaten · Zod, Query-Cache und Mini-Projekt',
};

export const lessons = [
  {
    id: 'js-m3-l1', title: 'Formulare mit Zod: ein Schema für Regeln und Typen', minutes: 40,
    prerequisites: 'Lektion „defineModel“ (js-m2-l1); Formulare und Barrierefreiheit (js-m1-l10).',
    objectives: [
      'Erklären, warum ein Schema Regeln und TypeScript-Typen aus einer Quelle ableitet',
      'Ein Zod-4-Schema mit trim, Längen, Datumsformat, Vergleich und transform schreiben',
      'Den Unterschied zwischen Eingabetyp (z.input) und Ausgabetyp (z.output) nennen',
      'Fehler erst nach Blur oder Absenden zeigen, mit aria-invalid, aria-describedby und Fokus auf das erste fehlerhafte Feld',
    ],
    simple: `Ein Formular muss prüfen, was Menschen eintippen: Ist der Titel leer? Liegt das Datum in der Vergangenheit? Diese Regeln stehen oft doppelt im Code – einmal als Prüfung, einmal als TypeScript-Typ – und laufen irgendwann auseinander.

Zod ist eine Bibliothek, mit der du die Regeln einmal als Schema beschreibst. Aus dem Schema bekommst du zwei Dinge: eine Prüfung, die Fehlermeldungen liefert, und die passenden Typen. Der Typ der Rohwerte (z. B. dueDate ist ein Text, leer erlaubt) unterscheidet sich vom Typ der geprüften Daten (dueDate ist Datum oder null). Zod kennt beide.

Für Menschen zählt die Bedienung: Fehler erscheinen nicht schon beim ersten Tastendruck, sondern nach dem Verlassen des Felds oder beim Absenden. Beim Absenden springt der Fokus zum ersten fehlerhaften Feld, und die Eingaben bleiben erhalten.`,
    steps: [
      'z.string().trim().min(1).max(120) entfernt zuerst Leerzeichen und prüft dann Länge. Nur Leerzeichen ergeben also „Titel darf nicht leer sein“.',
      'Fehlermeldungen setzt du in Zod 4 mit der Option error (statt message in älteren Versionen).',
      'z.iso.date() prüft das Format JJJJ-MM-TT (Zod 4). Mit z.union([z.literal(""), …]) darf das Feld auch leer bleiben.',
      '.refine(...) vergleicht das Datum mit „heute“. today ist ein Parameter, damit Tests nicht von der Systemuhr abhängen. todayIso() bildet das lokale Datum, nicht UTC.',
      '.transform(...) wandelt "" in null, so wie die API es erwartet. z.input liefert den Rohtyp, z.output den geprüften Typ.',
      'validateTaskForm nutzt safeParse (wirft nicht) und reduziert die Probleme auf eine Meldung pro Feld: eine Korrektur nach der anderen.',
      'TaskForm.vue zeigt Fehler erst nach Blur oder Absenden (shown-Menge), verknüpft sie mit aria-describedby, setzt aria-invalid und fokussiert beim Absenden das erste ungültige Feld. novalidate schaltet die Browser-Meldungen ab, damit nur unsere gelten.',
      'Die Tests prüfen: Normalfall, Grenzfälle (120 vs. 121 Zeichen, heute vs. gestern), Fehlerfälle und die Zugänglichkeits-Attribute.',
    ],
    code: { file: lab + 'src/lessons/forms/taskSchema.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/forms/TaskForm.vue', lang: 'Vue' },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Blöcke „Zod-Schema“ und „TaskForm (Zugänglichkeit)“): 7 Tests grün
 - Normalfall: "  Einkaufen  " + "" -> { title: "Einkaufen", dueDate: null }
 - Grenzfälle: 120 Zeichen ok, 121 nicht; heute ok, gestern nicht
 - Fehlerfälle: nur Leerzeichen, falsches Datumsformat, falsche Typen
 - Fehler erst nach Blur; aria-invalid und aria-describedby gesetzt; Eingabe bleibt
 - Absenden mit Fehler: Fokus auf dem ersten ungültigen Feld, kein submit-Ereignis`,
    mistakes: [
      { wrong: 'Regeln einmal im Schema und noch einmal von Hand im Formular schreiben.',
        why: 'Beide Stellen laufen auseinander; der Nutzer sieht andere Regeln als der Server verlangt.',
        fix: 'Das Schema als einzige Quelle verwenden und Typen mit z.input/z.output daraus ableiten.' },
      { wrong: 'Fehler schon beim ersten Tastendruck anzeigen.',
        why: 'Menschen sehen Fehler, bevor sie fertig getippt haben. Das stört und kann Screenreader mit Meldungen überfluten.',
        fix: 'Erst nach Blur oder Absenden zeigen; danach live aktualisieren.' },
      { wrong: 'Fehler nur rot einfärben.',
        why: 'Farbe allein erreicht nicht alle Menschen und verletzt WCAG 2.2.',
        fix: 'Text, aria-invalid="true" und aria-describedby verwenden; beim Absenden Fokus auf das erste fehlerhafte Feld setzen.' },
      { wrong: 'Heute mit new Date().toISOString().slice(0, 10) bestimmen.',
        why: 'toISOString liefert UTC. Abends in Deutschland kann das schon das Datum von morgen sein oder morgens das von gestern.',
        fix: 'Lokale Datumsteile (getFullYear, getMonth, getDate) verwenden, wie todayIso() es tut.' },
      { wrong: 'Der Prüfung im Browser als Schutz vertrauen.',
        why: 'Clientseitige Validierung ist Komfort. Wer die API direkt aufruft, umgeht sie.',
        fix: 'Der Server prüft immer selbst (siehe Spring-Lab, Fehlervertrag) und der Client zeigt dessen Feldfehler an (Lektion 5).' },
    ],
    practice: 'Formulare sind klein, aber heikel: Beschriftung, Fehlermeldung, Fokus, Eingabe behalten. Prüfe sie immer auch mit der Tastatur. Der Autotest findet nur einen Teil der Probleme; die vollständige Zugänglichkeit braucht einen manuellen Durchgang.',
    exercises: [
      { task: 'Ergänze ein Feld „Priorität“ (niedrig, mittel, hoch) im Schema mit z.enum und gib die Fehlermeldung auf Deutsch aus.', acceptance: 'Ungültiger Wert wird abgelehnt; der Typ TaskFormData enthält die drei Werte als Union.' },
      { task: 'Grenzfall: Teste den Titel mit 120 und 121 Zeichen sowie „ä“ am Ende. Wie zählt Zod die Länge bei Emojis? Notiere die Beobachtung.', acceptance: '120 ok, 121 Fehler; Hinweis dokumentiert, dass Länge in UTF-16-Einheiten gezählt wird und ein Emoji mehrere zählt.' },
      { task: 'Fehlerfall: Tippe im Browser einen leeren Titel und sende ab. Prüfe mit der Tastatur: Fokus, Fehlertext, Screenreader-Ansage (falls verfügbar).', acceptance: 'Fokus liegt auf dem Titelfeld; der Fehlertext ist mit dem Feld verknüpft; Beobachtungen aus dem echten Browser notiert.' },
    ],
    quiz: [
      { q: 'Was ist der Vorteil, Regeln und Typen aus einem Zod-Schema abzuleiten?',
        options: ['Es gibt nur eine Quelle der Wahrheit; Regeln und Typen können nicht auseinanderlaufen.', 'Zod macht eine Prüfung auf dem Server überflüssig, weil das Schema ausreicht.', 'TypeScript prüft die Daten dadurch auch zur Laufzeit im Browser.'],
        correct: 0,
        rationales: ['Das Schema liefert Prüfung und Typen gemeinsam.', 'Der Server muss immer selbst prüfen; Clientprüfung ist nur Komfort.', 'Typen verschwinden beim Bauen; Zod prüft Werte zur Laufzeit, TypeScript nicht.'],
        explain: 'Ein Schema vermeidet doppelte Regeln und doppelte Typen.' },
      { q: 'Warum wird „heute“ in todayIso() mit lokalen Datumsteilen gebildet?',
        options: ['toISOString() liefert UTC; das Datum kann je nach Uhrzeit um einen Tag abweichen.', 'Lokale Datumsteile sind schneller zu berechnen als ein ISO-String.', 'Zod verlangt für Datumsprüfungen zwingend lokale Datumsteile.'],
        correct: 0,
        rationales: ['Rund um Mitternacht fällt UTC und Ortszeit auseinander; die Prüfung wäre falsch.', 'Geschwindigkeit spielt hier keine Rolle.', 'Zod verlangt das nicht; es ist eine fachliche Entscheidung.'],
        explain: 'Für „heute“ des Nutzers zählt das lokale Datum.' },
      { q: 'Beim Absenden sind mehrere Felder ungültig. Was ist für Tastatur- und Screenreader-Nutzer die beste Reaktion?',
        options: ['Alle fehlerhaften Felder rot einfärben und sonst nichts weiter verändern.', 'Fokus auf das erste ungültige Feld setzen, Fehlertext per aria-describedby verknüpfen, Eingaben behalten.', 'Die Seite neu laden, damit das Formular wieder leer und fehlerfrei beginnt.'],
        correct: 1,
        rationales: ['Farbe allein ist nicht zugänglich, und der Fokus bleibt irgendwo.', 'So finden Nutzer den Fehler sofort und können ihn beheben.', 'Verlorene Eingaben sind eines der größten Ärgernisse in Formularen.'],
        explain: 'Fokus, Textfehler und erhaltene Eingaben sind die Grundlage zugänglicher Fehlerbehandlung.' },
    ],
    sources: [
      docs('Zod: Dokumentation (Grundlagen, Schemas, Fehler)', 'https://zod.dev/', 'Zod steht unter MIT-Lizenz; Inhalt hier eigenständig zusammengefasst.'),
      docs('W3C: WAI-Tutorial Formulare – Validierung', 'https://www.w3.org/WAI/tutorials/forms/validation/', 'W3C-Tutorial; nur verlinkt und zusammengefasst.'),
    ],
    verification: 'Tests im vue-lab (zod 4.6.7, Vitest 5.1.0, jsdom) grün; vue-tsc fehlerfrei. Screenreader-Verhalten und echte Tastaturbedienung wurden nicht automatisiert geprüft.',
  },

  {
    id: 'js-m3-l2', title: 'Serverdaten und Query-Cache mit TanStack Query', minutes: 45,
    prerequisites: 'Lektion „Formulare mit Zod“; Promises (js-m1-l4), fetch (js-m1-l5) und API-Zustände (js-m1-l11).',
    objectives: [
      'Unterscheiden zwischen Serverzustand (gehört dem Server, kann veralten) und UI-Zustand (gehört der Oberfläche)',
      'Antworten an der Grenze mit einem Schema prüfen und Fehler im RFC-9457-Format in einen ApiError übersetzen',
      'Mit useQuery Daten laden, zwischenspeichern und Schlüssel (queryKey) fachlich benennen',
      'staleTime, placeholderData und Invalidierung nach einer Mutation erklären',
    ],
    simple: `Daten vom Server sind „geliehen“: Sie können sich jederzeit ändern. Ein Query-Cache wie TanStack Query nimmt dir die lästige Handarbeit ab. Er merkt sich Antworten unter einem Schlüssel, zeigt sofort Gespeichertes an, lädt bei Bedarf im Hintergrund nach und kümmert sich um Lade- und Fehlerzustand.

Zwei Regeln helfen. Erstens: Jede Antwort ist unknown, bis ein Schema sie bestätigt hat. Ein Server kann sich irren, eine neue Version ausliefern oder ein Proxy kann HTML statt JSON schicken. Zweitens: Der Schlüssel beschreibt die Daten („Aufgaben, Seite 2“), nicht den Aufruf. Ändert sich die Seite, entsteht ein neuer Cache-Eintrag.

Nach einer Änderung (Aufgabe anlegen) sagst du dem Cache: „Alles zu tasks ist veraltet.“ Er lädt die sichtbaren Daten neu.`,
    steps: [
      'taskSchema und taskPageSchema beschreiben den Vertrag der API. schema.parse(await response.json()) wirft bei Vertragsbruch; ungeprüfte Antworten werden nie weitergereicht.',
      'Fehlerantworten (nicht 2xx) werden als RFC-9457-„Problem Details“ gelesen (problemSchema). Daraus entsteht ein ApiError mit status, problem und fieldErrors (erste Meldung je Feld). Das passt zum Spring-Lab (Lektion java-m26-l3).',
      'createTasksApi(fetcher) bekommt fetch als Parameter. So kann der Test ein In-Memory-„Backend“ (fakeServer.ts) mit echten Response-Objekten einsetzen, ohne Netzwerk.',
      'taskKeys.page(page) ist ein Schlüssel mit einer ref. Ändert sich page, lädt useQuery automatisch die neue Seite und legt einen neuen Cache-Eintrag an.',
      'queryFn erhält ein signal (AbortSignal): Wird eine Abfrage überholt, bricht der fetch sauber ab.',
      'staleTime: 30_000 bedeutet: 30 Sekunden gelten die Daten als frisch; beim Zurücknavigieren gibt es keinen neuen Request.',
      'placeholderData: keepPreviousData zeigt beim Blättern die alte Seite weiter, bis die neue da ist. Das vermeidet Flackern; isPlaceholderData verrät, dass die Daten noch alt sind.',
      'useCreateTask ruft nach Erfolg invalidateQueries({ queryKey: taskKeys.all }) auf. Alle Seiten gelten als veraltet; sichtbare werden neu geladen.',
      'Die Tests belegen: frische Daten kommen aus dem Cache (kein zweiter GET), nach Invalidierung wird neu geladen, RFC-9457-Fehler werden zu ApiError und ein Vertragsbruch wird abgelehnt.',
    ],
    code: { file: lab + 'src/lessons/data/tasksApi.ts', lang: 'TypeScript' },
    code2: { file: lab + 'src/lessons/data/queries.ts', lang: 'TypeScript', from: 'export const taskKeys', to: 'queryClient.invalidateQueries({ queryKey: taskKeys.all }),   // alle Seiten gelten als veraltet', plus: 2 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Blöcke „API-Grenze“ und „Query-Cache“): grün
 - 422 + application/problem+json -> ApiError(status 422, fieldErrors { title: "Titel existiert bereits" })
 - Antwort { items: [{ id: "x" }] } -> abgelehnt (Vertragsbruch)
 - frische Daten aus dem Cache: kein zweiter GET; nach Invalidierung: neuer GET`,
    mistakes: [
      { wrong: 'Serverdaten in einen eigenen Store kopieren und selbst aktuell halten.',
        why: 'Du baust Cache, Wiederholung, Abbruch und Invalidierung selbst nach – und machst dabei Fehler.',
        fix: 'Serverzustand dem Query-Cache überlassen; UI-Zustand (Dialog offen, Eingabe) bleibt lokal oder im Store.' },
      { wrong: 'Antworten mit „as Task[]“ in einen Typ zu zwingen.',
        why: 'Ein Cast prüft nichts. Ändert der Server sein Format, bricht die Anwendung später an einer unerwarteten Stelle.',
        fix: 'An der Grenze mit einem Schema parsen und bei Fehler abbrechen.' },
      { wrong: 'Einen Schlüssel wie ["load"] verwenden und die Seite nicht aufnehmen.',
        why: 'Alle Seiten teilen einen Cache-Eintrag; man sieht falsche Daten.',
        fix: 'Alles, wovon das Ergebnis abhängt, gehört in den Schlüssel (Seite, Filter, Sortierung).' },
      { wrong: 'staleTime: 0 beibehalten und sich über viele Requests wundern.',
        why: 'Standardmäßig gelten Daten sofort als veraltet und werden bei vielen Ereignissen neu geladen.',
        fix: 'staleTime bewusst wählen: wie lange ist „alt“ fachlich okay? Dann Mutationen gezielt invalidieren.' },
      { wrong: 'Den Fehlerfall nur in der Konsole behandeln.',
        why: 'Nutzer sehen eine leere Seite oder ewiges Laden.',
        fix: 'Lade-, Fehler- und Leerzustand sichtbar machen (Lektion 5) und ein erneutes Versuchen anbieten.' },
    ],
    practice: 'Frage bei jedem Datum: Wem gehört es? Gehört es dem Server, dann in den Query-Cache. Gehört es der Oberfläche, dann ref/Store. Halte Schlüssel in einer Datei zusammen (taskKeys), damit Invalidierung nicht an Tippfehlern scheitert. Beachte beim Einsatz echter APIs zusätzlich Authentifizierung und CSRF-Schutz auf Serverseite; sie sind nicht Teil dieser Lektion.',
    exercises: [
      { task: 'Füge der API ein Feld „priority“ hinzu: Schema anpassen, Fake-Server anpassen, Test ergänzen.', acceptance: 'Alte Antworten ohne Feld werden abgelehnt (oder bewusst mit Standardwert akzeptiert); Entscheidung dokumentiert.' },
      { task: 'Grenzfall: Setze staleTime auf 0 und beobachte im Test die Anzahl der GET-Aufrufe beim Zurückblättern. Vergleiche mit 30 s.', acceptance: 'Zahlen der Aufrufe notiert; Zusammenhang zwischen staleTime und Requests erklärt.' },
      { task: 'Fehlerfall: Lass den Fake-Server HTML statt JSON liefern. Was passiert in request()? Welche Meldung sieht der Nutzer?', acceptance: 'Fehler wird abgefangen (kein ungeprüftes Weiterreichen); der Nutzer sieht den Fehlerzustand mit Wiederholungs-Schaltfläche.' },
    ],
    quiz: [
      { q: 'Warum gehört der Seitenwert in den queryKey?',
        options: ['Damit jede Seite einen eigenen Cache-Eintrag hat und bei Änderung automatisch neu geladen wird.', 'Damit der Schlüssel länger wird und dadurch seltener mit anderen kollidiert.', 'Weil ohne Seitenwert überhaupt keine Anfrage an den Server gesendet wird.'],
        correct: 0,
        rationales: ['Der Schlüssel beschreibt die Daten; Abhängigkeiten gehören hinein.', 'Länge ist kein Ziel; der Schlüssel beschreibt die Daten.', 'Anfragen werden auch ohne Seitenwert gesendet, nur mit falscher Zuordnung.'],
        explain: 'Alles, wovon das Ergebnis abhängt, gehört in den Schlüssel.' },
      { q: 'Was bewirkt staleTime: 30_000?',
        options: ['Daten werden nach 30 Sekunden aus dem Cache gelöscht und neu geladen.', 'Daten gelten 30 Sekunden als frisch; in dieser Zeit löst Anzeigen keinen neuen Request aus.', 'Abfragen werden nach dem Auslösen 30 Sekunden verzögert an den Server gesendet.'],
        correct: 1,
        rationales: ['Gelöscht werden Daten über gcTime, nicht über staleTime.', 'So steht es in der Dokumentation: frische Daten werden aus dem Cache bedient.', 'Verzögert wird nichts; es geht um Frische.'],
        explain: 'staleTime legt fest, wie lange Daten als aktuell gelten.' },
      { q: 'Ein Server liefert plötzlich ein anderes JSON-Format. Wie verhindert die Schema-Prüfung Folgeschäden?',
        options: ['Sie wandelt die Daten automatisch in das alte Format um.', 'Sie wirft an der Grenze einen Fehler; die Oberfläche zeigt den Fehlerzustand.', 'Sie ignoriert unbekannte Antworten und zeigt eine leere Seite.'],
        correct: 1,
        rationales: ['Ein Schema kennt kein altes Format und rät nicht.', 'Fehler früh und sichtbar zu machen ist der Sinn der Prüfung an der Grenze.', 'Stilles Ignorieren verschleiert den Fehler.'],
        explain: 'Schema-Prüfung macht Vertragsbrüche sofort sichtbar.' },
    ],
    sources: [
      docs('TanStack Query (Vue): Überblick und Quick Start', 'https://tanstack.com/query/latest/docs/framework/vue/overview', 'TanStack Query steht unter MIT-Lizenz; Inhalt hier eigenständig zusammengefasst.'),
      docs('TanStack Query: Important Defaults (staleTime, gcTime)', 'https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults'),
      docs('RFC 9457: Problem Details for HTTP APIs', 'https://www.rfc-editor.org/rfc/rfc9457.html', 'IETF-Standard; nur verlinkt.'),
    ],
    verification: 'Tests im vue-lab (@tanstack/vue-query 5.107.1, zod 4.6.7) grün; kein echtes Netzwerk, sondern ein In-Memory-Fake-Server mit echten Response-Objekten.',
  },

  {
    id: 'js-m3-l3', title: 'Mutationen und optimistische Updates mit Rollback', minutes: 40,
    prerequisites: 'Lektion „Query-Cache“.',
    objectives: [
      'Erklären, was ein optimistisches Update ist und wann es sich lohnt',
      'Die vier Schritte nennen: abbrechen, Schnappschuss, sofort anzeigen, bei Fehler zurückrollen',
      'Nach Erfolg oder Fehler mit dem Server abgleichen (onSettled)',
      'Die Tests für Erfolg, Fehler und Verzögerung (Gate-Technik) verstehen',
    ],
    simple: `Wenn du einen Haken setzt, soll er sofort sichtbar sein, auch wenn der Server noch antwortet. Das nennt man ein optimistisches Update: Die Oberfläche tut so, als hätte es geklappt. Klappt es nicht, muss sie ehrlich zum alten Stand zurück und das auch zeigen.

Dafür braucht es vier Schritte. Erstens: Laufende Abrufe abbrechen, sonst überschreibt deren Antwort deine Änderung. Zweitens: den alten Stand merken (Schnappschuss). Drittens: die Änderung sofort im Cache setzen. Viertens: bei einem Fehler den Schnappschuss zurückschreiben. Am Ende (egal ob Erfolg oder Fehler) lädst du neu, damit Oberfläche und Server wieder übereinstimmen.

Wichtig: Optimistisch nur dort, wo ein Fehlschlag selten und harmlos ist (Haken setzen). Bei Zahlungen oder Löschungen ist ehrliches Warten besser.`,
    steps: [
      'useMutation bekommt mutationFn: den eigentlichen Aufruf an die API.',
      'onMutate läuft vor dem Request. Zuerst cancelQueries: Laufende Abrufe dürfen das optimistische Ergebnis nicht überschreiben.',
      'getQueriesData holt Schnappschüsse aller betroffenen Cache-Einträge (alle Seiten). Sie werden als context zurückgegeben.',
      'setQueriesData setzt die Änderung in allen Seiten sofort (neues Objekt, ohne das alte zu verändern).',
      'onError schreibt die Schnappschüsse mit setQueryData zurück. Der Nutzer sieht den alten Stand wieder.',
      'onSettled ruft invalidateQueries auf: Egal wie es ausging, der Server hat das letzte Wort.',
      'Die Tests nutzen ein „Gate“: Ein Promise, das der Test selbst auflöst, hält die Serverantwort an. Dann lässt sich der Zwischenzustand prüfen: Der Haken ist sofort gesetzt, obwohl der Server noch nicht geantwortet hat.',
      'Im Fehlerfall (failPatch) prüft der Test den Rollback: Nach der 500-Antwort ist der Haken wieder entfernt.',
    ],
    code: { file: lab + 'src/lessons/data/queries.ts', lang: 'TypeScript', from: '// Lektion "Optimistische Updates"', to: 'onSettled: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),', plus: 2 },
    code2: { file: lab + 'tests/data.spec.ts', lang: 'TypeScript', from: "it('zeigt das optimistische Update sofort und bestätigt es danach'", to: "Aufgabe 1:false'));   // Rollback + Neuabgleich", plus: 2 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „Query-Cache“):
 - optimistisch: Haken sofort sichtbar, während der Server noch wartet; nach Freigabe bestätigt
 - Serverfehler 500: Rollback auf den früheren Stand`,
    mistakes: [
      { wrong: 'Ohne cancelQueries optimistisch aktualisieren.',
        why: 'Eine ältere, noch laufende Abfrage kann danach eintreffen und das optimistische Ergebnis überschreiben. Der Haken „springt“ zurück.',
        fix: 'In onMutate zuerst cancelQueries aufrufen.' },
      { wrong: 'Den Cache direkt verändern (task.done = true).',
        why: 'Gemeinsame Objekte werden verändert, Vue und Query-Cache merken Änderungen nicht zuverlässig, und der Schnappschuss ist wertlos.',
        fix: 'Immer neue Objekte erzeugen (Spread, map) – wie im Beispiel.' },
      { wrong: 'Keinen Rollback und keine Rückmeldung bei Fehlern vorsehen.',
        why: 'Der Nutzer glaubt, es sei gespeichert; nach einem Reload ist es weg.',
        fix: 'Rollback und eine sichtbare Meldung (role="alert") vorsehen. Das Lab zeigt die Daten korrekt zurück; eine Meldung ist als Übung ergänzt.' },
      { wrong: 'Alles optimistisch machen, auch Bezahlvorgänge.',
        why: 'Ein „zu früh bestätigtes“ Ergebnis erzeugt Vertrauensverlust oder sogar rechtliche Probleme.',
        fix: 'Optimistisch nur bei harmlosen, leicht umkehrbaren Änderungen; sonst Ladezustand zeigen und warten.' },
    ],
    practice: 'Plane Fehler zuerst: Was sieht der Nutzer, wenn es schiefgeht? Dann erst die schnelle Variante. Teste immer drei Fälle: Erfolg, Fehler, Verzögerung. Ohne Gate-Technik bleibt der Zwischenzustand unsichtbar und der Test beweist wenig.',
    exercises: [
      { task: 'Ergänze in TaskInbox eine Meldung mit role="alert", wenn das Umschalten fehlschlägt („Änderung konnte nicht gespeichert werden“).', acceptance: 'Bei failPatch erscheint die Meldung; bei Erfolg nicht; Test ergänzt.' },
      { task: 'Grenzfall: Schalte schnell zweimal denselben Haken (an, aus), bevor der Server antwortet. Was passiert mit dem Schnappschuss? Beschreibe das Verhalten.', acceptance: 'Beobachtung dokumentiert; Risiko überlappender Mutationen erklärt (z. B. mutationKey/Serialisierung als Ausweg).' },
      { task: 'Fehlerfall: Entferne cancelQueries und baue im Test einen langsamen GET, der nach dem optimistischen Update eintrifft. Beschreibe das Fehlverhalten.', acceptance: 'Haken springt zurück; Ursache und Fix (cancelQueries) sind erklärt.' },
    ],
    quiz: [
      { q: 'Wozu dient cancelQueries in onMutate?',
        options: ['Laufende Abrufe dürfen das optimistische Ergebnis nicht überschreiben.', 'Es löscht den gesamten Cache.', 'Es beschleunigt den Request.'],
        correct: 0,
        rationales: ['Eine ältere Antwort könnte sonst nach dem optimistischen Update eintreffen und es überschreiben.', 'Der Cache bleibt erhalten, es werden nur laufende Abfragen abgebrochen.', 'Mit Geschwindigkeit hat es nichts zu tun.'],
        explain: 'Abbrechen verhindert, dass alte Antworten das optimistische Ergebnis überschreiben.' },
      { q: 'Warum werden im Beispiel Schnappschüsse der Cache-Einträge gespeichert?',
        options: ['Damit bei einem Fehler der frühere Stand wiederhergestellt werden kann.', 'Damit die Daten doppelt vorhanden sind.', 'Weil Vue es verlangt.'],
        correct: 0,
        rationales: ['onError schreibt die Schnappschüsse zurück (Rollback).', 'Doppelte Daten sind kein Ziel.', 'Vue verlangt das nicht; es ist Teil des Musters.'],
        explain: 'Der Schnappschuss ist die Grundlage des Rollbacks.' },
      { q: 'Wann ist ein optimistisches Update eine schlechte Idee?',
        options: ['Beim Setzen eines Hakens in einer Liste, die der Nutzer jederzeit ändern kann.', 'Bei Zahlungen oder anderen Aktionen, bei denen ein falsch bestätigtes Ergebnis schwerwiegend ist.', 'Wenn die Liste nur wenige Einträge enthält und selten geändert wird.'],
        correct: 1,
        rationales: ['Hier ist es unkritisch und üblich.', 'Bei folgenreichen Aktionen ist ehrliches Warten besser als eine vorschnelle Bestätigung.', 'Die Länge der Liste ist unerheblich.'],
        explain: 'Optimistisch nur für harmlose, leicht umkehrbare Änderungen.' },
    ],
    sources: [
      docs('TanStack Query (Vue): Optimistic Updates', 'https://tanstack.com/query/latest/docs/framework/vue/guides/optimistic-updates', 'TanStack Query steht unter MIT-Lizenz; Inhalt hier eigenständig zusammengefasst.'),
      docs('TanStack Query (Vue): Mutations', 'https://tanstack.com/query/latest/docs/framework/vue/guides/mutations'),
    ],
    verification: 'Tests im vue-lab grün (Erfolg, Fehler/Rollback, Verzögerung per Gate). Überlappende Mutationen wurden nicht getestet; sie sind als Übung benannt.',
  },

  {
    id: 'js-m3-l4', title: 'Die URL als Zustand: teilbare Seitennummer', minutes: 30,
    prerequisites: 'Lektion „Query-Cache“; Vue Router (js-m1-l12).',
    objectives: [
      'Begründen, warum die Seitennummer in die URL gehört (teilbar, Zurück-Taste, Reload)',
      'Query-Parameter defensiv lesen: Arrays, Text, Zahlen und Unsinn abfangen',
      'Mit computed aus route.query und router.push einen schlanken Zustand bauen',
      'Zusammenspiel mit keepPreviousData erklären (Weiter-Schaltfläche solange gesperrt)',
    ],
    simple: `Auf Seite 3 einer Liste landest du per Link, Reload oder Zurück-Taste. Das funktioniert nur, wenn die Seitennummer in der URL steht (?page=3) und nicht nur in einer Variable. Dann ist die Adresse teilbar und der Browserverlauf macht, was Menschen erwarten.

Aber: Alles in der URL ist Eingabe von außen. Jemand kann ?page=abc, ?page=-5 oder ?page=1&page=2 schreiben. Dein Code muss das lesen, ohne zu stolpern. Die Regel im Beispiel: Alles, was keine positive ganze Zahl ist, wird zu Seite 1.

Und die URL ist die einzige Quelle: Die Komponente liest die Seite aus der Route und schreibt sie bei Klick mit router.push zurück.`,
    steps: [
      'parsePage(raw) nimmt bei mehreren Werten (Array) den ersten, akzeptiert nur Text aus 1 bis 6 Ziffern und liefert sonst 1. Math.max(1, …) verhindert 0.',
      'Die Obergrenze von sechs Ziffern verhindert absurde Zahlen und damit absurde Abfragen.',
      'usePageParam() liefert page (computed aus route.query.page) und setPage(next).',
      'setPage ersetzt nur page und behält andere Query-Parameter: { ...route.query, page: String(...) }.',
      'router.push erzeugt einen Verlaufseintrag; die Zurück-Taste führt zur vorherigen Seite. Für reine Filter-Tipperei wäre router.replace angebracht.',
      'In der Oberfläche: „Zurück“ ist bei Seite 1 deaktiviert. „Weiter“ ist deaktiviert, solange isPlaceholderData wahr ist (alte Seite wird noch gezeigt) oder die letzte Seite erreicht ist.',
      'Ist die Seite größer als totalPages (z. B. ?page=999), antwortet der Server mit einer leeren Liste. Das Beispiel zeigt dann den Leerzustand; eine Weiterleitung auf die letzte Seite wäre eine Verbesserung.',
    ],
    code: { file: lab + 'src/lessons/data/usePageParam.ts', lang: 'TypeScript' },
    code2: { file: lab + 'tests/data.spec.ts', lang: 'TypeScript', from: "describe('URL-Zustand'", to: 'toEqual([3, 1, 1, 1, 1, 2, 1]);', plus: 2 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „URL-Zustand“): grün
 - "3" -> 3, ["2","9"] -> 2, "0" / "-3" / "abc" / undefined / "99999999" (zu lang) -> 1`,
    mistakes: [
      { wrong: 'Number(route.query.page) ohne Prüfung verwenden.',
        why: 'Das Ergebnis kann NaN, 0, negativ oder eine Kommazahl sein. Die Abfrage geht mit Unsinn an den Server.',
        fix: 'Defensiv parsen und Standardwert definieren (parsePage).' },
      { wrong: 'Die Seite zusätzlich in einer ref halten und mit der URL abgleichen.',
        why: 'Zwei Quellen laufen auseinander (Zurück-Taste, Reload).',
        fix: 'Die URL ist die einzige Quelle; page ist ein computed.' },
      { wrong: 'Beim Seitenwechsel die anderen Query-Parameter zu verlieren.',
        why: 'Filter und Sortierung verschwinden beim Blättern.',
        fix: '{ ...route.query, page } verwenden.' },
      { wrong: 'Persönliche oder vertrauliche Daten in Query-Parameter zu schreiben.',
        why: 'URLs landen in Verlauf, Logs und Weiterleitungs-Headern.',
        fix: 'Nur unkritische Zustände (Seite, Sortierung, Filter) in die URL; keine personenbezogenen Daten.' },
    ],
    practice: 'Frage: Soll jemand diesen Zustand teilen oder per Zurück-Taste erreichen können? Dann URL. Wenn nicht (z. B. geöffnetes Menü), dann lokale ref. Dokumentiere erlaubte Parameter wie eine kleine API.',
    exercises: [
      { task: 'Ergänze Sortierung (?sort=due) als zweiten Parameter. Erlaube nur eine feste Liste von Werten und falle sonst auf den Standard zurück.', acceptance: 'Unbekannte Werte werden zum Standard; setPage behält sort.' },
      { task: 'Grenzfall: Teste parsePage mit "007", "1000000" (sieben Ziffern), " 3" und "３" (volle Breite). Notiere die Ergebnisse.', acceptance: '"007" → 7; sieben Ziffern → 1; " 3" → 1; volle Breite → 1 (die Regex akzeptiert nur ASCII-Ziffern).' },
      { task: 'Fehlerfall: Öffne ?page=999. Was sieht der Nutzer? Entwirf (ohne Umsetzung) eine bessere Reaktion.', acceptance: 'Leerzustand beobachtet; Vorschlag (Weiterleitung auf letzte Seite oder Hinweis) mit Begründung formuliert.' },
    ],
    quiz: [
      { q: 'Warum gehört die Seitennummer in die URL?',
        options: ['Die Seite ist teilbar, überlebt einen Reload und die Zurück-Taste funktioniert wie erwartet.', 'Weil Variablen in Vue nicht gespeichert werden können.', 'Damit der Server den Seitenwert gar nicht erst erfährt und nichts zählt.'],
        correct: 0,
        rationales: ['Das sind die Vorteile von URL-Zustand.', 'Variablen funktionieren; sie sind nur nicht teilbar.', 'Der Server erhält den Parameter ja gerade.'],
        explain: 'URL-Zustand ist teilbar, reload-fest und verlaufsfähig.' },
      { q: 'Was liefert parsePage("-5")?',
        options: ['-5', '1', 'NaN'],
        correct: 1,
        rationales: ['Negative Seiten sind nicht erlaubt.', 'Die Regex akzeptiert nur Ziffern; alles andere wird zu 1.', 'Es gibt keinen NaN-Pfad; der Code liefert immer eine gültige Zahl.'],
        explain: 'Unlesbare Werte werden zu Seite 1.' },
      { q: 'Warum ist „Weiter“ deaktiviert, solange isPlaceholderData wahr ist?',
        options: ['Damit niemand weiterblättert, solange noch die alte Seite angezeigt wird und die neue lädt.', 'Weil Platzhalterdaten im Browser grundsätzlich keine Klicks erlauben.', 'Weil isPlaceholderData wahr ist, sobald ein Fehler aufgetreten ist.'],
        correct: 0,
        rationales: ['Während der alten Daten ist unklar, ob es eine nächste Seite gibt; Springen würde Seiten überspringen.', 'Technisch wären Klicks möglich; es ist eine bewusste Entscheidung.', 'Es ist ein normaler Zwischenzustand, kein Fehler.'],
        explain: 'Das Sperren verhindert Seitensprünge auf Basis veralteter Anzeige.' },
    ],
    sources: [
      docs('Vue Router: Query-Parameter und Navigation', 'https://router.vuejs.org/guide/essentials/navigation.html', 'Vue Router steht unter MIT-Lizenz; Inhalt hier eigenständig zusammengefasst.'),
      docs('MDN: URL und Query-String (URLSearchParams)', 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams', 'MDN-Webdokumentation (Texte unter CC BY-SA); hier nur verlinkt.'),
    ],
    verification: 'Test im vue-lab grün (parsePage). Das Verhalten bei ?page=999 wurde nicht automatisiert geprüft; es ist als Übung beschrieben.',
  },

  {
    id: 'js-m3-l5', title: 'Mini-Projekt TaskInbox: alles zusammen', minutes: 60,
    prerequisites: 'Lektionen 1 bis 4 dieses Moduls.',
    objectives: [
      'Formular, Query-Cache, Mutationen und URL-Zustand zu einer kleinen Anwendung verbinden',
      'Lade-, Fehler-, Leer- und Erfolgszustand mit zugänglichen Rollen (status, alert) darstellen',
      'Serverfehler im RFC-9457-Format dem richtigen Formularfeld zuordnen',
      'Die Anwendung gegen einen Fake-Server testen und die Grenzen dieses Tests benennen',
    ],
    simple: `Jetzt kommt alles zusammen. Die TaskInbox zeigt eine Liste von Aufgaben, lässt neue anlegen, Haken setzen und blättern. Dabei gelten die Regeln der letzten Lektionen: Das Formular prüft mit Zod, die Liste kommt aus dem Query-Cache, der Haken ist optimistisch und die Seite steht in der URL.

Besonders wichtig sind die vier Zustände, die jede Datenansicht kennen muss: Laden („Lade Aufgaben …“), Fehler (mit Schaltfläche „Erneut versuchen“), leer („Noch keine Aufgaben“) und Daten. Jeder Zustand bekommt eine passende Rolle (status oder alert), damit Screenreader Änderungen melden.

Und der Server hat das letzte Wort: Meldet er „Titel existiert bereits“ (422), landet diese Meldung am Titelfeld, mit Fokus und Verknüpfung wie bei einer Clientprüfung.`,
    steps: [
      'TaskInbox erhält die API als Prop (api) – so lässt sich in Tests ein Fake-Server einsetzen. Die Router-Anbindung (usePageParam) und der QueryClient kommen von außen (Plugin/Provider).',
      'useTasksQuery, useCreateTask und useToggleTask bündeln die Datenlogik; die Komponente bleibt schlank.',
      'serverErrors wird aus create.error abgeleitet: Nur ApiError mit Status 422 liefert Feldfehler. Alle anderen Fehler erzeugen eine allgemeine Meldung mit role="alert".',
      'Die Anzeige verzweigt: isPending → status „Lade Aufgaben …“; isError → alert mit „Erneut versuchen“ (refetch); leere Liste → Leerzustand; sonst Liste mit Checkboxen und Seitennavigation (nav mit aria-label).',
      'Jede Aufgabe ist ein <label> mit Checkbox: Klickfläche ist die ganze Zeile, der Name ist die Beschriftung.',
      'Während das Anlegen läuft, ist die Schaltfläche deaktiviert und zeigt „Wird gespeichert …“.',
      'Die Tests prüfen vier Wege: Laden und Blättern über die URL (mit Ladezustand), Fehlerzustand mit Wiederholung, Leerzustand und Anlegen inklusive Serverfehler am Feld.',
      'Grenzen: Der Fake-Server ist kein echter Server. Reale Fehler wie Zeitüberschreitungen, CORS, Anmeldung oder CSRF sind nicht abgedeckt. Zusammen mit dem Spring-Lab (java-m26) lässt sich der Vertrag beider Seiten manuell abgleichen.',
    ],
    code: { file: lab + 'src/lessons/data/TaskInbox.vue', lang: 'Vue' },
    code2: { file: lab + 'tests/data.spec.ts', lang: 'TypeScript', from: "it('legt an, aktualisiert die Liste und ordnet Serverfehler dem Feld zu'", to: 'toHaveLength(2);', plus: 2 },
    order: ['body', 'code', 'code2', 'body2'],
    output: `vitest (Block „Mini-Projekt TaskInbox“): 4 Tests grün
 - lädt, blättert über die URL und zeigt Ladezustand
 - zeigt einen Fehlerzustand mit Wiederholung
 - zeigt den Leerzustand
 - legt an, aktualisiert die Liste und ordnet den 422-Fehler "Titel existiert bereits" dem Titelfeld zu
Gesamt im vue-lab: 38 Tests grün (6 vorhandene + 32 neue); vue-tsc und vite build ohne Fehler.`,
    mistakes: [
      { wrong: 'Nur den Erfolgsfall bauen.',
        why: 'Echte Nutzer erleben Laden, Fehler und leere Listen häufiger, als man denkt.',
        fix: 'Alle vier Zustände entwerfen und testen, bevor die Oberfläche schön gemacht wird.' },
      { wrong: 'Alle Serverfehler gleich behandeln.',
        why: 'Ein 422 gehört an ein Feld, ein 500 ist eine allgemeine Störung. Gleichbehandlung verwirrt Nutzer.',
        fix: 'Nach Status unterscheiden (422 → Feldfehler, sonst allgemeine Meldung).' },
      { wrong: 'Den Fake-Server mit dem echten Server gleichzusetzen.',
        why: 'Der Test belegt die eigene Logik, nicht das Zusammenspiel mit echter Technik.',
        fix: 'Zusätzlich einen Ende-zu-Ende-Test gegen eine echte Umgebung vorsehen (z. B. Playwright gegen das Spring-Lab).' },
      { wrong: 'Technische Fehlertexte aus dem Server direkt anzeigen.',
        why: 'Meldungen können intern oder verwirrend sein und im schlimmsten Fall Details preisgeben.',
        fix: 'Eigene, verständliche Texte anzeigen; Feldmeldungen nur, wenn der Vertrag sie ausdrücklich als nutzerlesbar festlegt.' },
    ],
    practice: 'Ein Mini-Projekt ist ein Prüfstein: Kannst du jede Entscheidung erklären (Warum dieser Schlüssel? Warum diese Rolle?). Notiere in einer kurzen README: Zweck, Zustände, Tests, bekannte Grenzen. So können andere (und du in drei Monaten) es verstehen.',
    exercises: [
      { task: 'Ergänze das Löschen einer Aufgabe (DELETE) mit Bestätigungsdialog aus js-m2-l4 und Invalidierung. Entscheide begründet, ob es optimistisch sein soll.', acceptance: 'Dialog bestätigt; Liste aktualisiert; Entscheidung (nicht optimistisch, weil schwer umkehrbar) begründet.' },
      { task: 'Grenzfall: Lege 6 Aufgaben an (Seitengröße 5). Prüfe, ob die zweite Seite erreichbar ist und die Seitenanzeige stimmt.', acceptance: 'Zweite Seite zeigt 1 Eintrag; „Weiter“ bei Seite 2 deaktiviert; Test ergänzt.' },
      { task: 'Fehlerfall: Lass den Server auf POST mit 500 antworten. Welche Meldung erscheint, bleibt die Eingabe erhalten und ist die Schaltfläche wieder bedienbar?', acceptance: 'Allgemeine Meldung mit role="alert"; Eingabe erhalten; Schaltfläche wieder aktiv.' },
    ],
    quiz: [
      { q: 'Welche vier Zustände muss jede Datenansicht abdecken?',
        options: ['Laden, Fehler, leer und Daten.', 'Hell, dunkel, kontrastreich und Druck.', 'Entwurf, Prüfung, Freigabe und Archiv.'],
        correct: 0,
        rationales: ['Diese Zustände erleben Nutzer tatsächlich; jeder braucht eine sichtbare, zugängliche Darstellung.', 'Das sind Darstellungsvarianten, keine Datenzustände.', 'Das sind fachliche Workflow-Stufen.'],
        explain: 'Laden, Fehler, leer und Daten sind die Grundzustände.' },
      { q: 'Der Server antwortet auf das Anlegen mit 422 und einer Feldmeldung. Wohin gehört sie?',
        options: ['In ein Popup, das nach 3 Sekunden verschwindet.', 'An das betroffene Feld, verknüpft per aria-describedby, mit Fokus.', 'In die Browserkonsole.'],
        correct: 1,
        rationales: ['Verschwindende Meldungen sind für viele Nutzer nicht zugänglich.', 'So erreicht die Meldung auch Tastatur- und Screenreader-Nutzer.', 'Nutzer sehen die Konsole nicht.'],
        explain: 'Feldfehler gehören an das Feld und müssen zugänglich verknüpft sein.' },
      { q: 'Was belegt ein grüner Test mit dem Fake-Server nicht?',
        options: ['Dass die eigene Logik der Komponenten unter Testbedingungen funktioniert.', 'Dass reale Netzwerkfehler, CORS, Anmeldung und CSRF im echten Zusammenspiel funktionieren.', 'Dass die Komponenten ihre Props und Ereignisse korrekt verarbeiten.'],
        correct: 1,
        rationales: ['Das belegt der Test sehr wohl.', 'Der Fake-Server simuliert nur Antworten; reale Umgebung braucht eigene Prüfungen.', 'Auch das ist durch den Test abgedeckt.'],
        explain: 'Fake-Server belegen Logik, nicht die reale Integration.' },
    ],
    sources: [
      docs('TanStack Query (Vue): Queries und Query Keys', 'https://tanstack.com/query/latest/docs/framework/vue/guides/queries', 'TanStack Query steht unter MIT-Lizenz; Inhalt hier eigenständig zusammengefasst.'),
      docs('W3C ARIA: Rollen status und alert (APG und WAI-ARIA)', 'https://www.w3.org/TR/wai-aria-1.2/#status', 'W3C-Spezifikation; nur verlinkt.'),
      docs('RFC 9457: Problem Details for HTTP APIs', 'https://www.rfc-editor.org/rfc/rfc9457.html', 'IETF-Standard; nur verlinkt.'),
    ],
    verification: 'Alle Tests im vue-lab grün (38), vue-tsc und vite build fehlerfrei. NICHT geprüft: echte Browserbedienung, Screenreader, Integration mit dem Spring-Lab über das Netzwerk.',
  },
];
