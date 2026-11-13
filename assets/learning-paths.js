/* Learning-path views never mutate the canonical content or saved progress. */
var RP_PATHS = [
  { id:'all', title:'Alle Lernpfade', description:'Alle Inhalte und freie Themenwahl.' },
  { id:'ap1', title:'AP1', description:'Prüfungsgrundlagen für Fachinformatiker.' },
  { id:'htmlcss', title:'HTML & CSS', description:'Semantik, Formulare, Boxmodell, Flexbox, Grid und responsive Seiten.' },
  { id:'mariadb', title:'MariaDB', description:'SQL, Constraints, Transaktionen, Indizes und sicherer Betrieb.' },
  { id:'apis', title:'APIs & Integration', description:'HTTP/REST, GraphQL, RPC, SOAP, OData und Ereignisse.' },
  { id:'agents', title:'KI, MCP & Agents', description:'MCP-Verträge, Harnesses und überprüfbare KI-Programmierabläufe · Stand 06.11.2026.' },
  { id:'java', title:'Java', description:'Sprachkern, professionelle Entwicklung und Spring Boot.' },
  { id:'abap', title:'ABAP', description:'SAP, modernes ABAP, RAP und Betrieb.' },
  { id:'php', title:'PHP & Laravel', description:'Vom ersten PHP-Programm bis zur Laravel-Anwendung.' },
  { id:'git', title:'Git', description:'Versionierung, Branches und Zusammenarbeit.' }
  ,{ id:'javascript', title:'JavaScript & Vue', description:'Sprachkern, TypeScript, Komponenten, Router, Pinia, Tests und Projekt.' }
];
var rpPath = 'all';
try { rpPath = localStorage.getItem('rootpfad-learning-path') || 'all'; } catch(e) {}
if(!RP_PATHS.some(function(p){ return p.id === rpPath; })) rpPath = 'all';
var rpCatalog = { modules:MODULES, lessons:FLAT, cards:CARDS, exercises:EXERCISES, traces:TRACES,
  labor:typeof LABOR === 'undefined' ? [] : LABOR, sheet:CHEATSHEET_HTML };
