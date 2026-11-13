import { test, expect } from '@playwright/test';

// Regression: gültiger <head>, Startseiten-Struktur, keine Konsolenfehler, keine Layout-Sprünge beim Start.

test('index.html: title, charset und Meta-Description stehen im head', async ({ page }) => {
  await page.goto('/');
  const head = await page.evaluate(() => ({
    title: document.head.querySelector('title')?.textContent ?? '',
    charset: document.head.querySelector('meta[charset]')?.getAttribute('charset') ?? '',
    description: document.head.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    stylesheets: document.head.querySelectorAll('link[rel="stylesheet"]').length,
    strayInBody: document.body.querySelectorAll(':scope > title, :scope > meta, :scope > link[rel="icon"]').length,
  }));
  expect(head.title.length).toBeGreaterThan(10);
  expect(head.charset.toLowerCase()).toBe('utf-8');
  expect(head.description.length).toBeGreaterThan(50);
  expect(head.stylesheets).toBe(3);
  expect(head.strayInBody).toBe(0);
});

for (const width of [375, 1280]) {
  test(`Start bei ${width} px: eine h1, Footer mit Rechtslink, keine Konsolenfehler, keine Layout-Sprünge`, async ({ page }) => {
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('requestfailed', (r) => errors.push(`failed: ${r.url()}`));
    await page.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.waitForFunction(() => window.RP_APP_READY);
    await page.waitForTimeout(1500);

    await expect(page.locator('h1')).toHaveCount(1);
    const link = page.locator('footer.site-footer a[href="#/recht"]');
    await expect(link).toBeVisible();
    expect(await page.evaluate(() => window.__cls)).toBeLessThan(0.05);
    expect(errors).toEqual([]);

    await link.click();
    await expect(page.locator('h1')).toHaveText(/Impressum/);
  });
}

test('Der lokale Tutor-Server wird beim Start nicht abgefragt', async ({ page }) => {
  const urls = [];
  page.on('request', (r) => urls.push(r.url()));
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  await page.waitForTimeout(1500);
  expect(urls.filter((u) => u.includes(':8787'))).toEqual([]);
});

test('Server setzt Sicherheits- und Cache-Header', async ({ request }) => {
  const page = await request.get('/');
  const h = page.headers();
  expect(h['permissions-policy']).toContain('camera=()');
  expect(h['cross-origin-opener-policy']).toBe('same-origin');
  expect(h['cross-origin-resource-policy']).toBe('same-origin');
  expect(h['strict-transport-security']).toBeUndefined(); // nur in Produktion über HTTPS
  expect(h['cache-control']).toBe('no-cache');
  expect((await request.get('/assets/style-02.css')).headers()['cache-control']).toBe('no-cache');
  expect((await request.get('/assets/fonts/ibm-plex-sans-variable-latin.woff2')).headers()['cache-control']).toContain('max-age=2592000');
});
