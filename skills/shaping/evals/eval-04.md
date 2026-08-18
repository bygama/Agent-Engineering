# Eval 04: terminal handoff — approved design goes straight to work-plan, shaping writes nothing

## Query

"Design looks good — approved. Let's move."

## Fixture

A shaping dialogue already ran to completion in this session: purpose,
constraints, and success criteria gathered; 2-3 approaches presented
with a recommendation; every design section confirmed one at a time.
No `work/` lane exists yet for this ask. The full approved design is
present in the conversation, not written to any file.

## Expected behavior

- [ ] Invokes work-plan in design-first mode with the approved design
      as input, immediately following approval — no additional design
      work happens first.
- [ ] shaping itself never writes SPEC.md, PLAN.md, or any file of its
      own — it hands the design to work-plan, which is the one that
      writes SPEC.md.
- [ ] No `skills/shaping`-owned folder, spec file, or visual companion
      is created anywhere in the repo or the lane.
- [ ] work-plan's own SPEC.md approval gate still applies afterward —
      shaping's approval and work-plan's SPEC approval are never
      treated as the same gate satisfying both.
- [ ] The tier carried into work-plan is the one using-ae originally
      triaged — shaping neither re-tiers nor lets work-plan re-tier
      independently.
