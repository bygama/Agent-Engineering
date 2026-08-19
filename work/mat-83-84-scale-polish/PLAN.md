# MAT-83 + MAT-84 scale polish — plan

Constraints (every step):
- CHANGELOG.md untouched; no restamp; no version bump — the set rides
  the owner's 1.4.0 release after merge.
- Budgets enforced: root ≤60/100, nested ≤30, pointer ≤3 outside fenced
  tool-managed blocks, global ≤40; reference/ docs ≤120.
- Affected `docs/how-it-works/` chapters update in the SAME commit as
  the behavioral change they narrate; the battery row lands in the SAME
  commit as its fix.
- All artifacts in English.

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

- [x] 1. `judgment` — Trim `reference/tracker.md` to ≤120 lines: compress
      "The GitHub plane" (the verified-live detail stays in
      `docs/how-it-works/integrations.md`; the reference keeps normative
      rules + pointer, section header stays), tighten prose elsewhere as
      needed; the ADR-001 two-connectors note survives in both places it
      binds (connector section, Without Orca). In the same pass, tighten
      the head citation's Linear-model paraphrase to track the Concepts
      page (SPEC item 4: issue belongs to a team, can be added to a
      project; initiative can contain multiple projects). — accept:
      `[ $(wc -l < reference/tracker.md) -le 120 ] && grep -q "second connector" reference/tracker.md && grep -q "belongs to a team" reference/tracker.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [ ] 2. `judgment` — Widen ae-init eval-06 Run D: preamble and graded
      item cover the no-Orca contract both bare AND with a Linear MCP
      present (the MCP-present case equally refuses the write, states
      it, emits the operations — ADR-001, `reference/tracker.md` Without
      Orca). — accept:
      `grep -qi "MCP present" skills/ae-init/evals/eval-06.md && node tests/run-eval-checks.mjs`
- [ ] 3. `mechanical` `[batch]` — Retired-vocabulary sweep, one commit:
      "per-app" → nested/any-depth vocabulary on `README.md` (budget
      table), `skills/ae-audit/SKILL.md` (inventory line),
      `scripts/agent-lint.mjs` (both finding messages),
      `skills/ae-init/references/migration.md` (conversion TARGET
      columns of lines 14 and 28 only — legacy-side descriptions stay),
      `docs/how-it-works/architecture.md` (examples line); PLUS the
      `per-app` battery row in
      `.claude/skills/docs-sweep/references/patterns.md` naming these
      real instances (ratchet rule, same commit). — accept:
      `! grep -n "per-app" README.md skills/ae-audit/SKILL.md docs/how-it-works/architecture.md scripts/agent-lint.mjs && grep -q "per-app" .claude/skills/docs-sweep/references/patterns.md && node tests/run-lint-tests.mjs`
- [ ] 4. `judgment` — Split the README interop over-bundle (§Installing
      in any repo, ~lines 242-244): AE's nesting rule is ALIGNED with
      the agents.md spec's combine-walking-up / nearest-wins behavior,
      not identical to it — AE adds its own earning test and budgets
      (`reference/context.md`). — accept:
      `grep -qi "aligned" README.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [ ] 5. `judgment` — EVALS FIRST: write `skills/ae-init/evals/eval-07.md`
      (## Query + ## Fixture + ## Expected behavior, checklist lines):
      UI-stack fixture → instantiated root AGENTS.md Gotchas gains ONE
      runtime-neutral browser line (prefer the runner's embedded/managed
      browser; heavy browser MCPs only for capabilities it lacks, never
      from supervised child sessions), phrased WITHOUT assuming Orca,
      riding the same step-1 detection that offers DESIGN.md, budgets
      holding; non-UI fixture → NO browser line, no extra question (no
      noise, graded). The eval's graded phrasing is the interface step 6
      implements. — accept:
      `test -f skills/ae-init/evals/eval-07.md && node tests/run-eval-checks.mjs`
- [ ] 6. `judgment` — Content AFTER evals: `skills/ae-init/SKILL.md`
      step 6 gains the browser-gotcha instruction beside the DESIGN.md
      offer, matching the line eval-07 grades (step 5's interface);
      `docs/how-it-works/standard-lifecycle.md` §Install narrates it in
      the SAME commit. — accept:
      `grep -qi "browser" skills/ae-init/SKILL.md && grep -qi "browser" docs/how-it-works/standard-lifecycle.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [ ] 7. `mechanical` — README adoption section (§Adopting AE on your
      own machine): name `global/CLAUDE.md` as an adaptable
      machine-policy SEED — copy-and-edit, owner-specific lines (chat
      language) stripped, never applied verbatim. — accept:
      `grep -qi "seed" README.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [ ] 8. `mechanical` — Gate sweep, all four exit 0. — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples && node tests/run-lint-tests.mjs && node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs`
