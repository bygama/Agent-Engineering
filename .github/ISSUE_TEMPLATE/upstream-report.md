---
name: Upstream report
about: A standard-fault finding from a repo that uses the standard — check false-positive, template bug, migration gap, or inefficiency
title: "upstream: <short summary>"
---

## Where it surfaced

<!-- The consuming repo (or "private repo" + stack) and its stamp line,
e.g. `Standard: AE/2.6`. -->

## Kind

<!-- One of: check false-positive · template bug · migration gap ·
inefficiency · other -->

## Evidence

<!-- The commands you ran and their output — e.g. the agent-lint finding
you believe is wrong, the template line that broke, the migration note
that didn't cover your case. -->

## Expected

<!-- What should have happened instead. -->

<!-- Note: issues are not worked from GitHub. This report gets triaged
into the maintainer's tracker (a comment will say "tracked as MAT-xx")
and the fix returns through the normal release flow — your repo picks it
up on its next agent-init migration. -->
