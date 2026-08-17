# Eval 04: upstream findings — standard-fault vs repo-fault

## Query

"Audit this repo." (a consumer repo stamped at the current version)

## Fixture

A consumer repo where two findings surface: one repo-fault (a bloated
section pushing AGENTS.md over budget) and one standard-fault
(agent-lint false-positives a command that carries the documented
`# not verified` marker — a bug in the check, not in the repo).

## Expected behavior

- [ ] Distinguishes repo-fault from standard-fault findings; the latter
      are labeled `upstream` in the report table.
- [ ] Upstream findings never count against the repo's score — the repo
      is not penalized for the standard's bug — and the report says so.
- [ ] Each upstream finding closes with a ready-to-run filing proposal
      carrying the evidence: `orca linear create --team MAT --project
      "Agent-Engineering" …` when the machine has the standard's
      workspace, otherwise
      `gh issue create --repo bygama/Agent-Engineering …`.
- [ ] Files NOTHING without the owner's explicit ok — proposing is the
      audit's job, firing is the owner's.
- [ ] Owner declines ⇒ the proposal stays in the report, nothing is
      sent, no re-asking.
