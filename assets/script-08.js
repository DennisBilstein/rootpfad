
/* ---------- Zehn weitere Abzeichen ---------- */
[
  { id:'neunschwanz',  icon:'🦊', name:'Neunschwänziger Debugger', desc:'Neun Bug-Jagden im Code-Labor gelöst.' },
  { id:'rasengan',     icon:'🌀', name:'Rasengan der Lückentexte', desc:'Zehn Lückentexte im Code-Labor gelöst.' },
  { id:'tastaturninja',icon:'⌨️', name:'Tastatur-Ninja',           desc:'Zehn Terminal-Aufgaben gelöst – ganz ohne Maus.' },
  { id:'puzzlepirat',  icon:'🧩', name:'Puzzle-Pirat',             desc:'Alle Reihenfolge-Aufgaben im Code-Labor gelöst.' },
  { id:'shenlong',     icon:'🐉', name:'Shenlong erscheint',       desc:'Alle Quests abgeschlossen. Du hast einen Wunsch frei.' },
  { id:'kaioken10',    icon:'💢', name:'Kaioken ×10',              desc:'Zehn Laboraufgaben in Folge fehlerfrei gelöst.' },
  { id:'dojo7',        icon:'🥋', name:'Dojo-Großmeister',         desc:'Sieben Tage in Folge das Daily Dojo gemeistert.' },
  { id:'gelberblitz',  icon:'⚡', name:'Gelber Blitz',             desc:'Blitzrunde mit 5 von 5 und über einer Minute Restzeit.' },
  { id:'haki',         icon:'🌊', name:'Haki erwacht',             desc:'Fünf Module mit voller Meisterschaft (alle Sterne).' },
  { id:'mitternacht',  icon:'🌙', name:'Mitternachts-Debugger',    desc:'Eine Laboraufgabe zwischen Mitternacht und vier Uhr morgens gelöst.' }
].forEach(function(b){ if(!BADGE_BY_ID[b.id]){ BADGES.push(b); BADGE_BY_ID[b.id] = b; } });

function rbGeloestVomTyp(typ){
  return LABOR.filter(function(t){ return t.typ === typ && labGeloest(t.id); }).length;
}
function rbNeueAbzeichenPruefen(){
  if(rbGeloestVomTyp('bug') >= 9) grantBadge('neunschwanz');
  if(rbGeloestVomTyp('luecke') >= 10) grantBadge('rasengan');
  if(rbGeloestVomTyp('befehl') >= 10) grantBadge('tastaturninja');
  if(LABOR.filter(function(t){ return t.typ === 'ordnen'; }).every(function(t){ return labGeloest(t.id); })) grantBadge('puzzlepirat');
  if(QUESTS.every(function(q){ return questStand(q).voll; })) grantBadge('shenlong');
  if((state.xpLog['lab:combo'] || 0) >= 10) grantBadge('kaioken10');
  if(labKataSerie() >= 7) grantBadge('dojo7');
  if((state.xpLog['blitz:best'] || 0) >= 620) grantBadge('gelberblitz');   /* 5 x 100 + mehr als 60 s x 2 */
  var voll = MODULES.filter(function(m){ var st = rbSterne(m); return st.max > 0 && st.n === st.max; }).length;
  if(voll >= 5) grantBadge('haki');
}
var labAbzeichenStufe2 = labAbzeichenPruefen;
labAbzeichenPruefen = function(){ labAbzeichenStufe2(); rbNeueAbzeichenPruefen(); };

var labGeschafftStufe2 = labGeschafft;
labGeschafft = function(t, st){
  var vorher = labGeloest(t.id);
  labGeschafftStufe2(t, st);
  if(!vorher && labGeloest(t.id) && new Date().getHours() < 4) grantBadge('mitternacht');
};
var blitzEndeStufe2 = blitzEnde;
blitzEnde = function(){ blitzEndeStufe2(); rbNeueAbzeichenPruefen(); };
(function(){
  var vorher = rbAnreichern;
  rbAnreichern = function(){ vorher(); try{ rbNeueAbzeichenPruefen(); }catch(e){} };
})();
