# Orca-first + tier XL — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the standard Orca-first in execution (probe + no-Orca
contract + five adopted primitives, AE/2.4), then add tier XL with
consumer-facing tier docs (AE/2.5).

**Architecture:** Two sequential M-tier lanes, one PR and one version bump
each. Lane 1 replaces every fallback ladder with a single executable probe
and one universal contract, and enriches the Orca mapping with the five
primitives from the 2026-08-16 CLI survey. Lane 2 adds the XL row on top of
that world. Evals change before skill content in every touched skill.

**Tech Stack:** Markdown artifacts, zero-dep Node test suites, `gh` CLI.

**Spec:** `docs/plans/2026-08-16-orca-first-xl-design.md` (decisions D1-D6).

## Global Constraints

- All artifacts in English; conventional commits; PR + rebase merge only
  (main rejects direct pushes); `git pull --rebase`.
- Commit trailers on every commit:
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` +
  `Claude-Session: https://claude.ai/code/session_01253fTnEmyEpdHv2B5XPEHM`.
- Evals change BEFORE skill content on every touched skill (hard
  constraint, AGENTS.md).
- Any structure/behavior change updates the affected `docs/how-it-works/`
  chapter in the same change.
- Reference docs ≤120 lines; how-it-works exempt.
- The four gates green before each merge:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.
- Verified command syntax only — every Orca command below was verified
  on-machine 2026-08-16 (probe run + `orca skills get orca-cli`); do not
  invent flags beyond them.
- M-tier ceremony per lane: `work/<slug>/` with PLAN + PROGRESS
  (+ DECISIONS), fresh-context reviewer before close, work-handoff close.

---

## Lane 1 — AE/2.4 "Orca-first execution" (branch `feat/orca-first`, from `design/orca-first-xl`)

### Task 1: Open the lane

**Files:**
- Create: `work/orca-first/PLAN.md`, `work/orca-first/PROGRESS.md`,
  `work/orca-first/DECISIONS.md`

**Interfaces:**
- Produces: the lane folder every later task's PROGRESS updates point at.

- [ ] **Step 1:** Instantiate the three files from `templates/repo/work/`
  (PLAN acceptance criteria = Tasks 2-10 of this plan, each with its gate
  command; PROGRESS `## Verification` section present, empty; SPEC.md is
  n/a — the design doc is the spec, note that in PLAN).
- [ ] **Step 2:** Commit: `chore(lane): open work/orca-first`

### Task 2: Evals first — pin the Orca-first behaviors

**Files:**
- Modify: `skills/loop-setup/evals/eval-02.md`,
  `skills/loop-setup/evals/eval-03.md`,
  `skills/work-handoff/evals/eval-03.md`,
  `skills/fan-out/evals/eval-02.md`
- Create: `skills/work-handoff/evals/eval-06.md`
- Modify (one line each, add probe expectation): the first eval of
  `work-verify` that pins the M/L three layers (read
  `skills/work-verify/evals/eval-0*.md`, find the one asserting L1/L2/L3).

**Interfaces:**
- Produces: the behavioral contract Tasks 5-7 implement. Task 10's
  eval-structure gate (`run-eval-checks.mjs`) must pass on these files.

- [ ] **Step 1:** `skills/loop-setup/evals/eval-02.md` — replace the
  trigger bullet (lines 27-28) with:

  ```markdown
      - trigger: probe first (`orca status --json`); primary
        `orca automations create --name <n> --trigger weekly --day 1 …
        --disabled` (enabled only on explicit go) AND the manual fallback
        named: "run one iteration of loops/<name>.md" to any agent.
        No cron//schedule recipes.
  ```

- [ ] **Step 2:** `skills/loop-setup/evals/eval-03.md` — replace the last
  checkbox (lines 28-29) with:

  ```markdown
  - [ ] Without Orca, the no-Orca contract applies: the loop file still
        scaffolds (it is a file), but the agent declares that scheduling
        and the Linear queue are NOT wired ("no Orca — needs an Orca
        session or the operator") and offers the manual iteration. It
        never names cron/MCP/API recipes and never claims a wired trigger.
  ```

