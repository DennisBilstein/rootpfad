// Erzeugt die 30 Java-/Vue-Lektionen (java-m25, java-m26, js-m2, js-m3, js-m4) aus content/java-vue/*.mjs
// und schreibt sie als Module in content/learning-refinements.json. Code-Ausschnitte werden aus den
// getesteten Lab-Dateien gelesen, damit Lektionstext und lauffähiger Code nicht auseinanderlaufen.
import fs from 'node:fs';
import { module as javaModernModule, lessons as javaModernLessons } from '../content/java-vue/java-modern.mjs';
import { module as javaSpringModule, lessons as javaSpringLessons } from '../content/java-vue/java-spring.mjs';
import { module as vueComponentsModule, lessons as vueComponentsLessons } from '../content/java-vue/vue-components.mjs';
import { module as vueDataModule, lessons as vueDataLessons } from '../content/java-vue/vue-data.mjs';
import { module as vueAdvancedModule, lessons as vueAdvancedLessons } from '../content/java-vue/vue-advanced.mjs';

const target = 'content/learning-refinements.json';
const revision = '2026-11-12-java-vue-v1';
const knowledgeAsOf = '2026-11-12';
const exerciseLabels = ['Normalfall', 'Grenzfall', 'Fehlerfall'];
const codeSlots = ['code', 'code2', 'code3'];

const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const paragraphs = (text) => text.split(/\n{2,}/).map((part) => `<p>${escape(part.trim())}</p>`).join('');
const list = (items, tag = 'ul') => `<${tag}>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</${tag}>`;

/** Liest eine Datei und schneidet optional den Bereich from..to (inklusive Zeile von `to`) aus. */
function readCode(spec, lessonId) {
  if (!fs.existsSync(spec.file)) throw new Error(`${lessonId}: Datei fehlt: ${spec.file}`);
  const lines = fs.readFileSync(spec.file, 'utf8').replace(/\s+$/, '').split('\n');
  if (!spec.from) return lines.join('\n');
  const startLine = lines.findIndex((line) => line.includes(spec.from));
  if (startLine < 0) throw new Error(`${lessonId}: Startmarke nicht gefunden: "${spec.from}" in ${spec.file}`);
  const first = Math.max(0, startLine - (spec.back ?? 0));
  const endLine = spec.to ? lines.findIndex((line, index) => index >= startLine && line.includes(spec.to)) : lines.length - 1;
  if (endLine < 0) throw new Error(`${lessonId}: Endmarke nicht gefunden: "${spec.to}" in ${spec.file}`);
  // back/plus holen Zeilen davor/danach dazu (z. B. @Test-Annotation oder schließende Klammern).
  const excerpt = lines.slice(first, endLine + 1 + (spec.plus ?? 0));
  const indent = Math.min(...excerpt.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length));
  return excerpt.map((line) => line.slice(indent)).join('\n');
}

