---
issue: MAT-116, MAT-117
---
# Reviewer seats + review granularity — spec

<!-- Shaped from the parent orchestrator's dispatch brief (2026-08-21),
     design-first. Evidence: MAT-116 and MAT-117 tickets (owner rulings
     and probe results), plus this lane's own re-probe of the opencode
     CLI on this machine (below). Two tickets, ONE coherent capability,
     one lane, one PR, Tier L. -->

## Why

Review is the standard's most expensive rung and its least tuned one.
MAT-111's field evidence, same machine, same week: eleven in-lane Claude
review invocations on a mostly-documentation lane, almost all returning
"Approved, no findings" — pure toll — while MAT-110's step-5 review
caught a real bug (a guard test that passed with the sweep inverted AND
removed). Review value tracks **rework cost**, not step count.

Two knobs answer that, and they compose:

- **WHO reviews** (MAT-116) — the reviewer seat is configurable at both
  layers, and the cheap cross-family seats that exist on this machine
  today are free.
- **HOW OFTEN** (MAT-117) — review granularity follows rework cost:
  per-step where redoing is expensive, grouped where it is cheap.

Together a documentation lane pays ~3 cheap passes instead of 11 Claude
invocations, and a code lane loses zero gates.

## Machine evidence this lane re-verified

Re-run in this worktree on 2026-08-21 (opencode CLI **1.18.18**,
`node_modules/opencode-windows-x64/bin/opencode.exe`), because
`reference/runners.md` makes verify-on-install a hard rule:

- `opencode run --auto -m opencode/x-preview-f-free "…"` → returned the
  requested output exactly. **PASS.**
- `opencode run --auto -m opencode/muse-spark-1.2-contributor-free "…"`
  → returned the requested output exactly. **PASS.**
- `opencode run --help` lists `--auto` — so the run form *does* take the
  flag, which is what makes the owner's extended `--auto` law
  implementable and what falsifies the file's current claim that it does
  not.
- `opencode models` lists `opencode/x-preview-f-free`,
  `opencode/big-pickle`, `opencode/muse-spark-1.2-contributor-free`,
  `opencode-go/muse-spark-1.2-contributor`, `opencode-go/deepseek-v4-flash`
  — and **no** `opencode/deepseek-v4-flash-free`. The registered no-auth
  fallback is dead.

## What done looks like

### 1. `reference/runners.md` registers the new seats and the law

The file gains, in the fewest words that stay true:

1. **Sigilosos** — the house name (owner, 2026-08-21) for stealth free
   Zen models. Current verified instance: **Ox Alpha**,
   `opencode/x-preview-f-free` (the Zen docs table maps the id to "Ox
   Alpha Free"; announced 2026-08-20 — 1M context, multimodal, generous
   limits, zero-retention). `opencode/big-pickle` is another sigiloso
   in the live list; it is named as one but carries **no** verified
   spawn command, so verify-on-install binds before it is used.
2. **The free ratón** — `opencode/muse-spark-1.2-contributor-free`, the
   no-auth variant of the ratón chispeante, verified in run mode here
   2026-08-21. This *replaces* the file's current claim that "no no-auth
   Muse Spark route has run here", which the probe falsifies.
3. **The command-mode recipe** — `opencode run --auto -m <provider/model>
   "<prompt>"`, one-shot and non-interactive, exits at completion;
   proven on this machine at CLI 1.18.18 for both free seats.
4. **The `--auto` law, extended to run-mode** (owner rule, 2026-08-21):
   EVERY opencode seat launches with `--auto` — TUI and `run` alike.
   The file's current sentence ("the headless `run` form above takes no
   `--auto`") is factually wrong at 1.18.18 and is replaced, not
   softened. Rationale for the run form: without it a tool-using review
   stalls on a permission prompt nobody is watching, and a stalled `run`
   returns nothing — the reviewer then falls through the degradation
   chain for the wrong reason.
5. **The economics rule** (owner, 2026-08-21): while the free windows
   last, EVERY seat defaults to its **free** variant. The adversarial
   ratón runs as `opencode/muse-spark-1.2-contributor-free`, **not** the
   paid Go id; the Go plan is the fallback, never the default. The
   ratón and ballena paragraphs are restated at their free ids
   accordingly.
