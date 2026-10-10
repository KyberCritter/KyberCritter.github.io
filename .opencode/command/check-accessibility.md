---
description: Run an axe-core accessibility (WCAG) audit of the Jekyll site and fix any violations found.
agent: build
---

Run the accessibility audit against the locally served Jekyll site and fix the issues it finds.

1. Install Node deps if needed: `npm install` and `npx playwright install chromium`.
2. Build and serve the site: `bundle exec jekyll serve --host 0.0.0.0 --port 4000` in the background.
3. Run the audit: `npm run check-accessibility` (append `-- --route=/about/` to scan a single path).
4. For each violation, locate the offending markup in `_layouts/`, `_includes/`, `_posts/`, `_projects/`, or the root HTML pages and fix it. axe reports on the rendered DOM, so map targets back to the source files.
5. Re-run `npm run check-accessibility` until no critical or serious violations remain.
6. Do a manual pass for what axe cannot catch: keyboard-only navigation, visible focus states, logical heading order, and meaningful alt text.

$ARGUMENTS
