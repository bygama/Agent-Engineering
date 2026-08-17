## What

<!-- The change, and why. Tracker-linked work: Closes <KEY> -->

## Verification

<!-- Paste or summarize gate output. -->

- [ ] All four gates exit 0: `agent-lint` · `run-lint-tests` ·
      `run-gen-tests` · `run-eval-checks`
- [ ] Skill touched ⇒ its evals changed FIRST (own commit, evals-before-content)
- [ ] Structure/behavior changed ⇒ the affected `docs/how-it-works/`
      chapter updated in this PR (same-change rule)
- [ ] Template or check changed ⇒ version bump: CHANGELOG entry +
      migration note + restamp surfaces (CHANGELOG header rule)
- [ ] No unrelated changes included
