import {test,expect} from '@playwright/test';
test('Tokyo Night erfasst zusätzliche Sprachen und erhält sicheren reinen Code',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>{
    const samples=[['JavaScript','const n = 2;'],['CSS','.card { color: #fff; }'],['HTML','<h1 title="x">Hello</h1>'],['ABAP','DATA minutes TYPE i VALUE 20.'],['Java','class Task { return 2; }']];
    return samples.map(([lang,text])=>{const host=document.createElement('div');host.innerHTML=rbTokyo(text,rbSprache(lang));return {same:host.textContent===text,tokens:host.querySelectorAll('span').length};});
  });expect(result.every(r=>r.same&&r.tokens>0)).toBe(true);
  await page.evaluate(()=>{rpChoosePath('php');state.currentId='m52-l2';renderContent();});
  await expect(page.locator('.code-block pre').first()).toHaveCSS('background-color','rgb(26, 27, 38)');
});
test('Quiz verlangt Abruf vor Optionen, erklärt Distraktoren und bewahrt alte IDs',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  await page.evaluate(()=>{rpChoosePath('php');state.currentId='m52-l3';renderContent();});
  await expect(page.locator('#rq-options-m52-l3\\#0')).toBeHidden();
  await page.getByLabel('Deine Erklärung vor der Auswahl · Frage 1').fill('Division ergibt 2.5; Typ und Rundung getrennt prüfen.');
  await page.evaluate(()=>{const l=lessonById('m52-l3');l.quiz.forEach((q,i)=>{rpQuizReveal(l.id,i);document.querySelector('input[name="rq_'+l.id+'_'+i+'"][value="'+q.correct+'"]').checked=true;});checkQuiz(l.id);});
  await expect(page.locator('.qfeedback > .rq-review')).toHaveCount(4);
  await expect(page.locator('.rq-review').first()).toContainText('Division ergibt 2.5');
  expect(await page.evaluate(()=>{const l=lessonById('m52-l3');return !!CARD_BY_ID[rpQuestionId(l,3)]&&!!l.quiz[0].revision;})).toBe(true);
});
