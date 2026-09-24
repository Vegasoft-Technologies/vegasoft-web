## What changed

<!-- One or two sentences. If you need an "and", consider splitting the pull request. -->

## Why

<!-- The reason for the change, not a restatement of the diff. Link an issue if there is one. -->

## How it was tested

<!-- Commands you ran and what they printed. Measurements beat impressions. -->

## Screenshots

<!-- Required for any change a visitor can see. All three widths. -->

| 375px | 768px | 1280px |
| ----- | ----- | ------ |
|       |       |        |

## Checklist

- [ ] `npm run lint`, `npm run build`, `npx tsc --noEmit`, `npm run format:check` and
      `npm test` pass, in that order. The type check needs the route types the build
      generates.
- [ ] Checked at 375px first, then 768px and 1280px.
- [ ] No horizontal scrolling at 375px.
- [ ] No console errors and no hydration warnings.
- [ ] Visible focus on everything interactive.
- [ ] Copy lives in `src/content/`, not in JSX.
- [ ] No new dependency, or one with a stated reason below.
- [ ] One logical change.
