---
name: spec-driven-dev
description: Triggers when starting a new project, feature, or module that needs structured planning before implementation. Provides a 5-phase workflow (constitution, specify, plan, tasks, implement) adapted from spec-kit methodology. Activate when the user says "new project", "new feature", "let's build", "spec this out", or when work requires architecture decisions before coding.
---

# Spec-Driven Development

Follow these 5 phases in order. Do not skip to implementation. Each phase produces a concrete artifact that feeds the next.

## Phase 1: Constitution

Establish the project's guiding principles. Ask the user or infer from context:

- **Purpose**: One sentence describing what this project does and for whom
- **Constraints**: Budget, timeline, tech limitations, platform requirements
- **Non-negotiables**: Performance targets, accessibility requirements, security posture
- **Out of scope**: Explicitly list what this project will NOT do

Output: A 5-10 line constitution block that can be referenced throughout development.

## Phase 2: Specify

Describe WHAT the system does, not HOW. Write specifications as user-facing behavior:

- **User stories**: "As a [role], I want [capability] so that [benefit]"
- **Acceptance criteria**: Concrete, testable conditions for each story
- **Edge cases**: What happens with empty input, max load, offline state, invalid data
- **Data model**: What entities exist, their relationships, and key attributes

Rules:
- No implementation details (no "use React", no "store in PostgreSQL")
- Focus on observable behavior
- Each spec item must be independently testable

## Phase 3: Plan

Now choose the HOW. For each major decision, state the choice and the rationale:

- **Tech stack**: Language, framework, database, hosting
- **Architecture**: Monolith vs microservice, API style (REST/GraphQL/RPC), state management
- **File structure**: Directory layout, naming conventions, module boundaries
- **External services**: APIs, auth providers, storage, CDN
- **Development workflow**: Branch strategy, CI/CD, testing approach

Output: A technical plan document with architecture diagram (text-based) and dependency list.

## Phase 4: Tasks

Break the plan into actionable implementation tasks:

- Each task should be completable in one focused session (15-60 minutes of AI work)
- Tasks have clear inputs (what exists) and outputs (what will exist after)
- Order tasks by dependency (foundation first, features second, polish last)
- Mark tasks that can run in parallel vs those that are sequential
- Include test tasks alongside implementation tasks

Format:
```
1. [FOUNDATION] Set up project structure and dependencies
2. [FOUNDATION] Create data models and database schema
3. [FEATURE] Implement user authentication (depends: 1, 2)
4. [FEATURE] Build dashboard page (depends: 1, 2) [parallel with 3]
5. [TEST] Write integration tests for auth flow (depends: 3)
```

## Phase 5: Implement

Execute tasks in order. For each task:

1. State which task is being worked on
2. Implement it fully (code, tests, config)
3. Verify it works (run tests, check build)
4. Report completion before moving to the next task

If a task reveals a spec gap, pause and resolve it before continuing. Do not guess at requirements.

## When to Use Each Phase

- **Greenfield project**: All 5 phases
- **New feature in existing project**: Phases 2-5 (constitution already exists)
- **Bug fix or refactor**: Skip to Phase 4 (tasks) with a brief problem statement
