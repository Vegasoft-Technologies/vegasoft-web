// The labels for the company details in src/content/company.ts. The values are shared
// between the languages; these words are not.

import type { CompanyDetails } from "../company.ts";

export const companyLabels: Record<keyof CompanyDetails, string> = {
  tradingName: "Trading name",
  legalName: "Legal name",
  placeOfRegistration: "Registered in",
  address: "Registered office",
  location: "Location",
  companyNumber: "Company number",
  vatNumber: "VAT number",
  serviceArea: "Area covered on site",
  founded: "Founded",
  social: "Profiles",
  supportHours: "Support hours",
};
