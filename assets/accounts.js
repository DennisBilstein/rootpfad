var rpAccount = null;
var rpSyncTimer = null;
var rpSyncReady = false;
var rpSyncBusy = false;
var rpSyncAgain = false;
var rpSyncMessage = 'Nicht angemeldet';
async function rpAPI(url,method,body){
  var headers=body?{'Content-Type':'application/json'}:{};
   if(rpAccount&&url.startsWith('/api/'))headers['X-Rootpfad-User']=String(rpAccount.id);
  var response = await fetch(url,{method:method || 'GET',headers:headers,body:body ? JSON.stringify(body) : undefined,credentials:'same-origin'});
  var result;
  try{result=await response.json();}catch(e){throw new Error('Keine gültige Serverantwort. Prüfe, ob der ROOTPFAD-Server erreichbar ist.');}
  if(!response.ok) throw new Error(result.error || 'Server nicht erreichbar.');
  return result;
}
function rpAccountBar(){
  var host = document.getElementById('rpAccountBar');
  if(!host){ host = document.createElement('section'); host.id = 'rpAccountBar'; document.getElementById('moduleNav').before(host); }
  host.innerHTML = rpAccount ? '<strong>'+esc(rpAccount.name)+'</strong><p role="status">'+esc(rpSyncMessage)+'</p>'+(rpAccount.role === 'admin' ? '<p><a href="/admin">Admin · Teilnehmerampel</a></p>' : '')+'<button class="ex-btn" onclick="rpLogout()">Abmelden</button>' : '<p role="status">'+esc(rpSyncMessage)+'</p><button class="ex-btn" onclick="rpLoginView()">Anmelden</button>';
}
function rpLoginView(){ state.currentId = 'account'; renderContent(); }
function rpAccountForm(){
  var params = new URLSearchParams(location.hash.slice(1));
  var mode = params.has('setup') ? 'setup' : params.has('invite') ? 'register' : 'login';
  var h = '<h1>'+({setup:'Administrator einrichten',register:'Einladung annehmen',login:'Anmelden'})[mode]+'</h1>';
  h += '<p>Dein Lernstand wird automatisch auf diesem ROOTPFAD-Server gespeichert. Administratoren sehen Name, E-Mail, gewählten Lernpfad, bearbeitete Lektionen, Quizquote, fällige Karten und letzte übertragene Lernaktivität. Praktische Einreichungen und Hinweise zu unklaren Fragen werden ebenfalls übertragen. Revisionsbezogene Erstversuche dienen der redaktionellen Fragenprüfung; daraus wird keine automatische Kompetenz- oder Schwierigkeitsnote berechnet. Die Ampel bewertet Aktivität und Bearbeitungsstand, nicht deine persönliche Fähigkeit.</p>';
  h += '<p>Beim Anmelden wird nur der Lernstand dieses Kontos geladen. Ein vorhandener Gast-Lernstand wird nicht automatisch übertragen.</p><form id="rpLoginForm" class="callout" data-mode="'+mode+'">';
  if(mode !== 'login') h += '<label for="rpName">Anzeigename</label><input class="sb-input" id="rpName" name="name" required maxlength="100" autocomplete="name">';
  h += '<label for="rpEmail">E-Mail</label><input class="sb-input" id="rpEmail" name="email" type="email" required maxlength="254" autocomplete="username"><label for="rpPassword">Passwort'+(mode !== 'login' ? ' · mindestens 12 Zeichen' : '')+'</label><input class="sb-input" id="rpPassword" name="password" type="password" required '+(mode !== 'login' ? 'minlength="12"' : '')+' maxlength="200" autocomplete="'+(mode === 'login' ? 'current-password' : 'new-password')+'"><p id="rpLoginError" role="alert"></p><button class="start-btn" type="submit">'+(mode === 'login' ? 'Anmelden' : 'Konto erstellen')+'</button></form>';
  return h;
}
function rpResetAccountState(){
  // Reload after switching storage keys: no in-memory state crosses account boundaries.
  location.replace(location.pathname);
}
async function rpSubmitAccount(event){
  event.preventDefault();
  var form = event.currentTarget, button = form.querySelector('button'), values = Object.fromEntries(new FormData(form));
  var mode = form.dataset.mode, params = new URLSearchParams(location.hash.slice(1));
  values.token = params.get(mode === 'setup' ? 'setup' : 'invite'); button.disabled = true;
  try { await rpAPI('/api/'+mode,'POST',values); sessionStorage.setItem('rp-login-request','1'); rpResetAccountState(); }
  catch(e){ document.getElementById('rpLoginError').textContent = e.message; button.disabled = false; }
}
async function rpLogout(){
  try { await rpSync(); await rpAPI('/api/logout','POST',{}); rpResetAccountState(); }
  catch(e){ rpSyncMessage = 'Abmelden fehlgeschlagen: '+e.message; rpAccountBar(); }
}
async function rpSync(){
  if(!rpAccount || !rpSyncReady) return;
  if(rpSyncBusy){ rpSyncAgain = true; return; }
  rpSyncBusy = true;
  try {
    var response = await rpAPI('/api/progress','PUT',{data:serialize(),learningPath:rpPath});
    if(response.data && rpSyncReady && rpAccount){ mergeIn(response.data); saveLocal(); }
    rpSyncMessage = 'Übertragen · '+new Date().toLocaleTimeString('de-DE');
  } catch(e){ rpSyncMessage = 'Nicht übertragen: '+e.message+' · lokaler Stand bleibt erhalten'; }
  finally { rpSyncBusy = false; rpAccountBar(); if(rpSyncAgain){rpSyncAgain=false;rpScheduleSync();} }
}
function rpScheduleSync(){ if(!rpSyncReady) return; clearTimeout(rpSyncTimer); rpSyncTimer = setTimeout(rpSync,1200); }
/* bootstrap.js wartet auf dieses Promise, damit „bereit“ erst nach dem ersten Konto-Abgleich und dem folgenden Render gilt. */
window.RP_ACCOUNT_READY=(async function(){
  var renderBase = renderContent;
  renderContent = function(){
    if(state.currentId === 'account'){
      document.getElementById('content').innerHTML = rpAccountForm();
      document.getElementById('rpLoginForm').addEventListener('submit',rpSubmitAccount);
    } else renderBase.apply(this,arguments);
    rpAccountBar();
  };
  var saveBase = saveProgress;
  saveProgress = function(){ var result = saveBase.apply(this,arguments); rpScheduleSync(); return result; };
  var chooseBase = rpChoosePath;
  rpChoosePath = function(id){ chooseBase(id); rpScheduleSync(); };
  try {
    var result = await rpAPI('/api/me'); rpAccount = result.user;
    var nextKey = rpAccount ? 'rootpfad-user-'+rpAccount.id+'-progress' : 'ap1-expertenpfad-progress-v1';
    // Bootstrap chooses the storage namespace before loading the app. If a session
    // changed between bootstrap and here, reload rather than merging user data.
    if(STORAGE_KEY !== nextKey){ location.reload(); return; }
    if(rpAccount){
      var remote = await rpAPI('/api/progress');
      if(remote.data) mergeIn(remote.data);
      rpSyncReady = true; rpSyncMessage = 'Angemeldet · automatische Übertragung aktiv';
      saveProgress();
      window.addEventListener('online',rpScheduleSync);
      setInterval(rpSync,30000);
      document.addEventListener('visibilitychange',function(){ if(document.visibilityState === 'hidden') rpSync(); });
    }
    var params = new URLSearchParams(location.hash.slice(1));
    if(!rpAccount && (params.has('setup') || params.has('invite'))) state.currentId = 'account';
    render();
  } catch(e){ rpSyncMessage = 'Offline-Modus · Anmeldung benötigt den ROOTPFAD-Server'; rpAccountBar(); }
})();
