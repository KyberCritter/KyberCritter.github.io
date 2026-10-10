#!/usr/bin/env node
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.env.CHECK_ACCESSIBILITY_BASE_URL || 'http://localhost:4000').replace(/\/+$/, '');

const args = process.argv.slice(2);
const onlyRoute = args.find((a) => a.startsWith('--route='))?.split('=')[1];
const scanAll = args.includes('--all');

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const STATIC_ROUTES = ['/', '/about/', '/blog/', '/projects/', '/contact/', '/resume/', '/404.html'];

function postRoutes() {
  const list = readdirSync(join(ROOT, '_posts'))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const m = f.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
      return m ? `/blog/${m[1]}/${m[2]}/${m[3]}/${m[4]}/` : null;
    })
    .filter(Boolean);
  return scanAll ? list : list.slice(0, 1);
}

function projectRoutes() {
  const list = readdirSync(join(ROOT, '_projects'))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `/projects/${f.replace(/\.md$/, '')}/`);
  return scanAll ? list : list.slice(0, 1);
}

function buildRoutes() {
  if (onlyRoute) return [onlyRoute];
  return [...STATIC_ROUTES, ...postRoutes(), ...projectRoutes()];
}

async function serverUp() {
  try {
    const res = await fetch(BASE, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

function formatTargets(nodes) {
  const targets = nodes.map((n) => n.target.join(' '));
  const shown = targets.slice(0, 3).join(' | ');
  return targets.length > 3 ? `${shown} (+${targets.length - 3} more)` : shown;
}

const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };

function report(route, viewport, results) {
  const heading = `\n==== ${route} (${viewport.name} ${viewport.width}x${viewport.height}) ====`;
  if (results.violations.length === 0) {
    console.log(heading);
    console.log('  No violations.');
    return;
  }
  console.log(heading);
  for (const v of results.violations) {
    counts[v.impact] = (counts[v.impact] || 0) + 1;
    console.log(`  [${v.impact}] ${v.id}`);
    console.log(`    ${v.description}`);
    console.log(`    Target: ${formatTargets(v.nodes)}`);
    console.log(`    Help: ${v.helpUrl}`);
    for (const node of v.nodes) {
      if (node.failureSummary) {
        console.log(`    Failure: ${node.failureSummary.replace(/\s+/g, ' ').trim()}`);
        break;
      }
    }
  }
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

try {
  if (!(await serverUp())) {
    console.error(`Jekyll server not reachable at ${BASE}.`);
    console.error('Start it first with: bundle exec jekyll serve --host 0.0.0.0 --port 4000');
    process.exit(2);
  }

  for (const route of buildRoutes()) {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      try {
        await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (err) {
        console.error(`\nSkipped ${route} (${viewport.name}): ${err.message}`);
        continue;
      }
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      report(route, viewport, results);
    }
  }
} finally {
  await browser.close();
}

const severe = counts.critical + counts.serious;
console.log('\n==== Summary ====');
console.log(`  critical: ${counts.critical} | serious: ${counts.serious} | moderate: ${counts.moderate} | minor: ${counts.minor}`);
if (severe > 0) {
  console.log(`  FAIL: ${severe} critical/serious violation(s) found.`);
  process.exit(1);
}
console.log('  PASS: no critical or serious violations.');
