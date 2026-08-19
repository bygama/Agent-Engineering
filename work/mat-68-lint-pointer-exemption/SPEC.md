# SPEC — agent-lint pointer rule exempts fenced tool-managed blocks

Ticket: MAT-68 · Tier: M · Lane: `work/mat-68-lint-pointer-exemption/`
Design input: parent's shaped brief (dispatch ctx_f20a05eaeb72) plus parent
scope addition msg_d1f3f667565c (checklist monorepo/pointer rows vs the
nesting law merged with MAT-82). Base: fresh main (acdcec0, contains MAT-82).

## Problem

`agent-lint`'s `pointer-shape` check (high) requires every non-global
CLAUDE.md to be a ≤3-line pointer containing `@AGENTS.md`
(`scripts/agent-lint.mjs:100-113`). It counts raw lines, so a pointer that
hosts a fenced TOOL-MANAGED block is a false positive. Live case: Next.js
15/16's `next dev` maintains an agent-rules block delimited by
`<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END:nextjs-agent-rules -->` and
upserts it into whichever file already hosts it
(`next/dist/server/lib/generate-agent-files.js`); the only shape that keeps
a curated canonical AGENTS.md is hosting that block in the pointer
CLAUDE.md. Two consumer repos (Kiosco-Diagonal, ecotronk) carry documented
highs for exactly this.

## Design (settled by the parent — formalized here, not re-decided)

### 1. Lint change — strip fenced tool-managed blocks before counting

In the pointer check only (non-global CLAUDE.md files, any depth):

- A **tool-managed block** is a run of lines where one line's trimmed
  content is exactly `<!-- BEGIN:<name> -->` and a later line's trimmed
  content is exactly `<!-- END:<name> -->` with the identical `<name>`,
  where `<name>` is kebab-case (`[a-z0-9]+(-[a-z0-9]+)*`).
- Stripping removes the two marker lines, everything between them, and
  their blank-line padding (blank lines immediately before the BEGIN and
  immediately after the END).
- Multiple blocks may appear; a BEGIN closes at the first matching END.
- An unmatched BEGIN (no matching END) is **not** an exemption: nothing is
  stripped for it and its lines count as ordinary content.
- Both halves of the rule — the ≤3-line count AND the `@AGENTS.md`
  containment test — apply to what remains after stripping.
- Untouched: the global-layer CLAUDE.md canon (≤40, own rules), AGENTS.md
  budgets, every other check.

### 2. Lint self-test coverage (fixture lands FIRST, before the check change)

Three new fixture repos under `tests/fixtures/` and three new cases in
`tests/run-lint-tests.mjs`, mirroring evals-before-content:

- `pointer-fenced` — pointer + fenced `nextjs-agent-rules` block, remainder
  ≤3 lines with `@AGENTS.md` → passes (`fail: false`, forbid
  `pointer-shape`).
- `pointer-unfenced` — pointer + fenced block + unfenced extra content
  pushing the remainder over 3 lines → still fails (expect
  `pointer-shape`).
- `pointer-unclosed` — pointer + `<!-- BEGIN:… -->` with no END → still
  fails (expect `pointer-shape`).

Each fixture is a self-contained mini-repo (CLAUDE.md + minimal stamped
AGENTS.md modeled on `tests/fixtures/v2-clean/`) so no unrelated finding
muddies the assertion.

### 3. ae-audit checklist — one-clause notes

`skills/ae-audit/references/checklist.md`:

- Pointer rows (lines 39-40): note the fenced tool-managed-block exemption
  in one clause, citing the lint as settling it — the marker grammar is NOT
  restated there.
- Scope addition (parent, msg_d1f3f667565c): the per-app wording graded by
  the retired per-app-only rule is updated against the merged nesting law
  (`reference/context.md`): the per-app pointer row (line 40) and the
  Monorepo row (line 59) speak of nested AGENTS.md (≤30) + pointer beside
  it at any earned depth, no privileged `apps/*` level.

### 4. docs/how-it-works

`docs/how-it-works/standard-lifecycle.md` enumerates the pointer rule
(lines 42, 48-51) → per the repo's hard constraint it is updated in the
same change: one clause noting that a fenced tool-managed block does not
count against the pointer budget, with the lint settling the grammar.
`architecture.md:116` only names "pointer shape" as a check category — no
enumeration, no change.

### 5. reference/context.md — law follows check (parent ruling at SPEC approval)

The budget-table pointer row in `reference/context.md` gains the same
one-clause exemption note, citing the lint as the mechanism — the marker
grammar is defined once, in the lint (single-definition discipline). Law
and check must not drift apart: without this, a reader of the budget table
would believe a fenced-block pointer violates the standard while the check
permits it.

## Out of scope (recorded, not forgotten)

- CHANGELOG.md, restamp, version bump — the owner paces releases; this
  check change accumulates unreleased.
- Remediation of the consumer repos' documented highs (downstream, after
  this ships).
- Any behavior change outside the pointer check.

## Definition of done

- Fixture-first ordering visible in history: self-test cases land before
  the check change.
- All four gates exit 0: `node scripts/agent-lint.mjs . --ignore
  tests,templates,global,examples` · `node tests/run-lint-tests.mjs` ·
  `node tests/run-gen-tests.mjs` · `node tests/run-eval-checks.mjs`.
- Existing lint cases unchanged and green (no fixture regresses).
- Branch pushed, PR open with `Closes MAT-68` in the body; no merge by
  this lane.
