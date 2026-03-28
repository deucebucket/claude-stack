---
name: go
description: Go coding standards and best practices
---

# Go Standards

## Interfaces
- Accept interfaces, return structs
- Keep interfaces small (1-3 methods)
- Define interfaces where they are consumed, not where they are implemented

## Error Handling
- Wrap errors with `fmt.Errorf("context: %w", err)` for stack traces
- Use `errors.Is()` and `errors.As()` over type assertions on errors
- Return errors instead of panicking; reserve `panic` for truly unrecoverable states
- Check errors immediately — never discard with `_`

## Testing
- Use table-driven tests with named subtests
- Use `t.Helper()` in test helper functions
- Use `testify` or stdlib — no test framework overload

## Context
- Pass `context.Context` as the first parameter to functions that do I/O
- Never store contexts in structs
- Derive child contexts with `context.WithCancel` or `context.WithTimeout`

## Naming
- Short variable names in small scopes (`i`, `r`, `w`)
- Descriptive names in larger scopes and exported identifiers
- Acronyms in caps: `HTTP`, `URL`, `ID` (not `Http`, `Url`, `Id`)

## Patterns
- No `init()` functions unless absolutely necessary (prefer explicit setup)
- Use `sync.Once` for lazy initialization
- Prefer channels for communication, mutexes for state
- Use `defer` for cleanup immediately after acquiring a resource
