---
issue: MAT-60
---
# ae-init artifacts language — spec

<!-- Owner-written. The agent never edits this file. -->

ae-init settles the ARTIFACTS LANGUAGE at install time: generated
agent context comes out English by default, and when the repo's human
docs live in another language the split is recorded as a gotcha in
the generated AGENTS.md.

## The gap

Born from a real failure today: installing on a repo with a Spanish
README, ae-init inferred the language and produced a Spanish
AGENTS.md — violating the house convention (technical artifacts in
English; human/site content in the project's own language). Nothing
in ae-init's interview or the template fixes the default, so the
inference goes unchallenged.

## Done looks like

- An ae-init eval covers the scenario: fixture = fresh install on a
  repo whose README/site is Spanish; expected = the generated
  AGENTS.md comes out ENGLISH and carries the language split as a
  gotcha ("agent context and technical docs English; site
  content/SEO/README Spanish — never fix one side into the other");
  matching the README's language is named as the explicit failure
  case. Shape: a new `eval-04.md` — eval-01's fixture is a generic
  fresh repo and grafting a Spanish README onto it would muddy that
  scenario. The eval change lands in its own commit BEFORE the
  SKILL.md content commit (split commits, evals-first hard
  constraint).
- skills/ae-init/SKILL.md step 3 (gotcha interview) gains one
  settled-once language question: artifacts default to ENGLISH even
  when the repo's human docs are another language; when they diverge,
  ae-init writes the split into the generated AGENTS.md as a gotcha.
  A few lines, matching the step's existing voice.
- templates/repo/AGENTS.md.template carries one brief HTML comment
  fixing the default (artifacts English by convention).

## Out of scope

- Any file outside skills/ae-init/** plus that single template
  comment.
- Version bump, CHANGELOG entry, restamp — the release ritual owns
  those.

## Gates

All four green before the PR:

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- `node tests/run-lint-tests.mjs`
- `node tests/run-gen-tests.mjs`
- `node tests/run-eval-checks.mjs`
