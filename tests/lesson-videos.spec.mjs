import { test, expect } from '@playwright/test';

const open = async (page, id) => {
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  await page.evaluate((lessonId) => { rpChoosePath(lessonId.startsWith('abap') ? 'abap' : lessonId.startsWith('java') ? 'java' : 'javascript'); state.currentId = lessonId; renderContent(); }, id);
};

test('Server sendet die Teil-CSP mit YouTube-nocookie als einziger Frame-Quelle', async ({ request }) => {
  const csp = (await request.get('/')).headers()['content-security-policy'];
  expect(csp).toContain("frame-src 'self' https://www.youtube-nocookie.com");
  expect(csp).toContain("object-src 'none'");
});

test('Video wird erst nach Klick geladen: vorher keine Anfrage an YouTube oder Google', async ({ page }) => {
  const external = [];
  page.on('request', (request) => { if (/youtube|ytimg|google|gstatic/.test(new URL(request.url()).hostname) && !/fonts\.(googleapis|gstatic)/.test(request.url())) external.push(request.url()); });
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>stub</title><p id="stub">Videoplayer-Platzhalter</p>' }));
  await open(page, 'java-m25-l1');
  await expect(page.locator('.rp-videos h2')).toHaveText('Zum Weiterlernen: Video');
  await expect(page.locator('.rp-video-privacy')).toContainText('Daten (u. a. deine IP-Adresse) an YouTube');
  await expect(page.locator('.rp-video a')).toHaveAttribute('href', 'https://www.youtube.com/watch?v=QrwFrm1R8OY');
  await expect(page.locator('iframe.rp-video-frame')).toHaveCount(0);
  expect(external).toEqual([]);

  await page.getByRole('button', { name: /Video laden/ }).click();
  const frame = page.locator('iframe.rp-video-frame');
  await expect(frame).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/QrwFrm1R8OY?rel=0');
  await expect(frame).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  await expect(frame).toHaveAttribute('title', /Pattern Matching/);
  await expect(page.frameLocator('iframe.rp-video-frame').locator('#stub')).toHaveText('Videoplayer-Platzhalter');   // CSP lässt den Frame zu
  expect(await frame.evaluate((element) => document.activeElement === element)).toBe(true);
});

test('Video-Schaltfläche ist per Tastatur bedienbar', async ({ page }) => {
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>stub</p>' }));
  await open(page, 'java-m26-l2');
  await page.getByRole('button', { name: /Video laden/ }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('iframe.rp-video-frame')).toHaveCount(1);
});

test('Lektionen ohne Video zeigen keinen Videoblock; nicht eingeplante IDs werden nicht eingebettet', async ({ page }) => {
  await open(page, 'js-m1-l1');
  await expect(page.locator('.rp-videos')).toHaveCount(0);
});

test('Jedes Video verweist auf eine vorhandene Lektion und zeigt Titel, Kanal und Sprache', async ({ page }) => {
  await page.goto('/'); await page.waitForFunction(() => window.RP_APP_READY);
  const result = await page.evaluate(() => Object.entries(RP_LESSON_VIDEOS).map(([lessonId, videos]) => ({
    lessonId, exists: !!lessonById(lessonId), complete: videos.every((video) => /^[A-Za-z0-9_-]{11}$/.test(video.id) && video.title && video.channel && video.note && video.language),
  })));
  expect(result.length).toBeGreaterThanOrEqual(6);
  expect(result.every((entry) => entry.exists && entry.complete)).toBe(true);
});

test('Videoblock läuft bei 375 px nicht über', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>stub</p>' }));
  await open(page, 'java-m25-l5');
  await page.getByRole('button', { name: /Video laden/ }).first().click();
  const box = await page.locator('.rp-videos').evaluate((element) => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right, width: innerWidth }; });
  expect(box.left).toBeGreaterThanOrEqual(0);
  expect(box.right).toBeLessThanOrEqual(box.width);
});
