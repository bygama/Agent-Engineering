---
name: work-run
description: Executes one lane's PLAN step-by-step with a fresh subagent per step — the lane (SPEC, PLAN, PROGRESS, DECISIONS) is the entire context package, with a per-step review, a capped fix loop, and rulings recorded in the lane. Use when a work/<slug>/ lane with several PLAN steps should be executed in this session — the recommended default for L lanes, available for M, and inside an XL worker's own lane. Not for S tasks (no lane) and never for parallel work across lanes (that is orchestrate).
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
- [ ] 0. Qualify (lane exists, several steps, subagents available)
- [ ] 1. Read the lane; resume from PROGRESS
- [ ] 2. Per step: dispatch → report → review → fix loop → record → release
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
  per step, PROGRESS updated. Never simulate a dispatch.

**1. Read the lane.** PROGRESS first — resume at the first step without
a DONE report; never re-dispatch a completed step. Note SPEC (the
binding authority) and standing rulings in DECISIONS.

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
AND quality.

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
