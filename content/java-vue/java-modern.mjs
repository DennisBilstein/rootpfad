// Java 21–27 · Sprache und Nebenläufigkeit. Stichtag 12.11.2026.
// Eigene Texte und eigener Code; Beispiele liegen ausführbar unter content/examples/java-modern/.
// Primärquellen: JEPs (openjdk.org), Oracle Java Platform Documentation. Nur Link + Zusammenfassung, keine Textkopie.
const jep = (n, title) => ({ title: `JEP ${n}: ${title}`, url: `https://openjdk.org/jeps/${n}`, note: 'Offizielle Beschreibung des OpenJDK-Projekts; © Oracle, hier nur verlinkt.' });
const dir = 'content/examples/java-modern/';

export const module = {
  id: 'java-m25', course: 'java', part: 19, partTitle: 'Java · Modernes Java',
  title: 'Java 21 bis 27 · Moderne Sprache und Nebenläufigkeit',
};

export const lessons = [
  {
    id: 'java-m25-l1', title: 'Pattern Matching für switch und Record Patterns', minutes: 35,
    prerequisites: 'Java-Sprachkern (Modul 7–8): Klassen, Interfaces, Records, einfacher switch.',
    objectives: [
      'Eine instanceof-Kette mit Casts durch einen switch mit Typmustern ersetzen',
      'Mit when-Bedingungen (Guards) feiner unterscheiden und die Reihenfolge der Fälle begründen',
      'Ein Record mit einem Record Pattern direkt in seine Bestandteile zerlegen',
      'Den Fall null bewusst behandeln, statt eine NullPointerException zu riskieren',
    ],
    simple: `Früher hast du bei einem Wert vom Typ Object so gefragt: „Ist das ein Integer? Dann caste ich ihn und rechne damit. Ist das ein String? Dann caste ich ihn …“ Das waren viele if-Zeilen mit immer demselben Muster: prüfen, casten, benutzen.

Pattern Matching dreht das um. Du schreibst in einem switch, wie ein Wert aussehen soll („ein Integer, den ich i nenne“), und Java prüft und castet für dich. Das Ganze ist seit Java 21 ein fester Teil der Sprache (JEP 441 und JEP 440), kein Experiment mehr.

Stell dir eine Poststelle vor: Pakete kommen in verschiedenen Formen an, und für jede Form gibt es ein eigenes Fach. Ein Record Pattern ist dabei der Mitarbeiter, der das Paket gleich auspackt und dir den Inhalt in die Hand legt.`,
    steps: [
      '„case Integer i“ ist ein Typmuster: Passt der Typ, steht der Wert unter dem Namen i bereits als Integer zur Verfügung. Ein Cast ist nicht mehr nötig.',
      '„when i < 0“ ist ein Guard. Er verfeinert ein Muster um eine Bedingung. Der Fall greift nur, wenn Typ UND Bedingung passen.',
      'Java prüft die Fälle von oben nach unten. Ein allgemeiner Fall darf deshalb nie vor einem spezielleren stehen, sonst weigert sich der Compiler (Fehler „dominiert“).',
      '„case Money(var amount, var currency)“ ist ein Record Pattern: Java prüft den Typ Money und liest gleichzeitig die Komponenten aus. var übernimmt den jeweiligen Typ.',
      '„case null“ ist ein eigener Fall. Fehlt er, wirft ein switch über ein null-Objekt eine NullPointerException. Das ist Absicht: Der Fall muss dir bewusst sein.',
      'Ein switch-Ausdruck muss alle Möglichkeiten abdecken. Bei Object geht das nur mit default, bei sealed Typen (nächste Lektion) auch ohne.',
    ],
    code: { file: dir + 'PatternSwitchDemo.java', lang: 'Java' },
    output: `kein Wert
negative Zahl -4
Zahl 7
leerer Text
Text mit 4 Zeichen
kostenlos in EUR
19.90 EUR
Diagonalpunkt 3
Punkt (1|2)
unbekannt: Double`,
    mistakes: [
      { wrong: 'Den allgemeinen Fall „case Integer i“ vor „case Integer i when i > 10“ schreiben.',
        why: 'Der erste Fall fängt bereits jeden Integer. Der zweite wäre nie erreichbar. Der Compiler meldet: „Dieses CASE-Label wird von einem vorherigen CASE-Label dominiert“ (so im Lauf unter JDK 26 beobachtet).',
        fix: 'Spezielle Fälle (mit when) immer vor die allgemeinen stellen.' },
      { wrong: 'Einen switch über ein Object schreiben und null einfach „mitlaufen“ lassen.',
        why: 'Ohne „case null“ wirft der switch bei null eine NullPointerException (so beobachtet in Objects.requireNonNull).',
        fix: 'Entweder „case null ->“ ergänzen oder null vor dem switch ausschließen und die Entscheidung dokumentieren.' },
      { wrong: '„default“ als Sammelbecken für alles nutzen, was man gerade nicht bedacht hat.',
        why: 'default verschluckt künftig hinzugekommene Typen still. Bei geschlossenen Typhierarchien (sealed) verhindert das die Prüfung durch den Compiler.',
        fix: 'Bei bekannten, endlichen Typen auf default verzichten und den Compiler prüfen lassen (siehe nächste Lektion).' },
    ],
    practice: 'Pattern Matching ersetzt keine Polymorphie. Wenn du Verhalten zu einem Typ hinzufügen willst, gehört die Methode meist in den Typ selbst. Der switch eignet sich für Fälle, in denen du Daten von außen (Ereignisse, Nachrichten, Ergebnisse) unterscheidest und nicht in jede Klasse eingreifen kannst oder willst.',
    exercises: [
      { task: 'Ergänze in PatternSwitchDemo einen Fall für Long (Text „große Zahl“). Führe das Programm mit einem Long-Wert aus.', acceptance: 'Ausgabe „große Zahl“ für 5L. Die bisherigen Ausgaben bleiben unverändert.' },
      { task: 'Grenzfall: Verschiebe „case Integer i“ vor „case Integer i when i < 0“. Kompiliere und notiere die Fehlermeldung. Stelle die Reihenfolge wieder her.', acceptance: 'Fehlermeldung „dominiert“ ist mit eigenen Worten erklärt; danach läuft das Programm wieder.' },
      { task: 'Fehlerfall: Entferne „case null“ und rufe describe(null) auf. Beschreibe die Ausnahme und gib zwei Möglichkeiten an, sie zu vermeiden.', acceptance: 'NullPointerException ist reproduziert; beide Lösungen (case null, vorherige Prüfung) sind begründet.' },
    ],
    quiz: [
      { q: 'Ein Team ersetzt eine lange instanceof-Kette durch einen switch über Object. Im Test mit einem null-Wert stürzt der Code ab. Was ist die direkte Ursache?',
        options: ['Der switch kennt für null keinen eigenen Fall und wirft deshalb eine NullPointerException.', 'Typmuster funktionieren nur mit primitiven Typen und nicht mit Objekten.', 'Der Compiler hat den Cast an der falschen Stelle eingefügt.'],
        correct: 0,
        rationales: ['Ohne „case null“ ist null für einen solchen switch ein Fehler, nicht stiller Durchlauf in default.', 'Typmuster sind genau für Referenztypen gedacht; primitive Typen sind nicht das Problem.', 'Der Cast ist bei einem Treffer korrekt; der Absturz entsteht vorher, beim Auswerten von null.'],
        explain: 'Ein switch über Referenzwerte wirft bei null eine NullPointerException, wenn kein „case null“ vorhanden ist.' },
      { q: 'Im Code stehen „case Integer i ->“ und danach „case Integer i when i > 10 ->“. Was passiert beim Kompilieren?',
        options: ['Der zweite Fall überschreibt den ersten, sobald i größer als 10 ist.', 'Beide Fälle werden zur Laufzeit nacheinander geprüft, der letzte Treffer gewinnt.', 'Der Compiler lehnt den zweiten Fall ab, weil der erste ihn bereits vollständig abdeckt.'],
        correct: 2,
        rationales: ['Fälle überschreiben sich nicht; die Auswertung bricht beim ersten Treffer ab.', 'Es gewinnt der erste passende Fall, nicht der letzte.', 'Der zweite Fall wäre nie erreichbar. Java meldet das als Fehler („dominiert“).'],
        explain: 'Die Fälle werden von oben nach unten geprüft; ein allgemeiner Fall vor einem spezielleren macht diesen unerreichbar und ist ein Kompilierfehler.' },
      { q: 'Wozu dient „case Money(var amount, var currency)“?',
        options: ['Es erzeugt ein neues Money-Objekt aus zwei Variablen.', 'Es prüft den Typ Money und legt dessen Komponenten gleich unter den Namen amount und currency bereit.', 'Es kopiert das Money-Objekt tief, damit der switch es verändern darf.'],
        correct: 1,
        rationales: ['Ein Muster erzeugt nichts, es zerlegt ein vorhandenes Objekt.', 'Das ist ein Record Pattern: Typprüfung und Auslesen der Komponenten in einem Schritt.', 'Ein Record Pattern kopiert nichts; Records bleiben unveränderlich.'],
        explain: 'Ein Record Pattern kombiniert Typprüfung und Dekonstruktion der Record-Komponenten.' },
    ],
    sources: [
      jep(441, 'Pattern Matching for switch'),
      jep(440, 'Record Patterns'),
      { title: 'Oracle Java Language Updates: Pattern Matching', url: 'https://docs.oracle.com/en/java/javase/21/language/pattern-matching.html', note: 'Offizielle Sprachdokumentation (Java 21).' },
    ],
    verification: 'Beispiel unter JDK 21.0.11 und JDK 26.0.1 ausgeführt; die Compilerfehler und die NullPointerException stammen aus eigenen Läufen unter JDK 26.',
  },

  {
    id: 'java-m25-l2', title: 'Sealed Types und Records als Domänenmodell', minutes: 35,
    prerequisites: 'Lektion „Pattern Matching für switch und Record Patterns“; Interfaces und Records.',
    objectives: [
      'Mit sealed festlegen, welche Untertypen ein Interface überhaupt haben darf',
      'Einen switch ohne default schreiben und dem Compiler die Vollständigkeitsprüfung überlassen',
      'Einen generischen Ergebnistyp Ok/Failure als Alternative zu Ausnahmen für erwartbare Fehler entwerfen',
      'Erkennen, wann ein default die Sicherheit wieder aufhebt',
    ],
    simple: `Ein normales Interface ist wie eine offene Tür: Irgendjemand, irgendwo, kann eine neue Klasse hinzufügen. Dein switch weiß nie, ob er alle Fälle kennt, also braucht er ein default „für den Rest“.

Ein sealed Interface schließt die Tür. Du listest hinter permits auf, welche Typen es geben darf, und niemand sonst kann dazukommen. Damit kennt der Compiler alle Fälle. Er kann prüfen: „Hast du jeden erlaubten Typ behandelt?“ Vergisst du einen, bekommst du keinen Laufzeitfehler in der Produktion, sondern schon beim Kompilieren eine Fehlermeldung.

Records sind dafür die perfekten Bausteine: kurze, unveränderliche Datenträger. Zusammen ergeben sie ein sehr lesbares Modell, z. B. „Eine Zahlungsart ist entweder Karte, Rechnung oder Gutschein“.`,
    steps: [
      '„sealed interface PaymentMethod permits Card, Invoice, Voucher“ legt die drei erlaubten Untertypen fest.',
      'Jeder erlaubte Untertyp muss final, sealed oder non-sealed sein. Records sind automatisch final und passen deshalb ohne Zusatz.',
      'Ein switch über PaymentMethod ohne default ist erlaubt, wenn jeder Untertyp vorkommt. Der Compiler prüft das.',
      'Result<T> ist ein generischer sealed Typ mit den Fällen Ok<T> (Erfolg, trägt value) und Failure<T> (trägt reason und code). So wird ein erwartbarer Fehler (z. B. „keine Zahl“) ein normaler Rückgabewert, den der Aufrufer behandeln muss.',
      'Der Aufrufer schreibt „case Ok<Integer>(var value)“ und „case Failure<Integer>(var reason, var code)“. Auch hier ist kein default nötig.',
    ],
    code: { file: dir + 'SealedResultDemo.java', lang: 'Java' },
    output: `Karte ****4242
Rechnung, zahlbar in 14 Tagen
Gutschein SOMMER (-10 %)
OK: 42
Fehler 422: Alter darf nicht negativ sein
Fehler 400: Keine Zahl: 'abc'`,
    mistakes: [
      { wrong: 'Bei einem sealed Typ trotzdem ein „default -> …“ ergänzen, „zur Sicherheit“.',
        why: 'Mit default ist der Compiler zufrieden, auch wenn du später einen vierten Typ hinzufügst und vergisst, die switches zu erweitern. Der neue Typ landet unbemerkt im default.',
        fix: 'Bei sealed Typen auf default verzichten. Dann zeigt dir jeder fehlende Fall einen Kompilierfehler (z. B. „Der Switch-Ausdruck deckt nicht alle möglichen Eingabewerte ab“, so unter JDK 26 beobachtet).' },
      { wrong: 'Jede Fehlersituation als Result modellieren, auch echte Programmfehler (z. B. kaputte Konfiguration).',
        why: 'Result passt für erwartbare, fachliche Fälle, die der Aufrufer sinnvoll behandeln kann. Echte Bugs und nicht behebbare Zustände sind besser eine Exception.',
        fix: 'Faustregel: Kann der Aufrufer sinnvoll reagieren (Eingabe korrigieren, Alternative anbieten)? Dann Result. Sonst Exception.' },
      { wrong: 'Einen sealed Typ in einer anderen Bibliothek oder einem anderen Paket erweitern wollen.',
        why: 'Erlaubte Untertypen müssen im selben Modul bzw. Paket liegen. Das ist Absicht und gehört zur Garantie.',
        fix: 'Wenn externe Erweiterung gewollt ist, bleibt ein normales Interface die richtige Wahl.' },
    ],
    practice: 'Sealed Types sind ein Werkzeug für „geschlossene Welten“: Ereignisse eines Zustandsautomaten, Ergebnisse einer Operation, Knoten eines Syntaxbaums. Sie sind kein Ersatz für alle Interfaces. Wenn du Erweiterbarkeit durch Dritte brauchst, ist ein offenes Interface richtig.',
    exercises: [
      { task: 'Füge SealedResultDemo einen vierten Zahlungstyp „Paypal(String email)“ hinzu (inklusive permits). Kompiliere, ohne den switch anzupassen, und notiere die Fehlermeldung.', acceptance: 'Fehlermeldung „deckt nicht alle möglichen Eingabewerte ab“ ist beobachtet. Nach Ergänzen des Falls läuft das Programm.' },
      { task: 'Grenzfall: Ergänze parseAge einen Grenzwert (z. B. Alter über 150 → Failure mit Code 422) und gib Ausgaben für „0“, „150“ und „151“ an.', acceptance: '0 und 150 liefern OK, 151 liefert Failure 422. Grenzen sind in den Ausgaben sichtbar.' },
      { task: 'Fehlerfall: Ersetze den switch über PaymentMethod durch eine Variante mit default und füge danach den vierten Typ hinzu. Erkläre, warum jetzt kein Compilerfehler mehr erscheint und was das Risiko ist.', acceptance: 'Beschrieben: Neuer Typ läuft unbemerkt in default; Vorteil der Vollständigkeitsprüfung geht verloren.' },
    ],
    quiz: [
      { q: 'Ein switch über ein sealed Interface hat keinen default. Ein Kollege fügt dem Interface einen neuen Untertyp hinzu, ohne die switches zu ändern. Was geschieht?',
        options: ['Der neue Typ landet still im ersten passenden Fall.', 'Der Compiler meldet an jedem betroffenen switch, dass nicht alle Fälle abgedeckt sind.', 'Das Programm läuft und wirft erst zur Laufzeit eine MatchException.'],
        correct: 1,
        rationales: ['Es gibt keinen stillen Treffer; ein passender Fall existiert für den neuen Typ nicht.', 'Genau dafür ist sealed da: Die Vollständigkeit wird zur Kompilierzeit geprüft.', 'Eine MatchException droht nur bei nachträglich geänderten, getrennt kompilierten Klassen, nicht beim regulären Neukompilieren.'],
        explain: 'Bei sealed Typen prüft der Compiler die Vollständigkeit; fehlende Fälle sind Kompilierfehler.' },
      { q: 'Wofür ist ein Ergebnistyp Result<T> mit Ok und Failure besser geeignet als eine Exception?',
        options: ['Für Fehler, die niemand beheben kann, z. B. eine fehlende Konfigurationsdatei beim Start.', 'Für erwartbare, fachliche Fälle wie „Eingabe ist keine Zahl“, die der Aufrufer bewusst behandeln soll.', 'Für jede Situation, weil Exceptions in Java grundsätzlich langsamer als Rückgabewerte sind.'],
        correct: 1,
        rationales: ['Nicht behebbare Zustände sind klassisch Exceptions; der Aufrufer kann ohnehin nichts tun.', 'Der Aufrufer wird durch den Typ gezwungen, beide Fälle zu behandeln.', 'Das Argument „Exceptions sind langsam“ ist keine tragfähige Grundregel; entscheidend ist die Fachlichkeit.'],
        explain: 'Result eignet sich für erwartbare, behandelbare Fälle; echte Programmfehler bleiben Exceptions.' },
      { q: 'Warum passt ein Record gut als Untertyp eines sealed Interface?',
        options: ['Records sind automatisch final und dadurch ohne weitere Angabe als erlaubter Untertyp zulässig.', 'Records dürfen als einzige Klassen sealed Interfaces implementieren.', 'Records erlauben nachträgliche Änderungen ihrer Felder per Setter.'],
        correct: 0,
        rationales: ['Ein erlaubter Untertyp muss final, sealed oder non-sealed sein; Records erfüllen das von Haus aus.', 'Normale Klassen können sealed Interfaces auch implementieren, sofern sie final, sealed oder non-sealed sind.', 'Records sind unveränderlich; Setter gibt es nicht.'],
        explain: 'Records sind implizit final und deshalb direkt als Untertypen sealed Interfaces nutzbar.' },
    ],
    sources: [
      { title: 'JEP 409: Sealed Classes', url: 'https://openjdk.org/jeps/409', note: 'Offizielle Beschreibung (final seit Java 17).' },
      jep(440, 'Record Patterns'),
      { title: 'Oracle Java Language Updates: Sealed Classes', url: 'https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html', note: 'Offizielle Sprachdokumentation (Java 21).' },
    ],
    verification: 'Beispiel unter JDK 21.0.11 und 26.0.1 ausgeführt; die Fehlermeldung zur Vollständigkeit stammt aus einem eigenen Lauf unter JDK 26.',
  },

  {
    id: 'java-m25-l3', title: 'Sequenced Collections: Anfang, Ende und Umkehr', minutes: 30,
    prerequisites: 'Collections (Modul 9): List, Set, Map; Unterschied zwischen veränderlichen und unveränderlichen Listen.',
    objectives: [
      'Die Methoden getFirst, getLast, addFirst, addLast und reversed sicher einsetzen',
      'Verstehen, dass reversed() eine Sicht (View) und keine Kopie ist',
      'Wissen, welche Collections eine feste Reihenfolge haben und welche nicht',
      'Die typischen Ausnahmen bei leeren, unveränderlichen und sortierten Collections erklären',
    ],
    simple: `Wie holst du das letzte Element einer Liste? Früher: list.get(list.size() - 1). Das ist fehleranfällig (leere Liste!) und bei einem LinkedHashSet gab es überhaupt keinen Weg.

Seit Java 21 gibt es ein gemeinsames Interface für alle Collections mit festgelegter Reihenfolge: SequencedCollection. Es bringt einheitliche Namen mit: getFirst(), getLast(), addFirst(), addLast(), removeFirst(), removeLast() und reversed(). Für Mengen gibt es SequencedSet, für Maps SequencedMap.

Wichtig: reversed() baut nichts neu auf. Es liefert eine Sicht auf dieselben Daten, nur von hinten gelesen. Ändere die Sicht, änderst du die Originalliste. Stell dir einen Spiegel vor, nicht eine Fotokopie.`,
    steps: [
      'List, Deque, LinkedHashSet, LinkedHashMap und die sortierten TreeSet/TreeMap sind „sequenced“. HashSet und HashMap haben keine feste Reihenfolge und gehören nicht dazu.',
      'getFirst() und getLast() ersetzen get(0) und get(size() - 1). Auf einer leeren Collection werfen sie eine NoSuchElementException (kein stilles null).',
      'addFirst und addLast fügen vorn bzw. hinten an. Bei einem LinkedHashSet wandert ein bereits vorhandenes Element nach vorn (im Beispiel: [3, 1, 2]).',
      'list.reversed() ist eine Sicht. Fügst du dort mit addFirst ein, landet das Element hinten in der Originalliste.',
      'Bei Maps gibt es firstEntry(), lastEntry(), putFirst(), putLast() und reversed(). So steuerst du die Position eines Eintrags ausdrücklich.',
    ],
    code: { file: dir + 'SequencedDemo.java', lang: 'Java' },
    output: `[a, b, c, d, e] first=a last=e
[Z, e, d, c, b, a] | Original: [a, b, c, d, e, Z]
{clara=9, anna=3, ben=5} firstEntry=clara=9 lastEntry=ben=5
{ben=5, anna=3, clara=9}
[3, 1, 2]
Leere Liste: getFirst() wirft NoSuchElementException
Unveränderliche Liste: addFirst() über reversed() wirft UnsupportedOperationException`,
    mistakes: [
      { wrong: 'reversed() aufrufen und das Ergebnis als unabhängige Kopie weiterverwenden.',
        why: 'Die Sicht ist mit der Originalliste verbunden. Änderungen an einer Seite sind auf der anderen sichtbar. Im Beispiel landet „Z“ nach dem addFirst auf der Sicht am Ende der Originalliste.',
        fix: 'Wer eine unabhängige Kopie braucht, schreibt new ArrayList<>(list.reversed()).' },
      { wrong: 'getFirst() auf einer möglicherweise leeren Liste aufrufen.',
        why: 'Es wird eine NoSuchElementException geworfen. get(0) hätte eine IndexOutOfBoundsException geworfen; beides sind Programmfehler, wenn die Liste leer sein darf.',
        fix: 'Vorher isEmpty() prüfen oder einen Optional-Weg wählen. Entscheide bewusst, ob „leer“ erlaubt ist.' },
      { wrong: 'addFirst auf einem TreeSet erwarten, weil „sortiert“ ja auch „mit Reihenfolge“ ist.',
        why: 'Die Reihenfolge eines TreeSet kommt aus der Sortierung. Eine Position vorzugeben, widerspräche ihr. addFirst wirft deshalb eine UnsupportedOperationException (im Test mit JDK 26 beobachtet).',
        fix: 'Bei sortierten Mengen nur lesen (getFirst, getLast, reversed), nicht einfügen mit Positionsangabe.' },
    ],
    practice: 'Das Interface macht Code lesbarer und entfernt Sonderlösungen wie die Hilfsmethoden zum Letzten-Element-Holen. Prüfe in bestehendem Code, wo list.get(list.size() - 1) steht: Genau dort lohnt sich getLast(). Baue für Methoden, die „irgendeine Collection mit Reihenfolge“ erwarten, den Parametertyp SequencedCollection<T> statt List<T>.',
    exercises: [
      { task: 'Schreibe eine Methode lastTwo(List<String> input), die die letzten zwei Elemente liefert, ohne get(size() - 1) zu verwenden. Teste mit [a, b, c].', acceptance: 'Ergebnis [b, c]. Es werden getLast und removeLast oder reversed genutzt; die Eingabeliste bleibt unverändert (oder die Änderung ist bewusst dokumentiert).' },
      { task: 'Grenzfall: Rufe lastTwo mit einer Liste mit nur einem Element auf. Entscheide, was passieren soll (Ausnahme oder kürzere Liste) und begründe es.', acceptance: 'Verhalten ist beschrieben und getestet; die Entscheidung ist fachlich begründet.' },
      { task: 'Fehlerfall: Rufe reversed().addFirst(9) auf einer Liste aus List.of(1, 2) auf. Beschreibe die Ausnahme und die Ursache.', acceptance: 'UnsupportedOperationException ist reproduziert; Ursache (unveränderliche Liste) ist erklärt.' },
    ],
    quiz: [
      { q: 'Eine Methode ruft list.reversed() auf und fügt danach mit addFirst("Z") ein. Wo steht „Z“ in der Originalliste?',
        options: ['Am Anfang, weil addFirst immer vorn einfügt.', 'Am Ende, weil die umgekehrte Sicht mit der Originalliste verbunden ist.', 'Nirgends, weil reversed() eine Kopie liefert.'],
        correct: 1,
        rationales: ['„Vorn“ bezieht sich auf die umgekehrte Sicht; dort liegt der Anfang am Ende des Originals.', 'reversed() ist eine Sicht; addFirst auf der Sicht wirkt als addLast auf dem Original.', 'reversed() kopiert nicht. Eine Kopie müsstest du ausdrücklich anlegen.'],
        explain: 'reversed() liefert eine veränderliche Sicht auf dieselben Daten, keine Kopie.' },
      { q: 'Welche Aussage stimmt für ein HashSet?',
        options: ['Es hat eine stabile Einfügereihenfolge und ist deshalb sequenced.', 'Es ist kein SequencedSet, weil es keine garantierte Reihenfolge hat.', 'Es wird mit Java 21 automatisch zu einem LinkedHashSet.'],
        correct: 1,
        rationales: ['HashSet garantiert keine Reihenfolge, die man ansprechen könnte.', 'Reihenfolgegarantie ist die Voraussetzung für SequencedCollection; HashSet erfüllt sie nicht.', 'Es gibt keine automatische Umwandlung; die Klasse bleibt HashSet.'],
        explain: 'HashSet und HashMap haben keine definierte Reihenfolge und sind nicht sequenced.' },
      { q: 'Was passiert bei new ArrayList<String>().getFirst()?',
        options: ['Es wird null zurückgegeben.', 'Es wird eine NoSuchElementException geworfen.', 'Es wird ein leerer String zurückgegeben.'],
        correct: 1,
        rationales: ['null als Rückgabe gibt es hier nicht; sonst ließe sich „leer“ nicht von „null gespeichert“ unterscheiden.', 'So ist es definiert und im Beispiel beobachtet.', 'Es gibt keinen Standardwert; der Typ kennt keinen „leeren String“.'],
        explain: 'getFirst auf einer leeren Collection wirft eine NoSuchElementException.' },
    ],
    sources: [
      jep(431, 'Sequenced Collections'),
      { title: 'Oracle Java Platform: Collections Framework (Java 25)', url: 'https://docs.oracle.com/en/java/javase/25/core/java-collections-framework.html', note: 'Offizielle Plattformdokumentation.' },
      { title: 'dev.java: Neue Funktionen von Java', url: 'https://dev.java/learn/new-features/', note: 'Offizielle Lernseite von Oracle; hier nur verlinkt.' },
    ],
    verification: 'Beispiel unter JDK 21.0.11 ausgeführt; TreeSet- und HashSet-Verhalten im eigenen Lauf unter JDK 26.0.1 geprüft.',
  },

  {
    id: 'java-m25-l4', title: 'Virtual Threads: wann sie helfen und wann nicht', minutes: 40,
    prerequisites: 'Nebenläufigkeit (Modul 13): Thread, ExecutorService, Future.',
    objectives: [
      'Erklären, warum ein virtueller Thread billig ist und ein Plattform-Thread nicht',
      'Tausende blockierende Aufgaben mit einem Executor starten, der pro Aufgabe einen virtuellen Thread nutzt',
      'Eine knappe Ressource mit einem Semaphore begrenzen, statt Thread-Pools zu verkleinern',
      'Entscheiden, wann Virtual Threads nichts bringen (CPU-lastige Arbeit) und welche Fallen es gibt',
    ],
    simple: `Ein normaler Java-Thread ist ein „schwerer“ Arbeiter: Er reserviert Stack-Speicher (typisch rund 1 MB) und wird vom Betriebssystem verwaltet. Man kann nur einige tausend davon sinnvoll starten. Deshalb haben wir Thread-Pools erfunden: wenige Arbeiter, die eine Warteschlange abarbeiten.

Die meiste Zeit warten Server-Anwendungen aber: auf die Datenbank, auf eine andere API, auf eine Datei. Ein wartender Arbeiter blockiert seinen Platz im Pool.

Ein virtueller Thread (seit Java 21 final, JEP 444) ist ein sehr leichter Arbeiter, den die JVM selbst verwaltet. Wartet er, gibt er seinen Träger-Thread frei, und ein anderer virtueller Thread läuft dort weiter. Dadurch kannst du für jede Aufgabe einen eigenen Thread starten, auch 100.000 – so, wie du dir das beim Programmieren sowieso wünschst: „eine Anfrage = ein Thread“, in einfachem, blockierendem Code.`,
    steps: [
      'Executors.newVirtualThreadPerTaskExecutor() startet pro eingereichter Aufgabe einen neuen virtuellen Thread. Es gibt keinen Pool, der die Anzahl begrenzt.',
      'Der Executor steht in try-with-resources: close() wartet, bis alle Aufgaben fertig sind. Du musst also nicht selbst auf jedes Future warten.',
      'Im Beispiel schlafen 5.000 Aufgaben je 200 ms. Nacheinander wären das 1.000 Sekunden, mit virtuellen Threads dauert es auf dem Testrechner etwa eine Viertelsekunde.',
      'Willst du die Parallelität begrenzen (z. B. wegen einer Datenbank mit nur 10 Verbindungen), nimm einen Semaphore. Im Beispiel liegen die 200 Aufgaben nie über dem Limit von 10 gleichzeitig.',
      'Thread.ofVirtual().start(...) startet einzelne virtuelle Threads; Thread.currentThread().isVirtual() zeigt, ob du in einem läufst.',
    ],
    code: { file: dir + 'VirtualThreadsDemo.java', lang: 'Java' },
    output: `5000 Aufgaben à 200 ms in 256 ms (sequenziell wären das 1000 s)
letztes Ergebnis: antwort-4999
max. gleichzeitig: 10 (Limit 10)
virtuell? true`,
    mistakes: [
      { wrong: 'Virtual Threads in einen Pool packen („newFixedThreadPool“ mit virtuellen Threads), um sie zu begrenzen.',
        why: 'Virtuelle Threads sind zum Wegwerfen gedacht. Ein Pool spart nichts und verhindert genau den Vorteil „ein Thread pro Aufgabe“.',
        fix: 'Pro Aufgabe einen neuen Thread starten und die Parallelität bei Bedarf mit Semaphore (oder in Spring mit @ConcurrencyLimit) begrenzen.' },
      { wrong: 'Virtual Threads für rechenintensive Schleifen einsetzen und Beschleunigung erwarten.',
        why: 'Sie helfen beim Warten (I/O), nicht beim Rechnen. Rechenzeit wird durch die Zahl der CPU-Kerne begrenzt, egal wie viele Threads du startest.',
        fix: 'Für CPU-Last bleibt ein Pool in Größe der Kernzahl (oder parallele Streams) die richtige Wahl.' },
      { wrong: 'Sich auf ThreadLocal-Variablen mit großen Objekten pro Thread verlassen.',
        why: 'Wenn es 100.000 Threads gibt, gibt es 100.000 Kopien. Ein bisher unproblematischer Cache pro Thread wird zum Speicherproblem.',
        fix: 'Pro-Thread-Caches überdenken; für Kontextdaten bieten sich Scoped Values an (übernächste Lektion).' },
      { wrong: 'Pinning ignorieren: den Virtual Thread in einem synchronized-Block oder in nativem Code warten lassen.',
        why: 'In diesen Fällen kann der virtuelle Thread seinen Träger-Thread nicht freigeben („Pinning“). Seit Java 24 (JEP 491) blockiert synchronized den Träger nicht mehr; nativer Code und Foreign-Aufrufe können weiter pinnen.',
        fix: 'Auf Java 24+ ist synchronized meist unproblematisch; bei älteren Versionen und blockierendem I/O in synchronized lieber ReentrantLock nehmen. Mit JDK Flight Recorder lässt sich Pinning erkennen.' },
    ],
    practice: 'In Spring Boot schaltest du virtuelle Threads mit spring.threads.virtual.enabled=true ein (Java 21+; laut Boot-Dokumentation ist Java 24+ empfohlen). Messe vorher und nachher: Für Anwendungen, die kaum auf I/O warten, ändert sich nichts. Und prüfe, ob nachgelagerte Systeme (Datenbank, Fremd-APIs) die höhere Parallelität verkraften. Genau dort brauchst du dann das Limit.',
    exercises: [
      { task: 'Führe VirtualThreadsDemo aus. Ändere die Zahl der Aufgaben von 5.000 auf 20.000 und notiere die Laufzeit. Stelle sie danach mit einem Fixed Thread Pool (50 Threads) nach und vergleiche.', acceptance: 'Beide Laufzeiten sind notiert; der Unterschied wird mit „Warten statt Rechnen“ erklärt. Messwerte sind als Rechner-abhängig gekennzeichnet.' },
      { task: 'Grenzfall: Setze das Semaphore-Limit auf 1. Wie lange dauern 200 Aufgaben à 20 ms mindestens? Prüfe deine Rechnung.', acceptance: 'Erwartung ca. 4 Sekunden (200 × 20 ms); die Messung bestätigt die Größenordnung.' },
      { task: 'Fehlerfall: Ersetze Thread.sleep durch eine reine Rechenschleife (z. B. 200 ms Busy-Wait). Beobachte die Gesamtzeit mit 5.000 Aufgaben und erkläre, warum der Vorteil verschwindet.', acceptance: 'Gesamtzeit steigt deutlich; Begründung nennt die begrenzte Zahl der CPU-Kerne.' },
    ],
    quiz: [
      { q: 'Ein Service wartet pro Anfrage 300 ms auf eine Datenbank und rechnet 2 ms. Er läuft mit einem Pool von 200 Threads und wird bei hoher Last langsam. Was bringt Virtual Threads hier am ehesten?',
        options: ['Die Rechenzeit sinkt, weil virtuelle Threads schneller rechnen.', 'Wartende Anfragen blockieren keine knappen Plattform-Threads mehr; deutlich mehr Anfragen laufen gleichzeitig.', 'Die Datenbank antwortet schneller, weil die Anfragen virtuell sind.'],
        correct: 1,
        rationales: ['Virtuelle Threads rechnen nicht schneller; die Rechenzeit bleibt gleich.', 'Das Warten ist der Engpass; virtuelle Threads geben beim Warten den Träger frei.', 'Die Datenbank merkt keinen Unterschied; sie kann durch mehr Parallelität sogar stärker belastet werden.'],
        explain: 'Virtual Threads lösen das Problem blockierender Wartezeiten, nicht das von Rechenzeit.' },
      { q: 'Warum soll man virtuelle Threads nicht in einem Pool halten?',
        options: ['Weil sie nur ein einziges Mal gestartet werden können und danach ungültig sind.', 'Weil sie so billig sind, dass Pooling nichts spart und nur die Zahl gleichzeitiger Aufgaben künstlich begrenzt.', 'Weil Pools nur mit Plattform-Threads kompatibel sind.'],
        correct: 1,
        rationales: ['Ein virtueller Thread führt eine Aufgabe aus und endet; das ist normal, nicht ein Fehler.', 'Das Wiederverwenden von Threads ist hier unnötig; Begrenzung erreichst du gezielter mit Semaphore.', 'Man kann Thread-Fabriken für virtuelle Threads verwenden; technisch möglich, aber unsinnig.'],
        explain: 'Virtuelle Threads sind für „ein Thread pro Aufgabe“ gedacht; Begrenzung macht man mit Semaphore o. Ä.' },
      { q: 'Was ändert JEP 491 (Java 24) für virtuelle Threads?',
        options: ['Virtuelle Threads werden zu Plattform-Threads, sobald sie synchronized betreten.', 'Ein virtueller Thread blockiert in einem synchronized-Block den Träger-Thread nicht mehr.', 'synchronized ist für virtuelle Threads verboten.'],
        correct: 1,
        rationales: ['Das wäre das Gegenteil: Genau diese Umwandlung wird vermieden.', 'Seit Java 24 geben virtuelle Threads den Träger auch in synchronized-Blöcken frei; Pinning durch nativen Code kann bleiben.', 'Es gibt kein solches Verbot.'],
        explain: 'JEP 491 beseitigt das häufigste Pinning durch synchronized.' },
    ],
    sources: [
      jep(444, 'Virtual Threads'),
      { title: 'JEP 491: Synchronize Virtual Threads without Pinning', url: 'https://openjdk.org/jeps/491', note: 'Offizielle Beschreibung (Java 24).' },
      { title: 'Oracle Java Platform: Virtual Threads (Java 25)', url: 'https://docs.oracle.com/en/java/javase/25/core/virtual-threads.html', note: 'Offizielle Plattformdokumentation.' },
      { title: 'Spring Boot Referenz: Virtual Threads', url: 'https://docs.spring.io/spring-boot/reference/features/spring-application.html', note: 'Offizielle Spring-Dokumentation (Property spring.threads.virtual.enabled).' },
    ],
    verification: 'Beispiel unter JDK 21.0.11 ausgeführt (256 ms für 5.000 Aufgaben auf dem Entwicklungsrechner; Messwerte sind rechnerabhängig). Spring-Property in der Boot-Referenz geprüft, nicht in einer laufenden Anwendung gemessen.',
  },

  {
    id: 'java-m25-l5', title: 'Structured Concurrency und Scoped Values', minutes: 40,
    prerequisites: 'Lektion „Virtual Threads“; ExecutorService und Future; ThreadLocal als Begriff.',
    objectives: [
      'Zwei Teilaufgaben in einem Scope starten, gemeinsam abwarten und Fehler korrekt weitergeben',
      'Erklären, wie ein Scope Abbruch und Aufräumen automatisch regelt („kein Thread bleibt zurück“)',
      'Mit Joiner.anySuccessfulOrThrow das erste erfolgreiche Ergebnis nehmen',
      'Einen Scoped Value als unveränderlichen Kontext verwenden und vom ThreadLocal abgrenzen',
      'Den Status beachten: Scoped Values sind final, Structured Concurrency ist Preview',
    ],
    simple: `Wenn du mit einem ExecutorService zwei Aufgaben startest (z. B. „Benutzer laden“ und „Bestellungen laden“) und eine schlägt fehl, läuft die andere einfach weiter. Niemand räumt auf. Kehrt dein Code per Fehler zurück, bleibt ein Thread „herrenlos“ zurück: ein Thread-Leck.

Structured Concurrency bringt eine Regel aus dem normalen Programmieren in die Nebenläufigkeit: Eine Methode, die Teilaufgaben startet, kehrt erst zurück, wenn alle Teilaufgaben beendet sind. Der Scope ist dabei wie ein Klassenzimmer: Der Lehrer verlässt den Raum erst, wenn alle Kinder wieder drinnen oder draußen versorgt sind. Schlägt eine Aufgabe fehl, werden die anderen abgebrochen.

Scoped Values lösen ein verwandtes Problem: Du willst eine Information (z. B. die Request-ID) an alle aufgerufenen Methoden weitergeben, ohne sie als Parameter durchzureichen. Das war die Aufgabe von ThreadLocal. Ein Scoped Value ist unveränderlich und gilt nur innerhalb eines klar begrenzten Codeblocks.`,
    steps: [
      'Status klären: Scoped Values sind seit Java 25 final (JEP 506). StructuredTaskScope ist in Java 26 noch Preview (JEP 525, sechster Preview) und in Java 27 im siebten Preview (JEP 533). Preview-APIs können sich ändern.',
      'Zum Ausführen brauchst du --enable-preview, und beim Quellcode-Start zusätzlich --source 26 (im Beispiel beschrieben).',
      'StructuredTaskScope.open() öffnet einen Scope. Standard: Scheitert eine Teilaufgabe, scheitert der Scope.',
      'scope.fork(...) startet eine Teilaufgabe in einem eigenen (virtuellen) Thread und liefert ein Subtask.',
      'scope.join() wartet auf alle Teilaufgaben. Erst danach darf subtask.get() aufgerufen werden, sonst gibt es eine IllegalStateException.',
      'Verlässt der Code den try-Block, sind alle Teilaufgaben beendet. Im Beispiel (2) wird die langsame Aufgabe abgebrochen, sobald die andere scheitert.',
      'Mit Joiner.anySuccessfulOrThrow() gewinnt die schnellste erfolgreiche Teilaufgabe; die übrigen werden abgebrochen (Beispiel 3).',
      'ScopedValue.where(REQUEST_ID, "r-42").run(...) bindet den Wert für den Block. Auch die im Scope gestarteten Teilaufgaben sehen ihn.',
    ],
    code: { file: dir + 'StructuredScopesDemo.java', lang: 'Java' },
    output: `1) anna (Request r-42), Bestellungen: 3
  slowCall wurde abgebrochen (interrupt)
2) Gescheitert: Bestellsystem nicht erreichbar
3) Schnellste Antwort: Mirror A`,
    mistakes: [
      { wrong: 'subtask.get() aufrufen, bevor scope.join() gelaufen ist.',
        why: 'Das Ergebnis ist noch nicht gesichert. Die API verbietet es: IllegalStateException (mit dem Hinweis „Owner did not join after forking“; so im Lauf unter JDK 26).',
        fix: 'Immer erst join(), dann get().' },
      { wrong: 'Eine Teilaufgabe schreiben, die auf Unterbrechung (interrupt) nicht reagiert, z. B. eine Endlosschleife ohne Prüfung.',
        why: 'Der Scope bricht Teilaufgaben per Interrupt ab. Reagiert eine Aufgabe nicht, wartet close() trotzdem auf sie – der Scope hängt.',
        fix: 'Blockierende Aufrufe unterbrechbar halten (Thread.sleep, Queue.take, Lock.lockInterruptibly) und in Schleifen Thread.interrupted() prüfen.' },
      { wrong: 'Einen Scoped Value außerhalb von ScopedValue.where(...).run(...) lesen.',
        why: 'Ohne gebundenen Wert wirft get() eine NoSuchElementException („ScopedValue not bound“; im Lauf unter JDK 26 beobachtet). isBound() liefert dort false.',
        fix: 'Vorher isBound() prüfen oder orElse(…) nutzen – oder sicherstellen, dass der Code nur im Scope läuft.' },
      { wrong: 'Preview-Funktionen unüberlegt in Produktionscode übernehmen.',
        why: 'Die API kann sich zwischen Releases ändern (JEP 525 nennt z. B. umbenannte Joiner-Methoden). Preview-Code lässt sich nur mit --enable-preview und passender Java-Version laufen.',
        fix: 'Im Team bewusst entscheiden; für Produktion zunächst nur Scoped Values (final seit Java 25) und klassische Executoren einsetzen.' },
    ],
    practice: 'Frage dich vor jedem ExecutorService, der „mehrere Dinge parallel“ lädt: Was passiert bei einem Fehler in der Mitte? Wer räumt auf? Genau diese Fragen beantwortet ein Scope strukturell. Scoped Values ersetzen ThreadLocal vor allem dort, wo ein Wert nur lesend weitergereicht wird (Request-ID, Benutzerkontext) und der Gültigkeitsbereich klar ist.',
    exercises: [
      { task: 'Führe das Beispiel mit JDK 26 aus (java --enable-preview --source 26 StructuredScopesDemo.java). Ändere die Wartezeiten und sage vorher die Ausgabe von Fall 3 voraus.', acceptance: 'Vorhersage und tatsächliche Ausgabe stimmen überein; bei Abweichung ist erklärt, warum.' },
      { task: 'Grenzfall: Lass in Fall 3 beide Teilaufgaben fehlschlagen. Notiere, welche Ausnahme der Aufrufer erhält.', acceptance: 'Ausnahme ist beobachtet und beschrieben; es ist begründet, dass kein Ergebnis vorliegt.' },
      { task: 'Fehlerfall: Rufe user.get() vor scope.join() auf. Beschreibe die Ausnahme und schreibe eine Zeile Regel für dein Team.', acceptance: 'IllegalStateException ist reproduziert; Regel „erst join, dann get“ ist formuliert.' },
    ],
    quiz: [
      { q: 'Zwei Teilaufgaben laufen in einem StructuredTaskScope. Die erste wirft nach 50 ms eine Ausnahme, die zweite läuft noch 10 Sekunden. Was geschieht im Standardfall?',
        options: ['Die zweite läuft die vollen 10 Sekunden weiter, der Scope wartet darauf.', 'Der Scope bricht die zweite Aufgabe per Interrupt ab und join() meldet den Fehler.', 'Die Ausnahme wird verschluckt, der Scope liefert beide Ergebnisse als erfolgreich.'],
        correct: 1,
        rationales: ['Dieses Verhalten kennst du von Futures; ein Scope vermeidet genau dieses Warten.', 'Das ist die Kerneigenschaft: Fehler → Abbruch der Geschwister → Weitergabe der Ausnahme.', 'Fehler werden nicht verschluckt; sie sind der Anlass für den Abbruch.'],
        explain: 'Standardmäßig scheitert der Scope, sobald eine Teilaufgabe scheitert, und bricht die übrigen ab.' },
      { q: 'Welcher Status gilt laut den JEPs für Java 26?',
        options: ['Beide sind in Java 26 noch Preview und brauchen --enable-preview.', 'StructuredTaskScope ist Preview (JEP 525), Scoped Values sind seit Java 25 final (JEP 506).', 'Beide sind seit Java 21 final und brauchen keine Vorschau-Option.'],
        correct: 1,
        rationales: ['Scoped Values sind seit Java 25 final (JEP 506); nur StructuredTaskScope ist in Java 26 noch Preview.', 'So steht es in JEP 525 (Sixth Preview) und JEP 506 (final, Release 25).', 'Weder das eine noch das andere war in Java 21 final; Structured Concurrency ist weiterhin Preview.'],
        explain: 'Scoped Values: final seit Java 25. Structured Concurrency: Preview (Java 26: JEP 525, Java 27: JEP 533).' },
      { q: 'Worin unterscheidet sich ein Scoped Value wesentlich von einem ThreadLocal?',
        options: ['Er ist unveränderlich und nur innerhalb eines klar begrenzten Blocks gebunden.', 'Er lässt sich beliebig oft überschreiben und gilt bis zum Programmende.', 'Er ist nur für den Main-Thread verfügbar.'],
        correct: 0,
        rationales: ['Bindung per where(...).run(...); danach ist der Wert weg. Es gibt kein set().', 'Das beschreibt eher einen ThreadLocal und genau dessen Probleme.', 'Scoped Values werden in Teilaufgaben eines Scopes mitgegeben, nicht nur im Main-Thread.'],
        explain: 'Scoped Values sind unveränderlich und an die Dauer eines Codeblocks gebunden.' },
    ],
    sources: [
      jep(506, 'Scoped Values'),
      jep(525, 'Structured Concurrency (Sixth Preview)'),
      jep(533, 'Structured Concurrency (Seventh Preview)'),
      { title: 'Oracle Java Platform: Structured Concurrency (Java 25)', url: 'https://docs.oracle.com/en/java/javase/25/core/structured-concurrency.html', note: 'Offizielle Plattformdokumentation.' },
      { title: 'Oracle Java Platform: Scoped Values (Java 25)', url: 'https://docs.oracle.com/en/java/javase/25/core/scoped-values.html', note: 'Offizielle Plattformdokumentation.' },
    ],
    verification: 'Beispiel unter JDK 26.0.1 mit --enable-preview ausgeführt; die Fehlermeldungen (join vergessen, Scoped Value ungebunden) stammen aus eigenen Läufen. Unter JDK 21 läuft das Beispiel nicht (anderer API-Stand).',
  },

  {
    id: 'java-m25-l6', title: 'Stream Gatherers und unbenannte Variablen', minutes: 35,
    prerequisites: 'Streams (Modul 11): map, filter, collect; Lambdas.',
    objectives: [
      'Mit Gatherers.windowFixed, windowSliding und scan Zwischenoperationen verwenden, die es vorher nicht gab',
      'Einen eigenen, zustandsbehafteten Gatherer schreiben (aufeinanderfolgende Duplikate entfernen)',
      'Mit mapConcurrent mehrere blockierende Aufrufe begrenzt parallel ausführen',
      'Den Platzhalter _ für bewusst ungenutzte Variablen verwenden und seinen Java-Stand kennen',
    ],
    simple: `Mit Streams kennst du map, filter, sorted und so weiter. Was fehlt: Operationen, die sich „merken“ müssen, was vorher kam, oder die Elemente gruppieren. Zum Beispiel: „Gib mir immer je 3 Elemente auf einmal“ oder „zeige die laufende Summe“. Dafür musstest du bisher die Liste erst einsammeln und dann umständlich weiterverarbeiten.

Seit Java 24 (JEP 485) gibt es mit gather(...) eine neue Zwischenoperation. Ein Gatherer ist ein kleiner Baustein, der Elemente entgegennimmt und entscheidet, was er weitergibt: eins, keins oder mehrere. Die wichtigsten fertigen Bausteine stecken in der Klasse Gatherers.

Außerdem lernst du eine kleine Sprachfunktion: _ als Name für „das brauche ich nicht“. Das macht Code ehrlicher, weil man sofort sieht, dass ein Wert bewusst ignoriert wird.`,
    steps: [
      'Gatherers.windowFixed(3) gruppiert in Fenster fester Größe: [[1,2,3],[4,5,6],[7]]. Das letzte Fenster darf kürzer sein.',
      'Gatherers.windowSliding(2) bildet überlappende Fenster: [[1,2],[2,3],[3,4],[4,5]].',
      'Gatherers.scan(() -> 0, Integer::sum) liefert die laufende Summe: [1,3,6,10].',
      'dropConsecutiveDuplicates ist ein eigener Gatherer: Er merkt sich das letzte Element (Zustand) und gibt ein Element nur weiter, wenn es sich vom vorherigen unterscheidet. Ergebnis: [a, b, c, a].',
      'Gatherers.mapConcurrent(3, fn) führt die Funktion für Elemente mit höchstens 3 gleichzeitig laufenden virtuellen Threads aus. Die Reihenfolge der Ergebnisse bleibt erhalten.',
      'Unbenannte Variablen: „for (var _ : entries)“ und „catch (NumberFormatException _)“ zeigen, dass der Wert nicht benötigt wird. Final seit Java 22 (JEP 456). Unter Java 21 war das noch Preview: Der Compiler meldet dort „Unbenannte Variablen sind ein Vorschaufeature“ (so im Test mit JDK 21).',
    ],
    code: { file: dir + 'GatherersDemo.java', lang: 'Java' },
    output: `[[1, 2, 3], [4, 5, 6], [7]]
[[1, 2], [2, 3], [3, 4], [4, 5]]
[1, 3, 6, 10]
[a, b, c, a]
[Seite-1, Seite-2, Seite-3, Seite-4, Seite-5, Seite-6]
Einträge: 3
Ungültige Zahl, Ausnahme bewusst nicht weiterverwendet`,
    mistakes: [
      { wrong: 'Einen Gatherer mit Zustand in einem parallelen Stream benutzen, ohne an die Reihenfolge zu denken.',
        why: 'Gatherer.ofSequential(...) ist bewusst für sequentielle Verarbeitung gemacht. Zustand zwischen Elementen setzt eine feste Reihenfolge voraus.',
        fix: 'Zustandsbehaftete Gatherer sequentiell einsetzen; Parallelität bei Bedarf mit mapConcurrent oder einem Gatherer mit Combiner lösen.' },
      { wrong: 'Aus einem Gatherer-Integrator immer true zurückgeben, auch wenn downstream.push(...) false lieferte.',
        why: 'false bedeutet: Der nachfolgende Teil braucht nichts mehr (z. B. bei limit). Weiterarbeiten verschwendet Zeit oder führt zu Fehlern.',
        fix: 'Den Rückgabewert von push weiterreichen (im Beispiel: return downstream.push(element)).' },
      { wrong: '_ in Code verwenden, der noch unter Java 21 gebaut wird.',
        why: 'Dort ist es nur ein Vorschaufeature; der Build bricht ohne --enable-preview ab.',
        fix: 'Zielversion prüfen (Java 22 oder neuer) und in der Build-Konfiguration festschreiben.' },
    ],
    practice: 'Gatherer sind kein Ersatz für gute Datenstrukturen. Für Fenster, laufende Summen oder „bis zur Bedingung weiterlesen“ sparen sie Hilfsvariablen und machen die Pipeline lesbar. Wenn der Code ohne Gatherer mit einer einfachen Schleife klarer ist, nimm die Schleife. Weitere in Java 25 finalisierte Sprachneuerungen, die du kennen solltest: Flexible Constructor Bodies (JEP 513) und kompakte Quelldateien mit Instanz-main (JEP 512).',
    exercises: [
      { task: 'Schreibe mit windowFixed(2) eine Pipeline, die Wertepaare summiert: aus [1,2,3,4,5] wird [3,7,5].', acceptance: 'Ergebnis [3, 7, 5]; das letzte, unvollständige Fenster ist korrekt behandelt.' },
      { task: 'Grenzfall: Prüfe windowSliding(3) mit nur zwei Elementen. Was liefert der Stream? Erkläre das Ergebnis.', acceptance: 'Beobachtung ist dokumentiert: Es entsteht genau ein Fenster [[1, 2]] (bei einem leeren Stream gar keins, also []). Die Erklärung nennt, dass zu wenige Elemente ein verkürztes Fenster ergeben statt eines Fehlers.' },
      { task: 'Fehlerfall: Kompiliere GatherersDemo mit JDK 21. Notiere die Fehlermeldung und erkläre, welche zwei Sprach- bzw. API-Neuerungen den Fehler auslösen.', acceptance: 'Fehlermeldung zum Vorschaufeature ist dokumentiert; Gatherer (ab 24) und _ (ab 22) sind richtig zugeordnet.' },
    ],
    quiz: [
      { q: 'Du willst aus einem Stream die laufende Summe jedes Zwischenstands ausgeben. Welcher Baustein passt?',
        options: ['Gatherers.windowFixed(n)', 'Gatherers.scan(() -> 0, Integer::sum)', 'Collectors.summingInt'],
        correct: 1,
        rationales: ['windowFixed gruppiert in Pakete, es bildet keine laufende Summe.', 'scan gibt nach jedem Element den aktuellen Zwischenstand aus: 1, 3, 6, 10.', 'Der Collector liefert nur das Endergebnis, keine Zwischenstände.'],
        explain: 'scan liefert die fortlaufende Aggregation als neuen Stream.' },
      { q: 'Was bedeutet „return false“ aus downstream.push(...) in einem eigenen Gatherer?',
        options: ['Das aktuelle Element war ungültig und wird aus dem Ergebnis gelöscht.', 'Der nachfolgende Teil der Pipeline will keine weiteren Elemente; der Gatherer soll aufhören.', 'Der Stream wird danach automatisch parallel weiterverarbeitet.'],
        correct: 1,
        rationales: ['Der Rückgabewert meldet nur, ob weitergemacht werden soll; er bewertet das Element nicht.', 'Typischer Fall: ein nachfolgendes limit(n) ist erfüllt.', 'Parallelität wählt man mit parallel() am Stream, nicht über den Rückgabewert von push.'],
        explain: 'false von push heißt: kein Bedarf mehr; der Gatherer soll die Verarbeitung beenden.' },
      { q: 'Wann kannst du „catch (NumberFormatException _)“ ohne Vorschaufunktionen verwenden?',
        options: ['Ab Java 22.', 'Ab Java 17.', 'Nur mit --enable-preview in jeder Version.'],
        correct: 0,
        rationales: ['Unbenannte Variablen sind seit Java 22 final (JEP 456).', 'Unter Java 17 existiert das Feature nicht.', 'Seit Java 22 ist keine Preview-Option mehr nötig.'],
        explain: 'Unbenannte Variablen und Muster sind seit Java 22 finaler Bestandteil der Sprache.' },
    ],
    sources: [
      jep(485, 'Stream Gatherers'),
      jep(456, 'Unnamed Variables & Patterns'),
      { title: 'Oracle Java API: java.util.stream.Gatherers (Java 25)', url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Gatherers.html', note: 'Offizielle API-Dokumentation.' },
      jep(513, 'Flexible Constructor Bodies'),
    ],
    verification: 'Beispiel unter JDK 26.0.1 ausgeführt; unter JDK 21.0.11 schlägt die Kompilierung erwartungsgemäß mit der Vorschau-Meldung fehl. mapConcurrent wurde nur auf korrekte Ergebnisse und Reihenfolge geprüft, nicht auf tatsächliche Parallelität gemessen.',
  },
];
