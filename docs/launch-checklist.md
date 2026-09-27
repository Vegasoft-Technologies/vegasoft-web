# Launch checklist

What has to be true before the vegasoft.co.uk domain points at this site. Tick each item
when it is done, with the date.

## Launch day, in order

- [ ] The deployment secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set
      on the repository, and the Deploy workflow has run on `main` and finished.
- [ ] The contact form's two Worker secrets are set, each pasted when asked and never
      written into a file: `npx wrangler secret put RESEND_API_KEY` and
      `npx wrangler secret put TURNSTILE_SECRET_KEY`.
- [ ] The public half of the spam check is a repository variable, so the build reads it:
      `gh variable set NEXT_PUBLIC_TURNSTILE_SITE_KEY --body <site key>`. The build after
      it carries the widget.
- [ ] The Worker is attached to `vegasoft.co.uk` and `www.vegasoft.co.uk` in the
      Cloudflare dashboard, under Workers and Pages, vegasoft-web, Settings, Domains and
      Routes. Attaching the apex replaces the two A records that still point at the old
      site.
- [ ] The mail records are untouched: the MX records and the SPF, DKIM and DMARC entries
      still point at SiteGround, and email keeps arriving.
- [ ] A form submission from the live site arrives at `hello@vegasoft.co.uk`, with the
      sender's address as the reply-to.
- [ ] Cloudflare Web Analytics is switched on for the site in the dashboard.
- [ ] Search Console is verified with a DNS TXT record on the zone.
- [ ] The sitemap is submitted: `https://vegasoft.co.uk/sitemap.xml`.

## After launch

- [ ] The company number goes into `src/content/company.ts` as soon as incorporation is
      complete. The site launched before it, by the owner's decision, and the footer's
      company number clause stays out of the page until the number is there.
- [ ] The registered office in `company.ts` is checked against the Companies House
      register once the company is on it.
- [ ] Ownership of the vegasoft.co.uk domain moves from the owner to the company.
- [ ] The retention period in the privacy notice is approved, or changed and approved.
      Until then the section is not in the published page.

## Company details

- [ ] Incorporation of Vegasoft Technologies London Ltd is complete, the company number is
      in `src/content/company.ts`, and the legal name, registered office and place of
      registration there match the Companies House register.
- [ ] If the registered office has changed, `company.ts` has the new one.
- [ ] Written permission from Zuki's Caffetteria to name them as an example is on file.
      The confidentiality commitment says we never name a client without written
      permission; without it, the example comes off the Websites area.
- [ ] The "Where your data lives" draft is decided in the hosting work: approved with the
      real hosting locations, or removed.
- [ ] The terms of business are written and published, or their "Soon" entry is removed.
- [ ] Check with the ICO's self-assessment whether the data protection fee is due, and
      pay it if so.
- [ ] The "How we price" wording is approved by the business owner.
- [ ] The business owner has confirmed the published commitments (a first conversation,
      the reply time, payment, progress, ownership, confidentiality, on-site visits and
      support hours) match how the business works and what its contracts say.

## Domain

The zone is already on Cloudflare, with the records that still serve the old site and the
mailbox set to "DNS only". Attaching the Worker on launch day is what moves the site.

- [ ] The old form provider, if the old site had one, is switched off.
- [ ] The domain's registration is renewed and not due to lapse in the next month.

## Languages

- [ ] The Turkish version is live, or follows within a week of launch.

## On the production address

- [ ] Lighthouse, mobile, at least 95 in all four categories.
- [ ] axe reports no violations.
- [ ] The site is complete with JavaScript off.
