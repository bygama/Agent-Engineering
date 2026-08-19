---
issue: MAT-90
---
# orchestrate hardening — MAT-90/95/96/97/98 — spec

<!-- Parent-shaped design (dispatch brief, 2026-08-19), formalized by the
     child lane in design-first mode. One lane, one PR, closes all five:
     every ticket lands on the same four surfaces (orchestrate's SKILL.md,
     its two templates, its evals) plus two reference docs, so splitting
     them would be five lanes queued behind each other on one file set. -->

Five production findings from the night of 2026-08-19 — four raised by
this repo's own children in a four-lane wave, one by an external operator
running `orchestrate` cold on another Run (`run_fb4b22519ace`, PEG
lote-27-38). Each is a place where the skill's text, not the operator,
produced the failure.

## Done looks like — MAT-90 (URGENT): the fence names both sides

1. **`skills/orchestrate/references/dispatch-child.md` § No grandchildren
   is rewritten to name both sides explicitly.** Forbidden: orchestration
   workers — `worker-start`, Tasks, Dispatches, anything carrying
   `worker_done` authority; a child never births a child. REQUIRED at
   their tiers: **in-session subagents** — work-run's per-step reviewer
   and work-verify's step-4 fresh-context review — which run in the
   child's own worktree, sequentially, and are invisible to Orca (MAT-40's
   recorded operating model). The parent's post-`worker_done` adversarial
   reviewer is an **ADDITIONAL cross-model seat, never a substitute** for
   step 4. The absolute closing clause "never spawning anything yourself"
   is dropped — it is the exact string children read as a total ban.
   **Four occurrences across two waves** (DECISIONS 1b): MAT-47's and
   MAT-87's children asked the parent at the gate; MAT-46's child only
   escaped because pre-emptive guidance had already been sent; and on
   2026-08-19 a fourth, the `mat-89-lint-accuracy` sibling of this very
   lane, hit the same rung while this fix was being written. All four
   stopped rather than self-certifying — the correct instinct against the
   wrong constraint — and all four cost a mailbox round-trip.

   The forbidden list must not name a bare "Tasks": in the child's own
   harness the subagent-dispatch tool is literally called `Task`, so the
   forbidden side has to say `task-create` / Orca Tasks explicitly. A
   child skimming "no Tasks" reads it as "do not call the Task tool" —
   which is the exact failure this ticket is urgent about.

2. **Attempt, then classify** — the order is imperative, not descriptive
   (parent ruling, DECISIONS 1b). The section instructs the child to
   **attempt the dispatch first** and only then classify what it
   observes: a **fence** is a rule the child *read* — **any** rule, from
   any source, not only this template's (the fourth child cited a
   session-level "no Agent tool" rule it had never tested) — and a
   **runtime refusal** is something the child *observed* after actually
   making the call. No rule a child merely holds licenses "I cannot"; a
   capability is not disproved until it is tested. Genuine-refusal case:
   record step 4 as **NOT RUN** with the runtime's exact refusal text
   quoted, report it **in the `worker_done` body** (the branch names its
   channel, as every other duty in the template does), and let the
   parent's cross-model reviewer close that rung visibly — never
   self-certify the gate, and never report PASS with the rung silently
   missing.

3. **Reviewer verdicts are recorded verbatim.** The child records the
   in-session reviewer's verdict **text** — the actual PASS/FAIL line and
   its findings — in PROGRESS.md or DECISIONS.md, not a claim about it.
   Evidence: MAT-46's ballena raised as a Minor that "the scoped re-review
   returned CONFIRMED" had no artifact anywhere in the repo; in-session
   verdicts live only in the child's session, so the lane's only evidence
   was the child's own word. That it happened to be corroborated by the
   parent's mailbox was good behavior, not a rule.

4. **`skills/orchestrate/SKILL.md` gains the parent-side reading** as one
   red-flags row: a child reporting that "no grandchildren" blocks its
   step-4 reviewer has misread the fence — the fence is orchestration
   workers; in-session subagents are required at their tiers. The existing
   row for a child asking to spawn its own child stays as written: that
   request is a worker, and it is still refused.

## Done looks like — MAT-95: heartbeat cadence, and the idle child

5. **Child side — cadence (`dispatch-child.md`).** MAT-62 fixed the
   heartbeat *vocabulary*; nothing fixed the *cadence*, so children beat
   only at phase transitions and a lane that legitimately stays in one
   phase goes dark. The template gains: heartbeat at every phase
   transition **and at least every ~10 minutes while a phase runs long**,
   phase unchanged — a repeated `implementing` is a valid and useful
   signal, not noise. N=10 is read off this wave's data: MAT-44's child
   beat every ~5 minutes for an hour, then went 40 minutes silent (last
   06:11Z, checked 06:51Z) while perfectly healthy inside RED-GREEN-
   REFACTOR probe cycles.

