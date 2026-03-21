#!/usr/bin/env bash
# SessionStart setup script for Claude Code Cloud environments.
# Installs Ruby, Node.js, and project dependencies so the Jekyll site
# can be built, served locally, and screenshotted.

set -euo pipefail

echo "==> Installing system packages..."
sudo apt-get update -qq
sudo apt-get install -y -qq ruby-full build-essential zlib1g-dev nodejs npm \
  chromium-browser fonts-liberation libappindicator3-1 libasound2 \
  libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 \
  libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
  xdg-utils 2>/dev/null || true

echo "==> Installing bundler..."
gem install bundler --no-document

echo "==> Installing Ruby dependencies..."
bundle install

echo "==> Installing Puppeteer..."
npm install puppeteer

echo "==> Setup complete."
