<!-- lint fixture: pointer CLAUDE.md hosts a fenced tool-managed block; the remainder after stripping must be ≤3 lines with @AGENTS.md. -->
# pointer-fenced-fixture

Standard: AE/1.3.2

Small demo service, plain Make toolchain.

## Commands

- `make check` # not verified

## Gotchas

- First boot takes ~40s while models load; don't assume a hang.

## Hard constraints

- Never run the destructive reset script without explicit human approval.
