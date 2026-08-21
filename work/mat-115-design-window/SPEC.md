---
issue: MAT-115
---
# The design-first approval window — spec

<!-- Shaped from the parent orchestrator's dispatch brief (2026-08-21),
     design-first. Evidence: MAT-115 (owner field report from a
     consumer-repo lane), plus this lane's own reading of
     skills/work-plan/SKILL.md step 1 and scripts/agent-lint.mjs's
     work-lanes section. One ticket, two legs, one lane, one PR, Tier M. -->

## Why

The standard contradicts itself, and the contradiction is reachable in
one ordinary turn:

- `skills/work-plan/SKILL.md` step 1, design-first mode, **guarantees** a
  window where a lane holds SPEC.md and nothing else — "write the lane's
  SPEC.md from the settled design, then STOP ... PLAN.md starts only once
  that approval is on record, in a later turn."
- `scripts/agent-lint.mjs`, work-lanes section, requires **both** PLAN.md
  and PROGRESS.md in every `work/<slug>/` and emits one MEDIUM
  `lane-incomplete` per missing file.

So the state the standard promises lints 2x MEDIUM FAIL, for as long as
the owner takes to answer. Field report (owner, 2026-08-21, from a
consumer-repo lane): the wait is exactly when the repo is least able to
absorb a red lint, because nothing is moving that would clear it. The
worst consequence is not the red — it is that a red the reader knows is
wrong teaches the reader to ignore the lint, and a lint that gets ignored
stops catching the rot it was written for.

Mitigating nuance, recorded because it bounds the severity rather than
dissolving it: the reported lane was untracked (`?? work/`), and
`lane-incomplete` aims at committed rot. `agent-lint` walks the
filesystem, not the index, so the finding fires on an untracked lane all
the same — the contradiction stands, it is just cheaper than it looks.

## The two legs, and why half a fix is worse than none

Exempting the missing PLAN.md alone leaves `lane missing PROGRESS.md`
firing, and a lane that legitimately has neither file has no way to
declare itself. So the fix runs both legs in one lane:

