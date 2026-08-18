# ae-init artifacts language — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

## Constraints (apply to every step)

- Evals first, split commits: step 1 (eval) is its own commit and lands
  BEFORE step 2 (SKILL.md content) — never squashed together.
- The language split's canonical phrasing, wherever it appears: agent
  context and technical docs English; site content/SEO/README in the
  project's own language — never fix one side into the other.
- Scope fence: touch only `skills/ae-init/**` plus ONE HTML comment in
  `templates/repo/AGENTS.md.template`. No version bump, no CHANGELOG
  entry, no restamp — the release ritual owns those.

## Steps

- [ ] 1. `judgment` — Add `skills/ae-init/evals/eval-04.md` (Query +
  Fixture + Expected behavior, checklist lines, matching evals 01-03's
  voice): fixture = fresh install on a single-app repo whose README and
  site content are Spanish; expected = the generated AGENTS.md comes
  out ENGLISH, carries the language split as a gotcha (canonical
  phrasing per constraints), and the interview asks the settled-once
  language question; matching the README's language (a Spanish
  AGENTS.md) is named as the explicit failure case. Commit the eval
  alone. — accept: `node tests/run-eval-checks.mjs` exits 0
- [ ] 2. `judgment` — Encode exactly what step 1's eval-04 expects:
  (a) `skills/ae-init/SKILL.md` step 3 (gotcha interview) gains the
  settled-once language question — artifacts default to ENGLISH even
  when the repo's human docs are another language; on divergence
  ae-init writes the split into the generated AGENTS.md as a gotcha
  (canonical phrasing) — a few lines in the step's existing voice;
  (b) `templates/repo/AGENTS.md.template` gains one brief HTML comment
  fixing the default (artifacts English by convention). Commit alone,
  after step 1's commit. — accept:
  `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
  exits 0 and `node tests/run-eval-checks.mjs` exits 0
