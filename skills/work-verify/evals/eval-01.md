# Eval 01: S-tier — ceremony floor

## Query

"Fixed the typo in the price formatter. Verify it."

## Fixture

A repo on the standard: AGENTS.md lists `npm test` (verified). The change is
a one-line edit to `src/format.js`; an existing test covers the formatter.
No lane exists — S tier: existing flow, existing verify command.

## Expected behavior

- [ ] Triages the task as S (existing flow + existing verify command,
      single-file scope) and says so.
- [ ] Runs the verify command (`npm test`) and reports the evidence: command,
      exit code, relevant output line.
- [ ] Does NOT create a lane folder, PROGRESS.md, or any file.
- [ ] Does NOT dispatch a fresh-context reviewer (S has no review seat).
- [ ] If the command fails, verdict is FAIL with what/why/fix — the one-line
      fix does not get a pass for being small.
- [ ] Total ceremony: run + report. Nothing else.
