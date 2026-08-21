---
name: work-run
description: Executes one lane's PLAN step-by-step with a fresh subagent per step — the lane (SPEC, PLAN, PROGRESS, DECISIONS) is the entire context package, with reviews scaled by each step's review class and bought from either seat (in-session subagent or command-mode runner), a capped fix loop, and rulings recorded in the lane. Use when a work/<slug>/ lane with several PLAN steps should be executed in this session — the recommended default for L lanes, available for M, and inside an XL worker's own lane. Not for S tasks (no lane) and never for parallel work across lanes (that is orchestrate).
---

# work-run

Sequential execution of one lane by stateless runners: a fresh
implementer subagent per PLAN step, with the lane itself as the shared
context between them. The controller coordinates and rules; it never
implements.

The pairing: **work-run** = sequential within a lane (in-session
subagents, same worktree); **orchestrate** = dispatch across lanes
(child worktrees, one worker per lane — M+ single-child through XL
fan-out). Both hand a worker the same package: the lane.

## Workflow

Copy this checklist and tick items off:

```
Work-run progress:
- [ ] 0. Qualify (lane exists, several steps, a reviewer seat available)
- [ ] 1. Read the lane; resume from PROGRESS; settle the reviewer mode
- [ ] 2. Per step: dispatch → report → review (per its class) → fix loop
      → record → release
- [ ] 3. Last step lands → work-verify (the lane gate)
- [ ] 4. work-handoff + surface every ruling
```

**0. Qualify.** Three refusals, one fallback:

- *No lane* (S-tier ask): refuse — work-run executes lanes. Run the S
  inline with its one-line DoD, or open an M lane if it grew. Never
  create a lane just to justify a dispatch.
- *Parallel implementers inside the lane*: refuse — WIP=1 within a
  lane; parallelism between lanes is orchestrate's job. If two steps
  are truly independent lanes' worth of work, say so and point at
  orchestrate.
- *One step, trivial lane*: work-run adds ceremony without payoff —
  execute inline.
- *No subagent capability on this runner*: work-run is never mandatory
  (the standard is runtime-neutral). Fall back to executing the SAME
  lane inline under the SAME ceremony: PLAN steps in order, acceptance
  per step, PROGRESS updated. Never simulate a dispatch. A missing
  subagent does not cost the lane its reviews: where a command-mode
  runner is registered (`reference/runners.md`), the reviewer seat still
  exists. Only when the runtime has neither — no subagents and no
  registered runner — is a review rung declared NOT done, and then
  explicitly, never quietly.

**1. Read the lane.** PROGRESS first — resume at the first step without
a DONE report; never re-dispatch a completed step. Note SPEC (the
binding authority) and standing rulings in DECISIONS. Settle the
**reviewer mode** here, once, from what the lane already carries (the
dispatch dialogue's answer in the Task spec, or a DECISIONS ruling) —
not per step, and not by inheriting whichever seat the last lane used.

**2. The step loop.** For each PLAN step:

*Dispatch.* A dispatch is exactly four things: the lane path · the step
number · the step's PLAN line with its acceptance command · the report
contract below — compose it from `references/implementer.md`'s fill-in
template, never freehand. The subagent reads SPEC, PLAN, DECISIONS, and
PROGRESS from the lane itself — paste no session history, no prior-step
summaries, no extracted briefs. Batch several small same-shape steps
into ONE dispatch (still one subagent — batching is not parallelism).
One implementer in flight at a time.

*Report contract.* The implementer implements, runs the step's
acceptance command, appends its report to PROGRESS.md, and returns only
`status + commits + one line`. Four states:

| State | Controller response |
|---|---|
| DONE | package the diff, dispatch the reviewer |
| DONE_WITH_CONCERNS | read the concerns; correctness/scope concerns are findings, observations are PROGRESS notes |
| NEEDS_CONTEXT | supply the missing context, re-dispatch |
| BLOCKED | change something — more context, a more capable model, a smaller step, or a ruling — never an identical retry |

*Review.* A fresh reviewer (never the implementer — maker ≠ checker)
gets the step's diff as a file (generated from git into session
scratch, never committed), the PLAN step, and the SPEC, composed from
`references/step-reviewer.md`. Both verdicts required: spec compliance
AND quality. Two knobs decide the seat — **how often** and **who** —
and neither is the controller's mood.

*How often: the review class.* Read it off the step's trailing
parenthetical — beside the role hint where the plan uses hints,
`*(judgment · per-step)*`, and alone where it does not, `*(per-step)*`.
`work-plan` writes one on every step.

| Class | What the step buys |
|---|---|
| `per-step` | its own dedicated fresh reviewer, before the next step is dispatched |
| `grouped` | ONE pass at the end of its contiguous group — the group's combined diff plus every PLAN line in it |
| `covered-by-batch` | its own single review, covering the whole sweep — one for the `[batch]` entry, never one per file it touched |

`per-step` is **mandatory and never overridable downward** — not to save
a pass, not because the diff looks small, not because the last three
reviews came back clean. Upgrading is always free: a `grouped` step whose
diff turns out risky takes its own review, with the reason recorded. A
group is the contiguous run of same-class steps the PLAN drew, not a
window the controller resizes. **A PLAN with no classes at all** — every
lane planned before they existed — executes as if every step were
`per-step`; a missing class is never permission to group.

*Who: the reviewer mode.* `subagent` or `command`, settled once at step 1:

