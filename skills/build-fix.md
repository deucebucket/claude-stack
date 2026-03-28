---
name: build-fix
description: Triggers when a build, compile, test, or lint command fails. Automatically parses error output, identifies root cause, applies a fix, and re-runs the build. Iterates up to 3 times before escalating. Activate on any failed npm/yarn/pnpm build, cargo build, make, pytest, jest, tsc, gcc/g++, or similar build tool errors.
---

# Build Fix

When a build command fails, follow this resolution loop. Maximum 3 iterations before escalating to the user.

## Step 1: Parse Error Output

Read the full error output and classify the failure:

| Error Type | Indicators |
|---|---|
| Missing dependency | `ModuleNotFoundError`, `Cannot find module`, `No such file or directory`, `unresolved import` |
| Type error | `Type '...' is not assignable`, `expected X, found Y`, `incompatible types` |
| Syntax error | `SyntaxError`, `unexpected token`, `parse error`, line/column numbers |
| Config error | `Invalid configuration`, `Unknown option`, `missing field` in config files |
| Version mismatch | `peer dependency`, `engine`, `requires Node >= X`, `GLIBC_X not found` |
| Linker error | `undefined reference`, `unresolved symbol`, `cannot find -l` |
| Permission error | `EACCES`, `Permission denied` |
| Out of memory | `ENOMEM`, `heap out of memory`, `JavaScript heap` |

## Step 2: Identify Root Cause

For each error type:

- **Missing dependency**: Check if it needs to be installed (`npm install`, `pip install`, `apt install`) or if an import path is wrong
- **Type error**: Read the expected vs actual types. Check if an interface changed, a return type is wrong, or a null check is missing
- **Syntax error**: Go to the exact line/column. Look for unclosed brackets, missing semicolons, invalid syntax for the language version
- **Config error**: Compare the config against the tool's documentation for the installed version
- **Version mismatch**: Check lockfile, identify which package needs upgrading or downgrading
- **Linker error**: Identify the missing library, check if dev headers are installed

## Step 3: Apply Fix

1. Make the minimal change that fixes the error
2. Do not refactor or improve unrelated code
3. If multiple errors exist, fix them in dependency order (earlier errors often cause later ones)
4. If the fix requires installing a package, do it and document what was added

## Step 4: Re-run Build

Execute the same build command that failed. Analyze the new output.

- **Success**: Report what was wrong and what was fixed
- **New error**: Return to Step 1 (increment iteration counter)
- **Same error**: The fix did not work. Try an alternative approach

## Step 5: Escalation (After 3 Failed Iterations)

If 3 attempts have not resolved the build:

1. Summarize what was tried and why each attempt failed
2. Identify what information is missing (environment details, full config, upstream bug)
3. Suggest manual investigation steps
4. Ask the user for guidance

## Output Format

```
## Build Fix [Attempt N/3]

**Error**: One-line summary of the failure
**Root cause**: What went wrong and why
**Fix applied**: What was changed (file:line)
**Build result**: PASS or FAIL (with new error summary)
```