6. **The graceful-degradation chain, as law:** sigiloso →
   `opencode/muse-spark-1.2-contributor-free` → paid Go seat
   (`opencode-go/muse-spark-1.2-contributor`) → in-session Claude
   subagent. Sigilosos are free "for a limited time" and can vanish or
   start charging without notice, so the seat verifies its model
   responds before relying on it, and **a dead model falls through the
   chain, never silently blocks a lane.** This is a law in the file's
   own voice, not a footnote or a parenthetical.
7. **The stale no-auth fallback is fixed.**
   `opencode/deepseek-v4-flash-free` no longer exists in the live model
   list; both live citations (the per-runner table row and the ballena
   paragraph) repoint at `muse-spark-1.2-contributor-free`.

Dated records that name the dead id stay as written —
`docs/adrs/ADR-008-orchestration.md:93`,
`docs/how-it-works/execution.md:497` (the 2026-08-16 portability proof
did run on it), `docs/plans/*`.

### 2. `skills/work-run` gains the reviewer-mode knob

A **reviewer mode**, `subagent` | `command`:

- `subagent` — today's behavior: a fresh in-session subagent per review.
- `command` — the controller shells out with `opencode run --auto -m
  <model> "<the filled step-reviewer template>"` from inside its own
  session and reads the verdict off stdout.

Three things the skill must state where the knob is documented:

- **Command-mode is a shell command, not an orchestration worker.** No
  Task, no Dispatch, no `worker_done` authority — the no-grandchildren
  fence is untouched. Stated explicitly, because the fence is exactly
  what a controller reading this will worry about.
- **Default when available: the sigiloso, in command mode** (owner
  ruling), for per-step reviews. The reviewer step **verifies its model
  responds before relying on it**, and a dead model walks
  `reference/runners.md`'s chain rather than blocking the step.
- **maker ≠ checker is unchanged** and command mode strengthens it: the
  seat is cross-family by construction.

`references/step-reviewer.md` gains the command-mode fill note — the
same three inputs, delivered as a `run` prompt instead of a subagent
prompt — so the template stays the single source of the review prompt in
both modes.

### 3. `skills/orchestrate`'s dispatch dialogue asks BOTH seats

One question **block** (still one turn, not two rounds), covering:

1. **Per-step reviewer mode + model** — default: command-mode sigiloso
   (`opencode/x-preview-f-free`); alternative: in-session Claude
   subagent.
2. **Adversarial seat** — default unchanged: **1 ratón chispeante**, now
   at its free id per the economics rule; the ballena stays the named
   alternative.

Both answers are recorded in the Task spec, as the single reviewer
answer is today.

**Guardrail — at least one cross-family gate per lane.** The child seat
is Claude by convention, so both zero-cross-family combinations are
caught by the same positive rule: **Claude+Claude** (the instance the
owner named) and **Claude per-step reviewer with no adversarial seat**.
The dialogue **rejects** either as a silent or default outcome and
re-asks.

