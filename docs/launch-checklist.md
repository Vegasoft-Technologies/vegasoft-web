# Launch checklist

What has to be true before the vegasoft.co.uk domain points at this site. Tick each item
when it is done, with the date.

## Company details

- [ ] `src/content/company.ts` is filled in. The site must show the legal name, a
      geographic address and the email address (Electronic Commerce (EC Directive)
      Regulations 2002, regulation 6), and the company number and VAT number if they
      exist.
- [ ] ICO registration is recorded there if the ICO's self-assessment says the data
      protection fee is due.
- [ ] The "How we price" wording is approved by the business owner.

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
