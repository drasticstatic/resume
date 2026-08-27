## Validation Matrix

Date: 2026-03-08

### Purpose

This file captures the minimum validation approach future agents should use for common classes of work in this repo.

### Export / Markdown / JSON Continuity Work

- validate by reading back the changed files
- confirm naming, reading order, and cross-references
- runtime tests are usually not needed for markdown-only or JSON-only export work

### HTML / CSS Layout Changes

- inspect the affected files directly
- check for obvious cross-page shared-style impact
- verify mobile/desktop assumptions as narrowly as possible

### Shared JavaScript Behavior Changes

- trace the affected call sites first
- validate the smallest impacted surface before assuming global safety
- pay extra attention to shared modal, navigation, and tooltip behavior

### Wallet / Web3 Changes

- validate cautiously because provider availability and environment matter
- distinguish real wallet behavior from demo or fallback behavior
- do not assume local `file://` behavior matches hosted behavior

### Content / Data Mapping Changes

- verify the content source and rendered destination both match the intent
- preserve detail when the user explicitly asks not to trim content

### Task / Handoff Updates

- keep task status aligned with on-disk reality
- update the delta log and canonical state when the bridge meaningfully changes

### General Rule

- prefer the smallest reliable validation step
- trust successful direct verification over assumptions
- if the change affects multiple shared pages, widen validation deliberately rather than accidentally
