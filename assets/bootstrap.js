/* Determine account storage BEFORE any existing app code reads or writes progress. */
(async function(){
  try {
    var response = await fetch('/api/me',{credentials:'same-origin',cache:'no-store'});
    if(response.ok){ var result = await response.json(); window.RP_BOOT_USER = result.user; }
  } catch(e) {}
  var scripts = Array.from(document.querySelectorAll('script[data-rp-src]'));
  for(var source of scripts){
    await new Promise(function(resolve,reject){
      var script = document.createElement('script'); script.src = source.dataset.rpSrc; script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
    });
  }
  window.RP_APP_READY = true;
})();
