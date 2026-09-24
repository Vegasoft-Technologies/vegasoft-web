# 0001. Stack and hosting

**Status:** accepted, 2026-09-24

## Context

The company already runs one production site, zuki-web, on Next.js 16 with the App
Router and TypeScript, built into a Cloudflare Worker by `@opennextjs/cloudflare` and
deployed by a GitHub Actions workflow. That setup is known, documented and paid for.

This site is small and static: a home page, a handful of service pages, About, Contact
and the legal pages, in English and later in Turkish. Nothing on it changes between
deployments. The one dynamic part, the contact form, needs a server endpoint but no
storage.

## Decision

Next.js 16 with the App Router and TypeScript, deployed to Cloudflare Workers through
`@opennextjs/cloudflare`, in the same Cloudflare account as the company's other
production site. One stack, one account and one CI setup to look after.

Every page is prerendered at build time and nothing revalidates, so the incremental
cache is the static assets cache (`open-next.config.ts`). No KV, R2, Durable Objects or
queues are provisioned.

## Consequences

- The framework's runtime JavaScript ships with every page. That is accepted, and its
  cost is measured with Lighthouse rather than assumed.
- Every pull request uploads a preview version and gets its address in the Deploy job
  summary.
- Every `*.workers.dev` address is sent with `X-Robots-Tag: noindex`, so previews and
  the bare Worker address never compete with the canonical address in search results.
- Local checks use `npm run preview`, which builds the Worker and runs it in the local
  Workers runtime. A plain `wrangler dev` skips filling the page cache and does not show
  what the deployed site does.
- Anyone who can work on zuki-web can work on this site without learning a second
  setup.
