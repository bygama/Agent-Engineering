---
name: modes-fixture
colors:
  paper: "#F6F4EF"
  ink: "#1E1B16"
  accent: "#2456A6"
modes:
  dark:
    selector: ':root[data-theme="dark"], :root[data-theme="mixto"] [data-chrome]'
    colors:
      paper: "#191714"
      ink: "#ECE8E1"
---

## Overview

Fixture with a dark mode scoped to two selectors (dark, and mixto's chrome).

## Decisions

### shell

- 2026-07-30 — Mixto is dark scoped to the chrome, not a third palette.
