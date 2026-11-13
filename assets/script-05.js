
/* ============================================================
   Sechste Runde: mehr Aufgaben, Terminal-Typ, Quests, Blitzrunde,
   Modul-Meisterschaft, Entwickler-Titel, Spickzettel, Suche.
   ============================================================ */

/* ---------- Zweite Welle Aufgaben ---------- */
[{"id": "lab-p2-strings", "lektion": "m52-l2", "titel": "Einfache gegen doppelte Anführungszeichen", "stufe": 1, "typ": "ausgabe", "aufgabe": "Was gibt diese Zeile genau aus?", "sprache": "PHP", "tipp": "Nur in doppelten Anführungszeichen werden Variablen ersetzt.", "erklaerung": "Der erste Teil steht in einfachen Anführungszeichen und bleibt wörtlich „Hi $name“, der zweite wird zu „Hi Ada“.", "code": "<?php\n$name = 'Ada';\necho 'Hi $name' . ' / ' . \"Hi $name\";", "antworten": ["Hi $name / Hi Ada"]}, {"id": "lab-p2-division", "lektion": "m52-l3", "titel": "Drei Arten zu teilen", "stufe": 1, "typ": "ausgabe", "aufgabe": "Was gibt var_dump aus? Schreibe z. B. „3 2 true“.", "sprache": "PHP", "tipp": "intdiv schneidet ab, % liefert den Rest, / liefert eine Kommazahl.", "erklaerung": "17 durch 5 ist 3 Rest 2. 17 / 5 = 3.4, also größer als 3.", "code": "<?php\nvar_dump(intdiv(17, 5));\nvar_dump(17 % 5);\nvar_dump(17 / 5 > 3);", "antworten": ["3 2 true", "int(3) int(2) bool(true)"]}, {"id": "lab-p2-wahrheit", "lektion": "m52-l4", "titel": "Was ist wahr?", "stufe": 2, "typ": "ausgabe", "aufgabe": "Welche Indizes werden ausgegeben? Antworte mit den Ziffern hintereinander, z. B. „024“.", "sprache": "PHP", "tipp": "Nur \"0\", \"\" und das leere Array sind hier false.", "erklaerung": "\"0.0\" (1), ein Leerzeichen (3) und [0] (5) gelten als true. \"0\" (0), \"\" (2) und [] (4) sind false.", "code": "<?php\n$werte = ['0', '0.0', '', ' ', [], [0]];\nforeach ($werte as $i => $wert) {\n    if ($wert) {\n        echo $i;\n    }\n}", "antworten": ["135"]}, {"id": "lab-p2-schleife", "lektion": "m52-l5", "titel": "Rückwärts in Dreierschritten", "stufe": 1, "typ": "ausgabe", "aufgabe": "Welchen Wert hat $summe am Ende? Lege eine Wertetabelle an.", "sprache": "PHP", "tipp": "i nimmt nacheinander 10, 7, 4 und … an.", "erklaerung": "10 + 7 + 4 + 1 = 22. Danach wäre i = -2 und die Bedingung i > 0 ist falsch.", "code": "<?php\n$summe = 0;\nfor ($i = 10; $i > 0; $i -= 3) {\n    $summe += $i;\n}\necho $summe;", "antworten": ["22"]}, {"id": "lab-p2-guard", "lektion": "m52-l4", "titel": "Der Rabatt, der nie kommt", "stufe": 2, "typ": "bug", "aufgabe": "rabatt(20) liefert 5 statt 10. Welche Zeile ist schuld?", "sprache": "PHP", "tipp": "Zähle die Gleichheitszeichen.", "erklaerung": "$menge = 0 ist eine Zuweisung: $menge wird 0, die Bedingung ist falsch, und danach gilt 0 >= 10 nicht – also immer 5.", "code": "function rabatt(int $menge): int\n{\n    if ($menge = 0) {\n        return 0;\n    }\n    return $menge >= 10 ? 10 : 5;\n}", "fehler": [2], "fix": "if ($menge === 0) {"}, {"id": "lab-p2-arrays", "lektion": "m53-l1", "titel": "Schlüssel nach unset", "stufe": 2, "typ": "ausgabe", "aufgabe": "Welche Schlüssel hat das Array am Ende?", "sprache": "PHP", "tipp": "unset nummeriert nicht neu, und [] hängt beim höchsten Index + 1 an.", "erklaerung": "Nach unset bleiben 0 und 2. Das Anhängen nimmt den nächsten Index nach dem bisher höchsten: 3.", "code": "<?php\n$a = ['x', 'y', 'z'];\nunset($a[1]);\n$a[] = 'w';\necho implode(',', array_keys($a));", "antworten": ["0,2,3"]}, {"id": "lab-p2-sort", "lektion": "m53-l2", "titel": "Sortieren mit Rückgabewert", "stufe": 1, "typ": "bug", "aufgabe": "Das Skript bricht mit einem TypeError ab. Wo liegt die Ursache?", "sprache": "PHP", "tipp": "Was gibt sort() eigentlich zurück?", "erklaerung": "sort() sortiert das übergebene Array selbst und gibt nur true zurück. implode() bekommt deshalb einen bool statt eines Arrays.", "code": "<?php\n$preise = [499, 1990, 120];\n$sortiert = sort($preise);\necho implode(', ', $sortiert);", "fehler": [2], "fix": "sort($preise);\necho implode(', ', $preise);"}, {"id": "lab-p2-mb", "lektion": "m53-l3", "titel": "Bytes oder Zeichen?", "stufe": 2, "typ": "ausgabe", "aufgabe": "Was gibt die Zeile aus (UTF-8)?", "sprache": "PHP", "tipp": "ö und ß belegen in UTF-8 je zwei Byte.", "erklaerung": "strlen zählt Bytes: G, r, ö (2), ß (2), e = 7. mb_strlen zählt Zeichen: 5.", "code": "<?php\necho strlen('Größe') . ' ' . mb_strlen('Größe');", "antworten": ["7 5"]}, {"id": "lab-p2-datum", "lektion": "m53-l4", "titel": "Die veränderliche Falle", "stufe": 3, "typ": "ausgabe", "aufgabe": "Was gibt das Skript aus? Achtung: DateTime, nicht DateTimeImmutable.", "sprache": "PHP", "tipp": "Zwei Effekte: Der 31. April existiert nicht, und modify() verändert das Objekt selbst.", "erklaerung": "31. März + 1 Monat ergibt den „31. April“ = 1. Mai. Weil DateTime veränderlich ist und modify() dasselbe Objekt zurückgibt, zeigen $start und $ende beide auf den 1. Mai.", "code": "<?php\n$start = new DateTime('2026-03-31');\n$ende  = $start->modify('+1 month');\necho $start->format('d.m.') . ' ' . $ende->format('d.m.');", "antworten": ["01.05. 01.05."]}, {"id": "lab-p2-json", "lektion": "m54-l2", "titel": "JSON sicher dekodieren", "stufe": 1, "typ": "luecke", "aufgabe": "Dekodiere als assoziatives Array und lass bei kaputtem JSON eine Exception werfen.", "sprache": "PHP", "tipp": "Der zweite Parameter wählt zwischen Array und Objekt.", "erklaerung": "true liefert assoziative Arrays. JSON_THROW_ON_ERROR wirft eine JsonException statt still null zurückzugeben.", "code": "<?php\n$daten = json_decode($roh, [[0]], 512, [[1]]);", "antworten": [["true"], ["JSON_THROW_ON_ERROR"]]}, {"id": "lab-p2-pfad", "lektion": "m54-l1", "titel": "Der Download, der zu viel liefert", "stufe": 2, "typ": "bug", "aufgabe": "Mit ?datei=../../.env lädt ein Angreifer deine Zugangsdaten herunter. In welcher Zeile entsteht die Lücke?", "sprache": "PHP", "tipp": "Wo wird die Eingabe ungeprüft Teil eines Dateipfads?", "erklaerung": "Die Eingabe wird ungeprüft an den Pfad gehängt. ../ verlässt das Download-Verzeichnis (Path Traversal). Nur Namen aus einer Whitelist zulassen.", "code": "<?php\n$datei = $_GET['datei'] ?? 'agb.pdf';\n$pfad  = __DIR__ . '/downloads/' . $datei;\nif (is_file($pfad)) {\n    readfile($pfad);\n}", "fehler": [2], "fix": "$erlaubt = ['agb.pdf', 'preise.pdf'];\nif (!in_array($datei, $erlaubt, true)) { http_response_code(404); exit; }\n$pfad = __DIR__ . '/downloads/' . $datei;"}, {"id": "lab-p2-guzzle", "lektion": "m54-l3", "titel": "Robuster HTTP-Client", "stufe": 2, "typ": "luecke", "aufgabe": "Ergänze: maximal 5 Sekunden Gesamtdauer, und fange den Fall ab, dass der Dienst gar nicht erreichbar ist.", "sprache": "PHP", "tipp": "Die Exception heißt nach dem Verbindungsaufbau.", "erklaerung": "timeout begrenzt die Gesamtdauer. ConnectException tritt auf, wenn keine Verbindung zustande kommt – ClientException und ServerException setzen eine Antwort voraus.", "code": "<?php\n$client = new Client(['base_uri' => 'https://api.example/', '[[0]]' => 5.0]);\n\ntry {\n    $antwort = $client->get('status');\n} catch ([[1]] $e) {\n    return null;     // Dienst nicht erreichbar\n}", "antworten": [["timeout"], ["ConnectException"]]}, {"id": "lab-p2-generator", "lektion": "m55-l1", "titel": "Faule Generatoren", "stufe": 3, "typ": "ausgabe", "aufgabe": "Was gibt das Skript aus?", "sprache": "PHP", "tipp": "Der Generator läuft nur so weit, wie Werte abgeholt werden.", "erklaerung": "Bis zum ersten yield wird „A“ ausgegeben, dann die 1. Nach break wird kein weiterer Wert abgeholt – B und C laufen nie.", "code": "<?php\nfunction zaehle(): Generator\n{\n    echo 'A';\n    yield 1;\n    echo 'B';\n    yield 2;\n    echo 'C';\n}\n\nforeach (zaehle() as $z) {\n    echo $z;\n    break;\n}", "antworten": ["A1"]}, {"id": "lab-p2-hooks", "lektion": "m55-l3", "titel": "PHP 8.4 im Einsatz", "stufe": 2, "typ": "luecke", "aufgabe": "Der Zählerstand soll von außen lesbar, aber nur intern änderbar sein. Und gesucht ist das erste Element über 2.", "sprache": "PHP", "tipp": "Asymmetrische Sichtbarkeit: Lesen öffentlich, Schreiben …", "erklaerung": "public private(set) erlaubt das Lesen überall, das Schreiben nur in der Klasse. array_find liefert das erste passende Element.", "code": "<?php\nfinal class Zaehler\n{\n    public [[0]](set) int $stand = 0;\n\n    public function erhoehe(): void { $this->stand++; }\n}\n\n$erste = array_[[1]]([2, 1, 4, 3], fn (int $n) => $n > 2);   // 4", "antworten": [["private"], ["find"]]}, {"id": "lab-p2-stub", "lektion": "m55-l4", "titel": "Ein Stub für den Test", "stufe": 2, "typ": "luecke", "aufgabe": "Erzeuge eine Attrappe für das Interface und lass kurs() immer 1.10 liefern.", "sprache": "PHP · PHPUnit", "tipp": "Ein Stub liefert feste Antworten.", "erklaerung": "createStub() erzeugt eine Attrappe, willReturn() legt die Antwort fest. Ein Mock (createMock) würde zusätzlich Aufrufe prüfen.", "code": "<?php\n$kurse = $this->[[0]](Wechselkurse::class);\n$kurse->method('kurs')->[[1]](1.10);\n\n$this->assertSame(1100, (new PreisRechner($kurse))->umrechnen(1000, 'USD'));", "antworten": [["createStub"], ["willReturn"]]}, {"id": "lab-lv2-komponente", "lektion": "m56-l1", "titel": "Eine Blade-Komponente", "stufe": 1, "typ": "luecke", "aufgabe": "Deklariere den Standardwert für typ und ergänze die Klasse „hinweis“, ohne Klassen des Aufrufers zu verlieren.", "sprache": "Blade", "tipp": "Die Direktive für erwartete Werte und die Methode zum Zusammenführen von Attributen.", "erklaerung": "@props deklariert typ mit Standardwert. $attributes->merge() kombiniert die eigenen Klassen mit denen des Aufrufers.", "code": "@[[0]](['typ' => 'info'])\n\n<div {{ $attributes->[[1]](['class' => 'hinweis hinweis-' . $typ]) }}>\n    {{ $slot }}\n<\/div>", "antworten": [["props"], ["merge"]]}, {"id": "lab-lv2-build", "lektion": "m56-l2", "titel": "Assets für den Server", "stufe": 1, "typ": "befehl", "aufgabe": "Auf dem Server fehlt das CSS („Vite manifest not found“). Welcher Befehl erzeugt die Produktions-Assets?", "sprache": "Bash", "tipp": "npm run dev ist für die Entwicklung.", "erklaerung": "npm run build erzeugt optimierte Dateien und das Manifest in public/build. Der Befehl gehört ins Deployment-Skript.", "antworten": ["npm run build"]}, {"id": "lab-lv2-livewire", "lektion": "m56-l3", "titel": "Livewire verdrahten", "stufe": 1, "typ": "luecke", "aufgabe": "Verbinde das Suchfeld live mit der Eigenschaft $suche und den Knopf mit der Methode zuruecksetzen.", "sprache": "Blade", "tipp": "„live“ synchronisiert schon beim Tippen.", "erklaerung": "wire:model.live bindet das Feld sofort an die Eigenschaft, wire:click ruft die Methode der Komponente auf.", "code": "<input type=\"search\" wire:[[0]]=\"suche\">\n<button wire:[[1]]=\"zuruecksetzen\">Zurücksetzen<\/button>", "antworten": [["model.live", "model.live.debounce.300ms"], ["click"]]}, {"id": "lab-lv2-upload", "lektion": "m57-l1", "titel": "Profilbild speichern", "stufe": 1, "typ": "luecke", "aufgabe": "Speichere die hochgeladene Datei auf der public-Disk im Ordner avatare und erhalte den Pfad.", "sprache": "PHP · Laravel", "tipp": "Die Größenregel gibt Kilobyte an.", "erklaerung": "max:2048 begrenzt auf 2 MB. store() vergibt einen zufälligen Dateinamen und liefert den Pfad zurück.", "code": "<?php\n$request->validate(['avatar' => ['required', 'image', '[[0]]:2048']]);\n\n$pfad = $request->file('avatar')->[[1]]('avatare', 'public');", "antworten": [["max"], ["store"]]}, {"id": "lab-lv2-storage-link", "lektion": "m57-l1", "titel": "Öffentliche Dateien erreichbar machen", "stufe": 1, "typ": "befehl", "aufgabe": "Hochgeladene Bilder auf der public-Disk liefern 404. Welcher Artisan-Befehl fehlt?", "sprache": "Bash", "tipp": "Es fehlt eine Verknüpfung von public/storage nach storage/app/public.", "erklaerung": "storage:link legt den symbolischen Link an. Danach liefert Storage::url() eine funktionierende Adresse.", "antworten": ["php artisan storage:link"]}, {"id": "lab-lv2-mail", "lektion": "m57-l2", "titel": "Der hängende Checkout", "stufe": 2, "typ": "bug", "aufgabe": "Nach „Kaufen“ dreht sich der Ladekreis drei Sekunden. Welche Zeile bremst? (Das Mailable implementiert ShouldQueue nicht.)", "sprache": "PHP · Laravel", "tipp": "Welche Arbeit muss nicht im Request passieren?", "erklaerung": "send() verschickt synchron und wartet auf den Mailserver. queue() legt den Versand in die Warteschlange – der Kunde sieht sofort seine Bestellung.", "code": "public function store(BestellungRequest $request, BestellungAnlegen $anlegen)\n{\n    $bestellung = $anlegen->ausfuehren($request->user(), $request->positionen());\n    Mail::to($request->user())->send(new BestellBestaetigung($bestellung));\n    return to_route('bestellungen.show', $bestellung);\n}", "fehler": [3], "fix": "Mail::to($request->user())->queue(new BestellBestaetigung($bestellung));"}, {"id": "lab-lv2-notification", "lektion": "m57-l3", "titel": "Benachrichtigung über zwei Kanäle", "stufe": 1, "typ": "luecke", "aufgabe": "Lege die Kanäle fest und schicke die Notification an den Benutzer.", "sprache": "PHP · Laravel", "tipp": "Der Trait Notifiable stellt die Methode zum Verschicken bereit.", "erklaerung": "via() bestimmt die Kanäle, notify() verschickt die Notification an das Model mit dem Trait Notifiable.", "code": "<?php\npublic function [[0]](object $notifiable): array\n{\n    return ['mail', 'database'];\n}\n\n// Ausloesen\n$user->[[1]](new BestellungVersendet($bestellung));", "antworten": [["via"], ["notify"]]}, {"id": "lab-lv2-wherehas", "lektion": "m58-l1", "titel": "Kunden mit offenen Bestellungen", "stufe": 2, "typ": "luecke", "aufgabe": "Nur Kunden mit mindestens einer offenen Bestellung – und ihr Umsatz als zusätzliche Spalte.", "sprache": "PHP · Laravel", "tipp": "Filtern über eine Beziehung, dann aggregieren.", "erklaerung": "whereHas filtert per EXISTS-Unterabfrage, withSum ergänzt die Summe als Spalte – alles in einer Abfrage.", "code": "<?php\n$kunden = Kunde::[[0]]('bestellungen', fn ($q) => $q->where('status', 'offen'))\n    ->[[1]]('bestellungen', 'summe_cent')\n    ->get();\n// Spalte: bestellungen_sum_summe_cent", "antworten": [["whereHas"], ["withSum"]]}, {"id": "lab-lv2-cast", "lektion": "m58-l2", "titel": "Ein eigener Cast", "stufe": 3, "typ": "luecke", "aufgabe": "Ergänze Interface und Methodennamen des Casts, der Cent-Werte in Geld-Objekte wandelt.", "sprache": "PHP · Laravel", "tipp": "Die Methode wandelt den Datenbankwert in den PHP-Typ.", "erklaerung": "Custom Casts implementieren CastsAttributes mit get() (Datenbank → PHP) und set() (PHP → Datenbank).", "code": "<?php\nclass GeldCast implements [[0]]\n{\n    public function [[1]](Model $model, string $key, mixed $value, array $attributes): ?Geld\n    {\n        return $value === null ? null : Geld::cent((int) $value);\n    }\n\n    public function set(Model $model, string $key, mixed $value, array $attributes): ?int\n    {\n        return $value?->cent;\n    }\n}", "antworten": [["CastsAttributes"], ["get"]]}, {"id": "lab-lv2-morph", "lektion": "m58-l3", "titel": "Kommentare für alles", "stufe": 2, "typ": "luecke", "aufgabe": "Lege die Spalten für die polymorphe Beziehung an und definiere die Beziehung im Produkt.", "sprache": "PHP · Laravel", "tipp": "Beide Namen beginnen mit „morph“.", "erklaerung": "morphs() legt _id, _type und einen Index an. morphMany() ist die Seite, die viele polymorphe Kinder hat.", "code": "<?php\n// Migration\n$table->[[0]]('kommentierbar');     // kommentierbar_id + kommentierbar_type\n\n// Model Produkt\npublic function kommentare(): MorphMany\n{\n    return $this->[[1]](Kommentar::class, 'kommentierbar');\n}", "antworten": [["morphs"], ["morphMany"]]}, {"id": "lab-lv2-prune", "lektion": "m58-l4", "titel": "Alte Daten aufräumen", "stufe": 1, "typ": "befehl", "aufgabe": "Welcher Artisan-Befehl löscht alle Datensätze, die Models mit dem Trait Prunable freigeben?", "sprache": "Bash", "tipp": "Der Befehl gehört zur model-Gruppe.", "erklaerung": "model:prune ruft prunable() aller betroffenen Models auf. Üblich ist ein täglicher Eintrag im Scheduler.", "antworten": ["php artisan model:prune"]}, {"id": "lab-lv2-http", "lektion": "m59-l1", "titel": "HTTP-Client absichern", "stufe": 2, "typ": "luecke", "aufgabe": "Ergänze ein Zeitlimit von 5 Sekunden und kodiere die Sendungsnummer für die URL.", "sprache": "PHP · Laravel", "tipp": "Pfadteile werden mit einer anderen Funktion kodiert als Query-Parameter.", "erklaerung": "timeout(5) verhindert endloses Warten. rawurlencode() macht aus Zeichen wie / oder ? harmlose Prozent-Kodierungen.", "code": "<?php\n$antwort = Http::withToken(config('services.versand.token'))\n    ->[[0]](5)\n    ->retry(3, 200)\n    ->get('https://api.versand.example/sendungen/' . [[1]]($nummer));", "antworten": [["timeout"], ["rawurlencode"]]}, {"id": "lab-lv2-webhook", "lektion": "m59-l2", "titel": "Signaturprüfung mit Lücke", "stufe": 3, "typ": "bug", "aufgabe": "Die Signatur wird geprüft – und trotzdem ist die Prüfung angreifbar. Welche Zeile?", "sprache": "PHP · Laravel", "tipp": "Wie lange dauert ein normaler Stringvergleich bei einem frühen Unterschied?", "erklaerung": "!== bricht beim ersten abweichenden Zeichen ab. Über die Antwortzeit lässt sich die Signatur Zeichen für Zeichen erraten (Timing-Angriff). hash_equals vergleicht in konstanter Zeit.", "code": "<?php\n$roh      = $request->getContent();\n$erwartet = hash_hmac('sha256', $roh, config('services.zahlung.webhook_secret'));\nif ($erwartet !== $request->header('X-Signatur')) {\n    abort(401);\n}", "fehler": [3], "fix": "if (!hash_equals($erwartet, (string) $request->header('X-Signatur'))) {"}, {"id": "lab-lv2-scout", "lektion": "m59-l3", "titel": "Den Suchindex füllen", "stufe": 2, "typ": "befehl", "aufgabe": "Scout ist eingerichtet, aber bestehende Produkte werden nicht gefunden. Importiere alle Produkte in den Index.", "sprache": "Bash", "tipp": "Der Befehl heißt wie das, was er tut, und bekommt den Model-Klassennamen.", "erklaerung": "scout:import indexiert alle vorhandenen Datensätze. Danach hält Scout den Index beim Speichern und Löschen automatisch aktuell.", "antworten": ["php artisan scout:import \"App\\Models\\Produkt\"", "php artisan scout:import App\\\\Models\\\\Produkt"]}, {"id": "lab-lv2-broadcast", "lektion": "m59-l4", "titel": "Ein privates Echtzeit-Event", "stufe": 2, "typ": "luecke", "aufgabe": "Das Event soll an die Browser gesendet werden – aber nur an den Kunden der Bestellung.", "sprache": "PHP · Laravel", "tipp": "Wer zuhören darf, regelt dann routes/channels.php.", "erklaerung": "ShouldBroadcast sendet das Event über die Queue an Reverb. Ein PrivateChannel verlangt eine Berechtigungsprüfung in routes/channels.php.", "code": "<?php\nclass BestellstatusGeaendert implements [[0]]\n{\n    public function broadcastOn(): array\n    {\n        return [new [[1]]('bestellungen.' . $this->bestellung->id)];\n    }\n}", "antworten": [["ShouldBroadcast"], ["PrivateChannel"]]}, {"id": "lab-lv2-signed", "lektion": "m60-l1", "titel": "Fälschungssicherer Abmeldelink", "stufe": 2, "typ": "luecke", "aufgabe": "Erzeuge einen 7 Tage gültigen, signierten Link und schütze die Route.", "sprache": "PHP · Laravel", "tipp": "Der Link läuft ab – „temporary“.", "erklaerung": "temporarySignedRoute signiert Parameter und Ablaufzeit. Die Middleware signed lehnt manipulierte oder abgelaufene Links mit 403 ab.", "code": "<?php\n$link = URL::[[0]]('newsletter.abmelden', now()->addDays(7), ['user' => $user->id]);\n\nRoute::get('/newsletter/abmelden/{user}', NewsletterAbmelden::class)\n    ->name('newsletter.abmelden')\n    ->middleware('[[1]]');", "antworten": [["temporarySignedRoute"], ["signed"]]}, {"id": "lab-lv2-audit", "lektion": "m60-l1", "titel": "Abhängigkeiten prüfen", "stufe": 1, "typ": "befehl", "aufgabe": "Prüfe die installierten PHP-Pakete auf bekannte Sicherheitslücken.", "sprache": "Bash", "tipp": "Composer hat dafür einen eigenen Befehl.", "erklaerung": "composer audit gleicht composer.lock mit Sicherheitsdatenbanken ab. Gehört in jede CI-Pipeline.", "antworten": ["composer audit"]}, {"id": "lab-lv2-meilenstein", "lektion": "m60-l4", "titel": "Ein Meilenstein von Anfang bis Ende", "stufe": 2, "typ": "ordnen", "aufgabe": "Bringe die Schritte für die Umsetzung eines Meilensteins in die bewährte Reihenfolge.", "sprache": "Projekt", "tipp": "Von innen nach außen: erst Daten, dann Logik, dann HTTP.", "erklaerung": "Der Branch schützt main, die Testliste definiert „fertig“. Datenbank vor Logik vor HTTP-Schicht – und erst wenn alles grün ist, geht der Code ins Review.", "schritte": ["Feature-Branch anlegen", "Testliste aus der Planung als Pest-Tests anlegen", "Migration, Model und Factory", "Fachlogik als Action mit Test", "Route, Form Request, Policy, Controller", "pint, phpstan und alle Tests grün", "Pull Request mit Review und Merge"]}, {"id": "lab-git-config", "lektion": "m61-l2", "titel": "Wer bist du?", "stufe": 1, "typ": "befehl", "aufgabe": "Setze deinen Namen für alle Repositorys auf „Ada Lovelace“.", "sprache": "Bash", "tipp": "Die Ebene für dein ganzes Benutzerkonto heißt …", "erklaerung": "--global speichert in ~/.gitconfig. Ohne --global gilt die Einstellung nur für das aktuelle Repository.", "antworten": ["git config --global user.name \"Ada Lovelace\""]}, {"id": "lab-git-ablauf", "lektion": "m61-l3", "titel": "Vom Bearbeiten bis zum Server", "stufe": 1, "typ": "ordnen", "aufgabe": "Bringe die Schritte des täglichen Git-Ablaufs in die richtige Reihenfolge.", "sprache": "Bash", "tipp": "Erst vormerken, dann prüfen, was in den Commit kommt.", "erklaerung": "Arbeitsverzeichnis → Staging (add) → Repository (commit) → Remote (push). git diff --staged zeigt vor dem Commit genau, was hineinkommt.", "schritte": ["Datei bearbeiten", "git status", "git add datei.php", "git diff --staged", "git commit -m \"…\"", "git push"]}, {"id": "lab-git-status", "lektion": "m61-l3", "titel": "Was ist vorgemerkt?", "stufe": 2, "typ": "ausgabe", "aufgabe": "Welche Datei steht nach diesen Befehlen unter „Changes to be committed“?", "sprache": "Bash", "tipp": "a.txt wurde nach dem Commit geändert, aber nicht erneut vorgemerkt.", "erklaerung": "b.txt ist neu und vorgemerkt. a.txt ist „modified“, steht aber unter „Changes not staged for commit“.", "code": "echo \"a\" > a.txt\necho \"b\" > b.txt\ngit add a.txt\ngit commit -m \"a anlegen\"\necho \"mehr\" >> a.txt\ngit add b.txt", "antworten": ["b.txt"]}, {"id": "lab-git-ignore", "lektion": "m61-l5", "titel": "Die verräterische .gitignore", "stufe": 2, "typ": "bug", "aufgabe": "Trotz Eintrag landet die .env im Repository. Welche Zeile hebt den Schutz auf?", "sprache": "Bash", "tipp": "Ein Ausrufezeichen macht eine Ausnahme.", "erklaerung": "!.env nimmt die gerade ausgeschlossene Datei wieder auf. Gemeint war vermutlich !.env.example – und die braucht man nur, wenn ein breiteres Muster sie erfasst.", "code": "/vendor\n/node_modules\n.env\n!.env\n*.log", "fehler": [3], "fix": "!.env.example"}, {"id": "lab-git-branch", "lektion": "m62-l1", "titel": "Neuer Branch", "stufe": 1, "typ": "befehl", "aufgabe": "Lege den Branch feature/merkzettel an und wechsle direkt hinein.", "sprache": "Bash", "tipp": "-c steht für create.", "erklaerung": "git switch -c legt an und wechselt. Die ältere Form git checkout -b funktioniert ebenso.", "antworten": ["git switch -c feature/merkzettel", "git checkout -b feature/merkzettel"]}, {"id": "lab-git-konflikt", "lektion": "m62-l3", "titel": "Konflikt lösen", "stufe": 2, "typ": "ordnen", "aufgabe": "Ein Merge meldet einen Konflikt. Bringe die Schritte zur Lösung in die richtige Reihenfolge.", "sprache": "Bash", "tipp": "Git weiß erst nach git add, dass der Konflikt gelöst ist.", "erklaerung": "Erst finden und verstehen, dann lösen und vormerken, dann den Merge mit commit abschließen. Tests danach, weil auch konfliktfreie Zusammenführungen Fehler erzeugen können.", "schritte": ["git status – betroffene Dateien finden", "Datei öffnen und beide Versionen verstehen", "Endzustand herstellen und alle Konfliktmarker entfernen", "git add datei.php", "git commit", "Tests laufen lassen"]}, {"id": "lab-git-abort", "lektion": "m62-l3", "titel": "Notausgang beim Merge", "stufe": 1, "typ": "befehl", "aufgabe": "Der Merge ist zu unübersichtlich. Brich ihn komplett ab und stelle den Zustand vorher wieder her.", "sprache": "Bash", "tipp": "Der Befehl gehört zu merge.", "erklaerung": "git merge --abort setzt alles auf den Stand vor dem Merge zurück.", "antworten": ["git merge --abort"]}, {"id": "lab-git-lease", "lektion": "m62-l4", "titel": "Sicher überschreiben", "stufe": 2, "typ": "befehl", "aufgabe": "Du hast deinen schon gepushten, eigenen Feature-Branch rebased. Pushe so, dass du nie versehentlich fremde Commits überschreibst.", "sprache": "Bash", "tipp": "Nicht --force, sondern die vorsichtige Variante.", "erklaerung": "--force-with-lease verweigert den Push, wenn auf dem Server inzwischen Commits liegen, die du nicht kennst.", "antworten": ["git push --force-with-lease"]}, {"id": "lab-git-stash", "lektion": "m62-l5", "titel": "Kurz beiseitelegen", "stufe": 2, "typ": "befehl", "aufgabe": "Lege alle Änderungen – auch neue, noch nicht verfolgte Dateien – mit der Nachricht „WIP“ beiseite.", "sprache": "Bash", "tipp": "-u nimmt untracked Dateien mit, -m setzt die Nachricht.", "erklaerung": "Ohne -u blieben neue Dateien im Arbeitsverzeichnis liegen. Mit git stash pop holst du alles zurück.", "antworten": ["git stash push -u -m \"WIP\"", "git stash -u -m \"WIP\"", "git stash push --include-untracked -m \"WIP\"", "git stash push -m \"WIP\" -u"]}, {"id": "lab-git-upstream", "lektion": "m63-l1", "titel": "Der erste Push", "stufe": 1, "typ": "befehl", "aufgabe": "Pushe den neuen Branch feature/merkzettel zum ersten Mal nach origin und merke dir den Upstream.", "sprache": "Bash", "tipp": "u steht für upstream.", "erklaerung": "Mit -u verknüpft Git den lokalen Branch mit origin/feature/merkzettel. Danach genügt ein einfaches git push.", "antworten": ["git push -u origin feature/merkzettel", "git push --set-upstream origin feature/merkzettel"]}, {"id": "lab-git-semver", "lektion": "m63-l4", "titel": "Die nächste Versionsnummer", "stufe": 1, "typ": "ausgabe", "aufgabe": "Die aktuelle Version ist 2.3.1. Ihr veröffentlicht eine neue, rückwärtskompatible Funktion. Welche Version folgt?", "sprache": "Changelog", "tipp": "Neue Funktion ohne Bruch: mittlere Stelle.", "erklaerung": "MINOR wird erhöht, PATCH auf 0 zurückgesetzt: 2.4.0.", "code": "## [2.3.1] - 2026-09-30\n### Behoben\n- Rundung der MwSt im Warenkorb\n\n## [?.?.?] - 2026-10-09\n### Hinzugefuegt\n- Merkzettel fuer Kunden", "antworten": ["2.4.0", "v2.4.0"]}, {"id": "lab-git-revert", "lektion": "m64-l1", "titel": "Produktion retten", "stufe": 2, "typ": "befehl", "aufgabe": "Commit 9a1e2f3 ist schon gepusht und verursacht einen Fehler. Mache ihn rückgängig, ohne die Geschichte umzuschreiben.", "sprache": "Bash", "tipp": "Nicht reset – das ist nur für lokale Commits.", "erklaerung": "git revert erzeugt einen neuen Commit, der die Änderungen umkehrt. Alle anderen können ihn normal holen.", "antworten": ["git revert 9a1e2f3"]}, {"id": "lab-git-unstage", "lektion": "m64-l1", "titel": "Falsch vorgemerkt", "stufe": 1, "typ": "befehl", "aufgabe": "Du hast .env versehentlich mit git add vorgemerkt. Nimm sie aus dem Staging, ohne die Datei zu verändern.", "sprache": "Bash", "tipp": "Der moderne Befehl heißt restore.", "erklaerung": "git restore --staged nimmt die Datei aus dem Staging, der Inhalt bleibt unverändert.", "antworten": ["git restore --staged .env", "git reset .env", "git reset HEAD .env", "git reset -- .env"]}, {"id": "lab-git-reflog", "lektion": "m64-l2", "titel": "Verlorene Commits zurückholen", "stufe": 2, "typ": "luecke", "aufgabe": "Nach einem reset --hard fehlen Commits. Zeige die HEAD-Geschichte an und setze einen Branch auf den Stand vorher.", "sprache": "Bash", "tipp": "Der Stand vor dem Reset ist der Eintrag direkt darunter.", "erklaerung": "git reflog zeigt jede Bewegung von HEAD. HEAD@{1} (oder der Hash 8f4e2c1) ist der Stand vor dem Reset.", "code": "git [[0]]\n# 3c1d2ab HEAD@{0}: reset: moving to HEAD~3\n# 8f4e2c1 HEAD@{1}: commit: feat(merkzettel): Uebernahme beim Login\n\ngit branch rettung [[1]]", "antworten": [["reflog"], ["HEAD@{1}", "8f4e2c1"]]}, {"id": "lab-git-bisect", "lektion": "m64-l3", "titel": "Den Fehler einkreisen", "stufe": 3, "typ": "ordnen", "aufgabe": "Bringe die Schritte einer automatisierten Fehlersuche mit bisect in die richtige Reihenfolge.", "sprache": "Bash", "tipp": "Erst die Grenzen festlegen: schlecht jetzt, gut damals.", "erklaerung": "Nach start markierst du den kaputten und einen guten Stand. bisect run halbiert automatisch, bis der erste fehlerhafte Commit feststeht. reset bringt dich zurück.", "schritte": ["git bisect start", "git bisect bad", "git bisect good v1.4.0", "git bisect run php artisan test --filter=VersandTest", "Den gemeldeten ersten fehlerhaften Commit ansehen", "git bisect reset"]}, {"id": "lab-git-hooks", "lektion": "m64-l4", "titel": "Hooks fürs ganze Team", "stufe": 2, "typ": "befehl", "aufgabe": "Die Hooks liegen versioniert im Ordner .githooks. Sorge dafür, dass Git sie in diesem Repository verwendet.", "sprache": "Bash", "tipp": "Die Einstellung gehört zum Bereich core.", "erklaerung": "core.hooksPath zeigt Git, wo die Hooks liegen. .git/hooks selbst wird nicht versioniert.", "antworten": ["git config core.hooksPath .githooks"]}, {"id": "lab-git-composer", "lektion": "m64-l5", "titel": "Nach dem Pull", "stufe": 1, "typ": "befehl", "aufgabe": "Nach git pull hat sich composer.lock geändert. Welcher Befehl bringt vendor/ auf genau diesen Stand?", "sprache": "Bash", "tipp": "update würde neue Versionen suchen.", "erklaerung": "composer install installiert exakt die Versionen aus composer.lock.", "antworten": ["composer install"]}, {"id": "lab-git-begriffe", "lektion": "m65-l1", "titel": "Begriffe zuordnen", "stufe": 1, "typ": "luecke", "aufgabe": "Setze die passenden Git-Fachbegriffe ein.", "sprache": "Text", "tipp": "Arbeitsverzeichnis → … → Repository.", "erklaerung": "git add merkt im Staging-Bereich (Index) vor. HEAD ist der Zeiger auf deine aktuelle Position. Ein entferntes Repository heißt Remote, sein Standardname ist origin.", "code": "Mit \"git add\" landet eine Aenderung im [[0]]-Bereich.\n[[1]] zeigt auf den Branch, an dem du gerade arbeitest.\nEin entferntes Repository, z. B. auf GitHub, heisst [[2]].", "antworten": [["Staging", "Staging-Bereich", "Index"], ["HEAD"], ["Remote", "origin"]]}, {"id": "lab-prog-begriffe", "lektion": "m65-l3", "titel": "Fachsprache im Team", "stufe": 2, "typ": "luecke", "aufgabe": "Ergänze die Fachbegriffe aus dem Teamalltag.", "sprache": "Text", "tipp": "Der dritte Begriff kam schon bei Jobs und Webhooks vor.", "erklaerung": "Breaking Changes erhöhen die MAJOR-Version. Technische Schulden müssen irgendwann „zurückgezahlt“ werden. Idempotente Jobs und Webhooks richten bei Wiederholung keinen Schaden an.", "code": "Eine Aenderung, die Nutzer zwingt, ihren Code anzupassen: [[0]] Change.\nSchnelle, unsaubere Loesungen mit spaeteren Folgekosten: technische [[1]].\nMehrfach ausgefuehrt mit demselben Ergebnis wie einmal: [[2]].", "antworten": [["Breaking"], ["Schulden"], ["idempotent"]]}, {"id": "lab-git-detached", "lektion": "m65-l5", "titel": "Detached HEAD verlassen", "stufe": 1, "typ": "befehl", "aufgabe": "git status meldet „HEAD detached at 3c1d2ab“. Kehre zurück auf den Branch main.", "sprache": "Bash", "tipp": "Einfach auf den Branch wechseln.", "erklaerung": "git switch main setzt HEAD wieder auf den Branch. Willst du Commits aus dem detached-Zustand behalten, lege vorher mit git switch -c einen Branch an.", "antworten": ["git switch main", "git checkout main"]}, {"id": "lab-git-behind", "lektion": "m65-l5", "titel": "Hinter dem Server", "stufe": 1, "typ": "befehl", "aufgabe": "„Your branch is behind origin/main by 3 commits, and can be fast-forwarded.“ Hol dir die neuen Commits.", "sprache": "Bash", "tipp": "Holen und zusammenführen in einem Befehl.", "erklaerung": "git pull holt die drei Commits und führt sie per Fast-Forward in deinen Branch – ohne Merge-Commit, weil du lokal nichts Neues hast.", "antworten": ["git pull", "git pull origin main", "git pull --ff-only", "git merge origin/main"]}, {"id": "lab-git-intern", "lektion": "m65-l4", "titel": "Ein Blick ins .git", "stufe": 2, "typ": "ausgabe", "aufgabe": "Welchen Objekttyp gibt dieser Befehl für den Hash eines Commits aus?", "sprache": "Bash", "tipp": "Es gibt drei Objekttypen: blob, tree und …", "erklaerung": "-t zeigt den Typ. Ein Commit-Objekt verweist auf einen Tree, der wiederum auf Blobs (Dateiinhalte) verweist.", "code": "git cat-file -t 3c1d2ab", "antworten": ["commit"]}, {"id": "lab-boss-api", "lektion": "m48-l1", "titel": "Boss: API-Review", "stufe": 4, "typ": "bug", "aufgabe": "Code-Review einer API-Methode. Markiere ALLE drei problematischen Zeilen.", "sprache": "PHP · Laravel", "tipp": "Rechte und Felder beim Speichern, Daten im Log, Daten in der Antwort.", "erklaerung": "Zeile 4: ungeprüfte Felder und keine Rechteprüfung. Zeile 5: der komplette Request landet im Log – samt möglicher personenbezogener Daten. Zeile 7: das Model geht ungefiltert hinaus; eine API Resource legt fest, welche Felder öffentlich sind.", "code": "<?php\npublic function update(Request $request, Produkt $produkt)\n{\n    $produkt->update($request->all());\n    Log::info('Update', ['user' => $request->user()->id, 'daten' => $request->all()]);\n    $produkt->load('kategorie');\n    return response()->json($produkt);\n}", "fehler": [3, 4, 6], "fix": "public function update(ProduktUpdateRequest $request, Produkt $produkt)\n{\n    Gate::authorize('update', $produkt);\n    $produkt->update($request->validated());\n    Log::info('Produkt aktualisiert', ['user' => $request->user()->id, 'produkt' => $produkt->id]);\n    return new ProduktResource($produkt->load('kategorie'));\n}"}, {"id": "lab-boss-git", "lektion": "m64-l2", "titel": "Boss: Die Git-Rettung", "stufe": 4, "typ": "ordnen", "aufgabe": "Freitag, 17 Uhr: Nach einem reset --hard sind drei Commits mit einem dringenden Fix weg. Rette sie und bring sie sicher ins Review.", "sprache": "Bash", "tipp": "Erst finden, dann einen Zeiger setzen, dann prüfen, dann teilen.", "erklaerung": "Das Reflog kennt den Stand vor dem Reset. Ein neuer Branch sichert ihn, die Tests bestätigen, dass der Fix funktioniert, und erst dann geht er per Pull Request ins Team.", "schritte": ["git reflog", "git branch rettung HEAD@{1}", "git switch rettung", "php artisan test", "git push -u origin rettung", "Pull Request öffnen"]}].forEach(function(t){
  if(LAB_BY_ID[t.id]) return;
  if(t.typ === 'befehl') t.terminal = true;
  LABOR.push(t); LAB_BY_ID[t.id] = t;
});
var QUESTS = [{"id": "q-php-start", "icon": "🌱", "titel": "Erste Schritte in PHP", "text": "Strings, Zahlen, Wahrheitswerte und Schleifen sicher beherrschen.", "aufgaben": ["lab-p2-strings", "lab-p2-division", "lab-p2-wahrheit", "lab-p2-schleife", "lab-p2-guard", "lab-php-vergleich"], "xp": 100}, {"id": "q-daten", "icon": "🗃️", "titel": "Datenprofi", "text": "Arrays, Texte, Datum, JSON und Generatoren ohne Fallstricke.", "aufgaben": ["lab-p2-arrays", "lab-p2-sort", "lab-p2-mb", "lab-p2-datum", "lab-p2-json", "lab-p2-generator"], "xp": 120}, {"id": "q-sicher", "icon": "🔐", "titel": "Sicher im Web", "text": "XSS, SQL-Injection, Path Traversal, Mass Assignment – finde und schließe jede Lücke.", "aufgaben": ["lab-web-xss", "lab-web-sqli", "lab-web-login", "lab-p2-pfad", "lab-lv-blade", "lab-el-mass", "lab-auth-policy", "lab-lv2-webhook"], "xp": 200}, {"id": "q-eloquent", "icon": "🧬", "titel": "Eloquent-Meister", "text": "Migrationen, Beziehungen, Abfragen und Casts wie ein Profi.", "aufgaben": ["lab-el-migration", "lab-el-relationen", "lab-el-nplus1", "lab-lv2-wherehas", "lab-lv2-cast", "lab-lv2-morph"], "xp": 150}, {"id": "q-api", "icon": "🛰️", "titel": "API-Architekt", "text": "Statuscodes, Tokens, HTTP-Client, Webhooks und Echtzeit.", "aufgaben": ["lab-api-status", "lab-api-token", "lab-lv2-http", "lab-lv2-webhook", "lab-arch-container", "lab-lv2-broadcast"], "xp": 180}, {"id": "q-git", "icon": "🌿", "titel": "Git-Profi", "text": "Vom ersten Commit über Konflikte bis zur Rettung verlorener Arbeit.", "aufgaben": ["lab-git-begriffe", "lab-git-config", "lab-git-status", "lab-git-branch", "lab-git-konflikt", "lab-git-upstream", "lab-git-revert", "lab-git-reflog", "lab-git-bisect"], "xp": 200}, {"id": "q-release", "icon": "🚀", "titel": "Release-Tag", "text": "Testen, prüfen, versionieren, ausliefern.", "aufgaben": ["lab-test-fremd", "lab-test-fake", "lab-lv2-audit", "lab-lv2-meilenstein", "lab-git-semver", "lab-q-deploy"], "xp": 200}, {"id": "q-boss", "icon": "👑", "titel": "Endgegner", "text": "Drei Bosse: Security-Review, API-Review und die Git-Rettung.", "aufgaben": ["lab-boss-review", "lab-boss-api", "lab-boss-git"], "xp": 300}];
LAB_TYPEN.befehl = 'Terminal';

