# Second cross-family reviewer seat (ratón chispeante) — plan

## Constraints (apply to every step)

- STACKED LANE, tip of the AE stack: branch `bygama/mat-105-raton-seat`
  cut from `bygama/mat-104-94-single-shot-attrib` (open PR #80, itself
  stacked on PR #77); the PR opens with base
  `bygama/mat-104-94-single-shot-attrib`, NOT main. Gates run on the
  stacked tree — expected and correct.
- Never touch: `CHANGELOG.md`, the `AGENTS.md` version stamp, `global/`,
  `examples/`, `scripts/agent-lint.mjs`, `tests/**`,
  `docs/how-it-works/standard-lifecycle.md` (open PR #78 owns the last
  three). No version bump, no restamp, no CHANGELOG entry — ships with
  1.4.2; the release ritual runs right after this lane merges.
- Owned files: `reference/runners.md`; only if a falsehood is found:
  `skills/orchestrate/SKILL.md`, `skills/orchestrate/evals/eval-03.md`,
  `docs/how-it-works/execution.md` (evals change BEFORE skill content);
  plus this lane folder.
- House name: accented "ratón chispeante" in prose, ASCII "raton" only
  in slugs/branches (parent ruling, DECISIONS.md).
- Launch argv verbatim as proven on this machine:
  `opencode --auto -m opencode-go/muse-spark-1.2-contributor`.
- All artifacts in English.

## Steps

- [ ] 1. [judgment] Falsehood check FIRST (so any needed eval change
  precedes content): read `skills/orchestrate/SKILL.md` step 6 (incl.
  the dispatch-dialogue default at step 3),
  `skills/orchestrate/evals/eval-03.md`, and
  `docs/how-it-works/execution.md`'s review-wave narration against the
  planned runners.md change; record in DECISIONS.md, per file, either
  the no-change judgment (nothing claims the ballena is the ONLY seat;
  the dialogue default "1 ballena" is unchanged by design; eval-03's
  fixture explicitly picked "1 ballena") or the graded line that
  becomes false — in which case eval-03 changes in this step, before
  step 2 touches content. — accept:
  `grep -c 'no-change' work/mat-105-raton-seat/DECISIONS.md` ≥ 1 AND
  `node tests/run-eval-checks.mjs` exits 0

- [ ] 2. [judgment] `reference/runners.md` gains the ratón chispeante
  seat beside the ballena stack (after the single-shot paragraph), one
  coherent edit: (a) the seat — house name, verbatim launch argv
  `opencode --auto -m opencode-go/muse-spark-1.2-contributor`, same
  two-step launch as the ballena, same `--auto` rationale (read-only
  seat; cite, don't restate), proven 2026-08-19 over two production
  reviews (MAT-104 + MAT-94 waves, both PASS at ballena grade), ballena
  stays the dialogue's default, ratón is the owner-selectable
  alternative; (b) first-run consent gotcha NEXT to the launch command
  — opencode's DATA-COLLECTION consent prompt, NOT covered by
  `--auto`, a different prompt class from the permission prompts
  `--auto` kills, one-time manual acceptance per machine/model (owner
  intervened live on the MAT-94 seat), first check for a stalled fresh
  seat; (c) one known-behavior line, not a rule — a seat's worker_done
  printed "(no output)" and never registered in the ledger, transcript
  verdict used per the single-shot guidance above, cause unattributed;
  (d) "The adversarial seat" section's verified-runner sentence gains
  the second pairing, minimal wording. — accept:
  `grep -c 'muse-spark-1.2-contributor' reference/runners.md` ≥ 1 AND
  `grep -ci 'consent' reference/runners.md` ≥ 1 AND
  `grep -c '(no output)' reference/runners.md` ≥ 1 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] 3. [mechanical] Full gate suite + lane bookkeeping current
  (PROGRESS.md truthful, DECISIONS.md carries the SPEC-approval ruling
  and the step-1 judgments). — accept: all four commands exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`