var rpLessonPaths = {};
rpCatalog.modules.forEach(function(m){
  m.learningPath = m.course || (m.part === 10 ? 'php' : m.part === 11 ? 'git' : 'ap1');
  m.lessons.forEach(function(l){ rpLessonPaths[l.id] = m.learningPath; });
});
function rpMatches(path, selected){ return (selected || rpPath) === 'all' || path === (selected || rpPath); }
function rpData(selected){
  selected = selected || rpPath;
  return {
    modules:rpCatalog.modules.filter(function(m){ return rpMatches(m.learningPath, selected); }),
    lessons:rpCatalog.lessons.filter(function(l){ return rpMatches(rpLessonPaths[l.id], selected); }),
    cards:rpCatalog.cards.filter(function(c){ return rpMatches(rpLessonPaths[c.lessonId], selected); }),
    exercises:rpCatalog.exercises.filter(function(e){ return rpMatches(e.course || 'ap1', selected); }),
    traces:rpCatalog.traces.filter(function(t){ return rpMatches(t.course || 'ap1', selected); }),
    labor:rpCatalog.labor.filter(function(t){ return rpMatches(rpLessonPaths[t.lektion], selected); })
  };
}
function rpCompleted(){ return FLAT.filter(function(l){ return state.completed.has(l.id); }).length; }
/* Der Spickzettel (ca. 100 KB HTML) wird je Lernpfad nur einmal gefiltert; rpScoped läuft bei jedem Rendern mehrfach. */
var rpSheetCache = {};
function rpSheetHtml(selected){
  var key = selected || rpPath;
  if(rpSheetCache[key] === undefined){
    var sheet = document.createElement('div'); sheet.innerHTML = rpCatalog.sheet;
    sheet.querySelectorAll('[id^="spickzettel-"]').forEach(function(section){
      if(!rpMatches(section.id.replace('spickzettel-', ''), selected)) section.remove();
    });
    if(key === 'java' || key === 'abap') {
      var section = sheet.querySelector('#spickzettel-' + key);
      rpSheetCache[key] = section ? section.outerHTML : '';
    } else rpSheetCache[key] = sheet.innerHTML;
  }
  return rpSheetCache[key];
}
var rpScopeDepth = 0;
function rpScoped(fn, selected){
  if(rpScopeDepth) return fn();
  var old = [MODULES, FLAT, CARDS, EXERCISES, TRACES, PARTS, TOTAL, TOTAL_MIN, CHEATSHEET_HTML, LABOR];
  var d = rpData(selected);
  rpScopeDepth++;
  MODULES = d.modules; FLAT = d.lessons; CARDS = d.cards; EXERCISES = d.exercises; TRACES = d.traces; LABOR = d.labor;
  PARTS = Array.from(new Set(MODULES.map(function(m){ return m.part; })));
  TOTAL = FLAT.length; TOTAL_MIN = FLAT.reduce(function(n,l){ return n + l.minutes; },0);
  CHEATSHEET_HTML = rpSheetHtml(selected);
  try { return fn(); }
  finally {
    [MODULES, FLAT, CARDS, EXERCISES, TRACES, PARTS, TOTAL, TOTAL_MIN, CHEATSHEET_HTML, LABOR] = old;
    rpScopeDepth--;
  }
}
function rpAP1Context(){ return typeof rpPath === 'undefined' || rpPath === 'all' || rpPath === 'ap1'; }
function rpPathControls(){
  var host = document.getElementById('rpPathControl');
  if(!host){
    host = document.createElement('div'); host.id = 'rpPathControl';
    document.getElementById('moduleNav').before(host);
  }
  host.innerHTML = '<label for="rpPathSelect">Dein Lernpfad</label><select id="rpPathSelect" onchange="rpChoosePath(this.value)">' +
    RP_PATHS.map(function(p){ return '<option value="'+p.id+'"'+(p.id === rpPath ? ' selected' : '')+'>'+p.title+'</option>'; }).join('')+'</select>';
}
function rpChoosePath(id){
  if(!RP_PATHS.some(function(p){ return p.id === id; })) return;
  if((exam.active && !exam.finished) || klausur.phase === 'laufend'){
    showToast('<span>Bitte zuerst die laufende Prüfung beenden oder abbrechen.</span>');
    rpPathControls(); return;
  }
  rpPath = id;
  try { localStorage.setItem('rootpfad-learning-path', id); } catch(e) {}
  review.queue = []; review.done = 0;
  tracer = { id:null, step:0, fb:null, finalFb:null, finished:false };
  if(typeof lab !== 'undefined' && lab.blitz){ clearInterval(lab.blitz.timer); lab.blitz = null; }
  lfFilter = 0;
  state.currentId = 'intro';
  render();
  document.getElementById('content').focus({preventScroll:true});
}
function rpPicker(){
  return '<section class="rp-path-picker" aria-labelledby="rpPathHeading"><h2 id="rpPathHeading">Was möchtest du lernen?</h2><p>Deine Auswahl filtert Lektionen und Trainings. Lernstände bleiben beim Wechsel erhalten.</p><div class="rp-path-grid">'+
    RP_PATHS.map(function(p){
      var d = rpData(p.id), done = d.lessons.filter(function(l){ return state.completed.has(l.id); }).length;
      return '<button type="button" class="rp-path-card" aria-pressed="'+(rpPath === p.id)+'" onclick="rpChoosePath(\''+p.id+'\')"><strong>'+p.title+'</strong><span>'+p.description+'</span><small>'+done+' / '+d.lessons.length+' Lektionen abgeschlossen</small></button>';
    }).join('')+'</div></section>';
}
(function(){
  // These functions are synchronous. Timers and asynchronous tutor calls retain
  // the full catalog; only synchronous rendering/pool selection gets a view.
  ['renderSidebar','renderProgressPill','renderContent','renderRail','dueCards','newCards',
    'startReview','startTrace','klStarten','blitzStart','labEmpfehlung','blitzTick'].forEach(function(name){
    var base = window[name]; if(typeof base !== 'function') return;
    window[name] = function(){ var args = arguments, self = this; return rpScoped(function(){ return base.apply(self,args); }); };
  });
  var content = renderContent;
  renderContent = function(){
    content.apply(this,arguments);
    rpPathControls();
    var el = document.getElementById('content');
    if(state.currentId === 'intro' || state.currentId === 'heute'){
      el.querySelector('.rp-path-picker')?.remove();
      el.insertAdjacentHTML('afterbegin', rpPicker());
      var claim = el.querySelector('.intro-claim');
      if(claim) claim.textContent = RP_PATHS.find(function(p){ return p.id === rpPath; }).description;
      var sub = el.querySelector('.intro-hero .intro-sub');
      if(sub) sub.textContent = 'Lerne in deinem Tempo: Lektionen, Quizfragen und Wiederholungen passend zu deiner Auswahl. XP und Abzeichen gelten weiterhin für die gesamte Plattform.';
    }
    if(['subnet','labor','tracer','exercises'].includes(state.currentId)){
      var d = rpData();
      var unavailable = (state.currentId === 'subnet' && !['all','ap1'].includes(rpPath)) ||
        (state.currentId === 'labor' && !d.labor.length) || (state.currentId === 'tracer' && !d.traces.length) ||
        (state.currentId === 'exercises' && !d.exercises.length);
      if(unavailable) el.innerHTML = '<h1>Für diesen Lernpfad nicht verfügbar</h1><p>Für diesen Trainingsmodus sind im gewählten Pfad noch keine Aufgaben hinterlegt. Quiz und Karteikarten kannst du bereits nutzen.</p><button class="start-btn" onclick="selectLesson(\'review\')">Karteikarten trainieren</button>';
    }
  };
  var sidebar = renderSidebar;
  renderSidebar = function(){ sidebar.apply(this,arguments); rpPathControls(); };
  var select = selectLesson;
  selectLesson = function(id){
    if(rpLessonPaths[id] && !rpMatches(rpLessonPaths[id])){
      showToast('<span>Diese Lektion gehört zu einem anderen Lernpfad. Bitte zuerst den Lernpfad wechseln.</span>'); return;
    }
    return select.apply(this,arguments);
  };
  var start = startExam;
  startExam = function(mode){
    // Explicit AP1 modes stay AP1 even when another learning path is selected.
    var selected = ['kurz','standard','ap1'].includes(mode) ? 'ap1' : mode === 'php' ? 'php' : mode === 'git' ? 'git' : rpPath;
    if(exam.active && !exam.finished) return;
    var result = rpScoped(function(){ return start(mode); }, selected);
    render();
    return result;
  };
  EXAM_MODES.kurz.desc = '15 Fragen ausschließlich aus den AP1-Grundlagen. Zusatzpfade sind ausgeschlossen.';
  EXAM_MODES.standard.desc = '30 gewichtete Fragen ausschließlich aus dem AP1-Fragenpool.';
  EXAM_MODES.ap1.desc = '40 AP1-Fragen in 90 Minuten. Keine Fragen aus den Zusatzpfaden; Übungssimulation, keine offizielle IHK-Prüfung.';
  EXAM_MODES.pfad = {label:'Lernpfadtraining', n:20, min:25, allPaths:true, desc:'Bis zu 20 Fragen passend zum aktuell gewählten Lernpfad. Bei „Alle Lernpfade“ frei gemischt.'};
  EXAM_MODES.fehler.allPaths = true;
  EXAM_MODES.weak.allPaths = true;
  if(rpLessonPaths[state.currentId] && !rpMatches(rpLessonPaths[state.currentId])) state.currentId = 'intro';
  if(!window.RP_BOOTING) render();
})();