/* ---------- Terminal-Aufgaben: als „ausgabe“ pruefen, als Konsole zeigen ---------- */
var labHtmlBasis = labAufgabeHtml;
labAufgabeHtml = function(t){
  if(!t.terminal) return labHtmlBasis(t);
  var kopie = Object.assign({}, t, { typ:'ausgabe', code:'' });
  var h = labHtmlBasis(kopie);
  h = h.replace('<span class="lab-chip typ">' + LAB_TYPEN.ausgabe + '</span>', '<span class="lab-chip typ">Terminal</span>');
  h = h.replace('<div class="lab-code"><pre></pre></div>',
    '<div class="lab-terminal"><div class="lab-term-kopf"><i></i><i></i><i></i><span>zsh · ~/shop</span></div>' +
    '<div class="lab-term-zeile"><span class="lab-prompt">~/shop <b>(main)</b> $</span>');
  h = h.replace(/(<input class="lab-eingabe"[^>]*>)/, '$1</div></div>');
  h = h.replace('placeholder="Deine Antwort …"', 'placeholder="Befehl eingeben …"');
  return h;
};
function labMitTyp(id, fn){
  var t = LAB_BY_ID[id];
  if(!t || !t.terminal) return fn(id);
  t.typ = 'ausgabe';
  try{ return fn(id); } finally { t.typ = 'befehl'; }
}
var labPruefenBasis = labPruefen;
labPruefen = function(id){ return labMitTyp(id, labPruefenBasis); };
var labAufdeckenBasis = labAufdecken;
labAufdecken = function(id){ return labMitTyp(id, labAufdeckenBasis); };

