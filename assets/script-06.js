
[
  { lvl:21, name:'Senior der Senioren',             xp:87000,  icon:'🦾' },
  { lvl:22, name:'Siebter Hokage der Hashtabellen', xp:100000, icon:'🍥' },
  { lvl:23, name:'Ultra Instinct Developer',        xp:115000, icon:'⚡' },
  { lvl:24, name:'König der Programmierer',         xp:132000, icon:'👒' },
  { lvl:25, name:'Architekt der Matrix',            xp:150000, icon:'🌌' }
].forEach(function(r){ if(!RANKS.some(function(x){ return x.lvl === r.lvl; })) RANKS.push(r); });
