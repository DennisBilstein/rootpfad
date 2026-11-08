import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
const data=JSON.parse(fs.readFileSync('content/learning-refinements.json','utf8'));
const php=data.updates, js=data.modules.find(m=>m.course==='javascript').lessons;
const fail=[];
for(const l of [...php,...js]){
  if(l.objectives?.length<4 || !l.body.includes('Lernziele') || !l.body2?.includes('Drei Übungen') || l.quiz?.length<3) fail.push(l.id+':structure');
  if(!l.quiz.every(q=>Number.isInteger(q.correct)&&q.options[q.correct]&&q.explain))fail.push(l.id+':quiz');
}
const source=fs.readFileSync('assets/script-01.js','utf8'),ctx={};vm.createContext(ctx);vm.runInContext(source.slice(0,source.indexOf('var VERSION =')),ctx);
const ids=ctx.FLAT.map(l=>l.id);if(new Set(ids).size!==ids.length)fail.push('duplicate IDs');
const links=[...new Set([...php,...js].flatMap(l=>[...(l.body+' '+l.body2).matchAll(/href="(https:[^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'))))];
const linkStatus=[];
for(let i=0;i<links.length;i+=8){
  await Promise.all(links.slice(i,i+8).map(async url=>{
    try {const response=await fetch(url,{signal:AbortSignal.timeout(25000)});const text=await response.text();linkStatus.push({url,status:response.status,finalURL:response.url,bytes:text.length,checkedAt:new Date().toISOString(),verified:response.ok && text.length>200});}
    catch(e){linkStatus.push({url,verified:false,error:e.message});}
  }));
}
fs.mkdirSync('content/quality',{recursive:true});
fs.writeFileSync('content/quality/sources.json',JSON.stringify(linkStatus,null,2)+'\n');
// A standalone file is executed only for dependency-free beginner examples.
const standaloneIds=new Set(['m52-l1','m52-l2','m52-l3','m52-l4','m52-l5','m42-l2','m42-l3','m42-l4','m53-l1','m53-l2','m53-l3','m53-l4','m55-l1']);
const temp='content/quality/.runtime';fs.mkdirSync(temp,{recursive:true});
const executions=[];
for(const l of php){
  for(const field of ['code','code2','code3','code4']){
    const code=l[field];if(!code || !code.trimStart().startsWith('<?php'))continue;
    const file=path.join(temp,l.id+'-'+field+'.php');fs.writeFileSync(file,code);
    const lint=spawnSync('php',['-l',file],{encoding:'utf8',timeout:10000});
    const result={lessonId:l.id,field,lint:lint.status===0,diagnostic:lint.status===0?null:(lint.stdout+lint.stderr),execution:'not-run'};
    if(lint.status===0&&standaloneIds.has(l.id)){
      const run=spawnSync('php',['-d','display_errors=stderr','-d','error_reporting=-1',file],{encoding:'utf8',timeout:10000});
      result.execution=run.status===0&&!run.stderr?'passed':'needs-review';result.stdout=run.stdout;result.stderr=run.stderr;result.exitCode=run.status;
    }
    executions.push(result);
  }
}
fs.writeFileSync('content/quality/php-runtime.json',JSON.stringify(executions,null,2)+'\n');
const result={phpLessons:php.length,javascriptLessons:js.length,uniqueLessonIds:new Set(ids).size,structureFailures:fail,links:{total:links.length,verified:linkStatus.filter(l=>l.verified).length},php:{blocks:executions.length,syntaxValid:executions.filter(e=>e.lint).length,executed:executions.filter(e=>e.execution==='passed').length}};
fs.writeFileSync('content/quality/summary.json',JSON.stringify(result,null,2)+'\n');console.log(result);
if(fail.length)process.exitCode=1;
