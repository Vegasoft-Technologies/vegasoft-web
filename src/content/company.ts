// Company details for the footer, and later for the company information page and the
// privacy notice. null means "not known yet": deployed builds leave the detail out
// entirely, and `npm run dev` shows a dashed placeholder where it will go.
//
// Before launch the site must show the legal name, a geographic address and an email
// address (Electronic Commerce (EC Directive) Regulations 2002, regulation 6), plus the
// company and VAT numbers if they exist. See docs/launch-checklist.md.

export type CompanyDetails = {
  /** The name the business trades under. Shown everywhere. */
  tradingName: string;
  /** The legal person or company behind the trading name. */
  legalName: string | null;
  /** A geographic address; a PO box does not qualify. */
  address: string | null;
  /** A short public location, such as a town and country. */
  location: string | null;
  companyNumber: string | null;
  vatNumber: string | null;
  /** Registration number for the ICO data protection fee, if one is needed. */
  icoRegistration: string | null;
};

export const company: CompanyDetails = {
  tradingName: "Vegasoft Technologies",
  legalName: null,
  address: null,
  location: null,
  companyNumber: null,
  vatNumber: null,
  icoRegistration: null,
};

/** Labels for the details above, in the order they are shown. */
export const companyLabels = {
  legalName: "Legal name",
  address: "Address",
  companyNumber: "Company number",
  vatNumber: "VAT number",
  icoRegistration: "ICO registration",
} as const;
