var rpCompetencies={submissions:{},variants:{},feedback:{}};
var rpInitialCompetencies=state.competencies;
state.competencies=rpCompetencies;
var rpAssessmentModule=null;
function rpMergeCompetencies(data){
  if(!data)return;
  for(var kind of ['submissions','variants','feedback'])for(var key of Object.keys(data[kind]||{})){
    var value=data[kind][key],mine=rpCompetencies[kind][key];if(value&&(!mine||(value.ts||0)>=(mine.ts||0)))rpCompetencies[kind][key]=value;
  }
  state.competencies=rpCompetencies;
}
function rpCompetency(module){
  var ids=module.lessons.map(function(l){return l.id;}),questionIds=module.lessons.flatMap(function(l){return l.quiz.map(function(q,i){return rpQuestionId(l,i);});});
  var read=ids.filter(function(id){return state.completed.has(id);}).length;
  var recognized=questionIds.filter(function(id){return (state.stats[id]?.right||0)>0;}).length;
  var submission=rpCompetencies.submissions[module.id];
  return {read:read,total:ids.length,recognized:recognized,questions:questionIds.length,applied:submission?.status==='accepted',submitted:!!submission,label:submission?.status==='accepted'?'Praktisch abgenommen':submission?'Praktische Arbeit eingereicht':recognized?'Im Auswahlquiz wiedererkannt':read?'Als gelesen markiert':'Noch offen'};
}
function rpOpenAssessment(id){if(!rpData().modules.some(function(m){return m.id===id;}))return;rpAssessmentModule=id;state.currentId='assessment';renderContent();}
function rpSubmitAssessment(event){
  event.preventDefault();var form=event.currentTarget,fields=Object.fromEntries(new FormData(form));
  var assessment=RP_MODULE_ASSESSMENTS.find(function(a){return a.moduleId===rpAssessmentModule;});
  var record={moduleId:rpAssessmentModule,revision:assessment.revision,ts:Date.now(),status:'submitted',normal:fields.normal,boundary:fields.boundary,failure:fields.failure,evidence:fields.evidence,help:fields.help||'keine Angabe'};
  // Any edit invalidates the prior approval, rather than silently inheriting it.
  rpCompetencies.submissions[rpAssessmentModule]=record;saveProgress();renderContent();
}
function rpRenderAssessment(){
  var a=RP_MODULE_ASSESSMENTS.find(function(a){return a.moduleId===rpAssessmentModule;});
  if(!a)return '<h1>Praktische Modulabnahme</h1><p>Wähle in der Kompetenzübersicht ein Modul.</p>';
  var old=rpCompetencies.submissions[a.moduleId]||{};
  var h='<h1>Praktische Abnahme: '+esc(a.title)+'</h1><p>Manuelle Prüfung erforderlich, keine automatische Kompetenzbenotung. '+(a.editorialStatus==='individually-authored-manual'?'Dieser Auftrag besitzt eigene modulbezogene Fälle und Kriterien. Er wurde nicht als vollständige praktische Prüfung ausgeführt oder unabhängig zertifiziert.':a.editorialStatus==='draft-needs-topic-rubric'?'Dieser modulbezogene Auftrag ist noch ein Rubrikentwurf. Prüfer und Lernender müssen das konkrete Arbeitsprodukt vor der Durchführung festlegen.':'Der Auftrag greift die vorhandene Transferübung einer Lektion auf; er ist keine vollständige Prüfung aller Modulkompetenzen.')+'</p><div class="callout"><h2>Arbeitsauftrag</h2><p>'+esc(a.brief)+'</p><p>'+esc(a.acceptance)+'</p><p>'+esc(a.evidence)+'</p></div><p>Status: '+esc(old.status||'Noch nicht eingereicht')+'</p>';
  if(old.reviewNote)h+='<p>Prüfrückmeldung: '+esc(old.reviewNote)+'</p>';
  h+='<section class="callout"><h2>Konkrete Prüffälle</h2>'+a.cases.map(function(c){return '<h3>'+esc(c.kind)+'</h3><p>Vorgabe: '+esc(c.request)+'</p>'+(c.expected?'<details><summary>Soll-Ergebnis nach eigener Bearbeitung vergleichen</summary><p>'+esc(c.expected)+'</p></details>':'');}).join('')+'<h3>Bewertungskriterien</h3><ol>'+a.rubric.map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ol></section>';
  if(a.sources)h+='<p>Vertiefung: '+a.sources.map(function(url){return '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(new URL(url).hostname)+'</a>';}).join(' · ')+'</p>';
  h+='<form id="rpAssessmentForm" class="callout">';
  for(var pair of [['normal','Normalfall: Soll und Ist'],['boundary','Grenzfall: Begründung, Soll und Ist'],['failure','Fehlerfall: Auslösung und Behandlung'],['evidence','Arbeitsprodukt, Testbefehle und Ergebnisnachweise'],['help','Verwendete Hilfen und offene Grenzen']])h+='<label for="assessment-'+pair[0]+'">'+pair[1]+'</label><textarea class="tutor-input" id="assessment-'+pair[0]+'" name="'+pair[0]+'" maxlength="6000" rows="3" required>'+esc(old[pair[0]]||'')+'</textarea>';
  return h+'<p>Eine erneute Einreichung setzt eine frühere Freigabe zurück. Keine Secrets oder personenbezogenen Fremddaten eintragen. Angemeldete Teilnehmer übertragen diese Angaben an den Admin.</p><button class="start-btn">Arbeit einreichen · Prüfung ausstehend</button></form>';
}
function rpRenderCompetencies(){
  var h='<h1>Kompetenzen und praktische Nachweise</h1><p>Gelesen ist eine Bearbeitungsmarkierung. Wiedererkannt bedeutet mindestens eine richtige Auswahlantwort – kein Anwendungsnachweis. Praktisch abgenommen erfordert eine eingereichte Arbeit mit Normal-,Grenz- und Fehlerfall sowie eine manuelle Adminfreigabe. Das ist eine Kursabnahme, kein unabhängiges Zertifikat.</p><p>Die bisherige Adminampel bleibt eine Aktivitäts-/Bearbeitungsampel und wird dadurch nicht heimlich zur Kompetenzbewertung.</p><ul class="rp-mastery-list">';
  rpData().modules.forEach(function(m){var c=rpCompetency(m);h+='<li><div><strong>'+esc(m.title)+'</strong><p>Gelesen: '+c.read+'/'+c.total+' · Wiedererkannt: '+c.recognized+'/'+c.questions+' · '+c.label+'</p></div><button class="ex-btn" onclick="rpOpenAssessment(\''+m.id+'\')">Praktische Abnahme</button></li>';});
  return h+'</ul>';
}
(function(){
  rpMergeCompetencies(rpInitialCompetencies);
  var serializeBase=serialize;serialize=function(){var data=serializeBase();data.competencies=rpCompetencies;return data;};
  var mergeBase=mergeIn;mergeIn=function(data){mergeBase(data);rpMergeCompetencies(data?.competencies);};
  try{rpMergeCompetencies(JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}').competencies);}catch(e){}
  var contentBase=renderContent;renderContent=function(){
    if(state.currentId==='competencies'||state.currentId==='assessment'){
      if(state.currentId==='assessment'&&typeof RP_MODULE_ASSESSMENTS==='undefined'){
        /* Die Prüfaufträge sind groß (275 KB) und werden erst beim Öffnen einer Abnahme geladen. */
        document.getElementById('content').innerHTML='<h1>Praktische Modulabnahme</h1><p id="rpAssessmentLoading" role="status">Lade Prüfaufträge …</p>';
        rpLoadScriptOnce('assets/module-assessments-data.js').then(function(){if(state.currentId==='assessment')renderContent();},function(error){
          var info=document.getElementById('rpAssessmentLoading');if(info){info.setAttribute('role','alert');info.textContent=error.message+' Bitte die Seite neu laden.';}});
        return;
      }
      document.getElementById('content').innerHTML=state.currentId==='assessment'?rpRenderAssessment():rpRenderCompetencies();
      document.getElementById('rpAssessmentForm')?.addEventListener('submit',rpSubmitAssessment);return;
    }
    contentBase.apply(this,arguments);
    if(state.currentId==='lernwerkstatt')document.getElementById('content').insertAdjacentHTML('afterbegin','<div class="callout"><h2>Gelesen ≠ wiedererkannt ≠ angewendet</h2><p>Praktische Arbeiten und getrennte Kompetenznachweise ansehen.</p><button class="start-btn" onclick="selectLesson(\'competencies\')">Kompetenzübersicht öffnen</button></div>');
  };
  var sideBase=renderSidebar;renderSidebar=function(){sideBase.apply(this,arguments);if(!document.getElementById('rpCompetencyNav')){var b=document.createElement('button');b.id='rpCompetencyNav';b.type='button';b.className='nav-link';b.textContent='Kompetenzen & Abnahmen';b.onclick=function(){selectLesson('competencies');};document.getElementById('moduleNav').before(b);}};
  render();
})();
