## Architecture and File Map

Date: 2026-03-08

### High-Level Architecture

This is a static multi-page site built from HTML pages, shared CSS, shared JavaScript, and a small amount of JSON-backed content. Much of the behavior is modal-driven and enhanced with animations/effects.

### Main Pages

- `index.html` — homepage, hero, navigation, insights, top-right wallet button, modal entry points
- `pages/about.html` — about/profile page, teaching/manifesto/modal-related content
- `pages/portfolio.html` — projects, skills, glossary-linked tags, network/effects scripts
- `pages/blog.html` — blog listing and blog modal entry points
- `pages/resources.html` — resource content, contemplative resources, glossary-adjacent content
- `pages/contact.html` — contact CTAs and related page-specific interactions
- `pages/glossary.html` — redesigned glossary page with search/filter/collapsible behavior
- `pages/404.html` — styled lost page using shared UX patterns

### Major JavaScript Files

- `js/modal.js`
  - central modal generation/opening behavior, including donate modal content and related flows
- `js/wallet-connect.js`
  - wallet connection logic, connect/disconnect state, gas data, Web3Auth-related behavior, network display
- `js/effects.js`
  - tooltip behavior and other DOM effects, including support for dynamically added modal content
- `js/blog.js`
  - blog-post data loading/opening and modal rendering for full post content
- `js/resume.js`
  - glossary helpers, card toggles, page-init behavior for tags and interactive resume content
- `js/glossary.js`
  - glossary page logic and interactions
- `js/resources.js`
  - resources-page-specific content behavior
- `js/network-3d.js`
  - 3D mycelial/network visual effect
- `js/hero-svg.js`
  - page hero imagery helpers/effects
- `js/hero-effects.js`, `js/spore-effects.js`, `js/solidity-rain.js`, `js/web3-effects.js`
  - visual polish/effects layer
- `js/contact.js`
  - contact-page interactions
- `js/portfolio-loader.js`
  - loads/generates portfolio content from JSON in contexts that use it

### Major CSS Files

- `css/resume.css`
  - primary site styling, layout, page-level presentation
- `css/modal.css`
  - modal layout and modal-specific styling
- `css/navigation.css`
  - nav/connect button/hamburger/status styling
- `css/psychedelic.css`
  - special visual styling, including styles that have overridden other layout expectations in the past
- `css/effects.css`
  - effect-specific styling
- `css/hero-fixes.css`
  - hero adjustments and visibility fixes

### Data / Content Files

- `data/blog-posts.json`
  - blog content source / fallback source
- `data/portfolio-data.json`
  - portfolio project/skill data source
- `imported data/*.json`, `imported data/*.md`, PDFs
  - source material used to enrich the site over prior waves

### Docs / Project Notes in Repo Root

- `README.md`
- `UPDATES.md`
- `COMPLETE_FIXES.md`
- `FIXES_COMPLETE.md`
- `IMPLEMENTATION_SUMMARY.md`
- `FINAL_STATUS.md`
- `PROGRESS.md`
- `READY_FOR_GITHUB.md`
- `CONTENT_EXTRACTED.md`
- `URGENT_FIXES.md`

### AGENT / Coordination Files

- `AGENT-SYNC/CROSS_REPO_RULES.md`
- `AGENT-SYNC/POINTER.md`
- `specs/KAVANAH_INTENT_SPEC.md`
- `AGENT-SYNC/VSCode/Augment/*`

### Common Change Hot Spots

If future work involves:

- wallet, donate modal, Web3Auth, gas, status sync
  - start in `js/modal.js`, `js/wallet-connect.js`, `css/navigation.css`
- tooltip issues
  - start in `js/effects.js` and modal-generated markup
- blog/open post issues
  - start in `js/blog.js`, `data/blog-posts.json`, and blog page markup
- glossary/tag issues
  - start in `js/glossary.js`, `js/resume.js`, and glossary page markup
- mobile visual/layout issues
  - start in `css/resume.css`, `css/navigation.css`, `css/psychedelic.css`, `css/hero-fixes.css`

### Architectural Caveat

Because the site is multi-page and path-sensitive, shared JS/CSS changes should be checked on more than one page before assuming they behave consistently everywhere.