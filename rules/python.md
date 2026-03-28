---
name: python
description: Python coding standards and best practices
---

# Python Standards

## Type Hints
- Add type hints to all function signatures (parameters and return types)
- Use `from __future__ import annotations` for modern syntax in older Python
- Use `Optional[X]` or `X | None` for nullable types

## Documentation
- Google-style docstrings on all public functions and classes
- Include Args, Returns, and Raises sections where applicable

## String Formatting
- Use f-strings over `.format()` or `%` formatting
- Use f-strings for all string interpolation

## Path Handling
- Use `pathlib.Path` over `os.path` for all file path operations
- Use `/` operator for path joining instead of `os.path.join`

## Data Structures
- Use `dataclasses` or `pydantic` models for structured data
- Avoid plain dicts for known data shapes

## Error Handling
- Never use bare `except:` — always catch specific exceptions
- Use `except Exception as e:` at minimum if broad catch is needed
- Prefer specific exceptions: `ValueError`, `TypeError`, `FileNotFoundError`

## Module Structure
- Always include `if __name__ == "__main__":` guard in scripts
- Keep imports organized: stdlib, third-party, local (separated by blank lines)

## Idioms
- Prefer list/dict comprehensions over `map()` and `filter()`
- Use `enumerate()` instead of manual index tracking
- Use context managers (`with`) for resource handling
- Prefer `collections.defaultdict` over manual key checking
