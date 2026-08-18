# SessionStart hooks

This folder contains the canonical SessionStart hooks that the Agent-Engineering standard ships. On the owner's machine, the workstation installer applies these to `~/.claude/hooks/`. On any other machine, wire them yourself via your runner's settings.

## Hooks

- **orca-probe.ps1**: Emits one line of session context: whether Orca is available right now. Executing skills may cite the emitted line as their completed step-0 probe.
- **using-ae.ps1**: Emits the using-ae entry skill's content at session start, verbatim, under one header line. Silent when the skill is absent.

## Wiring a SessionStart hook

Add a SessionStart entry to your runner's `settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "pwsh -NoProfile -File \"<absolute path to>/hooks/using-ae.ps1\"",
        "timeout": 15
      }
    ]
  }
}
```

**Important notes:**

- Use an absolute path — hook runners perform no shell expansion, no env-var substitution (see MAT-31).
- Copy the scripts next to your runner's config, or point at a clone of this repo.
- The hooks are **optional** — every skill still works when triggered by its description.
- The injection pattern requires the using-ae skill reachable at `../skills/using-ae/SKILL.md` relative to the hook's installed location; the hook stays silent by design if the skill is not found.
