---
issue: MAT-83
---
# MAT-83 + MAT-84 scale polish — spec

<!-- Parent-shaped design (dispatch brief, 2026-08-19), formalized by the
     child lane in design-first mode. One lane, one PR, closes both. -->

The polish set completing the AE-at-scale package (merged MAT-82 cycle)
before the owner releases it as the 1.4.0 milestone. Covers MAT-83
(deferred minors of the MAT-82 lane close) and MAT-84 (the browser
criterion reaches adopters).

## Done looks like — MAT-83

1. **tracker.md back inside the reference budget.** `reference/tracker.md`
   ≤120 lines (now 179; SPEC fixes reference/ docs at ≤120). The trim
   comes primarily from "The GitHub plane" section — the verified-live
   integration detail already lives in
   `docs/how-it-works/integrations.md`; the reference keeps the normative
   rules and points there. The ADR-001 two-connectors note (a Linear MCP
   is a second connector under the same declaration check, never a
   no-Orca rung) already landed with MAT-82 (d352399) and SURVIVES the
   trim in both places it binds (connector section, Without Orca). The
   section header `## The GitHub plane` stays (execution.md references
   the plane by name).
2. **eval-06 Run D widened.** Its preamble "no Orca CLI and no Linear
   MCP" is narrower than tracker.md's rule ("without an Orca session
   there is no tracker write, whatever connector the session carries" —
   ADR-001). Run D grades the no-Orca contract both bare AND with a
   Linear MCP present: the MCP-present case must equally refuse the
   write, state it, and emit the operations.
3. **Retired-vocabulary sweep** — "per-app" off living surfaces where the
   nesting law now says any-earned-depth. Targets: `README.md` budget
   table (~line 252), `skills/ae-audit/SKILL.md` inventory (~line 27),
   `scripts/agent-lint.mjs` finding messages (~lines 101-102),
   `skills/ae-init/references/migration.md` conversion TARGET columns
   (lines 14, 28 — the legacy-side descriptions stay as found-state
   vocabulary), `docs/how-it-works/architecture.md` (~line 144).
   Excluded: CHANGELOG.md (untouchable record), `docs/plans/`,
   `examples/` (deliberate-clean), eval fixtures describing legacy repos.
   The docs-sweep battery
   (`.claude/skills/docs-sweep/references/patterns.md`) gains the
   `per-app` row IN THE SAME CHANGE, naming the real instances (ratchet
   rule).
4. **Linear-model paraphrase tightened** to the cited Concepts page
   (re-read 2026-08-19): the page says an issue *belongs to a team* and
   *can be added to a project*; an initiative *can contain multiple
   projects*. tracker.md's head citation replaces the looser "an issue
   sits in at most one project; initiatives group projects" with a
   paraphrase tracking that wording (issue belongs to a team; optionally
   added to one project; initiatives contain multiple projects).
5. **README interop claim split** (~lines 242-244): AE's nesting rule is
   ALIGNED with the agents.md spec's combine-walking-up / nearest-wins
   behavior, not identical to it — AE adds its own earning test and
   budgets (`reference/context.md`).

## Done looks like — MAT-84

6. **EVALS BEFORE CONTENT.** New `skills/ae-init/evals/eval-07.md`: when
   step-1 exploration detects a UI stack (the same detection that offers
   DESIGN.md), the instantiated root AGENTS.md Gotchas gains ONE
   runtime-neutral browser line — prefer the runner's embedded/managed
   browser; heavy browser MCPs (Playwright, devtools) only for
   capabilities it lacks, never from supervised child sessions — phrased
   WITHOUT assuming Orca. Non-UI repos get nothing; the eval grades that
   too (two runs: UI fixture, non-UI fixture). Budgets hold with the
   extra line. Then the content: `skills/ae-init/SKILL.md` step 6 carries
   the instruction beside the DESIGN.md offer, and
   `docs/how-it-works/standard-lifecycle.md` §Install narrates it in the
   same change.
7. **README adoption section** names `global/CLAUDE.md` as an adaptable
   machine-policy SEED — copy-and-edit, owner-specific lines (chat
   language) stripped — never something applied verbatim.

## Constraints

- CHANGELOG.md untouched; no restamp; no version bump — the set rides
  the owner's 1.4.0 release right after this lane merges.
- Budgets unchanged and enforced: root ≤60/100, nested ≤30, pointer ≤3
  outside fenced tool-managed blocks, global ≤40.
- Affected `docs/how-it-works/` chapters update in the same change as
  any behavioral change; the battery row lands with its fix.
- All four gates exit 0 before the PR:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`,
  `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
  `node tests/run-eval-checks.mjs`.
- PR body carries `Closes MAT-83` and `Closes MAT-84` on separate lines;
  the child pushes and opens the PR, never merges.
