// Company details for the footer, the About, Contact and Company information pages, the
// structured data and, later, the privacy notice.
//
// The business trades as Vegasoft Technologies and is being incorporated as a private
// company limited by shares. null means "not known yet". A deployed build shows nothing
// for a null detail, and a build with the markers on (`npm run dev`, `npm run preview:soon`
// and pull request previews) shows "Soon" in the places listed in docs/company-details.md.
// A null detail that is not coming at all, such as the VAT number, shows nothing anywhere.
//
// Before launch the site must show the legal name, a geographic address and an email
// address (Electronic Commerce (EC Directive) Regulations 2002, regulation 6), plus the
// company and VAT numbers if they exist. See docs/launch-checklist.md and
// docs/company-details.md for every field, where it appears, the format expected, and
// the rule for which details the site shows at all.

export type ProfileLink = { label: string; href: string };

/** An address in parts, so that the page and the structured data read the same fields. */
export type PostalAddress = {
  street: string;
  town: string;
  postcode: string;
  country: string;
};

/** Support hours, for the structured data. The sentence is the support-hours commitment. */
export type SupportHours = { days: string[]; opens: string; closes: string };

export type CompanyDetails = {
  /** The name the business trades under. Shown everywhere. */
  tradingName: string;
  /** The registered company behind the trading name. */
  legalName: string | null;
  /** Where the company is registered, for example "England and Wales". */
  placeOfRegistration: string | null;
  /** The registered office. A PO box does not qualify. */
  address: PostalAddress | null;
  /** A short public location, such as a town and country. */
  location: string | null;
  /** From Companies House, once incorporation is complete. */
  companyNumber: string | null;
  /** The business is not VAT registered, so nothing is shown for this, not even "Soon". */
  vatNumber: string | null;
  /** Where we work on site. */
  serviceArea: string | null;
  /** The year the business started, for example "2026". */
  founded: string | null;
  /** Public profiles. */
  social: ProfileLink[] | null;
  /** The hours in the support-hours commitment, in the form the structured data needs. */
  supportHours: SupportHours | null;
};

export const company: CompanyDetails = {
  tradingName: "Vegasoft Technologies",
  legalName: "Vegasoft Technologies London Ltd",
  placeOfRegistration: "England and Wales",
  address: {
    street: "20 Wenlock Road",
    town: "London",
    postcode: "N1 7GU",
    country: "United Kingdom",
  },
  location: "London, United Kingdom",
  companyNumber: null,
  vatNumber: null,
  serviceArea: "Anywhere in the UK, by arrangement",
  founded: "2026",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vegasoft-technologies-london",
    },
  ],
  supportHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

/** The address on one line, as the pages show it. */
export function formatAddress(address: PostalAddress): string {
  return `${address.street}, ${address.town} ${address.postcode}`;
}
