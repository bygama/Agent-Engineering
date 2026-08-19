# PROGRESS — mat-68-lint-pointer-exemption

Lane opened 2026-08-19 on fresh main (acdcec0, contains MAT-82).
SPEC approved by the parent with one scope extension (DECISIONS ruling 2).

## Steps

- [x] 1. Fixtures + self-test cases (red on `pointer-fenced`)
- [x] 2. `stripToolManagedBlocks` in the pointer check (all green)
- [x] 3. Checklist rows: exemption clause + nesting-law rewording
- [x] 4. standard-lifecycle.md + reference/context.md one-clause notes
- [x] 5. Gate sweep with evidence

## Verification

### 2026-08-19 — M DoD — PASS

- L1 static: `node --check scripts/agent-lint.mjs` → exit 0; `node --check
  tests/run-lint-tests.mjs` → exit 0; `node scripts/agent-lint.mjs .
  --ignore tests,templates,global,examples` → exit 0 (`0 high, 0 medium,
  0 low — PASS`)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (`all 16 cases
  passed`); `node tests/run-gen-tests.mjs` → exit 0 (`all gen cases
  passed`); `node tests/run-eval-checks.mjs` → exit 0 (`all eval checks
  passed`)
- L3 end-to-end (CLI flow, real invocations): `node scripts/agent-lint.mjs
  tests/fixtures/pointer-fenced --json` → exit 0, `"findings": []`;
  `…pointer-unclosed --json` → exit 1, one `pointer-shape` high;
  `…pointer-unfenced --json` → exit 1, one `pointer-shape` high with the
  `outside tool-managed blocks` qualifier
- Fresh-context review (capable tier, no shared context): **PASS** — the
  reviewer re-ran every DoD command itself (same exits/outputs), verified
  fixture-first ordering in history (`98f15d8` before `0edcdbe`),
  CHANGELOG untouched, no restamp (all `AE/1.3.2` diff hits are additions
  inside new fixtures/lane narrative), and probed 11 shapes beyond the
  fixtures (multiple blocks, name mismatch, non-kebab, `@AGENTS.md`
  only-inside-block, orphan BEGIN + later pair, indented markers,
  whole-file block, CRLF, 3/4-line boundary, global-layer no-strip,
  `read-order` fires on block interior) — no divergence from SPEC §1;
  nothing above Minor.
- Adversarial review: n/a — M tier; per dispatch config the parent
  dispatches the adversarial reviewer (1 ballena) after worker_done; the
  child runs work-verify only.

**Minor triage (deferred, recorded — no action in this lane):** the two
failing pointer cases carry no broad `forbid` list; `const of` naming and
the cosmetic `rawCount(f)` re-read in the pointer check; "line budget"
wording proximity to the global row under both tables (label mitigates;
code provably never strips globals); `per-app` residue in agent-lint
messages, README, ae-init migration notes and ae-audit SKILL.md is
pre-existing repo-wide drift for docs-sweep (DECISIONS ruling 1 scoped
this lane to checklist.md); founding spec carries no amendment pointer —
matches house practice (periodic sweeps). Reviewer also recorded, as
settled by SPEC §1: any kebab-named pair qualifies, hand-authored
included — ae-audit's judgment rows are the backstop.

## Evidence

### Step 5 — Gate sweep (2026-08-19)

All four gates exit 0:

