/* Große Datensätze werden erst beim Öffnen der jeweiligen Ansicht geladen (je Datei einmal, auch bei mehreren Aufrufen). */
/* Solange die Skripte laden, bleibt die Oberfläche unsichtbar. Ihre Start-Aufrufe von render() werden deshalb übersprungen
   (if(!window.RP_BOOTING)); bootstrap rendert danach einmal. Das spart mehrere vollständige Renderläufe beim Start. */
window.RP_BOOTING=true;
(function(){
  var geladen={};
  window.rpLoadScriptOnce=function(src){
    if(!geladen[src])geladen[src]=new Promise(function(resolve,reject){
      var element=document.createElement('script');element.src=src;element.onload=resolve;
      element.onerror=function(){delete geladen[src];element.remove();reject(new Error('Datei konnte nicht geladen werden: '+src));};
      document.body.appendChild(element);
    });
    return geladen[src];
  };
})();
/* Determine account storage BEFORE any existing app code reads or writes progress. */
(async function(){
  try {
    var response = await fetch('/api/me',{credentials:'same-origin',cache:'no-store'});
    if(response.ok){ var result = await response.json(); window.RP_BOOT_USER = result.user; }
  } catch(e) {}
  var scripts = Array.from(document.querySelectorAll('script[data-rp-src]'));
  /* Alle Skripte werden gleichzeitig geladen, aber in der Reihenfolge der Liste ausgeführt (async=false bei
     dynamisch eingefügten Skripten). Das Nacheinander-Laden kostete pro Datei einen vollen Netzwerk-Rundlauf. */
  function load(src){return new Promise(function(resolve,reject){var element=document.createElement('script');element.async=false;element.src=src;element.onload=resolve;element.onerror=function(){reject(new Error('Datei konnte nicht geladen werden: '+src));};document.body.appendChild(element);});}
  try {
    var sources=[];
    for(var source of scripts){
      if(source.dataset.rpSrc==='assets/script-01.js'){
        var manifestResponse=await fetch('assets/learning-manifest.json',{cache:'no-cache'});if(!manifestResponse.ok)throw Error('Lernmanifest nicht verfügbar. Bitte npm run build ausführen.');
        var manifest=await manifestResponse.json();for(var src of manifest.files){if(!/^assets\/learning\/[a-z0-9-]+\.js$/.test(src))throw Error('Ungültiger Lernskriptpfad.');sources.push(src);}
      }else sources.push(source.dataset.rpSrc);
    }
    await Promise.all(sources.map(load));
    /* accounts.js gleicht nach dem Laden noch Konto und Fortschritt ab und rendert danach neu. „Bereit“ gilt erst danach. */
    if(window.RP_ACCOUNT_READY)await window.RP_ACCOUNT_READY;
    window.RP_BOOTING=false;render();
  }catch(error){window.RP_APP_ERROR=error.message;var banner=document.createElement('section');banner.setAttribute('role','alert');banner.style.cssText='padding:24px;background:#fff;color:#172438;border:2px solid #b3261e';var title=document.createElement('h1');title.textContent='ROOTPFAD konnte nicht vollständig starten';var text=document.createElement('p');text.textContent=error.message+' Bitte die Seite neu laden und prüfen, ob der lokale Server läuft.';var button=document.createElement('button');button.textContent='Neu laden';button.onclick=function(){location.reload();};banner.append(title,text,button);document.body.prepend(banner);window.RP_BOOTING=false;document.documentElement.classList.add('rp-bereit');return;}
  window.RP_APP_READY = true;
  document.documentElement.classList.add('rp-bereit');
})();
