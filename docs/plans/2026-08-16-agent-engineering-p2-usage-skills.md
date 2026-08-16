# Agent-Engineering P2 — Usage Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans
> to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the daily-use pair — `work-verify` (evidence-gated completion)
and `work-handoff` (clean-state exit, tracker-aware) — and prove them on a
real M-tier task with a Linear-linked lane.

**Architecture:** Two self-contained skills (no `references/` subfolder —
junctions break relative links outside the skill dir, and the tier table fits
inline). Evidence lands in a new `## Verification` section of
`PROGRESS.md` — a template change, so the standard bumps to **AE/2.1** and
exercises the update flow (bump → changelog → migration note → drift
detection) for the first time. Version literals that mean "current" are
de-hardcoded from skill prose at the same time so future bumps touch only
stamps and the changelog.

**Tech Stack:** Markdown skills + evals; existing `agent-lint` (no new checks
in P2); `orca linear` CLI (verified syntax) with MCP/API fallback ladder.

**Spec:** `docs/specs/SPEC-agent-engineering.md` — P2 phase, skill behavior
contracts (work-verify, work-handoff), Decision 8 (tracker planes).

## Global Constraints

- Evals change before skill content, always (repo hard constraint).
- Any structure/behavior change updates `docs/how-it-works/` in the same
  change (repo hard constraint).
- Self-lint (`node scripts/agent-lint.mjs . --ignore tests,templates,global`)
  and both test suites green before merge.
- SKILL.md <500 raw lines; frontmatter `name` + third-person `description`
  with what + when (lint: skill-size, skill-frontmatter).
- Skill body paths use forward slashes; no relative links outside the skill
  folder (junction-safe); external dependencies named as "the
  Agent-Engineering repo clone (on this machine
  `C:/Briar/repos/mine/Agent-Engineering` — or locate/ask)".
- Exact `orca linear` syntax verified against `--help` before it enters any
  file (low degrees of freedom for CLI invocations).
- Branch `feat/p2-usage-skills`; conventional commits with the house
  trailers; rebase-merge PR at the end.

---

### Task 1: Plan committed

**Files:**
- Create: `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md`

- [x] **Step 1:** Write this plan.
- [x] **Step 2:** Commit: `docs(plan): P2 usage skills`

### Task 2: work-verify evals (before content)

**Files:**
- Create: `skills/work-verify/evals/eval-01.md` … `eval-04.md`

Each eval: `## Query` (verbatim request) + `## Fixture` (described repo
state) + `## Expected behavior` (objective checklist). The four scenarios,
each pinning a distinct failure mode:

- [ ] **eval-01 — S-tier ceremony floor.** Fixture: repo with existing flow +
  verify command; one-line fix done; query "verify this". Expects: runs the
  verify command, reports evidence, and does NOT open a lane, spawn a
  reviewer, or write files (over-ceremony is the failure).
- [ ] **eval-02 — M-tier refusal on red.** Fixture: lane with PLAN acceptance
  criteria; a test actually fails; maker claims done. Expects: layers run in
  order, stops at first red, verdict FAIL with what/why/fix, failure logged
  under Tried and failed, no `## Verification` PASS block, no handoff, never
  "mostly done".
- [ ] **eval-03 — M-tier pass with fresh-context review.** Fixture:
  cross-component change, all green. Expects: L1→L2→L3 in order with real
  commands; dispatches a fresh-context reviewer (no shared context) that
  ACTS — runs the commands itself; evidence block appended to
  `## Verification` in PROGRESS.md (date, tier, per-layer command → exit,
  reviewer verdict); only then "done".
- [ ] **eval-04 — L-tier feature-list gating.** Fixture: `feature_list.json`
  with an `active` row whose verification command exits 0, plus a `passing`
  row someone asks to re-open. Expects: row moves to `passing` only via its
  own command exiting 0, `evidence` set non-null; refuses to move any row to
  `passing` without running its command; refuses to regress the `passing`
  row (irreversible).
- [ ] **Step 2:** Commit: `test(work-verify): evals`

### Task 3: work-verify skill

**Files:**
- Create: `skills/work-verify/SKILL.md`

**Interfaces:**
- Produces: the `## Verification` evidence-block format consumed by
  work-handoff (Task 5) and written into `PROGRESS.md`; the
  fresh-context reviewer contract.

Content outline (self-contained, ~100 lines):

