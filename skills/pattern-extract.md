---
name: pattern-extract
description: Triggers after completing significant implementation work, finishing a feature, resolving a complex bug, or at the end of a productive session. Identifies reusable patterns (architectural, code, workflow) and documents them for future reference. Activate after major task completion, when the user says "what did we learn", or when a novel solution was applied that should be remembered.
---

# Pattern Extraction

After completing significant work, extract reusable patterns before moving on.

## Step 1: Identify Patterns

Review the work just completed and look for:

- **Architectural patterns**: How components were structured, data flow decisions, boundary definitions
- **Code patterns**: Reusable functions, hooks, utilities, error handling approaches, state management techniques
- **Workflow patterns**: Steps that worked well for debugging, testing, deployment, or investigation
- **Integration patterns**: How external services were connected, API wrapping strategies, adapter designs
- **Recovery patterns**: How failures were diagnosed and fixed (useful for future troubleshooting)

For each candidate pattern, ask:
- Would this be useful in a different context?
- Is this specific to this project or broadly applicable?
- Did this solve a problem that is likely to recur?

## Step 2: Document Each Pattern

Use this structure for every extracted pattern:

```
### Pattern: [Name]

**Context**: When and where this pattern applies
**Problem**: The specific challenge it addresses
**Solution**: How to implement it (concise, with code snippet if applicable)
**Trade-offs**: What you give up, what you gain, when NOT to use it
**Example**: Reference to where it was just used (file path and line)
```

Keep documentation concise. A pattern entry should be 5-15 lines. If it needs more, it is too complex for a single pattern and should be split.

## Step 3: Classify and Store

Assign each pattern a category:

| Category | Examples |
|---|---|
| Architecture | Module boundaries, dependency injection, event-driven |
| Error Handling | Retry strategies, graceful degradation, error boundaries |
| Performance | Caching, lazy loading, debouncing, pagination |
| Testing | Fixture patterns, mock strategies, snapshot approaches |
| DevOps | Build optimization, deploy strategies, monitoring |
| Data | Schema design, migration patterns, validation chains |
| UI | Component composition, state lifting, render optimization |

Store patterns in the project's patterns library (create if it does not exist):
- Project-specific: `.claude/patterns.md` in the project root
- Cross-project: `~/ai-drive/claude-stack/patterns/` directory

## Step 4: Flag Conventions

Some patterns should become project conventions (used consistently, not optionally):

- If a pattern was applied 3+ times in the same project, flag it as a candidate convention
- Conventions go in the project's CLAUDE.md or coding standards doc
- Mark with: `**Convention candidate**: [reason it should be standardized`

## Step 5: Report

Present extracted patterns as a brief summary:

```
## Patterns Extracted

### New Patterns (N)
1. [Name] - One-line description (category)
2. ...

### Convention Candidates (N)
1. [Name] - Used N times, should standardize because [reason]

### Saved To
- /path/to/patterns.md (N entries added)
```

## When to Skip

- Routine work with no novel decisions (simple CRUD, config changes)
- Work that exactly followed an existing pattern (no new learning)
- Trivial fixes under 10 lines with no architectural significance
