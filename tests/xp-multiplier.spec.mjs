import { test, expect } from '@playwright/test';

const start = async (page) => { await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY); };

test('Vergebene XP sind verdoppelt, einmalige Vergaben zählen nur einmal', async ({ page }) => {
  await start(page);
  const result = await page.evaluate(() => {
    state.xp = 0; state.xpLog = {};
    const first = awardXp(10, 'Test', 'test:einmal');
    const second = awardXp(10, 'Test', 'test:einmal');
    const plain = awardXp(5, 'Test');
    return { factor: XP_FAKTOR, first, second, plain, xp: state.xp };
  });
  expect(result).toEqual({ factor: 2, first: 20, second: 0, plain: 10, xp: 30 });
});

test('Der Toast und das Abzeichen-Bonus nennen den verdoppelten Betrag', async ({ page }) => {
  await start(page);
  await page.evaluate(() => { state.xp = 0; state.xpLog = {}; state.badges = {}; awardXp(15, 'Toast-Test'); });
  await expect(page.locator('.t-xp', { hasText: '+30 XP' })).toBeVisible();
  const bonus = await page.evaluate(() => { const before = state.xp; grantBadge('xp1000'); return state.xp - before; });
  expect(bonus).toBe(50);
});

test('Texte mit festen XP-Beträgen zeigen die verdoppelten Werte', async ({ page }) => {
  await start(page);
  await page.evaluate(() => selectLesson('profile'));
  await expect(page.getByText('Lektion abschließen +100')).toBeVisible();
  await expect(page.getByText('Karteikarte gewusst +10')).toBeVisible();
  await expect(page.getByText('Abzeichen +50')).toBeVisible();
});
