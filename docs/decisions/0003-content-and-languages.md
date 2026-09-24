# 0003. Content and languages

**Status:** accepted, 2026-09-24

## Context

The site will exist in English and in Turkish. Both versions have the same structure,
but the copy is written, not translated word for word, so string-for-string lookup tables
are the wrong shape. The English version is built first; the Turkish version follows.

An `<html lang>` attribute has to be right for screen readers, hyphenation and search
engines, and a single root layout can only set it once.

## Decision

Copy lives in typed modules in `src/content/`, with English in `src/content/en/` and
Turkish, later, in its own files. Components import the module and render it. There is
no i18n library and no translation function.

There are two root layouts: `app/(en)` now, and `app/(tr)/tr` later, so each language
tree sets its own `<html lang>`.

Because there is no single root layout, addresses that match no route are answered by
`app/global-not-found.tsx`, which in Next.js 16.3 needs `experimental.globalNotFound` in
`next.config.ts`.

## Consequences

- Copy is checked by TypeScript: a missing field is a build error, not a blank on the
  page.
- Tests can read the copy directly. `src/content/style.test.ts` enforces the writing
  rules on every string.
- The Turkish version is a second set of files and a second layout, not a set of
  conditionals in the components.
- The site relies on an experimental flag for its not-found page. If a later Next.js
  release changes or removes `globalNotFound`, the not-found page has to be reworked,
  most likely by giving each language tree its own `not-found.tsx` and a catch-all
  route. That is a known risk, accepted because the alternative today is a not-found
  page with no layout at all.
