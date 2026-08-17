# Example: machine-config repo

The living example — not a mock:
**[bygama/workstation](https://github.com/bygama/workstation)** is a
real, public PowerShell machine-restore repo running under this
standard (migrated 2026-08-17). Read it live instead of a snapshot that
would drift:

- [`AGENTS.md`](https://github.com/bygama/workstation/blob/main/AGENTS.md)
  — canonical, stamped, ~58 lines: verified commands (its test suite
  runs at init), 9 real gotchas (synced-copy rules, secrets shapes,
  three-way launcher sync), damage-preventing constraints
  (secrets-never-enter-git, idempotent writers).
- [`terminal/AGENTS.md`](https://github.com/bygama/workstation/blob/main/terminal/AGENTS.md)
  — a per-directory context file ≤30 lines, with root-duplicated rules
  distilled out during migration.
- [`docs/tiers.md`](https://github.com/bygama/workstation/blob/main/docs/tiers.md)
  — the consumer tier guide, installed by the seed.
- Its CI runs its own tests **plus this standard's lint on every PR**
  (`.github/workflows/verify.yml`, job `standard`) — continuous
  compliance a consumer can adopt in ~15 lines of workflow.

What migration looked like end to end (plan → approval → atomic apply →
lint 0 findings) is recorded in the repo's PR history (#12–#16).
