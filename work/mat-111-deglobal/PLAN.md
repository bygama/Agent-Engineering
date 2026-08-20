# Remove `global/`; global-layer doctrine to `reference/` — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

## Constraints (every step)

- **No version bump, no CHANGELOG entry, no restamp.** No template and
  no check changes here. `AGENTS.md`'s `Standard: AE/1.4.2` stamp is not
  touched.
- **Never touch:** `CHANGELOG.md`, the `AGENTS.md` version stamp,
  `scripts/agent-lint.mjs`, `tests/**`, `skills/` content, `examples/`
  (except the step-10 judgment), `.claude/skills/`, `docs/plans/*`.
- **Dated records are amended, never rewritten** — italic amendment
  note in the ADR-008 style, dated 2026-08-20, naming MAT-111.
- All artifacts in English. `reference/` files are ≤120 lines and carry
  no machine-anchored paths (shipped surface).
- The gate command in its NEW form from step 2 onward:
  `node scripts/agent-lint.mjs . --ignore tests,templates,examples`.

## Interface produced in step 1, consumed by steps 3, 5, 6, 7, 8

Step 1 creates **`reference/global-layer.md`** — that exact path is the
target every later pointer uses. Its three sections, by heading, are the
anchors later steps cite: what belongs in the layer, the SessionStart
hook wiring recipe (absolute-path note, MAT-31), and the
`bygama/workstation` pointer.

## Steps

- [ ] **1. Create `reference/global-layer.md`** — the layer's doctrine
  (adapted from `docs/how-it-works/architecture.md`'s `global/` section
  and README's replication seed paragraphs), the generic SessionStart
  wiring recipe from `global/hooks/README.md` (keep: hook is optional;
  path must be absolute, no shell/env expansion, MAT-31), and the
  workstation pointer as the owner's living personal instance, never a
  dependency. *(judgment)*
  accept: `test -f reference/global-layer.md && test $(grep -c '' reference/global-layer.md) -le 120 && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` — exit 0

- [ ] **2. Delete `global/` entirely** — `CLAUDE.md`, `hooks/README.md`,
  `hooks/orca-probe.ps1`, `hooks/using-ae.ps1`, the directory itself.
  *(mechanical)*
  accept: `test ! -e global && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **3. `AGENTS.md`** — replace the `global/` gotcha with the new
  truth (personal machine layer canonical in the workstation repo; never
  edit `~/.claude` directly — changes go through workstation), pointing
  at `reference/global-layer.md`; flip the self-lint command to
  `--ignore tests,templates,examples`. Version stamp untouched.
  *(judgment)*
  accept: `! grep -q 'tests,templates,global,examples' AGENTS.md && grep -q 'reference/global-layer.md' AGENTS.md && grep -q '^Standard: AE/1.4.2$' AGENTS.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **4. [batch] Flip the ignore string in the three remaining live
  sites** — `.github/workflows/gates.yml:17`, `CONTRIBUTING.md:23`,
  `loops/self-audit.md:20`; same one-line substitution
  (`tests,templates,global,examples` → `tests,templates,examples`), plus
  re-stamp `loops/self-audit.md`'s `verified <date>, exit 0` to
  2026-08-20 because this lane re-runs the new command. *(mechanical)*
  accept: `test $(grep -rl 'tests,templates,global,examples' --exclude-dir=.git . | wc -l) -eq 0 && grep -q 'tests,templates,examples' .github/workflows/gates.yml` — exit 0

- [ ] **5. `README.md`** — the directory table's `global/` row and the
  replication section's seed paragraphs (~285-310): point at
  `reference/global-layer.md` and at workstation as the canonical
  personal instance; the "strip the owner-specific lines" warning goes
  with the seed it warned about. *(judgment)*
  accept: `! grep -q 'global/CLAUDE.md\|global/hooks' README.md && grep -q 'reference/global-layer.md' README.md && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **6. `docs/how-it-works/architecture.md`** — rewrite the `GLB`
  mermaid node and the `### global/` section for the new shape: the
  layer is still explained and now lives in `reference/global-layer.md`;
  the directory does not exist. *(judgment)*
  accept: `! grep -q 'global/' docs/how-it-works/architecture.md && grep -q 'global-layer.md' docs/how-it-works/architecture.md` — exit 0

- [ ] **7. `docs/how-it-works/standard-lifecycle.md`** — repoint the
  `global/hooks/README.md` mention (~line 25) at
  `reference/global-layer.md`; then judge the machine-path narration
  (~line 172): drop `global/` from the enumeration ONLY if the sentence
  enumerates this repo's own directories and would read false — record
  the reading in `DECISIONS.md` either way. *(judgment)*
  accept: `! grep -q 'global/hooks/README.md' docs/how-it-works/standard-lifecycle.md && grep -q 'five-surface\|standard-lifecycle' work/mat-111-deglobal/DECISIONS.md` — exit 0

- [ ] **8. `reference/orca.md`** — Ruling A: repoint the
  `global/hooks/orca-probe.ps1` citation (~line 27) at
  `reference/global-layer.md` with a generic probe description; the file
  is at its 120-line cap, so the edit stays neutral or shorter.
  *(judgment)*
  accept: `! grep -q 'global/hooks' reference/orca.md && test $(grep -c '' reference/orca.md) -le 120 && node scripts/agent-lint.mjs . --ignore tests,templates,examples` — exit 0

- [ ] **9. `docs/specs/SPEC-agent-engineering.md`** — italic amendment
  notes in the ADR-008 style, dated 2026-08-20, naming MAT-111 and
  workstation as the new canonical home: one at the repo tree that shows
  `global/` (~line 196), one at the P1 entry that ports it (~line 267).
  The tree and the phase entry themselves stay as written. *(judgment)*
  accept: `test $(grep -c 'MAT-111' docs/specs/SPEC-agent-engineering.md) -ge 2 && grep -q '2026-08-20' docs/specs/SPEC-agent-engineering.md && git diff --stat docs/specs/SPEC-agent-engineering.md` — exit 0

- [ ] **10. `examples/machine-config/README.md` judgment** — verify it
  still reads true (it points at the living workstation consumer, not at
  `global/`); change only if it went false; record the verdict in
  `DECISIONS.md`. *(judgment)*
  accept: `grep -q 'machine-config' work/mat-111-deglobal/DECISIONS.md && ! grep -q 'global/' examples/machine-config/README.md` — exit 0

- [ ] **11. Full gate sweep + no live `global/` path left** — the four
  gates in their new form, plus a repo-wide grep proving every remaining
  `global/` mention is a dated record (`docs/plans/`, `CHANGELOG.md`),
  a fenced surface ruled to stay (B, C), or the lint's consumer-repo
  class. *(integration)*
  accept: `node scripts/agent-lint.mjs . --ignore tests,templates,examples && node tests/run-lint-tests.mjs && node tests/run-gen-tests.mjs && node tests/run-eval-checks.mjs` — all exit 0
