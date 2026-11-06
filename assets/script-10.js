
/* ============================================================
   Seitenleiste: jeder Kursteil ist auf- und zuklappbar.
   Zustand wird gemerkt; der Teil mit der aktuellen Lektion
   oeffnet sich automatisch.
   ============================================================ */
var RB_TEILE_KEY = 'rootpfad-teile-offen';
function rbTeileLesen(){
  try{ return JSON.parse(localStorage.getItem(RB_TEILE_KEY) || '{}') || {}; }catch(e){ return {}; }
}
function rbTeileSpeichern(z){
  try{ localStorage.setItem(RB_TEILE_KEY, JSON.stringify(z)); }catch(e){}
}

function rbTeileGruppieren(){
  var nav = document.getElementById('moduleNav');
  if(!nav || nav.querySelector('details.rb-teil')) return;
  var offen = rbTeileLesen();
  var aktMod = moduleOfLesson(state.currentId);
  var aktTeil = aktMod ? aktMod.part : null;

  var kinder = Array.prototype.slice.call(nav.children);
  var gruppe = null, inhalt = null, mods = [];
  kinder.forEach(function(el){
    if(el.classList.contains('part-label')){
      var m = MODULES.find(function(x){ return ('Teil ' + x.part + ' · ' + x.partTitle) === el.textContent; });
      var teil = m ? m.part : el.textContent;
      var teilMods = MODULES.filter(function(x){ return x.part === teil; });
      var alle = 0, fertig = 0;
      teilMods.forEach(function(x){ x.lessons.forEach(function(l){ alle++; if(state.completed.has(l.id)) fertig++; }); });
      var pct = alle ? Math.round(fertig / alle * 100) : 0;

      gruppe = document.createElement('details');
      gruppe.className = 'rb-teil' + (alle && fertig === alle ? ' fertig' : '') + (teil === aktTeil ? ' aktuell' : '');
      gruppe.dataset.teil = teil;
      var istOffen = offen[teil] !== undefined ? !!offen[teil] : false;
      if(teil === aktTeil) istOffen = true;          /* aktueller Teil immer sichtbar */
      gruppe.open = istOffen;
      gruppe.innerHTML = '<summary><span class="rb-teil-chev" aria-hidden="true">▸</span>' +
        '<span class="rb-teil-name">' + esc(el.textContent) + '</span>' +
        '<span class="rb-teil-zahl">' + fertig + '/' + alle + '</span>' +
        '<span class="rb-teil-bahn" aria-hidden="true"><i style="width:' + pct + '%"></i></span></summary>';
      inhalt = document.createElement('div');
      inhalt.className = 'rb-teil-inhalt';
      gruppe.appendChild(inhalt);
      gruppe.addEventListener('toggle', function(){
        var z = rbTeileLesen(); z[this.dataset.teil] = this.open; rbTeileSpeichern(z);
      });
      nav.insertBefore(gruppe, el);
      el.remove();
      return;
    }
    if(inhalt && el.matches('details.module')) inhalt.appendChild(el);
  });

  /* Werkzeugleiste: alle auf / alle zu */
  if(!document.getElementById('rbTeileWerkzeug')){
    var w = document.createElement('div');
    w.className = 'rb-teile-werkzeug'; w.id = 'rbTeileWerkzeug';
    w.innerHTML = '<button type="button" onclick="rbTeileAlle(true)">Alle auf</button>' +
                  '<button type="button" onclick="rbTeileAlle(false)">Alle zu</button>';
    nav.parentNode.insertBefore(w, nav);
  }
}
function rbTeileAlle(auf){
  var z = {};
  document.querySelectorAll('#moduleNav details.rb-teil').forEach(function(d){
    d.open = auf; z[d.dataset.teil] = auf;
    if(!auf) d.querySelectorAll('details.module').forEach(function(m){ m.open = false; });
  });
  rbTeileSpeichern(z);
}

(function(){
  var basis = renderSidebar;
  renderSidebar = function(){
    basis.apply(this, arguments);
    try{ rbTeileGruppieren(); }catch(e){ if(window.console) console.warn('Teile:', e); }
  };
  try{ rbTeileGruppieren(); }catch(e){}
})();
