# orchestrate — Orca-first orchestration (1.3.0) — progress

## Done

- Step 1 (2026-08-18): wrote `skills/orchestrate/evals/eval-01.md` through
  `eval-04.md` (4 evals, evals-first per the hard constraint — no
  `SKILL.md` for orchestrate exists yet). Coverage:
  - eval-01: parent entry — M+ at a Run-bound session routes to
    orchestrate (never inline, never work-plan/work-run directly in the
    parent); Run binding confirmed/created; lane becomes a Task
    (`task-create --spec`, `--deps` for file-overlap); dispatch dialogue
    (reviewers y/n, count, model, default 1 ballena) asked and answered
    BEFORE any `worker-start`; parent implements nothing itself.
  - eval-02: supervision discipline — mailbox `check --wait` only, never
    polling the child's terminal directly even when reachable; rulings
    via `reply` land in the child's own DECISIONS.md; silence is not
    progress; child never merges (stated as ongoing, not just end-state);
    structured coordination only through `orca orchestration`.
  - eval-03: review wave + fix loop — agreed reviewer(s) dispatched
    read-only via the reviewer template; FAIL findings return to the SAME
    child; fix loop capped at 5 rounds → decision gate on exhaustion; PASS
    requires rebase-onto-main + gate rerun BEFORE merge; parent merges
    rebase-only in an order it chooses (not arrival order) across three
    simultaneously-PASS children; worker released + worktree removed
    after each merge.
  - eval-04: tier gating + no-Orca fallback — S refuses dispatch (inline,
    no lane/Task); M+ always a child; a child's request to spawn its own
    child is refused (no grandchildren) — it either folds the work into
    its own lane or asks the parent for a sibling task; on a no-Orca
    machine, orchestrate never fabricates a Run/Task/dispatch — the
    manual fallback runs instead with every Orca-only step declared
    explicitly NOT done, never faked.

  Acceptance: `test $(ls skills/orchestrate/evals/eval-*.md | wc -l) -ge 4`
  → PASS (4 evals). Also ran, both green (not required by this step's
  acceptance, but kept as evidence nothing else broke):
  `node tests/run-eval-checks.mjs` (orchestrate has no SKILL.md yet, so
  it isn't checked by that runner — all 12 existing skill dirs still
  well-formed) and `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` (0 high, 0 medium, 0 low — PASS).

  Files: `skills/orchestrate/evals/eval-01.md`,
  `skills/orchestrate/evals/eval-02.md`,
  `skills/orchestrate/evals/eval-03.md`,
  `skills/orchestrate/evals/eval-04.md`.

  Concerns: none — step scoped to evals only, no SKILL.md or references
  touched (those are steps 2-3). Commit: `429fa71`.

- Step 1 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  findings (fixtures create genuine temptation per rule; wording tracks
  SPEC; evals-first ordering verified). No fix rounds.

- Step 2 (2026-08-18): wrote the two dispatch templates in
  `skills/orchestrate/references/`, following the MAT-43 pattern (When
  to use / How to fill / fenced template / Placeholders / reports-via
  line) already used by `skills/work-run/references/*.md` and
  `skills/work-verify/references/lane-reviewer.md`.
  - `dispatch-child.md`: the text becomes the Task's `--spec`
    (`orca orchestration task-create --spec "..."`), injected as the
    child's preamble at `worker-start --task <id> --worktree
    new-child`. Two placeholders — `[LANE_PATH]`, `[TASK_BRIEF]`
    (the parent's already-shaped design; the child formalizes it via
    `work-plan` design-first, never re-shapes it). Covers all four
    PLAN-named behaviors: reads its Linear ticket via `orca linear
    issue --current`; pushes its branch and opens the PR but never
    merges (explicit "no matter how clean" line); reports done via
    `orca orchestration send --type worker_done --outcome succeeded
    --files-modified ... --report-path ... --body "PR: <url>"`; asks
    questions via the blocking `orca orchestration ask --question`.
    Also carries the SPEC's "no grandchildren" rule (eval-04) as its
    own section, since that's part of what the child preamble must
    tell the child.
  - `reviewer.md`: read-only adversarial reviewer on the lane branch
    — explicit "refute-the-PASS" framing (rerun the PASS block's own
    commands, look for unbacked claims, check SPEC Constraints for
    missed/extra/misunderstood). Verdict (PASS/FAIL + findings by
    severity) is reported via `worker_done`'s `--body`, deliberately
    kept separate from `--outcome` (which I resolved to mean "did the
    review itself complete," verified against `orca orchestration
    send --help`'s note that `worker_done requires --outcome
    succeeded or --outcome failed` — conflating that flag with the
    lane's verdict would misreport a completed FAIL review as a
    failed worker). Never commits/pushes/merges.

  Verified actual `orca orchestration` CLI syntax against `orca
  orchestration <cmd> --help` on-machine (task-create, worker-start,
  ask, check, reply, send, worker-release) rather than guessing flags;
  `send`'s notes on `--outcome`, `--files-modified`, `--report-path`,
  and injected `--task-id`/`--dispatch-id`/`--from` drove both
  templates' exact wording.

  Acceptance: `test -s skills/orchestrate/references/dispatch-child.md
  -a -s skills/orchestrate/references/reviewer.md` → PASS. Also ran
  (not required by this step, kept as evidence): `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  (0 high, 0 medium, 0 low — PASS) and `node tests/run-eval-checks.mjs`
  (all 12 existing skill dirs well-formed; orchestrate still has no
  SKILL.md, so it isn't checked by that runner yet — expected, SKILL.md
  is step 3).

  Files: `skills/orchestrate/references/dispatch-child.md`,
  `skills/orchestrate/references/reviewer.md`.

  Concerns: none blocking. One judgment call worth flagging for
  step 3/review — I treated `--outcome` on the reviewer's worker_done
  as "did the review complete" rather than "did the lane pass," since
  the CLI help ties `--outcome` to the worker's own task completion,
  not an arbitrary verdict payload; step 3's SKILL.md should route the
  parent's FAIL-handling off the `--body` verdict text, not off
  `--outcome`, to stay consistent with this reading.

