# orchestrate — Orca-first orchestration (1.3.0) — plan

<!-- Steps with executable acceptance. Not "improve X" — "command Y exits 0". -->

## Constraints (apply to every step)

- **No version bump in this lane**: no restamp, no CHANGELOG entry — the
  release ritual owns the 1.3.0 bump, and it runs only after the dogfood
  gate (one real M through orchestrate) passes post-merge.
- **Evals precede content** for every touched skill (orchestrate is
  created evals-first; using-ae's evals update before its SKILL edit).
- **using-ae stays ≤80 lines** (always-loaded hard cap).
- **Runtime neutrality**: `orca` commands live only in the orchestrate
  skill and its reference templates; `reference/` describes the roles
  (orchestrator / worker / reviewer) neutrally.
- **Records never rewrite**: fan-out's name survives in ADRs, CHANGELOG,
  closed lanes, and examples/; only living surfaces update.

## Steps

- [x] 1. `judgment` Write `skills/orchestrate/evals/` — ≥4 evals covering:
      (a) parent entry + dispatch dialogue (M+ at a Run-bound session →
      orchestrate before acting; reviewers question with default 1 ballena
      before any worker-start), (b) supervision discipline (mailbox
      `check --wait`, rulings via `reply` land in the child's DECISIONS,
      never poll terminals, child never merges), (c) review wave + fix
      loop (findings back to the same child, cap 5 → decision gate; on
      PASS parent merges rebase-only in its chosen order), (d) tier
      gating + fallback (S refuses dispatch and resolves inline; M+
      always a child; no grandchildren; no-Orca fallback = manual
      procedure, Orca-only steps declared NOT done, never faked) —
      accept: `test $(ls skills/orchestrate/evals/eval-*.md | wc -l) -ge 4`
- [x] 2. `integration` Write the two dispatch templates:
      `skills/orchestrate/references/dispatch-child.md` (supervised
      worker preamble: run the work-cycle inside the lane, read your
      Linear ticket via `orca linear issue --current`, push branch +
      open PR but NEVER merge, `worker_done` with files + PR URL,
      questions via blocking `orca orchestration ask`) and
      `skills/orchestrate/references/reviewer.md` (adversarial reviewer:
      read-only on the lane branch, refute-the-PASS brief, verdict
      PASS/FAIL + findings via `worker_done`, never commit) — filled
      verbatim at dispatch, MAT-43 pattern —
      accept: `test -s skills/orchestrate/references/dispatch-child.md -a -s skills/orchestrate/references/reviewer.md`
- [x] 3. `judgment` Write `skills/orchestrate/SKILL.md` — the parent role
      end to end per `work/mat-55-orchestrate/SPEC.md`: Run binding
      (`run-create`/`run-use`), lane→Task with `--deps` overlap queuing,
      the dispatch dialogue (owner question: reviewers, count, model —
      default 1 ballena = deepseek v4 flash), children only via
      `worker-start --worktree new-child` + Linear bound at birth +
      template filled verbatim (cites step 2's exact paths
      `references/dispatch-child.md`, `references/reviewer.md`), mailbox
      supervision, review wave, fix loop cap 5 → decision gate, parent
      merges rebase-only, worker-release + worktree rm, multi-parent
      guidance (one parent per repo; same-repo parents = disjoint
      scopes), and the manual no-Orca fallback section (absorb the
      procedure from `skills/fan-out/SKILL.md` BEFORE step 4 deletes it) —
      accept: `node tests/run-eval-checks.mjs`
- [x] 4. `integration` Absorb fan-out: delete `skills/fan-out/` and
      update `reference/skills.md` (orchestrate owns dispatch/parallel
      execution; supersession + placement paragraphs stay coherent) —
      accept: `test ! -d skills/fan-out && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [x] 5. `judgment` using-ae: update its evals first, then SKILL.md — the
      map's fan-out row becomes `orchestrate` (dispatching M+ to a child;
      XL fan-out included) and add the role rule (Run-bound session =
      parent → M+ routes to orchestrate; dispatch-bound session = child →
      map behaves as today) —
      accept: `test $(wc -l < skills/using-ae/SKILL.md) -le 80 && grep -q orchestrate skills/using-ae/SKILL.md && node tests/run-eval-checks.mjs`
- [x] 6. `mechanical` [batch] Tier surfaces name orchestrate: the L
      executor mention and XL row in `reference/task-tiers.md`, the
      consumer tiers template under `templates/repo/`, and this repo's
      own tiers doc if present — same one-line fix shape across files —
      accept: `grep -q orchestrate reference/task-tiers.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [x] 7. `judgment` Write `docs/adrs/ADR-008-orchestration.md` recording
      the shaping decisions: child=lane via worker-start provenance (no
      grandchildren); PR-per-lane, child opens / parent merges
      rebase-only in parent order, `--deps` overlap queuing; S inline /
      M+ child; dispatch-time reviewer question, default 1 ballena,
      cross-model maker≠checker, fix cap 5 → gate; design-in-parent /
      execution-in-child; fan-out absorbed with manual fallback kept;
      1.3.0 reused post-renumber (ADR-007 addendum lineage) —
      accept: `test -s docs/adrs/ADR-008-orchestration.md`
- [x] 8. `judgment` docs/how-it-works chapter for orchestration (same
      change as the behavior, hard constraint): topology diagram (parent
      Run, children, ballenas, PRs to main) + lifecycle sequence diagram
      (the 8-stage dispatch cycle), every mermaid narrated ("what to
      SEE"), woven into the existing chapter arc —
      accept: `grep -rq orchestrate docs/how-it-works && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [x] 9. `mechanical` [batch] Remaining living surfaces: README skill
      table + chain + mermaid (orchestrate replaces fan-out; count stays
      10), root AGENTS.md Map line, any other living surface still
      naming fan-out as current (records excluded) —
      accept: `grep -q orchestrate README.md && node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- [x] 10. `mechanical` ae-init migration note: `**1.3.0** (2026-08-…)` —
      restamp only; skills are machine-global; the workstation installer
      must sweep the dangling fan-out junction (MAT-50 gap named) —
      accept: `grep -qF "**1.3.0** (2026-08" skills/ae-init/references/migration.md`
