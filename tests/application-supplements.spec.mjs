import {test,expect} from '@playwright/test';
test('Fachvertiefungen erhalten Bestand und enthalten konkrete Abnahmefälle',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 const result=await page.evaluate(()=>({lessons:FLAT.length,items:RP_APPLICATION_SUPPLEMENTS.map(s=>({id:s.id,body:FLAT.find(l=>l.id===s.id).body2}))}));
 expect(result.lessons).toBe(470);expect(result.items).toHaveLength(3);
 for(const item of result.items){expect(item.body).toContain('Normalfall:');expect(item.body).toContain('Grenzfall:');expect(item.body).toContain('Fehlerfall:');expect(item.body).toContain('Selbsttest:');}
 expect(result.items[0].body).toContain('DNS-Rebinding');expect(result.items[1].body).toContain('no-store');expect(result.items[2].body).toContain('UNIQUE');
});
