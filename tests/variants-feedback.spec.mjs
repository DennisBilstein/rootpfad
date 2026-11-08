import {test,expect} from '@playwright/test';
test('Andere Variante benötigt echten gespeicherten Zeitabstand',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 const result=await page.evaluate(()=>{const task=RP_PARALLEL_TASKS[0],now=Date.now();rpCompetencies.variants={};const first=rpVariantAvailable(task,now);rpCompetencies.variants.x={taskId:task.id,variantId:'a',ts:now,correct:true};const immediate=rpVariantAvailable(task,now+1),later=rpVariantAvailable(task,now+3*DAY+1);return {first:first.variant.id,immediate:immediate.due,later:later.due,next:later.variant.id};});
 expect(result).toEqual({first:'a',immediate:false,later:true,next:'b'});
});
test('Unklarheit wird als Meldung gespeichert und nicht als korrigierte Fachfrage ausgegeben',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 await page.evaluate(()=>{rpChoosePath('ap1');state.currentId='m1-l1';renderContent();rpQuizReveal('m1-l1',0);const q=lessonById('m1-l1').quiz[0];document.querySelector('input[name="rq_m1-l1_0"][value="'+q.correct+'"]').checked=true;checkQuiz('m1-l1');});
 const key=await page.evaluate(()=>rpQuestionId(lessonById('m1-l1'),0));
 await page.locator('[data-question-feedback] summary').first().click();
 await page.locator('[data-question-feedback] textarea').first().fill('Die Voraussetzung für den Grenzfall ist nicht eindeutig.');
 await page.getByRole('button',{name:'Hinweis speichern'}).first().click();
 expect(await page.evaluate(key=>rpCompetencies.feedback[key].status,key)).toBe('submitted');
});
