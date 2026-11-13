import { test, expect } from '@playwright/test';

const open = async (page, id) => {
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate((lessonId) => { rpChoosePath(lessonId.startsWith('java') ? 'java' : 'javascript'); state.currentId = lessonId; renderContent(); }, id);
};
const card = (page, id) => page.locator(`[data-puzzle="${id}"]`);

test('Fehler finden: falsche Antwort gibt nur einen Tipp, richtige erklärt und vergibt XP genau einmal', async ({ page }) => {
  await open(page, 'js-m4-l4');
  const puzzle = card(page, 'js-m4-l4-destructured-reactive');
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).click();
  await expect(puzzle.locator('.rp-feedback')).toHaveText('Wähle zuerst eine Zeile aus.');
  await puzzle.getByRole('radio', { name: /Zeile 4:/ }).check();
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).click();
  await expect(puzzle.locator('.rp-feedback')).toContainText('Nicht ganz. Tipp:');
  await expect(puzzle.locator('.rp-feedback')).not.toContainText('toRefs');       // Lösung wird nicht verraten
  const xpBefore = await page.evaluate(() => state.xp || 0);
  await puzzle.getByRole('radio', { name: /Zeile 2:/ }).check();
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).click();
  await expect(puzzle.locator('.rp-feedback')).toContainText('Richtig: Zeile 2.');
  await expect(puzzle.locator('.rp-feedback')).toContainText('toRefs');
  await expect(puzzle.locator('.rp-feedback')).toContainText('Geprüft: vue-lab');
  await expect(puzzle.locator('.rp-solved')).toBeVisible();
  expect(await page.evaluate(() => state.xp || 0)).toBe(xpBefore + 10);
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).click();            // erneut prüfen: keine zweite Belohnung
  expect(await page.evaluate(() => state.xp || 0)).toBe(xpBefore + 10);
  await open(page, 'js-m4-l4');                                                    // gelöst bleibt nach Neurendern sichtbar
  await expect(card(page, 'js-m4-l4-destructured-reactive').locator('.rp-solved')).toBeVisible();
});

test('Zeilen ordnen: Prüfung nennt die Trefferzahl, Pfeiltasten verschieben und kündigen die Position an', async ({ page }) => {
  await open(page, 'js-m4-l2');
  const puzzle = card(page, 'js-m4-l2-order-auth-fetch');
  await puzzle.getByRole('button', { name: 'Reihenfolge prüfen' }).click();
  await expect(puzzle.locator('.rp-feedback')).toContainText('von 7 Zeilen stehen an der richtigen Stelle');
  const order = () => puzzle.locator('.rp-order li').evaluateAll((items) => items.map((item) => item.dataset.orig));
  expect(await order()).toEqual(['4', '0', '6', '2', '5', '3', '1']);
  await puzzle.getByRole('button', { name: /Nach oben: async function authFetch/ }).click();
  expect(await order()).toEqual(['0', '4', '6', '2', '5', '3', '1']);
  await expect(puzzle.locator('.rp-feedback')).toContainText('steht jetzt an Position 1 von 7');
  await expect(puzzle.getByRole('button', { name: /Nach oben: async function authFetch/ })).toBeFocused();
  // restliche Zeilen in die richtige Reihenfolge bringen (Selection-Sort über die Pfeil-Schaltflächen)
  for (let target = 1; target < 7; target++) {
    for (let guard = 0; guard < 10; guard++) {
      const current = await order();
      const at = current.indexOf(String(target));
      if (at === target) break;
      await puzzle.locator('.rp-order li').nth(at).locator('[data-rp-move="-1"]').click();
    }
  }
  expect(await order()).toEqual(['0', '1', '2', '3', '4', '5', '6']);
  await puzzle.getByRole('button', { name: 'Reihenfolge prüfen' }).click();
  await expect(puzzle.locator('.rp-feedback')).toContainText('Richtig, alle 7 Zeilen');
  await expect(puzzle.locator('.rp-solved')).toBeVisible();
});

test('Lösung zeigen erklärt, vergibt aber keine XP und markiert nicht als gelöst', async ({ page }) => {
  await open(page, 'java-m25-l1');
  const puzzle = card(page, 'java-m25-l1-dominated-case');
  const xpBefore = await page.evaluate(() => state.xp || 0);
  await puzzle.getByRole('button', { name: /Lösung mit Erklärung zeigen/ }).click();
  await expect(puzzle.locator('.rp-feedback')).toContainText('dominiert');
  await expect(puzzle.getByRole('radio', { name: /Zeile 4:/ })).toBeChecked();
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).click();            // nach der Lösungsansicht: keine Belohnung
  expect(await page.evaluate(() => state.xp || 0)).toBe(xpBefore);
  await expect(puzzle.locator('.rp-solved')).toBeHidden();
});

test('Daten sind vollständig: jede Aufgabe verweist auf eine Lektion, Reihenfolgen sind echte Permutationen', async ({ page }) => {
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => {
    const entries = Object.entries(RP_PUZZLES);
    return {
      lessons: entries.every(([lessonId]) => !!lessonById(lessonId)),
      count: entries.reduce((sum, [, list]) => sum + list.length, 0),
      order: entries.flatMap(([, list]) => list).filter((p) => p.type === 'order').every((p) => [...p.scramble].sort((a, b) => a - b).every((v, i) => v === i)),
    };
  });
  expect(result).toEqual({ lessons: true, count: 7, order: true });
});

test('Denkaufgaben laufen bei 375 px nicht über und sind per Tastatur bedienbar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await open(page, 'java-m25-l2');
  const box = await page.locator('.rp-puzzles').evaluate((element) => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: innerWidth }; });
  expect(box.left).toBeGreaterThanOrEqual(0);
  expect(box.right).toBeLessThanOrEqual(box.width);
  const puzzle = card(page, 'java-m25-l2-non-exhaustive-switch');
  await puzzle.getByRole('radio', { name: /Zeile 6:/ }).focus();
  await page.keyboard.press('Space');
  await puzzle.getByRole('button', { name: 'Antwort prüfen' }).focus();
  await page.keyboard.press('Enter');
  await expect(puzzle.locator('.rp-feedback')).toContainText('Richtig: Zeile 6.');
});
