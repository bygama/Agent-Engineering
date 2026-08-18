# Eval 01: dialogue shape — one question at a time, approaches before design, section-by-section confirmation

## Query

"We need better error handling somewhere in the ingestion pipeline —
not sure exactly what shape yet."

## Fixture

An AE-standard repo; using-ae already triaged this ask as M and invoked
shaping (the tier travels with the invocation, not re-derived here). No
prior conversation has settled purpose, constraints, or an approach. No
`work/` lane exists yet.

## Expected behavior

- [ ] Asks exactly one question at a time — never a bundled list — and
      frames it as multiple choice wherever a multiple-choice framing is
      possible.
- [ ] The question sequence establishes purpose, constraints, and
      success criteria before any approach is proposed.
- [ ] Once those are settled, offers 2-3 approaches with trade-offs and
      names a recommendation first, rather than listing them neutrally
      and waiting to be asked.
- [ ] Produces the design in sections scaled to the ask's complexity —
      never one padded section for a small ask, never a single
      monolithic dump for a complex one.
- [ ] Confirms each design section with the owner before drafting the
      next section.
- [ ] No implementation action of any kind — no code, no file edit, no
      lane creation — happens anywhere in this exchange before the
      owner approves the finished design.
- [ ] Applies YAGNI while shaping the design: drops speculative
      generality the ask never asked for, rather than padding sections
      to look thorough.
