<!-- lint fixture: the regression guard for cmd-drift's reason to exist —
     a cited command whose IN-REPO path does not exist. `scripts/` is
     absent on purpose. The MAT-89 downgrade must never reach this case. -->
# cmd-inrepo-drift-fixture

Standard: AE/1.4.0

Small repo whose Commands block outlived one of its scripts.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- Migrate: `node scripts/missing.mjs`
- Tooling: `node ..config/tool.mjs`

## Gotchas

- The script was deleted and the command was never updated — the drift
  cmd-drift was born to catch.
- `..config/` is an in-repo directory whose NAME starts with two dots —
  it does not escape anything, and the escape test must not read it as
  a `../` prefix.
