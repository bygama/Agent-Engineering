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
- [x] work-run: steps 1-8
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

**The trim — 14 lines added, 4 freed, all from duplication** (DECISIONS
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

### Step 4 — fix round 1 (reviewer findings, 2026-08-19)

One Important, two Minors, all in the lines this step touched. Both
content fixes are in `reference/orca.md`; the third is a correction to
this lane's own record. **`reference/orca.md` is now 120 of 120** — the
entry above says 119 with one line of slack, and that is superseded: the
Important fix costs the slack line.

**1. Important — the decommission bullet lost its subject, its referent
and its scope.** All three are restored, and the third one mattered
beyond wording. The bullet now reads:

    - Decommission the worker once its branch merged and the card is
      completed: close its terminals and `orca worktree rm` its child
      worktree — an agent idling there is debris.

- **Scope, the blocking half.** "Idle agents are debris" was unqualified,
  and this same lane's MAT-95 work (SPEC §§6-7, landing in step 6) teaches
  the opposite reflex for a *different* idle agent: a child whose
  established cadence stopped with an unadvanced `worker-read` transcript
  is resumed with a dispatched Task, not torn down. The two rules would
  have collided in the same PR. "An agent idling **there**" re-binds the
  claim to the sentence's own condition — a worker whose branch merged
  and whose card is completed — which is also how `SKILL.md:204-205`
  states it while citing this file ("an idle agent on a merged lane is
  debris (`reference/orca.md`)"). The cited authority is no longer
  broader than the text citing it.
- **Referent.** `orca worktree rm` **the** worktree had no antecedent in
  the bullet; it is `its child worktree` again. A destructive command's
  object should not be inferred.
- **Subject.** "close the terminals" → "Decommission **the worker** …
  close **its** terminals".

**2. Minor — a hedge became a certainty.** `:108-109` read "it leaves a
fallback shell"; the two-step *can* leave one, and `SKILL.md:144` — which
points at this file — still says "can leave an unused fallback startup
shell". Both words are back: "it **can** leave an **unused** fallback
shell". The bullet is still 3 lines; the fill was redistributed (the
`terminal create --command <agent>` code span now breaks after
`--command` instead of before it) so no line exceeds 74.

**3. Minor — the trim arithmetic in this lane's record was off by one.**
The step-4 entry above said "14 lines added, 5 freed"; its own table sums
to 4 (4→3, 5→3, 3→2), the hunk header was `-90,20 +104,16`, and
109 + 14 − 4 = 119, the count that was actually measured. Corrected to
"4 freed" in place. The earlier commit's message carries the same
off-by-one and was deliberately NOT amended — the record is corrected
going forward, per the controller's instruction.

**Deferred, not touched** (work-verify triage, per the controller): the
"Rows at" column header; the two sub-keys attested in SPEC/PROGRESS but
not in the raw-output block; and the step's guard passing even if the
`title` note were deleted.

Commands re-run after the fix, all here:

- acceptance, verbatim —
  `node -e "const fs=require('fs');const s=fs.readFileSync('reference/orca.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/task_title/.test(s)&&/agentTerminalHandle/.test(s)&&/ctx_/.test(s)&&n<=120?0:1)"`
  → **exit 0** (120 lines, at budget)
- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0
- `node tests/run-lint-tests.mjs` → exit 0
- `node tests/run-gen-tests.mjs` → exit 0
- `node tests/run-eval-checks.mjs` → exit 0, `all eval checks passed`
- `awk '!/^\|/ && length($0) > 74' reference/orca.md` → no output

Files changed: `reference/orca.md` (M),
`work/mat-90-orchestrate-hardening/PROGRESS.md` (M). No do-not-touch path
in the diff.

Concerns: the file now sits at exactly 120 of 120, so the next fact added
to `reference/orca.md` must free a line first. The cheapest honest
candidate remains the dev-server bullet, whose `orca terminal create`
reference duplicates the mapping table's "Long-lived process" row (~1
line) — still outside the duplication DECISIONS ruling 6 pre-identified,
so still not taken here.

### Step 4 — review verdicts (in-session, recorded verbatim, 2026-08-19)

**Round 0 — step reviewer.** Verdict text:

> ### Spec compliance
> ✅ Compliant — all four requested elements are present and correct.
> […]
> **Field-name cross-check against PROGRESS.md "## Evidence — Orca CLI
> verification" (the named risk): 4/4 clean.** Every one of the 13
> task-list fields, 8 worker-list fields, 12 worktree fields and 5
> `result` keys appears verbatim in the raw evidence, no typos, no
> invented names […]
>
> **Deletion audit (the other named risk): no command, flag, field name
> or rule disappeared.** […]
>
> **Step quality:** Approved
>
> **Reasoning:** The load-bearing half — the field table — is exact
> against the on-machine evidence, honestly scoped by its column header,
> and placed where a mid-wave operator will actually hit it; the
> compression preserved every command, flag, field name and rule […] The
> one real cost is in the decommission bullet, where "on a completed
> card", "child" and "workers" went with the line, leaving a destructive
> command without a referent and a rule that now reads more broadly than
> the idle-child remedy this same lane is adding.

