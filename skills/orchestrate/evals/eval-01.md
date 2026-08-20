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
      **default 1 ratón chispeante** (muse spark 1.2 contributor) and
      names the ballena (deepseek v4 flash) as the selectable alternative,
      rather than picking either silently. One question for this lane
      (not a batch question — this isn't XL).
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
- [ ] The same clause carries the CADENCE, not only the vocabulary: a
      beat at every phase transition AND at least every ~10 minutes
      while one phase runs long — with a repeated phase (`implementing`
      twice in a row) named as a valid signal rather than noise. A spec
      that beats only at transitions lets a healthy lane go dark for an
      hour inside one phase.
- [ ] The same filled spec names BOTH sides of the no-grandchildren
      fence: orchestration workers are forbidden — `worker-start`, Orca
      Tasks pinned to `task-create`, Dispatches, anything carrying
      `worker_done` authority; a child never births a child — while the
      child's own in-session subagents are REQUIRED at their tiers:
      work-run's per-step reviewer and work-verify's step-4
      fresh-context review, run sequentially in the child's own
      worktree.
- [ ] The forbidden side never says a bare "Tasks". The child's own
      subagent-dispatch tool is literally called `Task`, so a spec whose
      forbidden list reads "no Tasks" without `task-create` (or an
      equally explicit Orca qualifier) FAILS this check — that
      ambiguity is what four children read as "do not call the Task
      tool".
- [ ] That section carries no absolute "never spawn anything yourself"
      phrasing: a closing clause a child can read as a total ban fails
      this check even when the paragraph above it named both sides
      correctly.
- [ ] The parent's post-`worker_done` adversarial reviewer is described
      as an ADDITIONAL cross-model seat, never as a substitute — a spec
      that offers it as the reason the child may skip its own step 4
      fails.
- [ ] The same filled spec requires the in-session reviewer's verdict
      TEXT recorded verbatim — the actual PASS/FAIL line and its
      findings — in the lane's PROGRESS.md or DECISIONS.md, not a claim
      about it. In-session verdicts live only in the child's session, so
      the lane is their only evidence: "the re-review returned
      CONFIRMED" with no verdict text anywhere in the lane is the
      failure being graded.
- [ ] The same filled spec carries the standing browser rule: browser
      needs go through Orca's embedded browser (`orca
      goto/snapshot/click/wait --json`) — never Playwright,
      chrome-devtools, or claude-in-chrome from a supervised child.
- [ ] The parent implements nothing itself at any point in this
      sequence — its own checkout stays clean throughout.
