import fs from 'node:fs';
import vm from 'node:vm';
const file='assets/script-01.js';
let script=fs.readFileSync(file,'utf8').replace(/\n\/\* QUIZ-CONTRACTS:START \*\/[\s\S]*?\/\* QUIZ-CONTRACTS:END \*\/\n/g,'');
const ctx={};vm.createContext(ctx);vm.runInContext(script.slice(0,script.indexOf('var VERSION =')),ctx);
const extraMetadata=new Map((ctx.RP_EXTRA_REVISIONS||[]).map(q=>[q.extraId,q]));
const contracts=ctx.CARDS.map(card=>{
  const lesson=ctx.FLAT.find(l=>l.id===card.lessonId);
  const meta=card.id.startsWith('x#')?extraMetadata.get(card.id.split('@')[0]):lesson.quiz.find((q,i)=>ctx.rpQuestionId(lesson,i)===card.id);
  return {
    id:card.id,lessonId:card.lessonId,
    recall:`Beantworte „${card.q}“ zunächst ohne Optionen. Begründe deine Entscheidung im Zusammenhang mit „${card.lessonTitle}“.`,
    criteria:[
      {label:'Fachliche Entscheidung',reference:card.options[card.correct]},
      {label:'Begründung',reference:card.explain},
      {label:'Abgrenzung',reference:'Erkläre anhand der Begründung, welche Annahme einer konkreten anderen Antwort widerspricht. Ist der Widerspruch nicht belegbar, markiere die Frage zur Prüfung.'},
      {label:'Anwendung',reference:`Formuliere zu „${card.lessonTitle}“ einen neuen Fall und ein beobachtbares Soll-Ergebnis. Bei einer reinen Begriffsfrage darf dies eine begründete Zuordnung statt ausführbarem Code sein.`}
    ],
    sources:(meta?.sources||lesson.sources||[]).map(s=>typeof s==='string'?s:s.url).filter(Boolean),
    rationales:meta?.rationales||[],
    editorialStatus:card.id.includes('@2026-11')?'individually-revised':'original-factual-core-not-independently-revalidated'
  };
});
const block=`\n/* QUIZ-CONTRACTS:START */\nvar RP_QUIZ_CONTRACTS=${JSON.stringify(contracts)};\nvar RP_QUIZ_CONTRACT_BY_ID={};RP_QUIZ_CONTRACTS.forEach(function(c){RP_QUIZ_CONTRACT_BY_ID[c.id]=c;});\n/* QUIZ-CONTRACTS:END */\n`;
script=script.replace('var VERSION =',block+'var VERSION =');fs.writeFileSync(file,script);
fs.mkdirSync('content/quality',{recursive:true});
fs.writeFileSync('content/quality/quiz-contract-coverage.json',JSON.stringify({updatedAt:new Date().toISOString(),cards:contracts.length,learningContracts:contracts.length,individuallyRevised:contracts.filter(c=>c.editorialStatus==='individually-revised').length,independentFactualReviewComplete:false,contracts},null,2)+'\n');
console.log(`${contracts.length} aufgabenspezifische Abruf-/Bewertungsverträge erstellt; keine vollständige Fachprüfung behauptet.`);
