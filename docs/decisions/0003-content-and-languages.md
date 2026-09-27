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

## How it turned out

The Turkish version was built this way. `src/content/en/` and `src/content/tr/` mirror
each other, `src/content/index.ts` holds both to the type the English objects give, and
`src/content/routes.ts` holds every address in both languages, including the Turkish
service addresses (`/tr/hizmetler/uretim` and the rest) and the Turkish ids of the
sections on the home page. Components take the language and read the copy through it.
There is no translation function and no library: a page renders from one set of
components and two sets of words.

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
