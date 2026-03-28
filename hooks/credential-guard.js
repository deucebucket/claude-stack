#!/usr/bin/env node
// Hook: PreToolUse
// Blocks tool calls that would commit/write secrets

const SECRET_PATTERNS = [
  { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/ },
  { name: 'AWS Secret Key', pattern: /(?:aws_secret_access_key|secret_key)\s*[=:]\s*\S{20,}/ },
  { name: 'Generic API Key', pattern: /(?:api[_-]?key|apikey)\s*[=:"']+\s*[A-Za-z0-9_\-]{20,}/i },
  { name: 'Bearer Token', pattern: /Bearer\s+[A-Za-z0-9_\-.]{20,}/ },
  { name: 'Private Key Block', pattern: /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/ },
  { name: 'Password Assignment', pattern: /(?:password|passwd|pwd)\s*[=:]\s*['"][^'"]{4,}['"]/i },
  { name: 'GitHub Token', pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/ },
  { name: 'Generic Secret', pattern: /(?:secret|token)\s*[=:"']+\s*[A-Za-z0-9_\-]{20,}/i },
  { name: 'Env File Value', pattern: /^[A-Z_]+=\S{20,}/m },
];

// Files that are expected to contain secrets
const ALLOWLIST = [
  /credential-guard\.js$/, // this file itself
  /\.env\.example$/,
  /\.env\.template$/,
];

function extractContent(data) {
  const tool = data.tool_name || '';
  const input = data.tool_input || data.input || {};

  if (tool === 'Write' || tool === 'Edit') {
    const text = input.content || input.new_string || '';
    const file = input.file_path || '';
    return { text, file };
  }
  if (tool === 'Bash') {
    return { text: input.command || '', file: '' };
  }
  return { text: '', file: '' };
}

function isAllowlisted(filePath) {
  return ALLOWLIST.some(re => re.test(filePath));
}

async function main() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;

  const data = JSON.parse(input);
  const toolName = data.tool_name || '';

  if (!['Write', 'Edit', 'Bash'].includes(toolName)) {
    process.stdout.write(JSON.stringify({ decision: 'approve' }));
    return;
  }

  const { text, file } = extractContent(data);

  if (isAllowlisted(file)) {
    process.stdout.write(JSON.stringify({ decision: 'approve' }));
    return;
  }

  for (const { name, pattern } of SECRET_PATTERNS) {
    if (pattern.test(text)) {
      process.stdout.write(JSON.stringify({
        decision: 'block',
        reason: `[credential-guard] Potential ${name} detected. Remove secrets before proceeding.`,
      }));
      return;
    }
  }

  process.stdout.write(JSON.stringify({ decision: 'approve' }));
}

main().catch(() => {
  process.stdout.write(JSON.stringify({ decision: 'approve' }));
});
