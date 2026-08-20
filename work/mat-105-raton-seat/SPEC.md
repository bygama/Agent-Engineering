---
issue: MAT-105
---
# Second cross-family reviewer seat (ratón chispeante) — spec

<!-- Shaped from the parent orchestrator's dispatch design (2026-08-19).
     Evidence: MAT-105 ticket (owner directive, two production reviews).
     One lane, one PR, stacked on bygama/mat-104-94-single-shot-attrib. -->

## What done looks like

### The seat, encoded in `reference/runners.md`

Beside the ballena entry (the reviewer-seat TUI paragraphs — the
per-machine registry this file is), a second cross-family reviewer
seat:

1. **The seat itself** — house name "ratón chispeante", launch
   `opencode --auto -m opencode-go/muse-spark-1.2-contributor` (the
   exact argv proven on this machine 2026-08-19 over two production
   reviews: the MAT-104 and MAT-94 waves, both PASS at ballena grade).
   Same two-step launch pattern as the ballena (terminal create →
   tui-idle wait → `worker-start --terminal`), same `--auto` rationale:
   read-only seat, the filled reviewer.md forbids commit/push/merge and
   any file edit. The ballena stays the DEFAULT the dispatch dialogue
   offers — the ratón is the owner-selectable alternative, so the
   dialogue's wording ("default 1 ballena") does not change anywhere.
2. **First-run consent gotcha, stated NEXT to the launch command** — a
   fresh seat can stop at opencode's DATA-COLLECTION consent prompt,
   which `--auto` does NOT cover: one-time manual acceptance per
   machine/model (the owner intervened live on the MAT-94 seat). Named
   as a different prompt class from the permission prompts `--auto`
   kills, so a parent diagnosing a stalled fresh seat checks it first.
3. **Known-behavior note, not a rule** — one seat's `worker_done` send
   printed "(no output)" and never registered in the ledger; the
   transcript verdict was used per the single-shot guidance already in
   this file's stack (the paragraph citing reviewer.md's "Reporting
   your verdict"). One line, pointing at that guidance, cause
   unattributed (model vs CLI).
4. **Consequential edit inside the same file** — "The adversarial seat"
   section currently reads "on this machine the verified cross-family
   runner is opencode + DeepSeek (the portability-proof pairing)";
   with the ratón encoded that sentence undersells the registry it
   sits in. It gains the second pairing in the same breath, minimal
   wording, no new claims.

### What is checked and (on current evidence) NOT touched

5. **`skills/orchestrate/SKILL.md` step 6 + `evals/eval-03.md`** —
   checked for lines my change makes false. Current judgment, to be
   re-verified at execution: nothing becomes false. The dialogue
   default ("1 ballena") is unchanged by design; step 6's "the ballena
   needs custom argv, so it takes the two-step launch" stays true;
   eval-03's fixture explicitly picked "1 ballena", so every graded
   line is conditioned on that choice and none asserts the ballena is
   the ONLY seat. If execution finds a graded line that DOES become
   false, the eval changes FIRST (house rule), and only then the skill
   text — otherwise neither file is touched and the judgment lands in
   DECISIONS.md.
6. **`docs/how-it-works/execution.md`** — same check: the chapter
   narrates the review wave with the ballena as the concrete default
   seat, and every claim it makes (the CLI-enforced launch fork, the
   stall clock, single-shot, teardown) stays true with a second
   opencode seat available. Updated only if the runners.md change
   alters a claim; otherwise the no-change judgment is recorded in
   DECISIONS.md.

### Naming note (approval covers this)

The brief writes "raton chispeante", the ticket title "ratón
chispeante". The lane uses the accented Spanish form in prose (matching
the ticket, the evidence source) and the unaccented form only where
slugs/branches require ASCII. SPEC approval settles this choice.

## Constraints

- STACKED LANE, tip of the AE stack: branch
  `bygama/mat-105-raton-seat` cut from
  `bygama/mat-104-94-single-shot-attrib` (open PR #80, itself stacked
  on PR #77). The PR opens with base
  `bygama/mat-104-94-single-shot-attrib`, NOT main. Gates run on the
  stacked tree — expected and correct.
- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `global/`, `examples/`, `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` (open PR #78 owns the last
  three). No version bump, no restamp, no CHANGELOG entry — this ships
  with 1.4.2; the release ritual runs right after this lane merges.
- Owned files: `reference/runners.md`; only if genuinely needed:
  `skills/orchestrate/SKILL.md`, `skills/orchestrate/evals/eval-03.md`,
  `docs/how-it-works/execution.md`; plus this lane folder.
- Evals change before skill content on every skill revision.
- All four gates exit 0 before the PR: self-lint, lint self-tests,
  gen self-tests, eval-structure suite.
- PR body carries `Closes MAT-105`. The PR is left OPEN for the
  parent's review — the missing merge is not a stall.
- All artifacts in English.
