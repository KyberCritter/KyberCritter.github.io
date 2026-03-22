#!/usr/bin/env bash
# SessionStart setup script for Claude Code Cloud environments.
# Installs project dependencies so the Jekyll site can be built,
# served locally, and screenshotted.

set -euo pipefail

# rbenv Ruby is pre-installed in cloud environments
export PATH="/opt/rbenv/versions/3.3.6/bin:$PATH"

echo "==> Installing bundler..."
gem install bundler --no-document

echo "==> Installing Ruby dependencies..."
bundle install 2>&1 || {
  echo "==> bundle install failed, adding cgi gem for Ruby 3.3 compatibility..."
  echo "gem 'cgi'" >> Gemfile
  bundle install
}

echo "==> Installing Playwright and Chromium..."
npx playwright install chromium

echo "==> Setup complete."
