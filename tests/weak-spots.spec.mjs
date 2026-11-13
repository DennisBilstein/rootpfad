import { test, expect } from '@playwright/test';

const start = async (page) => { await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY); };

test('Ohne Lerndaten zeigt das Fehlerheft leere, erklärende Zustände', async ({ page }) => {
  await start(page);
  await page.evaluate(() => { state.stats = {}; state.srs = {}; selectLesson('fehler'); });
  await expect(page.locator('#wsPlan')).toBeVisible();
  await expect(page.locator('.ws-panel').first()).toContainText('Noch keine Karten eingeplant');
  await expect(page.locator('.ws-panel').nth(1)).toContainText('Keine Lektion mit mindestens 3 Antworten');
  await expect(page.getByRole('heading', { name: 'Fehlerheft' })).toBeVisible();
});

test('Wiederholplan verteilt fällige Karten auf 7 Tage, Überfälliges zählt zu Heute', async ({ page }) => {
  await start(page);
  await page.evaluate(() => {
    const day = 86400000, base = today0();
    const ids = CARDS.slice(0, 6).map((card) => card.id);
    state.stats = {};
    state.srs = {
      [ids[0]]: { ease: 2.5, iv: 1, due: base - 3 * day, reps: 1, lapses: 0 },   // überfällig -> Heute
      [ids[1]]: { ease: 2.5, iv: 1, due: base, reps: 1, lapses: 0 },
      [ids[2]]: { ease: 2.5, iv: 1, due: base + day, reps: 1, lapses: 0 },
      [ids[3]]: { ease: 2.5, iv: 1, due: base + 6 * day, reps: 1, lapses: 0 },
      [ids[4]]: { ease: 2.5, iv: 1, due: base + 7 * day, reps: 1, lapses: 0 },   // außerhalb des Fensters
      ghost: { ease: 2.5, iv: 1, due: base, reps: 1, lapses: 0 },                // unbekannte Karte wird ignoriert
    };
    selectLesson('fehler');
  });
  await expect(page.locator('#wsPlan ~ table')).toBeVisible();                       // Ansichtswechsel läuft asynchron
  const rows = await page.locator('#wsPlan ~ table tbody tr').evaluateAll((items) => items.map((row) => [row.querySelector('th').textContent, row.querySelector('td').textContent]));
  expect(rows).toHaveLength(7);
  expect(rows[0]).toEqual(['Heute (inkl. Überfälliges)', '2']);
  expect(rows[1]).toEqual(['Morgen', '1']);
  expect(rows[6][1]).toBe('1');
  expect(rows.slice(2, 6).map((row) => row[1])).toEqual(['0', '0', '0', '0']);
});

test('Schwächste Lektionen: nur ab 3 Antworten und unter 80 %, sortiert, mit Direktlink zur Lektion', async ({ page }) => {
  await start(page);
  const expected = await page.evaluate(() => {
    const lessons = {};
    CARDS.forEach((card) => { (lessons[card.lessonId] ||= []).push(card); });
    const [weakId, okId, fewId] = Object.entries(lessons).filter(([, list]) => list.length >= 3).slice(0, 3).map(([id]) => id);
    state.srs = {}; state.stats = {};
    lessons[weakId].slice(0, 3).forEach((card, i) => { state.stats[card.id] = { right: i === 0 ? 1 : 0, wrong: 2 }; });   // 1 von 7 richtig
    lessons[okId].slice(0, 3).forEach((card) => { state.stats[card.id] = { right: 5, wrong: 0 }; });                    // 100 %
    lessons[fewId].slice(0, 1).forEach((card) => { state.stats[card.id] = { right: 0, wrong: 2 }; });                    // nur 2 Antworten
    selectLesson('fehler');
    return { weakId, okId, fewId, title: lessonById(weakId).title };
  });
  const rows = page.locator('#wsWeak ~ table tbody tr');
  await expect(rows).toHaveCount(1);
  await expect(rows.first().locator('th')).toHaveText(expected.title);
  await expect(rows.first().locator('td').nth(0)).toHaveText('1 / 6');
  await expect(rows.first().locator('td').nth(1)).toHaveText('14 %');
  await rows.first().getByRole('button', { name: /Lektion öffnen/ }).click();
  expect(await page.evaluate(() => state.currentId)).toBe(expected.weakId);
});

test('Übersichten laufen bei 375 px nicht über', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await start(page);
  await page.evaluate(() => {
    const ids = CARDS.filter((card) => card.lessonId === CARDS[0].lessonId).slice(0, 3).map((card) => card.id);
    state.stats = Object.fromEntries(ids.map((id) => [id, { right: 0, wrong: 2 }]));
    state.srs = { [ids[0]]: { ease: 2.5, iv: 1, due: today0(), reps: 1, lapses: 0 } };
    selectLesson('fehler');
  });
  const box = await page.locator('.ws-panel').first().evaluate((element) => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: innerWidth }; });
  expect(box.left).toBeGreaterThanOrEqual(0);
  expect(box.right).toBeLessThanOrEqual(box.width);
  await expect(page.locator('.ws-panel').nth(1).locator('tbody tr').first()).toBeVisible();
});
