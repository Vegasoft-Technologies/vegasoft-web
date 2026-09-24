# Contributing

Read [`docs/engineering-guidelines.md`](docs/engineering-guidelines.md) first. It
describes how the code is shaped and why. This file describes how a change gets from
your machine into `main`.

## Getting set up

Node 24. The version is in `.nvmrc`, so `nvm use` picks it up.

```bash
npm install
npm run dev
```

## Branches

`main` is protected. Pushing to it directly is rejected by the server, including for
administrators. Every change arrives through a pull request.

Branch names say what kind of change they are:

```
feat/<short-slug>      a new capability
fix/<short-slug>       a defect
chore/<short-slug>     tooling, configuration, housekeeping
docs/<short-slug>      documentation
refactor/<short-slug>  a change with no effect a visitor can see
```

## Commits

Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`,
`test:`, `perf:`, `build:`, `ci:`. A scope is welcome where it helps:
`feat(home): add the pricing section`.

- The subject is imperative, at most 72 characters, no trailing full stop.
- One logical change per commit. If the subject needs an "and", split it.
- A commit has one author and no trailers. Nothing is appended after the body.

## Before you ask for a review

Run these five, in this order:

```bash
npm run lint
npm run build
npx tsc --noEmit
npm run format:check
npm test
```

**The order matters.** `npx tsc --noEmit` needs the route types that `npm run build`
generates. On a clean checkout it fails if it runs first, and the failure looks like a
missing global type rather than a missing build. Formatting and tests come last because
they are the quickest to fix and the least likely to hide a real fault.

Then open the site and check it at 375px, 768px and 1280px, in that order:

1. Every section renders, and nothing overlaps or is cut off.
2. No horizontal scrolling at 375px.
3. No console errors and no hydration warnings.
4. Every link and button is reachable by keyboard and shows a focus ring. The skip link
   appears on the first Tab and moves focus to the main content.
5. No link or button is smaller than 44 by 44 pixels, except links inside running text.
6. The page is complete with JavaScript disabled.

Attach screenshots at the three widths. The pull request template has a place for them.

## Merging

CI runs the five commands on every pull request, and the `build` and `commit messages`
checks have to pass before `main` will accept the merge.

**Wait for a check to register before you merge.** `gh pr checks` prints
`no checks reported` in the gap between pushing and GitHub creating the run. That is a
race, not a pass. Confirm a check exists and has completed:

```bash
gh api repos/Vegasoft-Technologies/vegasoft-web/commits/$(gh pr view <n> --json headRefOid --jq .headRefOid)/check-runs
```

After merging, confirm the change is actually on `main` before branching again. A pull
request that passed its checks but was never merged looks identical to a merged one in
every list that shows only the check status.

## Things that will be sent back

- Copy written into a component instead of `src/content/`.
- A literal colour outside `src/styles/tokens.css`.
- A claim, number, logo, quote or client name that cannot be checked.
- A new dependency without a stated reason.
- `"use client"` on a component that has no state, effect or event handler.
- `suppressHydrationWarning`. Fix the cause instead.
- Anything naming the tools used to write the code. The repository is public.
