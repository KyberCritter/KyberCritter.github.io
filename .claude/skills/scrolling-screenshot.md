# Scrolling Screenshot

Take a full-page scrolling screenshot of the locally hosted Jekyll site.

## Process

### 1. Install dependencies

```bash
bundle install
npm install puppeteer
```

### 2. Start the Jekyll server

```bash
bundle exec jekyll serve --detach
```

This starts the server in the background on `http://localhost:4000`.

### 3. Take the screenshot with Puppeteer

Write and run a Node.js script using Puppeteer:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set viewport — adjust width/height for desktop or mobile
  // Desktop: { width: 1280, height: 800 }
  // Mobile:  { width: 375, height: 812 }
  await page.setViewport({ width: 375, height: 812 });

  await page.goto('http://localhost:4000', { waitUntil: 'networkidle0' });

  await page.screenshot({
    path: 'screenshot.png',
    fullPage: true
  });

  await browser.close();
})();
```

Run with:

```bash
node screenshot.js
```

### 4. Stop the Jekyll server

```bash
pkill -f "jekyll serve"
```

## Notes

- The `--no-sandbox` and `--disable-setuid-sandbox` flags are required in containerized/cloud environments.
- Change the viewport dimensions and output filename as needed.
- To screenshot a specific page, change the URL path (e.g., `http://localhost:4000/about/`).
- The screenshot file should be treated as temporary — add it to the repo for review, then remove it (including from git history) before merging.
