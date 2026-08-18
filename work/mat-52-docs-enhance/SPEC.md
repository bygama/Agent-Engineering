---
issue: MAT-52
---
# README + how-it-works enhance — spec

<!-- Owner-written (work-plan direct mode: the owner's ask is the spec;
     MAT-52 + MAT-51 descriptions carry the direction). -->

Done looks like: the README documents how AE is used — including
adoption by a third party with no dependency on the owner's machine
layer (MAT-51) — and every `docs/how-it-works/` chapter reads as a
finished explanation: diagrams placed exactly where the prose needs
them, each diagram explained (what to SEE in it), current names
throughout, coherent narrative after a day of piecemeal accretion.

## Quality bar (binds every step)

- **Diagram placement**: a diagram sits immediately with the prose that
  discusses it — never orphaned at a section top, never after prose
  that already moved on.
- **Diagram explanation**: the surrounding prose says what the reader
  should SEE (the mechanism, the asymmetry, the gate) — never a caption
  restating the title. A diagram nothing points at gets prose or gets
  cut.
- **Diagram content**: mechanism/topology only; house rule bans
  folder-structure diagrams. Mermaid, consistent style, current names
  (work-run, ae-init, ae-audit, using-ae, work-plan — post-1.3.0).
- **Truth**: nothing unshipped documented (no work-design, no dispatch
  templates); provenance-note convention preserved; records untouched.
- **Coherence**: each chapter reads top-to-bottom as one narrative, not
  as accreted patches; the how-it-works README index rows match what
  chapters actually cover.

## The steps' scope

- README.md: full pass — flow of sections, accuracy post-1.3.0, the
  nine-skills chain, and the NEW section "Adopting AE on your own
  machine" (MAT-51): nothing needed but the files; three ways to get
  the skills (clone + point the runner / copy into the runner's skills
  dir / junction-symlink equivalent); the SessionStart injection is
  OPTIONAL (using-ae triggers by description without it), with a
  pointer to the canonical snippet; workstation named as the owner's
  reference implementation of the machine layer, never a dependency.
- global/hooks/README.md (new, small): what the two hooks do, and the
  canonical SessionStart wiring snippet (the ${CLAUDE_HOME}-style
  settings entry, plus the plain-settings.json equivalent for
  non-workstation machines).
- docs/how-it-works/README.md + architecture.md: index rows truthful;
  architecture chapter diagrams placed/explained; the nine skills and
  the ADR-004/005 decisions reflected where the chapter discusses
  skills/decisions.
- docs/how-it-works/work-lifecycle.md: the biggest accretion surface —
  the work-plan and work-run passages woven into the narrative (not
  bolted on), diagrams re-placed/explained per the bar.
- docs/how-it-works/execution.md: same pass; the pairing (work-run
  within a lane / fan-out across lanes) explained at its diagram.
- docs/how-it-works/standard-lifecycle.md + integrations.md: same pass;
  standard-lifecycle covers the skills surface incl. using-ae entry.

## DoD

Four gates exit 0; docs-sweep battery re-run clean over the touched
files; every mermaid block renders (```mermaid fences balanced, no
syntax errors — verifiable by a mermaid parse or careful review);
fresh-context review of the whole diff. Docs-only: no version bump.
