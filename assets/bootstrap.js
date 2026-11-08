/* Determine account storage BEFORE any existing app code reads or writes progress. */
(async function(){
  try {
    var response = await fetch('/api/me',{credentials:'same-origin',cache:'no-store'});
    if(response.ok){ var result = await response.json(); window.RP_BOOT_USER = result.user; }
  } catch(e) {}
  var scripts = Array.from(document.querySelectorAll('script[data-rp-src]'));
  async function load(src){await new Promise(function(resolve,reject){var element=document.createElement('script');element.src=src;element.onload=resolve;element.onerror=function(){reject(new Error('Datei konnte nicht geladen werden: '+src));};document.body.appendChild(element);});}
  try { for(var source of scripts){
    if(source.dataset.rpSrc==='assets/script-01.js'){
      var manifestResponse=await fetch('assets/learning-manifest.json',{cache:'no-cache'});if(!manifestResponse.ok)throw Error('Lernmanifest nicht verfügbar. Bitte npm run build ausführen.');
      var manifest=await manifestResponse.json();for(var src of manifest.files){if(!/^assets\/learning\/[a-z0-9-]+\.js$/.test(src))throw Error('Ungültiger Lernskriptpfad.');await load(src);}
    }else await load(source.dataset.rpSrc);
  } }catch(error){window.RP_APP_ERROR=error.message;var banner=document.createElement('section');banner.setAttribute('role','alert');banner.style.cssText='padding:24px;background:#fff;color:#172438;border:2px solid #b3261e';var title=document.createElement('h1');title.textContent='ROOTPFAD konnte nicht vollständig starten';var text=document.createElement('p');text.textContent=error.message+' Bitte die Seite neu laden und prüfen, ob der lokale Server läuft.';var button=document.createElement('button');button.textContent='Neu laden';button.onclick=function(){location.reload();};banner.append(title,text,button);document.body.prepend(banner);return;}
  window.RP_APP_READY = true;
})();
