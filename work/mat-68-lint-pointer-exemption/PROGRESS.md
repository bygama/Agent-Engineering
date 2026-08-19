# PROGRESS — mat-68-lint-pointer-exemption

Lane opened 2026-08-19 on fresh main (acdcec0, contains MAT-82).
SPEC approved by the parent with one scope extension (DECISIONS ruling 2).

## Steps

- [x] 1. Fixtures + self-test cases (red on `pointer-fenced`)
- [ ] 2. `stripToolManagedBlocks` in the pointer check (all green)
- [ ] 3. Checklist rows: exemption clause + nesting-law rewording
- [ ] 4. standard-lifecycle.md + reference/context.md one-clause notes
- [ ] 5. Gate sweep with evidence

## Evidence

(recorded at step 5 / work-verify)

## Done

### Step 1 — Fixtures + self-test cases (2026-08-19)

Added three self-contained fixture mini-repos under `tests/fixtures/`,
each modeled on `tests/fixtures/v2-clean/` (same AGENTS.md shape: header
comment, stamp `AE/1.3.2`, Commands/Gotchas/Hard constraints sections,
`make check` marked `# not verified`) so the only finding any of them can
produce is `pointer-shape` on `CLAUDE.md`:

- `tests/fixtures/pointer-fenced/CLAUDE.md` — `@AGENTS.md` pointer plus one
  `<!-- BEGIN:nextjs-agent-rules -->`…`<!-- END:nextjs-agent-rules -->`
  block with single blank-line padding on each side (7 raw lines; strips
  to 1 line, `@AGENTS.md`).
- `tests/fixtures/pointer-unfenced/CLAUDE.md` — same fenced block plus an
  unfenced `## Team notes` section after it (12 raw lines; strips to 5
  lines — still over budget after stripping, by design).
- `tests/fixtures/pointer-unclosed/CLAUDE.md` — pointer plus an
  `<!-- BEGIN:nextjs-agent-rules -->` with no matching END (6 raw lines;
  an unmatched BEGIN strips nothing per SPEC §1).

Verified each fixture in isolation with
`node scripts/agent-lint.mjs tests/fixtures/<name> --json` before wiring
test cases — each currently produces exactly one finding,
`pointer-shape` on `CLAUDE.md`, confirming no unrelated finding muddies
the assertion and confirming the raw line counts used above (7/12/6).

Added three cases to `tests/run-lint-tests.mjs` (inserted after the
`v1-style` case): `pointer-fenced` asserts `fail: false` / forbids
`pointer-shape` (this is the case expected red until step 2 implements
`stripToolManagedBlocks`); `pointer-unfenced` and `pointer-unclosed` both
assert `fail: true` / expect `pointer-shape` (already green today, and
designed to stay green after step 2's stripping — unfenced remainder is
5 lines > 3; unclosed strips nothing).

**Acceptance command and output:**

```
$ node tests/run-lint-tests.mjs
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
FAIL pointer-fenced repo passes (fenced tool-managed block exempted)
  expected fail=false, got true
  unexpected finding "pointer-shape"
  findings: pointer-shape
ok   pointer-unfenced repo still fails (unfenced extra content over budget)
ok   pointer-unclosed repo still fails (unmatched BEGIN is not an exemption)
ok   malformed lanes fail
ok   invalid feature list fails
ok   global-layer CLAUDE.md passes its own canon
ok   clean DESIGN.md passes
ok   drifted/undated DESIGN.md fails
ok   dangling-ref/ungenerated DESIGN.md fails
ok   DESIGN.md with mode groups passes
ok   kitchen-sink composite fires the planted set
1/16 cases failed
```

Exit code: 1. Exactly one FAIL line (`pointer-fenced`), as required —
red until step 2. All 15 other cases pass, including both new
failing-fixture cases.

Sanity check (not this step's gate, but confirmed non-regressed):
`node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
exits 0 (`0 high, 0 medium, 0 low — PASS`) — the new fixtures live under
`tests/` and are excluded from self-lint, as the repo's gotcha requires.

**Files changed:**
- `tests/fixtures/pointer-fenced/AGENTS.md` (new)
- `tests/fixtures/pointer-fenced/CLAUDE.md` (new)
- `tests/fixtures/pointer-unfenced/AGENTS.md` (new)
- `tests/fixtures/pointer-unfenced/CLAUDE.md` (new)
- `tests/fixtures/pointer-unclosed/AGENTS.md` (new)
- `tests/fixtures/pointer-unclosed/CLAUDE.md` (new)
- `tests/run-lint-tests.mjs` (three new cases)

**Concerns:** none. Line-count arithmetic for the strip behavior (7→1,
12→5, 6→6) is worked out above for step 2's implementer to check against;
step 2 itself is out of scope here.

**Step 1 review (fresh reviewer, 2026-08-19):** ✅ spec-compliant ·
Approved. Reviewer independently re-ran the acceptance command (same
output, exit 1, one FAIL) and per-fixture `--json` lints (each fixture:
exactly one `pointer-shape` finding; raw counts 7/12/6 confirmed). One
Minor deferred to work-verify triage: `pointer-unfenced` /
`pointer-unclosed` cases carry no broad `forbid` list (weaker regression
trap than `v2-clean`/`v1-style` convention; not required by SPEC §2).

## Notes

- docs/how-it-works survey (brief item 4): `standard-lifecycle.md` is the
  only chapter enumerating the pointer rule (lines 42, 48-51);
  `architecture.md:116` names "pointer shape" as a category only — no
  enumeration, left untouched.
