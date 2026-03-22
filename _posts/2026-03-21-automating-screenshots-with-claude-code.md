---
layout: post
title: "Automating Screenshots with Claude Code"
date: 2026-03-21
categories: [blog]
tags: [website, ai, automation]
---

I've been using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) to help manage this website, and I recently ran into a situation that led me to build something surprisingly useful: a Claude skill that locally hosts this Jekyll site and takes a full-page scrolling screenshot.

## The Problem

I often make changes to this site from my phone using Claude Code. The tradeoff is that I don't have a staging or development environment on mobile, so I can't preview layout changes before they go live. Before merging a CSS fix for the stat boxes on my homepage — they were crammed into three tiny columns on mobile instead of stacking vertically — I wanted a visual confirmation that the fix actually worked.

I asked Claude to host the site locally and take a scrolling screenshot in a mobile viewport, and it delivered exactly what I needed.

## The Solution

After getting it working, I realized this would be useful for future changes too, so I turned the process into a reusable [Claude skill](https://docs.anthropic.com/en/docs/claude-code/skills). Skills are markdown files that live in the `.claude/skills/` directory of your project. They give Claude context about how to perform specific tasks.

The skill documents the full process:

- Set up the Ruby environment with [rbenv](https://github.com/rbenv/rbenv)
- Install dependencies with Bundler
- Start the Jekyll server on localhost
- Use [Playwright](https://playwright.dev/) to launch a headless Chromium browser, set a viewport size, and capture a full-page screenshot
- Clean up the server when done

I also wrote a setup script that runs automatically when Claude Code starts a cloud session. It installs Ruby dependencies, Playwright, and Chromium so everything is ready to go without any manual configuration. This was important to me because I wanted the skill to work immediately in any new session, not just on my local machine.

## Why Playwright?

Claude initially tried [Puppeteer](https://pptr.dev/), but the cloud environment had compatibility issues. [Playwright](https://playwright.dev/) handled Chromium installation more cleanly with `npx playwright install chromium`, and it bundled everything it needed. It also dealt with the sandboxing constraints of containerized environments without much fuss.

## What's Next

Now I can ask Claude to take a screenshot of any page on the site at any viewport size. This is especially useful when I'm working from my phone and can't preview changes locally. It's a small tool, but it gives me confidence that layout changes look right before they hit production.

If you're using Claude Code on your own projects, I'd recommend exploring skills. They're just markdown files, but they give Claude the context it needs to perform project-specific tasks reliably. You can find mine in the [`.claude/skills/`](https://github.com/KyberCritter/KyberCritter.github.io/tree/main/.claude/skills) directory of this site's repository.
