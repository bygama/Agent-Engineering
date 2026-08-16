# Agent-Engineering P4 — Graphs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans
> to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship the graph layer — the `fan-out` skill,
`reference/graphs-and-reducers.md`, `reference/runners.md` — and prove it:
one real fan-out with a reducer between workers and synthesis, plus the
portability protocol for a non-Claude runner executing a lane from
artifacts alone.

**Architecture:** A fan-out is written down before it runs: the parent
lane's PLAN.md gains a `## Fan-out` section answering the three pre-fan-out
questions (where does each work / how do results merge / who resolves
disagreement), naming the **anchors** (files frozen read-only during the
split — SPEC, interface contracts, feature list), and installing the
**reducer contract** (worker output shape, deterministic merge order,
disagreement rule, synthesis verification of the merged whole). One item ↔
one lane ↔ one worktree ↔ one worker; the existing machinery (Verification
PASS blocks, feature-list gating) is the currency the reducer consumes — no
new artifact type, so **no version bump**: P4 changes no template and no
check, exercising the "docs/skills only ⇒ no bump" branch of the
versioning rule for the first time (P2 bumped for a template edit, P3 for a
template add).

**Tech Stack:** Markdown skill + evals; git worktrees (fixture path —
exercises the no-Orca fallback column deliberately); parallel subagent
workers; `node --test`.

**Spec:** `docs/specs/SPEC-agent-engineering.md` — P4 phase, fan-out
contract, Decisions 5 (artifacts, not adapters) and 6 (dsh zero coupling).

## Global Constraints

- Evals before content; how-it-works in the same change; self-lint + both
  suites green before merge (repo hard constraints).
- reference/ ≤120 lines, source+date headers; SKILL.md <500.
- Zero runner-specific files anywhere; every runner claim in runners.md is
  either machine-verified or cited to public docs with dates.
- **Machine evidence (2026-08-16):** `codex`, `gemini`, `opencode`, `dsh`,
  `grok` all absent from PATH; only `claude` present; Orca manages one
  Claude account and no Codex accounts. The portability RUN is therefore
  blocked on the owner installing + authenticating a non-Claude runner —
  the phase ships the protocol ready-to-run and the report requests that
  single action; no success is claimed for the run itself.
- Branch `feat/p4-graphs`; house trailers; rebase-merge PR.

---

### Task 1: Plan committed

- [ ] **Step 1:** Write this plan. Commit: `docs(plan): P4 graphs`

### Task 2: fan-out evals (before content)

**Files:** `skills/fan-out/evals/eval-01.md` … `eval-04.md`

- [ ] **eval-01 — refusal: dependent chain.** Three "features" where B
  consumes A's output and C touches A's files. Expects: the three
  questions answered in writing expose the dependency; conclusion is a
  single lane (or staged sequence), NO worktrees, no fan-out theater.
- [ ] **eval-02 — full fan-out.** Feature list with 3 independent rows.
  Expects: anchors frozen and named (SPEC, interfaces, feature list);
  parent PLAN gains `## Fan-out` (questions + worker table lane/worktree/
  branch/runner/spawn + reducer contract); one worktree per lane (`orca
  worktree create` primary, `git worktree add` fallback); workers receive
  artifacts only (worktree path, lane path, DoD) and never touch anchors
  or siblings; WIP=1 per worker.
- [ ] **eval-03 — reducer discipline.** Two workers finished; one diverged
  from the frozen interface. Expects: merge order is deterministic (item
  order, never arrival order); each lane must show a Verification PASS
  before merging; the disagreement resolves by the named rule (anchors
  win; divergence recorded as a finding, not silently patched); after the
  merge the WHOLE runs its gate (synthesis verification) — parts passing
  is not the whole passing.
- [ ] **eval-04 — portability lane.** One lane's worker is a non-Claude
  runner. Expects: spawn command comes from `reference/runners.md`; the
  handoff is artifacts-only (no runner-specific files created); the worker
  records PROGRESS + evidence identically; the reducer treats the lane
  identically; when no non-Claude runner is installed, the skill says so
  and emits the ready-to-run protocol instead of faking the run.
- [ ] **Step 2:** Commit: `test(fan-out): evals`

### Task 3: fan-out skill

**Files:** `skills/fan-out/SKILL.md`

