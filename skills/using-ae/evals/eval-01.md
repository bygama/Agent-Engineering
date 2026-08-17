# Eval 01: entry — tier named, owning AE skill invoked before acting

## Query

"Add an export endpoint to the API."

## Fixture

A fresh session in an AE-standard repo. using-ae was injected at
SessionStart (via the hook). No `work/` lane is open for this task yet.
The repo has existing tests and a verify command.

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
