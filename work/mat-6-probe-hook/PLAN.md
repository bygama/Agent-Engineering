# MAT-6 SessionStart Orca probe hook — plan

Owner-approved design (2026-08-17): every session on this machine learns
Orca availability at turn 1 via a SessionStart hook; skills keep their
own step-0 probe for machines without the hook (ADR-001 D3). Canonical
content lives in the global layer; the workstation installer applies it.
The installer must MERGE the hook into live settings — Orca injects its
own hooks there and they must survive.

- [ ] Canonical probe script in the global layer — accept:
      `pwsh -NoProfile -File global/hooks/orca-probe.ps1` prints one
      `ORCA: …` line, exit 0
- [ ] `reference/orca.md` records that the injected line satisfies
      step 0 — accept: `rg "session-start hook" reference/orca.md`
      non-empty
- [ ] workstation: synced copy + `claude/hooks.json` + installer
      hook-merge + tests — accept: `pwsh ./tests/run.ps1` exit 0
- [ ] Installer dry-run clean — accept:
      `pwsh claude/install.ps1 -WhatIfOnly` exit 0
- [ ] AE gates green — accept: the four gate commands exit 0
