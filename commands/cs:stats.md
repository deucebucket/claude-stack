---
name: cs:stats
description: Session statistics — context usage, tokens, time, tasks completed
arguments: none
---

Display current session statistics and resource usage.

## Step 1: Gather session data

Use Bash to collect available metrics:

```bash
# Session uptime — check how long the current shell/process has been running
ps -o etime= -p $PPID 2>/dev/null || echo "unknown"
```

## Step 2: Check task completion this session

If a task file exists (check `docs/tasks.md`, `TASKS.md`, or `*.tasks.md` via Glob):
- Read it and count tasks marked `completed` that have a timestamp from today's date.
- Count tasks marked `in-progress`.

If no task file exists, report "No task tracking active."

## Step 3: Measure codebase impact

Use Bash to check git changes made this session:

```bash
# Files changed (staged + unstaged)
git diff --stat HEAD 2>/dev/null
git diff --cached --stat 2>/dev/null

# Uncommitted changes count
git status --porcelain 2>/dev/null | wc -l
```

## Step 4: Check context window usage

Report an estimate of context window utilization:
- Note the model in use (from system info if available).
- Estimate based on conversation length — short (<10 exchanges) is low, medium (10-30), heavy (30+).
- Flag if context is getting heavy and suggest starting a new session if needed.

## Step 5: Output the report

```
## Session Stats

### Timing
Session duration: ~12 minutes
Current time: 2026-03-28 14:32 UTC

### Task Progress (this session)
Tasks completed: 4
Tasks in progress: 1
Tasks failed: 0

### Codebase Impact
Files modified: 7
Files created: 3
Lines added: +142
Lines removed: -38
Uncommitted changes: 4 files

### Context Window
Estimated usage: moderate (~40%)
Model: Claude Opus 4.6 (1M context)
Recommendation: plenty of room remaining

### Git Status
Branch: feature/auth-system
Ahead of main by: 3 commits
Uncommitted: 4 files with changes
```

If context usage appears heavy (long conversation, many files read), add a recommendation:

```
**Recommendation:** Context is getting heavy. Consider committing current work and starting a fresh session for the remaining tasks.
```
