
/* ---------- Zehn lustige Abzeichen ---------- */
[
  { id:'my_machine',  icon:'🙈', name:'Works on my Machine',          desc:'Eine Laboraufgabe nach mindestens drei Fehlversuchen doch noch gelöst.' },
  { id:'gummiente',   icon:'🦆', name:'Gummienten-Debugging',         desc:'Eine Laboraufgabe mit Tipp gelöst. Laut erklären hilft eben.' },
  { id:'spicker',     icon:'🙃', name:'Strg+C, Strg+V',               desc:'Dir einmal die Lösung zeigen lassen. Ehrlich währt am längsten.' },
  { id:'pizza',       icon:'🍕', name:'Pizza-Driven Development',     desc:'Eine Laboraufgabe in der Mittagspause zwischen 12 und 13 Uhr gelöst.' },
  { id:'montag',      icon:'☕', name:'Montag, 8 Uhr, null Ausreden', desc:'Montags vor 9 Uhr eine Laboraufgabe gelöst.' },
  { id:'feierabend',  icon:'🍻', name:'Feierabend? Nie gehört',       desc:'Freitags nach 17 Uhr eine Laboraufgabe gelöst.' },
  { id:'dejavu',      icon:'🔁', name:'Déjà-vu',                      desc:'Eine schon gelöste Aufgabe noch einmal gelöst – sicher ist sicher.' },
  { id:'schnecke',    icon:'🐌', name:'Gut Ding will Weile haben',    desc:'Eine Blitzrunde mit null Treffern beendet. Nächstes Mal!' },
  { id:'inbox_zero',  icon:'🧹', name:'Inbox Zero',                   desc:'Mindestens 20 Karten im Wiederholungssystem und keine einzige fällig.' },
  { id:'such_junkie', icon:'🔍', name:'Strg+K-Junkie',                desc:'Die Suche zehnmal geöffnet.' }
].forEach(function(b){ if(!BADGE_BY_ID[b.id]){ BADGES.push(b); BADGE_BY_ID[b.id] = b; } });

var labGeschafftStufe3 = labGeschafft;
labGeschafft = function(t, st){
  var vorher = labGeloest(t.id);
  var versuche = st.versuche, tipp = st.tipp, aufgedeckt = st.aufgedeckt;
  labGeschafftStufe3(t, st);
  if(vorher){ grantBadge('dejavu'); return; }
  if(!labGeloest(t.id) || aufgedeckt) return;
  var jetzt = new Date(), h = jetzt.getHours(), tag = jetzt.getDay();
  if(versuche >= 3) grantBadge('my_machine');
  if(tipp) grantBadge('gummiente');
  if(h === 12) grantBadge('pizza');
  if(tag === 1 && h < 9) grantBadge('montag');
  if(tag === 5 && h >= 17) grantBadge('feierabend');
};
var labAufdeckenStufe3 = labAufdecken;
labAufdecken = function(id){ labAufdeckenStufe3(id); grantBadge('spicker'); };
var blitzEndeStufe3 = blitzEnde;
blitzEnde = function(){
  var b = lab.blitz, offen = b && !b.fertig;
  blitzEndeStufe3();
  if(offen && b.ergebnis.filter(function(e){ return e === 'ok'; }).length === 0) grantBadge('schnecke');
};
var kpOeffnenBasis = kpOeffnen;
kpOeffnen = function(){
  state.xpLog['such:anzahl'] = (state.xpLog['such:anzahl'] || 0) + 1;
  if(state.xpLog['such:anzahl'] >= 10) grantBadge('such_junkie');
  return kpOeffnenBasis.apply(this, arguments);
};
(function(){
  var vorher = rbAnreichern;
  rbAnreichern = function(){
    vorher();
    try{ if(Object.keys(state.srs || {}).length >= 20 && dueCards().length === 0) grantBadge('inbox_zero'); }catch(e){}
  };
})();
