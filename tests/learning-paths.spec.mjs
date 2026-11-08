import { test, expect } from '@playwright/test';

test('Lernpfade filtern Navigation, Fortschritt und alle Aufgabenpools', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate(() => { state.completed.add('m1-l1'); state.completed.add('java-m1-l1'); });
  for (const path of ['java', 'abap', 'php', 'git', 'ap1', 'javascript', 'htmlcss', 'mariadb', 'apis', 'agents', 'all']) {
    await page.evaluate(path => rpChoosePath(path), path);
    await expect(page.locator('#rpPathSelect')).toHaveValue(path);
    const check = await page.evaluate(() => {
      const d = rpData();
      startReview('new');
      const reviewOK = review.queue.every(c => rpMatches(rpLessonPaths[c.lessonId]));
      state.currentId = 'intro'; render();
      return {
        modules: document.querySelectorAll('#moduleNav details.module').length,
        expected: d.modules.length,
        progress: document.getElementById('progressLabel').textContent,
        expectedProgress: d.lessons.filter(l => state.completed.has(l.id)).length + '/' + d.lessons.length,
        reviewOK,
        allStillPresent: MODULES.length === 116 && FLAT.length === 470,
      };
    });
    expect(check.modules).toBe(check.expected);
    expect(check.progress).toBe(check.expectedProgress);
    expect(check.reviewOK).toBe(true);
    expect(check.allStillPresent).toBe(true);
    await page.evaluate(() => startExam('pfad'));
    expect(await page.evaluate(() => exam.qs.length > 0 && exam.qs.every(c => rpMatches(rpLessonPaths[c.lessonId])))).toBe(true);
    await page.evaluate(() => { stopExamTimer(); exam.active = false; });
  }
  await page.evaluate(() => rpChoosePath('java'));
  await page.reload();
  await page.waitForFunction(() => window.RP_APP_READY);
  await expect(page.locator('#rpPathSelect')).toHaveValue('java');
  expect(errors).toEqual([]);
});

test('AP1-Prüfungen bleiben auch im Java-Pfad frei von Zusatzfragen', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate(() => rpChoosePath('java'));
  for (const mode of ['kurz', 'standard', 'ap1']) {
    await page.evaluate(mode => startExam(mode), mode);
    expect(await page.evaluate(() => exam.qs.length > 0 && exam.qs.every(c => rpLessonPaths[c.lessonId] === 'ap1'))).toBe(true);
    await page.evaluate(() => { stopExamTimer(); exam.active = false; });
  }
  await page.evaluate(() => { rpChoosePath('abap'); klStarten('kurz'); });
  expect(await page.evaluate(() => klausur.aufgaben.every(e => e.course === 'abap'))).toBe(true);
  await page.evaluate(() => { klUhrStoppen(); klausur.phase = 'start'; });
});

test('Mobile Pfadauswahl bleibt ohne horizontalen Überlauf bedienbar', async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate(() => { state.currentId = 'intro'; render(); });
  await page.getByRole('button', { name:/^Java Sprachkern/ }).click();
  await expect(page.getByRole('button', { name:/^Java Sprachkern/ })).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
