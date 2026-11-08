import fs from 'node:fs';
const path='content/quality/quiz-source-register.json';
const register=JSON.parse(fs.readFileSync(path,'utf8'));
const previous=fs.existsSync('content/quality/quiz-source-link-checks.json')?JSON.parse(fs.readFileSync('content/quality/quiz-source-link-checks.json','utf8')).results:[];
const existing=new Map(previous.filter(r=>r.reachable).map(r=>[r.url,r]));
const results=register.sources.filter(s=>existing.has(s.url)).map(s=>existing.get(s.url));
const pending=register.sources.filter(s=>!existing.has(s.url));
for(let index=0;index<pending.length;index+=10){
 await Promise.all(pending.slice(index,index+10).map(async source=>{
  try{const response=await fetch(source.url,{signal:AbortSignal.timeout(15000)});const text=await response.text();results.push({url:source.url,status:response.status,finalURL:response.url,bytes:text.length,reachable:response.ok,checkedAt:new Date().toISOString(),contentReviewed:false});}
  catch(error){results.push({url:source.url,reachable:false,error:error.message,checkedAt:new Date().toISOString(),contentReviewed:false});}
 }));
 // Persist each completed chunk, so restart does not destroy evidence.
 fs.writeFileSync('content/quality/quiz-source-link-checks.json',JSON.stringify({total:register.sources.length,checked:results.length,results},null,2)+'\n');
}
console.log({total:register.sources.length,reachable:results.filter(r=>r.reachable).length,unreachable:results.filter(r=>!r.reachable).length});
