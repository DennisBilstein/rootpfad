import {test,expect} from '@playwright/test';
test('JavaScript führt eigene Lösungen isoliert aus, meldet Fehler und beendet Endlosschleifen',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  await page.evaluate(()=>{rpChoosePath('javascript');rpPracticeStart('javascript');});
  await page.getByLabel('JavaScript-Code · Funktion bearbeiten').fill('function totalMinutes(days, minutes) { return days * minutes; }');
  await page.getByRole('button',{name:'Code ausführen & prüfen'}).click();
  await expect(page.locator('.gp-feedback')).toContainText('Test 3: bestanden');
  expect(await page.evaluate(()=>!!state.solved['guided:javascript:0'])).toBe(true);
  await page.getByLabel('JavaScript-Code · Funktion bearbeiten').fill('function totalMinutes() { while (true) {} }');
  await page.getByRole('button',{name:'Code ausführen & prüfen'}).click();
  await expect(page.locator('.gp-feedback')).toContainText('Zeitlimit',{timeout:10000});
  await page.getByLabel('JavaScript-Code · Funktion bearbeiten').fill('function totalMinutes() { return document.cookie; }');
  await page.getByRole('button',{name:'Code ausführen & prüfen'}).click();
  await expect(page.locator('.gp-feedback')).toContainText('document is not defined');
  for(const index of [1,2]){
    await page.evaluate(index=>{rpPractice.index=index;rpPractice.feedback='';renderContent();},index);
    const solution=await page.evaluate(()=>rpPracticeTask().solution);
    await page.getByLabel('JavaScript-Code · Funktion bearbeiten').fill(solution);
    await page.getByRole('button',{name:'Code ausführen & prüfen'}).click();
    await expect(page.locator('.gp-feedback')).toContainText('Test 3: bestanden');
  }
});
test('Alle zehn Spuren prüfen eigene Aufgaben und unterscheiden Laufzeit von Ergänzung',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(()=>{
    rpChoosePath('all');const failures=[];
    for(const track of RP_PRACTICE_TRACKS.filter(t=>t.id!=='javascript')){
      rpPracticeStart(track.id);
      for(let i=0;i<track.tasks.length;i++){
        rpPractice.index=i;renderContent();
        document.querySelectorAll('[data-rp-gap]').forEach((input,index)=>input.value=track.tasks[i].answers[index][0]);
        rpPracticeCheck();
        if(!rpPractice.feedback.startsWith('Richtig'))failures.push(track.id+':'+i);
      }
    }
    return {tracks:RP_PRACTICE_TRACKS.length,tasks:RP_PRACTICE_TRACKS.reduce((n,t)=>n+t.tasks.length,0),failures};
  });
  expect(result).toEqual({tracks:15,tasks:45,failures:[]});
});
test('Lösung ansehen gibt keinen selbstständigen Abschluss und Entwurf bleibt erhalten',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  await page.evaluate(()=>{rpChoosePath('php');rpPracticeStart('php');});
  await page.getByLabel('Codeergänzung 1').fill('.');
  await page.getByRole('button',{name:'Hinweis',exact:true}).click();
  await expect(page.getByLabel('Codeergänzung 1')).toHaveValue('.');
  await page.getByRole('button',{name:'Lösung ansehen',exact:true}).click();
  await page.getByRole('button',{name:'Ergänzung prüfen'}).click();
  expect(await page.evaluate(()=>!!state.solved['guided:php:0'])).toBe(false);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
