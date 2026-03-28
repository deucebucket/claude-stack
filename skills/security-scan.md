---
name: security-scan
description: Triggers when reviewing code for security vulnerabilities, before commits involving auth/input handling/API code, or when /cs:scan is invoked. Checks for OWASP Top 10, hardcoded secrets, insecure dependencies, path traversal, command injection, and missing validation. Activate during code review, PR preparation, or any security-focused analysis.
---

# Security Scan

Perform a systematic security audit of the code under review. Check every category below and report findings with severity (CRITICAL / HIGH / MEDIUM / LOW / INFO).

## 1. OWASP Top 10 Checks

- **Injection** (SQL, NoSQL, LDAP, OS command): Look for string concatenation in queries, unsanitized user input passed to execution functions, raw SQL without parameterized queries
- **Cross-Site Scripting**: Unsafe HTML rendering in frameworks, unescaped template variables, DOM manipulation with user input. Always sanitize with DOMPurify before rendering user-provided HTML
- **CSRF**: Missing CSRF tokens on state-changing endpoints, SameSite cookie attribute not set
- **Broken Authentication**: Weak password policies, missing rate limiting on login, session tokens in URLs, missing MFA options
- **Broken Access Control**: Missing authorization checks on endpoints, IDOR vulnerabilities, privilege escalation paths
- **Security Misconfiguration**: Debug mode in production, default credentials, verbose error messages exposing internals
- **Insecure Deserialization**: Untrusted data passed to unsafe deserialization functions. Use JSON or safe formats instead of binary serialization with untrusted input
- **SSRF**: User-controlled URLs in server-side HTTP requests without allowlist validation

## 2. Hardcoded Secrets

Scan for these patterns:

- API keys, tokens, passwords in source code
- Private keys, certificates embedded in files
- Connection strings with credentials
- Dotenv files committed to version control
- Base64-encoded secrets (decode and check)
- Common patterns: assignment of key, secret, password, token values; authorization headers; PEM markers

**Action**: Flag the exact line. Recommend environment variables or secret management.

## 3. Dependency Vulnerabilities

- Check package manifests (package.json, requirements.txt, Cargo.toml) for known vulnerable versions
- Flag outdated packages with known CVEs
- Recommend running the appropriate audit tool: npm audit, pip-audit, cargo audit

## 4. Path Traversal and File Access

- User input in file paths without sanitization
- Directory traversal sequences not stripped or validated
- Symlink following without checks
- File uploads without extension/type validation

## 5. Input Validation

- Missing or client-side-only validation
- Regex denial of service (ReDoS) patterns
- Integer overflow / underflow in numeric inputs
- Missing length limits on string inputs

## Output Format

```
## Security Scan Results

### CRITICAL
- [file:line] Description of vulnerability
  Fix: Specific remediation step

### HIGH
...

### Summary
- X issues found (Y critical, Z high)
- Recommended next steps
```

If no issues found, state "No security issues detected" with a note on what was checked. Never skip a category silently.