/* ---------- Bereiche und Entwickler-Titel ---------- */
var RB_BEREICHE = {
  php:     ['m52', 'm42', 'm53', 'm43', 'm54', 'm44', 'm55'],
  laravel: ['m45', 'm46', 'm47', 'm56', 'm57', 'm58', 'm48', 'm49', 'm59', 'm50', 'm51', 'm60'],
  git:     ['m61', 'm65', 'm62', 'm63', 'm64']
};
function rbModulVon(lektionId){ return (lektionId || '').split('-')[0]; }
LAB_TRACKS = [
  { name:'AP1-Basics', wer:function(t){ var m = rbModulVon(t.lektion); return [].concat(RB_BEREICHE.php, RB_BEREICHE.laravel, RB_BEREICHE.git).indexOf(m) < 0; } },
  { name:'PHP',        wer:function(t){ return t.stufe < 4 && RB_BEREICHE.php.indexOf(rbModulVon(t.lektion)) >= 0; } },
  { name:'Laravel',    wer:function(t){ return t.stufe < 4 && RB_BEREICHE.laravel.indexOf(rbModulVon(t.lektion)) >= 0; } },
  { name:'Git',        wer:function(t){ return t.stufe < 4 && RB_BEREICHE.git.indexOf(rbModulVon(t.lektion)) >= 0; } },
  { name:'Bosse',      wer:function(t){ return t.stufe === 4; } }
];

