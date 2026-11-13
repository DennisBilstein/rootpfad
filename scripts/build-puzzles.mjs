// Prüft content/puzzles.json und schreibt assets/practice-puzzles-data.js.
// Mit --verify werden die Java-Aufgaben zusätzlich mit javac geprüft: Bei 'bug' muss der Compiler genau die
// angegebene Zeile bemängeln, bei 'order' muss die richtige Reihenfolge übersetzen. Das braucht ein JDK.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const source = 'content/puzzles.json';
const target = 'assets/practice-puzzles-data.js';
const verify = process.argv.includes('--verify');
const data = JSON.parse(fs.readFileSync(source, 'utf8'));

const lessonFiles = [...fs.readdirSync('assets/learning').map((name) => `assets/learning/${name}`), 'assets/script-01.js', 'content/learning-refinements.json'];
const lessonIds = new Set(lessonFiles.flatMap((file) =>
  [...fs.readFileSync(file, 'utf8').matchAll(/"id":\s*"([a-z0-9-]+-l\d+)"/g)].map((match) => match[1])));

const problems = [];
const ids = new Set();
for (const puzzle of data.puzzles) {
  const label = puzzle.id;
  if (!/^[a-z0-9-]+$/.test(label)) problems.push(`${label}: id nur a-z, 0-9 und Bindestrich`);
  if (ids.has(label)) problems.push(`${label}: doppelt`);
  ids.add(label);
  if (!lessonIds.has(puzzle.lessonId)) problems.push(`${label}: Lektion ${puzzle.lessonId} unbekannt`);
  if (!['bug', 'order'].includes(puzzle.type)) problems.push(`${label}: type muss bug oder order sein`);
  for (const field of ['title', 'task', 'language', 'explanation', 'verified']) if (!puzzle[field]) problems.push(`${label}: ${field} fehlt`);
  if (!Array.isArray(puzzle.lines) || puzzle.lines.length < 4) problems.push(`${label}: mindestens 4 Zeilen`);
  if (puzzle.type === 'bug') {
    if (!Number.isInteger(puzzle.bugLine) || !puzzle.lines[puzzle.bugLine]) problems.push(`${label}: bugLine ungültig`);
    if (!puzzle.hint) problems.push(`${label}: hint fehlt`);
  } else {
    const scramble = puzzle.scramble ?? [];
    const sorted = [...scramble].sort((a, b) => a - b);
    if (sorted.length !== puzzle.lines.length || sorted.some((value, index) => value !== index)) problems.push(`${label}: scramble ist keine Permutation`);
    if (scramble.every((value, index) => value === index)) problems.push(`${label}: scramble ist die Lösung`);
    if (new Set(puzzle.lines).size !== puzzle.lines.length) problems.push(`${label}: Zeilen müssen verschieden sein (sonst mehrdeutig)`);
  }
}

if (verify) {
  const javac = spawnSync('javac', ['-version'], { encoding: 'utf8' });
  if (javac.error) problems.push('javac nicht gefunden: Java-Aufgaben konnten nicht geprüft werden');
  else for (const puzzle of data.puzzles.filter((item) => item.language === 'Java')) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rp-puzzle-'));
    const file = path.join(dir, 'Puzzle.java');
    const lines = puzzle.lines;
    fs.writeFileSync(file, `public class Puzzle {\n${lines.map((line) => `  ${line}`).join('\n')}\n}\n`);
    const run = spawnSync('javac', ['-encoding', 'UTF-8', '-J-Duser.language=en', file], { encoding: 'utf8' });
    if (puzzle.type === 'order') {
      if (run.status !== 0) problems.push(`${puzzle.id}: richtige Reihenfolge übersetzt nicht\n${run.stderr}`);
    } else {
      const match = run.stderr.match(/Puzzle\.java:(\d+): error/);
      if (run.status === 0 || !match) problems.push(`${puzzle.id}: Compiler meldet keinen Fehler`);
      else if (Number(match[1]) !== puzzle.bugLine + 2) problems.push(`${puzzle.id}: Fehler in Zeile ${Number(match[1]) - 2}, erwartet ${puzzle.bugLine}`);
    }
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const byLesson = {};
for (const puzzle of data.puzzles) {
  const { lessonId, ...rest } = puzzle;
  (byLesson[lessonId] ||= []).push(rest);
}
fs.writeFileSync(target, `/* Erzeugt von scripts/build-puzzles.mjs aus ${source}. Nicht von Hand ändern. */\nvar RP_PUZZLES=${JSON.stringify(byLesson)};\n`);
console.log(`${data.puzzles.length} Denkaufgaben für ${Object.keys(byLesson).length} Lektionen${verify ? ' (Java mit javac geprüft)' : ''}.`);
