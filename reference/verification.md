# Verification

Sources: [Anthropic: Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
(evaluator separation); [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)
(agent-oriented errors, invariant enforcement); Guo et al.,
[On Calibration of Modern Neural Networks](https://arxiv.org/abs/1706.04599).
Retrieved 2026-08-16.

## Evidence over confidence

Models are systematically overconfident: reported confidence exceeds actual
accuracy, and the characteristic agent failure is not a crash but a fluent
paragraph explaining why the error doesn't matter. Therefore: **done is a
command that exited 0, with the evidence recorded** — never a self-assessment.

## Three layers, in order, no skipping

1. **Static** — lint, typecheck. Cheapest, least informative, mandatory.
2. **Behavioral** — tests pass AND the thing actually starts.
3. **End-to-end** — for cross-component changes, the full flow runs: a browser
   click-through for UI, an executed command for a CLI. Unit tests are
   structurally blind to interface mismatches, cross-layer state, resource
   lifecycles, and environment differences — only this layer catches them.

No refactoring until core functionality is verified: refactors move the
verified/unverified boundary.

## Maker ≠ checker

The author re-reads its own reasoning, not the result — same blind spot as a
writer proofreading their draft. Separation is structural, not motivational:

| | Decorative evaluator | Real evaluator |
|---|---|---|
| Instructions | author's + "review this" | its own, written to find faults |
| Context | shared with the author | **fresh** |
| Method | reads the code | **acts on it**: runs, clicks, screenshots |
| Stance | trusts | assumes broken until proven |

An evaluator sharing the maker's conversation is the maker in a different
font. Rubrics with hard thresholds per dimension make verdicts reproducible
("contrast 2.1:1, needs 4.5:1" — not "feels off").

## Error messages carry the fix

Failure text written for agents has three parts — what, why, fix:

```
ERROR: direct import of 'fs' in src/renderer/App.tsx:12
WHY: renderer has no Node API access (security boundary)
FIX: move file ops to src/preload/file-ops.ts; call window.api.readFile()
```

This turns every failure into a self-correction loop instead of a guess.

## Broken twice becomes a check

The first failure is information; the second is a pattern. Promote it: a lint
rule, a test, a schema — never another paragraph of prose. Review comments
that repeat get the same treatment (review-feedback promotion). Enforce
invariants mechanically; don't micromanage implementation.

## Evals

Build eval sets from failures you actually had, not imagined ones — 20 to 50
real tasks is plenty. Agents are non-deterministic: run each task three times
and judge the worst run (75% per-attempt success ≈ 42% all-three success).
One green run tells you almost nothing.