- Step 2 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  Critical/Important. One Minor DEFERRED for work-verify's triage:
  `dispatch-child.md` concatenates `[LANE_PATH]PROGRESS.md` with no
  separator — relies on the trailing-slash placeholder convention;
  consider an explicit no-ambiguity form. Reviewer confirmed the
  `--outcome`/`--body` split matches the DECISIONS ruling verbatim.
  No fix rounds.

- Step 3 (2026-08-18): wrote `skills/orchestrate/SKILL.md` (260 lines; the step report originally said 213 — corrected by the controller per the fix-round-1 re-review) —
  the parent role end to end, in the house skill shape (frontmatter →
  premise + pairing sentence → copyable checklist → numbered steps → Red
  flags table → Judgment notes), matching `skills/work-run/SKILL.md`.
  - Workflow steps 0-8: probe + Run binding (`run-current` /
    `run-create --objective` / `run-use --id`, one live Run per parent);
    tier gate (S inline in the parent, M+ always a child, shaping stays
    in the parent); lane → Task (`task-create --spec --task-title
    --deps`, `--deps` as the file-overlap queue, chains deeper than 3-4
    called out as stages-not-lanes); the dispatch dialogue as one owner
    question before birth, default **1 ballena** glossed once as the
    cross-family reviewer seat (deepseek v4 flash), answer recorded in
    the Task spec; child birth via `worker-start --task <id> --worktree
    new-child --name <slug> --agent claude --setup run` + `worktree set
    --linear-issue <KEY>` immediately after (Linear bound at birth) +
    `references/dispatch-child.md` filled verbatim, with the
    `worktree create --agent --prompt` full-handoff path explicitly
    refused; mailbox supervision (`check --wait --types
    "worker_done,escalation,question"`, rolling waits, ack-the-Delivery,
    `reply` rulings landing in the child's own DECISIONS, structured
    mail via `send --to dispatch:<id>`, terminal reads/sends named as
    the anti-pattern); review wave (`worker-retain` while the verdict is
    in flight, `references/reviewer.md` filled verbatim, one Task per
    reviewer on its own read-only worktree cut from the lane branch,
    verdict read from the `worker_done` body not `--outcome`); fix loop
    to the SAME child terminal (`worker-show` → `task-create` →
    `worker-start --terminal <handle>`), cap 5 → `gate-create` /
    `gate-resolve` with the ruling into the parent's DECISIONS; merge
    (child rebases onto fresh main and reruns gates first, then the
    parent runs `gh pr merge --rebase --delete-branch` in its chosen
    order, whole-tree gates after the last merge);
    `worker-release --dispatch` + `worktree rm` + record.
  - `## Several children at once (XL)` carries fan-out's ceremony that
    must survive step 4: frozen named anchors, worker table in the parent
    PLAN, decided merge order, anchors-win disagreement rule, synthesis
    gate on the merged whole, failure locality — plus the multi-parent
    rule (one parent per repo; same-repo parents only with disjoint file
    scopes and lanes agreed in writing).
  - `## No-Orca fallback` absorbs fan-out's manual procedure BEFORE step 4
    deletes it: the explicit NOT-done declaration, the three qualifying
    questions, frozen anchors + worker table with verified spawn commands,
    the reducer contract (PASS block + 3-5 line summary, merge order,
    disagreement rule, synthesis gate), sequential execution under the
    same ceremony with no simulated spawns, and a mandatory review before
    merge.

  Every `orca` command in the file was verified on-machine against
  `orca orchestration <cmd> --help`, `orca worktree {create,set,rm} --help`
  and `orca skills get orchestration` rather than recalled — that is what
  produced three corrections to the obvious guesses: (a) `worker-start`
  has no `--linear-issue`, so binding at birth is a following
  `worktree set --worktree <id> --linear-issue <KEY>`; (b) the fix loop
  reuses the child's own agent terminal via `worker-start --terminal
  <handle>` (Orca's documented terminal-ownership transfer), which is why
  the skill retains the worker at `worker_done` instead of releasing it
  there — releasing at report time would destroy the terminal the loop
  needs; (c) `--model` only takes Claude/Codex/Cursor ids, so the ballena
  is launched two-step (`worktree create --base-branch <lane-branch>` →
  `terminal create --command "opencode -m opencode/deepseek-v4-flash-free"`
  → `terminal wait --for tui-idle` → `worker-start --terminal`), with
  `opencode -m provider/model` confirmed in `opencode --help` here.
  Step 2's `--outcome` vs `--body` concern is honored: the SKILL routes
  FAIL-handling off the body text and says so in a sentence.

  Acceptance: `node tests/run-eval-checks.mjs` → PASS, exit 0 — and this
  step is the one that makes it meaningful for this skill: with SKILL.md
  present, `orchestrate` is now checked by the runner (`ok orchestrate: 4
  evals well-formed`) where before it was skipped. Also ran, all green
  (not required by this step, kept as evidence nothing else broke):
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  (0 high, 0 medium, 0 low — PASS), `node tests/run-lint-tests.mjs`
  (all 13 cases passed), `node tests/run-gen-tests.mjs` (all gen cases
  passed).

  Files: `skills/orchestrate/SKILL.md` (new); `PLAN.md` step 3 ticked.

  Concerns: none blocking. Two notes for review/later steps — (1) at 213
  lines the file is above the house norm (77-135) though far under the
  <500 cap; the extra length is the absorbed fan-out fallback plus the XL
  ceremony, which have nowhere else to live once step 4 removes
  `skills/fan-out/`. (2) The skill cites `reference/runners.md` for the
  ballena spawn command and names
  `opencode -m opencode/deepseek-v4-flash-free` inline; if that model id
  ever changes, the reference is the source of truth and the skill's
  example follows it.

- Step 3 review (2026-08-18): spec ✅ Compliant, quality **Needs fixes**
  — 2 Important: (1) SKILL.md:153 re-review seat unspecified (should
  reuse the same reviewer terminal via `worker-start --terminal`, like
  the fix seat); (2) SKILL.md:180-183 reviewer workers/worktrees never
  decommissioned in step 8 (release them alongside the child's). Fix
  round 1 opened, same implementer. Reviewer independently re-verified
  every `orca` flag against the installed CLI — all hold. Minors
  DEFERRED for work-verify triage: PROGRESS says 213 lines, file is
  260; ballena two-step should close its unused fallback shell
  (reference/orca.md:83-85); runners.md citation shows the headless
  form, skill uses the TUI form — label or add; four fan-out items to
  land in later steps (XL-mandatory wording → step 6; ambiguity rule
  for the no-Orca fallback; ready-to-run protocol emission; feature
  rows passing from the merged tree); fallback never closes lanes
  (one line); ⚠️ reference/orca.md:45 still maps worker spawn to the
  full-handoff form — step 9's sweep must fix it.

- Step 3 fix round 1 (2026-08-18): both Important findings from the step
  review addressed in `skills/orchestrate/SKILL.md`, additively — no
  rework of correct text, nothing else touched (minors stay deferred for
  work-verify's triage).
  - Finding 1 (re-review seat unspecified): the fix-loop paragraph now
    sends the re-review back to the SAME reviewer, mirroring the fix
    path's return to the same child — retain the reviewer's terminal at
    its verdict, then `worker-start --task <re_review_task_id>
    --terminal <handle>` once it has re-fetched the branch, with the
    cost of the literal reading named ("cutting a fresh `<slug>-review`
    worktree per round pays a new ballena five times to reread one
    lane"). Retention is stated in the same clause because it is what
    makes the reuse mechanically possible: a settled dispatch's terminal
    must be reused, retained, or released before the next wait, so
    without the retain the handle is gone by the next round — the same
    reasoning the skill already gives for the child.
  - Finding 2 (reviewer workers never decommissioned): step 8 now scopes
    cleanup to everything the lane spawned — the child's dispatch and
    worktree AND every reviewer dispatch with its `<slug>-review`
    worktree — and cites `reference/orca.md` for the general rule, so
    the skill no longer contradicts its own "idle agent on a merged lane
    is debris" line one sentence later.

  Acceptance re-run: `node tests/run-eval-checks.mjs` → "all eval checks
  passed", exit 0. Also re-ran `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → 0 high, 0 medium, 0 low — PASS.
  File now 269 lines (was 260; the fix report originally said 224/213 — corrected by the controller per the re-review), still far under the <500 cap.

  Files: `skills/orchestrate/SKILL.md`.

  Concerns: none. Both findings were genuine gaps in the dispatch
  lifecycle rather than wording issues — the re-review seat and the
  reviewer teardown were the two places the file described the child's
  lifecycle without giving the reviewer's.

