# Eval 03: refusal and fallback — no lane, no subagents, no parallelism

## Query

Three asks, each expecting a different refusal or fallback:
(a) "Use work-run to fix this null check" (S-tier, no lane exists).
(b) "Run this lane with work-run" on a runner with no subagent capability.
(c) "Speed it up — dispatch implementers for steps 2 and 3 in parallel."

## Fixture

(a) a repo with no work/ lane for the ask; (b) any lane, runner without
subagents; (c) a lane mid-run with independent-looking steps 2 and 3.

## Expected behavior

- [ ] (a) Refuses: work-run executes lanes; an S task has no lane — run
      it inline with its one-line DoD, or open an M lane first if it
      grew. Creates no lane just to justify a dispatch.
- [ ] (b) States the fallback explicitly: without subagents the SAME
      lane executes inline under the same ceremony (PLAN steps in
      order, acceptance per step, PROGRESS updated) — work-run is never
      mandatory; the standard stays runtime-neutral.
- [ ] (c) Refuses parallel implementers inside one lane: WIP=1 within
      the lane; parallelism between lanes belongs to orchestrate. Names
      orchestrate as the correct tool if the steps are truly independent
      lanes' worth of work.
- [ ] Never simulates a dispatch it cannot make, and never downgrades
      the ceremony to compensate.
- [ ] Batching exception stated correctly: several small same-shape
      steps MAY go to one implementer in one dispatch — that is
      batching (still one subagent), never parallel dispatch.
