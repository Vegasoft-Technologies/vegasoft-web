# Vegasoft Technologies

The website of Vegasoft Technologies, a small UK studio that builds software, data tools
and AI for manufacturers and small businesses, at <https://vegasoft.co.uk>.

## Stack

Next.js 16 with the App Router, TypeScript and React 19, deployed to Cloudflare Workers
with `@opennextjs/cloudflare`. Every page is prerendered at build time. Styling is CSS
custom properties for the design tokens and a CSS Module beside each component; there is
no CSS framework, component kit or icon library. The reasons are in
[`docs/decisions/`](docs/decisions/).

## Getting started

Node 24. The version is in `.nvmrc`, so `nvm use` picks it up.

```bash
nvm use
npm install
npm run dev
```

The development server runs at <http://localhost:3000>. To run the production build in
the local Workers runtime, which is what the deployed site runs:

```bash
npm run preview
```

That serves the site at <http://localhost:8787>.

## Commands

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the development server.                                    |
| `npm run build`        | Produce a production build.                                      |
| `npm run start`        | Serve a production build with Node.                              |
| `npm run preview`      | Build the Cloudflare Worker and run it locally.                  |
| `npm run lint`         | Run ESLint.                                                      |
| `npm run format`       | Format the project with Prettier.                                |
| `npm run format:check` | Check formatting without writing changes.                        |
| `npm test`             | Run the tests in `src/**/*.test.ts` with Node's own test runner. |
| `npx tsc --noEmit`     | Type-check. Run it after `npm run build`; see below.             |

## Verification

Run these five in this order before pushing:

```bash
npm run lint
npm run build
npx tsc --noEmit
npm run format:check
npm test
```

The order matters. `npx tsc --noEmit` needs the route types that `npm run build`
generates, so on a clean checkout it fails if it is run first.

## Deployment

The site runs on Cloudflare Workers, built by `@opennextjs/cloudflare` from the Next.js
output ([`docs/decisions/0001-stack-and-hosting.md`](docs/decisions/0001-stack-and-hosting.md)).
The Worker is configured in `wrangler.jsonc` and the adapter in `open-next.config.ts`.

Deployment is done by the `Deploy` workflow only. A push to `main` deploys the Worker,
and every pull request uploads a preview version whose address appears in the Deploy
job summary. The workflow needs the repository secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`; until they exist it stops early and says so.

Every `*.workers.dev` address, including previews, is sent with `X-Robots-Tag: noindex`.
The canonical address is always <https://vegasoft.co.uk>.

## Where content lives

All copy is in `src/content/`, never in JSX. English copy is in `src/content/en/`; the
Turkish copy will live in its own files. Facts that appear in more than one place, such as
the email address and the telephone number, are in `src/content/site.ts`. Company details
that are not known yet are `null` in `src/content/company.ts`, and the launch checklist
says which ones must be filled in before the site goes live.

## Documentation

| Document                                                           | What it covers                                     |
| ------------------------------------------------------------------ | -------------------------------------------------- |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                               | Branches, commits, and how a change reaches `main` |
| [`docs/engineering-guidelines.md`](docs/engineering-guidelines.md) | How the code, the styles and the copy are shaped   |
| [`docs/launch-checklist.md`](docs/launch-checklist.md)             | What has to be true before the domain points here  |
| [`docs/decisions/`](docs/decisions/)                               | Why the significant choices were made              |

## Licence

Proprietary. All rights reserved. See [`LICENSE`](LICENSE).
