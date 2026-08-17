# rename relay → work-run — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-17 — relay → work-run, nothing else renamed — owner picked
  the minimal set: the one opaque name goes; the family reads
  work-plan → work-run → work-verify → work-handoff. using-ae fixed by
  owner; fan-out/loop-setup/agent-* judged already intuitive.
- 2026-08-17 — Records keep "relay" (CHANGELOG, ADR bodies, plans,
  old migration notes); ADR-004 gets only a status-line note — records
  are never rewritten, and the filename stays as the citable anchor.
- 2026-08-17 — Ruling (R1 concern): the acceptance grep's 2 residual
  hits are citations of the kept-as-record `ADR-004-relay.md` filename
  from README and task-tiers — the acceptance as written didn't except
  them, but the SPEC's record rule takes precedence; intent met, no
  living name usage remains. Cost if wrong: a stale-looking link label,
  caught by any future docs-sweep.
