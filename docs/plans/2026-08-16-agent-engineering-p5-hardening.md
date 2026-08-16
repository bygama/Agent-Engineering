# Agent-Engineering P5 — Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans
> to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax.

**Goal:** Close the ladder: failure-derived evals for the skills, an
executable eval-structure suite, and a composite broken fixture that the
audit must fully diagnose.

**Architecture:** Three real failures from P2-P4 become pinned evals
(evals change first, then the one-line skill additions they demand). "Eval
suite runs" becomes `tests/run-eval-checks.mjs` — a structural validator
(every skill ships ≥3 evals, each with Query + Expected behavior +
checkboxes) wired into the self-audit loop's gate. "Fully diagnosed"
becomes `tests/fixtures/kitchen-sink/` — one fixture violating rules
across every layer with a planted-violations MANIFEST; the lint suite
pins its mechanical subset (12→13 cases) and the acceptance runs the full
agent-audit against it, scored against the manifest. Planned as no-bump
(tests and skill prose only) — overturned mid-execution: the fixture's
first run exposed a cmd-drift false positive, and that check fix bumped
the standard to **AE/2.3** (see Results).
**examples/ stays out** (reaffirmed): the spec gates worked examples on
the structure proving itself in real repos, and the personal-repo
migrations haven't happened yet — fixtures and acceptance demos are the
worked examples for now.

**Tech Stack:** Markdown evals; zero-dep node test runner; existing
agent-lint (unchanged).

**Spec:** `docs/specs/SPEC-agent-engineering.md` — P5 phase, Testing
section ("evals from failures you actually had"), Non-goals (examples).

## Global Constraints

- Evals change before skill content; how-it-works same-change; self-lint +
  all suites green before merge.
- The kitchen-sink fixture must stay excluded from self-lint (tests/ is
  already in the ignore list) and must not break the 12 existing cases.
- Branch `feat/p5-hardening`; house trailers; rebase-merge PR.

---

### Task 1: Plan committed

- [x] **Step 1:** Write this plan. Commit: `docs(plan): P5 hardening`

### Task 2: failure-derived evals (before content)

**Files:** `skills/loop-setup/evals/eval-05.md`,
`skills/fan-out/evals/eval-05.md`, `skills/work-handoff/evals/eval-05.md`

Each eval names its origin failure (date + where it bit).

- [x] **loop-setup eval-05 — tracked state self-blocks.** Origin: P3
  acceptance (2026-08-16) — committed state file dirtied the tree on every
  run; a cleanliness precheck would skip forever. Expects: state files
  scaffolded as gitignored runtime artifacts; run protocol initializes a
  missing state file; a loop whose precheck checks tree cleanliness never
  tracks its state.
- [x] **fan-out eval-05 — ambiguous anchor.** Origin: P4 acceptance —
  three real SPEC ambiguities (alphanumeric ASCII/Unicode; single word >
  max; first letter vs first character), two flagged by workers, one
  caught only by the coordinator. Expects: worker obligations include
  "ambiguity ⇒ implement the plainest reading AND flag it as a finding,
  never improvise the spec"; the coordinator's reduce probes behavior
  independently (catching unflagged ambiguities is the checker seat's
  job); findings recorded in the parent lane.
- [x] **work-handoff eval-05 — evidence lost by close.** Origin: P2
  acceptance — removing the lane folder before committing its final state
  would destroy the evidence. Expects: close mode commits the finalized
  lane state FIRST, then removes the folder in a second commit; a close
  that would delete uncommitted lane changes is refused.
- [x] **Step 2:** Commit: `test(skills): failure-derived evals from P2-P4`

### Task 3: the one-line skill additions the evals demand

**Files:** `skills/loop-setup/SKILL.md` (state files gitignored +
self-initializing, in step 4), `skills/fan-out/SKILL.md` (worker
obligation: ambiguity ⇒ plain reading + flag, in step 5). work-handoff
already complies (finalize-then-remove landed in P2).

- [x] **Step 1:** Both additions; self-lint green. Commit:
  `feat(skills): pin failure-derived behaviors`

### Task 4: eval-structure suite

**Files:** `tests/run-eval-checks.mjs`, `AGENTS.md` (Commands),
`loops/self-audit.md` (gate), `skills/agent-audit/SKILL.md` (dogfooding
run list), `docs/how-it-works/architecture.md` (tests section)

