import {randomBytes,createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import {hashPassword,verifyPassword} from './passwords.mjs';

const digest=value=>createHash('sha256').update(value).digest('hex');
const generic='Falls ein passendes Konto existiert und der Mailversand eingerichtet ist, erhältst du einen Link. Prüfe auch den Spamordner.';

export function installAccountLifecycle({app,db,auth,limit,dataDirectory}){
 db.exec('CREATE TABLE IF NOT EXISTS password_resets(token TEXT PRIMARY KEY,user_id INTEGER NOT NULL REFERENCES users(id),expires INTEGER NOT NULL,password_version TEXT NOT NULL);');
 const production=process.env.NODE_ENV==='production';
 const rawBase=process.env.PUBLIC_BASE_URL||(!production?'http://localhost:'+Number(process.env.PORT||5173):null);
 const base=rawBase?new URL(rawBase):null;
  if(base&&(!['http:','https:'].includes(base.protocol)||base.username||base.password||base.hash||base.search||base.pathname!=='/'||(production&&base.protocol!=='https:')))throw Error('PUBLIC_BASE_URL muss eine HTTPS-Origin ohne Pfad/Query/Credentials sein.');
 const mode=process.env.MAIL_MODE||'disabled';
 const development=mode==='development'&&!production;
 const transport=mode==='smtp'&&process.env.SMTP_HOST?nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:process.env.SMTP_SECURE==='true',requireTLS:process.env.SMTP_SECURE!=='true',auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}:undefined,connectionTimeout:10000,socketTimeout:15000}):null;
 if(production&&mode==='development')throw Error('Entwicklungs-Mailmodus ist in Produktion verboten.');

 app.post('/api/password/request',limit,async(req,res)=>{
  const email=typeof req.body.email==='string'?req.body.email.trim().toLowerCase():'';
  if(email.length>254||!email.includes('@'))return res.json({message:generic});
  const user=db.prepare('SELECT id,password FROM users WHERE email=?').get(email);
  const configured=!!base&&(development||!!transport&&!!process.env.MAIL_FROM);
  if(user&&configured){
   const recent=db.prepare('SELECT expires FROM password_resets WHERE user_id=? ORDER BY expires DESC LIMIT 1').get(user.id);
   if(!recent||recent.expires<Date.now()+14*60000){
    const token=randomBytes(32).toString('hex'),expires=Date.now()+15*60000;
    db.transaction(()=>{db.prepare('DELETE FROM password_resets WHERE user_id=? OR expires<=?').run(user.id,Date.now());db.prepare('INSERT INTO password_resets VALUES(?,?,?,?)').run(digest(token),user.id,expires,digest(user.password));})();
    const url=new URL('/#reset='+token,base).href;
    try{
     if(development){const out=path.join(dataDirectory,'mail-preview');fs.mkdirSync(out,{recursive:true,mode:0o700});fs.writeFileSync(path.join(out,Date.now()+'-'+randomBytes(4).toString('hex')+'.json'),JSON.stringify({to:email,resetURL:url,expires,warning:'Nur lokale Mailvorschau, kein Versand.'}),{mode:0o600});}
     else await transport.sendMail({from:process.env.MAIL_FROM,to:email,subject:'ROOTPFAD: Passwort zurücksetzen',text:'Für dein ROOTPFAD-Konto wurde eine Passwortänderung angefordert. Der Link ist 15 Minuten und einmalig gültig:\n\n'+url+'\n\nFalls du dies nicht angefordert hast, ignoriere diese Nachricht. Dein Passwort wurde nicht geändert.'});
    }catch(error){db.prepare('DELETE FROM password_resets WHERE token=?').run(digest(token));console.error('Passwortmail konnte nicht zugestellt werden.');}
   }
  }
  // Same response whether account exists, mail disabled, throttled, or delivery fails.
  await new Promise(resolve=>setTimeout(resolve,150));res.json({message:generic});
 });
 app.post('/api/password/reset',limit,async(req,res)=>{
  const {token,password}=req.body;
  if(typeof token!=='string'||!/^[a-f0-9]{64}$/.test(token)||typeof password!=='string'||password.length<12||password.length>200)return res.status(400).json({error:'Gültiger Link und neues Passwort mit 12 bis 200 Zeichen erforderlich.'});
  const key=digest(token),reset=db.prepare('SELECT password_resets.*,users.password FROM password_resets JOIN users ON users.id=password_resets.user_id WHERE token=?').get(key);
  if(!reset||reset.expires<=Date.now()||reset.password_version!==digest(reset.password))return res.status(400).json({error:'Link ungültig,bereits verwendet oder abgelaufen.'});
  const next=await hashPassword(password);
  const success=db.transaction(()=>{
   const current=db.prepare('SELECT password_resets.*,users.password FROM password_resets JOIN users ON users.id=password_resets.user_id WHERE token=?').get(key);
   if(!current||current.expires<=Date.now()||current.password_version!==digest(current.password))return false;
   db.prepare('UPDATE users SET password=? WHERE id=?').run(next,current.user_id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(current.user_id);db.prepare('DELETE FROM password_resets WHERE user_id=?').run(current.user_id);return true;
  })();
  if(!success)return res.status(400).json({error:'Link ungültig,bereits verwendet oder abgelaufen.'});
  res.clearCookie('rp_session',{path:'/'});res.json({ok:true,message:'Passwort geändert. Bitte neu anmelden; bisherige Sitzungen wurden widerrufen.'});
 });
 app.post('/api/account/delete',auth,limit,async(req,res)=>{
  if(req.body.confirmation!=='KONTO LÖSCHEN'||typeof req.body.password!=='string'||req.body.password.length>200)return res.status(400).json({error:'Passwort und Bestätigung KONTO LÖSCHEN erforderlich.'});
  if(!await verifyPassword(req.body.password,req.user.password))return res.status(403).json({error:'Passwort stimmt nicht.'});
  const result=db.transaction(()=>{
   const user=db.prepare('SELECT * FROM users WHERE id=?').get(req.user.id);
   if(!user||user.password!==req.user.password)return 'changed';
   if(user.role==='admin'&&db.prepare("SELECT COUNT(*) AS n FROM users WHERE role='admin'").get().n<=1)return 'last-admin';
   db.prepare('DELETE FROM password_resets WHERE user_id=?').run(user.id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);db.prepare('DELETE FROM progress WHERE user_id=?').run(user.id);db.prepare('DELETE FROM users WHERE id=?').run(user.id);return 'deleted';
  })();
  if(result==='last-admin')return res.status(409).json({error:'Der letzte Administrator kann nicht gelöscht werden. Zuerst eine geregelte Übergabe an einen weiteren Administrator einrichten.'});
  if(result!=='deleted')return res.status(409).json({error:'Kontozustand geändert; bitte neu anmelden.'});
  if(development){const preview=path.join(dataDirectory,'mail-preview');if(fs.existsSync(preview))for(const name of fs.readdirSync(preview)){try{const file=path.join(preview,name),mail=JSON.parse(fs.readFileSync(file,'utf8'));if(mail.to===req.user.email)fs.unlinkSync(file);}catch{}}}
  res.clearCookie('rp_session',{path:'/'});res.json({ok:true,message:'Konto und zugehöriger aktiver Serverlernstand gelöscht. Exporte,Backups und externe Mailzustellung unterliegen separater Aufbewahrung; keine forensische Löschgarantie.'});
 });
}
