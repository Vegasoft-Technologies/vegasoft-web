# Security

What the site does to stay safe, why each thing is there, what we have decided to live
with, and how to check all of it again. `SECURITY.md` says how to report a problem.

The site has no accounts, no sessions, no cookies and no database. The only thing a
visitor can send is the contact form, and the only thing that happens to it is one
email. That shapes everything below: there is very little to steal, so most of the work
goes into making sure nothing can be injected into a page, and that the one endpoint
that accepts input cannot be used by anybody else.

## Headers

Set in `next.config.ts` and sent with every page.

| Header                       | Why                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `Content-Security-Policy`    | Enforced, not report-only. A script or a frame can only come from this site, Turnstile or Web Analytics.     |
| `Strict-Transport-Security`  | A year, on `vegasoft.co.uk` only. A browser that has been here once will not try HTTP again.                 |
| `X-Content-Type-Options`     | A browser serves a file as the type we gave it, and does not guess.                                          |
| `X-Frame-Options`            | `DENY`, with `frame-ancestors 'none'` saying the same thing to newer browsers. The site is never in a frame. |
| `Cross-Origin-Opener-Policy` | `same-origin`. A page we open, or that opens us, cannot reach into this one.                                 |
| `Referrer-Policy`            | A full address is only sent to ourselves; another site gets the origin, and only over HTTPS.                 |
| `Permissions-Policy`         | Every browser feature the site never uses is turned off for everyone, this site included.                    |
| `X-Robots-Tag`               | `noindex` on `*.workers.dev`, so a preview never appears in a search result.                                 |

`poweredByHeader` is off, so no page announces what serves it.

`Strict-Transport-Security` deliberately leaves out `includeSubDomains` and `preload`.
Mail for this domain is handled elsewhere, on names under it we do not control, and it
is not ours to force those onto HTTPS for ever.

Static assets under `/_next/static/` are served by Cloudflare straight from
`public/_headers`, which gives them a year of caching and `nosniff`. They are not
documents, so the rest does not apply to them.

### Why the policy allows `'unsafe-inline'`

The documented way to avoid it in Next.js is a per-request nonce. Next.js can only put a
nonce in a page it renders for that request, so using one turns every page dynamic and
ends static caching: the site is thirty prerendered pages served from Cloudflare's edge,
and it would become thirty renders per visitor. Next.js inlines its own bootstrap and the
page data as `<script>`, and the contact form carries one inline `<style>` for the
no-JavaScript fallback, so `script-src` and `style-src` allow `'unsafe-inline'`.

Nothing else does. `default-src` is `'self'`, `object-src` is `'none'`, `base-uri` and
`form-action` are `'self'`, and `frame-ancestors` is `'none'`, so an injected tag still
cannot load code from somewhere else, post the form somewhere else, change where relative
addresses point, or put the site in a frame. The site renders no visitor input into any
page — the contact form's only output is an email — so there is no path by which a
`<script>` would get into the markup in the first place.

Next.js has an experimental build-time Subresource Integrity mode that would let the
policy drop `'unsafe-inline'` for scripts while pages stay static. It is marked
experimental, so it is not used yet; it is worth revisiting when it is not.

## The contact endpoint

`POST /api/contact` is the only address that accepts anything. In order, before a byte
of the body is parsed, a request is refused if it is:

- not `POST` — the answer is `405` with `Allow: POST`;
- not `application/json` — `415`;
- larger than 32 KB, whether it says so or not; the body is counted while it is read, so
  one that declares no length is held to the same ceiling — `413`;
- from an `Origin` that is not this site's own — `403`. Its own means the canonical
  address, a workstation, or the address the request itself arrived at, which covers
  every preview without naming one. A missing `Origin` is refused too.

Then, at five submissions a minute per visitor, the Cloudflare rate limiting binding
answers `429`. The visitor's address is the key it counts against and is written nowhere.

Then the submission itself is checked: the honeypot, control characters and newlines in
the name, the email address and the company (which in an email would start a header of
their own), the field rules, and the spam check. The spam check has to come back as a
real person **and** say the token was solved on one of this site's own addresses, so one
solved elsewhere cannot be replayed here.

