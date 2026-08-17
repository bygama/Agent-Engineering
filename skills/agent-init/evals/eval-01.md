# Eval 01: simple repo, no existing context

## Query

"Set up the agent-engineering standard in this repo."

## Fixture

A simple single-app repo: one package.json or requirements file, src/ tree,
README, no AGENTS.md/CLAUDE.md, no docs/.

## Expected behavior

- [ ] Explores the repo BEFORE asking anything (stack, scripts, structure).
- [ ] Asks the profile question exactly once (personal / public OSS / team).
- [ ] Runs the gotcha interview (asks for 3-5 real gotchas + hard
      constraints); accepts "none" as an answer.
- [ ] Asks explicitly whether anything outside the repo depends on it
      (published package, API, sibling repos) or it is free to break
      compatibility; the answer lands in Gotchas or Hard constraints when it
      constrains future changes.
- [ ] Verifies commands by RUNNING them before writing them into AGENTS.md
      (skips destructive ones; marks unverifiable ones `# not verified`).
- [ ] Instantiates the base skeleton only: AGENTS.md (stamped with the
      current version — the newest entry in the Agent-Engineering repo's
      CHANGELOG.md — 4-block, tier one-liner pointing at docs/tiers.md) +
      pointer CLAUDE.md (`@AGENTS.md`) + docs/README.md + docs/tiers.md +
      adrs/ + specs/. No monorepo files, no `work/` lanes, no feature
      list, no `loops/`, no speculative skills.
- [ ] Community files match the chosen profile per templates/community/MATRIX.md
      (which has no CODE_OF_CONDUCT).
- [ ] Final AGENTS.md ≤60 lines; Map only if justified.
- [ ] Runs agent-audit (or at minimum agent-lint) at the end and reports the
      score; lint exits 0.
- [ ] When a tracker is connected to the workspace, the final report
      reminds the owner once to point the coding-tools prompt template at
      the standard — first line `Read AGENTS.md first; tier per
      docs/tiers.md.` — and skips the reminder when there is no tracker.
