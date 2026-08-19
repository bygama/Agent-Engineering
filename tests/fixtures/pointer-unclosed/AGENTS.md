<!-- lint fixture: pointer CLAUDE.md has an unmatched BEGIN marker; an unclosed block is not an exemption. -->
# pointer-unclosed-fixture

Standard: AE/1.3.2

Small demo service, plain Make toolchain.

## Commands

- `make check` # not verified

## Gotchas

- First boot takes ~40s while models load; don't assume a hang.

## Hard constraints

- Never run the destructive reset script without explicit human approval.
