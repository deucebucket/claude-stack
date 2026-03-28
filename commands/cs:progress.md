---
name: cs:progress
description: Show project progress — tasks, completion %, blockers, estimates
arguments: none
---

Generate a comprehensive progress report for the current project plan.

## Step 1: Locate the task file

Use Read to check these locations in order:
1. `docs/tasks.md`
2. `TASKS.md`
3. Glob for `*.tasks.md`

If no task file is found: "No task plan found. Nothing to report."

## Step 2: Parse all tasks

Extract every task and categorize by status:
- `completed` — finished tasks
- `in-progress` — currently being worked on
- `pending` — not yet started
- `failed` — attempted but errored
- `skipped` — intentionally bypassed

## Step 3: Analyze dependencies and blockers

For each `pending` task:
- Check if all dependencies are `completed`.
- If not, identify which specific tasks are blocking it.
- Flag any dependency chains that create bottlenecks (single task blocking many others).

## Step 4: Calculate metrics

- **Completion percentage**: completed / total * 100
- **Blocked count**: pending tasks with unmet dependencies
- **Ready count**: pending tasks with all dependencies met (can start now)
- **Failed count**: tasks that need retry or investigation

## Step 5: Estimate remaining work

Use a rough heuristic based on task descriptions:
- Simple file edits / config changes: ~2 min each
- New feature implementation: ~10 min each
- Integration / testing tasks: ~5 min each
- Complex architecture work: ~15 min each

Sum for total estimated remaining time.

## Step 6: Output the report

```
## Project Progress Report

### Overview
Progress: ██████████░░░░░░ 62% (31/50 tasks)
Status: 31 completed, 2 in-progress, 14 pending, 2 failed, 1 skipped

### By Priority
- Critical: 5/5 completed
- High: 12/15 completed
- Medium: 10/20 completed
- Low: 4/10 completed

### Currently In Progress
- [T-032] Add rate limiting to API endpoints
- [T-033] Write integration tests for auth flow

### Ready to Start (unblocked)
- [T-034] Add pagination to list endpoints (medium)
- [T-035] Create error code documentation (low)

### Blocked Tasks
- [T-040] Deploy to staging — blocked by: T-032, T-033
- [T-041] Performance testing — blocked by: T-040

### Failed (needs attention)
- [T-028] Database migration script — Error: column type mismatch

### Estimated Remaining
~45 minutes of work remaining (14 pending + 2 failed tasks)

### Critical Path
T-032 -> T-040 -> T-041 -> T-045 (deployment)
```

Adjust the format to fit the actual data. Use Unicode block characters for the progress bar. Keep it scannable.
