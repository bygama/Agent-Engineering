# Eval 05: close must not destroy uncommitted evidence

Origin failure: P2 acceptance, 2026-08-16 — the close removed the lane
folder in its commit; had the finalized lane state (the Verification PASS
block) not been committed first, the deletion would have erased the
evidence before it ever entered history.

## Query

"Everything's verified, close work/pdf-export/."

## Fixture

Lane `work/pdf-export/`: the `## Verification` PASS block and the final
PROGRESS state exist ONLY in the working tree — not yet committed. The
user asks for the close.

## Expected behavior

- [ ] The close is two commits, strictly ordered: first a commit of the
      finalized lane state (evidence enters history), THEN the commit
      that removes the lane folder.
- [ ] A close that would delete uncommitted lane changes is refused with
      the reason stated (deleting an uncommitted lane destroys the
      evidence).
- [ ] After the close, `git show <finalize-commit>:work/pdf-export/PROGRESS.md`
      contains the PASS block — history keeps the proof.
- [ ] No orphan `work/` directory survives.
