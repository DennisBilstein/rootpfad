
/* ============================================================
   Bewegung, vierte Runde — Topography, RotatingText,
   AnimatedContent, Ergebnisfarben. Baut auf RB aus der dritten
   Runde auf. React Bits: MIT + Commons Clause, (c) David Haz.
   ============================================================ */

/* ---------- Topography ---------- */
var RB_TOPO_FRAG = [
  '#version 300 es',
  'precision highp float;',
  'uniform vec2 iResolution; uniform float uBands; uniform float uThickness; uniform float uGlow;',
  'uniform float uContrast; uniform float uMorphAmount; uniform float uOpacity;',
  'uniform vec3 uLow; uniform vec3 uMid; uniform vec3 uHigh;',
  'uniform vec2 uMouse; uniform float uMouseRadius; uniform float uMouseStrength; uniform float uMouseActive;',
  'uniform vec4 uCtrlA; uniform vec4 uCtrlB; uniform vec4 uCtrlC; uniform vec4 uCtrlD;',
  'out vec4 fragColor;',
  'float bez(float t, vec4 c){ float w = 6.2831853 * t;',
  '  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w)); }',
  'float field(vec2 uv){ vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));',
  '  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD)); return distance(a, b); }',
  'vec3 elevationColor(float e){ vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.5, e));',
  '  return mix(c, uHigh, smoothstep(0.5, 1.0, e)); }',
  'void main(){',
  '  vec2 res = iResolution.xy; vec2 uv = gl_FragCoord.xy / res;',
  '  float fv = field(uv);',
  '  vec2 d = uv - uMouse; d.x *= res.x / max(res.y, 1.0);',
  '  float r = max(uMouseRadius, 0.001);',
  '  fv += exp(-dot(d, d) / (r * r)) * uMouseStrength * uMouseActive;',
  '  float f = fv * uBands; float fr = fract(f); float lineDist = min(fr, 1.0 - fr);',
  '  float aa = fwidth(f) + 0.0001;',
  '  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);',
  '  float glowR = uThickness + uGlow * 0.5 + aa;',
  '  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);',
  '  float elev = clamp(fv / (uMorphAmount * 2.5 + 0.001), 0.0, 1.0);',
  '  float coverage = pow(clamp(mask + glow * 0.55, 0.0, 1.0), max(uContrast, 0.001));',
  '  float a = coverage * uOpacity;',
  '  fragColor = vec4(clamp(elevationColor(elev), 0.0, 1.0) * a, a);',
  '}'
].join('\n');

/* Farben je Bedeutung: Rang und offene Ergebnisse blau, gute gruen, knappe bernstein.
   Rot bekommt bewusst keine Flaeche. */
var RB_TOPO_FARBEN = {
  blau:  { dunkel:['#1b3a6b', '#3f78d6', '#9cc4ff'], hell:['#c9d8f3', '#5b8de0', '#1a55c0'] },
  gruen: { dunkel:['#0f3b2a', '#2f9d6a', '#8ee3b8'], hell:['#cde9db', '#3a9d70', '#11704a'] },
  bern:  { dunkel:['#3b2a12', '#b9771f', '#f6c27a'], hell:['#f3e0c2', '#c98a2e', '#a25c00'] }
};
var RB_CTRL = [[1, -2, 3, -4], [9, -8, 7, -6], [5, 2, 5, -5], [-1, -3, 8, 9]];

function rbTopoErzeugen(){
  var cv = document.createElement('canvas');
  cv.className = 'rb-topo';
  cv.setAttribute('aria-hidden', 'true');
  var gl = null;
  try{ gl = cv.getContext('webgl2', { alpha:true, premultipliedAlpha:true, antialias:false }); }catch(e){}
  if(!gl) return null;
  function shader(typ, q){
    var sh = gl.createShader(typ); gl.shaderSource(sh, q); gl.compileShader(sh);
    if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  }
  var prog;
  try{
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, RB_AURORA_VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, RB_TOPO_FRAG));
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  }catch(e){
    if(window.console && console.warn) console.warn('Topography:', e);
    return null;
  }
  gl.useProgram(prog);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  var u = {};
  ['iResolution', 'uBands', 'uThickness', 'uGlow', 'uContrast', 'uMorphAmount', 'uOpacity',
   'uLow', 'uMid', 'uHigh', 'uMouse', 'uMouseRadius', 'uMouseStrength', 'uMouseActive',
   'uCtrlA', 'uCtrlB', 'uCtrlC', 'uCtrlD'].forEach(function(n){ u[n] = gl.getUniformLocation(prog, n); });
  gl.uniform1f(u.uBands, 3.0);
  gl.uniform1f(u.uThickness, 0.014);
  gl.uniform1f(u.uGlow, 0.3);
  gl.uniform1f(u.uContrast, 3.0);
  gl.uniform1f(u.uMorphAmount, 2.2);
  gl.uniform1f(u.uOpacity, 0.6);
  gl.uniform1f(u.uMouseRadius, 0.3);
  gl.uniform1f(u.uMouseStrength, 0.5);

  var t = { cv:cv, gl:gl, u:u, raf:0, w:0, h:0, start:performance.now(), farbe:null, schluessel:null,
            maus:[0.5, 0.5], mausZiel:[0.5, 0.5], aktiv:0, aktivZiel:0, host:null };
  function bewegt(e){
    var r = cv.getBoundingClientRect();
    t.mausZiel[0] = (e.clientX - r.left) / r.width;
    t.mausZiel[1] = 1 - (e.clientY - r.top) / r.height;
    t.aktivZiel = 1;
  }
  t.bewegt = bewegt;
  t.verlassen = function(){ t.aktivZiel = 0; };
  return t;
}

