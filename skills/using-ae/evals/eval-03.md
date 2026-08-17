# Eval 03: hook — emits SKILL.md when junctioned, silent no-op when absent

## Query

Run `global/hooks/using-ae.ps1` the way SessionStart would invoke it,
once with the skill junctioned and once with it absent.

## Fixture

Two scenarios, modeled on the existing `global/hooks/orca-probe.ps1`
pattern (same SessionStart-injection shape):

(a) **Junctioned** — `~/.claude/skills/using-ae/SKILL.md` exists and is
reachable `$PSScriptRoot`-relative from the hook's installed location
(`~/.claude/hooks/using-ae.ps1` → `~/.claude/skills/using-ae/SKILL.md`),
the standard junction pattern.

(b) **Absent** — that path does not exist (skill never junctioned onto
this workstation, e.g. before MAT-39 wiring).

## Expected behavior

- [ ] Scenario (a): stdout contains the verbatim content of
      `skills/using-ae/SKILL.md` — the full file, not a summary or a
      separate digest — under exactly one header line identifying it as
      the AE entry skill.
- [ ] Scenario (a): the process exits 0.
- [ ] Scenario (b): stdout is empty — no header, no partial output, no
      error text.
- [ ] Scenario (b): the process exits 0 — a missing skill never fails
      session start.
- [ ] The lookup uses no environment variable and no hardcoded user
      path — only a `$PSScriptRoot`-relative path through the junction.
- [ ] As of this eval's writing, `skills/using-ae/SKILL.md` and
      `global/hooks/using-ae.ps1` do not exist yet, so this eval fails
      today; it is expected to pass once U2 (skill) and U3 (hook) ship.
