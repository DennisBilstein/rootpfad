import { test, expect } from '@playwright/test';
test('PHP-Werkstatt und JavaScript-Einstieg enthalten Ziele, drei Übungen und Quiz',async({page})=>{
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  for(const [path,id] of [['php','m52-l1'],['javascript','js-m1-l1']]){
    await page.evaluate(({path,id})=>{rpChoosePath(path);state.currentId=id;renderContent();},{path,id});
    await expect(page.locator('main')).toContainText('Lernziele');
    await expect(page.locator('main')).toContainText('Drei Übungen');
    await expect(page.locator('fieldset.qcard')).toHaveCount(3);
    expect(await page.evaluate(id=>lessonById(id).objectives.length,id)).toBe(4);
  }
  await expect(page.locator('#rpPathSelect')).toHaveValue('javascript');
});
