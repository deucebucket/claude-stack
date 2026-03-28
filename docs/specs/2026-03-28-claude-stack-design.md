# claude-stack Design Spec

**Date:** 2026-03-28
**Status:** Approved
**Repo:** ~/ai-drive/claude-stack/ → deucebucket/claude-stack

## Purpose

Single Claude Code plugin that merges the best of everything-claude-code (ECC), get-shit-done (GSD), spec-kit, ui-ux-pro-max-skill, and cherry-picked agency-agents into a unified toolkit. Complements superpowers (installed separately) — does NOT replace it.

## Sources

| Source | What We Take | What We Skip |
|--------|-------------|-------------|
| everything-claude-code | Language rules, security scan, build-fix, session hooks, pattern extraction | Planning, code review (superpowers) |
| get-shit-done | Execution commands, wave parallelization, progress tracking, context monitor | Project init, planning phases (superpowers) |
| spec-kit | Spec templates, task generation workflow | Full CLI (too heavy) |
| ui-ux-pro-max-skill | Design intelligence skill, style/palette/font data | CLI installer |
| agency-agents | 15 cherry-picked domain agents | 135+ overlapping or irrelevant agents |

## Architecture

### Namespace

All components prefixed `cs:` (commands) or `cs-` (agents) to avoid collision with superpowers or other plugins.

### Agents (~15)

Specialized domain agents for the user's actual workflow:

| Agent | Source | Purpose |
|-------|--------|---------|
| cs-firmware-engineer | agency-agents | Flipper Zero, ESP32, bare-metal |
| cs-game-designer | agency-agents | GameCryptids mechanics, GDD |
| cs-game-audio | agency-agents | FMOD/Wwise, adaptive music |
| cs-narrative-designer | agency-agents | Branching dialogue, lore |
| cs-level-designer | agency-agents | Layout, pacing, encounters |
| cs-technical-artist | agency-agents | Shaders, VFX, ComfyUI pipelines |
| cs-data-engineer | agency-agents | FO76-DATA pipelines, ETL |
| cs-mcp-builder | agency-agents | MCP server development |
| cs-security-engineer | agency-agents | Threat modeling, vuln assessment |
| cs-devops | agency-agents | Systemd, distrobox, infra |
| cs-database-optimizer | agency-agents | pgvector, query optimization |
| cs-technical-writer | agency-agents | Project documentation |
| cs-rapid-prototyper | agency-agents | Fast MVP development |
| cs-backend-architect | agency-agents | System design, APIs |
| cs-ai-engineer | agency-agents | ML/AI, model training |
| cs-gsd-executor | GSD | Task execution with fresh context |
| cs-gsd-planner | GSD | Atomic task planning |
| cs-gsd-verifier | GSD | Verification and UAT |

### Commands (7)

| Command | Source | Purpose |
|---------|--------|---------|
| cs:do | GSD | Execute next task with wave parallelization |
| cs:next | GSD | Pick and execute the next pending task |
| cs:fast | GSD | Quick execution, minimal ceremony |
| cs:progress | GSD | Show project progress and stats |
| cs:stats | GSD | Session token/cost statistics |
| cs:spec | spec-kit | Generate spec from requirements |
| cs:scan | ECC | Security vulnerability scan |

### Skills (6)

| Skill | Source | Purpose |
|-------|--------|---------|
| ui-ux-design | ui-ux-pro | Design intelligence (67 styles, 161 palettes, 57 fonts) |
| security-scan | ECC | AgentShield-style security rules |
| build-fix | ECC | Automated build error resolution |
| spec-driven-dev | spec-kit | Spec → plan → task workflow |
| multi-agent-orchestrate | ECC | Coordinate multiple subagents |
| pattern-extract | ECC | Extract reusable patterns from sessions |

### Hooks (3)

| Hook | Source | Event | Purpose |
|------|--------|-------|---------|
| context-monitor.js | GSD | PostToolUse | Track context window usage, warn at thresholds |
| credential-guard.js | ECC | PreToolUse | Block commits containing secrets |
| format-on-edit.js | ECC | PostToolUse | Auto-format after file edits |

### Rules (5)

Language-specific coding standards from ECC, applied as always-on rules:
- Python, TypeScript, Go, Rust, C++

## What This Does NOT Include

- Memory system (user has auto-memory + memU with pgvector)
- Planning/brainstorming (superpowers)
- TDD/debugging workflows (superpowers)
- Code review workflow (superpowers)
- Git worktree management (superpowers)
- Verification-before-completion (superpowers)

## Installation

```bash
# From any Claude Code session:
/plugin install ~/ai-drive/claude-stack

# Or from GitHub:
/plugin marketplace add deucebucket/claude-stack
```

## Update Strategy

```bash
cd ~/ai-drive/claude-stack && git pull
# Plugin reloads automatically on next Claude Code session
```
