
/* ============================================================
   Bewegung nach React Bits — Vanilla-Portierung ohne React,
   ogl oder motion. Aurora (WebGL2), SpotlightCard, CountUp,
   BlurText; ShinyText ist reines CSS.
   React Bits: MIT + Commons Clause, (c) David Haz.
   ============================================================ */
var RB = {
  bewegung: !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
  ansicht: null,
  aurora: null
};

function rbDunkel(){
  var t = document.documentElement.getAttribute('data-theme');
  if(t === 'dark') return true;
  if(t === 'light') return false;
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

/* ---------- Aurora ---------- */
var RB_AURORA_VERT = '#version 300 es\nin vec2 position;\nvoid main(){ gl_Position = vec4(position, 0.0, 1.0); }\n';
var RB_AURORA_FRAG = [
  '#version 300 es',
  'precision highp float;',
  'uniform float uTime; uniform float uAmplitude; uniform vec3 uColorStops[3];',
  'uniform vec2 uResolution; uniform float uBlend; uniform float uLightMode;',
  'out vec4 fragColor;',
  'vec3 permute(vec3 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }',
  'float snoise(vec2 v){',
  '  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);',
  '  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);',
  '  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
  '  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);',
  '  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));',
  '  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);',
  '  m = m * m; m = m * m;',
  '  vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5;',
  '  vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;',
  '  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);',
  '  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
  '  return 130.0 * dot(m, g);',
  '}',
  'vec3 rampe(float f){',
  '  return f < 0.5 ? mix(uColorStops[0], uColorStops[1], f / 0.5)',
  '                 : mix(uColorStops[1], uColorStops[2], (f - 0.5) / 0.5);',
  '}',
  'void main(){',
  '  vec2 uv = gl_FragCoord.xy / uResolution;',
  '  vec3 rampColor = rampe(uv.x);',
  '  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;',
  '  height = exp(height);',
  '  height = (uv.y * 2.0 - height + 0.2);',
  '  float intensity = 0.6 * height;',
  '  float midPoint = 0.20;',
  '  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);',
  '  vec3 auroraColor = intensity * rampColor;',
  '  if(uLightMode > 0.5){',
  '    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);',
  '    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);',
  '    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));',
  '    float peak = max(chroma.r, max(chroma.g, chroma.b));',
  '    chroma /= max(peak, 0.0001);',
  '    float a = min(coverage * 1.08, 0.94);',
  '    fragColor = vec4(chroma * a, a);',
  '  } else {',
  '    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);',
  '  }',
  '}'
].join('\n');

/* Nur Fokusblau: Gruen und Bernstein tragen in ROOTPFAD eigene Bedeutungen. */
var RB_STOPS_DUNKEL = ['#2f6fe8', '#8fbcff', '#3a5bd9'];
var RB_STOPS_HELL   = ['#1a55c0', '#5b93f0', '#2c47b8'];

function rbHex(h){
  var n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function rbAuroraErzeugen(){
  var cv = document.createElement('canvas');
  cv.className = 'rb-aurora';
  cv.setAttribute('aria-hidden', 'true');
  var gl = null;
  try{ gl = cv.getContext('webgl2', { alpha:true, premultipliedAlpha:true, antialias:false }); }catch(e){}
  if(!gl) return null;

  function shader(typ, quelle){
    var sh = gl.createShader(typ);
    gl.shaderSource(sh, quelle); gl.compileShader(sh);
    if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  }
  var prog;
  try{
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, RB_AURORA_VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, RB_AURORA_FRAG));
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  }catch(e){
    if(window.console && console.warn) console.warn('Aurora:', e);
    return null;
  }
  gl.useProgram(prog);

  /* Ein Dreieck, das den ganzen Bildschirm abdeckt */
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
  ['uTime', 'uAmplitude', 'uColorStops', 'uResolution', 'uBlend', 'uLightMode'].forEach(function(n){
    u[n] = gl.getUniformLocation(prog, n);
  });
  gl.uniform1f(u.uAmplitude, 1.0);
  gl.uniform1f(u.uBlend, 0.5);

  return { cv:cv, gl:gl, u:u, raf:0, w:0, h:0, start:performance.now(), dunkel:null };
}

