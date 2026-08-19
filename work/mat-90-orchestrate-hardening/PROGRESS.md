# PROGRESS — mat-90-orchestrate-hardening

Lane: MAT-90 (bound) + MAT-95, MAT-96, MAT-97, MAT-98 — one PR closes all
five. Tier L. Dispatched as a supervised child of Run
`run_fafc4f70d4ac`, dispatch `ctx_0e3f93b9be11`.

## Status

- [x] Tickets read (all five) and the production evidence in each cited
      into SPEC.md
- [x] Orca CLI claims verified on this machine before any were written
      down (see Evidence below)
- [x] SPEC.md written, design-first gate raised to the parent
- [x] Parent approval received — DECISIONS ruling 1
- [x] PLAN.md, DECISIONS.md, feature_list.json written
- [ ] work-run: steps 1-8
- [ ] work-verify
- [ ] work-handoff

## Done

### Step 1 — evals first, all three, one commit (2026-08-19)

Evals only; no skill content touched, so the eval commit precedes every
content commit in history as the lane's constraint requires.

- `skills/orchestrate/evals/eval-01.md` — five checklist lines added to
  the existing filled-spec block (SPEC §17): the cadence line (phase
  transitions AND ~10 minutes inside a long phase, a repeated phase a
  valid signal) sits next to the heartbeat-vocabulary line it extends;
  then both sides of the fence named (orchestration workers forbidden
  vs. work-run's per-step reviewer and work-verify's step-4 review
  REQUIRED), the explicit no-absolute-phrasing check (a closing "never
  spawn anything yourself" fails even when the paragraph above is
  correct), the parent's adversarial reviewer as ADDITIONAL and never a
  substitute, and the verdict TEXT recorded verbatim in
  PROGRESS/DECISIONS with MAT-46's uncorroborated "returned CONFIRMED"
  as the named failure.
- `skills/orchestrate/evals/eval-04.md` — the CONTRAST on case (3)
  (SPEC §18). The query now carries the second half of the same
  moment ("no grandchildren, so I take it the step-4 fresh-context
  review is off too?"), the fixture states the lane is M tier (so step 4
  applies) and that the child has attempted no subagent call, and four
  checks follow the existing refusal check: the contrast itself (reading
  the fence as blocking that rung is the graded failure), the parent's
  reviewer as additional rather than a replacement, fence-READ vs
  refusal-OBSERVED, and the genuine-runtime-refusal branch (step 4 NOT
  RUN, refusal text quoted, reported) as the ONLY alternative to running
  it.
- `skills/orchestrate/evals/eval-05.md` — new, parent side at wave scale
  (SPEC §19). Query: a seven-lane wave with four moments — dispatch,
  a quiet child, "let me keep a `wave-ids.json`", and a lane needing a
  non-stock runner. The fixture carries the discriminating detail (one
  child with a stopped cadence and two identical `worker-read`
  transcripts, a second child still beating and growing, the stateless
  shell, and the on-machine `--help` output for `worker-start` and
  `task-create`). Fifteen checks across the four themes: idle diagnosis
  (both signals required, not silence alone) and the Task-to-terminal
  remedy with its structural reason (an idle agent does not read its
  mailbox); Orca as the ledger with the read commands and real field
  names (`task_title`, `dispatchId`/`agentTerminalHandle`,
  `worker.agent_terminal_handle`), `ctx_` ids used directly, the worker
  table as the one on-disk copy, and the parent lane committed like any
  other; the mechanical fill with MUST-FAIL-on-surviving-placeholder and
  `--spec "$(cat <file>)"` because `task-create` has no `--spec-file`;
  and the child-runner stance (stock by default, two-step as the named
  exception, the three conditions, and the four measured costs stated
  concretely).

Acceptance (SPEC/PLAN step 1): `node tests/run-eval-checks.mjs` → exit 0,
output includes `ok   orchestrate: 5 evals well-formed` and ends with
`all eval checks passed`.

