# work-run released runners — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

## Constraints (apply to every step)

- Evals first, split commits: step 1 (eval) is its own commit and lands
  BEFORE step 2 (SKILL.md content) — never squashed together.
- Runtime-neutral wording: in-session subagents that end naturally =
  release is a no-op; runtimes with lingering agents = explicit
  stop/release. Name no runtime-specific tool in the skill body beyond
  that contrast.
- Scope fence: touch only `skills/work-run/` (eval + SKILL.md). No
  version bump, no CHANGELOG entry, no restamp — the release ritual
  owns those.

## Steps

- [x] 1. `judgment` — Extend `skills/work-run/evals/eval-01.md` (the
  step-loop eval) with released-runners expectations: once a runner's
  report or verdict is RECORDED, the controller releases that runner
  immediately (finished runners never linger idle); a reviewer (and a
  re-review seat) is finished when its verdict is recorded; an
  implementer whose step awaits review is NOT finished — it stays
  resumable for the fix loop and is released only once its step's
  verdict is recorded as Approved (or its fix round closes); release
  is runtime-neutral (natural-end subagents = no-op, lingering agents
  = explicit stop/release). Commit the eval change alone. — accept:
  `node tests/run-eval-checks.mjs` exits 0
- [x] 2. `judgment` — Update `skills/work-run/SKILL.md` to encode
  exactly the behaviors step 1 added to eval-01: the workflow
  checklist's step-2 line and the `**2. The step loop.**` section gain
  the third action — record → release the finished runner → dispatch
  next — including the timing nuance (implementer released on
  Approved verdict / fix-round close; reviewer and re-review seat
  released when verdict recorded) and the runtime-neutral contrast.
  Commit the content change alone, after step 1's commit. — accept:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0 and `node tests/run-eval-checks.mjs` exits 0
