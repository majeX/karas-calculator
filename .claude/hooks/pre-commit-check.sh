#!/usr/bin/env bash
# PreToolUse(Bash) hook: refuse `git commit` until tsc and Jest both pass.
set -uo pipefail

payload=$(cat)
cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')

# Only intercept git commit; let every other Bash call through untouched.
if ! printf '%s' "$cmd" | grep -Eq '(^|[;&|[:space:]])git([[:space:]]+-[^[:space:]]+)+?([[:space:]]+[^[:space:]-]+)*[[:space:]]+commit([[:space:]]|$)|(^|[;&|[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}" || exit 0

BUN=$(command -v bun 2>/dev/null || echo "$HOME/.bun/bin/bun")
if [ ! -x "$BUN" ]; then
  echo "pre-commit hook: bun not found; cannot verify. Fix the hook or run checks manually." >&2
  exit 2
fi

if ! out=$("$BUN" x tsc 2>&1); then
  { echo "COMMIT BLOCKED - \`bunx tsc\` failed. Fix these first:"; echo "$out" | tail -40; } >&2
  exit 2
fi

if ! out=$("$BUN" run test 2>&1); then
  { echo "COMMIT BLOCKED - \`bun run test\` failed. Fix these first:"; echo "$out" | tail -40; } >&2
  exit 2
fi

exit 0
