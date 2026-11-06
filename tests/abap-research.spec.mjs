import { test, expect } from '@playwright/test';

test('Recherchierte ABAP-Lektionen haben Quellen, gültige Quizze und stabile IDs', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => {
    const additions = FLAT.filter(l => l.researchedAt);
    const failures = [];
    for (const lesson of additions) {
      state.currentId = lesson.id; renderContent();
      if (!document.querySelector('main h1')?.textContent.includes(lesson.title)) failures.push(lesson.id);
      if (!document.querySelector('main a[rel="noopener noreferrer"]')) failures.push(lesson.id + ':sources');
      if (!lesson.sources.length || !lesson.quiz.every(q => Number.isInteger(q.correct) && q.options[q.correct] && q.explain)) failures.push(lesson.id + ':schema');
      if (!lesson.quiz.every((q, i) => CARD_BY_ID[lesson.id + '#' + i])) failures.push(lesson.id + ':cards');
    }
    return { count:additions.length, quizzes:additions.reduce((n,l) => n+l.quiz.length,0), failures };
  });
  expect(result).toEqual({ count:22, quizzes:54, failures:[] });
});