- [ ] **Step 3:** `skills/work-handoff/evals/eval-03.md` — replace the
  fallback checkbox (lines 27-29) with the contract, and add card
  expectations:

  ```markdown
  - [ ] When `orca` is unavailable: emits the exact calls + payloads for
        the operator and says the tracker was NOT updated — no MCP or API
        improvisation, no unconfirmed writes.
  - [ ] Inside an Orca worktree, the close also updates the card:
        `orca worktree set --worktree active --workspace-status in-review`
        (completed when terminal) and a final `--comment` checkpoint.
  ```

- [ ] **Step 4:** Create `skills/work-handoff/evals/eval-06.md`:

  ```markdown
  # Eval 06: full transfer to another agent (Orca)

  ## Query

  "Pause work/dem-102-report-export and hand it to another agent."

  ## Fixture

  Lane `work/dem-102-report-export/` mid-flight, tests currently red with
  the blocker recorded in PROGRESS. Orca session (probe passes).

  ## Expected behavior

  - [ ] Pause path: WIP committed on the lane branch, lane folder
        SURVIVES, PROGRESS names the red command as the blocker and a
        concrete Next.
  - [ ] Transfer uses the full-handoff recipe: `orca worktree create
        --no-parent --agent <id> --prompt "<lane path + resume brief>"`
        — never `orca orchestration task-create` (a full handoff
        transfers ownership; task rows are supervised orchestration).
  - [ ] After the spawn, the original agent stops monitoring — no waits,
        no dual-send; the card gets a final `--comment` checkpoint.
  - [ ] Without Orca: the pause completes (files), and the transfer is
        declared NOT done with the ready-to-run spawn command emitted.
  ```

- [ ] **Step 5:** `skills/fan-out/evals/eval-02.md` — replace the worktree
  checkbox (line 22) with:

  ```markdown
  - [ ] Probe first (`orca status --json`). One worktree per lane,
        spawned agent-first: `orca worktree create --agent <id>
        --prompt "<worktree path + lane path + DoD>" --parent-worktree
        active` — one command per worker, no bare-create-then-terminal
        anti-pattern. Follow-ups use the single startupTerminal handle
        (`terminal wait --for tui-idle`, then `terminal send`).
  - [ ] Coordinator↔worker coordination beyond the spawn runs through
        `orca orchestration` (dispatch, inbox/reply), never ad-hoc
        `terminal send` chains.
  - [ ] Without Orca: fan-out is declared NOT runnable in parallel; the
        same lanes are offered sequentially under the same ceremony.
  ```

- [ ] **Step 6:** In the work-verify eval pinning the three layers, add:

  ```markdown
  - [ ] L3 on an Orca machine may name the built-in browser
        (`orca goto/snapshot/click/wait --json`) as the e2e tool for
        web-facing flows; without Orca, another executed e2e path or a
        recorded "L3 n/a" — never a silent skip.
  ```

- [ ] **Step 7:** Run `node tests/run-eval-checks.mjs` → expect exit 0
  (structure intact). Commit:
  `test(skills): evals pin orca-first probe, contract, and primitives`

### Task 3: Rewrite `reference/orca.md`

**Files:**
- Modify: `reference/orca.md` (full rewrite, ≤120 lines)

**Interfaces:**
- Produces: the probe procedure, the no-Orca contract, and the mapping
  table that skills (Task 5-7) and how-it-works (Task 9) cite by name.

