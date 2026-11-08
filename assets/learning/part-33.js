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
        'wo du gerade bist, und verweist auf die passende Lektion. Jede Frage bringt 5 XP.</div>';
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
