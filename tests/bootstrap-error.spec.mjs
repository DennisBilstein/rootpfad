import {test,expect} from '@playwright/test';
test('Fehlendes Appskript zeigt verständlichen Startfehler statt leerer Oberfläche',async({page})=>{
 await page.route('**/assets/competencies.js',route=>route.abort());
 await page.goto('/');await expect(page.getByRole('heading',{name:'ROOTPFAD konnte nicht vollständig starten'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Neu laden',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>window.RP_APP_READY===true)).toBe(false);
});
