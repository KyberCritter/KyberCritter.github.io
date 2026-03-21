---
layout: post
title: "Automating Screenshots with Claude Code"
date: 2026-03-21
categories: [blog]
tags: [website, ai, automation]
---

I've been using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) to help manage this website, and I recently ran into a situation that led me to build something surprisingly useful: a Claude skill that locally hosts this Jekyll site and takes a full-page scrolling screenshot.

## The Problem

When I'm making layout changes, especially for mobile, I want to see what the full page looks like before I push anything live. Normally, I'd spin up the Jekyll server, open a browser, resize the window, and scroll through the page myself. It's not hard, but it's tedious, and it's the kind of thing I forget to do before merging a change.

I was working on a CSS fix for the stat boxes on my homepage. They were crammed into three tiny columns on mobile instead of stacking vertically. After making the fix, I wanted a quick visual confirmation. I asked Claude to host the site locally and take a scrolling screenshot in a mobile viewport. It worked, but the process involved a lot of trial and error with dependencies and browser automation tools.

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

My first instinct was to use [Puppeteer](https://pptr.dev/), but the cloud environment I was working in had compatibility issues. Playwright handled Chromium installation more cleanly with `npx playwright install chromium`, and it bundled everything it needed. It also dealt with the sandboxing constraints of containerized environments without much fuss.

## What's Next

Now I can ask Claude to take a screenshot of any page on the site at any viewport size. I'm planning to use this for visual regression checks before merging layout changes. It's a small tool, but it removes just enough friction to make me actually verify my changes every time.

If you're using Claude Code on your own projects, I'd recommend exploring skills. They're just markdown files, but they give Claude the context it needs to perform project-specific tasks reliably. You can find mine in the [`.claude/skills/`](https://github.com/KyberCritter/KyberCritter.github.io/tree/main/.claude/skills) directory of this site's repository.
