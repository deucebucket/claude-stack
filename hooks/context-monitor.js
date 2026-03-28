#!/usr/bin/env node
// Hook: PostToolUse
// Tracks estimated context usage and warns at thresholds

const fs = require('fs');
const path = require('path');

const CONTEXT_LIMIT = 200000; // conservative estimate
const STATE_FILE = path.join(__dirname, '.context-state.json');
const THRESHOLDS = [
  { pct: 90, msg: 'CRITICAL: ~90% context used. Start a new conversation soon.' },
  { pct: 75, msg: 'WARNING: ~75% context used. Consider running /compact to free space.' },
  { pct: 50, msg: 'NOTE: ~50% context used.' },
];

// Rough token estimates per tool type
const TOKEN_COSTS = {
  Read: 1500,
  Grep: 800,
  Glob: 400,
  Bash: 1000,
  Edit: 600,
  Write: 800,
  default: 500,
};

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { totalTokens: 0, lastThreshold: 0, callCount: 0 };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state));
}

async function main() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;

  const data = JSON.parse(input);
  const toolName = data.tool_name || data.tool || 'default';
  const cost = TOKEN_COSTS[toolName] || TOKEN_COSTS.default;

  // Add extra cost for large outputs
  const outputLen = JSON.stringify(data.tool_output || data.output || '').length;
  const outputTokens = Math.ceil(outputLen / 4);

  const state = loadState();
  state.totalTokens += cost + outputTokens;
  state.callCount += 1;

  const usagePct = Math.round((state.totalTokens / CONTEXT_LIMIT) * 100);

  let message = '';
  for (const t of THRESHOLDS) {
    if (usagePct >= t.pct && state.lastThreshold < t.pct) {
      state.lastThreshold = t.pct;
      message = `[context-monitor] ${t.msg} (~${state.totalTokens} tokens, ${state.callCount} tool calls)`;
      break;
    }
  }

  saveState(state);

  if (message) {
    process.stdout.write(message);
  }
}

main().catch(() => process.exit(0));
