# using-ae — progress

## Done

- 2026-08-17 — U1 — wrote `skills/using-ae/evals/eval-01..03` per
  SPEC §4 (entry, precedence, hook) — acceptance: `node
  tests/run-eval-checks.mjs` → exit 0 (using-ae has no SKILL.md yet so
  the runner skips the dir per its own rule; manually verified via
  grep that all three files carry `## Query` + `## Expected behavior`
  + checklist lines — 5, 5, 6 checklist lines respectively). Evals pin
  behavior the not-yet-written skill/hook must induce; eval-03 says so
  explicitly and fails today by design until U2/U3 ship.

- 2026-08-17 — U2 — wrote `skills/using-ae/SKILL.md` (45 lines, ≤80
  cap) per SPEC §1 — entry rule, eight-line map, ADR-005 precedence
  rule, 4-row red-flags table, frontmatter description (what + when,
  third person). Acceptance: `node tests/run-eval-checks.mjs` → exit 0
  (using-ae: 3 evals well-formed); `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` → 0 high/medium/low, PASS;
  `(Get-Content skills/using-ae/SKILL.md).Count` → 45. Eval-01 and
  eval-02 checklists induced directly by the entry rule, map, and
  precedence sections. Eval-03 (the hook) stays not-yet-passing by
  design — it needs `global/hooks/using-ae.ps1` (U3); SKILL.md is only
  half its fixture.

- 2026-08-17 — U3 — wrote `global/hooks/using-ae.ps1` per SPEC §2
  (orca-probe pattern: comment header, `$ErrorActionPreference`, always
  `exit 0`) resolving the skill `$PSScriptRoot`-relative
  (`Join-Path (Split-Path $PSScriptRoot) 'skills/using-ae/SKILL.md'`,
  no env vars, no hardcoded user paths) and amended the three SPEC §3
  surfaces (README "the nine skills" + using-ae row + chain-paragraph
  line; `reference/skills.md` composing-section line; `docs/how-it-
  works/standard-lifecycle.md` entry-skill mention). Walked
  `skills/using-ae/evals/eval-03.md`'s checklist by simulating both
  topologies in the scratchpad (sibling `hooks/`+`skills/`, matching
  the real `~/.claude` junction shape, vs. an isolated `hooks/` with no
  `skills/` sibling at all — the repo's own `global/hooks/` →
  `global/skills/...` path doesn't exist pre-MAT-39, which is scenario
  (b) natively). Found and fixed a real bug during that walk: Windows
  PowerShell 5.1's `Get-Content` without an explicit `-Encoding UTF8`
  misdecodes the BOM-less UTF-8 em-dashes/arrows in SKILL.md
  (mojibake) when its own stdout is captured rather than shown on a
  console; added `-Encoding UTF8` to the read and
  `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` before any
  output. Acceptance: `powershell -NoProfile -File
  global/hooks/using-ae.ps1` → exit 0 (verified via the PowerShell
  tool; the Bash tool's git-bash-invoked `powershell` hits a
  pre-existing `Restricted`-policy wall that `orca-probe.ps1` hits
  identically, unrelated to this file); scenario (a) simulated sibling
  layout → header + byte-exact SKILL.md body (0/45 line mismatches)
  under the header, exit 0; scenario (b) isolated layout → empty
  stdout, exit 0; `grep -n using-ae README.md reference/skills.md
  docs/how-it-works/standard-lifecycle.md` → 4 hits across the three
  files; `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → 0 high/medium/low, PASS; `node
  tests/run-eval-checks.mjs` → all eval checks passed (using-ae: 3
  evals well-formed).

## In progress

- 2026-08-17 — Release train closing: PR + rebase-merge + tag v1.2.0.

## Tried and failed

## Next

- MAT-39: workstation installer applies the hook + creates the
  using-ae junction; verify a fresh session shows the injection.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

### 2026-08-17 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (0 high, 0 medium, 0 low)
- L2 behavioral: `run-lint-tests` (13 cases) · `run-gen-tests` · `run-eval-checks` (using-ae: 3 evals well-formed) → all exit 0; hook executed live: absent branch → silent, exit 0; simulated installed topology → header + byte-exact SKILL.md, both `powershell` and `pwsh`, no mojibake
- L3 end-to-end: eval-03 walked live by the U3 reviewer against both hook branches, plus a detached-spawn stress run (Start-Process, redirected output) → exit 0, content intact
- Fresh-context review: PASS — whole-branch (shared with mat-33); no findings specific to this lane
- Adversarial review: n/a — M tier, not requested
- Relay run record: U1 86b01d4 · U2 5b98008 · U3 e919197 — three steps, three clean per-step reviews, fix loop never fired; U3 caught and fixed a real PS 5.1 UTF-8 decode bug in the hook
