function rpQuestionFeedback(cardId){
  var note=document.getElementById('feedback-note-'+cardId)?.value?.trim();
  if(!note)return;
  rpCompetencies.feedback[cardId]={ts:Date.now(),cardId,note:note.slice(0,1500),status:'submitted'};
  saveProgress();var status=document.getElementById('feedback-status-'+cardId);if(status)status.textContent='Hinweis gespeichert. Bei Anmeldung wird er dem Admin übertragen; keine automatische Fehlerkorrektur behauptet.';
}
(function(){
  var base=checkQuiz;checkQuiz=function(id){base(id);var lesson=lessonById(id);
    lesson.quiz.forEach(function(q,i){var box=document.getElementById('fb_'+id+'_'+i);if(!box?.classList.contains('show'))return;var key=rpQuestionId(lesson,i);if(box.querySelector('[data-question-feedback]'))return;
      var details=document.createElement('details');details.dataset.questionFeedback='true';details.innerHTML='<summary>Frage unklar,mehrdeutig oder fachlich auffällig?</summary><label for="feedback-note-'+key+'">Beschreibe die konkrete Unklarheit ohne persönliche Daten</label><textarea class="tutor-input" id="feedback-note-'+key+'" maxlength="1500" rows="3">'+esc(rpCompetencies.feedback[key]?.note||'')+'</textarea><button type="button" class="ex-btn" onclick="rpQuestionFeedback(\''+key+'\')">Hinweis speichern</button><p role="status" id="feedback-status-'+key+'"></p>';box.appendChild(details);
    });
  };
  var record=recordAnswer;recordAnswer=function(id,correct){
    var previous=state.stats[id],first=!previous||!(previous.right+previous.wrong);record(id,correct);
    if(!first)return;
    rpEvidence({kind:'question-attempt',cardId:id,correct:!!correct,firstAttempt:first,source:state.currentId==='review'?'review':state.currentId==='exam'?'exam':'lesson',assistance:'not-measured',revision:id.includes('@')?id.split('@')[1]:'legacy'});
  };
})();
