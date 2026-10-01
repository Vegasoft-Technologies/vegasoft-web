# Reporting a security problem

If you have found something in this website that looks like a security problem, please
tell us. You do not need to be sure it is one.

## How to report

Either:

- email **hello@vegasoft.co.uk**, with "security" in the subject; or
- open a private report on GitHub: **Security → Report a vulnerability** on
  <https://github.com/Vegasoft-Technologies/vegasoft-web>. Only the maintainers see it.

Please do not open a public issue for something that is not yet fixed.

What helps: the address or page, what you did, what happened, and what you expected.
A screenshot or a `curl` command is plenty. Please do not run load tests, denial of
service tests, or automated scans against the live site, and please do not use anyone
else's data to prove a point.

## What we will do

We answer within one working day, which is the same commitment the site makes to
everyone who writes to us. We will tell you whether we can reproduce it, what we think
it affects, and when we expect to have it fixed. We will tell you when it is fixed.

If you would like to be credited, say so and we will credit you. If you would rather
not be, that is fine too.

## What is in scope

- <https://vegasoft.co.uk> and <https://www.vegasoft.co.uk>
- the Cloudflare Worker that serves them
- this repository

## What is not in scope

- Anything on `35.214.100.129`, and every name that points at it (`mail`, `ftp`, `ssh`,
  `autoconfig`, `autodiscover`). That is a shared server belonging to another provider
  and other people's sites are on it. Please do not test it.
- Reports produced only by an automated scanner, with nothing showing the problem is real.
- Missing hardening that cannot be used for anything, on its own, by anybody.

See `docs/security.md` for what is in place and why.
