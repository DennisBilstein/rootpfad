import fs from 'node:fs';
import { units } from '../content/javascript-curriculum.mjs';
const file='content/learning-refinements.json',data=JSON.parse(fs.readFileSync(file,'utf8'));
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const module=data.modules.find(m=>m.id==='js-m1');
module.title='JavaScript & Vue · Vom Sprachkern zum getesteten Dashboard';
module.partTitle='JavaScript & Vue · Vollständiger Lernpfad';
module.lessons=module.lessons.filter(l=>l.id==='js-m1-l1');
for(const unit of units){
  const source=`<p class="rail-fuss">Quelle: <a href="${unit.source}" target="_blank" rel="noopener noreferrer">${escape(unit.source)}</a>. Versionierte Beispiele im lokalen Lernlabor mit Lockfile. Prüfdetails: content/quality/.</p>`;
  const code=unit.file?fs.readFileSync('content/examples/vue-lab/'+unit.file,'utf8'):unit.code;
  const objectives=[unit.title+' anhand eines konkreten Beispiels erklären','Voraussetzungen und Datenvertrag vor Ausführung prüfen','Den typischen Fehler erkennen und seine Lösung begründen','Drei Aufgaben mit Normal-,Grenz- und Fehlerfall abnehmen'];
  const body=`<h2>Lernziele</h2><ul>${objectives.map(o=>'<li>'+escape(o)+'</li>').join('')}</ul><p><strong>Voraussetzungen:</strong> js-m1-l${unit.n-1}. HTML-/CSS-Grundbegriffe vor dem Vue-Einstieg nachholen. Keine PHP- oder ABAP-Kenntnisse nötig. Die Laufzeit ist jeweils benannt: Node/Browser für Sprachbeispiele, Vite/Vue-Projekt für SFC/TS, Shell für Befehle.</p>${source}<h2>Konzept</h2><p>${escape(unit.concept)}</p>${source}<h2>Warum diese Entscheidung?</h2><p>${escape(unit.why)}</p>${source}<h2>Beispiel und Ausführung</h2><p>${unit.file?'Originaldatei des eigenen Lernlabors: <code>content/examples/vue-lab/'+escape(unit.file)+'</code>. Nicht einzeln als Node-Skript starten; das vollständige Labor mit npm ci, npm test und npm run build verwenden.':'Das folgende eigene Lehrbeispiel in der angegebenen Umgebung ausführen. Aussagen über erwartete Ausgabe vor der Ausführung aufschreiben.'}</p>${source}`;
  const body2=`<h2>Typischer Fehler → professionelle Lösung</h2><p>${escape(unit.mistake)}</p>${source}<h2>Drei Übungen</h2><ol>${unit.exercises.map((e,i)=>'<li><strong>'+['Verstehen','Anwenden','Transfer'][i]+':</strong> '+escape(e)+'</li>').join('')}</ol>${source}<details><summary>Lösungskriterien und Abnahme</summary><p>${escape(unit.accept)}</p></details>${source}<h2>Selbst erklären statt nur wiedererkennen</h2><p>Erkläre die zentrale Entscheidung ohne Codeansicht, verändere einen Eingabewert und sage das Ergebnis voraus. Ein bestandener Multiple-Choice-Test allein beweist keinen Transfer. Wiederhole einen Fehlerfall mit neuen Daten nach Lernabstand.</p>${source}`;
  module.lessons.push({id:'js-m1-l'+unit.n,title:unit.title,minutes:unit.file?40:30,objectives,body,code,codeLang:unit.lang||'JavaScript',body2,order:['body','code','body2'],tip:unit.accept,exercises:unit.exercises.map((task,i)=>({level:i+1,task,acceptance:unit.accept})),sources:[{url:unit.source,title:unit.source}],editorialRevision:'2026-11-06',quiz:[
    {q:unit.q,options:unit.options,correct:unit.correct,explain:unit.concept},
    {q:'Welche konkrete Falle muss in dieser Einheit vermieden werden?',options:[unit.mistake,'Ein grüner Build beweist alle fachlichen und sicherheitsrelevanten Eigenschaften.','Fremde Eingaben sind nach einer Type Assertion immer vertrauenswürdig.'],correct:0,explain:unit.why},
    {q:'Welche Abnahme passt zu diesem Thema?',options:['Nur den Code anschauen, ohne ihn auszuführen oder Fehlerfälle zu prüfen.',unit.accept,'Alle Fehler unterdrücken, damit die Oberfläche ruhig bleibt.'],correct:1,explain:'Die Abnahme muss beobachtbares Verhalten und die ausdrücklich genannten Grenzen prüfen.'}
  ]});
}
fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
console.log('JavaScript/Vue: '+module.lessons.length+' zusammenhängende Einheiten vorbereitet.');
