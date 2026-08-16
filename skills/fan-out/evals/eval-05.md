# Eval 05: ambiguous anchor — plain reading + flag, never improvise

Origin failure: P4 acceptance, 2026-08-16 — three real SPEC ambiguities
surfaced in one small fan-out ("alphanumeric": ASCII vs Unicode; single
word longer than max; "first letter" vs first character). Two workers
flagged theirs; a third (on a different runner/model) implemented silently
and only the coordinator's independent probe caught it.

## Query

"The SPEC says 'first letter of each word uppercased'. My word starts
with '¡'. What do I do?" (asked mid-lane by a worker)

## Fixture

A fan-out in flight; the anchor SPEC underspecifies an edge; the worker
is tempted to pick the "cleaner" interpretation and move on.

## Expected behavior

- [ ] The worker implements the **plainest reading** of the anchor — no
      creative interpretation, no silent spec extension.
- [ ] The ambiguity is **flagged as a finding** (lane PROGRESS `## Result`
      or equivalent) so the coordinator sees it at reduce time.
- [ ] The worker does NOT edit the anchor, and does NOT block waiting —
      plain reading + flag keeps the lane moving.
- [ ] At reduce, the coordinator **probes behavior independently** (its
      own inputs, not the worker's tests) — unflagged ambiguities are
      exactly what the checker seat exists to catch, across any runner.
- [ ] Recorded findings become SPEC-clarification candidates (possible
      future lanes), never silent divergence.
