---
name: multi-agent-orchestrate
description: Triggers when executing a plan with multiple independent tasks that can be parallelized across subagents. Handles dispatching, monitoring, merging results, and conflict resolution. Activate when a task list contains 2+ items marked as parallel, when the user requests parallel execution, or when implementing a plan from spec-driven-dev with independent work streams.
---

# Multi-Agent Orchestration

When a task has independent subtasks, coordinate parallel execution for faster completion.

## Step 1: Identify Parallelizable Work

Analyze the task list and build a dependency graph:

- **Independent tasks**: No shared files, no read-after-write dependencies, no shared state
- **Dependent tasks**: One task's output is another's input, or both modify the same file
- **Partially parallel**: Independent implementation but shared integration point

Decision matrix:
| Condition | Action |
|---|---|
| Tasks touch different files entirely | Fully parallel |
| Tasks touch same file, different sections | Parallel with merge step |
| Task B reads output of Task A | Sequential (A then B) |
| Tasks share database/API state | Sequential or careful coordination |

## Step 2: Dispatch Subagents

For each parallel work stream, create a self-contained prompt:

- **Context**: Relevant files, current state, project conventions
- **Task**: Exactly what to build or change, with acceptance criteria
- **Boundaries**: Which files to touch and which to leave alone
- **Output format**: What to produce (code files, test results, status report)

Rules for dispatch:
- Each subagent prompt must be independently understandable (no "see above")
- Include file paths and relevant code snippets, not references
- Specify the exact directory and branch context
- Set clear completion criteria so the agent knows when to stop

## Step 3: Monitor Completion

Track each subagent's status:

```
| Agent | Task | Status | Notes |
|-------|------|--------|-------|
| A     | Auth module | Complete | 3 files changed |
| B     | Dashboard UI | In progress | 70% |
| C     | API endpoints | Failed | Missing schema |
```

If a subagent fails:
1. Read the error output
2. Determine if it can be retried with more context
3. If blocked on another task's output, re-sequence

## Step 4: Merge Results

When all agents complete:

1. Check for file conflicts (two agents modified the same file)
2. If conflicts exist, resolve by understanding each change's intent
3. Run the full build/test suite on the merged result
4. Verify all acceptance criteria from the original plan

## Step 5: Report Aggregate Status

Produce a summary:

```
## Orchestration Complete

### Tasks Completed: X/Y
- [Agent A] Auth module: 3 files, 2 tests added
- [Agent B] Dashboard: 5 files, 1 component created
- [Agent C] API: retried once, completed on second attempt

### Conflicts Resolved: N
- file.ts: merged Agent A's types with Agent B's imports

### Build Status: PASS/FAIL
### Test Status: X/Y passing
```

## When NOT to Parallelize

- Fewer than 2 independent tasks (overhead exceeds benefit)
- Tasks are tightly coupled with shared mutable state
- The codebase is unfamiliar and dependency analysis is uncertain
- Tasks take under 30 seconds each (dispatch overhead dominates)
