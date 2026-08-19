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

## In progress

- Step 4 (MAT-101 — `reference/runners.md` fallback-shell paragraph,
  `skills/orchestrate/SKILL.md` step 6 closing command) not started.
