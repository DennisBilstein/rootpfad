import {test,expect} from '@playwright/test';
import {loadQuizBatches} from '../scripts/load-quiz-batches.mjs';

test('Vollständige Redaktionspakete sind korrekt integriert, Teilpakete nicht',async({page})=>{
  const batches=loadQuizBatches();
  await page.goto('/');await page.waitForFunction(()=>window.RP_APP_READY);
  const result=await page.evaluate(({lessons,extras})=>{
    const failures=[];
    for(const item of lessons){
      const lesson=lessonById(item.lesson),actual=lesson?.quiz[item.index];
      if(!actual||actual.q!==item.q||actual.correct!==item.correct||actual.rationales.length!==item.options.length)failures.push(item.lesson+'#'+item.index);
    }
    for(const item of extras){
      const card=CARD_BY_ID[item.extraId+'@2026-11-07-full-v3'];
      if(!card||card.q!==item.q||card.lessonId!==item.lesson||RP_QUIZ_CONTRACT_BY_ID[card.id]?.rationales.length!==item.options.length)failures.push(item.extraId);
    }
    return failures;
  },batches);
  expect(result).toEqual([]);
});
