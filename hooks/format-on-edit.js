#!/usr/bin/env node
// Hook: PostToolUse
// Auto-formats source files after edits

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FORMATTERS = {
  '.js':   { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.jsx':  { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.ts':   { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.tsx':  { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.json': { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.css':  { args: ['prettier', '--write'], name: 'prettier', via: 'npx' },
  '.py':   { args: ['-m', 'black', '--quiet'], name: 'black', via: 'python3' },
  '.go':   { args: ['-w'], name: 'gofmt', via: 'gofmt' },
  '.rs':   { args: [], name: 'rustfmt', via: 'rustfmt' },
};

function getFilePath(data) {
  const input = data.tool_input || data.input || {};
  return input.file_path || '';
}

function formatFile(filePath, formatter) {
  try {
    const before = fs.readFileSync(filePath, 'utf8');
    const cmd = formatter.via === 'npx' ? 'npx' : formatter.via;
    const args = [...formatter.args, filePath];
    execFileSync(cmd, args, { timeout: 10000, stdio: 'pipe' });
    const after = fs.readFileSync(filePath, 'utf8');
    return before !== after;
  } catch {
    return false;
  }
}

function formatterAvailable(formatter) {
  try {
    if (formatter.via === 'npx') {
      execFileSync('npx', ['prettier', '--version'], { timeout: 5000, stdio: 'pipe' });
    } else {
      execFileSync('which', [formatter.via], { timeout: 5000, stdio: 'pipe' });
    }
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;

  const data = JSON.parse(input);
  const toolName = data.tool_name || '';

  if (!['Write', 'Edit'].includes(toolName)) return;

  const filePath = getFilePath(data);
  if (!filePath) return;

  const ext = path.extname(filePath).toLowerCase();
  const formatter = FORMATTERS[ext];
  if (!formatter) return;

  if (!formatterAvailable(formatter)) return;

  const changed = formatFile(filePath, formatter);
  if (changed) {
    process.stdout.write(`[format-on-edit] Formatted ${path.basename(filePath)} with ${formatter.name}`);
  }
}

main().catch(() => process.exit(0));
