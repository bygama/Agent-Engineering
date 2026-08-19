# mat-87-reference-resolution — decisions

<!-- Append-only: date — choice — why. -->

- 2026-08-19 — **Ruling 1 (parent, at SPEC approval): land `using-ae` at
  ≤78 lines, not 80** — the standard's cap is ≤80 and the SPEC originally
  targeted exactly 80/80. The parent overrode it: sibling lane MAT-44 ships
  a new skill in this same wave and its `## The map` row needs a line, so
  arriving at the cap would force that lane to trim under time pressure.
  The parent left the method to this lane (compress the addition, or trim an
  existing line judged redundant) and required the choice recorded here.
- 2026-08-19 — **Method chosen for ruling 1: compress the addition to 6
  lines; trim nothing existing** — a survey of the 72 existing lines found
  no line safe to cut. The two candidates both fail: the Entry rule's
  clarifying-questions sentence is more precise than the red-flags row that
  echoes it (it distinguishes questions about the *work* from questions
  about *execution shape*), and the Role rule's "a fresh terminal arrives
  unbound" clause plus its red-flags row were shipped together and
  deliberately by MAT-85, with eval-05 grading both. Reflowing a paragraph
  to reclaim a line was also rejected: the only paragraph where it works
  (ADR-006's) needs the exact ADR filename dropped to gain the line, which
  degrades a precise pointer for typography.
- 2026-08-19 — **`## The map` stays byte-identical to main** — it is the
  section MAT-44 edits next, so no reflow and no re-wrap there, even where
  one would be tidy (the `orchestrate` bullet's orphaned "included." line
  is left exactly as it is). Step 2's acceptance command enforces it.
- 2026-08-19 — **Rule split across prose and the red-flags row** — the
  parent's own suggestion, adopted: the `## Reference paths` prose carries
  what `reference/…` means, the three-source ordered lookup and the say-so
  contract; the red-flags row carries the junction trap together with the
  resolve-real-path-first correction and the never-invent clause. This
  keeps the rule declarative and puts the failure *reasoning* where this
  skill already puts failure reasoning, while fitting the 6-line budget.
- 2026-08-19 — **Ruling 2 (parent): `docs/how-it-works/execution.md` takes
  the required docs sentence; `architecture.md` is reported, not edited** —
  architecture.md is the primary narrator of the reference→skills edge (its
  `grounds` arrow at line 19, §`reference/` at line 39) but a sibling lane
  owns it. The repo's same-change docs constraint is satisfied on the
  surface this lane may touch: execution.md's §"Runners: any file-reading
  agent can hold a lane", the passage that hands a runner a skill file to
  follow as a procedure — exactly the reader who then hits a `reference/…`
  citation with no repo-relative anchor.
- 2026-08-19 — **Ruling 3 (parent): the `README.md` adoption line stays
  DEFERRED** — the ticket floats it as optional (copy-installers should
  clone `reference/` too, or accept degraded citations). It is reported in
  PROGRESS.md for the parent to route, never written across the fence.
- 2026-08-19 — **Public URL reused, not minted** — the ordered lookup's
  third source is `github.com/bygama/Agent-Engineering`, the address
  consumers already carry at `templates/repo/docs/tiers.md:28`. No new
  canonical address, and no script or hook performs the lookup: the rule is
  prose an agent follows, so the standard stays runtime-neutral.
