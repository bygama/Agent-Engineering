---
issue: MAT-6
---

# MAT-6 SessionStart Orca probe hook — progress

## Done

- AE half: `global/hooks/orca-probe.ps1` + orca.md step-0 rule (AE PR #32).
- workstation half: synced copy + `hooks.json` + installer hook-merge +
  invariant test (workstation PR #15).
- Live install applied; e2e verified (hook emits `ORCA: available`,
  Orca's 11 hook events intact, `claude doctor` accepted).
- Review medium finding fixed: edit-site warning (workstation PR #16).

## In progress

## Tried and failed

## Next

## Verification

### 2026-08-17 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global` → exit 0
- L2 behavioral: `pwsh ./tests/run.ps1` (workstation) → exit 0 (26 passed, 0 failed); `pwsh claude/install.ps1 -WhatIfOnly` → exit 0
- L3 end-to-end: live `claude/install.ps1` → exit 0, `claude doctor` accepted; applied `~/.claude/hooks/orca-probe.ps1` → `ORCA: available`; live settings: SessionStart = Orca hook + probe, all 11 Orca hook events intact
- Fresh-context review: PASS — merge preservation verified three ways (live file, idempotent dry-run, synthetic fixture with a fake Orca hook); 1 medium fixed (edit-site footgun), 3 low latent (DECISIONS)
- Adversarial review: n/a — M tier, offered per the opt-in rule, owner declined
