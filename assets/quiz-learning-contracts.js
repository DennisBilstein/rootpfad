var rpRubricSession={};
function rpContract(lesson,index){return RP_QUIZ_CONTRACT_BY_ID[rpQuestionId(lesson,index)];}
function rpRenderRubric(contract,key){
  if(!contract)return '';
  var reasons=contract.rationales?.length?'<details><summary>Antwortoptionen fachlich vergleichen</summary><ol>'+contract.rationales.map(function(text){return '<li>'+esc(text)+'</li>';}).join('')+'</ol></details>':'';
  return '<section class="rq-review"><h4>Deine Erklärung selbst prüfen · keine automatische Benotung</h4><p>Vergleiche deine erste Erklärung erst jetzt mit den Kriterien. Eine Auswahlantwort allein belegt noch keinen Transfer.</p>'+contract.criteria.map(function(c,i){return '<div><label><input type="checkbox" '+(rpRubricSession[key+':'+i]?'checked':'')+' onchange="rpRubricSession[\''+key+':'+i+'\']=this.checked"> '+esc(c.label)+'</label><p>'+esc(c.reference)+'</p></div>';}).join('')+reasons+'<p><strong>Redaktionsstand:</strong> '+(contract.editorialStatus==='individually-revised'?'Diese Frage wurde einzeln als Szenario redigiert.':'Der Lernvertrag wurde aus der vorhandenen Frage und Lösung aufbereitet. Der fachliche Kern wurde nicht unabhängig neu validiert.')+'</p></section>';
}
(function(){
  var quizBase=renderQuiz;
  renderQuiz=function(lesson){
    var html=quizBase(lesson),host=document.createElement('div');host.innerHTML=html;
    (lesson.quiz||[]).forEach(function(q,i){
      var c=rpContract(lesson,i),field=host.querySelector('textarea');
      var card=host.querySelector('#q_'+CSS.escape(lesson.id)+'_'+i);
      field=card?.querySelector('textarea');if(field&&c)field.placeholder=c.recall;
    });return host.innerHTML;
  };
  var checkBase=checkQuiz;
  checkQuiz=function(id){
    checkBase(id);var lesson=lessonById(id);
    lesson.quiz.forEach(function(q,i){var feedback=document.getElementById('fb_'+id+'_'+i);if(!feedback?.classList.contains('show')||!document.querySelector('input[name="rq_'+id+'_'+i+'"]:checked'))return;feedback.querySelector('[data-rubric]')?.remove();var section=document.createElement('div');section.dataset.rubric='true';section.innerHTML=rpRenderRubric(rpContract(lesson,i),rpQuestionId(lesson,i));feedback.appendChild(section);});
  };
  var reviewBase=renderReview;
  renderReview=function(){
    var html=reviewBase();var card=review.queue[review.idx];
    if(card&&review.picked!==-1)html+=rpRenderRubric(RP_QUIZ_CONTRACT_BY_ID[card.id],card.id);
    return html;
  };
})();
