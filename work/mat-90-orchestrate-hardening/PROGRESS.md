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

### Step 2 — review verdicts (in-session, recorded verbatim, 2026-08-19)

**Round 0 — step reviewer.** Verdict text:

> ### Spec compliance
> ✅ Compliant
> […]
> **Step quality:** Needs fixes
>
> **Reasoning:** Every SPEC requirement (§§1-3, §5, the TOC) is
> implemented faithfully inside a still-fillable fence, both acceptance
> commands pass on re-run, and the rewrite is genuinely well-shaped — the
> contrast in the heading plus the fence/refusal distinction is the right
> structural answer to the production misread. The single blocking item
> is a one-word disambiguation at `:70`, where "no Tasks" names, under
> the child's own tool vocabulary, the call it is being required to make
> three lines later.

One Important finding (the `Task`/`task-create` naming collision), no
Critical. Five Minor deferred to work-verify triage.

**Round 1 — re-reviewer**, after the fix that also carried parent ruling
1b. Verdict text:

> ### Finding verdicts
> 1. **`Task` name collision in the forbidden list** — ADDRESSED. […]
>    `grep -noE "[A-Za-z-]*Tasks?[A-Za-z-]*"` over the whole file returns
>    three hits (lines 5, 70, 74); the fence runs lines 31-166, so line 5
>    (wrapper prose) sits outside the dispatched text, and the two hits
>    inside the fence are both Orca-qualified. No bare "Task"/"Tasks"
>    noun survives inside the fenced text.
> 2. **Attempt-then-classify (SPEC §§1-2, DECISIONS 1b)** — ADDRESSED.
>    […] the paragraph is retitled "Attempt first, then classify" and
>    opens with "Before you conclude you cannot run a subagent, make the
>    call" […] "A rule you READ — this fence, a skill, a standing
>    session-level instruction, any rule you hold from any source — is
>    not a refusal" […] "'my runtime will not let me' is not available
>    to you until you have tried".
> 3. **NOT-RUN channel naming + 72-column reflow** — ADDRESSED. […]
>
> ### New breakage in the fix diff
> None. […]
>
> ### Verdict
> **Fix round:** All findings addressed, no new Critical/Important
> breakage.

Step 2 closed at round 1 of a cap of 5.

**Deferred from step 2 to work-verify triage** (Minor, not looped):
`:67`'s forward reference to "the fence" before the term is defined; the
NOT-RUN branch covering step 4 but not work-run's per-step reviewer under
the same runtime refusal; and the vacuous PLAN acceptance regex below.

**Correction to the lane's own acceptance evidence.** PLAN step 2's
regex `!/never spawning anything yourself/` is VACUOUS — the string
actually removed was "instead of spawning anything yourself", so the
guard would have passed on the unchanged file. The deletion is real; the
regex is not evidence of it. The real absence evidence, run here:
`grep -niE "spawn|anything yourself|anything itself"
skills/orchestrate/references/dispatch-child.md` returns exactly one
line — `3:**When to use:** orchestrate's child spawn — …`, wrapper prose
outside the fence. work-verify must cite the grep, never the regex.
`feature_list.json` F01 carries the same vacuous clause and is corrected
at work-verify.

### Step 3 — the `[REPO_CONSTRAINTS]` slot (2026-08-19)

SPEC §16, the template's interface change. Two files:
`skills/orchestrate/references/dispatch-child.md` (the slot) and
`skills/orchestrate/SKILL.md` (one clause, see "Second file" below).

**Inside the fence — a new `## Repo constraints` section**, placed
between § The brief and § Push and PR. The placement is this step's
judgment call and was made deliberately: the block carries standing
per-repo fences (ports, house commands), so it belongs immediately
after the ask it bounds and above every orchestration-protocol
section — a child reads it before it starts working, not after.
Appending it at the end, past § Reporting done, would put standing
constraints below the report format.

The section is the slot plus one short closing paragraph: the rules
hold for every step of the lane, not just the step that trips over
them, and where one collides with the brief the child asks
(§ Questions) rather than choosing. That last line is the template's
own spine — never guess, ask — applied to the one place where two
binding inputs can disagree.

