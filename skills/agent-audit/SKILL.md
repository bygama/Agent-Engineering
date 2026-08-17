---
name: agent-audit
description: Audits a repository against the agent-engineering standard (entry files, version stamp, work lanes, feature lists, skills, docs, DESIGN.md) and reports a score with concrete fixes. Use when checking repo quality, after running agent-init, when context feels bloated or outdated, when checking version drift, or as the dogfooding gate on the Agent-Engineering repo itself.
---

# Agent audit

Measures a repo against the agent-engineering standard and reports what to
fix. **Report-only by default** — apply fixes only when the user explicitly
asks ("audit and fix", "apply the fixes").

## Workflow

Copy this checklist and tick items off:

```
Audit progress:
- [ ] 1. Inventory the repo's standard surface
- [ ] 2. Run agent-lint (mechanical subset)
- [ ] 3. Load the checklist
- [ ] 4. Evaluate every judgment check
- [ ] 5. Emit the report
- [ ] 6. Fixes (ONLY if requested)
```

**1. Inventory.** Find the surface: root AGENTS.md (+ stamp line), CLAUDE.md,
per-tool adapters, per-app AGENTS.md/CLAUDE.md, `work/` lanes,
`feature_list.json`, `.claude/skills/` and `skills/`, `docs/` tree, DESIGN.md
files. Note line counts and the stamp version.

**2. Lint.** Run `node scripts/agent-lint.mjs <repo-path>` from the
Agent-Engineering repo clone (on this machine
`C:/Briar/repos/mine/Agent-Engineering` — or locate/ask). It settles the
mechanical checks (budgets, pointer shape, stamp, adapters, read orders,
links, lanes, feature-list schema/regression, DESIGN drift, command drift) so
the audit spends judgment on the rest. Fold its findings into the report.

**3. Load** [references/checklist.md](references/checklist.md) — the full
judgment-check table with pass conditions and severities.

**4. Evaluate every check.** Read the actual files; never guess from names.
For "commands verified", cross-check claimed commands against lockfiles and
script definitions. For "dead docs", grep for references to each doc from
entrypoints, indexes, and skills. For lanes, judge whether PROGRESS reflects
reality (git log disagreeing with PROGRESS is a finding).

**5. Emit the report** in exactly this format:

```markdown
## Agent audit: <repo>

Standard: <stamped version or "unstamped"> · current AE/<newest CHANGELOG entry>

Score: N/10

| Severity | File | Finding | Fix |
|---|---|---|---|
| high | ... | ... | ... |
```

Most severe first. Scoring: start at 10; −2 per high, −1 per medium, −0.5 per
low; floor 0. A clean repo still gets the report (score + "no findings").
When the stamp is behind the current version, the fix column recommends
`agent-init` migration (one atomic step) instead of piecemeal edits.

**Upstream findings.** A finding that traces to the standard itself — a
check false-positive, a template bug, an incomplete migration note — is
labeled `upstream` in the table and excluded from the repo's score: the
repo is not penalized for the standard's bug. Close each one with a
ready-to-run filing proposal carrying the evidence:
`orca linear create --team MAT --project "Agent-Engineering" …` when
this machine has the standard's workspace, otherwise
`gh issue create --repo bygama/Agent-Engineering …`
(the standard's repo is public). Proposing is the audit's job; filing
happens only on the owner's explicit ok.

**6. Fixes — only if requested.** Apply exactly the fixes listed in the
report, nothing else. Genuine content (real gotchas, hard constraints) is
MOVED to its correct place, never deleted. Re-run the audit afterward and
report the new score.

## Dogfooding mode (target = the Agent-Engineering repo)

Everything above, plus:

- Run the documented self-lint and all three self-test suites
  (`tests/run-lint-tests.mjs`, `tests/run-gen-tests.mjs`,
  `tests/run-eval-checks.mjs`); report outcomes verbatim.
- **how-it-works coverage:** every top-level directory and every skill has a
  current section under `docs/how-it-works/`; flag missing or contradicting
  sections (drift is a finding — the same-change rule was violated).
- **Phase-tag honesty:** nothing tagged `> Phase: PN` that already shipped;
  nothing claimed live that doesn't exist.
- Stamp matches the newest CHANGELOG version.

## Judgment notes

- ADRs and specs are rich references — never bloat, regardless of count.
- A Map block is a signal (allowed); a read order is a toll (violation).
- A healthy v1 repo is "behind", not "sloppy" — say so and point to
  migration; don't invent findings to pad the table.
- When unsure whether a rule is "genuine safety", ask: does violating it
  cause real damage? If not, it's taste — flag it.
