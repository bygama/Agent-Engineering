### Spec compliance
✅ Compliant

Verified directly:
- `grep -q 'tests,templates,global,examples' AGENTS.md` → not found (old ignore string is gone).
- `grep -q 'reference/global-layer.md' AGENTS.md` → found.
- `grep -q '^Standard: AE/1.4.2$' AGENTS.md` → found, unchanged.
- `node scripts/agent-lint.mjs . --ignore tests,templates,examples` → `0 high, 0 medium, 0 low — PASS`, exit 0.
- Diff touches only `AGENTS.md`, two hunks (Commands line, Gotchas bullet). Nothing else in the file was restyled; the three other ignore-string sites (`.github/workflows/gates.yml`, `CONTRIBUTING.md`, `loops/self-audit.md`) are correctly absent — that's step 4's job.
- Read the full current `AGENTS.md` (56 lines): the `Map` section doesn't name `global/` and needs no change; the `skills/` junction gotcha covers a distinct mechanism (cross-repo skill replication) from the new personal-layer gotcha (CLAUDE.md/hooks canonical in workstation) — no overlap or contradiction between them.
- Read `reference/global-layer.md` (created by step 1, 106 lines): confirms `bygama/workstation` is stated there as "canonical for the owner's personal layer" and that `~/.claude` is "never edited directly ... from this repo" — the new AGENTS.md gotcha's claim matches that source exactly, no overclaiming.

### Strengths
- The new gotcha's wording is almost verbatim the SPEC's own phrasing ("the personal machine layer is canonical in the workstation repo; never edit `~/.claude` directly — changes go through workstation") — high-fidelity translation from spec to artifact, low risk of drift in either direction.
- Truthful: cross-checked against `reference/global-layer.md` itself rather than taking the claim on faith; the doctrine file backs every clause.
- Minimal footprint: only the two required hunks changed, version stamp and every other line untouched, ignore-string flip landed nowhere it shouldn't have.

### Issues
#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)
- `AGENTS.md:27` — the closing sentence "This repo keeps only the doctrine (`reference/global-layer.md`)." leans toward orientation/narration rather than a damage-preventing warning, the risk the reviewing brief called out explicitly. It's defensible here because it's the only place left in `AGENTS.md` that says where the doctrine now lives (the `global/` directory that used to visibly answer that question is gone), so it's not pure fluff — but it's the weakest of the three clauses in the bullet. Not worth blocking on; if trimmed further, it could fold into the pointer clause (e.g. "...changes go through workstation; doctrine lives in `reference/global-layer.md`.") without losing information. Leaving as-is is acceptable.

### Assessment
**Step quality:** Approved
**Reasoning:** The gotcha is accurate against its source doctrine, the ignore-string flip and version-stamp-untouched requirements are verified by direct command execution (lint passes, exit 0), and the diff is scoped exactly to this step's file with no stray edits or fence violations.
