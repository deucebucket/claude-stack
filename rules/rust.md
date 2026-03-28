---
name: rust
description: Rust coding standards and best practices
---

# Rust Standards

## String Parameters
- Prefer `&str` over `String` for function parameters (accept borrowed data)
- Return `String` when the function owns the data

## Error Handling
- Use `Result`/`Option` — never `panic!` in library code
- Use `thiserror` for library error types, `anyhow` for application error handling
- Propagate errors with `?` operator instead of manual matching
- Use `.expect("reason")` over `.unwrap()` when unwrap is justified

## Derive Traits
- Derive `Debug`, `Clone`, `PartialEq` by default on structs and enums
- Add `Serialize`/`Deserialize` when data crosses boundaries
- Use `#[non_exhaustive]` on public enums

## Iterators
- Prefer iterator chains (`.map()`, `.filter()`, `.collect()`) over manual loops
- Use `.iter()` for borrowing, `.into_iter()` for consuming
- Prefer `for item in &collection` over index-based access

## Documentation
- Document all public API items with `///` doc comments
- Include examples in doc comments where helpful (they run as tests)
- Use `//!` for module-level documentation

## Linting
- Run `cargo clippy` with warnings denied in CI (`-D warnings`)
- Use `#[must_use]` on functions whose return values should not be ignored
- Enable common lint groups: `#![warn(clippy::pedantic)]`

## Patterns
- Use `impl Into<T>` or `AsRef<T>` for flexible parameter types
- Prefer `enum` over boolean flags for clarity
- Use builder pattern for structs with many optional fields
