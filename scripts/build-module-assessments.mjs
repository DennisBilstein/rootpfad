import fs from 'node:fs';
import vm from 'node:vm';
const s=fs.readFileSync('assets/script-01.js','utf8'),c={};vm.createContext(c);vm.runInContext(s.slice(0,s.indexOf('var VERSION =')),c);
let assignments=c.MODULES.map(m=>{
  // Existing course exercise is preferred. A lesson's own transfer exercise is
  // acceptable as a draft; neither is misrepresented as an executed assessment.
  const lesson=m.lessons.find(l=>l.exercises?.length>=3)||m.lessons.find(l=>l.code)||m.lessons[0];
  const transfer=lesson.exercises?.[2];
  return {id:m.id+'@assessment-v1',moduleId:m.id,title:m.title,lessonId:lesson.id,
    status:'manual-review-required',editorialStatus:transfer?'lesson-transfer-adapted':'draft-needs-topic-rubric',
    brief:transfer?.task||`Erstelle zu „${lesson.title}“ ein eigenes Arbeitsprodukt: bei Code eine kleine ausführbare Variante, bei Planung ein nachvollziehbares Modell mit Rechenweg bzw. begründeten Entscheidungen. Nutze das Lektionsbeispiel nur als Ausgangspunkt, nicht als fertigen Nachweis.`,
    acceptance:transfer?.acceptance||lesson.tip?.replace(/<[^>]*>/g,' ')||'Begründe jede Entscheidung mit den in der Lektion erklärten Regeln und benenne nicht überprüfte Annahmen.',
    cases:[{kind:'Normalfall',request:'Dokumentiere passende Eingaben, erwartetes Ergebnis und tatsächlich beobachtetes Ergebnis.'},{kind:'Grenzfall',request:'Wähle eine fachlich relevante Grenze und erkläre, warum sie die Entscheidung verändert oder bestätigt.'},{kind:'Fehlerfall',request:'Provoziere eine ungültige Eingabe oder verletzte Annahme; zeige die kontrollierte Behandlung.'}],
    evidence:'Textprotokoll mit Befehlen/Testfällen/Ergebnissen oder Verweis auf ein freigegebenes Arbeitsartefakt. Keine Geheimnisse, Kundendaten oder öffentlichen Uploads nötig.',
    rubric:['Fachlich passender Vertrag und klare Voraussetzungen','Normal-,Grenz- und Fehlerfall mit Soll/Ist','Nachvollziehbares Arbeitsprodukt statt bloßer Auswahlantwort','Eigene Begründung, benutzte Hilfen und verbleibende Grenzen'],revision:'assessment-v1'};
});
const authored=['content/assessments-ap1.json','content/assessments-backend.json','content/assessments-java-web.json','content/assessments-java-vue.json'].filter(file=>fs.existsSync(file)).flatMap(file=>JSON.parse(fs.readFileSync(file,'utf8')));
const authoredMap=new Map();
for(const item of authored){
 if(authoredMap.has(item.moduleId)||!c.MODULES.some(m=>m.id===item.moduleId)||item.rubric?.length!==4||!['normal','boundary','failure'].every(k=>item[k]?.input&&item[k]?.expected)||!item.sources?.length)throw Error('Ungültige Abnahme: '+item.moduleId);
 authoredMap.set(item.moduleId,item);
}
assignments=assignments.map(draft=>{
 const item=authoredMap.get(draft.moduleId);if(!item)return draft;
 return {...draft,id:item.moduleId+'@'+item.revision,title:item.title,brief:item.brief,revision:item.revision,editorialStatus:'individually-authored-manual',acceptance:'Prüfe die unten konkret benannten Soll-Ergebnisse und vier modulspezifischen Kriterien.',cases:[{kind:'Normalfall',request:item.normal.input,expected:item.normal.expected},{kind:'Grenzfall',request:item.boundary.input,expected:item.boundary.expected},{kind:'Fehlerfall',request:item.failure.input,expected:item.failure.expected}],rubric:item.rubric,sources:item.sources};
});
fs.writeFileSync('assets/module-assessments-data.js','var RP_MODULE_ASSESSMENTS='+JSON.stringify(assignments)+';\n');
fs.writeFileSync('content/quality/module-assessment-coverage.json',JSON.stringify({modules:assignments.length,manualAssignments:assignments.length,individuallyAuthored:authoredMap.size,fullyIndependentRubrics:0,drafts:assignments.filter(a=>a.editorialStatus!=='individually-authored-manual').length,execution:'not-executed-manual-review-required',assignments},null,2)+'\n');
console.log(assignments.length+' manuelle Modul-Abnahmeaufträge, Entwurfsstatus sichtbar.');
