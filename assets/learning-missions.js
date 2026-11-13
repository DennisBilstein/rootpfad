/* Evidence-based progress: activity, delayed recall and transfer are distinct. */
var rpLearning = state.learning || { events:{}, missions:{} };
state.learning = rpLearning;
var rpMission = null;
var rpBossRun = null;
function rpLearningMerge(incoming){
  if(!incoming || typeof incoming !== 'object') return;
  Object.assign(rpLearning.events, incoming.events || {});
  Object.keys(incoming.missions || {}).forEach(function(key){
    var mine = rpLearning.missions[key], other = incoming.missions[key];
    if(other && (!mine || other.ts > mine.ts)) rpLearning.missions[key] = other;
  });
  state.learning = rpLearning;
}
function rpEvidence(event){
  var id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now()+'-'+Math.random();
  rpLearning.events[id] = Object.assign({ts:Date.now()},event);
  saveProgress();
}
function rpEvents(){ return Object.values(rpLearning.events); }
function rpBossForModule(id){ return RP_BOSSES.find(function(b){ return b.modules.includes(id); }); }
function rpLessonMastery(lesson){
  var ids = (lesson.quiz || []).map(function(q,i){ return typeof rpQuestionId==='function'?rpQuestionId(lesson,i):lesson.id+'#'+i; });
  var events = rpEvents().filter(function(e){ return e.kind === 'answer' && ids.includes(e.cardId); });
  var practiced = ids.length && ids.every(function(id){ return (state.stats[id]?.right || 0) > 0; });
  var retained = practiced && ids.every(function(id){
    var successes = events.filter(function(e){ return e.cardId === id && e.correct; }).map(function(e){ return e.ts; }).sort(function(a,b){ return a-b; });
    var wrong = events.filter(function(e){ return e.cardId === id && !e.correct; }).reduce(function(n,e){ return Math.max(n,e.ts); },0);
    var after = successes.filter(function(t){ return t > wrong; });
    return after.length >= 2 && after[after.length-1] - after[0] >= 3*DAY;
  });
  var label = retained ? 'Gefestigt' : practiced ? 'Geübt' : state.completed.has(lesson.id) ? 'Erkundet' : 'Noch offen';
  return {level:retained ? 3 : practiced ? 2 : state.completed.has(lesson.id) ? 1 : 0,label:label};
}
function rpModuleMastery(module){
  var lessons = module.lessons.map(rpLessonMastery);
  var level = lessons.length ? Math.min.apply(null,lessons.map(function(l){return l.level;})) : 0;
  var boss = rpBossForModule(module.id);
  var victories = boss ? new Set(rpEvents().filter(function(e){ return e.kind === 'boss' && e.bossId === boss.id && e.clean && e.score === e.total; }).map(function(e){ return e.variant; })).size : 0;
  if(level >= 3 && victories >= 2) return 'Übertragen';
  return ['Noch offen','Erkundet','Geübt','Gefestigt'][level];
}
function rpMissionKey(){ return todayKey()+':'+rpPath; }
function rpStartMission(){
  var cards = rpData().cards;
  var due = cards.filter(function(c){ return state.srs[c.id] && state.srs[c.id].due <= today0()+DAY-1; });
  var weak = cards.filter(function(c){ return (state.stats[c.id]?.wrong || 0) > 0; }).sort(function(a,b){ return (state.stats[b.id]?.wrong || 0)-(state.stats[a.id]?.wrong || 0); });
  var queue = shuffled(due).concat(shuffled(cards.filter(function(c){ return !due.includes(c); })));
  var reviewCards = queue.slice(0,5);
  var weakCard = weak.find(function(c){ return !reviewCards.includes(c); }) || queue.find(function(c){ return !reviewCards.includes(c); });
  var transfer = queue.find(function(c){ return !reviewCards.includes(c) && c !== weakCard; });
  if(!reviewCards.length) return;
  rpMission = {key:rpMissionKey(),path:rpPath,cards:reviewCards.concat(weakCard ? [weakCard] : [],transfer ? [transfer] : []),reviewCount:reviewCards.length,index:0,picked:null,text:'',revealed:false,done:false};
  state.currentId = 'mission'; renderContent();
}
function rpMissionRecall(){
  var input = document.getElementById('rpRecall');
  rpMission.text = input.value.trim();
  if(!rpMission.text){ input.focus(); return; }
  rpMission.revealed = true; renderContent();
}
function rpMissionAnswer(index){
  if(!rpMission || rpMission.picked !== null || rpMission.done) return;
  var card = rpMission.cards[rpMission.index];
  rpMission.picked = index;
  recordAnswer(card.id,index === card.correct);
  rateCard(card.id,index === card.correct ? 2 : 0);
  renderContent();
}
function rpMissionNext(){
  if(!rpMission || rpMission.picked === null) return;
  rpMission.index++; rpMission.picked = null; rpMission.text = ''; rpMission.revealed = false;
  if(rpMission.index >= rpMission.cards.length){
    rpMission.done = true;
    rpLearning.missions[rpMission.key] = {ts:Date.now(),path:rpMission.path};
    var key = 'mission:'+rpMission.key;
    if(!state.xpLog[key]){ state.xpLog[key] = 1; awardXp(15,'Tagesmission bearbeitet'); }
    saveProgress();
  }
  renderContent();
}
function rpRenderMission(){
  var h = '<div class="breadcrumb">Lernwerkstatt · etwa 15 Minuten, ohne Zeitlimit</div><h1>Deine Tagesmission</h1>';
  if(!rpMission || rpMission.path !== rpPath) return h+'<p>Fällige Karten zuerst, danach ein unsicheres Thema und eine Abrufaufgabe. Du kannst jederzeit pausieren. Nicht gespeicherte Antworten einer laufenden Runde werden beim Neuladen verworfen; beantwortete Fragen bleiben gespeichert.</p><button class="start-btn" onclick="rpStartMission()">Mission starten</button>';
  if(rpMission.done) return h+'<div class="callout"><h2>Mission bearbeitet</h2><p>Deine Antworten sind gespeichert und für Wiederholungen eingeplant. Der Abschluss zeigt Aktivität, nicht automatisch Beherrschung.</p></div><button class="start-btn" onclick="selectLesson(\'lernwerkstatt\')">Lernstand und Modul-Bosse</button>';
  var card = rpMission.cards[rpMission.index], stage = rpMission.index < rpMission.reviewCount ? 'Wiederholen' : rpMission.index === rpMission.reviewCount ? 'Unsicheres Thema / Vertiefung' : 'Erst selbst abrufen';
  var recall = rpMission.index > rpMission.reviewCount;
  h += '<p>Schritt '+(rpMission.index+1)+' / '+rpMission.cards.length+' · '+stage+'</p><div class="srs-card"><p class="badge topic">'+esc(card.moduleTitle)+'</p><h2>'+esc(card.q)+'</h2>';
  if(recall && !rpMission.revealed) return h+'<label for="rpRecall">Formuliere zuerst deine eigene Antwort. Sie wird nicht automatisch bewertet.</label><textarea id="rpRecall" class="tutor-input" rows="4" maxlength="4000"></textarea><button class="check-btn" onclick="rpMissionRecall()">Mit Antwortmöglichkeiten vergleichen</button></div>';
  if(recall) h += '<p><strong>Deine erste Antwort:</strong> '+esc(rpMission.text)+'</p><p>Wähle jetzt die passende Antwort. Nur diese Auswahl wird bewertet; das ist noch kein Transfernachweis.</p>';
  card.options.forEach(function(o,i){ h += '<button class="srs-opt" '+(rpMission.picked !== null ? 'disabled' : '')+' onclick="rpMissionAnswer('+i+')">'+esc(o)+'</button>'; });
  if(rpMission.picked !== null) h += '<div class="srs-explain">'+(rpMission.picked === card.correct ? 'Richtig. ' : 'Noch nicht richtig. ')+'Lösung: '+esc(card.options[card.correct])+'. '+esc(card.explain)+'</div><button class="check-btn" onclick="rpMissionNext()">Weiter</button>';
  return h+'</div>';
}
function rpStartBoss(id){
  var boss = RP_BOSSES.find(function(b){ return b.id === id; });
  if(!boss || !['all','abap'].includes(rpPath)) return;
  var solved = rpEvents().filter(function(e){ return e.kind === 'boss' && e.bossId === id && e.clean && e.score === e.total; });
  var variant = [0,1].find(function(v){ return !solved.some(function(e){ return e.variant === v; }); });
  if(variant === undefined) variant = rpEvents().filter(function(e){return e.kind === 'boss' && e.bossId === id;}).length % 2;
  rpBossRun = {id:id,variant:variant,index:0,score:0,hints:0,hint:false,picked:null,finished:false};
  state.currentId = 'boss'; renderContent();
}
function rpBossHint(){ if(rpBossRun && !rpBossRun.hint && rpBossRun.picked === null){ rpBossRun.hint = true; rpBossRun.hints++; renderContent(); } }
function rpBossAnswer(index){
  if(!rpBossRun || rpBossRun.picked !== null || rpBossRun.finished) return;
  var b = RP_BOSSES.find(function(b){return b.id === rpBossRun.id;});
  rpBossRun.picked = index;
  if(index === b.variants[rpBossRun.variant][rpBossRun.index].correct) rpBossRun.score++;
  renderContent();
}
function rpBossNext(){
  if(!rpBossRun || rpBossRun.picked === null || rpBossRun.finished) return;
  var b = RP_BOSSES.find(function(b){return b.id === rpBossRun.id;});
  rpBossRun.index++; rpBossRun.picked = null; rpBossRun.hint = false;
  if(rpBossRun.index >= b.variants[rpBossRun.variant].length){
    rpBossRun.finished = true;
    var clean = rpBossRun.hints === 0, total = b.variants[rpBossRun.variant].length;
    rpEvidence({kind:'boss',bossId:b.id,variant:rpBossRun.variant,clean:clean,score:rpBossRun.score,total:total});
    var key = 'boss:'+b.id+':'+rpBossRun.variant;
    if(clean && rpBossRun.score === total && !state.xpLog[key]){ state.xpLog[key] = 1; awardXp(30,'Modul-Boss selbstständig gelöst'); }
    saveProgress();
  }
  renderContent();
}
function rpRenderBoss(){
  if(!rpBossRun || !['all','abap'].includes(rpPath)) return '<h1>Modul-Bosse</h1><p>Wähle im ABAP-Lernpfad einen Boss aus.</p><button class="start-btn" onclick="selectLesson(\'lernwerkstatt\')">Zur Lernwerkstatt</button>';
  var run = rpBossRun, b = RP_BOSSES.find(function(b){ return b.id === run.id; }), questions = b.variants[run.variant];
  var h = '<div class="breadcrumb">Transfertraining · Variante '+(run.variant+1)+'</div><h1>'+esc(b.title)+'</h1>';
  if(run.finished) return h+'<div class="score-hero"><div class="score-num">'+run.score+' / '+questions.length+'</div><p>'+run.hints+' Hinweise genutzt</p><p>'+(run.score === questions.length && !run.hints ? 'Diese Variante ist selbstständig gelöst.' : 'Bearbeitet. Für den selbstständigen Nachweis müssen alle Antworten ohne Hinweise richtig sein.')+'</p></div><p>„Übertragen“ erfordert zwei unterschiedliche vollständig richtige Varianten ohne Hinweise und gefestigte Lektionen. Eine wiederholte Aufgabe ist kein Beweis für allgemeine Beherrschung.</p><button class="start-btn" onclick="rpStartBoss(\''+b.id+'\')">Nächste Variante / erneut üben</button> <button class="ex-btn" onclick="selectLesson(\'lernwerkstatt\')">Lernstand ansehen</button>';
  var q = questions[run.index];
  h += '<p>Aufgabe '+(run.index+1)+' / '+questions.length+' · Kein Zeitlimit. Hinweise kosten keine XP, verhindern aber den Selbstständigkeitsnachweis dieser Runde.</p><div class="srs-card"><h2>'+esc(q.q)+'</h2>';
  q.options.forEach(function(o,i){h += '<button class="srs-opt" '+(run.picked !== null ? 'disabled' : '')+' onclick="rpBossAnswer('+i+')">'+esc(o)+'</button>';});
  if(run.picked === null) h += '<button class="ex-btn" onclick="rpBossHint()">Hinweis anzeigen</button>'+(run.hint ? '<p>'+esc(q.hint)+'</p>' : '');
  else h += '<div class="srs-explain">'+(run.picked === q.correct ? 'Richtig. ' : 'Lösung: '+esc(q.options[q.correct])+'. ')+esc(q.explain)+'</div><button class="check-btn" onclick="rpBossNext()">Weiter</button>';
  return h+'</div>';
}
function rpRenderWorkshop(){
  var modules = rpData().modules;
  var done = !!rpLearning.missions[rpMissionKey()];
  var h = '<div class="breadcrumb">Lernen mit Rückmeldung</div><h1>Lernwerkstatt</h1><div class="callout"><h2>Deine 15-Minuten-Mission</h2><p>Bis zu fünf fällige Karten zuerst, ein Fehler-/Vertiefungsthema und eine Aufgabe mit eigener Antwort vor den Optionen. Ohne Zeitdruck; 15 Minuten sind ein Richtwert.</p><p>'+(done ? 'Heute bereits bearbeitet. Erneutes Üben ist möglich, Abschluss-XP gibt es nur einmal pro Tag und Pfad.' : 'Heute noch offen.')+'</p><button class="start-btn" onclick="rpStartMission()">Mission starten</button></div>';
  h += '<details class="callout"><summary>Wie werden Beherrschungsstufen bestimmt?</summary><p>Erkundet: alle Lektionen als bearbeitet markiert. Geübt: jede Lektionsquizfrage mindestens einmal richtig. Gefestigt: jede Frage seit dem letzten Fehler mindestens zweimal richtig, mit mindestens drei Tagen Abstand zwischen erster und letzter richtiger Antwort. Übertragen: zusätzlich beide Varianten des zugehörigen Bosses vollständig richtig ohne Hinweise.</p><p>Ein Modul erhält nur die niedrigste gemeinsame Stufe seiner Lektionen. Alte Quizstände zählen für „Geübt“; zeitliche Nachweise werden erst seit Einführung der Lernwerkstatt erfasst. Ohne Boss gibt es noch keinen Transfernachweis. Die Einstufung ist eine Lernhilfe, kein Zertifikat. XP und Selbsteinschätzung ersetzen keinen Nachweis.</p></details>';
  if(['all','abap'].includes(rpPath)){
    h += '<h2>ABAP-Modul-Bosse</h2><div class="rp-path-grid">';
    RP_BOSSES.forEach(function(b){
      var clean = new Set(rpEvents().filter(function(e){return e.kind === 'boss' && e.bossId === b.id && e.clean && e.score === e.total;}).map(function(e){return e.variant;})).size;
      h += '<button class="rp-path-card" onclick="rpStartBoss(\''+b.id+'\')"><strong>'+esc(b.title)+'</strong><span>3 gemischte Aufgaben je Variante</span><small>'+clean+' / 2 Varianten selbstständig gelöst</small></button>';
    }); h += '</div>';
  }
  h += '<h2 style="margin-top:24px">Deine Wissenskarte</h2><ul class="rp-mastery-list">';
  modules.forEach(function(m){ h += '<li><button class="ex-btn" onclick="selectLesson(\''+m.lessons[0].id+'\')">'+esc(m.title)+'</button><span>'+rpModuleMastery(m)+'</span></li>'; });
  return h+'</ul>';
}
(function(){
  var serializeBase = serialize;
  serialize = function(){ var data = serializeBase(); data.learning = rpLearning; return data; };
  var mergeBase = mergeIn;
  mergeIn = function(data){ mergeBase(data); rpLearningMerge(data?.learning); };
  try { rpLearningMerge(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').learning); } catch(e) {}
  var recordBase = recordAnswer;
  recordAnswer = function(id,correct){ recordBase(id,correct); rpEvidence({kind:'answer',cardId:id,correct:!!correct}); };
  var chooseBase = rpChoosePath;
  rpChoosePath = function(id){ var old = rpPath; chooseBase(id); if(old !== rpPath){ rpMission = null; rpBossRun = null; } };
  var contentBase = renderContent;
  renderContent = function(){
    if(state.currentId === 'lernwerkstatt' || state.currentId === 'mission' || state.currentId === 'boss'){
      document.getElementById('content').innerHTML = state.currentId === 'lernwerkstatt' ? rpRenderWorkshop() : state.currentId === 'mission' ? rpRenderMission() : rpRenderBoss();
      return;
    }
    contentBase.apply(this,arguments);
    var el = document.getElementById('content');
    if(['heute','intro'].includes(state.currentId)){
      el.querySelector('#rpMissionTeaser')?.remove();
      el.insertAdjacentHTML('afterbegin','<section id="rpMissionTeaser" class="callout"><h2>Deine nächste Lernmission</h2><p>Wiederholen, Schwächen aufarbeiten und erst selbst antworten – etwa 15 Minuten ohne Zeitlimit.</p><button class="start-btn" onclick="selectLesson(\'lernwerkstatt\')">Mission und Wissenskarte öffnen</button></section>');
    }
    var lesson = rpCatalog.lessons.find(function(l){ return l.id === state.currentId; });
    if(lesson){
      el.querySelector('#rpLessonMastery')?.remove();
      el.insertAdjacentHTML('afterbegin','<p id="rpLessonMastery" class="badge topic">Lernstand: '+rpLessonMastery(lesson).label+' · <a href="#" onclick="selectLesson(\'lernwerkstatt\');return false">Kriterien und Modul-Bosse</a></p>');
    }
  };
  var sideBase = renderSidebar;
  renderSidebar = function(){
    sideBase.apply(this,arguments);
    var button = document.getElementById('rpWorkshopNav');
    if(!button){ button = document.createElement('button'); button.id = 'rpWorkshopNav'; button.type = 'button'; button.textContent = 'Lernwerkstatt & Missionen'; button.onclick = function(){selectLesson('lernwerkstatt');}; document.getElementById('moduleNav').before(button); }
    button.className = 'nav-link'+(['lernwerkstatt','mission','boss'].includes(state.currentId) ? ' active' : '');
  };
  if(!window.RP_BOOTING) render();
})();
