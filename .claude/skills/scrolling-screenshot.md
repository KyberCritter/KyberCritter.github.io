# Scrolling Screenshot

Take a full-page scrolling screenshot of the locally hosted Jekyll site.

## Process

### 1. Set up Ruby environment

The cloud environment uses rbenv. Ensure the correct Ruby is on PATH:

```bash
export PATH="/opt/rbenv/versions/3.3.6/bin:$PATH"
```

### 2. Install dependencies

```bash
bundle install
npx playwright install chromium
```

If `bundle install` fails with a CGI compatibility error on Ruby 3.3+, add
`gem 'cgi'` to the Gemfile and retry.

### 3. Start the Jekyll server

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 4000 &>/tmp/jekyll.log &
sleep 5  # wait for server to start
```

### 4. Take the screenshot with Playwright

Write and run a Node.js script using Playwright:

```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    // Desktop: { width: 1280, height: 800 }
    // Mobile:  { width: 375, height: 812 }
    viewport: { width: 375, height: 812 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });

  await page.screenshot({
    path: '/tmp/homepage_mobile.png',
    fullPage: true
  });

  await browser.close();
})();
```

Run with:

```bash
node screenshot.js
```

### 5. Stop the Jekyll server

```bash
pkill -f "jekyll serve"
```

## Notes

- The `--no-sandbox` flag is required in containerized/cloud environments.
- Use `--host 0.0.0.0` when serving Jekyll so it binds to all interfaces.
- Change the viewport dimensions and output filename as needed.
- To screenshot a specific page, change the URL path (e.g., `http://localhost:4000/about/`).
- The screenshot file should be treated as temporary — add it to the repo for review, then remove it (including from git history) before merging.
