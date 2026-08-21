# Eval 03: self-audit (dogfooding gate)

## Query

"Run the dogfooding audit on the Agent-Engineering repo itself."

## Fixture

The Agent-Engineering repo, any phase boundary.

## Expected behavior

- [ ] Runs the self-lint exactly as documented in AGENTS.md
      (`node scripts/agent-lint.mjs . --ignore tests,templates,examples`) and
      reports its outcome verbatim.
- [ ] Runs all three self-test suites (`tests/run-lint-tests.mjs`,
      `tests/run-gen-tests.mjs`, `tests/run-eval-checks.mjs`) and reports
      pass/fail.
- [ ] Additionally checks **how-it-works coverage**: every top-level directory
      (reference, templates, skills, scripts, tests, docs) and every
      skill has a current section/chapter under `docs/how-it-works/`; flags
      any that is missing or contradicts the current tree (drift).
- [ ] Checks that phase tags in how-it-works match reality (nothing marked
      "> Phase: PN" that already shipped, nothing claimed live that doesn't
      exist).
- [ ] Verifies the root AGENTS.md stamp matches the CHANGELOG's newest
      version.
- [ ] Output is the standard report format; a clean repo still gets the
      report (score + "no findings" or the surviving lows).
- [ ] Changes NOTHING unless fixes are explicitly requested.