var RB_TITEL = [
  [0, '🎒', 'Praktikant'], [120, '🌱', 'Junior Developer'], [400, '💻', 'Developer'],
  [900, '🧠', 'Senior Developer'], [1600, '🧭', 'Lead Developer'], [2500, '🏛️', 'Software-Architekt']
];
function labXpVerdient(){
  return LABOR.filter(function(t){ return labGeloest(t.id); }).reduce(function(a, t){ return a + LAB_XP[t.stufe]; }, 0);
}
function labTitel(){
  var xp = labXpVerdient(), i = 0;
  while(i + 1 < RB_TITEL.length && xp >= RB_TITEL[i + 1][0]) i++;
  return { xp:xp, jetzt:RB_TITEL[i], naechster:RB_TITEL[i + 1] || null };
}

/* ---------- Quests ---------- */
function questStand(q){
  var fertig = q.aufgaben.filter(labGeloest).length;
  return { fertig:fertig, gesamt:q.aufgaben.length, voll:fertig === q.aufgaben.length,
           naechste:q.aufgaben.filter(function(id){ return !labGeloest(id); })[0] || null };
}

/* ---------- Abzeichen ---------- */
QUESTS.forEach(function(q){
  var id = 'quest_' + q.id.replace(/^q-/, '');
  if(!BADGE_BY_ID[id]){ var b = { id:id, icon:q.icon, name:'Quest: ' + q.titel, desc:q.text }; BADGES.push(b); BADGE_BY_ID[id] = b; }
});
[
  { id:'blitz5',          icon:'⚡', name:'Speedrunner',        desc:'Eine Blitzrunde mit 5 von 5 Aufgaben geschafft.' },
  { id:'sterne10',        icon:'🌟', name:'Sternenjäger',       desc:'Zehn Module mit voller Meisterschaft.' },
  { id:'meister_php',     icon:'🐘', name:'PHP-Gelehrter',      desc:'Alle Lektionen der PHP-Module abgeschlossen.' },
  { id:'meister_laravel', icon:'🎼', name:'Laravel-Artisan',    desc:'Alle Lektionen der Laravel-Module abgeschlossen.' },
  { id:'meister_git',     icon:'🌿', name:'Commit-Meister',     desc:'Alle Lektionen des Git-Teils abgeschlossen.' }
].forEach(function(b){ if(!BADGE_BY_ID[b.id]){ BADGES.push(b); BADGE_BY_ID[b.id] = b; } });

