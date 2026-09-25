# Engineering guidelines

These are the working standards for this repository. Read them before your first pull
request. They exist so that anyone joining the project can read the code and understand
why it is shaped the way it is.

## Language

All repository content is written in English: code, identifiers, comments, commit
messages, documentation, issues and pull requests. Site copy is in British English, with
sentence-case headings. Turkish copy will live in its own files under `src/content/`.

## Branches and commits

- Never push directly to `main`. Every change arrives through a pull request.
- Branch names: `feat/<short-slug>`, `fix/<short-slug>`, `chore/<short-slug>`,
  `docs/<short-slug>`, `refactor/<short-slug>`.
- Commit messages follow Conventional Commits:
  `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`, `test:`, `perf:`, `build:`, `ci:`.
- The subject line is imperative, at most 72 characters, with no trailing full stop.

  Good: `feat(home): add the pricing section`
  Bad: `Updated the home page and some other fixes`

- One logical change per commit. If the subject line needs an "and", split the commit.
- A commit has one author and no trailers. Nothing is appended after the body.

## Scope discipline

- Change only what the task requires. Do not reformat, rename or restructure adjacent code.
- Do not introduce an abstraction for something used in one place.
- New dependencies require a stated reason and agreement in the pull request. Every
  dependency adds weight to a site whose measured performance is a requirement.
- If you notice an unrelated problem, open an issue for it. Do not fix it in the same
  pull request.

## Styling

- Design tokens are CSS custom properties on `:root` in `src/styles/tokens.css`: colours,
  fonts, the base text size, radius, gutters and the page width.
- `src/styles/base.css` holds the element defaults: box sizing, body, headings,
  paragraphs, lists, links and the focus ring. Nothing component-specific goes there.
- Every other style lives in a CSS Module beside its component.
- No literal colours outside `tokens.css`.
- Mobile first. Style the narrow layout, then widen it with `min-width` queries at 720px
  and 1024px only. No other breakpoints.
- Use `clamp()` for values that can scale: type sizes, section spacing, gutters.
- Corner radius is 2 to 4px.
- Lines only where they separate information. A rule between two list rows carries
  meaning; a rule around a box does not.

## Components

- App Router with TypeScript in strict mode.
- Components are Server Components by default. Client JavaScript is used only for the
  contact form and, if one is ever needed, a mobile menu. Keep any such component as
  small as possible.
- One component per file; the file name matches the exported component name.
- Props are explicitly typed. `any` is not permitted.
- Layout components live in `src/components/layout/`, page sections in
  `src/components/sections/`, reusable primitives in `src/components/ui/`.

## Content

Copy never lives inside JSX. Changing a sentence on the site must require editing only a
file in `src/content/`.

- English copy is in `src/content/en/`, one module per page or concern. Turkish copy will
  sit beside it in its own files.
- `src/content/site.ts` holds the facts that appear in more than one place: the name,
  the address of the site, the email address and the telephone number.
- `src/content/company.ts` holds the company details for the footer and, later, the
  company information page and the privacy notice. A value of `null` means "not known
  yet": deployed builds leave the detail out entirely, label included, and `npm run dev`
  shows a dashed placeholder where it will go.

## Writing

- British English. Short sentences. Concrete nouns.
- Every claim can be checked. No invented numbers, logos, quotes, testimonials, client
  names, certifications or awards.
- These phrases are excluded, and `src/content/style.test.ts` fails if one appears in
  the copy: empower, unlock, seamless, cutting-edge, revolutionise, leverage, elevate,
  harness, supercharge, game-changer, next-gen, innovative solutions, world-class,
  best-in-class, state-of-the-art, fast-paced, transform your business.
- No arrows, long dashes or exclamation marks. The same test checks for them.
- The site's copy uses the trading name, "Vegasoft Technologies". The legal name comes
  only from `src/content/company.ts`, and appears only in the footer's legal line, on the
  Company information page and in the structured data. No file in `src/content/en/` names
  it; `src/content/style.test.ts` checks that.

## Visual rules

Things the design never does:

- Purple or blue gradients, or gradient text.
- One word of a heading picked out in another colour.
- Starry or space backgrounds, glows or sparkles. The four-point star in the logo is never used as decoration.
- Glassmorphism, bento grids, or neon on a dark background.
- Rows of identical rounded cards with thin line icons.
- Letter-spaced uppercase labels above headings.
- Dotted meta strings such as "A · B · C".
- Monospace as decoration. IBM Plex Mono appears only in diagram labels and data values.
- An arrow at the end of a link.
- Pill-shaped buttons, or "most popular" badges.
- Sections that fade or slide in on scroll. The only motion is feedback on hover, focus and press.
- Emoji as icons, stock photographs, or generated images.
- Inter, Space Grotesk or Poppins as a text font.
- A cream background with a serif and terracotta, a dark background with acid green, or cramped newspaper-like density.

## Accessibility

- WCAG 2.2 AA.
- Visible focus on everything interactive. The focus ring is defined once, in
  `base.css`, and is never removed.
- Interactive elements measure at least 44 by 44 pixels, except links inside running
  text.
- The page is complete without JavaScript. Nothing a visitor needs is rendered only in
  the browser.
- One `h1` per page, and headings in order with no level skipped.
- `prefers-reduced-motion` is respected: with it set, transitions are off.
- Interactive elements are `<button>` or `<a>`, never a `<div>` with a click handler.
- Every image has meaningful alternative text, or `alt=""` when purely decorative.

## Performance targets

- Lighthouse, mobile, at least 95 in all four categories.
- Largest Contentful Paint under 2 seconds.
- Cumulative Layout Shift of 0.

## Images

Only real ones: screenshots of our own work and SVG diagrams drawn for the site. No stock
photography and no illustrations. There are none yet, apart from the logo.

## Privacy

No tracking script or third-party script loads before the visitor has given consent. The
only analytics planned is Cloudflare Web Analytics, which sets no cookies and needs no
consent banner.

## Definition of done

Run these five, in this order, and confirm they pass:

    npm run lint
    npm run build
    npx tsc --noEmit
    npm run format:check
    npm test

Then check the running site at 375px, 768px and 1280px, and attach screenshots at the
three widths to the pull request.
