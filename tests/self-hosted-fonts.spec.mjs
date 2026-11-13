import { test, expect } from '@playwright/test';

test('Startseite lädt keine Ressource von einem fremden Host', async ({ page, baseURL }) => {
  const origin = new URL(baseURL).origin;
  const foreign = [];
  // Loopback-Adressen (z. B. der optionale lokale Tutor auf localhost:8787, siehe script-04.js) sind keine Drittanbieter.
  page.on('request', (request) => { const url = new URL(request.url()); if (url.origin !== origin && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) && !/^(data|blob|about):/.test(request.url())) foreign.push(request.url()); });
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate(() => document.fonts.ready);
  expect(foreign).toEqual([]);
});

test('Schriften kommen vom eigenen Server und sind einsatzbereit', async ({ page }) => {
  const fontFiles = [];
  page.on('response', (response) => { if (/\.woff2$/.test(response.url())) fontFiles.push({ url: new URL(response.url()).pathname, status: response.status(), type: response.headers()['content-type'] }); });
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  const loaded = await page.evaluate(async () => {
    await Promise.all(['16px "IBM Plex Sans"', '600 16px "IBM Plex Sans"', '600 16px "Source Serif 4"', '14px "IBM Plex Mono"'].map((font) => document.fonts.load(font, 'Äöüß')));
    return ['16px "IBM Plex Sans"', '600 16px "Source Serif 4"', '14px "IBM Plex Mono"'].map((font) => document.fonts.check(font, 'Äöüß'));
  });
  expect(loaded).toEqual([true, true, true]);
  expect(fontFiles.length).toBeGreaterThan(0);
  expect(fontFiles.every((file) => file.url.startsWith('/assets/fonts/') && file.status === 200 && /font\/woff2|application/.test(file.type))).toBe(true);
});

test('Datenschutzseite nennt die Schriften als selbst gehostet', async ({ page }) => {
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate(() => { rechtTab = 'datenschutz'; selectLesson('recht'); });
  await expect(page.locator('.recht-text')).toContainText('selbst gehostet');
  await expect(page.locator('.recht-text')).not.toContainText('Google Fonts');
});
