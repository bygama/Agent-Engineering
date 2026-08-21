---
issue: MAT-115
---
# The design-first approval window — decisions

<!-- Append-only: date — choice — why. Newest at the bottom. -->

## 2026-08-21 — the marker is one ASCII sentence, prefixed `STATE:`

**Choice.** The string both legs meet at is, exactly:

```
STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md
```

**Why.** Three constraints, each ruling out an alternative:

- **ASCII only, no em dash.** The check compares byte-for-byte; the
  skill writes byte-for-byte. House prose reaches for em dashes
  constantly, and PROGRESS.md is hand-edited by agents and humans who
  will type `-` or `--` where the original had `—`. A marker that breaks
  on punctuation drift fails silently — the lane goes back to linting
  FAIL and nobody knows why. Every candidate wording that read better
  with an em dash was rejected for this.
- **`STATE:` prefix.** PROGRESS.md's `## In progress` section is prose
  bullets. Without a visible prefix, the marker looks like one more note
  and a later editor rewords it. `STATE:` says "machine reads this".
- **Long enough never to collide.** A short marker (`design-first`,
  `awaiting approval`) could appear in ordinary lane prose and silently
  exempt a lane that is not in the window at all. This sentence will not
  be written by accident.

**Rejected alternatives.** A YAML frontmatter key (`state:
design-first-window`) — cleaner to parse, but PROGRESS.md's frontmatter
is currently only ever `issue:`, and putting lane state there splits
"where lane state lives" across two places in the same file. A dedicated
marker file (`work/<slug>/.awaiting-approval`) — invisible to the first
read of every session, which is the one property PROGRESS.md has and
this fix depends on.

## 2026-08-21 — the exemption covers PLAN.md only, and only with PROGRESS.md present

**Choice.** `lane-incomplete` stops requiring PLAN.md for exactly one
state: PROGRESS.md exists **and** contains the marker verbatim.
PROGRESS.md itself stays required unconditionally.

**Why.** The window is *declared* in PROGRESS.md, so a lane without
PROGRESS.md cannot be in it — a SPEC-only lane keeps failing both
findings exactly as today, which is what keeps this a lifecycle state
rather than an escape hatch. Making the exemption conditional on the
declaration is also what makes it self-limiting: a lane leaves the
window by writing PLAN.md and dropping the line, and nothing about the
check has to know when that happened.

## 2026-08-21 — no stale-marker check in this lane

**Choice.** A lane that keeps the marker after PLAN.md lands is not
flagged.

**Why.** It is a real but small rot, and catching it is a second check
with its own fixtures and its own false-positive surface. MAT-115 is the
contradiction between two shipped rules, not marker hygiene. Recorded
here so a later lane can pick it up knowingly rather than discovering it
as a gap.

## 2026-08-21 — this lane dogfoods leg 1 during its own approval window

**Choice.** This lane's PROGRESS.md was written at the SPEC step,
carrying the marker, before PLAN.md existed — the exact behavior leg 1
adds to work-plan.

**Why.** It makes the lane its own first field test, and it reproduced
the bug live: with SPEC.md and PROGRESS.md present and PLAN.md absent,
`node scripts/agent-lint.mjs . --ignore tests,templates,examples`
reported `MEDIUM work/mat-115-design-window/ lane missing PLAN.md
[lane-incomplete]`, exit 1. That is MAT-115 observed on the lane that
fixes it, not inferred from reading the source.

## 2026-08-21 — parent ruling: SPEC approved as written

**Choice.** The parent orchestrator approved SPEC.md in full, on the
resumed thread `msg_287612c3b824`, and confirmed every judgment call
named in the dispatch brief stays the lane's own.

**Approved verbatim in the ruling:** both legs in one lane; the exact
marker string with its ASCII / `STATE:` / collision rationale; the
change-both-together pairing on both sites; the red-before-green
fixture; the pinned negative cases; evals moving first.

**Why it is recorded here.** The ruling also directed that the SPEC's
sharpening of the ticket's mitigating nuance be kept: `agent-lint` walks
the filesystem, not the index, so `lane-incomplete` fires on an
untracked lane exactly as on a committed one — the ticket's "the lane
was untracked" bounds the severity without dissolving the contradiction.
That correction is now in SPEC.md's "Why" and in PROGRESS.md's live
reproduction.

