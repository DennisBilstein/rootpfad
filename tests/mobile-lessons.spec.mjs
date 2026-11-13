import { test, expect } from '@playwright/test';

// Regression: Das Quiz (fieldset.qcard) machte Lektionen bei 375 px horizontal scrollbar.
for (const lessonId of ['html-m1-l1', 'abap-m7-l1', 'java-m25-l1']) {
  test(`Lektion ${lessonId} läuft bei 375 px nicht horizontal über`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.waitForFunction(() => window.RP_APP_READY);
    await page.evaluate((id) => selectLesson(id), lessonId);
    await expect(page.locator('fieldset.qcard').first()).toBeAttached();
    const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