**Outside the fence, three consequences of the interface change:**

- The `## Contents` TOC added in step 2 gains `- Repo constraints
  (optional)` in its fenced position. A TOC that omits a section it
  should carry is a defect this step would otherwise have introduced.
- The **How to fill** note said "two things"; it now says two required
  slots plus an optional `[REPO_CONSTRAINTS]`, omitted whole.
- The **Placeholders:** list gains the declaration, written so the
  omit-entirely semantics are unambiguous (eval-05:73-76 grades "an
  empty optional section still in it" as a fill failure): *a fill has
  exactly two legal outcomes here: the section carrying that block, or
  the whole `## Repo constraints` section deleted — heading and
  closing paragraph included, not just the slot. A section left
  standing with nothing in it is a placeholder that survived.* Two
  outcomes, named, with no third state a generator could pass.

**Second file — `skills/orchestrate/SKILL.md`, one clause.** Step 4 of
the skill enumerated the template's fill slots as "(`[LANE_PATH]`,
`[TASK_BRIEF]`)". That enumeration is the template's only caller and
this step made it wrong, so it now reads "…plus the optional
`[REPO_CONSTRAINTS]` section — filled or deleted whole". This is the
interface change's own consequence, not step 6's content: none of step
6's four clauses (a)-(d) touch this line, and leaving a stale slot list
in the repo between commits is a defect this step introduces. Flagged
here so step 6 knows the paragraph already moved by one line.

Acceptance (PLAN step 3), both run here. The first, verbatim as the
step writes it:

````
node -e "const s=require('fs').readFileSync('skills/orchestrate/references/dispatch-child.md','utf8');const f=s.split('\n```')[1]||'';process.exit(/\[REPO_CONSTRAINTS\]/.test(f) && /OPTIONAL/.test(s) ? 0 : 1)"
````

→ exit 0. Splitting on the opening fence puts the dispatched body at
index 1, so the guard proves the slot sits INSIDE the fence rather
than in the authoring notes; `OPTIONAL` is matched against the whole
file, where it appears in the Placeholders declaration.

Second: `node scripts/agent-lint.mjs . --ignore
tests,templates,global,examples` → `0 high, 0 medium, 0 low — PASS`,
exit 0.

