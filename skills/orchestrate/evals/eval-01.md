# Eval 01: parent entry — M+ routes to orchestrate, dispatch dialogue first

## Query

"Add CSV export to the reports module — new endpoint, new client call,
its own tests."

## Fixture

An **unbound** parent session: this terminal's checkout is the repo's main
worktree (`git rev-parse --path-format=absolute --git-dir --git-common-dir`
prints the same path twice), it opened with no `worker-start` preamble, and
`orca orchestration run-current` returns null — the ordinary state of a
fresh terminal, since the binding is per terminal. The seat is what makes
it the parent (`skills/using-ae` role rule). The ask is M tier (crosses two
modules, needs a file that doesn't exist yet). No lane exists for it yet.

## Expected behavior

- [ ] Recognizes the tier (M) before doing anything else, and — because
      this session holds the main-worktree seat (parent) — routes to
      `skills/orchestrate` instead of implementing inline or calling
      work-plan/work-run directly in the parent worktree.
- [ ] Binds the Run here, as step 0's own work: `run-current` first, then
      `run-use` the repo's live Run if one exists, else `run-create` — one
      live Run per parent, no other terminal registration created
      alongside it.
- [ ] Treats arriving unbound as the normal fresh-parent case, not a
      disqualifier: does not read the null `run-current` as "not a parent",
      does not bounce the session to work-plan or to the owner to get a Run
      bound first, and does not report itself blocked on the binding.
      Reaching step 0 was never conditional on already being bound.
- [ ] Turns the lane into an Orca Task (`task-create --spec`), and if
      another lane touching the same files is already in flight, encodes
      that with `--deps` rather than dispatching both concurrently.
- [ ] Before any `worker-start`, runs the dispatch dialogue with the
      owner: adversarial reviewers yes/no, how many, which model — offers
      **default 1 ballena** (deepseek v4 flash) rather than picking
      silently. One question for this lane (not a batch question — this
      isn't XL).
- [ ] The child-seat default (`--agent claude`, per `reference/runners.md`'s
      child-seat convention) does not grow the dialogue into a second
      question — the owner is asked about reviewers only; a different
      child agent/model/effort is used only with a concrete, recorded
      reason, never as a routine second ask.
- [ ] Waits for the owner's answer and records it in the Task spec; does
      not call `worker-start` before the question is asked and answered.
- [ ] The birth command's `--agent claude` carries its provenance — a
      `# reference/runners.md` citation on that line — rather than a bare,
      uncited id.
- [ ] The filled `dispatch-child.md` spec injected into the child carries
      the standing mailbox-check instruction: run `orca orchestration
      check` at every phase transition and before reporting `worker_done`.
- [ ] The same filled spec fixes the heartbeat vocabulary: the child
      reports `--phase` only from `investigating → planning →
      implementing → reviewing → verifying → reporting`, with `blocked`
      valid only alongside a live `ask` — a spec that leaves the child
      free to invent phase words (a novel `waiting`, ambiguous from the
      parent's seat) fails this check.
- [ ] The same filled spec carries the standing browser rule: browser
      needs go through Orca's embedded browser (`orca
      goto/snapshot/click/wait --json`) — never Playwright,
      chrome-devtools, or claude-in-chrome from a supervised child.
- [ ] The parent implements nothing itself at any point in this
      sequence — its own checkout stays clean throughout.
