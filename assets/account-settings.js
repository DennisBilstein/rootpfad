async function rpDownloadAccount(){
 var status=document.getElementById('rpAccountSettingsStatus');
 try{
  await rpSync();
  var data=await rpAPI('/api/account/export');
  var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='rootpfad-account-export.json';a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  status.textContent='Serverstand exportiert. Datei enthält persönliche Lernangaben – geschützt aufbewahren. Prüfe bei Offline-/Syncfehlern zusätzlich deinen lokalen Lernstandexport.';
 }catch(error){status.textContent=error.message;}
}
async function rpChangePassword(event){
 event.preventDefault();var form=event.currentTarget,values=Object.fromEntries(new FormData(form)),status=document.getElementById('rpAccountSettingsStatus');
 if(values.newPassword!==values.confirmPassword){status.textContent='Die neuen Passwörter stimmen nicht überein.';return;}
 var button=form.querySelector('button');button.disabled=true;
 try{var result=await rpAPI('/api/account/password','POST',{currentPassword:values.currentPassword,newPassword:values.newPassword});form.reset();status.textContent=result.message;}
 catch(error){status.textContent=error.message;}finally{button.disabled=false;}
}
function rpAccountSettings(){
 if(!rpAccount)return '<h1>Kontoeinstellungen</h1><p>Bitte zuerst anmelden.</p><button class="start-btn" onclick="rpLoginView()">Zur Anmeldung</button>';
 return '<h1>Kontoeinstellungen</h1><p>Angemeldet als '+esc(rpAccount.name)+' · '+esc(rpAccount.email)+'</p><section class="callout"><h2>Persönliche Daten sichern</h2><p>Export enthält dein Konto und den auf diesem Server gespeicherten Lernstand, aber keine Passwort-Hashes oder Sitzungstokens. Der Serverexport ist kein vollständiges Datenbankbackup.</p><button class="ex-btn" onclick="rpDownloadAccount()">Konto und Serverlernstand als JSON exportieren</button></section><form id="rpPasswordForm" class="callout"><h2>Passwort ändern</h2><label for="rpCurrentPassword">Aktuelles Passwort</label><input class="sb-input" id="rpCurrentPassword" name="currentPassword" type="password" autocomplete="current-password" required maxlength="200"><label for="rpNewPassword">Neues Passwort · mindestens 12 Zeichen</label><input class="sb-input" id="rpNewPassword" name="newPassword" type="password" autocomplete="new-password" required minlength="12" maxlength="200"><label for="rpConfirmPassword">Neues Passwort wiederholen</label><input class="sb-input" id="rpConfirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required minlength="12" maxlength="200"><p>Alle bestehenden Sitzungen werden widerrufen. Dieses Gerät erhält nach erfolgreicher Änderung eine neue Sitzung. Passwortwiederherstellung per E-Mail ist weiterhin nicht eingerichtet.</p><button class="check-btn">Passwort sicher ändern</button></form><p id="rpAccountSettingsStatus" role="status" aria-live="polite"></p>';
}
(function(){
 var base=renderContent;renderContent=function(){
  if(state.currentId==='account-settings'){document.getElementById('content').innerHTML=rpAccountSettings().replace('Passwortwiederherstellung per E-Mail ist weiterhin nicht eingerichtet.','Passwortwiederherstellung ist über die Anmeldung verfügbar; echte Zustellung benötigt einen konfigurierten Maildienst.');document.getElementById('rpPasswordForm')?.addEventListener('submit',rpChangePassword);return;}
  base.apply(this,arguments);
 };
 var bar=rpAccountBar;rpAccountBar=function(){bar();var host=document.getElementById('rpAccountBar');if(rpAccount&&!document.getElementById('rpSettingsButton')){var button=document.createElement('button');button.id='rpSettingsButton';button.type='button';button.className='ex-btn';button.textContent='Kontoeinstellungen';button.onclick=function(){selectLesson('account-settings');};host.appendChild(button);}};
 rpAccountBar();
})();
