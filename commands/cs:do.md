---
name: cs:do
description: Execute current/next task with wave parallelization
arguments: "[task-id] — optional specific task ID to execute, otherwise picks next available"
---

Execute a task (or the next pending task) using wave-based parallelization for maximum throughput.

## Step 1: Load the task list

Use the Read tool to read the project's task file. Check these locations in order:
1. `docs/tasks.md` in the current project
2. `TASKS.md` in the project root
3. Any `*.tasks.md` file via Glob

If no task file exists, tell the user to create a plan first with `/cs:spec` or manually.

## Step 2: Identify the target task

- If a `task-id` argument was provided, find that specific task.
- If no argument, scan for the highest-priority task with status `pending` whose dependencies are all `completed`.
- If multiple tasks are unblocked, collect them all — these form a **wave** of parallel work.

## Step 3: Dependency check

For each candidate task:
- Parse its `depends_on` field (if any).
- Verify all dependencies have status `completed`.
- Skip any task with unmet dependencies — do NOT execute blocked tasks.
- Report any circular dependencies as errors.

## Step 4: Execute the wave

For independent tasks that can run in parallel, use the Agent tool to dispatch each as a subagent:
- Give each subagent a clear, self-contained prompt describing the task, expected output, and relevant file paths.
- Include the task ID in the subagent prompt so it can be tracked.
- Each subagent should have access to: Read, Edit, Write, Bash, Grep, Glob tools.

For a single task (no parallelism needed), execute it directly in the current context without subagents.

## Step 5: Update task status

After each task completes:
- Update the task file, changing the task status from `pending` to `completed`.
- Add a completion timestamp in ISO format.
- If a task fails, set status to `failed` and record the error message.
- Use the Edit tool to make these updates.

## Step 6: Report results

Output a summary table:

```
## Wave Execution Report

| Task ID | Description | Status | Duration |
|---------|-------------|--------|----------|
| T-003   | Add auth middleware | completed | 45s |
| T-004   | Write user tests   | completed | 32s |

Next unblocked tasks: T-005, T-006
Remaining: 8/15 tasks pending
```

If all tasks are complete, congratulate the user and suggest running `/cs:progress` for the full overview.
