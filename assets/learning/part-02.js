MODULES.push({
  id:'m12', part:4, partTitle:'Netzwerktechnik', title:'IPv4 & Subnetting', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m12-l1', title:'Aufbau der IPv4-Adresse und Subnetzmaske', minutes:9,
      body:
        '<p>Eine <strong>IPv4-Adresse</strong> besteht aus <strong>32 Bit</strong>, notiert als vier Oktette von 0 bis 255. Sie zerfällt in <strong>Netzanteil</strong> und <strong>Hostanteil</strong>; wo die Grenze liegt, bestimmt die <strong>Subnetzmaske</strong>.</p>'+
        '<p>Die <strong>CIDR-Notation</strong> <code>/24</code> gibt an, wie viele Bits von links zum Netzanteil gehören. <code>/24</code> bedeutet also 24 Einsen:</p>'+
        '<p><code>11111111.11111111.11111111.00000000 = 255.255.255.0</code></p>'+
        '<p>Die <strong>Oktett-Werte</strong> ergeben sich aus den gesetzten Bits von links: <strong>128 – 192 – 224 – 240 – 248 – 252 – 254 – 255</strong>. Diese Zahlenreihe solltest du auswendig können, sie löst jede Maskenfrage.</p>'+
        '<p><strong>Private Bereiche (RFC 1918)</strong> – im Internet nicht routbar, dafür braucht es NAT:</p>'+
        '<ul><li><code>10.0.0.0/8</code></li><li><code>172.16.0.0/12</code> (also 172.16 bis 172.31)</li><li><code>192.168.0.0/16</code></li></ul>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Binaere Aufteilung einer IPv4-Adresse in Netz- und Hostanteil"><text class="s-hd" x="20" y="22">192.168.30.150 / 26</text><rect class="s-netpart" x="20" y="34" width="360" height="34" rx="3"/><rect class="s-hostpart" x="380" y="34" width="160" height="34" rx="3"/><text class="s-mono" x="200" y="56" text-anchor="middle">11000000.10101000.00011110.10</text><text class="s-mono" x="460" y="56" text-anchor="middle">010110</text><text class="s-lbl" x="200" y="86" text-anchor="middle">Netzanteil &#8211; 26 Bit</text><text class="s-lbl" x="460" y="86" text-anchor="middle">Hostanteil &#8211; 6 Bit</text><rect class="s-netpart" x="20" y="104" width="360" height="30" rx="3"/><rect class="s-box" x="380" y="104" width="160" height="30" rx="3"/><text class="s-mono" x="200" y="124" text-anchor="middle">11111111.11111111.11111111.11</text><text class="s-mono" x="460" y="124" text-anchor="middle">000000</text><text class="s-lbl" x="20" y="152">Maske 255.255.255.192</text><text class="s-lbl" x="20" y="176">Hostbits alle 0 &#8594; Netzadresse .128 &#160;&#160;&#183;&#160;&#160; alle 1 &#8594; Broadcast .191 &#160;&#160;&#183;&#160;&#160; 2&#8310; &#8722; 2 = 62 Hosts</text></svg><figcaption>Die Subnetzmaske zieht die Grenze zwischen Netz- und Hostanteil. Alles rechts der Grenze gehoert dem Host, und genau diese Bits werden fuer Netz- und Broadcastadresse auf 0 bzw. 1 gesetzt.</figcaption></figure>',
      code:
        "Die Praefixe, die du auswendig koennen solltest:\n\n"+
        "  /24 -> 255.255.255.0    -> 2^8 - 2 = 254 Hosts\n"+
        "  /25 -> 255.255.255.128  -> 2^7 - 2 = 126 Hosts\n"+
        "  /26 -> 255.255.255.192  -> 2^6 - 2 =  62 Hosts\n"+
        "  /27 -> 255.255.255.224  -> 2^5 - 2 =  30 Hosts\n"+
        "  /28 -> 255.255.255.240  -> 2^4 - 2 =  14 Hosts\n"+
        "  /29 -> 255.255.255.248  -> 2^3 - 2 =   6 Hosts\n"+
        "  /30 -> 255.255.255.252  -> 2^2 - 2 =   2 Hosts (Punkt-zu-Punkt)",
      codeLang:'Subnetzmasken',
      tip:'Diese sieben Zeilen sind die beste Investition deiner Lernzeit im Netzwerkteil. Mit ihnen beantwortest du drei Aufgabentypen ohne zu rechnen: Maske zu Präfix, Präfix zu Hostanzahl und Hostbedarf zu Präfix. Schreib sie dir zu Prüfungsbeginn auf das Konzeptpapier, bevor du die erste Aufgabe liest – dann stehen sie dir unter Zeitdruck fehlerfrei zur Verfügung.',
      quiz:[
        {q:'Welche Subnetzmaske entspricht /26?', options:['255.255.255.0','255.255.255.192','255.255.255.240'], correct:1, explain:'26 gesetzte Bits: 255.255.255.192 – im letzten Oktett 11000000.'},
        {q:'Wie viele nutzbare Hosts hat ein /27-Netz?', options:['32','30','62'], correct:1, explain:'2^5 = 32, minus Netz- und Broadcastadresse = 30.'},
        {q:'Wie viele Hostbits hat ein /29-Netz?', options:['3','5','8'], correct:0, explain:'32 − 29 = 3, also 2³ − 2 = 6 nutzbare Hosts.'}
      ]
    },
    {
      id:'m12-l2', title:'Netzadresse, Broadcast und nutzbare Hosts berechnen', minutes:10,
      body:
        '<p>Drei Werte musst du aus jeder Adresse ableiten können:</p>'+
        '<ul><li><strong>Netzadresse</strong> – alle Host-Bits auf <strong>0</strong>. Bezeichnet das Netz selbst, wird nie an ein Gerät vergeben.</li>'+
        '<li><strong>Broadcast-Adresse</strong> – alle Host-Bits auf <strong>1</strong>. Erreicht alle Geräte im Segment, wird ebenfalls nie vergeben.</li>'+
        '<li><strong>Nutzbare Hosts</strong> – alles dazwischen: <code>2^(Host-Bits) − 2</code>.</li></ul>'+
        '<p>Formal berechnet man die Netzadresse über eine <strong>UND-Verknüpfung</strong> von IP und Maske, die Broadcast-Adresse über eine <strong>ODER-Verknüpfung</strong> mit der invertierten Maske. Bei glatten Masken wie /24 sieht man das Ergebnis direkt.</p>',
      code:
        "Gegeben: 192.168.0.52 / 255.255.255.0  (= /24)\n\n"+
        "  Netzadresse:      192.168.0.0      (Hostanteil alles 0)\n"+
        "  Erster Host:      192.168.0.1\n"+
        "  Letzter Host:     192.168.0.254\n"+
        "  Broadcast:        192.168.0.255    (Hostanteil alles 1)\n"+
        "  Nutzbare Hosts:   2^8 - 2 = 254\n\n"+
        "Gegeben: 192.168.10.100 / 26    (Maske 255.255.255.192)\n"+
        "  Blockgroesse: 256 - 192 = 64  -> Netze bei .0  .64  .128  .192\n"+
        "  .100 liegt im Netz  192.168.10.64\n"+
        "  Broadcast:          192.168.10.127\n"+
        "  Hostbereich:        192.168.10.65 bis 192.168.10.126",
      codeLang:'Subnetting-Rechnung',
      tip:'Die Blockgröße ist der schnellste Weg durch jede Subnetting-Aufgabe: Rechne 256 minus den Maskenwert des interessanten Oktetts. Bei /26 also 256 − 192 = 64. Die Netze beginnen dann bei Vielfachen dieser Zahl – 0, 64, 128, 192. Du suchst nur noch, in welchen Block deine Adresse fällt. Das dauert zehn Sekunden und ersetzt jede Binärrechnung.',
      quiz:[
        {q:'Wie lautet die Broadcast-Adresse zu 192.168.0.52/24?', options:['192.168.0.0','192.168.0.255','192.168.255.255'], correct:1, explain:'Der Hostanteil wird auf alles Eins gesetzt.'},
        {q:'Warum werden bei der Hostzahl zwei Adressen abgezogen?', options:['Für Router und Switch','Für Netzadresse und Broadcast-Adresse','Als Sicherheitsreserve'], correct:1, explain:'Beide sind reserviert und dürfen keinem Gerät zugewiesen werden.'},
        {q:'Wie ermittelt man die Broadcast-Adresse am schnellsten?', options:['Immer .255','Nächste Netzadresse minus 1','Netzadresse plus 100'], correct:1, explain:'.255 gilt nur bei /24 — bei /26 wäre es .63, .127, .191 oder .255.'}
      ]
    },
    {
      id:'m12-l3', title:'Subnetze bilden – vom Bedarf zur Maske', minutes:10,
      body:
        '<p>Die Aufgabenform lautet meist: „Teilen Sie <code>192.168.1.0/24</code> in vier gleich große Subnetze" oder „Jedes Subnetz soll mindestens 30 Hosts aufnehmen".</p>'+
        '<p><strong>Weg 1 – Anzahl der Subnetze ist vorgegeben:</strong> Du brauchst so viele zusätzliche Netzbits, dass <code>2^x ≥ Anzahl</code>. Für 4 Subnetze also x = 2 → aus /24 wird /26.</p>'+
        '<p><strong>Weg 2 – Hostzahl ist vorgegeben:</strong> Du brauchst so viele Hostbits, dass <code>2^y − 2 ≥ Hostbedarf</code>. Für 30 Hosts also y = 5 → Präfix = 32 − 5 = /27.</p>'+
        '<p>Die Probe: Subnetzbits plus Hostbits ergeben zusammen immer die Bits, die im ursprünglichen Netz für Hosts zur Verfügung standen.</p>',
      code:
        "Aufgabe: 192.168.1.0/24 in 4 gleich grosse Subnetze teilen.\n\n"+
        "  2^2 = 4  ->  2 zusaetzliche Netzbits  ->  /24 + 2 = /26\n"+
        "  Maske 255.255.255.192, Blockgroesse 256 - 192 = 64\n\n"+
        "  Subnetz 1: 192.168.1.0    Hosts .1   - .62    Broadcast .63\n"+
        "  Subnetz 2: 192.168.1.64   Hosts .65  - .126   Broadcast .127\n"+
        "  Subnetz 3: 192.168.1.128  Hosts .129 - .190   Broadcast .191\n"+
        "  Subnetz 4: 192.168.1.192  Hosts .193 - .254   Broadcast .255\n\n"+
        "  Probe: 4 Subnetze x 62 Hosts = 248 nutzbare Adressen (von 256)",
      codeLang:'Subnetting',
      tip:'Achte auf die Richtung der Rundung, das ist der häufigste Fehler: Bei der Anzahl der Subnetze rundest du die Zweierpotenz nach oben – für fünf Subnetze brauchst du 2³ = 8, nicht 2² = 4. Bei der Hostzahl gilt dasselbe: Für 30 Hosts reichen 2⁵ − 2 = 30 exakt, für 31 Hosts bräuchtest du schon 2⁶ − 2 = 62. Lieber einmal zu großzügig als ein Netz zu klein.',
      quiz:[
        {q:'Ein Netz soll in 8 Subnetze geteilt werden. Wie viele zusätzliche Netzbits?', options:['2','3','8'], correct:1, explain:'2³ = 8 – also drei zusätzliche Bits.'},
        {q:'Jedes Subnetz braucht mindestens 50 Hosts. Welches Präfix?', options:['/26','/27','/28'], correct:0, explain:'2^6 − 2 = 62 ≥ 50; /27 böte nur 30 Hosts.'},
        {q:'Ein Netz soll in 6 Subnetze geteilt werden. Wie viele zusätzliche Netzbits?', options:['2','3','6'], correct:1, explain:'2³ = 8 ≥ 6 — bei der Subnetzanzahl wird immer aufgerundet.'}
      ]
    },
    {
      id:'m12-l4', title:'Statische Konfiguration und Sonderadressen', minutes:8,
      body:
        '<p>Eine klassische Prüfungsaufgabe: Ein Gerät soll eine <strong>statische IP</strong> bekommen, damit es für die Fernwartung immer unter derselben Adresse erreichbar ist. Gegeben sind Netz, DHCP-Bereich und Router – gesucht ist eine gültige freie Adresse.</p>'+
        '<p>Drei Bereiche musst du ausschließen:</p>'+
        '<ul><li>die <strong>Netzadresse</strong> (.0) und die <strong>Broadcast-Adresse</strong> (.255),</li>'+
        '<li>die Adresse des <strong>Routers</strong> (meist .1),</li>'+
        '<li>den gesamten <strong>DHCP-Pool</strong> – eine statische Adresse darin führt zum Adresskonflikt.</li></ul>'+
        '<p><strong>Sonderadressen</strong>, die du sofort deuten können musst:</p>'+
        '<ul><li><code>127.0.0.1</code> – Loopback, das bist du selbst.</li>'+
        '<li><code>169.254.x.x</code> – <strong>APIPA</strong>: Der Client hat keinen DHCP-Server gefunden und sich selbst eine Adresse gegeben. Kein Gateway, kein Internet.</li>'+
        '<li><code>0.0.0.0</code> – Standardroute bzw. unbestimmt.</li></ul>',
      code:
        "Gegeben: Netz 192.168.20.0/24\n"+
        "         DHCP-Range 192.168.20.20 - 192.168.20.254\n"+
        "         Router 192.168.20.1\n\n"+
        "Ausgeschlossen: .0 (Netz) | .1 (Router) | .20-.254 (DHCP) | .255 (Broadcast)\n"+
        "Frei bleibt:    192.168.20.2 bis 192.168.20.19\n\n"+
        "Konfiguration:  IP-Adresse      192.168.20.10\n"+
        "                Subnetzmaske    255.255.255.0\n"+
        "                Standardgateway 192.168.20.1",
      codeLang:'IP-Konfiguration (Herbst 2024)',
      tip:'Die Adresse 169.254.x.x ist ein Diagnosegeschenk: Wer sie sieht, weiß sofort, dass kein DHCP-Server erreichbar war. Die möglichen Ursachen dahinter sind eine eigene Prüfungsfrage wert – DHCP-Server ausgefallen oder Adresspool erschöpft, Kabel nicht gesteckt, falsches VLAN, oder ein fehlendes DHCP-Relay, wenn der Server in einem anderen Subnetz steht.',
      quiz:[
        {q:'Was bedeutet eine Adresse aus 169.254.x.x?', options:['Das Gerät ist im Internet','Kein DHCP-Server erreichbar, Adresse selbst vergeben (APIPA)','Ein Virus hat die Adresse geändert'], correct:1, explain:'Ohne Gateway ist damit nur die Kommunikation im eigenen Segment möglich.'},
        {q:'Warum darf eine statische Adresse nicht im DHCP-Bereich liegen?', options:['Aus Stilgründen','Weil der DHCP-Server dieselbe Adresse vergeben könnte – Adresskonflikt','Weil sie dann langsamer ist'], correct:1, explain:'Alternativ arbeitet man mit einer DHCP-Reservierung.'},
        {q:'Was ist die saubere Alternative zur statischen IP am Gerät?', options:['Gar keine Adresse','Eine DHCP-Reservierung auf die MAC-Adresse','Eine zweite Netzwerkkarte'], correct:1, explain:'Die Verwaltung bleibt dann zentral beim DHCP-Server.'}
      ]
    },
    {
      id:'m12-l5', title:'NAT, Ports und die Adressknappheit', minutes:8,
      body:
        '<p><strong>NAT</strong> (Network Address Translation) übersetzt private in öffentliche Adressen. Der Router ersetzt beim Verlassen des Netzes die private Quelladresse durch seine eigene öffentliche und merkt sich die Zuordnung in einer Tabelle.</p>'+
        '<p>Bei <strong>PAT</strong> (Port Address Translation, auch „NAT Overload") teilen sich viele interne Geräte <em>eine</em> öffentliche Adresse – unterschieden werden sie über die <strong>Portnummer</strong>. Das ist der Normalfall in jedem Heim- und Firmennetz.</p>'+
        '<p><strong>Warum das nötig wurde:</strong> IPv4 hat 2³² ≈ 4,3 Milliarden Adressen – zu wenig für die heutige Gerätezahl. NAT hat die Erschöpfung hinausgezögert, bringt aber Nachteile: keine Ende-zu-Ende-Erreichbarkeit von außen, Probleme bei Peer-to-Peer und VoIP, Zusatzaufwand im Router. IPv6 macht NAT überflüssig.</p>',
      code:
        "Intern                     Router (NAT/PAT)              Extern\n"+
        "192.168.1.10:51000  ---->  84.12.7.3:40001   ---->  93.184.216.34:443\n"+
        "192.168.1.11:49500  ---->  84.12.7.3:40002   ---->  93.184.216.34:443\n"+
        "                           ^ eine oeffentliche Adresse,\n"+
        "                             unterschieden durch den Port",
      codeLang:'NAT / PAT',
      tip:'NAT wird oft fälschlich als Sicherheitsfunktion bezeichnet. Der Effekt, dass interne Geräte von außen nicht direkt erreichbar sind, ist ein Nebeneffekt – kein Schutzkonzept. Eine Firewall entscheidet nach Regeln, NAT übersetzt nur Adressen. Wer in einer Prüfung NAT als Sicherheitsmaßnahme nennt, sollte diesen Unterschied zumindest mit erwähnen.',
      quiz:[
        {q:'Wodurch unterscheidet PAT mehrere interne Geräte hinter einer öffentlichen IP?', options:['Durch die MAC-Adresse','Durch die Portnummer','Durch den Hostnamen'], correct:1, explain:'Deshalb heißt es Port Address Translation.'},
        {q:'Wie viele Adressen hat IPv4 insgesamt?', options:['2^32 ≈ 4,3 Milliarden','2^64','2^128'], correct:0, explain:'Zu wenig für die heutige Gerätezahl – daher NAT und IPv6.'},
        {q:'Ist NAT eine Sicherheitsmaßnahme?', options:['Ja, es ersetzt die Firewall','Nein, die Nichterreichbarkeit von außen ist nur ein Nebeneffekt','Ja, es verschlüsselt den Verkehr'], correct:1, explain:'Eine Firewall entscheidet nach Regeln, NAT übersetzt lediglich Adressen.'}
      ]
    },
    {
      id:'m12-l6', title:'VLSM – Subnetze nach Bedarf statt nach Schema', minutes:11,
      body:
        '<p>Die bisherige Aufteilung hatte einen Haken: Alle Subnetze wurden <strong>gleich groß</strong>. Wenn eine Abteilung 60 Rechner hat und die nächste nur zwei, verschenkt man damit hunderte Adressen.</p>'+
        '<p><strong>VLSM</strong> (Variable Length Subnet Mask) löst das: Jedes Teilnetz bekommt <em>seine eigene</em> Maske, passend zum Bedarf. Aus einem einzigen /24 lassen sich damit große und winzige Netze nebeneinander schneiden.</p>'+
        '<p><strong>Das Verfahren in vier Schritten:</strong></p>'+
        '<ol><li><strong>Nach Größe sortieren</strong> &#8211; das größte Netz zuerst. Das ist der entscheidende Schritt; wer klein anfängt, zerschneidet sich den Adressraum.</li>'+
        '<li><strong>Präfix bestimmen</strong>: so viele Hostbits, dass <code>2^y &minus; 2 &ge; Bedarf</code>.</li>'+
        '<li><strong>Von vorn zuteilen</strong>, lückenlos.</li>'+
        '<li><strong>Ausrichtung prüfen</strong>: Jedes Subnetz muss an einem Vielfachen seiner eigenen Blockgröße beginnen.</li></ol>'+
        '<p>Schritt 4 ist die Regel, an der es in der Prüfung scheitert. Ein /28 hat die Blockgröße 16 und darf deshalb nur bei .0, .16, .32, .48 und so weiter beginnen &#8211; niemals bei .20. Wer nach Gefühl zuteilt, verletzt genau das.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="Aufteilung eines 24er Netzes in unterschiedlich grosse Subnetze">'+
        '<text class="s-hd" x="20" y="22">192.168.10.0/24 &#8211; 256 Adressen</text>'+
        '<rect class="s-strong" x="20" y="34" width="130" height="40" rx="3"/>'+
        '<text class="s-lbl" x="85" y="52" text-anchor="middle">Vertrieb /26</text>'+
        '<text class="s-mono" x="85" y="68" text-anchor="middle">.0 &#8211; .63</text>'+
        '<rect class="s-accent" x="150" y="34" width="66" height="40" rx="3"/>'+
        '<text class="s-lbl" x="183" y="52" text-anchor="middle">Technik</text>'+
        '<text class="s-mono" x="183" y="68" text-anchor="middle">.64&#8211;.95</text>'+
        '<rect class="s-accent" x="216" y="34" width="34" height="40" rx="3"/>'+
        '<text class="s-mono" x="233" y="58" text-anchor="middle">/28</text>'+
        '<rect class="s-warn" x="250" y="34" width="10" height="40" rx="2"/>'+
        '<rect class="s-box" x="260" y="34" width="280" height="40" rx="3"/>'+
        '<text class="s-lbl" x="400" y="58" text-anchor="middle">frei f&#252;r sp&#228;ter &#8211; .116 bis .255</text>'+
        '<text class="s-mono" x="20" y="92">0</text>'+
        '<text class="s-mono" x="145" y="92">64</text>'+
        '<text class="s-mono" x="211" y="92">96</text>'+
        '<text class="s-mono" x="246" y="92">112</text>'+
        '<text class="s-mono" x="524" y="92">255</text>'+
        '<rect class="s-box" x="20" y="108" width="520" height="122" rx="4"/>'+
        '<text class="s-hd" x="34" y="130">Warum die Reihenfolge z&#228;hlt</text>'+
        '<rect class="s-ok" x="34" y="142" width="14" height="14" rx="2"/>'+
        '<text class="s-lbl" x="58" y="154">Gr&#246;&#223;tes zuerst: .0/26 &#8211; .64/27 &#8211; .96/28 &#8211; .112/30 &#8594; alles passt</text>'+
        '<rect class="s-risk2" x="34" y="170" width="14" height="14" rx="2"/>'+
        '<text class="s-lbl" x="58" y="182">Kleinstes zuerst: .0/30 &#8211; dann braucht das /26 den Block ab .64,</text>'+
        '<text class="s-lbl" x="58" y="198">weil es bei .4 nicht beginnen darf &#8594; .4 bis .63 bleiben ungenutzt</text>'+
        '<text class="s-mono" x="34" y="220">Ausrichtungsregel: Startadresse = Vielfaches der eigenen Blockgr&#246;&#223;e</text>'+
        '</svg><figcaption>Vier Netze von 62 bis 2 Hosts aus einem einzigen /24. Das größte zuerst — sonst zerschneidet man sich den Adressraum.</figcaption></figure>',
      code:
        "AUFGABE\n"+
        "  Gegeben 192.168.10.0/24. Benoetigt werden:\n"+
        "     Vertrieb          60 Hosts\n"+
        "     Technik           28 Hosts\n"+
        "     Lager             12 Hosts\n"+
        "     Router-Kopplung    2 Hosts\n\n"+
        "SCHRITT 1 - sortieren, groesstes zuerst\n"+
        "  60, 28, 12, 2\n\n"+
        "SCHRITT 2 - Praefix je Netz  (2^y - 2 >= Bedarf)\n"+
        "  60 Hosts -> 2^6 - 2 = 62  -> 6 Hostbits -> /26  Block 64\n"+
        "  28 Hosts -> 2^5 - 2 = 30  -> 5 Hostbits -> /27  Block 32\n"+
        "  12 Hosts -> 2^4 - 2 = 14  -> 4 Hostbits -> /28  Block 16\n"+
        "   2 Hosts -> 2^2 - 2 =  2  -> 2 Hostbits -> /30  Block  4\n\n"+
        "SCHRITT 3 - von vorn zuteilen\n\n"+
        "  Netz       Bereich        Hosts nutzbar     Broadcast\n"+
        "  ---------  -------------  ----------------  ---------\n"+
        "  .0   /26   .0   bis .63   .1   bis .62      .63\n"+
        "  .64  /27   .64  bis .95   .65  bis .94      .95\n"+
        "  .96  /28   .96  bis .111  .97  bis .110     .111\n"+
        "  .112 /30   .112 bis .115  .113 bis .114     .115\n\n"+
        "  Frei bleiben .116 bis .255 fuer spaetere Netze.\n\n"+
        "SCHRITT 4 - Ausrichtung pruefen\n"+
        "   64 : 64 = 1   ok      96 : 16 = 6    ok\n"+
        "  112 :  4 = 28  ok\n"+
        "  Jede Startadresse ist ein Vielfaches ihrer Blockgroesse.\n\n"+
        "GEGENPROBE - was gleich grosse Netze gekostet haetten\n"+
        "  Alle vier als /26:  4 x 64 = 256 Adressen, der /24 ist voll.\n"+
        "  Fuer die Router-Kopplung waeren 62 Adressen reserviert,\n"+
        "  von denen zwei genutzt werden. Kein Platz fuer Erweiterung.\n\n"+
        "MERKE FUER PUNKT-ZU-PUNKT\n"+
        "  Eine Router-Kopplung braucht genau zwei Adressen -> /30.\n"+
        "  Das ist der haeufigste VLSM-Teilschritt in Pruefungen.",
      codeLang:'VLSM',
      tip:'Wenn eine Aufgabe unterschiedliche Hostzahlen nennt, ist VLSM gemeint — auch wenn das Wort nicht fällt. Beginne immer mit dem größten Bedarf und schreibe dir zu jedem Netz die Blockgröße dazu, nicht nur das Präfix. Mit der Blockgröße siehst du die nächste freie Startadresse sofort, und die Ausrichtungsregel prüft sich von selbst: Die Startadresse muss ohne Rest durch die Blockgröße teilbar sein.',
      quiz:[
        {q:'In welcher Reihenfolge werden die Subnetze bei VLSM zugeteilt?', options:['Alphabetisch nach Abteilung','Das größte zuerst','Das kleinste zuerst'], correct:1, explain:'Umgekehrt zerschneidet man den Adressraum und die großen Netze passen nicht mehr.'},
        {q:'Welches Präfix braucht eine Punkt-zu-Punkt-Verbindung zwischen zwei Routern?', options:['/28','/30','/24'], correct:1, explain:'2 hoch 2 minus 2 ergibt genau die zwei benötigten Adressen.'},
        {q:'Ein /28 hat Blockgröße 16. Welche Startadresse ist zulässig?', options:['.20','.48','.100'], correct:1, explain:'48 geteilt durch 16 ergibt 3 ohne Rest — .20 und .100 sind keine Vielfachen von 16.'}
      ]
    },
    {
      id:'m12-l7', title:'Wie ein Router entscheidet', minutes:10,
      body:
        '<p>Ein Router hat eine Aufgabe: Für jedes eintreffende Paket bestimmen, <strong>wohin als Nächstes</strong>. Dafür schaut er in seine <strong>Routingtabelle</strong>.</p>'+
        '<p>Jeder Eintrag nennt ein <strong>Zielnetz mit Präfix</strong>, das <strong>nächste Gerät</strong> auf dem Weg und die <strong>Schnittstelle</strong>, über die es erreichbar ist. Steht dort <em>on-link</em> oder <em>direkt verbunden</em>, hängt das Zielnetz unmittelbar an diesem Router.</p>'+
        '<p><strong>Die Regel, die alles entscheidet: die längste Übereinstimmung.</strong> Passen mehrere Einträge auf eine Zieladresse, gewinnt der mit dem <strong>längsten Präfix</strong> &#8211; also der genaueste. Die Metrik kommt erst zum Zug, wenn zwei Einträge <em>gleich lang</em> sind.</p>'+
        '<p>Die <strong>Standardroute</strong> <code>0.0.0.0/0</code> passt auf jede Adresse, ist aber mit Präfixlänge null immer die kürzeste. Sie greift deshalb genau dann, wenn nichts Genaueres da ist &#8211; darum heißt sie Standardgateway. Findet ein Router weder einen passenden Eintrag noch eine Standardroute, verwirft er das Paket und meldet per ICMP <em>Ziel nicht erreichbar</em>.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 268" role="img" aria-label="Routingtabelle und die Entscheidung nach laengster Uebereinstimmung">'+
        '<rect class="s-strong" x="20" y="14" width="240" height="30" rx="4"/>'+
        '<text class="s-lbl" x="140" y="34" text-anchor="middle">Paket an 10.5.3.7</text>'+
        '<text class="s-hd" x="20" y="70">Routingtabelle &#8211; welche Eintr&#228;ge passen?</text>'+
        '<rect class="s-box" x="20" y="80" width="520" height="26" rx="3"/>'+
        '<text class="s-mono" x="32" y="98">0.0.0.0/0</text>'+
        '<text class="s-mono" x="200" y="98">192.168.1.1</text>'+
        '<text class="s-lbl" x="360" y="98">passt &#8211; Pr&#228;fixl&#228;nge 0</text>'+
        '<rect class="s-box" x="20" y="110" width="520" height="26" rx="3"/>'+
        '<text class="s-mono" x="32" y="128">192.168.1.0/24</text>'+
        '<text class="s-mono" x="200" y="128">on-link</text>'+
        '<text class="s-lbl" x="360" y="128">passt nicht</text>'+
        '<rect class="s-accent" x="20" y="140" width="520" height="26" rx="3"/>'+
        '<text class="s-mono" x="32" y="158">10.0.0.0/8</text>'+
        '<text class="s-mono" x="200" y="158">192.168.1.253</text>'+
        '<text class="s-lbl" x="360" y="158">passt &#8211; Pr&#228;fixl&#228;nge 8</text>'+
        '<rect class="s-crit" x="20" y="170" width="520" height="26" rx="3"/>'+
        '<text class="s-mono" x="32" y="188">10.5.0.0/16</text>'+
        '<text class="s-mono" x="200" y="188">192.168.1.252</text>'+
        '<text class="s-lbl" x="360" y="188">passt &#8211; Pr&#228;fixl&#228;nge 16 &#8594; GEWINNT</text>'+
        '<rect class="s-ok" x="20" y="212" width="520" height="30" rx="4"/>'+
        '<text class="s-lbl" x="280" y="232" text-anchor="middle">Weitergabe an 192.168.1.252 &#8211; l&#228;ngstes Pr&#228;fix gewinnt, nicht die kleinste Metrik</text>'+
        '<text class="s-lbl" x="20" y="260">Die Metrik entscheidet erst, wenn zwei Eintr&#228;ge gleich lange Pr&#228;fixe haben.</text>'+
        '</svg><figcaption>Drei Einträge passen, der genaueste gewinnt. Die Standardroute mit Präfixlänge null ist immer der letzte Ausweg.</figcaption></figure>'+
        '<p><strong>Was im IPv4-Kopf dafür gebraucht wird</strong> &#8211; drei Felder, die in Prüfungen auftauchen:</p>'+
        '<ul><li><strong>TTL</strong> (Time to Live): Jeder Router zieht eins ab. Bei null wird das Paket verworfen und der Absender bekommt per ICMP eine <em>Zeitüberschreitung</em>. Das verhindert, dass Pakete bei einer Routingschleife ewig kreisen.</li>'+
        '<li><strong>Protokollfeld</strong>: Sagt, was im Datenteil steckt &#8211; <code>1</code> ICMP, <code>6</code> TCP, <code>17</code> UDP. Ohne dieses Feld wüsste der Empfänger nicht, wem er den Inhalt geben soll.</li>'+
        '<li><strong>Fragmentierung</strong>: Ist das Paket größer als die MTU der nächsten Strecke, zerlegt der Router es. Der Empfänger setzt es wieder zusammen &#8211; nie ein Router unterwegs.</li></ul>'+
        '<p><strong>Und daraus folgt, wie <code>tracert</code> funktioniert:</strong> Das Werkzeug sendet Pakete mit TTL 1, dann 2, dann 3. Jeder Router, bei dem die TTL abläuft, meldet sich mit seiner eigenen Adresse zurück. So entsteht die Liste aller Stationen &#8211; ein Nebeneffekt des Schleifenschutzes, kein eigenes Protokoll.</p>',
      code:
        "ROUTINGTABELLE LESEN - typische Pruefungsaufgabe\n\n"+
        "  Ziel             Naechster Schritt   Schnittstelle  Metrik\n"+
        "  ---------------  ------------------  -------------  ------\n"+
        "  0.0.0.0/0        192.168.1.1         eth0               10\n"+
        "  10.0.0.0/8       192.168.1.253       eth0                5\n"+
        "  10.5.0.0/16      192.168.1.252       eth0                5\n"+
        "  192.168.1.0/24   on-link             eth0                1\n"+
        "  127.0.0.0/8      on-link             lo                  1\n\n"+
        "  Wohin geht ein Paket an ...\n\n"+
        "   10.5.3.7      -> /16 passt am genauesten  -> 192.168.1.252\n"+
        "   10.9.0.1      -> nur /8 passt             -> 192.168.1.253\n"+
        "   192.168.1.40  -> /24, direkt verbunden    -> ohne Router\n"+
        "   8.8.8.8       -> nur die Standardroute    -> 192.168.1.1\n\n"+
        "  Beachte: 10.5.3.7 passt AUCH auf 10.0.0.0/8.\n"+
        "  Die kleinere Metrik des /8 hilft nicht - Laenge geht vor.\n\n"+
        "TTL UND TRACERT\n"+
        "  Paket 1: TTL=1  -> erster Router verwirft, meldet sich\n"+
        "  Paket 2: TTL=2  -> zweiter Router verwirft, meldet sich\n"+
        "  Paket 3: TTL=3  -> dritter Router ...\n"+
        "  bis das Ziel antwortet.\n\n"+
        "  Startwerte verraten das Betriebssystem:\n"+
        "     64   Linux, macOS\n"+
        "    128   Windows\n"+
        "    255   viele Netzgeraete\n"+
        "  Antwort mit TTL=118 -> Windows, 10 Router unterwegs.\n\n"+
        "PROTOKOLLFELD IM IPv4-KOPF\n"+
        "     1  ICMP      6  TCP      17  UDP\n"+
        "    41  IPv6      47  GRE     50  ESP (IPsec)\n\n"+
        "WENN GAR NICHTS PASST\n"+
        "  Kein Eintrag und keine Standardroute\n"+
        "     -> Paket verworfen, ICMP \"Ziel nicht erreichbar\"\n"+
        "     -> im Ping sichtbar als \"Zielhost nicht erreichbar\"",
      codeLang:'Routing',
      tip:'Die Verwechslung von Präfixlänge und Metrik ist der klassische Fehler bei Routingaufgaben. Die Metrik beschreibt nur, wie gut ein Weg ist — sie wird erst befragt, wenn zwei Einträge gleich genau sind. Schreibe dir bei jeder Aufgabe zuerst die Präfixlängen der passenden Einträge untereinander, dann ist die Entscheidung eindeutig und du musst gar nicht über die Metrik nachdenken.',
      quiz:[
        {q:'Zwei Einträge passen auf eine Zieladresse: 10.0.0.0/8 mit Metrik 5 und 10.5.0.0/16 mit Metrik 20. Welcher gewinnt?', options:['Der mit Metrik 5','Der mit dem Präfix /16','Die Standardroute'], correct:1, explain:'Längste Übereinstimmung geht vor. Die Metrik entscheidet nur bei gleich langen Präfixen.'},
        {q:'Was passiert, wenn die TTL eines Pakets null erreicht?', options:['Es wird langsamer weitergeleitet','Es wird verworfen und der Absender bekommt per ICMP eine Zeitüberschreitung','Es wird fragmentiert'], correct:1, explain:'Genau diesen Mechanismus nutzt tracert, um jede Station sichtbar zu machen.'},
        {q:'Welchen Wert trägt das Protokollfeld im IPv4-Kopf bei TCP?', options:['1','6','17'], correct:1, explain:'1 steht für ICMP, 17 für UDP.'}
      ]
    },
  ]
});
MODULES.push({
  id:'m13', part:4, partTitle:'Netzwerktechnik', title:'IPv6', relevanz:'hoch',
  lessons:[
    {
      id:'m13-l1', title:'Aufbau und Kürzungsregeln', minutes:9,
      body:
        '<p>Eine <strong>IPv6-Adresse</strong> besteht aus <strong>128 Bit</strong>, notiert als <strong>8 Blöcke zu je 16 Bit</strong> in Hexadezimalschreibweise, getrennt durch Doppelpunkte. Jeder Block hat also <strong>vier Hex-Ziffern</strong>.</p>'+
        '<p>Die beiden <strong>Kürzungsregeln</strong>:</p>'+
        '<ul><li><strong>Führende Nullen</strong> in einem Block dürfen entfallen: <code>0db8</code> → <code>db8</code>.</li>'+
        '<li>Eine <em>zusammenhängende Folge</em> von Nullblöcken wird durch <code>::</code> ersetzt – und zwar <strong>nur einmal pro Adresse</strong>, sonst wäre sie nicht mehr eindeutig rekonstruierbar.</li></ul>'+
        '<p>Zum <strong>Ausschreiben</strong> gehst du rückwärts vor: Zähle die vorhandenen Blöcke, ziehe sie von 8 ab – die Differenz ist die Anzahl der Nullblöcke, die das <code>::</code> ersetzt. Dann alle Blöcke auf vier Ziffern auffüllen.</p>',
      code:
        "Gekuerzt:    fe80::521a:c5ff:fef2:38b7\n\n"+
        "  Vorhanden: fe80 | 521a c5ff fef2 38b7  = 5 Bloecke\n"+
        "  8 - 5 = 3 Nullbloecke ersetzt das ::\n\n"+
        "Ungekuerzt:  fe80:0000:0000:0000:521a:c5ff:fef2:38b7\n\n"+
        "  Praefix (Netzanteil):     erste 64 Bit = fe80:0000:0000:0000\n"+
        "  Interface-Identifier:     letzte 64 Bit = 521a:c5ff:fef2:38b7",
      codeLang:'IPv6',
      tip:'Wenn eine Aufgabe die ungekürzte Form verlangt, meint sie wirklich jede führende Null. Aus da8 wird 0da8, aus 28 wird 0028 – jeder Block hat exakt vier Hexadezimalziffern. Genau hier verlieren die meisten die Hälfte der Punkte, weil sie nur das Doppelpunkt-Paar auflösen und die führenden Nullen vergessen.',
      quiz:[
        {q:'Wie viele Bit hat eine IPv6-Adresse?', options:['32','64','128'], correct:2, explain:'8 Blöcke zu je 16 Bit.'},
        {q:'Wie oft darf :: in einer IPv6-Adresse vorkommen?', options:['Beliebig oft','Genau einmal','Zweimal'], correct:1, explain:'Sonst wäre die Anzahl der Nullblöcke nicht mehr eindeutig.'},
        {q:'Wie lautet 2001:0db8:0000:0000:0000:ff00:0042:8329 gekürzt?', options:['2001:db8::ff00:42:8329','2001:db8:0:0::ff00:42:8329','2001::db8::ff00:42:8329'], correct:0, explain:'Führende Nullen entfallen, die Nullblockfolge wird einmal durch :: ersetzt.'}
      ]
    },
    {
      id:'m13-l2', title:'Adresstypen, Präfix und Teilnetze', minutes:9,
      body:
        '<p>Eine Unicast-IPv6-Adresse teilt sich immer in <strong>64 Bit Präfix</strong> (Netzanteil) und <strong>64 Bit Interface-Identifier</strong> (Hostanteil) – also vier Blöcke je Seite.</p>'+
        '<p>Das Präfix zerfällt typischerweise weiter in <strong>48 Bit Standortpräfix</strong> (drei Blöcke) und <strong>16 Bit Teilnetz-ID</strong> (vierter Block).</p>'+
        '<p><strong>Anzahl möglicher Teilnetze:</strong> Bei n Bit Teilnetz-ID sind es <code>2ⁿ</code> – bei 16 Bit also 2¹⁶ = 65.536. <strong>Anders als bei IPv4 wird hier nichts abgezogen</strong>: IPv6 kennt keine Broadcast-Adresse.</p>'+
        '<table class="lesson-table"><tr><th>Präfix</th><th>Typ</th><th>Bedeutung</th></tr>'+
        '<tr><td>fe80::/10</td><td>Link-Local</td><td>selbst erzeugt, nur im lokalen Segment, nicht routbar</td></tr>'+
        '<tr><td>2000::/3</td><td>Global Unicast</td><td>weltweit routbar</td></tr>'+
        '<tr><td>fc00::/7</td><td>Unique Local (ULA)</td><td>Pendant zu privaten IPv4-Adressen</td></tr>'+
        '<tr><td>ff00::/8</td><td>Multicast</td><td>IPv6 kennt <strong>keinen</strong> Broadcast</td></tr>'+
        '<tr><td>::1/128</td><td>Loopback</td><td>entspricht 127.0.0.1</td></tr></table>'+
        '<figure class="fig"><svg viewBox="0 0 560 160" role="img" aria-label="Aufbau einer IPv6-Adresse mit Standortpraefix, Teilnetz-ID und Interface-Identifier"><rect class="s-netpart" x="20" y="34" width="252" height="36" rx="3"/><rect class="s-strong" x="272" y="34" width="84" height="36" rx="3"/><rect class="s-hostpart" x="356" y="34" width="184" height="36" rx="3"/><text class="s-mono" x="146" y="57" text-anchor="middle">2001:0db8:5f2d</text><text class="s-mono" x="314" y="57" text-anchor="middle">0028</text><text class="s-mono" x="448" y="57" text-anchor="middle">521a:c5ff:fef2:38b7</text><text class="s-lbl" x="146" y="88" text-anchor="middle">48 Bit Standortpr&#228;fix</text><text class="s-lbl" x="314" y="88" text-anchor="middle">16 Bit Teilnetz</text><text class="s-lbl" x="448" y="88" text-anchor="middle">64 Bit Interface-Identifier</text><line class="s-brace" x1="20" y1="102" x2="356" y2="102"/><text class="s-lbl" x="188" y="120" text-anchor="middle">Pr&#228;fix &#8211; 64 Bit</text><line class="s-brace" x1="356" y1="102" x2="540" y2="102"/><text class="s-lbl" x="448" y="120" text-anchor="middle">Hostanteil &#8211; 64 Bit</text><text class="s-lbl" x="20" y="148">2&#185;&#8310; = 65.536 Teilnetze &#8211; ohne Abzug, denn IPv6 kennt keine Broadcast-Adresse.</text><text class="s-hd" x="20" y="22">128 Bit = 8 Bl&#246;cke zu je 16 Bit</text></svg><figcaption>Eine IPv6-Unicast-Adresse teilt sich immer in 64 Bit Praefix und 64 Bit Interface-Identifier. Die Teilnetz-ID ist der vierte Block.</figcaption></figure>',
      code:
        "2001:0da8:5f2d : 0028 : 521a:c5ff:fef2:38b7\n"+
        "^^^^^^^^^^^^^^^   ^^^^   ^^^^^^^^^^^^^^^^^^^\n"+
        "48 Bit Standort   16 Bit  64 Bit Interface-Identifier\n"+
        "                  Teilnetz-ID\n\n"+
        "Moegliche Teilnetze: 2^16 = 65.536   (kein \"-2\" wie bei IPv4!)",
      codeLang:'IPv6-Struktur',
      tip:'Das eingeschobene ff:fe in der Mitte des Interface-Identifiers ist ein verräterisches Muster: Es zeigt, dass der Identifier nach dem EUI-64-Verfahren aus der 48-Bit-MAC-Adresse erzeugt wurde. Die MAC wird dabei in der Mitte geteilt, FFFE eingeschoben und das siebte Bit invertiert – aus 50-1A-C5 wird also 521a. Wer das in einer Analyseaufgabe erwähnt, zeigt echtes Verständnis.',
      quiz:[
        {q:'Wie viele Teilnetze erlaubt eine 16-Bit-Teilnetz-ID?', options:['2^16 = 65.536','2^16 − 2','16'], correct:0, explain:'IPv6 kennt keine Broadcast-Adresse, daher kein Abzug.'},
        {q:'Wofür steht das Präfix fe80::?', options:['Global Unicast','Link-Local – selbst erzeugt, nicht routbar','Multicast'], correct:1, explain:'Jedes IPv6-Interface bildet sich beim Start automatisch eine solche Adresse.'},
        {q:'Welcher Teil einer IPv6-Unicast-Adresse ist der Interface-Identifier?', options:['Die ersten 64 Bit','Die letzten 64 Bit','Die mittleren 16 Bit'], correct:1, explain:'Die ersten 64 Bit bilden das Präfix aus Standortanteil und Teilnetz-ID.'}
      ]
    },
    {
      id:'m13-l3', title:'Warum IPv6 – Vorteile und Autokonfiguration', minutes:8,
      body:
        '<p>Die Vorteile werden regelmäßig als Nennaufgabe geprüft, besonders im Kontext <strong>IoT</strong>:</p>'+
        '<ul><li><strong>Nahezu unbegrenzter Adressraum</strong> – 2¹²⁸ ≈ 3,4 × 10³⁸ Adressen. Genug für jeden Sensor der Welt.</li>'+
        '<li><strong>Ende-zu-Ende-Erreichbarkeit ohne NAT</strong> – jedes Gerät bekommt eine global gültige Adresse und ist direkt ansprechbar. Wichtig für Fernwartung und Steuerung.</li>'+
        '<li><strong>Vereinfachter Header</strong> mit fester Größe – Router verarbeiten Pakete schneller.</li>'+
        '<li><strong>IPsec</strong> ist von Haus aus vorgesehen.</li>'+
        '<li><strong>Kein Broadcast</strong> – dessen Aufgaben übernimmt gezielteres Multicast.</li></ul>'+
        '<p><strong>SLAAC</strong> (Stateless Address Autoconfiguration): Über <em>Router Advertisements</em> erfährt ein Host das Präfix und bildet sich seine Adresse selbst – ganz ohne DHCP-Server. Deshalb steht in der Windows-Ausgabe „Autokonfiguration aktiviert: Ja".</p>'+
        '<p>Statt ARP nutzt IPv6 das <strong>Neighbor Discovery Protocol (NDP)</strong> über ICMPv6.</p>',
      code:'',
      tip:'Wenn eine Aufgabe nach Vorteilen „für den Einsatz im IoT-Bereich" fragt, sind zwei Argumente deutlich stärker als die anderen: der Adressraum, weil es um Millionen einzeln adressierbarer Kleingeräte geht, und die Ende-zu-Ende-Erreichbarkeit ohne NAT, weil Sensoren ferngewartet und gesteuert werden müssen. Wer diese beiden nennt, trifft den Kern der Frage.',
      quiz:[
        {q:'Was ersetzt in IPv6 die Funktion von ARP?', options:['DHCP','Neighbor Discovery Protocol über ICMPv6','DNS'], correct:1, explain:'ARP existiert in IPv6 nicht.'},
        {q:'Was bedeutet SLAAC?', options:['Ein Verschlüsselungsverfahren','Zustandslose Autokonfiguration – der Host bildet seine Adresse selbst','Ein Routingprotokoll'], correct:1, explain:'Das Präfix kommt per Router Advertisement, den Rest bildet der Host.'},
        {q:'Was ersetzt in IPv6 das ARP-Protokoll?', options:['DHCPv6','Neighbor Discovery über ICMPv6','DNS'], correct:1, explain:'ARP existiert in IPv6 nicht mehr.'}
      ]
    },
    {
      id:'m13-l4', title:'Nachbarschaft: NDP, Multicast und DAD', minutes:10,
      body:
        '<p>IPv6 kennt kein ARP und keinen Broadcast. Beide Aufgaben übernimmt das <strong>Neighbor Discovery Protocol</strong> (NDP), das auf ICMPv6 aufsetzt und gezieltes <strong>Multicast</strong> nutzt.</p>'+
        '<p><strong>Die Multicastgruppen, die du kennen musst:</strong></p>'+
        '<table class="lesson-table"><tr><th>Adresse</th><th>Wer hört zu</th></tr>'+
        '<tr><td><code>ff02::1</code></td><td><strong>alle Knoten</strong> im Segment &#8211; das Gegenstück zum alten Broadcast</td></tr>'+
        '<tr><td><code>ff02::2</code></td><td><strong>alle Router</strong> im Segment</td></tr>'+
        '<tr><td><code>ff02::1:ffxx:xxxx</code></td><td>die <strong>angeforderte Knotengruppe</strong> (Solicited-Node)</td></tr></table>'+
        '<p>Die dritte ist der Trick, der IPv6 sparsamer macht als IPv4. Sie wird aus den <strong>letzten 24 Bit</strong> der gesuchten Adresse gebildet. Eine Anfrage erreicht damit nur die wenigen Geräte, deren Adresse auf dieselben 24 Bit endet &#8211; statt wie beim ARP-Broadcast <em>jedes</em> Gerät im Netz aufzuwecken.</p>'+
        '<p><strong>Die vier NDP-Nachrichten:</strong></p>'+
        '<ul><li><strong>Neighbor Solicitation</strong> (NS) &#8211; „Wem gehört diese Adresse?" Ersetzt den ARP-Request.</li>'+
        '<li><strong>Neighbor Advertisement</strong> (NA) &#8211; „Mir, hier ist meine MAC." Ersetzt den ARP-Reply.</li>'+
        '<li><strong>Router Solicitation</strong> (RS) &#8211; „Ist hier ein Router?" an <code>ff02::2</code>.</li>'+
        '<li><strong>Router Advertisement</strong> (RA) &#8211; „Ja, und hier ist das Präfix." an <code>ff02::1</code>.</li></ul>'+
        '<p><strong>Duplicate Address Detection</strong> (DAD) nutzt dieselbe Mechanik für einen anderen Zweck: Bevor ein Gerät eine selbst gebildete Adresse benutzt, fragt es per NS nach <em>genau dieser</em> Adresse &#8211; mit der unbestimmten Adresse <code>::</code> als Absender. Antwortet niemand, ist sie frei. Antwortet jemand, verzichtet das Gerät darauf. Deshalb kann es in IPv6 praktisch keinen stillen Adresskonflikt geben, anders als bei einer von Hand vergebenen IPv4-Adresse.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 276" role="img" aria-label="Neighbor Discovery und Duplicate Address Detection">'+
        '<text class="s-hd" x="20" y="22">1) Wem geh&#246;rt eine Adresse? &#8211; NS und NA</text>'+
        '<rect class="s-accent" x="20" y="32" width="110" height="34" rx="4"/>'+
        '<text class="s-lbl" x="75" y="54" text-anchor="middle">Host A</text>'+
        '<rect class="s-accent" x="430" y="32" width="110" height="34" rx="4"/>'+
        '<text class="s-lbl" x="485" y="54" text-anchor="middle">Host B</text>'+
        '<line class="s-arrow" x1="132" y1="42" x2="426" y2="42" marker-end="url(#ndp)"/>'+
        '<text class="s-mono" x="279" y="36" text-anchor="middle">NS an ff02::1:ff&#8230; &#8211; nur passende H&#246;rer</text>'+
        '<line class="s-arrow2" x1="428" y1="60" x2="134" y2="60" marker-end="url(#ndp)"/>'+
        '<text class="s-mono" x="279" y="76" text-anchor="middle">NA per Unicast &#8211; hier ist meine MAC</text>'+
        '<text class="s-hd" x="20" y="108">2) Ist meine neue Adresse frei? &#8211; DAD</text>'+
        '<rect class="s-warn" x="20" y="118" width="110" height="34" rx="4"/>'+
        '<text class="s-lbl" x="75" y="140" text-anchor="middle">neuer Host</text>'+
        '<line class="s-arrow" x1="132" y1="132" x2="426" y2="132" marker-end="url(#ndp)"/>'+
        '<text class="s-mono" x="279" y="126" text-anchor="middle">NS auf die EIGENE Adresse, Absender ::</text>'+
        '<rect class="s-ok" x="430" y="118" width="110" height="34" rx="4"/>'+
        '<text class="s-lbl" x="485" y="140" text-anchor="middle">Stille</text>'+
        '<text class="s-lbl" x="150" y="166">keine Antwort &#8594; Adresse ist frei und wird benutzt</text>'+
        '<rect class="s-box" x="20" y="182" width="520" height="80" rx="4"/>'+
        '<text class="s-hd" x="34" y="204">So entsteht die angeforderte Knotengruppe</text>'+
        '<text class="s-mono" x="34" y="226">Zieladresse&#160;&#160;&#160;2001:db8::<tspan class="s-uline">52:1a3b</tspan></text>'+
        '<text class="s-mono" x="34" y="246">Gruppe&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;ff02::1:ff<tspan class="s-uline">52:1a3b</tspan> &#160;&#8592; die letzten 24 Bit</text>'+
        '<defs><marker id="ndp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Statt alle zu fragen wie ARP, spricht IPv6 nur die Geräte an, deren Adresse auf dieselben 24 Bit endet.</figcaption></figure>',
      code:
        "ARP GEGEN NDP - was sich geaendert hat\n\n"+
        "  IPv4 / ARP                  IPv6 / NDP\n"+
        "  --------------------------  ---------------------------\n"+
        "  Broadcast an ff:ff:ff:...   Multicast an ff02::1:ffxx:xxxx\n"+
        "  JEDES Geraet wird gestoert  nur passende Hoerer\n"+
        "  eigenes Protokoll           ICMPv6\n"+
        "  arp -a                      ip -6 neigh  /  netsh ...\n"+
        "  kein Schutz vor Doppelung   DAD vor jeder Nutzung\n\n"+
        "DIE VIER NACHRICHTEN\n"+
        "  RS  Router Solicitation    Host fragt   -> ff02::2\n"+
        "  RA  Router Advertisement   Router sagt  -> ff02::1\n"+
        "  NS  Neighbor Solicitation  wer hat X?\n"+
        "  NA  Neighbor Advertisement ich, hier meine MAC\n\n"+
        "SOLICITED-NODE SELBST BILDEN\n"+
        "  gesucht   fe80::1a2b:3c4d:5e6f:7a8b\n"+
        "  letzte 24 Bit sind  6f:7a8b\n"+
        "  Gruppe    ff02::1:ff6f:7a8b\n\n"+
        "  Regel: ff02::1:ff + die letzten sechs Hexziffern.\n\n"+
        "WARUM MAN ff02::1 KENNEN SOLLTE\n"+
        "  ping ff02::1%eth0\n"+
        "     antwortet jeder Knoten im Segment - das IPv6-Gegenstueck\n"+
        "     zum Broadcast-Ping und ein schneller Weg, alle Geraete\n"+
        "     im lokalen Netz sichtbar zu machen.\n\n"+
        "  ping ff02::2%eth0\n"+
        "     antworten nur die Router. Gut, um ein unerwartetes\n"+
        "     Router-Advertisement aufzuspueren.",
      codeLang:'NDP',
      tip:'Die Frage „Was ersetzt ARP in IPv6?" beantworten viele mit dem Stichwort NDP und lassen es dabei. Der Punkt dahinter ist der Fortschritt: ARP stört mit jedem Broadcast alle Geräte im Segment, NDP spricht über die angeforderte Knotengruppe nur die wenigen an, deren Adresse auf dieselben 24 Bit endet. Wer das erwähnt, zeigt, dass er den Unterschied verstanden hat und nicht nur ein Kürzel kennt.',
      quiz:[
        {q:'Welche Multicastgruppe erreicht alle Knoten eines Segments?', options:['ff02::1','ff02::2','ff00::1'], correct:0, explain:'ff02::2 erreicht nur die Router — ein Broadcast wie in IPv4 existiert nicht.'},
        {q:'Woraus wird die angeforderte Knotengruppe gebildet?', options:['Aus dem Präfix','Aus den letzten 24 Bit der Zieladresse','Aus der MAC-Adresse des Routers'], correct:1, explain:'Deshalb hören nur die wenigen Geräte zu, deren Adresse auf dieselben Bits endet.'},
        {q:'Wozu dient Duplicate Address Detection?', options:['Zum Finden des Standardgateways','Um vor der Nutzung zu prüfen, ob die eigene Adresse schon vergeben ist','Zum Verschlüsseln der Verbindung'], correct:1, explain:'Der Absender ist dabei die unbestimmte Adresse — antwortet niemand, ist die Adresse frei.'}
      ]
    },
    {
      id:'m13-l5', title:'Adressvergabe: SLAAC, DHCPv6 und Privacy Extensions', minutes:10,
      body:
        '<p>Ein IPv6-Gerät kann auf <strong>drei Wegen</strong> zu seiner Adresse kommen &#8211; und anders als bei IPv4 hat es meist <em>mehrere gleichzeitig</em>. Das ist normal und kein Fehler.</p>'+
        '<p>Welcher Weg gilt, steuert der Router über zwei Bits im <strong>Router Advertisement</strong>:</p>'+
        '<table class="lesson-table"><tr><th>M-Bit</th><th>O-Bit</th><th>Bedeutung</th></tr>'+
        '<tr><td>0</td><td>0</td><td>reines <strong>SLAAC</strong> &#8211; der Host bildet alles selbst</td></tr>'+
        '<tr><td>0</td><td>1</td><td>SLAAC für die Adresse, <strong>DHCPv6 nur für Zusatzangaben</strong> wie DNS (zustandslos)</td></tr>'+
        '<tr><td>1</td><td>&#8211;</td><td><strong>DHCPv6 zustandsbehaftet</strong> &#8211; der Server vergibt und verwaltet die Adressen</td></tr></table>'+
        '<p><strong>Bei SLAAC</strong> liefert das Router Advertisement nur das <strong>Präfix</strong>, die ersten 64 Bit. Die zweiten 64 Bit, den <strong>Interface-Identifier</strong>, bildet der Host selbst &#8211; früher nach dem <strong>EUI-64</strong>-Verfahren aus der MAC-Adresse.</p>'+
        '<p>EUI-64 geht so: Die 48-Bit-MAC wird in der Mitte geteilt, <code>FFFE</code> eingeschoben und das siebte Bit umgedreht. Aus <code>50:1A:C5:F2:38:B7</code> wird damit <code>521a:c5ff:fef2:38b7</code>. Das eingeschobene <strong>ff:fe</strong> in der Mitte ist das verräterische Muster, an dem man eine EUI-64-Adresse sofort erkennt.</p>'+
        '<p><strong>Und genau darin lag ein Datenschutzproblem:</strong> Die MAC-Adresse ist weltweit eindeutig und ändert sich nie. Ein Gerät wäre damit über jedes Netz hinweg wiedererkennbar gewesen &#8211; im Hotel, in der Firma, zu Hause. Deshalb gibt es die <strong>Privacy Extensions</strong>: Der Interface-Identifier wird zufällig gewählt und regelmäßig gewechselt, oft täglich. Moderne Betriebssysteme haben das standardmäßig aktiv, sodass ein Gerät typischerweise <em>mehrere</em> Adressen zugleich führt: eine stabile zum Empfangen und eine wechselnde zum Senden nach außen.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 268" role="img" aria-label="Wege der IPv6-Adressvergabe abhaengig von den RA-Bits">'+
        '<rect class="s-strong" x="180" y="12" width="200" height="34" rx="4"/>'+
        '<text class="s-lbl" x="280" y="34" text-anchor="middle">Router Advertisement</text>'+
        '<line class="s-arrow" x1="280" y1="46" x2="280" y2="62" marker-end="url(#adr)"/>'+
        '<polygon class="s-warn" points="280,64 356,94 280,124 204,94"/>'+
        '<text class="s-mono" x="280" y="98" text-anchor="middle">M-Bit?</text>'+
        '<line class="s-arrow" x1="204" y1="94" x2="120" y2="94" marker-end="url(#adr)"/>'+
        '<text class="s-mono" x="162" y="86" text-anchor="middle">0</text>'+
        '<line class="s-arrow" x1="356" y1="94" x2="440" y2="94" marker-end="url(#adr)"/>'+
        '<text class="s-mono" x="398" y="86" text-anchor="middle">1</text>'+
        '<rect class="s-ok" x="20" y="132" width="200" height="58" rx="4"/>'+
        '<text class="s-hd" x="120" y="152" text-anchor="middle">SLAAC</text>'+
        '<text class="s-lbl" x="120" y="170" text-anchor="middle">Pr&#228;fix vom Router,</text>'+
        '<text class="s-lbl" x="120" y="184" text-anchor="middle">Rest bildet der Host selbst</text>'+
        '<rect class="s-accent" x="340" y="132" width="200" height="58" rx="4"/>'+
        '<text class="s-hd" x="440" y="152" text-anchor="middle">DHCPv6</text>'+
        '<text class="s-lbl" x="440" y="170" text-anchor="middle">Server vergibt und</text>'+
        '<text class="s-lbl" x="440" y="184" text-anchor="middle">verwaltet die Adressen</text>'+
        '<text class="s-lbl" x="20" y="212">O-Bit = 1 zus&#228;tzlich: DHCPv6 liefert nur DNS und &#228;hnliche Angaben (zustandslos).</text>'+
        '<rect class="s-box" x="20" y="224" width="520" height="34" rx="4"/>'+
        '<text class="s-mono" x="34" y="246">EUI-64:&#160; 50:1A:C5 | F2:38:B7&#160; &#8594;&#160; 521a:c5<tspan class="s-uline">ff:fe</tspan>f2:38b7</text>'+
        '<defs><marker id="adr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Das M-Bit entscheidet über den Weg. Das ff:fe in der Mitte verrät, dass der Interface-Identifier aus der MAC gebildet wurde.</figcaption></figure>',
      code:
        "EUI-64 SCHRITT FUER SCHRITT\n\n"+
        "  MAC            50 : 1A : C5 : F2 : 38 : B7\n"+
        "  1. teilen      50 1A C5  |  F2 38 B7\n"+
        "  2. FFFE rein   50 1A C5 FF FE F2 38 B7\n"+
        "  3. 7. Bit kippen im ersten Byte\n"+
        "        50 = 0101 0000\n"+
        "                    ^ das siebte Bit von links\n"+
        "        52 = 0101 0010\n"+
        "  Ergebnis       521a:c5ff:fef2:38b7\n\n"+
        "  Vollstaendige Adresse mit dem Praefix 2001:db8:1:2::/64\n"+
        "        2001:0db8:0001:0002:521a:c5ff:fef2:38b7\n\n"+
        "MEHRERE ADRESSEN SIND NORMAL\n"+
        "  ip -6 addr show\n\n"+
        "    fe80::521a:c5ff:fef2:38b7      Link-Local, immer da\n"+
        "    2001:db8:1:2:521a:c5ff:fef2:38b7   stabil (EUI-64)\n"+
        "    2001:db8:1:2:9c3f:0a81:ee52:41d7   temporaer\n"+
        "                                       wechselt regelmaessig\n\n"+
        "  Ausgehend wird die TEMPORAERE benutzt, eingehend ist das\n"+
        "  Geraet ueber die stabile erreichbar.\n\n"+
        "WAS DAS FUER DIE PRAXIS BEDEUTET\n"+
        "  Firewallregel auf eine feste IPv6-Adresse?\n"+
        "     -> Privacy Extensions fuer Server abschalten oder\n"+
        "        die Adresse per DHCPv6 fest zuweisen.\n"+
        "  Logdatei zeigt eine unbekannte Adresse?\n"+
        "     -> kann dasselbe Geraet von gestern sein.\n\n"+
        "WARUM SLAAC OHNE SERVER AUSKOMMT\n"+
        "  Praefix kommt per RA vom Router, den Rest bildet der Host.\n"+
        "  Deshalb funktioniert IPv6 im kleinen Netz voellig ohne\n"+
        "  DHCP-Server - der Router genuegt.",
      codeLang:'Adressvergabe',
      tip:'Bei einer Aufgabe zum Vergleich von DHCP und SLAAC lautet der stärkste Punkt nicht „SLAAC braucht keinen Server", sondern die Konsequenz daraus: Es gibt keine zentrale Liste, wer welche Adresse hat. Wer Nachvollziehbarkeit braucht — etwa aus Datenschutz- oder Sicherheitsgründen — nimmt trotzdem DHCPv6 zustandsbehaftet. Genau diese Abwägung will die Prüfung sehen.',
      quiz:[
        {q:'Was liefert das Router Advertisement bei reinem SLAAC?', options:['Die vollständige Adresse','Nur das Präfix, die ersten 64 Bit','Nur den DNS-Server'], correct:1, explain:'Den Interface-Identifier bildet der Host selbst.'},
        {q:'Woran erkennt man einen nach EUI-64 gebildeten Interface-Identifier?', options:['Am eingeschobenen ff:fe in der Mitte','An der führenden Null','An der Länge'], correct:0, explain:'Die MAC wird geteilt, FFFE eingeschoben und das siebte Bit umgedreht.'},
        {q:'Wozu dienen die Privacy Extensions?', options:['Zur Verschlüsselung des Verkehrs','Der Interface-Identifier wird zufällig gewählt und gewechselt, damit das Gerät nicht wiedererkennbar ist','Zur schnelleren Adressvergabe'], correct:1, explain:'Aus der MAC gebildete Adressen wären netzübergreifend eindeutig und damit verfolgbar.'}
      ]
    },
    {
      id:'m13-l6', title:'Der Umstieg: Präfixplanung, Dual Stack und NAT64', minutes:10,
      body:
        '<p>IPv4 und IPv6 sind <strong>nicht kompatibel</strong>. Ein reiner IPv6-Rechner kann einen reinen IPv4-Server nicht ansprechen &#8211; es sind verschiedene Protokolle, kein Dialekt desselben. Deshalb braucht der Umstieg Übergangsverfahren.</p>'+
        '<p><strong>Die Präfixplanung</strong> zuerst, weil sie in Aufgaben zur Netzplanung auftaucht. Anders als bei IPv4 wird <em>nicht</em> gespart:</p>'+
        '<table class="lesson-table"><tr><th>Präfix</th><th>Wer bekommt es</th><th>Enthält</th></tr>'+
        '<tr><td><code>/48</code></td><td>ein Unternehmen vom Provider</td><td>65.536 Teilnetze</td></tr>'+
        '<tr><td><code>/56</code></td><td>ein Standort oder ein Privatanschluss</td><td>256 Teilnetze</td></tr>'+
        '<tr><td><code>/64</code></td><td><strong>jedes einzelne Teilnetz</strong></td><td>2&#8310;&#8308; Adressen</td></tr></table>'+
        '<p><strong>Die eiserne Regel: Ein Teilnetz ist immer ein /64.</strong> Nicht kleiner. Das wirkt verschwenderisch, ist aber Absicht &#8211; SLAAC und die angeforderte Knotengruppe setzen 64 Hostbits voraus und funktionieren bei einem /80 oder /96 schlicht nicht. Wer aus Sparsamkeit kleiner schneidet, bricht die automatische Adressvergabe. Gespart wird bei IPv6 nicht.</p>'+
        '<p><strong>Die drei Übergangsverfahren:</strong></p>'+
        '<ul><li><strong>Dual Stack</strong> &#8211; das Gerät spricht <em>beides</em> gleichzeitig und wählt je Ziel das passende Protokoll. Der saubere und heute übliche Weg. Preis: doppelte Adressverwaltung, doppelte Firewallregeln.</li>'+
        '<li><strong>Tunnel</strong> &#8211; IPv6-Pakete werden in IPv4-Pakete verpackt, um eine Strecke zu überbrücken, die nur IPv4 kann. Nützlich als Übergang, kostet Nutzlast und erschwert die Fehlersuche.</li>'+
        '<li><strong>NAT64 mit DNS64</strong> &#8211; für reine IPv6-Netze, die noch IPv4-Ziele erreichen müssen. DNS64 erfindet für einen IPv4-Server eine IPv6-Adresse, NAT64 übersetzt den Verkehr. So kommt ein Gerät ohne jede IPv4-Adresse ins alte Internet.</li></ul>'+
        '<p><strong>Ein Unterschied im Betrieb, der geprüft wird: Router fragmentieren in IPv6 nicht.</strong> Ist ein Paket für die nächste Strecke zu groß, verwirft der Router es und meldet per ICMPv6 <em>Packet Too Big</em> mit der zulässigen Größe. Der <strong>Absender</strong> passt daraufhin seine Paketgröße an &#8211; das nennt man <strong>Path MTU Discovery</strong>. Die Mindest-MTU liegt bei <strong>1280 Byte</strong>.</p>'+
        '<p>Daraus folgt eine häufige Störung: Wer ICMPv6 pauschal in der Firewall blockiert, zerstört die Path MTU Discovery. Kleine Seiten laden dann, große bleiben hängen. Bei IPv4 war ICMP verzichtbar, <strong>bei IPv6 ist es Teil des Betriebs</strong> &#8211; NDP läuft ebenfalls darüber.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 262" role="img" aria-label="Praefixhierarchie und die drei Uebergangsverfahren">'+
        '<text class="s-hd" x="20" y="22">Pr&#228;fixplanung &#8211; von oben nach unten</text>'+
        '<rect class="s-strong" x="20" y="32" width="520" height="30" rx="3"/>'+
        '<text class="s-lbl" x="280" y="52" text-anchor="middle">/48 &#8211; das Unternehmen &#183; 65.536 Teilnetze</text>'+
        '<rect class="s-accent" x="60" y="68" width="440" height="28" rx="3"/>'+
        '<text class="s-lbl" x="280" y="87" text-anchor="middle">/56 &#8211; ein Standort &#183; 256 Teilnetze</text>'+
        '<rect class="s-ok" x="110" y="102" width="120" height="28" rx="3"/>'+
        '<text class="s-mono" x="170" y="121" text-anchor="middle">/64 Vertrieb</text>'+
        '<rect class="s-ok" x="236" y="102" width="120" height="28" rx="3"/>'+
        '<text class="s-mono" x="296" y="121" text-anchor="middle">/64 Technik</text>'+
        '<rect class="s-ok" x="362" y="102" width="120" height="28" rx="3"/>'+
        '<text class="s-mono" x="422" y="121" text-anchor="middle">/64 G&#228;ste</text>'+
        '<text class="s-lbl" x="20" y="150">Ein Teilnetz ist immer ein /64 &#8211; kleiner bricht SLAAC.</text>'+
        '<rect class="s-box" x="20" y="164" width="166" height="80" rx="4"/>'+
        '<text class="s-hd" x="103" y="186" text-anchor="middle">Dual Stack</text>'+
        '<text class="s-lbl" x="103" y="206" text-anchor="middle">beides gleichzeitig,</text>'+
        '<text class="s-lbl" x="103" y="222" text-anchor="middle">je Ziel das passende</text>'+
        '<text class="s-mono" x="103" y="238" text-anchor="middle">der Normalfall</text>'+
        '<rect class="s-box" x="197" y="164" width="166" height="80" rx="4"/>'+
        '<text class="s-hd" x="280" y="186" text-anchor="middle">Tunnel</text>'+
        '<text class="s-lbl" x="280" y="206" text-anchor="middle">IPv6 verpackt in IPv4,</text>'+
        '<text class="s-lbl" x="280" y="222" text-anchor="middle">um eine Strecke zu</text>'+
        '<text class="s-lbl" x="280" y="238" text-anchor="middle">&#252;berbr&#252;cken</text>'+
        '<rect class="s-box" x="374" y="164" width="166" height="80" rx="4"/>'+
        '<text class="s-hd" x="457" y="186" text-anchor="middle">NAT64 + DNS64</text>'+
        '<text class="s-lbl" x="457" y="206" text-anchor="middle">reines IPv6-Netz</text>'+
        '<text class="s-lbl" x="457" y="222" text-anchor="middle">erreicht IPv4-Ziele</text>'+
        '<text class="s-mono" x="457" y="238" text-anchor="middle">&#252;bersetzt</text>'+
        '</svg><figcaption>Die Hierarchie ist bewusst großzügig. Wer beim Teilnetz unter /64 geht, spart Adressen, die es im Überfluss gibt, und verliert die automatische Vergabe.</figcaption></figure>',
      code:
        "WIE VIELE TEILNETZE STECKEN DRIN?\n\n"+
        "  Von /48 auf /64  ->  16 Bit frei  ->  2^16 = 65.536\n"+
        "  Von /56 auf /64  ->   8 Bit frei  ->  2^8  =    256\n"+
        "  Von /48 auf /56  ->   8 Bit frei  ->  2^8  =    256 Standorte\n\n"+
        "  Formel: 2 hoch (Zielpraefix - Ausgangspraefix)\n"+
        "  KEIN Abzug von 2 - IPv6 kennt keine Broadcastadresse.\n\n"+
        "TYPISCHE PRUEFUNGSRECHNUNG\n"+
        "  \"Ein Unternehmen erhaelt 2001:db8:1200::/40.\n"+
        "   Wie viele /48 lassen sich daraus bilden?\"\n"+
        "     48 - 40 = 8  ->  2^8 = 256\n\n"+
        "PATH MTU DISCOVERY\n"+
        "  IPv4: Router darf fragmentieren\n"+
        "  IPv6: Router fragmentiert NIE\n"+
        "        -> verwirft und meldet ICMPv6 Packet Too Big\n"+
        "        -> der ABSENDER verkleinert seine Pakete\n"+
        "  Mindest-MTU 1280 Byte.\n\n"+
        "  Stoerungsbild bei blockiertem ICMPv6\n"+
        "     Ping geht, kleine Seiten laden, grosse haengen.\n"+
        "     Ursache: Path MTU Discovery kaputt.\n"+
        "     Merke: ICMPv6 nicht pauschal blocken - NDP laeuft\n"+
        "     ebenfalls darueber, sonst findet sich gar nichts mehr.\n\n"+
        "REIHENFOLGE BEI DUAL STACK\n"+
        "  Hat ein Name einen AAAA- UND einen A-Eintrag, versucht das\n"+
        "  Betriebssystem in der Regel zuerst IPv6 und faellt bei\n"+
        "  Problemen schnell auf IPv4 zurueck (Happy Eyeballs).\n"+
        "  Deshalb faellt ein kaputtes IPv6 oft erst spaet auf.",
      codeLang:'IPv6-Umstieg',
      tip:'Die Frage, warum ein Teilnetz immer ein /64 bleibt, obwohl darin mehr Adressen stecken als die Erde Sandkörner hat, ist eine gute Verständnisfrage. Die Antwort ist nicht Großzügigkeit, sondern Technik: SLAAC bildet den Interface-Identifier aus 64 Bit, und die angeforderte Knotengruppe setzt dieselbe Struktur voraus. Bei einem /80 funktioniert die automatische Adressvergabe nicht mehr.',
      quiz:[
        {q:'Wie groß ist ein einzelnes IPv6-Teilnetz üblicherweise?', options:['/48','/56','/64'], correct:2, explain:'Kleiner zu schneiden bricht SLAAC und die angeforderte Knotengruppe.'},
        {q:'Was passiert in IPv6, wenn ein Paket für die nächste Strecke zu groß ist?', options:['Der Router fragmentiert es','Der Router verwirft es und meldet Packet Too Big — der Absender verkleinert','Es wird verworfen ohne Meldung'], correct:1, explain:'Das ist die Path MTU Discovery. Die Mindest-MTU beträgt 1280 Byte.'},
        {q:'Wozu dient NAT64 zusammen mit DNS64?', options:['Damit ein reines IPv6-Netz noch IPv4-Ziele erreicht','Zum Verschlüsseln von IPv6','Um IPv4-Adressen zu sparen'], correct:0, explain:'DNS64 erfindet für den IPv4-Server eine IPv6-Adresse, NAT64 übersetzt den Verkehr.'}
      ]
    },
  ]
});
MODULES.push({
  id:'m14', part:4, partTitle:'Netzwerktechnik', title:'Netzdienste, WLAN & Speichernetze', relevanz:'hoch',
  lessons:[
    {
      id:'m14-l1', title:'DHCP und ARP', minutes:9,
      body:
        '<p><strong>DHCP</strong> vergibt die IP-Konfiguration automatisch. Der Ablauf – Merkwort <strong>DORA</strong>:</p>'+
        '<ul><li><strong>D</strong>iscover – der Client sucht per Broadcast einen Server.</li>'+
        '<li><strong>O</strong>ffer – der Server bietet eine Adresse an.</li>'+
        '<li><strong>R</strong>equest – der Client fordert genau dieses Angebot an.</li>'+
        '<li><strong>A</strong>cknowledge – der Server bestätigt und setzt die Lease-Dauer.</li></ul>'+
        '<p>Verteilt werden typischerweise: IP-Adresse, Subnetzmaske, Standardgateway, DNS-Server, Lease-Dauer. Eine <strong>DHCP-Reservierung</strong> bindet eine feste IP an eine MAC-Adresse – die saubere Alternative zur statischen Konfiguration am Gerät.</p>'+
        '<p><strong>ARP</strong> löst zu einer bekannten <strong>IP-Adresse</strong> die zugehörige <strong>MAC-Adresse</strong> im lokalen Netz auf. Der Ablauf: ARP-Request per Broadcast („Wer hat 192.168.0.1?"), ARP-Reply per Unicast, Speicherung im <strong>ARP-Cache</strong> (<code>arp -a</code>).</p>',
      code:
        "ARP schlaegt die Bruecke zwischen Schicht 3 und Schicht 2:\n\n"+
        "  Anwendung adressiert per IP     (Schicht 3)\n"+
        "  Versand im LAN erfolgt per MAC  (Schicht 2)\n\n"+
        "  1. Broadcast an ff:ff:ff:ff:ff:ff - \"Wer hat 192.168.0.1?\"\n"+
        "  2. Unicast-Antwort des Besitzers - \"Ich, hier ist meine MAC.\"\n"+
        "  3. Eintrag im ARP-Cache (laeuft nach Minuten ab)\n\n"+
        "Fuer Ziele ausserhalb wird die MAC des Standardgateways aufgeloest.",
      codeLang:'ARP',
      tip:'Ein Sicherheitsaspekt, der in Prüfungen gern als Zusatzfrage auftaucht: ARP ist unauthentifiziert – jeder kann behaupten, eine bestimmte IP zu besitzen. Dieses ARP-Spoofing ermöglicht Man-in-the-Middle-Angriffe im lokalen Netz. Gegenmaßnahmen sind Dynamic ARP Inspection auf dem Switch, statische Einträge und Port Security.',
      quiz:[
        {q:'Wofür steht DORA beim DHCP?', options:['Discover, Offer, Request, Acknowledge','Domain, Object, Route, Address','Data, Order, Reply, Ack'], correct:0, explain:'Die vier Schritte der dynamischen Adressvergabe.'},
        {q:'Was ermittelt ARP?', options:['Die IP zu einer bekannten MAC','Die MAC zu einer bekannten IP im lokalen Netz','Den Hostnamen zu einer IP'], correct:1, explain:'Die Umkehrung leistete früher RARP, heute DHCP.'},
        {q:'Was verteilt ein DHCP-Server typischerweise außer der IP-Adresse?', options:['Nur die IP','Subnetzmaske, Gateway, DNS-Server und Lease-Dauer','Das Passwort'], correct:1, explain:'Deshalb ist ein Gerät mit APIPA-Adresse auch ohne Gateway und DNS.'}
      ]
    },
    {
      id:'m14-l2', title:'DNS und Diagnosewerkzeuge', minutes:8,
      body:
        '<p><strong>DNS</strong> übersetzt Namen in IP-Adressen. Die Auflösung läuft hierarchisch: Root-Server → Top-Level-Domain (.de) → autoritativer Nameserver der Domain. Antworten werden zwischengespeichert (Cache mit TTL).</p>'+
        '<p>Die wichtigsten <strong>Ressource Records</strong>: <strong>A</strong> (Name → IPv4), <strong>AAAA</strong> (Name → IPv6), <strong>CNAME</strong> (Alias), <strong>MX</strong> (Mailserver), <strong>PTR</strong> (Reverse-Lookup), <strong>NS</strong> (zuständiger Nameserver).</p>'+
        '<p>Dein <strong>Werkzeugkasten</strong> für die Fehlersuche:</p>'+
        '<ul><li><code>ping</code> – Erreichbarkeit über ICMP, zeigt Antwortzeit und Paketverlust.</li>'+
        '<li><code>tracert</code> / <code>traceroute</code> – zeigt jeden Router auf dem Weg; findet, <em>wo</em> der Weg abbricht.</li>'+
        '<li><code>ipconfig /all</code> bzw. <code>ip a</code> – eigene Konfiguration inklusive MAC.</li>'+
        '<li><code>ipconfig /release</code> und <code>/renew</code> – DHCP-Lease erneuern.</li>'+
        '<li><code>arp -a</code> – ARP-Cache anzeigen.</li>'+
        '<li><code>nslookup</code> / <code>dig</code> – DNS testen.</li>'+
        '<li><code>netstat -an</code> / <code>ss</code> – offene Verbindungen und lauschende Ports.</li></ul>',
      code:'',
      tip:'Achte bei Befehlsaufgaben auf die Parameter – sie sind oft der eigentliche Punkt. Das schlichte ipconfig zeigt die MAC-Adresse nicht an, erst ipconfig /all tut das. Wer nur ipconfig schreibt, wenn nach der physischen Adresse gefragt ist, bekommt keinen Punkt. Alternativen unter Windows sind getmac /v, unter Linux ip link.',
      quiz:[
        {q:'Welcher Ressource Record ordnet einem Namen eine IPv6-Adresse zu?', options:['A','AAAA','MX'], correct:1, explain:'A steht für IPv4, AAAA für IPv6 – vier A für die vierfache Adresslänge.'},
        {q:'Welcher Befehl zeigt die MAC-Adresse an?', options:['ipconfig','ipconfig /all','ping'], correct:1, explain:'Ohne den Parameter /all fehlt die physische Adresse.'},
        {q:'Welcher Befehl zeigt den Weg über alle Router bis zum Ziel?', options:['ping','tracert bzw. traceroute','nslookup'], correct:1, explain:'So findet man, an welcher Stelle der Weg abbricht.'}
      ]
    },
    {
      id:'m14-l3', title:'WLAN und Sicherheitsverfahren', minutes:8,
      body:
        '<p>Für den WLAN-Zugang braucht ein Client zwei Angaben: die <strong>SSID</strong> (den Netzwerknamen) und den <strong>Pre-shared Key</strong> (das Passwort).</p>'+
        '<p>Die <strong>Verschlüsselungsstandards</strong> in historischer Reihenfolge: <strong>WEP</strong> (gebrochen, nicht mehr verwenden) → <strong>WPA</strong> (TKIP, veraltet) → <strong>WPA2</strong> (AES/CCMP, Mindeststandard) → <strong>WPA3</strong> (SAE, Schutz gegen Offline-Wörterbuchangriffe, Forward Secrecy).</p>'+
        '<p>Die beiden <strong>Betriebsarten</strong> – der Kern der typischen Prüfungsfrage:</p>'+
        '<ul><li><strong>Personal / PSK</strong> – ein gemeinsames Passwort für alle. Einfach umzusetzen, aber: Scheidet ein Mitarbeiter aus, muss es auf allen Geräten geändert werden. Geeignet für kleine Unternehmen.</li>'+
        '<li><strong>Enterprise / 802.1X mit EAP und RADIUS-Server</strong> – individuelle Benutzerkonten oder Zertifikate. Ein einzelner Zugang lässt sich gezielt sperren, jeder Zugriff ist protokolliert. Preis: ein RADIUS-Server muss betrieben werden. Geeignet für mittlere und große Unternehmen.</li></ul>'+
        '<p>Die drei Rollen bei 802.1X: <strong>Supplicant</strong> (Endgerät) – <strong>Authenticator</strong> (Access Point/Switch) – <strong>Authentication Server</strong> (RADIUS).</p>',
      code:'',
      tip:'Zwei oft genannte WLAN-Maßnahmen taugen wenig und du solltest das wissen: Das Abschalten des SSID-Broadcasts ist kosmetisch, denn die SSID wird beim Verbinden ohnehin übertragen. Und der MAC-Filter ist leicht zu umgehen, weil MAC-Adressen per Software gefälscht werden können. Als „zusätzliche Hürde" darfst du sie nennen, als Sicherheitsmaßnahme nicht.',
      quiz:[
        {q:'Welcher WLAN-Standard ist heute Mindeststandard?', options:['WEP','WPA','WPA2 (besser WPA3)'], correct:2, explain:'WEP ist gebrochen, WPA mit TKIP veraltet.'},
        {q:'Welchen Vorteil bietet WPA-Enterprise mit RADIUS?', options:['Es ist einfacher einzurichten','Individuelle Zugänge lassen sich gezielt sperren und protokollieren','Es ist schneller'], correct:1, explain:'Beim PSK müsste man das Passwort auf allen Geräten ändern.'},
        {q:'Warum ist ein MAC-Filter keine echte Sicherheitsmaßnahme?', options:['Er ist zu langsam','MAC-Adressen lassen sich per Software fälschen','Er funktioniert nur im LAN'], correct:1, explain:'Als zusätzliche Hürde darf man ihn nennen, als Schutzkonzept nicht.'}
      ]
    },
    {
      id:'m14-l4', title:'DAS, NAS und SAN', minutes:8,
      body:
        '<p>Die drei Speicherarchitekturen werden regelmäßig verglichen:</p>'+
        '<ul><li><strong>DAS</strong> (Direct Attached Storage) – Speicher direkt am Server. Einfach und schnell, aber nur von diesem einen Server nutzbar.</li>'+
        '<li><strong>NAS</strong> (Network Attached Storage) – eigenständiges Speichergerät im LAN, stellt <strong>Dateien</strong> über SMB/CIFS oder NFS bereit. Einfach einzurichten, günstig, für viele Clients nutzbar. Nachteil: dateibasiert (nicht optimal für Datenbanken), teilt sich die Bandbreite mit dem normalen LAN-Verkehr.</li>'+
        '<li><strong>SAN</strong> (Storage Area Network) – eigenes Hochgeschwindigkeitsnetz nur für Speicher, stellt den Servern <strong>Blockspeicher</strong> bereit. Sehr hohe Performance, ideal für Datenbanken und Virtualisierung, Erweiterung im laufenden Betrieb. Nachteil: teuer, eigene Infrastruktur (Fibre Channel oder iSCSI), Spezialwissen nötig.</li></ul>'+
        '<p><strong>Der eine Unterschied, den du dir merken musst: NAS liefert Dateien, SAN liefert Blöcke.</strong> Daraus folgt alles andere – Performance, Datenbanktauglichkeit und Kosten.</p>',
      code:'',
      tip:'Aus dem Satz „NAS liefert Dateien, SAN liefert Blöcke" lassen sich alle Vorteile herleiten, ohne sie einzeln zu lernen. Ein Server, der Blöcke bekommt, sieht das SAN wie eine lokale Festplatte und kann sein eigenes Dateisystem darauflegen – deshalb eignet es sich für Datenbanken und Virtualisierung. Ein NAS bringt sein Dateisystem mit und ist deshalb für gemeinsame Dateiablagen ideal.',
      quiz:[
        {q:'Was ist der Kernunterschied zwischen NAS und SAN?', options:['NAS liefert Dateien, SAN liefert Blöcke','NAS ist schneller','SAN nutzt WLAN'], correct:0, explain:'Daraus folgen Performance, Datenbanktauglichkeit und Kosten.'},
        {q:'Welche Protokolle nutzt ein SAN?', options:['SMB und NFS','Fibre Channel und iSCSI','HTTP und FTP'], correct:1, explain:'SMB und NFS sind dateibasierte NAS-Protokolle.'},
        {q:'Welche Speicherlösung eignet sich am besten für eine Datenbank?', options:['NAS über SMB','SAN mit Blockspeicher','Ein USB-Laufwerk'], correct:1, explain:'Der Server legt sein eigenes Dateisystem auf den Blockspeicher — das brauchen Datenbanken.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m15', part:5, partTitle:'IT-Sicherheit & Datenschutz', title:'Schutzziele & Maßnahmen', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m15-l1', title:'Die Schutzziele der Informationssicherheit', minutes:9,
      body:
        '<p>Die <strong>drei Grundschutzziele</strong> nach BSI – Merkwort <strong>VIV</strong> oder englisch <strong>CIA</strong>:</p>'+
        '<table class="lesson-table"><tr><th>Ziel</th><th>Bedeutung</th><th>Typische Maßnahme</th></tr>'+
        '<tr><td><strong>Vertraulichkeit</strong> (Confidentiality)</td><td>Nur Befugte sehen die Daten</td><td>Verschlüsselung, Berechtigungskonzept</td></tr>'+
        '<tr><td><strong>Integrität</strong> (Integrity)</td><td>Daten sind unverändert und vollständig</td><td>Prüfsummen, Hashwerte, Signaturen</td></tr>'+
        '<tr><td><strong>Verfügbarkeit</strong> (Availability)</td><td>Daten sind bei Bedarf nutzbar</td><td>Backup, Redundanz, RAID, USV</td></tr></table>'+
        '<p>Ergänzend werden häufig genannt: <strong>Authentizität</strong> (die Identität ist echt), <strong>Verbindlichkeit / Nichtabstreitbarkeit</strong> (eine Handlung ist nachweisbar dem Urheber zuzuordnen) und <strong>Belastbarkeit</strong>.</p>'+
        '<p>Bei der Aufgabenform „Ordnen Sie die Maßnahme einem Schutzziel zu" hilft die Kontrollfrage: <em>Wovor schützt sie?</em> Vor Mitlesen → Vertraulichkeit. Vor unbemerkter Veränderung → Integrität. Vor Ausfall → Verfügbarkeit.</p>',
      code:'',
      tip:'Eine Maßnahme kann mehreren Zielen dienen, und genau das bringt zusätzliche Punkte, wenn du es begründest. Eine digitale Signatur sichert die Integrität, weil jede Änderung sie ungültig macht, zugleich die Authentizität, weil sie den Urheber ausweist, und die Verbindlichkeit, weil er die Urheberschaft nicht abstreiten kann. Drei Ziele mit einer Maßnahme.',
      quiz:[
        {q:'Welchem Schutzziel dient ein RAID-Verbund?', options:['Vertraulichkeit','Integrität','Verfügbarkeit'], correct:2, explain:'RAID überbrückt den Ausfall einer Festplatte – es schützt nicht vor unbefugtem Lesen.'},
        {q:'Welches Schutzziel sichert ein Hashwert?', options:['Integrität','Verfügbarkeit','Vertraulichkeit'], correct:0, explain:'Er macht jede nachträgliche Veränderung erkennbar.'},
        {q:'Welchem Schutzziel dient die Nichtabstreitbarkeit am nächsten?', options:['Verfügbarkeit','Verbindlichkeit und Authentizität','Vertraulichkeit'], correct:1, explain:'Erreicht wird sie vor allem durch digitale Signaturen und lückenlose Protokollierung.'}
      ]
    },
    {
      id:'m15-l2', title:'Technische und organisatorische Maßnahmen', minutes:9,
      body:
        '<p>Die AP1 fragt sehr häufig: „Nennen Sie je zwei technische und zwei organisatorische Maßnahmen." Die Unterscheidung ist einfach:</p>'+
        '<p><strong>Technisch (TOM technisch)</strong> – etwas, das man installiert, konfiguriert oder baut: Firewall, Virenschutz, Verschlüsselung, Backup, Zugangskontrolle per Chipkarte, automatische Bildschirmsperre, Patchmanagement, VPN, USV.</p>'+
        '<p><strong>Organisatorisch</strong> – etwas, das man regelt, schult oder dokumentiert: Passwortrichtlinie, Berechtigungskonzept nach dem <strong>Need-to-know-Prinzip</strong>, Mitarbeiterschulung, Clean-Desk-Policy, Besucherregelung, Notfallhandbuch, Vier-Augen-Prinzip, Vertraulichkeitsvereinbarung, Löschkonzept.</p>'+
        '<p>Die klassische <strong>Einteilung nach Ebenen</strong> für Aufgaben zum Gesamtkonzept:</p>'+
        '<ul><li><strong>Baulich / physisch</strong> – Zaun, Schließanlage, Serverraum, Brandschutz, Klimatisierung.</li>'+
        '<li><strong>Technisch</strong> – siehe oben.</li>'+
        '<li><strong>Organisatorisch</strong> – siehe oben.</li>'+
        '<li><strong>Personell</strong> – Schulung, Sensibilisierung, Zuverlässigkeitsprüfung.</li></ul>',
      code:'',
      tip:'Der Fehler, der hier regelmäßig Punkte kostet: eine Maßnahme nennen, die in der Zwischenkategorie liegt, und sie nicht begründen. „Passwörter" allein ist unklar. „Passwortrichtlinie mit Mindestlänge und Wechselintervall" ist eindeutig organisatorisch, „erzwungene Passwortkomplexität per Gruppenrichtlinie" eindeutig technisch. Formuliere so, dass die Zuordnung aus der Maßnahme selbst hervorgeht.',
      quiz:[
        {q:'Welche Maßnahme ist organisatorisch?', options:['Firewall-Regelwerk','Schulung der Mitarbeiter zu Phishing','Festplattenverschlüsselung'], correct:1, explain:'Sie wird nicht installiert, sondern durchgeführt und dokumentiert.'},
        {q:'Was besagt das Need-to-know-Prinzip?', options:['Jeder soll alles wissen','Jeder erhält nur die Rechte, die er für seine Aufgabe braucht','Nur der Chef hat Rechte'], correct:1, explain:'Auch „Prinzip der minimalen Rechte" genannt.'},
        {q:'Welche Maßnahme ist baulich statt technisch?', options:['Virenschutz','Brandschutztür am Serverraum','Verschlüsselung'], correct:1, explain:'Die bauliche Ebene wird bei Sicherheitskonzepten oft vergessen.'}
      ]
    },
    {
      id:'m15-l3', title:'Backup-Strategien und RAID', minutes:10,
      body:
        '<p>Die <strong>drei Sicherungsarten</strong> – das wird fast jede Prüfung abgefragt:</p>'+
        '<table class="lesson-table"><tr><th>Art</th><th>Gesichert wird</th><th>Sicherung</th><th>Rücksicherung</th></tr>'+
        '<tr><td><strong>Voll</strong></td><td>alle Daten</td><td>langsam, viel Platz</td><td>schnell: 1 Medium</td></tr>'+
        '<tr><td><strong>Differenziell</strong></td><td>alles seit der letzten <em>Voll</em>sicherung</td><td>mittel, wächst täglich</td><td>mittel: Voll + letzte diff.</td></tr>'+
        '<tr><td><strong>Inkrementell</strong></td><td>alles seit der letzten <em>beliebigen</em> Sicherung</td><td>schnell, wenig Platz</td><td>langsam: Voll + <em>alle</em> ink.</td></tr></table>'+
        '<p><strong>Die 3-2-1-Regel:</strong> 3 Kopien der Daten, auf 2 verschiedenen Medientypen, davon 1 außer Haus (bzw. offline – Schutz vor Ransomware).</p>'+
        '<p><strong>RAID-Level:</strong></p>'+
        '<ul><li><strong>RAID 0</strong> (Striping) – schnell, <strong>keine</strong> Ausfallsicherheit. Kein echtes RAID im Sinne der Sicherheit. Nutzkapazität 100 %.</li>'+
        '<li><strong>RAID 1</strong> (Mirroring) – zwei identische Platten, eine darf ausfallen. Nutzkapazität 50 %.</li>'+
        '<li><strong>RAID 5</strong> – Striping mit verteilter Parität, mindestens 3 Platten, eine darf ausfallen. Nutzkapazität <code>(n−1) × Plattengröße</code>.</li>'+
        '<li><strong>RAID 6</strong> – doppelte Parität, mindestens 4 Platten, zwei dürfen ausfallen. Nutzkapazität <code>(n−2) × Plattengröße</code>.</li>'+
        '<li><strong>RAID 10</strong> – gespiegelt und gestriped, mindestens 4 Platten. Schnell und sicher, Nutzkapazität 50 %.</li></ul>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Vergleich der RAID-Level 0, 1 und 5"><text class="s-hd" x="20" y="20">RAID 0 &#8211; Striping</text><rect class="s-box" x="20" y="28" width="86" height="40" rx="4"/><text class="s-mono" x="63" y="53" text-anchor="middle">A1 A3</text><rect class="s-box" x="114" y="28" width="86" height="40" rx="4"/><text class="s-mono" x="157" y="53" text-anchor="middle">A2 A4</text><text class="s-lbl" x="212" y="53">schnell, 100 % Kapazit&#228;t, KEINE Sicherheit</text><text class="s-hd" x="20" y="96">RAID 1 &#8211; Mirroring</text><rect class="s-accent" x="20" y="104" width="86" height="40" rx="4"/><text class="s-mono" x="63" y="129" text-anchor="middle">A1 A2</text><rect class="s-accent" x="114" y="104" width="86" height="40" rx="4"/><text class="s-mono" x="157" y="129" text-anchor="middle">A1 A2</text><text class="s-lbl" x="212" y="129">gespiegelt, 50 % Kapazit&#228;t, 1 Platte darf ausfallen</text><text class="s-hd" x="20" y="172">RAID 5 &#8211; Striping mit verteilter Parit&#228;t</text><rect class="s-box" x="20" y="180" width="60" height="16" rx="3"/><text class="s-mono" x="50" y="192" text-anchor="middle">A1</text><rect class="s-box" x="86" y="180" width="60" height="16" rx="3"/><text class="s-mono" x="116" y="192" text-anchor="middle">A2</text><rect class="s-strong" x="152" y="180" width="60" height="16" rx="3"/><text class="s-mono" x="182" y="192" text-anchor="middle">Ap</text><text class="s-lbl" x="224" y="192">mind. 3 Platten &#183; (n&#8722;1) &#215; Gr&#246;&#223;e &#183; 1 Ausfall verkraftbar</text></svg><figcaption>RAID schuetzt gegen den Ausfall einer Platte, nicht gegen Loeschen, Ransomware oder Feuer. Es ersetzt niemals ein Backup.</figcaption></figure>',
      code:
        "Rechenbeispiel: 5 Festplatten a 4 TB\n\n"+
        "  RAID 0:  5 x 4 TB = 20 TB   (keine Ausfallsicherheit)\n"+
        "  RAID 5:  (5-1) x 4 = 16 TB  (1 Platte darf ausfallen)\n"+
        "  RAID 6:  (5-2) x 4 = 12 TB  (2 Platten duerfen ausfallen)\n"+
        "  RAID 10: 20 / 2  = 10 TB    (bei gerader Plattenzahl)",
      codeLang:'RAID-Kapazität',
      tip:'Der wichtigste Satz zum Thema, der in Begründungsaufgaben fast immer verlangt wird: RAID ist kein Backup. Es schützt gegen den Hardwareausfall einer Platte, nicht gegen versehentliches Löschen, nicht gegen Ransomware und nicht gegen Feuer im Serverraum – all das trifft den Spiegel sofort mit. Deshalb braucht es zusätzlich eine Sicherung, und mindestens eine Kopie davon offline.',
      quiz:[
        {q:'Was wird bei einer differenziellen Sicherung gesichert?', options:['Alles seit der letzten beliebigen Sicherung','Alles seit der letzten Vollsicherung','Nur die geänderten Dateien von heute'], correct:1, explain:'Die inkrementelle Sicherung bezieht sich dagegen auf die letzte beliebige Sicherung.'},
        {q:'Wie viel Nutzkapazität bieten 6 Platten à 2 TB im RAID 5?', options:['12 TB','10 TB','6 TB'], correct:1, explain:'(6−1) × 2 TB = 10 TB, eine Platte geht für die Parität drauf.'},
        {q:'Wie viele Platten dürfen bei RAID 6 gleichzeitig ausfallen?', options:['Eine','Zwei','Keine'], correct:1, explain:'Dafür braucht es mindestens vier Platten und die Nutzkapazität sinkt auf (n−2).'}
      ]
    },
    {
      id:'m15-l4', title:'Verfügbarkeit berechnen und USV', minutes:8,
      body:
        '<p>Die <strong>Verfügbarkeit</strong> in Prozent berechnet sich als:</p>'+
        '<p><code>V = (Gesamtzeit − Ausfallzeit) / Gesamtzeit × 100 %</code></p>'+
        '<p>Ein Jahr hat <strong>8.760 Stunden</strong> (365 × 24) bzw. <strong>525.600 Minuten</strong> – diese Zahlen solltest du parat haben.</p>'+
        '<table class="lesson-table"><tr><th>Verfügbarkeit</th><th>Max. Ausfall pro Jahr</th></tr>'+
        '<tr><td>99 %</td><td>ca. 3,65 Tage</td></tr>'+
        '<tr><td>99,9 % („drei Neunen")</td><td>ca. 8,8 Stunden</td></tr>'+
        '<tr><td>99,99 %</td><td>ca. 52,6 Minuten</td></tr>'+
        '<tr><td>99,999 % („five nines")</td><td>ca. 5,3 Minuten</td></tr></table>'+
        '<p>Zwei Kennzahlen aus dem Notfallmanagement: <strong>RTO</strong> (Recovery Time Objective) ist die maximal tolerierbare <em>Ausfalldauer</em>. <strong>RPO</strong> (Recovery Point Objective) ist der maximal tolerierbare <em>Datenverlust</em>, gemessen in Zeit – er bestimmt, wie oft gesichert werden muss.</p>'+
        '<p>Eine <strong>USV</strong> überbrückt Stromausfälle und fährt Server bei längerem Ausfall kontrolliert herunter – sie schützt vor Datenverlust durch abrupte Abschaltung.</p>',
      code:
        "Ein Server fiel im Jahr 4 Stunden aus. Verfuegbarkeit?\n\n"+
        "  Gesamtzeit  = 365 x 24 = 8.760 h\n"+
        "  V = (8760 - 4) / 8760 = 0,999543...\n"+
        "  V = 99,95 %\n\n"+
        "Umgekehrt: 99,9 % zugesichert - wie viel Ausfall ist erlaubt?\n"+
        "  8.760 h x 0,001 = 8,76 h  (ca. 8 Stunden 46 Minuten)",
      codeLang:'Verfügbarkeitsrechnung',
      tip:'Achte darauf, welche Bezugszeit die Aufgabe meint – das ist der Stolperstein. Ist das SLA auf die Betriebszeit von Montag bis Freitag, 8 bis 18 Uhr bezogen, rechnest du nicht mit 8.760 Stunden, sondern mit etwa 2.600. Dieselbe Ausfalldauer ergibt dann eine deutlich schlechtere Verfügbarkeit. Lies den Bezugszeitraum, bevor du rechnest.',
      quiz:[
        {q:'Wie viele Stunden hat ein Jahr?', options:['8.640','8.760','9.000'], correct:1, explain:'365 × 24 = 8.760 Stunden.'},
        {q:'Was gibt der RPO an?', options:['Wie lange die Wiederherstellung dauern darf','Wie viel Datenverlust (in Zeit) maximal tolerierbar ist','Wie viele Server benötigt werden'], correct:1, explain:'Der RPO bestimmt das Sicherungsintervall, der RTO die Wiederherstellzeit.'},
        {q:'Ein SLA nennt 99,9 % bezogen auf 24/7. Wie viel Ausfall ist erlaubt?', options:['Etwa 88 Stunden','Etwa 8,8 Stunden','Etwa 53 Minuten'], correct:1, explain:'8.760 h × 0,001 — bei Bezug auf die Servicezeit wäre es deutlich weniger.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m16', part:5, partTitle:'IT-Sicherheit & Datenschutz', title:'Kryptografie, Angriffe & DSGVO', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m16-l1', title:'Symmetrisch, asymmetrisch, hybrid', minutes:10,
      body:
        '<p><strong>Symmetrische Verschlüsselung</strong> – <em>ein</em> Schlüssel für Ver- und Entschlüsselung (AES). Sehr schnell, auch für große Datenmengen. Das Problem: der <strong>Schlüsselaustausch</strong>. Wie bekommt der Empfänger den Schlüssel sicher? Und die Zahl der Schlüssel wächst quadratisch: bei n Teilnehmern braucht man <code>n × (n−1) / 2</code> Schlüssel.</p>'+
        '<p><strong>Asymmetrische Verschlüsselung</strong> – ein <strong>Schlüsselpaar</strong> aus öffentlichem und privatem Schlüssel (RSA, ECC). Löst das Austauschproblem, ist aber deutlich langsamer.</p>'+
        '<p><strong>Die Regel, die alles entscheidet:</strong></p>'+
        '<ul><li><strong>Verschlüsseln</strong> mit dem <strong>öffentlichen</strong> Schlüssel des <strong>Empfängers</strong> → nur er kann mit seinem privaten Schlüssel lesen. Ziel: <strong>Vertraulichkeit</strong>.</li>'+
        '<li><strong>Signieren</strong> mit dem <strong>privaten</strong> Schlüssel des <strong>Senders</strong> → jeder kann mit dem öffentlichen prüfen, dass es wirklich von ihm stammt. Ziel: <strong>Authentizität und Integrität</strong>.</li></ul>'+
        '<p><strong>Hybride Verfahren</strong> (TLS/HTTPS) kombinieren beides: Asymmetrisch wird ein zufälliger <strong>Sitzungsschlüssel</strong> ausgetauscht, die eigentlichen Daten laufen dann schnell symmetrisch. So hat man die Sicherheit des einen und die Geschwindigkeit des anderen Verfahrens.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 230" role="img" aria-label="Verschluesseln und Signieren im Vergleich"><text class="s-hd" x="20" y="20">Vertraulichkeit &#8211; Verschl&#252;sseln</text><rect class="s-box" x="20" y="30" width="96" height="34" rx="4"/><text class="s-lbl" x="68" y="52" text-anchor="middle">Sender</text><line class="s-arrow" x1="116" y1="47" x2="228" y2="47" marker-end="url(#ar3)"/><text class="s-lbl" x="172" y="40" text-anchor="middle">&#128274; mit</text><rect class="s-key-pub" x="234" y="30" width="146" height="34" rx="4"/><text class="s-lbl" x="307" y="52" text-anchor="middle">&#246;ffentl. Schl&#252;ssel Empf.</text><line class="s-arrow" x1="380" y1="47" x2="448" y2="47" marker-end="url(#ar3)"/><rect class="s-box" x="454" y="30" width="86" height="34" rx="4"/><text class="s-lbl" x="497" y="52" text-anchor="middle">Empf&#228;nger</text><text class="s-lbl" x="20" y="84">&#8594; nur der Empf&#228;nger kann mit seinem privaten Schl&#252;ssel &#246;ffnen</text><text class="s-hd" x="20" y="118">Authentizit&#228;t &#8211; Signieren</text><rect class="s-box" x="20" y="128" width="96" height="34" rx="4"/><text class="s-lbl" x="68" y="150" text-anchor="middle">Sender</text><line class="s-arrow" x1="116" y1="145" x2="228" y2="145" marker-end="url(#ar3)"/><text class="s-lbl" x="172" y="138" text-anchor="middle">&#9997; mit</text><rect class="s-key-priv" x="234" y="128" width="146" height="34" rx="4"/><text class="s-lbl" x="307" y="150" text-anchor="middle">privatem Schl&#252;ssel Sender</text><line class="s-arrow" x1="380" y1="145" x2="448" y2="145" marker-end="url(#ar3)"/><rect class="s-box" x="454" y="128" width="86" height="34" rx="4"/><text class="s-lbl" x="497" y="150" text-anchor="middle">jeder</text><text class="s-lbl" x="20" y="182">&#8594; jeder kann mit dem &#246;ffentlichen Schl&#252;ssel pr&#252;fen, dass es vom Sender stammt</text><rect class="s-strong" x="20" y="196" width="520" height="28" rx="4"/><text class="s-lbl" x="280" y="214" text-anchor="middle">Hybrid (TLS): asymmetrisch den Sitzungsschl&#252;ssel tauschen, dann symmetrisch mit AES &#252;bertragen</text><defs><marker id="ar3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs></svg><figcaption>Die Merkregel: Verschluesselt wird mit dem oeffentlichen Schluessel des Empfaengers, signiert mit dem eigenen privaten.</figcaption></figure>',
      code:
        "Ablauf einer HTTPS-Verbindung (vereinfacht):\n\n"+
        "  1. Server sendet sein Zertifikat mit oeffentlichem Schluessel\n"+
        "  2. Client prueft das Zertifikat gegen die CA-Kette\n"+
        "  3. Client erzeugt einen zufaelligen Sitzungsschluessel\n"+
        "  4. Client verschluesselt ihn mit dem OEFFENTLICHEN Schluessel des Servers\n"+
        "  5. Nur der Server kann ihn mit seinem PRIVATEN Schluessel oeffnen\n"+
        "  6. Ab jetzt: schnelle symmetrische Verschluesselung (AES)",
      codeLang:'Hybridverfahren',
      tip:'Wenn du in der Prüfung unsicher bist, welcher Schlüssel verwendet wird, hilft eine einzige Frage: Was soll erreicht werden? Soll niemand sonst mitlesen, brauchst du den öffentlichen Schlüssel des Empfängers – nur dessen privates Gegenstück öffnet die Nachricht. Soll bewiesen werden, dass du der Absender bist, brauchst du deinen eigenen privaten Schlüssel, denn nur du besitzt ihn.',
      quiz:[
        {q:'Womit verschlüsselt man eine vertrauliche Nachricht an Herrn Meier?', options:['Mit dem eigenen privaten Schlüssel','Mit Meiers öffentlichem Schlüssel','Mit Meiers privatem Schlüssel'], correct:1, explain:'Nur Meier kann dann mit seinem privaten Schlüssel entschlüsseln.'},
        {q:'Warum arbeitet TLS hybrid?', options:['Aus Kompatibilitätsgründen','Asymmetrisch für den sicheren Schlüsselaustausch, symmetrisch für die schnelle Datenübertragung','Weil AES unsicher ist'], correct:1, explain:'Man kombiniert die Stärken beider Verfahren.'},
        {q:'Wie viele Schlüssel braucht symmetrische Verschlüsselung bei 6 Teilnehmern?', options:['6','15','36'], correct:1, explain:'n · (n−1) / 2 — dieselbe Formel wie bei Peer-to-Peer-Beziehungen.'}
      ]
    },
    {
      id:'m16-l2', title:'Hashes, Zertifikate und VPN', minutes:9,
      body:
        '<p>Eine <strong>Hashfunktion</strong> (SHA-256) erzeugt aus beliebigen Daten einen Wert fester Länge. Sie ist <strong>Einwegfunktion</strong> – aus dem Hash lässt sich das Original nicht zurückrechnen. Schon ein geändertes Bit ergibt einen völlig anderen Hash (Lawineneffekt). Einsatz: Integritätsprüfung von Downloads und Passwortspeicherung.</p>'+
        '<p><strong>Passwörter niemals im Klartext speichern</strong>, sondern als Hash mit <strong>Salt</strong> (einem zufälligen Zusatz pro Benutzer, der Rainbow-Table-Angriffe verhindert) und einem bewusst langsamen Verfahren wie bcrypt oder Argon2.</p>'+
        '<p>Ein <strong>digitales Zertifikat</strong> (X.509) bindet einen öffentlichen Schlüssel an eine Identität und wird von einer <strong>Zertifizierungsstelle (CA)</strong> signiert. Es enthält Inhaber, öffentlichen Schlüssel, Aussteller, Gültigkeitszeitraum und die Signatur der CA. Ein selbstsigniertes Zertifikat verschlüsselt zwar, weist aber die Identität nicht vertrauenswürdig aus – daher die Browserwarnung.</p>'+
        '<p>Ein <strong>VPN</strong> baut durch ein unsicheres Netz einen verschlüsselten <strong>Tunnel</strong> auf. <strong>Site-to-Site</strong> verbindet zwei Standorte dauerhaft, <strong>End-to-Site</strong> (Remote Access) bindet einzelne Mitarbeiter im Homeoffice ein. Protokolle: IPsec, OpenVPN, WireGuard.</p>',
      code:'',
      tip:'Warum ein VPN im Homeoffice nicht optional ist, lässt sich in einem Satz begründen, und genau diese Begründung will die IHK sehen: Ohne Tunnel liefen die Daten unverschlüsselt über das öffentliche Internet und könnten unterwegs mitgelesen oder verändert werden. Das VPN stellt Vertraulichkeit und Integrität her und macht den Rechner zugleich zum Teil des Firmennetzes.',
      quiz:[
        {q:'Wozu dient ein Salt bei der Passwortspeicherung?', options:['Er macht das Passwort länger','Er verhindert, dass vorberechnete Rainbow Tables funktionieren','Er verschlüsselt das Passwort'], correct:1, explain:'Jeder Benutzer bekommt einen eigenen Zufallswert – gleiche Passwörter ergeben verschiedene Hashes.'},
        {q:'Was bestätigt eine Zertifizierungsstelle?', options:['Dass der Server schnell ist','Dass ein öffentlicher Schlüssel wirklich zu dieser Identität gehört','Dass die Daten verschlüsselt sind'], correct:1, explain:'Ohne diese Bestätigung wäre ein Man-in-the-Middle-Angriff möglich.'},
        {q:'Warum warnt der Browser bei einem selbstsignierten Zertifikat?', options:['Es verschlüsselt nicht','Die Identität ist von keiner vertrauenswürdigen Stelle bestätigt','Es ist abgelaufen'], correct:1, explain:'Verschlüsselt wird durchaus — nur der Identitätsnachweis fehlt.'}
      ]
    },
    {
      id:'m16-l3', title:'Schadsoftware und Angriffsarten', minutes:9,
      body:
        '<p><strong>Schadsoftware nach Verbreitungsweg:</strong></p>'+
        '<ul><li><strong>Virus</strong> – hängt sich an eine Wirtsdatei, braucht eine Benutzeraktion zur Ausführung.</li>'+
        '<li><strong>Wurm</strong> – verbreitet sich <em>selbstständig</em> über das Netz, ohne Wirt und ohne Zutun.</li>'+
        '<li><strong>Trojaner</strong> – tarnt sich als nützliches Programm und bringt heimlich Schadcode mit.</li>'+
        '<li><strong>Ransomware</strong> – verschlüsselt Daten und fordert Lösegeld. Wirksamster Schutz: ein <strong>offline</strong> gelagertes Backup.</li>'+
        '<li><strong>Spyware / Keylogger</strong> – späht Eingaben und Verhalten aus.</li>'+
        '<li><strong>Rootkit</strong> – verbirgt sich tief im System und verschleiert andere Schädlinge.</li></ul>'+
        '<p><strong>Angriffsarten:</strong> <strong>Phishing</strong> (gefälschte Mails), <strong>Spear-Phishing</strong> (gezielt auf eine Person zugeschnitten), <strong>Social Engineering</strong> (Manipulation von Menschen statt Technik – der Anruf des „IT-Supports"), <strong>DoS/DDoS</strong> (Überlastung eines Dienstes), <strong>Man-in-the-Middle</strong>, <strong>SQL-Injection</strong> (Einschleusen von SQL über Eingabefelder – Gegenmaßnahme: <strong>Prepared Statements</strong> und Eingabevalidierung), <strong>XSS</strong>, <strong>Brute Force</strong>.</p>'+
        '<p><strong>Erkennungsmerkmale einer Phishing-Mail:</strong> unpersönliche Anrede, Dringlichkeit und Drohung, Rechtschreibfehler, abweichende Absenderadresse, Link-Ziel stimmt nicht mit dem angezeigten Text überein, unerwarteter Anhang, Abfrage von Zugangsdaten.</p>',
      code:'',
      tip:'Der Unterschied zwischen Virus und Wurm wird fast in jeder Prüfung abgefragt und lässt sich an einem Wort festmachen: Selbstständigkeit. Der Virus braucht einen Wirt und eine Benutzeraktion, der Wurm verbreitet sich allein über Netzwerkschwachstellen. Deshalb ist ein Wurmausbruch typischerweise viel schneller – und deshalb ist zeitnahes Patchen die wirksamste Gegenmaßnahme.',
      quiz:[
        {q:'Was unterscheidet einen Wurm von einem Virus?', options:['Der Wurm ist harmloser','Der Wurm verbreitet sich selbstständig ohne Wirtsdatei','Der Wurm befällt nur Linux'], correct:1, explain:'Der Virus benötigt eine Wirtsdatei und eine Benutzeraktion.'},
        {q:'Wie verhindert man SQL-Injection wirksam?', options:['Durch ein längeres Passwort','Durch Prepared Statements mit Parametern und Eingabevalidierung','Durch eine Firewall'], correct:1, explain:'Eingaben werden dann als Daten behandelt, nicht als SQL-Code.'},
        {q:'Was ist das wirksamste Mittel gegen Ransomware?', options:['Ein aktueller Virenscanner','Ein offline gelagertes Backup','Eine Firewall'], correct:1, explain:'Alle online erreichbaren Sicherungen werden mitverschlüsselt.'}
      ]
    },
    {
      id:'m16-l4', title:'DSGVO – Grundsätze, Rechte, Pflichten', minutes:10,
      body:
        '<p>Die DSGVO schützt <strong>personenbezogene Daten</strong>: alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen – Name, Adresse, E-Mail, Personalnummer, IP-Adresse, Standortdaten.</p>'+
        '<p><strong>Besondere Kategorien (Art. 9)</strong> genießen erhöhten Schutz: Gesundheitsdaten, ethnische Herkunft, politische Meinungen, religiöse Überzeugungen, Gewerkschaftszugehörigkeit, biometrische Daten, Sexualleben.</p>'+
        '<p><strong>Grundsätze (Art. 5):</strong> Rechtmäßigkeit und Transparenz · <strong>Zweckbindung</strong> · <strong>Datenminimierung</strong> · Richtigkeit · <strong>Speicherbegrenzung</strong> · Integrität und Vertraulichkeit · Rechenschaftspflicht.</p>'+
        '<p><strong>Rechtsgrundlagen (Art. 6)</strong> – eine muss vorliegen: Einwilligung · Vertragserfüllung · rechtliche Verpflichtung · lebenswichtige Interessen · öffentliches Interesse · berechtigtes Interesse.</p>'+
        '<p><strong>Betroffenenrechte:</strong> Auskunft (Art. 15) · Berichtigung (16) · <strong>Löschung / „Recht auf Vergessenwerden"</strong> (17) · Einschränkung (18) · <strong>Datenübertragbarkeit</strong> (20) · Widerspruch (21).</p>'+
        '<p><strong>Pflichten des Unternehmens:</strong> Verzeichnis von Verarbeitungstätigkeiten · TOM nach Art. 32 · <strong>Meldung einer Datenpanne binnen 72 Stunden</strong> an die Aufsichtsbehörde · Datenschutz-Folgenabschätzung bei hohem Risiko · <strong>Auftragsverarbeitungsvertrag (AVV)</strong> mit Dienstleistern, etwa dem Cloud-Anbieter.</p>'+
        '<p><strong>Bußgelder:</strong> bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes – der höhere Wert gilt.</p>',
      code:'',
      tip:'Drei Zahlen und ein Begriffspaar reichen für die meisten DSGVO-Fragen: 72 Stunden für die Meldung einer Datenpanne, 20 Millionen Euro oder 4 Prozent Jahresumsatz als Bußgeldrahmen, und der Unterschied zwischen Verantwortlichem – wer über Zweck und Mittel entscheidet – und Auftragsverarbeiter, der weisungsgebunden verarbeitet und deshalb einen AVV braucht.',
      quiz:[
        {q:'Binnen welcher Frist ist eine Datenpanne zu melden?', options:['24 Stunden','72 Stunden','7 Tage'], correct:1, explain:'An die zuständige Aufsichtsbehörde, bei hohem Risiko zusätzlich an die Betroffenen.'},
        {q:'Was besagt der Grundsatz der Datenminimierung?', options:['Daten möglichst komprimiert speichern','Nur so viele Daten erheben, wie für den Zweck erforderlich sind','Daten nach einem Jahr löschen'], correct:1, explain:'Die zeitliche Komponente ist dagegen die Speicherbegrenzung.'},
        {q:'Welche Rechtsgrundlage nach Art. 6 DSGVO trägt die Verarbeitung von Kundendaten zur Auftragsabwicklung?', options:['Einwilligung','Vertragserfüllung','Berechtigtes Interesse'], correct:1, explain:'Eine Einwilligung wäre hier unnötig und zudem jederzeit widerrufbar.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m17', part:6, partTitle:'Projektmanagement & Wirtschaft', title:'Netzplantechnik', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m17-l1', title:'Der Netzplan – Aufbau und Vorwärtsrechnung', minutes:11,
      order:1,
      body:
        '<p>Der <strong>Netzplan</strong> ist die rechenintensivste AP1-Aufgabe – und eine der am sichersten zu punktenden, weil das Verfahren immer identisch ist.</p>'+
        '<p>Jeder <strong>Vorgangsknoten</strong> enthält sechs Werte plus Dauer:</p>'+
        '<table class="lesson-table"><tr><th>Kürzel</th><th>Bedeutung</th></tr>'+
        '<tr><td>FAZ</td><td>Frühester Anfangszeitpunkt</td></tr>'+
        '<tr><td>FEZ</td><td>Frühester Endzeitpunkt</td></tr>'+
        '<tr><td>SAZ</td><td>Spätester Anfangszeitpunkt</td></tr>'+
        '<tr><td>SEZ</td><td>Spätester Endzeitpunkt</td></tr>'+
        '<tr><td>GP</td><td>Gesamtpuffer</td></tr>'+
        '<tr><td>FP</td><td>Freier Puffer</td></tr>'+
        '<tr><td>D</td><td>Dauer</td></tr></table>'+
        '<p><strong>Vorwärtsrechnung – von links nach rechts:</strong></p>'+
        '<ul><li><code>FEZ = FAZ + D</code></li>'+
        '<li><code>FAZ = größter FEZ aller Vorgänger</code> — bei mehreren Vorgängern gilt das <strong>Maximum</strong>, denn erst wenn der letzte fertig ist, kann es weitergehen.</li>'+
        '<li>Der Startvorgang beginnt mit FAZ = 0.</li></ul>'+
        '<figure class="fig"><svg viewBox="0 0 540 250" role="img" aria-label="Aufbau eines Vorgangsknotens im Netzplan"><rect class="s-accent" x="150" y="14" width="240" height="108" rx="4"/><line class="s-line" x1="150" y1="50" x2="390" y2="50"/><line class="s-line" x1="150" y1="86" x2="390" y2="86"/><line class="s-line" x1="230" y1="14" x2="230" y2="50"/><line class="s-line" x1="310" y1="14" x2="310" y2="50"/><line class="s-line" x1="230" y1="86" x2="230" y2="122"/><line class="s-line" x1="310" y1="86" x2="310" y2="122"/><text class="s-mono" x="190" y="38" text-anchor="middle">FAZ</text><text class="s-mono" x="270" y="38" text-anchor="middle">D</text><text class="s-mono" x="350" y="38" text-anchor="middle">FEZ</text><text class="s-hd" x="270" y="74" text-anchor="middle">Vorgang</text><text class="s-mono" x="190" y="110" text-anchor="middle">SAZ</text><text class="s-mono" x="270" y="110" text-anchor="middle">GP</text><text class="s-mono" x="350" y="110" text-anchor="middle">SEZ</text><text class="s-lbl" x="404" y="38">fr&#252;heste Lage &#8211; vorw&#228;rts</text><text class="s-lbl" x="404" y="110">sp&#228;teste Lage &#8211; r&#252;ckw&#228;rts</text><rect class="s-box" x="20" y="152" width="240" height="84" rx="4"/><text class="s-hd" x="34" y="174">Vorw&#228;rts &#8211; von links</text><text class="s-mono" x="34" y="196">FEZ = FAZ + D</text><text class="s-mono" x="34" y="216">FAZ = MAX(FEZ Vorg&#228;nger)</text><rect class="s-box" x="280" y="152" width="240" height="84" rx="4"/><text class="s-hd" x="294" y="174">R&#252;ckw&#228;rts &#8211; von rechts</text><text class="s-mono" x="294" y="196">SAZ = SEZ &#8722; D</text><text class="s-mono" x="294" y="216">SEZ = MIN(SAZ Nachfolger)</text></svg><figcaption>Die obere Zeile entsteht in der Vorwaertsrechnung, die untere in der Rueckwaertsrechnung. Vorwaerts gilt MAX, rueckwaerts MIN.</figcaption></figure>',
      code:
        "Knotendarstellung (uebliche Form):\n\n"+
        "   +--------+--------+--------+\n"+
        "   |  FAZ   |   D    |  FEZ   |\n"+
        "   +--------+--------+--------+\n"+
        "   |     Vorgangsbezeichnung   |\n"+
        "   +--------+--------+--------+\n"+
        "   |  SAZ   |   GP   |  SEZ   |\n"+
        "   +--------+--------+--------+\n\n"+
        "Vorwaertsrechnung:\n"+
        "  A: FAZ=0,  D=5  -> FEZ=5\n"+
        "  B: FAZ=5,  D=3  -> FEZ=8      (Vorgaenger A)\n"+
        "  C: FAZ=5,  D=7  -> FEZ=12     (Vorgaenger A)\n"+
        "  D: FAZ=MAX(8,12)=12, D=4 -> FEZ=16   (Vorgaenger B und C)",
      codeLang:'Netzplan',
      tip:'Der häufigste Fehler in der Vorwärtsrechnung ist die Verwechslung von Maximum und Minimum bei mehreren Vorgängern. Denk an die Baustelle: Wenn Elektrik und Sanitär fertig sein müssen, bevor verputzt wird, wartest du auf den Langsameren. Also Maximum. In der Rückwärtsrechnung kehrt sich das um – dort gilt das Minimum, weil du den frühesten Termin einhalten musst, den ein Nachfolger vorgibt.',
      quiz:[
        {q:'Wie berechnet man den FAZ bei mehreren Vorgängern?', options:['Als Summe aller FEZ','Als größter FEZ der Vorgänger (Maximum)','Als kleinster FEZ der Vorgänger'], correct:1, explain:'Erst wenn der letzte Vorgänger fertig ist, kann der Vorgang starten.'},
        {q:'Wie lautet die Formel für den FEZ?', options:['FEZ = FAZ + D','FEZ = SAZ − D','FEZ = FAZ − D'], correct:0, explain:'Früher Start plus Dauer ergibt frühes Ende.'},
        {q:'Ein Vorgang hat drei Vorgänger mit FEZ 8, 12 und 5. Wie hoch ist sein FAZ?', options:['5','12','25'], correct:1, explain:'Es gilt das Maximum — erst wenn der letzte Vorgänger fertig ist, kann es weitergehen.'}
      ]
    },
    {
      id:'m17-l2', title:'Rückwärtsrechnung, Puffer und kritischer Pfad', minutes:11,
      order:2,
      body:
        '<p><strong>Rückwärtsrechnung – von rechts nach links:</strong></p>'+
        '<ul><li>Beim <strong>letzten Vorgang gilt SEZ = FEZ</strong>. Das ist der Startpunkt der Rückwärtsrechnung.</li>'+
        '<li><code>SAZ = SEZ − D</code></li>'+
        '<li><code>SEZ = kleinster SAZ aller Nachfolger</code> — hier gilt das <strong>Minimum</strong>.</li></ul>'+
        '<p><strong>Die Puffer:</strong></p>'+
        '<ul><li><code>GP = SAZ − FAZ</code> (gleichwertig: <code>SEZ − FEZ</code>) — der <strong>Gesamtpuffer</strong> gibt an, um wie viel ein Vorgang verschoben werden darf, <em>ohne das Projektende</em> zu gefährden. Er kann von mehreren Vorgängen eines Pfades nur <em>einmal insgesamt</em> verbraucht werden.</li>'+
        '<li><code>FP = kleinster FAZ der Nachfolger − eigener FEZ</code> — der <strong>freie Puffer</strong> gibt an, um wie viel verschoben werden darf, <em>ohne den frühesten Start eines Nachfolgers</em> zu verzögern.</li></ul>'+
        '<p><strong>Der kritische Pfad</strong> ist die Kette aller Vorgänge mit <strong>GP = 0</strong>. Er bestimmt die Gesamtprojektdauer: Verzögert sich hier ein einziger Vorgang um einen Tag, verschiebt sich das Projektende um denselben Tag.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 190" role="img" aria-label="Netzplan mit hervorgehobenem kritischen Pfad"><rect class="s-crit" x="20" y="72" width="76" height="44" rx="4"/><text class="s-hd" x="58" y="92" text-anchor="middle">A</text><text class="s-mono" x="58" y="108" text-anchor="middle">D=4 GP=0</text><rect class="s-crit" x="160" y="18" width="76" height="44" rx="4"/><text class="s-hd" x="198" y="38" text-anchor="middle">B</text><text class="s-mono" x="198" y="54" text-anchor="middle">D=6 GP=0</text><rect class="s-box" x="160" y="122" width="76" height="44" rx="4"/><text class="s-hd" x="198" y="142" text-anchor="middle">C</text><text class="s-mono" x="198" y="158" text-anchor="middle">D=3 GP=6</text><rect class="s-crit" x="300" y="18" width="76" height="44" rx="4"/><text class="s-hd" x="338" y="38" text-anchor="middle">D</text><text class="s-mono" x="338" y="54" text-anchor="middle">D=5 GP=0</text><rect class="s-box" x="300" y="122" width="76" height="44" rx="4"/><text class="s-hd" x="338" y="142" text-anchor="middle">E</text><text class="s-mono" x="338" y="158" text-anchor="middle">D=2 GP=6</text><rect class="s-crit" x="440" y="72" width="76" height="44" rx="4"/><text class="s-hd" x="478" y="92" text-anchor="middle">F</text><text class="s-mono" x="478" y="108" text-anchor="middle">D=4 GP=0</text><line class="s-critline" x1="96" y1="86" x2="158" y2="46"/><line class="s-line" x1="96" y1="102" x2="158" y2="140"/><line class="s-critline" x1="236" y1="40" x2="298" y2="40"/><line class="s-line" x1="236" y1="144" x2="298" y2="144"/><line class="s-critline" x1="376" y1="46" x2="438" y2="86"/><line class="s-line" x1="376" y1="140" x2="438" y2="102"/><text class="s-lbl" x="20" y="184">Kritischer Pfad A&#8211;B&#8211;D&#8211;F: l&#252;ckenlose Kette mit GP = 0. Der Zweig C&#8211;E hat 6 Zeiteinheiten Puffer.</text></svg><figcaption>Der kritische Pfad bildet immer eine durchgehende Kette vom ersten bis zum letzten Vorgang. Jede Verzoegerung dort verschiebt das Projektende unmittelbar.</figcaption></figure>',
      code:
        "Fortsetzung des Beispiels, Projektende = 16:\n\n"+
        "  D: SEZ=16, D=4 -> SAZ=12      GP = 12-12 = 0   kritisch\n"+
        "  C: SEZ=12, D=7 -> SAZ=5       GP =  5- 5 = 0   kritisch\n"+
        "  B: SEZ=12, D=3 -> SAZ=9       GP =  9- 5 = 4   4 Tage Puffer\n"+
        "  A: SEZ=MIN(9,5)=5, D=5 -> SAZ=0   GP = 0-0 = 0  kritisch\n\n"+
        "  Kritischer Pfad: A - C - D       Projektdauer: 16 Tage\n"+
        "  Freier Puffer B: MIN(FAZ Nachfolger) - FEZ_B = 12 - 8 = 4",
      codeLang:'Netzplan-Rückwärtsrechnung',
      tip:'Nutze die eingebaute Probe: Beim ersten Vorgang muss SAZ null ergeben, wenn das Projekt ohne Gesamtpuffer geplant ist. Kommt dort eine andere Zahl heraus, hast du dich verrechnet – meist beim Minimum in der Rückwärtsrechnung. Und noch eine Kontrolle: Der kritische Pfad muss eine durchgehende Kette vom ersten bis zum letzten Vorgang bilden, ohne Lücke.',
      quiz:[
        {q:'Wie berechnet man den Gesamtpuffer?', options:['GP = SAZ − FAZ','GP = FEZ + D','GP = SEZ + FAZ'], correct:0, explain:'Gleichwertig ist SEZ − FEZ.'},
        {q:'Was kennzeichnet den kritischen Pfad?', options:['Die längste Dauer eines einzelnen Vorgangs','Alle Vorgänge mit Gesamtpuffer 0','Die meisten Vorgänger'], correct:1, explain:'Jede Verzögerung dort verschiebt das Projektende unmittelbar.'},
        {q:'Ein Vorgang mit GP 4 verzögert sich um 6 Tage. Wie wirkt sich das aus?', options:['Gar nicht','Das Projektende verschiebt sich um 2 Tage','Um 6 Tage'], correct:1, explain:'Nur der Anteil oberhalb des Gesamtpuffers schlägt durch.'}
      ]
    },
    {
      id:'m17-l3', title:'Gantt-Diagramm, Meilensteine und Aufwandsschätzung', minutes:8,
      order:3,
      body:
        '<p>Das <strong>Gantt-Diagramm</strong> (Balkenplan) zeigt Vorgänge als waagerechte Balken auf einer Zeitachse. Es macht Dauer, Überlappung und Termine anschaulich, stellt Abhängigkeiten aber schlechter dar als der Netzplan – dessen Puffer und kritischen Pfad man dort nicht direkt ablesen kann.</p>'+
        '<p>Ein <strong>Meilenstein</strong> ist ein Ereignis mit <strong>Dauer null</strong>, das den Abschluss einer Phase markiert und als Entscheidungspunkt dient („Pflichtenheft abgenommen").</p>'+
        '<p>Der <strong>Projektstrukturplan (PSP)</strong> zerlegt das Projekt hierarchisch in Teilaufgaben bis hinunter zu <strong>Arbeitspaketen</strong> – der kleinsten planbaren Einheit mit Verantwortlichem, Aufwand und Ergebnis. Er ist die Grundlage jeder Terminplanung: Erst zerlegen, dann schätzen, dann terminieren.</p>'+
        '<p><strong>Drei-Punkt-Schätzung (PERT):</strong></p>'+
        '<p><code>tE = (optimistisch + 4 × wahrscheinlich + pessimistisch) / 6</code></p>'+
        '<p>Der wahrscheinliche Wert wird vierfach gewichtet, die Summe durch 6 geteilt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 252" role="img" aria-label="Gantt-Diagramm eines Projekts mit sechs Vorgaengen und Puffern">'+
        '<line class="s-line" x1="80" y1="34" x2="544" y2="34"/>'+
        '<text class="s-lbl" x="80" y="26" text-anchor="middle">0</text>'+
        '<text class="s-lbl" x="200" y="26" text-anchor="middle">5</text>'+
        '<text class="s-lbl" x="320" y="26" text-anchor="middle">10</text>'+
        '<text class="s-lbl" x="440" y="26" text-anchor="middle">15</text>'+
        '<text class="s-lbl" x="536" y="26" text-anchor="middle">19</text>'+
        '<line class="s-dash2" x1="200" y1="34" x2="200" y2="196"/>'+
        '<line class="s-dash2" x1="320" y1="34" x2="320" y2="196"/>'+
        '<line class="s-dash2" x1="440" y1="34" x2="440" y2="196"/>'+
        '<text class="s-hd" x="20" y="56">A</text><rect class="s-crit" x="80" y="44" width="96" height="16" rx="3"/>'+
        '<text class="s-hd" x="20" y="82">B</text><rect class="s-crit" x="176" y="70" width="144" height="16" rx="3"/>'+
        '<text class="s-hd" x="20" y="108">C</text><rect class="s-accent" x="176" y="96" width="72" height="16" rx="3"/>'+
        '<rect class="s-ring" x="248" y="96" width="144" height="16" rx="3"/>'+
        '<text class="s-hd" x="20" y="134">D</text><rect class="s-crit" x="320" y="122" width="120" height="16" rx="3"/>'+
        '<text class="s-hd" x="20" y="160">E</text><rect class="s-accent" x="248" y="148" width="48" height="16" rx="3"/>'+
        '<rect class="s-ring" x="296" y="148" width="144" height="16" rx="3"/>'+
        '<text class="s-hd" x="20" y="186">F</text><rect class="s-crit" x="440" y="174" width="96" height="16" rx="3"/>'+
        '<polygon class="s-strong" points="536,200 546,210 536,220 526,210"/>'+
        '<text class="s-lbl" x="516" y="214" text-anchor="end">Meilenstein: Projektende Tag 19</text>'+
        '<rect class="s-crit" x="20" y="234" width="18" height="10" rx="2"/>'+
        '<text class="s-lbl" x="44" y="243">kritisch, kein Puffer</text>'+
        '<rect class="s-accent" x="186" y="234" width="18" height="10" rx="2"/>'+
        '<text class="s-lbl" x="210" y="243">Vorgang</text>'+
        '<rect class="s-ring" x="286" y="234" width="18" height="10" rx="2"/>'+
        '<text class="s-lbl" x="310" y="243">Puffer &#8211; so weit darf der Balken wandern</text>'+
        '</svg><figcaption>Dasselbe Projekt wie im Netzplan. Der Balkenplan zeigt Zeitlage und Puffer anschaulich &#8212; den kritischen Pfad muss man dagegen einf&#228;rben, sonst sieht man ihn nicht.</figcaption></figure>',
      code:
        "Aufwandsschaetzung fuer ein Arbeitspaket:\n"+
        "  optimistisch    O =  4 Tage\n"+
        "  wahrscheinlich  M =  6 Tage\n"+
        "  pessimistisch   P = 14 Tage\n\n"+
        "  tE = (4 + 4*6 + 14) / 6 = (4 + 24 + 14) / 6 = 42 / 6 = 7 Tage\n\n"+
        "Personentage -> Kosten:\n"+
        "  7 PT x 8 h x 75 EUR/h = 4.200 EUR",
      codeLang:'PERT-Schätzung',
      tip:'Unterscheide Personentage von Kalendertagen, sonst verrechnest du dich um Faktoren. Zwanzig Personentage sind bei zwei Mitarbeitern zehn Kalendertage – aber nur, wenn sich die Aufgabe überhaupt teilen lässt. Bei nicht teilbaren Aufgaben bringt der zweite Mitarbeiter nichts. Genau dieser Hinweis wird in Aufgaben zur Projektverkürzung gern erwartet.',
      quiz:[
        {q:'Welche Dauer hat ein Meilenstein?', options:['Einen Tag','Null','Die Dauer der Phase'], correct:1, explain:'Er ist ein Zeitpunkt, kein Vorgang.'},
        {q:'Wie lautet die PERT-Formel?', options:['(O + M + P) / 3','(O + 4M + P) / 6','(O + 2M + P) / 4'], correct:1, explain:'Der wahrscheinliche Wert wird vierfach gewichtet.'},
        {q:'Was zeigt ein Gantt-Diagramm schlechter als ein Netzplan?', options:['Die Dauer der Vorgänge','Puffer und kritischen Pfad','Die Kalendertermine'], correct:1, explain:'Dafür stellt es Zeitlage und Überlappungen anschaulicher dar.'}
      ]
    },
    {
      id:'m17-l4', title:'Ein Netzplan von Anfang bis Ende', minutes:11,
      order:4,
      body:
        '<p>Die beiden vorigen Lektionen haben die Regeln geliefert. Hier steht das fertige Ergebnis: <strong>ein vollständig gerechneter Netzplan</strong>, genau so, wie du ihn in der Prüfung abgibst. Es ist dasselbe Projekt, das die vorige Lektion als Balkenplan gezeigt hat.</p>'+
        '<p><strong>Die Vorgangsliste</strong>, wie sie in der Aufgabe stünde:</p>'+
        '<table class="lesson-table"><tr><th>Vorgang</th><th>Dauer</th><th>Vorgänger</th></tr>'+
        '<tr><td>A</td><td>4</td><td>&#8211;</td></tr>'+
        '<tr><td>B</td><td>6</td><td>A</td></tr>'+
        '<tr><td>C</td><td>3</td><td>A</td></tr>'+
        '<tr><td>D</td><td>5</td><td>B</td></tr>'+
        '<tr><td>E</td><td>2</td><td>C</td></tr>'+
        '<tr><td>F</td><td>4</td><td>D, E</td></tr></table>'+
        '<figure class="fig"><svg viewBox="0 0 560 286" role="img" aria-label="Vollstaendig gerechneter Netzplan mit sechs Vorgaengen und markiertem kritischen Pfad">'+
        '<line class="s-critline" x1="118" y1="120" x2="150" y2="60"/>'+
        '<line class="s-line" x1="118" y1="148" x2="150" y2="206"/>'+
        '<line class="s-critline" x1="258" y1="57" x2="296" y2="57"/>'+
        '<line class="s-line" x1="258" y1="209" x2="296" y2="209"/>'+
        '<line class="s-critline" x1="404" y1="60" x2="438" y2="120"/>'+
        '<line class="s-line" x1="404" y1="206" x2="438" y2="148"/>'+
        '<rect class="s-crit" x="10" y="104" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="10" y1="123" x2="118" y2="123"/><line class="s-line" x1="10" y1="143" x2="118" y2="143"/>'+
        '<line class="s-line" x1="46" y1="104" x2="46" y2="123"/><line class="s-line" x1="82" y1="104" x2="82" y2="123"/>'+
        '<line class="s-line" x1="46" y1="143" x2="46" y2="162"/><line class="s-line" x1="82" y1="143" x2="82" y2="162"/>'+
        '<text class="s-mono" x="28" y="118" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="64" y="118" text-anchor="middle">4</text>'+
        '<text class="s-mono" x="100" y="118" text-anchor="middle">4</text>'+
        '<text class="s-hd" x="64" y="138" text-anchor="middle">A</text>'+
        '<text class="s-mono" x="28" y="157" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="64" y="157" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="100" y="157" text-anchor="middle">4</text>'+
        '<rect class="s-crit" x="150" y="28" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="150" y1="47" x2="258" y2="47"/><line class="s-line" x1="150" y1="67" x2="258" y2="67"/>'+
        '<line class="s-line" x1="186" y1="28" x2="186" y2="47"/><line class="s-line" x1="222" y1="28" x2="222" y2="47"/>'+
        '<line class="s-line" x1="186" y1="67" x2="186" y2="86"/><line class="s-line" x1="222" y1="67" x2="222" y2="86"/>'+
        '<text class="s-mono" x="168" y="42" text-anchor="middle">4</text>'+
        '<text class="s-mono" x="204" y="42" text-anchor="middle">6</text>'+
        '<text class="s-mono" x="240" y="42" text-anchor="middle">10</text>'+
        '<text class="s-hd" x="204" y="62" text-anchor="middle">B</text>'+
        '<text class="s-mono" x="168" y="81" text-anchor="middle">4</text>'+
        '<text class="s-mono" x="204" y="81" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="240" y="81" text-anchor="middle">10</text>'+
        '<rect class="s-box" x="150" y="180" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="150" y1="199" x2="258" y2="199"/><line class="s-line" x1="150" y1="219" x2="258" y2="219"/>'+
        '<line class="s-line" x1="186" y1="180" x2="186" y2="199"/><line class="s-line" x1="222" y1="180" x2="222" y2="199"/>'+
        '<line class="s-line" x1="186" y1="219" x2="186" y2="238"/><line class="s-line" x1="222" y1="219" x2="222" y2="238"/>'+
        '<text class="s-mono" x="168" y="194" text-anchor="middle">4</text>'+
        '<text class="s-mono" x="204" y="194" text-anchor="middle">3</text>'+
        '<text class="s-mono" x="240" y="194" text-anchor="middle">7</text>'+
        '<text class="s-hd" x="204" y="214" text-anchor="middle">C</text>'+
        '<text class="s-mono" x="168" y="233" text-anchor="middle">10</text>'+
        '<text class="s-mono" x="204" y="233" text-anchor="middle">6</text>'+
        '<text class="s-mono" x="240" y="233" text-anchor="middle">13</text>'+
        '<rect class="s-crit" x="296" y="28" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="296" y1="47" x2="404" y2="47"/><line class="s-line" x1="296" y1="67" x2="404" y2="67"/>'+
        '<line class="s-line" x1="332" y1="28" x2="332" y2="47"/><line class="s-line" x1="368" y1="28" x2="368" y2="47"/>'+
        '<line class="s-line" x1="332" y1="67" x2="332" y2="86"/><line class="s-line" x1="368" y1="67" x2="368" y2="86"/>'+
        '<text class="s-mono" x="314" y="42" text-anchor="middle">10</text>'+
        '<text class="s-mono" x="350" y="42" text-anchor="middle">5</text>'+
        '<text class="s-mono" x="386" y="42" text-anchor="middle">15</text>'+
        '<text class="s-hd" x="350" y="62" text-anchor="middle">D</text>'+
        '<text class="s-mono" x="314" y="81" text-anchor="middle">10</text>'+
        '<text class="s-mono" x="350" y="81" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="386" y="81" text-anchor="middle">15</text>'+
        '<rect class="s-box" x="296" y="180" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="296" y1="199" x2="404" y2="199"/><line class="s-line" x1="296" y1="219" x2="404" y2="219"/>'+
        '<line class="s-line" x1="332" y1="180" x2="332" y2="199"/><line class="s-line" x1="368" y1="180" x2="368" y2="199"/>'+
        '<line class="s-line" x1="332" y1="219" x2="332" y2="238"/><line class="s-line" x1="368" y1="219" x2="368" y2="238"/>'+
        '<text class="s-mono" x="314" y="194" text-anchor="middle">7</text>'+
        '<text class="s-mono" x="350" y="194" text-anchor="middle">2</text>'+
        '<text class="s-mono" x="386" y="194" text-anchor="middle">9</text>'+
        '<text class="s-hd" x="350" y="214" text-anchor="middle">E</text>'+
        '<text class="s-mono" x="314" y="233" text-anchor="middle">13</text>'+
        '<text class="s-mono" x="350" y="233" text-anchor="middle">6</text>'+
        '<text class="s-mono" x="386" y="233" text-anchor="middle">15</text>'+
        '<rect class="s-crit" x="438" y="104" width="108" height="58" rx="3"/>'+
        '<line class="s-line" x1="438" y1="123" x2="546" y2="123"/><line class="s-line" x1="438" y1="143" x2="546" y2="143"/>'+
        '<line class="s-line" x1="474" y1="104" x2="474" y2="123"/><line class="s-line" x1="510" y1="104" x2="510" y2="123"/>'+
        '<line class="s-line" x1="474" y1="143" x2="474" y2="162"/><line class="s-line" x1="510" y1="143" x2="510" y2="162"/>'+
        '<text class="s-mono" x="456" y="118" text-anchor="middle">15</text>'+
        '<text class="s-mono" x="492" y="118" text-anchor="middle">4</text>'+
        '<text class="s-mono" x="528" y="118" text-anchor="middle">19</text>'+
        '<text class="s-hd" x="492" y="138" text-anchor="middle">F</text>'+
        '<text class="s-mono" x="456" y="157" text-anchor="middle">15</text>'+
        '<text class="s-mono" x="492" y="157" text-anchor="middle">0</text>'+
        '<text class="s-mono" x="528" y="157" text-anchor="middle">19</text>'+
        '<text class="s-lbl" x="10" y="262">Jeder Knoten: oben FAZ &#160;D&#160; FEZ &#160;&#183;&#160; Mitte Vorgang &#160;&#183;&#160; unten SAZ &#160;GP&#160; SEZ</text>'+
        '<text class="s-lbl" x="10" y="278">Kritischer Pfad A&#8211;B&#8211;D&#8211;F, alle mit GP = 0. Projektdauer 19 Zeiteinheiten.</text>'+
        '</svg><figcaption>So sieht die fertige Lösung aus. Der Zweig C–E trägt sechs Zeiteinheiten Puffer — er darf sich verschieben, ohne das Projektende zu berühren.</figcaption></figure>'+
        '<p><strong>Die Reihenfolge, in der du rechnest</strong>, ist immer dieselbe und sollte dir in Fleisch und Blut übergehen:</p>'+
        '<ol><li><strong>Netz zeichnen</strong> und die Dauern eintragen &#8211; sonst nichts.</li>'+
        '<li><strong>Vorwärts</strong> von links: <code>FEZ = FAZ + D</code>, bei mehreren Vorgängern <strong>Maximum</strong>.</li>'+
        '<li>Beim letzten Vorgang <strong>SEZ = FEZ</strong> setzen.</li>'+
        '<li><strong>Rückwärts</strong> von rechts: <code>SAZ = SEZ &minus; D</code>, bei mehreren Nachfolgern <strong>Minimum</strong>.</li>'+
        '<li><strong>Puffer</strong>: <code>GP = SAZ &minus; FAZ</code>.</li>'+
        '<li><strong>Kritischen Pfad</strong> markieren: alle Vorgänge mit GP = 0, als durchgehende Kette.</li></ol>'+
        '<p><strong>Zwei Proben, die dich vor Punktverlust schützen.</strong> Erstens: Beim ersten Vorgang muss SAZ null ergeben. Kommt etwas anderes heraus, steckt der Fehler fast immer im Minimum der Rückwärtsrechnung. Zweitens: Der kritische Pfad muss lückenlos vom ersten bis zum letzten Vorgang durchlaufen. Eine Lücke bedeutet, dass irgendwo ein GP falsch gerechnet ist.</p>',
      code:
        "DIE RECHNUNG IM EINZELNEN\n\n"+
        "VORWAERTS\n"+
        "  A  FAZ 0                     FEZ = 0 + 4  = 4\n"+
        "  B  FAZ = FEZ(A) = 4          FEZ = 4 + 6  = 10\n"+
        "  C  FAZ = FEZ(A) = 4          FEZ = 4 + 3  = 7\n"+
        "  D  FAZ = FEZ(B) = 10         FEZ = 10 + 5 = 15\n"+
        "  E  FAZ = FEZ(C) = 7          FEZ = 7 + 2  = 9\n"+
        "  F  FAZ = MAX(15, 9) = 15     FEZ = 15 + 4 = 19   <- MAXIMUM\n\n"+
        "  Projektdauer = 19\n\n"+
        "RUECKWAERTS  (F ist letzter Vorgang: SEZ = FEZ = 19)\n"+
        "  F  SEZ 19                    SAZ = 19 - 4 = 15\n"+
        "  D  SEZ = SAZ(F) = 15         SAZ = 15 - 5 = 10\n"+
        "  E  SEZ = SAZ(F) = 15         SAZ = 15 - 2 = 13\n"+
        "  B  SEZ = SAZ(D) = 10         SAZ = 10 - 6 = 4\n"+
        "  C  SEZ = SAZ(E) = 13         SAZ = 13 - 3 = 10\n"+
        "  A  SEZ = MIN(4, 10) = 4      SAZ = 4 - 4  = 0    <- MINIMUM\n\n"+
        "PUFFER   GP = SAZ - FAZ\n"+
        "  A  0 - 0  = 0      kritisch\n"+
        "  B  4 - 4  = 0      kritisch\n"+
        "  C  10 - 4 = 6\n"+
        "  D  10 - 10 = 0     kritisch\n"+
        "  E  13 - 7 = 6\n"+
        "  F  15 - 15 = 0     kritisch\n\n"+
        "  Kritischer Pfad: A - B - D - F\n\n"+
        "PROBE\n"+
        "  SAZ des ersten Vorgangs = 0            stimmt\n"+
        "  Kette A-B-D-F ist lueckenlos           stimmt\n"+
        "  4 + 6 + 5 + 4 = 19 = Projektdauer      stimmt\n\n"+
        "FREIER PUFFER - nur wenn ausdruecklich gefragt\n"+
        "  FP = MIN(FAZ aller Nachfolger) - eigener FEZ\n"+
        "  FP(C) = FAZ(E) - FEZ(C) = 7 - 7 = 0\n"+
        "  FP(E) = FAZ(F) - FEZ(E) = 15 - 9 = 6\n\n"+
        "  Achtung: C und E teilen sich die 6 Zeiteinheiten.\n"+
        "  Verbraucht C fuenf davon, bleibt E genau eine.",
      codeLang:'Netzplan komplett',
      tip:'Der freie Puffer von C ist null, obwohl sein Gesamtpuffer sechs beträgt — und genau dieser Unterschied wird gern geprüft. Der Gesamtpuffer gehört dem ganzen Pfad, der freie Puffer nur dem einzelnen Vorgang. Verschiebt sich C auch nur um einen Tag, rutscht E mit. Wer beide Begriffe in der Antwort trennt und das am Beispiel zeigt, bekommt den Begründungspunkt.',
      quiz:[
        {q:'Vorgang F hat die Vorgänger D (FEZ 15) und E (FEZ 9). Wie hoch ist sein FAZ?', options:['9','15','24'], correct:1, explain:'In der Vorwärtsrechnung gilt das Maximum — erst wenn der letzte Vorgänger fertig ist, kann F starten.'},
        {q:'Vorgang A hat die Nachfolger B (SAZ 4) und C (SAZ 10). Wie hoch ist sein SEZ?', options:['4','10','14'], correct:0, explain:'Rückwärts gilt das Minimum. Merksatz: vorwärts MAX, rückwärts MIN.'},
        {q:'C hat Gesamtpuffer 6, aber freien Puffer 0. Was bedeutet das?', options:['Die Rechnung ist falsch','C darf sich nur verschieben, wenn E mitwandert','C ist kritisch'], correct:1, explain:'Der Gesamtpuffer gehört dem Pfad, der freie Puffer dem einzelnen Vorgang.'}
      ]
    },
  ]
});
MODULES.push({
  id:'m18', part:6, partTitle:'Projektmanagement & Wirtschaft', title:'Angebotsvergleich & Kalkulation', relevanz:'sehr hoch',
  lessons:[
    {
      id:'m18-l1', title:'Die Nutzwertanalyse', minutes:10,
      body:
        '<p>Die <strong>Nutzwertanalyse</strong> vergleicht Angebote anhand <em>nicht-monetärer</em> Kriterien. Sie erscheint in fast jeder AP1 und folgt immer demselben Ablauf:</p>'+
        '<ol><li><strong>Kriterien festlegen</strong> (Support, Benutzerfreundlichkeit, Erweiterbarkeit, Datenschutz …).</li>'+
        '<li><strong>Gewichtung vergeben</strong> – die Summe aller Gewichte muss <strong>100 %</strong> ergeben. Diese Probe wird oft eigens bepunktet.</li>'+
        '<li><strong>Punkte vergeben</strong> je Kriterium und Anbieter, meist 1–10 oder 1–5.</li>'+
        '<li><strong>Teilnutzwert = Punkte × Gewichtung.</strong></li>'+
        '<li><strong>Gesamtnutzwert = Summe der Teilnutzwerte.</strong> Der höchste Wert gewinnt.</li></ol>'+
        '<p><strong>Ausschlusskriterien (K.-o.-Kriterien)</strong> werden <em>vor</em> der Bewertung geprüft: Wer sie nicht erfüllt, fliegt raus und wird gar nicht erst bewertet.</p>',
      code:
        "Kriterium         Gew.   A: Pkt  Teilw.   B: Pkt  Teilw.\n"+
        "-----------------------------------------------------------\n"+
        "Funktionsumfang    40%      8     3,20       6      2,40\n"+
        "Support            30%      5     1,50       9      2,70\n"+
        "Bedienbarkeit      20%      7     1,40       7      1,40\n"+
        "Erweiterbarkeit    10%      9     0,90       4      0,40\n"+
        "-----------------------------------------------------------\n"+
        "Summe             100%           7,00             6,90\n\n"+
        "Ergebnis: Anbieter A gewinnt knapp (7,00 vs. 6,90).",
      codeLang:'Nutzwertanalyse',
      tip:'Der Satz, der bei „Begründen Sie Ihre Entscheidung" Punkte bringt, geht über das Nennen des Siegers hinaus: Die Nutzwertanalyse macht eine Entscheidung nachvollziehbar und dokumentiert, ist aber nicht objektiv – Kriterienauswahl, Gewichtung und Punktvergabe sind subjektiv. Bei einem knappen Ergebnis wie 7,00 zu 6,90 solltest du genau darauf hinweisen und zusätzlich die Kosten heranziehen.',
      quiz:[
        {q:'Wie viel muss die Summe der Gewichtungen ergeben?', options:['10','100 %','So viel wie es Kriterien gibt'], correct:1, explain:'Diese Probe wird häufig eigens bepunktet.'},
        {q:'Wie wird ein Teilnutzwert berechnet?', options:['Punkte + Gewichtung','Punkte × Gewichtung','Punkte / Gewichtung'], correct:1, explain:'Die Summe aller Teilnutzwerte ergibt den Gesamtnutzwert.'},
        {q:'Wie behandelt man ein K.-o.-Kriterium in der Nutzwertanalyse?', options:['Mit doppelter Gewichtung','Vorab prüfen — wer es nicht erfüllt, wird gar nicht bewertet','Mit 0 Punkten bewerten'], correct:1, explain:'Ausschlusskriterien stehen vor der eigentlichen Bewertung.'}
      ]
    },
    {
      id:'m18-l2', title:'Bezugspreis und Angebotsvergleich', minutes:10,
      body:
        '<p>Der <strong>Bezugspreis</strong> ist das, was eine Beschaffung tatsächlich kostet – Rabatte und Skonti verändern die Rangfolge oft gegenüber dem Listenpreis. Das Kalkulationsschema ist immer gleich:</p>'+
        '<table class="lesson-table"><tr><th>Schritt</th><th>Position</th></tr>'+
        '<tr><td></td><td>Listeneinkaufspreis</td></tr>'+
        '<tr><td>−</td><td>Liefererrabatt</td></tr>'+
        '<tr><td>=</td><td><strong>Zieleinkaufspreis</strong></td></tr>'+
        '<tr><td>−</td><td>Liefererskonto</td></tr>'+
        '<tr><td>=</td><td><strong>Bareinkaufspreis</strong></td></tr>'+
        '<tr><td>+</td><td>Bezugskosten (Fracht, Verpackung, Versicherung)</td></tr>'+
        '<tr><td>=</td><td><strong>Bezugspreis / Einstandspreis</strong></td></tr></table>'+
        '<p><strong>Wichtig:</strong> Skonto wird vom <em>bereits rabattierten</em> Preis berechnet, nicht vom Listenpreis – und die Bezugskosten kommen <strong>nach</strong> dem Skontoabzug hinzu, denn auf Fracht gibt es keinen Skonto.</p>'+
        '<p>Bei der <strong>Umsatzsteuer</strong>: Rechne immer mit <strong>Nettopreisen</strong>. Für ein vorsteuerabzugsberechtigtes Unternehmen ist die Umsatzsteuer ein durchlaufender Posten und damit kein Kostenfaktor.</p>',
      code:
        "Angebot: Listenpreis 12.000 EUR, 15 % Rabatt, 2 % Skonto,\n"+
        "         Bezugskosten 250 EUR\n\n"+
        "  Listeneinkaufspreis            12.000,00\n"+
        "  - Rabatt 15 %                 - 1.800,00\n"+
        "  = Zieleinkaufspreis            10.200,00\n"+
        "  - Skonto 2 % (von 10.200)     -   204,00\n"+
        "  = Bareinkaufspreis              9.996,00\n"+
        "  + Bezugskosten                +   250,00\n"+
        "  = Bezugspreis                  10.246,00 EUR\n\n"+
        "Netto -> Brutto:  netto x 1,19       Brutto -> Netto: brutto / 1,19\n"+
        "Die im Brutto enthaltene USt:  brutto / 1,19 x 0,19  (NICHT brutto x 0,19)",
      codeLang:'Bezugskalkulation',
      tip:'Der teuerste Fehler dieser Aufgabenform ist die Berechnung der enthaltenen Umsatzsteuer aus dem Bruttobetrag. Neunzehn Prozent von 119 Euro sind nicht die enthaltene Steuer – die beträgt 19 Euro, nicht 22,61. Rechne immer erst auf netto zurück, indem du durch 1,19 teilst, und nimm davon 19 Prozent. Oder direkt: brutto mal 19 geteilt durch 119.',
      quiz:[
        {q:'Wovon wird das Skonto berechnet?', options:['Vom Listenpreis','Vom bereits rabattierten Zieleinkaufspreis','Vom Bezugspreis inklusive Fracht'], correct:1, explain:'Und auf Bezugskosten gibt es gar keinen Skonto.'},
        {q:'Wie viel Umsatzsteuer stecken in 238 € brutto bei 19 %?', options:['45,22 €','38,00 €','47,60 €'], correct:1, explain:'238 / 1,19 = 200 netto, davon 19 % = 38 €.'},
        {q:'Auf welchen Betrag gibt es keinen Skonto?', options:['Auf den Listenpreis','Auf die Bezugskosten wie Fracht','Auf den Zieleinkaufspreis'], correct:1, explain:'Deshalb kommen die Bezugskosten erst nach dem Skontoabzug hinzu.'}
      ]
    },
    {
      id:'m18-l3', title:'Wirtschaftlichkeit, Amortisation und Finanzierung', minutes:10,
      body:
        '<p><strong>Amortisationsdauer</strong> – nach welcher Zeit hat sich eine Investition bezahlt gemacht?</p>'+
        '<p><code>Amortisationsdauer = Investitionssumme / jährlicher Rückfluss (Einsparung)</code></p>'+
        '<p>Ein Ergebnis von 2,5 Jahren bedeutet 2 Jahre und 6 Monate. Rechne Nachkommastellen in Monate um: <code>0,5 × 12 = 6</code>.</p>'+
        '<p><strong>Make or Buy</strong> – Eigenentwicklung gegen Kauf. Man stellt beide Gesamtkosten über denselben Betrachtungszeitraum gegenüber, <strong>inklusive laufender Kosten</strong>: Lizenz, Wartung, Support, Schulung, Personal. Der Vergleich nur der Anschaffungskosten ist ein typischer Aufgabenfehler, den du in der Antwort vermeiden solltest.</p>'+
        '<p><strong>Leasing gegen Kauf:</strong> Leasing schont die Liquidität, bietet planbare Raten und aktuelle Technik, ist aber über die Laufzeit meist teurer und man erwirbt kein Eigentum. Kauf bindet Kapital, ist langfristig günstiger und schafft Eigentum.</p>'+
        '<p><strong>Ratendarlehen</strong> (Tilgungsdarlehen): Die Tilgung bleibt konstant, die Zinsen sinken mit der Restschuld – also sinkt auch die Gesamtrate.</p>'+
        '<p><code>Zinsen der Periode = Restschuld × Zinssatz × (Monate / 12)</code></p>',
      code:
        "Ratendarlehen: 24.000 EUR, 4 Jahre, 5 % p.a., jaehrliche Tilgung\n\n"+
        "  Tilgung pro Jahr = 24.000 / 4 = 6.000 EUR\n\n"+
        "  Jahr  Restschuld  Zinsen 5%   Tilgung   Rate\n"+
        "   1     24.000      1.200      6.000    7.200\n"+
        "   2     18.000        900      6.000    6.900\n"+
        "   3     12.000        600      6.000    6.600\n"+
        "   4      6.000        300      6.000    6.300\n"+
        "                    -------\n"+
        "  Zinsen gesamt:     3.000 EUR\n\n"+
        "Amortisation: 15.000 EUR Investition, 6.000 EUR Ersparnis/Jahr\n"+
        "  15.000 / 6.000 = 2,5 Jahre = 2 Jahre und 6 Monate",
      codeLang:'Finanzierungsrechnung',
      tip:'Beim Ratendarlehen ist die Zinsberechnung immer von der Restschuld zu Beginn der Periode vorzunehmen, nicht vom ursprünglichen Darlehensbetrag. Wer das übersieht, bekommt in jeder Zeile denselben Zinsbetrag heraus – und hat damit versehentlich ein Annuitätendarlehen gerechnet, bei dem die Rate konstant bleibt und sich stattdessen das Verhältnis von Zins und Tilgung verschiebt.',
      quiz:[
        {q:'Eine Investition von 18.000 € spart 7.200 € pro Jahr. Amortisationsdauer?', options:['2 Jahre','2,5 Jahre','3 Jahre'], correct:1, explain:'18.000 / 7.200 = 2,5 Jahre, also 2 Jahre und 6 Monate.'},
        {q:'Was ist beim Ratendarlehen konstant?', options:['Die Gesamtrate','Die Tilgung','Die Zinsen'], correct:1, explain:'Die Zinsen sinken mit der Restschuld, daher sinkt auch die Rate.'},
        {q:'Was bleibt beim Annuitätendarlehen konstant?', options:['Die Tilgung','Die Gesamtrate','Die Zinsen'], correct:1, explain:'Beim Ratendarlehen ist dagegen die Tilgung konstant und die Rate sinkt.'}
      ]
    },
    {
      id:'m18-l4', title:'Verträge und Kaufvertragsstörungen', minutes:9,
      body:
        '<p>Ein Vertrag kommt durch <strong>zwei übereinstimmende Willenserklärungen</strong> zustande – Angebot und Annahme. Ein Katalog oder eine Webseite ist noch kein Angebot, sondern eine <em>Aufforderung zur Abgabe eines Angebots</em> (invitatio ad offerendum).</p>'+
        '<p><strong>Die Vertragsarten in der IT</strong> – der Unterschied ist prüfungsrelevant:</p>'+
        '<ul><li><strong>Werkvertrag</strong> – geschuldet ist ein <strong>Erfolg</strong>, ein fertiges Werk. Individualsoftware, die abgenommen wird. Es gibt eine Abnahme und Gewährleistung.</li>'+
        '<li><strong>Dienstvertrag</strong> – geschuldet ist die <strong>Tätigkeit</strong>, nicht der Erfolg. Beratung, Support nach Aufwand.</li>'+
        '<li><strong>Kaufvertrag</strong> – Standardsoftware auf Datenträger oder Hardware.</li>'+
        '<li><strong>Mietvertrag</strong> – zeitweise Überlassung gegen Entgelt, etwa SaaS und Cloud.</li></ul>'+
        '<p><strong>Die drei Kaufvertragsstörungen:</strong></p>'+
        '<ul><li><strong>Mangelhafte Lieferung</strong> – Sachmangel oder Rechtsmangel. Rechte in fester Reihenfolge: zuerst <strong>Nacherfüllung</strong> (Nachbesserung oder Ersatzlieferung), erst danach Rücktritt, Minderung oder Schadenersatz.</li>'+
        '<li><strong>Lieferverzug</strong> – der Verkäufer liefert nicht rechtzeitig. Der Käufer setzt eine <strong>Nachfrist</strong>; danach Rücktritt oder Schadenersatz.</li>'+
        '<li><strong>Zahlungsverzug</strong> – der Käufer zahlt nicht. Es folgt das Mahnverfahren, Verzugszinsen und gegebenenfalls das gerichtliche Mahnverfahren.</li></ul>'+
        '<p><strong>Fristen:</strong> Gewährleistung 2 Jahre bei Neuware (B2B verkürzbar auf 1 Jahr), <strong>Beweislastumkehr</strong> im Verbrauchsgüterkauf 12 Monate. Die <strong>Garantie</strong> ist dagegen eine freiwillige zusätzliche Zusage des Herstellers – das wird gern verwechselt.</p>',
      code:'',
      tip:'Die Unterscheidung von Gewährleistung und Garantie ist eine klassische Fangfrage. Die Gewährleistung ist gesetzlich vorgeschrieben, richtet sich gegen den Verkäufer und gilt zwei Jahre. Die Garantie ist freiwillig, kommt meist vom Hersteller und kann in Umfang und Dauer frei gestaltet sein. Wer „Garantie" schreibt, wo „Gewährleistung" gemeint ist, verliert den Punkt.',
      quiz:[
        {q:'Welche Vertragsart liegt bei der Erstellung einer Individualsoftware mit Abnahme vor?', options:['Dienstvertrag','Werkvertrag','Mietvertrag'], correct:1, explain:'Geschuldet ist ein Erfolg, nicht nur die Tätigkeit.'},
        {q:'Welches Recht hat der Käufer bei einem Sachmangel zuerst?', options:['Sofortiger Rücktritt','Nacherfüllung – Nachbesserung oder Ersatzlieferung','Schadenersatz'], correct:1, explain:'Die weiteren Rechte greifen erst, wenn die Nacherfüllung scheitert.'},
        {q:'Welcher Vertrag liegt bei einer SaaS-Nutzung gegen monatliches Entgelt vor?', options:['Kaufvertrag','Mietvertrag','Werkvertrag'], correct:1, explain:'Zeitweise Überlassung gegen Entgelt ist die Definition der Miete.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m36', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Rechnerarchitektur & IT-Grundkonzepte', relevanz:'hoch',
  lessons:[
    {
      id:'m36-l1', title:'EVA-Prinzip und Von-Neumann-Architektur', minutes:9,
      body:
        '<p>Jede Datenverarbeitung folgt dem <strong>EVA-Prinzip</strong>: <strong>E</strong>ingabe &#8594; <strong>V</strong>erarbeitung &#8594; <strong>A</strong>usgabe. Häufig wird es zu <strong>EVAS</strong> erweitert, wobei das S für <strong>Speicherung</strong> steht — ohne sie wäre jedes Ergebnis nach dem Abschalten verloren.</p>'+
        '<p>Die technische Umsetzung dieses Prinzips ist seit 1945 die <strong>Von-Neumann-Architektur</strong>. Ihre fünf Bestandteile solltest du benennen können:</p>'+
        '<table class="lesson-table"><tr><th>Baustein</th><th>Aufgabe</th></tr>'+
        '<tr><td><strong>Steuerwerk</strong> (Control Unit)</td><td>holt Befehle, dekodiert sie, steuert den Ablauf</td></tr>'+
        '<tr><td><strong>Rechenwerk</strong> (ALU)</td><td>führt Rechen- und Vergleichsoperationen aus</td></tr>'+
        '<tr><td><strong>Speicherwerk</strong></td><td>hält Programme <em>und</em> Daten</td></tr>'+
        '<tr><td><strong>Ein-/Ausgabewerk</strong></td><td>verbindet mit der Außenwelt</td></tr>'+
        '<tr><td><strong>Bussystem</strong></td><td>verbindet alles miteinander</td></tr></table>'+
        '<p>Steuerwerk und Rechenwerk zusammen bilden den <strong>Prozessor</strong> (CPU).</p>'+
        '<p><strong>Das entscheidende Merkmal</strong>, nach dem gefragt wird: Programme und Daten liegen im <em>selben</em> Speicher und werden über <em>denselben</em> Bus transportiert. Das macht den Rechner universell — er kann jedes Programm ausführen, das man hineinlädt, statt für eine Aufgabe fest verdrahtet zu sein.</p>'+
        '<p>Derselbe gemeinsame Bus ist aber auch die Schwachstelle: Befehle und Daten können nicht gleichzeitig transportiert werden. Dieser <strong>Von-Neumann-Flaschenhals</strong> ist der Grund, warum moderne Prozessoren Caches und getrennte Befehls- und Datenpfade einsetzen. Die <strong>Harvard-Architektur</strong> trennt beides von vornherein und findet sich deshalb in Mikrocontrollern und in den Caches heutiger CPUs.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 250" role="img" aria-label="Von-Neumann-Architektur mit CPU, Speicher, Ein- und Ausgabe sowie dem gemeinsamen Bus">'+
        '<rect class="s-strong" x="150" y="14" width="260" height="76" rx="6"/>'+
        '<text class="s-hd" x="280" y="34" text-anchor="middle">Prozessor (CPU)</text>'+
        '<rect class="s-accent" x="164" y="42" width="112" height="38" rx="4"/>'+
        '<text class="s-lbl" x="220" y="66" text-anchor="middle">Steuerwerk</text>'+
        '<rect class="s-accent" x="284" y="42" width="112" height="38" rx="4"/>'+
        '<text class="s-lbl" x="340" y="66" text-anchor="middle">Rechenwerk</text>'+
        '<rect class="s-box" x="20" y="150" width="140" height="48" rx="4"/>'+
        '<text class="s-lbl" x="90" y="172" text-anchor="middle">Eingabewerk</text>'+
        '<text class="s-mono" x="90" y="190" text-anchor="middle">Tastatur, Sensor</text>'+
        '<rect class="s-accent" x="212" y="150" width="136" height="48" rx="4"/>'+
        '<text class="s-lbl" x="280" y="172" text-anchor="middle">Speicherwerk</text>'+
        '<text class="s-mono" x="280" y="190" text-anchor="middle">Befehle + Daten</text>'+
        '<rect class="s-box" x="400" y="150" width="140" height="48" rx="4"/>'+
        '<text class="s-lbl" x="470" y="172" text-anchor="middle">Ausgabewerk</text>'+
        '<text class="s-mono" x="470" y="190" text-anchor="middle">Monitor, Aktor</text>'+
        '<line class="s-line" x1="20" y1="120" x2="540" y2="120" stroke-width="7"/>'+
        '<text class="s-lbl" x="280" y="112" text-anchor="middle">B U S S Y S T E M</text>'+
        '<line class="s-arrow" x1="280" y1="90" x2="280" y2="116" marker-end="url(#vnp)"/>'+
        '<line class="s-arrow" x1="90" y1="146" x2="90" y2="124" marker-end="url(#vnp)"/>'+
        '<line class="s-arrow" x1="280" y1="146" x2="280" y2="124" marker-end="url(#vnp)"/>'+
        '<line class="s-arrow" x1="470" y1="124" x2="470" y2="146" marker-end="url(#vnp)"/>'+
        '<text class="s-lbl" x="20" y="228">Befehle und Daten teilen sich Speicher und Bus &#8212; das macht den Rechner universell</text>'+
        '<text class="s-lbl" x="20" y="244">und erzeugt zugleich den Von-Neumann-Flaschenhals.</text>'+
        '<defs><marker id="vnp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Die fünf Bausteine nach von Neumann. Steuerwerk und Rechenwerk bilden zusammen die CPU.</figcaption></figure>',
      code:
        "EVA am Alltagsbeispiel - Zugangskontrolle\n\n"+
        "  E  Chipkarte wird an den Leser gehalten\n"+
        "  V  System prueft die Kartennummer gegen die Rechtetabelle\n"+
        "  A  Tuer oeffnet oder Leuchte bleibt rot\n"+
        "  S  Zutrittsversuch wird protokolliert\n\n"+
        "Ohne das S waere nicht nachvollziehbar, wer wann da war -\n"+
        "und genau das verlangt ein Berechtigungskonzept.\n\n"+
        "VON NEUMANN gegen HARVARD\n\n"+
        "  Von Neumann : ein Speicher, ein Bus fuer Befehle UND Daten\n"+
        "                universell, guenstig, aber Flaschenhals\n\n"+
        "  Harvard     : getrennte Speicher und Busse\n"+
        "                schneller, aber starrer\n"+
        "                Einsatz: Mikrocontroller, CPU-Caches",
      codeLang:'Rechnerarchitektur',
      tip:'Bei der Frage „Nennen Sie die Bestandteile der Von-Neumann-Architektur" reicht eine Aufzählung für die Nennpunkte, aber die Begründungspunkte holst du mit dem Kernsatz: Programme und Daten liegen im selben Speicher. Daraus folgt beides — die Universalität des Rechners und der Flaschenhals. Wer nur fünf Kästchen aufzählt, lässt die Hälfte der Punkte liegen.',
      quiz:[
        {q:'Wofür steht das S in EVAS?', options:['Steuerung','Speicherung','Sicherheit'], correct:1, explain:'Ohne Speicherung wäre jedes Verarbeitungsergebnis nach dem Abschalten verloren.'},
        {q:'Welche beiden Werke bilden zusammen den Prozessor?', options:['Steuerwerk und Rechenwerk','Speicherwerk und Bussystem','Ein- und Ausgabewerk'], correct:0, explain:'Das Steuerwerk holt und dekodiert Befehle, das Rechenwerk führt sie aus.'},
        {q:'Was bezeichnet der Von-Neumann-Flaschenhals?', options:['Zu wenig Arbeitsspeicher','Befehle und Daten teilen sich einen Bus und können nicht gleichzeitig übertragen werden','Eine zu langsame Festplatte'], correct:1, explain:'Die Harvard-Architektur umgeht ihn durch getrennte Speicher und Busse.'}
      ]
    },
    {
      id:'m36-l2', title:'Der Befehlszyklus und die drei Bussysteme', minutes:9,
      body:
        '<p>Ein Prozessor arbeitet Befehle in einem festen, sich endlos wiederholenden Ablauf ab — dem <strong>Befehlszyklus</strong>:</p>'+
        '<ol><li><strong>FETCH</strong> — Das Steuerwerk holt den Befehl aus dem Speicher. Die Adresse steht im <strong>Befehlszähler</strong> (Program Counter).</li>'+
        '<li><strong>DECODE</strong> — Der Befehl wird entschlüsselt: Welche Operation, welche Operanden?</li>'+
        '<li><strong>EXECUTE</strong> — Das Rechenwerk führt die Operation aus.</li>'+
        '<li><strong>WRITE BACK</strong> — Das Ergebnis wird in ein Register oder in den Speicher geschrieben, der Befehlszähler wird erhöht.</li></ol>'+
        '<p>Die <strong>Taktfrequenz</strong> gibt an, wie viele solcher Schritte pro Sekunde möglich sind: 3 GHz sind drei Milliarden Takte je Sekunde. <strong>Ein Befehl braucht dabei mehrere Takte</strong> — deshalb sagt die Taktfrequenz allein wenig über die Leistung aus. Entscheidend sind zusätzlich die Anzahl der <strong>Kerne</strong>, die Größe der <strong>Caches</strong> und die <strong>Pipeline</strong>, die mehrere Befehle überlappend bearbeitet.</p>'+
        '<p><strong>Die drei Busse</strong> — eine sichere Prüfungsfrage:</p>'+
        '<table class="lesson-table"><tr><th>Bus</th><th>Transportiert</th><th>Richtung</th></tr>'+
        '<tr><td><strong>Datenbus</strong></td><td>die eigentlichen Werte</td><td>in beide Richtungen</td></tr>'+
        '<tr><td><strong>Adressbus</strong></td><td>die Speicheradresse</td><td>nur von der CPU weg</td></tr>'+
        '<tr><td><strong>Steuerbus</strong></td><td>Signale wie Lesen, Schreiben, Takt</td><td>in beide Richtungen</td></tr></table>'+
        '<p><strong>Die Rechnung, die dazu gestellt wird:</strong> Die Breite des Adressbusses bestimmt, wie viele Speicherzellen überhaupt ansprechbar sind — bei n Adressleitungen sind es <code>2 hoch n</code>. Mit 32 Adressleitungen also rund 4,3 Milliarden Zellen, bei einem Byte je Zelle genau <strong>4 GiB</strong>. Genau das ist der Grund, warum ein 32-Bit-System nicht mehr als 4 GiB Arbeitsspeicher nutzen kann.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 190" role="img" aria-label="Befehlszyklus aus Holen, Dekodieren, Ausfuehren und Zurueckschreiben">'+
        '<rect class="s-accent" x="24" y="30" width="112" height="52" rx="6"/>'+
        '<text class="s-hd" x="80" y="54" text-anchor="middle">1 FETCH</text>'+
        '<text class="s-mono" x="80" y="72" text-anchor="middle">holen</text>'+
        '<rect class="s-accent" x="160" y="30" width="112" height="52" rx="6"/>'+
        '<text class="s-hd" x="216" y="54" text-anchor="middle">2 DECODE</text>'+
        '<text class="s-mono" x="216" y="72" text-anchor="middle">entschluesseln</text>'+
        '<rect class="s-strong" x="296" y="30" width="112" height="52" rx="6"/>'+
        '<text class="s-hd" x="352" y="54" text-anchor="middle">3 EXECUTE</text>'+
        '<text class="s-mono" x="352" y="72" text-anchor="middle">ausfuehren</text>'+
        '<rect class="s-accent" x="432" y="30" width="112" height="52" rx="6"/>'+
        '<text class="s-hd" x="488" y="54" text-anchor="middle">4 WRITE</text>'+
        '<text class="s-mono" x="488" y="72" text-anchor="middle">speichern</text>'+
        '<line class="s-arrow" x1="136" y1="56" x2="156" y2="56" marker-end="url(#bzp)"/>'+
        '<line class="s-arrow" x1="272" y1="56" x2="292" y2="56" marker-end="url(#bzp)"/>'+
        '<line class="s-arrow" x1="408" y1="56" x2="428" y2="56" marker-end="url(#bzp)"/>'+
        '<path class="s-dash" d="M488 86 C 488 126, 80 126, 80 88" marker-end="url(#bzp)"/>'+
        '<text class="s-lbl" x="284" y="142" text-anchor="middle">Befehlszaehler + 1 &#8594; der Zyklus beginnt von vorn</text>'+
        '<text class="s-lbl" x="24" y="176">Ein Befehl braucht mehrere Takte. Deshalb sagt die Taktfrequenz allein wenig ueber die Leistung.</text>'+
        '<defs><marker id="bzp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Der Befehlszyklus läuft, solange der Rechner an ist. Eine Pipeline bearbeitet mehrere Befehle zeitlich überlappend.</figcaption></figure>',
      code:
        "ADRESSBUSBREITE UND MAXIMALER SPEICHER\n\n"+
        "  16 Adressleitungen : 2^16 =        65.536 Zellen =  64 KiB\n"+
        "  20 Adressleitungen : 2^20 =     1.048.576 Zellen =   1 MiB\n"+
        "  32 Adressleitungen : 2^32 = 4.294.967.296 Zellen =   4 GiB\n"+
        "  64 Adressleitungen : 2^64 = theoretisch 16 EiB\n\n"+
        "  Deshalb kann ein 32-Bit-Betriebssystem nicht mehr als\n"+
        "  4 GiB Arbeitsspeicher adressieren - unabhaengig davon,\n"+
        "  wie viele Riegel im Rechner stecken.\n\n"+
        "TYPISCHE PRUEFUNGSFRAGE\n"+
        "  Wie viele Adressleitungen braucht man fuer 1 GiB?\n"+
        "     1 GiB = 2^30 Byte  ->  30 Adressleitungen",
      codeLang:'Bussysteme',
      tip:'Die Frage „Warum bringt ein vierter Speicherriegel im alten 32-Bit-Rechner nichts?" ist eine Verständnisfrage, keine Wissensfrage. Die Antwort steckt im Adressbus: Mit 32 Leitungen lassen sich nur 2 hoch 32 Zellen ansprechen, also 4 GiB. Was darüber hinaus verbaut ist, kann der Prozessor gar nicht adressieren. Rechne die Zweierpotenz im Kopf über 2 hoch 10 gleich 1 Ki.',
      quiz:[
        {q:'In welcher Reihenfolge läuft der Befehlszyklus?', options:['Decode, Fetch, Execute','Fetch, Decode, Execute, Write back','Execute, Fetch, Decode'], correct:1, explain:'Der Befehlszähler zeigt dabei immer auf den nächsten zu holenden Befehl.'},
        {q:'Welcher Bus überträgt ausschließlich in eine Richtung?', options:['Der Datenbus','Der Adressbus','Der Steuerbus'], correct:1, explain:'Adressen gibt nur die CPU vor; Daten und Steuersignale laufen in beide Richtungen.'},
        {q:'Wie viel Speicher lässt sich mit 32 Adressleitungen ansprechen?', options:['32 MiB','4 GiB','64 GiB'], correct:1, explain:'2 hoch 32 Zellen zu je einem Byte ergeben 4 GiB — die Grenze jedes 32-Bit-Systems.'}
      ]
    },
    {
      id:'m36-l3', title:'Die Speicherpyramide und flüchtige Speicher', minutes:9,
      body:
        '<p>Kein Speicher ist gleichzeitig schnell, groß und billig. Deshalb staffeln Rechner ihren Speicher in einer <strong>Pyramide</strong>: Je näher am Prozessor, desto schneller, kleiner und teurer.</p>'+
        '<table class="lesson-table"><tr><th>Ebene</th><th>Größe</th><th>Zugriffszeit</th><th>Flüchtig?</th></tr>'+
        '<tr><td><strong>Register</strong> (in der CPU)</td><td>wenige hundert Byte</td><td>unter 1 ns</td><td>ja</td></tr>'+
        '<tr><td><strong>Cache L1 / L2 / L3</strong></td><td>32 KiB bis 64 MiB</td><td>1 bis 20 ns</td><td>ja</td></tr>'+
        '<tr><td><strong>Arbeitsspeicher (RAM)</strong></td><td>8 bis 128 GiB</td><td>etwa 80 ns</td><td>ja</td></tr>'+
        '<tr><td><strong>SSD / NVMe</strong></td><td>250 GiB bis mehrere TB</td><td>etwa 50 Mikrosekunden</td><td>nein</td></tr>'+
        '<tr><td><strong>Festplatte / Band</strong></td><td>TB bis PB</td><td>Millisekunden bis Minuten</td><td>nein</td></tr></table>'+
        '<p><strong>Flüchtig (volatil)</strong> heißt: Der Inhalt geht beim Abschalten verloren. Das gilt für Register, Cache und RAM. <strong>Nichtflüchtig</strong> sind SSD, Festplatte, Band — und das <strong>ROM</strong> beziehungsweise der Flash-Baustein, in dem die Firmware liegt.</p>'+
        '<p><strong>Warum der Cache überhaupt funktioniert:</strong> Programme greifen nicht zufällig auf den Speicher zu, sondern nach dem <strong>Lokalitätsprinzip</strong>. Zeitliche Lokalität bedeutet, dass kürzlich benutzte Daten bald wieder gebraucht werden; räumliche Lokalität, dass benachbarte Daten als Nächstes an der Reihe sind — etwa beim Durchlaufen eines Arrays. Deshalb genügen wenige Megabyte Cache, um den größten Teil aller Zugriffe abzufangen.</p>'+
        '<p>Ein Zugriff, den der Cache beantworten kann, heißt <strong>Hit</strong>, andernfalls <strong>Miss</strong>. Die <strong>Trefferquote</strong> liegt in der Praxis bei über 90 Prozent — deshalb wirkt ein Rechner deutlich schneller, als es die RAM-Zugriffszeit allein erwarten ließe.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 230" role="img" aria-label="Speicherpyramide von Registern bis zum Bandarchiv">'+
        '<polygon class="s-strong" points="248,14 312,14 324,48 236,48"/>'+
        '<text class="s-mono" x="280" y="38" text-anchor="middle">Register</text>'+
        '<polygon class="s-accent" points="236,50 324,50 340,88 220,88"/>'+
        '<text class="s-mono" x="280" y="76" text-anchor="middle">Cache L1 L2 L3</text>'+
        '<polygon class="s-accent" points="220,90 340,90 358,130 202,130"/>'+
        '<text class="s-mono" x="280" y="116" text-anchor="middle">Arbeitsspeicher</text>'+
        '<polygon class="s-box" points="202,132 358,132 378,172 182,172"/>'+
        '<text class="s-mono" x="280" y="158" text-anchor="middle">SSD / NVMe</text>'+
        '<polygon class="s-box" points="182,174 378,174 398,212 162,212"/>'+
        '<text class="s-mono" x="280" y="198" text-anchor="middle">Festplatte / Band</text>'+
        '<text class="s-lbl" x="416" y="38">schnell, klein, teuer</text>'+
        '<text class="s-lbl" x="416" y="200">langsam, gross, billig</text>'+
        '<line class="s-arrow2" x1="410" y1="50" x2="410" y2="188" marker-end="url(#spp)"/>'+
        '<text class="s-lbl" x="20" y="80">fl&#252;chtig</text>'+
        '<line class="s-line" x1="20" y1="90" x2="20" y2="128"/>'+
        '<text class="s-lbl" x="20" y="168">nicht</text>'+
        '<text class="s-lbl" x="20" y="184">fl&#252;chtig</text>'+
        '<defs><marker id="spp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Die Trennlinie zwischen flüchtig und nichtflüchtig verläuft zwischen Arbeitsspeicher und SSD. Alles darüber ist nach dem Abschalten leer.</figcaption></figure>',
      code:
        "GROESSENORDNUNGEN ANSCHAULICH\n"+
        "  Setzt man einen Registerzugriff mit 1 Sekunde an:\n\n"+
        "     Register      1 s\n"+
        "     L1-Cache      2 s\n"+
        "     RAM          80 s          (gut eine Minute)\n"+
        "     SSD      50.000 s          (etwa 14 Stunden)\n"+
        "     Festplatte  10 Mio s       (etwa 4 Monate)\n\n"+
        "  Deshalb ist der Umstieg von Festplatte auf SSD die\n"+
        "  wirksamste Einzelmassnahme gegen einen langsamen Rechner -\n"+
        "  wirksamer als mehr RAM oder eine schnellere CPU.\n\n"+
        "FLUECHTIG ODER NICHT?\n"+
        "  fluechtig     : Register, Cache, RAM\n"+
        "  nichtfluechtig: ROM/Flash (Firmware), SSD, HDD, Band",
      codeLang:'Speicherhierarchie',
      tip:'Wenn eine Aufgabe fragt, wie ein langsamer Arbeitsplatzrechner beschleunigt werden kann, ist die Speicherpyramide die Begründungsgrundlage. Nenne nicht nur die Maßnahme, sondern die Größenordnung: Der Sprung von der Festplatte zur SSD verkürzt die Zugriffszeit um den Faktor zweihundert, mehr RAM hilft dagegen nur, wenn das System überhaupt auslagert. Erst messen, dann aufrüsten.',
      quiz:[
        {q:'Welcher Speicher ist nichtflüchtig?', options:['Arbeitsspeicher','Cache','SSD'], correct:2, explain:'Register, Cache und RAM verlieren ihren Inhalt beim Abschalten.'},
        {q:'Warum genügen wenige Megabyte Cache für einen großen Leistungsgewinn?', options:['Weil Cache-Speicher besonders groß ist','Wegen des Lokalitätsprinzips — Programme greifen auf benachbarte und kürzlich benutzte Daten zu','Weil der Cache komprimiert'], correct:1, explain:'Dadurch liegt die Trefferquote in der Praxis über 90 Prozent.'},
        {q:'Welche Aufrüstung beschleunigt einen Rechner mit Festplatte typischerweise am stärksten?', options:['Eine höhere CPU-Taktfrequenz','Der Austausch gegen eine SSD','Ein größerer Monitor'], correct:1, explain:'Die Zugriffszeit sinkt dabei um etwa den Faktor zweihundert.'}
      ]
    },
    {
      id:'m36-l4', title:'Zeichen und Zahlen im Rechner darstellen', minutes:10,
      body:
        '<p>Ein Rechner kennt nur Nullen und Einsen. Wie daraus Text und negative Zahlen werden, ist eine wiederkehrende Prüfungsfrage.</p>'+
        '<p><strong>Zeichenkodierung</strong> — die Entwicklung in drei Schritten:</p>'+
        '<table class="lesson-table"><tr><th>Kodierung</th><th>Umfang</th><th>Platzbedarf</th></tr>'+
        '<tr><td><strong>ASCII</strong></td><td>7 Bit, 128 Zeichen — keine Umlaute</td><td>1 Byte je Zeichen</td></tr>'+
        '<tr><td><strong>ISO 8859-1</strong> (Latin-1)</td><td>8 Bit, 256 Zeichen — westeuropäisch</td><td>1 Byte je Zeichen</td></tr>'+
        '<tr><td><strong>Unicode / UTF-8</strong></td><td>über 150.000 Zeichen, alle Schriften</td><td><strong>1 bis 4 Byte</strong> je Zeichen</td></tr></table>'+
        '<p><strong>UTF-8 ist variabel lang</strong> — das ist der entscheidende Punkt. Ein lateinischer Buchstabe belegt ein Byte, ein Umlaut zwei, ein Emoji vier. Daraus folgt: <strong>Zeichenanzahl und Byteanzahl sind nicht dasselbe.</strong> Genau hier entstehen die bekannten Darstellungsfehler, wenn eine Datei als Latin-1 gespeichert und als UTF-8 gelesen wird — aus einem <em>ü</em> werden dann zwei Zeichen.</p>'+
        '<p><strong>Negative Ganzzahlen</strong> werden im <strong>Zweierkomplement</strong> dargestellt. Das Verfahren: alle Bits umdrehen, dann eins addieren. Das oberste Bit ist das <strong>Vorzeichenbit</strong> — ist es 1, ist die Zahl negativ. Der Vorteil: Die Addition funktioniert für positive und negative Zahlen mit derselben Schaltung, und es gibt nur <em>eine</em> Null.</p>'+
        '<p>Ein vorzeichenbehaftetes Byte deckt damit den Bereich <strong>−128 bis +127</strong> ab, ein 32-Bit-Integer etwa −2,1 bis +2,1 Milliarden. Wird diese Grenze überschritten, entsteht ein <strong>Überlauf</strong>: Der Wert springt ins Negative um.</p>'+
        '<p><strong>Kommazahlen</strong> werden als <strong>Gleitkommazahlen</strong> gespeichert (IEEE 754), aufgeteilt in Vorzeichen, Exponent und Mantisse. Weil die Mantisse endlich ist, lassen sich viele Dezimalbrüche nur annähern — deshalb ergibt <code>0,1 + 0,2</code> in fast jeder Sprache nicht exakt <code>0,3</code>. Für Geldbeträge verwendet man deshalb nie Gleitkomma, sondern Ganzzahlen in Cent oder einen Dezimaltyp.</p>',
      code:
        "ZWEIERKOMPLEMENT - Schritt fuer Schritt\n\n"+
        "  Gesucht: -5 als 8-Bit-Zahl\n\n"+
        "   1. +5 binaer          0000 0101\n"+
        "   2. alle Bits kippen   1111 1010\n"+
        "   3. eins addieren      1111 1011   = -5\n\n"+
        "  Probe: 5 + (-5)\n"+
        "     0000 0101\n"+
        "   + 1111 1011\n"+
        "   -----------\n"+
        "    10000 0000  ->  das 9. Bit faellt weg, Ergebnis 0. Stimmt.\n\n"+
        "WERTEBEREICHE\n"+
        "   8 Bit  vorzeichenlos :        0 bis        255\n"+
        "   8 Bit  mit Vorzeichen:     -128 bis       +127\n"+
        "  16 Bit  mit Vorzeichen:  -32.768 bis    +32.767\n"+
        "  32 Bit  mit Vorzeichen:  rund -2,1 bis +2,1 Mrd\n\n"+
        "UTF-8 - Zeichen sind nicht gleich Byte\n"+
        "  \"Gruss\"     5 Zeichen,  5 Byte\n"+
        "  \"Gruesse\"   7 Zeichen,  7 Byte\n"+
        "  \"Gruesse!\"  8 Zeichen,  8 Byte\n"+
        "  ein Umlaut  1 Zeichen,  2 Byte\n"+
        "  ein Emoji   1 Zeichen,  4 Byte",
      codeLang:'Kodierung & Zahlen',
      tip:'Die Frage „Warum wird ein Geldbetrag nicht als Gleitkommazahl gespeichert?" kommt regelmäßig und hat eine präzise Antwort: Dezimalbrüche wie 0,1 sind im Binärsystem periodisch und werden nur gerundet abgelegt. Bei vielen Additionen summieren sich die Rundungsfehler und die Bilanz stimmt nicht mehr auf den Cent. Die saubere Lösung sind Ganzzahlen in Cent oder ein Dezimaltyp.',
      quiz:[
        {q:'Wie viele Byte belegt ein Zeichen in UTF-8?', options:['Immer genau 1','Immer genau 2','Zwischen 1 und 4, je nach Zeichen'], correct:2, explain:'Deshalb sind Zeichenanzahl und Dateigröße nicht dasselbe.'},
        {q:'Wie bildet man das Zweierkomplement einer Zahl?', options:['Alle Bits kippen und eins addieren','Das erste Bit auf 1 setzen','Die Zahl durch zwei teilen'], correct:0, explain:'Dadurch funktioniert die Addition für positive und negative Zahlen mit derselben Schaltung.'},
        {q:'Welchen Wertebereich hat ein vorzeichenbehaftetes Byte?', options:['0 bis 255','−128 bis +127','−255 bis +255'], correct:1, explain:'Das oberste Bit dient als Vorzeichen, deshalb halbiert sich der positive Bereich.'}
      ]
    },
    {
      id:'m36-l5', title:'Logische Gatter und Schaltnetze', minutes:8,
      body:
        '<p>Unter dem Zweierkomplement und jeder Bedingung im Programm liegen <strong>logische Gatter</strong> — elektronische Bausteine, die aus Eingangssignalen ein Ausgangssignal berechnen. Die <strong>Wahrheitstabelle</strong> beschreibt sie vollständig.</p>'+
        '<table class="lesson-table"><tr><th>A</th><th>B</th><th>UND</th><th>ODER</th><th>XOR</th><th>NAND</th></tr>'+
        '<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>'+
        '<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>'+
        '<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>'+
        '<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table>'+
        '<p><strong>UND</strong> liefert nur bei zwei Einsen eine Eins, <strong>ODER</strong> bei mindestens einer, <strong>XOR</strong> (exklusives Oder) bei <em>genau</em> einer — es prüft also auf Ungleichheit. <strong>NICHT</strong> kehrt ein einzelnes Signal um. <strong>NAND</strong> und <strong>NOR</strong> sind die verneinten Formen; aus NAND allein lässt sich jede beliebige Schaltung aufbauen, weshalb es als universelles Gatter gilt.</p>'+
        '<p><strong>Der Halbaddierer</strong> zeigt, wie aus Logik Arithmetik wird: Ein XOR liefert die Summenstelle, ein UND den Übertrag. Damit addiert man zwei einzelne Bits. Schaltet man mehrere <strong>Volladdierer</strong> hintereinander, die zusätzlich einen eingehenden Übertrag verarbeiten, entsteht das Rechenwerk, das ganze Zahlen addiert.</p>'+
        '<p>Für die Prüfung reichen zwei Fähigkeiten: eine <strong>Wahrheitstabelle ausfüllen</strong> und einen zusammengesetzten Ausdruck auswerten. Bei drei Eingängen hat die Tabelle acht Zeilen — allgemein <code>2 hoch n</code>. Schreibe die Eingangskombinationen immer in derselben binären Zählreihenfolge auf, dann vergisst du keine.</p>'+
        '<p>Für Vereinfachungen gelten die <strong>Gesetze von De Morgan</strong>: Die Verneinung einer UND-Verknüpfung ist die ODER-Verknüpfung der Verneinungen — und umgekehrt. Praktisch heißt das: Wer eine Bedingung verneint, dreht jeden Vergleich um <em>und</em> tauscht UND gegen ODER.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 170" role="img" aria-label="Halbaddierer aus einem XOR- und einem UND-Gatter">'+
        '<text class="s-mono" x="24" y="52">A</text><text class="s-mono" x="24" y="110">B</text>'+
        '<line class="s-line" x1="38" y1="46" x2="150" y2="46"/>'+
        '<line class="s-line" x1="38" y1="104" x2="150" y2="104"/>'+
        '<line class="s-line" x1="90" y1="46" x2="90" y2="122"/>'+
        '<line class="s-line" x1="90" y1="122" x2="150" y2="122"/>'+
        '<line class="s-line" x1="118" y1="104" x2="118" y2="64"/>'+
        '<line class="s-line" x1="118" y1="64" x2="150" y2="64"/>'+
        '<rect class="s-strong" x="150" y="28" width="96" height="52" rx="6"/>'+
        '<text class="s-hd" x="198" y="60" text-anchor="middle">XOR</text>'+
        '<rect class="s-accent" x="150" y="98" width="96" height="46" rx="6"/>'+
        '<text class="s-hd" x="198" y="127" text-anchor="middle">UND</text>'+
        '<line class="s-arrow" x1="246" y1="54" x2="330" y2="54" marker-end="url(#hap)"/>'+
        '<line class="s-arrow" x1="246" y1="121" x2="330" y2="121" marker-end="url(#hap)"/>'+
        '<text class="s-mono" x="340" y="58">Summe</text>'+
        '<text class="s-mono" x="340" y="125">Uebertrag</text>'+
        '<text class="s-lbl" x="430" y="46">1 + 1 = 0</text>'+
        '<text class="s-lbl" x="430" y="64">Uebertrag 1</text>'+
        '<text class="s-lbl" x="24" y="160">XOR liefert die Summenstelle, UND den &#220;bertrag &#8212; so wird aus Logik Arithmetik.</text>'+
        '<defs><marker id="hap" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Der Halbaddierer ist die kleinste Recheneinheit. Mehrere Volladdierer hintereinander bilden das Rechenwerk der CPU.</figcaption></figure>',
      code:
        "WAHRHEITSTABELLE AUSFUELLEN - immer in binaerer Zaehlreihenfolge\n\n"+
        "  Gesucht: Y = (A UND B) ODER (NICHT C)\n\n"+
        "   A B C | A UND B | NICHT C | Y\n"+
        "   ------+---------+---------+---\n"+
        "   0 0 0 |    0    |    1    | 1\n"+
        "   0 0 1 |    0    |    0    | 0\n"+
        "   0 1 0 |    0    |    1    | 1\n"+
        "   0 1 1 |    0    |    0    | 0\n"+
        "   1 0 0 |    0    |    1    | 1\n"+
        "   1 0 1 |    0    |    0    | 0\n"+
        "   1 1 0 |    1    |    1    | 1\n"+
        "   1 1 1 |    1    |    0    | 1\n\n"+
        "  Drei Eingaenge -> 2^3 = 8 Zeilen. Hilfsspalten anlegen,\n"+
        "  dann kann man sich nicht verrechnen.\n\n"+
        "DE MORGAN - Verneinung richtig aufloesen\n"+
        "  NICHT (A UND B)  =  (NICHT A) ODER (NICHT B)\n"+
        "  NICHT (A ODER B) =  (NICHT A) UND  (NICHT B)\n\n"+
        "  Im Code: NICHT (alter >= 18 UND hatAusweis)\n"+
        "        =  alter < 18 ODER NICHT hatAusweis",
      codeLang:'Schaltlogik',
      tip:'De Morgan ist nicht nur Schaltungstheorie, sondern der häufigste Logikfehler in Fehlersuchaufgaben. Wer eine Bedingung verneint, muss zwei Dinge gleichzeitig tun: jeden Vergleich umdrehen und UND gegen ODER tauschen. Wird nur eins davon gemacht, läuft das Programm fehlerfrei und rechnet trotzdem falsch — genau die Sorte Fehler, die kein Compiler findet.',
      quiz:[
        {q:'Wann liefert ein XOR-Gatter eine 1?', options:['Wenn beide Eingänge 1 sind','Wenn genau ein Eingang 1 ist','Wenn beide Eingänge 0 sind'], correct:1, explain:'XOR prüft damit auf Ungleichheit der beiden Eingänge.'},
        {q:'Wie viele Zeilen hat die Wahrheitstabelle bei vier Eingängen?', options:['8','16','4'], correct:1, explain:'2 hoch 4 gleich 16 — allgemein 2 hoch Anzahl der Eingänge.'},
        {q:'Wie lautet NICHT (A UND B) nach De Morgan?', options:['(NICHT A) UND (NICHT B)','(NICHT A) ODER (NICHT B)','A ODER B'], correct:1, explain:'Verneinen heißt: jeden Teil umdrehen und die Verknüpfung tauschen.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m19', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Einheiten, Datenmengen & Übertragung', relevanz:'hoch',
  lessons:[
    {
      id:'m19-l1', title:'Bit, Byte und die beiden Präfixsysteme', minutes:9,
      body:
        '<p>Die Grundlage: <strong>1 Byte = 8 Bit</strong>. Datenmengen werden in Byte (Großbuchstabe <strong>B</strong>) angegeben, Übertragungsraten in Bit pro Sekunde (kleines <strong>b</strong>, also <strong>bit/s</strong> oder <strong>bps</strong>).</p>'+
        '<p>Es gibt <strong>zwei Präfixsysteme</strong>, und die AP1 prüft den Unterschied:</p>'+
        '<table class="lesson-table"><tr><th>Dezimal (SI)</th><th>Faktor</th><th>Binär (IEC)</th><th>Faktor</th></tr>'+
        '<tr><td>1 kB (Kilobyte)</td><td>10³ = 1.000</td><td>1 KiB (Kibibyte)</td><td>2¹⁰ = 1.024</td></tr>'+
        '<tr><td>1 MB</td><td>10⁶</td><td>1 MiB</td><td>2²⁰</td></tr>'+
        '<tr><td>1 GB</td><td>10⁹</td><td>1 GiB</td><td>2³⁰</td></tr>'+
        '<tr><td>1 TB</td><td>10¹²</td><td>1 TiB</td><td>2⁴⁰</td></tr></table>'+
        '<p>Daher stammt der bekannte Effekt: Eine als „1 TB" verkaufte Festplatte zeigt Windows als etwa 931 GiB an – 10¹² geteilt durch 2³⁰ ergibt 931,3. Die Platte ist nicht kleiner, sie wird nur anders gezählt.</p>'+
        '<p><strong>Kleine Einheiten:</strong> 1 s = 1.000 ms = 1.000.000 µs = 10⁹ ns.</p>',
      code:
        "Umrechnungskette - immer vollstaendig hinschreiben:\n\n"+
        "  Bit -> Byte      : / 8\n"+
        "  Byte -> KiB      : / 1024\n"+
        "  KiB -> MiB       : / 1024\n"+
        "  MiB -> GiB       : / 1024\n\n"+
        "Beispiel: 4.194.304 Bit sind wie viel MiB?\n"+
        "  4.194.304 / 8    = 524.288 Byte\n"+
        "  524.288 / 1024   =     512 KiB\n"+
        "  512 / 1024       =     0,5 MiB",
      codeLang:'Einheitenumrechnung',
      tip:'Schreibe bei Umrechnungsaufgaben jeden Zwischenschritt mit Einheit hin, auch wenn du im Kopf rechnen könntest. Die IHK vergibt Teilpunkte auf den Rechenweg – wer nur das Endergebnis notiert und sich um einen Faktor 8 vertut, bekommt null Punkte statt der Hälfte. Der Faktor 8 zwischen Bit und Byte ist dabei die mit Abstand häufigste Fehlerquelle.',
      quiz:[
        {q:'Wie viele Byte hat ein Kibibyte (KiB)?', options:['1.000','1.024','8.192'], correct:1, explain:'2^10 = 1.024 – das dezimale Kilobyte hat dagegen 1.000 Byte.'},
        {q:'Wofür steht das kleine b in „100 Mbit/s"?', options:['Byte','Bit','Baud'], correct:1, explain:'Datenraten werden in Bit pro Sekunde angegeben, Datenmengen in Byte.'},
        {q:'Wie viele Byte sind 1 MiB?', options:['1.000.000','1.048.576','1.024'], correct:1, explain:'2²⁰ — das dezimale MB hat dagegen genau eine Million Byte.'}
      ]
    },
    {
      id:'m19-l2', title:'Übertragungsdauer und Datenmengen berechnen', minutes:10,
      body:
        '<p>Die zentrale Formel:</p>'+
        '<p><code>Zeit = Datenmenge / Übertragungsrate</code></p>'+
        '<p>Der Haken liegt immer in den Einheiten: Die Datenmenge steht in <strong>Byte</strong>, die Rate in <strong>Bit/s</strong>. Also erst umrechnen, dann teilen.</p>'+
        '<p><strong>Das Vorgehen in vier Schritten:</strong></p>'+
        '<ol><li>Datenmenge in Bit umrechnen (× 8).</li>'+
        '<li>Rate in Bit/s bringen.</li>'+
        '<li>Teilen – das Ergebnis sind Sekunden.</li>'+
        '<li>In Minuten oder Stunden umrechnen und <strong>sinnvoll runden</strong>.</li></ol>'+
        '<p><strong>Speicherbedarf berechnen:</strong> Anzahl × Größe je Einheit. Bei Datenbanken: Datensatzgröße × Anzahl Datensätze, gegebenenfalls mal Aufbewahrungszeitraum.</p>'+
        '<p><strong>Unkomprimierte Audio- oder Videodaten:</strong> <code>Abtastrate × Bittiefe × Kanäle × Dauer</code>.</p>',
      code:
        "Aufgabe: 4,5 GB Backup ueber eine 250-Mbit/s-Leitung.\n\n"+
        "  1. 4,5 GB = 4,5 x 10^9 Byte = 4,5 x 10^9 x 8 Bit = 36 x 10^9 Bit\n"+
        "  2. Rate = 250 x 10^6 Bit/s\n"+
        "  3. t = 36.000.000.000 / 250.000.000 = 144 s\n"+
        "  4. 144 s = 2 Minuten 24 Sekunden\n\n"+
        "Audio: 3 Min Stereo, 44,1 kHz, 16 Bit, unkomprimiert\n"+
        "  44.100 x 16 x 2 x 180 s = 254.016.000 Bit\n"+
        "  / 8 = 31.752.000 Byte  ~ 31,75 MB  (bzw. ~30,3 MiB)",
      codeLang:'Übertragungsrechnung',
      tip:'Achte auf den Zusatz „bei 80 Prozent effektiver Auslastung", der in Prüfungsaufgaben häufig versteckt ist. Die Bruttorate wird nie vollständig erreicht, weil Protokoll-Overhead anfällt. Dann rechnest du zuerst 250 mal 0,8 gleich 200 Mbit/s und erst danach die Zeit. Wer den Satz überliest, bekommt ein zu optimistisches Ergebnis und verliert den Punkt.',
      quiz:[
        {q:'Wie lange dauert die Übertragung von 100 MB über 100 Mbit/s?', options:['1 Sekunde','8 Sekunden','12,5 Sekunden'], correct:1, explain:'100 MB = 800 Mbit, geteilt durch 100 Mbit/s = 8 s.'},
        {q:'Was muss man vor dem Teilen immer prüfen?', options:['Die Uhrzeit','Ob Datenmenge und Rate dieselbe Basiseinheit haben (Bit vs. Byte)','Den Hersteller'], correct:1, explain:'Der Faktor 8 ist die häufigste Fehlerquelle.'},
        {q:'Was ist bei „effektiver Auslastung 75 %" zuerst zu tun?', options:['Das Ergebnis durch 0,75 teilen','Die Datenrate vor der Division auf 75 % reduzieren','Nichts'], correct:1, explain:'Erst die Rate anpassen, dann die Zeit berechnen.'}
      ]
    },
    {
      id:'m19-l3', title:'Zahlensysteme und Codierung', minutes:9,
      body:
        '<p>Die AP1 verlangt sichere Umrechnung zwischen <strong>Dezimal, Binär und Hexadezimal</strong> – besonders im Kontext von IP-Adressen, Subnetzmasken und MAC-Adressen.</p>'+
        '<p><strong>Binär → Dezimal:</strong> Stellenwerte von rechts addieren: 1, 2, 4, 8, 16, 32, 64, 128.</p>'+
        '<p><strong>Dezimal → Binär:</strong> Von links mit 128 beginnen und fortlaufend fragen „passt die Zahl hinein?"</p>'+
        '<p><strong>Hexadezimal:</strong> Ziffern 0–9 und A–F, wobei A = 10 bis F = 15. <strong>Je vier Binärstellen ergeben genau eine Hex-Ziffer</strong> – deshalb ist die Umrechnung zwischen Binär und Hex reine Blockbildung, ganz ohne Rechnung.</p>'+
        '<p><strong>Zeichencodierung:</strong> <strong>ASCII</strong> nutzt 7 Bit für 128 Zeichen, erweitert 8 Bit für 256. <strong>Unicode</strong> umfasst alle Schriftzeichen der Welt; <strong>UTF-8</strong> kodiert sie variabel mit 1 bis 4 Byte und ist zu ASCII abwärtskompatibel. Deshalb belegen Umlaute in UTF-8 zwei Byte – eine beliebte Rechenaufgabe zum Speicherbedarf.</p>',
      code:
        "Dezimal 192 -> Binaer:\n"+
        "  128 passt (Rest 64) -> 1\n"+
        "   64 passt (Rest  0) -> 1\n"+
        "   32,16,8,4,2,1 passen nicht -> 0\n"+
        "  Ergebnis: 11000000\n\n"+
        "Binaer -> Hex (Vierergruppen von rechts):\n"+
        "  1100 0000\n"+
        "   C    0     ->  0xC0\n\n"+
        "Hex-Tabelle: 8=1000  9=1001  A=1010  B=1011\n"+
        "             C=1100  D=1101  E=1110  F=1111",
      codeLang:'Zahlensysteme',
      tip:'Die Vierergruppierung ist der Trick, der Hexadezimal-Aufgaben in Sekunden löst: Vier Bit haben genau 16 mögliche Werte, also exakt eine Hex-Ziffer. Du musst nie über Dezimal gehen. Gruppiere von rechts, fülle links mit Nullen auf und übersetze jede Gruppe einzeln. Das gilt genauso rückwärts – jede Hex-Ziffer wird zu vier Bit.',
      quiz:[
        {q:'Welcher Dezimalwert entspricht dem Binärwert 11100000?', options:['192','224','240'], correct:1, explain:'128 + 64 + 32 = 224 – die Subnetzmaske /27.'},
        {q:'Wie viele Binärstellen entsprechen einer Hex-Ziffer?', options:['2','4','8'], correct:1, explain:'Vier Bit ergeben 16 Werte, genau ein Hex-Zeichen.'},
        {q:'Wie viele Zeichen kann ASCII mit 7 Bit darstellen?', options:['64','128','256'], correct:1, explain:'Erweitertes ASCII nutzt 8 Bit für 256 Zeichen.'}
      ]
    },
    {
      id:'m19-l4', title:'Ergonomie, Green IT und Energiekosten', minutes:9,
      body:
        '<p>Der Prüfungsbereich heißt „Einrichten eines IT-gestützten Arbeitsplatzes" – deshalb gehören Ergonomie und Umwelt fest dazu.</p>'+
        '<p><strong>Ergonomie am Bildschirmarbeitsplatz</strong> (ArbStättV, Anhang 6):</p>'+
        '<ul><li>Blickrichtung <strong>parallel</strong> zum Fenster – nicht davor (Blendung) und nicht mit dem Rücken dazu (Reflexionen).</li>'+
        '<li>Sehabstand 50–80 cm, oberste Bildschirmzeile <strong>unterhalb</strong> der Augenhöhe, Blick leicht gesenkt.</li>'+
        '<li>Beleuchtung mindestens 500 Lux am Arbeitsplatz, blendfrei.</li>'+
        '<li>Ober- und Unterarm sowie Ober- und Unterschenkel etwa im 90-Grad-Winkel, Füße flach auf dem Boden.</li>'+
        '<li>Tischhöhe rund 72 cm oder höhenverstellbar, Stuhl mit verstellbarer Rückenlehne.</li>'+
        '<li>Arbeitsplatzfläche mindestens 8 bis 10 m² pro Person, Lärm unter 55 dB(A) bei Büroarbeit.</li>'+
        '<li>Regelmäßige Pausen und Tätigkeitswechsel, Angebot einer arbeitsmedizinischen Vorsorge.</li></ul>'+
        '<p><strong>Green IT:</strong> energieeffiziente Geräte (Energy Star, Blauer Engel, TCO), Server<strong>virtualisierung</strong> statt vieler physischer Maschinen, Thin Clients, Abwärmenutzung und freie Kühlung im Rechenzentrum, Standby-Abschaltung, längere Nutzungsdauer und fachgerechte Entsorgung nach <strong>ElektroG</strong>, Druckaufkommen senken.</p>'+
        '<p><strong>Wirkungsgrad:</strong> <code>η = abgegebene Leistung / zugeführte Leistung × 100 %</code>. Im Rechenzentrum misst man zusätzlich den <strong>PUE</strong> = Gesamtenergie / IT-Energie; ideal wäre 1,0.</p>',
      code:
        "Stromkosten berechnen - Standardaufgabe:\n\n"+
        "  20 PCs x 120 W x 9 h/Tag x 220 Arbeitstage\n"+
        "  = 20 x 120 x 9 x 220 = 4.752.000 Wh = 4.752 kWh\n"+
        "  bei 0,32 EUR/kWh  ->  1.520,64 EUR pro Jahr\n\n"+
        "Ersparnis durch Abschaltung statt Standby (je 5 W, 15 h/Tag):\n"+
        "  20 x 5 W x 15 h x 365 = 547.500 Wh = 547,5 kWh = 175,20 EUR/Jahr",
      codeLang:'Energiekostenrechnung',
      tip:'Bei Stromkostenaufgaben ist die Umrechnung von Wattstunden in Kilowattstunden der Punkt, an dem es schiefgeht – teile durch 1.000, bevor du mit dem Preis multiplizierst. Und achte auf den Zeitraum: Arbeitstage sind etwa 220 im Jahr, Kalendertage 365. Welcher Wert gilt, hängt davon ab, ob das Gerät nur während der Arbeitszeit läuft oder durchgehend.',
      quiz:[
        {q:'Wie sollte der Bildschirm zum Fenster stehen?', options:['Direkt davor','Mit dem Rücken zum Fenster','Blickrichtung parallel zum Fenster'], correct:2, explain:'Davor blendet das Licht, dahinter spiegelt es sich im Display.'},
        {q:'Was misst der PUE-Wert eines Rechenzentrums?', options:['Die Rechenleistung','Gesamtenergie geteilt durch IT-Energie','Die CO2-Emission'], correct:1, explain:'Je näher an 1,0, desto effizienter die Infrastruktur.'},
        {q:'Wie viel Beleuchtungsstärke fordert die Arbeitsstättenverordnung am Büroarbeitsplatz mindestens?', options:['200 Lux','500 Lux','1.000 Lux'], correct:1, explain:'Zusätzlich muss die Beleuchtung blendfrei sein.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m37', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Betriebssystem & Systemstart', relevanz:'hoch',
  lessons:[
    {
      id:'m37-l1', title:'Was ein Betriebssystem leistet', minutes:9,
      body:
        '<p>Ein <strong>Betriebssystem</strong> ist die Schicht zwischen Hardware und Anwendung. Es verwaltet die <strong>Betriebsmittel</strong> und stellt Programmen eine einheitliche Schnittstelle bereit — ohne es müsste jede Anwendung jede Festplatte und jede Grafikkarte selbst ansteuern.</p>'+
        '<p><strong>Die fünf Kernaufgaben</strong>, eine klassische Nennfrage:</p>'+
        '<table class="lesson-table"><tr><th>Aufgabe</th><th>Worum es geht</th></tr>'+
        '<tr><td><strong>Prozessverwaltung</strong></td><td>Welches Programm bekommt wann die CPU?</td></tr>'+
        '<tr><td><strong>Speicherverwaltung</strong></td><td>Wer darf welchen Bereich des RAM nutzen?</td></tr>'+
        '<tr><td><strong>Dateiverwaltung</strong></td><td>Ordner, Dateien, Zugriffsrechte</td></tr>'+
        '<tr><td><strong>Geräteverwaltung</strong></td><td>Ansteuerung über Treiber</td></tr>'+
        '<tr><td><strong>Benutzerverwaltung</strong></td><td>Konten, Anmeldung, Berechtigungen</td></tr></table>'+
        '<p>Den Kern bildet der <strong>Kernel</strong>. Er läuft im <strong>Kernel-Modus</strong> mit vollem Hardwarezugriff, während Anwendungen im <strong>Benutzermodus</strong> laufen und nur über definierte <strong>Systemaufrufe</strong> an die Hardware kommen. Diese Trennung ist ein Sicherheitsmerkmal: Ein abstürzendes Programm reißt nicht das ganze System mit, und keine Anwendung kann den Speicher einer anderen lesen.</p>'+
        '<p><strong>Treiber</strong> sind die gerätespezifischen Übersetzer. Sie laufen typischerweise im Kernel-Modus — deshalb kann ein fehlerhafter Treiber tatsächlich das gesamte System zum Absturz bringen, während ein fehlerhaftes Anwendungsprogramm nur sich selbst beendet. Das ist die Antwort auf die Frage, warum Treiber aus vertrauenswürdiger Quelle stammen müssen und warum Windows unsignierte Treiber blockiert.</p>'+
        '<p><strong>Multitasking</strong> bedeutet, dass mehrere Programme scheinbar gleichzeitig laufen. Bei einem einzelnen Kern ist das eine Illusion: Das Betriebssystem schaltet sehr schnell zwischen ihnen um. Echte Gleichzeitigkeit gibt es erst mit mehreren Kernen. Beim <strong>präemptiven</strong> Multitasking entzieht das Betriebssystem einem Programm die CPU notfalls gegen dessen Willen — nur so kann ein hängendes Programm das System nicht blockieren.</p>',
      code:
        "SCHICHTEN - von unten nach oben\n\n"+
        "   +-------------------------------------------+\n"+
        "   |  Anwendungen (Benutzermodus)              |\n"+
        "   |  Browser, Office, Fachanwendung           |\n"+
        "   +-------------------------------------------+\n"+
        "   |  Systemaufrufe (API)                      |  <- die Grenze\n"+
        "   +-------------------------------------------+\n"+
        "   |  Kernel (Kernel-Modus)                    |\n"+
        "   |  Prozesse, Speicher, Dateien, Geraete     |\n"+
        "   +-------------------------------------------+\n"+
        "   |  Treiber                                  |\n"+
        "   +-------------------------------------------+\n"+
        "   |  Hardware                                 |\n"+
        "   +-------------------------------------------+\n\n"+
        "WARUM DIE TRENNUNG WICHTIG IST\n"+
        "  Anwendung stuerzt ab  -> nur dieser Prozess endet\n"+
        "  Treiber stuerzt ab    -> Bluescreen / Kernel Panic\n\n"+
        "  Deshalb: Treiber nur vom Hersteller, signiert,\n"+
        "  und vor dem Rollout auf einem Testgeraet pruefen.",
      codeLang:'Betriebssystem',
      tip:'Bei der Frage „Nennen Sie Aufgaben eines Betriebssystems" zählen die fünf Verwaltungsaufgaben als Nennpunkte. Den Zusatzpunkt holst du mit der Abstraktionsleistung: Das Betriebssystem verbirgt die Unterschiede der Hardware hinter einer einheitlichen Schnittstelle, sodass dieselbe Anwendung auf verschiedenen Geräten läuft. Genau deshalb muss nicht jedes Programm eigene Treiber mitbringen.',
      quiz:[
        {q:'Warum kann ein fehlerhafter Treiber das ganze System zum Absturz bringen?', options:['Weil Treiber besonders groß sind','Weil Treiber im Kernel-Modus mit vollem Hardwarezugriff laufen','Weil Treiber nicht kompiliert werden'], correct:1, explain:'Anwendungen laufen im Benutzermodus und reißen beim Absturz nichts mit.'},
        {q:'Was kennzeichnet präemptives Multitasking?', options:['Programme geben die CPU freiwillig ab','Das Betriebssystem entzieht die CPU notfalls gegen den Willen des Programms','Es läuft nur ein Programm gleichzeitig'], correct:1, explain:'Nur so kann ein hängendes Programm das System nicht blockieren.'},
        {q:'Wie gelangt eine Anwendung an die Hardware?', options:['Direkt über den Adressbus','Über Systemaufrufe an den Kernel','Gar nicht'], correct:1, explain:'Die Trennung von Benutzer- und Kernel-Modus ist ein Sicherheitsmerkmal.'}
      ]
    },
    {
      id:'m37-l2', title:'Prozesse, Threads und Scheduling', minutes:9,
      body:
        '<p>Ein <strong>Programm</strong> ist eine Datei auf der Platte. Ein <strong>Prozess</strong> ist dieses Programm in Ausführung — mit eigenem Speicherbereich, eigenen offenen Dateien und eigener Prozess-ID. Startet man dasselbe Programm zweimal, entstehen <strong>zwei Prozesse</strong>.</p>'+
        '<p>Ein <strong>Thread</strong> ist ein Ausführungsstrang <em>innerhalb</em> eines Prozesses. Alle Threads eines Prozesses teilen sich dessen Speicher — das macht den Austausch zwischen ihnen schnell, aber auch gefährlich: Greifen zwei Threads gleichzeitig auf dieselbe Variable zu, entsteht eine <strong>Race Condition</strong>. Dagegen hilft <strong>Synchronisation</strong>, etwa über eine Sperre.</p>'+
        '<p><strong>Die Prozesszustände</strong> — das Modell, das als Diagramm abgefragt wird:</p>'+
        '<ul><li><strong>bereit</strong> — der Prozess könnte rechnen und wartet auf die CPU,</li>'+
        '<li><strong>rechnend</strong> — er hat die CPU gerade zugeteilt bekommen,</li>'+
        '<li><strong>blockiert</strong> — er wartet auf etwas anderes, etwa eine Festplatte oder eine Netzwerkantwort.</li></ul>'+
        '<p>Der Wechsel von <em>rechnend</em> nach <em>bereit</em> heißt <strong>Verdrängung</strong>, der umgekehrte Weg <strong>Zuteilung</strong>. Jeder Wechsel kostet Zeit, weil der Zustand gesichert und wiederhergestellt werden muss — den <strong>Kontextwechsel</strong>. Zu viele Prozesse bedeuten deshalb mehr Verwaltung und weniger Nutzarbeit.</p>'+
        '<p><strong>Scheduling-Verfahren</strong>, die du unterscheiden solltest:</p>'+
        '<table class="lesson-table"><tr><th>Verfahren</th><th>Regel</th><th>Schwäche</th></tr>'+
        '<tr><td><strong>FCFS</strong> (First Come First Served)</td><td>in der Reihenfolge des Eintreffens</td><td>ein langer Job blockiert alle</td></tr>'+
        '<tr><td><strong>SJF</strong> (Shortest Job First)</td><td>kürzester Auftrag zuerst</td><td>lange Jobs verhungern</td></tr>'+
        '<tr><td><strong>Round Robin</strong></td><td>jeder bekommt eine feste Zeitscheibe</td><td>Wahl der Scheibengröße</td></tr>'+
        '<tr><td><strong>Prioritätsgesteuert</strong></td><td>höhere Priorität zuerst</td><td>niedrige Priorität verhungert</td></tr></table>'+
        '<p><strong>Round Robin</strong> ist das Verfahren der Wahl für interaktive Systeme, weil jeder Prozess garantiert regelmäßig drankommt und die Bedienung flüssig bleibt.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Zustandsdiagramm eines Prozesses mit bereit, rechnend und blockiert">'+
        '<rect class="s-accent" x="30" y="24" width="120" height="46" rx="8"/>'+
        '<text class="s-hd" x="90" y="52" text-anchor="middle">bereit</text>'+
        '<rect class="s-strong" x="380" y="24" width="140" height="46" rx="8"/>'+
        '<text class="s-hd" x="450" y="52" text-anchor="middle">rechnend</text>'+
        '<rect class="s-warn" x="200" y="128" width="150" height="46" rx="8"/>'+
        '<text class="s-hd" x="275" y="156" text-anchor="middle">blockiert</text>'+
        '<path class="s-arrow" d="M150 38 L376 38" marker-end="url(#pzp)"/>'+
        '<text class="s-lbl" x="263" y="30" text-anchor="middle">Zuteilung</text>'+
        '<path class="s-arrow" d="M376 58 L154 58" marker-end="url(#pzp)"/>'+
        '<text class="s-lbl" x="263" y="74" text-anchor="middle">Verdr&#228;ngung (Zeitscheibe abgelaufen)</text>'+
        '<path class="s-arrow" d="M440 72 L350 126" marker-end="url(#pzp)"/>'+
        '<text class="s-lbl" x="400" y="112">wartet auf E/A</text>'+
        '<path class="s-arrow" d="M200 140 L100 74" marker-end="url(#pzp)"/>'+
        '<text class="s-lbl" x="86" y="118">E/A fertig</text>'+
        '<text class="s-lbl" x="30" y="194">Aus &#8222;blockiert&#8220; geht es nie direkt zu &#8222;rechnend&#8220; &#8212; der Prozess muss erst wieder in die Warteschlange.</text>'+
        '<defs><marker id="pzp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Drei Zustände, vier Übergänge. Die fehlende Kante von blockiert nach rechnend ist eine beliebte Prüfungsfalle.</figcaption></figure>',
      code:
        "ROUND ROBIN DURCHRECHNEN - Zeitscheibe 4 ms\n\n"+
        "  Prozess  Rechenzeit\n"+
        "     A        10 ms\n"+
        "     B         4 ms\n"+
        "     C         6 ms\n\n"+
        "  Ablauf:\n"+
        "     0- 4  A  (bleiben 6)\n"+
        "     4- 8  B  (fertig bei  8)\n"+
        "     8-12  C  (bleiben 2)\n"+
        "    12-16  A  (bleiben 2)\n"+
        "    16-18  C  (fertig bei 18)\n"+
        "    18-20  A  (fertig bei 20)\n\n"+
        "  Durchlaufzeit = Ende - Ankunft (alle kamen bei 0 an)\n"+
        "     A = 20   B = 8   C = 18\n"+
        "     Mittel = (20 + 8 + 18) / 3 = 15,33 ms\n\n"+
        "  Zum Vergleich FCFS in der Reihenfolge A, B, C:\n"+
        "     A = 10   B = 14   C = 20   ->  Mittel 14,67 ms\n"+
        "     Besser im Mittel, aber B wartet 10 ms auf seinen Start.",
      codeLang:'Scheduling',
      tip:'Wenn eine Aufgabe Scheduling-Verfahren vergleichen lässt, genügt die mittlere Durchlaufzeit nicht als Antwort. Nenne zusätzlich die Antwortzeit für kurze Aufträge: Round Robin hat oft die schlechtere Mittelwertbilanz und fühlt sich trotzdem besser an, weil kein Prozess lange warten muss. Für interaktive Arbeitsplätze zählt genau das, für einen Stapelverarbeitungsserver zählt der Durchsatz.',
      quiz:[
        {q:'Was unterscheidet einen Thread von einem Prozess?', options:['Threads haben einen eigenen Speicherbereich','Threads teilen sich den Speicher ihres Prozesses','Threads laufen ohne Betriebssystem'], correct:1, explain:'Das macht den Austausch schnell, erzeugt aber die Gefahr von Race Conditions.'},
        {q:'Welcher Zustandsübergang existiert im Prozessmodell NICHT?', options:['rechnend nach bereit','blockiert direkt nach rechnend','bereit nach rechnend'], correct:1, explain:'Aus blockiert geht es zurück nach bereit — der Prozess reiht sich erst wieder ein.'},
        {q:'Welches Scheduling-Verfahren eignet sich am besten für interaktive Arbeitsplätze?', options:['First Come First Served','Round Robin mit Zeitscheiben','Shortest Job First'], correct:1, explain:'Jeder Prozess kommt garantiert regelmäßig dran, die Bedienung bleibt flüssig.'}
      ]
    },
    {
      id:'m37-l3', title:'Speicherverwaltung und virtueller Speicher', minutes:9,
      body:
        '<p>Der Arbeitsspeicher ist begrenzt, die Summe aller laufenden Programme oft größer. Die Lösung heißt <strong>virtueller Speicher</strong>: Jeder Prozess bekommt einen eigenen, zusammenhängend wirkenden Adressraum, der in Wahrheit auf verstreute Bereiche des RAM und auf die Platte abgebildet wird.</p>'+
        '<p>Die Abbildung erfolgt in Blöcken fester Größe, den <strong>Seiten</strong> (Pages, meist 4 KiB). Eine <strong>Seitentabelle</strong> übersetzt virtuelle in physische Adressen; die Hardware-Einheit dafür heißt <strong>MMU</strong> (Memory Management Unit).</p>'+
        '<p><strong>Die drei Vorteile</strong>, nach denen gefragt wird:</p>'+
        '<ol><li><strong>Mehr Speicher nutzbar, als physisch vorhanden ist</strong> — selten gebrauchte Seiten wandern in die <strong>Auslagerungsdatei</strong> (Windows: pagefile.sys; Linux: Swap-Partition).</li>'+
        '<li><strong>Isolation</strong> — kein Prozess kann den Speicher eines anderen lesen, weil er dessen Adressen gar nicht abbilden kann. Das ist ein zentrales Sicherheitsmerkmal.</li>'+
        '<li><strong>Kein Fragmentierungsproblem</strong> — der Speicher muss physisch nicht am Stück frei sein.</li></ol>'+
        '<p>Wird eine Seite angefordert, die gerade nicht im RAM liegt, entsteht ein <strong>Seitenfehler</strong> (Page Fault): Das Betriebssystem holt sie von der Platte nach. Das ist normal — kritisch wird es erst, wenn es <em>ständig</em> passiert.</p>'+
        '<p><strong>Thrashing</strong> ist genau dieser Zustand: Das System verbringt mehr Zeit mit Ein- und Auslagern als mit Rechnen. Symptom im Alltag — die Festplattenanzeige leuchtet dauerhaft, der Rechner reagiert kaum noch, die CPU-Auslastung ist aber niedrig. Die Ursache ist zu wenig Arbeitsspeicher, und die einzige wirksame Abhilfe ist mehr RAM oder weniger gleichzeitige Programme. Eine größere Auslagerungsdatei macht es <em>schlimmer</em>, nicht besser.</p>'+
        '<p>Dieses Symptombild ist eine dankbare Prüfungsfrage: Hohe CPU-Last deutet auf ein rechenintensives Programm, hohe Plattenaktivität bei <em>niedriger</em> CPU-Last dagegen auf Speichermangel.</p>',
      code:
        "VIRTUELL GEGEN PHYSISCH\n\n"+
        "  Prozess A sieht:   0x0000 ... 0xFFFF   (zusammenhaengend)\n"+
        "  Tatsaechlich liegt er:\n"+
        "     Seite 0  ->  RAM-Rahmen 42\n"+
        "     Seite 1  ->  RAM-Rahmen  7\n"+
        "     Seite 2  ->  ausgelagert auf die Platte\n"+
        "     Seite 3  ->  RAM-Rahmen 19\n\n"+
        "  Zugriff auf Seite 2 -> Seitenfehler -> nachladen\n\n"+
        "DIAGNOSE AM SYMPTOM\n\n"+
        "  CPU hoch, Platte ruhig    -> rechenintensives Programm\n"+
        "  CPU niedrig, Platte dauernd aktiv, System zaeh\n"+
        "                            -> Thrashing, zu wenig RAM\n"+
        "  CPU niedrig, Platte ruhig, System zaeh\n"+
        "                            -> Netz oder externer Dienst\n\n"+
        "  Merke: Mehr Auslagerungsdatei behebt Thrashing NICHT.\n"+
        "  Sie verlagert das Problem nur auf ein langsameres Medium.",
      codeLang:'Speicherverwaltung',
      tip:'Die Kombination „System ist zäh, Festplatte leuchtet dauerhaft, CPU-Auslastung aber niedrig" ist ein Standardfall in Störungsaufgaben. Die erwartete Antwort lautet Speichermangel mit Auslagerung, nicht ein defekter Datenträger. Und die Maßnahme ist Arbeitsspeicher aufrüsten — wer stattdessen die Auslagerungsdatei vergrößert, verschlimmert das Verhalten.',
      quiz:[
        {q:'Wozu dient der virtuelle Speicher unter anderem?', options:['Er beschleunigt die CPU','Er isoliert Prozesse voneinander','Er ersetzt den Cache'], correct:1, explain:'Zusätzlich macht er mehr Speicher nutzbar, als physisch vorhanden ist.'},
        {q:'Was beschreibt Thrashing?', options:['Das System lagert mehr aus und ein, als es rechnet','Die CPU wird zu heiß','Die Festplatte ist defekt'], correct:0, explain:'Typisch ist hohe Plattenaktivität bei niedriger CPU-Auslastung.'},
        {q:'Ein Rechner ist zäh, die Platte arbeitet dauernd, die CPU langweilt sich. Was hilft?', options:['Eine schnellere CPU','Mehr Arbeitsspeicher','Eine größere Auslagerungsdatei'], correct:1, explain:'Eine größere Auslagerungsdatei verlagert das Problem nur auf ein langsameres Medium.'}
      ]
    },
    {
      id:'m37-l4', title:'Vom Einschalten bis zum Desktop: BIOS, UEFI und Bootvorgang', minutes:9,
      body:
        '<p>Zwischen Einschaltknopf und Anmeldebildschirm liegt eine feste Kette von Schritten. Wer sie kennt, kann Startprobleme gezielt eingrenzen statt zu raten.</p>'+
        '<ol><li><strong>Firmware startet</strong> — BIOS oder UEFI liegt in einem Flash-Baustein auf dem Mainboard und ist damit nichtflüchtig.</li>'+
        '<li><strong>POST</strong> (Power-On Self-Test) — Selbsttest der Hardware: CPU, RAM, Grafik. Fehler werden hier über Signaltöne oder Codes gemeldet, <em>bevor</em> ein Bildschirmbild existiert.</li>'+
        '<li><strong>Bootmedium wählen</strong> — laut Bootreihenfolge.</li>'+
        '<li><strong>Bootloader laden</strong> — Windows Boot Manager oder GRUB.</li>'+
        '<li><strong>Kernel laden</strong>, Treiber initialisieren.</li>'+
        '<li><strong>Dienste starten</strong>, Anmeldung anzeigen.</li></ol>'+
        '<p><strong>BIOS gegen UEFI</strong> — der Vergleich wird direkt abgefragt:</p>'+
        '<table class="lesson-table"><tr><th></th><th>BIOS (alt)</th><th>UEFI (heute)</th></tr>'+
        '<tr><td>Partitionsschema</td><td>MBR</td><td>GPT</td></tr>'+
        '<tr><td>Maximale Startplatte</td><td><strong>2 TiB</strong></td><td>praktisch unbegrenzt</td></tr>'+
        '<tr><td>Partitionen</td><td>4 primäre</td><td>128 und mehr</td></tr>'+
        '<tr><td>Bedienung</td><td>Textmenü, Tastatur</td><td>Grafisch, Maus, Netzwerk</td></tr>'+
        '<tr><td>Sicherheit</td><td>keine</td><td><strong>Secure Boot</strong></td></tr>'+
        '<tr><td>Startzeit</td><td>langsamer</td><td>schneller</td></tr></table>'+
        '<p><strong>Secure Boot</strong> lässt nur signierte Bootloader zu und verhindert damit, dass sich Schadsoftware vor das Betriebssystem schiebt. Das erklärt zugleich, warum ein Rechner nicht von einem selbst erstellten Linux-Stick startet, solange Secure Boot aktiv ist — eine typische Praxisfrage.</p>'+
        '<p>Die Einstellungen werden im <strong>CMOS</strong> gespeichert und von einer <strong>Knopfzelle</strong> gepuffert. Ist sie leer, verliert der Rechner bei jedem Ausschalten Uhrzeit und Bootreihenfolge — das Symptom „falsches Datum nach jedem Start" hat genau diese Ursache und kostet keine zwei Euro Ersatzteil.</p>'+
        '<figure class="fig"><svg viewBox="0 0 560 200" role="img" aria-label="Bootvorgang in sechs Schritten mit typischen Fehlerbildern">'+
        '<rect class="s-accent" x="14" y="26" width="86" height="44" rx="5"/>'+
        '<text class="s-mono" x="57" y="46" text-anchor="middle">Firmware</text>'+
        '<text class="s-mono" x="57" y="62" text-anchor="middle">BIOS/UEFI</text>'+
        '<rect class="s-strong" x="108" y="26" width="76" height="44" rx="5"/>'+
        '<text class="s-mono" x="146" y="53" text-anchor="middle">POST</text>'+
        '<rect class="s-accent" x="192" y="26" width="96" height="44" rx="5"/>'+
        '<text class="s-mono" x="240" y="46" text-anchor="middle">Bootmedium</text>'+
        '<text class="s-mono" x="240" y="62" text-anchor="middle">waehlen</text>'+
        '<rect class="s-accent" x="296" y="26" width="86" height="44" rx="5"/>'+
        '<text class="s-mono" x="339" y="53" text-anchor="middle">Bootloader</text>'+
        '<rect class="s-accent" x="390" y="26" width="72" height="44" rx="5"/>'+
        '<text class="s-mono" x="426" y="53" text-anchor="middle">Kernel</text>'+
        '<rect class="s-ok" x="470" y="26" width="76" height="44" rx="5"/>'+
        '<text class="s-mono" x="508" y="46" text-anchor="middle">Dienste</text>'+
        '<text class="s-mono" x="508" y="62" text-anchor="middle">Anmeldung</text>'+
        '<line class="s-arrow" x1="100" y1="48" x2="106" y2="48" marker-end="url(#btp)"/>'+
        '<line class="s-arrow" x1="184" y1="48" x2="190" y2="48" marker-end="url(#btp)"/>'+
        '<line class="s-arrow" x1="288" y1="48" x2="294" y2="48" marker-end="url(#btp)"/>'+
        '<line class="s-arrow" x1="382" y1="48" x2="388" y2="48" marker-end="url(#btp)"/>'+
        '<line class="s-arrow" x1="462" y1="48" x2="468" y2="48" marker-end="url(#btp)"/>'+
        '<text class="s-hd" x="14" y="106">Wo bleibt der Start h&#228;ngen?</text>'+
        '<text class="s-lbl" x="14" y="128">Signalt&#246;ne, kein Bild &#8594; POST: RAM oder Grafik</text>'+
        '<text class="s-lbl" x="14" y="148">&#8222;No bootable device&#8220; &#8594; Bootreihenfolge oder Datentr&#228;ger</text>'+
        '<text class="s-lbl" x="14" y="168">Falsches Datum nach jedem Start &#8594; CMOS-Knopfzelle leer</text>'+
        '<text class="s-lbl" x="14" y="188">Stick startet nicht &#8594; Secure Boot aktiv</text>'+
        '<defs><marker id="btp" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'+
        '<path class="s-head2" d="M0 0 L9 4.5 L0 9 z"/></marker></defs>'+
        '</svg><figcaption>Jedes Fehlerbild zeigt auf eine bestimmte Stufe der Kette. Damit lässt sich ein Startproblem eingrenzen, ohne Teile zu tauschen.</figcaption></figure>',
      code:
        "STOERUNGSANALYSE AM BOOTVORGANG\n\n"+
        "  Symptom                        wahrscheinliche Stufe\n"+
        "  -----------------------------  ----------------------------\n"+
        "  Kein Luefter, keine LED        Netzteil oder Stromversorgung\n"+
        "  Luefter laeuft, kein Bild,\n"+
        "  Signaltoene                    POST: RAM oder Grafikkarte\n"+
        "  \"No bootable device found\"     Bootreihenfolge, Datentraeger\n"+
        "                                 nicht erkannt oder Kabel lose\n"+
        "  Bootloader-Menue, dann Fehler  Betriebssystem oder Treiber\n"+
        "  Anmeldung erscheint, dann\n"+
        "  Absturz                        Dienst oder Treiber\n"+
        "  Uhr steht nach jedem Aus       CMOS-Knopfzelle leer\n\n"+
        "VORGEHEN\n"+
        "  Immer von unten nach oben pruefen - genau wie beim\n"+
        "  OSI-Modell. Erst Strom, dann Hardware, dann Datentraeger,\n"+
        "  dann Betriebssystem. Nie mit dem Tauschen anfangen.",
      codeLang:'Bootvorgang',
      tip:'Die Parallele zur Netzwerkdiagnose ist kein Zufall und lohnt sich zu erwähnen: Auch beim Startvorgang arbeitet man sich von unten nach oben durch, weil jede Stufe auf der darunter aufbaut. Wer bei „kein Bild" sofort die Grafikkarte tauscht, hat die Stromversorgung und den POST übersprungen. Erst eingrenzen, dann handeln — das ist die Antwort, die Punkte bringt.',
      quiz:[
        {q:'Welche Aufgabe hat der POST?', options:['Er lädt das Betriebssystem','Er testet die Hardware vor dem Start','Er startet die Netzwerkdienste'], correct:1, explain:'Fehler werden über Signaltöne gemeldet, bevor überhaupt ein Bild existiert.'},
        {q:'Welches Partitionsschema gehört zu UEFI?', options:['MBR','GPT','FAT32'], correct:1, explain:'MBR gehört zum alten BIOS und begrenzt die Startplatte auf 2 TiB.'},
        {q:'Ein Rechner verliert nach jedem Ausschalten Uhrzeit und Bootreihenfolge. Was ist die Ursache?', options:['Die Festplatte ist defekt','Die CMOS-Knopfzelle ist leer','Das Netzteil ist zu schwach'], correct:1, explain:'Sie puffert die Firmware-Einstellungen und kostet als Ersatzteil kaum etwas.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m20', part:6, partTitle:'Projektmanagement & Wirtschaft', title:'Beschaffung & Kostenrechnung', relevanz:'hoch',
  lessons:[
    {
      id:'m20-l1', title:'Der Beschaffungsprozess und die ABC-Analyse', minutes:9,
      body:
        '<p>Wenn eine Aufgabe lautet „Beschreiben Sie die Schritte von der Bedarfsermittlung bis zur Bezahlung", ist immer dieselbe Kette gemeint:</p>'+
        '<ol><li><strong>Bedarfsermittlung</strong> – was wird gebraucht, in welcher Menge, bis wann?</li>'+
        '<li><strong>Bezugsquellenermittlung</strong> – welche Anbieter kommen infrage?</li>'+
        '<li><strong>Anfrage</strong> – unverbindlich, an mehrere Anbieter.</li>'+
        '<li><strong>Angebotsvergleich</strong> – quantitativ über den Bezugspreis, qualitativ über die Nutzwertanalyse.</li>'+
        '<li><strong>Bestellung</strong> – die verbindliche Willenserklärung des Käufers.</li>'+
        '<li><strong>Wareneingang</strong> – Prüfung gegen Lieferschein und Bestellung, Mängelrüge bei Abweichung.</li>'+
        '<li><strong>Rechnungsprüfung</strong> – sachlich (wurde geliefert?) und rechnerisch (stimmen die Zahlen?).</li>'+
        '<li><strong>Zahlung</strong> – unter Ausnutzung des Skontos, wenn wirtschaftlich sinnvoll.</li></ol>'+
        '<p>Die <strong>ABC-Analyse</strong> ordnet Beschaffungsgüter nach ihrem Wertanteil, damit die Aufmerksamkeit dorthin fließt, wo Geld liegt:</p>'+
        '<table class="lesson-table"><tr><th>Klasse</th><th>Wertanteil</th><th>Mengenanteil</th><th>Behandlung</th></tr>'+
        '<tr><td>A</td><td>ca. 70–80 %</td><td>ca. 10–20 %</td><td>sorgfältig planen, Angebote vergleichen, verhandeln</td></tr>'+
        '<tr><td>B</td><td>ca. 15–20 %</td><td>ca. 30 %</td><td>normale Beschaffung</td></tr>'+
        '<tr><td>C</td><td>ca. 5–10 %</td><td>ca. 50–70 %</td><td>vereinfacht, Sammelbestellung, Rahmenvertrag</td></tr></table>',
      code:
        "ABC-Analyse - so rechnest du sie:\n\n"+
        "  1. Je Position:  Jahresverbrauch x Preis = Jahreswert\n"+
        "  2. Absteigend nach Jahreswert sortieren\n"+
        "  3. Prozentanteil am Gesamtwert berechnen\n"+
        "  4. KUMULIEREN (aufsummieren)\n"+
        "  5. Klassengrenzen ziehen: bis 80 % = A, bis 95 % = B, Rest = C\n\n"+
        "Position   Jahreswert   Anteil   kumuliert   Klasse\n"+
        "  Server      42.000     60,0 %     60,0 %      A\n"+
        "  Notebooks   14.000     20,0 %     80,0 %      A\n"+
        "  Monitore     8.400     12,0 %     92,0 %      B\n"+
        "  Software     3.500      5,0 %     97,0 %      C\n"+
        "  Zubehoer     2.100      3,0 %    100,0 %      C\n"+
        "  --------------------------------\n"+
        "  Gesamt      70.000    100,0 %",
      codeLang:'ABC-Analyse',
      tip:'Der Schritt, der in Prüfungen am häufigsten vergessen wird, ist das Kumulieren. Ohne die aufsummierte Spalte lässt sich die Klassengrenze gar nicht ziehen, und die Aufgabe bleibt unvollständig. Und merke dir die Kernaussage hinter der Methode: Wenige A-Güter binden den Großteil des Kapitals, deshalb lohnt sich dort Verhandlungsaufwand — bei C-Gütern kostet die Beschaffung schnell mehr als das Gut selbst.',
      quiz:[
        {q:'Was kennzeichnet ein A-Gut?', options:['Hoher Mengenanteil, geringer Wertanteil','Hoher Wertanteil, geringer Mengenanteil','Beides gering'], correct:1, explain:'Wenige Positionen binden den Großteil des Beschaffungswerts.'},
        {q:'Welcher Rechenschritt entscheidet über die Klassengrenzen?', options:['Die Sortierung','Die kumulierte Prozentspalte','Der Einzelpreis'], correct:1, explain:'Erst die Aufsummierung zeigt, wo die 80-Prozent-Grenze liegt.'},
        {q:'Wie werden C-Güter üblicherweise beschafft?', options:['Mit intensiver Verhandlung','Vereinfacht über Sammelbestellung oder Rahmenvertrag','Gar nicht'], correct:1, explain:'Bei C-Gütern kostet der Beschaffungsvorgang oft mehr als das Gut selbst.'}
      ]
    },
    {
      id:'m20-l2', title:'Fixkosten, variable Kosten und Break-Even', minutes:10,
      body:
        '<p>Die Unterscheidung der Kostenarten ist die Grundlage jeder Wirtschaftlichkeitsrechnung:</p>'+
        '<ul><li><strong>Fixkosten (K<sub>f</sub>)</strong> fallen unabhängig von der Menge an: Miete, Abschreibung, Grundgebühr, Gehälter, Lizenz-Grundpaket.</li>'+
        '<li><strong>Variable Kosten (k<sub>v</sub> je Stück)</strong> steigen mit der Menge: Material, Strom pro Gerät, Lizenz pro Benutzer, Papier und Toner je Seite.</li></ul>'+
        '<p><strong>Die Formeln:</strong></p>'+
        '<table class="lesson-table"><tr><th>Größe</th><th>Formel</th></tr>'+
        '<tr><td>Gesamtkosten</td><td>K = K<sub>f</sub> + k<sub>v</sub> · x</td></tr>'+
        '<tr><td>Stückkosten</td><td>k = K / x</td></tr>'+
        '<tr><td>Deckungsbeitrag je Stück</td><td>db = Preis − k<sub>v</sub></td></tr>'+
        '<tr><td>Break-Even-Menge</td><td>x = K<sub>f</sub> / (Preis − k<sub>v</sub>)</td></tr></table>'+
        '<p>Der <strong>Deckungsbeitrag</strong> ist der Betrag, der nach Abzug der variablen Kosten übrig bleibt, um die Fixkosten zu decken. Erst wenn die Summe aller Deckungsbeiträge die Fixkosten erreicht, ist der <strong>Break-Even-Point</strong> überschritten und es entsteht Gewinn.</p>'+
        '<p>Bei einem <strong>Verfahrensvergleich</strong> (zwei Varianten mit unterschiedlichen Fix- und variablen Kosten) suchst du die <strong>kritische Menge</strong>, bei der beide gleich teuer sind — darunter lohnt die Variante mit niedrigen Fixkosten, darüber die mit niedrigen variablen Kosten.</p>',
      code:
        "BREAK-EVEN\n"+
        "  Fixkosten 24.000 EUR, Verkaufspreis 80 EUR, variable Kosten 50 EUR\n"+
        "  db = 80 - 50 = 30 EUR je Stueck\n"+
        "  x  = 24.000 / 30 = 800 Stueck\n"+
        "  Ab dem 801. Stueck entsteht Gewinn.\n\n"+
        "VERFAHRENSVERGLEICH (kritische Menge)\n"+
        "  Variante A (Eigenbetrieb): Kf = 12.000, kv = 4 EUR/Vorgang\n"+
        "  Variante B (Dienstleister): Kf =  2.000, kv = 9 EUR/Vorgang\n\n"+
        "  Gleichsetzen:  12.000 + 4x = 2.000 + 9x\n"+
        "                 10.000      = 5x\n"+
        "                 x           = 2.000 Vorgaenge\n\n"+
        "  Bis 2.000 Vorgaenge ist B guenstiger, darueber A.",
      codeLang:'Kostenrechnung',
      tip:'Beim Verfahrensvergleich lautet die Antwort nie nur die Zahl. Gefragt ist immer auch die Empfehlung mit Richtung — welche Variante unterhalb und welche oberhalb der kritischen Menge günstiger ist. Prüfe das mit einer Beispielmenge gegen: Setze 1.000 und 3.000 ein, dann siehst du sofort, welche Seite zu welcher Variante gehört, und verwechselst die Richtung nicht.',
      quiz:[
        {q:'Wie berechnet man den Deckungsbeitrag je Stück?', options:['Preis minus Gesamtkosten','Preis minus variable Stückkosten','Preis minus Fixkosten'], correct:1, explain:'Der Deckungsbeitrag deckt anschließend die Fixkosten.'},
        {q:'Fixkosten 15.000 €, db 25 € je Stück. Wo liegt der Break-Even?', options:['375 Stück','600 Stück','1.500 Stück'], correct:1, explain:'15.000 / 25 = 600 Stück.'},
        {q:'Welche Kosten steigen mit der produzierten Menge?', options:['Fixkosten','Variable Kosten','Beide gleichermaßen'], correct:1, explain:'Die Fixkosten bleiben unabhängig von der Menge konstant.'}
      ]
    },
    {
      id:'m20-l3', title:'Abschreibung, TCO und Kostenvergleich', minutes:9,
      body:
        '<p>Ein Gerät wird nicht im Anschaffungsjahr voll als Kosten verbucht, sondern über seine <strong>Nutzungsdauer</strong> verteilt. Das ist die <strong>Abschreibung (AfA)</strong>.</p>'+
        '<p><strong>Lineare Abschreibung</strong> – der Standard in der AP1:</p>'+
        '<p><code>jährliche AfA = (Anschaffungswert − Restwert) / Nutzungsdauer</code></p>'+
        '<p>Der <strong>Buchwert</strong> sinkt jedes Jahr um diesen Betrag. Die betriebsgewöhnliche Nutzungsdauer steht in den AfA-Tabellen; für PCs und Notebooks sind es nach aktueller Verwaltungsauffassung <strong>drei Jahre</strong>, oft wird auch die Sofortabschreibung genutzt.</p>'+
        '<p><strong>TCO – Total Cost of Ownership.</strong> Der Anschaffungspreis ist nur ein Teil der Wahrheit. In den Vergleich gehören:</p>'+
        '<ul><li><strong>Einmalig:</strong> Anschaffung, Installation, Migration, Schulung.</li>'+
        '<li><strong>Laufend:</strong> Lizenzen, Wartung, Support, Strom, Verbrauchsmaterial, Administrationsaufwand.</li>'+
        '<li><strong>Am Ende:</strong> Entsorgung oder Restwert.</li></ul>'+
        '<p>Genau deshalb kann das teurere Gerät das günstigere sein — der Klassiker ist der Drucker mit niedrigem Kaufpreis und hohem Seitenpreis.</p>',
      code:
        "ABSCHREIBUNG\n"+
        "  Server 9.000 EUR, Nutzungsdauer 5 Jahre, Restwert 0\n"+
        "  AfA = 9.000 / 5 = 1.800 EUR pro Jahr\n\n"+
        "  Jahr 1: Buchwert 7.200   Jahr 3: 3.600   Jahr 5: 0\n\n"+
        "TCO-VERGLEICH ZWEIER DRUCKER ueber 4 Jahre, 30.000 Seiten/Jahr\n\n"+
        "                        Tinte        Laser\n"+
        "  Anschaffung            120 EUR     680 EUR\n"+
        "  Seitenpreis           0,09 EUR    0,021 EUR\n"+
        "  Seiten gesamt        120.000     120.000\n"+
        "  Verbrauchsmaterial  10.800 EUR   2.520 EUR\n"+
        "  Strom (ca.)             40 EUR     110 EUR\n"+
        "  ----------------------------------------------\n"+
        "  TCO 4 Jahre         10.960 EUR   3.310 EUR\n\n"+
        "  Der Laserdrucker kostet in der Anschaffung das 5,7-Fache,\n"+
        "  ueber die Nutzungsdauer aber nur ein Drittel.",
      codeLang:'TCO-Rechnung',
      tip:'Wenn eine Aufgabe zwei Geräte vergleicht und einen Seitenpreis oder Verbrauch je Einheit nennt, ist das der Hinweis auf eine TCO-Rechnung — nicht auf einen Preisvergleich. Rechne dann immer über den genannten Zeitraum und die genannte Menge, und schreibe den Betrachtungszeitraum in die Antwort. Ohne ihn ist die Aussage „Gerät B ist günstiger" wertlos, weil sie erst ab einer bestimmten Nutzungsdauer stimmt.',
      quiz:[
        {q:'Ein Gerät kostet 12.000 €, Nutzungsdauer 4 Jahre, Restwert 0. Wie hoch ist die lineare AfA?',options:['4.000 €','3.000 €','12.000 €'], correct:1, explain:'12.000 / 4 = 3.000 € pro Jahr.'},
        {q:'Was gehört NICHT in eine TCO-Betrachtung?', options:['Schulungskosten','Der Listenpreis eines Konkurrenzprodukts','Die Entsorgungskosten'], correct:1, explain:'TCO betrachtet alle Kosten des eigenen Geräts über den Lebenszyklus.'},
        {q:'Warum kann der teurere Drucker der günstigere sein?', options:['Er ist schneller','Weil über die Nutzungsdauer der Seitenpreis die Gesamtkosten dominiert','Er hat mehr Garantie'], correct:1, explain:'Genau das ist der Kern einer TCO-Betrachtung.'}
      ]
    },
    {
      id:'m20-l4', title:'Kennzahlen: Produktivität, Wirtschaftlichkeit, Rentabilität', minutes:8,
      body:
        '<p>Drei Kennzahlen werden gern verwechselt, obwohl sie ganz unterschiedliche Fragen beantworten:</p>'+
        '<table class="lesson-table"><tr><th>Kennzahl</th><th>Formel</th><th>Frage</th></tr>'+
        '<tr><td><strong>Produktivität</strong></td><td>Ausbringungsmenge / Einsatzmenge</td><td>Wie viel kommt je Einheit heraus? (mengenmäßig)</td></tr>'+
        '<tr><td><strong>Wirtschaftlichkeit</strong></td><td>Ertrag / Aufwand</td><td>Lohnt es sich? (wertmäßig, > 1 ist gut)</td></tr>'+
        '<tr><td><strong>Rentabilität</strong></td><td>Gewinn / Kapital × 100 %</td><td>Wie verzinst sich das eingesetzte Kapital?</td></tr>'+
        '<tr><td><strong>ROI</strong></td><td>Gewinn / Investition × 100 %</td><td>Was bringt genau diese Investition?</td></tr></table>'+
        '<p>Der Unterschied in einem Satz: <strong>Produktivität ist mengenmäßig, Wirtschaftlichkeit wertmäßig, Rentabilität bezieht sich auf das Kapital.</strong></p>'+
        '<p>Weitere Kennzahlen, die in AP1-Aufgaben auftauchen: <strong>Auslastungsgrad</strong> (Ist-Leistung / Soll-Leistung), <strong>Fehlerquote</strong>, <strong>Erstlösungsquote</strong> im Support und die <strong>Verfügbarkeit</strong> aus Modul 15.</p>',
      code:
        "Ein Support-Team loest mit 4 Mitarbeitern 640 Tickets im Monat.\n"+
        "Personalkosten 18.000 EUR, verrechneter Ertrag 27.000 EUR.\n\n"+
        "  Produktivitaet    = 640 / 4          = 160 Tickets je Mitarbeiter\n"+
        "  Wirtschaftlichkeit= 27.000 / 18.000  = 1,5   (> 1 -> wirtschaftlich)\n"+
        "  Gewinn            = 27.000 - 18.000  = 9.000 EUR\n\n"+
        "Eine Automatisierung kostet 30.000 EUR und spart 9.000 EUR im Jahr:\n"+
        "  ROI (Jahr 1)      = 9.000 / 30.000 x 100 = 30 %\n"+
        "  Amortisation      = 30.000 / 9.000       = 3,3 Jahre",
      codeLang:'Kennzahlen',
      tip:'Achte auf die Einheiten in der Aufgabenstellung, denn sie verraten die gesuchte Kennzahl. Stehen dort Stückzahlen oder Tickets, ist Produktivität gemeint. Stehen dort Euro auf beiden Seiten, ist es Wirtschaftlichkeit — und das Ergebnis ist dimensionslos, ein Wert über 1 bedeutet wirtschaftlich. Steht ein Kapital- oder Investitionsbetrag im Nenner, ist es Rentabilität oder ROI, und die Antwort gehört in Prozent.',
      quiz:[
        {q:'Ertrag 44.000 €, Aufwand 40.000 €. Wie hoch ist die Wirtschaftlichkeit?', options:['1,1','4.000','10 %'], correct:0, explain:'44.000 / 40.000 = 1,1 – ein Wert über 1 bedeutet wirtschaftlich.'},
        {q:'Welche Kennzahl ist rein mengenmäßig?', options:['Rentabilität','Produktivität','Wirtschaftlichkeit'], correct:1, explain:'Ausbringungsmenge geteilt durch Einsatzmenge – ohne Geldbeträge.'},
        {q:'Eine Wirtschaftlichkeit von 0,9 bedeutet was?', options:['Sehr gut','Unwirtschaftlich — der Aufwand übersteigt den Ertrag','90 % Gewinn'], correct:1, explain:'Erst ein Wert über 1 bedeutet wirtschaftliches Arbeiten.'}
      ]
    }
  ]
});
MODULES.push({
  id:'m21', part:7, partTitle:'IT-Grundlagen, Hardware & Arbeitsplatz', title:'Hardware-Komponenten', relevanz:'hoch',
  lessons:[
    {
      id:'m21-l1', title:'CPU, Arbeitsspeicher und Mainboard', minutes:10,
      body:
        '<p>Bei „Begründen Sie die Auswahl der Komponenten" musst du Kennwerte nennen <em>und</em> sagen, warum sie zum Einsatzzweck passen.</p>'+
        '<p><strong>Prozessor (CPU):</strong></p>'+
        '<ul><li><strong>Kerne</strong> arbeiten echt parallel. <strong>Threads</strong> sind logische Kerne durch Hyperthreading — sie bringen etwa 20 bis 30 Prozent, nicht das Doppelte.</li>'+
        '<li><strong>Taktfrequenz</strong> in GHz zählt bei Programmen, die nur einen Kern nutzen. Viele Kerne helfen bei Virtualisierung, Kompilieren, Rendering und Datenbanken.</li>'+
        '<li><strong>Cache</strong> (L1 bis L3) ist schneller Zwischenspeicher direkt in der CPU und puffert den langsamen RAM-Zugriff ab.</li>'+
        '<li><strong>TDP</strong> ist die abzuführende Verlustleistung — relevant für Kühlung und Netzteil.</li></ul>'+
        '<p><strong>Arbeitsspeicher (RAM):</strong> flüchtig, verliert den Inhalt beim Ausschalten. Typen <strong>DDR4</strong> und <strong>DDR5</strong> sind zueinander <em>nicht</em> kompatibel — unterschiedliche Kerbe und Spannung. <strong>Dual Channel</strong> verdoppelt die Anbindung, deshalb zwei gleiche Riegel statt einem großen. <strong>ECC</strong>-RAM erkennt und korrigiert Bitfehler und gehört in Server.</p>'+
        '<p><strong>Mainboard:</strong> Der <strong>Sockel</strong> muss zur CPU passen, der <strong>Chipsatz</strong> bestimmt die verfügbaren Funktionen. Formfaktoren: ATX (voll), µATX (kompakt), Mini-ITX (sehr klein).</p>',
      code:
        "Typische Begruendung in der Pruefung:\n\n"+
        "  Einsatz: Entwickler-Arbeitsplatz mit lokalen VMs und Container\n\n"+
        "  CPU  8 Kerne / 16 Threads  weil mehrere VMs gleichzeitig laufen\n"+
        "                             und Kompiliervorgaenge parallelisieren\n"+
        "  RAM  32 GB DDR5, 2 x 16 GB weil jede VM eigenen Speicher belegt;\n"+
        "                             zwei Riegel wegen Dual Channel\n"+
        "  SSD  1 TB NVMe             weil Build- und Datenbankzugriffe\n"+
        "                             stark von der Zugriffszeit profitieren\n"+
        "  GPU  integriert            weil keine 3D-Last anfaellt - spart\n"+
        "                             Anschaffung und Stromkosten",
      codeLang:'Komponentenauswahl',
      tip:'Die Formulierung entscheidet über den Punkt. „32 GB RAM" allein ist eine Angabe, keine Begründung. „32 GB RAM, weil pro virtueller Maschine 8 GB reserviert werden und drei VMs parallel laufen sollen" ist eine. Nimm dir für jede Komponente den Satzbau vor: Kennwert, dann „weil", dann der konkrete Bezug zum geschilderten Arbeitsplatz.',
      quiz:[
        {q:'Warum baut man zwei RAM-Riegel statt eines doppelt so großen ein?', options:['Weil es billiger ist','Wegen Dual Channel – die Speicheranbindung verdoppelt sich','Weil ein Riegel nicht erlaubt ist'], correct:1, explain:'Zwei identische Riegel in den richtigen Bänken nutzen beide Speicherkanäle.'},
        {q:'Wofür wird ECC-RAM eingesetzt?', options:['Für Gaming-PCs','In Servern, weil er Bitfehler erkennt und korrigiert','Für Notebooks, weil er Strom spart'], correct:1, explain:'Datenintegrität im Dauerbetrieb ist im Server wichtiger als der Aufpreis.'},
        {q:'Was bewirkt Dual Channel beim Arbeitsspeicher?', options:['Doppelte Kapazität','Verdoppelte Speicheranbindung durch zwei parallele Kanäle','Weniger Stromverbrauch'], correct:1, explain:'Deshalb zwei gleiche Riegel statt eines großen — in den richtigen Bänken.'}
      ]
    },
    {
      id:'m21-l2', title:'Massenspeicher: HDD, SSD und NVMe', minutes:9,
      body:
        '<p><strong>HDD</strong> – rotierende Magnetscheiben mit beweglichem Schreib-Lese-Kopf. Kennwerte: Umdrehungszahl (5.400 / 7.200 / 10.000 U/min) und die <strong>Zugriffszeit</strong> von etwa 5 bis 10 Millisekunden. Günstig je Terabyte, mechanisch anfällig, laut, langsam bei vielen kleinen Zugriffen.</p>'+
        '<p><strong>SSD</strong> – Flash-Speicher ohne bewegliche Teile. Zugriffszeit unter 0,1 Millisekunden, also rund <strong>hundertmal schneller</strong>. Robust, leise, stromsparend, teurer je Terabyte. Kennwert <strong>TBW</strong> (Terabytes Written) gibt die Schreiblebensdauer an.</p>'+
        '<table class="lesson-table"><tr><th>Anbindung</th><th>Bauform</th><th>Bruttorate</th></tr>'+
        '<tr><td>SATA III</td><td>2,5 Zoll oder M.2</td><td>6 Gbit/s (ca. 550 MB/s netto)</td></tr>'+
        '<tr><td>NVMe über PCIe 3.0 ×4</td><td>M.2</td><td>ca. 32 Gbit/s (ca. 3.500 MB/s)</td></tr>'+
        '<tr><td>NVMe über PCIe 4.0 ×4</td><td>M.2</td><td>ca. 64 Gbit/s (ca. 7.000 MB/s)</td></tr></table>'+
        '<p><strong>Der wichtigste Merksatz:</strong> M.2 ist nur die <em>Bauform</em>, NVMe das <em>Protokoll</em>. Eine M.2-SSD kann intern über SATA laufen und ist dann nicht schneller als eine 2,5-Zoll-SSD.</p>'+
        '<p>Bei der <strong>Kapazitätsplanung</strong> rechnest du Nutzdaten plus Betriebssystem plus Reserve. Für SSDs gilt: Ab etwa 80 Prozent Füllstand sinkt die Schreibleistung, plane deshalb Luft ein.</p>',
      code:
        "Uebertragungsdauer vergleichen - 40 GB kopieren:\n\n"+
        "  HDD      ca. 150 MB/s :  40.000 MB / 150  = 267 s  = 4 min 27 s\n"+
        "  SATA-SSD ca. 520 MB/s :  40.000 MB / 520  =  77 s  = 1 min 17 s\n"+
        "  NVMe     ca. 3.000 MB/s: 40.000 MB / 3000 =  13 s\n\n"+
        "Hinweis: 40 GB = 40.000 MB (dezimal). Beim Kopieren begrenzt\n"+
        "immer das langsamere der beiden Laufwerke.",
      codeLang:'Speicherrechnung',
      tip:'Achte bei Datenblattangaben auf die Einheit, denn Hersteller mischen sie bewusst. Schnittstellen werden in Gigabit pro Sekunde angegeben, Lese- und Schreibraten in Megabyte pro Sekunde. SATA III hat 6 Gbit/s brutto, was nach Abzug des Protokoll-Overheads etwa 550 MB/s netto ergibt — der Faktor 8 plus rund 20 Prozent Overhead. Wer das verwechselt, rechnet um den Faktor acht daneben.',
      quiz:[
        {q:'Was bezeichnet M.2?', options:['Ein Übertragungsprotokoll','Eine Bauform bzw. einen Steckplatz','Eine Kapazitätsangabe'], correct:1, explain:'Das Protokoll ist SATA oder NVMe – erst NVMe bringt die hohe Geschwindigkeit.'},
        {q:'Welcher Kennwert beschreibt die Schreiblebensdauer einer SSD?', options:['IOPS','TBW','RPM'], correct:1, explain:'Terabytes Written – RPM gibt es nur bei der HDD.'},
        {q:'Was gibt der TBW-Wert einer SSD an?', options:['Die Lesegeschwindigkeit','Die Schreiblebensdauer in Terabytes Written','Die Kapazität'], correct:1, explain:'HDDs haben dafür die Umdrehungszahl als Kennwert.'}
      ]
    },
    {
      id:'m21-l3', title:'Schnittstellen und ihre Datenraten', minutes:9,
      body:
        '<p>Bei „Welche Schnittstelle wählen Sie und warum?" brauchst du Zahlen. Die wichtigsten:</p>'+
        '<table class="lesson-table"><tr><th>Schnittstelle</th><th>Datenrate</th><th>Einsatz</th></tr>'+
        '<tr><td>USB 2.0</td><td>480 Mbit/s</td><td>Tastatur, Maus, Drucker</td></tr>'+
        '<tr><td>USB 3.2 Gen 1 (früher 3.0)</td><td>5 Gbit/s</td><td>externe Festplatten</td></tr>'+
        '<tr><td>USB 3.2 Gen 2</td><td>10 Gbit/s</td><td>schnelle externe SSD</td></tr>'+
        '<tr><td>USB4 / Thunderbolt 4</td><td>40 Gbit/s</td><td>Docking, externe GPU, Monitor</td></tr>'+
        '<tr><td>HDMI 2.1</td><td>48 Gbit/s</td><td>4K/120 Hz, 8K</td></tr>'+
        '<tr><td>DisplayPort 1.4</td><td>32,4 Gbit/s</td><td>Mehrschirmbetrieb, Daisy Chain</td></tr>'+
        '<tr><td>RJ45 Gigabit-Ethernet</td><td>1 Gbit/s</td><td>LAN-Standard</td></tr>'+
        '<tr><td>RJ45 10-Gigabit</td><td>10 Gbit/s</td><td>Server, Backbone</td></tr></table>'+
        '<p><strong>Power Delivery</strong> über USB-C liefert bis 100 W (nach neuer Spezifikation bis 240 W) und erlaubt damit das Laden des Notebooks über dasselbe Kabel, das auch Monitor und Netzwerk anbindet — das ist das Argument für eine <strong>Dockingstation mit USB-C</strong>.</p>',
      code:
        "Externe SSD mit 40 GB Daten sichern:\n\n"+
        "  USB 2.0  (480 Mbit/s):\n"+
        "     40 GB x 8 = 320 Gbit = 320.000 Mbit\n"+
        "     320.000 / 480 = 667 s = 11 min 7 s\n\n"+
        "  USB 3.2 Gen 1 (5 Gbit/s):\n"+
        "     320.000 / 5.000 = 64 s = 1 min 4 s\n\n"+
        "  Praxis: Die SSD selbst begrenzt bei ca. 500 MB/s auf ca. 80 s.\n"+
        "  Es gilt immer das langsamste Glied der Kette.",
      codeLang:'Schnittstellenrechnung',
      tip:'Der Satz vom langsamsten Glied ist in Prüfungsantworten mehr wert als jede Datenrate. Eine 10-Gigabit-Schnittstelle bringt nichts, wenn die Festplatte dahinter 150 MB/s schafft, und ein NVMe-Laufwerk nichts, wenn es über USB 2.0 angebunden ist. Wenn eine Aufgabe eine Kette aus Gerät, Kabel und Gegenstelle beschreibt, suche das Nadelöhr und benenne es ausdrücklich.',
      quiz:[
        {q:'Wie schnell ist USB 3.2 Gen 1?', options:['480 Mbit/s','5 Gbit/s','40 Gbit/s'], correct:1, explain:'Früher als USB 3.0 bezeichnet – USB 2.0 hat 480 Mbit/s.'},
        {q:'Was ermöglicht USB-C Power Delivery an einer Dockingstation?', options:['Höhere Datenrate','Stromversorgung des Notebooks über dasselbe Kabel','Bessere Bildqualität'], correct:1, explain:'Bis 100 W, damit genügt ein Kabel für Strom, Bild, Netzwerk und Peripherie.'},
        {q:'Was begrenzt die Geschwindigkeit einer Übertragungskette?', options:['Die schnellste Komponente','Die langsamste Komponente','Die Kabellänge'], correct:1, explain:'Eine NVMe-SSD an USB 2.0 ist nicht schneller als USB 2.0.'}
      ]
    },
    {
      id:'m21-l4', title:'Monitor und Drucker richtig auswählen', minutes:9,
      body:
        '<p><strong>Monitor</strong> – die Kennwerte und was sie bedeuten:</p>'+
        '<ul><li><strong>Auflösung:</strong> Full HD 1920×1080 · WQHD 2560×1440 · 4K UHD 3840×2160. Die Pixelzahl ist das Produkt: 1920 · 1080 = 2.073.600 Pixel.</li>'+
        '<li><strong>Seitenverhältnis:</strong> 16:9 Standard, 21:9 Ultrawide, 16:10 mit mehr vertikalem Platz für Text und Code.</li>'+
        '<li><strong>Panel:</strong> <strong>IPS</strong> hat gute Blickwinkel und Farbtreue (Büro, Bildbearbeitung), <strong>TN</strong> ist schnell aber blickwinkelabhängig, <strong>VA</strong> bietet hohen Kontrast.</li>'+
        '<li><strong>Ergonomie:</strong> höhenverstellbar, neigbar, drehbar, entspiegelt, Blaulichtfilter — genau das wird bei Arbeitsplatzaufgaben erwartet.</li></ul>'+
        '<p><strong>Drucker</strong> – die Entscheidung fällt fast immer über den <strong>Seitenpreis</strong>, nicht über den Kaufpreis:</p>'+
        '<table class="lesson-table"><tr><th></th><th>Tintenstrahl</th><th>Laser</th></tr>'+
        '<tr><td>Anschaffung</td><td>niedrig</td><td>höher</td></tr>'+
        '<tr><td>Seitenpreis s/w</td><td>hoch (ca. 4–10 ct)</td><td>niedrig (ca. 1–3 ct)</td></tr>'+
        '<tr><td>Geschwindigkeit</td><td>gering</td><td>hoch</td></tr>'+
        '<tr><td>Bei seltener Nutzung</td><td>Düsen trocknen ein</td><td>unproblematisch</td></tr>'+
        '<tr><td>Fotodruck</td><td>sehr gut</td><td>mäßig</td></tr>'+
        '<tr><td>Empfehlung</td><td>wenig Volumen, Farbfotos</td><td>Büro, hohes Volumen</td></tr></table>',
      code:
        "Pixelzahl und Speicherbedarf eines Bildschirminhalts:\n\n"+
        "  4K UHD: 3840 x 2160 = 8.294.400 Pixel\n"+
        "  Farbtiefe 24 Bit (True Color) = 3 Byte je Pixel\n"+
        "  8.294.400 x 3 = 24.883.200 Byte = ca. 23,7 MiB je Vollbild\n\n"+
        "  Bei 60 Hz unkomprimiert:\n"+
        "  23,7 MiB x 60 = ca. 1.424 MiB/s = ca. 11,9 Gbit/s\n"+
        "  -> deshalb reicht HDMI 1.4 (10,2 Gbit/s) nicht fuer 4K/60,\n"+
        "     wohl aber DisplayPort 1.4 oder HDMI 2.0.",
      codeLang:'Anzeigerechnung',
      tip:'Die Rechnung Pixel mal Farbtiefe taucht in zwei Verkleidungen auf: als Speicherbedarf eines Bildes und als benötigte Bandbreite einer Anzeigeverbindung. Beide Male ist der Rechenweg identisch, nur die Frage am Ende unterscheidet sich. Merke dir 24 Bit gleich 3 Byte für True Color — und dass 32 Bit vier Byte sind, weil ein Alphakanal für Transparenz hinzukommt.',
      quiz:[
        {q:'Wie viele Pixel hat ein Full-HD-Bildschirm?', options:['1.920','2.073.600','8.294.400'], correct:1, explain:'1920 × 1080 – 4K hat mit 8.294.400 genau die vierfache Menge.'},
        {q:'Welcher Drucker eignet sich für ein Büro mit 2.500 Seiten im Monat?', options:['Tintenstrahl, wegen des niedrigen Kaufpreises','Laser, wegen des niedrigen Seitenpreises und der Geschwindigkeit','Beide gleich gut'], correct:1, explain:'Bei hohem Volumen dominiert der Seitenpreis die Gesamtkosten.'},
        {q:'Wie viel Speicher braucht ein Full-HD-Vollbild bei 24 Bit Farbtiefe?', options:['Etwa 2 MiB','Etwa 6 MiB','Etwa 24 MiB'], correct:1, explain:'1920 × 1080 × 3 Byte = 6.220.800 Byte, also rund 5,9 MiB.'}
      ]
    },
    {
      id:'m21-l5', title:'Netzteil, Leistungsbedarf und USV', minutes:9,
      body:
        '<p>Bei „Dimensionieren Sie das Netzteil" addierst du den Leistungsbedarf aller Komponenten und schlägst eine <strong>Reserve</strong> auf — üblich sind 20 bis 30 Prozent. Gründe für die Reserve: Lastspitzen, spätere Aufrüstung und der Umstand, dass Netzteile im Bereich von etwa 50 Prozent Auslastung den besten Wirkungsgrad haben.</p>'+
        '<p><strong>80 PLUS</strong> zertifiziert den Wirkungsgrad: Bronze etwa 85 Prozent, Gold etwa 90 Prozent, Platinum etwa 92 Prozent. Die Differenz wird als Wärme abgegeben und muss weggekühlt werden.</p>'+
        '<p><strong>USV-Dimensionierung</strong> – hier lauert eine Einheitenfalle. USV-Geräte werden in <strong>Voltampere (VA)</strong> angegeben, Verbraucher in <strong>Watt (W)</strong>. Der Zusammenhang ist der <strong>Leistungsfaktor</strong>:</p>'+
        '<p><code>W = VA × Leistungsfaktor</code> (häufig 0,6 bis 0,9)</p>'+
        '<p>Eine USV mit 1.500 VA und Faktor 0,6 liefert also nur 900 W. Die drei Bauarten:</p>'+
        '<ul><li><strong>Offline / Standby</strong> – schaltet erst bei Ausfall um, kurze Unterbrechung, günstig, für Einzelplätze.</li>'+
        '<li><strong>Line-interactive</strong> – gleicht zusätzlich Spannungsschwankungen aus.</li>'+
        '<li><strong>Online / Dauerwandler</strong> – der Verbraucher hängt immer am Wechselrichter, absolut unterbrechungsfrei, für Server und Netzwerktechnik.</li></ul>',
      code:
        "NETZTEIL DIMENSIONIEREN\n"+
        "  CPU (TDP)            125 W\n"+
        "  Grafikkarte          220 W\n"+
        "  Mainboard + RAM       60 W\n"+
        "  2 x NVMe-SSD          16 W\n"+
        "  Luefter, Peripherie   25 W\n"+
        "  ------------------------\n"+
        "  Summe                446 W\n"+
        "  + 25 % Reserve       112 W\n"+
        "  ------------------------\n"+
        "  Empfehlung        ca. 560 W  ->  600-W-Netzteil, 80 PLUS Gold\n\n"+
        "USV FUER EINEN SERVERSCHRANK\n"+
        "  Server 2 x 350 W + Switch 60 W + NAS 90 W = 850 W\n"+
        "  Leistungsfaktor 0,7:  850 / 0,7 = 1.214 VA\n"+
        "  + Reserve         ->  mindestens 1.500 VA waehlen",
      codeLang:'Leistungsberechnung',
      tip:'Die Umrechnung zwischen Watt und Voltampere ist eine klassische Fangfrage. Du teilst durch den Leistungsfaktor, wenn du von Watt auf VA kommen willst, und multiplizierst in die andere Richtung. Wer eine 1.000-VA-USV für 1.000 W Last kauft, hat sie überlastet — sie schafft je nach Faktor nur 600 bis 900 W. Nenne in der Antwort außerdem den zweiten Zweck der USV: Sie überbrückt nicht nur, sie fährt die Server bei längerem Ausfall kontrolliert herunter.',
      quiz:[
        {q:'Eine USV hat 2.000 VA bei einem Leistungsfaktor von 0,8. Wie viel Watt liefert sie?', options:['2.500 W','1.600 W','2.000 W'], correct:1, explain:'2.000 × 0,8 = 1.600 W.'},
        {q:'Warum plant man beim Netzteil 20–30 % Reserve ein?', options:['Aus Vorschrift','Wegen Lastspitzen, Aufrüstbarkeit und dem besten Wirkungsgrad bei mittlerer Last','Damit es leiser ist'], correct:1, explain:'Ein dauerhaft voll ausgelastetes Netzteil arbeitet ineffizient und altert schneller.'},
        {q:'Warum arbeitet ein Netzteil bei etwa halber Auslastung am effizientesten?', options:['Es wird dann kälter','Dort liegt das Wirkungsgradmaximum der Schaltnetzteile','Das ist ein Mythos'], correct:1, explain:'Deshalb plant man 20 bis 30 Prozent Reserve statt knapp zu dimensionieren.'}
      ]
    }
  ]
});
