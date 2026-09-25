// Every word on the Company information page. The rows come from src/content/company.ts,
// with the email address and the telephone number from src/content/site.ts.

import type { CompanyDetails } from "../company.ts";

export type CompanyRow = keyof CompanyDetails | "email" | "phone";

export const companyPage = {
  meta: {
    title: "Company information",
    description: "Company details for Vegasoft Technologies.",
  },
  title: "Company information",
  lead: "Details of the business behind this website.",
  emailLabel: "Email",
  phoneLabel: "Phone",
  /** The public register a company number is checked against. */
  registerUrl: "https://find-and-update.company-information.service.gov.uk/company/",
  /** The rows shown, in order. */
  rows: [
    "tradingName",
    "legalName",
    "placeOfRegistration",
    "companyNumber",
    "address",
    "email",
    "phone",
    "vatNumber",
  ] satisfies CompanyRow[],
};
