# orchestrate polish batch — progress

Lane: work/mat-58-orchestrate-polish/ · Issue: MAT-58 · Branch:
bygama/mat-58-orchestrate-polish

Status: CLOSED (verified PASS) — PR open, awaiting the parent's
review wave (1 ballena agreed at dispatch). The lane folder is
retained on the branch so the reviewer can read
SPEC/PLAN/DECISIONS/PROGRESS from the checkout; the
finalize-then-remove commit lands when the lane goes terminal
(post-verdict/merge), per the mat-60 precedent.

## Done

### Step 1 — orchestrate evals extended for the seven polish items (2026-08-18)

Extended `skills/orchestrate/evals/eval-01.md`, `eval-03.md`, `eval-04.md`
to grade the SPEC's items 1, 3-8 before any content change lands (evals-
before-content). New checklist lines inserted at their natural point in
each eval's existing flow, matching house voice (terse, code-spanned
literal commands, em-dash asides):

- **eval-01** (+3 lines): the child-seat default (`--agent claude`) not
  growing the dispatch dialogue into a second question; the birth
  command's `--agent claude` citing `# reference/runners.md`; the filled
  `dispatch-child.md` spec carrying the standing mailbox-check
  instruction (`orca orchestration check` at every phase transition and
  before `worker_done`).
- **eval-03** (+5 lines): per-seat `<slug>-review-<seat>` worktree
  naming on the ballena's two-step launch; confirming-then-closing an
  unused fallback startup shell from that launch; `--worktree` present
  alongside `--terminal` on the fix-loop's `worker-start --terminal`
  reassignment; the re-review's literal `worker-retain --dispatch <id>`
  plus `--worktree` on its `worker-start --terminal`; feature-list rows
  flipping to passing only from the merged tree after the last of the
  three merges.
- **eval-04** (+2 lines): the fallback emitting the full ready-to-run
  protocol (spawn commands, lane list, order) with execution declared
  NOT done when a requested runner isn't installed, rather than silently
  substituting or simulating; lanes closing via `work-handoff` after the
  fallback's review pass and synthesis gate.

No SKILL.md, references/, or dispatch-child.md edits — scope held to
`skills/orchestrate/evals/` only, per the step's fence (that content
lands in step 2).

