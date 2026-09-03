# CLAUDE.md — Persistent Instructions for Resume / Portfolio Site
### Christopher Wilson — Personal portfolio (GitHub Pages)

---

## Scope

This repo is **resume** — Christopher Wilson's personal portfolio site, live at https://drasticstatic.github.io/resume/index.html. Built with semantic HTML5, CSS3, and vanilla JS. It is a **PUBLIC** repository.

Agent roles for this repo:
- **Auggie (Augment CLI):** Primary builder — leads HTML/CSS/JS updates, design, and deployment
- **Kavanah (Augment Intent):** Coordinator/facilitator — keeps all agents in alignment. Identity is bound to the Intent workspace UI surface, not the model underneath.
- **Alfred (Claude Code CLI, native terminal):** Stands in for Auggie/Kavanah while Augment is on hiatus, native-terminal `dappu/`-worktree lane — see `~/code/anthropas-argus-alfred/sandbox/AGENT_IDENTITY_REFERENCE.md` for the full naming rationale.
- **Mystarch (Μυσταρχης — "Ruler of the Mysteries"):** Augment Intent's app-level Chief of Staff — sits above individual workspaces.
- **Fortuna (Claude Code CLI):** Belongs to the `trading-assistant` repo/persona; awareness-level only here, looped in when portfolio content intersects trading or broader life context.

---

## Security Rules (Non-Negotiable — All Repos)

- **Never read, display, or reference `.env` files** — in any repo
- **Never read private keys, seed phrases, wallet files, mnemonic files, or keystore files** regardless of filename
- **Never read or expose API key files** (service accounts, Google credentials, exchange keys, etc.)
- **Never commit secrets** — if git status shows a `.env`, credentials file, or wallet file staged, warn Christopher immediately and stop
- **PUBLIC repo warning:** This repo is publicly visible. All content must be appropriate for public display — never include private financial data, custody details, or internal agent references.

---

## Context Rules

- Cross-repo context and agent handoffs live in the **trading-assistant** hub repo under `AGENT-SYNC/`
- Memory files live in `~/.claude/projects/.../memory/` — MEMORY.md auto-loaded each session

---

## File & Directory Rules

- Always ask Christopher if a new section or page should be added before creating files
- Commit after every meaningful change — do not leave uncommitted work at session end
- **Keep `CHANGELOG.md` up to date as you work** — newest entry at the top, dated, one bullet per
  notable change. Do not wait until session end to write it up. See the summary section at the
  bottom of `CHANGELOG.md` for where the VSCode-era archive lives and how the current worktree
  setup came to be.

---

## Before Cloning or Installing Any External Repo / Package

Before running `git clone`, `npm install`, `pip install`, or adding any external dependency:
1. **Review `package.json` scripts** — flag any `postinstall`, `preinstall`, or `prepare` hooks that execute shell commands
2. **Scan for credential harvesting** — look for patterns accessing `~/.ssh`, `~/.aws`, `.env`, `process.env`, or system credential paths in unexpected files
3. **Verify provenance** — check GitHub repo age, star/fork count, recent commit activity, and maintainer identity
4. **Check for typosquatting** — verify package names exactly match the intended library (e.g. `lodash` not `1odash`)
5. **Audit unexpected network calls** — flag external HTTP requests in scripts, entrypoints, or install hooks
6. **When in doubt, ask Christopher before proceeding** with any install or clone

---

## Canonical References

When skills, specs, or task files exist for a topic — follow the logic there, not here. This file holds identity, pointers, and short rules only.

- **AGENTS.md** — root-level config for all AI agents (Claude Code, Cursor, Copilot)
- **AGENTS.override.md** — temporary task-specific overrides; delete when done (template: `~/code/my-template/AGENTS.override.md`)
- **Skills:** `.claude/skills/` — full procedure lives in the skill file; CLAUDE.md holds triggers only
- **Tasks:** `PENDING-TASKS.md` or `tasks.md` if present — active/completed task tracking
- **Agent handoffs:** `AGENT-SYNC/` (hub: `~/code/trading-assistant/`) — see `AGENT_SYNC.md` for current state
- **Memory:** `~/.claude/projects/.../memory/MEMORY.md` — auto-loaded; detail in topic files
- **Intent workspace ↔ local worktree map:** `~/code/anthropas-argus-alfred/sandbox/INTENT_WORKTREE_LEGEND.md` — maps Intent's randomly-slugged workspace dirs to actual repo paths, branches, and spec-note locations across all active workspaces
- **Agent identity map (Kavanah/Alfred/Fortuna/Mystarch, full epithets):** `~/code/anthropas-argus-alfred/sandbox/AGENT_IDENTITY_REFERENCE.md`

---

## Commit Convention

Reachable two ways — native terminal (`code/`/`dappu/`) and Augment Intent
(`intent/workspaces/...`). Which *application* launched the session decides the footer, not which
path — see `anthropas-argus-alfred/sandbox/AGENT_IDENTITY_REFERENCE.md` and
`INTENT_WORKTREE_LEGEND.md` for the full rule.

- Alfred-Anthropic: `Co-Authored-By: Alfred · ClaudeCodeCLI · Anthropic [Sonnet-5/Opus-#/Haiku-#]`
- Alfred-NIM: `Co-Authored-By: Alfred · ClaudeCodeCLI · NVIDIA NIM [model]`
- Kavanah-AugmentIntentUI-AuggieLogin: `Co-Authored-By: Kavanah · AugmentIntent · [model]`
- Kavanah-AugmentIntentUI-AnthropicLogin ("ClaudeMent"): `Co-Authored-By: Kavanah · ClaudeMent · Anthropic [model]`
- Kavanah-TerminalUI(macOS/Intent/VSCode standard terminal instance)-AnthropicLogin: `Co-Authored-By: Kavanah · ClaudeCodeCLI · Anthropic [model]`
- Mystarch (rare — app-level cross-workspace reach, this repo isn't its home): same engine options as Kavanah above, swap the agent name