**Process note worth keeping.** The first ask timed out at 900 s because
it landed in a delivery batch the parent acknowledged without reading.
Resuming the same question by id — rather than asking a duplicate — is
what recovered it, and is the behavior the dispatch preamble specifies
for exactly this case.

## 2026-08-21 — step 6's marker count excludes `evals/` (step 1 review finding)

**Choice.** PLAN step 6's invariant gate now reads
`grep -rl --exclude-dir=evals '<marker>' skills scripts | wc -l` and still
demands exactly 2. The two sites it counts are
`skills/work-plan/SKILL.md` and `scripts/agent-lint.mjs`.

**Why.** The step-1 reviewer (command-mode sigiloso) found the gate
unsatisfiable as originally written: step 1 mandates that
`skills/work-plan/evals/eval-05.md` quote the marker in full so a reader
can see what "verbatim" means, which would have made three files match
once steps 2 and 4 landed. Resolved against SPEC.md, which says "two
**source-of-truth** sites" — an eval quoting the marker is an assertion
*about* those sites, not a third site that could drift out of sync with
them. The gate's claim is unchanged; only its spelling is corrected.
Ruled by the controller rather than escalated, because the SPEC already
decides it.

**Deferred to work-verify's triage (Minor, not fixed here).** eval-05.md
carries a truncated prose reference `STATE: design-first approval
window...` twelve lines below the full quote. It cannot match the gate's
grep and cannot mislead the check; the reviewer's suggestion to replace
it with "the marker quoted above" is a polish item.

## 2026-08-21 — `templates/repo/work/PROGRESS.md.template` stays unchanged

**Choice.** The empty PROGRESS.md scaffold every lane starts from is not
touched by this lane.

**Why.** The marker describes a transient state — the design-first
approval window — not a property of every lane. Both modes start from
the same empty scaffold today; baking the marker (or a commented-out
version of it) into the template would write a false state into every
direct-mode lane's PROGRESS.md from the moment it is created, since
direct mode never enters the window the marker declares. The template
is also outside this lane's touched-paths list (PLAN.md's constraints
block: `templates/` is a never-touch path — concluding it must change
would be an ask to the parent, not a unilateral edit), and nothing in
implementing step 2 turned up a reason it must change: the marker line
is written by `skills/work-plan/SKILL.md` directly into
`work/<slug>/PROGRESS.md` at the SPEC step, not copied from the
template. Matches SPEC's "Out of scope, deliberately" position exactly;
recorded here per PLAN step 2's instruction to land the judgment
whichever way the implementer lands.

## 2026-08-21 — `docs/how-it-works/work-lifecycle.md` corrected, four chapters judged unchanged

**Choice.** `docs/how-it-works/work-lifecycle.md` is the one chapter that
changes (PLAN step 5, SPEC §6). Two edits:

- The design-first sentence — "which writes SPEC.md alone and stops for
  the owner's approval before shaping PLAN.md" — is corrected to name the
  same-turn `PROGRESS.md` write and the state it declares: "*design-first*,
  which writes SPEC.md, then in the same turn writes `PROGRESS.md`
  declaring the design-first approval window, and stops for the owner's
  approval before shaping PLAN.md". "Alone" is gone; "stops" and the
  owner-approval framing are kept because they are still true.
- The chapter's `PROGRESS.md` bullet (under "The lane and the four
  files") gains one sentence naming the design-first approval window as a
  state the file can carry before `PLAN.md` exists, and pointing at
  `agent-lint`'s `lane-incomplete` check as the reader of that same line —
  so the bullet and the design-first sentence corroborate each other
  instead of only one of them knowing about the window.

**The other four chapters judged, each explicitly, no change to any:**

