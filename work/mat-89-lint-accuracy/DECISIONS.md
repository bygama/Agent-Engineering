# agent-lint accuracy (MAT-89 + MAT-92) — decisions

<!-- Append-only: date — choice — why. -->

- 2026-08-19 — **Downgrade, not exempt, for command paths that escape the
  repo** — the ticket offered three options (exempt / downgrade with a
  context-naming message / resolve against a declared sibling root). The
  bug is the exit code, not the report: a `low` finding leaves the signal
  visible (a genuinely broken sibling path still shows up) while removing
  it from the `fail = high + medium` computation, so no lane is blocked by
  a finding it cannot fix. Silent exemption would have discarded a real
  signal to buy the same exit code. The declared-sibling-root option was
  refused: it makes every consumer repo carry a new declaration to fix a
  two-line defect, and that declaration is invisible environment state of
  exactly the kind the parent already refused for the machine-local
  junction (MAT-89 ticket, "Parent ruling for those lanes").

- 2026-08-19 — **Nothing is emitted when an escaping path DOES resolve** —
  the alternative (always report escaping paths) would put a permanent
  `low` in the owner's checkout and in CI, where the sibling exists and
  the command is correct. A finding that fires where the world is right is
  the same defect class this lane is fixing, one severity down.

- 2026-08-19 — **The entry-skill cap check stays narrow (MAT-92)** — it
  fires on the literal path `skills/using-ae/SKILL.md`, not on a generic
  "always-loaded" declaration. Generalizing means a machine-readable
  declaration in the entry skill's own frontmatter, and `skills/using-ae/**`
  is fenced to sibling lane C for this wave: a generic check whose only
  declaration site is untouchable would ship dead. The ticket itself calls
  the narrow version "defensible and cheaper"; it generalizes later by
  adding the declaration and widening the constant, with no rewrite of the
  check.

- 2026-08-19 — **The cap did not exist in writing anywhere in the standard
  before this lane** — evidence, because it explains why the check was
  possible to omit for so long: `reference/skills.md:79` named `using-ae`
  as the always-loaded entry point but stated no number, and
  `grep -rn "\b80\b"` across `reference/`, `docs/how-it-works/`,
  `docs/specs/` and `skills/using-ae/` returned one unrelated hit
  (`principles.md:14`, ">80% of Claude"). `git log -S"80 lines"` found it
  only in lane records, all since removed. The brief's "read the cap from
  the standard's own statement" had nothing to read: law and check were
  not drifting apart, the law was never written down.

- 2026-08-19 — **PARENT RULING (ask, dispatch ctx_8d4eb986a262): state the
  law, then check it — by MODIFYING `reference/skills.md`, not extending
  it** — the parent approved touching `reference/skills.md` (unowned by
  both sibling lanes) with one constraint: the file sits at 119 of its
  120-line cap, so the number is folded into the existing sentence at
  :79-80 rather than added as a new line. That keeps the file at 119,
  leaves the cap headroom intact, and makes any conflict with a sibling a
  one-line conflict instead of a structural one. The check then hardcodes
  the constant with a pointer comment citing that statement — the house
  precedent already in `agent-lint.mjs` for the AGENTS.md budgets
  (`// Budget defaults mirror reference/context.md — change both
  together.`). A check must have a law to point at; enforcing a number no
  document states is the law-and-check-drift-apart failure this repo
  exists to prevent.

- 2026-08-19 — **PARENT RULING (same ask): SPEC approved as written** —
  design-first gate cleared, PLAN.md shaped from the approved SPEC. The
  parent additionally confirmed the sibling lane is adding a line to
  `skills/using-ae/SKILL.md` right now (measured 79/80), which is why the
  boundary fixture sits at exactly 80 and no test pins a current count.

- 2026-08-19 — **`expectMatch` in the test runner instead of severity
  assertions** — pinning "this finding is `low`" needs either new
  severity machinery in `run-lint-tests.mjs` or the combination the runner
  already expresses: `fail: false` plus the code being present. Only a
  `low` satisfies both, so the claim is airtight without new machinery.
  `expectMatch` (the mirror of the `forbidMatch` added for the AE/2.3
  honesty-marker lesson) pins the message wording that names the
  context-dependence, which is the part a future refactor could silently
  drop.
