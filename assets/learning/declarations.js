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
function rpQuestionId(lesson,index){ var q=lesson.quiz[index];return lesson.id+'#'+index+(q.revision?'@'+q.revision:''); }
function today0(){ var d = new Date(); d.setHours(0,0,0,0); return d.getTime(); }
function srsOf(id){ return state.srs[id] || null; }
function dueCards(){
  var t = today0() + DAY - 1;
  return CARDS.filter(function(c){
    var s = state.srs[c.id];
    return s && s.due <= t;
  });
}
function newCards(){ return CARDS.filter(function(c){ return !state.srs[c.id]; }); }
function rateCard(id, rating){
  var s = state.srs[id] || { ease:2.5, iv:0, due:today0(), reps:0, lapses:0 };
  if(rating === 0){
    s.ease = Math.max(1.3, s.ease - 0.20);
    s.iv = 0; s.lapses++; s.reps = 0;
    s.due = today0();
  } else {
    s.reps++;
    if(rating === 1){ s.ease = Math.max(1.3, s.ease - 0.15); s.iv = s.iv ? Math.max(1, Math.round(s.iv * 1.2)) : 1; }
    else if(rating === 2){ s.iv = s.reps === 1 ? 1 : (s.reps === 2 ? 3 : Math.round(s.iv * s.ease)); }
    else { s.ease = Math.min(3.2, s.ease + 0.15); s.iv = s.reps === 1 ? 3 : Math.round(s.iv * s.ease * 1.3); }
    s.iv = Math.min(s.iv, 365);
    s.due = today0() + s.iv * DAY;
  }
  s.ts = Date.now();
  state.srs[id] = s;
  saveProgress();
}
function recordAnswer(id, correct){
  var st = state.stats[id] || { right:0, wrong:0 };
  if(correct){ st.right++; } else { st.wrong++; }
  state.stats[id] = st;
}
function weakModules(){
  var agg = {};
  CARDS.forEach(function(c){
    var st = state.stats[c.id];
    if(!st) return;
    var a = agg[c.moduleTitle] || (agg[c.moduleTitle] = { right:0, wrong:0, lessonId:c.lessonId });
    a.right += st.right; a.wrong += st.wrong;
  });
  return Object.keys(agg).map(function(k){
    var a = agg[k], tot = a.right + a.wrong;
    return { title:k, rate: tot ? a.right / tot : 1, total:tot, lessonId:a.lessonId };
  }).filter(function(x){ return x.total >= 2 && x.rate < 0.8; })
    .sort(function(a,b){ return a.rate - b.rate; });
}
function rankFor(xp){
  var r = RANKS[0];
  for(var i = 0; i < RANKS.length; i++){ if(xp >= RANKS[i].xp) r = RANKS[i]; }
  return r;
}
function nextRank(xp){
  for(var i = 0; i < RANKS.length; i++){ if(xp < RANKS[i].xp) return RANKS[i]; }
  return null;
}
function levelProgress(){
  var xp = state.xp || 0, cur = rankFor(xp), nxt = nextRank(xp);
  if(!nxt) return { cur:cur, nxt:null, pct:100, need:0 };
  var span = nxt.xp - cur.xp;
  return { cur:cur, nxt:nxt, pct: Math.round(((xp - cur.xp) / span) * 100), need: nxt.xp - xp };
}
function todayKey(){
  var d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function bumpStreak(){
  var t = todayKey();
  var s = state.streak;
  if(s.last === t) return;
  var y = new Date(); y.setDate(y.getDate() - 1);
  var yKey = y.getFullYear()+'-'+String(y.getMonth()+1).padStart(2,'0')+'-'+String(y.getDate()).padStart(2,'0');
  s.count = (s.last === yKey) ? s.count + 1 : 1;
  s.last = t;
  s.best = Math.max(s.best || 0, s.count);
  if(s.count >= 3) grantBadge('streak3');
  if(s.count >= 7) grantBadge('streak7');
  if(s.count >= 14) grantBadge('streak14');
  if(s.count >= 30) grantBadge('streber');
}
function showToast(html, cls){
  var host = document.getElementById('toastHost');
  if(!host) return;
  var el = document.createElement('div');
  el.className = 'toast' + (cls ? ' ' + cls : '');
  el.innerHTML = html;
  host.appendChild(el);
  setTimeout(function(){ el.classList.add('out'); }, 2600);
  setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 3100);
}
function awardXp(amount, reason, once){
  if(once){
    if(state.xpLog[once]) return 0;
    state.xpLog[once] = 1;
  }
  var before = rankFor(state.xp || 0).lvl;
  state.xp = (state.xp || 0) + amount;
  bumpStreak();
  var after = rankFor(state.xp).lvl;
  showToast('<span class="t-xp">+'+amount+' XP</span><span class="t-reason">'+esc(reason)+'</span>');
  if(state.xp >= 1000) grantBadge('xp1000');
  if(state.xp >= 3000) grantBadge('xp3000');
  if(after > before) celebrateLevel(rankFor(state.xp));
  updateXpBar();
  saveProgress();
  return amount;
}
function grantBadge(id){
  if(state.badges[id]) return;
  var b = BADGE_BY_ID[id];
  if(!b) return;
  state.badges[id] = Date.now();
  showToast('<span class="t-xp">'+b.icon+' Abzeichen</span><span class="t-reason">'+esc(b.name)+'</span>', 'badge');
  state.xp = (state.xp || 0) + 25;
  updateXpBar();
  saveProgress();
}
function fokusElemente(wurzel){
  var sel = 'a[href], button:not([disabled]), input:not([disabled]), '+
            'textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.prototype.slice.call(wurzel.querySelectorAll(sel)).filter(function(el){
    return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
  });
}
function fokusFalle(wurzel, ev){
  if(ev.key !== 'Tab') return false;
  var f = fokusElemente(wurzel);
  if(!f.length) return false;
  var erst = f[0], letzt = f[f.length - 1];
  if(ev.shiftKey && document.activeElement === erst){ ev.preventDefault(); letzt.focus(); return true; }
  if(!ev.shiftKey && document.activeElement === letzt){ ev.preventDefault(); erst.focus(); return true; }
  return false;
}
function celebrateLevel(rank){
  var host = document.getElementById('toastHost');
  if(!host) return;
  var vorher = document.activeElement;
  var el = document.createElement('div');
  el.className = 'levelup';
  el.innerHTML = '<div class="lu-card" role="dialog" aria-modal="true" aria-label="Aufgestiegen">'+
    '<div class="lu-icon" aria-hidden="true">'+rank.icon+'</div>'+
    '<div class="lu-lbl">Aufgestiegen</div>'+
    '<div class="lu-name">'+esc(rank.name)+'</div>'+
    '<div class="lu-stufe">Level '+rank.lvl+' von '+RANKS.length+'</div>'+
    '<button class="check-btn" id="luWeiter" type="button">Weiter</button></div>';
  function luSchliessen(){
    el.remove();
    try{ if(vorher && vorher.focus) vorher.focus(); }catch(e){}
  }
  el.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape'){ ev.preventDefault(); luSchliessen(); return; }
    fokusFalle(el, ev);
  });
  host.appendChild(el);
  var weiter = el.querySelector('#luWeiter');
  if(weiter){ weiter.onclick = luSchliessen; weiter.focus(); }
}
function countLessonToday(){
  var heute = todayKey();
  if(!state.dayCount || state.dayCount.day !== heute) state.dayCount = { day:heute, n:0 };
  state.dayCount.n++;
}
function checkMilestones(){
  if(state.completed.size >= 1) grantBadge('first_lesson');
  if(state.completed.size >= Math.ceil(TOTAL / 2)) grantBadge('half_way');
  if(state.completed.size >= TOTAL) grantBadge('all_lessons');
  var anyModule = MODULES.some(function(m){
    return m.lessons.every(function(l){ return state.completed.has(l.id); });
  });
  if(anyModule) grantBadge('module_done');
  var part1 = MODULES.filter(function(m){ return m.part === 1; });
  if(part1.every(function(m){ return m.lessons.every(function(l){ return state.completed.has(l.id); }); })) grantBadge('part1_done');
  var nSolved = Object.keys(state.solved || {}).length;
  if(nSolved >= 5) grantBadge('solver5');
  if(nSolved >= EXERCISES.length) grantBadge('all_exercises');
  var experts = EXERCISES.filter(function(e){ return e.level === 3; });
  if(experts.length && experts.every(function(e){ return state.solved[e.id]; })) grantBadge('expert_solver');
  if((state.tracesDone || []).length >= 1) grantBadge('first_trace');
  if((state.tracesDone || []).length >= TRACES.length) grantBadge('all_traces');
  if(state.completed.size >= 10) grantBadge('deep_work');
  /* In jedem Kursteil mindestens eine Lektion begonnen */
  var touchedAll = PARTS.every(function(p){
    return MODULES.filter(function(m){ return m.part === p; })
      .some(function(m){ return m.lessons.some(function(l){ return state.completed.has(l.id); }); });
  });
  if(touchedAll) grantBadge('explorer');
  var allParts = PARTS.every(function(p){
    return MODULES.filter(function(m){ return m.part === p; })
      .every(function(m){ return m.lessons.every(function(l){ return state.completed.has(l.id); }); });
  });
  if(allParts) grantBadge('all_parts');

  /* Teilbezogene Auszeichnungen */
  var teilFertig = function(p){
    var mods = MODULES.filter(function(m){ return m.part === p; });
    return mods.length > 0 && mods.every(function(m){
      return m.lessons.every(function(l){ return state.completed.has(l.id); }); });
  };
  if(teilFertig(4)) grantBadge('kabelsalat');
  if(teilFertig(5)) grantBadge('paragraph');
  if(teilFertig(6)) grantBadge('erbsenzaehler');
  if(teilFertig(7)) grantBadge('schrauber');
  if(teilFertig(9)) grantBadge('maschinist');

  /* Auszeichnungen fuer die neuen Themenmodule */
  var modFertig = function(id){
    var mm = MODULES.filter(function(x){ return x.id === id; })[0];
    return !!mm && mm.lessons.every(function(l){ return state.completed.has(l.id); });
  };
  if(modFertig('m31')) grantBadge('netzwerker');
  if(modFertig('m34') && modFertig('m35')) grantBadge('objektifiziert');
  if(modFertig('m32') && modFertig('m33')) grantBadge('datenschuetzer');

  /* In jedem Kursteil mindestens ein Modul vollstaendig */
  var rund = PARTS.every(function(pt){
    return MODULES.filter(function(mm){ return mm.part === pt; })
      .some(function(mm){ return mm.lessons.every(function(l){ return state.completed.has(l.id); }); });
  });
  if(rund) grantBadge('allrounder');

  /* Richtig beantwortete Fragen zaehlen */
  var richtig = 0;
  Object.keys(state.stats || {}).forEach(function(k){ richtig += (state.stats[k].right || 0); });
  if(richtig >= 100) grantBadge('quizmeister');
  if(richtig >= 250) grantBadge('quizlegende');

  /* Alle Fragen der OOP-Module fehlerfrei */
  var oopIds = [];
  MODULES.filter(function(mm){ return mm.id === 'm34' || mm.id === 'm35'; })
    .forEach(function(mm){ mm.lessons.forEach(function(l){
      (l.quiz || []).forEach(function(q, qi){ oopIds.push(l.id + '#' + qi); }); }); });
  if(oopIds.length && oopIds.every(function(id){
       var st = state.stats[id]; return st && st.right > 0 && !st.wrong; })) grantBadge('kapselkoenig');

  if(state.dayCount && state.dayCount.n >= 25) grantBadge('marathon');

  /* Tageszeit und Wochentag - kleine Belohnung fuer ungewoehnliche Lernzeiten */
  var jetzt = new Date(), std = jetzt.getHours(), tag = jetzt.getDay();
  if(std < 5) grantBadge('night_owl');
  else if(std < 6) grantBadge('early_bird');
  if(tag === 0 || tag === 6) grantBadge('weekend');

  /* Tagespensum */
  var heute = todayKey();
  if(!state.dayCount || state.dayCount.day !== heute) state.dayCount = { day:heute, n:0 };
  if(state.dayCount.n >= 10) grantBadge('sitzfleisch');

  /* Komplettist zum Schluss: alle anderen Auszeichnungen vorhanden */
  var offen = BADGES.filter(function(b){ return b.id !== 'komplettist' && !state.badges[b.id]; });
  if(offen.length === 0) grantBadge('komplettist');
}
function updateXpBar(){
  var lp = levelProgress();
  var chip = document.getElementById('lvlChip');
  if(chip){
    chip.innerHTML = '<span class="lc-icon">'+lp.cur.icon+'</span><span class="lc-lvl">Lv '+lp.cur.lvl+'</span>'+
                     '<span class="lc-name">'+esc(lp.cur.name)+'</span>';
    chip.title = lp.nxt ? ('Noch ' + lp.need + ' XP bis „' + lp.nxt.name + '"') : 'Höchster Rang erreicht';
  }
  var bar = document.getElementById('xpFill');
  if(bar) bar.style.width = lp.pct + '%';
  var lab = document.getElementById('xpLabel');
  if(lab) lab.textContent = (state.xp || 0) + ' XP';
  var st = document.getElementById('streakChip');
  if(st){
    var c = state.streak.count || 0;
    st.hidden = c < 1;
    st.textContent = '🔥 ' + c;
    st.title = c + ' Tag(e) in Folge · Bestwert: ' + (state.streak.best || c);
  }
}
function lessonById(id){ return FLAT.find(function(l){ return l.id===id; }); }
function moduleOfLesson(id){ return MODULES.find(function(m){ return m.lessons.some(function(l){ return l.id===id; }); }); }
function serialize(){
  return {
    completed: Array.from(state.completed),
    srs: state.srs,
    stats: state.stats,
    exams: state.exams.slice(-20),
    xp: state.xp || 0,
    xpLog: state.xpLog,
    badges: state.badges,
    streak: state.streak,
    solved: state.solved,
    tracesDone: state.tracesDone,
    cardsToday: state.cardsToday,
    subnetSolved: state.subnetSolved || 0,
    dayCount: state.dayCount || null,
    tutorFragen: state.tutorFragen || 0,
    pruefungsdatum: state.pruefungsdatum || '',
    tagesziel: state.tagesziel || 3,
    notizen: state.notizen || {},
    ueTexte: state.ueTexte || {},
    merkzettel: state.merkzettel || {},
    klausuren: (state.klausuren || []).slice(-20),
    kalib: state.kalib || {},
    erklaerungen: state.erklaerungen || {},
    learning: state.learning || { events:{}, missions:{} },
    competencies: state.competencies || {submissions:{},variants:{},feedback:{}},
    updatedAt: Date.now()
  };
}
function mergeIn(data){
  if(!data) return;
  if(data.competencies&&typeof data.competencies==='object'){
    state.competencies=state.competencies||{submissions:{},variants:{},feedback:{}};
    ['submissions','variants','feedback'].forEach(function(kind){Object.keys(data.competencies[kind]||{}).forEach(function(key){var incoming=data.competencies[kind][key],mine=state.competencies[kind][key];if(incoming&&(!mine||(incoming.ts||0)>=(mine.ts||0)))state.competencies[kind][key]=incoming;});});
  }
  if(data.learning && typeof data.learning === 'object'){
    state.learning = state.learning || {events:{},missions:{}};
    Object.assign(state.learning.events, data.learning.events || {});
    Object.keys(data.learning.missions || {}).forEach(function(key){
      var incoming = data.learning.missions[key], mine = state.learning.missions[key];
      if(incoming && (!mine || incoming.ts > mine.ts)) state.learning.missions[key] = incoming;
    });
  }
  if(Array.isArray(data.completed)) data.completed.forEach(function(id){ state.completed.add(id); });
  if(data.srs && typeof data.srs === 'object'){
    Object.keys(data.srs).forEach(function(k){
      var incoming = data.srs[k], mine = state.srs[k];
      if(!mine || (incoming.ts || 0) > (mine.ts || 0)) state.srs[k] = incoming;
    });
  }
  if(data.stats && typeof data.stats === 'object'){
    Object.keys(data.stats).forEach(function(k){
      var inc = data.stats[k], mine = state.stats[k];
      if(!mine){ state.stats[k] = inc; }
      else { state.stats[k] = { right: Math.max(mine.right, inc.right||0), wrong: Math.max(mine.wrong, inc.wrong||0) }; }
    });
  }
  if(Array.isArray(data.exams)){
    var seen = {};
    state.exams.concat(data.exams).forEach(function(e){ if(e && e.ts) seen[e.ts] = e; });
    state.exams = Object.keys(seen).map(function(k){ return seen[k]; })
                    .sort(function(a,b){ return a.ts - b.ts; }).slice(-20);
  }
  /* Spielstand: immer der höhere/vollständigere Wert gewinnt */
  if(typeof data.xp === 'number') state.xp = Math.max(state.xp || 0, data.xp);
  if(typeof data.subnetSolved === 'number') state.subnetSolved = Math.max(state.subnetSolved || 0, data.subnetSolved);
  if(typeof data.tutorFragen === 'number') state.tutorFragen = Math.max(state.tutorFragen || 0, data.tutorFragen);
  if(data.pruefungsdatum && !state.pruefungsdatum) state.pruefungsdatum = data.pruefungsdatum;
  if(typeof data.tagesziel === 'number') state.tagesziel = data.tagesziel;
  if(data.notizen && typeof data.notizen === 'object'){
    state.notizen = state.notizen || {};
    Object.keys(data.notizen).forEach(function(k){ if(!state.notizen[k]) state.notizen[k] = data.notizen[k]; });
  }
  if(data.ueTexte && typeof data.ueTexte === 'object'){
    state.ueTexte = state.ueTexte || {};
    Object.keys(data.ueTexte).forEach(function(k){ if(!state.ueTexte[k]) state.ueTexte[k] = data.ueTexte[k]; });
  }
  if(Array.isArray(data.klausuren)){
    var bekannt = {};
    (state.klausuren || []).forEach(function(k){ bekannt[k.ts] = 1; });
    state.klausuren = (state.klausuren || []).concat(
      data.klausuren.filter(function(k){ return !bekannt[k.ts]; })
    ).sort(function(a,b){ return a.ts - b.ts; }).slice(-20);
  }
  /* Kalibrierung: je Stufe gewinnt der vollstaendigere Zaehler. Addieren
     wuerde beim Abgleich zweier Geraete doppelt zaehlen. */
  if(data.kalib && typeof data.kalib === 'object'){
    state.kalib = state.kalib || {};
    Object.keys(data.kalib).forEach(function(k){
      var inc = data.kalib[k] || {}, mine = state.kalib[k];
      if(!mine || (inc.n || 0) > (mine.n || 0)) state.kalib[k] = { n:inc.n||0, r:inc.r||0 };
    });
  }
  if(data.erklaerungen && typeof data.erklaerungen === 'object'){
    state.erklaerungen = state.erklaerungen || {};
    Object.keys(data.erklaerungen).forEach(function(k){
      var inc = data.erklaerungen[k], mine = state.erklaerungen[k];
      if(!mine || (inc.ts || 0) > (mine.ts || 0)) state.erklaerungen[k] = inc;
    });
  }
  if(data.merkzettel && typeof data.merkzettel === 'object'){
    state.merkzettel = state.merkzettel || {};
    Object.keys(data.merkzettel).forEach(function(k){ if(!state.merkzettel[k]) state.merkzettel[k] = data.merkzettel[k]; });
  }
  if(data.dayCount && data.dayCount.day === todayKey()){
    if(!state.dayCount || state.dayCount.day !== todayKey()) state.dayCount = { day:todayKey(), n:0 };
    state.dayCount.n = Math.max(state.dayCount.n, data.dayCount.n || 0);
  }
  if(data.xpLog) Object.keys(data.xpLog).forEach(function(k){ state.xpLog[k] = 1; });
  if(data.badges) Object.keys(data.badges).forEach(function(k){
    if(!state.badges[k]) state.badges[k] = data.badges[k];
  });
  if(data.solved) Object.keys(data.solved).forEach(function(k){
    if(!state.solved[k]) state.solved[k] = data.solved[k];
  });
  if(Array.isArray(data.tracesDone)) data.tracesDone.forEach(function(t){
    if(state.tracesDone.indexOf(t) === -1) state.tracesDone.push(t);
  });
  if(data.streak && (data.streak.count || 0) >= 0){
    var mine = state.streak || { count:0, best:0, last:null };
    state.streak = ((data.streak.last || '') > (mine.last || '')) ? data.streak : mine;
    state.streak.best = Math.max(mine.best || 0, data.streak.best || 0);
  }
  if(data.cardsToday && data.cardsToday.day === todayKey()){
    if(!state.cardsToday || state.cardsToday.day !== todayKey()) state.cardsToday = data.cardsToday;
    else state.cardsToday.n = Math.max(state.cardsToday.n, data.cardsToday.n);
  }
}
function loadLocal(){
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    if(raw) mergeIn(JSON.parse(raw));
  }catch(e){}
}
function saveLocal(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize()));
    speicherGewarnt = false;
  }catch(e){
    if(speicherGewarnt) return;
    speicherGewarnt = true;
    var voll = e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014);
    zeigeBanner('Dein Fortschritt wird nicht gespeichert.',
      voll
        ? 'Der Speicher dieses Browsers ist voll. Sichere deinen Stand im Profil ueber die '+
          'Zwischenablage und gib dort Platz frei, sonst geht die heutige Arbeit verloren.'
        : 'Dieser Browser erlaubt kein Speichern, etwa im privaten Fenster. Alles bleibt nur, '+
          'solange der Tab offen ist. Sichere deinen Stand im Profil ueber die Zwischenablage.',
      'localStorage: ' + ((e && e.name) || 'nicht verfuegbar'));
  }
}
async function initDb(){
  try{
    if(window.claude && window.claude.use){ db = await window.claude.use('db'); }
  }catch(e){ db = null; }
}
async function loadProgress(){
  loadLocal();
  render();
  await initDb();
  if(db){
    try{
      var snap = await db.doc('progress/state').get();
      if(snap.exists) mergeIn(snap.data());
    }catch(e){}
    render();
    subscribeProgress();
  }
  updateSyncHint();
  saveProgress();
}
async function saveProgress(){
  saveLocal();
  updateDueBadge();
  if(!db || dbSyncOff || savePending) return;
  savePending = true;
  setTimeout(function(){
    savePending = false;
    /* Die Kette stellt sicher, dass nie zwei Schreibvorgaenge auf dasselbe
       Dokument ueberlappen - das verlangt der db-Vertrag ausdruecklich. */
    dbWriteChain = dbWriteChain.then(function(){
      return db.doc('progress/state').set(serialize());
    }).catch(function(err){
      if(err && (err.code === 'revoked' || err.code === 'not_granted')) dbSyncOff = true;
    });
  }, 600);
}
function subscribeProgress(){
  if(!db || dbUnsub) return;
  try{
    dbUnsub = db.doc('progress/state').onSnapshot(function(snap){
      if(!snap.exists || snap.metadata.hasPendingWrites) return;
      mergeIn(snap.data());
      saveLocal();
      updateXpBar();
      updateDueBadge();
    }, function(err){
      dbUnsub = null;
      if(err && err.code === 'revoked'){ dbSyncOff = true; updateSyncHint(); }
    });
  }catch(e){ dbUnsub = null; }
}
function updateSyncHint(){
  var el = document.getElementById('syncHint');
  if(!el) return;
  var an = db && !dbSyncOff;
  el.textContent = an ? 'Geraeteabgleich aktiv' : 'nur auf diesem Geraet';
  el.className = 'sync-hint' + (an ? ' on' : '');
}
function exportProgress(){
  var payload = { kurs:'ap1-expertenpfad', version:1, exportiert:new Date().toISOString(), daten:serialize() };
  var text = JSON.stringify(payload);
  var ta = document.getElementById('ioArea');
  if(ta){ ta.value = text; ta.hidden = false; ta.select(); }
  try{
    navigator.clipboard.writeText(text).then(function(){
      showToast('<span class="t-xp">Kopiert</span><span class="t-reason">Fortschritt in der Zwischenablage</span>');
    }).catch(function(){
      showToast('<span class="t-xp">Bereit</span><span class="t-reason">Text unten markieren und kopieren</span>');
    });
  }catch(e){}
}
function showImport(){
  var ta = document.getElementById('ioArea');
  if(!ta) return;
  ta.value = ''; ta.hidden = false; ta.placeholder = 'Hier den exportierten Text einfuegen und dann auf Uebernehmen klicken.';
  ta.focus();
  var b = document.getElementById('ioApply'); if(b) b.hidden = false;
}
function applyImport(){
  var ta = document.getElementById('ioArea');
  if(!ta || !ta.value.trim()){ showToast('<span class="t-xp">Leer</span><span class="t-reason">Kein Text eingefuegt</span>'); return; }
  var obj;
  try{ obj = JSON.parse(ta.value); }
  catch(e){ showToast('<span class="t-xp">Fehler</span><span class="t-reason">Das ist kein gueltiger Export</span>'); return; }
  var daten = obj && obj.daten ? obj.daten : obj;
  if(!daten || typeof daten !== 'object' || !('completed' in daten || 'srs' in daten)){
    showToast('<span class="t-xp">Fehler</span><span class="t-reason">Unbekanntes Format</span>'); return;
  }
  mergeIn(daten);            /* additiv: der bisherige Stand bleibt erhalten */
  saveProgress();
  render();
  showToast('<span class="t-xp">Übernommen</span><span class="t-reason">Fortschritt zusammengeführt</span>');
}
function updateDueBadge(){
  var b = document.getElementById('dueBadge');
  if(!b) return;
  var n = dueCards().length;
  b.hidden = n === 0;
  b.textContent = n;
  b.className = 'mastery-pill' + (n > 0 ? ' bad' : '');
}
function toggleComplete(id, checked){
  if(checked){
    state.completed.add(id);
    awardXp(50, 'Lektion abgeschlossen', 'lesson:' + id);
    countLessonToday();
    checkMilestones();
  } else { state.completed.delete(id); }
  saveProgress();
  renderSidebar();
  renderProgressPill();
  renderContent();
}
function selectLesson(id){
  /* Laufende Prüfung nicht stillschweigend verwerfen. */
  if(exam.active && !exam.finished && id !== 'exam'){
    if(!window.confirm('Die laufende Prüfung wird abgebrochen. Fortfahren?')) return;
    stopExamTimer();
    exam.active = false;
  }
  if(klausur.phase === 'laufend' && id !== 'klausur'){
    if(!window.confirm('Die laufende Klausur wird verworfen. Fortfahren?')) return;
    klUhrStoppen(); klausur.phase = 'start';
  }
  if(id !== 'exam') stopExamTimer();
  state.currentId = id;
  weichRendern(render);
  closeDrawer();
  window.scrollTo(0,0);
  updateReadBar();
}
function render(){
  renderSidebar();
  renderMobilbar();
  renderProgressPill();
  updateXpBar();
  renderContent();
}
function renderProgressPill(){
  var completed = typeof rpCompleted === 'function' ? rpCompleted() : state.completed.size;
  var pct = TOTAL ? Math.round((completed/TOTAL)*100) : 0;
  document.getElementById('progressLabel').textContent = completed + '/' + TOTAL;
  document.getElementById('progressFill').style.width = pct + '%';
}
function renderSidebar(){
  var nav = document.getElementById('moduleNav');
  nav.innerHTML = '';
  var currentModule = moduleOfLesson(state.currentId);
  var lastPart = null;
  MODULES.forEach(function(m){
    if(m.part !== lastPart){
      var label = document.createElement('div');
      label.className = 'part-label';
      label.textContent = 'Teil ' + m.part + ' · ' + m.partTitle;
      nav.appendChild(label);
      lastPart = m.part;
    }
    var det = document.createElement('details');
    det.className = 'module';
    if(currentModule && currentModule.id === m.id) det.open = true;
    var doneInModule = m.lessons.filter(function(l){ return state.completed.has(l.id); }).length;
    var sum = document.createElement('summary');
    sum.innerHTML = '<span class="chev">▸</span><span>'+esc(m.title)+'</span><span class="mod-count">'+doneInModule+'/'+m.lessons.length+'</span>';
    det.appendChild(sum);
    m.lessons.forEach(function(l){
      var btn = document.createElement('button');
      var aktiv = state.currentId === l.id;
      btn.className = 'lesson-btn' + (aktiv ? ' active' : '');
      /* Die aktive Lektion nicht nur einfaerben, sondern auch ansagen. */
      if(aktiv) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
      var done = state.completed.has(l.id);
      btn.innerHTML = '<span class="check'+(done?' done':'')+'">'+(done?'✓':'')+'</span><span>'+esc(l.title)+'</span>';
      btn.onclick = function(){ selectLesson(l.id); };
      det.appendChild(btn);
    });
    nav.appendChild(det);
  });

  [['navHeute','heute'],['navIntro','intro'],['navProfile','profile'],['navReview','review'],['navExam','exam'],['navTracer','tracer'],['navKlausur','klausur'],['navSubnet','subnet'],['navTutor','tutor'],
   ['navExercises','exercises'],['navFehler','fehler'],['navMerk','merk'],['navSheet','cheatsheet']].forEach(function(p){
    var b = document.getElementById(p[0]);
    if(!b) return;
    var aktiv = state.currentId === p[1];
    b.className = 'nav-link' + (aktiv ? ' active' : '');
    if(aktiv) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  updateDueBadge();
}
function renderQuiz(lesson){
  if(!lesson.quiz || !lesson.quiz.length) return '';
  var html = '<div class="quiz"><h3>Kurz-Check</h3>';
  lesson.quiz.forEach(function(q, qi){
    html += '<fieldset class="qcard" id="q_'+lesson.id+'_'+qi+'"><legend>'+esc(q.q)+'</legend>';
    q.options.forEach(function(opt, oi){
      html += '<label class="opt"><input type="radio" name="rq_'+lesson.id+'_'+qi+'" value="'+oi+'"> <span>'+esc(opt)+'</span></label>';
    });
    html += '<div class="qfeedback" id="fb_'+lesson.id+'_'+qi+'"></div></fieldset>';
  });
  html += '<button class="check-btn" onclick="checkQuiz(\''+lesson.id+'\')">Antworten prüfen</button>';
  html += '<div class="ex-meta" id="quizNote_'+lesson.id+'" hidden></div></div>';
  return html;
}
function checkQuiz(lessonId){
  var lesson = lessonById(lessonId);
  var answeredAll = true;
  var gain = 0;
  lesson.quiz.forEach(function(q, qi){
    var sel = document.querySelector('input[name="rq_'+lessonId+'_'+qi+'"]:checked');
    var fb = document.getElementById('fb_'+lessonId+'_'+qi);
    if(!sel){
      answeredAll = false;
      fb.className = 'qfeedback show wrong';
      fb.textContent = 'Bitte wähle eine Antwort aus.';
      return;
    }
    var val = parseInt(sel.value, 10);
    var ok = val === q.correct;
    var cardId = rpQuestionId(lesson,qi);
    recordAnswer(cardId, ok);
    /* Antwort aus der Lektion heraus plant die Karte ins Wiederholungssystem ein. */
    if(ok){ if(!state.srs[cardId]) rateCard(cardId, 2); }
    else { rateCard(cardId, 0); }
    if(ok && !state.xpLog['quiz:' + cardId]){ state.xpLog['quiz:' + cardId] = 1; gain += 10; }

    if(ok){
      fb.className = 'qfeedback show correct';
      fb.textContent = '✓ Richtig. ' + q.explain;
    } else {
      fb.className = 'qfeedback show wrong';
      fb.textContent = '✗ Nicht ganz. Richtig ist: „' + q.options[q.correct] + '". ' + q.explain;
    }
  });
  if(gain) awardXp(gain, 'Quizfragen richtig');
  if(answeredAll){
    var note = document.getElementById('quizNote_'+lessonId);
    if(note){
      note.hidden = false;
      note.textContent = 'Diese Fragen sind jetzt im Wiederholungs-Trainer eingeplant — falsch beantwortete kommen heute noch einmal.';
    }
  }
  saveProgress();
  /* Der Lernbegleiter zaehlt die Karten dieser Lektion mit. */
  try{ renderRail(); }catch(e){}
}
function renderLessonBlocks(lesson){
  /* Reihenfolge der Text-/Codeblöcke: pro Lektion überschreibbar. */
  var order = lesson.order || ['body','code','code2','body2','code3','code4'];
  var html = '';
  order.forEach(function(key){
    var val = lesson[key];
    if(!val) return;
    if(key.indexOf('code') === 0){ html += codeBlock(val, lesson[key + 'Lang']); }
    else { html += '<div class="lesson-body">' + val + '</div>'; }
  });
  return html;
}
function setExFilter(lvl){ exFilter = lvl; renderContent(); }
function toggleHint(exId, idx){
  var el = document.getElementById('hint_'+exId+'_'+idx);
  if(el) el.hidden = !el.hidden;
}
function toggleSolution(exId){
  var el = document.getElementById('sol_'+exId);
  if(el) el.hidden = !el.hidden;
}
function togglePrompt(exId){
  var el = document.getElementById('prompt_'+exId);
  if(el) el.hidden = !el.hidden;
}
function toggleSolved(id){
  if(state.solved[id]){ delete state.solved[id]; }
  else {
    state.solved[id] = Date.now();
    awardXp(30, 'Übungsaufgabe gelöst', 'solved:' + id);
    checkMilestones();
  }
  saveProgress();
  renderContent();
}
function copyPrompt(exId){
  var ex = EXERCISES.find(function(e){ return e.id===exId; });
  if(!ex) return;
  var text =
    'Ich bereite mich auf die IHK-Abschlussprüfung Teil 1 als Fachinformatiker Anwendungsentwicklung vor (Level: '+LEVEL_NAMES[ex.level]+', Thema: '+ex.topic+') und habe folgende Prüfungsaufgabe bearbeitet.\n\n'+
    'AUFGABE:\n'+ex.title+' — '+ex.task.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()+'\n\n'+
    'MEINE LÖSUNG:\n[HIER DEINE LÖSUNG EINFÜGEN]\n\n'+
    'Bitte prüfe meine Lösung so, wie ein IHK-Prüfer sie bewerten würde:\n'+
    '1. Ist die Lösung fachlich korrekt? Falls nein: welcher konkrete Fall bricht?\n'+
    '2. Bekäme sie die volle Punktzahl? Fehlt ein Rechenweg, eine Begründung oder eine Einheit?\n'+
    '3. Steckt ein typischer Prüfungsfehler darin (Off-by-one, Faktor 8 zwischen Bit und Byte, MAX statt MIN im Netzplan, Skonto vom Listenpreis)?\n'+
    '4. Ist die Antwort zum Operator der Aufgabe passend formuliert — nennen, beschreiben, begründen oder berechnen?\n'+
    '5. Zeige eine Musterlösung und erkläre jede Abweichung kurz.\n\n'+
    'Sei konkret und ehrlich, keine Gefälligkeitsbewertung. Wenn meine Lösung gut ist, sag das auch.';
  var btn = document.getElementById('cp_'+exId);
  try{
    navigator.clipboard.writeText(text).then(function(){
      if(btn){ var old = btn.textContent; btn.textContent = '✓ Kopiert'; setTimeout(function(){ btn.textContent = old; }, 1600); }
    }).catch(function(){});
  }catch(e){}
}
function renderExercises(){
  var html = '<div class="breadcrumb">Praxis</div><h1>Übungsaufgaben</h1>'+
    '<p class="intro-sub">'+EXERCISES.length+' Prüfungsaufgaben in drei Schwierigkeitsstufen — mit gestaffelten Tipps und vollständiger Musterlösung samt Rechenweg. Unter jeder Aufgabe steht ein Schreibfeld: Trag deine eigene Lösung ein, und Claude korrigiert sie direkt hier — mit Punkten, Teilpunkten auf den Rechenweg und dem, was gefehlt hätte.</p>';

  html += '<div class="filter-row">';
  html += '<button class="filter-btn'+(exFilter===0?' active':'')+'" onclick="setExFilter(0)">Alle ('+EXERCISES.length+')</button>';
  [1,2,3].forEach(function(l){
    var count = EXERCISES.filter(function(e){ return e.level===l; }).length;
    html += '<button class="filter-btn'+(exFilter===l?' active':'')+'" onclick="setExFilter('+l+')">'+LEVEL_NAMES[l]+' ('+count+')</button>';
  });
  html += '</div>';

  var list = exFilter===0 ? EXERCISES : EXERCISES.filter(function(e){ return e.level===exFilter; });

  list.forEach(function(ex){
    html += '<div class="ex-card">';
    var solved = !!state.solved[ex.id];
    html += '<div class="ex-head"><h3 id="exh_'+ex.id+'" data-ok="'+(solved?'1':'0')+'">'+(solved?'<span style="color:var(--success);">✓ </span>':'')+esc(ex.title)+'</h3>'+
      '<span class="badge lvl'+ex.level+'">'+LEVEL_NAMES[ex.level]+'</span>'+
      '<span class="badge topic">'+esc(ex.topic)+'</span></div>';
    html += '<div class="ex-task">'+ex.task+'</div>';

    html += '<div class="ex-actions">';
    html += '<button class="ex-btn'+(solved?'':' primary')+'" id="sv_'+ex.id+'" onclick="toggleSolved(\''+ex.id+'\')">'+
            (solved ? '✓ Gelöst' : 'Als gelöst markieren +30 XP')+'</button>';
    ex.hints.forEach(function(h, i){
      html += '<button class="ex-btn" onclick="toggleHint(\''+ex.id+'\','+i+')">💡 Tipp '+(i+1)+'</button>';
    });
    html += '<button class="ex-btn" onclick="toggleSolution(\''+ex.id+'\')">✅ Lösung anzeigen</button>';
    html += '<button class="ex-btn primary" onclick="ueUmschalten(\''+ex.id+'\')">✍ Lösung schreiben &amp; prüfen lassen</button>';
    html += '</div>';

    ex.hints.forEach(function(h, i){
      html += '<div class="ex-panel hint" id="hint_'+ex.id+'_'+i+'" hidden><div class="hint-label">Tipp '+(i+1)+'</div><p>'+h+'</p></div>';
    });

    html += '<div id="sol_'+ex.id+'" hidden>'+codeBlock(ex.solution, ex.solutionLang)+
      '<div class="ex-panel"><strong>Hinweis zur Lösung:</strong> '+ex.solutionNote+'</div></div>';

    var ueTxt = (state.ueTexte || {})[ex.id] || '';
    var ueOffen = !!ue.offen[ex.id] || !!ueTxt || !!ue.erg[ex.id];
    var ueMax = KL_PUNKTE[ex.level] || 8;
    var ueHtml = ueErgHtml(ex.id);
    html += '<div class="ue" id="ue_'+ex.id+'"'+(ueOffen ? '' : ' hidden')+'>'+
      '<label class="ue-label" for="ueFeld_'+ex.id+'">Deine Lösung — Rechenweg mit Einheiten, Begründungen ausformuliert.</label>'+
      '<textarea class="ue-feld" id="ueFeld_'+ex.id+'" rows="4" spellcheck="false" '+
        'placeholder="Schreib so, wie du es in der Prüfung auf Papier tätest." '+
        'oninput="ueSchreiben(\''+ex.id+'\', this.value)" '+
        'onkeydown="ueTaste(event, \''+ex.id+'\')">'+esc(ueTxt)+'</textarea>'+
      '<div class="ue-leiste">'+
        '<button class="ex-btn primary" id="ueBtn_'+ex.id+'" onclick="uePruefen(\''+ex.id+'\')">Lösung prüfen lassen</button>'+
        '<button class="ex-btn" onclick="ueLeeren(\''+ex.id+'\')">Leeren</button>'+
        '<button class="ex-btn" onclick="togglePrompt(\''+ex.id+'\')">Prüfauftrag für den Chat</button>'+
        '<span class="ue-note" id="ueNote_'+ex.id+'">Strg + Enter prüft · '+ueMax+' Punkte möglich · +10 XP</span>'+
      '</div>'+
      '<div class="ue-erg" id="ueErg_'+ex.id+'"'+(ueHtml ? '' : ' hidden')+'>'+ueHtml+'</div>'+
      '</div>';

    html += '<div class="ex-panel" id="prompt_'+ex.id+'" hidden>'+
      '<p style="margin-bottom:8px;"><strong>So lässt du deine eigene Lösung prüfen:</strong> Kopiere den Prüfauftrag, füge ihn in VS Code in den Claude-Chat ein, ersetze den Platzhalter durch deinen Code — und du bekommst ein ehrliches Review statt nur „richtig/falsch".</p>'+
      '<button class="ex-btn primary" id="cp_'+ex.id+'" onclick="copyPrompt(\''+ex.id+'\')">Prüfauftrag kopieren</button>'+
      '<div class="ex-meta">Enthält: Aufgabenstellung, Platzhalter für deine Lösung und fünf konkrete Prüfkriterien (fachliche Korrektheit, Punktwürdigkeit, typische Prüfungsfehler, Operatorbezug, Musterlösung).</div>'+
      '</div>';

    html += '</div>';
  });

  return html;
}
function ueUmschalten(exId){
  var box = document.getElementById('ue_' + exId);
  if(!box) return;
  box.hidden = !box.hidden;
  ue.offen[exId] = !box.hidden;
  if(!box.hidden){
    if(!tutor.ready) tutorInit();
    var f = document.getElementById('ueFeld_' + exId);
    if(f) f.focus();
  }
}
function ueSchreiben(exId, wert){
  state.ueTexte = state.ueTexte || {};
  var w = String(wert == null ? '' : wert);
  if(w.trim()) state.ueTexte[exId] = w; else delete state.ueTexte[exId];
  clearTimeout(ue.speichern);
  ue.speichern = setTimeout(saveProgress, 900);
}
function ueTaste(ev, exId){
  if((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter'){ ev.preventDefault(); uePruefen(exId); }
}
function ueLeeren(exId){
  var f = document.getElementById('ueFeld_' + exId);
  if(f){ f.value = ''; f.focus(); }
  ueSchreiben(exId, '');
  delete ue.erg[exId];
  delete ue.fehler[exId];
  ueErgZeichnen(exId);
  var n = document.getElementById('ueNote_' + exId);
  if(n){ n.className = 'ue-note'; n.textContent = 'Strg + Enter prüft · +10 XP'; }
}
function ueKnopfStand(exId){
  var b = document.getElementById('ueBtn_' + exId);
  if(!b) return;
  b.disabled = !!ue.busy[exId];
  b.textContent = ue.busy[exId] ? 'Claude korrigiert …' : 'Lösung prüfen lassen';
}
function ueErgZeichnen(exId){
  var box = document.getElementById('ueErg_' + exId);
  if(!box) return;
  var h = ueErgHtml(exId);
  box.innerHTML = h;
  box.hidden = !h;
}
function ueErgHtml(exId){
  if(ue.busy[exId]){
    return '<div class="ue-warten"><span class="kl-spinner" aria-hidden="true"></span>'+
           '<span>Claude liest deine Lösung gegen die Musterlösung und vergibt Teilpunkte auf den Rechenweg.</span></div>';
  }
  if(ue.fehler[exId]){
    return '<div class="kl-rueck luecke"><span class="kl-rueck-lbl">Kein Ergebnis</span>'+esc(ue.fehler[exId])+'</div>';
  }
  var r = ue.erg[exId];
  if(!r) return '';
  var q = r.max ? r.punkte / r.max : 0;
  var klasse = q >= 0.8 ? 'gut' : (q >= 0.5 ? 'teils' : 'schwach');
  var h = '<div class="ue-kopf"><span class="ue-punkte '+klasse+'">'+r.punkte+' / '+r.max+' Punkte</span>'+
          (r.urteil ? '<span class="ue-urteil">'+esc(r.urteil)+'</span>' : '')+'</div>';
  if(r.staerken) h += '<div class="kl-rueck gut"><span class="kl-rueck-lbl">Das war richtig</span>'+esc(r.staerken)+'</div>';
  if(r.luecken)  h += '<div class="kl-rueck luecke"><span class="kl-rueck-lbl">Das hat gefehlt</span>'+esc(r.luecken)+'</div>';
  if(r.tipp)     h += '<div class="kl-rueck tipp"><span class="kl-rueck-lbl">Fürs nächste Mal</span>'+esc(r.tipp)+'</div>';
  h += '<div class="ex-meta">Eine Einschätzung, kein amtliches Ergebnis — im Zweifel zählt die Musterlösung. '+
       'Mit „Lösung anzeigen“ vergleichst du selbst.</div>';
  return h;
}
function ueFehlertext(code){
  switch(code){
    case 'not_granted':
    case 'not_declared':
    case 'capability_disabled':
    case 'sampling_disabled':
      return 'Die Prüfung durch Claude ist hier nicht freigegeben. Vergleiche über „Lösung anzeigen“ selbst — '+
             'oder nimm den Prüfauftrag mit in den Chat.';
    case 'rate_limited':
      return 'Gerade zu viele Anfragen. Warte einen Moment und prüfe dann erneut — dein Text bleibt stehen.';
    case 'session_expired':
      return 'Deine Sitzung ist abgelaufen. Melde dich neu an und prüfe noch einmal.';
    case 'prompt_too_large':
      return 'Deine Lösung ist zu lang für eine Bewertung. Kürze sie auf den Rechenweg und das Ergebnis.';
    case 'refused':
      return 'Diese Antwort konnte nicht bewertet werden. Formuliere sie bitte anders.';
    case 'invalid_json':
    case 'empty_completion':
      return 'Die Bewertung kam nicht in verwertbarer Form zurück. Versuch es gleich noch einmal.';
    default:
      return 'Die Prüfung hat nicht geklappt. Versuch es gleich noch einmal — dein Text bleibt stehen.';
  }
}
function ueGeloestAnzeigen(exId){
  var b = document.getElementById('sv_' + exId);
  if(b){ b.className = 'ex-btn'; b.textContent = '✓ Gelöst'; }
  var h = document.getElementById('exh_' + exId);
  if(h && h.getAttribute('data-ok') !== '1'){
    h.setAttribute('data-ok', '1');
    h.insertAdjacentHTML('afterbegin', '<span style="color:var(--success);">✓ </span>');
  }
}
async function uePruefen(exId){
  var ex = EXERCISES.find(function(e){ return e.id === exId; });
  if(!ex || ue.busy[exId]) return;

  var feld = document.getElementById('ueFeld_' + exId);
  var text = (feld ? feld.value : ((state.ueTexte || {})[exId] || '')).trim();
  var note = document.getElementById('ueNote_' + exId);
  if(!text){
    if(note){ note.className = 'ue-note warn'; note.textContent = 'Schreib zuerst etwas ins Feld — ein angefangener Rechenweg reicht.'; }
    if(feld) feld.focus();
    return;
  }
  if(note){ note.className = 'ue-note'; note.textContent = 'Strg + Enter prüft · +10 XP'; }

  if(!tutor.ready) await tutorInit();
  if(!tutor.fn){
    delete ue.erg[exId];
    ue.fehler[exId] = ueFehlertext('not_granted');
    ueErgZeichnen(exId);
    var p = document.getElementById('prompt_' + exId);
    if(p) p.hidden = false;
    return;
  }

  ue.busy[exId] = true;
  delete ue.erg[exId];
  delete ue.fehler[exId];
  ueKnopfStand(exId);
  ueErgZeichnen(exId);

  var max = KL_PUNKTE[ex.level] || 8;
  var anweisung = [
    'Du bist Korrektor der IHK-Abschlusspruefung Teil 1 im Beruf Fachinformatiker fuer',
    'Anwendungsentwicklung. Bewerte die Loesung eines Prueflings zu EINER Aufgabe.',
    '',
    'BEWERTUNGSREGELN:',
    '- Bewerte streng, aber fair, so wie ein echter Korrektor.',
    '- Der RECHENWEG zaehlt: Teilpunkte fuer richtige Ansaetze, auch wenn das Endergebnis falsch ist.',
    '- Ein richtiges Ergebnis ohne nachvollziehbaren Weg bekommt nicht die volle Punktzahl.',
    '- Einheiten, Rundungen und ausformulierte Begruendungen gehoeren dazu.',
    '- Die Musterloesung ist nicht der einzige Weg: ein anderer, fachlich richtiger Weg ist voll zu werten.',
    '- Eine leere oder themenfremde Antwort bekommt 0 Punkte.',
    '- Erfinde keine Paragraphen, Normen, Zahlen oder Fristen.',
    '',
    'Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in genau dieser Form:',
    '{"punkte": 6, "max": ' + max + ', "urteil": "ein Halbsatz, z. B. im Kern richtig, Einheit fehlt",',
    ' "staerken": "ein bis zwei Saetze, was richtig war",',
    ' "luecken": "ein bis drei Saetze, was fehlt oder falsch ist",',
    ' "tipp": "ein Satz, worauf der Pruefling beim naechsten Mal achten soll"}',
    'Auf Deutsch, mit Du-Anrede. Kein Text vor oder nach dem JSON.',
    '',
    'AUFGABE (' + max + ' Punkte, Thema: ' + ex.topic + ', Stufe: ' + (LEVEL_NAMES[ex.level] || '') + ')',
    ex.title,
    klText(ex.task).slice(0, 1600),
    '',
    'MUSTERLOESUNG:',
    String(ex.solution || '').slice(0, 2400),
    '',
    'HINWEIS ZUR BEWERTUNG:',
    klText(ex.solutionNote || '').slice(0, 800),
    '',
    'ANTWORT DES PRUEFLINGS:',
    text.slice(0, 2400)
  ].join('\n');

  try{
    var r = await kiJson(anweisung, 'complex');
    if(Array.isArray(r)) r = r[0];
    if(!r || typeof r !== 'object') throw { code:'invalid_json' };
    var punkte = Math.max(0, Math.min(max, Math.round(Number(r.punkte) || 0)));
    ue.erg[exId] = {
      punkte: punkte,
      max: max,
      urteil: String(r.urteil || ''),
      staerken: String(r.staerken || ''),
      luecken: String(r.luecken || ''),
      tipp: String(r.tipp || '')
    };
    awardXp(10, 'Lösung prüfen lassen', 'uepruef:' + exId);
    state.tutorFragen = (state.tutorFragen || 0) + 1;
    if(state.tutorFragen >= 1) grantBadge('tutor_fan');
    if(state.tutorFragen >= 25) grantBadge('tutor_profi');
    if(punkte >= max * 0.8 && !state.solved[exId]){
      state.solved[exId] = Date.now();
      awardXp(30, 'Übungsaufgabe gelöst', 'solved:' + exId);
      checkMilestones();
      ueGeloestAnzeigen(exId);
    }
    saveProgress();
  }catch(e){
    ue.fehler[exId] = ueFehlertext(e && e.code);
  }finally{
    ue.busy[exId] = false;
    ueKnopfStand(exId);
    ueErgZeichnen(exId);
  }
}
function shuffled(arr){
  var a = arr.slice();
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function setzeKonf(k){
  if(review.picked !== -1) return;   /* nach dem Aufdecken nicht mehr aenderbar */
  review.konf = (review.konf === k) ? null : k;
  renderContent();
}
function merkeKonf(ok){
  if(!review.konf) return;
  state.kalib = state.kalib || {};
  var e = state.kalib[review.konf] || { n:0, r:0 };
  e.n++; if(ok) e.r++;
  state.kalib[review.konf] = e;
}
function kalibQuote(k){
  var e = (state.kalib || {})[k];
  if(!e || !e.n) return null;
  return e.r / e.n;
}
function startReview(mode){
  var pool;
  if(mode === 'new'){ pool = shuffled(newCards()).slice(0, 12); }
  else if(mode === 'weak'){
    pool = shuffled(CARDS.filter(function(c){
      var s = state.stats[c.id];
      return s && s.wrong > 0;
    })).slice(0, 15);
  } else { pool = shuffled(dueCards()); }
  review = { queue:pool, idx:0, picked:-1, right:0, done:0, mode:mode };
  state.currentId = 'review';
  render();
}
function pickReview(i){
  if(review.picked !== -1) return;
  review.picked = i;
  var card = review.queue[review.idx];
  var ok = i === card.correct;
  review.done++;
  if(ok) review.right++;
  var hadWrong = state.stats[card.id] && state.stats[card.id].wrong > 0;
  recordAnswer(card.id, ok);
  merkeKonf(ok);
  if(ok && hadWrong) grantBadge('comeback');
  /* Dreimal daneben und trotzdem geknackt */
  if(ok && state.stats[card.id] && state.stats[card.id].wrong >= 3) grantBadge('dickkopf');

  var tk = todayKey();
  if(!state.cardsToday || state.cardsToday.day !== tk) state.cardsToday = { day:tk, n:0 };
  state.cardsToday.n++;
  if(state.cardsToday.n >= 25) grantBadge('cards25');
  if(state.cardsToday.n >= 50) grantBadge('cards50');

  if(ok){
    var s = state.srs[card.id];
    awardXp(5 + ((s && s.iv >= 7) ? 3 : 0), 'Karte gewusst');
  }
  renderContent();
}
function rateAndNext(rating){
  var card = review.queue[review.idx];
  rateCard(card.id, rating);
  review.idx++;
  review.picked = -1;
  review.konf = null;
  renderContent();
  renderSidebar();
}
function renderReview(){
  var due = dueCards().length, fresh = newCards().length;

  if(!review.queue.length || review.idx >= review.queue.length){
    var finished = review.done > 0;
    var h = '<div class="breadcrumb">Training</div><h1>Wiederholen</h1>';
    if(finished){
      var pct = Math.round((review.right / review.done) * 100);
      h += '<div class="score-hero"><div class="score-num '+(pct>=70?'score-pass':'score-fail')+'">'+pct+'%</div>'+
           '<div class="score-sub">'+review.right+' von '+review.done+' richtig · Session abgeschlossen</div></div>';
    } else {
      h += '<p class="intro-sub">Aktives Abrufen schlägt Wiederlesen — deutlich. Jede Frage aus allen '+TOTAL+' Lektionen wird hier nach dem Vergessenskurven-Prinzip wieder vorgelegt: richtig beantwortete Karten kommen in immer größeren Abständen, falsche noch am selben Tag.</p>';
    }
    h += '<div class="today-grid" style="margin-top:20px;">';
    h += '<div class="today-item '+(due?'due accent':'')+'" onclick="startReview(\'due\')"><span class="ti-label">Heute fällig</span><span class="ti-value">'+due+'</span><span class="ti-sub">'+(due?'Jetzt wiederholen':'Alles erledigt 🎉')+'</span></div>';
    h += '<div class="today-item" onclick="startReview(\'new\')"><span class="ti-label">Neue Karten</span><span class="ti-value">'+fresh+'</span><span class="ti-sub">12 neue lernen</span></div>';
    var weakCount = CARDS.filter(function(c){ var s = state.stats[c.id]; return s && s.wrong > 0; }).length;
    h += '<div class="today-item '+(weakCount?'weak':'')+'" onclick="startReview(\'weak\')"><span class="ti-label">Fehlerkarten</span><span class="ti-value">'+weakCount+'</span><span class="ti-sub">Gezielt nachholen</span></div>';
    h += '</div>';

    var learned = CARDS.filter(function(c){ return !!state.srs[c.id]; }).length;
    h += '<div class="ex-panel" style="margin-top:22px;"><strong>Dein Kartenstand:</strong> '+learned+' von '+CARDS.length+' Karten im System. '+
         (learned < CARDS.length ? 'Karten landen automatisch hier, sobald du das Quiz einer Lektion beantwortest — oder du startest sie direkt über „Neue Karten".' : 'Alle Karten sind eingeplant.')+'</div>';
    return h;
  }

  var card = review.queue[review.idx];
  var revealed = review.picked !== -1;
  var s = srsOf(card.id);
  var html = '<div class="srs-stage">';
  html += '<div class="srs-progress"><span>'+(review.idx+1)+' / '+review.queue.length+'</span>'+
          '<div class="srs-bar"><div style="width:'+Math.round((review.idx/review.queue.length)*100)+'%"></div></div>'+
          '<span>'+review.right+' richtig</span>'+
          '<button class="ex-btn" style="padding:4px 10px;" onclick="review.queue=[];renderContent();">Beenden</button></div>';

  html += '<div class="srs-card">';
  html += '<div class="srs-meta"><span class="badge topic">'+esc(card.moduleTitle)+'</span>'+
          (s ? '<span class="mastery-pill">Intervall: '+(s.iv||0)+' Tage</span>' : '<span class="mastery-pill mid">neue Karte</span>')+'</div>';
  html += '<div class="srs-q">'+esc(card.q)+'</div>';

  if(!revealed){
    html += '<div class="konf"><span class="konf-frage">Wie sicher bist du — <em>bevor</em> du antwortest?</span>'+
      '<div class="konf-reihe">';
    KONF_STUFEN.forEach(function(st){
      html += '<button type="button" class="konf-btn'+(review.konf === st.k ? ' an' : '')+'" '+
        'aria-pressed="'+(review.konf === st.k ? 'true' : 'false')+'" '+
        'onclick="setzeKonf(\''+st.k+'\')">'+st.t+
        '<span class="konf-sub">'+st.s+'</span></button>';
    });
    html += '</div></div>';
  } else if(review.konf){
    var korrekt = review.picked === card.correct;
    var urteil = (review.konf === 'sicher' && !korrekt)
      ? { cls:'warn', txt:'Du warst dir sicher und lagst daneben. Genau diese Karten kosten in der Prüfung Punkte — sie kommt bewusst bald wieder.' }
      : (review.konf === 'geraten' && korrekt)
        ? { cls:'ok', txt:'Geraten und getroffen. Das zählt noch nicht als Wissen — die Karte bleibt im kurzen Takt.' }
        : { cls:'', txt:'Einschätzung und Ergebnis passen zusammen.' };
    html += '<div class="konf-echo '+urteil.cls+'">'+urteil.txt+'</div>';
  }

  html += '<div class="srs-opts">';
  card.options.forEach(function(opt, i){
    var cls = '';
    if(revealed){
      if(i === card.correct) cls = ' correct';
      else if(i === review.picked) cls = ' wrong';
    }
    html += '<button class="srs-opt'+cls+'" '+(revealed?'disabled':'')+' onclick="pickReview('+i+')">'+esc(opt)+'</button>';
  });
  html += '</div>';

  if(revealed){
    html += '<div class="srs-explain">'+(review.picked === card.correct ? '✓ ' : '✗ ')+esc(card.explain)+
            ' <button class="ex-btn" style="padding:3px 9px;margin-left:6px;" onclick="selectLesson(\''+card.lessonId+'\')">Zur Lektion</button></div>';
    html += '<div><div class="ti-label" style="margin-bottom:6px;">Wie sicher saß das?</div><div class="rate-row">'+
      '<button class="rate-btn again" onclick="rateAndNext(0)">Nochmal<span class="rt-sub"><kbd>1</kbd> heute erneut</span></button>'+
      '<button class="rate-btn" onclick="rateAndNext(1)">Schwer<span class="rt-sub"><kbd>2</kbd> kurzes Intervall</span></button>'+
      '<button class="rate-btn" onclick="rateAndNext(2)">Gut<span class="rt-sub"><kbd>3</kbd> normal</span></button>'+
      '<button class="rate-btn easy" onclick="rateAndNext(3)">Einfach<span class="rt-sub"><kbd>4</kbd> langes Intervall</span></button>'+
      '</div></div>';
  }
  html += '</div></div>';
  return html;
}
function stopExamTimer(){ if(exam.timer){ clearInterval(exam.timer); exam.timer = null; } }
function gewichtetZiehen(pool, n){
  var rest = pool.map(function(c){
    var t = state.stats[c.id];
    var g = 1.0;
    if(t && (t.right + t.wrong) > 0){
      var q = t.right / (t.right + t.wrong);
      g = 0.35 + (1 - q) * 2.4;
    }
    return { c:c, g:g };
  });
  var raus = [];
  var ziel = Math.min(n, rest.length);
  while(raus.length < ziel && rest.length){
    var summe = rest.reduce(function(a, x){ return a + x.g; }, 0);
    var wurf = Math.random() * summe, i = 0;
    while(i < rest.length - 1 && wurf > rest[i].g){ wurf -= rest[i].g; i++; }
    raus.push(rest[i].c);
    rest.splice(i, 1);
  }
  return raus;
}
function startExam(modeId){
  var mode = EXAM_MODES[modeId];
  var pool = CARDS.slice();
  if(mode.parts) pool = pool.filter(function(c){ return mode.parts.indexOf(c.part) !== -1; });
  else if(!mode.allPaths) pool = pool.filter(function(c){ return c.part >= 1 && c.part <= 9; });
  if(mode.nurFehler){
    pool = shuffled(pool.filter(function(c){ var t = state.stats[c.id]; return t && t.wrong > 0; }));
  } else if(mode.weak){
    var bad = pool.filter(function(c){ var t = state.stats[c.id]; return t && t.wrong > 0; });
    var rest = pool.filter(function(c){ return bad.indexOf(c) === -1; });
    pool = shuffled(bad).concat(shuffled(rest));
  } else {
    /* Gewichtete Ziehung: Schwaches kommt oefter, Ungestelltes bekommt mittleres Gewicht. */
    pool = gewichtetZiehen(pool, mode.n);
  }
  if(!pool.length){
    showToast('<span class="t-xp">Nichts dabei</span><span class="t-reason">Es gibt noch keine passenden Fragen für diesen Modus.</span>');
    return;
  }
  var qs = pool.slice(0, Math.min(mode.n, pool.length));
  exam = { active:true, mode:modeId, qs:qs, answers:qs.map(function(){ return -1; }), idx:0,
           endsAt: Date.now() + mode.min * 60000, timer:null, finished:false, result:null };
  stopExamTimer();
  exam.timer = setInterval(tickExam, 1000);
  state.currentId = 'exam';
  render();
}
function tickExam(){
  var el = document.getElementById('examTimer');
  var left = exam.endsAt - Date.now();
  if(left <= 0){ finishExam(true); return; }
  if(!el) return;
  var s = Math.floor(left / 1000);
  var mm = String(Math.floor(s / 60)).padStart(2,'0');
  var ss = String(s % 60).padStart(2,'0');
  el.textContent = mm + ':' + ss;
  el.className = 'timer' + (left < 60000 ? ' crit' : (left < 300000 ? ' warn' : ''));
}
function answerExam(i){
  exam.answers[exam.idx] = i;
  renderContent();
}
function gotoExamQ(i){ exam.idx = i; renderContent(); }
function nextExamQ(d){
  exam.idx = Math.max(0, Math.min(exam.qs.length - 1, exam.idx + d));
  renderContent();
}
function finishExam(auto){
  if(exam.finished) return;
  if(!auto){
    var open = exam.answers.filter(function(a){ return a === -1; }).length;
    if(open > 0 && !window.confirm(open + ' Frage(n) noch unbeantwortet. Trotzdem abgeben?')) return;
  }
  stopExamTimer();
  exam.finished = true;
  var right = 0, byPart = {};
  exam.qs.forEach(function(c, i){
    var ok = exam.answers[i] === c.correct;
    if(ok) right++;
    recordAnswer(c.id, ok);
    if(!ok) rateCard(c.id, 0); else if(!state.srs[c.id]) rateCard(c.id, 2);
    var p = byPart[c.part] || (byPart[c.part] = { right:0, total:0 });
    p.total++; if(ok) p.right++;
  });
  exam.result = { right:right, total:exam.qs.length, byPart:byPart, auto:!!auto };
  state.exams.push({ ts:Date.now(), score:right, total:exam.qs.length, mode:exam.mode,
                     byPart:JSON.parse(JSON.stringify(byPart)) });
  var quote = Math.round((right / exam.qs.length) * 100);
  awardXp(right * 3, 'Prüfung: ' + right + '/' + exam.qs.length + ' richtig');
  if(quote >= 70) grantBadge('exam_pass');
  if(quote >= 90) grantBadge('exam_ace');
  if(right === exam.qs.length && exam.qs.length > 0) grantBadge('exam_perfect');
  var gesamt = (EXAM_MODES[exam.mode] || {}).min * 60000;
  if(quote >= 70 && !auto && gesamt && (exam.endsAt - Date.now()) > gesamt / 2) grantBadge('speedster');
  /* Nach einer verhauenen Pruefung direkt eine bestanden */
  var vorher = state.exams[state.exams.length - 2];
  if(quote >= 70 && vorher && (vorher.score / vorher.total) < 0.5) grantBadge('phoenix');
  /* Knapp vor Ablauf der Zeit bestanden */
  if(quote >= 70 && gesamt && (exam.endsAt - Date.now()) < 60000) grantBadge('nervenstark');
  saveProgress();
  renderContent();
  renderSidebar();
}
function renderExam(){
  if(!exam.active){
    var h = '<div class="breadcrumb">Training</div><h1>Prüfungssimulator</h1>'+
      '<p class="intro-sub">Unter Zeitdruck abrufen zu können ist eine eigene Fähigkeit — und genau die entscheidet in der AP1, wo rund 95 % der Aufgaben Multiple Choice sind. Nach jedem Durchlauf siehst du, welcher Themenbereich dich ausgebremst hat.</p>';
    h += '<div class="exam-setup">';
    Object.keys(EXAM_MODES).forEach(function(k){
      var m = EXAM_MODES[k];
      h += '<div class="exam-mode" onclick="startExam(\''+k+'\')"><h3>'+m.label+'</h3>'+
           '<p>'+m.desc+'</p><p style="margin-top:8px;"><span class="badge topic">'+m.n+' Fragen</span> <span class="badge topic">'+m.min+' Min.</span></p></div>';
    });
    h += '</div>';

    if(state.exams.length){
      h += '<h2 class="sec-h">Deine letzten Durchläufe</h2>';
      h += '<table class="lesson-table"><tr><th>Datum</th><th>Modus</th><th>Ergebnis</th><th>Quote</th></tr>';
      state.exams.slice(-8).reverse().forEach(function(e){
        var pct = Math.round((e.score / e.total) * 100);
        var d = new Date(e.ts);
        h += '<tr><td>'+d.toLocaleDateString('de-DE')+' '+d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+'</td>'+
             '<td>'+((EXAM_MODES[e.mode]||{}).label || e.mode)+'</td>'+
             '<td>'+e.score+'/'+e.total+'</td>'+
             '<td style="color:'+(pct>=70?'var(--success)':'var(--danger)')+';font-weight:600;">'+pct+'%</td></tr>';
      });
      h += '</table>';
      var best = state.exams.reduce(function(a,e){ return Math.max(a, e.score/e.total); }, 0);
      h += '<div class="ex-panel">Bestquote bisher: <strong>'+Math.round(best*100)+'%</strong>. Als Richtwert gilt eine Quote ab 70 % als solide Prüfungsvorbereitung — darunter lohnt gezieltes Nacharbeiten über den Modus „Schwachstellen".</div>';
    }
    return h;
  }

  if(exam.finished){
    var r = exam.result;
    var pct = Math.round((r.right / r.total) * 100);
    var h2 = '<div class="breadcrumb">Ergebnis</div><h1>'+(EXAM_MODES[exam.mode]||{}).label+'</h1>';
    if(r.auto) h2 += '<div class="ex-panel" style="border-left:3px solid var(--danger);">⏱ Zeit abgelaufen — automatisch abgegeben.</div>';
    h2 += '<div class="score-hero"><div class="score-num '+(pct>=70?'score-pass':'score-fail')+'">'+pct+'%</div>'+
          '<div class="score-sub">'+r.right+' von '+r.total+' Fragen richtig</div></div>';

    h2 += '<h2 class="sec-h">Nach Themenbereich</h2>';
    Object.keys(r.byPart).sort().forEach(function(p){
      var v = r.byPart[p], q = Math.round((v.right / v.total) * 100);
      var col = q >= 80 ? 'var(--success)' : (q >= 50 ? 'var(--accent2)' : 'var(--danger)');
      h2 += '<div class="topic-bar-row"><span class="tname">Teil '+p+' · '+esc((PART_TITLES[p]||'').split(':')[0])+'</span>'+
            '<div class="topic-bar"><div style="width:'+q+'%;background:'+col+';"></div></div>'+
            '<span class="tval">'+v.right+'/'+v.total+'</span></div>';
    });

    var wrong = exam.qs.filter(function(c,i){ return exam.answers[i] !== c.correct; });
    if(wrong.length){
      h2 += '<h2 class="sec-h">Das saß noch nicht ('+wrong.length+')</h2>';
      h2 += '<p style="font-size:.85rem;color:var(--text-dim);">Alle davon liegen jetzt im Wiederholungs-Trainer und kommen heute noch einmal.</p>';
      exam.qs.forEach(function(c, i){
        if(exam.answers[i] === c.correct) return;
        h2 += '<div class="ex-card"><div class="ex-head"><h3>'+esc(c.q)+'</h3><span class="badge topic">'+esc(c.moduleTitle)+'</span></div>'+
              '<p style="font-size:.87rem;margin:0 0 6px;"><span style="color:var(--danger);">Deine Antwort:</span> '+
              (exam.answers[i] === -1 ? '<em>nicht beantwortet</em>' : esc(c.options[exam.answers[i]]))+'<br>'+
              '<span style="color:var(--success);">Richtig:</span> '+esc(c.options[c.correct])+'</p>'+
              '<p style="font-size:.85rem;color:var(--text-dim);margin:0;">'+esc(c.explain)+'</p>'+
              '<div class="ex-actions"><button class="ex-btn" onclick="selectLesson(\''+c.lessonId+'\')">Zur Lektion: '+esc(c.lessonTitle)+'</button></div></div>';
      });
    } else {
      h2 += '<div class="ex-panel" style="border-left:3px solid var(--success);">Fehlerfrei — stark. Erhöhe beim nächsten Mal Umfang oder Tempo.</div>';
    }
    h2 += '<div class="ex-actions" style="margin-top:20px;"><button class="check-btn" onclick="exam.active=false;renderContent();">Neuen Durchlauf starten</button>'+
          '<button class="ex-btn" onclick="startReview(\'weak\')">Fehlerkarten jetzt wiederholen</button></div>';
    return h2;
  }

  var card = exam.qs[exam.idx];
  var picked = exam.answers[exam.idx];
  var h3 = '<div class="exam-bar"><span class="timer" id="examTimer">--:--</span>'+
    '<span style="font-size:.85rem;color:var(--text-dim);">Frage '+(exam.idx+1)+'/'+exam.qs.length+'</span>'+
    '<button class="check-btn" style="padding:7px 14px;" onclick="finishExam(false)">Abgeben</button>'+
    '<div class="exam-qnav">';
  exam.qs.forEach(function(q, i){
    h3 += '<button class="qdot'+(exam.answers[i] !== -1 ? ' answered' : '')+(i === exam.idx ? ' current' : '')+'" onclick="gotoExamQ('+i+')">'+(i+1)+'</button>';
  });
  h3 += '</div></div>';

  h3 += '<div class="srs-card"><div class="srs-meta"><span class="badge topic">Teil '+card.part+'</span></div>'+
        '<div class="srs-q">'+esc(card.q)+'</div><div class="srs-opts">';
  card.options.forEach(function(opt, i){
    h3 += '<button class="srs-opt" style="'+(picked === i ? 'border-color:var(--accent);background:var(--part-bg);font-weight:600;' : '')+'" onclick="answerExam('+i+')">'+esc(opt)+'</button>';
  });
  h3 += '</div><div class="ex-actions">'+
        '<button class="ex-btn" onclick="nextExamQ(-1)" '+(exam.idx===0?'disabled':'')+'>← Zurück</button>'+
        '<button class="ex-btn primary" onclick="nextExamQ(1)" '+(exam.idx===exam.qs.length-1?'disabled':'')+'>Weiter →</button>'+
        '<button class="ex-btn" onclick="answerExam(-1)">Antwort verwerfen</button>'+
        '</div></div>';
  h3 += '<p class="ex-meta">Während der Prüfung gibt es bewusst kein Feedback — die Auswertung kommt erst nach der Abgabe, wie in der echten Prüfung.</p>';
  return h3;
}
function startTrace(id){
  tracer = { id:id, step:0, fb:null, finalFb:null, finished:false };
  state.currentId = 'tracer';
  render();
}
function traceById(id){ return TRACES.find(function(t){ return t.id===id; }); }
function normVal(s){
  return String(s).toLowerCase().replace(/\s+/g,'').replace(/[\[\]]/g,'').replace(/;/g,',');
}
function traceAdvance(force){
  var t = traceById(tracer.id);
  var pending = t.steps[tracer.step + 1];
  if(!pending) return;
  if(pending.ask && !force){
    var inp = document.getElementById('predictInput');
    var val = inp ? inp.value : '';
    if(!val.trim()){ tracer.fb = { ok:false, msg:'Trag einen Wert ein — raten ist erlaubt, Überspringen lernt nichts.' }; renderContent(); return; }
    var ok = normVal(val) === normVal(pending.values[pending.ask]);
    if(!ok){
      tracer.fb = { ok:false, msg:'Noch nicht. Rechne die Zeile Schritt für Schritt nach — oder lass dir den Wert zeigen.' };
      renderContent(); return;
    }
    tracer.fb = { ok:true, msg:'Richtig.' };
    awardXp(15, 'Vorhersage getroffen', 'trace:' + tracer.id + ':' + (tracer.step + 1));
  } else {
    tracer.fb = force && pending.ask ? { ok:false, msg:'Wert aufgedeckt — schau dir die Zeile genau an, bevor du weitergehst.' } : null;
  }
  tracer.step++;
  if(tracer.step >= t.steps.length - 1) tracer.finished = true;
  renderContent();
  var box = document.getElementById('predictInput');
  if(box) box.focus();
}
function checkFinal(){
  var t = traceById(tracer.id);
  var inp = document.getElementById('finalInput');
  var val = inp ? inp.value : '';
  var ok = normVal(val) === normVal(t.result);
  tracer.finalFb = ok
    ? { ok:true, msg:'✓ Richtig — genau das liefert der Algorithmus zurück.' }
    : { ok:false, msg:'✗ Nicht ganz. Sieh dir die letzte Zeile der Tabelle an: Welcher Wert steht dort in der Ergebnisvariablen?' };
  if(ok){
    if(state.tracesDone.indexOf(t.id) === -1) state.tracesDone.push(t.id);
    awardXp(40, 'Trockendurchlauf gelöst', 'tracedone:' + t.id);
    checkMilestones();
  }
  renderContent();
}
function renderTracer(){
  if(!tracer.id){
    var h = '<div class="breadcrumb">Training</div><h1>Algorithmus-Trainer</h1>'+
      '<p class="intro-sub">Die häufigste Aufgabenform der AP1 lautet sinngemäß: „Was liefert dieser Algorithmus für Eingabe X?" Genau das übst du hier — Zeile für Zeile, mit einer Wertetabelle, wie du sie in der Prüfung auf Papier führen würdest. An kritischen Stellen musst du den nächsten Wert selbst vorhersagen, bevor er aufgedeckt wird.</p>';
    h += '<div class="module-grid" style="margin-top:22px;">';
    TRACES.forEach(function(t){
      h += '<div class="module-card" onclick="startTrace(\''+t.id+'\')">'+
           '<div class="mnum">'+(t.level===1?'EINSTEIGER':'FORTGESCHRITTEN')+'</div>'+
           '<h3>'+esc(t.title)+'</h3><p class="mono" style="font-size:.78rem;">'+esc(t.input)+'</p>'+
           '<p style="margin-top:6px;">'+t.steps.filter(function(s){return s.ask;}).length+' Vorhersagen · '+t.steps.length+' Schritte</p></div>';
    });
    h += '</div>';
    return h;
  }

  var t = traceById(tracer.id);
  var pending = t.steps[tracer.step + 1];
  var html = '<div class="breadcrumb">Algorithmus-Trainer</div>';
  html += '<div class="lesson-head"><div><h1>'+esc(t.title)+'</h1>'+
          '<div class="meta-row"><span class="mono">'+esc(t.input)+'</span><span>Schritt '+(tracer.step+1)+'/'+t.steps.length+'</span></div></div>'+
          '<button class="ex-btn" onclick="tracer.id=null;renderContent();">Andere Aufgabe</button></div>';
  html += '<p style="font-size:.9rem;">'+t.intro+'</p>';

  var cur = t.steps[tracer.step];
  html += '<div class="trace-wrap"><div class="trace-code">';
  t.code.forEach(function(line, i){
    html += '<span class="trace-line'+(i === cur.line ? ' active' : '')+'">'+esc(line)+'</span>';
  });
  html += '</div><div style="overflow-x:auto;"><table class="trace-table"><tr><th>#</th>';
  t.vars.forEach(function(v){ html += '<th>'+esc(v)+'</th>'; });
  html += '</tr>';
  for(var i = 0; i <= tracer.step; i++){
    var st = t.steps[i];
    html += '<tr'+(i === tracer.step ? ' class="now"' : '')+'><td>'+(i+1)+'</td>';
    t.vars.forEach(function(v){ html += '<td>'+esc(st.values[v] !== undefined ? st.values[v] : '—')+'</td>'; });
    html += '</tr>';
  }
  html += '</table></div></div>';

  html += '<div class="ex-panel"><strong>Zeile '+(cur.line+1)+':</strong> '+esc(cur.note)+'</div>';

  if(pending){
    if(pending.ask){
      html += '<div class="predict-box"><label for="predictInput">Vorhersage: Welchen Wert hat <span class="mono">'+esc(pending.ask)+'</span> nach dem nächsten Schritt?</label>'+
        '<div class="predict-row"><input class="predict-input" id="predictInput" autocomplete="off" placeholder="z. B. '+(pending.ask==='zahlen'?'[2, 5, 9, 1]':'12')+'" onkeydown="if(event.key===\'Enter\')traceAdvance(false)">'+
        '<button class="check-btn" onclick="traceAdvance(false)">Prüfen</button>'+
        '<button class="ex-btn" onclick="traceAdvance(true)">Zeigen</button></div>';
      if(tracer.fb) html += '<div class="predict-fb '+(tracer.fb.ok?'ok':'no')+'">'+esc(tracer.fb.msg)+'</div>';
      html += '</div>';
    } else {
      if(tracer.fb) html += '<div class="predict-fb '+(tracer.fb.ok?'ok':'no')+'" style="margin-bottom:10px;">'+esc(tracer.fb.msg)+'</div>';
      html += '<button class="check-btn" onclick="traceAdvance(false)">Nächster Schritt →</button>';
    }
  } else {
    html += '<div class="predict-box"><label for="finalInput">Letzte Frage: Was liefert der Algorithmus zurück?</label>'+
      '<div class="predict-row"><input class="predict-input" id="finalInput" autocomplete="off" onkeydown="if(event.key===\'Enter\')checkFinal()">'+
      '<button class="check-btn" onclick="checkFinal()">Prüfen</button></div>';
    if(tracer.finalFb){
      html += '<div class="predict-fb '+(tracer.finalFb.ok?'ok':'no')+'">'+esc(tracer.finalFb.msg)+'</div>';
      if(tracer.finalFb.ok){
        html += '<div class="callout callout-tip" style="margin-bottom:0;"><div class="callout-label">★ Was du daraus mitnimmst</div><p>'+t.lesson+'</p></div>';
      }
    }
    html += '</div>';
    html += '<div class="ex-actions"><button class="ex-btn" onclick="tracer.id=null;renderContent();">Nächste Aufgabe wählen</button>'+
            '<button class="ex-btn" onclick="startTrace(\''+t.id+'\')">Nochmal von vorn</button></div>';
  }
  return html;
}
function buildIndex(){
  MODULES.forEach(function(m){
    m.lessons.forEach(function(l){
      var text = ['body','body2','body3','tip','code','code2','code3','code4']
                   .map(function(k){ return l[k] || ''; }).join(' ');
      SEARCH_INDEX.push({ id:l.id, kind:'lesson', title:l.title, sub:'Teil '+m.part+' · '+m.title,
                          hay:(l.title + ' ' + m.title + ' ' + text).replace(/<[^>]+>/g,' ').toLowerCase() });
    });
  });
  EXERCISES.forEach(function(x){
    SEARCH_INDEX.push({ id:'exercises', kind:'exercise', title:x.title, sub:'Übung · '+x.topic+' · '+(['','Einsteiger','Fortgeschritten','Experte'][x.level]),
                        hay:(x.title + ' ' + x.topic + ' ' + x.task).replace(/<[^>]+>/g,' ').toLowerCase() });
  });
  TRACES.forEach(function(t){
    SEARCH_INDEX.push({ id:'trace:'+t.id, kind:'trace', title:t.title, sub:'Algorithmus-Trainer · '+t.input,
                        hay:(t.title + ' ' + t.input + ' ' + t.code.join(' ')).toLowerCase() });
  });
  [['review','Wiederholen (Spaced Repetition)','Training'],
   ['exam','Prüfungssimulator','Training'],
   ['tracer','Algorithmus-Trainer','Training'],
   ['subnet','Subnetting-Trainer','Training'],
   ['tutor','AP1-Tutor','Training'],
   ['exercises','Übungsaufgaben','Praxis'],
   ['cheatsheet','Spickzettel','Referenz'],
   ['intro','Kursübersicht','Start']].forEach(function(a){
    SEARCH_INDEX.push({ id:a[0], kind:'nav', title:a[1], sub:a[2], hay:(a[1]+' '+a[2]).toLowerCase() });
  });
  indexFertig = true;
}
function renderKiEinstellungen(){
  var an = !!tutor.fn;
  var h = '<h2 class="sec-h">Tutor-Verbindung</h2>';
  h += '<div class="ex-panel">';
  h += '<p style="margin-bottom:12px;">Status: <span class="sync-hint'+(an ? ' on' : '')+'">'+
       esc(kiHerkunftText())+'</span></p>';
  h += '<p style="margin-bottom:14px;">Auf claude.ai laeuft der Tutor ueber dein eigenes Konto. '+
       'Wird der Kurs auf einem eigenen Server betrieben, traegst du hier die Adresse deines '+
       'Dienstes ein &mdash; der API-Schluessel bleibt dabei auf dem Server und niemals im Browser.</p>';
  h += '<div class="sb-grid">';
  h += '<label class="sb-field"><span>Bezugsquelle</span>'+
       '<select class="sb-input" onchange="kiModusSetzen(this.value)">'+
       ['auto','artifact','backend','aus'].map(function(m){
         var t = { auto:'Automatisch', artifact:'Nur Claude (Artifact)',
                   backend:'Nur eigener Dienst', aus:'Tutor abschalten' }[m];
         return '<option value="'+m+'"'+(KI.modus === m ? ' selected' : '')+'>'+t+'</option>';
       }).join('')+'</select></label>';
  h += '<label class="sb-field"><span>Adresse des eigenen Dienstes</span>'+
       '<input class="sb-input" type="url" spellcheck="false" placeholder="https://api.deine-domain.de/tutor" '+
       'value="'+esc(KI.endpunkt)+'" oninput="kiEndpunktSetzen(this.value)"></label>';
  h += '</div>';
  h += '<div class="ex-actions"><button class="ex-btn primary" type="button" '+
       'onclick="tutorNeuVerbinden()">Verbindung neu aufbauen</button></div>';
  h += '<details class="kl-details"><summary>Welches Protokoll der Dienst sprechen muss</summary>'+
       codeBlock(
         "POST <deine Adresse>\n"+
         "Content-Type: application/json\n\n"+
         "{ \"nachrichten\": [ {\"role\":\"user\",\"content\":\"...\"} ],\n"+
         "  \"modus\": \"text\" | \"json\",\n"+
         "  \"stufe\": \"fast\" | \"default\" | \"complex\" }\n\n"+
         "Antwort, Weg a - laufender Text:\n"+
         "  Content-Type: text/event-stream\n"+
         "  data: {\"text\":\"bisheriger Text\"}\n"+
         "  data: [DONE]\n\n"+
         "Antwort, Weg b - eine JSON-Antwort:\n"+
         "  {\"text\":\"...\",\"truncated\":false}\n"+
         "  bei modus \"json\" direkt das gewuenschte Objekt\n\n"+
         "Der Server haelt den API-Schluessel, setzt Zeitlimits\n"+
         "und begrenzt die Anfragen je Nutzer.",
         'Schnittstelle')+'</details>';
  h += '</div>';
  return h;
}
function renderProfile(){
  var lp = levelProgress();
  var xp = state.xp || 0;
  var mastered = Object.keys(state.srs).filter(function(k){ return (state.srs[k].iv || 0) >= 21; }).length;
  var bestExam = state.exams.reduce(function(a,e){ return Math.max(a, e.score / e.total); }, 0);
  var earned = BADGES.filter(function(b){ return state.badges[b.id]; }).length;

  var h = '<div class="breadcrumb">Profil</div>';
  h += renderRangkarte();
  h += renderKennzahlen();
  h += '<h2 class="sec-h">Rangleiter</h2>';
  h += '<p class="intro-sub">Fünfundzwanzig Stufen vom Kabelträger bis zum Architekten der Matrix. XP gibt es für jede abgeschlossene Lektion, jede richtige Erstantwort und jede gelöste Aufgabe.</p>';
  h += renderLeiter();
  h += renderPruefungsverlauf();
  h += '<h2 class="sec-h">Abzeichen</h2>';
  h += renderAbzeichen();

  h += renderKalibrierung();

  h += '<h2 class="sec-h">Fortschritt nach Kursteil</h2>';
  PARTS.forEach(function(p){
    var ls = [];
    MODULES.filter(function(m){ return m.part === p; }).forEach(function(m){ ls = ls.concat(m.lessons); });
    var done = ls.filter(function(l){ return state.completed.has(l.id); }).length;
    var q = ls.length ? Math.round((done / ls.length) * 100) : 0;
    var col = q >= 80 ? 'var(--success)' : (q >= 40 ? 'var(--accent)' : 'var(--accent2)');
    h += '<div class="topic-bar-row"><span class="tname">Teil '+p+' · '+esc((PART_TITLES[p]||'').split(':')[0])+'</span>'+
         '<div class="topic-bar"><div style="width:'+q+'%;background:'+col+';"></div></div>'+
         '<span class="tval">'+done+'/'+ls.length+'</span></div>';
  });

  h += '<h2 class="sec-h">Zahlen</h2>';
  h += '<div class="stat-row">'+
    '<div class="stat-tile"><div class="num">'+state.completed.size+'</div><div class="lbl">Lektionen fertig</div></div>'+
    '<div class="stat-tile"><div class="num">'+Object.keys(state.srs).length+'</div><div class="lbl">Karten aktiv</div></div>'+
    '<div class="stat-tile"><div class="num">'+mastered+'</div><div class="lbl">Karten gefestigt</div></div>'+
    '<div class="stat-tile"><div class="num">'+Object.keys(state.solved).length+'</div><div class="lbl">Übungen gelöst</div></div>'+
    '<div class="stat-tile"><div class="num">'+state.tracesDone.length+'/'+TRACES.length+'</div><div class="lbl">Durchläufe</div></div>'+
    '<div class="stat-tile"><div class="num">'+(bestExam ? Math.round(bestExam*100)+'%' : '—')+'</div><div class="lbl">Beste Prüfung</div></div>'+
    '</div>';

  h += renderKiEinstellungen();

  h += '<h2 class="sec-h">Dein Lernplan</h2>';
  h += '<div class="ex-panel">'+
    '<p style="margin-bottom:14px;">Mit einem Prüfungstermin rechnet dir die Heute-Ansicht aus, '+
    'wie viele Lektionen pro Tag noch nötig sind. Das Tagesziel steuert den Ring — lieber klein ansetzen '+
    'und täglich erreichen als groß und selten.</p>'+
    '<div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-end;">'+
      '<label style="display:flex; flex-direction:column; gap:6px;">'+
        '<span style="font-size:.78rem; color:var(--text-dim); font-weight:600;">Prüfungstermin</span>'+
        '<input type="date" id="pruefDatum" class="dat-feld" value="'+esc(state.pruefungsdatum || '')+'" '+
        'onchange="setzePruefung(this.value)">'+
      '</label>'+
      '<label style="display:flex; flex-direction:column; gap:6px;">'+
        '<span style="font-size:.78rem; color:var(--text-dim); font-weight:600;">Lektionen pro Tag</span>'+
        '<input type="number" id="tagesZiel" class="dat-feld" min="1" max="30" '+
        'style="width:90px;" value="'+(state.tagesziel || 3)+'" onchange="setzeZiel(this.value)">'+
      '</label>'+
      '<button class="ex-btn" onclick="fokusUmschalten()">Lesemodus umschalten</button>'+
      '<button class="ex-btn" onclick="selectLesson(\'tasten\')">Tastaturkürzel</button>'+
    '</div></div>';

  h += '<h2 class="sec-h">Geräte und Sicherung</h2>';
  h += '<div class="ex-panel">'+
    '<p style="margin-bottom:10px;"><strong>Status:</strong> <span id="syncHint" class="sync-hint">wird geprüft …</span></p>'+
    '<p style="margin-bottom:10px;">Auf claude.ai gleicht sich dein Fortschritt zwischen allen Geräten ab, an denen du mit demselben Konto angemeldet bist. '+
    'Für eine lokal gespeicherte Kopie oder als Sicherung nutzt du den Export: Er legt deinen kompletten Stand als Text in die Zwischenablage. '+
    'Beim Import wird <em>zusammengeführt</em>, nicht überschrieben — abgeschlossene Lektionen, XP und Abzeichen gehen also nie verloren.</p>'+
    '<div class="ex-actions">'+
      '<button class="ex-btn primary" onclick="exportProgress()">Fortschritt exportieren</button>'+
      '<button class="ex-btn" onclick="showImport()">Fortschritt importieren</button>'+
      '<button class="ex-btn" id="ioApply" hidden onclick="applyImport()">Übernehmen</button>'+
    '</div>'+
    '<textarea class="io-area" id="ioArea" hidden spellcheck="false"></textarea>'+
    '</div>';

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Wie XP entstehen:</strong> Lektion abschließen +50 · Quizfrage erstmals richtig +10 · Karteikarte gewusst +5 (gefestigte Karten +8) · Vorhersage im Algorithmus-Trainer +15 · Trockendurchlauf gelöst +40 · Übungsaufgabe gelöst +30 · Prüfung 3 XP je richtiger Antwort · Abzeichen +25. Punkte gibt es pro Aufgabe nur einmal — Wiederholen zählt fürs Gedächtnis, nicht fürs Punktekonto.</div>';
  return h;
}
function sbRand(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
function sbPick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
function sbToInt(a, b, c, d){ return ((a * 16777216) + (b * 65536) + (c * 256) + d); }
function sbToIp(n){
  n = n >>> 0;
  return [Math.floor(n / 16777216) % 256, Math.floor(n / 65536) % 256,
          Math.floor(n / 256) % 256, n % 256].join('.');
}
function sbMaskInt(p){ return p === 0 ? 0 : (4294967296 - Math.pow(2, 32 - p)); }
function sbMaskStr(p){ return sbToIp(sbMaskInt(p)); }
function sbNorm(s){ return String(s == null ? '' : s).replace(/\s+/g, '').replace(/,/g, '.').toLowerCase(); }
function sbBase(prefix){
  var r = sbRand(1, 3), a, b;
  if(r === 1){ a = 10;  b = sbRand(0, 255); }
  else if(r === 2){ a = 172; b = sbRand(16, 31); }
  else { a = 192; b = 168; }
  if(r === 3 && prefix < 16) prefix = 16;
  var ip = sbToInt(a, b, sbRand(0, 255), sbRand(1, 254));
  return (ip - (ip % Math.pow(2, 32 - prefix))) + sbRand(1, Math.min(200, Math.pow(2, 32 - prefix) - 2));
}
function makeSubnetTask(){
  var kind = sbRand(1, 4);
  var p, ipInt, netInt, size, t;

  if(kind === 1){
    /* Adresse analysieren */
    p = sbRand(24, 30);
    ipInt = sbBase(p);
    size = Math.pow(2, 32 - p);
    netInt = ipInt - (ipInt % size);
    t = {
      kind: 1,
      titel: 'Adresse analysieren',
      frage: 'Gegeben ist die Adresse <strong>' + sbToIp(ipInt) + ' / ' + p + '</strong> ' +
             '(Subnetzmaske ' + sbMaskStr(p) + ').<br>Bestimme Netzadresse, Broadcast-Adresse, den ersten und letzten nutzbaren Host sowie die Anzahl nutzbarer Hosts.',
      felder: [
        { k:'netz',  l:'Netzadresse',        ph:'z. B. 192.168.1.0' },
        { k:'bc',    l:'Broadcast-Adresse',  ph:'z. B. 192.168.1.255' },
        { k:'first', l:'Erster Host',        ph:'z. B. 192.168.1.1' },
        { k:'last',  l:'Letzter Host',       ph:'z. B. 192.168.1.254' },
        { k:'hosts', l:'Nutzbare Hosts',     ph:'nur die Zahl' }
      ],
      loesung: {
        netz:  sbToIp(netInt),
        bc:    sbToIp(netInt + size - 1),
        first: sbToIp(netInt + 1),
        last:  sbToIp(netInt + size - 2),
        hosts: String(size - 2)
      },
      weg:
        'Maske /' + p + ' = ' + sbMaskStr(p) + '\n' +
        'Blockgroesse im letzten Oktett: 256 - ' + (sbMaskInt(p) % 256) + ' = ' + Math.min(size, 256) + '\n' +
        'Netzadresse   = alle Hostbits auf 0   -> ' + sbToIp(netInt) + '\n' +
        'Broadcast     = alle Hostbits auf 1   -> ' + sbToIp(netInt + size - 1) + '\n' +
        'Erster Host   = Netzadresse + 1       -> ' + sbToIp(netInt + 1) + '\n' +
        'Letzter Host  = Broadcast - 1         -> ' + sbToIp(netInt + size - 2) + '\n' +
        'Hostbits      = 32 - ' + p + ' = ' + (32 - p) + '\n' +
        'Nutzbare Hosts= 2^' + (32 - p) + ' - 2 = ' + size + ' - 2 = ' + (size - 2)
    };
  } else if(kind === 2){
    /* Maske und Praefix umrechnen */
    p = sbRand(17, 30);
    var hin = sbRand(0, 1) === 1;
    t = {
      kind: 2,
      titel: 'Maske und Praefix umrechnen',
      frage: hin
        ? 'Wandle das Praefix <strong>/' + p + '</strong> in die Subnetzmaske in Dezimalschreibweise um und gib an, wie viele Hostbits es gibt und wie viele Hosts nutzbar sind.'
        : 'Wandle die Subnetzmaske <strong>' + sbMaskStr(p) + '</strong> in die CIDR-Schreibweise um und gib an, wie viele Hostbits es gibt und wie viele Hosts nutzbar sind.',
      felder: hin
        ? [ { k:'maske', l:'Subnetzmaske', ph:'z. B. 255.255.255.0' },
            { k:'hb',    l:'Hostbits',     ph:'nur die Zahl' },
            { k:'hosts', l:'Nutzbare Hosts', ph:'nur die Zahl' } ]
        : [ { k:'cidr',  l:'Praefix (nur Zahl)', ph:'z. B. 24' },
            { k:'hb',    l:'Hostbits',     ph:'nur die Zahl' },
            { k:'hosts', l:'Nutzbare Hosts', ph:'nur die Zahl' } ],
      loesung: hin
        ? { maske: sbMaskStr(p), hb: String(32 - p), hosts: String(Math.pow(2, 32 - p) - 2) }
        : { cidr: String(p), hb: String(32 - p), hosts: String(Math.pow(2, 32 - p) - 2) },
      weg:
        '/' + p + ' bedeutet ' + p + ' gesetzte Bits von links.\n' +
        'Maske: ' + sbMaskStr(p) + '\n' +
        'Merkreihe der Oktettwerte: 128 192 224 240 248 252 254 255\n' +
        'Hostbits = 32 - ' + p + ' = ' + (32 - p) + '\n' +
        'Nutzbare Hosts = 2^' + (32 - p) + ' - 2 = ' + (Math.pow(2, 32 - p) - 2)
    };
  } else if(kind === 3){
    /* Vom Hostbedarf zum Praefix */
    var ziel = sbPick([6, 12, 25, 30, 50, 60, 100, 120, 200, 250, 400, 500]);
    var hb = 1;
    while(Math.pow(2, hb) - 2 < ziel) hb++;
    p = 32 - hb;
    t = {
      kind: 3,
      titel: 'Vom Hostbedarf zum Praefix',
      frage: 'Ein Subnetz soll mindestens <strong>' + ziel + ' Hosts</strong> aufnehmen koennen. ' +
             'Bestimme das groesstmoegliche Praefix (also das kleinste ausreichende Netz), die zugehoerige Subnetzmaske und die tatsaechlich nutzbare Hostanzahl.',
      felder: [
        { k:'cidr',  l:'Praefix (nur Zahl)', ph:'z. B. 26' },
        { k:'maske', l:'Subnetzmaske',       ph:'z. B. 255.255.255.192' },
        { k:'hosts', l:'Nutzbare Hosts',     ph:'nur die Zahl' }
      ],
      loesung: { cidr: String(p), maske: sbMaskStr(p), hosts: String(Math.pow(2, hb) - 2) },
      weg:
        'Gesucht: kleinstes h mit 2^h - 2 >= ' + ziel + '\n' +
        '  2^' + (hb - 1) + ' - 2 = ' + (Math.pow(2, hb - 1) - 2) + '  -> zu wenig\n' +
        '  2^' + hb + ' - 2 = ' + (Math.pow(2, hb) - 2) + '  -> ausreichend\n' +
        'Hostbits = ' + hb + '\n' +
        'Praefix  = 32 - ' + hb + ' = /' + p + '\n' +
        'Maske    = ' + sbMaskStr(p)
    };
  } else {
    /* Netz aufteilen */
    var start = sbRand(24, 27);
    var anzahl = sbPick([2, 4, 8, 16]);
    var zusatz = Math.round(Math.log(anzahl) / Math.log(2));
    p = start + zusatz;
    if(p > 30){ p = 30; zusatz = p - start; anzahl = Math.pow(2, zusatz); }
    var basis = sbBase(start);
    var basisNet = basis - (basis % Math.pow(2, 32 - start));
    var block = Math.pow(2, 32 - p);
    t = {
      kind: 4,
      titel: 'Netz aufteilen',
      frage: 'Das Netz <strong>' + sbToIp(basisNet) + ' / ' + start + '</strong> soll in ' +
             '<strong>' + anzahl + ' gleich grosse Subnetze</strong> geteilt werden. ' +
             'Bestimme das neue Praefix, die Blockgroesse, die Anzahl nutzbarer Hosts je Subnetz und die Netzadresse des <strong>zweiten</strong> Subnetzes.',
      felder: [
        { k:'cidr',  l:'Neues Praefix (nur Zahl)', ph:'z. B. 26' },
        { k:'block', l:'Blockgroesse (Adressen)',  ph:'nur die Zahl' },
        { k:'hosts', l:'Nutzbare Hosts je Subnetz', ph:'nur die Zahl' },
        { k:'netz2', l:'Netzadresse Subnetz 2',    ph:'z. B. 192.168.1.64' }
      ],
      loesung: {
        cidr:  String(p),
        block: String(block),
        hosts: String(block - 2),
        netz2: sbToIp(basisNet + block)
      },
      weg:
        'Benoetigte zusaetzliche Netzbits: 2^x >= ' + anzahl + '  ->  x = ' + zusatz + '\n' +
        'Neues Praefix = /' + start + ' + ' + zusatz + ' = /' + p + '\n' +
        'Maske         = ' + sbMaskStr(p) + '\n' +
        'Blockgroesse  = 2^(32-' + p + ') = ' + block + ' Adressen\n' +
        'Hosts je Netz = ' + block + ' - 2 = ' + (block - 2) + '\n' +
        'Subnetz 1     = ' + sbToIp(basisNet) + '\n' +
        'Subnetz 2     = ' + sbToIp(basisNet) + ' + ' + block + ' = ' + sbToIp(basisNet + block)
    };
  }
  return t;
}
function newSubnetTask(){
  subnet.task = makeSubnetTask();
  subnet.checked = false;
  render();
}
function checkSubnetTask(){
  var t = subnet.task;
  if(!t || subnet.checked) return;
  var alleRichtig = true;
  t.eingabe = {};
  t.felder.forEach(function(f){
    var el = document.getElementById('sb_' + f.k);
    var v = el ? el.value : '';
    t.eingabe[f.k] = v;
    if(sbNorm(v) !== sbNorm(t.loesung[f.k])) alleRichtig = false;
  });
  subnet.checked = true;
  subnet.total++;
  if(alleRichtig){
    subnet.right++;
    subnet.streak++;
    state.subnetSolved = (state.subnetSolved || 0) + 1;
    awardXp(10, 'Subnetting-Aufgabe geloest');
    if(state.subnetSolved >= 10) grantBadge('subnet10');
    if(state.subnetSolved >= 50) grantBadge('subnet50');
    if(subnet.streak >= 10) grantBadge('subnet_serie');
  } else {
    subnet.streak = 0;
  }
  t.korrekt = alleRichtig;
  render();
}
function renderSubnet(){
  if(!subnet.task) subnet.task = makeSubnetTask();
  var t = subnet.task;

  var h = '<div class="breadcrumb">Training</div><h1>Subnetting-Trainer</h1>';
  h += '<p class="intro-sub">Subnetting lernt man nicht durch Lesen, sondern durch Wiederholung. Dieser Trainer erzeugt bei jedem Klick eine neue Aufgabe aus vier Typen &mdash; Adresse analysieren, Maske umrechnen, Praefix aus dem Hostbedarf bestimmen und ein Netz aufteilen. Jede geloeste Aufgabe bringt 10 XP.</p>';

  h += '<div class="stat-row" style="margin-bottom:18px;">'+
    '<div class="stat-tile"><div class="num">'+subnet.right+'</div><div class="lbl">richtig</div></div>'+
    '<div class="stat-tile"><div class="num">'+subnet.total+'</div><div class="lbl">bearbeitet</div></div>'+
    '<div class="stat-tile"><div class="num">'+(subnet.total ? Math.round(subnet.right/subnet.total*100)+'%' : '&mdash;')+'</div><div class="lbl">Quote</div></div>'+
    '<div class="stat-tile"><div class="num">'+subnet.streak+'</div><div class="lbl">Serie</div></div>'+
    '</div>';

  h += '<div class="ex-card">';
  h += '<div class="ex-head"><h3>'+esc(t.titel)+'</h3><span class="badge topic">Aufgabentyp '+t.kind+'</span></div>';
  h += '<div class="ex-task"><p>'+t.frage+'</p></div>';

  h += '<div class="sb-grid">';
  t.felder.forEach(function(f){
    var val = (t.eingabe && t.eingabe[f.k] != null) ? esc(t.eingabe[f.k]) : '';
    var cls = '';
    if(subnet.checked){
      cls = (sbNorm(val) === sbNorm(t.loesung[f.k])) ? ' sb-ok' : ' sb-bad';
    }
    h += '<label class="sb-field"><span>'+esc(f.l)+'</span>'+
         '<input type="text" id="sb_'+f.k+'" class="sb-input'+cls+'" value="'+val+'" '+
         'placeholder="'+esc(f.ph)+'" autocomplete="off" spellcheck="false"'+
         (subnet.checked ? ' disabled' : '')+'></label>';
  });
  h += '</div>';

  h += '<div class="ex-actions">';
  if(!subnet.checked){
    h += '<button class="ex-btn primary" onclick="checkSubnetTask()">Pr&uuml;fen</button>';
    h += '<button class="ex-btn" onclick="newSubnetTask()">&uuml;berspringen</button>';
  } else {
    h += '<button class="ex-btn primary" onclick="newSubnetTask()">N&auml;chste Aufgabe</button>';
  }
  h += '</div>';

  if(subnet.checked){
    h += '<div class="ex-panel '+(t.korrekt ? 'hint' : '')+'">'+
         '<strong>'+(t.korrekt ? '✓ Alles richtig.' : '✗ Noch nicht ganz.')+'</strong>'+
         (t.korrekt ? '' : ' Die richtigen Werte stehen unten markiert.')+'</div>';
    if(!t.korrekt){
      h += '<div class="sb-grid">';
      t.felder.forEach(function(f){
        h += '<div class="sb-field"><span>'+esc(f.l)+'</span>'+
             '<div class="sb-sol">'+esc(t.loesung[f.k])+'</div></div>';
      });
      h += '</div>';
    }
    h += codeBlock(t.weg, 'Rechenweg');
  }

  h += '</div>';

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Sofort-Spickzettel:</strong> '+
       'Oktettwerte von links &mdash; 128 &middot; 192 &middot; 224 &middot; 240 &middot; 248 &middot; 252 &middot; 254 &middot; 255. '+
       'Blockgr&ouml;&szlig;e = 256 &minus; Maskenwert. Nutzbare Hosts = 2^Hostbits &minus; 2. '+
       'Subnetze = 2^zus&auml;tzliche Netzbits. Broadcast = n&auml;chste Netzadresse &minus; 1.</div>';

  return h;
}
function kiSpeichern(){
  try{
    localStorage.setItem('rootpfad-ki', JSON.stringify({ modus:KI.modus, endpunkt:KI.endpunkt }));
  }catch(e){}
}
function kiBackendAnbieter(endpunkt){

  async function anfrage(nachrichten, opt, modus){
    opt = opt || {};
    var ctl = new AbortController();
    var timer = setTimeout(function(){ ctl.abort(); }, KI.zeitlimit);
    /* Ein von aussen gereichtes Abbruchsignal mit durchreichen. */
    if(opt.signal){
      if(opt.signal.aborted) ctl.abort();
      else opt.signal.addEventListener('abort', function(){ ctl.abort(); });
    }

    var antwort;
    try{
      antwort = await fetch(endpunkt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nachrichten: nachrichten,
          modus: modus,
          stufe: opt.modelTier || 'default'
        }),
        signal: ctl.signal
      });
    }catch(e){
      clearTimeout(timer);
      if(e && e.name === 'AbortError') throw { code:'aborted', message:'abgebrochen' };
      throw { code:'network', message:'Der Tutor-Dienst ist nicht erreichbar.' };
    }

    if(!antwort.ok){
      clearTimeout(timer);
      if(antwort.status === 429) throw { code:'rate_limited', message:'zu viele Anfragen' };
      if(antwort.status === 401 || antwort.status === 403) throw { code:'not_granted', message:'kein Zugang' };
      if(antwort.status === 413) throw { code:'prompt_too_large', message:'Anfrage zu gross' };
      throw { code:'server', message:'Der Tutor-Dienst antwortete mit Fehler ' + antwort.status + '.' };
    }

    var typ = (antwort.headers.get('content-type') || '').toLowerCase();

    /* Weg a: Ereignisstrom, Text waechst mit jedem Stueck. */
    if(typ.indexOf('text/event-stream') >= 0 && antwort.body && antwort.body.getReader){
      var leser = antwort.body.getReader();
      var dek = new TextDecoder();
      var puffer = '';
      var text = '';
      var abgeschnitten = false;
      try{
        for(;;){
          var stueck = await leser.read();
          if(stueck.done) break;
          puffer += dek.decode(stueck.value, { stream:true });
          var zeilen = puffer.split(String.fromCharCode(10));
          puffer = zeilen.pop();
          for(var i = 0; i < zeilen.length; i++){
            var z = zeilen[i].trim();
            if(z.indexOf('data:') !== 0) continue;
            var nutz = z.slice(5).trim();
            if(!nutz || nutz === '[DONE]') continue;
            try{
              var d = JSON.parse(nutz);
              if(typeof d.text === 'string'){
                text = d.text;
                if(opt.onText) opt.onText({ text: text });
              }
              if(d.truncated) abgeschnitten = true;
            }catch(e){}
          }
        }
      }finally{
        clearTimeout(timer);
      }
      return { text: text, truncated: abgeschnitten };
    }

    /* Weg b: eine einzelne JSON-Antwort. */
    var daten;
    try{
      daten = await antwort.json();
    }catch(e){
      clearTimeout(timer);
      throw { code:'invalid_json', message:'Die Antwort war kein gueltiges JSON.' };
    }
    clearTimeout(timer);

    if(modus === 'json') return daten;
    var fertig = typeof daten.text === 'string' ? daten.text : String(daten.text || '');
    if(opt.onText && fertig) opt.onText({ text: fertig });
    return { text: fertig, truncated: !!daten.truncated };
  }

  function senden(nachrichten, opt){ return anfrage(nachrichten, opt, 'text'); }
  senden.json = function(anweisung, opt){
    return anfrage([{ role:'user', content:String(anweisung) }], opt, 'json');
  };
  senden.herkunft = 'backend';
  return senden;
}
async function kiAnbieterWaehlen(){
  if(KI.modus === 'aus') return null;

  if(KI.modus === 'auto' || KI.modus === 'artifact'){
    try{
      if(window.claude && window.claude.use){
        var fn = await window.claude.use('sample');
        if(fn){ fn.herkunft = 'artifact'; return fn; }
      }
    }catch(e){}
    if(KI.modus === 'artifact') return null;
  }

  if((KI.modus === 'auto' || KI.modus === 'backend') && KI.endpunkt){
    return kiBackendAnbieter(KI.endpunkt);
  }
  return null;
}
function kiHerkunftText(){
  if(!tutor.fn) return 'nicht verfügbar';
  if(tutor.fn.herkunft === 'backend') return 'eigener Dienst';
  return 'Claude über dein Konto';
}
function tutorAnweisung(){
  return [
    'Du bist der Lern-Tutor in einem Online-Kurs zur Vorbereitung auf die IHK-Abschlusspruefung Teil 1',
    '(AP1) im Beruf Fachinformatiker fuer Anwendungsentwicklung in Deutschland.',
    '',
    'SO ANTWORTEST DU:',
    '- Immer auf Deutsch, mit Du-Anrede, sachlich und freundlich.',
    '- Kurz und praezise. Zwei bis sechs Saetze reichen meistens.',
    '- Erst die Antwort, dann die Begruendung. Nie umgekehrt.',
    '- Bei Rechenaufgaben IMMER den vollstaendigen Rechenweg Schritt fuer Schritt,',
    '  mit Einheiten, und das Ergebnis am Ende klar benannt.',
    '- Wenn es zum Thema eine Lektion im Kurs gibt, nenne sie am Ende in einer',
    '  eigenen Zeile im Format: Dazu im Kurs: <Modultitel> - <Lektionstitel>',
    '- Wenn eine Frage typische Pruefungsfallen enthaelt, weise darauf hin.',
    '- Wenn du etwas nicht sicher weisst, sage das offen. Erfinde keine',
    '  Paragraphen, Normen, Zahlen oder Fristen.',
    '- Nutze einfache Formatierung: kurze Absaetze, Aufzaehlungen mit "- ",',
    '  Tabellen nur wenn sie wirklich helfen. Kein Markdown-Fettdruck noetig.',
    '',
    'WAS DU TUN KANNST, wenn darum gebeten wird:',
    '- einen Begriff erklaeren, auch mit Beispiel',
    '- eine Uebungsaufgabe im AP1-Stil stellen und danach bewerten',
    '- eine Loesung der lernenden Person pruefen und sagen, wo Punkte fehlen',
    '- den Unterschied zwischen zwei Begriffen herausarbeiten',
    '- eine Merkhilfe vorschlagen',
    '',
    'ZUSATZTEILE PHP & LARAVEL (Teil 10) und GIT (Teil 11): gehoeren nicht zur AP1. Fragen dazu beantwortest',
    'du als erfahrene PHP- und Laravel-Entwicklerin bzw. erfahrener Entwickler, mit kurzen,',
    'lauffaehigen Codebeispielen fuer aktuelles PHP 8 und Laravel. Weise auf Sicherheit',
    '(XSS, SQL-Injection, Mass Assignment, fehlende Autorisierung) hin, wo es passt.',
    '',
    'DAS IST DER AUFBAU DES KURSES (nutze ihn fuer Verweise):',
    TUTOR_INDEX,
    '',
    'Antworte ab jetzt auf die Fragen der lernenden Person.'
  ].join('\n');
}
async function tutorInit(){
  if(tutor.ready || tutor.off) return;
  try{
    tutor.fn = await kiAnbieterWaehlen();
  }catch(e){ tutor.fn = null; }
  tutor.ready = true;
  if(!tutor.fn) tutor.off = true;
  if(state.currentId === 'tutor') renderContent();
}
async function tutorNeuVerbinden(){
  tutor.ready = false;
  tutor.off = false;
  tutor.fn = null;
  tutor.hinweis = '';
  await tutorInit();
  renderContent();
  if(typeof dockZeichnen === 'function') dockZeichnen();
}
function kiModusSetzen(wert){
  KI.modus = wert || 'auto';
  kiSpeichern();
  tutorNeuVerbinden();
}
function kiEndpunktSetzen(wert){
  KI.endpunkt = String(wert || '').trim();
  kiSpeichern();
}
function tutorFehlertext(code){
  switch(code){
    case 'not_granted':
    case 'sampling_disabled':
    case 'not_declared':
    case 'capability_disabled':
      tutor.off = true;
      return 'Der Tutor ist in dieser Ansicht nicht verfuegbar. Der Rest des Kurses funktioniert unveraendert.';
    case 'network':
      return 'Der Tutor-Dienst ist nicht erreichbar. Pruefe deine Verbindung und die Adresse in den Einstellungen.';
    case 'server':
      return 'Der Tutor-Dienst hat mit einem Fehler geantwortet. Versuche es in einigen Minuten erneut.';
    case 'aborted':
      return '';
    case 'rate_limited':
      return 'Gerade zu viele Anfragen. Warte einen Moment und frag dann noch einmal.';
    case 'session_expired':
      return 'Deine Sitzung ist abgelaufen. Melde dich neu an und versuche es noch einmal.';
    case 'prompt_too_large':
      return 'Die Unterhaltung ist zu lang geworden. Setze sie mit \u201aNeu beginnen\u2018 zurueck.';
    case 'refused':
      return 'Diese Frage kann ich so nicht beantworten. Formuliere sie bitte anders.';
    case 'empty_completion':
      return 'Darauf kam keine Antwort. Stelle die Frage etwas konkreter.';
    case 'invalid_json':
      return 'Die Bewertung kam in einer unerwarteten Form zurueck. Versuche es noch einmal \u2014 '+
             'bei Wiederholung liegt es meist an einer zu langen Eingabe.';
    case 'cancelled':
      return '';
    default:
      /* Den Rohcode mitgeben: sonst sucht man im Dunkeln. */
      return 'Das hat nicht geklappt. Versuche es gleich noch einmal.'+
             (code ? ' (Grund: ' + code + ')' : '');
  }
}
function tutorAbbrechen(){
  if(tutor.ctl) tutor.ctl.abort();
}
function tutorNeu(){
  tutorAbbrechen();
  tutor.turns = [];
  tutor.hinweis = '';
  chatAktualisieren();
}
function chatAktualisieren(){
  if(state.currentId === 'tutor') renderContent();
  dockZeichnen();
  var k = document.getElementById('dockKnopf');
  if(k && tutor.off){ k.hidden = true; }
  /* Kam die Antwort, waehrend das Dock zu war, meldet der Knopf das. */
  var p = document.getElementById('dockPunkt');
  if(p){
    var letzte = tutor.turns[tutor.turns.length - 1];
    p.hidden = !(!dock.offen && !tutor.busy && letzte && letzte.role === 'assistant' && letzte.content);
  }
}
function tutorSchnell(text){
  var ta = document.getElementById('tutorInput');
  if(ta){ ta.value = text; ta.focus(); }
  tutorSenden();
}
function tutorSenden(){
  var ta = document.getElementById('tutorInput');
  var frage = ta ? ta.value.trim() : '';
  if(!frage) return;
  if(ta) ta.value = '';
  tutorFrage(frage);
}
function dockFrage(frage){
  var f = document.getElementById('dockFeld');
  if(!frage && f) frage = f.value.trim();
  if(!frage) return;
  if(f){ f.value = ''; f.style.height = 'auto'; }
  tutorFrage(frage);
}
async function tutorFrage(frage){
  if(tutor.busy || tutor.off || !tutor.fn) return;
  frage = String(frage || '').trim();
  if(!frage) return;

  tutor.turns.push({ role:'user', content: frage });
  tutor.turns.push({ role:'assistant', content: '', pending:true });
  tutor.busy = true;
  tutor.hinweis = '';
  chatAktualisieren();

  var ziel = tutor.turns[tutor.turns.length - 1];
  tutor.ctl = new AbortController();

  /* Aelteste Runden verwerfen, damit der Kontext nicht ueberlaeuft.
     Anweisung und Seitenkontext bleiben immer erhalten. */
  var verlauf = tutor.turns.filter(function(t){ return !t.pending; });
  while(verlauf.length > 12) verlauf.shift();
  var eingabe = [
    { role:'user', content: tutorAnweisung() },
    { role:'user', content: dockKontext() }
  ].concat(verlauf.map(function(t){ return { role:t.role, content:t.content }; }));
  /* Die Folge muss auf einer Frage enden. */
  while(eingabe.length && eingabe[eingabe.length - 1].role !== 'user') eingabe.pop();

  try{
    var res = await tutor.fn(eingabe, {
      cache: false,
      signal: tutor.ctl.signal,
      modelTier: 'default',
      onText: function(u){
        ziel.content = u.text;
        ziel.pending = false;
        var el = document.getElementById('tutorLive');
        if(el) el.textContent = u.text;
        var box = document.getElementById('tutorVerlauf');
        if(box) box.scrollTop = box.scrollHeight;
        var dl = document.getElementById('dockLive');
        if(dl) dl.textContent = u.text;
        var dv = document.getElementById('dockVerlauf');
        if(dv) dv.scrollTop = dv.scrollHeight;
      }
    });
    ziel.content = res.text;
    ziel.pending = false;
    if(res.truncated) tutor.hinweis = 'Die Antwort wurde gek\u00fcrzt. Frag nach weniger auf einmal.';
    state.tutorFragen = (state.tutorFragen || 0) + 1;
    if(state.tutorFragen >= 1) grantBadge('tutor_fan');
    if(state.tutorFragen >= 25) grantBadge('tutor_profi');
    awardXp(5, 'Frage an den Tutor', 'tutor:' + state.tutorFragen);
    saveProgress();
  }catch(e){
    var txt = (e && e.text) ? e.text : '';
    ziel.content = txt;
    ziel.pending = false;
    if(!txt) tutor.turns.pop();
    tutor.hinweis = tutorFehlertext(e && e.code);
  }finally{
    tutor.busy = false;
    tutor.ctl = null;
    chatAktualisieren();
    var d = document.getElementById('dockFeld');
    if(dock.offen && d){ d.focus(); }
    else {
      var i = document.getElementById('tutorInput');
      if(i) i.focus();
    }
  }
}
function tutorZuLektion(lessonId){
  var l = FLAT.find(function(x){ return x.id === lessonId; });
  var m = moduleOfLesson(lessonId);
  var frage = 'Erkl\u00e4re mir den Kern dieser Lektion in eigenen Worten und nenne die h\u00e4ufigste Pr\u00fcfungsfalle dazu.';
  /* Ohne Tutor-Faehigkeit bleibt der alte Weg ueber die eigene Seite. */
  if(tutor.off || !tutor.fn){
    if(l && m) tutor.vorlage = 'Ich lerne gerade die Lektion \u201e' + l.title + '\u201c aus dem Modul \u201e' +
      m.title + '\u201c. ' + frage;
    selectLesson('tutor');
    return;
  }
  dockOeffnen();
  var f = document.getElementById('dockFeld');
  if(f){ f.value = frage; dockWachsen(f); f.focus(); }
}
function renderTutor(){
  if(!tutor.ready) tutorInit();

  var h = '<div class="breadcrumb">Training</div><h1>AP1-Tutor</h1>';

  if(tutor.off){
    h += '<p class="intro-sub">Der Tutor beantwortet deine Fragen zum Kursstoff. In dieser Ansicht ist er gerade nicht verf\u00fcgbar \u2014 ' +
         'das kann daran liegen, dass die Seite als lokale Datei ge\u00f6ffnet ist oder die Nutzung nicht freigegeben wurde. ' +
         'Alle anderen Funktionen des Kurses arbeiten unver\u00e4ndert weiter.</p>';
    return h;
  }
  if(!tutor.fn){
    h += '<p class="intro-sub">Der Tutor wird geladen \u2026</p>';
    return h;
  }

  h += '<p class="intro-sub">Frag alles zum Pr\u00fcfungsstoff: Begriffe erkl\u00e4ren lassen, eine \u00dcbungsaufgabe anfordern, ' +
       'deine eigene L\u00f6sung pr\u00fcfen lassen oder zwei Begriffe gegen\u00fcberstellen. Der Tutor kennt den Aufbau dieses Kurses ' +
       'und verweist auf die passende Lektion. Jede Frage bringt 5 XP.</p>' +
       '<p class="intro-sub">Derselbe Tutor sitzt unten rechts in jeder Ansicht \u2014 dort beantwortet er Fragen, '+
       'ohne dass du die Lektion verl\u00e4sst. Der Verlauf ist hier und dort derselbe.</p>';

  h += '<div class="tutor-box">';
  h += '<div class="tutor-verlauf" id="tutorVerlauf">';
  if(!tutor.turns.length){
    h += '<div class="tutor-leer">Noch keine Frage gestellt. Unten anfangen \u2014 oder einen der Vorschl\u00e4ge nehmen.</div>';
  }
  tutor.turns.forEach(function(t, i){
    var letzte = (i === tutor.turns.length - 1);
    if(t.role === 'user'){
      h += '<div class="tutor-msg user"><div class="tutor-rolle">Du</div><div class="tutor-text">'+esc(t.content)+'</div></div>';
    } else {
      h += '<div class="tutor-msg bot"><div class="tutor-rolle">Tutor</div>'+
           '<div class="tutor-text"'+(letzte ? ' id="tutorLive"' : '')+'>'+
           (t.pending ? '<span class="tutor-denkt">denkt nach \u2026</span>' : esc(t.content))+
           '</div></div>';
    }
  });
  h += '</div>';

  if(tutor.hinweis){
    h += '<div class="tutor-hinweis">'+esc(tutor.hinweis)+'</div>';
  }

  var vor = tutor.vorlage ? esc(tutor.vorlage) : '';
  tutor.vorlage = '';
  h += '<div class="tutor-eingabe">'+
       '<textarea id="tutorInput" class="tutor-input" rows="3" spellcheck="false" '+
       (tutor.busy ? 'disabled ' : '')+
       'placeholder="Deine Frage \u2026 (Strg+Enter sendet)">'+vor+'</textarea>'+
       '<div class="ex-actions" style="margin-top:10px;">';
  if(tutor.busy){
    h += '<button class="ex-btn" onclick="tutorAbbrechen()">Stopp</button>';
  } else {
    h += '<button class="ex-btn primary" onclick="tutorSenden()">Fragen</button>';
  }
  h += '<button class="ex-btn" onclick="tutorNeu()">Neu beginnen</button>';
  h += '</div></div>';
  h += '</div>';

  if(!tutor.turns.length){
    h += '<h2 class="sec-h">Womit soll ich anfangen?</h2><div class="tutor-chips">';
    [ 'Erkl\u00e4re mir Subnetting an einem Beispiel mit /26.',
      'Was ist der Unterschied zwischen Datenschutz und Datensicherheit?',
      'Stelle mir eine Netzplan-Aufgabe im AP1-Stil.',
      'Warum zeigt der Pfeil bei include anders als bei extend?',
      'Gib mir eine Merkhilfe f\u00fcr die OSI-Schichten.',
      'Pr\u00fcfe meine L\u00f6sung: Ich soll 192.168.5.130/26 analysieren.',
      'Was sind die drei Lernarten beim maschinellen Lernen?',
      'Erkl\u00e4re Kapselung so, als w\u00e4re ich im ersten Lehrjahr.'
    ].forEach(function(t){
      h += '<button class="tutor-chip" onclick="tutorSchnell(\''+t.replace(/'/g, "\\'")+'\')">'+esc(t)+'</button>';
    });
    h += '</div>';
  }

  h += '<div class="ex-panel" style="margin-top:20px;"><strong>Wie der Tutor arbeitet:</strong> '+
       'Deine Frage geht an Claude \u2014 mit deinem eigenen Konto, direkt aus dieser Seite heraus. '+
       'Es wird kein fremder Dienst genutzt und kein Schl\u00fcssel gespeichert. Beim ersten Mal fragt dein Browser, '+
       'ob die Seite das darf. Der Verlauf bleibt nur in dieser Sitzung und wird nicht gespeichert. '+
       '<em>Pr\u00fcfe wichtige Angaben \u2014 Paragraphen, Fristen, Zahlen \u2014 immer gegen die Lektion oder das Formelblatt.</em></div>';

  return h;
}
function wireTutor(){
  var ta = document.getElementById('tutorInput');
  if(!ta) return;
  ta.onkeydown = function(ev){
    if((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter'){ ev.preventDefault(); tutorSenden(); }
  };
  if(!tutor.busy && !dock.offen) ta.focus();
}
function weichRendern(fn){
  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(document.startViewTransition && !reduziert){
    try{ document.startViewTransition(fn); return; }catch(e){}
  }
  fn();
}
function fokusUmschalten(){
  var an = document.documentElement.getAttribute('data-fokus') === '1';
  document.documentElement.setAttribute('data-fokus', an ? '0' : '1');
  try{ localStorage.setItem('ap1-fokus', an ? '0' : '1'); }catch(e){}
  var h = document.getElementById('fokusHinweis');
  if(h){
    h.textContent = an ? 'Lesemodus aus' : 'Lesemodus an · F beendet ihn';
    h.classList.add('an');
    clearTimeout(h._t);
    h._t = setTimeout(function(){ h.classList.remove('an'); }, 1900);
  }
}
function pruefungsTage(){
  if(!state.pruefungsdatum) return null;
  var z = new Date(state.pruefungsdatum + 'T00:00:00');
  if(isNaN(z)) return null;
  var heute = new Date(); heute.setHours(0,0,0,0);
  return Math.round((z - heute) / 86400000);
}
function setzePruefung(wert){
  state.pruefungsdatum = wert || '';
  saveProgress();
  renderContent();
}
function setzeZiel(wert){
  var n = parseInt(wert, 10);
  state.tagesziel = (isNaN(n) || n < 1) ? 3 : Math.min(n, 30);
  saveProgress();
  renderContent();
}
function heuteGeschafft(){
  var t = todayKey();
  return (state.dayCount && state.dayCount.day === t) ? state.dayCount.n : 0;
}
function lernplan(){
  var tage = pruefungsTage();
  if(tage === null || tage <= 0) return null;

  var offeneModule = [];
  var offenGesamt = 0;
  MODULES.forEach(function(m){
    var offen = m.lessons.filter(function(l){ return !state.completed.has(l.id); }).length;
    if(offen){ offeneModule.push({ m:m, offen:offen }); offenGesamt += offen; }
  });
  if(!offenGesamt) return { fertig:true, puffer:tage, module:[] };

  /* Puffer fuer die Schlussphase: ein Fuenftel, mindestens 3, hoechstens 14 Tage. */
  var puffer = Math.min(14, Math.max(3, Math.round(tage * 0.2)));
  /* Bei sehr wenig Restzeit darf der Puffer nicht groesser werden als
     die verbleibenden Tage - mindestens ein Lerntag bleibt immer. */
  puffer = Math.min(puffer, Math.max(0, tage - 1));
  var lerntage = Math.max(1, tage - puffer);
  var proTag = offenGesamt / lerntage;

  var heute = new Date(); heute.setHours(0,0,0,0);
  var summe = 0;
  var plan = offeneModule.map(function(e){
    summe += e.offen;
    var tagNr = Math.min(lerntage, Math.ceil(summe / proTag));
    var d = new Date(heute.getTime() + tagNr * DAY);
    return { modul:e.m, offen:e.offen, datum:d };
  });
  var pufferStart = new Date(heute.getTime() + lerntage * DAY);
  return { fertig:false, proTag:Math.ceil(proTag), puffer:puffer,
           pufferStart:pufferStart, module:plan, machbar:proTag <= (state.tagesziel || 3) };
}
function datumKurz(d){
  return d.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit' });
}
function renderLernplan(){
  var p = lernplan();
  if(!p){
    if(state.pruefungsdatum) return '';
    return '<div class="plan-hinweis">Trag im <button class="ex-btn" onclick="selectLesson(\'profile\')">Profil</button> '+
           'deinen Prüfungstermin ein — dann rechnet dir der Lernplan aus, welches Modul bis wann sitzen muss.</div>';
  }
  if(p.fertig){
    return '<div class="plan-hinweis gut">Alle Lektionen sind durch. Die verbleibenden '+p.puffer+' Tage '+
           'gehören der Wiederholung: Karteikarten, Fehlerheft und Prüfungssimulationen.</div>';
  }
  var h = '<h2 class="sec-h">Lernplan bis zur Prüfung</h2>';
  h += '<p class="intro-sub">'+p.proTag+' Lektionen pro Tag bis zum '+datumKurz(p.pufferStart)+'. '+
       'Danach bleiben '+p.puffer+' Tage nur zum Wiederholen. '+
       (p.machbar ? 'Dein Tagesziel reicht dafür.' : '<b>Das liegt über deinem Tagesziel</b> — zieh es im Profil nach oben oder plane längere Einheiten.')+
       '</p>';
  h += '<ol class="plan-liste">';
  p.module.slice(0, 8).forEach(function(e){
    h += '<li class="plan-zeile">'+
      '<button class="plan-titel" onclick="selectLesson(\''+e.modul.lessons[0].id+'\')">'+esc(e.modul.title)+'</button>'+
      '<span class="plan-offen">'+e.offen+' offen</span>'+
      '<span class="plan-datum">bis '+datumKurz(e.datum)+'</span></li>';
  });
  h += '</ol>';
  if(p.module.length > 8){
    h += '<p class="plan-rest">… und '+(p.module.length - 8)+' weitere Module danach.</p>';
  }
  return h;
}
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
