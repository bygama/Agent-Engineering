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

- Step 3 (2026-08-18): wrote `skills/orchestrate/SKILL.md` (213 lines) —
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

## In progress

- Lane opened 2026-08-18: SPEC approved by owner; PLAN written (10 steps).

## Tried and failed

## Next

- Step 4: absorb fan-out — delete `skills/fan-out/` (its manual procedure
  and XL ceremony now live in `skills/orchestrate/SKILL.md`) and update
  `reference/skills.md`.

## Verification

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
