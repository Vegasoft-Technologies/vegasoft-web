# Company details

The site shows what most comparable firms show, and nothing beyond it. The rule, applied
to every place, draft and list on the site:

> A place exists only if at least 7 of the 14 comparable sites show that kind of
> information, or the law requires it when it applies to this business.

The fourteen are websites of studios that do similar work: UK bespoke software studios
for small businesses, machine monitoring for smaller plants, and automation and applied
AI consultancies. The last column of each table says how many of the fourteen show that
kind of information. Everything that fails the rule is listed at the end, with its count
and the reason.

Nothing is invented. A fact that is not known yet is `null` in `src/content/company.ts`
and invisible in deployed builds; `npm run dev` shows a dashed placeholder where it will
go. A promise the owner has not approved is `approved: false` in
`src/content/en/commitments.ts` and shown only in development, marked as a draft. Proof
lives in `src/content/en/proof.ts` as empty lists: real, named and with permission only.

## Facts about the business

| Field                | Where it appears                                                             | Required by law before launch                                        | Format expected                                                       | Shown by |
| -------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| Trading name         | Everywhere                                                                   | Yes, and the legal name where it differs                             | `Vegasoft Technologies`                                               | 14 of 14 |
| Legal name           | Footer legal line, Company information                                       | Yes (Companies Act 2006, E-Commerce Regulations 2002 reg. 6)         | The registered name exactly as on the public register                 | 12 of 14 |
| Registered in        | Footer legal line, Company information                                       | Yes, if a company (Company, LLP and Business Names Regulations 2015) | `England and Wales`                                                   | 12 of 14 |
| Address              | Footer legal line, Company information, structured data                      | Yes: a geographic address, a PO box does not qualify (reg. 6)        | `12 Example Street, Exeter EX1 1AA`                                   | 10 of 14 |
| Location             | Contact section and page, About, footer                                      | No                                                                   | `Exeter, United Kingdom`                                              | 14 of 14 |
| Company number       | Footer legal line, Company information (linked to the register)              | Yes, if a company                                                    | `12345678`                                                            | 11 of 14 |
| VAT number           | Footer legal line, Company information                                       | Yes, if VAT registered (reg. 6)                                      | `GB 123 4567 89`                                                      | 3 of 14  |
| Email address        | Header (from 1024 px), contact section and page, footer, Company information | Yes (reg. 6)                                                         | `hello@vegasoft.co.uk`, known                                         | 14 of 14 |
| Telephone number     | Header (from 1024 px), contact section and page, footer, Company information | No                                                                   | `+44 7767 080863`, known                                              | 10 of 14 |
| Area covered on site | About, Contact, structured data                                              | No                                                                   | `Devon and the South West; elsewhere in the UK by arrangement`        | 14 of 14 |
| Founded              | About, structured data                                                       | No                                                                   | `2024`                                                                | 9 of 14  |
| Profiles             | Contact, structured data                                                     | No                                                                   | Label and address: `LinkedIn`, `https://www.linkedin.com/company/...` | 11 of 14 |
| Privacy notice       | A page of its own, linked from the footer (later pull request)               | Yes (UK GDPR): what is collected, why, for how long, and the rights  | A page, with the date it was last updated                             | 14 of 14 |
| Terms of business    | A page of its own, if the owner wants them published                         | No                                                                   | A page, with the date it was last updated                             | 11 of 14 |

## Promises to clients

Approved entries are published in "What you can count on" on the home page and, where
they belong, on the About and Contact pages and in the questions. Each draft is a proposed
sentence for the owner to approve, change or remove.

| Commitment                              | Status            | Shown by |
| --------------------------------------- | ----------------- | -------- |
| A reply within one working day          | Published         | 7 of 14  |
| Ownership of the work, handover         | Published         | 11 of 14 |
| On site when the job needs it           | Published         | 12 of 14 |
| Plain answers, saying no when not a fit | Published (About) | 12 of 14 |
| A first conversation costs nothing      | Draft             | 14 of 14 |
| Payment staged against the scope        | Draft             | 13 of 14 |
| Seeing the work as it is built          | Draft             | 10 of 14 |
| Where data is hosted                    | Draft             | 10 of 14 |
| Confidentiality and naming clients      | Draft             | 9 of 14  |
| Support hours                           | Draft             | 8 of 14  |

## Proof

Each list is empty until the owner supplies a real, named entry and the person or business
named has agreed to it. In deployed builds an empty list renders nothing; in development
each shows a placeholder in the "Clients and work" section of the home page.

| Kind         | Shown by |
| ------------ | -------- |
| Case studies | 13 of 14 |
| Testimonials | 8 of 14  |

## Not given a place, and why

Fewer than half of the comparable sites show it, and the law does not require it:

- Office hours (4 of 14).
- Languages (3 of 14).
- Certifications (5 of 14).
- Memberships, partner programmes and funding schemes (5 of 14).
- Insurance (1 of 14).
- A booking link for a first call (1 of 14).
- ICO registration number shown on the site (2 of 14). Whether the data protection fee is
  due is a launch task in `docs/launch-checklist.md`, not something the site shows.
- A commitment on faults fixed after handover (6 of 14).
- A commitment on notice periods for the monthly fee (5 of 14).
- A commitment that the person briefed builds the system (5 of 14).
- A commitment to build to public security guidance (2 of 14).
- Client logos (5 of 14), awards (5 of 14), third-party reviews (2 of 14) and press
  mentions (2 of 14).
- An accessibility statement page (0 of 14).

Other reasons:

- Data hosting as a fact on About (10 of 14): duplicated, because the draft commitment
  "Where your data lives" says it.
- The sentence about the star Vega: not a kind of information comparable sites show.
- Named people, photographs and team size (11, 5 and 7 of 14): the owner decided the site
  shows no people.
- Headline numbers such as projects delivered or years in business (14 of 14): the site
  publishes no figures.
- Prices, ranges and starting prices: the site has no prices.
- Own products (7 of 14): the business sells none.
- A cookie policy (13 of 14): the site sets no cookies, which the privacy notice will say.
- A stock-market listing and similar: cannot apply.
