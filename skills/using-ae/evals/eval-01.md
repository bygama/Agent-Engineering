# Eval 01: entry — tier named, owning AE skill invoked before acting

## Query

"Add an export endpoint to the API."

## Fixture

A fresh session in an AE-standard repo. using-ae was injected at
SessionStart (via the hook). No `work/` lane is open for this task yet.
The repo has existing tests and a verify command. The session's checkout
is a **non-main worktree** — a linked worktree of the repo, where `git
rev-parse --path-format=absolute --git-dir --git-common-dir` prints two
different paths — and no `worker-start` preamble opened it, so it is not
dispatch-bound either. No Orca Run is bound in this session (`orca
orchestration run-current` returns none, or Orca is absent). Neither seat
makes this a parent orchestrator session.

## Expected behavior

- [ ] Before writing any code, editing any file, or running exploratory
      commands, names the task's tier explicitly — M, per
      `reference/task-tiers.md` (a new flow: an endpoint plus its
      client call) — rather than starting to implement.
- [ ] Invokes the AE skill that owns that tier's entry phase
      (`work-plan`, to produce the lane's SPEC/PLAN) before any
      implementation action, and before asking clarifying questions
      about how to execute the work.
- [ ] Does not open ad-hoc edits, a scratch plan, or a TODO list outside
      the lane files as a substitute for invoking the owning skill.
- [ ] If the agent has clarifying questions about the endpoint's shape,
      asks them through or after invoking work-plan, not as a reason to
      defer invoking it.
- [ ] Names `work/<slug>/` as the lane the work will live in, not a
      one-off patch applied straight to the working tree.
- [ ] Invokes `work-plan` directly rather than `orchestrate` — this
      session sits in a non-main worktree and carries no dispatch
      preamble, so no seat makes it a parent and the role rule leaves the
      map behaving as written here; contrast eval-04, where a bound Run
      redirects the same M ask to `orchestrate`, and eval-05, where the
      main-worktree seat does so with no Run bound at all.
- [ ] Does not read the absent Run as the reason in either direction: a
      missing binding neither confers parenthood nor withholds it — the
      seat does (MAT-85). An answer that says "no Run, therefore not a
      parent" reaches the right skill by the wrong rule and fails here.
- [ ] The map used to pick the invoked skill carries a `shaping` row
      for the design phase, alongside `work-plan` (landed with MAT-45;
      this ask's scope is already clear, so `work-plan` remains the
      one invoked here).