Other gates re-run at this step, all exit 0 (none of them is step 1's
acceptance, but the lane requires they stay green):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS`; `node tests/run-lint-tests.mjs`;
`node tests/run-gen-tests.mjs`.

Files changed: `skills/orchestrate/evals/eval-01.md` (M),
`skills/orchestrate/evals/eval-04.md` (M),
`skills/orchestrate/evals/eval-05.md` (A). No do-not-touch path in the
diff.

Concerns: none blocking. Note for steps 2, 3 and 6 — these checks are
now the acceptance criteria those steps must satisfy in text, including
the ones that grade an ABSENCE (no absolute "never spawn anything
yourself" phrasing in `dispatch-child.md`; no empty optional section
surviving a fill).

### Step 1 — review verdict (in-session step reviewer, 2026-08-19)

Recorded verbatim per SPEC §3 — the clause this lane writes: an in-session
reviewer's verdict lives only in the session, so the lane is its only
evidence. The reviewer's own words:

> ### Spec compliance
> ✅ **Compliant** — all three eval changes land, in one commit, before
> any skill content, and the acceptance criterion holds.
>
> […]
>
> **Step quality:** Approved
>
> **Reasoning:** Every requirement of the step is implemented, the
> acceptance command and all three other lane gates were re-run here and
> exit 0, and the evals are genuine failing tests — the fixtures carry
> controls and negative conditions that let a wrong answer actually fail,
> rather than restating the SPEC in checkbox form. The five Minor items
> are wording and coverage polish that no future content step is blocked
> by.

Critical: none. Important: none. **Five Minor findings, deferred to
work-verify triage** (work-run: minors never enter the fix loop):

1. `eval-05.md:60-68` — one check bundles the parent-lane-committed
   expectation into the ledger check, but no moment in the query elicits
   close-out; split it or scope it to close-out.
2. `eval-05.md:84-88` — the two-step sketch omits the worktree beat: a
   new lane needs a worktree before a terminal can be created in it,
   which is *why* `worker.effects` shows `reused`.
3. `eval-01.md:73` — the absence-check quotes "never spawn anything
   yourself" while the live string is "never spawn**ing** anything
   yourself"; a literal-minded grader could pass it vacuously.
4. `eval-04.md:8-22` — the fixture should say the child executed the lane
   directly rather than under work-run, or the "attempted no subagent
   call" premise reads as a contradiction to anyone assuming work-run at
   M tier.
5. SPEC §16's `[REPO_CONSTRAINTS]` slot is graded only obliquely
   (its consequences, not the slot's shape); worth a check when step 3
   lands.

### Step 2 — `dispatch-child.md`, the child-side clauses (2026-08-19)

One file touched: `skills/orchestrate/references/dispatch-child.md`.
`reviewer.md` untouched, as the step requires.

Inside the fence (the text every child is dispatched with):

- **§ No grandchildren rewritten** (SPEC §§1-3), retitled "No
  grandchildren — and the reviewers you DO run" so the heading itself
  carries both sides. Four beats: orchestration workers FORBIDDEN
  (`worker-start`, Tasks, Dispatches, anything carrying `worker_done`
  authority; a child never births a child) with the sibling-Task escape
  kept; the child's own in-session subagents REQUIRED at their tiers
  (work-run's per-step reviewer, work-verify's step-4 fresh-context
  review — same worktree, same session, sequential, invisible to Orca),
  with the parent's adversarial reviewer named as an ADDITIONAL
  cross-model seat and never a substitute; fence-READ vs
  refusal-OBSERVED, including the "not available to you until you have
  attempted it" line; and the genuine-refusal branch — step 4 recorded
  **NOT RUN** in PROGRESS.md with the runtime's exact refusal text
  quoted, reported to the parent, closed visibly by the parent's
  reviewer, never self-certified and never a PASS with the rung silently
  missing.
- **The absolute clause is gone.** The old closing "…ask the parent for
  a sibling Task instead of spawning anything yourself" was the string
  three of four children read as a total ban; `grep -in
  "spawn|yourself|anything itself"` over the file now returns only
  benign uses ("orchestrate's child spawn" in the wrapper prose, and
  "read your ticket yourself" / "push the PR yourself" / "run `orca
  orchestration check` yourself" / "report `worker_done` yourself").
  This is the ABSENCE eval-01:73 grades.
- **Verdict recorded verbatim** (SPEC §3): the in-session reviewer's
  verdict TEXT — the PASS/FAIL line and its findings — pasted into
  PROGRESS.md or DECISIONS.md, with MAT-46's "the re-review returned
  CONFIRMED" named as the failure being graded.
- **§ Heartbeat phases extended** with SPEC §5's cadence: beat at every
  phase transition AND at least every ~10 minutes while one phase runs
  long, with a repeated phase named as a valid signal rather than noise,
  and the consequence stated (beating only at transitions lets a healthy
  lane go dark for an hour and reads as idle from the parent's seat).
  The existing vocabulary paragraph is unchanged — the cadence is a
  second paragraph beside it, not a rewrite of MAT-62's fix.

Outside the fence: a **`## Contents` table of contents** (DECISIONS 5;
`reference/skills.md` line 25 — reference files >100 lines start with
one). It sits in the wrapper prose above the fence, so the dispatched
text is byte-identical to what a child would have received without it,
and it lists the nine fenced sections plus the Placeholders block, with
one line marking which side of the fence is authoring notes. Plain-text
bullets, following `ae-audit`'s `checklist.md`; anchor links would not
resolve, since the fenced headings are not markdown headings.

