# Eval 05: two modes — design-first, direct, and the uncertainty refusal

## Query

(a) "We just spent the last twenty minutes talking through the caching
approach for the upload pipeline — I think we've landed on a design.
Turn it into a lane." (design emerged from conversation; no SPEC.md
exists yet.)
(b) "Requirements are settled — MAT-41's tracker issue IS the spec, it
lists exactly what to build. Write the lane plan." (owner states
certainty; the issue stands in for a SPEC.)
(c) "Add caching somewhere in the upload pipeline, I guess — not sure
exactly where or how yet." (no prior design conversation, and the ask
itself is still open on scope.)

## Fixture

(a) A fresh `work/` lane slug with no SPEC.md and no PLAN.md; the
design conversation immediately preceding the query settled the
approach (cache keys, invalidation, where it hooks into the pipeline)
but nothing has been written to a file yet.
(b) A fresh `work/` lane slug with no SPEC.md and no PLAN.md; a
tracker issue (MAT-41) exists with an unambiguous scope description
the owner is pointing to as the spec.
(c) No lane exists yet; no prior design conversation is in context;
the ask leaves open where in the pipeline and what caching strategy —
genuine unresolved scope, not just missing paperwork.

## Expected behavior

- [ ] (a) Writes the lane's SPEC.md from the settled conversation and
      stops — the same turn does not also produce a PLAN.md.
- [ ] (a) The stop is an explicit request for owner approval of the
      SPEC, not a silent pause or an aside buried in unrelated output.
- [ ] (a) PLAN.md is only written in a later turn, after the owner's
      approval of the SPEC is on record — never speculatively
      alongside it.
- [ ] (a) The same turn that writes SPEC.md also writes
      `work/<slug>/PROGRESS.md`, carrying this line verbatim under
      `## In progress`:

      ```
      STATE: design-first approval window, waiting for owner approval of SPEC.md before PLAN.md
      ```

- [ ] (a) PLAN.md still does not appear alongside that PROGRESS.md —
      writing it stays gated on the owner's approval, exactly as the
      bullet above requires.
- [ ] (a) Once PLAN.md is written in that later turn — whichever tier
      produces it, this lane's own M/L plan or an XL parent plan — the
      marker line comes out of `PROGRESS.md` the same turn, so the file
      stops declaring a wait that is already over.
- [ ] (b) Because the owner states certainty and names the tracker
      issue as the spec, both SPEC.md and PLAN.md come out in the same
      pass — no intermediate stop between the two files.
- [ ] (b) Exactly one approval gate is presented, at the end, covering
      both files together — not one gate per file.
- [ ] (b) Direct mode never writes the marker above: it has no
      approval window to declare, so PROGRESS.md — however it reads in
      this pass — does not carry the `STATE: design-first approval
      window...` line.
- [ ] (c) Refuses to write SPEC.md or PLAN.md, and does not open a
      `work/` lane for the ask.
- [ ] (c) The refusal names the missing design explicitly and invokes
      shaping as the next step, rather than a bare "no".
- [ ] (c) Invents no scope to force the ask into either mode — no
      guessed caching strategy, no assumed location in the pipeline.
