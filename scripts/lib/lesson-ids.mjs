// Sammelt alle Lektions-IDs aus den gebauten Lernskripten (assets/learning/*.js und assets/script-01.js).
import fs from 'node:fs';

const idPattern = /"id":\s*"((?:[a-z0-9-]+-)?m\d+-(?:l\d+|quellen-[a-z0-9-]+|senior-[a-z0-9-]+))"/g;

export function loadLessonIds() {
  const files = [...fs.readdirSync('assets/learning').map((name) => `assets/learning/${name}`), 'assets/script-01.js'];
  return new Set(files.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(idPattern)].map((match) => match[1])));
}
