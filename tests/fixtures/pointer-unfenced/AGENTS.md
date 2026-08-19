<!-- lint fixture: pointer CLAUDE.md hosts a fenced block plus unfenced extra content; the remainder after stripping is still >3 lines. -->
# pointer-unfenced-fixture

Standard: AE/1.3.2

Small demo service, plain Make toolchain.

## Commands

- `make check` # not verified

## Gotchas

- First boot takes ~40s while models load; don't assume a hang.

## Hard constraints

- Never run the destructive reset script without explicit human approval.
