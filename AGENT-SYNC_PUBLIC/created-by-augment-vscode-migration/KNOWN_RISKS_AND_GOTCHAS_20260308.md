## Known Risks and Gotchas

Date: 2026-03-08

### Purpose

This file captures the main traps and caveats future agents should know before assuming continuity or editing product code.

### Risks and Gotchas

#### Hidden transcript access is not available

- do not claim access to hidden/raw Augment transcript storage unless it is actually exposed in the current session
- older "session logs" may need to be reconstructed from preserved summaries

#### Public repo does not relax secret-safety rules

- this repo is public, but secrets still must never be exported
- never include `.env` contents, private keys, seed phrases, wallet secrets, or API credentials

#### Docs and implementation are not perfectly aligned

- some docs refer to React
- the actual implementation is a static HTML/CSS/JS site

#### Shared JS/CSS can have multi-page side effects

- changes in shared scripts or styles can affect multiple pages at once
- validate cross-page behavior when changing navigation, modals, tooltips, or wallet UX

#### Wallet behavior can differ by environment

- earlier work noted issues tied to `file://` and local wallet detection expectations
- wallet/UI validation should be cautious and explicit

#### Some artifacts are exact and some are reconstructed

- `FULL_TASKLIST_SNAPSHOT_20260308.md` is an exact visible snapshot
- prior-session and narrative files are reconstructions to varying degrees

#### Working tree context can matter

- do not assume a perfectly clean working tree
- inspect current diffs before deeper product edits

#### Open backlog should not be mistaken for completion

- a large amount of backlog work is already complete
- the remaining visible product tasks are still `SweetAlerts for Skills Planets` and `Add Multi-Chain Support`