**Gate 1: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`**

```
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-68-lint-pointer-exemption
0 high, 0 medium, 0 low — PASS
```

Exit code: 0

**Gate 2: `node tests/run-lint-tests.mjs`**

```
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
ok   pointer-fenced repo passes (fenced tool-managed block exempted)
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
all 16 cases passed
```

Exit code: 0

**Gate 3: `node tests/run-gen-tests.mjs`**

```
ok   fixture parses without errors
ok   tailwind4 output matches design.tokens.css
ok   cssvars output matches expected-cssvars.css
ok   dangling reference is reported
ok   modes fixture parses without errors
ok   modes tailwind4 output matches design.tokens.css
ok   modes cssvars output matches expected-cssvars.css
all gen cases passed
```

Exit code: 0

**Gate 4: `node tests/run-eval-checks.mjs`**

```
ok   ae-audit: 4 evals well-formed
ok   ae-init: 6 evals well-formed
ok   loop-setup: 5 evals well-formed
ok   orchestrate: 4 evals well-formed
ok   shaping: 4 evals well-formed
ok   using-ae: 4 evals well-formed
ok   work-handoff: 6 evals well-formed
ok   work-plan: 5 evals well-formed
ok   work-run: 4 evals well-formed
ok   work-verify: 6 evals well-formed
ok   .claude/docs-sweep: 3 evals well-formed
ok   .claude/release: 4 evals well-formed
all eval checks passed
```

Exit code: 0

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

### Step 2 — `stripToolManagedBlocks` in the pointer check (2026-08-19)

Implemented SPEC §1 in `scripts/agent-lint.mjs`, pointer check only:

- New `stripToolManagedBlocks(lines)` helper sitting immediately above the
  CLAUDE.md section, with `BLOCK_BEGIN =
  /^<!-- BEGIN:([a-z0-9]+(?:-[a-z0-9]+)*) -->$/` matched against each
  **trimmed** line. A BEGIN closes at the first later line whose trimmed
  content is exactly `<!-- END:<same name> -->`; markers, interior and
  blank-line padding (all consecutive blanks immediately before the BEGIN
  and immediately after the END) are dropped. No matching END ⇒ nothing
  stripped and the BEGIN line is kept as ordinary content, per SPEC §1.
  Kebab-case is enforced by the regex, so a non-kebab name is not a marker
  at all and strips nothing.
- The pointer check now measures the remainder: `const kept =
  stripToolManagedBlocks(fileLines(f)); const n = countLines(kept);` and the
  containment test runs on `kept.join("\n")` — both halves of the rule, per
  SPEC §1. The finding message gains an `outside tool-managed blocks`
  qualifier when stripping actually removed something, so a 12-line file
  reported as 5 lines is not confusing.
- Small refactor in code touched: the trailing-newline arithmetic that lived
  inside `rawCount` is now `countLines(lines)`, and `rawCount(rel) =
  countLines(fileLines(rel))` — one definition, reused by the pointer check.
- Header comment: new "Pointer exemption" paragraph (what a tool-managed
  block is, `next dev` as the live case, and that ONLY the pointer check
  strips — every other check still reads the file as written), plus a clause
  on the "Line counts are raw file lines" note.

Untouched, as scoped: the global-layer branch (`# Global instructions`, ≤40,
still `rawCount`), AGENTS.md budgets, the read-order scan over CLAUDE.md
(still sees every line, including a block's interior), every other check.

**Acceptance commands and output:**

```
$ node tests/run-lint-tests.mjs
ok   v2-clean repo passes
ok   bloated canonical AGENTS.md fails
ok   per-tool adapters fail
ok   read order + broken link fail
ok   v1-style repo drifts (pointer + stamp)
ok   pointer-fenced repo passes (fenced tool-managed block exempted)
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
all 16 cases passed
```

Exit code: 0 — step 1's `pointer-fenced` case flipped from red to green and
the other 15 (including the two new failing-fixture cases) are unchanged.

```
$ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\...\mat-68-lint-pointer-exemption
0 high, 0 medium, 0 low — PASS
```

Exit code: 0.

Per-fixture messages confirm the arithmetic step 1 predicted (7→1, 12→5,
6→6): `pointer-unfenced` reports `has 5 lines outside tool-managed blocks`,
`pointer-unclosed` reports `has 6 lines` (no qualifier — nothing stripped).

Also ran, unchanged and green (not this step's gate): `node
tests/run-gen-tests.mjs` exit 0, `node tests/run-eval-checks.mjs` exit 0.

**Edge cases probed** with throwaway mini-repos in the session scratchpad
(never written into the repo), each `AGENTS.md` copied from the
`pointer-fenced` fixture so only `pointer-shape` can fire:

| pointer CLAUDE.md | result |
| --- | --- |
| two matched blocks, padded | PASS (both stripped) |
| `BEGIN:a-one` … `END:b-two` (name mismatch) | FAIL, 7 lines, nothing stripped |
| `BEGIN:Foo_Bar` … `END:Foo_Bar` (non-kebab) | FAIL, 7 lines, nothing stripped |
| `@AGENTS.md` only *inside* the block | FAIL — containment runs on the remainder |
| CRLF line endings throughout | PASS (markers matched after trim) |

**Files changed:** `scripts/agent-lint.mjs` only (plus this PROGRESS entry).

**Concerns:** none blocking. Two notes for the record: (a) a BEGIN whose END
belongs to an outer block (interleaved `BEGIN:a … BEGIN:b … END:a … END:b`)
strips through `END:a` and leaves `END:b` as ordinary content — the direct
consequence of SPEC §1's "first matching END closes a BEGIN", not a separate
decision; (b) the finding message can read "has 1 lines" — pre-existing
phrasing shared with every other `${n} lines` message in the script, left
alone to keep this diff to the step.

**Step 2 review (fresh reviewer, capable tier, 2026-08-19):** ✅
spec-compliant · Approved. Reviewer re-ran both acceptance commands
(exit 0, pristine output) and probed the helper verbatim against 22
inputs — matched-pair semantics, first-END-wins, unmatched BEGIN,
blank-run padding, multiple blocks, CRLF, degenerate empty file, and
`@AGENTS.md`-only-inside-a-block all behave per SPEC §1; confirmed every
other check still reads files as written. Minors deferred to work-verify
triage: (a) `n === rawCount(f)` re-reads the file for a cosmetic suffix;
(b) binding named `of` reads as a keyword; (c) padding comment could say
"any run of blank lines" explicitly; (d) coverage suggestion — a fixture
pinning `@AGENTS.md`-only-inside-the-block would guard containment
against future refactors.

### Step 3 — Checklist rows: exemption clause + nesting-law rewording (2026-08-19)

In `skills/ae-audit/references/checklist.md`, made three categories of changes:

1. **Pointer rows exemption note:** Added a one-clause note below the pointer
   rows (lines 39-41) explaining that fenced tool-managed blocks do not count
   against the line budget, and that the lint's `pointer-shape` check settles
   the block recognition grammar (SPEC §3). Note cites the lint as the authority
   on marker grammar, never restating it.

2. **Per-app → nested terminology:** Retired "per-app" wording file-wide per
   DECISIONS ruling 1:
   - Line 26 (AGENTS.md Line budget row): "per-app ≤30" → "nested ≤30"
   - Line 40 (Pointer rows): "Per-app CLAUDE.md" → "Nested CLAUDE.md"
   - Line 40 (Pass condition): "Same pointer shape per app dir" →
     "Same pointer shape at any earned depth"
   - Line 61 (Monorepo row): "Per-app AGENTS.md (≤30) + pointer CLAUDE.md per
     app" → "Nested AGENTS.md (≤30) + pointer CLAUDE.md at any earned depth"

All four edits align with the nesting law merged with MAT-82: nested AGENTS.md
(≤30) + pointer CLAUDE.md beside it at any earned depth, no privileged
`apps/*` level (reference/context.md, lines 55-68).

**Acceptance commands and output:**

```
$ grep -i "tool-managed" skills/ae-audit/references/checklist.md
**Pointer rows note:** A fenced tool-managed block (delimited by `<!-- BEGIN:… -->` and `<!-- END:… -->` with matching kebab-case names) does not count against the line budget; the lint's `pointer-shape` check settles the block recognition grammar.
```

Exit code: 0 ✓

```
$ grep -iE "per.app" skills/ae-audit/references/checklist.md
```

Exit code: 1 ✓ (no matches found)

**Files changed:**
- `skills/ae-audit/references/checklist.md` (four rows updated: lines 26, 40 ×2, 61)

**Concerns:** none. The rewording displaces no content; table pass conditions
remain atomic and scannable; the exemption note is positioned immediately
after the pointer section where it applies.

**Step 3 review (reviewer feedback requiring fix, 2026-08-19):** The
exemption note restated the BEGIN/END marker syntax and kebab-case rule
identically to `scripts/agent-lint.mjs:107-112`, violating the
'defined ONCE' principle (PLAN line 14). Marker grammar lives only in
the lint; prose surfaces cite the lint without restating it (single-definition
discipline prevents drift if the lint's grammar changes). Fix applied:
simplified the note to one clause, dropped the parenthetical:

Old: "A fenced tool-managed block (delimited by `<!-- BEGIN:… -->` and
`<!-- END:… -->` with matching kebab-case names) does not count against
the line budget; the lint's `pointer-shape` check settles the block
recognition grammar."

New: "A fenced tool-managed block does not count against the line budget
— the lint's `pointer-shape` check settles what qualifies as one."

**Acceptance commands re-run:**

```
$ grep -i "tool-managed" skills/ae-audit/references/checklist.md
**Pointer rows note:** A fenced tool-managed block does not count against the line budget — the lint's `pointer-shape` check settles what qualifies as one.
```

Exit code: 0 ✓

```
$ grep -iE "per.app" skills/ae-audit/references/checklist.md
```

Exit code: 1 ✓ (no matches)

**Files changed (fix):** `skills/ae-audit/references/checklist.md` (line 43
simplified, one clause, cites lint without restating grammar).

**Step 3 re-review (fix round 1, 2026-08-19):** finding ADDRESSED — the
parenthetical grammar restatement is gone, the note is one clause citing
the lint. No new breakage, no out-of-scope observations. Step 3 closes
Approved after one fix round (initial review: ✅ spec-compliant on both
rewordings and the file-wide per-app retirement — reviewer compared both
rows against `reference/context.md`'s Budgets table and nesting section
directly, no drift; the sole Important finding was the grammar
restatement, fixed above).

### Step 4 — standard-lifecycle.md + reference/context.md one-clause notes (2026-08-19)

Added one-clause tool-managed block exemption notes to both:

1. **`docs/how-it-works/standard-lifecycle.md`** (lines 42-46): Appended
   exemption note to the CLAUDE.md pointer bullet explaining that a fenced
   tool-managed block does not count against the line budget, with the lint's
   `pointer-shape` check settling what qualifies as one (SPEC §4).

2. **`reference/context.md`** (lines 51-54): Added exemption note at the end
   of the pointer section, same wording, citing the lint as the authority —
   aligns law with check per single-definition discipline (SPEC §5,
   DECISIONS ruling 2).

Both notes follow the step 3 wording pattern exactly: one clause, no
restating marker grammar, lint cited as the settlement mechanism.

**Acceptance commands and output:**

```
$ grep -il "tool-managed" docs/how-it-works/standard-lifecycle.md reference/context.md
docs/how-it-works/standard-lifecycle.md
reference/context.md
```

Exit code: 0 ✓

```
$ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-68-lint-pointer-exemption
0 high, 0 medium, 0 low — PASS
```

Exit code: 0 ✓

**Files changed:**
- `docs/how-it-works/standard-lifecycle.md` (lines 42-46, added 4-line note)
- `reference/context.md` (lines 51-54, added 2-line note)

**Concerns:** none. The two notes form a complete set: `standard-lifecycle.md`
enumerates the pointer rule comprehensively, `reference/context.md` establishes
the budget law, each surface now declares the exemption with uniform citation to
the lint.

**Step 4 review (initial review): needs fixes.** Reviewer found placement error
in `reference/context.md`: the note was 35+ lines below the Budgets table
(lines 55-56, after the global-layer exception), violating DECISIONS ruling 2's
stated target ("budget-table pointer row") and rationale. The original placement
also created ambiguity: "the line budget" could be misread as applying to the
global ≤40 budget just mentioned, contrary to SPEC §1's exemption scope. **Fix applied:**

Moved the note to line 21, immediately after the Budgets table (right after the
global CLAUDE.md row), labelled "**Pointer rows note:**" to mirror the
`skills/ae-audit/references/checklist.md:43` pattern. This placement directly
addresses ruling 2's target and ensures a reader stopping at the table sees
the exemption without ambiguity.

**Acceptance commands re-run:**

```
$ grep -il "tool-managed" docs/how-it-works/standard-lifecycle.md reference/context.md
docs/how-it-works/standard-lifecycle.md
reference/context.md
```

Exit code: 0 ✓

```
$ node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
agent-lint C:\Users\mateo\orca\workspaces\Agent-Engineering\mat-68-lint-pointer-exemption
0 high, 0 medium, 0 low — PASS
```

Exit code: 0 ✓

**Files changed (fix):**
- `reference/context.md` (note moved from lines 55-56 to line 21, immediately
  after Budgets table).

**Step 4 re-review (fix round 1, 2026-08-19):** finding ADDRESSED — the
clause sits at `reference/context.md:24` as a labelled "**Pointer rows
note:**" immediately under the Budgets table, verbatim text, mirroring
the checklist.md precedent; no new breakage, no out-of-scope
observations. Step 4 closes Approved after one fix round (initial
review: ✅ spec-compliant on both files — one-clause discipline verbatim
across all three prose surfaces, `standard-lifecycle.md` placement
called exemplary; the sole Important finding was the context.md
placement, fixed above).

### Step 5 — Gate sweep with evidence (2026-08-19)

All four acceptance gates exit 0 (evidence recorded in Evidence section above):

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → 0 high, 0 medium, 0 low — PASS
- `node tests/run-lint-tests.mjs` → all 16 cases passed
- `node tests/run-gen-tests.mjs` → all gen cases passed
- `node tests/run-eval-checks.mjs` → all eval checks passed

**Files changed:** `work/mat-68-lint-pointer-exemption/PROGRESS.md` (Evidence section populated, step 5 marked complete).

**Concerns:** none. All gates pass green as required by SPEC definition of done. The lane is ready for submission.

## Notes

- docs/how-it-works survey (brief item 4): `standard-lifecycle.md` is the
  only chapter enumerating the pointer rule (lines 42, 48-51);
  `architecture.md:116` names "pointer shape" as a category only — no
  enumeration, left untouched.
- Step 2 reviewer's out-of-scope observation, recorded for the parent /
  downstream remediation (SPEC "Out of scope"): the `read-order` check
  still scans tool-managed block interiors (correct per SPEC §1's
  "Untouched" clause), so a real `nextjs-agent-rules` block containing a
  "read X before Y"-shaped phrase would still raise a `read-order` high
  on the pointer file — the pointer exemption alone may not clear every
  documented high in Kiosco-Diagonal / ecotronk; check the actual block
  content there before declaring those highs remediable.
