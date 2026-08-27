## Decision Ledger

Date: 2026-03-08

### Purpose

This file records the important operating decisions that shape how future agents should interpret and extend this repo-local context bridge.

### Decisions

#### D-001 — Public-facing export is allowed for this repo

- status: active
- decision: the user explicitly approved a broad public-facing export because this repo is public and is also intended to showcase what Augment can do
- impact: export artifacts can be extensive, but still must exclude secrets and private cross-repo data

#### D-002 — Repo-local files are the continuity bridge across Augment surfaces

- status: active
- decision: the practical substitute for a hidden shared context engine is a structured repo-local export package
- impact: future continuity should be preserved in `AGENT-SYNC/VSCode/Augment/` rather than assumed to persist in interface memory alone

#### D-003 — Architecture reality beats stale labeling

- status: active
- decision: despite some documentation referring to React, the actual project on disk is a static multi-page HTML/CSS/JS site
- impact: future edits should be planned against the real implementation, not older labels

#### D-004 — History artifacts must distinguish fidelity levels

- status: active
- decision: export artifacts should separate exact snapshots, direct quotes, and reconstructed history
- impact: future agents should not confuse narrative reconstruction with literal transcript certainty

#### D-005 — No commit or push without explicit permission

- status: active
- decision: meaningful local edits are allowed, but commits and pushes require explicit user approval
- impact: future agents should stop short of version-control publication unless asked

#### D-006 — Straightforward export work should continue without unnecessary pauses

- status: active
- decision: when the user requests a multi-part export package, continue through the straightforward remaining steps rather than pausing after each subpart
- impact: future export refreshes should be completed end-to-end where safe

#### D-007 — Visible product backlog remains relevant even during export work

- status: active
- decision: the main visible open product tasks remain `SweetAlerts for Skills Planets` and `Add Multi-Chain Support`
- impact: future product pickup should begin there unless the user reprioritizes

#### D-008 — Stable and dated canonical state should coexist

- status: active
- decision: the context bridge should include both a dated canonical snapshot and a stable current-path alias
- impact: future agents have both archival traceability and a predictable file to read first
