---
description: Create a new blog post in _posts/ (usage: new-post "Post Title" tag1 tag2)
---

# Create a blog post

Create a new blog post in `_posts/`.

Title: $1
Tags: any additional arguments

Use today's date. Filename: `YYYY-MM-DD-<slug>.md` where `<slug>` is a
lowercase, hyphenated slug derived from the title.

Frontmatter must be:

```yaml
---
layout: post
title: "$1"
date: YYYY-MM-DD
categories: [blog]
tags: [tag1, tag2]
---
```

Follow the style and content conventions in `AGENTS.md`. After creating the
file, lint it with `npx markdownlint '**/*.md' --config .markdownlint.json`.
