import fs from 'node:fs';
const register=JSON.parse(fs.readFileSync('content/quality/quiz-source-register.json','utf8'));
const links=JSON.parse(fs.readFileSync('content/quality/quiz-source-link-checks.json','utf8'));
const checks=new Map(links.results.map(item=>[item.url,item]));
const sources=register.sources.map(source=>({...source,linkCheck:checks.get(source.url)||null,contentReview:'Quellenbezug in Redaktionsnotizen; keine unabhängige menschliche Zweitprüfung.',duePolicy:'2027-02-08 ist eine organisatorische Wiedervorlage, keine Aktualitätsgarantie.'}));
fs.writeFileSync('assets/source-review-data.js','var RP_SOURCE_REVIEW='+JSON.stringify(sources)+';\n');
console.log(sources.length+' Quellen mit transparentem Prüfstatus veröffentlicht.');
