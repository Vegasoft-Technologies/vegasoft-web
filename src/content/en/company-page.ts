// Every word on the Company information page. The rows come from src/content/company.ts,
// with the email address and the telephone number from src/content/site.ts.

import { company, type CompanyDetails } from "../company.ts";

export type CompanyRow = keyof CompanyDetails | "email" | "phone";

export const companyPage = {
  meta: {
    title: "Company information",
    description:
      "The business behind this website: trading name, legal name, company type, where it is registered, the registered office, and how to reach us.",
  },
  title: "Company information",
  lead: "Details of the business behind this website.",
  emailLabel: "Email",
  phoneLabel: "Phone",
  /** The company type in this language. The fact itself is in company.ts. */
  companyType: company.companyType,
  /** The public register a company number is checked against. */
  registerUrl: "https://find-and-update.company-information.service.gov.uk/company/",
  /** The rows shown, in order. */
  rows: [
    "tradingName",
    "legalName",
    "companyType",
    "placeOfRegistration",
    "companyNumber",
    "address",
    "email",
    "phone",
    "vatNumber",
  ] satisfies CompanyRow[],
};
