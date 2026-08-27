## File Priority and Ownership Guide

Date: 2026-03-08

### Purpose

This is not an administrative ownership map. It is a practical guide to which files usually matter first for each type of work.

### AGENT-SYNC / Continuity Work

Start in:

- `AGENT-SYNC/VSCode/Augment/MASTER_INDEX_AND_MANIFEST_20260308.md`
- `AGENT-SYNC/VSCode/Augment/CANONICAL_PROJECT_STATE.json`
- `AGENT-SYNC/VSCode/Augment/SESSION_DELTA_LOG_20260308.md`
- `AGENT-SYNC/VSCode/Augment/CROSS_WORKSPACE_EXPORT_PROMPT_TEMPLATE_20260308.md`

### Modal Behavior

Start in:

- `js/modal.js`
- `css/modal.css`
- affected page markup in `index.html` or `pages/*.html`

### Wallet / Web3 UX

Start in:

- `js/wallet-connect.js`
- `js/effects.js`
- donate/connect modal markup in relevant pages

### Blog Content / Modal Reading Flow

Start in:

- `js/blog.js`
- `pages/blog.html`
- any shared modal helpers used by blog content

### Glossary / Learning Path Interactions

Start in:

- `js/glossary.js`
- `pages/glossary.html`
- page sections containing glossary-linked pill tags

### Resources / Guided Content

Start in:

- `js/resources.js`
- `pages/resources.html`

### Shared Navigation / Layout / Cross-Page Styling

Start in:

- `css/navigation.css`
- shared page navigation markup
- `css/resume.css`
- `css/psychedelic.css`

### Visual Effects / Tooltips / Network Effects

Start in:

- `js/effects.js`
- `js/network-3d.js`

### Working Rule

Before editing, confirm the real call site or style owner in the codebase. This guide is a starting map, not a substitute for reading the relevant files.
