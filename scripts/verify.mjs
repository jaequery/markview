import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const requests = [];
const errors = [];
page.on('request', request => requests.push(request.url()));
page.on('pageerror', error => errors.push(error.message));
const response = await page.goto(base);
const checks = {
  pjsg2: async () => {
    assert.equal(await page.locator('main section').count(), 4);
    assert.equal(await page.locator('.capability').count(), 4);
    assert.equal(await page.locator('.project').count(), 3);
    assert.equal(await page.locator('.about > p').count(), 3);
    assert.equal(await page.locator('.contact-button').count(), 1);
    const styles = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const panel = getComputedStyle(document.querySelector('.panel'));
      const h1 = getComputedStyle(document.querySelector('h1'));
      return { colors: ['--background','--surface','--text','--muted','--accent','--accent-ink','--border'].map(p => root.getPropertyValue(p).trim()), radius: panel.borderRadius, padding: panel.padding, font: root.fontFamily, size: h1.fontSize, weight: h1.fontWeight, columns: getComputedStyle(document.querySelector('.capability-grid')).gridTemplateColumns.split(' ').length };
    });
    assert.deepEqual(styles.colors.map(color => color.toUpperCase()), ['#0B0D10','#13171C','#E8EDF2','#8B97A5','#5CE6A8','#06110C','#242C35']);
    assert.equal(styles.radius, '6px'); assert.equal(styles.padding, '20px 22px');
    assert.equal(styles.size, '48px'); assert.equal(styles.weight, '600'); assert.equal(styles.columns, 2);
    assert.match(styles.font, /monospace/);
  },
  on7vr: async () => {
    const pkg = JSON.parse(await readFile('package.json', 'utf8'));
    assert.equal(pkg.dependencies.next, '16.3.4');
    assert.ok(pkg.dependencies.react); assert.ok(pkg.devDependencies.typescript);
    for (const file of ['app/page.tsx','app/layout.tsx']) assert.doesNotMatch(await readFile(file, 'utf8'), /["']use client["']/);
    assert.match(await readFile('app/globals.css','utf8'), /--accent:/);
  },
  ivw5y: async () => {
    for (const hash of ['#home', '#work', '#about', '#contact']) {
      await page.locator(`nav a[href="${hash}"]`).click();
      assert.equal(new URL(page.url()).hash, hash);
      assert.ok(await page.locator(hash).isVisible());
    }
    assert.equal(await page.locator('a[href="mailto:alex@example.com"]').count(), 2);
    assert.equal(await page.locator('img').count(), 0);
    assert.deepEqual(errors, []);
  },
  mrhuc: async () => {
    for (let width = 360; width <= 1920; width += 10) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 360, height: 800 });
    assert.equal(await page.locator('.capability-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 1);
    await page.setViewportSize({ width: 1440, height: 1000 });
  },
  paovo: async () => {
    const result = await page.evaluate(() => {
      const rgb = s => s.match(/[\d.]+/g).slice(0,3).map(Number);
      const luminance = c => c.map(x => x / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((n,x,i) => n + x * [.2126,.7152,.0722][i], 0);
      const failures = []; let minimum = Infinity; let count = 0;
      for (const el of document.querySelectorAll('body *')) {
        if (el.closest('[aria-hidden="true"]') || ![...el.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()) || ['SCRIPT','STYLE'].includes(el.tagName)) continue;
        const s = getComputedStyle(el);
        let ancestor = el, bg;
        while (ancestor) { bg = getComputedStyle(ancestor).backgroundColor; if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') break; ancestor = ancestor.parentElement; }
        const a = luminance(rgb(s.color)), b = luminance(rgb(bg));
        const ratio = (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && parseInt(s.fontWeight) >= 700);
        count++; minimum = Math.min(minimum,ratio);
        if (ratio < (large ? 3 : 4.5)) failures.push({text:el.textContent.slice(0,60),ratio});
      }
      return { failures, minimum, count };
    });
    assert.deepEqual(result.failures, []); assert.ok(result.count > 40); console.log(JSON.stringify(result));
  },
  p3wxk: async () => {
    await page.goto(base);
    const expected = await page.locator('a').count();
    for (let i = 0; i < expected; i++) {
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => { const el = document.activeElement, s = getComputedStyle(el); return { tag: el.tagName, color: s.outlineColor, style: s.outlineStyle, width: s.outlineWidth }; });
      assert.equal(focus.tag, 'A'); assert.equal(focus.color, 'rgb(92, 230, 168)'); assert.equal(focus.style, 'solid'); assert.equal(focus.width, '2px');
    }
    await page.goto(base); await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
  },
  aem8e: async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.ok(await page.locator('body *').evaluateAll(elements => elements.every(el => {const s = getComputedStyle(el); return s.transitionDuration === '0s' && s.animationDuration === '0s';})));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    assert.equal(await page.locator('.contact-button').evaluate(el => getComputedStyle(el).transitionDuration), '0.15s');
  },
  gjgf8: async () => {
    const copy = await page.locator('main').innerText();
    assert.doesNotMatch(copy, /lorem ipsum|\bTODO\b|placeholder|coming soon/i);
    for (const text of ['12 weeks', '32%', '140 milliseconds', '45 minutes to 8', 'I’d rather leave behind']) assert.ok(copy.includes(text), text);
    assert.ok(copy.split(/\s+/).length > 400);
  },
  p8f4w: async () => {
    assert.deepEqual(requests.filter(url => new URL(url).origin !== new URL(base).origin), []);
    assert.equal(await page.locator('img, svg, link[rel="stylesheet"][href^="http"]').count(), 0);
    assert.ok(await page.locator('body *').evaluateAll(elements => elements.every(el => getComputedStyle(el).fontFamily.includes('monospace'))));
  },
  hhb05: async () => {
    assert.equal(response.status(), 200); assert.deepEqual(errors, []);
    await mkdir('artifacts', { recursive: true });
    await page.goto(base);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true });
  },
};
try {
  const selected = process.argv[2];
  if (selected) assert.ok(checks[selected], `Unknown check: ${selected}`);
  for (const [id, check] of Object.entries(checks)) {
    if (selected && selected !== id) continue;
    await check(); console.log(`PASS ${id}`);
  }
} finally { await browser.close(); }
