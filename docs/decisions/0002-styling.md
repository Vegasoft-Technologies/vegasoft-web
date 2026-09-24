# 0002. Styling

**Status:** accepted, 2026-09-24

## Context

The site has a brand: the logo's navy, blue and grey, and two typefaces, Archivo for
headings and IBM Plex Sans for text. The design was approved as a single page of plain
CSS before any component was written.

Utility frameworks, component kits and CSS-in-JS libraries all come with defaults: a
type scale, a spacing scale, a palette, a set of radii and shadows. Those defaults are
why so many sites look alike. Overriding them costs more than not having them.

## Decision

Design tokens are CSS custom properties on `:root` in `src/styles/tokens.css`. Element
defaults are in `src/styles/base.css`. Every other style lives in a CSS Module beside the
component that uses it.

No Tailwind, no component kit and no CSS-in-JS. No icon or animation library.

## Consequences

- The look comes from the brand, not from a kit. Changing a colour or a typeface means
  changing one token.
- CSS Modules are supported by Next.js without configuration and add no runtime.
- There is no utility vocabulary to learn, and no build step for the styles beyond what
  Next.js already does.
- Some things a kit would give for free, such as a mobile menu or a form control, will be
  written by hand when they are needed. For a site this size that is a small cost.
- The two breakpoints, 720px and 1024px, and the rule that no literal colour appears
  outside `tokens.css`, are conventions rather than something the tooling enforces. A
  review has to catch a breach.