function rbBereichFertig(liste){
  return liste.every(function(mid){
    var m = MODULES.find(function(x){ return x.id === mid; });
    return m && m.lessons.every(function(l){ return state.completed.has(l.id); });
  });
}
function rbMeisterschaftPruefen(){
  if(rbBereichFertig(RB_BEREICHE.php)) grantBadge('meister_php');
  if(rbBereichFertig(RB_BEREICHE.laravel)) grantBadge('meister_laravel');
  if(rbBereichFertig(RB_BEREICHE.git)) grantBadge('meister_git');
  var voll = MODULES.filter(function(m){ var s = rbSterne(m); return s.max > 0 && s.n === s.max; }).length;
  if(voll >= 10) grantBadge('sterne10');
}

var labAbzeichenBasis = labAbzeichenPruefen;
labAbzeichenPruefen = function(){
  labAbzeichenBasis();
  QUESTS.forEach(function(q){
    if(!questStand(q).voll || state.xpLog['quest:' + q.id]) return;
    awardXp(q.xp, 'Quest abgeschlossen: ' + q.titel, 'quest:' + q.id);
    grantBadge('quest_' + q.id.replace(/^q-/, ''));
  });
};

/* ---------- Modul-Meisterschaft (bis zu drei Sterne) ---------- */
function rbSterne(m){
  var lektionen = m.lessons.every(function(l){ return state.completed.has(l.id); });
  var karten = [];
  m.lessons.forEach(function(l){ (l.quiz || []).forEach(function(q, i){ karten.push(typeof rpQuestionId==='function'?rpQuestionId(l,i):l.id + '#' + i); }); });
  var quiz = karten.length > 0 && karten.every(function(id){ var st = state.stats[id]; return st && st.right > 0; });
  var ids = m.lessons.map(function(l){ return l.id; });
  var aufgaben = LABOR.filter(function(t){ return ids.indexOf(t.lektion) >= 0; });
  var labor = aufgaben.length > 0 && aufgaben.every(function(t){ return labGeloest(t.id); });
  var max = aufgaben.length ? 3 : 2;
  return { n:(lektionen ? 1 : 0) + (quiz ? 1 : 0) + (labor ? 1 : 0), max:max,
           text:'Lektionen ' + (lektionen ? '✓' : '–') + ' · Kurz-Checks ' + (quiz ? '✓' : '–') + (aufgaben.length ? ' · Laboraufgaben ' + (labor ? '✓' : '–') : '') };
}
function rbSterneHtml(m){
  var s = rbSterne(m), h = '';
  for(var i = 0; i < s.max; i++) h += i < s.n ? '<b>★</b>' : '☆';
  return '<span class="rb-sterne" title="Meisterschaft: ' + s.text + '" aria-label="' + s.n + ' von ' + s.max + ' Sternen">' + h + '</span>';
}
function rbSterneZeichnen(){
  var dets = document.querySelectorAll('#moduleNav details.module');
  dets.forEach(function(d, i){
    var m = MODULES[i], sum = d.querySelector('summary');
    if(!m || !sum) return;
    var alt = sum.querySelector('.rb-sterne');
    if(alt) alt.remove();
    var zahl = sum.querySelector('.mod-count');
    var tmp = document.createElement('span'); tmp.innerHTML = rbSterneHtml(m);
    sum.insertBefore(tmp.firstChild, zahl);
  });
  document.querySelectorAll('#content .module-card').forEach(function(k){
    if(k.querySelector('.rb-sterne')) return;
    var treffer = /selectLesson\('([^']+)'\)/.exec(k.getAttribute('onclick') || '');
    var m = treffer && moduleOfLesson(treffer[1]);
    if(m) k.insertAdjacentHTML('beforeend', rbSterneHtml(m));
  });
}

