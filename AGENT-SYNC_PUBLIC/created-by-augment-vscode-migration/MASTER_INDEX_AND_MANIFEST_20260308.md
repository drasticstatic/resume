## Master Index and Manifest

Date: 2026-03-08

### Purpose

This is the dated master manifest for the repo-local Augment export package in `AGENT-SYNC/VSCode/Augment/`.

It serves as the authoritative inventory of export artifacts, their roles, and their relative fidelity.

### Package Intent

This package is designed to let Augment Intent or another future agent recover as much continuity as possible about:

- the repo
- the project state
- the conversation history accessible to this session
- the task backlog
- the user's working preferences

### Artifact Inventory

- `CANONICAL_PROJECT_STATE.json`
  - stable machine-readable current snapshot alias
  - type: machine-readable bridge state

- `CANONICAL_PROJECT_STATE_20260308.json`
  - dated machine-readable current-state snapshot
  - type: machine-readable bridge state

- `README.md`
  - human-friendly package index and reading order
  - type: navigation/index

- `NEXT_AGENT_START_HERE_20260308.md`
  - fastest human pickup guide
  - type: fast-start handoff

- `INTENT_COORDINATOR_SUMMARY_20260308.md`
  - concise coordinator-facing brief
  - type: executive summary

- `DECISION_LEDGER_20260308.md`
  - durable log of operating decisions and rationale
  - type: decision memory

- `KNOWN_RISKS_AND_GOTCHAS_20260308.md`
  - trap map and caveat inventory
  - type: risk/gotcha guide

- `SESSION_LOG_20260308.md`
  - broad narrative session/workstream history
  - type: narrative log
  - fidelity: high

- `SESSION_DELTA_LOG_20260308.md`
  - focused summary of what changed in the latest export-extension waves
  - type: delta/change log
  - fidelity: high

- `VERBATIM_CHAT_RECONSTRUCTION_20260308.md`
  - closest available quote-heavy conversation reconstruction
  - type: quote-preserving reconstruction
  - fidelity: mixed, highest where direct quotes survive

- `PRIOR_SESSION_HISTORY_RECONSTRUCTION_20260308.md`
  - reconstruction of earlier conversation eras before the current continuation session
  - type: prior-session historical reconstruction
  - fidelity: moderate-to-high from preserved summaries

- `SESSION_LOG_EXPORT_NOTES_20260308.md`
  - explains export boundaries and what "session logs" mean in this package
  - type: methodology/boundary note

- `TASKS_AND_FOLLOWUPS_20260308.md`
  - completed workstreams, open tasks, and likely next work
  - type: planning summary

- `FULL_TASKLIST_SNAPSHOT_20260308.md`
  - exact visible task-list snapshot
  - type: planning artifact
  - fidelity: exact snapshot

- `REPO_CONTEXT_AND_DECISIONS_20260308.md`
  - repo identity, architecture reality, decisions, constraints, caveats
  - type: project context

- `ARCHITECTURE_AND_FILE_MAP_20260308.md`
  - page map, JS/CSS map, hot spots, and technical orientation
  - type: technical map

- `USER_PREFERENCES_AND_AGENT_GUIDANCE_20260308.md`
  - inferred user preferences and working-style expectations
  - type: behavior/coordination guidance

- `FILE_PRIORITY_AND_OWNERSHIP_GUIDE_20260308.md`
  - practical map of likely edit starting points by work type
  - type: edit-orientation guide

- `VALIDATION_MATRIX_20260308.md`
  - minimum validation expectations by change type
  - type: validation guidance

- `PROMPT_RECIPES_FOR_THIS_REPO_20260308.md`
  - reusable prompt starters for common work modes in this repo
  - type: prompt cookbook

- `WORKSPACE_STATE_20260308.md`
  - git/worktree snapshot at export time
  - type: workspace-state artifact

- `CROSS_WORKSPACE_EXPORT_PROMPT_TEMPLATE_20260308.md`
  - reusable prompt/template for recreating this pattern in other workspaces
  - type: reusable tooling

### Recommended Consumption Order

1. `MASTER_INDEX_AND_MANIFEST_20260308.md`
2. `NEXT_AGENT_START_HERE_20260308.md`
3. `CANONICAL_PROJECT_STATE.json`
4. `INTENT_COORDINATOR_SUMMARY_20260308.md`
5. `DECISION_LEDGER_20260308.md`
6. `KNOWN_RISKS_AND_GOTCHAS_20260308.md`
7. `REPO_CONTEXT_AND_DECISIONS_20260308.md`
8. `SESSION_DELTA_LOG_20260308.md`
9. `SESSION_LOG_20260308.md`
10. `PRIOR_SESSION_HISTORY_RECONSTRUCTION_20260308.md`
11. `VERBATIM_CHAT_RECONSTRUCTION_20260308.md`
12. `SESSION_LOG_EXPORT_NOTES_20260308.md`
13. `TASKS_AND_FOLLOWUPS_20260308.md`
14. `FULL_TASKLIST_SNAPSHOT_20260308.md`
15. `ARCHITECTURE_AND_FILE_MAP_20260308.md`
16. `USER_PREFERENCES_AND_AGENT_GUIDANCE_20260308.md`
17. `FILE_PRIORITY_AND_OWNERSHIP_GUIDE_20260308.md`
18. `VALIDATION_MATRIX_20260308.md`
19. `PROMPT_RECIPES_FOR_THIS_REPO_20260308.md`
20. `WORKSPACE_STATE_20260308.md`
21. `CROSS_WORKSPACE_EXPORT_PROMPT_TEMPLATE_20260308.md`

### Fidelity Categories

- **Exact:** file contents from the repo, tasklist snapshots, git/workspace snapshots
- **High:** narrative summaries built from accessible direct history and observed repo state
- **Mixed:** quote-preserving reconstructions where some text is direct and some is reconstructed from summaries
- **Reconstructed:** prior-session history available only through preserved summaries

### Important Boundary Notes

- this package reflects only what the current session could actually access
- it does not prove access to hidden/raw Augment transcript storage
- interface histories remain siloed, so repo-local files are the cross-agent bridge

### Current Package Status

- export package present on disk
- broadened export completed
- near-verbatim and prior-session reconstructions added
- context bridge pack added with stable machine-readable state and fast-start guidance
- reusable cross-workspace prompt template added and refreshed
- no commit made as part of this export work
