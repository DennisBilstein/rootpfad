function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function relBadge(r){
  if(!r) return '';
  var c = r === 'sehr hoch' ? 'r-hoch2' : (r === 'hoch' ? 'r-hoch' : 'r-mittel');
  return '<span class="relevanz '+c+'" title="Wie oft dieses Thema in AP1-Prüfungen vorkam">Prüfungsrelevanz: '+esc(r)+'</span>';
}
function codeBlock(code, lang){
  lang = lang || 'Pseudocode';
  return '<div class="code-block"><div class="code-head"><span class="code-lang">'+esc(lang)+'</span><button class="copy-btn" onclick="copyCode(this)">Kopieren</button></div><pre><code>'+esc(code)+'</code></pre></div>';
}
function copyCode(btn){
  var code = btn.closest('.code-block').querySelector('code').textContent;
  try{
    navigator.clipboard.writeText(code).then(function(){
      var old = btn.textContent; btn.textContent = 'Kopiert!';
      setTimeout(function(){ btn.textContent = old; }, 1400);
    }).catch(function(){});
  }catch(e){}
}
var MODULES=[];
MODULES.push({
  id:'m1', part:1, partTitle:'Algorithmen & Programmierlogik', title:'Pseudocode & Kontrollstrukturen', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m1-l1', title:'Was ein Algorithmus ist – und was die IHK dazu fragt', minutes:8,
      body:
        '<p>Ein <strong>Algorithmus</strong> ist eine eindeutige, endliche Handlungsvorschrift zur Lösung eines Problems. Die fünf Eigenschaften werden regelmäßig als Definitionsfrage geprüft:</p>'+
        '<ul><li><strong>Eindeutigkeit</strong> (Determiniertheit) – jeder Schritt ist klar beschrieben, kein Interpretationsspielraum.</li>'+
        '<li><strong>Endlichkeit</strong> (Finitheit) – die Beschreibung ist endlich lang.</li>'+
        '<li><strong>Terminierung</strong> – der Ablauf endet nach endlich vielen Schritten.</li>'+
        '<li><strong>Determinismus</strong> – bei gleicher Eingabe immer derselbe Ablauf.</li>'+
        '<li><strong>Allgemeingültigkeit</strong> – löst nicht nur einen Einzelfall, sondern eine ganze Problemklasse.</li></ul>'+
        '<p>In der AP1 wird Pseudocode <strong>sprachunabhängig</strong> notiert. Ein Syntax-Beiblatt liegt der Prüfung bei – du musst also keine Schreibweise auswendig lernen. Bewertet wird die <strong>Logik</strong>, nicht das Semikolon.</p>',
      code:
        "FUNCTION summeGerade(zahlen)\n"+
        "  summe <- 0\n"+
        "  FOR EACH zahl IN zahlen DO\n"+
        "    IF zahl MOD 2 = 0 THEN\n"+
        "      summe <- summe + zahl\n"+
        "    ENDIF\n"+
        "  ENDFOR\n"+
        "  RETURN summe\n"+
        "ENDFUNCTION",
      codeLang:'Pseudocode',
      tip:'Die AP1 prüft Algorithmen fast immer in einer von drei Formen: Du sollst Pseudocode schreiben, vorgegebenen Code lesen und das Ergebnis vorhersagen, oder einen Fehler darin finden. Alle drei trainierst du mit derselben Fähigkeit – dem Trockenlauf. Wer eine Wertetabelle anlegt und Zeile für Zeile durchgeht, löst alle drei Varianten sicher.',
      quiz:[
        {q:'Was bedeutet die Eigenschaft „Terminierung" eines Algorithmus?', options:['Er hat höchstens 100 Zeilen','Er endet nach endlich vielen Schritten','Er enthält keine Schleifen'], correct:1, explain:'Endlichkeit meint die Länge der Beschreibung, Terminierung das tatsächliche Ende des Ablaufs.'},
        {q:'Wonach wird Pseudocode in der AP1 bewertet?', options:['Nach exakter Syntax einer Sprache','Nach der Logik – ein Syntax-Beiblatt liegt bei','Nach der Zeilenzahl'], correct:1, explain:'Die Notation ist sprachunabhängig; entscheidend ist der nachvollziehbare Ablauf.'},
        {q:'Ein Algorithmus liefert bei identischer Eingabe zweimal ein anderes Ergebnis. Welche Eigenschaft fehlt?', options:['Endlichkeit','Determiniertheit','Allgemeingültigkeit'], correct:1, explain:'Determiniertheit betrifft das Ergebnis, Determinismus den Ablauf — beides wird gern verwechselt.'}
      ]
    },
    {
      id:'m1-l2', title:'Die drei Kontrollstrukturen', minutes:9,
      body:
        '<p>Nach dem <strong>Satz von Böhm-Jacopini</strong> lässt sich jeder Algorithmus aus nur drei Bausteinen aufbauen. Mehr brauchst du nie:</p>'+
        '<ul><li><strong>Sequenz</strong> – Anweisungen nacheinander.</li>'+
        '<li><strong>Selektion</strong> (Verzweigung) – <code>IF … THEN … ELSE … ENDIF</code>. Genau ein Zweig wird ausgeführt, nie beide.</li>'+
        '<li><strong>Iteration</strong> (Schleife) – etwas wird wiederholt.</li></ul>'+
        '<p>Bei den Schleifen musst du drei Arten sicher unterscheiden – das ist eine klassische Prüfungsfrage:</p>'+
        '<table class="lesson-table"><tr><th>Art</th><th>Prüfung der Bedingung</th><th>Mindestdurchläufe</th></tr>'+
        '<tr><td>Kopfgesteuert (WHILE)</td><td>vor dem Durchlauf</td><td>0</td></tr>'+
        '<tr><td>Fußgesteuert (REPEAT UNTIL)</td><td>nach dem Durchlauf</td><td>1</td></tr>'+
        '<tr><td>Zählschleife (FOR)</td><td>feste Anzahl</td><td>bekannt im Voraus</td></tr></table>',
      code:
        "// Kopfgesteuert – kann nullmal laufen\n"+
        "WHILE guthaben > 0 DO\n"+
        "  guthaben <- guthaben - 1\n"+
        "ENDWHILE\n\n"+
        "// Fussgesteuert – laeuft mindestens einmal\n"+
        "REPEAT\n"+
        "  eingabe <- leseZahl()\n"+
        "UNTIL eingabe > 0\n\n"+
        "// Zaehlschleife – feste Anzahl\n"+
        "FOR i <- 1 TO 10 DO\n"+
        "  AUSGABE i\n"+
        "ENDFOR",
      codeLang:'Pseudocode',
      tip:'Die Unterscheidung kopf- und fußgesteuert wird gern an einem praktischen Beispiel geprüft: Eine Benutzereingabe, die geprüft werden soll, gehört in eine fußgesteuerte Schleife – man muss ja erst einmal etwas eingeben, bevor man prüfen kann. Eine Verarbeitung einer möglicherweise leeren Liste gehört in eine kopfgesteuerte Schleife, denn bei null Elementen darf der Rumpf gar nicht laufen.',
      quiz:[
        {q:'Wie oft läuft eine fußgesteuerte Schleife mindestens?', options:['Nullmal','Einmal','Zweimal'], correct:1, explain:'Die Bedingung wird erst nach dem Durchlauf geprüft – der Rumpf läuft also garantiert einmal.'},
        {q:'Aus welchen drei Bausteinen besteht jeder Algorithmus?', options:['Sequenz, Selektion, Iteration','Eingabe, Verarbeitung, Ausgabe','Variable, Funktion, Klasse'], correct:0, explain:'Das ist der Satz von Böhm-Jacopini – EVA beschreibt dagegen den Datenfluss, nicht die Kontrollstruktur.'},
        {q:'Welche Kontrollstruktur fehlt in der Aufzählung Sequenz und Verzweigung?', options:['Die Zuweisung','Die Wiederholung (Schleife)','Der Sprung'], correct:1, explain:'Nach Böhm-Jacopini genügen genau diese drei, um jeden Algorithmus zu formulieren — Sprünge braucht es nie.'}
      ]
    },
    {
      id:'m1-l3', title:'Variablen, Datentypen und Operatoren', minutes:8,
      body:
        '<p>Für die AP1 genügt ein kompaktes Typ-Wissen:</p>'+
        '<table class="lesson-table"><tr><th>Typ</th><th>Inhalt</th><th>Typische Größe</th></tr>'+
        '<tr><td>Integer</td><td>Ganzzahl</td><td>4 Byte (32 Bit)</td></tr>'+
        '<tr><td>Float / Double</td><td>Kommazahl</td><td>4 / 8 Byte</td></tr>'+
        '<tr><td>Boolean</td><td>true / false</td><td>1 Bit</td></tr>'+
        '<tr><td>Char</td><td>ein Zeichen</td><td>1 Byte (ASCII)</td></tr>'+
        '<tr><td>String</td><td>Zeichenkette</td><td>variabel</td></tr></table>'+
        '<p>Die beiden Operatoren, die in Prüfungen den Unterschied machen:</p>'+
        '<ul><li><strong>MOD</strong> (Modulo) liefert den <em>Rest</em> einer Division. <code>7 MOD 2 = 1</code>. Damit prüft man Teilbarkeit: <code>zahl MOD 2 = 0</code> heißt „gerade".</li>'+
        '<li><strong>DIV</strong> (Ganzzahldivision) schneidet die Nachkommastellen ab. <code>7 DIV 2 = 3</code>, nicht 3,5.</li></ul>'+
        '<p>Zuweisung (<code>&lt;-</code> oder <code>:=</code>) und Vergleich (<code>=</code> bzw. <code>==</code>) werden häufig verwechselt – in Fehlersuchaufgaben ist genau das oft der eingebaute Fehler.</p>',
      code:
        "// Das Standardmuster zum Zerlegen von Zahlen\n"+
        "quersumme <- 0\n"+
        "zahl <- 4712\n"+
        "WHILE zahl > 0 DO\n"+
        "  quersumme <- quersumme + (zahl MOD 10)   // letzte Ziffer\n"+
        "  zahl <- zahl DIV 10                      // Ziffer abschneiden\n"+
        "ENDWHILE\n"+
        "// Ergebnis: 4 + 7 + 1 + 2 = 14",
      codeLang:'Pseudocode',
      tip:'Das Paar MOD 10 und DIV 10 ist das universelle Werkzeug zum Zerlegen von Zahlen und kommt in AP1-Aufgaben immer wieder vor – als Quersumme, als Prüfziffernberechnung, als Ziffernumkehr. Mit MOD 2 und DIV 2 wird daraus die Umwandlung ins Binärsystem. Wer dieses eine Muster beherrscht, löst eine ganze Aufgabenfamilie.',
      quiz:[
        {q:'Was ergibt 17 MOD 5?', options:['3','2','3,4'], correct:1, explain:'17 = 3 × 5 + 2 – Modulo liefert den Rest, also 2.'},
        {q:'Was ergibt 17 DIV 5?', options:['3','2','3,4'], correct:0, explain:'Die Ganzzahldivision schneidet ab: 3, nicht 3,4.'},
        {q:'Was ergibt in Pseudocode der Ausdruck 7 / 2 bei zwei Ganzzahlen?', options:['3,5 in jedem Fall','Je nach Sprache 3 (Ganzzahldivision) — im Zweifel das Syntax-Beiblatt prüfen','Einen Fehler'], correct:1, explain:'Genau diese Zeile ist eine Standardfalle: Der Code läuft und rechnet trotzdem falsch.'}
      ]
    },
    {
      id:'m1-l4', title:'Arrays und Indizes – die Off-by-one-Falle', minutes:8,
      body:
        '<p>Ein <strong>Array</strong> ist eine nummerierte Sammlung gleichartiger Werte. Der Index beginnt in praktisch allen Sprachen bei <strong>0</strong> – ein Array mit n Elementen hat also die Indizes <strong>0 bis n−1</strong>.</p>'+
        '<p>Daraus folgt die wichtigste Regel für Schleifengrenzen: <code>FOR i &lt;- 0 TO laenge − 1</code> bzw. <code>WHILE i &lt; laenge</code>. Ein <code>&lt;=</code> greift einen Schritt zu weit und erzeugt den klassischen <strong>Off-by-one-Fehler</strong> – in echten Sprachen eine ArrayIndexOutOfBoundsException.</p>'+
        '<p><strong>Zweidimensionale Arrays</strong> werden mit <code>array[zeile][spalte]</code> angesprochen – erst die Zeile, dann die Spalte. In AP1-Aufgaben stehen sie oft für Tabellen, bei denen Spalte 0 eine ID enthält und die übrigen Spalten Nutzdaten.</p>',
      code:
        "// Element suchen und Index zurueckgeben\n"+
        "FUNCTION findeIndex(zahlen, gesucht)\n"+
        "  FOR i <- 0 TO LAENGE(zahlen) - 1 DO\n"+
        "    IF zahlen[i] = gesucht THEN\n"+
        "      RETURN i\n"+
        "    ENDIF\n"+
        "  ENDFOR\n"+
        "  RETURN -1        // Konvention: nicht gefunden\n"+
        "ENDFUNCTION\n\n"+
        "// Zweidimensional: berechtigung[zeile][spalte]\n"+
        "// Spalte 0 = Mitarbeiter-ID, ab Spalte 1 die Raumnummern",
      codeLang:'Pseudocode',
      tip:'Die Rückgabe von −1 für „nicht gefunden" ist eine feste Konvention, die die IHK erwartet. Warum nicht 0? Weil 0 ein gültiger Index ist – der erste. Ein Rückgabewert, der als Index unmöglich ist, kann nicht mit einem Treffer verwechselt werden. Dieselbe Konvention findest du in vielen Programmiersprachen bei der Indexsuche wieder.',
      quiz:[
        {q:'Welche Indizes hat ein Array mit 8 Elementen?', options:['1 bis 8','0 bis 8','0 bis 7'], correct:2, explain:'Start bei 0, letzter Index ist Länge minus 1.'},
        {q:'Warum lautet die Schleifenbedingung i < laenge und nicht i <= laenge?', options:['Aus Stilgründen','Weil sonst auf einen nicht existierenden Index zugegriffen wird','Weil die Schleife sonst nicht startet'], correct:1, explain:'Der klassische Off-by-one-Fehler.'},
        {q:'Ein Array wird mit FUER i VON 0 BIS LAENGE durchlaufen. Was passiert?', options:['Alles korrekt','Ein Zugriff über das Ende hinaus im letzten Durchlauf','Der erste Wert fehlt'], correct:1, explain:'Korrekt ist BIS LAENGE − 1 — der klassische Off-by-one-Fehler.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m2', part:1, partTitle:'Algorithmen & Programmierlogik', title:'Struktogramm & Programmablaufplan', relevanz:'hoch',
  lessons:[
    {
      id:'m2-l1', title:'Struktogramme (Nassi-Shneiderman) sicher zeichnen', minutes:9,
      body:
        '<p>Ein <strong>Struktogramm</strong> stellt Algorithmen als ineinander geschachtelte Kästen dar. Es gibt keine Pfeile und keine Sprünge – die <strong>Einrückung zeigt die Verschachtelung</strong>. Was innerhalb eines Schleifenkastens steht, wird bei jedem Durchlauf erneut ausgeführt.</p>'+
        '<p>Die drei Grundformen:</p>'+
        '<ul><li><strong>Sequenz</strong> – Kästen untereinander, von oben nach unten abgearbeitet.</li>'+
        '<li><strong>Verzweigung</strong> – ein Kasten mit diagonalem Strich, links „ja", rechts „nein". Genau ein Zweig läuft.</li>'+
        '<li><strong>Schleife</strong> – ein umrahmender Kasten mit der Bedingung oben (kopfgesteuert) oder unten (fußgesteuert); der Rumpf ist eingerückt.</li></ul>'+
        '<p>In der Prüfung ist meist ein Gerüst vorgegeben und du ergänzt die fehlenden Zeilen – jede Zeile ist dann ein Punkt, Schleifenköpfe mit mehreren Bedingungen oft zwei.</p>'+
        '<figure class="fig"><svg viewBox="0 0 520 260" role="img" aria-label="Struktogramm mit Sequenz, Schleife und Verzweigung"><rect class="s-box" x="20" y="16" width="480" height="34"/><text class="s-mono" x="34" y="38">Eingabe: wert</text><rect class="s-box" x="20" y="50" width="480" height="34"/><text class="s-mono" x="34" y="72">summe &#8592; 0</text><rect class="s-accent" x="20" y="84" width="480" height="34"/><text class="s-mono" x="34" y="106">SOLANGE i &lt; n</text><rect class="s-box" x="44" y="118" width="456" height="34"/><text class="s-mono" x="58" y="140">summe &#8592; summe + feld[i]</text><rect class="s-box" x="20" y="152" width="480" height="72"/><line class="s-line" x1="20" y1="152" x2="260" y2="186"/><line class="s-line" x1="500" y1="152" x2="260" y2="186"/><line class="s-line" x1="260" y1="186" x2="260" y2="224"/><text class="s-mono" x="200" y="170">summe &gt; 100 ?</text><text class="s-lbl" x="60" y="182">JA</text><text class="s-lbl" x="440" y="182">NEIN</text><text class="s-mono" x="60" y="212">Warnung</text><text class="s-mono" x="300" y="212">Ausgabe summe</text><rect class="s-box" x="20" y="224" width="480" height="34"/><text class="s-mono" x="34" y="246">Ende</text></svg><figcaption>Sequenz stapelt sich von oben nach unten. Die Schleife umschliesst ihren Rumpf links, die Verzweigung teilt den Block diagonal. Kein Pfeil, kein Sprung.</figcaption></figure>',
      code:
        "1  launchTask(result[])\n"+
        "2    int i = 0\n"+
        "3    bool notaus = getEmergencyStop()\n"+
        "4    setRollerDim(result[0], result[1], result[2])\n"+
        "5    wiederhole solange i < result[3] UND notaus = false\n"+
        "6  |    rollerStart()\n"+
        "7  |    notaus = getEmergencyStop()      <- MUSS in der Schleife stehen\n"+
        "8  |    i = i + 1                        <- sonst Endlosschleife\n",
      codeLang:'Struktogramm (Herbst 2022)',
      tip:'Das Beispiel stammt aus einer echten Prüfung und enthält den Kern fast aller Struktogramm-Aufgaben: Zeile 7 ist die eigentliche Prüfungsleistung. Wird der Notaus nur einmal vor der Schleife abgefragt, behält die Variable ihren Anfangswert – der Notaus während des Laufs hätte keine Wirkung. Alles, was sich während der Schleife ändern kann, muss innerhalb der Schleife neu gelesen werden.',
      quiz:[
        {q:'Was zeigt im Struktogramm die Verschachtelung an?', options:['Pfeile','Die Einrückung der Kästen','Nummerierte Sprungmarken'], correct:1, explain:'Struktogramme kennen keine Sprünge – die Schachtelung ist rein grafisch über die Einrückung dargestellt.'},
        {q:'Warum muss getEmergencyStop() innerhalb der Schleife erneut aufgerufen werden?', options:['Aus Performancegründen','Sonst bleibt die Variable auf ihrem Anfangswert und der Notaus wirkt nicht','Damit die Schleife schneller läuft'], correct:1, explain:'Genau das ist der sicherheitskritische Kern der Aufgabe.'},
        {q:'Warum kann man im Struktogramm keinen Sprung darstellen?', options:['Aus Platzgründen','Weil die Notation strukturierte Programmierung erzwingt','Sprünge sind erlaubt'], correct:1, explain:'Blöcke liegen lückenlos ineinander — genau das verhindert Spaghetticode.'}
      ]
    },
    {
      id:'m2-l2', title:'Programmablaufplan (PAP) und seine Symbole', minutes:7,
      body:
        '<p>Der <strong>Programmablaufplan</strong> (Flussdiagramm, DIN 66001) stellt denselben Inhalt mit Symbolen und Pfeilen dar. Die fünf Symbole musst du sicher zuordnen können:</p>'+
        '<table class="lesson-table"><tr><th>Symbol</th><th>Bedeutung</th></tr>'+
        '<tr><td>Oval (abgerundet)</td><td>Start und Ende (Terminator)</td></tr>'+
        '<tr><td>Rechteck</td><td>Verarbeitung / Anweisung</td></tr>'+
        '<tr><td>Parallelogramm</td><td>Ein- und Ausgabe</td></tr>'+
        '<tr><td>Raute</td><td>Verzweigung (Bedingung, ja/nein)</td></tr>'+
        '<tr><td>Pfeil</td><td>Ablaufrichtung</td></tr></table>'+
        '<p><strong>Struktogramm oder PAP – wann was?</strong> Das Struktogramm erzwingt strukturierte Programmierung (keine Sprünge möglich) und ist kompakter. Der PAP kann beliebige Sprünge darstellen, ist dadurch flexibler, aber auch anfälliger für unübersichtliche Abläufe. Schleifen erkennt man im PAP an einem Pfeil, der zurückführt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 540 250" role="img" aria-label="PAP-Symbole nach DIN 66001"><ellipse class="s-accent" cx="90" cy="34" rx="58" ry="20"/><text class="s-lbl" x="90" y="38" text-anchor="middle">Start / Ende</text><polygon class="s-box" points="200,14 330,14 310,54 180,54"/><text class="s-lbl" x="255" y="38" text-anchor="middle">Ein- / Ausgabe</text><rect class="s-box" x="380" y="14" width="140" height="40" rx="2"/><text class="s-lbl" x="450" y="38" text-anchor="middle">Verarbeitung</text><polygon class="s-accent" points="90,96 156,136 90,176 24,136"/><text class="s-lbl" x="90" y="140" text-anchor="middle">Verzweigung</text><rect class="s-box" x="190" y="112" width="130" height="48" rx="2"/><line class="s-line" x1="200" y1="112" x2="200" y2="160"/><line class="s-line" x1="310" y1="112" x2="310" y2="160"/><text class="s-lbl" x="255" y="140" text-anchor="middle">Unterprogramm</text><circle class="s-box" cx="450" cy="136" r="20"/><text class="s-lbl" x="450" y="140" text-anchor="middle">&#8594;</text><text class="s-lbl" x="450" y="176" text-anchor="middle">Konnektor</text><line class="s-arrow" x1="90" y1="196" x2="90" y2="228" marker-end="url(#ar)"/><text class="s-lbl" x="106" y="222">Pfeile zeigen die Ablaufrichtung</text><defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path class="s-head" d="M0 0 L9 4.5 L0 9 z"/></marker></defs></svg><figcaption>Die sechs Symbole des Programmablaufplans nach DIN 66001. Anders als im Struktogramm verbinden hier Pfeile die Schritte.</figcaption></figure>',
      code:'',
      tip:'Eine Merkhilfe für die Symbole, die in der Prüfung Sekunden spart: Das Parallelogramm ist „schief" – es steht für alles, was von außen hereinkommt oder nach außen geht. Das Rechteck ist „gerade" – es steht für die Arbeit im Inneren. Und die Raute ist die einzige Form mit mehr als einem Ausgang, deshalb ist sie die Verzweigung.',
      quiz:[
        {q:'Welches PAP-Symbol steht für Ein- und Ausgabe?', options:['Rechteck','Parallelogramm','Oval'], correct:1, explain:'Rechteck = Verarbeitung, Oval = Start/Ende, Raute = Verzweigung.'},
        {q:'Was ist ein Vorteil des Struktogramms gegenüber dem PAP?', options:['Es erzwingt strukturierte Programmierung ohne Sprünge','Es kann mehr Symbole darstellen','Es zeigt die Laufzeit an'], correct:0, explain:'Sprünge sind im Struktogramm gar nicht darstellbar – das ist Absicht.'},
        {q:'Welches PAP-Symbol markiert Start und Ende?', options:['Das Rechteck','Das Oval','Das Parallelogramm'], correct:1, explain:'Rechteck = Verarbeitung, Parallelogramm = Ein- und Ausgabe, Raute = Verzweigung.'}
      ]
    },
    {
      id:'m2-l3', title:'Verschachtelte Schleifen – das häufigste Prüfungsmuster', minutes:9,
      body:
        '<p>Zwei ineinander liegende Schleifen sind das mit Abstand häufigste Struktogramm-Muster der AP1: Software auf PCs verteilen, Positionen je Bestellung bearbeiten, Räume je Mitarbeiter prüfen. Das Gerüst ist immer dasselbe.</p>'+
        '<p>Die entscheidende Prüfungsfrage lautet: <strong>Wo wird der innere Zähler auf 0 gesetzt?</strong> Antwort: <em>innerhalb</em> der äußeren Schleife, direkt vor der inneren. Stünde er ganz oben, würde die innere Schleife nur beim ersten Durchlauf laufen – danach stünde der Zähler bereits am Ende.</p>',
      code:
        "1  PCNr = 0\n"+
        "2  PCListe[] = getPC()\n"+
        "3  Solange PCNr < Anzahl(PCListe)\n"+
        "4  |  SoftwareListe[] = getSoftware(PCListe[PCNr])   <- pro PC neu holen\n"+
        "5  |  SoftwareNr = 0                                 <- pro PC neu auf 0\n"+
        "6  |  Solange SoftwareNr < Anzahl(SoftwareListe)\n"+
        "7  |  |  installSoftware(SoftwareListe[SoftwareNr], PCListe[PCNr])\n"+
        "8  |  |  SoftwareNr = SoftwareNr + 1\n"+
        "9  |  PCNr = PCNr + 1",
      codeLang:'Struktogramm (Frühjahr 2022)',
      tip:'Präg dir dieses Gerüst als Ganzes ein, dann musst du es in der Prüfung nur noch mit den Namen aus der Aufgabe füllen: äußere Liste holen, äußeren Zähler auf 0, äußere Schleife, innere Liste zum aktuellen Element holen, inneren Zähler auf 0, innere Schleife, Aktion, inneren Zähler erhöhen, äußeren Zähler erhöhen. Neun Zeilen, die in fast jeder AP1 in irgendeiner Verkleidung auftauchen.',
      quiz:[
        {q:'Wo wird der Zähler der inneren Schleife initialisiert?', options:['Ganz am Anfang des Algorithmus','Innerhalb der äußeren Schleife, vor der inneren','Nach der inneren Schleife'], correct:1, explain:'Sonst liefe die innere Schleife nur beim ersten Durchgang der äußeren.'},
        {q:'Was passiert, wenn die Zählererhöhung vergessen wird?', options:['Die Schleife läuft nullmal','Endlosschleife','Die Schleife läuft genau einmal'], correct:1, explain:'Die Abbruchbedingung wird nie erreicht.'},
        {q:'Zwei verschachtelte Schleifen laufen von 1 bis n bzw. 1 bis m. Wie oft läuft der innere Rumpf?', options:['n + m','n · m','n hoch m'], correct:1, explain:'Für jeden äußeren Durchlauf läuft die innere Schleife komplett durch.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m3', part:1, partTitle:'Algorithmen & Programmierlogik', title:'Such-, Sortierverfahren & Komplexität', relevanz:'mittel',
  lessons:[
    {
      id:'m3-l1', title:'Lineare und binäre Suche', minutes:9,
      body:
        '<p>Die <strong>lineare Suche</strong> prüft jedes Element der Reihe nach. Sie funktioniert auf unsortierten Daten und braucht im schlechtesten Fall n Vergleiche – Komplexität <strong>O(n)</strong>.</p>'+
        '<p>Die <strong>binäre Suche</strong> setzt <em>sortierte</em> Daten voraus. Sie vergleicht mit dem mittleren Element und halbiert bei jedem Schritt den Suchraum – Komplexität <strong>O(log n)</strong>.</p>'+
        '<p>Der Unterschied ist dramatisch und wird gern als Rechenfrage gestellt: Bei 1024 Elementen braucht die lineare Suche bis zu 1024 Vergleiche, die binäre nur <strong>10</strong> (denn 2¹⁰ = 1024). Bei einer Million Elementen sind es 1.000.000 gegenüber 20.</p>',
      code:
        "FUNCTION binaereSuche(sortierteListe, gesucht)\n"+
        "  links  <- 0\n"+
        "  rechts <- LAENGE(sortierteListe) - 1\n"+
        "  WHILE links <= rechts DO\n"+
        "    mitte <- (links + rechts) DIV 2\n"+
        "    IF sortierteListe[mitte] = gesucht THEN\n"+
        "      RETURN mitte\n"+
        "    ELSE IF sortierteListe[mitte] < gesucht THEN\n"+
        "      links <- mitte + 1        // rechte Haelfte weitersuchen\n"+
        "    ELSE\n"+
        "      rechts <- mitte - 1       // linke Haelfte weitersuchen\n"+
        "    ENDIF\n"+
        "  ENDWHILE\n"+
        "  RETURN -1\n"+
        "ENDFUNCTION",
      codeLang:'Pseudocode',
      tip:'Die typische Anschlussfrage lautet: „Wie viele Schritte braucht die binäre Suche maximal bei n Elementen?" Die Antwort ist log₂(n), aufgerundet. Rechne sie über Zweierpotenzen im Kopf: 2¹⁰ = 1024, 2²⁰ = rund eine Million. Also 10 Schritte für tausend Elemente, 20 für eine Million, 30 für eine Milliarde. Drei Zahlen, die jede Variante dieser Frage abdecken.',
      quiz:[
        {q:'Welche Voraussetzung hat die binäre Suche?', options:['Die Daten müssen sortiert sein','Die Daten müssen eindeutig sein','Die Datenmenge muss klein sein'], correct:0, explain:'Ohne Sortierung ist die Halbierung des Suchraums nicht möglich.'},
        {q:'Wie viele Schritte braucht die binäre Suche bei 1024 sortierten Elementen maximal?', options:['1024','512','10'], correct:2, explain:'log₂(1024) = 10 – jede Halbierung entfernt die Hälfte des Suchraums.'},
        {q:'Ein unsortiertes Feld mit 500 Einträgen soll durchsucht werden. Welches Verfahren?', options:['Binäre Suche','Lineare Suche — die binäre setzt Sortierung voraus','Beides gleich gut'], correct:1, explain:'Erst sortieren und dann binär zu suchen lohnt sich nur bei mehrfacher Suche im selben Feld.'}
      ]
    },
    {
      id:'m3-l2', title:'Bubble-Sort und die Zählung der Vergleiche', minutes:9,
      body:
        '<p><strong>Bubble-Sort</strong> vergleicht benachbarte Elemente und tauscht sie bei Bedarf. Nach jedem äußeren Durchlauf steht ein weiteres Element endgültig richtig – deshalb darf die innere Schleife jedes Mal kürzer werden.</p>'+
        '<p>Die Prüfungsfrage ist selten „schreibe den Algorithmus", sondern fast immer <strong>„wie viele Vergleiche finden statt?"</strong>:</p>'+
        '<ul><li>Optimiert: (n−1) + (n−2) + … + 1 = <strong>n·(n−1)/2</strong>. Bei n = 5 also 4+3+2+1 = 10.</li>'+
        '<li>Naiv (innere Schleife immer bis n−1): (n−1)² = 16 bei n = 5.</li></ul>'+
        '<p>Beide Varianten liegen in <strong>O(n²)</strong> – die Optimierung halbiert die Arbeit, ändert aber die Komplexitätsklasse nicht.</p>',
      code:
        "PROCEDURE bubbleSort(zahlen)\n"+
        "  n <- LAENGE(zahlen)\n"+
        "  FOR i <- 1 TO n - 1 DO\n"+
        "    FOR j <- 0 TO n - i - 1 DO      // wird jede Runde kuerzer\n"+
        "      IF zahlen[j] > zahlen[j+1] THEN\n"+
        "        temp        <- zahlen[j]    // Tausch braucht\n"+
        "        zahlen[j]   <- zahlen[j+1]  // eine Hilfsvariable\n"+
        "        zahlen[j+1] <- temp\n"+
        "      ENDIF\n"+
        "    ENDFOR\n"+
        "  ENDFOR\n"+
        "ENDPROCEDURE",
      codeLang:'Pseudocode',
      tip:'Der Dreizeilen-Tausch über eine Hilfsvariable ist ein eigener Prüfungsklassiker. Wer schreibt a = b; b = a; hat den ersten Wert überschrieben und beide Variablen enthalten dasselbe. Die Hilfsvariable ist kein Umweg, sondern zwingend – es sei denn, man nutzt den Trick mit XOR oder Addition, was in der AP1 aber nie verlangt wird.',
      quiz:[
        {q:'Wie viele Vergleiche braucht optimierter Bubble-Sort bei 5 Elementen?', options:['5','10','16'], correct:1, explain:'4+3+2+1 = 10, allgemein n·(n−1)/2.'},
        {q:'Welche Komplexität hat Bubble-Sort im schlechtesten Fall?', options:['O(n)','O(n log n)','O(n²)'], correct:2, explain:'Zwei verschachtelte Schleifen über n Elemente.'},
        {q:'Was passiert beim Bubble-Sort nach dem ersten kompletten Durchlauf?', options:['Das Feld ist sortiert','Das größte Element steht ganz hinten','Das kleinste Element steht vorn'], correct:1, explain:'Deshalb kann die Obergrenze in jedem weiteren Durchlauf um eins sinken.'}
      ]
    },
    {
      id:'m3-l3', title:'Komplexität in O-Notation', minutes:8,
      body:
        '<p>Die <strong>O-Notation</strong> beschreibt, wie der Aufwand mit der Datenmenge wächst. Konstante Faktoren werden weggelassen – gefragt ist die Größenordnung, nicht die exakte Sekundenzahl.</p>'+
        '<table class="lesson-table"><tr><th>Klasse</th><th>Name</th><th>Beispiel</th></tr>'+
        '<tr><td>O(1)</td><td>konstant</td><td>Zugriff auf ein Array-Element, HashMap-Zugriff</td></tr>'+
        '<tr><td>O(log n)</td><td>logarithmisch</td><td>binäre Suche</td></tr>'+
        '<tr><td>O(n)</td><td>linear</td><td>lineare Suche, eine Schleife</td></tr>'+
        '<tr><td>O(n log n)</td><td>linear-logarithmisch</td><td>Merge-Sort, Quick-Sort (Mittel)</td></tr>'+
        '<tr><td>O(n²)</td><td>quadratisch</td><td>Bubble-Sort, zwei verschachtelte Schleifen</td></tr>'+
        '<tr><td>O(2ⁿ)</td><td>exponentiell</td><td>naive Rekursion über alle Teilmengen</td></tr></table>'+
        '<p>Die Faustregel für die Prüfung: <strong>Jede verschachtelte Schleife über dieselben n Elemente multipliziert die Komplexität.</strong> Eine Schleife = O(n), zwei ineinander = O(n²), drei = O(n³). Zwei Schleifen <em>nacheinander</em> bleiben dagegen O(n).</p>',
      code:'',
      tip:'Eine Anwendung, die diese Theorie sofort praktisch macht: Zwei verschachtelte Schleifen über 10.000 Bestellungen und 5.000 Kunden ergeben bis zu 50 Millionen Vergleiche. Baut man stattdessen einmal eine Zuordnungstabelle auf und schlägt darin nach, sinkt der Aufwand von O(n·m) auf O(n+m) – also von 50 Millionen auf 15.000 Schritte. Genau diese Optimierung wird in AP2 und im Berufsalltag ständig gebraucht.',
      quiz:[
        {q:'Zwei verschachtelte Schleifen laufen je von 1 bis n. Welche Komplexität?', options:['O(2n)','O(n²)','O(n log n)'], correct:1, explain:'Für jeden der n äußeren Durchläufe laufen n innere.'},
        {q:'Welche Komplexität hat der Zugriff auf ein Array-Element über seinen Index?', options:['O(1)','O(n)','O(log n)'], correct:0, explain:'Die Adresse wird direkt berechnet – unabhängig von der Array-Größe.'},
        {q:'Welche Komplexität hat das Ablesen eines Array-Elements über seinen Index?', options:['O(1)','O(n)','O(log n)'], correct:0, explain:'Die Adresse wird direkt berechnet — unabhängig von der Feldgröße.'}
      ]
    },
    {
      id:'m3-l4', title:'Rekursion verstehen', minutes:8,
      body:
        '<p>Eine <strong>rekursive</strong> Funktion ruft sich selbst auf. Sie braucht zwingend zwei Teile:</p>'+
        '<ul><li>die <strong>Abbruchbedingung</strong> (Basisfall), bei der nicht mehr weiter aufgerufen wird,</li>'+
        '<li>den <strong>Rekursionsschritt</strong>, der das Problem verkleinert und sich selbst aufruft.</li></ul>'+
        '<p>Jeder Aufruf legt einen eigenen Speicherbereich (Stack-Frame) mit eigenen Variablen an. Fehlt die Abbruchbedingung oder wird sie nie erreicht, wächst der Stack, bis das Programm mit einem <strong>Stack Overflow</strong> abstürzt.</p>'+
        '<p>Die typische Prüfungsfrage lautet: „Wie viele Aufrufe entstehen?" Bei <code>fakultaet(4)</code> sind es vier – für n = 4, 3, 2 und 1.</p>',
      code:
        "FUNCTION fakultaet(n)\n"+
        "  IF n <= 1 THEN\n"+
        "    RETURN 1              // Abbruchbedingung\n"+
        "  ENDIF\n"+
        "  RETURN n * fakultaet(n - 1)   // Rekursionsschritt\n"+
        "ENDFUNCTION\n\n"+
        "// Abstieg:  4 wartet auf 3 wartet auf 2 wartet auf 1\n"+
        "// Aufstieg: 1 -> 2*1=2 -> 3*2=6 -> 4*6=24",
      codeLang:'Pseudocode',
      tip:'Der Denkfehler, der beim Nachvollziehen von Rekursion fast allen passiert: Man erwartet, dass beim Abstieg gerechnet wird. Tatsächlich wird beim Abstieg nur aufgeschoben – gerechnet wird erst auf dem Rückweg, wenn die Abbruchbedingung erreicht ist. Zeichne bei Rekursionsaufgaben immer zwei Spalten: Abstieg links, Rückgabewerte rechts. Dann stimmt das Ergebnis.',
      quiz:[
        {q:'Was passiert, wenn die Abbruchbedingung fehlt?', options:['Die Funktion gibt 0 zurück','Stack Overflow durch unendlich viele Aufrufe','Der Compiler meldet einen Fehler'], correct:1, explain:'Jeder Aufruf belegt Speicher auf dem Stack, der irgendwann erschöpft ist.'},
        {q:'Wann wird bei fakultaet(4) tatsächlich multipliziert?', options:['Beim Abstieg','Erst auf dem Rückweg, nachdem die Abbruchbedingung erreicht wurde','Gleichzeitig'], correct:1, explain:'Beim Abstieg wartet jeder Aufruf auf das Ergebnis des nächsten.'},
        {q:'Was passiert bei einer Rekursion ohne Abbruchbedingung?', options:['Sie läuft unendlich schnell','Der Aufrufstapel läuft über — Stack Overflow','Sie gibt 0 zurück'], correct:1, explain:'Das Gegenstück bei der Schleife ist die vergessene Änderung der Laufvariablen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m4', part:1, partTitle:'Algorithmen & Programmierlogik', title:'Trockenlauf & Fehlersuche', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m4-l1', title:'Der Trockenlauf – die wichtigste Prüfungstechnik', minutes:9,
      body:
        '<p>Wenn eine Aufgabe fragt „Was gibt der Algorithmus aus?" oder „Welchen Wert hat x am Ende?", gibt es genau eine zuverlässige Methode: den <strong>Trockenlauf</strong> (Schreibtischtest) mit einer Wertetabelle.</p>'+
        '<p>So gehst du vor:</p>'+
        '<ol><li>Lege eine Tabelle mit einer Spalte pro Variable an, plus einer Spalte für die geprüfte Bedingung.</li>'+
        '<li>Trage die Startwerte ein.</li>'+
        '<li>Gehe den Code Zeile für Zeile durch und schreibe nach <em>jeder</em> Änderung eine neue Zeile.</li>'+
        '<li>Notiere bei jeder Bedingung explizit wahr oder falsch – nicht im Kopf entscheiden.</li></ol>'+
        '<p>Das dauert zwei Minuten und ist die einzige Methode, die auch bei verschachtelten Schleifen sicher funktioniert.</p>',
      code:
        "// checkAuthority(id = 3, roomNr = 236)\n"+
        "Fuer i von 0 bis Zeilen-1\n"+
        "  Fuer j von 1 bis Spalten-1\n"+
        "    Wenn id = daten[i][0] UND roomNr = daten[i][j] dann\n"+
        "      Rueckgabe True\n"+
        "Rueckgabe False\n\n"+
        "// Zeile 0: ID 1 | 223 312 154 47 124 236 334   <- 236 da, aber ID falsch\n"+
        "// Zeile 1: ID 2 | 103 401 14 236 56            <- 236 da, aber ID falsch\n"+
        "// Zeile 2: ID 3 | 20 312 235 17 124 32         <- ID richtig, kein 236\n"+
        "// Ergebnis: False",
      codeLang:'Trockenlauf (Herbst 2024)',
      tip:'Genau dieses Beispiel war eine Sechs-Punkte-Aufgabe, und die Falle ist bewusst gelegt: Die gesuchte Zahl 236 steht zweimal in der Tabelle – aber in den falschen Zeilen. Wer nur nach dem Wert sucht, statt die UND-Verknüpfung zu prüfen, antwortet True und verliert alle sechs Punkte. Bei jeder UND-Bedingung gilt: beide Teile einzeln prüfen, nie nur einen.',
      quiz:[
        {q:'Wann ist eine UND-Verknüpfung wahr?', options:['Wenn mindestens ein Teil wahr ist','Nur wenn beide Teile wahr sind','Immer'], correct:1, explain:'ODER ist wahr bei mindestens einem, UND verlangt beide.'},
        {q:'Was ist die zuverlässigste Methode, um das Ergebnis eines Algorithmus vorherzusagen?', options:['Überfliegen und schätzen','Wertetabelle anlegen und Zeile für Zeile durchgehen','Nur das Endergebnis betrachten'], correct:1, explain:'Der Trockenlauf ist die einzige Methode, die auch bei Verschachtelung sicher trägt.'},
        {q:'Wie viele Spalten braucht die Wertetabelle eines Trockenlaufs?', options:['Immer genau drei','Eine je Variable, zusätzlich eine für die Zeilennummer','Nur eine für das Ergebnis'], correct:1, explain:'Ohne Zeilennummer lässt sich der Sprung zurück in die Schleife nicht nachvollziehen.'}
      ]
    },
    {
      id:'m4-l2', title:'Fehlersuche in vorgegebenem Code', minutes:9,
      body:
        '<p>Fehlersuchaufgaben folgen immer demselben Aufbau: Ein Skript <em>soll</em> etwas tun, <em>tut</em> aber etwas anderes, und du sollst genau die angegebene Anzahl Fehler finden.</p>'+
        '<p>Das Vorgehen in vier Schritten:</p>'+
        '<ol><li><strong>Soll-Verhalten</strong> aus dem Aufgabentext notieren.</li>'+
        '<li><strong>Ist-Verhalten</strong> notieren (steht ebenfalls im Text).</li>'+
        '<li>Mit einem <strong>konkreten Zahlenbeispiel</strong> trockenlaufen lassen.</li>'+
        '<li>Genau so viele Fehler markieren wie gefordert – nicht mehr.</li></ol>'+
        '<p>Die Selbstkontrolle: <strong>Wenn deine Korrektur das geschilderte Symptom erklärt, ist sie richtig.</strong></p>',
      code:
        "$Prozent = ($Drive.SizeRemaining / $Drive.Size) * 1000   <- Fehler 1: *100\n"+
        "if ($Prozent -gt 15)                                     <- Fehler 2: -lt\n"+
        "{\n"+
        "    Write-Host \"Weniger als 15% Speicherplatz frei.\"\n"+
        "}\n\n"+
        "// Symptom: Warnung erscheint bei 50 % freiem Speicher\n"+
        "// Probe:   0,5 * 1000 = 500 ; 500 > 15 -> Warnung. Passt zum Symptom.",
      codeLang:'PowerShell (Herbst 2021)',
      tip:'Die typischen Fehlerarten wiederholen sich über alle Prüfungsjahrgänge und alle Sprachen hinweg: verdrehter Vergleichsoperator (größer statt kleiner), falscher Faktor oder falsche Einheit (1000 statt 100, Byte statt Bit), Zuweisung statt Vergleich, vergessene oder falsch platzierte Zählererhöhung, und Off-by-one in Schleifengrenzen. Diese fünf Kandidaten prüfst du zuerst – einer davon ist es fast immer.',
      quiz:[
        {q:'Womit rechnet man einen Anteil in Prozent um?', options:['× 100','× 1000','÷ 100'], correct:0, explain:'0,5 × 100 = 50 %. Der Faktor 1000 ist ein klassischer eingebauter Fehler.'},
        {q:'Woran erkennst du, dass deine Fehlerkorrektur richtig ist?', options:['Der Code sieht schöner aus','Sie erklärt genau das im Text geschilderte Symptom','Sie ist kürzer'], correct:1, explain:'Das ist die beste Selbstkontrolle bei Fehlersuchaufgaben.'},
        {q:'Welche Fehlerart findet der Compiler NICHT?', options:['Syntaxfehler','Logikfehler','Tippfehler im Schlüsselwort'], correct:1, explain:'Ein logisch falsches Programm ist syntaktisch korrekt — deshalb braucht es Tests und Trockenläufe.'}
      ]
    },
    {
      id:'m4-l3', title:'Testverfahren: Black Box, White Box, Äquivalenzklassen', minutes:9,
      body:
        '<p>Die AP1 fragt Testtheorie meist als Entwurfsaufgabe: „Welche Testfälle würden Sie wählen?"</p>'+
        '<ul><li><strong>Black-Box-Test</strong> – nur die Schnittstelle ist bekannt, der Code nicht. Getestet wird gegen die Anforderung.</li>'+
        '<li><strong>White-Box-Test</strong> – der Code ist bekannt, getestet wird gegen die Struktur (z. B. Zweigabdeckung).</li></ul>'+
        '<p>Die beiden Entwurfstechniken, die du beherrschen musst:</p>'+
        '<ul><li><strong>Äquivalenzklassen</strong> – Eingaben in Gruppen einteilen, die sich gleich verhalten. Aus jeder Gruppe genügt ein Vertreter.</li>'+
        '<li><strong>Grenzwertanalyse</strong> – an jeder Bereichsgrenze die Werte direkt darunter und darüber prüfen. Dort stecken die meisten Fehler (&lt; statt &lt;=).</li></ul>'+
        '<p>Die Teststufen von unten nach oben: <strong>Unit-Test → Integrationstest → Systemtest → Abnahmetest</strong>. Der Abnahmetest erfolgt durch den Auftraggeber gegen das Pflichtenheft.</p>',
      code:
        "// Regel: zulaessig ist ein Alter von 18 bis einschliesslich 65\n\n"+
        "Aequivalenzklassen:   < 18 ungueltig | 18..65 gueltig | > 65 ungueltig\n"+
        "Grenzwerte:             17, 18                  65, 66\n\n"+
        "Testfaelle:  17 -> false    18 -> true    40 -> true\n"+
        "             65 -> true     66 -> false",
      codeLang:'Testentwurf',
      tip:'Fünf Testfälle decken hier alles ab, und die Auswahl ist nicht beliebig: Die Werte 18 und 65 prüfen, ob die Grenze eingeschlossen ist, 17 und 66 prüfen, ob sie nicht überschritten wird. Ein Programmierfehler wie < statt <= fällt nur auf, wenn beide Nachbarwerte einer Grenze getestet werden. Deshalb ist die Grenzwertanalyse die wirksamste Testtechnik pro investierter Minute.',
      quiz:[
        {q:'Ein Feld akzeptiert Werte von 1 bis 100. Welche Grenzwerte testest du?', options:['Nur 1 und 100','0, 1, 100, 101','Nur 50'], correct:1, explain:'Jeweils direkt innerhalb und außerhalb jeder Bereichsgrenze.'},
        {q:'Was kennzeichnet einen Black-Box-Test?', options:['Der Quellcode ist bekannt','Nur die Schnittstelle ist bekannt, getestet wird gegen die Anforderung','Er wird automatisch ausgeführt'], correct:1, explain:'White-Box testet dagegen gegen die innere Struktur.'},
        {q:'Eine Eingabe ist zwischen 18 und 65 gültig. Welche Werte prüft die Grenzwertanalyse?', options:['Nur 18 und 65','17, 18, 65 und 66','Nur 40 als Mittelwert'], correct:1, explain:'Geprüft wird jeweils direkt unterhalb, auf und oberhalb der Grenze.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m5', part:2, partTitle:'Datenbanken & Datenmodellierung', title:'ER-Modell & Kardinalitäten', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m5-l1', title:'Die Notation des ER-Modells', minutes:8,
      body:
        '<p>Das <strong>Entity-Relationship-Modell</strong> beschreibt, welche Dinge es gibt und wie sie zusammenhängen. Die IHK verwendet die <strong>Chen-Notation</strong>:</p>'+
        '<table class="lesson-table"><tr><th>Symbol</th><th>Bedeutung</th></tr>'+
        '<tr><td>Rechteck</td><td>Entitätstyp (Tabelle), Substantiv</td></tr>'+
        '<tr><td>Ellipse</td><td>Attribut (Spalte)</td></tr>'+
        '<tr><td>Raute</td><td>Beziehung, als Verb benannt</td></tr>'+
        '<tr><td>Unterstrichenes Attribut</td><td>Primärschlüssel</td></tr>'+
        '<tr><td>Attribut mit #</td><td>Fremdschlüssel</td></tr>'+
        '<tr><td>Zahl an der Linie</td><td>Kardinalität (1, n, m)</td></tr></table>'+
        '<p>Die Schlüsselbegriffe: Der <strong>Primärschlüssel</strong> identifiziert einen Datensatz eindeutig, ist niemals NULL und ändert sich nicht. Der <strong>Fremdschlüssel</strong> verweist auf den Primärschlüssel einer anderen Tabelle und sichert die <strong>referenzielle Integrität</strong>.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 210" role="img" aria-label="ER-Diagramm in Chen-Notation mit Entitaeten, Beziehung und Attributen"><rect class="s-accent" x="24" y="76" width="118" height="50" rx="3"/><text class="s-hd" x="83" y="106" text-anchor="middle">Kunde</text><polygon class="s-box" points="280,64 356,101 280,138 204,101"/><text class="s-lbl" x="280" y="105" text-anchor="middle">bestellt</text><rect class="s-accent" x="418" y="76" width="118" height="50" rx="3"/><text class="s-hd" x="477" y="106" text-anchor="middle">Artikel</text><line class="s-line" x1="142" y1="101" x2="204" y2="101"/><line class="s-line" x1="356" y1="101" x2="418" y2="101"/><text class="s-mono" x="162" y="93">1</text><text class="s-mono" x="386" y="93">n</text><ellipse class="s-box" cx="70" cy="32" rx="46" ry="19"/><text class="s-uline" x="70" y="36" text-anchor="middle">KundenNr</text><ellipse class="s-box" cx="176" cy="32" rx="38" ry="19"/><text class="s-lbl" x="176" y="36" text-anchor="middle">Name</text><line class="s-line" x1="70" y1="51" x2="74" y2="76"/><line class="s-line" x1="170" y1="51" x2="128" y2="76"/><ellipse class="s-box" cx="464" cy="32" rx="46" ry="19"/><text class="s-uline" x="464" y="36" text-anchor="middle">ArtikelNr</text><line class="s-line" x1="464" y1="51" x2="466" y2="76"/><ellipse class="s-box" cx="280" cy="180" rx="44" ry="19"/><text class="s-lbl" x="280" y="184" text-anchor="middle">Menge</text><line class="s-line" x1="280" y1="138" x2="280" y2="161"/></svg><figcaption>Rechteck = Entitaet, Raute = Beziehung, Oval = Attribut, unterstrichen = Schluessel. Attribute an der Raute gehoeren zur Beziehung, nicht zu einer Entitaet.</figcaption></figure>',
      code:'',
      tip:'Das Signalwort für den Primärschlüssel steht fast wörtlich im Aufgabentext: „eine eindeutige Maschinennummer", „eine eindeutige Identifizierung soll möglich sein". Wo „eindeutig" steht, gehört ein unterstrichenes Attribut hin. Die IHK vergibt dafür regelmäßig einen eigenen Punkt – und er wird regelmäßig vergessen.',
      quiz:[
        {q:'Wie wird der Primärschlüssel in der Chen-Notation gekennzeichnet?', options:['Fett gedruckt','Unterstrichen','Mit einem Stern'], correct:1, explain:'Unterstrichen; der Fremdschlüssel bekommt ein #.'},
        {q:'Welches Signalwort im Aufgabentext deutet auf einen Primärschlüssel hin?', options:['„wichtig"','„eindeutig"','„optional"'], correct:1, explain:'„Eine eindeutige Identifizierung" ist die Standardformulierung der IHK.'},
        {q:'Wie wird ein mehrwertiges Attribut in der Chen-Notation dargestellt?', options:['Als doppelt umrandetes Oval','Als Raute','Als gestricheltes Rechteck'], correct:0, explain:'Ein abgeleitetes Attribut bekommt dagegen ein gestricheltes Oval.'}
      ]
    },
    {
      id:'m5-l2', title:'Kardinalitäten sicher herleiten', minutes:9,
      body:
        '<p>Die Kardinalität ist der häufigste Punkteverlust in ER-Aufgaben – dabei lässt sie sich mechanisch herleiten. Sprich <strong>immer beide Richtungen laut durch</strong>:</p>'+
        '<ul><li>„Ein Mitarbeiter bearbeitet <em>wie viele</em> Aufträge?" → viele → <strong>n</strong></li>'+
        '<li>„Ein Auftrag wird von <em>wie vielen</em> Mitarbeitern bearbeitet?" → laut Text nur von einem → <strong>1</strong></li></ul>'+
        '<p>Ergebnis: eine <strong>1:n</strong>-Beziehung von Mitarbeiter zu Auftrag.</p>'+
        '<p>Die drei Typen und ihre Umsetzung in Tabellen:</p>'+
        '<table class="lesson-table"><tr><th>Typ</th><th>Umsetzung</th></tr>'+
        '<tr><td>1:1</td><td>Fremdschlüssel auf einer beliebigen Seite, oder Tabellen zusammenlegen</td></tr>'+
        '<tr><td>1:n</td><td>Fremdschlüssel auf der n-Seite</td></tr>'+
        '<tr><td>n:m</td><td>zwingend eine Zwischentabelle mit beiden Fremdschlüsseln</td></tr></table>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Aufloesung der Kardinalitaeten 1:1, 1:n und n:m"><text class="s-hd" x="12" y="22">1 : 1</text><rect class="s-box" x="76" y="6" width="96" height="30" rx="3"/><text class="s-lbl" x="124" y="26" text-anchor="middle">Mitarbeiter</text><line class="s-line" x1="172" y1="21" x2="252" y2="21"/><text class="s-mono" x="186" y="14">1</text><text class="s-mono" x="234" y="14">1</text><rect class="s-box" x="252" y="6" width="96" height="30" rx="3"/><text class="s-lbl" x="300" y="26" text-anchor="middle">Dienstwagen</text><text class="s-lbl" x="366" y="26">FK auf einer Seite</text><text class="s-hd" x="12" y="84">1 : n</text><rect class="s-box" x="76" y="68" width="96" height="30" rx="3"/><text class="s-lbl" x="124" y="88" text-anchor="middle">Abteilung</text><line class="s-line" x1="172" y1="83" x2="252" y2="83"/><text class="s-mono" x="186" y="76">1</text><text class="s-mono" x="234" y="76">n</text><rect class="s-accent" x="252" y="68" width="96" height="30" rx="3"/><text class="s-lbl" x="300" y="88" text-anchor="middle">Mitarbeiter</text><text class="s-lbl" x="366" y="88">FK auf der n-Seite</text><text class="s-hd" x="12" y="150">n : m</text><rect class="s-box" x="76" y="134" width="88" height="30" rx="3"/><text class="s-lbl" x="120" y="154" text-anchor="middle">Projekt</text><line class="s-line" x1="164" y1="149" x2="212" y2="149"/><text class="s-mono" x="176" y="142">n</text><rect class="s-strong" x="212" y="134" width="112" height="30" rx="3"/><text class="s-lbl" x="268" y="154" text-anchor="middle">Zuordnung</text><line class="s-line" x1="324" y1="149" x2="372" y2="149"/><text class="s-mono" x="352" y="142">m</text><rect class="s-box" x="372" y="134" width="88" height="30" rx="3"/><text class="s-lbl" x="416" y="154" text-anchor="middle">Mitarbeiter</text><text class="s-lbl" x="76" y="186">Die Zwischentabelle enthaelt beide Fremdschluessel und eigene Attribute wie Stunden oder Rolle.</text></svg><figcaption>Nur bei n:m entsteht eine eigene Tabelle. Bei 1:n wandert der Fremdschluessel immer auf die n-Seite.</figcaption></figure>',
      code:
        "Mitarbeiter (1) ---- bearbeitet ---- (n) Auftraege\n\n"+
        "Mitarbeiter:  MitarbeiterID (PK), Name, Vorname\n"+
        "Auftraege:    AuftragID (PK), Beginn, Ende, MitarbeiterID (FK)\n"+
        "                                            ^^^^^^^^^^^^^^^^\n"+
        "                                            Fremdschluessel auf der n-Seite",
      codeLang:'ER → Tabellen',
      tip:'Der Merksatz, der alle Umsetzungsfragen löst: Der Fremdschlüssel wandert immer zum „viele". Das ist keine Konvention, sondern zwingend – ein Auftrag hat genau einen Mitarbeiter, also passt die eine Mitarbeiter-ID problemlos in die Auftragszeile. Umgekehrt müsste man in die Mitarbeiterzeile beliebig viele Auftrags-IDs schreiben, was die erste Normalform verletzen würde.',
      quiz:[
        {q:'Wo steht der Fremdschlüssel bei einer 1:n-Beziehung?', options:['Auf der 1-Seite','Auf der n-Seite','In einer Zwischentabelle'], correct:1, explain:'Der Fremdschlüssel wandert immer zum „viele".'},
        {q:'Wie wird eine n:m-Beziehung in Tabellen umgesetzt?', options:['Mit einer Zwischentabelle mit beiden Fremdschlüsseln','Mit einem Fremdschlüssel auf einer Seite','Gar nicht'], correct:0, explain:'Die beiden Fremdschlüssel bilden dort zusammen den Primärschlüssel.'},
        {q:'Welche Kardinalität liegt vor: Jeder Mitarbeiter hat genau einen Dienstwagen, jeder Wagen genau einen Fahrer?', options:['1:1','1:n','n:m'], correct:0, explain:'Der Fremdschlüssel kommt dann auf eine der beiden Seiten, sinnvollerweise auf die seltener befüllte.'}
      ]
    },
    {
      id:'m5-l3', title:'Aus dem Aufgabentext das Modell ableiten', minutes:9,
      body:
        '<p>ER-Aufgaben lassen sich mit einer festen Lesetechnik lösen. Die IHK versteckt die Lösung wörtlich im Text:</p>'+
        '<ol><li><strong>Substantive markieren</strong> → Entität oder Attribut? Faustregel: Wenn es mehrere Eigenschaften hat, ist es eine Entität; wenn es ein einzelner Wert ist, ein Attribut.</li>'+
        '<li><strong>Verben markieren</strong> → Beziehungen. Benenne die Raute mit dem Verb: „bearbeitet", „liefert", „bucht".</li>'+
        '<li><strong>Beide Richtungen durchsprechen</strong> → Kardinalität.</li>'+
        '<li><strong>Primärschlüssel</strong> in jeder Entität festlegen.</li>'+
        '<li><strong>Fremdschlüssel</strong> auf der n-Seite ergänzen – falls die Aufgabe das verlangt.</li></ol>'+
        '<p>Attribute, die sich weder der einen noch der anderen Entität zuordnen lassen, gehören an die <strong>Beziehung</strong>. „Beginn und Ende der Bearbeitung" beschreibt nicht den Mitarbeiter und nicht den Auftrag, sondern den Vorgang – in der Chen-Notation hängen sie an der Raute.</p>',
      code:
        "Aufgabentext:\n"+
        "\"Fuer jede Walzanlage sollen die Produktionsdaten (Breite, Laenge,\n"+
        " Dicke und Anzahl) mit dem jeweiligen Zeitstempel gespeichert werden.\n"+
        " Ausserdem Baujahr, Bezeichnung und eine eindeutige Maschinennummer.\"\n\n"+
        "-> Entitaeten:  Walzanlage, Produktionsdaten\n"+
        "-> Beziehung:   liefern   (Walzanlage 1 ---- n Produktionsdaten)\n"+
        "-> Attribute:   WID (PK), Bezeichnung, Baujahr, Spezifikation\n"+
        "                OrderID (PK), Breite, Laenge, Dicke, Anzahl, Zeitstempel",
      codeLang:'Textanalyse (Herbst 2022)',
      tip:'Lies Hinweise wie „Die eventuell benötigten Fremdschlüssel müssen nicht eingetragen werden" sehr genau – sie sparen dir Zeit und verhindern Punktabzug für Überflüssiges. Umgekehrt gilt: Steht „redundanzfrei" in der Aufgabe, ist das eine Warnung. Es bedeutet, dass du Mitarbeiterdaten nicht beim Auftrag wiederholen darfst, sondern nur den Fremdschlüssel setzt.',
      quiz:[
        {q:'Wohin gehören Attribute wie „Beginn" und „Ende der Bearbeitung"?', options:['An die Entität Mitarbeiter','An die Beziehung – sie beschreiben den Vorgang','An gar keine Stelle'], correct:1, explain:'Bei der Umsetzung in Tabellen landen sie dann auf der n-Seite.'},
        {q:'Was bedeutet der Hinweis „redundanzfrei" in einer ER-Aufgabe?', options:['Möglichst wenige Entitäten','Dieselbe Information darf nicht mehrfach gespeichert werden','Keine Fremdschlüssel verwenden'], correct:1, explain:'Statt den Namen zu wiederholen, wird nur der Fremdschlüssel gesetzt.'},
        {q:'Was ist bei „Ein Kurs wird von mindestens einem Dozenten geleitet" die Minimalkardinalität?', options:['0','1','beliebig'], correct:1, explain:'In der (min,max)-Notation also (1,n) auf der Dozentenseite.'}
      ]
    },
    {
      id:'m5-l4', title:'Vom ER-Modell zum Relationenmodell', minutes:8,
      body:
        '<p>Das <strong>Relationenmodell</strong> ist die Tabellenschreibweise. Die Notation, die du in der Prüfung verwenden kannst:</p>'+
        '<p><code>Tabellenname(<u>Primärschlüssel</u>, Attribut1, Attribut2, Fremdschlüssel#)</code></p>'+
        '<p>Die Reihenfolge des Datenbankentwurfs – eine eigene Prüfungsfrage:</p>'+
        '<ol><li><strong>Anforderungsanalyse</strong> – was soll gespeichert werden?</li>'+
        '<li><strong>Konzeptioneller Entwurf</strong> – ER-Modell, unabhängig von jedem DBMS.</li>'+
        '<li><strong>Logischer Entwurf</strong> – Überführung in Relationen, Normalisierung.</li>'+
        '<li><strong>Verteilung im Netz</strong> – wo liegen welche Daten.</li>'+
        '<li><strong>Physischer Entwurf</strong> – konkrete Umsetzung im DBMS, Datentypen, Indizes.</li>'+
        '<li><strong>Test und Validierung</strong></li>'+
        '<li><strong>Anwendung und Wartung</strong></li></ol>',
      code:
        "Walzanlage(WID, Bezeichnung, Baujahr, Spezifikation)\n"+
        "Produktionsdaten(OrderID, Breite, Laenge, Dicke, Anzahl, Zeitstempel, WID#)\n\n"+
        "// n:m-Beispiel mit Zwischentabelle:\n"+
        "Student(MatrNr, Name)\n"+
        "Kurs(KursNr, Titel)\n"+
        "Belegung(MatrNr#, KursNr#, Note)      <- zusammengesetzter Primaerschluessel",
      codeLang:'Relationenmodell',
      tip:'Wenn du die Reihenfolge des Datenbankentwurfs vergisst, leite sie über das Wasserfallmodell her: Analyse, Entwurf, Implementierung, Test, Betrieb. Der Datenbankentwurf verfeinert nur den Entwurfsschritt in konzeptionell, logisch und physisch – also von der Fachlichkeit über die Struktur zur Technik. Diese Herleitung funktioniert zuverlässiger als reines Auswendiglernen.',
      quiz:[
        {q:'Welcher Entwurfsschritt erzeugt das ER-Modell?', options:['Der konzeptionelle Entwurf','Der physische Entwurf','Die Anforderungsanalyse'], correct:0, explain:'Er ist bewusst unabhängig von jedem konkreten Datenbanksystem.'},
        {q:'Was ergibt bei einer n:m-Beziehung den Primärschlüssel der Zwischentabelle?', options:['Ein neues Feld','Die beiden Fremdschlüssel zusammen','Der erste Fremdschlüssel'], correct:1, explain:'Ein zusammengesetzter Primärschlüssel aus beiden Fremdschlüsseln.'},
        {q:'Wie viele Tabellen entstehen aus zwei Entitäten mit einer n:m-Beziehung?', options:['Zwei','Drei','Eine'], correct:1, explain:'Die Zwischentabelle trägt beide Fremdschlüssel und mögliche Beziehungsattribute.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m6', part:2, partTitle:'Datenbanken & Datenmodellierung', title:'Normalisierung', relevanz:'hoch',
  lessons:[
    {
      id:'m6-l1', title:'Warum normalisiert wird: die drei Anomalien', minutes:8,
      body:
        '<p>Redundanz – dieselbe Information mehrfach gespeichert – erzeugt drei konkrete Probleme, die in der Prüfung namentlich abgefragt werden:</p>'+
        '<ul><li><strong>Änderungsanomalie</strong> – eine Kopie wird geändert, die anderen nicht. Der Datenbestand widerspricht sich.</li>'+
        '<li><strong>Einfügeanomalie</strong> – ein Datensatz kann nicht erfasst werden, weil andere Pflichtangaben fehlen. Ein neuer Kunde ohne Bestellung lässt sich nicht speichern.</li>'+
        '<li><strong>Löschanomalie</strong> – beim Löschen gehen ungewollt weitere Informationen verloren. Mit der letzten Bestellung verschwindet auch der Kunde.</li></ul>'+
        '<p>Die Normalisierung beseitigt genau diese drei Probleme, indem sie Daten so aufteilt, dass jede Information genau einmal gespeichert wird.</p>',
      code:'',
      tip:'Die drei Anomalien sind nicht nur Prüfungsvokabeln, sondern die beste Begründung, wenn eine Aufgabe fragt „Warum sollte normalisiert werden?". Eine Antwort wie „damit es ordentlich ist" bringt null Punkte. „Zur Vermeidung von Änderungs-, Einfüge- und Löschanomalien durch Redundanz" bringt die volle Punktzahl – derselbe Gedanke, nur mit den Fachbegriffen.',
      quiz:[
        {q:'Was ist eine Änderungsanomalie?', options:['Ein Datensatz lässt sich nicht speichern','Eine von mehreren Kopien wird geändert, die anderen nicht','Beim Löschen gehen andere Daten verloren'], correct:1, explain:'Der Datenbestand wird dadurch widersprüchlich.'},
        {q:'Welches Problem beseitigt die Normalisierung?', options:['Langsame Abfragen','Redundanz und die daraus folgenden Anomalien','Fehlende Indizes'], correct:1, explain:'Jede Information soll genau einmal gespeichert sein.'},
        {q:'Ein Kunde zieht um, die Adresse steht in 40 Bestellzeilen. Welche Anomalie droht?', options:['Einfügeanomalie','Änderungsanomalie','Löschanomalie'], correct:1, explain:'Wird nur ein Teil der Zeilen aktualisiert, sind die Daten widersprüchlich.'}
      ]
    },
    {
      id:'m6-l2', title:'Die ersten drei Normalformen', minutes:10,
      body:
        '<p>Für die AP1 genügen die ersten drei Normalformen. Jede baut auf der vorherigen auf.</p>'+
        '<p><strong>1. Normalform:</strong> Alle Attribute sind <strong>atomar</strong> – kein Feld enthält mehrere Werte. Eine Spalte „Telefonnummern" mit „0221/123, 0171/456" verletzt die 1NF.</p>'+
        '<p><strong>2. Normalform:</strong> 1NF <em>und</em> jedes Nichtschlüsselattribut hängt vom <strong>gesamten</strong> Primärschlüssel ab. Relevant wird das nur bei <em>zusammengesetzten</em> Primärschlüsseln – bei einem einfachen Schlüssel ist die 2NF automatisch erfüllt.</p>'+
        '<p><strong>3. Normalform:</strong> 2NF <em>und</em> keine <strong>transitiven Abhängigkeiten</strong> – kein Nichtschlüsselattribut hängt von einem anderen Nichtschlüsselattribut ab.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Transitive Abhaengigkeit vor und nach der Ueberfuehrung in die dritte Normalform"><text class="s-hd" x="20" y="24">VOR der 3. Normalform</text><rect class="s-warn" x="20" y="34" width="520" height="52" rx="6"/><text class="s-mono" x="34" y="56">Mitarbeiter( PersNr, Name, AbtNr, Abteilungsname, Abteilungsleiter )</text><path class="s-arrow2" d="M112 76 C 112 96, 300 96, 300 78"/><text class="s-lbl" x="150" y="100">PersNr bestimmt AbtNr</text><path class="s-arrow3" d="M300 62 C 340 40, 420 40, 452 60"/><text class="s-lbl" x="330" y="30">AbtNr bestimmt Abteilungsname &#8594; transitiv!</text><text class="s-hd" x="20" y="132">NACH der Aufteilung</text><rect class="s-ok" x="20" y="142" width="250" height="44" rx="6"/><text class="s-mono" x="34" y="168">Mitarbeiter( PersNr, Name, #AbtNr )</text><rect class="s-ok" x="290" y="142" width="250" height="44" rx="6"/><text class="s-mono" x="304" y="168">Abteilung( AbtNr, Name, Leiter )</text></svg><figcaption>Transitiv heisst: Ein Nichtschluesselattribut haengt von einem anderen Nichtschluesselattribut ab. Die Aufteilung beseitigt genau diese Kette.</figcaption></figure>',
      code:
        "// Verstoss gegen 1NF (nicht atomar)\n"+
        "Kunde(KdNr, Name, Telefonnummern)\n"+
        "     (1, Meier, \"0221/123, 0171/456\")\n\n"+
        "// Verstoss gegen 2NF (Teilabhaengigkeit vom zusammengesetzten Schluessel)\n"+
        "Position(BestellNr, PosNr, Menge, Artikelname, Artikelgewicht)\n"+
        "         ^^^^^^^^^^^^^^^^        ^^^^^^^^^^^^^^^^^^^^^^^^^^^\n"+
        "         Schluessel              haengen nur von der Artikelnummer ab\n\n"+
        "// Verstoss gegen 3NF (transitive Abhaengigkeit)\n"+
        "Mitarbeiter(PersNr, Name, AbtNr, Abteilungsname)\n"+
        "                                  ^^^^^^^^^^^^^^\n"+
        "                                  haengt von AbtNr ab, nicht von PersNr",
      codeLang:'Normalisierung',
      tip:'Der Merksatz, mit dem du jede Normalisierungsfrage beantworten kannst, stammt aus dem Datenbankunterricht und trifft es exakt: Jedes Nichtschlüsselattribut hängt vom Schlüssel, vom ganzen Schlüssel und von nichts als dem Schlüssel ab. Der erste Teil ist die 1NF, „vom ganzen Schlüssel" ist die 2NF, „von nichts als dem Schlüssel" ist die 3NF.',
      quiz:[
        {q:'Eine Tabelle enthält BestellNr, Position, Produktname und Produktgewicht. Wogegen verstößt sie?', options:['Gegen die 1NF','Gegen die 2NF, da die Produktdaten nur von der Position abhängen','Gegen keine Normalform'], correct:1, explain:'Klassische Teilabhängigkeit vom zusammengesetzten Schlüssel.'},
        {q:'Was fordert die 3. Normalform zusätzlich zur 2NF?', options:['Atomare Werte','Keine transitiven Abhängigkeiten zwischen Nichtschlüsselattributen','Einen numerischen Primärschlüssel'], correct:1, explain:'Abteilungsname hängt von AbtNr ab, nicht direkt vom Primärschlüssel.'},
        {q:'Eine Tabelle ist in der 2. NF. Was fehlt noch zur 3. NF?', options:['Atomare Attribute','Die Beseitigung transitiver Abhängigkeiten','Ein Primärschlüssel'], correct:1, explain:'Also kein Nichtschlüsselattribut, das von einem anderen Nichtschlüsselattribut abhängt.'}
      ]
    },
    {
      id:'m6-l3', title:'Denormalisierung – wann Redundanz erlaubt ist', minutes:7,
      body:
        '<p>Die Normalisierung hat einen Preis: Mehr Tabellen bedeuten mehr <strong>JOINs</strong> und damit langsamere Abfragen. In der Praxis wird deshalb manchmal bewusst <strong>denormalisiert</strong> – Redundanz wird gezielt in Kauf genommen, um Leseoperationen zu beschleunigen.</p>'+
        '<p>Zwei Fälle, in denen das <em>fachlich zwingend</em> ist und keine echte Redundanz darstellt:</p>'+
        '<ul><li><strong>Historisierung von Preisen:</strong> Der Verkaufspreis gehört in die Rechnungsposition, nicht nur in den Artikelstamm. Ändert sich der Artikelpreis später, darf die alte Rechnung sich nicht rückwirkend ändern.</li>'+
        '<li><strong>Adressen in Verträgen:</strong> Die Anschrift zum Zeitpunkt des Vertragsschlusses ist eine andere Information als die aktuelle Anschrift.</li></ul>'+
        '<p>In der AP1 wird jedoch fast immer die <strong>normalisierte</strong> Lösung erwartet – Denormalisierung nur erwähnen, wenn ausdrücklich nach Performance oder Historisierung gefragt wird.</p>',
      code:'',
      tip:'Die Unterscheidung ist feiner, als sie wirkt: Der gespeicherte Rechnungspreis ist keine Redundanz, sondern eine eigenständige fachliche Aussage – nämlich „zu diesem Preis wurde damals verkauft". Wer das in einer Begründungsaufgabe so formuliert, zeigt Verständnis über das Schulbuchwissen hinaus. Redundanz ist nur dann schädlich, wenn dieselbe Aussage mehrfach gespeichert wird.',
      quiz:[
        {q:'Warum wird der Verkaufspreis in der Rechnungsposition gespeichert?', options:['Aus Versehen','Weil er den historischen Preis dokumentiert und sich nicht nachträglich ändern darf','Um Speicher zu sparen'], correct:1, explain:'Eine spätere Preisänderung im Artikelstamm darf alte Rechnungen nicht verändern.'},
        {q:'Was ist der Preis einer starken Normalisierung?', options:['Mehr Speicherbedarf','Mehr JOINs und damit langsamere Abfragen','Weniger Datensicherheit'], correct:1, explain:'Deshalb wird in Data Warehouses teilweise bewusst denormalisiert.'},
        {q:'Warum wird der Rechnungsbetrag trotz Redundanz oft gespeichert?', options:['Aus Bequemlichkeit','Zur Historisierung — spätere Preisänderungen dürfen alte Rechnungen nicht verändern','Weil er nicht berechenbar ist'], correct:1, explain:'Eine bewusste Denormalisierung, die in der Antwort ausdrücklich begründet gehört.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m7', part:2, partTitle:'Datenbanken & Datenmodellierung', title:'SQL für die AP1', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m7-l1', title:'SELECT, WHERE und die Klauselreihenfolge', minutes:9,
      body:
        '<p>Die <strong>Klauselreihenfolge</strong> ist fix und wird gern direkt abgefragt:</p>'+
        '<p><code>SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT</code></p>'+
        '<p>Die <strong>Ausführungsreihenfolge</strong> ist eine andere: <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</code>. Daraus folgt die wichtigste Konsequenz: <strong>WHERE filtert Zeilen vor der Gruppierung, HAVING filtert Gruppen danach.</strong> <code>WHERE COUNT(*) &gt; 5</code> ist deshalb immer falsch.</p>'+
        '<p>Die Filterbausteine im Überblick:</p>'+
        '<ul><li>Vergleich: <code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></li>'+
        '<li>Bereich: <code>BETWEEN 100 AND 200</code> (Grenzen eingeschlossen)</li>'+
        '<li>Menge: <code>IN (1, 2, 3)</code> bzw. <code>NOT IN (…)</code></li>'+
        '<li>Muster: <code>LIKE \'Mül%\'</code> (% = beliebig viele Zeichen, _ = genau eines)</li>'+
        '<li>Fehlender Wert: <code>IS NULL</code> / <code>IS NOT NULL</code> – <strong>niemals</strong> <code>= NULL</code></li></ul>',
      code:
        "SELECT Width, Length, Thickness, Quantity\n"+
        "FROM ProductionData\n"+
        "WHERE OrderID = 736298;\n\n"+
        "-- Die Pointe der Aufgabe: \"Die OrderID soll NICHT in der Ergebnismenge\n"+
        "-- enthalten sein\" -> SELECT * waere falsch, Spalten einzeln aufzaehlen.\n"+
        "-- WHERE filtert die Zeilen, SELECT bestimmt die Spalten.",
      codeLang:'SQL (Herbst 2022)',
      tip:'Die Trennung von WHERE und SELECT ist der meistgeprüfte Gedanke bei einfachen Abfragen: Eine Spalte kann in der Bedingung stehen, ohne ausgegeben zu werden. Wann immer eine Aufgabe eine Einschränkung wie „soll nicht angezeigt werden" enthält, prüfe zuerst, ob sie die Zeilen betrifft (WHERE) oder die Spalten (SELECT). Verwechslung kostet hier regelmäßig die ganze Teilaufgabe.',
      quiz:[
        {q:'Wie prüft man in SQL korrekt auf einen fehlenden Wert?', options:['feld = NULL','feld IS NULL','feld == NULL'], correct:1, explain:'NULL ist kein Wert, sondern dessen Abwesenheit – Vergleiche mit = ergeben „unbekannt".'},
        {q:'Warum ist WHERE COUNT(*) > 5 immer falsch?', options:['COUNT gibt es nicht','WHERE wird vor der Gruppierung ausgeführt – dafür ist HAVING zuständig','Man braucht Klammern'], correct:1, explain:'Aggregatfunktionen stehen erst nach GROUP BY zur Verfügung.'},
        {q:'Warum funktioniert ein im SELECT vergebener Alias nicht in der WHERE-Klausel?', options:['Ein Syntaxfehler der Datenbank','Weil WHERE logisch vor SELECT ausgeführt wird','Aliase sind generell verboten'], correct:1, explain:'In ORDER BY funktioniert er dagegen, weil das erst nach SELECT ausgewertet wird.'}
      ]
    },
    {
      id:'m7-l2', title:'Aggregatfunktionen und GROUP BY', minutes:9,
      body:
        '<p>Die fünf <strong>Aggregatfunktionen</strong>: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. Sie fassen mehrere Zeilen zu einem Wert zusammen.</p>'+
        '<p>Der Unterschied, der ständig geprüft wird: <strong>COUNT zählt Datensätze, SUM addiert Werte.</strong> Die Frage „wie viele Aufträge" führt zu COUNT, „wie viele Stück" zu SUM.</p>'+
        '<ul><li><code>COUNT(*)</code> zählt alle Zeilen.</li>'+
        '<li><code>COUNT(spalte)</code> zählt nur Zeilen mit einem Wert ungleich NULL.</li>'+
        '<li><code>COUNT(DISTINCT spalte)</code> zählt die <em>verschiedenen</em> Werte – unverzichtbar, wenn nach der Anzahl der Kunden mit mindestens einem Ticket gefragt ist.</li></ul>'+
        '<p>Die <strong>eiserne GROUP-BY-Regel:</strong> Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss im GROUP BY stehen.</p>',
      code:
        "-- Fuer jede Kategorie eine Kennzahl -> immer Aggregat + GROUP BY\n"+
        "SELECT Prioritaet, COUNT(TicketID) AS Anzahl\n"+
        "FROM Ticket\n"+
        "GROUP BY Prioritaet;\n\n"+
        "-- Anzahl der Kunden mit mindestens einem Ticket\n"+
        "SELECT COUNT(DISTINCT KundenID) AS AnzahlKunden\n"+
        "FROM Ticket;                    -- ohne DISTINCT zaehlt man Tickets!\n\n"+
        "-- Gruppen filtern\n"+
        "SELECT KundenID, COUNT(*) FROM Ticket\n"+
        "GROUP BY KundenID HAVING COUNT(*) > 5;",
      codeLang:'SQL',
      tip:'DISTINCT ist der Unterschied zwischen einer richtigen und einer falschen Antwort, wenn nach Personen statt nach Vorgängen gefragt ist. Ein Kunde kann zehn Tickets haben – ohne DISTINCT zählst du zehn statt einen. Prüfe bei jeder COUNT-Aufgabe: Zähle ich Zeilen oder zähle ich unterschiedliche Dinge? Steht im Text „Anzahl der Kunden", brauchst du fast immer DISTINCT.',
      quiz:[
        {q:'Gefragt ist die Gesamtstückzahl gefertigter Teile. Welche Funktion?', options:['COUNT(*)','SUM(Menge)','AVG(Menge)'], correct:1, explain:'COUNT zählt Datensätze, SUM addiert die Werte.'},
        {q:'Wozu dient COUNT(DISTINCT KundenID)?', options:['Zählt alle Zeilen','Zählt die verschiedenen Kunden, nicht die Zeilen','Sortiert die Kunden'], correct:1, explain:'Ein Kunde mit mehreren Tickets wird nur einmal gezählt.'},
        {q:'Was liefert COUNT(spalte) im Unterschied zu COUNT(*)?', options:['Dasselbe','Nur die Zeilen, in denen die Spalte nicht NULL ist','Die Summe der Werte'], correct:1, explain:'COUNT(DISTINCT spalte) zählt zusätzlich nur verschiedene Werte.'}
      ]
    },
    {
      id:'m7-l3', title:'JOINs – Tabellen verknüpfen', minutes:9,
      body:
        '<p>Ein <strong>JOIN</strong> verbindet Zeilen aus mehreren Tabellen über eine Bedingung, meist Fremdschlüssel gleich Primärschlüssel.</p>'+
        '<table class="lesson-table"><tr><th>JOIN-Typ</th><th>Ergebnis</th></tr>'+
        '<tr><td>INNER JOIN</td><td>nur Zeilen mit Treffer auf beiden Seiten</td></tr>'+
        '<tr><td>LEFT OUTER JOIN</td><td>alle Zeilen der linken Tabelle, rechts ggf. NULL</td></tr>'+
        '<tr><td>RIGHT OUTER JOIN</td><td>alle Zeilen der rechten Tabelle</td></tr>'+
        '<tr><td>FULL OUTER JOIN</td><td>alle Zeilen beider Seiten</td></tr>'+
        '<tr><td>CROSS JOIN</td><td>kartesisches Produkt (jede mit jeder)</td></tr></table>'+
        '<p>Die entscheidende Frage lautet immer: <strong>Sollen auch die Datensätze ohne Partner erscheinen?</strong> Wenn ja – etwa Kunden ohne Bestellung – brauchst du einen OUTER JOIN.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 150" role="img" aria-label="Venn-Diagramme der JOIN-Arten"><circle class="s-venn1" cx="112" cy="70" r="44"/><circle class="s-venn2" cx="164" cy="70" r="44"/><text class="s-hd" x="138" y="136" text-anchor="middle">INNER JOIN</text><path class="s-venn-fill" d="M138 33 A 44 44 0 0 1 138 107 A 44 44 0 0 1 138 33 z"/><circle class="s-venn1 s-filled" cx="292" cy="70" r="44"/><circle class="s-venn2" cx="344" cy="70" r="44"/><text class="s-hd" x="318" y="136" text-anchor="middle">LEFT JOIN</text><circle class="s-venn1" cx="452" cy="70" r="44"/><circle class="s-venn2 s-filled" cx="504" cy="70" r="44"/><text class="s-hd" x="478" y="136" text-anchor="middle">RIGHT JOIN</text><text class="s-lbl" x="96" y="74">A</text><text class="s-lbl" x="176" y="74">B</text><text class="s-lbl" x="276" y="74">A</text><text class="s-lbl" x="356" y="74">B</text><text class="s-lbl" x="436" y="74">A</text><text class="s-lbl" x="516" y="74">B</text></svg><figcaption>Der INNER JOIN liefert nur die Schnittmenge. Der LEFT JOIN liefert zusaetzlich alle Zeilen der linken Tabelle, dort mit NULL auf der rechten Seite.</figcaption></figure>',
      code:
        "-- Alle deutschen Kunden, auch die ohne Bestellung\n"+
        "SELECT k.name, b.betrag\n"+
        "FROM kunde k\n"+
        "LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id\n"+
        "WHERE k.land = 'DE';\n\n"+
        "-- FALLE: eine Bedingung auf die RECHTE Tabelle in der WHERE-Klausel\n"+
        "-- macht aus dem LEFT JOIN faktisch einen INNER JOIN, weil die\n"+
        "-- NULL-Zeilen herausgefiltert werden. Solche Bedingungen gehoeren in ON.",
      codeLang:'SQL',
      tip:'Die Falle im Kommentar ist subtil und trifft auch erfahrene Entwickler: Schreibt man beim LEFT JOIN eine Bedingung auf die rechte Tabelle in die WHERE-Klausel, fallen genau die Zeilen heraus, deretwegen man den OUTER JOIN gewählt hat – denn NULL erfüllt keine Vergleichsbedingung. Bedingungen auf die optionale Seite gehören deshalb in die ON-Klausel.',
      quiz:[
        {q:'Welcher JOIN liefert auch Kunden ohne Bestellung?', options:['INNER JOIN','LEFT OUTER JOIN','CROSS JOIN'], correct:1, explain:'Die linke Tabelle bleibt vollständig, rechts stehen NULL-Werte.'},
        {q:'Was liefert ein CROSS JOIN?', options:['Nur Treffer','Das kartesische Produkt – jede Zeile mit jeder','Keine Zeilen'], correct:1, explain:'Bei 100 und 50 Zeilen also 5.000 Ergebniszeilen.'},
        {q:'Wie findet man Kunden OHNE Bestellung?', options:['INNER JOIN mit IS NULL','LEFT JOIN und WHERE bestellung.id IS NULL','CROSS JOIN'], correct:1, explain:'Das ist die einzige Stelle, an der eine IS-NULL-Bedingung in WHERE beim LEFT JOIN richtig ist.'}
      ]
    },
    {
      id:'m7-l4', title:'Datumsfunktionen und Verneinungen', minutes:8,
      body:
        '<p>Die Datumsfunktionen stehen im Syntaxblatt der Prüfung, du musst sie nicht auswendig können – aber du musst wissen, <em>welches Muster</em> gefragt ist: <code>YEAR(datum)</code>, <code>MONTH(datum)</code>, <code>DAY(datum)</code>, <code>NOW()</code>, <code>DATEDIFF(teil, start, ende)</code>, <code>DATEADD(teil, intervall, datum)</code>.</p>'+
        '<p><strong>Achtung bei „im Mai 2022":</strong> Das sind <em>zwei</em> Bedingungen – <code>YEAR(…) = 2022 AND MONTH(…) = 5</code>. Nur den Monat abzufragen würde auch Mai 2021 und 2023 einschließen.</p>'+
        '<p>Die zweite große Falle sind <strong>Verneinungen</strong>: „Alle Fahrzeuge, die in einer Garage stehen, sollen <em>nicht</em> angezeigt werden" bedeutet <code>Garage = FALSE</code>. Wer <code>TRUE</code> schreibt, liefert exakt das Gegenteil.</p>',
      code:
        "SELECT VID\n"+
        "FROM KFZ_Versicherung\n"+
        "WHERE YEAR(Vertragsbeginn) = 2022      -- zwei Bedingungen\n"+
        "  AND MONTH(Vertragsbeginn) = 5        -- fuer \"im Mai 2022\"\n"+
        "  AND Versicherung_Summe > 100000      -- \"ueber\" = echt groesser\n"+
        "  AND Garage = FALSE;                  -- Verneinung umgedreht!",
      codeLang:'SQL (Frühjahr 2023)',
      tip:'Formuliere Verneinungen für dich selbst um, bevor du sie in SQL schreibst: Aus „Fahrzeuge mit Garage sollen nicht angezeigt werden" wird „zeige nur Fahrzeuge ohne Garage". Diese Umformulierung dauert fünf Sekunden und verhindert den teuersten SQL-Fehler der AP1. Achte außerdem auf „über": Das heißt echt größer, also > und nicht >=.',
      quiz:[
        {q:'Wie formuliert man „im Mai 2022" korrekt?', options:['MONTH(datum) = 5','YEAR(datum) = 2022 AND MONTH(datum) = 5','datum = 2022-05'], correct:1, explain:'Nur der Monat allein würde Mai 2021 und 2023 einschließen.'},
        {q:'„Alle mit Garage sollen nicht angezeigt werden." Wie lautet die Bedingung?', options:['Garage = TRUE','Garage = FALSE','Garage IS NULL'], correct:1, explain:'Die doppelte Verneinung im Aufgabentext muss aufgelöst werden.'},
        {q:'Welche Bedingung findet auch Datensätze, bei denen die Spalte NULL ist?', options:['status <> „offen“','status <> „offen“ OR status IS NULL','status = NULL'], correct:1, explain:'NULL erfüllt keinen Vergleich — auch keinen Ungleich-Vergleich. Das ist die Verneinungsfalle.'}
      ]
    },
    {
      id:'m7-l5', title:'DDL, DML, DCL, TCL und eine Abfrage beschreiben', minutes:8,
      body:
        '<p>Die vier SQL-Sprachfamilien werden als Zuordnungsfrage geprüft:</p>'+
        '<table class="lesson-table"><tr><th>Kategorie</th><th>Zweck</th><th>Befehle</th></tr>'+
        '<tr><td>DDL</td><td>Struktur definieren</td><td>CREATE, ALTER, DROP, TRUNCATE</td></tr>'+
        '<tr><td>DML</td><td>Daten bearbeiten</td><td>SELECT, INSERT, UPDATE, DELETE</td></tr>'+
        '<tr><td>DCL</td><td>Rechte verwalten</td><td>GRANT, REVOKE</td></tr>'+
        '<tr><td>TCL</td><td>Transaktionen steuern</td><td>COMMIT, ROLLBACK, SAVEPOINT</td></tr></table>'+
        '<p>Eine eigene Aufgabenform ist <strong>„Analysieren Sie die Abfrage und beschreiben Sie das Ergebnis"</strong>. Die Technik: Gehe die Abfrage <em>Klausel für Klausel</em> durch und übersetze jede in einen deutschen Satz. Drei Punkte bedeuten drei Aussagen – typischerweise WHERE (Filter), SELECT (Spalten) und ORDER BY (Sortierung).</p>',
      code:
        "SELECT Problembeschreibung, Prioritaet, Zustand, ErfassungDatum\n"+
        "FROM Ticket\n"+
        "WHERE Month(NOW()) - Month(ErfassungDatum) > 2 AND Zustand = \"offen\"\n"+
        "ORDER BY ErfassungDatum ASC;\n\n"+
        "-- 1. Filter:     offene Tickets, deren Erfassungsmonat > 2 Monate zurueckliegt\n"+
        "-- 2. Spalten:    nur diese vier, nicht alle\n"+
        "-- 3. Sortierung: aufsteigend nach Datum, aeltestes zuerst",
      codeLang:'SQL-Analyse (Herbst 2023)',
      tip:'Ein Detail in diesem Beispiel zeigt echtes Verständnis, wenn du es erwähnst: Die Bedingung vergleicht nur die Monatszahlen ohne das Jahr. Im Januar ergäbe ein Ticket vom Dezember die Rechnung 1 − 12 = −11, also nicht größer als 2 – das alte Ticket fiele durch das Raster. Sauber wäre DATEDIFF. Solche Beobachtungen honorieren Korrektoren im Rahmen ihres Spielraums.',
      quiz:[
        {q:'Zu welcher Kategorie gehört CREATE TABLE?', options:['DML','DDL','DCL'], correct:1, explain:'DDL definiert die Struktur, DML bearbeitet die Daten darin.'},
        {q:'Wie beantwortet man „Beschreiben Sie das Ergebnis dieser Abfrage" bei 3 Punkten?', options:['Mit einem Satz','Mit drei Aussagen: Filter, Spalten, Sortierung','Nur mit dem Tabellennamen'], correct:1, explain:'Die Punktzahl verrät die Anzahl der erwarteten Aussagen.'},
        {q:'Zu welcher SQL-Kategorie gehört TRUNCATE TABLE?', options:['DML','DDL','DCL'], correct:1, explain:'Anders als DELETE ändert es die Struktur und lässt sich meist nicht zurückrollen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m34', part:3, partTitle:'Objektorientierung & Softwareentwicklung', relevanz:'sehr hoch', title:'Objektorientierte Grundlagen',
  lessons:[
    {
      id:'m34-l1', title:'Klasse, Objekt, Attribut, Methode', minutes:9,
      body:
        '<p>Die vier Grundbegriffe der objektorientierten Programmierung werden in der AP1 als Definitionsfrage geprüft — und regelmäßig verwechselt.</p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Definition</th><th>Bild</th></tr>'+
        '<tr><td><strong>Klasse</strong></td><td>Bauplan, der Eigenschaften und Verhalten beschreibt</td><td>der Bauplan eines Hauses</td></tr>'+
        '<tr><td><strong>Objekt</strong> (Instanz)</td><td>konkrete Ausprägung einer Klasse zur Laufzeit</td><td>das gebaute Haus in der Hauptstraße 7</td></tr>'+
        '<tr><td><strong>Attribut</strong></td><td>Eigenschaft eines Objekts, hält seinen Zustand</td><td>Farbe, Baujahr, Wohnfläche</td></tr>'+
        '<tr><td><strong>Methode</strong></td><td>Verhalten, das ein Objekt ausführen kann</td><td>Tür öffnen, Heizung regeln</td></tr></table>'+
        '<p><strong>Der Satz, der die Prüfungsfrage beantwortet:</strong> Die Klasse existiert einmal im Quellcode, Objekte entstehen beliebig oft zur Laufzeit. Alle Objekte einer Klasse haben <em>dieselben</em> Attribute, aber jeweils <em>eigene Werte</em> darin.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 220" role="img" aria-label="Eine Klasse und drei daraus erzeugte Objekte">'+
        '<rect class="s-accent" x="20" y="30" width="170" height="106" rx="4"/>'+
        '<line class="s-line" x1="20" y1="56" x2="190" y2="56"/><line class="s-line" x1="20" y1="102" x2="190" y2="102"/>'+
        '<text class="s-hd" x="105" y="49" text-anchor="middle">Fahrzeug</text>'+
        '<text class="s-mono" x="30" y="74">- kennzeichen</text>'+
        '<text class="s-mono" x="30" y="92">- farbe</text>'+
        '<text class="s-mono" x="30" y="120">+ starten()</text>'+
        '<text class="s-lbl" x="105" y="158" text-anchor="middle">KLASSE &#183; einmal im Quellcode</text>'+
        '<text class="s-lbl" x="105" y="176" text-anchor="middle">beschreibt den Bauplan</text>'+
        '<path class="s-arrow" d="M196 83 L246 83" marker-end="url(#oa)"/>'+
        '<text class="s-lbl" x="221" y="74" text-anchor="middle">new</text>'+
        '<rect class="s-box" x="256" y="14" width="140" height="52" rx="4"/>'+
        '<text class="s-mono" x="266" y="34">K-AB 123</text><text class="s-mono" x="266" y="54">rot</text>'+
        '<rect class="s-box" x="256" y="76" width="140" height="52" rx="4"/>'+
        '<text class="s-mono" x="266" y="96">M-XY 987</text><text class="s-mono" x="266" y="116">blau</text>'+
        '<rect class="s-box" x="256" y="138" width="140" height="52" rx="4"/>'+
        '<text class="s-mono" x="266" y="158">B-CD 456</text><text class="s-mono" x="266" y="178">rot</text>'+
        '<text class="s-lbl" x="412" y="96">OBJEKTE &#183; beliebig viele</text>'+
        '<text class="s-lbl" x="412" y="114">zur Laufzeit</text>'+
        '<text class="s-lbl" x="412" y="140">gleiche Attribute,</text>'+
        '<text class="s-lbl" x="412" y="158">eigene Werte</text>'+
        '<defs><marker id="oa" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Ein Bauplan, drei Häuser. Zwei Objekte dürfen gleiche Werte haben und sind trotzdem verschiedene Objekte.</figcaption></figure>'+
        '<p>Der <strong>Zustand</strong> eines Objekts ist die Gesamtheit seiner aktuellen Attributwerte. Sein <strong>Verhalten</strong> sind die Methoden. Seine <strong>Identität</strong> ist unabhängig von beidem — zwei rote Fahrzeuge mit gleichem Baujahr bleiben zwei verschiedene Objekte.</p>',
      code:
        "PSEUDOCODE - Klasse definieren und Objekte erzeugen\n\n"+
        "KLASSE Fahrzeug\n"+
        "  PRIVAT kennzeichen : Text\n"+
        "  PRIVAT farbe       : Text\n"+
        "  PRIVAT tankfuellung: Zahl\n\n"+
        "  OEFFENTLICH METHODE starten()\n"+
        "    WENN tankfuellung > 0 DANN\n"+
        "      Ausgabe \"Motor laeuft\"\n"+
        "    SONST\n"+
        "      Ausgabe \"Tank leer\"\n"+
        "    ENDEWENN\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "// Objekte erzeugen (instanziieren)\n"+
        "auto1 <- NEU Fahrzeug(\"K-AB 123\", \"rot\", 42)\n"+
        "auto2 <- NEU Fahrzeug(\"M-XY 987\", \"blau\", 0)\n\n"+
        "auto1.starten()   // Ausgabe: Motor laeuft\n"+
        "auto2.starten()   // Ausgabe: Tank leer\n\n"+
        "// Dieselbe Methode, unterschiedliches Ergebnis -\n"+
        "// weil der ZUSTAND der Objekte verschieden ist.",
      codeLang:'Pseudocode OOP',
      tip:'Die letzte Zeile des Beispiels beantwortet eine beliebte Verständnisfrage: Warum liefert dieselbe Methode unterschiedliche Ergebnisse? Weil sie auf den Attributen des jeweiligen Objekts arbeitet. Methoden gehören zur Klasse und existieren nur einmal im Speicher, Attributwerte gehören zum Objekt und existieren je Instanz. Genau diese Trennung solltest du in der Definitionsantwort nennen.',
      quiz:[
        {q:'Was ist der Unterschied zwischen Klasse und Objekt?', options:['Es gibt keinen','Die Klasse ist der Bauplan, das Objekt die konkrete Instanz zur Laufzeit','Das Objekt ist der Bauplan'], correct:1, explain:'Eine Klasse steht einmal im Code, Objekte entstehen beliebig oft.'},
        {q:'Was beschreibt den Zustand eines Objekts?', options:['Seine Methoden','Die Gesamtheit seiner aktuellen Attributwerte','Sein Klassenname'], correct:1, explain:'Das Verhalten sind die Methoden, die Identität ist davon unabhängig.'},
        {q:'Zwei Objekte haben identische Attributwerte. Sind es dasselbe Objekt?', options:['Ja, sie sind identisch','Nein, sie haben eine eigene Identität','Nur wenn sie dieselbe Klasse haben'], correct:1, explain:'Gleichheit der Werte ist nicht Identität — deshalb unterscheidet man in der Praxis equals und ==.'}
      ]
    },
    {
      id:'m34-l2', title:'Kapselung – warum Attribute privat sind', minutes:9,
      body:
        '<p><strong>Kapselung</strong> (Information Hiding) bedeutet: Der innere Zustand eines Objekts ist von außen nicht direkt zugänglich. Der Zugriff läuft ausschließlich über definierte Methoden.</p>'+
        '<p>Umgesetzt wird sie über die <strong>Sichtbarkeiten</strong>:</p>'+
        '<table class="lesson-table"><tr><th>UML</th><th>Schlüsselwort</th><th>Zugriff von</th></tr>'+
        '<tr><td>+</td><td>public</td><td>überall</td></tr>'+
        '<tr><td>−</td><td>private</td><td>nur aus der eigenen Klasse</td></tr>'+
        '<tr><td>#</td><td>protected</td><td>eigene Klasse und Unterklassen</td></tr>'+
        '<tr><td>~</td><td>package</td><td>Klassen desselben Pakets</td></tr></table>'+
        '<p><strong>Die Faustregel:</strong> Attribute <code>private</code>, Methoden nach Bedarf <code>public</code>. Der Zugriff erfolgt über <strong>Getter</strong> (lesen) und <strong>Setter</strong> (schreiben).</p>'+
        '<p><strong>Warum das mehr ist als Bürokratie</strong> — die drei Gründe, die in der Prüfung erwartet werden:</p>'+
        '<ol><li><strong>Validierung.</strong> Der Setter kann ungültige Werte abweisen. Ein öffentliches Attribut kann jeder auf einen Unsinnswert setzen.</li>'+
        '<li><strong>Änderbarkeit.</strong> Die interne Darstellung lässt sich ändern, ohne dass fremder Code bricht — solange die Methodenschnittstelle gleich bleibt.</li>'+
        '<li><strong>Kontrolle und Nachvollziehbarkeit.</strong> Ein Zugriff kann protokolliert, berechnet oder abgeleitet werden, ohne dass der Aufrufer davon weiß.</li></ol>'+
        '<p>Ein häufiger Fehler in Prüfungslösungen: <strong>ein Getter, der die interne Liste direkt zurückgibt.</strong> Damit ist die Kapselung ausgehebelt, weil der Aufrufer die Liste von außen verändern kann. Richtig ist eine Kopie oder eine unveränderliche Sicht.</p>',
      code:
        "OHNE KAPSELUNG - das Problem\n\n"+
        "  konto.kontostand <- -999999     // niemand hindert daran\n\n"+
        "MIT KAPSELUNG - die Loesung\n\n"+
        "KLASSE Konto\n"+
        "  PRIVAT kontostand : Zahl\n"+
        "  PRIVAT dispoRahmen: Zahl\n\n"+
        "  OEFFENTLICH METHODE getKontostand() : Zahl\n"+
        "    GIB kontostand ZURUECK\n"+
        "  ENDEMETHODE\n\n"+
        "  OEFFENTLICH METHODE abheben(betrag : Zahl) : Wahrheitswert\n"+
        "    WENN betrag <= 0 DANN\n"+
        "      GIB FALSCH ZURUECK              // Validierung\n"+
        "    ENDEWENN\n"+
        "    WENN kontostand - betrag < -dispoRahmen DANN\n"+
        "      GIB FALSCH ZURUECK              // Geschaeftsregel\n"+
        "    ENDEWENN\n"+
        "    kontostand <- kontostand - betrag\n"+
        "    protokolliere(betrag)             // Nachvollziehbarkeit\n"+
        "    GIB WAHR ZURUECK\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "  Beachte: Es gibt bewusst KEINEN setKontostand().\n"+
        "  Der Kontostand aendert sich nur ueber fachliche Vorgaenge\n"+
        "  wie abheben() und einzahlen() - nie durch direktes Setzen.",
      codeLang:'Kapselung',
      tip:'Der Hinweis am Ende des Beispiels hebt eine Antwort deutlich ab: Kapselung heißt nicht, für jedes Attribut mechanisch einen Getter und einen Setter zu schreiben. Das wäre nur ein umständlich verpacktes öffentliches Attribut. Gute Kapselung bietet fachliche Methoden an — abheben statt setKontostand. Wenn eine Aufgabe eine Klasse entwerfen lässt, überlege bei jedem Setter, ob es ihn wirklich geben darf.',
      quiz:[
        {q:'Welche Sichtbarkeit erlaubt den Zugriff aus Unterklassen, aber nicht von überall?', options:['private','protected','public'], correct:1, explain:'In UML mit # gekennzeichnet.'},
        {q:'Warum sollte ein Getter nicht die interne Liste direkt zurückgeben?', options:['Aus Performancegründen','Weil der Aufrufer sie dann von außen verändern kann und die Kapselung wirkungslos wird','Weil Listen nicht zurückgegeben werden dürfen'], correct:1, explain:'Eine Kopie oder eine unveränderliche Sicht schützt den internen Zustand.'},
        {q:'Was ist der stärkste fachliche Grund für Kapselung?', options:['Der Code sieht ordentlicher aus','Ungültige Zustände lassen sich durch Validierung im Setter verhindern','Das Programm läuft schneller'], correct:1, explain:'Dazu kommen Änderbarkeit der internen Darstellung und Nachvollziehbarkeit der Zugriffe.'}
      ]
    },
    {
      id:'m34-l3', title:'Vererbung, Überschreiben und abstrakte Klassen', minutes:10,
      body:
        '<p><strong>Vererbung</strong> bildet eine <strong>ist-ein-Beziehung</strong> ab: Ein Sparkonto <em>ist ein</em> Konto. Die <strong>Unterklasse</strong> übernimmt alle Attribute und Methoden der <strong>Oberklasse</strong> und ergänzt oder verändert sie.</p>'+
        '<p><strong>Der Zweck</strong> in einem Satz: Gemeinsames wird einmal definiert statt mehrfach kopiert. Das reduziert Redundanz und macht Änderungen an einer Stelle wirksam.</p>'+
        '<p><strong>Drei Begriffe, die verwechselt werden:</strong></p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Bedeutung</th></tr>'+
        '<tr><td><strong>Überschreiben</strong> (Overriding)</td><td>Die Unterklasse ersetzt eine geerbte Methode durch eine eigene Version. <em>Gleiche</em> Signatur, anderes Verhalten.</td></tr>'+
        '<tr><td><strong>Überladen</strong> (Overloading)</td><td>Mehrere Methoden <em>gleichen Namens</em> in derselben Klasse, unterschieden durch die Parameterliste.</td></tr>'+
        '<tr><td><strong>Verdecken</strong></td><td>Ein Attribut gleichen Namens in der Unterklasse verbirgt das der Oberklasse — fast immer ein Fehler.</td></tr></table>'+
        '<p>Eine <strong>abstrakte Klasse</strong> kann nicht instanziiert werden. Sie gibt eine gemeinsame Struktur vor und kann <strong>abstrakte Methoden</strong> enthalten — Methoden ohne Rumpf, die jede Unterklasse implementieren <em>muss</em>. Sinnvoll, wenn es einen gemeinsamen Zustand <em>und</em> Pflichtverhalten gibt: „Ein Medium an sich gibt es nicht, aber jedes Medium hat einen Titel und muss eine Leihgebühr berechnen können."</p>'+
        '<p><strong>Mehrfachvererbung</strong> — also das Erben von mehreren Oberklassen — führt zum <strong>Diamantproblem</strong>: Erbt C von A und B, die beide dieselbe Methode definieren, ist unklar, welche gilt. Deshalb erlauben die meisten Sprachen nur <em>eine</em> Oberklasse, dafür aber beliebig viele <strong>Schnittstellen</strong>.</p>',
      code:
        "KLASSE Konto                          // Oberklasse\n"+
        "  GESCHUETZT kontostand : Zahl        // protected: Unterklassen duerfen ran\n"+
        "  OEFFENTLICH ABSTRAKT METHODE zinsenBerechnen() : Zahl\n"+
        "  OEFFENTLICH METHODE einzahlen(b : Zahl)\n"+
        "    kontostand <- kontostand + b\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "KLASSE Sparkonto ERBT VON Konto\n"+
        "  PRIVAT zinssatz : Zahl\n"+
        "  OEFFENTLICH METHODE zinsenBerechnen() : Zahl     // ueberschrieben\n"+
        "    GIB kontostand * zinssatz / 100 ZURUECK\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "KLASSE Girokonto ERBT VON Konto\n"+
        "  OEFFENTLICH METHODE zinsenBerechnen() : Zahl     // anders ueberschrieben\n"+
        "    GIB 0 ZURUECK                                  // keine Zinsen\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "// k <- NEU Konto(...)   -> FEHLER: Konto ist abstrakt\n"+
        "s <- NEU Sparkonto(1000, 1.5)\n"+
        "s.einzahlen(500)              // geerbt, nicht neu geschrieben\n"+
        "Ausgabe s.zinsenBerechnen()   // 22.5 - eigene Implementierung\n\n"+
        "UEBERLADEN (nicht verwechseln!) - gleiche Klasse, andere Parameter\n"+
        "  METHODE einzahlen(betrag : Zahl)\n"+
        "  METHODE einzahlen(betrag : Zahl, verwendungszweck : Text)",
      codeLang:'Vererbung',
      tip:'Wenn eine Aufgabe eine Vererbungshierarchie entwerfen lässt, prüfe jede geplante Beziehung mit dem Ist-ein-Test. Ein Sparkonto ist ein Konto — passt. Ein Auto ist ein Motor — passt nicht, das Auto <em>hat</em> einen Motor, also Aggregation statt Vererbung. Diese eine Kontrollfrage verhindert den häufigsten Modellierungsfehler und lässt sich in der Begründung direkt zitieren.',
      quiz:[
        {q:'Was ist Überschreiben?', options:['Mehrere Methoden gleichen Namens mit verschiedenen Parametern','Die Unterklasse ersetzt eine geerbte Methode bei gleicher Signatur','Ein Attribut wird gelöscht'], correct:1, explain:'Die erste Beschreibung ist das Überladen.'},
        {q:'Warum kann eine abstrakte Klasse nicht instanziiert werden?', options:['Sie ist zu groß','Sie beschreibt nur eine gemeinsame Struktur und enthält ggf. Methoden ohne Rumpf','Das ist eine willkürliche Regel'], correct:1, explain:'Es gibt kein konkretes „Medium an sich" – nur Bücher und DVDs.'},
        {q:'Welcher Test entscheidet zwischen Vererbung und Aggregation?', options:['Der Ist-ein-Test gegen den Hat-ein-Test','Die Anzahl der Attribute','Die Sichtbarkeit'], correct:0, explain:'Ein Auto ist kein Motor, es hat einen — also keine Vererbung.'}
      ]
    },
    {
      id:'m34-l4', title:'Polymorphie und Schnittstellen', minutes:9,
      body:
        '<p><strong>Polymorphie</strong> (Vielgestaltigkeit) bedeutet: Derselbe Methodenaufruf führt je nach tatsächlichem Objekttyp zu unterschiedlichem Verhalten. Der aufrufende Code muss den konkreten Typ <em>nicht kennen</em>.</p>'+
        '<p>Das ist der eigentliche Gewinn der Objektorientierung: Eine Schleife über eine Liste von <code>Konto</code>-Objekten ruft <code>zinsenBerechnen()</code> auf — und jedes Objekt macht das Richtige. Kommt später ein <code>Festgeldkonto</code> hinzu, muss die Schleife <strong>nicht angepasst werden</strong>.</p>'+
        '<p><strong>Eine Schnittstelle (Interface)</strong> ist ein reiner Vertrag: eine Liste von Methoden ohne Implementierung und ohne Zustand. Eine Klasse, die das Interface <strong>implementiert</strong>, verpflichtet sich, alle Methoden bereitzustellen.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Abstrakte Klasse</th><th>Interface</th></tr>'+
        '<tr><td>Attribute / Zustand</td><td>ja</td><td>nein (nur Konstanten)</td></tr>'+
        '<tr><td>Implementierte Methoden</td><td>ja</td><td>grundsätzlich nein</td></tr>'+
        '<tr><td>Anzahl pro Klasse</td><td>nur <strong>eine</strong> Oberklasse</td><td><strong>beliebig viele</strong></td></tr>'+
        '<tr><td>Beziehung</td><td>„ist ein"</td><td>„kann etwas" / „verhält sich wie"</td></tr>'+
        '<tr><td>UML-Pfeil</td><td>Generalisierung: durchgezogen, leere Dreieckspitze</td><td>Realisierung: <em>gestrichelt</em>, leere Dreieckspitze</td></tr></table>'+
        '<p><strong>Die Entscheidungsregel:</strong> Gibt es gemeinsamen Zustand und gemeinsamen Code, nimm die abstrakte Klasse. Geht es nur um eine gemeinsame Fähigkeit, die auch klassenfremde Typen haben können — druckbar, vergleichbar, speicherbar —, nimm das Interface.</p>',
      code:
        "POLYMORPHIE IN AKTION\n\n"+
        "konten <- [ NEU Sparkonto(1000, 1.5),\n"+
        "            NEU Girokonto(500),\n"+
        "            NEU Festgeldkonto(20000, 3.2) ]\n\n"+
        "gesamtzinsen <- 0\n"+
        "FUER JEDES k IN konten TUE\n"+
        "  gesamtzinsen <- gesamtzinsen + k.zinsenBerechnen()\n"+
        "ENDEFUER\n\n"+
        "  Die Schleife kennt nur den Typ \"Konto\".\n"+
        "  Welche Implementierung laeuft, entscheidet sich zur LAUFZEIT\n"+
        "  anhand des tatsaechlichen Objekttyps (dynamische Bindung).\n"+
        "  Ein neuer Kontotyp erfordert KEINE Aenderung an dieser Schleife.\n\n"+
        "INTERFACE - eine Faehigkeit ueber Klassengrenzen hinweg\n\n"+
        "SCHNITTSTELLE Druckbar\n"+
        "  METHODE druckeBeleg() : Text\n"+
        "ENDESCHNITTSTELLE\n\n"+
        "KLASSE Rechnung   IMPLEMENTIERT Druckbar   ...\n"+
        "KLASSE Kontoauszug IMPLEMENTIERT Druckbar  ...\n"+
        "KLASSE Etikett     IMPLEMENTIERT Druckbar  ...\n\n"+
        "  Diese drei Klassen haben fachlich NICHTS gemeinsam -\n"+
        "  eine gemeinsame Oberklasse waere unsinnig.\n"+
        "  Die gemeinsame FAEHIGKEIT bildet das Interface ab.",
      codeLang:'Polymorphie',
      tip:'Der stärkste Satz zur Polymorphie in einer Prüfungsantwort ist nicht die Definition, sondern die Folge: Neue Typen lassen sich ergänzen, ohne bestehenden Code zu ändern. Das ist der praktische Nutzen, nach dem Begründungsaufgaben fragen. Nenne dazu das Beispiel mit der Schleife — es zeigt in drei Zeilen, was zehn Zeilen Definition nicht erklären.',
      quiz:[
        {q:'Was bedeutet Polymorphie?', options:['Eine Klasse hat viele Attribute','Derselbe Aufruf verhält sich je nach tatsächlichem Objekttyp unterschiedlich','Mehrere Klassen haben denselben Namen'], correct:1, explain:'Welche Implementierung läuft, entscheidet sich zur Laufzeit.'},
        {q:'Wie viele Interfaces kann eine Klasse implementieren?', options:['Genau eines','Beliebig viele','Höchstens zwei'], correct:1, explain:'Nur bei der Klassenvererbung ist man auf eine Oberklasse beschränkt.'},
        {q:'Welcher UML-Pfeil steht für die Realisierung eines Interface?', options:['Durchgezogene Linie mit leerer Dreieckspitze','Gestrichelte Linie mit leerer Dreieckspitze','Gefüllte Raute'], correct:1, explain:'Durchgezogen wäre die Generalisierung, also Vererbung.'}
      ]
    },
    {
      id:'m34-l5', title:'Konstruktor, Objektlebenszyklus und Referenzen', minutes:9,
      body:
        '<p>Ein <strong>Konstruktor</strong> ist eine spezielle Methode, die beim Erzeugen eines Objekts automatisch aufgerufen wird. Er trägt den Namen der Klasse, hat <strong>keinen Rückgabetyp</strong> und sorgt dafür, dass das Objekt von Anfang an in einem gültigen Zustand ist.</p>'+
        '<p>Er kann <strong>überladen</strong> werden: mehrere Konstruktoren mit unterschiedlichen Parameterlisten. Definiert man gar keinen, erzeugt die Sprache meist einen parameterlosen <strong>Standardkonstruktor</strong> — der aber verschwindet, sobald man einen eigenen schreibt. Genau das ist eine beliebte Fangfrage.</p>'+
        '<p><strong>Der Lebenszyklus</strong> eines Objekts: Erzeugung mit <code>new</code> → Nutzung → keine Referenz mehr vorhanden → <strong>Speicherfreigabe</strong>. In Sprachen mit <strong>Garbage Collector</strong> geschieht das automatisch, sobald kein Verweis mehr auf das Objekt zeigt.</p>'+
        '<p><strong>Der Punkt, an dem die meisten Prüfungsaufgaben ansetzen: Wert- und Referenzsemantik.</strong> Eine Variable, die ein Objekt „enthält", enthält in Wahrheit nur eine <strong>Referenz</strong> — einen Verweis auf die Stelle im Speicher. Wird sie einer zweiten Variable zugewiesen, existiert das Objekt weiterhin <em>einmal</em>, aber es gibt zwei Verweise darauf.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 170" role="img" aria-label="Zwei Variablen verweisen auf dasselbe Objekt">'+
        '<text class="s-hd" x="20" y="24">Stack &#183; Variablen</text>'+
        '<rect class="s-box" x="20" y="38" width="130" height="34" rx="4"/><text class="s-mono" x="32" y="60">kunde1</text>'+
        '<rect class="s-box" x="20" y="84" width="130" height="34" rx="4"/><text class="s-mono" x="32" y="106">kunde2</text>'+
        '<text class="s-hd" x="330" y="24">Heap &#183; Objekte</text>'+
        '<rect class="s-accent" x="330" y="50" width="200" height="60" rx="4"/>'+
        '<text class="s-mono" x="344" y="74">name = &quot;Berger&quot;</text>'+
        '<text class="s-mono" x="344" y="96">rabatt = 15</text>'+
        '<path class="s-arrow" d="M152 55 L326 68" marker-end="url(#ra)"/>'+
        '<path class="s-arrow" d="M152 101 L326 90" marker-end="url(#ra)"/>'+
        '<text class="s-lbl" x="20" y="146">Ein Objekt, zwei Verweise. &#196;nderungen &#252;ber kunde2 sind auch &#252;ber kunde1 sichtbar.</text>'+
        '<defs><marker id="ra" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Das Zuweisen einer Objektvariablen kopiert den Verweis, nicht das Objekt. Wer eine echte Kopie will, muss sie ausdrücklich erzeugen.</figcaption></figure>',
      code:
        "DIE REFERENZ-FALLE - beliebte Trockenlauf-Aufgabe\n\n"+
        "  kunde1 <- NEU Kunde(\"Berger\", 10)\n"+
        "  kunde2 <- kunde1              // KOPIE DER REFERENZ, nicht des Objekts\n"+
        "  kunde2.setRabatt(15)\n"+
        "  Ausgabe kunde1.getRabatt()    // ->  15 , nicht 10 !\n\n"+
        "  Es gibt nur EIN Objekt. Beide Variablen zeigen darauf.\n\n"+
        "ZUM VERGLEICH - einfache Datentypen\n\n"+
        "  a <- 10\n"+
        "  b <- a          // hier wird der WERT kopiert\n"+
        "  b <- 15\n"+
        "  Ausgabe a       // ->  10 , unveraendert\n\n"+
        "KONSTRUKTOR - ueberladen\n\n"+
        "KLASSE Kunde\n"+
        "  PRIVAT name : Text\n"+
        "  PRIVAT rabatt : Zahl\n\n"+
        "  KONSTRUKTOR Kunde(n : Text)                 // nur Name\n"+
        "    name   <- n\n"+
        "    rabatt <- 0                               // sinnvoller Startwert\n"+
        "  ENDEKONSTRUKTOR\n\n"+
        "  KONSTRUKTOR Kunde(n : Text, r : Zahl)       // Name und Rabatt\n"+
        "    name <- n\n"+
        "    WENN r < 0 ODER r > 50 DANN r <- 0 ENDEWENN   // Validierung\n"+
        "    rabatt <- r\n"+
        "  ENDEKONSTRUKTOR\n"+
        "ENDEKLASSE",
      codeLang:'Konstruktor & Referenzen',
      tip:'Die Referenz-Falle ist eine der wenigen OOP-Aufgaben, die sich als Trockenlauf stellen lassen — und sie wird genau deshalb gestellt. Merke dir die Unterscheidung so: Einfache Datentypen werden beim Zuweisen kopiert, Objekte nicht. Wenn in einer Aufgabe eine Ausgabe nach einer Zuweisung überraschend wirkt, ist fast immer die geteilte Referenz die Erklärung.',
      quiz:[
        {q:'Was kennzeichnet einen Konstruktor?', options:['Er hat den Klassennamen und keinen Rückgabetyp','Er gibt immer das Objekt zurück','Er muss private sein'], correct:0, explain:'Er wird beim Erzeugen automatisch aufgerufen und stellt einen gültigen Startzustand her.'},
        {q:'kunde2 = kunde1; kunde2.setRabatt(15). Was liefert kunde1.getRabatt()?', options:['Den alten Wert','15 – beide Variablen verweisen auf dasselbe Objekt','Einen Fehler'], correct:1, explain:'Zugewiesen wurde die Referenz, nicht eine Kopie des Objekts.'},
        {q:'Was passiert mit dem Standardkonstruktor, wenn man einen eigenen schreibt?', options:['Er bleibt zusätzlich erhalten','Er entfällt und muss bei Bedarf selbst definiert werden','Er wird automatisch angepasst'], correct:1, explain:'Danach schlägt ein parameterloses new fehl, sofern man ihn nicht ergänzt.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m35', part:3, partTitle:'Objektorientierung & Softwareentwicklung', relevanz:'hoch', title:'Objektorientiert entwerfen',
  lessons:[
    {
      id:'m35-l1', title:'Von der Anforderung zur Klasse', minutes:9,
      body:
        '<p>Die AP1 gibt dir einen Beschreibungstext und verlangt ein Klassendiagramm. Dafür gibt es ein Verfahren, das zuverlässig funktioniert — die <strong>Substantiv-Verb-Methode</strong>:</p>'+
        '<ol><li><strong>Substantive markieren</strong> → Kandidaten für <strong>Klassen</strong> und <strong>Attribute</strong>.</li>'+
        '<li><strong>Verben markieren</strong> → Kandidaten für <strong>Methoden</strong>.</li>'+
        '<li><strong>Aussortieren:</strong> Ein Substantiv wird zur Klasse, wenn es eigene Eigenschaften <em>und</em> eigenes Verhalten hat. Beschreibt es nur eine Eigenschaft von etwas anderem, ist es ein Attribut.</li>'+
        '<li><strong>Beziehungen bestimmen</strong> mit dem Ist-ein-Test (Vererbung) und dem Hat-ein-Test (Assoziation, Aggregation, Komposition).</li>'+
        '<li><strong>Multiplizitäten</strong> aus dem Text ableiten: „ein", „mehrere", „mindestens ein".</li></ol>'+
        '<p><strong>Die entscheidende Abgrenzung:</strong> „Kunde" hat einen Namen, eine Adresse und kann bestellen — das ist eine Klasse. „Farbe" hat keine eigenen Eigenschaften und kein Verhalten — das ist ein Attribut des Fahrzeugs. Sobald die Farbe aber eine Bestellnummer, einen Preis und einen Lieferanten bekommt, wird sie doch zur Klasse. <strong>Es entscheidet die Fachlichkeit, nicht das Wort.</strong></p>',
      code:
        "BEISPIELTEXT\n"+
        "  \"Ein Kunde kann mehrere Bestellungen aufgeben. Jede Bestellung\n"+
        "   hat ein Bestelldatum und besteht aus mindestens einer Position.\n"+
        "   Eine Position verweist auf genau einen Artikel und enthaelt eine\n"+
        "   Menge. Der Artikel hat eine Bezeichnung und einen Preis.\n"+
        "   Bestellungen koennen storniert werden.\"\n\n"+
        "SCHRITT 1 - Substantive\n"+
        "  Kunde, Bestellung, Bestelldatum, Position, Artikel,\n"+
        "  Menge, Bezeichnung, Preis\n\n"+
        "SCHRITT 2 - Verben\n"+
        "  aufgeben, bestehen aus, verweisen, stornieren\n\n"+
        "SCHRITT 3 - aussortieren\n"+
        "  KLASSEN   : Kunde, Bestellung, Position, Artikel\n"+
        "  ATTRIBUTE : Bestelldatum (zu Bestellung)\n"+
        "              Menge        (zu Position)\n"+
        "              Bezeichnung, Preis (zu Artikel)\n"+
        "  METHODEN  : Bestellung.stornieren()\n"+
        "              Bestellung.gesamtpreisBerechnen()\n\n"+
        "SCHRITT 4 und 5 - Beziehungen mit Multiplizitaeten\n"+
        "  Kunde  1 ----- 0..*  Bestellung     (\"mehrere\")\n"+
        "  Bestellung <#>- 1..* Position       (\"mindestens eine\",\n"+
        "                                       Komposition: Position stirbt\n"+
        "                                       mit der Bestellung)\n"+
        "  Position  *----- 1   Artikel        (\"genau einen\")\n\n"+
        "  Beachte die GEFUELLTE Raute: Eine Bestellposition ohne\n"+
        "  Bestellung ergibt fachlich keinen Sinn.",
      codeLang:'Klassenfindung',
      tip:'Die Multiplizitäten stehen fast wörtlich im Aufgabentext — „mehrere" wird zu 0..*, „mindestens eine" zu 1..*, „genau einen" zu 1. Unterstreiche diese Wörter beim ersten Lesen. Und begründe die Rautenwahl: Eine Bestellposition kann ohne ihre Bestellung nicht existieren, also Komposition. Ein Artikel dagegen existiert unabhängig von jeder Bestellung, also nur eine Assoziation.',
      quiz:[
        {q:'Wann wird ein Substantiv aus dem Text zur Klasse?', options:['Immer','Wenn es eigene Eigenschaften und eigenes Verhalten hat','Nur wenn es großgeschrieben ist'], correct:1, explain:'Sonst ist es ein Attribut einer anderen Klasse.'},
        {q:'Wie übersetzt sich „mindestens eine Position" in eine Multiplizität?', options:['0..*','1..*','1'], correct:1, explain:'0..* wäre „beliebig viele, auch keine".'},
        {q:'Welche Beziehung gilt zwischen Bestellung und Bestellposition?', options:['Vererbung','Komposition – die Position kann ohne die Bestellung nicht existieren','Assoziation'], correct:1, explain:'Gefüllte Raute an der Bestellung als dem Ganzen.'}
      ]
    },
    {
      id:'m35-l2', title:'Statisch oder Instanz? Klassen- und Objektebene', minutes:8,
      body:
        '<p>Manche Attribute und Methoden gehören nicht zu einem <em>einzelnen Objekt</em>, sondern zur <strong>Klasse selbst</strong>. Sie werden als <strong>statisch</strong> (static) gekennzeichnet und in UML <strong>unterstrichen</strong> dargestellt.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Instanz (Objektebene)</th><th>Statisch (Klassenebene)</th></tr>'+
        '<tr><td>Existiert</td><td>je Objekt einmal</td><td>genau einmal für alle</td></tr>'+
        '<tr><td>Zugriff</td><td><code>objekt.methode()</code></td><td><code>Klasse.methode()</code></td></tr>'+
        '<tr><td>Beispiel Attribut</td><td>kontostand, name</td><td>anzahlKonten, zinssatzAllgemein</td></tr>'+
        '<tr><td>Beispiel Methode</td><td>abheben()</td><td>istGueltigeIban(text)</td></tr>'+
        '<tr><td>UML</td><td>normal</td><td><u>unterstrichen</u></td></tr></table>'+
        '<p><strong>Die Regel:</strong> Statisch wird etwas, das <em>keinen Objektzustand</em> braucht. Eine Methode, die nur aus ihren Parametern ein Ergebnis berechnet, gehört zur Klasse. Eine Methode, die auf Attribute eines konkreten Objekts zugreift, gehört zur Instanz.</p>'+
        '<p><strong>Die Konsequenz, die geprüft wird:</strong> Eine statische Methode kann <em>nicht</em> auf Instanzattribute zugreifen — es gibt schlicht kein Objekt, zu dem sie gehören könnte. Umgekehrt darf eine Instanzmethode sehr wohl auf statische Attribute zugreifen.</p>'+
        '<p>Eine <strong>Konstante</strong> ist typischerweise statisch und unveränderlich: <code>MWST_SATZ = 19</code>. Sie existiert einmal, gilt für alle Objekte und wird traditionell in Großbuchstaben geschrieben.</p>',
      code:
        "KLASSE Konto\n"+
        "  PRIVAT STATISCH anzahlKonten : Zahl = 0    // einmal fuer alle\n"+
        "  OEFFENTLICH STATISCH KONSTANT MWST : Zahl = 19\n"+
        "  PRIVAT kontostand : Zahl                    // je Objekt\n\n"+
        "  KONSTRUKTOR Konto(start : Zahl)\n"+
        "    kontostand   <- start\n"+
        "    anzahlKonten <- anzahlKonten + 1          // Zaehler hochsetzen\n"+
        "  ENDEKONSTRUKTOR\n\n"+
        "  OEFFENTLICH STATISCH METHODE getAnzahlKonten() : Zahl\n"+
        "    GIB anzahlKonten ZURUECK\n"+
        "    // GIB kontostand ZURUECK   waere ein FEHLER:\n"+
        "    // Welches Konto denn? Es gibt hier kein Objekt.\n"+
        "  ENDEMETHODE\n"+
        "ENDEKLASSE\n\n"+
        "a <- NEU Konto(100)\n"+
        "b <- NEU Konto(250)\n"+
        "c <- NEU Konto(0)\n\n"+
        "Ausgabe Konto.getAnzahlKonten()   // 3  - ueber die KLASSE aufgerufen\n"+
        "Ausgabe a.getKontostand()         // 100 - ueber das OBJEKT\n\n"+
        "  Es gibt drei Kontostaende, aber nur EINEN Zaehler.",
      codeLang:'Statisch vs. Instanz',
      tip:'Der Fehlerkommentar im Beispiel ist die Kernaussage: Eine statische Methode hat kein „ich", also keinen Zugriff auf Instanzattribute. Wenn eine Prüfungsaufgabe fragt, warum ein Zugriff nicht möglich ist, lautet die Antwort genau so. Und beim Entwerfen hilft die Gegenprobe: Ergibt die Methode ohne ein konkretes Objekt Sinn? Dann ist sie statisch.',
      quiz:[
        {q:'Wie wird ein statisches Attribut in UML dargestellt?', options:['Kursiv','Unterstrichen','Fett'], correct:1, explain:'Kursiv kennzeichnet dagegen abstrakte Klassen und Methoden.'},
        {q:'Kann eine statische Methode auf ein Instanzattribut zugreifen?', options:['Ja, immer','Nein, es existiert kein zugehöriges Objekt','Nur wenn das Attribut public ist'], correct:1, explain:'Umgekehrt darf eine Instanzmethode auf statische Attribute zugreifen.'},
        {q:'Welche Methode sollte statisch sein?', options:['abheben(betrag)','istGueltigeIban(text)','getKontostand()'], correct:1, explain:'Sie berechnet nur aus ihrem Parameter und braucht keinen Objektzustand.'}
      ]
    },
    {
      id:'m35-l3', title:'Gute Klassen: Verantwortung, Kopplung, Kohäsion', minutes:9,
      body:
        '<p>Ein Klassendiagramm kann formal korrekt und trotzdem schlecht sein. Drei Begriffe beschreiben die Qualität eines Entwurfs — sie tauchen in Begründungsaufgaben auf.</p>'+
        '<p><strong>Kohäsion</strong> beschreibt, wie gut die Bestandteile einer Klasse zusammengehören. <strong>Hohe Kohäsion ist das Ziel:</strong> Eine Klasse hat genau eine klar umrissene Verantwortung. Eine Klasse <code>Rechnung</code>, die zugleich PDFs erzeugt, E-Mails versendet und die Datenbank pflegt, hat niedrige Kohäsion — sie macht drei Dinge, die nichts miteinander zu tun haben.</p>'+
        '<p><strong>Kopplung</strong> beschreibt, wie stark Klassen voneinander abhängen. <strong>Lose Kopplung ist das Ziel:</strong> Eine Änderung in einer Klasse soll möglichst wenige andere betreffen. Erreicht wird sie über klare Schnittstellen statt direkter Zugriffe auf Interna.</p>'+
        '<p><strong>Die Merkformel:</strong> <em>Hohe Kohäsion, lose Kopplung.</em> Beides zusammen macht Software änderbar — und Änderbarkeit ist der teuerste Posten im Lebenszyklus einer Anwendung.</p>'+
        '<p><strong>Das Single-Responsibility-Prinzip</strong> formuliert dasselbe aus einem anderen Blickwinkel: Eine Klasse soll <em>genau einen Grund</em> haben, sich zu ändern. Ändert sich das Rechnungslayout <em>und</em> das Mailprotokoll <em>und</em> das Datenbankschema jeweils an derselben Klasse, sind es drei Gründe — also drei Klassen.</p>'+
        '<p><strong>Typische Entwurfsfehler</strong>, die in Prüfungslösungen kritisiert werden:</p>'+
        '<ul><li><strong>Gottklasse</strong> — eine Klasse, die fast alles macht, während die übrigen nur Daten halten.</li>'+
        '<li><strong>Anämisches Modell</strong> — Klassen mit ausschließlich Attributen, Gettern und Settern; die gesamte Logik liegt außerhalb. Das ist objektorientiert nur der Form nach.</li>'+
        '<li><strong>Vererbung statt Aggregation</strong> — der Ist-ein-Test wurde nicht gemacht.</li>'+
        '<li><strong>Öffentliche Attribute</strong> — die Kapselung wurde aufgegeben.</li></ul>',
      code:
        "SCHLECHT - niedrige Kohaesion, eine Klasse macht alles\n\n"+
        "KLASSE Rechnung\n"+
        "  + gesamtbetragBerechnen()\n"+
        "  + alsPdfExportieren()          // Darstellung\n"+
        "  + perMailVersenden()           // Kommunikation\n"+
        "  + inDatenbankSpeichern()       // Persistenz\n"+
        "  + umsatzsteuerAnFinanzamtMelden()\n"+
        "ENDEKLASSE\n\n"+
        "  Fuenf Gruende, diese Klasse zu aendern. Aendert sich das\n"+
        "  Mailprotokoll, muss die Rechnungsklasse angefasst werden -\n"+
        "  obwohl sich an der Rechnung selbst nichts geaendert hat.\n\n"+
        "BESSER - je eine Verantwortung\n\n"+
        "KLASSE Rechnung            + gesamtbetragBerechnen()\n"+
        "                           + positionHinzufuegen()\n"+
        "KLASSE RechnungsDrucker    + alsPdfExportieren(rechnung)\n"+
        "KLASSE MailVersand         + versende(empfaenger, anhang)\n"+
        "KLASSE RechnungsRepository + speichere(rechnung)\n"+
        "                           + findeNach(nummer)\n\n"+
        "  Jede Klasse hat genau einen Grund, sich zu aendern.\n"+
        "  Ein Wechsel des Mailanbieters beruehrt nur MailVersand.\n\n"+
        "KOPPLUNG MESSEN - eine einfache Probe\n"+
        "  Zaehle, wie viele andere Klassen eine Klasse kennt.\n"+
        "  Viele Abhaengigkeiten = enge Kopplung = jede Aenderung\n"+
        "  zieht Kreise.",
      codeLang:'Entwurfsqualität',
      tip:'Wenn eine Aufgabe einen vorgegebenen Entwurf bewerten lässt, suche zuerst nach der Gottklasse — sie ist der häufigste eingebaute Fehler. Formuliere die Kritik mit dem Fachbegriff und einer Folge: „Die Klasse Rechnung hat niedrige Kohäsion, weil sie Berechnung, Darstellung, Versand und Speicherung vereint. Ein Wechsel des Mailanbieters würde eine Änderung an der Rechnungsklasse erzwingen." Fachbegriff plus konkrete Folge — das ist die vollständige Antwort.',
      quiz:[
        {q:'Was ist bei einem guten Entwurf anzustreben?', options:['Hohe Kopplung und niedrige Kohäsion','Hohe Kohäsion und lose Kopplung','Beides möglichst hoch'], correct:1, explain:'Eine klare Verantwortung je Klasse, wenige Abhängigkeiten dazwischen.'},
        {q:'Was besagt das Single-Responsibility-Prinzip?', options:['Eine Klasse darf nur eine Methode haben','Eine Klasse soll genau einen Grund haben, sich zu ändern','Jede Methode darf nur einen Parameter haben'], correct:1, explain:'Mehrere Änderungsgründe sind das Signal, die Klasse aufzuteilen.'},
        {q:'Was kennzeichnet ein anämisches Modell?', options:['Zu viele Klassen','Klassen enthalten nur Attribute mit Gettern und Settern, die Logik liegt außerhalb','Zu wenige Attribute'], correct:1, explain:'Formal objektorientiert, inhaltlich prozedural – Daten und Verhalten gehören zusammen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m8', part:3, partTitle:'Objektorientierung & Softwareentwicklung', title:'UML-Anwendungsfalldiagramm', relevanz:'hoch',
  lessons:[
    {
      id:'m8-l1', title:'Use-Case-Diagramm: die fünf Bausteine', minutes:9,
      body:
        '<p>Das <strong>Anwendungsfalldiagramm</strong> beantwortet genau eine Frage: <strong>Wer darf was mit dem System machen?</strong> Es zeigt keine Reihenfolge, keine Bedingungen und keine Daten – nur Funktionen aus Nutzersicht.</p>'+
        '<table class="lesson-table"><tr><th>Baustein</th><th>Darstellung</th><th>Regel</th></tr>'+
        '<tr><td>Akteur</td><td>Strichmännchen</td><td>steht <strong>außerhalb</strong> der Systemgrenze</td></tr>'+
        '<tr><td>Anwendungsfall</td><td>Ellipse</td><td>Verb + Objekt, <strong>innerhalb</strong> des Rahmens</td></tr>'+
        '<tr><td>Systemgrenze</td><td>Rechteck</td><td>umschließt alle Anwendungsfälle</td></tr>'+
        '<tr><td>Assoziation</td><td>durchgezogene Linie</td><td>„dieser Akteur nutzt diesen Fall"</td></tr>'+
        '<tr><td>include / extend</td><td>gestrichelter Pfeil</td><td>Beziehung zwischen Anwendungsfällen</td></tr></table>'+
        '<p>Ein Akteur muss kein Mensch sein – auch ein Fremdsystem oder ein zeitgesteuerter Auslöser ist ein Akteur.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 240" role="img" aria-label="Use-Case-Diagramm mit Systemgrenze, zwei Akteuren und include-Beziehung"><rect class="s-box" x="150" y="14" width="330" height="206" rx="6"/><text class="s-lbl" x="164" y="34">Ticketsystem</text><ellipse class="s-accent" cx="300" cy="66" rx="106" ry="24"/><text class="s-lbl" x="300" y="70" text-anchor="middle">St&#246;rung melden</text><ellipse class="s-accent" cx="300" cy="132" rx="106" ry="24"/><text class="s-lbl" x="300" y="136" text-anchor="middle">Ticket bearbeiten</text><ellipse class="s-box" cx="300" cy="196" rx="106" ry="24"/><text class="s-lbl" x="300" y="200" text-anchor="middle">Berechtigung pr&#252;fen</text><path class="s-dash" d="M300 90 L300 108"/><text class="s-lbl" x="308" y="104">&#171;include&#187;</text><path class="s-dash" d="M300 156 L300 172"/><text class="s-lbl" x="308" y="170">&#171;include&#187;</text><g class="s-actor"><circle cx="70" cy="52" r="11"/><line x1="70" y1="63" x2="70" y2="92"/><line x1="50" y1="72" x2="90" y2="72"/><line x1="70" y1="92" x2="54" y2="116"/><line x1="70" y1="92" x2="86" y2="116"/></g><text class="s-lbl" x="70" y="134" text-anchor="middle">Anwender</text><line class="s-line" x1="90" y1="70" x2="194" y2="66"/><g class="s-actor"><circle cx="70" cy="164" r="11"/><line x1="70" y1="175" x2="70" y2="204"/><line x1="50" y1="184" x2="90" y2="184"/><line x1="70" y1="204" x2="54" y2="228"/><line x1="70" y1="204" x2="86" y2="228"/></g><text class="s-lbl" x="70" y="18" text-anchor="middle">&#8593; ausserhalb</text><line class="s-line" x1="90" y1="180" x2="196" y2="140"/></svg><figcaption>Akteure stehen grundsaetzlich ausserhalb des Rechtecks. Der include-Pfeil zeigt vom einschliessenden auf den eingeschlossenen Anwendungsfall.</figcaption></figure>',
      code:
        "Systemgrenze [                                    ]\n"+
        "  Kunde  ------  ( Stoerungsmeldung senden )\n"+
        "  IT-Abt ------  ( Stoerungsmeldung erfassen )\n"+
        "  IT-Abt ------  ( Arbeitsplanung )\n"+
        "                        :\n"+
        "                  <<include>>\n"+
        "                        v\n"+
        "                 ( Priorisierung )\n\n"+
        "Akteure stehen AUSSERHALB des Rechtecks, Anwendungsfaelle innerhalb.",
      codeLang:'UML Use Case (Herbst 2023)',
      tip:'Zwei Fehler kosten in dieser Aufgabenform regelmäßig Punkte, und beide sind leicht vermeidbar. Erstens: Akteure werden ins Rechteck gezeichnet – sie gehören grundsätzlich außerhalb der Systemgrenze, denn sie sind nicht Teil des Systems. Zweitens: Anwendungsfälle werden als Substantiv benannt. „Störungsmeldung" ist kein Anwendungsfall, „Störungsmeldung erfassen" schon.',
      quiz:[
        {q:'Wo steht ein Akteur im Use-Case-Diagramm?', options:['Innerhalb der Systemgrenze','Außerhalb der Systemgrenze','In der Ellipse'], correct:1, explain:'Akteure sind Rollen außerhalb des Systems – Mensch oder Fremdsystem.'},
        {q:'Wie wird ein Anwendungsfall korrekt benannt?', options:['Als Substantiv: „Störungsmeldung"','Als Verb mit Objekt: „Störungsmeldung erfassen"','Mit einer Nummer'], correct:1, explain:'Ein Anwendungsfall ist eine Funktion, also eine Tätigkeit.'},
        {q:'Kann ein Fremdsystem Akteur in einem Use-Case-Diagramm sein?', options:['Nein, nur Menschen','Ja, jede Rolle außerhalb der Systemgrenze','Nur bei Webanwendungen'], correct:1, explain:'Auch ein zeitgesteuerter Auslöser wird als Akteur modelliert.'}
      ]
    },
    {
      id:'m8-l2', title:'include, extend und Generalisierung', minutes:9,
      body:
        '<p>Die Beziehungen zwischen Anwendungsfällen sind <em>die</em> Prüfungsfrage zum Use-Case-Diagramm – vor allem die Pfeilrichtung.</p>'+
        '<ul><li><strong>&laquo;include&raquo;</strong> – der eingeschlossene Fall läuft <strong>immer</strong> mit. Signalwörter im Text: „immer", „in jedem Fall", „beinhaltet", „dabei findet … statt". Der Pfeil zeigt <strong>vom einschließenden zum eingeschlossenen</strong> Fall.</li>'+
        '<li><strong>&laquo;extend&raquo;</strong> – der erweiternde Fall läuft <strong>nur unter Bedingungen</strong>. Signalwörter: „optional", „gegebenenfalls", „falls", „kann". Der Pfeil zeigt <strong>vom erweiternden zum erweiterten</strong> Fall – also genau umgekehrt.</li>'+
        '<li><strong>Generalisierung</strong> – durchgezogene Linie mit geschlossener Dreieckspitze. Bedeutet Vererbung, auch zwischen Akteuren: „Der Administrator kann alles, was ein Mitarbeiter kann." Der Pfeil zeigt <strong>zum allgemeineren</strong> Element.</li></ul>',
      code:
        "Mitarbeiter    -->  ( Tuer oeffnen )      --<<include>>-->  ( Berechtigungspruefung )\n"+
        "Mitarbeiter    -->  ( Tuer zuschliessen ) --<<include>>-->  ( Berechtigungspruefung )\n"+
        "Administrator  -->  ( Tuerschloss programmieren ) --<<include>>--> ( Berechtigungspruefung )\n\n"+
        "Administrator  ---|>  Mitarbeiter     (Generalisierung: kann alles, was MA kann)\n\n"+
        "Alle drei include-Pfeile zeigen auf EINEN gemeinsamen Anwendungsfall.",
      codeLang:'UML (Herbst 2024)',
      tip:'Der Merksatz für die drei Pfeilrichtungen, der in der Prüfung Sicherheit gibt: Bei include zeigt der Große auf den Kleinen, bei extend zeigt der Kleine auf den Großen, und bei der Generalisierung zeigt das Spezielle auf das Allgemeine. Und beachte den Sinn von include: Gemeinsam genutztes Verhalten wird nur einmal modelliert – deshalb zeigen mehrere Pfeile auf denselben Anwendungsfall.',
      quiz:[
        {q:'Welches Signalwort deutet auf «include» hin?', options:['„optional"','„immer" bzw. „dabei findet stets statt"','„gegebenenfalls"'], correct:1, explain:'„Optional" und „gegebenenfalls" deuten dagegen auf «extend».'},
        {q:'Wohin zeigt der Generalisierungspfeil?', options:['Zum spezielleren Element','Zum allgemeineren Element','In beide Richtungen'], correct:1, explain:'Vom Administrator zum Mitarbeiter, weil der Administrator der speziellere Fall ist.'},
        {q:'Drei Anwendungsfälle zeigen per include auf denselben vierten. Was bedeutet das?', options:['Ein Modellierungsfehler','Gemeinsam genutztes Verhalten wird nur einmal modelliert','Die drei Fälle sind identisch'], correct:1, explain:'Genau dafür ist include gedacht — Wiederverwendung statt Wiederholung.'}
      ]
    },
    {
      id:'m8-l3', title:'Aktivitäts- und Sequenzdiagramm zur Abgrenzung', minutes:7,
      body:
        '<p>Die AP1 fragt gern, welches Diagramm für welchen Zweck passt. Das Use-Case-Diagramm zeigt <em>keine</em> Abläufe – dafür gibt es andere Typen:</p>'+
        '<ul><li><strong>Aktivitätsdiagramm</strong> – zeigt den zeitlichen Ablauf mit Start, Aktionen, Entscheidungen (Raute), Parallelisierung (Balken) und Ende. Es ist das UML-Gegenstück zum Programmablaufplan und eignet sich für Geschäftsprozesse.</li>'+
        '<li><strong>Sequenzdiagramm</strong> – zeigt den zeitlichen Nachrichtenaustausch zwischen Objekten. Senkrechte Lebenslinien, waagerechte Pfeile für Aufrufe, Zeit läuft von oben nach unten.</li>'+
        '<li><strong>Zustandsdiagramm</strong> – zeigt die Zustände eines Objekts und die auslösenden Übergänge (Ticket: offen → in Bearbeitung → geschlossen).</li></ul>'+
        '<p><strong>Struktur- oder Verhaltensdiagramm?</strong> Klassendiagramm und Komponentendiagramm beschreiben die <em>Struktur</em>, Use-Case, Aktivität, Sequenz und Zustand das <em>Verhalten</em>.</p>',
      code:'',
      tip:'Wenn eine Aufgabe nach einem Ablauf mit Reihenfolge und Entscheidungen fragt und du unsicher bist, welches Diagramm gemeint ist, hilft eine Kontrollfrage: Geht es um die Reihenfolge von Schritten, ist es ein Aktivitätsdiagramm. Geht es darum, wer wem wann eine Nachricht schickt, ist es ein Sequenzdiagramm. Und geht es nur darum, wer was darf, bleibt es beim Use-Case.',
      quiz:[
        {q:'Welches Diagramm zeigt den zeitlichen Nachrichtenaustausch zwischen Objekten?', options:['Klassendiagramm','Sequenzdiagramm','Use-Case-Diagramm'], correct:1, explain:'Lebenslinien senkrecht, Zeit von oben nach unten.'},
        {q:'Welches Diagramm ist ein Strukturdiagramm?', options:['Aktivitätsdiagramm','Klassendiagramm','Zustandsdiagramm'], correct:1, explain:'Die übrigen beschreiben Verhalten.'},
        {q:'Welches Diagramm zeigt die Zustände eines Objekts und die auslösenden Übergänge?', options:['Das Aktivitätsdiagramm','Das Zustandsdiagramm','Das Klassendiagramm'], correct:1, explain:'Ein Ticket wandert darin von offen über in Bearbeitung nach geschlossen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m9', part:3, partTitle:'Objektorientierung & Softwareentwicklung', title:'UML-Klassendiagramm', relevanz:'hoch',
  lessons:[
    {
      id:'m9-l1', title:'Aufbau einer Klasse und Sichtbarkeiten', minutes:8,
      body:
        '<p>Eine Klasse wird als Rechteck mit <strong>drei Abschnitten</strong> gezeichnet:</p>'+
        '<ol><li><strong>Klassenname</strong> – fett, Substantiv im Singular.</li>'+
        '<li><strong>Attribute</strong> – Schreibweise <code>name: Datentyp</code>.</li>'+
        '<li><strong>Methoden</strong> – Schreibweise <code>name(Parameter): Rückgabetyp</code>.</li></ol>'+
        '<p>Die <strong>Sichtbarkeiten</strong> werden als Zeichen vorangestellt:</p>'+
        '<table class="lesson-table"><tr><th>Zeichen</th><th>Bedeutung</th><th>Sichtbar in</th></tr>'+
        '<tr><td>+</td><td>public</td><td>überall</td></tr>'+
        '<tr><td>−</td><td>private</td><td>nur in der Klasse selbst</td></tr>'+
        '<tr><td>#</td><td>protected</td><td>Klasse und Unterklassen</td></tr>'+
        '<tr><td>~</td><td>package</td><td>im selben Paket</td></tr></table>'+
        '<p>Die Faustregel der objektorientierten Programmierung: <strong>Attribute private, Zugriff über public Getter und Setter</strong> – das nennt man <strong>Kapselung</strong>.</p>',
      code:
        "+------------------------------+\n"+
        "|      Versicherungsobjekt     |   <- Klassenname, fett\n"+
        "+------------------------------+\n"+
        "| - neupreis: double           |   <- Attribute, privat\n"+
        "| - baujahr: int               |\n"+
        "| - schadenshoehe: double      |\n"+
        "+------------------------------+\n"+
        "| + auszahlen(): void          |   <- Methoden, oeffentlich\n"+
        "| + getNeupreis(): double      |\n"+
        "+------------------------------+",
      codeLang:'UML Klasse',
      tip:'Die vier OOP-Grundprinzipien werden gern als reine Definitionsfrage geprüft, und die Antworten sind kurz: Kapselung heißt Daten und Methoden zusammenfassen und Interna verbergen. Vererbung heißt Gemeinsames einmal definieren und weitergeben. Polymorphie heißt gleicher Methodenname, unterschiedliches Verhalten je nach Klasse. Abstraktion heißt nur die relevanten Eigenschaften modellieren.',
      quiz:[
        {q:'Welches Zeichen steht für private Sichtbarkeit?', options:['+','−','#'], correct:1, explain:'+ ist public, # ist protected, ~ ist package.'},
        {q:'Was bezeichnet man als Kapselung?', options:['Vererbung von Attributen','Attribute privat halten und den Zugriff über öffentliche Methoden steuern','Mehrere Klassen in einer Datei'], correct:1, explain:'Interna werden verborgen, der Zugriff läuft kontrolliert über die Schnittstelle.'},
        {q:'Wie wird eine abstrakte Klasse in UML gekennzeichnet?', options:['Unterstrichen','Kursiv oder mit dem Zusatz {abstract}','Fett'], correct:1, explain:'Unterstrichen werden dagegen statische Elemente.'}
      ]
    },
    {
      id:'m9-l2', title:'Die Beziehungsarten und ihre Pfeile', minutes:9,
      body:
        '<p>Die Pfeilformen sind eine sichere Punktequelle – wenn man sie auseinanderhält:</p>'+
        '<table class="lesson-table"><tr><th>Beziehung</th><th>Darstellung</th><th>Lesart</th></tr>'+
        '<tr><td>Generalisierung / Vererbung</td><td>durchgezogene Linie, <strong>geschlossene, nicht ausgefüllte Dreieckspitze</strong> zur Oberklasse</td><td>„ist ein"</td></tr>'+
        '<tr><td>Realisierung</td><td>gestrichelte Linie, Dreieckspitze</td><td>„implementiert"</td></tr>'+
        '<tr><td>Assoziation</td><td>einfache Linie, oft mit Kardinalitäten</td><td>„kennt"</td></tr>'+
        '<tr><td>Aggregation</td><td>Linie mit <strong>leerer</strong> Raute</td><td>„hat ein" – Teile existieren auch ohne das Ganze</td></tr>'+
        '<tr><td>Komposition</td><td>Linie mit <strong>gefüllter</strong> Raute</td><td>„besteht aus" – Teile sterben mit dem Ganzen</td></tr></table>'+
        '<p><strong>Multiplizitäten</strong> stehen an den Linienenden: <code>1</code> (genau eines), <code>0..1</code> (höchstens eines), <code>*</code> oder <code>0..*</code> (beliebig viele), <code>1..*</code> (mindestens eines).</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="UML-Klassendiagramm mit Vererbung, Aggregation und Komposition"><rect class="s-box" x="200" y="10" width="160" height="62" rx="2"/><line class="s-line" x1="200" y1="32" x2="360" y2="32"/><line class="s-line" x1="200" y1="52" x2="360" y2="52"/><text class="s-hd" x="280" y="26" text-anchor="middle">Medium</text><text class="s-mono" x="208" y="47">- titel: String</text><text class="s-mono" x="208" y="66">+ ausleihen()</text><polygon class="s-tri" points="280,80 272,96 288,96"/><line class="s-line" x1="280" y1="96" x2="280" y2="112"/><line class="s-line" x1="150" y1="112" x2="410" y2="112"/><line class="s-line" x1="150" y1="112" x2="150" y2="132"/><line class="s-line" x1="410" y1="112" x2="410" y2="132"/><rect class="s-accent" x="84" y="132" width="132" height="44" rx="2"/><text class="s-hd" x="150" y="150" text-anchor="middle">Buch</text><text class="s-mono" x="92" y="168">- isbn: String</text><rect class="s-accent" x="344" y="132" width="132" height="44" rx="2"/><text class="s-hd" x="410" y="150" text-anchor="middle">DVD</text><text class="s-mono" x="352" y="168">- laufzeit: int</text><text class="s-lbl" x="296" y="94">Generalisierung: Spitze zur Oberklasse</text><rect class="s-box" x="24" y="204" width="118" height="30" rx="2"/><text class="s-lbl" x="83" y="224" text-anchor="middle">Abteilung</text><polygon class="s-rhomb-open" points="142,219 158,212 174,219 158,226"/><line class="s-line" x1="174" y1="219" x2="216" y2="219"/><rect class="s-box" x="216" y="204" width="106" height="30" rx="2"/><text class="s-lbl" x="269" y="224" text-anchor="middle">Mitarbeiter</text><text class="s-lbl" x="150" y="248">Aggregation &#8211; leere Raute</text><rect class="s-box" x="352" y="204" width="90" height="30" rx="2"/><text class="s-lbl" x="397" y="224" text-anchor="middle">Rechnung</text><polygon class="s-rhomb-fill" points="442,219 458,212 474,219 458,226"/><line class="s-line" x1="474" y1="219" x2="512" y2="219"/><rect class="s-box" x="512" y="204" width="44" height="30" rx="2"/><text class="s-lbl" x="534" y="224" text-anchor="middle">Pos.</text><text class="s-lbl" x="400" y="248">Komposition &#8211; gef&#252;llte Raute</text></svg><figcaption>Die Raute sitzt immer beim Ganzen. Leer bedeutet, dass das Teil den Verbund ueberlebt, gefuellt bedeutet, dass es mit ihm untergeht.</figcaption></figure>',
      code:
        "Aggregation (leere Raute):   Abteilung <>---- Mitarbeiter\n"+
        "   Die Abteilung wird aufgeloest, die Mitarbeiter existieren weiter.\n\n"+
        "Komposition (gefuellte Raute): Rechnung <#>---- Rechnungsposition\n"+
        "   Wird die Rechnung geloescht, verschwinden auch ihre Positionen.\n\n"+
        "Vererbung:  KFZ ----|>  Versicherungsobjekt\n"+
        "   Pfeil zeigt vom Speziellen zum Allgemeinen.",
      codeLang:'UML Beziehungen',
      tip:'Der Unterschied zwischen Aggregation und Komposition wird am zuverlässigsten mit einer Testfrage geklärt: Was passiert mit dem Teil, wenn das Ganze verschwindet? Überlebt es – etwa der Mitarbeiter einer aufgelösten Abteilung – ist es eine Aggregation mit leerer Raute. Verschwindet es zwangsläufig mit – etwa die Position einer gelöschten Rechnung – ist es eine Komposition mit gefüllter Raute.',
      quiz:[
        {q:'Welche Raute steht für die Komposition?', options:['Die leere Raute','Die gefüllte Raute','Es gibt keine Raute'], correct:1, explain:'Gefüllt heißt: Die Teile sterben mit dem Ganzen.'},
        {q:'Wohin zeigt der Vererbungspfeil?', options:['Vom Allgemeinen zum Speziellen','Vom Speziellen zum Allgemeinen (zur Oberklasse)','In beide Richtungen'], correct:1, explain:'Mit geschlossener, nicht ausgefüllter Dreieckspitze zur Oberklasse.'},
        {q:'Was bedeutet die Multiplizität 0..1?', options:['Genau eines','Höchstens eines, auch keines','Mindestens eines'], correct:1, explain:'Typisch für optionale Beziehungen wie Mitarbeiter und Dienstwagen.'}
      ]
    },
    {
      id:'m9-l3', title:'Klassenhierarchien entwerfen – das Drei-Schritt-Verfahren', minutes:9,
      body:
        '<p>Vererbungsaufgaben folgen immer demselben Muster: Zwei Klassen sind gegeben, du sollst eine gemeinsame Oberklasse bilden. Das Verfahren:</p>'+
        '<ol><li><strong>Schnittmenge bilden.</strong> Was kommt in <em>beiden</em> Klassen vor? Alles davon wandert in die Oberklasse.</li>'+
        '<li><strong>Rest belassen.</strong> Was nur in einer Klasse vorkommt, bleibt dort.</li>'+
        '<li><strong>Sonderfall prüfen.</strong> Gibt es eine Methode mit gleichem Namen, die aber <em>unterschiedlich</em> arbeitet? Dann bleibt sie in beiden Unterklassen – das ist <strong>Polymorphie</strong>. Die Oberklasse darf sie zusätzlich als abstrakte Vorgabe deklarieren.</li></ol>'+
        '<p>Der Merksatz: <strong>Was alle haben, kommt nach oben. Was einer anders macht, bleibt unten.</strong></p>',
      code:
        "Versicherungsobjekt                <- Schnittmenge beider Klassen\n"+
        "  - Neupreis, Baujahr, Schadenshoehe\n"+
        "  + auszahlen()\n"+
        "        /\\\n"+
        "        ||  (Generalisierung, geschlossene Dreieckspitze)\n"+
        "   +----++----+\n"+
        "   |          |\n"+
        " KFZ        Immobilie\n"+
        " - Hersteller  - Wohnflaeche\n"+
        " - Typschluessel - Lagebewertung\n"+
        " - Laufleistung\n"+
        " + restwertBerechnen()   + restwertBerechnen()   <- unterschiedlich!\n"+
        "                          + getLagebewertung()",
      codeLang:'UML (Frühjahr 2023)',
      tip:'Der entscheidende Hinweis steckt oft in einem Nebensatz der Aufgabe: „Die Restwertberechnung erfolgt beim KFZ und bei der Immobilie unterschiedlich." Damit ist klar, dass die Methode nicht einfach nach oben wandern darf. Gleicher Name plus unterschiedliche Implementierung ist die Definition von Polymorphie – und die IHK lässt beide Varianten gelten, also auch die zusätzliche abstrakte Deklaration in der Oberklasse.',
      quiz:[
        {q:'Was kommt in die Oberklasse?', options:['Alles, was beide Unterklassen gemeinsam haben','Nur die Methoden','Alles Spezielle'], correct:0, explain:'Die Schnittmenge aus Attributen und Methoden.'},
        {q:'Eine Methode heißt in beiden Unterklassen gleich, arbeitet aber unterschiedlich. Wie nennt man das?', options:['Kapselung','Polymorphie','Aggregation'], correct:1, explain:'Gleicher Name, unterschiedliches Verhalten je nach Klasse.'},
        {q:'Zwei Unterklassen haben ein Attribut mit gleichem Namen und gleicher Bedeutung. Was tun?', options:['In beiden belassen','In die Oberklasse verschieben','Umbenennen'], correct:1, explain:'Was alle gemeinsam haben, kommt nach oben — das ist der Kern der Generalisierung.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m39', part:3, partTitle:'Objektorientierung & Softwareentwicklung', title:'UML-Verhaltensdiagramme', relevanz:'hoch',
  lessons:[
    {
      id:'m39-l1', title:'Das Aktivitätsdiagramm', minutes:10,
      body:
        '<p>Das <strong>Aktivitätsdiagramm</strong> zeigt einen <em>Ablauf</em>: Was passiert in welcher Reihenfolge, wo wird entschieden, was läuft gleichzeitig. Es ist das UML-Gegenstück zum Programmablaufplan und eignet sich für Geschäftsprozesse ebenso wie für einzelne Methoden.</p>'+
        '<table class="lesson-table"><tr><th>Symbol</th><th>Bedeutung</th></tr>'+
        '<tr><td>ausgefüllter Kreis</td><td>Startknoten &#8211; genau einer je Diagramm</td></tr>'+
        '<tr><td>Kreis mit Ring</td><td>Endknoten &#8211; es darf mehrere geben</td></tr>'+
        '<tr><td>abgerundetes Rechteck</td><td>Aktion, benannt mit Verb und Objekt</td></tr>'+
        '<tr><td>Raute</td><td>Verzweigung; ausgehende Kanten tragen Bedingungen in eckigen Klammern</td></tr>'+
        '<tr><td>Raute mit mehreren Eingängen</td><td>Zusammenführung der Zweige</td></tr>'+
        '<tr><td><strong>dicker Balken</strong></td><td>Parallelisierung (Fork) und Synchronisierung (Join)</td></tr>'+
        '<tr><td>Pfeil</td><td>Kontrollfluss</td></tr></table>'+
        '<p><strong>Der Unterschied, der geprüft wird &#8211; Raute gegen Balken:</strong> Bei der <strong>Raute</strong> läuft <em>genau ein</em> Zweig weiter, es wird entschieden. Beim <strong>Balken</strong> laufen <em>alle</em> Zweige gleichzeitig, und der zweite Balken wartet, bis der letzte fertig ist. Wer den Balken als Entscheidung liest, hat den Ablauf falsch verstanden.</p>'+
        '<p><strong>Verantwortungsbereiche (Swimlanes)</strong> unterteilen das Diagramm in Spalten oder Zeilen &#8211; je eine je Rolle oder Abteilung. Damit ist auf einen Blick sichtbar, <em>wer</em> welchen Schritt ausführt. In Prüfungsaufgaben zu Geschäftsprozessen wird das oft ausdrücklich verlangt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 372" role="img" aria-label="Aktivitätsdiagramm einer Bestellabwicklung mit Verzweigung und Parallelisierung">'+
        '<circle class="s-dot" cx="80" cy="26" r="9"/>'+
        '<line class="s-arrow" x1="80" y1="35" x2="80" y2="46" marker-end="url(#akd)"/>'+
        '<rect class="s-accent" x="16" y="50" width="128" height="32" rx="14"/>'+
        '<text class="s-lbl" x="80" y="70" text-anchor="middle">Bestellung erfassen</text>'+
        '<line class="s-arrow" x1="80" y1="82" x2="80" y2="94" marker-end="url(#akd)"/>'+
        '<polygon class="s-warn" points="80,96 120,126 80,156 40,126"/>'+
        '<text class="s-lbl" x="80" y="130" text-anchor="middle">Zahlung ok?</text>'+
        '<line class="s-arrow" x1="120" y1="126" x2="244" y2="126" marker-end="url(#akd)"/>'+
        '<text class="s-mono" x="176" y="118" text-anchor="middle">[nein]</text>'+
        '<rect class="s-box" x="248" y="110" width="152" height="32" rx="14"/>'+
        '<text class="s-lbl" x="324" y="130" text-anchor="middle">Kunde benachrichtigen</text>'+
        '<line class="s-arrow" x1="400" y1="126" x2="432" y2="126" marker-end="url(#akd)"/>'+
        '<circle class="s-box" cx="447" cy="126" r="11"/><circle class="s-dot" cx="447" cy="126" r="6"/>'+
        '<line class="s-arrow" x1="80" y1="156" x2="80" y2="172" marker-end="url(#akd)"/>'+
        '<text class="s-mono" x="92" y="170">[ja]</text>'+
        '<rect class="s-rhomb-fill" x="20" y="176" width="300" height="7" rx="3"/>'+
        '<text class="s-lbl" x="330" y="183">Fork &#8211; ab hier parallel</text>'+
        '<line class="s-arrow" x1="70" y1="183" x2="70" y2="198" marker-end="url(#akd)"/>'+
        '<line class="s-arrow" x1="250" y1="183" x2="250" y2="198" marker-end="url(#akd)"/>'+
        '<rect class="s-accent" x="16" y="202" width="118" height="32" rx="14"/>'+
        '<text class="s-lbl" x="75" y="222" text-anchor="middle">Ware packen</text>'+
        '<rect class="s-accent" x="186" y="202" width="140" height="32" rx="14"/>'+
        '<text class="s-lbl" x="256" y="222" text-anchor="middle">Rechnung erstellen</text>'+
        '<line class="s-arrow" x1="70" y1="234" x2="70" y2="248" marker-end="url(#akd)"/>'+
        '<line class="s-arrow" x1="250" y1="234" x2="250" y2="248" marker-end="url(#akd)"/>'+
        '<rect class="s-rhomb-fill" x="20" y="252" width="300" height="7" rx="3"/>'+
        '<text class="s-lbl" x="330" y="259">Join &#8211; wartet auf beide</text>'+
        '<line class="s-arrow" x1="170" y1="259" x2="170" y2="276" marker-end="url(#akd)"/>'+
        '<rect class="s-accent" x="100" y="280" width="140" height="32" rx="14"/>'+
        '<text class="s-lbl" x="170" y="300" text-anchor="middle">Ware versenden</text>'+
        '<line class="s-arrow" x1="170" y1="312" x2="170" y2="328" marker-end="url(#akd)"/>'+
        '<circle class="s-box" cx="170" cy="342" r="11"/><circle class="s-dot" cx="170" cy="342" r="6"/>'+
        '<text class="s-lbl" x="20" y="366">Raute: genau ein Zweig l&#228;uft weiter. Balken: alle Zweige laufen gleichzeitig.</text>'+
        '<defs><marker id="akd" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Packen und Rechnung laufen parallel, der zweite Balken wartet auf beide. Die Raute darüber entscheidet dagegen — dort läuft nur ein Zweig weiter.</figcaption></figure>',
      code:
        "WANN RAUTE, WANN BALKEN? - die Kontrollfrage\n\n"+
        "  Kann BEIDES gleichzeitig passieren?\n"+
        "     ja   -> Balken (Fork/Join)\n"+
        "     nein -> Raute (Verzweigung)\n\n"+
        "  Beispiele\n"+
        "     Zahlung geprueft ODER abgelehnt        -> Raute\n"+
        "     Ware packen UND Rechnung schreiben     -> Balken\n"+
        "     Kunde ist Neukunde ODER Bestandskunde  -> Raute\n"+
        "     Mail senden UND Lagerbestand buchen    -> Balken\n\n"+
        "BEDINGUNGEN GEHOEREN AN DIE KANTE, NICHT IN DIE RAUTE\n"+
        "     richtig:  Raute --[Betrag > 1000]--> Freigabe einholen\n"+
        "     falsch :  Raute mit dem Text \"Freigabe noetig?\" und\n"+
        "               unbeschrifteten Ausgaengen\n\n"+
        "  Die Ausgaenge muessen sich ausschliessen und zusammen\n"+
        "  alle Faelle abdecken - sonst ist der Ablauf unvollstaendig.\n\n"+
        "SWIMLANES - wer macht was\n"+
        "     | Kunde        | Vertrieb          | Lager        |\n"+
        "     | bestellen    |                   |              |\n"+
        "     |              | Bestellung pruefen|              |\n"+
        "     |              |                   | Ware packen  |\n"+
        "     | Ware erhalten|                   |              |",
      codeLang:'Aktivitätsdiagramm',
      tip:'Wenn eine Aufgabe einen Geschäftsprozess modellieren lässt, suche im Text zuerst nach dem Wort „gleichzeitig" oder „parallel" — dort gehört ein Balkenpaar hin, und genau dafür gibt es Punkte. Das zweite Signalwort ist „falls" oder „wenn": dort gehört eine Raute hin, und die Bedingung schreibst du in eckigen Klammern an die ausgehende Kante, nicht in die Raute selbst.',
      quiz:[
        {q:'Was bedeutet der dicke Balken im Aktivitätsdiagramm?', options:['Eine Entscheidung zwischen zwei Wegen','Parallelisierung — alle ausgehenden Zweige laufen gleichzeitig','Das Ende des Ablaufs'], correct:1, explain:'Der zweite Balken synchronisiert wieder und wartet auf den langsamsten Zweig.'},
        {q:'Wo steht die Bedingung einer Verzweigung?', options:['In der Raute selbst','In eckigen Klammern an der ausgehenden Kante','Im Startknoten'], correct:1, explain:'Die Ausgänge müssen sich ausschließen und zusammen alle Fälle abdecken.'},
        {q:'Wozu dienen Swimlanes?', options:['Sie zeigen die Dauer der Schritte','Sie ordnen jeden Schritt einer Rolle oder Abteilung zu','Sie markieren Fehlerfälle'], correct:1, explain:'Damit ist auf einen Blick sichtbar, wer welchen Schritt ausführt.'}
      ]
    },
    {
      id:'m39-l2', title:'Das Sequenzdiagramm', minutes:10,
      body:
        '<p>Das <strong>Sequenzdiagramm</strong> beantwortet eine andere Frage als das Aktivitätsdiagramm: nicht <em>was</em> passiert, sondern <strong>wer wem wann eine Nachricht schickt</strong>. Es zeigt das Zusammenspiel mehrerer Objekte über die Zeit.</p>'+
        '<p><strong>Die Bausteine:</strong></p>'+
        '<ul><li><strong>Kopf</strong> &#8211; oben je ein Kasten je beteiligtem Objekt oder Akteur.</li>'+
        '<li><strong>Lebenslinie</strong> &#8211; die gestrichelte Senkrechte darunter. <strong>Die Zeit läuft von oben nach unten</strong>, nicht von links nach rechts.</li>'+
        '<li><strong>Aktivierungsbalken</strong> &#8211; der schmale Kasten auf der Lebenslinie: In dieser Zeit arbeitet das Objekt gerade.</li>'+
        '<li><strong>Durchgezogener Pfeil mit gefüllter Spitze</strong> &#8211; synchroner Aufruf, der Sender wartet auf die Antwort.</li>'+
        '<li><strong>Gestrichelter Pfeil</strong> &#8211; Rückgabe.</li>'+
        '<li><strong>Offene Pfeilspitze</strong> &#8211; asynchrone Nachricht, der Sender wartet nicht.</li></ul>'+
        '<p><strong>Kombinierte Fragmente</strong> fassen Bereiche in einem Rahmen zusammen und tragen links oben ein Kürzel: <code>alt</code> für Alternativen, <code>opt</code> für Optionales, <code>loop</code> für Wiederholungen, <code>par</code> für Parallelität. Das ist die Antwort auf die Frage, wie man eine Schleife in ein Sequenzdiagramm bekommt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 300" role="img" aria-label="Sequenzdiagramm einer Bestellung zwischen Kunde, Webshop und Lager">'+
        '<rect class="s-accent" x="26" y="12" width="108" height="32" rx="3"/>'+
        '<text class="s-hd" x="80" y="32" text-anchor="middle">:Kunde</text>'+
        '<rect class="s-accent" x="226" y="12" width="108" height="32" rx="3"/>'+
        '<text class="s-hd" x="280" y="32" text-anchor="middle">:Webshop</text>'+
        '<rect class="s-accent" x="422" y="12" width="108" height="32" rx="3"/>'+
        '<text class="s-hd" x="476" y="32" text-anchor="middle">:Lager</text>'+
        '<line class="s-life" x1="80" y1="44" x2="80" y2="272"/>'+
        '<line class="s-life" x1="280" y1="44" x2="280" y2="272"/>'+
        '<line class="s-life" x1="476" y1="44" x2="476" y2="272"/>'+
        '<rect class="s-strong" x="74" y="72" width="12" height="168"/>'+
        '<rect class="s-strong" x="274" y="84" width="12" height="144"/>'+
        '<rect class="s-strong" x="470" y="114" width="12" height="40"/>'+
        '<rect class="s-strong" x="470" y="180" width="12" height="26"/>'+
        '<line class="s-arrow" x1="86" y1="84" x2="270" y2="84" marker-end="url(#sqd)"/>'+
        '<text class="s-mono" x="178" y="78" text-anchor="middle">bestellen(artikel)</text>'+
        '<line class="s-arrow" x1="286" y1="114" x2="466" y2="114" marker-end="url(#sqd)"/>'+
        '<text class="s-mono" x="376" y="108" text-anchor="middle">pruefeBestand()</text>'+
        '<line class="s-arrow2" x1="470" y1="154" x2="290" y2="154" marker-end="url(#sqd2)"/>'+
        '<text class="s-mono" x="380" y="148" text-anchor="middle">verf&#252;gbar</text>'+
        '<line class="s-arrow" x1="286" y1="180" x2="466" y2="180" marker-end="url(#sqd)"/>'+
        '<text class="s-mono" x="376" y="174" text-anchor="middle">reserviere()</text>'+
        '<line class="s-arrow2" x1="274" y1="228" x2="90" y2="228" marker-end="url(#sqd2)"/>'+
        '<text class="s-mono" x="182" y="222" text-anchor="middle">bestaetigung</text>'+
        '<text class="s-lbl" x="20" y="262">Zeit</text>'+
        '<line class="s-arrow2" x1="20" y1="66" x2="20" y2="250" marker-end="url(#sqd2)"/>'+
        '<text class="s-lbl" x="20" y="292">Durchgezogen = Aufruf, gestrichelt = R&#252;ckgabe. Der schmale Kasten zeigt, wer gerade arbeitet.</text>'+
        '<defs><marker id="sqd" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker>'+
        '<marker id="sqd2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Die Zeit läuft nach unten. Der Webshop bleibt aktiv, solange er auf das Lager wartet — deshalb reicht sein Balken über beide Aufrufe.</figcaption></figure>',
      code:
        "DIE DREI PFEILARTEN\n\n"+
        "  ---------->|   durchgezogen, gefuellte Spitze\n"+
        "                 synchroner Aufruf, Sender WARTET\n\n"+
        "  ---------->    durchgezogen, offene Spitze\n"+
        "                 asynchron, Sender wartet NICHT\n"+
        "                 typisch: Ereignis, Nachricht in eine Warteschlange\n\n"+
        "  - - - - - ->   gestrichelt\n"+
        "                 Rueckgabe an den Aufrufer\n\n"+
        "KOMBINIERTE FRAGMENTE - so kommen Logik und Schleifen hinein\n\n"+
        "  +--------------------------------------+\n"+
        "  | alt  [bestand > 0]                   |\n"+
        "  |     Webshop -> Lager: reserviere()   |\n"+
        "  |- - - - - - - - - - - - - - - - - - - |\n"+
        "  |      [sonst]                         |\n"+
        "  |     Webshop -> Kunde: nichtVerfuegbar|\n"+
        "  +--------------------------------------+\n\n"+
        "  alt   Alternativen, durch eine gestrichelte Linie getrennt\n"+
        "  opt   ein Block, der nur unter Bedingung laeuft\n"+
        "  loop  Wiederholung, Bedingung im Kopf des Rahmens\n"+
        "  par   mehrere Bloecke laufen gleichzeitig\n\n"+
        "OBJEKT ODER KLASSE?\n"+
        "  :Kunde       ein beliebiges Objekt der Klasse Kunde\n"+
        "  k1:Kunde     genau dieses Objekt\n"+
        "  Der Doppelpunkt und die Unterstreichung zeigen an,\n"+
        "  dass ein OBJEKT gemeint ist, nicht die Klasse.",
      codeLang:'Sequenzdiagramm',
      tip:'Der häufigste Fehler in Prüfungslösungen ist die Leserichtung: Das Sequenzdiagramm wird von oben nach unten gelesen, nicht von links nach rechts. Wenn eine Aufgabe fragt „Was passiert als drittes?", zählst du die Pfeile von oben ab. Und achte auf den Aktivierungsbalken des Aufrufers — er endet erst, wenn die Rückgabe da ist. Genau daran erkennt man einen synchronen Aufruf.',
      quiz:[
        {q:'In welche Richtung läuft die Zeit im Sequenzdiagramm?', options:['Von links nach rechts','Von oben nach unten','Im Uhrzeigersinn'], correct:1, explain:'Die senkrechten Lebenslinien sind die Zeitachse je Objekt.'},
        {q:'Was bedeutet ein gestrichelter Pfeil?', options:['Einen asynchronen Aufruf','Eine Rückgabe an den Aufrufer','Einen Fehlerfall'], correct:1, explain:'Der durchgezogene Pfeil mit gefüllter Spitze ist der synchrone Aufruf.'},
        {q:'Wie stellt man eine Wiederholung im Sequenzdiagramm dar?', options:['Mit einem Pfeil zurück nach oben','Mit einem kombinierten Fragment vom Typ loop','Gar nicht'], correct:1, explain:'Daneben gibt es alt für Alternativen, opt für Optionales und par für Parallelität.'}
      ]
    },
    {
      id:'m39-l3', title:'Das Zustandsdiagramm', minutes:9,
      body:
        '<p>Das <strong>Zustandsdiagramm</strong> beschreibt den <strong>Lebenslauf eines einzelnen Objekts</strong>: Welche Zustände kann es annehmen, und welches Ereignis führt von einem Zustand in den nächsten. Typische Kandidaten in der AP1 sind ein Ticket, eine Bestellung, ein Vertrag oder ein Gerät.</p>'+
        '<p><strong>Die Notation einer Transition</strong> &#8211; genau diese Schreibweise wird abgefragt:</p>'+
        '<p><code>ereignis [bedingung] / aktion</code></p>'+
        '<ul><li>Das <strong>Ereignis</strong> löst den Übergang aus, etwa <code>zuweisen()</code>.</li>'+
        '<li>Die <strong>Bedingung</strong> in eckigen Klammern (Guard) muss zusätzlich erfüllt sein, sonst findet der Übergang nicht statt.</li>'+
        '<li>Die <strong>Aktion</strong> nach dem Schrägstrich wird beim Übergang ausgeführt.</li></ul>'+
        '<p>Bedingung und Aktion sind optional, das Ereignis in aller Regel nicht. Ein Übergang <em>ohne</em> Ereignis läuft automatisch ab, sobald die Arbeit im Zustand erledigt ist.</p>'+
        '<p>Innerhalb eines Zustands sind drei Einträge möglich: <code>entry /</code> läuft beim Betreten, <code>exit /</code> beim Verlassen, <code>do /</code> laufend, solange der Zustand aktiv ist.</p>'+
        '<p><strong>Die Abgrenzung, die Punkte bringt:</strong> Das Aktivitätsdiagramm zeigt einen <em>Ablauf über mehrere Beteiligte</em>, das Zustandsdiagramm die <em>Zustände eines Dings</em>. Wenn in der Aufgabe Wörter wie „offen", „in Bearbeitung", „gesperrt" oder „storniert" vorkommen, ist ein Zustandsdiagramm gemeint.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 268" role="img" aria-label="Zustandsdiagramm eines Tickets von offen bis geschlossen">'+
        '<circle class="s-dot" cx="26" cy="66" r="9"/>'+
        '<line class="s-arrow" x1="35" y1="66" x2="54" y2="66" marker-end="url(#ztd)"/>'+
        '<rect class="s-accent" x="58" y="48" width="98" height="38" rx="12"/>'+
        '<text class="s-hd" x="107" y="72" text-anchor="middle">offen</text>'+
        '<line class="s-arrow" x1="156" y1="66" x2="214" y2="66" marker-end="url(#ztd)"/>'+
        '<text class="s-mono" x="185" y="58" text-anchor="middle">zuweisen()</text>'+
        '<rect class="s-strong" x="218" y="48" width="140" height="38" rx="12"/>'+
        '<text class="s-hd" x="288" y="72" text-anchor="middle">in Bearbeitung</text>'+
        '<line class="s-arrow" x1="358" y1="66" x2="418" y2="66" marker-end="url(#ztd)"/>'+
        '<text class="s-mono" x="388" y="42" text-anchor="middle">loesen()</text>'+
        '<text class="s-mono" x="388" y="58" text-anchor="middle">[geprueft]</text>'+
        '<rect class="s-ok" x="422" y="48" width="112" height="38" rx="12"/>'+
        '<text class="s-hd" x="478" y="72" text-anchor="middle">geschlossen</text>'+
        '<path class="s-arrow" d="M268 86 L268 156" marker-end="url(#ztd)"/>'+
        '<text class="s-mono" x="200" y="112">r&#252;ckfrage()</text>'+
        '<rect class="s-warn" x="198" y="160" width="160" height="38" rx="12"/>'+
        '<text class="s-hd" x="278" y="184" text-anchor="middle">wartet auf Kunde</text>'+
        '<path class="s-arrow" d="M330 160 L330 90" marker-end="url(#ztd)"/>'+
        '<text class="s-mono" x="340" y="128">antwort()</text>'+
        '<path class="s-arrow" d="M478 86 L478 132" marker-end="url(#ztd)"/>'+
        '<circle class="s-box" cx="478" cy="146" r="11"/><circle class="s-dot" cx="478" cy="146" r="6"/>'+
        '<rect class="s-box" x="20" y="212" width="516" height="44" rx="4"/>'+
        '<text class="s-mono" x="32" y="232">Transition:  ereignis [bedingung] / aktion</text>'+
        '<text class="s-lbl" x="32" y="249">Im Zustand:  entry / beim Betreten &#160;&#183;&#160; do / laufend &#160;&#183;&#160; exit / beim Verlassen</text>'+
        '<defs><marker id="ztd" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Ein Ticket durchläuft vier Zustände. Der Übergang nach „geschlossen" trägt zusätzlich eine Bedingung — ohne Prüfung wird nicht geschlossen.</figcaption></figure>',
      code:
        "WELCHES DIAGRAMM VERLANGT DIE AUFGABE?\n\n"+
        "  Signalwoerter im Text            gesuchtes Diagramm\n"+
        "  -------------------------------  ---------------------\n"+
        "  zuerst, dann, danach, parallel   Aktivitaetsdiagramm\n"+
        "  ruft auf, sendet, antwortet      Sequenzdiagramm\n"+
        "  offen, gesperrt, storniert,\n"+
        "  solange, wechselt in den ...     Zustandsdiagramm\n"+
        "  darf, kann, Benutzer moechte     Use-Case-Diagramm\n"+
        "  besteht aus, hat ein, ist ein    Klassendiagramm\n\n"+
        "EIN ZUSTAND MIT INNEREN AKTIONEN\n\n"+
        "   +----------------------------------+\n"+
        "   |        in Bearbeitung            |\n"+
        "   +----------------------------------+\n"+
        "   | entry / bearbeiterSetzen()       |\n"+
        "   | do    / zeitErfassen()           |\n"+
        "   | exit  / protokollSchreiben()     |\n"+
        "   +----------------------------------+\n\n"+
        "HAEUFIGE FEHLER\n"+
        "  1. Zustaende als Taetigkeit benennen.\n"+
        "     falsch:  \"Ticket bearbeiten\"   (das ist eine Aktion)\n"+
        "     richtig: \"in Bearbeitung\"      (das ist ein Zustand)\n\n"+
        "  2. Uebergaenge ohne Ereignis beschriften.\n"+
        "     Ohne Ausloeser bleibt offen, warum der Wechsel geschieht.\n\n"+
        "  3. Den Endzustand vergessen.\n"+
        "     Ein Objekt, das nie endet, ist selten richtig modelliert.",
      codeLang:'Zustandsdiagramm',
      tip:'Die Kontrollfrage, mit der du Zustände von Aktionen trennst: Kann man sagen „das Ticket <em>ist</em> …"? „Das Ticket ist in Bearbeitung" geht — das ist ein Zustand. „Das Ticket ist Ticket bearbeiten" geht nicht — das ist eine Aktion und gehört ins Aktivitätsdiagramm. Diese eine Frage verhindert den häufigsten Fehler dieser Aufgabenform.',
      quiz:[
        {q:'Wie lautet die vollständige Beschriftung einer Transition?', options:['aktion [ereignis] / bedingung','ereignis [bedingung] / aktion','bedingung / ereignis'], correct:1, explain:'Bedingung und Aktion sind optional, das Ereignis in aller Regel nicht.'},
        {q:'Was läuft bei einem Zustand mit dem Eintrag „do /"?', options:['Etwas beim Betreten','Etwas laufend, solange der Zustand aktiv ist','Etwas beim Verlassen'], correct:1, explain:'entry läuft beim Betreten, exit beim Verlassen.'},
        {q:'Welche Benennung passt zu einem Zustand?', options:['„Ticket bearbeiten"','„in Bearbeitung"','„bearbeite()"'], correct:1, explain:'Die Kontrollfrage lautet: Kann man sagen, das Objekt ist gerade …?'}
      ]
    }
  ]
});
MODULES.push({
  id:'m10', part:3, partTitle:'Objektorientierung & Softwareentwicklung', title:'Vorgehensmodelle & Anforderungen', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m10-l1', title:'Lastenheft und Pflichtenheft', minutes:8,
      body:
        '<p>Das mit Abstand häufigste Begriffspaar der AP1 – es kommt in fast jeder Prüfung vor.</p>'+
        '<p><strong>Die Merkformel:</strong> Der Auftraggeber schreibt das <strong>Lastenheft</strong>: „Das sind meine Lasten, die ich dir aufbürde." Der Auftragnehmer antwortet mit dem <strong>Pflichtenheft</strong>: „Das sind die Pflichten, die ich übernehme."</p>'+
        '<p><strong>Lastenheft = WAS und WOFÜR</strong> – lösungsneutral, aus fachlicher Sicht des Kunden, Grundlage der Ausschreibung.<br>'+
        '<strong>Pflichtenheft = WIE und WOMIT</strong> – die konkrete Umsetzungsbeschreibung des Anbieters. Es wird abgenommen und wird damit <strong>Vertragsbestandteil</strong>.</p>'+
        '<p>Typische Lastenheft-Inhalte (nach DIN 69901 / VDI 3694): Ausgangssituation · Ist-Zustand · Zielsetzung · funktionale Anforderungen · nicht-funktionale Anforderungen · Schnittstellen · Rahmenbedingungen · Zeitziele · Budget · Qualitätsziele · Abnahmekriterien.</p>',
      code:
        "Die Reihenfolge im Projekt:\n"+
        "  1. Ist-Analyse beim Auftraggeber\n"+
        "  2. LASTENHEFT   (Auftraggeber) -> Grundlage der Ausschreibung\n"+
        "  3. Angebote der Anbieter\n"+
        "  4. PFLICHTENHEFT (Auftragnehmer) -> wird abgenommen, wird Vertragsbestandteil\n"+
        "  5. Realisierung\n"+
        "  6. Abnahme anhand der Abnahmekriterien aus dem Pflichtenheft",
      codeLang:'Projektablauf',
      tip:'Warum das rechtlich zählt und in Begründungsaufgaben Punkte bringt: Das abgenommene Pflichtenheft definiert den geschuldeten Leistungsumfang eines Werkvertrags. Alles, was dort nicht steht, ist nicht geschuldet – daher stammen die meisten Projektstreitigkeiten. Deshalb gehören messbare Abnahmekriterien hinein, nicht Formulierungen wie „soll schnell sein".',
      quiz:[
        {q:'Wer schreibt das Pflichtenheft?', options:['Der Auftraggeber','Der Auftragnehmer','Beide gemeinsam'], correct:1, explain:'Der Auftraggeber schreibt das Lastenheft, der Auftragnehmer antwortet mit dem Pflichtenheft.'},
        {q:'Was beschreibt das Lastenheft?', options:['WIE und WOMIT','WAS und WOFÜR','Nur den Preis'], correct:1, explain:'Lösungsneutral, aus fachlicher Sicht des Kunden.'},
        {q:'Wer nimmt das Pflichtenheft ab?', options:['Der Auftragnehmer','Der Auftraggeber','Die IHK'], correct:1, explain:'Mit der Abnahme wird es Vertragsbestandteil und definiert den geschuldeten Leistungsumfang.'}
      ]
    },
    {
      id:'m10-l2', title:'Funktionale und nicht-funktionale Anforderungen', minutes:7,
      body:
        '<p>Die Unterscheidung wird als Zuordnungsfrage geprüft:</p>'+
        '<ul><li><strong>Funktionale Anforderung</strong> – <em>Was</em> soll das System können? „Das System muss Aufträge einem Mitarbeiter zuordnen."</li>'+
        '<li><strong>Nicht-funktionale Anforderung</strong> – <em>Wie gut?</em> Performance, Verfügbarkeit, Sicherheit, Usability, Wartbarkeit, Skalierbarkeit. „Die Suche muss in unter zwei Sekunden antworten."</li></ul>'+
        '<p><strong>Priorisierung nach MuSCoW:</strong> <strong>Mu</strong>st have (zwingend), <strong>S</strong>hould have (wichtig), <strong>Co</strong>uld have (wünschenswert), <strong>W</strong>on’t have (diesmal nicht).</p>'+
        '<p>Methoden der <strong>Anforderungserhebung</strong>, ebenfalls eine Standardliste: Interview · Fragebogen · Workshop / Fokusgruppe · Beobachtung (Job Shadowing) · Dokumentenanalyse · Beschwerdeanalyse · Marktanalyse · Prototyping.</p>',
      code:'',
      tip:'Ein Merkmal, das nicht-funktionale Anforderungen von schlechten funktionalen unterscheidet: Sie müssen messbar formuliert sein. „Das System soll benutzerfreundlich sein" ist wertlos, weil niemand prüfen kann, ob es erfüllt ist. „Ein geschulter Sachbearbeiter erfasst einen Auftrag in unter 90 Sekunden" ist prüfbar – und genau solche Formulierungen gehören in die Abnahmekriterien.',
      quiz:[
        {q:'„Die Antwortzeit muss unter 2 Sekunden liegen" ist eine …', options:['funktionale Anforderung','nicht-funktionale Anforderung','Rahmenbedingung'], correct:1, explain:'Sie beschreibt nicht was, sondern wie gut.'},
        {q:'Wofür steht das W in MuSCoW?', options:['Would have','Won’t have – diesmal bewusst nicht','Weak requirement'], correct:1, explain:'Die bewusste Abgrenzung ist Teil der Priorisierung.'},
        {q:'Wofür steht das C in MuSCoW?', options:['Critical','Could have — wünschenswert','Complex'], correct:1, explain:'Must, Should, Could und Won’t bilden die vier Prioritätsstufen.'}
      ]
    },
    {
      id:'m10-l3', title:'Vorgehensmodelle: Wasserfall, V-Modell, agil', minutes:9,
      body:
        '<p><strong>Wasserfallmodell</strong> – streng sequenziell: Analyse → Entwurf → Implementierung → Test → Betrieb. Jede Phase endet mit einem Dokument. Vorteil: klar planbar, gut dokumentiert. Nachteil: kaum Rücksprung möglich, Fehler in der Analyse fallen erst am Ende auf.</p>'+
        '<p><strong>V-Modell</strong> – erweitert den Wasserfall um die Teststufen. Jeder Entwurfsphase auf dem absteigenden Ast entspricht eine Teststufe auf dem aufsteigenden: Anforderungen ↔ Abnahmetest, Grobentwurf ↔ Systemtest, Feinentwurf ↔ Integrationstest, Implementierung ↔ Unit-Test.</p>'+
        '<p><strong>Agile Modelle (Scrum)</strong> – iterativ in kurzen Sprints (2–4 Wochen), am Ende jedes Sprints ein lauffähiges Inkrement. Rollen: <strong>Product Owner</strong> (verantwortet das Was und die Priorisierung), <strong>Scrum Master</strong> (verantwortet den Prozess, beseitigt Hindernisse), <strong>Entwicklungsteam</strong> (verantwortet das Wie). Artefakte: Product Backlog, Sprint Backlog, Inkrement.</p>'+
        '<p><strong>Kanban</strong> – kontinuierlicher Fluss statt fester Sprints, Visualisierung auf einem Board, <strong>WIP-Limits</strong> begrenzen die gleichzeitig laufenden Aufgaben und machen Engpässe sichtbar.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="V-Modell mit Entwurfsphasen links und korrespondierenden Teststufen rechts"><rect class="s-box" x="20" y="14" width="150" height="30" rx="4"/><text class="s-lbl" x="95" y="34" text-anchor="middle">Anforderungen</text><rect class="s-box" x="58" y="66" width="150" height="30" rx="4"/><text class="s-lbl" x="133" y="86" text-anchor="middle">Grobentwurf</text><rect class="s-box" x="96" y="118" width="150" height="30" rx="4"/><text class="s-lbl" x="171" y="138" text-anchor="middle">Feinentwurf</text><rect class="s-strong" x="200" y="190" width="160" height="34" rx="4"/><text class="s-lbl" x="280" y="212" text-anchor="middle">Implementierung</text><rect class="s-accent" x="390" y="14" width="150" height="30" rx="4"/><text class="s-lbl" x="465" y="34" text-anchor="middle">Abnahmetest</text><rect class="s-accent" x="352" y="66" width="150" height="30" rx="4"/><text class="s-lbl" x="427" y="86" text-anchor="middle">Systemtest</text><rect class="s-accent" x="314" y="118" width="150" height="30" rx="4"/><text class="s-lbl" x="389" y="138" text-anchor="middle">Integrationstest</text><rect class="s-accent" x="276" y="156" width="150" height="28" rx="4"/><text class="s-lbl" x="351" y="175" text-anchor="middle">Unit-Test</text><path class="s-dash2" d="M170 29 L390 29"/><path class="s-dash2" d="M208 81 L352 81"/><path class="s-dash2" d="M246 133 L314 133"/><text class="s-lbl" x="280" y="24" text-anchor="middle">verifiziert gegen</text></svg><figcaption>Jeder Entwurfsebene auf dem absteigenden Ast entspricht genau eine Teststufe auf dem aufsteigenden. Die gestrichelten Linien zeigen, wogegen getestet wird.</figcaption></figure>',
      code:
        "Scrum-Zyklus:\n"+
        "  Product Backlog -> Sprint Planning -> Sprint Backlog\n"+
        "        -> Sprint (2-4 Wochen, taeglich Daily Standup)\n"+
        "        -> Inkrement -> Sprint Review (Ergebnis) \n"+
        "        -> Sprint Retrospective (Zusammenarbeit) -> naechster Sprint",
      codeLang:'Scrum',
      tip:'Die Abgrenzung von Review und Retrospektive wird gern verwechselt und ist leicht zu merken: Im Review geht es um das Produkt – was wurde fertig, akzeptiert der Product Owner das Ergebnis? In der Retrospektive geht es um das Team – wie lief die Zusammenarbeit, was ändern wir im nächsten Sprint? Produkt gegen Prozess, das ist der ganze Unterschied.',
      quiz:[
        {q:'Wer priorisiert im Scrum das Product Backlog?', options:['Der Scrum Master','Der Product Owner','Das Entwicklungsteam'], correct:1, explain:'Der Product Owner verantwortet das Was, das Team das Wie.'},
        {q:'Welcher Teststufe entspricht im V-Modell die Anforderungsdefinition?', options:['Unit-Test','Abnahmetest','Integrationstest'], correct:1, explain:'Die oberste Entwurfsebene korrespondiert mit der obersten Teststufe.'},
        {q:'Wie lang ist ein Sprint in Scrum typischerweise?', options:['Ein Tag','Zwei bis vier Wochen','Ein halbes Jahr'], correct:1, explain:'Am Ende steht immer ein potenziell auslieferbares Inkrement.'}
      ]
    },
    {
      id:'m10-l4', title:'Projektmerkmale und SMART-Ziele', minutes:8,
      body:
        '<p>Ein <strong>Projekt</strong> ist nach DIN 69901 ein Vorhaben, das im Wesentlichen durch die <strong>Einmaligkeit der Bedingungen</strong> gekennzeichnet ist. Die sechs Merkmale – Merkhilfe <strong>Z-Z-R-O-E-K</strong>:</p>'+
        '<p><strong>Z</strong>ielvorgabe · <strong>Z</strong>eitliche Begrenzung · <strong>R</strong>essourcenbegrenzung · <strong>O</strong>rganisationsform · <strong>E</strong>inmaligkeit · <strong>K</strong>omplexität und Risiko</p>'+
        '<p>Die Abgrenzung, die gern geprüft wird: Die tägliche Bearbeitung von Support-Tickets ist <em>kein</em> Projekt (Routine). Die einmalige Einführung eines Ticketsystems ist eines.</p>'+
        '<p><strong>SMART-Ziele:</strong> <strong>S</strong>pezifisch · <strong>M</strong>essbar · <strong>A</strong>kzeptiert (auch: attainable/erreichbar) · <strong>R</strong>ealistisch · <strong>T</strong>erminiert. Die IHK akzeptiert die verschiedenen Auflösungen von A und R.</p>'+
        '<p><strong>Magisches Dreieck:</strong> Zeit – Kosten – Qualität (bzw. Leistungsumfang). Wer an einer Ecke zieht, verändert zwangsläufig die anderen.</p>',
      code:
        "Schlecht: \"Wir modernisieren die Praxis-IT.\"\n\n"+
        "SMART:    \"Bis zum 30.11. sind alle 12 Arbeitsplaetze auf Windows 11\n"+
        "           migriert und alle Mitarbeiter geschult.\"\n"+
        "           ^spezifisch ^terminiert ^messbar(12) ^realistisch",
      codeLang:'SMART',
      tip:'Bei „Nennen Sie drei Stakeholder mit deren Einfluss" reicht die Nennung nicht – gefragt ist immer das Format Gruppe plus Wirkung. Also nicht „Mitarbeiter", sondern „Mitarbeiter: Ihre Akzeptanz entscheidet, ob das System nach der Einführung tatsächlich genutzt wird". Projekte scheitern selten an der Technik, sondern an Menschen, die nicht mitziehen – genau darauf zielt die Frage.',
      quiz:[
        {q:'Welches Merkmal macht ein Vorhaben zum Projekt?', options:['Es kostet viel Geld','Die Einmaligkeit der Bedingungen','Es dauert länger als ein Jahr'], correct:1, explain:'Wiederkehrende Routine ist kein Projekt.'},
        {q:'Was besagt das magische Dreieck?', options:['Zeit, Kosten und Qualität beeinflussen sich gegenseitig','Drei Personen leiten ein Projekt','Es gibt drei Projektphasen'], correct:0, explain:'Wer an einer Ecke zieht, verändert die anderen.'},
        {q:'Die tägliche Bearbeitung von Support-Tickets — ist das ein Projekt?', options:['Ja, es hat ein Ziel','Nein, es fehlt die Einmaligkeit','Ja, wenn es lange dauert'], correct:1, explain:'Wiederkehrende Routine ist Linienarbeit, kein Projekt.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m31', part:4, partTitle:'Netzwerktechnik', relevanz:'sehr hoch', title:'Netzwerkgrundlagen',
  lessons:[
    {
      id:'m31-l1', title:'Netzarten, Reichweiten und Betriebsmodelle', minutes:9,
      body:
        '<p>Bevor es um Protokolle und Adressen geht, musst du die <strong>Landkarte</strong> kennen. Netze werden nach ihrer <strong>räumlichen Ausdehnung</strong> eingeteilt:</p>'+
        '<table class="lesson-table"><tr><th>Kürzel</th><th>Name</th><th>Reichweite</th><th>Beispiel</th></tr>'+
        '<tr><td><strong>PAN</strong></td><td>Personal Area Network</td><td>wenige Meter</td><td>Bluetooth-Kopfhörer, Smartwatch</td></tr>'+
        '<tr><td><strong>LAN</strong></td><td>Local Area Network</td><td>Gebäude, Gelände</td><td>Firmennetz, Heimnetz</td></tr>'+
        '<tr><td><strong>WLAN</strong></td><td>Wireless LAN</td><td>wie LAN, kabellos</td><td>WLAN im Büro</td></tr>'+
        '<tr><td><strong>MAN</strong></td><td>Metropolitan Area Network</td><td>Stadtgebiet</td><td>Standortverbund einer Stadtverwaltung</td></tr>'+
        '<tr><td><strong>WAN</strong></td><td>Wide Area Network</td><td>Länder, weltweit</td><td>das Internet, Standortkopplung</td></tr>'+
        '<tr><td><strong>VPN</strong></td><td>Virtual Private Network</td><td>logisch, nicht räumlich</td><td>Homeoffice-Zugang</td></tr></table>'+
        '<p><strong>Zwei Betriebsmodelle</strong> — auch das eine sichere Prüfungsfrage:</p>'+
        '<ul><li><strong>Peer-to-Peer</strong> — alle Rechner sind gleichberechtigt, jeder kann Dienste anbieten und nutzen. Günstig und ohne Server, aber: Benutzerkonten müssen auf jedem Rechner einzeln gepflegt werden, keine zentrale Sicherung, keine einheitlichen Rechte. Sinnvoll bis etwa zehn Arbeitsplätze.</li>'+
        '<li><strong>Client-Server</strong> — ein Server stellt Dienste zentral bereit. Zentrale Benutzerverwaltung, zentrale Sicherung, einheitliche Rechte, bessere Skalierbarkeit. Preis: Serverhardware, Lizenzen und Administrationsaufwand; der Server ist ein Single Point of Failure.</li></ul>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Peer-to-Peer und Client-Server im Vergleich">'+
        '<text class="s-hd" x="20" y="22">Peer-to-Peer</text>'+
        '<circle class="s-neuron" cx="60" cy="70" r="18"/><circle class="s-neuron" cx="160" cy="60" r="18"/>'+
        '<circle class="s-neuron" cx="70" cy="140" r="18"/><circle class="s-neuron" cx="170" cy="135" r="18"/>'+
        '<g class="s-line"><line x1="78" y1="70" x2="142" y2="62"/><line x1="62" y1="88" x2="68" y2="122"/>'+
        '<line x1="88" y1="138" x2="152" y2="135"/><line x1="160" y1="78" x2="172" y2="117"/>'+
        '<line x1="76" y1="84" x2="156" y2="122"/><line x1="152" y1="72" x2="86" y2="128"/></g>'+
        '<text class="s-lbl" x="20" y="182">jeder mit jedem &#183; Konten lokal je Rechner</text>'+
        '<text class="s-hd" x="320" y="22">Client-Server</text>'+
        '<rect class="s-strong" x="380" y="82" width="90" height="36" rx="6"/>'+
        '<text class="s-lbl" x="425" y="105" text-anchor="middle">Server</text>'+
        '<circle class="s-neuron2" cx="330" cy="46" r="16"/><circle class="s-neuron2" cx="330" cy="150" r="16"/>'+
        '<circle class="s-neuron2" cx="520" cy="46" r="16"/><circle class="s-neuron2" cx="520" cy="150" r="16"/>'+
        '<g class="s-line"><line x1="344" y1="54" x2="382" y2="86"/><line x1="344" y1="142" x2="382" y2="114"/>'+
        '<line x1="506" y1="54" x2="468" y2="86"/><line x1="506" y1="142" x2="468" y2="114"/></g>'+
        '<text class="s-lbl" x="320" y="182">alles &#252;ber die Mitte &#183; Konten zentral</text>'+
        '</svg><figcaption>Peer-to-Peer wächst schlecht: Bei zehn Rechnern sind schon 45 Beziehungen zu pflegen. Der Server bündelt das auf zehn.</figcaption></figure>',
      code:
        "WANN WELCHES MODELL? - typische Pruefungsbegruendung\n\n"+
        "  4 Arbeitsplaetze, eine gemeinsame Ablage, kein IT-Personal\n"+
        "     -> Peer-to-Peer. Ein Server waere unwirtschaftlich.\n\n"+
        "  25 Arbeitsplaetze, Schichtbetrieb, Datenschutzauflagen\n"+
        "     -> Client-Server. Zentrale Benutzerverwaltung und\n"+
        "        Berechtigungen sind ohne Server nicht beherrschbar.\n\n"+
        "  Warum Peer-to-Peer nicht skaliert:\n"+
        "     Bei n Rechnern sind n x (n-1) / 2 Beziehungen zu pflegen.\n"+
        "        5 Rechner  -> 10 Beziehungen\n"+
        "       10 Rechner  -> 45 Beziehungen\n"+
        "       20 Rechner  -> 190 Beziehungen\n"+
        "     Dieselbe Formel wie beim symmetrischen Schluesselaustausch.",
      codeLang:'Modellwahl',
      tip:'Wenn eine Aufgabe nach der Wahl des Betriebsmodells fragt, nenne nicht nur das Modell, sondern die Zahl der Arbeitsplätze als Begründung — und einen konkreten Verwaltungsvorteil. „Client-Server, weil bei 25 Mitarbeitern Benutzerkonten und Berechtigungen zentral gepflegt werden müssen und eine Sicherung über 25 Einzelrechner nicht zuverlässig möglich ist" ist eine vollständige Antwort. Der bloße Hinweis „mehr Rechner" ist keine.',
      quiz:[
        {q:'Wie viele Beziehungen sind in einem Peer-to-Peer-Netz mit 8 Rechnern zu pflegen?', options:['8','28','64'], correct:1, explain:'n · (n−1) / 2 = 8 · 7 / 2 = 28 — deshalb skaliert das Modell schlecht.'},
        {q:'Welche Netzart bezeichnet eine Bluetooth-Verbindung zum Kopfhörer?', options:['LAN','PAN','MAN'], correct:1, explain:'Personal Area Network — Reichweite wenige Meter.'},
        {q:'Was ist der größte Nachteil des Client-Server-Modells?', options:['Die Benutzerverwaltung ist aufwendiger','Der Server ist ein Single Point of Failure','Es sind keine gemeinsamen Dateien möglich'], correct:1, explain:'Fällt der Server aus, steht das gesamte Netz — Gegenmittel sind Redundanz und Cluster.'}
      ]
    },
    {
      id:'m31-l2', title:'MAC und IP – warum zwei Adressen nötig sind', minutes:9,
      body:
        '<p>Die häufigste Verständnisfrage der Netzwerkgrundlagen lautet: <strong>Warum reicht eine Adresse nicht?</strong> Die Antwort erklärt das halbe OSI-Modell.</p>'+
        '<table class="lesson-table"><tr><th></th><th>MAC-Adresse</th><th>IP-Adresse</th></tr>'+
        '<tr><td>Schicht</td><td>2 – Sicherung</td><td>3 – Vermittlung</td></tr>'+
        '<tr><td>Länge</td><td>48 Bit, 6 Byte hexadezimal</td><td>32 Bit (IPv4) bzw. 128 Bit (IPv6)</td></tr>'+
        '<tr><td>Schreibweise</td><td>a4:1f:72:9c:03:5e</td><td>192.168.1.10</td></tr>'+
        '<tr><td>Vergabe</td><td>vom Hersteller, weltweit einmalig</td><td>vom Netzbetreiber, ortsabhängig</td></tr>'+
        '<tr><td>Änderbar</td><td>fest in der Hardware (per Software fälschbar)</td><td>jederzeit konfigurierbar</td></tr>'+
        '<tr><td>Gültigkeit</td><td>nur im lokalen Netzsegment</td><td>netzübergreifend routbar</td></tr></table>'+
        '<p><strong>Das Bild, das alles erklärt:</strong> Die IP-Adresse ist die <em>Postanschrift</em> — sie sagt, in welchem Ort und welcher Straße das Ziel liegt, und ermöglicht dem Router die Wegewahl. Die MAC-Adresse ist die <em>Personalausweisnummer</em> — weltweit einmalig, aber völlig nutzlos, um jemanden zu finden. Beim Versand innerhalb eines Hauses reicht sie, für den Weg dorthin braucht es die Anschrift.</p>'+
        '<p>Die ersten drei Byte einer MAC-Adresse bilden die <strong>OUI</strong>, die Herstellerkennung. Daran erkennt man in einer Diagnose, von welchem Hersteller ein unbekanntes Gerät im Netz stammt.</p>',
      code:
        "WAS PASSIERT BEIM VERSAND? - Schritt fuer Schritt\n\n"+
        "  PC (192.168.1.10) will Daten an 93.184.216.34 senden.\n\n"+
        "  1. Der PC vergleicht Ziel-IP und eigene Maske:\n"+
        "     Liegt das Ziel im eigenen Netz?  -> NEIN\n\n"+
        "  2. Also geht es ueber das Standardgateway (192.168.1.1).\n"+
        "     Der PC loest per ARP die MAC des GATEWAYS auf,\n"+
        "     NICHT die des Zielservers.\n\n"+
        "  3. Das Paket traegt:\n"+
        "     Ziel-IP  = 93.184.216.34      (bleibt bis zum Ende gleich)\n"+
        "     Ziel-MAC = MAC des Routers    (aendert sich bei JEDEM Hop)\n\n"+
        "  4. Jeder Router tauscht die MAC-Adressen aus und laesst die\n"+
        "     IP-Adressen unveraendert.\n\n"+
        "  MERKSATZ\n"+
        "     IP-Adressen bleiben - MAC-Adressen wechseln bei jedem Hop.",
      codeLang:'Adressierung',
      tip:'Der Merksatz am Ende ist die vollständige Antwort auf die Frage, warum zwei Adressen nötig sind. Die IP beschreibt das Ziel der gesamten Reise, die MAC nur den nächsten Schritt. Ohne IP wüsste kein Router, wohin; ohne MAC käme das Paket im letzten Segment bei keinem Gerät an. Wenn du diesen Satz in der Prüfung hinschreibst und ein Beispiel ergänzt, hast du die Aufgabe erledigt.',
      quiz:[
        {q:'Wie lang ist eine MAC-Adresse?', options:['32 Bit','48 Bit','128 Bit'], correct:1, explain:'6 Byte hexadezimal — die ersten drei Byte sind die Herstellerkennung OUI.'},
        {q:'Welche Adresse ändert sich beim Weg durch mehrere Router?', options:['Die Ziel-IP-Adresse','Die Ziel-MAC-Adresse','Beide'], correct:1, explain:'Die IP bleibt bis zum Ziel gleich, die MAC wird bei jedem Hop ausgetauscht.'},
        {q:'Ein PC sendet an einen Server im Internet. Wessen MAC löst er per ARP auf?', options:['Die des Zielservers','Die des Standardgateways','Gar keine'], correct:1, explain:'Für Ziele außerhalb des eigenen Netzes ist immer das Gateway der nächste Empfänger.'}
      ]
    },
    {
      id:'m31-l3', title:'Kapselung – wie aus Daten ein Frame wird', minutes:9,
      body:
        '<p>Beim Senden durchläuft eine Nachricht die OSI-Schichten <strong>von oben nach unten</strong> und bekommt auf jeder Ebene einen zusätzlichen <strong>Header</strong> vorangestellt. Das nennt man <strong>Kapselung</strong> (Encapsulation). Beim Empfänger läuft es umgekehrt: Jede Schicht entfernt ihren eigenen Header und reicht den Rest nach oben — die <strong>Entkapselung</strong>.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 210" role="img" aria-label="Kapselung der Daten durch die Schichten">'+
        '<text class="s-lbl" x="20" y="28">Schicht 7 &#183; Daten</text>'+
        '<rect class="s-strong" x="200" y="12" width="170" height="26" rx="4"/>'+
        '<text class="s-lbl" x="285" y="30" text-anchor="middle">Nutzdaten</text>'+
        '<text class="s-lbl" x="20" y="70">Schicht 4 &#183; Segment</text>'+
        '<rect class="s-l4" x="150" y="54" width="50" height="26" rx="4"/><text class="s-mono" x="175" y="72" text-anchor="middle">TCP</text>'+
        '<rect class="s-strong" x="200" y="54" width="170" height="26" rx="4"/><text class="s-lbl" x="285" y="72" text-anchor="middle">Nutzdaten</text>'+
        '<text class="s-lbl" x="20" y="112">Schicht 3 &#183; Paket</text>'+
        '<rect class="s-l3" x="100" y="96" width="50" height="26" rx="4"/><text class="s-mono" x="125" y="114" text-anchor="middle">IP</text>'+
        '<rect class="s-l4" x="150" y="96" width="50" height="26" rx="4"/><text class="s-mono" x="175" y="114" text-anchor="middle">TCP</text>'+
        '<rect class="s-strong" x="200" y="96" width="170" height="26" rx="4"/><text class="s-lbl" x="285" y="114" text-anchor="middle">Nutzdaten</text>'+
        '<text class="s-lbl" x="20" y="154">Schicht 2 &#183; Frame</text>'+
        '<rect class="s-l2" x="50" y="138" width="50" height="26" rx="4"/><text class="s-mono" x="75" y="156" text-anchor="middle">MAC</text>'+
        '<rect class="s-l3" x="100" y="138" width="50" height="26" rx="4"/><text class="s-mono" x="125" y="156" text-anchor="middle">IP</text>'+
        '<rect class="s-l4" x="150" y="138" width="50" height="26" rx="4"/><text class="s-mono" x="175" y="156" text-anchor="middle">TCP</text>'+
        '<rect class="s-strong" x="200" y="138" width="170" height="26" rx="4"/><text class="s-lbl" x="285" y="156" text-anchor="middle">Nutzdaten</text>'+
        '<rect class="s-l2" x="370" y="138" width="46" height="26" rx="4"/><text class="s-mono" x="393" y="156" text-anchor="middle">FCS</text>'+
        '<text class="s-lbl" x="20" y="196">Jede Schicht legt ihren Header davor. Nur Schicht 2 h&#228;ngt zus&#228;tzlich eine Pr&#252;fsumme (FCS) hinten an.</text>'+
        '</svg><figcaption>Die Nutzdaten bleiben unverändert — es wächst nur der Rahmen um sie herum. Der Empfänger packt in umgekehrter Reihenfolge wieder aus.</figcaption></figure>'+
        '<p>Die Einheit auf jeder Schicht hat einen eigenen Namen — die <strong>PDU</strong> (Protocol Data Unit). Diese Zuordnung wird direkt abgefragt:</p>'+
        '<table class="lesson-table"><tr><th>Schicht</th><th>PDU</th><th>Enthält im Header</th></tr>'+
        '<tr><td>7–5</td><td>Daten</td><td>anwendungsspezifisch</td></tr>'+
        '<tr><td>4 Transport</td><td><strong>Segment</strong> (TCP) bzw. Datagramm (UDP)</td><td>Quell- und Zielport</td></tr>'+
        '<tr><td>3 Vermittlung</td><td><strong>Paket</strong></td><td>Quell- und Ziel-IP, TTL</td></tr>'+
        '<tr><td>2 Sicherung</td><td><strong>Frame</strong></td><td>Quell- und Ziel-MAC, Prüfsumme</td></tr>'+
        '<tr><td>1 Bitübertragung</td><td><strong>Bits</strong></td><td>—</td></tr></table>'+
        '<p>Die <strong>MTU</strong> (Maximum Transmission Unit) begrenzt die Nutzlast eines Frames, im Ethernet üblicherweise auf <strong>1.500 Byte</strong>. Größere Daten werden fragmentiert — deshalb reicht ein einzelnes Paket nie für eine große Datei.</p>',
      code:
        "OVERHEAD BERECHNEN - eine typische Pruefungsaufgabe\n\n"+
        "  Ein Ethernet-Frame traegt hoechstens 1.500 Byte Nutzlast (MTU).\n"+
        "  Davon gehen ab:\n"+
        "     IP-Header   20 Byte\n"+
        "     TCP-Header  20 Byte\n"+
        "     ------------------\n"+
        "     nutzbar   1.460 Byte fuer die Anwendungsdaten\n\n"+
        "  Wie viele Frames braucht eine Datei von 1 MB?\n"+
        "     1.000.000 / 1.460 = 685,0 -> aufgerundet 686 Frames\n\n"+
        "  Wie hoch ist der Overhead in Prozent?\n"+
        "     40 Byte Header je 1.500 Byte Frame\n"+
        "     40 / 1.500 = 2,67 %\n"+
        "     Zusaetzlich kommen 18 Byte Ethernet-Rahmen hinzu:\n"+
        "     58 / 1.518 = 3,82 %\n\n"+
        "  Deshalb erreicht eine 1-Gbit-Leitung nie 125 MB/s netto.",
      codeLang:'Kapselung',
      tip:'Die Overhead-Rechnung erklärt eine Frage, die in Prüfungen gern beiläufig gestellt wird: Warum liefert eine Leitung nie ihre Nennleistung? Neben der Kapselung kommen Quittungen, Verbindungsaufbau und Wartezeiten hinzu. In der Praxis rechnet man deshalb mit etwa 80 bis 90 Prozent der Bruttorate — genau der Prozentsatz, der in Aufgaben zur Übertragungsdauer als „effektive Auslastung" auftaucht.',
      quiz:[
        {q:'Wie heißt die Dateneinheit auf OSI-Schicht 3?', options:['Frame','Paket','Segment'], correct:1, explain:'Segment auf Schicht 4, Paket auf 3, Frame auf 2.'},
        {q:'Was geschieht beim Empfänger mit den Headern?', options:['Sie bleiben erhalten','Jede Schicht entfernt ihren eigenen Header','Sie werden alle auf einmal entfernt'], correct:1, explain:'Das ist die Entkapselung — der Spiegel des Sendevorgangs.'},
        {q:'Wie groß ist die MTU im Ethernet üblicherweise?', options:['576 Byte','1.500 Byte','9.000 Byte'], correct:1, explain:'9.000 Byte sind Jumbo Frames, die eigens konfiguriert werden müssen.'}
      ]
    },
    {
      id:'m31-l4', title:'Unicast, Multicast, Broadcast und Domänen', minutes:8,
      body:
        '<p>Nicht jede Nachricht geht an genau einen Empfänger. Die <strong>vier Übertragungsarten</strong>:</p>'+
        '<table class="lesson-table"><tr><th>Art</th><th>Empfänger</th><th>Beispiel</th></tr>'+
        '<tr><td><strong>Unicast</strong></td><td>genau einer</td><td>Webseitenabruf, Dateiübertragung</td></tr>'+
        '<tr><td><strong>Broadcast</strong></td><td>alle im Segment</td><td>ARP-Anfrage, DHCP Discover</td></tr>'+
        '<tr><td><strong>Multicast</strong></td><td>eine angemeldete Gruppe</td><td>IPTV, Videokonferenz, Routing-Updates</td></tr>'+
        '<tr><td><strong>Anycast</strong></td><td>der nächstgelegene aus einer Gruppe</td><td>DNS-Rootserver, Content-Netze</td></tr></table>'+
        '<p>Die Broadcast-MAC lautet <code>ff:ff:ff:ff:ff:ff</code>. <strong>IPv6 kennt keinen Broadcast</strong> — seine Aufgaben übernimmt gezielteres Multicast.</p>'+
        '<p><strong>Die beiden Domänen</strong> sind der Kern jeder Frage nach Switch und Router:</p>'+
        '<ul><li>Eine <strong>Kollisionsdomäne</strong> umfasst alle Geräte, deren Signale sich gegenseitig stören können. Ein <strong>Hub</strong> bildet eine einzige große Kollisionsdomäne, ein <strong>Switch</strong> macht <em>jeden Port</em> zu einer eigenen. Deshalb gibt es im geswitchten Netz praktisch keine Kollisionen mehr.</li>'+
        '<li>Eine <strong>Broadcast-Domäne</strong> umfasst alle Geräte, die einen Broadcast empfangen. Ein Switch leitet Broadcasts weiter, ein <strong>Router</strong> nicht. Getrennt wird sie also erst durch einen Router — oder logisch durch ein <strong>VLAN</strong>.</li></ul>'+
        '<p><strong>Der Merksatz:</strong> Der Switch trennt Kollisionsdomänen, der Router trennt Broadcast-Domänen.</p>'+
        '<p><strong>Duplex:</strong> Bei <strong>Halbduplex</strong> kann immer nur eine Seite senden, bei <strong>Vollduplex</strong> beide gleichzeitig. Moderne Switch-Verbindungen laufen im Vollduplex — das ist der zweite Grund, warum Kollisionen verschwunden sind. Die <strong>Autonegotiation</strong> handelt Geschwindigkeit und Duplexmodus automatisch aus; ist sie nur auf einer Seite aktiv, entsteht ein <strong>Duplex-Mismatch</strong> mit sehr langsamer, fehlerhafter Verbindung.</p>',
      code:
        "WARUM SEGMENTIEREN? - die Begruendung fuer VLANs\n\n"+
        "  Ausgangslage: 250 Geraete in einer Broadcast-Domaene.\n"+
        "  Jedes Geraet erzeugt im Schnitt 5 Broadcasts pro Minute.\n\n"+
        "     250 x 5 = 1.250 Broadcasts pro Minute,\n"+
        "     die JEDES der 250 Geraete verarbeiten muss.\n\n"+
        "  Nach Aufteilung in 5 VLANs zu je 50 Geraeten:\n"+
        "     50 x 5 = 250 Broadcasts pro Minute je VLAN\n"+
        "     -> 80 Prozent weniger Last je Geraet.\n\n"+
        "  Die drei Gruende fuer VLANs in der Pruefung:\n"+
        "   1. Weniger Broadcast-Last, bessere Leistung\n"+
        "   2. Sicherheit: Abteilungen sind voneinander getrennt\n"+
        "   3. Flexibilitaet: Zuordnung am Switch statt neuer Verkabelung",
      codeLang:'Segmentierung',
      tip:'Bei der Frage „Warum wird ein Netz segmentiert?" reichen die Stichworte Leistung und Sicherheit nicht für die volle Punktzahl. Ergänze den Mechanismus: Broadcasts bleiben im eigenen Segment und belasten die anderen nicht mehr. Und nenne die Flexibilität als dritten Punkt — ein Arbeitsplatz wechselt durch Umkonfiguration am Switch das VLAN, ohne dass ein Kabel neu verlegt werden muss.',
      quiz:[
        {q:'Welches Gerät trennt Broadcast-Domänen?', options:['Hub','Switch','Router'], correct:2, explain:'Der Switch trennt nur Kollisionsdomänen — logisch trennt auch ein VLAN.'},
        {q:'Wie lautet die Broadcast-MAC-Adresse?', options:['00:00:00:00:00:00','ff:ff:ff:ff:ff:ff','ab:cd:ef:00:00:01'], correct:1, explain:'Alle 48 Bit auf 1 — IPv6 kennt diese Adressart gar nicht mehr.'},
        {q:'Was passiert bei einem Duplex-Mismatch?', options:['Die Verbindung kommt gar nicht zustande','Die Verbindung läuft, ist aber sehr langsam und fehlerhaft','Die Geschwindigkeit verdoppelt sich'], correct:1, explain:'Genau das macht ihn tückisch: Die Link-LED leuchtet, aber es gibt massenhaft Kollisionen und Neuübertragungen.'}
      ]
    },
    {
      id:'m31-l5', title:'Client-Server-Kommunikation, Ports und Sockets', minutes:8,
      body:
        '<p>Auf einem Server laufen viele Dienste gleichzeitig. Die IP-Adresse führt zum <em>Rechner</em> — aber wie kommt das Paket zum richtigen <em>Programm</em>? Über die <strong>Portnummer</strong>.</p>'+
        '<p>Die Kombination aus <strong>IP-Adresse und Port</strong> heißt <strong>Socket</strong>. Eine Verbindung wird eindeutig durch vier Werte beschrieben — das <strong>Socket-Paar</strong>: Quell-IP, Quell-Port, Ziel-IP, Ziel-Port. Deshalb kann ein Browser mehrere Verbindungen zum selben Server öffnen: Die Quellports unterscheiden sich.</p>'+
        '<table class="lesson-table"><tr><th>Bereich</th><th>Bezeichnung</th><th>Verwendung</th></tr>'+
        '<tr><td>0 – 1023</td><td>Well Known Ports</td><td>Standarddienste, meist Administratorrechte nötig</td></tr>'+
        '<tr><td>1024 – 49151</td><td>Registered Ports</td><td>registrierte Anwendungen</td></tr>'+
        '<tr><td>49152 – 65535</td><td>Dynamic / Private Ports</td><td>zufällige Quellports der Clients</td></tr></table>'+
        '<p><strong>Der Ablauf einer Anfrage</strong>, hier am Beispiel eines Webseitenaufrufs:</p>'+
        '<ol><li>Der Client löst den Namen per <strong>DNS</strong> in eine IP-Adresse auf.</li>'+
        '<li>Er öffnet einen zufälligen Quellport, etwa 51234.</li>'+
        '<li>Er baut die TCP-Verbindung zum Zielport 443 auf (Drei-Wege-Handshake).</li>'+
        '<li>Er sendet die Anfrage, der Server antwortet — <strong>Request und Response</strong>.</li>'+
        '<li>Die Verbindung wird abgebaut oder für weitere Anfragen offengehalten.</li></ol>'+
        '<p>Der Server <strong>lauscht</strong> dauerhaft auf seinem Port (<em>listening</em>) und wartet auf Verbindungen. Mit <code>netstat -an</code> siehst du, welche Ports offen sind und welche Verbindungen bestehen — das ist zugleich ein Sicherheitswerkzeug: Ein unerwartet offener Port ist ein Warnsignal.</p>',
      code:
        "EIN SOCKET-PAAR IN DER PRAXIS\n\n"+
        "  Browser-Tab 1:  192.168.1.10:51234  <-->  93.184.216.34:443\n"+
        "  Browser-Tab 2:  192.168.1.10:51235  <-->  93.184.216.34:443\n"+
        "                                ^^^^^\n"+
        "     Nur der Quellport unterscheidet die beiden Verbindungen.\n"+
        "     Der Server sieht sie dadurch als voellig getrennt.\n\n"+
        "netstat -an (gekuerzt)\n"+
        "  Proto  Lokale Adresse       Remote-Adresse      Status\n"+
        "  TCP    0.0.0.0:443          0.0.0.0:0           LISTENING\n"+
        "  TCP    192.168.1.10:51234   93.184.216.34:443   ESTABLISHED\n"+
        "  TCP    192.168.1.10:51235   93.184.216.34:443   ESTABLISHED\n"+
        "  TCP    192.168.1.10:49800   10.0.0.5:3389       TIME_WAIT\n\n"+
        "  LISTENING   = Dienst wartet auf Verbindungen\n"+
        "  ESTABLISHED = Verbindung steht\n"+
        "  TIME_WAIT   = Verbindung wird gerade abgebaut",
      codeLang:'Sockets',
      tip:'Die Frage „Warum braucht man neben der IP-Adresse noch Ports?" beantwortest du mit einem Satz: Die IP-Adresse adressiert den Rechner, der Port das Programm darauf. Ohne Ports könnte ein Server nur einen einzigen Dienst anbieten. Ergänze das Socket-Paar als zweiten Punkt — es erklärt, warum ein Client mehrere gleichzeitige Verbindungen zum selben Dienst halten kann.',
      quiz:[
        {q:'Was bezeichnet ein Socket?', options:['Eine Netzwerkbuchse','Die Kombination aus IP-Adresse und Port','Ein Kabel'], correct:1, explain:'Eine Verbindung wird durch das Socket-Paar aus vier Werten eindeutig beschrieben.'},
        {q:'Aus welchem Bereich stammt der Quellport eines Browsers?', options:['0 bis 1023','1024 bis 49151','49152 bis 65535'], correct:2, explain:'Die dynamischen Ports werden zufällig für jede Verbindung vergeben.'},
        {q:'Welcher Status zeigt in netstat einen wartenden Serverdienst?', options:['ESTABLISHED','LISTENING','TIME_WAIT'], correct:1, explain:'ESTABLISHED ist eine bestehende Verbindung, TIME_WAIT eine gerade abgebaute.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m11', part:4, partTitle:'Netzwerktechnik', title:'OSI-Modell & Protokolle', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m11-l1', title:'Die sieben Schichten – einmal richtig gelernt', minutes:10,
      body:
        '<p>Das <strong>OSI-Referenzmodell</strong> ist das meistgeprüfte Netzwerkthema der AP1. Von unten nach oben:</p>'+
        '<table class="lesson-table"><tr><th>Nr</th><th>Schicht</th><th>Einheit</th><th>Adresse</th><th>Geräte / Protokolle</th></tr>'+
        '<tr><td>1</td><td>Bitübertragung (Physical)</td><td>Bits</td><td>–</td><td>Kabel, Stecker, Hub, Repeater</td></tr>'+
        '<tr><td>2</td><td>Sicherung (Data Link)</td><td>Frames</td><td>MAC</td><td>Switch, Bridge, NIC; Ethernet, ARP, WLAN</td></tr>'+
        '<tr><td>3</td><td>Vermittlung (Network)</td><td>Pakete</td><td>IP</td><td>Router; IPv4, IPv6, ICMP</td></tr>'+
        '<tr><td>4</td><td>Transport</td><td>Segmente</td><td>Ports</td><td>TCP, UDP</td></tr>'+
        '<tr><td>5</td><td>Sitzung (Session)</td><td>–</td><td>–</td><td>Verbindungsauf- und -abbau</td></tr>'+
        '<tr><td>6</td><td>Darstellung (Presentation)</td><td>–</td><td>–</td><td>Kodierung, Kompression, TLS</td></tr>'+
        '<tr><td>7</td><td>Anwendung (Application)</td><td>Daten</td><td>–</td><td>HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH</td></tr></table>'+
        '<p><strong>Eselsbrücke von unten:</strong> <em>Bitte Schicke Verpackung Trotzdem Sofort Dorthin Ab.</em></p>'+
        '<figure class="fig"><svg viewBox="0 0 560 300" role="img" aria-label="Die sieben Schichten des OSI-Modells mit zugehoerigen Geraeten und Protokollen"><rect class="s-l7" x="40" y="10" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="32">7 &#183; Anwendung</text><text class="s-mono" x="382" y="32">HTTP DNS DHCP</text><rect class="s-l7" x="40" y="48" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="70">6 &#183; Darstellung</text><text class="s-mono" x="382" y="70">TLS, Kodierung</text><rect class="s-l7" x="40" y="86" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="108">5 &#183; Sitzung</text><text class="s-mono" x="382" y="108">Verbindungen</text><rect class="s-l4" x="40" y="124" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="146">4 &#183; Transport</text><text class="s-mono" x="382" y="146">TCP / UDP &#183; Port</text><rect class="s-l3" x="40" y="162" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="184">3 &#183; Vermittlung</text><text class="s-mono" x="382" y="184">Router &#183; IP</text><rect class="s-l2" x="40" y="200" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="222">2 &#183; Sicherung</text><text class="s-mono" x="382" y="222">Switch &#183; MAC</text><rect class="s-l1" x="40" y="238" width="330" height="34" rx="4"/><text class="s-lbl" x="54" y="260">1 &#183; Bit&#252;bertragung</text><text class="s-mono" x="382" y="260">Kabel &#183; Hub</text><text class="s-lbl" x="14" y="290">Eselsbr&#252;cke von unten: Bitte Schicke Verpackung Trotzdem Sofort Dorthin Ab</text></svg><figcaption>Die unteren vier Schichten transportieren, die oberen drei verarbeiten. DHCP und DNS liegen trotz ihrer Aufgabe auf Schicht 7, weil sie selbst Anwendungsprotokolle sind.</figcaption></figure>',
      code:
        "TCP/IP-Modell als Vergleich (4 Schichten):\n"+
        "  Netzzugang  (OSI 1-2)\n"+
        "  Internet    (OSI 3)\n"+
        "  Transport   (OSI 4)\n"+
        "  Anwendung   (OSI 5-7)",
      codeLang:'OSI vs. TCP/IP',
      tip:'Die häufigste Fehlzuordnung der ganzen AP1 betrifft DHCP. Weil es IP-Adressen verteilt, landet es bei vielen auf Schicht 3 – falsch. Entscheidend ist nicht, worüber ein Protokoll spricht, sondern auf welcher Ebene es selbst arbeitet. DHCP nutzt UDP und ist damit ein Anwendungsprotokoll auf Schicht 7. Dieselbe Logik gilt für DNS.',
      quiz:[
        {q:'Auf welcher OSI-Schicht arbeitet die MAC-Adresse?', options:['Schicht 1','Schicht 2','Schicht 3'], correct:1, explain:'Schicht 1 ist die Hardware selbst, Schicht 2 ihre Adressierung.'},
        {q:'Auf welcher Schicht arbeitet DHCP?', options:['Schicht 3, weil es IP-Adressen verteilt','Schicht 7, es ist ein Anwendungsprotokoll über UDP','Schicht 2'], correct:1, explain:'Nicht der Inhalt entscheidet, sondern die Ebene des Protokolls selbst.'},
        {q:'Auf welcher OSI-Schicht arbeitet ein Repeater?', options:['Schicht 1','Schicht 2','Schicht 3'], correct:0, explain:'Er verstärkt nur das Signal und kennt keinerlei Adressen.'}
      ]
    },
    {
      id:'m11-l2', title:'TCP und UDP im Vergleich', minutes:8,
      body:
        '<p>Beide arbeiten auf <strong>Schicht 4</strong> und adressieren über <strong>Ports</strong>, unterscheiden sich aber grundlegend:</p>'+
        '<table class="lesson-table"><tr><th></th><th>TCP</th><th>UDP</th></tr>'+
        '<tr><td>Verbindung</td><td>verbindungsorientiert (Handshake)</td><td>verbindungslos</td></tr>'+
        '<tr><td>Zuverlässigkeit</td><td>gesichert, Bestätigung und Wiederholung</td><td>ungesichert</td></tr>'+
        '<tr><td>Reihenfolge</td><td>garantiert</td><td>nicht garantiert</td></tr>'+
        '<tr><td>Geschwindigkeit</td><td>langsamer (Overhead)</td><td>schnell, wenig Overhead</td></tr>'+
        '<tr><td>Einsatz</td><td>HTTP, FTP, SMTP, SSH</td><td>DNS, DHCP, VoIP, Streaming, Online-Spiele</td></tr></table>'+
        '<p>Der <strong>Drei-Wege-Handshake</strong> von TCP: <code>SYN → SYN-ACK → ACK</code>.</p>'+
        '<p>Die <strong>Well-Known-Ports</strong>, die du kennen solltest: 20/21 FTP · 22 SSH · 23 Telnet · 25 SMTP · 53 DNS · 67/68 DHCP · 80 HTTP · 110 POP3 · 143 IMAP · 443 HTTPS · 3389 RDP.</p>'+
        '<figure class="fig"><svg viewBox="0 0 540 190" role="img" aria-label="TCP-Drei-Wege-Handshake als Sequenzdiagramm"><text class="s-hd" x="80" y="22" text-anchor="middle">Client</text><text class="s-hd" x="450" y="22" text-anchor="middle">Server</text><line class="s-life" x1="80" y1="32" x2="80" y2="172"/><line class="s-life" x1="450" y1="32" x2="450" y2="172"/><line class="s-arrow" x1="80" y1="60" x2="444" y2="60" marker-end="url(#ar2)"/><text class="s-mono" x="265" y="52" text-anchor="middle">1. SYN</text><line class="s-arrow" x1="450" y1="104" x2="86" y2="104" marker-end="url(#ar2)"/><text class="s-mono" x="265" y="96" text-anchor="middle">2. SYN-ACK</text><line class="s-arrow" x1="80" y1="148" x2="444" y2="148" marker-end="url(#ar2)"/><text class="s-mono" x="265" y="140" text-anchor="middle">3. ACK</text><text class="s-lbl" x="265" y="172" text-anchor="middle">&#8594; Verbindung steht, Daten&#252;bertragung beginnt</text><defs><marker id="ar2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs></svg><figcaption>Der Drei-Wege-Handshake baut die gesicherte TCP-Verbindung auf. UDP kennt diesen Schritt nicht und sendet sofort.</figcaption></figure>',
      code:'',
      tip:'Die Logik hinter der Protokollwahl lässt sich in einem Satz begründen, und genau das will die IHK bei „Erläutern Sie" hören: Bei Videotelefonie ist ein verlorenes Paket weniger schlimm als eine Verzögerung – ein kurzes Bildrauschen stört weniger als ein Stocken. Also UDP. Bei einer Dateiübertragung wäre ein fehlendes Byte fatal, Verzögerung dagegen egal. Also TCP.',
      quiz:[
        {q:'Welches Protokoll nutzt DNS überwiegend?', options:['TCP','UDP','ICMP'], correct:1, explain:'Schnelle Einzelanfragen ohne Verbindungsaufbau – Wiederholung ist billiger als Handshake.'},
        {q:'Wie lautet der TCP-Verbindungsaufbau?', options:['SYN – SYN-ACK – ACK','GET – POST – PUT','HELLO – READY – GO'], correct:0, explain:'Der klassische Drei-Wege-Handshake.'},
        {q:'Welchen Vorteil hat UDP gegenüber TCP?', options:['Höhere Zuverlässigkeit','Weniger Overhead und keine Verzögerung durch Verbindungsaufbau','Garantierte Reihenfolge'], correct:1, explain:'Deshalb nutzen VoIP, Streaming und DNS dieses Protokoll.'}
      ]
    },
    {
      id:'m11-l3', title:'Netzwerkgeräte und Topologien', minutes:8,
      body:
        '<p>Die Geräte nach OSI-Schicht – eine beliebte Zuordnungsfrage:</p>'+
        '<ul><li><strong>Hub</strong> (Schicht 1) – sendet jedes Signal an alle Ports. Veraltet, erzeugt Kollisionen.</li>'+
        '<li><strong>Switch</strong> (Schicht 2) – lernt MAC-Adressen und leitet gezielt an den richtigen Port weiter. Jeder Port ist eine eigene Kollisionsdomäne.</li>'+
        '<li><strong>Router</strong> (Schicht 3) – verbindet Netze, trifft Weiterleitungsentscheidungen anhand der IP-Adresse, trennt Broadcast-Domänen.</li>'+
        '<li><strong>Firewall</strong> (Schicht 3–7) – filtert Verkehr nach Regeln.</li>'+
        '<li><strong>Access Point</strong> (Schicht 2) – Brücke zwischen WLAN und kabelgebundenem Netz.</li></ul>'+
        '<p><strong>Topologien:</strong> Stern (heute Standard, ein zentraler Switch – Ausfall eines Kabels betrifft nur ein Gerät), Bus (veraltet, ein Kabelbruch legt alles lahm), Ring (Token Ring, FDDI), Vermaschung (hochredundant, teuer), Baum (hierarchisch verbundene Sterne).</p>',
      code:'',
      tip:'Der Merksatz, der die Geräte-Frage sicher löst: Der Switch trennt Kollisionsdomänen, der Router trennt Broadcast-Domänen. Daraus folgt direkt die Antwort auf „Warum wird ein Netz segmentiert?" – Broadcasts bleiben in ihrem Segment, statt das gesamte Netz zu belasten. Genau das ist neben der Sicherheit der zweite Grund für VLANs.',
      quiz:[
        {q:'Welches Gerät arbeitet auf OSI-Schicht 3?', options:['Switch','Router','Hub'], correct:1, explain:'Der Router entscheidet anhand der IP-Adresse und trennt Broadcast-Domänen.'},
        {q:'Welche Topologie ist heute Standard im LAN?', options:['Bus','Ring','Stern'], correct:2, explain:'Alle Geräte hängen an einem zentralen Switch – ein Kabeldefekt betrifft nur ein Gerät.'},
        {q:'Welche Topologie legt bei einem einzigen Kabelbruch das gesamte Netz lahm?', options:['Stern','Bus','Vermaschung'], correct:1, explain:'Im Stern betrifft ein Kabeldefekt nur das eine angeschlossene Gerät.'}
      ]
    },
    {
      id:'m11-l4', title:'Fehlersuche nach OSI – die Bottom-up-Methode', minutes:9,
      body:
        '<p>Netzwerkprobleme löst man <strong>von unten nach oben</strong>. Jede Schicht baut auf der darunter auf – ein Fehler auf Schicht 1 macht jede Analyse auf Schicht 7 sinnlos.</p>'+
        '<ol><li><strong>Bitübertragung:</strong> Kabel gesteckt? Link-LED an? Richtiger Port? → Fehler: Medium getrennt.</li>'+
        '<li><strong>Sicherung:</strong> Netzwerkkarte erkannt und aktiviert? MAC-Adresse vorhanden? Richtiges VLAN? → Fehler: Netzwerkkarte defekt.</li>'+
        '<li><strong>Vermittlung:</strong> <code>ipconfig /all</code> – IP, Maske, Gateway plausibel? <code>ping</code> aufs Gateway? → Fehler: falsche oder fehlende IP-Adresse.</li>'+
        '<li><strong>Transport:</strong> Port erreichbar, Firewall blockiert? <code>netstat</code>, <code>telnet host port</code>.</li>'+
        '<li><strong>Anwendung:</strong> <code>nslookup</code> – Namensauflösung? Dienst gestartet? → Fehler: Serverkonfiguration, DNS.</li></ol>'+
        '<p>Die <strong>LEDs an der RJ-45-Buchse</strong> liefern die Schicht-1-Diagnose kostenlos: Die <strong>Link-LED</strong> leuchtet dauerhaft und zeigt eine bestehende physikalische Verbindung. Die <strong>Activity-LED</strong> blinkt unregelmäßig und zeigt tatsächlichen Datenverkehr.</p>',
      code:
        "Die Ping-Kaskade – von innen nach aussen:\n"+
        "  1. ping 127.0.0.1  (bzw. ::1)   -> TCP/IP-Stack des Betriebssystems ok?\n"+
        "  2. ping <eigene IP>             -> Netzwerkkarte korrekt konfiguriert?\n"+
        "  3. ping <Gateway>               -> Verbindung im lokalen Netz ok?\n"+
        "  4. ping 8.8.8.8                 -> Routing nach aussen ok?\n"+
        "  5. ping google.de               -> DNS ok?\n\n"+
        "Klappt 4, aber nicht 5  -> DNS-Problem\n"+
        "Klappt 2, aber nicht 3  -> Kabel, Switch oder falsche IP/Maske",
      codeLang:'Diagnose',
      tip:'Die Ping-Kaskade ist nicht nur eine Befehlsliste, sondern ein Diagnoseverfahren: Der Punkt, an dem es bricht, benennt die fehlerhafte Schicht. Wer in der Prüfung „Beschreiben Sie Ihre Vorgehensweise" liest, schreibt genau diese Kette als nummerierte Handlungsschritte hin, jeder beginnend mit einem Verb – und ergänzt bei jedem Schritt, was das Ergebnis bedeutet.',
      quiz:[
        {q:'Ping auf 8.8.8.8 klappt, auf google.de nicht. Wo liegt der Fehler?', options:['Kabel','DNS-Namensauflösung','Gateway'], correct:1, explain:'Das Routing funktioniert, nur die Namensauflösung nicht.'},
        {q:'Was zeigt eine dauerhaft leuchtende LED an der Netzwerkbuchse?', options:['Datenverkehr','Eine bestehende physikalische Verbindung (Link)','Einen Defekt'], correct:1, explain:'Unregelmäßiges Blinken zeigt dagegen die Aktivität.'},
        {q:'Was zeigt eine unregelmäßig blinkende LED an der Netzwerkbuchse?', options:['Einen Defekt','Tatsächlichen Datenverkehr','Eine bestehende Verbindung ohne Verkehr'], correct:1, explain:'Die dauerhaft leuchtende Link-LED zeigt dagegen nur die bestehende Verbindung.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m40', part:4, partTitle:'Netzwerktechnik', title:'TCP im Detail', relevanz:'hoch',
  lessons:[
    {
      id:'m40-l1', title:'Der Drei-Wege-Handschlag', minutes:10,
      body:
        '<p>Bevor über TCP ein einziges Nutzbyte fließt, wird die Verbindung <strong>aufgebaut</strong>. Das geschieht mit drei Paketen &#8211; dem <strong>Drei-Wege-Handschlag</strong>.</p>'+
        '<p>Zwei Felder im TCP-Kopf tragen die ganze Logik:</p>'+
        '<ul><li>Die <strong>Sequenznummer</strong> sagt: <em>Das ist die Position meines ersten Bytes in diesem Paket.</em></li>'+
        '<li>Die <strong>Bestätigungsnummer</strong> (Acknowledgement) sagt: <em>Alles bis hierhin habe ich bekommen &#8211; schick mir als Nächstes dieses Byte.</em></li></ul>'+
        '<p><strong>Der entscheidende Punkt, der gern falsch beantwortet wird:</strong> Die Bestätigungsnummer nennt <strong>nicht</strong> das zuletzt empfangene Byte, sondern das <strong>nächste erwartete</strong>. Deshalb steht dort immer die Sequenznummer des Gegenübers <strong>plus eins</strong>.</p>'+
        '<table class="lesson-table"><tr><th>Schritt</th><th>Richtung</th><th>Flags</th><th>Inhalt</th></tr>'+
        '<tr><td>1</td><td>Client &#8594; Server</td><td><strong>SYN</strong></td><td>seq = x (zufällig gewählt)</td></tr>'+
        '<tr><td>2</td><td>Server &#8594; Client</td><td><strong>SYN, ACK</strong></td><td>seq = y, ack = x + 1</td></tr>'+
        '<tr><td>3</td><td>Client &#8594; Server</td><td><strong>ACK</strong></td><td>seq = x + 1, ack = y + 1</td></tr></table>'+
        '<p><strong>Warum drei und nicht zwei?</strong> Weil <em>beide</em> Seiten ihre Startnummer mitteilen und bestätigt bekommen müssen. Schritt 1 und 2 richten die Richtung Client&#8594;Server ein, Schritt 2 und 3 die Gegenrichtung. Der mittlere Schritt erledigt zwei Aufgaben gleichzeitig &#8211; deshalb trägt er beide Flags. Mit nur zwei Paketen wüsste der Client nie, ob der Server seine Nummer erhalten hat.</p>'+
        '<p>Die <strong>Anfangssequenznummer</strong> (ISN) wird zufällig gewählt, nicht bei null begonnen. Das erschwert es einem Angreifer, sich mit erratenen Nummern in eine fremde Verbindung einzuschleusen.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 302" role="img" aria-label="Drei-Wege-Handschlag mit Sequenz- und Bestaetigungsnummern">'+
        '<rect class="s-accent" x="50" y="12" width="120" height="32" rx="3"/>'+
        '<text class="s-hd" x="110" y="32" text-anchor="middle">Client</text>'+
        '<rect class="s-accent" x="390" y="12" width="120" height="32" rx="3"/>'+
        '<text class="s-hd" x="450" y="32" text-anchor="middle">Server</text>'+
        '<line class="s-life" x1="110" y1="44" x2="110" y2="276"/>'+
        '<line class="s-life" x1="450" y1="44" x2="450" y2="276"/>'+
        '<text class="s-mono" x="470" y="66">LISTEN</text>'+
        '<line class="s-arrow" x1="114" y1="88" x2="444" y2="88" marker-end="url(#tcp1)"/>'+
        '<text class="s-mono" x="280" y="80" text-anchor="middle">1) SYN &#160;&#160; seq = x</text>'+
        '<text class="s-mono" x="14" y="112">SYN_SENT</text>'+
        '<text class="s-mono" x="470" y="116">SYN_RECEIVED</text>'+
        '<line class="s-arrow" x1="446" y1="140" x2="116" y2="140" marker-end="url(#tcp1)"/>'+
        '<text class="s-mono" x="280" y="132" text-anchor="middle">2) SYN, ACK &#160;&#160; seq = y &#160; ack = x+1</text>'+
        '<line class="s-arrow" x1="114" y1="190" x2="444" y2="190" marker-end="url(#tcp1)"/>'+
        '<text class="s-mono" x="280" y="182" text-anchor="middle">3) ACK &#160;&#160; seq = x+1 &#160; ack = y+1</text>'+
        '<text class="s-mono" x="14" y="214">ESTABLISHED</text>'+
        '<text class="s-mono" x="470" y="214">ESTABLISHED</text>'+
        '<rect class="s-ok" x="110" y="228" width="340" height="30" rx="4"/>'+
        '<text class="s-lbl" x="280" y="248" text-anchor="middle">Verbindung steht &#8211; Daten ab seq = x+1</text>'+
        '<text class="s-lbl" x="14" y="290">ack nennt immer das N&#196;CHSTE erwartete Byte, nicht das zuletzt empfangene.</text>'+
        '<defs><marker id="tcp1" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Der mittlere Schritt erledigt zwei Aufgaben zugleich: Er bestätigt die Nummer des Clients und meldet die eigene. Deshalb trägt er beide Flags.</figcaption></figure>',
      code:
        "MIT ECHTEN ZAHLEN DURCHGERECHNET\n\n"+
        "  Client waehlt ISN x = 1000\n"+
        "  Server waehlt ISN y = 5000\n\n"+
        "  1) Client -> Server   SYN        seq=1000\n"+
        "  2) Server -> Client   SYN,ACK    seq=5000  ack=1001\n"+
        "  3) Client -> Server   ACK        seq=1001  ack=5001\n\n"+
        "  Danach sendet der Client 200 Byte Nutzdaten:\n"+
        "     Client -> Server   PSH,ACK    seq=1001  ack=5001  len=200\n"+
        "     Server -> Client   ACK                  ack=1201\n"+
        "                                             ^^^^^^^^\n"+
        "     1001 + 200 = 1201 - das naechste erwartete Byte.\n\n"+
        "WARUM DAS SYN EINE NUMMER VERBRAUCHT\n"+
        "  Das SYN traegt keine Nutzdaten, zaehlt aber wie EIN Byte.\n"+
        "  Deshalb lautet die Bestaetigung x+1 und nicht x.\n"+
        "  Dasselbe gilt spaeter fuer das FIN beim Abbau.\n\n"+
        "TYPISCHE PRUEFUNGSFRAGE\n"+
        "  \"Server erhaelt seq=4000 mit 500 Byte Nutzdaten.\n"+
        "   Wie lautet seine Bestaetigungsnummer?\"\n"+
        "     4000 + 500 = 4500\n\n"+
        "  \"Und wenn es ein reines SYN ohne Daten war?\"\n"+
        "     4000 + 1 = 4001",
      codeLang:'Drei-Wege-Handschlag',
      tip:'Die Frage „Warum drei Pakete und nicht zwei?" verlangt eine Begründung, keine Aufzählung. Die vollständige Antwort lautet: Beide Richtungen brauchen eine eigene Startnummer, und jede davon muss bestätigt werden. Zwei Pakete würden nur eine Richtung absichern. Wer zusätzlich erwähnt, dass die Anfangsnummer zufällig gewählt wird, um Einschleusen zu erschweren, hat die Aufgabe rund.',
      quiz:[
        {q:'Was bedeutet die Bestätigungsnummer in einem TCP-Segment?', options:['Das zuletzt empfangene Byte','Das nächste erwartete Byte','Die Gesamtzahl empfangener Bytes'], correct:1, explain:'Deshalb steht dort die Sequenznummer des Gegenübers plus eins.'},
        {q:'Welche Flags trägt das zweite Paket des Verbindungsaufbaus?', options:['Nur ACK','SYN und ACK zusammen','Nur SYN'], correct:1, explain:'Es bestätigt die Nummer des Clients und meldet zugleich die eigene.'},
        {q:'Ein Server empfängt seq=4000 mit 500 Byte Nutzdaten. Wie lautet seine Bestätigungsnummer?', options:['4000','4500','4501'], correct:1, explain:'4000 + 500. Nur ein SYN oder FIN ohne Daten zählt zusätzlich wie ein Byte.'}
      ]
    },
    {
      id:'m40-l2', title:'TCP-Flags und der Verbindungsabbau', minutes:9,
      body:
        '<p>Im TCP-Kopf stehen sechs Steuerbits, die <strong>Flags</strong>. Sie sagen, was ein Segment bedeutet:</p>'+
        '<table class="lesson-table"><tr><th>Flag</th><th>Bedeutung</th><th>Wann</th></tr>'+
        '<tr><td><strong>SYN</strong></td><td>Synchronize &#8211; Verbindung aufbauen</td><td>nur in den ersten beiden Paketen</td></tr>'+
        '<tr><td><strong>ACK</strong></td><td>Acknowledge &#8211; Bestätigungsnummer ist gültig</td><td>in fast jedem Paket nach dem ersten</td></tr>'+
        '<tr><td><strong>FIN</strong></td><td>Finish &#8211; ich habe nichts mehr zu senden</td><td>geordneter Abbau</td></tr>'+
        '<tr><td><strong>RST</strong></td><td>Reset &#8211; Abbruch, sofort</td><td>Fehler, oder Port geschlossen</td></tr>'+
        '<tr><td><strong>PSH</strong></td><td>Push &#8211; Daten sofort nach oben durchreichen</td><td>interaktive Anwendungen</td></tr>'+
        '<tr><td><strong>URG</strong></td><td>Urgent &#8211; Vorrangdaten</td><td>praktisch ungenutzt</td></tr></table>'+
        '<p><strong>Der Unterschied, der geprüft wird &#8211; FIN gegen RST:</strong> <strong>FIN</strong> ist das höfliche Ende: Beide Seiten senden fertig, was sie noch haben, und bestätigen den Abbau. <strong>RST</strong> ist der Abbruch: Die Verbindung wird sofort verworfen, Daten unterwegs gehen verloren. Ein RST bekommst du auch, wenn du einen <em>geschlossenen Port</em> ansprichst &#8211; das ist die Antwort auf die Frage, woran ein Portscanner einen geschlossenen von einem gefilterten Port unterscheidet.</p>'+
        '<p><strong>Der Verbindungsabbau braucht vier Pakete</strong>, nicht drei. Grund: TCP ist <strong>vollduplex</strong>, jede Richtung wird getrennt geschlossen. Wer zuerst FIN sendet, sagt nur, dass <em>er</em> nichts mehr zu senden hat &#8211; die Gegenseite darf weitersenden, bis auch sie fertig ist. Diesen Zwischenzustand nennt man <strong>halb geschlossen</strong>.</p>'+
        '<p>Die Seite, die zuerst schließt, bleibt danach eine Weile im Zustand <strong>TIME_WAIT</strong> &#8211; üblicherweise die doppelte maximale Paketlebensdauer. Das stellt sicher, dass verspätete Pakete der alten Verbindung nicht in eine neue geraten, die zufällig dieselben Ports benutzt. Deshalb sieht man auf einem Server mit vielen kurzen Verbindungen massenhaft TIME_WAIT-Einträge in <code>netstat</code> &#8211; das ist normal und kein Fehler.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 292" role="img" aria-label="Verbindungsabbau mit vier Paketen und dem Zustand TIME_WAIT">'+
        '<rect class="s-accent" x="50" y="12" width="120" height="32" rx="3"/>'+
        '<text class="s-hd" x="110" y="32" text-anchor="middle">Seite A</text>'+
        '<rect class="s-accent" x="390" y="12" width="120" height="32" rx="3"/>'+
        '<text class="s-hd" x="450" y="32" text-anchor="middle">Seite B</text>'+
        '<line class="s-life" x1="110" y1="44" x2="110" y2="268"/>'+
        '<line class="s-life" x1="450" y1="44" x2="450" y2="268"/>'+
        '<line class="s-arrow" x1="114" y1="76" x2="444" y2="76" marker-end="url(#tcp2)"/>'+
        '<text class="s-mono" x="280" y="68" text-anchor="middle">1) FIN &#8211; A ist fertig</text>'+
        '<text class="s-mono" x="14" y="98">FIN_WAIT</text>'+
        '<line class="s-arrow" x1="446" y1="112" x2="116" y2="112" marker-end="url(#tcp2)"/>'+
        '<text class="s-mono" x="280" y="104" text-anchor="middle">2) ACK</text>'+
        '<rect class="s-warn" x="150" y="126" width="260" height="26" rx="4"/>'+
        '<text class="s-lbl" x="280" y="144" text-anchor="middle">halb geschlossen &#8211; B darf weitersenden</text>'+
        '<line class="s-arrow" x1="446" y1="176" x2="116" y2="176" marker-end="url(#tcp2)"/>'+
        '<text class="s-mono" x="280" y="168" text-anchor="middle">3) FIN &#8211; jetzt ist auch B fertig</text>'+
        '<line class="s-arrow" x1="114" y1="212" x2="444" y2="212" marker-end="url(#tcp2)"/>'+
        '<text class="s-mono" x="280" y="204" text-anchor="middle">4) ACK</text>'+
        '<rect class="s-risk3" x="20" y="228" width="180" height="28" rx="4"/>'+
        '<text class="s-lbl" x="110" y="246" text-anchor="middle">TIME_WAIT bei A</text>'+
        '<text class="s-lbl" x="214" y="246">wartet, damit versp&#228;tete Pakete nicht in eine neue Verbindung geraten</text>'+
        '<text class="s-lbl" x="14" y="284">Vier Pakete, weil jede Richtung getrennt geschlossen wird. RST bricht dagegen sofort ab.</text>'+
        '<defs><marker id="tcp2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Der Abbau spiegelt den Aufbau, braucht aber ein Paket mehr: Aufbau kann SYN und ACK bündeln, der Abbau muss auf die zweite Richtung warten.</figcaption></figure>',
      code:
        "AUFBAU GEGEN ABBAU - warum 3 und warum 4\n\n"+
        "  Aufbau   SYN | SYN+ACK | ACK           3 Pakete\n"+
        "           Der mittlere Schritt buendelt beides.\n\n"+
        "  Abbau    FIN | ACK | FIN | ACK         4 Pakete\n"+
        "           B kann nach dem ersten FIN noch Daten senden,\n"+
        "           darf sein FIN also nicht sofort mitschicken.\n\n"+
        "  Wenn B nichts mehr zu senden hat, buendelt es in der\n"+
        "  Praxis oft doch - dann sind es drei Pakete.\n\n"+
        "WAS NETSTAT ZEIGT\n"+
        "  LISTEN        Dienst wartet auf Verbindungen\n"+
        "  SYN_SENT      Handschlag laeuft, Antwort steht aus\n"+
        "  ESTABLISHED   Verbindung steht\n"+
        "  FIN_WAIT_1/2  eigenes FIN gesendet, Abbau laeuft\n"+
        "  CLOSE_WAIT    Gegenseite hat FIN gesendet, wir noch nicht\n"+
        "  TIME_WAIT     Abbau fertig, Nachlaufzeit laeuft\n\n"+
        "  DIAGNOSE\n"+
        "  Viele CLOSE_WAIT  -> die Anwendung schliesst ihre Sockets\n"+
        "                       nicht. Das ist ein Programmfehler.\n"+
        "  Viele TIME_WAIT   -> normal bei vielen kurzen Verbindungen.\n\n"+
        "PORTSCAN - woran man was erkennt\n"+
        "  Antwort SYN,ACK  -> Port ist OFFEN\n"+
        "  Antwort RST      -> Port ist GESCHLOSSEN\n"+
        "  keine Antwort    -> GEFILTERT, eine Firewall verwirft still",
      codeLang:'TCP-Flags',
      tip:'Die Unterscheidung der drei Portscan-Antworten ist eine dankbare Prüfungsfrage, weil sie Technik und Sicherheit verbindet. Ein RST beweist, dass der Rechner existiert, aber auf diesem Port nichts lauscht. Gar keine Antwort ist die stillste Firewall-Einstellung: Der Angreifer weiß nicht einmal, ob es das Ziel überhaupt gibt. Deshalb verwirft man in der Voreinstellung, statt abzulehnen.',
      quiz:[
        {q:'Warum braucht der geordnete Verbindungsabbau vier Pakete?', options:['Weil TCP unzuverlässig ist','Weil TCP vollduplex ist und jede Richtung getrennt geschlossen wird','Weil ein Paket verloren gehen könnte'], correct:1, explain:'Nach dem ersten FIN darf die Gegenseite noch weitersenden — das ist der halb geschlossene Zustand.'},
        {q:'Was unterscheidet RST von FIN?', options:['RST ist der sofortige Abbruch, FIN das geordnete Ende','RST ist schneller, sonst gleich','FIN wird nur von Servern gesendet'], correct:0, explain:'Bei RST gehen Daten unterwegs verloren — man bekommt es auch bei einem geschlossenen Port.'},
        {q:'Ein Server zeigt hunderte Verbindungen im Zustand CLOSE_WAIT. Was bedeutet das?', options:['Normale Nachlaufzeit','Die Anwendung schließt ihre Sockets nicht — ein Programmfehler','Ein Angriff läuft'], correct:1, explain:'Viele TIME_WAIT wären dagegen normal bei vielen kurzen Verbindungen.'}
      ]
    },
    {
      id:'m40-l3', title:'Quittung, Fenster und der SYN-Flood', minutes:9,
      body:
        '<p>TCP verspricht, dass alles vollständig und in der richtigen Reihenfolge ankommt. Drei Mechanismen sorgen dafür.</p>'+
        '<p><strong>Quittung und Neuübertragung.</strong> Für jedes gesendete Segment erwartet der Sender eine Bestätigung. Bleibt sie aus, läuft ein Zeitgeber ab und das Segment wird <strong>erneut gesendet</strong>. Der Empfänger bestätigt dabei <em>kumulativ</em>: Eine Bestätigung über Byte 5000 heißt, dass alles davor angekommen ist. Fehlt mittendrin ein Segment, wiederholt der Empfänger die alte Bestätigung &#8211; drei gleiche Bestätigungen hintereinander sind für den Sender das Signal, sofort erneut zu senden, ohne den Zeitgeber abzuwarten.</p>'+
        '<p><strong>Das Fenster (Flusskontrolle).</strong> Im TCP-Kopf steht ein Feld <em>Window Size</em>: So viele Bytes darf der Sender noch unterwegs haben, bevor er auf Bestätigungen warten muss. Der <em>Empfänger</em> gibt diesen Wert vor und schützt damit sich selbst &#8211; ein langsamer Rechner wird nicht überflutet. Meldet er Fenstergröße null, muss der Sender pausieren.</p>'+
        '<p><strong>Überlastkontrolle.</strong> Das Fenster schützt den Empfänger, nicht das Netz dazwischen. Deshalb führt der Sender zusätzlich ein eigenes Staufenster: Es beginnt klein, wächst bei Erfolg und wird bei Paketverlust drastisch verkleinert. Verlust gilt in TCP als Zeichen für Überlastung. Das ist der Grund, warum eine einzelne Übertragung auf einer frischen Verbindung erst langsam anläuft und dann schneller wird.</p>'+
        '<p><strong>Die MSS</strong> (Maximum Segment Size) ist die größte Nutzlast eines Segments. Sie ergibt sich aus der MTU abzüglich der Köpfe: bei Ethernet <code>1500 &minus; 20 (IP) &minus; 20 (TCP) = 1460 Byte</code>. Beide Seiten teilen ihre MSS im Handschlag mit; es gilt die kleinere.</p>'+
        '<p><strong>Und die Kehrseite: der SYN-Flood.</strong> Der Server muss sich nach dem ersten SYN den halboffenen Verbindungsversuch merken &#8211; er reserviert Speicher und wartet auf das dritte Paket. Ein Angreifer sendet massenhaft SYN-Pakete mit gefälschter Absenderadresse und schickt das dritte Paket nie. Die Warteschlange läuft voll, echte Verbindungen werden abgewiesen. Gegenmittel sind <strong>SYN-Cookies</strong> (der Server merkt sich nichts, sondern kodiert den Zustand in die eigene Sequenznummer), kürzere Zeitgeber und Begrenzungen je Quelladresse.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="Sendefenster mit bestaetigten, unterwegs befindlichen und gesperrten Bytes">'+
        '<text class="s-hd" x="20" y="24">Der Bytestrom aus Sicht des Senders</text>'+
        '<rect class="s-ok" x="20" y="36" width="130" height="38" rx="3"/>'+
        '<text class="s-lbl" x="85" y="60" text-anchor="middle">best&#228;tigt</text>'+
        '<rect class="s-strong" x="150" y="36" width="150" height="38" rx="3"/>'+
        '<text class="s-lbl" x="225" y="60" text-anchor="middle">unterwegs</text>'+
        '<rect class="s-accent" x="300" y="36" width="130" height="38" rx="3"/>'+
        '<text class="s-lbl" x="365" y="60" text-anchor="middle">darf noch raus</text>'+
        '<rect class="s-box" x="430" y="36" width="110" height="38" rx="3"/>'+
        '<text class="s-lbl" x="485" y="60" text-anchor="middle">gesperrt</text>'+
        '<line class="s-brace" x1="150" y1="84" x2="430" y2="84"/>'+
        '<line class="s-line" x1="150" y1="84" x2="150" y2="78"/>'+
        '<line class="s-line" x1="430" y1="84" x2="430" y2="78"/>'+
        '<text class="s-lbl" x="290" y="100" text-anchor="middle">Fenster &#8211; so viel darf gleichzeitig unbest&#228;tigt sein</text>'+
        '<line class="s-arrow" x1="140" y1="116" x2="196" y2="116" marker-end="url(#tcp3)"/>'+
        '<text class="s-lbl" x="204" y="120">Trifft eine Best&#228;tigung ein, wandert das Fenster nach rechts.</text>'+
        '<rect class="s-box" x="20" y="142" width="520" height="94" rx="4"/>'+
        '<text class="s-hd" x="34" y="164">SYN-Flood</text>'+
        '<text class="s-lbl" x="34" y="184">Angreifer sendet massenhaft SYN mit gef&#228;lschter Absenderadresse</text>'+
        '<text class="s-lbl" x="34" y="202">und schickt das dritte Paket nie &#8211; die Warteschlange des Servers l&#228;uft voll.</text>'+
        '<text class="s-lbl" x="34" y="224">Gegenmittel: SYN-Cookies, k&#252;rzere Zeitgeber, Grenzen je Quelladresse.</text>'+
        '<defs><marker id="tcp3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Das Fenster begrenzt, wie viel gleichzeitig unbestätigt unterwegs sein darf. Genau diesen Merkzustand des Servers greift der SYN-Flood an.</figcaption></figure>',
      code:
        "MSS BERECHNEN\n"+
        "  MTU Ethernet            1.500 Byte\n"+
        "  - IP-Kopf                  20 Byte\n"+
        "  - TCP-Kopf                 20 Byte\n"+
        "  ---------------------------------\n"+
        "  MSS                     1.460 Byte\n\n"+
        "  Ueber VPN kommt der Tunnelkopf dazu, dann sinkt die MSS\n"+
        "  entsprechend - typische Ursache, wenn kleine Seiten laden\n"+
        "  und grosse haengenbleiben.\n\n"+
        "WIE VIELE SEGMENTE FUER EINE DATEI?\n"+
        "  1 MB Datei / 1.460 Byte = 685,0  ->  686 Segmente\n\n"+
        "KUMULATIVE BESTAETIGUNG - ein Beispiel\n"+
        "  Gesendet:  Seg1 (1-500)  Seg2 (501-1000)  Seg3 (1001-1500)\n"+
        "  Seg2 geht verloren.\n\n"+
        "  Empfaenger bestaetigt:\n"+
        "     nach Seg1   ack=501\n"+
        "     nach Seg3   ack=501   <- WIEDER 501, Luecke bei 501\n"+
        "     nach Seg3   ack=501\n"+
        "     nach Seg3   ack=501\n\n"+
        "  Drei gleiche Bestaetigungen -> Sender wiederholt Seg2\n"+
        "  sofort, ohne auf den Zeitgeber zu warten.\n\n"+
        "WARUM EINE UEBERTRAGUNG LANGSAM ANLAEUFT\n"+
        "  Das Staufenster beginnt klein und verdoppelt sich je\n"+
        "  Bestaetigungsrunde. Bei Verlust wird es stark verkleinert.\n"+
        "  Deshalb erreicht ein kurzer Download nie die volle Rate.",
      codeLang:'Zuverlässigkeit',
      tip:'Wenn eine Aufgabe fragt, warum eine Leitung ihre Nennrate nicht erreicht, erwartet die Prüfung mehrere Gründe. Der Protokoll-Overhead ist der offensichtliche. Die beiden, die Punkte bringen, sind die anderen: das Fenster begrenzt die Menge unbestätigter Daten, und die Überlastkontrolle lässt jede Übertragung langsam anlaufen. Bei kurzen Übertragungen erreicht TCP die Nennrate deshalb nie.',
      quiz:[
        {q:'Wer gibt die Fenstergröße vor?', options:['Der Sender','Der Empfänger','Der Router dazwischen'], correct:1, explain:'Er schützt damit sich selbst vor Überflutung — das ist die Flusskontrolle.'},
        {q:'Wie groß ist die MSS bei einer MTU von 1500 Byte?', options:['1500 Byte','1480 Byte','1460 Byte'], correct:2, explain:'1500 minus 20 Byte IP-Kopf minus 20 Byte TCP-Kopf.'},
        {q:'Was macht ein SYN-Flood mit dem Server?', options:['Er verschlüsselt dessen Daten','Er füllt die Warteschlange halboffener Verbindungen','Er überlastet die Festplatte'], correct:1, explain:'Wirksamstes Gegenmittel sind SYN-Cookies — der Server merkt sich dann nichts mehr.'}
      ]
    }
  ]
});
