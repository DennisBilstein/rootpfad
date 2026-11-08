import {test,expect} from '@playwright/test';
test('Neue Datenbank-,API-,MCP- und Agent-Lektionen sind datiert und verknüpft',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>{
    const lessons=MODULES.filter(m=>['mariadb','apis','agents'].includes(m.course)).flatMap(m=>m.lessons);
    const failures=[];
    for(const l of lessons){state.currentId=l.id;renderContent();if(l.knowledgeAsOf!=='2026-11-06'||l.exercises?.length!==3||document.querySelectorAll('fieldset.qcard').length!==l.quiz.length)failures.push(l.id);}
    const updated=MODULES.filter(m=>['m28','m29','m30'].includes(m.id)).flatMap(m=>m.lessons).filter(l=>l.body.includes('Aktualisierung · 06.11.2026')).length;
    return {lessons:lessons.length,updated,failures};
  });expect(result).toEqual({lessons:23,updated:10,failures:[]});
});
