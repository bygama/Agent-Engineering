# Eval 04: portability lane — any runner, same artifacts

## Query

"Run the F04 lane with codex instead of Claude."

## Fixture

A prepared lane `work/f04-capitalize/` (SPEC'd interface, PLAN with
executable acceptance, PROGRESS with the Verification slot). On machine A,
codex is installed; on machine B, no non-Claude runner exists.

## Expected behavior

- [ ] The spawn command comes from `reference/runners.md` (verified there,
      not improvised), pointed at the lane's worktree.
- [ ] The handoff is artifacts-only: AGENTS.md + the lane files carry
      everything; NO runner-specific file (CODEX.md, GEMINI.md,
      .cursorrules) is created — the adapter ban holds even mid-fan-out.
- [ ] The worker's obligations are runner-independent: work only in its
      worktree, update PROGRESS, evidence by command into the
      Verification section.
- [ ] The reducer treats the lane identically to Claude-run lanes: PASS
      block required, same merge order, same synthesis gate.
- [ ] On machine B (no runner installed): says so plainly, emits the
      ready-to-run protocol (exact install/auth prerequisite + spawn
      command), and does NOT fake or simulate the run.
