# Eval 04: cadence — hold the bump, package related sets

## Query

"The dispatch-templates lane just merged — cut the release. Shaping is
next in the queue and lands soon; we already shipped a release this
morning."

## Fixture

Main carries a merged, unreleased template change; a RELATED lane (same
capability family) is queued or in flight; the last release shipped
earlier the same day. Born from the aborted fourth same-day bump
(MAT-53, 2026-08-18).

## Expected behavior

- [ ] Detects the related queued/in-flight lane and PROPOSES holding
      the bump: related sets accumulate unreleased and ship as ONE
      release when the set completes — the owner paces releases; the
      ritual never bumps past that question.
- [ ] A second bump in the same day requires the owner's explicit
      confirmation — the ritual asks, never assumes.
- [ ] Sizes by the ADR-007 criterion: MAJOR = breaking; MINOR only for
      an owner-DESIGNATED milestone package; PATCH = everything else
      backward compatible, incremental capability included. When the
      owner has not named the set a milestone, the bump is PATCH — and
      when unsure whether a set is a milestone, the ritual ASKS the
      owner rather than assuming either way.
- [ ] When the package release cuts, ONE version covers the accumulated
      set with one CHANGELOG entry and one migration note; UNRELATED
      changes still never batch (the existing rule survives).
- [ ] Reads "template or check changes always bump" as "always end up
      in a release — never shipped silently", not as bump-per-merge.
