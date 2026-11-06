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
const target = path.join(root, 'assets/script-01.js');
let script = fs.readFileSync(target, 'utf8');
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
console.log(`Integriert: ${modules.length} Module, ${modules.reduce((n, m) => n + m.lessons.length, 0)} Lektionen, ${exercises.length} Übungen, ${traces.length} Traces, ${extras.length} Zusatzkarten.`);
