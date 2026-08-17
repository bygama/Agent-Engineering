# Eval 01: shaping — dispatchable units, executable acceptance

## Query

"Design's approved — write the PLAN for work/img-12-thumbnail-cache/.
SPEC.md is in the lane; go."

## Fixture

An M-tier lane with SPEC.md already approved, describing a small
feature (add a thumbnail cache to the upload pipeline) that imposes one
cross-cutting constraint: cache keys must match the existing hash
format used elsewhere in the pipeline. PLAN.md does not exist yet.

## Expected behavior

- [ ] Reads the lane's SPEC.md as the input design and does not invent
      scope beyond it.
- [ ] Every PLAN step is one coherent change, one commit, one
      dispatchable subagent — no step bundles two concerns into one
      line.
- [ ] Every step's acceptance is an executable command with an expected
      exit, verified plausible against AGENTS.md Commands / lockfiles
      before being written — never a vague acceptance like "improve X"
      or "make sure it works".
- [ ] Because the design imposes a global constraint (the cache-key
      format), the PLAN opens with a short constraints block carrying
      it, rather than repeating it ad hoc inside individual steps.
- [ ] PLAN.md contains no complete code — steps stay one line +
      acceptance; a work-run implementer is expected to read the repo and
      the lane itself, not the plan, for implementation detail.
- [ ] Writes the plan to `work/img-12-thumbnail-cache/PLAN.md` — the
      standard's location — never to a suite's default folder or a
      standalone document elsewhere.