- [x] **Step 1:** Zero-dep runner: for every `skills/<name>/`, assert
  `evals/` holds ≥3 `eval-*.md`, each with `## Query`, `## Expected
  behavior`, and ≥1 `- [x]` line. Prints per-skill results; exit 1 on any
  failure. Run it: 6/6 green.
- [x] **Step 2:** Wire it: AGENTS.md Commands line; self-audit loop gate
  gains the third runner; agent-audit dogfooding mode says "all three
  self-test suites"; architecture.md tests section mentions it.
  Commit: `test(evals): structural eval suite + wiring`

### Task 5: kitchen-sink fixture + manifest + lint case

**Files:** `tests/fixtures/kitchen-sink/**`,
`tests/fixtures/kitchen-sink/MANIFEST.md`, `tests/run-lint-tests.mjs`
(one new case)

- [x] **Step 1:** Build the fixture violating rules across layers
  (mechanical: budget overflow, adapter file, non-pointer CLAUDE.md, read
  order, broken link, command drift, incomplete lane, bad lane slug,
  invalid feature-list state, skill without frontmatter description,
  docs/ without index; judgment: stamp drift vs current, common-sense
  gotcha, taste constraint, dead doc, skill without evals, stale lane vs
  README claim). MANIFEST.md lists every planted violation + its expected
  detector (lint check id or audit judgment).
- [x] **Step 2:** Extend run-lint-tests with the kitchen-sink case
  asserting the planted mechanical set fires (and nothing else). 13/13.
  Commit: `test(lint): kitchen-sink composite fixture + manifest`

### Task 6: Acceptance — full diagnosis

- [x] **Step 1:** Run the agent-audit skill end to end against
  kitchen-sink (inventory → lint → checklist → judgment → report with
  score). Compare the report against MANIFEST.md: every planted violation
  found, zero invented findings. Any gap = a hardening fix (checklist or
  lint), applied and re-run.
- [x] **Step 2:** Record results below. Commit: `docs(plan): P5 acceptance
  evidence`

**Results (2026-08-16):**

- **The fixture's first run caught a real lint bug** (hardening working as
  designed): cmd-drift flagged `npm run migrate  # not verified` — the
  standard's own honesty marker (agent-init step 4). Fixed test-first
  (runner gained `forbidMatch`; case red → lint fix → 13/13 green). Check
  change ⇒ **AE/2.3** with migration note; restamps applied
  (kitchen-sink deliberately stays `AE/2.0` as the drift plant).
- **Full diagnosis: PASS.** Audit per the 6-step skill, report-only.
  Mechanical: all 16 planted findings fired (5 high, 7 medium, 4 low —
  verified by the pinned lint case). Judgment: J1 stamp drift (AE/2.0 vs
  AE/2.3 → recommend one-step agent-init migration) · J2 common-sense
  gotcha · J3 taste constraint · J4 the 24-rule list → distill · J5 dead
  doc `docs/old-onboarding.md` · J6 skill without evals · J7 stale lane
  vs README's "migration completed 2025-11" — all surfaced. **J8 trap
  avoided**: the `# not verified` command was not flagged. One extra TRUE
  finding surfaced and was added to the manifest as discovered
  (verification realism: feature-list commands reference nonexistent
  tests) — zero invented findings.
- Audit report headline: `Standard: AE/2.0 · current AE/2.3 · Score:
  0/10` (8 high, 12 medium, 5 low — floor) with per-finding fixes; the
  drift fix column recommends the atomic agent-init migration, exactly as
  eval-01/02 of agent-audit demand.
- Eval suite runs: 6 skills, 25 evals, all well-formed
  (`tests/run-eval-checks.mjs` exit 0), wired into AGENTS.md Commands,
  the self-audit loop gate, and the audit's dogfooding mode.
- examples/ reaffirmed OUT: the spec gates worked examples on real-repo
  adoption; fixtures + acceptance demos serve that role today.

### Task 7: ladder closed — docs + merge

- [x] **Step 1:** AGENTS.md phase line → all phases shipped, maintenance
  mode; root README Status → P0-P5 complete; how-it-works architecture
  phase-ladder para notes P5 shipped. Self-lint green.
- [x] **Step 2:** Final gates (self-lint, lint suite 13/13, gen suite,
  eval suite, stamp==CHANGELOG AE/2.2). Push; PR; rebase-merge; pull
  main; delete branch. Memory update + report.
