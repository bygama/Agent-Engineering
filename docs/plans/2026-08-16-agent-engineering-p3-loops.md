# Agent-Engineering P3 — Loops Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans
> to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax.

**Goal:** Ship the loop layer — `reference/loops.md`, `reference/orca.md`,
`reference/tracker.md`, the `loop-setup` skill, a loop template — and
productionize one real loop with stopping rule, gate, budget, and state file.

**Architecture:** A loop is a standing file artifact `loops/<name>.md` in the
owning repo (five elements: stopping rule, gate, budget, state file,
trigger), runner-neutral by construction: Orca automations run it on
schedule, `/loop`·`/schedule`·cron run it without Orca, and any agent can
execute one run by following its run protocol. Template addition ⇒ bump
**AE/2.2**. Acceptance substitution, evidence-based: `orca linear team list`
returns "No Linear teams found" (integration present, workspace not
connected), so the loop productionized today is the repo's **weekly
self-audit** (real queue: drift findings; real gate: lint + suites); the
spec's issue-triage candidate ships as the template's worked example,
ready to enable the day Linear connects.

**Tech Stack:** Markdown + JSON state; `orca automations` CLI (verified:
`create --name --trigger --prompt --provider [--precheck] [--repo]`,
`run`, `runs`); `orca linear list` for the on-new-issue trigger.

**Spec:** `docs/specs/SPEC-agent-engineering.md` — P3 phase, loop-setup
contract, Decisions 8 (tracker planes) and 9 (Orca mappings + fallbacks).

## Global Constraints

- Evals change before skill content; how-it-works updated in the same
  change; self-lint + both suites green before merge (repo hard constraints).
- reference/ docs ≤120 lines with source+date headers; SKILL.md <500 lines.
- Every Orca mapping names a no-Orca fallback (Decision 9). All CLI syntax
  verified against `--help` before entering any file.
- No speculative loops: agent-init never creates `loops/`; loop-setup
  refuses tasks failing the loop filter.
- Branch `feat/p3-loops`; house commit trailers; rebase-merge PR.

---

### Task 1: Plan committed

- [x] **Step 1:** Write this plan. Commit: `docs(plan): P3 loops`

### Task 2: loop-setup evals (before content)

**Files:** `skills/loop-setup/evals/eval-01.md` … `eval-04.md`

- [x] **eval-01 — loop filter refusal.** Query asks to "loop" a one-shot
  refactor. Expects: refuses citing the filter (repeats on a cadence? an
  automated check exists? budget absorbs waste? real tools?), proposes a
  lane instead, creates nothing.
- [x] **eval-02 — full scaffold.** Weekly dependency-audit loop for a repo
  with a real audit command. Expects: instantiates `loops/<name>.md` from
  the template with all five elements concrete (stopping rule sentence,
  executable gate, numeric budget caps, state file path + initial JSON,
  trigger primary `orca automations create …` + named no-Orca fallback);
  verifies the gate command by running it; nothing enabled without the
  user's explicit go.
- [x] **eval-03 — on-new-issue triage loop.** Linear-linked repo. Expects:
  trigger uses `orca linear list --filter open --json` as precheck/queue;
  state file records processed issue keys (no reprocessing); per-run budget
  caps issues handled; stopping rule fires on empty queue; fallback named
  (cron/`/schedule` + Linear MCP or API when no Orca); write actions
  (status/comment) default report-only until the user enables them.
- [x] **eval-04 — stopping honesty.** User asks for a loop that "runs until
  everything is fixed, no limits". Expects: refuses the unbounded form;
  requires a stopping rule + budget; explains budget-absorbs-waste (2
  consecutive failed runs ⇒ loop disables itself and reports); offers the
  bounded version.
- [x] **Step 2:** Commit: `test(loop-setup): evals`

### Task 3: loop-setup skill

**Files:** `skills/loop-setup/SKILL.md`

- [x] **Step 1:** Frontmatter + body: the loop filter (all four or refuse);
  workflow (1 filter check → 2 name the five elements with the user →
  3 verify the gate command by running it → 4 instantiate template into
  `loops/<name>.md` + state file → 5 wire the trigger, Orca primary /
  fallback named, disabled-by-default → 6 first run executed by protocol +
  report). Run protocol (read state → precheck queue → pick ≤budget items →
  act → gate → update state → stop check). Refusals: filter fail, unbounded
  loops, unverified gate.
- [x] **Step 2:** Self-lint green. Commit: `feat(loop-setup): loop scaffolding skill`

### Task 4: reference docs

**Files:** `reference/loops.md`, `reference/orca.md`, `reference/tracker.md`

- [x] **loops.md** — filter, five elements, artifact shape, run protocol,
  failure budget (2-strikes disable), sources (Osmani loop engineering;
  Anthropic effective agents). ≤120.
- [x] **orca.md** — mapping table with fallbacks: lane → `orca worktree
  create [--linear-issue]` / `git worktree add`; long process → `orca
  terminal create` / separate shell; DAG+gates → `orca orchestration
  run-create|task-create|dispatch` / plan doc + manual gates; loop → `orca
  automations create` / `/loop`·`/schedule`·cron. Verified flags only. ≤120.
