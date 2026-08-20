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

- [x] 1. [judgment] Falsehood check FIRST (so any needed eval change
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

- [x] 2. [judgment] `reference/runners.md` gains the ratón chispeante
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

- [x] 3. [mechanical] Full gate suite + lane bookkeeping current
  (PROGRESS.md truthful, DECISIONS.md carries the SPEC-approval ruling
  and the step-1 judgments). — accept: all four commands exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`

## Amendment steps (owner ruling 2026-08-20 — SPEC "Amendment" section)

Constraints unchanged, plus: the offered default is now **1 ratón
chispeante** (muse spark 1.2 contributor); the ballena is the named
owner-selectable alternative; full house name "ratón chispeante
(pl. ratones chispeantes)" documented at the runners.md seat entry.

- [x] A1. [judgment] EVALS FIRST — `evals/eval-01.md`'s dialogue graded
  line changes to grade the ratón chispeante default (muse spark 1.2
  contributor) with the ballena (deepseek v4 flash) as the named
  alternative; `evals/eval-03.md`'s fixture judged: "picked '1
  ballena'" stands only if it reads as an owner CHOICE recorded in the
  Task spec (the ballena stays selectable under the new law) — if it
  reads as the default, it changes here too, before any content; the
  judgment lands in DECISIONS.md. — accept:
  `grep -c 'ratón chispeante' skills/orchestrate/evals/eval-01.md` ≥ 1
  AND `node tests/run-eval-checks.mjs` exits 0

- [x] A2. [judgment] `reference/runners.md` — invert the
  default/alternative labels between the two seats (ratón = the
  dispatch dialogue's default, cost-proven; ballena = the
  owner-selectable alternative, fully registered); document the full
  name "ratón chispeante (pl. ratones chispeantes)" at the seat entry;
  fix the `--auto` paragraph's forward reference; re-scope the consent
  note opencode-wide rather than ratón-only. Consumes A1's new graded
  wording (the behavior the registry must match). — accept:
  `grep -c 'ratones chispeantes' reference/runners.md` ≥ 1 AND
  `grep -ci 'default' reference/runners.md` ≥ 1 AND
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0

- [ ] A3. [judgment] Orchestrate skill + narrating chapter, same commit
  (house rule): `SKILL.md` step 3's offered default becomes 1 ratón
  chispeante (muse spark 1.2 contributor), ballena the named
  alternative; step 6's two-step launch snippet shows the ratón argv
  verbatim (`opencode --auto -m opencode-go/muse-spark-1.2-contributor`)
  with the ballena's launch cited nearby per single-definition
  discipline (`reference/runners.md` holds both argv); every SKILL.md
  line the new law falsifies updated (e.g. the judgment note naming
  "the ballena default"); `references/reviewer.md`'s "(default 1
  ballena)" line inverted; `docs/how-it-works/execution.md` re-checked
  under the new law and updated wherever it narrates the dialogue
  default or draws the ballena as THE wave seat (topology and stage-6
  labels, the launch fork, the borrowed-launch paragraph), dated
  records untouched. — accept:
  `grep -c 'ratón chispeante' skills/orchestrate/SKILL.md` ≥ 1 AND
  `bash -c "! grep -rqi 'default 1 ballena' skills/orchestrate docs/how-it-works"`
  exits 0 AND `grep -c 'ratón' docs/how-it-works/execution.md` ≥ 1 AND
  `node tests/run-eval-checks.mjs` exits 0

- [ ] A4. [mechanical] Full gate suite + lane bookkeeping current
  (amendment ruling and A1 judgment in DECISIONS.md, PROGRESS.md
  truthful). — accept: all four commands exit 0:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` ·
  `node tests/run-lint-tests.mjs` · `node tests/run-gen-tests.mjs` ·
  `node tests/run-eval-checks.mjs`
