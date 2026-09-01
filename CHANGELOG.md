# Changelog

Notable changes to this site, most recent first. For older planning/status docs from this
project's original VSCode-extension-assisted build (Dec 2025), see [`archive/`](archive/). For
the fuller story of how this project moved from that VSCode workflow into Augment Intent's
workspace/spec framework, and how the two parallel git worktrees (`dappu/resume` live clone and
this Intent workspace clone) were reconciled back into one, see the summary at the bottom of this
file.

## 2026-09-01

- The footer redesign (2026-08-30) accidentally stripped the Gravatar icon from the top navbar
  on every page too, not just the footer it was meant to replace — restored it after the GitHub
  icon.
- The conversation-starter modal's phrase carousel was fading its whole button/info area to
  `opacity: 0` and back on every phrase change, which could hide a button a visitor was reaching
  for. Now only the title/subtitle text retypes each cycle; the buttons/info area fades in once
  and stays put.
- Added play/pause/back/forward controls to the conversation-starter modal so visitors can control
  the phrase carousel instead of only watching it auto-advance. Replaced the old one-shot recursive
  cycling function with a `window.conversationCycler` object that tracks index/paused state
  explicitly. This surfaced a latent bug: `contact.js` had its own dead, unreferenced
  `startConversation()` plus a duplicate `typeText()` that — loading after `modal.js` on
  `contact.html` — silently shadowed the real one, so removed both as dead code.

## 2026-08-30

- Fixed the homepage's "Write to Me" button navigating to the top of the Contact page instead of
  the actual form — it shared a `scrollToForm()` with the Contact page's own modal, but had no
  `#contactForm` element on the homepage to scroll to, so it now appends the anchor to the
  redirect URL.
- Footer's "Connect" section (LinkedIn/GitHub/Gravatar icons) was a duplicate of the navbar's own
  social links, so replaced it site-wide with a single "Start a Conversation" button matching the
  donate/lost-page button style. The Gravatar link removed from the footer now lives inside the
  conversation-starter modal alongside email/phone/LinkedIn/GitHub.
- The conversation-starter modal's greeting/subtitle used to pick one random phrase pair and stop;
  it now shuffles and loops through the full suite while the modal stays open, so a one-time
  visitor sees the whole set instead of just whichever pair got picked.
- Restored the Contact page's original conversation-starter modal (it had been unintentionally
  replaced by the homepage's version during an earlier merge) while folding in any homepage-only
  content the original didn't have.
- Contact modal phone number updated site-wide to the current number.
- Fixed the donate modal not opening on the Glossary page — it was the only page missing the
  `<div id="modal">` container every other page has after its footer, so `modal.js` was silently
  no-op'ing on click.

## 2026-08-25

- Fixed a real CSS bug on the About page's Professional Journey timeline: even-position cards
  used `margin-left: calc(50% + 10px)` while odd-position cards reached their 30px gap from the
  meridian via width alone — the two math paths weren't mirrored, landing even-side nodes 20px
  short of center. Corrected so both sides sit exactly ~30px from the meridian.
- Homepage timeline markers were half-overlapping card content by design; pushed them fully into
  the gutter so they never sit on top of text.
- About page's Professional Journey reordered chronologically by start date, with a generalized
  "Full-Stack Blockchain Developer" role (Ethereal Offering called out as the MVP highlight rather
  than the sole scope), Jones Manufacturing given an end date, and a new Trader entry added.
