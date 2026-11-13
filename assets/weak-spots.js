/* Ergänzt das Fehlerheft um zwei Übersichten aus den vorhandenen Lerndaten (state.stats, state.srs, CARDS):
   1) Wiederholplan: wie viele Karten in den nächsten 7 Tagen fällig sind (überfällige zählen zu „Heute“).
   2) Schwächste Lektionen: Trefferquote je Lektion mit Direktlink. Es werden keine neuen Daten gespeichert. */
(function(){
  var MIN_ANSWERS = 3, MAX_LESSONS = 8, WEEKDAYS = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

  function forecast(){
    var known = {}; CARDS.forEach(function(card){ known[card.id] = true; });
    var start = today0(), days = [0,0,0,0,0,0,0];
    Object.keys(state.srs || {}).forEach(function(id){
      var entry = state.srs[id];
      if(!known[id] || !entry || !isFinite(entry.due)) return;
      var offset = Math.max(0, Math.floor((entry.due - start) / DAY));
      if(offset < days.length) days[offset]++;
    });
    return days.map(function(count, offset){
      var date = new Date(start + offset * DAY);
      var label = offset === 0 ? 'Heute (inkl. Überfälliges)' : offset === 1 ? 'Morgen' : WEEKDAYS[date.getDay()] + ', ' + date.toLocaleDateString('de-DE', { day:'2-digit', month:'2-digit' });
      return { label:label, count:count };
    });
  }

  function weakestLessons(){
    var byLesson = {}, endOfToday = today0() + DAY - 1;
    CARDS.forEach(function(card){
      var stats = state.stats[card.id], srs = state.srs[card.id];
      var entry = byLesson[card.lessonId] || (byLesson[card.lessonId] = { id:card.lessonId, title:card.lessonTitle, right:0, wrong:0, due:0 });
      if(stats){ entry.right += stats.right || 0; entry.wrong += stats.wrong || 0; }
      if(srs && srs.due <= endOfToday) entry.due++;
    });
    return Object.keys(byLesson).map(function(id){
      var entry = byLesson[id], total = entry.right + entry.wrong;
      entry.total = total; entry.rate = total ? entry.right / total : 1;
      return entry;
    }).filter(function(entry){ return entry.total >= MIN_ANSWERS && entry.rate < 0.8; })
      .sort(function(a, b){ return a.rate - b.rate || b.wrong - a.wrong; })
      .slice(0, MAX_LESSONS);
  }

  function panel(){
    var plan = forecast(), total = plan.reduce(function(sum, day){ return sum + day.count; }, 0);
    var html = '<section class="ws-panel" aria-labelledby="wsPlan"><h2 id="wsPlan">Wiederholplan: nächste 7 Tage</h2>';
    if(!total){
      html += '<p class="ws-note">Noch keine Karten eingeplant. Beantworte Quizfragen in den Lektionen, dann erscheint hier, wann welche Wiederholung fällig wird.</p>';
    } else {
      html += '<table class="ws-table"><caption>Fällige Karten je Tag</caption><thead><tr><th scope="col">Tag</th><th scope="col">Fällige Karten</th></tr></thead><tbody>' +
        plan.map(function(day){ return '<tr><th scope="row">' + esc(day.label) + '</th><td data-label="Fällige Karten">' + day.count + '</td></tr>'; }).join('') + '</tbody></table>' +
        '<p class="ws-note">Die Karten kommen nach dem Prinzip der verteilten Wiederholung wieder: je sicherer du antwortest, desto größer der Abstand.</p>' +
        '<p><button type="button" class="ex-btn primary" onclick="selectLesson(\'review\')">Jetzt wiederholen</button></p>';
    }
    html += '</section>';

    var weak = weakestLessons();
    html += '<section class="ws-panel" aria-labelledby="wsWeak"><h2 id="wsWeak">Schwächste Lektionen</h2>';
    if(!weak.length){
      html += '<p class="ws-note">Keine Lektion mit mindestens ' + MIN_ANSWERS + ' Antworten und einer Trefferquote unter 80 %. Gute Arbeit, oder es fehlen noch Antworten.</p>';
    } else {
      html += '<table class="ws-table"><caption>Lektionen mit der niedrigsten Trefferquote (mindestens ' + MIN_ANSWERS + ' Antworten)</caption>' +
        '<thead><tr><th scope="col">Lektion</th><th scope="col">Richtig / falsch</th><th scope="col">Quote</th><th scope="col">Fällig</th><th scope="col">Aktion</th></tr></thead><tbody>' +
        weak.map(function(entry){
          return '<tr><th scope="row">' + esc(entry.title) + '</th><td data-label="Richtig / falsch">' + entry.right + ' / ' + entry.wrong + '</td><td data-label="Quote">' + Math.round(entry.rate * 100) + ' %</td><td data-label="Fällig">' + entry.due + '</td>' +
            '<td><button type="button" class="ex-btn" onclick="selectLesson(\'' + esc(entry.id) + '\')" aria-label="Lektion öffnen: ' + esc(entry.title) + '">Lektion öffnen</button></td></tr>';
        }).join('') + '</tbody></table>';
    }
    return html + '</section>';
  }

  var original = renderFehlerheft;
  renderFehlerheft = function(){
    var html = original.apply(this, arguments);
    var marker = '</h1>';
    var at = html.indexOf(marker);
    return at < 0 ? html + panel() : html.slice(0, at + marker.length) + panel() + html.slice(at + marker.length);
  };
})();
