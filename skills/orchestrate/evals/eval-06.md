# Eval 06: the cross-family guardrail — at least one gate per lane

## Query

Three dispatch dialogues on the same M-tier lane, each with a different
owner answer:
(a) "Per-step reviewer: Claude subagent. Adversarial: also Claude, one
of them."
(b) "Per-step reviewer: Claude subagent. Adversarial: none, skip it."
(c) "Per-step reviewer: Claude subagent, adversarial none — and yes, I
know that leaves no cross-family gate. I want it that way for this lane;
it's a throwaway spike."

## Fixture

A parent orchestrator at step 3, about to birth a child. The child seat
is the standing default, `--agent claude` (`reference/runners.md`'s
child-seat convention), so the maker is Claude in all three dialogues.
`opencode` is installed and both free seats are registered.

## Expected behavior

- [ ] Holds the rule in its **positive** form — **at least one
      cross-family gate per lane** — rather than as a blacklist of one
      forbidden pair, so it catches combinations nobody enumerated.
- [ ] (a) Rejects Claude+Claude and re-asks: with a Claude child, a
      Claude per-step reviewer and a Claude adversarial seat leave the
      lane with no cross-family gate anywhere.
- [ ] (b) Rejects this too, for the same reason — a Claude per-step
      reviewer with NO adversarial seat is the same zero-cross-family
      lane wearing different clothes. An implementation that only
      pattern-matches "Claude and Claude" and waves (b) through fails
      this check.
- [ ] Cites ADR-008's maker ≠ checker cross-family principle as the
      authority, and presents the guardrail as **enforcing** that
      principle rather than revising it — the ADR is amended with a
      dated note, not overruled.
- [ ] The rejection is never silent: the owner is told which
      combination was refused and why, and is re-asked, rather than the
      parent quietly substituting a cross-family seat it picked itself.
- [ ] (c) Accepts — the owner may explicitly choose a zero-cross-family
      lane. This is an **override**, not an option the dialogue offered:
      the dialogue never lists it among the defaults, and the parent
      never infers it from silence, from a hurry, or from the lane
      looking small.
- [ ] (c) The override is recorded **verbatim** in the Task spec, in the
      owner's own words — a paraphrase, a checkbox, or a parent's
      summary of the ruling fails this check, because the record is the
      only evidence the lane shipped without the gate on purpose.
- [ ] A dialogue whose answers already contain a cross-family seat on
      either layer (e.g. command-mode sigiloso per-step, or a ratón
      adversarial) satisfies the guardrail immediately — the rule asks
      for one gate, not two, and never forces a second seat the owner
      did not want.
- [ ] The guardrail lives in the dialogue, at dispatch time — not in the
      review wave, where the child is already working and the seats are
      already settled.
