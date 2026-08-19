# PROGRESS — mat-91-portability

Tickets: MAT-91 (primary) + MAT-88 · Tier M · Base: main 9fc4bda (v1.4.0)
Branch: `bygama/mat-91-portability` · Dispatch: ctx_85f24f7cf833

## Status

| Step | What | State |
|---|---|---|
| 1 | using-ae eval-07 (map routes to skill-authoring) | pending |
| 2 | portability evals ×3 [batch] | pending |
| 3 | three skills: path literal ⇒ citation [batch] | pending |
| 4 | two loops: path literal ⇒ `<repo>` [batch] | pending |
| 5 | using-ae map row | pending |
| 6 | gate sweep + lane truth | pending |

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

_(filled per step as work-run executes; each entry carries the command and
its exit code, never a claim without one)_