- [ ] **Step 1:** Frontmatter (name, description: what + when triggers:
  "when work claims to be done, before work-handoff, when closing a
  feature-list row").
- [ ] **Step 2:** Core rule + workflow checklist (6 steps): locate work +
  tier (ratchet check first — scope grew ⇒ upgrade, one-way); assemble the
  DoD per tier (S: the one-line DoD + existing verify command; M: PLAN
  acceptance criteria; L: feature-list row commands); run layers in order
  (S: verify command only — no lane, no reviewer; M/L: L1 static → L2 tests
  + it starts → L3 end-to-end for cross-component, stop at first red);
  fresh-context review at M+ (reviewer = subagent/second session/another
  runner, receives lane path + diff range + DoD, must RUN commands, returns
  verdict + its own outputs); record evidence (`## Verification` block; L
  additionally sets row state + evidence, `passing` irreversible); verdict
  (PASS → work-handoff; FAIL → what/why/fix + Tried and failed).
- [ ] **Step 3:** Evidence block format (exact skeleton) + refusal rules (no
  DoD → write one first; anything red → FAIL; maker never self-certifies at
  M+).
- [ ] **Step 4:** Self-check evals mentally; `node scripts/agent-lint.mjs .
  --ignore tests,templates,global` → 0 findings on skills.
- [ ] **Step 5:** Commit: `feat(work-verify): tier DoD verification skill`

### Task 4: work-handoff evals (before content)

**Files:**
- Create: `skills/work-handoff/evals/eval-01.md` … `eval-04.md`

- [ ] **eval-01 — clean close, no tracker.** Fixture: M lane, Verification
  PASS block present, all green, no `issue:` anywhere. Expects: full
  checklist (debris sweep, build+tests, startup path, PROGRESS/DECISIONS
  current), lane folder removed in the closing commit, conventional commit,
  NO tracker calls, report with evidence summary + hash.
- [ ] **eval-02 — refusal: no evidence + debris.** Fixture: lane without any
  `## Verification` PASS block, a `debug.log` + commented-out block + red
  test. Expects: refuses to close; lists every blocker exactly; points to
  work-verify for the missing evidence; no commit, no lane deletion, no
  tracker calls.
- [ ] **eval-03 — Linear-linked close + fallback ladder.** Fixture: lane
  `work/dem-101-…/` with `issue: DEM-101` frontmatter, everything green.
  Expects: detects the key (frontmatter or slug); posts evidence summary via
  `orca linear comment add` and moves status via `orca linear status set`
  (target state: "In Review" when a human review step follows, "Done" only
  when terminal AND repo says passing — the gate rule); when Orca is absent
  falls back to the Linear MCP server, then to emitting the exact calls for
  the operator; NEVER claims the tracker moved without a confirmed call.
- [ ] **eval-04 — pause, not close.** Fixture: session ending mid-work, lane
  healthy but DoD not met. Expects: lane folder SURVIVES; PROGRESS states
  exactly where things stand + next step; WIP committed on the lane's
  branch; no completion claim, no status change (comment optional); debris
  still swept.
- [ ] **Step 2:** Commit: `test(work-handoff): evals`

### Task 5: work-handoff skill

**Files:**
- Create: `skills/work-handoff/SKILL.md`

**Interfaces:**
- Consumes: work-verify's `## Verification` PASS block as the close gate.

- [ ] **Step 1:** Verify exact CLI syntax: `orca linear status set --help`,
  `orca linear comment add --help`; transcribe real flags into the skill.
- [ ] **Step 2:** Frontmatter + body: two modes (close | pause) decided
  first; close gate = latest Verification block is PASS (else run/point to
  work-verify — refuse otherwise); shared checklist (debris sweep, PROGRESS
  truth, DECISIONS complete, commit); close-only (build+tests+startup green,
  lane archived-or-deleted in the closing commit — default delete, history
  keeps it); tracker step only when Linear-linked (key detection →
  comment + status with verified syntax → fallback ladder Orca CLI → Linear
  MCP → emit-for-operator; honest reporting rule); pause-only (lane
  survives, exact state + next recorded); final report format.
- [ ] **Step 3:** Self-lint green. Commit:
  `feat(work-handoff): clean-state handoff skill`

### Task 6: AE/2.1 — template change + version de-hardcoding

**Files:**
- Modify: `templates/repo/work/PROGRESS.md.template` (add `## Verification`
  section with a one-line comment: written by work-verify, gates the close)
- Modify: `templates/repo/AGENTS.md.template` (stamp → AE/2.1)
- Modify: `AGENTS.md` (stamp → AE/2.1; phase line → P2 shipped)
- Modify: `CHANGELOG.md` (new `## AE/2.1 — 2026-08-16` entry)
- Modify: `skills/agent-init/references/migration.md` (title → "v1 and
  legacy → v2"; stamp rows say "current `Standard: AE/<major>.<minor>`
  stamp"; per-version note: **AE/2.1** — PROGRESS gains `## Verification`;
  open lanes append it; restamp)
- Modify: `skills/agent-init/evals/eval-01.md` (expects "stamped with the
  current version (newest CHANGELOG entry)") — **before** SKILL.md
- Modify: `skills/agent-init/SKILL.md` (description drops "(AE/2.0)"; step 6
  says "stamped with the current version — newest CHANGELOG entry")
- Modify: `skills/agent-audit/SKILL.md` (report line → `current AE/<newest
  CHANGELOG version>`)
- Modify: `tests/fixtures/v2-clean/AGENTS.md` (claims full compliance →
  restamp AE/2.1; keep lint tests green)

- [ ] **Step 1:** Eval edit first, commit:
  `test(agent-init): de-hardcode current version in eval`
- [ ] **Step 2:** All remaining edits; run
  `node tests/run-lint-tests.mjs` (12/12) + `node tests/run-gen-tests.mjs`
  (7/7) + self-lint (0 findings).
- [ ] **Step 3:** Commit: `feat(standard)!: AE/2.1 — PROGRESS Verification
  section; de-hardcode current-version prose` (minor bump, `!` not needed —
  use `feat(standard):`).

### Task 7: how-it-works + root docs reflect shipped P2

**Files:**
- Modify: `docs/how-it-works/work-lifecycle.md` (flip both "arrive in P2"
  notes and the `> Phase: P2` tags → "live since AE/2.1"; document the
  evidence-block format, the reviewer contract, the two handoff modes and
  the close gate; tracker-plane section stays P3 for the connector recipes)
- Modify: `docs/how-it-works/architecture.md` (skills section: work-* →
  live AE/2.1)
- Modify: `docs/how-it-works/README.md` (work-lifecycle row → "live since
  AE/2.1"; convention text unchanged)
- Modify: `docs/how-it-works/standard-lifecycle.md` (install diagram stamp
  label → `Standard: AE/<current>`)
- Modify: `README.md` (architecture table skills row; Status → AE/2.1 / P2
  shipped)

- [ ] **Step 1:** All edits; re-run self-lint (docs-index/broken-link).
- [ ] **Step 2:** Commit: `docs: how-it-works and root files reflect shipped P2`

### Task 8: Acceptance — M-tier task end-to-end (Linear-linked)

Fixture: scratchpad `p2-accept/demo-repo` (git init; `package.json` with
`npm test` → `node --test`; AGENTS.md AE/2.1 + pointer). The gate from the
spec: *an M-tier task runs end-to-end under the standard with
evidence-gated completion and clean handoff (Linear-linked case included).*

- [ ] **Step 1:** Init fixture; open lane `work/dem-101-slugify-util/` from
  templates (PLAN with executable acceptance, PROGRESS with frontmatter
  `issue: DEM-101`).
- [ ] **Step 2:** Do the work: failing test → implement `src/slugify.js` →
  green.
- [ ] **Step 3:** Run **work-verify** per the skill: L1 `node --check`, L2
  `npm test` + import-starts, L3 n/a (single component — decision recorded);
  fresh-context reviewer = real subagent (Agent tool) that runs the commands
  itself; evidence block written to PROGRESS `## Verification`.
- [ ] **Step 4:** Run **work-handoff** per the skill: close mode; sweep;
  lane deleted in closing commit; DEM-101 detected → Orca CLI present but no
  demo issue exists in the real workspace → bottom of the ladder: emit the
  two exact calls with payloads (no fake write, honest report).
- [ ] **Step 5:** Record the acceptance evidence (commands + outputs) in
  this plan under Task 8 results; tick the checkboxes. Commit:
  `docs(plan): P2 acceptance evidence`

**Results:** *(filled at execution)*

### Task 9: Merge + go live

- [ ] **Step 1:** Final gates: self-lint 0 findings; `run-lint-tests` 12/12;
  `run-gen-tests` 7/7; stamp == newest CHANGELOG (AE/2.1).
- [ ] **Step 2:** Push; `gh pr create`; rebase-merge; branch auto-deleted;
  `git pull` main.
- [ ] **Step 3:** Junctions: re-run `workstation/claude/install.ps1`
  (declarative — new skill dirs appear as junctions); verify
  `~/.claude/skills/work-verify` + `work-handoff` targets.
- [ ] **Step 4:** Update memory `agent-engineering-repo.md` (P2 shipped,
  AE/2.1, next P3) and report.
