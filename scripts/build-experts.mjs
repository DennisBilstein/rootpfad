import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const upstream = process.env.ROOTPFAD_EXPERT_BUILD || '/private/tmp/claude-501/-Users-dennis/52bdaa74-0d30-4f9b-96cc-dbec22f37bbb/scratchpad/build.mjs';
const cache = path.join(root, 'content/expertenpfade/data.json');
const cached = process.argv.includes('--cached');

if (!cached) {
  // Run the supplied builder for the complete Markdown reference export.
  execFileSync(process.execPath, [upstream, path.dirname(cache)], { stdio: 'inherit' });
  const { load } = await import(path.join(path.dirname(upstream), 'load.mjs'));
  const source = fs.readFileSync(upstream, 'utf8');
  const base = source.match(/const T\s*=\s*'([^']+)'/)[1];
  const artifacts = [...source.matchAll(/dir:'([^']+)', name:'([^']+)', file:T\+'([^']+)'/g)];
  if (!artifacts.length) throw new Error('Keine Expertenpfade im Build-Skript gefunden.');
  const paths = artifacts.map(([, id, title, file]) => ({ id, title, data: load(path.join(base, file)) }));
  fs.writeFileSync(cache, JSON.stringify(paths, null, 2) + '\n');
}

const paths = JSON.parse(fs.readFileSync(cache, 'utf8'));
const supplementFile = path.join(root, 'content/abap-erweiterungen/lessons.json');
if (fs.existsSync(supplementFile)) {
  const escape = value => String(value || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const abap = paths.find(p => p.id === 'abap');
  const additions = JSON.parse(fs.readFileSync(supplementFile,'utf8'));
  const perModule = new Map();
  for (const item of additions) {
    const id = item.moduleId.replace(/^abap-/, '');
    const module = abap.data.MODULES.find(m => m.id === id);
    if (!module) throw new Error(`ABAP-Zielmodul fehlt: ${item.moduleId}`);
    const slug = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const lessonId = `${id}-quellen-${slug}`;
    for (const source of item.sources) if (!/^https:\/\//.test(source.url)) throw new Error('Unsichere Quellen-URL');
    const sources = '<section class="callout"><h3>Kostenlose Originalquellen und Zugang</h3><ul>'+item.sources.map(s => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)}</a><p>${escape(s.access)}</p></li>`).join('')+'</ul><p>Recherche: 06.11.2026. Eigenständige deutsche Zusammenfassung und Aufgaben, keine vollständige Kurskopie. Beispielcode wurde nicht in einem SAP-System kompiliert. Angebote und Systemvoraussetzungen können sich ändern.</p></section>';
    const lesson = { ...item, id:lessonId, body:item.body.split(/\n\s*\n/).map(p => '<p>'+escape(p)+'</p>').join(''), body2:sources,
      order:['body','code','body2'], researchedAt:'2026-11-06' };
    delete lesson.moduleId;
    if (!perModule.has(module)) perModule.set(module, []);
    perModule.get(module).push(lesson);
    const md = `# ${item.title}\n\nModul: ${item.moduleId} · ${item.minutes} Minuten\n\n${item.body}\n\n${item.code ? '```'+(item.codeLang || 'abap')+'\n'+item.code+'\n```\n\n' : ''}## Kontrollfragen\n\n`+item.quiz.map(q => `### ${q.q}\n\n${q.options.map((o,i) => `- [${i===q.correct?'x':' '}] ${o}`).join('\n')}\n\n${q.explain}`).join('\n\n')+'\n\n## Quellen und Zugang\n\n'+item.sources.map(s => `- [${s.title}](${s.url}): ${s.access}`).join('\n')+'\n\nRecherche 06.11.2026. Lehrbeispiele nicht in einem SAP-System ausgeführt.\n';
    fs.writeFileSync(path.join(root,'content/abap-erweiterungen',lessonId+'.md'),md);
  }
  for (const [module, lessons] of perModule) module.lessons.unshift(...lessons);
}
const target = path.join(root, 'assets/script-01.js');
let script = fs.readFileSync(target, 'utf8');
script = script.replace(/\n\/\* LESSON-REFINEMENTS:START \*\/[\s\S]*?\/\* LESSON-REFINEMENTS:END \*\/\n/g,'');
script = script.replace(/\n\/\* QUIZ-TRANSFER:START \*\/[\s\S]*?\/\* QUIZ-TRANSFER:END \*\/\n/g,'');
script = script.replace(/\n\/\* QUIZ-REVISIONS:START \*\/[\s\S]*?\/\* QUIZ-REVISIONS:END \*\/\n/g,'');
script = script.replace(/\n\/\* QUIZ-CONTRACTS:START \*\/[\s\S]*?\/\* QUIZ-CONTRACTS:END \*\/\n/g,'');
script = script.replace(/\n\/\* QUIZ-EXTRA-REVISIONS:START \*\/[\s\S]*?\/\* QUIZ-EXTRA-REVISIONS:END \*\/\n/g,'');
script = script.replace(/\n\/\* LESSON-FACT-CORRECTIONS:START \*\/[\s\S]*?\/\* LESSON-FACT-CORRECTIONS:END \*\/\n/g,'');
// Keep the original export's AP1 pool safe after a fresh HTML import too.
script = script.replace(
  'else pool = pool.filter(function(c){ return ZUSATZ_TEILE.indexOf(c.part) === -1; });',
  'else if(!mode.allPaths) pool = pool.filter(function(c){ return c.part >= 1 && c.part <= 9; });'
);
script = script.replace(/\n\/\* EXPERTS:[\w-]+:START \*\/[\s\S]*?\/\* EXPERTS:[\w-]+:END \*\/\n/g, '');
const original = {};
vm.createContext(original);
vm.runInContext(script.slice(0, script.indexOf('var VERSION =')), original);
let nextPart = Math.max(...original.MODULES.map(m => m.part));
const modules = [], exercises = [], traces = [], extras = [], sheets = [];

for (const course of paths) {
  const { id, title, data } = course;
  const prefix = value => `${id}-${value}`;
  const partMap = new Map([...new Set(data.MODULES.map(m => m.part))].map(p => [p, ++nextPart]));
  for (const module of data.MODULES) {
    modules.push({ ...module, id: prefix(module.id), part: partMap.get(module.part),
      partTitle: `${title.split(' ')[0]} · ${module.partTitle}`, course: id,
      lessons: module.lessons.map(lesson => {
        const result = { ...lesson, id: prefix(lesson.id) };
        for (const key of Object.keys(result).filter(k => /^code\d*$/.test(k))) {
          result[key + 'Lang'] ||= id;
        }
        return result;
      }) });
  }
  exercises.push(...data.EXERCISES.map(e => ({ ...e, id: prefix(e.id),
    title: `${title.split(' ')[0]} · ${e.title}`, topic: `${title.split(' ')[0]} · ${e.topic}`,
    solutionLang: e.solutionLang || id, course: id })));
  traces.push(...data.TRACES.map(t => ({ ...t, id: prefix(t.id), title: `${title.split(' ')[0]} · ${t.title}`, course: id })));
  extras.push(...data.EXTRA_CARDS.map(([lid, ...rest]) => [prefix(lid), ...rest]));
  sheets.push(`<section class="sheet-section" id="spickzettel-${id}"><h2>${title}</h2>${data.CHEATSHEET_HTML}</section>`);
}

function insert(name, anchor, code) {
  if (!script.includes(anchor)) throw new Error(`Integrationsstelle fehlt: ${anchor}`);
  script = script.replace(anchor, `\n/* EXPERTS:${name}:START */\n${code}\n/* EXPERTS:${name}:END */\n${anchor}`);
}
insert('modules', 'MODULES.sort(function(a, b)',
  `MODULES.push.apply(MODULES, ${JSON.stringify(modules)});\nEXERCISES.push.apply(EXERCISES, ${JSON.stringify(exercises)});\nCHEATSHEET_HTML += ${JSON.stringify(sheets.join('\n'))};`);
insert('traces', 'var CARDS = [];', `TRACES.push.apply(TRACES, ${JSON.stringify(traces)});`);
insert('cards', 'EXTRA_CARDS.forEach(function(row, idx)', `EXTRA_CARDS.push.apply(EXTRA_CARDS, ${JSON.stringify(extras)});`);
fs.writeFileSync(target, script);
if(fs.existsSync(path.join(root,'content/learning-refinements.json'))) execFileSync(process.execPath,[path.join(root,'scripts/build-learning-content.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[path.join(root,'scripts/build-lesson-fact-corrections.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[path.join(root,'scripts/build-application-supplements.mjs')],{stdio:'inherit'});
if(fs.existsSync(path.join(root,'content/quiz-transfer.mjs'))) execFileSync(process.execPath,[path.join(root,'scripts/build-quiz-transfer.mjs')],{stdio:'inherit'});
if(fs.existsSync(path.join(root,'content/quiz-revisions.mjs'))) execFileSync(process.execPath,[path.join(root,'scripts/build-quiz-revisions.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[path.join(root,'scripts/build-quiz-learning-contracts.mjs')],{stdio:'inherit'});
execFileSync(process.execPath,[path.join(root,'scripts/build-module-assessments.mjs')],{stdio:'inherit'});
if(fs.existsSync(path.join(root,'content/quality/quiz-source-link-checks.json'))) {
  execFileSync(process.execPath,[path.join(root,'scripts/audit-quiz-editorial.mjs')],{stdio:'inherit'});
  execFileSync(process.execPath,[path.join(root,'scripts/build-source-status.mjs')],{stdio:'inherit'});
}
console.log(`Integriert: ${modules.length} Module, ${modules.reduce((n, m) => n + m.lessons.length, 0)} Lektionen, ${exercises.length} Übungen, ${traces.length} Traces, ${extras.length} Zusatzkarten.`);
execFileSync(process.execPath,[path.join(root,'scripts/split-learning-bundle.mjs')],{stdio:'inherit'});
