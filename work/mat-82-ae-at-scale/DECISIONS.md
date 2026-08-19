<!-- First read of every session. If it isn't here, it didn't happen. -->
# AE at scale — decisions

<!-- Append-only: date — choice — why. -->
- 2026-08-18 — SPEC.md approved by the parent (blocking ask), with four
  rulings: (1) no agent-lint change for feature A — the lint already
  applies the ≤30 budget to every non-root AGENTS.md at any depth
  (walk + line ~95); (2) global/CLAUDE.md browser bullet may be reworked
  ONLY if the file stays ≤40 raw lines, `wc -l` verified BEFORE
  committing, else global stays untouched and the criterion lives in
  orca.md alone; (3) ae-init eval-05 extension + new eval-06 commit
  BEFORE SKILL.md content; (4) how-it-works chapter mapping approved:
  standard-lifecycle (A, C), execution (B), work-lifecycle +
  integrations (C respect rule). — The parent verified (1) against the
  lint source itself; recorded verbatim to bind every later step.
- 2026-08-18 — Ruling 5 (controller, resolved against the SPEC): eval-06
  grades creation of the missing INITIATIVE alongside the missing
  projects, under the same emit-for-operator fallback. — SPEC Feature C
  says "creates the missing Linear projects" literally, but the approved
  design puts the initiative at the root of a deep monorepo's
  declaration; leaving it dangling would break the respect rule's
  resolution the moment the declaration is written. Coherent completion,
  not new scope; surfaced to the parent in the final summary.
- 2026-08-18 — Ruling 6 (controller, resolved against the SPEC): the
  pre-built recommendation covers what the layout can derive (initiative
  name, per-domain projects); workspace and team key stay owner-supplied
  inside the same single question. — No layout yields a Linear team key;
  the SPEC's "team <KEY>" names the recommendation's shape, not an
  inference. One-answer approval preserved; eval-06 encodes this
  reading; surfaced to the parent in the final summary.
- 2026-08-18 — Ruling 7 (step-4 implementer, resolved against the SPEC and
  ADR-001), closing PROGRESS flag m13: the tracker plane recognizes TWO
  connectors — `orca linear` (primary) and a Linear MCP the session
  already carries — but the no-Orca contract is unchanged: without an Orca
  session there is no tracker write, whatever connector is present.
  — This grounds eval-06's "orca linear or the Linear MCP" while keeping
  the SPEC's own fallback trigger literal ("no-Orca or unresolvable
  binding ⇒ emit the exact operations") and leaving ADR-001 intact (the
  MCP/API fallback rung was deliberately removed there; reinstating it
  would amend an accepted ADR — its own change, not this lane's).
  `reference/orca.md` and `docs/how-it-works/execution.md` therefore stay
  untouched and non-contradictory. Binds step 5: ae-init emits the
  operations for the operator whenever the probe says no Orca, MCP present
  or not (eval-06 Run D passes under the stricter reading).
- 2026-08-18 — Ruling 8 (controller): PLAN step 8's "flip
  feature_list.json rows" clause is superseded — step 8 runs the four
  gates plus each row's verification command and records the outputs;
  the flip to `passing` happens only in work-verify, on its evidence.
  — work-run's own contract ("work-run never flips a row") outranks the
  PLAN wording the controller wrote before re-reading it; `passing` is
  irreversible, so it lands only with the lane gate's evidence.
- 2026-08-18 — Ruling 9 (controller): step 8 gets no separate step
  reviewer — its diff is PROGRESS-only evidence, and the immediately
  following work-verify lane gate re-runs every one of the same
  commands fresh. — A reviewer seat there would duplicate the gate at
  full cost with nothing left to judge; no other step skipped review.
- 2026-08-18 — Ruling 10 (controller, on the lane reviewer's one
  Important): `skills/ae-audit/references/checklist.md:59` (monorepo row
  still grading "per-app AGENTS.md per app") is NOT fixed in-lane — it
  sits outside the SPEC's declared surfaces AND the ticket names
  ae-audit's checklist as contested with the queued companion lane
  MAT-68 ("both may touch ae-audit's checklist"), so touching it here
  invites a cross-lane collision the parent sequenced away. Surfaced to
  the parent in worker_done for a filed follow-up; the reviewer's own
  triage agrees (follow-up ticket, not a lane re-open).
- 2026-08-18 — Ruling 11 (controller, handoff mode): the lane folder
  SURVIVES this handoff — no closing-removal commit. — This is a
  supervised child handing to its parent, not a terminal close: the
  worker_done report-path points at this lane's PROGRESS.md, and the
  parent's adversarial wave + capped fix loop may still land findings
  here. Terminal close (lane removal) is the parent's, at merge.