/* ---------- Blitzrunde ---------- */
lab.blitz = null;
function blitzStart(){
  var pool = LABOR.filter(function(t){ return t.stufe <= 2 && ['ausgabe', 'luecke', 'befehl', 'bug'].indexOf(t.typ) >= 0; });
  var ids = pool.map(function(t){ return t.id; }).sort(function(){ return Math.random() - 0.5; }).slice(0, 5);
  lab.blitz = { ids:ids, idx:0, ergebnis:ids.map(function(){ return ''; }), ende:Date.now() + 180000, fertig:false, timer:null };
  ids.forEach(function(id){ delete lab.sitzung[id]; });
  lab.blitz.timer = setInterval(blitzTick, 250);
  renderContent();
}
function blitzTick(){
  var b = lab.blitz;
  if(!b || b.fertig) return;
  if(state.currentId !== 'labor'){ clearInterval(b.timer); lab.blitz = null; return; }
  var rest = Math.max(0, b.ende - Date.now());
  var el = document.getElementById('blitzUhr');
  if(el){
    var s = Math.ceil(rest / 1000);
    el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    el.className = 'uhr' + (s <= 30 ? ' knapp' : '');
  }
  if(rest <= 0) blitzEnde();
}
function blitzWeiter(art){
  var b = lab.blitz;
  if(!b || b.fertig) return;
  b.ergebnis[b.idx] = art;
  b.idx++;
  if(b.idx >= b.ids.length) blitzEnde(); else renderContent();
}
function blitzEnde(){
  var b = lab.blitz;
  if(!b || b.fertig) return;
  b.fertig = true;
  clearInterval(b.timer);
  var richtig = b.ergebnis.filter(function(e){ return e === 'ok'; }).length;
  var restSek = Math.max(0, Math.round((b.ende - Date.now()) / 1000));
  b.punkte = richtig * 100 + (richtig === b.ids.length ? restSek * 2 : 0);
  b.rekord = b.punkte > (state.xpLog['blitz:best'] || 0);
  if(b.rekord) state.xpLog['blitz:best'] = b.punkte;
  if(richtig) awardXp(richtig * 8 + (richtig === b.ids.length ? 20 : 0), 'Blitzrunde: ' + richtig + '/' + b.ids.length, 'blitz:' + todayKey());
  if(richtig === b.ids.length) grantBadge('blitz5');
  saveProgress();
  renderContent();
}
var labGeschafftBasis = labGeschafft;
labGeschafft = function(t, st){
  labGeschafftBasis(t, st);
  var b = lab.blitz;
  if(b && !b.fertig && b.ids[b.idx] === t.id){ setTimeout(function(){ blitzWeiter('ok'); }, 900); }
};
function blitzHtml(){
  var b = lab.blitz;
  if(b.fertig){
    var richtig = b.ergebnis.filter(function(e){ return e === 'ok'; }).length;
    return '<div class="lab-blitz-ergebnis"><div class="lab-abschnitt" style="margin-top:0">Blitzrunde beendet</div>' +
      '<div class="gross">' + richtig + ' / ' + b.ids.length + '</div>' +
      '<p>' + b.punkte + ' Punkte' + (b.rekord ? ' – <strong>neuer Rekord!</strong>' : ' · Rekord: ' + (state.xpLog['blitz:best'] || 0)) + '</p>' +
      '<div class="lab-aktionen" style="justify-content:center">' +
      '<button class="start-btn" type="button" onclick="blitzStart()">Nochmal</button>' +
      '<button class="start-btn ghost" type="button" onclick="lab.blitz=null;renderContent()">Zurück zum Labor</button></div></div>';
  }
  var rest = Math.max(0, Math.ceil((b.ende - Date.now()) / 1000));
  var h = '<div class="lab-blitz-leiste"><span class="uhr" id="blitzUhr">' + Math.floor(rest / 60) + ':' + String(rest % 60).padStart(2, '0') + '</span>' +
    '<div class="fort">' + b.ids.map(function(id, i){
      return '<i class="' + (b.ergebnis[i] || (i === b.idx ? 'jetzt' : '')) + '"></i>'; }).join('') + '</div>' +
    '<span class="punkte">✓ ' + b.ergebnis.filter(function(e){ return e === 'ok'; }).length + '</span>' +
    '<button class="ex-btn" type="button" onclick="blitzWeiter(\'skip\')">Überspringen</button>' +
    '<button class="ex-btn" type="button" onclick="blitzEnde()">Beenden</button></div>';
  return h + labAufgabeHtml(LAB_BY_ID[b.ids[b.idx]]);
}