- Step 3 fix round 1 re-review (2026-08-18): both Important findings
  **ADDRESSED** (re-review seat reuses the same reviewer terminal via
  `worker-start --terminal`, SKILL.md:154-158; step 8 decommissions
  everything the lane spawned incl. reviewer dispatches + worktrees,
  SKILL.md:185-194). No new Critical/Important breakage. Re-reviewer
  independently re-ran eval-checks + self-lint, both green. New Minors
  DEFERRED: PROGRESS line counts were wrong (corrected by controller in
  this commit: 260/269, not 213/224); reviewer retain instruction at
  :155 lacks the literal `worker-retain` command (low risk); `<slug>-
  review` worktree name collides if multiple reviewers run per round
  (pre-existing, out of fix scope). Step 3 CLOSED — one fix round.

- Step 4 (2026-08-18): deleted `skills/fan-out/` (SKILL.md + its 5 evals)
  — its manual no-Orca procedure and XL ceremony already live in
  `skills/orchestrate/SKILL.md` from step 3. Added a new paragraph to
  `reference/skills.md`'s `## Placement` section recording the
  supersession: "`skills/orchestrate` now owns dispatch and parallel
  execution end to end ... superseding `skills/fan-out` (ADR-008) ...
  fan-out's name stays in ADRs, CHANGELOG, closed lanes, and examples/" —
  placed in `## Placement` rather than the `## Composing with
  process-skill suites` section, since that section is scoped to
  external suite skills (superpowers) and fan-out is AE-native; keeps
  both existing paragraphs (the brainstorming/shaping supersession
  paragraph and the original Placement paragraph) untouched and
  coherent. Cites ADR-008 by plain parenthetical (matching the existing
  "(ADR-006)" style, not a markdown link) since ADR-008 is step 7's
  deliverable — confirmed this doesn't trip the lint's broken-link check
  (`scripts/agent-lint.mjs`), which only scans CLAUDE/AGENTS/README.md
  files for markdown link targets, not `reference/`.

  Scope note: deleting `skills/fan-out/` broke one markdown link —
  README.md's skill table row `[`fan-out`](skills/fan-out/SKILL.md)`
  (under `## The ten skills`) — which is agent-lint's only *broken-link*
  check and therefore blocking for this step's acceptance. Removed just
  that row (the smallest fix that clears the dead link) and left
  everything else in that README section untouched: the `## The ten
  skills` heading still says "ten" (now 9 rows), the chain prose still
  says "**fan-out** is work-run's parallel sibling...", and the mermaid
  diagram still has its `FO["fan-out..."]` node — none of those trip
  agent-lint (only real `[text](path)` links are checked), and all three
  are explicitly PLAN step 9's scope ("README skill table + chain +
  mermaid — orchestrate replaces fan-out; count stays 10"). Step 9 must
  restore the row/heading count/prose/mermaid node for orchestrate; this
  step intentionally does not pre-empt that judgment work.

  Acceptance: `test ! -d skills/fan-out && node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` → PASS, exit 0 ("0 high, 0
  medium, 0 low — PASS"). Also ran, all green (not required by this
  step, kept as evidence nothing else broke): `node
  tests/run-eval-checks.mjs` (all 12 remaining skill dirs well-formed —
  fan-out no longer listed, orchestrate still is), `node
  tests/run-lint-tests.mjs` (13/13), `node tests/run-gen-tests.mjs`
  (7/7).

  Files: deleted `skills/fan-out/SKILL.md`,
  `skills/fan-out/evals/eval-{01..05}.md`; edited `reference/skills.md`
  (new Placement paragraph), `README.md` (removed the dead fan-out
  table row only); `PLAN.md` step 4 ticked.

  Concerns: none blocking. Flagging for step 9 (not a defect in this
  step): README's `## The ten skills` section (heading count, chain
  prose, mermaid `FO` node) still names fan-out and needs orchestrate's
  content added back — same three spots the PLAN already scopes to step
  9.

