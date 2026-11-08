import fs from 'node:fs';
const file='content/learning-refinements.json',data=JSON.parse(fs.readFileSync(file,'utf8'));
const runtime=JSON.parse(fs.readFileSync('content/quality/php-runtime.json','utf8'));
for(const lesson of data.updates){
  const results=runtime.filter(r=>r.lessonId===lesson.id);
  const text=results.some(r=>r.execution==='passed') ? 'Eigenständiges PHP-Beispiel lokal ausgeführt; weitere Projektfragmente sind separat zu prüfen.' : results.length && results.every(r=>r.lint) ? 'PHP-Blöcke syntaktisch geprüft. Frameworkabhängigkeiten und vollständiger Anwendungsablauf nicht für diese Lektion integriert getestet.' : 'Kein eigenständiges PHP-Programm: Befehls-/Template- oder Projektbeispiel mit separat genannten Voraussetzungen.';
  const note=`<aside class="callout callout-tip" data-quality="runtime"><strong>Prüfstatus:</strong> ${text} Das gemeinsame Laravel-Lernlabor besitzt eigene Tests; es deckt nicht automatisch jeden Codeblock ab.</aside>`;
  lesson.body=lesson.body.replace(/<aside class="callout callout-tip" data-quality="runtime">[\s\S]*?<\/aside>/g,'');
  lesson.body=note+lesson.body;
  lesson.quality={reviewed:true,execution:results.some(r=>r.execution==='passed')?'standalone-passed':results.length?'syntax-checked':'project-template',scope:text};
}
fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
