# PLAN — mat-68-lint-pointer-exemption

SPEC: `work/mat-68-lint-pointer-exemption/SPEC.md` (approved, DECISIONS
ruling 2). One step = one commit = one dispatch.

## Constraints (apply to every step)

- Do NOT touch CHANGELOG.md; no restamp; no version bump — the owner
  paces releases, this change accumulates unreleased.
- Fixture-first ordering: step 1's commit lands before step 2's in
  history (evals-before-content, mirrored).
- The marker grammar is defined ONCE, in `scripts/agent-lint.mjs`; every
  prose surface (checklist, docs, reference) cites the lint as settling
  it and never restates the grammar.
- All artifacts in English.

## Steps

1. [integration] Add three fixture mini-repos —
   `tests/fixtures/pointer-fenced/`, `tests/fixtures/pointer-unfenced/`,
   `tests/fixtures/pointer-unclosed/`, each a self-contained CLAUDE.md +
   minimal stamped AGENTS.md modeled on `tests/fixtures/v2-clean/` — and
   three cases in `tests/run-lint-tests.mjs` asserting SPEC §2's
   expectations (fenced passes / unfenced-extra fails / unclosed fails,
   via `pointer-shape`).
   Acceptance: `node tests/run-lint-tests.mjs` exits 1 with exactly one
   FAIL line — the `pointer-fenced` case (red until step 2); every other
   case, including the two new failing-fixture cases, passes.

2. [judgment] In `scripts/agent-lint.mjs`, add a
   `stripToolManagedBlocks(lines)` helper implementing SPEC §1 (matched
   kebab-name BEGIN/END HTML-comment marker lines + interior + blank-line
   padding removed; first matching END closes a BEGIN; unmatched BEGIN
   strips nothing) and apply it in the pointer check only — both the
   ≤3-line count and the `@AGENTS.md` test run on the remainder; update
   the script's header comment to note the exemption.
   Acceptance: `node tests/run-lint-tests.mjs` exits 0 (all cases incl.
   step 1's three); `node scripts/agent-lint.mjs . --ignore
   tests,templates,global,examples` exits 0.

3. [mechanical] In `skills/ae-audit/references/checklist.md`: pointer
   rows gain a one-clause fenced tool-managed-block exemption note citing
   the lint (SPEC §3); the pointer + Monorepo rows are reworded to the
   nesting law — nested AGENTS.md (≤30) + pointer beside it at any earned
   depth, no privileged `apps/*` level — retiring per-app wording
   file-wide (DECISIONS ruling 1).
   Acceptance: `grep -i "tool-managed" skills/ae-audit/references/checklist.md`
   exits 0 AND `grep -iE "per.app" skills/ae-audit/references/checklist.md`
   exits 1.

4. [mechanical] One-clause exemption note in BOTH
   `docs/how-it-works/standard-lifecycle.md` (the pointer enumeration,
   §"What a consuming repo carries") and `reference/context.md` (budget
   table pointer row), each citing the lint as settling the grammar
   (SPEC §§4-5, DECISIONS ruling 2).
   Acceptance: `grep -il "tool-managed" docs/how-it-works/standard-lifecycle.md
   reference/context.md` lists both files; `node scripts/agent-lint.mjs .
   --ignore tests,templates,global,examples` exits 0.

5. [mechanical] Gate sweep: run all four gates and record command
   evidence in PROGRESS.md.
   Acceptance: `node scripts/agent-lint.mjs . --ignore
   tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
   `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs` all
   exit 0.
