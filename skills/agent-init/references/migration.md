# Migration mapping (v1 and legacy → v2)

The migration plan is ALWAYS presented and approved before any mutation, and
requires a clean git tree so everything is reversible.

## v1 → v2 (previous standard: canonical CLAUDE.md, no stamp)

| v1 element | Action | Destination |
|---|---|---|
| Canonical CLAUDE.md content (summary, Commands, Gotchas, Hard constraints, Map) | Move verbatim | AGENTS.md 4 blocks |
| — | Add | current `Standard: AE/<major>.<minor>` stamp + tier one-liner after the summary |
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

- **AE/2.0** (2026-08-16) — baseline of the v2 standard; migrations above.
- **AE/2.1** (2026-08-16) — `PROGRESS.md` gains a `## Verification` section
  (PASS evidence written by work-verify; gates the close handoff). Migrating
  2.0 → 2.1: append the section to any open lane's PROGRESS.md, restamp.
  Closed lanes and everything else: untouched.
- **AE/2.2** (2026-08-16) — `loops/` template added (standing automation
  artifact, instantiated by loop-setup only when a task passes the loop
  filter). Migrating 2.1 → 2.2: restamp only; nothing else changes in an
  installed repo.
- **AE/2.3** (2026-08-16) — lint fix: cmd-drift no longer flags commands
  carrying the `# not verified` marker. Migrating 2.2 → 2.3: restamp
  only; repos that removed the marker to silence false drift may restore
  it.
- **AE/2.4** (2026-08-16) — Orca-first execution (ADR-001). Migrating
  2.3 → 2.4: restamp; if the repo has `loops/`, replace each loop's
  trigger fallback line with the manual-iteration fallback ("run one
  iteration of `loops/<name>.md`" to any agent). No other file changes.
- **AE/2.5** (2026-08-16) — tier XL (ADR-002). Migrating 2.4 → 2.5:
  restamp, extend the tier one-liner with `· XL fan-out` and the
  `(docs/tiers.md)` pointer, install `docs/tiers.md` from the template.
  Open lanes unaffected.
