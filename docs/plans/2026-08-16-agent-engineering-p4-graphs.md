# Agent-Engineering P4 — Graphs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans
> to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax.

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

- [x] **Step 1:** Write this plan. Commit: `docs(plan): P4 graphs`

### Task 2: fan-out evals (before content)

**Files:** `skills/fan-out/evals/eval-01.md` … `eval-04.md`

- [x] **eval-01 — refusal: dependent chain.** Three "features" where B
  consumes A's output and C touches A's files. Expects: the three
  questions answered in writing expose the dependency; conclusion is a
  single lane (or staged sequence), NO worktrees, no fan-out theater.
- [x] **eval-02 — full fan-out.** Feature list with 3 independent rows.
  Expects: anchors frozen and named (SPEC, interfaces, feature list);
  parent PLAN gains `## Fan-out` (questions + worker table lane/worktree/
  branch/runner/spawn + reducer contract); one worktree per lane (`orca
  worktree create` primary, `git worktree add` fallback); workers receive
  artifacts only (worktree path, lane path, DoD) and never touch anchors
  or siblings; WIP=1 per worker.
- [x] **eval-03 — reducer discipline.** Two workers finished; one diverged
  from the frozen interface. Expects: merge order is deterministic (item
  order, never arrival order); each lane must show a Verification PASS
  before merging; the disagreement resolves by the named rule (anchors
  win; divergence recorded as a finding, not silently patched); after the
  merge the WHOLE runs its gate (synthesis verification) — parts passing
  is not the whole passing.
- [x] **eval-04 — portability lane.** One lane's worker is a non-Claude
  runner. Expects: spawn command comes from `reference/runners.md`; the
  handoff is artifacts-only (no runner-specific files created); the worker
  records PROGRESS + evidence identically; the reducer treats the lane
  identically; when no non-Claude runner is installed, the skill says so
  and emits the ready-to-run protocol instead of faking the run.
- [x] **Step 2:** Commit: `test(fan-out): evals`

### Task 3: fan-out skill

**Files:** `skills/fan-out/SKILL.md`

- [x] **Step 1:** Body: qualification (≥2 truly independent items, else
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
- [x] **Step 2:** Self-lint green. Commit: `feat(fan-out): parallel lanes with a reducer`

### Task 4: reference docs

**Files:** `reference/graphs-and-reducers.md`, `reference/runners.md`

- [x] **graphs-and-reducers.md** — when a graph is warranted (orchestration
  tax: coordination cost grows with edges; parallelize only independence),
  DAG + gates on edges, fan-out/fan-in, the reducer (deterministic
  compression between workers and synthesis), anchors, failure locality.
  Sources: Osmani orchestration tax; Anthropic building effective agents +
  multi-agent research system. ≤120.
- [x] **runners.md** — per-runner table: entry file, skills support, spawn
  command, machine-verified vs docs-cited status. claude (verified on this
  machine) · codex · gemini CLI (GEMINI.md default; configure
  `contextFileName: AGENTS.md` — never an adapter file) · opencode · grok
  · dsh (dev preview, breaking changes, zero coupling per Decision 6).
  Generic spawn-inheritance rule (workers inherit the spawner's
  account/config; multi-account machines pass the selector explicitly —
  the machine-specific instance lives in the global layer, not here). ≤120.
- [x] **Step 2:** Commit: `docs(reference): graphs-and-reducers, runners`

### Task 5: how-it-works + root docs (no bump)

**Files:** `docs/how-it-works/execution.md`, `architecture.md`,
`README.md` (how-it-works), root `README.md`, `AGENTS.md`

- [x] **Step 1:** execution.md: graphs section flips from `> Phase: P4`
  stub to full (fan-out lifecycle Mermaid, reducer contract, anchors,
  portability story + current machine status); architecture.md Graph layer
  paragraph → live, skills line + reference line updated; how-it-works
  README row → fully live; root README (reference row live, skills row,
  Status para — stamp stays AE/2.2, phase P4); AGENTS.md phase line → "P4
  shipped (graph layer live); P5 hardening remains". Self-lint green.
- [x] **Step 2:** Commit: `docs: how-it-works reflects shipped P4`

### Task 6: Acceptance 1 — real fan-out with reducer

Fixture `p4-accept/demo-repo` (scratchpad): node lib, AGENTS.md AE/2.2 +
pointer, `feature_list.json` with F01 slugify / F02 truncate / F03
wordcount (independent modules), SPEC anchor freezing the API (one module,
one exported function each).

- [x] **Step 1:** Init fixture; parent lane `work/fanout-textkit/` with
  PLAN `## Fan-out` (three questions, anchors, worker table, reducer
  contract); 3 lanes + 3 git worktrees (fallback column, deliberately).
- [x] **Step 2:** Spawn 3 parallel subagent workers, artifacts-only (their
  worktree, their lane, the DoD); each implements + tests + writes its
  lane PROGRESS with a Verification PASS block.
- [x] **Step 3:** Reduce per contract: check PASS per lane → merge branches
  in F-order → run the whole's gate (`npm test` + each row's verification
  command) → feature rows → passing with evidence → parent PROGRESS
  records the reduce → handoff closes lanes and parent.
