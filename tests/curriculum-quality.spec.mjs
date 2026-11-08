import { test,expect } from '@playwright/test';
test('Alle PHP- und JS/Vue-Lektionen besitzen Ziele, Übungen, Quellen und gültige Karten',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>{
    const php=MODULES.filter(m=>m.part===10).flatMap(m=>m.lessons);
    const js=MODULES.filter(m=>m.course==='javascript').flatMap(m=>m.lessons);
    const failures=[];
    for(const lesson of [...php,...js]){
      if(lesson.objectives?.length<4 || !lesson.body.includes('Lernziele') || !lesson.body2?.includes('Drei Übungen'))failures.push(lesson.id+':structure');
      state.currentId=lesson.id;renderContent();
      if(document.querySelectorAll('fieldset.qcard').length!==(lesson.quiz||[]).length)failures.push(lesson.id+':render');
      if(!(lesson.quiz||[]).every((q,i)=>q.options[q.correct]&&CARD_BY_ID[rpQuestionId(lesson,i)]))failures.push(lesson.id+':cards');
    }
    return {php:php.length,js:js.length,failures};
  });
  expect(result).toEqual({php:72,js:16,failures:[]});
});
