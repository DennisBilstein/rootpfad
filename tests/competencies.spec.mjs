import {test,expect} from '@playwright/test';
test('Gelesen und Auswahlquiz ergeben keinen praktischen Nachweis',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 const result=await page.evaluate(()=>{const m=rpCatalog.modules[0];m.lessons.forEach(l=>{state.completed.add(l.id);l.quiz.forEach((q,i)=>state.stats[rpQuestionId(l,i)]={right:5,wrong:0});});const c=rpCompetency(m);return {read:c.read,total:c.total,recognized:c.recognized,questions:c.questions,applied:c.applied};});
 expect(result.read).toBe(result.total);expect(result.recognized).toBe(result.questions);expect(result.applied).toBe(false);
});
test('Jedes Modul besitzt individuelle Normal-,Grenz- und Fehlerfälle',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 expect(await page.evaluate(()=>RP_MODULE_ASSESSMENTS.length===121&&RP_MODULE_ASSESSMENTS.every(a=>a.editorialStatus==='individually-authored-manual'&&a.cases.length===3&&a.cases.every(c=>c.request&&c.expected)&&a.rubric.length===4))).toBe(true);
});
test('Modulauftrag erfasst drei Fälle ohne automatische Freigabe',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 await page.evaluate(()=>{rpChoosePath('php');rpOpenAssessment('m52');});
 for(const name of ['normal','boundary','failure','evidence','help'])await page.locator('[name="'+name+'"]').fill('Dokumentierter Testfall mit beobachtetem Ergebnis.');
 await page.getByRole('button',{name:'Arbeit einreichen · Prüfung ausstehend'}).click();
 expect(await page.evaluate(()=>rpCompetencies.submissions.m52.status)).toBe('submitted');
 expect(await page.evaluate(()=>serialize().competencies.submissions.m52.evidence)).toContain('Dokumentierter');
 await page.reload();await page.waitForFunction(()=>window.RP_APP_READY);
 expect(await page.evaluate(()=>rpCompetencies.submissions.m52.status)).toBe('submitted');
});
