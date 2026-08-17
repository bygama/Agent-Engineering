# ADR-002: Tier XL — work that cannot fit one lane

Date: 2026-08-16
Status: Accepted <!-- Amends SPEC Decision 7 -->

## Context

S/M/L scale ceremony within one lane. P4 shipped the graph machinery
(fan-out qualification, anchors, reducer, synthesis gate), but nothing
made it mandatory when work genuinely exceeds one lane — discretion
exactly where discretion fails: large parallel efforts.

## Decision

Add tier XL, structural not size-based: XL begins where a correct PLAN
forces two or more independent lanes in parallel. Ceremony: everything L
requires per worker lane, plus mandatory fan-out — the three pre-fan-out
questions in writing, frozen anchors, the worker table in the parent
PLAN, the reducer contract, and the synthesis gate on the merged whole.
The ratchet extends upward: L→XL mid-task, never down. On Orca, workers
spawn agent-first as child worktrees and coordinate via orchestration;
without Orca the same lanes run sequentially under the same ceremony
(no-Orca contract, ADR-001).

## Consequences

- Tier one-liner, the task-tiers reference, and the consumer tier guide
  change (AE/2.5 template bump: `docs/tiers.md` joins the seed).
- work-verify owns the XL DoD (per-lane L + synthesis gate); fan-out is
  mandatory at XL, available at L, refused below that.
- First production XL run pending a real task; the eval suite pins the
  ceremony meanwhile.

## Alternatives considered

- Size-based tier ("huge") — tiers decide ceremony, not effort;
  size-based tiers inflate and invite mid-task downgrades.
- No new tier (keep fan-out discretionary at L) — leaves the graph
  machinery optional exactly where skipping it is most tempting.
