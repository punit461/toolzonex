// One-off audit tool: crawls every static route in src/app against a running
// `next dev` server, at desktop + mobile viewports, and reports console
// errors, uncaught exceptions, HTTP failures, horizontal overflow (mobile
// layout breaks), and suspiciously empty pages.
//
// Usage: node scripts/audit-crawl.mjs [--port 3100] [--out /path/to/report]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readdirSync, statSync, writeFileSync, appendFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : fallback;
};
const PORT = getArg('--port', '3100');
const OUT_DIR = getArg('--out', path.resolve(process.cwd(), 'audit-out'));
const LIMIT = getArg('--limit', null);
const BASE_URL = `http://localhost:${PORT}`;

function findRoutes(dir, base = '') {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('[')) continue; // skip dynamic segments
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...findRoutes(full, `${base}/${entry}`));
    } else if (entry === 'page.tsx') {
      routes.push(base === '' ? '/' : base);
    }
  }
  return routes;
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Dev server did not come up in time');
}

async function auditRoute(browser, route) {
  const result = { route, desktop: {}, mobile: {} };

  for (const [key, viewport] of Object.entries({
    desktop: { width: 1280, height: 800 },
    mobile: { width: 375, height: 812 },
  })) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300));
    });
    page.on('pageerror', (err) => pageErrors.push(String(err).slice(0, 300)));

    let httpStatus = null;
    let bodyLength = 0;
    let overflowPx = 0;
    let finalUrl = '';
    let timedOut = false;

    try {
      const resp = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle',
        timeout: 20000,
      });
      httpStatus = resp ? resp.status() : null;
      finalUrl = page.url();
      await page.waitForTimeout(300); // let async client redirects settle

      bodyLength = await page.evaluate(() => document.body?.innerText?.trim().length ?? 0);

      if (key === 'mobile') {
        overflowPx = await page.evaluate(() => {
          const doc = document.documentElement;
          return Math.max(0, doc.scrollWidth - doc.clientWidth);
        });
      }
    } catch (e) {
      if (String(e).includes('Timeout')) timedOut = true;
      else pageErrors.push(`navigation error: ${String(e).slice(0, 300)}`);
    }

    await context.close();

    result[key] = {
      httpStatus,
      finalUrl,
      bodyLength,
      overflowPx,
      timedOut,
      consoleErrors,
      pageErrors,
    };
  }

  return result;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log('Starting next dev server...');
  const server = spawn('npx', ['next', 'dev', '-p', PORT], {
    cwd: process.cwd(),
    stdio: 'ignore',
    detached: true,
  });

  try {
    await waitForServer(BASE_URL);
    console.log('Dev server is up.');

    let routes = findRoutes(path.resolve('src/app'));
    if (LIMIT) routes = routes.slice(0, Number(LIMIT));

    // Resume support: skip routes already recorded in a prior (possibly killed) run.
    const jsonlPath = path.join(OUT_DIR, 'results.jsonl');
    const done = new Set();
    const results = [];
    if (existsSync(jsonlPath)) {
      for (const line of readFileSync(jsonlPath, 'utf8').split('\n').filter(Boolean)) {
        const r = JSON.parse(line);
        done.add(r.route);
        results.push(r);
      }
      console.log(`Resuming: ${done.size} routes already recorded.`);
    }
    const remaining = routes.filter((r) => !done.has(r));
    console.log(`Found ${routes.length} static routes to audit (${remaining.length} remaining).`);

    const browser = await chromium.launch();
    let i = done.size;
    for (const route of remaining) {
      i += 1;
      process.stdout.write(`[${i}/${routes.length}] ${route}\n`);
      const result = await auditRoute(browser, route);
      results.push(result);
      appendFileSync(jsonlPath, JSON.stringify(result) + '\n');
    }
    await browser.close();

    writeFileSync(path.join(OUT_DIR, 'audit-report.json'), JSON.stringify(results, null, 2));

    // Build a condensed markdown punch list of only routes with problems.
    const problems = results.filter((r) => {
      const d = r.desktop, m = r.mobile;
      return (
        d.timedOut || m.timedOut ||
        (d.httpStatus && d.httpStatus >= 400) || (m.httpStatus && m.httpStatus >= 400) ||
        d.consoleErrors.length || m.consoleErrors.length ||
        d.pageErrors.length || m.pageErrors.length ||
        d.bodyLength < 40 || m.bodyLength < 40 ||
        m.overflowPx > 5
      );
    });

    const lines = [`# Audit punch list — ${problems.length} of ${results.length} routes flagged`, ''];
    for (const r of problems) {
      lines.push(`## ${r.route}`);
      if (r.desktop.httpStatus && r.desktop.httpStatus >= 400) lines.push(`- desktop HTTP ${r.desktop.httpStatus}`);
      if (r.mobile.httpStatus && r.mobile.httpStatus >= 400) lines.push(`- mobile HTTP ${r.mobile.httpStatus}`);
      if (r.desktop.timedOut) lines.push('- desktop: navigation timed out');
      if (r.mobile.timedOut) lines.push('- mobile: navigation timed out');
      if (r.desktop.bodyLength < 40) lines.push(`- desktop: suspiciously empty page (${r.desktop.bodyLength} chars of text)`);
      if (r.mobile.bodyLength < 40) lines.push(`- mobile: suspiciously empty page (${r.mobile.bodyLength} chars of text)`);
      if (r.mobile.overflowPx > 5) lines.push(`- mobile: horizontal overflow of ${r.mobile.overflowPx}px (viewport 375px)`);
      for (const e of r.desktop.consoleErrors) lines.push(`- desktop console error: ${e}`);
      for (const e of r.mobile.consoleErrors) lines.push(`- mobile console error: ${e}`);
      for (const e of r.desktop.pageErrors) lines.push(`- desktop page error: ${e}`);
      for (const e of r.mobile.pageErrors) lines.push(`- mobile page error: ${e}`);
      lines.push('');
    }
    writeFileSync(path.join(OUT_DIR, 'punch-list.md'), lines.join('\n'));

    console.log(`\nDone. ${problems.length}/${results.length} routes flagged.`);
    console.log(`Report: ${path.join(OUT_DIR, 'audit-report.json')}`);
    console.log(`Punch list: ${path.join(OUT_DIR, 'punch-list.md')}`);
  } finally {
    try {
      process.kill(-server.pid);
    } catch {
      // already dead
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
