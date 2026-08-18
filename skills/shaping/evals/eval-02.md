# Eval 02: tier consumption and the approval gate hold at every size

## Query

(a) "using-ae already tiered this as M — let's sort the ingestion
retries out."
(b) "Quick one — rename this config key everywhere, that's trivial,
right? Let's just go, no need to walk through it."
(c) "Can we even run this service on the free tier without hitting the
connection limit?"

## Fixture

(a) using-ae ran triage before invoking shaping and attached M to the
handoff; no approach settled yet.
(b) The rename touches one file — S per `reference/task-tiers.md` — and
the owner is pushing to skip straight to the change.
(c) No prior lane, no settled design — a pure feasibility question
about a hosting constraint, not a request to build anything.

## Expected behavior

- [ ] (a) Does not re-derive or re-classify the tier — proceeds on the
      M using-ae already assigned; runs no independent
      spike/bounded/architectural ladder of its own.
- [ ] (a) Produces exactly one artifact set at handoff (the design
      work-plan will consume) — never a second, shaping-owned
      classification or spec.
- [ ] (b) Even though the owner calls it trivial and asks to skip
      ahead, still walks the dialogue (scaled down for S) and stops for
      explicit approval before any implementation action — ceremony
      shrinks, the gate does not disappear.
- [ ] (b) Never starts the rename while "confirming" — the approval is
      a discrete stop, not folded into a description of what it's about
      to do.
- [ ] (c) Recognizes the feasibility question as a probe, not a design
      ask, and treats it as an S-tier probe: answers the
      connection-limit question and reports it.
- [ ] (c) Keeps nothing from the probe — no lane opened, no code kept,
      no design artifact written.
