---
issue: MAT-112, MAT-113
---

# PROGRESS — mat-112-113-lane-hygiene

## Done

- Lane opened; SPEC.md written from the parent orchestrator's dispatch
  brief + both Linear tickets (design-first mode).
- SPEC approved by the parent (ask msg_ed930a16487b, ruling in
  DECISIONS.md); PLAN.md shaped, approval-window marker removed the
  same turn.

- **Step 1 [MAT-112] Fixture pair + self-test cases (RED) — DONE.**
  Added `tests/fixtures/lanes-accum-ok/` (clean `AGENTS.md` +
  `@AGENTS.md` `CLAUDE.md`, `work/` holding exactly 5 complete lanes —
  `lane-alpha`..`lane-echo`, each with `PLAN.md` + `PROGRESS.md`) and
  `tests/fixtures/lanes-accum-over/` (identical shape plus a 6th lane,
  `work/lane-window/`, sitting in the design-first approval window:
  `SPEC.md` + a `PROGRESS.md` whose `## In progress` carries the marker
  line verbatim, no `PLAN.md` — mirrors `tests/fixtures/lane-window-ok/`).
  Added both cases to `tests/run-lint-tests.mjs`, red-until comments
  citing MAT-112, mirroring the `entry-skill-ok`/`entry-skill-bloat`
  boundary-pair style: the ok case (`fail: false`, `expect: []`, forbid
  `lane-accumulation`) and the over case (`fail: true`, expect
  `lane-accumulation`, expectMatch `work/ holds 6 lanes`, forbid
  `lane-incomplete`).

  Sanity-checked both fixtures directly against the unmodified lint
  first (`node scripts/agent-lint.mjs tests/fixtures/lanes-accum-ok
  --json` / `...-over --json`) — both come back `"findings": [],
  "fail": false`, confirming the over fixture is lint-clean today (no
  check exists yet to fire on it) and that the window lane does not
  spuriously trip `lane-incomplete`.

  Acceptance command and RED output (`node tests/run-lint-tests.mjs`,
  exit 1, only the new over case fails):

  ```
  ok   exactly 5 lanes in work/ passes
  FAIL 6 lanes in work/ fails (one is a design-first-window lane)
    expected fail=true, got false
    missing expected finding "lane-accumulation"
    no finding message matched expected "work/ holds 6 lanes"
    findings: (none)
  ok   invalid feature list fails
  ...
  1/27 cases failed
  EXIT CODE: 1
  ```

  All 26 other cases still pass (`ok`), including the ok fixture's case
  and every pre-existing lane/window case — the RED is isolated to the
  single new over case, and its failure includes `missing expected
  finding "lane-accumulation"` as required. Also ran
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  (exit 0, `0 high, 0 medium, 0 low — PASS`) to confirm the new fixtures
  under `tests/fixtures/` don't affect the repo's own self-lint (the
  `tests` ignore covers them).

  Files changed: `tests/fixtures/lanes-accum-ok/{AGENTS.md,CLAUDE.md,
  work/lane-{alpha,bravo,charlie,delta,echo}/{PLAN.md,PROGRESS.md}}`,
  `tests/fixtures/lanes-accum-over/{AGENTS.md,CLAUDE.md,
  work/lane-{alpha,bravo,charlie,delta,echo}/{PLAN.md,PROGRESS.md},
  work/lane-window/{SPEC.md,PROGRESS.md}}`, `tests/run-lint-tests.mjs`.

  Concerns: none — `scripts/agent-lint.mjs` was not touched, per the
  step's fence; step 2 lands the check itself.

- **Step 1 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat, liveness-probed).**
  Verdict verbatim: "### Spec compliance / ✅ Compliant — every
  requirement of Step 1 is present and verified […] ### Assessment /
  **Step quality:** Approved / **Reasoning:** All acceptance criteria
  verified against a live read-only run — the suite exits 1 failing
  only the new over case with the required `missing expected finding
  \"lane-accumulation\"` string — and the fixtures are built to stay
  correct once step 2 lands the check (marker shape exact, count
  wording matches SPEC). No defects found at any severity in the
  implemented scope." Reviewer independently re-ran the suite
  (exit 1, 1/27, over case only) plus gen/eval gates (both exit 0).
  Minor notes (no fix loop): (a) the DECISIONS.md reviewer-mode entry
  riding in the step-1 diff is controller-authored (work-run step 1,
  settle-the-mode) — confirmed, nothing to do; (b) `expect: []`
  explicit vs omitted is house-acceptable either way. Seat note: the
  sigiloso seat initially failed with opencode's known postinstall
  gotcha (`reference/runners.md` install note); repaired by running
  `node_modules/opencode-ai/postinstall.mjs` once by hand, then probed
  ALIVE before this review.

