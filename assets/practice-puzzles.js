/* Kleine Denkaufgaben in Lektionen: „Fehler finden“ (bug) und „Zeilen ordnen“ (order, Parsons-Aufgabe).
   Daten: practice-puzzles-data.js (aus content/puzzles.json). Der Fortschritt nutzt das vorhandene XP-System
   (einmal 10 XP je Aufgabe, Marker state.xpLog['puzzle:<id>']); es kommen keine neuen Speicherfelder dazu. */
(function(){
  var XP = 10;
  function esc(value){ return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function find(id){
    var all = window.RP_PUZZLES || {};
    for(var lesson in all){ var hit = all[lesson].filter(function(p){ return p.id === id; })[0]; if(hit) return hit; }
    return null;
  }
  function isSolved(id){ try{ return !!(state.xpLog && state.xpLog['puzzle:' + id]); }catch(e){ return false; } }
  function line(text){ return '<code>' + esc(text) + '</code>'; }

  function bugBody(p){
    return '<fieldset class="rp-bug"><legend>Welche Zeile ist es?</legend>' + p.lines.map(function(text, i){
      return '<label class="rp-line"><input type="radio" name="rp-pz-' + esc(p.id) + '" value="' + i + '">' +
        '<span class="rp-no" aria-hidden="true">' + (i + 1) + '</span><span class="rp-sr">Zeile ' + (i + 1) + ': </span>' + line(text) + '</label>';
    }).join('') + '</fieldset>';
  }
  function orderBody(p){
    return '<ol class="rp-order" aria-label="Zeilen in der aktuellen Reihenfolge">' + p.scramble.map(function(orig){
      var text = p.lines[orig];
      return '<li data-orig="' + orig + '">' + line(text) + '<span class="rp-order-btns">' +
        '<button type="button" data-rp-move="-1" aria-label="Nach oben: ' + esc(text.trim()) + '">↑</button>' +
        '<button type="button" data-rp-move="1" aria-label="Nach unten: ' + esc(text.trim()) + '">↓</button></span></li>';
    }).join('') + '</ol>';
  }

  window.rpPuzzleSection = function(lessonId){
    var puzzles = (window.RP_PUZZLES || {})[lessonId];
    if(!puzzles || !puzzles.length) return '';
    return '<section class="rp-puzzles" aria-labelledby="rpPuzzlesHeading"><h2 id="rpPuzzlesHeading">Kleine Denkaufgaben</h2>' +
      '<p class="rp-puzzle-hint">Kurz und ohne Einrichtung: finde den Fehler oder bringe den Code in die richtige Reihenfolge. Die Lösung wird nur mit Erklärung angezeigt; XP gibt es einmal pro Aufgabe, wenn du sie ohne Lösungsansicht löst.</p>' +
      puzzles.map(function(p){
        var solved = isSolved(p.id);
        return '<article class="rp-puzzle" data-puzzle="' + esc(p.id) + '" data-type="' + p.type + '">' +
          '<h3>' + esc(p.title) + ' <span class="rp-solved" ' + (solved ? '' : 'hidden') + '>✓ gelöst</span></h3>' +
          '<p>' + esc(p.task) + '</p><p class="rp-lang">' + esc(p.language) + (p.type === 'order' ? ' · mit den Pfeil-Schaltflächen sortieren' : ' · Zeile auswählen') + '</p>' +
          (p.type === 'bug' ? bugBody(p) : orderBody(p)) +
          '<div class="rp-puzzle-actions"><button type="button" data-rp-check>' + (p.type === 'bug' ? 'Antwort prüfen' : 'Reihenfolge prüfen') + '</button>' +
          '<button type="button" class="rp-secondary" data-rp-reveal>Lösung mit Erklärung zeigen</button></div>' +
          '<p class="rp-feedback" role="status" aria-live="polite"></p></article>';
      }).join('') + '</section>';
  };

  function markSolved(card, p, revealed){
    var badge = card.querySelector('.rp-solved');
    if(!revealed){
      if(badge) badge.hidden = false;
      try{ if(typeof awardXp === 'function') awardXp(XP, 'Denkaufgabe gelöst', 'puzzle:' + p.id); }catch(e){}
    }
  }
  function explain(card, p, intro){
    card.querySelector('.rp-feedback').innerHTML = esc(intro) + ' ' + esc(p.explanation) + '<br><small>Geprüft: ' + esc(p.verified) + '</small>';
  }

  function check(card, p){
    var feedback = card.querySelector('.rp-feedback');
    if(p.type === 'bug'){
      var chosen = card.querySelector('input[type=radio]:checked');
      if(!chosen){ feedback.textContent = 'Wähle zuerst eine Zeile aus.'; return; }
      if(Number(chosen.value) === p.bugLine){ markSolved(card, p, card.dataset.revealed === '1'); explain(card, p, 'Richtig: Zeile ' + (p.bugLine + 1) + '.'); }
      else feedback.textContent = 'Nicht ganz. Tipp: ' + p.hint;
      return;
    }
    var items = Array.prototype.slice.call(card.querySelectorAll('.rp-order li'));
    var right = items.filter(function(item, index){ return Number(item.dataset.orig) === index; }).length;
    if(right === items.length){ markSolved(card, p, card.dataset.revealed === '1'); explain(card, p, 'Richtig, alle ' + items.length + ' Zeilen stehen an der richtigen Stelle.'); }
    else feedback.textContent = right + ' von ' + items.length + ' Zeilen stehen an der richtigen Stelle. Verschiebe die übrigen und prüfe erneut.';
  }

  function reveal(card, p){
    card.dataset.revealed = '1';
    if(p.type === 'bug'){
      var target = card.querySelector('input[value="' + p.bugLine + '"]');
      if(target) target.checked = true;
    } else {
      var list = card.querySelector('.rp-order');
      p.lines.map(function(_, i){ return list.querySelector('li[data-orig="' + i + '"]'); }).forEach(function(item){ list.appendChild(item); });
    }
    explain(card, p, 'Lösung (zählt nicht als eigenes Lösen, es gibt dafür keine XP):');
  }

  function move(button){
    var item = button.closest('li');
    var list = item.parentNode;
    var direction = Number(button.dataset.rpMove);
    var sibling = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
    if(!sibling) return;
    if(direction < 0) list.insertBefore(item, sibling); else list.insertBefore(sibling, item);
    var items = Array.prototype.slice.call(list.children);
    var feedback = list.closest('.rp-puzzle').querySelector('.rp-feedback');
    feedback.textContent = 'Zeile ' + item.querySelector('code').textContent.trim() + ' steht jetzt an Position ' + (items.indexOf(item) + 1) + ' von ' + items.length + '.';
    button.focus();
  }

  document.addEventListener('click', function(event){
    var target = event.target.closest && event.target.closest('[data-rp-check],[data-rp-reveal],[data-rp-move]');
    if(!target) return;
    var card = target.closest('.rp-puzzle');
    var p = card && find(card.dataset.puzzle);
    if(!p) return;
    if(target.hasAttribute('data-rp-move')) move(target);
    else if(target.hasAttribute('data-rp-check')) check(card, p);
    else reveal(card, p);
  });
})();
