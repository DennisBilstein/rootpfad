import fs from 'node:fs';
import {questions} from '../content/quiz-transfer.mjs';
const path='assets/script-01.js';let script=fs.readFileSync(path,'utf8');
script=script.replace(/\n\/\* QUIZ-TRANSFER:START \*\/[\s\S]*?\/\* QUIZ-TRANSFER:END \*\/\n/g,'');
const block=`\n/* QUIZ-TRANSFER:START */\nvar RP_TRANSFER = ${JSON.stringify(questions)};\nRP_TRANSFER.forEach(function(item){\n var lesson=MODULES.flatMap(function(m){return m.lessons;}).find(function(l){return l.id===item.lesson;});\n if(!lesson)throw new Error('Transferziel fehlt: '+item.lesson);\n var question=Object.assign({},item);delete question.lesson;\n if(!lesson.quiz.some(function(q){return q.q===question.q;}))lesson.quiz.push(question);\n});\n/* QUIZ-TRANSFER:END */\n`;
script=script.replace('var CARDS = [];',block+'var CARDS = [];');fs.writeFileSync(path,script);
console.log(questions.length+' originale Transferfragen ergänzt; bestehende Frage-IDs nicht verschoben.');