- [x] **Step 4:** Record evidence below. Commit: `docs(plan): P4 acceptance
  evidence (part 1)`

### Task 7: Acceptance 2 — portability protocol (run blocked on owner)

- [x] **Step 1:** Leave lane `work/f04-capitalize/` in the fixture:
  SPEC/PLAN/PROGRESS ready, `not_started` row F04, plus the exact spawn
  command per runner from runners.md. The proof run executes the day a
  non-Claude runner is installed+authenticated; the report requests
  exactly that from the owner. No success claimed meanwhile.

**Results (2026-08-16):**

- **Acceptance 1 — real fan-out with reducer: PASS.** Fixture `p4-accept/
  demo-repo` (textkit): anchor SPEC + feature list F01-F03; parent lane
  `work/fanout-textkit/` carried the three questions, frozen anchors,
  worker table, and reducer contract before any worker started. Three
  parallel subagent workers in three git worktrees (fallback column,
  deliberately) ran TDD red→green in full isolation: F01 slugify
  `63c757e` (9 tests), F02 truncate `2a09555` (7), F03 wordcount
  `7002ec2` (7) — each lane finished with a real Verification PASS block.
  Reduce per contract: coordinator read (not trusted) the PASS blocks,
  merged in item order with 0 conflicts, and ran the synthesis gate on the
  merged tree — `npm test` 23/23 + each row's verification command exit
  0 — then moved rows to `passing` with merged-tree evidence and closed
  all lanes (`df2bcb5` evidence, `520fb3a` close; worktrees and branches
  removed; suite still 23/23 after close).
- **Anchor discipline showed up for real:** F01's worker hit a genuine
  SPEC ambiguity ("alphanumeric": ASCII vs Unicode) and F02's worker hit
  an edge case (single word longer than max ⇒ "…" alone under the strict
  reading) — both implemented the plain reading and FLAGGED instead of
  improvising; recorded as findings in the parent lane, zero anchor
  reverts needed. Maker ≠ checker held: workers wrote, the coordinator
  re-ran everything on the merged tree.
- **Acceptance 2 — portability protocol ready, run pending.** Lane
  `work/f04-capitalize/` committed (`5658a42`): SPEC F04 interface,
  PLAN with per-runner spawn commands from runners.md, F04 row
  `not_started`. Machine evidence stands: no non-Claude runner on PATH
  (codex/gemini/opencode/dsh/grok all absent) — the run executes when the
  owner installs + authenticates one; no success claimed meanwhile.
- Fixture lints 0 high / 0 medium with agent-lint post-close (1 low:
  docs/ index — cosmetic in a scratch fixture, and proof the lint reads
  consumer repos honestly).

**Addendum — Acceptance 2 RAN and PASSED (same day):** the owner chose
opencode + DeepSeek v4 flash. Install hit the `ignore-scripts=true` gotcha
(platform binary via explicit `opencode-windows-x64` + manual
`postinstall.mjs`; now a documented note in runners.md). Probe:
`opencode run -m opencode/deepseek-v4-flash-free` works with NO auth (free
gateway model). The run: the runner executed `work/f04-capitalize/` from
artifacts alone — red `exit 1 MODULE_NOT_FOUND` → green (9 passed) → full
suite 32/32 → PASS block in the exact house shape → PLAN ticked → only the
four allowed files touched → nothing committed (as instructed). The
coordinator re-ran every command independently (32/32 confirmed) and
caught a SPEC ambiguity the worker missed (`'¡hola!'` unchanged under the
first-character reading of "first letter") — recorded as a finding in the
lane before closing it (`f50022a` evidence, `c0adcc4` close; suite green
post-close). Portability claim: **proven** — a non-Claude runner, on a
free non-Anthropic model, completed a lane end to end with zero
runner-specific files.

### Task 8: Merge + go live

- [x] **Step 1:** Final gates (self-lint, 12/12, 7/7; stamp stays AE/2.2 ==
  newest CHANGELOG).
- [x] **Step 2:** Push; PR; rebase-merge; pull main; delete branch.
- [x] **Step 3:** Installer run → `fan-out` junction verified.
- [x] **Step 4:** Memory update + report (with the one-action request:
  install/auth a non-Claude runner, then the proof runs).
