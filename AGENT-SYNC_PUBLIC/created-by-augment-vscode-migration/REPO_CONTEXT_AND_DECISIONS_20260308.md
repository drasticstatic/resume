## Repo Context and Decisions

Date: 2026-03-08

### Repo Identity

- repository: `resume`
- visibility: public
- live site: `https://drasticstatic.github.io/resume/index.html`
- purpose: Christopher Wilson’s public resume / portfolio / personal site
- broader context: part of the wider DAppU / web3 ecosystem, but this repo itself is a frontend portfolio site

### Technical Reality of the Repo

Although `CLAUDE.md` describes this as a React portfolio site, the current working codebase is a multi-page static HTML/CSS/JavaScript site with shared scripts, shared stylesheets, CDN-delivered libraries, and modal-driven interactions.

This matters because follow-on agents should reason about the repo as it actually exists on disk rather than assuming a React component architecture.

### High-Level Site Structure

- root home page: `index.html`
- subpages in `pages/`: about, portfolio, blog, resources, contact, 404, glossary
- shared JavaScript in `js/`
- shared styling in `css/`
- content/data in `data/`
- imported source material in `imported data/`
- vendor libraries under `vendor/`
- repo and process notes spread across root markdown files and `AGENT-SYNC/`

### Functional Themes in the Site

- professional resume / timeline presentation
- portfolio projects and skills
- blog and long-form writing
- contemplative / spiritual resource content
- glossary / terminology education
- interactive effects and visual theming
- Web3 wallet / donate-modal / social-login experimentation

### Important Decisions Reflected in Recent Work

- the donate modal became the main user-facing Web3 social-login entry point
- the wallet modal kept a lighter explanatory / navigation role for Web3Auth
- connected-state UX was simplified so the top-right button itself carries more status responsibility
- dynamic tooltip support became necessary because some content is injected after initial DOM load
- gas-price loading should work even without injected wallet availability
- broad public-facing export files are acceptable in this repo because the user explicitly wants the repo to showcase Augment capabilities

### Important Constraints

- do not commit automatically
- do not expose secrets or wallet/private-key material
- do not remove comments unless their associated code is removed
- clean whitespace
- leave one empty line at end of files
- keep AGENT-SYNC/internal coordination details out of public-facing site content

### Reference / Governance Files

- `CLAUDE.md`
- `.gitignore`
- `.augmentignore`
- `AGENT-SYNC/CROSS_REPO_RULES.md`
- `AGENT-SYNC/POINTER.md`
- `specs/KAVANAH_INTENT_SPEC.md`

### Notable Repo Artifacts Outside Main Code Paths

The root contains multiple status/progress markdown files such as:

- `COMPLETE_FIXES.md`
- `CONTENT_EXTRACTED.md`
- `FINAL_STATUS.md`
- `FIXES_COMPLETE.md`
- `IMPLEMENTATION_SUMMARY.md`
- `PROGRESS.md`
- `READY_FOR_GITHUB.md`
- `UPDATES.md`
- `URGENT_FIXES.md`

These likely reflect earlier waves of work and may contain useful historical context, though they were not the primary source of truth for this export.

### Current Working Assumptions for Future Agents

- shared page patterns exist across `index.html` and `pages/*.html`
- many UX issues were fixed by editing the shared JS/CSS rather than page-specific logic alone
- wallet-related work is concentrated in a small set of hot files
- page behavior can differ slightly by relative paths, so each page should be checked when changing shared scripts

### Known Caveats

- the workspace is not currently clean
- some recent wallet/Web3 improvements were not re-validated in browser as part of this export-only task
- provider-specific Web3Auth behavior may still need explicit confirmation
- some repo instructions describe idealized architecture/history rather than the exact current code layout

### Open Questions Worth Carrying Forward

- what exact scope is intended for multi-chain support?
- should skills planets use SweetAlerts, custom modals, or another UI pattern?
- should future exports in this repo remain broad and public-facing by default?

### Best Starting Files for Future Product Work

- `js/modal.js`
- `js/wallet-connect.js`
- `js/effects.js`
- `js/blog.js`
- `js/resume.js`
- `css/navigation.css`
- `css/modal.css`
- `css/resume.css`
- `pages/about.html`
- `pages/resources.html`
- `pages/portfolio.html`
