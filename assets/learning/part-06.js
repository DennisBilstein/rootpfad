var EXERCISES = [
{
  id:'ex1', level:1, topic:'Pseudocode', title:'Durchschnitt mit Filterbedingung',
  task:'<p>Schreibe einen <strong>Pseudocode-Algorithmus</strong>, der aus einem Array <code>messwerte</code> den Durchschnitt aller Werte berechnet, die <strong>größer als 0</strong> sind. Gibt es keinen solchen Wert, soll der Algorithmus <code>-1</code> zurückgeben.</p>',
  hints:[
    'Du brauchst zwei Variablen: eine Summe und einen Zähler für die berücksichtigten Werte.',
    'Die Division darf erst nach der Schleife erfolgen — und nur, wenn der Zähler größer als 0 ist.',
    'Die Division durch null ist der eigentliche Prüfungspunkt dieser Aufgabe. Ohne die Abfrage gibt es Punktabzug.'
  ],
  solution:
    "FUNKTION durchschnittPositiv(messwerte)\n"+
    "  summe  <- 0\n"+
    "  anzahl <- 0\n"+
    "  FUER i VON 0 BIS LAENGE(messwerte) - 1 TUE\n"+
    "    WENN messwerte[i] > 0 DANN\n"+
    "      summe  <- summe + messwerte[i]\n"+
    "      anzahl <- anzahl + 1\n"+
    "    ENDEWENN\n"+
    "  ENDEFUER\n"+
    "  WENN anzahl > 0 DANN\n"+
    "    GIB summe / anzahl ZURUECK\n"+
    "  SONST\n"+
    "    GIB -1 ZURUECK\n"+
    "  ENDEWENN\n"+
    "ENDEFUNKTION",
  solutionLang:'Pseudocode',
  solutionNote:'Das Muster „Akkumulator plus Zähler plus Division nach der Schleife" kommt in jeder zweiten AP1 vor. Der Prüfungspunkt steckt in der Abfrage auf anzahl > 0: Ohne sie entsteht bei einem Array ohne positive Werte eine Division durch null. Beachte außerdem die Grenze LAENGE - 1, weil Arrays bei 0 beginnen.'
},
{
  id:'ex2', level:1, topic:'Subnetting', title:'Netz, Broadcast und Hostbereich bestimmen',
  task:'<p>Gegeben ist die Adresse <strong>192.168.30.150 / 255.255.255.192</strong>.</p>'+
    '<p>Bestimme: (a) das CIDR-Präfix, (b) die Netzadresse, (c) die Broadcast-Adresse, (d) den nutzbaren Hostbereich und (e) die Anzahl der nutzbaren Hosts.</p>',
  hints:[
    'Zerlege 192 binär: 11000000. Zähle die Einsen über alle vier Oktette hinweg.',
    'Die Blockgröße erhältst du mit 256 minus dem Maskenwert des letzten Oktetts.',
    'Die Netze beginnen bei Vielfachen der Blockgröße. Suche, in welchen Block die .150 fällt.'
  ],
  solution:
    "(a) Praefix\n"+
    "    255 = 11111111 (8 Bit) x 3 = 24 Bit\n"+
    "    192 = 11000000 (2 Bit)\n"+
    "    -> /26\n\n"+
    "(b) Blockgroesse = 256 - 192 = 64\n"+
    "    Netze beginnen bei:  .0   .64   .128   .192\n"+
    "    .150 liegt zwischen .128 und .191\n"+
    "    -> Netzadresse 192.168.30.128\n\n"+
    "(c) Broadcast = naechster Netzanfang - 1 = .192 - 1\n"+
    "    -> 192.168.30.191\n\n"+
    "(d) Hostbereich 192.168.30.129 bis 192.168.30.190\n\n"+
    "(e) Hostbits = 32 - 26 = 6\n"+
    "    2^6 - 2 = 64 - 2 = 62 nutzbare Hosts",
  solutionLang:'Subnetting',
  solutionNote:'Die Blockgrößen-Methode ersetzt jede Binärrechnung und dauert unter einer Minute. Merke dir die Logik: Broadcast ist immer die Adresse direkt vor dem nächsten Netzanfang. Der Abzug von zwei Adressen gilt nur bei IPv4 — bei IPv6 wird nichts abgezogen, weil es dort keinen Broadcast gibt.'
},
{
  id:'ex3', level:1, topic:'Einheiten', title:'Übertragungsdauer eines Backups',
  task:'<p>Ein Backup von <strong>6 GB</strong> soll über eine Standleitung mit <strong>200 Mbit/s</strong> in ein Rechenzentrum übertragen werden. Die Leitung ist effektiv nur zu <strong>75 %</strong> nutzbar.</p>'+
    '<p>Berechne die Übertragungsdauer in Minuten und Sekunden. Gib den vollständigen Rechenweg an.</p>',
  hints:[
    'Datenmengen stehen in Byte, Datenraten in Bit pro Sekunde. Der Faktor 8 fehlt sonst.',
    'Die effektive Auslastung reduziert die Rate — das musst du vor der Division tun.',
    'Rechne mit dezimalen Präfixen: 1 GB = 10^9 Byte.'
  ],
  solution:
    "1. Datenmenge in Bit\n"+
    "   6 GB = 6 x 10^9 Byte\n"+
    "   6 x 10^9 x 8 = 48 x 10^9 Bit = 48.000.000.000 Bit\n\n"+
    "2. Effektive Datenrate\n"+
    "   200 Mbit/s x 0,75 = 150 Mbit/s = 150.000.000 Bit/s\n\n"+
    "3. Dauer\n"+
    "   t = 48.000.000.000 / 150.000.000 = 320 s\n\n"+
    "4. Umrechnung\n"+
    "   320 s = 5 Minuten 20 Sekunden\n\n"+
    "Antwort: Die Uebertragung dauert 5 Minuten und 20 Sekunden.",
  solutionLang:'Berechnung',
  solutionNote:'Drei Fallen stecken in dieser Standardaufgabe: der vergessene Faktor 8, die überlesene effektive Auslastung und die Verwechslung von GB mit GiB. Schreibe jeden Zwischenschritt mit Einheit hin — die IHK vergibt Teilpunkte auf den Rechenweg, selbst wenn das Endergebnis falsch ist.'
},
{
  id:'ex4', level:1, topic:'OSI-Modell', title:'Protokolle und Geräte zuordnen',
  task:'<p>Ordne jedem Begriff die passende OSI-Schicht mit <strong>Nummer und Namen</strong> zu und begründe jeweils in einem Satz:</p>'+
    '<div class="check-prompt">Switch  ·  DHCP  ·  Router  ·  TCP  ·  ARP  ·  HTTPS  ·  Patchkabel</div>',
  hints:[
    'Frage nicht, worüber ein Protokoll spricht, sondern auf welcher Ebene es selbst arbeitet.',
    'DHCP verteilt zwar IP-Adressen, setzt aber selbst auf UDP auf.',
    'ARP verbindet Schicht 3 mit Schicht 2 — es wird der Sicherungsschicht zugerechnet.'
  ],
  solution:
    "Patchkabel  -> Schicht 1, Bituebertragung\n"+
    "               Uebertraegt physikalische Signale, kennt keine Adressen.\n\n"+
    "Switch      -> Schicht 2, Sicherung\n"+
    "               Leitet Frames anhand der MAC-Adresse gezielt weiter.\n\n"+
    "ARP         -> Schicht 2, Sicherung\n"+
    "               Loest zu einer IP die MAC-Adresse im lokalen Netz auf.\n\n"+
    "Router      -> Schicht 3, Vermittlung\n"+
    "               Entscheidet anhand der IP-Adresse ueber den Weg zwischen Netzen.\n\n"+
    "TCP         -> Schicht 4, Transport\n"+
    "               Stellt eine gesicherte Ende-zu-Ende-Verbindung ueber Ports her.\n\n"+
    "DHCP        -> Schicht 7, Anwendung\n"+
    "               Ist ein Anwendungsprotokoll, das auf UDP aufsetzt.\n\n"+
    "HTTPS       -> Schicht 7, Anwendung (Verschluesselung auf Schicht 6 per TLS)\n"+
    "               Uebertraegt Webinhalte, TLS liegt darunter.",
  solutionLang:'Zuordnung',
  solutionNote:'DHCP und ARP sind die beiden Begriffe, an denen diese Aufgabe regelmäßig entschieden wird. Wer DHCP wegen der IP-Vergabe auf Schicht 3 setzt, verliert den Punkt. Bei HTTPS akzeptiert die IHK sowohl Schicht 7 als auch den Hinweis auf TLS in Schicht 6 — nenne am besten beides.'
},
{
  id:'ex5', level:1, topic:'ER-Modell', title:'Kardinalitäten aus einem Text ableiten',
  task:'<p>Eine Kfz-Werkstatt beschreibt ihren Betrieb so:</p>'+
    '<div class="check-prompt">„Jeder Kunde kann mehrere Fahrzeuge besitzen, jedes Fahrzeug gehört genau einem Kunden. Zu jedem Fahrzeug werden im Laufe der Zeit mehrere Reparaturaufträge erfasst. An einem Reparaturauftrag können mehrere Mechaniker arbeiten, und jeder Mechaniker arbeitet an mehreren Aufträgen. Für jeden Auftrag wird genau eine Rechnung erstellt."</div>'+
    '<p>Nenne alle Beziehungen mit ihrer Kardinalität und gib an, wo Fremdschlüssel bzw. Zwischentabellen entstehen.</p>',
  hints:[
    'Lies jeden Satz in beide Richtungen — die Kardinalität ergibt sich immer aus beiden Blickwinkeln.',
    'Signalwörter: „genau ein" ergibt 1, „mehrere" oder „beliebig viele" ergibt n.',
    'Nur bei n:m entsteht eine eigene Tabelle. Bei 1:n wandert der Fremdschlüssel auf die n-Seite.'
  ],
  solution:
    "Kunde  1 : n  Fahrzeug\n"+
    "  -> Fremdschluessel KundenNr in Fahrzeug\n\n"+
    "Fahrzeug  1 : n  Reparaturauftrag\n"+
    "  -> Fremdschluessel FahrzeugNr in Reparaturauftrag\n\n"+
    "Reparaturauftrag  n : m  Mechaniker\n"+
    "  -> Zwischentabelle Auftrag_Mechaniker\n"+
    "     (#AuftragsNr, #PersonalNr, evtl. Arbeitszeit)\n\n"+
    "Reparaturauftrag  1 : 1  Rechnung\n"+
    "  -> Fremdschluessel AuftragsNr in Rechnung (oder umgekehrt)\n\n"+
    "Relationenmodell:\n"+
    "  Kunde(KundenNr, Name, Adresse)\n"+
    "  Fahrzeug(Kennzeichen, Modell, Baujahr, #KundenNr)\n"+
    "  Reparaturauftrag(AuftragsNr, Datum, Beschreibung, #Kennzeichen)\n"+
    "  Mechaniker(PersonalNr, Name, Qualifikation)\n"+
    "  Auftrag_Mechaniker(#AuftragsNr, #PersonalNr, Arbeitszeit)\n"+
    "  Rechnung(RechnungsNr, Betrag, Datum, #AuftragsNr)",
  solutionLang:'ER-Modell',
  solutionNote:'Bei einer n:m-Beziehung wird die Zwischentabelle fast immer erwartet — und sie ist die Stelle, an der zusätzliche Attribute wie die Arbeitszeit ihren Platz finden. Sie gehören weder zum Auftrag noch zum Mechaniker, sondern zur Verbindung beider. Wer das erkennt, zeigt echtes Modellierungsverständnis.'
},
{
  id:'ex6', level:1, topic:'Wirtschaft', title:'Bezugspreis und Angebotsvergleich',
  task:'<p>Zwei Anbieter machen ein Angebot für 15 identische Notebooks:</p>'+
    '<div class="check-prompt">Anbieter A: Listenpreis 1.200 € pro Gerät, 12 % Rabatt, 2 % Skonto, Versand 180 € gesamt\nAnbieter B: Listenpreis 1.150 € pro Gerät, 8 % Rabatt, 3 % Skonto, Versand frei</div>'+
    '<p>Berechne den Bezugspreis beider Angebote (netto) und gib eine begründete Empfehlung.</p>',
  hints:[
    'Rechne zuerst mit dem Gesamtlistenpreis für alle 15 Geräte, das spart Zwischenschritte.',
    'Das Skonto wird vom bereits rabattierten Zieleinkaufspreis berechnet, nicht vom Listenpreis.',
    'Die Bezugskosten kommen nach dem Skontoabzug hinzu — auf Fracht gibt es keinen Skonto.'
  ],
  solution:
    "ANBIETER A\n"+
    "  Listeneinkaufspreis  15 x 1.200 =  18.000,00\n"+
    "  - Rabatt 12 %                   -  2.160,00\n"+
    "  = Zieleinkaufspreis                15.840,00\n"+
    "  - Skonto 2 % (von 15.840)       -    316,80\n"+
    "  = Bareinkaufspreis                 15.523,20\n"+
    "  + Bezugskosten                  +    180,00\n"+
    "  = Bezugspreis                      15.703,20 EUR\n\n"+
    "ANBIETER B\n"+
    "  Listeneinkaufspreis  15 x 1.150 =  17.250,00\n"+
    "  - Rabatt 8 %                    -  1.380,00\n"+
    "  = Zieleinkaufspreis                15.870,00\n"+
    "  - Skonto 3 % (von 15.870)       -    476,10\n"+
    "  = Bareinkaufspreis                 15.393,90\n"+
    "  + Bezugskosten                  +      0,00\n"+
    "  = Bezugspreis                      15.393,90 EUR\n\n"+
    "EMPFEHLUNG\n"+
    "  Differenz: 15.703,20 - 15.393,90 = 309,30 EUR\n"+
    "  Anbieter B ist um 309,30 EUR guenstiger und wird empfohlen -\n"+
    "  obwohl A den hoeheren Rabattsatz bietet.",
  solutionLang:'Kalkulation',
  solutionNote:'Diese Aufgabe zeigt, warum der Listenpreis nichts aussagt: Anbieter A hat den höheren Rabatt, verliert aber trotzdem. Formuliere die Empfehlung immer als vollständigen Satz mit der Differenz — eine reine Zahlenangabe ohne Entscheidung kostet Punkte, weil der Operator „empfehlen" eine Festlegung verlangt.'
},
{
  id:'ex7', level:2, topic:'Netzplan', title:'Netzplan vollständig berechnen',
  task:'<p>Ein Projekt besteht aus sieben Vorgängen:</p>'+
    '<div class="check-prompt">Vorgang   Dauer   Vorgänger\n   A        4        —\n   B        6        A\n   C        3        A\n   D        5        B\n   E        2        C\n   F        4        D, E\n   G        3        F</div>'+
    '<p>Berechne für jeden Vorgang FAZ, FEZ, SAZ, SEZ und den Gesamtpuffer. Bestimme die Projektdauer und den kritischen Pfad.</p>',
  hints:[
    'Vorwärts: FEZ = FAZ + D, und bei mehreren Vorgängern gilt für den FAZ das Maximum.',
    'Beim letzten Vorgang setzt du SEZ = FEZ und rechnest von dort rückwärts.',
    'Rückwärts gilt für den SEZ das Minimum aller SAZ der Nachfolger. GP = SAZ − FAZ.'
  ],
  solution:
    "VORWAERTSRECHNUNG\n"+
    "  A: FAZ=0            D=4  FEZ=4\n"+
    "  B: FAZ=4            D=6  FEZ=10\n"+
    "  C: FAZ=4            D=3  FEZ=7\n"+
    "  D: FAZ=10           D=5  FEZ=15\n"+
    "  E: FAZ=7            D=2  FEZ=9\n"+
    "  F: FAZ=MAX(15,9)=15 D=4  FEZ=19\n"+
    "  G: FAZ=19           D=3  FEZ=22\n\n"+
    "RUECKWAERTSRECHNUNG (SEZ von G = FEZ = 22)\n"+
    "  G: SEZ=22           SAZ=19\n"+
    "  F: SEZ=19           SAZ=15\n"+
    "  E: SEZ=15           SAZ=13\n"+
    "  D: SEZ=15           SAZ=10\n"+
    "  C: SEZ=13           SAZ=10\n"+
    "  B: SEZ=10           SAZ=4\n"+
    "  A: SEZ=MIN(4,10)=4  SAZ=0     Probe: SAZ = 0  ok\n\n"+
    "GESAMTPUFFER (GP = SAZ - FAZ)\n"+
    "  A: 0-0  = 0   kritisch\n"+
    "  B: 4-4  = 0   kritisch\n"+
    "  C: 10-4 = 6\n"+
    "  D: 10-10= 0   kritisch\n"+
    "  E: 13-7 = 6\n"+
    "  F: 15-15= 0   kritisch\n"+
    "  G: 19-19= 0   kritisch\n\n"+
    "ERGEBNIS\n"+
    "  Projektdauer:    22 Zeiteinheiten\n"+
    "  Kritischer Pfad: A - B - D - F - G\n"+
    "  Der Zweig C-E hat 6 Zeiteinheiten Puffer.",
  solutionLang:'Netzplan',
  solutionNote:'Zwei eingebaute Proben sichern das Ergebnis ab: Beim ersten Vorgang muss SAZ null ergeben, und der kritische Pfad muss eine lückenlose Kette vom Anfang bis zum Ende bilden. Beachte außerdem, dass C und E denselben Gesamtpuffer von 6 haben — er steht ihnen gemeinsam einmal zur Verfügung, nicht jedem für sich.'
},
{
  id:'ex8', level:2, topic:'Subnetting', title:'Ein Netz bedarfsgerecht aufteilen',
  task:'<p>Ein Unternehmen erhält das Netz <strong>172.20.16.0/22</strong> und möchte es in Abteilungsnetze aufteilen. Jedes Abteilungsnetz soll <strong>mindestens 200 Hosts</strong> aufnehmen können.</p>'+
    '<p>Bestimme das erforderliche Präfix, die Anzahl der möglichen Subnetze und gib die ersten drei Subnetze mit Netzadresse, Hostbereich und Broadcast an.</p>',
  hints:[
    'Suche zuerst die Zweierpotenz, die 200 Hosts abdeckt: 2^y − 2 ≥ 200.',
    'Aus den Hostbits ergibt sich das Präfix als 32 minus Hostbits.',
    'Die Anzahl der Subnetze ist 2 hoch der Differenz zwischen neuem und altem Präfix.'
  ],
  solution:
    "1. Hostbits bestimmen\n"+
    "   2^7 - 2 = 126   zu wenig\n"+
    "   2^8 - 2 = 254   ausreichend fuer 200 Hosts\n"+
    "   -> 8 Hostbits -> Praefix = 32 - 8 = /24\n\n"+
    "2. Anzahl der Subnetze\n"+
    "   neues Praefix /24 - altes Praefix /22 = 2 zusaetzliche Netzbits\n"+
    "   -> 2^2 = 4 Subnetze\n\n"+
    "3. Adressbereich des Ausgangsnetzes\n"+
    "   172.20.16.0/22 umfasst 172.20.16.0 bis 172.20.19.255\n"+
    "   (Blockgroesse im 3. Oktett: 256 - 252 = 4)\n\n"+
    "4. Die Subnetze (Maske 255.255.255.0)\n"+
    "   Subnetz 1: 172.20.16.0\n"+
    "              Hosts 172.20.16.1 - 172.20.16.254\n"+
    "              Broadcast 172.20.16.255\n\n"+
    "   Subnetz 2: 172.20.17.0\n"+
    "              Hosts 172.20.17.1 - 172.20.17.254\n"+
    "              Broadcast 172.20.17.255\n\n"+
    "   Subnetz 3: 172.20.18.0\n"+
    "              Hosts 172.20.18.1 - 172.20.18.254\n"+
    "              Broadcast 172.20.18.255\n\n"+
    "   (Subnetz 4: 172.20.19.0/24)",
  solutionLang:'Subnetting',
  solutionNote:'Hier musst du in beide Richtungen denken: vom Hostbedarf zum Präfix und vom Präfixsprung zur Subnetzanzahl. Die Probe lautet 4 Subnetze mal 254 Hosts gleich 1.016 nutzbare Adressen aus 1.024 des /22. Achte auf die Blockgröße im dritten Oktett — bei Präfixen zwischen /17 und /24 verschiebt sich die Rechnung dorthin.'
},
{
  id:'ex9', level:2, topic:'SQL', title:'Auswertung mit JOIN, Gruppierung und HAVING',
  task:'<p>Gegeben sind die Tabellen:</p>'+
    '<div class="check-prompt">kunde(kundennr, name, ort)\nauftrag(auftragsnr, #kundennr, datum, status)\nposition(#auftragsnr, #artikelnr, menge, einzelpreis)</div>'+
    '<p>Schreibe eine SQL-Abfrage, die für jeden Kunden aus <strong>Hamburg</strong> den Namen und den <strong>Gesamtumsatz aller abgeschlossenen Aufträge des Jahres 2025</strong> ausgibt. Es sollen nur Kunden mit einem Umsatz über 5.000 € erscheinen, sortiert nach Umsatz absteigend.</p>',
  hints:[
    'Der Umsatz einer Position ist menge mal einzelpreis — summiert über alle Positionen.',
    'Filter auf Einzelzeilen gehören in WHERE, Filter auf das Aggregat in HAVING.',
    'Beim Jahresfilter ist ein Bereichsvergleich mit BETWEEN robuster als eine Funktion auf der Spalte.'
  ],
  solution:
    "SELECT   k.name,\n"+
    "         SUM(p.menge * p.einzelpreis) AS gesamtumsatz\n"+
    "FROM     kunde k\n"+
    "JOIN     auftrag  a ON a.kundennr   = k.kundennr\n"+
    "JOIN     position p ON p.auftragsnr = a.auftragsnr\n"+
    "WHERE    k.ort    = 'Hamburg'\n"+
    "  AND    a.status = 'abgeschlossen'\n"+
    "  AND    a.datum BETWEEN '2025-01-01' AND '2025-12-31'\n"+
    "GROUP BY k.kundennr, k.name\n"+
    "HAVING   SUM(p.menge * p.einzelpreis) > 5000\n"+
    "ORDER BY gesamtumsatz DESC;",
  solutionLang:'SQL',
  solutionNote:'Drei Details entscheiden über die volle Punktzahl. Erstens gehört der Umsatzfilter in HAVING, weil er sich auf das Aggregat bezieht — in WHERE wäre er ein Syntaxfehler. Zweitens muss die Gruppierung alle nicht aggregierten Spalten enthalten; die Kundennummer mitzunehmen ist sauberer als nur der Name, falls zwei Kunden gleich heißen. Drittens ist BETWEEN einer Funktion wie YEAR(a.datum) vorzuziehen, weil letztere den Index unbrauchbar macht.'
},
{
  id:'ex10', level:2, topic:'Normalisierung', title:'Von der 1. in die 3. Normalform',
  task:'<p>Diese Tabelle verstößt gegen die Normalisierungsregeln:</p>'+
    '<div class="check-prompt">Bestellung(BestellNr, ArtikelNr, Artikelbezeichnung, Menge,\n           LieferantenNr, Lieferantenname, Lieferantenort,\n           Kundenname, Kundenanschrift)</div>'+
    '<p>Der Primärschlüssel ist die Kombination aus BestellNr und ArtikelNr. Überführe die Tabelle schrittweise in die <strong>3. Normalform</strong> und begründe jeden Schritt.</p>',
  hints:[
    'Prüfe zuerst, welche Attribute nur von einem Teil des zusammengesetzten Schlüssels abhängen.',
    'Danach suche Attribute, die von einem Nichtschlüsselattribut abhängen — das ist die transitive Abhängigkeit.',
    'Fremdschlüssel kennzeichnest du mit # und den Primärschlüssel durch Unterstreichen.'
  ],
  solution:
    "AUSGANGSLAGE (1. NF erfuellt: alle Attribute atomar)\n"+
    "  Schluessel: (BestellNr, ArtikelNr)\n\n"+
    "SCHRITT 1 -> 2. NF  (Teilabhaengigkeiten aufloesen)\n"+
    "  Artikelbezeichnung haengt nur von ArtikelNr ab  -> Teilabhaengigkeit\n"+
    "  Kundenname, Kundenanschrift haengen nur von BestellNr ab\n\n"+
    "  Bestellung(BestellNr, Kundenname, Kundenanschrift)\n"+
    "  Artikel(ArtikelNr, Artikelbezeichnung, LieferantenNr,\n"+
    "          Lieferantenname, Lieferantenort)\n"+
    "  Bestellposition(#BestellNr, #ArtikelNr, Menge)\n\n"+
    "SCHRITT 2 -> 3. NF  (transitive Abhaengigkeiten aufloesen)\n"+
    "  Lieferantenname und -ort haengen von LieferantenNr ab,\n"+
    "  nicht direkt von ArtikelNr  -> transitiv\n"+
    "  Kundenanschrift haengt vom Kunden ab, nicht von der Bestellung\n\n"+
    "ERGEBNIS IN 3. NF\n"+
    "  Kunde(KundenNr, Kundenname, Kundenanschrift)\n"+
    "  Bestellung(BestellNr, Bestelldatum, #KundenNr)\n"+
    "  Bestellposition(#BestellNr, #ArtikelNr, Menge)\n"+
    "  Artikel(ArtikelNr, Artikelbezeichnung, #LieferantenNr)\n"+
    "  Lieferant(LieferantenNr, Lieferantenname, Lieferantenort)",
  solutionLang:'Normalisierung',
  solutionNote:'Die Begründung ist hier so viel wert wie das Ergebnis. Formuliere sie mit den Fachbegriffen: In der 2. NF beseitigst du Teilabhängigkeiten vom zusammengesetzten Schlüssel, in der 3. NF transitive Abhängigkeiten zwischen Nichtschlüsselattributen. Nenne zusätzlich den praktischen Nutzen — die Änderungsanomalie verschwindet, weil ein Lieferantenumzug nur noch an einer Stelle gepflegt werden muss.'
},
{
  id:'ex11', level:2, topic:'UML', title:'Klassenhierarchie mit Vererbung entwerfen',
  task:'<p>Eine Bibliotheksverwaltung soll <strong>Bücher</strong> und <strong>DVDs</strong> abbilden:</p>'+
    '<div class="check-prompt">Beide Medien haben eine Inventarnummer, einen Titel, ein Erscheinungsjahr und einen Ausleihstatus. Beide können ausgeliehen und zurückgegeben werden.\nBücher haben zusätzlich einen Autor, eine ISBN und eine Seitenzahl.\nDVDs haben zusätzlich eine Laufzeit und eine Altersfreigabe.\nDie Berechnung der Leihgebühr erfolgt bei Büchern und DVDs unterschiedlich.</div>'+
    '<p>Entwirf das UML-Klassendiagramm in Textform mit Attributen, Methoden, Sichtbarkeiten und der korrekten Beziehung.</p>',
  hints:[
    'Was beide Klassen gemeinsam haben, wandert in die Oberklasse.',
    'Der Satz zur Leihgebühr ist der entscheidende Hinweis — gleiche Methode, unterschiedliches Verhalten.',
    'Attribute werden privat, Methoden öffentlich. Der Vererbungspfeil zeigt zur Oberklasse.'
  ],
  solution:
    "+----------------------------------+\n"+
    "|           Medium                 |   (abstrakt)\n"+
    "+----------------------------------+\n"+
    "| - inventarnummer: String         |\n"+
    "| - titel: String                  |\n"+
    "| - erscheinungsjahr: int          |\n"+
    "| - ausgeliehen: boolean           |\n"+
    "+----------------------------------+\n"+
    "| + ausleihen(): void              |\n"+
    "| + zurueckgeben(): void           |\n"+
    "| + leihgebuehrBerechnen(): double |   (abstrakt)\n"+
    "+----------------------------------+\n"+
    "                 /_\\\n"+
    "                  |\n"+
    "        +---------+---------+\n"+
    "        |                   |\n"+
    "+-------------------+  +----------------------------+\n"+
    "|      Buch         |  |            DVD             |\n"+
    "+-------------------+  +----------------------------+\n"+
    "| - autor: String   |  | - laufzeitMinuten: int     |\n"+
    "| - isbn: String    |  | - altersfreigabe: int      |\n"+
    "| - seitenzahl: int |  +----------------------------+\n"+
    "+-------------------+  | + leihgebuehrBerechnen():  |\n"+
    "| + leihgebuehr-    |  |     double                 |\n"+
    "|   Berechnen():    |  | + getAltersfreigabe(): int |\n"+
    "|     double        |  +----------------------------+\n"+
    "| + getIsbn(): Str  |\n"+
    "+-------------------+\n\n"+
    "Beziehung: Generalisierung, durchgezogene Linie mit geschlossener,\n"+
    "nicht ausgefuellter Dreieckspitze, Pfeil zeigt zur Oberklasse Medium.",
  solutionLang:'UML',
  solutionNote:'Die Methode leihgebuehrBerechnen steht bewusst in allen drei Klassen: In der Oberklasse als abstrakte Vorgabe, in den Unterklassen mit eigener Implementierung. Das ist Polymorphie, und der Satz „die Berechnung erfolgt unterschiedlich" war der Auslöser dafür. Die IHK akzeptiert auch die Variante ohne abstrakte Deklaration in der Oberklasse — dann muss die Methode aber in beiden Unterklassen stehen.'
},
{
  id:'ex12', level:2, topic:'Nutzwertanalyse', title:'Nutzwertanalyse mit Kostenvergleich',
  task:'<p>Für eine Ticketsystem-Beschaffung liegen zwei Angebote vor:</p>'+
    '<div class="check-prompt">Kriterium             Gewicht   Anbieter A   Anbieter B\nFunktionsumfang         35 %        7            9\nBenutzerfreundlichkeit  25 %        9            6\nSupportqualität         20 %        6            8\nSchnittstellen          15 %        8            7\nZukunftssicherheit       5 %        5            9\n\nJahreskosten                    12.400 €     15.800 €</div>'+
    '<p>Berechne die Gesamtnutzwerte, ermittle den Nutzen je 1.000 € Jahreskosten und sprich eine begründete Empfehlung aus.</p>',
  hints:[
    'Teilnutzwert ist Punkte mal Gewichtung. Prüfe zuerst, ob die Gewichte 100 % ergeben.',
    'Rechne mit Dezimalwerten: 35 % entspricht dem Faktor 0,35.',
    'Für das Preis-Leistungs-Verhältnis teilst du den Nutzwert durch die Kosten in Tausend Euro.'
  ],
  solution:
    "PROBE: 35 + 25 + 20 + 15 + 5 = 100 %  ok\n\n"+
    "ANBIETER A\n"+
    "  Funktionsumfang         7 x 0,35 = 2,45\n"+
    "  Benutzerfreundlichkeit  9 x 0,25 = 2,25\n"+
    "  Supportqualitaet        6 x 0,20 = 1,20\n"+
    "  Schnittstellen          8 x 0,15 = 1,20\n"+
    "  Zukunftssicherheit      5 x 0,05 = 0,25\n"+
    "  Gesamtnutzwert                   = 7,35\n\n"+
    "ANBIETER B\n"+
    "  Funktionsumfang         9 x 0,35 = 3,15\n"+
    "  Benutzerfreundlichkeit  6 x 0,25 = 1,50\n"+
    "  Supportqualitaet        8 x 0,20 = 1,60\n"+
    "  Schnittstellen          7 x 0,15 = 1,05\n"+
    "  Zukunftssicherheit      9 x 0,05 = 0,45\n"+
    "  Gesamtnutzwert                   = 7,75\n\n"+
    "NUTZEN JE 1.000 EUR JAHRESKOSTEN\n"+
    "  A: 7,35 / 12,4 = 0,593\n"+
    "  B: 7,75 / 15,8 = 0,491\n\n"+
    "EMPFEHLUNG\n"+
    "  Nach reinem Nutzwert gewinnt B (7,75 zu 7,35).\n"+
    "  Bezogen auf die Kosten ist A jedoch deutlich wirtschaftlicher\n"+
    "  (0,593 zu 0,491) und zugleich 3.400 EUR pro Jahr guenstiger.\n"+
    "  Empfehlung: Anbieter A, da der Nutzenvorsprung von B (5 %)\n"+
    "  den Kostenaufschlag von 27 % nicht rechtfertigt.",
  solutionLang:'Nutzwertanalyse',
  solutionNote:'Die Kombination aus Nutzwert und Kosten ist die anspruchsvollere Variante dieser Aufgabe und genau die, bei der die IHK eine echte Abwägung sehen will. Stelle den prozentualen Nutzenvorsprung dem prozentualen Mehrpreis gegenüber — diese Gegenüberstellung macht die Empfehlung nachvollziehbar und ist mehr wert als die bloße Nennung des Siegers.'
},
{
  id:'ex13', level:2, topic:'IT-Sicherheit', title:'Sicherheitskonzept für Homeoffice',
  task:'<p>Eine Steuerkanzlei mit 14 Mitarbeitern ermöglicht Homeoffice. Die Mitarbeiter greifen von privaten und dienstlichen Geräten auf den Kanzleiserver zu, auf dem Mandantendaten liegen.</p>'+
    '<p>Erstelle ein Sicherheitskonzept mit <strong>je drei technischen und drei organisatorischen Maßnahmen</strong>. Ordne jeder Maßnahme das vorrangig geschützte Schutzziel zu und begründe sie in einem Satz.</p>',
  hints:[
    'Technisch bedeutet installiert oder konfiguriert, organisatorisch bedeutet geregelt oder geschult.',
    'Denke an die Besonderheit: Mandantendaten unterliegen zusätzlich der Verschwiegenheitspflicht und der DSGVO.',
    'Jede Maßnahme braucht ein „weil" — die Begründung ist der eigentliche Punkt.'
  ],
  solution:
    "TECHNISCHE MASSNAHMEN\n\n"+
    "1. VPN mit Zwei-Faktor-Authentifizierung   -> Vertraulichkeit, Authentizitaet\n"+
    "   Der Zugriff laeuft durch einen verschluesselten Tunnel, weil die Daten\n"+
    "   sonst unverschluesselt ueber das oeffentliche Internet liefen. Der zweite\n"+
    "   Faktor verhindert, dass ein gestohlenes Passwort allein Zugang verschafft.\n\n"+
    "2. Festplattenverschluesselung der Notebooks (BitLocker)  -> Vertraulichkeit\n"+
    "   Bei Diebstahl oder Verlust bleiben die Daten unlesbar, weil ohne Schluessel\n"+
    "   auch der Ausbau der Platte nichts bringt.\n\n"+
    "3. Zentrales Backup mit Offline-Kopie nach 3-2-1  -> Verfuegbarkeit\n"+
    "   Ein Ransomware-Befall oder ein Hardwaredefekt fuehrt sonst zum\n"+
    "   endgueltigen Verlust der Mandantendaten.\n\n"+
    "ORGANISATORISCHE MASSNAHMEN\n\n"+
    "4. Verbot privater Geraete, Ausgabe dienstlicher Notebooks  -> Vertraulichkeit\n"+
    "   Auf privaten Geraeten sind Patchstand und Virenschutz nicht kontrollierbar,\n"+
    "   und die Kanzlei bliebe dennoch datenschutzrechtlich verantwortlich.\n\n"+
    "5. Berechtigungskonzept nach Need-to-know  -> Vertraulichkeit\n"+
    "   Jeder Mitarbeiter sieht nur die Mandanten, die er betreut, weil so der\n"+
    "   Schaden bei einem kompromittierten Konto begrenzt bleibt.\n\n"+
    "6. Regelmaessige Schulung zu Phishing und Social Engineering  -> alle Ziele\n"+
    "   Der Mensch ist das haeufigste Einfallstor, und technische Massnahmen\n"+
    "   greifen nicht, wenn Zugangsdaten freiwillig herausgegeben werden.\n\n"+
    "ERGAENZEND (DSGVO)\n"+
    "  Verpflichtung auf Verschwiegenheit, Regelung zur Bildschirmeinsicht\n"+
    "  durch Dritte im Haushalt, Meldeweg fuer Datenpannen binnen 72 Stunden.",
  solutionLang:'Sicherheitskonzept',
  solutionNote:'Achte auf die saubere Trennung der beiden Kategorien — eine als technisch deklarierte Schulung kostet den Punkt, auch wenn die Maßnahme inhaltlich richtig ist. Der Zusatz zur DSGVO ist kein Muss, zeigt aber Verständnis für den Kontext: Bei einer Steuerkanzlei kommt zur Informationssicherheit die berufsrechtliche Verschwiegenheitspflicht hinzu.'
},
{
  id:'ex14', level:2, topic:'Trockenlauf', title:'Verschachtelte Schleife auswerten',
  task:'<p>Werte den folgenden Algorithmus vollständig aus:</p>'+
    '<div class="check-prompt">FUNKTION geheim(n)\n  ergebnis &lt;- 0\n  FUER i VON 1 BIS n TUE\n    FUER j VON i BIS n TUE\n      WENN (i + j) MOD 2 = 0 DANN\n        ergebnis &lt;- ergebnis + 1\n      ENDEWENN\n    ENDEFUER\n  ENDEFUER\n  GIB ergebnis ZURUECK\nENDEFUNKTION</div>'+
    '<p>(a) Erstelle eine Wertetabelle für <code>n = 4</code>. (b) Wie oft wird die innere Schleife insgesamt durchlaufen? (c) Was berechnet der Algorithmus allgemein?</p>',
  hints:[
    'Die innere Schleife startet bei i, nicht bei 1 — die Anzahl der Durchläufe sinkt mit jedem i.',
    'Die Summe i + j ist genau dann gerade, wenn beide gerade oder beide ungerade sind.',
    'Für Teil (b): Zähle die Durchläufe je i und bilde die Summe.'
  ],
  solution:
    "(a) WERTETABELLE fuer n = 4\n\n"+
    "  i   j   i+j   MOD 2   ergebnis\n"+
    "  -----------------------------------\n"+
    "  -   -    -      -        0      (Start)\n"+
    "  1   1    2      0        1      gerade -> hochzaehlen\n"+
    "  1   2    3      1        1\n"+
    "  1   3    4      0        2\n"+
    "  1   4    5      1        2\n"+
    "  2   2    4      0        3\n"+
    "  2   3    5      1        3\n"+
    "  2   4    6      0        4\n"+
    "  3   3    6      0        5\n"+
    "  3   4    7      1        5\n"+
    "  4   4    8      0        6\n\n"+
    "  Rueckgabe: 6\n\n"+
    "(b) DURCHLAEUFE DER INNEREN SCHLEIFE\n"+
    "    i=1: 4 Durchlaeufe\n"+
    "    i=2: 3\n"+
    "    i=3: 2\n"+
    "    i=4: 1\n"+
    "    Summe: 4+3+2+1 = 10 = n x (n+1) / 2\n\n"+
    "(c) ALLGEMEINE BEDEUTUNG\n"+
    "    Gezaehlt werden alle Paare (i, j) mit i <= j, bei denen i und j\n"+
    "    dieselbe Paritaet haben - also beide gerade oder beide ungerade.\n"+
    "    Bei n = 4 sind das die Paare aus {1,3} und aus {2,4}:\n"+
    "    (1,1)(1,3)(3,3) und (2,2)(2,4)(4,4) = 6 Paare.\n"+
    "    Komplexitaet: O(n^2)",
  solutionLang:'Trockenlauf',
  solutionNote:'Der Startwert j gleich i ist der Kern dieser Aufgabe: Er halbiert die Durchläufe gegenüber einer normalen Doppelschleife und ergibt die Dreieckszahl n mal n plus 1 geteilt durch 2. Wer j bei 1 starten lässt, kommt auf 16 Durchläufe statt 10. Führe die Wertetabelle immer vollständig — die IHK vergibt Teilpunkte auf korrekte Zwischenzeilen, selbst wenn das Endergebnis abweicht.'
},
{
  id:'ex15', level:3, topic:'IPv6', title:'IPv6-Adresse analysieren und Teilnetze bilden',
  task:'<p>Ein Unternehmen erhält das IPv6-Präfix <strong>2001:0db8:ac10::/48</strong>. Ein Client meldet die Adresse:</p>'+
    '<div class="check-prompt">2001:db8:ac10:2a::1e5</div>'+
    '<p>(a) Schreibe die Client-Adresse ungekürzt aus. (b) Benenne Präfix, Teilnetz-ID und Interface-Identifier. (c) Wie viele Teilnetze mit /64 lassen sich aus dem /48 bilden? (d) Nenne zwei Vorteile von IPv6 gegenüber IPv4 mit Begründung.</p>',
  hints:[
    'Zähle die vorhandenen Blöcke und ziehe sie von 8 ab — die Differenz ersetzt das Doppelpunkt-Paar.',
    'Jeder Block muss am Ende genau vier Hex-Ziffern haben, auch führende Nullen.',
    'Die Teilnetz-ID liegt zwischen dem /48-Standortpräfix und dem 64-Bit-Interface-Identifier.'
  ],
  solution:
    "(a) UNGEKUERZTE SCHREIBWEISE\n"+
    "    Vorhandene Bloecke: 2001 | db8 | ac10 | 2a | 1e5  = 5 Bloecke\n"+
    "    8 - 5 = 3 Nullbloecke ersetzt das ::\n\n"+
    "    2001:0db8:ac10:002a:0000:0000:0000:01e5\n\n"+
    "    Beachte: db8 -> 0db8,  2a -> 002a,  1e5 -> 01e5\n\n"+
    "(b) AUFTEILUNG\n"+
    "    Standortpraefix (48 Bit): 2001:0db8:ac10\n"+
    "    Teilnetz-ID     (16 Bit): 002a   (dezimal 42)\n"+
    "    Interface-ID    (64 Bit): 0000:0000:0000:01e5\n\n"+
    "(c) ANZAHL DER TEILNETZE\n"+
    "    64 - 48 = 16 Bit stehen fuer die Teilnetz-ID zur Verfuegung\n"+
    "    2^16 = 65.536 Teilnetze\n"+
    "    Kein Abzug, da IPv6 keine Broadcast-Adresse kennt.\n\n"+
    "(d) ZWEI VORTEILE\n"+
    "    1. Praktisch unbegrenzter Adressraum (2^128 statt 2^32)\n"+
    "       Jedes Geraet erhaelt eine eigene globale Adresse, NAT entfaellt.\n"+
    "       Das ist im IoT-Umfeld entscheidend, wo Millionen Sensoren\n"+
    "       einzeln adressierbar sein muessen.\n\n"+
    "    2. Ende-zu-Ende-Erreichbarkeit ohne Adressumsetzung\n"+
    "       Geraete sind direkt ansprechbar, weil keine NAT-Tabelle\n"+
    "       dazwischenliegt. Das vereinfacht Fernwartung, VoIP und\n"+
    "       Peer-to-Peer-Verbindungen erheblich.\n\n"+
    "    (Weitere moegliche: vereinfachter Header, SLAAC-Autokonfiguration,\n"+
    "     IPsec von Haus aus vorgesehen, kein Broadcast)",
  solutionLang:'IPv6',
  solutionNote:'Teilaufgabe (a) ist die Punktefalle: Es reicht nicht, das Doppelpunkt-Paar aufzulösen, jeder Block muss auf vier Ziffern aufgefüllt werden. Bei (c) ist der fehlende Abzug von zwei Adressen der Unterschied zu IPv4 — wer hier 65.534 schreibt, überträgt IPv4-Denken. Bei (d) zählt die Begründung mehr als die Nennung, formuliere daher immer mit „weil".'
},
{
  id:'ex16', level:3, topic:'Pseudocode', title:'Sortieren mit Abbruchoptimierung',
  task:'<p>Schreibe einen <strong>optimierten Bubble-Sort</strong> in Pseudocode, der die Sortierung abbricht, sobald in einem Durchlauf kein Tausch mehr stattgefunden hat.</p>'+
    '<p>Gib zusätzlich an: (a) wie viele Vergleiche der unoptimierte Bubble-Sort bei <code>n = 8</code> maximal durchführt, (b) wie viele Durchläufe dein optimierter Algorithmus bei einem bereits sortierten Array benötigt, und (c) die Komplexität im besten und im schlechtesten Fall.</p>',
  hints:[
    'Du brauchst ein boolesches Merkerflag, das zu Beginn jedes Durchlaufs zurückgesetzt wird.',
    'Die äußere Schleife wird zur kopfgesteuerten Schleife, weil die Anzahl der Durchläufe nicht feststeht.',
    'Die maximale Vergleichszahl des unoptimierten Verfahrens ist n mal n minus 1 geteilt durch 2.'
  ],
  solution:
    "FUNKTION bubbleSortOptimiert(feld)\n"+
    "  n        <- LAENGE(feld)\n"+
    "  getauscht <- WAHR\n"+
    "  durchlauf <- 0\n"+
    "\n"+
    "  SOLANGE getauscht = WAHR TUE\n"+
    "    getauscht <- FALSCH\n"+
    "    durchlauf <- durchlauf + 1\n"+
    "\n"+
    "    FUER i VON 0 BIS n - durchlauf - 1 TUE\n"+
    "      WENN feld[i] > feld[i+1] DANN\n"+
    "        hilf      <- feld[i]\n"+
    "        feld[i]   <- feld[i+1]\n"+
    "        feld[i+1] <- hilf\n"+
    "        getauscht <- WAHR\n"+
    "      ENDEWENN\n"+
    "    ENDEFUER\n"+
    "  ENDESOLANGE\n"+
    "\n"+
    "  GIB feld ZURUECK\n"+
    "ENDEFUNKTION\n\n"+
    "(a) Unoptimiert bei n = 8:\n"+
    "    n x (n-1) / 2 = 8 x 7 / 2 = 28 Vergleiche\n\n"+
    "(b) Bereits sortiertes Array:\n"+
    "    1 Durchlauf. Es findet kein Tausch statt, getauscht bleibt FALSCH,\n"+
    "    die aeussere Schleife endet nach dem ersten Durchgang.\n\n"+
    "(c) Komplexitaet:\n"+
    "    Bester Fall  (sortiert):  O(n)    - ein Durchlauf ohne Tausch\n"+
    "    Schlechtester Fall:       O(n^2)  - absteigend sortiertes Array",
  solutionLang:'Pseudocode',
  solutionNote:'Zwei Optimierungen stecken in dieser Lösung. Das Merkerflag bricht ab, sobald das Feld sortiert ist — das drückt den besten Fall auf O(n). Die Obergrenze n minus durchlauf minus 1 spart zusätzlich Vergleiche, weil nach jedem Durchlauf das größte verbleibende Element hinten korrekt steht und nicht erneut geprüft werden muss. Der Tausch über eine Hilfsvariable in drei Schritten wird erwartet; wer feld[i] und feld[i+1] direkt zuweist, verliert einen Wert.'
},
{
  id:'ex17', level:3, topic:'Wirtschaft', title:'Make or Buy mit Amortisationsrechnung',
  task:'<p>Ein Unternehmen mit 40 Mitarbeitern benötigt ein Dokumentenmanagementsystem. Zwei Wege stehen zur Wahl:</p>'+
    '<div class="check-prompt">EIGENENTWICKLUNG\n  Entwicklung: 120 Personentage à 8 Std. zu 85 €/Std.\n  Laufende Wartung: 18.000 € pro Jahr\n\nSTANDARDSOFTWARE (SaaS)\n  Lizenz: 28 € pro Benutzer und Monat\n  Einmalige Einführung und Schulung: 14.500 €\n\nDurch das System werden jährlich 9.800 € Arbeitszeit eingespart.</div>'+
    '<p>Vergleiche beide Varianten über <strong>fünf Jahre</strong>, berechne die Amortisationsdauer der günstigeren Variante bezogen auf die Einsparung und sprich eine begründete Empfehlung aus.</p>',
  hints:[
    'Rechne die Personentage zuerst in Stunden und dann in Euro um.',
    'Die SaaS-Lizenz gilt pro Benutzer und Monat — vergiss weder die 40 Mitarbeiter noch die 12 Monate.',
    'Beim Fünfjahresvergleich gehören die laufenden Kosten fünfmal in die Rechnung, die einmaligen nur einmal.'
  ],
  solution:
    "EIGENENTWICKLUNG\n"+
    "  Entwicklungskosten: 120 PT x 8 h x 85 EUR = 81.600 EUR (einmalig)\n"+
    "  Wartung 5 Jahre:    18.000 x 5             = 90.000 EUR\n"+
    "  ----------------------------------------------------------\n"+
    "  Gesamtkosten 5 Jahre                       = 171.600 EUR\n\n"+
    "STANDARDSOFTWARE (SaaS)\n"+
    "  Lizenz pro Jahr:  40 x 28 x 12             = 13.440 EUR\n"+
    "  Lizenz 5 Jahre:   13.440 x 5               = 67.200 EUR\n"+
    "  Einfuehrung und Schulung (einmalig)        = 14.500 EUR\n"+
    "  ----------------------------------------------------------\n"+
    "  Gesamtkosten 5 Jahre                       =  81.700 EUR\n\n"+
    "DIFFERENZ\n"+
    "  171.600 - 81.700 = 89.900 EUR zugunsten der Standardsoftware\n"+
    "  Das entspricht rund 52 % geringeren Gesamtkosten.\n\n"+
    "AMORTISATION DER STANDARDSOFTWARE\n"+
    "  Einmalige Investition: 14.500 EUR\n"+
    "  Jaehrlicher Rueckfluss: Einsparung 9.800 - Lizenz 13.440 = -3.640 EUR\n"+
    "  -> Die Einsparung deckt die laufende Lizenz nicht vollstaendig ab,\n"+
    "     eine Amortisation allein ueber die Zeitersparnis tritt nicht ein.\n\n"+
    "  Bezogen nur auf die Einfuehrungskosten gegen die Einsparung:\n"+
    "  14.500 / 9.800 = 1,48 Jahre = rund 1 Jahr und 6 Monate\n\n"+
    "EMPFEHLUNG\n"+
    "  Die Standardsoftware wird empfohlen. Sie kostet ueber fuenf Jahre\n"+
    "  89.900 EUR weniger, ist sofort verfuegbar und das Risiko der\n"+
    "  Entwicklung entfaellt. Zu beachten ist, dass die Einsparung von\n"+
    "  9.800 EUR die laufenden Lizenzkosten nicht deckt - die Investition\n"+
    "  rechtfertigt sich daher nicht allein monetaer, sondern ueber\n"+
    "  qualitative Faktoren wie Revisionssicherheit, Rechtskonformitaet\n"+
    "  und schnelleren Dokumentenzugriff.\n\n"+
    "  Gegenargument fuer die Eigenentwicklung: volle Anpassbarkeit,\n"+
    "  Datenhoheit im eigenen Haus, keine Abhaengigkeit vom Anbieter.",
  solutionLang:'Wirtschaftlichkeitsrechnung',
  solutionNote:'Die eigentliche Leistung dieser Aufgabe ist der ehrliche Umgang mit der Amortisation: Die Einsparung deckt die laufenden Kosten nicht, und das offen zu benennen ist mehr wert als eine schöngerechnete Zahl. Bei Make-or-Buy-Aufgaben erwartet die IHK außerdem immer die qualitativen Faktoren neben den Zahlen — Verfügbarkeit, Risiko, Abhängigkeit und Datenhoheit.'
},
{
  id:'ex18', level:3, topic:'Struktogramm', title:'Struktogramm für eine Rabattstaffel',
  task:'<p>Ein Onlineshop berechnet Rabatte nach folgenden Regeln:</p>'+
    '<div class="check-prompt">Bestellwert unter 100 € → kein Rabatt\nBestellwert ab 100 € bis unter 500 € → 3 %\nBestellwert ab 500 € bis unter 1.000 € → 5 %\nBestellwert ab 1.000 € → 8 %\n\nStammkunden erhalten zusätzlich 2 Prozentpunkte, jedoch höchstens 10 % insgesamt.\nAb einem Bestellwert von 50 € entfallen die Versandkosten von 4,95 €.</div>'+
    '<p>Entwirf ein <strong>Struktogramm</strong> (Nassi-Shneiderman) in Textform, das den zu zahlenden Endbetrag ermittelt.</p>',
  hints:[
    'Mehrfachverzweigungen zeichnest du als Fallunterscheidung mit mehreren Spalten.',
    'Die Begrenzung auf 10 % ist eine eigene Verzweigung nach der Stammkundenzugabe.',
    'Die Versandkostenprüfung bezieht sich auf den Bestellwert, nicht auf den rabattierten Betrag — lies die Vorgabe genau.'
  ],
  solution:
    "+---------------------------------------------------------------+\n"+
    "| Eingabe: bestellwert, istStammkunde                           |\n"+
    "+---------------------------------------------------------------+\n"+
    "| rabattsatz <- 0                                               |\n"+
    "+---------------------------------------------------------------+\n"+
    "|                    Fallunterscheidung bestellwert             |\n"+
    "+-------------+-------------+--------------+--------------------+\n"+
    "|   < 100     | 100 - <500  | 500 - <1000  |     >= 1000        |\n"+
    "+-------------+-------------+--------------+--------------------+\n"+
    "| rabattsatz  | rabattsatz  | rabattsatz   | rabattsatz         |\n"+
    "|   <- 0      |   <- 3      |   <- 5       |   <- 8             |\n"+
    "+-------------+-------------+--------------+--------------------+\n"+
    "|                  istStammkunde = WAHR ?                       |\n"+
    "+-------------------------------+-------------------------------+\n"+
    "|             JA                |             NEIN              |\n"+
    "+-------------------------------+-------------------------------+\n"+
    "| rabattsatz <- rabattsatz + 2  |                               |\n"+
    "+-------------------------------+        (leer)                 |\n"+
    "|      rabattsatz > 10 ?        |                               |\n"+
    "+----------------+--------------+                               |\n"+
    "|      JA        |     NEIN     |                               |\n"+
    "+----------------+--------------+-------------------------------+\n"+
    "| rabattsatz<-10 |   (leer)     |                               |\n"+
    "+----------------+--------------+-------------------------------+\n"+
    "| rabattbetrag <- bestellwert * rabattsatz / 100                |\n"+
    "+---------------------------------------------------------------+\n"+
    "| endbetrag <- bestellwert - rabattbetrag                       |\n"+
    "+---------------------------------------------------------------+\n"+
    "|                  bestellwert >= 50 ?                          |\n"+
    "+-------------------------------+-------------------------------+\n"+
    "|             JA                |             NEIN              |\n"+
    "+-------------------------------+-------------------------------+\n"+
    "|         (keine Versandkosten) | endbetrag <- endbetrag + 4,95 |\n"+
    "+-------------------------------+-------------------------------+\n"+
    "| Ausgabe: endbetrag                                            |\n"+
    "+---------------------------------------------------------------+\n\n"+
    "PROBE\n"+
    "  Stammkunde, Bestellwert 1.200 EUR:\n"+
    "    Grundrabatt 8 % + 2 = 10 %, Grenze nicht ueberschritten\n"+
    "    Rabatt 120 EUR -> 1.080 EUR, versandkostenfrei\n\n"+
    "  Neukunde, Bestellwert 45 EUR:\n"+
    "    0 % Rabatt -> 45 EUR + 4,95 Versand = 49,95 EUR",
  solutionLang:'Struktogramm',
  solutionNote:'Zwei Details entscheiden hier. Erstens die Grenzen: „ab 100 bis unter 500" heißt größer oder gleich 100 und kleiner 500 — überlappende oder lückenhafte Bereiche sind der häufigste Fehler. Zweitens die Reihenfolge: Die Deckelung auf 10 Prozent muss nach der Stammkundenzugabe stehen, sonst greift sie ins Leere. Eine Wertetabelle als Probe an den Bereichsgrenzen kostet eine Minute und findet fast jeden Logikfehler.'
},
{
  id:'ex19', level:3, topic:'Datenbanken', title:'Datenbankentwurf und Speicherbedarf',
  task:'<p>Ein Fitnessstudio soll ein Buchungssystem erhalten:</p>'+
    '<div class="check-prompt">Mitglieder buchen Kurse. Ein Kurs findet zu festen Terminen statt und wird von genau einem Trainer geleitet; ein Trainer leitet mehrere Kurse. Zu jedem Kurstermin können sich mehrere Mitglieder anmelden, und ein Mitglied nimmt an mehreren Terminen teil. Jede Anmeldung hat einen Status (gebucht, storniert, wahrgenommen).</div>'+
    '<p>(a) Entwirf das Relationenmodell in 3. NF. (b) Schreibe die SQL-Anweisung zum Anlegen der Anmeldungstabelle inklusive Schlüsseln. (c) Berechne den Speicherbedarf der Anmeldungstabelle für 800 Mitglieder, die im Schnitt 3 Termine pro Woche über 2 Jahre buchen, bei 48 Byte pro Datensatz.</p>',
  hints:[
    'Der Satz zur Anmeldung mit eigenem Status ist der Hinweis auf eine n:m-Beziehung mit Attribut.',
    'Der Primärschlüssel der Zwischentabelle setzt sich aus beiden Fremdschlüsseln zusammen.',
    'Beim Speicherbedarf: Mitglieder mal Termine pro Woche mal Wochen mal Jahre mal Byte.'
  ],
  solution:
    "(a) RELATIONENMODELL IN 3. NF\n\n"+
    "  Mitglied(MitgliedsNr, Nachname, Vorname, Geburtsdatum,\n"+
    "           Email, Beitrittsdatum)\n\n"+
    "  Trainer(TrainerNr, Nachname, Vorname, Qualifikation)\n\n"+
    "  Kurs(KursNr, Bezeichnung, Beschreibung, MaxTeilnehmer,\n"+
    "       #TrainerNr)\n\n"+
    "  Kurstermin(TerminNr, Datum, Uhrzeit, Raum, #KursNr)\n\n"+
    "  Anmeldung(#MitgliedsNr, #TerminNr, Anmeldezeitpunkt, Status)\n"+
    "            ^ zusammengesetzter Primaerschluessel\n\n"+
    "  Begruendung: Kurs zu Trainer ist 1:n, daher Fremdschluessel beim\n"+
    "  Kurs. Mitglied zu Kurstermin ist n:m, daher die eigene Tabelle\n"+
    "  Anmeldung - dort findet auch das Attribut Status seinen Platz,\n"+
    "  weil es weder zum Mitglied noch zum Termin allein gehoert.\n\n"+
    "(b) SQL\n\n"+
    "  CREATE TABLE anmeldung (\n"+
    "      mitgliedsnr       INT          NOT NULL,\n"+
    "      terminnr          INT          NOT NULL,\n"+
    "      anmeldezeitpunkt  DATETIME     NOT NULL,\n"+
    "      status            VARCHAR(20)  NOT NULL DEFAULT 'gebucht',\n"+
    "      PRIMARY KEY (mitgliedsnr, terminnr),\n"+
    "      FOREIGN KEY (mitgliedsnr) REFERENCES mitglied(mitgliedsnr),\n"+
    "      FOREIGN KEY (terminnr)    REFERENCES kurstermin(terminnr)\n"+
    "  );\n\n"+
    "(c) SPEICHERBEDARF\n\n"+
    "  Anmeldungen pro Mitglied: 3 pro Woche x 52 Wochen x 2 Jahre = 312\n"+
    "  Gesamtzahl der Datensaetze: 800 x 312 = 249.600\n"+
    "  Speicherbedarf: 249.600 x 48 Byte = 11.980.800 Byte\n\n"+
    "  Umrechnung:\n"+
    "    11.980.800 / 1024        = 11.700 KiB\n"+
    "    11.700 / 1024            = ca. 11,43 MiB\n"+
    "    (dezimal: rund 11,98 MB)\n\n"+
    "  Antwort: Die Anmeldungstabelle benoetigt rund 11,4 MiB\n"+
    "  beziehungsweise knapp 12 MB - ohne Index-Overhead.",
  solutionLang:'Datenbankentwurf',
  solutionNote:'Der Hinweis auf den Index-Overhead am Ende ist kein Beiwerk, sondern zeigt fachliches Verständnis: Der reine Nutzdatenbedarf ist eine Untergrenze, Indizes und Verwaltungsstrukturen kommen hinzu. Beachte außerdem, dass der zusammengesetzte Primärschlüssel aus Mitglied und Termin eine Doppelbuchung technisch ausschließt — ein Nebeneffekt, den du in der Begründung erwähnen solltest.'
},
{
  id:'ex20', level:3, topic:'Fehlersuche', title:'Fehlerhaften Algorithmus korrigieren',
  task:'<p>Dieser Algorithmus soll prüfen, ob ein Wort ein <strong>Palindrom</strong> ist (vorwärts wie rückwärts gleich). Er liefert jedoch falsche Ergebnisse.</p>'+
    '<div class="check-prompt">FUNKTION istPalindrom(wort)\n  n &lt;- LAENGE(wort)\n  i &lt;- 0\n  j &lt;- n\n  SOLANGE i &lt; j TUE\n    WENN wort[i] &lt;&gt; wort[j] DANN\n      GIB FALSCH ZURUECK\n    ENDEWENN\n    i &lt;- i + 1\n  ENDESOLANGE\n  GIB WAHR ZURUECK\nENDEFUNKTION</div>'+
    '<p>Finde <strong>alle Fehler</strong>, benenne jeweils die Auswirkung und schreibe den korrigierten Algorithmus.</p>',
  hints:[
    'Prüfe zuerst die Startwerte: Welchen Index hat das letzte Zeichen eines Arrays?',
    'Betrachte, welche Variablen sich im Schleifenrumpf ändern — und welche nicht.',
    'Führe einen Trockenlauf mit dem Wort „otto" durch, dann werden beide Fehler sichtbar.'
  ],
  solution:
    "FEHLER 1: Falscher Startwert fuer j\n"+
    "  j <- n  zeigt hinter das letzte Zeichen. Bei einem Wort der Laenge 4\n"+
    "  sind die gueltigen Indizes 0 bis 3, j = 4 liegt ausserhalb.\n"+
    "  Auswirkung: Zugriffsfehler oder undefinierter Wert bereits im\n"+
    "  ersten Durchlauf.\n"+
    "  Korrektur: j <- n - 1\n\n"+
    "FEHLER 2: j wird nie veraendert\n"+
    "  Im Schleifenrumpf wird nur i erhoeht, j bleibt konstant.\n"+
    "  Auswirkung: Es wird immer gegen dasselbe Zeichen verglichen,\n"+
    "  statt sich von beiden Seiten zur Mitte vorzuarbeiten. Bei \"otto\"\n"+
    "  wuerde o gegen o, t gegen o verglichen - Ergebnis faelschlich FALSCH.\n"+
    "  Korrektur: j <- j - 1 im Schleifenrumpf ergaenzen\n\n"+
    "TROCKENLAUF DES FEHLERHAFTEN CODES mit \"otto\" (n = 4)\n"+
    "  i=0, j=4 -> wort[4] existiert nicht -> Fehler\n"+
    "  Selbst mit j=3 korrigiert:\n"+
    "  i=0, j=3: o = o   -> weiter, i=1\n"+
    "  i=1, j=3: t <> o  -> gibt FALSCH zurueck, obwohl otto ein\n"+
    "                       Palindrom ist\n\n"+
    "KORRIGIERTE FASSUNG\n\n"+
    "FUNKTION istPalindrom(wort)\n"+
    "  n <- LAENGE(wort)\n"+
    "  i <- 0\n"+
    "  j <- n - 1\n"+
    "  SOLANGE i < j TUE\n"+
    "    WENN wort[i] <> wort[j] DANN\n"+
    "      GIB FALSCH ZURUECK\n"+
    "    ENDEWENN\n"+
    "    i <- i + 1\n"+
    "    j <- j - 1\n"+
    "  ENDESOLANGE\n"+
    "  GIB WAHR ZURUECK\n"+
    "ENDEFUNKTION\n\n"+
    "PROBE mit \"otto\" (n = 4)\n"+
    "  i=0, j=3: o = o  -> i=1, j=2\n"+
    "  i=1, j=2: t = t  -> i=2, j=1\n"+
    "  i < j ist falsch -> Schleife endet -> GIB WAHR  korrekt\n\n"+
    "PROBE mit \"otta\"\n"+
    "  i=0, j=3: o <> a -> GIB FALSCH  korrekt",
  solutionLang:'Fehlersuche',
  solutionNote:'Beide Fehler gehören zu den beiden häufigsten Kategorien überhaupt: der Off-by-one-Fehler bei der Array-Obergrenze und die vergessene Aktualisierung einer Schleifenvariable, die eine Endlosschleife oder ein falsches Ergebnis erzeugt. Nenne bei solchen Aufgaben immer die Auswirkung, nicht nur die Zeile — die IHK vergibt den Punkt für das Erkennen der Konsequenz. Beachte nebenbei, dass die Bedingung i < j korrekt ist: Bei ungerader Wortlänge muss das mittlere Zeichen nicht geprüft werden, weil es mit sich selbst identisch ist.'
}
,
{
  id:'ex21', level:1, topic:'Hardware', title:'Arbeitsplatz-PC konfigurieren und begründen',
  task:'<p>Für einen CAD-Arbeitsplatz in einem Ingenieurbüro soll ein PC beschafft werden:</p>'+
    '<div class="check-prompt">Der Mitarbeiter konstruiert 3D-Baugruppen, hat regelmäßig mehrere große Modelle gleichzeitig geöffnet und rendert abends Vorschaubilder. Zwei Monitore sind gewünscht. Das Budget liegt bei 2.500 € netto.</div>'+
    '<p>Stelle eine Konfiguration zusammen und <strong>begründe jede Komponente mit Bezug auf den Einsatzzweck</strong>. Berechne außerdem den Leistungsbedarf und leite daraus eine Netzteilempfehlung ab.</p>',
  hints:[
    'Jede Zeile braucht das Muster: Kennwert, dann „weil", dann der konkrete Bezug zur Aufgabe.',
    'CAD nutzt beim Konstruieren oft nur wenige Kerne stark, beim Rendern dagegen alle — beides erwähnen.',
    'Für das Netzteil addierst du die Leistungsaufnahmen und schlägst 20 bis 30 Prozent Reserve auf.'
  ],
  solution:
    "KONFIGURATION\n\n"+
    "CPU   8 Kerne / 16 Threads, hoher Single-Core-Takt   ca. 125 W\n"+
    "      weil CAD-Modellierung ueberwiegend Single-Thread-Last erzeugt,\n"+
    "      das abendliche Rendern aber alle Kerne auslastet.\n\n"+
    "RAM   64 GB DDR5, 2 x 32 GB                           ca.  15 W\n"+
    "      weil grosse Baugruppen vollstaendig im Arbeitsspeicher liegen\n"+
    "      muessen; zwei Riegel wegen Dual Channel.\n\n"+
    "GPU   professionelle Workstation-Karte, 12 GB          ca. 180 W\n"+
    "      weil CAD-Anwendungen zertifizierte Treiber voraussetzen und\n"+
    "      zwei Monitore mit hoher Aufloesung angesteuert werden.\n\n"+
    "SSD   1 TB NVMe (System + Projekte)                    ca.   8 W\n"+
    "      weil Ladezeiten grosser Modelle stark von der Zugriffszeit\n"+
    "      abhaengen. Zusaetzlich 2 TB SATA-SSD als Archiv (ca. 4 W).\n\n"+
    "Board ATX mit passendem Sockel, 4 RAM-Slots           ca.  45 W\n"+
    "      weil spaetere Aufruestung auf 128 GB moeglich bleiben soll.\n\n"+
    "Monitore 2 x 27 Zoll WQHD, IPS, hoehenverstellbar\n"+
    "      weil IPS blickwinkelstabil und farbtreu ist und die\n"+
    "      Hoehenverstellung nach ArbStaettV gefordert ist.\n"+
    "      (eigene Stromversorgung, nicht im Netzteil beruecksichtigt)\n\n"+
    "NETZTEIL\n"+
    "  125 + 15 + 180 + 8 + 4 + 45 = 377 W\n"+
    "  Luefter und Peripherie ca. 25 W  ->  402 W\n"+
    "  + 25 % Reserve (101 W)           ->  503 W\n"+
    "  Empfehlung: 550-W-Netzteil, 80 PLUS Gold\n\n"+
    "  Begruendung der Reserve: Lastspitzen beim Rendern, spaetere\n"+
    "  Aufruestung und bester Wirkungsgrad bei etwa halber Auslastung.",
  solutionLang:'Konfiguration',
  solutionNote:'Die IHK bewertet bei dieser Aufgabenform fast ausschließlich die Begründungen, nicht die konkreten Zahlen. Eine Konfiguration mit 32 statt 64 GB RAM ist voll punktwürdig, wenn die Begründung trägt. Umgekehrt bringt die perfekte Hardwareliste ohne „weil" kaum Punkte. Achte außerdem darauf, die Monitore nicht in die Netzteilrechnung einzubeziehen — sie haben ein eigenes Netzteil.'
},
{
  id:'ex22', level:1, topic:'Verkabelung', title:'Verkabelung für ein Stockwerk planen',
  task:'<p>In einer Arztpraxis soll das Netzwerk erneuert werden:</p>'+
    '<div class="check-prompt">• 8 Behandlungsräume mit je einem PC, Entfernung zum Technikraum 15 bis 40 m\n• 1 Röntgenraum, 25 m entfernt, direkt neben dem Röntgengenerator\n• 2 WLAN-Access-Points an der Decke, 30 und 55 m, ohne Steckdose\n• Anbindung an das Nebengebäude, 250 m Luftlinie\n• Der Technikraum enthält Patchfeld und Switch</div>'+
    '<p>Lege für jede Strecke das Medium fest und begründe. Prüfe außerdem, ob ein Switch mit 370 W PoE-Budget ausreicht, wenn die Access Points PoE+ benötigen.</p>',
  hints:[
    'Achte auf Störquellen und auf Entfernungen über 100 m — das sind die Entscheidungskriterien.',
    'Geräte ohne Steckdose brauchen PoE, das über dasselbe Kabel läuft.',
    'PoE+ nach 802.3at liefert etwa 25,5 W am Endgerät.'
  ],
  solution:
    "MEDIENWAHL\n\n"+
    "8 Behandlungsraeume, 15-40 m\n"+
    "   -> Cat 6a U/UTP, Verlegekabel auf Patchfeld\n"+
    "      Innerhalb der 100-m-Grenze, keine besonderen Stoerquellen,\n"+
    "      Cat 6a sichert 10 Gbit/s fuer die Zukunft.\n\n"+
    "Roentgenraum, 25 m, neben dem Generator\n"+
    "   -> Cat 6a S/FTP (geschirmt) oder LWL\n"+
    "      Der Roentgengenerator erzeugt starke elektromagnetische\n"+
    "      Stoerungen. Geschirmtes Kabel mit beidseitigem Potenzial-\n"+
    "      ausgleich, im Zweifel Glasfaser wegen galvanischer Trennung.\n\n"+
    "2 Access Points, 30 m und 55 m, kein Stromanschluss\n"+
    "   -> Cat 6a mit PoE+ (802.3at)\n"+
    "      Strom und Daten ueber ein Kabel, damit keine Steckdose an\n"+
    "      der Decke gesetzt werden muss.\n\n"+
    "Nebengebaeude, 250 m\n"+
    "   -> Singlemode-LWL\n"+
    "      Ueber 100 m ist Kupfer ausgeschlossen. LWL bietet zusaetzlich\n"+
    "      galvanische Trennung zwischen den Gebaeuden - wichtig wegen\n"+
    "      Blitzschutz und unterschiedlichem Erdpotenzial.\n\n"+
    "POE-BUDGET\n"+
    "   2 Access Points x 25,5 W = 51 W\n"+
    "   51 W < 370 W  ->  Das Budget reicht deutlich aus.\n"+
    "   Es bleiben 319 W fuer spaetere Geraete, etwa IP-Telefone\n"+
    "   oder Kameras.\n\n"+
    "ERGAENZUNG\n"+
    "   Alle Verlegekabel enden im Patchfeld des Technikraums,\n"+
    "   von dort Rangierung mit kurzen Patchkabeln auf die Switch-Ports.\n"+
    "   Vorteil: Umkonfiguration ohne Neuverlegung.",
  solutionLang:'Netzplanung',
  solutionNote:'Drei Signalwörter steuern diese Aufgabe vollständig: die Entfernung über 100 Meter erzwingt Glasfaser, die Störquelle erzwingt Schirmung, und die fehlende Steckdose erzwingt PoE. Wenn du die Aufgabe liest, markiere zuerst diese drei Dinge — dann schreibt sich die Lösung fast von selbst. Der Hinweis auf die galvanische Trennung bei der Gebäudeverbindung hebt die Antwort über den Durchschnitt.'
},
{
  id:'ex23', level:2, topic:'Netzplan', title:'Netzplan mit Verzögerung neu bewerten',
  task:'<p>Ein Migrationsprojekt umfasst sechs Vorgänge:</p>'+
    '<div class="check-prompt">Vorgang  Dauer  Vorgänger\n   A       3       —\n   B       7       A\n   C       2       A\n   D       4       C\n   E       6       B, D\n   F       2       E</div>'+
    '<p>(a) Berechne den vollständigen Netzplan und bestimme Projektdauer und kritischen Pfad.<br>(b) Vorgang C verzögert sich um 5 Tage. Wie wirkt sich das aus?<br>(c) Vorgang B verzögert sich stattdessen um 2 Tage. Wie wirkt sich <em>das</em> aus?</p>',
  hints:[
    'Rechne erst vorwärts (Maximum bei mehreren Vorgängern), dann rückwärts (Minimum) und bilde GP = SAZ − FAZ.',
    'Eine Verzögerung wirkt sich nur dann aufs Projektende aus, wenn sie den Gesamtpuffer übersteigt.',
    'Auf dem kritischen Pfad ist der Gesamtpuffer null — jede Verzögerung schlägt dort voll durch.'
  ],
  solution:
    "(a) VOLLSTAENDIGER NETZPLAN\n\n"+
    "  Vorwaerts:\n"+
    "    A: FAZ=0            D=3  FEZ=3\n"+
    "    B: FAZ=3            D=7  FEZ=10\n"+
    "    C: FAZ=3            D=2  FEZ=5\n"+
    "    D: FAZ=5            D=4  FEZ=9\n"+
    "    E: FAZ=MAX(10,9)=10 D=6  FEZ=16\n"+
    "    F: FAZ=16           D=2  FEZ=18\n\n"+
    "  Rueckwaerts (SEZ von F = 18):\n"+
    "    F: SEZ=18  SAZ=16\n"+
    "    E: SEZ=16  SAZ=10\n"+
    "    D: SEZ=10  SAZ=6\n"+
    "    C: SEZ=6   SAZ=4\n"+
    "    B: SEZ=10  SAZ=3\n"+
    "    A: SEZ=MIN(3,4)=3  SAZ=0     Probe: SAZ = 0  ok\n\n"+
    "  Gesamtpuffer:\n"+
    "    A: 0-0  = 0   kritisch\n"+
    "    B: 3-3  = 0   kritisch\n"+
    "    C: 4-3  = 1\n"+
    "    D: 6-5  = 1\n"+
    "    E: 10-10= 0   kritisch\n"+
    "    F: 16-16= 0   kritisch\n\n"+
    "  Projektdauer:    18 Tage\n"+
    "  Kritischer Pfad: A - B - E - F\n\n"+
    "(b) VORGANG C VERZOEGERT SICH UM 5 TAGE\n"+
    "  Gesamtpuffer von C betraegt 1 Tag.\n"+
    "  Verbrauch: 5 Tage, davon 1 Tag gepuffert -> 4 Tage Ueberhang.\n"+
    "  Neuer Ablauf: C endet bei 10, D bei 14,\n"+
    "  E startet bei MAX(10,14)=14 und endet bei 20, F bei 22.\n"+
    "  Neue Projektdauer: 22 Tage, also 4 Tage Verzug.\n"+
    "  Der kritische Pfad wechselt zu A - C - D - E - F.\n\n"+
    "(c) VORGANG B VERZOEGERT SICH UM 2 TAGE\n"+
    "  B liegt auf dem kritischen Pfad, Gesamtpuffer 0.\n"+
    "  Jede Verzoegerung schlaegt voll durch.\n"+
    "  Neue Projektdauer: 18 + 2 = 20 Tage.\n"+
    "  Der kritische Pfad bleibt A - B - E - F.",
  solutionLang:'Netzplan',
  solutionNote:'Teil (b) ist die anspruchsvollere Variante, weil der kritische Pfad wechselt — das wird oft übersehen. Die Regel lautet: Eine Verzögerung wirkt sich um genau den Betrag aufs Projektende aus, um den sie den Gesamtpuffer übersteigt. Bei fünf Tagen Verzögerung und einem Tag Puffer sind das vier Tage. Prüfe danach immer, ob der bisher unkritische Zweig dadurch selbst kritisch geworden ist.'
},
{
  id:'ex24', level:2, topic:'Virtualisierung', title:'Serverkonsolidierung wirtschaftlich bewerten',
  task:'<p>Ein Unternehmen betreibt sieben physische Server und erwägt eine Virtualisierung:</p>'+
    '<div class="check-prompt">IST: 7 Server, je 210 W, Betrieb 24/7, Strompreis 0,32 €/kWh\n     Wartungsvertrag 340 € pro Server und Jahr\n     Durchschnittliche Auslastung 14 %\n\nSOLL: 2 Virtualisierungshosts, je 480 W, Anschaffung 17.400 € gesamt\n      Virtualisierungslizenzen 3.200 € einmalig\n      Wartungsvertrag 890 € pro Host und Jahr\n      Migrationsaufwand 12 Personentage à 8 h zu 78 €/h</div>'+
    '<p>Vergleiche über <strong>fünf Jahre</strong>, berechne die Amortisationsdauer und nenne je zwei nicht-monetäre Vor- und Nachteile.</p>',
  hints:[
    'Stromkosten: Watt × Stunden ÷ 1.000 × Preis. Bei 24/7 sind es 8.760 Stunden im Jahr.',
    'Die einmaligen Kosten fallen nur einmal an, die laufenden fünfmal.',
    'Für die Amortisation teilst du die einmaligen Kosten durch die jährliche Einsparung.'
  ],
  solution:
    "IST-KOSTEN PRO JAHR\n"+
    "  Strom:   7 x 210 W x 8.760 h = 12.877.200 Wh = 12.877,2 kWh\n"+
    "           12.877,2 x 0,32 = 4.120,70 EUR\n"+
    "  Wartung: 7 x 340          = 2.380,00 EUR\n"+
    "  -----------------------------------------\n"+
    "  Summe pro Jahr             = 6.500,70 EUR\n"+
    "  Ueber 5 Jahre              = 32.503,50 EUR\n\n"+
    "SOLL-KOSTEN\n"+
    "  Einmalig:\n"+
    "     Hardware                 17.400,00\n"+
    "     Lizenzen                  3.200,00\n"+
    "     Migration 12 x 8 x 78 =   7.488,00\n"+
    "     ------------------------------------\n"+
    "     Summe einmalig           28.088,00 EUR\n\n"+
    "  Laufend pro Jahr:\n"+
    "     Strom: 2 x 480 W x 8.760 = 8.409.600 Wh = 8.409,6 kWh\n"+
    "            8.409,6 x 0,32    = 2.691,07 EUR\n"+
    "     Wartung: 2 x 890         = 1.780,00 EUR\n"+
    "     ------------------------------------\n"+
    "     Summe pro Jahr            = 4.471,07 EUR\n"+
    "     Ueber 5 Jahre             = 22.355,35 EUR\n\n"+
    "  Gesamtkosten 5 Jahre = 28.088,00 + 22.355,35 = 50.443,35 EUR\n\n"+
    "VERGLEICH UEBER 5 JAHRE\n"+
    "  IST  32.503,50 EUR\n"+
    "  SOLL 50.443,35 EUR\n"+
    "  -> Die Virtualisierung ist ueber 5 Jahre um 17.939,85 EUR teurer,\n"+
    "     wenn die Altserver weiterlaufen koennten.\n\n"+
    "AMORTISATION DER EINMALKOSTEN\n"+
    "  Jaehrliche Einsparung im laufenden Betrieb:\n"+
    "     6.500,70 - 4.471,07 = 2.029,63 EUR\n"+
    "  Amortisation: 28.088,00 / 2.029,63 = 13,8 Jahre\n"+
    "  -> Rein ueber die Betriebskosten amortisiert sich das Projekt nicht.\n\n"+
    "  ABER: Die sieben Altserver muessten ohnehin ersetzt werden.\n"+
    "  Bei angenommenen 4.000 EUR je Ersatzserver waeren das 28.000 EUR,\n"+
    "  die entfallen. Damit amortisiert sich das Vorhaben sofort.\n\n"+
    "NICHT-MONETAERE VORTEILE\n"+
    "  1. Snapshots und Live-Migration ermoeglichen Wartung ohne\n"+
    "     Betriebsunterbrechung.\n"+
    "  2. Neue Server sind in Minuten statt Wochen bereitgestellt;\n"+
    "     die Auslastung steigt von 14 % auf ein wirtschaftliches Niveau.\n\n"+
    "NICHT-MONETAERE NACHTEILE\n"+
    "  1. Der Host wird zum Single Point of Failure - faellt er aus,\n"+
    "     sind alle Gaeste betroffen. Cluster und gemeinsamer Speicher\n"+
    "     sind daher noetig.\n"+
    "  2. Es wird zusaetzliches Spezialwissen benoetigt; ohne Schulung\n"+
    "     steigt das Betriebsrisiko.",
  solutionLang:'Wirtschaftlichkeitsrechnung',
  solutionNote:'Diese Aufgabe hat bewusst ein unbequemes Ergebnis: Die Rechnung spricht zunächst gegen die Virtualisierung. Genau das zu erkennen und zu benennen ist die eigentliche Leistung. Der entscheidende Zusatz ist die Frage nach der Alternative — ein Vergleich gegen den Weiterbetrieb alter Hardware ist unvollständig, wenn diese ohnehin ersetzt werden müsste. Solche Annahmen darfst und sollst du treffen, wenn du sie ausdrücklich kennzeichnest.'
},
{
  id:'ex25', level:2, topic:'Lizenzen', title:'Lizenzbedarf ermitteln und Modell wählen',
  task:'<p>Eine Spedition plant die Einführung einer Branchensoftware:</p>'+
    '<div class="check-prompt">• 34 Mitarbeiter insgesamt, davon 22 im Büro und 12 Fahrer\n• Die Fahrer nutzen die App auf 12 Tablets, jeweils nur während ihrer Schicht\n• Im Büro arbeiten 22 Personen an 18 Arbeitsplatzrechnern im Wechsel\n• Zu Spitzenzeiten sind nie mehr als 25 Personen gleichzeitig angemeldet\n\nPreise: Named User 240 €/Jahr · Device 290 €/Jahr · Concurrent 520 €/Jahr</div>'+
    '<p>Berechne die Jahreskosten für alle drei Modelle und sprich eine begründete Empfehlung aus. Nenne außerdem zwei Risiken einer Unterlizenzierung.</p>',
  hints:[
    'Named User zählt Personen, Device zählt Geräte, Concurrent zählt gleichzeitige Anmeldungen.',
    'Die Tablets sind eigene Geräte und müssen bei der Device-Zählung mit.',
    'Vergleiche die drei Summen und begründe die Empfehlung mit der Differenz.'
  ],
  solution:
    "LIZENZBEDARF JE MODELL\n\n"+
    "  Named User : 34 Personen\n"+
    "               34 x 240 = 8.160 EUR/Jahr\n\n"+
    "  Device     : 18 Buero-PCs + 12 Tablets = 30 Geraete\n"+
    "               30 x 290 = 8.700 EUR/Jahr\n\n"+
    "  Concurrent : 25 gleichzeitige Anmeldungen\n"+
    "               25 x 520 = 13.000 EUR/Jahr\n\n"+
    "EMPFEHLUNG\n"+
    "  Guenstigstes Modell: Named User mit 8.160 EUR pro Jahr.\n"+
    "  Es ist 540 EUR guenstiger als Device und 4.840 EUR guenstiger\n"+
    "  als Concurrent.\n\n"+
    "  Begruendung: Die Zahl der Personen (34) liegt hier nur knapp\n"+
    "  ueber der Zahl der Geraete (30), und der hohe Stueckpreis der\n"+
    "  Concurrent-Lizenz macht dieses Modell trotz der geringsten\n"+
    "  Stueckzahl am teuersten.\n\n"+
    "  Zu pruefen ist zusaetzlich:\n"+
    "   - Bei Personalfluktuation sind Named-User-Lizenzen umzumelden;\n"+
    "     Device-Lizenzen waeren dabei pflegeleichter.\n"+
    "   - Waechst die Belegschaft auf ueber 36 Personen, wird Device\n"+
    "     guenstiger. Die Entscheidung sollte daher jaehrlich geprueft\n"+
    "     werden.\n\n"+
    "RISIKEN DER UNTERLIZENZIERUNG\n"+
    "  1. Urheberrechtsverletzung: Der Hersteller kann Schadenersatz\n"+
    "     und Nachlizenzierung fordern; in schweren Faellen drohen\n"+
    "     strafrechtliche Folgen fuer die Geschaeftsfuehrung.\n"+
    "  2. Betriebsrisiko und Reputationsschaden: Bei einem Lizenzaudit\n"+
    "     koennen Systeme gesperrt werden, und der Vorfall belastet\n"+
    "     die Geschaeftsbeziehung zum Hersteller.",
  solutionLang:'Lizenzrechnung',
  solutionNote:'Die Falle steckt in der Device-Zählung: Die zwölf Tablets sind eigenständige Geräte und dürfen nicht vergessen werden, auch wenn sie nur schichtweise genutzt werden. Und beachte den Hinweis zum Wachstum — bei 36 Personen kippt die Entscheidung. Solche Kipppunkte zu benennen, macht aus einer Rechnung eine Empfehlung, und genau das verlangt der Operator.'
},
{
  id:'ex26', level:2, topic:'Kostenrechnung', title:'Break-Even und Verfahrensvergleich',
  task:'<p>Ein IT-Dienstleister prüft, ob er den Druckbetrieb selbst übernimmt oder auslagert:</p>'+
    '<div class="check-prompt">EIGENBETRIEB: Leasing der Drucker 480 €/Monat, Wartung 1.200 €/Jahr,\n              Verbrauchsmaterial 0,032 € pro Seite\n\nDIENSTLEISTER: Grundgebühr 90 €/Monat, 0,058 € pro Seite\n\nAktuelles Druckvolumen: 14.000 Seiten pro Monat</div>'+
    '<p>(a) Berechne die Jahreskosten beider Varianten beim aktuellen Volumen.<br>(b) Bestimme die kritische Menge pro Jahr, ab der sich der Eigenbetrieb lohnt.<br>(c) Gib eine Empfehlung mit Richtung.</p>',
  hints:[
    'Trenne zuerst konsequent nach Fixkosten pro Jahr und variablen Kosten je Seite.',
    'Für die kritische Menge setzt du beide Kostenfunktionen gleich und löst nach x auf.',
    'Rechne das Monatsvolumen auf das Jahr hoch, bevor du vergleichst.'
  ],
  solution:
    "KOSTENFUNKTIONEN AUFSTELLEN\n\n"+
    "  Eigenbetrieb:\n"+
    "    Fixkosten  = 480 x 12 + 1.200 = 5.760 + 1.200 = 6.960 EUR/Jahr\n"+
    "    variabel   = 0,032 EUR je Seite\n"+
    "    K_eigen(x) = 6.960 + 0,032x\n\n"+
    "  Dienstleister:\n"+
    "    Fixkosten  = 90 x 12 = 1.080 EUR/Jahr\n"+
    "    variabel   = 0,058 EUR je Seite\n"+
    "    K_dienst(x)= 1.080 + 0,058x\n\n"+
    "(a) AKTUELLES VOLUMEN\n"+
    "    x = 14.000 x 12 = 168.000 Seiten pro Jahr\n\n"+
    "    Eigenbetrieb : 6.960 + 0,032 x 168.000 = 6.960 + 5.376 = 12.336 EUR\n"+
    "    Dienstleister: 1.080 + 0,058 x 168.000 = 1.080 + 9.744 = 10.824 EUR\n\n"+
    "    Beim aktuellen Volumen ist der Dienstleister um 1.512 EUR\n"+
    "    pro Jahr guenstiger.\n\n"+
    "(b) KRITISCHE MENGE\n"+
    "    6.960 + 0,032x = 1.080 + 0,058x\n"+
    "    6.960 - 1.080  = 0,058x - 0,032x\n"+
    "    5.880          = 0,026x\n"+
    "    x              = 226.154 Seiten pro Jahr\n"+
    "                   = rund 18.846 Seiten pro Monat\n\n"+
    "    Probe bei 300.000 Seiten:\n"+
    "      Eigen  = 6.960 + 9.600  = 16.560 EUR\n"+
    "      Dienst = 1.080 + 17.400 = 18.480 EUR   -> Eigen guenstiger  ok\n\n"+
    "(c) EMPFEHLUNG\n"+
    "    Beim derzeitigen Volumen von 168.000 Seiten pro Jahr wird der\n"+
    "    Dienstleister empfohlen; er ist 1.512 EUR guenstiger.\n"+
    "    Der Eigenbetrieb lohnt sich erst ab rund 226.000 Seiten pro\n"+
    "    Jahr, also ab etwa 18.850 Seiten im Monat.\n"+
    "    Da das aktuelle Volumen 26 % darunter liegt, ist kurzfristig\n"+
    "    kein Wechsel sinnvoll. Die Entscheidung sollte bei einem\n"+
    "    Anstieg des Druckvolumens erneut geprueft werden.",
  solutionLang:'Kostenvergleich',
  solutionNote:'Die Probe mit einer Beispielmenge oberhalb der kritischen Menge ist der beste Schutz gegen den häufigsten Fehler dieser Aufgabenform — die vertauschte Richtung der Empfehlung. Sie kostet dreißig Sekunden und sichert den Begründungspunkt. Achte außerdem darauf, das Monatsvolumen konsequent aufs Jahr hochzurechnen, weil die Fixkosten teils monatlich und teils jährlich angegeben sind.'
},
{
  id:'ex27', level:2, topic:'IT-Service', title:'Tickets einordnen und SLA prüfen',
  task:'<p>Ein Dienstleister hat folgendes SLA vereinbart:</p>'+
    '<div class="check-prompt">Servicezeit: Mo–Fr, 8:00–17:00 Uhr\nPriorität 1: Reaktion binnen 30 Min, Wiederherstellung binnen 4 Std\nPriorität 2: Reaktion binnen 2 Std, Wiederherstellung binnen 8 Std\nVerfügbarkeit: 99,5 % bezogen auf die Servicezeit</div>'+
    '<p>Ordne die folgenden Meldungen jeweils als Incident, Problem, Change oder Service Request ein, bestimme die Priorität und prüfe die SLA-Einhaltung:</p>'+
    '<div class="check-prompt">1) Do 09:12 — „Der Warenwirtschaftsserver ist nicht erreichbar, 40 Nutzer betroffen."\n   Reaktion 09:35, Wiederherstellung 13:40.\n2) Fr 16:40 — „Bitte legen Sie ein Konto für unsere neue Kollegin an."\n   Bearbeitung Mo 09:15.\n3) „Der Server fällt seit drei Wochen jeden Donnerstagvormittag aus."\n4) „Wir möchten am Samstag die Firewall auf Version 12 aktualisieren."</div>'+
    '<p>Berechne außerdem die maximal zulässige Ausfallzeit pro Jahr.</p>',
  hints:[
    'Frage bei jeder Meldung: Ist gerade etwas kaputt, wiederholt es sich, ist es Routine oder eine geplante Änderung?',
    'Die Reaktionszeit ist erfüllt, sobald die Bearbeitung beginnt — nicht erst bei der Lösung.',
    'Für die Verfügbarkeit brauchst du die Servicezeit in Stunden pro Jahr, nicht 8.760.'
  ],
  solution:
    "1) INCIDENT, Prioritaet 1\n"+
    "   Auswirkung hoch (40 Nutzer, zentrales System),\n"+
    "   Dringlichkeit hoch -> Prioritaet 1.\n"+
    "   Reaktion:         09:12 -> 09:35 = 23 Min   (Soll 30 Min)  EINGEHALTEN\n"+
    "   Wiederherstellung:09:12 -> 13:40 = 4 h 28   (Soll 4 h)     VERLETZT\n"+
    "   Folge: SLA-Verstoss, ggf. Vertragsstrafe. Bei drohendem\n"+
    "   Fristablauf waere eine hierarchische Eskalation noetig gewesen.\n\n"+
    "2) SERVICE REQUEST\n"+
    "   Keine Stoerung, sondern ein Standardvorgang.\n"+
    "   Eingang Fr 16:40, Servicezeit endet um 17:00.\n"+
    "   Es verbleiben 20 Min am Freitag, die Uhr steht am Wochenende still\n"+
    "   und laeuft Mo ab 08:00 weiter. Bearbeitung Mo 09:15:\n"+
    "   20 Min + 75 Min = 95 Min Servicezeit.\n"+
    "   Fuer Service Requests ist im SLA keine Frist vereinbart -\n"+
    "   dies ist eine Luecke, die nachverhandelt werden sollte.\n\n"+
    "3) PROBLEM\n"+
    "   Die wiederkehrende Stoerung mit unbekannter Ursache.\n"+
    "   Die einzelnen Ausfaelle sind Incidents, das dahinterliegende\n"+
    "   Muster ist ein Problem. Ziel: Ursache finden (naheliegend etwa\n"+
    "   ein Backup- oder Wartungsjob am Donnerstagvormittag) und\n"+
    "   dauerhaft beseitigen.\n\n"+
    "4) CHANGE\n"+
    "   Geplante Aenderung ausserhalb der Servicezeit.\n"+
    "   Erforderlich: Change-Antrag, Risikobewertung, Testplan,\n"+
    "   Rueckfallplan (Rollback) und Information der Anwender.\n\n"+
    "MAXIMAL ZULAESSIGE AUSFALLZEIT\n"+
    "   Servicezeit = 9 h/Tag x 5 Tage x 52 Wochen = 2.340 h pro Jahr\n"+
    "   Erlaubter Ausfall = 2.340 x 0,005 = 11,7 h pro Jahr\n\n"+
    "   Zum Vergleich: Bezogen auf 8.760 h waeren es 43,8 h.\n"+
    "   Der Bezugszeitraum halbiert die erlaubte Ausfallzeit fast\n"+
    "   auf ein Viertel - er ist daher immer genau zu lesen.",
  solutionLang:'ITSM',
  solutionNote:'Die Aufgabe prüft drei Dinge gleichzeitig, und die meisten Punkte gehen bei Meldung 1 verloren: Die Reaktionszeit wurde eingehalten, die Wiederherstellungszeit nicht. Wer beide Fristen in einen Topf wirft, kommt zum falschen Ergebnis. Bei Meldung 2 ist der eigentliche Prüfungspunkt, dass die Servicezeit am Wochenende ruht — die Uhr läuft nicht durch. Und bei der Verfügbarkeit entscheidet der Bezugszeitraum über einen Faktor von fast vier.'
},
{
  id:'ex28', level:3, topic:'Cloud', title:'Cloud-Migration bewerten und absichern',
  task:'<p>Eine Steuerkanzlei mit 28 Mitarbeitern erwägt, ihre Dokumentenverwaltung in die Cloud zu verlagern:</p>'+
    '<div class="check-prompt">Aktuell: eigener Server (4 Jahre alt, Ersatz in 12 Monaten fällig, ca. 9.000 €),\n         Backup auf NAS, Administration durch einen externen Dienstleister\n         für 280 €/Monat, Stromkosten ca. 55 €/Monat\n\nAngebot: SaaS-Dokumentenmanagement, 19 €/Benutzer/Monat,\n         Einführung und Datenmigration einmalig 6.800 €,\n         Rechenzentrum des Anbieters in Irland</div>'+
    '<p>(a) Vergleiche über fünf Jahre. (b) Ordne das Angebot einem Servicemodell zu und begründe. (c) Nenne drei datenschutzrechtliche Anforderungen, die vor Vertragsschluss zu klären sind. (d) Nenne zwei Risiken der Migration mit je einer Gegenmaßnahme.</p>',
  hints:[
    'Beim Ist-Zustand gehört die anstehende Ersatzbeschaffung in die Fünfjahresrechnung.',
    'Für das Servicemodell: Wer verwaltet das Betriebssystem, wer die Anwendung?',
    'Bei (c) denke an Art. 28 DSGVO, an den Serverstandort und daran, wer verantwortlich bleibt.'
  ],
  solution:
    "(a) KOSTENVERGLEICH UEBER 5 JAHRE\n\n"+
    "  IST (Eigenbetrieb)\n"+
    "    Ersatzserver in 12 Monaten          9.000,00\n"+
    "    Administration 280 x 12 x 5        16.800,00\n"+
    "    Strom 55 x 12 x 5                   3.300,00\n"+
    "    ------------------------------------------\n"+
    "    Summe                              29.100,00 EUR\n\n"+
    "  SOLL (SaaS)\n"+
    "    Lizenz 28 x 19 x 12 x 5            31.920,00\n"+
    "    Einfuehrung und Migration           6.800,00\n"+
    "    ------------------------------------------\n"+
    "    Summe                              38.720,00 EUR\n\n"+
    "  Differenz: 9.620 EUR zugunsten des Eigenbetriebs.\n"+
    "  Die Cloud-Loesung ist ueber fuenf Jahre rund 33 % teurer.\n"+
    "  Nicht eingerechnet sind Ausfallrisiko, Backup-Aufwand und\n"+
    "  die interne Arbeitszeit fuer die Serverbetreuung - diese\n"+
    "  Posten verschieben das Bild zugunsten der Cloud.\n\n"+
    "(b) SERVICEMODELL\n"+
    "  Es handelt sich um SaaS (Software as a Service).\n"+
    "  Begruendung: Der Anbieter stellt die fertige Anwendung\n"+
    "  einschliesslich Betriebssystem, Laufzeitumgebung und\n"+
    "  Infrastruktur bereit. Die Kanzlei verwaltet lediglich ihre\n"+
    "  eigenen Daten und Benutzerkonten - kein Zugriff auf das\n"+
    "  Betriebssystem, keine eigene Installation.\n\n"+
    "(c) DATENSCHUTZRECHTLICHE ANFORDERUNGEN\n"+
    "  1. Auftragsverarbeitungsvertrag nach Art. 28 DSGVO\n"+
    "     Der Anbieter ist Auftragsverarbeiter, die Kanzlei bleibt\n"+
    "     Verantwortliche. Der AVV muss Weisungsbindung, Vertraulichkeit,\n"+
    "     Subunternehmer, Loeschung und Kontrollrechte regeln.\n\n"+
    "  2. Serverstandort und Drittlandtransfer\n"+
    "     Irland liegt in der EU, ein Drittlandtransfer findet zunaechst\n"+
    "     nicht statt. Zu pruefen ist jedoch, ob Subunternehmer oder\n"+
    "     Support-Zugriffe ausserhalb der EU erfolgen - dann waeren\n"+
    "     zusaetzliche Garantien noetig.\n\n"+
    "  3. Technische und organisatorische Massnahmen nach Art. 32\n"+
    "     Verschluesselung bei Uebertragung und Speicherung, Zugriffs-\n"+
    "     protokollierung, Mandantentrennung, dokumentiertes Loesch-\n"+
    "     konzept und ein nachweisbares Backup-Konzept.\n\n"+
    "  Zusaetzlich: Steuerberater unterliegen der Verschwiegenheits-\n"+
    "  pflicht nach § 203 StGB. Die Einbindung eines Dienstleisters\n"+
    "  erfordert daher besondere Sorgfalt und vertragliche Absicherung.\n\n"+
    "(d) RISIKEN UND GEGENMASSNAHMEN\n"+
    "  1. Abhaengigkeit vom Anbieter (Lock-in)\n"+
    "     Ein spaeterer Wechsel oder eine Insolvenz des Anbieters kann\n"+
    "     den Zugriff auf die Daten gefaehrden.\n"+
    "     Gegenmassnahme: Vertragliche Zusicherung eines Datenexports\n"+
    "     in einem offenen Format, geregelte Kuendigungs- und\n"+
    "     Rueckgabefristen, regelmaessige eigene Exporte.\n\n"+
    "  2. Abhaengigkeit von der Internetverbindung\n"+
    "     Bei einem Leitungsausfall ist die Kanzlei arbeitsunfaehig,\n"+
    "     waehrend ein lokaler Server weiterlaufen wuerde.\n"+
    "     Gegenmassnahme: Zweiter Internetanschluss eines anderen\n"+
    "     Anbieters als Rueckfallebene, Router mit automatischem\n"+
    "     Failover, ergaenzend Mobilfunk als Notzugang.",
  solutionLang:'Cloud-Bewertung',
  solutionNote:'Die Fünfjahresrechnung fällt hier gegen die Cloud aus, und es ist richtig, das so zu schreiben — aber unvollständig ohne den Hinweis auf die nicht bezifferten Posten. Prüfer erwarten bei Cloud-Aufgaben genau diese Differenzierung: harte Zahlen auf der einen Seite, nicht quantifizierte Faktoren wie Ausfallrisiko, Skalierbarkeit und interner Aufwand auf der anderen. Bei Teil (c) ist der Kernsatz, dass die Verantwortlichkeit nach DSGVO nie auf den Anbieter übergeht.'
},
{
  id:'ex29', level:3, topic:'IPv4', title:'Netzsegmentierung mit unterschiedlichen Größen',
  task:'<p>Ein Unternehmen hat das Netz <strong>192.168.8.0/21</strong> zur Verfügung und soll es bedarfsgerecht aufteilen:</p>'+
    '<div class="check-prompt">Verwaltung   220 Hosts\nProduktion   400 Hosts\nGästenetz     50 Hosts\nVoIP         120 Hosts\nServer        25 Hosts\nManagement    10 Hosts\n2 Router-Kopplungen zu je 2 Hosts</div>'+
    '<p>Bestimme für jedes Segment das erforderliche Präfix und weise die Netze so zu, dass möglichst wenig Adressraum verschwendet wird (VLSM). Gib jeweils Netzadresse, Maske und Broadcast an.</p>',
  hints:[
    'Beginne mit dem größten Bedarf — sonst entstehen Lücken, die sich nicht mehr füllen lassen.',
    'Für jedes Segment gilt: kleinstes h mit 2^h − 2 ≥ Bedarf, Präfix = 32 − h.',
    'Das /21 umfasst 192.168.8.0 bis 192.168.15.255, also 2.048 Adressen.'
  ],
  solution:
    "AUSGANGSNETZ\n"+
    "  192.168.8.0/21 = 2.048 Adressen\n"+
    "  Bereich: 192.168.8.0 bis 192.168.15.255\n\n"+
    "PRAEFIX JE SEGMENT (absteigend nach Bedarf sortieren!)\n\n"+
    "  Produktion  400 Hosts -> 2^9-2 = 510  -> /23  (512 Adressen)\n"+
    "  Verwaltung  220 Hosts -> 2^8-2 = 254  -> /24  (256 Adressen)\n"+
    "  VoIP        120 Hosts -> 2^7-2 = 126  -> /25  (128 Adressen)\n"+
    "  Gaeste       50 Hosts -> 2^6-2 =  62  -> /26  ( 64 Adressen)\n"+
    "  Server       25 Hosts -> 2^5-2 =  30  -> /27  ( 32 Adressen)\n"+
    "  Management   10 Hosts -> 2^4-2 =  14  -> /28  ( 16 Adressen)\n"+
    "  Kopplung 1    2 Hosts -> 2^2-2 =   2  -> /30  (  4 Adressen)\n"+
    "  Kopplung 2    2 Hosts -> 2^2-2 =   2  -> /30  (  4 Adressen)\n\n"+
    "ZUWEISUNG (groesstes Netz zuerst, luekenlos aneinander)\n\n"+
    "  Produktion  192.168.8.0/23\n"+
    "              Maske 255.255.254.0\n"+
    "              Hosts 192.168.8.1 - 192.168.9.254\n"+
    "              Broadcast 192.168.9.255\n\n"+
    "  Verwaltung  192.168.10.0/24\n"+
    "              Maske 255.255.255.0\n"+
    "              Hosts 192.168.10.1 - 192.168.10.254\n"+
    "              Broadcast 192.168.10.255\n\n"+
    "  VoIP        192.168.11.0/25\n"+
    "              Maske 255.255.255.128\n"+
    "              Hosts 192.168.11.1 - 192.168.11.126\n"+
    "              Broadcast 192.168.11.127\n\n"+
    "  Gaeste      192.168.11.128/26\n"+
    "              Maske 255.255.255.192\n"+
    "              Hosts 192.168.11.129 - 192.168.11.190\n"+
    "              Broadcast 192.168.11.191\n\n"+
    "  Server      192.168.11.192/27\n"+
    "              Maske 255.255.255.224\n"+
    "              Hosts 192.168.11.193 - 192.168.11.222\n"+
    "              Broadcast 192.168.11.223\n\n"+
    "  Management  192.168.11.224/28\n"+
    "              Maske 255.255.255.240\n"+
    "              Hosts 192.168.11.225 - 192.168.11.238\n"+
    "              Broadcast 192.168.11.239\n\n"+
    "  Kopplung 1  192.168.11.240/30\n"+
    "              Hosts 192.168.11.241 - 192.168.11.242\n"+
    "              Broadcast 192.168.11.243\n\n"+
    "  Kopplung 2  192.168.11.244/30\n"+
    "              Hosts 192.168.11.245 - 192.168.11.246\n"+
    "              Broadcast 192.168.11.247\n\n"+
    "PROBE\n"+
    "  Verbraucht: 512+256+128+64+32+16+4+4 = 1.016 Adressen\n"+
    "  Verfuegbar: 2.048\n"+
    "  Frei ab 192.168.11.248 bis 192.168.15.255 = 1.032 Adressen\n"+
    "  -> reichlich Reserve fuer weitere Segmente.",
  solutionLang:'VLSM',
  solutionNote:'Die Reihenfolge ist bei VLSM nicht Geschmackssache, sondern Voraussetzung: Vom größten zum kleinsten Netz zuzuweisen ist zwingend, weil ein großes Netz nur an einer durch seine eigene Blockgröße teilbaren Adresse beginnen darf. Wer klein anfängt, blockiert diese Startpunkte und muss von vorn beginnen. Die Probe am Ende — verbrauchte gegen verfügbare Adressen — fängt Rechenfehler zuverlässig ab und wird oft eigens bepunktet.'
},
{
  id:'ex30', level:3, topic:'Gesamtaufgabe', title:'Arbeitsplatz komplett einrichten – Handlungsaufgabe',
  task:'<p>Diese Aufgabe verbindet mehrere Prüfungsbereiche, so wie es die AP1 in ihren Handlungsschritten tut.</p>'+
    '<div class="check-prompt">Ein Architekturbüro richtet drei neue Arbeitsplätze im ausgebauten Dachgeschoss ein.\n\n• Die Räume haben je ein großes Dachflächenfenster nach Süden.\n• Der Technikraum liegt im Erdgeschoss, Kabelweg ca. 85 m.\n• Die Mitarbeiter arbeiten mit CAD und benötigen Zugriff auf den Projektserver.\n• Einer der drei Mitarbeiter ist stark sehbehindert.\n• Die Arbeitsplätze sollen im vorhandenen Netz 192.168.40.0/24 liegen;\n  der DHCP-Bereich ist .100 bis .200, der Router hat die .1.</div>'+
    '<p>Bearbeite: (a) Ergonomische Gestaltung inkl. Barrierefreiheit — je drei Maßnahmen. (b) Verkabelung mit Begründung. (c) Eine gültige statische IP-Konfiguration für einen Netzwerkdrucker samt Begründung. (d) Drei Punkte für das Abnahmeprotokoll.</p>',
  hints:[
    'Bei (a): Das Südfenster und die Sehbehinderung sind zwei getrennte Anforderungen.',
    'Bei (b): Prüfe die Kabellänge gegen die zulässige Höchstlänge.',
    'Bei (c): Schließe Netzadresse, Broadcast, Router und den gesamten DHCP-Bereich aus.'
  ],
  solution:
    "(a) ERGONOMIE UND BARRIEREFREIHEIT\n\n"+
    "  Ergonomie (wegen des Suedfensters und der Bildschirmarbeit):\n"+
    "   1. Bildschirme mit Blickrichtung PARALLEL zum Fenster aufstellen,\n"+
    "      weder davor (Blendung) noch mit dem Ruecken dazu (Spiegelung).\n"+
    "   2. Blend- und Sonnenschutz am Dachfenster, etwa Rollos, da die\n"+
    "      Suedlage ganztaegig direkte Einstrahlung bringt.\n"+
    "   3. Hoehenverstellbare Tische und Stuehle mit verstellbarer\n"+
    "      Rueckenlehne, Sehabstand 50-80 cm, oberste Bildschirmzeile\n"+
    "      unterhalb der Augenhoehe.\n"+
    "   (weiter moeglich: 500 Lux blendfreie Beleuchtung, mindestens\n"+
    "    8-10 m2 Flaeche je Arbeitsplatz, Laerm unter 55 dB(A))\n\n"+
    "  Barrierefreiheit fuer den sehbehinderten Mitarbeiter:\n"+
    "   1. Grosser, hochaufloesender Monitor (z. B. 32 Zoll) mit\n"+
    "      Bildschirmlupe und erhoehter Skalierung des Betriebssystems.\n"+
    "   2. Kontrastreiches Farbschema und Screenreader-Unterstuetzung;\n"+
    "      Software auf Tastaturbedienbarkeit pruefen (WCAG-Prinzipien\n"+
    "      wahrnehmbar, bedienbar, verstaendlich, robust).\n"+
    "   3. Tastatur mit grossen, kontrastreichen Beschriftungen,\n"+
    "      auf Wunsch Braillezeile; Dokumente mit Alternativtexten.\n\n"+
    "(b) VERKABELUNG\n\n"+
    "  Kabelweg 85 m liegt unter der zulaessigen Gesamtlaenge von 100 m,\n"+
    "  ABER: 85 m Verlegekabel plus zweimal Patchkabel (je ca. 5 m)\n"+
    "  ergeben 95 m - das ist noch zulaessig, aber knapp.\n"+
    "  Die Norm sieht hoechstens 90 m fest verlegtes Kabel vor,\n"+
    "  das ist hier eingehalten.\n\n"+
    "  Empfehlung: Cat 6a S/FTP, Verlegekabel auf ein Patchfeld im\n"+
    "  Dachgeschoss, von dort kurze Patchkabel zu einem Etagenswitch.\n"+
    "  Begruendung: Cat 6a sichert 10 Gbit/s ueber die volle Strecke,\n"+
    "  was fuer den Zugriff auf grosse CAD-Dateien auf dem Projekt-\n"+
    "  server sinnvoll ist. Die Schirmung ist bei Kabelwegen entlang\n"+
    "  der Hauselektrik ratsam.\n\n"+
    "  Alternative bei groesserer Entfernung oder spaeterer Erweiterung:\n"+
    "  LWL-Anbindung des Etagenswitches an den Technikraum.\n\n"+
    "(c) STATISCHE IP FUER DEN NETZWERKDRUCKER\n\n"+
    "  Ausgeschlossen sind:\n"+
    "    192.168.40.0    Netzadresse\n"+
    "    192.168.40.1    Router / Standardgateway\n"+
    "    192.168.40.100 bis .200  DHCP-Bereich (Adresskonflikt!)\n"+
    "    192.168.40.255  Broadcast\n\n"+
    "  Frei bleiben: .2 bis .99 sowie .201 bis .254\n\n"+
    "  Konfiguration:\n"+
    "    IP-Adresse       192.168.40.210\n"+
    "    Subnetzmaske     255.255.255.0\n"+
    "    Standardgateway  192.168.40.1\n"+
    "    DNS-Server       laut Firmenvorgabe\n\n"+
    "  Begruendung der statischen Vergabe: Ein Drucker muss dauerhaft\n"+
    "  unter derselben Adresse erreichbar sein, damit die auf den\n"+
    "  Clients hinterlegten Druckerports gueltig bleiben.\n"+
    "  Saubere Alternative: DHCP-Reservierung auf die MAC-Adresse -\n"+
    "  dann bleibt die Verwaltung zentral beim DHCP-Server.\n\n"+
    "(d) ABNAHMEPROTOKOLL - drei Punkte\n\n"+
    "   1. Funktionspruefung je Arbeitsplatz: Anmeldung an der Domaene,\n"+
    "      Zugriff auf den Projektserver, Testdruck, Start der\n"+
    "      CAD-Anwendung mit einer Beispieldatei.\n"+
    "   2. Nachweis der ergonomischen und barrierefreien Einrichtung:\n"+
    "      Messwerte fuer Beleuchtung, eingestellte Tischhoehen,\n"+
    "      installierte Hilfsmittel und erfolgte Einweisung.\n"+
    "   3. Uebergabe der Dokumentation: Inventarnummern, vergebene\n"+
    "      IP-Adressen, Patchfeld-Belegung, Lizenznachweise,\n"+
    "      Ansprechpartner - mit Datum und Unterschrift beider Seiten.",
  solutionLang:'Handlungsaufgabe',
  solutionNote:'So sieht eine echte AP1-Handlungsaufgabe aus: mehrere Prüfungsbereiche in einem Szenario, mit Angaben, die alle gebraucht werden. Das Südfenster, die 85 Meter, die Sehbehinderung und der DHCP-Bereich sind jeweils der Auslöser für eine Teilantwort — keine davon ist Dekoration. Trainiere daher, die Aufgabenstellung zuerst durchzugehen und jede Zahl und jeden Nebensatz zu markieren, bevor du schreibst. Was nicht gebraucht wird, ist in der AP1 die Ausnahme.'
},
{
  id:'ex31', level:3, topic:'Kommunikation', title:'Eskaliertes Kundengespräch analysieren',
  task:'<p>Ein Kunde ruft im Support an:</p>'+
    '<div class="check-prompt">Kunde:      „Das ist jetzt das dritte Mal diese Woche, dass euer System abstürzt!\n             Arbeitet bei euch eigentlich irgendjemand?"\n\nMitarbeiter:„Also, laut unserem Monitoring war das System durchgehend verfügbar.\n             Da müssen Sie etwas falsch gemacht haben."\n\nKunde:      „Ich mache also etwas falsch, ja? Ich will sofort Ihren Vorgesetzten!"</div>'+
    '<p>(a) Analysiere die erste Kundenaussage mit dem Vier-Ohren-Modell. (b) Erkläre, warum die Antwort des Mitarbeiters eskalierend wirkt. (c) Formuliere eine bessere Antwort. (d) Ordne den Vorgang in Incident/Problem ein und beschreibe die weitere Bearbeitung.</p>',
  hints:[
    'Beim Vier-Ohren-Modell: Sachinhalt, Selbstoffenbarung, Beziehung, Appell — für jede Seite ein Satz.',
    'Achte darauf, auf welchem Ohr der Mitarbeiter geantwortet hat.',
    'Eine gute Antwort erkennt das Gefühl an, ohne Schuld einzugestehen, und führt zur Sache zurück.'
  ],
  solution:
    "(a) VIER-OHREN-ANALYSE DER KUNDENAUSSAGE\n\n"+
    "  Sachinhalt:\n"+
    "     Das System war diese Woche dreimal nicht nutzbar.\n\n"+
    "  Selbstoffenbarung:\n"+
    "     Ich bin veraergert, stehe unter Zeitdruck und fuehle mich\n"+
    "     mit dem Problem alleingelassen.\n\n"+
    "  Beziehung:\n"+
    "     Ich traue euch nicht mehr zu, dass ihr euren Job macht.\n\n"+
    "  Appell:\n"+
    "     Nehmt mich ernst und sorgt dafuer, dass es aufhoert!\n\n"+
    "(b) WARUM DIE ANTWORT ESKALIERT\n\n"+
    "  Der Mitarbeiter reagiert auf dem Beziehungsohr: Er hoert einen\n"+
    "  Angriff und verteidigt sich, statt auf der Sachebene zu bleiben.\n\n"+
    "  Drei konkrete Fehler:\n"+
    "   1. Er stellt die Wahrnehmung des Kunden in Frage, statt sie\n"+
    "      zunaechst anzuerkennen (\"laut unserem Monitoring\").\n"+
    "   2. Er schiebt die Schuld zurueck (\"Da muessen Sie etwas falsch\n"+
    "      gemacht haben\") - eine Du-Botschaft mit Vorwurf.\n"+
    "   3. Er stellt keine einzige Frage und sammelt damit keine\n"+
    "      Information, die zur Loesung fuehren koennte.\n\n"+
    "  Folge: Der Konflikt steigt von der Verhaertung (Stufe 1) in\n"+
    "  die Debatte (Stufe 2) - es geht nur noch ums Rechthaben.\n"+
    "  Der Ruf nach dem Vorgesetzten ist die hierarchische Eskalation\n"+
    "  durch den Kunden.\n\n"+
    "(c) BESSERE ANTWORT\n\n"+
    "  \"Das kann ich gut verstehen, dreimal in einer Woche haelt Sie\n"+
    "   erheblich auf, und das tut mir leid. Damit ich der Sache auf\n"+
    "   den Grund gehen kann: Koennen Sie mir sagen, wann der letzte\n"+
    "   Ausfall ungefaehr war und was auf dem Bildschirm zu sehen war?\n"+
    "   Ich pruefe das dann gegen unsere Protokolle und melde mich\n"+
    "   heute bis 16 Uhr mit einem Zwischenstand bei Ihnen.\"\n\n"+
    "  Warum das wirkt:\n"+
    "   - Gefuehl anerkannt, ohne ein Verschulden einzuraeumen\n"+
    "   - offene Frage fuehrt auf die Sachebene zurueck\n"+
    "   - konkrete, haltbare Zusage mit Zeitpunkt schafft Vertrauen\n\n"+
    "(d) EINORDNUNG UND WEITERE BEARBEITUNG\n\n"+
    "  Die einzelnen Ausfaelle sind INCIDENTS.\n"+
    "  Die dreifache Wiederholung mit unbekannter Ursache begruendet\n"+
    "  ein PROBLEM - hier ist das Problem Management zustaendig.\n\n"+
    "  Vorgehen:\n"+
    "   1. Ticket anlegen bzw. die drei bestehenden Tickets verknuepfen.\n"+
    "   2. Auswirkung und Dringlichkeit bewerten -> Prioritaet.\n"+
    "   3. Daten sammeln: genaue Zeitpunkte, Fehlermeldung, betroffene\n"+
    "      Funktion, weitere betroffene Kunden, Logauswertung.\n"+
    "   4. Funktionale Eskalation an den Second Level zur Analyse.\n"+
    "   5. Zwischenmeldung an den Kunden zum zugesagten Zeitpunkt -\n"+
    "      auch dann, wenn es noch kein Ergebnis gibt.\n"+
    "   6. Nach Ursachenklaerung: dauerhafte Beseitigung, Eintrag in\n"+
    "      die Known Error Database, Abschlussmeldung an den Kunden.\n\n"+
    "  Hinweis: Wenn das Monitoring keine Ausfaelle zeigt, der Kunde\n"+
    "  aber welche erlebt, liegt die Ursache moeglicherweise nicht\n"+
    "  beim Server, sondern auf dem Weg dorthin - Netzwerk, Proxy,\n"+
    "  Client oder Browser. Genau deshalb ist die Sachaufnahme\n"+
    "  wichtiger als die Rechtfertigung.",
  solutionLang:'Gesprächsanalyse',
  solutionNote:'Der letzte Hinweis ist inhaltlich der wertvollste Teil: Ein Monitoring, das keine Ausfälle zeigt, beweist nicht, dass der Kunde keine erlebt hat — es beweist nur, dass der überwachte Teil der Kette lief. Wer das in der Antwort unterbringt, zeigt, dass er die fachliche und die kommunikative Ebene verbindet. Bei Teil (c) gilt: Formuliere eine wörtliche Antwort, keine Beschreibung. Der Operator verlangt eine Formulierung, keine Regel.'
},
{
  id:'ex32', level:3, topic:'Datenschutz', title:'Datenpanne bewerten und Maßnahmen ableiten',
  task:'<p>Folgender Vorfall wird gemeldet:</p>'+
    '<div class="check-prompt">Ein Notebook eines Außendienstmitarbeiters wurde am Freitagabend aus dem Auto gestohlen.\nDarauf befinden sich lokal gespeicherte Kundenlisten mit Namen, Anschriften,\nTelefonnummern, Vertragsdaten und teilweise Gesundheitsangaben (Zusatzversicherungen).\n\nDas Gerät war mit einem Windows-Kennwort geschützt, die Festplatte war\nNICHT verschlüsselt. Der Diebstahl wurde am Montagmorgen um 8:30 Uhr gemeldet.</div>'+
    '<p>(a) Liegt eine meldepflichtige Datenpanne vor? Begründe. (b) Welche Fristen und Pflichten greifen? (c) Nenne vier technische und zwei organisatorische Maßnahmen, die den Vorfall verhindert oder entschärft hätten. (d) Welche Besonderheit ergibt sich aus den Gesundheitsdaten?</p>',
  hints:[
    'Prüfe zuerst: Sind personenbezogene Daten betroffen und besteht ein Risiko für die Betroffenen?',
    'Die 72-Stunden-Frist beginnt mit dem Bekanntwerden, nicht mit dem Vorfall.',
    'Ein Windows-Kennwort schützt die Daten nicht, wenn die Festplatte ausgebaut werden kann.'
  ],
  solution:
    "(a) MELDEPFLICHTIGE DATENPANNE?\n\n"+
    "  Ja, eindeutig. Begruendung:\n"+
    "   - Es sind personenbezogene Daten im Sinne von Art. 4 DSGVO\n"+
    "     betroffen (Namen, Anschriften, Vertrags- und Gesundheitsdaten).\n"+
    "   - Es liegt eine Verletzung des Schutzes personenbezogener Daten\n"+
    "     nach Art. 4 Nr. 12 DSGVO vor: unbefugte Offenlegung bzw.\n"+
    "     unbefugter Zugang ist moeglich geworden.\n"+
    "   - Das Windows-Kennwort bietet keinen wirksamen Schutz: Die\n"+
    "     Festplatte laesst sich ausbauen und an einem anderen Rechner\n"+
    "     im Klartext auslesen. Die Daten gelten daher als kompromittiert.\n\n"+
    "  Hinweis zur Gegenprobe: Waere die Festplatte nach dem Stand der\n"+
    "  Technik verschluesselt gewesen, waere das Risiko fuer die\n"+
    "  Betroffenen voraussichtlich gering - eine Meldung an die\n"+
    "  Aufsichtsbehoerde bliebe zwar zu pruefen, die Benachrichtigung\n"+
    "  der Betroffenen koennte nach Art. 34 Abs. 3 lit. a entfallen.\n\n"+
    "(b) FRISTEN UND PFLICHTEN\n\n"+
    "  1. Meldung an die Aufsichtsbehoerde, Art. 33 DSGVO\n"+
    "     Unverzueglich, moeglichst binnen 72 STUNDEN ab Kenntnisnahme.\n"+
    "     Die Frist beginnt am Montag um 8:30 Uhr - nicht am Freitag -\n"+
    "     und endet damit am Donnerstag um 8:30 Uhr.\n"+
    "     Inhalt: Art der Verletzung, Kategorien und ungefaehre Zahl\n"+
    "     der Betroffenen und Datensaetze, wahrscheinliche Folgen,\n"+
    "     ergriffene Massnahmen, Kontaktdaten des Datenschutzbeauftragten.\n\n"+
    "  2. Benachrichtigung der Betroffenen, Art. 34 DSGVO\n"+
    "     Da ein HOHES Risiko besteht (unverschluesselte Gesundheits-\n"+
    "     daten), sind die Betroffenen unverzueglich und in klarer,\n"+
    "     einfacher Sprache zu informieren.\n\n"+
    "  3. Dokumentation, Art. 33 Abs. 5 DSGVO\n"+
    "     Der Vorfall ist intern zu dokumentieren - unabhaengig davon,\n"+
    "     ob gemeldet wurde. Die Aufsichtsbehoerde kann das pruefen.\n\n"+
    "  4. Weitere Sofortmassnahmen\n"+
    "     Diebstahlanzeige bei der Polizei, Sperrung der Zugaenge und\n"+
    "     Zertifikate des Geraets, Fernloeschung versuchen, Pruefung\n"+
    "     weiterer betroffener Systeme.\n\n"+
    "(c) MASSNAHMEN\n\n"+
    "  Technisch:\n"+
    "   1. Vollstaendige Festplattenverschluesselung (z. B. BitLocker)\n"+
    "      mit Pre-Boot-Authentifizierung - die zentrale Massnahme.\n"+
    "   2. Mobile Device Management mit Fernloeschung und\n"+
    "      Geraeteortung.\n"+
    "   3. Zwei-Faktor-Authentifizierung fuer den Zugang zu\n"+
    "      Kundendaten, damit ein erbeutetes Kennwort nicht genuegt.\n"+
    "   4. Zentrale Datenhaltung mit VPN-Zugriff statt lokaler\n"+
    "      Kopien; automatische Bildschirmsperre.\n\n"+
    "  Organisatorisch:\n"+
    "   1. Richtlinie zur Mitnahme und Aufbewahrung mobiler Geraete:\n"+
    "      keine Lagerung im Fahrzeug, Mitnahmepflicht.\n"+
    "   2. Berechtigungskonzept nach Need-to-know plus regelmaessige\n"+
    "      Schulung, ergaenzt um einen definierten und geuebten\n"+
    "      Meldeweg fuer Vorfaelle - der Vorfall wurde erst nach\n"+
    "      zweieinhalb Tagen gemeldet, das ist zu spaet.\n\n"+
    "(d) BESONDERHEIT DER GESUNDHEITSDATEN\n\n"+
    "  Gesundheitsdaten gehoeren zu den besonderen Kategorien\n"+
    "  personenbezogener Daten nach Art. 9 DSGVO. Daraus folgt:\n"+
    "   - Die Verarbeitung ist grundsaetzlich untersagt und nur unter\n"+
    "     den engen Ausnahmen des Art. 9 Abs. 2 zulaessig.\n"+
    "   - Das Risiko fuer die Betroffenen ist deutlich hoeher, damit\n"+
    "     ist die Benachrichtigung nach Art. 34 praktisch zwingend.\n"+
    "   - Es sind erhoehte Schutzmassnahmen nach Art. 32 gefordert;\n"+
    "     die fehlende Verschluesselung waere hier besonders schwer\n"+
    "     zu rechtfertigen und erhoeht das zu erwartende Bussgeld.\n"+
    "   - Eine Datenschutz-Folgenabschaetzung nach Art. 35 war fuer\n"+
    "     diese Verarbeitung vermutlich ohnehin erforderlich.",
  solutionLang:'Datenschutzfall',
  solutionNote:'Zwei Details entscheiden diese Aufgabe. Erstens der Fristbeginn: Die 72 Stunden laufen ab Kenntnisnahme am Montagmorgen, nicht ab dem Diebstahl am Freitag — das wird regelmäßig falsch beantwortet. Zweitens die Wirkung der Verschlüsselung: Sie ist der einzige Grund, aus dem die Benachrichtigung der Betroffenen hätte entfallen können. Diese Gegenprobe zu erwähnen, zeigt, dass du den Zusammenhang zwischen technischer Maßnahme und rechtlicher Folge verstanden hast.'
}
,
{
  id:'ex33', level:1, topic:'KI', title:'Lernarten und Einsatzszenarien zuordnen',
  task:'<p>Ordne jedem Vorhaben die passende <strong>Lernart</strong> zu (überwacht, unüberwacht, bestärkend), gib bei überwachtem Lernen zusätzlich an, ob es sich um <strong>Klassifikation oder Regression</strong> handelt, und begründe jeweils in einem Satz:</p>'+
    '<div class="check-prompt">1) Aus 120.000 geprüften Eingangsrechnungen soll erkannt werden, ob eine neue Rechnung Sachkonto 4200 oder 4400 zugeordnet wird.\n2) Aus Sensordaten einer Maschine soll die verbleibende Restlaufzeit bis zum Ausfall in Stunden geschätzt werden.\n3) Kundendaten eines Onlineshops sollen in Gruppen mit ähnlichem Kaufverhalten aufgeteilt werden – welche Gruppen es gibt, ist unbekannt.\n4) Ein Kommissionierroboter soll den effizientesten Weg durch das Lager selbst finden; kurze Wege werden positiv bewertet, Kollisionen negativ.\n5) Im Netzwerkverkehr sollen ungewöhnliche Muster auffallen, ohne dass bekannt ist, wie ein Angriff aussieht.</div>',
  hints:[
    'Die Leitfrage lautet: Steht die richtige Antwort in den Trainingsdaten?',
    'Klassifikation liefert eine Kategorie, Regression einen Zahlenwert.',
    'Signalwörter für bestärkendes Lernen sind Belohnung, Bewertung und Versuch und Irrtum.'
  ],
  solution:
    "1) UEBERWACHT - Klassifikation\n"+
    "   Die 120.000 Rechnungen sind bereits geprueft, das richtige\n"+
    "   Sachkonto liegt also als Label vor. Ausgabe ist eine Kategorie\n"+
    "   aus einer festen Menge - daher Klassifikation.\n\n"+
    "2) UEBERWACHT - Regression\n"+
    "   Aus historischen Verlaeufen ist bekannt, wann der Ausfall\n"+
    "   tatsaechlich eintrat. Die Ausgabe ist ein Zahlenwert in Stunden,\n"+
    "   also Regression. Anwendungsfall: Predictive Maintenance.\n\n"+
    "3) UNUEBERWACHT - Clustering\n"+
    "   Es gibt keine Vorgabe, welche Gruppen existieren. Das Modell\n"+
    "   findet die Struktur selbst. Anwendungsfall: Kundensegmentierung.\n\n"+
    "4) BESTAERKEND\n"+
    "   Es gibt keine markierten Trainingsdaten, sondern Belohnung und\n"+
    "   Bestrafung. Das System lernt eine Handlungsstrategie durch\n"+
    "   Ausprobieren.\n\n"+
    "5) UNUEBERWACHT - Anomalieerkennung\n"+
    "   Das Normalverhalten wird gelernt, Abweichungen davon fallen auf.\n"+
    "   Es ist ausdruecklich NICHT bekannt, wie ein Angriff aussieht -\n"+
    "   daher gibt es keine Label und kein ueberwachtes Lernen.",
  solutionLang:'KI-Zuordnung',
  solutionNote:'Die Fälle 1 und 2 zeigen den Unterschied zwischen Klassifikation und Regression an derselben Lernart — beide sind überwacht, nur die Ausgabe unterscheidet sich. Fall 5 ist die typische Falle: Betrugs- und Angriffserkennung klingt nach einer Ja-Nein-Entscheidung und damit nach Klassifikation, ist hier aber unüberwacht, weil die Aufgabe ausdrücklich sagt, dass die Angriffsmuster unbekannt sind. Lies bei KI-Zuordnungen immer genau, ob Beispiele mit bekannter Antwort vorliegen.'
},
{
  id:'ex34', level:2, topic:'KI', title:'Modellgüte beurteilen und Maßnahmen ableiten',
  task:'<p>Ein Modell soll fehlerhafte Bauteile auf Kamerabildern erkennen. Nach dem Training liegen folgende Ergebnisse vor:</p>'+
    '<div class="check-prompt">Trainingsdaten:  Genauigkeit 99,4 %\nTestdaten:       Genauigkeit 73,1 %\n\nDatensatz: 8.000 Bilder, davon 240 mit Fehler (3 %)\nDas Modell erkennt von 60 fehlerhaften Teilen im Testset nur 14.</div>'+
    '<p>(a) Welches Problem liegt vor? Begründe anhand der Zahlen. (b) Warum ist die Genauigkeit hier eine irreführende Kennzahl? Belege das mit einer Rechnung. (c) Nenne vier konkrete Gegenmaßnahmen. (d) Welche Folge hätte der Produktiveinsatz in diesem Zustand?</p>',
  hints:[
    'Vergleiche zuerst Trainings- und Testgenauigkeit miteinander.',
    'Rechne aus, welche Genauigkeit ein Modell erreicht, das immer „kein Fehler" sagt.',
    'Bei (c): Denke an Datenmenge, Datenausgewogenheit, Modellkomplexität und Trainingsdauer.'
  ],
  solution:
    "(a) PROBLEM: OVERFITTING\n"+
    "    Training 99,4 % gegen Test 73,1 % - eine Luecke von 26,3\n"+
    "    Prozentpunkten. Das Modell hat die Trainingsbilder samt ihrer\n"+
    "    Zufaelligkeiten auswendig gelernt und kann nicht auf neue\n"+
    "    Bilder verallgemeinern.\n\n"+
    "    Zusaetzlich liegt ein UNAUSGEWOGENER DATENSATZ vor:\n"+
    "    nur 3 % der Bilder zeigen einen Fehler.\n\n"+
    "(b) WARUM DIE GENAUIGKEIT IRREFUEHREND IST\n"+
    "    Ein Modell, das AUSNAHMSLOS \"kein Fehler\" ausgibt,\n"+
    "    erreicht bereits:\n"+
    "       7.760 richtige von 8.000 = 97,0 % Genauigkeit\n"+
    "    ...und findet dabei kein einziges fehlerhaftes Teil.\n\n"+
    "    Die tatsaechlich relevante Kennzahl ist die Trefferquote\n"+
    "    (Sensitivitaet / Recall) auf der Fehlerklasse:\n"+
    "       14 von 60 erkannt = 23,3 %\n"+
    "    Mehr als drei Viertel der fehlerhaften Teile werden\n"+
    "    uebersehen. Das Modell ist fuer seinen Zweck unbrauchbar.\n\n"+
    "(c) GEGENMASSNAHMEN\n"+
    "    1. Mehr Bilder fehlerhafter Teile beschaffen; falls nicht\n"+
    "       moeglich, den Datensatz durch Augmentierung erweitern\n"+
    "       (Drehen, Spiegeln, Helligkeit variieren).\n"+
    "    2. Datensatz ausbalancieren, etwa durch Ueber- oder\n"+
    "       Untergewichtung der Klassen beim Training.\n"+
    "    3. Einfacheres Modell waehlen oder das Training frueher\n"+
    "       beenden (Early Stopping), um Overfitting zu verringern.\n"+
    "    4. Kreuzvalidierung einsetzen und die Bewertung auf Recall\n"+
    "       und Precision umstellen statt auf blosse Genauigkeit.\n\n"+
    "(d) FOLGE EINES PRODUKTIVEINSATZES\n"+
    "    Rund 77 % der fehlerhaften Teile gelangen in die Auslieferung.\n"+
    "    Die Qualitaetssicherung waere schlechter als vorher, weil man\n"+
    "    sich auf ein System verlaesst, das die eigentliche Aufgabe\n"+
    "    nicht erfuellt. Konsequenz: kein Produktiveinsatz, stattdessen\n"+
    "    Nachbesserung und erneute Bewertung; bis dahin bleibt die\n"+
    "    bisherige Pruefung bestehen.",
  solutionLang:'Modellbewertung',
  solutionNote:'Die Rechnung in Teil (b) ist das Herzstück dieser Aufgabe: 97 Prozent Genauigkeit bei völliger Nutzlosigkeit. Sie zeigt, warum bei seltenen Ereignissen — Fehler, Betrug, Krankheit — die Accuracy nichts aussagt und Recall die richtige Kennzahl ist. Teil (d) prüft, ob du eine fachliche Empfehlung aussprechen kannst: Die korrekte Antwort ist, den Produktiveinsatz abzulehnen. Eine KI, die schlechter ist als der bisherige Prozess, darf nicht eingeführt werden, egal wie modern sie wirkt.'
},
{
  id:'ex35', level:3, topic:'KI', title:'KI-Einführung rechtlich und wirtschaftlich bewerten',
  task:'<p>Ein Personaldienstleister mit 90 Mitarbeitern plant:</p>'+
    '<div class="check-prompt">• Ein KI-System soll eingehende Bewerbungen vorsortieren und eine Rangfolge erstellen.\n  Trainingsgrundlage sind 12 Jahre eigene Einstellungsentscheidungen.\n• Ein Chatbot auf der Website beantwortet Fragen von Bewerbern.\n• Ein KI-Assistent fasst intern Bewerbungsunterlagen zusammen; genutzt wird ein\n  frei verfügbarer Onlinedienst mit Servern in den USA.\n\nKosten: Lizenz 1.450 €/Monat, Einführung 22.000 €.\nErwartete Einsparung: 18 Std./Woche im Recruiting zu 48 €/Std. Vollkosten (46 Wochen/Jahr).</div>'+
    '<p>(a) Ordne alle drei Anwendungen den Risikoklassen des AI Act zu und nenne je eine sich daraus ergebende Pflicht. (b) Welches DSGVO-Problem besteht bei Anwendung 1 und bei Anwendung 3? (c) Welches inhaltliche Risiko birgt die Trainingsgrundlage? (d) Rechne die Amortisation. (e) Sprich eine Gesamtempfehlung aus.</p>',
  hints:[
    'Bei (a): Frage dich, worüber das System entscheidet und welche Folge das für den Menschen hat.',
    'Bei (b): Art. 22 DSGVO für die Entscheidung, Art. 28 und Drittlandtransfer für den externen Dienst.',
    'Bei (c): Was lernt ein Modell aus historischen Personalentscheidungen?'
  ],
  solution:
    "(a) RISIKOKLASSEN NACH AI ACT\n\n"+
    "  1) Bewerbungsvorsortierung -> HOCHRISIKO\n"+
    "     Der Zugang zu Beschaeftigung ist im AI Act ausdruecklich als\n"+
    "     Hochrisikobereich genannt.\n"+
    "     Pflicht (eine genuegt, hier mehrere):\n"+
    "      - wirksame menschliche Aufsicht ueber das Ergebnis\n"+
    "      - Risikomanagement und technische Dokumentation\n"+
    "      - Pruefung der Datenqualitaet auf Verzerrung\n"+
    "      - Protokollierung der Systemaktivitaeten\n\n"+
    "  2) Chatbot fuer Bewerberfragen -> BEGRENZTES RISIKO\n"+
    "     Pflicht: Transparenz. Der Nutzer muss erkennen koennen,\n"+
    "     dass er mit einem KI-System und nicht mit einem Menschen\n"+
    "     kommuniziert.\n\n"+
    "  3) Interner Zusammenfassungs-Assistent -> in der Anwendung\n"+
    "     selbst zunaechst MINIMALES bis BEGRENZTES RISIKO.\n"+
    "     ABER: Er verarbeitet Bewerbungsunterlagen und wirkt damit\n"+
    "     faktisch am Hochrisikoprozess mit. Entscheidend ist hier\n"+
    "     ohnehin das Datenschutzrecht (siehe b).\n"+
    "     Uebergreifend gilt zudem die AI-Literacy-Pflicht: Die\n"+
    "     Beschaeftigten muessen im Umgang mit KI geschult sein.\n\n"+
    "(b) DATENSCHUTZPROBLEME\n\n"+
    "  Anwendung 1 - Art. 22 DSGVO\n"+
    "     Eine ausschliesslich automatisierte Entscheidung mit\n"+
    "     erheblicher Beeintraechtigung ist grundsaetzlich unzulaessig.\n"+
    "     Eine automatisch erzeugte Rangfolge, der ohne eigene Pruefung\n"+
    "     gefolgt wird, faellt darunter.\n"+
    "     Erforderlich: echte inhaltliche Pruefung durch eine Person,\n"+
    "     Information der Bewerber ueber die automatisierte\n"+
    "     Verarbeitung, Recht auf Darlegung des eigenen Standpunkts.\n"+
    "     Zusaetzlich: Datenschutz-Folgenabschaetzung nach Art. 35.\n"+
    "     Und: Mitbestimmung des Betriebsrats nach § 87 BetrVG.\n\n"+
    "  Anwendung 3 - unzulaessige Uebermittlung\n"+
    "     Bewerbungsunterlagen sind besonders sensible personenbezogene\n"+
    "     Daten. Ihre Eingabe in einen frei verfuegbaren Onlinedienst\n"+
    "     bedeutet:\n"+
    "      - Uebermittlung an einen Dritten ohne Rechtsgrundlage\n"+
    "      - kein Auftragsverarbeitungsvertrag nach Art. 28\n"+
    "      - Drittlandtransfer in die USA ohne geeignete Garantien\n"+
    "      - moegliche Verwendung der Eingaben zum Training\n"+
    "     -> in dieser Form unzulaessig. Erforderlich waere ein\n"+
    "        freigegebener Dienst mit AVV, EU-Serverstandort und\n"+
    "        vertraglichem Trainingsausschluss.\n\n"+
    "(c) RISIKO DER TRAININGSGRUNDLAGE\n\n"+
    "  BIAS durch historische Daten.\n"+
    "  Das Modell lernt aus 12 Jahren vergangener Entscheidungen -\n"+
    "  einschliesslich aller darin enthaltenen bewussten oder\n"+
    "  unbewussten Benachteiligungen nach Geschlecht, Alter, Herkunft\n"+
    "  oder Lebenslauf-Luecken. Es reproduziert diese Muster und\n"+
    "  verstaerkt sie, weil es sie als Erfolgsmerkmal interpretiert.\n"+
    "  Rechtsfolge: moeglicher Verstoss gegen das AGG.\n"+
    "  Gegenmassnahmen: sensible Merkmale ausschliessen, Ergebnisse\n"+
    "  nach Gruppen getrennt auswerten, Datensatz auf Ausgewogenheit\n"+
    "  pruefen, regelmaessige Fairness-Kontrolle.\n\n"+
    "(d) AMORTISATION\n\n"+
    "  Einsparung: 18 h x 48 EUR x 46 Wochen = 39.744 EUR pro Jahr\n"+
    "  Lizenz:     1.450 x 12               = 17.400 EUR pro Jahr\n"+
    "  Netto-Einsparung pro Jahr            = 22.344 EUR\n\n"+
    "  Amortisation der Einfuehrung:\n"+
    "     22.000 / 22.344 = 0,98 Jahre = rund 12 Monate\n\n"+
    "  Hinweis: Die Einsparung wird nur wirksam, wenn die frei\n"+
    "  werdende Zeit anders genutzt wird. Zudem entfaellt ein Teil\n"+
    "  der Ersparnis, weil die nach Art. 22 DSGVO erforderliche\n"+
    "  menschliche Pruefung Arbeitszeit bindet.\n\n"+
    "(e) GESAMTEMPFEHLUNG\n\n"+
    "  Der Chatbot kann mit Kennzeichnungspflicht umgesetzt werden.\n\n"+
    "  Die Bewerbungsvorsortierung ist nur zulaessig als\n"+
    "  Entscheidungs-VORBEREITUNG mit verbindlicher menschlicher\n"+
    "  Pruefung, Dokumentation, Bias-Kontrolle, Information der\n"+
    "  Bewerber, DSFA und Beteiligung des Betriebsrats.\n\n"+
    "  Der externe Zusammenfassungsdienst ist in der geplanten Form\n"+
    "  zu untersagen und durch eine datenschutzkonforme Loesung zu\n"+
    "  ersetzen.\n\n"+
    "  Wirtschaftlich ist das Vorhaben mit rund 12 Monaten\n"+
    "  Amortisation tragfaehig. Die Umsetzung sollte jedoch erst nach\n"+
    "  Klaerung der rechtlichen Punkte beginnen, da ein Verstoss\n"+
    "  Bussgelder bis 20 Mio. EUR oder 4 % des Jahresumsatzes sowie\n"+
    "  AGG-Schadenersatzansprueche nach sich ziehen kann.",
  solutionLang:'KI-Gesamtbewertung',
  solutionNote:'Diese Aufgabe verbindet die drei Ebenen, auf denen KI in der AP1 geprüft wird: Einordnung nach AI Act, Zulässigkeit nach DSGVO und Wirtschaftlichkeit. Der Kernsatz für Teil (a) und (e) lautet: Hochrisiko bedeutet nicht verboten, sondern auflagenpflichtig — vor allem mit wirksamer menschlicher Aufsicht. Und beachte den Hinweis bei (d): Wenn eine gesetzliche Pflicht Arbeitszeit bindet, schmälert das die berechnete Einsparung. Diese Rückkopplung zwischen Recht und Rechnung zu sehen, ist genau das, was eine Expertenaufgabe verlangt.'
}
,
{
  id:'ex36', level:1, topic:'Pseudocode', title:'Größten und kleinsten Wert finden',
  task:'<p>Schreibe einen <strong>Pseudocode-Algorithmus</strong>, der aus einem Array <code>temperaturen</code> den höchsten und den niedrigsten Wert ermittelt und beide zurückgibt. Das Array enthält mindestens einen Wert und kann auch negative Zahlen enthalten.</p>',
  hints:[
    'Setze beide Merker auf das erste Element, nicht auf 0 — sonst scheitert der Algorithmus bei lauter negativen Werten.',
    'Die Schleife kann bei Index 1 starten, weil Index 0 schon als Startwert dient.',
    'Zwei getrennte Vergleiche im Schleifenrumpf, kein SONST dazwischen.'
  ],
  solution:
    "FUNKTION minUndMax(temperaturen)\n"+
    "  maximum <- temperaturen[0]\n"+
    "  minimum <- temperaturen[0]\n"+
    "\n"+
    "  FUER i VON 1 BIS LAENGE(temperaturen) - 1 TUE\n"+
    "    WENN temperaturen[i] > maximum DANN\n"+
    "      maximum <- temperaturen[i]\n"+
    "    ENDEWENN\n"+
    "    WENN temperaturen[i] < minimum DANN\n"+
    "      minimum <- temperaturen[i]\n"+
    "    ENDEWENN\n"+
    "  ENDEFUER\n"+
    "\n"+
    "  GIB minimum, maximum ZURUECK\n"+
    "ENDEFUNKTION\n\n"+
    "PROBE mit [-4, -12, -7, -2, -9]\n"+
    "  Start: maximum = -4, minimum = -4\n"+
    "  i=1: -12 > -4 nein | -12 < -4 ja  -> minimum = -12\n"+
    "  i=2:  -7 > -4 nein |  -7 < -12 nein\n"+
    "  i=3:  -2 > -4 ja   -> maximum = -2\n"+
    "  i=4:  -9 > -2 nein |  -9 < -12 nein\n"+
    "  Ergebnis: minimum = -12, maximum = -2   korrekt",
  solutionLang:'Pseudocode',
  solutionNote:'Der Prüfungspunkt steckt im Startwert. Wer maximum auf 0 setzt, bekommt bei ausschließlich negativen Temperaturen 0 als Maximum heraus — ein Wert, der im Array gar nicht vorkommt. Das erste Element als Startwert zu nehmen ist die einzige Variante, die immer funktioniert. Beachte außerdem, dass zwischen den beiden Abfragen kein SONST stehen darf: Beim allerersten Vergleich könnten sonst beide Fälle blockieren.'
},
{
  id:'ex37', level:1, topic:'Subnetting', title:'Fünf Adressen zuordnen',
  task:'<p>Gegeben ist das Netz <strong>192.168.14.0 / 255.255.255.224</strong>.</p>'+
    '<p>Entscheide für jede Adresse, ob sie ein <strong>gültiger Host</strong>, die <strong>Netzadresse</strong>, die <strong>Broadcast-Adresse</strong> oder <strong>außerhalb dieses Subnetzes</strong> ist. Begründe kurz.</p>'+
    '<div class="check-prompt">a) 192.168.14.1\nb) 192.168.14.31\nc) 192.168.14.0\nd) 192.168.14.30\ne) 192.168.14.44</div>',
  hints:[
    'Bestimme zuerst die Blockgröße: 256 minus den Maskenwert des letzten Oktetts.',
    'Die Netze beginnen bei Vielfachen der Blockgröße.',
    'Der Broadcast ist immer die Adresse direkt vor dem nächsten Netzanfang.'
  ],
  solution:
    "GRUNDLAGE\n"+
    "  Maske 255.255.255.224  ->  /27\n"+
    "  Blockgroesse = 256 - 224 = 32\n"+
    "  Netze beginnen bei: .0  .32  .64  .96  .128 ...\n\n"+
    "  Das Subnetz 192.168.14.0/27 umfasst .0 bis .31\n"+
    "    Netzadresse  .0\n"+
    "    Hosts        .1 bis .30   (30 Stueck)\n"+
    "    Broadcast    .31\n\n"+
    "ZUORDNUNG\n"+
    "  a) 192.168.14.1   -> GUELTIGER HOST, erste nutzbare Adresse\n"+
    "  b) 192.168.14.31  -> BROADCAST, alle Hostbits auf 1\n"+
    "  c) 192.168.14.0   -> NETZADRESSE, alle Hostbits auf 0\n"+
    "  d) 192.168.14.30  -> GUELTIGER HOST, letzte nutzbare Adresse\n"+
    "  e) 192.168.14.44  -> AUSSERHALB, liegt im naechsten Subnetz\n"+
    "                       192.168.14.32/27 (Bereich .32 bis .63)",
  solutionLang:'Subnetting',
  solutionNote:'Fall e) ist die eigentliche Prüfungsfrage. Zwei Adressen können im selben dritten Oktett liegen und trotzdem in verschiedenen Subnetzen sein — das entscheidet allein die Blockgröße. Praktische Folge: Ein Gerät mit .44 erreicht ein Gerät mit .1 nur über einen Router, obwohl die Adressen fast gleich aussehen. Genau danach fragen Störungsszenarien gern.'
},
{
  id:'ex38', level:1, topic:'OSI-Modell', title:'Störungen der richtigen Schicht zuordnen',
  task:'<p>Ordne jede Störungsmeldung der <strong>OSI-Schicht</strong> zu, auf der die Ursache liegt, nenne die Schicht mit Nummer und Namen und gib jeweils <strong>einen Diagnosebefehl oder Prüfschritt</strong> an:</p>'+
    '<div class="check-prompt">1) „Die Link-LED an der Netzwerkbuchse leuchtet nicht."\n2) „Der Rechner hat die Adresse 169.254.88.12 und kommt nirgendwo hin."\n3) „ping 8.8.8.8 funktioniert, aber www.ihk.de wird nicht gefunden."\n4) „Die Anwendung erreicht den Server nicht, ping auf den Server klappt aber."\n5) „Der PC bekommt keine Verbindung, obwohl das Kabel steckt — im Switch ist der Port einem anderen VLAN zugeordnet."</div>',
  hints:[
    'Arbeite von unten nach oben: Kabel, dann Adressierung im LAN, dann IP, dann Ports, dann Namen.',
    'Eine 169.254er-Adresse hat eine ganz bestimmte Ursache.',
    'Wenn die IP erreichbar ist, der Name aber nicht, liegt es an der Namensauflösung.'
  ],
  solution:
    "1) SCHICHT 1 - Bituebertragung\n"+
    "   Keine physikalische Verbindung. Ursachen: Kabel defekt oder\n"+
    "   nicht gesteckt, falscher Port, Switch aus, Netzwerkkarte deaktiviert.\n"+
    "   Pruefschritt: Kabel und Port pruefen, anderes Kabel testen,\n"+
    "   Link-LED am Switch kontrollieren.\n\n"+
    "2) SCHICHT 3 - Vermittlung (Ursache auf Schicht 7: DHCP)\n"+
    "   169.254.x.x ist APIPA - der Client hat keinen DHCP-Server\n"+
    "   erreicht und sich selbst eine Adresse gegeben. Es fehlt ein\n"+
    "   Gateway, daher kein Zugriff nach aussen.\n"+
    "   Befehl: ipconfig /release  dann  ipconfig /renew\n"+
    "   Zusaetzlich pruefen: laeuft der DHCP-Server, ist der Pool leer,\n"+
    "   fehlt ein DHCP-Relay im anderen Subnetz?\n\n"+
    "3) SCHICHT 7 - Anwendung (DNS)\n"+
    "   Das Routing funktioniert, nur die Namensaufloesung nicht.\n"+
    "   Befehl: nslookup www.ihk.de\n"+
    "   Pruefen: ist ein DNS-Server eingetragen, ist er erreichbar?\n\n"+
    "4) SCHICHT 4 - Transport\n"+
    "   Der Host ist erreichbar (ICMP kommt durch), aber der Port des\n"+
    "   Dienstes nicht. Ursachen: Dienst laeuft nicht, Firewall blockiert\n"+
    "   den Port, falscher Port konfiguriert.\n"+
    "   Befehl: netstat -an auf dem Server, oder telnet <host> <port>\n\n"+
    "5) SCHICHT 2 - Sicherung\n"+
    "   Physikalisch alles in Ordnung, aber die Zuordnung zum VLAN ist\n"+
    "   falsch - das ist eine Frage der Sicherungsschicht.\n"+
    "   Pruefschritt: Port-Konfiguration am Switch kontrollieren,\n"+
    "   VLAN-Zuordnung korrigieren.",
  solutionLang:'Fehlersuche',
  solutionNote:'Fall 2 ist knifflig, weil zwei Antworten vertretbar sind: Das Symptom zeigt sich auf Schicht 3, die Ursache liegt bei DHCP auf Schicht 7. Nenne in solchen Fällen beides und erkläre den Zusammenhang — das ist mehr wert als eine einzelne Zahl. Und merke dir das Grundmuster: Immer von unten nach oben prüfen, denn ein Fehler auf Schicht 1 macht jede Analyse weiter oben sinnlos.'
},
{
  id:'ex39', level:1, topic:'SQL', title:'Vier Abfragen schreiben',
  task:'<p>Gegeben ist die Tabelle:</p>'+
    '<div class="check-prompt">artikel(artikelnr, bezeichnung, kategorie, preis, bestand, lieferantnr)</div>'+
    '<p>Schreibe je eine SQL-Abfrage für:</p>'+
    '<div class="check-prompt">a) Alle Artikel der Kategorie „Netzwerk", sortiert nach Preis absteigend.\nb) Bezeichnung und Preis aller Artikel, deren Bestand unter 10 liegt.\nc) Die Anzahl der Artikel je Kategorie.\nd) Den durchschnittlichen Preis je Kategorie, aber nur für Kategorien mit mehr als 5 Artikeln.</div>',
  hints:[
    'Bei c) und d) brauchst du GROUP BY.',
    'Der Filter auf die Anzahl in d) bezieht sich auf ein Aggregat — das gehört nicht in WHERE.',
    'ORDER BY steht immer am Ende der Abfrage.'
  ],
  solution:
    "a) SELECT   *\n"+
    "   FROM     artikel\n"+
    "   WHERE    kategorie = 'Netzwerk'\n"+
    "   ORDER BY preis DESC;\n\n"+
    "b) SELECT bezeichnung, preis\n"+
    "   FROM   artikel\n"+
    "   WHERE  bestand < 10;\n\n"+
    "c) SELECT   kategorie, COUNT(*) AS anzahl\n"+
    "   FROM     artikel\n"+
    "   GROUP BY kategorie;\n\n"+
    "d) SELECT   kategorie, AVG(preis) AS durchschnittspreis\n"+
    "   FROM     artikel\n"+
    "   GROUP BY kategorie\n"+
    "   HAVING   COUNT(*) > 5;\n\n"+
    "MERKE\n"+
    "  WHERE  filtert EINZELZEILEN  - vor der Gruppierung\n"+
    "  HAVING filtert GRUPPEN       - nach der Gruppierung\n\n"+
    "  Falsch waere:\n"+
    "     WHERE COUNT(*) > 5     -> Syntaxfehler\n"+
    "  Richtig kombiniert (nur Artikel unter 100 EUR beruecksichtigen,\n"+
    "  dann Kategorien mit mehr als 5 solcher Artikel):\n"+
    "     WHERE preis < 100 GROUP BY kategorie HAVING COUNT(*) > 5",
  solutionLang:'SQL',
  solutionNote:'Aufgabe d) trennt die Spreu vom Weizen. Der Filter bezieht sich auf COUNT, also auf ein Aggregat, und muss deshalb in HAVING. Präge dir die Merkregel ein: WHERE sieht einzelne Zeilen, HAVING sieht fertige Gruppen. Der Zusatz am Ende zeigt, dass beide Klauseln in derselben Abfrage vorkommen dürfen — das wird gern als Folgefrage gestellt.'
},
{
  id:'ex40', level:1, topic:'IT-Sicherheit', title:'Maßnahmen und Schutzziele zuordnen',
  task:'<p>Ordne jede Maßnahme dem <strong>vorrangig geschützten Schutzziel</strong> zu (Vertraulichkeit, Integrität oder Verfügbarkeit) und gib an, ob sie <strong>technisch oder organisatorisch</strong> ist:</p>'+
    '<div class="check-prompt">1) Tägliche Datensicherung mit einer Kopie im Bankschließfach\n2) Festplattenverschlüsselung aller Notebooks\n3) Prüfsumme (SHA-256) beim Download von Software\n4) Passwortrichtlinie mit Mindestlänge und Wechselintervall\n5) Unterbrechungsfreie Stromversorgung im Serverraum\n6) Vier-Augen-Prinzip bei Überweisungen über 10.000 €\n7) Digitale Signatur unter einem Angebot\n8) Schulung der Mitarbeiter zum Erkennen von Phishing</div>',
  hints:[
    'Frage bei jeder Maßnahme: Wovor genau schützt sie — vor Mitlesen, vor unbemerkter Änderung oder vor Ausfall?',
    'Technisch heißt installiert oder konfiguriert, organisatorisch heißt geregelt oder geschult.',
    'Eine Maßnahme kann mehreren Zielen dienen — nenne dann das vorrangige und erwähne das zweite.'
  ],
  solution:
    "1) Datensicherung mit Auslagerung\n"+
    "   Schutzziel : VERFUEGBARKEIT (Wiederherstellung nach Verlust)\n"+
    "   Art        : technisch (die Sicherung selbst),\n"+
    "                organisatorisch die Auslagerungsregelung\n"+
    "   Hinweis    : erfuellt die 3-2-1-Regel und schuetzt gegen\n"+
    "                Ransomware, weil die Kopie offline liegt.\n\n"+
    "2) Festplattenverschluesselung\n"+
    "   Schutzziel : VERTRAULICHKEIT\n"+
    "   Art        : technisch\n\n"+
    "3) Pruefsumme beim Download\n"+
    "   Schutzziel : INTEGRITAET (Datei unveraendert?)\n"+
    "   Art        : technisch\n\n"+
    "4) Passwortrichtlinie\n"+
    "   Schutzziel : VERTRAULICHKEIT\n"+
    "   Art        : ORGANISATORISCH (eine Regelung)\n"+
    "                Erzwingt man sie per Gruppenrichtlinie, wird die\n"+
    "                Umsetzung technisch - die Richtlinie selbst bleibt\n"+
    "                organisatorisch.\n\n"+
    "5) USV im Serverraum\n"+
    "   Schutzziel : VERFUEGBARKEIT\n"+
    "   Art        : technisch\n"+
    "   Zusatz     : schuetzt zugleich die Integritaet, weil ein\n"+
    "                abruptes Abschalten Daten beschaedigen kann.\n\n"+
    "6) Vier-Augen-Prinzip\n"+
    "   Schutzziel : INTEGRITAET (keine unbemerkte Manipulation)\n"+
    "   Art        : ORGANISATORISCH\n\n"+
    "7) Digitale Signatur\n"+
    "   Schutzziel : INTEGRITAET und AUTHENTIZITAET,\n"+
    "                zusaetzlich Verbindlichkeit\n"+
    "   Art        : technisch\n\n"+
    "8) Phishing-Schulung\n"+
    "   Schutzziel : vorrangig VERTRAULICHKEIT,\n"+
    "                mittelbar alle drei\n"+
    "   Art        : ORGANISATORISCH",
  solutionLang:'Zuordnung',
  solutionNote:'Nummer 4 ist die klassische Stolperstelle: Eine Passwortrichtlinie ist eine Regelung und damit organisatorisch, auch wenn sie technisch durchgesetzt wird. Formuliere in der Prüfung so, dass die Zuordnung aus der Maßnahme selbst hervorgeht. Und bei Nummer 7 lohnt es sich, alle drei Ziele zu nennen — die Signatur ist das Paradebeispiel für eine Maßnahme, die Integrität, Authentizität und Verbindlichkeit gleichzeitig herstellt.'
},
{
  id:'ex41', level:1, topic:'UML', title:'Use-Case-Diagramm aus einem Text entwickeln',
  task:'<p>Eine Bibliothek beschreibt ihr geplantes System:</p>'+
    '<div class="check-prompt">„Leser können im Katalog suchen und Medien ausleihen. Beim Ausleihen wird immer geprüft, ob noch offene Gebühren bestehen. Optional kann ein Leser ein bereits verliehenes Medium vormerken. Bibliothekare können Medien einpflegen, Ausleihen zurücknehmen und Mahnungen erstellen. Ein Bibliothekar kann außerdem alles, was ein Leser kann. Das Mahnwesen versendet automatisch E-Mails über einen externen Mailserver."</div>'+
    '<p>Entwirf das Use-Case-Diagramm in Textform: Akteure, Anwendungsfälle, Systemgrenze und alle Beziehungen mit der richtigen Pfeilart.</p>',
  hints:[
    'Auch ein Fremdsystem kann Akteur sein — achte auf den letzten Satz.',
    '„immer" deutet auf include, „optional" auf extend.',
    '„kann außerdem alles, was ein Leser kann" ist eine Generalisierung zwischen Akteuren.'
  ],
  solution:
    "AKTEURE (alle AUSSERHALB der Systemgrenze)\n"+
    "  Leser\n"+
    "  Bibliothekar        -- Generalisierung --> Leser\n"+
    "  Mailserver          (Fremdsystem als Akteur)\n\n"+
    "SYSTEMGRENZE: Bibliothekssystem\n\n"+
    "ANWENDUNGSFAELLE\n"+
    "  ( Katalog durchsuchen )\n"+
    "  ( Medium ausleihen )\n"+
    "  ( Gebuehren pruefen )\n"+
    "  ( Medium vormerken )\n"+
    "  ( Medium einpflegen )\n"+
    "  ( Ausleihe zuruecknehmen )\n"+
    "  ( Mahnung erstellen )\n\n"+
    "VERBINDUNGEN\n"+
    "  Leser        ---- ( Katalog durchsuchen )\n"+
    "  Leser        ---- ( Medium ausleihen )\n"+
    "  Bibliothekar ---- ( Medium einpflegen )\n"+
    "  Bibliothekar ---- ( Ausleihe zuruecknehmen )\n"+
    "  Bibliothekar ---- ( Mahnung erstellen )\n"+
    "  ( Mahnung erstellen ) ---- Mailserver\n\n"+
    "BEZIEHUNGEN ZWISCHEN ANWENDUNGSFAELLEN\n"+
    "  ( Medium ausleihen ) --<<include>>--> ( Gebuehren pruefen )\n"+
    "     Signalwort \"immer\" -> include.\n"+
    "     Pfeil zeigt vom einschliessenden zum eingeschlossenen Fall.\n\n"+
    "  ( Medium vormerken ) --<<extend>>--> ( Katalog durchsuchen )\n"+
    "     Signalwort \"optional\" -> extend.\n"+
    "     Pfeil zeigt vom erweiternden zum erweiterten Fall,\n"+
    "     also GENAU UMGEKEHRT zu include.\n\n"+
    "  Bibliothekar ----|> Leser\n"+
    "     Generalisierung, geschlossene Dreieckspitze zum\n"+
    "     allgemeineren Akteur. Der Bibliothekar erbt damit\n"+
    "     alle Anwendungsfaelle des Lesers.",
  solutionLang:'UML',
  solutionNote:'Drei Punkte entscheiden hier. Erstens der Mailserver: Ein Akteur muss kein Mensch sein, und wer ihn vergisst, verliert einen Punkt. Zweitens die Generalisierung zwischen den Akteuren — sie erspart es, alle Leser-Anwendungsfälle noch einmal mit dem Bibliothekar zu verbinden. Drittens die Pfeilrichtungen: Bei include zeigt der Pfeil nach innen zum gemeinsam genutzten Fall, bei extend nach außen zum erweiterten Fall.'
},
{
  id:'ex42', level:1, topic:'Einheiten', title:'Vier Umrechnungen mit Rechenweg',
  task:'<p>Rechne jeweils um und gib den <strong>vollständigen Rechenweg</strong> an:</p>'+
    '<div class="check-prompt">a) Wie viele MiB sind 2.516.582.400 Bit?\nb) Ein Video belegt 4,7 GB. Wie lange dauert der Upload über 40 Mbit/s bei 80 % effektiver Auslastung?\nc) Eine Datenbank hat 1,2 Mio. Datensätze à 640 Byte. Wie viel GiB sind das?\nd) Eine Festplatte ist mit 4 TB beschriftet. Wie viel zeigt Windows in GiB an?</div>',
  hints:[
    'Bit durch 8 ergibt Byte, danach zweimal durch 1.024 für MiB.',
    'Bei b) zuerst die Rate reduzieren, dann die Datenmenge in Bit umrechnen.',
    'Hersteller rechnen dezimal (10^12), Windows binär (2^40 bzw. 2^30).'
  ],
  solution:
    "a) 2.516.582.400 Bit in MiB\n"+
    "   2.516.582.400 / 8     = 314.572.800 Byte\n"+
    "   314.572.800 / 1.024   =     307.200 KiB\n"+
    "   307.200 / 1.024       =         300 MiB\n\n"+
    "b) 4,7 GB ueber 40 Mbit/s bei 80 %\n"+
    "   Effektive Rate: 40 x 0,8 = 32 Mbit/s = 32.000.000 Bit/s\n"+
    "   Datenmenge: 4,7 x 10^9 Byte x 8 = 37,6 x 10^9 Bit\n"+
    "   t = 37.600.000.000 / 32.000.000 = 1.175 s\n"+
    "   1.175 / 60 = 19,58 min = 19 Minuten 35 Sekunden\n\n"+
    "c) 1.200.000 Datensaetze a 640 Byte\n"+
    "   1.200.000 x 640 = 768.000.000 Byte\n"+
    "   768.000.000 / 1.024         = 750.000 KiB\n"+
    "   750.000 / 1.024             = 732,42 MiB\n"+
    "   732,42 / 1.024              = 0,715 GiB\n"+
    "   Antwort: rund 0,72 GiB (ohne Index-Overhead)\n\n"+
    "d) 4 TB Festplatte in GiB\n"+
    "   Hersteller dezimal: 4 x 10^12 Byte = 4.000.000.000.000 Byte\n"+
    "   Windows binaer: 1 GiB = 2^30 = 1.073.741.824 Byte\n"+
    "   4.000.000.000.000 / 1.073.741.824 = 3.725,3 GiB\n"+
    "   Windows zeigt also rund 3.725 GiB bzw. 3,64 TiB an.\n"+
    "   Die Platte ist nicht kleiner - sie wird nur anders gezaehlt.",
  solutionLang:'Umrechnung',
  solutionNote:'Schreibe jeden Zwischenschritt mit Einheit hin, auch wenn du im Kopf rechnen könntest — die IHK vergibt Teilpunkte auf den Weg. Die beiden häufigsten Fehler sind der vergessene Faktor 8 zwischen Bit und Byte und die Verwechslung von dezimalen und binären Präfixen. Aufgabe d) ist die Standarderklärung für die Frage, warum eine gekaufte Platte kleiner wirkt als beschriftet — sie kommt regelmäßig als Verständnisfrage.'
},
{
  id:'ex43', level:1, topic:'Struktogramm', title:'Zugangskontrolle als Struktogramm',
  task:'<p>Ein Drehkreuz am Werkstor arbeitet nach folgenden Regeln:</p>'+
    '<div class="check-prompt">Der Mitarbeiter hält seinen Ausweis an den Leser. Ist der Ausweis ungültig, erscheint „Ausweis ungültig" und das Drehkreuz bleibt gesperrt.\nIst er gültig, wird geprüft, ob die aktuelle Uhrzeit zwischen 6:00 und 20:00 liegt. Ist das der Fall, öffnet das Drehkreuz.\nAußerhalb dieser Zeit öffnet es nur, wenn der Mitarbeiter eine Nachtberechtigung hat; sonst erscheint „Zutritt außerhalb der Betriebszeit".\nJeder Zutrittsversuch — erfolgreich oder nicht — wird protokolliert.</div>'+
    '<p>Entwirf ein <strong>Struktogramm</strong> in Textform.</p>',
  hints:[
    'Es gibt eine äußere Verzweigung (Ausweis gültig?) und darin eine verschachtelte.',
    'Die Protokollierung betrifft jeden Fall — sie gehört also nach allen Verzweigungen, nicht in jeden Zweig.',
    'Prüfe die Zeitbedingung mit einem UND: größer oder gleich 6 und kleiner 20.'
  ],
  solution:
    "+--------------------------------------------------------------+\n"+
    "| Eingabe: ausweisId, uhrzeit, nachtberechtigung               |\n"+
    "+--------------------------------------------------------------+\n"+
    "| gueltig <- pruefeAusweis(ausweisId)                          |\n"+
    "| geoeffnet <- FALSCH                                          |\n"+
    "+--------------------------------------------------------------+\n"+
    "|                    gueltig = WAHR ?                          |\n"+
    "+------------------------------+-------------------------------+\n"+
    "|             JA               |             NEIN              |\n"+
    "+------------------------------+-------------------------------+\n"+
    "|  uhrzeit >= 6 UND            | Ausgabe                       |\n"+
    "|  uhrzeit < 20 ?              | \"Ausweis ungueltig\"           |\n"+
    "+---------------+--------------+                               |\n"+
    "|     JA        |    NEIN      |                               |\n"+
    "+---------------+--------------+                               |\n"+
    "| Drehkreuz     | nachtberech- |                               |\n"+
    "| oeffnen       | tigung ?     |                               |\n"+
    "| geoeffnet     +------+-------+                               |\n"+
    "|   <- WAHR     |  JA  | NEIN  |                               |\n"+
    "|               +------+-------+                               |\n"+
    "|               | oeff-| Aus-  |                               |\n"+
    "|               | nen  | gabe  |                               |\n"+
    "|               | geo. | \"aus- |                               |\n"+
    "|               | <-   | ser-  |                               |\n"+
    "|               | WAHR | halb\" |                               |\n"+
    "+---------------+------+-------+-------------------------------+\n"+
    "| protokolliere(ausweisId, uhrzeit, geoeffnet)                 |\n"+
    "+--------------------------------------------------------------+\n\n"+
    "PROBE\n"+
    "  gueltiger Ausweis, 14:00, keine Nachtberechtigung\n"+
    "     -> 14 >= 6 UND 14 < 20 ist wahr -> oeffnet, protokolliert\n\n"+
    "  gueltiger Ausweis, 22:00, mit Nachtberechtigung\n"+
    "     -> Zeitbedingung falsch -> Nachtberechtigung ja -> oeffnet\n\n"+
    "  ungueltiger Ausweis, 10:00\n"+
    "     -> Meldung, bleibt gesperrt, wird trotzdem protokolliert",
  solutionLang:'Struktogramm',
  solutionNote:'Der Prüfungspunkt ist die Position der Protokollierung: Sie steht als eigener Block *nach* allen Verzweigungen, weil sie in jedem Fall ausgeführt wird. Wer sie in jeden einzelnen Zweig schreibt, hat zwar dasselbe Ergebnis, aber dreifachen Code — und genau darauf zielt die Aufgabe. Achte außerdem auf die Grenzen der Zeitbedingung: „zwischen 6:00 und 20:00" heißt größer oder gleich 6 und kleiner 20.'
},
{
  id:'ex44', level:2, topic:'ER-Modell', title:'Vom Formular zum Datenmodell',
  task:'<p>Eine Autovermietung nutzt bisher dieses Papierformular:</p>'+
    '<div class="check-prompt">MIETVERTRAG Nr. 2026-0417        Datum: 14.03.2026\nKunde: Nr. 3391, Anna Berger, Hauptstr. 7, 50667 Köln, Führerschein B\nFahrzeug: K-AB 1234, VW Golf, Kompaktklasse, Tagespreis 49,00 €\nStation Abholung: Köln-Süd (Leiter: Herr Vogt)\nStation Rückgabe:  Bonn-Zentrum (Leiter: Frau Klein)\nMietdauer: 14.03. bis 18.03.2026 (5 Tage)\nZusatzleistungen: Navigationsgerät 5,00 €/Tag, Kindersitz 3,00 €/Tag\nGesamtpreis: 285,00 €</div>'+
    '<p>(a) Entwirf das Relationenmodell in 3. NF. (b) Gib alle Beziehungen mit Kardinalität an. (c) Begründe, warum die Zusatzleistungen eine eigene Konstruktion brauchen. (d) Welches Attribut aus dem Formular darf <strong>nicht</strong> gespeichert werden und warum?</p>',
  hints:[
    'Ein Mietvertrag nennt zwei verschiedene Stationen — das ergibt zwei Fremdschlüssel auf dieselbe Tabelle.',
    'Ein Vertrag kann mehrere Zusatzleistungen haben, eine Zusatzleistung kommt in vielen Verträgen vor.',
    'Bei (d): Welcher Wert lässt sich jederzeit aus anderen Daten berechnen?'
  ],
  solution:
    "(a) RELATIONENMODELL IN 3. NF\n\n"+
    "  Kunde(KundenNr, Nachname, Vorname, Strasse, PLZ, Ort,\n"+
    "        Fuehrerscheinklasse)\n\n"+
    "  Fahrzeugklasse(KlassenNr, Bezeichnung, Tagespreis)\n\n"+
    "  Fahrzeug(Kennzeichen, Modell, #KlassenNr)\n\n"+
    "  Station(StationsNr, Bezeichnung, #LeiterPersonalNr)\n\n"+
    "  Mitarbeiter(PersonalNr, Nachname, Vorname)\n\n"+
    "  Mietvertrag(VertragsNr, Datum, Mietbeginn, Mietende,\n"+
    "              #KundenNr, #Kennzeichen,\n"+
    "              #AbholStationsNr, #RueckgabeStationsNr)\n\n"+
    "  Zusatzleistung(LeistungsNr, Bezeichnung, PreisProTag)\n\n"+
    "  Vertrag_Zusatzleistung(#VertragsNr, #LeistungsNr, Anzahl)\n\n"+
    "(b) BEZIEHUNGEN\n\n"+
    "  Kunde            1 : n  Mietvertrag\n"+
    "  Fahrzeug         1 : n  Mietvertrag\n"+
    "  Fahrzeugklasse   1 : n  Fahrzeug\n"+
    "  Station          1 : n  Mietvertrag  (zweimal: Abholung,\n"+
    "                          Rueckgabe - zwei Fremdschluessel\n"+
    "                          auf dieselbe Tabelle)\n"+
    "  Mitarbeiter      1 : 1  Station      (als Leiter)\n"+
    "  Mietvertrag      n : m  Zusatzleistung\n"+
    "                          -> Zwischentabelle\n\n"+
    "(c) WARUM DIE ZUSATZLEISTUNGEN EINE EIGENE KONSTRUKTION BRAUCHEN\n\n"+
    "  Ein Vertrag kann mehrere Zusatzleistungen enthalten, und eine\n"+
    "  Zusatzleistung kommt in vielen Vertraegen vor. Das ist eine\n"+
    "  n:m-Beziehung, die sich nicht mit einem Fremdschluessel abbilden\n"+
    "  laesst.\n\n"+
    "  Wuerde man die Zusatzleistungen als Spalten in den Mietvertrag\n"+
    "  schreiben (Zusatz1, Zusatz2, Zusatz3), entstuenden gleich drei\n"+
    "  Probleme: die Anzahl waere fest begrenzt, die meisten Felder\n"+
    "  blieben leer, und eine Preisaenderung muesste an vielen Stellen\n"+
    "  nachgezogen werden. Ausserdem waere die 1. NF verletzt, sobald\n"+
    "  man mehrere Leistungen in ein Feld schreibt.\n\n"+
    "  Die Zwischentabelle traegt zusaetzlich die Anzahl - ein Attribut,\n"+
    "  das weder zum Vertrag noch zur Leistung allein gehoert, sondern\n"+
    "  zu ihrer Verbindung.\n\n"+
    "(d) WAS NICHT GESPEICHERT WERDEN DARF\n\n"+
    "  Der GESAMTPREIS (285,00 EUR).\n"+
    "  Er ist ein abgeleiteter Wert und laesst sich jederzeit berechnen:\n"+
    "     Mietdauer x Tagespreis der Klasse\n"+
    "   + Summe (Anzahl x PreisProTag) ueber alle Zusatzleistungen\n\n"+
    "  Wuerde man ihn speichern, entstuende Redundanz und damit die\n"+
    "  Gefahr von Inkonsistenz: Aendert jemand die Mietdauer, stimmt\n"+
    "  der gespeicherte Gesamtpreis nicht mehr.\n\n"+
    "  ACHTUNG - die Ausnahme: In der Praxis speichert man bei\n"+
    "  abgeschlossenen Vertraegen den Preis dennoch, weil er\n"+
    "  historisiert werden muss. Spaetere Preisaenderungen duerfen\n"+
    "  einen alten Vertrag nicht rueckwirkend veraendern. Das ist eine\n"+
    "  bewusste Denormalisierung - und sie gehoert begruendet in die\n"+
    "  Antwort.",
  solutionLang:'Datenmodellierung',
  solutionNote:'Teil (d) ist die anspruchsvollste Stelle und hat zwei richtige Antworten, je nach Blickwinkel. Rein normalisierungstechnisch ist der Gesamtpreis redundant und gehört nicht in die Tabelle. Fachlich muss er bei abgeschlossenen Verträgen historisiert werden. Wer beides erkennt und die Denormalisierung als bewusste Entscheidung begründet, zeigt genau das Verständnis, das die IHK von einem Anwendungsentwickler erwartet. Die doppelte Beziehung zur Station ist der zweite anspruchsvolle Punkt: Zwei Fremdschlüssel dürfen auf dieselbe Tabelle zeigen.'
},
{
  id:'ex45', level:2, topic:'Netzwerk', title:'Störungsfall im Filialnetz analysieren',
  task:'<p>Eine Filiale meldet Probleme. Du erhältst folgende Angaben:</p>'+
    '<div class="check-prompt">Netz der Filiale: 10.20.30.0/25, Gateway 10.20.30.1\nDHCP-Bereich: 10.20.30.50 bis 10.20.30.120\n\nPC-A  IP 10.20.30.64   Maske 255.255.255.128  GW 10.20.30.1   → alles funktioniert\nPC-B  IP 10.20.30.140  Maske 255.255.255.128  GW 10.20.30.1   → erreicht niemanden\nPC-C  IP 10.20.30.77   Maske 255.255.255.0    GW 10.20.30.1   → LAN ok, Internet ok, aber der Server 10.20.31.9 ist nicht erreichbar\nPC-D  IP 169.254.203.4                                        → erreicht niemanden\nDrucker IP 10.20.30.55 (statisch gesetzt)                     → zeitweise nicht erreichbar</div>'+
    '<p>Analysiere jeden Fall: Was ist die Ursache und wie behebst du sie? Gib für PC-B und den Drucker jeweils eine konkrete korrekte Konfiguration an.</p>',
  hints:[
    'Bestimme zuerst den gültigen Adressbereich des /25-Netzes.',
    'Eine zu weite Subnetzmaske lässt den Rechner glauben, ein fremdes Netz sei lokal.',
    'Eine statische Adresse innerhalb des DHCP-Bereichs ist ein Klassiker.'
  ],
  solution:
    "GRUNDLAGE\n"+
    "  10.20.30.0/25, Maske 255.255.255.128\n"+
    "  Blockgroesse = 256 - 128 = 128\n"+
    "  Netz      : 10.20.30.0\n"+
    "  Hosts     : 10.20.30.1 bis 10.20.30.126\n"+
    "  Broadcast : 10.20.30.127\n"+
    "  Das naechste Netz beginnt bei 10.20.30.128.\n\n"+
    "PC-A  10.20.30.64/25\n"+
    "  Liegt im gueltigen Bereich, Maske und Gateway stimmen.\n"+
    "  -> korrekt konfiguriert, kein Handlungsbedarf.\n\n"+
    "PC-B  10.20.30.140/25\n"+
    "  URSACHE: .140 liegt AUSSERHALB des Netzes - es gehoert bereits\n"+
    "  zu 10.20.30.128/25. Der PC haelt sein Gateway 10.20.30.1 fuer\n"+
    "  nicht lokal erreichbar und kann es nicht ansprechen.\n"+
    "  BEHEBUNG: Adresse in den gueltigen Bereich legen, ausserhalb\n"+
    "  des DHCP-Pools und nicht die .1.\n"+
    "     IP-Adresse       10.20.30.20\n"+
    "     Subnetzmaske     255.255.255.128\n"+
    "     Standardgateway  10.20.30.1\n"+
    "  (frei sind .2 bis .49 sowie .121 bis .126)\n\n"+
    "PC-C  10.20.30.77 mit Maske 255.255.255.0\n"+
    "  URSACHE: Die Maske ist zu WEIT (/24 statt /25). Der PC glaubt,\n"+
    "  alles von 10.20.30.0 bis 10.20.30.255 sei sein eigenes Netz.\n"+
    "  Fuer 10.20.31.9 fragt er dennoch das Gateway - das klappt.\n"+
    "  Problematisch wird es fuer Ziele zwischen .128 und .255: die\n"+
    "  sucht er per ARP im LAN, statt sie zu routen.\n"+
    "  Hinweis: Dass der Server 10.20.31.9 nicht erreichbar ist, liegt\n"+
    "  daher NICHT an der Maske von PC-C, sondern an einer Route oder\n"+
    "  Firewall-Regel zwischen den Netzen - das ist getrennt zu pruefen.\n"+
    "  BEHEBUNG: Maske auf 255.255.255.128 korrigieren, anschliessend\n"+
    "  Routing und Firewall zwischen 10.20.30.0/25 und 10.20.31.0/24\n"+
    "  pruefen.\n\n"+
    "PC-D  169.254.203.4\n"+
    "  URSACHE: APIPA - es wurde kein DHCP-Server erreicht. Der Client\n"+
    "  hat sich selbst eine Adresse gegeben, hat aber kein Gateway.\n"+
    "  MOEGLICHE GRUENDE: Kabel nicht gesteckt, falsches VLAN am Port,\n"+
    "  DHCP-Server ausgefallen, Adresspool erschoepft (der Bereich\n"+
    "  .50 bis .120 fasst nur 71 Adressen), fehlendes DHCP-Relay.\n"+
    "  BEHEBUNG: ipconfig /release und /renew, Kabel und Port pruefen,\n"+
    "  DHCP-Server und Poolauslastung kontrollieren.\n\n"+
    "DRUCKER  10.20.30.55 statisch\n"+
    "  URSACHE: Die Adresse liegt MITTEN IM DHCP-BEREICH (.50 bis .120).\n"+
    "  Der DHCP-Server kann sie einem anderen Geraet zuweisen - dann\n"+
    "  entsteht ein Adresskonflikt und der Drucker ist zeitweise weg.\n"+
    "  Das erklaert genau das sporadische Verhalten.\n"+
    "  BEHEBUNG, zwei gleichwertige Wege:\n"+
    "     a) Statische Adresse ausserhalb des Pools:\n"+
    "        IP 10.20.30.10, Maske 255.255.255.128, GW 10.20.30.1\n"+
    "     b) Besser: DHCP-RESERVIERUNG auf die MAC-Adresse des\n"+
    "        Druckers. Dann bleibt die Verwaltung zentral beim\n"+
    "        DHCP-Server und der Drucker behaelt dauerhaft dieselbe\n"+
    "        Adresse.",
  solutionLang:'Netzwerkanalyse',
  solutionNote:'Diese Aufgabe verbindet vier typische Fehlerbilder in einem Szenario, so wie es die AP1 tut. Der Druckerfall ist der lehrreichste: Das Wort „zeitweise" ist der entscheidende Hinweis — ein dauerhafter Fehler hätte eine andere Ursache, ein sporadischer deutet fast immer auf einen Adresskonflikt. Und bei PC-C lohnt sich die Ehrlichkeit: Die falsche Maske ist ein echter Fehler, erklärt aber das geschilderte Symptom nicht vollständig. Das zu trennen, statt alles auf einen Befund zu schieben, ist genau die Diagnosekompetenz, die geprüft wird.'
},
{
  id:'ex46', level:2, topic:'Wirtschaft', title:'Drei Angebote vollständig bewerten',
  task:'<p>Für 25 Notebooks liegen drei Angebote vor:</p>'+
    '<div class="check-prompt">              Listenpreis   Rabatt  Skonto  Versand   Garantie  Support\nAnbieter A    1.090 €/Stk    10 %    2 %     240 €     24 Mon.   E-Mail\nAnbieter B    1.180 €/Stk    18 %    0 %     frei      36 Mon.   Telefon 8-18 Uhr\nAnbieter C    1.020 €/Stk     6 %    3 %     180 €     24 Mon.   Vor-Ort-Service</div>'+
    '<p>(a) Berechne den Bezugspreis aller drei Angebote (netto). (b) Führe eine Nutzwertanalyse mit den Kriterien Preis 50 %, Garantie 20 %, Support 30 % durch (Skala 1–10). (c) Sprich eine begründete Empfehlung aus und nenne einen Grund, warum die reine Preisbetrachtung hier zu kurz greift.</p>',
  hints:[
    'Rechne zuerst mit dem Gesamtlistenpreis für alle 25 Geräte.',
    'Skonto immer vom Zieleinkaufspreis, Versand erst danach addieren.',
    'Bei der Nutzwertanalyse: Prüfe zuerst, ob die Gewichte 100 % ergeben.'
  ],
  solution:
    "(a) BEZUGSPREISE\n\n"+
    "  ANBIETER A\n"+
    "    Listeneinkaufspreis  25 x 1.090 = 27.250,00\n"+
    "    - Rabatt 10 %                   - 2.725,00\n"+
    "    = Zieleinkaufspreis               24.525,00\n"+
    "    - Skonto 2 %                    -   490,50\n"+
    "    = Bareinkaufspreis                24.034,50\n"+
    "    + Bezugskosten                  +   240,00\n"+
    "    = Bezugspreis                     24.274,50 EUR\n\n"+
    "  ANBIETER B\n"+
    "    Listeneinkaufspreis  25 x 1.180 = 29.500,00\n"+
    "    - Rabatt 18 %                   - 5.310,00\n"+
    "    = Zieleinkaufspreis               24.190,00\n"+
    "    - Skonto 0 %                    -     0,00\n"+
    "    = Bareinkaufspreis                24.190,00\n"+
    "    + Bezugskosten                  +     0,00\n"+
    "    = Bezugspreis                     24.190,00 EUR\n\n"+
    "  ANBIETER C\n"+
    "    Listeneinkaufspreis  25 x 1.020 = 25.500,00\n"+
    "    - Rabatt 6 %                    - 1.530,00\n"+
    "    = Zieleinkaufspreis               23.970,00\n"+
    "    - Skonto 3 %                    -   719,10\n"+
    "    = Bareinkaufspreis                23.250,90\n"+
    "    + Bezugskosten                  +   180,00\n"+
    "    = Bezugspreis                     23.430,90 EUR\n\n"+
    "  RANGFOLGE NACH PREIS: C (23.430,90) < B (24.190,00) < A (24.274,50)\n"+
    "  Spanne: nur 843,60 EUR oder rund 3,6 % - die Angebote liegen\n"+
    "  sehr eng beieinander.\n\n"+
    "(b) NUTZWERTANALYSE\n"+
    "  Probe: 50 + 20 + 30 = 100 %  ok\n\n"+
    "  Punktvergabe (begruendet):\n"+
    "    Preis     : C guenstigster = 10, B = 8, A = 7\n"+
    "    Garantie  : B 36 Monate = 10, A und C 24 Monate = je 6\n"+
    "    Support   : C Vor-Ort = 10, B Telefon = 7, A nur E-Mail = 4\n\n"+
    "  Kriterium    Gew.   A          B          C\n"+
    "  ------------------------------------------------\n"+
    "  Preis        50 %   7 -> 3,50  8 -> 4,00  10 -> 5,00\n"+
    "  Garantie     20 %   6 -> 1,20 10 -> 2,00   6 -> 1,20\n"+
    "  Support      30 %   4 -> 1,20  7 -> 2,10  10 -> 3,00\n"+
    "  ------------------------------------------------\n"+
    "  Gesamtnutzwert      5,90       8,10        9,20\n\n"+
    "(c) EMPFEHLUNG\n\n"+
    "  Anbieter C wird empfohlen. Er ist zugleich das guenstigste\n"+
    "  Angebot (23.430,90 EUR) und erreicht mit 9,20 den hoechsten\n"+
    "  Nutzwert. Der Abstand zu B betraegt 1,10 Punkte, zu A sogar\n"+
    "  3,30 Punkte.\n\n"+
    "  WARUM DER REINE PREISVERGLEICH ZU KURZ GREIFT\n\n"+
    "  Die Preisspanne betraegt nur 843,60 EUR, also 3,6 %. Ein\n"+
    "  einziger Ausfall, der beim reinen E-Mail-Support von Anbieter A\n"+
    "  tagelang ungeloest bliebe, kostet schnell mehr als diesen\n"+
    "  Unterschied - bei 25 Geraeten und einem Arbeitsplatzausfall von\n"+
    "  nur zwei Tagen zu 300 EUR Tagessatz waeren das bereits 600 EUR.\n\n"+
    "  Hinzu kommt: Anbieter B bietet zwoelf Monate mehr Garantie. Ein\n"+
    "  Geraeteausfall im dritten Jahr muesste bei A und C aus eigener\n"+
    "  Tasche bezahlt werden. Bei einer angenommenen Ausfallquote von\n"+
    "  8 % waeren das zwei Geraete zu je rund 1.000 EUR - mehr als die\n"+
    "  gesamte Preisdifferenz.\n\n"+
    "  Die Entscheidung faellt hier also nicht ueber den Preis, sondern\n"+
    "  ueber Support und Garantie. Genau dafuer ist die Nutzwertanalyse\n"+
    "  gedacht: Sie macht nicht-monetaere Kriterien vergleichbar.",
  solutionLang:'Angebotsvergleich',
  solutionNote:'Anbieter B ist eine bewusste Falle: Er hat den höchsten Listenpreis *und* den höchsten Rabatt und landet trotzdem in der Mitte. Der Rabattsatz allein sagt nichts aus — nur der Bezugspreis zählt. Teil (c) ist der Punktebringer: Rechne den Preisunterschied gegen ein konkretes Ausfallszenario. Eine Empfehlung, die eine Zahl gegen eine Zahl stellt, ist deutlich mehr wert als der Satz „Support ist auch wichtig".'
},
{
  id:'ex47', level:2, topic:'Trockenlauf', title:'Rekursion und Schleife vergleichen',
  task:'<p>Zwei Algorithmen berechnen dasselbe:</p>'+
    '<div class="check-prompt">FUNKTION variante_A(n)              FUNKTION variante_B(n)\n  WENN n &lt;= 1 DANN                  ergebnis &lt;- 1\n    GIB 1 ZURUECK                     FUER i VON 2 BIS n TUE\n  SONST                                 ergebnis &lt;- ergebnis * i\n    GIB n * variante_A(n-1) ZURUECK   ENDEFUER\n  ENDEWENN                            GIB ergebnis ZURUECK\nENDEFUNKTION                        ENDEFUNKTION</div>'+
    '<p>(a) Was berechnen beide? (b) Erstelle für <code>n = 5</code> je eine Wertetabelle. (c) Wie viele Funktionsaufrufe bzw. Schleifendurchläufe finden statt? (d) Nenne je zwei Vor- und Nachteile der rekursiven Variante.</p>',
  hints:[
    'Setze kleine Werte ein: n = 1, n = 2, n = 3 — dann siehst du das Muster.',
    'Bei der Rekursion wird erst beim Zurückspringen gerechnet, nicht beim Abstieg.',
    'Denke bei den Nachteilen an den Aufrufstapel.'
  ],
  solution:
    "(a) BEIDE BERECHNEN DIE FAKULTAET n!\n"+
    "    5! = 5 x 4 x 3 x 2 x 1 = 120\n\n"+
    "(b) WERTETABELLEN fuer n = 5\n\n"+
    "  VARIANTE A - rekursiv\n"+
    "  Ebene  n   Aktion                     Rueckgabe\n"+
    "  ----------------------------------------------------\n"+
    "    1    5   5 > 1 -> ruft A(4)         offen\n"+
    "    2    4   4 > 1 -> ruft A(3)         offen\n"+
    "    3    3   3 > 1 -> ruft A(2)         offen\n"+
    "    4    2   2 > 1 -> ruft A(1)         offen\n"+
    "    5    1   Abbruchbedingung               1\n"+
    "  --- Aufstieg, jetzt wird gerechnet ---\n"+
    "    4    2   2 * 1                          2\n"+
    "    3    3   3 * 2                          6\n"+
    "    2    4   4 * 6                         24\n"+
    "    1    5   5 * 24                       120\n\n"+
    "  VARIANTE B - iterativ\n"+
    "   i    ergebnis vorher   Rechnung   ergebnis nachher\n"+
    "  ----------------------------------------------------\n"+
    "   -           -              -             1\n"+
    "   2           1            1 * 2           2\n"+
    "   3           2            2 * 3           6\n"+
    "   4           6            6 * 4          24\n"+
    "   5          24           24 * 5         120\n\n"+
    "(c) AUFRUFE UND DURCHLAEUFE\n\n"+
    "  Variante A: 5 Funktionsaufrufe - A(5), A(4), A(3), A(2), A(1).\n"+
    "              Allgemein: n Aufrufe, und ebenso viele Rahmen\n"+
    "              liegen gleichzeitig auf dem Aufrufstapel.\n\n"+
    "  Variante B: 4 Schleifendurchlaeufe - i = 2, 3, 4, 5.\n"+
    "              Allgemein: n - 1 Durchlaeufe.\n\n"+
    "  Beide haben die Komplexitaet O(n) bei der Rechenzeit.\n"+
    "  Beim SPEICHER unterscheiden sie sich:\n"+
    "     rekursiv  O(n)  wegen des Aufrufstapels\n"+
    "     iterativ  O(1)  nur eine Variable\n\n"+
    "(d) VOR- UND NACHTEILE DER REKURSION\n\n"+
    "  Vorteile:\n"+
    "   1. Naeher an der mathematischen Definition und dadurch oft\n"+
    "      kuerzer und leichter lesbar.\n"+
    "   2. Bei rekursiv strukturierten Daten - Baeumen, Verzeichnissen,\n"+
    "      verschachtelten Strukturen - deutlich eleganter als eine\n"+
    "      Schleife mit eigener Stapelverwaltung.\n\n"+
    "  Nachteile:\n"+
    "   1. Jeder Aufruf belegt einen Rahmen auf dem Aufrufstapel.\n"+
    "      Bei grossem n droht ein Stapelueberlauf (Stack Overflow).\n"+
    "   2. Mehr Verwaltungsaufwand je Aufruf, daher in der Regel\n"+
    "      langsamer als die Schleife.\n\n"+
    "  Und der Klassiker: Fehlt die Abbruchbedingung, laeuft die\n"+
    "  Rekursion endlos bis zum Stapelueberlauf. Bei der Schleife\n"+
    "  waere das Gegenstueck die vergessene Veraenderung der\n"+
    "  Laufvariablen.",
  solutionLang:'Trockenlauf',
  solutionNote:'Der wichtigste Punkt steckt in Teil (b): Bei der Rekursion wird beim Abstieg nichts gerechnet, sondern nur der Stapel aufgebaut. Erst die Abbruchbedingung löst die Rechnung aus, und zwar von innen nach außen. Wer die Tabelle nur mit fünf Zeilen schreibt, hat den Aufstieg vergessen und verliert die Hälfte der Punkte. Bei (c) ist der Unterschied im Speicherbedarf das, was eine gute Antwort ausmacht — die Rechenzeit ist bei beiden gleich.'
},
{
  id:'ex48', level:2, topic:'Projektmanagement', title:'Projekt planen und Engpass erkennen',
  task:'<p>Eine Arztpraxis führt ein neues Praxisverwaltungssystem ein:</p>'+
    '<div class="check-prompt">Vorgang                        Dauer   Vorgänger\nA  Anforderungen erheben        4 Tage    —\nB  Anbieter auswählen           6 Tage    A\nC  Hardware beschaffen          8 Tage    B\nD  Netzwerk vorbereiten         5 Tage    A\nE  Software installieren        3 Tage    C, D\nF  Altdaten migrieren           7 Tage    E\nG  Mitarbeiter schulen          4 Tage    E\nH  Testbetrieb                  5 Tage    F, G\nI  Abnahme                      2 Tage    H</div>'+
    '<p>(a) Berechne den Netzplan vollständig. (b) Bestimme Projektdauer und kritischen Pfad. (c) Die Hardwarelieferung verzögert sich um 3 Tage — wie wirkt sich das aus? (d) Das Projekt muss 4 Tage früher fertig werden. Nenne zwei Ansätze mit Begründung, welche Vorgänge du dafür betrachtest.</p>',
  hints:[
    'Vorwärts mit MAX, rückwärts mit MIN. Probe: SAZ des ersten Vorgangs muss 0 sein.',
    'Verkürzen lohnt nur auf dem kritischen Pfad — alles andere bringt nichts.',
    'Prüfe bei (c) zuerst, ob C überhaupt Puffer hat.'
  ],
  solution:
    "(a) NETZPLAN\n\n"+
    "  VORWAERTSRECHNUNG\n"+
    "    A: FAZ=0             D=4  FEZ=4\n"+
    "    B: FAZ=4             D=6  FEZ=10\n"+
    "    D: FAZ=4             D=5  FEZ=9\n"+
    "    C: FAZ=10            D=8  FEZ=18\n"+
    "    E: FAZ=MAX(18,9)=18  D=3  FEZ=21\n"+
    "    F: FAZ=21            D=7  FEZ=28\n"+
    "    G: FAZ=21            D=4  FEZ=25\n"+
    "    H: FAZ=MAX(28,25)=28 D=5  FEZ=33\n"+
    "    I: FAZ=33            D=2  FEZ=35\n\n"+
    "  RUECKWAERTSRECHNUNG (SEZ von I = 35)\n"+
    "    I: SEZ=35  SAZ=33\n"+
    "    H: SEZ=33  SAZ=28\n"+
    "    F: SEZ=28  SAZ=21\n"+
    "    G: SEZ=28  SAZ=24\n"+
    "    E: SEZ=MIN(21,24)=21  SAZ=18\n"+
    "    C: SEZ=18  SAZ=10\n"+
    "    D: SEZ=18  SAZ=13\n"+
    "    B: SEZ=10  SAZ=4\n"+
    "    A: SEZ=MIN(4,13)=4    SAZ=0    Probe ok\n\n"+
    "  GESAMTPUFFER (GP = SAZ - FAZ)\n"+
    "    A: 0-0   = 0   kritisch\n"+
    "    B: 4-4   = 0   kritisch\n"+
    "    C: 10-10 = 0   kritisch\n"+
    "    D: 13-4  = 9\n"+
    "    E: 18-18 = 0   kritisch\n"+
    "    F: 21-21 = 0   kritisch\n"+
    "    G: 24-21 = 3\n"+
    "    H: 28-28 = 0   kritisch\n"+
    "    I: 33-33 = 0   kritisch\n\n"+
    "(b) ERGEBNIS\n"+
    "    Projektdauer   : 35 Tage\n"+
    "    Kritischer Pfad: A - B - C - E - F - H - I\n"+
    "    Puffer: D hat 9 Tage, G hat 3 Tage.\n\n"+
    "(c) HARDWARE (Vorgang C) VERZOEGERT SICH UM 3 TAGE\n\n"+
    "    C liegt auf dem kritischen Pfad, Gesamtpuffer 0.\n"+
    "    Jede Verzoegerung schlaegt voll durch.\n"+
    "    Neue Projektdauer: 35 + 3 = 38 Tage.\n"+
    "    Der kritische Pfad bleibt unveraendert.\n\n"+
    "    Zur Kontrolle: Haette sich stattdessen D um 3 Tage verzoegert,\n"+
    "    waere nichts passiert - D hat 9 Tage Puffer.\n\n"+
    "(d) VERKUERZUNG UM 4 TAGE\n\n"+
    "    Grundsatz: Verkuerzen bringt NUR auf dem kritischen Pfad\n"+
    "    etwas. Vorgaenge mit Puffer - hier D und G - zu beschleunigen,\n"+
    "    aendert an der Projektdauer nichts.\n\n"+
    "    ANSATZ 1: Vorgaenge parallelisieren\n"+
    "      G (Schulung, 4 Tage) laeuft bereits parallel zu F.\n"+
    "      Pruefen, ob F (Altdaten migrieren, 7 Tage) teilweise schon\n"+
    "      vor E beginnen kann - etwa die Datenbereinigung und\n"+
    "      Probemigration waehrend der Installation.\n"+
    "      Begruendung: F ist mit 7 Tagen der laengste Vorgang auf dem\n"+
    "      kritischen Pfad nach C und bietet den groessten Hebel.\n\n"+
    "    ANSATZ 2: Ressourcen aufstocken\n"+
    "      C (Hardware beschaffen, 8 Tage) durch einen Lieferanten mit\n"+
    "      kuerzerer Lieferzeit oder Expressversand verkuerzen.\n"+
    "      Begruendung: C ist der laengste Einzelvorgang auf dem\n"+
    "      kritischen Pfad; zwei bis drei Tage sind hier durch\n"+
    "      Mehrkosten realistisch einkaufbar.\n\n"+
    "    ZU BEACHTEN\n"+
    "      Verkuerzt man den kritischen Pfad, kann ein bisher\n"+
    "      unkritischer Zweig selbst kritisch werden. D hat 9 Tage\n"+
    "      Puffer, G nur 3 - nach einer Verkuerzung um 4 Tage waere\n"+
    "      der Zweig ueber G zu pruefen.\n"+
    "      Ausserdem gilt das magische Dreieck: Zeitverkuerzung geht\n"+
    "      zulasten von Kosten oder Qualitaet.",
  solutionLang:'Netzplan',
  solutionNote:'Teil (d) ist die Stelle, an der sich zeigt, ob der Netzplan verstanden oder nur gerechnet wurde. Die Kernaussage lautet: Verkürzen wirkt ausschließlich auf dem kritischen Pfad. Wer vorschlägt, die Schulung zu beschleunigen, hat die Puffer nicht gelesen. Der Hinweis am Ende — dass ein gepufferter Zweig nach der Verkürzung selbst kritisch werden kann — hebt die Antwort noch einmal ab und wird in Musterlösungen ausdrücklich erwartet.'
}
,
{
  id:'ex49', level:1, topic:'Netzwerkgrundlagen', title:'Erst schätzen, dann prüfen: MAC und IP',
  task:'<p><strong>Schritt 1 — schätze zuerst, ohne nachzusehen.</strong> Notiere für jede Aussage spontan „stimmt" oder „stimmt nicht". Erst danach liest du weiter und prüfst.</p>'+
    '<div class="check-prompt">a) Die IP-Adresse eines Pakets ändert sich bei jedem Router.\nb) Die MAC-Adresse ist weltweit einmalig und lässt sich nicht ändern.\nc) Ein PC löst per ARP die MAC-Adresse des Zielservers im Internet auf.\nd) Ohne MAC-Adresse könnte ein Paket im Zielnetz keinem Gerät zugestellt werden.\ne) Ein Switch benötigt eine IP-Adresse, um Frames weiterzuleiten.</div>'+
    '<p><strong>Schritt 2:</strong> Begründe jede Entscheidung in einem Satz. <strong>Schritt 3:</strong> Bei welcher Aussage lagst du daneben? Notiere in einem Satz, welche Vorstellung dich in die Irre geführt hat.</p>',
  hints:[
    'Denk an das Bild: IP ist die Postanschrift, MAC die Personalausweisnummer.',
    'Frage bei jeder Aussage, auf welcher OSI-Schicht sie spielt.',
    'Bei e): Ein Switch arbeitet auf Schicht 2 — wozu bräuchte er eine Schicht-3-Adresse?'
  ],
  solution:
    "a) STIMMT NICHT.\n"+
    "   Die Ziel-IP bleibt vom Absender bis zum Ziel unveraendert.\n"+
    "   Die MAC-Adresse ist es, die bei jedem Hop ausgetauscht wird.\n\n"+
    "b) HALB RICHTIG - und deshalb mit \"stimmt nicht\" zu werten.\n"+
    "   Sie ist vom Hersteller weltweit einmalig vergeben, laesst sich\n"+
    "   aber per Software faelschen (MAC-Spoofing). Genau deshalb ist\n"+
    "   ein MAC-Filter keine echte Sicherheitsmassnahme.\n\n"+
    "c) STIMMT NICHT.\n"+
    "   Fuer Ziele ausserhalb des eigenen Netzes loest der PC die MAC\n"+
    "   des STANDARDGATEWAYS auf. Die MAC des Zielservers sieht er nie.\n\n"+
    "d) STIMMT.\n"+
    "   Im letzten Netzsegment erfolgt die Zustellung ueber die\n"+
    "   MAC-Adresse. Die IP allein genuegt dort nicht.\n\n"+
    "e) STIMMT NICHT.\n"+
    "   Ein Switch leitet Frames allein anhand der MAC-Adressen weiter.\n"+
    "   Eine IP-Adresse braucht er nur, wenn er selbst verwaltet werden\n"+
    "   soll (Management-Interface eines Managed Switch).\n\n"+
    "TYPISCHE FEHLVORSTELLUNGEN\n"+
    "  Zu a) und c): Viele stellen sich eine Ende-zu-Ende-Verbindung\n"+
    "  vor, bei der beide Adressen konstant bleiben. Tatsaechlich\n"+
    "  arbeitet jede Schicht nur mit ihrem eigenen Horizont: Schicht 3\n"+
    "  denkt in der gesamten Reise, Schicht 2 nur im naechsten Schritt.",
  solutionLang:'Selbsttest',
  solutionNote:'Diese Aufgabenform arbeitet mit dem Vorhersage-Effekt: Wer erst schätzt und dann prüft, merkt sich die Korrektur deutlich besser als jemand, der nur die richtige Antwort liest. Entscheidend ist Schritt 3 — die falsche Vorstellung ausdrücklich zu benennen. Bei a) und c) ist es fast immer dieselbe: die Annahme, beide Adressen blieben über die ganze Strecke gleich.'
},
{
  id:'ex50', level:1, topic:'Objektorientierung', title:'Fehlersuche im Klassenentwurf',
  task:'<p>Ein Azubi legt diese Klasse vor. Sie lässt sich übersetzen, hat aber <strong>fünf Entwurfsfehler</strong>.</p>'+
    '<div class="check-prompt">KLASSE Mitarbeiter\n  OEFFENTLICH name : Text\n  OEFFENTLICH gehalt : Zahl\n  OEFFENTLICH STATISCH aktuellerMitarbeiter : Text\n\n  OEFFENTLICH METHODE setGehalt(g : Zahl)\n    gehalt &lt;- g\n  ENDEMETHODE\n\n  OEFFENTLICH METHODE getGehalt() : Zahl\n    GIB gehalt ZURUECK\n  ENDEMETHODE\n\n  OEFFENTLICH METHODE druckeGehaltsabrechnungAlsPdf()\n    ...\n  ENDEMETHODE\n\n  OEFFENTLICH METHODE sendeAbrechnungPerMail()\n    ...\n  ENDEMETHODE\nENDEKLASSE</div>'+
    '<p>Finde alle fünf, benenne jeweils den Fachbegriff und schreibe die korrigierte Klasse.</p>',
  hints:[
    'Schau zuerst auf die Sichtbarkeiten der Attribute.',
    'Prüfe, ob der Setter irgendeine Regel durchsetzt.',
    'Zähle, wie viele verschiedene Aufgaben diese Klasse erledigt.'
  ],
  solution:
    "FEHLER 1 - Attribute sind oeffentlich\n"+
    "  Verstoss gegen die KAPSELUNG. Jeder kann gehalt direkt auf einen\n"+
    "  beliebigen Wert setzen, auch auf -5000.\n"+
    "  Korrektur: PRIVAT.\n\n"+
    "FEHLER 2 - Setter ohne Validierung\n"+
    "  setGehalt() reicht den Wert ungeprueft durch. Damit ist die\n"+
    "  Kapselung nur Fassade - ein oeffentliches Attribut in Verkleidung.\n"+
    "  Korrektur: Pruefung auf zulaessigen Bereich.\n\n"+
    "FEHLER 3 - aktuellerMitarbeiter ist faelschlich statisch\n"+
    "  Ein statisches Attribut existiert EINMAL fuer alle Objekte.\n"+
    "  Der \"aktuelle Mitarbeiter\" ist aber eine Eigenschaft je Objekt -\n"+
    "  oder gehoert gar nicht in diese Klasse.\n"+
    "  Korrektur: entfernen; der Name steht bereits in name.\n\n"+
    "FEHLER 4 und 5 - niedrige KOHAESION\n"+
    "  Die Klasse erledigt drei voellig verschiedene Aufgaben:\n"+
    "  Mitarbeiterdaten halten, PDFs erzeugen, Mails versenden.\n"+
    "  Verstoss gegen das Single-Responsibility-Prinzip: Ein Wechsel\n"+
    "  des Mailanbieters wuerde eine Aenderung an der Mitarbeiterklasse\n"+
    "  erzwingen.\n"+
    "  Korrektur: in eigene Klassen auslagern.\n\n"+
    "KORRIGIERTE FASSUNG\n\n"+
    "KLASSE Mitarbeiter\n"+
    "  PRIVAT name   : Text\n"+
    "  PRIVAT gehalt : Zahl\n\n"+
    "  KONSTRUKTOR Mitarbeiter(n : Text, g : Zahl)\n"+
    "    name <- n\n"+
    "    setGehalt(g)\n"+
    "  ENDEKONSTRUKTOR\n\n"+
    "  OEFFENTLICH METHODE getName() : Text\n"+
    "    GIB name ZURUECK\n"+
    "  ENDEMETHODE\n\n"+
    "  OEFFENTLICH METHODE getGehalt() : Zahl\n"+
    "    GIB gehalt ZURUECK\n"+
    "  ENDEMETHODE\n\n"+
    "  OEFFENTLICH METHODE setGehalt(g : Zahl)\n"+
    "    WENN g < 0 DANN\n"+
    "      Fehler \"Gehalt darf nicht negativ sein\"\n"+
    "    SONST\n"+
    "      gehalt <- g\n"+
    "    ENDEWENN\n"+
    "  ENDEMETHODE\n"+
    "ENDEKLASSE\n\n"+
    "KLASSE AbrechnungsDrucker\n"+
    "  OEFFENTLICH METHODE alsPdf(m : Mitarbeiter) : Datei ...\n"+
    "ENDEKLASSE\n\n"+
    "KLASSE MailVersand\n"+
    "  OEFFENTLICH METHODE versende(empfaenger : Text, anhang : Datei) ...\n"+
    "ENDEKLASSE",
  solutionLang:'Entwurfskritik',
  solutionNote:'Der Aufgabentyp „finde die Fehler in einem lauffähigen Entwurf" prüft etwas anderes als das Schreiben von Code: Du musst Qualitätsbegriffe anwenden können. Nenne deshalb bei jedem Befund den Fachbegriff — Kapselung, Kohäsion, Single Responsibility — und eine konkrete Folge. Fehler 2 ist der subtilste und wird am häufigsten übersehen: Ein Setter ohne Regel ist keine Kapselung.'
},
{
  id:'ex51', level:1, topic:'Datenschutz', title:'Datenschutz oder Datensicherheit? Sortieren und begründen',
  task:'<p>Ordne jede Maßnahme zu: <strong>Datenschutz</strong>, <strong>Datensicherheit</strong> oder <strong>beides</strong>. Begründe die Zuordnung jeweils mit der Leitfrage „ob" oder „wie".</p>'+
    '<div class="check-prompt">1) Der Server steht in einem abgeschlossenen, klimatisierten Raum.\n2) Vor dem Newsletter-Versand wird eine Einwilligung eingeholt.\n3) Bewerbungsunterlagen werden nach sechs Monaten gelöscht.\n4) Das Backup wird verschlüsselt und außer Haus gelagert.\n5) Es gibt ein Verzeichnis von Verarbeitungstätigkeiten.\n6) Zugriff auf die Personalakte haben nur zwei benannte Personen.\n7) Die Produktionsmaschinen protokollieren Temperaturwerte in eine Datenbank, die täglich gesichert wird.\n8) Vor dem Einsatz eines Bewerbermanagement-Systems wird eine Folgenabschätzung durchgeführt.</div>'+
    '<p>Nenne anschließend die zwei Maßnahmen aus der Liste, die <strong>ohne jeden Personenbezug</strong> auskommen.</p>',
  hints:[
    'Datenschutz fragt: Darf ich diese Daten überhaupt verarbeiten?',
    'Datensicherheit fragt: Wie schütze ich Daten technisch und organisatorisch?',
    'Achte bei 7) darauf, ob überhaupt personenbezogene Daten im Spiel sind.'
  ],
  solution:
    "1) Abgeschlossener, klimatisierter Serverraum\n"+
    "   -> DATENSICHERHEIT (baulich). Schuetzt Verfuegbarkeit und\n"+
    "      Vertraulichkeit, unabhaengig vom Personenbezug.\n\n"+
    "2) Einwilligung fuer den Newsletter\n"+
    "   -> DATENSCHUTZ. Rechtsgrundlage nach Art. 6 - die Frage nach\n"+
    "      dem OB der Verarbeitung.\n\n"+
    "3) Bewerbungsunterlagen nach 6 Monaten loeschen\n"+
    "   -> DATENSCHUTZ. Speicherbegrenzung und Zweckbindung.\n\n"+
    "4) Verschluesseltes Backup ausser Haus\n"+
    "   -> BEIDES. Technisch Datensicherheit (Verfuegbarkeit und\n"+
    "      Vertraulichkeit), zugleich eine TOM nach Art. 32 DSGVO,\n"+
    "      soweit personenbezogene Daten enthalten sind.\n\n"+
    "5) Verzeichnis von Verarbeitungstaetigkeiten\n"+
    "   -> DATENSCHUTZ. Rechenschaftspflicht nach Art. 30.\n\n"+
    "6) Zugriff auf die Personalakte nur fuer zwei Personen\n"+
    "   -> BEIDES. Berechtigungskonzept ist klassische Datensicherheit\n"+
    "      und zugleich eine geforderte TOM nach Art. 32.\n\n"+
    "7) Gesicherte Maschinendaten\n"+
    "   -> DATENSICHERHEIT. Temperaturwerte sind keine\n"+
    "      personenbezogenen Daten - die DSGVO greift nicht.\n"+
    "      ABER: Liessen sich daraus Rueckschluesse auf das Verhalten\n"+
    "      einzelner Beschaeftigter ziehen, kippt die Einordnung.\n\n"+
    "8) Folgenabschaetzung vor dem Bewerbersystem\n"+
    "   -> DATENSCHUTZ. DSFA nach Art. 35, weil ein hohes Risiko\n"+
    "      fuer die Betroffenen besteht.\n\n"+
    "OHNE PERSONENBEZUG MOEGLICH\n"+
    "  Nummer 1 (Serverraum) und Nummer 7 (Maschinendaten).\n"+
    "  Beide sind reine Datensicherheit - und das ist der Beweis,\n"+
    "  dass Datensicherheit der weitere Begriff ist: Sie gilt fuer\n"+
    "  ALLE Daten, der Datenschutz nur fuer personenbezogene.",
  solutionLang:'Zuordnung',
  solutionNote:'Die Schlussfrage ist der eigentliche Lerneffekt: Sie zwingt dazu, den Unterschied nicht auswendig zu lernen, sondern an Beispielen zu prüfen. Und der Nachsatz bei Nummer 7 ist prüfungsreif — sobald sich aus Maschinendaten Rückschlüsse auf einzelne Beschäftigte ziehen lassen, sind es personenbezogene Daten, und die Mitbestimmung nach § 87 BetrVG kommt hinzu.'
},
{
  id:'ex52', level:2, topic:'Objektorientierung', title:'Vom Text zum Klassendiagramm – Fitnessstudio',
  task:'<p>Arbeite in der vorgegebenen Reihenfolge und halte jeden Zwischenschritt schriftlich fest — die Punkte gibt es auf den Weg, nicht nur auf das Diagramm.</p>'+
    '<div class="check-prompt">„Ein Fitnessstudio verwaltet Mitglieder. Jedes Mitglied hat eine Mitgliedsnummer, einen Namen und ein Eintrittsdatum und schließt genau einen Vertrag ab. Ein Vertrag hat eine Laufzeit und einen Monatsbeitrag; es gibt Basis- und Premiumverträge, die den Beitrag unterschiedlich berechnen. Premiummitglieder dürfen zusätzlich Kurse buchen. Ein Kurs wird von genau einem Trainer geleitet, ein Trainer leitet mehrere Kurse. Zu einem Kurs können sich mehrere Mitglieder anmelden, ein Mitglied besucht mehrere Kurse. Jede Anmeldung hat ein Datum und einen Status."</div>'+
    '<p>(a) Substantive und Verben markieren. (b) Klassen von Attributen trennen. (c) Beziehungen mit Multiplizitäten. (d) Wo liegt eine Vererbung vor und warum? (e) Wo liegt Polymorphie vor? (f) Zeichne das Diagramm in Textform.</p>',
  hints:[
    'Der Satz zur unterschiedlichen Beitragsberechnung ist der Hinweis auf Vererbung und Polymorphie.',
    'Die Anmeldung hat eigene Attribute — das ist das Signal für eine n:m-Beziehung mit Zwischenklasse.',
    '„genau einen" und „mehrere" übersetzen sich direkt in Multiplizitäten.'
  ],
  solution:
    "(a) MARKIEREN\n"+
    "  Substantive: Fitnessstudio, Mitglied, Mitgliedsnummer, Name,\n"+
    "    Eintrittsdatum, Vertrag, Laufzeit, Monatsbeitrag, Basisvertrag,\n"+
    "    Premiumvertrag, Kurs, Trainer, Anmeldung, Datum, Status\n"+
    "  Verben: verwalten, abschliessen, berechnen, buchen, leiten,\n"+
    "    anmelden, besuchen\n\n"+
    "(b) TRENNEN\n"+
    "  KLASSEN  : Mitglied, Vertrag (abstrakt), Basisvertrag,\n"+
    "             Premiumvertrag, Kurs, Trainer, Anmeldung\n"+
    "  ATTRIBUTE: Mitgliedsnummer, Name, Eintrittsdatum -> Mitglied\n"+
    "             Laufzeit, Monatsbeitrag -> Vertrag\n"+
    "             Datum, Status -> Anmeldung\n"+
    "  Fitnessstudio ist hier KEINE Klasse - es gibt nur eines und es\n"+
    "  hat im Text weder Eigenschaften noch Verhalten.\n\n"+
    "(c) BEZIEHUNGEN\n"+
    "  Mitglied  1 ----- 1   Vertrag        (\"genau einen\")\n"+
    "  Trainer   1 ----- 0..* Kurs          (\"mehrere\")\n"+
    "  Mitglied  1 --- 0..* Anmeldung 0..* --- 1 Kurs\n"+
    "     Die n:m-Beziehung zwischen Mitglied und Kurs wird ueber die\n"+
    "     Klasse Anmeldung aufgeloest, weil sie eigene Attribute hat.\n\n"+
    "(d) VERERBUNG\n"+
    "  Basisvertrag und Premiumvertrag sind beide EIN Vertrag\n"+
    "  (Ist-ein-Test bestanden). Gemeinsam sind Laufzeit und\n"+
    "  Monatsbeitrag - diese wandern in die Oberklasse Vertrag.\n"+
    "  Vertrag ist ABSTRAKT: Einen \"Vertrag an sich\" gibt es nicht,\n"+
    "  jeder Vertrag ist entweder Basis oder Premium.\n\n"+
    "(e) POLYMORPHIE\n"+
    "  Der Satz \"die den Beitrag unterschiedlich berechnen\" ist der\n"+
    "  Ausloeser. Die Methode beitragBerechnen() steht in der\n"+
    "  Oberklasse als ABSTRAKTE Vorgabe und wird in beiden\n"+
    "  Unterklassen unterschiedlich implementiert.\n"+
    "  Nutzen: Eine Schleife ueber alle Vertraege ruft schlicht\n"+
    "  beitragBerechnen() auf - ein spaeterer Studentenvertrag\n"+
    "  erfordert keine Aenderung an dieser Schleife.\n\n"+
    "(f) DIAGRAMM\n\n"+
    "  +------------------------+        +----------------------+\n"+
    "  |       Mitglied         | 1    1 |   Vertrag  {abstract}|\n"+
    "  +------------------------+--------+----------------------+\n"+
    "  | - mitgliedsnummer: int |        | # laufzeit: int      |\n"+
    "  | - name: String         |        | # monatsbeitrag: dbl |\n"+
    "  | - eintrittsdatum: Date |        +----------------------+\n"+
    "  +------------------------+        | + beitragBerechnen() |\n"+
    "  | + getName(): String    |        |     {abstract}       |\n"+
    "  +------------------------+        +----------------------+\n"+
    "        |                                     /_\\\n"+
    "        | 1                                    |\n"+
    "        |                        +-------------+-------------+\n"+
    "        | 0..*                   |                           |\n"+
    "  +--------------------+  +----------------+  +-------------------+\n"+
    "  |     Anmeldung      |  |  Basisvertrag  |  |  Premiumvertrag   |\n"+
    "  +--------------------+  +----------------+  +-------------------+\n"+
    "  | - datum: Date      |  | + beitragBe-   |  | + beitragBe-      |\n"+
    "  | - status: String   |  |   rechnen()    |  |   rechnen()       |\n"+
    "  +--------------------+  +----------------+  | + kursBuchen()    |\n"+
    "        | 0..*                                +-------------------+\n"+
    "        | 1\n"+
    "  +------------------+ 0..*        1 +------------------+\n"+
    "  |       Kurs       |---------------|     Trainer      |\n"+
    "  +------------------+               +------------------+\n"+
    "  | - bezeichnung    |               | - name           |\n"+
    "  | - maxTeilnehmer  |               | - qualifikation  |\n"+
    "  +------------------+               +------------------+",
  solutionLang:'Klassendiagramm',
  solutionNote:'Die Aufgabe ist bewusst in sechs Schritte zerlegt, weil genau so eine AP1-Aufgabe zerlegt bepunktet wird — du bekommst Punkte für die Substantivliste, für die Multiplizitäten und für die Begründung der Vererbung, auch wenn das Diagramm am Ende nicht perfekt ist. Der Satz „die den Beitrag unterschiedlich berechnen" ist der eingebaute Auslöser für Polymorphie; solche Nebensätze sind in der AP1 nie Dekoration.'
},
{
  id:'ex53', level:2, topic:'Datenschutz', title:'Neues System datenschutzrechtlich prüfen',
  task:'<p>Eine Spedition mit 45 Beschäftigten plant:</p>'+
    '<div class="check-prompt">In alle 30 LKW wird ein Telematiksystem eingebaut. Es erfasst laufend Position, Geschwindigkeit, Lenk- und Pausenzeiten sowie das Bremsverhalten. Die Disposition sieht die Fahrzeuge in Echtzeit auf einer Karte. Monatlich wird je Fahrer ein Auswertungsbericht erzeugt, der in die Bewertung einfließen soll. Die Daten liegen beim Anbieter in einem Rechenzentrum in Frankfurt und werden 12 Monate aufbewahrt.</div>'+
    '<p>(a) Sind personenbezogene Daten betroffen? Begründe. (b) Welche Rechtsgrundlage kommt in Betracht und wo liegt das Problem? (c) Welche fünf Pflichten sind zu erfüllen? (d) Welche Rolle hat der Betriebsrat? (e) Formuliere drei konkrete Änderungen, die das Vorhaben zulässig machen.</p>',
  hints:[
    'Prüfe bei (a), ob sich die Fahrzeugdaten einer Person zuordnen lassen.',
    'Bei (b): Eine Einwilligung im Arbeitsverhältnis ist heikel — warum?',
    'Bei (e): Denke an Erforderlichkeit, Speicherdauer und die Frage, wofür die Auswertung verwendet wird.'
  ],
  solution:
    "(a) PERSONENBEZUG\n"+
    "  Ja, eindeutig. Zwar erfasst das System zunaechst Fahrzeugdaten,\n"+
    "  aber ueber den Fahrtenplan ist jederzeit zuzuordnen, wer das\n"+
    "  Fahrzeug gefuehrt hat. Damit sind die Personen IDENTIFIZIERBAR -\n"+
    "  das genuegt nach Art. 4 DSGVO.\n"+
    "  Der monatliche Bericht je Fahrer macht den Bezug ohnehin\n"+
    "  ausdruecklich.\n\n"+
    "(b) RECHTSGRUNDLAGE UND PROBLEM\n"+
    "  In Betracht kommen:\n"+
    "   - Art. 6 Abs. 1 lit. b, Vertragserfuellung, soweit die\n"+
    "     Erfassung fuer die Disposition wirklich erforderlich ist\n"+
    "   - Art. 6 Abs. 1 lit. c, rechtliche Pflicht, fuer Lenk- und\n"+
    "     Ruhezeiten nach Fahrpersonalrecht\n"+
    "   - Art. 6 Abs. 1 lit. f, berechtigtes Interesse, fuer die\n"+
    "     Ortung waehrend der Fahrt\n\n"+
    "  DAS PROBLEM: Die LEISTUNGSBEWERTUNG je Fahrer laesst sich auf\n"+
    "  keine dieser Grundlagen stuetzen. Sie ist fuer die Disposition\n"+
    "  nicht erforderlich und als Dauerueberwachung unverhaeltnismaessig.\n"+
    "  Eine Einwilligung hilft hier kaum weiter: Im Arbeitsverhaeltnis\n"+
    "  gilt sie wegen des Abhaengigkeitsverhaeltnisses nur\n"+
    "  eingeschraenkt als freiwillig und ist jederzeit widerrufbar.\n\n"+
    "(c) FUENF PFLICHTEN\n"+
    "  1. Verzeichnis von Verarbeitungstaetigkeiten ergaenzen (Art. 30)\n"+
    "  2. Datenschutz-Folgenabschaetzung (Art. 35) - systematische\n"+
    "     Ueberwachung von Beschaeftigten ist ein klarer Ausloeser\n"+
    "  3. Auftragsverarbeitungsvertrag mit dem Anbieter (Art. 28);\n"+
    "     Frankfurt liegt in der EU, ein Drittlandtransfer entfaellt -\n"+
    "     Subunternehmer und Supportzugriffe sind dennoch zu pruefen\n"+
    "  4. Information der Beschaeftigten (Art. 13): Zweck, Umfang,\n"+
    "     Speicherdauer, Rechtsgrundlage, Betroffenenrechte\n"+
    "  5. Technische und organisatorische Massnahmen (Art. 32):\n"+
    "     Zugriffsbeschraenkung, Verschluesselung, Protokollierung,\n"+
    "     Loeschkonzept\n"+
    "  (zusaetzlich: Datenschutzbeauftragter ist hier ohnehin zu\n"+
    "   benennen, da eine DSFA erforderlich ist)\n\n"+
    "(d) ROLLE DES BETRIEBSRATS\n"+
    "  Das System ist geeignet, Verhalten und Leistung der\n"+
    "  Beschaeftigten zu ueberwachen. Damit besteht ein zwingendes\n"+
    "  MITBESTIMMUNGSRECHT nach § 87 Abs. 1 Nr. 6 BetrVG.\n"+
    "  Ohne Betriebsvereinbarung darf das System nicht eingefuehrt\n"+
    "  werden - das gilt unabhaengig davon, ob die Verarbeitung\n"+
    "  datenschutzrechtlich zulaessig waere.\n\n"+
    "(e) DREI AENDERUNGEN, DIE DAS VORHABEN ZULAESSIG MACHEN\n"+
    "  1. Leistungsbewertung streichen.\n"+
    "     Der Monatsbericht darf nicht in die Personalbeurteilung\n"+
    "     einfliessen. Alternativ: Auswertung nur AGGREGIERT ueber die\n"+
    "     gesamte Flotte, ohne Zuordnung zu einzelnen Fahrern.\n\n"+
    "  2. Speicherdauer deutlich verkuerzen.\n"+
    "     12 Monate sind fuer die Disposition nicht erforderlich.\n"+
    "     Positionsdaten: wenige Tage. Lenk- und Ruhezeiten: nur so\n"+
    "     lange, wie das Fahrpersonalrecht es verlangt.\n\n"+
    "  3. Ortung auf die Arbeitszeit begrenzen.\n"+
    "     Abschaltmoeglichkeit fuer Pausen und Feierabend, damit keine\n"+
    "     Bewegungsprofile ausserhalb der Dienstzeit entstehen.\n"+
    "     Technisch umgesetzt ueber einen Pausenschalter im Fahrzeug.\n\n"+
    "  Das Ganze wird in einer BETRIEBSVEREINBARUNG festgeschrieben -\n"+
    "  sie schafft zugleich Rechtssicherheit und Akzeptanz.",
  solutionLang:'Datenschutzprüfung',
  solutionNote:'Diese Aufgabenform bewertet nicht, ob du „verboten" sagst, sondern ob du ein Vorhaben zulässig machen kannst. Teil (e) ist deshalb die eigentliche Leistung: konkrete, umsetzbare Änderungen statt allgemeiner Bedenken. Das stärkste Argument im ganzen Fall ist die Erforderlichkeit — für die Disposition braucht es die Position in Echtzeit, für eine Leistungsbewertung braucht es sie nicht. Und vergiss § 87 BetrVG nicht: Er greift unabhängig vom Datenschutzrecht.'
},
{
  id:'ex54', level:2, topic:'Netzwerkgrundlagen', title:'Overhead, Kapselung und echte Datenrate',
  task:'<p>Eine 6 GB große Videodatei wird über ein Gigabit-Netz kopiert.</p>'+
    '<div class="check-prompt">MTU: 1.500 Byte · IP-Header 20 Byte · TCP-Header 20 Byte\nEthernet-Rahmen zusätzlich 18 Byte, dazu 12 Byte Paketabstand und 8 Byte Präambel\nLeitung: 1 Gbit/s Vollduplex</div>'+
    '<p>(a) Wie viele Nutzdaten passen in einen Frame? (b) Wie viele Frames braucht die Datei? (c) Wie hoch ist der Overhead in Prozent? (d) Berechne die theoretische und die realistische Übertragungsdauer. (e) Erkläre in zwei Sätzen, warum die Praxis noch darunter liegt.</p>',
  hints:[
    'Von der MTU gehen IP- und TCP-Header ab — was bleibt, sind die Anwendungsdaten.',
    'Für den Overhead zählst du alles, was neben den Nutzdaten über die Leitung geht.',
    'Bei (e): Denke an Quittungen, Verbindungsaufbau und die Gegenstelle.'
  ],
  solution:
    "(a) NUTZDATEN JE FRAME\n"+
    "    MTU 1.500 Byte\n"+
    "    - IP-Header   20 Byte\n"+
    "    - TCP-Header  20 Byte\n"+
    "    ----------------------\n"+
    "    = 1.460 Byte Anwendungsdaten je Frame\n\n"+
    "(b) ANZAHL DER FRAMES\n"+
    "    6 GB = 6.000.000.000 Byte (dezimal)\n"+
    "    6.000.000.000 / 1.460 = 4.109.589,04\n"+
    "    -> aufgerundet 4.109.590 Frames\n"+
    "    (der letzte ist nur teilweise gefuellt)\n\n"+
    "(c) OVERHEAD\n"+
    "    Je Frame gehen ueber die Leitung:\n"+
    "       Nutzdaten          1.460 Byte\n"+
    "       IP + TCP              40 Byte\n"+
    "       Ethernet-Rahmen       18 Byte\n"+
    "       Praeambel              8 Byte\n"+
    "       Paketabstand          12 Byte\n"+
    "       ---------------------------\n"+
    "       gesamt             1.538 Byte\n\n"+
    "    Overhead = 78 / 1.538 = 5,07 %\n"+
    "    Nutzanteil = 1.460 / 1.538 = 94,93 %\n\n"+
    "(d) UEBERTRAGUNGSDAUER\n"+
    "    Theoretisch (ohne jeden Overhead):\n"+
    "       6 x 10^9 Byte x 8 = 48 x 10^9 Bit\n"+
    "       48.000.000.000 / 1.000.000.000 = 48 s\n\n"+
    "    Realistisch (mit 5,07 % Overhead):\n"+
    "       Gesamtmenge auf der Leitung:\n"+
    "       4.109.590 x 1.538 Byte = 6.320.549.420 Byte\n"+
    "       x 8 = 50.564.395.360 Bit\n"+
    "       / 1.000.000.000 = 50,6 s\n\n"+
    "    Also rund 51 statt 48 Sekunden.\n\n"+
    "(e) WARUM DIE PRAXIS NOCH DARUNTER LIEGT\n"+
    "    TCP bestaetigt empfangene Daten und wartet bei ausbleibender\n"+
    "    Quittung; dazu kommen Verbindungsauf- und -abbau sowie die\n"+
    "    Anlaufphase, in der das Sendefenster erst waechst.\n"+
    "    Ausserdem begrenzt fast immer ein anderes Glied der Kette -\n"+
    "    eine Festplatte mit 150 MB/s liefert nur 1,2 Gbit/s brutto\n"+
    "    und wird damit selbst zum Engpass.\n\n"+
    "    Deshalb rechnet man in Pruefungsaufgaben mit 80 bis 90 Prozent\n"+
    "    effektiver Auslastung.",
  solutionLang:'Netzwerkrechnung',
  solutionNote:'Diese Aufgabe verbindet Kapselung mit der Übertragungsrechnung und erklärt dabei, woher der Wert „effektive Auslastung" in anderen Aufgaben überhaupt kommt. Teil (e) ist der Verständnisteil: Der reine Protokoll-Overhead erklärt nur 5 Prozent — der große Rest entsteht durch TCP-Quittungen und dadurch, dass meist ein anderes Glied der Kette langsamer ist. Wer das trennt, zeigt, dass er die Zahl nicht nur einsetzt, sondern versteht.'
}
];
var RP_LITERAL_1_text="";
RP_LITERAL_1_text += "[{\"id\":\"abap-m1\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"Pseudocode, Algorithmen & die Brücke zu ABAP\",\"lessons\":[{\"id\":\"abap-m1-l1\",\"title\":\"Pseudocode-Grundlagen (IHK-Konvention)\",\"minutes\":7,\"body\":\"<p>Pseudocode in der AP1 ist bewusst <strong>sprachunabhängig</strong> gehalten, meist an Java/C# angelehnt. Der Prüfung liegt ein <strong>Syntax-Beiblatt</strong> bei — entscheidend ist nicht exakte Syntaxtreue, sondern ob deine Logik korrekt ist. Trotzdem lohnt es sich, eine konsistente Notation einzuüben:</p><ul><li><strong>Sequenz</strong> — Anweisung folgt auf Anweisung, von oben nach unten.</li><li><strong>Verzweigung</strong> — <code>IF ... THEN ... ELSE ... ENDIF</code>.</li><li><strong>Wiederholung</strong> — <code>FOR i &lt;- 1 TO n DO ... ENDFOR</code>, <code>WHILE ... DO ... ENDWHILE</code>, <code>REPEAT ... UNTIL</code>.</li><li><strong>Zuweisung</strong> meist mit <code>&lt;-</code> oder <code>:=</code>, Ein-/Ausgabe mit <code>READ</code>/<code>INPUT</code> bzw. <code>WRITE</code>/<code>OUTPUT</code>.</li><li><strong>Felder/Arrays</strong> werden mit eckigen Klammern indiziert — prüfe im jeweiligen Beiblatt, ob bei 0 oder 1 gezählt wird.</li></ul><p>Diese drei Grundbausteine (Sequenz, Verzweigung, Wiederholung) sind der Kern der <strong>strukturierten Programmierung</strong> — jeder Algorithmus, egal in welcher Sprache, lässt sich allein daraus zusammensetzen.</p>\",\"code\":\"FUNCTION quadriere(zahl)\\n  ergebnis <- zahl * zahl\\n  RETURN ergebnis\\nENDFUNCTION\",\"codeLang\":\"Pseudocode\",\"tip\":\"Über 90% der AP1-Algorithmen-Fragen sind Multiple-Choice und verlangen, einen gegebenen Pseudocode korrekt nachzuvollziehen (\\\"was liefert dieser Algorithmus für Eingabe X?\\\"). Übe deshalb vor allem das Trockendurchrechnen: Zeile für Zeile mit einer kleinen Tabelle für jeden Variablenwert — das ist die verlässlichste Prüfungsvorbereitung.\",\"quiz\":[{\"q\":\"Was bewertet die IHK bei Pseudocode-Aufgaben primär?\",\"options\":[\"Exakte Syntax nach einem festen Standard\",\"Die Logik/Korrektheit des Algorithmus\",\"Die Zeilenanzahl\"],\"correct\":1,\"explain\":\"Ein Syntax-Beiblatt liegt der Prüfung bei — Syntaxfehler werden toleriert, solange die Logik stimmt.\"},{\"q\":\"Welche drei Bausteine bilden den Kern der strukturierten Programmierung?\",\"options\":[\"Sequenz, Verzweigung, Wiederholung\",\"Vererbung, Polymorphie, Kapselung\",\"Variable, Konstante, Funktion\"],\"correct\":0,\"explain\":\"Jeder Algorithmus lässt sich aus diesen drei Grundbausteinen zusammensetzen — die Basis auch für Struktogramme.\"}]},{\"id\":\"abap-m1-l2\",\"title\":\"Struktogramme & Programmablaufpläne (PAP)\",\"minutes\":8,\"body\":\"<p>Neben Pseudocode prüft die AP1 auch das Lesen und Erstellen von <strong>Struktogrammen</strong> (Nassi-Shneiderman) und <strong>Programmablaufplänen</strong> (PAP, nach DIN 66001). Beide sind gleichwertige Darstellungsformen für denselben Algorithmus — Verständnis der Struktur zählt, nicht eine bestimmte Notation.</p><p><strong>Struktogramme</strong> stellen Sequenz, Verzweigung und Schleife als verschachtelte Kästen dar. Das Entscheidende: es gibt <em>keine</em> Sprungpfeile — dadurch ist unstrukturierter Code (GOTO-Sprünge) in einem Struktogramm gar nicht erst darstellbar.</p><div class=\\\"struk\\\"><div class=\\\"cond-head\\\">zahl MOD 2 = 0 ?</div><div class=\\\"cond-branches\\\"><div class=\\\"cond-branch yes\\\"><div class=\\\"branch-tag\\\">Ja</div>Ausgabe \\\"gerade\\\"</div><div class=\\\"cond-branch\\\"><div class=\\\"branch-tag\\\">Nein</div>Ausgabe \\\"ungerade\\\"</div></div></div><p style=\\\"font-size:.78rem;color:var(--text-dim);margin-top:-10px;\\\">Vereinfachte Darstellung einer Verzweigung im Struktogramm.</p><p><strong>Programmablaufpläne</strong> nutzen Flussdiagramm-Symbole: Oval = Start/Ende, Rechteck = Verarbeitungsschritt, Raute = Entscheidung, Pfeile = Kontrollfluss.</p><div class=\\\"pap-flow\\\"><div class=\\\"pap-oval\\\">Start</div><div class=\\\"pap-arrow\\\">↓</div><div class=\\\"pap-rect\\\">Eingabe: zahl</div><div class=\\\"pap-arrow\\\">↓</div><div class=\\\"pap-diamond-wrap\\\"><div class=\\\"pap-diamond\\\"><span>zahl MOD 2 = 0?</span></div></div><div class=\\\"pap-branches\\\"><div class=\\\"pap-branch\\\"><div class=\\\"branch-label\\\">ja</div><div class=\\\"pap-rect\\\">Ausgabe \\\"gerade\\\"</div></div><div class=\\\"pap-branch\\\"><div class=\\\"branch-label\\\">nein</div><div class=\\\"pap-rect\\\">Ausgabe \\\"ungerade\\\"</div></div></div><div class=\\\"pap-arrow\\\">↓</div><div class=\\\"pap-oval\\\">Ende</div></div><p class=\\\"pap-caption\\\">Vereinfachter PAP zum selben Algorithmus.</p>\",\"code\":\"\",\"tip\":\"In der Prüfung wird gelegentlich verlangt, denselben Algorithmus zwischen Pseudocode, Struktogramm und PAP zu übersetzen. Der sicherste Trick: identifiziere zuerst die drei Grundbausteine (wo ist die Sequenz, wo die Verzweigung, wo die Schleife) — die Notation ist dann nur noch Formsache.\",\"quiz\":[{\"q\":\"Welches Symbol steht im Programmablaufplan für eine Entscheidung?\",\"options\":[\"Rechteck\",\"Raute\",\"Oval\"],\"correct\":1,\"explain\":\"Die Raute markiert eine Verzweigung/Entscheidung im PAP; Rechtecke sind Verarbeitungsschritte, Ovale Start/Ende.\"},{\"q\":\"Was ist ein struktureller Vorteil von Struktogrammen gegenüber freien Flussdiagrammen?\",\"options\":[\"Sie sind schneller zu zeichnen\",\"Sie erzwingen strukturierte Programmierung, da keine Sprungpfeile möglich sind\",\"Sie ersetzen Pseudocode vollständig\"],\"correct\":1,\"explain\":\"Ohne Sprungpfeile lässt sich unstrukturierter GOTO-Code in einem Struktogramm gar nicht erst darstellen.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m1-l3\",\"title\":\"Vom Pseudocode zu ABAP: durchgerechnete Beispiele\",\"minutes\":10,\"body\":\"<p>Die Übersetzung von Pseudocode nach ABAP folgt klaren Mustern. Zwei komplette Beispiele:</p><p><strong>Beispiel 1 — Maximum-Suche:</strong></p>\",\"code\":\"FUNCTION findeMaximum(zahlen)\\n  maximum <- zahlen[1]\\n  FOR EACH zahl IN zahlen DO\\n    IF zahl > maximum THEN\\n      maximum <- zahl\\n    ENDIF\\n  ENDFOR\\n  RETURN maximum\\nENDFUNCTION\",\"codeLang\":\"Pseudocode\",\"code2\":\"METHOD find_maximum.\\n  rv_maximum = it_zahlen[ 1 ].\\n  LOOP AT it_zahlen INTO DATA(zahl).\\n    IF zahl > rv_maximum.\\n      rv_maximum = zahl.\\n    ENDIF.\\n  ENDLOOP.\\nENDMETHOD.\",\"code2Lang\":\"ABAP (wörtliche Übersetzung)\",\"body2\":\"<p><strong>Beispiel 2 — Durchschnitt</strong> (wörtlich vs. idiomatisch in ABAP):</p>\",\"code3\":\"FUNCTION durchschnitt(zahlen)\\n  summe <- 0\\n  FOR EACH zahl IN zahlen DO\\n    summe <- summe + zahl\\n  ENDFOR\\n  RETURN summe / LAENGE(zahlen)\\nENDFUNCTION\",\"code3Lang\":\"Pseudocode\",\"code4\":\"DATA(durchschnitt) = REDUCE decfloat34(\\n  INIT summe = CONV decfloat34( 0 )\\n  FOR zahl IN zahlen\\n  NEXT summe = summe + zahl ) / lines( zahlen ).\",\"code4Lang\":\"ABAP (idiomatisch mit REDUCE)\",\"tip\":\"In der Prüfung wird die wörtliche, prozedurale Übersetzung erwartet (Schleife + Zähler) — das ist Absicht, denn Pseudocode soll sprachunabhängig bleiben. Ein erfahrener ABAP-Entwickler greift im echten Code oft zum knapperen funktionalen Ausdruck (REDUCE) — für die Prüfung ist die wörtliche Variante nicht \\\"schlechter\\\", nur weniger idiomatisch.\",\"quiz\":[{\"q\":\"Welches ABAP-Konstrukt entspricht am ehesten FOR EACH ... IN ... DO im Pseudocode?\",\"options\":[\"LOOP AT itab INTO/ASSIGNING\",\"SELECT ... FROM\",\"WHILE sy-subrc = 0\"],\"correct\":0,\"explain\":\"LOOP AT durchläuft eine interne Tabelle analog zu FOR EACH im Pseudocode.\"},{\"q\":\"Was unterscheidet die wörtliche von der idiomatischen ABAP-Übersetzung?\",\"options\":[\"Es gibt keinen Unterschied\",\"Wörtlich folgt Schritt für Schritt dem Pseudocode, idiomatisch nutzt moderne ABAP-Ausdrücke wie REDUCE\",\"Idiomatischer Code ist immer langsamer\"],\"correct\":1,\"explain\":\"Beide Varianten sind funktional gleichwertig — idiomatisches ABAP ist nur kompakter zu lesen und zu schreiben.\"}]},{\"id\":\"abap-m1-l4\",\"title\":\"Komplexität verstehen: Big-O für Prüfung und Praxis\",\"minutes\":7,\"body\":\"<p>Big-O beschreibt, wie Laufzeit oder Ressourcenverbrauch eines Algorithmus mit wachsender Eingabegröße zunimmt — unabhängig von konkreter Hardware.</p><table class=\\\"lesson-table\\\"><tr><th>Klasse</th><th>Beispiel-Algorithmus</th><th>ABAP-Bezug</th></tr><tr><td>O(1)</td><td>Hash-Zugriff</td><td>READ TABLE ... TYPE HASHED</td></tr><tr><td>O(log n)</td><td>Binäre Suche</td><td>READ TABLE ... BINARY SEARCH / SORTED TABLE</td></tr><tr><td>O(n)</td><td>Lineares Durchsuchen</td><td>LOOP AT STANDARD TABLE</td></tr><tr><td>O(n log n)</td><td>Effizientes Sortieren</td><td>SORT itab</td></tr><tr><td>O(n²)</td><td>Verschachtelte Schleifen über dieselbe Menge</td><td>LOOP-in-LOOP ohne Schlüssel (Antipattern)</td></tr></table><p>Diese Theorie ist kein akademischer Selbstzweck: Die Wahl STANDARD- vs. SORTED- vs. HASHED-TABLE aus Modul 8 (Teil II) ist die praktische ABAP-Anwendung genau dieser Komplexitätsklassen.</p>\",\"code\":\"\",\"tip\":\"In der AP1 wird Big-O typischerweise nicht mit der O-Notation selbst abgefragt, sondern indirekt: \\\"Wie oft wird diese Schleife bei n=10 Elementen durchlaufen?\\\" Trainiere, Schleifendurchläufe konkret abzuzählen — das ist die praktische Prüfungsform der Komplexitätsanalyse.\",\"quiz\":[{\"q\":\"Welche Komplexitätsklasse hat eine einzelne Schleife über n Elemente?\",\"options\":[\"O(1)\",\"O(n)\",\"O(n²)\"],\"correct\":1,\"explain\":\"Eine einfache Schleife durchläuft jedes der n Elemente genau einmal — lineare Laufzeit O(n).\"},{\"q\":\"Welche ABAP-Tabellenart passt zur Komplexitätsklasse O(1) beim Schlüsselzugriff?\",\"options\":[\"STANDARD TABLE\",\"SORTED TABLE\",\"HASHED TABLE\"],\"correct\":2,\"explain\":\"HASHED TABLE bietet konstanten Zugriff über den Schlüssel, unabhängig von der Tabellengröße.\"}],\"codeLang\":\"abap\"}],\"course\":\"abap\"},{\"id\":\"abap-m2\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"Datenmodellierung: ER-Modell & Normalisierung\",\"lessons\":[{\"id\":\"abap-m2-l1\",\"title\":\"Entity-Relationship-Modell: Entitäten & Kardinalitäten\",\"minutes\":7,\"body\":\"<p>Das <strong>ER-Modell</strong> (nach Chen) beschreibt die Fachlichkeit unabhängig von der späteren technischen Umsetzung. Eine <strong>Entität</strong> ist ein Ding von Interesse (Kunde, Bestellung), <strong>Attribute</strong> beschreiben sie, <strong>Beziehungen</strong> verbinden Entitäten miteinander.</p><p><strong>Kardinalitäten</strong> (1:1, 1:n, n:m) beschreiben, wie viele Instanzen einer Entität mit wie vielen der anderen verknüpft sein dürfen:</p><div class=\\\"er-row\\\"><div class=\\\"er-box\\\">Kunde</div><div class=\\\"er-link\\\"><span>1 : n</span><div class=\\\"line\\\"></div><span>gibt auf</span></div><div class=\\\"er-box\\\">Bestellung</div></div><div class=\\\"er-row\\\"><div class=\\\"er-box\\\">Bestellung</div><div class=\\\"er-link\\\"><span>n : m</span><div class=\\\"line\\\"></div><span>enthält</span></div><div class=\\\"er-box\\\">Produkt</div></div><p>Eine <strong>n:m-Beziehung</strong> lässt sich nicht direkt in zwei Tabellen abbilden — bei der Umsetzung entsteht immer eine eigene <strong>Verknüpfungstabelle</strong> (hier: Bestellposition) mit Fremdschlüsseln zu beiden Seiten.</p>\",\"code\":\"\",\"tip\":\"Die AP1 fragt Kardinalitäten gerne über ein konkretes Mini-Szenario ab (\\\"Ein Kunde kann mehrere Bestellungen aufgeben, eine Bestellung gehört zu genau einem Kunden — welche Kardinalität?\\\"). Lies das Szenario in beide Richtungen: \\\"wie viele B pro A\\\" UND \\\"wie viele A pro B\\\".\",\"quiz\":[{\"q\":\"Wie wird eine n:m-Beziehung bei der Tabellenumsetzung aufgelöst?\",\"options\":[\"Gar nicht, n:m ist technisch nicht möglich\",\"Über eine eigene Verknüpfungstabelle mit Fremdschlüsseln zu beiden Seiten\",\"Durch Duplizieren aller Felder in beide Tabellen\"],\"correct\":1,\"explain\":\"Die Verknüpfungstabelle trägt die Fremdschlüssel beider Entitäten und bildet damit die n:m-Beziehung ab.\"},{\"q\":\"Was beschreibt eine Kardinalität?\",\"options\":[\"Die Anzahl der Attribute einer Entität\",\"Wie viele Instanzen einer Entität mit wie vielen einer anderen verknüpft sein dürfen\",\"Den Datentyp eines Attributs\"],\"correct\":1,\"explain\":\"Kardinalitäten (1:1, 1:n, n:m) regeln die zulässige Anzahl verknüpfter Instanzen auf beiden Seiten der Beziehung.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m2-l2\",\"title\":\"Normalisierung 1NF bis 3NF\",\"minutes\":9,\"body\":\"<p>Normalisierung reduziert Redundanz und verhindert <strong>Anomalien</strong> (Einfüge-, Änderungs-, Löschanomalien).</p><table class=\\\"lesson-table\\\"><tr><th>Normalform</th><th>Bedingung</th></tr><tr><td>1NF</td><td>Nur atomare Werte, keine Wiederholungsgruppen</td></tr><tr><td>2NF</td><td>1NF + jedes Nicht-Schlüsselattribut hängt <em>voll</em> vom gesamten (ggf. zusammengesetzten) Primärschlüssel ab</td></tr><tr><td>3NF</td><td>2NF + keine transitiven Abhängigkeiten (Nicht-Schlüsselattribut hängt nicht von einem anderen Nicht-Schlüsselattribut ab)</td></tr></table><p><strong>Beispiel:</strong> Eine Tabelle „Bestellung\\\" mit Spalten <code>kunde_name</code>, <code>kunde_adresse</code>, <code>produkt1</code>, <code>produkt2</code> verstößt gegen 1NF (Wiederholungsgruppe) und speichert <code>kunde_adresse</code> redundant (abhängig vom Kunden, nicht der Bestellung — Verstoß gegen 3NF, sobald Kunde ein eigener Schlüssel wird). Normalisiert: eigene Tabellen für Kunde, Bestellung und Bestellposition.</p>\",\"code\":\"\",\"tip\":\"In der Praxis wird bewusst GEGEN 3NF verstoßen (\\\"denormalisiert\\\") — etwa in CDS-Analytics-Views oder Reporting-Tabellen, um Lesezugriffe zu beschleunigen. Das ist kein Fehler, sondern eine bewusste, begründbare Performance-Entscheidung — in der Prüfung ist aber die \\\"reine Lehre\\\" gefragt.\",\"quiz\":[{\"q\":\"Was verhindert speziell die 2NF?\",\"options\":[\"Transitive Abhängigkeiten\",\"Teilabhängigkeiten von einem zusammengesetzten Schlüssel\",\"Nicht-atomare Werte\"],\"correct\":1,\"explain\":\"2NF fordert volle funktionale Abhängigkeit vom gesamten Primärschlüssel — keine Teilabhängigkeit von nur einem Teil eines zusammengesetzten Schlüssels.\"},{\"q\":\"Was ist eine transitive Abhängigkeit (relevant für 3NF)?\",\"options\":[\"Ein Attribut hängt vom Primärschlüssel ab\",\"Ein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut statt direkt vom Schlüssel ab\",\"Zwei Tabellen referenzieren sich gegenseitig\"],\"correct\":1,\"explain\":\"3NF verbietet genau diese indirekte Abhängigkeit über ein anderes Nicht-Schlüsselattribut.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m2-l3\",\"title\":\"Vom ER-Modell zur ABAP-Datenbanktabelle (DDIC)\",\"minutes\":7,\"body\":\"<p>In ABAP entsteht aus dem fachlichen Datenmodell eine Tabelle im <strong>ABAP Dictionary (DDIC)</strong>: Entität → Datenbanktabelle, Attribute → Felder mit Datenelementen/Domänen, Primärschlüssel → Schlüsselfelder, Beziehungen → Fremdschlüssel mit Prüftabellen.</p><p>In ABAP Cloud werden Tabellen zunehmend direkt in ADT als <strong>quelltextbasierte Database Table</strong> definiert statt im klassischen SE11-GUI:</p>\",\"code\":\"@EndUserText.label : 'Bestellungen'\\n@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE\\ndefine table zorder {\\n  key client      : abap.clnt not null;\\n  key order_id    : abap.char(10) not null;\\n  customer_id     : abap.char(10) not null;\\n  amount          : abap.dec(13,2) not null;\\n  currency        : abap.cuky not null;\\n}\",\"tip\":\"Das MANDT-Feld (hier \\\"client\\\") ist in klassischen SAP-Systemen fast immer das erste Schlüsselfeld — es trennt logisch getrennte Mandanten innerhalb derselben technischen Datenbank. Dieses Konzept bleibt auch in ABAP-Cloud-Tabellen erhalten, selbst wenn moderne Cloud-Systeme oft nur einen Mandanten nutzen.\",\"quiz\":[{\"q\":\"Wozu dient das MANDT-Feld (client)?\",\"options\":[\"Trennt logisch getrennte Mandanten innerhalb derselben technischen Datenbank\",\"Speichert das Erstellungsdatum\",\"Ist ein Performance-Index\"],\"correct\":0,\"explain\":\"MANDT ist die zentrale Mandantentrennung in SAP-Systemen — meist das erste Schlüsselfeld jeder mandantenabhängigen Tabelle.\"},{\"q\":\"Was entspricht einer ER-Beziehung in der technischen DDIC-Umsetzung?\",\"options\":[\"Ein Index\",\"Ein Fremdschlüssel (Foreign Key) mit Prüftabelle\",\"Eine Domäne\"],\"correct\":1,\"explain\":\"Fremdschlüssel mit Prüftabelle bilden die referenzielle Integrität der fachlichen Beziehung technisch ab.\"}],\"codeLang\":\"abap\"}],\"course\":\"abap\"},{\"id\":\"abap-m3\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"SQL-Grundlagen vertieft\",\"lessons\":[{\"id\":\"abap-m3-l1\",\"title\":\"DDL/DML/DCL im Überblick\",\"minutes\":6,\"body\":\"<p>SQL gliedert sich in drei Teilsprachen — ein AP1-Klassiker als Zuordnungsfrage:</p><table class=\\\"lesson-table\\\"><tr><th>Kategorie</th><th>Befehle</th><th>ABAP-Entsprechung</th></tr><tr><td>DDL (Definition)</td><td>CREATE, ALTER, DROP</td><td>DDIC/CDS define table/view entity</td></tr><tr><td>DML (Manipulation)</td><td>SELECT, INSERT, UPDATE, DELETE</td><td>Open-SQL-Statements</td></tr><tr><td>DCL (Control)</td><td>GRANT, REVOKE</td><td>PFCG-Rollen / Berechtigungsobjekte</td></tr></table><p>In ABAP wird DDL meist deklarativ im DDIC/CDS gepflegt statt per direktem CREATE-Statement; DML läuft über Open SQL; DCL entspricht dem Berechtigungskonzept.</p>\",\"code\":\"\",\"tip\":\"Merkregel: DDL definiert die \\\"Möbel\\\" (Struktur), DML bewegt die \\\"Sachen\\\" (Daten) darin, DCL entscheidet, wer welche Tür aufschließen darf (Berechtigungen).\",\"quiz\":[{\"q\":\"Zu welcher SQL-Kategorie gehört CREATE TABLE?\",\"options\":[\"DML\",\"DDL\",\"DCL\"],\"correct\":1,\"explain\":\"CREATE definiert Struktur — das ist Data Definition Language.\"},{\"q\":\"Welcher ABAP-Mechanismus entspricht am ehesten DCL?\",\"options\":[\"PFCG-Rollen/Berechtigungsobjekte\",\"Interne Tabellen\",\"CDS-Assoziationen\"],\"correct\":0,\"explain\":\"Berechtigungssteuerung in ABAP läuft über Berechtigungsobjekte und PFCG-Rollen — das DCL-Äquivalent.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m3-l2\",\"title\":\"JOIN-Typen im Detail\",\"minutes\":9,\"body\":\"<p><strong>INNER JOIN</strong> liefert nur Zeilen mit Treffer auf beiden Seiten. <strong>LEFT OUTER JOIN</strong> liefert zusätzlich alle Zeilen der linken Tabelle ohne Treffer rechts (NULL-Auffüllung). <strong>RIGHT OUTER JOIN</strong> umgekehrt. <strong>FULL OUTER JOIN</strong> kombiniert beides. <strong>CROSS JOIN</strong> bildet das kartesische Produkt — in der Praxis fast immer ein Fehler, wenn ungewollt.</p>\",\"code\":\"-- INNER JOIN: nur Kunden MIT Bestellung\\nSELECT k.name, b.betrag\\nFROM kunde k INNER JOIN bestellung b ON b.kunde_id = k.id;\\n\\n-- LEFT OUTER JOIN: alle Kunden, auch ohne Bestellung (betrag = NULL)\\nSELECT k.name, b.betrag\\nFROM kunde k LEFT OUTER JOIN bestellung b ON b.kunde_id = k.id;\",\"codeLang\":\"SQL\",\"tip\":\"Die AP1 zeigt gerne zwei Tabellen mit konkreten Beispieldaten und fragt nach dem Ergebnis eines bestimmten JOINs. Zähle systematisch: erst alle INNER-Treffer notieren, dann bei OUTER JOIN die \\\"verwaisten\\\" Zeilen der Basistabelle mit NULL ergänzen.\",\"quiz\":[{\"q\":\"Was liefert ein LEFT OUTER JOIN zusätzlich gegenüber einem INNER JOIN?\",\"options\":[\"Nur Zeilen mit Treffer auf beiden Seiten\",\"Zeilen der linken Tabelle ohne Treffer rechts, mit NULL aufgefüllt\",\"Doppelte Zeilen bei jedem Treffer\"],\"correct\":1,\"explain\":\"LEFT OUTER JOIN behält alle linken Zeilen, auch ohne passenden rechten Partner.\"},{\"q\":\"Was erzeugt ein CROSS JOIN?\",\"options\":[\"Das kartesische Produkt beider Tabellen\",\"Nur eindeutige Zeilenpaare\",\"Eine leere Ergebnismenge\"],\"correct\":0,\"explain\":\"CROSS JOIN verknüpft jede Zeile der einen mit jeder Zeile der anderen Tabelle — ohne Bedingung.\"}]},{\"id\":\"abap-m3-l3\",\"title\":\"Subqueries, Aggregatfunktionen, GROUP BY/HAVING\",\"minutes\":8,\"body\":\"<p><strong>Aggregatfunktionen</strong> (COUNT, SUM, AVG, MIN, MAX) fassen mehrere Zeilen zu einem Wert zusammen. <strong>GROUP BY</strong> definiert die Gruppierungsebene, <strong>HAVING</strong> filtert NACH der Aggregation — im Gegensatz zu WHERE, das VOR der Aggregation auf einzelnen Zeilen filtert. <strong>Subqueries</strong> können in WHERE (z. B. mit IN/EXISTS), FROM oder SELECT stehen.</p>\",\"code\":\"SELECT kunde_id, COUNT(*) AS anzahl_bestellungen\\nFROM bestellung\\nGROUP BY kunde_id\\nHAVING COUNT(*) > 5;\\n\\nSELECT name FROM kunde\\nWHERE id IN (SELECT kunde_id FROM bestellung WHERE betrag > 1000);\",\"codeLang\":\"SQL\",\"tip\":\"WHERE vs. HAVING ist ein AP1-Klassiker: WHERE filtert einzelne Zeilen vor der Gruppierung, HAVING filtert bereits aggregierte Gruppen. Ein \\\"WHERE COUNT(*) > 5\\\" ist deshalb syntaktisch ungültig — COUNT(*) existiert an der Stelle noch nicht.\",\"quiz\":[{\"q\":\"Was ist der Unterschied zwischen WHERE und HAVING?\",\"options\":[\"Kein Unterschied, beide sind austauschbar\",\"WHERE filtert vor der Aggregation einzelne Zeilen, HAVING filtert nach der Aggregation Gruppen\",\"HAVING ist nur bei INSERT erlaubt\"],\"correct\":1,\"explain\":\"HAVING kann sich auf Aggregatfunktionen wie COUNT(*) beziehen, WHERE nicht — weil WHERE vor der Gruppierung ausgewertet wird.\"},{\"q\":\"Welche Aggregatfunktion zählt die Anzahl der Zeilen?\",\"options\":[\"SUM(*)\",\"COUNT(*)\",\"AVG(*)\"],\"correct\":1,\"explain\":\"COUNT(*) zählt alle Zeilen einer Gruppe bzw. Ergebnismenge.\"}]}],\"course\":\"abap\"},{\"id\":\"abap-m4\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"Vorgehensmodelle & Software-Lifecycle\",\"lessons\":[{\"id\":\"abap-m4-l1\",\"title\":\"Wasserfall, V-Modell, Scrum/Kanban im Vergleich\",\"minutes\":8,\"body\":\"<p><strong>Wasserfallmodell:</strong> strikt sequenzielle Phasen (Anforderung → Entwurf → Implementierung → Test → Betrieb), kein planmäßiger Rücksprung — hohe Planungssicherheit, aber unflexibel bei sich ändernden Anforderungen.</p><p><strong>V-Modell (in Deutschland als V-Modell XT Standard für öffentliche IT-Projekte):</strong> erweitert den Wasserfall um zugeordnete Verifikations-/Testphasen zu jeder Entwicklungsphase — z. B. Komponententest korrespondiert mit dem Feinentwurf.</p><p><strong>Scrum:</strong> iterativ-inkrementell in Sprints, feste Rollen (Product Owner, Scrum Master, Entwicklungsteam), Artefakte (Product Backlog, Sprint Backlog). <strong>Kanban:</strong> kontinuierlicher Fluss statt fester Sprints, WIP-Limits (Work in Progress) begrenzen parallele Arbeit.</p><table class=\\\"lesson-table\\\"><tr><th>Modell</th><th>Charakteristik</th></tr><tr><td>Wasserfall</td><td>Sequenziell, kein Rücksprung, hohe Planungssicherheit</td></tr><tr><td>V-Modell</td><td>Wasserfall + explizite Verifikationsstufen</td></tr><tr><td>Scrum</td><td>Iterativ, feste Sprints, definierte Rollen</td></tr><tr><td>Kanban</td><td>Kontinuierlicher Fluss, WIP-Limits</td></tr></table>\",\"code\":\"\",\"tip\":\"Prüfungsfragen fragen oft nach dem \\\"passenden\\\" Modell für ein Szenario. Faustregel: stabile, vorab vollständig bekannte Anforderungen → Wasserfall/V-Modell; sich häufig ändernde Anforderungen, enger Kundenkontakt → Scrum/Kanban.\",\"quiz\":[{\"q\":\"Was ist ein zentrales Merkmal des Wasserfallmodells?\",\"options\":[\"Kurze Sprints mit täglichen Meetings\",\"Strikt sequenzielle Phasen ohne planmäßigen Rücksprung\",\"Kontinuierlicher Fluss ohne feste Phasen\"],\"correct\":1,\"explain\":\"Der Wasserfall durchläuft die Phasen einmal, streng nacheinander.\"},{\"q\":\"Welches Element gehört zu Scrum?\",\"options\":[\"WIP-Limit\",\"Sprint Backlog\",\"V-Modell-Meilenstein\"],\"correct\":1,\"explain\":\"Sprint Backlog ist ein zentrales Scrum-Artefakt; WIP-Limits gehören zu Kanban.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m4-l2\",\"title\":\"Lasten-/Pflichtenheft & Anforderungsanalyse\",\"minutes\":6,\"body\":\"<p><strong>Lastenheft</strong> — vom <strong>Auftraggeber</strong> erstellt, beschreibt WAS gebraucht wird (Anforderungen aus fachlicher Sicht). <strong>Pflichtenheft</strong> — vom <strong>Auftragnehmer</strong> erstellt, beschreibt WIE die Anforderungen technisch umgesetzt werden.</p><p>Anforderungen werden unterschieden in <strong>funktional</strong> (was das System tun soll) vs. <strong>nicht-funktional</strong> (Performance, Sicherheit, Usability, Verfügbarkeit). Priorisierung häufig nach <strong>MoSCoW</strong>: Must have, Should have, Could have, Won’t have.</p>\",\"code\":\"\",\"tip\":\"Merksatz: Lastenheft = \\\"Auftrag-GEBER LASTet dem Anbieter seine Wünsche auf\\\" — WAS. Pflichtenheft = \\\"Auftrag-NEHMER verpflichtet sich zur konkreten Umsetzung\\\" — WIE.\",\"quiz\":[{\"q\":\"Wer erstellt üblicherweise das Lastenheft?\",\"options\":[\"Der Auftraggeber\",\"Der Auftragnehmer\",\"Die IHK\"],\"correct\":0,\"explain\":\"Das Lastenheft beschreibt die Anforderungen aus Sicht des Auftraggebers.\"},{\"q\":\"Was ist ein Beispiel für eine nicht-funktionale Anforderung?\",\"options\":[\"Der Nutzer kann eine Bestellung anlegen\",\"Antwortzeit unter 200ms\",\"Berechnung der Mehrwertsteuer\"],\"correct\":1,\"explain\":\"Performance-Anforderungen sind klassisch nicht-funktional — sie beschreiben Qualitätseigenschaften, keine konkrete Funktion.\"}],\"codeLang\":\"abap\"}],\"course\":\"abap\"},{\"id\":\"abap-m5\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"UML für Anwendungsentwickler\",\"lessons\":[{\"id\":\"abap-m5-l1\",\"title\":\"Use-Case-Diagramme lesen und erstellen\",\"minutes\":6,\"body\":\"<p>Ein Use-Case-Diagramm zeigt <strong>Akteure</strong> (außerhalb der Systemgrenze) und <strong>Anwendungsfälle</strong> (Ellipsen, innerhalb der Systemgrenze), verbunden durch Assoziationslinien. Die Systemgrenze wird als Rechteck um alle Use Cases gezeichnet.</p><ul><li><code>&lt;&lt;include&gt;&gt;</code> — bindet einen immer mit ausgeführten Teilanwendungsfall ein (z. B. \\\"Bestellung aufgeben\\\" includes \\\"Zahlung prüfen\\\").</li><li><code>&lt;&lt;extend&gt;&gt;</code> — bindet einen optionalen, bedingt ausgeführten Anwendungsfall ein (z. B. \\\"Bestellung aufgeben\\\" extend \\\"Gutschein einlösen\\\").</li></ul>\",\"code\":\"\",\"tip\":\"Verwechslungsgefahr: <<include>> ist verpflichtend und wird vom Basis-Use-Case aus \\\"aufgerufen\\\"; <<extend>> ist optional und wird vom erweiternden Use-Case aus auf den Basis-Use-Case \\\"draufgesetzt\\\". Die Pfeilrichtung ist bei beiden meist zum eingebundenen Use Case hin — der Unterschied liegt in der Verbindlichkeit.\",\"quiz\":[{\"q\":\"Was verbindet <<include>> zwischen zwei Use Cases?\",\"options\":[\"Ein optionaler Teilanwendungsfall\",\"Ein immer mit ausgeführter Teilanwendungsfall\",\"Eine Vererbungsbeziehung\"],\"correct\":1,\"explain\":\"<<include>> markiert einen zwingend mit ausgeführten Bestandteil des Basis-Use-Case.\"},{\"q\":\"Wo werden Akteure in einem Use-Case-Diagramm platziert?\",\"options\":[\"Innerhalb der Systemgrenze\",\"Außerhalb der Systemgrenze\",\"Es gibt keine Systemgrenze\"],\"correct\":1,\"explain\":\"Akteure stehen außerhalb des Systemrechtecks und interagieren von dort mit den Use Cases.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m5-l2\",\"title\":\"Klassendiagramme: Notation & Beziehungstypen\",\"minutes\":9,\"body\":\"<p>Eine Klasse wird als Rechteck mit drei Feldern dargestellt: Klassenname, Attribute, Methoden. Sichtbarkeiten: <code>+</code> public, <code>-</code> private, <code>#</code> protected — entspricht ABAPs PUBLIC/PRIVATE/PROTECTED SECTION.</p><table class=\\\"lesson-table\\\"><tr><th>UML-Beziehung</th><th>Notation</th><th>ABAP-Äquivalent</th></tr><tr><td>Assoziation</td><td>Einfache Linie</td><td>Referenz-Attribut (\\\"kennt\\\")</td></tr><tr><td>Aggregation</td><td>Offene Raute</td><td>\\\"hat-ein\\\", Teile unabhängig existenzfähig</td></tr><tr><td>Komposition</td><td>Gefüllte Raute</td><td>\\\"hat-ein\\\", Teile existenzabhängig vom Ganzen</td></tr><tr><td>Vererbung (Generalisierung)</td><td>Pfeil, geschlossene Spitze</td><td>INHERITING FROM</td></tr><tr><td>Realisierung</td><td>Gestrichelter Pfeil, geschlossene Spitze</td><td>INTERFACES</td></tr></table>\",\"code\":\"\",\"tip\":\"Komposition vs. Aggregation ist der häufigste Stolperstein: Bei Komposition stirbt der Teil mit dem Ganzen (ein \\\"Bestellposition\\\"-Objekt existiert nicht ohne seine \\\"Bestellung\\\"), bei Aggregation kann der Teil unabhängig weiterexistieren (ein \\\"Mitarbeiter\\\" existiert auch ohne seine \\\"Abteilung\\\").\",\"quiz\":[{\"q\":\"Welche UML-Beziehung entspricht in ABAP INHERITING FROM?\",\"options\":[\"Aggregation\",\"Vererbung (Generalisierung)\",\"Assoziation\"],\"correct\":1,\"explain\":\"Vererbung wird in UML als Pfeil mit geschlossener Spitze dargestellt, in ABAP über INHERITING FROM umgesetzt.\"},{\"q\":\"Was unterscheidet Komposition von Aggregation?\",\"options\":[\"Kein Unterschied, nur andere Symbole\",\"Bei Komposition ist der Teil existenzabhängig vom Ganzen, bei Aggregation nicht\",\"Komposition erlaubt keine Attribute\"],\"correct\":1,\"explain\":\"Die Existenzabhängigkeit ist das entscheidende Unterscheidungsmerkmal zwischen beiden \\\"hat-ein\\\"-Beziehungen.\"}],\"codeLang\":\"abap\"}],\"course\":\"abap\"},{\"id\":\"abap-m6\",\"part\":12,\"partTitle\":\"ABAP · AP1-Fundamente: Algorithmisches Denken\",\"title\":\"Testtheorie & Qualitätssicherung\",\"lessons\":[{\"id\":\"abap-m6-l1\",\"title\":\"Black-Box vs. White-Box, Äquivalenzklassen, Grenzwertanalyse\",\"minutes\":8,\"body\":\"<p><strong>White-Box-Tests</strong> kennen den internen Code (z. B. Zweigüberdeckung/Branch Coverage). <strong>Black-Box-Tests</strong> kennen nur Ein-/Ausgabe, nicht die Implementierung.</p><p><strong>Äquivalenzklassenbildung</strong> reduziert Testfälle: Eingabewerte mit gleichem erwarteten Verhalten werden gruppiert, ein Vertreter je Klasse reicht. <strong>Grenzwertanalyse</strong> testet gezielt an den Rändern der Klassen — Fehler häufen sich erfahrungsgemäß genau dort.</p><p><strong>Beispiel:</strong> Gültiger Eingabebereich 1–100 → Klassen: &lt;1 (ungültig), 1–100 (gültig), &gt;100 (ungültig). Grenzwerte zum Testen: 0, 1, 100, 101.</p>\",\"code\":\"\",\"tip\":\"Die Kombination aus Äquivalenzklassen (repräsentative Werte je Klasse) und Grenzwertanalyse (Ränder jeder Klasse) ist die effizienteste Methode, um mit minimaler Testfallzahl maximale Fehlerabdeckung zu erreichen — das ist auch in der Praxis, nicht nur der Prüfung, der Standardansatz.\",\"quiz\":[{\"q\":\"Was testet die Grenzwertanalyse gezielt?\",\"options\":[\"Zufällige Werte innerhalb einer Klasse\",\"Werte an den Rändern von Äquivalenzklassen\",\"Nur ungültige Eingaben\"],\"correct\":1,\"explain\":\"Fehler häufen sich an den Grenzen gültiger Bereiche — genau dort setzt die Grenzwertanalyse an.\"},{\"q\":\"Was ist ein Merkmal von White-Box-Tests?\",\"options\":[\"Kenntnis der internen Codestruktur\",\"Vollständige Unkenntnis der Implementierung\",\"Nur manuelle Tests ohne Automatisierung\"],\"correct\":0,\"explain\":\"White-Box-Tests nutzen Wissen über den internen Aufbau, z. B. um Zweigüberdeckung zu messen.\"}],\"codeLang\":\"abap\"},{\"id\":\"abap-m6-l2\",\"title\":\"Testpyramide & Testarten mit ABAP-Unit-Bezug\",\"minutes\":6,\"body\":\"<p>Die <strong>Testpyramide</strong> empfiehlt viele schnelle <strong>Unit-Tests</strong> (breite Basis), weniger <strong>Integrationstests</strong> (Mitte), wenige langsame <strong>End-to-End/Akzeptanztests</strong> (Spitze). Ein umgekehrtes Verhältnis (\\\"Ice-Cream-Cone\\\") gilt als Antipattern — es macht die Testsuite langsam und fehleranfällig.</p><p>In ABAP: Unit-Tests = <strong>ABAP Unit</strong> (isolierte Klassen, Test Doubles), Integrationstests = z. B. komplette RAP-Business-Objects inkl. Datenbank, Akzeptanztests = oft manuell oder über UI-Testautomatisierung.</p>\",\"code\":\"\",\"tip\":\"Wenn ein Team hauptsächlich über langsame, brüchige UI-Tests Vertrauen in seinen Code gewinnt, ist das ein verlässliches Warnsignal für zu wenig Unit-Test-Abdeckung an der Basis — unabhängig von der verwendeten Sprache.\",\"quiz\":[{\"q\":\"Welche Testart bildet laut Testpyramide die breite Basis?\",\"options\":[\"End-to-End-Tests\",\"Unit-Tests\",\"Manuelle Akzeptanztests\"],\"correct\":1,\"explain\":\"Unit-Tests sind schnell und zahlreich — sie bilden das Fundament der Pyramide.\"},{\"q\":\"Was gilt als Antipattern zur Testpyramide?\",\"options\":[\"Viele Unit-Tests, wenige UI-Tests\",\"Viele langsame UI-/End-to-End-Tests bei wenigen Unit-Tests (Ice-Cream-Cone)\",\"Automatisierte Tests generell\"],\"correct\":1,\"explain\":\"Das umgekehrte Verhältnis macht Tests langsam, teuer und schwer wartbar.\"}],\"codeLang\":\"abap\"}],\"course\":\"abap\"},{\"id\":\"abap-m7\",\"part\":13,\"partTitle\":\"ABAP · ABAP-Sprachkern vertieft\",\"title\":\"Syntax, Typsystem & moderne Sprachkonstrukte\",\"lessons\":[{\"title\":\"ABAP lesen: Variablen, Datentypen und Entscheidungen\",\"minutes\":18,\"body\":\"<p>Ein ABAP-Programm besteht aus Anweisungen, die mit einem Punkt enden. Ein Zeilenumbruch beendet eine Anweisung dagegen nicht. Mit DATA legst du eine veränderbare Variable an; TYPE bestimmt ihren Datentyp. Für ganze Stückzahlen eignet sich i, für einen variablen Text string. Ein Kommentar beginnt mitten in einer Zeile mit einem doppelten Anführungszeichen. Kommentare erklären den Zweck, verändern aber nicht das Ergebnis.</p><p>Unser Beispiel prüft einen kleinen Warenkorb: Drei Hefte kosten jeweils vier Euro. menge und einzelpreis enthalten ganze Zahlen, gesamt wird durch Multiplikation zu 12. IF gesamt &gt;= 10 wählt deshalb den Text 'Versandkostenfrei'. Bei zwei Heften wäre gesamt gleich 8 und ELSE würde den anderen Text setzen. Verfolge zuerst diese Werte auf Papier, bevor du ausführst.</p><p>Die expliziten Deklarationen sind für den Einstieg absichtlich ausführlich. DATA(status) = ... wäre an geeigneten Stellen eine Kurzform mit abgeleitetem Typ; für die ersten Schritte ist wichtiger, Typ, Name und Wert auseinanderzuhalten. Für reale Preise mit Nachkommastellen brauchst du einen passenden Dezimaltyp und fachliche Regeln zu Währung und Rundung. Der ganzzahlige Preis hier vereinfacht nur das Lernbeispiel.</p><p>Praxisaufgabe: Ändere die Menge zunächst auf 2 und dann auf 0. Notiere jeweils gesamt und status. Ergänze vor der Versandentscheidung eine eigene Prüfung, die eine negative Menge als ungültig erkennt. Der Code ist ein Methodenrumpf für eine vorbereitete ADT-Konsolenklasse; out wird dort durch if_oo_adt_classrun~main bereitgestellt und ist kein frei verfügbares Schlüsselwort.</p>\",\"code\":\"DATA menge TYPE i VALUE 3.\\nDATA einzelpreis TYPE i VALUE 4.\\nDATA gesamt TYPE i.\\nDATA status TYPE string.\\n\\ngesamt = menge * einzelpreis.\\nIF gesamt >= 10.\\n  status = `Versandkostenfrei`.\\nELSE.\\n  status = `Versandkosten fallen an`.\\nENDIF.\\nout->write( gesamt ).\\nout->write( status ).\",\"codeLang\":\"abap\",\"tip\":\"Starte mit expliziten Typen und einfachen Zuweisungen. RAP, CDS, Vererbung und komplexe Ausdrücke gehören nicht in diese erste Syntaxlektion.\",\"quiz\":[{\"q\":\"Was beendet eine ABAP-Anweisung?\",\"options\":[\"Ein Punkt\",\"Jeder Zeilenumbruch\",\"Eine schließende geschweifte Klammer\"],\"correct\":0,\"explain\":\"Der Punkt beendet die Anweisung; dieselbe Anweisung kann sich über mehrere Zeilen erstrecken.\"},{\"q\":\"Welchen Wert hat gesamt bei menge = 2 und einzelpreis = 4?\",\"options\":[\"6\",\"8\",\"12\"],\"correct\":1,\"explain\":\"Die Multiplikation ergibt 8. Die Bedingung gesamt >= 10 ist damit falsch.\"}],\"sources\":[{\"title\":\"SAP Learning: Understanding the Basics of ABAP\",\"url\":\"https://learning.sap.com/courses/basic-abap-programming/understanding-the-basics-of-abap_c0e5346f-a136-4b9f-a167-9031eca12932\",\"access\":\"Lesetext ohne Anmeldung abgerufen; praktische Ausführung braucht ein ABAP-System und Berechtigungen.\"},{\"title\":\"SAP Learning: Learning Basic ABAP Programming\",\"url\":\"https://learning.sap.com/courses/basic-abap-programming\",\"access\":\"Kursübersicht frei lesbar; Fortschritt und persönliche Lernergebnisse können eine Anmeldung erfordern; kein kostenloses Übungssystem zugesichert.\"}],\"id\":\"abap-m7-quellen-abap-lesen-variablen-datentypen-und-entscheidungen\",\"body2\":\"<section class=\\\"callout\\\"><h3>Kostenlose Originalquellen und Zugang</h3><ul><li><a href=\\\"https://learning.sap.com/courses/basic-abap-programming/understanding-the-basics-of-abap_c0e5346f-a136-4b9f-a167-9031eca12932\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">SAP Learning: Understanding the Basics of ABAP</a><p>Lesetext ohne Anmeldung abgerufen; praktische Ausführung braucht ein ABAP-System und Berechtigungen.</p></li><li><a href=\\\"https://learning.sap.com/courses/basic-abap-programming\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">SAP Learning: Learning Basic ABAP Programming</a><p>Kursübersicht frei lesbar; Fortschritt und persönliche Lernergebnisse können eine Anmeldung erfordern; kein kostenloses Übungssystem zugesichert.</p></li></ul><p>Recherche: 06.11.2026. Eigenständige deutsche Zusammenfassung und Aufgaben, keine vollständige Kurskopie. Beispielcode wurde nicht in einem SAP-System kompiliert. Angebote und Systemvoraussetzungen können sich ändern.</p></section>\",\"order\":[\"body\",\"code\",\"body2\"],\"researchedAt\":\"2026-11-06\"},{\"id\":\"abap-m7-l0\",\"title\":\"Dein erstes ABAP-Programm\",\"minutes\":8,\"order\":[\"body\",\"code\",\"body2\",\"code2\",\"body3\"],\"body\":\"<p>Bevor es in die Tiefe geht: So sieht ABAP in der Praxis aus, wenn du es zum ersten Mal ausführst. Es gibt zwei Wege — und der ältere ist nicht mehr der empfohlene.</p><p><strong>Der klassische Weg</strong> ist ein <em>Report</em>: eine Datei, die mit <code>REPORT</code> beginnt und mit <code>WRITE</code> direkt auf eine Listenausgabe schreibt. Das siehst du in jedem gewachsenen System — und du musst es lesen können.</p>\",\"code\":\"REPORT z_hallo_welt.\\n\\n* Diese ganze Zeile ist ein Kommentar (Stern in Spalte 1)\\nDATA name TYPE string.          \\\" Kommentar bis Zeilenende\\n\\nname = 'ABAP'.\\nWRITE: / 'Hallo', name.\\nWRITE: / 'Zeichen im Namen:', strlen( name ).\",\"codeLang\":\"ABAP (klassisch)\",\"body2\":\"<p><strong>Der moderne Weg</strong> — und in ABAP Cloud der einzige, denn <code>WRITE</code> existiert dort nicht mehr — ist eine ausführbare Klasse. Sie implementiert das Interface <code>IF_OO_ADT_CLASSRUN</code>, das die Methode <code>main</code> vorgibt. In den ABAP Development Tools startest du sie mit <strong>F9</strong>, die Ausgabe erscheint in der Konsolen-View.</p>\",\"code2\":\"CLASS zcl_hallo_welt DEFINITION PUBLIC FINAL CREATE PUBLIC.\\n  PUBLIC SECTION.\\n    INTERFACES if_oo_adt_classrun.\\nENDCLASS.\\n\\nCLASS zcl_hallo_welt IMPLEMENTATION.\\n  METHOD if_oo_adt_classrun~main.\\n    DATA(name) = 'ABAP'.\\n\\n    out->write( |Hallo { name }| ).\\n    out->write( |Zeichen im Namen: { strlen( name ) }| ).\\n\\n    \\\" Auch ganze Strukturen und Tabellen lassen sich ausgeben:\\n    out->write( VALUE string_table( ( `erste Zeile` ) ( `zweite Zeile` ) ) ).\\n  ENDMETHOD.\\nENDCLASS.\",\"code2Lang\":\"ABAP (modern, ABAP Cloud)\",\"body3\":\"<p>Drei Dinge, die dir ab jetzt in jeder Zeile begegnen:</p><ul><li><strong>Jede Anweisung endet mit einem Punkt.</strong> Nicht mit Semikolon, nicht mit Zeilenumbruch. Ein fehlender Punkt ist der häufigste Syntaxfehler von Einsteigern.</li><li><strong>Zwei Kommentarformen:</strong> <code>*</code> in Spalte 1 kommentiert die ganze Zeile aus, ein doppeltes Anführungszeichen <code>\\\"</code> den Rest der Zeile ab dieser Stelle.</li><li><strong>ABAP ist nicht case-sensitiv</strong> bei Schlüsselwörtern und Namen — <code>DATA</code> und <code>data</code> sind identisch. Konvention ist trotzdem: Schlüsselwörter groß, eigene Namen klein. Der Pretty Printer in ADT (<code>Shift+F1</code>) stellt das automatisch her.</li></ul><p>Zum Debuggen setzt du in ADT per Doppelklick auf den Zeilenrand einen Breakpoint und startest wieder mit F9. Mit <code>F5</code> gehst du in eine Methode hinein, mit <code>F6</code> über sie hinweg — dieselbe Belegung wie in den meisten IDEs.</p>\",\"tip\":\"Wenn du heute mit ABAP anfängst, starte direkt mit der Klassen-Variante über IF_OO_ADT_CLASSRUN. Nicht aus Stilgründen, sondern aus einem harten technischen Grund: In ABAP Cloud (und damit in allem, was künftig upgradefähig bleiben soll) ist WRITE schlicht nicht mehr erlaubt. Wer sich das Report-Denken erst antrainiert, muss es später wieder verlernen.\",\"quiz\":[{\"q\":\"Womit endet in ABAP jede einzelne Anweisung?\",\"options\":[\"Mit einem Semikolon\",\"Mit einem Punkt\",\"Mit einem Zeilenumbruch\"],\"correct\":1,\"explain\":\"Der Punkt schließt jede Anweisung ab — eine Anweisung darf sich dafür über beliebig viele Zeilen erstrecken.\"},{\"q\":\"Welches Interface macht eine Klasse in den ABAP Development Tools direkt per F9 ausführbar?\",\"options\":[\"IF_OO_ADT_CLASSRUN\",\"IF_AMDP_MARKER_HDB\",\"IF_SERIALIZABLE_OBJECT\"],\"correct\":0,\"explain\":\"IF_OO_ADT_CLASSRUN gibt die Methode main( ) vor und stellt über out->write( ) die Konsolenausgabe bereit — der moderne Ersatz für den klassischen Report mit WRITE.\"}]},{\"id\":\"abap-m7-l1\",\"title\":\"Typsystem im Detail: Referenz- vs. Wertsemantik\",\"minutes\":8,\"body\":\"<p>ABAP-Variablen sind standardmäßig <strong>wertbasiert</strong> — eine Zuweisung kopiert den Inhalt. <strong>Referenztypen</strong> (<code>TYPE REF TO</code>) verhalten sich anders: die V";
