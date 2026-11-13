
/* ============================================================
   Siebte Runde: neue Abzeichen-Namen und ein Tutor, der sich
   automatisch mit dem lokalen Tutor-Server verbindet.
   ============================================================ */

/* ---------- Abzeichen umbenennen (Bedingungen bleiben gleich) ---------- */
(function(){
  var neu = {"first_lesson": ["⛵", "Leinen los!"], "half_way": ["🌊", "Grand Line erreicht"], "all_lessons": ["🏴‍☠️", "Laugh Tale gefunden"], "module_done": ["📦", "Klappe zu, Modul tot"], "deep_work": ["🥷", "Schattendoppelgänger ×10"], "part1_done": ["🎓", "Turnierreif"], "explorer": ["👒", "Strohhut-Entdecker"], "all_parts": ["🧬", "Fusion vollendet"], "komplettist": ["🐉", "Alle sieben Dragonballs"], "allrounder": ["🧿", "Schweizer Taschenmesser"], "streber": ["👓", "Brillenträger mit Ambitionen"], "streak3": ["🔥", "Hattrick"], "streak7": ["🍥", "Eine Woche auf dem Ninja-Weg"], "streak14": ["📅", "Der Wille des D."], "marathon": ["⏳", "Hyperbolische Zeitkammer"], "sitzfleisch": ["🪑", "Stuhlkleber"], "night_owl": ["🦉", "Kaffee statt Schlaf"], "early_bird": ["🐓", "Morgenstund hat Bytes im Mund"], "weekend": ["🏖️", "Wochenend-Saiyajin"], "exam_pass": ["🎯", "Bestanden! (Puh.)"], "exam_ace": ["💥", "Über 9000!"], "exam_perfect": ["💯", "Kamehameha mit voller Ladung"], "speedster": ["⚡", "Momentane Teleportation"], "nervenstark": ["🧊", "Ultra Instinct"], "klausur_bestanden": ["✍️", "Tinte im Blut"], "klausur_glanz": ["🏵️", "Korrektor im Koma"], "phoenix": ["🐦", "Phönix aus dem Stacktrace"], "comeback": ["🫘", "Senzu-Bohne geschluckt"], "dickkopf": ["🍜", "Ich gebe niemals auf – echt jetzt!"], "cards25": ["🧠", "Gedächtnis im Gear Second"], "cards50": ["🃏", "Kartenhai"], "quizmeister": ["👁️", "Sharingan aktiviert"], "quizlegende": ["🍥", "Hokage des Wissens"], "netzwerker": ["🌐", "Ping-Pong-Profi"], "subnet10": ["🧮", "Bitmasken-Bändiger"], "subnet50": ["🎭", "Herr der Masken"], "subnet_serie": ["🔥", "Feuerfaust-Serie"], "kabelsalat": ["🍳", "Sternekoch des Kabelsalats"], "objektifiziert": ["🧱", "Klassenbester"], "kapselkoenig": ["👑", "König der Piraten … äh, Kapselung"], "datenschuetzer": ["🥷", "DSGVO-Ninja"], "paragraph": ["⚖️", "Paragraphen-Pirat"], "erbsenzaehler": ["🪙", "Navigatorin des Geldes"], "maschinist": ["🤖", "SUPER Cyborg"], "schrauber": ["🔧", "Capsule-Corp-Mechaniker"], "first_trace": ["🌊", "Seepferdchen im Trockenen"], "all_traces": ["🔬", "Sherlock der Schleifen"], "solver5": ["🧪", "Hands-on-Hero"], "all_exercises": ["🛠️", "Aufgabenvernichter"], "expert_solver": ["🐸", "Sannin-Niveau"], "tutor_fan": ["💬", "Neugier Level 100"], "tutor_profi": ["🧙", "Stammgast beim Sensei"], "xp1000": ["⭐", "Power-Level 1000"], "xp3000": ["✨", "Super-Saiyajin"], "lab_first": ["🧪", "Hello, World!"], "lab_perfekt5": ["✅", "Ohne Stack Overflow"], "lab_combo5": ["🔥", "Kaioken ×5"], "lab_bug": ["🐞", "Kammerjäger"], "lab_boss": ["🛡️", "Firewall aus Fleisch und Blut"], "lab_kata3": ["🥋", "Dojo-Dauergast"], "lab_all": ["🥞", "Full-Stack-Pancake"], "blitz5": ["🏃", "Schneller als Rock Lee"], "sterne10": ["🌟", "Sternenhagel"], "meister_php": ["🐘", "Elefantenflüsterer"], "meister_laravel": ["🎼", "Artisan-Großmeister"], "meister_git": ["🌿", "git gud"], "quest_php-start": ["🌱", "Das PHP-Dorf verlassen"], "quest_daten": ["🗃️", "Datenpirat"], "quest_sicher": ["🔐", "Byakugan gegen Bugs"], "quest_eloquent": ["🧬", "Beziehungsexperte (Eloquent)"], "quest_api": ["🛰️", "Endpunkt-Eroberer"], "quest_git": ["⏪", "Zeitreisender"], "quest_release": ["🚀", "Freitags-Deployer (mutig!)"], "quest_boss": ["👑", "Gomu-Gomu-Bossfight"]};
  BADGES.forEach(function(b){
    var n = neu[b.id];
    if(!n) return;
    b.icon = n[0];
    b.name = n[1];
  });
  BADGES.forEach(function(b){
    if(b.id === 'lab_kata3') b.desc = 'An drei Tagen in Folge das Daily Dojo gemeistert.';
  });
})();