function buildLesson(source) {
  const codes = codeSlots.filter((slot) => source[slot]);
  const files = codes.map((slot) => {
    const spec = source[slot];
    const range = spec.from ? ` (Ausschnitt ab „${escape(spec.from)}“)` : '';
    // <wbr> nach jedem "/" erlaubt Zeilenumbrüche in langen Pfaden (sonst Überlauf auf Smartphones).
    return `<li><code>${escape(spec.file).replace(/\//g, '/<wbr>')}</code>${range}</li>`;
  }).join('');
  const sourceList = `<ul>${source.sources.map((item) =>
    `<li><a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer">${escape(item.title)}</a> – ${escape(item.note)}</li>`).join('')}</ul>`;
  const mistakes = source.mistakes.map((item) =>
    `<li><strong>Falsch:</strong> ${escape(item.wrong)}<br><strong>Warum:</strong> ${escape(item.why)}<br><strong>Besser:</strong> ${escape(item.fix)}</li>`).join('');
  const exercises = source.exercises.map((item, index) => {
    const task = item.task.replace(/^(Grenzfall|Fehlerfall|Normalfall):\s*/, '');
    return `<li><strong>${exerciseLabels[index] ?? 'Transfer'}:</strong> ${escape(task)}<br><em>Abnahme:</em> ${escape(item.acceptance)}</li>`;
  }).join('');

  const body = `<h2>Lernziele</h2>${list(source.objectives)}` +
    `<p><strong>Voraussetzungen:</strong> ${escape(source.prerequisites)}</p>` +
    `<h2>In einfachen Worten</h2>${paragraphs(source.simple)}` +
    `<h2>Schritt für Schritt</h2>${list(source.steps, 'ol')}` +
    (source.background ? `<h2>Hintergrund: Warum ist das so?</h2>${paragraphs(source.background)}` : '') +
    (source.terms?.length ? `<h2>Begriffe auf einen Blick</h2><dl>${source.terms.map((item) => `<dt>${escape(item.term)}</dt><dd>${escape(item.text)}</dd>`).join('')}</dl>` : '') +
    `<h2>Der Code</h2><p>Die Beispiele stammen aus dem getesteten Lab im Projektordner und sind nicht aus fremden Quellen kopiert:</p><ul>${files}</ul>`;
  const body2 = `<h2>Ausgabe und Beleg</h2><pre><code>${escape(source.output)}</code></pre>` +
    `<h2>Typische Fehler</h2><ul>${mistakes}</ul>` +
    `<h2>Praxis</h2>${paragraphs(source.practice)}` +
    `<h2>Drei Übungen</h2><ol>${exercises}</ol>` +
    `<h2>Quellen und Lizenzen</h2>${sourceList}` +
    `<h2>Was geprüft wurde und was nicht</h2>${paragraphs(source.verification)}` +
    `<p class="rail-fuss">Stand: 12.11.2026. Versionen und Verhalten können sich ändern; prüfe die verlinkten Quellen, bevor du in ein Produktivsystem übernimmst.</p>`;

  const sourceUrls = source.sources.map((item) => item.url);
  const lesson = {
    id: source.id, title: source.title, minutes: source.minutes, objectives: source.objectives,
    body, body2, order: source.order ?? ['body', 'code', 'code2', 'code3', 'body2'].filter((key) => key === 'body' || key === 'body2' || codes.includes(key)),
    tip: source.practice, exercises: source.exercises.map((item, index) => ({ level: index + 1, task: item.task, acceptance: item.acceptance })),
    sources: source.sources.map((item) => ({ url: item.url, title: item.title })),
    editorialRevision: knowledgeAsOf, knowledgeAsOf,
    quality: { execution: 'lab-run', scope: source.verification },
    quiz: source.quiz.map((item) => ({
      q: item.q, options: item.options, correct: item.correct, explain: item.explain,
      rationales: item.rationales, sources: sourceUrls, revision,
    })),
  };
  codes.forEach((slot) => {
    lesson[slot] = readCode(source[slot], source.id);
    lesson[`${slot}Lang`] = source[slot].lang;
  });
  return lesson;
}

function validate(lesson) {
  const problems = [];
  if (lesson.quiz.length !== 3) problems.push('Quiz braucht 3 Fragen');
  lesson.quiz.forEach((q, index) => {
    if (q.options.length < 3) problems.push(`Frage ${index}: zu wenige Optionen`);
    if (q.rationales.length !== q.options.length) problems.push(`Frage ${index}: Begründungen ≠ Optionen`);
    if (!Number.isInteger(q.correct) || !q.options[q.correct]) problems.push(`Frage ${index}: correct ungültig`);
  });
  if (lesson.exercises.length !== 3) problems.push('3 Übungen erwartet');
  if (!lesson.sources.length) problems.push('Quellen fehlen');
  if (!lesson.code) problems.push('Code fehlt');
  lesson.exercises.slice(1).forEach((item, index) => {
    if (!item.task.startsWith(exerciseLabels[index + 1])) problems.push(`Übung ${index + 2} beginnt nicht mit „${exerciseLabels[index + 1]}“`);
  });
  if (problems.length) throw new Error(`${lesson.id}: ${problems.join('; ')}`);
}

const groups = [
  [javaModernModule, javaModernLessons], [javaSpringModule, javaSpringLessons],
  [vueComponentsModule, vueComponentsLessons], [vueDataModule, vueDataLessons],
  [vueAdvancedModule, vueAdvancedLessons],
];
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
let total = 0;
for (const [meta, sources] of groups) {
  const lessons = sources.map(buildLesson);
  lessons.forEach(validate);
  const module = { ...meta, lessons };
  const index = data.modules.findIndex((item) => item.id === module.id);
  if (index < 0) data.modules.push(module); else data.modules[index] = module;
  total += lessons.length;
}
fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
console.log(`${total} Java-/Vue-Lektionen in ${groups.length} Modulen vorbereitet (Revision ${revision}).`);