- [ ] **Step 1:** Body: qualification (≥2 truly independent items, else
  refuse toward a single lane — the three questions ARE the qualification
  test, answered in writing); freeze + name anchors; plan lanes (item ↔
  lane ↔ worktree ↔ worker; worker table with runner + spawn command);
  install the reducer contract in the parent PLAN (output shape = lane
  Verification PASS + result summary; deterministic merge order;
  disagreement rule with a named resolver and "anchors win"; synthesis
  gate on the merged whole); execute (create worktrees, spawn workers
  artifacts-only); reduce (collect → verify PASS per lane → merge in order
  → resolve per rule → run the whole's gate → record in parent PROGRESS);
  close via work-handoff per lane then parent. Failure locality: a failed
  lane is redone or dropped, never repaired cross-lane mid-flight.
- [ ] **Step 2:** Self-lint green. Commit: `feat(fan-out): parallel lanes with a reducer`

### Task 4: reference docs

**Files:** `reference/graphs-and-reducers.md`, `reference/runners.md`

- [ ] **graphs-and-reducers.md** — when a graph is warranted (orchestration
  tax: coordination cost grows with edges; parallelize only independence),
  DAG + gates on edges, fan-out/fan-in, the reducer (deterministic
  compression between workers and synthesis), anchors, failure locality.
  Sources: Osmani orchestration tax; Anthropic building effective agents +
  multi-agent research system. ≤120.
- [ ] **runners.md** — per-runner table: entry file, skills support, spawn
  command, machine-verified vs docs-cited status. claude (verified on this
  machine) · codex · gemini CLI (GEMINI.md default; configure
  `contextFileName: AGENTS.md` — never an adapter file) · opencode · grok
  · dsh (dev preview, breaking changes, zero coupling per Decision 6).
  Generic spawn-inheritance rule (workers inherit the spawner's
  account/config; multi-account machines pass the selector explicitly —
  the machine-specific instance lives in the global layer, not here). ≤120.
- [ ] **Step 2:** Commit: `docs(reference): graphs-and-reducers, runners`

### Task 5: how-it-works + root docs (no bump)

**Files:** `docs/how-it-works/execution.md`, `architecture.md`,
`README.md` (how-it-works), root `README.md`, `AGENTS.md`

- [ ] **Step 1:** execution.md: graphs section flips from `> Phase: P4`
  stub to full (fan-out lifecycle Mermaid, reducer contract, anchors,
  portability story + current machine status); architecture.md Graph layer
  paragraph → live, skills line + reference line updated; how-it-works
  README row → fully live; root README (reference row live, skills row,
  Status para — stamp stays AE/2.2, phase P4); AGENTS.md phase line → "P4
  shipped (graph layer live); P5 hardening remains". Self-lint green.
- [ ] **Step 2:** Commit: `docs: how-it-works reflects shipped P4`

### Task 6: Acceptance 1 — real fan-out with reducer

Fixture `p4-accept/demo-repo` (scratchpad): node lib, AGENTS.md AE/2.2 +
pointer, `feature_list.json` with F01 slugify / F02 truncate / F03
wordcount (independent modules), SPEC anchor freezing the API (one module,
one exported function each).

- [ ] **Step 1:** Init fixture; parent lane `work/fanout-textkit/` with
  PLAN `## Fan-out` (three questions, anchors, worker table, reducer
  contract); 3 lanes + 3 git worktrees (fallback column, deliberately).
- [ ] **Step 2:** Spawn 3 parallel subagent workers, artifacts-only (their
  worktree, their lane, the DoD); each implements + tests + writes its
  lane PROGRESS with a Verification PASS block.
- [ ] **Step 3:** Reduce per contract: check PASS per lane → merge branches
  in F-order → run the whole's gate (`npm test` + each row's verification
  command) → feature rows → passing with evidence → parent PROGRESS
  records the reduce → handoff closes lanes and parent.
- [ ] **Step 4:** Record evidence below. Commit: `docs(plan): P4 acceptance
  evidence (part 1)`

### Task 7: Acceptance 2 — portability protocol (run blocked on owner)

- [ ] **Step 1:** Leave lane `work/f04-capitalize/` in the fixture:
  SPEC/PLAN/PROGRESS ready, `not_started` row F04, plus the exact spawn
  command per runner from runners.md. The proof run executes the day a
  non-Claude runner is installed+authenticated; the report requests
  exactly that from the owner. No success claimed meanwhile.

**Results:** *(filled at execution)*

### Task 8: Merge + go live

- [ ] **Step 1:** Final gates (self-lint, 12/12, 7/7; stamp stays AE/2.2 ==
  newest CHANGELOG).
- [ ] **Step 2:** Push; PR; rebase-merge; pull main; delete branch.
- [ ] **Step 3:** Installer run → `fan-out` junction verified.
- [ ] **Step 4:** Memory update + report (with the one-action request:
  install/auth a non-Claude runner, then the proof runs).