Other lane gates re-run after both edits: `node tests/run-eval-checks.mjs`
→ exit 0; `node tests/run-lint-tests.mjs` → exit 0;
`node tests/run-gen-tests.mjs` → exit 0. Step 2's acceptance regex
re-run as a regression guard → exit 0. `awk 'length($0) > 72'` over
`dispatch-child.md` → no output (main's 72-column fill held).

Files changed: `skills/orchestrate/references/dispatch-child.md` (M,
181 → 199 lines), `skills/orchestrate/SKILL.md` (M, +1 line).

**Do-not-touch check, and a correction for step 8.** The lane's own
changes touch no forbidden path — `git diff --name-only main...HEAD`
(three-dot) plus the dirty worktree lists only the three evals, the two
files above and the lane's own `work/` files. But PLAN step 8's check
is written with the TWO-dot `git diff --name-only main`, and that form
returns `scripts/agent-lint.mjs`, `tests/**` and
`docs/how-it-works/standard-lifecycle.md` here — not because this lane
touched them, but because local `main` has moved ahead of this branch's
base with sibling lanes' merged work (`git log main..HEAD` shows this
branch's seven commits touch none of those paths). Step 8 must use
`main...HEAD` or a `git merge-base` cutoff, or rebase first; the
two-dot form as written will fail on a clean lane.

Concerns: none blocking. One note — the closing paragraph inside the
fence is text the parent must delete along with the heading when the
repo has no standing block; the Placeholders entry names it explicitly
("heading and closing paragraph included") for exactly that reason, but
it is one more thing a careless fill can leave behind than a bare
heading would have been. Kept because a child receiving the block still
needs to be told the rules are binding across the whole lane, and what
to do when one collides with the brief.

### Step 3 — review verdict (in-session, recorded verbatim, 2026-08-19)

> ### Spec compliance
> ✅ Compliant — `dispatch-child.md:59-66` adds a `## Repo constraints`
> section **inside** the fence (fence opens at line 33, closes at 177)
> carrying a bare `[REPO_CONSTRAINTS]` marker, and `:188-194` declares it
> in the **Placeholders:** list as `OPTIONAL` with the omit-the-whole-
> section rule spelled out. […]
> […]
> **Step quality:** Approved
>
> **Reasoning:** The slot is inside the fence, declared, and its
> omit-entirely semantics are stated in terms that match the graded
> failure in eval-05 with no third state left open; both acceptance
> commands are green here, the fence-boundary risk that would have made
> the omit path dirty does not exist, and the single out-of-file edit is
> the interface change's own consequence with no other caller left stale.

Critical: none. Important: none. The reviewer specifically cleared the
one-line `SKILL.md` edit as "a necessary consistency fix, correctly
scoped — not creep", having grepped for other stale slot lists and found
none.

**Three Minor, deferred to work-verify triage:**

1. `dispatch-child.md:63-66` — a fill that deletes only the
   `[REPO_CONSTRAINTS]` line leaves the heading and its closing paragraph
   naming no rules. That artifact contains no bracket text, so the
   fail-on-placeholder check SPEC §14 requires would PASS it. Suggested
   one-edit fix: phrase the omit rule as an executable boundary —
   "delete from `## Repo constraints` through the blank line before
   `## Push and PR`". **Triage this one first: it is a hole in MAT-98's
   own requirement, not cosmetics.**
2. `dispatch-child.md:66` — "ask (below)" is looser than the file's own
   cross-reference convention; name the section.
3. PLAN step 3's acceptance guard is weaker than the requirement it
   certifies: `/OPTIONAL/.test(s)` runs against the whole file, unbound
   to the new slot, so it would still exit 0 if the declaration named the
   wrong placeholder. The text is right on inspection; the gate is not
   what proves it. (Second vacuous-guard finding in this lane — see the
   step 2 correction above.)

### Step 4 — `reference/orca.md`, the ledger read path (2026-08-19)

SPEC §§11-12. One file: `reference/orca.md`, 109 → **119** lines (budget
120, one line of slack left).

**New section `## The ledger read path (verified 2026-08-19)`**, placed
between the mapping table and the browser criterion — the mapping table
says which command does what, the read path says what comes back, so the
two sit together above the topic sections. A four-row table (`Read` /
`Rows at` / `Fields a parent reads`) carrying, verbatim from the
on-machine runs:

- `orca orchestration task-list --brief --json --run <run_id>` →
  `result.tasks[]`: `id`, `run_id`, `parent_id`,
  `created_by_terminal_handle`, `task_title`, `display_name`, `spec`,
  `status`, `deps`, `result`, `created_at`, `completed_at`,
  `spec_truncated` — closing with the bolded note **there is no `title`
  field; the name is `task_title`**, in the same cell as the field list
  so it lands where someone looking the name up will read it.
- `orca orchestration worker-list --json --run <run_id>` →
  `result.workers[]`: `dispatchId`, `taskId`, `runId`, `workerState`,
  `dispatchStatus`, `agentTerminalHandle`, `terminalState`, `resource`.
- `orca worktree list --json` → `result.worktrees[]`: `id`, `path`,
  `head`, `branch`, `displayName`, `comment`, `linkedLinearIssue`,
  `workspaceStatus`, `parentWorktreeId`, `childWorktreeIds`, `lineage`,
  `git`.
- `orca orchestration worker-show --dispatch <ctx_id> --json` →
  `result`: `dispatch`, `worker`, `terminal`, `observation`,
  `terminalResource`, with `worker.worktree_id`,
  `worker.agent_terminal_handle` and `worker.effects` closing the
  dispatch→worktree→terminal chain.

The column header is **"Fields a parent reads"** rather than "all
fields", deliberately: the live task row carries 16 keys and the live
worktree row 36, so listing the useful subset under a header that says
"all" would have been a new false claim in a doc whose whole point is
that guessed names cost trust. The worker-list and worker-show lists are
complete.

**The `ctx_` rehabilitation**, four lines below the table: "Orca is the
ledger — chain ids by rereading it. `ctx_` dispatch ids are valid input
to `worker-show`, `worker-retain` and `worker-release` (all `--dispatch
<dispatch_id>`): `worker-show --dispatch ctx_2b7ad61143ae --json`
returned `ok: true` here; a contrary 2026-08-14 note is stale." The
section heading carries the verification date for everything in it,
including that run, which is why the sentence says "here" rather than
repeating 2026-08-19 a second time inside the budget.

**Every field name was re-run on this machine before it was written**,
not copied on trust (the step permits re-running; the names matched the
Evidence section below exactly):

- `task-list --brief --json --run run_fafc4f70d4ac` → `ok: true`, row
  keys as listed, and `('title' in row)` → **false**.
- `worker-list --json --run run_fafc4f70d4ac` → `ok: true`, row keys as
  listed.
- `worktree list --json` → `ok: true`; 36 row keys, the twelve above
  among them.
- `worker-show --dispatch ctx_2b7ad61143ae --json` → `ok: true`,
  `result` keys `dispatch, worker, terminal, observation,
  terminalResource`; `worker` keys include `worktree_id`,
  `agent_terminal_handle`, `effects`.
- `worker-retain --help` / `worker-release --help` → both
  `Usage: … --dispatch <dispatch_id> [--retry-request <id>] [--json]`.

**The trim — 14 lines added, 5 freed, all from duplication** (DECISIONS
ruling 6). The fallback-shell rule spans *two* bullets in "Worktree and
terminal notes", so both were tightened; the decommission bullet is the
third. No command, flag, field name or rule was dropped:

| Bullet | Before | After | What moved |
|---|---|---|---|
| Prefer agent-first create | 4 lines | 3 | reordered so `--agent` owns the first terminal leads; "it can leave an unused fallback shell" → "it leaves a fallback shell" (the *close it* rule lives in the third bullet, and normatively in `skills/orchestrate/SKILL.md:145`) |
| Spawn-command inheritance | 5 lines | 3 | same four facts — machine policy, global layer `~/.claude/CLAUDE.md`, never a repo, close the shell after confirming it unused ("the confirmed-unused fallback shell"); the two-step's definition now back-references the bullet above instead of restating it |
| Decommission | 3 lines | 2 | same four facts — branch merged, card completed, close terminals, `orca worktree rm`, idle agents are debris (`SKILL.md:200-205` states it normatively) |

Nothing outside those three bullets was touched, and the 72/74-column
fill of the file is preserved (`awk '!/^\|/ && length($0) > 74'` over the
file returns nothing; table rows were already long).

Acceptance (PLAN step 4), run here verbatim:

```
node -e "const fs=require('fs');const s=fs.readFileSync('reference/orca.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/task_title/.test(s)&&/agentTerminalHandle/.test(s)&&/ctx_/.test(s)&&n<=120?0:1)"
```

→ **exit 0** (119 lines).

All four lane gates re-run after the edit:
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS`, exit 0;
`node tests/run-lint-tests.mjs` → exit 0;
`node tests/run-gen-tests.mjs` → exit 0;
`node tests/run-eval-checks.mjs` → exit 0, `all eval checks passed`.

Files changed: `reference/orca.md` (M). `git status --porcelain` shows
that file alone; `git diff --name-only main...HEAD` (three-dot,
DECISIONS ruling 7) lists no do-not-touch path.

Concerns: none blocking. Two notes — (a) the file is at 119 of 120, so
the next fact added to `orca.md` needs its own trim; the remaining
compressible material is the dev-server bullet, whose `orca terminal
create` reference duplicates the mapping table's "Long-lived process"
row, worth ~1 line. It was left untouched because it is outside the
duplication DECISIONS ruling 6 pre-identified. (b) The section states
the read path only; the *rules* built on it — Orca is the ledger, never
keep a parallel id file, the stateless shell — are SPEC §13, i.e. step
6's `SKILL.md` passage, which will cite this section rather than repeat
the table.

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
