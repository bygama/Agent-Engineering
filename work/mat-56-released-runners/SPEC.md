---
issue: MAT-56
---
# work-run released runners — spec

<!-- Owner-written. The agent never edits this file. -->

work-run gains the released-runners discipline: once a dispatched
runner's report or verdict is RECORDED by the controller, that runner
is released immediately — finished agents never linger idle.

## The gap

skills/work-run's step loop ends at "record" with no release of the
finished runner. On runtimes where agents outlive their report
(in-session teammates, lingering terminals) they idle forever. The
Orca orchestration layer already encodes the counterpart
(worker-release after settled worker_done; orchestrate's step 8);
this change closes the work-run side only.

## Done looks like

- A work-run eval expects the release: once a runner's report or
  verdict is recorded, the controller stops/releases that runner
  immediately. The eval change lands in its own commit BEFORE the
  SKILL.md content commit (split commits, evals-first hard
  constraint, per the mat-55 habit ruling).
- skills/work-run/SKILL.md's step-2 loop gains the third action:
  record → release the finished runner → dispatch next.
- Wording is runtime-neutral: in-session subagents that end naturally
  = no-op; runtimes with lingering agents = explicit stop/release.
  No runtime-specific tool is named in the skill body beyond that
  contrast.
- Timing nuance encoded (mat-55 run learning): an implementer whose
  step is awaiting review is NOT finished — it may be resumed for the
  fix loop; release it only once its step's verdict is recorded as
  Approved (or its fix round closes). A reviewer is finished when its
  verdict is recorded. A re-review seat follows the same rule.

## Out of scope

- Any file outside skills/work-run/ (eval + SKILL.md only).
- Version bump, CHANGELOG entry, restamp — the release ritual owns
  those.

## Gates

All four green before the PR:

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- `node tests/run-lint-tests.mjs`
- `node tests/run-gen-tests.mjs`
- `node tests/run-eval-checks.mjs`
