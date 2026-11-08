import fs from 'node:fs';
import vm from 'node:vm';
const script=fs.readFileSync('assets/script-01.js','utf8'),ctx={};vm.createContext(ctx);vm.runInContext(script.slice(0,script.indexOf('var VERSION =')),ctx);
const findings=[],seen=new Map(),positions={},sourceRegister=new Map();
for(const card of ctx.CARDS){
  const meta=card.id.startsWith('x#')?ctx.RP_EXTRA_REVISIONS.find(q=>q.extraId===card.id.split('@')[0]):ctx.FLAT.find(l=>l.id===card.lessonId).quiz.find((q,i)=>ctx.rpQuestionId(ctx.FLAT.find(l=>l.id===card.lessonId),i)===card.id);
  const normalized=card.q.trim().toLocaleLowerCase();
  if(seen.has(normalized))findings.push({id:card.id,type:'duplicate-stem',other:seen.get(normalized)});else seen.set(normalized,card.id);
  const lengths=card.options.map(x=>x.length),correctLength=lengths[card.correct];
  const others=lengths.filter((x,i)=>i!==card.correct),ratio=correctLength/(others.reduce((a,b)=>a+b,0)/others.length);
  if(ratio>1.8&&correctLength>80)findings.push({id:card.id,type:'correct-option-length-cue',ratio:Number(ratio.toFixed(2))});
  if(!meta?.rationales||meta.rationales.length!==card.options.length)findings.push({id:card.id,type:'missing-specific-rationales'});
  positions[card.options.length]??={};positions[card.options.length][card.correct]=(positions[card.options.length][card.correct]||0)+1;
  for(const value of meta?.sources||[]){const url=typeof value==='string'?value:value.url;if(!url)continue;if(!sourceRegister.has(url))sourceRegister.set(url,{url,questionIds:[],checkedAt:null,checkStatus:'not-content-reviewed-in-this-audit',reviewDue:'2027-02-08',scope:'Fragebezogene Quelle; Erreichbarkeit und fachliche Passung getrennt prüfen.'});sourceRegister.get(url).questionIds.push(card.id);}
}
fs.writeFileSync('content/quality/quiz-style-audit.json',JSON.stringify({generatedAt:new Date().toISOString(),cards:ctx.CARDS.length,positions,findings,meaning:'Automatische Redaktionshinweise, keine empirische Schwierigkeit oder vollständige Fachfreigabe.'},null,2)+'\n');
fs.writeFileSync('content/quality/quiz-source-register.json',JSON.stringify({generatedAt:new Date().toISOString(),policy:'Drei Monate sind eine organisatorische Prüffrist, keine fachliche Aktualitätsgarantie.',sources:[...sourceRegister.values()]},null,2)+'\n');
console.log({cards:ctx.CARDS.length,findings:findings.length,sources:sourceRegister.size,positions});
