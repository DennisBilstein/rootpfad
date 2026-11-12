import {test,expect} from '@playwright/test';
test('Jede Lektionsfrage und Zusatzkarte besitzt explizite Abruf-/Bewertungskriterien',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>({
    cards:CARDS.length,
    contracts:RP_QUIZ_CONTRACTS.length,
    covered:CARDS.every(c=>RP_QUIZ_CONTRACT_BY_ID[c.id]?.criteria.length===4),
    extras:CARDS.filter(c=>c.id.startsWith('x#')).every(c=>RP_QUIZ_CONTRACT_BY_ID[c.id]),
  }));expect(result).toEqual({cards:1673,contracts:1673,covered:true,extras:true});
});
test('Selbstrubrik ist sichtbar, nicht als automatische Fachprüfung bewertet',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  await page.evaluate(()=>{rpChoosePath('ap1');state.currentId='m1-l1';renderContent();rpQuizReveal('m1-l1',0);});
  const correct=await page.evaluate(()=>lessonById('m1-l1').quiz[0].correct);
  await page.locator(`input[name="rq_m1-l1_0"][value="${correct}"]`).check();
  await page.evaluate(()=>checkQuiz('m1-l1'));
  await expect(page.locator('[data-rubric]')).toHaveCount(1);
  await expect(page.locator('[data-rubric]')).toContainText('einzeln als Szenario redigiert');
  await expect(page.locator('[data-rubric] input[type="checkbox"]')).toHaveCount(4);
});
