# AGENT-SYNC_PUBLIC

This directory is a **public, curated coordination and handoff trail** for the `resume` repo, kept here for teaching and learning purposes — it shows how multiple AI coding agents (Claude Code, Augment/Auggie, Augment Intent/Kavanah) coordinate on a shared codebase over time.

It is deliberately transparent about *process*: decisions made, context handed off between agents, session notes, and role boundaries. Normal secret-safety rules still apply throughout — nothing here should ever contain `.env` contents, private keys, seed phrases, wallet secrets, or API credentials.

This is **distinct from** the private `AGENT-SYNC/` hub in the `trading-assistant` repo, which holds internal cross-repo coordination data not intended for public viewing. See `POINTER.md` in this directory for how the two relate.

## Layout

- `created-by-augment-vscode-migration/` — export package from the Augment VS Code extension session (session logs, decision ledger, architecture notes, canonical project state snapshots). These are dated snapshots from 2026-03-08 and are left as-is, including any references to the directory's earlier path, as an accurate historical record.
- `created-by-alfred/` — handoffs from Alfred (ClaudeCodeCLI, primary lead on this repo going forward)
- `created-by-christopher/` — notes placed directly by Christopher
- `archive-legacy-planning-docs/` — copy of the repo's `archive/` legacy planning docs, mirrored here for a single browsable coordination trail (the original `archive/` directory is untouched)

Convention: files live in the **creator's** subdirectory, named descriptively. Don't add content to another contributor's subdirectory.
