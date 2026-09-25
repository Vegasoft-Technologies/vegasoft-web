# Company details

Every kind of company, trust and commitment information that comparable firms show, and
where each one lives on this site. The list comes from fourteen websites of studios that
do similar work: UK bespoke software studios for small businesses, machine monitoring for
smaller plants, and automation and applied AI consultancies. The last column says how
many of the fourteen show that kind of information.

Nothing is invented. A fact that is not known yet is `null` in `src/content/company.ts`
and invisible in deployed builds; `npm run dev` shows a dashed placeholder where it will
go. A promise the owner has not approved is `approved: false` in
`src/content/en/commitments.ts` and shown only in development, marked as a draft. Proof
lives in `src/content/en/proof.ts` as empty lists: real, named and with permission only.

## Facts about the business

| Field                   | Where it appears                                                             | Required by law before launch                                        | Format expected                                                               | Shown by |
| ----------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| Trading name            | Everywhere                                                                   | Yes, and the legal name where it differs                             | `Vegasoft Technologies`                                                       | 14 of 14 |
| Legal name              | Footer legal line, Company information                                       | Yes (Companies Act 2006, E-Commerce Regulations 2002 reg. 6)         | The registered name exactly as on the public register                         | 12 of 14 |
| Registered in           | Footer legal line, Company information                                       | Yes, if a company (Company, LLP and Business Names Regulations 2015) | `England and Wales`                                                           | 12 of 14 |
| Address                 | Footer legal line, Company information, structured data                      | Yes: a geographic address, a PO box does not qualify (reg. 6)        | `12 Example Street, Exeter EX1 1AA`                                           | 10 of 14 |
| Location                | Contact section and page, About, footer                                      | No                                                                   | `Exeter, United Kingdom`                                                      | 14 of 14 |
| Company number          | Footer legal line, Company information (linked to the register)              | Yes, if a company                                                    | `12345678`                                                                    | 11 of 14 |
| VAT number              | Footer legal line, Company information                                       | Yes, if VAT registered (reg. 6)                                      | `GB 123 4567 89`                                                              | 3 of 14  |
| ICO registration        | Footer legal line, Company information                                       | No, but the registration itself may be due (ICO self-assessment)     | `ZA123456`                                                                    | 2 of 14  |
| Email address           | Header (from 1024 px), contact section and page, footer, Company information | Yes (reg. 6)                                                         | `hello@vegasoft.co.uk`, known                                                 | 14 of 14 |
| Telephone number        | Header (from 1024 px), contact section and page, footer, Company information | No                                                                   | `+44 7767 080863`, known                                                      | 10 of 14 |
| Area covered on site    | About, Contact, structured data                                              | No                                                                   | `Devon and the South West; elsewhere in the UK by arrangement`                | 14 of 14 |
| Office hours            | Contact, About, footer                                                       | No                                                                   | `Monday to Friday, 9:00 to 17:30 UK time`                                     | 4 of 14  |
| Founded                 | About, structured data                                                       | No                                                                   | `2024`                                                                        | 9 of 14  |
| Languages               | About, structured data                                                       | No                                                                   | `English`, `Turkish`                                                          | 3 of 14  |
| Certifications          | About                                                                        | No                                                                   | `Cyber Essentials`, with the certificate number kept off the site             | 5 of 14  |
| Memberships             | About                                                                        | No                                                                   | Programme or body names, one per entry                                        | 5 of 14  |
| Insurance               | About                                                                        | No                                                                   | The kinds held, without amounts: `Professional indemnity`, `Public liability` | 1 of 14  |
| Data hosting            | About (and a draft commitment)                                               | No                                                                   | `United Kingdom and the European Union`                                       | 10 of 14 |
| Profiles                | Contact, About, structured data                                              | No                                                                   | Label and address: `LinkedIn`, `https://www.linkedin.com/company/...`         | 11 of 14 |
| Book a call             | Contact                                                                      | No                                                                   | A label and the address of a booking page                                     | 1 of 14  |
| Privacy notice          | A page of its own, linked from the footer (later pull request)               | Yes (UK GDPR): what is collected, why, for how long, and the rights  | A page, with the date it was last updated                                     | 14 of 14 |
| Terms of business       | A page of its own, if the owner wants them published                         | No                                                                   | A page, with the date it was last updated                                     | 11 of 14 |
| Accessibility statement | A page of its own (later pull request)                                       | No for a private business; good practice                             | A page                                                                        | 0 of 14  |

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
| Faults fixed after handover             | Draft             | 6 of 14  |
| Notice period for the monthly fee       | Draft             | 5 of 14  |
| The person you brief builds it          | Draft             | 5 of 14  |
| Built to public security guidance       | Draft             | 2 of 14  |

## Proof

Each list is empty until the owner supplies a real, named entry and the person or business
named has agreed to it. In deployed builds an empty list renders nothing; in development
each shows a placeholder in the "Clients and work" section of the home page.

| Kind           | Shown by |
| -------------- | -------- |
| Case studies   | 13 of 14 |
| Testimonials   | 8 of 14  |
| Client logos   | 5 of 14  |
| Awards         | 5 of 14  |
| Reviews        | 2 of 14  |
| Press mentions | 2 of 14  |

## Not given a place, and why

- Named people, photographs and team size (11, 5 and 7 of 14): the owner decided the site
  shows no people.
- Headline numbers such as projects delivered or years in business (14 of 14): the site
  publishes no figures.
- Prices, ranges and starting prices: the site has no prices.
- Own products (7 of 14): the business sells none.
- A cookie policy (13 of 14): the site sets no cookies, which the privacy notice will say.
- A stock-market listing and similar: cannot apply.
