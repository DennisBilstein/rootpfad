import fs from 'node:fs';
import {corrections} from '../content/lesson-fact-corrections.mjs';
const file='assets/script-01.js';let script=fs.readFileSync(file,'utf8').replace(/\n\/\* LESSON-FACT-CORRECTIONS:START \*\/[\s\S]*?\/\* LESSON-FACT-CORRECTIONS:END \*\/\n/g,'');
const block=`\n/* LESSON-FACT-CORRECTIONS:START */\nvar RP_FACT_CORRECTIONS=${JSON.stringify(corrections)};\nRP_FACT_CORRECTIONS.forEach(function(item){var l=MODULES.flatMap(function(m){return m.lessons;}).find(function(l){return l.id===item.lesson;});if(!l)throw new Error(item.lesson);l.body='<h2>'+item.title+'</h2>'+item.body+'<p>Primärquelle: <a href="'+item.source+'" target="_blank" rel="noopener noreferrer">'+item.source+'</a> · fachliche Präzisierung 08.11.2026.</p>';l.factRevision='2026-11-08';});\n/* LESSON-FACT-CORRECTIONS:END */\n`;
script=script.replace('MODULES.sort(function(a, b)',block+'MODULES.sort(function(a, b)');fs.writeFileSync(file,script);
console.log(corrections.length+' widersprüchliche Lektionskörper fachlich ersetzt.');
