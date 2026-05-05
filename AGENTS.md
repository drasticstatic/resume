# AGENTS.md
> AI Agent Configuration — resume (portfolio site)
> Read by: Claude Code, Cursor, GitHub Copilot, and other AI coding assistants.
> See `CLAUDE.md` for Claude Code–specific rules.

---

## Project Overview

**resume** is Christopher Wilson's personal portfolio website — minister-technologist, CNC machinist, Web3 developer. Showcases the intersection of precision engineering, sacred technology, and decentralized systems.

**Live:** https://drasticstatic.github.io/resume/index.html
**Visibility:** PUBLIC — all content is publicly visible
**Primary builder:** Auggie (Augment CLI)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Inter (Google Fonts CDN) |
| Icons | Font Awesome |
| Hosting | GitHub Pages |
| No build step | Static files — deploy as-is |

---

## Common Commands

```bash
# No build required — edit HTML/CSS/JS directly and commit

# Preview locally
open index.html
# or: python3 -m http.server 8080

# Optimize images before committing
pngquant --force --quality=65-85 *.png
```

---

## Coding Standards

- Semantic HTML5, accessible design principles
- Mobile-first responsive CSS with Grid and Flexbox
- Custom CSS variables for consistent theming (do not hardcode colors inline)
- Vanilla JavaScript only — no jQuery or heavy frameworks
- All new pages follow the established nav/modal pattern

---

## Agent Boundaries

**Do:**
- Match the existing visual style and layout conventions
- Keep all content appropriate for professional/public display
- Ask before adding new pages or restructuring navigation

**Don't:**
- Include private financial data, legal matter details, or internal agent references
- Add external CDN dependencies without checking for integrity attributes
- Hardcode email addresses (use `mailto:` links)

---

## Security Rules

- **PUBLIC repo:** Every committed file is publicly visible — all content must be appropriate for public display
- No private financial information, custody details, or sensitive personal data
- If adding any third-party script: use Subresource Integrity (SRI) hashes

---

## Canonical References

- `CLAUDE.md` — Agent roles, scope boundaries, and session rules
- `AGENTS.md` (this file) — Universal AI agent config
- `README.md` — Project overview and site structure