6. **Parent side — the idle diagnosis (`SKILL.md` step 5).** Step 5
   currently teaches only "silence is neither progress nor trouble",
   which is true of a child that never established a cadence and wrong
   about one that did. It gains the diagnosis: **an established cadence
   that STOPS, plus a `worker-read` transcript that has not advanced
   between two reads minutes apart, is an IDLE child, not a slow one.**
   Evidence: MAT-44's child, last heartbeat 06:11Z, last transcript output
   06:21Z, `workerState: ready` with the terminal `running`, no new
   transcript bytes across two `worker-read` calls 15 minutes apart, no
   PR, no `worker_done`.

7. **Parent side — the remedy.** Named in the same place: **dispatch a
   Task to its existing terminal** — the fix-loop mechanism,
   `task-create` then `worker-start --task <id> --terminal <handle>
   --worktree <selector>` — never a raw `terminal send`. The reason is
   structural and belongs in the text: **an idle agent does not read its
   mailbox**, so structured mail cannot reach a session whose turn has
   ended; a dispatched Task is the one call that resumes a finished turn.
   This is the mirror of MAT-56 (finished agents get released): an
   *unfinished* agent that stopped without reporting. Done live last
   night; this encodes it.

## Done looks like — MAT-96: the non-stock child runner

8. **The stance, decided and encoded.** Verified on this machine
   (`orca orchestration worker-start --help`, 2026-08-19): the flags are
   `--agent`, `--model`, `--effort`, with the CLI's own note "Neither can
   combine with `--terminal`" — there is **no argv passthrough**, so
   option (c) of the ticket describes a capability Orca does not have
   today. The encoded stance is **(b) as the default, (a) as the named
   exception**: the parent prefers a stock runner for the child seat
   (`--agent claude`, the standing convention) and reserves custom argv
   for reviewer seats; when a child genuinely needs a wrapper binary or
   flags `--agent`/`--model`/`--effort` cannot express, the two-step
   (`terminal create --command …` + `worker-start --terminal`) is
   **legitimate for children too**, on three conditions: the reason is
   recorded at dispatch, the fallback-shell close becomes a **required
   step** there as it already is for the reviewer seat, and the
   provenance cost is known rather than traded away silently.

9. **What the two-step actually costs, verified rather than asserted.**
   Measured here against the parent's own Run (`run_fafc4f70d4ac`) by
   comparing a `--worktree new-child` dispatch (`ctx_2b7ad61143ae`) with a
   two-step one (`ctx_e818399d9132`):
   - `worker.effects` records the worktree as `reused`, not
     `created_child` — the worktree's creation is outside the dispatch
     record;
   - `setup` is `not_applicable` — repo setup hooks never run under the
     dispatch (`--setup` is rejected for existing worktrees);
   - `resource.ownershipState` is `"external"` with `retainedReason:
     "external_terminal"` instead of `"user_owned"` — the dispatch does
     not own the terminal, so teardown is the parent's manual job;
   - `--model`/`--effort` cannot combine with `--terminal`, so the model
     choice moves out of the dispatch record and into the argv.

10. **The stance and its cost are visible where the parent decides.** Per
    the parent's approval ruling (DECISIONS 1), the four measured costs of
    §9 go in **`skills/orchestrate/SKILL.md`** itself — "a cost a parent
    can see is a cost a parent can accept deliberately" — not only in this
    lane's DECISIONS. **`reference/runners.md` § The child seat** states
    how a non-stock child runner is *launched* (today the file's two-step
    guidance lives only in the adversarial-seat section), carries the
    stance of §8, and cites the cost list rather than repeating it. The
    fallback-shell close is written as a **REQUIRED step**, not advice —
    two were left open live last night.

## Done looks like — MAT-97: Orca is the ledger

11. **`reference/orca.md` carries the field-name table**, every name
    verified by running the command on this machine (2026-08-19), because
    the external operator's one read attempt returned `title: undefined`
    for a field he guessed and he stopped trusting Orca for state:
    - `task-list --brief --json` → `result.tasks[]` rows carry `id`,
      `run_id`, `parent_id`, `created_by_terminal_handle`, `task_title`,
      `display_name`, `spec`, `status`, `deps`, `result`, `created_at`,
      `completed_at`, `spec_truncated`. **There is no `title` field** —
      that is the exact miss; the name is `task_title`.
    - `worker-list --json` → `result.workers[]` rows carry `dispatchId`,
      `taskId`, `runId`, `workerState`, `dispatchStatus`,
      `agentTerminalHandle`, `terminalState`, `resource`.
    - `worktree list --json` → `result.worktrees[]` rows carry `id`,
      `path`, `branch`, `displayName`, `linkedLinearIssue`,
      `workspaceStatus`, `parentWorktreeId` among others.
    - `worker-show --dispatch <ctx_id> --json` → `dispatch`, `worker`,
      `terminal`, `observation`, `terminalResource` — where
      `worker.worktree_id`, `worker.agent_terminal_handle` and
      `worker.effects` complete the chain.

