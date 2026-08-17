# ADR-005: Artifact-producing phases are AE's

Date: 2026-08-17
Status: Accepted

## Context

ADR-004 gave execution a house owner (`skills/relay`) because superpowers'
executor ships its own workspace, ledger, and rulings file that collide
1:1 with the lane's PROGRESS, DECISIONS, and SPEC — composing two
protocols over the same information is permanent friction. Designing
`work-plan` (MAT-33) surfaced the same collision one phase earlier:
planning also produces an artifact — the lane's PLAN.md — and
superpowers' `writing-plans` ships its own plan-document shape that
would collide with it the same way execution did. The pattern repeats
because the cause is general, not specific to execution: any phase that
writes a durable artifact into the lane is exactly the phase where a
suite's own artifact machinery and the standard's four files fight over
the same ground. Thinking phases with no artifact of their own —
brainstorming, TDD's red-green cycle, systematic-debugging's hypothesis
log — never hit this collision, because there is nothing durable for
the two protocols to disagree about.

## Decision

State the general principle ADR-004 was one instance of: **AE owns
every phase that produces an artifact** — plan (`work-plan` →
PLAN.md), execute (`relay` → commits + PROGRESS), verify (`work-verify`
→ the PASS block), close (`work-handoff` → clean-state exit). Artifacts
are where protocols collide, so the standard's locations and endings
win there, not by preference but because two owners of one file is
never workable. Artifact-free thinking — brainstorming, TDD,
systematic-debugging — stays composable from process-skill suites
exactly as before: nothing about this decision reaches into phases that
leave no durable file behind. A suite's *thinking* is superseded only
on observed friction, phase by phase, never on principle in advance —
this ADR fixes the rule that decides future cases, not a blanket ban on
suite content.

`work-plan` is this decision's first consequence: superpowers'
`writing-plans` joins the superseded list alongside its executors and
finishers, and the lane's PLAN.md is the one artifact a plan produces.

## Consequences

- `writing-plans` joins the superseded list in `reference/skills.md`'s
  ADR-004 paragraph; the pointer there names ADR-005 alongside ADR-004.
- The suite-example list in `reference/skills.md` (thinking phases a
  suite still supplies) drops `writing-plans`, since planning now has a
  house owner too; brainstorming, TDD, and systematic-debugging stay as
  the examples that remain artifact-free.
- README's skill chain grows to nine skills in this release:
  `work-plan` sits between the thinking suite and `relay`, shaping the
  PLAN a suite's brainstorm/design output feeds into, and `using-ae`
  (same release train) becomes the always-loaded entry point.
- Future skill decisions ask this ADR's question first: does the phase
  produce a durable artifact in the lane? If yes, AE owns it and any
  suite counterpart is a supersession candidate; if no, it stays a
  suite's to supply.

## Alternatives considered

- Leave the principle implicit in ADR-004 and repeat the same reasoning
  for each future phase — rejected: MAT-33 already had to re-derive it
  from scratch once; a citable ADR is cheaper than re-deriving it every
  time a new phase's collision surfaces.
- Supersede suite content by category (all of superpowers, wholesale)
  rather than by artifact — rejected: it would reach into thinking
  phases that have no collision to resolve, breaking suites' own
  "user preferences override defaults" composability for no gain.
