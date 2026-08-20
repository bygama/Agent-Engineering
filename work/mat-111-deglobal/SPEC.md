---
issue: MAT-111
---
# Remove `global/`; global-layer doctrine moves to `reference/` — spec

<!-- Shaped from the parent orchestrator's dispatch brief (2026-08-20).
     Evidence: MAT-111 ticket; owner ruling of 2026-08-20; the merged
     MAT-110 state of bygama/workstation, verified on `main` at 22f3619
     (claude/CLAUDE.md header now reads "Canonical: workstation/claude/
     CLAUDE.md", and claude/hooks/ carries both hook scripts).
     One lane, one PR, Tier M. -->

## Why

Until now this repo owned two different things under `global/`: the
owner's *personal* machine policy (a real `~/.claude/CLAUDE.md` and two
real hook scripts) and the *doctrine* about what a global layer is for.
The owner's ruling of 2026-08-20 splits them: the personal machine layer
is canonical in `bygama/workstation` (MAT-110, merged), and the standard
keeps only the replicable part. A standard that also ships one person's
lived-in config makes that config look like a dependency, and forces
every consumer to strip it before use — which is exactly what the README
already had to warn about at length.

## What done looks like

### 1. The doctrine gets a home in `reference/`

A new `reference/global-layer.md` — one document, the layer's own, in
the directory that answers "what is the standard, and why?". It carries
three things and nothing else:

1. **What belongs in the `~/.claude` layer** — the doctrine adapted from
   `docs/how-it-works/architecture.md`'s `global/` section and the
   README's replication seed paragraphs: user-level context that applies
   across repos, edited at its source and installed, never edited in
   place on the machine; the placement rule that keeps project
   specifics, procedural workflows and session facts *out* of it; the
   40-line canon the lint already enforces on any file whose H1 is
   `# Global instructions` (`scripts/agent-lint.mjs`).
2. **The generic SessionStart hook wiring recipe** — carried over from
   `global/hooks/README.md`: the `settings.json` entry shape, and the
   two notes that make it work anywhere — the hook is **optional** (the
   entry skill still triggers by its description), and the path must be
   **absolute** because hook runners perform no shell expansion and no
   env-var substitution (MAT-31). The recipe stays runner-generic and
   names no machine.
3. **A pointer to `bygama/workstation`** as the owner's living personal
   instance — canonical for the personal layer, explicitly never a
   dependency of the standard.

Constraints it inherits as a `reference/` file: ≤120 lines, shipped
surface (no machine-anchored paths), English.

### 2. `global/` is deleted entirely

`global/CLAUDE.md`, `global/hooks/orca-probe.ps1`,
`global/hooks/using-ae.ps1`, `global/hooks/README.md` — the whole
directory. (There is no top-level `global/README.md`; the README the
brief names is `global/hooks/README.md`.) Nothing is lost: workstation
carries the living copies of all three files, and the doctrine lands in
item 1.

### 3. Every live surface stops naming `global/`

- **`AGENTS.md`** — the `global/` gotcha is replaced by the new truth
  (the personal machine layer is canonical in the workstation repo;
  never edit `~/.claude` directly — changes go through workstation), and
  the self-lint command loses its now-meaningless ignore entry:
  `--ignore tests,templates,global,examples` → `--ignore
  tests,templates,examples`. The version stamp is not touched.
- **The same ignore string wherever it is executed** — the CI workflow
  (`.github/workflows/gates.yml`), `CONTRIBUTING.md`, and the
  `loops/self-audit.md` gate. The new form must be the one the gates
  actually run. `loops/self-audit.md`'s gate line carries a
  "verified <date>, exit 0" stamp; changing the command invalidates the
  old stamp, so the line is re-stamped with the date this lane actually
  runs it.
- **`README.md`** — the directory table's `global/` row and the
  replication section's seed paragraphs (~285-310) point at
  `reference/global-layer.md` and at workstation as the canonical
  personal instance. The "strip the owner-specific lines before applying
  it" warning disappears with the seed it warned about.
