---
issue: MAT-58
---
# orchestrate polish batch — spec

<!-- Owner-written. The agent never edits this file. -->

The eight accumulated orchestrate follow-ups from the MAT-55 lane
triage and the two production dogfoods (MAT-56, MAT-60), plus three
cosmetic look-sees, as one polish pass. All shaped at dispatch —
this spec formalizes the parent's design; it re-decides nothing.

## Done looks like

Eight items, each verified against the current tree during lane
investigation (file:line as of branch point b732b30):

1. **Ballena two-step launch closes its fallback shell.** The
   four-command launch block in `skills/orchestrate/SKILL.md` step 6
   (lines 129-136) gains one sentence: the two-step create can leave
   an unused fallback startup shell — close it after confirming it is
   unused, citing `reference/orca.md` (which already prescribes it at
   its "Worktree and terminal notes"; manifested live twice). No
   orca.md edit needed — the prescription is already there, the skill
   cites it.
2. **Both opencode forms labeled in `reference/runners.md`.** Verified:
   MAT-57's registry edit covers only the headless `opencode run -m …`
   form (per-runner table, opencode row); the skill's two-step launch
   uses the TUI form `opencode -m <provider/model>` (SKILL.md line
   133). The opencode row (or an adjacent note) labels both: headless
   `opencode run` for one-shot prompts, the bare TUI form for
   orchestrate's reviewer seat (`terminal wait --for tui-idle`, then
   `worker-start --terminal`).
3. **No-Orca fallback emits the ready-to-run protocol when the
   requested runner is not installed.** Fallback step 4 (SKILL.md
   lines 238-240): a requested runner that is not installed gets the
   full protocol emitted ready to run — exact spawn commands, lane
   list, order — with execution declared NOT done; never a silent
   substitution or a simulated spawn.
4. **Feature rows flip from the MERGED tree.** One clause on SKILL.md
   step 7 (lines 184-187, "parts passing is not the whole passing"):
   feature-list rows flip to passing from the merged tree after the
   last merge, never from a lane branch. (Aligns the skill with what
   `docs/how-it-works/execution.md`'s XL mermaid already shows:
   `rows -> passing` after the synthesis gate.)
5. **Fallback closes lanes via work-handoff.** One line on fallback
   step 5 (SKILL.md lines 241-243): after the synthesis gate, lanes
   close via work-handoff — the fallback currently ends at the gate.
   (Same alignment: execution.md's mermaid already says "handoff
   closes lanes + parent".)
6. **Reviewer retain + per-seat worktree names.** SKILL.md step 6:
   the re-review retain instruction (lines 158-161) gains the literal
   `worker-retain --dispatch <id>` command (the child's instruction
   at lines 121-123 already has it); the review worktree name at line
   131 becomes per-seat — `<slug>-review-<seat>` (r1, r2, …) — so N>1
   agreed reviewers never collide; the later `<slug>-review` mentions
   (lines 164, 192) stay coherent with the suffix.
7. **Child seat as standing convention.** `reference/runners.md`
   gains a child-seat entry (a short section beside "The adversarial
   seat"): default `--agent claude`; per-dispatch override via
   `worker-start --agent/--model/--effort` only with a concrete
   reason recorded at dispatch, never silently. SKILL.md step 4's
   birth command cites the registry (`# reference/runners.md`
   comment on the `--agent claude` line) instead of a bare id. The
   dispatch dialogue stays ONE question (reviewers) — no second
   question is added.
8. **Child mailbox discipline + `--worktree` on re-engage.**
   `skills/orchestrate/references/dispatch-child.md` template gains
   the standing instruction: run `orca orchestration check` at every
   phase transition (investigate→implement→review→verify) and before
   reporting worker_done — a child that never checks ships superseded
   design (MAT-60, live). And SKILL.md step 6's fix-loop and
   re-review `worker-start --terminal` examples (lines 152-155,
   160-161) gain the `--worktree` selector — hit live:
   `terminal_worktree_mismatch` without it (CLI verified: `--worktree
   <selector>` accepted alongside `--terminal`).

9. **Child browser rule (owner amendment, mid-flight — see
   DECISIONS.md).** `skills/orchestrate/references/dispatch-child.md`
   gains one standing instruction alongside item 8's mailbox rule:
   browser needs go through Orca's embedded browser (`orca
   goto/snapshot/click/wait --json` — the verified form of
   reference/orca.md:53, per the fix-round-1 ruling in DECISIONS.md;
   the amendment's original `tab create/` prefix was ruled the sloppy
   literal) — NEVER Playwright,
   chrome-devtools, or claude-in-chrome from a supervised child
   session: a driven browser is a long-lived process that blocks the
   card's working→idle transition and dies with the session, while
   Orca's browser lives in the app (`reference/orca.md` names it the
   e2e tool; cite it). Evals-first: one eval-01 line grading the
   filled spec carrying this rule, own test commit before the content
   commit.

Three cosmetic look-sees (fix if cheap — all three verified cheap):

- **using-ae red-flag row.** "work-run owns M+ lanes wherever
  subagents exist" (SKILL.md red-flags table) rewritten to match the
  role rule: M+ never runs inline — a Run-bound parent routes it to
  orchestrate; work-run executes it inside a lane.
- **Naming drift: "pre-dispatch" → "pre-fan-out".**
  `docs/how-it-works/execution.md:276` says "three pre-dispatch
  questions"; `reference/graphs-and-reducers.md:62`, ADR-008,
  ADR-002, and the spec all say "pre-fan-out questions". Align
  execution.md to the majority + immutable-record term
  (pre-fan-out); graphs-and-reducers.md needs no edit.
- **README `FAN` node id.** First mermaid (lines 78-79): node id
  `FAN` → `ORC` (fan-out is dead terminology; the node depicts
  orchestrate). Same block's `<br\>` typo on line 75 fixed in
  passing (recorded in DECISIONS.md).

## Ceremony

- Evals before content, split commits, per skill whose SKILL.md or
  references change: orchestrate (items 1, 3-8) and using-ae (red-flag
  row). Eval changes land in their own commit BEFORE the content
  commit for that skill.
- Eval placement: orchestrate eval-01 grades item 7 (registry-cited
  birth, one-question dialogue) and item 8's template instruction;
  eval-03 grades items 1, 4, 6, and 8's `--worktree` examples;
  eval-04 grades items 3 and 5. using-ae eval-04 gains one line
  grading the reworded red-flag row.

## Out of scope

- Any file outside: skills/orchestrate/**, skills/using-ae/**
  (cosmetic row + its eval only), reference/runners.md,
  reference/graphs-and-reducers.md (verified: no edit needed),
  README.md (mermaid node id block only),
  docs/how-it-works/execution.md (naming drift line only).
  reference/orca.md verified: no edit needed (item 1 cites it as-is).
- Version bump, CHANGELOG entry, restamp — the release ritual owns
  those (this ships in 1.3.1).
- mat-61's files (skills/ae-init, reference/tracker.md,
  skills/work-handoff) — disjoint sibling in flight; touching one
  requires asking the parent first.

## Gates

All four green before the PR:

- `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
- `node tests/run-lint-tests.mjs`
- `node tests/run-gen-tests.mjs`
- `node tests/run-eval-checks.mjs`