No new placeholder was introduced, so the **Placeholders:** list is
unchanged — `[REPO_CONSTRAINTS]` is step 3's interface change, not this
step's. File grew 125 → 179 lines; skill reference files carry no
≤120-line budget (that is `reference/`, SPEC line 173), only the TOC
rule this step satisfies.

Acceptance (PLAN step 2), both run here:

- `node -e "const s=require('fs').readFileSync('skills/orchestrate/references/dispatch-child.md','utf8');process.exit(!/never spawning anything yourself/.test(s) && /in-session/.test(s) && /verbatim/.test(s) && /10 minutes/.test(s) && /\[LANE_PATH\]/.test(s) && /\[TASK_BRIEF\]/.test(s) ? 0 : 1)"`
  → exit 0
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0

Other lane gates re-run at this step (not this step's acceptance, but the
lane keeps them green): `node tests/run-eval-checks.mjs` → exit 0,
`ok   orchestrate: 5 evals well-formed`; `node tests/run-lint-tests.mjs`
→ exit 0; `node tests/run-gen-tests.mjs` → exit 0.

Files changed: `skills/orchestrate/references/dispatch-child.md` (M).
`git status --porcelain` shows that file alone — no do-not-touch path in
the diff.

Concerns: none blocking. Two notes for later steps — (a) the fenced text
a child pays for grew by ~45 lines, which is the cost of the URGENT
ticket's content; if a later reviewer wants it shorter, the
fence-vs-refusal paragraph is the compressible one, not the two-sides
paragraph. (b) `skills/work-run/references/step-reviewer.md` is 111 lines
with no TOC — the same pre-existing drift DECISIONS 5 fixed here, on a
file this lane does not own; worth a follow-up ticket rather than a
silent fix inside this PR.

### Step 2 — fix round 1 (reviewer finding + parent ruling 1b, 2026-08-19)

Two inputs: the reviewer's one Important (blocking) finding, and the
parent's attempt-then-classify ruling that landed mid-review (DECISIONS
1b), for which SPEC §§1-2 were amended. Both are in
`skills/orchestrate/references/dispatch-child.md`, inside the fence; no
other file touched. 179 → 181 lines.

**1. The `Task` name collision (Important).** The forbidden list read
"No `worker-start`, no **Tasks**, no Dispatches…", and in the child's own
harness the subagent-dispatch tool is literally named `Task` — the exact
call the required reviewers need. A child skimming the forbidden list
could read the ban as covering its own step-4 reviewer, which is the
failure MAT-90 is urgent about. Now: **No `worker-start`, no Orca Tasks
(`task-create`), no Dispatches, nothing carrying `worker_done`
authority**. The escape hatch at the end of the same paragraph was
qualified for the same reason — "ask the parent for a sibling **Orca**
Task". `grep -nE "\bTasks?\b"` over the file now returns three hits, all
Orca-qualified: the two above and the wrapper-prose line 5, which sits
outside the fence and names `orca orchestration task-create` in the same
sentence. "Dispatches" was left as is — no tool-name twin.

**2. Attempt-then-classify (parent ruling, SPEC §2 as amended).** The
paragraph was retitled from "A fence is not a refusal" to **"Attempt
first, then classify"** and rewritten so the order is an instruction, not
a description: *before you conclude you cannot run a subagent, make the
call.* Two things changed in substance beyond the ordering:
- The rule now covers **any rule the child holds, from any source** —
  "this fence, a skill, a standing session-level instruction, any rule
  you hold from any source" — because the fourth occurrence
  (`mat-89-lint-accuracy`, DECISIONS 1b) cited a *session-level*
  no-Agent-tool rule, not this template's fence. A paragraph that only
  disclaimed its own fence would have missed that child.
- The principle is stated explicitly: "No rule you merely hold licenses
  'I cannot', because a capability is not disproved until it is tested".
The READ/OBSERVED contrast eval-04 grades is intact ("A rule you READ …
is not a refusal. A refusal is what you OBSERVED the runtime do once you
actually dispatched: the tool absent, the call declined"), and the
closure is kept verbatim in force: "my runtime will not let me" is not
available to you until you have tried.

**3. The two Minors in the same paragraphs.** The genuine-refusal branch
now names its channel — report it **in your `worker_done` body** (SPEC §2
as amended) — instead of the channel-less "report that to the parent";
and both rewritten paragraphs were reflowed. `awk 'length($0) > 72'` over
the whole file returns nothing, matching main's own 72-column fill (main
max: 72). The reviewer's other Minors (the `:67` forward reference, the
per-step-reviewer gap, the PLAN regex note) were left for work-verify
triage, as instructed.

