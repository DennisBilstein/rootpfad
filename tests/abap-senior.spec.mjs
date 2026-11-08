import {test,expect} from '@playwright/test';
import {lessons,updates} from '../content/abap-senior-curriculum.mjs';
test('ABAP-Vertiefung rendert alle neuen und überarbeiteten Lektionen mit Praxisfällen',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 expect(lessons).toHaveLength(8);expect(updates).toHaveLength(10);
 for(const item of [...lessons,...updates]){
  await page.evaluate(id=>{state.currentId=id;renderContent();},item.id);
  await expect(page.locator('main')).toContainText('Senior-Praxis');
  await expect(page.locator('main')).toContainText('Normalfall:');
  await expect(page.locator('main')).toContainText('Grenzfall:');
  await expect(page.locator('main')).toContainText('Fehlerfall:');
  expect(await page.evaluate(id=>{
   const l=lessonById(id);return l.quiz.every((q,i)=>q.revision.startsWith('2026-11-08-abap-senior')&&q.rationales.length===q.options.length&&q.sources.length&&RP_QUIZ_CONTRACT_BY_ID[rpQuestionId(l,i)]?.criteria.length===4);
  },item.id)).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('Neue ABAP-Szenarien erklären falsche Antworten und werten alte Evidenz nicht um',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 const id='abap-m15-senior-authorization';await page.evaluate(id=>{state.currentId=id;renderContent();},id);
 await page.evaluate(id=>rpQuizReveal(id,0),id);
 await page.locator('input[name="rq_'+id+'_0"][value="0"]').check();
 await page.evaluate(id=>checkQuiz(id),id);
 await expect(page.locator('.qfeedback.wrong').first()).toContainText('DCL');
 const history=await page.evaluate(()=>{
  const l=lessonById('abap-m12-l2'),old='abap-m12-l2#0@2026-11-07-full-v3';
  state.srs[old]={due:Date.now(),interval:30};const current=rpQuestionId(l,0);
  return {oldPresent:!!state.srs[old],current,newMissing:!state.srs[current],newCards:RP_ABAP_SENIOR_LESSONS.reduce((n,l)=>n+l.quiz.length,0)};
 });
 expect(history.oldPresent).toBe(true);expect(history.newMissing).toBe(true);expect(history.current).toContain('@2026-11-08-abap-senior-v1');expect(history.newCards).toBe(24);
});