- **`architecture.md`.** Grepped for `work-plan`, `agent-lint`, `SPEC.md`,
  `lane`, `design-first`, `lane-incomplete`, `PROGRESS.md` — the only hits
  describe `work-plan`, `agent-lint` and the skill chain at a level above
  mode detail ("`work-plan` shapes that approved design into the lane's
  `PLAN.md`"; `agent-lint` owns "lane coherence" as one item in a list).
  Neither sentence claims what "SPEC.md alone ... stops" did, so neither
  goes false. No change.
- **`standard-lifecycle.md`.** Same grep, same result: it names the four
  files and the skill chain by cross-reference to `work-lifecycle.md`
  ("Those belong to the work lifecycle") rather than describing
  design-first's behavior itself. No change.
- **`execution.md`.** Mentions `work-plan -> work-run -> work-verify ->
  work-handoff` as one step in the child's inner cycle, with no mode
  detail and no PROGRESS.md claim. No change.
- **`integrations.md`.** No mention of `work-plan`, `PLAN.md`,
  `design-first`, or the marker at all — only the general lane/PROGRESS
  pairing already true before this lane (`Linear comment + lane
  PROGRESS`). No change.
- **`docs/how-it-works/README.md`.** The chapter-index table's
  `work-lifecycle.md` row is a one-line summary ("task tiers S/M/L/XL,
  lanes, the four files, the lane lifecycle ... verification layers,
  feature list, tracker plane") that does not itself assert the
  SPEC.md-alone claim — it points at the chapter that carried it. No
  change; the fix belongs in the chapter, not the index.

**Why recorded even where nothing changed.** PLAN step 5 requires each
chapter's verdict on record "whether or not the file changes — a silent
no-change is indistinguishable from an unexamined one." This entry is
that record for all five.

## 2026-08-21 — correcting append: it is FIVE chapters judged, not four

**Correction.** The entry above is headed "four chapters judged
unchanged" and opens "The other four chapters judged" — both miscount.
Five files were judged and each carries its own verdict in that entry's
list: `architecture.md`, `standard-lifecycle.md`, `execution.md`,
`integrations.md`, and `docs/how-it-works/README.md`. Nothing was
skipped; only the count in the prose was wrong.

**Why an append rather than an edit.** DECISIONS.md is append-only
(`reference/task-tiers.md`), so a miscount is corrected by a later entry
that names it, never by rewriting the record. Found by the step-5
command-mode reviewer, which counted the list against the step's own
file list.

## 2026-08-21 — step 6's reviewer seat fell through to chain position 2

**Choice.** Step 6's per-step review was bought from **free raton**
(`opencode/muse-spark-1.2-contributor-free`) rather than the lane's
settled seat, the sigiloso `opencode/x-preview-f-free`.

**Why.** The sigiloso returned `Error: Upstream request failed:
[server_error] Upstream response was not valid JSON`, exit 1, on two
consecutive attempts with the identical prompt — a dead seat, not a
disagreement. `reference/runners.md` makes falling through the chain
normal operation rather than an incident, on one condition: the step
records which engine produced its verdict, so a fallen-through review is
never indistinguishable from a first-choice one. That is recorded in
PROGRESS.md beside the verdict itself.

**What did NOT change.** Steps 1-5 were all reviewed by the sigiloso at
chain position 1, and the cross-family property holds for step 6 too —
both seats are opencode-gateway models, not Claude, so maker != checker
stays cross-family across every step of this lane.

## 2026-08-21 — the fresh-context rung: attempted on the subagent seat, bought from the runner seat

**What was attempted first.** An in-session Claude subagent was
dispatched as work-verify step 4's fresh-context reviewer (the Agent
tool, capable tier, `references/lane-reviewer.md` filled verbatim). The
runtime accepted the dispatch — no refusal, no missing tool — but the
seat never returned a report: ~35 minutes, two direct nudges asking for
the verdict in whatever state it stood, no reply. It was stopped rather
than left idle.

**What the rung was bought from instead.** `skills/work-verify` step 4
names three acceptable seats — "a subagent, a second session, or another
runner". The rung was filled by the third: a command-mode runner
(`reference/runners.md`), given the same three inputs and the same
act-don't-read brief, which ran every DoD layer itself and quoted its own
output. This is not a downgrade of the rung: a runner seat is
**cross-family**, so it removes the maker's model blind spots as well as
the maker's conversation, which a same-family subagent does not.

**Which engine ruled, and why not the first choice.** The sigiloso
(`opencode/x-preview-f-free`), which reviewed steps 1-5, was dead by this
point: two `[server_error] Upstream response was not valid JSON` failures
at step 6, then a hard timeout (exit 124) on a one-line liveness probe.
The seat fell through to chain position 2, **free raton**
(`opencode/muse-spark-1.2-contributor-free`), which answered one-shot.

**A note the parent should have.** The parent's post-`worker_done`
adversarial seat is scheduled on that same free-raton id. With the
sigiloso down, this lane's own gate now also ran there, so the parent's
seat is no longer model-independent from the lane gate. The parent may
want to pick a different id for real independence — this lane cannot make
that call for it, only surface it.

## 2026-08-21 — PASS REVOKED: a lane that merely QUOTES the marker is exempted

**The finding.** The in-session Claude fresh-context reviewer (whose report
arrived late, after the runner seat had already returned PASS) raised an
Important finding neither runner seat looked for:
`scripts/agent-lint.mjs`'s marker test is a whole-file substring match, so
a lane that merely *quotes* the marker — in a command transcript, a
blockquote, a fenced block — is exempted from needing PLAN.md even though
it is not in the approval window at all.

**Confirmed real, reproduced by the controller.** A throwaway AE repo whose
single lane holds SPEC.md, no PLAN.md, and a PROGRESS.md whose only
occurrence of the marker is inside a fenced command transcript
(`$ grep -q 'STATE: ...' skills/work-plan/SKILL.md`), with the prose
explicitly saying the lane is NOT in the window:

```
$ node scripts/agent-lint.mjs <that repo>
0 high, 0 medium, 0 low — PASS
$ echo $?
0
```

It should have fired `lane missing PLAN.md`. The reviewer also showed the
sharper version: this repo's own lane files, copied into a temp repo with
PLAN.md deleted, PASS as well — because this lane's PROGRESS.md quotes the
marker six times in its review transcripts.

**Why this is Important and not Minor.** SPEC's stated invariant — "Long
enough to never collide. No lane writes this sentence by accident" — is
already false on this repo's own tree. The class of lane most likely to
quote the marker is a lane working on the marker, i.e. exactly the lanes
this repo will keep opening.

**Ruling.** `work-verify`'s findings triage is explicit: confirmed real ->
the PASS is revoked, fix, re-verify from step 3. The earlier PASS is struck
and does not ship. The fix is anchoring, not a new invariant: the marker
must be the CONTENT of a line — optional leading whitespace and an optional
`- `/`* ` bullet, then the marker, then nothing but whitespace — which is
exactly how `skills/work-plan/SKILL.md` instructs writing it, and which no
transcript, blockquote or inline-code mention can satisfy.

**Also fixed in the same step (Minor, but it makes a recorded claim true).**
`tests/run-lint-tests.mjs`'s near-miss case pins only the finding CODE,
while two recorded verdicts in this lane say both negatives are pinned with
message-level assertions. One `expectMatch` line reconciles the record with
the code and survives anyone adding a second lane to that fixture.

**Not a defect (recorded so it is not re-litigated).** The reviewer's
Minor 3 notes the branch passes through commits where one leg exists
without the other (`0d2e6d3`, `a1aa348`). That is mandated by
evals-before-content and fixtures-before-check; the SPEC's DoD is scoped to
the PR, and this repo merges rebase-only by choice.

**Already fixed before the finding arrived.** The reviewer's Important 2 —
step 6's removal instruction shipped with no eval behind it — was true of
the tree it reviewed and was closed by step 7 (`848b089` amends eval-05
with the removal assertion, before `65150b9` moves the rule).

## 2026-08-21 — the lane folder SURVIVES this close (repo convention beats the default)

**Choice.** `work-handoff`'s close path deletes the lane folder by default.
This close keeps it.

**Why.** The skill itself allows it — "a repo convention may prefer
archiving over deletion" — and this repo's convention is visible in three
independent places:

- `work/mat-111-deglobal/` and `work/mat-116-117-review-seats/` are both
  present at `main`, each already carrying a `work-verify` PASS block. A
  child that deleted its own lane on close would have removed those too.
- `origin/chore/lane-sweep-111-116-117` exists: the owner sweeps merged
  lanes in a dedicated branch, after merge, in batches.
- This worker's dispatch brief names
  `--report-path work/mat-115-design-window/PROGRESS.md` as the artifact
  the parent reads. Deleting it would point the parent at a file that no
  longer exists, and would strip the lane's evidence — including the
  revoked-PASS ruling and every reviewer verdict — out of the PR the parent
  is about to review.

**So the close is a close in every other sense** — verification gated,
debris swept, PROGRESS truthful, PLAN ticked, card and tracker synced — and
the lane folder is left for the owner's sweep, which is where deletion
belongs in this repo.
