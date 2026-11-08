import fs from 'node:fs';
import {parse} from 'acorn';
import vm from 'node:vm';
const source=fs.readFileSync('assets/script-01.js','utf8');
const ast=parse(source,{ecmaVersion:'latest',sourceType:'script'});
const dir='assets/learning';fs.mkdirSync(dir,{recursive:true});
const files=[];let chunk='',index=0;
function flush(){if(!chunk)return;const name='part-'+String(++index).padStart(2,'0')+'.js';fs.writeFileSync(dir+'/'+name,chunk);files.push('assets/learning/'+name);chunk='';}
let literalNumber=0;
function safe(node){if(!node)return true;if(node.type==='Literal')return !node.regex;if(node.type==='ArrayExpression')return node.elements.every(safe);if(node.type==='ObjectExpression')return node.properties.every(p=>p.type==='Property'&&!p.computed&&p.kind==='init'&&safe(p.value));if(node.type==='UnaryExpression')return node.operator==='-'&&node.argument.type==='Literal'&&typeof node.argument.value==='number';return false;}
function add(text){if(Buffer.byteLength(chunk+text)>250000)flush();chunk+=text;}
for(const statement of ast.body){
 if(statement.type==='VariableDeclaration'&&statement.declarations.length===1&&statement.declarations[0].id.name==='MODULES'){
  add('var MODULES=[];\n');
  for(const element of statement.declarations[0].init.elements)add('MODULES.push('+source.slice(element.start,element.end)+');\n');
  continue;
 }
 const replacements=[];
 function visit(node){
  if(!node||typeof node!=='object')return;
  if((node.type==='ArrayExpression'||node.type==='ObjectExpression')&&node.end-node.start>80000&&safe(node)){
   const name='RP_LITERAL_'+(++literalNumber),json=JSON.stringify(vm.runInNewContext('('+source.slice(node.start,node.end)+')',{}, {timeout:2000}));
   add('var '+name+'_text="";\n');
   for(let i=0;i<json.length;i+=40000)add(name+'_text += '+JSON.stringify(json.slice(i,i+40000))+';\n');
   add('var '+name+'=JSON.parse('+name+'_text);'+name+'_text=null;\n');replacements.push({start:node.start,end:node.end,text:name});return;
  }
   for(const value of Object.values(node)){
    if(Array.isArray(value)){value.forEach(visit);}
    else if(value&&typeof value==='object'){visit(value);}
   }
 }
 visit(statement);let text=source.slice(statement.start,statement.end);for(const r of replacements.sort((a,b)=>b.start-a.start))text=text.slice(0,r.start-statement.start)+r.text+text.slice(r.end-statement.start);add(text+'\n');
}flush();
const hoist=ast.body.filter(node=>node.type==='FunctionDeclaration').map(node=>source.slice(node.start,node.end)).join('\n');
fs.writeFileSync(dir+'/declarations.js',hoist+'\n');
fs.writeFileSync('assets/learning-manifest.json',JSON.stringify({format:1,source:'assets/script-01.js',files:['assets/learning/declarations.js',...files]},null,2)+'\n');
console.log(`${files.length+1} geordnete Lernskripte statt monolithischem Browserabruf; Quellaggregat bleibt für Build/Prüfungen.`);