The owner keeps one escape, and it is not a default (parent's ruling at
this lane's SPEC gate, 2026-08-21): a zero-cross-family lane is
reachable **only** by an explicit owner override, stated in the dispatch
dialogue and recorded **verbatim** in the Task spec. Impossible to reach
by accident; never offered by the dialogue; never assumed by the parent.

Citation: ADR-008's maker ≠ checker cross-family principle, which is
**unchanged** — this guardrail enforces it, it does not revise it.

`docs/adrs/ADR-008-orchestration.md` gains an italic amendment note in
its own established style, dated **2026-08-21**, naming this guardrail
and the two-seat dialogue on the existing "Dispatch-time reviewer
question" bullet. The bullet itself stays as written.

### 4. `skills/work-plan` annotates every step with a review class

Beside the existing role hints, **every** PLAN step carries one of:

- **`per-step`** — code, checks, templates, skill content, anything
  expensive to redo or irreversible. **Mandatory; never overridable
  downward** — not by the owner, not by the plan's author, not to save
  a pass.
- **`grouped`** — cheap-to-redo doc or mechanical steps. One reviewer
  pass per **contiguous** group, at a natural boundary.
- **`covered-by-batch`** — a `[batch]` entry already gets one review for
  the whole sweep.

Unlike role hints (optional per plan), the review class is **required on
every step**: work-run reads it to decide how many seats the lane buys,
and a silent gap is a silent downgrade.

**The `[batch]` rule is enforced harder in the same step:** same-shape
edits are ONE step, not N. Field evidence named in the skill: MAT-111
ran 9 steps where ~5 were right.

### 5. `skills/work-run` executes the classes

- `per-step` → a dedicated fresh reviewer for that step (today's loop).
- `grouped` → **one** reviewer pass per contiguous group, dispatched at
  the group's natural boundary, with the group's combined diff and all
  of that group's PLAN lines.
- `covered-by-batch` → the batch entry's single review covers the sweep.
- **A PLAN with no review classes** (every lane planned before this
  change) → every step is treated as `per-step`. The safe default, never
  a silent downgrade.

Explicitly **unchanged**: the fix loop, its cap of 5, work-verify's lane
gate, and the adversarial seat. That late coverage is precisely what
makes `grouped` safe — a missed doc nit costs minutes and the gate still
catches it.

### 6. Evals change first, on every touched skill

The house rule is not "evals exist" but "evals change **before**
content, on every revision". Three skills are touched, so three eval
sets move first, encoding the owner-confirmed scenarios from the
tickets:

- **`skills/work-run/evals/`** — the reviewer-mode knob (command mode is
  a shell command, not a worker; sigiloso default; liveness check;
  degradation chain) and review-class execution (`grouped` buys one pass
  per contiguous group; `per-step` is never downgraded; a classless PLAN
  falls back to `per-step`).
- **`skills/work-plan/evals/`** — every step carries a class; `per-step`
  is not overridable downward; the harder `[batch]` rule with the
  MAT-111 evidence.
- **`skills/orchestrate/evals/`** — the two-seat dialogue in one
  question block, and the cross-family guardrail rejecting Claude+Claude.
  `eval-03.md`'s dead `deepseek-v4-flash-free` fallback id is corrected
  in the same sweep.

### 7. `docs/how-it-works/` updates where claims go false

The house hard constraint: structure or behavior changes, the chapter
changes with it, in the same change.

- **`execution.md`** — stage 3 of the 8-stage cycle currently reads
  "dispatch dialogue - reviewers? how many? which model?"; it now asks
  two seats, so the sequence diagram line and the surrounding narration
  update. The no-auth-fallback narration around the two-step launch
  updates with the id.
- **`work-lifecycle.md`** — "Each step gets a fresh-context review
  (maker ≠ checker)" goes false under `grouped`, and work-plan's
  narration gains the review class beside interfaces and role hints.
- **`architecture.md`, `standard-lifecycle.md`, `integrations.md`,
  `README.md`** — judged explicitly; the verdict lands in `DECISIONS.md`
  whether or not the file changes.

## Out of scope

- **No version bump, no CHANGELOG entry, no restamp.** No template and
  no check changes. `AGENTS.md` keeps `Standard: AE/1.4.2`.
- **Never touched:** `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `scripts/agent-lint.mjs`, `tests/**`, `examples/`, `.claude/skills/`,
  `templates/`. If the lane concludes a check or template MUST change,
  it asks the parent first and never just does it.
- **`skills/work-verify` is not edited.** Its adversarial rung already
  reads its seat off `reference/runners.md` and names no model id, so
  the economics rule reaches it without a diff. The brief's "adversarial
  seat unchanged" stays literally true.
- No new skill, no new reference file: both tickets are revisions of
  skills that already exist.

## Verification

All four gates exit 0:

```
node scripts/agent-lint.mjs . --ignore tests,templates,examples
node tests/run-lint-tests.mjs
node tests/run-gen-tests.mjs
node tests/run-eval-checks.mjs
```

Plus, as lane-specific evidence:

- No live (non-record) surface names `opencode/deepseek-v4-flash-free`
  **as a spawn target** — i.e. no `-m opencode/deepseek-v4-flash-free`
  survives outside a dated record. Naming the id to state that it is
  retired is the opposite of the bug and is required, not forbidden.
- Every skill this lane touches has its evals modified in a commit that
  precedes the commit modifying its content.
- `docs/how-it-works/` carries no claim this lane falsified, and every
  no-change judgment is recorded in `DECISIONS.md`.
