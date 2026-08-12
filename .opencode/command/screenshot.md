---
description: Take a full-page screenshot of a page (usage: screenshot /path viewport)
---

# Take a screenshot

Use the `scrolling-screenshot` skill to capture a full-page screenshot of the
locally served Jekyll site.

Path: $1 (defaults to `/`)
Viewport: $2 (desktop `1280x800` or mobile `375x812`; defaults to desktop)

Follow the skill's process: ensure Ruby and dependencies are available, start
the Jekyll server, run a Playwright screenshot at the requested viewport, then
clean up the server. Show the resulting image to the user.
