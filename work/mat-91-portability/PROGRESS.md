# PROGRESS — mat-91-portability

Tickets: MAT-91 (primary) + MAT-88 · Tier M · Base: main 9fc4bda (v1.4.0)
Branch: `bygama/mat-91-portability` · Dispatch: ctx_85f24f7cf833

## Status

| Step | What | State |
|---|---|---|
| 1 | using-ae eval-07 (map routes to skill-authoring) | DONE `ec806d0` |
| 2 | portability evals ×3 [batch] | DONE `784934c` |
| 3 | three skills: path literal ⇒ citation [batch] | DONE `0dd4dac` |
| 4 | two loops: path literal ⇒ `<repo>` [batch] | DONE `fe98ac6` |
| 5 | using-ae map row | DONE `b43392d` |
| 6 | gate sweep + lane truth | DONE (this entry) |

Executed by `work-run`'s documented inline fallback — this session has no
subagent capability it is permitted to use (dispatch brief: no
grandchildren; harness: no Agent tool unless requested). Same lane, same
ceremony, PLAN steps in order, acceptance per step, PROGRESS updated.
Nothing was downgraded and no dispatch was simulated.

## Baseline (before any edit, base 9fc4bda)

All four gates green before this lane touched anything — so any later
failure is this lane's, not inherited:

```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS                        exit 0
node tests/run-lint-tests.mjs   → all 16 cases passed     exit 0
node tests/run-gen-tests.mjs    → all gen cases passed    exit 0
node tests/run-eval-checks.mjs  → all eval checks passed  exit 0
```

The five hits, measured rather than taken on faith
(`grep -rn "C:/Briar" --include="*.md" . | grep -v "^./work/"`):

```
loops/issue-triage.md:41       --provider claude --repo path:C:/Briar/…
loops/self-audit.md:45         --provider claude --repo path:C:/Briar/…
skills/ae-audit/SKILL.md:33    `C:/Briar/…` — or locate/ask). It settles the
skills/ae-init/SKILL.md:14     this machine `C:/Briar/…` — or ask).
skills/loop-setup/SKILL.md:65  `C:/Briar/…`, or locate/ask). Fill every
```

Clean-by-contrast claim verified, not assumed — the same grep over
`reference/`, `templates/`, `global/`, `.claude/`, `tests/` returns zero
hits.

## Reported to the parent (findings this lane does not act on)

1. **A sixth machine-path hit exists, and is deliberately left alone.**
   `docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37` carries
   the same literal. It is a dated, closed implementation plan — a record
   of what was written that day, not a surface an agent follows. Editing it
   to satisfy a portability sweep would falsify history. Parent confirmed
   at the SPEC gate. See DECISIONS.
2. **`README.md` needs nothing.** The brief allowed touching it "only if
   the portability fix genuinely needs it". It does not: README already
   reads "## The eleven skills" and already carries the `skill-authoring`
   row, both landed when that skill shipped with MAT-44.
3. **MAT-88's framing-sentence check is a verified no-op.** `## The map`
   has no framing sentence and the file carries no skill count anywhere, so
   eleven rows read exactly as nine did. See DECISIONS.
4. **Follow-up worth a ticket, not built here: a lint check banning
   machine-absolute paths on shipped surfaces.** This lane removes five
   instances by hand; nothing stops the sixth from being typed tomorrow.
   The natural home is `scripts/agent-lint.mjs`, which is sibling lane B's
   file this wave, so the check is reported rather than written. It pairs
   naturally with MAT-92 (the ≤80 cap check) as the same "make the law
   executable" family.

## Evidence log

**Step 1** — `skills/using-ae/evals/eval-07.md` (`ec806d0`).
```
node tests/run-eval-checks.mjs
  → ok   using-ae: 7 evals well-formed        exit 0
```

**Step 2** — three portability evals, one batch (`784934c`).
```
node tests/run-eval-checks.mjs
  → ok   ae-init: 8 evals well-formed
    ok   ae-audit: 5 evals well-formed
    ok   loop-setup: 6 evals well-formed      exit 0
```

**Step 3** — the three skills cite the rule (`0dd4dac`).
```
grep -rn "C:/Briar" skills/                              exit 1
grep -lF '§Reference paths' <the three SKILL.md> | wc -l → 3
grep -c "locate/ask\|or ask)\|on this machine" <same>   → 0 0 0
node scripts/agent-lint.mjs . --ignore …  → 0/0/0 PASS   exit 0
```
This step's acceptance FAILED on first run, on files this lane had just
written: step 2's evals quoted the machine path verbatim as evidence of
the defect they grade. Held the acceptance rather than relaxing it and
rewrote the three preambles to name the defect by shape — DECISIONS
ruling 3 carries the reasoning. Re-run green above.

**Step 4** — the loops ship `<repo>` (`fe98ac6`).
```
grep -rn "C:/Briar" loops/                               exit 1
grep -c -- "--repo path:<repo>" <both loop files>        → 1, 1
grep -q "registered enabled 2026-08-16" issue-triage.md  exit 0
node scripts/agent-lint.mjs . --ignore …  → 0/0/0 PASS   exit 0
```

**Step 5** — using-ae's map row (`b43392d`).
```
wc -l < skills/using-ae/SKILL.md                         → 79  (≤80)
grep -q "^- \*\*skill-authoring\*\* — "                    exit 0
git diff main --numstat -- skills/using-ae/SKILL.md      → 1  0
```

**Step 6** — the four gates, on the finished branch:
```
node scripts/agent-lint.mjs . --ignore tests,templates,global,examples
  → 0 high, 0 medium, 0 low — PASS                       exit 0
node tests/run-lint-tests.mjs   → all 16 cases passed    exit 0
node tests/run-gen-tests.mjs    → all gen cases passed   exit 0
node tests/run-eval-checks.mjs  → all eval checks passed exit 0
```
Fence — no do-not-touch file in the diff:
```
git diff --name-only main | grep -E '^(scripts/|tests/|templates/|global/
  |examples/|README\.md|CHANGELOG\.md|docs/plans/|docs/how-it-works/
  |skills/orchestrate/|reference/)'                       exit 1 (no match)
```
DoD — zero machine-absolute paths outside `docs/plans/`:
```
grep -rn "C:/Briar" --include="*.md" .
  | grep -v "^./work/" | grep -v "^./docs/plans/"          exit 1
```
The only surviving hit repo-wide is the deliberate one:
`docs/plans/2026-08-16-agent-engineering-p2-usage-skills.md:37`.
