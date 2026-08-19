---
name: orchestrate
description: Runs the parent orchestrator role — binds an Orca Run, turns each lane into a Task with dependency queuing, asks the owner's dispatch dialogue (reviewers, count, model), births one child worktree per lane, supervises by mailbox, runs the review wave and a capped fix loop, then merges the lanes itself rebase-only. Use from the repo's main-worktree session — the parent seat, bound or not, since binding the Run is this skill's own step 0 rather than a precondition — when an M+ task must go to a child, when two or more independent lanes run at once (XL), or when someone says "dispatch this", "split this across agents", or "supervise the workers". Carries the manual fallback for machines without Orca.
---

# orchestrate

Every M+ task executes in a child worktree that a parent dispatches,
supervises, reviews, and merges. The parent implements nothing: its
checkout stays clean, the child holds the lane, the reviewer holds the
verdict, and no one holds two of those for the same lane.

The pairing: **orchestrate** = across children (one lane per child
worktree, on Orca's Run / Task / Dispatch primitives); **work-run** =
within one lane (a subagent per step, one worktree). A child may run
work-run inside itself. A child never dispatches a child.

## Workflow

Copy this checklist and tick items off:

```
Orchestrate progress:
- [ ] 0. Probe + bind the Run
- [ ] 1. Tier gate (S inline, M+ child)
- [ ] 2. Lane → Task (--deps queues file overlap)
- [ ] 3. Dispatch dialogue (reviewers, count, model)
- [ ] 4. Birth the child (worker-start, Linear, template verbatim)
- [ ] 5. Supervise by mailbox
- [ ] 6. Review wave → fix loop (cap 5) → decision gate
- [ ] 7. Merge rebase-only, in the parent's order
- [ ] 8. Release the worker, remove the worktree, record
```

**0. Probe and bind.** Probe once (`reference/orca.md`; the session hook's
`ORCA:` line counts). Binding is this step's own work, never a precondition
for reaching it: the seat makes the parent (`skills/using-ae` role rule), so
a fresh main-worktree terminal arrives here unbound and binds here. Then one
live Run per parent — never a second registration alongside it:

```bash
orca orchestration run-current --json                       # already bound?
orca orchestration run-create --objective "<repo + horizon>" --json
orca orchestration run-use --id <run_id> --json             # after a restart
```

Probe failed ⇒ the no-Orca fallback below, declared as such.

**1. Tier gate** (`reference/task-tiers.md`, ratchet one-way). **S**
resolves inline in the parent: one-line DoD + the existing verify command,
no lane, no Task, no child. **M and above** always goes to a child — the
tempting small diff most of all. Shaping (the design dialogue) happens
here, in the parent, before dispatch; execution never does.

**2. Lane → Task.** One lane `work/<slug>/` (issue key in the slug) ⇔ one
Task ⇔ one child ⇔ one worker.

```bash
orca orchestration task-create --spec "<the filled dispatch-child template>" \
  --task-title "<slug>" --deps '["<task_id>"]' --json
```

`--deps` is the file-overlap queue: two lanes that touch the same files are
never in flight at once — the later one depends on the earlier and is
dispatched when that one completes. Disjoint files ⇒ no deps, dispatch the
wave together. A dependency chain deeper than three or four means these are
stages, not lanes: run them as one lane instead.

**3. The dispatch dialogue.** One question to the owner before a child is
born, never a silent default:

> Adversarial reviewers for this lane — yes/no, how many, which model?
> Default: **1 ballena** (the house name for the cross-family reviewer
> seat, deepseek v4 flash; several of them are ballenas).

One question per lane; at XL one per batch, with a per-lane override.
Record the answer in the Task spec — it is what the review wave dispatches
later, and asking after the child is already working is asking too late.

**4. Birth the child.** Fill `references/dispatch-child.md` verbatim
(`[LANE_PATH]`, `[TASK_BRIEF]`, plus the optional `[REPO_CONSTRAINTS]`
section — filled or deleted whole); that filled text is the `--spec` above.
Then one command, with the provenance attached:

```bash
orca orchestration worker-start --task <task_id> --worktree new-child \
  --name <slug> --agent claude --setup run --json   # reference/runners.md
orca worktree set --worktree <new_worktree_id> --linear-issue <KEY> --json
```

`worker-start` exits 0 only for `ready` — read the receipt's stage,
effects, and residualResources instead of retrying blind. Bind the tracker
at birth: the child reads its own ticket (`orca linear issue --current`),
and a child told its ticket later was never bound. Never
`worktree create --agent --prompt` for a supervised child (that is a full
handoff: no Task, no Dispatch, no `worker_done` authority), and never a raw
`terminal send` brief.

Stock is the default, not a requirement. A child that genuinely needs argv
that `--agent`/`--model`/`--effort` cannot express — a wrapper binary,
custom flags — takes the reviewer seat's two-step launch instead
(`reference/runners.md` carries the recipe), on three conditions: the
reason is recorded at dispatch, closing the fallback shell is a required
step there, and the provenance cost is known rather than traded away
silently. That cost is measured, not asserted — two dispatches in this
repo's own Run, one each way:

- `worker.effects` records the worktree as `reused`, never
  `created_child`: the worktree was born outside the dispatch record.
- `setup` is `not_applicable` — repo setup hooks never run under the
  dispatch, so `--setup run` has to move onto the `worktree create`.
- `resource.ownershipState` is `external` with `retainedReason:
  external_terminal`, not `user_owned` / `user_requested` — the dispatch
  does not own the terminal, so teardown is the parent's manual job.
- `--model` and `--effort` are rejected with `--terminal`: the model
  choice leaves the dispatch record and lives in the argv, where nothing
  reads it back.

**5. Supervise by mailbox**, never by terminal:

```bash
orca orchestration check --wait --types "worker_done,escalation,question" \
  --timeout-ms 900000 --json
```

- Rolling waits, not polling. A timeout or `count: 0` is a checkpoint, not
  a failure — lanes routinely run 15-60 minutes. Silence is neither
  progress nor trouble.
- Process every message in the Delivery, then acknowledge and wait again
  (`check --ack <delivery_id> --wait …`) — the batch replays until acked.
- A `question` is answered with `reply --id <msg_id> --body "<ruling>"`.
  The ruling is the child's to record in its **own** DECISIONS.md; the
  parent never edits a child's files to answer it.
- Guidance the child needs mid-flight travels as structured mail —
  `send --to dispatch:<dispatch_id> --subject … --body …` — landing in
  its next `check`, never as an ad-hoc `terminal send`.
- Reading or writing the child's terminal to "check in" is the
  anti-pattern even when the handle works. `worker-read --dispatch <id>`
  exists to diagnose a worker you already suspect, not to supervise one.

**Idle is not slow, and it has a signature.** A cadence the child
established and then STOPPED, *plus* a `worker-read` transcript that has
not advanced between two reads minutes apart, is an idle child — a turn
that ended without reporting. Both signals are required: a long silence
alone, or one flat read, is still the rolling wait's business. The remedy
is the fix loop's mechanism pointed at the lane it already owns —
`task-create` with what is missing, then `worker-start --task <id>
--terminal <handle> --worktree <selector>` on its **existing** terminal —
never a raw `terminal send`, never a fresh child for a lane that has one.
The reason is structural: **an idle agent does not read its mailbox**, so
`send --to dispatch:<id>` cannot reach a session whose turn has ended. A
dispatched Task is the one call that resumes a finished turn.

**6. Review wave and fix loop.** On `worker_done` the child has pushed its
branch and opened its PR — and has not merged it.

Retain the child's terminal until the verdict lands
(`worker-retain --dispatch <id>`): release it now and the fix loop has
nowhere to go. Fill `references/reviewer.md` verbatim (`[LANE_PATH]`,
`[BRANCH]`, `[PR_URL]`), one Task per agreed reviewer, each on its own
read-only worktree cut from the lane branch. A reviewer whose model is
selectable with `--model` (Claude, Codex, Cursor ids) starts in one call;
the ballena needs custom argv, so it takes the two-step launch:

```bash
orca worktree create --name <slug>-review-<seat> --base-branch <lane-branch> \
  --parent-worktree active --setup run --json
orca terminal create --worktree id:<review_worktree_id> \
  --command "opencode -m opencode-go/deepseek-v4-flash --auto" --json   # reference/runners.md
orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 60000 --json
orca orchestration worker-start --task <review_task_id> --terminal <handle> --json
```

`<seat>` numbers each reviewer (`r1`, `r2`, …) so N>1 agreed reviewers
never collide on one worktree name. No OpenCode Go auth on the machine ⇒
same launch with `-m opencode/deepseek-v4-flash-free --auto`, the no-auth
fallback (`reference/runners.md`). The two-step create can leave an
unused fallback startup shell behind; where it does, closing it is a
**required step**, not advice — confirm that shell is actually unused
first (`orca terminal list --worktree <sel> --json` shows both), never
close it blindly, never leave it running as debris.

**Review-seat stall clock.** A ballena reviewer cannot heartbeat, so step
5's cadence rule cannot reach it — it is watched against a threshold
instead: 20-45 minutes is a normal review; 75+ minutes with an empty
orchestration transcript and `latestCursor: 0` is a stall, never a slow
review. Recovery: `worker-stop`, then remove the review worktree, then
`task-update --status ready`, then launch a fresh seat — never left
waiting past the threshold, never nursed on the same stalled seat.

The verdict is the PASS/FAIL line in the reviewer's `worker_done` **body**;
`--outcome` reports only whether the review itself finished. Route on the
body — an `--outcome succeeded` review that found blocking problems is a
FAIL for the lane.

FAIL sends the findings back to the **same** child — same worktree, same
agent terminal, a new Task on it — never a fresh child for a lane that
already has one:

```bash
orca orchestration worker-show --dispatch <child_dispatch_id> --json  # agent_terminal_handle
orca orchestration task-create --spec "<findings verbatim + lane path>" --json
orca orchestration worker-start --task <fix_task_id> --terminal <handle> \
  --worktree <selector> --json
```

One fix round plus one scoped re-review per round, **cap 5** (work-run's
loop, one worktree out). The re-review returns to the **same** reviewer
the same way the fix returned to the child: retain its terminal at the
verdict with `worker-retain --dispatch <id>`, then `worker-start --task
<re_review_task_id> --terminal <handle> --worktree <selector>` once it
has re-fetched the branch. Cutting a fresh `<slug>-review-<seat>`
worktree per round pays a new ballena five times to reread one lane.
Minor findings never enter the loop — they are deferred to the lane's
work-verify triage. At the cap the owner decides, through a gate rather
than a nudge:

```bash
orca orchestration gate-create --task <task_id> --question "<what is still open>" \
  --options '["merge as-is","keep fixing","drop the lane"]' --json
orca orchestration gate-resolve --id <gate_id> --resolution "<the owner's answer>" --json
```

Every gate ruling lands in the parent lane's DECISIONS.md. Nothing merges
over an open finding without one.

**7. Merge.** A PASS is not merge-ready by itself. Have the child rebase
onto fresh main and rerun its gates — after the rebase, not before — and
only then merge it yourself, rebase-only:

```bash
gh pr merge <pr-url> --rebase --delete-branch
```

Several children sitting at PASS merge in the order the parent chose
(anchor order, dependency order — decided, not arrival order), and the
whole tree's gates run again after the last one: parts passing is not the
whole passing. Feature-list rows flip to passing only from that merged
tree after the rerun — never from a lane branch checked out in isolation
before the last merge.

**8. Decommission and record.** Per merged lane, everything the lane
spawned goes — the child's dispatch and its worktree, and every reviewer
dispatch with its `<slug>-review-<seat>` worktree:
`orca orchestration worker-release --dispatch <id> --json`, then
`orca worktree rm --worktree <selector>` — an idle agent on a merged lane
is debris (`reference/orca.md`), and a retained ballena idles exactly as
expensively as the child. The child closed its own lane (work-handoff)
before reporting;
the parent records the merge, the reviewer verdicts, and every ruling in
its own PROGRESS.

## Several children at once (XL)

- **Anchors** frozen and NAMED before the first dispatch — the SPEC, the
  interface contracts, the feature list. No child may edit one; wanting to
  change one mid-flight stops the wave first.
- **Worker table** in the parent PLAN: lane · slug · child worktree ·
  branch · Task id · reviewer config.
- **The fill is mechanical at this scale, and expected to be.** Each
  filled spec runs ~15K chars; seven of them is ~105K chars of
  near-duplicate text, and hand-pasting that is what breaks the verbatim
  rule step 4 demands. Keep one per-repo common block, generate the
  filled specs from it, and make the generation **fail on any surviving
  placeholder** — a `[LANE_PATH]` or an empty optional section reaching
  `task-create` is caught before dispatch, not by the child. Feed the
  result as `--spec "$(cat <file>)"`: `task-create` takes `--spec <text>`
  only, there is no `--spec-file`, and `task-update` changes state, not
  spec. That form stands until an upstream `--spec-file` exists — an ask
  on Orca, not a gap this repo can close. Generating is a house
  convention, not a tool this skill ships.
- **Merge order** decided up front (item order, never arrival order) and
  one disagreement rule: **anchors win** — a child that drifted from a
  frozen interface reverts to it, and the divergence is recorded as a
  finding (perhaps the anchor was wrong; that becomes its own lane), never
  silently absorbed.
- **Synthesis gate** on the merged whole after the last merge: interface
  mismatches live between lanes, exactly where per-lane gates are blind.
- **Failure locality**: a stuck lane is redone or dropped, never repaired
  by reaching in from a sibling. Two lanes that keep needing each other
  were one lane.
- **One parent per repo.** Two parents over one main are two merge queues
  on one branch: allowed only with disjoint file scopes and disjoint lanes,
  agreed in writing; otherwise the second waits, or becomes a child.

## Orca is the ledger

The shell does not persist between calls, so ids are chained by
**rereading Orca**, not by writing them to a file beside the plan:
`task-list --brief --json`, `worker-list --json` and `worker-show
--dispatch <ctx_id> --json` each return the current state, and `ctx_`
dispatch ids are valid input to show, retain and release. Read the field
names off `reference/orca.md` rather than guessing one — a guessed name
comes back `undefined`, which reads exactly like an empty ledger
(`task_title`, never `title`).

The one human-readable copy the standard does prescribe is the **worker
table in the parent PLAN**. And the parent lane is committed like any
other lane: when the wave ends, the specs and briefs live in Orca and the
work lives in the children's merged branches — the parent's
PLAN/PROGRESS/DECISIONS are the only artifacts nothing else can rebuild.

## No-Orca fallback

No probe ⇒ no Run, no Task, no dispatch, no mailbox — and none of them
simulated. Say which steps did not happen ("no Orca — Run binding, Task
creation, worker-start and mailbox supervision were NOT done; needs an
Orca session or the operator"), then run the same lanes by hand:

1. **Qualify**, in writing in the parent PLAN: where does each unit work
   (disjoint files, or it is one unit)? how do the results merge (if a
   human untangles conflicts, the split is wrong)? who resolves
   disagreement (a named resolver and a rule, decided now)? A unit that
   consumes another's output is a stage, not a lane.
2. **Freeze the anchors** and write the worker table — with the runner's
   spawn command verified on this machine first (`reference/runners.md`).
3. **Reducer contract** before any work starts: each lane ends with a
   work-verify PASS block plus a 3-5 line summary in its PROGRESS; merge
   order; the disagreement rule; the synthesis gate.
4. **Execute sequentially** — the same lanes, the same four files, WIP=1,
   one at a time in this session, or handed to a runner that is actually
   installed. Never simulate a spawn or a worker report. A requested
   runner that turns out not to be installed is never silently swapped
   for whatever is — emit the full protocol ready to run (exact spawn
   commands, the lane list, the execution order) and declare execution
   explicitly NOT done.
5. **Review before merge** stays mandatory: work-verify's fresh-context
   review per lane, then merge in contract order and run the synthesis
   gate on the whole. Each lane still closes via `work-handoff` after
   that gate — the fallback's discipline doesn't end at the gate.

The automation is what is missing here. The discipline is not.

## Red flags

| Thought | Reality |
|---|---|
| "This M is two lines, I'll just do it here" | The parent implements nothing. M+ is a child, always. |
| "I'll peek at the child's terminal to see how it's going" | Supervision is the mailbox. A reachable handle is not permission. |
| "Nothing for 20 minutes — it's stuck" | A timeout is a checkpoint. Keep the rolling wait — unless an established cadence stopped AND the transcript is flat across two reads (step 5). |
| "The diff looks fine, skip the reviewer" | The reviewer was agreed with the owner at dispatch. Skipping it re-decides their call alone. |
| "Round 6 will converge" | Past 5 the failure is structural — gate it to the owner. |
| "The child reported PASS, merge it" | Rebase onto fresh main, rerun the gates, then the parent merges. |
| "Let the child merge, it is already green" | The child never merges. Not once, however clean. |
| "This half deserves its own child" (from a child) | No grandchildren: fold it into the lane, or ask the parent for a sibling Task. |
| "The child says no-grandchildren blocks its step-4 reviewer" | It misread the fence. The fence is orchestration workers; work-run's per-step reviewer and work-verify's step-4 review are in-session subagents, REQUIRED at their tiers. |
| "I'll keep a file of the wave's ids next to the PLAN" | Orca is the ledger; reread it. The one copy on disk is the worker table in the parent PLAN. |
| "No Orca here, so relax the ceremony" | Same lanes, same ceremony; the Orca-only steps are declared NOT done. |

## Judgment notes

- Token cost scales with children: prefer the fewest children that keep
  lanes genuinely independent, and queue overlapping ones with `--deps`
  rather than splitting finer.
- maker ≠ checker survives the parallelism: the child that built the lane
  never reviews it, and the parent that merges built neither.
- The reviewer seat is the one place a different model family pays
  (`reference/runners.md`) — a same-family reviewer inherits the maker's
  blind spots, which is what the ballena default is for.
- After compaction, trust the artifacts over recollection:
  `orca orchestration task-list --brief --json`, each lane's PROGRESS, and
  `git log` — never what a child said three hours ago.
