MODULES.push({
  id:'m38', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Systemarchitekturen & Gerätewahl', relevanz:'hoch',
  lessons:[
    {
      id:'m38-l1', title:'Serverbauformen und Rechenzentrum', minutes:8,
      body:
        '<p>Server gibt es in drei Bauformen, und die Wahl ist eine typische Begründungsaufgabe:</p>'+
        '<table class="lesson-table"><tr><th>Bauform</th><th>Merkmal</th><th>Sinnvoll bei</th></tr>'+
        '<tr><td><strong>Tower</strong></td><td>wie ein großer PC, leise, kein Schrank nötig</td><td>ein bis zwei Server, kein Serverraum</td></tr>'+
        '<tr><td><strong>Rack</strong></td><td>19-Zoll-Einschub, in <strong>Höheneinheiten</strong> gemessen</td><td>Standardfall ab wenigen Servern</td></tr>'+
        '<tr><td><strong>Blade</strong></td><td>Einschübe teilen sich Gehäuse, Netzteile und Kühlung</td><td>hohe Dichte, viele gleichartige Server</td></tr></table>'+
        '<p>Eine <strong>Höheneinheit</strong> (HE oder U) misst <strong>44,45 mm</strong>; ein üblicher Schrank fasst 42 HE. Die Rechnung „Wie viele Server passen in den Schrank?" gehört zu den einfachsten Punkten der Prüfung — vergiss dabei nicht, Platz für Switches, Patchfelder und die USV abzuziehen.</p>'+
        '<p><strong>Der Serverraum</strong> braucht mehr als Strom und Netz. Die Punkte, die in Aufgaben zur Einrichtung erwartet werden:</p>'+
        '<ul><li><strong>Kühlung</strong> — Serverabwärme muss abgeführt werden; die Faustregel lautet, dass die Klimaanlage etwa die elektrische Leistung der Server als Kühlleistung erbringen muss.</li>'+
        '<li><strong>Kalt- und Warmgang</strong> — Racks werden so ausgerichtet, dass alle Fronten sich gegenüberstehen, damit warme und kalte Luft sich nicht vermischen.</li>'+
        '<li><strong>USV</strong> — überbrückt kurze Ausfälle und fährt bei langen kontrolliert herunter.</li>'+
        '<li><strong>Brandschutz</strong> — Brandmeldeanlage und eine Löschanlage, die Elektronik nicht zerstört.</li>'+
        '<li><strong>Zutrittskontrolle und Protokollierung</strong> — der Serverraum ist der sensibelste Raum des Unternehmens.</li>'+
        '<li><strong>Redundanz</strong> — zwei Netzteile je Server an <em>zwei getrennten</em> Stromkreisen.</li></ul>'+
        '<p><strong>Das N+1-Prinzip</strong> bedeutet: Es wird eine Einheit mehr vorgehalten, als für den Betrieb nötig ist. Bei drei benötigten Klimageräten werden vier installiert, sodass eines ausfallen oder gewartet werden kann, ohne dass der Betrieb leidet. Dasselbe Prinzip gilt für Netzteile, Lüfter und Netzwerkpfade.</p>',
      code:
        "RACK-PLANUNG - eine typische Rechenaufgabe\n\n"+
        "  Gegeben: Schrank mit 42 HE\n"+
        "           6 Server zu je 2 HE\n"+
        "           2 Switches zu je 1 HE\n"+
        "           2 Patchfelder zu je 1 HE\n"+
        "           1 USV mit 3 HE\n\n"+
        "  Belegt: 6*2 + 2*1 + 2*1 + 3 = 12 + 2 + 2 + 3 = 19 HE\n"+
        "  Frei:   42 - 19 = 23 HE\n\n"+
        "  Aber: Zwischen Geraeten Luft lassen und Reserve fuer\n"+
        "  Erweiterung einplanen. Ein Schrank wird nie ganz gefuellt.\n\n"+
        "KUEHLLAST ABSCHAETZEN\n"+
        "  6 Server a 400 W   = 2.400 W\n"+
        "  Netzwerktechnik    =   200 W\n"+
        "  USV-Verluste       =   150 W\n"+
        "  ------------------------------\n"+
        "  Summe              = 2.750 W  ->  rund 2,75 kW Kuehlleistung\n\n"+
        "  Faustregel: Was an elektrischer Leistung hineingeht,\n"+
        "  kommt als Waerme wieder heraus.",
      codeLang:'Rechenzentrum',
      tip:'Bei der Frage nach der Einrichtung eines Serverraums reicht „Klimaanlage und USV" nicht für die volle Punktzahl. Die Prüfung erwartet mehrere Ebenen: baulich mit Brandschutz und Zutrittskontrolle, technisch mit Kühlung, USV und Redundanz, organisatorisch mit Zutrittsprotokoll und Wartungsplan. Nenne bewusst aus jeder Ebene etwas — dieselbe Systematik wie bei den TOM.',
      quiz:[
        {q:'Wie hoch ist eine Höheneinheit im 19-Zoll-Rack?', options:['25,4 mm','44,45 mm','100 mm'], correct:1, explain:'Ein üblicher Schrank fasst 42 HE, also gut 1,85 Meter nutzbare Höhe.'},
        {q:'Was besagt das N+1-Prinzip?', options:['Jeder Server bekommt einen zweiten Prozessor','Es wird eine Einheit mehr vorgehalten, als betrieblich nötig ist','Es wird jährlich ein Server ergänzt'], correct:1, explain:'So kann eine Einheit ausfallen oder gewartet werden, ohne den Betrieb zu stören.'},
        {q:'Wozu dient die Trennung in Kalt- und Warmgang?', options:['Zur besseren Verkabelung','Damit warme Abluft sich nicht mit der Zuluft vermischt','Zur Brandvermeidung'], correct:1, explain:'Dafür stehen sich die Rackfronten jeweils gegenüber.'}
      ]
    },
    {
      id:'m38-l2', title:'Skalierung, Lastverteilung und Cluster', minutes:8,
      body:
        '<p>Wenn ein System an seine Grenze kommt, gibt es zwei Wege — und die Unterscheidung wird direkt abgefragt.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Vertikal (Scale-up)</th><th>Horizontal (Scale-out)</th></tr>'+
        '<tr><td>Vorgehen</td><td>eine Maschine stärker machen</td><td>mehr Maschinen daneben stellen</td></tr>'+
        '<tr><td>Beispiel</td><td>mehr RAM, schnellere CPU</td><td>ein zweiter, dritter Webserver</td></tr>'+
        '<tr><td>Grenze</td><td>irgendwann technisch erschöpft</td><td>praktisch unbegrenzt</td></tr>'+
        '<tr><td>Ausfallsicherheit</td><td>keine — ein Gerät, ein Risiko</td><td>hoch, die anderen übernehmen</td></tr>'+
        '<tr><td>Aufwand</td><td>gering, oft ohne Umbau</td><td>Anwendung muss verteilbar sein</td></tr>'+
        '<tr><td>Ausfallzeit beim Aufrüsten</td><td>ja, Maschine muss herunter</td><td>nein, im laufenden Betrieb</td></tr></table>'+
        '<p><strong>Der Satz, der die Frage beantwortet:</strong> Vertikale Skalierung ist einfacher, horizontale ist besser. Denn nur die horizontale erhöht zugleich die Verfügbarkeit — beim Scale-up bleibt der einzelne Server ein <strong>Single Point of Failure</strong>.</p>'+
        '<p>Damit mehrere Server zusammenwirken, braucht es einen <strong>Load Balancer</strong>, der die Anfragen verteilt. Verfahren sind Round Robin, die geringste Anzahl aktiver Verbindungen oder eine Gewichtung nach Leistungsfähigkeit. Wichtig ist die <strong>Sitzungspersistenz</strong>: Ein angemeldeter Benutzer muss entweder beim selben Server bleiben oder die Sitzung muss zentral abgelegt sein — sonst ist er nach dem nächsten Klick abgemeldet. Das ist die klassische Stolperfalle beim Umstieg auf mehrere Server.</p>'+
        '<p>Ein <strong>Cluster</strong> ist ein Verbund, der nach außen wie ein System wirkt. Zwei Bauarten: Beim <strong>Aktiv-Passiv</strong>-Cluster wartet ein Knoten im Standby und übernimmt beim Ausfall (<strong>Failover</strong>). Beim <strong>Aktiv-Aktiv</strong>-Cluster arbeiten alle Knoten und teilen sich die Last — das nutzt die Hardware besser, verlangt aber eine Anwendung, die parallel laufen kann.</p>',
      code:
        "WANN WELCHE SKALIERUNG? - Begruendungen fuer die Pruefung\n\n"+
        "  Datenbankserver stoesst an die RAM-Grenze,\n"+
        "  Wartungsfenster am Wochenende moeglich\n"+
        "     -> vertikal. Eine Datenbank laesst sich nicht ohne\n"+
        "        Weiteres auf mehrere Knoten verteilen.\n\n"+
        "  Webshop, Lastspitzen im Weihnachtsgeschaeft,\n"+
        "  Ausfall kostet Umsatz\n"+
        "     -> horizontal. Zusaetzliche Server lassen sich zur\n"+
        "        Spitze zuschalten und danach wieder abschalten,\n"+
        "        und ein Ausfall nimmt nur einen Knoten heraus.\n\n"+
        "VERFUEGBARKEIT DURCH REDUNDANZ\n\n"+
        "  Ein Server mit 99 % Verfuegbarkeit faellt\n"+
        "  rund 3,65 Tage im Jahr aus.\n\n"+
        "  Zwei unabhaengige Server, von denen einer genuegt:\n"+
        "     Ausfall nur, wenn BEIDE ausfallen\n"+
        "     0,01 * 0,01 = 0,0001  ->  99,99 %\n"+
        "     nur noch rund 53 Minuten im Jahr.\n\n"+
        "  Voraussetzung: wirklich unabhaengig - eigener Stromkreis,\n"+
        "  eigener Switch, moeglichst eigener Brandabschnitt.",
      codeLang:'Skalierung',
      tip:'Die Multiplikation der Ausfallwahrscheinlichkeiten ist eine dankbare Rechnung, weil sie mit einer Zeile beeindruckende Zahlen liefert. Achte aber auf die Voraussetzung, die in der Begründung genannt werden sollte: Die Rechnung gilt nur bei unabhängigen Ausfällen. Hängen beide Server am selben Stromkreis oder Switch, nützt die Redundanz nichts — dann fällt der gemeinsame Teil aus und nimmt beide mit.',
      quiz:[
        {q:'Was bedeutet horizontale Skalierung?', options:['Eine Maschine wird leistungsfähiger gemacht','Es werden weitere Maschinen danebengestellt','Die Festplatte wird vergrößert'], correct:1, explain:'Sie erhöht zugleich die Verfügbarkeit, weil kein einzelnes Gerät allein trägt.'},
        {q:'Was passiert ohne Sitzungspersistenz hinter einem Load Balancer?', options:['Die Server werden langsamer','Angemeldete Benutzer verlieren beim Serverwechsel ihre Sitzung','Der Load Balancer fällt aus'], correct:1, explain:'Abhilfe: gleicher Server je Benutzer oder eine zentral abgelegte Sitzung.'},
        {q:'Zwei unabhängige Server mit je 99 % Verfügbarkeit — wie hoch ist die Verfügbarkeit des Verbunds, wenn einer genügt?', options:['99 %','99,5 %','99,99 %'], correct:2, explain:'Beide müssen gleichzeitig ausfallen: 0,01 mal 0,01 ergibt 0,0001.'}
      ]
    },
    {
      id:'m38-l3', title:'Arbeitsplatzmodelle: Fat Client, Thin Client und VDI', minutes:8,
      body:
        '<p>Nicht jeder Arbeitsplatz braucht einen vollwertigen PC. Die drei Modelle und ihre Abwägung sind eine wiederkehrende Aufgabe zum <em>Einrichten eines IT-gestützten Arbeitsplatzes</em> — also dem Kernthema der AP1.</p>'+
        '<p>Dahinter steht ein Gedanke, der weit über die Gerätewahl hinausreicht: die <strong>Drei-Schichten-Architektur</strong>. Jede Anwendung lässt sich in drei Schichten zerlegen — die <strong>Präsentationsschicht</strong> (was der Benutzer sieht), die <strong>Logikschicht</strong> (die fachlichen Regeln) und die <strong>Datenhaltungsschicht</strong> (die Datenbank). Die Arbeitsplatzmodelle unterscheiden sich nur darin, <em>wo</em> diese Schichten laufen: Beim Fat Client liegen Präsentation und oft auch Logik lokal, beim Thin Client bleibt vor Ort nur die Darstellung, und bei einer Webanwendung läuft die Präsentation im Browser, während Logik und Daten auf dem Server bleiben.</p>'+
        '<p>Der Sinn der Trennung ist nicht Ordnung, sondern <strong>Austauschbarkeit</strong>: Eine neue Oberfläche lässt sich ergänzen, ohne die Fachlogik anzufassen, und die Datenbank lässt sich wechseln, ohne die Oberfläche neu zu schreiben. Das ist dieselbe Begründung wie bei loser Kopplung im Klassenentwurf, nur eine Ebene höher.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Fat Client</th><th>Thin Client</th><th>VDI</th></tr>'+
        '<tr><td>Rechenleistung</td><td>lokal</td><td>auf dem Server</td><td>in der virtuellen Maschine</td></tr>'+
        '<tr><td>Anschaffung</td><td>hoch je Gerät</td><td>niedrig je Gerät</td><td>niedrig je Gerät, hoch zentral</td></tr>'+
        '<tr><td>Wartung</td><td>je Gerät einzeln</td><td>zentral</td><td>zentral, je Benutzer eigenes Abbild</td></tr>'+
        '<tr><td>Offline nutzbar</td><td>ja</td><td>nein</td><td>nein</td></tr>'+
        '<tr><td>Datenhaltung</td><td>lokal — Diebstahlrisiko</td><td>zentral</td><td>zentral</td></tr>'+
        '<tr><td>Lebensdauer</td><td>3 bis 5 Jahre</td><td>7 bis 10 Jahre</td><td>7 bis 10 Jahre</td></tr></table>'+
        '<p>Ein <strong>Thin Client</strong> ist ein sparsames Kleingerät, das im Wesentlichen Bildschirminhalte darstellt und Eingaben weiterreicht. Die Anwendungen laufen auf einem <strong>Terminalserver</strong>, auf dem sich alle Benutzer Betriebssystem und Programme teilen.</p>'+
        '<p><strong>VDI</strong> (Virtual Desktop Infrastructure) geht einen Schritt weiter: Jeder Benutzer bekommt eine <em>eigene</em> virtuelle Maschine. Das kostet mehr Serverressourcen, erlaubt aber individuelle Software und trennt die Benutzer sauber voneinander.</p>'+
        '<p><strong>Die drei Argumente für zentrale Modelle</strong>, die in Begründungen erwartet werden: geringerer Administrationsaufwand, weil nur zentral gepflegt wird; höhere Datensicherheit, weil nichts lokal liegt und ein gestohlenes Gerät keine Daten enthält; längere Lebensdauer der Endgeräte, weil ihre Leistung kaum altert.</p>'+
        '<p><strong>Die Gegenargumente</strong>: Ohne Netz geht gar nichts, der Server ist ein Single Point of Failure und muss redundant ausgelegt werden, und rechenintensive Anwendungen wie CAD oder Videoschnitt laufen auf einem geteilten Server schlecht. Genau diese Abwägung will die Prüfung sehen — ein Modell zu nennen, ohne beide Seiten zu wiegen, bringt nur den halben Punkt.</p>',
      code:
        "TCO-VERGLEICH UEBER 5 JAHRE - 30 Arbeitsplaetze\n\n"+
        "  FAT CLIENT\n"+
        "    Geraete   30 x  800 EUR                = 24.000 EUR\n"+
        "    Ersatz nach 4 Jahren, anteilig 1 Jahr  =  6.000 EUR\n"+
        "    Administration 30 x 3 h/Jahr x 5 x 60  = 27.000 EUR\n"+
        "    Strom 30 x 120 W x 2000 h x 5 x 0,30   = 10.800 EUR\n"+
        "    ---------------------------------------------------\n"+
        "    Summe                                    67.800 EUR\n\n"+
        "  THIN CLIENT + TERMINALSERVER\n"+
        "    Geraete   30 x  350 EUR                = 10.500 EUR\n"+
        "    Server (redundant) inkl. Lizenzen      = 28.000 EUR\n"+
        "    Administration 30 x 1 h/Jahr x 5 x 60  =  9.000 EUR\n"+
        "    Strom 30 x  15 W x 2000 h x 5 x 0,30   =  1.350 EUR\n"+
        "    ---------------------------------------------------\n"+
        "    Summe                                    48.850 EUR\n\n"+
        "  Ersparnis rund 19.000 EUR - der groesste Posten ist\n"+
        "  nicht die Hardware, sondern die Administration.\n\n"+
        "  ABER: Ohne Netz steht der Betrieb. Deshalb gehoert in\n"+
        "  die Rechnung auch ein redundanter Server und eine\n"+
        "  belastbare Netzanbindung.",
      codeLang:'Arbeitsplatzmodelle',
      tip:'Der TCO-Vergleich zeigt, was die Prüfung sehen will: Die Anschaffung ist selten der entscheidende Posten. Administration und Strom über fünf Jahre übersteigen den Gerätepreis deutlich. Wer bei einer Wirtschaftlichkeitsaufgabe nur die Kaufpreise gegenüberstellt, rechnet an der Sache vorbei — nenne immer auch Betriebs-, Wartungs- und Energiekosten.',
      quiz:[
        {q:'Was unterscheidet VDI vom klassischen Terminalserver?', options:['VDI läuft ohne Netzwerk','Bei VDI bekommt jeder Benutzer eine eigene virtuelle Maschine','VDI braucht keine Server'], correct:1, explain:'Beim Terminalserver teilen sich alle Benutzer ein Betriebssystem.'},
        {q:'Welcher Vorteil spricht für Thin Clients?', options:['Sie funktionieren auch ohne Netz','Zentrale Wartung und keine lokalen Daten','Sie sind für CAD besonders geeignet'], correct:1, explain:'Ein gestohlenes Gerät enthält keine Unternehmensdaten.'},
        {q:'Welcher Kostenposten überwiegt in einem TCO-Vergleich über fünf Jahre meist?', options:['Der Anschaffungspreis der Geräte','Administration und Betrieb','Die Verpackung'], correct:1, explain:'Deshalb ist eine reine Kaufpreisgegenüberstellung keine Wirtschaftlichkeitsrechnung.'}
      ]
    },
    {
      id:'m38-l4', title:'Embedded-Systeme, IoT und Peripherie', minutes:8,
      body:
        '<p>Nicht jeder Rechner sieht aus wie einer. <strong>Eingebettete Systeme</strong> stecken in Maschinen, Fahrzeugen, Messgeräten und Haustechnik — sie erfüllen dort <em>eine</em> festgelegte Aufgabe.</p>'+
        '<p><strong>Mikrocontroller gegen Mikroprozessor</strong> — die Abgrenzung wird gern geprüft: Ein <strong>Mikroprozessor</strong> ist nur die CPU und braucht Speicher und Peripherie als eigene Bausteine. Ein <strong>Mikrocontroller</strong> vereint CPU, Speicher und Schnittstellen auf <em>einem</em> Chip. Er ist langsamer und kleiner, dafür billig, sparsam und sofort einsatzbereit — deshalb sitzt er in der Waschmaschine, nicht im Notebook.</p>'+
        '<p><strong>Echtzeitfähigkeit</strong> ist der zweite Kernbegriff und wird oft missverstanden: Echtzeit bedeutet <em>nicht</em> besonders schnell, sondern <strong>garantiert rechtzeitig</strong>. Bei <strong>harter Echtzeit</strong> ist eine Überschreitung der Frist ein Fehler mit möglicherweise gefährlichen Folgen — ein Airbag muss innerhalb von Millisekunden auslösen, nicht im Mittel schnell. Bei <strong>weicher Echtzeit</strong> mindert eine Überschreitung nur die Qualität, etwa ein Ruckler im Videostream.</p>'+
        '<p><strong>Der typische IoT-Aufbau</strong>: <strong>Sensoren</strong> messen (Temperatur, Druck, Bewegung), der Mikrocontroller verarbeitet, <strong>Aktoren</strong> wirken zurück (Ventil, Motor, Relais). Das ist das EVA-Prinzip in der Fertigung. Daten gehen häufig an ein <strong>Gateway</strong>, das sie bündelt und weiterleitet.</p>'+
        '<p><strong>Edge Computing</strong> heißt, dass ein Teil der Auswertung schon vor Ort passiert statt in der Cloud. Die Begründung dafür ist dreifach: geringere Latenz, weniger Datenübertragung und Weiterbetrieb bei gestörter Verbindung. Für eine Maschinensteuerung ist das keine Optimierung, sondern Voraussetzung.</p>'+
        '<p><strong>Peripherie und Schnittstellen</strong> unterscheidet man nach Richtung: <strong>Eingabegeräte</strong> (Tastatur, Maus, Scanner, Sensor, Kartenleser), <strong>Ausgabegeräte</strong> (Monitor, Drucker, Aktor) und <strong>kombinierte</strong> Geräte (Touchscreen, Netzwerkkarte, Multifunktionsgerät). Dass Standards wie USB, DIN-Normen und ISO-Normen eingehalten werden, ist kein Selbstzweck: Nur so lassen sich Geräte verschiedener Hersteller kombinieren und später einzeln ersetzen, ohne das ganze System zu tauschen.</p>',
      code:
        "IoT-KETTE IN DER FERTIGUNG\n\n"+
        "  Sensor        Temperaturfuehler an der Presse\n"+
        "     |          misst alle 100 ms\n"+
        "     v\n"+
        "  Mikrocontroller\n"+
        "     |          prueft Grenzwert, entscheidet vor Ort\n"+
        "     |          -> Edge Computing: keine Cloud noetig\n"+
        "     +--> Aktor  schaltet Kuehlung zu   (harte Echtzeit)\n"+
        "     |\n"+
        "     v\n"+
        "  Gateway ---> Netzwerk ---> Server / Cloud\n"+
        "                              Auswertung, Trends,\n"+
        "                              vorausschauende Wartung\n\n"+
        "WARUM NICHT ALLES IN DIE CLOUD?\n"+
        "  1. Latenz     - der Weg zur Cloud dauert zu lang fuer\n"+
        "                  eine Sicherheitsabschaltung\n"+
        "  2. Datenmenge - 10 Sensoren x 10 Messungen/s x 24 h\n"+
        "                  = 8,64 Mio Werte pro Tag je Maschine\n"+
        "  3. Ausfall    - bei gestoerter Leitung muss die\n"+
        "                  Maschine trotzdem sicher weiterlaufen\n\n"+
        "HARTE ODER WEICHE ECHTZEIT?\n"+
        "  Airbag, Notaus, Bremsassistent   -> hart\n"+
        "  Videostream, Anzeigetafel        -> weich",
      codeLang:'Embedded & IoT',
      tip:'Wenn eine Aufgabe nach Vorteilen von Edge Computing fragt, nenne die drei Gründe mit je einer Folge statt nur Stichworten: Latenz, weil eine Sicherheitsabschaltung nicht auf die Cloud warten kann; Datenmenge, weil Rohdaten aus Sensoren die Leitung fluten; Ausfallsicherheit, weil die Maschine bei gestörter Verbindung weiterlaufen muss. Die Begründung bringt die Punkte, nicht der Begriff.',
      quiz:[
        {q:'Was unterscheidet einen Mikrocontroller von einem Mikroprozessor?', options:['Er ist deutlich schneller','Er vereint CPU, Speicher und Schnittstellen auf einem Chip','Er braucht kein Programm'], correct:1, explain:'Dadurch ist er günstig, sparsam und ohne Zusatzbausteine einsatzbereit.'},
        {q:'Was bedeutet harte Echtzeit?', options:['Besonders hohe Rechenleistung','Eine Fristüberschreitung ist ein Fehler mit möglicherweise gefährlichen Folgen','Das System läuft rund um die Uhr'], correct:1, explain:'Bei weicher Echtzeit mindert eine Überschreitung nur die Qualität.'},
        {q:'Welcher Grund spricht für Edge Computing in einer Maschinensteuerung?', options:['Die Cloud ist teurer','Die Latenz zur Cloud ist für eine Sicherheitsabschaltung zu hoch','Edge-Geräte brauchen keinen Strom'], correct:1, explain:'Dazu kommen die reduzierte Datenmenge und der Weiterbetrieb bei gestörter Leitung.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m22', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Übertragungsmedien & Verkabelung', relevanz:'hoch',
  lessons:[
    {
      id:'m22-l1', title:'Twisted-Pair-Kabel: Kategorien und Grenzen', minutes:9,
      body:
        '<p>Das Kupfer-Netzwerkkabel ist ein <strong>Twisted-Pair-Kabel</strong>: vier verdrillte Adernpaare. Die Verdrillung ist kein Zufall, sie hebt eingestreute Störungen gegenseitig auf — deshalb heißt es so.</p>'+
        '<table class="lesson-table"><tr><th>Kategorie</th><th>Frequenz</th><th>Unterstützt</th><th>Länge</th></tr>'+
        '<tr><td>Cat 5e</td><td>100 MHz</td><td>1 Gbit/s</td><td>100 m</td></tr>'+
        '<tr><td>Cat 6</td><td>250 MHz</td><td>1 Gbit/s (10 Gbit/s bis 55 m)</td><td>100 m</td></tr>'+
        '<tr><td>Cat 6a</td><td>500 MHz</td><td>10 Gbit/s</td><td>100 m</td></tr>'+
        '<tr><td>Cat 7</td><td>600 MHz</td><td>10 Gbit/s</td><td>100 m</td></tr>'+
        '<tr><td>Cat 8</td><td>2.000 MHz</td><td>25–40 Gbit/s</td><td>30 m</td></tr></table>'+
        '<p><strong>Die 100-Meter-Regel</strong> ist die meistgeprüfte Zahl des Themas: Eine Ethernet-Strecke über Kupfer darf höchstens <strong>100 m</strong> lang sein — davon 90 m fest verlegtes Installationskabel plus zweimal 5 m Patchkabel. Wer weiter muss, braucht einen Switch als Zwischenstation oder Glasfaser.</p>'+
        '<p><strong>Schirmung</strong> — das Kürzel liest sich als <em>Gesamtschirm/Paarschirm</em>TP:</p>'+
        '<ul><li><strong>U/UTP</strong> – ungeschirmt, günstig, für unkritische Büroumgebungen.</li>'+
        '<li><strong>F/UTP</strong> – Folie als Gesamtschirm.</li>'+
        '<li><strong>S/FTP</strong> – Geflecht außen, Folie um jedes Paar. Die beste Wahl bei starken Störquellen wie Maschinen, Motoren oder Leuchtstofflampen.</li></ul>',
      code:
        "Steckerbelegung RJ45 nach EIA/TIA:\n\n"+
        "  T568B (in Deutschland ueblich)      T568A\n"+
        "   1 weiss-orange                      1 weiss-gruen\n"+
        "   2 orange                            2 gruen\n"+
        "   3 weiss-gruen                       3 weiss-orange\n"+
        "   4 blau                              4 blau\n"+
        "   5 weiss-blau                        5 weiss-blau\n"+
        "   6 gruen                             6 orange\n"+
        "   7 weiss-braun                       7 weiss-braun\n"+
        "   8 braun                             8 braun\n\n"+
        "  Beide Seiten gleich  = Patchkabel (1:1)\n"+
        "  A auf B              = Crossover (heute unnoetig, Auto-MDI-X)\n\n"+
        "Merke: Verlegekabel hat STARRE Adern (Klemmen im Patchfeld),\n"+
        "Patchkabel hat LITZE (flexibel, fuer Steckverbindungen).",
      codeLang:'Verkabelung',
      tip:'Bei „Welches Kabel empfehlen Sie und warum?" gehören immer zwei Angaben in die Antwort: die Kategorie und die Schirmung, jeweils begründet. Also nicht „Cat 6a", sondern „Cat 6a S/FTP, weil 10 Gbit/s über die volle Strecke von 100 Metern gefordert sind und die Leitung durch einen Bereich mit Maschinen führt". Und prüfe immer die Streckenlänge gegen die 100-Meter-Grenze — wenn die Aufgabe 130 Meter nennt, ist das der eigentliche Prüfungspunkt.',
      quiz:[
        {q:'Wie lang darf eine Ethernet-Strecke über Twisted Pair maximal sein?', options:['50 m','100 m','300 m'], correct:1, explain:'90 m Verlegekabel plus zweimal 5 m Patchkabel.'},
        {q:'Welche Kategorie brauchst du für 10 Gbit/s über 100 m?', options:['Cat 5e','Cat 6','Cat 6a'], correct:2, explain:'Cat 6 schafft 10 Gbit/s nur bis etwa 55 m.'},
        {q:'Wie lang darf das fest verlegte Installationskabel höchstens sein?', options:['100 m','90 m','55 m'], correct:1, explain:'Plus zweimal 5 m Patchkabel ergibt das die zulässige Gesamtstrecke von 100 m.'}
      ]
    },
    {
      id:'m22-l2', title:'Glasfaser und die Wahl des Mediums', minutes:9,
      body:
        '<p><strong>Lichtwellenleiter (LWL)</strong> übertragen Licht statt Strom. Daraus folgen alle Vorteile:</p>'+
        '<ul><li><strong>Keine elektromagnetische Störung</strong> – weder ein- noch abstrahlend. Ideal neben Starkstrom und Maschinen.</li>'+
        '<li><strong>Große Reichweite</strong> – Kilometer statt 100 Meter.</li>'+
        '<li><strong>Abhörsicherheit</strong> – ein Abgriff erzeugt Dämpfung und ist messbar.</li>'+
        '<li><strong>Galvanische Trennung</strong> – kein Potenzialausgleich zwischen Gebäuden nötig, kein Blitzschadensweg.</li>'+
        '<li><strong>Hohe Bandbreite</strong> und geringes Gewicht.</li></ul>'+
        '<p>Nachteile: teurere Aktivtechnik (Transceiver), empfindlich gegen enge Biegeradien, Konfektionierung erfordert Spezialwerkzeug und Fachkenntnis.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Multimode (MM)</th><th>Singlemode (SM)</th></tr>'+
        '<tr><td>Kernduchmesser</td><td>50 oder 62,5 µm</td><td>9 µm</td></tr>'+
        '<tr><td>Lichtquelle</td><td>LED oder VCSEL</td><td>Laser</td></tr>'+
        '<tr><td>Reichweite</td><td>bis ca. 550 m</td><td>bis viele Kilometer</td></tr>'+
        '<tr><td>Kosten</td><td>Technik günstiger</td><td>Technik teurer</td></tr>'+
        '<tr><td>Einsatz</td><td>innerhalb eines Gebäudes, Backbone</td><td>zwischen Standorten, WAN</td></tr></table>'+
        '<p>Merkhilfe: <strong>Multi</strong>mode hat den <strong>dicken</strong> Kern und viele Lichtwege, die sich mit der Entfernung gegenseitig verwischen (Modendispersion) — deshalb die kürzere Reichweite.</p>',
      code:
        "Medienwahl - typische Pruefungssituationen:\n\n"+
        "  Arbeitsplatz zum Etagenverteiler, 35 m\n"+
        "     -> Cat 6a U/UTP, Kupfer reicht, guenstig, PoE moeglich\n\n"+
        "  Etagenverteiler zum Serverraum, 180 m, hohe Last\n"+
        "     -> Multimode-LWL (OM4), da ueber 100 m und hohe Bandbreite\n\n"+
        "  Zweites Firmengebaeude, 1,2 km entfernt\n"+
        "     -> Singlemode-LWL, Reichweite und galvanische Trennung\n\n"+
        "  Werkhalle mit Schweissrobotern, 60 m\n"+
        "     -> LWL oder mindestens Cat 6a S/FTP wegen starker EMV-Last\n\n"+
        "  Ueberwachungskamera an der Aussenwand, 45 m, kein Stromanschluss\n"+
        "     -> Cat 6 mit PoE, da Strom und Daten ueber ein Kabel",
      codeLang:'Medienwahl',
      tip:'Drei Stichwörter in der Aufgabenstellung entscheiden die Medienwahl fast immer allein. Eine Entfernung über 100 Meter bedeutet Glasfaser. Störquellen wie Motoren, Schweißgeräte oder Leuchtstofflampen bedeuten Schirmung oder Glasfaser. Und eine Gebäudeverbindung im Freien bedeutet Singlemode, weil dort zusätzlich die galvanische Trennung gegen Blitzschäden zählt. Suche diese Signalwörter, bevor du anfängst zu schreiben.',
      quiz:[
        {q:'Welche Faser nutzt man für 1,5 km zwischen zwei Gebäuden?', options:['Multimode','Singlemode','Cat 7'], correct:1, explain:'Multimode reicht nur etwa 550 m, Kupfer nur 100 m.'},
        {q:'Welcher Vorteil von LWL zählt neben einem Maschinenpark am meisten?', options:['Der niedrige Preis','Die Unempfindlichkeit gegen elektromagnetische Störungen','Das geringe Gewicht'], correct:1, explain:'Licht lässt sich elektromagnetisch nicht stören.'},
        {q:'Welcher LWL-Vorteil zählt bei einer Verbindung zwischen zwei Gebäuden besonders?', options:['Das geringe Gewicht','Die galvanische Trennung — kein Blitzschadensweg','Der Preis'], correct:1, explain:'Zusätzlich zur Reichweite über 100 m und der Störunempfindlichkeit.'}
      ]
    },
    {
      id:'m22-l3', title:'Strukturierte Verkabelung und PoE', minutes:9,
      body:
        '<p>Die <strong>strukturierte Verkabelung</strong> nach EN 50173 trennt das Netz in drei Bereiche — sie ist anwendungsneutral, also unabhängig davon, ob später Telefonie, Ethernet oder Gebäudetechnik darüber läuft:</p>'+
        '<ul><li><strong>Primärbereich</strong> (Geländeverkabelung) – zwischen Gebäuden, fast immer Singlemode-LWL.</li>'+
        '<li><strong>Sekundärbereich</strong> (Steigbereich) – zwischen den Etagenverteilern eines Gebäudes, meist Multimode-LWL.</li>'+
        '<li><strong>Tertiärbereich</strong> (Etagenverkabelung) – vom Etagenverteiler zur Anschlussdose, Kupfer, maximal 90 m.</li></ul>'+
        '<p>Im <strong>Verteilerschrank</strong> enden die Verlegekabel am <strong>Patchfeld</strong>. Von dort wird mit kurzen Patchkabeln flexibel auf die Switch-Ports rangiert. Der Vorteil: Ein Arbeitsplatz lässt sich ohne neue Verlegung einem anderen VLAN oder Switch zuordnen.</p>'+
        '<p><strong>Power over Ethernet (PoE)</strong> überträgt Strom und Daten über dasselbe Kabel — unverzichtbar für Access Points, IP-Kameras und IP-Telefone an Stellen ohne Steckdose.</p>'+
        '<table class="lesson-table"><tr><th>Standard</th><th>Bezeichnung</th><th>Leistung am Endgerät</th></tr>'+
        '<tr><td>802.3af</td><td>PoE</td><td>ca. 12,95 W</td></tr>'+
        '<tr><td>802.3at</td><td>PoE+</td><td>ca. 25,5 W</td></tr>'+
        '<tr><td>802.3bt Typ 3</td><td>PoE++</td><td>ca. 51 W</td></tr>'+
        '<tr><td>802.3bt Typ 4</td><td>PoE++</td><td>ca. 71 W</td></tr></table>'+
        '<p>Beachte: Am Switch-Port wird jeweils mehr eingespeist, ein Teil geht als Leitungsverlust verloren. Wichtig ist außerdem das <strong>PoE-Budget</strong> des Switches — die Summe über alle Ports ist begrenzt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 220" role="img" aria-label="Primaer-, Sekundaer- und Tertiaerbereich der strukturierten Verkabelung"><rect class="s-box" x="20" y="120" width="120" height="76" rx="6"/><text class="s-hd" x="80" y="144" text-anchor="middle">Geb&#228;ude B</text><text class="s-lbl" x="80" y="166" text-anchor="middle">Standortverteiler</text><rect class="s-box" x="200" y="120" width="120" height="76" rx="6"/><text class="s-hd" x="260" y="144" text-anchor="middle">Geb&#228;ude A</text><text class="s-lbl" x="260" y="166" text-anchor="middle">Standortverteiler</text><line class="s-lwl" x1="140" y1="158" x2="200" y2="158"/><text class="s-lbl" x="170" y="150" text-anchor="middle">1</text><rect class="s-accent" x="200" y="62" width="120" height="44" rx="6"/><text class="s-lbl" x="260" y="88" text-anchor="middle">Etagenverteiler</text><line class="s-lwl" x1="260" y1="120" x2="260" y2="106"/><text class="s-lbl" x="272" y="116">2</text><rect class="s-strong" x="380" y="62" width="160" height="44" rx="6"/><text class="s-lbl" x="460" y="88" text-anchor="middle">Anschlussdose &#183; Arbeitsplatz</text><line class="s-cu" x1="320" y1="84" x2="380" y2="84"/><text class="s-lbl" x="350" y="76" text-anchor="middle">3</text><text class="s-lbl" x="20" y="28">1 &#183; Prim&#228;rbereich &#8211; zwischen Geb&#228;uden, Singlemode-LWL</text><text class="s-lbl" x="20" y="44">2 &#183; Sekund&#228;rbereich &#8211; Steigbereich im Geb&#228;ude, meist Multimode-LWL</text><text class="s-lbl" x="320" y="28">3 &#183; Terti&#228;rbereich &#8211; Etage, Kupfer, max. 90 m</text><text class="s-lbl" x="20" y="214">Alle Verlegekabel enden am Patchfeld; von dort wird flexibel auf die Switch-Ports rangiert.</text></svg><figcaption>Die drei Bereiche nach EN 50173. Die Norm ist anwendungsneutral: Sie legt nur fest, wie verkabelt wird, nicht was darueber laeuft.</figcaption></figure>',
      code:
        "PoE-BUDGET PRUEFEN\n\n"+
        "  Switch: 24 Ports, PoE-Budget 370 W\n"+
        "  Geplant: 12 Access Points a 25,5 W (PoE+)\n"+
        "            6 IP-Kameras   a 12,95 W (PoE)\n"+
        "            8 IP-Telefone  a  6,5 W\n\n"+
        "  12 x 25,50 = 306,0 W\n"+
        "   6 x 12,95 =  77,7 W\n"+
        "   8 x  6,50 =  52,0 W\n"+
        "  ---------------------\n"+
        "  Summe      = 435,7 W   >  370 W Budget\n\n"+
        "  Ergebnis: Das Budget reicht NICHT.\n"+
        "  Loesung: Switch mit groesserem PoE-Budget, zweiter PoE-Switch\n"+
        "  oder PoE-Injektoren fuer einzelne Geraete.",
      codeLang:'PoE-Planung',
      tip:'Die PoE-Budget-Aufgabe ist beliebt, weil sie nach einer einfachen Addition aussieht und trotzdem eine Entscheidung verlangt. Rechne die Summe, vergleiche sie mit dem Budget und schreibe dann ausdrücklich hin, ob es reicht — plus einen Lösungsvorschlag, wenn nicht. Die Portzahl allein genügt nie als Prüfung: Ein 24-Port-Switch kann durchaus weniger als 24 Geräte mit voller PoE+-Leistung versorgen.',
      quiz:[
        {q:'Welcher Bereich der strukturierten Verkabelung verbindet Gebäude miteinander?', options:['Tertiärbereich','Sekundärbereich','Primärbereich'], correct:2, explain:'Tertiär ist die Etage, Sekundär der Steigbereich im Gebäude.'},
        {q:'Wozu dient ein Patchfeld?', options:['Zur Stromverteilung','Als fester Endpunkt der Verlegekabel, von dem flexibel auf Switch-Ports rangiert wird','Zur Verstärkung des Signals'], correct:1, explain:'So lässt sich ein Arbeitsplatz ohne Neuverlegung umkonfigurieren.'},
        {q:'Ein Switch hat 24 Ports und 190 W PoE-Budget. Wie viele PoE+-Geräte à 25,5 W sind versorgbar?', options:['24','7','12'], correct:1, explain:'190 / 25,5 = 7,45 — die Portzahl allein sagt nichts über das Budget.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m23', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Virtualisierung & Cloud', relevanz:'hoch',
  lessons:[
    {
      id:'m23-l1', title:'Virtualisierung und Hypervisor-Typen', minutes:9,
      body:
        '<p><strong>Virtualisierung</strong> bedeutet, dass mehrere logische Systeme auf einer physischen Maschine laufen. Der <strong>Hypervisor</strong> teilt die Hardware auf und isoliert die Gäste voneinander.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Typ 1 (Bare Metal)</th><th>Typ 2 (Hosted)</th></tr>'+
        '<tr><td>Läuft auf</td><td>direkt auf der Hardware</td><td>als Programm im Betriebssystem</td></tr>'+
        '<tr><td>Beispiele</td><td>ESXi, Hyper-V (Rolle), Proxmox, KVM</td><td>VirtualBox, VMware Workstation</td></tr>'+
        '<tr><td>Leistung</td><td>hoch, kaum Overhead</td><td>geringer, Wirts-OS dazwischen</td></tr>'+
        '<tr><td>Einsatz</td><td>Rechenzentrum, Produktivbetrieb</td><td>Entwicklung, Test, Schulung</td></tr></table>'+
        '<p><strong>Die Vorteile</strong>, die als Nennaufgabe kommen:</p>'+
        '<ul><li><strong>Konsolidierung</strong> – weniger physische Server, geringere Kosten für Strom, Kühlung, Stellfläche und Wartung.</li>'+
        '<li><strong>Bessere Auslastung</strong> – ein einzelner Server läuft sonst oft bei 10 bis 20 Prozent.</li>'+
        '<li><strong>Isolation</strong> – der Absturz eines Gastes betrifft die anderen nicht.</li>'+
        '<li><strong>Snapshots</strong> – ein Zustand lässt sich sichern und in Sekunden zurückrollen, ideal vor Updates.</li>'+
        '<li><strong>Live-Migration</strong> – eine VM zieht im laufenden Betrieb auf einen anderen Host um, etwa für Wartung.</li>'+
        '<li><strong>Schnelle Bereitstellung</strong> – eine neue VM entsteht aus einer Vorlage in Minuten.</li></ul>'+
        '<p><strong>Nachteile und Risiken:</strong> Der Host wird zum <em>Single Point of Failure</em> — fällt er aus, sind alle Gäste weg. Gegenmittel sind Cluster mit mehreren Hosts und gemeinsamem Speicher. Dazu kommen Lizenzfragen, Overhead und der Bedarf an Spezialwissen.</p>',
      code:
        "KONSOLIDIERUNGSRECHNUNG\n\n"+
        "  Bisher: 8 physische Server, je 180 W, 24/7, 0,30 EUR/kWh\n"+
        "     8 x 180 W x 24 h x 365 = 12.614.400 Wh = 12.614 kWh\n"+
        "     12.614 x 0,30 = 3.784 EUR Stromkosten pro Jahr\n\n"+
        "  Neu: 2 Hosts, je 420 W (staerker, aber nur zwei Geraete)\n"+
        "     2 x 420 W x 24 h x 365 =  7.358.400 Wh =  7.358 kWh\n"+
        "     7.358 x 0,30 = 2.207 EUR pro Jahr\n\n"+
        "  Ersparnis: 1.577 EUR/Jahr allein beim Strom,\n"+
        "  dazu Kuehlung, Stellflaeche, Wartungsvertraege und Hardware.\n\n"+
        "  Snapshot vor einem Update:\n"+
        "     1. Snapshot erstellen   2. Update einspielen\n"+
        "     3a. laeuft -> Snapshot loeschen (sonst waechst der Speicher)\n"+
        "     3b. Fehler -> in Sekunden zurueckrollen",
      codeLang:'Virtualisierung',
      tip:'Ein Snapshot ist kein Backup, und diese Abgrenzung bringt in Begründungsaufgaben Punkte. Der Snapshot liegt auf demselben Speicher wie die VM — geht der Datenspeicher kaputt, ist beides weg. Er ist ein kurzfristiger Rückfallpunkt für geplante Eingriffe, nicht mehr. Erwähne außerdem, dass dauerhaft belassene Snapshots den Speicherbedarf aufblähen und die Leistung bremsen.',
      quiz:[
        {q:'Wodurch unterscheidet sich ein Typ-1- von einem Typ-2-Hypervisor?', options:['Typ 1 läuft direkt auf der Hardware, Typ 2 als Programm im Betriebssystem','Typ 1 ist kostenlos','Typ 2 ist schneller'], correct:0, explain:'Ohne Wirts-Betriebssystem dazwischen hat Typ 1 deutlich weniger Overhead.'},
        {q:'Welches Risiko entsteht durch Konsolidierung?', options:['Höhere Stromkosten','Der Host wird zum Single Point of Failure','Schlechtere Auslastung'], correct:1, explain:'Gegenmittel sind Cluster mit mehreren Hosts und Live-Migration.'},
        {q:'Was ist der wichtigste Nachteil der Servervirtualisierung?', options:['Höherer Stromverbrauch','Der Host wird zum Single Point of Failure','Schlechtere Auslastung'], correct:1, explain:'Gegenmittel sind Cluster mit gemeinsamem Speicher und Live-Migration.'}
      ]
    },
    {
      id:'m23-l2', title:'Container gegen virtuelle Maschine', minutes:8,
      body:
        '<p>Beide isolieren Anwendungen, aber auf verschiedenen Ebenen — und genau darauf zielt die Prüfungsfrage.</p>'+
        '<p>Eine <strong>virtuelle Maschine</strong> bringt ein <strong>vollständiges Gast-Betriebssystem</strong> mit. Sie belegt Gigabytes, startet in Minuten und ist dafür vollständig isoliert. Man kann Linux auf einem Windows-Host betreiben.</p>'+
        '<p>Ein <strong>Container</strong> teilt sich den <strong>Kernel des Hosts</strong> und enthält nur die Anwendung samt ihrer Bibliotheken. Er belegt Megabytes, startet in Sekunden — kann aber nur Systeme mit demselben Kernel ausführen.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Virtuelle Maschine</th><th>Container</th></tr>'+
        '<tr><td>Enthält</td><td>komplettes Gast-OS</td><td>nur App und Bibliotheken</td></tr>'+
        '<tr><td>Größe</td><td>mehrere GB</td><td>wenige bis hundert MB</td></tr>'+
        '<tr><td>Startzeit</td><td>Minuten</td><td>Sekunden</td></tr>'+
        '<tr><td>Isolation</td><td>sehr stark</td><td>schwächer, gemeinsamer Kernel</td></tr>'+
        '<tr><td>Dichte je Host</td><td>Dutzende</td><td>Hunderte</td></tr>'+
        '<tr><td>Typisch für</td><td>verschiedene Betriebssysteme, Altsysteme</td><td>Microservices, CI/CD, Skalierung</td></tr></table>'+
        '<p>Beide Ansätze schließen sich nicht aus: In der Praxis laufen Container sehr häufig <em>innerhalb</em> virtueller Maschinen, weil man so die starke Isolation der VM mit der Flexibilität der Container verbindet.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 230" role="img" aria-label="Aufbau von virtuellen Maschinen und Containern im Vergleich"><text class="s-hd" x="20" y="20">Virtuelle Maschinen</text><rect class="s-strong" x="20" y="30" width="110" height="34" rx="3"/><text class="s-lbl" x="75" y="52" text-anchor="middle">App + Bib.</text><rect class="s-strong" x="140" y="30" width="110" height="34" rx="3"/><text class="s-lbl" x="195" y="52" text-anchor="middle">App + Bib.</text><rect class="s-warn" x="20" y="68" width="110" height="34" rx="3"/><text class="s-lbl" x="75" y="90" text-anchor="middle">Gast-OS</text><rect class="s-warn" x="140" y="68" width="110" height="34" rx="3"/><text class="s-lbl" x="195" y="90" text-anchor="middle">Gast-OS</text><rect class="s-accent" x="20" y="106" width="230" height="32" rx="3"/><text class="s-lbl" x="135" y="127" text-anchor="middle">Hypervisor</text><rect class="s-box" x="20" y="142" width="230" height="32" rx="3"/><text class="s-lbl" x="135" y="163" text-anchor="middle">Hardware</text><text class="s-lbl" x="20" y="196">je VM mehrere GB</text><text class="s-lbl" x="20" y="212">Start in Minuten &#183; starke Isolation</text><text class="s-hd" x="310" y="20">Container</text><rect class="s-strong" x="310" y="30" width="110" height="34" rx="3"/><text class="s-lbl" x="365" y="52" text-anchor="middle">App + Bib.</text><rect class="s-strong" x="430" y="30" width="110" height="34" rx="3"/><text class="s-lbl" x="485" y="52" text-anchor="middle">App + Bib.</text><rect class="s-accent" x="310" y="68" width="230" height="32" rx="3"/><text class="s-lbl" x="425" y="89" text-anchor="middle">Container-Engine</text><rect class="s-warn" x="310" y="104" width="230" height="34" rx="3"/><text class="s-lbl" x="425" y="126" text-anchor="middle">Host-Betriebssystem (gemeinsamer Kernel)</text><rect class="s-box" x="310" y="142" width="230" height="32" rx="3"/><text class="s-lbl" x="425" y="163" text-anchor="middle">Hardware</text><text class="s-lbl" x="310" y="196">je Container wenige MB</text><text class="s-lbl" x="310" y="212">Start in Sekunden &#183; gemeinsamer Kernel</text></svg><figcaption>Der eine Unterschied, aus dem alles folgt: Dem Container fehlt das Gast-Betriebssystem. Die VM virtualisiert die Hardware, der Container das Betriebssystem.</figcaption></figure>',
      code:
        "Aufbau im Vergleich:\n\n"+
        "  VIRTUELLE MASCHINEN          CONTAINER\n"+
        "  +------+ +------+            +------+ +------+\n"+
        "  | App  | | App  |            | App  | | App  |\n"+
        "  | Bib. | | Bib. |            | Bib. | | Bib. |\n"+
        "  |Gast- | |Gast- |            +------+ +------+\n"+
        "  | OS   | | OS   |            | Container-Engine|\n"+
        "  +------+ +------+            +-----------------+\n"+
        "  |   Hypervisor  |            |   Host-OS       |\n"+
        "  +---------------+            +-----------------+\n"+
        "  |   Hardware    |            |   Hardware      |\n"+
        "  +---------------+            +-----------------+\n\n"+
        "  Der entscheidende Unterschied: beim Container fehlt\n"+
        "  das Gast-Betriebssystem - er nutzt den Kernel des Hosts.",
      codeLang:'VM vs. Container',
      tip:'Wenn du in einer Prüfung nur einen Satz zur Abgrenzung schreiben darfst, dann diesen: Die VM virtualisiert die Hardware, der Container virtualisiert das Betriebssystem. Daraus leitet sich alles Weitere ab — Größe, Startzeit, Isolationsgrad und die Einschränkung, dass ein Container nur denselben Kernel wie der Host nutzen kann.',
      quiz:[
        {q:'Was enthält ein Container im Gegensatz zur VM NICHT?', options:['Die Anwendung','Ein eigenes Gast-Betriebssystem','Die benötigten Bibliotheken'], correct:1, explain:'Er nutzt den Kernel des Hosts – daher die geringe Größe und Startzeit.'},
        {q:'Wann ist eine VM die richtige Wahl?', options:['Wenn ein anderes Betriebssystem als das des Hosts benötigt wird','Wenn hunderte Instanzen schnell starten sollen','Wenn wenig Speicher verfügbar ist'], correct:0, explain:'Nur die VM bringt einen eigenen Kernel mit.'},
        {q:'Warum startet ein Container in Sekunden, eine VM in Minuten?', options:['Container sind besser programmiert','Dem Container fehlt das eigene Gast-Betriebssystem','VMs sind absichtlich langsam'], correct:1, explain:'Er nutzt den bereits laufenden Kernel des Hosts.'}
      ]
    },
    {
      id:'m23-l3', title:'Cloud: Servicemodelle, Bereitstellung und Datenschutz', minutes:10,
      body:
        '<p>Die <strong>drei Servicemodelle</strong> unterscheiden sich darin, wo die Verantwortungsgrenze zwischen Anbieter und Kunde verläuft:</p>'+
        '<table class="lesson-table"><tr><th>Modell</th><th>Anbieter stellt</th><th>Du verwaltest</th><th>Beispiel</th></tr>'+
        '<tr><td><strong>IaaS</strong></td><td>Hardware, Virtualisierung, Netz</td><td>Betriebssystem, Middleware, Anwendung, Daten</td><td>virtueller Server</td></tr>'+
        '<tr><td><strong>PaaS</strong></td><td>zusätzlich OS und Laufzeitumgebung</td><td>Anwendung und Daten</td><td>Datenbankdienst, App-Plattform</td></tr>'+
        '<tr><td><strong>SaaS</strong></td><td>alles bis zur fertigen Anwendung</td><td>nur deine Daten und Nutzerkonten</td><td>Webmail, CRM, Office</td></tr></table>'+
        '<p><strong>Bereitstellungsmodelle:</strong> <strong>Public Cloud</strong> (geteilte Infrastruktur eines Anbieters), <strong>Private Cloud</strong> (exklusiv für eine Organisation), <strong>Hybrid Cloud</strong> (Kombination — sensible Daten bleiben im Haus, Lastspitzen gehen nach außen) und <strong>Community Cloud</strong> (gemeinsam von Organisationen mit gleichen Anforderungen).</p>'+
        '<p><strong>Vorteile:</strong> keine Investition in Hardware (Betriebs- statt Investitionskosten), <strong>Skalierbarkeit und Elastizität</strong>, Zugriff von überall, Wartung und Updates beim Anbieter, schnelle Bereitstellung, professionelle Redundanz.</p>'+
        '<p><strong>Nachteile:</strong> <strong>Abhängigkeit vom Anbieter</strong> und Lock-in-Effekt, zwingende Internetverbindung, laufende Kosten statt einmaliger, weniger Kontrolle über die Daten und die schwierigsten Punkte — <strong>Datenschutz und Rechtssicherheit</strong>.</p>'+
        '<p><strong>Datenschutzrechtlich</strong> gilt: Der Cloud-Anbieter ist <strong>Auftragsverarbeiter</strong>, es braucht einen <strong>AVV nach Art. 28 DSGVO</strong>. Der <strong>Serverstandort</strong> ist zu prüfen; bei Übermittlung in Drittländer sind zusätzliche Garantien erforderlich. Verantwortlich bleibt in jedem Fall <em>dein</em> Unternehmen.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="Verantwortungsgrenze bei On-Premises, IaaS, PaaS und SaaS"><text class="s-lbl" x="88" y="20" text-anchor="middle">On-Premises</text><text class="s-lbl" x="212" y="20" text-anchor="middle">IaaS</text><text class="s-lbl" x="336" y="20" text-anchor="middle">PaaS</text><text class="s-lbl" x="460" y="20" text-anchor="middle">SaaS</text><text class="s-lbl" x="12" y="46">Daten</text><rect class="s-cust" x="30" y="30" width="116" height="22" rx="2"/><rect class="s-cust" x="154" y="30" width="116" height="22" rx="2"/><rect class="s-cust" x="278" y="30" width="116" height="22" rx="2"/><rect class="s-cust" x="402" y="30" width="116" height="22" rx="2"/><text class="s-lbl" x="12" y="76">Anwendung</text><rect class="s-cust" x="30" y="60" width="116" height="22" rx="2"/><rect class="s-cust" x="154" y="60" width="116" height="22" rx="2"/><rect class="s-cust" x="278" y="60" width="116" height="22" rx="2"/><rect class="s-prov" x="402" y="60" width="116" height="22" rx="2"/><text class="s-lbl" x="12" y="106">Laufzeit</text><rect class="s-cust" x="30" y="90" width="116" height="22" rx="2"/><rect class="s-cust" x="154" y="90" width="116" height="22" rx="2"/><rect class="s-prov" x="278" y="90" width="116" height="22" rx="2"/><rect class="s-prov" x="402" y="90" width="116" height="22" rx="2"/><text class="s-lbl" x="12" y="136">Betriebssystem</text><rect class="s-cust" x="30" y="120" width="116" height="22" rx="2"/><rect class="s-cust" x="154" y="120" width="116" height="22" rx="2"/><rect class="s-prov" x="278" y="120" width="116" height="22" rx="2"/><rect class="s-prov" x="402" y="120" width="116" height="22" rx="2"/><text class="s-lbl" x="12" y="166">Virtualisierung</text><rect class="s-cust" x="30" y="150" width="116" height="22" rx="2"/><rect class="s-prov" x="154" y="150" width="116" height="22" rx="2"/><rect class="s-prov" x="278" y="150" width="116" height="22" rx="2"/><rect class="s-prov" x="402" y="150" width="116" height="22" rx="2"/><text class="s-lbl" x="12" y="196">Server, Speicher</text><rect class="s-cust" x="30" y="180" width="116" height="22" rx="2"/><rect class="s-prov" x="154" y="180" width="116" height="22" rx="2"/><rect class="s-prov" x="278" y="180" width="116" height="22" rx="2"/><rect class="s-prov" x="402" y="180" width="116" height="22" rx="2"/><rect class="s-cust" x="30" y="218" width="16" height="14" rx="2"/><text class="s-lbl" x="54" y="230">Kunde verwaltet</text><rect class="s-prov" x="190" y="218" width="16" height="14" rx="2"/><text class="s-lbl" x="214" y="230">Anbieter verwaltet</text><text class="s-lbl" x="360" y="230">Die Datenzeile bleibt immer beim Kunden.</text></svg><figcaption>Je weiter nach rechts, desto mehr uebernimmt der Anbieter. Nur die oberste Zeile bleibt in jedem Modell in deiner Verantwortung &#8211; auch datenschutzrechtlich.</figcaption></figure>',
      code:
        "Verantwortungsgrenze - wer kuemmert sich worum?\n\n"+
        "                    On-Premises  IaaS    PaaS    SaaS\n"+
        "  Anwendung            Kunde     Kunde   Kunde   Anbieter\n"+
        "  Daten                Kunde     Kunde   Kunde   Kunde\n"+
        "  Laufzeitumgebung     Kunde     Kunde   Anbiet. Anbieter\n"+
        "  Betriebssystem       Kunde     Kunde   Anbiet. Anbieter\n"+
        "  Virtualisierung      Kunde     Anbiet. Anbiet. Anbieter\n"+
        "  Server / Speicher    Kunde     Anbiet. Anbiet. Anbieter\n"+
        "  Netzwerk / Gebaeude  Kunde     Anbiet. Anbiet. Anbieter\n\n"+
        "  Merke: Die DATEN bleiben in JEDEM Modell in deiner\n"+
        "  Verantwortung - auch bei SaaS.",
      codeLang:'Cloud-Modelle',
      tip:'Die Zeile mit den Daten ist der Punkt, der in Datenschutzaufgaben zählt: Egal welches Modell gewählt wird, dein Unternehmen bleibt Verantwortlicher im Sinne der DSGVO. Der Anbieter ist nur Auftragsverarbeiter und handelt weisungsgebunden. Wer in einer Prüfung schreibt, mit dem Wechsel in die Cloud gehe die Datenschutzverantwortung an den Anbieter über, verliert den Punkt — sie geht nie über.',
      quiz:[
        {q:'Bei welchem Modell verwaltest du das Betriebssystem selbst?', options:['SaaS','PaaS','IaaS'], correct:2, explain:'Bei IaaS bekommst du eine virtuelle Maschine und bist ab dem OS zuständig.'},
        {q:'Wer ist datenschutzrechtlich verantwortlich, wenn ein Unternehmen SaaS nutzt?', options:['Der Cloud-Anbieter','Das nutzende Unternehmen – der Anbieter ist Auftragsverarbeiter','Niemand, das regelt die Cloud'], correct:1, explain:'Deshalb ist ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Pflicht.'},
        {q:'Bei welchem Cloud-Modell ist der Kunde für Betriebssystem-Updates zuständig?', options:['SaaS','IaaS','PaaS'], correct:1, explain:'Bei PaaS und SaaS übernimmt das der Anbieter.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m24', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Software, Lizenzen & Inbetriebnahme', relevanz:'mittel',
  lessons:[
    {
      id:'m24-l1', title:'Lizenzmodelle im Unternehmen', minutes:9,
      body:
        '<p>Software wird nicht gekauft, sondern <strong>lizenziert</strong> — man erwirbt ein Nutzungsrecht. Die Modelle, die in der AP1 unterschieden werden:</p>'+
        '<table class="lesson-table"><tr><th>Modell</th><th>Merkmal</th></tr>'+
        '<tr><td><strong>OEM</strong></td><td>fest an <em>ein</em> Gerät gebunden, geht mit ihm unter, günstig, kein Support vom Hersteller</td></tr>'+
        '<tr><td><strong>Retail / Box</strong></td><td>übertragbar auf ein anderes Gerät, teurer</td></tr>'+
        '<tr><td><strong>Volumenlizenz</strong></td><td>ab einer Mindestmenge, zentral verwaltbar, ein Key für viele Installationen</td></tr>'+
        '<tr><td><strong>Subscription</strong></td><td>Miete je Monat oder Jahr, Updates inklusive, endet mit der Zahlung</td></tr>'+
        '<tr><td><strong>CAL</strong></td><td>Zugriffslizenz auf einen Server, als <em>User-CAL</em> (je Person) oder <em>Device-CAL</em> (je Gerät)</td></tr>'+
        '<tr><td><strong>Named User</strong></td><td>fest einer benannten Person zugeordnet</td></tr>'+
        '<tr><td><strong>Concurrent</strong></td><td>begrenzt die Zahl <em>gleichzeitiger</em> Nutzer, unabhängig von der Gesamtzahl</td></tr></table>'+
        '<p><strong>Die Rechenaufgabe dazu:</strong> Bei 40 Mitarbeitern im Schichtbetrieb, von denen nie mehr als 15 gleichzeitig arbeiten, brauchst du 15 Concurrent-Lizenzen, aber 40 Named-User-Lizenzen. Arbeiten dagegen 40 Personen an 12 gemeinsam genutzten Rechnern, sind Device-CALs günstiger als User-CALs.</p>'+
        '<p><strong>Unterlizenzierung</strong> ist eine Urheberrechtsverletzung mit Schadenersatzfolge, <strong>Überlizenzierung</strong> ist verschwendetes Geld. Deshalb gehört ein <strong>Lizenzmanagement</strong> mit Inventarisierung und Nachweisdokumenten zur Pflicht.</p>',
      code:
        "LIZENZBEDARF BERECHNEN\n\n"+
        "  Situation: 60 Mitarbeiter, 3 Schichten\n"+
        "             maximal 22 gleichzeitig angemeldet\n"+
        "             45 eigene PCs, 8 Gemeinschaftsrechner\n\n"+
        "  Named User   : 60 Lizenzen  (jede Person eine)\n"+
        "  Concurrent   : 22 Lizenzen  (nur Gleichzeitigkeit zaehlt)\n"+
        "  User-CAL     : 60 Lizenzen\n"+
        "  Device-CAL   : 53 Lizenzen  (45 + 8 Geraete)\n\n"+
        "  Guenstigste Variante: Concurrent mit 22 Lizenzen -\n"+
        "  vorausgesetzt, der Hersteller bietet dieses Modell an\n"+
        "  und die Gleichzeitigkeit ist technisch begrenzbar.",
      codeLang:'Lizenzrechnung',
      tip:'Die Entscheidung zwischen User- und Device-CAL folgt einer einfachen Regel: Zähle, wovon es weniger gibt. Mehr Personen als Geräte, etwa im Schichtbetrieb, spricht für Device-CALs. Mehr Geräte als Personen, etwa wenn jeder ein Notebook und ein Diensthandy hat, spricht für User-CALs. Schreibe die Zählung in die Antwort, nicht nur das Ergebnis.',
      quiz:[
        {q:'Was kennzeichnet eine OEM-Lizenz?', options:['Sie ist frei übertragbar','Sie ist fest an ein Gerät gebunden','Sie gilt nur ein Jahr'], correct:1, explain:'Mit dem Gerät endet auch die Lizenz – dafür ist sie günstiger.'},
        {q:'40 Mitarbeiter teilen sich 15 Rechner. Welche CAL-Art ist günstiger?', options:['User-CAL','Device-CAL','Beide gleich'], correct:1, explain:'15 Geräte-Lizenzen statt 40 Benutzer-Lizenzen.'},
        {q:'40 Mitarbeiter im Schichtbetrieb, nie mehr als 15 gleichzeitig. Welches Modell ist am günstigsten?', options:['40 Named-User-Lizenzen','15 Concurrent-Lizenzen','40 Device-CALs'], correct:1, explain:'Sofern der Hersteller Concurrent anbietet und die Gleichzeitigkeit technisch begrenzbar ist.'}
      ]
    },
    {
      id:'m24-l2', title:'Open Source, Urheberrecht und freie Software', minutes:9,
      body:
        '<p>Die Begriffe werden im Alltag durcheinandergeworfen — in der Prüfung nicht:</p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Bedeutung</th></tr>'+
        '<tr><td><strong>Open Source</strong></td><td>Quellcode ist einsehbar, veränderbar und weitergebbar. Nicht automatisch kostenlos.</td></tr>'+
        '<tr><td><strong>Freeware</strong></td><td>kostenlos nutzbar, aber <em>kein</em> Quellcode, keine Änderungsrechte</td></tr>'+
        '<tr><td><strong>Shareware</strong></td><td>zum Testen kostenlos, danach kostenpflichtig oder eingeschränkt</td></tr>'+
        '<tr><td><strong>Public Domain</strong></td><td>gemeinfrei, der Urheber verzichtet auf alle Rechte (in Deutschland kaum möglich)</td></tr>'+
        '<tr><td><strong>Proprietär</strong></td><td>geschlossener Quellcode, Nutzung nur nach Lizenzbedingungen</td></tr></table>'+
        '<p><strong>Die beiden Lizenzfamilien im Open Source:</strong></p>'+
        '<ul><li><strong>Copyleft (GPL, AGPL)</strong> – wer den Code verändert und <em>weitergibt</em>, muss das Ergebnis unter derselben Lizenz und mit Quellcode veröffentlichen. Das ist der „virale" Effekt, den Unternehmen fürchten.</li>'+
        '<li><strong>Permissiv (MIT, BSD, Apache 2.0)</strong> – nahezu beliebige Verwendung, auch in geschlossenen kommerziellen Produkten. Bedingung ist meist nur die Nennung des Urhebers und der Lizenztext.</li></ul>'+
        '<p><strong>Urheberrecht am Quellcode:</strong> Software ist nach § 69a UrhG geschützt. Beim Arbeitsverhältnis gilt: Die <strong>Verwertungsrechte an Software, die in Erfüllung des Arbeitsvertrags entsteht, stehen dem Arbeitgeber zu</strong> (§ 69b UrhG). Das Urheberpersönlichkeitsrecht bleibt beim Entwickler, es ist nicht übertragbar.</p>',
      code:
        "Pruefungsfrage: Duerfen wir diese Bibliothek einsetzen?\n\n"+
        "  Interne Nutzung (kein Vertrieb)\n"+
        "     GPL         -> ja, Copyleft greift erst bei Weitergabe\n"+
        "     MIT/Apache  -> ja\n\n"+
        "  Eingebaut in ein Produkt, das wir verkaufen\n"+
        "     GPL         -> problematisch: unser Code muesste ebenfalls\n"+
        "                    unter GPL offengelegt werden\n"+
        "     LGPL        -> nur bei dynamischer Einbindung unkritisch\n"+
        "     MIT/Apache  -> unproblematisch, Urhebernennung genuegt\n\n"+
        "  Web-Anwendung, die wir betreiben (kein Download)\n"+
        "     GPL         -> keine Weitergabe, daher unkritisch\n"+
        "     AGPL        -> VORSICHT: Bereitstellung ueber das Netz\n"+
        "                    gilt hier bereits als Weitergabe",
      codeLang:'Lizenzprüfung',
      tip:'Der wichtigste Satz zum Thema lautet: Open Source heißt nicht kostenlos, und kostenlos heißt nicht Open Source. Beide Verwechslungen kommen in Prüfungen als Multiple-Choice-Falle vor. Und merke dir die Auslösebedingung von Copyleft — sie greift bei der <em>Weitergabe</em>, nicht bei der internen Nutzung. Genau deshalb ist die AGPL für SaaS-Anbieter die kritische Variante.',
      quiz:[
        {q:'Was besagt Copyleft bei der GPL?', options:['Die Software ist kostenlos','Abgeleitete Werke müssen bei Weitergabe unter derselben Lizenz stehen','Der Quellcode darf nicht verändert werden'], correct:1, explain:'MIT und Apache sind dagegen permissiv und erlauben geschlossene Produkte.'},
        {q:'Wem stehen die Verwertungsrechte an Software zu, die ein Angestellter im Job entwickelt?', options:['Dem Entwickler','Dem Arbeitgeber (§ 69b UrhG)','Beiden je zur Hälfte'], correct:1, explain:'Das Urheberpersönlichkeitsrecht bleibt beim Entwickler, es ist nicht übertragbar.'},
        {q:'Ist Freeware dasselbe wie Open Source?', options:['Ja','Nein — Freeware ist kostenlos, aber ohne Quellcode und Änderungsrecht','Nur bei kleinen Programmen'], correct:1, explain:'Umgekehrt ist Open Source nicht automatisch kostenlos.'}
      ]
    },
    {
      id:'m24-l3', title:'Installation, Imaging und Rollout', minutes:9,
      body:
        '<p>Bei einem Rollout von 30 Arbeitsplätzen installiert niemand 30-mal von Hand. Die Verfahren:</p>'+
        '<ul><li><strong>Referenzinstallation und Image</strong> – ein Muster-PC wird eingerichtet, mit <strong>Sysprep</strong> generalisiert (entfernt die eindeutige SID und rechnerspezifische Daten) und als Abbild auf die übrigen Geräte verteilt.</li>'+
        '<li><strong>Unattended Setup</strong> – die Installation läuft über eine Antwortdatei ohne Rückfragen durch.</li>'+
        '<li><strong>Netzwerkinstallation über PXE</strong> – der Rechner bootet über das Netz und zieht sich das Abbild vom Server.</li>'+
        '<li><strong>Softwareverteilung</strong> – Anwendungen und Updates werden zentral paketiert und automatisch ausgerollt.</li>'+
        '<li><strong>Gruppenrichtlinien</strong> – Konfiguration, Rechte und Sicherheitseinstellungen zentral erzwungen.</li></ul>'+
        '<p>Warum Sysprep unverzichtbar ist: Ein geklontes System behält sonst dieselbe <strong>SID</strong>. In einer Domäne führt das zu Konflikten bei Anmeldung, Rechtevergabe und Softwareverteilung.</p>'+
        '<p><strong>Datenmigration</strong> vom Altgerät: Benutzerprofile, Dokumente, Mailarchive, Zertifikate, Lesezeichen, Druckertreiber und Anwendungseinstellungen. Und immer: <strong>vorher eine vollständige Sicherung</strong>, erst danach das Altgerät zurücksetzen oder entsorgen.</p>'+
        '<p><strong>Patchmanagement:</strong> Updates werden zunächst in einer Testgruppe eingespielt, dann gestaffelt ausgerollt — nie alles gleichzeitig auf alle Produktivsysteme.</p>',
      code:
        "ZEITVERGLEICH EINZELINSTALLATION GEGEN IMAGE - 30 Arbeitsplaetze\n\n"+
        "  Manuell je Geraet:\n"+
        "     Betriebssystem  45 min\n"+
        "     Treiber         15 min\n"+
        "     Anwendungen     60 min\n"+
        "     Konfiguration   30 min\n"+
        "     Summe          150 min = 2,5 h\n"+
        "     30 x 2,5 h = 75 Stunden\n\n"+
        "  Mit Image:\n"+
        "     Referenzsystem erstellen und testen     6,0 h einmalig\n"+
        "     Ausrollen je Geraet ca. 20 min -> 30 x = 10,0 h\n"+
        "     Nacharbeit je Geraet ca. 10 min -> 30 x = 5,0 h\n"+
        "     Summe                                   21,0 h\n\n"+
        "  Ersparnis: 54 Stunden. Bei 65 EUR/h sind das 3.510 EUR.",
      codeLang:'Rollout-Planung',
      tip:'Die Imaging-Aufgabe hat immer dieselbe Struktur: einmaliger Aufwand plus Aufwand je Gerät, gegen den rein linearen Aufwand der Einzelinstallation. Vergiss den einmaligen Anteil nicht, sonst wird die Ersparnis zu groß. Und nenne in der Begründung neben der Zeit den zweiten Vorteil, den Prüfer hören wollen: Alle Geräte sind identisch konfiguriert, was Support und Fehlersuche erheblich vereinfacht.',
      quiz:[
        {q:'Wozu dient Sysprep vor dem Klonen?', options:['Zum Komprimieren des Abbilds','Zum Entfernen der eindeutigen SID und rechnerspezifischer Daten','Zum Installieren der Treiber'], correct:1, explain:'Identische SIDs führen in der Domäne zu Konflikten.'},
        {q:'Wie rollt man Sicherheitsupdates im Unternehmen aus?', options:['Sofort auf allen Systemen gleichzeitig','Zuerst in einer Testgruppe, dann gestaffelt','Gar nicht, das stört den Betrieb'], correct:1, explain:'So werden Inkompatibilitäten erkannt, bevor sie den Produktivbetrieb lahmlegen.'},
        {q:'Was passiert ohne Sysprep beim Klonen in einer Domäne?', options:['Nichts','Identische SIDs führen zu Konflikten bei Anmeldung und Rechtevergabe','Der Klon startet nicht'], correct:1, explain:'Sysprep entfernt die eindeutige SID und rechnerspezifische Daten.'}
      ]
    },
    {
      id:'m24-l4', title:'Inbetriebnahme, Übergabe und Barrierefreiheit', minutes:9,
      body:
        '<p>Der letzte Schritt der AP1-Handlungskette wird gern unterschätzt, ist aber fest im Prüfungsbereich verankert.</p>'+
        '<p><strong>Inbetriebnahme und Abnahme:</strong></p>'+
        '<ol><li><strong>Funktionstest</strong> anhand der Anforderungen aus dem Pflichtenheft — jede zugesagte Funktion einmal geprüft.</li>'+
        '<li><strong>Abnahmeprotokoll</strong> mit Datum, geprüften Punkten, festgestellten Mängeln und Unterschriften beider Seiten. Es ist die rechtliche Grundlage für Zahlung und Gewährleistungsbeginn.</li>'+
        '<li><strong>Einweisung</strong> der Anwender, angemessen zum Vorwissen.</li>'+
        '<li><strong>Dokumentation</strong> übergeben: Konfiguration, Zugangsdaten (sicher), Netzplan, Inventarnummern, Ansprechpartner.</li></ol>'+
        '<p><strong>Barrierefreiheit</strong> — geregelt in der <strong>BITV 2.0</strong> (für öffentliche Stellen) auf Grundlage der <strong>WCAG</strong>. Die vier Prinzipien: <strong>wahrnehmbar, bedienbar, verständlich, robust</strong>. Konkrete Maßnahmen am Arbeitsplatz:</p>'+
        '<ul><li>ausreichender <strong>Kontrast</strong> (mindestens 4,5:1 für normalen Text), skalierbare Schrift</li>'+
        '<li><strong>vollständige Tastaturbedienbarkeit</strong> ohne Maus</li>'+
        '<li><strong>Alternativtexte</strong> für Bilder, damit Screenreader sie vorlesen können</li>'+
        '<li>Untertitel für Videos, keine reine Farbcodierung von Informationen</li>'+
        '<li>höhenverstellbarer Tisch, Spezialtastatur, Braillezeile, Bildschirmlupe je nach Bedarf</li></ul>'+
        '<p>Für die <strong>Software-Ergonomie</strong> gilt die <strong>EN ISO 9241-110</strong> mit ihren Grundsätzen: Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Steuerbarkeit, Erwartungskonformität, Fehlertoleranz, Individualisierbarkeit und Lernförderlichkeit.</p>',
      code:
        "ABNAHMEPROTOKOLL - Mindestinhalte\n\n"+
        "  Projekt / Auftragsnummer\n"+
        "  Datum, Ort, Beteiligte (Auftraggeber und Auftragnehmer)\n"+
        "  Gegenstand der Abnahme (Geraete, Software, Leistungen)\n"+
        "  Geprueftes Kriterium | Soll | Ist | erfuellt ja/nein\n"+
        "  Festgestellte Maengel mit Frist zur Beseitigung\n"+
        "  Abnahme: vollstaendig / unter Vorbehalt / verweigert\n"+
        "  Unterschriften beider Seiten\n\n"+
        "  Rechtliche Wirkung:\n"+
        "   - Gefahruebergang auf den Auftraggeber\n"+
        "   - Faelligkeit der Verguetung\n"+
        "   - Beginn der Gewaehrleistungsfrist\n"+
        "   - Umkehr der Beweislast fuer spaeter geruegte Maengel",
      codeLang:'Abnahme',
      tip:'Die vier rechtlichen Wirkungen der Abnahme sind eine dankbare Nennaufgabe, weil sie sich niemand herleiten kann — man weiß sie oder nicht. Präge dir vor allem zwei ein: Mit der Abnahme wird die Vergütung fällig, und die Gewährleistungsfrist beginnt zu laufen. Wer Mängel erst nach der Abnahme rügt, trägt zudem die Beweislast dafür, dass sie schon vorher vorlagen.',
      quiz:[
        {q:'Welche rechtliche Wirkung hat die Abnahme?', options:['Sie verlängert die Gewährleistung','Die Vergütung wird fällig und die Gewährleistungsfrist beginnt','Sie hat keine rechtliche Wirkung'], correct:1, explain:'Zusätzlich gehen Gefahr und Beweislast auf den Auftraggeber über.'},
        {q:'Welches Kontrastverhältnis fordert die WCAG für normalen Text mindestens?', options:['2:1','4,5:1','10:1'], correct:1, explain:'Für große Schrift genügt 3:1.'},
        {q:'Ab wann läuft die Gewährleistungsfrist?', options:['Ab Vertragsschluss','Ab der Abnahme','Ab der ersten Rechnung'], correct:1, explain:'Mit der Abnahme werden zugleich Vergütung fällig und Gefahr sowie Beweislast übertragen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m25', part:8, partTitle:'Service, Kommunikation & Qualität', title:'IT-Service-Management', relevanz:'mittel',
  lessons:[
    {
      id:'m25-l1', title:'Incident, Problem, Change und Service Request', minutes:9,
      body:
        '<p>Die vier Begriffe aus dem IT-Service-Management werden regelmäßig als Zuordnungsaufgabe geprüft. Der Unterschied liegt im Ziel, nicht in der Technik.</p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Definition</th><th>Ziel</th></tr>'+
        '<tr><td><strong>Incident</strong> (Störung)</td><td>Ein Dienst ist unterbrochen oder eingeschränkt</td><td>schnellstmögliche Wiederherstellung — auch per Workaround</td></tr>'+
        '<tr><td><strong>Problem</strong></td><td>Die unbekannte Ursache eines oder mehrerer Incidents</td><td>Ursache finden und dauerhaft beseitigen</td></tr>'+
        '<tr><td><strong>Change</strong></td><td>Eine geplante Änderung an der Infrastruktur</td><td>Änderung kontrolliert und risikoarm durchführen</td></tr>'+
        '<tr><td><strong>Service Request</strong></td><td>Eine Standardanfrage ohne Störung</td><td>Anfrage nach definiertem Ablauf erfüllen</td></tr></table>'+
        '<p><strong>Der Merksatz:</strong> Das Incident Management stellt den Betrieb wieder her, das Problem Management verhindert die Wiederholung. Beide sind nötig — wer nur Incidents löst, behebt dasselbe Problem jeden Monat neu.</p>'+
        '<p>Ein <strong>Known Error</strong> ist ein Problem mit bekannter Ursache und dokumentiertem Workaround. Die Sammlung dieser Einträge ist die <strong>Known Error Database</strong> — sie beschleunigt die Bearbeitung künftiger Störungen erheblich.</p>'+
        '<p>Die <strong>Priorität</strong> eines Tickets ergibt sich aus zwei Faktoren: <strong>Auswirkung</strong> (wie viele Nutzer oder wie kritische Prozesse sind betroffen?) und <strong>Dringlichkeit</strong> (wie schnell muss es behoben sein?). Beide zusammen ergeben die Priorität über eine Matrix.</p>',
      code:
        "PRIORITAETSMATRIX\n\n"+
        "                    Dringlichkeit\n"+
        "                 hoch   mittel   niedrig\n"+
        "  Auswirkung\n"+
        "     hoch          1       2        3\n"+
        "     mittel        2       3        4\n"+
        "     niedrig       3       4        5\n\n"+
        "ZUORDNUNGSBEISPIELE\n\n"+
        "  \"Der Mailserver ist abgestuerzt\"\n"+
        "     -> INCIDENT, Prioritaet 1 (alle betroffen, sofort noetig)\n\n"+
        "  \"Der Mailserver stuerzt jeden Montag ab, Ursache unklar\"\n"+
        "     -> PROBLEM (die wiederkehrende Ursache wird gesucht)\n\n"+
        "  \"Bitte richten Sie ein Postfach fuer den neuen Kollegen ein\"\n"+
        "     -> SERVICE REQUEST (Standardvorgang, keine Stoerung)\n\n"+
        "  \"Wir aktualisieren den Mailserver am Samstag auf Version 9\"\n"+
        "     -> CHANGE (geplante Aenderung mit Rueckfallplan)",
      codeLang:'ITSM',
      tip:'Die Zuordnungsfrage entscheidest du an einem einzigen Kriterium: Ist gerade etwas kaputt? Wenn ja und die Ursache egal ist, solange es wieder läuft, ist es ein Incident. Wenn ja und es wiederholt sich, steckt ein Problem dahinter. Wenn nichts kaputt ist und jemand etwas Normales möchte, ist es ein Service Request. Und wenn etwas absichtlich geändert werden soll, ist es ein Change.',
      quiz:[
        {q:'Was ist das Ziel des Incident Managements?', options:['Die Ursache dauerhaft beseitigen','Den Betrieb schnellstmöglich wiederherstellen, notfalls per Workaround','Änderungen dokumentieren'], correct:1, explain:'Die Ursachenbeseitigung ist Aufgabe des Problem Managements.'},
        {q:'Woraus ergibt sich die Priorität eines Tickets?', options:['Aus der Reihenfolge des Eingangs','Aus Auswirkung und Dringlichkeit','Aus der Bearbeitungsdauer'], correct:1, explain:'Beide Faktoren werden über eine Matrix zur Priorität verknüpft.'},
        {q:'Derselbe Fehler tritt zum fünften Mal auf. Welcher Prozess ist zuständig?', options:['Incident Management','Problem Management','Change Management'], correct:1, explain:'Die einzelnen Ausfälle sind Incidents, das wiederkehrende Muster ist ein Problem.'}
      ]
    },
    {
      id:'m25-l2', title:'Support-Level, Eskalation und Ticketsystem', minutes:8,
      body:
        '<p>Der <strong>gestufte Support</strong> sorgt dafür, dass teure Spezialisten nicht mit Standardfragen belegt werden:</p>'+
        '<ul><li><strong>First Level</strong> – Annahme aller Anfragen, Erstqualifizierung, Lösung mit Hilfe von Anleitungen und der Known Error Database. Löst idealerweise 60 bis 80 Prozent selbst.</li>'+
        '<li><strong>Second Level</strong> – Fachleute für bestimmte Systeme, tiefere Analyse.</li>'+
        '<li><strong>Third Level</strong> – Spezialisten, Entwickler oder der Hersteller.</li></ul>'+
        '<p><strong>Zwei Arten der Eskalation</strong> — die Unterscheidung ist eine typische Prüfungsfrage:</p>'+
        '<ul><li><strong>Funktionale Eskalation</strong> (horizontal) – das Ticket geht an eine Stelle mit <em>mehr Fachwissen</em>, also vom First zum Second Level.</li>'+
        '<li><strong>Hierarchische Eskalation</strong> (vertikal) – die Führungsebene wird eingeschaltet, weil <em>mehr Befugnis oder Ressourcen</em> nötig sind, etwa wenn eine SLA-Frist zu reißen droht.</li></ul>'+
        '<p><strong>Das Ticketsystem</strong> ist das zentrale Werkzeug. Sein Nutzen in Stichworten, wie ihn eine Begründungsaufgabe verlangt: nichts geht verloren, der Status ist jederzeit nachvollziehbar, die Historie bleibt erhalten, Prioritäten und Fristen werden überwacht, Wissen wird wiederverwendbar, und aus den Daten entstehen Kennzahlen für die Verbesserung.</p>',
      code:
        "LEBENSZYKLUS EINES TICKETS\n\n"+
        "  Neu -> Zugewiesen -> In Bearbeitung -> Wartend (auf Kunde)\n"+
        "      -> Geloest -> Geschlossen\n"+
        "                 \\-> Wiedereroeffnet (wenn nicht geloest)\n\n"+
        "PFLICHTANGABEN EINES TICKETS\n"+
        "  Ticketnummer, Eingangszeit, Melder und Erreichbarkeit\n"+
        "  Betroffener Dienst oder Geraet (Inventarnummer)\n"+
        "  Fehlerbeschreibung mit genauem Wortlaut der Meldung\n"+
        "  Schritte zur Reproduktion, seit wann, wer noch betroffen\n"+
        "  Auswirkung und Dringlichkeit -> Prioritaet\n"+
        "  Bearbeiter, durchgefuehrte Schritte, Loesung\n\n"+
        "  Die Reproduktionsschritte sind der wertvollste Teil -\n"+
        "  ohne sie beginnt der Second Level bei null.",
      codeLang:'Ticketsystem',
      tip:'Bei „Welche Angaben nehmen Sie bei einer Störungsmeldung auf?" reicht die Nennung von Name und Problem nicht für die volle Punktzahl. Gefragt sind die Angaben, die eine Weiterbearbeitung überhaupt erst möglich machen: der genaue Wortlaut der Fehlermeldung, seit wann es auftritt, was zuletzt geändert wurde, ob weitere Personen betroffen sind und wie sich der Fehler reproduzieren lässt. Das letzte Kriterium entscheidet, ob der Second Level arbeiten kann oder zurückfragen muss.',
      quiz:[
        {q:'Was ist eine funktionale Eskalation?', options:['Die Weitergabe an die Führungsebene','Die Weitergabe an eine Stelle mit mehr Fachwissen','Das Schließen des Tickets'], correct:1, explain:'Die hierarchische Eskalation geht dagegen nach oben in der Führung.'},
        {q:'Welche Angabe hilft dem Second Level am meisten?', options:['Die Uhrzeit der Meldung','Die Schritte zur Reproduktion des Fehlers','Die Abteilung des Melders'], correct:1, explain:'Ein nicht reproduzierbarer Fehler lässt sich kaum gezielt beheben.'},
        {q:'Wie hoch sollte die Erstlösungsquote im First Level idealerweise liegen?', options:['Bei etwa 20 %','Bei 60 bis 80 %','Bei 100 %'], correct:1, explain:'Eine niedrige Quote deutet auf fehlende Anleitungen oder eine leere Known Error Database.'}
      ]
    },
    {
      id:'m25-l3', title:'SLA, OLA und Service-Kennzahlen', minutes:9,
      body:
        '<p>Ein <strong>Service Level Agreement (SLA)</strong> ist die Vereinbarung zwischen <strong>Dienstleister und Kunde</strong> über die Qualität einer Leistung. Es enthält typischerweise:</p>'+
        '<ul><li><strong>Servicezeiten</strong> – wann gilt die Vereinbarung? Montag bis Freitag 8 bis 18 Uhr ist etwas anderes als 24/7.</li>'+
        '<li><strong>Reaktionszeit</strong> – wie schnell beginnt die Bearbeitung? <em>Nicht</em> wie schnell es gelöst ist.</li>'+
        '<li><strong>Wiederherstellungszeit</strong> – bis wann läuft der Dienst wieder?</li>'+
        '<li><strong>Verfügbarkeit</strong> in Prozent, bezogen auf die Servicezeit.</li>'+
        '<li><strong>Eskalationswege</strong> und <strong>Vertragsstrafen (Pönale)</strong> bei Nichteinhaltung.</li></ul>'+
        '<p>Abgrenzung: Ein <strong>OLA (Operational Level Agreement)</strong> regelt dasselbe <em>innerhalb</em> der eigenen Organisation zwischen Abteilungen. Ein <strong>Underpinning Contract (UC)</strong> ist der Vertrag mit einem externen Zulieferer. Die Logik dahinter: Ein SLA von vier Stunden lässt sich nur halten, wenn die zuarbeitenden OLAs und UCs kürzer sind.</p>'+
        '<p><strong>Die Kennzahlen:</strong></p>'+
        '<table class="lesson-table"><tr><th>Kennzahl</th><th>Bedeutung</th></tr>'+
        '<tr><td>MTTR</td><td>Mean Time To Repair – mittlere Reparaturdauer</td></tr>'+
        '<tr><td>MTBF</td><td>Mean Time Between Failures – mittlere Zeit zwischen Ausfällen</td></tr>'+
        '<tr><td>Erstlösungsquote</td><td>Anteil der im First Level gelösten Tickets</td></tr>'+
        '<tr><td>SLA-Einhaltungsquote</td><td>Anteil der fristgerecht bearbeiteten Tickets</td></tr></table>'+
        '<p><code>Verfügbarkeit = MTBF / (MTBF + MTTR) × 100 %</code></p>',
      code:
        "SLA-RECHNUNG\n\n"+
        "  Servicezeit: Mo-Fr, 8-18 Uhr = 10 h/Tag x 250 Arbeitstage\n"+
        "               = 2.500 h pro Jahr\n"+
        "  Zugesicherte Verfuegbarkeit: 99,5 %\n\n"+
        "  Erlaubte Ausfallzeit = 2.500 x 0,005 = 12,5 h pro Jahr\n\n"+
        "  Achtung: Bezogen auf 8.760 h (24/7) waeren es 43,8 h.\n"+
        "  Der Bezugszeitraum entscheidet - immer in der Aufgabe suchen!\n\n"+
        "MTTR UND MTBF\n"+
        "  Ein System fiel in 8.760 h viermal aus,\n"+
        "  die Reparaturen dauerten 3 h, 5 h, 2 h und 6 h.\n\n"+
        "  MTTR = (3+5+2+6) / 4 = 4 h\n"+
        "  Betriebszeit = 8.760 - 16 = 8.744 h\n"+
        "  MTBF = 8.744 / 4 = 2.186 h\n"+
        "  Verfuegbarkeit = 2.186 / (2.186 + 4) x 100 = 99,82 %",
      codeLang:'SLA-Kennzahlen',
      tip:'Der häufigste Fehler bei SLA-Aufgaben ist die Verwechslung von Reaktionszeit und Wiederherstellungszeit. Die Reaktionszeit ist erfüllt, sobald ein Techniker mit der Bearbeitung beginnt — der Dienst kann dann noch stundenlang stehen. Wenn eine Aufgabe fragt, ob das SLA eingehalten wurde, prüfe genau, welche der beiden Fristen gemeint ist. Und achte auf den Bezugszeitraum der Verfügbarkeit: Servicezeit oder Kalenderjahr macht einen Faktor von mehr als drei aus.',
      quiz:[
        {q:'Was regelt ein OLA?', options:['Den Vertrag mit dem Kunden','Vereinbarungen zwischen internen Abteilungen','Den Vertrag mit einem externen Zulieferer'], correct:1, explain:'Der Vertrag mit dem externen Zulieferer heißt Underpinning Contract.'},
        {q:'Was besagt die Reaktionszeit im SLA?', options:['Wann die Störung behoben ist','Wann mit der Bearbeitung begonnen wird','Wie lange der Ausfall dauern darf'], correct:1, explain:'Die Behebung regelt die Wiederherstellungszeit.'},
        {q:'Ein Ticket wurde binnen 20 Minuten angenommen, aber erst nach 9 Stunden gelöst. SLA: Reaktion 30 min, Wiederherstellung 8 h.', options:['Beides eingehalten','Reaktion eingehalten, Wiederherstellung verletzt','Beides verletzt'], correct:1, explain:'Reaktions- und Wiederherstellungszeit sind getrennt zu prüfen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m26', part:8, partTitle:'Service, Kommunikation & Qualität', title:'Kommunikation & Kundengespräch', relevanz:'mittel',
  lessons:[
    {
      id:'m26-l1', title:'Sender-Empfänger und das Vier-Ohren-Modell', minutes:9,
      body:
        '<p>Das <strong>Sender-Empfänger-Modell</strong> beschreibt Kommunikation als Kette: Der Sender <em>codiert</em> eine Nachricht, überträgt sie über einen Kanal, der Empfänger <em>decodiert</em> sie. Störungen entstehen an jeder Stelle — durch unklare Formulierung, Lärm auf dem Kanal oder abweichendes Vorwissen beim Empfänger. Das <strong>Feedback</strong> schließt den Kreis und ermöglicht die Prüfung, ob die Nachricht angekommen ist.</p>'+
        '<p>Das <strong>Vier-Ohren-Modell</strong> von Schulz von Thun erklärt, warum Missverständnisse auch bei klarer Formulierung entstehen. Jede Äußerung hat vier Seiten:</p>'+
        '<table class="lesson-table"><tr><th>Seite</th><th>Frage</th></tr>'+
        '<tr><td><strong>Sachinhalt</strong></td><td>Worüber informiere ich?</td></tr>'+
        '<tr><td><strong>Selbstoffenbarung</strong></td><td>Was gebe ich von mir preis?</td></tr>'+
        '<tr><td><strong>Beziehung</strong></td><td>Wie stehe ich zum Gegenüber?</td></tr>'+
        '<tr><td><strong>Appell</strong></td><td>Wozu möchte ich veranlassen?</td></tr></table>'+
        '<p>Der Empfänger hört mit vier Ohren und entscheidet selbst, welches er groß aufdreht. Genau dort entstehen Konflikte: Der Sender meint den Sachinhalt, der Empfänger hört die Beziehungsseite.</p>'+
        '<p>Ergänzend das <strong>Eisberg-Modell</strong>: Nur etwa 20 Prozent der Kommunikation sind Sachebene (sichtbar), rund 80 Prozent liegen als Beziehungsebene unter der Oberfläche. Deshalb scheitern Gespräche selten an Fakten.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 230" role="img" aria-label="Vier-Ohren-Modell nach Schulz von Thun"><rect class="s-box" x="20" y="88" width="104" height="50" rx="6"/><text class="s-hd" x="72" y="118" text-anchor="middle">Sender</text><rect class="s-box" x="436" y="88" width="104" height="50" rx="6"/><text class="s-hd" x="488" y="118" text-anchor="middle">Empf&#228;nger</text><rect class="s-accent" x="180" y="18" width="200" height="34" rx="6"/><text class="s-lbl" x="280" y="40" text-anchor="middle">Sachinhalt &#8211; wor&#252;ber?</text><rect class="s-accent" x="180" y="62" width="200" height="34" rx="6"/><text class="s-lbl" x="280" y="84" text-anchor="middle">Selbstoffenbarung &#8211; was von mir?</text><rect class="s-warn" x="180" y="106" width="200" height="34" rx="6"/><text class="s-lbl" x="280" y="128" text-anchor="middle">Beziehung &#8211; wie steh ich zu dir?</text><rect class="s-accent" x="180" y="150" width="200" height="34" rx="6"/><text class="s-lbl" x="280" y="172" text-anchor="middle">Appell &#8211; wozu bewegen?</text><line class="s-line" x1="124" y1="113" x2="180" y2="35"/><line class="s-line" x1="124" y1="113" x2="180" y2="79"/><line class="s-line" x1="124" y1="113" x2="180" y2="123"/><line class="s-line" x1="124" y1="113" x2="180" y2="167"/><line class="s-line" x1="380" y1="35" x2="436" y2="113"/><line class="s-line" x1="380" y1="79" x2="436" y2="113"/><line class="s-arrow" x1="380" y1="123" x2="436" y2="113"/><line class="s-line" x1="380" y1="167" x2="436" y2="113"/><text class="s-lbl" x="280" y="212" text-anchor="middle">Konflikte entstehen, wenn der Sender die Sache meint und der Empf&#228;nger die Beziehung h&#246;rt.</text></svg><figcaption>Jede Aeusserung hat vier Seiten. Der Empfaenger entscheidet selbst, welches Ohr er aufdreht &#8211; darauf hat der Sender nur begrenzt Einfluss.</figcaption></figure>',
      code:
        "DIE VIER SEITEN AN EINEM BEISPIEL\n\n"+
        "  Ein Kollege sagt: \"Der Server ist schon wieder down.\"\n\n"+
        "  Sachinhalt        : Der Server ist nicht erreichbar.\n"+
        "  Selbstoffenbarung : Ich bin genervt und unter Druck.\n"+
        "  Beziehung         : Du bist dafuer zustaendig - und es klappt nicht.\n"+
        "  Appell            : Kuemmere dich sofort darum!\n\n"+
        "  Reaktion auf dem SACHOHR:\n"+
        "     \"Ich pruefe das sofort, seit wann genau?\"   -> deeskalierend\n\n"+
        "  Reaktion auf dem BEZIEHUNGSOHR:\n"+
        "     \"Ich kann ja auch nichts dafuer!\"            -> eskalierend\n\n"+
        "  Regel fuer den Support: bewusst auf dem Sachohr antworten,\n"+
        "  das Gefuehl aber kurz anerkennen.",
      codeLang:'Kommunikation',
      tip:'Für Prüfungsaufgaben mit einem geschilderten Gesprächsausschnitt gilt ein fester Ablauf: Ordne die Aussage den vier Seiten zu, benenne dann, auf welchem Ohr der Empfänger gehört hat, und schlage eine sachliche Reaktion vor. Die Zuordnung allein reicht selten — gefragt ist meist auch, wie sich das Missverständnis auflösen lässt.',
      quiz:[
        {q:'Welche Seite einer Nachricht beschreibt, wozu der Sender veranlassen will?', options:['Sachinhalt','Appell','Selbstoffenbarung'], correct:1, explain:'Die Beziehungsseite sagt dagegen, wie der Sender zum Empfänger steht.'},
        {q:'Warum eskalieren Gespräche trotz sachlich korrekter Aussagen?', options:['Weil die Fakten falsch sind','Weil der Empfänger auf der Beziehungsebene hört','Weil der Kanal gestört ist'], correct:1, explain:'Das Eisberg-Modell verortet rund 80 Prozent der Kommunikation dort.'},
        {q:'Auf welchem Ohr sollte man im Support bewusst antworten?', options:['Auf dem Beziehungsohr','Auf dem Sachohr — das Gefühl kurz anerkennen, dann zur Sache','Auf dem Appellohr'], correct:1, explain:'Die Antwort auf dem Beziehungsohr führt fast immer zur Eskalation.'}
      ]
    },
    {
      id:'m26-l2', title:'Das Kundengespräch führen', minutes:9,
      body:
        '<p>Bei „Wie gehen Sie im Gespräch mit dem Anwender vor?" erwartet die IHK einen strukturierten Ablauf, nicht Höflichkeitsfloskeln.</p>'+
        '<ol><li><strong>Begrüßen und Namen notieren</strong> – Erreichbarkeit gleich miterfassen.</li>'+
        '<li><strong>Offen fragen</strong> – „Was genau passiert, wenn Sie das Programm starten?" Offene Fragen bringen Information, geschlossene Fragen nur ja oder nein.</li>'+
        '<li><strong>Aktiv zuhören</strong> – ausreden lassen, mitschreiben, nicht vorschnell diagnostizieren.</li>'+
        '<li><strong>Zusammenfassen und rückversichern</strong> – „Habe ich richtig verstanden, dass …?" Das ist der wirksamste Einzelschritt gegen Missverständnisse.</li>'+
        '<li><strong>Gezielt geschlossen nachfragen</strong> – „Erscheint eine Fehlermeldung? Trat das nach einem Update auf?"</li>'+
        '<li><strong>Vorgehen und Zeitrahmen ankündigen</strong> – verbindlich, aber nur zusagen, was haltbar ist.</li>'+
        '<li><strong>Dokumentieren und Rückmeldung geben</strong> – auch wenn es länger dauert.</li></ol>'+
        '<p><strong>Fachsprache übersetzen:</strong> Der Anwender braucht keine Erklärung über DNS-Caches. Er braucht zu wissen, was er tun soll, wie lange es dauert und ob seine Daten sicher sind. Übersetze Technik in Auswirkung.</p>'+
        '<p><strong>Fragearten:</strong> offen (W-Fragen, öffnen das Gespräch) · geschlossen (grenzen ein, bestätigen) · Alternativfragen (lenken zur Entscheidung) · Suggestivfragen (vermeiden, sie verzerren die Antwort).</p>',
      code:
        "SCHLECHT UND GUT FORMULIERT\n\n"+
        "  Schlecht: \"Der DHCP-Lease ist abgelaufen und der Client hat\n"+
        "             sich eine APIPA-Adresse gezogen.\"\n"+
        "  Gut     : \"Ihr Rechner hat vom Netzwerk keine gueltige Adresse\n"+
        "             bekommen. Ich stelle das in etwa zehn Minuten\n"+
        "             wieder her, Ihre Daten sind davon nicht betroffen.\"\n\n"+
        "  Schlecht: \"Haben Sie schon neu gestartet?\" (als erste Frage)\n"+
        "  Gut     : \"Beschreiben Sie mir bitte, was genau passiert,\n"+
        "             wenn Sie das Programm oeffnen.\"\n\n"+
        "  Schlecht: \"Das geht nicht.\"\n"+
        "  Gut     : \"Das ist in dieser Version nicht vorgesehen.\n"+
        "             Moeglich waere stattdessen ...\"",
      codeLang:'Gesprächsführung',
      tip:'Der Schritt, der in Musterlösungen fast immer auftaucht und den die meisten vergessen, ist das Zusammenfassen und Rückversichern. Er kostet zehn Sekunden und verhindert, dass du eine halbe Stunde am falschen Problem arbeitest. Wenn eine Aufgabe nach Gesprächsführung fragt, schreib ihn auf jeden Fall hin — und formuliere ihn als konkreten Satz, nicht als Stichwort.',
      quiz:[
        {q:'Welche Frageart eignet sich zum Einstieg in eine Störungsaufnahme?', options:['Geschlossene Frage','Offene W-Frage','Suggestivfrage'], correct:1, explain:'Sie liefert Informationen, die man mit geschlossenen Fragen anschließend eingrenzt.'},
        {q:'Was leistet das Zusammenfassen im Kundengespräch?', options:['Es wirkt höflich','Es prüft, ob das Problem richtig verstanden wurde','Es verkürzt das Gespräch'], correct:1, explain:'Missverständnisse werden erkannt, bevor Arbeitszeit verloren geht.'},
        {q:'Welche Frageart bringt zu Beginn einer Störungsaufnahme die meiste Information?', options:['Geschlossene Frage','Offene W-Frage','Suggestivfrage'], correct:1, explain:'Geschlossene Fragen grenzen anschließend ein.'}
      ]
    },
    {
      id:'m26-l3', title:'Konflikte, Beschwerden und Feedback', minutes:8,
      body:
        '<p><strong>Der verärgerte Anrufer</strong> ist ein Standardszenario. Der bewährte Ablauf:</p>'+
        '<ol><li><strong>Ausreden lassen</strong> – Unterbrechen verstärkt den Ärger.</li>'+
        '<li><strong>Verständnis zeigen</strong>, ohne Schuld einzugestehen: „Ich verstehe, dass Sie das aufhält."</li>'+
        '<li><strong>Auf die Sachebene zurückführen</strong> – konkrete Fragen stellen.</li>'+
        '<li><strong>Lösung oder nächsten Schritt zusagen</strong> – mit einem realistischen Zeitpunkt.</li>'+
        '<li><strong>Nachfassen</strong> – die Rückmeldung zum vereinbarten Zeitpunkt ist entscheidend für das Vertrauen.</li></ol>'+
        '<p>Eine <strong>Beschwerde ist eine Chance</strong>: Sie zeigt einen Schwachpunkt und gibt Gelegenheit, ihn zu beheben. Unzufriedene Kunden, die sich <em>nicht</em> beschweren, wechseln kommentarlos den Anbieter.</p>'+
        '<p><strong>Feedbackregeln</strong> – ebenfalls prüfungsrelevant:</p>'+
        '<ul><li><strong>Ich-Botschaften</strong> statt Du-Vorwürfen: „Mir fehlt die Dokumentation" statt „Du dokumentierst nie".</li>'+
        '<li><strong>Konkret und auf das Verhalten bezogen</strong>, nicht auf die Person.</li>'+
        '<li><strong>Zeitnah</strong> und unter vier Augen bei Kritik.</li>'+
        '<li><strong>Beschreibend statt bewertend</strong>, und mit einem umsetzbaren Vorschlag.</li></ul>'+
        '<p>Beim Empfangen von Feedback gilt: zuhören, nicht rechtfertigen, nachfragen, bedanken.</p>',
      code:
        "KONFLIKTESKALATION NACH GLASL - die ersten Stufen\n\n"+
        "  1. Verhaertung        Standpunkte verfestigen sich\n"+
        "  2. Debatte            Polarisierung, Rechthaben wird wichtig\n"+
        "  3. Taten statt Worte  Reden hilft nicht mehr, Fakten schaffen\n"+
        "  ------------------------------------------------\n"+
        "  Bis Stufe 3 ist eine Loesung ohne Hilfe von aussen moeglich.\n"+
        "  Ab Stufe 4 wird Moderation noetig, spaeter Vermittlung.\n\n"+
        "ICH-BOTSCHAFT AUFBAUEN\n"+
        "  1. Wahrnehmung   \"Mir ist aufgefallen, dass die Tickets\n"+
        "                    ohne Loesungstext geschlossen werden.\"\n"+
        "  2. Wirkung       \"Dadurch muss ich bei Rueckfragen von vorn\n"+
        "                    anfangen.\"\n"+
        "  3. Wunsch        \"Ich haette gern zwei Saetze zur Loesung\n"+
        "                    im Ticket.\"",
      codeLang:'Konflikt & Feedback',
      tip:'Die Ich-Botschaft in drei Schritten — Wahrnehmung, Wirkung, Wunsch — ist ein Muster, das du in der Prüfung direkt anwenden kannst, wenn eine Aufgabe eine Formulierung verlangt. Sie funktioniert, weil sie keinen Vorwurf enthält und trotzdem konkret bleibt. Schreibe bei solchen Aufgaben einen ausformulierten Beispielsatz hin, keine Regelbeschreibung — gefragt ist die Anwendung.',
      quiz:[
        {q:'Wie reagiert man zuerst auf einen verärgerten Anrufer?', options:['Sofort eine Lösung nennen','Ausreden lassen und Verständnis zeigen','Auf die Zuständigkeit verweisen'], correct:1, explain:'Erst danach lässt sich das Gespräch auf die Sachebene führen.'},
        {q:'Was kennzeichnet eine gute Feedback-Formulierung?', options:['Eine Ich-Botschaft, die konkretes Verhalten beschreibt','Ein Hinweis auf frühere Fehler','Eine Bewertung der Person'], correct:0, explain:'Verhalten lässt sich ändern, die Person nicht.'},
        {q:'Wie ist eine Ich-Botschaft aufgebaut?', options:['Vorwurf, Forderung, Frist','Wahrnehmung, Wirkung, Wunsch','Lob, Kritik, Lob'], correct:1, explain:'Sie beschreibt Verhalten, ohne die Person zu bewerten.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m27', part:8, partTitle:'Service, Kommunikation & Qualität', title:'Qualität & Dokumentation', relevanz:'mittel',
  lessons:[
    {
      id:'m27-l1', title:'PDCA, KVP und Qualitätsmanagement', minutes:8,
      body:
        '<p><strong>Qualität</strong> ist im Sinne der ISO 9000 der Grad, in dem ein Ergebnis die <strong>Anforderungen erfüllt</strong>. Nicht „besonders gut", sondern „wie vereinbart" — das ist der Kern und eine beliebte Definitionsfrage.</p>'+
        '<p><strong>Der PDCA-Zyklus</strong> (Deming-Kreis) ist das Grundmuster jeder Verbesserung:</p>'+
        '<table class="lesson-table"><tr><th>Phase</th><th>Inhalt</th></tr>'+
        '<tr><td><strong>Plan</strong></td><td>Problem analysieren, Ziel festlegen, Maßnahme planen</td></tr>'+
        '<tr><td><strong>Do</strong></td><td>Maßnahme im kleinen Rahmen umsetzen</td></tr>'+
        '<tr><td><strong>Check</strong></td><td>Ergebnis messen und mit dem Ziel vergleichen</td></tr>'+
        '<tr><td><strong>Act</strong></td><td>Bei Erfolg zum Standard machen, sonst nachbessern</td></tr></table>'+
        '<p>Der Zyklus läuft fortlaufend — das ist der <strong>KVP</strong>, der kontinuierliche Verbesserungsprozess. Sein Gegenmodell ist die einmalige Großumstellung.</p>'+
        '<p><strong>ISO 9001</strong> ist die Norm für Qualitätsmanagementsysteme. Sie verlangt keine bestimmte Produktqualität, sondern <strong>definierte, dokumentierte und überprüfte Prozesse</strong>. Zentrale Grundsätze: Kundenorientierung, Führung, prozessorientierter Ansatz, faktengestützte Entscheidungen und eben ständige Verbesserung.</p>'+
        '<p>Aus der Softwareentwicklung kennst du die Qualitätssicherung bereits: Reviews, Tests nach dem V-Modell und die Testarten aus Modul 4 sind angewandtes Qualitätsmanagement.</p>'+
        '<figure class="fig"><svg viewBox="0 0 500 230" role="img" aria-label="PDCA-Zyklus als Kreislauf"><circle class="s-ring" cx="250" cy="112" r="78"/><rect class="s-accent" x="182" y="10" width="136" height="42" rx="8"/><text class="s-hd" x="250" y="30" text-anchor="middle">PLAN</text><text class="s-lbl" x="250" y="45" text-anchor="middle">Ziel und Ma&#223;nahme</text><rect class="s-accent" x="356" y="90" width="136" height="42" rx="8"/><text class="s-hd" x="424" y="110" text-anchor="middle">DO</text><text class="s-lbl" x="424" y="125" text-anchor="middle">klein umsetzen</text><rect class="s-accent" x="182" y="172" width="136" height="42" rx="8"/><text class="s-hd" x="250" y="192" text-anchor="middle">CHECK</text><text class="s-lbl" x="250" y="207" text-anchor="middle">messen, vergleichen</text><rect class="s-accent" x="8" y="90" width="136" height="42" rx="8"/><text class="s-hd" x="76" y="110" text-anchor="middle">ACT</text><text class="s-lbl" x="76" y="125" text-anchor="middle">Standard oder neu</text><path class="s-arrow" d="M300 58 A 70 70 0 0 1 344 96" marker-end="url(#ar4)"/><path class="s-arrow" d="M344 132 A 70 70 0 0 1 300 168" marker-end="url(#ar4)"/><path class="s-arrow" d="M200 168 A 70 70 0 0 1 156 132" marker-end="url(#ar4)"/><path class="s-arrow" d="M156 96 A 70 70 0 0 1 200 58" marker-end="url(#ar4)"/><text class="s-lbl" x="250" y="108" text-anchor="middle">Kontinuierliche</text><text class="s-lbl" x="250" y="124" text-anchor="middle">Verbesserung</text><defs><marker id="ar4" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs></svg><figcaption>Der Zyklus endet nie. Nach Act beginnt ein neuer Durchlauf &#8211; das ist der Unterschied zwischen einem Projekt und einem Verbesserungsprozess.</figcaption></figure>',
      code:
        "PDCA AN EINEM SUPPORT-BEISPIEL\n\n"+
        "  Ausgangslage: Die Erstloesungsquote im First Level liegt bei 48 %.\n\n"+
        "  PLAN   Ziel 65 % in sechs Monaten. Ursache laut Auswertung:\n"+
        "         fehlende Anleitungen fuer die zehn haeufigsten Faelle.\n"+
        "         Massnahme: Known Error Database aufbauen.\n\n"+
        "  DO     Die zehn haeufigsten Tickets werden dokumentiert und\n"+
        "         mit einer Testgruppe von drei Mitarbeitern erprobt.\n\n"+
        "  CHECK  Nach acht Wochen: Erstloesungsquote in der Testgruppe\n"+
        "         bei 61 %, die durchschnittliche Bearbeitungsdauer\n"+
        "         sank von 22 auf 14 Minuten.\n\n"+
        "  ACT    Ausrollen auf das gesamte Team, Pflege der Datenbank\n"+
        "         als fester Bestandteil des Ticketabschlusses.\n"+
        "         Neuer Zyklus: naechste zehn Faelle.",
      codeLang:'PDCA',
      tip:'Wenn eine Aufgabe eine Verbesserungsmaßnahme verlangt, ist PDCA der Rahmen, der dir die Struktur der Antwort vorgibt — und Struktur bringt Punkte. Wichtig ist dabei die Check-Phase mit einer messbaren Größe. „Wir schauen, ob es besser wird" ist keine Prüfung. „Erstlösungsquote von 48 auf 65 Prozent" ist eine, weil sie einen Ausgangswert, ein Ziel und eine Messmethode enthält.',
      quiz:[
        {q:'Wie definiert die ISO 9000 Qualität?', options:['Als besonders hohe Güte','Als Grad der Erfüllung von Anforderungen','Als Fehlerfreiheit'], correct:1, explain:'Maßstab ist das Vereinbarte, nicht das technisch Machbare.'},
        {q:'Was geschieht in der Act-Phase des PDCA?', options:['Die Maßnahme wird geplant','Das Ergebnis wird gemessen','Die erfolgreiche Maßnahme wird zum Standard gemacht'], correct:2, explain:'Bei Misserfolg beginnt stattdessen ein neuer Zyklus.'},
        {q:'Was macht die Check-Phase wertvoll?', options:['Sie ist schnell erledigt','Eine messbare Kenngröße mit Ausgangswert und Ziel','Sie braucht keine Dokumentation'], correct:1, explain:'„Wir schauen, ob es besser wird" ist keine Prüfung.'}
      ]
    },
    {
      id:'m27-l2', title:'Dokumentation und Inventarisierung', minutes:8,
      body:
        '<p>„Warum dokumentieren?" ist eine Standardfrage, und die Antwort besteht aus mehr als „damit man es nachlesen kann":</p>'+
        '<ul><li><strong>Nachvollziehbarkeit</strong> – wer hat wann was warum geändert?</li>'+
        '<li><strong>Vertretbarkeit</strong> – Kollegen können übernehmen, das System hängt nicht an einer Person.</li>'+
        '<li><strong>Schnellere Fehlersuche</strong> – der Soll-Zustand ist bekannt.</li>'+
        '<li><strong>Wiederherstellbarkeit</strong> nach einem Ausfall.</li>'+
        '<li><strong>Nachweispflichten</strong> – Lizenzen, DSGVO-Verarbeitungsverzeichnis, Revision.</li>'+
        '<li><strong>Einarbeitung</strong> neuer Mitarbeiter.</li></ul>'+
        '<p><strong>Was dokumentiert wird:</strong> Netzplan und IP-Konzept · Inventarverzeichnis mit Seriennummern, Standort und Verantwortlichem · Konfigurationen und Änderungshistorie · Benutzer- und Rechtekonzept · Lizenznachweise · Betriebshandbuch für den Normalbetrieb · <strong>Notfallhandbuch</strong> für den Ausfall · Wartungsverträge und Ansprechpartner.</p>'+
        '<p>Das <strong>Notfallhandbuch</strong> hat eine Besonderheit, die gern geprüft wird: Es muss <strong>auch ohne funktionierende IT verfügbar</strong> sein. Ein Notfallplan, der nur im ausgefallenen Intranet liegt, ist wertlos — deshalb zusätzlich ausgedruckt und an einem definierten Ort hinterlegt.</p>'+
        '<p><strong>Anforderungen an gute Dokumentation:</strong> aktuell, vollständig, verständlich, auffindbar, versioniert und mit klarer Zuständigkeit für die Pflege.</p>',
      code:
        "INVENTARDATENSATZ - Mindestangaben\n\n"+
        "  Inventarnummer         IT-2026-0147\n"+
        "  Geraetetyp / Modell    Notebook, Hersteller XY 14 Zoll\n"+
        "  Seriennummer           SN-4471-88-C\n"+
        "  Anschaffungsdatum      2026-03-14\n"+
        "  Anschaffungswert       1.240,00 EUR netto\n"+
        "  Garantie bis           2029-03-13\n"+
        "  Standort / Raum        Gebaeude B, Raum 2.14\n"+
        "  Zugeordnete Person     Kostenstelle 4200\n"+
        "  MAC-Adresse            a4:1f:72:9c:03:5e\n"+
        "  Installierte Software  mit Lizenzschluessel-Referenz\n"+
        "  Status                 im Einsatz / Lager / ausgemustert\n\n"+
        "  Nutzen: Lizenznachweis, Abschreibung, Garantieabwicklung,\n"+
        "  Diebstahlnachweis, Planung der Ersatzbeschaffung.",
      codeLang:'Inventarisierung',
      tip:'Wenn eine Aufgabe nach dem Nutzen der Inventarisierung fragt, denke über die Technik hinaus. Das Verzeichnis dient zugleich der Buchhaltung für die Abschreibung, der Rechtsabteilung für den Lizenznachweis und dem Einkauf für die Planung der Ersatzbeschaffung. Wer diese drei nicht-technischen Zwecke nennt, hebt sich von der Standardantwort ab.',
      quiz:[
        {q:'Warum muss das Notfallhandbuch auch in Papierform vorliegen?', options:['Aus rechtlichen Gründen','Weil es bei einem IT-Ausfall sonst nicht zugänglich ist','Weil Papier länger hält'], correct:1, explain:'Ein Plan im ausgefallenen System ist im Ernstfall wertlos.'},
        {q:'Welcher nicht-technische Zweck wird durch die Inventarisierung erfüllt?', options:['Die Abschreibung in der Buchhaltung','Die Netzwerkkonfiguration','Die Virenabwehr'], correct:0, explain:'Ebenso Lizenznachweis, Garantieabwicklung und Ersatzplanung.'},
        {q:'Welche Angabe fehlt in keinem Inventardatensatz?', options:['Die Lieblingsfarbe des Nutzers','Inventarnummer, Seriennummer und Standort','Der Name des Einkäufers'], correct:1, explain:'Sie dienen Lizenznachweis, Abschreibung, Garantieabwicklung und Diebstahlnachweis.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m28', part:9, partTitle:'Künstliche Intelligenz', relevanz:'hoch', title:'KI-Grundlagen & Lernverfahren',
  lessons:[
    {
      id:'m28-l1', title:'KI, maschinelles Lernen und Deep Learning abgrenzen', minutes:9,
      body:
        '<p>Die drei Begriffe werden im Alltag synonym verwendet, in der Prüfung nicht. Sie stehen zueinander wie <strong>ineinander liegende Kreise</strong>:</p>'+
        '<ul><li><strong>Künstliche Intelligenz (KI)</strong> ist der Oberbegriff für alle Verfahren, mit denen Maschinen Aufgaben lösen, die beim Menschen Intelligenz erfordern. Dazu zählen auch klassische regelbasierte Expertensysteme ohne jedes Lernen.</li>'+
        '<li><strong>Maschinelles Lernen (ML)</strong> ist eine Teilmenge davon: Das System lernt <em>aus Daten</em>, statt explizit programmiert zu werden. Nicht die Regel wird vorgegeben, sondern Beispiele — das Modell leitet die Regel selbst ab.</li>'+
        '<li><strong>Deep Learning</strong> ist wiederum eine Teilmenge des ML: Es nutzt <strong>künstliche neuronale Netze mit vielen Schichten</strong>. Es braucht sehr viele Daten und viel Rechenleistung, kann dafür aber die relevanten Merkmale selbst finden.</li></ul>'+
        '<figure class="fig"><svg viewBox="0 0 560 230" role="img" aria-label="Künstliche Intelligenz enthält maschinelles Lernen, dieses enthält Deep Learning">'+
        '<rect class="s-box" x="20" y="18" width="520" height="194" rx="12"/>'+
        '<text class="s-lbl" x="34" y="40">KÜNSTLICHE INTELLIGENZ</text>'+
        '<text class="s-lbl" x="34" y="56">regelbasierte Systeme, Suchverfahren, Planung</text>'+
        '<rect class="s-accent" x="46" y="68" width="468" height="128" rx="10"/>'+
        '<text class="s-lbl" x="60" y="90">MASCHINELLES LERNEN</text>'+
        '<text class="s-lbl" x="60" y="106">lernt aus Daten: Entscheidungsbaum, SVM, Clustering</text>'+
        '<rect class="s-strong" x="72" y="118" width="416" height="62" rx="8"/>'+
        '<text class="s-lbl" x="86" y="140">DEEP LEARNING</text>'+
        '<text class="s-lbl" x="86" y="158">mehrschichtige neuronale Netze, LLM, Bilderkennung</text>'+
        '</svg><figcaption>Jeder Begriff ist eine echte Teilmenge des größeren — nicht jede KI lernt, und nicht jedes lernende System ist ein neuronales Netz.</figcaption></figure>'+
        '<p>Die klassische Frage lautet: „Ist ein Schachprogramm mit fest einprogrammierten Eröffnungsregeln KI?" Antwort: <strong>Ja</strong>, es ist regelbasierte KI — aber kein maschinelles Lernen, weil es nichts aus Daten ableitet.</p>',
      code:
        "Regelbasiert (klassische KI):\n"+
        "  WENN Temperatur > 80 UND Druck > 5 DANN Alarm ausloesen\n"+
        "  -> Der Mensch schreibt die Regel. Nachvollziehbar, aber starr.\n\n"+
        "Maschinelles Lernen:\n"+
        "  Eingabe: 50.000 Messreihen, jeweils markiert mit \"Stoerung ja/nein\"\n"+
        "  -> Das Modell findet selbst heraus, welche Kombination aus\n"+
        "     Temperatur, Druck, Vibration und Laufzeit auf eine Stoerung\n"+
        "     hindeutet - auch Zusammenhaenge, die niemand vermutet haette.\n\n"+
        "Der Unterschied in einem Satz:\n"+
        "  Klassisch : Mensch gibt Regel -> Maschine wendet an\n"+
        "  ML        : Mensch gibt Beispiele -> Maschine findet Regel",
      codeLang:'Abgrenzung',
      tip:'Wenn eine Prüfungsaufgabe nach der Abgrenzung fragt, reicht die Aufzählung der drei Begriffe nicht — gefragt ist die Teilmengenbeziehung. Formuliere sie ausdrücklich: Deep Learning ist eine Teilmenge des maschinellen Lernens, und dieses wiederum eine Teilmenge der künstlichen Intelligenz. Nenne dazu je ein Beispiel, das nur in der äußeren Schicht liegt, etwa ein regelbasiertes Expertensystem.',
      quiz:[
        {q:'Wie verhalten sich KI, ML und Deep Learning zueinander?', options:['Es sind drei getrennte Fachgebiete','Deep Learning ⊂ ML ⊂ KI','KI ist eine Teilmenge des maschinellen Lernens'], correct:1, explain:'Ineinander liegende Teilmengen – KI ist der weiteste Begriff.'},
        {q:'Ist ein regelbasiertes Expertensystem maschinelles Lernen?', options:['Ja, jedes KI-System lernt','Nein, es wendet vom Menschen formulierte Regeln an','Nur wenn es viele Regeln hat'], correct:1, explain:'ML setzt voraus, dass das System die Regel selbst aus Daten ableitet.'},
        {q:'Ein Schachprogramm mit fest einprogrammierten Eröffnungsregeln — ist das KI?', options:['Nein, es lernt nicht','Ja, regelbasierte KI — aber kein maschinelles Lernen','Nur wenn es gewinnt'], correct:1, explain:'KI ist der Oberbegriff; ML setzt voraus, dass die Regel aus Daten abgeleitet wird.'}
      ]
    },
    {
      id:'m28-l2', title:'Die drei Lernarten', minutes:10,
      body:
        '<p>Diese Einteilung ist die meistgeprüfte KI-Frage überhaupt. Das Unterscheidungsmerkmal ist, <strong>ob die richtige Antwort in den Trainingsdaten mitgeliefert wird</strong>.</p>'+
        '<table class="lesson-table"><tr><th>Lernart</th><th>Trainingsdaten</th><th>Ziel</th><th>Beispiel</th></tr>'+
        '<tr><td><strong>Überwacht</strong><br>(supervised)</td><td>mit Label, also mit bekannter richtiger Antwort</td><td>Klassifikation oder Regression</td><td>Spam-Erkennung, Preisvorhersage, Bilderkennung</td></tr>'+
        '<tr><td><strong>Unüberwacht</strong><br>(unsupervised)</td><td>ohne Label</td><td>Muster und Gruppen finden</td><td>Kundensegmentierung, Anomalieerkennung, Warenkorbanalyse</td></tr>'+
        '<tr><td><strong>Bestärkend</strong><br>(reinforcement)</td><td>keine, stattdessen Belohnung und Bestrafung</td><td>optimale Handlungsstrategie</td><td>Robotersteuerung, Spiele, Lagerlogistik</td></tr></table>'+
        '<figure class="fig"><svg viewBox="0 0 580 210" role="img" aria-label="Drei Lernarten im Vergleich">'+
        '<rect class="s-accent" x="14" y="26" width="172" height="164" rx="10"/>'+
        '<text class="s-hd" x="28" y="50">ÜBERWACHT</text>'+
        '<text class="s-lbl" x="28" y="76">Eingabe + richtige</text><text class="s-lbl" x="28" y="92">Antwort (Label)</text>'+
        '<text class="s-mono" x="28" y="118">Bild → &quot;Katze&quot;</text>'+
        '<text class="s-mono" x="28" y="136">Bild → &quot;Hund&quot;</text>'+
        '<text class="s-lbl" x="28" y="168">→ Klassifikation,</text><text class="s-lbl" x="28" y="182">Regression</text>'+
        '<rect class="s-box" x="200" y="26" width="172" height="164" rx="10"/>'+
        '<text class="s-hd" x="214" y="50">UNÜBERWACHT</text>'+
        '<text class="s-lbl" x="214" y="76">nur Eingabe,</text><text class="s-lbl" x="214" y="92">kein Label</text>'+
        '<circle class="s-dot" cx="228" cy="120" r="5"/><circle class="s-dot" cx="244" cy="128" r="5"/><circle class="s-dot" cx="236" cy="138" r="5"/>'+
        '<circle class="s-dot2" cx="304" cy="118" r="5"/><circle class="s-dot2" cx="320" cy="130" r="5"/><circle class="s-dot2" cx="308" cy="140" r="5"/>'+
        '<text class="s-lbl" x="214" y="168">→ Cluster, Anomalien</text><text class="s-lbl" x="214" y="182">selbst gefunden</text>'+
        '<rect class="s-box" x="386" y="26" width="180" height="164" rx="10"/>'+
        '<text class="s-hd" x="400" y="50">BESTÄRKEND</text>'+
        '<text class="s-lbl" x="400" y="76">Aktion → Belohnung</text><text class="s-lbl" x="400" y="92">oder Bestrafung</text>'+
        '<text class="s-mono" x="400" y="118">Zug → +1</text>'+
        '<text class="s-mono" x="400" y="136">Zug → −1</text>'+
        '<text class="s-lbl" x="400" y="168">→ optimale</text><text class="s-lbl" x="400" y="182">Handlungsstrategie</text>'+
        '</svg><figcaption>Die Leitfrage: Steht die richtige Antwort in den Trainingsdaten? Ja = überwacht, nein = unüberwacht, stattdessen Belohnung = bestärkend.</figcaption></figure>'+
        '<p><strong>Klassifikation oder Regression?</strong> Beides ist überwachtes Lernen, der Unterschied liegt in der Ausgabe: <strong>Klassifikation</strong> liefert eine Kategorie („Spam" oder „kein Spam"), <strong>Regression</strong> einen Zahlenwert (Preis in Euro, Temperatur in Grad).</p>',
      code:
        "Zuordnungsaufgaben aus AP1-Sicht:\n\n"+
        "  \"Aus 40.000 markierten E-Mails Spam erkennen\"\n"+
        "     -> UEBERWACHT, Klassifikation (Label liegt vor)\n\n"+
        "  \"Kunden ohne Vorgaben in aehnliche Gruppen einteilen\"\n"+
        "     -> UNUEBERWACHT, Clustering (keine Zielvorgabe)\n\n"+
        "  \"Aus historischen Daten den Umsatz im naechsten Quartal schaetzen\"\n"+
        "     -> UEBERWACHT, Regression (Zahlenwert als Ausgabe)\n\n"+
        "  \"Ein Lagerroboter soll den kuerzesten Weg selbst lernen,\n"+
        "   kurze Wege werden belohnt, Kollisionen bestraft\"\n"+
        "     -> BESTAERKEND\n\n"+
        "  \"Ungewoehnliche Zahlungsvorgaenge auffallen lassen,\n"+
        "   ohne dass bekannt ist, wie Betrug aussieht\"\n"+
        "     -> UNUEBERWACHT, Anomalieerkennung",
      codeLang:'Zuordnung',
      tip:'Zwei Signalwörter entscheiden die Zuordnung fast immer. Steht in der Aufgabe „markiert", „klassifiziert", „bekannte Ergebnisse" oder „historische Daten mit Ausgang", ist es überwachtes Lernen. Steht dort „ohne Vorgabe", „selbst gruppieren", „unbekannte Muster" oder „auffällige Abweichungen", ist es unüberwachtes. Und sobald von Belohnung, Punkten oder Versuch und Irrtum die Rede ist, handelt es sich um bestärkendes Lernen.',
      quiz:[
        {q:'Kunden sollen ohne Vorgaben in Gruppen eingeteilt werden. Welche Lernart?', options:['Überwachtes Lernen','Unüberwachtes Lernen (Clustering)','Bestärkendes Lernen'], correct:1, explain:'Es gibt kein Label – das Modell findet die Gruppen selbst.'},
        {q:'Was unterscheidet Klassifikation von Regression?', options:['Klassifikation liefert eine Kategorie, Regression einen Zahlenwert','Regression ist unüberwacht','Klassifikation braucht keine Trainingsdaten'], correct:0, explain:'Beides ist überwachtes Lernen, nur die Art der Ausgabe unterscheidet sich.'},
        {q:'Ein Modell soll die Restlaufzeit einer Maschine in Stunden schätzen. Was ist das?', options:['Klassifikation','Regression','Clustering'], correct:1, explain:'Überwachtes Lernen mit einem Zahlenwert als Ausgabe.'}
      ]
    },
    {
      id:'m28-l3', title:'Neuronale Netze und der Trainingsablauf', minutes:9,
      body:
        '<p>Ein <strong>künstliches neuronales Netz</strong> besteht aus Schichten von Neuronen. Jede Verbindung trägt ein <strong>Gewicht</strong>, und genau diese Gewichte sind das, was gelernt wird.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 240" role="img" aria-label="Neuronales Netz mit Eingabeschicht, zwei verborgenen Schichten und Ausgabeschicht">'+
        '<g class="s-net">'+
        '<line x1="112" y1="60" x2="232" y2="48"/><line x1="112" y1="60" x2="232" y2="108"/><line x1="112" y1="60" x2="232" y2="168"/>'+
        '<line x1="112" y1="120" x2="232" y2="48"/><line x1="112" y1="120" x2="232" y2="108"/><line x1="112" y1="120" x2="232" y2="168"/>'+
        '<line x1="112" y1="180" x2="232" y2="48"/><line x1="112" y1="180" x2="232" y2="108"/><line x1="112" y1="180" x2="232" y2="168"/>'+
        '<line x1="232" y1="48" x2="352" y2="80"/><line x1="232" y1="48" x2="352" y2="140"/>'+
        '<line x1="232" y1="108" x2="352" y2="80"/><line x1="232" y1="108" x2="352" y2="140"/>'+
        '<line x1="232" y1="168" x2="352" y2="80"/><line x1="232" y1="168" x2="352" y2="140"/>'+
        '<line x1="352" y1="80" x2="464" y2="110"/><line x1="352" y1="140" x2="464" y2="110"/>'+
        '</g>'+
        '<circle class="s-neuron" cx="112" cy="60" r="15"/><circle class="s-neuron" cx="112" cy="120" r="15"/><circle class="s-neuron" cx="112" cy="180" r="15"/>'+
        '<circle class="s-neuron2" cx="232" cy="48" r="15"/><circle class="s-neuron2" cx="232" cy="108" r="15"/><circle class="s-neuron2" cx="232" cy="168" r="15"/>'+
        '<circle class="s-neuron2" cx="352" cy="80" r="15"/><circle class="s-neuron2" cx="352" cy="140" r="15"/>'+
        '<circle class="s-neuron3" cx="464" cy="110" r="15"/>'+
        '<text class="s-lbl" x="112" y="212" text-anchor="middle">Eingabe</text>'+
        '<text class="s-lbl" x="292" y="212" text-anchor="middle">verborgene Schichten</text>'+
        '<text class="s-lbl" x="464" y="212" text-anchor="middle">Ausgabe</text>'+
        '<text class="s-lbl" x="20" y="64">Alter</text><text class="s-lbl" x="20" y="124">Betrag</text><text class="s-lbl" x="20" y="184">Uhrzeit</text>'+
        '<text class="s-lbl" x="492" y="114">Betrug?</text>'+
        '</svg><figcaption>Jede Linie trägt ein Gewicht. Beim Training werden diese Gewichte so lange angepasst, bis die Ausgabe möglichst oft stimmt.</figcaption></figure>'+
        '<p><strong>Der Trainingsablauf in fünf Schritten:</strong></p>'+
        '<ol><li><strong>Daten sammeln und aufbereiten</strong> — bereinigen, vereinheitlichen, fehlende Werte behandeln. Das ist in der Praxis der größte Zeitanteil.</li>'+
        '<li><strong>Aufteilen</strong> in Trainingsdaten, Validierungsdaten und Testdaten (typisch 70 / 15 / 15 Prozent).</li>'+
        '<li><strong>Trainieren</strong> — die Gewichte werden schrittweise angepasst, um den Fehler zu verringern.</li>'+
        '<li><strong>Validieren und nachjustieren</strong> — Modellwahl und Parameter optimieren.</li>'+
        '<li><strong>Testen</strong> mit den bis dahin ungenutzten Testdaten und anschließend in Betrieb nehmen.</li></ol>'+
        '<p>Warum die Trennung zwingend ist: Ein Modell, das auf denselben Daten getestet wird, mit denen es trainiert wurde, sieht immer gut aus — es hat die Antworten schlicht auswendig gelernt.</p>',
      code:
        "AUFTEILUNG DER DATEN - und warum\n\n"+
        "  Trainingsdaten   ca. 70 %  -> das Modell lernt daran\n"+
        "  Validierungsdaten ca. 15 % -> Modellwahl und Feinjustierung\n"+
        "  Testdaten         ca. 15 % -> einmalige, ehrliche Endbewertung\n\n"+
        "  Die Testdaten duerfen das Modell waehrend des gesamten\n"+
        "  Trainings NIE gesehen haben. Sonst misst man das Gedaechtnis\n"+
        "  des Modells, nicht seine Faehigkeit zu verallgemeinern.\n\n"+
        "TYPISCHE GUETEMASSE bei Klassifikation\n"+
        "  Genauigkeit (Accuracy) = richtige Vorhersagen / alle Vorhersagen\n\n"+
        "  Vorsicht bei unausgewogenen Daten: Wenn nur 1 % der Faelle\n"+
        "  Betrug sind, erreicht ein Modell, das IMMER \"kein Betrug\"\n"+
        "  sagt, 99 % Genauigkeit - und ist voellig wertlos.",
      codeLang:'Training',
      tip:'Das Beispiel mit den 99 Prozent Genauigkeit ist die stärkste Antwort auf die Frage, warum eine einzelne Kennzahl nicht genügt. Bei seltenen Ereignissen — Betrug, Ausfall, Krankheit — ist Accuracy irreführend, weil die Mehrheitsklasse das Ergebnis dominiert. Wer das in einer Prüfung erwähnt, zeigt, dass er die Kennzahl versteht und nicht nur kennt.',
      quiz:[
        {q:'Was wird beim Training eines neuronalen Netzes angepasst?', options:['Die Anzahl der Neuronen','Die Gewichte der Verbindungen','Die Trainingsdaten'], correct:1, explain:'Die Netzarchitektur steht vorher fest, gelernt werden die Gewichte.'},
        {q:'Warum dürfen Testdaten nicht zum Training verwendet werden?', options:['Aus Datenschutzgründen','Weil das Ergebnis sonst nur das Auswendiglernen misst','Weil es zu lange dauert'], correct:1, explain:'Nur ungesehene Daten zeigen, ob das Modell verallgemeinern kann.'},
        {q:'Wozu dienen die Validierungsdaten?', options:['Zum Trainieren','Zur Modellwahl und Feinjustierung vor dem finalen Test','Zur Archivierung'], correct:1, explain:'Die Testdaten bleiben bis zur Endbewertung unangetastet.'}
      ]
    },
    {
      id:'m28-l4', title:'Overfitting, Bias und Datenqualität', minutes:9,
      body:
        '<p>Die drei häufigsten Fehlerquellen eines KI-Projekts sind keine Programmierfehler, sondern Datenprobleme.</p>'+
        '<p><strong>Overfitting (Überanpassung)</strong> — das Modell lernt die Trainingsdaten <em>auswendig</em>, samt ihrer Zufälligkeiten. Erkennungszeichen: sehr gutes Ergebnis auf den Trainingsdaten, deutlich schlechteres auf den Testdaten. Gegenmittel: mehr und vielfältigere Daten, einfacheres Modell, frühzeitiger Abbruch des Trainings, Kreuzvalidierung.</p>'+
        '<p><strong>Underfitting (Unteranpassung)</strong> — das Modell ist zu einfach und erkennt das Muster gar nicht erst. Es schneidet auf <em>beiden</em> Datensätzen schlecht ab.</p>'+
        '<figure class="fig"><svg viewBox="0 0 580 190" role="img" aria-label="Underfitting, gute Anpassung und Overfitting im Vergleich">'+
        '<g>'+
        '<rect class="s-box" x="14" y="20" width="172" height="130" rx="8"/>'+
        '<circle class="s-dot" cx="44" cy="118"  r="4"/><circle class="s-dot" cx="68" cy="100" r="4"/><circle class="s-dot" cx="88" cy="106" r="4"/>'+
        '<circle class="s-dot" cx="108" cy="72" r="4"/><circle class="s-dot" cx="132" cy="78" r="4"/><circle class="s-dot" cx="156" cy="50" r="4"/>'+
        '<line class="s-fit" x1="34" y1="122" x2="168" y2="60"/>'+
        '<text class="s-hd" x="100" y="40" text-anchor="middle">UNDERFITTING</text>'+
        '<text class="s-lbl" x="100" y="172" text-anchor="middle">zu einfach — trifft nichts</text>'+
        '</g><g>'+
        '<rect class="s-accent" x="202" y="20" width="172" height="130" rx="8"/>'+
        '<circle class="s-dot" cx="232" cy="118" r="4"/><circle class="s-dot" cx="256" cy="100" r="4"/><circle class="s-dot" cx="276" cy="106" r="4"/>'+
        '<circle class="s-dot" cx="296" cy="72" r="4"/><circle class="s-dot" cx="320" cy="78" r="4"/><circle class="s-dot" cx="344" cy="50" r="4"/>'+
        '<path class="s-fit2" d="M222 124 Q 288 96 362 52"/>'+
        '<text class="s-hd" x="288" y="40" text-anchor="middle">GUTE ANPASSUNG</text>'+
        '<text class="s-lbl" x="288" y="172" text-anchor="middle">Trend erfasst, Rauschen ignoriert</text>'+
        '</g><g>'+
        '<rect class="s-box" x="390" y="20" width="176" height="130" rx="8"/>'+
        '<circle class="s-dot" cx="420" cy="118" r="4"/><circle class="s-dot" cx="444" cy="100" r="4"/><circle class="s-dot" cx="464" cy="106" r="4"/>'+
        '<circle class="s-dot" cx="484" cy="72" r="4"/><circle class="s-dot" cx="508" cy="78" r="4"/><circle class="s-dot" cx="532" cy="50" r="4"/>'+
        '<path class="s-fit3" d="M414 126 L420 118 L444 100 L464 106 L484 72 L508 78 L532 50 L548 46"/>'+
        '<text class="s-hd" x="478" y="40" text-anchor="middle">OVERFITTING</text>'+
        '<text class="s-lbl" x="478" y="172" text-anchor="middle">jeden Punkt getroffen — auswendig</text>'+
        '</g></svg><figcaption>Rechts sitzt die Linie exakt auf jedem Trainingspunkt — und versagt trotzdem bei neuen Daten, weil sie auch das Rauschen gelernt hat.</figcaption></figure>'+
        '<p><strong>Bias (Verzerrung)</strong> — das Modell übernimmt Verzerrungen aus den Trainingsdaten und verstärkt sie. Sind in historischen Bewerbungsdaten überwiegend Männer eingestellt worden, lernt das Modell genau dieses Muster als „Erfolgsmerkmal". Die Technik ist dabei fehlerfrei; das Problem liegt in den Daten.</p>'+
        '<p><strong>Der Grundsatz</strong>, der jede KI-Aufgabe beantwortet: <strong>Garbage in, garbage out.</strong> Die Qualität der Trainingsdaten begrenzt die Qualität des Modells. Kriterien für gute Daten: Vollständigkeit, Aktualität, Korrektheit, Repräsentativität, Ausgewogenheit und ausreichende Menge.</p>',
      code:
        "OVERFITTING ERKENNEN\n\n"+
        "  Genauigkeit auf Trainingsdaten : 99,2 %\n"+
        "  Genauigkeit auf Testdaten      : 71,5 %\n"+
        "  -> grosse Luecke = klares Overfitting\n\n"+
        "  Gegenmassnahmen:\n"+
        "   - mehr und vielfaeltigere Trainingsdaten\n"+
        "   - einfacheres Modell (weniger Parameter)\n"+
        "   - Training frueher beenden (Early Stopping)\n"+
        "   - Kreuzvalidierung\n\n"+
        "UNDERFITTING ERKENNEN\n"+
        "  Training 64 %, Test 62 %  -> beides schlecht, Modell zu einfach\n\n"+
        "BIAS VERMEIDEN\n"+
        "   - Datensatz auf Ausgewogenheit pruefen (Alter, Geschlecht,\n"+
        "     Herkunft, Region)\n"+
        "   - sensible Merkmale gezielt ausschliessen oder pruefen\n"+
        "   - Ergebnisse nach Gruppen getrennt auswerten\n"+
        "   - menschliche Kontrolle bei folgenreichen Entscheidungen",
      codeLang:'Fehlerquellen',
      tip:'Die Unterscheidung von Overfitting und Underfitting gelingt über einen einzigen Vergleich: Stelle Trainings- und Testgenauigkeit nebeneinander. Klaffen sie weit auseinander, liegt Overfitting vor. Sind beide schlecht, ist es Underfitting. Wenn eine Prüfungsaufgabe dir zwei Prozentwerte nennt, ist genau das die erwartete Auswertung — und die Gegenmaßnahme gehört in dieselbe Antwort.',
      quiz:[
        {q:'Training 98 %, Test 69 %. Was liegt vor?', options:['Underfitting','Overfitting','Ein gutes Modell'], correct:1, explain:'Die große Lücke zeigt, dass die Trainingsdaten auswendig gelernt wurden.'},
        {q:'Woher stammt Bias in einem KI-Modell meistens?', options:['Aus Programmierfehlern','Aus verzerrten oder unausgewogenen Trainingsdaten','Aus zu schneller Hardware'], correct:1, explain:'Das Modell reproduziert und verstärkt, was in den Daten steckt.'},
        {q:'Von 8.000 Bildern zeigen 240 einen Fehler. Welche Genauigkeit erreicht ein Modell, das immer „kein Fehler" sagt?', options:['3 %','97 %','50 %'], correct:1, explain:'Deshalb ist Accuracy bei seltenen Ereignissen irreführend — Recall ist die richtige Kennzahl.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m29', part:9, partTitle:'Künstliche Intelligenz', relevanz:'hoch', title:'KI im Unternehmen',
  lessons:[
    {
      id:'m29-l1', title:'Große Sprachmodelle verstehen und einsetzen', minutes:9,
      body:
        '<p>Ein <strong>Large Language Model (LLM)</strong> ist ein neuronales Netz, das auf sehr großen Textmengen trainiert wurde. Seine eigentliche Aufgabe ist erstaunlich einfach: Es sagt vorher, <strong>welches Token am wahrscheinlichsten als Nächstes folgt</strong>. Ein <strong>Token</strong> ist dabei ein Wortstück, im Deutschen etwa 0,7 Wörter.</p>'+
        '<p>Daraus folgt die wichtigste Eigenschaft für die Praxis: Ein LLM <strong>weiß nichts</strong>, es berechnet Wahrscheinlichkeiten. Deshalb kann es flüssige, überzeugend klingende Texte erzeugen, die inhaltlich falsch sind — das nennt man <strong>Halluzination</strong>.</p>'+
        '<p><strong>Begriffe, die geprüft werden:</strong></p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Bedeutung</th></tr>'+
        '<tr><td><strong>Prompt</strong></td><td>die Eingabe, mit der das Modell gesteuert wird</td></tr>'+
        '<tr><td><strong>Token</strong></td><td>kleinste Verarbeitungseinheit; Abrechnung erfolgt meist je Token</td></tr>'+
        '<tr><td><strong>Kontextfenster</strong></td><td>wie viele Token das Modell gleichzeitig berücksichtigen kann</td></tr>'+
        '<tr><td><strong>Halluzination</strong></td><td>eine erfundene, aber plausibel formulierte Aussage</td></tr>'+
        '<tr><td><strong>Fine-Tuning</strong></td><td>Nachtraining eines Modells mit eigenen Daten</td></tr>'+
        '<tr><td><strong>RAG</strong></td><td>Retrieval Augmented Generation: eigene Dokumente werden zur Frage dazugeladen, statt das Modell nachzutrainieren</td></tr></table>'+
        '<p><strong>Ein guter Prompt</strong> enthält vier Bestandteile: <strong>Rolle</strong> („Du bist Fachinformatiker im Support"), <strong>Aufgabe</strong>, <strong>Kontext</strong> (Randbedingungen, Zielgruppe) und <strong>Format</strong> (Länge, Struktur, Beispiel).</p>',
      code:
        "SCHWACHER PROMPT\n"+
        "  \"Schreib was ueber Backups.\"\n\n"+
        "GUTER PROMPT\n"+
        "  Rolle:   Du bist Systemadministrator in einem Betrieb mit\n"+
        "           25 Mitarbeitern.\n"+
        "  Aufgabe: Erstelle ein Backup-Konzept.\n"+
        "  Kontext: Ein Dateiserver mit 2 TB, eine Warenwirtschaft mit\n"+
        "           Datenbank, Budget unter 3.000 EUR, kein eigenes\n"+
        "           Rechenzentrum.\n"+
        "  Format:  Tabelle mit Spalten Datenquelle, Sicherungsart,\n"+
        "           Intervall, Aufbewahrung, Medium. Danach fuenf Saetze\n"+
        "           Begruendung.\n\n"+
        "FINE-TUNING ODER RAG?\n"+
        "  Fine-Tuning: teuer, aufwendig, sinnvoll fuer Stil und Format\n"+
        "  RAG        : guenstig, Inhalte jederzeit aktualisierbar,\n"+
        "               Quellen nachweisbar - fuer Firmenwissen die\n"+
        "               fast immer bessere Wahl",
      codeLang:'Prompting',
      tip:'Die Abgrenzung von Fine-Tuning und RAG ist die praxisnächste KI-Frage, die in einer Prüfung auftauchen kann. Der Merksatz: Fine-Tuning ändert, wie das Modell antwortet, RAG ändert, worüber es antwortet. Wenn ein Unternehmen sein eigenes Handbuchwissen nutzbar machen will, ist RAG richtig — die Dokumente bleiben aktualisierbar, und das Modell kann seine Quelle nennen.',
      quiz:[
        {q:'Was ist eine Halluzination bei einem Sprachmodell?', options:['Ein Programmabsturz','Eine erfundene, aber plausibel formulierte Aussage','Ein Datenschutzverstoß'], correct:1, explain:'Das Modell berechnet Wahrscheinlichkeiten, es prüft keine Fakten.'},
        {q:'Ein Unternehmen will interne Handbücher per KI durchsuchbar machen. Was ist geeigneter?', options:['Fine-Tuning des Modells','RAG – die Dokumente werden zur Anfrage dazugeladen','Ein größeres Kontextfenster kaufen'], correct:1, explain:'RAG ist günstiger, aktualisierbar und erlaubt Quellenangaben.'},
        {q:'Was ändert Fine-Tuning im Unterschied zu RAG?', options:['Worüber das Modell antwortet','Wie das Modell antwortet — Stil und Format','Gar nichts'], correct:1, explain:'RAG lädt eigene Dokumente zur Anfrage dazu und ändert damit den Inhalt.'}
      ]
    },
    {
      id:'m29-l2', title:'Einsatzszenarien und Wirtschaftlichkeit', minutes:9,
      body:
        '<p>Bei „Nennen Sie Einsatzmöglichkeiten von KI im Unternehmen" wird eine <strong>strukturierte</strong> Antwort erwartet, nicht eine Aufzählung von Produktnamen. Ordne nach Unternehmensbereich:</p>'+
        '<table class="lesson-table"><tr><th>Bereich</th><th>Anwendung</th><th>Nutzen</th></tr>'+
        '<tr><td>Kundenservice</td><td>Chatbot, automatische Ticketklassifikation</td><td>Entlastung im First Level, kürzere Reaktionszeiten</td></tr>'+
        '<tr><td>Produktion</td><td><strong>Predictive Maintenance</strong></td><td>Wartung vor dem Ausfall statt danach</td></tr>'+
        '<tr><td>Qualitätssicherung</td><td>Bilderkennung zur Fehlerprüfung</td><td>gleichbleibende Prüfqualität, höherer Durchsatz</td></tr>'+
        '<tr><td>Vertrieb</td><td>Absatzprognose, Empfehlungssysteme</td><td>bessere Disposition, weniger Lagerkosten</td></tr>'+
        '<tr><td>Verwaltung</td><td>Dokumentenklassifikation, Rechnungsauslesen</td><td>weniger manuelle Erfassung</td></tr>'+
        '<tr><td>IT-Sicherheit</td><td>Anomalieerkennung im Netzverkehr</td><td>Angriffe werden früher sichtbar</td></tr>'+
        '<tr><td>Entwicklung</td><td>Codevorschläge, Testfallgenerierung</td><td>schnellere Umsetzung, mehr Testabdeckung</td></tr></table>'+
        '<p><strong>Chancen:</strong> Zeitersparnis bei Routineaufgaben, gleichbleibende Qualität, Verarbeitung großer Datenmengen, Verfügbarkeit rund um die Uhr, Mitarbeiter werden von monotoner Arbeit entlastet.</p>'+
        '<p><strong>Risiken:</strong> fehlerhafte Ergebnisse ohne erkennbare Warnung, Datenschutz- und Geheimnisverrat durch Eingabe in externe Dienste, Abhängigkeit vom Anbieter, Akzeptanzprobleme bei Mitarbeitern, hohe Einführungskosten, fehlende Nachvollziehbarkeit der Entscheidungen.</p>',
      code:
        "WIRTSCHAFTLICHKEIT EINER KI-LOESUNG\n\n"+
        "  Ausgangslage: 3 Mitarbeiter erfassen Eingangsrechnungen,\n"+
        "  zusammen 26 Stunden pro Woche zu je 42 EUR Vollkosten.\n\n"+
        "  Kosten heute:\n"+
        "     26 h x 42 EUR x 46 Arbeitswochen = 50.232 EUR pro Jahr\n\n"+
        "  KI-gestuetzte Belegerkennung:\n"+
        "     Lizenz              680 EUR/Monat x 12 =  8.160 EUR/Jahr\n"+
        "     Einfuehrung, einmalig                  = 14.500 EUR\n"+
        "     Restaufwand Pruefung: 7 h/Woche\n"+
        "        7 x 42 x 46                         = 13.524 EUR/Jahr\n\n"+
        "  Laufende Kosten neu: 8.160 + 13.524 = 21.684 EUR/Jahr\n"+
        "  Jaehrliche Einsparung: 50.232 - 21.684 = 28.548 EUR\n\n"+
        "  Amortisation: 14.500 / 28.548 = 0,51 Jahre\n"+
        "                = rund 6 Monate\n\n"+
        "  ABER: Die Einsparung entsteht nur, wenn die frei werdende\n"+
        "  Arbeitszeit tatsaechlich anders genutzt oder abgebaut wird.\n"+
        "  Das ist in der Begruendung ausdruecklich zu erwaehnen.",
      codeLang:'Wirtschaftlichkeit',
      tip:'Der Zusatz am Ende der Rechnung ist der Punkt, der eine gute von einer sehr guten Antwort trennt. Eingesparte Arbeitszeit ist keine eingesparte Geldsumme, solange die Mitarbeiter weiterbeschäftigt werden und die Zeit nicht anderweitig produktiv wird. Prüfer honorieren es, wenn du eine Rechnung machst und ihre Annahme gleich mit offenlegst.',
      quiz:[
        {q:'Was bezeichnet Predictive Maintenance?', options:['Wartung nach festem Zeitplan','Wartung auf Basis vorhergesagter Ausfälle','Wartung nach dem Ausfall'], correct:1, explain:'Sensordaten deuten auf eine bevorstehende Störung hin, bevor sie eintritt.'},
        {q:'Welches Risiko birgt die Nutzung eines externen KI-Dienstes besonders?', options:['Zu schnelle Antworten','Abfluss vertraulicher Daten in die Eingabe des Anbieters','Zu hohe Genauigkeit'], correct:1, explain:'Interne Dokumente können sonst beim Anbieter landen oder ins Training einfließen.'},
        {q:'Warum wird eingesparte Arbeitszeit nicht automatisch zu eingespartem Geld?', options:['Weil KI teuer ist','Weil die Mitarbeiter weiterbeschäftigt werden — die Zeit muss anderweitig produktiv werden','Wegen der Umsatzsteuer'], correct:1, explain:'Diese Annahme gehört in jede Wirtschaftlichkeitsrechnung ausdrücklich hinein.'}
      ]
    },
    {
      id:'m29-l3', title:'KI-Projekte planen und Daten bereitstellen', minutes:8,
      body:
        '<p>Ein KI-Projekt folgt einem eigenen Ablauf. Der verbreitetste Rahmen ist <strong>CRISP-DM</strong> mit sechs Phasen — er wird in Prüfungen auch ohne den Namen abgefragt:</p>'+
        '<ol><li><strong>Geschäftsverständnis</strong> — Was ist das Problem, und woran messen wir den Erfolg?</li>'+
        '<li><strong>Datenverständnis</strong> — Welche Daten gibt es, in welcher Qualität, wo liegen sie?</li>'+
        '<li><strong>Datenvorbereitung</strong> — Bereinigen, zusammenführen, transformieren. Nimmt typischerweise <strong>60 bis 80 Prozent</strong> des Aufwands ein.</li>'+
        '<li><strong>Modellierung</strong> — Verfahren auswählen und trainieren.</li>'+
        '<li><strong>Evaluation</strong> — Erfüllt das Ergebnis das fachliche Ziel? Nicht nur die technische Kennzahl zählt.</li>'+
        '<li><strong>Einsatz (Deployment)</strong> — In Betrieb nehmen, überwachen, nachtrainieren.</li></ol>'+
        '<p>Der Zyklus ist nicht linear: Aus jeder Phase kann ein Rücksprung nötig werden, meist zurück zu den Daten.</p>'+
        '<p><strong>Was oft übersehen wird:</strong> Ein Modell veraltet. Ändern sich die realen Verhältnisse — neue Produkte, neues Kundenverhalten, neue Betrugsmuster —, sinkt die Trefferquote schleichend. Das nennt man <strong>Model Drift</strong>. Deshalb gehören Überwachung und regelmäßiges Nachtraining fest zum Betrieb.</p>'+
        '<p><strong>Rollen im KI-Projekt:</strong> Fachbereich (kennt das Problem und bewertet die Ergebnisse), Data Engineer (beschafft und bereitet Daten auf), Data Scientist (wählt und trainiert das Modell), IT-Betrieb (Infrastruktur und Einsatz), Datenschutzbeauftragter (Zulässigkeit), Betriebsrat (Mitbestimmung bei Leistungs- und Verhaltenskontrolle).</p>',
      code:'',
      tip:'Die Zahl 60 bis 80 Prozent für die Datenvorbereitung ist ein dankbares Detail für Begründungsaufgaben. Wenn eine Aufgabe fragt, warum ein KI-Projekt länger dauert als erwartet, ist das die Antwort: Nicht das Trainieren des Modells kostet die Zeit, sondern das Zusammentragen, Bereinigen und Vereinheitlichen der Daten aus Systemen, die nie dafür gedacht waren. Der Hinweis auf die Mitbestimmung des Betriebsrats ist ebenfalls ein sicherer Zusatzpunkt.',
      quiz:[
        {q:'Welche Phase eines KI-Projekts verursacht typischerweise den größten Aufwand?', options:['Die Modellierung','Die Datenvorbereitung','Das Deployment'], correct:1, explain:'Bereinigen, Zusammenführen und Transformieren machen 60 bis 80 Prozent aus.'},
        {q:'Was bezeichnet Model Drift?', options:['Einen Speicherfehler','Das schleichende Nachlassen der Trefferquote, weil sich die Realität ändert','Eine Verschiebung der Serverlast'], correct:1, explain:'Gegenmittel sind laufende Überwachung und regelmäßiges Nachtraining.'},
        {q:'Wer sollte im KI-Projekt die Ergebnisqualität bewerten?', options:['Der Data Scientist','Der Fachbereich, der das Problem kennt','Der IT-Betrieb'], correct:1, explain:'Technische Kennzahlen allein sagen nichts über den fachlichen Nutzen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m30', part:9, partTitle:'Künstliche Intelligenz', relevanz:'hoch', title:'KI-Recht, Datenschutz & Ethik',
  lessons:[
    {
      id:'m30-l1', title:'Die Risikoklassen der KI-Verordnung', minutes:10,
      body:
        '<p>Die <strong>KI-Verordnung der EU (AI Act)</strong> ist seit 2024 in Kraft und gilt gestaffelt. Sie ist <strong>risikobasiert</strong> aufgebaut: Je höher das Risiko für Menschen, desto strenger die Pflichten. Diese vier Stufen sind der Kern jeder Prüfungsfrage zum Thema.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="Die vier Risikostufen der EU-KI-Verordnung als Pyramide">'+
        '<polygon class="s-risk1" points="280,14 348,72 212,72"/>'+
        '<polygon class="s-risk2" points="212,72 348,72 396,130 164,130"/>'+
        '<polygon class="s-risk3" points="164,130 396,130 444,188 116,188"/>'+
        '<polygon class="s-risk4" points="116,188 444,188 492,240 68,240"/>'+
        '<text class="s-hd" x="280" y="60" text-anchor="middle">VERBOTEN</text>'+
        '<text class="s-hd" x="280" y="108" text-anchor="middle">HOCHRISIKO</text>'+
        '<text class="s-hd" x="280" y="166" text-anchor="middle">BEGRENZTES RISIKO</text>'+
        '<text class="s-hd" x="280" y="222" text-anchor="middle">MINIMALES RISIKO</text>'+
        '<text class="s-lbl" x="360" y="44">Social Scoring, biometrische</text>'+
        '<text class="s-lbl" x="360" y="58">Massenüberwachung</text>'+
        '<text class="s-lbl" x="408" y="102">Bewerberauswahl, Kredit-</text>'+
        '<text class="s-lbl" x="408" y="116">vergabe, Medizin, Verkehr</text>'+
        '<text class="s-lbl" x="456" y="160">Chatbots: Kennzeich-</text>'+
        '<text class="s-lbl" x="456" y="174">nungspflicht</text>'+
        '<text class="s-lbl" x="20" y="216">Spamfilter, Rechtschreib-</text>'+
        '<text class="s-lbl" x="20" y="230">prüfung: keine Auflagen</text>'+
        '</svg><figcaption>Je weiter oben, desto strenger: Die Spitze ist verboten, die Basis ist frei nutzbar.</figcaption></figure>'+
        '<table class="lesson-table"><tr><th>Stufe</th><th>Beispiele</th><th>Folge</th></tr>'+
        '<tr><td><strong>Unannehmbares Risiko</strong></td><td>Social Scoring durch Behörden, Manipulation, Emotionserkennung am Arbeitsplatz, biometrische Echtzeit-Massenüberwachung</td><td><strong>verboten</strong></td></tr>'+
        '<tr><td><strong>Hohes Risiko</strong></td><td>Personalauswahl, Kreditwürdigkeit, Medizinprodukte, kritische Infrastruktur, Bildungszugang</td><td>Konformitätsbewertung, Risikomanagement, Dokumentation, Datenqualität, <strong>menschliche Aufsicht</strong>, Protokollierung, CE-Kennzeichnung</td></tr>'+
        '<tr><td><strong>Begrenztes Risiko</strong></td><td>Chatbots, Deepfakes, KI-erzeugte Inhalte</td><td><strong>Transparenzpflicht</strong> — Nutzer müssen erkennen, dass sie mit einer KI sprechen bzw. dass Inhalte KI-erzeugt sind</td></tr>'+
        '<tr><td><strong>Minimales Risiko</strong></td><td>Spamfilter, Rechtschreibprüfung, KI in Videospielen</td><td>keine besonderen Pflichten</td></tr></table>'+
        '<p>Zusätzlich verlangt die Verordnung <strong>KI-Kompetenz (AI Literacy)</strong>: Unternehmen müssen dafür sorgen, dass Beschäftigte, die KI-Systeme einsetzen, über ausreichendes Wissen dazu verfügen.</p>',
      code:
        "ZUORDNUNGSUEBUNG - so kommen die Faelle in der Pruefung\n\n"+
        "  \"Ein System sortiert eingehende Bewerbungen vor.\"\n"+
        "     -> HOCHRISIKO. Zugang zu Beschaeftigung ist ausdruecklich\n"+
        "        genannt. Folge: menschliche Aufsicht, Dokumentation,\n"+
        "        Pruefung auf Diskriminierung.\n\n"+
        "  \"Ein Chatbot beantwortet Kundenfragen im Webshop.\"\n"+
        "     -> BEGRENZTES RISIKO. Der Nutzer muss erkennen koennen,\n"+
        "        dass er mit einer Maschine spricht.\n\n"+
        "  \"Der Spamfilter im Mailserver.\"\n"+
        "     -> MINIMALES RISIKO. Keine besonderen Auflagen.\n\n"+
        "  \"Kameras erfassen die Stimmung der Mitarbeiter im Grossraum.\"\n"+
        "     -> VERBOTEN. Emotionserkennung am Arbeitsplatz ist\n"+
        "        untersagt.\n\n"+
        "  \"Eine Bank bewertet die Kreditwuerdigkeit automatisiert.\"\n"+
        "     -> HOCHRISIKO, zusaetzlich Art. 22 DSGVO beachten.",
      codeLang:'AI Act',
      tip:'Die Zuordnung gelingt mit einer einzigen Frage: Was passiert einem Menschen, wenn das System falsch liegt? Entscheidet es über Job, Kredit, Gesundheit oder Bildung, ist es Hochrisiko. Redet es nur mit dem Menschen, ist es begrenztes Risiko und braucht einen Hinweis. Bewertet oder überwacht es Menschen flächendeckend, ist es verboten. Nenne bei Hochrisiko-Systemen immer die menschliche Aufsicht mit — sie ist die Pflicht, die am häufigsten erwartet wird.',
      quiz:[
        {q:'In welche Risikoklasse fällt ein System zur Vorauswahl von Bewerbungen?', options:['Minimales Risiko','Hohes Risiko','Verboten'], correct:1, explain:'Der Zugang zu Beschäftigung ist im AI Act ausdrücklich als Hochrisiko eingestuft.'},
        {q:'Welche Pflicht gilt bei einem Kundenchatbot?', options:['Konformitätsbewertung','Transparenzpflicht – der Nutzer muss die KI erkennen können','Gar keine'], correct:1, explain:'Chatbots fallen unter begrenztes Risiko.'},
        {q:'Welche Praktik ist nach dem AI Act ausdrücklich verboten?', options:['Ein Chatbot ohne Kennzeichnung','Social Scoring durch Behörden','Ein Spamfilter'], correct:1, explain:'Ebenso Emotionserkennung am Arbeitsplatz und biometrische Massenüberwachung.'}
      ]
    },
    {
      id:'m30-l2', title:'KI und Datenschutz', minutes:9,
      body:
        '<p>KI hebelt die DSGVO nicht aus — im Gegenteil, mehrere Grundsätze geraten gerade beim Einsatz von KI unter Druck.</p>'+
        '<table class="lesson-table"><tr><th>DSGVO-Grundsatz</th><th>Spannungsfeld bei KI</th></tr>'+
        '<tr><td>Zweckbindung</td><td>Daten, die für die Vertragsabwicklung erhoben wurden, dürfen nicht ohne Weiteres zum Training verwendet werden</td></tr>'+
        '<tr><td>Datenminimierung</td><td>KI-Training will möglichst viele Daten — das Gegenteil des Grundsatzes</td></tr>'+
        '<tr><td>Transparenz</td><td>Betroffene müssen über die automatisierte Verarbeitung informiert werden</td></tr>'+
        '<tr><td>Richtigkeit</td><td>ein halluzinierendes Modell erzeugt falsche personenbezogene Aussagen</td></tr>'+
        '<tr><td>Löschung (Art. 17)</td><td>aus einem trainierten Modell lassen sich einzelne Daten praktisch nicht mehr entfernen</td></tr></table>'+
        '<p><strong>Artikel 22 DSGVO</strong> ist die wichtigste Einzelvorschrift: Eine <strong>ausschließlich automatisierte Entscheidung mit rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung</strong> ist grundsätzlich unzulässig. Betroffene haben das Recht auf <strong>Eingreifen einer Person</strong>, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung.</p>'+
        '<p>Praktische Folge: Ein Modell darf eine Kreditablehnung oder eine Bewerberabsage <em>vorbereiten</em>, die Entscheidung selbst muss ein Mensch verantworten — und zwar tatsächlich prüfend, nicht nur abnickend.</p>'+
        '<p><strong>Weitere Pflichten:</strong> Bei Einsatz einer externen KI ist der Anbieter <strong>Auftragsverarbeiter</strong>, es braucht einen <strong>AVV nach Art. 28</strong>. Für Hochrisiko-Anwendungen ist regelmäßig eine <strong>Datenschutz-Folgenabschätzung nach Art. 35</strong> erforderlich. Und überwacht ein System das Verhalten oder die Leistung von Beschäftigten, greift die <strong>Mitbestimmung des Betriebsrats nach § 87 BetrVG</strong>.</p>',
      code:
        "TYPISCHER PRUEFUNGSFALL\n\n"+
        "  Ein Mitarbeiter gibt einen Kundenvertrag in einen frei\n"+
        "  zugaenglichen KI-Dienst ein, um ihn zusammenfassen zu lassen.\n\n"+
        "  Was ist das Problem?\n"+
        "   1. Uebermittlung personenbezogener Daten an einen Dritten\n"+
        "      ohne Rechtsgrundlage und ohne AVV.\n"+
        "   2. Moeglicher Drittlandtransfer, wenn die Server ausserhalb\n"+
        "      der EU stehen.\n"+
        "   3. Die Eingaben koennen beim Anbieter gespeichert und fuer\n"+
        "      das Training verwendet werden - Kontrollverlust.\n"+
        "   4. Verletzung von Geschaeftsgeheimnissen und ggf.\n"+
        "      vertraglicher Vertraulichkeitspflichten.\n\n"+
        "  Gegenmassnahmen:\n"+
        "   - verbindliche KI-Richtlinie im Unternehmen\n"+
        "   - freigegebene Dienste mit AVV und EU-Serverstandort\n"+
        "   - Verbot der Eingabe personenbezogener und vertraulicher\n"+
        "     Daten, alternativ Anonymisierung vor der Eingabe\n"+
        "   - Schulung aller Beschaeftigten (auch AI-Literacy-Pflicht)\n"+
        "   - technische Sperre nicht freigegebener Dienste",
      codeLang:'Datenschutzfall',
      tip:'Artikel 22 DSGVO ist der Paragraf, den du dir für KI-Aufgaben merken solltest. Er verlangt nicht, dass KI unbenutzt bleibt, sondern dass ein Mensch die folgenreiche Entscheidung trifft. Formuliere das in der Antwort präzise: Das System darf eine Empfehlung erzeugen, die abschließende Entscheidung muss eine Person nachvollziehbar treffen können. Der Zusatz zur Betriebsratsmitbestimmung nach § 87 BetrVG bringt in Arbeitsplatzszenarien fast immer einen weiteren Punkt.',
      quiz:[
        {q:'Was regelt Art. 22 DSGVO?', options:['Die Speicherdauer von Daten','Ausschließlich automatisierte Entscheidungen mit erheblicher Wirkung sind grundsätzlich unzulässig','Die Verschlüsselung von Daten'], correct:1, explain:'Betroffene haben Anspruch auf das Eingreifen einer natürlichen Person.'},
        {q:'Ein Mitarbeiter gibt Kundendaten in einen externen KI-Dienst ein. Was fehlt in jedem Fall?',options:['Eine schnellere Internetleitung','Rechtsgrundlage und Auftragsverarbeitungsvertrag','Ein größeres Kontextfenster'], correct:1, explain:'Zusätzlich drohen Drittlandtransfer und Verrat von Geschäftsgeheimnissen.'},
        {q:'Welches Betroffenenrecht ist bei einem trainierten Modell praktisch kaum umsetzbar?', options:['Auskunft','Löschung einzelner Daten aus dem Modell','Widerspruch'], correct:1, explain:'Deshalb ist die Rechtsgrundlage vor dem Training zu klären, nicht danach.'}
      ]
    },
    {
      id:'m30-l3', title:'Ethik, Urheberrecht und Verantwortung', minutes:9,
      body:
        '<p><strong>Ethische Anforderungen</strong> an KI-Systeme, wie sie die EU-Leitlinien formulieren — sie tauchen als Nennaufgabe auf:</p>'+
        '<ul><li><strong>Menschliche Aufsicht</strong> — der Mensch behält Kontrolle und Letztentscheidung.</li>'+
        '<li><strong>Transparenz und Erklärbarkeit</strong> — nachvollziehbar, wie eine Entscheidung zustande kam. Das Gegenteil ist das <strong>Blackbox-Problem</strong>: Ein tiefes neuronales Netz liefert ein Ergebnis, aber keine Begründung.</li>'+
        '<li><strong>Fairness und Nichtdiskriminierung</strong> — keine Benachteiligung von Gruppen.</li>'+
        '<li><strong>Robustheit und Sicherheit</strong> — auch bei fehlerhaften oder manipulierten Eingaben zuverlässig.</li>'+
        '<li><strong>Datenschutz und Datenqualität.</strong></li>'+
        '<li><strong>Rechenschaftspflicht</strong> — Verantwortlichkeiten sind benannt.</li>'+
        '<li><strong>Nachhaltigkeit</strong> — Training großer Modelle verbraucht erhebliche Energie.</li></ul>'+
        '<p><strong>Urheberrecht</strong> — hier gibt es zwei getrennte Fragen, die gern vermischt werden:</p>'+
        '<ol><li><strong>Die Eingabeseite:</strong> Dürfen urheberrechtlich geschützte Werke zum Training verwendet werden? In Deutschland erlaubt § 44b UrhG das Text- und Data-Mining, sofern sich der Rechteinhaber nicht ausdrücklich vorbehalten hat.</li>'+
        '<li><strong>Die Ausgabeseite:</strong> Wem gehört ein KI-erzeugtes Werk? Nach deutschem Recht setzt Urheberschaft eine <strong>persönliche geistige Schöpfung</strong> eines Menschen voraus (§ 2 Abs. 2 UrhG). Ein rein maschinell erzeugtes Ergebnis ist daher <strong>nicht urheberrechtlich geschützt</strong> — es ist gemeinfrei. Erst eine eigene schöpferische Bearbeitung durch den Menschen kann Schutz begründen.</li></ol>'+
        '<p><strong>Haftung:</strong> Für einen Fehler haftet nicht „die KI". In Betracht kommen der <strong>Anbieter</strong> (Produkthaftung, mangelhaftes System), der <strong>Betreiber</strong> (unsachgemäßer Einsatz, fehlende Aufsicht) und der <strong>Anwender</strong> (ungeprüfte Übernahme eines Ergebnisses). Deshalb gilt in der Praxis: <strong>Wer ein KI-Ergebnis verwendet, verantwortet es.</strong></p>',
      code:
        "DAS BLACKBOX-PROBLEM IN DER PRAXIS\n\n"+
        "  Ein Modell lehnt einen Kreditantrag ab.\n"+
        "  Der Kunde fragt: \"Warum?\"\n\n"+
        "  Bei einem Entscheidungsbaum:\n"+
        "     nachvollziehbar - die Regelkette laesst sich vorlesen.\n\n"+
        "  Bei einem tiefen neuronalen Netz:\n"+
        "     Millionen Gewichte, keine lesbare Begruendung.\n\n"+
        "  Folgen:\n"+
        "   - Art. 22 DSGVO verlangt aussagekraeftige Informationen\n"+
        "     ueber die involvierte Logik\n"+
        "   - der AI Act verlangt bei Hochrisiko Nachvollziehbarkeit\n"+
        "     und Protokollierung\n\n"+
        "  Loesungsansaetze:\n"+
        "   - erklaerbare Verfahren waehlen, wo Begruendung noetig ist\n"+
        "   - Erklaerungsmethoden einsetzen, die den Einfluss einzelner\n"+
        "     Merkmale sichtbar machen\n"+
        "   - menschliche Letztentscheidung mit eigener Begruendung",
      codeLang:'Erklärbarkeit',
      tip:'Beim Urheberrecht musst du die beiden Seiten sauber trennen, sonst verlierst du den Punkt. Auf der Eingabeseite geht es um die Zulässigkeit des Trainings, auf der Ausgabeseite um den Schutz des Ergebnisses. Der Kernsatz für die Ausgabeseite lautet: Ohne menschliche schöpferische Leistung kein Urheberrechtsschutz. Wer einen KI-Text unverändert veröffentlicht, kann anderen die Nutzung nicht verbieten — und haftet trotzdem selbst, wenn der Inhalt Rechte Dritter verletzt.',
      quiz:[
        {q:'Ist ein rein KI-erzeugtes Bild in Deutschland urheberrechtlich geschützt?', options:['Ja, der Nutzer ist Urheber','Nein, es fehlt die persönliche geistige Schöpfung eines Menschen','Ja, der Anbieter ist Urheber'], correct:1, explain:'Erst eine eigene schöpferische Bearbeitung kann Schutz begründen.'},
        {q:'Was bezeichnet das Blackbox-Problem?', options:['Ein verschlüsseltes Modell','Dass die Entscheidung eines tiefen Netzes nicht nachvollziehbar begründbar ist','Einen Serverausfall'], correct:1, explain:'Deshalb fordern DSGVO und AI Act Nachvollziehbarkeit bei folgenreichen Entscheidungen.'},
        {q:'Wer haftet, wenn ein ungeprüftes KI-Ergebnis Schaden anrichtet?', options:['Die KI','Je nach Fall Anbieter, Betreiber oder der Anwender, der es übernommen hat','Niemand'], correct:1, explain:'Der Grundsatz lautet: Wer ein KI-Ergebnis verwendet, verantwortet es.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m41', part:5, partTitle:'IT-Sicherheit & Datenschutz', title:'Schlüssel und Zertifikate im Detail', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m41-l1', title:'Das Schlüsselpaar: öffentlich und privat', minutes:10,
      body:
        '<p>Beim asymmetrischen Verfahren entsteht ein <strong>Paar</strong> zusammengehöriger Schlüssel. Was der eine verschließt, öffnet nur der andere. Aus dem öffentlichen Schlüssel lässt sich der private <strong>nicht</strong> berechnen &#8211; darauf beruht das ganze Verfahren.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Öffentlicher Schlüssel</th><th>Privater Schlüssel</th></tr>'+
        '<tr><td>Wer hat ihn</td><td><strong>jeder</strong> &#8211; er darf verteilt werden</td><td><strong>nur du</strong> &#8211; er verlässt das Gerät nie</td></tr>'+
        '<tr><td>Vertraulichkeit</td><td>damit wird <strong>verschlüsselt</strong></td><td>damit wird <strong>entschlüsselt</strong></td></tr>'+
        '<tr><td>Echtheit</td><td>damit wird eine Signatur <strong>geprüft</strong></td><td>damit wird <strong>signiert</strong></td></tr>'+
        '<tr><td>Bei Verlust</td><td>egal, ist ohnehin öffentlich</td><td><strong>alles kompromittiert</strong> &#8211; Paar sperren und neu erzeugen</td></tr></table>'+
        '<p><strong>Die eine Regel, aus der sich alles ableiten lässt:</strong> <em>Du benutzt immer den Schlüssel, den außer dir niemand hat &#8211; oder den, den nur der Empfänger hat.</em> Willst du, dass <strong>nur der Empfänger lesen kann</strong>, nimmst du <strong>dessen öffentlichen</strong> Schlüssel. Willst du beweisen, dass <strong>du</strong> der Absender bist, nimmst du <strong>deinen privaten</strong>.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 268" role="img" aria-label="Was der oeffentliche und was der private Schluessel leisten">'+
        '<rect class="s-key-pub" x="20" y="16" width="250" height="150" rx="6"/>'+
        '<text class="s-hd" x="145" y="42" text-anchor="middle">&#214;FFENTLICHER SCHL&#220;SSEL</text>'+
        '<text class="s-lbl" x="145" y="62" text-anchor="middle">darf jeder haben</text>'+
        '<line class="s-line" x1="40" y1="74" x2="250" y2="74"/>'+
        '<text class="s-mono" x="40" y="98">&#8594; verschl&#252;sseln</text>'+
        '<text class="s-lbl" x="40" y="116">f&#252;r den Besitzer des Paares</text>'+
        '<text class="s-mono" x="40" y="142">&#8594; Signatur pr&#252;fen</text>'+
        '<text class="s-lbl" x="40" y="160">stammt es wirklich von ihm?</text>'+
        '<rect class="s-key-priv" x="290" y="16" width="250" height="150" rx="6"/>'+
        '<text class="s-hd" x="415" y="42" text-anchor="middle">PRIVATER SCHL&#220;SSEL</text>'+
        '<text class="s-lbl" x="415" y="62" text-anchor="middle">verl&#228;sst das Ger&#228;t nie</text>'+
        '<line class="s-line" x1="310" y1="74" x2="520" y2="74"/>'+
        '<text class="s-mono" x="310" y="98">&#8594; entschl&#252;sseln</text>'+
        '<text class="s-lbl" x="310" y="116">nur ich lese, was an mich ging</text>'+
        '<text class="s-mono" x="310" y="142">&#8594; signieren</text>'+
        '<text class="s-lbl" x="310" y="160">nur ich kann das erzeugen</text>'+
        '<rect class="s-strong" x="20" y="180" width="520" height="34" rx="4"/>'+
        '<text class="s-lbl" x="280" y="202" text-anchor="middle">Vertraulichkeit &#8594; &#246;ffentlicher Schl&#252;ssel des EMPF&#196;NGERS &#160;&#160;&#183;&#160;&#160; Echtheit &#8594; eigener PRIVATER Schl&#252;ssel</text>'+
        '<text class="s-lbl" x="20" y="238">Aus dem &#246;ffentlichen Schl&#252;ssel l&#228;sst sich der private nicht berechnen.</text>'+
        '<text class="s-lbl" x="20" y="258">Geht der private verloren, hilft nur sperren und ein neues Paar erzeugen.</text>'+
        '</svg><figcaption>Vier Tätigkeiten, zwei Schlüssel. Wer sich die beiden Sätze unten merkt, leitet jede Prüfungsfrage dazu ab.</figcaption></figure>'+
        '<p><strong>Schlüssellängen</strong> &#8211; Zahlen, die man kennen sollte, weil sie in Aufgaben zur Angebotsbewertung auftauchen:</p>'+
        '<table class="lesson-table"><tr><th>Verfahren</th><th>Heute üblich</th><th>Anmerkung</th></tr>'+
        '<tr><td>AES (symmetrisch)</td><td>256 Bit</td><td>128 Bit gilt weiterhin als sicher</td></tr>'+
        '<tr><td>RSA (asymmetrisch)</td><td>2048, besser 4096 Bit</td><td>1024 Bit ist überholt</td></tr>'+
        '<tr><td>ECC (elliptische Kurven)</td><td>256 Bit</td><td>entspricht etwa RSA 3072 &#8211; kürzer und schneller</td></tr></table>'+
        '<p>Die Längen lassen sich <strong>nicht</strong> vergleichen: 256 Bit AES sind sehr stark, 256 Bit RSA wären in Sekunden gebrochen. Symmetrische und asymmetrische Verfahren beruhen auf völlig verschiedenen mathematischen Problemen.</p>',
      code:
        "DREI DINGE, DIE STAENDIG VERWECHSELT WERDEN\n\n"+
        "  KODIERUNG       Base64, URL-Encoding, ASCII\n"+
        "     Zweck  : Daten transportierbar machen\n"+
        "     Schutz : KEINER - jeder kann es zuruecklesen\n"+
        "     umkehrbar ohne Schluessel\n\n"+
        "  VERSCHLUESSELUNG  AES, RSA\n"+
        "     Zweck  : Vertraulichkeit\n"+
        "     Schutz : nur mit Schluessel lesbar\n"+
        "     umkehrbar MIT Schluessel\n\n"+
        "  HASH            SHA-256\n"+
        "     Zweck  : Integritaet, Passwortspeicherung\n"+
        "     Schutz : Einwegfunktion\n"+
        "     NICHT umkehrbar - auch nicht mit Schluessel\n\n"+
        "  Pruefungsfalle: \"Das Passwort ist Base64-kodiert\n"+
        "  gespeichert.\" -> Das ist KEIN Schutz. Passwoerter\n"+
        "  gehoeren gehasht, mit Salt und einem langsamen\n"+
        "  Verfahren wie bcrypt oder Argon2.\n\n"+
        "WELCHER SCHLUESSEL? - die vier Faelle\n\n"+
        "  Ich sende vertraulich an Meier\n"+
        "     verschluesseln mit  Meiers OEFFENTLICHEM\n"+
        "     entschluesseln mit  Meiers PRIVATEM   (macht Meier)\n\n"+
        "  Ich beweise, dass die Datei von mir stammt\n"+
        "     signieren mit       MEINEM PRIVATEN\n"+
        "     pruefen mit         MEINEM OEFFENTLICHEN  (macht jeder)\n\n"+
        "  Beides zusammen: erst signieren, dann verschluesseln.\n\n"+
        "WO DER PRIVATE SCHLUESSEL LIEGT\n"+
        "  Datei mit Passphrase   einfach, aber kopierbar\n"+
        "  Smartcard / Token      verlaesst die Karte nie\n"+
        "  TPM / Secure Enclave   an die Hardware gebunden\n"+
        "  HSM im Rechenzentrum   fuer Server und CAs",
      codeLang:'Schlüsselpaar',
      tip:'Wenn eine Aufgabe nach dem richtigen Schlüssel fragt, stell dir zuerst die Frage nach dem Ziel, nicht nach dem Verfahren. Soll niemand sonst mitlesen? Dann brauchst du etwas, das nur der Empfänger hat — also seinen öffentlichen Schlüssel, denn nur sein privates Gegenstück öffnet es wieder. Soll bewiesen werden, dass du es warst? Dann brauchst du etwas, das nur du hast — deinen privaten Schlüssel.',
      quiz:[
        {q:'Womit verschlüsselst du eine vertrauliche Nachricht an eine bestimmte Person?', options:['Mit deinem privaten Schlüssel','Mit dem öffentlichen Schlüssel dieser Person','Mit deinem öffentlichen Schlüssel'], correct:1, explain:'Nur ihr privates Gegenstück kann die Nachricht wieder öffnen.'},
        {q:'Ein Passwort wird Base64-kodiert gespeichert. Wie sicher ist das?', options:['Sehr sicher, es ist ja verschlüsselt','Gar nicht — Kodierung ist ohne Schlüssel umkehrbar','Sicher, solange niemand den Schlüssel kennt'], correct:1, explain:'Passwörter gehören gehasht, mit Salt und einem langsamen Verfahren wie bcrypt.'},
        {q:'Warum lassen sich 256 Bit AES und 256 Bit RSA nicht vergleichen?', options:['Sie beruhen auf völlig verschiedenen mathematischen Problemen','RSA zählt die Bits anders','Es gibt kein RSA mit 256 Bit'], correct:0, explain:'ECC mit 256 Bit entspricht etwa RSA mit 3072 Bit — auch das ist nicht dasselbe.'}
      ]
    },
    {
      id:'m41-l2', title:'Schlüsselaustausch und Perfect Forward Secrecy', minutes:10,
      body:
        '<p>Symmetrische Verfahren sind schnell, haben aber ein Problem: <strong>Wie kommt der gemeinsame Schlüssel zum Gegenüber?</strong> Über dieselbe unsichere Leitung senden geht nicht &#8211; wer mitliest, hat ihn auch.</p>'+
        '<p>Dazu kommt die Mengenrechnung: Bei <strong>n</strong> Teilnehmern, die alle paarweise vertraulich sprechen wollen, braucht es <code>n &middot; (n&minus;1) / 2</code> Schlüssel. Bei 10 Teilnehmern sind das 45, bei 100 schon 4.950. Das ist nicht verwaltbar.</p>'+
        '<p><strong>Diffie-Hellman</strong> löst das auf verblüffende Weise: Beide Seiten einigen sich <em>öffentlich</em> auf einen gemeinsamen Ausgangswert, mischen ihn mit einem <em>geheimen</em> eigenen Wert, tauschen die Mischungen aus und mischen erneut mit dem eigenen Geheimnis. Beide landen beim gleichen Ergebnis &#8211; ein Mitlauscher kann es aus den ausgetauschten Mischungen nicht zurückrechnen.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 276" role="img" aria-label="Diffie-Hellman als Farbmischung erklaert">'+
        '<text class="s-hd" x="80" y="22" text-anchor="middle">Alice</text>'+
        '<text class="s-hd" x="480" y="22" text-anchor="middle">Bob</text>'+
        '<rect class="s-box" x="200" y="10" width="160" height="28" rx="4"/>'+
        '<text class="s-lbl" x="280" y="29" text-anchor="middle">gemeinsamer Startwert</text>'+
        '<text class="s-lbl" x="280" y="52" text-anchor="middle">&#246;ffentlich, darf jeder kennen</text>'+
        '<circle class="s-key-priv" cx="80" cy="84" r="20"/>'+
        '<text class="s-mono" x="80" y="88" text-anchor="middle">a</text>'+
        '<text class="s-lbl" x="80" y="118" text-anchor="middle">geheim</text>'+
        '<circle class="s-key-priv" cx="480" cy="84" r="20"/>'+
        '<text class="s-mono" x="480" y="88" text-anchor="middle">b</text>'+
        '<text class="s-lbl" x="480" y="118" text-anchor="middle">geheim</text>'+
        '<rect class="s-accent" x="24" y="136" width="112" height="30" rx="4"/>'+
        '<text class="s-mono" x="80" y="156" text-anchor="middle">Start + a</text>'+
        '<rect class="s-accent" x="424" y="136" width="112" height="30" rx="4"/>'+
        '<text class="s-mono" x="480" y="156" text-anchor="middle">Start + b</text>'+
        '<line class="s-arrow" x1="140" y1="146" x2="416" y2="146" marker-end="url(#kry2)"/>'+
        '<line class="s-arrow" x1="420" y1="160" x2="144" y2="160" marker-end="url(#kry2)"/>'+
        '<text class="s-lbl" x="280" y="140" text-anchor="middle">&#246;ffentlich ausgetauscht</text>'+
        '<rect class="s-strong" x="24" y="188" width="150" height="34" rx="4"/>'+
        '<text class="s-mono" x="99" y="210" text-anchor="middle">Start + b + a</text>'+
        '<rect class="s-strong" x="386" y="188" width="150" height="34" rx="4"/>'+
        '<text class="s-mono" x="461" y="210" text-anchor="middle">Start + a + b</text>'+
        '<rect class="s-ok" x="196" y="188" width="168" height="34" rx="4"/>'+
        '<text class="s-lbl" x="280" y="210" text-anchor="middle">dasselbe Geheimnis</text>'+
        '<text class="s-lbl" x="20" y="248">Der Mitlauscher kennt Startwert und beide Mischungen &#8211; und kann a und b daraus nicht zur&#252;ckrechnen.</text>'+
        '<text class="s-lbl" x="20" y="268">Genau das leistet die Mathematik dahinter: mischen ist leicht, entmischen praktisch unm&#246;glich.</text>'+
        '<defs><marker id="kry2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Mischen ist leicht, entmischen praktisch unmöglich. Beide Seiten kommen zum gleichen Ergebnis, ohne es je übertragen zu haben.</figcaption></figure>'+
        '<p><strong>Perfect Forward Secrecy</strong> ist die Folge davon, wenn man das Verfahren <em>flüchtig</em> einsetzt: Für jede einzelne Sitzung wird ein neues Paar erzeugt und danach verworfen. Wird der langfristige private Schlüssel des Servers später kompromittiert &#8211; durch Diebstahl, Gerichtsbeschluss oder einen Fehler &#8211;, lassen sich <strong>mitgeschnittene alte Sitzungen trotzdem nicht entschlüsseln</strong>. Der Sitzungsschlüssel existiert schlicht nirgends mehr.</p>'+
        '<p>Ohne Forward Secrecy gilt das Gegenteil: Wer den privaten Serverschlüssel bekommt und über Jahre Datenverkehr mitgeschnitten hat, kann alles rückwirkend lesen. Deshalb ist Forward Secrecy in TLS 1.3 <strong>verpflichtend</strong> &#8211; die alten Verfahren ohne sie wurden gestrichen.</p>'+
        '<p><strong>Das hybride Verfahren in einem Satz:</strong> Asymmetrisch wird nur der Sitzungsschlüssel ausgehandelt, die eigentlichen Daten laufen dann schnell symmetrisch. Man bekommt die Schlüsselverwaltung des einen und die Geschwindigkeit des anderen Verfahrens.</p>',
      code:
        "DAS MENGENPROBLEM\n\n"+
        "  Symmetrisch, jeder mit jedem:  n * (n-1) / 2\n"+
        "      5 Teilnehmer  ->     10 Schluessel\n"+
        "     10 Teilnehmer  ->     45\n"+
        "     50 Teilnehmer  ->  1.225\n"+
        "    100 Teilnehmer  ->  4.950\n\n"+
        "  Asymmetrisch: jeder braucht genau EIN Paar.\n"+
        "    100 Teilnehmer  ->    100 Paare\n\n"+
        "  Dieselbe Formel wie bei Peer-to-Peer-Beziehungen.\n\n"+
        "WAS BEIM TLS-VERBINDUNGSAUFBAU PASSIERT\n\n"+
        "  1. Client nennt seine unterstuetzten Verfahren\n"+
        "  2. Server waehlt eines und sendet sein ZERTIFIKAT\n"+
        "  3. Client prueft das Zertifikat gegen die CA-Kette\n"+
        "     -> hier entscheidet sich, ob der Server ECHT ist\n"+
        "  4. Beide fuehren einen fluechtigen Diffie-Hellman durch\n"+
        "     -> daraus entsteht der Sitzungsschluessel\n"+
        "  5. Ab jetzt symmetrisch mit AES\n"+
        "  6. Nach der Sitzung: Sitzungsschluessel verworfen\n\n"+
        "  Schritt 3 loest die Echtheit, Schritt 4 die Vertraulichkeit.\n"+
        "  Ohne Schritt 3 waere ein Man-in-the-Middle moeglich:\n"+
        "  Der Angreifer wuerde einfach mit BEIDEN Seiten je einen\n"+
        "  eigenen Diffie-Hellman durchfuehren.\n\n"+
        "PERFECT FORWARD SECRECY - der Praxistest\n"+
        "  Frage: Der private Serverschluessel wird in zwei Jahren\n"+
        "         gestohlen. Kann der Dieb den mitgeschnittenen\n"+
        "         Verkehr von heute lesen?\n\n"+
        "  mit PFS    nein - die Sitzungsschluessel gibt es nicht mehr\n"+
        "  ohne PFS   ja  - rueckwirkend alles",
      codeLang:'Schlüsselaustausch',
      tip:'Diffie-Hellman allein schützt nicht vor einem Angreifer in der Mitte — es sichert nur, dass niemand passiv mitlesen kann. Ein aktiver Angreifer würde mit beiden Seiten je einen eigenen Austausch führen. Erst das Zertifikat beweist, dass am anderen Ende wirklich der erwartete Server sitzt. Diese Arbeitsteilung solltest du in einer Begründungsaufgabe ausdrücklich benennen.',
      quiz:[
        {q:'Wie viele Schlüssel braucht symmetrische Verschlüsselung bei 10 Teilnehmern, die alle paarweise sprechen?', options:['10','45','90'], correct:1, explain:'n mal (n−1) geteilt durch 2 — dieselbe Formel wie bei Peer-to-Peer-Beziehungen.'},
        {q:'Was leistet Perfect Forward Secrecy?', options:['Schnellere Verschlüsselung','Alte Mitschnitte bleiben unlesbar, selbst wenn der Serverschlüssel später gestohlen wird','Sie ersetzt das Zertifikat'], correct:1, explain:'Möglich wird das durch einen flüchtigen Schlüsselaustausch je Sitzung.'},
        {q:'Wogegen schützt Diffie-Hellman allein NICHT?', options:['Gegen passives Mitlesen','Gegen einen aktiven Angreifer in der Mitte','Gegen Datenverlust'], correct:1, explain:'Dafür braucht es das Zertifikat, das die Echtheit der Gegenstelle beweist.'}
      ]
    },
    {
      id:'m41-l3', title:'Zertifikate und die Vertrauenskette', minutes:9,
      body:
        '<p>Ein Schlüssel allein sagt nichts darüber, <em>wem</em> er gehört. Genau diese Lücke füllt ein <strong>digitales Zertifikat</strong> nach <strong>X.509</strong>: Es bindet einen öffentlichen Schlüssel an eine Identität und wird von einer <strong>Zertifizierungsstelle</strong> (CA) signiert.</p>'+
        '<p><strong>Was drinsteht</strong> &#8211; die Felder, die in Aufgaben abgefragt werden:</p>'+
        '<table class="lesson-table"><tr><th>Feld</th><th>Inhalt</th></tr>'+
        '<tr><td>Subject</td><td>für wen &#8211; Domainname oder Organisation</td></tr>'+
        '<tr><td>Issuer</td><td>wer ausgestellt hat</td></tr>'+
        '<tr><td>Public Key</td><td>der öffentliche Schlüssel des Inhabers</td></tr>'+
        '<tr><td>Gültig von / bis</td><td>der Zeitraum</td></tr>'+
        '<tr><td>Seriennummer</td><td>eindeutig je CA, nötig für den Widerruf</td></tr>'+
        '<tr><td>Signatur der CA</td><td>macht das Ganze fälschungssicher</td></tr></table>'+
        '<p><strong>Die Vertrauenskette</strong> ist der Kern. Dein Browser kennt nicht jeden Server der Welt &#8211; er kennt nur eine überschaubare Liste von <strong>Wurzelzertifikaten</strong>, die mit dem Betriebssystem oder dem Browser ausgeliefert wird. Alles andere wird darauf zurückgeführt: Die Wurzel-CA signiert eine Zwischen-CA, die Zwischen-CA signiert das Serverzertifikat. Lässt sich die Kette lückenlos bis zu einer bekannten Wurzel verfolgen, gilt der Server als echt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 256" role="img" aria-label="Vertrauenskette vom Wurzelzertifikat bis zum Serverzertifikat">'+
        '<rect class="s-strong" x="180" y="14" width="200" height="44" rx="5"/>'+
        '<text class="s-hd" x="280" y="34" text-anchor="middle">Wurzel-CA</text>'+
        '<text class="s-lbl" x="280" y="50" text-anchor="middle">selbstsigniert, im Betriebssystem</text>'+
        '<line class="s-arrow" x1="280" y1="58" x2="280" y2="82" marker-end="url(#kry3)"/>'+
        '<text class="s-mono" x="292" y="76">signiert</text>'+
        '<rect class="s-accent" x="180" y="86" width="200" height="44" rx="5"/>'+
        '<text class="s-hd" x="280" y="106" text-anchor="middle">Zwischen-CA</text>'+
        '<text class="s-lbl" x="280" y="122" text-anchor="middle">arbeitet im Tagesgesch&#228;ft</text>'+
        '<line class="s-arrow" x1="280" y1="130" x2="280" y2="154" marker-end="url(#kry3)"/>'+
        '<text class="s-mono" x="292" y="148">signiert</text>'+
        '<rect class="s-ok" x="180" y="158" width="200" height="44" rx="5"/>'+
        '<text class="s-hd" x="280" y="178" text-anchor="middle">Serverzertifikat</text>'+
        '<text class="s-lbl" x="280" y="194" text-anchor="middle">deine-domain.de</text>'+
        '<rect class="s-box" x="404" y="14" width="146" height="66" rx="5"/>'+
        '<text class="s-lbl" x="477" y="36" text-anchor="middle">Wurzelspeicher</text>'+
        '<text class="s-lbl" x="477" y="54" text-anchor="middle">des Browsers</text>'+
        '<text class="s-mono" x="477" y="72" text-anchor="middle">kennt nur die Wurzeln</text>'+
        '<line class="s-dash" x1="404" y1="44" x2="384" y2="36"/>'+
        '<line class="s-arrow2" x1="176" y1="180" x2="30" y2="180" marker-end="url(#kry3)"/>'+
        '<text class="s-lbl" x="14" y="202">Pr&#252;fung</text>'+
        '<text class="s-lbl" x="14" y="218">l&#228;uft nach oben</text>'+
        '<text class="s-lbl" x="20" y="242">Nur wenn die Kette l&#252;ckenlos bei einer bekannten Wurzel endet, gilt der Server als echt.</text>'+
        '<defs><marker id="kry3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Der Browser kennt nur die Wurzeln. Alles andere muss sich lückenlos auf eine davon zurückführen lassen.</figcaption></figure>'+
        '<p><strong>Widerruf.</strong> Wird ein privater Schlüssel gestohlen, muss das Zertifikat vor Ablauf ungültig werden. Dafür gibt es die <strong>Sperrliste</strong> (CRL) &#8211; eine Liste widerrufener Seriennummern &#8211; und <strong>OCSP</strong>, eine Einzelabfrage in Echtzeit. In der Praxis wird meist <em>OCSP Stapling</em> genutzt: Der Server holt die Bestätigung selbst und liefert sie mit, was schneller ist und die Privatsphäre schont.</p>'+
        '<p><strong>Warum ein selbstsigniertes Zertifikat eine Warnung auslöst:</strong> Es <em>verschlüsselt</em> einwandfrei &#8211; die Vertraulichkeit ist gegeben. Was fehlt, ist die <strong>Bestätigung der Identität</strong> durch eine dritte Stelle. Genau das wäre die Lücke, durch die ein Angreifer in der Mitte sein eigenes Zertifikat unterschiebt. Für interne Testsysteme ist es vertretbar, nach außen nie.</p>',
      code:
        "DIE BROWSERWARNUNGEN UEBERSETZT\n\n"+
        "  NET::ERR_CERT_DATE_INVALID\n"+
        "     Zertifikat abgelaufen oder Systemuhr falsch.\n"+
        "     Erst die Uhrzeit pruefen - das ist oft die Ursache.\n\n"+
        "  NET::ERR_CERT_AUTHORITY_INVALID\n"+
        "     Aussteller unbekannt - selbstsigniert, oder die\n"+
        "     Zwischen-CA wurde auf dem Server nicht mitgeliefert.\n"+
        "     Sehr haeufiger Konfigurationsfehler.\n\n"+
        "  NET::ERR_CERT_COMMON_NAME_INVALID\n"+
        "     Der Name passt nicht. Aufruf ueber www.example.de,\n"+
        "     Zertifikat aber nur fuer example.de ausgestellt.\n\n"+
        "  NET::ERR_CERT_REVOKED\n"+
        "     Zurueckgezogen - meist weil der private Schluessel\n"+
        "     kompromittiert wurde. Hier NIE weiterklicken.\n\n"+
        "ZERTIFIKATSARTEN\n"+
        "  DV  Domain Validated        nur die Domain geprueft,\n"+
        "                              automatisch, oft kostenlos\n"+
        "  OV  Organization Validated  Organisation geprueft\n"+
        "  EV  Extended Validation     aufwendige Pruefung\n\n"+
        "  Alle drei verschluesseln GLEICH stark. Der Unterschied\n"+
        "  liegt allein in der Pruefung der Identitaet.\n\n"+
        "  Wildcard  *.example.de   gilt fuer alle Unterdomains\n"+
        "                           einer Ebene, aber nicht fuer\n"+
        "                           a.b.example.de\n\n"+
        "SELBSTSIGNIERT - wann vertretbar\n"+
        "  ja    internes Testsystem, Laborumgebung\n"+
        "  nein  alles, was ein Kunde oder Mitarbeiter aufruft\n\n"+
        "  Der saubere Mittelweg im Unternehmen: eine EIGENE\n"+
        "  interne CA, deren Wurzelzertifikat per Gruppenrichtlinie\n"+
        "  auf alle Firmengeraete verteilt wird.",
      codeLang:'Zertifikate',
      tip:'Die Warnung „Aussteller unbekannt" hat auf produktiven Servern meist gar nichts mit einem selbstsignierten Zertifikat zu tun. Viel häufiger liegt es daran, dass beim Einrichten nur das Serverzertifikat hinterlegt wurde und die Zwischen-CA fehlt. Im Browser des Administrators funktioniert es dann trotzdem, weil der die Zwischen-CA schon zwischengespeichert hat — auf einem frischen Gerät bricht es. Deshalb immer die vollständige Kette ausliefern und von außen testen.',
      quiz:[
        {q:'Welches Zertifikat kennt dein Browser von Haus aus?', options:['Das Serverzertifikat jeder Website','Nur die Wurzelzertifikate','Alle Zwischen-CAs'], correct:1, explain:'Alles andere muss sich lückenlos auf eine bekannte Wurzel zurückführen lassen.'},
        {q:'Worin unterscheiden sich die Zertifikatsarten DV, OV und EV?', options:['In der Stärke der Verschlüsselung','Allein in der Tiefe der Identitätsprüfung','In der Gültigkeitsdauer'], correct:1, explain:'Verschlüsselt wird bei allen dreien gleich stark — geprüft wird unterschiedlich gründlich.'},
        {q:'Wozu dienen Sperrliste und OCSP?', options:['Zum Verlängern eines Zertifikats','Um ein Zertifikat vor Ablauf für ungültig zu erklären','Zum Verschlüsseln der Verbindung'], correct:1, explain:'Nötig etwa, wenn der private Schlüssel gestohlen wurde.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m32', part:5, partTitle:'IT-Sicherheit & Datenschutz', relevanz:'sehr hoch', title:'Datenschutz in der Praxis',
  lessons:[
    {
      id:'m32-l1', title:'Datenschutz gegen Datensicherheit', minutes:9,
      body:
        '<p>Das ist <strong>die</strong> Abgrenzungsfrage des Prüfungsbereichs — und sie wird fast jedes Mal gestellt. Die Begriffe klingen ähnlich und meinen etwas grundverschiedenes.</p>'+
        '<table class="lesson-table"><tr><th></th><th>Datenschutz</th><th>Datensicherheit</th></tr>'+
        '<tr><td>Schützt</td><td><strong>die Person</strong> vor dem Missbrauch ihrer Daten</td><td><strong>die Daten</strong> vor Verlust, Veränderung und Zugriff</td></tr>'+
        '<tr><td>Frage</td><td><em>Darf</em> ich diese Daten verarbeiten?</td><td><em>Wie</em> schütze ich die Daten technisch?</td></tr>'+
        '<tr><td>Betrifft</td><td>nur <strong>personenbezogene</strong> Daten</td><td><strong>alle</strong> Daten, auch Maschinendaten</td></tr>'+
        '<tr><td>Grundlage</td><td>DSGVO, BDSG</td><td>BSI-Grundschutz, ISO 27001</td></tr>'+
        '<tr><td>Beispiel</td><td>Eine Einwilligung einholen, Daten nach Zweckerfüllung löschen</td><td>Verschlüsselung, Backup, Firewall</td></tr></table>'+
        '<p><strong>Der Merksatz:</strong> Datenschutz fragt <em>ob</em>, Datensicherheit fragt <em>wie</em>. Beide brauchen einander: Datenschutz ohne Datensicherheit ist ein Versprechen ohne Umsetzung. Datensicherheit ohne Datenschutz schützt perfekt Daten, die man gar nicht hätte erheben dürfen.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 190" role="img" aria-label="Datenschutz und Datensicherheit im Vergleich">'+
        '<rect class="s-accent" x="20" y="24" width="250" height="128" rx="8"/>'+
        '<text class="s-hd" x="145" y="50" text-anchor="middle">DATENSCHUTZ</text>'+
        '<text class="s-lbl" x="145" y="74" text-anchor="middle">sch&#252;tzt die PERSON</text>'+
        '<text class="s-lbl" x="145" y="98" text-anchor="middle">&bdquo;Darf ich das verarbeiten?&ldquo;</text>'+
        '<text class="s-lbl" x="145" y="122" text-anchor="middle">rechtlich &#183; DSGVO, BDSG</text>'+
        '<text class="s-lbl" x="145" y="142" text-anchor="middle">nur personenbezogene Daten</text>'+
        '<rect class="s-ok" x="290" y="24" width="250" height="128" rx="8"/>'+
        '<text class="s-hd" x="415" y="50" text-anchor="middle">DATENSICHERHEIT</text>'+
        '<text class="s-lbl" x="415" y="74" text-anchor="middle">sch&#252;tzt die DATEN</text>'+
        '<text class="s-lbl" x="415" y="98" text-anchor="middle">&bdquo;Wie sch&#252;tze ich sie?&ldquo;</text>'+
        '<text class="s-lbl" x="415" y="122" text-anchor="middle">technisch &#183; BSI, ISO 27001</text>'+
        '<text class="s-lbl" x="415" y="142" text-anchor="middle">alle Daten</text>'+
        '<text class="s-lbl" x="280" y="180" text-anchor="middle">Datenschutz braucht Datensicherheit als Werkzeug &#8211; Art. 32 DSGVO fordert sie ausdr&#252;cklich.</text>'+
        '</svg><figcaption>Zwei Fragen, zwei Rechtsgrundlagen, ein gemeinsames Ziel. Art. 32 DSGVO verbindet beide: Er verlangt technische Maßnahmen zum Schutz personenbezogener Daten.</figcaption></figure>'+
        '<p><strong>Personenbezogene Daten</strong> sind alle Informationen über eine identifizierte oder <em>identifizierbare</em> natürliche Person. Das Wort „identifizierbar" ist entscheidend: Auch eine Kundennummer, eine IP-Adresse oder ein Kfz-Kennzeichen ist personenbezogen, wenn sich damit über Zusatzwissen ein Bezug herstellen lässt.</p>'+
        '<p><strong>Anonymisierung oder Pseudonymisierung?</strong> Bei der <strong>Anonymisierung</strong> ist der Personenbezug <em>unwiderruflich</em> entfernt — die DSGVO gilt dann nicht mehr. Bei der <strong>Pseudonymisierung</strong> ist er über einen getrennt aufbewahrten Schlüssel wiederherstellbar — die DSGVO gilt weiter, aber die Maßnahme wird als Schutzmaßnahme anerkannt.</p>',
      code:
        "ZUORDNUNGSUEBUNG - Datenschutz oder Datensicherheit?\n\n"+
        "  Festplattenverschluesselung der Notebooks\n"+
        "     -> DATENSICHERHEIT (technischer Schutz)\n\n"+
        "  Einwilligung fuer den Newsletter einholen\n"+
        "     -> DATENSCHUTZ (Rechtsgrundlage schaffen)\n\n"+
        "  Taegliches Backup der Konstruktionsdaten\n"+
        "     -> DATENSICHERHEIT (auch ohne Personenbezug relevant)\n\n"+
        "  Bewerbungsunterlagen nach 6 Monaten loeschen\n"+
        "     -> DATENSCHUTZ (Speicherbegrenzung, Zweckbindung)\n\n"+
        "  Berechtigungskonzept nach Need-to-know\n"+
        "     -> BEIDES: technisch-organisatorische Massnahme nach\n"+
        "        Art. 32 DSGVO und zugleich klassische Datensicherheit\n\n"+
        "  Verzeichnis von Verarbeitungstaetigkeiten fuehren\n"+
        "     -> DATENSCHUTZ (Rechenschaftspflicht)",
      codeLang:'Abgrenzung',
      tip:'Wenn eine Aufgabe nach dem Unterschied fragt, formuliere beide Seiten in einem Satzpaar: Datenschutz schützt die Person und fragt, ob eine Verarbeitung zulässig ist. Datensicherheit schützt die Daten und fragt, wie sie technisch abgesichert werden. Ergänze den Zusammenhang über Art. 32 DSGVO — er verlangt technische und organisatorische Maßnahmen und macht Datensicherheit damit zur Pflicht des Datenschutzes.',
      quiz:[
        {q:'Was schützt der Datenschutz?', options:['Die Daten vor Verlust','Die Person vor dem Missbrauch ihrer Daten','Die Hardware'], correct:1, explain:'Die Daten vor Verlust zu schützen ist Aufgabe der Datensicherheit.'},
        {q:'Ein Backup von Maschinendaten ohne Personenbezug — welchem Bereich zuzuordnen?', options:['Datenschutz','Datensicherheit','Beidem gleichermaßen'], correct:1, explain:'Ohne Personenbezug greift die DSGVO gar nicht.'},
        {q:'Worin unterscheiden sich Anonymisierung und Pseudonymisierung?', options:['Es gibt keinen Unterschied','Bei der Pseudonymisierung bleibt der Bezug über einen getrennten Schlüssel wiederherstellbar','Anonymisierung ist verboten'], correct:1, explain:'Deshalb gilt die DSGVO bei pseudonymisierten Daten weiter, bei anonymisierten nicht.'}
      ]
    },
    {
      id:'m32-l2', title:'Betroffenenrechte umsetzen', minutes:9,
      body:
        '<p>Die Rechte der Betroffenen sind kein theoretischer Katalog — die AP1 fragt, <strong>wie ein Unternehmen sie umsetzt</strong> und <strong>welche Fristen</strong> gelten.</p>'+
        '<table class="lesson-table"><tr><th>Artikel</th><th>Recht</th><th>Was das Unternehmen tun muss</th></tr>'+
        '<tr><td>15</td><td><strong>Auskunft</strong></td><td>mitteilen, welche Daten zu welchem Zweck verarbeitet werden, woher sie stammen, an wen sie gehen und wie lange sie gespeichert bleiben; auf Wunsch eine Kopie</td></tr>'+
        '<tr><td>16</td><td>Berichtigung</td><td>unrichtige Daten korrigieren, unvollständige ergänzen</td></tr>'+
        '<tr><td>17</td><td><strong>Löschung</strong></td><td>Daten löschen, wenn der Zweck entfallen ist oder die Einwilligung widerrufen wurde</td></tr>'+
        '<tr><td>18</td><td>Einschränkung</td><td>Daten sperren statt löschen, etwa während einer Prüfung der Richtigkeit</td></tr>'+
        '<tr><td>20</td><td>Datenübertragbarkeit</td><td>Daten in einem gängigen, maschinenlesbaren Format herausgeben</td></tr>'+
        '<tr><td>21</td><td>Widerspruch</td><td>Verarbeitung auf Grundlage berechtigten Interesses stoppen; bei Werbung <em>immer</em></td></tr></table>'+
        '<p><strong>Die Frist:</strong> <strong>Ein Monat</strong> ab Eingang des Antrags. Bei Komplexität ist eine Verlängerung um zwei weitere Monate möglich — der Betroffene muss dann aber <em>innerhalb des ersten Monats</em> darüber informiert werden. Die Auskunft ist grundsätzlich <strong>kostenlos</strong>.</p>'+
        '<p><strong>Die Grenze des Löschrechts</strong> — hier liegt der eigentliche Prüfungspunkt: Gesetzliche <strong>Aufbewahrungspflichten</strong> gehen vor. Rechnungen unterliegen nach HGB und AO einer <strong>zehnjährigen</strong> Aufbewahrungsfrist, Handelsbriefe einer <strong>sechsjährigen</strong>. Verlangt ein Kunde die Löschung, werden diese Daten <strong>gesperrt statt gelöscht</strong>: Sie bleiben für die Steuerprüfung verfügbar, dürfen aber nicht mehr für Werbung oder Vertrieb genutzt werden.</p>',
      code:
        "ABLAUF EINER AUSKUNFTSANFRAGE\n\n"+
        "  1. Eingang dokumentieren (Datum startet die Monatsfrist)\n"+
        "  2. IDENTITAET PRUEFEN\n"+
        "     Wichtig: Eine Auskunft an die falsche Person waere selbst\n"+
        "     eine Datenschutzverletzung. Im Zweifel nachfragen -\n"+
        "     aber nicht mehr Daten verlangen als noetig.\n"+
        "  3. Alle Systeme durchsuchen: CRM, Warenwirtschaft, Mailarchiv,\n"+
        "     Backups, Ticketsystem, Telefonanlage\n"+
        "  4. Auskunft erteilen: Daten, Zwecke, Herkunft, Empfaenger,\n"+
        "     Speicherdauer, Betroffenenrechte, Beschwerderecht\n"+
        "  5. Vorgang dokumentieren (Rechenschaftspflicht)\n\n"+
        "LOESCHANFRAGE - Entscheidungsbaum\n\n"+
        "  Besteht eine gesetzliche Aufbewahrungspflicht?\n"+
        "     JA  -> SPERREN statt loeschen\n"+
        "            Rechnungen  10 Jahre (HGB, AO)\n"+
        "            Handelsbriefe 6 Jahre\n"+
        "            Nutzung nur noch fuer den Pflichtzweck\n"+
        "     NEIN -> Ist der Zweck entfallen oder die Einwilligung\n"+
        "             widerrufen?\n"+
        "               JA  -> loeschen, auch in Backups beruecksichtigen\n"+
        "               NEIN -> Verarbeitung darf fortgesetzt werden,\n"+
        "                       Ablehnung begruenden",
      codeLang:'Betroffenenrechte',
      tip:'Zwei Details heben eine Antwort ab. Erstens die Identitätsprüfung: Wer Auskunft an die falsche Person erteilt, begeht selbst einen Verstoß — dieser Schritt fehlt in den meisten Lösungen. Zweitens die Aufbewahrungspflicht: Das Löschrecht ist nicht unbegrenzt, und „sperren statt löschen" ist die Formulierung, die Prüfer sehen wollen. Merke dir die zehn Jahre für Rechnungen als Standardbeispiel.',
      quiz:[
        {q:'Innerhalb welcher Frist muss auf eine Auskunftsanfrage geantwortet werden?', options:['72 Stunden','Ein Monat','Sechs Wochen'], correct:1, explain:'Verlängerung um zwei Monate möglich, aber die Information darüber muss im ersten Monat erfolgen.'},
        {q:'Ein Kunde verlangt Löschung, die Rechnungen unterliegen aber der Aufbewahrungspflicht. Was ist zu tun?', options:['Trotzdem vollständig löschen','Die Daten sperren und nur noch für den Pflichtzweck nutzen','Die Anfrage ignorieren'], correct:1, explain:'Gesetzliche Aufbewahrungspflichten gehen dem Löschrecht vor.'},
        {q:'Warum muss vor einer Auskunft die Identität geprüft werden?', options:['Aus Höflichkeit','Weil eine Auskunft an die falsche Person selbst eine Datenschutzverletzung wäre','Um Gebühren abrechnen zu können'], correct:1, explain:'Die Auskunft ist zudem grundsätzlich kostenlos.'}
      ]
    },
    {
      id:'m32-l3', title:'Verzeichnis, Folgenabschätzung und Datenschutzbeauftragter', minutes:9,
      body:
        '<p>Drei Pflichten, die in Aufgaben zur Einführung eines neuen Systems regelmäßig abgefragt werden.</p>'+
        '<p><strong>1. Das Verzeichnis von Verarbeitungstätigkeiten (Art. 30)</strong> ist die Dokumentationspflicht schlechthin. Es listet für jede Verarbeitung auf: Zweck, Kategorien betroffener Personen, Kategorien von Daten, Empfänger, Drittlandübermittlungen, Löschfristen und die getroffenen technisch-organisatorischen Maßnahmen. Es ist <strong>ab 250 Beschäftigten</strong> Pflicht — <em>aber</em> auch darunter, sobald die Verarbeitung nicht nur gelegentlich erfolgt, ein Risiko birgt oder besondere Datenkategorien betrifft. In der Praxis betrifft das nahezu jedes Unternehmen.</p>'+
        '<p><strong>2. Die Datenschutz-Folgenabschätzung (DSFA, Art. 35)</strong> ist vorab durchzuführen, wenn eine Verarbeitung <strong>voraussichtlich ein hohes Risiko</strong> für die Rechte der Betroffenen bedeutet. Typische Auslöser: systematische umfangreiche Bewertung persönlicher Aspekte (Scoring, Profiling), umfangreiche Verarbeitung besonderer Datenkategorien, systematische Überwachung öffentlich zugänglicher Bereiche. Sie beschreibt die Verarbeitung, bewertet Notwendigkeit und Risiken und benennt die Gegenmaßnahmen.</p>'+
        '<p><strong>3. Der Datenschutzbeauftragte</strong> ist nach DSGVO und § 38 BDSG zu benennen, wenn <strong>mindestens 20 Personen ständig mit der automatisierten Verarbeitung</strong> personenbezogener Daten beschäftigt sind, oder wenn eine DSFA erforderlich ist, oder bei Verarbeitung als Kerntätigkeit. Er ist <strong>weisungsfrei</strong>, berichtet direkt an die Leitung, genießt einen besonderen Kündigungsschutz und darf keine Aufgaben wahrnehmen, bei denen er sich selbst kontrollieren müsste — deshalb ist der <strong>IT-Leiter ungeeignet</strong>.</p>'+
        '<p>Er <strong>berät und überwacht</strong>, er entscheidet nicht. Die datenschutzrechtliche Verantwortung bleibt bei der Geschäftsleitung.</p>',
      code:
        "PRUEFSCHEMA FUER EIN NEUES SYSTEM\n\n"+
        "  Werden personenbezogene Daten verarbeitet?\n"+
        "     NEIN -> DSGVO nicht einschlaegig\n"+
        "     JA   -> weiter\n\n"+
        "  1. Rechtsgrundlage nach Art. 6 vorhanden?\n"+
        "     Einwilligung | Vertrag | rechtliche Pflicht |\n"+
        "     lebenswichtiges Interesse | oeffentliches Interesse |\n"+
        "     berechtigtes Interesse\n\n"+
        "  2. Besondere Kategorien nach Art. 9 betroffen?\n"+
        "     Gesundheit, Herkunft, Religion, Gewerkschaft,\n"+
        "     Biometrie, Sexualleben -> strengere Anforderungen\n\n"+
        "  3. Verzeichnis nach Art. 30 ergaenzen               PFLICHT\n\n"+
        "  4. Hohes Risiko? -> DSFA nach Art. 35 durchfuehren\n"+
        "     Indizien: Profiling, Scoring, systematische\n"+
        "     Ueberwachung, grosse Datenmengen, neue Technologie\n\n"+
        "  5. Externe Dienstleister beteiligt?\n"+
        "     -> AVV nach Art. 28 abschliessen\n\n"+
        "  6. TOM nach Art. 32 festlegen und dokumentieren\n\n"+
        "  7. Betroffene informieren (Art. 13 bzw. 14)\n\n"+
        "  8. Betriebsrat beteiligen, wenn Leistungs- oder\n"+
        "     Verhaltenskontrolle moeglich ist (§ 87 BetrVG)",
      codeLang:'Prüfschema',
      tip:'Dieses Prüfschema ist die Antwortstruktur für jede Aufgabe vom Typ „Was ist datenschutzrechtlich zu beachten?" Arbeite es von oben nach unten ab und nenne bei jedem Punkt den Artikel. Besonders die letzten beiden Punkte werden häufig vergessen: die Informationspflicht gegenüber den Betroffenen und die Mitbestimmung des Betriebsrats, sobald das System Rückschlüsse auf Leistung oder Verhalten zulässt.',
      quiz:[
        {q:'Ab wann ist ein Datenschutzbeauftragter in Deutschland zu benennen?', options:['Ab 10 Beschäftigten','Ab 20 Personen, die ständig automatisiert personenbezogene Daten verarbeiten','Erst ab 250 Beschäftigten'], correct:1, explain:'Zusätzlich bei erforderlicher DSFA oder wenn die Verarbeitung Kerntätigkeit ist.'},
        {q:'Wann ist eine Datenschutz-Folgenabschätzung erforderlich?', options:['Bei jeder Verarbeitung','Wenn voraussichtlich ein hohes Risiko für die Betroffenen besteht','Nur auf Anordnung der Aufsichtsbehörde'], correct:1, explain:'Typische Auslöser sind Profiling, besondere Datenkategorien und systematische Überwachung.'},
        {q:'Warum ist der IT-Leiter als Datenschutzbeauftragter ungeeignet?', options:['Er hat zu wenig Fachwissen','Es entstünde ein Interessenkonflikt – er müsste sich selbst kontrollieren','Er ist zu teuer'], correct:1, explain:'Der DSB muss weisungsfrei sein und darf keine Selbstkontrolle ausüben.'}
      ]
    },
    {
      id:'m32-l4', title:'Beschäftigtendatenschutz und Arbeitsplatz', minutes:9,
      body:
        '<p>Beim Datenschutz am Arbeitsplatz treffen zwei Interessen aufeinander: die Kontrollrechte des Arbeitgebers und die Persönlichkeitsrechte der Beschäftigten. Die AP1 prüft das an konkreten Fällen.</p>'+
        '<p><strong>Private Nutzung von E-Mail und Internet</strong> — der entscheidende Punkt:</p>'+
        '<ul><li><strong>Private Nutzung verboten</strong> → Der Arbeitgeber darf im erforderlichen Umfang kontrollieren, etwa stichprobenartig und nach vorheriger Ankündigung.</li>'+
        '<li><strong>Private Nutzung erlaubt oder geduldet</strong> → Deutlich strengere Grenzen. Der Arbeitgeber wird faktisch zum Anbieter eines Telekommunikationsdienstes; ein Zugriff auf Inhalte ist praktisch ausgeschlossen. <strong>Auch die stillschweigende Duldung zählt.</strong></li></ul>'+
        '<p>Daraus folgt die klare Empfehlung: <strong>Die Nutzung ausdrücklich regeln</strong> — in einer Richtlinie oder Betriebsvereinbarung. Ein ungeregelter Zustand ist für den Arbeitgeber der ungünstigste.</p>'+
        '<p><strong>Videoüberwachung</strong> ist nur zulässig, wenn ein berechtigter Zweck vorliegt (Diebstahlschutz, Hausrecht), sie erforderlich und verhältnismäßig ist und kein milderes Mittel genügt. Sie muss <strong>gekennzeichnet</strong> werden. Eine <strong>dauerhafte Überwachung von Arbeitsplätzen</strong> ist unzulässig, Toiletten und Pausenräume sind tabu. Löschfrist in der Regel wenige Tage.</p>'+
        '<p><strong>Weitere Pflichten:</strong> Beschäftigte sind auf Vertraulichkeit zu verpflichten. Bewerbungsunterlagen abgelehnter Bewerber sind nach etwa <strong>sechs Monaten</strong> zu löschen — die Frist ergibt sich aus der Klagefrist des AGG. Personalakten dürfen nur von Befugten eingesehen werden.</p>'+
        '<p><strong>BYOD</strong> (Bring Your Own Device) ist datenschutzrechtlich heikel: Auf einem Privatgerät liegen betriebliche und private Daten nebeneinander. Ohne technische Trennung — etwa einen Container per Mobile Device Management — und eine schriftliche Vereinbarung über Zugriffs- und Löschrechte ist BYOD kaum rechtssicher umsetzbar.</p>',
      code:
        "TYPISCHER PRUEFUNGSFALL\n\n"+
        "  Ein Mitarbeiter ist laengere Zeit krank. Die Vertretung soll\n"+
        "  sein Postfach oeffnen, um Kundenanfragen zu bearbeiten.\n\n"+
        "  Private Nutzung VERBOTEN und das war geregelt:\n"+
        "     Zugriff auf dienstliche Mails zulaessig, soweit\n"+
        "     erforderlich. Vier-Augen-Prinzip und Protokollierung\n"+
        "     empfohlen, eindeutig private Mails bleiben ungeoeffnet.\n\n"+
        "  Private Nutzung ERLAUBT oder GEDULDET:\n"+
        "     Zugriff grundsaetzlich UNZULAESSIG.\n"+
        "     Loesungen: Einwilligung des Mitarbeiters einholen, oder\n"+
        "     eine Abwesenheitsnotiz mit Verweis auf die Vertretung,\n"+
        "     oder eine Weiterleitung nur kuenftiger Mails.\n\n"+
        "  VORBEUGUNG - so haette man es loesen sollen:\n"+
        "   - schriftliche Nutzungsrichtlinie, private Nutzung geregelt\n"+
        "   - Funktionspostfaecher statt persoenlicher fuer Kundenkontakt\n"+
        "   - Vertretungsregelung vorab vereinbart\n"+
        "   - Abwesenheitsnotiz als Standardprozess",
      codeLang:'Praxisfall',
      tip:'Die Unterscheidung zwischen erlaubter und verbotener Privatnutzung entscheidet diese Aufgabenform vollständig. Prüfe im Sachverhalt, ob eine Regelung erwähnt wird — und wenn nicht, weise ausdrücklich darauf hin, dass auch eine stillschweigende Duldung wie eine Erlaubnis wirkt. Der Vorschlag, Funktionspostfächer statt persönlicher Postfächer für den Kundenkontakt zu nutzen, ist die beste vorbeugende Maßnahme und bringt Zusatzpunkte.',
      quiz:[
        {q:'Die private E-Mail-Nutzung wird stillschweigend geduldet. Was folgt daraus?', options:['Der Arbeitgeber darf frei zugreifen','Es gelten dieselben strengen Grenzen wie bei ausdrücklicher Erlaubnis','Die Duldung ist rechtlich bedeutungslos'], correct:1, explain:'Deshalb sollte die Nutzung immer ausdrücklich geregelt werden.'},
        {q:'Wie lange werden Bewerbungsunterlagen abgelehnter Bewerber üblicherweise aufbewahrt?', options:['Bis zu 6 Monate','10 Jahre','Unbegrenzt'], correct:0, explain:'Die Frist leitet sich aus der Klagefrist des AGG ab.'},
        {q:'Was ist bei Videoüberwachung am Arbeitsplatz unzulässig?', options:['Die Kennzeichnung durch Schilder','Die dauerhafte Überwachung einzelner Arbeitsplätze','Die Aufzeichnung des Eingangsbereichs'], correct:1, explain:'Sie erzeugt einen permanenten Überwachungsdruck und ist unverhältnismäßig.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m33', part:5, partTitle:'IT-Sicherheit & Datenschutz', relevanz:'hoch', title:'Datensicherheit im Betrieb',
  lessons:[
    {
      id:'m33-l1', title:'Authentifizierung, Autorisierung und MFA', minutes:9,
      body:
        '<p>Drei Begriffe, die im Alltag vermischt werden und in der Prüfung getrennt gehören — das <strong>AAA-Modell</strong>:</p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Frage</th><th>Beispiel</th></tr>'+
        '<tr><td><strong>Identifikation</strong></td><td>Wer behauptest du zu sein?</td><td>Benutzername eingeben</td></tr>'+
        '<tr><td><strong>Authentifizierung</strong></td><td>Kannst du das beweisen?</td><td>Passwort, Token, Fingerabdruck</td></tr>'+
        '<tr><td><strong>Autorisierung</strong></td><td>Was darfst du?</td><td>Leserecht auf Ordner X</td></tr>'+
        '<tr><td><strong>Accounting</strong></td><td>Was hast du getan?</td><td>Protokollierung, Audit-Log</td></tr></table>'+
        '<p><strong>Die drei Faktoren</strong> der Authentifizierung — die Einteilung wird direkt abgefragt:</p>'+
        '<ul><li><strong>Wissen</strong> — Passwort, PIN, Sicherheitsfrage</li>'+
        '<li><strong>Besitz</strong> — Chipkarte, Hardware-Token, Smartphone mit Authenticator-App, TAN-Generator</li>'+
        '<li><strong>Sein (Biometrie)</strong> — Fingerabdruck, Gesicht, Iris, Stimme</li></ul>'+
        '<p><strong>Mehrfaktor-Authentifizierung</strong> liegt nur vor, wenn Faktoren aus <em>verschiedenen</em> Kategorien kombiniert werden. Passwort plus Sicherheitsfrage ist <strong>keine</strong> MFA — beides ist Wissen. Passwort plus Code aus der Authenticator-App ist MFA: Wissen plus Besitz.</p>'+
        '<p><strong>Warum MFA so wirksam ist:</strong> Ein erbeutetes Passwort allein nützt dem Angreifer nichts mehr. Phishing, Datenbanklecks und Brute Force verlieren damit ihre Wirkung — das ist die mit Abstand wirksamste Einzelmaßnahme gegen Kontoübernahmen.</p>'+
        '<p><strong>Biometrie hat eine Besonderheit:</strong> Ein Passwort lässt sich nach einem Leck ändern, ein Fingerabdruck nicht. Deshalb gehören biometrische Merkmale zu den besonderen Datenkategorien nach Art. 9 DSGVO und werden nie im Klartext, sondern als abgeleitetes Template gespeichert.</p>',
      code:
        "PASSWORTRICHTLINIE - Stand der Technik nach BSI\n\n"+
        "  LAENGE schlaegt Komplexitaet.\n"+
        "     Mindestens 12 Zeichen, besser eine Passphrase:\n"+
        "     \"KaffeeTassePinguin7Blau\" ist sicherer und leichter\n"+
        "     zu merken als \"Xk7#p2\".\n\n"+
        "  KEIN erzwungener regelmaessiger Wechsel mehr.\n"+
        "     Das BSI hat diese Empfehlung aufgegeben: Wechselzwang\n"+
        "     fuehrt zu Passwort1!, Passwort2!, Passwort3!\n"+
        "     Gewechselt wird bei konkretem Verdacht.\n\n"+
        "  Kein Wiederverwenden ueber Dienste hinweg.\n"+
        "  Passwortmanager einsetzen.\n"+
        "  Abgleich gegen bekannte geleakte Passwoerter.\n\n"+
        "SPEICHERUNG - niemals im Klartext\n"+
        "  Hash mit SALT und einem bewusst LANGSAMEN Verfahren:\n"+
        "     bcrypt, scrypt oder Argon2\n"+
        "  Nicht: MD5, SHA-1, oder SHA-256 ohne Salt -\n"+
        "  die sind zu schnell und damit gut durchprobierbar.\n\n"+
        "RECHENBEISPIEL zur Laenge\n"+
        "  8 Zeichen aus 95 moeglichen  -> 95^8  = ca. 6,6 x 10^15\n"+
        "  12 Zeichen aus 95 moeglichen -> 95^12 = ca. 5,4 x 10^23\n"+
        "  Vier Zeichen mehr bedeuten den Faktor 81 Millionen.",
      codeLang:'Zugangsschutz',
      tip:'Der Hinweis zum Wechselzwang ist aktuelles Prüfungswissen: Das BSI empfiehlt seit einigen Jahren keinen regelmäßigen Passwortwechsel mehr, weil er die Qualität der Passwörter senkt. Wer in einer Prüfung „Passwort alle 90 Tage wechseln" als Maßnahme nennt, gibt veralteten Stand wieder. Richtig ist: Länge statt Komplexität, kein Turnuswechsel, Wechsel bei Verdacht, dazu MFA und ein Passwortmanager.',
      quiz:[
        {q:'Welche Kombination ist echte Mehrfaktor-Authentifizierung?', options:['Passwort und Sicherheitsfrage','Passwort und Code aus der Authenticator-App','PIN und Geburtsdatum'], correct:1, explain:'Wissen plus Besitz – zwei Faktoren aus derselben Kategorie zählen nicht.'},
        {q:'Was beantwortet die Autorisierung?', options:['Wer bist du?','Kannst du es beweisen?','Was darfst du?'], correct:2, explain:'Der Beweis der Identität ist die Authentifizierung.'},
        {q:'Was empfiehlt das BSI heute zur Passwortsicherheit?', options:['Wechsel alle 90 Tage','Länge statt Komplexität, Wechsel nur bei Verdacht','Möglichst viele Sonderzeichen bei kurzer Länge'], correct:1, explain:'Wechselzwang führt zu vorhersehbaren Varianten wie Passwort1, Passwort2.'}
      ]
    },
    {
      id:'m33-l2', title:'Berechtigungskonzepte und Rollenmodell', minutes:8,
      body:
        '<p>Ein <strong>Berechtigungskonzept</strong> legt fest, wer auf welche Daten wie zugreifen darf. Es ist eine organisatorische Maßnahme mit technischer Umsetzung und wird nach Art. 32 DSGVO erwartet.</p>'+
        '<p><strong>Die zwei Grundprinzipien:</strong></p>'+
        '<ul><li><strong>Need-to-know</strong> — Zugriff nur auf die Daten, die für die Aufgabe erforderlich sind.</li>'+
        '<li><strong>Least Privilege</strong> — nur die geringste nötige Rechtestufe. Wer Daten nur lesen muss, bekommt kein Schreibrecht.</li></ul>'+
        '<p><strong>RBAC</strong> (Role Based Access Control) vergibt Rechte nicht an Personen, sondern an <strong>Rollen</strong>. Personen werden Rollen zugeordnet. Der Vorteil zeigt sich beim Wechsel: Wird eine Mitarbeiterin von der Buchhaltung in den Einkauf versetzt, tauscht man die Rolle — statt zwanzig Einzelrechte zu suchen und anzupassen.</p>'+
        '<p><strong>Funktionstrennung</strong> (Segregation of Duties) verhindert, dass eine Person einen Vorgang allein von Anfang bis Ende durchführt. Wer eine Rechnung erfasst, soll sie nicht auch freigeben dürfen. Das ist keine Misstrauensfrage, sondern Schutz vor Fehlern und vor dem Verdacht.</p>'+
        '<p><strong>Was regelmäßig vergessen wird — und in Prüfungen gern gefragt ist:</strong></p>'+
        '<ul><li><strong>Rezertifizierung:</strong> Berechtigungen müssen regelmäßig überprüft werden, typischerweise jährlich. Sonst entsteht ein <strong>Berechtigungsstau</strong> — über Jahre gesammelte Rechte aus früheren Positionen.</li>'+
        '<li><strong>Offboarding:</strong> Beim Ausscheiden sind <em>am letzten Arbeitstag</em> alle Zugänge zu sperren: Konten, VPN, Mail, Cloud-Dienste, Schließanlage, Diensthandy.</li>'+
        '<li><strong>Administratorkonten</strong> werden nicht für die tägliche Arbeit genutzt. Jeder Administrator hat ein normales Benutzerkonto und ein separates privilegiertes Konto.</li></ul>',
      code:
        "BERECHTIGUNGSMATRIX - so stellt man sie dar\n\n"+
        "  Rolle          Personal  Buchhaltung  Projekte  Konfig\n"+
        "  ---------------------------------------------------------\n"+
        "  Geschaeftsltg.   lesen      lesen       lesen      -\n"+
        "  Personal       schreiben      -         lesen      -\n"+
        "  Buchhaltung        -      schreiben     lesen      -\n"+
        "  Projektleitung     -         lesen    schreiben    -\n"+
        "  Mitarbeiter     eigene        -         lesen      -\n"+
        "  IT-Admin           -          -           -     schreiben\n\n"+
        "  Beachte zwei Dinge:\n"+
        "   1. Die Geschaeftsleitung hat NICHT ueberall Vollzugriff.\n"+
        "      Need-to-know gilt auch dort.\n"+
        "   2. Der IT-Admin verwaltet die Systeme, hat aber keinen\n"+
        "      fachlichen Zugriff auf Personal- und Buchhaltungsdaten.\n"+
        "      Technisch koennte er sich Zugriff verschaffen - deshalb\n"+
        "      braucht es Protokollierung und das Vier-Augen-Prinzip.\n\n"+
        "OFFBOARDING-CHECKLISTE\n"+
        "  [ ] Benutzerkonto deaktivieren (nicht sofort loeschen -\n"+
        "      Daten und Nachvollziehbarkeit bleiben erhalten)\n"+
        "  [ ] VPN-Zugang und Zertifikate widerrufen\n"+
        "  [ ] Cloud- und Fremdsystemzugaenge entziehen\n"+
        "  [ ] Postfach auf Vertretung umleiten\n"+
        "  [ ] Hardware zurueck: Notebook, Handy, Token, Schluessel\n"+
        "  [ ] Gemeinsame Passwoerter aendern\n"+
        "  [ ] Chipkarte und Schliessberechtigung sperren",
      codeLang:'Berechtigungen',
      tip:'Der Hinweis in der Matrix, dass die Geschäftsleitung nicht überall Vollzugriff hat, überrascht viele und bringt in Begründungsaufgaben Punkte: Need-to-know gilt unabhängig von der Hierarchie. Beim Offboarding ist das Deaktivieren statt Löschen der Punkt, den Prüfer sehen wollen — ein gelöschtes Konto nimmt Dateizuordnungen und Protokollspuren mit.',
      quiz:[
        {q:'Was ist der Hauptvorteil von RBAC?', options:['Es ist kostenlos','Bei einem Positionswechsel wird nur die Rolle getauscht statt vieler Einzelrechte','Es braucht keine Passwörter'], correct:1, explain:'Rechte hängen an Rollen, Personen werden Rollen zugeordnet.'},
        {q:'Was besagt die Funktionstrennung?', options:['Jeder arbeitet in einem eigenen Raum','Eine Person soll einen Vorgang nicht allein von Anfang bis Ende durchführen','Abteilungen haben getrennte Netze'], correct:1, explain:'Wer eine Rechnung erfasst, soll sie nicht auch freigeben.'},
        {q:'Warum wird ein Konto beim Offboarding deaktiviert statt gelöscht?', options:['Aus Nostalgie','Damit Dateizuordnungen und Protokollspuren erhalten bleiben','Weil Löschen technisch unmöglich ist'], correct:1, explain:'Gelöscht wird erst nach Ablauf der Aufbewahrungs- und Nachweisfristen.'}
      ]
    },
    {
      id:'m33-l3', title:'Härtung, Patchmanagement und Schwachstellen', minutes:9,
      body:
        '<p><strong>Härtung</strong> bedeutet, die <strong>Angriffsfläche</strong> eines Systems zu verkleinern. Der Grundsatz lautet: Was nicht da ist, kann nicht angegriffen werden.</p>'+
        '<p><strong>Die Härtungsmaßnahmen</strong> — eine dankbare Nennaufgabe:</p>'+
        '<ul><li>nicht benötigte <strong>Dienste und Rollen deaktivieren</strong></li>'+
        '<li>nicht benötigte <strong>Software deinstallieren</strong></li>'+
        '<li><strong>Standardpasswörter ändern</strong> und Standardkonten deaktivieren oder umbenennen</li>'+
        '<li>nicht benötigte <strong>Ports schließen</strong>, Firewall restriktiv konfigurieren</li>'+
        '<li><strong>Rechte minimieren</strong>, kein Dauerbetrieb mit Administratorrechten</li>'+
        '<li><strong>Protokollierung</strong> aktivieren und Logs zentral sammeln</li>'+
        '<li><strong>Verschlüsselung</strong> aktivieren, unsichere Protokolle abschalten (Telnet, FTP, SMBv1)</li>'+
        '<li>automatische <strong>Bildschirmsperre</strong> und Startreihenfolge im BIOS absichern</li></ul>'+
        '<p><strong>Patchmanagement</strong> ist der geregelte Prozess, Sicherheitsupdates einzuspielen: Schwachstellen beobachten → bewerten → in einer Testgruppe einspielen → gestaffelt ausrollen → Erfolg prüfen → dokumentieren. Der <strong>Zielkonflikt</strong> ist Prüfungsstoff: Schnelles Patchen schließt Lücken, birgt aber das Risiko von Inkompatibilitäten. Gelöst wird er durch Teststufen und Wartungsfenster — nicht dadurch, dass man gar nicht patcht.</p>'+
        '<p><strong>Die Begriffe rund um Schwachstellen:</strong></p>'+
        '<table class="lesson-table"><tr><th>Begriff</th><th>Bedeutung</th></tr>'+
        '<tr><td><strong>Schwachstelle</strong> (Vulnerability)</td><td>eine Schwäche, die ausgenutzt werden <em>kann</em></td></tr>'+
        '<tr><td><strong>Exploit</strong></td><td>der Code, der sie tatsächlich ausnutzt</td></tr>'+
        '<tr><td><strong>Bedrohung</strong> (Threat)</td><td>das mögliche Ereignis, das Schaden anrichtet</td></tr>'+
        '<tr><td><strong>Risiko</strong></td><td>Eintrittswahrscheinlichkeit × Schadenshöhe</td></tr>'+
        '<tr><td><strong>CVE</strong></td><td>weltweit eindeutige Nummer einer bekannten Schwachstelle</td></tr>'+
        '<tr><td><strong>CVSS</strong></td><td>Bewertung ihrer Schwere von 0,0 bis 10,0</td></tr>'+
        '<tr><td><strong>Zero-Day</strong></td><td>Schwachstelle, für die es noch keinen Patch gibt</td></tr></table>'+
        '<p><strong>Die Risikoformel</strong> ist die Grundlage jeder Priorisierung: Eine Schwachstelle mit hoher Schwere in einem System ohne Netzzugang kann weniger dringend sein als eine mittlere Lücke im öffentlich erreichbaren Webserver.</p>',
      code:
        "RISIKOBEWERTUNG - so priorisiert man\n\n"+
        "  Risiko = Eintrittswahrscheinlichkeit x Schadenshoehe\n\n"+
        "  Skala je Faktor 1 bis 5:\n"+
        "     1 = sehr gering ... 5 = sehr hoch\n\n"+
        "  Schwachstelle              W  x  S  =  Risiko  Massnahme\n"+
        "  -------------------------------------------------------------\n"+
        "  Webserver, CVSS 7.5,\n"+
        "  aus dem Internet erreichbar 5     5     25     SOFORT patchen\n\n"+
        "  Datenbankserver, CVSS 9.1,\n"+
        "  nur intern erreichbar       2     5     10     naechstes Fenster\n\n"+
        "  Testsystem, CVSS 8.0,\n"+
        "  keine Echtdaten             3     1      3     planmaessig\n\n"+
        "  Beachte: Der hoechste CVSS-Wert ist NICHT automatisch das\n"+
        "  hoechste Risiko. Erreichbarkeit und Schadenspotenzial\n"+
        "  entscheiden mit.\n\n"+
        "VIER WEGE MIT EINEM RISIKO UMZUGEHEN\n"+
        "  Vermeiden   - die riskante Taetigkeit unterlassen\n"+
        "  Vermindern  - Massnahmen ergreifen (der Normalfall)\n"+
        "  Ueberwaelzen- Versicherung, Vertrag mit Dienstleister\n"+
        "  Akzeptieren - bewusst tragen und dokumentieren",
      codeLang:'Risikomanagement',
      tip:'Die vier Umgangsarten mit einem Risiko — vermeiden, vermindern, überwälzen, akzeptieren — sind eine sichere Nennaufgabe. Wichtig ist die letzte: Ein Restrisiko bewusst zu akzeptieren ist eine legitime Entscheidung, solange sie dokumentiert und von der Leitung getragen wird. Und merke dir aus der Tabelle, dass der CVSS-Wert allein nicht priorisiert — erst die Kombination mit Erreichbarkeit und Schadenshöhe ergibt das Risiko.',
      quiz:[
        {q:'Wie berechnet sich das Risiko?', options:['Schadenshöhe geteilt durch Wahrscheinlichkeit','Eintrittswahrscheinlichkeit mal Schadenshöhe','Anzahl der Schwachstellen'], correct:1, explain:'Deshalb kann eine mittlere Lücke im Internetserver dringender sein als eine schwere intern.'},
        {q:'Was ist ein Zero-Day?', options:['Eine Schwachstelle, für die es noch keinen Patch gibt','Ein Tag ohne Sicherheitsvorfall','Ein Patch am Erscheinungstag'], correct:0, explain:'Der Name kommt daher, dass Verteidiger null Tage Vorlauf hatten.'},
        {q:'Was gehört NICHT zur Systemhärtung?', options:['Nicht benötigte Dienste abschalten','Möglichst viele Softwarepakete vorinstallieren','Standardpasswörter ändern'], correct:1, explain:'Jede zusätzliche Software vergrößert die Angriffsfläche.'}
      ]
    },
    {
      id:'m33-l4', title:'Notfallmanagement und Wiederanlauf', minutes:9,
      body:
        '<p>Wenn der Ernstfall eintritt, entscheidet die Vorbereitung. Das <strong>Notfallmanagement</strong> (Business Continuity Management) sorgt dafür, dass der Betrieb weiterläuft oder schnell wieder anläuft.</p>'+
        '<p><strong>Die Abstufung</strong> — sie wird als Zuordnungsfrage gestellt:</p>'+
        '<ul><li><strong>Störung</strong> — Beeinträchtigung im Rahmen des Normalbetriebs, mit den üblichen Mitteln lösbar.</li>'+
        '<li><strong>Notfall</strong> — der Normalbetrieb ist erheblich unterbrochen, die Standardprozesse reichen nicht mehr, eine eigene Organisation greift.</li>'+
        '<li><strong>Krise</strong> — die Existenz oder der Ruf des Unternehmens steht auf dem Spiel, die Leitung übernimmt.</li>'+
        '<li><strong>Katastrophe</strong> — großflächiges Ereignis von außen, etwa Hochwasser oder Großbrand.</li></ul>'+
        '<p><strong>Die Kennzahlen aus der Notfallplanung</strong> — sie kamen in Modul 15 schon vor und werden hier angewandt:</p>'+
        '<ul><li><strong>RTO</strong> (Recovery Time Objective) — wie lange darf der Ausfall <em>dauern</em>? Bestimmt, welche Wiederanlaufverfahren nötig sind.</li>'+
        '<li><strong>RPO</strong> (Recovery Point Objective) — wie viel Datenverlust ist tragbar? Bestimmt das <strong>Sicherungsintervall</strong>.</li>'+
        '<li><strong>MTPD</strong> — die maximal tolerierbare Ausfalldauer, ab der ein Schaden existenzbedrohend wird.</li></ul>'+
        '<p><strong>Der Notfallplan</strong> enthält: Alarmierungswege mit Erreichbarkeiten, klare Verantwortlichkeiten, Sofortmaßnahmen, Wiederanlaufreihenfolge der Systeme, Ausweichlösungen und Kommunikationsvorlagen. Er muss <strong>auch ohne funktionierende IT verfügbar</strong> sein — also ausgedruckt und an einem definierten Ort hinterlegt.</p>'+
        '<p><strong>Der Punkt, an dem die meisten Konzepte scheitern:</strong> Ein Notfallplan, der nie geübt wurde, funktioniert im Ernstfall nicht. Ebenso gilt für Backups: <strong>Eine Sicherung ohne getestete Rücksicherung ist keine Sicherung.</strong> Erst der erfolgreiche Restore beweist, dass die Daten lesbar und vollständig sind.</p>',
      code:
        "WIEDERANLAUFREIHENFOLGE - Beispiel nach Ausfall des Serverraums\n\n"+
        "  Prio 1  Netzwerk und Stromversorgung   RTO  1 h\n"+
        "          ohne sie laeuft nichts anderes\n"+
        "  Prio 2  Verzeichnisdienst / Anmeldung  RTO  2 h\n"+
        "          ohne Anmeldung kein Zugriff\n"+
        "  Prio 3  Warenwirtschaft                RTO  4 h\n"+
        "          kritischer Geschaeftsprozess\n"+
        "  Prio 4  Dateiserver                    RTO  8 h\n"+
        "  Prio 5  Mailserver                     RTO 12 h\n"+
        "  Prio 6  Intranet, Testsysteme          RTO 72 h\n\n"+
        "  Die Reihenfolge ergibt sich aus den ABHAENGIGKEITEN und\n"+
        "  der Kritikalitaet fuer den Geschaeftsprozess - nicht aus\n"+
        "  der Vorliebe der IT-Abteilung.\n\n"+
        "RPO BESTIMMT DAS SICHERUNGSINTERVALL\n"+
        "  RPO 24 h  -> taegliche Sicherung genuegt\n"+
        "  RPO  4 h  -> Sicherung alle 4 Stunden\n"+
        "  RPO  0    -> Spiegelung in Echtzeit, synchrone Replikation\n"+
        "               (deutlich teurer)\n\n"+
        "RESTORE-TEST - was geprueft wird\n"+
        "  [ ] Laesst sich das Medium ueberhaupt lesen?\n"+
        "  [ ] Sind die Daten vollstaendig und aktuell?\n"+
        "  [ ] Wie lange dauert die Rueckspielung wirklich?\n"+
        "      (Haeufig laenger als im RTO angenommen!)\n"+
        "  [ ] Funktioniert die Anwendung mit den Daten danach?\n"+
        "  [ ] Ist das Verfahren dokumentiert und ohne den\n"+
        "      einen Kollegen durchfuehrbar, der gerade Urlaub hat?",
      codeLang:'Notfallplanung',
      tip:'Der vorletzte Punkt der Restore-Checkliste ist der, an dem reale Projekte scheitern: Die Rückspielung dauert fast immer länger als geplant, weil die Datenmenge über die Jahre gewachsen ist. Wenn eine Aufgabe einen RTO nennt, prüfe, ob er mit dem gewählten Sicherungsverfahren überhaupt erreichbar ist — 2 TB von einem Bandlaufwerk zurückzuspielen dauert Stunden, nicht Minuten. Diese Rückkopplung zu erkennen, hebt eine Antwort deutlich ab.',
      quiz:[
        {q:'Was bestimmt der RPO?', options:['Wie lange die Wiederherstellung dauern darf','Das Sicherungsintervall, weil er den tolerierbaren Datenverlust angibt','Die Anzahl der Backupmedien'], correct:1, explain:'Die Dauer der Wiederherstellung regelt der RTO.'},
        {q:'Warum ist ein ungetestetes Backup wertlos?', options:['Weil es zu viel Speicher belegt','Weil erst der erfolgreiche Restore beweist, dass die Daten lesbar und vollständig sind','Weil Backups immer fehlerhaft sind'], correct:1, explain:'Der Restore-Test zeigt außerdem, wie lange die Rückspielung wirklich dauert.'},
        {q:'Wonach richtet sich die Wiederanlaufreihenfolge?', options:['Nach dem Alter der Systeme','Nach Abhängigkeiten und Kritikalität für den Geschäftsprozess','Nach der Größe der Datenmenge'], correct:1, explain:'Ohne Netzwerk und Anmeldedienst nützt der schnellste Anwendungsserver nichts.'}
      ]
    }
  ]
});
MODULES.push({
 "id": "m52",
 "part": 10,
 "partTitle": "PHP & Laravel",
 "title": "Einsteiger · PHP Schritt für Schritt",
 "lessons": [
  {
   "id": "m52-l1",
   "title": "Deine Werkstatt: PHP installieren und das erste Skript",
   "minutes": 12,
   "body": "<p>Bevor du programmierst, brauchst du drei Dinge: <strong>PHP selbst<\/strong>, einen <strong>Editor<\/strong> und ein <strong>Terminal<\/strong>. Nimm dir für diese Lektion Zeit – eine sauber eingerichtete Werkstatt erspart dir später viel Frust.<\/p> <p><strong>Schritt 1 – PHP installieren.<\/strong> Für Laravel empfiehlt das Team hinter dem Framework <strong>Laravel Herd<\/strong> (macOS und Windows): Es bringt PHP, Composer und einen lokalen Webserver in einem Paket mit. Alternativ installierst du PHP auf dem Mac mit Homebrew (<code>brew install php<\/code>), unter Linux über die Paketverwaltung.<\/p> <p><strong>Schritt 2 – prüfen.<\/strong> Öffne ein neues Terminal und tippe <code>php -v<\/code>. Erscheint eine Versionsnummer ab 8.3, ist alles bereit. Erscheint „command not found“, ist PHP nicht im Suchpfad – meistens hilft es, das Terminal neu zu öffnen.<\/p> <p><strong>Schritt 3 – Editor.<\/strong> VS Code mit der Erweiterung <em>PHP Intelephense<\/em> ist kostenlos und gut. PhpStorm ist die Profi-IDE und für Auszubildende über das JetBrains-Bildungsprogramm meist kostenlos.<\/p> <p><strong>Schritt 4 – das erste Skript.<\/strong> Lege einen Ordner an, darin eine Datei <code>hallo.php<\/code>, und führe sie mit <code>php hallo.php<\/code> im Terminal aus.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Ändere die Zeile mit <code>echo<\/code> so, dass dein Name ausgegeben wird. Lösche dann absichtlich ein Semikolon und führe das Skript erneut aus. Lies die Fehlermeldung genau: Welche Zeile nennt sie?<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>„Parse error: syntax error, unexpected …“ nennt oft die Zeile <em>nach<\/em> dem eigentlichen Fehler. PHP merkt erst dort, dass etwas fehlt. Schau also immer auch eine Zeile weiter oben nach.<\/p><\/div>",
   "code": "# Version pruefen\nphp -v\n# PHP 8.4.x (cli) ...\n\n# Ordner anlegen und hineinwechseln\nmkdir -p ~/php-lernen && cd ~/php-lernen\n\n# Skript ausfuehren\nphp hallo.php\n\n# oder als Webseite: http://localhost:8000/hallo.php\nphp -S localhost:8000",
   "codeLang": "Bash",
   "code2": "<?php\n// hallo.php\ndeclare(strict_types=1);\n\n// Waehrend des Lernens: alle Fehler sichtbar machen\nerror_reporting(E_ALL);\nini_set('display_errors', '1');\n\n$name = 'Ada';\necho \"Hallo, $name!\" . PHP_EOL;\necho 'Heute ist ' . date('d.m.Y') . PHP_EOL;",
   "code2Lang": "PHP",
   "tip": "Lass dir beim Lernen alle Fehler anzeigen. Ein <code>php -i | grep display_errors<\/code> zeigt, ob das eingeschaltet ist. Auf einem echten Server gilt das Gegenteil: Fehler werden dort protokolliert, aber nie im Browser angezeigt, weil sie Pfade und Interna verraten.",
   "quiz": [
    {
     "q": "Mit welchem Befehl prüfst du, ob PHP installiert ist und welche Version läuft?",
     "options": [
      "php -v",
      "php check",
      "php --start"
     ],
     "correct": 0,
     "explain": "php -v gibt die Version aus. php -a öffnet zusätzlich eine interaktive Shell zum Ausprobieren."
    },
    {
     "q": "Eine Fehlermeldung nennt Zeile 8, aber dort sieht alles korrekt aus. Wo suchst du zuerst?",
     "options": [
      "In Zeile 1",
      "In der Zeile davor, z. B. nach einem fehlenden Semikolon",
      "In einer anderen Datei"
     ],
     "correct": 1,
     "explain": "Der Parser bemerkt den Fehler erst an der nächsten Stelle, die nicht mehr passt."
    },
    {
     "q": "Warum zeigt man Fehler auf einem Produktionsserver nicht im Browser an?",
     "options": [
      "Weil Browser sie nicht darstellen können",
      "Weil sie den Server verlangsamen",
      "Weil sie Pfade und interne Details an Angreifer verraten"
     ],
     "correct": 2,
     "explain": "In Produktion: display_errors aus, log_errors an."
    }
   ]
  },
  {
   "id": "m52-l2",
   "title": "Text ausgeben: echo, Strings und Verkettung",
   "minutes": 13,
   "body": "<p>Fast jedes Programm gibt Text aus. In PHP heißt Text <strong>String<\/strong>. Es gibt zwei Schreibweisen, und der Unterschied ist wichtiger, als er aussieht:<\/p> <table class=\"lesson-table\"><tr><th>Schreibweise<\/th><th>Variablen werden ersetzt?<\/th><th>Escape-Sequenzen wie \\n<\/th><th>Beispiel<\/th><\/tr> <tr><td><code>'einfach'<\/code><\/td><td>nein<\/td><td>nur <code>\\'<\/code> und <code>\\\\<\/code><\/td><td><code>'Preis: $preis'<\/code> bleibt wörtlich<\/td><\/tr> <tr><td><code>\"doppelt\"<\/code><\/td><td>ja<\/td><td>ja: <code>\\n<\/code>, <code>\\t<\/code>, <code>\\\"<\/code>, <code>\\$<\/code><\/td><td><code>\"Preis: $preis\"<\/code> setzt den Wert ein<\/td><\/tr><\/table> <p>Strings verbindest du mit dem <strong>Punkt<\/strong>: <code>'Hallo ' . $name<\/code>. Mit <code>.=<\/code> hängst du an eine vorhandene Variable an. Für komplexere Ausdrücke in doppelten Anführungszeichen setzt du geschweifte Klammern: <code>\"Summe: {$rechnung['summe']} EUR\"<\/code>.<\/p> <p>Für sauber formatierte Ausgaben gibt es <strong>sprintf<\/strong>: Platzhalter im Text, Werte dahinter. <code>%s<\/code> steht für einen String, <code>%d<\/code> für eine Ganzzahl, <code>%.2f<\/code> für eine Kommazahl mit zwei Nachkommastellen, <code>%05d<\/code> füllt mit Nullen auf.<\/p> <p>Für längeren Text mit vielen Zeilen ist <strong>Heredoc<\/strong> praktisch: <code>&lt;&lt;&lt;TEXT … TEXT;<\/code> verhält sich wie doppelte Anführungszeichen. Die Variante mit Anführungszeichen um den Namen (Nowdoc, <code>&lt;&lt;&lt;'TEXT'<\/code>) wie einfache.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Schreibe eine Zeile, die „Artikel 007 kostet 4,90 EUR“ ausgibt – mit <code>sprintf<\/code>, der Artikelnummer als Zahl <code>7<\/code> und dem Preis als <code>4.9<\/code>. Tipp: <code>%03d<\/code> und <code>number_format<\/code>.<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Mit <code>+<\/code> statt <code>.<\/code> rechnet PHP, statt zu verbinden: <code>'3' + '4'<\/code> ergibt <code>7<\/code>, nicht <code>'34'<\/code>. Bei Texten ohne Zahl bricht PHP 8 sogar mit einem Fehler ab.<\/p><\/div>",
   "code": "<?php\ndeclare(strict_types=1);\n\n$vorname = 'Ada';\n$punkte  = 87;\n$quote   = 0.8734;\n\necho 'Hallo $vorname' . PHP_EOL;             // Hallo $vorname\necho \"Hallo $vorname\" . PHP_EOL;             // Hallo Ada\necho 'Hallo ' . $vorname . '!' . PHP_EOL;    // Hallo Ada!\n\n$zeile = 'Punkte: ';\n$zeile .= $punkte;                           // anhaengen\necho $zeile . PHP_EOL;                       // Punkte: 87\n\nprintf(\"%s hat %d Punkte (%.1f %%)\\n\", $vorname, $punkte, $quote * 100);\n// Ada hat 87 Punkte (87.3 %)\n\necho sprintf('Bestellung %05d', 42) . PHP_EOL;   // Bestellung 00042\n\n$mail = <<<TEXT\nHallo $vorname,\n\ndein Ergebnis: $punkte Punkte.\nTEXT;\necho $mail;",
   "codeLang": "PHP",
   "tip": "Im Berufsalltag begegnet dir <code>sprintf<\/code> ständig – in Log-Meldungen, Rechnungsnummern und Übersetzungen. Gewöhne dir an, Texte mit Platzhaltern zu bauen statt mit langen Punkt-Ketten. Das ist lesbarer und lässt sich später leichter übersetzen.",
   "quiz": [
    {
     "q": "Was gibt echo 'Wert: $x'; aus, wenn $x = 5 ist?",
     "options": [
      "Wert: $x",
      "Einen Fehler",
      "Wert: 5"
     ],
     "correct": 0,
     "explain": "In einfachen Anführungszeichen werden Variablen nicht ersetzt."
    },
    {
     "q": "Mit welchem Operator hängst du Text an eine bestehende Variable an?",
     "options": [
      "+=",
      ".=",
      "&="
     ],
     "correct": 1,
     "explain": "$text .= \"mehr\"; ist die Kurzform von $text = $text . \"mehr\";"
    },
    {
     "q": "Was erzeugt sprintf(\"%05d\", 42)?",
     "options": [
      "42   ",
      "42.000",
      "00042"
     ],
     "correct": 2,
     "explain": "%05d füllt auf fünf Stellen mit führenden Nullen auf – typisch für Rechnungs- und Artikelnummern."
    }
   ]
  },
  {
   "id": "m52-l3",
   "title": "Zahlen und Rechnen ohne Überraschungen",
   "minutes": 13,
   "body": "<p>PHP kennt zwei Zahlentypen: <strong>int<\/strong> für Ganzzahlen und <strong>float<\/strong> für Kommazahlen. Die Grundrechenarten funktionieren wie erwartet – mit ein paar Eigenheiten, die du einmal bewusst gesehen haben solltest:<\/p> <table class=\"lesson-table\"><tr><th>Ausdruck<\/th><th>Ergebnis<\/th><th>Warum<\/th><\/tr> <tr><td><code>10 / 5<\/code><\/td><td><code>2<\/code> (int)<\/td><td>geht glatt auf<\/td><\/tr> <tr><td><code>10 / 4<\/code><\/td><td><code>2.5<\/code> (float)<\/td><td><code>/<\/code> liefert bei Rest eine Kommazahl<\/td><\/tr> <tr><td><code>intdiv(10, 4)<\/code><\/td><td><code>2<\/code><\/td><td>ganzzahlige Division, schneidet ab<\/td><\/tr> <tr><td><code>10 % 4<\/code><\/td><td><code>2<\/code><\/td><td>Rest der Division (Modulo)<\/td><\/tr> <tr><td><code>-7 % 3<\/code><\/td><td><code>-1<\/code><\/td><td>das Vorzeichen folgt dem linken Operanden<\/td><\/tr> <tr><td><code>2 ** 10<\/code><\/td><td><code>1024<\/code><\/td><td>Potenz<\/td><\/tr> <tr><td><code>round(2.5)<\/code><\/td><td><code>3<\/code><\/td><td>kaufmännisch: .5 wird von der Null weg gerundet<\/td><\/tr> <tr><td><code>0.1 + 0.2 == 0.3<\/code><\/td><td><code>false<\/code><\/td><td>Kommazahlen sind binär nur angenähert<\/td><\/tr><\/table> <p>Der letzte Punkt ist kein PHP-Fehler, sondern betrifft jede Sprache, die Gleitkommazahlen nach IEEE 754 speichert. Für Geld gilt deshalb: in <strong>Cent als int<\/strong> rechnen und erst bei der Ausgabe formatieren.<\/p> <p>Zur Ausgabe in deutscher Schreibweise nutzt du <code>number_format($zahl, 2, ',', '.')<\/code> – Dezimalkomma und Tausenderpunkt. Kurzschreibweisen sparen Tipparbeit: <code>$i++<\/code> erhöht um eins, <code>$summe += $preis<\/code> addiert.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Berechne den Bruttopreis von 3 Artikeln zu je 19,99 EUR netto bei 19 % MwSt. – einmal mit Floats und einmal in Cent. Gib beide Ergebnisse mit <code>var_dump<\/code> aus und vergleiche.<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p><code>if ($a + $b == 0.3)<\/code> mit Kommazahlen ist fast immer falsch. Vergleiche Floats mit einer Toleranz: <code>abs(($a + $b) - 0.3) &lt; 0.00001<\/code> – oder rechne gleich in Ganzzahlen.<\/p><\/div>",
   "code": "<?php\ndeclare(strict_types=1);\n\nvar_dump(10 / 5);        // int(2)\nvar_dump(10 / 4);        // float(2.5)\nvar_dump(intdiv(10, 4)); // int(2)\nvar_dump(10 % 4);        // int(2)\n\n// Warenkorb in Cent - exakt\n$preisCent = 1999;\n$menge     = 3;\n$nettoCent = $preisCent * $menge;                       // 5997\n$bruttoCent = (int) round($nettoCent * 1.19);           // 7136\n\necho number_format($bruttoCent / 100, 2, ',', '.') . ' EUR' . PHP_EOL;   // 71,36 EUR\n\n// Gleitkomma-Falle\nvar_dump(0.1 + 0.2 == 0.3);                    // bool(false)\nvar_dump(abs((0.1 + 0.2) - 0.3) < 0.00001);    // bool(true)\n\n$zaehler = 0;\n$zaehler++;           // 1\n$zaehler += 5;        // 6\necho $zaehler . PHP_EOL;",
   "codeLang": "PHP",
   "tip": "Wenn du in einer Prüfung oder im Code-Review eine Geldberechnung mit Floats siehst, sprich es an. Für exakte Dezimalrechnung gibt es außerdem die Erweiterung <code>bcmath<\/code> (<code>bcadd('0.1', '0.2', 2)<\/code>), die mit Zahlen als Strings arbeitet.",
   "quiz": [
    {
     "q": "Was ergibt 10 / 4 in PHP?",
     "options": [
      "2.5",
      "3",
      "2"
     ],
     "correct": 0,
     "explain": "Der Operator / liefert einen float, wenn die Division nicht aufgeht. Für Ganzzahldivision gibt es intdiv()."
    },
    {
     "q": "Welchen Wert hat -7 % 3?",
     "options": [
      "2",
      "-1",
      "1"
     ],
     "correct": 1,
     "explain": "Beim Modulo folgt das Vorzeichen des Ergebnisses dem linken Operanden."
    },
    {
     "q": "Wie rechnet man Geldbeträge am sichersten?",
     "options": [
      "Als String",
      "Mit float und round() am Ende",
      "In Cent als int"
     ],
     "correct": 2,
     "explain": "Ganzzahlen sind exakt. Formatiert wird erst bei der Ausgabe."
    }
   ]
  },
  {
   "id": "m52-l4",
   "title": "Entscheidungen: if, else und Wahrheitswerte",
   "minutes": 13,
   "body": "<p>Mit <code>if<\/code> entscheidet dein Programm. Die Bedingung in den Klammern wird zu <strong>true<\/strong> oder <strong>false<\/strong> ausgewertet; bei true läuft der Block in geschweiften Klammern.<\/p> <p>Vergleiche liefern Wahrheitswerte: <code>===<\/code> (gleich und gleicher Typ), <code>!==<\/code>, <code>&lt;<\/code>, <code>&gt;<\/code>, <code>&lt;=<\/code>, <code>&gt;=<\/code>. Verknüpft werden sie mit <code>&amp;&amp;<\/code> (und), <code>||<\/code> (oder) und <code>!<\/code> (nicht).<\/p> <p>Spannend wird es, wenn kein Boolean in der Bedingung steht. Dann wandelt PHP den Wert um – und diese Tabelle solltest du kennen:<\/p> <table class=\"lesson-table\"><tr><th>wird zu false<\/th><th>wird zu true (Auswahl)<\/th><\/tr> <tr><td><code>false<\/code>, <code>0<\/code>, <code>0.0<\/code><\/td><td>jede andere Zahl, auch <code>-1<\/code><\/td><\/tr> <tr><td><code>\"\"<\/code> (leerer String) und <code>\"0\"<\/code><\/td><td><code>\"0.0\"<\/code>, <code>\" \"<\/code>, <code>\"false\"<\/code><\/td><\/tr> <tr><td><code>[]<\/code> (leeres Array)<\/td><td><code>[0]<\/code> – ein Array mit Inhalt<\/td><\/tr> <tr><td><code>null<\/code><\/td><td>jedes Objekt<\/td><\/tr><\/table> <p>Der String <code>\"0\"<\/code> ist der Klassiker: Eine Eingabe „0“ aus einem Formular gilt als false. Prüfe deshalb lieber ausdrücklich, was du meinst: <code>if ($eingabe !== '')<\/code> statt <code>if ($eingabe)<\/code>.<\/p> <p>Viele verschachtelte ifs lassen sich mit <strong>frühem Return<\/strong> (Guard Clause) entwirren: Erst die Sonderfälle abfangen und sofort zurückkehren, dann folgt der Normalfall ohne Einrückung.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Schreibe eine Funktion <code>note(int $punkte): string<\/code>, die ab 92 „sehr gut“, ab 81 „gut“, ab 67 „befriedigend“, ab 50 „ausreichend“ und darunter „nicht bestanden“ liefert – einmal mit if/elseif, einmal mit frühen Returns.<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p><code>if ($alter = 18)<\/code> ist eine <em>Zuweisung<\/em>, kein Vergleich – die Bedingung ist dann immer wahr. Manche schreiben deshalb Vergleiche andersherum: <code>if (18 === $alter)<\/code>. Ein fehlendes Gleichheitszeichen erzeugt so einen Fehler statt eines stillen Bugs.<\/p><\/div>",
   "code": "<?php\ndeclare(strict_types=1);\n\nfunction versandkosten(int $warenwertCent, string $land): int\n{\n    // Guard Clauses: Sonderfaelle zuerst\n    if ($warenwertCent <= 0) {\n        throw new InvalidArgumentException('Leerer Warenkorb');\n    }\n    if ($land !== 'DE') {\n        return 1490;                  // Ausland pauschal\n    }\n    if ($warenwertCent >= 5000) {\n        return 0;                     // ab 50 EUR versandkostenfrei\n    }\n    return 495;\n}\n\necho versandkosten(2000, 'DE') . PHP_EOL;   // 495\necho versandkosten(6000, 'DE') . PHP_EOL;   // 0\necho versandkosten(6000, 'AT') . PHP_EOL;   // 1490\n\n// Wahrheitswerte\nvar_dump((bool) '0');     // bool(false)\nvar_dump((bool) '0.0');   // bool(true)\nvar_dump((bool) []);      // bool(false)\nvar_dump((bool) [0]);     // bool(true)",
   "codeLang": "PHP",
   "tip": "<code>&amp;&amp;<\/code> bindet stärker als <code>||<\/code>, und die Wörter <code>and<\/code> und <code>or<\/code> binden schwächer als <code>=<\/code>. Daher die Regel aus fast jedem Style-Guide: Nimm <code>&amp;&amp;<\/code> und <code>||<\/code> und setze Klammern, sobald beide in einer Bedingung vorkommen.",
   "quiz": [
    {
     "q": "Welcher Wert gilt in einer if-Bedingung als false?",
     "options": [
      "\"0\"",
      "\" \"",
      "\"0.0\""
     ],
     "correct": 0,
     "explain": "Nur der String \"0\" und der leere String \"\" sind false. \"0.0\" und ein Leerzeichen sind true."
    },
    {
     "q": "Was ist eine Guard Clause?",
     "options": [
      "Eine Sicherheitsabfrage für Passwörter",
      "Ein früher Return für Sonderfälle am Anfang einer Funktion",
      "Ein try-Block"
     ],
     "correct": 1,
     "explain": "Sie reduziert die Verschachtelung: Sonderfälle zuerst, dann der Normalfall."
    },
    {
     "q": "Was passiert bei if ($x = 5)?",
     "options": [
      "Ein Syntaxfehler",
      "$x wird mit 5 verglichen",
      "$x bekommt den Wert 5 und die Bedingung ist wahr"
     ],
     "correct": 2,
     "explain": "Ein einzelnes = ist eine Zuweisung. Der Ausdruck hat den Wert 5 und gilt damit als true."
    }
   ]
  },
  {
   "id": "m52-l5",
   "title": "Schleifen Schritt für Schritt",
   "minutes": 14,
   "body": "<p>Schleifen wiederholen Code. PHP hat vier Arten, und jede hat ihren Einsatzzweck:<\/p> <table class=\"lesson-table\"><tr><th>Schleife<\/th><th>Wann<\/th><th>Mindestdurchläufe<\/th><\/tr> <tr><td><code>for<\/code><\/td><td>Anzahl ist vorher bekannt<\/td><td>0<\/td><\/tr> <tr><td><code>while<\/code><\/td><td>wiederholen, solange eine Bedingung gilt<\/td><td>0<\/td><\/tr> <tr><td><code>do … while<\/code><\/td><td>erst ausführen, dann prüfen<\/td><td>1<\/td><\/tr> <tr><td><code>foreach<\/code><\/td><td>jedes Element eines Arrays<\/td><td>0<\/td><\/tr><\/table> <p>Die <code>for<\/code>-Schleife hat drei Teile, getrennt durch Semikolons: <strong>Start<\/strong> (<code>$i = 1<\/code>), <strong>Bedingung<\/strong> (<code>$i &lt;= 10<\/code>) und <strong>Schritt<\/strong> (<code>$i++<\/code>). Lies sie laut: „Beginne bei 1, solange i höchstens 10 ist, erhöhe nach jedem Durchlauf um 1.“<\/p> <p>Mit <code>break<\/code> verlässt du eine Schleife sofort, mit <code>continue<\/code> springst du zum nächsten Durchlauf. Beides ist nützlich, aber sparsam einzusetzen – zu viele Sprünge machen Schleifen schwer lesbar.<\/p> <p>Der wichtigste Werkzeugkasten für Schleifen ist der <strong>Trockenlauf<\/strong>: Lege eine Tabelle mit einer Spalte pro Variable an und gehe Durchlauf für Durchlauf durch. Genau so prüft auch die AP1 Algorithmen.<\/p><div class=\"rb-probier\"><span class=\"rb-box-titel\">Probier es aus<\/span><p>Lass die Schleife unten (Einmaleins) im Kopf laufen und schreibe die ersten vier Ausgaben auf. Ändere sie dann so, dass nur gerade Ergebnisse ausgegeben werden – mit <code>continue<\/code>.<\/p><\/div><div class=\"rb-falle\"><span class=\"rb-box-titel\">Typischer Fehler<\/span><p>Endlosschleife: Wird die Variable in der Bedingung nie verändert (<code>while ($i &lt; 10)<\/code> ohne <code>$i++<\/code>), läuft das Skript, bis PHP es nach <code>max_execution_time<\/code> abbricht – in der Konsole sogar unbegrenzt. Abbrechen mit <kbd>Strg<\/kbd>+<kbd>C<\/kbd>.<\/p><\/div>",
   "code": "<?php\ndeclare(strict_types=1);\n\n// for: das kleine Einmaleins der 7\nfor ($i = 1; $i <= 10; $i++) {\n    echo \"7 x $i = \" . (7 * $i) . PHP_EOL;\n}\n\n// while: Zinseszins - wie viele Jahre bis zur Verdopplung?\n$kapital = 1000.0;\n$jahre   = 0;\nwhile ($kapital < 2000) {\n    $kapital *= 1.05;\n    $jahre++;\n}\necho \"Verdoppelt nach $jahre Jahren\" . PHP_EOL;     // 15\n\n// do-while: mindestens einmal\ndo {\n    $wurf = random_int(1, 6);\n    echo \"Gewuerfelt: $wurf\" . PHP_EOL;\n} while ($wurf !== 6);\n\n// foreach mit Schluessel und Wert, break und continue\n$lager = ['Kabel' => 12, 'Maus' => 0, 'Monitor' => 3, 'Defekt' => -1];\nforeach ($lager as $artikel => $bestand) {\n    if ($bestand < 0) {\n        break;                         // Datenfehler: abbrechen\n    }\n    if ($bestand === 0) {\n        continue;                      // ausverkauft: ueberspringen\n    }\n    echo \"$artikel: $bestand Stueck\" . PHP_EOL;\n}",
   "codeLang": "PHP",
   "tip": "Kannst du bei einer Schleife nicht sicher sagen, wie oft sie läuft, schreib vor der Schleife einen Kommentar mit der Abbruchbedingung in Worten. Das zwingt dich, den Fall „läuft nie“ und „läuft endlos“ zu durchdenken – und hilft der Kollegin, die den Code später liest.",
   "quiz": [
    {
     "q": "Welche Schleife läuft mindestens einmal?",
     "options": [
      "while",
      "do … while",
      "for"
     ],
     "correct": 1,
     "explain": "do … while prüft die Bedingung erst nach dem ersten Durchlauf."
    },
    {
     "q": "Was bewirkt continue in einer Schleife?",
     "options": [
      "Beendet die Schleife",
      "Springt zum nächsten Durchlauf",
      "Wiederholt den aktuellen Durchlauf"
     ],
     "correct": 1,
     "explain": "break beendet die Schleife ganz, continue überspringt nur den Rest des aktuellen Durchlaufs."
    },
    {
     "q": "Wie oft läuft for ($i = 0; $i < 5; $i++)?",
     "options": [
      "6-mal",
      "4-mal",
      "5-mal"
     ],
     "correct": 2,
     "explain": "i nimmt die Werte 0, 1, 2, 3, 4 an – fünf Durchläufe."
    }
   ]
  }
 ]
});
