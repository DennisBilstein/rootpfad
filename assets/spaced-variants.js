// Parameterized parallel forms with explicit conditions; not copied questions.
var RP_PARALLEL_TASKS=[
 {id:'minutes',lessonId:'js-m1-l1',title:'Lernbudget ohne Auswahlhilfe',variants:[{id:'a',q:'Vier Sitzungen zu je 15 Minuten: Gesamtminuten?',answer:'60',why:'4 × 15 = 60.'},{id:'b',q:'Drei Sitzungen zu je 25 Minuten: Gesamtminuten?',answer:'75',why:'3 × 25 = 75.'}]},
 {id:'ipv4',lessonId:'m12-l1',title:'IPv4-Hostbudget',variants:[{id:'a',q:'Gewöhnliches /28-LAN, Netz/Broadcast reserviert: nutzbare Hostadressen?',answer:'14',why:'2^4 − 2 = 14.'},{id:'b',q:'Gewöhnliches /26-LAN, Netz/Broadcast reserviert: nutzbare Hostadressen?',answer:'62',why:'2^6 − 2 = 62. /31-Punkt-zu-Punkt ist nicht dieser Vertrag.'}]},
 {id:'sql-count',lessonId:'m7-l2',title:'Zeilen und Mengen nicht verwechseln',variants:[{id:'a',q:'Drei vorhandene Zeilen haben Mengen 2,5,3. SUM(quantity) ergibt?',answer:'10',why:'2+5+3=10; COUNT(*) wäre 3.'},{id:'b',q:'Vier vorhandene Zeilen haben Mengen 1,4,2,8. SUM(quantity) ergibt?',answer:'15',why:'1+4+2+8=15; COUNT(*) wäre 4.'}]}
];
var rpVariantCurrent=null;
function rpVariantAvailable(task,now){
 var records=Object.values(rpCompetencies.variants).filter(function(r){return r.taskId===task.id;}).sort(function(a,b){return a.ts-b.ts;});
 if(!records.length)return {variant:task.variants[0],due:true};
 var last=records[records.length-1],next=task.variants.find(function(v){return v.id!==last.variantId;});
 return {variant:next,due:now-last.ts>=3*DAY,dueAt:last.ts+3*DAY};
}
function rpStartVariant(id){var task=RP_PARALLEL_TASKS.find(function(t){return t.id===id;});if(!task||!rpMatches(rpLessonPaths[task.lessonId]))return;var available=rpVariantAvailable(task,Date.now());if(!available.due)return;rpVariantCurrent={taskId:id,variantId:available.variant.id,done:false};state.currentId='variant';renderContent();}
function rpCheckVariant(event){event.preventDefault();if(!rpVariantCurrent||rpVariantCurrent.done)return;var task=RP_PARALLEL_TASKS.find(function(t){return t.id===rpVariantCurrent.taskId;}),variant=task.variants.find(function(v){return v.id===rpVariantCurrent.variantId;}),value=document.getElementById('rpVariantAnswer').value.trim();if(!value)return;
 rpVariantCurrent.done=true;var ts=Date.now();rpCompetencies.variants[task.id+':'+ts]={taskId:task.id,variantId:variant.id,lessonId:task.lessonId,ts:ts,correct:value===variant.answer,answer:value.slice(0,200),revision:'parallel-v1'};saveProgress();document.getElementById('rpVariantResult').textContent=(value===variant.answer?'Richtig. ':'Noch nicht richtig. ')+variant.why+' Eine andere Variante wird nach drei Tagen freigegeben; das ist eine transparente Produktregel, kein validiertes Kompetenzzertifikat.';event.currentTarget.querySelector('button').disabled=true;
}
(function(){var base=renderContent;renderContent=function(){
 if(state.currentId==='variant'){
  var task=RP_PARALLEL_TASKS.find(function(t){return t.id===rpVariantCurrent?.taskId;}),variant=task?.variants.find(function(v){return v.id===rpVariantCurrent.variantId;});
  document.getElementById('content').innerHTML=variant?'<h1>'+esc(task.title)+'</h1><p>Freier Abruf mit veränderten Daten. Kein Multiple Choice, keine automatische praktische Modulabnahme.</p><form id="rpVariantForm"><label for="rpVariantAnswer">'+esc(variant.q)+'</label><input class="sb-input" id="rpVariantAnswer" required maxlength="200" inputmode="numeric"><button class="check-btn">Antwort prüfen</button></form><p id="rpVariantResult" role="status"></p>':'<h1>Keine Variante ausgewählt</h1>';
  document.getElementById('rpVariantForm')?.addEventListener('submit',rpCheckVariant);return;
 }
 base.apply(this,arguments);
 if(state.currentId==='competencies'){
  var html='<section class="callout"><h2>Neue Varianten nach Lernabstand</h2><p>Drei erste Aufgabenfamilien mit je zwei getrennten Datensätzen. Weitere Module haben noch keine fachlich geprüften Parallelformen.</p>';
  RP_PARALLEL_TASKS.filter(function(t){return rpMatches(rpLessonPaths[t.lessonId]);}).forEach(function(task){var a=rpVariantAvailable(task,Date.now());html+='<p>'+esc(task.title)+' · '+(a.due?'<button class="ex-btn" onclick="rpStartVariant(\''+task.id+'\')">Neue Variante bearbeiten</button>':'Nächste Variante ab '+new Date(a.dueAt).toLocaleString('de-DE'))+'</p>';});
  document.getElementById('content').insertAdjacentHTML('afterbegin',html+'</section>');
 }
};})();
