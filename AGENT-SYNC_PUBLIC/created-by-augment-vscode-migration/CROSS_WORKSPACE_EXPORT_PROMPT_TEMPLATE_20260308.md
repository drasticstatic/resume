## Cross-Workspace Export Prompt Template

Date: 2026-03-08

### Purpose

Use this prompt when you want Augment in another workspace to export what it knows into repo-local files that a future chat, Augment Intent, or another agent can reuse.

### Before Using This Template

- replace bracketed placeholders
- declare whether the repo is `PUBLIC` or `PRIVATE`
- decide whether the export should be tracked or kept local-only
- if a new directory would be needed, instruct the agent to **ask first** whether it should be public, private, or gitignored

### Recommended Prompt

Copy/paste and customize the block below:

> I want you to export what this Augment workspace/chat knows into repo-local markdown files that another future chat, Augment Intent, or another agent can reuse.Repo visibility: [PUBLIC or PRIVATE]Desired export location: [existing directory path, or ask me before creating one]Storage preference: [tracked in git / local-only gitignored / decide after audit]Please do this in a structured, reusable way.Requirements:first audit whether the target export location already existsif it does not exist and a new directory is needed, ask me first whether it should be public, private, or gitignoredinspect repo-local privacy posture relevant to this export (.gitignore, .augmentignore, AGENT-SYNC conventions, and any repo instructions)if the export would be unsafe or ambiguous, suggest the minimal safer structure before writing filesdo not expose secrets, .env contents, private keys, seed phrases, wallet files, keystores, or API credentialsdo not copy private information across repo boundaries without explicit approvaldo not commit unless I explicitly ask you to commitExport as extensively as reasonably possible from what is actually available to the current session. Include both narrative and operational context.At minimum, create or refresh:a dated master index / manifest for the export packagea stable machine-readable canonical project state file (for example CANONICAL_PROJECT_STATE.json)a dated machine-readable project-state snapshota README.md index for the export packagea next-agent fast-start handoff filea coordinator-facing summary explaining what was exported and how to use ita decision ledgera known-risks / gotchas guidea session delta log for the latest work wavea session log / conversation history summarya near-verbatim transcript reconstruction if direct quotes are availablea prior-session history reconstruction if earlier conversation history is available via summaries or preserved contexta tasks-and-follow-ups summarya full visible tasklist snapshot if availablerepo context / decisions / constraintsarchitecture and file-map notesa file-priority / edit-starting-points guidea validation matrix by change typeuser preferences / agent guidance inferred from the conversationrepo-specific prompt recipes if usefulworkspace state / git status notes if usefulAlso include:key completed workstreamsopen tasks and validation gapsnotable files and where future edits should startimportant user instructions and working style preferencesan explicit note about limitations: the export can only reflect conversation history accessible to the current interface/sessiona clear distinction between exact snapshots, direct quotes, and reconstructed historya stable entry point another agent can read first without guessing the newest dated filenameIf this repo is PUBLIC:keep the export public-safe by defaultyou may include broad project and conversation context if it is already intended to be publicstill exclude secrets and any private cross-repo materialIf this repo is PRIVATE:you may be more detailed about internal implementation and process contextstill exclude secrets unless I explicitly instruct a secure storage pattern and it is truly necessarykeep cross-repo privacy boundaries intactWhen complete:make sure the manifest clearly lists every export artifact and its purposerefresh both the stable canonical state file and the dated snapshot if the bridge meaningfully changedupdate the export README.md with reading ordercreate a concise coordinator summary markdown explaining what you exported, how to use it, and any limits or privacy caveatsdo not stop halfway if the remaining export tasks are straightforward; continue until the requested export package is complete

### Why This Version Is Better

This template is stronger than a minimal export request because it explicitly asks for:

- repo visibility handling
- storage-mode handling
- privacy audit before writing
- layered outputs instead of one summary file
- a dated master manifest for easier handoff and auditing
- stable machine-readable state for predictable agent pickup
- fast-start, delta-log, decision-memory, and risk artifacts
- quote-preserving reconstruction when possible
- prior-session reconstruction when only summarized earlier history is available
- explicit limits about accessible versus inaccessible chat history
- coordinator-ready pickup instructions

### Optional Add-On

If you also want a reusable prompt file generated inside that repo for future sessions, append:

> Also create a reusable prompt-template markdown inside the export package that future agents can copy and adapt for this workspace.