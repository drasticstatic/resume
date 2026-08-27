## User Preferences and Agent Guidance

Date: 2026-03-08

### Working Style Preferences Expressed by the User

- when there are multiple remaining tasks, do not pause after each one to ask whether to continue
- keep moving through the requested backlog unless blocked or unless a risky action requires permission
- be extensive in summaries and exports when asked
- focus on actual results and behavior, not only status descriptions

### Explicit Do / Don’t Guidance

- do not commit unless explicitly told to commit
- do not push unless explicitly told to push
- do not remove comments unless the associated code is removed
- clean up whitespace
- always leave one empty line at end of file
- run relevant tests/validation when changing functionality, using the smallest safe scope

### Repo-Specific Framing

- this repo is public
- the user is comfortable with broad public-facing documentation/export here
- the repo is not only a portfolio but also part of a public demonstration of what Augment can do

### Export-Specific Preferences from the Latest Request

- export everything reasonably known about the project/repo
- include what the user and agent have talked about
- include the task list so Augment Intent can inherit the same context
- do not hold back simply because the repo is public, as long as normal secret-safety rules are respected

### Practical Guidance for a Follow-On Agent

- if resuming product work, start with the still-open visible tasks
- if touching wallet code, validate behavior in-browser rather than relying only on static inspection
- check more than one page when changing shared nav/modal/connect logic
- inspect current workspace diffs before editing because the working tree is not clean

### Important Safety Baseline Still in Effect

Even with the user’s public-export approval, never include:

- `.env` contents
- private keys or seed phrases
- keystore data
- wallet secret files
- secret API credentials
