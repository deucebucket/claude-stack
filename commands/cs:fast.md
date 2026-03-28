---
name: cs:fast
description: Quick execution mode — no planning, no verification, just do it
arguments: "<description> — what to do, in plain language"
---

Execute the described change immediately with minimal overhead. No planning phase, no spec generation, no task file updates. This is for small, well-understood changes where ceremony would slow things down.

## Rules

- Do NOT create or update any task files.
- Do NOT create specs or documentation.
- Do NOT ask clarifying questions unless the request is truly ambiguous.
- Do NOT run full test suites (only run the specific test for what changed, if obvious).
- DO make the change as directly as possible.

## Execution

1. **Parse the description.** Understand what the user wants changed.

2. **Find the relevant code.** Use Grep and Glob to locate the files that need modification. Be efficient — one or two targeted searches, not broad exploration.

3. **Make the change.** Use Edit for modifications to existing files. Use Write only for new files. Keep changes minimal and focused.

4. **Quick sanity check.** If there's an obvious way to verify (e.g., the file parses, a single test passes, a build succeeds), do it with Bash. Skip this if verification would take more than 10 seconds.

5. **Report.** Keep it brief:

```
Done. Changed <file(s)>: <what changed in one line>.
```

If something went wrong or the request needs more context than a quick fix allows, say so immediately rather than attempting a half-solution:

```
This needs more than a quick fix — <reason>. Use `/cs:do` or `/cs:spec` instead.
```
