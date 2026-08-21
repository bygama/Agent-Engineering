### Spec compliance
✅ Compliant

### Strengths

- **Correct verdict, correctly derived.** `grep -c 'global/' examples/machine-config/README.md` returns 0 (I re-ran it — confirmed) — the file never cited a path in this repo's `global/`, so the deletion had nothing to pull out from under it. The implementer built the "no edit" case on that fact first, then walked all five checkable claims individually rather than asserting the conclusion.
- **The one claim that does name this repo's own surface was actually checked, not assumed.** Claim 4 — workstation's CI runs "this standard's lint on every PR (`.github/workflows/verify.yml`, job `standard`)" — is the single claim with a real dependency on this repo. I read `C:\Briar\repos\mine\workstation\.github\workflows\verify.yml` directly: it has a job literally named `standard` that checks out `bygama/Agent-Engineering` to `standard/` and runs `node standard/scripts/agent-lint.mjs repo`. Matches the claim exactly. The implementer's own chain of custody for this claim is also sound: `scripts/agent-lint.mjs` is untouched by this lane (I confirmed `git diff main --stat -- scripts/agent-lint.mjs` is empty), so the invocation contract the workstation CI depends on didn't shift underneath it.
- **Correctly separated in-scope drift from out-of-scope drift.** The implementer found real staleness on the workstation side (`claude/README.md` still calling `hooks/` canonical source `Agent-Engineering/global/hooks/`) and correctly kept it out of this file's verdict — it's a different file, already logged under "Out of scope, reported not fixed" in DECISIONS.md for the parent to fold into the workstation wave-close. No scope creep, no silent absorption into this step's judgment.
- **Cross-check against architecture.md's own description of this entry** (`docs/how-it-works/architecture.md:157-158`, "the machine-config entry that points at the living public consumer (workstation) instead of a snapshot that would drift") — I verified the line citation is exact (`grep -n` confirms line 157) and the description does still hold: the file is 4 live GitHub blob links into `bygama/workstation@main`, zero snapshotted paths from this repo.
- **Stayed inside the fence.** The diff touches only `work/mat-111-deglobal/DECISIONS.md` — no path under `examples/` appears anywhere in the diff. `examples/machine-config/README.md` itself is byte-for-byte what it was before this lane.
- **The DECISIONS.md entry is a real, substantive record**, not a rubber-stamp aimed at the (weak) acceptance grep — it argues each of the five claims individually with citations, which is what actually earns the "verdict recorded" bar, not the grep.

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
None.

#### Minor (Nice to Have)

- **`work/mat-111-deglobal/DECISIONS.md:195` — "9 real gotchas" is now off by one against the live source it cites.** I counted the `## Gotchas` section of `C:\Briar\repos\mine\workstation\AGENTS.md` at the commit the lane's own precondition pins (`22f3619`, confirmed via `git log -1`): 10 bullets (lines 19–45), not 9. This is **not** something this lane's deletion caused, and not something in scope to fix — the drift is in `bygama/workstation`'s own file, evolving independently of this repo's `global/` removal, and the implementer's stated scoping ("no claim here is at risk from *this lane's* change, so there was no specific claim to check") is a defensible reading of the step's actual mandate (did the deletion falsify the file, not is every live-linked number still exact). It doesn't touch the "no edit" verdict. Flagging only because the review brief specifically asked whether the implementer leaned on the snapshot/out-of-scope framing to avoid a check it should have made: here it did skip checking the numeric claims (line counts, gotcha count) against the clone it had available, and one of them (unlike the CI-job claim, which was checked and holds) turns out to have quietly drifted. Worth a one-line mention to the parent for the same workstation-side wave-close that's already absorbing the `claude/README.md` drift — not a defect in this step's work.

### Assessment
**Step quality:** Approved
**Reasoning:** The "no edit" verdict is correct and independently reproducible — the file never cited a `global/` path in this repo, and the one claim that does depend on this repo's own surface (the CI lint invocation) was checked against the real file and holds. The judgment stayed inside the `examples/` fence and is recorded with real per-claim reasoning rather than a rubber-stamp. The only finding is a minor, out-of-scope drift note (9-vs-10 gotchas in workstation's own file) that predates this lane and isn't caused by it.