One Important finding (the decommission bullet's lost scope, colliding
with this lane's own MAT-95 rule), no Critical.

**Round 1 — re-reviewer.** Verdict text:

> **1. `reference/orca.md` decommission bullet lost three scoping
> words** — ADDRESSED. […] Subject restored (`the worker` / `its
> terminals`), referent restored (`its child worktree`), scope restored
> (`there` binds the claim to "branch merged and card completed" […]).
> Cross-checked `skills/orchestrate/SKILL.md:204` directly […] the
> restored bullet is no longer broader than the citing text, and no
> longer collides with the MAT-95 different-idle-agent case.
> **2. hedge became certainty** — ADDRESSED. […] Both hedge words
> (`can`, `unused`) are back.
> **3. PROGRESS.md said "5 freed", real number is 4** — ADDRESSED. […]
>
> ### New breakage in the fix diff
> None. […]
>
> ### Verdict
> **Fix round:** All findings addressed, no new Critical/Important
> breakage. `reference/orca.md` is confirmed at exactly 120/120 lines —
> zero slack remains […] any later step touching this file must free a
> line before adding one.

Step 4 closed at round 1 of a cap of 5.

**⚠️ Standing fact for the rest of the lane:** `reference/orca.md` is at
**120/120**. No later step may add a line to it without freeing one.
Steps 5-7 do not touch this file.

**Three Minor, deferred to work-verify triage:** the table's "Rows at"
column header promises rows while `worker-show` returns one object;
`worker.worktree_id` / `worker.agent_terminal_handle` are attested in
SPEC §11 and the step-4 entry but not inside the raw-output block; and
PLAN step 4's guard would still exit 0 if the "there is no `title`" note
or the retain/release sentence were deleted (third vacuous-guard finding
in this lane).

### Step 5 — `reference/runners.md` § The child seat (2026-08-19)

SPEC §§8, 10. One file: `reference/runners.md`, 89 → **115** lines
(budget 120, five lines of slack left). `reference/orca.md` is at
120/120 and was NOT touched, per the standing fact recorded at step 4.

The section's existing paragraph — the `--agent claude` convention and
the recorded-reason rule for `--agent`/`--model`/`--effort` overrides —
is unchanged. Four beats were added after it:

- **The stance (SPEC §8), stated as (b) default + (a) named exception.**
  "Stock is the default, not a requirement. A child that genuinely needs
  argv those three flags cannot express — a wrapper binary, custom flags
  — takes the reviewer seat's two-step launch instead, in the runner's
  TUI form, with the argv reason recorded in the Task spec like any
  other override." Two conditions of the three land in that sentence
  (reason recorded at dispatch; the exception is named rather than
  silent); the third — provenance cost known — is the paragraph below
  the recipe. "In the runner's TUI form" is a three-word pointer at the
  trap this file already explains at `:29-38` (the headless `run` form
  leaves nothing to attach to), not a second copy of it.
- **The launch recipe**, mirroring the adversarial seat's in
  `skills/orchestrate/SKILL.md:133-138`, with the worktree beat made
  explicit ("Worktree first: a terminal is created *in* one") — the beat
  the step-1 reviewer flagged as missing from eval-05's sketch, and the
  structural reason the two-step's worktree shows as `reused`. Four
  commands: `worktree create --setup run --linear-issue <KEY>`,
  `terminal create --command "<runner argv>"`, `terminal wait --for
  tui-idle`, `worker-start --task <id> --terminal <handle>`. Binding the
  tracker at create time keeps SKILL.md step 4's "bound at birth" rule
  on this path without a second `worktree set` line.
- **The cost citation, not a copy** (SPEC §10): "`--setup run` belongs
  on the create because the dispatch will not run setup; that, and the
  rest of what this path trades away, is the cost list in
  `skills/orchestrate/SKILL.md` step 4 — read it before choosing it."
  The four measured costs are NOT enumerated here. The one that is named
  is named because the recipe has to say where `--setup run` goes; the
  other three are left to the parent's own decision point. Forward
  reference: step 6 writes that passage.
- **The fallback-shell close as REQUIRED wording** (DECISIONS 1, the
  parent's explicit ruling — two were left open in production):
  "Closing the fallback shell is a **required step here**, not advice".
  The confirm-before-closing half survives intact, with the read command
  that makes confirmation possible: "`orca terminal list --worktree
  <sel> --json` shows both. Confirm that shell is actually unused before
  closing it (`orca terminal close --terminal <handle>`) — never close
  it blindly, never leave it running as debris." No hedge ("consider",
  "remember to") anywhere in the paragraph.

**Two new CLI claims, both run on this machine before they were written**
(lane constraint: nothing about Orca's CLI enters a file unverified):

- `orca terminal --help` → subcommands include `list`, `close`.
- `orca terminal close --help` → `Usage: orca terminal close [--terminal
  <handle>] [--tab] [--json]`.
- `orca terminal list --help` → `Usage: orca terminal list [--worktree
  <selector>] [--limit <n>] [--include-visual-layouts] [--json]`.
- `orca worktree create --help` → `--name`, `--base-branch`,
  `--parent-worktree`, `--setup run|skip|inherit`, `--linear-issue`,
  `--json` all present as written.

The other three commands in the recipe (`terminal create --command`,
`terminal wait --for tui-idle`, `worker-start --terminal`) are copied
verbatim from `skills/orchestrate/SKILL.md:133-138`, already verified in
this repo, and `worker-start --help` was re-verified at lane start (see
Evidence below).

Acceptance (PLAN step 5), run here verbatim:

```
node -e "const fs=require('fs');const s=fs.readFileSync('reference/runners.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/--terminal/.test(s)&&/fallback shell/i.test(s)&&n<=120?0:1)"
```

→ **exit 0** (115 lines).

All four lane gates re-run after the edit:
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
→ `0 high, 0 medium, 0 low — PASS`, exit 0;
`node tests/run-lint-tests.mjs` → exit 0;
`node tests/run-gen-tests.mjs` → exit 0;
`node tests/run-eval-checks.mjs` → exit 0, `all eval checks passed`.

Fill check: `awk '!/^\|/ && length($0) > 78'` over the file returns only
the three pre-existing source-URL lines (`:5`, `:6`, `:8`) and the
`terminal wait` code line at 79, which is byte-identical to SKILL.md's.

Files changed: `reference/runners.md` (M). `git status --porcelain` shows
that file alone; `git diff --name-only main...HEAD` (three-dot,
DECISIONS ruling 7) lists no do-not-touch path.

Concerns: none blocking. One note for step 6 — this section now cites
"the cost list in `skills/orchestrate/SKILL.md` step 4" by name. If step
6 puts the four measured costs anywhere other than step 4 of the skill,
this citation goes stale and must move with it.

### Step 5 — review verdict (in-session, recorded verbatim, 2026-08-19)

> ### Spec compliance
> ✅ Compliant — every element the step names is present, and the
> acceptance guard exits 0 (re-run here: `lines 115`, `guard exit: 0`).
> […]
> **Recipe coherence** — followable end to end. `worktree create --json`
> → id feeds `terminal create --worktree id:…`; `terminal create --json`
> → handle feeds both `terminal wait --terminal` and `worker-start
> --terminal`; the `tui-idle` wait sits between launch and attach […]
> […]
> **Step quality:** Approved
>
> **Reasoning:** The ruling is encoded as decided — (b) default with (a)
> as a named, condition-bearing exception, all three conditions present,
> the fallback-shell close in REQUIRED wording with the confirm half
> intact, and the cost list cited to a location that exists and matches
> PLAN step 6's target. The recipe is executable in order, and the only
> defects are cross-file wording tension with `reference/orca.md` and a
> weak PLAN-authored guard, neither of which changes what an operator
> does.

Critical: none. Important: none. Controller also verified independently
that `orca terminal close --terminal <handle>` and `orca terminal list
--worktree <selector> --json` are real flag shapes on this machine.

**Five Minor, deferred to work-verify triage:**

1. **PRIORITY — cross-file contradiction.** `reference/orca.md:107-109`
   still calls this exact four-command sequence "the anti-pattern" while
   `runners.md:82-86` now prescribes it as a legitimate named exception.
   An operator reading both gets no reconciliation. orca.md is at 120/120
   and out of budget; runners.md has five lines of slack, so the fix
   belongs there — a half-clause such as "…the two-step
   `reference/orca.md` warns against, taken deliberately here."
2. **Carried into step 6's dispatch, not deferred.**
   `skills/orchestrate/SKILL.md:143-146` still says the reviewer-seat
   two-step "**can** leave an unused fallback startup shell" and is not
   marked required, while DECISIONS ruling 1 said REQUIRED wording. Does
   "both places" mean both seats?
3. PLAN step 5's guard is half-vacuous: `--terminal` already existed in
   the file before this change, so only the bare substring
   `/fallback shell/i` is load-bearing — the whole stance paragraph could
   be deleted and it would still pass. **Fourth vacuous-guard finding in
   this lane.**
4. `runners.md:94`'s `<task_id>` is never sourced in the snippet.
5. `runners.md:82-83` garden-paths: "needs argv **that** those three
   flags cannot express" costs one word.

### Step 6 — `skills/orchestrate/SKILL.md`, the four parent-side clauses (2026-08-19)

One file: `skills/orchestrate/SKILL.md`, 289 → **352** lines (cap <500,
lint rule `skill-size`). Four clauses plus the two red-flag rows, one
commit.

- **(a) Step 4 — the child-runner stance and the FOUR MEASURED COSTS**
  (SPEC §§8-10, DECISIONS ruling 1: "a cost a parent can see is a cost a
  parent can accept deliberately"). Placed **in step 4**, exactly where
  `reference/runners.md` cites it ("the cost list in
  `skills/orchestrate/SKILL.md` step 4") — that citation is NOT stale,
  no move needed. The stance is (b) default + (a) named exception with
  the three conditions in one sentence (reason recorded at dispatch,
  fallback-shell close a required step, provenance cost known), citing
  `reference/runners.md` for the launch recipe rather than repeating it.
  Then the four costs as four bullets, unchanged in substance from SPEC
  §9 / DECISIONS ruling 2, neither re-derived nor softened:
  `worker.effects` worktree `reused` never `created_child`; `setup`
  `not_applicable` so `--setup run` moves onto the `worktree create`;
  `resource.ownershipState` `external` / `retainedReason`
  `external_terminal` instead of `user_owned` / `user_requested`, so
  teardown is the parent's manual job; `--model`/`--effort` rejected
  with `--terminal`, so the model choice leaves the dispatch record for
  the argv.
- **(b) Step 5 — the idle diagnosis and the Task-to-terminal remedy**
  (SPEC §§6-7). A paragraph after the existing bullets: an established
  cadence that STOPPED **plus** a non-advancing `worker-read` transcript
  across two reads is an idle child; **both** signals required, so the
  existing "silence is neither progress nor trouble" bullet keeps its
  scope instead of being contradicted. The remedy names the fix loop's
  own mechanism inline (`task-create`, then `worker-start --task <id>
  --terminal <handle> --worktree <selector>` on the **existing**
  terminal), never a raw `terminal send`, never a fresh child. The
  structural reason is stated: an idle agent does not read its mailbox,
  so `send --to dispatch:<id>` cannot reach a session whose turn has
  ended; a dispatched Task is the one call that resumes a finished turn.
  Deliberately **no second code block** — step 6 already carries that
  exact three-command block a few lines below, and a duplicate would be
  two places to drift.
- **(c) New `## Orca is the ledger` section** (SPEC §13), placed between
  the XL section and the No-Orca fallback so the contrast reads in
  order. Carries the stateless-shell line (ids are chained by rereading,
  not by writing them to disk), the three read commands cited to
  `reference/orca.md` for the field names rather than restating the
  table, the `ctx_`-ids-are-valid line, the `task_title`-never-`title`
  miss named as the reason to read rather than guess, the worker table
  in the parent PLAN as the one prescribed on-disk copy, and the parent
  lane committed like any other lane (its PLAN/PROGRESS/DECISIONS are
  the only artifacts nothing else can rebuild).
- **(d) The mechanical fill** (SPEC §§14-15) as a bullet in "Several
  children at once (XL)" — the section whose subject is wave scale.
  ~15K chars per filled spec, ~105K for seven, hand-pasting is what
  breaks the verbatim rule step 4 demands; one per-repo common block,
  generate from it, and the generation **must fail on any surviving
  placeholder** (a `[LANE_PATH]` or an empty optional section reaching
  `task-create`). `--spec "$(cat <file>)"` is the documented shape, with
  the honest CLI statement: `task-create` takes `--spec <text>` only,
  there is no `--spec-file`, `task-update` changes state not spec.
  Generation named as a house convention, not a tool this skill ships.
- **The two red-flag rows** (SPEC §§4, 13): "The child says
  no-grandchildren blocks its step-4 reviewer" → it misread the fence
  (the fence is orchestration workers; in-session subagents are REQUIRED
  at their tiers); "I'll keep a file of the wave's ids next to the PLAN"
  → Orca is the ledger, reread it, the one on-disk copy is the worker
  table. The existing "This half deserves its own child" row is
  unchanged, as SPEC §4 requires.

**Open question from step 5's review (finding 2), decided: ruling 1
covers BOTH seats.** The reviewer-seat paragraph now reads "where it
does, closing it is a **required step**, not advice" — the same wording
`reference/runners.md` carries for the child seat. Reasoning: the
parent's ruling was "make the fallback-shell close REQUIRED wording, not
advice — an external operator left two of those open last night", and
the two left open in production were **reviewer** seats (that operator
was running a review wave). Leaving the reviewer seat at advice — the
seat where the two-step is the *normal* path rather than a named
exception — would put required wording only on the seat where the
failure has never been observed. The confirm-before-closing half
survives intact and is now more actionable: the vague
(`reference/orca.md`) pointer is replaced by the read command that makes
confirmation possible, `orca terminal list --worktree <sel> --json`,
mirroring the recipe in `reference/runners.md`. "Can leave … where it
does" is kept rather than asserting the shell always appears — `orca.md`
says "can leave", and required-to-close does not require
always-produced.

**One coherence fix in text this step touches.** The red-flag row
"Nothing for 20 minutes — it's stuck" said only "A timeout is a
checkpoint. Keep the rolling wait" — after (b) that row is the same
teaching SPEC §6 calls wrong for a child that HAD a cadence, so it gains
the exception clause "unless an established cadence stopped AND the
transcript is flat across two reads (step 5)". Without it a parent
reading the table alone reaches the opposite conclusion from step 5.

Acceptance (PLAN step 6), both commands run here verbatim:

```
node -e "const fs=require('fs');const s=fs.readFileSync('skills/orchestrate/SKILL.md','utf8');const a=s.split('\n');const n=a.at(-1)===''?a.length-1:a.length;process.exit(/ledger/i.test(s)&&/idle/i.test(s)&&/ownershipState/.test(s)&&/spec-file|--spec \"\$\(cat/.test(s)&&/placeholder/i.test(s)&&n<500?0:1)"
```

→ **exit 0** (352 lines).

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
```

→ `0 high, 0 medium, 0 low — PASS`, **exit 0**.

The other lane gates re-run after the edit: `node
tests/run-lint-tests.mjs` → exit 0; `node tests/run-gen-tests.mjs` →
exit 0; `node tests/run-eval-checks.mjs` → exit 0.

Width check: `awk 'NR>4 && !/^\|/ && length($0) > 78'` returns only six
pre-existing code-block lines; no line this step added exceeds 78.

Files changed: `skills/orchestrate/SKILL.md` (M). `git status
--porcelain` shows that file alone; `git diff --name-only main...HEAD`
(three-dot, DECISIONS ruling 7) lists no do-not-touch path.

Concerns: two, neither blocking.

1. **The acceptance guard is partly vacuous** — the fifth such finding
   in this lane. `/idle/i` already matched before this step (step 8's
   "an idle agent on a merged lane is debris") and `/placeholder/i`
   matched via step 3's `[REPO_CONSTRAINTS]` sentence. Only `/ledger/i`,
   `/ownershipState/` and the `--spec "$(cat` alternative are
   load-bearing; the whole idle-diagnosis paragraph could be deleted and
   the guard would still pass. The clauses are present and the diff
   shows them, but the guard is not what proves it.
2. **Step 7 (`docs/how-it-works/execution.md`) inherits three anchors**
   this step fixed in place: the cost list is in **step 4**, the idle
   diagnosis in **step 5**, and the fill clause lives in the XL section
   rather than in a dispatch stage — the stage 4/5 narration should
   follow those homes.

### Step 6 — review verdict (in-session, recorded verbatim, 2026-08-19)

> ### Spec compliance
> ✅ Compliant — all four clauses plus both red-flag rows are present and
> match the SPEC. […] I checked each cost against SPEC §9 and the
> DECISIONS ruling-2 table row by row: `worker.effects` `reused` not
> `created_child` ✓; `setup` `not_applicable` ✓; `ownershipState`
> `external` / `retainedReason: external_terminal` against `user_owned` /
> `user_requested` ✓; `--model`/`--effort` rejected with `--terminal` ✓.
> None softened, none re-derived […]
> […]
> **Step quality:** Approved
>
> **Reasoning:** All four clauses land where the SPEC puts them, the four
> costs are reproduced exactly as measured, the idle diagnosis requires
> both signals and composes cleanly with the surviving silence rule, and
> both acceptance commands pass on re-run. Both unrequested edits are
> defensible — one closes a gap the SPEC assumed shut, the other prevents
> an in-file contradiction the new paragraph would otherwise have
> created […]

Critical: none. Important: none.

**The two judgment calls, both cleared by the reviewer:**

- The reviewer-seat wording change is "correct reading, and the smallest
  coherent fix" — SPEC §8 asserted the child seat gets required wording
  "as it already is for the reviewer seat", but the reviewer seat's text
  was NOT required wording. **The SPEC's own premise was false until this
  edit made it true.** All three parts of the confirm-before-closing half
  survived.
- The red-flag row edit is "necessary coherence, not creep" — the
  unqualified teaching had a second copy in the table a parent scans;
  left alone the row and the new paragraph would have contradicted each
  other inside one file.

**Six Minor, deferred to work-verify triage:**

1. **PRIORITY — a required step with no command.** `SKILL.md:177-181`
   promoted the reviewer-seat close to "required step, not advice" but
   its command is `orca terminal list …`, which SHOWS shells and does not
   CLOSE one. `runners.md:104-105` names `orca terminal close --terminal
   <handle>`; SKILL.md now names neither it nor a pointer, at the one
   place it just raised the obligation.
2. **MUST CLOSE — SPEC §15's tail is unrepresented in any shipped text.**
   §15 asks that the `--spec "$(cat <file>)"` shape be framed as standing
   "until an upstream `--spec-file` exists; the ask is named as an
   upstream ask on Orca". Only SPEC.md carries that framing; the SKILL
   text presents the `cat` shape flatly. A DECISIONS line or a filed ask
   closes it.
3. `SKILL.md:146-147` — the resume Task's spec should name the lane path,
   mirroring the fix-loop block; a resumed idle child's turn has ended,
   so that spec is all the context it gets.
4. `SKILL.md:141-145` — the two signals are stated but not ordered; one
   clause ("the stopped cadence is what licenses the read") stops a
   literal parent from satisfying signal 2 by reading transcripts on a
   schedule, which is the anti-pattern three lines above.
5. `SKILL.md:110-111` — the `setup` bullet keeps the remedy and drops the
   reason (`--setup` is rejected for existing worktrees).
6. **Cross-file confidence divergence on the fallback shell:** SKILL.md
   and `orca.md` say the two-step "can leave" one; `runners.md:101-103`
   asserts it does. "Required to close" reads differently against
   "always produced" than against "sometimes produced". Reconcile the
   three. (Related to step 5's priority minor 1.)

**Fifth vacuous-guard finding:** PLAN step 6's guard matched `/idle/i`
and `/placeholder/i` before this step ran; only `/ledger/i`,
`/ownershipState/` and the `--spec "$(cat` alternative are load-bearing.

### Step 7 — `docs/how-it-works/execution.md`, the chapter follows the behavior (2026-08-19)

One file: `docs/how-it-works/execution.md`, 371 → **462** lines (length
budgets do not apply to `docs/how-it-works/`, AGENTS.md). Narration, not
a second copy of the skill: every addition is a "what to see" passage
about why a mechanism has the shape it has, and each one is written where
its anchor actually lives in `SKILL.md` rather than being relocated.

- **Stage 4 — the child-runner stance and why the two-step costs
  provenance** (SPEC §§8-10). A paragraph after the existing "What to
  see": the dispatch arrow in the diagram is the *default* shape, the
  default is a stock runner because the one-step dispatch is what records
  provenance, and a child needing argv the three flags cannot express
  borrows the ballena's launch from stage 6. The four measured costs are
  narrated rather than re-listed — `reused` not `created_child`, `setup`
  `not_applicable` (so `--setup run` moves onto the `worktree create`),
  `ownershipState` `external` not `user_owned` (teardown becomes stage
  8's manual job), `--model`/`--effort` rejected with `--terminal` — and
  then read together for what they MEAN: the two-step moves the child's
  birth, setup, teardown and runner out of the ledger and into the
  parent's memory, which is why the exception carries three conditions.
  Closes with the disambiguation the wording invites: this is not stage
  4's *own* pair of calls (`worker-start` + the Linear binding), which
  every dispatch makes. Two different "two"s in one stage, so the
  paragraph says so explicitly.
- **Stage 5 — the idle diagnosis and its remedy** (SPEC §§6-7). Framed as
  the cycle's second loop-back at stage 5: the rolling wait's rule is
  true of a child that never established a cadence and wrong about one
  that did; **both** halves of the signature are required (cadence
  established then stopped, AND a `worker-read` transcript flat across
  two reads minutes apart), so the existing rule keeps its scope. The
  remedy is the fix loop's mechanism on the child's existing terminal,
  with the structural reason spelled out — an idle agent does not read
  its mailbox, so `send --to dispatch:<id>` lands in a session whose turn
  is over; a dispatched Task is the one call that resumes a finished
  turn — plus the two negatives (never a raw `terminal send`, never a
  fresh child for a lane that has one) and the mirror to stage 8's
  release rule.
- **"Orca is the ledger"** (SPEC §13), narrated as a property of the
  *cycle*: every stage past 2 consumes an id an earlier stage produced
  while the shell does not persist, so the id file is the tempting move
  and the reason to refuse it is that a reread returns current state
  where a file returns what was true when written. The `title` /
  `task_title` miss is narrated for its consequence — `undefined` is
  indistinguishable from an empty ledger, which is how one guess makes
  Orca look like it is not holding state it is holding. Carries the
  `ctx_` line, the worker table as the one prescribed on-disk copy, and
  the parent lane committed like any other lane.
- **The mechanical fill** (SPEC §§14-15). Placed in this section per PLAN
  step 7's wording ("the section gains the ledger + mechanical-fill
  narration") but explicitly scoped to wave scale and pointed at its real
  home: "that rule sits with the XL section below rather than with stage
  4, because it is scale and not dispatch that makes it necessary."
  `SKILL.md` keeps it as an XL bullet; nothing was relocated. Names the
  optional-section-left-empty case as a surviving placeholder too (step
  3's interface) and states the CLI shape honestly (`--spec "$(cat
  <file>)"`; `task-create` takes `--spec <text>` only).

**Diagrams (PLAN note 3 — a diagram that contradicts the prose is worse
than one that omits it).** Both were checked against the new prose:

- The **sequenceDiagram** did contradict it: it showed the child always
  reaching `worker_done`, so the idle case had no shape on the page.
  Added one `opt` at stage 5 — `goes idle - cadence stopped AND
  transcript flat across two reads` → `task-create + worker-start
  --terminal <handle>`, with "a Task resumes a finished turn; mail
  cannot" as the second line. Placed inside the child's `activate` block,
  matching the existing `alt`/`else` style and the diagram's shorthand
  (stage 6's two-step line also omits `--task`).
- The **stage-4 arrow was left alone**: the two-step exception is drawn
  once already, in stage 6's `alt`, and a second copy would double the
  diagram's largest branch to say "same shape as above". The prose
  carries it instead, opening with "drawn at its default shape, not its
  only one" so the diagram is not read as exhaustive.
- The **topology flowchart** was left alone but its "What to see" gained
  one clause: its claim is that every arrow into a worktree is a
  `worker-start`, and the new exception could look like a
  counterexample. It is not — the two-step *ends* at `worker-start`, and
  that last call is the whole difference between a child and a handoff.
  Stating it keeps the flowchart's claim true instead of quietly weakened.

**Not touched:** `docs/how-it-works/standard-lifecycle.md` (lane B owns
it), `reference/orca.md`, `CHANGELOG.md`, the AGENTS.md stamp,
`scripts/`, `tests/`, `templates/`, `global/`, `examples/`, `loops/`,
and every skill on the lane's do-not-touch list. `architecture.md`'s
chapter-index row for `execution.md` was read and still describes the
chapter accurately ("orchestration (the parent/child dispatch cycle,
review wave, XL)"), so it needed no edit.

**Acceptance — all three clauses, run after the commit:**

```
$ grep -qi "idle" docs/how-it-works/execution.md          # exit 0
$ grep -qi "ledger" docs/how-it-works/execution.md        # exit 0
$ git diff --name-only main...HEAD -- docs/how-it-works/ | grep -q standard-lifecycle
                                                          # exit 1
```

Output: `idle exit: 0` · `ledger exit: 0` · `exit (expect 1): 1`. The
three-dot form is load-bearing (DECISIONS ruling 7) and
`git diff --name-only main...HEAD -- docs/how-it-works/` lists exactly
`docs/how-it-works/execution.md`.

**Gates re-run after the edit** (not required by this step's acceptance,
run anyway because the chapter is a linted surface):

```
$ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-90-orchestrate-hardening
0 high, 0 medium, 0 low — PASS
$ node tests/run-lint-tests.mjs   → all 16 cases passed
$ node tests/run-gen-tests.mjs    → all gen cases passed
$ node tests/run-eval-checks.mjs  → all eval checks passed
```

Commit: `46da62a docs(how-it-works): the dispatch cycle narrates the
ledger and the idle child`.

**Concerns.**

1. **PLAN step 7 and this step's note 1 point in slightly different
   directions on the mechanical fill.** PLAN says "the section" (§The
   8-stage dispatch cycle) "gains the ledger + mechanical-fill
   narration"; note 1 says the fill's real home is `SKILL.md`'s XL
   section, not a dispatch stage. Resolved by writing it in the named
   section but scoping it to wave scale and naming the XL home in the
   text itself. If a reviewer prefers the narration physically inside
   `### Several children at once (XL)`, it is a paragraph move with no
   rewording.
2. The mermaid `opt` was not rendered — this repo has no mermaid
   renderer in its gates. Syntax follows the block's existing
   `alt`/`else`/`end` and `&lt;`-escaping conventions exactly, and the
   label avoids a colon so the parser cannot mistake it for a message.

### Step 7 — fix round 1 (reviewer findings, 2026-08-19)

Three findings applied, all in `docs/how-it-works/execution.md`. Commit
`266685e fix(how-it-works): name the fill rule's document, not a section
of this one`.

- **Important — the fill-rule pointer named the wrong document.**
  `:369-370` read "That rule sits with the XL section below rather than
  with stage 4", and "below" resolves to *this chapter's*
  `### Several children at once (XL)`, which carries no fill rule; the
  rule's home is `skills/orchestrate/SKILL.md:252-261`. A reader
  following the pointer finds nothing and concludes the docs are stale.
  Now: "That rule lives with the skill's XL section
  (`skills/orchestrate/SKILL.md` § Several children at once) rather than
  with its step 4, because it is scale and not dispatch that makes it
  necessary." The section name is verified against
  `skills/orchestrate/SKILL.md:245` (`## Several children at once (XL)`).
  The paragraph did not move — the reviewer's ruling and mine agree that
  it belongs where PLAN step 7 put it. Worth recording plainly: my step-7
  report claimed this resolution ("naming the XL home in the text
  itself") and the text did not carry it. The claim was written from the
  intent, not from the file; that is the failure mode, not the wording.
- **Minor — the prose contradicted its own diagram.** `:316` said the
  idle loop-back is "the one the diagram would otherwise let you miss",
  which stopped being true the moment this step added the `opt` at
  `:239-241`. Now "the one the diagram alone would let you miss" — the
  diagram shows the remedy, the paragraph supplies the diagnosis that
  makes it readable.
- **Minor — the stage walk-through was left incomplete.** `:274-276`
  enumerated stage 5's loop-back as "on a question" only, while the new
  paragraph below opens "Stage 5 loops back a second way". Grafted: "`5`
  on a question (…) — and on an idle child, below — and `6` on a FAIL
  (…)". Both accounts now agree on the count.

Both edits reflowed their paragraphs, so those paragraphs were rewrapped
to the file's width rather than left with one over-long and one stub
line. No other text changed; the rewrap is visible in the diff as moved
line breaks with identical words.

**Reviewer-cleared, untouched:** the mermaid `opt` at `:238-241` (my
step-7 concern 2 — the reviewer audited participants, nesting, escaping
and label syntax independently and found nothing).

**Deferred to work-verify triage per the coordinator, untouched:** the
ragged rewrap at `:198-201`; the missing `--worktree <selector>` in the
narrated remedy at `:326-327`; the granularity of the four costs; the
`;`→`,` precaution in the `opt` label; the implicit subject in that
label.

**Covering commands re-run after the fix** (reviewers do not re-run
these):

```
$ grep -qi "idle" docs/how-it-works/execution.md          → exit 0
$ grep -qi "ledger" docs/how-it-works/execution.md        → exit 0
$ git diff --name-only main...HEAD -- docs/how-it-works/ | grep -q standard-lifecycle
                                                          → exit 1
$ git diff --name-only main...HEAD -- docs/how-it-works/  → docs/how-it-works/execution.md
$ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS
$ node tests/run-lint-tests.mjs   → all 16 cases passed
$ node tests/run-gen-tests.mjs    → all gen cases passed
$ node tests/run-eval-checks.mjs  → all eval checks passed
```

Step-7 concern 1 (PLAN vs. note 1 on where the fill narration belongs) is
resolved rather than standing: the reviewer confirmed the paragraph stays
in §The 8-stage dispatch cycle and only the pointer needed naming.

### Step 7 — review verdicts (in-session, recorded verbatim, 2026-08-19)

**Round 0 — step reviewer.** Implementer reported DONE_WITH_CONCERNS;
both concerns were judged.

> ### Spec compliance
> ✅ **Compliant** — all three acceptance checks hold from the diff
> alone. […] I verified all three anchors are in their real homes before
> judging the narration: four costs at `SKILL.md:99-117` (step 4), idle
> diagnosis + remedy at `SKILL.md:141-152` (step 5), mechanical fill at
> `SKILL.md:252-261` (§Several children at once, XL) […] No new or
> drifted claim.
>
> **Concern 1** […] the placement is fine; the pointer sentence is not.
> […] the implementer's own stated resolution — "naming the XL home in
> the text itself" — was not actually carried out. […] the sentence sends
> the reader to a place the content is not.
>
> **Concern 2 — the mermaid `opt`: I found nothing further.** Both
> participants declared at `:224-225`, well before use; `->>` is a plain
> solid message, valid inside `opt` and inside an activation span; the
> `opt` label carries no `:` […]; the `opt` nests cleanly inside
> `activate C`/`deactivate C` without crossing a block boundary;
> escaping is character-for-character the shape of the working line […]
>
> **Step quality:** Needs fixes
>
> **Reasoning:** The narration is substantive, accurate against SPEC
> §§6-9/11-15, and consistent with `SKILL.md` and the diagrams — the only
> blocking item is one clause at `:369-370` that directs the reader to an
> XL section that does not hold the rule […]

**Round 1 — re-reviewer.** Verdict text:

> 1. **stale pointer** — ADDRESSED. […] names the document
>    (`skills/orchestrate/SKILL.md`) and cites the section title
>    verbatim, matching the actual heading confirmed at `SKILL.md:245`
>    […] The paragraph itself did not move […]
> 2. **diagram self-contradiction** — ADDRESSED. […] Word-level diff of
>    that hunk shows exactly one deletion (`otherwise`) and one addition
>    (`alone`) […]
> 3. **incomplete loop-back description** — ADDRESSED. […]
>
> ### New breakage in the fix diff
> None. Verified via a scripted word-level diff (LCS-based) over each of
> the three hunks […] Hunk 3 […] `stage`→`step` (correctly matching
> SKILL.md's own terminology — SKILL.md:255 itself calls it "step 4", so
> this is not a stray inconsistency but a deliberate disambiguation
> between this chapter's "stage 4" and the skill's "step 4").
>
> The implementer's claim that only line breaks moved beyond the three
> intended edits holds up under this word-diff, confirming "rewrap, not
> rewrite."
>
> ### Verdict
> **Fix round:** All findings addressed, no new Critical/Important
> breakage.

Step 7 closed at round 1 of a cap of 5. The word-level diff surfaced a
third edit (`stage`→`step`) the fix report had not named; it is correct
and deliberate.

**Five Minor, deferred to work-verify triage:** the ragged rewrap at the
old `:198-201`; the narrated remedy at `:326-337` dropping `--worktree
<selector>` that SPEC §7 and `SKILL.md:147-148` both carry; the four
costs reproduced at nearly the skill's own granularity; a `;`→`,`
precaution in the mermaid line (no known break); and the implicit subject
in the `opt` label.

### Step 8 — gate sweep and fence check (2026-08-19)

Verification step only; nothing fixed, nothing else touched. Working
tree was clean before and after (`git status --short` empty both
times).

**Gate 1 — `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`**

```
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-90-orchestrate-hardening
0 high, 0 medium, 0 low — PASS
```

Exit 0.

**Gate 2 — `node tests/run-lint-tests.mjs`**

```
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
ok   pointer-fenced repo passes (fenced tool-managed block exempted)
ok   pointer-unfenced repo still fails (unfenced extra content over budget)
ok   pointer-unclosed repo still fails (unmatched BEGIN is not an exemption)
ok   malformed lanes fail
ok   invalid feature list fails
ok   global-layer CLAUDE.md passes its own canon
ok   clean DESIGN.md passes
ok   drifted/undated DESIGN.md fails
ok   dangling-ref/ungenerated DESIGN.md fails
ok   DESIGN.md with mode groups passes
ok   kitchen-sink composite fires the planted set
all 16 cases passed
```

Exit 0.

**Gate 3 — `node tests/run-gen-tests.mjs`**

```
ok   fixture parses without errors
ok   tailwind4 output matches design.tokens.css
ok   cssvars output matches expected-cssvars.css
ok   dangling reference is reported
ok   modes fixture parses without errors
ok   modes tailwind4 output matches design.tokens.css
ok   modes cssvars output matches expected-cssvars.css
all gen cases passed
```

Exit 0.

**Gate 4 — `node tests/run-eval-checks.mjs`**

```
ok   ae-audit: 4 evals well-formed
ok   ae-init: 7 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 5 evals well-formed
ok   shaping: 4 evals well-formed
ok   skill-authoring: 5 evals well-formed
ok   using-ae: 6 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
```

Exit 0.

**Fence check — three-dot diff (DECISIONS ruling 7)**

`git merge-base main HEAD` → `9fc4bda` (unchanged branch point; local
`main` has since moved further, to `af9e157`, as more sibling lanes
merged — exactly the drift ruling 7 predicted, confirming the two-dot
form would have blamed those lanes' files on this one).

Command: `git diff --name-only main...HEAD | grep -E
'^(scripts/agent-lint\.mjs|tests/|skills/(ae-init|ae-audit|loop-setup|using-ae)/|loops/|docs/how-it-works/standard-lifecycle\.md|CHANGELOG\.md|global/|templates/|examples/)'`

Output: (empty — no match)
Exit 1.

Full file list from `git diff --name-only main...HEAD` (13 files, this
lane's entire surface):

```
docs/how-it-works/execution.md
reference/orca.md
reference/runners.md
skills/orchestrate/SKILL.md
skills/orchestrate/evals/eval-01.md
skills/orchestrate/evals/eval-04.md
skills/orchestrate/evals/eval-05.md
skills/orchestrate/references/dispatch-child.md
work/mat-90-orchestrate-hardening/DECISIONS.md
work/mat-90-orchestrate-hardening/PLAN.md
work/mat-90-orchestrate-hardening/PROGRESS.md
work/mat-90-orchestrate-hardening/SPEC.md
work/mat-90-orchestrate-hardening/feature_list.json
```

No do-not-touch path appears. All ten of this lane's owned non-lane
surfaces (`docs/how-it-works/execution.md`, `reference/orca.md`,
`reference/runners.md`, `skills/orchestrate/SKILL.md`, the three eval
files, `dispatch-child.md`) are accounted for, plus the four lane
files (`DECISIONS.md`, `PLAN.md`, `PROGRESS.md`, `feature_list.json`)
that every step's own commits update.

**Budgeted file line counts** (`wc -l`):

```
  120 reference/orca.md
  115 reference/runners.md
  352 skills/orchestrate/SKILL.md
  199 skills/orchestrate/references/dispatch-child.md
```

- `reference/orca.md` — 120/120 cap. At the cap, as PROGRESS's step 4
  entries expected.
- `reference/runners.md` — 115/120 cap. Under cap.
- `skills/orchestrate/SKILL.md` — 352/500 cap. Under cap.
- `skills/orchestrate/references/dispatch-child.md` — 199 lines.
  DECISIONS ruling 5 records it was already at 125 lines pre-lane with
  no numeric cap set for `skills/*/references/` files (unlike the three
  `reference/*.md` and `SKILL.md` caps above); this lane added the
  `[REPO_CONSTRAINTS]` slot (step 3) and a table of contents (ruling 5),
  growing it to 199. No cap violation to report — the file carries no
  stated ceiling in SPEC/PLAN/DECISIONS.

**Eval-before-content constraint.** Held: every eval commit in this
lane landed before the content commit it grades. Verified via `git log
$(git merge-base main HEAD)..HEAD --reverse --oneline` (two-dot from
the branch point, not the log form of three-dot, which pulls in
sibling-lane commits reachable from `main` too and would misorder this
check). The single evals commit touching `skills/orchestrate/evals/`,
`d5b454c test(orchestrate): evals first — the fence has two sides, and
the wave has a parent`, is the second commit in the lane's history and
precedes all seven commits that touch `SKILL.md`,
`dispatch-child.md`, `reference/orca.md`, or `reference/runners.md`
(`3fc0ede`, `2f089a0`, `7fae08b`, `75ec2dd`, `dc301e7`, `74c2a96`,
`90f7785`), confirmed by `git log <MB>..HEAD --oneline -- <path>` on
each side.

Nothing to fix; nothing found to repair. All four gates exit 0, the
fence check exits 1 (no fenced path in the diff), and the two budgeted
caps with numeric ceilings are both respected.

### Fresh-context review — the five findings landed (2026-08-19)

The lane PASSED its fresh-context review. Five findings were dispositioned
here before handoff: four Important, one MUST-CLOSE Minor. Each is a one-
to two-line edit; the reviewer named the fix in every case and each fix is
the one named.

**F1 (Important) — F01's verification was not shell-portable.**
`feature_list.json:5` carried `\\s+` in the JSON string, which decodes
to `\s+`, so the shell handed node `.replace(/\s+/g,' ')`. POSIX `sh`
collapses `\`→`\` inside double quotes and node saw `/\s+/`; `cmd.exe`
and PowerShell do not, so node saw a regex matching a literal backslash
followed by `s`, the haystack was never normalized, and `/NOT RUN/` failed
against the reflowed `**NOT\nRUN**`. One character: the JSON now carries
`\s+`, so the command carries `/\s+/g` on every shell. Proved all three
properties here rather than asserting them:

- bash, current file → `BASH EXIT=0`
- PowerShell, current file → `PWSH EXIT=0`; cmd.exe, current file →
  `CMD EXIT=0` (and `execSync` on Windows runs the five rows through
  `cmd.exe`, which is the fourth independent confirmation)
- pre-lane file (`git show 9fc4bda:skills/orchestrate/references/dispatch-child.md`,
  125 lines, materialized under the same relative path) → `BASH PRE-LANE
  EXIT=1` and `PWSH PRE-LANE EXIT=1`

So the ruling-8 proof survives the correction: still red before the
change, green after, now on every shell instead of one.

**F2 (Important) — the standard contradicted itself on the two-step.**
`reference/orca.md:107-109` states flatly that bare `worktree create` plus
a later `terminal create --command <agent>` is the anti-pattern;
`reference/runners.md` § The child seat prescribes exactly that four-
command sequence as MAT-96's named exception, and `SKILL.md` blesses it —
with neither side referencing the other, so an operator reading `orca.md`
alone would refuse the exception MAT-96 exists to authorize. Fixed in
`runners.md` only, because `orca.md` is at 120/120 with zero slack: the
child-seat section now names the anti-pattern in `orca.md`'s own words,
concedes it as the default, and claims itself as its one named exception,
on the conditions above and below it. `runners.md` 115 → 119 lines, budget
≤120 held; `orca.md` untouched at exactly 120.

**F3 (Important) — the omit rule had no boundary a generator can execute.**
A fill that deleted only the `[REPO_CONSTRAINTS]` line left `## Repo
constraints` plus its closing paragraph standing — an artifact with no
bracket text in it, which `SKILL.md`'s "fail on any surviving placeholder"
passes when the check is a bracket scan. The prose was already right; what
was missing was a checkable boundary. The **Placeholders:** entry (wrapper
prose, below the fence — the template stays FILLABLE, the fenced text is
byte-identical) now states the cut executably: delete every line from
`## Repo constraints` through the blank line before `## Push and PR`, and
the generator's check here is "`## Repo constraints` absent, OR
`[REPO_CONSTRAINTS]` replaced", never brackets alone. That is the boundary
the lane's own step-3 reviewer proposed.

**F4 (Important) — the urgent clause had no eval guarding it.** SPEC §1 ¶2
is explicit that the forbidden list must not name a bare "Tasks", because
the child's own subagent tool is literally called `Task`.
`dispatch-child.md:81-82` implements it correctly, but `eval-01.md:66-68`
and `eval-04.md:41-43` wrote the forbidden list in their *own* expected-
behavior text using a bare "Tasks" — so a spec that regressed to the
ambiguous form would have been graded PASS. Both now pin it: eval-01's
existing check says "Orca Tasks pinned to `task-create`" and gains a
dedicated check whose failure condition is a forbidden list reading "no
Tasks" without `task-create` or an equally explicit Orca qualifier;
eval-04's contrast check names the fence as `worker-start` / Orca Tasks —
`task-create` — / `worker_done` authority and states that naming it with a
bare "Tasks" FAILS. The lane's most urgent requirement now has a guard on
both sides of the fence.

**F5 (MUST CLOSE Minor) — SPEC §15's tail was in no shipped file.** §15
asks that `--spec "$(cat <file>)"` be framed as standing until an upstream
`--spec-file` exists, with the ask named as an upstream ask on Orca.
`SKILL.md:260`, `execution.md:374` and `eval-05.md:79` all carried the flat
statement that no `--spec-file` exists, none carried the framing; the
step-6 reviewer marked it MUST CLOSE and no disposition was recorded
anywhere. Closed in `skills/orchestrate/SKILL.md`: the form "stands until
an upstream `--spec-file` exists — an ask on Orca, not a gap this repo can
close". SKILL.md 352 → 354 lines, cap 500.

**Gates, re-run after all five edits — all four exit 0:**

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  → `0 high, 0 medium, 0 low — PASS`, exit 0
- `node tests/run-lint-tests.mjs` → `all 16 cases passed`, exit 0
- `node tests/run-gen-tests.mjs` → `all gen cases passed`, exit 0
- `node tests/run-eval-checks.mjs` → `ok   orchestrate: 5 evals
  well-formed` … `all eval checks passed`, exit 0

**All five feature_list rows exit 0** (driven through `execSync`, i.e.
`cmd.exe`): `F01 EXIT=0 · F02 EXIT=0 · F03 EXIT=0 · F04 EXIT=0 ·
F05 EXIT=0`.

**Fence check** — `git diff --name-only $(git merge-base main HEAD)...HEAD
| grep -E '<fenced paths>'` exits 1: no do-not-touch path in the lane's
diff. `state` and `evidence` in `feature_list.json` were not touched; the
controller records those.

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

### 2026-08-19 — L DoD — PASS

- **L1 static:** `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` → exit 0 (`0 high, 0 medium, 0 low —
  PASS`)
- **L2 behavioral:** `node tests/run-lint-tests.mjs` → exit 0 (`all 16
  cases passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`ok   orchestrate:
  5 evals well-formed`, `all eval checks passed`)
- **L2 feature rows (the L-tier DoD):** all five `verification` commands
  → exit 0, run twice — once under bash, once through `cmd.exe` from
  PowerShell — after the portability fix. F01 additionally exits **1**
  against the pre-lane file (`git show
  9fc4bda:skills/orchestrate/references/dispatch-child.md`) on both
  shells: red before the change, green after.
- **L3 end-to-end:** n/a — this lane ships markdown (skill text, two
  fillable templates, two reference docs, one how-it-works chapter). It
  has no runtime and crosses no component boundary; the executable
  surface is the evals and the gates, both run above. Recorded as a
  decision rather than silently omitted.
- **Fence check:** `git diff --name-only 9fc4bda..HEAD | grep -E
  '<do-not-touch>'` → exit 1, no output. Thirteen files in the lane, none
  fenced. `git diff --name-only 9fc4bda..HEAD -- AGENTS.md` → empty (the
  version stamp is untouched).
- **Evals before content:** HELD. The only commit touching
  `skills/orchestrate/evals/` is `d5b454c`, the 2nd of the lane's
  commits; every content commit lands after it.
- **Fresh-context review:** **PASS** — dispatched with no shared
  conversation, ran every gate and every feature row itself, and
  independently re-ran the lane's Orca claims against this machine rather
  than trusting PROGRESS. Its own words:

  > **PASS** — all four gates exit 0 (`0 high, 0 medium, 0 low — PASS`,
  > `all 16 cases passed`, `all gen cases passed`, `all eval checks
  > passed`), the fence check exits 1 with no output, and all five
  > feature rows exit 0 as written under POSIX sh; F01's cmd.exe failure
  > is a one-character escaping defect in the check, not in the content
  > […] DECISIONS ruling 8 is a legitimate correction and I confirmed its
  > proof myself — the replacement command exits 1 against `9fc4bda`'s
  > file and 0 against the current one, while the clause it replaced was
  > demonstrably vacuous. The four Important findings are all one-to-two
  > line edits that no gate depends on; I would land them before handoff,
  > starting with F01's escaping and the `orca.md`/`runners.md`
  > contradiction.

  Its verification of the standard's own claims, quoted because it is the
  evidence MAT-97 turns on:

  > `task-list --brief --json --run run_fafc4f70d4ac` → `has title? false
  > | has task_title? true`; row keys match `reference/orca.md`'s table
  > exactly. […] `worker-show --dispatch ctx_2b7ad61143ae --json` →
  > `ok: true` […] `ctx_` ids are valid; the doc's rehabilitation is
  > correct. […] Every number in SKILL.md's cost list reproduces.

  **All four Important findings landed before handoff** (`e6951af`), then
  re-verified above: F01's shell portability, the
  `orca.md`/`runners.md` contradiction over the two-step, the
  `[REPO_CONSTRAINTS]` omit boundary a generator can execute, and the
  missing eval guard on SPEC §1's bare-"Tasks" clause. The MUST-CLOSE
  minor (SPEC §15's upstream-ask framing) landed with them.

- **Adversarial review:** n/a in this session — the parent runs the
  ballena itself after `worker_done` (dispatch config: 1 ballena,
  parent-dispatched). This lane's own cross-model rung is therefore the
  parent's to close, not skipped.

**Deferred minors carried into handoff** — each recorded under its step's
verdict above, none blocking: the three-way confidence divergence on
whether the two-step "can leave" or "leaves" a fallback shell; SKILL.md's
required close naming no closing command (one hop away in
`runners.md`); the narrated remedy in `execution.md` dropping
`--worktree <selector>`; PROGRESS's own verbatim records using `[…]`
elision where the clause this lane writes asks for findings too; and
`reference/orca.md` sitting at exactly 120/120 with no lint rule to catch
the next line added.
