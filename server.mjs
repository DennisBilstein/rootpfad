import express from 'express';
import rateLimit from 'express-rate-limit';
import Database from 'better-sqlite3';
import { randomBytes, createHash } from 'node:crypto';
import compression from 'compression';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {validateProgress,mergeLatestMap} from './server/progress-validation.mjs';
import {hashPassword as hash,verifyPassword as verify} from './server/passwords.mjs';
import {installAccountLifecycle} from './server/account-lifecycle.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dir = process.env.ROOTPFAD_DATA_DIR || path.join(root, '.data');
fs.mkdirSync(dir, { recursive:true, mode:0o700 });
const db = new Database(path.join(dir,'rootpfad.sqlite'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL,created INTEGER NOT NULL,paused INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id INTEGER NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS progress(user_id INTEGER PRIMARY KEY REFERENCES users(id),data TEXT NOT NULL,updated INTEGER NOT NULL,activity INTEGER,summary TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS invites(token TEXT PRIMARY KEY,expires INTEGER NOT NULL,used INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);`);
const token = () => randomBytes(32).toString('hex');
const digest = value => createHash('sha256').update(value).digest('hex');
const dummyPasswordHash=await hash('non-account-dummy-password');
const publicUser = u => ({id:u.id,email:u.email,name:u.name,role:u.role});
let setup = db.prepare("SELECT id FROM users WHERE role='admin'").get() ? null : token();
const app = express();
if(process.env.TRUST_PROXY === '1') app.set('trust proxy',1);
app.disable('x-powered-by');
// Compress public learning content, never authenticated API responses containing
// private text/tokens. Avoids adding a compression side channel to account data.
app.use(compression({threshold:1024,filter:(req,res)=>!req.path.startsWith('/api/')&&compression.filter(req,res)}));
app.use((req,res,next) => {
  res.set({'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','X-Frame-Options':'DENY',
    // Teil-CSP: erlaubt Frames nur für die eigene Seite und die Zwei-Klick-Videos; verbietet Plugins und fremde base-URLs.
    'Content-Security-Policy':"frame-src 'self' https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    // Die App nutzt keine dieser Browser-Funktionen; so kann auch eingebundener Fremdcode sie nicht anfordern.
    'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()',
    'Cross-Origin-Opener-Policy':'same-origin','Cross-Origin-Resource-Policy':'same-origin'});
  // HSTS nur über HTTPS (hinter einem Proxy mit TRUST_PROXY=1) und in Produktion; lokal über http würde es nur schaden.
  if(process.env.NODE_ENV === 'production' && req.secure) res.set('Strict-Transport-Security','max-age=31536000');
  if(req.path.startsWith('/api/')) res.set('Cache-Control','no-store');
  if(req.path.startsWith('/api/') && !['GET','HEAD'].includes(req.method)){
    const origin = req.get('origin');
    if(origin && origin !== `${req.protocol}://${req.get('host')}`) return res.status(403).json({error:'Ungültiger Ursprung.'});
    if(!req.is('application/json')) return res.status(415).json({error:'JSON erforderlich.'});
  }
  next();
});
app.use(express.json({limit:'4mb'}));
app.use('/api',(req,res,next)=>{
  if(!['GET','HEAD'].includes(req.method)&&(!req.body||typeof req.body!=='object'||Array.isArray(req.body)))return res.status(400).json({error:'JSON-Objekt erforderlich.'});
  next();
});
app.use('/api', (req,res,next) => {
  const cookie = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith('rp_session='));
  if(cookie){
    const s = db.prepare('SELECT users.*,sessions.expires FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=?').get(digest(cookie.slice(11)));
    if(s && s.expires > Date.now()) req.user = s;
  }
  if(req.user&&req.get('X-Rootpfad-User')&&req.get('X-Rootpfad-User')!==String(req.user.id))return res.status(409).json({error:'Das Konto wurde in einem anderen Tab gewechselt. Bitte neu laden.'});
  next();
});
const loginLimit = rateLimit({windowMs:15*60*1000,limit:20,standardHeaders:'draft-8',legacyHeaders:false});
function auth(req,res,next){ if(!req.user) return res.status(401).json({error:'Bitte anmelden.'}); next(); }
function admin(req,res,next){ if(req.user?.role !== 'admin') return res.status(403).json({error:'Nur für Administratoren.'}); next(); }
function session(res,user){
  db.prepare('DELETE FROM sessions WHERE expires <= ?').run(Date.now());
  const value = token();
  db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(digest(value),user.id,Date.now()+7*86400000);
  res.cookie('rp_session',value,{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV === 'production',maxAge:7*86400000,path:'/'});
}
function validAccount(body){ return typeof body.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) && body.email.length <= 254 && typeof body.name === 'string' && body.name.trim().length > 0 && body.name.length <= 100 && typeof body.password === 'string' && body.password.length >= 12 && body.password.length <= 200; }
app.get('/api/me',(req,res) => res.json({user:req.user ? publicUser(req.user) : null}));
app.post('/api/setup',loginLimit,async(req,res) => {
  if(!setup || req.body.token !== setup) return res.status(403).json({error:'Einrichtung nicht verfügbar oder Token ungültig.'});
  if(!validAccount(req.body)) return res.status(400).json({error:'Name, gültige E-Mail und Passwort mit mindestens 12 Zeichen erforderlich.'});
  const passwordHash=await hash(req.body.password);
  if(!setup||req.body.token!==setup)return res.status(403).json({error:'Einrichtung bereits abgeschlossen.'});
  const id = db.prepare('INSERT INTO users(email,name,password,role,created) VALUES(?,?,?,?,?)').run(req.body.email.trim().toLowerCase(),req.body.name.trim(),passwordHash,'admin',Date.now()).lastInsertRowid;
  setup = null; const user = db.prepare('SELECT * FROM users WHERE id=?').get(id); session(res,user); res.json({user:publicUser(user)});
});
app.post('/api/login',loginLimit,async(req,res) => {
  if(typeof req.body.email !== 'string' || typeof req.body.password !== 'string' || req.body.password.length > 200) return res.status(400).json({error:'Ungültige Anmeldedaten.'});
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(req.body.email.trim().toLowerCase());
  // Run the password derivation even when the account does not exist.
  const passwordMatches=await verify(req.body.password,user?.password||dummyPasswordHash);
  const ok=!!user&&passwordMatches;
  if(!ok) return res.status(401).json({error:'E-Mail oder Passwort falsch.'});
  const current=db.prepare('SELECT password FROM users WHERE id=?').get(user.id);
  if(!current||current.password!==user.password)return res.status(401).json({error:'Zugangsdaten wurden während der Anmeldung geändert. Bitte erneut anmelden.'});
  session(res,user); res.json({user:publicUser(user)});
});
app.post('/api/register',loginLimit,async(req,res) => {
  const invite = typeof req.body.token === 'string' ? db.prepare('SELECT * FROM invites WHERE token=?').get(digest(req.body.token)) : null;
  if(!invite || invite.used || invite.expires < Date.now()) return res.status(403).json({error:'Einladung ungültig oder abgelaufen.'});
  if(!validAccount(req.body)) return res.status(400).json({error:'Name, gültige E-Mail und mindestens 12 Passwortzeichen erforderlich.'});
  const passwordHash=await hash(req.body.password);
  try {
    const user = db.transaction(() => {
      const current=db.prepare('SELECT * FROM invites WHERE token=?').get(digest(req.body.token));
      if(!current||current.used||current.expires<Date.now())throw Error('Invitation consumed');
      const id = db.prepare('INSERT INTO users(email,name,password,role,created) VALUES(?,?,?,?,?)').run(req.body.email.trim().toLowerCase(),req.body.name.trim(),passwordHash,'participant',Date.now()).lastInsertRowid;
      db.prepare('UPDATE invites SET used=1 WHERE token=?').run(digest(req.body.token));
      return db.prepare('SELECT * FROM users WHERE id=?').get(id);
    })();
    session(res,user); res.json({user:publicUser(user)});
  } catch { res.status(409).json({error:'Konto konnte nicht erstellt werden; möglicherweise ist die E-Mail bereits vergeben.'}); }
});
app.post('/api/logout',auth,(req,res) => {
  db.prepare('DELETE FROM sessions WHERE user_id=?').run(req.user.id);
  res.clearCookie('rp_session',{path:'/'}); res.json({ok:true});
});
app.get('/api/account/export',auth,(req,res)=>{
 const progress=db.prepare('SELECT data,updated FROM progress WHERE user_id=?').get(req.user.id);
 res.set('Content-Disposition','attachment; filename="rootpfad-account-export.json"');
 res.json({format:'rootpfad-account-export-v1',exportedAt:new Date().toISOString(),account:publicUser(req.user),progress:progress?JSON.parse(progress.data):null,progressUpdated:progress?.updated||null});
});
app.post('/api/account/password',auth,loginLimit,async(req,res)=>{
 const {currentPassword,newPassword}=req.body;
 if(typeof currentPassword!=='string'||currentPassword.length>200||typeof newPassword!=='string'||newPassword.length<12||newPassword.length>200)return res.status(400).json({error:'Aktuelles Passwort und neues Passwort mit 12 bis 200 Zeichen erforderlich.'});
 if(currentPassword===newPassword)return res.status(400).json({error:'Das neue Passwort muss sich unterscheiden.'});
 if(!await verify(currentPassword,req.user.password))return res.status(403).json({error:'Aktuelles Passwort stimmt nicht.'});
 const passwordHash=await hash(newPassword);
 const updated=db.transaction(()=>{
  const changed=db.prepare('UPDATE users SET password=? WHERE id=? AND password=?').run(passwordHash,req.user.id,req.user.password);
  if(changed.changes!==1)return false;
  db.prepare('DELETE FROM sessions WHERE user_id=?').run(req.user.id);return true;
 })();
 if(!updated)return res.status(409).json({error:'Kontodaten wurden parallel geändert. Bitte neu anmelden.'});
 session(res,req.user);res.json({ok:true,message:'Passwort geändert. Andere Sitzungen wurden abgemeldet.'});
});
installAccountLifecycle({app,db,auth,limit:loginLimit,dataDirectory:dir});

