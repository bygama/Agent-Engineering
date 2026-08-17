---
issue: MAT-29
---
# relay — spec

<!-- Owner-written. The agent never edits this file. -->

Done looks like: the standard owns lane execution. A new skill
`skills/relay/` runs one lane's PLAN step-by-step with fresh subagents,
anchored entirely in the lane's four files; superpowers stays as the
thinking suite with the supersession written into `reference/skills.md`;
the README documents every skill and how they chain; the change ships
through the release ritual as a MINOR bump.

## 1. The dispatch protocol (the skill)

The MAT-29 insight applied throughout: no extracted briefs, no scratch
workspace — **the lane IS the subagent's context package**.

- **Dispatch.** A fresh implementer subagent receives: the lane path, the
  step number, the step's DoD (its PLAN.md line with the executable
  acceptance command), and the report contract. The subagent reads SPEC
  (authority), the PLAN step, DECISIONS (prior rulings), and PROGRESS
  (state) itself. No session history is ever pasted into a dispatch.
- **Report contract** (ported from superpowers SDD): `DONE /
  DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED`. The implementer runs the
  step's acceptance command, appends its report to PROGRESS.md (the lane
  is the ledger — survives compaction, travels with the worktree), and
  returns to the controller only status + commits + one line.
- **Per-step review.** A fresh reviewer gets the step's diff as a file
  (review package generated from git into session scratch — regenerable,
  never committed), the PLAN step, and the SPEC. Verdicts: spec
  compliance AND quality; both required.
- **Fix loop, cap of 5** (ported): rounds 1-3 resume the same
  implementer; rounds 4-5 dispatch a fresh implementer on a more capable
  model. At the cap the controller adjudicates each open finding and
  records the ruling in DECISIONS.md.
- **Rulings, not stalls** (ported): the controller resolves ambiguities
  against the SPEC and records them in DECISIONS.md. Only four things
  stop the run: irreversible/destructive ops, security-sensitive
  actions, side effects outside the worktree, a plan broken beyond
  ruling.
- **Model selection by role** (ported): mechanical step → cheapest tier;
  integration → mid tier; final adjudication and review → capable tier.
  Small same-shape steps batch into one dispatch.
- **The controller never implements.** Its context is coordination only;
  controller fixes skip review and are forbidden.

## 2. Integration with work-verify, tiers, and fan-out

- **work-verify stays the lane gate, untouched.** Per-step review is
  internal to relay (task-scoped). relay ships NO final whole-branch
  review of its own: superpowers' final review maps 1:1 to work-verify's
  fresh-context review at M+. When the last step lands, relay hands the
  lane to work-verify like any other work. At L, feature_list rows move
  to `passing` only on work-verify evidence, as always.
- **Tiers.** S: unchanged (no lane, no relay). M: available when the
  lane has several steps. L: recommended default — a normative amendment,
  recorded as an ADR (same pattern as ADR-002/XL). XL: fan-out keeps
  coordinating lanes; each worker may run relay inside its own lane,
  becoming the controller of its steps.
- **WIP=1 holds at every level.** One lane per controller; one
  implementer at a time — parallelism between lanes belongs to fan-out,
  never inside a lane. Maker ≠ checker survives: a step's implementer is
  never its reviewer.
- **Runtime neutrality.** The pair is symmetric — fan-out = parallel
  across lanes (worktrees, Orca spawns); relay = sequential within a
  lane (in-session subagents, same worktree). A runner without subagents
  executes the lane inline as today; the skill states this fallback
  explicitly (same pattern as fan-out's no-Orca path).
- **Closing.** relay ends by invoking work-verify → work-handoff, which
  owns lifecycle endings. Orca card mapping unchanged.

## 3. Supersession of superpowers, in writing

- `reference/skills.md` ("Composing with process-skill suites") gains
  the supersession paragraph: suites supply the thinking phases
  (brainstorming, TDD, systematic-debugging, writing-plans); execution
  and endings are the standard's. Their `subagent-driven-development`,
  `executing-plans`, and `finishing-a-development-branch` are not used:
  the plan lands in `work/<slug>/PLAN.md` (existing rule) and from there
  relay executes → work-verify → work-handoff. Superpowers stays
  installed; nothing on their side is modified.
- **Own name to avoid trigger collision:** `relay` — fresh runner per
  leg, the lane as the baton; stylistic pair with `fan-out`. The skill's
  description explicitly claims lane execution ("executes a lane's PLAN
  step-by-step") so discovery selects it whenever a lane exists.
- The same change updates the affected `docs/how-it-works/` chapter
  (hard constraint) and the skills line in AGENTS.md.

## 4. Implementation plan and DoD

Order of work (house discipline):

1. **Evals first** — `skills/relay/evals/` with ≥4: correct dispatch
   (lane as package, no pasted history), fix loop with cap and
   adjudication to DECISIONS, refusal/fallback (no lane or no subagents
   → inline), closing (last step → work-verify + work-handoff, no own
   final review).
2. `skills/relay/SKILL.md` — the minimum that passes the evals.
3. **ADR-004:** relay as recommended default executor at L.
4. Amendments: `reference/skills.md` (supersession),
   `reference/task-tiers.md` (L row), affected `docs/how-it-works/`
   chapter, AGENTS.md skills line.
5. **README:** new section documenting every skill — what it does, when
   it triggers, how they chain (think → place → relay executes →
   work-verify → work-handoff; fan-out for parallel).
6. Gates green: self-lint, `run-eval-checks`, lint/gen self-test suites.

Release: sized by the `/release` ritual — new skill + normative ADR +
reference amendments = MINOR bump, Keep-a-Changelog entry, restamp,
post-merge tag. Branch + PR (main is PR-only, rebase-only).

Dogfood: first real use is the bygama/skills migration lanes (MAT-30).