/* ---------- Labor-Seite neu ---------- */
var labHudBasis = labHudHtml;
renderLabor = function(){
  if(lab.blitz) return '<div class="breadcrumb">Training · Code-Labor</div><h1>Blitzrunde</h1>' + blitzHtml();
  var kata = labKata(), kataFertig = !!state.xpLog['kata:' + labHeute()], tit = labTitel();
  var h = '<div class="breadcrumb">Training</div><h1>Code-Labor</h1>' +
    '<p class="intro-sub">' + LABOR.length + ' praktische Aufgaben vom AP1-Pseudocode über PHP und Laravel bis Git: Ausgaben vorhersagen, ' +
    'Lücken füllen, Bugs jagen, Abläufe ordnen und Befehle im Terminal tippen. Fehlerfrei gibt es 1,5-fache XP, fehlerfreie Serien erhöhen ' +
    'die Combo, ein Tipp halbiert die XP. Quests bündeln Aufgaben zu Zielen mit Bonus.</p>';

  h += '<div class="lab-titel"><span class="t-icon">' + tit.jetzt[1] + '</span><div class="t-mitte"><div class="t-name">' + tit.jetzt[2] + '</div>' +
       '<div class="t-sub">' + tit.xp + ' Labor-XP' + (tit.naechster ? ' · noch ' + (tit.naechster[0] - tit.xp) + ' bis „' + tit.naechster[2] + '“' : ' · höchster Titel erreicht') + '</div>' +
       '<div class="t-bahn"><i style="width:' + (tit.naechster ? Math.round((tit.xp - tit.jetzt[0]) / (tit.naechster[0] - tit.jetzt[0]) * 100) : 100) + '%"></i></div></div></div>';
  h += labHudBasis();

  h += '<div class="lab-kata-karte"><span class="k-icon">🥋</span><div class="k-text"><div class="k-titel">Daily Dojo: ' + esc(kata.titel) + '</div>' +
       '<div class="k-sub">' + (kataFertig ? 'Heute erledigt – morgen wartet die nächste.' : 'Heute doppelte XP · ' + LAB_STUFEN[kata.stufe] + ' · ' + LAB_TYPEN[kata.typ]) + '</div></div>' +
       '<button class="start-btn" type="button" onclick="labOeffnen(\'' + kata.id + '\')">' + (kataFertig ? 'Ansehen' : 'Dojo betreten') + '</button></div>';

  h += '<div class="lab-blitz-start"><span style="font-size:1.6rem">⚡</span><div class="b-text"><div class="b-titel">Blitzrunde</div>' +
       '<div class="b-sub">5 zufällige Aufgaben, 3 Minuten. Rekord: ' + (state.xpLog['blitz:best'] || 0) + ' Punkte' +
       (state.xpLog['blitz:' + todayKey()] ? ' · heutige XP schon kassiert' : ' · einmal täglich XP') + '</div></div>' +
       '<button class="start-btn ghost" type="button" onclick="blitzStart()">Starten</button></div>';

  h += '<div class="lab-abschnitt">Quests</div><div class="lab-quests">' + QUESTS.map(function(q){
    var st = questStand(q), n = st.naechste && LAB_BY_ID[st.naechste];
    return '<div class="lab-quest' + (st.voll ? ' fertig' : '') + '"><div class="q-kopf"><span class="q-icon">' + q.icon + '</span>' +
      '<span class="q-titel">' + esc(q.titel) + '</span></div><div class="q-text">' + esc(q.text) + '</div>' +
      '<div class="q-bahn"><i style="width:' + Math.round(st.fertig / st.gesamt * 100) + '%"></i></div>' +
      '<div class="q-fuss"><span>' + st.fertig + '/' + st.gesamt + ' · +' + xpAnzeige(q.xp) + ' XP</span>' +
      (st.voll ? '<span style="color:var(--success)">✓ geschafft</span>' :
       '<button class="ex-btn q-weiter" type="button" onclick="labOeffnen(\'' + st.naechste + '\')" title="' + esc(n ? n.titel : '') + '">Weiter</button>') +
      '</div></div>';
  }).join('') + '</div>';

  h += '<div class="lab-abschnitt">Fortschritt nach Bereich</div><div class="lab-tracks">' + LAB_TRACKS.map(function(tr){
    var alle = LABOR.filter(tr.wer), fertig = alle.filter(function(t){ return labGeloest(t.id); }).length;
    var pct = alle.length ? Math.round(fertig / alle.length * 100) : 0;
    return '<div class="lab-track' + (alle.length && fertig === alle.length ? ' fertig' : '') + '"><div class="t-name">' + tr.name + '</div>' +
           '<div class="t-zahl">' + fertig + ' / ' + alle.length + ' gelöst</div><div class="bahn"><i style="width:' + pct + '%"></i></div></div>';
  }).join('') + '</div>';

  h += '<div class="lab-filter">' + [['alle','Alle'],['offen','Offen'],['ausgabe','Ausgabe'],['luecke','Lückentext'],['bug','Bug-Jagd'],['ordnen','Reihenfolge'],['befehl','Terminal']]
    .map(function(f){ return '<button class="filter-btn' + (lab.filter === f[0] ? ' active' : '') + '" onclick="labFilter(\'' + f[0] + '\')">' + f[1] + '</button>'; }).join('') + '</div>';

  var liste = LABOR.filter(function(t){
    if(lab.filter === 'offen') return !labGeloest(t.id);
    if(lab.filter !== 'alle') return t.typ === lab.filter;
    return true;
  });
  [1, 2, 3, 4].forEach(function(stufe){
    var gruppe = liste.filter(function(t){ return t.stufe === stufe; });
    if(!gruppe.length) return;
    h += '<div class="lab-liste-gruppe">' + LAB_STUFEN[stufe] + ' · ' + gruppe.length + '</div>';
    gruppe.forEach(function(t){
      if(lab.offen === t.id){ h += labAufgabeHtml(t); return; }
      var m = moduleOfLesson(t.lektion);
      h += '<button class="lab-mini' + (labGeloest(t.id) ? ' geloest' : '') + '" type="button" onclick="labOeffnen(\'' + t.id + '\')">' +
           '<span class="m-status">' + (labGeloest(t.id) ? '✓' : '') + '</span><span>' + esc(t.titel) +
           (m ? ' <span style="color:var(--text-dim);font-size:.8rem;">· ' + esc(m.title) + '</span>' : '') + '</span>' +
           '<span class="m-typ">' + LAB_TYPEN[t.typ] + ' · +' + xpAnzeige(LAB_XP[t.stufe]) + '</span></button>';
    });
  });
  return h;
};

