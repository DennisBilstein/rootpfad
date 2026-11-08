var labels = {green:'Grün · Im Bereich',yellow:'Gelb · Aufmerksamkeit',red:'Rot · Bitte prüfen',gray:'Grau · Keine Bewertung'};
function node(tag,text){var n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;}
async function api(url,method,body){var r=await fetch(url,{method:method||'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});var d=await r.json();if(!r.ok)throw Error(d.error);return d;}
function time(value){return value?new Date(value).toLocaleString('de-DE'):'Noch keine';}
async function refresh(){
  try {
    var d=await api('/api/admin/participants');
    document.getElementById('adminContent').hidden=false;
    document.getElementById('status').textContent='Stand: '+new Date().toLocaleTimeString('de-DE')+' · '+d.participants.length+' Teilnehmer';
    if(!document.getElementById('policy').contains(document.activeElement)) Object.entries(d.policy).forEach(([k,v])=>{document.querySelector('[name="'+k+'"]').value=v;});
    var body=document.getElementById('participants');body.replaceChildren();
    d.participants.forEach(p=>{
      var row=node('tr'),identity=node('td',p.name);identity.append(node('small',p.email));row.append(identity);
      var light=node('td'),badge=node('span',labels[p.light]);badge.className='traffic '+p.light;light.append(badge,node('small',p.reason));row.append(light);
      row.append(node('td',p.summary?.path||'—'),node('td',p.summary?p.summary.completed+' / '+p.summary.total+' ('+p.summary.percent+'%)':'—'),node('td',p.summary?.accuracy==null?'—':p.summary.accuracy+'%'),node('td',p.summary?.due??'—'));
      var dates=node('td',time(p.activity));dates.append(node('small','Übertragung: '+time(p.updated)));row.append(dates);
      var action=node('td'),button=node('button',p.paused?'Fortsetzen':'Pausieren');button.className='ex-btn';button.onclick=async()=>{try{await api('/api/admin/participants/'+p.id,'PUT',{paused:!p.paused});await refresh();}catch(e){document.getElementById('status').textContent=e.message;}};action.append(button);row.append(action);body.append(row);
    });
  } catch(e){document.getElementById('status').textContent=e.message+' Bitte mit einem Administratorkonto anmelden.';document.getElementById('adminContent').hidden=true;}
}
document.getElementById('refresh').onclick=refresh;
document.getElementById('invite').onclick=async()=>{try{var d=await api('/api/admin/invites','POST',{});var url=location.origin+'/#invite='+d.token;var host=document.getElementById('invitation');host.replaceChildren(node('span','Einmalig nutzbar, sieben Tage gültig: '));var link=node('a',url);link.href=url;host.append(link);}catch(e){document.getElementById('status').textContent=e.message;}};
document.getElementById('policy').onsubmit=async e=>{e.preventDefault();try{var values=Object.fromEntries(new FormData(e.currentTarget));Object.keys(values).forEach(k=>values[k]=Number(values[k]));await api('/api/admin/policy','PUT',values);await refresh();}catch(e){document.getElementById('status').textContent=e.message;}};
refresh();setInterval(refresh,30000);
var assessmentScript=document.createElement('script');assessmentScript.src='/assets/admin-assessments.js';document.body.appendChild(assessmentScript);
