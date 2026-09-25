// Company details for the footer, the About, Contact and Company information pages, the
// structured data and, later, the privacy notice. null means "not known yet": deployed
// builds leave the detail out entirely, label included, and `npm run dev` shows a dashed
// placeholder where it will go. A list is null until known, never an empty list, so that
// "not known" and "none" stay different.
//
// Before launch the site must show the legal name, a geographic address and an email
// address (Electronic Commerce (EC Directive) Regulations 2002, regulation 6), plus the
// company and VAT numbers if they exist. See docs/launch-checklist.md and
// docs/company-details.md for every field, where it appears and the format expected.

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
  /** Registration number for the ICO data protection fee, if one is needed. */
  icoRegistration: string | null;
  /** Where we work on site, for example "Devon and the South West; elsewhere in the UK by arrangement". */
  serviceArea: string | null;
  /** Office hours, for example "Monday to Friday, 9:00 to 17:30 UK time". */
  hours: string | null;
  /** The year the business started, for example "2024". */
  founded: string | null;
  /** Where client systems and data are hosted, for example "United Kingdom and the European Union". */
  dataHosting: string | null;
  /** Languages the business works in, for example ["English", "Turkish"]. */
  languages: string[] | null;
  /** Certifications held, for example ["Cyber Essentials"]. */
  certifications: string[] | null;
  /** Memberships and partner programmes, for example ["Made Smarter West of England"]. */
  memberships: string[] | null;
  /** Insurance held, by kind, for example ["Professional indemnity", "Public liability"]. */
  insurance: string[] | null;
  /** Public profiles, for example [{ label: "LinkedIn", href: "https://www.linkedin.com/company/..." }]. */
  social: ProfileLink[] | null;
  /** A page where a first call can be booked, for example { label: "Book a call", href: "https://..." }. */
  booking: ProfileLink | null;
};

export const company: CompanyDetails = {
  tradingName: "Vegasoft Technologies",
  legalName: null,
  placeOfRegistration: null,
  address: null,
  location: null,
  companyNumber: null,
  vatNumber: null,
  icoRegistration: null,
  serviceArea: null,
  hours: null,
  founded: null,
  dataHosting: null,
  languages: null,
  certifications: null,
  memberships: null,
  insurance: null,
  social: null,
  booking: null,
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
  icoRegistration: "ICO registration",
  serviceArea: "Area covered on site",
  hours: "Office hours",
  founded: "Founded",
  dataHosting: "Data hosting",
  languages: "Languages",
  certifications: "Certifications",
  memberships: "Memberships",
  insurance: "Insurance",
  social: "Profiles",
  booking: "Book a call",
} as const;

/** The details in the footer's legal line, in the order they are shown. */
export const legalLineFields = [
  "legalName",
  "placeOfRegistration",
  "address",
  "companyNumber",
  "vatNumber",
  "icoRegistration",
] as const;
