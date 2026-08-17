# relay — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->
<!-- Gated: execution starts only after owner approval of SPEC.md. -->

- [ ] Evals before content: `skills/relay/evals/` (≥4: dispatch, fix
  loop, refusal/fallback, closing) — accept:
  `node tests/run-eval-checks.mjs` exits 0
- [ ] `skills/relay/SKILL.md` — the minimum that passes the evals —
  accept: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` exits 0
- [ ] ADR-004: relay as recommended default executor at L — accept:
  `test -f docs/adrs/ADR-004-relay.md` (via node/PowerShell) and
  agent-lint exits 0
- [ ] Amendments: `reference/skills.md` supersession +
  `reference/task-tiers.md` L row + affected `docs/how-it-works/`
  chapter + AGENTS.md skills line — accept: grep finds "relay" in all
  four files; agent-lint exits 0
- [ ] README: section documenting every skill and the chain — accept:
  grep finds a skills section listing all seven skills in README.md
- [ ] All gates green — accept: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
  `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs` all
  exit 0
- [ ] Release ritual (`/release`, expected MINOR) + PR to main — accept:
  CHANGELOG entry exists; PR opens green
