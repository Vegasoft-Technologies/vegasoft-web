# Launch checklist

What has to be true before the vegasoft.co.uk domain points at this site. Tick each item
when it is done, with the date.

## Launch day, in order

- [x] The deployment secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set
      on the repository, and the Deploy workflow has run on `main` and finished.
      27 September 2026, run 36320155083, to
      `https://vegasoft-web.mertmertdzgn.workers.dev`.
- [x] The contact form's two Worker secrets are set, each pasted when asked and never
      written into a file: `npx wrangler secret put RESEND_API_KEY` and
      `npx wrangler secret put TURNSTILE_SECRET_KEY`. 27 September 2026. A submission
      carrying an invented token is refused by Cloudflare with 403, rather than reported
      as not configured, which is only possible once both are set.
- [x] The public half of the spam check is a repository variable, so the build reads it:
      `gh variable set NEXT_PUBLIC_TURNSTILE_SITE_KEY --body <site key>`. The build after
      it carries the widget. 27 September 2026: the widget renders on the live contact
      page and asks the visitor to confirm they are a person.
- [x] The Worker is attached to `vegasoft.co.uk` and `www.vegasoft.co.uk` in the
      Cloudflare dashboard, under Workers and Pages, vegasoft-web, Settings, Domains and
      Routes. Attaching the apex replaces the two A records that still point at the old
      site. 27 September 2026: both names resolve to Cloudflare, the certificate is
      valid to 26 December 2026, and every page answers 200 over HTTPS.
- [x] The mail records are untouched: the MX records and the SPF, DKIM and DMARC entries
      still point at SiteGround, and email keeps arriving. 27 September 2026: MX still
      the three `mailspamprotection.com` servers, `mail.vegasoft.co.uk` still
      35.214.100.129, and the SPF record unchanged. See the note under Domain.
- [ ] A form submission from the live site arrives at `hello@vegasoft.co.uk`, with the
      sender's address as the reply-to. It has to be sent by a person: the spam check
      refuses an automated browser, which is what it is for.
- [ ] Cloudflare Web Analytics is switched on for the site in the dashboard.
- [ ] Search Console is verified with a DNS TXT record on the zone.
- [ ] The sitemap is submitted: `https://vegasoft.co.uk/sitemap.xml`.

- [ ] "Always Use HTTPS" is on in Cloudflare, under SSL/TLS, Edge Certificates.
      27 September 2026: `http://vegasoft.co.uk/` answers 200 rather than redirecting.
      `http://www.vegasoft.co.uk/` does redirect, because the site's own rule catches the
      host, but the apex over plain HTTP does not, and that is a zone setting rather than
      code.

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

The zone is on Cloudflare. Attaching the Worker on 27 September 2026 moved the site; the
mailbox stays on SiteGround.

- [ ] Confirm that outbound email still passes SPF. The record is
      `v=spf1 +a +mx include:vegasoft.co.uk.spf.auto.dnssmarthost.net ~all`. Its `+a`
      mechanism authorises whatever the domain's A records point at, which is now
      Cloudflare rather than the old mail server. SiteGround's own `include:` should
      still cover their sending servers, so nothing is expected to break, but send one
      email and check the SPF result in its headers. Replacing `+a` with
      `ip4:35.214.100.129` would say plainly what is meant.

- [ ] The old form provider, if the old site had one, is switched off.
- [ ] The domain's registration is renewed and not due to lapse in the next month.

## Languages

- [x] The Turkish version is live, or follows within a week of launch. 27 September 2026:
      live at `/tr`, with its own addresses, alternates and structured data.

## On the production address

- [x] Lighthouse, mobile, at least 95 in all four categories. 27 September 2026 on the
      live address: the English home page 100, 100, 100 and 100; the Turkish home page
      98, 100, 100 and 100. Largest contentful paint 1.2 s and cumulative layout shift 0
      on both.
- [x] axe reports no violations. 27 September 2026: none on the home page, the Turkish
      home page, the contact page and both privacy notices, at 375 px.
- [x] The site is complete with JavaScript off. 27 September 2026: the home page renders
      all nine sections and the footer, and the contact page shows the email address and
      the telephone number in place of the form.
- [ ] Google's Rich Results test is run on the home page. It needs a signed-in Google
      account, so the owner runs it. The structured data served from the live pages
      parses and carries Organization, WebSite and FAQPage with ten questions, in
      `en-GB` and in `tr-TR`.