Both outbound calls — the spam check and the email service — are given eight seconds, and
a missed deadline counts as a failed send rather than hanging.

Every answer carries `Cache-Control: no-store`.

## What the logs hold

A failed send writes exactly one line, beginning `contact: `. It may carry the reason,
an upstream status code, the spam check's own error codes, the names of settings that are
missing and the names of fields that are invalid. It never carries the name, the email
address, the company, the message, the visitor's address, the token, any key, or the
email service's reply. A send that works writes nothing at all. `src/lib/contact.test.ts`
runs every way a send can fail and asserts that no line contains any of them.

The owner reads these in Cloudflare, under Workers & Pages → vegasoft-web →
Observability, on the `POST /api/contact` event.

## The repository

- Workflows have `permissions: contents: read` at the top and on each job, and no job
  uses `pull_request_target`.
- A pull request from a fork cannot reach the deployment secrets: the job that holds them
  does not run unless the branch is in this repository.
- Every third-party action is pinned to a full commit SHA, with its version in a comment,
  so a moved tag cannot change what runs.
- Dependabot opens one grouped pull request a week for npm and for the actions, and
  proposes nothing in its first week: a package that has just been published is the one
  most likely to have been taken over.
- Secret scanning, push protection, Dependabot alerts and updates, private vulnerability
  reporting and CodeQL are on.

## What we have decided to live with

- **`'unsafe-inline'` for scripts and styles.** The reasoning is above. The cost is that
  the policy is not a defence against injected markup; the reason that is acceptable is
  that no visitor input is ever rendered into a page.
- **A dependency tree we do not audit by hand.** `npm audit`, OSV and Dependabot watch it.
  Everything that actually ships is three packages deep: Next.js, React and React DOM.
- **Rate limiting counts per Cloudflare location, not globally.** The binding is
  deliberately approximate. It is there to stop a flood, not to keep accounts.
- **The spam check is Cloudflare's.** If Turnstile is down, the form stops accepting
  submissions rather than letting them through. The page still shows the email address
  and the telephone number.

## Running the assessment again

Nothing below is installed by this repository, and none of it belongs in `package.json`.
Tool output goes to `/tmp/vegasoft-security/`, never into the repository.

```sh
mkdir -p /tmp/vegasoft-security

# The code and the repository
npm audit
docker run --rm -v "$PWD:/src" ghcr.io/google/osv-scanner:latest \
  scan source --lockfile=/src/package-lock.json
semgrep scan --config p/default --config p/typescript --config p/react \
  --config p/nextjs --config p/secrets src/ next.config.ts open-next.config.ts .github/
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest \
  git /repo --redact -v --log-opts=--all
scorecard --repo=github.com/Vegasoft-Technologies/vegasoft-web

# The live site: passive and read-only, no faster than five requests a second
npx @mdn/mdn-http-observatory vegasoft.co.uk
docker run --rm drwetter/testssl.sh --quiet --sneaky https://vegasoft.co.uk
docker run --rm -v /tmp/vegasoft-security:/zap/wrk/:rw zaproxy/zap-stable \
  zap-baseline.py -t https://vegasoft.co.uk -r zap-baseline.html
docker run --rm projectdiscovery/nuclei -u https://vegasoft.co.uk \
  -rl 5 -c 2 -etags intrusive,dos,fuzz,bruteforce

# The active scan, against a build on this machine and never against the live site
git worktree add /tmp/vegasoft-security/site HEAD
cd /tmp/vegasoft-security/site && npm ci && npm run preview   # http://localhost:8787
docker run --rm --add-host=host.docker.internal:host-gateway \
  -v /tmp/vegasoft-security:/zap/wrk/:rw zaproxy/zap-stable \
  zap-full-scan.py -t http://host.docker.internal:8787 -r zap-full.html
git worktree remove /tmp/vegasoft-security/site
```

The live site is only ever scanned passively, and never while logged in as anyone.
`35.214.100.129` and every name that points at it are another provider's shared server
and are never touched; see `SECURITY.md`.
