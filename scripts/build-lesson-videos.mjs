// Prüft content/lesson-videos.json und schreibt assets/lesson-videos-data.js.
// Mit --verify wird zusätzlich jede Video-ID über die YouTube-oEmbed-Schnittstelle geprüft
// (Einbettbarkeit, Titel, Kanal). Das braucht Netz und läuft deshalb nicht im normalen Build.
import fs from 'node:fs';

const source = 'content/lesson-videos.json';
const target = 'assets/lesson-videos-data.js';
const verify = process.argv.includes('--verify');
const data = JSON.parse(fs.readFileSync(source, 'utf8'));

const knownLessons = new Set([...fs.readdirSync('assets/learning'), 'script-01.js']
  .flatMap((name) => [...fs.readFileSync(name === 'script-01.js' ? 'assets/script-01.js' : `assets/learning/${name}`, 'utf8').matchAll(/"id":\s*"((?:[a-z0-9-]+-)?m\d+-(?:l\d+|quellen-[a-z0-9-]+|senior-[a-z0-9-]+))"/g)].map((match) => match[1])));

const problems = [];
const seen = new Set();
for (const video of data.videos) {
  const label = `${video.lessonId}/${video.id}`;
  if (!/^[A-Za-z0-9_-]{11}$/.test(video.id)) problems.push(`${label}: ungültige Video-ID`);
  if (!knownLessons.has(video.lessonId)) problems.push(`${label}: Lektion unbekannt`);
  if (!video.title || !video.channel || !video.note) problems.push(`${label}: title, channel und note sind Pflicht`);
  if (!['en', 'de'].includes(video.language)) problems.push(`${label}: language muss en oder de sein`);
  if (seen.has(label)) problems.push(`${label}: doppelt`);
  seen.add(label);
}

if (verify) {
  for (const video of data.videos) {
    const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${video.id}`)}&format=json`;
    const response = await fetch(url);
    if (!response.ok) { problems.push(`${video.id}: oEmbed antwortet ${response.status} (nicht einbettbar oder entfernt)`); continue; }
    const info = await response.json();
    if (info.title !== video.title) problems.push(`${video.id}: Titel weicht ab („${info.title}“)`);
    if (info.author_name !== video.channel) problems.push(`${video.id}: Kanal weicht ab („${info.author_name}“)`);
  }
}

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const byLesson = {};
for (const { lessonId, id, title, channel, language, note } of data.videos) (byLesson[lessonId] ||= []).push({ id, title, channel, language, note });
fs.writeFileSync(target, `/* Erzeugt von scripts/build-lesson-videos.mjs aus ${source}. Nicht von Hand ändern. */\nvar RP_LESSON_VIDEOS=${JSON.stringify(byLesson)};\n`);
console.log(`${data.videos.length} Videos für ${Object.keys(byLesson).length} Lektionen${verify ? ' (oEmbed geprüft)' : ''}.`);
