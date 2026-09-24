# 0004. Company details

**Status:** accepted, 2026-09-24

## Context

The site has to show certain company details: the legal name, a geographic address, an
email address, and the company and VAT numbers if they exist (Electronic Commerce (EC
Directive) Regulations 2002, regulation 6). Some of them are not known yet, and the site
is being built before they are.

A placeholder that reaches production is worse than a gap: "Company number: to be
added" on a live site reads as carelessness, and an invented value is a false statement.

## Decision

Details that are not known yet are `null` in `src/content/company.ts`. A component that
shows a detail leaves it out completely, label included, when the value is `null` in a
deployed build. In `npm run dev` the same component renders a dashed placeholder in
place of the value, so the gap is visible while working locally.

The trading name "Vegasoft Technologies" is used everywhere. The legal name appears only
where the law requires it, once it is known.

## Consequences

- No deployed build can show a placeholder or an invented detail.
- `docs/launch-checklist.md` lists the details that must be filled in before the domain
  points at the site. The site is not launched with a `null` among the required ones.
- `src/content/company.test.ts` checks that each detail is either `null` or a trimmed,
  non-empty string, so an empty string cannot slip through as "known".
- The distinction between the trading name and the legal name is made once, in the
  content file, and every page follows it.
