---
name: check-accessibility-audit
description: Audit the locally hosted Jekyll site for WCAG accessibility violations using axe-core. Use when the user asks to check or fix accessibility issues, run an accessibility audit, or wants to verify that new or edited HTML, layouts, partials, or pages are accessible.
---

# Accessibility Audit

Audit the Jekyll site against WCAG (2.1/2.2 A/AA) and best-practice rules
using axe-core, then fix the issues in the source files.

## Process

### 1. Install dependencies

```bash
npm install
npx playwright install chromium
```

The audit script lives at `scripts/check-accessibility-scan.mjs` and is run via
`npm run check-accessibility`. It scans the static pages, a sample post, and a sample
project (or every post/project with `--all`) at desktop and mobile widths.

### 2. Start the Jekyll server

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 4000 &>/tmp/jekyll.log &
sleep 5  # wait for server to start
```

On local machines, keep the server running in a separate terminal instead.

### 3. Run the audit

```bash
npm run check-accessibility
```

Useful variants:

```bash
npm run check-accessibility -- --route=/about/      # scan a single path
npm run check-accessibility -- --all                # scan every post and project
CHECK_ACCESSIBILITY_BASE_URL=http://localhost:4000 npm run check-accessibility
```

The script exits with code 1 if any critical or serious violations are
found, and prints a per-route, per-viewport breakdown.

### 4. Fix violations in source, not `_site/`

axe reports against the rendered DOM in `_site/`, but edits belong in the
sources: `_layouts/`, `_includes/`, `_posts/`, `_projects/`, and the root
HTML pages. Map axe targets back to the generating file before editing.
Rebuild/serve picks up changes automatically (Jekyll rebuilds on save).

### 5. Re-run to verify

Re-run `npm run check-accessibility` until no critical or serious violations remain.
Moderate/minor findings (e.g. color-contrast, list markup) are worth
fixing too.

### 6. Manual checks axe cannot catch

- Keyboard-only navigation: Tab order reaches every interactive element and
  leaves no traps.
- Visible focus indicators on links and buttons.
- Headings form a logical, non-skipped outline.
- Alt text is meaningful in context; decorative images are hidden from
  assistive tech.
- Touch targets are large enough and links/buttons have accessible names.

## Notes

- Run from the repo root; the script resolves content paths relative to it.
- The server must already be running — the script only checks that it is up.
- Contrast results depend on the compiled Tailwind stylesheet, so recompile
  `assets/css/tailwind.css` before auditing after class changes.
