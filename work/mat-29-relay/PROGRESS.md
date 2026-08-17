# relay — progress

## Done

- 2026-08-17 — Design conversation (superpowers research, four design
  sections approved by owner in chat). SPEC written from the approved
  design.
- 2026-08-17 — Evals first: `skills/relay/evals/` eval-01..04
  (dispatch, fix loop, refusal/fallback, closing); eval-structure suite
  green.
- 2026-08-17 — `skills/relay/SKILL.md` written (house style, passes the
  four evals' contract).
- 2026-08-17 — ADR-004-relay; amendments to `reference/skills.md`
  (supersession), `reference/task-tiers.md` (source pointer + L row),
  `docs/how-it-works/work-lifecycle.md` (relay subsection),
  `docs/how-it-works/execution.md` (pairing note), AGENTS.md (gotcha +
  Map usage-skills line).
- 2026-08-17 — README: "The seven skills" + chain paragraph + chain
  diagram + repo-local skills note; Status names ADR-004.
- 2026-08-17 — All four gates green (self-lint PASS, 13 lint cases, all
  gen cases, all eval checks).

## In progress

- 2026-08-17 — Release ritual (`/release`, expected MINOR) + PR.

## Tried and failed

## Next

- Rebase-merge the PR; tag v1.1.0 post-merge (release ritual step 7).
- Dogfood relay on the MAT-30 migration lanes.

## Verification

### 2026-08-17 — M DoD — PASS
- L1 static: `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples` → exit 0 (0 high, 0 medium, 0 low)
- L2 behavioral: `node tests/run-lint-tests.mjs` → exit 0 (all 13 cases); `node tests/run-gen-tests.mjs` → exit 0 (all gen cases); `node tests/run-eval-checks.mjs` → exit 0 (relay: 4 evals well-formed)
- L3 end-to-end: PLAN acceptance greps executed — ADR-004 exists; "relay" in reference/skills.md, reference/task-tiers.md, work-lifecycle.md, AGENTS.md; README seven-skills section; CHANGELOG [1.1.0] entry | markdown-only change set, no runtime component
- Fresh-context review: PASS — reviewer ran all four commands itself; 3 low findings (stale suite-example list in reference/skills.md, stale Retrieved date in task-tiers.md, stale PROGRESS Next entries), all fixed in the finalize commit
- Adversarial review: n/a — M tier, not requested

<!-- PASS evidence only, written by work-verify (newest on top); the close
     handoff refuses to close a lane without a current PASS block here. -->

<!-- First read of every session. If it isn't here, it didn't happen. -->
