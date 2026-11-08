/* Keep original question IDs and answer ordering. Add recall and explanations,
   not a pretend AI grading of free text. Drafts are session-only. */
var rpQuizDrafts={};
function rpQuizSave(id,index){
  var key=id+'#'+index,box=document.getElementById('rq-recall-'+key),confidence=document.getElementById('rq-confidence-'+key);
  rpQuizDrafts[key]={text:box?.value||'',confidence:confidence?.value||'unsicher',revealed:rpQuizDrafts[key]?.revealed||false};
}
function rpQuizReveal(id,index){rpQuizSave(id,index);var key=id+'#'+index;rpQuizDrafts[key].revealed=true;document.getElementById('rq-options-'+key).hidden=false;document.getElementById('rq-reveal-'+key).hidden=true;}
var rpQuizBase=renderQuiz;
renderQuiz=function(lesson){
  var html=rpQuizBase(lesson);if(!html)return html;
  var host=document.createElement('div');host.innerHTML=html;
  host.querySelector('h3').textContent='Vertiefungsquiz · Abrufen, entscheiden, begründen';
  var intro=document.createElement('p');intro.textContent='Formuliere vor den Optionen eine eigene Antwort und einen Grenzfall. Danach entscheiden und mit den Lösungskriterien vergleichen. Freitext wird nicht automatisch benotet; leere Antworten dürfen übersprungen werden. Entwürfe bleiben nur bis zum Neuladen erhalten.';host.querySelector('.quiz').insertBefore(intro,host.querySelector('fieldset'));
  lesson.quiz.forEach(function(q,index){
    var key=lesson.id+'#'+index,draft=rpQuizDrafts[key]||{text:'',confidence:'unsicher'},card=host.querySelector('#q_'+CSS.escape(lesson.id)+'_'+index);
    var block=document.createElement('div');block.className='rq-preflight';
    if(q.revision){var revision=document.createElement('p');revision.className='badge topic';revision.textContent='Neu redigiert · '+(q.level||'Szenario')+' · neue Lernstandsrevision';card.insertBefore(revision,card.querySelector('.opt'));}
    block.innerHTML='<label for="rq-recall-'+key+'">Deine Erklärung vor der Auswahl · Frage '+(index+1)+'</label><textarea id="rq-recall-'+key+'" maxlength="4000" placeholder="Was gilt hier, warum – und welcher Grenzfall könnte die Aussage einschränken?" oninput="rpQuizSave(\''+lesson.id+'\','+index+')">'+esc(draft.text)+'</textarea><label for="rq-confidence-'+key+'">Wie sicher bist du?</label><select id="rq-confidence-'+key+'" onchange="rpQuizSave(\''+lesson.id+'\','+index+')"><option value="unsicher">Unsicher</option><option value="sicher">Sicher</option><option value="geraten">Geraten</option></select><button type="button" class="ex-btn" id="rq-reveal-'+key+'" onclick="rpQuizReveal(\''+lesson.id+'\','+index+')">Optionen vergleichen / Abruf überspringen</button>';
    block.querySelector('select').value=draft.confidence;block.querySelector('button').hidden=!!draft.revealed;
    var options=document.createElement('div');options.id='rq-options-'+key;options.hidden=!draft.revealed;
    // Presentation order changes, stable value indices remain bound to content.
    var labels=Array.from(card.querySelectorAll('.opt'));
    if(typeof labMischen==='function'){var order=labMischen(labels,key+':'+todayKey());labels=order.map(function(i){return labels[i];});}
    labels.forEach(function(label){options.appendChild(label);});
    card.insertBefore(block,card.querySelector('.qfeedback'));card.insertBefore(options,card.querySelector('.qfeedback'));
  });
  return host.innerHTML;
};
var rpCheckQuizBase=checkQuiz;
checkQuiz=function(id){
  var lesson=lessonById(id);lesson.quiz.forEach(function(q,i){rpQuizSave(id,i);});
  rpCheckQuizBase(id);
  lesson.quiz.forEach(function(q,index){
    var selected=document.querySelector('input[name="rq_'+id+'_'+index+'"]:checked');if(!selected)return;
    var feedback=document.getElementById('fb_'+id+'_'+index),key=id+'#'+index,draft=rpQuizDrafts[key]||{};
    var review=document.createElement('section');review.className='rq-review';
    var heading=document.createElement('h4');heading.textContent='Begründung und Transfer';review.appendChild(heading);
    var own=document.createElement('p');own.textContent='Deine erste Erklärung: '+(draft.text||'Nicht festgehalten – versuche beim nächsten Mal zuerst frei zu antworten.');review.appendChild(own);
    var list=document.createElement('ol');
    q.options.forEach(function(option,i){var item=document.createElement('li');item.textContent=(i===q.correct?'Passende Antwort: ':'Nicht die passende Antwort in diesem Fall: ')+option+' — '+(q.rationales?.[i]||(i===q.correct?q.explain:'Vergleiche diese Behauptung mit dem beschriebenen Vertrag und der Begründung der passenden Antwort. Eine kontextspezifische Gegenbegründung ist nicht für jede alte Frage hinterlegt.'));list.appendChild(item);});review.appendChild(list);
    var transfer=document.createElement('p');transfer.textContent='Transferauftrag: Formuliere einen konkreten Fall mit veränderten Eingaben. Nenne erwartetes Ergebnis, Fehlerfall und einen Test, der eine falsche Lösung erkennen würde. Vergleiche deine Erklärung mit: '+q.explain;review.appendChild(transfer);
    if(draft.confidence==='sicher'&&Number(selected.value)!==q.correct){var warning=document.createElement('strong');warning.textContent='Sicher und trotzdem falsch: Markiere die falsche Annahme und bearbeite eine neue Variante nach Lernabstand.';review.appendChild(warning);}
    feedback.querySelector('.rq-review')?.remove();feedback.appendChild(review);
  });
};
