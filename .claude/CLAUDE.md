# scottratchford.com

The single source of truth for agent guidance is [AGENTS.md](/AGENTS.md),
read by both Claude Code and opencode. Follow it for project overview, build
commands, style, content conventions, and git rules.

Claude Code specifics:

- `.claude/settings.json` runs `scripts/setup.sh` at session start, which
  installs Ruby/Node/Playwright dependencies for cloud environments.
- The `scrolling-screenshot` skill lives at
  `.claude/skills/scrolling-screenshot/SKILL.md`.