/* ---------- Tutor: lokalen Server automatisch finden ---------- */
var RB_TUTOR_HEALTH = RB_LOKAL_TUTOR.replace(/\/tutor$/, '/health');
async function rbTutorServerStatus(){
  try{
    var ctl = new AbortController();
    var t = setTimeout(function(){ ctl.abort(); }, 1500);
    var r = await fetch(RB_TUTOR_HEALTH, { cache:'no-store', signal:ctl.signal });
    clearTimeout(t);
    return await r.json();
  }catch(e){ return null; }
}
var kiWahlBasis = kiAnbieterWaehlen;
kiAnbieterWaehlen = async function(){
  if((KI.modus === 'auto' || KI.modus === 'backend') && !KI.endpunkt){
    var st = await rbTutorServerStatus();
    if(st && st.ok && st.schluessel) KI.endpunkt = RB_LOKAL_TUTOR;   /* nur fuer diese Sitzung */
  }
  return kiWahlBasis();
};
/* Kein automatischer Verbindungsversuch beim Laden: Der Zugriff auf localhost:8787 erzeugt sonst bei jedem Start
   einen Konsolenfehler und löst auf gehosteten Seiten Local-Network-Access-Abfragen des Browsers aus.
   Geprüft wird nur auf Nutzeraktion (Tutor-Seite öffnen, Frage stellen). */

/* ---------- Tutor-Seite, solange er aus ist: klare Anleitung mit Live-Status ---------- */
renderTutor = function(){
  if(!tutor.off) return rbTutorOriginal.apply(this, arguments);
  setTimeout(rbTutorStatusZeigen, 0);
  return '<div class="breadcrumb">Training</div><h1>AP1-Tutor einschalten</h1>' +
    '<p class="intro-sub">Der Tutor ist eine KI (Claude), die deine Fragen zum Kursstoff beantwortet. Damit er läuft, braucht er ' +
    'einen Zugang zu Claude. Als lokale Datei geht das über einen kleinen Tutor-Server auf deinem Mac – das Einrichten dauert drei Minuten.</p>' +
    '<div class="rb-tutor-weg" style="margin:var(--s4) 0;"><h3>Status</h3><p id="rbTutorStatus2" class="rb-status">prüfe …</p></div>' +
    '<div class="rb-tutor-wege">' +
    '<div class="rb-tutor-weg"><h3>Schritt 1 · API-Schlüssel besorgen</h3>' +
    '<p>Auf <strong>console.anthropic.com</strong> anmelden oder registrieren, unter <em>Billing</em> etwas Guthaben aufladen ' +
    '(eine Tutor-Frage kostet wenige Cent) und unter <em>API Keys</em> mit <em>Create Key</em> einen Schlüssel erzeugen. ' +
    'Er beginnt mit <code>sk-ant-</code>. Behandle ihn wie ein Passwort.</p></div>' +
    '<div class="rb-tutor-weg"><h3>Schritt 2 · Doppelklick zum Einrichten</h3>' +
    '<p>Im Finder den Ordner <strong>Downloads → rootpfad-tutor</strong> öffnen und <strong>„Tutor einrichten.command“</strong> doppelklicken. ' +
    'Im Terminal-Fenster den Schlüssel einfügen (Cmd+V, die Eingabe bleibt unsichtbar) und Enter drücken. Der Tutor startet ab dann ' +
    'automatisch mit deinem Mac.</p>' +
    '<p style="font-size:.82rem;color:var(--text-dim)">Fragt macOS beim ersten Mal, ob das Skript geöffnet werden darf: Rechtsklick → Öffnen.</p></div>' +
    '<div class="rb-tutor-weg"><h3>Schritt 3 · Verbindung prüfen</h3>' +
    '<p>Auf „Verbinden“ klicken. Läuft der Tutor-Server, erscheint unten rechts „Tutor fragen“ – ohne weitere Einstellungen.</p>' +
    '<div class="rb-zeile" style="align-items:center;"><button class="ex-btn primary" type="button" onclick="rbTutorStatusZeigen()">Verbinden</button></div></div>' +
    '<div class="rb-tutor-weg"><h3>Alternative · auf claude.ai</h3><p>Lädst du die Datei auf claude.ai als Artifact hoch, läuft der Tutor dort über ' +
    'dein claude.ai-Konto – ganz ohne API-Schlüssel.</p></div>' +
    '</div>' + renderKiEinstellungen();
};
async function rbTutorStatusZeigen(){
  var el = document.getElementById('rbTutorStatus2');
  if(!el) return;
  el.className = 'rb-status'; el.textContent = 'prüfe …';
  var st = await rbTutorServerStatus();
  if(!st){
    el.className = 'rb-status nein';
    el.textContent = 'Tutor-Server läuft nicht. → Schritt 1 und 2 ausführen.';
  } else if(!st.schluessel){
    el.className = 'rb-status nein';
    el.textContent = 'Tutor-Server läuft, aber es ist noch kein API-Schlüssel hinterlegt. → Schritt 2 erneut ausführen.';
  } else {
    el.className = 'rb-status ok';
    el.textContent = 'Tutor-Server läuft mit Schlüssel (Modell ' + st.modell + '). Verbinde …';
    if(KI.modus !== 'aus'){
      KI.endpunkt = KI.endpunkt || RB_LOKAL_TUTOR;   /* nur für diese Sitzung */
      await tutorNeuVerbinden();
      rbTutorKnopf();
      el.textContent = 'Verbunden (Modell ' + st.modell + '). Unten rechts kannst du jetzt Fragen stellen.';
    }
  }
}