12. **The `ctx_` rehabilitation, stated plainly.** `ctx_` dispatch ids
    ARE valid for `worker-show`, `worker-retain` and `worker-release`. The
    operator's contrary note is dated 2026-08-14 and is stale; nothing in
    our docs would have corrected it. Verified here: `worker-show
    --dispatch ctx_2b7ad61143ae` returns `ok: true`, and nine rows in the
    parent's Run sit at `releaseState: "retained"` /
    `retainedReason: "user_requested"` — a state only a successful
    `worker-retain --dispatch ctx_…` produces. `worker-release` takes the
    identical `--dispatch <dispatch_id>` argument.

13. **`SKILL.md` gains a short "Orca is the ledger" passage** that cites
    `reference/orca.md` rather than restating the table, plus:
    - the **stateless-shell line**: the shell does not persist between
      calls, so chain ids by **rereading Orca**, not by writing them to
      disk — this is the acknowledged constraint that produced four
      parallel JSON files ("los json nacieron como pasamanos, no como
      ledger, y después se quedaron");
    - a **red flag** row: "keeping a parallel file of ids" → Orca is the
      ledger; reread it. The human-readable copy belongs in the parent
      PLAN's **worker table**, the one record the standard does prescribe;
    - one line that **the parent lane gets committed like any other
      lane** — in that Run the parent's PLAN/PROGRESS/DECISIONS were the
      only irrecoverable artifacts, since specs, briefs and ids all live
      in Orca or in the children's committed lanes.

## Done looks like — MAT-98: bless the mechanical fill

14. **`SKILL.md` states that at wave scale the fill is expected to be
    mechanical.** Each filled spec is ~15K chars; seven of them is ~105K
    chars of near-duplicate text, and filling that by hand is what BREAKS
    the verbatim rule the skill demands — a surviving `[LANE_PATH]` is a
    real risk, not a hypothetical. The clause: keep a per-repo common
    block, generate the filled specs, and the generation **MUST FAIL on
    any surviving placeholder**. Generation is a house convention, not a
    shipped tool — no generator script is added by this lane.

15. **The CLI shape is stated honestly.** Verified here
    (`task-create --help`, 2026-08-19): the flag is `--spec <text>` only —
    there is no `--spec-file`, and `task-update` changes state, not spec.
    So `--spec "$(cat <file>)"` is the documented form until an upstream
    `--spec-file` exists; the ask is named as an upstream ask on Orca, not
    as something this repo can fix.

16. **`dispatch-child.md` gains an optional `[REPO_CONSTRAINTS]` slot**
    for the shared per-repo block (ports, house commands, standing
    fences) that today gets pasted into every brief by hand. Optional
    means the fill omits the section entirely when the repo has no such
    block — an empty section is a placeholder that survived.

## Done looks like — evals (before content, every commit)

17. **`skills/orchestrate/evals/eval-01.md`** (already grades the filled
    spec's standing clauses) gains checks that the filled spec names both
    sides of the no-grandchildren fence, requires verbatim recording of
    in-session verdicts, and carries the ~10-minute cadence rule.
18. **`skills/orchestrate/evals/eval-04.md`** (already grades the child's
    "let me spin up a child of my own" refusal) gains the contrast: the
    same child is still expected to run its work-verify step-4 reviewer
    in-session, and reading the fence as blocking it is the graded
    failure.
19. **New `skills/orchestrate/evals/eval-05.md`** grades the parent side
    at wave scale: the idle-child diagnosis and its Task-to-terminal
    remedy, Orca-as-ledger against a parallel id file, the mechanical
    fill with fail-on-placeholder, and the non-stock child runner stance.

## Constraints

- **Evals before content** on every commit that changes graded behavior:
  the eval commit lands before the content commit it grades, in history.
- **The two templates stay FILLABLE** — `dispatch-child.md` and
  `reviewer.md` keep their fenced, placeholder-marked body; no clause is
  turned into prose about the template.
- **Every claim about Orca's CLI is verified by running it here**, not
  inferred; commands and field names cite the on-machine run of
  2026-08-19.
- `reference/` docs hold their **≤120-line** budget (SPEC line 173);
  `reference/orca.md` is at 109 and needs room for §11's table, so its
  duplicated worktree/terminal bullets are tightened to fit.
- Skill reference files >100 lines start with a table of contents
  (`reference/skills.md`); `dispatch-child.md` crosses that line here.
- Do NOT touch: `scripts/agent-lint.mjs`, `tests/**`,
  `skills/ae-init/**`, `skills/ae-audit/**`, `skills/loop-setup/**`,
  `skills/using-ae/**`, `loops/**`,
  `docs/how-it-works/standard-lifecycle.md`, `CHANGELOG.md`, the
  AGENTS.md stamp, `global/`, `templates/`, `examples/`.
- The affected `docs/how-it-works/` chapter — `execution.md` — updates in
  the same change (repo hard constraint); no version bump, no restamp.
- All four gates exit 0 before the PR:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.
- PR body carries `Closes MAT-90`, `Closes MAT-95`, `Closes MAT-96`,
  `Closes MAT-97`, `Closes MAT-98` on separate lines; the child pushes and
  opens the PR, never merges.
