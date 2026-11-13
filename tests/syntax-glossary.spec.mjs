import { test, expect } from '@playwright/test';

const open = async (page, { viaMenu = true } = {}) => {
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  if (viaMenu) await page.locator('#navGlossar').click();
  else await page.evaluate(() => selectLesson('glossar')); // schmaler Bildschirm: Menü liegt im Schubfach
  await expect(page.getByRole('heading', { level: 1, name: 'Syntax-Glossar' })).toBeVisible();
  await expect(page.locator('.gl-entry').first()).toBeVisible(); // Daten werden erst beim Öffnen nachgeladen
};

test('Navigation öffnet das Glossar und markiert den Menüpunkt als aktuelle Seite', async ({ page }) => {
  await open(page);
  await expect(page.locator('#navGlossar')).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('#glStatus')).toContainText('Einträge in HTML');
  await expect(page.locator('.gl-lang[aria-pressed="true"]')).toHaveText('HTML');
  await expect(page.locator('.gl-entry').first()).toBeVisible();
});

test('Sprachwechsel zeigt nur Einträge der gewählten Sprache; die Tastatur genügt', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'JavaScript / TypeScript' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#glStatus')).toContainText('in JavaScript / TypeScript');
  await expect(page.locator('#gl-js-const')).toBeVisible();
  await expect(page.locator('#gl-git-status')).toHaveCount(0);
  await page.getByRole('button', { name: 'Git', exact: true }).click();
  await expect(page.locator('#gl-git-status')).toBeVisible();
  await expect(page.locator('#gl-js-const')).toHaveCount(0);
});

test('Suche und Kategorie filtern die Liste; leere Ergebnisse werden erklärt', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'Git', exact: true }).click();
  await page.getByLabel('Befehl suchen').fill('rebase');
  await expect(page.locator('#glStatus')).toContainText('für „rebase“');
  await expect(page.locator('#gl-git-rebase')).toBeVisible();
  await page.getByLabel('Befehl suchen').fill('qqqxyz');
  await expect(page.locator('#glStatus')).toContainText('Keine Treffer');
  await expect(page.locator('.gl-entry')).toHaveCount(0);
  await page.getByLabel('Befehl suchen').fill('');
  await page.getByLabel('Kategorie').selectOption('Branches');
  const kategorien = await page.locator('.gl-entry .gl-meta').allTextContents();
  expect(kategorien.length).toBeGreaterThan(2);
  expect(kategorien.every((text) => text.trim() === 'Branches')).toBe(true);
});

test('Suche in allen Sprachen nennt die Sprache und sortiert Titeltreffer nach vorn', async ({ page }) => {
  await open(page);
  await page.getByLabel('In allen Sprachen suchen').check();
  await page.getByLabel('Befehl suchen').fill('join');
  await expect(page.locator('#glStatus')).toContainText('Treffer in allen Sprachen');
  await expect(page.getByLabel('Kategorie')).toBeDisabled();
  const meta = await page.locator('.gl-entry .gl-meta').allTextContents();
  expect(meta.some((text) => text.startsWith('SQL (MariaDB)'))).toBe(true);
  await expect(page.locator('.gl-entry').first().locator('h3')).toContainText(/JOIN/);
});

test('Der Link zur Lektion öffnet die passende Lektion', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'JavaScript / TypeScript' }).click();
  await page.locator('#gl-js-const .gl-lesson').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('JavaScript-Einheit 1');
});

test('Gekennzeichnet wird, ob ein Beispiel ausgeführt wurde', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'ABAP' }).click();
  await expect(page.locator('#glNotice')).toContainText('nicht in einem SAP-System ausgeführt');
  await expect(page.locator('.gl-badge-ok')).toHaveCount(0);
  await expect(page.locator('.gl-badge').first()).toHaveText('Beispiel nicht ausgeführt');
  await page.getByRole('button', { name: 'PHP', exact: true }).click();
  await expect(page.locator('#gl-php-echo .gl-badge-ok')).toHaveText('Beispiel getestet mit PHP');
});

test('Die großen Glossardaten werden erst beim Öffnen des Glossars geladen', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => { if (request.url().includes('syntax-glossary-data.js')) requests.push(request.url()); });
  await page.goto('/');
  await page.waitForFunction(() => window.RP_APP_READY);
  expect(requests).toHaveLength(0);
  await page.locator('#navGlossar').click();
  await expect(page.locator('.gl-entry').first()).toBeVisible();
  expect(requests).toHaveLength(1);
});

test('Daten sind konsistent: eindeutige IDs, vorhandene Lektionen, Pflichtfelder', async ({ page }) => {
  await open(page);
  const result = await page.evaluate(() => {
    const ids = new Set(), problems = [];
    for (const language of RP_GLOSSARY) {
      for (const entry of language.entries) {
        if (ids.has(entry.id)) problems.push('doppelt ' + entry.id);
        ids.add(entry.id);
        if (!lessonById(entry.lesson)) problems.push('Lektion fehlt ' + entry.id);
        for (const key of ['cat', 'term', 'syntax', 'text', 'code']) if (!entry[key]) problems.push(key + ' leer ' + entry.id);
      }
    }
    return { count: ids.size, languages: RP_GLOSSARY.length, problems };
  });
  expect(result.problems).toEqual([]);
  expect(result.languages).toBe(12);
  expect(result.count).toBeGreaterThan(600);
});

test('Code wird eingefärbt, und bei 375 px läuft in keiner Sprache die Seite über', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await open(page, { viaMenu: false });
  const labels = await page.locator('.gl-lang').allTextContents();
  expect(labels).toHaveLength(12);
  for (const label of labels) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('.gl-entry').first()).toBeVisible();
    await expect(page.locator('.gl-example.rp-tokyo').first()).toBeVisible();
    const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - innerWidth);
    expect(overflow, `Überlauf in ${label}`).toBeLessThanOrEqual(0);
  }
});

test('Bedienelemente sind mindestens 44 px hoch', async ({ page }) => {
  await open(page);
  const sizes = await page.locator('.gl-lang, #glSearch, #glCat').evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
  expect(sizes.every((height) => height >= 43.5)).toBe(true);
});