- Portfolio page: every "Code" link that pointed at a private source repo now points at its public
  mirror instead (private repos aren't visitor-accessible); missing Details buttons and repo-code
  buttons added across several cards; the DappU coursework gallery's buttons moved into a
  right-hand column instead of wrapping under longer entries.
- Unified the two competing "Start a Conversation" modals into one, combining the homepage's
  structured contact info with the playful typing-effect reveal from the Contact page's version.
- Section spacing increased slightly for more breathing room between sections and restored side
  margins on wide viewports.
- Root-level legacy planning docs from the project's original build moved into `archive/`; stray
  `.bak`/`.bak2` files removed.

## 2026-08-24

- Expanded the portfolio page into a full categorized build-log: MVP Web3 Capstone, Major Roles,
  a two-row Web Builds section, Trading Infrastructure folded into Web Builds, and Ecosystem
  Tooling & Templates merged with Security Awareness into "Public Scaffolding & Hardened
  Utilities."
- Homepage hero rebuilt around a 5-role title (Sound Engineer/Musician, CNC Machinist/CAM
  Programmer, Full-Stack Web Developer/Blockchain Builder, Ordained Minister, Trader), each role
  in its own color.
- Root-caused and consolidated a timeline CSS bug where three separate stylesheets (`modal.css`,
  `psychedelic.css`, `navigation.css`) each defined conflicting `.timeline-item`/`.timeline-marker`
  rules for the same selectors — cards were visually overlapping the meridian line as a result.
- Cut the global `.section` rule's forced 850px min-height and 110px padding, the main source of
  excess vertical whitespace sitewide.
- Added a GitHub Sponsors button to the donate modal.

## 2026-08-23

- Expanded the portfolio page for the first time beyond its original 4 flagship project cards,
  adding categorized sections covering web3/blockchain work, full-stack web builds, trading
  infrastructure, and ecosystem tooling — web3 shown first throughout.
- Verified every new link resolves to a real public URL (public-preview mirrors, public repos, or
  live GitHub Pages) rather than a private, visitor-inaccessible source repo.

---

## Origin: VSCode → Intent transition and worktree reconciliation

This changelog starts here because it marks a real transition in how this project gets built.

The site's original build (through Dec 2025) happened in a VSCode-extension-assisted workflow —
Augment CLI ("Auggie") working directly against a single local clone. Planning docs, session logs,
and canonical-state snapshots from that era are archived rather than deleted:

- [`archive/`](archive/) — root-level legacy planning docs and session artifacts from the original
  VSCode-era build.
- [`AGENT-SYNC_PUBLIC/archive-legacy-planning-docs/`](AGENT-SYNC_PUBLIC/archive-legacy-planning-docs/)
  — a second archive fold-in, plus [`AGENT-SYNC_PUBLIC/created-by-augment-vscode-migration/`](AGENT-SYNC_PUBLIC/created-by-augment-vscode-migration/)
  for the VSCode-to-migration session record itself.

Starting around Aug 2026, work shifted into Augment Intent's workspace/spec framework, which
spins up its own isolated git clone per workspace rather than operating on the one canonical
checkout. That created two live worktrees for this same GitHub repo:

- `/Users/christopherwilson/dappu/resume` — the original clone, kept in sync with `origin/main`
  and treated as the live/deployed source of truth for GitHub Pages.
- `/Users/christopherwilson/intent/workspaces/specs-sync/resume` (this clone) — the Intent
  workspace's own checkout, branch `ground-repo-context`, used for the spec-driven coordination
  work described in [`specs/KAVANAH_INTENT_SPEC.md`](specs/KAVANAH_INTENT_SPEC.md).

The two diverged as real, independently-useful edits landed on each side. Reconciling them was a
deliberate, conflict-by-conflict merge (not a discard-one-side reset): the Intent clone's commits
were merged into a scratch branch on the live `dappu/resume` clone, the ~14 overlapping files were
resolved keeping both sides' improvements, the `AGENT-SYNC_PUBLIC/` coordination trail was
restructured and folded in alongside the archived docs, and the result was fast-forwarded into
`main` and pushed to `origin/main` — all after Christopher reviewed and approved each step. Both
worktrees were then synced back against `origin/main` so neither carries unique unpushed history.
`specs/KAVANAH_INTENT_SPEC.md` has the full session-by-session account of that process for anyone
who wants the detailed handoff rather than this summary.