- [ ] **Step 1:** Replace the file body with (keep a source header citing
  CLI help + `orca skills get orca-cli`, verified 2026-08-16, and ADR-001):
  - **Section "The probe — step 0 of every executing skill":** resolve the
    executable once per session — `ORCA_CLI_COMMAND` if set → `orca-dev`
    when `ORCA_DEV_REPO_ROOT` is exposed → `orca-ide` on Linux outside
    Orca terminals (bare `orca` there is the GNOME screen reader) →
    `orca`. Then `ORCA status --json`: exit 0 with `"ok": true` ⇒ Orca
    session, single path. Anything else ⇒ the no-Orca contract. The
    response's `capabilities` array serves feature-level detection; the
    same command is the natural automation `--precheck`.
  - **Section "The no-Orca contract"** (verbatim from design D2): without
    Orca an agent may do everything that is a file — read and write lanes,
    run gates, append PASS blocks, execute one manual iteration of any
    loop. It may not schedule, parallelize with managed worktrees, or
    write to the tracker. On hitting an Orca-only step it declares it
    explicitly ("no Orca — <step> was NOT done; needs an Orca session or
    the operator") and continues with what remains. Never silently
    skipped, never faked.
  - **Section "The mapping table"** — single command column, rows:
    | Standard concept | Orca command (verified) |
    - Lane in isolation → `orca worktree create` (`--parent-worktree
      active` for children; `--linear-issue <KEY>` links the tracker)
    - Worker spawn (fan-out) → `orca worktree create --agent <id>
      --prompt "<brief>" --parent-worktree active` — one command:
      worktree + agent in its first terminal + the brief
    - Worker follow-up → single `startupTerminal.handle`:
      `orca terminal wait --terminal <h> --for tui-idle --timeout-ms <ms>`
      then `orca terminal send --terminal <h> --text "…" --enter`;
      stale handle ⇒ re-list, never dual-send
    - Lane visibility → `orca worktree set --worktree active --comment
      "<checkpoint>"` at PROGRESS state changes; `--workspace-status
      in-progress|in-review|completed` mirrors the lane lifecycle
    - Coordinator↔workers (XL) → `orca orchestration` (task DAGs,
      dispatch, inbox/reply; workers read mail with `orca orchestration
      check --unread --inject`) — never ad-hoc `terminal send` for
      structured coordination
    - Full lane transfer → `orca worktree create --no-parent --agent <id>
      --prompt "<brief>"`, then stop monitoring; never `task-create` for
      a full handoff
    - Long-lived process → `orca terminal create --worktree <sel>
      --command "<cmd>" --title "<name>"`; cursor reads for long output
    - Loop / schedule → `orca automations create --name <n> --trigger
      <preset|cron|RRULE> --prompt "follow loops/<name>.md" --provider
      <agent> [--precheck <cmd>] [--repo <sel>] [--workspace-mode
      new-per-run] --disabled` — enable only on explicit go
    - Tracker → `orca linear …` (`reference/tracker.md`)
    - E2E surface (web) → built-in browser `orca goto/snapshot/click/wait
      --json` — the named L3 tool for web-facing work on an Orca machine
    - Report publishing → `orca artifacts share <file>` — human-granted
      device capability; on `artifact_sharing_disabled` deliver locally,
      do not retry
  - **Keep (edited) the existing notes sections:** automation flags
    (triggers list, `--precheck` semantics caveat, `--disabled` default,
    prompt points at the loop file); worktree/terminal notes (one lane ⇔
    one worktree; never a dev server as a background shell; agent-first
    create preferred — bare create + later `terminal create` is the
    anti-pattern for ordinary workers; spawn-command inheritance is
    machine policy in the global layer). Delete the "When there is no
    Orca" section (replaced by the contract).
- [ ] **Step 2:** `node scripts/agent-lint.mjs . --ignore
  tests,templates,global` → exit 0 (line budget included). Commit:
  `feat(reference): orca.md — probe, no-orca contract, five primitives`

### Task 4: Prune `reference/loops.md`, `reference/tracker.md`, `reference/graphs-and-reducers.md`

**Files:**
- Modify: `reference/loops.md:36` (trigger row),
  `reference/tracker.md:52-59` (fallback ladder),
  `reference/graphs-and-reducers.md:59-65` ("In this standard")

- [ ] **Step 1:** loops.md five-elements table, Trigger row becomes:
  `primary Orca automation + the manual fallback ("run one iteration of
  loops/<name>.md" to any agent) — reference/orca.md`.
- [ ] **Step 2:** tracker.md — replace "## Fallbacks, honest at every
  rung" with:

  ```markdown
  ## Without Orca

  The no-Orca contract (`reference/orca.md`) applies: tracker writes are
  Orca-only. Emit the exact calls + payloads for the operator and state
  plainly that the tracker was NOT updated. Never claim a write without a
  confirmed call.
  ```

- [ ] **Step 3:** graphs-and-reducers.md "In this standard" — after the
  runner-choice sentence add: workers spawn agent-first
  (`orca worktree create --agent … --prompt …`, one command per worker)
  and coordinate through `orca orchestration`; without Orca the same
  lanes run sequentially under the same ceremony (no-Orca contract).
- [ ] **Step 4:** Lint gate → exit 0. Commit:
  `refactor(reference): fallback ladders replaced by the no-orca contract`

### Task 5: Skills — `loop-setup` and `work-handoff` single path

**Files:**
- Modify: `skills/loop-setup/SKILL.md` (description line 3, trigger
  matrix lines 41-47, step 5 lines 73-75),
  `skills/work-handoff/SKILL.md` (step 6 lines 67-93, step 5 close text)

- [ ] **Step 1:** loop-setup: add step 0 to the workflow checklist —
  `- [ ] 0. Probe: orca status --json (reference/orca.md)`. Replace the
  trigger matrix with two rows only: Schedule/On-event → the
  `orca automations create … --disabled` form; Manual →
  `orca automations run <name>` or "run one iteration of loops/<name>.md"
  to any agent (works without Orca — it is the universal fallback).
  Step 5 text: register only with explicit go; without Orca, declare the
  trigger NOT wired per the contract and leave the command ready to
  paste. Description line: drop "/loop, /schedule, cron, or on-new-issue"
  enumeration in favor of "Orca automation, with a manual-iteration
  fallback".
- [ ] **Step 2:** work-handoff step 6: keep the two verified `orca linear`
  commands; replace the fallback-ladder paragraph with the contract
  (emit calls + "the tracker was NOT updated"; never unconfirmed
  writes). Add card sync to the close path: `orca worktree set
  --worktree active --workspace-status in-review` (completed when
  terminal) + final `--comment`; pause path gains the transfer recipe:
  when handing to another agent, `orca worktree create --no-parent
  --agent <id> --prompt "<lane path + resume brief>"`, never
  `task-create`, stop monitoring after the spawn.
- [ ] **Step 3:** Lint + `node tests/run-eval-checks.mjs` → exit 0.
  Commit: `feat(skills): loop-setup + work-handoff go orca-first`

### Task 6: Skills — `fan-out` and `work-verify`

**Files:**
- Modify: `skills/fan-out/SKILL.md` (step 3 lines 47-52, step 5
  lines 69-79), `skills/work-verify/SKILL.md` (L3 bullet lines 53-58)

- [ ] **Step 1:** fan-out step 3: worktrees line becomes agent-first —
  the worker table's spawn command column is `orca worktree create
  --agent <id> --prompt "<worktree + lane + DoD>" --parent-worktree
  active` (probe first; without Orca, fan-out is declared not runnable
  in parallel and the lanes run sequentially, same ceremony). Step 5:
  follow-ups via the single startup terminal handle (tui-idle wait, then
  send); structured coordination through `orca orchestration`; keep the
  artifacts-only worker brief unchanged.
- [ ] **Step 2:** work-verify L3 bullet: add "on an Orca machine the
  built-in browser (`orca goto/snapshot/click/wait --json`) is the named
  e2e tool for web-facing flows" — degradation = another executed path
  or recorded n/a, never a silent skip.
- [ ] **Step 3:** Lint + eval-checks → exit 0. Commit:
  `feat(skills): fan-out agent-first spawn, work-verify names the e2e browser`

### Task 7: Templates and live loops

**Files:**
- Modify: `templates/repo/loops/LOOP.md.template:33-37` (Trigger),
  `templates/repo/loops/issue-triage.example.md` (Trigger section),
  `loops/self-audit.md:41-49` (Trigger), `loops/issue-triage.md`
  (Trigger)

- [ ] **Step 1:** Template Trigger section becomes:

  ```markdown
  ## Trigger

  - Primary: `{{ORCA_AUTOMATIONS_CREATE_COMMAND}}` (created `--disabled`;
    enabled only on the owner's explicit go)
  - Manual fallback: "run one iteration of `loops/{{LOOP_SLUG}}.md`" to
    any agent — works with or without Orca
  - Writes: report-only until the owner enables them
  ```

- [ ] **Step 2:** Apply the same three-line shape to the example and both
  live loop files (their primaries stay as already registered; the
  fallback line replaces `/schedule`/cron/Task Scheduler mentions).
- [ ] **Step 3:** Lint (templates ignored, loops linted) → exit 0.
  Commit: `feat(templates): loop trigger = orca automation + manual iteration`

### Task 8: ADR-001

**Files:**
- Create: `docs/adrs/ADR-001-orca-is-the-executor.md`

- [ ] **Step 1:** Write (shape per `templates/repo/docs/adrs/ADR-template.md`):

  ```markdown
  # ADR-001: Orca is the executor

  Date: 2026-08-16 · Status: accepted · Amends: SPEC Decision 9

  ## Context

  Decision 9 made Orca "preferred, never a dependency": every mapping
  carried a no-Orca fallback (cron, /schedule, Linear MCP, plain API).
  The fleet runs Orca; the fallback recipes were maintained prose nobody
  executed, and dual paths cost attention in every skill read. The
  portability proof (2026-08-16, opencode completed a prepared lane from
  artifacts alone) showed where neutrality actually lives: in the files —
  lanes, gates, loops, PASS blocks.

  ## Decision

  Orca is the executor of the standard. Execution features — scheduling,
  managed parallelism, tracker CLI, card visibility — are Orca's: single
  path, real commands, probed with `orca status --json` (step 0 of every
  executing skill). Artifacts and quality gates remain runner-neutral
  files. Where Orca is absent, the no-Orca contract applies
  (`reference/orca.md`): everything that is a file still happens;
  Orca-only steps are declared NOT done, never faked. Per-capability
  fallback recipes are removed.

  ## Consequences

  - Skills carry a probe and one path, not ladders; features trim without
    Orca, quality never does.
  - The portability claim narrows honestly: any file-reading agent can
    hold a lane; only Orca orchestrates.
  - Five adopted primitives (agent-first spawn, card comments, card
    status, orchestration mail, built-in browser e2e) bind the standard
    deeper into Orca — deliberately.
  - Reverting = restoring the AE/2.3 fallback columns from history.
  ```

- [ ] **Step 2:** Add the ADR to any docs index that lists `docs/adrs/`
  (check `docs/README.md` if present). Commit:
  `docs(adr): ADR-001 orca is the executor`

### Task 9: how-it-works same-change

**Files:**
- Modify: `docs/how-it-works/execution.md` (trigger matrix lines 68-78,
  "The Orca mapping (and life without Orca)" lines 80-96, tracker
  connector lines 99-107), `docs/how-it-works/work-lifecycle.md`
  (work-handoff description — card states + transfer recipe)

- [ ] **Step 1:** execution.md — trigger matrix becomes two columns
  (Trigger / Command): Schedule + On-event rows point at
  `orca automations create … --disabled`; Manual row =
  `orca automations run <name>` or "run one iteration of loops/<name>.md"
  (any agent, any machine). Retitle "The Orca mapping (and life without
  Orca)" → "The Orca mapping (and the no-Orca contract)"; the four
  mapping bullets lose their "— or …" fallback tails and gain a closing
  paragraph stating the contract verbatim from reference/orca.md. The
  tracker section's connector ladder sentence becomes: "the connector is
  `orca linear`; without Orca the calls are emitted for the operator and
  the tracker is declared NOT updated."
- [ ] **Step 2:** work-lifecycle.md — in the handoff paragraph add card
  sync (in-progress → in-review/completed mirroring the lane) and the
  full-transfer recipe reference.
- [ ] **Step 3:** Lint → exit 0. Commit:
  `docs(how-it-works): execution + work-lifecycle reflect orca-first`

### Task 10: Version AE/2.4 + gates + close

**Files:**
- Modify: `CHANGELOG.md`, `AGENTS.md:3`,
  `templates/repo/AGENTS.md.template:3`,
  `skills/agent-init/references/migration.md` (per-version notes)

- [ ] **Step 1:** CHANGELOG new top entry:

  ```markdown
  ## AE/2.4 — 2026-08-16

  Orca-first execution: one probe, one path, one contract (ADR-001).

  - Template change (the bump): `loops/LOOP.md.template` trigger element
    is now Orca automation (created `--disabled`) + manual iteration —
    the cron//schedule/MCP fallback ladders are gone everywhere.
  - The probe (`orca status --json`) is step 0 of every executing skill;
    the no-Orca contract replaces per-capability fallbacks: everything
    that is a file still happens, Orca-only steps are declared NOT done.
  - Five primitives adopted from the version-matched CLI survey:
    agent-first worker spawn, card comments, card status mapped to the
    lane lifecycle, `orca orchestration` for coordinator↔worker mail,
    built-in browser as the named web e2e tool.
  ```

- [ ] **Step 2:** Both stamps → `Standard: AE/2.4`. migration.md note:
  "**AE/2.4** (2026-08-16) — Orca-first execution (ADR-001). Migrating
  2.3 → 2.4: restamp; if the repo has `loops/`, replace trigger fallback
  lines with the manual-iteration fallback. No other file changes."
- [ ] **Step 3:** Run all four gates → all exit 0. Fix anything red.
- [ ] **Step 4:** Acceptance grep (expect zero hits outside tests/,
  templates excluded already, CHANGELOG/migration/docs/plans/docs/specs
  are history): `rg -n "Task Scheduler|/schedule|Linear MCP|plain API"
  reference skills loops docs/how-it-works`.
- [ ] **Step 5:** work-verify the lane (M-tier: fresh-context reviewer
  subagent gets lane path + diff range + DoD; it re-runs the gates
  itself). PASS block into PROGRESS. Commit:
  `chore(release): AE/2.4 — orca-first execution`
- [ ] **Step 6:** work-handoff close: finalize lane state commit, lane
  removal commit, PR `feat/orca-first` → main, rebase-merge,
  `git pull --rebase`, delete branch (`-D` locally).

---

## Lane 2 — AE/2.5 "tier XL" (branch `feat/tier-xl`, from updated main)

### Task 11: Open the lane

- [ ] **Step 1:** `work/tier-xl/` (PLAN = Tasks 12-17, PROGRESS,
  DECISIONS), as Task 1. Commit: `chore(lane): open work/tier-xl`

### Task 12: Evals first — pin XL

**Files:**
- Create: `skills/work-verify/evals/eval-05.md`
- Modify: `skills/fan-out/evals/eval-01.md` (the qualify eval — add the
  tier binding)

- [ ] **Step 1:** Create `skills/work-verify/evals/eval-05.md`:

  ```markdown
  # Eval 05: XL verification — the synthesis gate

  ## Query

  "All four worker lanes are green, mark the XL effort done."

  ## Fixture

  A parent lane with a worker table (4 lanes), each worker lane holding
  its own `## Verification` PASS block; the merged tree exists but the
  full suite was never run on it.

  ## Expected behavior

  - [ ] Confirms the tier is XL (parallel decomposition happened) and
        assembles the XL DoD: per-lane L DoD + the synthesis gate on the
        merged whole.
  - [ ] Refuses "done" on per-lane evidence alone: parts passing is not
        the whole passing — interface mismatches live between lanes.
  - [ ] Runs (or requires) the merged tree's full verification + every
        feature row's command from the merged tree; only then may rows
        move to `passing`.
  - [ ] Fresh-context review still applies (XL ⊇ M ceremony).
  - [ ] The PASS block records the synthesis gate command + exit
        explicitly.
  ```

- [ ] **Step 2:** fan-out eval-01: add checkboxes —

  ```markdown
  - [ ] Names the tier: fan-out is MANDATORY at XL (work that cannot fit
        one lane), available for L or a genuine set of independent M
        items, refused below that.
  - [ ] An XL ask without the three questions answered in writing is
        refused as unqualified — XL ceremony cannot be waived.
  ```

- [ ] **Step 3:** `node tests/run-eval-checks.mjs` → exit 0. Commit:
  `test(skills): evals pin the XL tier`

### Task 13: `reference/task-tiers.md` — deepen + XL

**Files:**
- Modify: `reference/task-tiers.md` (rewrite "The rule", ceremony table,
  ratchet; stay ≤120 lines)

- [ ] **Step 1:** "The rule" becomes four entries with recognition cues
  and a micro-example each:
  - **S** — existing flow AND existing verify command, single-file-ish.
    *You are in S when you could describe the change in one sentence and
    prove it with one existing command.* (Fix a null check in a repo
    with tests.)
  - **M** — new flows or crossed modules. *You are in M the moment the
    change needs a file that does not exist yet, or touches two modules
    that never met.* (Add an export endpoint + its client call.)
  - **L** — one lane, but unknown scope or a multi-session horizon.
    *You are in L when you cannot list the affected files up front, or
    the work will outlive this session.* (Introduce an auth system.)
  - **XL** — the work cannot fit one lane: parallel decomposition
    required. *You are in XL when a correct PLAN forces two or more
    independent lanes running at once.* (Migrate 6 repos to a new
    standard version in one push.)
- [ ] **Step 2:** Ceremony table gains the XL row: "everything L, per
  lane, + fan-out mandatory: three questions in writing · frozen anchors
  · worker table in the parent PLAN · reducer contract · synthesis gate
  on the merged whole (`skills/fan-out`, ADR-002)". Ratchet sentence
  extends: "…an M that sprawls becomes L; an L that forces parallel
  decomposition becomes XL."
- [ ] **Step 3:** Add a short "Card mapping (Orca)" note: lane opens →
  `--workspace-status in-progress`; close handoff → `in-review`
  (`completed` when terminal); XL workers are child worktrees of the
  coordinator card.
- [ ] **Step 4:** Lint → exit 0. Commit:
  `feat(reference): task tiers deepened — recognition cues + XL row`

### Task 14: Skills — XL in `work-verify` and `fan-out`

**Files:**
- Modify: `skills/work-verify/SKILL.md` (description line 3, step 2 DoD
  list line 36-42, step 3, step 5), `skills/fan-out/SKILL.md`
  (description line 3, intro, judgment note line 99-100)

- [ ] **Step 1:** work-verify step 2 gains: "**XL** — the per-lane L DoD
  for every worker lane, plus the synthesis gate: the merged tree's full
  verification + every feature row's command from the merged tree."
  Step 3 gains one line: at XL, per-lane green never substitutes for the
  synthesis gate. Step 5: the XL PASS block names the synthesis command +
  exit. Description line mentions XL.
- [ ] **Step 2:** fan-out: intro sentence + judgment note now read
  "MANDATORY at XL — work that cannot fit one lane (`reference/
  task-tiers.md`); available for L or a genuine set of independent M
  items". Description line updated to match.
- [ ] **Step 3:** Lint + eval-checks → exit 0. Commit:
  `feat(skills): work-verify XL DoD, fan-out mandatory at XL`

### Task 15: Consumer tier docs

**Files:**
- Create: `templates/repo/docs/tiers.md`
- Modify: `templates/repo/AGENTS.md.template:8`,
  `templates/repo/docs/README.md.template` (index row),
  `skills/agent-init/SKILL.md` (only if it enumerates the docs seed
  files — read it; if it copies `templates/repo/docs/` wholesale, no
  edit needed, record that in DECISIONS)

- [ ] **Step 1:** Create `templates/repo/docs/tiers.md`:

  ```markdown
  # Task tiers

  The tier decides ceremony, not effort: an S can be hard, an L can be
  easy — what scales is the paperwork that keeps the work honest. When
  in doubt, take the higher tier. Tier changes are one-way, upward,
  mid-task (S→M→L→XL); nothing downgrades mid-task.

  | Tier | You are here when… | Ceremony | Verified by |
  |---|---|---|---|
  | S | one sentence describes the change AND an existing command proves it | none — do it | run the verify command, quote the exit |
  | M | a new flow appears, or two modules meet for the first time | lane `work/<slug>/` with PLAN + PROGRESS (+ DECISIONS); WIP=1 | acceptance commands in PLAN + fresh-context review |
  | L | you cannot list the affected files up front, or the work outlives a session | four lane files + `feature_list.json`; init phase | every feature row's command; `passing` is irreversible |
  | XL | a correct PLAN forces ≥2 independent lanes in parallel | everything L per lane + mandatory fan-out: three questions in writing, frozen anchors, worker table, reducer contract | per-lane L DoD + the synthesis gate on the merged whole |

  Rules that hold at every tier:

  - **WIP=1 per agent.** Parallelism comes from isolated lanes run by
    isolated agents, never from one agent juggling.
  - **Done is a command that exited 0** with evidence recorded — never a
    self-assessment. The `work-verify` skill owns the proof; the
    `work-handoff` skill owns the exit.
  - **Lanes close.** `work/<slug>/` is per-effort, never furniture: the
    close commits final state, then removes the folder.
  - On an Orca machine the card mirrors the lane: opens → in-progress,
    handoff → in-review, terminal → completed.
  ```

- [ ] **Step 2:** AGENTS.md.template line 8 becomes:
  `Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).`
- [ ] **Step 3:** docs/README.md.template table gains:
  `| [tiers.md](tiers.md) | Task tiers: recognition, ceremony, ratchet |`
- [ ] **Step 4:** Read `skills/agent-init/SKILL.md`; if the docs seed is
  enumerated file-by-file, add tiers.md to the list (evals first if any
  eval pins the file list). Lint → exit 0. Commit:
  `feat(templates): consumer tier guide docs/tiers.md`

### Task 16: ADR-002 + how-it-works

**Files:**
- Create: `docs/adrs/ADR-002-tier-xl.md`
- Modify: `docs/how-it-works/work-lifecycle.md` (triage section lines
  13-35 + ceremony table line 35), `docs/how-it-works/execution.md`
  (graphs section line 120-127), `docs/how-it-works/architecture.md`
  (tiers mention in reference/ section, line 41-42)

- [ ] **Step 1:** ADR-002:

  ```markdown
  # ADR-002: Tier XL — work that cannot fit one lane

  Date: 2026-08-16 · Status: accepted · Amends: SPEC Decision 7

  ## Context

  S/M/L scale ceremony within one lane. P4 shipped the graph machinery
  (fan-out qualification, anchors, reducer, synthesis gate), but nothing
  makes it mandatory when work genuinely exceeds one lane — discretion
  exactly where discretion fails: large parallel efforts.

  ## Decision

  Add tier XL, structural not size-based: XL begins where a correct PLAN
  forces two or more independent lanes in parallel. Ceremony: everything
  L requires per worker lane, plus mandatory fan-out — the three
  pre-fan-out questions in writing, frozen anchors, the worker table in
  the parent PLAN, the reducer contract, and the synthesis gate on the
  merged whole. The ratchet extends upward: L→XL mid-task, never down.
  On Orca, workers spawn agent-first as child worktrees and coordinate
  via orchestration; without Orca the same lanes run sequentially under
  the same ceremony (no-Orca contract, ADR-001).

  ## Consequences

  - Tier one-liner, task-tiers reference, and the consumer tier guide
    change (AE/2.5 template bump).
  - work-verify owns the XL DoD (per-lane L + synthesis gate); fan-out
    is mandatory at XL, available at L.
  - First production XL run pending a real task; evals pin the ceremony
    meanwhile.
  ```

- [ ] **Step 2:** work-lifecycle.md: triage mermaid gains the XL branch
  (`Q2 -->|needs parallel lanes| XL[Tier XL<br/>L per lane + mandatory
  fan-out]` adjusted to the existing diagram shape); ceremony/example
  table gains the XL row; one paragraph after the table states the XL
  rule + pointer to execution.md's graph section. execution.md graphs
  intro sentence gains "mandatory at XL (`ADR-002`)".
  architecture.md reference/ enumeration: "task tiers" unchanged (the
  layer list carries no tier names) — verify and record.
- [ ] **Step 3:** Lint → exit 0. Commit:
  `docs: ADR-002 + how-it-works carry tier XL`

### Task 17: Version AE/2.5 + gates + close

**Files:**
- Modify: `CHANGELOG.md`, `AGENTS.md:3`,
  `templates/repo/AGENTS.md.template:3`, migration.md

- [ ] **Step 1:** CHANGELOG entry:

  ```markdown
  ## AE/2.5 — 2026-08-16

  Tier XL: the ceremony tier for work that cannot fit one lane (ADR-002).

  - Template change (the bump): consumer repos gain `docs/tiers.md`
    (recognition cues, ceremony, ratchet, card mapping) and the
    AGENTS.md tier one-liner adds XL with a pointer to it.
  - XL = everything L per worker lane + mandatory fan-out (three
    questions in writing, anchors, worker table, reducer, synthesis
    gate). Ratchet extends L→XL.
  - work-verify owns the XL DoD; fan-out is mandatory at XL.
  ```

- [ ] **Step 2:** Stamps → AE/2.5; migration note: "**AE/2.5**
  (2026-08-16) — tier XL (ADR-002). Migrating 2.4 → 2.5: restamp, update
  the tier one-liner, install `docs/tiers.md` from the template. Open
  lanes unaffected."
- [ ] **Step 3:** All four gates → exit 0. Acceptance: agent-init dry
  run against a scratch fixture lands `docs/tiers.md`; grep confirms no
  surviving three-tier one-liners
  (`rg -n "S direct\+verify · M lane\+plan · L four files\+feature list —"
  --glob '!tests/**' --glob '!docs/plans/**'` → 0 hits).
- [ ] **Step 4:** work-verify the lane (fresh-context reviewer), PASS
  block. Commit: `chore(release): AE/2.5 — tier XL`
- [ ] **Step 5:** work-handoff close: finalize, remove lane, PR
  `feat/tier-xl` → main, rebase-merge, `git pull --rebase`, delete
  branch.
