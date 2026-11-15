# Shruti Gautam — Portfolio

Personal portfolio built with **React + Vite**, animated with **GSAP / ScrollTrigger** and **Lenis** smooth scrolling.

## Design concept — "The Working Draft"

The site is styled like a living document printed on cream stock: deep oxblood blocks instead of black, marigold
highlights, and crimson / blush-pink handwritten notes. Sections are numbered like a specification (§ 01, § 02 …).

| Token | Value | Use |
| --- | --- | --- |
| Oxblood | `#3b0f18` | Dark sections, borders, strokes |
| Cream | `#f5eee3` / `#f3e1d8` | Light sections / blush-tinted GitHub section |
| Text | `#1e1412` | Reading text on cream |
| Marigold | `#f4a51c` | Buttons (oxblood text), highlights on dark, the EventVerse section |
| Crimson | `#a3202f` | Accent text and pen notes on cream |
| Blush | `#f3b6c2` | Pen notes on dark, status dots, picked seats |
| Grey | `#6b5a52` / `#cfb0ac` | Secondary text on cream / on oxblood |

Type: **Archivo** (expanded, heavy) for display, **Newsreader italic** for accents, **Geist** for body text, **Geist Mono** for labels.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Editing content

All content lives in `src/data/` — you shouldn't need to touch components to update the site.

| File | What's inside |
| --- | --- |
| `src/data/site.js` | Name, intro, links, email, photo, interests, about highlights |
| `src/data/projects.js` | Featured projects and the expandable "More experiments" archive |
| `src/data/skills.js` | Toolkit groups and each item's status (`use` / `learning` / `exploring`) |
| `src/data/journey.js` | Learning-journey timeline — add internships, hackathons, certifications here |

### Placeholders waiting for real info

- **Certification names** — list them in the Microsoft certifications entry in `src/data/journey.js`.
- **EcoTrack links** — it isn't on GitHub yet; once it is, add `github` (and `live`) under its `links` in `src/data/projects.js`.
- **Journey** — the last entry (`open: true`) is an empty slot; add new milestones above it.

### Project screenshots

Real screenshots live in `public/shots/` and are referenced by each project's `shot` field:

| File | Source |
| --- | --- |
| `stocksphere.jpg` | Live site — shrutigautam27.github.io/StockSphereS |
| `mime-output.jpg` | MIME.ai repo (`backend/images/signs-rendered.png`), resized |
| `eventverse.jpg` | EventVerse running locally — Discover page |
| `ecotrack.jpg` | EcoTrack running locally with its built-in sample dataset — Analytics page |

To replace one, drop a new 1440×900 image in `public/shots/` with the same name. If a project has no `shot`, the
illustrated mockup (`mockup` field) is shown instead.

### Link-sharing preview

`public/og-image.jpg` (1200×630) is the image LinkedIn/WhatsApp/X show when the site is shared. The tags in
`index.html` point to `https://shrutigautam27.github.io/portfolio/og-image.jpg` — update them if the site is published
at a different address.

## Live data

The "In public" section loads your public repositories from the GitHub API in the browser (with a graceful fallback if the
API is rate-limited) and shows your contribution graph via ghchart.rshah.org. No numbers are hard-coded.

## Accessibility & motion

- `prefers-reduced-motion` disables smooth scrolling, scroll animations and the hero animation (a static frame is drawn).
- Content is never hidden if JavaScript fails — reveal start-states only apply once motion support is confirmed.
- Skip link, visible focus states, keyboard-trappable mobile menu (Esc to close), labelled icon links.

## Live site & deploying

Live at **https://shrutigautam27.github.io/portfolio/** (GitHub Pages, served from the `gh-pages` branch).

To publish changes:

```bash
git add -A && git commit -m "Describe the change" && git push
npm run deploy
```

The first two commands save the source on `main`; `npm run deploy` builds the site and publishes it. The live site
updates about a minute later. `vite.config.js` uses `base: './'`, so the build works from any path.