// The server computes progress from known course IDs; client summaries are not trusted.
const source = fs.readFileSync(path.join(root,'assets/script-01.js'),'utf8');
const {default:vm} = await import('node:vm');
const catalog = {}; vm.createContext(catalog); vm.runInContext(source.slice(0,source.indexOf('var VERSION =')),catalog);
const lessonPath = new Map(), cards = new Map();
catalog.MODULES.forEach(m => m.lessons.forEach(l => lessonPath.set(l.id,m.course || (m.part === 10 ? 'php' : m.part === 11 ? 'git' : 'ap1'))));
catalog.CARDS.forEach(c => cards.set(c.id,lessonPath.get(c.lessonId)));
const policies = () => JSON.parse(db.prepare("SELECT value FROM settings WHERE key='policy'").get()?.value || '{"green":70,"yellow":30,"inactiveDays":7}');
function summarize(data,selected){
  const ids = [...lessonPath].filter(([,p]) => selected === 'all' || p === selected).map(([id]) => id);
  const completed = new Set(Array.isArray(data.completed) ? data.completed : []);
  let learned=0,due=0,right=0,wrong=0;
  for(const [id,p] of cards){
    if(selected !== 'all' && selected !== p) continue;
    const s = data.srs?.[id]; if(s){ learned++; if(Number(s.due) <= Date.now()) due++; }
    right += Math.max(0,Math.min(1e6,Number(data.stats?.[id]?.right)||0));
    wrong += Math.max(0,Math.min(1e6,Number(data.stats?.[id]?.wrong)||0));
  }
  const done = ids.filter(id => completed.has(id)).length;
  return {path:selected,total:ids.length,completed:done,percent:ids.length ? Math.round(done/ids.length*100) : 0,learned,due,accuracy:right+wrong ? Math.round(right/(right+wrong)*100) : null};
}
app.get('/api/progress',auth,(req,res) => {
  if(req.get('X-Rootpfad-User')&&req.get('X-Rootpfad-User')!==String(req.user.id))return res.status(409).json({error:'Das angemeldete Konto wurde in einem anderen Tab gewechselt. Bitte neu laden; der lokale Stand bleibt erhalten.'});
  const p = db.prepare('SELECT * FROM progress WHERE user_id=?').get(req.user.id);
  res.json(p ? {data:JSON.parse(p.data),summary:JSON.parse(p.summary),updated:p.updated} : {data:null});
});
app.put('/api/progress',auth,(req,res) => {
  if(req.get('X-Rootpfad-User')&&req.get('X-Rootpfad-User')!==String(req.user.id))return res.status(409).json({error:'Kontowechsel erkannt. Dieser Lernstand wird nicht an ein anderes Konto übertragen. Bitte neu laden.'});
  const {data,learningPath} = req.body;
  if(!data || typeof data !== 'object' || Array.isArray(data) || !['all','ap1','java','abap','php','git','javascript','htmlcss','mariadb','apis','agents'].includes(learningPath)) return res.status(400).json({error:'Ungültiger Lernstand.'});
  if(/"(?:__proto__|constructor|prototype)"\s*:/.test(JSON.stringify(data))) return res.status(400).json({error:'Unzulässige Datenfelder.'});
  const invalid=validateProgress(data);if(invalid)return res.status(400).json({error:invalid});
  const old = db.prepare('SELECT * FROM progress WHERE user_id=?').get(req.user.id);
  const previous = old ? JSON.parse(old.data) : {};
  // Additive multi-device merge: never discard another device's completed work.
  const merged = {...previous,...data};
  for(const key of ['completed','tracesDone']) merged[key] = [...new Set([...(Array.isArray(previous[key]) ? previous[key] : []),...(Array.isArray(data[key]) ? data[key] : [])])];
  merged.stats = {...previous.stats};
  for(const [id,value] of Object.entries(data.stats || {})) merged.stats[id] = {right:Math.max(Number(previous.stats?.[id]?.right)||0,Number(value?.right)||0),wrong:Math.max(Number(previous.stats?.[id]?.wrong)||0,Number(value?.wrong)||0)};
  merged.srs = {...previous.srs};
  for(const [id,value] of Object.entries(data.srs || {})) if(value && (!merged.srs[id] || (Number(value.ts)||0) >= (Number(merged.srs[id].ts)||0))) merged.srs[id] = value;
  for(const key of ['xpLog','badges','solved','notizen','merkzettel','ueTexte']) merged[key] = {...previous[key],...data[key]};
  merged.xp = Math.max(Number(previous.xp)||0,Number(data.xp)||0);
  merged.learning = {events:{...previous.learning?.events,...data.learning?.events},missions:mergeLatestMap(previous.learning?.missions,data.learning?.missions)};
  merged.competencies={submissions:mergeLatestMap(previous.competencies?.submissions,data.competencies?.submissions),variants:mergeLatestMap(previous.competencies?.variants,data.competencies?.variants),feedback:mergeLatestMap(previous.competencies?.feedback,data.competencies?.feedback)};
  // Clients cannot self-approve practical competence through progress upload.
  for(const [id,record]of Object.entries(merged.competencies.submissions)){
    const trusted=previous.competencies?.submissions?.[id];
    const same=trusted&&['normal','boundary','failure','evidence','help','revision'].every(k=>record[k]===trusted[k]);
    merged.competencies.submissions[id]={...record,status:same?trusted.status:'submitted',reviewNote:same?trusted.reviewNote:undefined,reviewedAt:same?trusted.reviewedAt:undefined};
  }
  // A heartbeat or path switch must not count as learning activity.
  const activityFields = x => JSON.stringify([x.completed || [],x.stats || {},x.solved || {},x.tracesDone || [],x.learning?.events || {}]);
  const changed = activityFields(previous) !== activityFields(merged);
  const summary = summarize(merged,learningPath), now = Date.now();
  db.prepare('INSERT INTO progress VALUES(?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,updated=excluded.updated,activity=excluded.activity,summary=excluded.summary').run(req.user.id,JSON.stringify(merged),now,changed ? now : old?.activity || null,JSON.stringify(summary));
  res.json({ok:true,updated:now,data:merged});
});
app.post('/api/admin/invites',auth,admin,(req,res) => {
  const value = token(); db.prepare('INSERT INTO invites(token,expires) VALUES(?,?)').run(digest(value),Date.now()+7*86400000);
  res.json({token:value,expires:Date.now()+7*86400000});
});
app.get('/api/admin/assessments',auth,admin,(req,res)=>{
  const rows=db.prepare("SELECT users.id,users.name,progress.data FROM users JOIN progress ON progress.user_id=users.id WHERE role='participant'").all();
  res.json({submissions:rows.flatMap(row=>Object.entries(JSON.parse(row.data).competencies?.submissions||{}).map(([moduleId,record])=>({...record,moduleId,userId:row.id,name:row.name})))});
});
app.get('/api/admin/question-quality',auth,admin,(req,res)=>{
  const rows=db.prepare("SELECT progress.data FROM users JOIN progress ON progress.user_id=users.id WHERE role='participant'").all();
  const aggregate=new Map(),feedback=[];
  for(const row of rows){
    const data=JSON.parse(row.data),events=Object.values(data.learning?.events||{}).filter(e=>e.kind==='question-attempt'&&e.firstAttempt===true&&cards.has(e.cardId));
    const participantSeen=new Set();
    for(const event of events){if(participantSeen.has(event.cardId))continue;participantSeen.add(event.cardId);const item=aggregate.get(event.cardId)||{cardId:event.cardId,participants:0,right:0};item.participants++;if(event.correct===true)item.right++;aggregate.set(event.cardId,item);}
    for(const item of Object.values(data.competencies?.feedback||{}))if(item&&cards.has(item.cardId))feedback.push({cardId:item.cardId,note:String(item.note||'').slice(0,1500),ts:item.ts});
  }
  res.json({minimumParticipants:10,note:'Erstversuche je Inhaltsrevision, pro Konto höchstens einmal. Mindestens zehn Konten sind eine Produktregel, kein statistischer Validitätsbeweis. Hilfen derzeit nicht vollständig gemessen; keine automatische Schwierigkeitseinstufung.',items:[...aggregate.values()].map(item=>({...item,rate:item.participants>=10?Math.round(item.right/item.participants*100):null,status:item.participants<10?'Zu wenige unabhängige Konten':'Redaktionell prüfen, nicht automatisch als schwer/unklar einstufen'})),feedback});
});
app.put('/api/admin/assessments/:userId/:moduleId',auth,admin,(req,res)=>{
  if(!['accepted','revise'].includes(req.body.status)||typeof req.body.note!=='string'||req.body.note.length>2000)return res.status(400).json({error:'Prüfstatus und Rückmeldung erforderlich.'});
  const row=db.prepare('SELECT data FROM progress WHERE user_id=?').get(req.params.userId);
  const data=row?JSON.parse(row.data):null,record=data?.competencies?.submissions?.[req.params.moduleId];
  if(!record)return res.status(404).json({error:'Einreichung nicht gefunden.'});
  if(req.body.submittedAt!==record.ts)return res.status(409).json({error:'Einreichung wurde verändert. Bitte neu laden.'});
  Object.assign(record,{status:req.body.status,reviewNote:req.body.note,reviewedAt:Date.now()});
  db.prepare('UPDATE progress SET data=?,updated=? WHERE user_id=?').run(JSON.stringify(data),Date.now(),req.params.userId);res.json({ok:true});
});
app.put('/api/admin/policy',auth,admin,(req,res) => {
  const p = req.body;
  if(![p.green,p.yellow,p.inactiveDays].every(Number.isInteger) || p.green>100 || p.green<1 || p.yellow<0 || p.yellow>=p.green || p.inactiveDays<1 || p.inactiveDays>365) return res.status(400).json({error:'Ungültige Schwellenwerte.'});
  db.prepare("INSERT INTO settings VALUES('policy',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(JSON.stringify({green:p.green,yellow:p.yellow,inactiveDays:p.inactiveDays})); res.json({ok:true});
});
app.put('/api/admin/participants/:id',auth,admin,(req,res) => {
  if(typeof req.body.paused !== 'boolean') return res.status(400).json({error:'Ungültiger Pausenstatus.'});
  db.prepare("UPDATE users SET paused=? WHERE id=? AND role='participant'").run(req.body.paused ? 1 : 0,req.params.id); res.json({ok:true});
});
app.get('/api/admin/participants',auth,admin,(req,res) => {
  const policy = policies();
  const users = db.prepare("SELECT users.id,name,email,paused,progress.updated,progress.activity,progress.summary FROM users LEFT JOIN progress ON users.id=progress.user_id WHERE role='participant' ORDER BY name").all();
  res.json({policy,participants:users.map(u => {
    const summary = u.summary ? JSON.parse(u.summary) : null;
    let light='gray',reason=u.paused ? 'Teilnahme pausiert.' : 'Noch keine Lernaktivität übertragen.';
    if(!u.paused && summary && u.activity){
      if(Date.now()-u.activity > policy.inactiveDays*86400000){light='red';reason=`Seit mindestens ${policy.inactiveDays} Tagen keine übertragene Lernaktivität.`;}
      else if(summary.percent>=policy.green){light='green';reason=`${summary.percent}% bearbeitet; Schwelle ${policy.green}% erreicht.`;}
      else if(summary.percent>=policy.yellow){light='yellow';reason=`${summary.percent}% bearbeitet; zwischen ${policy.yellow}% und ${policy.green}%.`;}
      else {light='red';reason=`${summary.percent}% bearbeitet; unter ${policy.yellow}%.`;}
    }
    return {...u,summary,light,reason};
  })});
});
// Skripte, Styles und Daten haben keine Hash-Dateinamen: Sie werden bei jedem Aufruf per ETag revalidiert (304),
// damit nach einer Änderung nie alte und neue Dateien gemischt laufen. Nur Schriften ändern sich praktisch nie
// und bekommen deshalb eine lange Laufzeit.
const revalidate = 'no-cache';
app.use('/assets',express.static(path.join(root,'assets'),{dotfiles:'deny',setHeaders:(res,file) => {
  res.setHeader('Cache-Control',/\.woff2?$/.test(file) ? 'public, max-age=2592000' : revalidate);
}}));
app.get(['/', '/index.html'],(req,res) => res.set('Cache-Control',revalidate).sendFile(path.join(root,'index.html')));
app.get('/admin',(req,res) => res.set('Cache-Control',revalidate).sendFile(path.join(root,'admin.html')));
app.use((err,req,res,next) => { console.error(err.message); const status=err.status===413?413:err instanceof SyntaxError&&err.status===400?400:500;res.status(status).json({error:status===400?'Ungültiges JSON.':'Anfrage konnte nicht verarbeitet werden.'}); });
const port = Number(process.env.PORT || 5173), host = process.env.HOST || '127.0.0.1';
app.listen(port,host,() => {
  console.log(`ROOTPFAD: http://${host}:${port}`);
  if(setup) console.log(`Einmalige Admin-Einrichtung (lokal geheim halten): http://localhost:${port}/#setup=${setup}`);
});
