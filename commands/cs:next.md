---
name: cs:next
description: Pick and execute the next pending task from the plan
arguments: none
---

Find and execute the single highest-priority unblocked task from the project plan.

## Step 1: Locate the task file

Use Read to check these locations in order:
1. `docs/tasks.md`
2. `TASKS.md`
3. Glob for `*.tasks.md`

If no task file is found, inform the user: "No task plan found. Create one with `/cs:spec` or add a TASKS.md file."

## Step 2: Parse task list

Extract all tasks. Each task should have:
- **ID**: unique identifier (e.g., T-001)
- **Status**: pending, in-progress, completed, failed, skipped
- **Priority**: critical, high, medium, low (default: medium)
- **Dependencies**: list of task IDs this task depends on
- **Description**: what needs to be done

## Step 3: Select next task

Apply this selection algorithm:
1. Filter to tasks with status `pending`.
2. Remove any task whose dependencies are not all `completed`.
3. Sort by priority (critical > high > medium > low).
4. If tied on priority, pick the task with the lowest ID number (earliest defined).
5. If no tasks are eligible, report: "All remaining tasks are blocked. Blockers: [list which tasks block which]."

## Step 4: Set status to in-progress

Use Edit to update the selected task's status to `in-progress` in the task file before starting work.

## Step 5: Execute the task

Read the task description carefully and execute it:
- Use Grep and Glob to understand the relevant codebase areas first.
- Use Read to examine files that need modification.
- Use Edit or Write to make changes.
- Use Bash to run any commands (build, test, lint) needed to verify the work.
- If the task involves creating new files, verify the parent directory exists first.

## Step 6: Verify completion

After making changes:
- Run relevant tests if a test suite exists (check for package.json scripts, pytest, cargo test, etc.).
- Run the linter if configured.
- If tests or lint fail, fix the issues before marking complete.

## Step 7: Update status and report

Use Edit to update the task status to `completed` with a timestamp.

Output:

```
## Task Completed

**[T-XXX]** <description>
Status: completed
Files changed: <list of files modified/created>
Tests: <pass/fail/skipped>

**Next up:** [T-YYY] <next task description> (priority: <level>)
**Progress:** X/Y tasks completed (Z%)
```
