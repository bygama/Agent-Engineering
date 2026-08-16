---
name: fixture
colors:
  paper: "#F6F4EF"
  ink: "#1E1B16"
  accent: "oklch(0.55 0.15 250)"
typography:
  display:
    fontFamily: "'Fraunces', serif"
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: 1rem
    lineHeight: 1.5
spacing:
  1: 4px
  2: 8px
rounded:
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "{spacing.2}"
---

## Overview

Fixture system.

## Decisions

### checkout

- 2026-07-30 — Back button top-left on every step.
