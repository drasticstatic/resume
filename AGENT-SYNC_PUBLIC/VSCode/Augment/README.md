## Augment VSCode / Intent Export Index

This directory is an intentionally broad export of what Augment currently knows about the `resume` repo from recent work, the accessible repo context, the task list, and the conversation history available in this session.

This is not just a minimal handoff. It is meant to help Augment Intent or another agent pick up the project with as much continuity as possible.

### Public Repo Context

This repository is public, and the user explicitly approved a broad public-facing export for showcase purposes.

- the repo is intended to be public
- the portfolio itself is public
- the user wants this repo to help showcase what Augment can do

Even so, normal secret-safety rules still apply. Nothing here should include `.env` contents, keys, seed phrases, wallet secrets, or truly private cross-repo material.

### Files in This Export

- `CANONICAL_PROJECT_STATE.json`
  - Stable machine-readable current snapshot for future agents to ingest first.
- `CANONICAL_PROJECT_STATE_20260308.json`
  - Dated machine-readable project-state snapshot for archival continuity.
- `MASTER_INDEX_AND_MANIFEST_20260308.md`
  - Dated master inventory of the export package, artifact roles, and fidelity notes.
- `NEXT_AGENT_START_HERE_20260308.md`
  - One-minute fast-start handoff for the next agent.
- `INTENT_COORDINATOR_SUMMARY_20260308.md`
  - High-level coordinator brief and recommended reading order.
- `DECISION_LEDGER_20260308.md`
  - Durable record of operating decisions and why they matter.
- `KNOWN_RISKS_AND_GOTCHAS_20260308.md`
  - Trap map for continuity limits, public-repo caveats, and technical gotchas.
- `SESSION_LOG_20260308.md`
  - Expanded conversation and session history covering what was discussed and changed.
- `SESSION_DELTA_LOG_20260308.md`
  - Focused summary of what changed during the latest export-extension waves.
- `VERBATIM_CHAT_RECONSTRUCTION_20260308.md`
  - Closest available quote-heavy reconstruction of the accessible conversation history.
- `PRIOR_SESSION_HISTORY_RECONSTRUCTION_20260308.md`
  - Dedicated reconstruction of the conversation/work history from before the current continuation session.
- `SESSION_LOG_EXPORT_NOTES_20260308.md`
  - What can and cannot be exported from this interface as a session log, plus reuse notes.
- `TASKS_AND_FOLLOWUPS_20260308.md`
  - Major completed workstreams, open tasks, follow-ups, and suggested next wave.
- `FULL_TASKLIST_SNAPSHOT_20260308.md`
  - Snapshot of the current Augment task list so Intent can inherit the same planning context.
- `REPO_CONTEXT_AND_DECISIONS_20260308.md`
  - Project identity, repo behavior, constraints, decisions, and caveats.
- `ARCHITECTURE_AND_FILE_MAP_20260308.md`
  - High-level page map, JS module map, CSS map, data sources, and likely edit hot spots.
- `USER_PREFERENCES_AND_AGENT_GUIDANCE_20260308.md`
  - User working style, repo-specific instructions, and agent guidance inferred from the conversation.
- `FILE_PRIORITY_AND_OWNERSHIP_GUIDE_20260308.md`
  - Practical map of where to start editing for each work type.
- `VALIDATION_MATRIX_20260308.md`
  - Minimum validation guidance by change category.
- `PROMPT_RECIPES_FOR_THIS_REPO_20260308.md`
  - Reusable prompt starters for common work modes in this repo.
- `WORKSPACE_STATE_20260308.md`
  - Current git/workspace state at export time.
- `CROSS_WORKSPACE_EXPORT_PROMPT_TEMPLATE_20260308.md`
  - Reusable prompt template for exporting Augment context in other public or private workspaces.

### Recommended Reading Order

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

### What This Export Tries to Capture

- what the repo is and how it is structured
- a stable machine-readable current project state
- what the user and agent have discussed
- what happened before the current continuation session
- what changed in the latest export-extension waves
- the decisions, risks, and validation rules future agents should inherit
- the closest available quote-preserving reconstruction of the conversation
- what was changed recently and why
- what tasks are complete versus still open
- how the repo behaves technically and organizationally
- how the user prefers work to be done
- what another agent should know before making the next change
- how to repeat a similar export in another workspace

### Scope Limitation

This export reflects what is known from:

- the repository on disk
- the visible task list
- the current conversation history available to this session

Some files are narrative summaries, `PRIOR_SESSION_HISTORY_RECONSTRUCTION_20260308.md` focuses on earlier-history recovery, and `VERBATIM_CHAT_RECONSTRUCTION_20260308.md` is the closest available quote-heavy reconstruction from the accessible history.

`CANONICAL_PROJECT_STATE.json` is the stable path intended to act as the most predictable machine-readable entry point for future agents.

The codebase itself remains the ultimate source of truth for implementation details.

