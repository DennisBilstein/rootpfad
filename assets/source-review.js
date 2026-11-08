(function(){
  var base=renderContent;
  renderContent=function(){
    if(state.currentId==='sources'){
      var html='<h1>Quellen und Prüfgrenzen</h1><p>Erreichbarkeit ist keine fachliche Freigabe. Die redigierten Quizfragen verweisen auf diese Quellen; lebende Dokumentationen können sich ändern. Manche Seiten sperren automatisierte Abrufe. Eine Sperre ist kein Beleg für falschen Inhalt oder eine nicht existierende Seite.</p><p>Wissensstände der Inhalte sind getrennt von Abrufdaten zu lesen. Rechtstexte,Security- und Frameworkfragen brauchen regelmäßige fachliche Prüfung. Organisatorische Wiedervorlage: 08.02.2027; keine garantierte Gültigkeit bis dahin.</p><label for="rpSourceFilter">Quellen durchsuchen</label><input class="sb-input" id="rpSourceFilter" placeholder="Domain oder Stichwort"><div id="rpSourceResults"></div>';
      document.getElementById('content').innerHTML=html;
      var input=document.getElementById('rpSourceFilter');
      function show(){var value=input.value.toLowerCase();document.getElementById('rpSourceResults').innerHTML=RP_SOURCE_REVIEW.filter(function(source){return source.url.toLowerCase().includes(value);}).map(function(source){var check=source.linkCheck;return '<article class="callout"><a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.url)+'</a><p>'+(!check?'Noch kein technischer Abrufnachweis.':check.reachable?'Technisch erreichbar · '+new Date(check.checkedAt).toLocaleDateString('de-DE'):'Automatischer Abruf nicht erfolgreich · '+esc(check.status||check.error||'unbekannt'))+'</p><p>'+esc(source.contentReview)+'</p><p>'+source.questionIds.length+' Fragenbezüge</p></article>';}).join('');}
      input.addEventListener('input',show);show();return;
    }
    base.apply(this,arguments);
    if(state.currentId==='competencies')document.getElementById('content').insertAdjacentHTML('afterbegin','<p><button class="ex-btn" onclick="selectLesson(\'sources\')">Quellen und Prüfstatus ansehen</button></p>');
  };
})();
