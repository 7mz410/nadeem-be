# nadeem.be

Static portfolio site for Nadeem Issaid — Generative AI & Creative Production Lead, Brussels.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies. Served
directly from this repository by GitHub Pages.

## Structure

```
index.html     the whole site (single page)
styles.css     design tokens and layout
main.js        clock, scroll reveals, count-ups, custom cursor
assets/        portrait, monogram, favicon
cv/            downloadable CV (PDF)
CNAME          custom domain
```

## Local development

```sh
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Design

Three colours only: ink `#0A0A0A`, paper `#FAFAFA`, and a wine accent `#8A4B6F`
(lightened to `#C58CA9` on dark backgrounds so it stays readable). The accent is
restricted to italic serif words, small marks, row numbers and hover states — the
contrast between black and white carries the design.

Type is Archivo Black for display, Instrument Serif Italic for accent words, Inter
for everything else.

## Accessibility

Single `h1` with correct heading order, skip link, visible focus rings, descriptive
`alt` text, semantic landmarks, and full `prefers-reduced-motion` support that stops
the marquee, reveals, count-ups and custom cursor.