- Step 4 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  Critical/Important (one Minor: verbose PROGRESS entry, no fix round).
  Reviewer verified the lint broken-link check's actual regex before
  trusting the README scope call, and confirmed the fan-out procedure
  was genuinely absorbed into orchestrate's fallback section before the
  deletion. No fix rounds.

- Step 5 (2026-08-18): updated using-ae's evals first, then its SKILL.md,
  per the hard constraint (evals precede content).
  - `skills/using-ae/evals/eval-01.md`: added a fixture line pinning the
    session as not Run-bound ("no Orca Run is bound... this is not a
    parent orchestrator session") and a new expected-behavior bullet
    stating it invokes `work-plan` directly, not `orchestrate`, because
    the role rule only redirects Run-bound sessions — cross-referencing
    eval-04. Without this the eval would have gone ambiguous the moment
    the role rule shipped: the same M ask now has two valid routes
    depending on session shape, and eval-01 didn't say which shape it
    was.
  - `skills/using-ae/evals/eval-04.md` (new): the mirror case — same M
    ask, same repo state, but `orca orchestration run-current` returns a
    live Run (a parent orchestrator session per
    `skills/orchestrate/SKILL.md` step 0). Expects the agent to name the
    tier, then invoke `orchestrate` (not `work-plan`, not inline
    implementation), and explicitly not to fold M+ into a "just do it
    inline, orchestrate is for XL" reading. States the contrast with
    eval-01 as its own checklist line so the two evals are read as a
    pair.
  - `skills/using-ae/SKILL.md`: the map's `fan-out` row became
    `**orchestrate** — dispatching M+ to a child worktree; XL fan-out
    included.` A new `## Role rule` section (between `## The map` and
    `## Precedence (ADR-005)`) states the binary: Run-bound session
    (`run-current` returns a live Run) is a parent — M+ routes to
    `orchestrate`; dispatch-bound session (spawned via `worker-start`)
    uses the map as written; no bound Run also uses the map as written
    (covers plain no-Orca sessions, which are neither parent nor child —
    the SPEC/PLAN named only the parent/child pair, so this line makes
    the implicit third case explicit rather than leaving it to
    inference). Nothing else in the file changed — Entry rule, Precedence,
    and Red flags are untouched.

  Acceptance: `test $(wc -l < skills/using-ae/SKILL.md) -le 80 && grep -q
  orchestrate skills/using-ae/SKILL.md && node tests/run-eval-checks.mjs`
  → PASS. File is 60 lines (was 50); `grep orchestrate` matches (map row
  + role rule); eval-checks reports `ok using-ae: 4 evals well-formed`
  among all 12 skill dirs green. Also ran, both green (not required by
  this step, kept as evidence nothing else broke): `node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  (0 high, 0 medium, 0 low — PASS), `node tests/run-lint-tests.mjs`
  (13/13), `node tests/run-gen-tests.mjs` (7/7).

  Files: `skills/using-ae/evals/eval-01.md`,
  `skills/using-ae/evals/eval-04.md` (new), `skills/using-ae/SKILL.md`;
  `PLAN.md` step 5 ticked.

  Concerns: none blocking. One judgment call worth flagging for
  review — the SPEC/PLAN only named the Run-bound/dispatch-bound pair;
  I added the explicit "no bound Run ⇒ map as written" line to close the
  gap for plain single-agent (no-Orca or no-Run) sessions rather than
  leaving that case to inference, since eval-01's fixture is exactly
  that third case and needed a rule to point at.

- Step 5 review (2026-08-18): spec ✅ Compliant, quality Approved, zero
  findings. The flagged judgment call (third role-rule case: no bound
  Run ⇒ map as written) ratified as warranted coverage — recorded as a
  DECISIONS ruling. using-ae at 60/80 lines; evals-before-content
  verified real by the reviewer. No fix rounds.

- Step 6 (2026-08-18): updated tier surfaces to surface orchestrate in L
  executor mention and XL ceremony — same one-line fix across two files:
  - `reference/task-tiers.md` L row: added `skills/orchestrate`
    (parent-bound) as executor option alongside `skills/work-run`
    (ADR-004); XL row: replaced `fan-out` with `orchestrate` and updated
    ADR reference to ADR-008.
  - `templates/repo/docs/tiers.md` L row: added `orchestrate`
    (parent-bound) as executor option; XL row: replaced `fan-out` with
    `orchestrate` in ceremony description.
  - This repo (`docs/tiers.md`) does not exist; no third-file update
    needed.

  Acceptance: `grep -q orchestrate reference/task-tiers.md && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  PASS. grep confirms orchestrate appears; lint: 0 high, 0 medium, 0 low.

  Files: `reference/task-tiers.md`, `templates/repo/docs/tiers.md`.

  Concerns: none — mechanical batch step, two-file fix with consistent
  wording. Commit: `25705f5`.

- Step 6 review (2026-08-18): spec ✅ Compliant, quality Approved.
  XL mandatory force survived the rename (both files), ADR citation
  correctly forwarded to ADR-008, runtime neutrality holds, the
  "repo's own tiers doc" negative check recorded explicitly. Minors
  DEFERRED: L-row parenthetical now ambiguously scoped (cosmetic);
  `docs/how-it-works/work-lifecycle.md:30,45,49` still names fan-out
  incl. a prose line pointing at the deleted skill — steps 8/9 must
  catch it. No fix rounds.

- Step 7 (2026-08-18): wrote `docs/adrs/ADR-008-orchestration.md` (Date /
  Status / Context / Decision / Consequences / Alternatives considered,
  matching ADR-001/002/004/006/007's shape). Status line amends ADR-002
  (XL fan-out mandate → orchestrate) and ADR-004 (adds orchestrate as an
  L executor option), plus SPEC Decision 7 by extension — same citation
  pattern ADR-002/004 already use.

  Decision section records all eight items the step named, each as its
  own bullet: child=lane via `worker-start` provenance with no
  grandchildren (a child that needs parallel work folds it into its own
  lane or asks for a sibling task); tier gating (S inline, M+ always a
  child); `--deps` overlap queuing; the dispatch-time reviewer question
  with default 1 ballena, framed explicitly as making maker≠checker the
  default rather than an opt-in (child is Claude, ballena is a different
  model family); fix loop cap 5 → decision gate; PR-per-lane with child
  opens/parent merges rebase-only in parent-chosen order; design in the
  parent / execution in the child (cross-referenced to ADR-006 rather
  than reopening it); fan-out absorbed (ceremony + no-Orca fallback both
  moved before deletion, records untouched); and 1.3.0 reused
  post-renumber, tied explicitly to the ADR-007 addendum's freed number.
  A closing paragraph under Decision also carries the three CLI-verified
  mechanics from DECISIONS.md (Linear-at-birth via `worktree set`, fix
  loop's `worker-start --terminal` reuse, ballena's two-step launch)
  since they're load-bearing for anyone implementing against this ADR,
  not just SKILL.md's own prose.

  Consequences section points at every living surface already updated
  by steps 4-6 (using-ae's role rule, task-tiers.md/tiers.md's L and XL
  rows, reference/skills.md's Placement paragraph, the `--outcome` vs
  `--body` verdict-channel ruling) plus the two still-pending (steps 8's
  how-it-works chapter, the dogfood gate before the version bump) — read
  as one line matching that this ADR is written mid-lane, not after.
  Alternatives considered records the two rejected shapes from
  DECISIONS.md's "Approach A" ruling (no separate child skill, no
  separate reviewer skill) plus why reusing 1.3.0 beats a fresh MINOR.

  Acceptance: `test -s docs/adrs/ADR-008-orchestration.md` → PASS. Also
  ran, both green (not required by this step, kept as evidence nothing
  else broke): `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` (0 high, 0 medium, 0 low — PASS) and
  `node tests/run-eval-checks.mjs` (all 12 skill dirs well-formed,
  orchestrate included — unaffected by a docs-only ADR add).

  Files: `docs/adrs/ADR-008-orchestration.md` (new); `PLAN.md` step 7
  ticked.

  Concerns: none blocking. This ADR is written before step 8's
  how-it-works chapter and step 9's remaining living-surface sweep, so
  its Consequences section names both as still-pending rather than
  already-done — that's accurate to lane order, not a gap in this step.

- Step 7 review (2026-08-18): spec ✅ Compliant on content, quality
  **Needs fixes** — 1 Important: ADR-008 claims amendment
  relationships (ADR-002, ADR-004, SPEC Decision 7, plus superseding
  ADR-007's "1.4.0 reserved" line) with NO reciprocal pointers in the
  amended documents; the house convention (SPEC Decision 7 chain,
  ADR-003's forward pointer to ADR-007) requires them. Fix round 1
  opened, same implementer. Minor DEFERRED: ADR-006 analogy at
  :83-84 is thematically loose. Reviewer traced every ADR claim to
  its lane source — none invented.

- Step 7 fix round 1 (2026-08-18): the one Important finding addressed —
  four reciprocal pointers added, each an annotation in the house form
  the reviewer already verified is real and active, no rewrite of any
  document's original content:
  - `docs/specs/SPEC-agent-engineering.md` Decision 7's existing
    "Amended by ... Further amended by ..." chain gained one more clause:
    "Further amended by [ADR-008](../adrs/ADR-008-orchestration.md): XL's
    mandatory fan-out is reassigned to `orchestrate`, which also becomes
    an additional L executor option alongside `work-run`."
  - `docs/adrs/ADR-002-tier-xl.md`'s Status line gained
    `; XL's mandatory fan-out reassigned to orchestrate by ADR-008
    (2026-08-18)`, appended to its existing "Amends SPEC Decision 7"
    comment.
  - `docs/adrs/ADR-004-relay.md`'s Status line gained a third HTML
    comment, `<!-- orchestrate added as an additional L executor option
    by ADR-008 (2026-08-18) -->`, matching its existing pattern of one
    comment per fact rather than editing the two already there.
  - `docs/adrs/ADR-007-milestone-versioning.md`'s Status line gained
    `; 1.4.0 reservation superseded by ADR-008 (2026-08-18) — the
    orchestration milestone shipped as 1.3.0 instead`. Landed as a
    Status-line pointer (ADR-003's pattern for a forward-pointing
    supersession) rather than editing the Consequences bullet that still
    reads "1.4.0 stays reserved" — that sentence is accurate to what was
    true when ADR-007 shipped and stays untouched as the historical
    record; the pointer is what tells a reader it was later superseded.

  Deferred, per the controller's instruction to fix exactly this
  finding: the Minor about the ADR-006 design-in-parent/execution-in-
  child analogy at ADR-008.md:83-84 being thematically loose — left for
  a later triage, not addressed here.

  Acceptance re-run: `test -s docs/adrs/ADR-008-orchestration.md` → PASS
  (unaffected — this round touched other files, not ADR-008 itself).
  Also re-ran `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → 0 high, 0 medium, 0 low — PASS.

  Files: `docs/specs/SPEC-agent-engineering.md`,
  `docs/adrs/ADR-002-tier-xl.md`, `docs/adrs/ADR-004-relay.md`,
  `docs/adrs/ADR-007-milestone-versioning.md`.

  Concerns: none. All four edits are one-clause annotations following an
  existing, verified-active convention — no content rewritten.

- Step 7 fix round 1 re-review (2026-08-18): the Important finding
  **ADDRESSED** — four reciprocal annotations verified against the live
  files (SPEC Decision 7 chain clause; ADR-002/ADR-004/ADR-007
  Status-line pointers), all pure appends, zero record content
  rewritten; ADR-007's historical Consequences bullet deliberately
  preserved. No new breakage, no out-of-scope items. Step 7 CLOSED —
  one fix round.

- Step 8 (2026-08-18): wove orchestrate into `docs/how-it-works/execution.md`
  — the "Graphs" section (previously entirely fan-out mechanics) becomes
  `## Orchestration: the graph layer's parent/child cycle`, owned by
  `skills/orchestrate` (ADR-008), with two new mermaid diagrams both
  narrated per the house "What to see:" convention:
  - **Topology** (`flowchart TB`): one Orca Run bound to the parent
    worktree, `worker-start` into each child worktree, a read-only
    reviewer/ballena worktree cut from each lane's branch reporting its
    `worker_done` verdict back to the parent (never the child), and PRs
    from children landing on `main` only through the parent's own
    rebase-merge — matches SPEC's "topology diagram (parent Run,
    children, ballenas, PRs to main)" line item exactly.
  - **The 8-stage dispatch cycle** (`sequenceDiagram`, Owner/Parent/Child/
    Reviewer/main participants, matching `integrations.md`'s existing
    sequence-diagram style): stages 1-8 of `skills/orchestrate/SKILL.md`'s
    own checklist (tier gate through decommission+record) — stage 0
    (probe + bind the Run) is excluded because it is parent-session setup
    done once, not part of the per-lane cycle that repeats, which is what
    makes it exactly 8 stages rather than 9. An `alt` block shows the
    FAIL/fix-loop branch (findings to the same child, re-review by the
    same reviewer, cap-5 owner gate) inline rather than as a separate
    diagram.
  - Kept the existing `## Several children at once (XL)` flowchart
    (qualify/anchors/worker-table/reduce/synthesis) as a subsection —
    unchanged as a diagram, since the ceremony itself survived the
    fan-out→orchestrate absorption verbatim (SKILL.md's own XL section);
    updated its prose (`fan-out` → `orchestrate`, "stages, not parallel
    items" → "stages, not lanes" to match the live skill's actual wording)
    and added the "one parent per repo" property, which the old fan-out
    prose never had (SKILL.md names it; the how-it-works text was
    incomplete without it — a real behavior gap, not a wording one).
  - Two more spots in the same chapter, both direct contradictions of the
    new content two sections later: the intro paragraph's "fan-out =
    parallel across lanes" → "orchestrate = parallel across lanes ...
    (ADR-008)"; the Orca-mapping bullet's `worker (fan-out)` row, which
    named the *wrong* command (raw `worktree create --agent --prompt`,
    the unsupervised full-transfer form) for a supervised child — fixed
    to `worker-start --task --worktree new-child` with a note
    distinguishing it from the full-transfer form (which stays valid,
    just for a different case — `work-lifecycle.md`'s pause handoff still
    uses it correctly). One-word fix in the Runners section too
    ("mid-fan-out" → "mid-dispatch").
  - `docs/how-it-works/work-lifecycle.md`: fixed the four fan-out mentions
    the step 6/7 reviews flagged (lines 30, 45, 49, 142 in the pre-step
    file) — the tier-triage flowchart's XL node, the tier table's XL row,
    the "XL is structural" prose ("the fan-out skill refuses" → "orchestrate
    refuses"), and the work-run section's "parallelism ... belongs to
    fan-out" line. All four directly cross-reference `execution.md`'s
    content and would have contradicted the newly-woven chapter if left
    alone.

  Scope note: left `docs/how-it-works/architecture.md` (phase-ladder box
  "P4 graphs<br/>fan-out · reducer · runners", directory-map skill list,
  two prose mentions) and `docs/how-it-works/standard-lifecycle.md`
  (one skill-list mention) untouched. The phase-ladder box in particular
  reads as a historical record of what P4 shipped (same register as the
  ADRs/CHANGELOG the Constraints block exempts), and both files are
  exactly PLAN step 9's scope ("any other living surface still naming
  fan-out as current") rather than this step's ("docs/how-it-works
  chapter for orchestration" — the chapter being woven is execution.md,
  with work-lifecycle.md's direct cross-references as the one
  unavoidable spillover). `reference/graphs-and-reducers.md` (a
  `reference/` file, not `docs/how-it-works/`) also still names
  `skills/fan-out` — same reasoning, left for step 9 or later triage.

  Acceptance: `grep -rq orchestrate docs/how-it-works && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  PASS, exit 0 ("0 high, 0 medium, 0 low — PASS"). Also ran, all green
  (not required by this step, kept as evidence nothing else broke):
  `node tests/run-eval-checks.mjs` (all 12 skill dirs well-formed,
  unaffected by a docs-only change), `node tests/run-lint-tests.mjs`
  (13/13), `node tests/run-gen-tests.mjs` (7/7).

  Files: `docs/how-it-works/execution.md`,
  `docs/how-it-works/work-lifecycle.md`; `PLAN.md` step 8 ticked.

  Concerns: none blocking. Flagging for step 9 (not a defect in this
  step, matches its own named scope): `architecture.md`'s and
  `standard-lifecycle.md`'s remaining fan-out mentions, plus
  `reference/graphs-and-reducers.md`'s.

- Step 8 review (2026-08-18): quality **Needs fixes** — 2 Important
  against the DECISIONS "must reflect all three" mandate: two-step
  ballena launch entirely absent from both diagrams; Linear-at-birth
  compressed into one arrow as if it were a worker-start flag (it is a
  separate `worktree set --linear-issue` call). Retain-until-merge and
  the `--outcome`/body nuance correctly captured; diagrams otherwise
  accurate 1:1 vs the skill; acceptance re-run green by the reviewer.
  Minor DEFERRED: deactivate/activate asymmetry in the sequence
  diagram. Fix round 1 opened, same implementer.

- Step 8 fix round 1 (2026-08-18): both Important findings addressed in
  `docs/how-it-works/execution.md`'s "8-stage dispatch cycle" sequence
  diagram (the Minor stays deferred, per the controller's instruction to
  fix exactly these two):
  - **Ballena two-step launch**: stage 6's single `P->>R` arrow became an
    `alt`/`else` branch — one arm `worker-start --task --model <id>`
    (one-step, for a Claude/Codex/Cursor-selectable reviewer), the other
    the four-command chain (`worktree create --base-branch` → `terminal
    create --command "opencode -m ..."` → `terminal wait --for
    tui-idle` → `worker-start --terminal <handle>`, labeled "two-step
    launch" to match DECISIONS.md's own term for it) for the ballena.
    Added a sentence to the "What to see" paragraph naming the cause:
    `--model` only accepts Claude/Codex/Cursor ids, so the fork is a CLI
    constraint, not a stylistic choice.
  - **Linear-at-birth**: stage 4's single arrow (`worker-start
    --task --worktree new-child<br/>+ Linear bound at birth`) split into
    two `P->>C` arrows — the `worker-start` call, then a separate
    `worktree set --linear-issue <KEY>` labeled "separate call, bound at
    birth" — plus a new opening sentence in "What to see" stating
    `worker-start` has no Linear flag and the child counts as bound only
    once both calls have landed.

  Both fixes are diagram + narration only; no other stage, no other
  section, and no other file touched (the deactivate/activate Minor was
  left exactly as flagged, deferred).

  Acceptance re-run: `grep -rq orchestrate docs/how-it-works && node
  scripts/agent-lint.mjs . --ignore tests,templates,global,examples` →
  PASS, exit 0 ("0 high, 0 medium, 0 low — PASS"). Also re-ran, both
  green: `node tests/run-eval-checks.mjs` (all 12 skill dirs
  well-formed), `node tests/run-lint-tests.mjs` (13/13), `node
  tests/run-gen-tests.mjs` (7/7).

  Files: `docs/how-it-works/execution.md`.

  Concerns: none. Both findings were genuine gaps in what the diagram
  claimed happens versus what the CLI actually requires (per
  DECISIONS.md's three CLI-verified mechanics), not wording issues.

- Step 8 fix round 1 re-review (2026-08-18): both Important findings
  **ADDRESSED** (stage 6 alt/else splits the one-step `--model` launch
  from the ballena four-command two-step, cause named in "What to see";
  stage 4 splits `worker-start` from the separate `worktree set
  --linear-issue` with narration). Mermaid blocks traced clean; lint
  re-run green by the re-reviewer. Step 8 CLOSED — one fix round.

- Step 9 (2026-08-18): swept every remaining living surface naming
  `fan-out` as current, catching both the two DEFERRED flags named for
  this step and the broader "any other living surface" clause. Records
  (ADRs, CHANGELOG, closed lanes, examples/, `tests/fixtures/`,
  `docs/specs/SPEC-agent-engineering.md`'s founding phase-ladder/skill-
  list, `docs/how-it-works/architecture.md`'s phase-ladder box,
  `skills/ae-init/references/migration.md`'s per-version ledger) were
  left untouched by design — they document what was true when written,
  same register as the CHANGELOG the Constraints block exempts;
  `docs/specs/SPEC-agent-engineering.md` still says `agent-init`/
  `agent-audit` (never renamed post-founding either), confirming it's a
  frozen founding record, not a live surface, so I did not start
  modernizing it here. Generic uses of "fan-out" as the graph-topology
  term (not a claim that `skills/fan-out` exists) were kept verbatim
  where the lane's own already-shipped text keeps them too — ADR-008's
  "three pre-fan-out questions", `reference/skills.md`'s "XL fan-out",
  `using-ae/SKILL.md`'s "XL fan-out included", `reference/runners.md`'s
  "mid-fan-out"/"one fan-out".

  Fixed (all current-state claims that `skills/fan-out` exists or names
  its now-wrong spawn command):
  - **reference/orca.md:45** (the named DEFERRED flag from step 3's
    review) — the "Worker spawn (fan-out)" row used the unsupervised
    full-transfer command (`worktree create --agent --prompt`); replaced
    with the supervised `orca orchestration worker-start --task <id>
    --worktree new-child` form and a note distinguishing it from the
    "Full lane transfer" row below it — same fix shape step 8 already
    applied to execution.md's identical error.
  - **reference/graphs-and-reducers.md** ("## In this standard") — `skills/
    fan-out` → `skills/orchestrate`; the worker-spawn command had the
    same wrong full-transfer form as orca.md, fixed the same way.
  - **README.md** — skill table gained the `orchestrate` row (between
    work-handoff and loop-setup, matching every other doc's ordering),
    restoring the count to 10 under the already-correct "The ten skills"
    heading; the chain prose's fan-out sentence replaced with orchestrate's
    actual scope (parent role, M+ single child through XL, ADR-008 cited);
    the chain mermaid's `FO` node renamed to `ORCH`; the "How work flows"
    mermaid's XL node and the tier table's XL ceremony cell both changed
    from "fan-out" to "orchestrate" (they were the one place in this
    lane's own file where fan-out and orchestrate wording had gone
    inconsistent, since only the skill-table cluster was named in the
    PLAN line — treated as "any other living surface" scope).
  - **AGENTS.md** (root) Map line — `fan-out` → `orchestrate` in the
    Usage skills list (the explicitly named line).
  - **docs/how-it-works/architecture.md** — the three current-state spots
    step 8 flagged (map mermaid's `SK` node; the "Live, all nine" skill
    inventory's `fan-out (P4, no bump)` entry → `orchestrate (1.3.0 —
    ADR-008 absorbed fan-out)`; the `loop-setup and fan-out scale...`
    prose). Left the phase-ladder mermaid box untouched, per step 8's own
    reasoning (historical record of what P4 shipped).
  - **docs/how-it-works/standard-lifecycle.md** — the "Ten skills..."
    completing-the-set list, `fan-out` → `orchestrate`.
  - **templates/repo/AGENTS.md.template** — the installed tier one-liner's
    "XL fan-out" → "XL orchestrate" (this exact string ships into every
    future consumer via `ae-init`).
  - **skills/work-run/SKILL.md** + its `evals/eval-03.md`,
    **skills/work-plan/SKILL.md** + its `evals/eval-03.md`,
    **skills/work-verify/SKILL.md** — all pointed an agent at `fan-out`
    as the live tool for cross-lane parallelism / the XL reducer
    contract / the XL parent-plan ceremony; every pointer now says
    `orchestrate`. Evals updated in the same change as their skill's
    content (not strictly "evals precede content" order since these are
    wording fixes to already-approved evals, not new eval design, but
    kept together per the hard constraint's spirit). work-plan kept its
    established "three questions" phrasing (no "fan-out" qualifier,
    matching `reference/task-tiers.md`'s already-updated XL row from
    step 6) rather than inventing "pre-orchestrate questions".

  Judgment call flagged for review: touching work-run/work-plan/
  work-verify — three already-shipped, high-traffic skills predating
  this lane — is broader than a typical single-file "mechanical" fix,
  but the PLAN's own catch-all ("any other living surface still naming
  fan-out as current") and the dispatch message's "files still naming
  the deleted skill" (plural) both name this scope explicitly, and an
  agent following work-run's old text would try to invoke a skill that
  no longer exists. Every edit was a same-shape word substitution
  (`fan-out` → `orchestrate`), never a rewrite of surrounding prose.

  Acceptance: `grep -q orchestrate README.md && node scripts/agent-lint.mjs
  . --ignore tests,templates,global,examples` → PASS, exit 0 ("0 high, 0
  medium, 0 low — PASS"). Also ran, all green (not required by this step,
  kept as evidence nothing else broke): `node tests/run-eval-checks.mjs`
  (all 12 skill dirs well-formed, orchestrate included), `node
  tests/run-lint-tests.mjs` (13/13), `node tests/run-gen-tests.mjs` (7/7).

  Files: `AGENTS.md`, `README.md`, `docs/how-it-works/architecture.md`,
  `docs/how-it-works/standard-lifecycle.md`, `reference/graphs-and-reducers.md`,
  `reference/orca.md`, `templates/repo/AGENTS.md.template`,
  `skills/work-run/SKILL.md`, `skills/work-run/evals/eval-03.md`,
  `skills/work-plan/SKILL.md`, `skills/work-plan/evals/eval-03.md`,
  `skills/work-verify/SKILL.md`; `PLAN.md` step 9 ticked.

  Concerns: none blocking, one flagged above (scope of the work-*
  skill edits) for review's judgment.

- Step 9 review (2026-08-18): spec ✅ Compliant, quality Approved.
  Breadth call ratified: every touched file verified as a living
  surface, nothing living missed, no records touched (reviewer
  re-grepped the whole repo independently). Both DEFERRED flags
  resolved correctly (orca.md spawn row now the supervised form with
  the full-transfer distinction). Important ADJUDICATED as a DECISIONS
  ruling: single-commit evals+SKILL bundling accepted for mechanical
  symmetric renames, habit fix going forward (split commits). Minors
  DEFERRED: `FAN` node id in README's first mermaid; step 6 PLAN
  checkbox was dangling (controller ticked it in this commit — its
  work and review were already recorded). No fix rounds.

- Step 10 (2026-08-18): added the 1.3.0 migration note to
  `skills/ae-init/references/migration.md` — restamp only, recording
  that orchestration (ADR-008) ships as 1.3.0, that skills are
  machine-global (junctions), and that the workstation installer must
  sweep the dangling fan-out junction per MAT-50 guidance.

  Acceptance: `grep -qF "**1.3.0** (2026-08" skills/ae-init/references/migration.md`
  → PASS. Also ran (not required by this step, kept as evidence nothing
  else broke): `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` (0 high, 0 medium, 0 low — PASS).

  Files: `skills/ae-init/references/migration.md`; `PLAN.md` step 10
  ticked.

  Concerns: none — mechanical restamp-only step, single-file edit
  following the established per-version format. Commit: `3e3e04d`.

- Step 10 review (2026-08-18): spec ✅ Compliant, quality Approved,
  zero findings — ledger entry matches the house format, records
  preserved, all three required statements present. No fix rounds.
  PLAN COMPLETE: 10/10 steps executed and reviewed.

## In progress

## Tried and failed

## Next

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