/* ---------- Spickzettel: PHP, Laravel, Git ---------- */
CHEATSHEET_HTML +=
  '<div class="sheet-section"><h2>PHP &ndash; die Stolperfallen</h2><table class="lesson-table"><tr><th>Thema</th><th>Merke</th></tr>' +
  '<tr><td>Vergleich</td><td>immer <code>===</code> / <code>!==</code>; <code>declare(strict_types=1);</code> in jede Datei</td></tr>' +
  '<tr><td>false-Werte</td><td><code>false 0 0.0 "" "0" [] null</code> &ndash; aber <code>"0.0"</code> und <code>" "</code> sind true</td></tr>' +
  '<tr><td>Strings</td><td><code>\'…\'</code> wörtlich, <code>"…$x"</code> ersetzt; verbinden mit <code>.</code>; UTF-8 mit <code>mb_*</code></td></tr>' +
  '<tr><td>Rechnen</td><td><code>10/4 = 2.5</code>, <code>intdiv(10,4) = 2</code>, Geld in Cent als int</td></tr>' +
  '<tr><td>Arrays</td><td><code>sort</code> gibt true zurück; <code>array_filter</code> behält Schlüssel &rarr; <code>array_values</code></td></tr>' +
  '<tr><td>Datum</td><td><code>DateTimeImmutable</code>; speichern in UTC; <code>31.01. +1 month = 03.03.</code></td></tr>' +
  '<tr><td>JSON</td><td><code>json_decode($s, true, 512, JSON_THROW_ON_ERROR)</code></td></tr>' +
  '<tr><td>Sicherheit</td><td>Ausgabe: <code>htmlspecialchars</code> &middot; SQL: Prepared Statements &middot; Passwort: <code>password_hash</code></td></tr></table></div>' +
  '<div class="sheet-section"><h2>Laravel &ndash; Artisan und Muster</h2><table class="lesson-table"><tr><th>Befehl / Muster</th><th>Zweck</th></tr>' +
  '<tr><td><code>make:model Name -mfc</code></td><td>Model + Migration + Factory + Controller</td></tr>' +
  '<tr><td><code>migrate</code> &middot; <code>migrate:rollback</code></td><td>Migrationen ausführen / letzten Stapel zurück</td></tr>' +
  '<tr><td><code>make:request</code> &middot; <code>make:policy --model=X</code></td><td>Validierung &middot; Autorisierung</td></tr>' +
  '<tr><td><code>route:list</code> &middot; <code>tinker</code></td><td>Routen ansehen &middot; interaktive Shell</td></tr>' +
  '<tr><td><code>queue:work</code> &middot; <code>queue:restart</code></td><td>Worker starten &middot; nach Deployment neu starten</td></tr>' +
  '<tr><td><code>optimize</code> &middot; <code>storage:link</code></td><td>Caches für Produktion &middot; öffentliche Dateien</td></tr>' +
  '<tr><td><code>with()</code> &middot; <code>withCount()</code></td><td>N+1 vermeiden</td></tr>' +
  '<tr><td><code>$request-&gt;validated()</code></td><td>nur geprüfte Felder speichern</td></tr>' +
  '<tr><td><code>Gate::authorize(\'update\', $m)</code></td><td>Policy prüfen, sonst 403</td></tr></table></div>' +
  '<div class="sheet-section"><h2>Git &ndash; die wichtigsten Befehle</h2><table class="lesson-table"><tr><th>Befehl</th><th>Zweck</th></tr>' +
  '<tr><td><code>status</code> &middot; <code>diff</code> &middot; <code>diff --staged</code></td><td>Zustand &middot; nicht vorgemerkt &middot; vorgemerkt</td></tr>' +
  '<tr><td><code>add -p</code> &middot; <code>commit -m</code></td><td>Teile vormerken &middot; Schnappschuss</td></tr>' +
  '<tr><td><code>switch -c name</code></td><td>Branch anlegen und wechseln</td></tr>' +
  '<tr><td><code>merge</code> &middot; <code>rebase</code></td><td>zusammenführen &middot; neu aufsetzen (nur eigene Commits!)</td></tr>' +
  '<tr><td><code>push -u origin name</code> &middot; <code>--force-with-lease</code></td><td>erster Push &middot; sicher überschreiben</td></tr>' +
  '<tr><td><code>restore --staged</code> &middot; <code>reset --soft HEAD~1</code></td><td>aus Staging nehmen &middot; Commit auflösen</td></tr>' +
  '<tr><td><code>revert hash</code></td><td>gepushten Commit sicher umkehren</td></tr>' +
  '<tr><td><code>reflog</code> &middot; <code>bisect</code> &middot; <code>log -S</code></td><td>Rettung &middot; Fehlersuche &middot; Text in der Geschichte</td></tr>' +
  '<tr><td><code>tag -a v1.2.0</code></td><td>Release markieren (SemVer)</td></tr></table></div>' +
  '<div class="sheet-section"><h2>Fachbegriffe &ndash; Git und Programmierung</h2><table class="lesson-table"><tr><th>Begriff</th><th>Bedeutung</th></tr>' +
  '<tr><td>Repository</td><td>Projekt plus komplette Geschichte (Ordner <code>.git</code>)</td></tr>' +
  '<tr><td>Staging-Bereich / Index</td><td>Vormerkliste für den nächsten Commit</td></tr>' +
  '<tr><td>Commit &middot; Hash</td><td>Schnappschuss mit Nachricht &middot; seine eindeutige ID</td></tr>' +
  '<tr><td>HEAD &middot; detached HEAD</td><td>woran du gerade arbeitest &middot; HEAD zeigt auf Commit statt Branch</td></tr>' +
  '<tr><td>Branch &middot; Tag</td><td>beweglicher Zeiger &middot; fester Name für ein Release</td></tr>' +
  '<tr><td>Remote &middot; origin &middot; Upstream</td><td>entferntes Repo &middot; sein Standardname &middot; verknüpfter Remote-Branch</td></tr>' +
  '<tr><td>Fetch &middot; Pull &middot; Push</td><td>holen &middot; holen + zusammenführen &middot; hochladen</td></tr>' +
  '<tr><td>Merge &middot; Rebase &middot; Squash</td><td>zusammenführen &middot; neu aufsetzen &middot; Commits zusammenfassen</td></tr>' +
  '<tr><td>Pull Request &middot; Fork</td><td>Bitte um Review und Übernahme &middot; eigene Kopie eines fremden Repos</td></tr>' +
  '<tr><td>Refactoring</td><td>Code umbauen, ohne das Verhalten zu ändern</td></tr>' +
  '<tr><td>Breaking Change &middot; deprecated</td><td>zwingt Nutzer zu Anpassungen &middot; veraltet, wird später entfernt</td></tr>' +
  '<tr><td>Technische Schulden &middot; Legacy-Code</td><td>schnelle Lösungen mit Folgekosten &middot; alter, schwer wartbarer Code</td></tr>' +
  '<tr><td>CI / CD &middot; Deployment</td><td>automatisch testen / ausliefern &middot; Version auf den Server bringen</td></tr>' +
  '<tr><td>Edge Case &middot; Race Condition &middot; idempotent</td><td>Sonderfall &middot; Fehler durch zeitliche Reihenfolge &middot; mehrfach = einmal</td></tr>' +
  '<tr><td>DRY &middot; KISS &middot; YAGNI</td><td>keine Wiederholung &middot; einfach halten &middot; nichts auf Vorrat bauen</td></tr></table></div>';

/* ---------- Suche: Labor, Aufgaben, Quests ---------- */
var buildIndexBasis = buildIndex;
buildIndex = function(){
  buildIndexBasis();
  SEARCH_INDEX.push({ id:'labor', kind:'nav', title:'Code-Labor', sub:'Training · ' + LABOR.length + ' Aufgaben, Quests, Blitzrunde',
                      hay:'code-labor labor aufgaben quests blitzrunde daily dojo kata training praxis' });
  LABOR.forEach(function(t){
    SEARCH_INDEX.push({ id:'labor:' + t.id, kind:'exercise', title:t.titel, sub:'Code-Labor · ' + LAB_TYPEN[t.typ] + ' · ' + LAB_STUFEN[t.stufe],
                        hay:(t.titel + ' ' + t.aufgabe + ' ' + (t.code || '') + ' ' + LAB_TYPEN[t.typ]).toLowerCase() });
  });
};

/* ---------- Ansichten: labor:<id> oeffnet eine Aufgabe ---------- */
var internLabor = renderContentIntern;
renderContentIntern = function(){
  var id = state.currentId || '';
  if(id.indexOf('labor:') === 0){
    lab.offen = id.slice(6);
    state.currentId = 'labor';
    internLabor.apply(this, arguments);
    setTimeout(function(){ var el = document.getElementById('lab-' + lab.offen); if(el) el.scrollIntoView({ block:'start' }); }, 80);
    return;
  }
  return internLabor.apply(this, arguments);
};
window.addEventListener('hashchange', function(){
  var h = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
  if(h.indexOf('labor/') === 0 && LAB_BY_ID[h.slice(6)]) selectLesson('labor:' + h.slice(6));
});

/* ---------- Mobilleiste: Labor ergaenzen ---------- */
var mobilBasis = renderMobilbar;
renderMobilbar = function(){
  mobilBasis();
  var el = document.getElementById('mobilbar');
  if(!el || el.querySelector('[data-labor]')) return;
  var b = document.createElement('button');
  b.className = 'mb' + (state.currentId === 'labor' ? ' aktiv' : '');
  b.setAttribute('data-labor', '1'); b.setAttribute('aria-label', 'Labor');
  b.onclick = function(){ selectLesson('labor'); };
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg><span>Labor</span>';
  el.insertBefore(b, el.children[2] || null);
};

/* ---------- Heute: Daily Dojo einblenden ---------- */
function rbHeuteKata(el){
  if(state.currentId !== 'heute' || el.querySelector('.rb-heute-kata')) return;
  var kopf = el.querySelector('.heute-kopf');
  if(!kopf) return;
  var k = labKata(), fertig = !!state.xpLog['kata:' + labHeute()];
  kopf.insertAdjacentHTML('afterend', '<div class="rb-heute-kata"><span style="font-size:1.6rem">🥋</span><div class="k-text">' +
    '<div class="k-titel">Daily Dojo: ' + esc(k.titel) + '</div><div class="k-sub">' +
    (fertig ? 'Erledigt – Serie: ' + labKataSerie() + ' Tage' : 'Doppelte XP heute · ' + LAB_TYPEN[k.typ] + ' · ca. 2 Minuten') + '</div></div>' +
    '<button class="start-btn' + (fertig ? ' ghost' : '') + '" type="button" onclick="labOeffnen(\'' + k.id + '\');selectLesson(\'labor\')">' +
    (fertig ? 'Zum Labor' : 'Ab ins Dojo') + '</button></div>');
}

/* ---------- Einhaengen ---------- */
(function(){
  var vorher = rbAnreichern;
  rbAnreichern = function(){
    vorher();
    var el = document.getElementById('content');
    if(el) rbHeuteKata(el);
    try{ rbSterneZeichnen(); }catch(e){}
    try{ rbMeisterschaftPruefen(); }catch(e){}
  };
  if(typeof indexFertig !== 'undefined' && indexFertig){
    /* Falls die Suche schon gebaut wurde: Eintraege nachreichen */
    SEARCH_INDEX.length = 0; indexFertig = false;
  }
  try{ rbAnreichern(); }catch(e){}
})();
