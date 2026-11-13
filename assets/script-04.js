
/* ============================================================
   Fuenfte Runde: Tokyo-Night-Syntaxfarben, Code-Labor mit
   Gamification, Teilen und ein Tutor, der auch lokal sichtbar ist.
   ============================================================ */

/* ---------- Tokyo Night: Tokenizer je Sprache ---------- */
var RB_PHP = [
  ['c', /\/\/[^\n]*|#(?!\[)[^\n]*|\/\*[\s\S]*?\*\//],
  ['d', /#\[[^\]\n]*\]/],
  ['s', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"/],
  ['tag', /<\?php|<\?=|\?>/],
  ['this', /\$this\b/],
  ['v', /\$[A-Za-z_]\w*/],
  ['k', /\b(?:abstract|and|as|break|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|enum|extends|final|finally|fn|for|foreach|function|global|if|implements|include|instanceof|insteadof|interface|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|use|while|yield)\b/],
  ['const', /\b(?:true|false|null|self|parent|__DIR__|__CLASS__|[A-Z][A-Z0-9]*_[A-Z0-9_]+|PHP_VERSION)\b/],
  ['t', /\b(?:int|float|string|bool|array|object|callable|iterable|void|never|mixed)\b/],
  ['n', /\b\d[\d_]*(?:\.\d+)?\b/],
  ['f', /\b[A-Za-z_]\w*(?=\s*\()/],
  ['cls', /\b[A-Z][A-Za-z0-9_]*\b/],
  ['p', /(?<=->)[A-Za-z_]\w*/],
  ['o', /=>|\?->|->|::|\?\?=?|===|!==|==|!=|<=>|<=|>=|&&|\|\||[=+\-*\/%<>!.?:&|]/]
];
var RB_TN = {
  php:   { flags:'gm', regeln: RB_PHP },
  blade: { flags:'gm', regeln: [
    ['c', /\{\{--[\s\S]*?--\}\}|<!--[\s\S]*?-->/],
    ['o', /\{\{|\}\}|\{!!|!!\}/],
    ['d', /@[a-zA-Z]+/],
    ['tag', /<\/?[A-Za-z][\w:.-]*|\/?>/],
    ['a', /\b[a-zA-Z][\w:-]*(?==)/]
  ].concat(RB_PHP) },
  bash:  { flags:'gm', regeln: [
    ['c', /(?<![\w$&{])#[^\n]*/],
    ['s', /'[^'\n]*'|"(?:\\.|[^"\\\n])*"/],
    ['v', /\$\{[^}\n]*\}|\$\(|\$[A-Za-z_]\w*|\$\d/],
    ['f', /^[ \t]*(?:sudo[ \t]+)?[a-z][\w.\/-]*|(?<=(?:&&|\||;)[ \t]*)[a-z][\w.\/-]*/],
    ['k', /(?<=\s)--?[a-zA-Z][\w-]*/],
    ['n', /\b\d+\b/],
    ['o', /&&|\|\||[|>;=]/]
  ] },
  json:  { flags:'gm', regeln: [
    ['key', /"(?:\\.|[^"\\])*"(?=\s*:)/],
    ['s', /"(?:\\.|[^"\\])*"/],
    ['const', /\b(?:true|false|null)\b/],
    ['n', /-?\b\d+(?:\.\d+)?\b/],
    ['o', /[{}\[\]:,]/]
  ] },
  yaml:  { flags:'gm', regeln: [
    ['c', /#[^\n]*/],
    ['key', /^[ \t-]*[\w.-]+(?=:)/],
    ['s', /'[^'\n]*'|"[^"\n]*"/],
    ['const', /\b(?:true|false|null)\b/],
    ['n', /\b\d+(?:\.\d+)?\b/]
  ] },
  sql:   { flags:'gmi', regeln: [
    ['c', /--[^\n]*/],
    ['s', /'(?:''|[^'\n])*'/],
    ['f', /\b(?:count|sum|avg|min|max|coalesce|date_format|now|upper|lower)\b(?=\s*\()/],
    ['k', /\b(?:select|from|where|and|or|not|in|is|null|join|inner|left|right|outer|on|group|by|order|having|as|insert|into|values|update|set|delete|create|table|alter|drop|primary|key|foreign|references|distinct|limit|between|like|asc|desc|union|exists|case|when|then|else|end|default|unique|index|view|integer|int|varchar|char|decimal|date|text|boolean)\b/],
    ['n', /\b\d+(?:\.\d+)?\b/],
    ['o', /<>|<=|>=|!=|[=<>*]/]
  ] },
  pseudo:{ flags:'gm', regeln: [
    ['c', /\/\/[^\n]*/],
    ['s', /"[^"\n]*"|'[^'\n]*'/],
    ['k', /\b(?:FUNCTION|ENDFUNCTION|PROCEDURE|ENDPROCEDURE|IF|THEN|ELSE|ELSEIF|ENDIF|WHILE|DO|ENDWHILE|REPEAT|UNTIL|FOR|EACH|IN|TO|STEP|ENDFOR|RETURN|AND|OR|NOT|MOD|DIV|AUSGABE|EINGABE|CLASS|ENDCLASS|NEW|SWITCH|CASE|ENDSWITCH|DEFAULT|TRUE|FALSE|NULL|WAHR|FALSCH|PRIVATE|PUBLIC|PROTECTED|EXTENDS|THIS|LAENGE)\b/],
    ['f', /\b[A-Za-z_]\w*(?=\()/],
    ['n', /\b\d+(?:[.,]\d+)?\b/],
    ['o', /<-|:=|<=|>=|<>|!=|==|[=<>+*\/]/]
  ] },
  http:  { flags:'gm', regeln: [
    ['k', /^(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/],
    ['key', /^[A-Za-z-]+(?=:)/],
    ['s', /"(?:\\.|[^"\\\n])*"/],
    ['n', /\b\d{3}\b/],
    ['o', /->|=>|[{}\[\]:,]/]
  ] },
  text:  { flags:'gm', regeln: [
    ['c', /\/\/[^\n]*/],
    ['n', /\b\d+(?:[.,]\d+)*\b/],
    ['o', /->|=>|<-|→|←|↓|↑/]
  ] }
};

function rbSprache(lang){
  var l = String(lang || '').toLowerCase();
  if(/blade|php \+ html/.test(l)) return 'blade';
  if(/php|laravel|pest|migration|factory/.test(l)) return 'php';
  if(/bash|shell|powershell|deploy/.test(l)) return 'bash';
  if(/json/.test(l)) return 'json';
  if(/yaml|yml|github actions/.test(l)) return 'yaml';
  if(/sql/.test(l)) return 'sql';
  if(/pseudocode|trockenlauf/.test(l)) return 'pseudo';
  if(/^http|schnittstelle/.test(l)) return 'http';
  return 'text';
}

function rbTokyo(code, sprache){
  var def = RB_TN[sprache] || RB_TN.text;
  if(!def.re){
    def.re = new RegExp(def.regeln.map(function(r){ return '(' + r[1].source + ')'; }).join('|'), def.flags);
  }
  var re = def.re, out = '', pos = 0, m;
  re.lastIndex = 0;
  while((m = re.exec(code)) !== null){
    if(m[0] === ''){ re.lastIndex++; continue; }
    var k = 1;
    while(k < m.length && m[k] === undefined) k++;
    out += esc(code.slice(pos, m.index));
    out += '<span class="tn-' + def.regeln[k - 1][0] + '">' + esc(m[0]) + '</span>';
    pos = m.index + m[0].length;
  }
  return out + esc(code.slice(pos));
}

/* codeBlock des Kurses durch die farbige Fassung ersetzen. Der Kopieren-Knopf
   liest textContent und bekommt weiter den reinen Code. */
codeBlock = function(code, lang){
  lang = lang || 'Pseudocode';
  return '<div class="code-block"><div class="code-head"><span class="code-lang">' + esc(lang) + '</span>' +
    '<button class="copy-btn" onclick="copyCode(this)">Kopieren</button></div><pre><code>' +
    rbTokyo(String(code), rbSprache(lang)) + '</code></pre></div>';
};

/* ---------- Code-Labor: Daten ---------- */
var LABOR = [{"id": "lab-ap1-schleife", "lektion": "m1-l2", "titel": "Schleife im Kopf ausführen", "stufe": 1, "typ": "ausgabe", "aufgabe": "Was gibt dieses Programm aus? Lege dir eine Wertetabelle für i und summe an.", "sprache": "Pseudocode", "tipp": "Nur ungerade i werden addiert: i MOD 2 = 1.", "erklaerung": "Addiert werden 1, 3 und 5 – also 9. Bei i = 6 bricht die kopfgesteuerte Schleife ab.", "code": "i <- 1\nsumme <- 0\nWHILE i <= 5 DO\n  IF i MOD 2 = 1 THEN\n    summe <- summe + i\n  ENDIF\n  i <- i + 1\nENDWHILE\nAUSGABE summe", "antworten": ["9"]}, {"id": "lab-ap1-quersumme", "lektion": "m1-l3", "titel": "Quersumme mit MOD und DIV", "stufe": 1, "typ": "ausgabe", "aufgabe": "Welchen Wert hat quersumme am Ende?", "sprache": "Pseudocode", "tipp": "MOD 10 liefert die letzte Ziffer, DIV 10 schneidet sie ab.", "erklaerung": "5 + 0 + 9 = 14. Die Null in der Mitte zählt als eigene Ziffer und ändert die Summe nicht.", "code": "quersumme <- 0\nzahl <- 905\nWHILE zahl > 0 DO\n  quersumme <- quersumme + (zahl MOD 10)\n  zahl <- zahl DIV 10\nENDWHILE\nAUSGABE quersumme", "antworten": ["14"]}, {"id": "lab-ap1-maximum", "lektion": "m4-l1", "titel": "Off-by-one im Maximum", "stufe": 2, "typ": "bug", "aufgabe": "Die Funktion stürzt bei jedem Aufruf ab. Klicke die fehlerhafte Zeile an.", "sprache": "Pseudocode", "tipp": "Arrays beginnen bei Index 0. Welchen Index hat das letzte Element?", "erklaerung": "Der letzte gültige Index ist LAENGE − 1. Die Schleife greift im letzten Durchlauf auf zahlen[LAENGE] zu – außerhalb des Arrays.", "code": "FUNCTION maximum(zahlen)\n  max <- zahlen[0]\n  FOR i <- 1 TO LAENGE(zahlen) DO\n    IF zahlen[i] > max THEN\n      max <- zahlen[i]\n    ENDIF\n  ENDFOR\n  RETURN max\nENDFUNCTION", "fehler": [2], "fix": "FOR i <- 1 TO LAENGE(zahlen) - 1 DO"}, {"id": "lab-ap1-sql", "lektion": "m7-l2", "titel": "Abteilungen mit mehr als fünf Personen", "stufe": 2, "typ": "luecke", "aufgabe": "Ergänze die Abfrage: Sie soll alle Abteilungen mit mehr als fünf Mitarbeitern und deren Anzahl liefern.", "sprache": "SQL", "tipp": "Bedingungen auf Gruppen gehören nicht in WHERE.", "erklaerung": "WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen danach – deshalb steht COUNT(*) > 5 im HAVING.", "code": "SELECT abteilung, [[0]](*) AS anzahl\nFROM mitarbeiter\n[[1]] abteilung\n[[2]] COUNT(*) > 5;", "antworten": [["COUNT"], ["GROUP BY"], ["HAVING"]]}, {"id": "lab-php-vergleich", "lektion": "m42-l2", "titel": "Lose gegen strikte Vergleiche", "stufe": 1, "typ": "ausgabe", "aufgabe": "Welche drei Werte gibt var_dump aus? Antworte z. B. mit „true false true“.", "sprache": "PHP", "tipp": "Zwei numerische Strings vergleicht == als Zahlen.", "erklaerung": "\"5\" == 5 wandelt um (true), === vergleicht auch den Typ (false). \"10\" und \"1e1\" sind beide die Zahl 10 – deshalb true. Genau darum gilt: immer ===.", "code": "<?php\n$a = '5';\n$b = 5;\nvar_dump($a == $b);\nvar_dump($a === $b);\nvar_dump('10' == '1e1');", "antworten": ["true false true", "bool(true) bool(false) bool(true)"]}, {"id": "lab-php-filter", "lektion": "m42-l3", "titel": "Die array_filter-Falle", "stufe": 2, "typ": "ausgabe", "aufgabe": "Was gibt dieses Skript aus? Achte auf die Schlüssel.", "sprache": "PHP", "tipp": "array_filter behält die ursprünglichen Schlüssel. Eine Liste mit Lücken wird in JSON zum Objekt.", "erklaerung": "Übrig bleiben die Schlüssel 1 und 3. Weil sie nicht bei 0 beginnen und lückenlos sind, wird daraus ein JSON-Objekt. Mit array_values() käme [8,12] heraus.", "code": "<?php\n$zahlen = [3, 8, 5, 12];\n$gerade = array_filter($zahlen, fn ($x) => $x % 2 === 0);\necho json_encode($gerade);", "antworten": ["{\"1\":8,\"3\":12}"]}, {"id": "lab-php-match", "lektion": "m42-l3", "titel": "match statt switch", "stufe": 1, "typ": "luecke", "aufgabe": "Ergänze den Ausdruck so, dass unbekannte Werte „unbekannt“ liefern.", "sprache": "PHP", "tipp": "Der Ausdruck vergleicht strikt und braucht kein break.", "erklaerung": "match ist ein Ausdruck mit strikter Prüfung. Ohne default würde ein unbekannter Status einen UnhandledMatchError werfen.", "code": "<?php\n$label = [[0]] ($status) {\n    'offen'     [[1]] 'wartet auf Versand',\n    'versendet' => 'unterwegs',\n    [[2]]       => 'unbekannt',\n};", "antworten": [["match"], ["=>"], ["default"]]}, {"id": "lab-php-closure", "lektion": "m42-l4", "titel": "Wann wird gebunden?", "stufe": 2, "typ": "ausgabe", "aufgabe": "Was gibt das Skript aus?", "sprache": "PHP", "tipp": "Beide Formen übernehmen den Wert zum Zeitpunkt, an dem die Funktion erzeugt wird.", "erklaerung": "use ($n) und die Arrow Function kopieren $n bei ihrer Erzeugung (Wert 1). Die spätere Zuweisung $n = 5 sehen beide nicht – das ginge nur mit use (&$n).", "code": "<?php\n$n = 1;\n$a = function () use ($n) { return $n * 10; };\n$b = fn () => $n * 100;\n$n = 5;\necho $a() . ' ' . $b();", "antworten": ["10 100"]}, {"id": "lab-web-xss", "lektion": "m43-l1", "titel": "Ausgabe absichern", "stufe": 1, "typ": "luecke", "aufgabe": "Ergänze die Funktion, die den Namen sicher in HTML ausgibt.", "sprache": "PHP + HTML", "tipp": "Die Funktion wandelt <, >, & und Anführungszeichen in HTML-Entitäten um.", "erklaerung": "htmlspecialchars() kodiert die Sonderzeichen. Ein eingeschleustes <script> erscheint dann als Text statt ausgeführt zu werden.", "code": "<p>Hallo <?= [[0]]($name, ENT_QUOTES, 'UTF-8') ?>!<\/p>", "antworten": [["htmlspecialchars"]]}, {"id": "lab-web-login", "lektion": "m43-l2", "titel": "Sicherer Login", "stufe": 2, "typ": "luecke", "aufgabe": "Vervollständige Registrierung und Login nach den drei Regeln aus der Lektion.", "sprache": "PHP", "tipp": "Hashen, prüfen, Session-ID erneuern.", "erklaerung": "password_hash() wählt einen langsamen, gesalzenen Algorithmus, password_verify() prüft dagegen. session_regenerate_id(true) macht eine untergeschobene Session-ID wertlos.", "code": "<?php\n// Registrierung\n$hash = [[0]]($passwort, PASSWORD_DEFAULT);\n\n// Login\nif ([[1]]($passwort, $user['passwort_hash'])) {\n    [[2]](true);          // Schutz vor Session Fixation\n    $_SESSION['user_id'] = $user['id'];\n}", "antworten": [["password_hash"], ["password_verify"], ["session_regenerate_id"]]}, {"id": "lab-web-sqli", "lektion": "m43-l3", "titel": "Die Lücke im Kundenlogin", "stufe": 2, "typ": "bug", "aufgabe": "Diese Abfrage ist angreifbar. Klicke die Zeile an, in der die Lücke entsteht.", "sprache": "PHP", "tipp": "prepare() schützt nur, wenn die Werte nicht schon im SQL-String stehen.", "erklaerung": "Die Eingabe wird in den SQL-String eingesetzt, bevor prepare() ihn sieht. Mit der Eingabe ' OR '1'='1 liefert die Abfrage jeden Kunden. Richtig: Platzhalter im SQL, Wert über execute().", "code": "<?php\n$email = $_POST['email'] ?? '';\n$stmt = $db->prepare(\"SELECT id, name FROM kunden WHERE email = '$email'\");\n$stmt->execute();\n$kunde = $stmt->fetch();", "fehler": [2], "fix": "$stmt = $db->prepare('SELECT id, name FROM kunden WHERE email = ?');\n$stmt->execute([$email]);"}, {"id": "lab-oop-readonly", "lektion": "m44-l1", "titel": "Das unveränderliche Geld", "stufe": 2, "typ": "bug", "aufgabe": "Der Aufruf $preis->plus(500) bricht mit einem Fehler ab. Welche Zeile ist schuld?", "sprache": "PHP", "tipp": "readonly-Eigenschaften dürfen genau einmal gesetzt werden.", "erklaerung": "$this->cent ist readonly – jede Änderung wirft „Cannot modify readonly property“. Value Objects liefern stattdessen ein neues Objekt.", "code": "<?php\nfinal class Geld\n{\n    public function __construct(public readonly int $cent) {}\n\n    public function plus(int $cent): self\n    {\n        $this->cent += $cent;\n        return $this;\n    }\n}", "fehler": [7], "fix": "return new self($this->cent + $cent);"}, {"id": "lab-oop-static", "lektion": "m44-l1", "titel": "Late Static Binding", "stufe": 3, "typ": "ausgabe", "aufgabe": "Was gibt das Skript aus?", "sprache": "PHP", "tipp": "static meint die Klasse, auf der aufgerufen wurde – nicht die, in der der Code steht.", "erklaerung": "new static() erzeugt ein Kind, static::class liefert „Kind“. Mit self wäre es beide Male „Basis“.", "code": "<?php\nclass Basis\n{\n    public static function erzeuge(): static\n    {\n        return new static();\n    }\n\n    public function name(): string\n    {\n        return static::class;\n    }\n}\n\nclass Kind extends Basis {}\n\necho Kind::erzeuge()->name();", "antworten": ["Kind"]}, {"id": "lab-oop-enum", "lektion": "m44-l3", "titel": "Enum mit tryFrom", "stufe": 2, "typ": "ausgabe", "aufgabe": "Was gibt das Skript aus?", "sprache": "PHP", "tipp": "tryFrom liefert bei unbekanntem Wert null. name ist der Fallname, value der gespeicherte Wert.", "erklaerung": "„versendet“ gibt es nicht, also null – der Nullsafe-Operator und ?? machen daraus „unbekannt“. from(\"bezahlt\") liefert den Fall Bezahlt, dessen name „Bezahlt“ ist.", "code": "<?php\nenum Status: string\n{\n    case Offen   = 'offen';\n    case Bezahlt = 'bezahlt';\n}\n\n$s = Status::tryFrom('versendet');\necho $s?->value ?? 'unbekannt';\necho ' ' . Status::from('bezahlt')->name;", "antworten": ["unbekannt Bezahlt"]}, {"id": "lab-lv-lebenszyklus", "lektion": "m45-l2", "titel": "Der Weg eines Requests", "stufe": 2, "typ": "ordnen", "aufgabe": "Bringe die Stationen eines Requests durch Laravel in die richtige Reihenfolge. Tippe die Schritte nacheinander an.", "sprache": "Laravel", "tipp": "Erst muss die Anwendung stehen, bevor irgendetwas geroutet werden kann.", "erklaerung": "Einstieg ist immer public/index.php. Erst wenn alle Provider registriert sind, läuft der Request durch die Middleware zum Router – und die Antwort nimmt denselben Weg zurück.", "schritte": ["public/index.php lädt den Autoloader", "bootstrap/app.php erzeugt die Anwendung", "Service Provider registrieren ihre Dienste", "Globale Middleware (Session, CSRF …)", "Router wählt die Route und ihre Middleware", "Controller erzeugt die Response", "Response läuft durch die Middleware zurück"]}, {"id": "lab-lv-routen", "lektion": "m45-l2", "titel": "Routen definieren", "stufe": 1, "typ": "luecke", "aufgabe": "Ergänze: eine benannte Route und die sieben REST-Routen eines Controllers.", "sprache": "PHP · Laravel", "tipp": "Benannte Routen nutzt du später mit route(\"produkte.show\", $p).", "erklaerung": "->name() vergibt den Namen, Route::resource() erzeugt index, create, store, show, edit, update und destroy.", "code": "<?php\nRoute::get('/produkte/{produkt}', [ProduktController::class, 'show'])\n    ->[[0]]('produkte.show');\n\nRoute::[[1]]('admin/produkte', Admin\\ProduktController::class);", "antworten": [["name"], ["resource"]]}, {"id": "lab-lv-blade", "lektion": "m45-l3", "titel": "XSS im Kommentarbereich", "stufe": 2, "typ": "bug", "aufgabe": "Ein Besucher schreibt <script> in einen Kommentar – und es wird ausgeführt. Welche Zeile?", "sprache": "Blade", "tipp": "Eine der beiden Ausgabeformen kodiert HTML, die andere nicht.", "erklaerung": "{!! !!} gibt den Text roh aus. {{ }} kodiert automatisch und macht aus <script> harmlosen Text.", "code": "@foreach ($kommentare as $k)\n    <article>\n        <h3>{{ $k->autor }}<\/h3>\n        <p>{!! $k->text !!}<\/p>\n    <\/article>\n@endforeach", "fehler": [3], "fix": "<p>{{ $k->text }}<\/p>"}, {"id": "lab-el-migration", "lektion": "m46-l1", "titel": "Fremdschlüssel in der Migration", "stufe": 1, "typ": "luecke", "aufgabe": "Ergänze die Spalte: Fremdschlüssel auf kategorien, beim Löschen der Kategorie sollen die Produkte mitgelöscht werden.", "sprache": "PHP · Migration", "tipp": "Die Löschregel heißt wie das, was mit den Kindern passiert.", "erklaerung": "foreignId() legt eine unsigned BIGINT-Spalte an, constrained() den Fremdschlüssel und cascadeOnDelete() die Löschregel.", "code": "<?php\nSchema::create('produkte', function (Blueprint $table) {\n    $table->id();\n    $table->[[0]]('kategorie_id')->constrained('kategorien')->[[1]]();\n    $table->string('name');\n    $table->timestamps();\n});", "antworten": [["foreignId"], ["cascadeOnDelete"]]}, {"id": "lab-el-mass", "lektion": "m46-l2", "titel": "Mass Assignment", "stufe": 2, "typ": "bug", "aufgabe": "Ein Angreifer schickt zusätzlich ist_hervorgehoben=1 mit und hebt sein Produkt hervor. Welche Zeile lässt das zu?", "sprache": "PHP · Laravel", "tipp": "Welche Felder landen hier in der Datenbank?", "erklaerung": "$request->all() übernimmt jedes mitgeschickte Feld. Mit $request->validated() aus einem Form Request kommen nur Felder an, für die es eine Regel gibt – zusätzlich zu $fillable.", "code": "<?php\npublic function store(Request $request)\n{\n    $produkt = Produkt::create($request->all());\n    return to_route('produkte.show', $produkt);\n}", "fehler": [3], "fix": "public function store(ProduktSpeichernRequest $request)\n{\n    $produkt = Produkt::create($request->validated());"}, {"id": "lab-el-relationen", "lektion": "m46-l3", "titel": "Beziehungen richtig benennen", "stufe": 2, "typ": "luecke", "aufgabe": "Eine Bestellung gehört zu einem Kunden, hat viele Produkte (n:m), ein Kunde hat viele Bestellungen.", "sprache": "PHP · Laravel", "tipp": "Die Seite mit dem Fremdschlüssel „gehört zu“.", "erklaerung": "bestellungen.kunde_id → belongsTo. n:m über eine Zwischentabelle → belongsToMany. Die Gegenseite der 1:n-Beziehung → hasMany.", "code": "<?php\nclass Bestellung extends Model\n{\n    public function kunde(): BelongsTo\n    {\n        return $this->[[0]](Kunde::class);\n    }\n\n    public function produkte(): BelongsToMany\n    {\n        return $this->[[1]](Produkt::class)->withPivot('menge');\n    }\n}\n\nclass Kunde extends Model\n{\n    public function bestellungen(): HasMany\n    {\n        return $this->[[2]](Bestellung::class);\n    }\n}", "antworten": [["belongsTo"], ["belongsToMany"], ["hasMany"]]}, {"id": "lab-el-nplus1", "lektion": "m46-l4", "titel": "Abfragen zählen", "stufe": 2, "typ": "ausgabe", "aufgabe": "50 Beiträge, jeder von einem anderen Autor. Wie viele SQL-Abfragen löst dieser Code aus?", "sprache": "PHP · Laravel", "tipp": "Eine Abfrage für die Liste – und dann?", "erklaerung": "1 Abfrage für die Beiträge plus 50 für die Autoren: das N+1-Problem. Mit Post::with(\"autor\") wären es genau 2.", "code": "<?php\n$posts = Post::latest()->take(50)->get();\n\nforeach ($posts as $post) {\n    echo $post->autor->name;\n}", "antworten": ["51"]}, {"id": "lab-auth-validierung", "lektion": "m47-l1", "titel": "Regeln für die Registrierung", "stufe": 1, "typ": "luecke", "aufgabe": "Die E-Mail darf noch nicht vergeben sein; gespeichert werden nur geprüfte Felder.", "sprache": "PHP · Laravel", "tipp": "Die Regel prüft gegen eine Tabelle. Die Methode liefert nur Felder mit Regel.", "erklaerung": "unique:users,email verhindert doppelte Adressen. validated() liefert ausschließlich die geprüften Felder.", "code": "<?php\n$request->validate([\n    'name'  => ['required', 'string', 'max:255'],\n    'email' => ['required', 'email', '[[0]]:users,email'],\n]);\n\n$user = User::create($request->[[1]]());", "antworten": [["unique"], ["validated"]]}, {"id": "lab-auth-csrf", "lektion": "m47-l2", "titel": "Formular ohne Token", "stufe": 1, "typ": "ausgabe", "aufgabe": "Ein POST-Formular in Blade ohne @csrf wird abgeschickt. Mit welchem HTTP-Status antwortet Laravel?", "sprache": "HTTP", "tipp": "Die Fehlerseite heißt „Page Expired“.", "erklaerung": "Fehlt das CSRF-Token, antwortet Laravel mit 419 Page Expired. In Blade-Formularen genügt @csrf.", "code": "POST /profil HTTP/1.1\nCookie: laravel_session=...\nContent-Type: application/x-www-form-urlencoded\n\nname=Ada", "antworten": ["419"]}, {"id": "lab-auth-policy", "lektion": "m47-l3", "titel": "Die Policy, die alle reinlässt", "stufe": 2, "typ": "bug", "aufgabe": "Jeder Benutzer kann fremde Rechnungen bearbeiten – nur der Besitzer nicht. Wo liegt der Fehler?", "sprache": "PHP · Laravel", "tipp": "Lies den Vergleich laut vor.", "erklaerung": "!== kehrt die Regel um. Genau deshalb gehört zu jeder Policy ein Test mit einem fremden Benutzer.", "code": "<?php\nclass RechnungPolicy\n{\n    public function update(User $user, Rechnung $rechnung): bool\n    {\n        return $user->id !== $rechnung->user_id;\n    }\n}", "fehler": [5], "fix": "return $user->id === $rechnung->user_id;"}, {"id": "lab-api-status", "lektion": "m48-l1", "titel": "Statuscodes einer REST-API", "stufe": 2, "typ": "luecke", "aufgabe": "Trage die passenden Statuscodes ein.", "sprache": "HTTP", "tipp": "2xx Erfolg, 4xx Fehler des Clients.", "erklaerung": "201 nach dem Anlegen, 204 nach dem Löschen ohne Inhalt, 401 ohne Anmeldung, 422 bei ungültigen Daten. 403 wäre „angemeldet, aber nicht berechtigt“.", "code": "POST   /api/v1/produkte       -> [[0]] Created\nDELETE /api/v1/produkte/7     -> [[1]] No Content\nGET    /api/v1/produkte       -> [[2]] Unauthorized   (Token fehlt)\nPOST   /api/v1/produkte       -> [[3]] Unprocessable  (Validierung)", "antworten": [["201"], ["204"], ["401"], ["422"]]}, {"id": "lab-api-token", "lektion": "m48-l2", "titel": "Token mit Ablaufdatum", "stufe": 3, "typ": "luecke", "aufgabe": "Stelle ein Token aus, das nur Produkte lesen darf und nach 30 Tagen abläuft.", "sprache": "PHP · Laravel", "tipp": "Den Klartext gibt es genau einmal – direkt nach dem Ausstellen.", "erklaerung": "createToken() speichert nur den SHA-256-Hash. plainTextToken ist die einzige Gelegenheit, den Klartext an den Client zu geben.", "code": "<?php\n$token = $user->[[0]]('mobile-app', ['produkte:lesen'], now()->addDays(30));\n\nreturn ['token' => $token->[[1]]];", "antworten": [["createToken"], ["plainTextToken"]]}, {"id": "lab-arch-container", "lektion": "m49-l1", "titel": "Interface an Implementierung binden", "stufe": 2, "typ": "luecke", "aufgabe": "Für die ganze Anwendung soll genau eine Instanz von EzbWechselkurse verwendet werden.", "sprache": "PHP · Laravel", "tipp": "bind() liefert jedes Mal ein neues Objekt.", "erklaerung": "singleton() erzeugt die Instanz einmal und liefert sie danach immer wieder. Jede Klasse, die Wechselkurse im Konstruktor verlangt, bekommt sie automatisch.", "code": "<?php\npublic function register(): void\n{\n    $this->app->[[0]](Wechselkurse::class, EzbWechselkurse::class);\n}", "antworten": [["singleton"]]}, {"id": "lab-arch-race", "lektion": "m49-l4", "titel": "Überverkauf unter Last", "stufe": 3, "typ": "bug", "aufgabe": "Zwei Kunden bestellen gleichzeitig das letzte Exemplar – beide Bestellungen gehen durch. Welche Zeile muss sich ändern?", "sprache": "PHP · Laravel", "tipp": "Beide Transaktionen lesen gleichzeitig denselben Bestand.", "erklaerung": "Ohne Sperre lesen beide Transaktionen bestand = 1 und bestehen die Prüfung. lockForUpdate() sperrt die Zeile bis zum Commit – die zweite Transaktion wartet und sieht dann 0.", "code": "<?php\nDB::transaction(function () use ($id, $menge) {\n    $produkt = Produkt::findOrFail($id);\n\n    if ($produkt->bestand < $menge) {\n        throw new LagerbestandZuNiedrig();\n    }\n\n    $produkt->decrement('bestand', $menge);\n});", "fehler": [2], "fix": "$produkt = Produkt::lockForUpdate()->findOrFail($id);"}, {"id": "lab-perf-exists", "lektion": "m50-l3", "titel": "Zählen, wo Prüfen reicht", "stufe": 2, "typ": "bug", "aufgabe": "Die Abfrage ist bei großen Tabellen unnötig langsam. Welche Zeile?", "sprache": "PHP · Laravel", "tipp": "Du willst nur wissen, ob es mindestens eine gibt.", "erklaerung": "count() muss alle passenden Zeilen zählen, exists() bricht nach dem ersten Treffer ab.", "code": "<?php\n$hatOffene = $kunde->bestellungen()\n    ->where('status', 'offen')\n    ->count() > 0;", "fehler": [3], "fix": "->exists();"}, {"id": "lab-perf-schedule", "lektion": "m50-l4", "titel": "Nächtlicher Aufräumlauf", "stufe": 2, "typ": "luecke", "aufgabe": "Der Befehl soll täglich um 03:15 laufen und nie doppelt gleichzeitig.", "sprache": "PHP · Laravel", "tipp": "Die zweite Methode verhindert Überlappung.", "erklaerung": "dailyAt() legt die Uhrzeit fest, withoutOverlapping() startet nicht, solange der letzte Lauf noch arbeitet. onOneServer() wäre für mehrere Server zuständig.", "code": "<?php\n// routes/console.php\nSchedule::command('shop:warenkoerbe-aufraeumen')\n    ->[[0]]('03:15')\n    ->[[1]]();", "antworten": [["dailyAt"], ["withoutOverlapping"]]}, {"id": "lab-q-deploy", "lektion": "m51-l4", "titel": "Deployment in der richtigen Reihenfolge", "stufe": 3, "typ": "ordnen", "aufgabe": "Bringe die Schritte eines Zero-Downtime-Deployments in die richtige Reihenfolge.", "sprache": "Bash", "tipp": "Erst alles im neuen Release vorbereiten, dann umschalten, dann die langlaufenden Prozesse erneuern.", "erklaerung": "Abhängigkeiten und Assets entstehen im neuen Verzeichnis, Migrationen laufen vor dem Umschalten (deshalb müssen sie abwärtskompatibel sein). Nach dem Symlink laden FPM und Queue-Worker den neuen Code.", "schritte": ["composer install --no-dev --optimize-autoloader", "npm ci && npm run build", "php artisan migrate --force", "php artisan optimize", "Symlink current auf das neue Release umschalten", "PHP-FPM neu laden (OPcache)", "php artisan queue:restart"]}, {"id": "lab-test-fremd", "lektion": "m51-l1", "titel": "Der wichtigste Test", "stufe": 2, "typ": "luecke", "aufgabe": "Ein fremder Benutzer darf die Bestellung nicht sehen – die Policy antwortet mit denyAsNotFound.", "sprache": "PHP · Pest", "tipp": "Erst einloggen, dann auf 404 prüfen.", "erklaerung": "actingAs() meldet den Benutzer für den Request an, assertNotFound() prüft auf 404 – passend zu denyAsNotFound() in der Policy.", "code": "<?php\nit('zeigt fremde Bestellungen nicht an', function () {\n    $fremde = Bestellung::factory()->create();\n\n    [[0]](User::factory()->create())\n        ->getJson(\"/api/v1/bestellungen/{$fremde->id}\")\n        ->[[1]]();\n});", "antworten": [["actingAs"], ["assertNotFound"]]}, {"id": "lab-test-fake", "lektion": "m51-l2", "titel": "Mails im Test abfangen", "stufe": 2, "typ": "luecke", "aufgabe": "Im Test darf keine echte Mail rausgehen, trotzdem soll geprüft werden, dass die Bestätigung verschickt wurde.", "sprache": "PHP · Pest", "tipp": "Der Fake heißt wie die Facade.", "erklaerung": "Mail::fake() ersetzt den Mailer durch eine Attrappe, Mail::assertSent() prüft, dass die Mailable verschickt worden wäre.", "code": "<?php\n[[0]]::fake();\n\n(new BestaetigungSenden)->handle(new BestellungAufgegeben($bestellung));\n\nMail::[[1]](BestellBestaetigung::class);", "antworten": [["Mail"], ["assertSent"]]}, {"id": "lab-boss-review", "lektion": "m51-l4", "titel": "Boss: Security-Review", "stufe": 4, "typ": "bug", "aufgabe": "Code-Review vor dem Release. Finde ALLE drei Sicherheitslücken – markiere jede betroffene Zeile und prüfe dann.", "sprache": "PHP · Laravel", "tipp": "Eine Lücke betrifft die Datenbank, zwei die Ausgabe – eine davon kommt aus der Datenbank selbst.", "erklaerung": "Zeile 5: SQL-Injection durch eingesetztes $q. Zeile 9: gespeichertes XSS – Produktnamen kommen ungefiltert ins HTML. Zeile 12: reflektiertes XSS über $q. Laravel-Weg: Platzhalter im SQL und eine Blade-View, deren {{ }} automatisch kodiert.", "code": "<?php\npublic function suche(Request $request)\n{\n    $q = $request->input('q');\n    $treffer = DB::select(\"SELECT * FROM produkte WHERE name LIKE '%$q%'\");\n\n    $html = '';\n    foreach ($treffer as $p) {\n        $html .= \"<li>{$p->name}<\/li>\";\n    }\n\n    return response(\"<ul>$html<\/ul><p>Suche nach: $q<\/p>\");\n}", "fehler": [4, 8, 11], "fix": "$treffer = DB::select('SELECT * FROM produkte WHERE name LIKE ?', ['%' . $q . '%']);\n// ...\n$html .= '<li>' . e($p->name) . '<\/li>';\n// ...\nreturn response('<ul>' . $html . '<\/ul><p>Suche nach: ' . e($q) . '<\/p>');\n// Besser: eine Blade-View mit {{ }} statt HTML im Controller."}];
var LAB_BY_ID = {};
LABOR.forEach(function(t){ LAB_BY_ID[t.id] = t; });
var LAB_STUFEN = { 1:'Einsteiger', 2:'Fortgeschritten', 3:'Experte', 4:'Boss' };
var LAB_XP = { 1:20, 2:35, 3:50, 4:90 };
var LAB_TYPEN = { ausgabe:'Ausgabe vorhersagen', luecke:'Lückentext', bug:'Bug-Jagd', ordnen:'Reihenfolge' };
var lab = { sitzung:{}, combo:0, filter:'alle' };

/* Fortschritt liegt in state.xpLog und wird damit wie alles andere gespeichert und synchronisiert. */
function labGeloest(id){ return !!(state.xpLog && state.xpLog['lab:' + id]); }
function labAnzahlGeloest(){ return LABOR.filter(function(t){ return labGeloest(t.id); }).length; }
function labHeute(){ return todayKey(); }
function labKata(){
  /* Deterministisch je Tag: zuerst ungeloeste Aufgaben, sonst alle. */
  var pool = LABOR.filter(function(t){ return !labGeloest(t.id) && t.stufe < 4; });
  if(!pool.length) pool = LABOR;
  var tag = labHeute(), h = 0;
  for(var i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}
function labKataSerie(){
  var n = 0, d = new Date();
  for(;;){
    var k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    if(state.xpLog['kata:' + k]) n++;
    else if(n > 0 || k !== labHeute()) break;
    d.setDate(d.getDate() - 1);
    if(n > 400) break;
  }
  return n;
}
function labSitzung(id){
  return lab.sitzung[id] || (lab.sitzung[id] = { versuche:0, tipp:false, aufgedeckt:false, auswahl:[], reihe:[] });
}
function labMischen(arr, saat){
  var a = arr.map(function(x, i){ return i; }), h = 0;
  for(var i = 0; i < saat.length; i++) h = (h * 33 + saat.charCodeAt(i)) >>> 0;
  for(var j = a.length - 1; j > 0; j--){
    h = (h * 1103515245 + 12345) >>> 0;
    var k = h % (j + 1), t = a[j]; a[j] = a[k]; a[k] = t;
  }
  if(a.every(function(x, i){ return x === i; })) a.reverse();
  return a;
}
function labNorm(s){
  return String(s == null ? '' : s).toLowerCase().replace(/["'`„“]/g, '').replace(/[\s,;]+/g, ' ').trim();
}

/* ---------- Code-Labor: Darstellung ---------- */
function labAufgabeHtml(t){
  var st = labSitzung(t.id), geloest = labGeloest(t.id), kata = labKata().id === t.id;
  var h = '<div class="lab-task' + (geloest ? ' geloest' : '') + (kata ? ' kata' : '') + '" id="lab-' + t.id + '">';
  h += '<div class="lab-kopf"><span class="lab-chip typ">' + LAB_TYPEN[t.typ] + '</span>' +
       '<span class="lab-chip' + (t.stufe === 4 ? ' boss' : '') + '">' + LAB_STUFEN[t.stufe] + '</span>' +
       (kata ? '<span class="lab-chip kata">Daily Dojo · doppelte XP</span>' : '') +
       (geloest ? '<span class="lab-chip ok">✓ gelöst</span>' : '') +
       '<span class="lab-chip xp">+' + xpAnzeige(LAB_XP[t.stufe]) + ' XP</span></div>';
  h += '<h4>' + esc(t.titel) + '</h4><p>' + esc(t.aufgabe) + '</p>';
  var sp = rbSprache(t.sprache);

  if(t.typ === 'ausgabe'){
    h += '<div class="lab-code"><pre>' + rbTokyo(t.code, sp) + '</pre></div>';
    h += '<input class="lab-eingabe" id="lab-in-' + t.id + '" placeholder="Deine Antwort …" spellcheck="false" autocomplete="off" ' +
         'onkeydown="if(event.key===\'Enter\'){labPruefen(\'' + t.id + '\')}">';
  }
  if(t.typ === 'luecke'){
    /* Platzhalter vor dem Einfaerben tauschen: Ziffern wuerden sonst als Zahl eingefaerbt. */
    var roh = t.code.replace(/\[\[(\d+)\]\]/g, function(_, i){ return '\uE000' + String.fromCharCode(0xE100 + (+i)); });
    var html = rbTokyo(roh, sp);
    html = html.replace(/\uE000([\uE100-\uE1FF])/g, function(_, z){
      var i = z.charCodeAt(0) - 0xE100;
      var laenge = Math.max.apply(null, t.antworten[+i].map(function(a){ return a.length; }));
      return '<input class="lab-luecke" data-luecke="' + i + '" style="width:' + (laenge + 3) + 'ch" spellcheck="false" ' +
             'autocomplete="off" aria-label="Lücke ' + (+i + 1) + '" ' +
             'onkeydown="if(event.key===\'Enter\'){labPruefen(\'' + t.id + '\')}">';
    });
    h += '<div class="lab-code"><pre>' + html + '</pre></div>';
  }
  if(t.typ === 'bug'){
    h += '<div class="lab-code" role="group" aria-label="Codezeilen, fehlerhafte anklicken">';
    t.code.split('\n').forEach(function(z, i){
      var an = st.auswahl.indexOf(i) >= 0;
      h += '<button type="button" class="lab-zeile' + (an ? ' markiert' : '') + '" aria-pressed="' + an + '" ' +
           'onclick="labZeile(\'' + t.id + '\',' + i + ')"><span class="nr">' + (i + 1) + '</span>' +
           (rbTokyo(z, sp) || ' ') + '</button>';
    });
    h += '</div>';
  }
  if(t.typ === 'ordnen'){
    var mix = labMischen(t.schritte, t.id);
    h += '<div class="lab-ordnen"><div class="lab-spalte"><h5>Schritte</h5>';
    mix.forEach(function(idx){
      if(st.reihe.indexOf(idx) >= 0) return;
      h += '<button type="button" class="lab-schritt" onclick="labOrdnen(\'' + t.id + '\',' + idx + ')">' +
           '<span class="pos">+</span><span>' + esc(t.schritte[idx]) + '</span></button>';
    });
    h += '</div><div class="lab-spalte"><h5>Deine Reihenfolge</h5>';
    st.reihe.forEach(function(idx, p){
      h += '<button type="button" class="lab-schritt" onclick="labOrdnenZurueck(\'' + t.id + '\',' + idx + ')" title="Zurücklegen">' +
           '<span class="pos">' + (p + 1) + '</span><span>' + esc(t.schritte[idx]) + '</span></button>';
    });
    h += '</div></div>';
  }

  h += '<div class="lab-aktionen">' +
       '<button class="ex-btn primary" type="button" onclick="labPruefen(\'' + t.id + '\')">Prüfen</button>' +
       '<button class="ex-btn" type="button" onclick="labTipp(\'' + t.id + '\')">Tipp' + (geloest ? '' : ' (halbe XP)') + '</button>' +
       (st.versuche >= 2 && !geloest ? '<button class="ex-btn lab-aufdecken" type="button" onclick="labAufdecken(\'' + t.id + '\')">Lösung zeigen</button>' : '') +
       '</div><div class="lab-feedback" id="lab-fb-' + t.id + '" aria-live="polite"></div>';
  return h + '</div>';
}

function labNeuZeichnen(id){
  var alt = document.getElementById('lab-' + id);
  if(!alt) return;
  /* Eingetippte Antworten ueberleben das Neuzeichnen. */
  var werte = {}, klassen = {};
  alt.querySelectorAll('.lab-luecke').forEach(function(f){ werte[f.dataset.luecke] = f.value; klassen[f.dataset.luecke] = f.className; });
  var ein = alt.querySelector('.lab-eingabe'), einWert = ein ? ein.value : '';
  var neu = document.createElement('div');
  neu.innerHTML = labAufgabeHtml(LAB_BY_ID[id]);
  var box = neu.firstChild;
  box.querySelectorAll('.lab-luecke').forEach(function(f){
    if(werte[f.dataset.luecke] != null){ f.value = werte[f.dataset.luecke]; f.className = klassen[f.dataset.luecke]; }
  });
  var ein2 = box.querySelector('.lab-eingabe');
  if(ein2) ein2.value = einWert;
  alt.replaceWith(box);
}

function labFeedback(id, art, html){
  var fb = document.getElementById('lab-fb-' + id);
  if(!fb) return;
  fb.className = 'lab-feedback zeigen ' + art;
  fb.innerHTML = html;
}

function labZeile(id, i){
  var st = labSitzung(id), k = st.auswahl.indexOf(i);
  if(k >= 0) st.auswahl.splice(k, 1); else st.auswahl.push(i);
  labNeuZeichnen(id);
}
function labOrdnen(id, idx){ labSitzung(id).reihe.push(idx); labNeuZeichnen(id); }
function labOrdnenZurueck(id, idx){
  var r = labSitzung(id).reihe, k = r.indexOf(idx);
  if(k >= 0) r.splice(k, 1);
  labNeuZeichnen(id);
}

function labTipp(id){
  var t = LAB_BY_ID[id];
  labSitzung(id).tipp = true;
  labFeedback(id, 'tipp', '<strong>Tipp:</strong> ' + esc(t.tipp));
}

function labAufdecken(id){
  var t = LAB_BY_ID[id], st = labSitzung(id);
  st.aufgedeckt = true;
  lab.combo = 0;
  var loesung = '';
  if(t.typ === 'ausgabe') loesung = '<code>' + esc(t.antworten[0]) + '</code>';
  if(t.typ === 'luecke') loesung = t.antworten.map(function(a, i){ return (i + 1) + ': <code>' + esc(a[0]) + '</code>'; }).join(' · ');
  if(t.typ === 'bug') loesung = 'Zeile ' + t.fehler.map(function(z){ return z + 1; }).join(', ');
  if(t.typ === 'ordnen') loesung = '<ol>' + t.schritte.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
  labFeedback(id, 'tipp', '<strong>Lösung:</strong> ' + loesung + '<br>' + esc(t.erklaerung) +
    (t.fix ? '<div class="fix">' + codeBlock(t.fix, t.sprache) + '</div>' : '') +
    '<br><em>Ohne XP – versuch es morgen noch einmal frisch.</em>');
}

function labPruefen(id){
  var t = LAB_BY_ID[id], st = labSitzung(id), box = document.getElementById('lab-' + id);
  if(!box) return;
  var ok = false, teil = '';

  if(t.typ === 'ausgabe'){
    var ein = document.getElementById('lab-in-' + id).value;
    if(!ein.trim()){ labFeedback(id, 'noch', 'Gib zuerst eine Antwort ein.'); return; }
    ok = t.antworten.some(function(a){ return labNorm(a) === labNorm(ein); });
  }
  if(t.typ === 'luecke'){
    var felder = box.querySelectorAll('.lab-luecke'), richtig = 0;
    felder.forEach(function(f){
      var soll = t.antworten[+f.dataset.luecke];
      var gut = soll.some(function(a){ return labNorm(a) === labNorm(f.value); });
      f.classList.toggle('richtig', gut);
      f.classList.toggle('falsch', !gut && f.value.trim() !== '');
      if(gut) richtig++;
    });
    ok = richtig === felder.length;
    teil = richtig + ' von ' + felder.length + ' Lücken stimmen.';
  }
  if(t.typ === 'bug'){
    if(!st.auswahl.length){ labFeedback(id, 'noch', 'Markiere zuerst eine Zeile.'); return; }
    var soll2 = t.fehler.slice().sort().join(','), ist = st.auswahl.slice().sort().join(',');
    ok = soll2 === ist;
    box.querySelectorAll('.lab-zeile').forEach(function(z, i){
      if(st.auswahl.indexOf(i) < 0) return;
      z.classList.add(t.fehler.indexOf(i) >= 0 ? 'treffer' : 'daneben');
    });
    var treffer = st.auswahl.filter(function(i){ return t.fehler.indexOf(i) >= 0; }).length;
    teil = t.fehler.length > 1 ? treffer + ' von ' + t.fehler.length + ' Lücken gefunden' +
           (st.auswahl.length > treffer ? ', ' + (st.auswahl.length - treffer) + ' Zeile(n) ohne Fehler markiert.' : '.') : '';
  }
  if(t.typ === 'ordnen'){
    if(st.reihe.length < t.schritte.length){ labFeedback(id, 'noch', 'Lege zuerst alle Schritte in die Reihenfolge.'); return; }
    ok = st.reihe.every(function(idx, p){ return idx === p; });
    var stimmt = st.reihe.filter(function(idx, p){ return idx === p; }).length;
    teil = stimmt + ' von ' + t.schritte.length + ' Schritten stehen richtig.';
  }

  if(!ok){
    st.versuche++;
    lab.combo = 0;
    labFeedback(id, 'noch', '<strong>Noch nicht.</strong> ' + esc(teil) +
      (st.versuche === 1 ? ' Schau noch einmal genau hin – oder hol dir einen Tipp.' : ''));
    if(st.versuche === 2){
      var akt = box.querySelector('.lab-aktionen');
      if(akt && !akt.querySelector('.lab-aufdecken')){
        akt.insertAdjacentHTML('beforeend', '<button class="ex-btn lab-aufdecken" type="button" onclick="labAufdecken(\'' + id + '\')">Lösung zeigen</button>');
      }
    }
    return;
  }
  labGeschafft(t, st);
}

function labGeschafft(t, st){
  var schonGeloest = labGeloest(t.id);
  var perfekt = st.versuche === 0 && !st.tipp && !st.aufgedeckt;
  var gesamt = 0, gruende = [];

  if(!schonGeloest && !st.aufgedeckt){
    var basis = LAB_XP[t.stufe];
    if(st.tipp) basis = Math.round(basis / 2);
    if(perfekt){ lab.combo++; basis = Math.round(basis * 1.5); gruende.push('fehlerfrei ×1,5'); }
    else lab.combo = 0;
    var bonus = perfekt ? Math.min(25, (lab.combo - 1) * 5) : 0;
    if(bonus > 0) gruende.push('Combo ' + lab.combo + ' +' + bonus);
    gesamt += awardXp(basis + bonus, 'Code-Labor: ' + t.titel, 'lab:' + t.id) || 0;
    gruende.push('alle XP ×' + XP_FAKTOR);
    if(labKata().id === t.id){
      var k = awardXp(LAB_XP[t.stufe], 'Daily Dojo', 'kata:' + labHeute()) || 0;
      if(k) { gesamt += k; gruende.push('Daily Dojo ×2'); }
    }
    if(perfekt) state.xpLog['lab:perfekt'] = (state.xpLog['lab:perfekt'] || 0) + 1;
    if(lab.combo > (state.xpLog['lab:combo'] || 0)) state.xpLog['lab:combo'] = lab.combo;
    labAbzeichenPruefen();
    saveProgress();
  }

  labNeuZeichnen(t.id);
  var kopf = schonGeloest ? 'Richtig – schon früher gelöst.' :
             st.aufgedeckt ? 'Richtig – nach aufgedeckter Lösung ohne XP.' :
             'Gelöst! +' + gesamt + ' XP' + (gruende.length ? ' (' + gruende.join(', ') + ')' : '');
  labFeedback(t.id, 'gut', '<strong>' + esc(kopf) + '</strong><br>' + esc(t.erklaerung) +
    (t.fix ? '<div class="fix">' + codeBlock(t.fix, t.sprache) + '</div>' : ''));
  if(!schonGeloest && !st.aufgedeckt) labFunken(t.id);
  try{ if(state.currentId === 'labor') labHudAktualisieren(); }catch(e){}
}

function labFunken(id){
  if(!RB.bewegung) return;
  var box = document.getElementById('lab-' + id);
  if(!box) return;
  var f = document.createElement('div');
  f.className = 'lab-funken';
  var farben = ['var(--success)', 'var(--accent)', '#9ece6a', '#7aa2f7', '#e0af68'];
  for(var i = 0; i < 18; i++){
    var w = (Math.PI * 2 * i) / 18, r = 90 + Math.random() * 90;
    f.innerHTML += '<i style="background:' + farben[i % farben.length] + ';--dx:' + Math.round(Math.cos(w) * r) +
                   'px;--dy:' + Math.round(Math.sin(w) * r * 0.6) + 'px;--rot:' + Math.round(Math.random() * 360) + 'deg"></i>';
  }
  box.appendChild(f);
  setTimeout(function(){ f.remove(); }, 1000);
}

/* ---------- Abzeichen fuers Labor ---------- */
[
  { id:'lab_first',   icon:'🧪', name:'Hello, World',        desc:'Die erste Aufgabe im Code-Labor gelöst.' },
  { id:'lab_perfekt5',icon:'✅', name:'Kompiliert beim ersten Mal', desc:'Fünf Laboraufgaben ohne Fehlversuch und ohne Tipp gelöst.' },
  { id:'lab_combo5',  icon:'🔥', name:'Flow-State',          desc:'Fünf Laboraufgaben in Folge fehlerfrei.' },
  { id:'lab_bug',     icon:'🐞', name:'Bug-Jäger',           desc:'Alle Bug-Jagden im Code-Labor gelöst.' },
  { id:'lab_boss',    icon:'🛡️', name:'Security-Champion',   desc:'Den Boss „Security-Review“ besiegt.' },
  { id:'lab_kata3',   icon:'🥋', name:'Dojo-Serie',          desc:'An drei Tagen in Folge das Daily Dojo gemeistert.' },
  { id:'lab_all',     icon:'🏆', name:'Full-Stack',          desc:'Alle Aufgaben im Code-Labor gelöst.' }
].forEach(function(b){ if(!BADGE_BY_ID[b.id]){ BADGES.push(b); BADGE_BY_ID[b.id] = b; } });

function labAbzeichenPruefen(){
  var n = labAnzahlGeloest();
  if(n >= 1) grantBadge('lab_first');
  if((state.xpLog['lab:perfekt'] || 0) >= 5) grantBadge('lab_perfekt5');
  if((state.xpLog['lab:combo'] || 0) >= 5) grantBadge('lab_combo5');
  if(LABOR.filter(function(t){ return t.typ === 'bug'; }).every(function(t){ return labGeloest(t.id); })) grantBadge('lab_bug');
  if(labGeloest('lab-boss-review')) grantBadge('lab_boss');
  if(labKataSerie() >= 3) grantBadge('lab_kata3');
  if(n === LABOR.length) grantBadge('lab_all');
}

/* ---------- Labor-Uebersicht ---------- */
var LAB_TRACKS = [
  { name:'AP1-Basics',       wer:function(t){ return !/^m(4[2-9]|5\d)-/.test(t.lektion); } },
  { name:'PHP-Grundlagen',   wer:function(t){ return /^m4[234]-/.test(t.lektion) && t.stufe < 4; } },
  { name:'Laravel',          wer:function(t){ return /^m(4[5-9]|5\d)-/.test(t.lektion) && t.stufe < 4; } },
  { name:'Boss',             wer:function(t){ return t.stufe === 4; } }
];

function labHudHtml(){
  var n = labAnzahlGeloest(), xp = LABOR.filter(function(t){ return labGeloest(t.id); })
    .reduce(function(a, t){ return a + LAB_XP[t.stufe]; }, 0);
  return '<div class="lab-hud" id="labHud">' +
    '<div class="stat-tile"><div class="num">' + n + '/' + LABOR.length + '</div><div class="lbl">Aufgaben gelöst</div></div>' +
    '<div class="stat-tile"><div class="num lab-combo' + (lab.combo >= 3 ? ' heiss' : '') + '">' + (lab.combo >= 3 ? '🔥 ' : '') + '×' + lab.combo + '</div><div class="lbl">Combo · Rekord ×' + (state.xpLog['lab:combo'] || 0) + '</div></div>' +
    '<div class="stat-tile"><div class="num">' + (state.xpLog['lab:perfekt'] || 0) + '</div><div class="lbl">fehlerfrei gelöst</div></div>' +
    '<div class="stat-tile"><div class="num">🥋 ' + labKataSerie() + '</div><div class="lbl">Tage Dojo-Serie</div></div>' +
    '<div class="stat-tile"><div class="num">~' + xp + '</div><div class="lbl">Basis-XP verdient</div></div>' +
    '</div>';
}
function labHudAktualisieren(){
  var alt = document.getElementById('labHud');
  if(alt){ var d = document.createElement('div'); d.innerHTML = labHudHtml(); alt.replaceWith(d.firstChild); }
}

function labFilter(f){ lab.filter = f; renderContent(); }
function labOeffnen(id){
  lab.offen = id;
  renderContent();
  setTimeout(function(){
    var el = document.getElementById('lab-' + id);
    if(el) el.scrollIntoView({ behavior: RB.bewegung ? 'smooth' : 'auto', block:'start' });
  }, 60);
}

function renderLabor(){
  var kata = labKata(), kataFertig = !!state.xpLog['kata:' + labHeute()];
  var h = '<div class="breadcrumb">Training</div><h1>Code-Labor</h1>' +
    '<p class="intro-sub">Programmieren lernt man nicht durch Lesen. Hier sagst du Ausgaben voraus, füllst Lücken, jagst Bugs ' +
    'und bringst Abläufe in Reihenfolge – vom AP1-Pseudocode bis zum Laravel-Security-Review. Fehlerfrei gelöst gibt es ' +
    '1,5-fache XP, jede weitere fehlerfreie Aufgabe in Folge erhöht die Combo. Ein Tipp halbiert die XP.</p>';
  h += labHudHtml();
  h += '<div class="lab-kata-karte"><span class="k-icon">🥋</span><div class="k-text"><div class="k-titel">Daily Dojo: ' + esc(kata.titel) + '</div>' +
       '<div class="k-sub">' + (kataFertig ? 'Heute erledigt – morgen wartet die nächste.' : 'Heute doppelte XP · ' + LAB_STUFEN[kata.stufe] + ' · ' + LAB_TYPEN[kata.typ]) + '</div></div>' +
       '<button class="start-btn" type="button" onclick="labOeffnen(\'' + kata.id + '\')">' + (kataFertig ? 'Ansehen' : 'Dojo betreten') + '</button></div>';

  h += '<div class="lab-tracks">' + LAB_TRACKS.map(function(tr){
    var alle = LABOR.filter(tr.wer), fertig = alle.filter(function(t){ return labGeloest(t.id); }).length;
    var pct = alle.length ? Math.round(fertig / alle.length * 100) : 0;
    return '<div class="lab-track' + (fertig === alle.length ? ' fertig' : '') + '"><div class="t-name">' + tr.name + '</div>' +
           '<div class="t-zahl">' + fertig + ' / ' + alle.length + ' gelöst</div><div class="bahn"><i style="width:' + pct + '%"></i></div></div>';
  }).join('') + '</div>';

  h += '<div class="lab-filter">' + [['alle','Alle'],['offen','Offen'],['ausgabe','Ausgabe'],['luecke','Lückentext'],['bug','Bug-Jagd'],['ordnen','Reihenfolge']]
    .map(function(f){ return '<button class="filter-btn' + (lab.filter === f[0] ? ' active' : '') + '" onclick="labFilter(\'' + f[0] + '\')">' + f[1] + '</button>'; }).join('') + '</div>';

  var liste = LABOR.filter(function(t){
    if(lab.filter === 'offen') return !labGeloest(t.id);
    if(lab.filter !== 'alle') return t.typ === lab.filter;
    return true;
  });
  [1, 2, 3, 4].forEach(function(stufe){
    var gruppe = liste.filter(function(t){ return t.stufe === stufe; });
    if(!gruppe.length) return;
    h += '<div class="lab-liste-gruppe">' + LAB_STUFEN[stufe] + '</div>';
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
}

/* Lektion: passende Aufgaben vor dem Kurz-Check einblenden */
function labInLektion(el){
  var aufgaben = LABOR.filter(function(t){ return t.lektion === state.currentId; });
  if(!aufgaben.length || el.querySelector('.lab-sektion')) return;
  var sek = document.createElement('section');
  sek.className = 'lab-sektion';
  sek.innerHTML = '<h3>Code-Labor <span class="lab-badge-neu">' + aufgaben.length + (aufgaben.length === 1 ? ' AUFGABE' : ' AUFGABEN') + '</span></h3>' +
    aufgaben.map(labAufgabeHtml).join('');
  var quiz = el.querySelector('.quiz');
  if(quiz) quiz.parentNode.insertBefore(sek, quiz); else el.appendChild(sek);
}

/* ---------- Teilen ---------- */
function rbLinkZu(ansicht){
  var basis = location.href.split('#')[0];
  return basis + (ansicht ? '#/' + ansicht : '');
}
function rbTeilenText(){
  var lp = levelProgress();
  return 'Ich lerne mit ROOTPFAD für die AP1: Rang „' + lp.cur.name + '“, ' + (state.xp || 0) + ' XP, ' +
         state.completed.size + '/' + TOTAL + ' Lektionen, ' + labAnzahlGeloest() + ' Laboraufgaben gelöst.';
}
function rbKopieren(text, knopf){
  try{
    navigator.clipboard.writeText(text).then(function(){
      if(knopf){ var alt = knopf.textContent; knopf.textContent = 'Kopiert!'; setTimeout(function(){ knopf.textContent = alt; }, 1400); }
    });
  }catch(e){}
}

function rbErfolgskarte(){
  var c = document.createElement('canvas');
  c.width = 1200; c.height = 630;
  var g = c.getContext('2d');
  var bg = g.createLinearGradient(0, 0, 1200, 630);
  bg.addColorStop(0, '#16161e'); bg.addColorStop(1, '#1a1b26');
  g.fillStyle = bg; g.fillRect(0, 0, 1200, 630);
  /* Hoehenlinien als ruhiger Hintergrund */
  g.strokeStyle = 'rgba(122,162,247,0.10)'; g.lineWidth = 2;
  for(var r = 60; r < 900; r += 46){ g.beginPath(); g.ellipse(1040, 120, r * 1.4, r, -0.3, 0, Math.PI * 2); g.stroke(); }
  var lp = levelProgress();
  g.fillStyle = '#7aa2f7'; g.font = '700 30px "IBM Plex Sans", system-ui, sans-serif';
  g.fillText('R O O T P F A D', 80, 100);
  g.fillStyle = '#565f89'; g.font = '500 22px "IBM Plex Mono", monospace';
  g.fillText('AP1 · Fachinformatik Anwendungsentwicklung', 80, 138);
  g.font = '120px system-ui, "Apple Color Emoji", "Segoe UI Emoji"'; g.fillText(lp.cur.icon, 80, 320);
  g.fillStyle = '#c0caf5'; g.font = '700 64px "Source Serif 4", Georgia, serif';
  g.fillText(lp.cur.name, 240, 290);
  g.fillStyle = '#bb9af7'; g.font = '600 26px "IBM Plex Mono", monospace';
  g.fillText('Level ' + lp.cur.lvl + ' · ' + (state.xp || 0).toLocaleString('de-DE') + ' XP', 244, 336);
  var werte = [
    [state.completed.size + '/' + TOTAL, 'Lektionen', '#7aa2f7'],
    [labAnzahlGeloest() + '/' + LABOR.length, 'Laboraufgaben', '#9ece6a'],
    [Object.keys(state.badges || {}).length + '', 'Abzeichen', '#e0af68'],
    [((state.streak && state.streak.count) || 0) + '', 'Tage in Folge', '#ff9e64']
  ];
  werte.forEach(function(w, i){
    var x = 80 + i * 270, y = 440;
    g.fillStyle = 'rgba(41,46,66,0.75)'; g.beginPath(); g.roundRect(x, y, 240, 120, 16); g.fill();
    g.fillStyle = w[2]; g.font = '700 44px "IBM Plex Mono", monospace'; g.fillText(w[0], x + 24, y + 62);
    g.fillStyle = '#a9b1d6'; g.font = '500 20px "IBM Plex Sans", system-ui, sans-serif'; g.fillText(w[1], x + 24, y + 96);
  });
  return c;
}

function rbTeilenOeffnen(){
  rbTeilenSchliessen();
  var ansicht = state.currentId, lokal = location.protocol === 'file:';
  var titel = (lessonById(ansicht) || {}).title || ({ intro:'Kursübersicht', heute:'Heute', labor:'Code-Labor', profile:'Profil' })[ansicht] || 'ROOTPFAD';
  var link = rbLinkZu(ansicht);
  var d = document.createElement('div');
  d.className = 'rb-dialog-abdeckung';
  d.id = 'rbTeilen';
  d.innerHTML =
    '<div class="rb-dialog" role="dialog" aria-modal="true" aria-labelledby="rbTeilenTitel">' +
    '<button class="zu" type="button" aria-label="Schließen" onclick="rbTeilenSchliessen()">×</button>' +
    '<h2 id="rbTeilenTitel">Teilen</h2><p style="color:var(--text-dim);margin:0;">' + esc(titel) + '</p>' +
    '<h3>Link zu dieser Ansicht</h3>' +
    '<div class="rb-zeile"><input readonly value="' + esc(link) + '" onfocus="this.select()">' +
    '<button class="ex-btn" type="button" onclick="rbKopieren(\'' + link.replace(/'/g, "\\'") + '\', this)">Kopieren</button>' +
    (navigator.share && !lokal ? '<button class="ex-btn primary" type="button" onclick="navigator.share({title:\'ROOTPFAD\',url:\'' + link.replace(/'/g, "\\'") + '\'}).catch(function(){})">Teilen …</button>' : '') +
    '</div>' +
    (lokal ? '<div class="rb-hinweis"><strong>Diese Seite liegt nur auf deinem Rechner.</strong> Ein file://-Link funktioniert bei anderen nicht. ' +
      'So machst du ROOTPFAD für andere erreichbar:<ol>' +
      '<li><strong>claude.ai:</strong> Datei als Artifact hochladen und dort „Veröffentlichen“ – der Tutor läuft dann über das Konto der Betrachter.</li>' +
      '<li><strong>Netlify Drop</strong> (app.netlify.com/drop): die HTML-Datei hineinziehen, du bekommst sofort eine https-Adresse.</li>' +
      '<li><strong>GitHub Pages</strong> oder dein eigener Webspace: Datei als index.html hochladen.</li></ol>' +
      'Danach führt der Link oben direkt in diese Lektion.</div>' : '') +
    '<h3>Erfolgskarte</h3><div id="rbKarteHost"></div>' +
    '<div class="rb-zeile" style="flex-wrap:wrap;">' +
    '<button class="ex-btn primary" type="button" onclick="rbKarteSpeichern()">Als Bild speichern</button>' +
    '<button class="ex-btn" type="button" id="rbKarteTeilen" onclick="rbKarteTeilen()" hidden>Bild teilen …</button>' +
    '<button class="ex-btn" type="button" onclick="rbKopieren(rbTeilenText(), this)">Text kopieren</button></div>' +
    '</div>';
  d.addEventListener('click', function(e){ if(e.target === d) rbTeilenSchliessen(); });
  d.addEventListener('keydown', function(e){ if(e.key === 'Escape') rbTeilenSchliessen(); else fokusFalle(d, e); });
  document.body.appendChild(d);
  var karte = rbErfolgskarte();
  var img = document.createElement('img');
  img.className = 'rb-karte-vorschau'; img.alt = 'Erfolgskarte: ' + rbTeilenText();
  img.src = karte.toDataURL('image/png');
  document.getElementById('rbKarteHost').appendChild(img);
  try{
    karte.toBlob(function(b){
      var f = new File([b], 'rootpfad-erfolg.png', { type:'image/png' });
      if(navigator.canShare && navigator.canShare({ files:[f] })){
        RB.karteDatei = f; document.getElementById('rbKarteTeilen').hidden = false;
      }
    });
  }catch(e){}
  RB.karteUrl = img.src;
  var erstes = d.querySelector('input');
  if(erstes) erstes.focus();
}
function rbTeilenSchliessen(){ var d = document.getElementById('rbTeilen'); if(d) d.remove(); }
function rbKarteSpeichern(){
  var a = document.createElement('a');
  a.href = RB.karteUrl; a.download = 'rootpfad-erfolg.png';
  document.body.appendChild(a); a.click(); a.remove();
}
function rbKarteTeilen(){
  if(RB.karteDatei) navigator.share({ files:[RB.karteDatei], text: rbTeilenText() }).catch(function(){});
}

/* ---------- Deep Links: #/m42-l2, #/labor ---------- */
function rbHashAnsicht(){
  var h = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
  if(!h) return null;
  if(h === 'labor' || h === 'intro' || h === 'heute' || h === 'exam' || h === 'review' || h === 'profile' || lessonById(h)) return h;
  return null;
}
window.addEventListener('hashchange', function(){
  var z = rbHashAnsicht();
  if(z && z !== state.currentId) selectLesson(z);
});

/* ---------- Tutor: auch ohne KI sichtbar, mit Einrichtung ---------- */
var RB_LOKAL_TUTOR = 'http://localhost:8787/tutor';
function rbTutorKnopf(){
  var k = document.getElementById('dockKnopf');
  if(!k || !tutor.ready) return;
  if(tutor.off){
    k.hidden = false;
    k.classList.add('rb-offline');
    k.onclick = function(){ selectLesson('tutor'); };
  } else {
    k.classList.remove('rb-offline');
    k.onclick = dockUmschalten;
    if(!dock.offen) k.hidden = false;
  }
}
async function rbLokalenTutorTesten(){
  var el = document.getElementById('rbTutorStatus');
  if(el){ el.className = 'rb-status'; el.textContent = 'prüfe …'; }
  try{
    var r = await fetch(RB_LOKAL_TUTOR.replace(/\/tutor$/, '/health'), { cache:'no-store' });
    var d = await r.json();
    if(!d.ok) throw new Error('kein ok');
    if(el){ el.className = 'rb-status ok'; el.textContent = 'erreichbar · Modell ' + (d.modell || '?'); }
    KI.modus = 'auto'; KI.endpunkt = RB_LOKAL_TUTOR; kiSpeichern();
    await tutorNeuVerbinden();
    rbTutorKnopf();
  }catch(e){
    if(el){ el.className = 'rb-status nein'; el.textContent = 'nicht erreichbar – läuft der Server? (siehe unten)'; }
  }
}
var rbTutorOriginal = renderTutor;
renderTutor = function(){
  if(!tutor.off) return rbTutorOriginal.apply(this, arguments);
  return '<div class="breadcrumb">Training</div><h1>AP1-Tutor</h1>' +
    '<p class="intro-sub">Der Tutor braucht eine KI im Hintergrund. Auf claude.ai übernimmt das automatisch das Konto der Person, ' +
    'die den Kurs öffnet. Als lokale Datei fehlt diese Verbindung – deshalb war der Knopf unten rechts bisher unsichtbar. ' +
    'Drei Wege, ihn einzuschalten:</p>' +
    '<div class="rb-tutor-wege">' +
    '<div class="rb-tutor-weg"><h3>1 · Auf claude.ai öffnen</h3><p>Datei als Artifact hochladen. Der Tutor funktioniert sofort, ' +
    'für dich und für alle, mit denen du den Link teilst – jede Person nutzt ihr eigenes Konto.</p></div>' +
    '<div class="rb-tutor-weg"><h3>2 · Lokaler Tutor-Server (dein API-Schlüssel)</h3>' +
    '<p>Im Ordner <code>Downloads/rootpfad-tutor</code> liegt ein kleiner Server. Einmalig <code>npm install</code>, ' +
    'dann mit deinem Schlüssel starten:</p>' +
    codeBlock('cd ~/Downloads/rootpfad-tutor\nnpm install\nANTHROPIC_API_KEY=sk-ant-... npm start', 'Bash') +
    '<div class="rb-zeile" style="align-items:center;"><button class="ex-btn primary" type="button" onclick="rbLokalenTutorTesten()">Mit lokalem Server verbinden</button>' +
    '<span id="rbTutorStatus" class="rb-status"></span></div></div>' +
    '<div class="rb-tutor-weg"><h3>3 · Eigener Dienst auf einem Server</h3><p>Für einen öffentlich gehosteten Kurs: ' +
    'denselben Server hinter HTTPS betreiben und die Adresse hier eintragen.</p></div>' +
    '</div>' + renderKiEinstellungen();
};

/* ---------- Einhaengen ---------- */
(function(){
  var internOriginal = renderContentIntern;
  renderContentIntern = function(){
    if(state.currentId === 'labor'){
      document.getElementById('content').innerHTML = renderLabor();
      return;
    }
    return internOriginal.apply(this, arguments);
  };

  /* Navigation: Code-Labor unter Training */
  var ue = document.getElementById('navExercises');
  if(ue && !document.getElementById('navLabor')){
    var b = document.createElement('button');
    b.className = 'nav-link'; b.id = 'navLabor'; b.type = 'button';
    b.innerHTML = '<svg class="icn" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>' +
                  'Code-Labor <span class="lab-neu">NEU</span>';
    b.onclick = function(){ selectLesson('labor'); };
    ue.parentNode.insertBefore(b, ue);
  }

  /* Teilen-Knopf in der Kopfzeile */
  var rechts = document.querySelector('.topbar-right');
  if(rechts && !document.getElementById('rbTeilenKnopf')){
    var t = document.createElement('button');
    t.className = 'rb-teilen-knopf'; t.id = 'rbTeilenKnopf'; t.type = 'button';
    t.setAttribute('aria-label', 'Teilen');
    t.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>' +
                  '<circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg><span class="t">Teilen</span>';
    t.onclick = rbTeilenOeffnen;
    rechts.insertBefore(t, rechts.firstChild);
  }

  var vorher = rbAnreichern;
  rbAnreichern = function(){
    vorher();
    var el = document.getElementById('content');
    if(el && lessonById(state.currentId)) labInLektion(el);
    var nl = document.getElementById('navLabor');
    if(nl){
      var an = state.currentId === 'labor';
      nl.className = 'nav-link' + (an ? ' active' : '');
      if(an) nl.setAttribute('aria-current', 'page'); else nl.removeAttribute('aria-current');
    }
    if(state.currentId !== 'labor') lab.offen = null;
    rbTutorKnopf();
  };

  /* Warten, bis der Kurs seinen Stand geladen hat: dann Deep Link anwenden
     und den Tutor-Knopf richtig setzen. */
  var versuche = 0;
  var warten = setInterval(function(){
    versuche++;
    var bereit = document.getElementById('moduleNav') && document.getElementById('moduleNav').children.length;
    if(!bereit && versuche < 100) return;
    clearInterval(warten);
    setTimeout(function(){
      var z = rbHashAnsicht();
      if(z && z !== state.currentId) selectLesson(z);
      else if(state.currentId === 'labor') render();
      rbTutorKnopf();
    }, 250);
  }, 100);
  var tutorWarten = setInterval(function(){
    if(typeof tutor !== 'undefined' && tutor.ready){ clearInterval(tutorWarten); rbTutorKnopf(); }
  }, 300);
  setTimeout(function(){ clearInterval(tutorWarten); }, 20000);
})();