**Acceptance:** `node tests/run-eval-checks.mjs` → exit 0 ("all eval
checks passed", orchestrate: 4 evals well-formed).
Also sanity-checked (not the step's required gate but cheap to run):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS").

**Files changed:** `skills/orchestrate/evals/eval-01.md`,
`skills/orchestrate/evals/eval-03.md`,
`skills/orchestrate/evals/eval-04.md` (41 insertions, 1 deletion; commit
contains only these three files).

**Commit:** `3e30c15` — `test(orchestrate): grade seven polish items in
evals before content`

**Step review:** ✅ Compliant · Approved — no findings at any severity
(fresh-context step reviewer, sonnet).

**Concerns:** none. One judgment call worth flagging: eval-03's fixture
picks "1 ballena" (N=1) for this lane, so the per-seat-naming line is
phrased to hold for the concrete N=1 case (`<slug>-review-r1`) while
stating the N>1 collision-avoidance rationale generically, rather than
changing the fixture to N>1 (out of scope for this step — fixtures
weren't asked to change).

### Step 2 — orchestrate SKILL.md + dispatch-child.md content (2026-08-18)

Wrote the content the step-1 eval lines grade, matching each graded
literal exactly:

- **SKILL.md step 4** (birth command): appended `# reference/runners.md`
  after the `--agent claude` line's `--json` (mirrors the citation style
  already used on the review launch's opencode line).
- **SKILL.md step 6 launch block** (item 1 + item 6 + item 8): worktree
  name is now `<slug>-review-<seat>` with a new sentence explaining
  `<seat>` numbers `r1`, `r2`, … for N>1 reviewers; a new closing
  sentence covers the unused fallback startup shell — confirm unused,
  then close it, citing `reference/orca.md`.
- **SKILL.md fix-loop block**: `worker-start --task <fix_task_id>
  --terminal <handle>` gained `--worktree <selector>`.
- **SKILL.md re-review prose**: "retain its terminal at the verdict" →
  "retain its terminal at the verdict with `worker-retain --dispatch
  <id>`" (literal, not paraphrase); its `worker-start --terminal` gained
  `--worktree <selector>`; the "cutting a fresh ... worktree per round"
  clause now reads `<slug>-review-<seat>`.
- **SKILL.md step 7**: new clause — feature-list rows flip to passing
  only from the merged tree after the rerun, never from an isolated lane
  branch.
- **SKILL.md step 8**: `<slug>-review` → `<slug>-review-<seat>` (coherent
  with the launch-block suffix).
- **SKILL.md fallback step 4**: new clause — a requested runner not
  installed is never silently swapped; the fallback emits the full
  ready-to-run protocol (exact spawn commands, lane list, execution
  order) and declares execution explicitly NOT done.
- **SKILL.md fallback step 5**: new sentence — each lane still closes via
  `work-handoff` after the synthesis gate.
- **dispatch-child.md**: new `## Mailbox discipline` section (between
  `## Questions` and `## Reporting done`) — run `orca orchestration
  check` at every phase transition (investigate → implement → review →
  verify) and once more before reporting `worker_done`.

No eval edits, no `reference/runners.md` edit (that is step 3) — scope
held to the two files named in the step, per the fence.

**Acceptance:**
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS").
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed",
orchestrate: 4 evals well-formed).

**Files changed:** `skills/orchestrate/SKILL.md`,
`skills/orchestrate/references/dispatch-child.md` (37 insertions, 16
deletions; commit contains only these two files).

**Commit:** `aa26fc5` — `fix(orchestrate): close fallback shell, cite
runners, per-seat review worktrees, merged-tree flip, fallback
protocol/handoff`

**Concerns:** none. `reference/runners.md` does not yet carry the
child-seat convention section (that's step 3) — the step 4 birth
command's `# reference/runners.md` citation currently points at a file
that doesn't yet document `--agent claude` explicitly; this resolves
once step 3 lands, per the plan's evals-before-content /
step-ordering.

**Step review:** ✅ Compliant · Approved — every graded eval literal
verified present; 2 Minor findings deferred (below); reviewer also
verified the how-it-works constraint is discharged by alignment, not
edit (execution.md:292 already encodes items 4/5) (fresh-context step
reviewer, opus).

### Step 3 — reference/runners.md: opencode forms + child-seat convention (2026-08-18)

Edited only `reference/runners.md`, per the step's fence:

- **Opencode row (item 2/7 groundwork)**: table's `Headless spawn` cell
  gained an em-dash aside — `— one-shot prompts` — right after the
  headless command, then a new paragraph beside the table (before the
  existing "Verify on install" paragraph) spells out both invocation
  forms explicitly: the table's headless `opencode run -m
  <provider/model> "<prompt>"` for one-shot prompts (child dispatch,
  fan-out worker) versus the bare TUI `opencode -m <provider/model>` —
  no `run`, no prompt argument — that orchestrate's reviewer seat
  launches, waits on with `terminal wait --for tui-idle`, then attaches
  via `worker-start --terminal`.
- **New `## The child seat` section**, placed directly after `## The
  adversarial seat` (the two seats read as a pair) and before `##
  Orchestrating across runners`: names the "standing convention" (the
  exact term eval-01 grades in SKILL.md's citation) — default `--agent
  claude`, same family as the parent, not the cross-family check (that's
  the adversarial seat above it); per-dispatch override via `--agent`,
  `--model`, `--effort` only with a concrete reason recorded at dispatch,
  never a silent swap; explicitly states the default needs no owner
  input and does not grow the dispatch dialogue past its one question.

This is what SKILL.md step 4's `--agent claude   # reference/runners.md`
citation (already landed in step 2) now actually points at — that
citation previously named a file that didn't yet document the
convention; it does now.

No SKILL.md, dispatch-child.md, or eval edits — scope held to
`reference/runners.md` only, per the step's fence.

**Acceptance:**
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS").
Also sanity-checked (not the step's required gate but cheap to run):
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed",
orchestrate: 4 evals well-formed — unaffected, as expected, since this
step touches no eval file).

**Files changed:** `reference/runners.md` (23 insertions, 1 deletion;
commit contains only this file).

**Commit:** `0338450` — `docs(runners): label both opencode forms, add
the child-seat convention`

**Concerns:** none. `--effort` is not otherwise documented as a
`worker-start` flag anywhere else in this repo yet (only `--agent` and
`--model` appear in `dispatch-child.md` and SKILL.md); PLAN step 3 names
it explicitly (`--agent/--model/--effort`) so it is documented here per
the PLAN's literal wording — not independently verified against the CLI
by this step (out of this step's scope; SPEC doesn't ask for a CLI
verification pass here).

### Step 4 — using-ae eval-04 gains red-flag row role-split checklist line (2026-08-18)

Extended `skills/using-ae/evals/eval-04.md` to grade the SPEC's using-ae
cosmetic item before any content change lands (evals-before-content):

- **eval-04** (+1 checklist line): grades that the SKILL.md red-flags
  table's "I'll just execute this inline" row's Reality cell states the
  role-split — M+ never inline: parent routes to orchestrate, work-run
  executes within a lane — not the old work-run-only wording.

No SKILL.md edits — scope held to `skills/using-ae/evals/eval-04.md`
only, per the step's fence (that content lands in step 5).

**Acceptance:** `node tests/run-eval-checks.mjs` → exit 0 ("all eval
checks passed", using-ae: 4 evals well-formed).

**Files changed:** `skills/using-ae/evals/eval-04.md` (3 insertions;
commit contains only this file).

**Commit:** `9f04cdd` — `test(using-ae): grade red-flag row role-split in
eval-04`

**Concerns:** none.

### Step 5 — using-ae SKILL.md red-flags table rewrite (2026-08-18)

Edited `skills/using-ae/SKILL.md` to rewrite the "I'll just execute this
inline" red-flag row's Reality cell, per the role-rule-consistent wording
graded by step 4's eval addition:

- **Red-flags table Reality cell** (line 58): rewrote from "work-run owns
  M+ lanes wherever subagents exist" to "M+ never inline: parent routes to
  orchestrate, work-run executes within a lane." States the role-split
  explicitly — a Run-bound parent orchestrator routes M+ to orchestrate
  (never inline), and work-run executes the lane within its worktree.

No eval edits — scope held to `skills/using-ae/SKILL.md` only, per the
step's fence.

**Acceptance:**
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS").
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed",
using-ae: 4 evals well-formed).

**Files changed:** `skills/using-ae/SKILL.md` (1 insertion, 1 deletion;
commit contains only this file).

**Commit:** `24e2ff6` — `fix(using-ae): rewrite red-flag row to state M+
role-split explicitly`

**Concerns:** none.

### Step reviews 3-4 (2026-08-18)

Step 3: ✅ Compliant · Approved — 1 Minor deferred (below)
(fresh-context step reviewer, sonnet). Step 4: ✅ Compliant ·
Approved — no findings (fresh-context step reviewer, haiku).

### Step reviews 5-6 (2026-08-18)

Step 5: ✅ Compliant · Approved — cell matches the eval-04 grading
line word-for-word; no findings (fresh-context step reviewer, haiku).
Step 6: ✅ Compliant · Approved — both renames complete, no dangling
`FAN`, mermaid coherent; the SPEC's `<br\>` typo turned out not to
exist (DECISIONS.md correction) so only the renames shipped
(fresh-context step reviewer, haiku).

### Step 7 — full gate sweep (2026-08-18, controller-run verification)

All four gates green on the finished tree (pre-amendment state,
commits 3e30c15..5e6aa82):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS");
`node tests/run-lint-tests.mjs` → exit 0;
`node tests/run-gen-tests.mjs` → exit 0;
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed").

### Owner amendment received (2026-08-18, implement→verify mailbox check)

msg_787407570c20: item 9 joins the batch — browser rule in
dispatch-child.md (Orca embedded browser only, never
Playwright/chrome-devtools/claude-in-chrome from a supervised child).
Ruling recorded in DECISIONS.md; SPEC item 9 and PLAN steps 8-9
added; executing with the same evals-first split.

### Step reviews 8-9 + fix round 1 (2026-08-18)

Step 8: ✅ Compliant · Approved — no findings (fresh-context step
reviewer, haiku). Step 9: ✅ Compliant · Approved with 1 Important
finding — the amendment's browser-command literal (`orca tab
create/…`) mismatched reference/orca.md:53's verified row
(fresh-context step reviewer, sonnet). Escalated to the parent by
blocking ask; ruling (b) recorded in DECISIONS.md. Fix round 1 by the
same implementer: `645f05e` (eval literal, test commit) + `8e1d42d`
(template literal, fix commit), evals-first order held. Scoped
re-review: ADDRESSED, no regressions (haiku). Step 9's Minor
("Concerns: none" phrasing in its own PROGRESS entry) noted as
deferred below.

## Deferred minors

- Step 3 review, Minor: runners.md child-seat "same family as the
  parent orchestrator" is a rationale stated generally while the file's
  own cross-runner section says the parent is runner-agnostic — hedge or
  drop the justification in a later pass.
- Step 2 review, Minor 1: SKILL.md fix-loop `worker-show` comment says
  only `# agent_terminal_handle` while the block now also needs a
  worktree selector — cheapest fix `# agent_terminal_handle + worktree`;
  same implicit-selector gap in the re-review prose.
- Step 2 review, Minor 2: the ballena's initial `worker-start
  --terminal` (launch block) carries no `--worktree` while both
  re-engage examples do — defensible asymmetry (terminal born in that
  worktree), SPEC scopes item 8 to the re-engage lines only; at most a
  half-clause in a later pass, or nothing.
- Lane review, Minor 1: runners.md child-seat override list should
  note `--effort` requires `--model` (per `worker-start --help`) —
  half a clause.
- Lane review, Minor 2: dispatch-child.md Browser discipline splits
  the `orca goto/snapshot/click/wait --json` code span across a line
  break inside the template fence — a free reflow keeps it on one
  line.
- Lane review, Minor 3: duplicate of step 2 Minor 1 (worker-show
  comment), severity confirmed.
- Lane review, Minor 4: this PROGRESS file's step 6 entry sits after
  `## Deferred minors` — section ordering cosmetic, left as-is to
  avoid churning the record.
- Lane review, Minor 5: SPEC.md's "Owner-written; the agent never
  edits this file" banner vs the mid-flight amendment transcriptions
  — provenance chain intact in DECISIONS.md (mailbox msg + verbatim
  ruling); the banner/transcription convention deserves a wording
  pass upstream (templates are out of this lane's fence).

### Step 6 — mechanical cosmetics (2026-08-18)

Renamed "pre-dispatch" to "pre-fan-out" in execution.md, and changed
README.md mermaid node id from `FAN` to `ORC`, per DECISIONS.md
rulings:

- **docs/how-it-works/execution.md:276**: "**three pre-dispatch
  questions**" → "**three pre-fan-out questions**" (align naming to
  majority term across graphs-and-reducers.md, ADR-008, ADR-002, and
  spec).
- **README.md first mermaid block (lines 78-79)**: node id `FAN` →
  `ORC` (two occurrences: its definition on the XL triage edge
  `TR -->|XL|` and the `FAN --> RED` edge; fan-out is dead terminology,
  the node depicts orchestrate).

No other files touched per scope fence.

**Acceptance:**
- `grep -c "pre-dispatch" docs/how-it-works/execution.md` → 0
- `grep -c "FAN" README.md` → 0
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → exit 0 ("0 high, 0 medium, 0 low — PASS")

**Files changed:** `docs/how-it-works/execution.md`, `README.md`
(3 insertions, 3 deletions; commit contains only these two files).

**Commit:** `5e6aa82` — `docs: rename pre-dispatch to pre-fan-out, FAN
node to ORC`

**Concerns:** none.

### Step 8 — orchestrate eval-01 gains browser-rule checklist line (2026-08-18)

Extended `skills/orchestrate/evals/eval-01.md` to grade item 9's
browser rule before any content change lands (evals-before-content):

- **eval-01** (+1 checklist line): grades that the filled
  `dispatch-child.md` spec carries the standing browser rule — browser
  needs go through Orca's embedded browser (`orca tab
  create/goto/snapshot/click/wait --json`), never Playwright,
  chrome-devtools, or claude-in-chrome from a supervised child. Placed
  directly after eval-01's existing mailbox-check line (siblings: both
  standing instructions the filled spec must carry), matching that
  line's voice ("The filled `dispatch-child.md` spec … carries the
  standing … instruction").

No SKILL.md, references/, or dispatch-child.md edits — scope held to
`skills/orchestrate/evals/eval-01.md` only, per the step's fence (that
content lands in step 9).

**Acceptance:** `node tests/run-eval-checks.mjs` → exit 0 ("all eval
checks passed", orchestrate: 4 evals well-formed).

**Files changed:** `skills/orchestrate/evals/eval-01.md` (4 insertions;
commit contains only this file).

**Commit:** `3a6bb0e` — `test(orchestrate): grade child spec browser
rule in eval-01`

**Concerns:** none.

### Step 9 — dispatch-child.md gains the standing browser rule (2026-08-18)

Edited only `skills/orchestrate/references/dispatch-child.md`, per the
step's fence. Added a new `## Browser discipline` section inside the
fenced template body (between `## Mailbox discipline` and `##
Reporting done` — same fence the mailbox instruction lives in, so this
instruction actually ships to the child; anything outside the ``` fence
would not), matching the step-8 eval line's literals exactly:

- **`## Browser discipline`** (new section, siblings with `## Mailbox
  discipline`): browser needs go through Orca's embedded browser —
  `orca tab create/goto/snapshot/click/wait --json` — never Playwright,
  chrome-devtools, or claude-in-chrome from a supervised child session.
  Rationale sentence, matching the section's short `##`-block voice: a
  driven browser is a long-lived process that blocks the card's
  working→idle transition and dies with the session, while Orca's
  browser lives in the app — citing `reference/orca.md` (its
  E2E-surface table row names the built-in browser as the L3 tool for
  web-facing work).

No eval edits, no SKILL.md edits — scope held to
`skills/orchestrate/references/dispatch-child.md` only, per the step's
fence.

**Acceptance:**
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS").
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed";
orchestrate: 4 evals well-formed, along with all other skills'
suites).

**Files changed:** `skills/orchestrate/references/dispatch-child.md`
(9 insertions; commit contains only this file).

**Commit:** `23a6117` — `fix(orchestrate): add browser discipline to
child dispatch template`

**Concerns:** none. The eval line's literal command is `orca tab
create/goto/snapshot/click/wait --json`, while `reference/orca.md`'s
own E2E-surface table row currently reads `orca goto/snapshot/click/wait
--json` (no `tab` segment) — the instruction was written to carry the
step-8 eval's exact literals as directed, and cites the file rather
than quoting its row verbatim; reconciling the two command spellings
(if warranted) is outside this step's fence.

### Full four-gate sweep re-run after step 9 (2026-08-18)

Step 9 re-closes the tree (per PLAN step 9's instruction to rerun the
full sweep). All four gates green on the finished tree, post-step-9:

`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ exit 0 ("0 high, 0 medium, 0 low — PASS");
`node tests/run-lint-tests.mjs` → exit 0;
`node tests/run-gen-tests.mjs` → exit 0;
`node tests/run-eval-checks.mjs` → exit 0 ("all eval checks passed").

### Step 9 fix round 1 — browser-command literal corrected (2026-08-18)

Parent ruling recorded in DECISIONS.md ("Ruling: browser-command
literal (step 9 fix round 1)"): the step-9 reviewer caught that the
owner amendment's command literal `orca tab
create/goto/snapshot/click/wait --json` mismatched
`reference/orca.md:53`'s verified E2E-surface row `orca
goto/snapshot/click/wait --json` — the `tab create/` segment was a
sloppy literal in the amendment, not something orca.md actually
documents. Parent ruled option (b): correct the template + eval
literals to the verified shorter form; no fence extension (orca.md
itself untouched). Applied in two commits, evals-before-content:

1. **`skills/orchestrate/evals/eval-01.md`**: the browser-rule
   checklist line's command literal changed from `orca tab
   create/goto/snapshot/click/wait --json` to `orca
   goto/snapshot/click/wait --json` (dropped the `tab create/`
   segment only; everything else — the parenthetical, the "never
   Playwright, chrome-devtools, or claude-in-chrome from a supervised
   child" clause — unchanged).
   **Acceptance:** `node tests/run-eval-checks.mjs` → exit 0 ("all
   eval checks passed", orchestrate: 4 evals well-formed).
   **Commit:** `645f05e` — `test(orchestrate): correct browser-rule
   literal to verified orca.md form`.

2. **`skills/orchestrate/references/dispatch-child.md`**: the `##
   Browser discipline` section's command literal changed the same
   way, from `orca tab create/goto/snapshot/click/wait --json` to
   `orca goto/snapshot/click/wait --json`; rest of the section
   (rationale sentence, `reference/orca.md` citation, section
   placement inside the fence) unchanged.
   **Acceptance:**
   `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
   → exit 0 ("0 high, 0 medium, 0 low — PASS");
   `node tests/run-eval-checks.mjs` → exit 0 ("all eval checks
   passed").
   **Commit:** `8e1d42d` — `fix(orchestrate): correct browser-rule
   literal to verified orca.md form`.

**Files changed (both commits combined):**
`skills/orchestrate/evals/eval-01.md` (2 insertions, 2 deletions),
`skills/orchestrate/references/dispatch-child.md` (2 insertions, 2
deletions) — each commit contains only its one named file, per the
ruling's scope.

**Concerns:** none — this resolves the concern flagged in the
original step-9 report (the literal-mismatch note above, lines
384-390) exactly as the parent ruled.

## Verification

### 2026-08-18 — M DoD — PASS

- L1 static: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → exit 0 ("0 high, 0 medium, 0 low
  — PASS")
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 ("all 13
  cases passed"); `node tests/run-gen-tests.mjs` → exit 0 ("all gen
  cases passed"); `node tests/run-eval-checks.mjs` → exit 0 ("all
  eval checks passed"; orchestrate + using-ae 4 evals well-formed)
- Step-6 greps: `grep -c "pre-dispatch" docs/how-it-works/execution.md`
  → `0`; `grep -c "FAN" README.md` → `0`
- L3 end-to-end: n/a — documentation/skill content; the four gates
  are the executable surface (recorded as a decision, not a skip)
- Fresh-context review (opus, no shared context, ran the whole DoD
  itself): **PASS** — 10 in-fence files, no semver/CHANGELOG line in
  the diff, test()-before-fix() ordering held in all four rounds,
  mat-61 files untouched, both new dispatch-child.md sections
  verified inside the template fence, corrected browser literal
  verified against reference/orca.md:53. 5 Minor findings, all
  deferred (below). Its CLI verification (`worker-start --help`:
  `--worktree` + `--terminal` composable, `worker-retain` and
  `--effort` real) also resolves step 3's deferred `--effort` doubt.
- Adversarial review (1 ballena, opencode-go/deepseek-v4-flash —
  agreed at dispatch): parent-owned, launches after this lane's
  worker_done; intentionally not run inside the lane.
