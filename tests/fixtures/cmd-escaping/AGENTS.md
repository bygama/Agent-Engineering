<!-- lint fixture: a Commands entry whose path escapes the repo (MAT-89).
     `../sibling-toolchain/` deliberately does not exist here: the owner's
     checkout and CI both place it beside the repo, an Orca worktree does
     not. The lint must report that, and must not fail on it. -->
# cmd-escaping-fixture

Standard: AE/1.4.0

Small consumer repo whose lint tooling lives in a sibling checkout.

Tiers: S direct+verify · M lane+plan · L four files+feature list · XL fan-out — doubt → higher (docs/tiers.md).

## Commands

- Self-lint: `node ../sibling-toolchain/scripts/agent-lint.mjs .`
- Smoke: `node scripts/present.mjs`
- Vendored: `node /opt/absent-toolchain/tool.mjs`

## Gotchas

- The sibling checkout exists in the owner's tree and in CI; a worktree
  sees no such path, and the command is still correct.