- **Step 2 [MAT-112] The `lane-accumulation` check — DONE.** Added the
  check to `scripts/agent-lint.mjs`'s work-lanes section, right after the
  per-lane loop that builds the `lanes` Map (so it reuses `lanes.size`,
  which already counts folders mechanically — one entry per distinct
  `work/<slug>/` regardless of contents — verbatim from step 1's fixture
  design). Fires `medium` `lane-accumulation` anchored to the file field
  `work/` when `lanes.size > 5` (strict), with the exact message from the
  PLAN's constraints block, `<n>` interpolated from the live count. The
  comment above the check records both required judgments: the interplay
  judgment (a design-first-window lane still counts toward the total —
  the check measures accumulation, never validity, citing SPEC and
  MAT-112) and the threshold rationale (XL lanes' children live in their
  own worktrees, so 5 concurrent lanes in one checkout is already
  generous; MEDIUM severity, a nudge to close) — mirroring the tone of
  the `DESIGN_WINDOW_MARKER` and `machine-path` comment blocks nearby.

  Acceptance commands, both exit 0:

  ```
  $ node tests/run-lint-tests.mjs
  ...
  ok   exactly 5 lanes in work/ passes
  ok   6 lanes in work/ fails (one is a design-first-window lane)
  ...
  all 27 cases passed
  EXIT: 0

  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-112-113-lane-hygiene
  0 high, 0 medium, 0 low — PASS
  EXIT: 0
  ```

  Also re-ran `node tests/run-gen-tests.mjs` and
  `node tests/run-eval-checks.mjs` as a sanity check (not required by
  this step's acceptance) — both still exit 0, unaffected.

  Files changed: `scripts/agent-lint.mjs` (the check + its comment
  block, 9 added lines). No fixtures or test cases touched — step 1
  landed those verbatim and the suite went green without further edits.

  Concerns: none.

- **Step 2 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat).** Verdict verbatim:
  "### Spec compliance / ✅ Compliant / Every binding-contract element
  is present in `scripts/agent-lint.mjs`: code `lane-accumulation`,
  severity `medium`, strict threshold `lanes.size > 5`, anchor `work/`,
  and a message byte-for-byte identical to the PLAN constraint […]
  ### Assessment / **Step quality:** Approved / **Reasoning:** The
  check implements the binding contract exactly (code, severity, strict
  threshold, anchor, verbatim message) with both required judgments
  recorded at point-of-use, and both acceptance gates were
  independently re-run to exit 0 against fixtures consumed unchanged
  from step 1." Reviewer independently re-ran both gates (27/27, exit
  0; self-lint PASS, exit 0). Minor note (deferred, no fix loop): bare
  `5` literal vs a named constant — cosmetic, PLAN-bound N, skipped
  under smallest-coherent-change.

