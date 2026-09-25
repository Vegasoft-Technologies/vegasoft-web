# Launch checklist

What has to be true before the vegasoft.co.uk domain points at this site. Tick each item
when it is done, with the date.

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
- [ ] The contact form is built, or its "Soon" entry is removed.
- [ ] Check with the ICO's self-assessment whether the data protection fee is due, and
      pay it if so.
- [ ] The "How we price" wording is approved by the business owner.
- [ ] The business owner has confirmed the published commitments (a first conversation,
      the reply time, payment, progress, ownership, confidentiality, on-site visits and
      support hours) match how the business works and what its contracts say.

## Domain

- [ ] The vegasoft.co.uk DNS zone is moved to the Cloudflare account. Email stays with
      its current provider, and the SPF record is updated before the switch.
- [ ] The Worker is attached to the apex and to `www`.
- [ ] `www` redirects to the apex.
- [ ] `/privacy.html` redirects to `/privacy`.

## Contact

- [ ] The contact form sends through Resend from vegasoft.co.uk to
      `hello@vegasoft.co.uk`.
- [ ] The old form provider is switched off.

## Measurement and search

- [ ] Cloudflare Web Analytics is on.
- [ ] Search Console is verified by DNS record.
- [ ] The sitemap is submitted.

## Languages

- [ ] The Turkish version is live, or follows within a week of launch.

## On the production address

- [ ] Lighthouse, mobile, at least 95 in all four categories.
- [ ] axe reports no violations.
- [ ] The site is complete with JavaScript off.