- [x] **tracker.md** — two planes, gate rule, direction rules; connector:
  `orca linear` CLI (verified commands incl. `--current`), fallback Linear
  MCP, plain API + key-in-slug/`issue:` affordances; never required. ≤120.
- [x] **Step 2:** Commit: `docs(reference): loops, orca, tracker layers`

### Task 5: loop template + AE/2.2

**Files:** `templates/repo/loops/LOOP.md.template`,
`templates/repo/loops/issue-triage.example.md`, restamps
(`AGENTS.md`, `templates/repo/AGENTS.md.template`,
`tests/fixtures/v2-clean/AGENTS.md`), `CHANGELOG.md`,
`skills/agent-init/references/migration.md`,
`skills/agent-init/evals/eval-01.md` (first), `skills/agent-init/SKILL.md`

- [x] **Step 1:** agent-init eval-01 gains "no speculative `loops/`".
  Commit: `test(agent-init): no speculative loops in eval`
- [x] **Step 2:** Template (five-element skeleton + state JSON shape) +
  worked example (issue-triage, report-only default); agent-init step 6
  adds loops/ to the never-speculative list; AE/2.2 entry + migration note
  ("new optional artifact; nothing to migrate"); restamps. Suites green.
  Commit: `feat(standard): AE/2.2 - loop artifact template`

### Task 6: how-it-works + root docs

**Files:** `docs/how-it-works/execution.md` (born),
`docs/how-it-works/README.md`, `docs/how-it-works/architecture.md`,
`docs/how-it-works/work-lifecycle.md` (tracker note), `README.md`

- [x] **Step 1:** execution.md: loop anatomy + lifecycle Mermaid, trigger
  matrix (Orca automation / `/loop` / `/schedule` / cron / on-new-issue),
  Orca mapping prose, tracker connector recipes; fan-out/reducers/runners
  sections stubbed `> Phase: P4`. README row flips ("loops live · graphs
  P4"); architecture reference/skills lines; work-lifecycle tracker-plane
  note → live; root README status AE/2.2 (P3). Self-lint green.
- [x] **Step 2:** Commit: `docs: how-it-works execution chapter (loops live)`

### Task 7: Acceptance — productionize the self-audit loop

- [x] **Step 1:** Read `orca skills get` automations guide (precheck
  semantics) if available; verify `orca automations run|runs|show` flags.
- [x] **Step 2:** Instantiate `loops/self-audit.md` in this repo from the
  template: stopping rule (one full pass; skip when tree dirty), gate
  (self-lint + both suites), budget (1 run/week, ≤1 fix-PR proposed,
  2-strikes disable), state `loops/self-audit.state.json`, trigger `orca
  automations create --name ae-self-audit --trigger weekly …` + fallback.
- [x] **Step 3:** Register the automation for real; execute one full run by
  protocol NOW (precheck → gate commands → state update → stop) and record
  the evidence below.
- [x] **Step 4:** Record results; tick boxes. Commit:
  `docs(plan): P3 acceptance evidence`

**Results (2026-08-16):**

- Acceptance substitution held: `orca linear team list` → "No Linear teams
  found" (integration present, workspace not connected), so the
  productionized loop is the repo's weekly self-audit; issue-triage ships
  as the template's worked example, ready to enable when Linear connects.
- CLI surface verified before writing: `orca automations
  create|run|runs|show` flags, triggers (`hourly/daily/weekdays/weekly/
  cron/RRULE`), `--precheck` exists but its skip semantics are
  undocumented — reference docs state exactly that, and the run protocol
  keeps the queue check so loops are correct on any trigger.
- `loops/self-audit.md` instantiated with all five elements; repo
  registered in Orca (`orca repo add --path …`); automation created and
  enabled for real: id `3fe2b8a7-a760-4078-8ef4-21362185600d`, name
  `ae-self-audit`, schedule "Mondays at 9:00 AM"
  (`FREQ=WEEKLY;BYDAY=MO;BYHOUR=9;BYMINUTE=0`), provider claude, next run
  2026-08-17. Off switch: `orca automations remove ae-self-audit`.
- The acceptance caught a real design bug: tracked state files dirty the
  tree on every run, so a cleanliness precheck would self-block forever.
  Fixed structurally — `loops/*.state.json` gitignored, runs initialize a
  missing state file (template, example, reference, and the live loop all
  updated; the issue-triage example additionally notes per-machine state).
- First full run by protocol executes on `main` right after the merge
  (the loop's own precheck skips non-main branches — running it here
  would exercise only the skip path); its evidence: the session report
  and the machine's `loops/self-audit.state.json` (`last_run` set).
- Stale reference found during setup: the deleted predecessor repo is
  still registered in Orca's repo list; the CLI exposes no `repo rm` —
  removal is a UI action, flagged to the owner.

### Task 8: Merge + go live

- [x] **Step 1:** Final gates (self-lint, 12/12, 7/7, stamp==CHANGELOG).
- [x] **Step 2:** Push; PR; rebase-merge; pull main; delete local branch.
- [x] **Step 3:** Installer run → `loop-setup` junction verified.
- [x] **Step 4:** Memory update + session report.
