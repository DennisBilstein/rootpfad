// Prüft content/syntax-glossary/*.mjs und schreibt assets/syntax-glossary-data.js.
// Mit --verify wird zusätzlich jedes Beispiel mit `run` wirklich ausgeführt (node, php, java, sqlite3, git/bash)
// und die Ausgabe mit `out` verglichen. Beispiele ohne `run` werden nicht ausgeführt (HTML, CSS, ABAP, Vue, MariaDB-Besonderheiten).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { loadLessonIds } from './lib/lesson-ids.mjs';

const sourceDir = 'content/syntax-glossary';
const target = 'assets/syntax-glossary-data.js';
const verify = process.argv.includes('--verify');
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='))?.slice(7);

const runners = {
  node: 'Node.js',
  ts: 'Node.js (TypeScript ohne Typprüfung)',
  php: 'PHP',
  java: 'Java',
  sqlite: 'SQLite',
  bash: 'Git',
};
const codeLanguages = new Set(['html', 'css', 'javascript', 'typescript', 'vue', 'php', 'blade', 'java', 'abap', 'sql', 'bash']);

const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.mjs')).sort();
const languages = [];
for (const file of files) languages.push((await import(pathToFileURL(path.resolve(sourceDir, file)).href)).default);
languages.sort((a, b) => a.order - b.order);

const lessonIds = loadLessonIds();
const problems = [];
const seenIds = new Set();
for (const language of languages) {
  const where = language.id;
  for (const key of ['id', 'label', 'order', 'codeLang', 'intro', 'entries']) if (language[key] === undefined) problems.push(`${where}: ${key} fehlt`);
  if (!codeLanguages.has(language.codeLang)) problems.push(`${where}: codeLang ${language.codeLang} unbekannt`);
  for (const entry of language.entries) {
    const label = entry.id ?? `${where}/?`;
    if (!entry.id?.startsWith(`${language.id}-`)) problems.push(`${label}: id muss mit „${language.id}-“ beginnen`);
    if (!/^[a-z0-9-]+$/.test(entry.id ?? '')) problems.push(`${label}: id nur a-z, 0-9 und Bindestrich`);
    if (seenIds.has(entry.id)) problems.push(`${label}: doppelt`);
    seenIds.add(entry.id);
    for (const key of ['cat', 'term', 'syntax', 'text', 'code', 'lesson']) if (!entry[key]) problems.push(`${label}: ${key} fehlt`);
    if (entry.lesson && !lessonIds.has(entry.lesson)) problems.push(`${label}: Lektion ${entry.lesson} unbekannt`);
    if (entry.run && !runners[entry.run]) problems.push(`${label}: run ${entry.run} unbekannt`);
    if (entry.out !== undefined && !entry.run) problems.push(`${label}: out ohne run`);
    if (entry.codeLang && !codeLanguages.has(entry.codeLang)) problems.push(`${label}: codeLang ${entry.codeLang} unbekannt`);
  }
}

const javaImports = 'import java.util.*;\nimport java.util.function.*;\nimport java.util.stream.*;\nimport java.time.*;\n';

function runExample(entry) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rp-glossary-'));
  try {
    const run = (command, args, options = {}) => spawnSync(command, args, { cwd: dir, encoding: 'utf8', timeout: 60000, ...options });
    if (entry.run === 'node' || entry.run === 'ts') {
      const file = path.join(dir, entry.run === 'ts' ? 'example.ts' : 'example.mjs');
      fs.writeFileSync(file, entry.code);
      return run('node', [file]);
    }
    if (entry.run === 'php') {
      const file = path.join(dir, 'example.php');
      fs.writeFileSync(file, entry.code.startsWith('<?php') ? entry.code : `<?php\n${entry.code}`);
      return run('php', ['-d', 'error_reporting=-1', '-d', 'display_errors=stderr', file]);
    }
    if (entry.run === 'java') {
      const file = path.join(dir, 'Main.java');
      const complete = /static void main\(/.test(entry.code);
      fs.writeFileSync(file, complete ? `${javaImports}${entry.code}` : `${javaImports}public class Main {\n public static void main(String[] args) throws Exception {\n${entry.code}\n }\n}\n`);
      return run('java', [file]);
    }
    if (entry.run === 'sqlite') {
      return run('sqlite3', [':memory:', '-separator', ' | '], { input: `${entry.setup ?? ''}\n${entry.code}` });
    }
    if (entry.run === 'bash') {
      // Englische Meldungen und fortlaufende Zeitstempel, damit der Verlauf eindeutig sortiert ist.
      const script = `set -e\nexport LC_ALL=C GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1\ntick=0\ngit() { tick=$((tick+1)); local stamp="2026-01-01T12:00:$(printf %02d $tick)"; GIT_AUTHOR_DATE=$stamp GIT_COMMITTER_DATE=$stamp command git "$@"; }\ngit init -q -b main .\ngit config user.email test@example.com\ngit config user.name Test\n${entry.setup ?? ''}\n${entry.code}\n`;
      return run('bash', ['-c', script]);
    }
    return { status: 1, stdout: '', stderr: `Runner ${entry.run} fehlt` };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const normalize = (text) => text.split('\n').map((line) => line.trimEnd()).join('\n').trim();

let executed = 0;
if (verify) {
  for (const language of languages) {
    for (const entry of language.entries) {
      if (!entry.run || (onlyArg && !entry.id.startsWith(onlyArg))) continue;
      executed++;
      const result = runExample(entry);
      if (result.status !== 0) { problems.push(`${entry.id}: Beendigungscode ${result.status}\n${(result.stderr || '').split('\n').slice(0, 6).join('\n')}`); continue; }
      if (entry.out !== undefined && normalize(result.stdout) !== normalize(entry.out)) {
        problems.push(`${entry.id}: Ausgabe weicht ab\n--- erwartet\n${normalize(entry.out)}\n--- tatsächlich\n${normalize(result.stdout)}`);
      }
    }
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const data = languages.map((language) => ({
  id: language.id,
  label: language.label,
  codeLang: language.codeLang,
  intro: language.intro,
  notice: language.notice ?? '',
  runner: language.runner ? runners[language.runner] : '',
  entries: language.entries.map(({ id, cat, term, syntax, text, setup, code, out, pitfall, lesson, run, codeLang }) => ({
    id, cat, term, syntax, text, setup, code, out, pitfall, lesson, tested: Boolean(run), codeLang,
  })),
}));
fs.writeFileSync(target, `/* Erzeugt von scripts/build-syntax-glossary.mjs aus ${sourceDir}/. Nicht von Hand ändern. */\nvar RP_GLOSSARY=${JSON.stringify(data)};\n`);
const entryCount = data.reduce((sum, language) => sum + language.entries.length, 0);
console.log(`${entryCount} Einträge in ${data.length} Sprachen${verify ? `, ${executed} Beispiele ausgeführt und verglichen` : ''}.`);
