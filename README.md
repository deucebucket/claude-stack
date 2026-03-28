# claude-stack

Unified Claude Code plugin — domain agents, execution commands, design skills, security hooks, and language rules. Designed to complement [superpowers](https://github.com/claude-plugins-official/superpowers), not replace it.

## What's Inside

| Category | Count | Highlights |
|----------|-------|-----------|
| Agents | 18 | Firmware, game dev, data eng, MCP builder, security, DevOps, AI/ML, GSD execution |
| Commands | 7 | `/cs:do`, `/cs:next`, `/cs:fast`, `/cs:progress`, `/cs:stats`, `/cs:spec`, `/cs:scan` |
| Skills | 6 | UI/UX design, security scan, build-fix, spec-driven dev, multi-agent orchestration, pattern extraction |
| Hooks | 3 | Context monitor, credential guard, format-on-edit |
| Rules | 5 | Python, TypeScript, Go, Rust, C++ |

## Install

```bash
# Local install
/plugin install ~/ai-drive/claude-stack

# From GitHub
/plugin marketplace add deucebucket/claude-stack
```

## Update

```bash
cd ~/ai-drive/claude-stack && git pull
```

Plugin reloads on next Claude Code session.

## Sources

Best parts cherry-picked and adapted from:
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) — skills, hooks, rules
- [get-shit-done](https://github.com/gsd-build/get-shit-done) — execution commands, GSD agents
- [spec-kit](https://github.com/github/spec-kit) — spec-driven development workflow
- [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — design intelligence
- [agency-agents](https://github.com/msitarzewski/agency-agents) — domain specialist agents

## License

MIT