- **`docs/how-it-works/architecture.md`** — the `GLB` mermaid node and
  the `### global/` section, rewritten for the new shape (the layer is
  still explained; the directory is not).
- **`docs/how-it-works/standard-lifecycle.md`** — the
  `global/hooks/README.md` pointer (~line 25) becomes the new reference
  path. The machine-path narration (~line 172) enumerates "the five
  surfaces a consumer receives" and is judged on its own terms (below).

### 4. Dated records get amendment markers, never rewrites

`docs/specs/SPEC-agent-engineering.md` — the repo tree that shows
`global/` and the P1 entry that ports it — gains an italic amendment
note in the ADR-008 style, dated 2026-08-20, naming MAT-111 and
workstation as the new canonical home. The tree and the phase entry
themselves stay as written: they record what was true when written.
`docs/plans/*` and `CHANGELOG.md` are not touched at all.

### 5. Judgments recorded either way

These are checked and the verdict lands in `DECISIONS.md` whether or
not a file changes:

- **`examples/machine-config/README.md`** — verify it still reads true
  (it points at the living workstation consumer, not at `global/`).
  Change only if it went false.
- **`standard-lifecycle.md`'s five-surface sentence** — drop `global/`
  from the enumeration ONLY if the sentence enumerates *this repo's own*
  directories and would read false otherwise. If it enumerates the
  surface *classes a consumer repo can carry* — which the lint's
  `SHIPPED_SURFACE` regex still covers — it stays as written. Record the
  reading either way.
- **`scripts/agent-lint.mjs`** — explicitly NOT touched. Its
  machine-path check keeps `global/` as a vendored-dir class in consumer
  repos, which stays true with this repo's own `global/` gone. Its
  global-CLAUDE.md canon check is content-detected (H1 `# Global
  instructions`), not path-bound, and stays exercised by
  `tests/fixtures/global-layer` — so deleting `global/` costs no lint
  coverage.

### 6. Surfaces that go stale behind a fence — open rulings

The deletion makes three files name a path this repo no longer has. Two
of them are on the brief's never-touch list, so the lane does not choose
unilaterally; the parent's ruling is requested at the SPEC gate and
recorded in `DECISIONS.md`:

- **`reference/orca.md:27`** (not fenced) — cites
  `global/hooks/orca-probe.ps1` as the hook that injects the
  `ORCA: available` line. Lane's proposal: repoint at
  `reference/global-layer.md` / describe the probe hook generically, in
  the fewest words that keep the file ≤120 lines.
- **`skills/using-ae/evals/eval-03.md`** (fenced: `skills/` content) —
  its Query and Fixture name `global/hooks/using-ae.ps1` and
  `global/hooks/orca-probe.ps1` as the artifacts under test. No gate
  breaks (`tests/run-eval-checks.mjs` is structure-only), but the eval
  becomes untestable from this repo.
- **`.claude/skills/docs-sweep/references/patterns.md:48`** (fenced:
  `.claude/skills/`) — a known-good exemption entry saying `global/`
  carries no tier enumerations by design. It asserts nothing false about
  the repo; it merely exempts something that no longer exists.

## Out of scope

- No template or check change ⇒ **no version bump, no CHANGELOG entry,
  no restamp**. The `AGENTS.md` version stamp stays at AE/1.4.2.
- `bygama/workstation`'s own `claude/README.md` still calls
  `Agent-Engineering/global/hooks/` the canonical source of its hooks.
  That is a different repo and a different ticket; this lane reports it,
  never edits it.

## Verification

All four gates exit 0, with the self-lint in its NEW form:

```
node scripts/agent-lint.mjs . --ignore tests,templates,examples
node tests/run-lint-tests.mjs
node tests/run-gen-tests.mjs
node tests/run-eval-checks.mjs
```

Plus: no live (non-record, non-fenced) surface greps for `global/` as a
path in this repo, and `docs/how-it-works/` covers the new shape — the
house rule that a structural change updates its chapter in the same
change.
