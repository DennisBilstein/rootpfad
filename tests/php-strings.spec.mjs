import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

test('PHP-Stringbeispiel stimmt mit Sollausgabe und Lektionscode überein',async()=>{
  const available=spawnSync('php',['-v'],{encoding:'utf8'});
  test.skip(available.error?.code === 'ENOENT','PHP CLI für Ausführung erforderlich');
  const file='content/examples/php/strings.php';
  expect(spawnSync('php',['-l',file],{encoding:'utf8'}).status).toBe(0);
  const result=spawnSync('php',['-d','error_reporting=-1',file],{encoding:'utf8'});
  expect(result.status).toBe(0);
  expect(result.stderr).toBe('');
  expect(result.stdout.replace(/\r\n/g,'\n')).toBe(fs.readFileSync('content/examples/php/strings.expected.txt','utf8'));
  const data=JSON.parse(fs.readFileSync('content/learning-refinements.json','utf8'));
  expect(data.updates.find(l=>l.id==='m52-l2').code).toBe(fs.readFileSync(file,'utf8'));
});

test('Stringlektion lässt drei Übungen und Selbsttest im PHP-Pfad bearbeiten',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  await page.evaluate(()=>{rpChoosePath('php');state.currentId='m52-l2';renderContent();});
  await expect(page.locator('main h1')).toHaveText('Text ausgeben: echo, Strings und Verkettung');
  await expect(page.locator('main')).toContainText('Mindestbreite');
  const answer=await page.evaluate(()=>lessonById('m52-l2').quiz.map(q=>q.correct));
  for(let i=0;i<answer.length;i++){await page.evaluate(i=>rpQuizReveal('m52-l2',i),i);await page.locator(`input[name="rq_m52-l2_${i}"][value="${answer[i]}"]`).check();}
  await page.evaluate(()=>checkQuiz('m52-l2'));
  await expect(page.locator('.qfeedback.correct')).toHaveCount(3);
});
