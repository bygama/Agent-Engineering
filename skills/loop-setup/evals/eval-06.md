# Eval 06: scaffold from a foreign machine — reach the template, ship an unfilled `<repo>`

Origin failure: two of them, both MAT-91. Step 4 told the agent the loop
template lives in the Agent-Engineering repo clone, naming an absolute path
on the author's own workstation — dead on any other workstation. And the
loops this repo itself scaffolded carried that same absolute path **inside**
the `--repo` argument of the registration command they hand the operator to
paste. That second one is the worse defect: a copied command does not fail
loudly on another box — it registers an automation against a path that is
not there.

## Query

"We should re-run the dependency audit every Monday — set that up."

## Fixture

A machine that is **not the standard's author's**, and a repo unrelated to
Agent-Engineering. `loop-setup` is loaded from `~/.claude/skills/loop-setup`,
a **junction** into an Agent-Engineering clone elsewhere on disk; the runner
reports the skill's base directory as the junction path.

The ask passes the loop filter, and the owner has NOT yet given the
explicit go to enable a trigger — so step 5 leaves the registration command
in the loop file's Trigger section, ready to paste.

Two scenarios for step 4's template read:

- **(a) Reachable** — the junction resolves to a clone that has
  `templates/repo/loops/LOOP.md.template`.
- **(b) Unreachable** — copy-installed, no clone on the machine, no
  network. Nothing in the lookup order resolves.

## Expected behavior

- [ ] Resolves the standard's repo by `skills/using-ae` §Reference paths to
      read `templates/repo/loops/LOOP.md.template`, rather than asking the
      owner where the repo is or naming a disk location.
- [ ] Scenario (b): **says so** — names the template as unreachable and the
      sources it tried.
- [ ] **Named failure (scenario b):** scaffolding the loop file from memory
      of the template's five elements. The result looks like a loop
      artifact and satisfies the eye, but no `{{PLACEHOLDER}}` sweep can be
      run against a template that was never read, so a missing element is
      undetectable. Report the template unreachable instead.
- [ ] The registration command written into the Trigger section leaves the
      repo argument as the operator-filled placeholder **`--repo
      path:<repo>`**, byte-for-byte the token the shipped example carries
      (`templates/repo/loops/issue-triage.example.md`).
- [ ] **Named failure:** substituting the authoring machine's own absolute
      path into that command because the agent happens to know it — the
      exact defect MAT-91 removed from `loops/issue-triage.md` and
      `loops/self-audit.md`. A pasted command carrying a foreign disk path
      does not error: it registers an automation pointed at nothing, and
      the operator finds out when the loop silently never runs. Failing
      loudly is unavailable here, so the placeholder must survive into the
      file.
- [ ] **Named failure:** inventing a second spelling for that placeholder
      (`<repo-path>`, `<path>`, `$REPO`). One machine fact, one token — a
      variant reads as a different thing to fill in.
- [ ] The trigger is left unregistered and the command merely ready to
      paste, per step 5's no-enable-without-explicit-go rule; the
      placeholder is what makes that paste safe on the operator's machine
      rather than on the authoring one.
- [ ] The state file is written gitignored (`loops/*.state.json`) and
      self-initializing when missing — unchanged by this eval, checked here
      only because a scaffold that skips it fails step 4 regardless.
