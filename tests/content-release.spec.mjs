import {test,expect} from '@playwright/test';
import fs from 'node:fs';
test('Vollständiger Quizbestand ist revidiert und technische Längensignale sind bereinigt',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 const result=await page.evaluate(()=>({cards:CARDS.length,revised:CARDS.filter(c=>c.id.includes('@')).length,lessonQuestions:FLAT.reduce((n,l)=>n+l.quiz.length,0),extras:RP_EXTRA_REVISIONS.length,unique:new Set(CARDS.map(c=>c.id)).size}));
 expect(result).toEqual({cards:1559,revised:1559,lessonQuestions:1253,extras:306,unique:1559});
 const audit=JSON.parse(fs.readFileSync('content/quality/quiz-style-audit.json','utf8'));expect(audit.findings).toEqual([]);
});
test('Korrigierte Lektionskörper widersprechen zentralen Sonderfällen nicht',async({page})=>{
 await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
 expect(await page.evaluate(()=>lessonById('m13-l6').body.includes('nicht jedes denkbare IPv6-Teilnetz'))).toBe(true);
 expect(await page.evaluate(()=>lessonById('m16-l4').body.includes('nach Bekanntwerden'))).toBe(true);
});
