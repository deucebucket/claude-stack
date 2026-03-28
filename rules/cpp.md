---
name: cpp
description: Modern C++ coding standards and best practices
---

# C++ Standards

## Memory Management
- Use smart pointers: `std::unique_ptr` for exclusive ownership, `std::shared_ptr` for shared
- No raw `new`/`delete` — use `std::make_unique` and `std::make_shared`
- Follow RAII: acquire resources in constructors, release in destructors

## String Handling
- Prefer `std::string_view` for read-only string parameters
- Use `std::string` when ownership is needed
- Use `std::format` (C++20) or `fmt::format` over sprintf/snprintf

## Const and Constexpr
- Use `constexpr` for compile-time evaluable functions and constants
- Mark variables `const` by default; only omit when mutation is needed
- Use `consteval` (C++20) for guaranteed compile-time evaluation

## Loops and Iteration
- Prefer range-based `for` loops over index-based iteration
- Use `<algorithm>` functions (`std::find`, `std::transform`, `std::sort`)
- Use structured bindings for pair/tuple iteration: `auto [key, val] = ...`

## Casting
- No C-style casts — use `static_cast`, `dynamic_cast`, `const_cast`, `reinterpret_cast`
- Prefer `static_cast` for safe numeric and pointer conversions
- Use `dynamic_cast` sparingly — prefer polymorphism

## Initialization
- Initialize variables at the point of declaration
- Use braced initialization `{}` to prevent narrowing conversions
- Prefer in-class member initializers over constructor initialization lists

## Patterns
- Use `std::optional` for values that may or may not exist
- Use `std::variant` over unions for type-safe alternatives
- Prefer `enum class` over plain `enum` for scoped enumerators
- Use `[[nodiscard]]` on functions whose return values must be checked
