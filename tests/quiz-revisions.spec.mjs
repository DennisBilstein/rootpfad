import {test,expect} from '@playwright/test';
test('Alte Evidenz gilt nicht für fachlich ersetzte Fragen',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>{
    const lesson=lessonById('m1-l2');
    state.stats['m1-l2#0']={right:99,wrong:0};state.srs['m1-l2#0']={iv:90,due:Date.now()+86400000};
    const current=rpQuestionId(lesson,0);
    return {revised:RP_QUIZ_REVISIONS.length,current,newUnlearned:!state.srs[current]&&!state.stats[current],oldPreserved:state.stats['m1-l2#0'].right===99,allReasons:RP_QUIZ_REVISIONS.every(q=>q.rationales.length===q.options.length)};
  });expect(result.revised).toBe(1253);expect(result.current).toBe('m1-l2#0@2026-11-scenario-v1-polish1');expect(result.newUnlearned).toBe(true);expect(result.oldPreserved).toBe(true);expect(result.allReasons).toBe(true);
});
