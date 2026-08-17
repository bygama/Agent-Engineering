# using-ae — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-17 — SessionStart injection, not PreToolUse — PreToolUse
  fires per tool call (repeated token cost); SessionStart pays once,
  which is how superpowers does it and what the orca-probe machinery
  already supports.
- 2026-08-17 — The hook emits SKILL.md itself, no separate digest —
  one source of truth; a digest would drift. Consequence: the skill
  body is capped at 80 lines.
- 2026-08-17 — Hook locates the skill $PSScriptRoot-relative through
  the junction — no env vars, no hardcoded user paths (MAT-31 lesson:
  hook commands must need no shell expansion).
- 2026-08-17 — Ships with mat-33 as one release (1.2.0) — owner
  direction: one coherent set, "AE owns its process end to end".
  Workstation wiring split to MAT-39.
