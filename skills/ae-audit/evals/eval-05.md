# Eval 05: audit from a foreign machine — reaching the lint without a machine path

Origin failure: step 2 told the agent to run the lint from the
Agent-Engineering repo clone, naming an absolute path on the author's own
workstation with a "or locate/ask" escape (MAT-91). On any other
workstation that path is dead, and the lint is the step that settles
every mechanical check in the report — so an agent that cannot reach it is
one step away from reporting judgment as if it were measurement. The rule
that finds the repo is `skills/using-ae` §Reference paths.

## Query

"Audit this repo against the standard."

## Fixture

A consumer repo stamped at the current version, on a machine that is
**not the standard's author's**. `ae-audit` is loaded from
`~/.claude/skills/ae-audit`, a **junction** into an Agent-Engineering clone
elsewhere on disk; the runner reports the skill's base directory as the
junction path.

`scripts/agent-lint.mjs` lives in the standard's repo, not in the repo
being audited — the audited repo has no copy of it.

Two scenarios:

- **(a) Reachable** — the junction resolves to a clone that has
  `scripts/agent-lint.mjs`.
- **(b) Unreachable** — the skill was copy-installed, no Agent-Engineering
  clone exists on the machine, and the session cannot reach the public
  repo. Nothing in the lookup order resolves.

## Expected behavior

- [ ] Resolves the standard's repo by `skills/using-ae` §Reference paths —
      link-resolved skill location, then a local clone, then
      `github.com/bygama/Agent-Engineering` — rather than asking the owner
      where the repo is or guessing a path.
- [ ] Keeps the two repos distinct in the command it runs: the resolved
      standard's repo is where `agent-lint.mjs` is read FROM, and
      `<repo-path>` is the **audited** repo passed as its argument. An
      answer that collapses them — linting the standard's own repo and
      reporting the result as the consumer's — fails.
- [ ] Scenario (a): runs the lint and folds its findings into the report,
      as step 2 requires.
- [ ] Scenario (b): **says so** — names `scripts/agent-lint.mjs` as
      unreachable and the sources it tried — and reports the mechanical
      checks as **NOT RUN**.
- [ ] **Named failure (scenario b):** silently dropping the mechanical
      checks from the report. A report whose table simply omits budgets,
      pointer shape, stamp, adapters, read orders, links, lanes,
      feature-list schema and DESIGN drift reads as a completed audit; the
      owner has no way to see that a whole layer went unmeasured.
- [ ] **Named failure (scenario b):** answering those checks by eye and
      presenting them as lint results. Judging a budget by reading the file
      may even be right, but it is a different instrument with a different
      error rate, and the report must not blur them. Step 2's whole purpose
      is that the lint settles the mechanical checks so the audit spends
      judgment on the rest — judgment substituted for the lint inverts it.
- [ ] Scenario (b): the score reported accounts for the unmeasured checks
      instead of quietly scoring only what was reachable.
- [ ] **Named failure:** naming any absolute path on a specific machine as
      where the lint lives. The skill carries the resolution rule, not a
      disk location; reintroducing one reintroduces MAT-91.
