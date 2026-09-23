#!/usr/bin/env bash
# PreToolUse hook (Edit|Write): warns when a component/layout/page file is
# about to gain a hardcoded price, ISO date, or raw URL — golden rule 1 in
# CLAUDE.md ("single source of truth" — these live only in src/config/site.ts
# and src/config/courses.ts) — or a color literal outside the token system —
# golden rule 5 (yellow --cta reserved for Enroll; palette lives in
# src/styles/tokens.css). See .claude/rules/no-hardcode.md.
#
# This is advisory, not a hard block: it exits 0 (allow) but prints a warning
# to stderr that Claude Code surfaces, so a real hit gets a second look
# instead of being silently written. Deliberately conservative to avoid
# blocking legitimate copy (e.g. a testimonial that quotes a price).

set -euo pipefail

input="$(cat)"
file_path="$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*"file_path"[[:space:]]*:[[:space:]]*"([^"]*)"/\1/')"

[ -z "$file_path" ] && exit 0

# Only guard the display layer, never the config/content source of truth.
case "$file_path" in
  *src/components/*.astro|*src/layouts/*.astro|*src/pages/*.astro) ;;
  *) exit 0 ;;
esac

content="$(echo "$input" | python3 -c '
import json,sys
try:
    data = json.load(sys.stdin)
    tool_input = data.get("tool_input", {})
    print(tool_input.get("content") or tool_input.get("new_string") or "")
except Exception:
    pass
' 2>/dev/null || true)"

[ -z "$content" ] && exit 0

hits=""

if echo "$content" | grep -qE '(₹|\$)[0-9]{2,}'; then
  hits="${hits}- currency literal (₹/\$ + digits)\n"
fi

if echo "$content" | grep -qE '[0-9]{4}-[0-9]{2}-[0-9]{2}T'; then
  hits="${hits}- ISO-8601 date/time literal\n"
fi

if echo "$content" | grep -oE 'https?://[a-zA-Z0-9.-]+' | grep -qvE 'fonts\.|cdn\.'; then
  hits="${hits}- raw URL literal\n"
fi

color_hits=""

if echo "$content" | grep -qE '\b(bg|text|border|from|via|to|fill|stroke|ring|outline|shadow)-\[#[0-9a-fA-F]{3,8}\]'; then
  color_hits="${color_hits}- Tailwind arbitrary hex color utility (e.g. bg-[#...])\n"
fi

if echo "$content" | grep -qE '#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?\b'; then
  color_hits="${color_hits}- raw hex color literal\n"
fi

if [ -n "$hits" ]; then
  echo "⚠️  CLAUDE.md golden rule 1 check on $file_path — possible hardcoded value(s) outside src/config/:" >&2
  printf "%b" "$hits" >&2
  echo "If this is a real price/date/URL, move it to src/config/site.ts (or courses.ts) and import it instead. See .claude/rules/no-hardcode.md." >&2
fi

if [ -n "$color_hits" ]; then
  echo "⚠️  CLAUDE.md golden rule 5 check on $file_path — possible color literal outside the token palette:" >&2
  printf "%b" "$color_hits" >&2
  echo "If this is a real brand color, use the --color-* tokens from src/styles/tokens.css instead. A few literals here are known-benign (flag SVGs, theme-color meta, mask gradients) — see .claude/rules/no-hardcode.md." >&2
fi

exit 0