1. **The skill leg.** design-first writes PROGRESS.md at the SPEC step,
   carrying an explicit state line that says the lane is waiting for
   owner approval. This is not new ceremony bolted on to buy a lint pass:
   lane state is precisely what PROGRESS.md exists for
   (`reference/task-tiers.md`, "done / in progress / tried-and-failed /
   next; the first read of every session"), and "the owner has the SPEC
   and has not answered yet" is the truest thing a fresh session could
   read about that lane. The artifact set the child hands work-run later
   is unchanged — PROGRESS.md was always going to exist; it now exists
   one step earlier, with content instead of an empty scaffold.

2. **The check leg.** `lane-incomplete` becomes lifecycle-aware: a lane
   whose PROGRESS.md declares the design-first approval window is valid
   without PLAN.md. This is not an exception that weakens the check — it
   encodes a state the standard itself guarantees. The check keeps
   failing every lane it fails today; it only stops failing the one state
   the standard promised would exist.

## The marker: one string, defined once, matched verbatim

The two legs meet at exactly one string. work-plan's SPEC step writes it
verbatim into PROGRESS.md; `lane-incomplete` matches that same literal.

**The marker, exact:**

```
STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md
```

Constraints the wording answers (rationale lands in DECISIONS.md):

- **ASCII only, no em dash.** The string is compared byte-for-byte by a
  substring match, and PROGRESS.md is hand-edited by agents and humans
  who type `-` where the house prose uses an em dash. A marker that
  breaks on punctuation drift is a marker that silently stops working.
- **`STATE:` prefix.** It marks the line as machine-read state, visibly
  different from the prose bullets around it, so a later editor can see
  it is load-bearing.
- **Long enough to never collide.** No lane writes this sentence by
  accident.

It is defined **once** in each of the two sites that must agree, tied
together with paired `change both together` comments — the same pattern
`scripts/agent-lint.mjs` already uses for the entry-skill cap ("Path and
cap mirror `reference/skills.md` ... change both together").

## What done looks like

### 1. work-plan's evals encode the new behavior first

`skills/work-plan/evals/` changes **before** `SKILL.md` does (AGENTS.md
hard constraint: "evals change before content on every revision").
eval-05 owns the two modes and today asserts design-first "writes the
lane's SPEC.md ... and stops — the same turn does not also produce a
PLAN.md". That assertion stays true and gains its companion: the same
turn **does** write PROGRESS.md, carrying the marker verbatim, and the
direct mode does **not** write the marker (it has no approval window).

### 2. work-plan's SKILL.md writes PROGRESS.md at the SPEC step

Step 1's design-first bullet gains the PROGRESS.md write and the marker
line, quoted verbatim, with the paired comment naming
`scripts/agent-lint.mjs` as the site that must change with it. The skill
stays under its size cap; the checklist line for step 1 stays accurate.

### 3. A lint self-test fixture proves the miss, red before green

A new fixture repo — an otherwise-clean AE repo whose single lane holds
SPEC.md plus a PROGRESS.md carrying the marker, and no PLAN.md — plus its
case in `tests/run-lint-tests.mjs` asserting `fail: false` and
`forbid: ["lane-incomplete"]`. Run before the check changes, this case is
**red**: that red is the evidence the check misses the state today.

### 4. The negative cases are pinned, not assumed

The existing `lanes-bad` fixture must keep failing exactly as it does
today, and two states must be pinned as still-failing so the exemption
cannot be read as "PROGRESS.md now excuses a missing PLAN.md":

- a **SPEC-only** lane (no PROGRESS.md at all) still fires both findings;
- a **near-miss** lane whose PROGRESS.md paraphrases the marker instead
  of carrying it verbatim still fires `lane missing PLAN.md`.

Both land in the existing fail fixture, with `expectMatch` on the
messages so the assertion is about the specific lanes, not the file's
aggregate redness.

### 5. `lane-incomplete` becomes lifecycle-aware

PLAN.md stops being required for exactly one state: PROGRESS.md exists
**and** contains the marker. PROGRESS.md itself stays required
unconditionally — the window is declared in PROGRESS.md, so a lane
without PROGRESS.md cannot be in it. The finding's code, severity and
message text are unchanged for every other lane.

### 6. The chapter that goes false is corrected in the same change

`docs/how-it-works/work-lifecycle.md` currently describes design-first as
"writes SPEC.md alone and stops for the owner's approval before shaping
PLAN.md". "Alone" becomes false in step 2, so the chapter is corrected in
this same change (AGENTS.md hard constraint), and the lane's declared
state is named where the chapter describes what PROGRESS.md holds. Every
other chapter's claims are re-read and a no-change judgment recorded per
chapter in DECISIONS.md rather than left silent.

### 7. Four gates green, this lane's own new case red-first then green

`node scripts/agent-lint.mjs . --ignore tests,templates,examples`,
`node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
`node tests/run-eval-checks.mjs` — all exit 0 before the PR, with the new
lint case demonstrated red before the check learns the state.

## Out of scope, deliberately

- **No version bump, no restamp, no CHANGELOG entry.** A check change
  earns a PATCH, and this repo's release ritual is owner-paced: the bump
  ships separately, packaging this with whatever else has landed
  (`CHANGELOG.md`, the `AGENTS.md` stamp and `reference/` are untouched
  by this lane).
- **`templates/repo/work/PROGRESS.md.template`** is not changed unless
  the work proves it must be. The template is the empty scaffold every
  lane starts from, in both modes; the marker describes a transient state
  only design-first lanes ever enter. The judgment is recorded either
  way in DECISIONS.md.
- **No stale-marker check.** A lane that keeps the marker after PLAN.md
  lands is a real (small) rot, but catching it is a second check with its
  own fixtures, and MAT-115 is the contradiction, not marker hygiene.
- **No change to the four-file lane contract.** SPEC/PLAN/PROGRESS/
  DECISIONS stay what they are; the lane's *order of arrival* is what
  this lane makes legible.

## Definition of done

- [ ] Both legs shipped in one PR — no state where the skill writes a
      marker no check reads, or a check reads a marker no skill writes.
- [ ] The marker string appears in exactly two source-of-truth sites,
      each carrying a paired `change both together` comment naming the
      other.
- [ ] The new lint case was demonstrably red before the check change and
      green after; the transcript of both is in PROGRESS.md.
- [ ] `lanes-bad` still fails, and the SPEC-only and near-miss lanes are
      pinned as still-failing with message-level assertions.
- [ ] Four gates exit 0.
- [ ] `docs/how-it-works/work-lifecycle.md` no longer claims design-first
      writes SPEC.md alone; every other chapter's no-change judgment is
      recorded.
- [ ] Nothing under `CHANGELOG.md`, the `AGENTS.md` stamp, `reference/`,
      `README.md`, `examples/`, `.claude/skills/` or any global path was
      touched.
