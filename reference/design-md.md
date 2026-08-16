# DESIGN.md: compiled design source

Sources: [DESIGN.md draft spec](https://github.com/google-labs-code/design.md)
(Google Labs, Apache 2.0); this repo's `docs/specs/SPEC-design-md.md`.
Retrieved 2026-07-30; ported 2026-08-16.

## What it is

One DESIGN.md per app with UI: machine-readable design tokens in YAML
frontmatter + human-readable design rules in prose. Tokens are edited ONLY
here and compiled into code (`design.tokens.css`) by
`scripts/design-md-gen.mjs` — code never hand-defines a token. Placement:
repo root (single app) or each app root (monorepo).

## Format (Google spec + one extension)

- Frontmatter: `name` (required); `colors`, `typography`, `spacing`,
  `rounded`, `components`; `{path.to.token}` references resolve across
  groups; component state variants use related keys (`button-primary-hover`).
  Hex colors must be quoted — YAML reads a bare `#` as a comment.
- Prose sections, in this order when present: Overview, Colors, Typography,
  Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts.
- Extension `## Decisions`: `### <surface>` (route/screen) subheadings,
  entries `- YYYY-MM-DD — <decision>`. One line per decision; longer
  rationale lives in the prose sections. Entries are standing decisions:
  removing one is an explicit, discussed edit — never a silent drop.
- Extension `modes:` (frontmatter): per-mode token groups plus an optional
  `selector` (default `:root[data-theme="<mode>"]`). The generator re-assigns
  the mode's variables under that selector after the main block. A mode that
  only widens scope (a "mixto" that is dark applied to the chrome) is the
  SAME value set with an extended selector — never a third palette.
  Components consume semantic tokens and never branch on theme.
- Spec-compliant consumers preserve unknown sections, so the extension keeps
  the file valid for any DESIGN.md-aware tool.

## Compilation

`node scripts/design-md-gen.mjs <DESIGN.md> --target tailwind4|cssvars`
writes `design.tokens.css` next to the source with a DO-NOT-EDIT header that
records the target. Mapping: `colors.X` → `--color-X`; `spacing.N` →
`--spacing-N`; `rounded.N` → `--radius-N`; `typography.T` → `--font-T`
(fontFamily), `--text-T` (fontSize), `--text-T--<kebab-prop>` (other props);
`components.C.prop` → `--C-<kebab-prop>`, references resolved. An
unresolved reference is a hard error.

## Enforcement

agent-lint, only when a DESIGN.md exists: frontmatter parses and has
`name`, known sections in order, references resolve, Decisions entries
dated, generated file present and drift-free (in-memory regeneration).
agent-audit adds the judgment rows: UI app without DESIGN.md, raw values
duplicating tokens, Decisions contradicted by code. The
`designing-consistently` skill (skills repo) owns the workflow: read before
building, consume instead of inventing, record decisions as a gated step.
