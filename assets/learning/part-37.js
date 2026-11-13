function renderKalibrierung(){
  var stufen = KONF_STUFEN.filter(function(st){ return kalibQuote(st.k) !== null; });
  if(!stufen.length) return '';
  var h = '<h2 class="sec-h">Selbsteinschätzung</h2>';
  h += '<p class="intro-sub">Wie gut deckt sich dein Gefühl mit dem Ergebnis? '+
       'Die erste Zeile ist die wichtige: Wer sich sicher ist und daneben liegt, merkt den Fehler sonst erst in der Prüfung.</p>';
  stufen.forEach(function(st){
    var e = state.kalib[st.k];
    var q = Math.round((e.r / e.n) * 100);
    var col = st.k === 'sicher'
      ? (q >= 90 ? 'var(--success)' : q >= 75 ? 'var(--accent2)' : 'var(--danger)')
      : 'var(--accent)';
    h += '<div class="topic-bar-row"><span class="tname">'+st.t+'</span>'+
         '<div class="topic-bar"><div style="width:'+q+'%;background:'+col+';"></div></div>'+
         '<span class="tval">'+q+'% · '+e.n+'</span></div>';
  });
  var qs = kalibQuote('sicher');
  if(qs !== null && qs < 0.9){
    h += '<div class="ex-panel" style="margin-top:12px;"><strong>Dein blinder Fleck:</strong> '+
         'Bei „Sicher" liegst du in '+Math.round((1-qs)*100)+' % der Fälle falsch. '+
         'Solange dieser Wert über 10 % liegt, ist dein Gefühl für den eigenen Wissensstand noch nicht geeicht — '+
         'geh die betroffenen Karten im Fehlerheft noch einmal durch.</div>';
  }
  return h;
}
var LF_TITEL = {
  1:'Das Unternehmen und die eigene Rolle',
  2:'Arbeitsplätze ausstatten',
  3:'Clients in Netzwerke einbinden',
  4:'Schutzbedarfsanalyse durchführen',
  5:'Software zur Datenverwaltung anpassen',
  6:'Serviceanfragen bearbeiten'
};
var LERNFELDER = {
  m17:1, m18:1, m20:1,
  m19:2, m21:2, m22:2, m23:2, m24:2,
  m31:3, m11:3, m12:3, m13:3, m14:3,
  m15:4, m16:4, m32:4, m33:4,
  m1:5, m2:5, m3:5, m4:5, m5:5, m6:5, m7:5,
  m34:5, m35:5, m8:5, m9:5, m10:5,
  m25:6, m26:6, m27:6,
  m28:0, m29:0, m30:0
};
var lfFilter = 0;
function lfVon(mid){ return LERNFELDER[mid] || 0; }
function lfBadge(mid){
  var n = lfVon(mid);
  return '<span class="lf-tag'+(n ? '' : ' quer')+'" title="'+(n ? esc(LF_TITEL[n]) : 'Kein Lernfeld der Ordnung von 2020')+'">'+
         (n ? 'LF ' + n : 'übergreifend')+'</span>';
}
function setzeLf(n){
  lfFilter = (lfFilter === n) ? 0 : n;
  renderContent();
}
function lfFilterZeile(){
  var h = '<div class="lf-leiste"><span class="lf-frage">Nach Lernfeld der Berufsschule:</span><div class="filter-row" style="margin:0;">';
  h += '<button class="filter-btn'+(lfFilter === 0 ? ' active' : '')+'" onclick="setzeLf(0)">Alle</button>';
  [1,2,3,4,5,6].forEach(function(n){
    var anz = MODULES.filter(function(m){ return lfVon(m.id) === n; }).length;
    h += '<button class="filter-btn'+(lfFilter === n ? ' active' : '')+'" onclick="setzeLf('+n+')" '+
         'title="'+esc(LF_TITEL[n])+'">LF '+n+' <span class="lf-anz">'+anz+'</span></button>';
  });
  h += '</div></div>';
  if(lfFilter){
    h += '<div class="lf-info"><strong>Lernfeld '+lfFilter+':</strong> '+esc(LF_TITEL[lfFilter])+'. '+
         'Lernfeld 1 bis 6 werden laut Rahmenlehrplan vor der AP1 unterrichtet.</div>';
  }
  return h;
}
var rechtTab = 'impressum';
function setzeRecht(t){ rechtTab = t; renderContent(); }
function luecke(was){
  return '<mark class="luecke">' + esc(was) + '</mark>';
}
function renderRecht(){
  var h = '<div class="breadcrumb">Rechtliches</div><h1>Impressum, Datenschutz &amp; Nutzung</h1>';
  h += '<div class="recht-warnung"><strong>Ger&uuml;st, kein fertiger Rechtstext.</strong> '+
       'Alle gelb markierten Stellen musst du ausf&uuml;llen. Vor einer Ver&ouml;ffentlichung '+
       'oder einem Verkauf geh&ouml;rt das Ergebnis einmal juristisch gepr&uuml;ft &mdash; '+
       'besonders die Widerrufsbelehrung f&uuml;r digitale Inhalte.</div>';

  h += '<div class="filter-row">';
  [['impressum','Impressum'],['datenschutz','Datenschutz'],['nutzung','Nutzungsbedingungen'],['ueber','&Uuml;ber']]
    .forEach(function(t){
      h += '<button class="filter-btn'+(rechtTab === t[0] ? ' active' : '')+'" type="button" '+
           'onclick="setzeRecht(\''+t[0]+'\')">'+t[1]+'</button>';
    });
  h += '</div>';

  if(rechtTab === 'impressum'){
    h += '<div class="recht-text">';
    h += '<h2 class="sec-h">Angaben gem&auml;&szlig; &sect; 5 DDG</h2>';
    h += '<p>'+luecke('Vor- und Nachname bzw. Firma')+'<br>'+
         luecke('Stra&szlig;e und Hausnummer')+'<br>'+
         luecke('PLZ und Ort')+'<br>'+luecke('Land')+'</p>';
    h += '<h2 class="sec-h">Kontakt</h2>';
    h += '<p>E-Mail: '+luecke('adresse@deine-domain.de')+'<br>'+
         'Telefon: '+luecke('optional, aber f&uuml;r schnellen Kontakt empfohlen')+'</p>';
    h += '<h2 class="sec-h">Weitere Pflichtangaben</h2>';
    h += '<ul><li>Umsatzsteuer-Identifikationsnummer: '+luecke('falls vorhanden')+' &mdash; '+
         'als Kleinunternehmer nach &sect; 19 UStG stattdessen den entsprechenden Hinweis</li>'+
         '<li>Registereintrag: '+luecke('nur bei eingetragenen Unternehmen')+'</li>'+
         '<li>Verantwortlich f&uuml;r den Inhalt: '+luecke('Name und Anschrift')+'</li></ul>';
    h += '<h2 class="sec-h">Streitbeilegung</h2>';
    h += '<p>Zur Teilnahme an einem Streitbeilegungsverfahren vor einer '+
         'Verbraucherschlichtungsstelle '+luecke('bereit / nicht bereit')+'.</p>';
    h += '</div>';
  }

  if(rechtTab === 'datenschutz'){
    h += '<div class="recht-text">';
    h += '<h2 class="sec-h">Verantwortlicher</h2>';
    h += '<p>'+luecke('Name und vollst&auml;ndige Anschrift, E-Mail')+'</p>';
    h += '<h2 class="sec-h">Was diese Anwendung speichert</h2>';
    h += '<p>Das ist der ehrliche Teil &mdash; er stimmt bereits und beschreibt, '+
         'was der Kurs tats&auml;chlich tut:</p>';
    h += '<table class="lesson-table"><tr><th>Daten</th><th>Wo</th><th>Zweck</th><th>Dauer</th></tr>'+
      '<tr><td>Lernfortschritt, Notizen, Pr&uuml;fungsergebnisse</td><td>ausschlie&szlig;lich im '+
      '<strong>localStorage deines Browsers</strong></td><td>Fortschritt &uuml;ber Sitzungen hinweg halten'+
      '</td><td>bis du ihn l&ouml;schst</td></tr>'+
      '<tr><td>dieselben Daten</td><td>optional im Konto-Speicher der Plattform, wenn der '+
      'Ger&auml;teabgleich aktiv ist</td><td>Abgleich zwischen deinen Ger&auml;ten</td><td>bis zur '+
      'L&ouml;schung</td></tr>'+
      '<tr><td>Fragen an den Tutor</td><td>werden an den konfigurierten KI-Dienst &uuml;bertragen'+
      '</td><td>Beantwortung deiner Frage</td><td>nach den Regeln des Anbieters</td></tr>'+
      '<tr><td>Schriftarten</td><td>werden vom eigenen Server ausgeliefert (selbst gehostet, keine Anfrage an Dritte)</td><td>Darstellung</td>'+
      '<td>&mdash;</td></tr>'+
      '<tr><td>Eingebettete Videos</td><td>erst nach deinem Klick auf &bdquo;Video laden&ldquo; von '+
      '<strong>youtube-nocookie.com</strong> (YouTube/Google) geladen; dabei wird u.&nbsp;a. deine IP-Adresse '+
      '&uuml;bertragen</td><td>Video in der Lektion abspielen</td><td>nach den Regeln des Anbieters</td></tr></table>';
    h += '<p><strong>Kein Tracking, keine Werbung, keine Analysewerkzeuge.</strong> '+
         'Es werden keine Cookies zu Werbezwecken gesetzt.</p>';
    h += '<h2 class="sec-h">Noch auszuf&uuml;llen</h2>';
    h += '<ul>'+
      '<li>Rechtsgrundlage je Verarbeitung nach Art. 6 DSGVO: '+luecke('in der Regel Vertragserf&uuml;llung bzw. berechtigtes Interesse')+'</li>'+
      '<li>Eingesetzter KI-Dienstleister mit Sitz und Auftragsverarbeitungsvertrag: '+luecke('Anbieter benennen')+'</li>'+
      '<li>Hoster und dessen Serverstandort: '+luecke('Anbieter benennen')+'</li>'+
      '<li>&Uuml;bermittlung in Drittl&auml;nder und deren Grundlage: '+luecke('falls zutreffend')+'</li>'+
      '<li>Eingebettete YouTube-Videos: Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, &sect; 25 TDDDG), Anbieter und Drittlandbezug (Google) benennen. '+luecke('rechtlich pr&uuml;fen lassen')+'</li>'+
      '<li>Kontakt der Datenschutzaufsicht deines Bundeslandes: '+luecke('Beh&ouml;rde nennen')+'</li>'+
      '</ul>';
    h += '<h2 class="sec-h">Deine Rechte</h2>';
    h += '<p>Auskunft (Art. 15), Berichtigung (16), L&ouml;schung (17), Einschr&auml;nkung (18), '+
         'Daten&uuml;bertragbarkeit (20), Widerspruch (21) sowie Beschwerde bei einer Aufsichtsbeh&ouml;rde.</p>';
    h += '<p>Deinen lokal gespeicherten Stand kannst du jederzeit selbst ausgeben lassen oder '+
         'l&ouml;schen &mdash; beides findest du im Profil.</p>';
    h += '</div>';
  }

  if(rechtTab === 'nutzung'){
    h += '<div class="recht-text">';
    h += '<h2 class="sec-h">Gegenstand</h2>';
    h += '<p>&Uuml;berlassen wird ein digitaler Lernkurs zur Vorbereitung auf die '+
         'Abschlusspr&uuml;fung Teil 1 der IT-Berufe. '+luecke('Lizenzumfang festlegen: eine Person, ein Haushalt, Firmenlizenz?')+'</p>';
    h += '<h2 class="sec-h">Was ausdr&uuml;cklich nicht zugesichert wird</h2>';
    h += '<ul><li>Der Kurs bereitet auf die Pr&uuml;fung vor, <strong>garantiert aber kein Bestehen</strong>.</li>'+
         '<li>Es besteht keine Verbindung zur IHK oder einer anderen Pr&uuml;fungsorganisation und '+
         'keine Zusammenarbeit mit ihr.</li>'+
         '<li>Inhalte bilden den Stand von '+luecke('Datum')+' ab; Pr&uuml;fungsordnungen k&ouml;nnen sich &auml;ndern.</li></ul>';
    h += '<h2 class="sec-h">Widerrufsrecht bei digitalen Inhalten</h2>';
    h += '<p>Der wichtigste und am h&auml;ufigsten falsch gemachte Punkt beim Verkauf digitaler Inhalte '+
         'an Verbraucher: Das Widerrufsrecht erlischt nur, wenn der K&auml;ufer <em>vor</em> Beginn der '+
         'Ausf&uuml;hrung ausdr&uuml;cklich zugestimmt <em>und</em> seine Kenntnis vom Erl&ouml;schen '+
         'best&auml;tigt hat und du ihm das best&auml;tigst (&sect; 356 Abs. 5 BGB). Ohne diese doppelte '+
         'Zustimmung bleibt das vierzehnt&auml;gige Widerrufsrecht bestehen.</p>';
    h += '<p>'+luecke('Vollst&auml;ndige Widerrufsbelehrung und Muster-Widerrufsformular einf&uuml;gen')+'</p>';
    h += '<h2 class="sec-h">Preis, Zahlung, Nutzungsrechte</h2>';
    h += '<ul><li>Preis und Umsatzsteuerausweis: '+luecke('Betrag, brutto, ggf. Hinweis nach &sect; 19 UStG')+'</li>'+
         '<li>Zahlungsdienstleister: '+luecke('Anbieter benennen')+'</li>'+
         '<li>Weitergabe, Vervielf&auml;ltigung und &ouml;ffentliche Zug&auml;nglichmachung sind '+
         'nicht gestattet.</li>'+
         '<li>Gerichtsstand und anwendbares Recht: '+luecke('festlegen')+'</li></ul>';
    h += '</div>';
  }

  if(rechtTab === 'ueber'){
    var lekt = TOTAL, mod = MODULES.length;
    h += '<div class="recht-text">';
    h += '<h2 class="sec-h">&Uuml;ber diese Ausgabe</h2>';
    h += '<table class="lesson-table">'+
      '<tr><td>Version</td><td><strong>'+VERSION+'</strong> vom '+VERSION_DATUM+'</td></tr>'+
      '<tr><td>Umfang</td><td>'+mod+' Module, '+lekt+' Lektionen, '+EXERCISES.length+' &Uuml;bungsaufgaben</td></tr>'+
      '<tr><td>Abfragen</td><td>'+CARDS.length+' Karteikarten, '+TRACES.length+' Trockendurchl&auml;ufe</td></tr>'+
      '<tr><td>Referenz</td><td>'+DIAGRAMME+' Diagramme, Formelblatt mit vielen Abschnitten</td></tr>'+
      '<tr><td>Tutor</td><td>'+esc(kiHerkunftText())+'</td></tr>'+
      '</table>';
    h += '<h2 class="sec-h">Wo deine Daten liegen</h2>';
    h += '<p>Der gesamte Lernstand liegt im Browser dieses Ger&auml;ts. Es gibt keinen Zwang zu einem '+
         'Konto. Im Profil kannst du deinen Stand als Text ausgeben, auf ein anderes Ger&auml;t '+
         '&uuml;bertragen oder vollst&auml;ndig l&ouml;schen.</p>';
    h += '<h2 class="sec-h">Betrieb auf eigenem Server</h2>';
    h += '<p>Die Seite ist eine einzelne HTML-Datei ohne Installationsbedarf. Sie l&auml;uft von jedem '+
         'Webserver und auch direkt von der Festplatte. Lediglich der Tutor braucht einen Dienst &mdash; '+
         'dessen Adresse tr&auml;gst du im Profil unter <em>Tutor-Verbindung</em> ein.</p>';
    h += '</div>';
  }
  return h;
}
function startHinweisWeg(){
  try{ localStorage.setItem('rootpfad-start', '1'); }catch(e){}
  renderContent();
}
function zeigeStartHinweis(){
  if(state.completed.size > 0) return false;
  try{ return localStorage.getItem('rootpfad-start') !== '1'; }catch(e){ return true; }
}
function renderStartHinweis(){
  if(!zeigeStartHinweis()) return '';
  var h = '<div class="start-box">';
  h += '<div class="start-kopf"><strong>Erste Schritte</strong>'+
       '<button class="ex-btn" type="button" onclick="startHinweisWeg()">Verstanden</button></div>';
  h += '<p class="start-text">Vier Dinge, und du bist eingerichtet:</p>';
  h += '<ol class="start-liste">'+
    '<li><strong>Pr&uuml;fungstermin eintragen.</strong> Dann rechnet dir der Lernplan aus, '+
    'welches Modul bis wann sitzen muss. Steht im Profil.</li>'+
    '<li><strong>Mit dem ersten Modul beginnen.</strong> Die Reihenfolge ist als Weg gedacht &mdash; '+
    'jede Lektion dauert acht bis elf Minuten.</li>'+
    '<li><strong>T&auml;glich wiederholen.</strong> Jede beantwortete Quizfrage wird zur Karteikarte '+
    'und kommt im richtigen Abstand zur&uuml;ck. Das ist der Teil, der wirklich wirkt.</li>'+
    '<li><strong>Vor der Pr&uuml;fung simulieren.</strong> Vierzig Fragen in neunzig Minuten, '+
    'danach die Mitschreib-Pr&uuml;fung mit offenen Aufgaben.</li>'+
    '</ol>';
  h += '<p class="start-fuss"><kbd>Strg</kbd>+<kbd>K</kbd> &ouml;ffnet die Befehlssuche, '+
       '<kbd>?</kbd> zeigt alle K&uuml;rzel.</p>';
  h += '</div>';
  return h;
}
function renderHeute(){
  var ziel     = state.tagesziel || 3;
  var geschafft= heuteGeschafft();
  var quote    = Math.min(1, geschafft / ziel);
  var U        = 2 * Math.PI * 44;
  var voll     = geschafft >= ziel;

  var faellig  = dueCards().length;
  var offen    = MODULES.filter(function(m){ return m.part < 10; }).reduce(function(a, m){ return a + m.lessons.filter(function(l){ return !state.completed.has(l.id); }).length; }, 0);   /* nur AP1-Teile */
  var naechste = FLAT.find(function(l){ return !state.completed.has(l.id); }) || FLAT[0];
  var nMod     = moduleOfLesson(naechste.id);
  var tage     = typeof rpAP1Context === 'function' && !rpAP1Context() ? null : pruefungsTage();
  var schwach  = weakModules();

  var std = new Date().getHours();
  var gruss = std < 5 ? 'Noch wach?' : std < 11 ? 'Guten Morgen.' : std < 14 ? 'Mahlzeit.' :
              std < 18 ? 'Guten Nachmittag.' : std < 22 ? 'Guten Abend.' : 'Späte Runde.';
  var wt = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'][new Date().getDay()];
  var dstr = wt + ', ' + new Date().toLocaleDateString('de-DE', { day:'2-digit', month:'long', year:'numeric' });

  var h = '<div class="heute-kopf">'+
    '<div><div class="heute-gruss">'+gruss+'</div>'+
    '<div class="heute-datum">'+esc(dstr)+'</div></div>'+
    '<div class="ring-wrap">'+
      '<div class="ziel-ring"><svg viewBox="0 0 100 100" aria-hidden="true">'+
        '<circle class="bahn" cx="50" cy="50" r="44"/>'+
        '<circle class="fort'+(voll?' voll':'')+'" cx="50" cy="50" r="44" '+
          'stroke-dasharray="'+U.toFixed(1)+'" stroke-dashoffset="'+(U*(1-quote)).toFixed(1)+'"/>'+
        '</svg>'+
        '<div class="ring-mitte"><span class="ring-zahl">'+geschafft+'/'+ziel+'</span>'+
        '<span class="ring-unter">heute</span></div></div>'+
      '<div class="ring-text"><strong>'+(voll ? 'Tagesziel geschafft.' : 'Tagesziel')+'</strong>'+
      '<span>'+(voll
        ? 'Alles Weitere ist Zugabe. Die Wiederholung lohnt trotzdem.'
        : 'Noch ' + (ziel - geschafft) + ' ' + (ziel - geschafft === 1 ? 'Lektion' : 'Lektionen') +
          '. Kleine Portionen täglich schlagen lange Sitzungen.')+'</span></div>'+
    '</div></div>';

  if(tage !== null){
    var proTag = tage > 0 ? Math.ceil(offen / tage) : offen;
    var lage = tage < 0
      ? 'Der Termin liegt hinter dir. Setz im Profil einen neuen, falls du weiterlernst.'
      : tage === 0
        ? '<b>Heute ist es so weit.</b> Geh das Formelblatt durch und sonst nichts mehr.'
        : offen === 0
          ? '<b>Du bist durch.</b> Jetzt zählen Wiederholung und Prüfungssimulationen.'
          : 'Noch <b>'+offen+'</b> offene Lektionen. Das sind <b>'+proTag+'</b> pro Tag — '+
            (proTag <= (state.tagesziel||3) ? 'dein Tagesziel reicht dafür aus.'
                                            : 'etwas mehr als dein aktuelles Tagesziel.');
    h += '<div class="pruef-leiste"><span class="tage">'+(tage < 0 ? '—' : tage)+'</span>'+
         '<span class="txt">'+(tage < 0 ? '' : '<b>Tage bis zur AP1.</b> ')+lage+'</span></div>';
  }

  h += '<div class="heute-raster">';

  h += '<button class="hk" onclick="selectLesson(\''+esc(naechste.id)+'\')">'+
    '<span class="hk-oben">Weiterlernen</span>'+
    '<span class="hk-titel">'+esc(naechste.title)+'</span>'+
    '<span class="hk-text">'+esc(nMod ? nMod.title : '')+' · ca. '+naechste.minutes+' Min.</span>'+
    '</button>';

  h += '<button class="hk" onclick="selectLesson(\'review\')">'+
    '<span class="hk-oben">Wiederholung</span>'+
    '<span class="hk-zahl'+(faellig > 0 ? ' warn' : ' gut')+'">'+faellig+'</span>'+
    '<span class="hk-text">'+(faellig > 0
      ? 'Karten sind heute fällig. Genau jetzt sitzt die Wiederholung am besten.'
      : 'Nichts fällig. Dein Gedächtnis hat gerade frei.')+'</span></button>';

  var completed = typeof rpCompleted === 'function' ? rpCompleted() : state.completed.size;
  var proz = Math.round(completed / TOTAL * 100);
  h += '<div class="hk still"><span class="hk-oben">Kursfortschritt</span>'+
    '<span class="hk-zahl">'+proz+'%</span>'+
    '<div class="hk-balken"><i style="width:'+proz+'%"></i></div>'+
    '<span class="hk-text">'+completed+' von '+TOTAL+' Lektionen abgeschlossen.</span></div>';

  if(schwach && schwach.length){
    var w = schwach[0];
    h += '<button class="hk" onclick="selectLesson(\'profile\')">'+
      '<span class="hk-oben">Schwachstelle</span>'+
      '<span class="hk-titel">'+esc(w.title)+'</span>'+
      '<span class="hk-text">'+Math.round(w.rate * 100)+' % Trefferquote. Dort lohnt sich die nächste halbe Stunde am meisten.</span>'+
      '</button>';
  } else {
    h += '<button class="hk" onclick="selectLesson(\'subnet\')">'+
      '<span class="hk-oben">Trainieren</span>'+
      '<span class="hk-titel">Subnetting-Trainer</span>'+
      '<span class="hk-text">Unbegrenzt viele Aufgaben. Kein Thema der AP1 belohnt Wiederholung so zuverlässig.</span>'+
      '</button>';
  }

  h += '</div>';

  h += renderStartHinweis();
  h += renderLernplan();

  h += '<h2 class="sec-h">Schnellzugriff</h2>';
  h += '<div class="heute-raster">'+
    '<button class="hk" onclick="selectLesson(\'exam\')"><span class="hk-oben">Prüfung</span>'+
      '<span class="hk-titel">Simulator starten</span>'+
      '<span class="hk-text">40 Fragen in 90 Minuten — Umfang und Zeitdruck der echten AP1.</span></button>'+
    '<button class="hk" onclick="selectLesson(\'klausur\')"><span class="hk-oben">Klausur</span>'+
      '<span class="hk-titel">Frei schreiben statt ankreuzen</span>'+
      '<span class="hk-text">Offene Aufgaben mit Zeit, danach eine Bewertung mit Punkten.</span></button>'+
    '<button class="hk" onclick="selectLesson(\'tutor\')"><span class="hk-oben">Tutor</span>'+
      '<span class="hk-titel">Etwas nicht verstanden?</span>'+
      '<span class="hk-text">Frag nach. Der Tutor kennt jede Lektion dieses Kurses.</span></button>'+
    '<button class="hk" onclick="selectLesson(\'cheatsheet\')"><span class="hk-oben">Formelblatt</span>'+
      '<span class="hk-titel">Alle Formeln auf einen Blick</span>'+
      '<span class="hk-text">Netzplan, Subnetting, Kalkulation, Einheiten, Prüfungstaktik.</span></button>'+
    '<button class="hk" onclick="selectLesson(\'intro\')"><span class="hk-oben">Übersicht</span>'+
      '<span class="hk-titel">'+MODULES.length+' Module</span>'+
      '<span class="hk-text">Der ganze Kurs nach Teilen sortiert, mit Prüfungsrelevanz.</span></button>'+
    '</div>';

  h += '<div class="ex-panel" style="margin-top:22px;"><strong>Tastatur:</strong> '+
       '<kbd>Strg</kbd>+<kbd>K</kbd> öffnet die Befehlssuche, <kbd>F</kbd> den Lesemodus, '+
       '<kbd>?</kbd> zeigt alle Kürzel. Die Befehlssuche findet Lektionen, Aufgaben <em>und</em> Aktionen.</div>';

  return h;
}
var kp = { offen:false, treffer:[], aktiv:0 };
var KP_AKTIONEN = [
  { t:'Heute', s:'Startseite', a:function(){ selectLesson('heute'); }, k:'heute start dashboard uebersicht' },
  { t:'Wiederholung starten', s:'Karteikarten', a:function(){ selectLesson('review'); }, k:'wiederholung karten srs lernen' },
  { t:'Prüfung simulieren', s:'40 Fragen, 90 Min.', a:function(){ selectLesson('exam'); }, k:'pruefung simulator test klausur' },
  { t:'Subnetting-Trainer', s:'Zufallsaufgaben', a:function(){ selectLesson('subnet'); }, k:'subnetting subnetz ip maske trainer rechnen' },
  { t:'AP1-Tutor fragen', s:'Chat', a:function(){ selectLesson('tutor'); }, k:'tutor chat frage hilfe erklaeren' },
  { t:'Algorithmus-Trainer', s:'Trockendurchläufe', a:function(){ selectLesson('tracer'); }, k:'trockenlauf algorithmus tracer wertetabelle' },
  { t:'Übungsaufgaben', s:EXERCISES.length+' Aufgaben', a:function(){ selectLesson('exercises'); }, k:'uebung aufgaben praxis loesung' },
  { t:'Formelblatt', s:'Alle Formeln', a:function(){ selectLesson('cheatsheet'); }, k:'formelblatt spickzettel formeln referenz' },
  { t:'Syntax-Glossar', s:'Befehle nachschlagen', a:function(){ selectLesson('glossar'); }, k:'syntax glossar befehle nachschlagen referenz let const array join git sql java php abap' },
  { t:'Modulübersicht', s:'Alle Teile', a:function(){ selectLesson('intro'); }, k:'module uebersicht inhalt kapitel' },
  { t:'Profil und Abzeichen', s:'Fortschritt', a:function(){ selectLesson('profile'); }, k:'profil abzeichen xp fortschritt statistik einstellungen' },
  { t:'Mitschreib-Prüfung', s:'Offene Aufgaben', a:function(){ selectLesson('klausur'); }, k:'klausur mitschreiben schreiben offen freitext korrektur bewerten' },
  { t:'Fehlerheft', s:'Verhauene Fragen', a:function(){ selectLesson('fehler'); }, k:'fehler fehlerheft falsch verhauen schwach' },
  { t:'Merkzettel', s:'Markiert und notiert', a:function(){ selectLesson('merk'); }, k:'merkzettel notizen markiert lesezeichen stern' },
  { t:'Lesemodus umschalten', s:'Taste F', a:function(){ fokusUmschalten(); }, k:'lesemodus fokus konzentration ablenkung' },
  { t:'Tastaturkürzel anzeigen', s:'Taste ?', a:function(){ selectLesson('tasten'); }, k:'tastatur kuerzel shortcuts hilfe' },
  { t:'Impressum & Datenschutz', s:'Rechtliches', a:function(){ selectLesson('recht'); }, k:'impressum datenschutz recht agb widerruf lizenz version ueber' }
];
function kpOeffnen(){
  if(kp.offen) return;
  if(!indexFertig) buildIndex();   /* Volltextindex erst bauen, wenn er gebraucht wird */
  kp.offen = true; kp.aktiv = 0;
  kp.vorher = document.activeElement;   /* Fokus spaeter zurueckgeben */
  var g = document.createElement('div');
  g.className = 'kp-grund';
  g.id = 'kpGrund';
  g.innerHTML =
    '<div class="kp" role="dialog" aria-modal="true" aria-label="Befehlssuche">'+
      '<div class="kp-kopf">'+
        '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>'+
        '<input class="kp-feld" id="kpFeld" placeholder="Lektion, Aufgabe oder Befehl …" autocomplete="off" spellcheck="false">'+
        '<span class="kp-esc">Esc</span>'+
      '</div>'+
      '<div class="kp-liste" id="kpListe"></div>'+
      '<div class="kp-fuss"><span><kbd>↑</kbd><kbd>↓</kbd> wählen</span>'+
      '<span><kbd>Enter</kbd> öffnen</span><span><kbd>Esc</kbd> schließen</span></div>'+
    '</div>';
  g.onclick = function(ev){ if(ev.target === g) kpSchliessen(); };
  /* Tab bleibt im Dialog; Escape schliesst auch, wenn der Fokus die Liste erreicht hat. */
  g.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape'){ ev.preventDefault(); kpSchliessen(); return; }
    fokusFalle(g, ev);
  });
  document.body.appendChild(g);
  var f = document.getElementById('kpFeld');
  f.oninput = function(){ kpSuchen(f.value); };
  f.onkeydown = kpTaste;
  kpSuchen('');
  f.focus();
}
function kpSchliessen(){
  var g = document.getElementById('kpGrund');
  if(g) g.remove();
  kp.offen = false;
  try{ if(kp.vorher && kp.vorher.focus) kp.vorher.focus(); }catch(e){}
  kp.vorher = null;
}
function kpSuchen(q){
  var n = (q || '').trim().toLowerCase();
  var res = [];

  KP_AKTIONEN.forEach(function(a){
    if(!n || a.t.toLowerCase().indexOf(n) >= 0 || a.k.indexOf(n) >= 0)
      res.push({ art:'Aktion', t:a.t, s:a.s, run:a.a });
  });

  if(n.length >= 2){
    SEARCH_INDEX.forEach(function(e){
      if(res.length > 40) return;
      if((e.hay || (e.title + ' ' + (e.sub || '')).toLowerCase()).indexOf(n) >= 0){
        res.push({ art: e.kind === 'lesson' ? 'Lektion' : e.kind === 'exercise' ? 'Aufgabe' : 'Inhalt',
                   t:e.title, s:e.sub || '', run:(function(id){ return function(){ selectLesson(id); }; })(e.id) });
      }
    });
  }

  kp.treffer = res.slice(0, 40);
  kp.aktiv = 0;
  kpZeichnen();
}
function kpZeichnen(){
  var l = document.getElementById('kpListe');
  if(!l) return;
  if(!kp.treffer.length){
    l.innerHTML = '<div class="kp-leer">Nichts gefunden. Versuch einen anderen Begriff.</div>';
    return;
  }
  var h = '', letzte = '';
  kp.treffer.forEach(function(r, i){
    if(r.art !== letzte){ h += '<div class="kp-gruppe">'+esc(r.art)+'</div>'; letzte = r.art; }
    h += '<button class="kp-eintrag'+(i === kp.aktiv ? ' aktiv' : '')+'" data-i="'+i+'">'+
         '<span class="kp-marke">'+(r.art === 'Aktion' ? '›' : '·')+'</span>'+
         '<span>'+esc(r.t)+'</span>'+
         (r.s ? '<span class="kp-sub">'+esc(r.s)+'</span>' : '')+
         '</button>';
  });
  l.innerHTML = h;
  Array.prototype.forEach.call(l.querySelectorAll('.kp-eintrag'), function(b){
    b.onclick = function(){ kpAusfuehren(parseInt(b.getAttribute('data-i'), 10)); };
  });
  var a = l.querySelector('.kp-eintrag.aktiv');
  if(a) a.scrollIntoView({ block:'nearest' });
}
function kpAusfuehren(i){
  var r = kp.treffer[i];
  if(!r) return;
  kpSchliessen();
  r.run();
}
function kpTaste(ev){
  if(ev.key === 'Escape'){ ev.preventDefault(); kpSchliessen(); return; }
  if(ev.key === 'ArrowDown'){ ev.preventDefault(); kp.aktiv = Math.min(kp.aktiv + 1, kp.treffer.length - 1); kpZeichnen(); return; }
  if(ev.key === 'ArrowUp'){ ev.preventDefault(); kp.aktiv = Math.max(kp.aktiv - 1, 0); kpZeichnen(); return; }
  if(ev.key === 'Enter'){ ev.preventDefault(); kpAusfuehren(kp.aktiv); return; }
}
function renderTasten(){
  var paare = [
    ['Strg + K', 'Befehlssuche öffnen'],
    ['F', 'Lesemodus ein und aus'],
    ['?', 'Diese Übersicht'],
    ['G dann H', 'Zur Heute-Ansicht'],
    ['G dann W', 'Zur Wiederholung'],
    ['G dann P', 'Zur Prüfungssimulation'],
    ['G dann T', 'Zum Tutor'],
    ['G dann S', 'Zum Subnetting-Trainer'],
    ['→ / ←', 'Nächste / vorige Lektion'],
    ['1 – 4', 'Karte bewerten: nochmal, schwer, gut, leicht'],
    ['Leertaste', 'Karte als gewusst bewerten'],
    ['Esc', 'Dialog schließen']
  ];
  var h = '<div class="breadcrumb">Bedienung</div><h1>Tastatur</h1>'+
    '<p class="intro-sub">Der Kurs lässt sich vollständig über die Tastatur bedienen. '+
    'Wer viel lernt, spart damit spürbar Zeit — vor allem die Befehlssuche ersetzt fast jede Mausbewegung.</p>'+
    '<div class="kb-grid">';
  paare.forEach(function(p){
    h += '<div class="kb-zeile"><kbd>'+esc(p[0])+'</kbd><span>'+esc(p[1])+'</span></div>';
  });
  h += '</div>';
  h += '<div class="ex-panel" style="margin-top:22px;"><strong>Zwei Griffe, die sich lohnen:</strong> '+
       '<kbd>Strg</kbd>+<kbd>K</kbd> und dann die ersten Buchstaben — du landest in jeder Lektion, '+
       'jeder Aufgabe und jedem Trainer, ohne durch die Seitenleiste zu scrollen. Und <kbd>F</kbd>, '+
       'wenn ein Kapitel länger wird: Die Navigation verschwindet, die Zeilen werden breiter und ruhiger.</div>';
  return h;
}
var gTaste = 0;
document.addEventListener('keydown', function(ev){
  var imFeld = /^(INPUT|TEXTAREA|SELECT)$/.test((ev.target && ev.target.tagName) || '');
  if((ev.ctrlKey || ev.metaKey) && (ev.key === 'k' || ev.key === 'K')){
    ev.preventDefault(); kp.offen ? kpSchliessen() : kpOeffnen(); return;
  }
  if(imFeld || ev.ctrlKey || ev.metaKey || ev.altKey) return;
  if(kp.offen) return;

  if(ev.key === '?'){ ev.preventDefault(); selectLesson('tasten'); return; }
  if(ev.key === 'f' || ev.key === 'F'){ ev.preventDefault(); fokusUmschalten(); return; }

  if(ev.key === 'g' || ev.key === 'G'){ gTaste = Date.now(); return; }
  if(Date.now() - gTaste < 1200){
    var zu = { h:'heute', w:'review', p:'exam', t:'tutor', s:'subnet', u:'intro', a:'exercises' }[ev.key.toLowerCase()];
    if(zu){ ev.preventDefault(); gTaste = 0; selectLesson(zu); return; }
  }
}, true);
function renderMobilbar(){
  var el = document.getElementById('mobilbar');
  if(!el) return;
  var faellig = dueCards().length;
  var eintraege = [
    ['heute',  'Heute',   'M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z'],
    ['review', 'Karten',  'M4 6h16v10H4zM8 20h8'],
    ['subnet', 'Subnetz', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
    ['tutor',  'Tutor',   'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
    ['intro',  'Kurs',    'M4 5h16M4 12h16M4 19h10']
  ];
  el.innerHTML = eintraege.map(function(e){
    var aktiv = state.currentId === e[0];
    return '<button class="mb'+(aktiv ? ' aktiv' : '')+'" onclick="selectLesson(\''+e[0]+'\')" aria-label="'+e[1]+'">'+
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+e[2]+'"/></svg>'+
      (e[0] === 'review' && faellig ? '<span class="punkt"></span>' : '')+
      '<span>'+e[1]+'</span></button>';
  }).join('');
}
var azFilter = 'alle';
function setzeAzFilter(w){ azFilter = w; renderContent(); }
function renderRangkarte(){
  var xp  = state.xp || 0;
  var lp  = levelProgress();
  var von = lp.cur.xp;
  var bis = lp.nxt ? lp.nxt.xp : lp.cur.xp;
  var anteil = lp.nxt ? Math.max(0, Math.min(100, (xp - von) / (bis - von) * 100)) : 100;

  var h = '<div class="rangkarte">'+
    '<div class="rk-emblem" data-lvl="LV '+lp.cur.lvl+'" aria-hidden="true">'+lp.cur.icon+'</div>'+
    '<div class="rk-haupt">'+
      '<div class="rk-eyebrow">Aktueller Rang</div>'+
      '<h1 class="rk-name">'+esc(lp.cur.name)+'</h1>'+
      '<div class="rk-spanne">'+
        '<div class="rk-bahn" role="img" aria-label="'+Math.round(anteil)+' Prozent bis zum nächsten Rang">'+
        '<i style="width:'+anteil.toFixed(1)+'%"></i></div>'+
      '</div>'+
      '<div class="rk-marken"><span>'+von.toLocaleString('de-DE')+' XP</span>'+
        '<span>'+(lp.nxt ? bis.toLocaleString('de-DE') + ' XP' : '—')+'</span></div>'+
      '<div class="rk-rest">'+
        (lp.nxt
          ? '<b>'+xp.toLocaleString('de-DE')+' XP</b> gesammelt · noch <b>'+
            lp.need.toLocaleString('de-DE')+' XP</b> bis „'+esc(lp.nxt.name)+'“'
          : '<b>'+xp.toLocaleString('de-DE')+' XP</b> · höchster Rang erreicht. Mehr geht nicht.')+
      '</div>'+
    '</div></div>';
  return h;
}
function renderLeiter(){
  var xp = state.xp || 0;
  var lp = levelProgress();
  var erreichte = RANKS.filter(function(r){ return xp >= r.xp; }).length;
  var anteil = RANKS.length > 1 ? (erreichte - 1) / (RANKS.length - 1) * 100 : 0;

  var h = '<div class="leiter" data-fortschritt style="--erreicht:'+Math.max(0, anteil).toFixed(1)+'%">';
  RANKS.forEach(function(r){
    var erreicht = xp >= r.xp;
    var aktuell  = r.lvl === lp.cur.lvl;
    var fehlt    = r.xp - xp;
    h += '<div class="lr'+(erreicht ? ' erreicht' : '')+(aktuell ? ' aktuell' : '')+'">'+
      '<span class="lr-knoten" aria-hidden="true">'+r.icon+'</span>'+
      '<span class="lr-text">'+
        '<span class="lr-name">'+esc(r.name)+'</span>'+
        '<span class="lr-meta">Level '+r.lvl+' · ab '+r.xp.toLocaleString('de-DE')+' XP</span>'+
      '</span>'+
      '<span class="lr-rechts">'+
        (aktuell ? '<span class="lr-jetzt">hier</span>'
                 : erreicht ? '✓ erreicht'
                            : 'in '+fehlt.toLocaleString('de-DE')+' XP')+
      '</span></div>';
  });
  h += '</div>';
  return h;
}
function renderAbzeichen(){
  var hat = BADGES.filter(function(b){ return state.badges[b.id]; });
  var quote = BADGES.length ? hat.length / BADGES.length * 100 : 0;

  var liste = BADGES.slice().sort(function(a, b){
    var ga = !!state.badges[a.id], gb = !!state.badges[b.id];
    if(ga !== gb) return ga ? -1 : 1;
    return ga ? state.badges[b.id] - state.badges[a.id] : 0;
  });
  if(azFilter === 'hat')  liste = liste.filter(function(b){ return state.badges[b.id]; });
  if(azFilter === 'offen')liste = liste.filter(function(b){ return !state.badges[b.id]; });

  var h = '<div class="az-kopf">'+
    '<div class="az-bahn" role="img" aria-label="'+hat.length+' von '+BADGES.length+' Abzeichen">'+
      '<i style="width:'+quote.toFixed(1)+'%"></i></div>'+
    '<div class="az-filter">'+
      ['alle','hat','offen'].map(function(w){
        var t = w === 'alle' ? 'Alle ' + BADGES.length
              : w === 'hat'  ? 'Erreicht ' + hat.length
                             : 'Offen ' + (BADGES.length - hat.length);
        return '<button class="'+(azFilter === w ? 'an' : '')+'" onclick="setzeAzFilter(\''+w+'\')">'+t+'</button>';
      }).join('')+
    '</div></div>';

  if(!liste.length){
    h += '<p class="intro-sub">Hier ist gerade nichts. Wechsle den Filter.</p>';
    return h;
  }

  h += '<div class="az-raster">';
  liste.forEach(function(b){
    var got = !!state.badges[b.id];
    h += '<div class="az '+(got ? 'hat' : 'offen')+'">'+
      '<span class="az-icon" aria-hidden="true">'+b.icon+'</span>'+
      '<span class="az-name">'+esc(b.name)+'</span>'+
      '<span class="az-desc">'+esc(b.desc)+'</span>'+
      '<span class="az-datum">'+(got
        ? new Date(state.badges[b.id]).toLocaleDateString('de-DE', { day:'2-digit', month:'short', year:'numeric' })
        : 'noch offen')+'</span>'+
      '</div>';
  });
  h += '</div>';
  return h;
}
function renderKennzahlen(){
  var mastered = Object.keys(state.srs).filter(function(k){ return (state.srs[k].iv || 0) >= 21; }).length;
  var bestExam = state.exams.reduce(function(a, e){ return Math.max(a, e.score / e.total); }, 0);
  var hat = BADGES.filter(function(b){ return state.badges[b.id]; }).length;
  var richtig = 0;
  Object.keys(state.stats || {}).forEach(function(k){ richtig += (state.stats[k].right || 0); });

  var z = [
    [(state.streak.count || 0), 'Tage in Folge', (state.streak.count || 0) >= 3],
    [state.completed.size + '/' + TOTAL, 'Lektionen', false],
    [hat + '/' + BADGES.length, 'Abzeichen', false],
    [richtig, 'Fragen richtig', false],
    [mastered, 'Karten gefestigt', false],
    [Object.keys(state.solved).length, 'Übungen gelöst', false],
    [state.tracesDone.length + '/' + TRACES.length, 'Durchläufe', false],
    [(state.subnetSolved || 0), 'Subnetze gerechnet', false],
    [(bestExam ? Math.round(bestExam * 100) + '%' : '—'), 'Beste Prüfung', bestExam >= 0.7]
  ];
  return '<div class="kz-reihe">' + z.map(function(t){
    return '<div class="kz'+(t[2] ? ' betont' : '')+'"><span class="w">'+t[0]+'</span><span class="b">'+t[1]+'</span></div>';
  }).join('') + '</div>';
}
function fehlerKarten(){
  return CARDS.filter(function(c){
    var st = state.stats[c.id];
    return st && st.wrong > 0;
  }).map(function(c){
    var st = state.stats[c.id];
    var ges = st.right + st.wrong;
    return { c:c, wrong:st.wrong, right:st.right, quote: ges ? st.right / ges : 0 };
  }).sort(function(a, b){
    if(a.quote !== b.quote) return a.quote - b.quote;
    return b.wrong - a.wrong;
  });
}
var fhOffen = {};
function fhZeigen(id){ fhOffen[id] = !fhOffen[id]; renderContent(); }
function renderFehlerheft(){
  var liste = fehlerKarten();
  var h = '<div class="breadcrumb">Training</div><h1>Fehlerheft</h1>';

  if(!liste.length){
    h += '<p class="intro-sub">Noch keine falsch beantwortete Frage. Sobald du im Quiz, in der Wiederholung '+
         'oder in einer Prüfung danebenliegst, sammelt sich die Frage hier — mit Antwort, Erklärung '+
         'und dem Weg zur passenden Lektion.</p>'+
         '<div class="ex-panel"><strong>Warum ein Fehlerheft?</strong> Wer nur wiederholt, was er kann, '+
         'lernt wenig dazu. Die Fragen, die du verhauen hast, sind die einzigen, bei denen sich '+
         'eine zweite Runde wirklich lohnt.</div>';
    return h;
  }

  var ungeloest = liste.filter(function(e){ return e.quote < 0.5; }).length;
  h += '<p class="intro-sub">'+liste.length+' Fragen sind dir schon einmal danebengegangen. '+
       'Sortiert nach Trefferquote — die schlimmsten stehen oben. '+
       (ungeloest ? '<strong>'+ungeloest+'</strong> davon sitzen noch gar nicht.' : 'Keine davon ist mehr kritisch.')+'</p>';

  h += '<div class="ex-actions" style="margin-bottom:18px;">'+
       '<button class="ex-btn primary" onclick="startExam(\'fehler\')">Nur diese Fragen prüfen</button>'+
       '<button class="ex-btn" onclick="selectLesson(\'review\')">Zur normalen Wiederholung</button></div>';

  h += '<div class="fh-liste">';
  liste.slice(0, 60).forEach(function(e){
    var c = e.c, auf = !!fhOffen[c.id];
    var proz = Math.round(e.quote * 100);
    h += '<div class="fh">'+
      '<button class="fh-kopf" onclick="fhZeigen(\''+c.id+'\')" aria-expanded="'+auf+'">'+
        '<span class="fh-quote'+(proz < 50 ? ' schlecht' : proz < 80 ? ' mittel' : '')+'">'+proz+'%</span>'+
        '<span class="fh-frage">'+esc(c.q)+'</span>'+
        '<span class="fh-zaehler">'+e.right+'✓ '+e.wrong+'✗</span>'+
        '<span class="fh-pfeil">'+(auf ? '−' : '+')+'</span>'+
      '</button>';
    if(auf){
      h += '<div class="fh-koerper">'+
        '<div class="fh-antwort"><span class="fh-label">Richtig</span>'+esc(c.options[c.correct])+'</div>'+
        '<p class="fh-erklaerung">'+esc(c.explain)+'</p>'+
        '<button class="ex-btn" onclick="selectLesson(\''+c.lessonId+'\')">'+
        'Zur Lektion: '+esc(c.lessonTitle)+'</button>'+
        '</div>';
    }
    h += '</div>';
  });
  h += '</div>';
  if(liste.length > 60){
    h += '<p class="intro-sub" style="margin-top:14px;">Es werden die 60 schwächsten angezeigt.</p>';
  }
  return h;
}
function notizUmschalten(id){
  var el = document.getElementById('notizBox');
  if(!el) return;
  el.hidden = !el.hidden;
  if(!el.hidden){ var t = document.getElementById('notizFeld'); if(t) t.focus(); }
}
function notizSpeichern(id, wert){
  state.notizen = state.notizen || {};
  var w = (wert || '').trim();
  if(w) state.notizen[id] = w; else delete state.notizen[id];
  saveProgress();
  var m = document.getElementById('notizMarke');
  if(m) m.hidden = !w;
}
function merkenUmschalten(id){
  state.merkzettel = state.merkzettel || {};
  if(state.merkzettel[id]) delete state.merkzettel[id];
  else state.merkzettel[id] = Date.now();
  saveProgress();
  renderContent();
  renderSidebar();
}
function jsonAusText(roh){
  var t = String(roh || '').trim();
  if(!t) return null;

  /* Codezaun entfernen, mit und ohne Sprachangabe. */
  t = t.replace(/^`{3}[a-z]*\s*/i, '').replace(/`{3}\s*$/, '').trim();

  try{ return JSON.parse(t); }catch(e){}

  /* Sonst das erste vollstaendige Objekt oder Array herausschneiden. */
  var paare = [['{', '}'], ['[', ']']];
  for(var i = 0; i < paare.length; i++){
    var a = t.indexOf(paare[i][0]);
    var b = t.lastIndexOf(paare[i][1]);
    if(a >= 0 && b > a){
      try{ return JSON.parse(t.slice(a, b + 1)); }catch(e){}
    }
  }
  return null;
}
var KI_STUFEN = { 'default':1, 'complex':1 };
async function kiJson(anweisung, stufe){
  if(!tutor.ready) await tutorInit();
  if(!tutor.fn) throw { code:'not_granted', message:'kein Tutor verfuegbar' };

  var opt = { cache:false, modelTier: KI_STUFEN[stufe] ? stufe : 'default' };

  /* Weg 1: die eingebaute Abkuerzung. */
  try{
    var direkt = await tutor.fn.json(anweisung, opt);
    if(direkt !== null && typeof direkt === 'object') return direkt;
  }catch(e){
    /* Bei diesen Codes hilft kein zweiter Versuch. */
    if(e && (e.code === 'aborted' || e.code === 'cancelled' ||
             e.code === 'not_granted' || e.code === 'sampling_disabled' ||
             e.code === 'not_declared' || e.code === 'capability_disabled' ||
             e.code === 'rate_limited' || e.code === 'session_expired')) throw e;
  }

  /* Weg 2: als Text holen und selbst herausschneiden. */
  var res = await tutor.fn([{ role:'user', content: String(anweisung) }], opt);
  var geparst = jsonAusText(res && res.text);
  if(geparst === null) throw { code:'invalid_json', message:'Antwort war kein JSON' };
  return geparst;
}
function erkUmschalten(id){
  var el = document.getElementById('erkBox');
  if(!el) return;
  el.hidden = !el.hidden;
  if(!el.hidden){ var t = document.getElementById('erkFeld'); if(t) t.focus(); }
}
function erkErgebnisHtml(e){
  if(!e) return '';
  if(e.fehler) return '<div class="erk-erg warn">'+esc(e.fehler)+'</div>';
  var stufe = e.punkte >= 3 ? 'ok' : (e.punkte >= 2 ? '' : 'warn');
  var wort = e.punkte >= 3 ? 'Sitzt' : (e.punkte >= 2 ? 'Im Kern richtig' : 'Noch lückenhaft');
  return '<div class="erk-erg '+stufe+'">'+
    '<div class="erk-note">'+wort+' · '+e.punkte+' von 3</div>'+
    (e.treffer ? '<p><strong>Richtig:</strong> '+esc(e.treffer)+'</p>' : '')+
    (e.fehlt ? '<p><strong>Fehlt:</strong> '+esc(e.fehlt)+'</p>' : '')+
    (e.tipp ? '<p><strong>Merke:</strong> '+esc(e.tipp)+'</p>' : '')+
    '</div>';
}
async function erkPruefen(lessonId){
  var feld = document.getElementById('erkFeld');
  var ziel = document.getElementById('erkErg');
  if(!feld || !ziel) return;
  var text = (feld.value || '').trim();
  if(text.length < 10){
    ziel.innerHTML = '<div class="erk-erg warn">Schreib erst ein oder zwei ganze Sätze — dann lohnt sich die Rückmeldung.</div>';
    return;
  }
  var lektion = lessonById(lessonId);
  if(!lektion) return;
  ziel.innerHTML = '<div class="erk-erg">Der Tutor liest mit …</div>';

  if(!tutor.ready) await tutorInit();
  if(!tutor.fn){
    ziel.innerHTML = erkErgebnisHtml({ fehler:'Die Bewertung ist in dieser Ansicht nicht verfügbar. '+
      'Vergleiche deinen Satz selbst mit dem Lektionstext — schon das Aufschreiben hat gewirkt.' });
    return;
  }

  var anweisung = [
    'Du bist Pruefer in der IHK-Abschlusspruefung Teil 1, Fachinformatiker Anwendungsentwicklung.',
    'Ein Auszubildender soll den Kern einer Lektion in eigenen Worten wiedergeben.',
    '',
    'LEKTION: ' + lektion.title,
    'LEKTIONSINHALT:',
    klText(lektion.body || '').slice(0, 2600),
    '',
    'ANTWORT DES AUSZUBILDENDEN:',
    text.slice(0, 900),
    '',
    'Bewerte mit 0 bis 3 Punkten: 3 = Kern richtig und vollstaendig, 2 = im Kern richtig,',
    'aber etwas Wesentliches fehlt, 1 = nur Bruchstuecke, 0 = falsch oder am Thema vorbei.',
    'Fachlich richtige eigene Formulierungen sind voll zu werten; es geht NICHT um Wortgleichheit.',
    '',
    'Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in dieser Form:',
    '{"punkte": 2, "treffer": "ein Satz, was richtig war",',
    ' "fehlt": "ein Satz, was fehlt (leer lassen wenn nichts fehlt)",',
    ' "tipp": "ein kurzer Merksatz fuer die Pruefung"}',
    'Schreibe auf Deutsch mit Du-Anrede. Kein Text vor oder nach dem JSON.'
  ].join(String.fromCharCode(10));

  try{
    var r = await kiJson(anweisung, 'default');
    var e = {
      text: text,
      punkte: Math.max(0, Math.min(3, Number(r && r.punkte) || 0)),
      treffer: String((r && r.treffer) || ''),
      fehlt: String((r && r.fehlt) || ''),
      tipp: String((r && r.tipp) || ''),
      ts: Date.now()
    };
    state.erklaerungen = state.erklaerungen || {};
    state.erklaerungen[lessonId] = e;
    if(e.punkte >= 2) awardXp(8, 'In eigenen Worten erklärt', 'erk_' + lessonId);
    saveProgress();
    ziel.innerHTML = erkErgebnisHtml(e);
  }catch(err){
    var txt = tutorFehlertext(err && err.code);
    if(!txt) return;   /* bewusst abgebrochen */
    ziel.innerHTML = erkErgebnisHtml({ fehler: txt }) +
      '<div class="ex-actions"><button class="ex-btn" type="button" '+
      'onclick="erkPruefen(' + String.fromCharCode(39) + lessonId + String.fromCharCode(39) + ')">'+
      'Noch einmal versuchen</button></div>';
  }
}
function renderLektionWerkzeuge(lessonId){
  var notiz = (state.notizen || {})[lessonId] || '';
  var gemerkt = !!(state.merkzettel || {})[lessonId];
  var erkFrueher = (state.erklaerungen || {})[lessonId] || null;
  var erkAlt = erkFrueher ? (erkFrueher.text || '') : '';
  return '<div class="lw">'+
    '<button class="ex-btn'+(gemerkt ? ' primary' : '')+'" onclick="merkenUmschalten(\''+lessonId+'\')">'+
      (gemerkt ? '★ Gemerkt' : '☆ Merken')+'</button>'+
    '<button class="ex-btn" onclick="notizUmschalten(\''+lessonId+'\')">'+
      '✎ Notiz'+(notiz ? '' : '')+'<span id="notizMarke" class="lw-punkt"'+(notiz ? '' : ' hidden')+'></span></button>'+
    '<button class="ex-btn" onclick="tutorZuLektion(\''+lessonId+'\')">&#128172; Tutor fragen</button>'+
    '<button class="ex-btn" onclick="erkUmschalten(\''+lessonId+'\')">&#9997; In einem Satz erklären</button>'+
    '<div class="erk-box" id="erkBox" hidden>'+
      '<label class="notiz-label" for="erkFeld">Ohne nachzusehen: Was ist der Kern dieser Lektion? Ein bis zwei Sätze.</label>'+
      '<textarea class="notiz-feld" id="erkFeld" rows="3" spellcheck="false" '+
      'placeholder="Zum Beispiel: Die Subnetzmaske trennt Netz- von Hostanteil, indem …">'+esc(erkAlt)+'</textarea>'+
      '<div class="erk-fuss"><button class="ex-btn primary" type="button" onclick="erkPruefen(\''+lessonId+'\')">Prüfen lassen</button>'+
      '<span class="erk-hinweis">Der Tutor vergleicht deinen Satz mit der Lektion.</span></div>'+
      '<div id="erkErg">'+erkErgebnisHtml(erkFrueher)+'</div>'+
    '</div>'+
    '<div class="notiz-box" id="notizBox"'+(notiz ? '' : ' hidden')+'>'+
      '<label class="notiz-label" for="notizFeld">Deine Notiz zu dieser Lektion — sie wandert mit deinem Fortschritt mit.</label>'+
      '<textarea class="notiz-feld" id="notizFeld" rows="3" spellcheck="false" '+
      'placeholder="Was verwechselst du hier immer? Was ist die Eselsbrücke?" '+
      'oninput="notizSpeichern(\''+lessonId+'\', this.value)">'+esc(notiz)+'</textarea>'+
    '</div></div>';
}
function renderMerkzettel(){
  var ids = Object.keys(state.merkzettel || {});
  var notizIds = Object.keys(state.notizen || {});
  var h = '<div class="breadcrumb">Deine Ablage</div><h1>Merkzettel</h1>';
  if(!ids.length && !notizIds.length){
    h += '<p class="intro-sub">Hier sammeln sich die Lektionen, die du mit ☆ markierst, und alle Notizen, '+
         'die du dir unterwegs machst. Beides findest du unter jeder Lektion.</p>';
    return h;
  }
  h += '<p class="intro-sub">'+ids.length+' markierte Lektionen und '+notizIds.length+' Notizen. '+
       'Kurz vor der Prüfung ist das die Liste, die du noch einmal durchgehst.</p>';

  if(ids.length){
    h += '<h2 class="sec-h">Markiert</h2><div class="heute-raster">';
    ids.sort(function(a,b){ return state.merkzettel[b] - state.merkzettel[a]; }).forEach(function(id){
      var l = FLAT.find(function(x){ return x.id === id; });
      if(!l) return;
      var m = moduleOfLesson(id);
      h += '<button class="hk" onclick="selectLesson(\''+id+'\')">'+
        '<span class="hk-oben">'+esc(m ? m.title : '')+'</span>'+
        '<span class="hk-titel">'+esc(l.title)+'</span>'+
        '<span class="hk-text">markiert am '+new Date(state.merkzettel[id]).toLocaleDateString('de-DE')+'</span>'+
        '</button>';
    });
    h += '</div>';
  }
  if(notizIds.length){
    h += '<h2 class="sec-h">Notizen</h2>';
    notizIds.forEach(function(id){
      var l = FLAT.find(function(x){ return x.id === id; });
      if(!l) return;
      h += '<div class="nz"><button class="nz-titel" onclick="selectLesson(\''+id+'\')">'+esc(l.title)+'</button>'+
           '<p class="nz-text">'+esc(state.notizen[id])+'</p></div>';
    });
  }
  return h;
}
function renderPruefungsverlauf(){
  var ex = (state.exams || []).slice(-12);
  if(ex.length < 2) return '';
  var w = 520, hgt = 96, pad = 8;
  var werte = ex.map(function(e){ return e.score / e.total; });
  var dx = (w - pad * 2) / Math.max(1, werte.length - 1);
  var punkte = werte.map(function(v, i){
    return [pad + i * dx, pad + (1 - v) * (hgt - pad * 2)];
  });
  var linie = punkte.map(function(p, i){ return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  var flaeche = linie + ' L' + punkte[punkte.length-1][0].toFixed(1) + ' ' + (hgt-pad) + ' L' + pad + ' ' + (hgt-pad) + ' Z';
  var letzte = werte[werte.length-1], erste = werte[0];
  var trend = letzte - erste;

  var h = '<h2 class="sec-h">Prüfungsverlauf</h2>'+
    '<div class="verlauf"><svg viewBox="0 0 '+w+' '+hgt+'" role="img" '+
    'aria-label="Ergebnisse der letzten '+werte.length+' Prüfungen">'+
    '<line class="v-grid" x1="'+pad+'" y1="'+(pad + 0.3*(hgt-pad*2)).toFixed(1)+'" x2="'+(w-pad)+'" y2="'+(pad + 0.3*(hgt-pad*2)).toFixed(1)+'"/>'+
    '<path class="v-flaeche" d="'+flaeche+'"/>'+
    '<path class="v-linie" d="'+linie+'"/>';
  punkte.forEach(function(p, i){
    var letzt = i === punkte.length - 1;
    h += '<circle class="v-punkt'+(letzt ? ' letzt' : '')+'" cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(letzt ? 5 : 3)+'"/>';
  });
  h += '</svg>'+
    '<div class="v-text">'+
      '<span class="v-wert">'+Math.round(letzte * 100)+'%</span>'+
      '<span class="v-lbl">letzte Prüfung</span>'+
      '<span class="v-trend'+(trend >= 0 ? ' hoch' : ' runter')+'">'+
        (trend >= 0 ? '↑ +' : '↓ ')+Math.round(Math.abs(trend) * 100)+' Punkte seit der ersten</span>'+
      '<span class="v-lbl">Die gestrichelte Linie markiert 70 Prozent — die Bestehensgrenze.</span>'+
    '</div></div>';
  return h;
}
var klausur = {
  phase:'start',      /* start | laufend | bewertung | ergebnis */
  aufgaben:[],
  antworten:[],
  endetUm:0,
  uhr:null,
  ergebnis:null,
  fehler:''
};
var KL_PUNKTE = { 1:5, 2:8, 3:12 };
var KL_VARIANTEN = {
  kurz:   { label:'Kurzklausur',  n:3, min:45, stufen:[1,2],   text:'Drei Aufgaben in 45 Minuten. Einstieg und Fortgeschritten.' },
  voll:   { label:'Vollklausur',  n:5, min:90, stufen:[1,2,3], text:'Fünf Aufgaben in 90 Minuten — Umfang und Zeitdruck der echten AP1.' },
  experte:{ label:'Expertenrunde',n:3, min:60, stufen:[3],     text:'Drei Expertenaufgaben in 60 Minuten. Mehrteilig, mit Begründung.' }
};
function klStarten(variante){
  var v = KL_VARIANTEN[variante];
  var pool = EXERCISES.filter(function(e){ return v.stufen.indexOf(e.level) !== -1; });
  if(pool.length < v.n){
    showToast('<span class="t-xp">Zu wenig</span><span class="t-reason">Nicht genug Aufgaben für diese Variante</span>');
    return;
  }
  var gezogen = shuffled(pool).slice(0, v.n);
  klausur = {
    phase:'laufend', variante:variante,
    aufgaben:gezogen,
    antworten:gezogen.map(function(){ return ''; }),
    endetUm: Date.now() + v.min * 60000,
    uhr:null, ergebnis:null, fehler:''
  };
  klUhrStoppen();
  klausur.uhr = setInterval(klTicken, 1000);
  state.currentId = 'klausur';
  render();
}
function klUhrStoppen(){ if(klausur.uhr){ clearInterval(klausur.uhr); klausur.uhr = null; } }
function klTicken(){
  var el = document.getElementById('klUhr');
  var rest = klausur.endetUm - Date.now();
  if(rest <= 0){ klUhrStoppen(); klAbgeben(true); return; }
  if(!el) return;
  var sek = Math.floor(rest / 1000);
  var m = Math.floor(sek / 60), sc = sek % 60;
  el.textContent = m + ':' + (sc < 10 ? '0' : '') + sc;
  el.className = 'kl-uhr' + (rest < 300000 ? ' knapp' : '');
}
function klSchreiben(i, wert){ klausur.antworten[i] = wert; }
function klAbbrechen(){
  if(!window.confirm('Die Klausur wird verworfen. Fortfahren?')) return;
  klUhrStoppen();
  klausur.phase = 'start';
  renderContent();
}
function klText(html){
  return String(html).replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|li|div|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n').trim();
}
async function klAbgeben(automatisch){
  if(klausur.phase !== 'laufend') return;
  if(!automatisch){
    var leer = klausur.antworten.filter(function(a){ return !a.trim(); }).length;
    var frage = leer
      ? leer + ' von ' + klausur.aufgaben.length + ' Aufgaben sind noch leer. Trotzdem abgeben?'
      : 'Klausur abgeben und bewerten lassen?';
    if(!window.confirm(frage)) return;
  }
  klUhrStoppen();
  klausur.phase = 'bewertung';
  klausur.fehler = '';
  renderContent();

  if(!tutor.ready) await tutorInit();
  if(!tutor.fn){
    klausur.phase = 'ergebnis';
    klausur.ergebnis = null;
    klausur.fehler = 'Die Bewertung durch den Tutor ist in dieser Ansicht nicht verfügbar. '+
      'Deine Antworten stehen unten neben den Musterlösungen — vergleiche selbst.';
    renderContent();
    return;
  }

  var teile = klausur.aufgaben.map(function(a, i){
    return [
      'AUFGABE ' + (i+1) + ' (' + (KL_PUNKTE[a.level] || 8) + ' Punkte, Thema: ' + a.topic + ')',
      a.title,
      klText(a.task).slice(0, 1400),
      '',
      'MUSTERLOESUNG ' + (i+1) + ':',
      String(a.solution).slice(0, 2200),
      '',
      'ANTWORT DES PRUEFLINGS ' + (i+1) + ':',
      (klausur.antworten[i].trim() || '(nichts geschrieben)').slice(0, 2200),
      '', '---', ''
    ].join('\n');
  }).join('\n');

  var anweisung = [
    'Du bist Korrektor der IHK-Abschlusspruefung Teil 1 im Beruf Fachinformatiker fuer',
    'Anwendungsentwicklung. Bewerte die folgenden handschriftlich beantworteten Aufgaben.',
    '',
    'BEWERTUNGSREGELN:',
    '- Bewerte streng, aber fair, so wie ein echter Korrektor.',
    '- Der RECHENWEG zaehlt: Teilpunkte gibt es fuer richtige Ansaetze, auch wenn das',
    '  Endergebnis falsch ist. Ein richtiges Ergebnis ohne Weg bekommt nicht die volle Punktzahl.',
    '- Bei Begruendungsaufgaben zaehlt das ausgeschriebene Warum.',
    '- Einheiten und Rundungen gehoeren dazu.',
    '- Eine leere Antwort bekommt 0 Punkte.',
    '- Die Musterloesung ist nicht der einzige Weg: Ein anderer, fachlich richtiger',
    '  Loesungsweg ist voll zu werten.',
    '',
    'Antworte AUSSCHLIESSLICH mit einem JSON-Array, ein Objekt je Aufgabe, in dieser Form:',
    '[{"punkte": 6, "max": 8, "staerken": "ein bis zwei Saetze, was richtig war",',
    '  "luecken": "ein bis drei Saetze, was fehlt oder falsch ist",',
    '  "tipp": "ein Satz, worauf der Prueflング beim naechsten Mal achten soll"}]',
    'Schreibe auf Deutsch, mit Du-Anrede in tipp und luecken. Kein Text vor oder nach dem JSON.',
    '',
    teile
  ].join('\n');

  try{
    var res = await kiJson(anweisung, 'complex');
    if(!Array.isArray(res)) throw { code:'invalid_json', message:'kein Array' };
    klausur.ergebnis = res.map(function(r, i){
      var max = KL_PUNKTE[klausur.aufgaben[i] ? klausur.aufgaben[i].level : 2] || 8;
      return {
        punkte: Math.max(0, Math.min(max, Number(r.punkte) || 0)),
        max: max,
        staerken: String(r.staerken || ''),
        luecken: String(r.luecken || ''),
        tipp: String(r.tipp || '')
      };
    });
    var erreicht = klausur.ergebnis.reduce(function(a, r){ return a + r.punkte; }, 0);
    var moeglich = klausur.ergebnis.reduce(function(a, r){ return a + r.max; }, 0);
    state.klausuren = (state.klausuren || []).concat([{
      ts: Date.now(), erreicht: erreicht, moeglich: moeglich, variante: klausur.variante
    }]).slice(-20);
    awardXp(Math.round(erreicht * 2), 'Klausur: ' + erreicht + '/' + moeglich + ' Punkte');
    if(moeglich && erreicht / moeglich >= 0.5) grantBadge('klausur_bestanden');
    if(moeglich && erreicht / moeglich >= 0.9) grantBadge('klausur_glanz');
    saveProgress();
  }catch(e){
    klausur.ergebnis = null;
    klausur.fehler = (e && e.code === 'not_granted')
      ? 'Die Bewertung wurde nicht freigegeben. Vergleiche deine Antworten unten selbst mit den Musterlösungen.'
      : (e && e.code === 'rate_limited')
        ? 'Gerade zu viele Anfragen. Versuche die Bewertung in einigen Minuten erneut — deine Antworten bleiben erhalten.'
        : 'Die Bewertung hat nicht geklappt. Deine Antworten stehen unten neben den Musterlösungen.';
  }
  klausur.phase = 'ergebnis';
  renderContent();
}
function klNochmal(){ klausur.phase = 'start'; klausur.ergebnis = null; renderContent(); }
function renderKlausur(){
  var h = '<div class="breadcrumb">Training</div><h1>Mitschreib-Prüfung</h1>';

  /* ---------- Startbildschirm ---------- */
  if(klausur.phase === 'start'){
    h += '<p class="intro-sub">Der Prüfungssimulator fragt Multiple Choice ab. Die echte AP1 verlangt '+
         'daneben <strong>offene Aufgaben</strong>: rechnen, begründen, entwerfen. Hier schreibst du frei — '+
         'und der Tutor bewertet anschließend wie ein Korrektor: mit Punkten, mit dem, was gut war, '+
         'und mit dem, was gefehlt hätte.</p>';

    var frueher = state.klausuren || [];
    if(frueher.length){
      var l = frueher[frueher.length - 1];
      h += '<div class="pruef-leiste"><span class="tage">'+Math.round(l.erreicht / l.moeglich * 100)+'%</span>'+
        '<span class="txt"><b>Letzte Klausur:</b> '+l.erreicht+' von '+l.moeglich+' Punkten am '+
        new Date(l.ts).toLocaleDateString('de-DE')+'. '+
        (frueher.length > 1 ? 'Insgesamt '+frueher.length+' Klausuren geschrieben.' : '')+'</span></div>';
    }

    h += '<div class="heute-raster">';
    Object.keys(KL_VARIANTEN).forEach(function(k){
      var v = KL_VARIANTEN[k];
      var punkte = v.n * (v.stufen.length === 1 ? KL_PUNKTE[v.stufen[0]] : 8);
      h += '<button class="hk" onclick="klStarten(\''+k+'\')">'+
        '<span class="hk-oben">'+v.n+' Aufgaben · '+v.min+' Min.</span>'+
        '<span class="hk-titel">'+esc(v.label)+'</span>'+
        '<span class="hk-text">'+esc(v.text)+' Etwa '+punkte+' Punkte.</span></button>';
    });
    h += '</div>';

    h += '<div class="ex-panel" style="margin-top:20px;"><strong>So läuft es ab:</strong> '+
         'Du bekommst die Aufgaben untereinander mit je einem Schreibfeld und einer laufenden Uhr. '+
         'Schreib so, wie du es auf Papier tätest — Rechenweg mit Einheiten, Begründungen ausformuliert. '+
         'Beim Abgeben gehen alle Antworten zusammen an den Tutor; die Bewertung dauert etwa eine halbe Minute. '+
         'Sie läuft über dein Claude-Konto und ist eine Einschätzung, kein amtliches Ergebnis.</div>';
    return h;
  }

  /* ---------- Laufende Klausur ---------- */
  if(klausur.phase === 'laufend'){
    h = '<div class="kl-kopf"><div><div class="breadcrumb">Mitschreib-Prüfung</div>'+
        '<h1 style="margin:0;">'+esc(KL_VARIANTEN[klausur.variante].label)+'</h1></div>'+
        '<div class="kl-uhr-box"><span class="kl-uhr" id="klUhr">––:––</span>'+
        '<span class="kl-uhr-lbl">verbleibend</span></div></div>';

    klausur.aufgaben.forEach(function(a, i){
      var max = KL_PUNKTE[a.level] || 8;
      h += '<div class="kl-aufgabe">'+
        '<div class="kl-nr">Aufgabe '+(i+1)+' <span class="kl-max">'+max+' Punkte</span>'+
        '<span class="badge topic">'+esc(a.topic)+'</span></div>'+
        '<h2 class="kl-titel">'+esc(a.title)+'</h2>'+
        '<div class="kl-text">'+a.task+'</div>'+
        '<textarea class="kl-feld" id="klFeld'+i+'" rows="9" spellcheck="false" '+
        'placeholder="Deine Lösung — Rechenweg mit Einheiten, Begründungen ausformuliert." '+
        'oninput="klSchreiben('+i+', this.value)">'+esc(klausur.antworten[i])+'</textarea>'+
        '</div>';
    });

    h += '<div class="ex-actions" style="margin:24px 0 40px;">'+
      '<button class="ex-btn primary" onclick="klAbgeben(false)">Abgeben und bewerten lassen</button>'+
      '<button class="ex-btn" onclick="klAbbrechen()">Verwerfen</button></div>';
    return h;
  }

  /* ---------- Bewertung läuft ---------- */
  if(klausur.phase === 'bewertung'){
    h += '<div class="kl-warten"><span class="kl-spinner" aria-hidden="true"></span>'+
         '<div><strong>Der Tutor korrigiert.</strong>'+
         '<p>Das dauert meist eine halbe bis eine Minute — er liest jede Antwort gegen die '+
         'Musterlösung und vergibt Teilpunkte auf den Rechenweg.</p></div></div>';
    return h;
  }

  /* ---------- Ergebnis ---------- */
  var erg = klausur.ergebnis;
  if(erg){
    var erreicht = erg.reduce(function(a, r){ return a + r.punkte; }, 0);
    var moeglich = erg.reduce(function(a, r){ return a + r.max; }, 0);
    var proz = moeglich ? Math.round(erreicht / moeglich * 100) : 0;
    var note = proz >= 92 ? ['1', 'sehr gut'] : proz >= 81 ? ['2', 'gut'] : proz >= 67 ? ['3', 'befriedigend']
             : proz >= 50 ? ['4', 'ausreichend'] : proz >= 30 ? ['5', 'mangelhaft'] : ['6', 'ungenügend'];

    h += '<div class="kl-ergebnis">'+
      '<div class="kl-note'+(proz >= 50 ? ' gut' : ' schwach')+'">'+note[0]+'</div>'+
      '<div><div class="kl-note-txt">'+note[1]+'</div>'+
      '<div class="kl-punkte">'+erreicht+' von '+moeglich+' Punkten · '+proz+' %</div>'+
      '<div class="kl-hinweis">Richtwert nach dem IHK-Schlüssel. Eine Einschätzung des Tutors, '+
      'kein amtliches Ergebnis — aber nah genug, um zu wissen, wo du stehst.</div></div></div>';
  }
  if(klausur.fehler){
    h += '<div class="tutor-hinweis" style="border-radius:var(--r-md); margin-bottom:18px;">'+esc(klausur.fehler)+'</div>';
  }

  klausur.aufgaben.forEach(function(a, i){
    var r = erg ? erg[i] : null;
    var max = KL_PUNKTE[a.level] || 8;
    h += '<div class="kl-aufgabe">'+
      '<div class="kl-nr">Aufgabe '+(i+1)+
        (r ? '<span class="kl-erg'+(r.punkte >= r.max * 0.5 ? ' gut' : ' schwach')+'">'+
             r.punkte+' / '+r.max+' Punkte</span>'
           : '<span class="kl-max">'+max+' Punkte</span>')+
        '<span class="badge topic">'+esc(a.topic)+'</span></div>'+
      '<h2 class="kl-titel">'+esc(a.title)+'</h2>';

    if(r){
      if(r.staerken) h += '<div class="kl-rueck gut"><span class="kl-rueck-lbl">Das war richtig</span>'+esc(r.staerken)+'</div>';
      if(r.luecken)  h += '<div class="kl-rueck luecke"><span class="kl-rueck-lbl">Das hat gefehlt</span>'+esc(r.luecken)+'</div>';
      if(r.tipp)     h += '<div class="kl-rueck tipp"><span class="kl-rueck-lbl">Fürs nächste Mal</span>'+esc(r.tipp)+'</div>';
    }

    h += '<details class="kl-details"><summary>Deine Antwort und die Musterlösung</summary>'+
      '<div class="kl-vergleich">'+
        '<div><div class="kl-sp-titel">Deine Antwort</div>'+
        '<pre class="kl-pre">'+esc(klausur.antworten[i].trim() || '(nichts geschrieben)')+'</pre></div>'+
        '<div><div class="kl-sp-titel">Musterlösung</div>'+
        '<pre class="kl-pre muster">'+esc(a.solution)+'</pre></div>'+
      '</div>'+
      '<div class="ex-panel" style="margin-top:12px;"><strong>Hinweis zur Lösung:</strong> '+a.solutionNote+'</div>'+
      '</details></div>';
  });

  h += '<div class="ex-actions" style="margin:24px 0 40px;">'+
    '<button class="ex-btn primary" onclick="klNochmal()">Neue Klausur</button>'+
    '<button class="ex-btn" onclick="selectLesson(\'exercises\')">Zu den Übungsaufgaben</button>'+
    '<button class="ex-btn" onclick="selectLesson(\'fehler\')">Zum Fehlerheft</button></div>';
  return h;
}
function appFehlerZu(){
  var h = document.getElementById('fehlerHost');
  if(h) h.remove();
}
function zeigeBanner(titel, text, detail){
  try{
    var host = document.getElementById('fehlerHost');
    if(!host){
      host = document.createElement('div');
      host.id = 'fehlerHost';
      host.className = 'app-fehler';
      host.setAttribute('role', 'alert');
      document.body.appendChild(host);
    }
    host.innerHTML =
      '<div class="af-kopf">'+esc(titel)+'</div>'+
      '<p class="af-text">'+esc(text)+'</p>'+
      '<div class="af-knoepfe">'+
        '<button class="ex-btn primary" type="button" onclick="selectLesson(\'profile\')">Stand sichern</button>'+
        '<button class="ex-btn" type="button" onclick="location.reload()">Neu laden</button>'+
        '<button class="ex-btn" type="button" onclick="appFehlerZu()">Schliessen</button>'+
      '</div>'+
      (detail ? '<code class="af-detail">'+esc(String(detail)).slice(0, 240)+'</code>' : '');
  }catch(e){}
}
function appFehler(quelle, f){
  try{
    var host = document.getElementById('fehlerHost');
    if(!host){
      host = document.createElement('div');
      host.id = 'fehlerHost';
      host.className = 'app-fehler';
      host.setAttribute('role', 'alert');
      document.body.appendChild(host);
    }
    var txt = (f && (f.message || f.reason || f.type)) || String(f || 'unbekannt');
    host.innerHTML =
      '<div class="af-kopf">Da ist etwas schiefgelaufen.</div>'+
      '<p class="af-text">Dein Fortschritt ist gespeichert. Du kannst weiterarbeiten oder die '+
      'Seite neu laden. Sichere vorher zur Sicherheit deinen Stand.</p>'+
      '<div class="af-knoepfe">'+
        '<button class="ex-btn primary" type="button" onclick="location.reload()">Neu laden</button>'+
        '<button class="ex-btn" type="button" onclick="selectLesson(\'profile\')">Stand sichern</button>'+
        '<button class="ex-btn" type="button" onclick="appFehlerZu()">Schliessen</button>'+
      '</div>'+
      '<code class="af-detail">'+esc(String(quelle) + ': ' + String(txt)).slice(0, 240)+'</code>';
  }catch(e){}
}
var railBegriffe = [];
var railDeko = null;
function railText(roh){
  if(!railDeko) railDeko = document.createElement('div');
  railDeko.innerHTML = (roh === null || roh === undefined) ? '' : String(roh);
  return (railDeko.textContent || '').replace(/\s+/g, ' ').trim();
}
function railNorm(t){
  return String(t || '').replace(/\s+/g, ' ').trim()
    .replace(/[:.,;!?]+$/, '').toLowerCase();
}
function railBegriffeSammeln(body){
  var roh = String(body || '').match(/<strong[^>]*>[\s\S]*?<\/strong>/gi) || [];
  var gesehen = {}, raus = [];
  roh.forEach(function(stueck){
    var wort = railText(stueck).replace(/[:.,;]+$/, '');
    if(wort.length < 3 || wort.length > 34) return;
    if(wort.split(' ').length > 4) return;
    var k = wort.toLowerCase();
    if(gesehen[k]) return;
    gesehen[k] = 1;
    raus.push(wort);
  });
  return raus.slice(0, 14);
}
function railSanft(){
  try{ return !window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  catch(e){ return true; }
}
function railZeigen(el){
  if(!el) return;
  try{ el.scrollIntoView({ block:'center', behavior: railSanft() ? 'smooth' : 'auto' }); }
  catch(e){ el.scrollIntoView(); }
}
function railSpringe(i){
  var wort = railBegriffe[i];
  if(!wort) return;
  var ziel = null, alle = document.querySelectorAll('#content strong');
  for(var n = 0; n < alle.length; n++){
    if(railNorm(alle[n].textContent) === railNorm(wort)){ ziel = alle[n]; break; }
  }
  if(!ziel) return;
  var block = (ziel.closest && ziel.closest('p, li, td, th, figcaption')) || ziel;
  railZeigen(block);
  var vorher = document.querySelector('.rail-treffer');
  if(vorher) vorher.classList.remove('rail-treffer');
  ziel.classList.add('rail-treffer');
  setTimeout(function(){ ziel.classList.remove('rail-treffer'); }, 2200);
}
function railMerksatz(){
  var box = document.getElementById('railTipp');
  var knopf = document.getElementById('railDeck');
  if(box) box.hidden = false;
  if(knopf) knopf.hidden = true;
}
function railZumCheck(id){
  railZeigen(document.getElementById('q_' + id + '_0'));
}
function railKarten(lessonId){
  var grenze = today0() + DAY - 1, gesamt = 0, faellig = 0, neu = 0;
  CARDS.forEach(function(c){
    if(c.lessonId !== lessonId) return;
    gesamt++;
    var srs = state.srs[c.id];
    if(!srs) neu++;
    else if(srs.due <= grenze) faellig++;
  });
  return { gesamt: gesamt, neu: neu, faellig: faellig, sitzt: gesamt - neu };
}
function railLektion(lesson){
  var mod = moduleOfLesson(lesson.id);
  var fertig = mod.lessons.filter(function(l){ return state.completed.has(l.id); }).length;
  var pct = Math.round(fertig / mod.lessons.length * 100);
  var idx = FLAT.findIndex(function(l){ return l.id === lesson.id; });
  var next = FLAT[idx + 1];
  var k = railKarten(lesson.id);
  railBegriffe = railBegriffeSammeln(lesson.body);

  var h = '';

  /* 1 - Wo stehe ich in diesem Modul */
  h += '<section class="rail-karte"><div class="rail-kopf">' +
       '<span class="rail-augenbraue">Modul ' + (MODULES.indexOf(mod) + 1) +
       ' · Teil ' + mod.part + '</span>' +
       '<div class="ring" style="--pct:' + pct + '"><span>' + pct + '%</span></div></div>' +
       '<h2 class="rail-titel">' + esc(mod.title) + '</h2>' +
       '<ol class="rail-schritte">';
  mod.lessons.forEach(function(l, i){
    var zustand = state.completed.has(l.id) ? 'fertig'
                : (l.id === lesson.id ? 'aktiv' : 'offen');
    h += '<li class="rail-schritt ' + zustand + '">' +
         '<button type="button" onclick="selectLesson(\'' + l.id + '\')"' +
         (zustand === 'aktiv' ? ' aria-current="true"' : '') + '>' +
         '<span class="rs-punkt" aria-hidden="true">' +
         (zustand === 'fertig' ? '✓' : (i + 1)) + '</span>' +
         '<span class="rs-titel">' + esc(l.title) + '</span>' +
         '<span class="rs-min">' + l.minutes + ' min</span></button></li>';
  });
  h += '</ol><p class="rail-zahl zeile">' + fertig + ' von ' + mod.lessons.length +
       ' Lektionen abgeschlossen</p></section>';

  /* 2 - Die Begriffe, die diese Lektion traegt */
  if(railBegriffe.length >= 3){
    h += '<section class="rail-karte"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Schlüsselbegriffe</span>' +
         '<span class="rail-zahl">' + railBegriffe.length + '</span></div>' +
         '<div class="rail-begriffe">';
    railBegriffe.forEach(function(w, i){
      h += '<button type="button" class="rail-begriff" onclick="railSpringe(' + i + ')">' +
           esc(w) + '</button>';
    });
    h += '</div><p class="rail-fuss" style="margin-top:9px;">' +
         'Erklär jeden Begriff laut in einem Satz. Ein Klick springt zur Stelle ' +
         'im Text.</p></section>';
  }

  /* 3 - Merksatz, aber erst nach dem eigenen Versuch */
  if(lesson.tip){
    h += '<section class="rail-karte"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Merksatz</span></div>' +
         '<button type="button" class="rail-deck" id="railDeck" onclick="railMerksatz()">' +
         'Erst selbst sagen — dann aufdecken</button>' +
         '<p class="rail-tipp" id="railTipp" hidden>' + lesson.tip + '</p></section>';
  }

  /* 4 - Stand der Karten aus genau dieser Lektion */
  if(k.gesamt){
    var quote = Math.round(k.sitzt / k.gesamt * 100);
    h += '<section class="rail-karte' + (k.faellig ? ' ruf' : '') + '">' +
         '<div class="rail-kopf"><span class="rail-augenbraue">Selbstcheck</span>' +
         '<span class="rail-zahl">' + k.gesamt + ' Karten</span></div>' +
         '<div class="rail-balken"><i style="width:' + quote + '%"></i></div>' +
         '<p class="rail-text">' + k.sitzt + ' schon beantwortet' +
         (k.faellig ? ' · ' + k.faellig + ' heute fällig' : '') +
         (k.neu ? ' · ' + k.neu + ' noch offen' : '') + '</p>' +
         '<button type="button" class="rail-knopf' + (k.neu ? ' primaer' : '') +
         '" onclick="railZumCheck(\'' + lesson.id + '\')">Zum Kurz-Check</button>';
    if(k.faellig){
      h += '<button type="button" class="rail-knopf" onclick="selectLesson(\'review\')">' +
           k.faellig + ' Karten wiederholen</button>';
    }
    h += '</section>';
  }

  /* 5 - Was danach kommt */
  if(next){
    var nm = moduleOfLesson(next.id);
    h += '<section class="rail-karte"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Danach</span></div>' +
         '<h2 class="rail-titel">' + esc(next.title) + '</h2>' +
         '<p class="rail-text">' + esc(nm.title) + ' · ca. ' + next.minutes +
         ' Min.</p><button type="button" class="rail-knopf" ' +
         'onclick="selectLesson(\'' + next.id + '\')">Weiter →</button></section>';
  }

  return h;
}
function railStand(){
  var completed = typeof rpCompleted === 'function' ? rpCompleted() : state.completed.size;
  var pct = Math.round(completed / TOTAL * 100);
  var faellig = dueCards().length;
  var naechste = FLAT.find(function(l){ return !state.completed.has(l.id); }) || FLAT[0];
  var nm = moduleOfLesson(naechste.id);
  var ziel = state.tagesziel || 3;
  var heute = (state.dayCount && state.dayCount.day === todayKey()) ? state.dayCount.n : 0;
  var zielPct = Math.min(100, Math.round(heute / ziel * 100));
  var tage = pruefungsTage();
  var serie = (state.streak && state.streak.count) || 0;
  var offen = ziel - heute;

  var h = '<section class="rail-karte"><div class="rail-kopf">' +
    '<span class="rail-augenbraue">Heute</span>' +
    '<div class="ring" style="--pct:' + zielPct + '"><span>' + heute + '/' + ziel +
    '</span></div></div><p class="rail-text">' +
    (offen <= 0 ? 'Tagesziel erreicht. Alles Weitere ist Vorsprung.'
                : 'Noch ' + offen + ' Lektion' + (offen === 1 ? '' : 'en') +
                  ' bis zum Tagesziel.') + '</p>';
  if(serie > 0){
    h += '<p class="rail-zahl zeile">' + serie + ' Tag' +
         (serie === 1 ? '' : 'e') + ' in Folge · Bestwert ' +
         ((state.streak && state.streak.best) || serie) + '</p>';
  }
  h += '</section>';

  if(tage !== null){
    var proTag = Math.ceil((MODULES.filter(function(m){ return m.part < 10; }).reduce(function(a, m){ return a + m.lessons.filter(function(l){ return !state.completed.has(l.id); }).length; }, 0)) / Math.max(1, tage));   /* nur AP1-Teile */
    h += '<section class="rail-karte' + (tage >= 0 && tage <= 21 ? ' ruf' : '') + '">' +
         '<div class="rail-kopf"><span class="rail-augenbraue">AP1</span>' +
         '<span class="rail-zahl">' + (tage < 0 ? 'vorbei' : tage + ' Tage') +
         '</span></div><p class="rail-text">' +
         (tage < 0 ? 'Der Termin liegt hinter dir.'
          : tage === 0 ? 'Heute ist es so weit. Ruhig bleiben, Zeit einteilen.'
          : (completed >= TOTAL
             ? 'Der Kurs ist durch. Jetzt zählen Wiederholung und Prüfungssimulator.'
             : 'Bei ' + proTag + ' Lektion' + (proTag === 1 ? '' : 'en') +
               ' pro Tag bist du rechtzeitig durch.')) +
         '</p></section>';
  }

  h += '<section class="rail-karte"><div class="rail-kopf">' +
       '<span class="rail-augenbraue">Kurs</span>' +
       '<span class="rail-zahl">' + pct + '%</span></div>' +
       '<div class="rail-balken"><i style="width:' + pct + '%"></i></div>' +
       '<p class="rail-text">' + completed + ' von ' + TOTAL +
       ' Lektionen</p><button type="button" class="rail-knopf primaer" ' +
       'onclick="selectLesson(\'' + naechste.id + '\')">Weiterlernen</button>' +
       '<p class="rail-fuss" style="margin-top:9px;">' + esc(naechste.title) +
       '<br>' + esc(nm.title) + '</p></section>';

  if(faellig){
    h += '<section class="rail-karte ruf"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Wiederholen</span>' +
         '<span class="rail-zahl">' + faellig + '</span></div>' +
         '<p class="rail-text">Karten sind heute fällig. Wer sie liegen lässt, ' +
         'lernt sie später noch einmal von vorn.</p>' +
         '<button type="button" class="rail-knopf primaer" ' +
         'onclick="selectLesson(\'review\')">Jetzt wiederholen</button></section>';
  }

  return h;
}
function railAblage(){
  var h = '';
  var tage = pruefungsTage();
  if(tage !== null && tage >= 0){
    h += '<section class="rail-karte' + (tage <= 21 ? ' ruf' : '') + '">' +
         '<div class="rail-kopf"><span class="rail-augenbraue">Bis zur AP1</span>' +
         '<span class="rail-zahl">' + tage + ' Tage</span></div>' +
         '<p class="rail-text">' +
         (tage === 0 ? 'Heute ist es so weit. Ruhig bleiben, Zeit einteilen.'
          : 'Das sind ' + Math.floor(tage / 7) + ' volle Wochen und ' +
            (tage % 7) + ' Tage.') + '</p></section>';
  }

  var schwach = weakModules().slice(0, 3);
  if(schwach.length){
    h += '<section class="rail-karte ruf"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Wackelt noch</span></div>';
    schwach.forEach(function(w){
      var q = Math.round(w.rate * 100);
      h += '<div style="margin-bottom:10px;">' +
           '<p class="rail-text" style="font-weight:650;color:var(--text);">' +
           esc(w.title) + '</p>' +
           '<div class="rail-balken"><i style="width:' + q + '%"></i></div>' +
           '<p class="rail-fuss">' + q + ' % richtig aus ' + w.total +
           ' Antworten</p></div>';
    });
    h += '<button type="button" class="rail-knopf primaer" onclick="selectLesson(\'' +
         schwach[0].lessonId + '\')">Schwächste Stelle öffnen</button></section>';
  }

  var ids = Object.keys(state.merkzettel || {});
  h += '<section class="rail-karte"><div class="rail-kopf">' +
       '<span class="rail-augenbraue">Gemerkt</span>' +
       '<span class="rail-zahl">' + ids.length + '</span></div>';
  if(ids.length){
    ids.sort(function(a, b){ return state.merkzettel[b] - state.merkzettel[a]; })
       .slice(0, 5).forEach(function(id){
      var l = FLAT.find(function(x){ return x.id === id; });
      if(!l) return;
      h += '<button type="button" class="rail-knopf" style="text-align:left;' +
           'margin-top:6px;font-weight:500;" onclick="selectLesson(\'' + id + '\')">' +
           esc(l.title) + '</button>';
    });
    if(ids.length > 5){
      h += '<p class="rail-fuss" style="margin-top:9px;">und ' + (ids.length - 5) +
           ' weitere — alle im Merkzettel.</p>';
    }
  } else {
    h += '<p class="rail-text">Mit dem ☆ unter jeder Lektion sammelst du hier, ' +
         'was du kurz vor der Prüfung noch einmal sehen willst.</p>';
  }
  h += '</section>';

  var notizen = Object.keys(state.notizen || {}).length;
  if(notizen){
    h += '<section class="rail-karte"><div class="rail-kopf">' +
         '<span class="rail-augenbraue">Notizen</span>' +
         '<span class="rail-zahl">' + notizen + '</span></div>' +
         '<p class="rail-text">Deine eigenen Worte schlagen jede Zusammenfassung.</p>' +
         '<button type="button" class="rail-knopf" onclick="selectLesson(\'merk\')">' +
         'Zum Merkzettel</button></section>';
  }

  return h;
}
function renderRail(){
  var host = document.getElementById('rail');
  if(!host) return;
  var id = state.currentId;
  /* Pruefung und Klausur laufen auf Zeit - da stoert jede Nebenspalte. */
  if(id === 'exam' || id === 'klausur'){
    host.className = 'rail leer';
    host.innerHTML = '';
    return;
  }
  var lesson = lessonById(id);
  var uebersicht = (id === 'intro' || id === 'heute' || id === 'profile');
  host.className = 'rail';
  host.innerHTML = '<div class="rail-innen">' +
    (lesson ? railLektion(lesson) : (uebersicht ? railAblage() : railStand())) +
    '</div>';
}
function renderContent(){
  try{
    renderContentIntern();
  }catch(e){
    appFehler('Ansicht ' + state.currentId, e);
  }
  /* Die Randspalte darf eine Lektion nie blockieren. */
  try{
    renderRail();
  }catch(e){
    if(window.console && console.warn) console.warn('Lernbegleiter:', e);
  }
}
function renderContentIntern(){
  var el = document.getElementById('content');

  if(state.currentId === 'heute'){ el.innerHTML = renderHeute(); return; }
  if(state.currentId === 'tasten'){ el.innerHTML = renderTasten(); return; }
  if(state.currentId === 'recht'){ el.innerHTML = renderRecht(); return; }
  if(state.currentId === 'klausur'){ el.innerHTML = renderKlausur(); if(klausur.phase === 'laufend') klTicken(); return; }
  if(state.currentId === 'fehler'){ el.innerHTML = renderFehlerheft(); return; }
  if(state.currentId === 'merk'){ el.innerHTML = renderMerkzettel(); return; }
  if(state.currentId === 'glossar' && typeof rpGlossaryRender === 'function'){ el.innerHTML = rpGlossaryRender(); rpGlossaryWire(el); return; }
  if(state.currentId === 'profile'){ el.innerHTML = renderProfile(); updateSyncHint(); return; }
  if(state.currentId === 'tracer'){ el.innerHTML = renderTracer(); return; }
  if(state.currentId === 'subnet'){ el.innerHTML = renderSubnet(); return; }
  if(state.currentId === 'tutor'){ el.innerHTML = renderTutor(); wireTutor(); return; }
  if(state.currentId === 'exam'){ el.innerHTML = renderExam(); if(exam.active && !exam.finished) tickExam(); return; }
  if(state.currentId === 'review'){ el.innerHTML = renderReview(); return; }

  if(state.currentId === 'exercises'){
    el.innerHTML = renderExercises();
    return;
  }

  if(state.currentId === 'intro'){
    var partsHtml = lfFilterZeile() + PARTS.map(function(p){
      var mods = MODULES.filter(function(m){
        return m.part === p && (!lfFilter || lfVon(m.id) === lfFilter);
      });
      if(!mods.length) return '';
      var cards = mods.map(function(m){
        var gi = MODULES.indexOf(m)+1;
        return '<div class="module-card" onclick="selectLesson(\''+m.lessons[0].id+'\')">'+
          '<div class="mnum">MODUL '+gi+'</div><h3>'+esc(m.title)+'</h3>'+
          '<p>'+m.lessons.length+' Lektionen · '+m.lessons.reduce(function(a,l){return a+l.minutes;},0)+' Min.</p>'+
          relBadge(m.relevanz)+lfBadge(m.id)+'</div>';
      }).join('');
      return '<div class="part-heading">Teil '+p+' · '+esc(mods[0].partTitle)+'</div><div class="module-grid">'+cards+'</div>';
    }).join('');

    var nextLesson = FLAT.find(function(l){ return !state.completed.has(l.id); }) || FLAT[0];
    var nextMod = moduleOfLesson(nextLesson.id);
    var due = dueCards().length;
    var weak = weakModules();
    var lastExam = state.exams.length ? state.exams[state.exams.length - 1] : null;
    var completed = typeof rpCompleted === 'function' ? rpCompleted() : state.completed.size;
    var pct = Math.round((completed / TOTAL) * 100);
    var lpIntro = levelProgress();

    var today = '<div class="today-panel"><div class="today-head"><h2>Heute</h2>'+
      '<div style="display:flex;align-items:center;gap:10px;"><div class="ring" style="--pct:'+pct+'"><span>'+pct+'%</span></div>'+
      '<span style="font-size:.82rem;color:var(--text-dim);">'+completed+' von '+TOTAL+' Lektionen</span></div></div>';
    today += '<div class="today-grid">';
    today += '<div class="today-item accent" onclick="selectLesson(\''+nextLesson.id+'\')"><span class="ti-label">Weiterlernen</span>'+
             '<span class="ti-value" style="font-size:.98rem;line-height:1.3;">'+esc(nextLesson.title)+'</span>'+
             '<span class="ti-sub">Teil '+nextMod.part+' · '+esc(nextMod.title)+'</span></div>';
    today += '<div class="today-item '+(due?'due':'')+'" onclick="selectLesson(\'review\')"><span class="ti-label">Karten fällig</span>'+
             '<span class="ti-value">'+due+'</span><span class="ti-sub">'+(due ? 'Wiederholung startet sofort' : 'Nichts offen — gut so')+'</span></div>';
    today += '<div class="today-item" onclick="selectLesson(\'exam\')"><span class="ti-label">Letzte Prüfung</span>'+
             '<span class="ti-value">'+(lastExam ? Math.round(lastExam.score/lastExam.total*100)+'%' : '—')+'</span>'+
             '<span class="ti-sub">'+(lastExam ? lastExam.score+'/'+lastExam.total+' · erneut antreten' : 'Noch kein Durchlauf')+'</span></div>';
    if(weak.length){
      today += '<div class="today-item weak" onclick="selectLesson(\''+weak[0].lessonId+'\')"><span class="ti-label">Schwachstelle</span>'+
               '<span class="ti-value" style="font-size:.98rem;line-height:1.3;">'+esc(weak[0].title)+'</span>'+
               '<span class="ti-sub">'+Math.round(weak[0].rate*100)+'% Trefferquote · nacharbeiten</span></div>';
    } else {
      today += '<div class="today-item" onclick="selectLesson(\'tracer\')"><span class="ti-label">Trockendurchlauf</span>'+
               '<span class="ti-value">'+TRACES.length+'</span><span class="ti-sub">AP1-Kernkompetenz üben</span></div>';
    }
    today += '</div></div>';

    el.innerHTML =
      '<div class="intro-hero">'+
      '<h1>ROOTPFAD</h1>'+
      '<p class="intro-claim">Von der Wurzel bis zur Pr\u00fcfung \u2014 der Weg durch die AP1 '+
      'im Beruf Fachinformatiker f\u00fcr Anwendungsentwicklung.</p>'+
      '<p class="rb-trainiert"><span>Trainiert gezielt</span>'+
      '<span class="rb-rotate" aria-hidden="true"></span>'+
      '<span class="rb-sr">Pseudocode, SQL, UML, Subnetting, IPv6, Netzplantechnik, IT-Sicherheit, Datenschutz, KI sowie PHP, Laravel und Git</span></p>'+
      '<p class="intro-sub">'+MODULES.length+' Module mit '+TOTAL+' Lektionen in '+PARTS.length+' Teilen: Algorithmen und Pseudocode, Datenbanken und ER-Modellierung, UML und Softwareentwicklung, Netzwerktechnik mit Subnetting und IPv6, IT-Sicherheit und Datenschutz, Projektmanagement mit Netzplantechnik, Hardware und Arbeitsplatz, Service und Kommunikation sowie Künstliche Intelligenz, dazu als Zusatzteile PHP &amp; Laravel vom Einsteiger bis zum Experten sowie Git und Zusammenarbeit im Team. Dazu '+EXERCISES.length+' Prüfungsaufgaben in drei Schwierigkeitsstufen, '+TRACES.length+' Trockendurchläufe, '+BADGES.length+' Auszeichnungen, ein Subnetting-Trainer mit unbegrenzt vielen Aufgaben, '+DIAGRAMME+' Diagramme in den Lektionen, ein Formelblatt und sechs Trainingsmodi, die auf aktivem Abrufen statt Wiederlesen beruhen. Jedes Modul trägt einen Marker, wie häufig sein Thema in der AP1 vorkommt.</p>'+
      '</div>'+
      today+
      '<div class="stat-row">'+
        '<div class="stat-tile" style="cursor:pointer;border-color:var(--accent);" onclick="selectLesson(\'profile\')">'+
          '<div class="num">'+lpIntro.cur.icon+' '+(state.xp||0)+'</div><div class="lbl">XP · '+esc(lpIntro.cur.name)+'</div></div>'+
        '<div class="stat-tile"><div class="num">'+TOTAL+'</div><div class="lbl">Lektionen</div></div>'+
        '<div class="stat-tile"><div class="num">'+CARDS.length+'</div><div class="lbl">Abfragekarten</div></div>'+
        '<div class="stat-tile"><div class="num">'+EXERCISES.length+'</div><div class="lbl">Übungsaufgaben</div></div>'+
        '<div class="stat-tile"><div class="num">'+TRACES.length+'</div><div class="lbl">Trockendurchläufe</div></div>'+
        '<div class="stat-tile"><div class="num">~'+TOTAL_MIN+'</div><div class="lbl">Minuten Lesestoff</div></div>'+
      '</div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:6px;">'+
        '<button class="start-btn rb-star" onclick="selectLesson(\''+nextLesson.id+'\')">'+(state.completed.size ? 'Weiterlernen' : 'Los geht’s')+'</button>'+
        '<button class="start-btn ghost" onclick="selectLesson(\'exam\')">Prüfung simulieren</button>'+
        '<button class="start-btn ghost" onclick="selectLesson(\'tracer\')">Algorithmus durchspielen</button>'+
      '</div>'+
      '<div class="part-grid">'+partsHtml+'</div>';
    return;
  }

  if(state.currentId === 'cheatsheet'){
    el.innerHTML = '<div class="breadcrumb">Referenz</div><h1>Spickzettel</h1>'+
      '<p class="intro-sub">Kompakte Referenz über alle '+MODULES.length+' Module — Netzplanformeln, Subnetztabelle, OSI-Schichten, UML-Pfeile, SQL-Muster, Bezugskalkulation, Einheitenumrechnung, KI-Grundbegriffe mit den AI-Act-Risikoklassen und Prüfungstaktik auf einen Blick.</p>'+
      '<p class="druck-hinweis">Mit <kbd>Strg</kbd>+<kbd>P</kbd> lässt sich dieses Formelblatt sauber ausdrucken — ohne Navigation, auf weißem Grund, Abschnitte ohne Seitenumbruch.</p>'+
      CHEATSHEET_HTML;
    return;
  }

  var lesson = lessonById(state.currentId);
  if(!lesson){ state.currentId = 'intro'; return renderContent(); }
  var mod = moduleOfLesson(lesson.id);
  var idx = FLAT.findIndex(function(l){ return l.id===lesson.id; });
  var prev = FLAT[idx-1];
  var next = FLAT[idx+1];
  var done = state.completed.has(lesson.id);

  var html = '';
  html += '<div class="breadcrumb">Teil '+mod.part+' · '+esc(mod.title)+' · Lektion '+(mod.lessons.findIndex(function(l){return l.id===lesson.id;})+1)+'/'+mod.lessons.length+'</div>';
  html += '<div class="lesson-head"><div><h1>'+esc(lesson.title)+'</h1><div class="meta-row"><span>⏱ ca. '+lesson.minutes+' Min.</span> '+relBadge(mod.relevanz)+'</div></div>';
  html += '<label class="complete-toggle'+(done?' on':'')+'"><input type="checkbox" '+(done?'checked':'')+' onchange="toggleComplete(\''+lesson.id+'\', this.checked)"> '+(done?'Abgeschlossen':'Als abgeschlossen markieren')+'</label></div>';
  html += renderLessonBlocks(lesson);
  html += typeof rpPuzzleSection === 'function' ? rpPuzzleSection(lesson.id) : '';
  html += typeof rpVideoSection === 'function' ? rpVideoSection(lesson.id) : '';
  html += renderLektionWerkzeuge(lesson.id);
  if(lesson.tip){ html += '<div class="callout callout-tip"><div class="callout-label">★ Experten-Tipp</div><p>'+lesson.tip+'</p></div>'; }
  html += renderQuiz(lesson);

  html += '<div class="nav-buttons">';
  if(prev){
    html += '<button class="nav-btn" onclick="selectLesson(\''+prev.id+'\')"><span class="lbl">← Zurück</span><span>'+esc(prev.title)+'</span></button>';
  } else { html += '<span></span>'; }
  if(next){
    html += '<button class="nav-btn next" onclick="selectLesson(\''+next.id+'\')"><span class="lbl">Weiter →</span><span>'+esc(next.title)+'</span></button>';
  } else {
    html += '<button class="nav-btn next" onclick="selectLesson(\'cheatsheet\')"><span class="lbl">Weiter →</span><span>Zum Spickzettel</span></button>';
  }
  html += '</div>';

  el.innerHTML = html;
}
function openDrawer(){ document.getElementById('sidebar').classList.add('open'); document.getElementById('scrim').classList.add('open'); }
function closeDrawer(){ document.getElementById('sidebar').classList.remove('open'); document.getElementById('scrim').classList.remove('open'); }
document.getElementById('hamburger').onclick = openDrawer;
document.getElementById('rechtBtn').onclick = function(){ selectLesson('recht'); };
document.getElementById('scrim').onclick = closeDrawer;
document.getElementById('navIntro').onclick = function(){ selectLesson('intro'); };
document.getElementById('navProfile').onclick = function(){ selectLesson('profile'); };
document.getElementById('lvlChip').onclick = function(){ selectLesson('profile'); };
document.getElementById('navReview').onclick = function(){ selectLesson('review'); };
document.getElementById('navHeute').onclick = function(){ selectLesson('heute'); };
document.getElementById('navExam').onclick = function(){ selectLesson('exam'); };
document.getElementById('navTracer').onclick = function(){ tracer.id = null; selectLesson('tracer'); };
document.getElementById('navKlausur').onclick = function(){ selectLesson('klausur'); };
document.getElementById('navSubnet').onclick = function(){ selectLesson('subnet'); };
document.getElementById('navTutor').onclick = function(){ selectLesson('tutor'); };
document.getElementById('navExercises').onclick = function(){ selectLesson('exercises'); };
document.getElementById('navFehler').onclick = function(){ selectLesson('fehler'); };
document.getElementById('navMerk').onclick = function(){ selectLesson('merk'); };
document.getElementById('navSheet').onclick = function(){ selectLesson('cheatsheet'); };
document.getElementById('navGlossar').onclick = function(){ selectLesson('glossar'); };
document.getElementById('searchTrigger').onclick = kpOeffnen;
document.getElementById('resetBtn').onclick = function(){
  if(window.confirm('Setzt Lektionsfortschritt, Karteikarten, Statistik, Prüfungshistorie, XP, Level und Abzeichen zurück. Das lässt sich nicht rückgängig machen. Wirklich?')){
    state.completed = new Set();
    state.srs = {}; state.stats = {}; state.exams = [];
    state.xp = 0; state.xpLog = {}; state.badges = {}; state.solved = {};
    state.tracesDone = []; state.streak = { last:null, count:0, best:0 };
    state.cardsToday = { day:null, n:0 };
    saveProgress();
    render();
  }
};
document.addEventListener('keydown', function(e){
  /* Strg+K uebernimmt die neue Befehlssuche (Capture-Handler weiter oben). */
  var tag = (e.target && e.target.tagName) || '';
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;

  /* Karteikarten: 1-4 bewerten, Ziffern für Antwortauswahl */
  if(state.currentId === 'review' && review.queue.length && review.idx < review.queue.length){
    var card = review.queue[review.idx];
    if(review.picked === -1){
      var n = parseInt(e.key, 10);
      if(n >= 1 && n <= card.options.length){ e.preventDefault(); pickReview(n - 1); }
    } else {
      if(e.key === '1'){ e.preventDefault(); rateAndNext(0); }
      else if(e.key === '2'){ e.preventDefault(); rateAndNext(1); }
      else if(e.key === '3' || e.key === ' '){ e.preventDefault(); rateAndNext(2); }
      else if(e.key === '4'){ e.preventDefault(); rateAndNext(3); }
    }
    return;
  }
  /* Lektionen: Pfeiltasten blättern */
  var cur = lessonById(state.currentId);
  if(cur){
    var i = FLAT.findIndex(function(l){ return l.id === cur.id; });
    if(e.key === 'ArrowRight' && FLAT[i+1]){ selectLesson(FLAT[i+1].id); }
    else if(e.key === 'ArrowLeft' && FLAT[i-1]){ selectLesson(FLAT[i-1].id); }
  }
});
window.addEventListener('beforeunload', function(e){
  if(exam.active && !exam.finished){ e.preventDefault(); e.returnValue = ''; }
});
var dock = { offen:false };
function dockAnsichtName(){
  var l = lessonById(state.currentId);
  if(l){
    var m = moduleOfLesson(l.id);
    return m ? (m.title + ' \u00b7 ' + l.title) : l.title;
  }
  var namen = {
    heute:'Tagesplan', intro:'Kurs\u00fcbersicht', review:'Wiederholen',
    exam:'Pr\u00fcfungssimulator', klausur:'Mitschreib-Pr\u00fcfung',
    tracer:'Algorithmus-Trainer', subnet:'Subnetting-Trainer',
    exercises:'\u00dcbungsaufgaben', fehler:'Fehlerheft', merk:'Merkzettel',
    cheatsheet:'Spickzettel', profile:'Profil', tutor:'Tutor-Seite',
    tasten:'Tastaturhilfe'
  };
  return namen[state.currentId] || 'ROOTPFAD';
}
function dockKontext(){
  var l = lessonById(state.currentId);
  if(l){
    var m = moduleOfLesson(l.id);
    var auszug = '';
    try{ auszug = klText(renderLessonBlocks(l)).slice(0, 1600); }catch(e){}
    return 'KONTEXT (nur fuer dich, nicht von dir aus erwaehnen): Die lernende Person liest gerade ' +
      'die Lektion "' + l.title + '"' +
      (m ? ' aus dem Modul "' + m.title + '", Teil ' + m.part : '') + '.' +
      (auszug ? '\nAuszug aus dieser Lektion:\n' + auszug : '') +
      '\nBeziehe dich darauf, wenn die Frage dazu passt.';
  }
  return 'KONTEXT (nur fuer dich, nicht von dir aus erwaehnen): Die lernende Person ist gerade ' +
    'in der Ansicht "' + dockAnsichtName() + '" dieses Kurses.';
}
function dockVorschlaege(){
  if(lessonById(state.currentId)){
    return ['Erkl\u00e4r mir den Kern dieser Lektion in drei S\u00e4tzen.',
            'Welche Pr\u00fcfungsfalle steckt in diesem Thema?',
            'Stell mir eine AP1-Aufgabe dazu.'];
  }
  return ['Erkl\u00e4re mir Subnetting an einem Beispiel mit /26.',
          'Unterschied zwischen Datenschutz und Datensicherheit?',
          'Stell mir eine Netzplan-Aufgabe im AP1-Stil.'];
}
function dockOeffnen(){
  var f = document.getElementById('dockFenster');
  var k = document.getElementById('dockKnopf');
  if(!f || !k) return;
  dock.offen = true;
  f.hidden = false;
  k.hidden = true;
  var p = document.getElementById('dockPunkt');
  if(p) p.hidden = true;
  k.setAttribute('aria-expanded', 'true');
  dockZeichnen();
  var feld = document.getElementById('dockFeld');
  if(feld && !tutor.busy) feld.focus();
}
function dockSchliessen(){
  var f = document.getElementById('dockFenster');
  var k = document.getElementById('dockKnopf');
  dock.offen = false;
  if(f) f.hidden = true;
  if(k && !tutor.off){ k.hidden = false; k.setAttribute('aria-expanded', 'false'); }
}
function dockUmschalten(){ if(dock.offen){ dockSchliessen(); } else { dockOeffnen(); } }
function dockWachsen(feld){
  if(!feld) return;
  feld.style.height = 'auto';
  feld.style.height = Math.min(feld.scrollHeight, 132) + 'px';
}
function dockZeichnen(){
  if(!dock.offen) return;

  var k = document.getElementById('dockKontext');
  if(k) k.textContent = dockAnsichtName();

  var v = document.getElementById('dockVerlauf');
  if(v){
    if(!tutor.turns.length){
      v.innerHTML = '<div class="dock-leer">Frag alles zum Pr\u00fcfungsstoff. Der Tutor wei\u00df, ' +
        'wo du gerade bist, und verweist auf die passende Lektion. Jede Frage bringt ' + xpAnzeige(5) + ' XP.</div>';
    } else {
      var h = '';
      tutor.turns.forEach(function(t, i){
        var letzte = (i === tutor.turns.length - 1);
        if(t.role === 'user'){
          h += '<div class="dock-msg du"><span class="dock-rolle">Du</span>' +
               '<div class="dock-text">' + esc(t.content) + '</div></div>';
        } else {
          h += '<div class="dock-msg"><span class="dock-rolle">Tutor</span>' +
               '<div class="dock-text"' + (letzte ? ' id="dockLive"' : '') + '>' +
               (t.pending ? '<span class="dock-denkt">denkt nach \u2026</span>' : esc(t.content)) +
               '</div></div>';
        }
      });
      v.innerHTML = h;
      v.scrollTop = v.scrollHeight;
    }
  }

  var hw = document.getElementById('dockHinweis');
  if(hw){ hw.textContent = tutor.hinweis || ''; hw.hidden = !tutor.hinweis; }

  var chips = document.getElementById('dockChips');
  if(chips){
    if(tutor.turns.length || tutor.busy){
      chips.innerHTML = '';
      chips.hidden = true;
    } else {
      chips.hidden = false;
      chips.innerHTML = dockVorschlaege().map(function(t){
        return '<button type="button" class="dock-chip">' + esc(t) + '</button>';
      }).join('');
      Array.prototype.forEach.call(chips.children, function(b){
        b.onclick = function(){ dockFrage(b.textContent); };
      });
    }
  }

  var feld = document.getElementById('dockFeld');
  if(feld) feld.disabled = tutor.busy;
  var senden = document.getElementById('dockSende');
  if(senden) senden.disabled = tutor.busy;
  var stopp = document.getElementById('dockStopp');
  if(stopp) stopp.hidden = !tutor.busy;
}
function dockStart(){
  var knopf = document.getElementById('dockKnopf');
  var form = document.getElementById('dockForm');
  var feld = document.getElementById('dockFeld');
  if(!knopf || !form || !feld) return;

  knopf.onclick = dockUmschalten;
  document.getElementById('dockZu').onclick = dockSchliessen;
  document.getElementById('dockNeu').onclick = tutorNeu;
  document.getElementById('dockGross').onclick = function(){
    dockSchliessen();
    selectLesson('tutor');
  };
  document.getElementById('dockStopp').onclick = tutorAbbrechen;

  form.onsubmit = function(ev){ ev.preventDefault(); dockFrage(); };
  feld.oninput = function(){ dockWachsen(feld); };
  feld.onkeydown = function(ev){
    if(ev.key === 'Enter' && !ev.shiftKey){ ev.preventDefault(); dockFrage(); }
  };

  document.addEventListener('keydown', function(ev){
    if(ev.key !== 'Escape' || !dock.offen) return;
    var host = document.getElementById('paletteHost');
    if(host && host.firstChild) return;   /* die Suche schliesst sich selbst */
    dockSchliessen();
  });

  tutorInit().then(function(){
    if(tutor.fn && !tutor.off) knopf.hidden = false;
  });
}
function updateReadBar(){
  var bar = document.getElementById('readBar');
  if(!bar) return;
  var h = document.documentElement.scrollHeight - window.innerHeight;
  var pct = h > 40 ? Math.min(100, (window.scrollY / h) * 100) : 0;
  bar.style.width = pct + '%';
}
window.addEventListener('scroll', updateReadBar, { passive:true });
window.addEventListener('resize', updateReadBar);
document.documentElement.lang = 'de';
window.addEventListener('error', function(ev){
  appFehler('Skript', ev && (ev.message || ev.error));
});
window.addEventListener('unhandledrejection', function(ev){
  var r = ev && ev.reason;
  /* Abgebrochene Tutor-Anfragen sind kein Fehler. */
  if(r && (r.code === 'aborted' || r.name === 'AbortError')) return;
  appFehler('Hintergrund', r);
});
try{ if(localStorage.getItem('ap1-fokus') === '1') document.documentElement.setAttribute('data-fokus','1'); }catch(e){}
loadProgress();
render();
dockStart();
