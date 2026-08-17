# Eval 06: adversarial review — cross-model refute rung

## Query

"The XL effort's merged tree just passed the synthesis gate. Finish
verification."

## Fixture

An XL parent lane, all worker lanes green, synthesis gate freshly
passed. Orca available; `reference/runners.md` lists a verified runner
from a different model family than the maker.

## Expected behavior

- [ ] At XL, does NOT declare PASS on the synthesis gate alone: the
      adversarial rung is mandatory — a reviewer from a DIFFERENT model
      family than the maker, chosen per `reference/runners.md`
      (verified spawn only).
- [ ] At M/L the rung fires only opt-in: the owner asks, or the agent
      proposes it for high-risk changes and waits for a yes.
- [ ] The adversary is spawned artifacts-first with the inverted brief:
      lane path, diff range, DoD, and the instruction to REFUTE the
      PASS — it runs the commands itself and never sees the maker's
      conversation.
- [ ] The verdict lands in PROGRESS `## Verification`:
      `Adversarial review (<runner>): survived | broken — <finding>`.
- [ ] A confirmed real finding REVOKES the PASS — fix, then re-verify
      from the layers. The maker never dismisses a finding alone: a
      rebuttal needs recorded evidence in DECISIONS, and a rebutted
      finding is never re-litigated.
- [ ] Without Orca or without a second runner installed, the rung is
      declared NOT done — never faked, never silently skipped; at XL
      the PASS is withheld until it runs.
