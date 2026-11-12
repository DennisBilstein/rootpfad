import { test, expect } from '@playwright/test';

test('Expertenpfade sind vollständig, eindeutig und im Training verfügbar', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  const summary = await page.evaluate(() => {
    const unique = list => new Set(list.map(x => x.id)).size === list.length;
    const experts = MODULES.filter(m => ['abap','java'].includes(m.course));
    return {
      modules: experts.length,
      lessons: experts.flatMap(m => m.lessons).length,
      quizzes: experts.flatMap(m => m.lessons).reduce((n, l) => n + (l.quiz || []).length, 0),
      cards: CARDS.filter(c => /^(abap|java)-/.test(c.lessonId)).length,
      exercises: EXERCISES.filter(e => e.course).length,
      traces: TRACES.filter(t => t.course).length,
      unique: [MODULES, FLAT, CARDS, EXERCISES, TRACES].every(unique),
      references: CARDS.every(c => CARD_BY_ID[c.id] && lessonById(c.lessonId)),
      parts: experts.every(m => PARTS.includes(m.part) && m.part >= 10),
    };
  });
  expect(summary).toMatchObject({ modules: 46, lessons: 178, exercises: 36, traces: 9, unique: true, references: true, parts: true });
  expect(summary.cards).toBe(summary.quizzes + 92);

  // Render every imported lesson, including all code/text block combinations.
  const failures = await page.evaluate(() => {
    const failures = [];
    MODULES.filter(m => m.course).forEach(m => m.lessons.forEach(l => {
      try {
        state.currentId = l.id;
        renderContent();
        if (document.querySelector('main h1')?.textContent !== l.title) failures.push(l.id);
        if (document.querySelectorAll('fieldset.qcard').length !== (l.quiz || []).length) failures.push(l.id + ':quiz');
      } catch (e) { failures.push(l.id + ':' + e.message); }
    }));
    return failures;
  });
  expect(failures).toEqual([]);

  for (const id of ['abap-m1-l1', 'java-m1-l1']) {
    await page.evaluate(id => selectLesson(id), id);
    await expect(page.locator('main h1')).toHaveText('Pseudocode-Grundlagen (IHK-Konvention)');
    await expect(page.locator(`input[name="rq_${id}_0"]`).first()).toBeAttached();
    const correct = await page.evaluate(id => lessonById(id).quiz.map(q => q.correct), id);
    for (let i = 0; i < correct.length; i++) {
      await page.evaluate(({id,i})=>rpQuizReveal(id,i),{id,i});
      await page.locator(`input[name="rq_${id}_${i}"][value="${correct[i]}"]`).check();
    }
    await page.evaluate(id => checkQuiz(id), id);
    await expect(page.locator('.qfeedback.correct')).toHaveCount(correct.length);
    expect(await page.evaluate(id => !!state.srs[rpQuestionId(lessonById(id),0)], id)).toBe(true);
  }
  await page.evaluate(() => selectLesson('exercises'));
  await expect(page.locator('main')).toContainText('ABAP · Summe aller geraden Zahlen');
  await expect(page.locator('main')).toContainText('Java · Summe aller geraden Zahlen');
  await page.evaluate(() => selectLesson('cheatsheet'));
  await expect(page.locator('#spickzettel-abap')).toBeAttached();
  await expect(page.locator('#spickzettel-java')).toBeAttached();
  expect(errors).toEqual([]);
});
