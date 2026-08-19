# Single-shot worker_done + upstream attribution stance — progress

## Done

- Lane opened on branch `bygama/mat-104-94-single-shot-attrib` (cut
  from `bygama/mat-100-101-ballena-auto`, stacked on PR #77).
- SPEC.md written from the parent's dispatch brief (design-first);
  approved by the parent 2026-08-19 (see DECISIONS.md).
- PLAN.md shaped: 6 steps, evals first.
- Step 1: `skills/orchestrate/evals/eval-03.md` gained the
  degenerate-worker_done assertions before any content edit — a new
  Fixture paragraph (the ballena's real PASS body fails to parse, the
  seat test-fires `--subject "t" --body "t"` which lands as the one
  `worker_done` and burns the single shot, transcript keeps advancing,
  Orca's rejection of the earlier send quotes the original body
  verbatim) plus two new `## Expected behavior` bullets: (a) the
  degenerate worker_done with an advancing transcript is neither idle
  nor a FAIL — diagnose with `worker-read`, ack the placeholder as
  noise, hold for the follow-up; (b) worker_done is single-shot, so the
  real verdict surfaces only inside Orca's rejected-worker_done wrapper
  quoting the original body verbatim — valid verdict evidence once it
  reaches the lane, routed on like any PASS/FAIL body. Inserted between
  the existing stall-clock bullet and the FAIL-routing bullet
  (chronological fit: verdict-arrival handling before verdict-routing).
  Acceptance: `node tests/run-eval-checks.mjs` exits 0 (all 13 skills'
  evals well-formed); `grep -c 'worker-read'
  skills/orchestrate/evals/eval-03.md` = 2 (≥ 1 required). No other file
  touched.

- Step 1 review (fresh in-session reviewer, verdict verbatim):
  "### Spec compliance / ✅ Compliant — `skills/orchestrate/evals/
  eval-03.md` gains both required assertions before any content edit,
  and both acceptance commands pass as specified. [...] **Step
  quality:** Approved — Both acceptance criteria pass verbatim, the two
  new assertions faithfully cover requirements (a) and (b), and the
  change stays strictly scoped to the eval file (plus PROGRESS.md) with
  no premature content edits — the one flagged item is a cosmetic
  wording nit, not a functional or scope defect." Minor (deferred to
  work-verify triage): eval-03.md:54 says "two-character strings" but
  the placeholder `"t"` is one character — tighten to "placeholder
  strings".

- Step 2: seat-side single-shot warning, single definition.
  `skills/orchestrate/references/reviewer.md`'s fenced brief gains a new
  paragraph right after the `worker_done` send example in its "Reporting
  your verdict" section: "worker_done is SINGLE-SHOT per dispatch —
  never test-fire the channel with a placeholder. If a send fails to
  parse, fix the escaping (write the body to a file and use `--body
  "$(cat file)"`; avoid backticks in the body) and send ONCE." Placed
  between the command block and the pre-existing "Your verdict is the
  PASS/FAIL line..." paragraph, since it's advice about the mechanics of
  the same send shown just above.
  `reference/runners.md` gains a 4-line paragraph after the `--auto`
  paragraph (end of the TUI-form recipe, before "Verify on install"):
  "The reviewer's `worker_done` report is single-shot per dispatch,
  too — see `skills/orchestrate/references/reviewer.md`'s fenced brief
  ('Reporting your verdict') for the send-once discipline; this file
  only launches the seat, it does not restate that rule." — single-
  definition discipline: runners.md points at reviewer.md rather than
  repeating the escaping/placeholder guidance.
  Confirmed no line-budget lint check applies to `reference/runners.md`
  (agent-lint.mjs's budget checks target AGENTS.md/CLAUDE.md and
  reference/skills.md only), so no trim was needed.
  Acceptance: `grep -ci 'single-shot' skills/orchestrate/references/
  reviewer.md` = 1 (≥ 1 required); `grep -ci 'single-shot'
  reference/runners.md` = 1 (≥ 1 required); `node scripts/agent-lint.mjs
  . --ignore tests,templates,global,examples` → "0 high, 0 medium, 0
  low — PASS", exit 0. Files changed:
  `skills/orchestrate/references/reviewer.md`, `reference/runners.md`.
  Note: PLAN.md's step 1 checkbox is still `[ ]` despite being done and
  reviewer-approved (see the "Done" entry above) — following that same
  precedent, step 2's checkbox is left unticked here too; ticking
  appears to be lane-finalization bookkeeping (cf. mat-100-101's closing
  commit "tick PLAN — all 5 steps approved"), not a per-step action.

- Step 2 review (fresh in-session reviewer, verdict verbatim):
  "### Spec compliance / ✅ Compliant — both required edits are present,
  correctly placed, and both acceptance commands verified in a real run.
  [...] **Step quality:** Approved — Both required edits are correctly
  worded, correctly placed relative to the named anchors, and
  independently verified against the exact acceptance commands (grep
  counts and lint exit code all confirmed by direct execution, not just
  trusted from PROGRESS.md)." Minor (deferred, likely no-action): the
  runners.md paragraph is one sentence wrapping to 4 physical lines —
  "1-2 lines" read as "briefly"; reviewer says not worth blocking on.

- Step 3: parent-side guidance + docs chapter, same commit.
  `skills/orchestrate/SKILL.md` step 6 gains a new paragraph ("A
  degenerate `worker_done` is neither idle nor a FAIL") inserted between
  the existing "The verdict is the PASS/FAIL line..." paragraph and the
  "FAIL sends the findings back..." paragraph: a placeholder body
  (`--subject "t" --body "t"`) burns the dispatch's single worker_done
  shot; a still-advancing transcript rules out step 5's idle signature
  (which needs a *stopped* cadence) and a placeholder isn't a PASS/FAIL
  line either, so it isn't a FAIL; diagnose with `worker-read --dispatch
  <id>`, ack the placeholder as noise, hold for the follow-up; the real
  verdict arrives inside Orca's rejected-worker_done wrapper quoting the
  original body verbatim, and that quoted body routes on like any
  accepted PASS/FAIL body once it reaches the lane.
  `docs/how-it-works/execution.md`'s stage-6 narration gains the parallel
  paragraph after the existing stall-clock paragraph and before stage 7's
  paragraph, narrating both sides explicitly — the seat's single-shot
  channel (never test-fire it; escape the body properly and send once)
  and the parent's handling (idle-vs-FAIL disambiguation via the
  transcript, `worker-read`, the rejected-worker_done wrapper as valid
  evidence) — consistent with step 1's eval-03 wording (the graded
  behavior) and the wording already shipped in
  `skills/orchestrate/references/reviewer.md` (step 2).
  Acceptance: `node tests/run-eval-checks.mjs` exits 0 (13 skills' evals
  well-formed); `grep -c 'worker-read' skills/orchestrate/SKILL.md` = 4
  (≥ 2 required); `grep -ci 'single-shot' docs/how-it-works/execution.md`
  = 1 (≥ 1 required). Also confirmed (not required by this step's
  acceptance, but cheap and relevant since step 6 needs it too): `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  "0 high, 0 medium, 0 low — PASS". Files changed:
  `skills/orchestrate/SKILL.md`, `docs/how-it-works/execution.md`.

- Step 3 review (fresh in-session reviewer, verdict verbatim):
  "### Spec compliance / ✅ Compliant [...] **Step quality:** Approved
  — All four required acceptance checks pass by direct execution, the
  added text lands in the exact specified location in both files,
  accurately cross-references step 5's real idle signature, and stays
  faithful to eval-03's already-graded behavior — no missing, extra, or
  misunderstood content found." Minors (deferred, reviewer says not
  worth touching now): two consecutive execution.md paragraphs open
  with a "Stage 6 ... the diagram can't/doesn't draw" parallel; the
  step's `worker-read ≥ 2` acceptance bar was already satisfiable
  pre-diff (acceptance-design weakness, not an implementation defect —
  the new paragraph adds real worker-read usage on top).

## In progress

## Tried and failed

## Next

- work-run the PLAN, step 4 (MAT-94 classification: diff
  `skills/shaping/SKILL.md` against upstream `brainstorming` and
  `skills/skill-authoring/SKILL.md` against upstream `writing-skills`;
  classify with evidence in DECISIONS.md).

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
