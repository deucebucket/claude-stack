---
name: typescript
description: TypeScript coding standards and best practices
---

# TypeScript Standards

## Strict Mode
- Always enable `strict: true` in tsconfig.json
- Never use `// @ts-ignore` without a documented reason

## Type Safety
- No `any` — use `unknown` if the type is truly unknown, then narrow
- Explicit return types on all exported functions
- Use `as const` assertions for literal types and immutable data

## Interfaces vs Types
- Prefer `interface` over `type` for object shapes (better error messages, extendable)
- Use `type` for unions, intersections, and utility types

## Null Handling
- Prefer nullish coalescing (`??`) over logical OR (`||`)
- Use optional chaining (`?.`) for safe property access
- Enable `strictNullChecks` (included in strict mode)

## Strings
- Use template literals over string concatenation
- Prefer tagged templates for complex string building

## Functions
- Use destructuring for function parameters with multiple options
- Prefer arrow functions for callbacks and inline functions
- Use `readonly` modifier for parameters that should not be mutated

## Patterns
- Use discriminated unions for state management
- Prefer `Map`/`Set` over plain objects for dynamic keys
- Use `satisfies` operator for type validation without widening
- Prefer `const` declarations; use `let` only when reassignment is needed