**On the acceptance regex (informational).** The reviewer is right that
PLAN step 2's `!/never spawning anything yourself/` is vacuous — the
string actually deleted was "instead of spawning anything yourself", so
that guard would pass on an unedited file. It is still run because it is
the step's stated acceptance, but the absence is evidenced by grep
instead: `grep -niE "spawn|anything yourself|anything itself"
skills/orchestrate/references/dispatch-child.md` returns exactly one
line —

    3:**When to use:** orchestrate's child spawn — once the dispatch dialogue

— wrapper prose describing when a parent uses the template, outside the
fence. No spawn-prohibition phrasing survives anywhere in the dispatched
text.

Commands re-run after the fix, all here:

- `node -e "…!/never spawning anything yourself/… ? 0 : 1"` → exit 0
  (kept, with the caveat above)
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0
- `node tests/run-eval-checks.mjs` → exit 0, `all eval checks passed`
- `node tests/run-lint-tests.mjs` → exit 0
- `node tests/run-gen-tests.mjs` → exit 0
- `awk 'length($0) > 72 {print NR}'` on the file → no output
- `grep -nE "\bTasks?\b"` → 3 hits, all Orca-qualified (listed above)

Files changed: `skills/orchestrate/references/dispatch-child.md` (M).
No do-not-touch path in the diff.

Concerns: none. The section is now 38 lines of the fenced text; if a
later reviewer needs it shorter, the compressible paragraph is still the
attempt-then-classify one, but it is now the most-evidenced clause in the
lane (four occurrences across two waves) and should be the last cut.

## Evidence — Orca CLI verification (2026-08-19, this machine)

Every CLI claim this lane adds to the standard was produced by running
the command here, not inferred. Raw runs:

- `orca orchestration task-list --brief --json --run run_fafc4f70d4ac` →
  `ok: true`; `result` keys `runId, legacyReadOnly, tasks, count`; 35
  rows; each row's keys: `id, run_id, parent_id,
  created_by_terminal_handle, created_by_pane_key,
  created_by_process_incarnation, created_by_run_generation, task_title,
  display_name, spec, status, deps, result, created_at, completed_at,
  spec_truncated`. **No `title` key exists** — the exact field the
  external operator guessed (MAT-97).
- `orca orchestration worker-list --json --run run_fafc4f70d4ac` →
  `result` keys `workers, counts`; 36 rows; row keys `dispatchId, taskId,
  runId, workerState, dispatchStatus, agentTerminalHandle, terminalState,
  resource`.
- `orca worktree list --json` → `result` keys `worktrees, totalCount,
  truncated`; row keys include `id, path, head, branch, displayName,
  comment, linkedLinearIssue, workspaceStatus, parentWorktreeId,
  childWorktreeIds, lineage, git`.
- `orca orchestration worker-show --dispatch ctx_2b7ad61143ae --json` →
  `ok: true`, `result` keys `dispatch, worker, terminal, observation,
  terminalResource`. **`ctx_` ids are accepted** (MAT-97's stale
  2026-08-14 note is wrong).
- `orca orchestration worker-retain --help` / `worker-release --help` →
  both take `--dispatch <dispatch_id>`; nine rows in this Run sit at
  `releaseState: "retained"` / `retainedReason: "user_requested"`, a
  state only a successful `worker-retain --dispatch ctx_…` produces.
- `orca orchestration worker-start --help` → `--agent`, `--model`,
  `--effort`, `--terminal`; note: "`--model` supports Claude, Codex, and
  Cursor opaque provider model ids; `--effort` requires `--model`.
  Neither can combine with `--terminal`." **No argv passthrough**
  (MAT-96).
- `orca orchestration task-create --help` → `--spec <text>` only; **no
  `--spec-file`**; `task-update` changes state, not spec (MAT-98).
- Two-step provenance cost, measured by diffing two dispatches in this
  Run: `ctx_e818399d9132` (two-step, `mat-56-review`) reports
  `worker.effects` `worktree: reused`, `setup: not_applicable`,
  `terminal: reused`, and `resource.ownershipState: "external"` /
  `retainedReason: "external_terminal"`; `ctx_2b7ad61143ae`
  (`--worktree new-child`) reports `worktree: created_child` and
  `ownershipState: "user_owned"` / `retainedReason: "user_requested"`.

Baseline before any edit: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0.

## Verification

_(work-verify fills this section; the four gates are the lane's DoD and
their evidence lands here rather than as a feature_list row — DECISIONS
ruling 4.)_