- **Step 3 [MAT-113] work-plan evals (before content) — DONE.** Added
  `skills/work-plan/evals/eval-07.md` ("pre-open sweep — merged debt
  blocks, in-progress lanes don't", owner scenario [a]) and
  `eval-08.md` ("stacked wave — an open PR is pending, not debt", owner
  scenario [b]), both in the house shape read off eval-01..06:
  `# Eval NN: <phrase>` title, `## Query` (owner's words, split
  `(a)`/`(b)` where the scenario has two beats, as eval-02/eval-05 do),
  `## Fixture` (the checkout state in prose), `## Expected behavior`
  (8-9 `- [ ]` lines, 72-col wrap, one judgment per line).

  eval-07 encodes scenario [a]: four lanes, `work/mat-101-cache/`
  merged-but-present, three live. Checklist requires the sweep to run
  before `work/<slug>/` is created; mechanical detection
  (`git branch --merged` / PR state, never PROGRESS prose); the merged
  lane named specifically; refusal until it is closed carrying the line
  "the next ticket is not a close"; the three in-progress lanes
  untouched (debt, never concurrency); the trigger being the merged
  folder and not the headcount (four lanes sit under the
  `lane-accumulation` threshold, so the two legs cannot be conflated);
  work-plan routing to work-handoff instead of deleting anything
  itself; and the lanes opening in the same session once the close
  lands (a gate, not a veto), delivered in the house refusal shape.

  eval-08 encodes scenario [b] as two beats: (a) five verified lanes
  with open PRs in a decided merge order ⇒ opens freely, proposes no
  merge, does not reorder or collapse the stack, deletes nothing, and
  does not convert five folders into a blanket "too many lanes" stop;
  (b) after the first PR merges and its folder persists ⇒ that one
  blocks, scoped to itself, with the other four named as fine in the
  same breath. The closing line requires the MERGED-versus-verified
  distinction to be stated, so the criterion is visible.

  Acceptance command, exit 0 (work-plan now at 8 evals):

  ```
  $ node tests/run-eval-checks.mjs
  ...
  ok   work-plan: 8 evals well-formed
  ...
  all eval checks passed
  EXIT: 0
  ```

  Also ran `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  as a sanity check (not this step's acceptance): exit 0,
  `0 high, 0 medium, 0 low — PASS`.

  Files changed: `skills/work-plan/evals/eval-07.md`,
  `skills/work-plan/evals/eval-08.md` (both new), plus this PROGRESS.md
  entry. `skills/work-plan/SKILL.md` deliberately untouched — the sweep
  content is step 4, evals-before-content is repo law.

  Concerns: none. Note for step 4: the eval-07 checklist pins the
  refusal wording "the next ticket is not a close" and pins that
  work-plan routes the close to work-handoff rather than deleting the
  folder itself — the SKILL.md text must satisfy both, plus eval-08's
  requirement that the sweep never nudges toward an early merge.

- **Step 3 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat).** Verdict verbatim:
  "### Spec compliance / ✅ Compliant […] ### Assessment /
  **Step quality:** Approved / **Reasoning:** Both evals translate the
  owner-confirmed scenarios into observable, mechanically-checkable
  expectations that encode every binding judgment (MERGED-not-verified,
  pending-not-debt, never-forces-a-merge, in-progress untouched, the
  refusal line) without touching skill content, and the acceptance gate
  independently re-ran green." Reviewer independently re-ran
  `node tests/run-eval-checks.mjs` (exit 0, work-plan: 8 evals
  well-formed). Minor notes (deferred, no fix loop): (a) eval-08
  hardcodes "MEDIUM" for the lane-accumulation nudge — accepted
  coupling, the contract is parent-ratified in this same lane; (b)
  cosmetic italics in eval-07 — tone drift only.

- **Step 4 [MAT-113] work-plan pre-open sweep — DONE.** Added the sweep
  to `skills/work-plan/SKILL.md` inside step 0 — the pre-open gate
  position, since step 1 is where `work/<slug>/SPEC.md` (and the
  design-first `PROGRESS.md` marker) get written in either mode. The
  step-0 lead becomes **0. Qualify, then sweep.**, the workflow
  checklist's item 0 gains `+ pre-open sweep (a MERGED lane whose
  folder persists refuses until work-handoff closes it)`, and a prose
  block plus five italic-lead bullets follow the existing refusal list.
  Deliberately did NOT renumber the steps into a new step for the
  sweep: `scripts/agent-lint.mjs`'s design-window comment cites
  "skills/work-plan/SKILL.md step 1" and the skill cross-references
  step numbers eight times, so renumbering would falsify surfaces this
  step is fenced out of.

  Text coverage against the step-3 evals — eval-07: sweep runs before
  `work/<slug>/` is created ("before SPEC.md, before PROGRESS.md, in
  either mode"), never deferred to a cleanup pass or left for the owner
  to remember; detection mechanical (`git branch --merged main` / PR
  state, "never PROGRESS.md prose, a ticked PLAN, or a 'this one looks
  finished' judgment"); the folder is named with its merge evidence;
  the refusal carries **the next ticket is not a close** verbatim and
  rejects the "we'll clean it up later" open; in-progress lanes
  untouched ("The rule punishes debt, never concurrency"); trigger is
  the merged folder, not the headcount, with `lane-accumulation` named
  as a separate count-based MEDIUM nudge never folded into a blanket
  "too many lanes" stop; work-plan deletes nothing and hands the close
  to work-handoff "instead of improvising a `rm`"; the lanes open in
  the same session once the close lands ("a gate on debt, not a
  standing veto on new work"). eval-08: "MERGED, not verified" is its
  own bullet — a verified lane with an OPEN PR awaiting its decided
  turn is pending, never blocks, the sweep proposes no merge and never
  nudges toward merging early, merge order stays the parent's/owner's
  call, and "a stacked wave (B rebased on A) survives the open
  untouched"; no folder is deleted or proposed for deletion; the
  refusal is scoped to the folders that actually merged and "names the
  rest as fine in the same breath, says MERGED-versus-verified is what
  separated them". The Judgment note listing the house refusal pattern
  now enumerates the merged-lane refusal alongside the other three.

  Acceptance commands, both exit 0:

  ```
  $ node tests/run-eval-checks.mjs
  ...
  ok   work-plan: 8 evals well-formed
  ...
  all eval checks passed
  EXIT: 0

  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT: 0
  ```

  Sanity checks beyond this step's acceptance: `node
  tests/run-lint-tests.mjs` (exit 0, all 27 cases) and `node
  tests/run-gen-tests.mjs` (exit 0). SKILL.md is 247 lines (cap <500);
  every inserted line wraps at ≤72 cols — the only long lines in the
  file are the pre-existing frontmatter description, the design-window
  marker, and prose that predates this step.

  Files changed: `skills/work-plan/SKILL.md` (checklist item 0, the
  step-0 lead, the sweep block, one Judgment-note line), plus this
  PROGRESS.md entry. Nothing under `.claude/skills/`, `templates/` or
  `reference/` touched. The step-3 review entry above rides in the same
  commit — controller-authored, uncommitted when this step started,
  preserved rather than reverted.

  Concerns: none. Note for step 7 (docs sweep):
  `docs/how-it-works/work-lifecycle.md` narrates work-plan's modes and
  the lane lifecycle but does not enumerate its checklist steps, so the
  sweep is an addition that chapter may want to mention — it falsifies
  nothing there today.

- **Step 4 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat).** Verdict verbatim:
  "### Spec compliance / ✅ Compliant — the diff adds exactly what Step
  4 asked: a pre-open sweep inside work-plan's step 0
  (`skills/work-plan/SKILL.md:66-102`), gated before `work/<slug>/`
  creation in either mode, MERGED-criterion via `git branch --merged
  main` / PR state, refusal until work-handoff closes, with **the next
  ticket is not a close** carried verbatim […] ### Assessment /
  **Step quality:** Approved / **Reasoning:** The sweep text satisfies
  every eval-07/eval-08 checklist line with mechanically-checkable,
  correctly-scoped prose placed where a session will actually hit it
  pre-open, matches the skill's voice, stays far under the 500-line cap
  (247), and contradicts nothing else in the skill or standard; both
  acceptance gates re-ran green independently." Minor (deferred to
  work-verify's triage): the frontmatter `description` enumerates three
  refusals but not the new merged-lane refusal — a stale triggering
  surface, candidate for the step-7 sweep or a small follow-up commit.

- **Step 5 [MAT-113] work-handoff eval (before content) — DONE.** Added
  `skills/work-handoff/evals/eval-07.md` ("batch close — 'at the end of
  the run' never comes"), in the house shape read off eval-01..06:
  `# Eval 07: <phrase>` title, an `Origin failure:` note (the eval-05
  precedent) carrying the field evidence verbatim from SPEC — Pegasuz,
  2026-08-20, ~40-ticket marathon, 32 lane folders left in `work/`,
  every one verified and merged — then `## Query` (the owner's words,
  single beat, as eval-01/03/04 do), `## Fixture` (checkout state in
  prose) and `## Expected behavior` (9 `- [ ]` lines, ≤72 cols, one
  judgment per line — the granularity of eval-03's 9-line checklist).

  The scenario is deliberately mid-marathon, not end-of-marathon: ticket
  12 of ~40, `work/mat-207-…/` gate-satisfied (PASS block current, PR
  merged, tree green), three earlier merged lanes already deferred under
  the same plan, two lanes genuinely in flight. That fixture makes the
  checklist able to separate the three populations the judgment needs:
  the lane to close now, the accumulated debt, and live concurrency.

  Checklist encodes: refuse the deferral and close now (the gate is
  already satisfied, nothing to wait for); state the reason on its own
  terms — in a marathon the end never comes — not as a rule citation;
  no substitute accepted (TODO, PROGRESS note, reminder, "sweep them
  tomorrow" is not a close, and none is offered as a compromise); the
  three deferred merged lanes named as debt with the same per-lane fix,
  never one sweep commit deleting four folders; per-lane close shape
  preserved (finalize commit, then folder removal) with the gate
  re-checked per lane, so one batch cannot carry a single verdict for
  four; in-flight lanes untouched (debt, never concurrency); close
  pinned to the merge — no open-PR lane closed, no early merge proposed
  to make one closable; the card+tracker step still runs per close
  (pace is not an excuse to skip evidence); and WIP=1 — the seat does
  not pass to ticket 13 with the close owed, with the debt named exactly
  if the owner holds the line.

  Complementarity with the work-plan side (step 3) without duplication:
  work-plan's eval-07/08 gate the OPEN (a merged-but-present folder
  refuses the next lane); this one gates the DEFERRAL (the close happens
  at this ticket's merge, not queued for a later sweep). The shared
  doctrine appears once on each side in the terms of that side — the
  work-plan refusal line "the next ticket is not a close" is not reused
  here; the last checklist line reaches the other side only as a
  consequence (the debt named for the next open to hit).

  Acceptance command, exit 0 (work-handoff now at 7 evals):

  ```
  $ node tests/run-eval-checks.mjs
  ...
  ok   work-handoff: 7 evals well-formed
  ok   work-plan: 8 evals well-formed
  ...
  all eval checks passed
  EXIT: 0
  ```

  Also ran `node scripts/agent-lint.mjs . --ignore tests,templates,examples`
  as a sanity check (not this step's acceptance): exit 0,
  `0 high, 0 medium, 0 low — PASS`.

  Files changed: `skills/work-handoff/evals/eval-07.md` (new), plus this
  PROGRESS.md entry. `skills/work-handoff/SKILL.md` deliberately
  untouched — the red-flag row is step 6, evals-before-content is repo
  law. Nothing under `.claude/skills/`, `templates/` or `reference/`
  touched. The step-4 review entry above rides in the same commit —
  controller-authored, uncommitted when this step started, preserved
  rather than reverted.

  Concerns: none. Note for step 6: the checklist pins wording the
  red-flag row must support — the refusal argued as "in a marathon the
  end never comes" (not as a cited rule), the batch refused *without* a
  TODO/note compromise, the per-lane close shape (finalize-then-remove,
  gate re-checked per lane) surviving the marathon pace, in-flight lanes
  explicitly out of scope, and the existing WIP=1 judgment note being
  the hook the last checklist line leans on.

- **Step 5 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat).** Verdict verbatim:
  "### Spec compliance / ✅ Compliant — the diff adds exactly what Step
  5 asked. New `skills/work-handoff/evals/eval-07.md` […] encodes the
  mid-marathon deferral ('I'll close them all at the end of the run',
  ticket 12 of ~40), the refused batch, and per-lane close at each
  ticket's merge; `SKILL.md` untouched (step 6 owns content —
  evals-before-content honored). […] ### Assessment / **Step quality:**
  Approved / **Reasoning:** The eval encodes the SPEC §5 binding
  judgment with observable, mechanically-checkable expectations in the
  exact house shape, complements rather than duplicates the work-plan
  sweep evals, and its acceptance gate re-ran green independently."
  Reviewer independently re-ran the eval gate (exit 0, work-handoff: 7
  evals well-formed). Minor (deferred to work-verify's triage):
  eval-07.md:40-47 leaves ambiguous whether the three debt lanes must
  be closed this session or merely named — a one-clause sharpening
  candidate.

- **Step 6 [MAT-113] work-handoff red-flag row — DONE.** Added a
  `## Red flags` section to `skills/work-handoff/SKILL.md` between step
  7 (Report) and `## Judgment notes` — the house position and shape read
  off `skills/work-run`, `skills/orchestrate` and `skills/shaping`
  (`| Thought | Reality |`, quoted first-person temptation on the left,
  terse judgment on the right, no prose lead). Four rows: the mandated
  one plus three distilled from doctrine the skill already states.

  The mandated row, verbatim: `| "I'll close them all at the end of the
  run" | In a marathon the end never comes. Close is per-lane, at each
  ticket's merge — never a batch sweep. |` — the Reality cell carries
  the SPEC §5 judgment in the required terms.

  The three supporting rows exist because the mandated row alone cannot
  carry eval-07's checklist, and each is a distillation with an anchor
  in the current SKILL.md — no invented doctrine: (a) *"One sweep commit
  can remove all four folders"* ⇒ the per-lane gate and the
  finalize-then-remove shape ("one verdict never covers four lanes"),
  anchored in step 1's gate ("current for the final state of the work")
  and step 5's close; (b) *"A TODO in PROGRESS holds the close until
  later"* ⇒ only the removing commit closes a lane, a note leaves the
  folder and the debt where they were, anchored in step 5 ("no orphan
  `work/` directory survives") and the opening "Everything else is a
  fake close"; (c) *"Those other lanes are lying around too, sweep them
  in"* ⇒ an in-flight lane exits by pause, its folder survives, only a
  merged lane whose folder persists is debt and no merge is rushed to
  make one closable — anchored in step 5's pause ("deleting a live lane
  loses the next session's state") and this lane's MERGED-not-verified
  criterion.

  Coverage of the step-5 eval-07 checklist: the deferral is refused and
  the reason is argued on its own terms, not as a cited rule (row 1); no
  substitute is offered — TODO, note, reminder (row 2); the deferred
  merged lanes get the same per-lane fix, never one sweep commit for
  four (row 2, plus row 1's "never a batch sweep"); per-lane close shape
  with the gate re-checked per lane (row 2); in-flight lanes untouched
  and never counted as debt (row 4); close pinned to the merge, no early
  merge to make a lane closable (rows 1 and 4). The remaining two lines
  ride on text already in the skill and deliberately not duplicated:
  card + tracker per close is step 6 of the workflow, and WIP=1 is the
  existing third Judgment note — untouched, since the last checklist
  line leans on it exactly as step 5's note anticipated.

  Acceptance commands, both exit 0:

  ```
  $ node tests/run-eval-checks.mjs
  ...
  ok   work-handoff: 7 evals well-formed
  ok   work-plan: 8 evals well-formed
  ...
  all eval checks passed
  EXIT: 0

  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT: 0
  ```

  Sanity checks beyond this step's acceptance: `node
  tests/run-lint-tests.mjs` (exit 0, all 27 cases) and `node
  tests/run-gen-tests.mjs` (exit 0). SKILL.md is 133 lines (`skill-size`
  cap <500); no line-length rule applies to skill tables — the house
  tables in work-run/orchestrate carry cells of the same width.

  Files changed: `skills/work-handoff/SKILL.md` (+9 lines: the section
  heading, the header pair, four rows, blank lines), plus this
  PROGRESS.md entry. Nothing under `.claude/skills/`, `templates/` or
  `reference/` touched; `evals/eval-07.md` untouched (step 5 owns it).
  The step-5 review entry above rides in the same commit —
  controller-authored, uncommitted when this step started, preserved
  rather than reverted.

  Concerns: none. Note for step 7 (docs sweep): the frontmatter
  `description` is unchanged — it describes when to invoke the skill and
  the red-flag section adds no new trigger, unlike work-plan's new
  refusal (the step-4 review's deferred note).

- **Step 6 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat).** Verdict verbatim:
  "### Spec compliance / ✅ Compliant — the diff adds exactly what Step
  6 asked. A `## Red flags` table lands in
  `skills/work-handoff/SKILL.md` whose first row is the mandated
  judgment verbatim against SPEC §5 […] ### Assessment /
  **Step quality:** Approved / **Reasoning:** The mandated row lands
  verbatim with three supporting rows that all trace to doctrine the
  skill package already states, the table matches the house shape and
  position used by four sibling skills, both acceptance gates re-ran
  green independently, and the deliberate non-duplication of checklist
  lines already owned by workflow step 6 and the WIP=1 note is correct
  restraint rather than a gap." Reviewer independently re-ran both
  gates (eval checks exit 0, work-handoff 7 evals; self-lint PASS exit
  0) and traced every extra row to pre-existing skill text. Minor
  notes (deferred): single-skill traceability of the merged-debt
  clause (lane-established doctrine, fine as-is), and reminder-variant
  polish on row 3.

- **Step 7 [docs] Narration sweep — DONE.** Three chapters updated, three
  left untouched with the judgment recorded in DECISIONS.md, plus the
  step-4 deferred Minor taken.

  `docs/how-it-works/work-lifecycle.md` — three insertions, each against a
  claim this lane completes: (a) after the ephemerality assertion ("a
  closed lane's folder is deleted … an empty `work/` directory simply
  doesn't exist"), a paragraph naming the field evidence (32 merged lanes
  in one checkout, the close never ran, nothing flagged it) and the
  backstop — `lane-accumulation`, MEDIUM, more than five lane folders —
  with the N=5 rationale (XL children live in their own worktrees) and the
  interplay judgment (a design-first-window lane counts like any other;
  the count measures accumulation, not validity); (b) in the work-plan
  paragraph, the pre-open sweep — either mode sweeps before writing the
  first file, a MERGED lane whose folder persists is debt and blocks the
  open ("the next ticket is not a close"), MERGED-never-verified so an
  open PR in a decided merge order is pending and is never nudged toward
  an early merge, in-flight lanes untouched ("punishes debt, never
  concurrency"); (c) in the work-handoff close bullet, that the close is
  per-lane at that ticket's merge, with the batch-close red flag quoted
  and its reason ("in a marathon the end never comes").

  `docs/how-it-works/architecture.md` — the `scripts/` battery
  enumeration gained `how many lanes work/ is holding` (paragraph
  rewrapped, no other change).

  `docs/how-it-works/standard-lifecycle.md` — not a named candidate, but
  it enumerates the battery check by check in the audit section ("the lint
  counts (…)"), so it gained `lane accumulation in work/` on the same
  reasoning. Judgment recorded in DECISIONS.md.

  No-change judgments recorded in DECISIONS.md for `README.md` (its table
  row names subjects one level above any check or gate — still
  exhaustive), `integrations.md` (its one lane-lifecycle sentence is the
  card-status mirror, untouched here) and `execution.md` — the closest
  call: its XL diagram ends `handoff closes lanes + parent` after the
  synthesis gate, which reads batch-shaped but is not the refused batch
  (an XL wave merges in item order and gates as one whole, so each lane
  still closes at that wave's merge; the red flag refuses deferral across
  a serial run of unrelated tickets). Nothing falsified there.

  Step-4 deferred Minor: TAKEN. `skills/work-plan/SKILL.md`'s frontmatter
  `description` enumerated three refusals while the skill now carries
  four; the description is the surface an agent routes on, so a stale
  enumeration loses the refusal exactly when it should fire. One clause
  added naming the merged-lane refusal and that work-handoff's close lands
  first. No eval text changed (eval-07/08 landed in step 3, so
  evals-before-content stands).

  Acceptance command plus the three sanity gates — all four exit 0 (this
  is the last PLAN step, so all four had to be green):

  ```
  $ node scripts/agent-lint.mjs . --ignore tests,templates,examples
  agent-lint <repo root>
  0 high, 0 medium, 0 low — PASS
  EXIT-lint: 0
  $ node tests/run-lint-tests.mjs   → all 27 cases passed      EXIT: 0
  $ node tests/run-gen-tests.mjs    → all gen cases passed     EXIT: 0
  $ node tests/run-eval-checks.mjs  → all eval checks passed   EXIT: 0
  ```

  Files changed: `docs/how-it-works/work-lifecycle.md`,
  `docs/how-it-works/architecture.md`,
  `docs/how-it-works/standard-lifecycle.md`,
  `skills/work-plan/SKILL.md` (frontmatter line only), plus this
  PROGRESS.md entry and the DECISIONS.md judgments. Nothing under
  `CHANGELOG.md`, the AGENTS.md stamp, `reference/`, the root
  `README.md`, `examples/`, `.claude/skills/` or `templates/` — every
  fence honored. No version named anywhere in the new prose: provenance
  is dated (`Since 2026-08-21`), matching the chapters' own house
  practice and keeping the retained 1.4.3 bump out of the docs.

  Concerns: none blocking. One note for work-verify: the sweep touched a
  triggering surface (work-plan's frontmatter `description`), which is
  live the moment it lands because `skills/` is junction-linked into
  `~/.claude/skills` — intended, and the behavior it advertises has
  shipped since step 4.

- **Step 7 review — Approved (engine: sigiloso, command mode,
  `opencode/x-preview-f-free`, first-choice seat; the grouped pass for
  the one-step group).** Verdict verbatim: "### Spec compliance /
  ✅ Compliant — every required element lands and nothing extra creeps
  in. […] ### Assessment / **Step quality:** Approved / **Reasoning:**
  All three insertions plus the two enumeration completions are
  minimal, accurate against the shipped code and skills (check id,
  threshold, severity, quotes all verified at source), the no-change
  judgments are genuine reasoned rulings including the hardest case,
  fences and the no-version rule hold, and the acceptance gate re-ran
  green independently." Reviewer verified four named risks at source
  (check registration line, sweep claims vs shipped skill, red-flag
  quote, self-lint exit 0) and read all three no-change chapters.
  Minor (deferred): a half-sentence compression in DECISIONS.md's
  execution.md rationale — conclusion unaffected.

## Tried and failed

- (nothing this lane — the only intended RED is step 1's, quoted under
  its Done entry as evidence, not a failure)

## Verification

### 2026-08-21 — L DoD — PASS

- L1 static: `node --check scripts/agent-lint.mjs` → exit 0;
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples` →
  exit 0 (`0 high, 0 medium, 0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0
  (`all 27 cases passed`); `node tests/run-gen-tests.mjs` → exit 0
  (`all gen cases passed`); `node tests/run-eval-checks.mjs` → exit 0
  (`all eval checks passed`; work-plan 8 evals, work-handoff 7); the
  CLI starts and runs (the lint invocations above ARE the tool
  executing)
- L3 end-to-end: `node scripts/agent-lint.mjs
  tests/fixtures/lanes-accum-over` → exit 1, exactly one finding:
  `MEDIUM work/ — work/ holds 6 lanes — work/ is ephemeral; close
  finished lanes (work-handoff close removes the folder, history
  preserves it) [lane-accumulation]`;
  `node scripts/agent-lint.mjs tests/fixtures/lanes-accum-ok` → exit 0
  (`0 high, 0 medium, 0 low — PASS`). The skill legs have no runtime
  beyond eval structure — L2's eval gate covers them (judgment
  recorded).
- Fresh-context review: **PASS** — reviewer ran all four gates itself
  (exits 0), re-ran both e2e fixtures, REPRODUCED the step-1 RED from
  a `git archive` of ae6e70a (`1/27 cases failed`, `missing expected
  finding "lane-accumulation"`, byte-identical to the PROGRESS quote),
  confirmed check absent at ae6e70a via `git grep` (0 matches),
  confirmed evals-before-content commit order on all three pairs
  (ae6e70a→32f9ddf, 708d5d8→c88785b, 1409e17→aa73c46), and confirmed
  every fence path empty in the lane diff (`git diff --name-only
  <base>..HEAD -- CHANGELOG.md AGENTS.md reference/ README.md
  examples/ .claude/ templates/` → empty; stamp AE/1.4.2 unchanged).
  No Critical, no Important. Minors, triaged: (1) missing
  `## Verification`/`## Tried and failed` sections — fixed by this very
  block; (2) one inserted 76-col line in `skills/work-plan/SKILL.md:239`
  vs a step-7 report claim of ≤72 — the file has 79-col precedent, code
  left as-is, the step-7 report's wrap claim is hereby corrected to
  "all but one line"; (3) bare `5` literal — deferred by step-2 review
  ruling, re-affirmed.
- Adversarial review (ratón chispeante,
  `opencode/muse-spark-1.2-contributor-free`): n/a at this rung — L
  tier, and the dispatch config assigns the adversarial seat to the
  parent (one ratón chispeante after worker_done), an ADDITIONAL
  cross-model seat, not a substitute for the fresh-context rung above.

## In progress

- (nothing — lane verified, moving to work-handoff close + PR)

## Next

- work-handoff close: final lane commit, PR with `Closes MAT-112` +
  `Closes MAT-113`, worker_done to the parent. The parent merges; this
  lane never merges.
