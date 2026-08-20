---
issue: MAT-105
---
# Second cross-family reviewer seat (ratón chispeante) — spec

<!-- Shaped from the parent orchestrator's dispatch design (2026-08-19).
     Evidence: MAT-105 ticket (owner directive, two production reviews).
     One lane, one PR, stacked on bygama/mat-104-94-single-shot-attrib. -->

## What done looks like

> **SUPERSEDED IN PART by the Amendment (2026-08-20), below.** Items 1
> and 5 assert the old law (ballena default, dialogue wording
> unchanged); the owner ruling inverted that. Where this section and
> the Amendment disagree, the Amendment is the binding text.

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

## Amendment — owner ruling 2026-08-20 (post-verdict change of law)

The owner inverted the default AFTER the lane's M DoD PASS: the **ratón
chispeante becomes the default** the dispatch dialogue offers, for cost
reasons (two production reviews at ~$0.01 vs the ballena's price); the
ballena stays fully registered as the owner-selectable alternative. The
house name is documented in full — singular "ratón chispeante", plural
"ratones chispeantes". This makes text FALSE that the original
falsehood check correctly judged true under the old law. The prior PASS
remains on record for the pre-amendment tree; the re-review runs on the
amended one. PR #82 stays the vehicle and is amended.

Amendment scope, evals first:

1. `skills/orchestrate/evals/eval-01.md` — the dialogue graded line
   changes to grade the ratón chispeante default (muse spark 1.2
   contributor) with the ballena (deepseek v4 flash) as the named
   alternative, BEFORE any content edit. `evals/eval-03.md`'s fixture
   is judged the same way: "picked '1 ballena'" stands only if it
   reads as an owner CHOICE (valid under the new law — the ballena
   stays selectable); if it reads as the default, it changes first
   too.
2. `reference/runners.md` — invert the default/alternative labels
   between the two seats; document the full name "ratón chispeante
   (pl. ratones chispeantes)" at the seat entry; in-scope polish now
   included: fix the forward reference at the `--auto` paragraph and
   re-scope the consent note as opencode-wide rather than ratón-only.
3. `skills/orchestrate/SKILL.md` — step 3's offered default becomes
   1 ratón chispeante (muse spark 1.2 contributor), ballena the named
   alternative; step 6's two-step launch snippet shows the ratón argv
   with the ballena's cited nearby (single-definition discipline);
   every SKILL.md line the new law falsifies updated;
   `references/reviewer.md`'s "(default 1 ballena)" line inverted.
4. `docs/how-it-works/execution.md` — falsehood check re-run under the
   new law; updated wherever it narrates the dispatch dialogue or
   names the ballena as the default/representative wave seat; dated
   records stay untouched. Same-commit with the SKILL.md change
   (house rule: behavior change updates the affected chapter).
5. All four gates exit 0; PR #82 updated (body already carries
   `Closes MAT-105`); `CHANGELOG.md` and ADRs stay untouched (dated
   records — the never-touch list and the ADR's nature both hold).
