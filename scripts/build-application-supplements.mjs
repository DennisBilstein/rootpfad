import fs from 'node:fs';
import {supplements} from '../content/application-supplements.mjs';
const file='assets/script-01.js';
let script=fs.readFileSync(file,'utf8').replace(/\n\/\* APPLICATION-SUPPLEMENTS:START \*\/[\s\S]*?\/\* APPLICATION-SUPPLEMENTS:END \*\/\n/g,'');
const code=`\n/* APPLICATION-SUPPLEMENTS:START */\nvar RP_APPLICATION_SUPPLEMENTS=${JSON.stringify(supplements)};\nRP_APPLICATION_SUPPLEMENTS.forEach(function(item){var lesson=MODULES.flatMap(function(m){return m.lessons;}).find(function(l){return l.id===item.id;});if(!lesson)throw Error('Vertiefungslektion fehlt: '+item.id);lesson.body2=(lesson.body2||'')+'<section class="callout"><h3>'+item.title+'</h3>'+item.html+'<p>Quelle: <a href="'+item.source+'" target="_blank" rel="noopener noreferrer">Fachreferenz</a> · Redaktion 08.11.2026</p></section>';});\n/* APPLICATION-SUPPLEMENTS:END */\n`;
script=script.replace('MODULES.sort(function(a, b)',code+'MODULES.sort(function(a, b)');fs.writeFileSync(file,script);
console.log('3 additive Fachvertiefungen: SSRF, HTTP Caching, Transactional Outbox.');
