# Migration mapping (v1 and legacy → v2)

The migration plan is ALWAYS presented and approved before any mutation, and
requires a clean git tree so everything is reversible.

## v1 → v2 (previous standard: canonical CLAUDE.md, no stamp)

| v1 element | Action | Destination |
|---|---|---|
| Canonical CLAUDE.md content (summary, Commands, Gotchas, Hard constraints, Map) | Move verbatim | AGENTS.md 4 blocks |
| — | Add | current `Standard: AE/MAJOR.MINOR.PATCH` stamp + tier one-liner after the summary |
| AGENTS.md entry stub | Replace | The canonical AGENTS.md above |
| CLAUDE.md | Replace | ≤3-line pointer (`@AGENTS.md`) |
| Per-app CLAUDE.md (≤30) | Convert | Per-app AGENTS.md (≤30) + per-app pointer CLAUDE.md |
| docs/, ADRs, specs, repo skills, community files | Keep as-is | — |

A healthy v1 repo migrates in one atomic step; the plan lists before/after
line counts of always-loaded context. Between v2 minor versions, apply the
per-version notes appended at the bottom of this file.

## Legacy → v2 (2025-style: contracts, adapters, read orders)

| Legacy element | Action | Destination |
|---|---|---|
| AGENTS.md rule lists | Distill: disposition each rule as gotcha / hard constraint / delete, with a one-line reason | AGENTS.md blocks 3-4 |
| Read orders ("read X first") | Delete | Map block absorbs genuinely non-obvious locations |
| CODEX.md / GEMINI.md / .cursorrules adapters | Delete | Canonical AGENTS.md + pointer CLAUDE.md are the only entry files |
| Per-app AGENTS.md contracts | Replace | Per-app AGENTS.md ≤30 lines + pointer (monorepo templates) |
| docs/conventions prose (code style, commit format) | Delete if a linter/formatter enforces it; else one line in Hard constraints or a proposed skill | linters / AGENTS.md / skill proposal |
| Procedural docs ("how to add X") | Propose as repo skill — do NOT create without approval | `.claude/skills/` proposals list |
| ADRs, specs, diagrams | Keep as-is | docs/ (rich references) |
| Existing repo skills | Keep; flag for later audit | `.claude/skills/` |
| Root README, LICENSE, community files | Keep | — |

## Distillation rules

- Genuine content MOVES, never disappears: every kept gotcha/constraint in
  the new AGENTS.md cites which source line it came from (in the plan, not in
  the file).
- A rule survives as **hard constraint** only if violating it causes real
  damage (data loss, security, irreversible ops, human-approval gates).
- A rule survives as **gotcha** only if it states a non-inferable fact.
- Everything else is taste or common sense → delete, with the reason logged
  in the migration plan.

## Plan format

```markdown
## Migration plan: <repo>

### Detected shape (v1 | legacy | mixed)
### Keep (N items)
### Move (source line → destination block, one line each)
### Distill (rule → disposition, one line each)
### Delete (file → reason)
### Propose as skills (name → source doc → trigger)
### Resulting tree (before/after line counts of always-loaded context)
```

Wait for explicit approval of this plan before touching anything.

## Per-version notes

Since ADR-003 versions follow SemVer (`AE/MAJOR.MINOR.PATCH`); the 0.x
entries below shipped under old `AE/2.<n>` names (kept in parentheses —
repos may still carry those stamps). "v1 shape" / "v2 shape" name file
LAYOUTS, not versions: v1 = the 0.1.0 predecessor layout, v2 = the
stable line's layout.

- **0.2.0** (2026-08-16, formerly AE/2.0) — baseline of the v2 shape;
  migrations above.
- **0.3.0** (2026-08-16, formerly AE/2.1) — `PROGRESS.md` gains
  `## Verification`. Migrating up: append the section to any open lane's
  PROGRESS.md, restamp. Closed lanes and everything else: untouched.
- **0.4.0** (2026-08-16, formerly AE/2.2) — `loops/` template added.
  Migrating up: restamp only.
- **0.4.1** (2026-08-16, formerly AE/2.3) — lint fix: cmd-drift honors
  `# not verified`. Migrating up: restamp only; repos that removed the
  marker to silence false drift may restore it.
- **0.5.0** (2026-08-16, formerly AE/2.4) — Orca-first execution
  (ADR-001). Migrating up: restamp; if the repo has `loops/`, replace
  each loop's trigger fallback line with the manual-iteration fallback
  ("run one iteration of `loops/<name>.md`" to any agent).
- **0.6.0** (2026-08-16, formerly AE/2.5) — tier XL (ADR-002). Migrating
  up: restamp, extend the tier one-liner with `· XL fan-out` and the
  `(docs/tiers.md)` pointer, install `docs/tiers.md` from the template.
- **0.6.1** (2026-08-17, formerly AE/2.6) — errata: triage-loop example
  assigns S/M/L/XL per `docs/tiers.md`. Migrating up: restamp; fix the
  instantiated example's tier line if present.
- **1.0.0** (2026-08-17) — SemVer adoption (ADR-003), stable line
  declared. Migrating 0.6.1/AE/2.6 → 1.0.0: restamp to
  `Standard: AE/1.0.0`. Nothing else changes in an installed repo —
  a naming-only release for consumers.
- **1.1.0** (2026-08-17) — relay, the lane executor (ADR-004).
  Migrating up: restamp; optionally refresh `docs/tiers.md` from the
  template (its L row gains the recommended-executor mention). No
  installed file must change to stay compliant.
- **1.2.0** (2026-08-17) — work-plan + using-ae + the SessionStart
  entry hook (ADR-005). Migrating up: restamp only — skills are
  machine-global (junctions) and the hook applies via the workstation
  installer, so nothing changes inside an installed repo.
