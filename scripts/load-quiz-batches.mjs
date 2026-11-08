import fs from 'node:fs';
import {existingQuizRevisions} from '../content/abap-senior-curriculum.mjs';

export function loadQuizBatches() {
  const lessons = [], extras = [], status = [];
  for (const name of ['ap1a','ap1b','php','abap','java','web']) {
    const inputPath = `content/quiz-batches/${name}-input.json`;
    const outputPath = `content/quiz-batches/${name}-revised.json`;
    const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    if (!fs.existsSync(outputPath)) { status.push({name, expected:input.length, integrated:0}); continue; }
    const output = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    if (!Array.isArray(output)) throw new Error(`${name}: array required`);
    const identity = q => q.extraId || `${q.lesson}#${q.index}`;
    const expected = new Map(input.map(q => [identity(q),q]));
    const seen = new Set();
    for (const q of output) {
      const key = identity(q), original = expected.get(key);
      if (!original || seen.has(key) || original.lesson !== q.lesson) throw new Error(`${name}: invalid identity ${key}`);
      if (!q.q || q.options.length < 3 || !Number.isInteger(q.correct) || !q.options[q.correct] || !q.explain || q.rationales.length !== q.options.length || !q.sources?.length || !q.revision) throw new Error(`${name}: invalid question ${key}`);
      seen.add(key);
    }
    // Never integrate a partial batch as if it were a completed editorial unit.
    if (output.length !== input.length) { status.push({name, expected:input.length, saved:output.length, integrated:0}); continue; }
    for (const q of output) (q.extraId ? extras : lessons).push(q);
    status.push({name, expected:input.length, integrated:output.length});
  }
  // Preserve historical batch inputs while replacing only explicitly revised
  // positions. New revision IDs keep earlier evidence without reusing it.
  for(const revision of existingQuizRevisions){
    const index=lessons.findIndex(q=>q.lesson===revision.lesson&&q.index===revision.index);
    if(index<0)throw Error('ABAP-Quizrevision ohne historische Position: '+revision.lesson);
    lessons[index]=revision;
  }
  return {lessons, extras, status};
}
