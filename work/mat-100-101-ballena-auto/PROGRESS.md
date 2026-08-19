# Progress — mat-100-101-ballena-auto

Lane: MAT-100 + MAT-101 (declared family, one PR closes both).

## Done

- 2026-08-19 — Lane opened. Tickets read (`orca linear issue MAT-100`,
  `MAT-101`). SPEC.md written design-first from the parent's dispatch
  design; parent approved as written (ruling in DECISIONS.md). PLAN.md
  shaped: 5 steps, evals-before-content as step 1.
- 2026-08-19 — Step 1 DONE (evals first, orchestrate).
  `skills/orchestrate/evals/eval-03.md` gained three assertions before
  any SKILL.md content edit: (a) the ballena two-step launch carries
  `--auto` on both invocation forms — the Go default `opencode -m
  opencode-go/deepseek-v4-flash --auto` and the no-auth fallback
  `opencode -m opencode/deepseek-v4-flash-free --auto` — with the
  read-only-seat rationale (safe here only because the filled
  `reviewer.md` forbids commit/push/merge and any file edit; a WRITING
  seat would be a different decision, said explicitly); (b) the
  review-seat stall clock — observed normal 20-45 min, 75+ min with an
  empty orchestration transcript and `latestCursor: 0` is a stall,
  never a slow review — recovery `worker-stop` → remove the review
  worktree → `task-update --status ready` → fresh seat; (c) the
  existing fallback-shell-close assertion now names the actual closing
  command in place (`orca terminal close --terminal <handle>`) instead
  of only citing `reference/orca.md`, per DECISIONS' second ruling. No
  SKILL.md, reference/, or docs/ file touched — eval file only, per
  step scope. Acceptance: `node tests/run-eval-checks.mjs` → exit 0,
  `ok   orchestrate: 5 evals well-formed`; `grep -c -e '--auto'
  skills/orchestrate/evals/eval-03.md` → 3 (≥ 1 required). Also ran
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → 0 high, 0 medium, 0 low, PASS (sanity check, not this step's gate).

- 2026-08-19 — Step 1 review (fresh in-session reviewer, sonnet),
  verdict verbatim:
  > ### Spec compliance
  > ✅ Compliant
  > […] All three requested eval assertions are present and correctly
  > worded […] I ran the acceptance commands myself […]
  > `node tests/run-eval-checks.mjs` → exit 0, `ok orchestrate: 5
  > evals well-formed`. `grep -c -e '--auto'
  > skills/orchestrate/evals/eval-03.md` → 3 (≥ 1 required).
  > ### Issues
  > None found at Critical, Important, or Minor severity.
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** All three requested eval assertions are present,
  > accurately worded against SPEC/PLAN/DECISIONS, correctly scoped to
  > the eval file only, and independently verified against both stated
  > acceptance commands (exit 0, grep count 3 ≥ 1).

- 2026-08-19 — Step 2 DONE. `reference/runners.md`'s reviewer-seat prose
  (the "opencode has two invocation forms" paragraph, TUI-form sentence)
  now shows both ballena launch commands with `--auto` — the Go default
  `opencode -m opencode-go/deepseek-v4-flash --auto` and the no-auth
  fallback `opencode -m opencode/deepseek-v4-flash-free --auto` — in
  place of the old generic `<provider/model>` placeholder. A new
  paragraph immediately after states `--auto` is required on both forms
  (not a tip), the one-line reason verified on this machine 2026-08-19
  (auto-approves permissions not explicitly denied; without it the
  reviewer hangs at a permission prompt nobody watches — the 78-minute
  live MAT-91 stall, undiagnosable from the parent's seat: worker
  `ready`, terminal `running`, transcript EMPTY, `latestCursor: 0`), and
  the read-only caveat stated explicitly (safe for THIS seat only
  because the filled `reviewer.md` forbids commit/push/merge and any
  file edit; the same flag on a WRITING seat is a different decision —
  not this one). Wording kept consistent with step 1's eval-03
  assertion. No other file touched (skills/orchestrate/**, docs/,
  reference/orca.md are later steps — untouched). The file's
  "Retrieved 2026-08-16" sources header and existing per-row table
  dates were left as-is; the new --auto verification is dated
  2026-08-19 in the added prose, matching the table's per-row dating
  pattern. Acceptance: `grep -c -e '--auto' reference/runners.md` → 4
  (≥ 2 required); `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`.

- 2026-08-19 — Step 2 review (fresh in-session reviewer, sonnet),
  verdict verbatim:
  > ### Spec compliance
  > ✅ Compliant
  > […] All three required elements from the step are present and
  > worded to match the step-1 `eval-03.md` assertion almost verbatim.
  > Verified directly: `grep -c -e '--auto' reference/runners.md` → 4
  > (≥ 2 required) — PASS; `node scripts/agent-lint.mjs . --ignore
  > tests,templates,global,examples` → `0 high, 0 medium, 0 low —
  > PASS` — PASS; […] no drift between the eval assertion and the
  > runners.md prose it grades.
  > ### Issues
  > Critical: None. Important: None.
  > Minor: `reference/runners.md:33` — the sentence […] stacks four
  > em-dash clauses in one sentence […] a future pass could split the
  > fallback clause into its own sentence for easier scanning.
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** Both acceptance commands pass, the added prose is a
  > verbatim-level match to the SPEC requirements and to the eval-03
  > assertion it must stay consistent with, and the diff touches only
  > the files this step owns.

  Deferred minors (for work-verify triage): runners.md:33 em-dash
  density — style only.

- 2026-08-19 — Step 3 DONE. `skills/orchestrate/SKILL.md` step 6's
  two-step launch snippet now carries `--auto` on both lines: the
  `terminal create --command` line
  (`"opencode -m opencode-go/deepseek-v4-flash --auto"`) and the
  no-auth fallback sentence
  (`-m opencode/deepseek-v4-flash-free --auto`). The fallback-shell
  paragraph itself (the "can leave"/closing-command wording) was left
  untouched, per this step's scope — that is step 4's concern. A new
  **Review-seat stall clock** paragraph lands immediately after it,
  before the "The verdict is the PASS/FAIL line…" paragraph: tied back
  to step 5's cadence guidance (a ballena cannot heartbeat, so step 5's
  cadence rule cannot reach it), threshold (20-45 min normal; 75+ min
  with an empty orchestration transcript and `latestCursor: 0` is a
  stall, never a slow review) and recovery (`worker-stop` → remove the
  review worktree → `task-update --status ready` → fresh seat) worded
  to match step 1's eval-03 assertion. `docs/how-it-works/execution.md`
  changed in the same commit (house rule: behavior change updates the
  affected chapter): the sequence-diagram's `terminal create --command
  "opencode -m ..."` line now reads `"opencode -m ... --auto"`, staying
  consistent with the flag without hardcoding a specific model id (the
  diagram already used `...` as a placeholder before this change). The
  stage-6 narration (the "What to see" passage after the mermaid
  diagram) gained a new paragraph directly after the "Stage 6's launch
  also forks…takes the four-command two-step launch (...)" sentence and
  before "Stage 7's ordering is easy to miss…": the same stall clock,
  phrased in the chapter's stage-N vocabulary and explicitly named as
  the same fix-loop mechanism stage 5 already uses for an idle child,
  pointed here at a reviewer instead. No other file touched
  (`reference/runners.md`, `reference/orca.md` untouched — later/done
  steps). Acceptance: `node tests/run-eval-checks.mjs` → exit 0, `ok
  orchestrate: 5 evals well-formed`, `all eval checks passed`; `grep -c
  -e '--auto' skills/orchestrate/SKILL.md` → 2 (≥ 2 required). Also ran
  `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`
  (sanity check, not this step's gate).

- 2026-08-19 — Step 3 review (fresh in-session reviewer, sonnet),
  verdict verbatim:
  > ### Spec compliance
  > ✅ Compliant — all four SPEC items for this step (SKILL.md two-step
  > snippet `--auto` on both lines, stall-clock paragraph
  > placement/content, execution.md mermaid flag consistency,
  > execution.md narration gaining the same stall clock) are present
  > and correctly scoped. `reference/runners.md`, `reference/orca.md`
  > untouched (later steps' territory),
  > `docs/how-it-works/standard-lifecycle.md` untouched
  > (sibling-owned), no CHANGELOG/version-stamp touch.
  > […] eval-03.md consistency — thresholds […], signals […], and
  > recovery sequence […] all match the SKILL.md addition exactly on
  > every load-bearing token […] Both launch commands […] match
  > eval-03 verbatim. Stall-clock placement — confirmed […] the
  > fallback-shell paragraph's own text (step 4's territory) is
  > untouched by this diff.
  > ### Issues
  > Critical: None. Important: None.
  > Minor: SKILL.md:186 / execution.md:290 — "is a stall, never a slow
  > review" vs. eval-03's "is a stall, not a slow review." Purely
  > cosmetic […] a future pass could align the connector word.
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** Both required files were edited in the same commit
  > as the house rule demands, the added prose matches eval-03's graded
  > wording on every threshold/command/sequence detail, the stall-clock
  > paragraph is placed exactly where the SPEC specifies without
  > touching step 4's adjacent paragraph, and both acceptance commands
  > pass as verified directly.

  Deferred minors (for work-verify triage): "never/not a slow review"
  connector-word alignment between SKILL.md/execution.md and eval-03 —
  cosmetic only.

- 2026-08-19 — Step 4 DONE. `reference/runners.md` lines 115-120: the
  categorical claim "the bare create opens a startup shell of its own" was
  changed to "the bare create can leave a startup shell of its own; observed
  both ways on this repo's own Run (2026-08-19: present on some launches,
  absent on the MAT-91 review seats)" — the "can" form matches the observed
  behavior and aligns with the already-correct wording in
  `skills/orchestrate/SKILL.md:177` ("can leave") and `reference/orca.md:109`
  ("can leave"). The required-close rule and confirm-before-close discipline
  remain intact; only the categorical form changed.
  `skills/orchestrate/SKILL.md` lines 177-181: the fallback-shell paragraph
  now explicitly names the closing command — `orca terminal close --terminal
  <handle>` — where the requirement is stated (right after "not advice"),
  citing `reference/runners.md` for the full recipe (single-definition
  discipline, no duplication of the whole procedure). The Review-seat stall
  clock paragraph immediately after was left untouched per step scope.
  Verification: all three files now use the "can" form consistently. No
  other files touched (`reference/orca.md` already correct at line 109,
  `docs/`, `evals/eval-03.md` untouched per step 4 scope). Acceptance:
  `grep -c 'opens a startup shell' reference/runners.md` → 0 (categorical
  removed); `grep -c 'terminal close --terminal' skills/orchestrate/SKILL.md`
  → 1 (closing command present). Also ran `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`.

- 2026-08-19 — Step 4 review (fresh in-session reviewer, sonnet),
  verdict verbatim:
  > ### Spec compliance
  > ✅ Compliant — both SPEC items 5 and 6 are implemented as
  > specified. […] I verified the three-file agreement myself:
  > `reference/runners.md:116`, `skills/orchestrate/SKILL.md:177`, and
  > `reference/orca.md:109` all use "can leave"; a repo-wide grep for
  > `startup shell|fallback shell` turned up no other categorical
  > claim […] Both accept commands pass: `grep -c 'opens a startup
  > shell' reference/runners.md` → 0, `grep -c 'terminal close
  > --terminal' skills/orchestrate/SKILL.md` → 1.
  > ### Issues
  > Critical: None. Important: None.
  > Minor: (1) `skills/orchestrate/evals/eval-03.md:30-33` still cites
  > `(reference/orca.md)` next to the closing-command assertion, but
  > SKILL.md's new wording cites `reference/runners.md` for the full
  > recipe instead. […] Worth reconciling — update eval-03's
  > parenthetical to `reference/runners.md` — before the lane closes
  > (step 5's bookkeeping pass is a natural place). (2)
  > `reference/runners.md:116-118` semicolon + em-dash stacking —
  > cosmetic, matches the file's voice, no action needed.
  > ### Assessment
  > **Step quality:** Approved
  > **Reasoning:** Both required edits are present, correctly scoped,
  > and preserve the required-close/confirm-before-close discipline
  > exactly as the SPEC demands; the three named files agree on the
  > "can" form with no categorical claim left anywhere in the repo,
  > and both acceptance commands pass.

  Controller ruling on Minor (1): spec-conformance fix, assigned to
  step 5's bookkeeping pass (see DECISIONS.md). Minor (2) deferred —
  style only.

- 2026-08-19 — Step 5 DONE. `skills/orchestrate/evals/eval-03.md` line 32:
  the closing-command assertion's parenthetical citation changed from
  `(reference/orca.md)` to `(reference/runners.md)`, per DECISIONS' ruling
  that the single definition of the full recipe is `reference/runners.md`
  (SPEC item 6). One-word-level change; the assertion itself and all other
  eval content untouched. All four gate commands exit 0: `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → 0
  high, 0 medium, 0 low, PASS; `node tests/run-lint-tests.mjs` → all 20
  cases passed; `node tests/run-gen-tests.mjs` → all gen cases passed;
  `node tests/run-eval-checks.mjs` → all eval checks passed, `ok
  orchestrate: 5 evals well-formed`. Files changed:
  `skills/orchestrate/evals/eval-03.md` (citation only), and this lane's
  PROGRESS.md.

## In progress
