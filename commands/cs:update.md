---
name: cs:update
description: Update claude-stack plugin from git repo and sync to cache
---

Pull latest changes from the claude-stack repo and sync to the plugin cache.

## Steps

1. Run `cd ~/ai-drive/claude-stack && git pull` to get latest changes
2. Run `cp -r ~/ai-drive/claude-stack/* ~/.claude/plugins/cache/deucebucket/claude-stack/1.0.0/` to sync to cache
3. Report what changed (show git log of new commits if any)
4. Remind user to restart Claude Code if hooks or plugin.json changed
