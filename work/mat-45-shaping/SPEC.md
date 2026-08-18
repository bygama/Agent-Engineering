---
issue: MAT-45
---
# shaping — spec

<!-- Owner-written (work-plan direct mode: MAT-45's "Design CLOSED"
     block is the settled design — owner closed it 2026-08-18). -->

Done looks like: AE owns the design conversation. `skills/shaping`
turns a raw ask into an approved design through dialogue, then hands
it to work-plan design-first; superpowers' brainstorming is superseded
for daily use (ADR-006); ships as part of the 1.3.1 package (with the
dispatch templates; ADR-007 sizing — 1.4.0 stays reserved).

## 1. The skill (`skills/shaping/`)

Narrow — one job, the conversation that gives a raw idea its shape:

- **Input**: an ask with no settled design (work-plan's refusal case).
  The tier is CONSUMED from using-ae's triage — shaping never
  re-derives or re-classifies it (no spike/bounded/architectural
  ladder; one artifact set, never two).
- **The dialogue** (stolen from superpowers brainstorming, adapted):
  questions ONE at a time (multiple choice when possible); understand
  purpose, constraints, success criteria before proposing; then 2-3
  approaches with trade-offs, recommendation first; then the design in
  sections scaled to their complexity, confirming each section before
  the next; YAGNI ruthlessly.
- **The gate** (their HARD-GATE, kept verbatim in spirit): no
  implementation action of any kind until the owner approves the
  design — at EVERY size; what scales with simplicity is the artifact,
  never the approval.
- **Feasibility probes** ("can we even...?"): allowed as S-tier asks —
  probe, report the answer, keep nothing; never a lane, never kept
  code.
- **Terminal state**: hand the approved design to work-plan
  (design-first mode writes the lane SPEC → owner gate → PLAN).
  shaping itself writes NO artifact — the conversation is its output;
  no own folder, no spec files of its own, no visual companion.
- Red-flags table (adapted): "too simple to need a design" / "I'll
  start while they read it" / "the suite's chain says use its planner"
  (→ ADR-005/006).
- Body budget: house register like work-plan/work-run (~100-150
  lines); description = what + when, third person.

## 2. ADR-006 and the supersession

- **ADR-006 — AE owns the design dialogue**: revises
  `reference/skills.md`'s thinking-phases clause — brainstorming
  leaves the composable-examples list (TDD and systematic-debugging
  remain, pending MAT-46/47); superpowers' `brainstorming` joins the
  superseded list for daily use; superpowers stays installed as the
  no-AE-setup fallback only. Cites the friction evidence: work-plan's
  refusal path pointed at an external suite, contradicting the
  files-only adoption story.
- `reference/skills.md`: superseded list gains `brainstorming`
  (pointer gains ADR-006); the intro example list drops it.
- **work-plan** refusal reword: "point at brainstorming" becomes
  "invoke shaping" — its eval-05 scenario (c) changes FIRST.
- **using-ae**: map gains the shaping row (design phase); its entry
  eval gains the routing line first. Stays ≤80 lines.

## 3. Docs (same change, hard constraint)

- README: "The nine skills" → ten; shaping row + the chain updates
  (shaping → work-plan → work-run → work-verify → work-handoff) in
  paragraph and mermaid; the adoption section's "thinking suite"
  phrasing updated where it implies brainstorming is borrowed.
- `docs/how-it-works/work-lifecycle.md`: the "how the plan comes to
  exist" passage gains where the DESIGN comes from (shaping, one
  sentence-paragraph, ADR-006 pointer).
- `docs/how-it-works/standard-lifecycle.md`: skills-surface mention
  updated (ten skills, shaping in the chain).

## 4. Evals first (≥4)

- eval-01 dialogue shape: raw ask → one question at a time, 2-3
  approaches with recommendation, sectioned design with per-section
  confirmation; no implementation before approval.
- eval-02 tier consumption + gate: never re-triages (uses using-ae's
  tier); the approval gate holds even for a "trivial" ask; feasibility
  probe → S-tier probe + report, nothing kept.
- eval-03 supersession + fallback: superpowers chain pointing at its
  brainstorming → shaping runs instead, citing ADR-006; environments
  without AE setup → superpowers fallback acknowledged, never both at
  once.
- eval-04 terminal handoff: approved design → invokes work-plan
  design-first (never writes SPEC/PLAN itself, never its own folder).

## 5. DoD (L)

feature_list.json rows gate on their own commands; four gates exit 0;
fresh-context whole-lane review; release ritual ships the 1.3.1
package (templates + shaping; ADR-007: owner-designated small);
1.4.0 untouched.