function rbAuroraBild(a, jetzt){
  var gl = a.gl;
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var w = Math.max(1, Math.round(a.cv.clientWidth * dpr));
  var h = Math.max(1, Math.round(a.cv.clientHeight * dpr));
  if(w !== a.w || h !== a.h){
    a.cv.width = w; a.cv.height = h; a.w = w; a.h = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(a.u.uResolution, w, h);
  }
  var dunkel = rbDunkel();
  if(dunkel !== a.dunkel){
    a.dunkel = dunkel;
    var stops = dunkel ? RB_STOPS_DUNKEL : RB_STOPS_HELL;
    gl.uniform3fv(a.u.uColorStops, new Float32Array([].concat(rbHex(stops[0]), rbHex(stops[1]), rbHex(stops[2]))));
    gl.uniform1f(a.u.uLightMode, dunkel ? 0 : 1);
  }
  /* Ruhiger als das Original: halbe Geschwindigkeit. Ohne Bewegung ein fester Moment. */
  var t = RB.bewegung ? (jetzt - a.start) / 1000 * 0.5 : 4.0;
  gl.uniform1f(a.u.uTime, t);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function rbAuroraSchleife(jetzt){
  var a = RB.aurora;
  if(!a || !a.cv.isConnected){ if(a) a.raf = 0; return; }
  if(!document.hidden) rbAuroraBild(a, jetzt);
  a.raf = RB.bewegung ? requestAnimationFrame(rbAuroraSchleife) : 0;
}

function rbAuroraAnhaengen(host){
  if(RB.aurora === null) RB.aurora = rbAuroraErzeugen() || false;
  var a = RB.aurora;
  if(!a){ host.classList.add('rb-aurora-fallback'); return; }
  /* Dasselbe Canvas wandert mit: kein neuer WebGL-Kontext pro Neuzeichnen. */
  if(a.cv.parentNode !== host) host.insertBefore(a.cv, host.firstChild);
  if(!a.raf) a.raf = requestAnimationFrame(rbAuroraSchleife);
}

/* ---------- SpotlightCard ---------- */
var RB_SPOT = '.module-card, .today-item, .stat-tile, .rail-karte, .ex-card';
RB.spot = null;
document.addEventListener('pointermove', function(e){
  if(e.pointerType && e.pointerType !== 'mouse') return;
  var el = e.target.closest ? e.target.closest(RB_SPOT) : null;
  if(RB.spot && RB.spot !== el) RB.spot.style.setProperty('--rb-o', '0');
  RB.spot = el;
  if(!el) return;
  var r = el.getBoundingClientRect();
  el.style.setProperty('--rb-x', (e.clientX - r.left) + 'px');
  el.style.setProperty('--rb-y', (e.clientY - r.top) + 'px');
  el.style.setProperty('--rb-o', '1');
}, { passive:true });
document.addEventListener('pointerleave', function(){
  if(RB.spot){ RB.spot.style.setProperty('--rb-o', '0'); RB.spot = null; }
});

/* ---------- CountUp ---------- */
function rbHochzaehlen(wurzel){
  wurzel.querySelectorAll('.stat-tile .num, .today-item .ti-value, .ring-zahl').forEach(function(el){
    var text = el.textContent.trim();
    var m = /^(~?)(\d{1,6})(%?)$/.exec(text);
    if(!m) return;
    var ziel = parseInt(m[2], 10);
    if(ziel < 2) return;
    el.setAttribute('aria-label', text);
    var t0 = performance.now(), dauer = 900 + Math.min(700, ziel);
    (function schritt(jetzt){
      var p = Math.min(1, (jetzt - t0) / dauer);
      var e = 1 - Math.pow(1 - p, 3);                 /* weich auslaufen */
      el.textContent = m[1] + Math.round(ziel * e) + m[3];
      if(p < 1 && el.isConnected) requestAnimationFrame(schritt);
      else el.textContent = text;
    })(t0);
  });
}

/* ---------- BlurText ---------- */
function rbScharfstellen(wurzel){
  wurzel.querySelectorAll('.lesson-head h1, .intro-hero h1, .heute-gruss').forEach(function(el){
    if(el.children.length || el.dataset.rbBlur) return;
    var text = el.textContent.trim();
    if(!text) return;
    el.dataset.rbBlur = '1';
    el.setAttribute('aria-label', text);
    var teile = text.indexOf(' ') === -1 ? text.split('') : text.split(' ');
    var schritt = teile.length > 1 && text.indexOf(' ') === -1 ? 45 : 80;
    el.innerHTML = teile.map(function(t, i){
      return '<span class="rb-blur" aria-hidden="true" style="animation-delay:' + (i * schritt) + 'ms">' + esc(t) + '</span>';
    }).join(text.indexOf(' ') === -1 ? '' : ' ');
    /* Sicherheitsnetz: Startet die Animation nicht (z. B. waehrend einer haengenden
       View Transition), steht der Titel nach Ablauf trotzdem sichtbar da. */
    setTimeout(function(){
      if(el.isConnected && el.querySelector('.rb-blur')){ el.textContent = text; el.removeAttribute('aria-label'); }
    }, teile.length * schritt + 1200);
  });
}

/* ---------- Einhaengen in den Renderzyklus ---------- */
function rbAnreichern(){
  var el = document.getElementById('content');
  if(!el) return;
  var host = el.querySelector('.intro-hero, .heute-kopf');
  if(host){
    /* Erstes Anlegen (Shader kompilieren) ausserhalb der View Transition,
       damit deren Zeitlimit nie greift. Danach wird das Canvas nur verschoben. */
    if(RB.aurora === null) setTimeout(function(){ if(host.isConnected) rbAuroraAnhaengen(host); }, 0);
    else rbAuroraAnhaengen(host);
  }
  /* Einblenden und Hochzaehlen nur beim Wechsel der Ansicht, nicht bei jedem Neuzeichnen. */
  var neu = state.currentId !== RB.ansicht;
  RB.ansicht = state.currentId;
  if(neu && RB.bewegung){
    rbScharfstellen(el);
    rbHochzaehlen(el);
  }
}

(function(){
  var original = renderContent;
  renderContent = function(){
    original.apply(this, arguments);
    try{ rbAnreichern(); }catch(e){ if(window.console && console.warn) console.warn('Bewegung:', e); }
  };
  /* Themenwechsel ohne Bewegung: das stehende Bild neu zeichnen */
  if(window.matchMedia){
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var neu = function(){ if(RB.aurora && !RB.aurora.raf) RB.aurora.raf = requestAnimationFrame(rbAuroraSchleife); };
    if(mq.addEventListener) mq.addEventListener('change', neu);
    new MutationObserver(neu).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
  }
  try{ rbAnreichern(); }catch(e){}
})();
