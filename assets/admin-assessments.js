async function refreshAssessments(){
  const host=document.getElementById('assessmentRows');
  try{
    const data=await api('/api/admin/assessments');host.replaceChildren();
    if(!data.submissions.length)host.append(node('p','Noch keine praktischen Arbeiten eingereicht.'));
    for(const item of data.submissions){
      const section=node('section');section.className='callout';section.append(node('h3',item.name+' · '+item.moduleId),node('p','Status: '+item.status));
      for(const [key,label]of [['normal','Normalfall'],['boundary','Grenzfall'],['failure','Fehlerfall'],['evidence','Nachweise'],['help','Hilfen/offene Grenzen']]){const details=node('details');details.append(node('summary',label),node('p',item[key]));section.append(details);}
      const form=node('form'),label=node('label','Prüfrückmeldung'),input=node('textarea');input.className='tutor-input';input.required=true;input.maxLength=2000;input.value=item.reviewNote||'';label.append(input);form.append(label);
      const select=node('select');select.setAttribute('aria-label','Prüfergebnis');for(const [value,text]of [['revise','Überarbeitung nötig'],['accepted','Praktisch abgenommen']]){const option=node('option',text);option.value=value;select.append(option);}form.append(select);
      const button=node('button','Prüfergebnis speichern');button.className='check-btn';form.append(button);
      form.onsubmit=async event=>{event.preventDefault();button.disabled=true;try{await api('/api/admin/assessments/'+item.userId+'/'+encodeURIComponent(item.moduleId),'PUT',{status:select.value,note:input.value,submittedAt:item.ts});await refreshAssessments();}catch(e){document.getElementById('status').textContent=e.message;button.disabled=false;}};
      section.append(form);host.append(section);
    }
  }catch(e){host.replaceChildren(node('p',e.message));}
}
const assessmentHost=node('section');assessmentHost.id='practicalAssessments';assessmentHost.append(node('h2','Praktische Modulabnahmen'),node('p','Manuelle Inhaltsprüfung erforderlich. Nicht allein aufgrund eines ausgefüllten Formulars freigeben. Die bestehende Ampel bleibt eine Aktivitäts-/Bearbeitungsampel.'));
const assessmentRows=node('div');assessmentRows.id='assessmentRows';assessmentHost.append(assessmentRows);document.getElementById('adminContent').append(assessmentHost);
refreshAssessments();setInterval(refreshAssessments,30000);
async function refreshQuestionQuality(){
  var host=document.getElementById('questionQuality');if(!host){host=node('section');host.id='questionQuality';host.className='callout';document.getElementById('adminContent').append(host);}
  try{var data=await api('/api/admin/question-quality');host.replaceChildren(node('h2','Fragenqualität und Unklarheitsmeldungen'),node('p',data.note));
    for(const item of data.items){host.append(node('p',item.cardId+' · '+item.participants+' Erstversuche · '+(item.rate===null?'Quote noch nicht belastbar ausweisen':item.rate+'% richtig')+' · '+item.status));}
    if(!data.items.length)host.append(node('p','Noch keine revisionsbezogenen Erstversuchsdaten.'));
    for(const feedback of data.feedback){const details=node('details');details.append(node('summary',feedback.cardId+' · Unklarheit gemeldet'),node('p',feedback.note));host.append(details);}
  }catch(error){host.replaceChildren(node('p',error.message));}
}
refreshQuestionQuality();setInterval(refreshQuestionQuality,30000);
