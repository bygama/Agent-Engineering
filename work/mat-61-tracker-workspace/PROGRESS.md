---
issue: MAT-61
---
# Repo declares its tracker workspace — progress

## Done

- SPEC.md written from the parent's shaped design and approved (blocking
  ask, ruling recorded in DECISIONS.md).
- PLAN.md shaped: 6 steps, evals before content, split commits.
- Step 1 DONE — evals for the tracker declaration, written before any skill
  content. New `skills/ae-init/evals/eval-05.md`: fresh install in a
  tracker-connected Orca/Linear workspace where the session's LIVE binding
  resolves to the WRONG workspace (`acme`) while the repo tracks in
  `bygama` / team `MAT` / project `Agent-Engineering`. It grades the
  question asked exactly once and only because a tracker is in play, the
  live binding never used as the answer (the named regression), "none"
  accepted with no line and nothing else changed, the declaration line
  landing directly under the `Standard: AE/<version>` stamp above the
  summary in the canonical format, the `· project <project>` segment
  omitted when the repo has none, the line written in English, one line
  and nothing more, the existing prompt-template reminder still firing,
  and the rest of the fresh-install contract unchanged. Second run in the
  same fixture covers the "none" branch. `skills/ae-init/evals/eval-01.md`
  gains one checklist line guarding the negative case (no tracker in play
  → no tracker question, no `Tracker:` line), placed with the interview
  items. Format follows the house 3-section shape (eval-04 precedent, plus
  eval-05-of-work-handoff's origin-failure preamble).
  Acceptance: `node tests/run-eval-checks.mjs` → `ok   ae-init: 5 evals
  well-formed` … `all eval checks passed`, exit 0. Also ran the self-lint
  (`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0) since evals are inside the
  linted tree. Files changed: `skills/ae-init/evals/eval-05.md` (new),
  `skills/ae-init/evals/eval-01.md`. No concerns: the eval names the
  canonical format literally once (the fixture's concrete values) and
  otherwise cites `reference/tracker.md`, so step 2 stays the single source
  of truth for the format.

- Step 2 DONE — `reference/tracker.md` gains "Which workspace — the repo
  declares, tools obey", placed after "Connector: Orca CLI" and directly
  before "Without Orca" so the two "no write, emit the operation instead"
  contracts sit adjacent and the cited pattern is one paragraph away. The
  section carries: the origin failure in one sentence (per-workspace tool
  bindings), the canonical line in a fenced block
  (`Tracker: Linear — workspace <workspace> · team <KEY> · project
  <project>`) with placement (always-loaded, directly under the `Standard:
  AE/<version>` stamp, above the summary), `<workspace>` defined as the
  URL slug, the `· project <project>` segment omitted when the repo has
  none, ae-init as the writer (asked once, never inferred from the live
  session), and an explicit "cite this section, never restate it" so
  steps 3/5/6 have one source of truth. Then the respect rule: before ANY
  tracker write (status move, comment, attachment, issue create) compare
  live binding vs declaration; mismatch → NO write, state it (declared /
  resolved / tracker NOT updated) + emit the exact command + payload for
  the operator, named as the same pattern as the no-Orca contract; no
  declaration line → rule inert, pre-declaration repos unchanged.
  Live-binding facts verified on-machine before writing (dated in the
  text): `orca linear issue MAT-61 --json` → `meta.resolved.workspaceName`
  = "Mateo Garcia" / `workspaceId`; `orca linear list --filter assigned
  --limit 1 --json` → a `workspace` object per row; the resolved URL is
  `https://linear.app/bygama/issue/MAT-61/…`. That surfaced a precision
  worth encoding: `workspaceName` is the DISPLAY name ("Mateo Garcia") and
  does not equal the slug (`bygama`) the declaration names — so the rule
  says compare slugs, otherwise a correct binding reads as a mismatch.
  Acceptance: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
  exit 0. Also ran the other three gates green (lint self-tests, gen
  self-tests, eval-structure suite — all exit 0). Files changed:
  `reference/tracker.md` only. Consistent with step 1's eval-05, which
  grades exactly this format, placement and the "never guess from the live
  binding" regression. No concerns.

- Step 1 review: ✅ spec-compliant, Approved (fresh reviewer, sonnet).
  Two Minor findings deferred to work-verify triage: (a) eval-05's
  format bullet partially restates the canonical structure it cites from
  `reference/tracker.md` — could trim to the citation alone; (b) eval-05's
  fixture never states explicitly that the owner's answer IS the ground
  truth values (inferable from Expected behavior).

- Step 2 review: ✅ spec-compliant, Approved (fresh reviewer, opus; gate
  reproduced independently, exit 0; JSON-shape claims re-verified
  on-machine). Five Minor findings deferred to work-verify triage:
  (1) resolution bullet leads with the non-comparable display-name
  fields before the slug — reorder to lead with the `url` slug and name
  the `workspace.name` trap explicitly; (2) JSON path imprecise — say
  `result.meta.resolved`, not `meta.resolved`; (3) trailing simile on the
  inertness bullet is padding — drop it; (4) coverage gap: no named slug
  resolution when the workspace has no issues yet ("issue create" on an
  empty workspace) — treat an unresolved binding like a mismatch;
  (5) standing note: eval-05's partial format restatement (step 1 minor
  (a)) needs a deliberate ruling at verify, not a silent trim.

- Step 3 DONE — `skills/ae-init/SKILL.md` gains the tracker layer in the two
  named steps. Step 3 (gotcha interview): a new paragraph right after the
  artifacts-language default, framed explicitly as its contrast — unlike
  language, the tracker workspace IS a real question. Asked once, settled
  for the repo, gated on a tracker being in play (step 1's exploration or
  the workspace's own signals showing Linear connected); asks workspace /
  team key / project; accepts "none"; never infers the answer from the
  session's live binding, with the reason stated (the binding is exactly
  what can be wrong) and cited to `reference/tracker.md`. Step 6
  (instantiate): the `AGENTS.md` bullet gains a clause — when step 3 named a
  workspace, the declaration line lands directly under the version stamp,
  in the canonical format defined in `reference/tracker.md` (cited, not
  restated); answer "none" writes no line. The existing tracker-connected
  reminder about the coding-tools prompt template (end of step 6) was left
  untouched — it still fires independently of the new declaration line, per
  eval-05's checklist.
  Acceptance: `node tests/run-eval-checks.mjs` → `ok   ae-init: 5 evals
  well-formed` … `all eval checks passed`, exit 0. `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  `0 high, 0 medium, 0 low — PASS`, exit 0. Files changed:
  `skills/ae-init/SKILL.md` only. No concerns: both new passages cite
  `reference/tracker.md` for the format rather than restating it, matching
  step 2's single-source-of-truth design.

- Step 3 review: ✅ spec-compliant, Approved (fresh reviewer, sonnet; both
  gates re-run independently, exit 0; every eval-05/eval-01 graded
  behavior confirmed instructed, citation-not-restatement discipline
  held, prompt-template reminder untouched). No findings at any severity.

- Step 4 DONE — `skills/work-handoff/evals/eval-03.md` gains one checklist
  line (before "Posts the evidence summary" item, with tracker-call checks)
  verifying the live binding's workspace slug against the repo's Tracker:
  declaration before any tracker write — cites reference/tracker.md "Which
  workspace — the repo declares, tools obey" (the single source of truth
  for the format). Checklist item grades the contract: mismatch → NO write,
  state it plainly, emit the operation for the operator.
  Acceptance: `node tests/run-eval-checks.mjs` → `ok   work-handoff: 6
  evals well-formed` … `all eval checks passed`, exit 0. Files changed:
  `skills/work-handoff/evals/eval-03.md` only. No concerns: the item cites
  the rule section rather than restating it, maintaining single-source-of-
  truth discipline across step 4 and the prior steps.

- Step 5 DONE — `skills/work-handoff/SKILL.md` step 6 gains one sentence
  right before the close/pause tracker command bullets, after the "It runs
  strictly AFTER the repo side is clean" paragraph. The sentence cites the
  workspace binding verification requirement (reference/tracker.md, "Which
  workspace — the repo declares, tools obey") and states the mismatch
  consequence (write prevented). Worded to match surrounding voice and
  line-wrap discipline (75-78 columns).
  Acceptance: `node scripts/agent-lint.mjs . --ignore tests,templates,
  global,examples` → `0 high, 0 medium, 0 low — PASS`, exit 0. Files
  changed: `skills/work-handoff/SKILL.md` only. No concerns: the sentence
  cites rather than restates, preserving the single source of truth in
  reference/tracker.md.

- Step 6 DONE — `docs/how-it-works/integrations.md` Orca ↔ Linear section
  gains one sentence after the "automations as intake readers" bullet,
  before the "Orca ↔ GitHub" section. The sentence describes the binding
  verification requirement (live workspace vs. repo declaration, per
  reference/tracker.md "Which workspace — the repo declares, tools obey")
  and its consequence (mismatch prevents write). Worded for consistency
  with the surrounding chapter voice and column wrap.
  Acceptance: `node scripts/agent-lint.mjs . --ignore tests,templates,
  global,examples` → `0 high, 0 medium, 0 low — PASS`, exit 0. Files
  changed: `docs/how-it-works/integrations.md` only. No concerns: the
  sentence cites the authority document rather than repeating its rules,
  maintaining consistency with steps 4 and 5.

- Batch final gates (all three steps committed and gated):
  `node tests/run-eval-checks.mjs` → `all eval checks passed`, exit 0.
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,
  examples` → `0 high, 0 medium, 0 low — PASS`, exit 0.
  Commits: f878898 (step 4), f679e79 (step 5), e33ac30 (step 6).
  Fixed: corrected step 6 hash (e33ac30 is the amended commit) and removed
  duplicate heading in PROGRESS.md structure; lint gate re-run: exit 0.

- Steps 4-6 review: ✅ spec-compliant all three (fresh reviewer, sonnet);
  quality verdict Needs fixes on two Important bookkeeping defects in
  PROGRESS.md (wrong step-6 hash `44c0d86`, duplicate `## Tried and
  failed` heading). Fix round 1: same implementer resumed, fix commit
  `8c34e4c`; scoped re-review verdicts both findings ADDRESSED, no new
  breakage — round closed, batch Approved. One Minor deferred to
  work-verify triage: capitalization drift on "before ANY tracker write"
  (source and eval-03 capitalize ANY; SKILL.md and integrations.md use
  lowercase "any") — cosmetic.

- Polish commit DONE — applied the work-verify triage ruling (DECISIONS.md,
  2026-08-18) as one commit, exactly the six FIX items: (a) `reference/
  tracker.md`'s resolution bullet reordered to lead with the workspace slug
  in a resolved issue's `url`, then names the `result.meta.resolved.
  workspaceName` / list-row `workspace.name` display-name trap explicitly,
  keeping the on-machine verification date; (b) JSON path corrected to
  `result.meta.resolved` throughout; (c) trailing simile dropped from the
  inertness bullet ("Absence degrades cleanly." only); (d) empty-workspace
  gap closed — an unresolved binding (no issue to read, fresh/empty
  workspace, or an erroring read) now gets the same treatment as a
  mismatch (no write, state it, emit the operation), folded into the
  Mismatch bullet as one added sentence; (e) `skills/ae-init/evals/
  eval-05.md` Fixture section now states explicitly that the owner's
  answer, not the live binding, is the fixture's ground truth (`bygama` /
  `MAT` / `Agent-Engineering`); (f) the abstract format-structure bullet
  trimmed to the citation ("matches the canonical format of
  `reference/tracker.md`'s declaration section, not reinvented per repo"),
  the earlier bullet with the concrete instantiated `Tracker:` line left
  untouched. Capitalization drift ("ANY") left as-is per the triage's
  explicit ACCEPT ruling. No other sections, SKILL.md files,
  integrations.md, templates, or CHANGELOG touched.
  Acceptance: `node tests/run-eval-checks.mjs` → `all eval checks passed`,
  exit 0. `node scripts/agent-lint.mjs . --ignore tests,templates,global,
  examples` → `0 high, 0 medium, 0 low — PASS`, exit 0. Files changed:
  `reference/tracker.md`, `skills/ae-init/evals/eval-05.md`.

## In progress

## Tried and failed

## Next

- work-verify; PR; handoff.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
