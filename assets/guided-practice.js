var rpPractice={track:null,index:0,feedback:'',drafts:{},answers:{},hints:{},solutions:{},busy:false};
var rpPracticeWorkerSource=null;
var rpPracticeStop=null;
function rpPracticeAllowed(track){return rpMatches(track.path);}
function rpPracticeTask(){return RP_PRACTICE_TRACKS.find(function(t){return t.id===rpPractice.track;})?.tasks[rpPractice.index];}
function rpPracticeKey(){return 'guided:'+rpPractice.track+':'+rpPractice.index;}
function rpPracticeStart(id){
  var track=RP_PRACTICE_TRACKS.find(function(t){return t.id===id;});if(!track||!rpPracticeAllowed(track))return;
  rpPracticeStop?.();rpPractice.track=id;rpPractice.index=0;rpPractice.feedback='';state.currentId='guided';renderContent();
}
function rpPracticeStoreDraft(){
  var key=rpPracticeKey(),editor=document.getElementById('rpCodeEditor');
  if(editor)rpPractice.drafts[key]=editor.value;
  var inputs=document.querySelectorAll('[data-rp-gap]');if(inputs.length)rpPractice.answers[key]=Array.from(inputs).map(function(x){return x.value;});
}
function rpPracticeMove(delta){
  rpPracticeStoreDraft();rpPracticeStop?.();
  var track=RP_PRACTICE_TRACKS.find(function(t){return t.id===rpPractice.track;});
  rpPractice.index=Math.max(0,Math.min(track.tasks.length-1,rpPractice.index+delta));rpPractice.feedback='';renderContent();
}
function rpPracticeHint(solution){
  rpPracticeStoreDraft();var key=rpPracticeKey();rpPractice.hints[key]=true;
  if(solution)rpPractice.solutions[key]=true;
  rpPractice.feedback=solution?'Lösung angesehen. Das zählt nicht als selbstständiger Nachweis.':'Hinweis genutzt – übe danach eine andere Aufgabe ohne Hilfe.';
  renderContent();
}
function rpPracticeComplete(){
  var key=rpPracticeKey();
  // Uses existing synced progress fields, not another untracked local database.
  if(!state.solved[key])state.solved[key]=Date.now();
  var xpKey='practice:'+key;
  if(!rpPractice.solutions[key]&&!state.xpLog[xpKey]){state.xpLog[xpKey]=1;awardXp(10,'Geführte Codeübung');}
  saveProgress();
}
function rpPracticeCheck(){
  if(rpPractice.busy)return;
  rpPracticeStoreDraft();var task=rpPracticeTask(),key=rpPracticeKey();if(!task)return;
  if(task.type==='run'){rpPracticeRun(task);return;}
  var answers=rpPractice.answers[key]||[];
  var normalize=function(s){return String(s||'').trim().replace(/\s+/g,' ');};
  var correct=task.answers.filter(function(options,i){return options.some(function(a){return normalize(a)===normalize(answers[i]);});}).length;
  if(correct===task.answers.length){
    if(!rpPractice.solutions[key])rpPracticeComplete();
    rpPractice.feedback='Richtig ergänzt. '+task.why+' Dies war eine Codeverständnisprüfung, keine Programmausführung.';
  }else rpPractice.feedback=correct+' / '+task.answers.length+' Ergänzungen stimmen. '+task.hint+' Prüfe Schreibweise und den erklärten Vertrag.';
  renderContent();
}
async function rpPracticeRun(task){
  rpPractice.busy=true;rpPractice.feedback='Wird isoliert ausgeführt …';
  var code=rpPractice.drafts[rpPracticeKey()]||task.starter;
  renderContent();
  var frame,timer,listener,stopped=false;
  var clean=function(){clearTimeout(timer);if(listener)window.removeEventListener('message',listener);frame?.remove();};
  rpPracticeStop=function(){stopped=true;clean();rpPractice.busy=false;rpPracticeStop=null;};
  try{
    if(!rpPracticeWorkerSource){var response=await fetch('assets/guided-worker.js');if(!response.ok)throw Error('Ausführungsmodul nicht verfügbar.');rpPracticeWorkerSource=await response.text();}
    if(stopped)return;
    var sandboxResponse=await fetch('assets/guided-sandbox.html');
    if(!sandboxResponse.ok)throw Error('Sandbox nicht verfügbar.');
    var sandboxHTML=await sandboxResponse.text();
    if(stopped)return;
    frame=document.createElement('iframe');frame.sandbox='allow-scripts';frame.hidden=true;frame.srcdoc=sandboxHTML;frame.title='Isolierte JavaScript-Ausführung';
    var token=crypto.randomUUID();
    listener=function(event){
      if(event.source!==frame.contentWindow||event.data?.token!==token||event.data?.type!=='rp-practice-result')return;
      var result=event.data.result;clean();rpPractice.busy=false;rpPracticeStop=null;
      if(result.error)rpPractice.feedback='Fehler: '+result.error+' Tipp: '+task.hint;
      else {
        var passed=result.results.filter(function(r){return r.ok;}).length;
        rpPractice.feedback=result.results.map(function(r,i){return 'Test '+(i+1)+': '+(r.ok?'bestanden':'erwartet '+r.expected+', erhalten '+r.actual);}).join('\n');
        if(passed===task.cases.length){if(!rpPractice.solutions[rpPracticeKey()])rpPracticeComplete();rpPractice.feedback+='\n'+task.why+' Die sichtbaren Tests sind ein Lernfeedback, kein manipulationssicherer Kompetenznachweis.';}
      }
      if(state.currentId==='guided')renderContent();
    };
    window.addEventListener('message',listener);
    frame.onload=function(){frame.contentWindow.postMessage({type:'start',token:token,workerSource:rpPracticeWorkerSource,input:{type:'run',code:code,functionName:task.functionName,cases:task.cases}},'*');};
    document.body.appendChild(frame);
    timer=setTimeout(function(){clean();rpPractice.busy=false;rpPracticeStop=null;if(state.currentId==='guided'){rpPractice.feedback='Abgebrochen: Zeitlimit von 2 Sekunden erreicht. Prüfe Endbedingungen und Rekursion.';renderContent();}},2000);
  }catch(error){clean();rpPractice.busy=false;rpPracticeStop=null;rpPractice.feedback=error.message;if(state.currentId==='guided')renderContent();}
}
function rpRenderPractice(){
  var tracks=RP_PRACTICE_TRACKS.filter(rpPracticeAllowed),track=tracks.find(function(t){return t.id===rpPractice.track;});
  var h='<div class="breadcrumb">Aktiv programmieren · eigene ROOTPFAD-Aufgaben</div><h1>Geführte Codewerkstatt</h1>';
  h+='<p>Erklären → selbst ergänzen → Feedback lesen → Variante lösen. Nur die JavaScript-Funktionsaufgaben führen Code aus. Andere Sprachen prüfen begrenzte Ergänzungen, keine vollständige fachliche Korrektheit. Keine fremden Kurstexte oder Aufgaben kopiert.</p>';
  h+='<div class="gp-tracks">'+tracks.map(function(t){return '<button class="ex-btn" aria-pressed="'+(track?.id===t.id)+'" onclick="rpPracticeStart(\''+t.id+'\')">'+esc(t.title)+'</button>';}).join('')+'</div>';
  if(!track)return h+'<p>Wähle eine Sprache. Die Auswahl folgt deinem Lernpfad.</p>';
  var task=track.tasks[rpPractice.index],key=rpPracticeKey();
  h+='<div class="gp-workbench"><section class="gp-instructions"><p class="badge topic">'+esc(track.title)+' · Schritt '+(rpPractice.index+1)+' / '+track.tasks.length+'</p><h2>'+esc(task.title)+'</h2><p>'+esc(track.intro)+'</p><p><strong>Dein Auftrag:</strong> '+esc(task.text)+'</p><p><a href="'+esc(track.source)+'" target="_blank" rel="noopener noreferrer">Offizielle Vertiefung</a></p><p>'+(state.solved[key]?'Bereits bearbeitet – Wiederholung möglich.':'Noch offen.')+'</p></section><section class="gp-editor">';
  if(task.type==='run')h+='<label for="rpCodeEditor">JavaScript-Code · Funktion bearbeiten</label><textarea id="rpCodeEditor" spellcheck="false" maxlength="12000" rows="11" oninput="rpPracticeStoreDraft()">'+esc(rpPractice.drafts[key]??task.starter)+'</textarea><p>Isolierter Worker ohne Zugriff auf den Lernstand; 2 Sekunden Zeitlimit. Keine Secrets eingeben.</p>';
  else {
    h+='<p><strong>Ergänzungsaufgabe · keine Laufzeit</strong></p><pre class="gp-code">';
    var parts=task.code.split(/(\[\[\d+\]\])/g);
    parts.forEach(function(part){var m=part.match(/^\[\[(\d+)\]\]$/);h+=m?'<input aria-label="Codeergänzung '+(+m[1]+1)+'" data-rp-gap="'+m[1]+'" value="'+esc((rpPractice.answers[key]||[])[+m[1]]||'')+'" spellcheck="false" autocomplete="off" oninput="rpPracticeStoreDraft()">':esc(part);});
    h+='</pre>';
  }
  h+='<div class="gp-actions"><button class="check-btn" '+(rpPractice.busy?'disabled':'')+' onclick="rpPracticeCheck()">'+(task.type==='run'?'Code ausführen & prüfen':'Ergänzung prüfen')+'</button><button class="ex-btn" onclick="rpPracticeHint(false)">Hinweis</button><button class="ex-btn" onclick="rpPracticeHint(true)">Lösung ansehen</button></div>';
  if(rpPractice.hints[key])h+='<p><strong>Hinweis:</strong> '+esc(task.hint)+'</p>';
  if(rpPractice.solutions[key])h+='<details open><summary>Lösung und Begründung</summary><pre>'+esc(task.solution||task.answers.map(function(a){return a[0];}).join('\n'))+'</pre><p>'+esc(task.why)+'</p></details>';
  h+='<pre class="gp-feedback" role="status" aria-live="polite">'+esc(rpPractice.feedback)+'</pre></section></div><div class="gp-actions"><button class="ex-btn" '+(rpPractice.index===0?'disabled':'')+' onclick="rpPracticeMove(-1)">Zurück</button><button class="ex-btn" '+(rpPractice.index===track.tasks.length-1?'disabled':'')+' onclick="rpPracticeMove(1)">Nächste Aufgabe</button><button class="ex-btn" onclick="selectLesson(\''+track.lesson+'\')">Zur passenden Lektion</button></div>';
  return h;
}
(function(){
  var renderBase=renderContent;
  renderContent=function(){
    if(state.currentId==='guided'){document.getElementById('content').innerHTML=rpRenderPractice();return;}
    rpPracticeStop?.();renderBase.apply(this,arguments);
    var lesson=rpCatalog.lessons.find(function(l){return l.id===state.currentId;});
    var applicable=RP_PRACTICE_TRACKS.filter(function(t){return rpPracticeAllowed(t)&&(!lesson||rpLessonPaths[lesson.id]===t.path);});
    if((lesson||['intro','heute'].includes(state.currentId))&&applicable.length){
      var host=document.getElementById('content');host.querySelector('#gp-entry')?.remove();
      host.insertAdjacentHTML('beforeend','<section id="gp-entry" class="callout"><h2>Jetzt selbst ausprobieren</h2><p>Kurze geführte Codeaufgaben mit Hinweisen und direktem Feedback. Aufgabenpool passend zu deinem Lernpfad – nicht für jede Lektion eine eigene neue Übung.</p><button class="start-btn" onclick="selectLesson(\'guided\')">Codewerkstatt öffnen</button></section>');
    }
  };
  var sideBase=renderSidebar;
  renderSidebar=function(){sideBase.apply(this,arguments);var button=document.getElementById('gp-nav');if(!button){button=document.createElement('button');button.id='gp-nav';button.type='button';button.textContent='Geführte Codewerkstatt';button.className='nav-link';button.onclick=function(){selectLesson('guided');};document.getElementById('moduleNav').before(button);}};
  if(!window.RP_BOOTING) render();
})();
