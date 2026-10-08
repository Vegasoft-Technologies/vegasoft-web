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

Nothing is invented. The business trades as Vegasoft Technologies. The company behind it
is **Vegasoft Software Engineering UK Ltd**, company number **17507818**, incorporated on
8 October 2026; the details are in `src/content/company.ts` and every page reads them
from there.

## Details that are still coming, and the "Soon" switch

A detail that is not known yet is `null` in `src/content/company.ts`. A promise the owner
has not approved is `approved: false` in `src/content/en/commitments.ts`.

The production build shows neither: a live site does not advertise what it has not got.
Where the gaps are worth seeing they are marked "Soon", in the place the detail will take:

- `npm run dev`
- `npm run preview:soon`, which is `npm run preview` with `SHOW_SOON=1`
- the preview of every pull request, because `.github/workflows/deploy.yml` sets
  `SHOW_SOON=1` for pull requests and leaves it empty for `main`

`src/lib/soon.ts` holds that switch, and the `Soon` component marks each place with a
`data-soon` attribute, so a build can be searched for markers that should not be in it.

These places show a marker, and no others:

| What                              | Where                                  |
| --------------------------------- | -------------------------------------- |
| Company number                    | Footer legal line, Company information |
| Privacy notice                    | Footer, Company column                 |
| Terms of business                 | Footer, Company column                 |
| Contact form                      | Contact page                           |
| Case studies, testimonials        | Home page, "Clients and work"          |
| The "Where your data lives" draft | Home page, "What you can count on"     |

The VAT number shows nothing anywhere, not even a marker: the business is not VAT
registered.

## Facts about the business

| Field                | Where it appears                                                             | Required by law before launch                                        | Value or format                                         | Shown by     |
| -------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | ------------ |
| Trading name         | Everywhere                                                                   | Yes, and the legal name where it differs                             | Filled: `Vegasoft Technologies`                         | 14 of 14     |
| Legal name           | Footer legal line, Company information, structured data                      | Yes (Companies Act 2006, E-Commerce Regulations 2002 reg. 6)         | Filled: `Vegasoft Software Engineering UK Ltd`          | 12 of 14     |
| Company type         | Company information                                                          | No                                                                   | Filled: `Private company limited by shares`             | Not surveyed |
| Registered in        | Footer legal line, Company information                                       | Yes, if a company (Company, LLP and Business Names Regulations 2015) | Filled: `England and Wales`                             | 12 of 14     |
| Registered office    | Footer legal line, Company information, structured data                      | Yes: a geographic address, a PO box does not qualify (reg. 6)        | Filled: `20 Wenlock Road, London N1 7GU`, held in parts | 10 of 14     |
| Company number       | Footer legal line, Company information (linked to the register once known)   | Yes, if a company                                                    | Filled: `17507818`, linked to the register              | 11 of 14     |
| VAT number           | Nowhere                                                                      | Yes, if VAT registered (reg. 6)                                      | Not applicable: the business is not VAT registered      | 3 of 14      |
| Location             | Contact section and page, About, footer                                      | No                                                                   | Filled: `London, United Kingdom`                        | 14 of 14     |
| Email address        | Header (from 1024 px), contact section and page, footer, Company information | Yes (reg. 6)                                                         | Filled: `hello@vegasoft.co.uk`                          | 14 of 14     |
| Telephone number     | Header (from 1024 px), contact section and page, footer, Company information | No                                                                   | Filled: `+44 7767 080863`                               | 10 of 14     |
| Area covered on site | About, Contact                                                               | No                                                                   | Filled: `Anywhere in the UK, by arrangement`            | 14 of 14     |
| Founded              | About, structured data                                                       | No                                                                   | Filled: `2026`                                          | 9 of 14      |
| Profiles             | Contact, structured data                                                     | No                                                                   | Filled: LinkedIn                                        | 11 of 14     |
| Support hours        | The support-hours commitment, structured data                                | No                                                                   | Filled: Monday to Friday, 9:00 to 18:00 UK time         | 8 of 14      |
| Privacy notice       | A page of its own, linked from the footer                                    | Yes (UK GDPR): what is collected, why, for how long, and the rights  | **Soon**: a page, with the date it was last updated     | 14 of 14     |
| Terms of business    | A page of its own                                                            | No                                                                   | **Soon**: a page, with the date it was last updated     | 11 of 14     |

## From the incorporation application, not shown on the site

The incorporation application confirms the legal name, the registered office and England
and Wales, which `src/content/company.ts` already holds. It adds the following. None of
it is published: the site shows only the company type, because the rest is either on the
public register already or is not a kind of information comparable sites show.

| Field                    | Value                                                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name as registered       | `VEGASOFT SOFTWARE ENGINEERING UK LTD`. The site keeps the title-case form, `Vegasoft Software Engineering UK Ltd`. The application was reviewed under `VEGASOFT TECHNOLOGIES LONDON LTD`; the owner changed the name before filing, and the register is what the site follows. |
| Company number           | `17507818`, incorporated 8 October 2026, registered in England and Wales.                                                                                                                                                                                                       |
| Company type             | Private company limited by shares. Shown on Company information, in each language's own words.                                                                                                                                                                                  |
| SIC codes                | 62012 Business and domestic software development; 58290 Other software publishing; 62020 Information technology consultancy activities; 74100 Specialised design activities.                                                                                                    |
| Registered email address | `hello@vegasoft.co.uk`. Companies House uses it for statutory notices. It is not published on the register.                                                                                                                                                                     |

**The `hello@vegasoft.co.uk` mailbox must exist and be read.** It is the registered email
address, so Companies House writes to it: confirmation statements, filing reminders and
anything that follows from not answering them. It is also the address the contact form
sends to and the address the site publishes, so one unread mailbox would lose both the
enquiries and the statutory post.

Incorporation is complete. The register was read on 8 October 2026 and the legal name,
the registered office and the four SIC codes above match it exactly.

The VAT number is a separate matter: Companies House does not hold it. It comes from
HMRC, and registering is only compulsory once taxable turnover passes the threshold. The
business is not registered, so the site shows nothing for it — not even a "Soon" marker.
If it registers later, put the number in `src/content/company.ts` and the footer's VAT
line appears on its own.

## Promises to clients

Published entries are in "What you can count on" on the home page and, where they belong,
on the About and Contact pages and in the questions. The draft is a proposed sentence for
the owner to decide on.

| Commitment                              | Status                                               | Shown by |
| --------------------------------------- | ---------------------------------------------------- | -------- |
| A first conversation costs nothing      | Published                                            | 14 of 14 |
| A reply within one working day          | Published                                            | 7 of 14  |
| Payment follows the work                | Published                                            | 13 of 14 |
| You see the work as it is built         | Published                                            | 10 of 14 |
| Yours to keep, ownership and handover   | Published                                            | 11 of 14 |
| Your business stays your business       | Published                                            | 9 of 14  |
| On site when the job needs it           | Published                                            | 12 of 14 |
| Support hours                           | Published                                            | 8 of 14  |
| Plain answers, saying no when not a fit | Published (About)                                    | 12 of 14 |
| Where your data lives                   | **Draft**: a technical decision for the hosting work | 10 of 14 |

## Proof

Both lists are empty until the owner supplies a real, named entry and the person or
business named has agreed to it. They are marked "Soon" where the markers are on.

| Kind         | Shown by |
| ------------ | -------- |
| Case studies | 13 of 14 |
| Testimonials | 8 of 14  |

## Not given a place, and why

Fewer than half of the comparable sites show it, and the law does not require it:

- Office hours as a company detail (4 of 14). The support hours are a commitment instead.
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
