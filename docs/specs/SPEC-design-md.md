# SPEC: DESIGN.md in the standard — compiled design source + consistency skill

Date: 2026-07-30
Ported: 2026-08-16 (names updated to the v2 standard: agent-lint/agent-audit/agent-init)
Status: Approved (design validated interactively)

## Purpose

UI consistency across sessions fails for two reasons: design decisions live
only in conversation memory (a back button decided one day silently disappears
the next), and tokens defined ad hoc per session drift apart. This spec adds
Google Labs' DESIGN.md format to the context-engineering standard as a
**compiled source of truth** — tokens are edited in DESIGN.md and generated
into code, never hand-defined — plus a decision log and a skill that enforces
the read-consume-record loop.

Sub-project 1 of 2: the standard, generator, enforcement, and skill. The
KioscoDiagonal pilot (legacy migration + DESIGN.md conversion) is a separate
cycle with its own agent-init migration gate.

## Grounding sources

- DESIGN.md draft spec, Google Labs (github.com/google-labs-code/design.md,
  Apache 2.0, retrieved 2026-07-30): YAML frontmatter tokens (`name` required;
  `colors`, `typography`, `spacing`, `rounded`, `components` with
  `{path.to.token}` references), eight `##` prose sections in fixed order
  (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes,
  Components, Do's and Don'ts), lenient consumers: unknown sections preserved,
  duplicate headings are errors.
- This repo's principles: single source of truth, code beats prose, rich
  references, eval-first skills.

## Decisions (fixed)

### Format

- DESIGN.md follows the Google spec verbatim, plus one extension section:
  `## Decisions` — `### <surface>` subheadings (route or screen name), entries
  `- YYYY-MM-DD — <decision>`. Removing a decision is an explicit edit, never
  a silent drop. The extension rides the spec's unknown-section leniency, so
  the file stays valid for any DESIGN.md consumer.
- Placement: repo root for a single-app repo; one DESIGN.md per app root in a
  monorepo. Only repos/apps with UI carry one.

### Compilation (the scalability core)

- Tokens are edited ONLY in DESIGN.md frontmatter. Code consumes a generated
  artifact: `design.tokens.css`, adjacent to its DESIGN.md, with a
  DO-NOT-EDIT header that records source path and target.
- Generator: `scripts/design-md-gen.mjs` in this repo — zero-dep Node, like
  agent-lint. `node design-md-gen.mjs <DESIGN.md> --target tailwind4|cssvars`.
  Parses the token-schema subset of YAML (nested maps, scalars, quoted
  strings) — not full YAML. Resolves `{path.to.token}` references; unresolved
  references are a hard error.
- Variable mapping: `colors.X` → `--color-X`; `spacing.N` → `--spacing-N`;
  `rounded.N` → `--radius-N`; `typography.T` → `--font-T` (fontFamily) plus
  `--text-T`, `--text-T--line-height`, `--text-T--font-weight`,
  `--text-T--letter-spacing` when present; `components.C.prop` →
  `--C-prop` (kebab-case), references resolved. `tailwind4` target wraps the
  variables in `@theme { }`; `cssvars` wraps them in `:root { }`.

### Enforcement ("the 10-point rule")

- agent-lint, active only when a DESIGN.md exists in the scanned tree:
  - `design-frontmatter` (medium): missing/unparseable frontmatter or `name`.
  - `design-sections` (low): known prose sections out of spec order;
    duplicate headings (high, spec error).
  - `design-ref` (medium): `{path.to.token}` that resolves to nothing.
  - `design-decisions` (medium): `## Decisions` entry without a leading
    `YYYY-MM-DD — ` date.
  - `design-drift` (high): adjacent `design.tokens.css` differs from an
    in-memory regeneration (target read from its header).
  - `design-ungenerated` (medium): frontmatter has tokens but no adjacent
    `design.tokens.css`.
- agent-audit checklist, new "Design checks" section (judgment):
  - UI repo/app without DESIGN.md → medium.
  - Components carrying raw hex/px values that duplicate an existing token →
    medium.
  - `## Decisions` entries contradicted by the current code (the disappearing
    back button) → high.
- agent-init: when repo exploration detects a UI stack, offer DESIGN.md
  instantiation from the template (opt-in, never forced).

### Skill: `designing-consistently` (skills repo)

- Eval-first; 3 evals derived from the observed KioscoDiagonal failures:
  1. Surface with a recorded back-button decision — agent must read Decisions
     before editing and preserve or explicitly renegotiate it.
  2. New UI element where tokens/components exist — agent must consume them,
     not invent parallel styles.
  3. Session makes a new design decision — the workflow gate fails unless it
     is appended to `## Decisions` (dated) before claiming completion.
- Workflow: locate the app's DESIGN.md → read tokens + the Decisions entries
  for target surfaces → build consuming generated tokens (new component only
  when no existing pattern fits, and born tokenized) → append/renegotiate
  decisions (gated checklist step) → verify: regenerate + lint, and
  screenshots when the environment allows.
- Lives in the `skills` repo per the library/standard split (its ADR-001).

### Artifacts

| Repo | Artifact |
|---|---|
| Agent-Engineering | `reference/design-md.md` (distilled spec + extension + compilation rule, sources cited) |
| Agent-Engineering | `templates/repo/DESIGN.md.template` |
| Agent-Engineering | `scripts/design-md-gen.mjs` + generator fixture tests |
| Agent-Engineering | agent-lint design checks + fixture tests; audit checklist rows; agent-init UI-detection step |
| skills | `skills/designing-consistently/` (SKILL.md + 3 evals) |

### Out of scope (v1)

- Automated contrast/accessibility checking (audit judgment row only).
- Non-CSS targets (native platforms) — new generator targets when needed.
- The KioscoDiagonal migration and conversion (sub-project 2).

## Amendment 2026-07-30: mode groups

Themed apps (light/dark/mixed) need mode-scoped values without losing
compilation. Frontmatter gains a `modes:` extension: per-mode token groups
plus an optional `selector` (default `:root[data-theme="<mode>"]`); the
generator emits the mode's variables re-assigned under that selector after
the main block (runtime overrides — outside `@theme` for the tailwind4
target). A mode that only widens scope is the same value set with an
extended selector, never a third palette. Extraction distinguishes modes
from drift by evidence: selector-scoped reassignment of the same variable
is a mode; unscoped scattered variation is drift
(`extracting-design-md` eval-04). Audit gains a mode-discipline row.

## Verification

- `node tests/run-lint-tests.mjs` passes with new design-check fixture cases
  (clean DESIGN.md fixture passes; drift, undated-decisions, bad-ref fixtures
  fail with their codes).
- Generator fixture test: known DESIGN.md → byte-expected `design.tokens.css`
  for both targets.
- CE self-lint still passes (this repo has no UI, no DESIGN.md expected).
- Skill ships with its 3 evals; walkthrough documented in the skill PR/commit.
