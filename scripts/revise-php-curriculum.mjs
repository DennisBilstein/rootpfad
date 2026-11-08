import fs from 'node:fs';
import { rows } from '../content/php-review/editorial-plan.mjs';
import { codeCorrections } from '../content/php-review/code-corrections.mjs';
const file='content/learning-refinements.json';
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const baseline=JSON.parse(fs.readFileSync('content/php-review/baseline.json','utf8'));
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const php='https://www.php.net/manual/en/';
const laravel='https://laravel.com/framework/docs/13.x/';
const chapters={m52:['features.commandline.options.php','language.types.string.php','language.types.float.php','language.types.boolean.php','language.control-structures.php'],m42:['features.commandline.php','language.types.declarations.php','language.types.array.php','functions.anonymous.php'],m53:['language.types.array.php','array.sorting.php','ref.strings.php','class.datetimeimmutable.php'],m43:['function.htmlspecialchars.php','session.security.php','pdo.prepared-statements.php'],m54:['ref.filesystem.php','function.json-decode.php','book.curl.php','language.exceptions.php'],m44:['language.oop5.php','language.oop5.interfaces.php','language.enumerations.php','language.namespaces.php'],m55:['language.generators.php','language.oop5.interfaces.php','migration85.php','language.oop5.decon.php'],m45:['installation','lifecycle','blade'],m46:['migrations','eloquent','eloquent-relationships','eloquent-relationships'],m47:['validation','authentication','authorization'],m56:['blade','vite','https://livewire.laravel.com/docs/4.x/components','validation'],m57:['filesystem','mail','notifications'],m58:['queries','eloquent-mutators','eloquent-relationships','eloquent'],m48:['eloquent-resources','sanctum','rate-limiting'],m49:['container','providers','events','database'],m59:['http-client','https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html','scout','broadcasting'],m50:['queues','cache','database','scheduling'],m51:['testing','mocking','https://laravel.com/framework/docs/13.x/pint','deployment'],m60:['https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html','logging','authorization','deployment']};
function sourcesFor(l){
  const index=Number(l.id.split('-l')[1])-1;
  const chapter=chapters[l.moduleId]?.[index];
  if(!chapter) throw Error('Quelle fehlt: '+l.id);
  const base=Number(l.moduleId.slice(1))<=44 || ['m52','m53','m54','m55'].includes(l.moduleId) ? php : laravel;
  const urls=[chapter.startsWith('https:')?chapter:base+chapter];
  if(l.id==='m44-l4') urls.push('https://getcomposer.org/doc/01-basic-usage.md','https://www.php-fig.org/psr/psr-4/');
  if(['m45-l2','m47-l2'].includes(l.id)) urls.push(laravel+'middleware');
  if(['m48-l1','m48-l2'].includes(l.id)) urls.push(laravel+'sanctum');
  if(['m46-l2','m47-l1'].includes(l.id)) urls.push(laravel+'authorization');
  return urls;
}
const fixes={
  'm45-l1':[['Laravel</strong> ist das verbreitetste PHP-Framework.','Laravel</strong> ist ein PHP-Webframework.']],
  'm45-l2':[['Der Request passiert die <strong>globale Middleware</strong> (Session, CSRF, Wartungsmodus …).','Der Request passiert globale Middleware, etwa den Wartungsmodus. Session und Request-Forgery-Schutz gehören im Standard zur <strong>web-Middlewaregruppe</strong>; zusätzliche Routen-Middleware folgen passend zur Route.']],
  'm46-l2':[['<strong>Mass Assignment</strong>:','<strong>Mass Assignment</strong>:'],['<code>Produkt::create($request-&gt;all())</code> würde jedes Feld übernehmen, das ein Angreifer mitschickt – etwa <code>ist_admin</code>.','<code>Produkt::create($request-&gt;all())</code> unterliegt der Feldfreigabe des Models; bei zu breiter Freigabe können unerwünschte Felder wie <code>ist_admin</code> geschrieben werden.'],['Am sichersten ist <code>$request-&gt;validated()</code>.','Verwende nur fachlich erlaubte validierte Felder, eine passende Model-Freigabe und zusätzlich Autorisierung; <code>validated()</code> allein ist keine Berechtigungsprüfung.']],
  'm48-l1':[['(Präfix <code>/api</code>, keine Session, kein CSRF)','(Präfix <code>/api</code>, standardmäßig API-Gruppe; Sanctum-SPA kann Session/CSRF ergänzen)'],['Sonst landet jede neue Datenbankspalte automatisch in der API – auch <code>passwort_hash</code> oder interne Notizen.','Direkte Model-Serialisierung hängt unter anderem von hidden/visible ab und kann unbeabsichtigt neue Felder veröffentlichen.'],['Für sehr große Tabellen ist <code>cursorPaginate()</code> schneller, weil es kein <code>OFFSET</code> braucht.','<code>cursorPaginate()</code> kann bei geeigneter stabiler Sortierung und Indizes Vorteile haben; messe den konkreten Zugriff.']],
  'm48-l2':[['ohne Token im JavaScript, das durch XSS gestohlen werden könnte.','ohne langlebiges Bearer-Token im JavaScript. XSS kann trotzdem Aktionen im Namen des Benutzers ausführen.']],
  'm59-l2':[['deshalb ist die Signatur die einzige Sicherung.','deshalb braucht der Endpunkt eine korrekt implementierte Anbietersignatur, Freshness-/Replay-Schutz, Größenlimits, Deduplizierung und sichere Verarbeitung.']],
  'm49-l1':[['<code>singleton()</code> eins pro Anwendung bzw. Request','<code>singleton()</code> eins pro Containerinstanz (in langlebigen Prozessen requestübergreifend)']],
  'm51-l1':[['Neue Projekte nutzen standardmäßig <strong>Pest</strong>','Je nach Installer-Auswahl nutzen Projekte <strong>Pest oder PHPUnit</strong>']],
  'm50-l3':[['oft doppelte Geschwindigkeit','Nutzen anhand eigener Messungen bestimmen'],['mit konstantem Speicher','mit begrenztem Speicher für die geladenen Datensätze']],
};
for(const plan of rows){
  const original=baseline.find(l=>l.id===plan.id); if(!original)throw Error(plan.id);
  const urls=sourcesFor(original);
  for(let i=0;i<urls.length;i++) urls[i]=urls[i].replace('language.exceptions.php','language.error-handling.php');
  const citation='<p class="rail-fuss">Quellen: '+urls.map(url=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(new URL(url).hostname+new URL(url).pathname)}</a>`).join(' · ')+'</p>';
  let body=original.body;
  for(const [before,after] of fixes[plan.id]||[])body=body.split(before).join(after);
  // Attach a citation to every existing paragraph/table and added editorial section.
  body=body.replace(/<\/p>|<\/table>/g,match=>match+citation);
  const prerequisite=Number(original.id.split('-l')[1])>1 ? original.id.replace(/\d+$/,n=>String(Number(n)-1)) : null;
  const intro=`<h2>Lernziele</h2><ul><li>${escape(plan.outcome)}</li><li>Das Beispiel schrittweise erklären und seine Voraussetzungen benennen.</li><li>Den beschriebenen Fehler reproduzieren und mit einer begründeten Lösung abfangen.</li><li>Ergebnis und Grenzen mit drei abgestuften Aufgaben überprüfen.</li></ul><p><strong>Voraussetzungen:</strong> ${prerequisite?escape(prerequisite)+' sowie die Begriffe des Modul-Einstiegs.':'Die Grundlagen der vorangehenden Kursmodule; bei Anfängermodulen reichen Editor und PHP-CLI.'} Zielbasis: PHP 8.5 und für Framework-Beispiele Laravel 13. Jede Paket-/Livewire-Abhängigkeit ist vor Ausführung separat zu installieren. Keine Produktionssysteme für Übungen verwenden.</p>${citation}`;
  const decisions=`<h2>Entscheidungswissen: Warum diese Lösung?</h2><p>${escape(plan.reason)}</p>${citation}<h2>Typischer Fehler → professionelle Lösung</h2><p>${escape(plan.mistake)}</p>${citation}`;
  const exerciseHtml='<h2>Drei Übungen</h2><ol>'+plan.exercises.map((task,i)=>`<li><strong>${['Verstehen','Anwenden','Transfer'][i]}:</strong> ${escape(task)}</li>`).join('')+'</ol>'+citation+`<details><summary>Lösungskriterien nach eigener Bearbeitung</summary><p>${escape(plan.acceptance)}</p></details>${citation}`;
  const runtime=original.codeLang==='PHP' || original.codeLang==='php' ? 'Der Codeblock ist ein Lehrbeispiel; Framework-/Projektfragmente benötigen die darin referenzierten Klassen, Imports, Schema und Konfiguration. Ein bestandener Syntaxcheck allein ist kein Integrationstest.' : 'Befehle und Konfigurationsauszüge sind Lehrvorlagen. Pfade und Werte auf ein isoliertes lokales Projekt anpassen; keine Produktionsdeployments oder Löschbefehle blind ausführen.';
  const supplement=`<h2>Ausführung und Abnahme</h2><p>${runtime} Zu jeder Aufgabe gehören ein Normalfall, ein Grenzfall und ein Fehlerfall. Der maschinenlesbare Prüfstatus und das Quellenprotokoll liegen in content/quality/. Nicht ausgeführte Beispiele sind nicht als getestet zu verstehen.</p>${citation}${decisions}${exerciseHtml}<h2>Weiterlernen und Wiederholung</h2><p>Erkläre die Entscheidung ohne die Lösung anzusehen. Wiederhole die schwierigste Aufgabe mit veränderten Daten nach mindestens drei Tagen. Für das Mini-Shop-Projekt übernimm nur verstandene Bausteine, keine ungeprüften Kopien.</p>${citation}`;
  const lesson={...original,minutes:Math.max(original.minutes,25),body:intro+body,body2:(original.body2||'')+supplement,order:original.order||['body','code','code2','code3','code4','body2'],objectives:[plan.outcome,'Voraussetzungen und Ablauf des Beispiels erläutern','Typischen Fehler begründet beheben','Ergebnis durch Normal-, Grenz- und Fehlerfall prüfen'],sources:urls.map(url=>({url,title:url})),exercises:plan.exercises.map((task,i)=>({level:i+1,task,acceptance:plan.acceptance})),editorialRevision:'2026-11-06',quality:{reviewed:true,execution:'not-run',scope:'topic-specific editorial revision; runtime status tracked separately'}};
  delete lesson.moduleId;
  // Safety corrections in executable teaching fragments, not just prose.
  if(plan.id==='m52-l3'){
    lesson.code=lesson.code.replace('$bruttoCent = (int) round($nettoCent * 1.19);','$bruttoCent = $nettoCent + intdiv($nettoCent * 19 + 50, 100);');
    lesson.body=lesson.body.replace('in <strong>Cent als int</strong> rechnen und erst bei der Ausgabe formatieren.','in <strong>Cent als int</strong> speichern und die Rundungsregel explizit festlegen. Das Beispiel rundet bei nichtnegativen kleinen Beträgen die Steuer auf die Nettosumme ganzzahlig auf den nächsten Cent; Overflow und andere Rundungsregeln erfordern weitere Prüfung.');
  }
  if(plan.id==='m48-l2')lesson.code=lesson.code.replace('$request->user()->currentAccessToken()->delete();',"// Nur im Bearer-Token-Flow, nicht fuer SPA-Sessionlogout:\n$token = $request->user()->currentAccessToken();\nif ($token instanceof \\Laravel\\Sanctum\\PersonalAccessToken) {\n    $token->delete();\n}");
  if(plan.id==='m50-l1')lesson.code=lesson.code.replace('// idempotent: schon erledigt','// schneller Rueckweg; externe Seiteneffekte brauchen eigene Deduplizierung');
  if(plan.id==='m50-l2')lesson.code=lesson.code.replace('Cache::rememberForever(','Cache::remember(').replace('fn () => view(\'produkte._karte\'',"now()->addMinutes(10),\n    fn () => view('produkte._karte'");
  if(plan.id==='m50-l3')lesson.code=lesson.code.replace('fputcsv($datei, [$b->id, $b->summe_cent, $b->created_at->toDateString()]);',"fputcsv($datei, [$b->id, $b->summe_cent, $b->created_at->toDateString()], ',', '\"', '');");
  if(plan.id==='m51-l3')lesson.code=lesson.code.replace("php-version: '8.3'","php-version: '8.5'");
  if(plan.id==='m51-l4')lesson.code=`# Sicherer lokaler Abnahmeplan – kein ausführbares Produktionsdeployment\n# 1. Isoliertes Release aus einem geprüften Commit bauen.\ncomposer install --no-dev --optimize-autoloader --no-interaction\nnpm ci\nnpm run build\n# 2. Auf Staging: Backup/Restore, kompatible Migrationen und Healthcheck prüfen.\n# 3. Produktionsfreigabe separat: Secrets, Pfade, Rechte, Worker/Scheduler.\n# 4. Releasewechsel mit für das Zielsystem geprüftem atomarem Verfahren.\n# 5. Keine rekursiven Löschbefehle oder automatische Release-Bereinigung hier.\n# Details: content/examples/laravel-lab/README.md`;
  if(plan.id==='m60-l1')lesson.code=lesson.code.replace("Route::get('/newsletter/abmelden/{user}', NewsletterAbmelden::class)","// GET zeigt nur die Bestaetigung; Mutation ueber autorisierten/geprueften POST.\nRoute::get('/newsletter/abmelden/{user}', NewsletterBestaetigen::class)");
  if(plan.id==='m60-l2')lesson.code=lesson.code.replace("$id = $request->header('X-Request-Id') ?: (string) Str::uuid();","$candidate = $request->header('X-Request-Id', '');\n        $id = preg_match('/\\A[a-zA-Z0-9-]{1,64}\\z/D', $candidate)\n            ? $candidate : (string) Str::uuid();");
  if(plan.id==='m45-l2')lesson.body=lesson.body.replace(/Der Request passiert die globale.*?Middleware.*?\(Session, CSRF, Wartungsmodus.*?\)\./g,'Der Request passiert globale Middleware (etwa Wartungsmodus); Session und Request-Forgery-Schutz folgen im Standard über die web-Gruppe.');
  if(plan.id==='m48-l1'){
    lesson.quiz=structuredClone(lesson.quiz);
    lesson.quiz[0].options[lesson.quiz[0].correct]='Weil direkte Serialisierung von hidden/visible abhängt und eine explizite Resource den öffentlichen Feldvertrag besser kontrolliert';
    lesson.quiz[0].explain='Models können Attribute ausblenden; nicht automatisch jede Spalte erscheint. Explizite Resources und Tests verhindern dennoch unbeabsichtigte Datenfreigabe.';
  }
  if(plan.id==='m52-l3'){
    lesson.quiz=structuredClone(lesson.quiz);
    lesson.quiz[2].options[lesson.quiz[2].correct]='In kleinsten Einheiten oder geeignetem Dezimalverfahren, mit expliziter Rundungsregel und geprüftem Zahlenbereich';
    lesson.quiz[2].explain='Cent als int hilft, aber Float-Zwischenschritte oder Overflow können die behauptete Exaktheit wieder aufheben.';
  }
  if(codeCorrections[plan.id])lesson.code=codeCorrections[plan.id];
  // Existing quiz IDs/order remain intact; do not remap users' saved answers.
  const index=data.updates.findIndex(l=>l.id===lesson.id);
  if(index<0)data.updates.push(lesson);else data.updates[index]=lesson;
}
if(baseline.filter(l=>data.updates.some(update=>update.id===l.id)).length!==72)throw Error('PHP-Pfad nicht vollständig');
fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
fs.mkdirSync('content/quality',{recursive:true});
fs.writeFileSync('content/quality/php-editorial.json',JSON.stringify(rows,null,2)+'\n');
console.log('72 PHP-Lektionen redaktionell erfasst; zwei bestehende Einstiegslektionen erhalten.');
