---
name: cs:scan
description: Security vulnerability scan — OWASP top 10, secrets, dependencies, insecure patterns
arguments: "[path] — optional directory to scan, defaults to project root"
---

Perform a security audit of the codebase. Analyze for common vulnerabilities, secret leaks, dependency issues, and insecure coding patterns. Produce a prioritized findings report.

## Step 1: Determine scan scope

- If a `[path]` argument is provided, scan only that directory.
- Otherwise, scan the entire project root.
- Use Glob to identify all source files. Skip binary files, node_modules, venv, .git, build artifacts.

## Step 2: Detect project type

Use Glob and Read to identify the tech stack:
- Check for package.json, requirements.txt/pyproject.toml, Cargo.toml, go.mod, etc.
- Note the frameworks in use as they have framework-specific vulnerabilities.

## Step 3: Secret detection

Use Grep to scan for leaked secrets across all source files. Look for:

- API key assignments (variables named api_key, apikey with long string values)
- AWS access key IDs (strings starting with AKIA)
- PEM-formatted private key headers
- Variables named token, secret, password assigned to string literals
- Database connection URIs
- Committed .env files: Check if .env, .env.local, .env.production are tracked by git
- Hardcoded IP:port patterns in source code

Exclude test fixtures, example configs, and documentation from findings.

## Step 4: OWASP Top 10 analysis

Scan for patterns related to each OWASP category. Reference the OWASP Top 10 (2021) list:

- **A01 Broken Access Control**: missing auth checks on routes, wildcard CORS origins
- **A02 Cryptographic Failures**: weak hash algorithms (md5, sha1), hardcoded keys, HTTP instead of HTTPS
- **A03 Injection**: string interpolation in SQL statements, unsanitized input passed to shell-spawning functions, raw queries without parameterized placeholders
- **A04 Insecure Design**: missing rate limiting, missing input validation
- **A05 Security Misconfiguration**: debug mode in prod, default credentials, chmod 777
- **A06 Vulnerable Components**: run npm audit / cargo audit / pip-audit as available
- **A07 Auth Failures**: weak password rules, sessions without expiry, no brute-force protection
- **A08 Data Integrity**: dynamic code execution with user input, unsafe deserialization
- **A09 Logging Failures**: sensitive data in logs, empty catch blocks
- **A10 SSRF**: user-controlled URLs passed to HTTP clients without allowlist validation

For each category, use Grep with appropriate regex patterns to find violations. Be thorough but avoid false positives — check context around matches.

## Step 5: Dependency analysis

Use Bash to run available audit tools:
- Node.js: `npm audit --json 2>/dev/null | head -100`
- Python: `pip-audit 2>/dev/null | head -50` (if available)
- Rust: `cargo audit 2>/dev/null | head -50` (if available)

If tools are not installed, note it and move on.

## Step 6: Generate the findings report

Rate each finding by severity: CRITICAL, HIGH, MEDIUM, LOW, INFO.

Output format:

```
## Security Scan Report

**Scanned:** <path>
**Date:** <today>
**Files analyzed:** <count>
**Tech stack:** <detected stack>

### Summary
| Severity | Count |
|----------|-------|
| CRITICAL | 0     |
| HIGH     | 2     |
| MEDIUM   | 5     |
| LOW      | 3     |
| INFO     | 4     |

### Findings

#### [SEVERITY] Title — S-NNN
**File:** path/to/file.ext:line
**Category:** OWASP category or Secret Leak
**Description:** What the issue is.
**Evidence:** (show the offending code snippet)
**Remediation:** How to fix it.

(repeat for each finding)

### Dependency Vulnerabilities
<output from audit tools>

### Recommendations
1. <most important fix>
2. <second most important>
3. ...

### Files Not Scanned
<binary files, generated code, vendor directories skipped>
```

Sort findings by severity (CRITICAL first), then by file path.
