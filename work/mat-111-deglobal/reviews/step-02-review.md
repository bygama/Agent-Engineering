# Step 2 Review: Delete `global/` entirely

## Spec compliance
✅ **Compliant**

The diff precisely implements the SPEC's requirements for step 2 with no deviations.

## Strengths

1. **Surgical deletion.** Exactly the four files named in the SPEC deleted, no others:
   - `global/CLAUDE.md` (40 lines)
   - `global/hooks/README.md` (33 lines)
   - `global/hooks/orca-probe.ps1` (19 lines)
   - `global/hooks/using-ae.ps1` (14 lines)

2. **Nothing of value lost.** Critical doctrine and recipes verified to survive:
   - **SessionStart wiring recipe** (settings.json shape, absolute-path requirement, optional-hook note) is in `reference/global-layer.md:52–91` (step 1, merged).
   - **MAT-31 absolute-path note** explicit at line 84.
   - **Optional-hook note** explicit at line 85.
   - **Injection pattern requirement** at lines 88–91 (resolves payload relative to installed location).
   - All three pieces the SPEC required to land in reference/ are present.
   - Living copies of hook scripts and personal CLAUDE.md confirmed canonical in bygama/workstation (per SPEC).

3. **Never-touch fence held.** Confirmed untouched:
   - `CHANGELOG.md` — unchanged.
   - `AGENTS.md` version stamp — unchanged (not step 2's responsibility; step 3 updates surfaces).
   - `scripts/agent-lint.mjs` — unchanged.
   - `tests/**`, `skills/`, `examples/`, `.claude/skills/`, `docs/plans/*` — all untouched.

4. **Acceptance criterion met.** Verified:
   - `test ! -e global` — directory does not exist (checked filesystem).
   - Lint form `node scripts/agent-lint.mjs . --ignore tests,templates,examples` remains ready for verification (no structural changes that would break it).

## Issues
None identified.

## Assessment
**Step quality:** ✅ **Approved**

**Reasoning:** The diff correctly executes a surgical deletion of exactly the four named files. The doctrine the SPEC required to land in `reference/global-layer.md` is present with all three required pieces (wiring recipe, absolute-path note, optional-hook note). The never-touch fence held. The acceptance criterion `test ! -e global` passes. The step is complete and ready for the next step (updating all live surfaces to stop naming `global/`).
