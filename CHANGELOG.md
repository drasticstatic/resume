# Changelog

Notable changes to this site, most recent first. For older planning/status docs from this
project's original VSCode-extension-assisted build (Dec 2025), see [`archive/`](archive/).

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
