# Theos — theos.design

Production build of the Theos digital headquarters, implemented from the
Claude Design handoff (`Theos Digital Headquarters Build-handoff.zip`).

Static site — no build step, no framework, no server-side code. Deployable
as-is to Netlify, Vercel, GitHub Pages, Cloudflare Pages or any static host.

## Pages

- `index.html` — main immersive page (WebGL hero, work rail, services, process, clients, Theos AI, audit, insights, presence, contact CTA)
- `work.html`, `services.html`, `about.html`, `origin.html`, `insights.html`, `contact.html`

## Structure

- `css/site.css` — all custom styling
- `js/` — page behaviors; `js/vendor/` holds three.js r158 and React 18.3.1 (production UMD), self-hosted so there is no CDN dependency
- `_ds/theos-design-system-…/` — design-system tokens and component bundle
- `assets/work/*.webp` — case-study imagery (extracted from the design-phase image slots)

## Local preview

Any static server from this directory, e.g.:

```sh
python3 -m http.server 4173
```

## AI features (companion + instant audit)

`js/companion.js` and `js/audit.js` currently ship with the curated canned
responses from the prototype: both check `window.claude && window.claude.complete`
and fall back when absent. To wire the real Claude API later, expose a
`window.claude.complete(prompt) → Promise<string>` shim backed by a small
serverless proxy holding the API key — no other code changes needed.

These two files were precompiled from JSX (Babel `preset-react`); the original
`.jsx` sources are in the handoff zip under `project/js/`.

## Removed from the prototype

- Design-tool drop-zone machinery in `image-slot.js` (replaced by a lean static renderer)
- The floating tweaks panel (`tweaks*.jsx`) — its defaults (ember glow 1, grain on, full motion) are baked in
- In-browser Babel and React development builds
