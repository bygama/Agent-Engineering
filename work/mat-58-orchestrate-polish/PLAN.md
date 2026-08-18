# orchestrate polish batch — plan

## Constraints (every step)

- Evals before content, split commits, per skill: the eval commit for a
  skill lands BEFORE that skill's content commit (orchestrate,
  using-ae).
- Scope fence (SPEC "Out of scope"): nothing outside
  skills/orchestrate/**, skills/using-ae/**, reference/runners.md,
  README.md (first mermaid block only), docs/how-it-works/execution.md
  (line 276 term only). NO version bump, NO CHANGELOG, NO restamp.
- House voice: edits match each file's existing tone and density; one
  sentence/clause where the SPEC says one.
- mat-61's files (skills/ae-init, reference/tracker.md,
  skills/work-handoff) are a sibling's — never touched.

## Steps

- [x] 1. `judgment` — Extend orchestrate evals to grade the seven
      orchestrate-side polish items before any content changes:
      eval-01 gains lines for the registry-cited birth command
      (`# reference/runners.md` on `--agent claude`), the
      one-question dialogue staying one question, and the filled
      child spec carrying the mailbox-check standing instruction
      (check at every phase transition + before worker_done);
      eval-03 gains lines for closing the ballena launch's unused
      fallback shell after confirming unused, the literal
      `worker-retain --dispatch` in the re-review retain, per-seat
      `<slug>-review-<seat>` worktree names for N>1 reviewers,
      `--worktree` present in the fix/re-review `worker-start
      --terminal` examples, and feature rows flipping to passing only
      from the merged tree after the last merge; eval-04 gains lines
      for the fallback emitting the ready-to-run protocol when the
      requested runner is not installed and closing lanes via
      work-handoff after the synthesis gate. Commit
      `test(orchestrate): …` — accept:
      `node tests/run-eval-checks.mjs` exits 0.
- [x] 2. `judgment` — Write the orchestrate content the step-1 eval
      lines grade, exactly the SPEC's items 1, 3, 4, 5, 6, plus item
      7's birth-command citation and item 8's two template/example
      changes: `skills/orchestrate/SKILL.md` (step 6 launch block
      sentence citing `reference/orca.md`; fallback step 4 protocol
      clause; step 7 merged-tree clause; fallback step 5 work-handoff
      line; literal `worker-retain --dispatch <id>` + per-seat
      review-worktree suffix at lines 131/164/192; `#
      reference/runners.md` comment on the step 4 birth command;
      `--worktree` selector added to both step 6 `worker-start
      --terminal` examples) and
      `skills/orchestrate/references/dispatch-child.md` (standing
      mailbox instruction: `orca orchestration check` at every phase
      transition and before worker_done). Commit
      `fix(orchestrate): …` — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      and `node tests/run-eval-checks.mjs` both exit 0.
- [x] 3. `judgment` — reference/runners.md: label BOTH opencode forms
      in/beside the per-runner table's opencode row (headless
      `opencode run -m …` for one-shot prompts; bare TUI `opencode -m
      <provider/model>` for orchestrate's reviewer seat via `terminal
      wait --for tui-idle` + `worker-start --terminal`), and add the
      child-seat section beside "The adversarial seat" (default
      `--agent claude`; per-dispatch `--agent/--model/--effort`
      override only with a concrete recorded reason, never silently).
      Commit `docs(runners): …` — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      exits 0.
- [x] 4. `mechanical` — using-ae eval-04 gains one checklist line
      grading the reworded red-flag row (M+ never inline: parent
      routes to orchestrate, work-run executes within a lane). Commit
      `test(using-ae): …` — accept: `node tests/run-eval-checks.mjs`
      exits 0.
- [x] 5. `mechanical` — using-ae SKILL.md red-flags table: rewrite the
      "I'll just execute this inline" row's Reality cell to the
      role-rule-consistent wording step 4's eval line grades. Commit
      `fix(using-ae): …` — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      and `node tests/run-eval-checks.mjs` both exit 0.
- [x] 6. `mechanical` — Cosmetics, one commit `docs: …`:
      `docs/how-it-works/execution.md:276` "pre-dispatch" →
      "pre-fan-out"; README first mermaid `FAN` node id → `ORC` (both
      occurrences) and the same block's `<br\>` → `<br/>` typo.
      Accept: `grep -c "pre-dispatch" docs/how-it-works/execution.md`
      outputs 0, `grep -c "FAN" README.md` outputs 0, and
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      exits 0.
- [x] 7. `mechanical` — Full gate sweep on the finished tree: all four
      gates green — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`,
      `node tests/run-lint-tests.mjs`, `node tests/run-gen-tests.mjs`,
      `node tests/run-eval-checks.mjs` all exit 0.
- [x] 8. `judgment` — (item 9, owner amendment) orchestrate eval-01
      gains one checklist line grading the filled child spec carrying
      the standing browser rule (Orca embedded browser via `orca tab
      create/goto/snapshot/click/wait --json`; never Playwright,
      chrome-devtools, or claude-in-chrome from a supervised child).
      Commit `test(orchestrate): …` — accept:
      `node tests/run-eval-checks.mjs` exits 0.
- [x] 9. `judgment` — (item 9, owner amendment)
      `skills/orchestrate/references/dispatch-child.md`: one standing
      instruction alongside the mailbox rule, exactly the step-8 eval
      line's literals, citing `reference/orca.md`. Commit
      `fix(orchestrate): …` — accept:
      `node scripts/agent-lint.mjs . --ignore tests,templates,global,examples`
      and `node tests/run-eval-checks.mjs` both exit 0; rerun the full
      four-gate sweep from step 7 after this step (it re-closes the
      tree).