function rbTopoBild(t, jetzt){
  var gl = t.gl, u = t.u;
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var w = Math.max(1, Math.round(t.cv.clientWidth * dpr));
  var h = Math.max(1, Math.round(t.cv.clientHeight * dpr));
  if(w !== t.w || h !== t.h){
    t.cv.width = w; t.cv.height = h; t.w = w; t.h = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.iResolution, w, h);
  }
  var schluessel = t.farbe + (rbDunkel() ? ':d' : ':h');
  if(schluessel !== t.schluessel){
    t.schluessel = schluessel;
    var f = RB_TOPO_FARBEN[t.farbe][rbDunkel() ? 'dunkel' : 'hell'];
    gl.uniform3fv(u.uLow, rbHex(f[0])); gl.uniform3fv(u.uMid, rbHex(f[1])); gl.uniform3fv(u.uHigh, rbHex(f[2]));
  }
  /* Ruhig: Original speed 0.35, hier 0.2. Ohne Bewegung ein fester Moment. */
  var zeit = RB.bewegung ? (jetzt - t.start) / 1000 : 6.0;
  var sp = 0.2, msp = 0.05, ma = 2.2;
  var namen = ['uCtrlA', 'uCtrlB', 'uCtrlC', 'uCtrlD'];
  for(var g = 0; g < 4; g++){
    var v = [];
    for(var j = 0; j < 4; j++){
      var i = RB_CTRL[g][j];
      v.push(ma * Math.sin(zeit * sp * Math.sin(i * msp) + i));
    }
    gl.uniform4f(u[namen[g]], v[0], v[1], v[2], v[3]);
  }
  t.maus[0] += 0.05 * (t.mausZiel[0] - t.maus[0]);
  t.maus[1] += 0.05 * (t.mausZiel[1] - t.maus[1]);
  t.aktiv += 0.05 * (t.aktivZiel - t.aktiv);
  gl.uniform2f(u.uMouse, t.maus[0], t.maus[1]);
  gl.uniform1f(u.uMouseActive, RB.bewegung ? t.aktiv : 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function rbTopoSchleife(jetzt){
  var t = RB.topo;
  if(!t || !t.cv.isConnected){ if(t) t.raf = 0; return; }
  if(!document.hidden) rbTopoBild(t, jetzt);
  t.raf = RB.bewegung ? requestAnimationFrame(rbTopoSchleife) : 0;
}

function rbTopoAnhaengen(host, farbe){
  if(RB.topo === undefined) RB.topo = rbTopoErzeugen() || false;
  var t = RB.topo;
  if(!t) return;
  t.farbe = farbe;
  if(t.host && t.host !== host){
    t.host.removeEventListener('pointermove', t.bewegt);
    t.host.removeEventListener('pointerleave', t.verlassen);
  }
  if(t.host !== host){
    host.addEventListener('pointermove', t.bewegt, { passive:true });
    host.addEventListener('pointerleave', t.verlassen);
    t.host = host;
  }
  if(t.cv.parentNode !== host) host.insertBefore(t.cv, host.firstChild);
  if(!t.raf) t.raf = requestAnimationFrame(rbTopoSchleife);
}

/* ---------- Ergebnisse: gruen ab 70 %, bernstein ab 50 %, sonst rot ---------- */
function rbErgebnisse(wurzel){
  var farbe = null;
  wurzel.querySelectorAll('.score-hero').forEach(function(hero){
    var num = hero.querySelector('.score-num');
    if(!num || hero.dataset.rbUrteil) return;
    hero.dataset.rbUrteil = '1';
    var pct = parseInt(num.getAttribute('aria-label') || num.textContent, 10);
    if(isNaN(pct)) return;
    var stufe = pct >= 70 ? 'gut' : pct >= 50 ? 'knapp' : 'offen';
    if(stufe === 'knapp'){ num.classList.remove('score-fail'); num.classList.add('rb-knapp'); }
    var text = stufe === 'gut' ? 'Sicher bestanden'
             : stufe === 'knapp' ? 'Bestanden, aber knapp'
             : 'Noch nicht bestanden — dranbleiben';
    hero.insertAdjacentHTML('beforeend', '<span class="rb-urteil ' + stufe + '">' + text + '</span>');
    /* Die Flaeche bleibt bei Misserfolg blau: Blau beruhigt und lenkt auf das Weiterlernen. */
    farbe = stufe === 'gut' ? 'gruen' : stufe === 'knapp' ? 'bern' : 'blau';
    rbTopoAnhaengen(hero, farbe);
  });
  var rk = wurzel.querySelector('.rangkarte');
  if(rk) rbTopoAnhaengen(rk, 'blau');
}

/* ---------- RotatingText ---------- */
var RB_THEMEN = ['Pseudocode', 'SQL & ER-Modell', 'UML', 'Subnetting', 'IPv6',
                 'Netzplantechnik', 'IT-Sicherheit', 'Datenschutz', 'KI', 'PHP', 'Laravel', 'Git'];
function rbRotieren(wurzel){
  var el = wurzel.querySelector('.rb-rotate');
  if(!el || el.dataset.rbLaeuft) return;
  el.dataset.rbLaeuft = '1';
  var i = 0;
  function zeigen(wort){
    el.innerHTML = wort.split('').map(function(z, k){
      return '<span style="animation-delay:' + (k * 18) + 'ms">' + esc(z) + '</span>';
    }).join('');
    setTimeout(function(){
      el.querySelectorAll('span').forEach(function(z){ if(!el.classList.contains('raus')) z.style.animation = 'none'; });
    }, wort.length * 18 + 600);
  }
  zeigen(RB_THEMEN[0]);
  if(!RB.bewegung) return;
  var timer = setInterval(function(){
    if(!el.isConnected){ clearInterval(timer); return; }
    if(document.hidden) return;
    el.classList.add('raus');
    setTimeout(function(){
      i = (i + 1) % RB_THEMEN.length;
      el.classList.remove('raus');
      zeigen(RB_THEMEN[i]);
    }, 280);
  }, 2600);
}

/* ---------- AnimatedContent ---------- */
function rbAuftritt(wurzel){
  var n = 0;
  wurzel.querySelectorAll('.today-item, .stat-tile, .module-card, .ex-card, .part-heading, .rail-karte').forEach(function(el){
    if(n > 40) return;
    el.style.setProperty('--rb-i', Math.min(n, 14));
    el.classList.remove('rb-auftritt');
    void el.offsetWidth;
    el.classList.add('rb-auftritt');
    n++;
  });
  /* Sicherheitsnetz wie beim Titel: nie unsichtbar haengen bleiben. */
  setTimeout(function(){
    wurzel.querySelectorAll('.rb-auftritt').forEach(function(el){ el.classList.remove('rb-auftritt'); });
  }, 15 * 35 + 900);
}

/* ---------- Einhaengen ---------- */
(function(){
  var vorher = rbAnreichern;
  var letzte = null;
  rbAnreichern = function(){
    var neu = state.currentId !== RB.ansicht;
    vorher();
    var el = document.getElementById('content');
    if(!el) return;
    var anlegen = function(){ if(el.isConnected) rbErgebnisse(el); };
    /* Erstes Anlegen des WebGL-Kontexts ausserhalb der View Transition */
    if(RB.topo === undefined) setTimeout(anlegen, 0); else anlegen();
    rbRotieren(el);
    if(neu && RB.bewegung){
      rbAuftritt(el);
      var rail = document.getElementById('rail');
      if(rail) rbAuftritt(rail);
    }
  };
  var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  var neuZeichnen = function(){ if(RB.topo && !RB.topo.raf) RB.topo.raf = requestAnimationFrame(rbTopoSchleife); };
  if(mq && mq.addEventListener) mq.addEventListener('change', neuZeichnen);
  new MutationObserver(neuZeichnen).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
  RB.ansicht = null;
  try{ rbAnreichern(); }catch(e){}
})();
