# Implementer dispatch template

**When to use:** work-run's step loop (SKILL.md step 2, "Dispatch") — one
fresh implementer subagent per PLAN step, or one dispatch covering several
batched same-shape steps (still one subagent).

**How to fill:** exactly four things go in — `[MODEL]`, `[LANE_PATH]`,
`[STEP_NUMBER]`, `[STEP_PLAN_LINE]`. Nothing else: no session history, no
prior-step summaries, no extracted briefs. The subagent reads SPEC, PLAN,
DECISIONS, and PROGRESS from the lane itself.

```
Subagent (general-purpose):
  description: "Implement lane step [STEP_NUMBER]"
  model: [MODEL — REQUIRED per work-run's model-by-role: mechanical step →
         cheapest tier; integration → mid tier; adjudication/risky-diff
         review → capable tier. An omitted model silently inherits the
         most expensive one.]
  prompt: |
    You are implementing one step of a work lane.

    ## Lane

    Lane path: [LANE_PATH]

    Read SPEC.md (the binding authority), PLAN.md, DECISIONS.md, and
    PROGRESS.md from that path yourself. Check PROGRESS.md first — if
    step [STEP_NUMBER] already carries a DONE report, stop and say so
    instead of redoing it.

    ## Your step

    Step [STEP_NUMBER]:
    [STEP_PLAN_LINE]

    Implement exactly this step — nothing upstream or downstream of it.
    Run the acceptance command shown above yourself; it is the
    objective gate. Follow existing patterns in the codebase; improve
    code you touch the way a good developer would, but don't
    restructure things outside this step. Commit your work
    (conventional commit, English).

    ## Before you begin

    If the step, its acceptance command, or a dependency is unclear, or
    you have questions about the approach — ask now, or report
    NEEDS_CONTEXT. Don't guess or assume.

    ## You do not dispatch subagents

    Do all of this step's work yourself. Never spawn a subagent to
    implement part of it, and above all never spawn a reviewer to check
    your work — that review is already scheduled: the controller
    dispatches a fresh reviewer against your diff once you report. A
    reviewer you spawn duplicates that seat at full cost and its
    approval counts for nothing.

    ## When you're in over your head

    Stopping and saying "this is too hard" is fine — bad work is worse
    than no work. Escalate — NEEDS_CONTEXT (missing information) or
    BLOCKED (can't proceed) — when the step needs an architectural call
    the PLAN didn't make, needs code you can't find clarity on, or
    you're reading file after file without progress. Put the specifics
    in your final message; the controller acts on them directly.

    ## Report

    Append your report to the lane's PROGRESS.md, under `## Done` (or
    `## Tried and failed` if blocked): what you implemented, the
    acceptance command and its output, files changed, any concerns. If
    you're resumed with review findings, append a fix report in the
    same place instead of a new entry: what changed, the covering tests
    you re-ran, and their output — reviewers will not re-run tests for
    you, your report is the evidence.

    Then reply with ONLY:
    - **Status:** DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
    - Commits created (short SHA + subject)
    - One line (acceptance/test summary, or the concern/blocker)

    Use DONE_WITH_CONCERNS if the step is complete but you have doubts
    about correctness. Never silently produce work you're unsure about.
```

**Placeholders:**
- `[MODEL]` — REQUIRED: chosen per work-run's model-by-role
- `[LANE_PATH]` — REQUIRED: the lane folder, e.g. `work/app-42-export/`
- `[STEP_NUMBER]` — REQUIRED: the PLAN step id being dispatched
- `[STEP_PLAN_LINE]` — REQUIRED: the step's PLAN line, copied verbatim,
  acceptance command included

**Implementer returns:** Status (DONE / DONE_WITH_CONCERNS /
NEEDS_CONTEXT / BLOCKED), commits, one line — with the full report already
appended to the lane's PROGRESS.md.
