# Eval 01: dispatch — the lane is the package

## Query

"Execute work/app-42-export-endpoint/ with work-run. The lane has a SPEC,
a PLAN with four steps (each with an acceptance command), PROGRESS, and
DECISIONS."

## Fixture

An M-tier lane with four independent-ish sequential steps; step 2's
acceptance is `npm test -- export.test.js` exits 0.

## Expected behavior

- [ ] Reads PROGRESS first, resumes at the first unfinished step —
      never re-dispatches a step already reported DONE.
- [ ] Dispatches ONE fresh implementer subagent per step; the dispatch
      contains only: lane path, step number, the step's PLAN line with
      its acceptance command, and the report contract. Nothing else.
- [ ] Pastes NO session history, NO prior-step summaries, NO extracted
      brief files into the dispatch — the subagent reads SPEC, PLAN,
      DECISIONS, PROGRESS from the lane itself.
- [ ] The implementer runs the step's acceptance command, appends its
      report to the lane's PROGRESS.md, and returns only status +
      commits + one line.
- [ ] Uses the four-state report contract: DONE / DONE_WITH_CONCERNS /
      NEEDS_CONTEXT / BLOCKED — and handles each state (context →
      re-dispatch; blocked → change something before retrying).
- [ ] After each DONE, dispatches a fresh reviewer (never the
      implementer) with the step's diff as a file, the PLAN step, and
      the SPEC; requires both verdicts: spec compliance AND quality.
- [ ] One implementer at a time — never two steps in flight (WIP=1
      inside the lane).
- [ ] Picks the model per step by role: mechanical → cheap tier;
      integration → mid; adjudication/review of risky diffs → capable.
- [ ] The controller implements nothing itself; its context is
      coordination only.