- `subagent` — a fresh in-session subagent, the seat this rung has
  always used.
- `command` — the controller shells out to a registered runner,
  `opencode run --auto -m <provider/model> "<prompt>"`
  (`reference/runners.md`), and reads the verdict off stdout. **That is
  a shell command, not an orchestration worker**: no Task, no Dispatch,
  no `worker_done` authority, nothing a child could be mistaken for. The
  no-grandchildren fence is untouched, and a controller refusing a
  command-mode review on that theory has misread it.

**Default when available: command-mode sigiloso** for per-step reviews
(owner ruling) — a cross-family seat at a fraction of a subagent's cost,
so maker ≠ checker gets stronger, not weaker. Nothing settled the mode
⇒ take that default and keep going: never stall the run to ask, and
never start at a paid id, which the economics rule calls a bug rather
than a cautious choice. The step **verifies its
seat responds before relying on it**, and a seat that returns nothing
falls through `reference/runners.md`'s degradation chain instead of
blocking the step. Record which engine produced each verdict: a
fallen-through review must be visible, never indistinguishable from a
first-choice one, and a missing verdict is never an Approved step.

Whatever the mode, the prompt is composed from
`references/step-reviewer.md`, the seat is read-only on the checkout, and
both verdicts are required. What the class and the mode do NOT change:
the fix loop below, its cap, work-verify's lane gate, and the adversarial
seat — that late coverage is exactly what makes `grouped` safe.

*Fix loop, cap of 5.* One fix dispatch + one scoped re-review per
round. Rounds 1-3 resume the same implementer with the findings
verbatim; rounds 4-5 dispatch a fresh implementer on a more capable
model, pointed at the lane and the open findings. The re-review, composed
from `references/re-reviewer.md`, sees only the fix diff and verdicts
each finding ADDRESSED / NOT ADDRESSED. Minor findings never enter the
loop — record them in PROGRESS as deferred for work-verify's triage. At the cap, adjudicate each open
finding and record every ruling in DECISIONS.md (date — choice — why).
No silent discards. Append one line to PROGRESS per round.

*Release.* Record, then release the finished runner, then dispatch the
next. A runner is finished when nothing further is expected of it, and a
finished runner never lingers idle. The reviewer is finished once its
verdict is recorded, a re-review seat once its re-verdict is — neither is
held open in case a later step needs one. An implementer whose review is
pending is NOT finished: it stays resumable for the fix loop, and is
released only once its step's verdict is recorded as Approved or its fix
round closes. Release is runtime-neutral — a no-op where a subagent ends
naturally at its report, an explicit stop/release where runners linger,
never left implicit.

*Rulings, not stalls.* Ambiguities resolve against the SPEC; record the
ruling in DECISIONS.md and keep going. Only four things stop the run:
an irreversible/destructive operation, a security-sensitive action, a
side effect outside the worktree, a plan broken beyond ruling.

*Model by role.* Mechanical step → cheapest tier; integration → mid
tier; adjudication and risky-diff review → capable tier. State the
model in every dispatch — an omitted model silently inherits the most
expensive one.

**3. Verification.** work-run ships NO whole-branch final review: the
lane-level gate is work-verify's (its fresh-context review at M+ is the
final review). Invoke work-verify; PASS evidence lands in PROGRESS's
`## Verification`, pointing at the deferred minors. At L, feature_list
rows move to `passing` only on that evidence — work-run never flips a row.

**4. Close.** Invoke work-handoff (close or pause) — work-run never closes
a lane itself and commits no scratch. Surface every DECISIONS ruling
made during the run in the final summary: decisions taken on the
owner's behalf are never silent.

## Red flags

| Thought | Reality |
|---|---|
| "I'll just fix this one-liner myself" | Controller fixes skip review and pollute coordination context. Dispatch it. |
| "Steps 2 and 3 are independent, run both" | WIP=1 inside a lane. Independent lanes' worth of work → orchestrate. |
| "Paste the last report so the next subagent has background" | The lane is the background. PROGRESS already carries it. |
| "Skip the review, the acceptance command passed" | Acceptance proves the step ran; review proves it's the SPEC's step. Both. |
| "This per-step step is tiny — group it with the next two" | `per-step` is not overridable downward. Group what the PLAN marked `grouped`, nothing else. |
| "No class on these steps, so one pass at the end is fine" | A missing class means `per-step` for every step, never permission to group. |
| "Shelling out to another model births a grandchild" | Command mode is a shell command: no Task, no Dispatch, no `worker_done`. The fence is about workers. |
| "The sigiloso returned nothing — record it Approved and move on" | A missing verdict is not a verdict. Walk the chain (`reference/runners.md`) and record which engine ruled. |
| "One more round past the cap will converge" | Past 5 the failure is structural. Adjudicate and record the ruling. |
| "No subagents here, so relax the ceremony" | The fallback is the same lane inline, same ceremony. Nothing downgrades. |

## Judgment notes

- Recommended default at L (multi-session horizon is where fresh
  context per step pays most); available at M when the lane has several
  steps; an XL worker may run work-run inside its own lane, becoming the
  controller of its steps. Never mandatory (`reference/task-tiers.md`).
- The step's implementer report in PROGRESS is the recovery map: it
  survives compaction and travels with the worktree. After compaction,
  trust PROGRESS and `git log` over recollection.
- Suites' own executors are superseded (`reference/skills.md`): plans
  land in `work/<slug>/PLAN.md` and work-run executes from there.
