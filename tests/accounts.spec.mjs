import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

test('Anmeldung, Rollen, Einladung, Kontentrennung, Synchronisation und Ampel', async ({ browser, playwright }) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'rootpfad-auth-test-'));
  const server = spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'5189',ROOTPFAD_DATA_DIR:dir},stdio:['ignore','pipe','pipe']});
  try {
    const setupToken = await new Promise((resolve,reject) => {
      let log=''; const timer=setTimeout(()=>reject(Error('Testserver startet nicht')),15000);
      server.stdout.on('data',chunk=>{log+=chunk;const match=log.match(/#setup=([a-f0-9]{64})/);if(match){clearTimeout(timer);resolve(match[1]);}});
      server.once('exit',code=>{clearTimeout(timer);reject(Error('Server beendet: '+code));});
    });
    const baseURL='http://127.0.0.1:5189';
    const admin=await playwright.request.newContext({baseURL});
    const guest=await playwright.request.newContext({baseURL});
    expect((await guest.get('/api/progress')).status()).toBe(401);
    expect((await admin.post('/api/setup',{data:{token:setupToken,name:'Test Admin',email:'admin@example.test',password:'test-password-long'}})).ok()).toBe(true);
    expect((await guest.post('/api/setup',{data:{token:setupToken}})).status()).toBe(403);
    const invite=await (await admin.post('/api/admin/invites',{data:{}})).json();
    const participant=await playwright.request.newContext({baseURL});
    const registration=await participant.post('/api/register',{data:{token:invite.token,name:'Test Teilnehmer',email:'learner@example.test',password:'test-password-long',role:'admin'}});
    expect((await registration.json()).user.role).toBe('participant');
    expect((await participant.get('/api/admin/participants')).status()).toBe(403);
    expect((await participant.post('/api/admin/invites',{data:{}})).status()).toBe(403);
    expect((await guest.post('/api/register',{data:{token:invite.token,name:'Noch einer',email:'other@example.test',password:'test-password-long'}})).status()).toBe(403);
    let overview=await (await admin.get('/api/admin/participants')).json();
    expect(overview.participants[0].light).toBe('gray');
    const context=await browser.newContext({storageState:await participant.storageState()});
    const page=await context.newPage(); await page.goto(baseURL);
    await page.waitForFunction(()=>window.RP_APP_READY && rpSyncReady);
    await page.evaluate(async()=>{rpChoosePath('abap');state.completed.add('abap-m1-l1');await saveProgress();await rpSync();});
    await expect.poll(async()=>{
      const progress=await (await participant.get('/api/progress')).json();return progress.data?.completed?.includes('abap-m1-l1');
    }).toBe(true);
    overview=await (await admin.get('/api/admin/participants')).json();
    expect(overview.participants[0].summary.path).toBe('abap');
    expect(overview.participants[0].summary.completed).toBe(1);
    const activity=overview.participants[0].activity;
    const data=(await (await participant.get('/api/progress')).json()).data;
    await participant.put('/api/progress',{data:{data,learningPath:'java'}});
    overview=await (await admin.get('/api/admin/participants')).json();
    expect(overview.participants[0].activity).toBe(activity);
    const id=overview.participants[0].id;
    await admin.put('/api/admin/participants/'+id,{data:{paused:true}});
    expect((await (await admin.get('/api/admin/participants')).json()).participants[0].light).toBe('gray');
    expect((await participant.get('/api/progress?user_id=1')).ok()).toBe(true);
    expect((await (await admin.get('/api/progress')).json()).data).toBeNull();
    expect((await participant.put('/api/progress',{headers:{Origin:'https://evil.example'},data:{data,learningPath:'all'}})).status()).toBe(403);
    const other=await browser.newContext(); const clean=await other.newPage();await clean.goto(baseURL);await clean.waitForFunction(()=>window.RP_APP_READY);
    expect(await clean.evaluate(()=>state.completed.has('abap-m1-l1'))).toBe(false);
    await context.close();await other.close();await admin.dispose();await guest.dispose();await participant.dispose();
  } finally { server.kill('SIGTERM'); }
});
