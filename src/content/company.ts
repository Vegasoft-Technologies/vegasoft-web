// Company details for the footer, the About, Contact and Company information pages, the
// structured data and, later, the privacy notice. null means "not known yet": deployed
// builds leave the detail out entirely, label included, and `npm run dev` shows a dashed
// placeholder where it will go. A list is null until known, never an empty list, so that
// "not known" and "none" stay different.
//
// Before launch the site must show the legal name, a geographic address and an email
// address (Electronic Commerce (EC Directive) Regulations 2002, regulation 6), plus the
// company and VAT numbers if they exist. See docs/launch-checklist.md and
// docs/company-details.md for every field, where it appears, the format expected, and
// the rule for which details the site shows at all.

export type ProfileLink = { label: string; href: string };

export type CompanyDetails = {
  /** The name the business trades under. Shown everywhere. */
  tradingName: string;
  /** The legal person or company behind the trading name. */
  legalName: string | null;
  /** Where the company is registered, for example "England and Wales". */
  placeOfRegistration: string | null;
  /** A geographic address; a PO box does not qualify. */
  address: string | null;
  /** A short public location, such as a town and country. */
  location: string | null;
  companyNumber: string | null;
  vatNumber: string | null;
  /** Where we work on site, for example "Devon and the South West; elsewhere in the UK by arrangement". */
  serviceArea: string | null;
  /** The year the business started, for example "2024". */
  founded: string | null;
  /** Public profiles, for example [{ label: "LinkedIn", href: "https://www.linkedin.com/company/..." }]. */
  social: ProfileLink[] | null;
};

export const company: CompanyDetails = {
  tradingName: "Vegasoft Technologies",
  legalName: null,
  placeOfRegistration: null,
  address: null,
  location: null,
  companyNumber: null,
  vatNumber: null,
  serviceArea: null,
  founded: null,
  social: null,
};

/** Labels for the details above. */
export const companyLabels = {
  tradingName: "Trading name",
  legalName: "Legal name",
  placeOfRegistration: "Registered in",
  address: "Address",
  location: "Location",
  companyNumber: "Company number",
  vatNumber: "VAT number",
  serviceArea: "Area covered on site",
  founded: "Founded",
  social: "Profiles",
} as const;

/** The details in the footer's legal line, in the order they are shown. */
export const legalLineFields = [
  "legalName",
  "placeOfRegistration",
  "address",
  "companyNumber",
  "vatNumber",
] as const;
