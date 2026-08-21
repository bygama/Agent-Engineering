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
