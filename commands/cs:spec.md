---
name: cs:spec
description: Generate a structured specification from requirements
arguments: "<topic> — what to build, described in plain language"
---

Generate a complete specification document for the described feature, system, or component. Save it to `docs/specs/` in the project.

## Step 1: Understand the request

Parse the `<topic>` argument to understand what needs to be specified. If the topic is too vague (single word with no context), ask ONE clarifying question. Otherwise, proceed.

## Step 2: Analyze existing codebase context

Use Grep and Glob to understand the project:
- What language(s) and frameworks are in use?
- What's the project structure? (Read relevant config files: package.json, Cargo.toml, pyproject.toml, go.mod, etc.)
- Are there existing specs in `docs/specs/` to match the format of?
- Are there existing patterns, conventions, or architectural decisions to respect?

## Step 3: Generate the specification

Create a spec document with these sections:

```markdown
# Spec: <Title>

**Author:** claude-stack
**Date:** <today's date>
**Status:** draft

## Overview
<2-3 sentences describing what this is and why it's needed>

## Requirements
### Functional Requirements
- FR-1: <requirement>
- FR-2: <requirement>
...

### Non-Functional Requirements
- NFR-1: <performance, security, scalability, etc.>
...

## Architecture

### Components
<List each component/module, its responsibility, and its interfaces>

### Data Flow
<Describe how data moves through the system, step by step>

### Data Model
<If applicable — schemas, types, database tables>

## API Design
<If applicable — endpoints, function signatures, event contracts>

## Error Handling
<How errors are detected, propagated, and reported>
<Edge cases to handle>

## Security Considerations
<Authentication, authorization, input validation, secrets management>

## Testing Strategy
- Unit tests: <what to test at unit level>
- Integration tests: <what to test at integration level>
- Edge cases: <specific scenarios to cover>

## Task Breakdown
<Break the spec into ordered tasks for execution>

- [ ] T-001: <task> [priority: high] [depends: none]
- [ ] T-002: <task> [priority: high] [depends: T-001]
- [ ] T-003: <task> [priority: medium] [depends: T-001]
...

## Open Questions
<Anything that needs clarification before or during implementation>
```

## Step 4: Save the spec

1. Use Bash to ensure `docs/specs/` exists: `mkdir -p docs/specs/`
2. Generate a filename from the topic: lowercase, hyphens, no special chars. Example: `docs/specs/user-authentication.md`
3. Use Write to save the file.

## Step 5: Optionally generate the task file

If a task file doesn't already exist (`TASKS.md` or `docs/tasks.md`), create `docs/tasks.md` from the Task Breakdown section of the spec, formatted as:

```markdown
# Tasks

Source spec: docs/specs/<filename>.md

| ID | Description | Priority | Dependencies | Status |
|----|-------------|----------|--------------|--------|
| T-001 | <description> | high | — | pending |
| T-002 | <description> | high | T-001 | pending |
...
```

## Step 6: Report

```
## Spec Generated

Saved to: docs/specs/<filename>.md
Tasks: <N> tasks created in docs/tasks.md
Ready to execute: run `/cs:do` or `/cs:next` to begin implementation.
```
