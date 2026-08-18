# Repo declares its tracker workspace — plan

Constraints (every step):

- Fence: `skills/ae-init/**`, `reference/tracker.md`,
  `skills/work-handoff/**`, plus `docs/how-it-works/integrations.md`
  scoped to the tracker-rule distillation only (parent ruling,
  DECISIONS.md 2026-08-18). Nothing else — no templates, no version
  bump, no CHANGELOG, no restamp (release ritual owns those, 1.3.1).
- The declaration line's canonical format lives ONCE in
  `reference/tracker.md`:
  `Tracker: Linear — workspace <workspace> · team <KEY> · project <project>`
  (project segment omitted when none). Every other file cites that
  section, never restates the format.
- Evals change before skill content on every touched skill.
- All artifacts in English.

Steps:

- [ ] 1. `judgment` — test(ae-init): new `skills/ae-init/evals/eval-05.md`
      (fresh install, tracker-connected workspace: tracker question asked
      exactly once and only because a tracker is in play, "none" accepted,
      declaration line format + placement under the stamp graded, no line
      on "none") + one checklist line in `skills/ae-init/evals/eval-01.md`
      (no tracker in play → no tracker question) — accept:
      `node tests/run-eval-checks.mjs` exits 0.
- [ ] 2. `judgment` — docs(reference): `reference/tracker.md` gains the
      declaration + respect-rule section: canonical `Tracker:` line format
      (the constraints-block format above), live-binding-vs-declaration
      compare before ANY tracker write, mismatch = NO write + state it +
      emit the exact operation for the operator (no-Orca-contract
      pattern), rule inert when the repo has no declaration line —
      accept: `node scripts/agent-lint.mjs . --ignore
      tests,templates,global,examples` exits 0.
- [ ] 3. `integration` — fix(ae-init): `skills/ae-init/SKILL.md` — step 3
      gains the settled-once tracker question gated on a tracker being in
      play ("none" accepted); step 6 instantiates the declaration line
      under the AGENTS.md stamp when a workspace was named, citing the
      format section written in step 2 — accept:
      `node tests/run-eval-checks.mjs` and `node scripts/agent-lint.mjs .
      --ignore tests,templates,global,examples` both exit 0.
- [ ] 4. `mechanical` — test(work-handoff): one checklist line in
      `skills/work-handoff/evals/eval-03.md` — the binding check runs
      before the tracker calls; mismatch → operations emitted, no write —
      accept: `node tests/run-eval-checks.mjs` exits 0.
- [ ] 5. `mechanical` — fix(work-handoff): one line in
      `skills/work-handoff/SKILL.md` step 6 citing the respect rule
      (step 2's section in `reference/tracker.md`) before the tracker
      calls — accept: `node scripts/agent-lint.mjs . --ignore
      tests,templates,global,examples` exits 0.
- [ ] 6. `mechanical` — docs(how-it-works): one sentence in
      `docs/how-it-works/integrations.md` (Orca ↔ Linear section) naming
      the respect rule and pointing at `reference/tracker.md` — accept:
      `node scripts/agent-lint.mjs . --ignore
      tests,templates,global,examples` exits 0.
