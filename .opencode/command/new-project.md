---
description: Create a new project page in _projects/ (usage: new-project "Project Name")
---

# Create a project page

Create a new project page in `_projects/`.

Project name: $1

Use today's date. Filename: `<slug>.md` (lowercase, hyphenated).

Frontmatter must be:

```yaml
---
layout: project
title: "$1"
description: "One-sentence summary"
categories: [Software, AI/ML, Web]
cover_image: /assets/images/example.jpg
links:
  github: https://github.com/KyberCritter/repo
date: YYYY-MM-DD
featured: true
---
```

- Set `categories` to the section(s) it belongs to (Software, AI/ML, 3D
  Printing, Lego, Web).
- Only set `featured: true` if the project should appear on the homepage.
- Add any new image to `assets/images/` before referencing it in `cover_image`.

Follow the style and content conventions in `AGENTS.md`.
